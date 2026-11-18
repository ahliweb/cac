/**
 * Whole-corpus audit of the `kuliah-coding` programme
 * (`data/kuliah-coding/`), the counterpart of `auditSmaCorpus` (ADR-0006,
 * ADR-0008). Like it, this is a pure function of an injected
 * {@link CorpusSource}: every problem is reported in one pass, nothing is
 * thrown for ordinary bad data, and nothing reads a filesystem (the loader
 * lives in `src/cli/`).
 *
 * Checks: schema conformance of every registered file plus the reverse
 * "unregistered file" check; the fixed counts of the approved v1.0 syllabus;
 * the invariants of the course plan (unique codes whose track letter matches,
 * semester inside the track's range and the eight-semester bound, SKS totals
 * per track and overall equal to the track table, CPMK numbering, prerequisites
 * that exist, come in an earlier semester and form no cycle, the per-semester
 * SKS ceiling of jalur I); and referential integrity of the knowledge-area
 * mapping, the CPL column (left empty for the adopting study programme), the
 * AI policy and the bridges.
 */

import type { z } from "zod";
import { KUL_AI_LEVELS, kulAiPolicyFileSchema } from "../schema/kul-ai-policy";
import { kulBridgesFileSchema } from "../schema/kul-bridge";
import {
  KUL_KNOWLEDGE_AREA_CODES,
  KUL_KNOWLEDGE_AREA_NAMES,
  KUL_TRACK_IDS,
} from "../schema/kul-common";
import { kulCoursesFileSchema } from "../schema/kul-course";
import { kulCplFileSchema } from "../schema/kul-cpl";
import { kulKnowledgeAreasFileSchema } from "../schema/kul-knowledge-area";
import { kulTracksFileSchema } from "../schema/kul-track";
import { MODULES_FILE_NAME } from "../schema/module";
import type { AuditResult, CorpusFinding, CorpusSource } from "./corpus-audit";

interface KulFileEntry {
  readonly file: string;
  readonly schema: z.ZodTypeAny;
}

/** The file -> schema registry of the `kuliah-coding` corpus. */
export const KUL_DATA_FILE_REGISTRY: readonly KulFileEntry[] = [
  { file: "tracks.json", schema: kulTracksFileSchema },
  { file: "courses.json", schema: kulCoursesFileSchema },
  { file: "knowledge-areas.json", schema: kulKnowledgeAreasFileSchema },
  { file: "cpl.json", schema: kulCplFileSchema },
  { file: "ai-policy.json", schema: kulAiPolicyFileSchema },
  { file: "bridges.json", schema: kulBridgesFileSchema },
];

/**
 * The fixed counts and totals the approved v1.0 syllabus has (bagian 2.2 and
 * 4.2): per-track course counts and SKS, the overall totals, the 17 CS2023
 * knowledge areas and the sizes of the other tables.
 */
export const KUL_EXPECTED_COUNTS = {
  tracks: 3,
  courses: 24,
  knowledgeAreas: 17,
  gaps: 4,
  aiLevels: 3,
  fromSma: 5,
  toWork: 4,
  totalSks: 66,
  totalCoreSks: 62,
  perTrack: {
    U: { courses: 5, sks: 14, coreSks: 14 },
    I: { courses: 16, sks: 46, coreSks: 42 },
    K: { courses: 3, sks: 6, coreSks: 6 },
  },
} as const;

/**
 * The most SKS of jalur I in one semester (bagian 2.3, `[asumsi]`): the
 * regulation allows 20 (semester 1-2) or 24 SKS, and the package must leave
 * room for the study programme's own courses.
 */
export const KUL_MAX_SKS_PER_SEMESTER_TRACK_I = 10;

type Tracks = z.infer<typeof kulTracksFileSchema>;
type Courses = z.infer<typeof kulCoursesFileSchema>;
type Areas = z.infer<typeof kulKnowledgeAreasFileSchema>;
type Cpl = z.infer<typeof kulCplFileSchema>;
type AiPolicy = z.infer<typeof kulAiPolicyFileSchema>;
type Bridges = z.infer<typeof kulBridgesFileSchema>;

function error(file: string, path: string, message: string): CorpusFinding {
  return { file, path, message, severity: "error" };
}

type Parsed = ReadonlyMap<string, unknown>;

function typed<T>(parsed: Parsed, file: string): T | undefined {
  return parsed.get(file) as T | undefined;
}

/** `S3` -> 3. The schema guarantees the shape. */
function semesterNumber(code: string): number {
  return Number(code.slice(1));
}

function schemaFindings(source: CorpusSource) {
  const findings: CorpusFinding[] = [];
  const parsed = new Map<string, unknown>();
  let filesValidated = 0;
  let filesMissing = 0;

  for (const entry of KUL_DATA_FILE_REGISTRY) {
    const found = source.get(entry.file);
    if (found === undefined) {
      filesMissing += 1;
      findings.push(
        error(
          entry.file,
          "(file)",
          `required data file is missing from the corpus (expected at data/kuliah-coding/${entry.file})`,
        ),
      );
      continue;
    }
    if (!found.ok) {
      findings.push(error(entry.file, "(file)", `invalid JSON: ${found.error}`));
      continue;
    }
    const result = entry.schema.safeParse(found.data);
    if (!result.success) {
      for (const issue of result.error.issues) {
        findings.push(
          error(entry.file, issue.path.length > 0 ? issue.path.join(".") : "(root)", issue.message),
        );
      }
      continue;
    }
    filesValidated += 1;
    parsed.set(entry.file, result.data);
  }

  const registered = new Set(KUL_DATA_FILE_REGISTRY.map((entry) => entry.file));
  let filesUnregistered = 0;
  for (const file of source.keys()) {
    // modules.json is the optional learning-module index (ADR-0007); no module exists for this programme yet.
    if (!registered.has(file) && file !== MODULES_FILE_NAME) {
      filesUnregistered += 1;
      findings.push(
        error(
          file,
          "(file)",
          "this data file is not covered by any schema in KUL_DATA_FILE_REGISTRY " +
            "(src/domain/kul-corpus-audit.ts) -- add it there so it is validated rather than silently ignored",
        ),
      );
    }
  }

  return { findings, parsed, filesValidated, filesMissing, filesUnregistered };
}

/** Findings for a prerequisite graph: unknown codes, not-earlier semesters, cycles. */
function prerequisiteFindings(courses: Courses): CorpusFinding[] {
  const findings: CorpusFinding[] = [];
  const byCode = new Map(courses.courses.map((course) => [course.code, course]));

  courses.courses.forEach((course, index) => {
    course.prerequisites.forEach((prerequisite, i) => {
      const at = `courses[${index}].prerequisites[${i}]`;
      const target = byCode.get(prerequisite);
      if (target === undefined) {
        findings.push(
          error(
            "courses.json",
            at,
            `prerequisite "${prerequisite}" is not a course in courses.json`,
          ),
        );
      } else if (prerequisite === course.code) {
        findings.push(error("courses.json", at, "a course cannot be its own prerequisite"));
      } else if (semesterNumber(target.semester) >= semesterNumber(course.semester)) {
        findings.push(
          error(
            "courses.json",
            at,
            `prerequisite ${prerequisite} (${target.semester}) must come in an earlier semester than ${course.code} (${course.semester})`,
          ),
        );
      }
    });
    const named = course.prerequisitesText.match(/KUL-[UIK]-\d{3}/g) ?? [];
    if (named.join(",") !== course.prerequisites.join(",")) {
      findings.push(
        error(
          "courses.json",
          `courses[${index}].prerequisites`,
          `must list exactly the course codes named in prerequisitesText "${course.prerequisitesText}" (found [${named.join(", ")}])`,
        ),
      );
    }
  });

  // Cycle detection (depth-first; a back edge to a node on the current path).
  const state = new Map<string, "path" | "done">();
  const visit = (code: string, path: string[]): void => {
    const current = state.get(code);
    if (current === "done") {
      return;
    }
    if (current === "path") {
      const loop = [...path.slice(path.indexOf(code)), code].join(" -> ");
      findings.push(error("courses.json", "courses", `prerequisite cycle: ${loop}`));
      return;
    }
    state.set(code, "path");
    for (const next of byCode.get(code)?.prerequisites ?? []) {
      if (byCode.has(next)) {
        visit(next, [...path, code]);
      }
    }
    state.set(code, "done");
  };
  for (const course of courses.courses) {
    visit(course.code, []);
  }
  return findings;
}

function structuralFindings(parsed: Parsed): CorpusFinding[] {
  const findings: CorpusFinding[] = [];
  const tracks = typed<Tracks>(parsed, "tracks.json");
  const courses = typed<Courses>(parsed, "courses.json");
  const areas = typed<Areas>(parsed, "knowledge-areas.json");
  const ai = typed<AiPolicy>(parsed, "ai-policy.json");
  const bridges = typed<Bridges>(parsed, "bridges.json");
  const cpl = typed<Cpl>(parsed, "cpl.json");

  const count = (file: string, path: string, label: string, actual: number, expected: number) => {
    if (actual !== expected) {
      findings.push(error(file, path, `expected exactly ${expected} ${label}, found ${actual}`));
    }
  };

  if (tracks !== undefined) {
    count("tracks.json", "tracks", "tracks", tracks.tracks.length, KUL_EXPECTED_COUNTS.tracks);
    count("tracks.json", "total.sks", "total SKS", tracks.total.sks, KUL_EXPECTED_COUNTS.totalSks);
    count(
      "tracks.json",
      "total.coreSks",
      "total core SKS",
      tracks.total.coreSks,
      KUL_EXPECTED_COUNTS.totalCoreSks,
    );
    count(
      "tracks.json",
      "total.courseCount",
      "total courses",
      tracks.total.courseCount,
      KUL_EXPECTED_COUNTS.courses,
    );
    const ids = tracks.tracks.map((track) => track.id).join(",");
    if (ids !== KUL_TRACK_IDS.join(",")) {
      findings.push(
        error(
          "tracks.json",
          "tracks",
          `tracks must be ${KUL_TRACK_IDS.join(", ")} in order; found [${ids}]`,
        ),
      );
    }
    tracks.tracks.forEach((track, index) => {
      const expected = KUL_EXPECTED_COUNTS.perTrack[track.id];
      const at = `tracks[${index}]`;
      count(
        "tracks.json",
        `${at}.courseCount`,
        `courses of jalur ${track.id}`,
        track.courseCount,
        expected.courses,
      );
      count("tracks.json", `${at}.sks`, `SKS of jalur ${track.id}`, track.sks, expected.sks);
      count(
        "tracks.json",
        `${at}.coreSks`,
        `core SKS of jalur ${track.id}`,
        track.coreSks,
        expected.coreSks,
      );
      if (semesterNumber(track.firstSemester) > semesterNumber(track.lastSemester)) {
        findings.push(error("tracks.json", at, "firstSemester must not come after lastSemester"));
      }
    });
    const sum = (pick: (t: Tracks["tracks"][number]) => number) =>
      tracks.tracks.reduce((total, track) => total + pick(track), 0);
    for (const [label, field, actual] of [
      ["course count", "courseCount", sum((t) => t.courseCount)],
      ["SKS", "sks", sum((t) => t.sks)],
      ["core SKS", "coreSks", sum((t) => t.coreSks)],
    ] as const) {
      if (actual !== tracks.total[field]) {
        findings.push(
          error(
            "tracks.json",
            `total.${field}`,
            `the "Jumlah" row (${tracks.total[field]}) must equal the sum of the tracks' ${label} (${actual})`,
          ),
        );
      }
    }
  }

  if (courses !== undefined) {
    count(
      "courses.json",
      "courses",
      "courses",
      courses.courses.length,
      KUL_EXPECTED_COUNTS.courses,
    );

    const seen = new Set<string>();
    courses.courses.forEach((course, index) => {
      const at = `courses[${index}]`;
      if (seen.has(course.code)) {
        findings.push(
          error("courses.json", `${at}.code`, `duplicate course code "${course.code}"`),
        );
      }
      seen.add(course.code);
      if (course.code.split("-")[1] !== course.track) {
        findings.push(
          error(
            "courses.json",
            `${at}.track`,
            `track "${course.track}" disagrees with the track letter of code ${course.code}`,
          ),
        );
      }
      course.cpmk.forEach((cpmk, i) => {
        const expected = `${course.code}-C${i + 1}`;
        if (cpmk.code !== expected) {
          findings.push(
            error(
              "courses.json",
              `${at}.cpmk[${i}].code`,
              `must be "${expected}" (CPMK are numbered C1.. in order, prefixed by the course code)`,
            ),
          );
        }
      });
      if (course.cplProdi.length > 0) {
        findings.push(
          error(
            "courses.json",
            `${at}.cplProdi`,
            "must stay empty: CPL belongs to the adopting study programme and is never authored here (silabus bagian 4.1)",
          ),
        );
      }
      const kaNamed = course.kaText.replace(/\([^)]*\)/g, "").match(/\b[A-Z]{2,3}\b/g) ?? [];
      if (kaNamed.join(",") !== course.kaCodes.join(",")) {
        findings.push(
          error(
            "courses.json",
            `${at}.kaCodes`,
            `must list exactly the knowledge areas named in kaText "${course.kaText}" (found [${kaNamed.join(", ")}])`,
          ),
        );
      }
    });

    findings.push(...prerequisiteFindings(courses));

    if (tracks !== undefined) {
      for (const track of tracks.tracks) {
        const own = courses.courses.filter((course) => course.track === track.id);
        const where = `tracks[${track.id}]`;
        if (own.length !== track.courseCount) {
          findings.push(
            error(
              "tracks.json",
              where,
              `lists ${track.courseCount} courses but courses.json has ${own.length} of jalur ${track.id}`,
            ),
          );
        }
        const sks = own.reduce((total, course) => total + course.sks, 0);
        if (sks !== track.sks) {
          findings.push(
            error(
              "tracks.json",
              `${where}.sks`,
              `jalur ${track.id} courses add up to ${sks} SKS but the track table says ${track.sks}`,
            ),
          );
        }
        const coreOwn = own.filter((course) => !course.elective);
        const coreSks = coreOwn.reduce((total, course) => total + course.sks, 0);
        if (coreSks !== track.coreSks) {
          findings.push(
            error(
              "tracks.json",
              `${where}.coreSks`,
              `jalur ${track.id} core (non-elective) courses add up to ${coreSks} SKS but the track table says ${track.coreSks}`,
            ),
          );
        }
        if (coreOwn.length !== track.coreCourseCount) {
          findings.push(
            error(
              "tracks.json",
              `${where}.coreCourseCount`,
              `jalur ${track.id} has ${coreOwn.length} core courses but the track table says ${track.coreCourseCount}`,
            ),
          );
        }
        if (own.length > 0) {
          const numbers = own.map((course) => semesterNumber(course.semester));
          const first = Math.min(...numbers);
          const last = Math.max(...numbers);
          if (
            first !== semesterNumber(track.firstSemester) ||
            last !== semesterNumber(track.lastSemester)
          ) {
            findings.push(
              error(
                "tracks.json",
                `${where}.semesterRangeText`,
                `courses of jalur ${track.id} span S${first}-S${last} but the track table says ${track.firstSemester}-${track.lastSemester}`,
              ),
            );
          }
        }
      }
    }

    const perSemester = new Map<number, number>();
    for (const course of courses.courses.filter((c) => c.track === "I")) {
      const number = semesterNumber(course.semester);
      perSemester.set(number, (perSemester.get(number) ?? 0) + course.sks);
    }
    for (const [semester, sks] of [...perSemester].sort((a, b) => a[0] - b[0])) {
      if (sks > KUL_MAX_SKS_PER_SEMESTER_TRACK_I) {
        findings.push(
          error(
            "courses.json",
            "courses",
            `jalur I has ${sks} SKS in S${semester}, above the ceiling of ${KUL_MAX_SKS_PER_SEMESTER_TRACK_I} SKS per semester (silabus bagian 2.3)`,
          ),
        );
      }
    }
  }

  if (areas !== undefined) {
    count(
      "knowledge-areas.json",
      "areas",
      "knowledge areas",
      areas.areas.length,
      KUL_EXPECTED_COUNTS.knowledgeAreas,
    );
    count(
      "knowledge-areas.json",
      "gaps",
      "acknowledged gaps",
      areas.gaps.length,
      KUL_EXPECTED_COUNTS.gaps,
    );
    const codes = areas.areas.map((area) => area.code);
    for (const code of KUL_KNOWLEDGE_AREA_CODES) {
      const times = codes.filter((c) => c === code).length;
      if (times !== 1) {
        findings.push(
          error(
            "knowledge-areas.json",
            "areas",
            `knowledge area ${code} must appear exactly once, found ${times}`,
          ),
        );
      }
    }
    areas.areas.forEach((area, index) => {
      if (area.name !== KUL_KNOWLEDGE_AREA_NAMES[area.code]) {
        findings.push(
          error(
            "knowledge-areas.json",
            `areas[${index}].name`,
            `must be the official CS2023 name "${KUL_KNOWLEDGE_AREA_NAMES[area.code]}" for ${area.code}`,
          ),
        );
      }
    });
  }

  if (ai !== undefined) {
    count(
      "ai-policy.json",
      "levels",
      "AI policy levels",
      ai.levels.length,
      KUL_EXPECTED_COUNTS.aiLevels,
    );
    const levels = ai.levels.map((level) => level.level).join(",");
    if (levels !== KUL_AI_LEVELS.join(",")) {
      findings.push(
        error(
          "ai-policy.json",
          "levels",
          `levels must be ${KUL_AI_LEVELS.join(", ")} in order; found [${levels}]`,
        ),
      );
    }
  }

  if (bridges !== undefined) {
    count(
      "bridges.json",
      "fromSma",
      "bridges from SMA",
      bridges.fromSma.length,
      KUL_EXPECTED_COUNTS.fromSma,
    );
    count(
      "bridges.json",
      "toWork",
      "bridges to work",
      bridges.toWork.length,
      KUL_EXPECTED_COUNTS.toWork,
    );
  }

  if (cpl !== undefined) {
    const ids = cpl.trackGroups.map((group) => group.track).join(",");
    if (ids !== KUL_TRACK_IDS.join(",")) {
      findings.push(
        error(
          "cpl.json",
          "trackGroups",
          `must map ${KUL_TRACK_IDS.join(", ")} once each, in order; found [${ids}]`,
        ),
      );
    }
  }

  return findings;
}

function referentialFindings(parsed: Parsed): CorpusFinding[] {
  const findings: CorpusFinding[] = [];
  const courses = typed<Courses>(parsed, "courses.json");
  const areas = typed<Areas>(parsed, "knowledge-areas.json");
  const ai = typed<AiPolicy>(parsed, "ai-policy.json");
  const bridges = typed<Bridges>(parsed, "bridges.json");
  if (courses === undefined) {
    return findings;
  }
  const byCode = new Map(courses.courses.map((course) => [course.code, course]));

  const check = (file: string, path: string, code: string) => {
    if (!byCode.has(code)) {
      findings.push(error(file, path, `course "${code}" does not exist in courses.json`));
    }
  };

  if (areas !== undefined) {
    areas.areas.forEach((area, index) => {
      const at = `areas[${index}]`;
      area.courseLinks.forEach((link, i) => {
        check("knowledge-areas.json", `${at}.courseLinks[${i}].course`, link.course);
        if (byCode.has(link.course) && byCode.get(link.course)?.track !== "I") {
          findings.push(
            error(
              "knowledge-areas.json",
              `${at}.courseLinks[${i}].course`,
              `${link.course} is not a jalur I course (the column lists jalur I)`,
            ),
          );
        }
      });
      const linked = (area.coursesText.match(/KUL-[UIK]-\d{3}/g) ?? []).join(",");
      if (linked !== area.courseLinks.map((link) => link.course).join(",")) {
        findings.push(
          error(
            "knowledge-areas.json",
            `${at}.courseLinks`,
            `must list exactly the courses named in coursesText "${area.coursesText}"`,
          ),
        );
      }
      area.supportCourses.forEach((code, i) => {
        check("knowledge-areas.json", `${at}.supportCourses[${i}]`, code);
        if (byCode.get(code)?.track === "I") {
          findings.push(
            error(
              "knowledge-areas.json",
              `${at}.supportCourses[${i}]`,
              `${code} is a jalur I course; the column lists support from other tracks`,
            ),
          );
        }
      });
      const support = (area.supportText.match(/KUL-[UIK]-\d{3}/g) ?? []).join(",");
      if (support !== area.supportCourses.join(",")) {
        findings.push(
          error(
            "knowledge-areas.json",
            `${at}.supportCourses`,
            `must list exactly the courses named in supportText "${area.supportText}"`,
          ),
        );
      }
    });
  }

  if (ai !== undefined) {
    ai.levels.forEach((level, index) => {
      level.usedOnCourses.forEach((code, i) => {
        check("ai-policy.json", `levels[${index}].usedOnCourses[${i}]`, code);
      });
    });
  }

  if (bridges !== undefined) {
    bridges.fromSma.forEach((row, index) => {
      row.toCourses.forEach((code, i) => {
        check("bridges.json", `fromSma[${index}].toCourses[${i}]`, code);
      });
    });
    bridges.toWork.forEach((row, index) => {
      row.courses.forEach((code, i) => {
        check("bridges.json", `toWork[${index}].courses[${i}]`, code);
      });
    });
  }

  return findings;
}

/**
 * Audits `source` -- the `data/kuliah-coding/` corpus as file name ->
 * entry. The programme references no other programme's corpus, so no
 * cross-programme input is needed.
 */
export function auditKulCorpus(source: CorpusSource): AuditResult {
  const schema = schemaFindings(source);
  const findings = [
    ...schema.findings,
    ...structuralFindings(schema.parsed),
    ...referentialFindings(schema.parsed),
  ];
  const errorCount = findings.filter((finding) => finding.severity === "error").length;
  return {
    ok: findings.length === 0,
    findings,
    summary: {
      filesValidated: schema.filesValidated,
      filesMissing: schema.filesMissing,
      filesUnregistered: schema.filesUnregistered,
      findingCount: findings.length,
      errorCount,
      warningCount: findings.length - errorCount,
    },
  };
}
