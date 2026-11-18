/**
 * Tests for `src/domain/sd-corpus-audit.ts` and the `sd-*` schemas: the
 * committed `data/sd-coding/` corpus is clean, and each class of corruption
 * (schema, structure, reference, and above all the rule that a `P-`
 * introduction never counts as covering a CP item) is reported precisely,
 * in memory, without touching the committed files.
 */

import { describe, expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import type { CorpusSource } from "../../src/domain/corpus-audit";
import {
  auditSdCorpus,
  SD_DATA_FILE_REGISTRY,
  SD_EXPECTED_COUNTS,
} from "../../src/domain/sd-corpus-audit";
import { sdBridgesFileSchema } from "../../src/schema/sd-bridges";
import { sdCpElementsFileSchema } from "../../src/schema/sd-cp";
import { sdCpMappingFileSchema } from "../../src/schema/sd-cp-mapping";
import { sdStructureFileSchema } from "../../src/schema/sd-structure";
import { sdWeekSchema, sdWeeksFileSchema } from "../../src/schema/sd-week";

// biome-ignore lint/suspicious/noExplicitAny: fixture data is mutated freely
type Json = any;

const repoRoot = join(import.meta.dir, "..", "..");
const read = (path: string): unknown => JSON.parse(readFileSync(join(repoRoot, path), "utf-8"));

/** A fresh deep copy of the committed corpus, as a mutable name -> JSON map. */
function corpus(): Map<string, Json> {
  return new Map(
    SD_DATA_FILE_REGISTRY.map((entry) => [entry.file, read(`data/sd-coding/${entry.file}`)]),
  );
}

function audit(files: Map<string, Json>) {
  const source: CorpusSource = new Map(
    [...files].map(([name, data]) => [name, { ok: true as const, data }]),
  );
  return auditSdCorpus(source);
}

function messages(result: ReturnType<typeof audit>, file: string): string {
  return result.findings
    .filter((finding) => finding.file === file)
    .map((finding) => `${finding.path}: ${finding.message}`)
    .join("\n");
}

function week(files: Map<string, Json>, id: string): Json {
  return files.get("weeks.json").weeks.find((candidate: { id: string }) => candidate.id === id);
}

describe("auditSdCorpus on the committed corpus", () => {
  test("is clean and validates all five files", () => {
    const result = audit(corpus());
    expect(result.findings).toEqual([]);
    expect(result.ok).toBe(true);
    expect(result.summary.filesValidated).toBe(5);
    expect(result.summary.filesMissing).toBe(0);
    expect(result.summary.filesUnregistered).toBe(0);
  });

  test("has the record counts of the approved v1.0 syllabus", () => {
    const files = corpus();
    expect(files.get("cp-elements.json").quotes).toHaveLength(SD_EXPECTED_COUNTS.cpQuotes);
    expect(files.get("cp-elements.json").items).toHaveLength(SD_EXPECTED_COUNTS.cpItems);
    expect(files.get("structure.json").stages).toHaveLength(3);
    expect(files.get("structure.json").rows).toHaveLength(8);
    expect(files.get("weeks.json").weeks).toHaveLength(168);
    expect(files.get("cp-mapping.json").mappings).toHaveLength(16);
    expect(files.get("bridges.json").bridges).toHaveLength(3);
  });

  test("kelas 1-4 only introduce; only kelas 5-6 reference CP items", () => {
    const weeks = corpus().get("weeks.json").weeks as Array<{
      kelas: number;
      stage: number;
      introduces: string[];
      cpItems: string[];
      cpElements: string[];
    }>;
    for (const entry of weeks) {
      if (entry.kelas <= 4) {
        expect(entry.cpItems).toEqual([]);
        expect(entry.cpElements).toEqual([]);
        expect(entry.introduces.length).toBeGreaterThan(0);
        expect(entry.stage).toBe(entry.kelas <= 3 ? 1 : 2);
      } else {
        expect(entry.introduces).toEqual([]);
        expect(entry.stage).toBe(3);
      }
    }
  });

  test("every CP item is fulfilled in kelas 5-6 only", () => {
    const files = corpus();
    const mappings = files.get("cp-mapping.json").mappings as Array<{ weeks: string[] }>;
    for (const mapping of mappings) {
      for (const code of mapping.weeks) {
        expect(code.startsWith("SD5-") || code.startsWith("SD6-")).toBe(true);
      }
    }
  });
});

describe("auditSdCorpus: file level", () => {
  test("a missing file is reported", () => {
    const files = corpus();
    files.delete("structure.json");
    const result = audit(files);
    expect(result.ok).toBe(false);
    expect(result.summary.filesMissing).toBe(1);
    expect(messages(result, "structure.json")).toContain("required data file is missing");
  });

  test("invalid JSON is reported", () => {
    const source: CorpusSource = new Map([["weeks.json", { ok: false as const, error: "boom" }]]);
    const result = auditSdCorpus(source);
    expect(
      result.findings.some(
        (f) => f.file === "weeks.json" && f.message.includes("invalid JSON: boom"),
      ),
    ).toBe(true);
  });

  test("an unregistered file is reported, modules.json included (sd-coding has no module index)", () => {
    const files = corpus();
    files.set("stray.json", {});
    files.set("modules.json", {});
    const result = audit(files);
    expect(result.summary.filesUnregistered).toBe(2);
    expect(messages(result, "stray.json")).toContain("not covered by any schema");
    expect(messages(result, "modules.json")).toContain("not covered by any schema");
  });

  test("a schema violation is reported with its path", () => {
    const files = corpus();
    files.get("weeks.json").weeks[0].id = "bukan-kode";
    expect(messages(audit(files), "weeks.json")).toContain("weeks.0.id");
  });
});

describe("auditSdCorpus: structure", () => {
  test("a wrong number of CP items is reported", () => {
    const files = corpus();
    files.get("cp-elements.json").items.pop();
    expect(messages(audit(files), "cp-elements.json")).toContain("expected exactly 16 CP items");
  });

  test("a dropped week is reported as an incomplete semester", () => {
    const files = corpus();
    files.get("weeks.json").weeks = files
      .get("weeks.json")
      .weeks.filter((entry: { id: string }) => entry.id !== "SD3-2-M5");
    const text = messages(audit(files), "weeks.json");
    expect(text).toContain("expected exactly 168 weeks, found 167");
    expect(text).toContain("weeks[semesterCode=SD3-2]");
  });

  test("a class with no weeks at all is reported", () => {
    const files = corpus();
    files.get("weeks.json").weeks = files
      .get("weeks.json")
      .weeks.filter((entry: { kelas: number }) => entry.kelas !== 2);
    expect(messages(audit(files), "weeks.json")).toContain("kelas 2 has no weeks for semester 1");
  });

  test("a week whose stage disagrees with its class is reported", () => {
    const files = corpus();
    const target = week(files, "SD4-1-M3");
    target.stage = 1;
    expect(messages(audit(files), "weeks.json")).toContain(
      "SD4-1-M3: kelas 4 belongs to stage 2 (structure.json), not 1",
    );
  });

  test("a kelas outside every stage, and a CP stage that holds a kelas 1-4 class, are reported", () => {
    const files = corpus();
    const stages = files.get("structure.json").stages;
    stages[1].classes = [3];
    stages[2].classes = [4, 5, 6];
    const text = messages(audit(files), "structure.json");
    expect(text).toContain("the stages must cover kelas 1..6 exactly once each");
    expect(text).toContain("stage 3 must hold only kelas 5 and 6");
  });

  test("a kelas 5-6 class under a non-CP stage and a wrong meetsCp are reported", () => {
    const files = corpus();
    const stages = files.get("structure.json").stages;
    stages[0].classes = [1, 2, 3, 5];
    stages[0].meetsCp = true;
    const text = messages(audit(files), "structure.json");
    expect(text).toContain("kelas 5-6 belong to the CP stage only");
    expect(text).toContain("only stage 3 (Fase C) fulfils the CP");
  });

  test("time structure that does not add up is reported", () => {
    const files = corpus();
    const structure = files.get("structure.json");
    structure.weeksPerSemester.teaching = 12;
    structure.semesterPattern.assessmentWeek = 12;
    structure.semesterPattern.materiFromWeek = 2;
    structure.semesterPattern.miniProjectWeek = 5;
    structure.semesterPattern.materiToWeek = 5;
    structure.weeksPerYear[0].reserve = 1;
    structure.weeksPerYear[1].used = 20;
    structure.stages[2].minutesPerWeek = 60;
    structure.jpLoad[0].used = 99;
    structure.jpLoad[1].allocated = 70;
    structure.jpLoad[1].weeks = 20;
    structure.jpLoad[1].jpPerWeek = 1;
    const text = messages(audit(files), "structure.json");
    expect(text).toContain("weeksPerSemester.teaching: must equal 14");
    expect(text).toContain("semesterPattern.materiFromWeek: must be week 1");
    expect(text).toContain("semesterPattern.miniProjectWeek: must be the week before");
    expect(text).toContain("semesterPattern.materiToWeek");
    expect(text).toContain("weeksPerYear[0].reserve: must equal available - used");
    expect(text).toContain(
      "weeksPerYear[1].used: must equal semestersPerClass x teaching weeks = 24",
    );
    expect(text).toContain("stages[2].minutesPerWeek: must equal jpPerWeek x 35");
    expect(text).toContain("jpLoad[0].used: must equal weeks x jpPerWeek");
    expect(text).toContain("jpLoad[1].weeks: must equal 24");
    expect(text).toContain("jpLoad[1].jpPerWeek: must equal the CP stage's 2 JP per week");
    expect(text).toContain("jpLoad[1].allocated");
  });

  test("a JP load above the allocation, a missing class and a weeks-per-year gap are reported", () => {
    const files = corpus();
    const structure = files.get("structure.json");
    structure.jpLoad[0].allocated = 40;
    structure.jpLoad.pop();
    structure.weeksPerYear.pop();
    const text = messages(audit(files), "structure.json");
    expect(text).toContain("jpLoad[0].used: must not exceed the JP the regulation allocates");
    expect(text).toContain("jpLoad: must hold exactly kelas 5 and 6");
    expect(text).toContain("weeksPerYear: must cover kelas 1..6 exactly once each");
  });

  test("a wrong stage, row or semester count is reported", () => {
    const files = corpus();
    const structure = files.get("structure.json");
    structure.stages.pop();
    structure.rows.pop();
    structure.semestersPerClass = 3;
    const text = messages(audit(files), "structure.json");
    expect(text).toContain("expected exactly 3 stages, found 2");
    expect(text).toContain("expected exactly 8 structure rows, found 7");
    expect(text).toContain("expected exactly 2 semesters per class, found 3");
  });

  test("a wrong mapping and bridge count is reported", () => {
    const files = corpus();
    files.get("cp-mapping.json").mappings.pop();
    files.get("bridges.json").bridges.pop();
    expect(messages(audit(files), "cp-mapping.json")).toContain("expected exactly 16 CP mappings");
    expect(messages(audit(files), "bridges.json")).toContain(
      "expected exactly 3 bridge paragraphs, found 2",
    );
  });
});

describe("auditSdCorpus: references", () => {
  test("a CP item that no week fulfils is reported", () => {
    const files = corpus();
    const mappings = files.get("cp-mapping.json").mappings;
    const index = mappings.findIndex((m: { cpCode: string }) => m.cpCode === "C-LE-c");
    mappings[index].cpCode = "C-LE-z";
    const text = messages(audit(files), "cp-mapping.json");
    expect(text).toContain('CP item "C-LE-z" is not in cp-elements.json');
    expect(text).toContain('CP item "C-LE-c" is not fulfilled by any week');
  });

  test("a week that cites an unknown CP item or element is reported", () => {
    const files = corpus();
    week(files, "SD5-1-M1").cpItems = ["C-BK-z"];
    week(files, "SD5-1-M14").cpElements = ["BK", "LD"];
    week(files, "SD4-1-M1").leadsTo = ["C-BK-y"];
    const result = audit(files);
    expect(messages(result, "weeks.json")).toContain('CP item "C-BK-z" is not in cp-elements.json');
    expect(messages(result, "weeks.json")).toContain('CP item "C-BK-y" is not in cp-elements.json');
  });

  test("a leadsTo hint that does not follow from an introduction of the same element is reported", () => {
    const files = corpus();
    week(files, "SD4-1-M1").leadsTo = ["C-LD-a"];
    expect(messages(audit(files), "weeks.json")).toContain(
      'SD4-1-M1: "C-LD-a" must lead from an introduction of the same element',
    );
  });

  test("a mapped week that does not exist is reported", () => {
    const files = corpus();
    const row = files.get("cp-mapping.json").mappings[0];
    row.weeks[0] = "SD5-2-M12";
    row.weeksText = "SD5-2-M12";
    const text = messages(audit(files), "cp-mapping.json");
    // SD5-2-M12 exists but is a [penguatan] week and does not cite C-BK-a
    expect(text).toContain("SD5-2-M12 is marked [penguatan]");
    expect(text).toContain("SD5-2-M12 does not cite C-BK-a");
  });

  test("weeksText that no longer expands to weeks, and unparseable notation, are reported", () => {
    const files = corpus();
    files.get("cp-mapping.json").mappings[0].weeksText = "SD5-1-M1, M2";
    files.get("cp-mapping.json").mappings[1].weeksText = "ngawur";
    const text = messages(audit(files), "cp-mapping.json");
    expect(text).toContain('does not equal weeksText "SD5-1-M1, M2" expanded');
    expect(text).toContain("cannot parse week notation");
  });

  test("a P- introduction week in the mapping is rejected: it is not CP coverage", () => {
    const files = corpus();
    const row = files.get("cp-mapping.json").mappings[0];
    row.weeks.push("SD4-1-M1");
    row.weeksText += ", SD4-1-M1";
    // the schema already refuses a kelas 1-4 week code in the mapping
    const schemaText = messages(audit(files), "cp-mapping.json");
    expect(schemaText).toContain("only kelas 5-6 fulfil the CP");
    expect(sdCpMappingFileSchema.safeParse(files.get("cp-mapping.json")).success).toBe(false);
  });

  test("a stage 3 week that is relabelled as an introduction is not counted: schema and audit refuse", () => {
    const files = corpus();
    const target = week(files, "SD5-1-M1");
    target.stage = 2;
    const text = messages(audit(files), "weeks.json");
    expect(text).toContain("a stage 2 week (kelas 1-4) is outside the CP");
  });

  test("a mapped week that cites a different item and a [penguatan] week are reported", () => {
    const files = corpus();
    week(files, "SD5-1-M1").cpItems = ["C-BK-b"];
    week(files, "SD5-1-M6").strengthening = true;
    const text = messages(audit(files), "cp-mapping.json");
    expect(text).toContain("SD5-1-M1 does not cite C-BK-a");
    expect(text).toContain("SD5-1-M6 is marked [penguatan]");
  });

  test("a mapped week that is a stage 1-2 introduction is reported by the audit too", () => {
    const files = corpus();
    // bypass the schema by editing the weeks only: make SD6-1-M1 look like kelas-4 content
    const target = week(files, "SD6-1-M1");
    target.stage = 2;
    target.cpItems = [];
    target.introduces = ["P-BK"];
    const text = [
      messages(audit(files), "cp-mapping.json"),
      messages(audit(files), "weeks.json"),
    ].join("\n");
    expect(text).toContain("SD6-1-M1 is a stage 2 introduction (kelas 1-4), outside the CP");
  });

  test("a mapped week that is not in weeks.json is reported", () => {
    const files = corpus();
    files.get("weeks.json").weeks = files
      .get("weeks.json")
      .weeks.filter((entry: { id: string }) => entry.id !== "SD5-1-M6");
    expect(messages(audit(files), "cp-mapping.json")).toContain(
      'week "SD5-1-M6" is not in weeks.json',
    );
  });

  test("an item label that is not a cut of its quotation, and an element with no item, are reported", () => {
    const files = corpus();
    const cp = files.get("cp-elements.json");
    cp.items[0].label = "kalimat yang tidak ada di CP";
    cp.items = cp.items.filter((item: { elementId: string }) => item.elementId !== "PP");
    const text = messages(audit(files), "cp-elements.json");
    expect(text).toContain("C-BK-a: label is not a verbatim cut of the element's quotation");
    expect(text).toContain("element PP has a quotation but no CP item");
  });

  test("the enrichment weeks of the OSN statement must exist and stay outside the CP", () => {
    const files = corpus();
    files.get("bridges.json").osn.enrichmentWeeks = ["SD5-1-M1"];
    expect(messages(audit(files), "bridges.json")).toContain("is a CP week");
    files.get("weeks.json").weeks = files
      .get("weeks.json")
      .weeks.filter((entry: { id: string }) => entry.id !== "SD5-1-M1");
    expect(messages(audit(files), "bridges.json")).toContain(
      'week "SD5-1-M1" is not in weeks.json',
    );
  });

  test("a missing bridge id is reported", () => {
    const files = corpus();
    files.get("bridges.json").bridges.pop();
    const text = messages(audit(files), "bridges.json");
    expect(text).toContain('bridge "ke-sma" is missing');
  });
});

describe("sd schemas", () => {
  const goodWeek = () => ({
    id: "SD5-1-M1",
    kelas: 5,
    semester: 1,
    semesterCode: "SD5-1",
    week: 1,
    stage: 3,
    topic: "t",
    itemsText: "C-BK-a",
    exercise: "e",
    introduces: [],
    leadsTo: [],
    cpItems: ["C-BK-a"],
    cpElements: [],
    strengthening: false,
    screenOption: false,
  });

  test("a CP week and an introduction week are accepted in their own shape", () => {
    expect(sdWeekSchema.safeParse(goodWeek()).success).toBe(true);
    expect(
      sdWeekSchema.safeParse({
        ...goodWeek(),
        id: "SD1-1-M1",
        kelas: 1,
        semesterCode: "SD1-1",
        stage: 1,
        itemsText: "P-BK",
        introduces: ["P-BK"],
        cpItems: [],
      }).success,
    ).toBe(true);
  });

  test("a week's id and semesterCode must follow kelas, semester and week", () => {
    const bad = sdWeekSchema.safeParse({ ...goodWeek(), id: "SD5-1-M2", semesterCode: "SD6-1" });
    expect(bad.success).toBe(false);
    const issues = bad.success ? [] : bad.error.issues.map((issue) => issue.message);
    expect(issues).toContain('must be "SD5-1"');
    expect(issues).toContain('must be "SD5-1-M1"');
  });

  test("a stage 3 week may not carry a P- introduction nor be empty of CP references", () => {
    const withIntro = sdWeekSchema.safeParse({ ...goodWeek(), introduces: ["P-BK"] });
    expect(withIntro.success).toBe(false);
    const empty = sdWeekSchema.safeParse({ ...goodWeek(), cpItems: [] });
    expect(empty.success).toBe(false);
  });

  test("a stage 1-2 week may not reference a CP item as covered, and must introduce", () => {
    const covered = sdWeekSchema.safeParse({
      ...goodWeek(),
      stage: 2,
      kelas: 4,
      id: "SD4-1-M1",
      semesterCode: "SD4-1",
      introduces: ["P-BK"],
    });
    expect(covered.success).toBe(false);
    const bare = sdWeekSchema.safeParse({
      ...goodWeek(),
      stage: 2,
      kelas: 4,
      id: "SD4-1-M1",
      semesterCode: "SD4-1",
      cpItems: [],
    });
    expect(bare.success).toBe(false);
  });

  test("duplicate week ids are refused", () => {
    const file = read("data/sd-coding/weeks.json") as Json;
    file.weeks[1] = file.weeks[0];
    expect(sdWeeksFileSchema.safeParse(file).success).toBe(false);
  });

  test("cp-elements: a mismatching title, a foreign code prefix, duplicates and an unquoted element are refused", () => {
    const base = read("data/sd-coding/cp-elements.json") as Json;
    const titled = structuredClone(base);
    titled.quotes[0].elementTitle = "Literasi Digital";
    expect(sdCpElementsFileSchema.safeParse(titled).success).toBe(false);
    const prefixed = structuredClone(base);
    prefixed.items[0].elementId = "LD";
    expect(sdCpElementsFileSchema.safeParse(prefixed).success).toBe(false);
    const duplicated = structuredClone(base);
    duplicated.items[1].code = duplicated.items[0].code;
    duplicated.quotes[1] = duplicated.quotes[0];
    const result = sdCpElementsFileSchema.safeParse(duplicated);
    expect(result.success).toBe(false);
    const unquoted = structuredClone(base);
    unquoted.quotes = unquoted.quotes.filter((q: { elementId: string }) => q.elementId !== "BK");
    expect(sdCpElementsFileSchema.safeParse(unquoted).success).toBe(false);
  });

  test("cp-mapping: duplicate items and a duplicate week are refused", () => {
    const base = read("data/sd-coding/cp-mapping.json") as Json;
    const items = structuredClone(base);
    items.mappings[1].cpCode = items.mappings[0].cpCode;
    expect(sdCpMappingFileSchema.safeParse(items).success).toBe(false);
    const weeks = structuredClone(base);
    weeks.mappings[0].weeks[1] = weeks.mappings[0].weeks[0];
    expect(sdCpMappingFileSchema.safeParse(weeks).success).toBe(false);
  });

  test("structure: duplicate stage ids and row ids are refused", () => {
    const base = read("data/sd-coding/structure.json") as Json;
    const stages = structuredClone(base);
    stages.stages[1].id = 1;
    expect(sdStructureFileSchema.safeParse(stages).success).toBe(false);
    const rows = structuredClone(base);
    rows.rows[1].id = rows.rows[0].id;
    expect(sdStructureFileSchema.safeParse(rows).success).toBe(false);
  });

  test("bridges: duplicate bridge ids are refused and the OSN status can only be tidak-ada", () => {
    const base = read("data/sd-coding/bridges.json") as Json;
    const dup = structuredClone(base);
    dup.bridges[1].id = dup.bridges[0].id;
    expect(sdBridgesFileSchema.safeParse(dup).success).toBe(false);
    const status = structuredClone(base);
    status.osn.status = "ada";
    expect(sdBridgesFileSchema.safeParse(status).success).toBe(false);
  });
});
