/**
 * Schema for `data/kuliah-coding/cpl.json`: the CPL (capaian pembelajaran
 * lulusan) mapping of silabus bagian 4.1. CPL is formulated by each study
 * programme (Pasal 8 ayat (1)) and no national CPL for coding was found, so
 * the mapping is deliberately **not authored**: it is a column each adopting
 * programme fills in. Only the tier-of-group mapping the syllabus marks
 * `[asumsi]` is recorded, and it is not an official mapping.
 */

import { z } from "zod";
import { nonEmptyString } from "./common";
import { kulProvenanceShape, kulTrackIdSchema } from "./kul-common";

export const kulCplTrackGroupSchema = z
  .object({
    track: kulTrackIdSchema,
    groupText: nonEmptyString.describe("The CPL competence group the track strengthens, verbatim."),
  })
  .strict();

export const kulCplFileSchema = z
  .object({
    ...kulProvenanceShape,
    codeCell: nonEmptyString.describe('The "Kode MK" cell of the single table row, verbatim.'),
    fillCell: nonEmptyString.describe('The "CPL prodi ..." cell of the row, verbatim.'),
    noteCell: nonEmptyString.describe('The "Keterangan" cell of the row, verbatim.'),
    competencyGroups: z
      .array(nonEmptyString)
      .length(4)
      .describe("The four CPL competence groups of Pasal 7, verbatim, in order."),
    trackGroups: z
      .array(kulCplTrackGroupSchema)
      .describe("Tier-of-group mapping per track (`[asumsi]`, not an official mapping)."),
  })
  .strict()
  .describe("The full contents of `data/kuliah-coding/cpl.json`.");

export type KulCplFile = z.infer<typeof kulCplFileSchema>;
