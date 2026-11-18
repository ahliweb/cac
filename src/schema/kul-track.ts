/**
 * Schema for `data/kuliah-coding/tracks.json`: the three learning tracks
 * (jalur U, I, K) and their summary table (silabus bagian 2.2, names from the
 * headings of bagian 3.1-3.3). The `...Text` fields keep the table cells
 * verbatim; the numbers are parsed from them and cross-checked against the
 * course list by `src/domain/kul-corpus-audit.ts`.
 */

import { z } from "zod";
import { nonEmptyString } from "./common";
import { kulProvenanceShape, kulSemesterSchema, kulTrackIdSchema } from "./kul-common";

export const kulTrackSchema = z
  .object({
    id: kulTrackIdSchema,
    name: nonEmptyString.describe('The heading text after "Jalur X: " (bagian 3.1-3.3).'),
    target: nonEmptyString.describe('The "Sasaran" cell, verbatim.'),
    courseCountText: nonEmptyString.describe('The "Mata kuliah" cell, verbatim.'),
    sksText: nonEmptyString.describe('The "SKS" cell, verbatim.'),
    semesterRangeText: nonEmptyString.describe('The "Rentang semester" cell, verbatim.'),
    courseCount: z
      .number()
      .int()
      .min(1)
      .describe("Number of courses, parsed from courseCountText."),
    coreCourseCount: z
      .number()
      .int()
      .min(1)
      .describe("Courses excluding electives; equals courseCount when the cell names none."),
    sks: z.number().int().min(1).describe("Total SKS, parsed from sksText."),
    coreSks: z
      .number()
      .int()
      .min(1)
      .describe('SKS excluding electives ("inti"); equals sks when the cell names none.'),
    firstSemester: kulSemesterSchema,
    lastSemester: kulSemesterSchema,
  })
  .strict();

export const kulTotalSchema = z
  .object({
    courseCountText: nonEmptyString,
    sksText: nonEmptyString,
    courseCount: z.number().int().min(1),
    sks: z.number().int().min(1),
    coreSks: z.number().int().min(1),
  })
  .strict()
  .describe('The "Jumlah" row of the track table.');

export const kulTracksFileSchema = z
  .object({
    ...kulProvenanceShape,
    tracks: z.array(kulTrackSchema).min(1),
    total: kulTotalSchema,
  })
  .strict()
  .superRefine((file, ctx) => {
    const ids = file.tracks.map((track) => track.id);
    if (new Set(ids).size !== ids.length) {
      ctx.addIssue({ code: "custom", path: ["tracks"], message: "track ids must be unique" });
    }
  })
  .describe("The full contents of `data/kuliah-coding/tracks.json`.");

export type KulTracksFile = z.infer<typeof kulTracksFileSchema>;
