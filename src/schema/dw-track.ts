/**
 * Schema for `data/dewasa-coding/tracks.json`: the four persona tracks
 * (silabus bagian 1 table, plus the prerequisite, duration and synthetic
 * project text of bagian 4-7). Hours are the syllabus's `[asumsi]`
 * estimates; the arithmetic (`sharedHours + trackHours = totalHours`) is
 * shape-level, the rest (against the modules) lives in the corpus audit.
 */

import { z } from "zod";
import { nonEmptyString } from "./common";
import {
  dwHoursSchema,
  dwModuleCodeSchema,
  dwProvenanceShape,
  dwTrackIdSchema,
} from "./dw-common";

export const dwTrackSchema = z
  .object({
    id: dwTrackIdSchema,
    persona: nonEmptyString.describe('The "Persona" cell, verbatim.'),
    goal: nonEmptyString.describe('The "Tujuan utama" cell, verbatim.'),
    sharedHours: dwHoursSchema.describe(
      "Hours of the shared module (the first term of the hours cell).",
    ),
    trackHours: dwHoursSchema.describe("Hours of the track's own modules (the second term)."),
    totalHours: dwHoursSchema.describe("The total of the hours cell (`sharedHours + trackHours`)."),
    moduleCount: dwHoursSchema.describe('The number of own modules, from "(N modul × H jam)".'),
    hoursPerModule: dwHoursSchema.describe('Hours per own module, from "(N modul × H jam)".'),
    durationText: nonEmptyString.describe('The "Durasi" paragraph, whitespace-normalised.'),
    endOfTrack: nonEmptyString.describe('The "Akhir jalur" cell, verbatim.'),
    prerequisitesText: nonEmptyString.describe('The "Prasyarat" paragraph, whitespace-normalised.'),
    prerequisiteModules: z
      .array(dwModuleCodeSchema)
      .min(1)
      .describe("Module codes named in the prerequisite text (always the shared module)."),
    syntheticProject: nonEmptyString.describe(
      "The synthetic-data project paragraph (bagian 4-7), whitespace-normalised.",
    ),
  })
  .strict()
  .refine((track) => track.sharedHours + track.trackHours === track.totalHours, {
    path: ["totalHours"],
    message: "must equal sharedHours + trackHours",
  })
  .refine((track) => track.moduleCount * track.hoursPerModule === track.trackHours, {
    path: ["trackHours"],
    message: "must equal moduleCount x hoursPerModule",
  });

export const dwTracksFileSchema = z
  .object({
    ...dwProvenanceShape,
    tracks: z.array(dwTrackSchema).min(1),
  })
  .strict()
  .refine((file) => new Set(file.tracks.map((track) => track.id)).size === file.tracks.length, {
    path: ["tracks"],
    message: "track ids must be unique",
  })
  .describe("The full contents of `data/dewasa-coding/tracks.json`.");

export type DwTrack = z.infer<typeof dwTrackSchema>;
export type DwTracksFile = z.infer<typeof dwTracksFileSchema>;
