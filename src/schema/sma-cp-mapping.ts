/**
 * Schema for `data/sma-coding/cp-mapping.json`: the mapping of CP items to
 * topics, weeks and tracks (silabus bagian 4.1 and 4.2), plus the
 * `enrichmentLinks` of the tracks that lie outside the CP wording (bagian
 * 4.5). `weeksText` and `tracksText` keep the source cells; `weeks` and
 * `tracks` are the same facts normalised so they can be checked
 * referentially.
 *
 * A `mappings` entry counts as covering the CP item. An `enrichmentLinks`
 * entry never does: it records that a week of a pengayaan track (jalur D, E)
 * merely resembles a CP item, so the corpus does not pretend a mapping.
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
    tracksText: nonEmptyString.describe(
      'The "Jalur" cell, verbatim (e.g. "B (parsial), C"); "(parsial)" qualifies the track just before it.',
    ),
    tracks: z.array(smaTrackIdSchema).min(1).describe("The track ids named in tracksText."),
    partialTracks: z
      .array(smaTrackIdSchema)
      .describe('The tracks that tracksText marks "(parsial)" (a subset of `tracks`).'),
    sourceSection: z.enum(["bagian 4.1", "bagian 4.2"]),
  })
  .strict();

export const cpEnrichmentLinkSchema = z
  .object({
    track: smaTrackIdSchema.describe("A pengayaan track (cpStatus in tracks.json)."),
    cpCode: cpCodeSchema,
    topic: nonEmptyString.describe('The "Topik" cell, verbatim.'),
    weeksText: nonEmptyString.describe('The "Minggu" cell, verbatim.'),
    weeks: z
      .array(smaWeekCodeSchema)
      .min(1)
      .describe("weeksText expanded to individual week codes."),
    level: nonEmptyString.describe(
      'The "Tingkat irisan" cell, verbatim: the drafter\'s reading of the resemblance, never counted as covering the CP item.',
    ),
  })
  .strict();

export const cpMappingFileSchema = z
  .object({
    ...smaProvenanceShape,
    mappings: z.array(cpMappingSchema).min(1),
    enrichmentLinks: z
      .array(cpEnrichmentLinkSchema)
      .describe("Irisan jalur pengayaan di luar CP (bagian 4.5); not CP coverage."),
  })
  .strict()
  .superRefine((file, ctx) => {
    if (new Set(file.mappings.map((m) => m.cpCode)).size !== file.mappings.length) {
      ctx.addIssue({
        code: "custom",
        path: ["mappings"],
        message: "each CP item code may be mapped only once",
      });
    }
    const keys = file.enrichmentLinks.map((link) => `${link.track}/${link.cpCode}`);
    if (new Set(keys).size !== keys.length) {
      ctx.addIssue({
        code: "custom",
        path: ["enrichmentLinks"],
        message: "each (track, CP item) pair may be linked only once",
      });
    }
    file.mappings.forEach((mapping, index) => {
      const outside = mapping.partialTracks.filter((id) => !mapping.tracks.includes(id));
      if (outside.length > 0) {
        ctx.addIssue({
          code: "custom",
          path: ["mappings", index, "partialTracks"],
          message: `partialTracks must be a subset of tracks; ${outside.join(", ")} is not in tracks`,
        });
      }
    });
  })
  .describe("The full contents of `data/sma-coding/cp-mapping.json`.");

export type CpMappingFile = z.infer<typeof cpMappingFileSchema>;
