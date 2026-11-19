/**
 * Schema for `data/sma-coding/smp-bridge.json`: the subsection "Kemampuan
 * masuk dari SMP dan penempatan di blok fondasi" of silabus bagian 3.0
 * (v1.4, owner decision 2026-11-19, issue #177). The syllabus does not
 * require `smp-coding`; the table lists the weeks of `smp-coding` that
 * overlap the foundation block and the grade-X track weeks, and what the
 * shared class does about the overlap. Cells are verbatim; the week codes
 * they name are extracted so `osn validate` can check them (SMA codes against
 * this corpus, SMP codes against the `smp-coding` corpus through the
 * cross-programme check, ADR-0010).
 */

import { z } from "zod";
import { nonEmptyString } from "./common";
import { smaProvenanceShape, smaWeekCodeSchema } from "./sma-common";

/** An `smp-coding` week code `SMP<7|8|9>-<semester>-M<n>`, e.g. "SMP7-2-M10". */
export const smaSmpWeekCodeSchema = z
  .string()
  .regex(
    /^SMP[789]-[12]-M([1-9]|1[0-4])$/,
    'must be an smp-coding week code such as "SMP7-2-M10" (grade 7-9, semester, week 1-14)',
  )
  .describe('An smp-coding week code such as "SMP7-2-M10".');

export const smaSmpBridgeRowSchema = z
  .object({
    smpText: nonEmptyString.describe('The "Asal di SMP" cell, verbatim.'),
    smpWeeks: z
      .array(smaSmpWeekCodeSchema)
      .min(1)
      .describe("Every smp-coding week code named in smpText, in order of appearance."),
    smaText: nonEmptyString.describe('The "Minggu silabus ini yang beririsan" cell, verbatim.'),
    smaWeeks: z
      .array(smaWeekCodeSchema)
      .min(1)
      .describe("Every sma-coding week code named in smaText, in order of appearance."),
    treatment: nonEmptyString.describe('The "Perlakuan di dalam kelas bersama" cell, verbatim.'),
  })
  .strict();

export const smaSmpBridgeFileSchema = z
  .object({
    ...smaProvenanceShape,
    intro: nonEmptyString.describe("The first paragraph of the subsection, verbatim."),
    rows: z.array(smaSmpBridgeRowSchema).min(1),
    observation: nonEmptyString.describe(
      'The paragraph starting "Pengamatan awal:", verbatim (placement without a test, portfolio, AI policy).',
    ),
  })
  .strict()
  .describe("The full contents of `data/sma-coding/smp-bridge.json`.");

export type SmaSmpBridgeFile = z.infer<typeof smaSmpBridgeFileSchema>;
