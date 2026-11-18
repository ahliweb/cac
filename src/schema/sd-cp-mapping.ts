/**
 * Schema for `data/sd-coding/cp-mapping.json`: the mapping of each CP item
 * to the weeks that fulfil it (silabus bagian 6). `weeksText` keeps the
 * source cell; `weeks` is the same fact expanded so it can be checked
 * referentially.
 *
 * Only kelas 5-6 weeks may appear here (`sdCpWeekCodeSchema`): the `P-`
 * introductions of kelas 1-4 are outside the CP and never count as covering
 * an item, so they have no row in this file by construction.
 */

import { z } from "zod";
import { nonEmptyString } from "./common";
import { sdCpCodeSchema, sdCpWeekCodeSchema, sdProvenanceShape } from "./sd-common";

export const sdCpMappingSchema = z
  .object({
    cpCode: sdCpCodeSchema,
    weeksText: nonEmptyString.describe(
      'The "Minggu pemenuhan" cell, verbatim (e.g. "SD5-1-M2, M3, M4, M5; SD6-1-M1").',
    ),
    weeks: z
      .array(sdCpWeekCodeSchema)
      .min(1)
      .describe("weeksText expanded to individual kelas 5-6 week codes."),
  })
  .strict();

export const sdCpMappingFileSchema = z
  .object({
    ...sdProvenanceShape,
    mappings: z.array(sdCpMappingSchema).min(1),
  })
  .strict()
  .superRefine((file, ctx) => {
    if (new Set(file.mappings.map((mapping) => mapping.cpCode)).size !== file.mappings.length) {
      ctx.addIssue({
        code: "custom",
        path: ["mappings"],
        message: "each CP item code may be mapped only once",
      });
    }
    file.mappings.forEach((mapping, index) => {
      if (new Set(mapping.weeks).size !== mapping.weeks.length) {
        ctx.addIssue({
          code: "custom",
          path: ["mappings", index, "weeks"],
          message: "a week may be listed only once per CP item",
        });
      }
    });
  })
  .describe("The full contents of `data/sd-coding/cp-mapping.json`.");

export type SdCpMappingFile = z.infer<typeof sdCpMappingFileSchema>;
