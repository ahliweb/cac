/**
 * Tests for `src/domain/sma-corpus-audit.ts` and the `sma-*` schemas:
 * the committed `data/sma-coding/` corpus is clean, and each class of
 * corruption (schema, structure, reference, cross-programme reference) is
 * reported precisely, in memory, without touching the committed files.
 */

import { describe, expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import type { CorpusSource } from "../../src/domain/corpus-audit";
import { auditSmaCorpus, SMA_DATA_FILE_REGISTRY } from "../../src/domain/sma-corpus-audit";
import { cpElementsFileSchema } from "../../src/schema/sma-cp";
import { smaFoundationFileSchema, smaFoundationWeekSchema } from "../../src/schema/sma-foundation";
import { smaWeekSchema } from "../../src/schema/sma-week";

// biome-ignore lint/suspicious/noExplicitAny: fixture data is mutated freely
type Json = any;

const repoRoot = join(import.meta.dir, "..", "..");
const read = (path: string): unknown => JSON.parse(readFileSync(join(repoRoot, path), "utf-8"));

const osnFamilyIds: ReadonlySet<string> = new Set(
  (
    read("data/osn/topic-families.json") as { topicFamilies: Array<{ id: string }> }
  ).topicFamilies.map((family) => family.id),
);

/** A fresh deep copy of the committed corpus, as a mutable name -> JSON map. */
function corpus(): Map<string, Json> {
  return new Map(
    SMA_DATA_FILE_REGISTRY.map((entry) => [entry.file, read(`data/sma-coding/${entry.file}`)]),
  );
}

function audit(files: Map<string, Json>, ids: ReadonlySet<string> | null = osnFamilyIds) {
  const source: CorpusSource = new Map(
    [...files].map(([name, data]) => [name, { ok: true as const, data }]),
  );
  return auditSmaCorpus(source, ids ?? undefined);
}

function messages(result: ReturnType<typeof audit>, file: string): string {
  return result.findings
    .filter((finding) => finding.file === file)
    .map((finding) => `${finding.path}: ${finding.message}`)
    .join("\n");
}

describe("auditSmaCorpus on the committed corpus", () => {
  test("is clean and validates all seven files", () => {
    const result = audit(corpus());
    expect(result.findings).toEqual([]);
    expect(result.ok).toBe(true);
    expect(result.summary.filesValidated).toBe(7);
    expect(result.summary.filesMissing).toBe(0);
    expect(result.summary.filesUnregistered).toBe(0);
  });

  test("has the record counts of the approved v1.1 syllabus", () => {
    const files = corpus();
    expect(files.get("cp-elements.json").quotes).toHaveLength(6);
    expect(files.get("cp-elements.json").items).toHaveLength(36);
    expect(files.get("tracks.json").tracks.map((t: { id: string }) => t.id)).toEqual(["A", "B"]);
    expect(files.get("structure.json").rows).toHaveLength(7);
    expect(files.get("weeks.json").weeks).toHaveLength(154);
    expect(files.get("foundation.json").weeks).toHaveLength(7);
    expect(files.get("cp-mapping.json").mappings).toHaveLength(26);
    expect(files.get("osn-bridge.json").bridges).toHaveLength(10);
  });
});

describe("auditSmaCorpus: file level", () => {
  test("a missing file is reported", () => {
    const files = corpus();
    files.delete("tracks.json");
    const result = audit(files);
    expect(result.ok).toBe(false);
    expect(result.summary.filesMissing).toBe(1);
    expect(messages(result, "tracks.json")).toContain("required data file is missing");
  });

  test("invalid JSON is reported", () => {
    const source: CorpusSource = new Map([["weeks.json", { ok: false as const, error: "boom" }]]);
    const result = auditSmaCorpus(source, osnFamilyIds);
    expect(
      result.findings.some(
        (f) => f.file === "weeks.json" && f.message.includes("invalid JSON: boom"),
      ),
    ).toBe(true);
  });

  test("an unregistered file is reported, but modules.json is allowed", () => {
    const files = corpus();
    files.set("stray.json", {});
    files.set("modules.json", {});
    const result = audit(files);
    expect(result.summary.filesUnregistered).toBe(1);
    expect(messages(result, "stray.json")).toContain("not covered by any schema");
    expect(messages(result, "modules.json")).toBe("");
  });

  test("a schema violation is reported with its path", () => {
    const files = corpus();
    files.get("weeks.json").weeks[0].id = "bukan-kode";
    const result = audit(files);
    expect(messages(result, "weeks.json")).toContain("weeks.0.id");
  });
});

describe("auditSmaCorpus: structure", () => {
  test("a wrong number of CP items is reported", () => {
    const files = corpus();
    files.get("cp-elements.json").items.pop();
    expect(messages(audit(files), "cp-elements.json")).toContain("expected exactly 36 CP items");
  });

  test("an incomplete semester is reported", () => {
    const files = corpus();
    files.get("weeks.json").weeks.splice(3, 1);
    expect(messages(audit(files), "weeks.json")).toContain("A-X1");
  });

  test("the foundation semester of a track must be exactly the weeks 8..14", () => {
    const files = corpus();
    const weeks = files.get("weeks.json").weeks;
    const index = weeks.findIndex((week: { id: string }) => week.id === "A-X1-M8");
    weeks.splice(index, 1);
    expect(messages(audit(files), "weeks.json")).toContain(
      "must contain exactly the weeks 8..14 once each; found [9, 10, 11, 12, 13, 14]",
    );
  });

  test("a track week 1..7 in the foundation semester is rejected", () => {
    const files = corpus();
    const weeks = files.get("weeks.json").weeks;
    const copy = { ...weeks.find((week: { id: string }) => week.id === "A-X1-M8") };
    copy.id = "A-X1-M7";
    copy.week = 7;
    weeks.push(copy);
    expect(messages(audit(files), "weeks.json")).toContain("A-X1");
  });

  test("the foundation block must have exactly the weeks 1..7 of FND-X1", () => {
    const files = corpus();
    files.get("foundation.json").weeks.pop();
    expect(messages(audit(files), "foundation.json")).toContain(
      "must contain exactly the weeks 1..7 of FND-X1 once each",
    );
    expect(messages(audit(files), "foundation.json")).toContain("[1, 2, 3, 4, 5, 6]");
    expect(messages(audit(files), "cp-elements.json")).toBe("");
  });

  test("a foundation week outside FND-X1 is reported", () => {
    const files = corpus();
    const week = files.get("foundation.json").weeks[0];
    Object.assign(week, { id: "FND-X2-M1", semester: "X2", semesterCode: "FND-X2" });
    expect(messages(audit(files), "foundation.json")).toContain(
      "the foundation block exists only in FND-X1",
    );
  });

  test("a track with a missing semester is reported", () => {
    const files = corpus();
    files.get("weeks.json").weeks = files
      .get("weeks.json")
      .weeks.filter((week: { semesterCode: string }) => week.semesterCode !== "B-XII2");
    expect(messages(audit(files), "weeks.json")).toContain(
      "track B has no weeks for semester XII2",
    );
  });

  test("structure.json must agree with the 14-week semester", () => {
    const files = corpus();
    files.get("structure.json").weeksPerSemester.teaching = 12;
    files.get("structure.json").semesterPattern.assessmentWeek = 13;
    const text = messages(audit(files), "structure.json");
    expect(text).toContain("weeksPerSemester.teaching");
    expect(text).toContain("semesterPattern.assessmentWeek");
  });

  test("a week whose kelas/phase disagree with structure.json is reported", () => {
    const files = corpus();
    const weeks = files.get("weeks.json").weeks;
    const index = weeks.findIndex((week: { id: string }) => week.id === "A-XI1-M1");
    weeks[index].phase = "E";
    expect(messages(audit(files), "weeks.json")).toContain("disagree with structure.json");
  });
});

describe("auditSmaCorpus: references", () => {
  test("a CP mapping to an unknown CP item is reported", () => {
    const files = corpus();
    files.get("cp-mapping.json").mappings[0].cpCode = "E-BK-z";
    expect(messages(audit(files), "cp-mapping.json")).toContain(
      "does not exist in cp-elements.json",
    );
  });

  test("a CP mapping to an unknown week is reported", () => {
    const files = corpus();
    const row = files.get("cp-mapping.json").mappings[0];
    row.weeksText = "A-X2-M4..M9; C-X1-M1";
    row.weeks = [...row.weeks, "C-X1-M1"];
    const result = audit(files);
    expect(messages(result, "cp-mapping.json")).toContain("does not exist in weeks.json");
  });

  test("foundation weeks may be cited by a row whatever tracks it lists", () => {
    const files = corpus();
    const row = files
      .get("cp-mapping.json")
      .mappings.find((m: { cpCode: string }) => m.cpCode === "E-BK-e");
    expect(row.weeksText).toBe("FND-X1-M1..M2");
    row.tracks = ["A"];
    expect(audit(files).findings).toEqual([]);
  });

  test("a cited foundation week that does not exist is reported", () => {
    const files = corpus();
    files.get("foundation.json").weeks.pop();
    const text = messages(audit(files), "cp-mapping.json");
    expect(text).toContain('week "FND-X1-M7" does not exist in weeks.json');
  });

  test("a week of a track the row does not list is reported", () => {
    const files = corpus();
    const row = files.get("cp-mapping.json").mappings[0];
    row.tracks = ["A"];
    expect(messages(audit(files), "cp-mapping.json")).toContain("belongs to track B");
  });

  test("a CP mapping to an unknown track is reported", () => {
    const files = corpus();
    files.get("cp-mapping.json").mappings[0].tracks = ["A", "Z"];
    expect(messages(audit(files), "cp-mapping.json")).toContain('track "Z" is not in tracks.json');
  });

  test("weeks that do not equal weeksText expanded are reported", () => {
    const files = corpus();
    files.get("cp-mapping.json").mappings[0].weeks.pop();
    files.get("osn-bridge.json").bridges[0].weeks.pop();
    const result = audit(files);
    expect(messages(result, "cp-mapping.json")).toContain("does not equal weeksText");
    expect(messages(result, "osn-bridge.json")).toContain("does not equal weeksText");
  });

  test("unparsable week notation is reported", () => {
    const files = corpus();
    files.get("cp-mapping.json").mappings[0].weeksText = "minggu 4";
    files.get("osn-bridge.json").bridges[0].weeksText = "M3";
    const result = audit(files);
    expect(messages(result, "cp-mapping.json")).toContain("cannot parse week notation");
    expect(messages(result, "osn-bridge.json")).toContain("cannot parse week notation");
  });

  test("a CP mapping filed under the wrong section is reported", () => {
    const files = corpus();
    files.get("cp-mapping.json").mappings[0].sourceSection = "bagian 4.2";
    expect(messages(audit(files), "cp-mapping.json")).toContain("belongs to bagian 4.1");
  });

  test("a week of an unlisted track is reported", () => {
    const files = corpus();
    files.get("tracks.json").tracks.pop();
    expect(messages(audit(files), "weeks.json")).toContain('track "B" is not in tracks.json');
  });

  test("a bridge to an OSN topic family that does not exist is reported", () => {
    const files = corpus();
    files.get("osn-bridge.json").bridges[0].familyId = "tidak-ada";
    const text = messages(audit(files), "osn-bridge.json");
    expect(text).toContain(
      'OSN topic family "tidak-ada" does not exist in data/osn/topic-families.json',
    );
    expect(text).toContain('"dasar-pemrograman" is not covered');
  });

  test("a bridge week of another track is reported", () => {
    const files = corpus();
    const row = files.get("osn-bridge.json").bridges[0];
    row.weeksText = "B-X1-M9";
    row.weeks = ["B-X1-M9"];
    expect(messages(audit(files), "osn-bridge.json")).toContain("belongs to track B");
  });

  test("an unknown bridge track is reported", () => {
    const files = corpus();
    files.get("osn-bridge.json").track = "Z";
    expect(messages(audit(files), "osn-bridge.json")).toContain('track "Z" is not in tracks.json');
  });

  test("an unloadable OSN corpus is reported instead of skipping the check", () => {
    const result = audit(corpus(), null);
    expect(messages(result, "osn-bridge.json")).toContain("could not be loaded");
  });
});

describe("sma schemas", () => {
  test("a CP quote whose element name does not match its element id is rejected", () => {
    const file = read("data/sma-coding/cp-elements.json") as Json;
    file.quotes[0].elementTitle = "Analisis Data";
    expect(cpElementsFileSchema.safeParse(file).success).toBe(false);
  });

  test("a CP item whose code disagrees with its phase is rejected", () => {
    const file = read("data/sma-coding/cp-elements.json") as Json;
    file.items[0].phase = "F";
    expect(cpElementsFileSchema.safeParse(file).success).toBe(false);
  });

  test("duplicate CP codes and items without a quotation are rejected", () => {
    const file = read("data/sma-coding/cp-elements.json") as Json;
    file.items.push({ ...file.items[0] });
    file.quotes = file.quotes.filter(
      (q: { phase: string; elementId: string }) => !(q.phase === "F" && q.elementId === "AD"),
    );
    const result = cpElementsFileSchema.safeParse(file);
    expect(result.success).toBe(false);
    const text = JSON.stringify(result.error?.issues);
    expect(text).toContain("duplicate CP item code");
    expect(text).toContain("no quotation exists for phase F, element AD");
  });

  test("a week record whose id, semesterCode or kelas is inconsistent is rejected", () => {
    const week = (read("data/sma-coding/weeks.json") as Json).weeks[0];
    expect(smaWeekSchema.safeParse(week).success).toBe(true);
    expect(smaWeekSchema.safeParse({ ...week, id: "A-X1-M2" }).success).toBe(false);
    expect(smaWeekSchema.safeParse({ ...week, semesterCode: "B-X1" }).success).toBe(false);
    expect(smaWeekSchema.safeParse({ ...week, kelas: "XI" }).success).toBe(false);
  });
});

describe("foundation schema", () => {
  const file = () => read("data/sma-coding/foundation.json") as Json;

  test("the committed foundation file is valid and carries FND-X1-M1..M7", () => {
    const data = file();
    expect(smaFoundationFileSchema.safeParse(data).success).toBe(true);
    expect(data.weeks.map((w: { id: string }) => w.id)).toEqual(
      [1, 2, 3, 4, 5, 6, 7].map((n) => `FND-X1-M${n}`),
    );
  });

  test("an inconsistent id, semesterCode or kelas is rejected", () => {
    const week = file().weeks[0];
    expect(smaFoundationWeekSchema.safeParse({ ...week, id: "FND-X1-M2" }).success).toBe(false);
    expect(smaFoundationWeekSchema.safeParse({ ...week, semesterCode: "FND-X2" }).success).toBe(
      false,
    );
    expect(smaFoundationWeekSchema.safeParse({ ...week, kelas: "XI" }).success).toBe(false);
    expect(smaFoundationWeekSchema.safeParse({ ...week, id: "A-X1-M1" }).success).toBe(false);
  });

  test("duplicate foundation week ids are rejected", () => {
    const data = file();
    data.weeks.push({ ...data.weeks[0] });
    expect(smaFoundationFileSchema.safeParse(data).success).toBe(false);
  });
});
