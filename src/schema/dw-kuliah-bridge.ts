/**
 * Schema for `data/dewasa-coding/kuliah-bridge.json`: the bridge from
 * `kuliah-coding` into track `PRO` (silabus bagian 6.2, owner decision
 * 2026-11-19, issue #177): the three entry profiles, the recognition status
 * of every `PRO` module per profile (lewati `L`, padatkan `P`, wajib `W`),
 * the hour impact per profile, and the modules that are mandatory for all.
 *
 * Cells are verbatim; the codes they name are extracted so `osn validate`
 * can check them (`DW-` codes against this corpus, `KUL-` codes against the
 * `kuliah-coding` corpus through the cross-programme check, ADR-0010).
 */

import { z } from "zod";
import { nonEmptyString } from "./common";
import { dwHoursSchema, dwProvenanceShape } from "./dw-common";

/** The recognition statuses of a `PRO` module: L (lewati), P (padatkan), W (wajib). */
export const DW_RECOGNITION_STATUSES = ["L", "P", "W"] as const;
export const dwRecognitionStatusSchema = z
  .enum(DW_RECOGNITION_STATUSES)
  .describe('"L" (lewati), "P" (padatkan) or "W" (wajib).');
export type DwRecognitionStatus = z.infer<typeof dwRecognitionStatusSchema>;

/** The entry profiles of bagian 6.2, in table order. */
export const DW_KULIAH_PROFILE_IDS = ["I-lengkap", "I-awal", "U-lengkap"] as const;
export const dwKuliahProfileIdSchema = z
  .enum(DW_KULIAH_PROFILE_IDS)
  .describe('An entry profile: "I-lengkap", "I-awal" or "U-lengkap".');

/** A `kuliah-coding` course code named in a cell (checked against that corpus by the cross-programme check). */
export const dwKuliahCourseCodeSchema = z
  .string()
  .regex(/^KUL-[UIK]-\d{3}$/, 'must be a course code such as "KUL-U-101"');

/** A `PRO` module code, the only modules the recognition table covers. */
export const dwProModuleCodeSchema = z
  .string()
  .regex(/^DW-PRO-M[1-9]\d*$/, 'must be a PRO module code such as "DW-PRO-M4"');

export const dwKuliahProfileSchema = z
  .object({
    id: dwKuliahProfileIdSchema,
    coursesText: nonEmptyString.describe('The "Mata kuliah yang diselesaikan" cell, verbatim.'),
    courses: z
      .array(dwKuliahCourseCodeSchema)
      .min(1)
      .describe("Every course code named in coursesText, in order of appearance."),
    note: nonEmptyString.describe('The "Catatan" cell, verbatim.'),
  })
  .strict();

export const dwKuliahModuleStatusSchema = z
  .object({
    code: dwProModuleCodeSchema,
    hours: dwHoursSchema.describe('The "Jam" cell; equals the module hours in module-plan.json.'),
    basis: nonEmptyString.describe('The "Dasar di kuliah-coding" cell, verbatim.'),
    basisCourses: z
      .array(dwKuliahCourseCodeSchema)
      .describe("Every course code named in basis, in order of appearance (may be empty)."),
    statuses: z
      .record(dwKuliahProfileIdSchema, dwRecognitionStatusSchema)
      .describe("The status per profile id, one entry for every profile."),
  })
  .strict();

export const dwKuliahHourImpactSchema = z
  .object({
    profile: dwKuliahProfileIdSchema,
    lewati: z.number().int().nonnegative().describe('The "L" column: number of L modules.'),
    padatkan: z.number().int().nonnegative().describe('The "P" column: number of P modules.'),
    wajib: z.number().int().nonnegative().describe('The "W" column: number of W modules.'),
    moduleHours: z.number().int().nonnegative().describe('The "Jam modul `PRO`" column.'),
    totalHours: z.number().int().positive().describe('The "Jam dengan `DW-FND-M1`" column.'),
    reductionHours: z
      .number()
      .int()
      .nonnegative()
      .describe('The number of hours in the "Selisih terhadap 136 jam" column.'),
  })
  .strict();

export const dwKuliahBridgeFileSchema = z
  .object({
    ...dwProvenanceShape,
    baselineHours: dwHoursSchema.describe(
      "The track PRO hours when every module is done in full (the figure the impact table is measured against).",
    ),
    profiles: z.array(dwKuliahProfileSchema).min(1),
    modules: z.array(dwKuliahModuleStatusSchema).min(1),
    hourImpact: z.array(dwKuliahHourImpactSchema).min(1),
    mandatoryModules: z
      .array(z.string().regex(/^DW-(FND|PRO)-M[1-9]\d*$/))
      .min(1)
      .describe("The modules every participant does in full, as named by the syllabus."),
  })
  .strict()
  .refine(
    (file) => new Set(file.profiles.map((profile) => profile.id)).size === file.profiles.length,
    {
      path: ["profiles"],
      message: "profile ids must be unique",
    },
  )
  .refine(
    (file) => new Set(file.modules.map((module) => module.code)).size === file.modules.length,
    {
      path: ["modules"],
      message: "module codes must be unique",
    },
  )
  .describe("The full contents of `data/dewasa-coding/kuliah-bridge.json`.");

export type DwKuliahBridgeFile = z.infer<typeof dwKuliahBridgeFileSchema>;
