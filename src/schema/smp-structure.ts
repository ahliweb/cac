/**
 * Schema for `data/smp-coding/structure.json`: the programme structure
 * (silabus bagian 2). `rows` carries the table verbatim; the structured
 * fields are the same facts in machine-readable form, and the fidelity
 * check proves the two agree with the source document.
 */

import { z } from "zod";
import { nonEmptyString } from "./common";
import { SMP_PHASE, smpClassSchema, smpProvenanceShape, smpSemesterSchema } from "./smp-common";

export const SMP_STRUCTURE_ROW_IDS = [
  "kelas-fase",
  "status-mapel",
  "semester",
  "alokasi-jp",
  "lama-jp",
  "minggu-per-semester",
  "pola-semester",
  "total",
  "jalur",
  "bahasa-teks",
] as const;

export const smpStructureRowSchema = z
  .object({
    id: z.enum(SMP_STRUCTURE_ROW_IDS),
    item: nonEmptyString.describe('The "Butir" cell, verbatim.'),
    value: nonEmptyString.describe('The "Nilai" cell, verbatim.'),
    status: nonEmptyString.describe('The "Status" cell, verbatim.'),
  })
  .strict();

const positiveInt = z.number().int().positive();
const phaseSchema = z.literal(SMP_PHASE).describe('The curriculum phase: "D".');

export const smpStructureFileSchema = z
  .object({
    ...smpProvenanceShape,
    rows: z.array(smpStructureRowSchema).min(1),
    classPhases: z.array(z.object({ kelas: smpClassSchema, phase: phaseSchema }).strict()).min(1),
    semesters: z
      .array(
        z.object({ code: smpSemesterSchema, kelas: smpClassSchema, phase: phaseSchema }).strict(),
      )
      .min(1),
    weeksPerSemester: z.object({ teaching: positiveInt, reserve: positiveInt }).strict(),
    load: z.object({ jpPerWeek: positiveInt, minutesPerJp: positiveInt }).strict(),
    semesterPattern: z
      .object({
        materiFromWeek: positiveInt,
        materiToWeek: positiveInt,
        miniProjectWeek: positiveInt,
        assessmentWeek: positiveInt,
      })
      .strict(),
    totals: z.object({ semesters: positiveInt, weeks: positiveInt, jp: positiveInt }).strict(),
    textLanguage: z
      .object({
        name: nonEmptyString.describe("The first text programming language (Python)."),
        fromSemester: smpSemesterSchema,
        outsideCp: z
          .boolean()
          .describe("`true` when the row states it goes beyond the CP wording (pengayaan)."),
      })
      .strict(),
  })
  .strict()
  .superRefine((file, ctx) => {
    const ids = file.rows.map((row) => row.id);
    if (new Set(ids).size !== ids.length) {
      ctx.addIssue({ code: "custom", path: ["rows"], message: "row ids must be unique" });
    }
    const classes = new Set(file.classPhases.map((entry) => entry.kelas));
    file.semesters.forEach((semester, index) => {
      if (!semester.code.startsWith(`SMP${semester.kelas}-`)) {
        ctx.addIssue({
          code: "custom",
          path: ["semesters", index, "code"],
          message: `semester code "${semester.code}" must start with its kelas "SMP${semester.kelas}-"`,
        });
      }
      if (!classes.has(semester.kelas)) {
        ctx.addIssue({
          code: "custom",
          path: ["semesters", index, "kelas"],
          message: `kelas ${semester.kelas} is not in classPhases`,
        });
      }
    });
    if (new Set(file.semesters.map((semester) => semester.code)).size !== file.semesters.length) {
      ctx.addIssue({
        code: "custom",
        path: ["semesters"],
        message: "semester codes must be unique",
      });
    }
  })
  .describe("The full contents of `data/smp-coding/structure.json`.");

export type SmpStructureFile = z.infer<typeof smpStructureFileSchema>;
