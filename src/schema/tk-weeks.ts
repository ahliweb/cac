/**
 * Schema for `data/tk-coding/weeks.json`: the 48-week plan (silabus bagian
 * 3.3 to 3.6), one record per semester-week. The `cp` codes of a week are
 * the author's interpreted overlap with the CP (`cpRelation:
 * "irisan-penafsiran"`), never a claim of fulfilling it.
 */

import { z } from "zod";
import { nonEmptyString } from "./common";
import {
  TK_WEEKS_PER_SEMESTER,
  tkCpCodeSchema,
  tkCpRelationShape,
  tkGroupSchema,
  tkProvenanceShape,
  tkSemesterSchema,
  tkWeekCodeSchema,
} from "./tk-common";

export const tkWeekSchema = z
  .object({
    id: tkWeekCodeSchema,
    group: tkGroupSchema,
    semester: tkSemesterSchema,
    week: z.number().int().min(1).max(TK_WEEKS_PER_SEMESTER),
    theme: nonEmptyString.describe('The "Tema" cell, verbatim.'),
    objective: nonEmptyString.describe('The "Tujuan (anak mampu ...)" cell, verbatim.'),
    activity: nonEmptyString.describe('The "Kegiatan" cell, verbatim.'),
    observation: nonEmptyString.describe('The "Diamati guru" cell, verbatim.'),
    cp: z
      .array(tkCpCodeSchema)
      .min(1)
      .describe('The "CP" cell as codes, in order: interpreted overlap, not fulfilment.'),
  })
  .strict()
  .superRefine((week, ctx) => {
    if (!week.semester.startsWith(week.group)) {
      ctx.addIssue({
        code: "custom",
        path: ["semester"],
        message: `semester "${week.semester}" does not belong to group ${week.group}`,
      });
    }
    const expectedId = `TK-${week.semester}-M${week.week}`;
    if (week.id !== expectedId) {
      ctx.addIssue({ code: "custom", path: ["id"], message: `must be "${expectedId}"` });
    }
    if (new Set(week.cp).size !== week.cp.length) {
      ctx.addIssue({ code: "custom", path: ["cp"], message: "CP codes must be unique per week" });
    }
  });

export const tkWeeksFileSchema = z
  .object({
    ...tkProvenanceShape,
    ...tkCpRelationShape,
    weeks: z.array(tkWeekSchema).min(1),
  })
  .strict()
  .refine((file) => new Set(file.weeks.map((week) => week.id)).size === file.weeks.length, {
    path: ["weeks"],
    message: "week ids must be unique",
  })
  .describe("The full contents of `data/tk-coding/weeks.json`.");

export type TkWeek = z.infer<typeof tkWeekSchema>;
export type TkWeeksFile = z.infer<typeof tkWeeksFileSchema>;
