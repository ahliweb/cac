/**
 * Schema for `data/smp-coding/weeks.json`: the weekly plan (silabus bagian
 * 3), one record per semester-week, 84 in all.
 *
 * The "Butir CP" cell of each week is kept verbatim in `cpText` and split
 * into three disjoint facts: `cpCodes` (items the week counts towards
 * covering), `irisanCodes` (items written with a trailing `*`: the week uses
 * Python, which goes beyond the CP wording, so the item is only the nearest
 * overlap and is never counted as coverage), and `enrichment` (the cell
 * says `pengayaan`: no official CP item fits).
 */

import { z } from "zod";
import { nonEmptyString } from "./common";
import {
  SMP_WEEKS_PER_SEMESTER,
  smpClassSchema,
  smpCpCodeSchema,
  smpProvenanceShape,
  smpSemesterSchema,
  smpWeekCodeSchema,
} from "./smp-common";

export const smpSemesterInfoSchema = z
  .object({
    code: smpSemesterSchema,
    kelas: smpClassSchema,
    title: nonEmptyString.describe("The semester heading's title, verbatim."),
  })
  .strict()
  .refine((semester) => semester.code.startsWith(`SMP${semester.kelas}-`), {
    path: ["code"],
    message: "semester code must start with SMP<kelas>-",
  });

export const smpWeekSchema = z
  .object({
    id: smpWeekCodeSchema,
    kelas: smpClassSchema,
    semester: smpSemesterSchema,
    week: z.number().int().min(1).max(SMP_WEEKS_PER_SEMESTER),
    topic: nonEmptyString.describe('The "Topik" cell, verbatim.'),
    tool: nonEmptyString.describe('The "Alat" cell, verbatim.'),
    output: nonEmptyString.describe('The "Keluaran" cell, verbatim.'),
    cpText: nonEmptyString.describe('The "Butir CP" cell, verbatim.'),
    cpCodes: z.array(smpCpCodeSchema).describe("CP items the week counts towards covering."),
    irisanCodes: z
      .array(smpCpCodeSchema)
      .describe("CP items marked `*` (Python, beyond the CP wording): never counted as coverage."),
    enrichment: z
      .boolean()
      .describe("`true` when the Butir CP cell contains `pengayaan` (no official CP item fits)."),
  })
  .strict()
  .superRefine((week, ctx) => {
    const expectedId = `${week.semester}-M${week.week}`;
    if (week.id !== expectedId) {
      ctx.addIssue({ code: "custom", path: ["id"], message: `must be "${expectedId}"` });
    }
    if (!week.semester.startsWith(`SMP${week.kelas}-`)) {
      ctx.addIssue({
        code: "custom",
        path: ["kelas"],
        message: `semester "${week.semester}" does not belong to kelas ${week.kelas}`,
      });
    }
    for (const field of ["cpCodes", "irisanCodes"] as const) {
      if (new Set(week[field]).size !== week[field].length) {
        ctx.addIssue({ code: "custom", path: [field], message: "CP item codes must be unique" });
      }
    }
    const counted = new Set(week.cpCodes);
    week.irisanCodes.forEach((code, index) => {
      if (counted.has(code)) {
        ctx.addIssue({
          code: "custom",
          path: ["irisanCodes", index],
          message: `"${code}" cannot be both covered (cpCodes) and a mere overlap (irisanCodes) in the same week`,
        });
      }
    });
    if (week.cpCodes.length + week.irisanCodes.length === 0 && !week.enrichment) {
      ctx.addIssue({
        code: "custom",
        path: ["cpText"],
        message: "a week must name a CP item or be marked pengayaan",
      });
    }
  });

export const smpWeeksFileSchema = z
  .object({
    ...smpProvenanceShape,
    semesters: z.array(smpSemesterInfoSchema).min(1),
    weeks: z.array(smpWeekSchema).min(1),
  })
  .strict()
  .refine((file) => new Set(file.weeks.map((week) => week.id)).size === file.weeks.length, {
    path: ["weeks"],
    message: "week ids must be unique",
  })
  .describe("The full contents of `data/smp-coding/weeks.json`.");

export type SmpWeek = z.infer<typeof smpWeekSchema>;
export type SmpWeeksFile = z.infer<typeof smpWeeksFileSchema>;
