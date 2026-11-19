/**
 * Tests for the kuliah-coding bridge of the `dewasa-coding` corpus
 * (`data/dewasa-coding/kuliah-bridge.json`, silabus bagian 6.2, issue #177):
 * the schema, and the referential and arithmetic checks of
 * `auditDewasaCorpus` (modules equal the PRO modules, one status per
 * profile, mandatory modules stay mandatory, the impact table is what the
 * statuses give).
 */

import { describe, expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import type { CorpusSource } from "../../src/domain/corpus-audit";
import { auditDewasaCorpus, DW_DATA_FILE_REGISTRY } from "../../src/domain/dw-corpus-audit";
import { dwKuliahBridgeFileSchema } from "../../src/schema/dw-kuliah-bridge";

// biome-ignore lint/suspicious/noExplicitAny: fixture data is mutated freely
type Json = any;

const repoRoot = join(import.meta.dir, "..", "..");
const FILE = "kuliah-bridge.json";

/** A fresh deep copy of the committed corpus, as a mutable name -> JSON map. */
function corpus(): Map<string, Json> {
  return new Map(
    DW_DATA_FILE_REGISTRY.map((entry) => [
      entry.file,
      JSON.parse(readFileSync(join(repoRoot, "data", "dewasa-coding", entry.file), "utf-8")),
    ]),
  );
}

function audit(files: Map<string, Json>) {
  const source: CorpusSource = new Map(
    [...files].map(([name, data]) => [name, { ok: true as const, data }]),
  );
  return auditDewasaCorpus(source);
}

function messages(result: ReturnType<typeof audit>): string {
  return result.findings
    .filter((finding) => finding.file === FILE)
    .map((finding) => `${finding.path}: ${finding.message}`)
    .join("\n");
}

describe("kuliah-bridge.json on the committed corpus", () => {
  test("is clean and has three profiles, thirteen PRO modules and three impact rows", () => {
    const files = corpus();
    expect(audit(files).findings).toEqual([]);
    const bridge = files.get(FILE) as Json;
    expect(bridge.profiles.map((p: Json) => p.id)).toEqual(["I-lengkap", "I-awal", "U-lengkap"]);
    expect(bridge.modules).toHaveLength(13);
    expect(bridge.hourImpact).toHaveLength(3);
    expect(bridge.baselineHours).toBe(136);
    expect(bridge.mandatoryModules).toEqual(["DW-FND-M1", "DW-PRO-M12"]);
  });

  test("the impact table is what the statuses give: L = 1 hour, P = half, W = the module", () => {
    const bridge = corpus().get(FILE) as Json;
    const byProfile = Object.fromEntries(bridge.hourImpact.map((row: Json) => [row.profile, row]));
    expect(byProfile["I-lengkap"]).toMatchObject({
      lewati: 7,
      padatkan: 4,
      wajib: 2,
      moduleHours: 47,
      totalHours: 55,
      reductionHours: 81,
    });
    expect(byProfile["I-awal"]).toMatchObject({
      lewati: 0,
      padatkan: 4,
      wajib: 9,
      moduleHours: 108,
      totalHours: 116,
      reductionHours: 20,
    });
    expect(byProfile["U-lengkap"]).toMatchObject({
      lewati: 1,
      padatkan: 7,
      wajib: 5,
      moduleHours: 85,
      totalHours: 93,
      reductionHours: 43,
    });
  });

  test("DW-PRO-M12 is W for every profile and DW-PRO-M6 (no OOP in kuliah-coding) is W", () => {
    const bridge = corpus().get(FILE) as Json;
    for (const code of ["DW-PRO-M12", "DW-PRO-M6"]) {
      const row = bridge.modules.find((module: Json) => module.code === code);
      expect(Object.values(row.statuses)).toEqual(["W", "W", "W"]);
    }
  });
});

describe("kuliah-bridge.json: findings", () => {
  test("a wrong count or hour figure in the impact table is reported", () => {
    const files = corpus();
    const rows = files.get(FILE).hourImpact as Array<Json>;
    rows[0].lewati = 6;
    rows[1].moduleHours = 100;
    rows[2].totalHours = 90;
    rows[2].reductionHours = 1;
    const text = messages(audit(files));
    expect(text).toContain("hourImpact[0].lewati: is 6 but the statuses of I-lengkap give 7");
    expect(text).toContain("hourImpact[1].moduleHours: is 100 but the statuses of I-awal give 108");
    expect(text).toContain(
      "hourImpact[2].totalHours: is 90 but module hours 85 plus shared hours 8 give 93",
    );
    expect(text).toContain("hourImpact[2].reductionHours");
  });

  test("a module with other hours, a non-PRO module and a missing PRO module are reported", () => {
    const files = corpus();
    const modules = files.get(FILE).modules as Array<Json>;
    modules[0].hours = 9;
    modules[1].code = "DW-PRO-M99";
    const text = messages(audit(files));
    expect(text).toContain("says 9 hours but module-plan.json has 10 for DW-PRO-M1");
    expect(text).toContain('"DW-PRO-M99" is not a PRO module of module-plan.json');
    expect(text).toContain("PRO module DW-PRO-M2 has no row in the recognition table");
  });

  test("DW-PRO-M12 and DW-FND-M1 must stay mandatory for every profile", () => {
    const files = corpus();
    const bridge = files.get(FILE) as Json;
    const m12 = (bridge.modules as Array<Json>).find((m) => m.code === "DW-PRO-M12");
    m12.statuses["I-lengkap"] = "P";
    bridge.mandatoryModules = ["DW-PRO-M12"];
    const text = messages(audit(files));
    expect(text).toContain("DW-PRO-M12 is mandatory but has status P for I-lengkap");
    expect(text).toContain("DW-FND-M1 must stay mandatory for every participant");
  });

  test("a mandatory module that does not exist and a baseline that disagrees are reported", () => {
    const files = corpus();
    const bridge = files.get(FILE) as Json;
    bridge.mandatoryModules = ["DW-FND-M1", "DW-PRO-M12", "DW-PRO-M99"];
    bridge.baselineHours = 128;
    const text = messages(audit(files));
    expect(text).toContain('mandatory module "DW-PRO-M99" does not exist');
    expect(text).toContain("baselineHours: is 128 but track PRO totals 136 hours");
  });

  test("a status set that does not match the profiles and wrong row counts are reported", () => {
    const files = corpus();
    const bridge = files.get(FILE) as Json;
    bridge.hourImpact.pop();
    bridge.profiles.pop();
    const text = messages(audit(files));
    expect(text).toContain("must have exactly one status per profile");
    expect(text).toContain("expected exactly 3 entry profiles, found 2");
    expect(text).toContain("expected exactly 3 hour-impact rows, found 2");
  });

  test("an impact table that lacks a profile row is reported", () => {
    const files = corpus();
    (files.get(FILE) as Json).hourImpact.pop();
    expect(messages(audit(files))).toContain("must have one row per profile");
  });

  test("an impact row for a profile that is not listed is reported", () => {
    const files = corpus();
    const bridge = files.get(FILE) as Json;
    bridge.profiles = bridge.profiles.filter((p: Json) => p.id !== "I-awal");
    const text = messages(audit(files));
    expect(text).toContain('profile "I-awal" is not in profiles');
  });
});

describe("dwKuliahBridgeFileSchema", () => {
  test("accepts the committed file and rejects unknown keys, duplicates and bad codes", () => {
    const data = corpus().get(FILE) as Json;
    expect(dwKuliahBridgeFileSchema.safeParse(data).success).toBe(true);
    expect(dwKuliahBridgeFileSchema.safeParse({ ...data, surprise: 1 }).success).toBe(false);
    expect(
      dwKuliahBridgeFileSchema.safeParse({
        ...data,
        modules: [data.modules[0], data.modules[0]],
      }).success,
    ).toBe(false);
    expect(
      dwKuliahBridgeFileSchema.safeParse({
        ...data,
        profiles: [data.profiles[0], data.profiles[0]],
      }).success,
    ).toBe(false);
    const badModule = { ...data.modules[0], code: "DW-PKJ-M1" };
    expect(dwKuliahBridgeFileSchema.safeParse({ ...data, modules: [badModule] }).success).toBe(
      false,
    );
    const badStatus = {
      ...data.modules[0],
      statuses: { ...data.modules[0].statuses, "I-awal": "Z" },
    };
    expect(dwKuliahBridgeFileSchema.safeParse({ ...data, modules: [badStatus] }).success).toBe(
      false,
    );
  });
});
