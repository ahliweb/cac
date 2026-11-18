/**
 * Schema for `data/tk-coding/structure.json`: the time structure of the
 * programme (silabus bagian 3.1) and the session pattern (bagian 3.2).
 * `rows` carries the 3.1 table verbatim; the structured fields are the same
 * facts in machine-readable form, and the fidelity check proves the two
 * agree with the source document.
 */

import { z } from "zod";
import { nonEmptyString } from "./common";
import { tkGroupSchema, tkProvenanceShape, tkSemesterSchema, tkWeekCodeSchema } from "./tk-common";

export const TK_STRUCTURE_ROW_IDS = [
  "kelompok",
  "tahun-ajaran",
  "minggu-per-semester",
  "sesi-inti",
  "integrasi-harian",
  "waktu-layar",
  "kelompok-anak",
] as const;

export const tkStructureRowSchema = z
  .object({
    id: z.enum(TK_STRUCTURE_ROW_IDS),
    item: nonEmptyString.describe('The "Butir" cell, verbatim.'),
    value: nonEmptyString.describe('The "Nilai" cell, verbatim.'),
    status: nonEmptyString.describe('The "Status" cell, verbatim.'),
  })
  .strict();

const positiveInt = z.number().int().positive();

export const tkSessionStepSchema = z
  .object({
    order: positiveInt,
    name: nonEmptyString.describe('The bold step name without the minutes, e.g. "Pembuka".'),
    minutesText: nonEmptyString.describe('The minutes as printed, e.g. "3-5 menit".'),
    description: nonEmptyString.describe("The step's description, verbatim."),
  })
  .strict();

export const tkStructureFileSchema = z
  .object({
    ...tkProvenanceShape,
    rows: z.array(tkStructureRowSchema).min(1),
    groups: z
      .array(
        z
          .object({
            id: tkGroupSchema,
            ageFrom: positiveInt,
            ageTo: positiveInt,
            sessionMinutes: positiveInt,
          })
          .strict()
          .refine((group) => group.ageFrom <= group.ageTo, {
            path: ["ageTo"],
            message: "must not be below ageFrom",
          }),
      )
      .min(1),
    semesters: z.array(tkSemesterSchema).min(1),
    weeksPerSemester: z
      .object({
        teaching: positiveInt,
        themeWeeksTo: positiveInt,
        bigGameWeek: positiveInt,
        reflectionWeek: positiveInt,
      })
      .strict(),
    totalWeeks: positiveInt,
    sessionsPerWeek: positiveInt,
    dailyIntegrationMinutes: z
      .object({ min: positiveInt, max: positiveInt })
      .strict()
      .refine((range) => range.min <= range.max, {
        path: ["max"],
        message: "must not be below min",
      }),
    screen: z
      .object({
        defaultMinutes: z.number().int().nonnegative(),
        optionalWeeks: z.array(tkWeekCodeSchema),
        maxOptionalMinutes: positiveInt,
      })
      .strict(),
    sessionPattern: z.array(tkSessionStepSchema).min(1),
  })
  .strict()
  .superRefine((file, ctx) => {
    const ids = file.rows.map((row) => row.id);
    if (new Set(ids).size !== ids.length) {
      ctx.addIssue({ code: "custom", path: ["rows"], message: "row ids must be unique" });
    }
    const groupIds = file.groups.map((group) => group.id);
    if (new Set(groupIds).size !== groupIds.length) {
      ctx.addIssue({ code: "custom", path: ["groups"], message: "group ids must be unique" });
    }
    if (new Set(file.semesters).size !== file.semesters.length) {
      ctx.addIssue({ code: "custom", path: ["semesters"], message: "semesters must be unique" });
    }
    const { teaching, themeWeeksTo, bigGameWeek, reflectionWeek } = file.weeksPerSemester;
    if (
      !(themeWeeksTo < bigGameWeek && bigGameWeek < reflectionWeek && reflectionWeek <= teaching)
    ) {
      ctx.addIssue({
        code: "custom",
        path: ["weeksPerSemester"],
        message: "must satisfy themeWeeksTo < bigGameWeek < reflectionWeek <= teaching",
      });
    }
    file.sessionPattern.forEach((step, index) => {
      if (step.order !== index + 1) {
        ctx.addIssue({
          code: "custom",
          path: ["sessionPattern", index, "order"],
          message: `must be ${index + 1} (steps are numbered 1..n in order)`,
        });
      }
    });
  })
  .describe("The full contents of `data/tk-coding/structure.json`.");

export type TkStructureFile = z.infer<typeof tkStructureFileSchema>;
