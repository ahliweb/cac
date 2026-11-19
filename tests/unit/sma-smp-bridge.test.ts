/**
 * Tests for the SMP entry-and-placement table of the `sma-coding` corpus
 * (`data/sma-coding/smp-bridge.json`, silabus bagian 3.0 v1.4, issue #177):
 * the schema, the audit (row count, sma-coding week codes exist) and the
 * fidelity parser (rows, extracted week codes, intro and observation
 * paragraphs, loud failure when the subsection is damaged).
 */

import { describe, expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import {
  checkSmaFidelity,
  expectedCorpus,
  SMA_DATA_FILES,
} from "../../src/cli/fidelity/sma-coding";
import type { CorpusSource } from "../../src/domain/corpus-audit";
import { auditSmaCorpus, SMA_DATA_FILE_REGISTRY } from "../../src/domain/sma-corpus-audit";
import { smaSmpBridgeFileSchema } from "../../src/schema/sma-smp-bridge";

// biome-ignore lint/suspicious/noExplicitAny: fixture data is mutated freely
type Json = any;

const repoRoot = join(import.meta.dir, "..", "..");
const FILE = "smp-bridge.json";
const markdown = readFileSync(
  join(repoRoot, "docs", "programs", "sma-coding", "silabus.md"),
  "utf-8",
);
const read = (path: string): Json => JSON.parse(readFileSync(join(repoRoot, path), "utf-8"));
const osnFamilyIds: ReadonlySet<string> = new Set(
  (read("data/osn/topic-families.json").topicFamilies as Array<{ id: string }>).map(
    (family) => family.id,
  ),
);

function corpus(): Map<string, Json> {
  return new Map(
    SMA_DATA_FILE_REGISTRY.map((entry) => [entry.file, read(`data/sma-coding/${entry.file}`)]),
  );
}

function audit(files: Map<string, Json>) {
  const source: CorpusSource = new Map(
    [...files].map(([name, data]) => [name, { ok: true as const, data }]),
  );
  return auditSmaCorpus(source, osnFamilyIds);
}

function messages(result: ReturnType<typeof audit>): string {
  return result.findings
    .filter((finding) => finding.file === FILE)
    .map((finding) => `${finding.path}: ${finding.message}`)
    .join("\n");
}

describe("smp-bridge.json on the committed corpus", () => {
  test("is clean, has seven rows and names the weeks of both programmes", () => {
    const files = corpus();
    expect(audit(files).findings).toEqual([]);
    const bridge = files.get(FILE) as Json;
    expect(bridge.rows).toHaveLength(7);
    expect(bridge.sourceSection).toBe("bagian 3.0");
    expect(bridge.intro).toContain("tidak mensyaratkan `smp-coding`");
    expect(bridge.observation).toContain("Pengamatan awal:");
    expect(bridge.observation).toContain("`FND-X1-M1`");
    const [first] = bridge.rows;
    expect(first.smpWeeks).toEqual(["SMP7-2-M10"]);
    expect(first.smaWeeks).toEqual(["FND-X1-M1"]);
    const last = bridge.rows[6];
    expect(last.smaWeeks).toEqual(["A-X1-M9", "A-X1-M12", "B-X1-M9", "B-X1-M12"]);
  });

  test("the safety week FND-X1-M6 is never compressed (treatment says so)", () => {
    const bridge = corpus().get(FILE) as Json;
    const row = bridge.rows.find((r: Json) => r.smaWeeks.includes("FND-X1-M6"));
    expect(row.treatment).toContain("Tidak dipadatkan");
  });
});

describe("smp-bridge.json: findings", () => {
  test("a sma-coding week that does not exist is reported with its row and position", () => {
    const files = corpus();
    (files.get(FILE) as Json).rows[2].smaWeeks[0] = "FND-X1-M9";
    expect(messages(audit(files))).toContain(
      'rows[2].smaWeeks[0]: week "FND-X1-M9" does not exist in weeks.json or foundation.json',
    );
  });

  test("a wrong number of rows is reported", () => {
    const files = corpus();
    (files.get(FILE) as Json).rows.pop();
    expect(messages(audit(files))).toContain("expected exactly 7 SMP entry rows, found 6");
  });

  test("an unknown key or a malformed smp-coding week code fails the schema", () => {
    const files = corpus();
    const bridge = files.get(FILE) as Json;
    bridge.rows[0].smpWeeks = ["SMP6-1-M1"];
    bridge.surprise = 1;
    const text = messages(audit(files));
    expect(text).toContain("smp-coding week code");
    expect(text).toContain("surprise");
  });
});

describe("smaSmpBridgeFileSchema", () => {
  test("accepts the committed file and rejects empty rows and empty week lists", () => {
    const data = read("data/sma-coding/smp-bridge.json");
    expect(smaSmpBridgeFileSchema.safeParse(data).success).toBe(true);
    expect(smaSmpBridgeFileSchema.safeParse({ ...data, rows: [] }).success).toBe(false);
    expect(
      smaSmpBridgeFileSchema.safeParse({
        ...data,
        rows: [{ ...data.rows[0], smaWeeks: [] }],
      }).success,
    ).toBe(false);
    expect(
      smaSmpBridgeFileSchema.safeParse({
        ...data,
        rows: [{ ...data.rows[0], smpWeeks: [] }],
      }).success,
    ).toBe(false);
  });
});

describe("fidelity of smp-bridge.json", () => {
  test("the file list includes it and the committed data matches the document", () => {
    expect(SMA_DATA_FILES).toContain(FILE);
    const actual = Object.fromEntries(
      SMA_DATA_FILES.map((file) => [file, read(`data/sma-coding/${file}`)]),
    );
    expect(checkSmaFidelity(markdown, actual)).toEqual([]);
  });

  test("a changed cell, week list, intro and observation are reported", () => {
    const actual: Record<string, Json> = Object.fromEntries(
      SMA_DATA_FILES.map((file) => [file, read(`data/sma-coding/${file}`)]),
    );
    actual[FILE].rows[0].treatment = "diubah";
    actual[FILE].rows[1].smaWeeks.pop();
    actual[FILE].intro += " tambahan";
    actual[FILE].observation = "Pengamatan awal: lain";
    const contexts = checkSmaFidelity(markdown, actual).map((problem) => problem.context);
    expect(contexts).toContain("smp-bridge.json.rows[0].treatment");
    expect(contexts).toContain("smp-bridge.json.rows[1].smaWeeks length");
    expect(contexts).toContain("smp-bridge.json.intro");
    expect(contexts).toContain("smp-bridge.json.observation");
  });

  test("a damaged subsection (no observation, no intro, wrong cells) fails loudly", () => {
    const heading = "#### Kemampuan masuk dari SMP dan penempatan di blok fondasi (v1.4)";
    expect(() => expectedCorpus(markdown.replace("Pengamatan awal:", "Amatan:"))).toThrow(
      "Pengamatan awal",
    );
    expect(() => expectedCorpus(markdown.replace(heading, "#### Lain"))).toThrow(
      "Kemampuan masuk dari SMP",
    );
    expect(() =>
      expectedCorpus(
        markdown.replace(
          "| `SMP7-2-M10` (komputer sebagai sistem: masukan, proses, keluaran) |",
          "| a | b | c | d |\n| x |",
        ),
      ),
    ).toThrow();
  });
});
