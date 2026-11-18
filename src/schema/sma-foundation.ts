/**
 * Schema for `data/sma-coding/foundation.json`: the shared foundation block
 * of kelas X (silabus bagian 3.0), one record per foundation week
 * `FND-X1-M1..M7`.
 *
 * The block is a class taken by every pupil before choosing a track, so it
 * is deliberately not a track: it has no entry in `tracks.json` and its
 * weeks stay out of `weeks.json`, whose records belong to one track-letter
 * each. Foundation weeks reuse the week-code shape with `FND` in place of
 * the track letter, so the CP mapping and the OSN bridge can reference them.
 */

import { z } from "zod";
import { nonEmptyString } from "./common";
import {
  SMA_FOUNDATION_BLOCK_ID,
  SMA_WEEKS_PER_SEMESTER,
  smaClassSchema,
  smaPhaseSchema,
  smaProvenanceShape,
  smaSemesterSchema,
  smaWeekCodeSchema,
} from "./sma-common";

export const smaFoundationWeekSchema = z
  .object({
    id: smaWeekCodeSchema,
    kelas: smaClassSchema,
    semester: smaSemesterSchema,
    semesterCode: z
      .string()
      .regex(/^FND-(X|XI|XII)[12]$/, 'must be "FND-<semester>", e.g. "FND-X1"'),
    phase: smaPhaseSchema,
    week: z.number().int().min(1).max(SMA_WEEKS_PER_SEMESTER),
    topic: nonEmptyString.describe('The "Topik" cell, verbatim.'),
    objective: nonEmptyString.describe('The "Tujuan" cell, verbatim.'),
    output: nonEmptyString.describe('The "Keluaran" cell, verbatim.'),
    exercise: nonEmptyString.describe('The "Latihan" cell, verbatim.'),
  })
  .strict()
  .superRefine((week, ctx) => {
    const expectedSemesterCode = `${SMA_FOUNDATION_BLOCK_ID}-${week.semester}`;
    if (week.semesterCode !== expectedSemesterCode) {
      ctx.addIssue({
        code: "custom",
        path: ["semesterCode"],
        message: `must be "${expectedSemesterCode}" (FND-semester)`,
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

export const smaFoundationFileSchema = z
  .object({
    ...smaProvenanceShape,
    weeks: z.array(smaFoundationWeekSchema).min(1),
  })
  .strict()
  .refine((file) => new Set(file.weeks.map((week) => week.id)).size === file.weeks.length, {
    path: ["weeks"],
    message: "foundation week ids must be unique",
  })
  .describe("The full contents of `data/sma-coding/foundation.json`.");

export type SmaFoundationWeek = z.infer<typeof smaFoundationWeekSchema>;
export type SmaFoundationFile = z.infer<typeof smaFoundationFileSchema>;
