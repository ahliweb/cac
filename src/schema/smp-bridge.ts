/**
 * Schema for `data/smp-coding/bridge.json`: the bridges of the programme
 * (silabus bagian 5): from `sd-coding` (an assumption, paragraph), to
 * `sma-coding` (table) and to OSN (paragraph). The `sma-coding` rows carry
 * the SMP weeks and CP items their "Dari SMP" cell names and the SMA track
 * letters their "Ke sma-coding" cell names, so the references that live
 * inside this programme can be checked; the SMA side is only a string
 * reference (programmes do not read each other's corpora, ADR-0008).
 */

import { z } from "zod";
import { nonEmptyString } from "./common";
import { smpCpCodeSchema, smpProvenanceShape, smpWeekCodeSchema } from "./smp-common";

export const smpBridgeTextSchema = z
  .object({
    text: nonEmptyString.describe("The section's paragraph, verbatim (lines joined by a space)."),
  })
  .strict();

export const smpSmaBridgeRowSchema = z
  .object({
    from: nonEmptyString.describe('The "Dari SMP" cell, verbatim.'),
    to: nonEmptyString.describe('The "Ke sma-coding" cell, verbatim.'),
    note: nonEmptyString.describe('The "Catatan" cell, verbatim.'),
    smpWeeks: z.array(smpWeekCodeSchema).describe("SMP week codes named in the `from` cell."),
    cpCodes: z
      .array(smpCpCodeSchema)
      .describe("CP item codes named in the `from` cell (`DK-EA-b`, `c` expands to DK-EA-c)."),
    smaTracks: z
      .array(z.string().regex(/^[A-Z]$/, "must be a single upper-case track letter"))
      .describe('sma-coding track letters named in the `to` cell ("Jalur A, B").'),
  })
  .strict();

export const smpBridgeFileSchema = z
  .object({
    ...smpProvenanceShape,
    fromSd: smpBridgeTextSchema,
    toSma: z.array(smpSmaBridgeRowSchema).min(1),
    toOsn: smpBridgeTextSchema,
  })
  .strict()
  .describe("The full contents of `data/smp-coding/bridge.json`.");

export type SmpBridgeFile = z.infer<typeof smpBridgeFileSchema>;
