/**
 * Schema for `data/dewasa-coding/shared.json`: the module(s) shared by all
 * persona tracks (silabus bagian 3; today `DW-FND-M1`, security, privacy
 * and ethics of working with code and AI), one record per module with the
 * rows of its "Butir | Isi" table.
 */

import { z } from "zod";
import { nonEmptyString } from "./common";
import { DW_SHARED_TRACK_ID, dwHoursSchema, dwProvenanceShape } from "./dw-common";

export const dwSharedModuleSchema = z
  .object({
    code: z
      .string()
      .regex(
        new RegExp(`^DW-${DW_SHARED_TRACK_ID}-M[1-9]\\d*$`),
        `must be a shared module code such as "DW-${DW_SHARED_TRACK_ID}-M1"`,
      ),
    title: nonEmptyString.describe("The module title from its heading, verbatim."),
    hours: dwHoursSchema,
    outcome: nonEmptyString.describe('The "Hasil belajar" cell, verbatim.'),
    topics: nonEmptyString.describe('The "Topik" cell, verbatim.'),
    exercises: nonEmptyString.describe('The "Latihan" cell, verbatim.'),
    references: nonEmptyString.describe('The "Rujukan" cell, verbatim.'),
  })
  .strict();

export const dwSharedFileSchema = z
  .object({
    ...dwProvenanceShape,
    modules: z.array(dwSharedModuleSchema).min(1),
  })
  .strict()
  .refine(
    (file) => new Set(file.modules.map((module) => module.code)).size === file.modules.length,
    { path: ["modules"], message: "shared module codes must be unique" },
  )
  .describe("The full contents of `data/dewasa-coding/shared.json`.");

export type DwSharedModule = z.infer<typeof dwSharedModuleSchema>;
export type DwSharedFile = z.infer<typeof dwSharedFileSchema>;
