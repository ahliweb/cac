/**
 * Schema for `data/tk-coding/bridge.json`: the bridge to the SD programme
 * (silabus bagian 5). Since v1.0.2 (owner decision 2026-11-19, issue #177,
 * decision Q8) the bridge is aligned with the `sd-coding` syllabus: the
 * second column names the SD introduction items it touches with their SD
 * week codes. The TK week codes of the first column are extracted into
 * `outputWeeks`; the SD week codes stay in the verbatim `prerequisite` text and
 * are checked against the `sd-coding` corpus by the cross-programme check
 * (ADR-0010).
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
    prerequisite: nonEmptyString.describe(
      'The second column cell ("Butir pengenalan SD yang disentuh (kelas 1-2)" since v1.0.2; "Prasyarat untuk SD awal (Fase A)" before), verbatim.',
    ),
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
