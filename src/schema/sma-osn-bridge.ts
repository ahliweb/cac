/**
 * Schema for `data/sma-coding/osn-bridge.json`: the bridge from track A to
 * the OSN topic families (silabus bagian 5). `familyId` references
 * `data/osn/topic-families.json`, a cross-programme reference checked by
 * `osn validate` (ADR-0006).
 */

import { z } from "zod";
import { nonEmptyString, slugSchema } from "./common";
import { smaProvenanceShape, smaTrackIdSchema, smaWeekCodeSchema } from "./sma-common";

export const osnBridgeSchema = z
  .object({
    familyId: slugSchema.describe("An OSN topic family id (data/osn/topic-families.json)."),
    topics: nonEmptyString.describe('The "Topik jalur A yang menyiapkan" cell, verbatim.'),
    weeksText: nonEmptyString.describe('The "Minggu" cell, verbatim.'),
    weeks: z.array(smaWeekCodeSchema).min(1).describe("weeksText expanded to week codes."),
    note: nonEmptyString.describe('The "Catatan" cell, verbatim.'),
    hasEnrichment: z
      .boolean()
      .describe("`true` when the note marks any part as **P** (optional enrichment)."),
  })
  .strict();

export const osnBridgeFileSchema = z
  .object({
    ...smaProvenanceShape,
    track: smaTrackIdSchema.describe("The track the bridge belongs to (jalur A)."),
    bridges: z.array(osnBridgeSchema).min(1),
  })
  .strict()
  .refine((file) => new Set(file.bridges.map((b) => b.familyId)).size === file.bridges.length, {
    path: ["bridges"],
    message: "each OSN topic family may appear only once",
  })
  .describe("The full contents of `data/sma-coding/osn-bridge.json`.");

export type OsnBridgeFile = z.infer<typeof osnBridgeFileSchema>;
