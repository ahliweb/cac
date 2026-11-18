/**
 * Shared primitives for the `tk-coding` programme's corpus
 * (`data/tk-coding/*.json`, transcribed from
 * `docs/programs/tk-coding/silabus.md`; ADR-0006, ADR-0008). The `tk-*`
 * schema modules describe shape and constraints only and never import from
 * `src/domain/`.
 */

import { z } from "zod";
import { nonEmptyString } from "./common";

/** The programme id of the TK/PAUD coding syllabus in `data/programs.json`. */
export const TK_CODING_PROGRAM_ID = "tk-coding";

/** The two age groups: A = TK A, B = TK B. */
export const TK_GROUPS = ["A", "B"] as const;
export const tkGroupSchema = z.enum(TK_GROUPS).describe('An age group: "A" (TK A) or "B" (TK B).');
export type TkGroup = z.infer<typeof tkGroupSchema>;

/** The four semesters of the programme, in teaching order. */
export const TK_SEMESTERS = ["A1", "A2", "B1", "B2"] as const;
export const tkSemesterSchema = z
  .enum(TK_SEMESTERS)
  .describe('A semester code: "A1", "A2", "B1" or "B2".');

/** The number of weeks M1..M12 in one semester (silabus bagian 3.1, keputusan Q4). */
export const TK_WEEKS_PER_SEMESTER = 12;

/** A week code `TK-<group><semester>-M<n>`, e.g. "TK-A1-M3". */
export const tkWeekCodeSchema = z
  .string()
  .regex(
    /^TK-[AB][12]-M([1-9]|1[0-2])$/,
    'must be a week code such as "TK-A1-M3" (group, semester, week 1-12)',
  )
  .describe('A week code such as "TK-A1-M3".');

/** The two CP elements the syllabus draws on: DL (Dasar-dasar Literasi ...) and JD (Jati Diri). */
export const TK_CP_ELEMENT_IDS = ["DL", "JD"] as const;
export const tkCpElementIdSchema = z
  .enum(TK_CP_ELEMENT_IDS)
  .describe('A CP element code: "DL" or "JD".');

/** A CP item code `FF-<element>-<letter>`, e.g. "FF-DL-b" (Fase Fondasi). */
export const tkCpCodeSchema = z
  .string()
  .regex(/^FF-(DL|JD)-[a-z]$/, 'must be a CP item code such as "FF-DL-b"')
  .describe('A CP item code such as "FF-DL-b".');

/**
 * The marker every CP-linked file carries. The syllabus maps its concepts
 * and weeks to the CP only as the author's *interpreted overlap* (irisan
 * penafsiran, bagian 4): the CP never mentions coding or computational
 * thinking, so a mapping is never a claim that a CP item is fulfilled.
 * Both fields are literals so the data cannot say otherwise.
 */
export const tkCpRelationShape = {
  cpRelation: z
    .literal("irisan-penafsiran")
    .describe("The CP links are the author's interpreted overlap, not an official mapping."),
  meetsCp: z
    .literal(false)
    .describe("This programme never counts as fulfilling a CP item (silabus bagian 4)."),
};

/** A reference to a section of `docs/programs/tk-coding/silabus.md`, e.g. "bagian 3.3". */
export const tkSourceSectionSchema = z
  .string()
  .regex(/^bagian \d+(\.\d+)?$/, 'must be a section reference such as "bagian 1.2"')
  .describe('A section of the TK syllabus, e.g. "bagian 3.3".');

/** The provenance fields every corpus file carries (ADR-0005, per programme). */
export const tkProvenanceShape = {
  syllabusVersion: nonEmptyString.describe(
    "The source syllabus's own version, e.g. \"1.0.0\"; equals the programme registry's value.",
  ),
  syllabusDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'must be an ISO date "YYYY-MM-DD"')
    .describe("The source syllabus's own date; equals the programme registry's value."),
  sourceSection: tkSourceSectionSchema,
};
