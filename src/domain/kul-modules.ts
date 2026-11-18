/**
 * Pure rules over the `kuliah-coding` learning-module index
 * (`data/kuliah-coding/modules.json`, ADR-0007, ADR-0008). No I/O; the file
 * check (each module's body exists and is non-empty) lives in
 * `src/cli/module-content.ts`.
 *
 * `modules.json` is optional: a corpus without it yields no findings. When
 * present it is checked for schema conformance (which includes "the id is
 * the lower-case course code") and for referential integrity: the course
 * exists in `courses.json` and `semester` is its semester; every
 * `knowledgeAreas` entry is one the corpus maps to that course (its own
 * `kaCodes` in `courses.json`, or a link / support entry for it in
 * `knowledge-areas.json`); every prerequisite is a module of the index or
 * an existing course code; the prerequisite graph has no cycle.
 */

import { kulCourseCodeSchema } from "../schema/kul-common";
import { kulCoursesFileSchema } from "../schema/kul-course";
import { kulKnowledgeAreasFileSchema } from "../schema/kul-knowledge-area";
import { type KulModulesFile, kulModulesFileSchema } from "../schema/kul-module";
import type { CorpusFinding, CorpusSource } from "./corpus-audit";
import {
  moduleError,
  parsedCorpusFile,
  parseIndexWith,
  prerequisiteFindings,
  requireReference,
} from "./program-modules-common";

/** Parses the index out of `source`: `undefined` when absent; findings when unreadable/invalid. */
export function parseKulModulesIndex(source: CorpusSource): {
  readonly modules: KulModulesFile | undefined;
  readonly findings: CorpusFinding[];
} {
  return parseIndexWith(source, kulModulesFileSchema);
}

/** Every problem in the `kuliah-coding` module index. */
export function kulModuleFindings(source: CorpusSource): CorpusFinding[] {
  const { modules, findings } = parseKulModulesIndex(source);
  if (modules === undefined) {
    return findings;
  }

  const courses = parsedCorpusFile(source, "courses.json", kulCoursesFileSchema);
  const areas = parsedCorpusFile(source, "knowledge-areas.json", kulKnowledgeAreasFileSchema);
  const courseByCode = courses && new Map(courses.courses.map((course) => [course.code, course]));

  requireReference(
    findings,
    modules.modules.length > 0,
    courses !== undefined,
    "courseCodes/semester/prerequisites",
    "courses.json",
  );
  requireReference(
    findings,
    modules.modules.some((module) => module.knowledgeAreas.length > 0),
    areas !== undefined,
    "knowledgeAreas",
    "knowledge-areas.json",
  );

  /** The knowledge areas the corpus maps to a course: its own `kaCodes` plus every area that links or supports it. */
  const areasOf = (courseCode: string): Set<string> | undefined => {
    const course = courseByCode?.get(courseCode);
    if (course === undefined || areas === undefined) {
      return undefined;
    }
    const mapped = new Set<string>(course.kaCodes);
    for (const area of areas.areas) {
      if (
        area.courseLinks.some((link) => link.course === courseCode) ||
        area.supportCourses.includes(courseCode)
      ) {
        mapped.add(area.code);
      }
    }
    return mapped;
  };

  modules.modules.forEach((module, index) => {
    const at = (field: string, i: number) => `modules[${index}].${field}[${i}]`;
    const courseCode = module.courseCodes[0] as string;
    const course = courseByCode?.get(courseCode);

    module.courseCodes.forEach((code, i) => {
      if (courseByCode !== undefined && !courseByCode.has(code)) {
        findings.push(
          moduleError(at("courseCodes", i), `course code "${code}" does not exist in courses.json`),
        );
      }
    });

    if (course !== undefined && course.semester !== module.semester) {
      findings.push(
        moduleError(
          `modules[${index}].semester`,
          `course ${courseCode} is in semester ${course.semester} in courses.json, not ${module.semester}`,
        ),
      );
    }

    const mapped = areasOf(courseCode);
    module.knowledgeAreas.forEach((code, i) => {
      if (mapped !== undefined && !mapped.has(code)) {
        findings.push(
          moduleError(
            at("knowledgeAreas", i),
            `knowledge area "${code}" is not mapped to course ${courseCode} in courses.json or knowledge-areas.json`,
          ),
        );
      }
    });
  });

  findings.push(
    ...prerequisiteFindings(modules.modules, {
      isUnitCode: (value) => kulCourseCodeSchema.safeParse(value).success,
      unitCodes: courseByCode && new Set(courseByCode.keys()),
      unitFile: "courses.json",
      unitName: "course code",
    }),
  );

  return findings;
}
