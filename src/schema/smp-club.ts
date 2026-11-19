/**
 * Schema for `data/smp-coding/club.json`: the optional enrichment club
 * (silabus bagian 3.4). The club is outside the 168 core JP and is never
 * counted as covering a CP item; `countsAsCpCoverage` is therefore fixed to
 * `false`, and the fidelity check verifies the syllabus still says so.
 */

import { z } from "zod";
import { nonEmptyString } from "./common";
import { smpClassSchema, smpProvenanceShape } from "./smp-common";

export const smpClubStageSchema = z
  .object({
    kelas: smpClassSchema,
    stage: nonEmptyString.describe('The "Tahap" cell, verbatim.'),
    content: nonEmptyString.describe('The "Isi" cell, verbatim.'),
    tool: nonEmptyString.describe('The "Alat" cell, verbatim.'),
    note: nonEmptyString.describe('The "Catatan" cell, verbatim.'),
  })
  .strict();

export const smpClubFileSchema = z
  .object({
    ...smpProvenanceShape,
    preface: nonEmptyString.describe("The paragraph before the table, verbatim."),
    countsAsCpCoverage: z
      .literal(false)
      .describe("The club is never counted as covering a CP item."),
    stages: z.array(smpClubStageSchema).min(1),
  })
  .strict()
  .refine((file) => new Set(file.stages.map((s) => s.kelas)).size === file.stages.length, {
    path: ["stages"],
    message: "each kelas may have only one club stage",
  })
  .describe("The full contents of `data/smp-coding/club.json`.");

export type SmpClubFile = z.infer<typeof smpClubFileSchema>;
