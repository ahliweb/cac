/**
 * Schema for `data/tk-coding/bridge.json`: the bridge to the SD programme
 * (silabus bagian 5). The bridge is a one-sided design until the
 * `sd-coding` syllabus is approved and the codes are aligned (decision Q8),
 * so it names TK weeks only; it never references SD week codes.
 */

import { z } from "zod";
import { nonEmptyString } from "./common";
import { tkProvenanceShape, tkWeekCodeSchema } from "./tk-common";

export const tkBridgeRowSchema = z
  .object({
    order: z.number().int().positive(),
    output: nonEmptyString.describe('The "Keluaran akhir TK B" cell, verbatim.'),
    outputWeeks: z
      .array(tkWeekCodeSchema)
      .describe("The week codes cited in output, in order (may be empty)."),
    prerequisite: nonEmptyString.describe('The "Prasyarat untuk SD awal (Fase A)" cell, verbatim.'),
    note: nonEmptyString.describe('The "Catatan" cell, verbatim.'),
  })
  .strict();

export const tkBridgeFileSchema = z
  .object({
    ...tkProvenanceShape,
    policy: nonEmptyString.describe('The "Kebijakan." bullet of bagian 5, verbatim.'),
    sdProgram: nonEmptyString.describe('The "Program `sd-coding`." bullet of bagian 5, verbatim.'),
    rows: z.array(tkBridgeRowSchema).min(1),
  })
  .strict()
  .superRefine((file, ctx) => {
    file.rows.forEach((row, index) => {
      if (row.order !== index + 1) {
        ctx.addIssue({
          code: "custom",
          path: ["rows", index, "order"],
          message: `must be ${index + 1} (rows are numbered 1..n in order)`,
        });
      }
    });
  })
  .describe("The full contents of `data/tk-coding/bridge.json`.");

export type TkBridgeFile = z.infer<typeof tkBridgeFileSchema>;
