/**
 * Tests for `src/domain/kul-corpus-audit.ts` and the `kul-*` schemas: the
 * committed `data/kuliah-coding/` corpus is clean, and each class of
 * corruption (schema, count, course-plan invariant, reference) is reported
 * precisely, in memory, without touching the committed files.
 */

import { describe, expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import type { CorpusSource } from "../../src/domain/corpus-audit";
import {
  auditKulCorpus,
  KUL_DATA_FILE_REGISTRY,
  KUL_EXPECTED_COUNTS,
  KUL_MAX_SKS_PER_SEMESTER_TRACK_I,
} from "../../src/domain/kul-corpus-audit";
import { kulAiPolicyFileSchema } from "../../src/schema/kul-ai-policy";
import { kulBridgesFileSchema } from "../../src/schema/kul-bridge";
import {
  KUL_KNOWLEDGE_AREA_CODES,
  kulCourseCodeSchema,
  kulCpmkCodeSchema,
  kulSemesterSchema,
} from "../../src/schema/kul-common";
import { kulCoursesFileSchema } from "../../src/schema/kul-course";
import { kulCplFileSchema } from "../../src/schema/kul-cpl";
import { kulKnowledgeAreasFileSchema } from "../../src/schema/kul-knowledge-area";
import { kulTracksFileSchema } from "../../src/schema/kul-track";

// biome-ignore lint/suspicious/noExplicitAny: fixture data is mutated freely
type Json = any;

const repoRoot = join(import.meta.dir, "..", "..");
const read = (path: string): unknown => JSON.parse(readFileSync(join(repoRoot, path), "utf-8"));

/** A fresh deep copy of the committed corpus, as a mutable name -> JSON map. */
function corpus(): Map<string, Json> {
  return new Map(
    KUL_DATA_FILE_REGISTRY.map((entry) => [entry.file, read(`data/kuliah-coding/${entry.file}`)]),
  );
}

function audit(files: Map<string, Json>) {
  const source: CorpusSource = new Map(
    [...files].map(([name, data]) => [name, { ok: true as const, data }]),
  );
  return auditKulCorpus(source);
}

function messages(result: ReturnType<typeof audit>, file: string): string {
  return result.findings
    .filter((finding) => finding.file === file)
    .map((finding) => `${finding.path}: ${finding.message}`)
    .join("\n");
}

function course(files: Map<string, Json>, code: string): Json {
  return files
    .get("courses.json")
    .courses.find((candidate: { code: string }) => candidate.code === code);
}

describe("auditKulCorpus on the committed corpus", () => {
  test("is clean and validates all six files", () => {
    const result = audit(corpus());
    expect(result.findings).toEqual([]);
    expect(result.ok).toBe(true);
    expect(result.summary.filesValidated).toBe(6);
    expect(result.summary.filesMissing).toBe(0);
    expect(result.summary.filesUnregistered).toBe(0);
  });

  test("has the counts and SKS totals of the approved syllabus (v1.0 and v1.1)", () => {
    const files = corpus();
    const courses = files.get("courses.json").courses as Array<{
      track: string;
      sks: number;
      elective: boolean;
    }>;
    expect(courses).toHaveLength(KUL_EXPECTED_COUNTS.courses);
    for (const track of ["U", "I", "K"] as const) {
      const own = courses.filter((c) => c.track === track);
      const expected = KUL_EXPECTED_COUNTS.perTrack[track];
      expect(own).toHaveLength(expected.courses);
      expect(own.reduce((sum, c) => sum + c.sks, 0)).toBe(expected.sks);
      expect(own.filter((c) => !c.elective).reduce((sum, c) => sum + c.sks, 0)).toBe(
        expected.coreSks,
      );
    }
    expect(files.get("knowledge-areas.json").areas).toHaveLength(17);
    expect(files.get("knowledge-areas.json").gaps).toHaveLength(4);
    expect(files.get("ai-policy.json").levels.map((l: { level: string }) => l.level)).toEqual([
      "hijau",
      "kuning",
      "merah",
    ]);
    expect(files.get("bridges.json").fromSma).toHaveLength(5);
    expect(files.get("bridges.json").toWork).toHaveLength(4);
  });

  test("every CPMK is marked as authored and every CPL column is empty", () => {
    for (const c of corpus().get("courses.json").courses) {
      expect(c.cplProdi).toEqual([]);
      for (const cpmk of c.cpmk) {
        expect(cpmk.origin).toBe("karangan");
      }
    }
  });

  test("jalur I stays within the per-semester SKS ceiling", () => {
    expect(KUL_MAX_SKS_PER_SEMESTER_TRACK_I).toBe(10);
  });
});

describe("kul schemas: shapes", () => {
  test("course, CPMK and semester codes", () => {
    expect(kulCourseCodeSchema.safeParse("KUL-U-101").success).toBe(true);
    expect(kulCourseCodeSchema.safeParse("KUL-X-101").success).toBe(false);
    expect(kulCourseCodeSchema.safeParse("KUL-U-11").success).toBe(false);
    expect(kulCpmkCodeSchema.safeParse("KUL-I-205-C3").success).toBe(true);
    expect(kulCpmkCodeSchema.safeParse("KUL-I-205-C0").success).toBe(false);
    expect(kulSemesterSchema.safeParse("S8").success).toBe(true);
    expect(kulSemesterSchema.safeParse("S9").success).toBe(false);
  });

  test("the 17 CS2023 knowledge-area codes", () => {
    expect(KUL_KNOWLEDGE_AREA_CODES).toHaveLength(17);
    expect(new Set(KUL_KNOWLEDGE_AREA_CODES).size).toBe(17);
  });

  test("every committed file parses with its own schema and rejects unknown keys", () => {
    const pairs = [
      ["tracks.json", kulTracksFileSchema],
      ["courses.json", kulCoursesFileSchema],
      ["knowledge-areas.json", kulKnowledgeAreasFileSchema],
      ["cpl.json", kulCplFileSchema],
      ["ai-policy.json", kulAiPolicyFileSchema],
      ["bridges.json", kulBridgesFileSchema],
    ] as const;
    const files = corpus();
    for (const [file, schema] of pairs) {
      expect(schema.safeParse(files.get(file)).success).toBe(true);
      expect(schema.safeParse({ ...files.get(file), extra: 1 }).success).toBe(false);
    }
  });

  test("duplicate track ids are a schema issue", () => {
    const tracks = corpus().get("tracks.json");
    tracks.tracks[1] = { ...tracks.tracks[0] };
    expect(kulTracksFileSchema.safeParse(tracks).success).toBe(false);
  });

  test("CPMK must say karangan and a bad course code is refused", () => {
    const files = corpus();
    course(files, "KUL-U-101").cpmk[0].origin = "resmi";
    expect(kulCoursesFileSchema.safeParse(files.get("courses.json")).success).toBe(false);
  });
});

describe("auditKulCorpus: file level", () => {
  test("a missing file, invalid JSON and an unregistered file are reported", () => {
    const files = corpus();
    files.delete("cpl.json");
    files.set("stray.json", {});
    files.delete("bridges.json");
    type Entry = NonNullable<ReturnType<CorpusSource["get"]>>;
    const entries: Array<[string, Entry]> = [...files].map(([name, data]) => [
      name,
      { ok: true, data },
    ]);
    entries.push(["bridges.json", { ok: false, error: "Unexpected token" }]);
    const source: CorpusSource = new Map(entries);
    const result = auditKulCorpus(source);
    expect(result.summary.filesMissing).toBe(1);
    expect(result.summary.filesUnregistered).toBe(1);
    expect(messages(result, "cpl.json")).toContain("missing");
    expect(messages(result, "bridges.json")).toContain("invalid JSON");
    expect(messages(result, "stray.json")).toContain("KUL_DATA_FILE_REGISTRY");
  });

  test("a schema violation is reported with its path", () => {
    const files = corpus();
    course(files, "KUL-U-101").sks = "tiga";
    expect(messages(audit(files), "courses.json")).toContain("courses.0.sks");
  });

  test("a modules.json index is tolerated", () => {
    const files = corpus();
    files.set("modules.json", { modules: [] });
    expect(audit(files).summary.filesUnregistered).toBe(0);
  });
});

describe("auditKulCorpus: course plan invariants", () => {
  test("a dropped course breaks the count, the SKS totals and the track table", () => {
    const files = corpus();
    files.get("courses.json").courses.pop();
    const text = messages(audit(files), "courses.json");
    expect(text).toContain("expected exactly 24 courses, found 23");
    expect(messages(audit(files), "tracks.json")).toContain("jalur K");
  });

  test("a changed SKS no longer adds up to the track table", () => {
    const files = corpus();
    course(files, "KUL-U-101").sks = 4;
    const text = messages(audit(files), "tracks.json");
    expect(text).toContain("jalur U courses add up to 15 SKS but the track table says 14");
  });

  test("an elective turned core changes the core SKS", () => {
    const files = corpus();
    course(files, "KUL-I-306").elective = false;
    const text = messages(audit(files), "tracks.json");
    expect(text).toContain("core (non-elective) courses add up to 44 SKS");
  });

  test("a duplicate code, a wrong track letter and a bad CPMK number are reported", () => {
    const files = corpus();
    course(files, "KUL-U-102").code = "KUL-U-101";
    course(files, "KUL-I-102").track = "K";
    course(files, "KUL-I-103").cpmk[1].code = "KUL-I-103-C5";
    const text = messages(audit(files), "courses.json");
    expect(text).toContain('duplicate course code "KUL-U-101"');
    expect(text).toContain("disagrees with the track letter of code KUL-I-102");
    expect(text).toContain('must be "KUL-I-103-C2"');
  });

  test("a course outside the track's semester range is reported", () => {
    const files = corpus();
    course(files, "KUL-U-301").semester = "S8";
    expect(messages(audit(files), "tracks.json")).toContain("span S1-S8");
  });

  test("a prerequisite that does not exist, is not earlier, or is the course itself is reported", () => {
    const files = corpus();
    course(files, "KUL-U-102").prerequisitesText = "KUL-U-999";
    course(files, "KUL-U-102").prerequisites = ["KUL-U-999"];
    course(files, "KUL-U-201").prerequisites = ["KUL-U-201"];
    course(files, "KUL-U-201").prerequisitesText = "KUL-U-201";
    course(files, "KUL-I-201").prerequisites = ["KUL-I-204", "KUL-I-103"];
    course(files, "KUL-I-201").prerequisitesText = "KUL-I-204, KUL-I-103";
    const text = messages(audit(files), "courses.json");
    expect(text).toContain('prerequisite "KUL-U-999" is not a course');
    expect(text).toContain("cannot be its own prerequisite");
    expect(text).toContain("must come in an earlier semester");
  });

  test("a prerequisite list that disagrees with its text is reported", () => {
    const files = corpus();
    course(files, "KUL-U-301").prerequisites = ["KUL-U-102"];
    expect(messages(audit(files), "courses.json")).toContain(
      "must list exactly the course codes named in prerequisitesText",
    );
  });

  test("a prerequisite cycle is reported", () => {
    const files = corpus();
    // Same semester ordering is ignored here on purpose: only the cycle check is under test.
    course(files, "KUL-I-102").prerequisites = ["KUL-I-201"];
    course(files, "KUL-I-102").prerequisitesText = "KUL-I-201";
    const text = messages(audit(files), "courses.json");
    expect(text).toContain("prerequisite cycle");
    expect(text).toContain("KUL-I-102 -> KUL-I-201");
  });

  test("an authored CPL entry and a wrong knowledge-area list are reported", () => {
    const files = corpus();
    course(files, "KUL-U-101").cplProdi = ["CPL-1"];
    course(files, "KUL-U-102").kaCodes = ["AL"];
    const text = messages(audit(files), "courses.json");
    expect(text).toContain("must stay empty");
    expect(text).toContain("must list exactly the knowledge areas named in kaText");
  });

  test("more than 10 SKS of jalur I in one semester is reported", () => {
    const files = corpus();
    // Move KUL-I-401 (4 SKS) next to S4's 9 SKS; prerequisites stay valid (KUL-I-204 is S4, so use S5 + S4 pile).
    course(files, "KUL-I-203").semester = "S5";
    course(files, "KUL-I-204").semester = "S5";
    course(files, "KUL-I-205").semester = "S5";
    course(files, "KUL-I-301").semester = "S5";
    const text = messages(audit(files), "courses.json");
    expect(text).toContain("above the ceiling of 10 SKS per semester");
  });
});

describe("auditKulCorpus: track table", () => {
  test("a drifted total, per-track number and semester order are reported", () => {
    const files = corpus();
    const tracks = files.get("tracks.json");
    tracks.total.sks = 65;
    tracks.tracks[2].sks = 7;
    tracks.tracks[0].firstSemester = "S7";
    const text = messages(audit(files), "tracks.json");
    expect(text).toContain("expected exactly 66 total SKS, found 65");
    expect(text).toContain("expected exactly 6 SKS of jalur K, found 7");
    expect(text).toContain('the "Jumlah" row (65) must equal the sum');
    expect(text).toContain("firstSemester must not come after lastSemester");
  });

  test("a track order other than U, I, K and a missing track are reported", () => {
    const files = corpus();
    const tracks = files.get("tracks.json");
    tracks.tracks = [tracks.tracks[1], tracks.tracks[0]];
    const text = messages(audit(files), "tracks.json");
    expect(text).toContain("tracks must be U, I, K in order");
    expect(text).toContain("expected exactly 3 tracks, found 2");
  });
});

describe("auditKulCorpus: knowledge areas, CPL, AI policy and bridges", () => {
  test("a missing area, a wrong name and a wrong gap count are reported", () => {
    const files = corpus();
    const areas = files.get("knowledge-areas.json");
    areas.areas[1].name = "Arsitektur";
    areas.areas.pop();
    areas.gaps.pop();
    const text = messages(audit(files), "knowledge-areas.json");
    expect(text).toContain("knowledge area SF must appear exactly once, found 0");
    expect(text).toContain('must be the official CS2023 name "Architecture and Organization"');
    expect(text).toContain("expected exactly 17 knowledge areas, found 16");
    expect(text).toContain("expected exactly 4 acknowledged gaps, found 3");
  });

  test("area links must name existing jalur I courses and support from other tracks", () => {
    const files = corpus();
    const areas = files.get("knowledge-areas.json").areas;
    const al = areas.find((a: { code: string }) => a.code === "AL");
    al.courseLinks[0].course = "KUL-U-101";
    al.supportCourses = ["KUL-I-201", "KUL-K-999"];
    const text = messages(audit(files), "knowledge-areas.json");
    expect(text).toContain("KUL-U-101 is not a jalur I course");
    expect(text).toContain("KUL-I-201 is a jalur I course");
    expect(text).toContain('course "KUL-K-999" does not exist');
    expect(text).toContain("must list exactly the courses named in coursesText");
    expect(text).toContain("must list exactly the courses named in supportText");
  });

  test("CPL track groups must map U, I, K once each", () => {
    const files = corpus();
    files.get("cpl.json").trackGroups.pop();
    expect(messages(audit(files), "cpl.json")).toContain("must map U, I, K once each");
  });

  test("AI policy levels must be hijau, kuning, merah and cite existing courses", () => {
    const files = corpus();
    const policy = files.get("ai-policy.json");
    policy.levels.reverse();
    policy.levels[0].usedOnCourses = ["KUL-U-999"];
    const text = messages(audit(files), "ai-policy.json");
    expect(text).toContain("levels must be hijau, kuning, merah in order");
    expect(text).toContain('course "KUL-U-999" does not exist');
  });

  test("bridges must cite existing courses and keep their counts", () => {
    const files = corpus();
    const bridges = files.get("bridges.json");
    bridges.fromSma[0].toCourses = ["KUL-I-999"];
    bridges.toWork[1].courses = ["KUL-U-999"];
    bridges.toWork.pop();
    const text = messages(audit(files), "bridges.json");
    expect(text).toContain('course "KUL-I-999" does not exist');
    expect(text).toContain('course "KUL-U-999" does not exist');
    expect(text).toContain("expected exactly 4 bridges to work, found 3");
  });
});
