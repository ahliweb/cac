/**
 * Schema for `data/tk-coding/cp-mapping.json`: the table of computational
 * thinking concepts and the CP wording they overlap with (silabus bagian
 * 4.2). The mapping is the author's *interpretation of an overlap*, never a
 * claim that a CP item is fulfilled: the file carries the literal markers
 * `cpRelation: "irisan-penafsiran"` and `meetsCp: false`
 * (see `tkCpRelationShape`) and the syllabus's own disclaimer.
 */

import { z } from "zod";
import { nonEmptyString } from "./common";
import { tkCpCodeSchema, tkCpRelationShape, tkProvenanceShape } from "./tk-common";

/** How closely a concept matches the CP wording: "Langsung" or "Sedang" (bagian 4.2). */
export const TK_MATCH_LEVELS = ["langsung", "sedang"] as const;
export const tkMatchLevelSchema = z.enum(TK_MATCH_LEVELS);

export const tkConceptMappingSchema = z
  .object({
    concept: nonEmptyString.describe('The "Konsep di silabus" cell, verbatim.'),
    cpText: nonEmptyString.describe('The "Irisan terdekat pada CP" cell, verbatim.'),
    cpCodes: z
      .array(tkCpCodeSchema)
      .describe("The CP item codes cited in cpText, in order (empty when only a scope is cited)."),
    matchText: nonEmptyString.describe('The "Tingkat kecocokan" cell, verbatim.'),
    matchLevel: tkMatchLevelSchema.describe("The level word that starts matchText, lower-cased."),
  })
  .strict()
  .refine((mapping) => mapping.matchText.toLowerCase().startsWith(mapping.matchLevel), {
    path: ["matchLevel"],
    message: "must be the first word of matchText, lower-cased",
  });

export const tkCpMappingFileSchema = z
  .object({
    ...tkProvenanceShape,
    ...tkCpRelationShape,
    interpretationNote: nonEmptyString.describe(
      "The paragraph of bagian 4.2 that states the mapping is the author's interpretation, verbatim.",
    ),
    concepts: z.array(tkConceptMappingSchema).min(1),
    untouchedNote: nonEmptyString.describe(
      "The paragraph of bagian 4.3 on the CP items the syllabus does not touch, verbatim.",
    ),
  })
  .strict()
  .superRefine((file, ctx) => {
    const concepts = file.concepts.map((mapping) => mapping.concept);
    if (new Set(concepts).size !== concepts.length) {
      ctx.addIssue({ code: "custom", path: ["concepts"], message: "concepts must be unique" });
    }
  })
  .describe("The full contents of `data/tk-coding/cp-mapping.json`.");

export type TkCpMappingFile = z.infer<typeof tkCpMappingFileSchema>;
