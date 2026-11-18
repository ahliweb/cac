/**
 * Schema for `data/sma-coding/structure.json`: the programme structure
 * (silabus bagian 2). `rows` carries the table verbatim; the structured
 * fields are the same facts in machine-readable form, and the fidelity
 * check proves the two agree with the source document.
 */

import { z } from "zod";
import { nonEmptyString } from "./common";
import {
  smaClassSchema,
  smaPhaseSchema,
  smaProvenanceShape,
  smaSemesterSchema,
} from "./sma-common";

export const SMA_STRUCTURE_ROW_IDS = [
  "kelas-fase",
  "semester",
  "minggu-per-semester",
  "alokasi-jp",
  "hubungan-jalur",
  "pola-semester",
  "nilai-dasar",
] as const;

export const smaStructureRowSchema = z
  .object({
    id: z.enum(SMA_STRUCTURE_ROW_IDS),
    item: nonEmptyString.describe('The "Butir" cell, verbatim.'),
    value: nonEmptyString.describe('The "Nilai" cell, verbatim.'),
    status: nonEmptyString.describe('The "Status" cell, verbatim.'),
  })
  .strict();

const positiveInt = z.number().int().positive();

export const smaStructureFileSchema = z
  .object({
    ...smaProvenanceShape,
    rows: z.array(smaStructureRowSchema).min(1),
    classPhases: z
      .array(z.object({ kelas: smaClassSchema, phase: smaPhaseSchema }).strict())
      .min(1),
    semesters: z
      .array(
        z
          .object({ code: smaSemesterSchema, kelas: smaClassSchema, phase: smaPhaseSchema })
          .strict(),
      )
      .min(1),
    weeksPerSemester: z.object({ teaching: positiveInt, reserve: positiveInt }).strict(),
    load: z
      .object({
        sessionsPerWeek: positiveInt,
        jpPerSession: positiveInt,
        minutesPerJp: positiveInt,
      })
      .strict(),
    semesterPattern: z
      .object({
        materiFromWeek: positiveInt,
        materiToWeek: positiveInt,
        miniProjectWeek: positiveInt,
        assessmentWeek: positiveInt,
      })
      .strict(),
  })
  .strict()
  .superRefine((file, ctx) => {
    const ids = file.rows.map((row) => row.id);
    if (new Set(ids).size !== ids.length) {
      ctx.addIssue({ code: "custom", path: ["rows"], message: "row ids must be unique" });
    }
    const phaseByClass = new Map(file.classPhases.map((entry) => [entry.kelas, entry.phase]));
    file.semesters.forEach((semester, index) => {
      if (!semester.code.startsWith(semester.kelas)) {
        ctx.addIssue({
          code: "custom",
          path: ["semesters", index, "code"],
          message: `semester code "${semester.code}" must start with its kelas "${semester.kelas}"`,
        });
      }
      if (phaseByClass.get(semester.kelas) !== semester.phase) {
        ctx.addIssue({
          code: "custom",
          path: ["semesters", index, "phase"],
          message: `phase must equal the phase of kelas ${semester.kelas} in classPhases`,
        });
      }
    });
  })
  .describe("The full contents of `data/sma-coding/structure.json`.");

export type SmaStructureFile = z.infer<typeof smaStructureFileSchema>;
