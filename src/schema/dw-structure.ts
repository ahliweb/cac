/**
 * Schema for `data/dewasa-coding/structure.json`: the "Struktur program dan
 * asumsi" table of the syllabus (bagian 2), one record per row. Every value
 * is verbatim, including its `[asumsi]` / `[belum terverifikasi]` marks.
 */

import { z } from "zod";
import { nonEmptyString } from "./common";
import { dwProvenanceShape } from "./dw-common";

export const dwStructureRowSchema = z
  .object({
    item: nonEmptyString.describe('The "Butir" cell, verbatim.'),
    value: nonEmptyString.describe('The "Nilai" cell, verbatim.'),
  })
  .strict();

export const dwStructureFileSchema = z
  .object({
    ...dwProvenanceShape,
    rows: z.array(dwStructureRowSchema).min(1),
  })
  .strict()
  .refine((file) => new Set(file.rows.map((row) => row.item)).size === file.rows.length, {
    path: ["rows"],
    message: "structure items must be unique",
  })
  .describe("The full contents of `data/dewasa-coding/structure.json`.");

export type DwStructureFile = z.infer<typeof dwStructureFileSchema>;
