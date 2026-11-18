/**
 * Schema for `data/sd-coding/bridges.json`: the bridges of the SD syllabus
 * (silabus bagian 7 and 8) -- from TK into kelas 1, from kelas 6 into SMP,
 * the indirect route to SMA -- and the statement that there is **no** OSN
 * bridge for SD. The paragraphs are kept verbatim; they are assumptions of
 * the drafter (`[asumsi]`) to be aligned when `tk-coding` and `smp-coding`
 * exist, not facts, and nothing here is counted as CP coverage.
 */

import { z } from "zod";
import { nonEmptyString } from "./common";
import { sdProvenanceShape, sdSourceSectionSchema, sdWeekCodeSchema } from "./sd-common";

export const SD_BRIDGE_IDS = ["tk-ke-kelas-1", "kelas-6-ke-smp", "ke-sma"] as const;

export const sdBridgeSchema = z
  .object({
    id: z.enum(SD_BRIDGE_IDS),
    sourceSection: sdSourceSectionSchema,
    heading: nonEmptyString.describe("The section heading, verbatim."),
    text: nonEmptyString.describe("The section's paragraph(s), verbatim (whitespace normalised)."),
  })
  .strict();

export const sdOsnBridgeSchema = z
  .object({
    status: z.literal("tidak-ada").describe("There is no OSN bridge for SD (silabus bagian 8)."),
    sourceSection: sdSourceSectionSchema,
    statement: nonEmptyString.describe('The bold "Hasil:" statement, verbatim.'),
    findings: z
      .array(nonEmptyString)
      .min(1)
      .describe("The bullet points that support it, verbatim."),
    enrichmentText: nonEmptyString.describe(
      "The closing paragraph on unlabelled enrichment, verbatim.",
    ),
    enrichmentWeeks: z
      .array(sdWeekCodeSchema)
      .describe("The weeks the closing paragraph names (enrichment, not an OSN bridge)."),
  })
  .strict();

export const sdBridgesFileSchema = z
  .object({
    ...sdProvenanceShape,
    intro: nonEmptyString.describe("The opening paragraph of bagian 7, verbatim."),
    bridges: z.array(sdBridgeSchema).min(1),
    osn: sdOsnBridgeSchema,
  })
  .strict()
  .refine((file) => new Set(file.bridges.map((bridge) => bridge.id)).size === file.bridges.length, {
    path: ["bridges"],
    message: "bridge ids must be unique",
  })
  .describe("The full contents of `data/sd-coding/bridges.json`.");

export type SdBridgesFile = z.infer<typeof sdBridgesFileSchema>;
