/**
 * Schema for `data/sma-coding/cp-mapping.json`: the mapping of CP items to
 * topics, weeks and tracks (silabus bagian 4.1 and 4.2). `weeksText` and
 * `tracksText` keep the source cells; `weeks` and `tracks` are the same
 * facts normalised so they can be checked referentially.
 */

import { z } from "zod";
import { nonEmptyString } from "./common";
import {
  cpCodeSchema,
  smaProvenanceShape,
  smaTrackIdSchema,
  smaWeekCodeSchema,
} from "./sma-common";

export const cpMappingSchema = z
  .object({
    cpCode: cpCodeSchema,
    topic: nonEmptyString.describe('The "Topik" cell, verbatim.'),
    weeksText: nonEmptyString.describe(
      'The "Minggu" cell, verbatim (ranges such as "A-X2-M4..M9").',
    ),
    weeks: z
      .array(smaWeekCodeSchema)
      .min(1)
      .describe("weeksText expanded to individual week codes."),
    tracksText: nonEmptyString.describe('The "Jalur" cell, verbatim (e.g. "B (parsial)").'),
    tracks: z.array(smaTrackIdSchema).min(1).describe("The track ids named in tracksText."),
    partial: z.boolean().describe('`true` when tracksText marks the coverage "(parsial)".'),
    sourceSection: z.enum(["bagian 4.1", "bagian 4.2"]),
  })
  .strict();

export const cpMappingFileSchema = z
  .object({
    ...smaProvenanceShape,
    mappings: z.array(cpMappingSchema).min(1),
  })
  .strict()
  .refine((file) => new Set(file.mappings.map((m) => m.cpCode)).size === file.mappings.length, {
    path: ["mappings"],
    message: "each CP item code may be mapped only once",
  })
  .describe("The full contents of `data/sma-coding/cp-mapping.json`.");

export type CpMappingFile = z.infer<typeof cpMappingFileSchema>;
