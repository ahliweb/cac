/**
 * Schema for `data/kuliah-coding/knowledge-areas.json`: the mapping of the
 * courses to the 17 knowledge areas of CS2023 (silabus bagian 4.2; tier of the
 * area only, never units inside an area) and the acknowledged gaps.
 */

import { z } from "zod";
import { nonEmptyString } from "./common";
import { kulCourseCodeSchema, kulKnowledgeAreaCodeSchema, kulProvenanceShape } from "./kul-common";

export const KUL_KA_LINK_LEVELS = ["utama", "sebagian", "pilihan"] as const;

export const kulKaLinkSchema = z
  .object({
    course: kulCourseCodeSchema,
    level: z
      .enum(KUL_KA_LINK_LEVELS)
      .describe('"utama" (centre of the area), "sebagian" (touches it) or "pilihan" (elective).'),
  })
  .strict();

export const kulKnowledgeAreaSchema = z
  .object({
    code: kulKnowledgeAreaCodeSchema,
    name: nonEmptyString.describe('The area name without its "(CODE)" suffix, verbatim.'),
    coursesText: z.string().describe('The "Mata kuliah (jalur I)" cell, verbatim (may be empty).'),
    courseLinks: z.array(kulKaLinkSchema).describe("coursesText parsed into course + level."),
    supportText: z.string().describe('The "Dukungan jalur lain" cell, verbatim (may be empty).'),
    supportCourses: z
      .array(kulCourseCodeSchema)
      .describe("Every course code named in supportText, in order of appearance."),
  })
  .strict();

export const kulKnowledgeAreasFileSchema = z
  .object({
    ...kulProvenanceShape,
    areas: z.array(kulKnowledgeAreaSchema).min(1),
    gaps: z.array(nonEmptyString).describe('The "Celah yang diakui" items, verbatim, in order.'),
  })
  .strict()
  .describe("The full contents of `data/kuliah-coding/knowledge-areas.json`.");

export type KulKnowledgeAreasFile = z.infer<typeof kulKnowledgeAreasFileSchema>;
