/**
 * Schema for `data/sma-coding/osn-bridge.json`: the bridge from the tracks to
 * the OSN topic families (silabus bagian 5). The main track (jalur A) bridges
 * to every family (`bridges`, bagian 5.1); other tracks that prepare only
 * some families (jalur C, bagian 5.2) are listed in `trackBridges`.
 * `familyId` references `data/osn/topic-families.json`, a cross-programme
 * reference checked by `osn validate` (ADR-0006).
 */

import { z } from "zod";
import { nonEmptyString, slugSchema } from "./common";
import { smaProvenanceShape, smaTrackIdSchema, smaWeekCodeSchema } from "./sma-common";

export const osnBridgeSchema = z
  .object({
    familyId: slugSchema.describe("An OSN topic family id (data/osn/topic-families.json)."),
    topics: nonEmptyString.describe('The "Topik jalur ... yang menyiapkan" cell, verbatim.'),
    weeksText: nonEmptyString.describe('The "Minggu" cell, verbatim.'),
    weeks: z.array(smaWeekCodeSchema).min(1).describe("weeksText expanded to week codes."),
    note: nonEmptyString.describe('The "Catatan" cell, verbatim.'),
    hasEnrichment: z
      .boolean()
      .describe("`true` when the note marks any part as **P** (optional enrichment)."),
  })
  .strict();

const uniqueFamilies = (bridges: ReadonlyArray<{ familyId: string }>) =>
  new Set(bridges.map((b) => b.familyId)).size === bridges.length;

export const osnTrackBridgesSchema = z
  .object({
    track: smaTrackIdSchema.describe("A track other than the main one (jalur C)."),
    bridges: z.array(osnBridgeSchema).min(1),
  })
  .strict()
  .refine((entry) => uniqueFamilies(entry.bridges), {
    path: ["bridges"],
    message: "each OSN topic family may appear only once",
  });

export const osnBridgeFileSchema = z
  .object({
    ...smaProvenanceShape,
    track: smaTrackIdSchema.describe("The main track the bridge belongs to (jalur A)."),
    bridges: z.array(osnBridgeSchema).min(1),
    trackBridges: z
      .array(osnTrackBridgesSchema)
      .describe("Bridges of other tracks (jalur C); they need not cover every family."),
  })
  .strict()
  .superRefine((file, ctx) => {
    if (!uniqueFamilies(file.bridges)) {
      ctx.addIssue({
        code: "custom",
        path: ["bridges"],
        message: "each OSN topic family may appear only once",
      });
    }
    const tracks = [file.track, ...file.trackBridges.map((entry) => entry.track)];
    if (new Set(tracks).size !== tracks.length) {
      ctx.addIssue({
        code: "custom",
        path: ["trackBridges"],
        message: "each track may have only one bridge table",
      });
    }
  })
  .describe("The full contents of `data/sma-coding/osn-bridge.json`.");

export type OsnBridgeFile = z.infer<typeof osnBridgeFileSchema>;
