/**
 * Shared primitives for the `sma-coding` programme's corpus
 * (`data/sma-coding/*.json`, transcribed from
 * `docs/programs/sma-coding/silabus.md`; ADR-0006). The `sma-*` schema
 * modules describe shape and constraints only and never import from
 * `src/domain/`.
 */

import { z } from "zod";
import { nonEmptyString } from "./common";

/** The programme id of the SMA coding syllabus in `data/programs.json`. */
export const SMA_CODING_PROGRAM_ID = "sma-coding";

/** Curriculum phases the syllabus covers: E (kelas X) and F (kelas XI-XII). */
export const SMA_PHASES = ["E", "F"] as const;
export const smaPhaseSchema = z.enum(SMA_PHASES).describe('A curriculum phase: "E" or "F".');
export type SmaPhase = z.infer<typeof smaPhaseSchema>;

/** The four CP elements (Capaian Pembelajaran) of Informatika, by short code. */
export const CP_ELEMENT_NAMES = {
  BK: "Berpikir Komputasional",
  LD: "Literasi Digital",
  AD: "Analisis Data",
  AP: "Algoritma dan Pemrograman",
} as const;
export const CP_ELEMENT_IDS = ["BK", "LD", "AD", "AP"] as const;
export const cpElementIdSchema = z
  .enum(CP_ELEMENT_IDS)
  .describe('A CP element code: "BK", "LD", "AD" or "AP".');
export type CpElementId = z.infer<typeof cpElementIdSchema>;

/** School classes, in order. */
export const SMA_CLASSES = ["X", "XI", "XII"] as const;
export const smaClassSchema = z.enum(SMA_CLASSES).describe('A school class: "X", "XI" or "XII".');

/** A learning track ID: one upper-case letter, e.g. "A". */
export const smaTrackIdSchema = z
  .string()
  .regex(/^[A-Z]$/, 'must be a single upper-case letter such as "A"')
  .describe('A learning track ID such as "A" or "B".');

/** A semester code, e.g. "X1", "XI2", "XII1". */
export const smaSemesterSchema = z
  .string()
  .regex(/^(X|XI|XII)[12]$/, 'must be a semester code such as "X1", "XI2" or "XII1"')
  .describe('A semester code such as "X1".');

/** The number of teaching weeks M1..M14 in one semester. */
export const SMA_WEEKS_PER_SEMESTER = 14;

/**
 * The block id of the shared foundation block (silabus bagian 3.0): a
 * class taken by every pupil before choosing a track, so its week codes
 * carry `FND` where a track letter would be (`FND-X1-M1`).
 */
export const SMA_FOUNDATION_BLOCK_ID = "FND";

/** The number of weeks of the foundation block `FND-X1-M1..M7` (silabus v1.1). */
export const SMA_FOUNDATION_WEEKS = 7;

/** A week code `<track>-<semester>-M<n>`, e.g. "A-X1-M3", or a foundation week code, e.g. "FND-X1-M3". */
export const smaWeekCodeSchema = z
  .string()
  .regex(
    /^(?:[A-Z]|FND)-(X|XI|XII)[12]-M([1-9]|1[0-4])$/,
    'must be a week code such as "A-X1-M3" or "FND-X1-M3" (track or FND, semester, week 1-14)',
  )
  .describe('A week code such as "A-X1-M3" or "FND-X1-M3".');

/** A CP item code, e.g. "E-BK-a" (phase, element, item letter). */
export const cpCodeSchema = z
  .string()
  .regex(/^[EF]-(BK|LD|AD|AP)-[a-z]$/, 'must be a CP item code such as "E-BK-a"')
  .describe('A CP item code such as "E-BK-a".');

/** A reference to a section of `docs/programs/sma-coding/silabus.md`, e.g. "bagian 3". */
export const smaSourceSectionSchema = z
  .string()
  .regex(/^bagian \d+(\.\d+)?$/, 'must be a section reference such as "bagian 1.3"')
  .describe('A section of the SMA syllabus, e.g. "bagian 3".');

/** The provenance fields every corpus file carries (ADR-0005, per programme). */
export const smaProvenanceShape = {
  syllabusVersion: nonEmptyString.describe(
    "The source syllabus's own version, e.g. \"1.1.0\"; equals the programme registry's value.",
  ),
  syllabusDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'must be an ISO date "YYYY-MM-DD"')
    .describe("The source syllabus's own date; equals the programme registry's value."),
  sourceSection: smaSourceSectionSchema,
};
