/**
 * Shared primitives for the `dewasa-coding` programme's corpus
 * (`data/dewasa-coding/*.json`, transcribed from
 * `docs/programs/dewasa-coding/silabus.md`; ADR-0006, ADR-0008). The
 * `dw-*` schema modules describe shape and constraints only and never
 * import from `src/domain/`.
 *
 * The programme is hour-based (modules with hours, not semesters or
 * weeks): four persona tracks plus one module shared by all of them.
 */

import { z } from "zod";
import { nonEmptyString } from "./common";

/** The programme id of the adult coding syllabus in `data/programs.json`. */
export const DEWASA_CODING_PROGRAM_ID = "dewasa-coding";

/** The four persona tracks: Pekerja, Profesional, Personal, Pebisnis/UMKM. */
export const DW_TRACK_IDS = ["PKJ", "PRO", "PRS", "BIS"] as const;
export const dwTrackIdSchema = z
  .enum(DW_TRACK_IDS)
  .describe('A persona track code: "PKJ", "PRO", "PRS" or "BIS".');
export type DwTrackId = z.infer<typeof dwTrackIdSchema>;

/** The pseudo-track of modules every track takes first (`DW-FND-M<n>`). */
export const DW_SHARED_TRACK_ID = "FND";

/** The shared module every track lists as a prerequisite. */
export const DW_SHARED_MODULE_CODE = "DW-FND-M1";

/** A module code `DW-<track|FND>-M<n>`, e.g. "DW-PRO-M4" or "DW-FND-M1". */
export const dwModuleCodeSchema = z
  .string()
  .regex(
    /^DW-(FND|PKJ|PRO|PRS|BIS)-M[1-9]\d*$/,
    'must be a module code such as "DW-PRO-M4" or "DW-FND-M1"',
  )
  .describe('A module code such as "DW-PRO-M4".');

/** A SKKNI 282/2016 unit code, e.g. "J.620100.011.01" (number 001..047 and a version suffix). */
export const dwSkkniUnitCodeSchema = z
  .string()
  .regex(/^J\.620100\.\d{3}\.\d{2}$/, 'must be a unit code such as "J.620100.011.01"')
  .describe('A SKKNI unit code such as "J.620100.011.01".');

/** A reference to a section (or range) of `docs/programs/dewasa-coding/silabus.md`, e.g. "bagian 4-7". */
export const dwSourceSectionSchema = z
  .string()
  .regex(/^bagian \d+(\.\d+)?(-\d+(\.\d+)?)?$/, 'must be a section reference such as "bagian 1.3"')
  .describe('A section of the syllabus, e.g. "bagian 3" or "bagian 4-7".');

/** The provenance fields every corpus file carries (ADR-0005, per programme). */
export const dwProvenanceShape = {
  syllabusVersion: nonEmptyString.describe(
    "The source syllabus's own version, e.g. \"1.0.0\"; equals the programme registry's value.",
  ),
  syllabusDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'must be an ISO date "YYYY-MM-DD"')
    .describe("The source syllabus's own date; equals the programme registry's value."),
  sourceSection: dwSourceSectionSchema,
};

/** A positive whole number of learning hours (1 hour = 60 minutes of effective study). */
export const dwHoursSchema = z.number().int().positive().describe("Whole learning hours.");
