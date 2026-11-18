/**
 * Shared primitives for the `smp-coding` programme's corpus
 * (`data/smp-coding/*.json`, transcribed from
 * `docs/programs/smp-coding/silabus.md`; ADR-0006, ADR-0008). The `smp-*`
 * schema modules describe shape and constraints only and never import from
 * `src/domain/`, nor from another programme's schemas.
 */

import { z } from "zod";
import { nonEmptyString } from "./common";

/** The programme id of the SMP coding syllabus in `data/programs.json`. */
export const SMP_CODING_PROGRAM_ID = "smp-coding";

/** The one curriculum phase the syllabus covers: Fase D (kelas 7-9 SMP/MTs). */
export const SMP_PHASE = "D";

/** School classes, in order. */
export const SMP_CLASSES = ["7", "8", "9"] as const;
export const smpClassSchema = z.enum(SMP_CLASSES).describe('A school class: "7", "8" or "9".');
export type SmpClass = z.infer<typeof smpClassSchema>;

/** The number of teaching weeks M1..M14 in one semester. */
export const SMP_WEEKS_PER_SEMESTER = 14;

/** A semester code, e.g. "SMP7-1" (kelas 7, semester 1). */
export const smpSemesterSchema = z
  .string()
  .regex(/^SMP[789]-[12]$/, 'must be a semester code such as "SMP7-1" or "SMP9-2"')
  .describe('A semester code such as "SMP7-1".');

/** A week code `SMP<kelas>-<semester>-M<n>`, e.g. "SMP7-1-M3". */
export const smpWeekCodeSchema = z
  .string()
  .regex(
    /^SMP[789]-[12]-M([1-9]|1[0-4])$/,
    'must be a week code such as "SMP7-1-M3" (kelas 7-9, semester 1-2, week 1-14)',
  )
  .describe('A week code such as "SMP7-1-M3".');

/**
 * The two official CP texts the syllabus maps: the CP Informatika of Fase D
 * (`informatika`, item codes `D-BK-a`, `D-LD-a`...) and the CP Koding dan
 * Kecerdasan Artifisial of Fase D (`kka`, item codes `DK-BK-a`,
 * `DK-EA-a`...).
 */
export const SMP_CP_FAMILIES = ["informatika", "kka"] as const;
export const smpCpFamilySchema = z
  .enum(SMP_CP_FAMILIES)
  .describe('A CP text: "informatika" (D-* codes) or "kka" (DK-* codes).');
export type SmpCpFamily = z.infer<typeof smpCpFamilySchema>;

/** The CP elements of each text, by short code. */
export const SMP_CP_ELEMENT_NAMES = {
  BK: "Berpikir Komputasional",
  LD: "Literasi Digital",
  EA: "Literasi dan Etika Kecerdasan Artifisial",
  PA: "Pemanfaatan dan Pengembangan Kecerdasan Artifisial",
} as const;
export const SMP_CP_ELEMENT_IDS = ["BK", "LD", "EA", "PA"] as const;
export const smpCpElementIdSchema = z
  .enum(SMP_CP_ELEMENT_IDS)
  .describe('A CP element code: "BK", "LD", "EA" or "PA".');
export type SmpCpElementId = z.infer<typeof smpCpElementIdSchema>;

/** Which elements each CP text has (the Informatika CP has no EA and PA). */
export const SMP_CP_FAMILY_ELEMENTS: Record<SmpCpFamily, readonly SmpCpElementId[]> = {
  informatika: ["BK", "LD"],
  kka: ["BK", "LD", "EA", "PA"],
};

/** The code prefix of each CP text's items (`D-` or `DK-`). */
export const SMP_CP_FAMILY_PREFIX: Record<SmpCpFamily, string> = {
  informatika: "D-",
  kka: "DK-",
};

/** A CP item code: `D-BK-a` (Informatika) or `DK-EA-g` (Koding dan KA). */
export const smpCpCodeSchema = z
  .string()
  .regex(
    /^(?:D-(?:BK|LD)|DK-(?:BK|LD|EA|PA))-[a-z]$/,
    'must be a CP item code such as "D-BK-a" or "DK-EA-g"',
  )
  .describe('A CP item code such as "D-BK-a" or "DK-EA-g".');

/** A reference to a section of `docs/programs/smp-coding/silabus.md`, e.g. "bagian 3". */
export const smpSourceSectionSchema = z
  .string()
  .regex(/^bagian \d+(\.\d+)?$/, 'must be a section reference such as "bagian 1.3"')
  .describe('A section of the SMP syllabus, e.g. "bagian 3".');

/** The provenance fields every corpus file carries (ADR-0005, per programme). */
export const smpProvenanceShape = {
  syllabusVersion: nonEmptyString.describe(
    "The source syllabus's own version, e.g. \"1.0.0\"; equals the programme registry's value.",
  ),
  syllabusDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'must be an ISO date "YYYY-MM-DD"')
    .describe("The source syllabus's own date; equals the programme registry's value."),
  sourceSection: smpSourceSectionSchema,
};
