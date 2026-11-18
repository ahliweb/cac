/**
 * Tests for `src/domain/smp-corpus-audit.ts` and the `smp-*` schemas: the
 * committed `data/smp-coding/` corpus is clean, and each class of
 * corruption (schema, structure, reference, coverage accounting) is
 * reported precisely, in memory, without touching the committed files.
 */

import { describe, expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import type { CorpusSource } from "../../src/domain/corpus-audit";
import {
  auditSmpCorpus,
  SMP_DATA_FILE_REGISTRY,
  SMP_EXPECTED_COUNTS,
} from "../../src/domain/smp-corpus-audit";
import {
  parseSmpCpCell,
  parseSmpMappingWeeks,
  smpSemesterIndex,
} from "../../src/domain/smp-week-codes";
import { smpBridgeFileSchema } from "../../src/schema/smp-bridge";
import { smpClubFileSchema } from "../../src/schema/smp-club";
import { smpCpElementsFileSchema } from "../../src/schema/smp-cp";
import { smpCpMappingFileSchema } from "../../src/schema/smp-cp-mapping";
import { smpStructureFileSchema } from "../../src/schema/smp-structure";
import { smpUncoveredFileSchema } from "../../src/schema/smp-uncovered";
import { smpWeekSchema, smpWeeksFileSchema } from "../../src/schema/smp-week";

// biome-ignore lint/suspicious/noExplicitAny: fixture data is mutated freely
type Json = any;

const repoRoot = join(import.meta.dir, "..", "..");
const read = (path: string): Json => JSON.parse(readFileSync(join(repoRoot, path), "utf-8"));

/** A fresh deep copy of the committed corpus, as a mutable name -> JSON map. */
function corpus(): Map<string, Json> {
  return new Map(
    SMP_DATA_FILE_REGISTRY.map((entry) => [entry.file, read(`data/smp-coding/${entry.file}`)]),
  );
}

function audit(files: Map<string, Json>) {
  const source: CorpusSource = new Map(
    [...files].map(([name, data]) => [name, { ok: true as const, data }]),
  );
  return auditSmpCorpus(source);
}

function messages(result: ReturnType<typeof audit>, file: string): string {
  return result.findings
    .filter((finding) => finding.file === file)
    .map((finding) => `${finding.path}: ${finding.message}`)
    .join("\n");
}

function mappingOf(files: Map<string, Json>, code: string): Json {
  return files.get("cp-mapping.json").mappings.find((m: Json) => m.cpCode === code);
}

function weekOf(files: Map<string, Json>, id: string): Json {
  return files.get("weeks.json").weeks.find((w: Json) => w.id === id);
}

describe("auditSmpCorpus on the committed corpus", () => {
  test("is clean and validates all seven files", () => {
    const result = audit(corpus());
    expect(result.findings).toEqual([]);
    expect(result.ok).toBe(true);
    expect(result.summary.filesValidated).toBe(7);
    expect(result.summary.filesMissing).toBe(0);
    expect(result.summary.filesUnregistered).toBe(0);
  });

  test("has the record counts of the approved v1.0 syllabus", () => {
    const files = corpus();
    expect(files.get("cp-elements.json").quotes).toHaveLength(SMP_EXPECTED_COUNTS.cpQuotes);
    expect(files.get("cp-elements.json").items).toHaveLength(SMP_EXPECTED_COUNTS.cpItems);
    expect(files.get("structure.json").rows).toHaveLength(SMP_EXPECTED_COUNTS.structureRows);
    expect(files.get("weeks.json").weeks).toHaveLength(84);
    expect(files.get("weeks.json").semesters).toHaveLength(6);
    expect(files.get("cp-mapping.json").mappings).toHaveLength(35);
    expect(files.get("cp-mapping.json").enrichment).toHaveLength(3);
    expect(files.get("uncovered.json").items).toHaveLength(11);
    expect(files.get("club.json").stages).toHaveLength(3);
    expect(files.get("bridge.json").toSma).toHaveLength(6);
  });

  test("two CP texts: D-* codes for Informatika, DK-* codes for Koding dan KA", () => {
    const items = corpus().get("cp-elements.json").items as Array<{ code: string; family: string }>;
    const byFamily = (family: string) => items.filter((item) => item.family === family);
    expect(byFamily("informatika")).toHaveLength(22);
    expect(byFamily("kka")).toHaveLength(13);
    expect(byFamily("informatika").every((item) => item.code.startsWith("D-"))).toBe(true);
    expect(byFamily("kka").every((item) => item.code.startsWith("DK-"))).toBe(true);
  });

  test("python overlaps are never counted: DK-BK-c is named by 36 weeks but covered by 20", () => {
    const files = corpus();
    const weeks = files.get("weeks.json").weeks as Array<Json>;
    expect(weeks.filter((w) => w.cpCodes.includes("DK-BK-c"))).toHaveLength(20);
    expect(weeks.filter((w) => w.irisanCodes.includes("DK-BK-c"))).toHaveLength(16);
    const row = mappingOf(files, "DK-BK-c");
    expect(row.weeks.length + row.otherWeeks).toBe(36);
    expect(row.coverageText).toContain("melampaui rumusan CP");
  });

  test("the uncovered list is exactly the items no week covers", () => {
    const files = corpus();
    const covered = new Set(
      (files.get("weeks.json").weeks as Json[]).flatMap((week) => week.cpCodes),
    );
    const none = (files.get("cp-elements.json").items as Json[])
      .map((item) => item.code)
      .filter((code) => !covered.has(code));
    const listed = (files.get("uncovered.json").items as Json[]).map((item) => item.cpCode);
    expect([...listed].sort()).toEqual([...none].sort());
    expect(listed).toContain("D-LD-a");
    expect(listed).toContain("DK-PA-b");
  });
});

describe("auditSmpCorpus: file level", () => {
  test("a missing file is reported", () => {
    const files = corpus();
    files.delete("uncovered.json");
    const result = audit(files);
    expect(result.ok).toBe(false);
    expect(result.summary.filesMissing).toBe(1);
    expect(messages(result, "uncovered.json")).toContain("required data file is missing");
  });

  test("invalid JSON is reported", () => {
    const source: CorpusSource = new Map([["weeks.json", { ok: false as const, error: "boom" }]]);
    const result = auditSmpCorpus(source);
    expect(
      result.findings.some(
        (f) => f.file === "weeks.json" && f.message.includes("invalid JSON: boom"),
      ),
    ).toBe(true);
  });

  test("an unregistered file is reported, modules.json included (no module index yet)", () => {
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
    files.get("weeks.json").weeks[0].id = "SMP7-1-M99";
    const result = audit(files);
    expect(result.ok).toBe(false);
    expect(messages(result, "weeks.json")).toContain("weeks.0.id");
  });

  test("files transcribing different syllabus versions are reported", () => {
    const files = corpus();
    files.get("club.json").syllabusVersion = "9.9.9";
    expect(messages(audit(files), "club.json")).toContain(
      "every file transcribes the same syllabus",
    );
  });
});

describe("auditSmpCorpus: structure", () => {
  test("a missing week breaks the 84-week plan and the 1..14 semester run", () => {
    const files = corpus();
    files.get("weeks.json").weeks.splice(5, 1);
    const result = audit(files);
    const text = messages(result, "weeks.json");
    expect(text).toContain("expected exactly 84 weeks, found 83");
    expect(text).toContain("must contain exactly the weeks 1..14 once each");
    expect(messages(result, "structure.json")).toContain("but weeks.json has 83 weeks");
  });

  test("a semester absent from the plan, or present without being listed, is reported", () => {
    const files = corpus();
    files.get("weeks.json").semesters.pop();
    expect(messages(audit(files), "weeks.json")).toContain('semester "SMP9-2" is not in semesters');
    const other = corpus();
    other.get("weeks.json").weeks = other
      .get("weeks.json")
      .weeks.filter((w: Json) => w.semester !== "SMP9-2");
    expect(messages(audit(other), "weeks.json")).toContain('semester "SMP9-2" has no weeks');
  });

  test("structure totals must follow from the semester pattern and the load", () => {
    const files = corpus();
    const structure = files.get("structure.json");
    structure.totals.jp = 100;
    structure.totals.weeks = 80;
    structure.totals.semesters = 5;
    structure.weeksPerSemester.teaching = 12;
    structure.semesterPattern.assessmentWeek = 13;
    structure.semesterPattern.miniProjectWeek = 12;
    const text = messages(audit(files), "structure.json");
    expect(text).toContain("weeksPerSemester.teaching: must equal 14");
    expect(text).toContain("semesterPattern.assessmentWeek: must be the last teaching week");
    expect(text).toContain("semesterPattern: must run materi");
    expect(text).toContain("totals.semesters: must equal the number of semesters listed");
    expect(text).toContain("totals.weeks: must equal semesters x teaching weeks");
    expect(text).toContain("totals.jp: must equal weeks x jpPerWeek");
  });

  test("weeks.json semesters must agree with structure.json", () => {
    const files = corpus();
    files.get("structure.json").semesters[0].code = "SMP7-9";
    expect(messages(audit(files), "structure.json")).toContain("semester");
    const other = corpus();
    other.get("structure.json").semesters[1].kelas = "8";
    expect(messages(audit(other), "structure.json")).toContain("must start with its kelas");
  });

  test("a wrong number of CP items, mappings, uncovered items, club stages or bridge rows is reported", () => {
    const files = corpus();
    files.get("cp-elements.json").items.pop();
    files.get("cp-mapping.json").mappings.pop();
    files.get("cp-mapping.json").enrichment.pop();
    files.get("uncovered.json").items.pop();
    files.get("club.json").stages.pop();
    files.get("bridge.json").toSma.pop();
    const result = audit(files);
    expect(messages(result, "cp-elements.json")).toContain(
      "expected exactly 35 CP items, found 34",
    );
    expect(messages(result, "cp-mapping.json")).toContain("expected exactly 35 CP mappings");
    expect(messages(result, "cp-mapping.json")).toContain("expected exactly 3 enrichment entries");
    expect(messages(result, "uncovered.json")).toContain("expected exactly 11 uncovered CP items");
    expect(messages(result, "club.json")).toContain("expected exactly 3 club stages");
    expect(messages(result, "bridge.json")).toContain("expected exactly 6 bridge rows");
  });
});

describe("auditSmpCorpus: references and coverage accounting", () => {
  test("a week citing a CP item that does not exist is reported", () => {
    const files = corpus();
    weekOf(files, "SMP7-1-M1").cpCodes = ["D-BK-z"];
    expect(messages(audit(files), "weeks.json")).toContain(
      'CP item "D-BK-z" does not exist in cp-elements.json',
    );
  });

  test("a Python overlap before text programming starts is reported", () => {
    const files = corpus();
    weekOf(files, "SMP7-1-M3").irisanCodes = ["DK-BK-c"];
    weekOf(files, "SMP7-1-M3").cpCodes = ["D-BK-e"];
    expect(messages(audit(files), "weeks.json")).toContain(
      "marks a Python overlap (*) before text programming starts in SMP8-2",
    );
  });

  test("text programming must start in a semester of the structure", () => {
    const files = corpus();
    const structure = files.get("structure.json");
    structure.semesters = structure.semesters.filter((s: Json) => s.code !== "SMP8-2");
    expect(messages(audit(files), "structure.json")).toContain(
      'semester "SMP8-2" is not in structure.json',
    );
  });

  test("an item without a mapping row, and a mapping row for an unknown item, are reported", () => {
    const files = corpus();
    const mappings = files.get("cp-mapping.json").mappings;
    mappings[0].cpCode = "D-BK-z";
    const text = messages(audit(files), "cp-mapping.json");
    expect(text).toContain('CP item "D-BK-a" has no mapping row');
    expect(text).toContain('CP item "D-BK-z" does not exist in cp-elements.json');
  });

  test("mapped weeks must exist and must name the item", () => {
    const files = corpus();
    const row = mappingOf(files, "D-BK-a");
    row.weeks[0] = "SMP7-1-M3";
    row.weeksText = row.weeksText.replace("SMP7-1-M1", "SMP7-1-M3");
    expect(messages(audit(files), "cp-mapping.json")).toContain(
      "does not name D-BK-a in its Butir CP cell",
    );
    const other = corpus();
    const row2 = mappingOf(other, "D-BK-a");
    row2.weeks[0] = "SMP7-1-M1";
    row2.weeksText = row2.weeksText.replace("SMP7-1-M1", "SMP7-1-M1");
    row2.weeks.push("SMP7-1-M14");
    row2.weeksText = row2.weeksText.replace(", dan", ", SMP7-1-M14, dan");
    weekOf(other, "SMP7-1-M14").cpCodes = ["D-BK-e"];
    expect(messages(audit(other), "cp-mapping.json")).toContain("D-BK-a");
  });

  test("a mapping count that disagrees with the weeks naming the item is reported", () => {
    const files = corpus();
    const row = mappingOf(files, "D-BK-a");
    row.otherWeeks += 1;
    row.weeksText = row.weeksText.replace(/dan \d+ minggu/, `dan ${row.otherWeeks} minggu`);
    expect(messages(audit(files), "cp-mapping.json")).toContain(
      "is mapped to 25 weeks but 24 weeks name it",
    );
  });

  test("weeks/otherWeeks that disagree with weeksText, and unparseable weeksText, are reported", () => {
    const files = corpus();
    mappingOf(files, "D-BK-a").otherWeeks = 3;
    expect(messages(audit(files), "cp-mapping.json")).toContain("do not equal weeksText");
    const other = corpus();
    mappingOf(other, "D-BK-a").weeksText = "minggu pertama";
    expect(messages(audit(other), "cp-mapping.json")).toContain("cannot parse week notation");
  });

  test("coverage cannot rest on Python overlaps or pengayaan alone", () => {
    const files = corpus();
    // DK-BK-c: turn every counted week into an overlap; the item still claims "Penuh".
    for (const week of files.get("weeks.json").weeks as Json[]) {
      if (week.cpCodes.includes("DK-BK-c")) {
        week.cpCodes = week.cpCodes.filter((c: string) => c !== "DK-BK-c");
        week.irisanCodes.push("DK-BK-c");
        if (week.cpCodes.length === 0) {
          week.enrichment = true;
        }
      }
    }
    expect(messages(audit(files), "cp-mapping.json")).toContain(
      "no week counts towards it (cpCodes); Python overlaps (*) and pengayaan never count as coverage",
    );
  });

  test("an item named by Python overlaps must say so in its Cakupan", () => {
    const files = corpus();
    const row = mappingOf(files, "DK-BK-c");
    row.coverageText = "Penuh";
    row.coverage = "penuh";
    expect(messages(audit(files), "cp-mapping.json")).toContain(
      'its Cakupan must say they go beyond the CP wording ("melampaui rumusan CP")',
    );
  });

  test("the uncovered list must include every uncovered item and nothing covered", () => {
    const files = corpus();
    files.get("uncovered.json").items = files
      .get("uncovered.json")
      .items.filter((item: Json) => item.cpCode !== "D-LD-a");
    files.get("uncovered.json").items.push({
      cpCode: "D-BK-a",
      coverageText: "Beda",
      reason: "luar-silabus",
      closure: "modul-pendamping",
    });
    const text = messages(audit(files), "uncovered.json");
    expect(text).toContain('CP item "D-LD-a" is covered by no week but is not listed as uncovered');
    expect(text).toContain(
      'CP item "D-LD-a" is tidak-dicakup in cp-mapping.json but not listed here',
    );
    expect(text).toContain('CP item "D-BK-a" is listed as uncovered but 24 weeks cover it');
    expect(text).toContain("its mapping row says penuh");
    expect(text).toContain("must equal the mapping row's coverageText");
  });

  test("an uncovered item must exist and have a mapping row; its reason must follow its Cakupan", () => {
    const files = corpus();
    const items = files.get("uncovered.json").items;
    items[0].cpCode = "D-LD-z";
    const pa = items.find((item: Json) => item.cpCode === "DK-PA-a");
    pa.reason = "luar-silabus";
    pa.closure = "modul-pendamping";
    const text = messages(audit(files), "uncovered.json");
    expect(text).toContain('CP item "D-LD-z" does not exist in cp-elements.json');
    expect(text).toContain('CP item "D-LD-z" has no mapping row');
    expect(text).toContain('reason "luar-silabus" disagrees with coverageText');
  });

  test("enrichment: the Python entry must span every semester from the start of text programming", () => {
    const files = corpus();
    files.get("cp-mapping.json").enrichment[0].semesters = ["SMP9-1", "SMP9-2"];
    expect(messages(audit(files), "cp-mapping.json")).toContain(
      "the pemrograman-teks entry must cover every semester from SMP8-2",
    );
    const other = corpus();
    other.get("cp-mapping.json").enrichment[0].kind = "klub";
    other.get("cp-mapping.json").enrichment[2].kind = "klub";
    expect(messages(audit(other), "cp-mapping.json")).toContain(
      "exactly one enrichment entry must be of kind pemrograman-teks",
    );
  });

  test("enrichment: binary-coding weeks must be pure pengayaan; the club has no weeks; references must exist", () => {
    const files = corpus();
    weekOf(files, "SMP7-2-M2").cpCodes = ["D-BK-a"];
    files.get("cp-mapping.json").enrichment[2].weeks = ["SMP7-1-M1"];
    files.get("cp-mapping.json").enrichment[0].semesters.push("SMP7-1");
    files.get("structure.json").semesters = files
      .get("structure.json")
      .semesters.filter((s: Json) => s.code !== "SMP7-1");
    files.get("cp-mapping.json").enrichment[1].weeks.push("SMP7-1-M13");
    const unknownWeek = files.get("cp-mapping.json").enrichment[1];
    unknownWeek.weeks.push("SMP9-2-M14");
    files.get("weeks.json").weeks = files
      .get("weeks.json")
      .weeks.filter((w: Json) => w.id !== "SMP9-2-M14");
    const text = messages(audit(files), "cp-mapping.json");
    expect(text).toContain('binary-coding week "SMP7-2-M2" must be pure enrichment');
    expect(text).toContain('binary-coding week "SMP7-1-M13" must be pure enrichment');
    expect(text).toContain("the club is outside the 168 core JP");
    expect(text).toContain('semester "SMP7-1" is not in structure.json');
    expect(text).toContain('week "SMP9-2-M14" does not exist in weeks.json');
  });

  test("club stages must be for kelas of the programme", () => {
    const files = corpus();
    const structure = files.get("structure.json");
    structure.classPhases = structure.classPhases.filter((entry: Json) => entry.kelas !== "9");
    structure.semesters = structure.semesters.filter((s: Json) => s.kelas !== "9");
    expect(messages(audit(files), "club.json")).toContain("kelas 9 is not in structure.json");
  });

  test("bridge: SMP weeks and CP items must exist, and a bridged CP item must be covered", () => {
    const files = corpus();
    const rows = files.get("bridge.json").toSma;
    rows[5].smpWeeks = ["SMP9-2-M11"];
    files.get("weeks.json").weeks = files
      .get("weeks.json")
      .weeks.filter((w: Json) => w.id !== "SMP9-2-M11");
    rows[4].cpCodes = ["DK-EA-b", "D-LD-a", "DK-EA-z"];
    const text = messages(audit(files), "bridge.json");
    expect(text).toContain('week "SMP9-2-M11" does not exist in weeks.json');
    expect(text).toContain('CP item "DK-EA-z" does not exist in cp-elements.json');
    expect(text).toContain(
      'CP item "D-LD-a" is named as a foundation for sma-coding but no week covers it',
    );
  });
});

describe("smp schemas", () => {
  const quote = (over: Json = {}) => ({
    family: "informatika",
    elementId: "BK",
    elementTitle: "Berpikir Komputasional",
    guideNumber: "1.1",
    text: "teks",
    ...over,
  });
  const cpFile = (over: Json = {}) => ({
    syllabusVersion: "1.1.0",
    syllabusDate: "2026-11-19",
    sourceSection: "bagian 1",
    quotes: [quote()],
    items: [{ code: "D-BK-a", family: "informatika", elementId: "BK", label: "x" }],
    ...over,
  });

  test("cp-elements: element/family consistency, code prefix, duplicates, orphan items", () => {
    expect(smpCpElementsFileSchema.safeParse(cpFile()).success).toBe(true);
    expect(
      smpCpElementsFileSchema.safeParse(
        cpFile({
          quotes: [
            quote({
              elementId: "PA",
              elementTitle: "Pemanfaatan dan Pengembangan Kecerdasan Artifisial",
            }),
          ],
        }),
      ).success,
    ).toBe(false);
    expect(
      smpCpElementsFileSchema.safeParse(cpFile({ quotes: [quote({ elementTitle: "Lain" })] }))
        .success,
    ).toBe(false);
    expect(
      smpCpElementsFileSchema.safeParse(
        cpFile({
          items: [{ code: "DK-BK-a", family: "informatika", elementId: "BK", label: "x" }],
        }),
      ).success,
    ).toBe(false);
    const item = { code: "D-BK-a", family: "informatika", elementId: "BK", label: "x" };
    expect(smpCpElementsFileSchema.safeParse(cpFile({ items: [item, item] })).success).toBe(false);
    expect(smpCpElementsFileSchema.safeParse(cpFile({ quotes: [quote(), quote()] })).success).toBe(
      false,
    );
    expect(
      smpCpElementsFileSchema.safeParse(
        cpFile({ items: [{ code: "DK-LD-a", family: "kka", elementId: "LD", label: "x" }] }),
      ).success,
    ).toBe(false);
  });

  const week = (over: Json = {}) => ({
    id: "SMP7-1-M1",
    kelas: "7",
    semester: "SMP7-1",
    week: 1,
    topic: "t",
    tool: "-",
    output: "o",
    cpText: "D-BK-a",
    cpCodes: ["D-BK-a"],
    irisanCodes: [],
    enrichment: false,
    ...over,
  });

  test("weeks: id, kelas, duplicates, overlap vs coverage, and a week must name a CP item or pengayaan", () => {
    expect(smpWeekSchema.safeParse(week()).success).toBe(true);
    expect(smpWeekSchema.safeParse(week({ id: "SMP7-1-M2" })).success).toBe(false);
    expect(smpWeekSchema.safeParse(week({ kelas: "8" })).success).toBe(false);
    expect(smpWeekSchema.safeParse(week({ cpCodes: ["D-BK-a", "D-BK-a"] })).success).toBe(false);
    expect(smpWeekSchema.safeParse(week({ irisanCodes: ["D-BK-a"] })).success).toBe(false);
    expect(smpWeekSchema.safeParse(week({ cpCodes: [], cpText: "-" })).success).toBe(false);
    expect(smpWeekSchema.safeParse(week({ cpCodes: [], enrichment: true })).success).toBe(true);
    const file = { syllabusVersion: "1", syllabusDate: "2026-11-19", sourceSection: "bagian 3" };
    const semesters = [{ code: "SMP7-1", kelas: "7", title: "t" }];
    expect(
      smpWeeksFileSchema.safeParse({ ...file, semesters, weeks: [week(), week()] }).success,
    ).toBe(false);
    expect(
      smpWeeksFileSchema.safeParse({
        ...file,
        semesters: [{ code: "SMP8-1", kelas: "7", title: "t" }],
        weeks: [week()],
      }).success,
    ).toBe(false);
  });

  test("cp-mapping: tidak-dicakup excludes weeks, a covered item needs weeks, enrichment ids unique", () => {
    const base = { syllabusVersion: "1", syllabusDate: "2026-11-19", sourceSection: "bagian 4" };
    const row = (over: Json = {}) => ({
      cpCode: "D-BK-a",
      weeksText: "SMP7-1-M1",
      weeks: ["SMP7-1-M1"],
      otherWeeks: 0,
      coverageText: "Penuh",
      coverage: "penuh",
      ...over,
    });
    const enrichment = [{ id: "c", kind: "klub", text: "klub", semesters: [], weeks: [] }];
    const parse = (mappings: Json[], extra: Json[] = enrichment) =>
      smpCpMappingFileSchema.safeParse({ ...base, mappings, enrichment: extra }).success;
    expect(parse([row()])).toBe(true);
    expect(parse([row({ coverage: "tidak-dicakup" })])).toBe(false);
    expect(parse([row({ weeks: [], weeksText: "-", otherWeeks: 0 })])).toBe(false);
    expect(parse([row({ weeks: ["SMP7-1-M1", "SMP7-1-M1"] })])).toBe(false);
    expect(parse([row({ weeks: [], weeksText: "-", coverage: "tidak-dicakup" })])).toBe(true);
    expect(parse([row(), row()])).toBe(false);
    expect(parse([row()], [...enrichment, ...enrichment])).toBe(false);
  });

  test("uncovered: closure follows reason; items unique", () => {
    const base = { syllabusVersion: "1", syllabusDate: "2026-11-19", sourceSection: "bagian 4" };
    const item = (over: Json = {}) => ({
      cpCode: "D-LD-a",
      coverageText: "**Tidak dicakup**",
      reason: "luar-silabus",
      closure: "modul-pendamping",
      ...over,
    });
    const ok = (items: Json[]) => smpUncoveredFileSchema.safeParse({ ...base, items }).success;
    expect(ok([item()])).toBe(true);
    expect(ok([item({ closure: "demonstrasi-guru" })])).toBe(false);
    expect(ok([item(), item()])).toBe(false);
  });

  test("club: the club never counts as CP coverage; one stage per kelas", () => {
    const base = {
      syllabusVersion: "1",
      syllabusDate: "2026-11-19",
      sourceSection: "bagian 3.4",
      preface: "p",
      countsAsCpCoverage: false,
    };
    const stage = { kelas: "7", stage: "Kelas 7", content: "c", tool: "-", note: "n" };
    expect(smpClubFileSchema.safeParse({ ...base, stages: [stage] }).success).toBe(true);
    expect(
      smpClubFileSchema.safeParse({ ...base, countsAsCpCoverage: true, stages: [stage] }).success,
    ).toBe(false);
    expect(smpClubFileSchema.safeParse({ ...base, stages: [stage, stage] }).success).toBe(false);
  });

  test("structure: unique rows and semesters, semester prefix, known kelas", () => {
    const good = read("data/smp-coding/structure.json");
    expect(smpStructureFileSchema.safeParse(good).success).toBe(true);
    const dupRow = structuredClone(good);
    dupRow.rows[1].id = dupRow.rows[0].id;
    expect(smpStructureFileSchema.safeParse(dupRow).success).toBe(false);
    const dupSem = structuredClone(good);
    dupSem.semesters[1] = dupSem.semesters[0];
    expect(smpStructureFileSchema.safeParse(dupSem).success).toBe(false);
    const noKelas = structuredClone(good);
    noKelas.classPhases = noKelas.classPhases.filter((e: Json) => e.kelas !== "9");
    expect(smpStructureFileSchema.safeParse(noKelas).success).toBe(false);
  });

  test("bridge: committed file parses; track letters must be single upper-case letters", () => {
    const good = read("data/smp-coding/bridge.json");
    expect(smpBridgeFileSchema.safeParse(good).success).toBe(true);
    const bad = structuredClone(good);
    bad.toSma[1].smaTracks = ["Jalur D"];
    expect(smpBridgeFileSchema.safeParse(bad).success).toBe(false);
  });
});

describe("smp week and CP notation helpers", () => {
  test("parseSmpMappingWeeks reads '-', lists, and the 'dan N minggu lain' tail", () => {
    expect(parseSmpMappingWeeks("-")).toEqual({ weeks: [], otherWeeks: 0 });
    expect(parseSmpMappingWeeks("SMP7-1-M1, SMP7-2-M4")).toEqual({
      weeks: ["SMP7-1-M1", "SMP7-2-M4"],
      otherWeeks: 0,
    });
    expect(
      parseSmpMappingWeeks("SMP7-1-M1, SMP7-1-M2, dan 19 minggu lain (kolom Butir CP di bagian 3)"),
    ).toEqual({ weeks: ["SMP7-1-M1", "SMP7-1-M2"], otherWeeks: 19 });
    expect(() => parseSmpMappingWeeks("minggu satu")).toThrow("cannot parse week notation");
  });

  test("parseSmpCpCell separates counted items, Python overlaps (*) and pengayaan", () => {
    expect(parseSmpCpCell("D-BK-e, DK-BK-c*, pengayaan")).toEqual({
      cpCodes: ["D-BK-e"],
      irisanCodes: ["DK-BK-c"],
      enrichment: true,
    });
    expect(parseSmpCpCell("D-BK-a")).toEqual({
      cpCodes: ["D-BK-a"],
      irisanCodes: [],
      enrichment: false,
    });
    expect(() => parseSmpCpCell("X-BK-a")).toThrow("cannot parse CP cell token");
  });

  test("smpSemesterIndex orders semesters and rejects other strings", () => {
    expect(smpSemesterIndex("SMP7-1")).toBe(0);
    expect(smpSemesterIndex("SMP8-2")).toBe(3);
    expect(smpSemesterIndex("SMP9-2")).toBe(5);
    expect(smpSemesterIndex("SMA-X1")).toBe(-1);
  });
});
