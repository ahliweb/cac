/**
 * Schema for `data/kuliah-coding/courses.json`: the 24 courses of the three
 * tracks (silabus bagian 3.1-3.3), each with credits (SKS), semester,
 * prerequisites, authored course learning outcomes (CPMK, `[karangan]`),
 * topics, assessment, the CS2023 knowledge areas it touches (tier of the
 * area only) and the empty CPL column that each adopting study programme
 * fills itself (bagian 4.1).
 *
 * Referential checks (prerequisites exist and are acyclic, totals equal the
 * track table, CPMK numbering) need other corpus files and live in
 * `src/domain/kul-corpus-audit.ts`.
 */

import { z } from "zod";
import { nonEmptyString } from "./common";
import {
  kulCourseCodeSchema,
  kulCpmkCodeSchema,
  kulKnowledgeAreaCodeSchema,
  kulProvenanceShape,
  kulSemesterSchema,
  kulSksSchema,
  kulTrackIdSchema,
} from "./kul-common";

/** One authored course learning outcome; the syllabus marks every CPMK `[karangan]`. */
export const kulCpmkSchema = z
  .object({
    code: kulCpmkCodeSchema,
    text: nonEmptyString.describe("The outcome text after its C<n> marker, verbatim."),
    origin: z
      .literal("karangan")
      .describe("CPMK are authored by the drafter, never quoted (ADR-0007)."),
  })
  .strict();

export const kulCourseSchema = z
  .object({
    code: kulCourseCodeSchema,
    track: kulTrackIdSchema,
    name: nonEmptyString.describe(
      'The course name; a trailing "(pilihan)" is expressed by `elective`.',
    ),
    elective: z
      .boolean()
      .describe('`true` when the course is a "(pilihan)" elective (not part of the core SKS).'),
    sks: kulSksSchema,
    semester: kulSemesterSchema,
    prerequisitesText: nonEmptyString.describe('The "Prasyarat" cell, verbatim.'),
    prerequisites: z
      .array(kulCourseCodeSchema)
      .describe("Every course code named in prerequisitesText, in order of appearance."),
    kaText: nonEmptyString.describe(
      'The knowledge-area cell/line ("KA CS2023" or "KA utama"), verbatim (final full stop dropped).',
    ),
    kaCodes: z
      .array(kulKnowledgeAreaCodeSchema)
      .min(1)
      .describe("The CS2023 knowledge-area codes named in kaText, in order of appearance."),
    cpmk: z.array(kulCpmkSchema).min(1),
    topics: nonEmptyString.describe(
      'The "Pokok bahasan" text, verbatim (final full stop dropped).',
    ),
    assessment: nonEmptyString.describe('The "Asesmen" text, verbatim (final full stop dropped).'),
    cplProdi: z
      .array(nonEmptyString)
      .describe(
        "CPL of the adopting study programme this course contributes to. Always empty here: " +
          "no national CPL exists for coding and the repository never invents one (bagian 4.1).",
      ),
  })
  .strict();

export const kulCoursesFileSchema = z
  .object({
    ...kulProvenanceShape,
    courses: z.array(kulCourseSchema).min(1),
  })
  .strict()
  .describe("The full contents of `data/kuliah-coding/courses.json`.");

export type KulCourse = z.infer<typeof kulCourseSchema>;
export type KulCoursesFile = z.infer<typeof kulCoursesFileSchema>;
