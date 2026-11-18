/**
 * Shared primitives for the `kuliah-coding` programme's corpus
 * (`data/kuliah-coding/*.json`, transcribed from
 * `docs/programs/kuliah-coding/silabus.md`; ADR-0006, ADR-0008). The
 * `kul-*` schema modules describe shape and constraints only and never
 * import from `src/domain/`.
 */

import { z } from "zod";
import { nonEmptyString } from "./common";

/** The programme id of the university coding syllabus in `data/programs.json`. */
export const KUL_PROGRAM_ID = "kuliah-coding";

/** The three learning tracks (jalur): U (umum), I (informatika), K (kompetitif). */
export const KUL_TRACK_IDS = ["U", "I", "K"] as const;
export const kulTrackIdSchema = z
  .enum(KUL_TRACK_IDS)
  .describe('A learning track id: "U" (umum), "I" (informatika) or "K" (kompetitif).');
export type KulTrackId = z.infer<typeof kulTrackIdSchema>;

/** A course code `KUL-<U|I|K>-<nnn>`, e.g. "KUL-U-101". */
export const kulCourseCodeSchema = z
  .string()
  .regex(/^KUL-[UIK]-\d{3}$/, 'must be a course code such as "KUL-U-101"')
  .describe('A course code such as "KUL-U-101".');

/** A course learning outcome (CPMK) code `<course code>-C<n>`, e.g. "KUL-U-101-C1". */
export const kulCpmkCodeSchema = z
  .string()
  .regex(/^KUL-[UIK]-\d{3}-C[1-9]\d*$/, 'must be a CPMK code such as "KUL-U-101-C1"')
  .describe('A CPMK code such as "KUL-U-101-C1".');

/** The number of semesters of the bachelor programme the syllabus is designed for (Pasal 18 ayat (1)). */
export const KUL_SEMESTER_COUNT = 8;

/** A semester code `S1`..`S8`. */
export const kulSemesterSchema = z
  .string()
  .regex(/^S[1-8]$/, 'must be a semester code "S1".."S8"')
  .describe('A semester code "S1".."S8".');

/**
 * The 17 knowledge areas (KA) of CS2023, by the official short code and the
 * name exactly as the syllabus (bagian 4.2) writes it.
 */
export const KUL_KNOWLEDGE_AREA_NAMES = {
  AL: "Algorithmic Foundations",
  AR: "Architecture and Organization",
  AI: "Artificial Intelligence",
  DM: "Data Management",
  FPL: "Foundations of Programming Languages",
  GIT: "Graphics and Interactive Techniques",
  HCI: "Human-Computer Interaction",
  MSF: "Mathematical and Statistical Foundations",
  NC: "Networking and Communication",
  OS: "Operating Systems",
  PDC: "Parallel and Distributed Computing",
  SEC: "Security",
  SEP: "Society, Ethics, and the Profession",
  SDF: "Software Development Fundamentals",
  SE: "Software Engineering",
  SPD: "Specialized Platform Development",
  SF: "Systems Fundamentals",
} as const;
export const KUL_KNOWLEDGE_AREA_CODES = Object.keys(KUL_KNOWLEDGE_AREA_NAMES) as [
  keyof typeof KUL_KNOWLEDGE_AREA_NAMES,
  ...(keyof typeof KUL_KNOWLEDGE_AREA_NAMES)[],
];
export const kulKnowledgeAreaCodeSchema = z
  .enum(KUL_KNOWLEDGE_AREA_CODES)
  .describe('A CS2023 knowledge area short code such as "SDF" or "AL".');
export type KulKnowledgeAreaCode = z.infer<typeof kulKnowledgeAreaCodeSchema>;

/** A reference to a section of `docs/programs/kuliah-coding/silabus.md`, e.g. "bagian 3.2". */
export const kulSourceSectionSchema = z
  .string()
  .regex(/^bagian \d+(\.\d+)?$/, 'must be a section reference such as "bagian 3.2"')
  .describe('A section of the university syllabus, e.g. "bagian 3.2".');

/** The provenance fields every corpus file carries (ADR-0005, per programme). */
export const kulProvenanceShape = {
  syllabusVersion: nonEmptyString.describe(
    "The source syllabus's own version, e.g. \"1.0.0\"; equals the programme registry's value.",
  ),
  syllabusDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'must be an ISO date "YYYY-MM-DD"')
    .describe("The source syllabus's own date; equals the programme registry's value."),
  sourceSection: kulSourceSectionSchema,
};

/** Credit-semester units (SKS) of one course; a whole number. */
export const kulSksSchema = z
  .number()
  .int()
  .min(1)
  .max(12)
  .describe("Credits (SKS), a whole number.");
