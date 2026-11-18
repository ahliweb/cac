/**
 * Schema for `data/sd-coding/structure.json`: the programme structure
 * (silabus bagian 2): three stages, the time structure per class and the JP
 * load of the CP classes. `stages[].…Text`/`rows` carry the table cells
 * verbatim; the structured fields are the same facts in machine-readable
 * form, and the fidelity check proves the two agree with the source
 * document.
 */

import { z } from "zod";
import { nonEmptyString } from "./common";
import { sdClassSchema, sdProvenanceShape, sdStageIdSchema } from "./sd-common";

export const SD_STRUCTURE_ROW_IDS = [
  "pertemuan",
  "semester",
  "minggu-materi",
  "minggu-cadangan",
  "pola-semester",
  "beban-jp",
  "pemilihan",
  "perangkat",
] as const;

const positiveInt = z.number().int().positive();

export const sdStageSchema = z
  .object({
    id: sdStageIdSchema,
    name: nonEmptyString.describe('The "Tahap" cell without its leading number.'),
    classes: z.array(sdClassSchema).min(1).describe('The "Kelas" cell as class numbers.'),
    status: nonEmptyString.describe('The "Fase / status resmi" cell, verbatim.'),
    role: nonEmptyString.describe('The "Peran" cell, verbatim.'),
    hoursText: nonEmptyString.describe('The "Jam per minggu" cell, verbatim.'),
    delivery: nonEmptyString.describe('The "Cara penyelenggaraan" cell, verbatim.'),
    jpPerWeek: positiveInt.describe("JP per week read from hoursText."),
    minutesPerWeek: positiveInt.describe("Minutes per week read from hoursText (JP x 35 minutes)."),
    meetsCp: z
      .boolean()
      .describe("`true` only for the stage whose status is Fase C (it fulfils the CP)."),
  })
  .strict();

export const sdStructureRowSchema = z
  .object({
    id: z.enum(SD_STRUCTURE_ROW_IDS),
    item: nonEmptyString.describe('The "Butir" cell, verbatim.'),
    value: nonEmptyString.describe('The "Nilai" cell, verbatim.'),
    status: nonEmptyString.describe('The "Status" cell, verbatim.'),
  })
  .strict();

export const sdStructureFileSchema = z
  .object({
    ...sdProvenanceShape,
    stages: z.array(sdStageSchema).min(1),
    rows: z.array(sdStructureRowSchema).min(1),
    semestersPerClass: positiveInt,
    weeksPerSemester: z.object({ teaching: positiveInt }).strict(),
    semesterPattern: z
      .object({
        materiFromWeek: positiveInt,
        materiToWeek: positiveInt,
        miniProjectWeek: positiveInt,
        assessmentWeek: positiveInt,
      })
      .strict(),
    weeksPerYear: z
      .array(
        z
          .object({
            classes: z.array(sdClassSchema).min(1),
            available: positiveInt.describe("Weeks per school year (Tabel 1-5 of the regulation)."),
            used: positiveInt.describe(
              "Weeks the syllabus uses (two semesters of teaching weeks).",
            ),
            reserve: positiveInt.describe("Weeks left as reserve."),
          })
          .strict(),
      )
      .min(1),
    jpLoad: z
      .array(
        z
          .object({
            kelas: sdClassSchema,
            weeks: positiveInt,
            jpPerWeek: positiveInt,
            used: positiveInt.describe("JP the syllabus uses: weeks x jpPerWeek."),
            allocated: positiveInt.describe("JP per year the regulation allocates."),
          })
          .strict(),
      )
      .min(1),
  })
  .strict()
  .superRefine((file, ctx) => {
    const stageIds = file.stages.map((stage) => stage.id);
    if (new Set(stageIds).size !== stageIds.length) {
      ctx.addIssue({ code: "custom", path: ["stages"], message: "stage ids must be unique" });
    }
    const rowIds = file.rows.map((row) => row.id);
    if (new Set(rowIds).size !== rowIds.length) {
      ctx.addIssue({ code: "custom", path: ["rows"], message: "row ids must be unique" });
    }
  })
  .describe("The full contents of `data/sd-coding/structure.json`.");

export type SdStructureFile = z.infer<typeof sdStructureFileSchema>;
