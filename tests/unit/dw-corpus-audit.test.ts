/**
 * Tests for `src/domain/dw-corpus-audit.ts` and the `dw-*` schemas: the
 * committed `data/dewasa-coding/` corpus is clean, and each class of
 * corruption (schema, structure, hours, prerequisites, SKKNI references,
 * certification) is reported precisely, in memory, without touching the
 * committed files.
 */

import { describe, expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import type { CorpusSource } from "../../src/domain/corpus-audit";
import {
  auditDewasaCorpus,
  DW_DATA_FILE_REGISTRY,
  DW_EXPECTED_COUNTS,
} from "../../src/domain/dw-corpus-audit";
import { dwBridgeFileSchema } from "../../src/schema/dw-bridge";
import { dwCertificationFileSchema } from "../../src/schema/dw-certification";
import {
  DW_SHARED_MODULE_CODE,
  DW_TRACK_IDS,
  dwModuleCodeSchema,
  dwSkkniUnitCodeSchema,
  dwSourceSectionSchema,
} from "../../src/schema/dw-common";
import { dwModulePlanFileSchema, dwModuleSchema } from "../../src/schema/dw-module";
import { dwSharedFileSchema } from "../../src/schema/dw-shared";
import { dwSkkniFileSchema } from "../../src/schema/dw-skkni";
import { dwStructureFileSchema } from "../../src/schema/dw-structure";
import { dwTrackSchema, dwTracksFileSchema } from "../../src/schema/dw-track";

// biome-ignore lint/suspicious/noExplicitAny: fixture data is mutated freely
type Json = any;

const repoRoot = join(import.meta.dir, "..", "..");
const read = (path: string): unknown => JSON.parse(readFileSync(join(repoRoot, path), "utf-8"));

/** A fresh deep copy of the committed corpus, as a mutable name -> JSON map. */
function corpus(): Map<string, Json> {
  return new Map(
    DW_DATA_FILE_REGISTRY.map((entry) => [entry.file, read(`data/dewasa-coding/${entry.file}`)]),
  );
}

function audit(files: Map<string, Json>) {
  const source: CorpusSource = new Map(
    [...files].map(([name, data]) => [name, { ok: true as const, data }]),
  );
  return auditDewasaCorpus(source);
}

function messages(result: ReturnType<typeof audit>, file: string): string {
  return result.findings
    .filter((finding) => finding.file === file)
    .map((finding) => `${finding.path}: ${finding.message}`)
    .join("\n");
}

describe("auditDewasaCorpus on the committed corpus", () => {
  test("is clean and validates all seven files", () => {
    const result = audit(corpus());
    expect(result.findings).toEqual([]);
    expect(result.ok).toBe(true);
    expect(result.summary.filesValidated).toBe(7);
    expect(result.summary.filesMissing).toBe(0);
    expect(result.summary.filesUnregistered).toBe(0);
  });

  test("has the record counts and hours of the approved v1.0 syllabus", () => {
    const files = corpus();
    const tracks = files.get("tracks.json").tracks as Array<Json>;
    expect(tracks.map((track) => track.id)).toEqual([...DW_TRACK_IDS]);
    expect(tracks.map((track) => track.totalHours)).toEqual([48, 128, 38, 56]);
    expect(tracks.map((track) => track.sharedHours + track.trackHours)).toEqual([48, 128, 38, 56]);
    const modules = files.get("module-plan.json").modules as Array<Json>;
    for (const id of DW_TRACK_IDS) {
      const own = modules.filter((module) => module.track === id);
      expect(own).toHaveLength(DW_EXPECTED_COUNTS.modules[id]);
      expect(own.reduce((sum, module) => sum + module.hours, 0)).toBe(
        DW_EXPECTED_COUNTS.hours[id].own,
      );
    }
    expect(files.get("shared.json").modules.map((m: Json) => m.code)).toEqual([
      DW_SHARED_MODULE_CODE,
    ]);
    expect(files.get("structure.json").rows).toHaveLength(8);
    expect(files.get("skkni-units.json").units).toHaveLength(47);
    expect(files.get("skkni-units.json").touchedUnitCount).toBe(34);
    expect(files.get("skkni-units.json").uncoveredUnitCodes).toHaveLength(13);
    expect(files.get("certification.json").options).toHaveLength(3);
    expect(files.get("certification.json").lspSchemes).toHaveLength(2);
    expect(files.get("bridges.json").bridges).toHaveLength(6);
  });

  test("marks the unit copy as unverified and the mapping as title-level (owner decision)", () => {
    const skkni = corpus().get("skkni-units.json");
    expect(skkni.mappingDepth).toBe("judul-unit");
    for (const unit of skkni.units) {
      expect(unit.verification).toBe("salinan-belum-terverifikasi");
    }
  });

  test("the first module of every track needs the shared module, the rest the previous one", () => {
    const modules = corpus().get("module-plan.json").modules as Array<Json>;
    for (const module of modules) {
      expect(module.prerequisites).toEqual([
        module.number === 1 ? DW_SHARED_MODULE_CODE : `DW-${module.track}-M${module.number - 1}`,
      ]);
    }
  });

  test("the default certification option is the one without certification", () => {
    const certification = corpus().get("certification.json");
    expect(certification.defaultOptionId).toBe("A");
    expect(certification.options[0].name).toBe("Tanpa sertifikasi");
  });
});

describe("auditDewasaCorpus reports corruption", () => {
  test("a missing, invalid-JSON and unregistered file are reported", () => {
    const files = corpus();
    files.delete("bridges.json");
    files.set("modules.json", { modules: [] });
    const result = audit(files);
    expect(result.summary.filesMissing).toBe(1);
    expect(result.summary.filesUnregistered).toBe(1);
    expect(messages(result, "bridges.json")).toContain("required data file is missing");
    expect(messages(result, "modules.json")).toContain("DW_DATA_FILE_REGISTRY");

    const source: CorpusSource = new Map([
      ["tracks.json", { ok: false as const, error: "Unexpected token" }],
    ]);
    const broken = auditDewasaCorpus(source);
    expect(messages(broken, "tracks.json")).toContain("invalid JSON: Unexpected token");
  });

  test("a schema violation is reported with its path", () => {
    const files = corpus();
    files.get("bridges.json").bridges[0].status = "entah";
    files.get("tracks.json").tracks[0].extra = 1;
    const result = audit(files);
    expect(messages(result, "bridges.json")).toContain("bridges.0.status");
    expect(messages(result, "tracks.json")).toContain("tracks.0");
    expect(result.ok).toBe(false);
  });

  test("hours that do not add up are reported against the modules", () => {
    const files = corpus();
    files.get("module-plan.json").modules[0].hours = 6;
    const result = audit(files);
    expect(messages(result, "tracks.json")).toContain(
      "is 40 but the PKJ modules in module-plan.json add up to 41",
    );
  });

  test("a track with the wrong total or module count is reported", () => {
    const files = corpus();
    const track = files.get("tracks.json").tracks[1];
    track.sharedHours = 9;
    track.trackHours = 100;
    track.totalHours = 109;
    track.moduleCount = 10;
    track.hoursPerModule = 10;
    const result = audit(files);
    const text = messages(result, "tracks.json");
    expect(text).toContain("track PRO must have 8");
    expect(text).toContain("track PRO must have 120");
    expect(text).toContain("track PRO must total 128");
    expect(text).toContain("track PRO must have 12 modules");
  });

  test("a changed shared hours figure is reported", () => {
    const files = corpus();
    files.get("shared.json").modules[0].hours = 9;
    const result = audit(files);
    expect(messages(result, "tracks.json")).toContain(
      "is 8 but the shared modules in shared.json add up to 9",
    );
  });

  test("a missing shared module and a track that forgets it are reported", () => {
    const files = corpus();
    files.get("shared.json").modules[0].code = "DW-FND-M2";
    files.get("tracks.json").tracks[2].prerequisiteModules = ["DW-PRS-M1"];
    const result = audit(files);
    expect(messages(result, "shared.json")).toContain("DW-FND-M1 is missing");
    expect(messages(result, "tracks.json")).toContain(
      "track PRS must list DW-FND-M1 as a prerequisite",
    );
    expect(messages(result, "module-plan.json")).toContain(
      "does not lead back to the shared module DW-FND-M1",
    );
  });

  test("a dangling prerequisite and a prerequisite cycle are reported", () => {
    const files = corpus();
    const modules = files.get("module-plan.json").modules as Array<Json>;
    const find = (code: string) => modules.find((module) => module.code === code) as Json;
    find("DW-PKJ-M3").prerequisites = ["DW-PKJ-M99"];
    find("DW-PRO-M2").prerequisites = ["DW-PRO-M5"];
    const text = messages(audit(files), "module-plan.json");
    expect(text).toContain('prerequisite "DW-PKJ-M99" does not exist');
    expect(text).toContain('prerequisite "DW-PRO-M5" closes a prerequisite cycle');
  });

  test("a self prerequisite and a shared code reused by a track module are reported", () => {
    const files = corpus();
    const modules = files.get("module-plan.json").modules as Array<Json>;
    modules[1].prerequisites = [modules[1].code];
    expect(messages(audit(files), "module-plan.json")).toContain("closes a prerequisite cycle");

    const reused = corpus();
    reused.get("shared.json").modules[0].code = "DW-FND-M1";
    reused.get("module-plan.json").modules.push({
      code: "DW-FND-M1",
      track: "PKJ",
      number: 1,
      title: "x",
      hours: 1,
      outcome: "x",
      portfolioOutput: "x",
      prerequisites: ["DW-FND-M1"],
    });
    const result = audit(reused);
    expect(result.findings.length).toBeGreaterThan(0);
  });

  test("module numbering gaps and a module-count mismatch are reported", () => {
    const files = corpus();
    const modules = files.get("module-plan.json").modules as Array<Json>;
    const index = modules.findIndex((module) => module.code === "DW-PRS-M6");
    modules.splice(index, 1);
    const result = audit(files);
    expect(messages(result, "module-plan.json")).toContain("expected exactly 34 track modules");
    expect(messages(result, "tracks.json")).toContain("says 6 modules but module-plan.json has 5");
  });

  test("an unknown SKKNI unit on a module or an LSP scheme is reported", () => {
    const files = corpus();
    const pro = (files.get("module-plan.json").modules as Array<Json>).find(
      (module) => module.code === "DW-PRO-M1",
    ) as Json;
    pro.skkniUnitCodes.push("J.620100.099.01");
    files.get("certification.json").lspSchemes[0].unitCodes[0] = "J.620100.098.01";
    const result = audit(files);
    expect(messages(result, "module-plan.json")).toContain(
      'SKKNI unit "J.620100.099.01" does not exist',
    );
    expect(messages(result, "certification.json")).toContain(
      'SKKNI unit "J.620100.098.01" does not exist',
    );
  });

  test("the touched-unit claim and the uncovered list must agree with the modules", () => {
    const files = corpus();
    const skkni = files.get("skkni-units.json");
    skkni.touchedUnitCount = 33;
    skkni.uncoveredUnitCodes[0] = "J.620100.003.01";
    const text = messages(audit(files), "skkni-units.json");
    expect(text).toContain("claims 33 touched units but the PRO modules touch 34");
    expect(text).toContain("uncoveredUnitCodes: must equal the units no PRO module touches");
  });

  test("an LSP unit that no PRO module touches is reported", () => {
    const files = corpus();
    files.get("certification.json").lspSchemes[0].unitCodes[0] = "J.620100.001.01";
    expect(messages(audit(files), "certification.json")).toContain(
      "is not touched by any PRO module",
    );
  });

  test("units out of order and an unknown uncovered code are reported", () => {
    const files = corpus();
    const skkni = files.get("skkni-units.json");
    [skkni.units[0], skkni.units[1]] = [skkni.units[1], skkni.units[0]];
    skkni.uncoveredUnitCodes[1] = "J.620100.097.01";
    const text = messages(audit(files), "skkni-units.json");
    expect(text).toContain("units must run 001..047 in order");
    expect(text).toContain('SKKNI unit "J.620100.097.01" does not exist in the unit list');
  });

  test("a default certification option that does not exist is reported", () => {
    const files = corpus();
    files.get("certification.json").defaultOptionId = "Z";
    expect(messages(audit(files), "certification.json")).toContain(
      'option "Z" does not exist in options',
    );
  });

  test("wrong track order and count are reported", () => {
    const files = corpus();
    const tracks = files.get("tracks.json").tracks as Array<Json>;
    [tracks[0], tracks[1]] = [tracks[1], tracks[0]];
    expect(messages(audit(files), "tracks.json")).toContain("tracks must be PKJ, PRO, PRS, BIS");
  });

  test("wrong counts of structure rows, bridges and options are reported", () => {
    const files = corpus();
    files.get("structure.json").rows.pop();
    files.get("bridges.json").bridges.pop();
    files.get("certification.json").options.pop();
    files.get("certification.json").lspSchemes.pop();
    const result = audit(files);
    expect(messages(result, "structure.json")).toContain("expected exactly 8 structure rows");
    expect(messages(result, "bridges.json")).toContain("expected exactly 6 bridges");
    expect(messages(result, "certification.json")).toContain(
      "expected exactly 3 certification options",
    );
    expect(messages(result, "certification.json")).toContain("expected exactly 2 LSP schemes");
  });
});

describe("dw-* schemas", () => {
  const modules = (corpus().get("module-plan.json").modules as Array<Json>).map((m) => ({ ...m }));
  const pkj = modules[0] as Json;
  const pro = modules.find((m) => m.track === "PRO") as Json;

  test("code and section primitives accept the documented shapes only", () => {
    expect(dwModuleCodeSchema.safeParse("DW-PRO-M12").success).toBe(true);
    expect(dwModuleCodeSchema.safeParse("DW-FND-M1").success).toBe(true);
    expect(dwModuleCodeSchema.safeParse("DW-XYZ-M1").success).toBe(false);
    expect(dwModuleCodeSchema.safeParse("DW-PRO-M0").success).toBe(false);
    expect(dwSkkniUnitCodeSchema.safeParse("J.620100.011.01").success).toBe(true);
    expect(dwSkkniUnitCodeSchema.safeParse("J.620100.11.01").success).toBe(false);
    expect(dwSourceSectionSchema.safeParse("bagian 4-7").success).toBe(true);
    expect(dwSourceSectionSchema.safeParse("bagian 5.2-8.2").success).toBe(true);
    expect(dwSourceSectionSchema.safeParse("section 4").success).toBe(false);
  });

  test("a module's code must match its track and number", () => {
    expect(dwModuleSchema.safeParse(pkj).success).toBe(true);
    const wrong = dwModuleSchema.safeParse({ ...pkj, number: 2 });
    expect(wrong.success).toBe(false);
  });

  test("PRO modules carry units and no portfolio output; the others the reverse", () => {
    expect(dwModuleSchema.safeParse(pro).success).toBe(true);
    expect(dwModuleSchema.safeParse({ ...pro, skkniUnitCodes: undefined }).success).toBe(false);
    expect(dwModuleSchema.safeParse({ ...pro, portfolioOutput: "x" }).success).toBe(false);
    expect(dwModuleSchema.safeParse({ ...pkj, portfolioOutput: undefined }).success).toBe(false);
    expect(dwModuleSchema.safeParse({ ...pkj, skkniUnitCodes: ["J.620100.011.01"] }).success).toBe(
      false,
    );
  });

  test("duplicate units, prerequisites and module codes are rejected", () => {
    const unit = pro.skkniUnitCodes[0];
    expect(dwModuleSchema.safeParse({ ...pro, skkniUnitCodes: [unit, unit] }).success).toBe(false);
    expect(
      dwModuleSchema.safeParse({ ...pkj, prerequisites: ["DW-FND-M1", "DW-FND-M1"] }).success,
    ).toBe(false);
    expect(
      dwModulePlanFileSchema.safeParse({
        ...(read("data/dewasa-coding/module-plan.json") as object),
        modules: [pkj, pkj],
      }).success,
    ).toBe(false);
  });

  test("a track's hours must add up", () => {
    const track = corpus().get("tracks.json").tracks[0] as Json;
    expect(dwTrackSchema.safeParse(track).success).toBe(true);
    expect(dwTrackSchema.safeParse({ ...track, totalHours: 49 }).success).toBe(false);
    expect(dwTrackSchema.safeParse({ ...track, hoursPerModule: 6 }).success).toBe(false);
  });

  test("every file schema rejects unknown keys and duplicate records", () => {
    const files = corpus();
    const cases: Array<[string, { safeParse: (v: unknown) => { success: boolean } }, string]> = [
      ["tracks.json", dwTracksFileSchema, "tracks"],
      ["structure.json", dwStructureFileSchema, "rows"],
      ["shared.json", dwSharedFileSchema, "modules"],
      ["module-plan.json", dwModulePlanFileSchema, "modules"],
      ["skkni-units.json", dwSkkniFileSchema, "units"],
      ["certification.json", dwCertificationFileSchema, "options"],
      ["bridges.json", dwBridgeFileSchema, "bridges"],
    ];
    for (const [file, schema, list] of cases) {
      const data = files.get(file) as Json;
      expect(schema.safeParse(data).success).toBe(true);
      expect(schema.safeParse({ ...data, surprise: 1 }).success).toBe(false);
      expect(schema.safeParse({ ...data, [list]: [data[list][0], data[list][0]] }).success).toBe(
        false,
      );
    }
  });

  test("duplicate LSP scheme ids and unit codes are rejected", () => {
    const data = corpus().get("certification.json") as Json;
    const [first] = data.lspSchemes;
    expect(
      dwCertificationFileSchema.safeParse({ ...data, lspSchemes: [first, first] }).success,
    ).toBe(false);
    expect(
      dwCertificationFileSchema.safeParse({
        ...data,
        lspSchemes: [{ ...first, unitCodes: [first.unitCodes[0], first.unitCodes[0]] }],
      }).success,
    ).toBe(false);
  });
});
