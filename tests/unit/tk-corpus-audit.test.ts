/**
 * Tests for `src/domain/tk-corpus-audit.ts` and the `tk-*` schemas: the
 * committed `data/tk-coding/` corpus is clean, and each class of corruption
 * (schema, structure, reference, CP-relation honesty) is reported precisely,
 * in memory, without touching the committed files.
 */

import { describe, expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import type { CorpusSource } from "../../src/domain/corpus-audit";
import {
  auditTkCorpus,
  TK_DATA_FILE_REGISTRY,
  TK_EXPECTED_COUNTS,
} from "../../src/domain/tk-corpus-audit";
import { tkBridgeFileSchema } from "../../src/schema/tk-bridge";
import { tkCpElementsFileSchema } from "../../src/schema/tk-cp-elements";
import { tkCpMappingFileSchema } from "../../src/schema/tk-cp-mapping";
import { tkDecisionsFileSchema } from "../../src/schema/tk-decisions";
import { tkGoalsFileSchema } from "../../src/schema/tk-goals";
import { tkStructureFileSchema } from "../../src/schema/tk-structure";
import { tkWeekSchema, tkWeeksFileSchema } from "../../src/schema/tk-weeks";

// biome-ignore lint/suspicious/noExplicitAny: fixture data is mutated freely
type Json = any;

const repoRoot = join(import.meta.dir, "..", "..");
const read = (path: string): Json => JSON.parse(readFileSync(join(repoRoot, path), "utf-8"));

/** A fresh deep copy of the committed corpus, as a mutable name -> JSON map. */
function corpus(): Map<string, Json> {
  return new Map(
    TK_DATA_FILE_REGISTRY.map((entry) => [entry.file, read(`data/tk-coding/${entry.file}`)]),
  );
}

function audit(files: Map<string, Json>) {
  const source: CorpusSource = new Map(
    [...files].map(([name, data]) => [name, { ok: true as const, data }]),
  );
  return auditTkCorpus(source);
}

function messages(result: ReturnType<typeof audit>, file: string): string {
  return result.findings
    .filter((finding) => finding.file === file)
    .map((finding) => `${finding.path}: ${finding.message}`)
    .join("\n");
}

describe("auditTkCorpus on the committed corpus", () => {
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
    expect(files.get("weeks.json").weeks).toHaveLength(48);
    expect(TK_EXPECTED_COUNTS.weeks).toBe(48);
    expect(files.get("cp-elements.json").items).toHaveLength(7);
    expect(files.get("cp-elements.json").scope).toHaveLength(3);
    expect(files.get("cp-mapping.json").concepts).toHaveLength(9);
    expect(files.get("bridge.json").rows).toHaveLength(5);
    expect(files.get("goals.json").principles).toHaveLength(8);
    expect(files.get("goals.json").goals).toHaveLength(7);
    expect(files.get("structure.json").rows).toHaveLength(7);
    expect(files.get("structure.json").sessionPattern).toHaveLength(4);
    expect(files.get("decisions.json").decisions).toHaveLength(9);
  });

  test("every semester has weeks M1..M12 and week codes run TK-A1-M1 .. TK-B2-M12", () => {
    const weeks = corpus().get("weeks.json").weeks as Array<{ id: string; semester: string }>;
    expect(weeks[0]?.id).toBe("TK-A1-M1");
    expect(weeks[47]?.id).toBe("TK-B2-M12");
    for (const semester of ["A1", "A2", "B1", "B2"]) {
      expect(weeks.filter((week) => week.semester === semester)).toHaveLength(12);
    }
  });

  test("the CP link is marked as an interpreted overlap, never as fulfilment", () => {
    const files = corpus();
    expect(files.get("weeks.json").cpRelation).toBe("irisan-penafsiran");
    expect(files.get("weeks.json").meetsCp).toBe(false);
    expect(files.get("cp-mapping.json").cpRelation).toBe("irisan-penafsiran");
    expect(files.get("cp-mapping.json").meetsCp).toBe(false);
  });
});

describe("auditTkCorpus: file level", () => {
  test("a missing file is reported", () => {
    const files = corpus();
    files.delete("bridge.json");
    const result = audit(files);
    expect(result.ok).toBe(false);
    expect(result.summary.filesMissing).toBe(1);
    expect(messages(result, "bridge.json")).toContain("required data file is missing");
  });

  test("invalid JSON is reported", () => {
    const source: CorpusSource = new Map([["weeks.json", { ok: false as const, error: "boom" }]]);
    const result = auditTkCorpus(source);
    expect(
      result.findings.some(
        (f) => f.file === "weeks.json" && f.message.includes("invalid JSON: boom"),
      ),
    ).toBe(true);
  });

  test("an unregistered file is reported, but modules.json (the optional module index, ADR-0007) is tolerated", () => {
    const files = corpus();
    files.set("stray.json", {});
    files.set("modules.json", { modules: [] });
    const result = audit(files);
    expect(result.summary.filesUnregistered).toBe(1);
    expect(messages(result, "stray.json")).toContain("not covered by any schema");
    expect(messages(result, "modules.json")).toBe("");
  });

  test("a schema violation is reported with its path", () => {
    const files = corpus();
    files.get("weeks.json").weeks[0].id = "bukan-kode";
    expect(messages(audit(files), "weeks.json")).toContain("weeks.0.id");
  });
});

describe("auditTkCorpus: CP relation guards", () => {
  test("a file claiming to meet the CP fails the schema", () => {
    const files = corpus();
    files.get("weeks.json").meetsCp = true;
    files.get("cp-mapping.json").cpRelation = "pemenuhan";
    const result = audit(files);
    expect(messages(result, "weeks.json")).toContain("meetsCp");
    expect(messages(result, "cp-mapping.json")).toContain("cpRelation");
  });

  test("the notes must keep disclaiming CP fulfilment", () => {
    const files = corpus();
    files.get("cp-mapping.json").interpretationNote = "Pemetaan resmi ke CP.";
    files.get("goals.json").cpRelationNote = "Seluruh tujuan memenuhi CP.";
    const result = audit(files);
    expect(messages(result, "cp-mapping.json")).toContain("penafsiran");
    expect(messages(result, "goals.json")).toContain("bukan pemenuhan CP");
  });
});

describe("auditTkCorpus: structure", () => {
  test("a wrong number of weeks is reported", () => {
    const files = corpus();
    files.get("weeks.json").weeks.pop();
    const text = messages(audit(files), "weeks.json");
    expect(text).toContain("expected exactly 48 weeks, found 47");
    expect(text).toContain("semester=B2");
    expect(text).toContain("totalWeeks is 48");
  });

  test("a semester with a gap or a duplicate week is reported", () => {
    const files = corpus();
    files.get("weeks.json").weeks.splice(3, 1);
    expect(messages(audit(files), "weeks.json")).toContain(
      "weeks[semester=A1]: must contain exactly the weeks 1..12 once each; found [1, 2, 3, 5, 6, 7, 8, 9, 10, 11, 12]",
    );
  });

  test("a wrong count of CP items, concepts, bridge rows, goals and decisions is reported", () => {
    const files = corpus();
    files.get("cp-elements.json").scope.pop();
    files.get("cp-mapping.json").concepts.pop();
    files.get("bridge.json").rows.pop();
    files.get("goals.json").goals.pop();
    files.get("goals.json").principles.pop();
    files.get("decisions.json").decisions.pop();
    const result = audit(files);
    expect(messages(result, "cp-elements.json")).toContain("expected exactly 3 scope notes");
    expect(messages(result, "cp-mapping.json")).toContain("expected exactly 9 concept rows");
    expect(messages(result, "bridge.json")).toContain("expected exactly 5 bridge rows");
    expect(messages(result, "goals.json")).toContain("expected exactly 7 goals");
    expect(messages(result, "goals.json")).toContain("expected exactly 8 principles");
    expect(messages(result, "decisions.json")).toContain("expected exactly 9 owner decisions");
  });

  test("decision ids must run Q1..Qn in order", () => {
    const files = corpus();
    files.get("decisions.json").decisions[0].id = "Q10";
    expect(messages(audit(files), "decisions.json")).toContain('must be "Q1"');
  });

  test("structure.json must agree with the 12-week, four-semester plan", () => {
    const files = corpus();
    const structure = files.get("structure.json");
    structure.weeksPerSemester.teaching = 13;
    structure.totalWeeks = 50;
    structure.semesters = ["A1", "A2", "B1"];
    structure.groups = [structure.groups[0]];
    structure.sessionPattern.pop();
    structure.rows.pop();
    const text = messages(audit(files), "structure.json");
    expect(text).toContain("weeksPerSemester.teaching");
    expect(text).toContain("totalWeeks");
    expect(text).toContain("must be exactly the semesters A1, A2, B1, B2");
    expect(text).toContain("must be exactly the groups A, B");
    expect(text).toContain("expected exactly 4 session steps");
    expect(text).toContain("expected exactly 7 structure rows");
  });
});

describe("auditTkCorpus: references", () => {
  test("a week citing an unknown CP item is reported", () => {
    const files = corpus();
    files.get("weeks.json").weeks[0].cp = ["FF-DL-z"];
    const result = audit(files);
    expect(messages(result, "weeks.json")).toContain('CP item "FF-DL-z" of week TK-A1-M1');
    // FF-DL-b is no longer cited by TK-A1-M1 but still by other weeks, so it stays used.
    expect(messages(result, "cp-elements.json")).not.toContain("FF-DL-b");
  });

  test("a CP item that no week cites is reported", () => {
    const files = corpus();
    for (const week of files.get("weeks.json").weeks as Array<{ cp: string[] }>) {
      week.cp = week.cp.filter((code) => code !== "FF-JD-e");
      if (week.cp.length === 0) {
        week.cp = ["FF-DL-a"];
      }
    }
    expect(messages(audit(files), "cp-elements.json")).toContain(
      'CP item "FF-JD-e" is listed (bagian 4.1) but no week cites it',
    );
  });

  test("a concept row citing an unknown CP item is reported", () => {
    const files = corpus();
    files.get("cp-mapping.json").concepts[0].cpCodes = ["FF-JD-a"];
    expect(messages(audit(files), "cp-mapping.json")).toContain(
      'CP item "FF-JD-a" does not exist in cp-elements.json',
    );
  });

  test("a bridge row or the screen option citing an unknown week is reported", () => {
    const files = corpus();
    files.get("bridge.json").rows[0].outputWeeks = ["TK-B1-M2"];
    files.get("bridge.json").rows[1].outputWeeks = ["TK-A1-M1"];
    const weeks = files.get("weeks.json").weeks as Array<{ id: string }>;
    files.get("weeks.json").weeks = weeks.filter((week) => week.id !== "TK-B2-M9");
    const result = audit(files);
    expect(messages(result, "structure.json")).toContain(
      'screen.optionalWeeks[0]: week "TK-B2-M9" does not exist in weeks.json',
    );
    files.get("bridge.json").rows[0].outputWeeks = ["TK-B2-M9"];
    expect(messages(audit(files), "bridge.json")).toContain(
      'rows[0].outputWeeks[0]: week "TK-B2-M9" does not exist in weeks.json',
    );
  });
});

describe("tk schemas", () => {
  test("a week must belong to its group and carry the matching id", () => {
    const week = read("data/tk-coding/weeks.json").weeks[0];
    expect(tkWeekSchema.safeParse(week).success).toBe(true);
    expect(tkWeekSchema.safeParse({ ...week, group: "B" }).success).toBe(false);
    expect(tkWeekSchema.safeParse({ ...week, id: "TK-A1-M2" }).success).toBe(false);
    expect(tkWeekSchema.safeParse({ ...week, week: 13 }).success).toBe(false);
    expect(tkWeekSchema.safeParse({ ...week, cp: ["FF-DL-b", "FF-DL-b"] }).success).toBe(false);
    expect(tkWeekSchema.safeParse({ ...week, cp: [] }).success).toBe(false);
  });

  test("duplicate ids and codes are rejected in every file", () => {
    const weeks = read("data/tk-coding/weeks.json");
    expect(
      tkWeeksFileSchema.safeParse({ ...weeks, weeks: [weeks.weeks[0], weeks.weeks[0]] }).success,
    ).toBe(false);
    const cp = read("data/tk-coding/cp-elements.json");
    expect(
      tkCpElementsFileSchema.safeParse({ ...cp, items: [cp.items[0], cp.items[0]] }).success,
    ).toBe(false);
    expect(
      tkCpElementsFileSchema.safeParse({ ...cp, scope: [cp.scope[0], cp.scope[0]] }).success,
    ).toBe(false);
    expect(
      tkCpElementsFileSchema.safeParse({
        ...cp,
        items: [{ ...cp.items[0], elementId: "JD" }],
      }).success,
    ).toBe(false);
    const mapping = read("data/tk-coding/cp-mapping.json");
    expect(
      tkCpMappingFileSchema.safeParse({
        ...mapping,
        concepts: [mapping.concepts[0], mapping.concepts[0]],
      }).success,
    ).toBe(false);
    expect(
      tkCpMappingFileSchema.safeParse({
        ...mapping,
        concepts: [{ ...mapping.concepts[0], matchLevel: "langsung" }],
      }).success,
    ).toBe(false);
    const decisions = read("data/tk-coding/decisions.json");
    expect(
      tkDecisionsFileSchema.safeParse({
        ...decisions,
        decisions: [decisions.decisions[0], decisions.decisions[0]],
      }).success,
    ).toBe(false);
  });

  test("ordered lists must be numbered 1..n", () => {
    const goals = read("data/tk-coding/goals.json");
    expect(
      tkGoalsFileSchema.safeParse({ ...goals, goals: [{ ...goals.goals[0], order: 2 }] }).success,
    ).toBe(false);
    expect(
      tkGoalsFileSchema.safeParse({
        ...goals,
        principles: [{ ...goals.principles[0], order: 3 }],
      }).success,
    ).toBe(false);
    const bridge = read("data/tk-coding/bridge.json");
    expect(
      tkBridgeFileSchema.safeParse({ ...bridge, rows: [{ ...bridge.rows[0], order: 2 }] }).success,
    ).toBe(false);
    const structure = read("data/tk-coding/structure.json");
    expect(
      tkStructureFileSchema.safeParse({
        ...structure,
        sessionPattern: [{ ...structure.sessionPattern[0], order: 2 }],
      }).success,
    ).toBe(false);
  });

  test("structure.json rejects inconsistent ranges and duplicate rows", () => {
    const structure = read("data/tk-coding/structure.json");
    const parse = (patch: Json) => tkStructureFileSchema.safeParse({ ...structure, ...patch });
    expect(parse({}).success).toBe(true);
    expect(parse({ dailyIntegrationMinutes: { min: 10, max: 5 } }).success).toBe(false);
    expect(
      parse({ groups: [{ ...structure.groups[0], ageFrom: 6, ageTo: 5 }, structure.groups[1]] })
        .success,
    ).toBe(false);
    expect(parse({ groups: [structure.groups[0], structure.groups[0]] }).success).toBe(false);
    expect(parse({ semesters: ["A1", "A1"] }).success).toBe(false);
    expect(parse({ rows: [structure.rows[0], structure.rows[0]] }).success).toBe(false);
    expect(
      parse({ weeksPerSemester: { ...structure.weeksPerSemester, bigGameWeek: 9 } }).success,
    ).toBe(false);
  });
});
