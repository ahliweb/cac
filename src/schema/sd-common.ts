/**
 * Shared primitives for the `sd-coding` programme's corpus
 * (`data/sd-coding/*.json`, transcribed from
 * `docs/programs/sd-coding/silabus.md`; ADR-0006, ADR-0008). The `sd-*`
 * schema modules describe shape and constraints only and never import from
 * `src/domain/`.
 *
 * The SD syllabus has one curriculum phase (Fase C, kelas 5-6) that carries
 * the CP of the optional Koding dan Kecerdasan Artifisial (KKA) subject, and
 * four more classes (1-4) that are optional introductions *outside* the CP.
 * The corpus keeps the two apart: a CP item (`C-BK-a`) can only be fulfilled
 * by a kelas 5-6 week; a kelas 1-4 week only introduces an element
 * (`P-BK`), which is never counted as covering a CP item.
 */

import { z } from "zod";
import { nonEmptyString } from "./common";

/** The programme id of the SD coding syllabus in `data/programs.json`. */
export const SD_CODING_PROGRAM_ID = "sd-coding";

/** The one curriculum phase the CP covers (kelas V-VI). */
export const SD_CP_PHASE = "C";

/** The four CP elements (Capaian Pembelajaran) of KKA Fase C, by short code. */
export const SD_CP_ELEMENT_NAMES = {
  BK: "Berpikir Komputasional",
  LD: "Literasi Digital",
  LE: "Literasi dan Etika Kecerdasan Artifisial",
  PP: "Pemanfaatan dan Pengembangan Kecerdasan Artifisial",
} as const;
export const SD_CP_ELEMENT_IDS = ["BK", "LD", "LE", "PP"] as const;
export const sdElementIdSchema = z
  .enum(SD_CP_ELEMENT_IDS)
  .describe('An element code: "BK", "LD", "LE" or "PP".');
export type SdElementId = z.infer<typeof sdElementIdSchema>;

/** School classes 1..6, in order. */
export const SD_CLASSES = [1, 2, 3, 4, 5, 6] as const;
export const sdClassSchema = z
  .number()
  .int()
  .min(1)
  .max(6)
  .describe("A school class (kelas), 1 to 6.");

/** The semesters of one class. */
export const SD_SEMESTERS = [1, 2] as const;
export const sdSemesterSchema = z
  .number()
  .int()
  .min(1)
  .max(2)
  .describe("A semester of a class: 1 or 2.");

/** The number of teaching weeks M1..M14 in one semester. */
export const SD_WEEKS_PER_SEMESTER = 14;

/** Minutes of one JP in SD (Permendikdasmen 13/2025, Tabel 1-5; silabus bagian 1.1). */
export const SD_MINUTES_PER_JP = 35;

/** The classes whose weeks fulfil the CP (Fase C); kelas 1-4 are outside it. */
export const SD_CP_CLASSES = [5, 6] as const;

/** The three stages of the programme (silabus bagian 2). */
export const SD_STAGE_IDS = [1, 2, 3] as const;
export const sdStageIdSchema = z
  .number()
  .int()
  .min(1)
  .max(3)
  .describe("A stage: 1 (kelas 1-3), 2 (kelas 4) or 3 (kelas 5-6, Fase C).");
export type SdStageId = z.infer<typeof sdStageIdSchema>;

/** The stage that fulfils the CP; every other stage is an introduction outside it. */
export const SD_CP_STAGE: SdStageId = 3;

/** A week code `SD<kelas>-<semester>-M<n>`, e.g. "SD5-1-M3". */
export const sdWeekCodeSchema = z
  .string()
  .regex(
    /^SD[1-6]-[12]-M([1-9]|1[0-4])$/,
    'must be a week code such as "SD5-1-M3" (kelas 1-6, semester 1-2, week 1-14)',
  )
  .describe('A week code such as "SD5-1-M3".');

/** A week code of kelas 5 or 6, the only weeks that can fulfil a CP item. */
export const sdCpWeekCodeSchema = z
  .string()
  .regex(
    /^SD[56]-[12]-M([1-9]|1[0-4])$/,
    'must be a kelas 5-6 week code such as "SD5-1-M3" (only kelas 5-6 fulfil the CP)',
  )
  .describe('A kelas 5-6 week code such as "SD5-1-M3".');

/** A CP item code, e.g. "C-BK-a" (Fase C, element, item letter). */
export const sdCpCodeSchema = z
  .string()
  .regex(/^C-(BK|LD|LE|PP)-[a-z]$/, 'must be a CP item code such as "C-BK-a"')
  .describe('A CP item code such as "C-BK-a".');

/** An introduction code `P-<element>`: preparation for an element, never CP coverage. */
export const sdIntroCodeSchema = z
  .string()
  .regex(/^P-(BK|LD|LE|PP)$/, 'must be an introduction code such as "P-BK"')
  .describe('An introduction code such as "P-BK" (not CP coverage).');

/** A reference to a section of `docs/programs/sd-coding/silabus.md`, e.g. "bagian 1.3". */
export const sdSourceSectionSchema = z
  .string()
  .regex(/^bagian \d+(\.\d+)?$/, 'must be a section reference such as "bagian 1.3"')
  .describe('A section of the SD syllabus, e.g. "bagian 5".');

/** The provenance fields every corpus file carries (ADR-0005, per programme). */
export const sdProvenanceShape = {
  syllabusVersion: nonEmptyString.describe(
    "The source syllabus's own version, e.g. \"1.0.0\"; equals the programme registry's value.",
  ),
  syllabusDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'must be an ISO date "YYYY-MM-DD"')
    .describe("The source syllabus's own date; equals the programme registry's value."),
  sourceSection: sdSourceSectionSchema,
};
