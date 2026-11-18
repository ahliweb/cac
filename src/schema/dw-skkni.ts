/**
 * Schema for `data/dewasa-coding/skkni-units.json`: the 47 competency units
 * of Kepmenaker 282/2016 (programming), as the copy recorded in
 * `docs/programs/dewasa-coding/riset.md` bagian 2.2, plus what the syllabus
 * (bagian 5.2) claims about how `PRO` modules touch them.
 *
 * Owner decision 2026-11-19: the mapping goes only down to the unit
 * *title*, and the copy of the list is marked as not verified against the
 * official file. Both facts are data here (`mappingDepth`, and
 * `verification` on every unit) so no reader can mistake a touched unit for
 * a certified competence.
 */

import { z } from "zod";
import { nonEmptyString } from "./common";
import { dwProvenanceShape, dwSkkniUnitCodeSchema } from "./dw-common";

/** How far the unit mapping goes. Only the unit title today. */
export const DW_SKKNI_MAPPING_DEPTHS = ["judul-unit"] as const;

/** Whether a unit entry was checked against the official file. */
export const DW_SKKNI_VERIFICATIONS = ["salinan-belum-terverifikasi"] as const;

export const dwSkkniUnitSchema = z
  .object({
    code: dwSkkniUnitCodeSchema,
    title: nonEmptyString.describe('The "Judul unit kompetensi" cell of riset.md, verbatim.'),
    verification: z
      .enum(DW_SKKNI_VERIFICATIONS)
      .describe('"salinan-belum-terverifikasi": copied from a scanned copy, not the official file.'),
  })
  .strict();

export const dwSkkniFileSchema = z
  .object({
    ...dwProvenanceShape,
    unitsSource: z
      .literal("docs/programs/dewasa-coding/riset.md")
      .describe("The document the unit list is transcribed from (bagian 2.2)."),
    unitsSourceSection: z.literal("bagian 2.2"),
    regulation: nonEmptyString.describe("The regulation the units belong to."),
    enactedOn: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, 'must be an ISO date "YYYY-MM-DD"')
      .describe("The date the regulation was enacted."),
    mappingDepth: z.enum(DW_SKKNI_MAPPING_DEPTHS),
    touchedUnitCount: z
      .number()
      .int()
      .nonnegative()
      .describe('The syllabus claim "menyentuh N dari 47 unit".'),
    uncoveredUnitCodes: z
      .array(dwSkkniUnitCodeSchema)
      .describe("The units the syllabus says no PRO module touches."),
    units: z.array(dwSkkniUnitSchema).min(1),
  })
  .strict()
  .refine((file) => new Set(file.units.map((unit) => unit.code)).size === file.units.length, {
    path: ["units"],
    message: "unit codes must be unique",
  })
  .describe("The full contents of `data/dewasa-coding/skkni-units.json`.");

export type DwSkkniUnit = z.infer<typeof dwSkkniUnitSchema>;
export type DwSkkniFile = z.infer<typeof dwSkkniFileSchema>;
