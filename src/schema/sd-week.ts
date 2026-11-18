/**
 * Schema for `data/sd-coding/weeks.json`: the weekly plan of kelas 1-6
 * (silabus bagian 5), one record per class-semester-week.
 *
 * The "Butir" cell of the source table is kept verbatim in `itemsText` and
 * split into four lists, so the corpus can tell a CP reference from an
 * introduction:
 *  - `introduces`: `P-<element>` codes. A stage 1-2 week (kelas 1-4) only
 *    *introduces*; it is never counted as covering a CP item.
 *  - `leadsTo`: the `(menuju C-…)` hints of kelas 4: which CP item the
 *    introduction prepares. A hint is not coverage either.
 *  - `cpItems`: `C-<element>-<letter>` codes a stage 3 week (kelas 5-6)
 *    works on.
 *  - `cpElements`: element-level references (`C-BK`) of the assessment
 *    weeks M14 of kelas 5-6.
 */

import { z } from "zod";
import { nonEmptyString } from "./common";
import {
  SD_WEEKS_PER_SEMESTER,
  SD_CP_STAGE,
  sdClassSchema,
  sdCpCodeSchema,
  sdElementIdSchema,
  sdIntroCodeSchema,
  sdProvenanceShape,
  sdSemesterSchema,
  sdStageIdSchema,
  sdWeekCodeSchema,
} from "./sd-common";

export const sdWeekSchema = z
  .object({
    id: sdWeekCodeSchema,
    kelas: sdClassSchema,
    semester: sdSemesterSchema,
    semesterCode: z
      .string()
      .regex(/^SD[1-6]-[12]$/, 'must be "SD<kelas>-<semester>", e.g. "SD5-1"'),
    week: z.number().int().min(1).max(SD_WEEKS_PER_SEMESTER),
    stage: sdStageIdSchema,
    topic: nonEmptyString.describe('The "Topik" cell, verbatim.'),
    itemsText: nonEmptyString.describe('The "Butir" cell, verbatim.'),
    exercise: nonEmptyString.describe('The "Keluaran dan latihan" cell, verbatim.'),
    introduces: z
      .array(sdIntroCodeSchema)
      .describe("The `P-` introduction codes of itemsText (kelas 1-4); never CP coverage."),
    leadsTo: z
      .array(sdCpCodeSchema)
      .describe("The CP items named in itemsText as `(menuju …)` (kelas 4); never CP coverage."),
    cpItems: z.array(sdCpCodeSchema).describe("The CP item codes of itemsText (kelas 5-6 only)."),
    cpElements: z
      .array(sdElementIdSchema)
      .describe("The element-level CP references of itemsText, e.g. `C-BK` (kelas 5-6 only)."),
    strengthening: z.boolean().describe("`true` when the topic is marked `[penguatan]`."),
    screenOption: z
      .boolean()
      .describe("`true` when the topic or exercise carries the `[opsi layar]` marker."),
  })
  .strict()
  .superRefine((week, ctx) => {
    const expectedSemesterCode = `SD${week.kelas}-${week.semester}`;
    if (week.semesterCode !== expectedSemesterCode) {
      ctx.addIssue({
        code: "custom",
        path: ["semesterCode"],
        message: `must be "${expectedSemesterCode}"`,
      });
    }
    const expectedId = `${expectedSemesterCode}-M${week.week}`;
    if (week.id !== expectedId) {
      ctx.addIssue({ code: "custom", path: ["id"], message: `must be "${expectedId}"` });
    }
    if (week.stage === SD_CP_STAGE) {
      if (week.introduces.length > 0 || week.leadsTo.length > 0) {
        ctx.addIssue({
          code: "custom",
          path: ["introduces"],
          message: "a stage 3 (Fase C) week fulfils CP items and carries no `P-` introduction",
        });
      }
      if (week.cpItems.length === 0 && week.cpElements.length === 0) {
        ctx.addIssue({
          code: "custom",
          path: ["cpItems"],
          message: "a stage 3 (Fase C) week must reference at least one CP item or element",
        });
      }
    } else {
      if (week.cpItems.length > 0 || week.cpElements.length > 0) {
        ctx.addIssue({
          code: "custom",
          path: ["cpItems"],
          message: `a stage ${week.stage} week (kelas 1-4) is outside the CP and may only introduce (\`P-\`), never reference a CP item as covered`,
        });
      }
      if (week.introduces.length === 0) {
        ctx.addIssue({
          code: "custom",
          path: ["introduces"],
          message: `a stage ${week.stage} week must carry at least one \`P-\` introduction`,
        });
      }
    }
  });

export const sdWeeksFileSchema = z
  .object({
    ...sdProvenanceShape,
    weeks: z.array(sdWeekSchema).min(1),
  })
  .strict()
  .refine((file) => new Set(file.weeks.map((week) => week.id)).size === file.weeks.length, {
    path: ["weeks"],
    message: "week ids must be unique",
  })
  .describe("The full contents of `data/sd-coding/weeks.json`.");

export type SdWeek = z.infer<typeof sdWeekSchema>;
export type SdWeeksFile = z.infer<typeof sdWeeksFileSchema>;
