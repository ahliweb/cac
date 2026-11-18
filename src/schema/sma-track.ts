/**
 * Schema for `data/sma-coding/tracks.json`: the approved learning tracks
 * (jalur A to E of syllabus v1.2). `startClass` and `cpStatus` are read from
 * the summary table of silabus bagian 3.6.
 */

import { z } from "zod";
import { nonEmptyString } from "./common";
import {
  smaProvenanceShape,
  smaTrackCpStatusSchema,
  smaTrackIdSchema,
  smaTrackStartClassSchema,
} from "./sma-common";

export const smaTrackSchema = z
  .object({
    id: smaTrackIdSchema,
    name: nonEmptyString.describe(
      'The track title as in the syllabus heading, e.g. "Algoritmik dengan C++".',
    ),
    tools: z
      .array(nonEmptyString)
      .min(1)
      .describe("The language(s)/tool(s) named in the track title."),
    startClass: smaTrackStartClassSchema.describe(
      'The class the track starts in: "X" (six semesters, X1 from week 8 after the foundation block) or "XI" (four semesters).',
    ),
    cpStatus: smaTrackCpStatusSchema,
    approvalStatus: z.literal("disetujui").describe("Only approved tracks are encoded."),
    approvedOn: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, 'must be an ISO date "YYYY-MM-DD"')
      .describe("The owner's approval date of the encoded syllabus version, from its status line."),
  })
  .strict();

export const smaTracksFileSchema = z
  .object({
    ...smaProvenanceShape,
    tracks: z.array(smaTrackSchema).min(1),
  })
  .strict()
  .refine((file) => new Set(file.tracks.map((track) => track.id)).size === file.tracks.length, {
    path: ["tracks"],
    message: "track ids must be unique",
  })
  .describe("The full contents of `data/sma-coding/tracks.json`.");

export type SmaTracksFile = z.infer<typeof smaTracksFileSchema>;
