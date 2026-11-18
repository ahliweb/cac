/**
 * Schema for `data/sma-coding/weeks.json`: the weekly plan of every
 * approved track (silabus bagian 3), one record per track-semester-week.
 */

import { z } from "zod";
import { nonEmptyString } from "./common";
import {
  SMA_WEEKS_PER_SEMESTER,
  smaClassSchema,
  smaPhaseSchema,
  smaProvenanceShape,
  smaSemesterSchema,
  smaTrackIdSchema,
  smaWeekCodeSchema,
} from "./sma-common";

export const smaWeekSchema = z
  .object({
    id: smaWeekCodeSchema,
    track: smaTrackIdSchema,
    kelas: smaClassSchema,
    semester: smaSemesterSchema,
    semesterCode: z
      .string()
      .regex(/^[A-Z]-(X|XI|XII)[12]$/, 'must be "<track>-<semester>", e.g. "A-X1"'),
    phase: smaPhaseSchema,
    week: z.number().int().min(1).max(SMA_WEEKS_PER_SEMESTER),
    topic: nonEmptyString.describe('The "Topik" cell, verbatim.'),
    objective: nonEmptyString.describe('The "Tujuan" cell, verbatim.'),
    output: nonEmptyString.describe('The "Keluaran" cell, verbatim.'),
    exercise: nonEmptyString.describe('The "Latihan" cell, verbatim.'),
  })
  .strict()
  .superRefine((week, ctx) => {
    const expectedSemesterCode = `${week.track}-${week.semester}`;
    if (week.semesterCode !== expectedSemesterCode) {
      ctx.addIssue({
        code: "custom",
        path: ["semesterCode"],
        message: `must be "${expectedSemesterCode}" (track-semester)`,
      });
    }
    const expectedId = `${expectedSemesterCode}-M${week.week}`;
    if (week.id !== expectedId) {
      ctx.addIssue({ code: "custom", path: ["id"], message: `must be "${expectedId}"` });
    }
    if (!week.semester.startsWith(week.kelas) || week.semester.length !== week.kelas.length + 1) {
      ctx.addIssue({
        code: "custom",
        path: ["kelas"],
        message: `semester "${week.semester}" does not belong to kelas ${week.kelas}`,
      });
    }
  });

export const smaWeeksFileSchema = z
  .object({
    ...smaProvenanceShape,
    weeks: z.array(smaWeekSchema).min(1),
  })
  .strict()
  .refine((file) => new Set(file.weeks.map((week) => week.id)).size === file.weeks.length, {
    path: ["weeks"],
    message: "week ids must be unique",
  })
  .describe("The full contents of `data/sma-coding/weeks.json`.");

export type SmaWeek = z.infer<typeof smaWeekSchema>;
export type SmaWeeksFile = z.infer<typeof smaWeeksFileSchema>;
