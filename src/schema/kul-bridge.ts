/**
 * Schema for `data/kuliah-coding/bridges.json`: the bridges into the
 * university courses from SMA coding and OSN (silabus bagian 5.1) and out to
 * the world of work (bagian 5.2). Cells are kept verbatim; the course codes
 * they name are extracted so `osn validate` can check they exist.
 */

import { z } from "zod";
import { nonEmptyString } from "./common";
import { kulCourseCodeSchema, kulProvenanceShape } from "./kul-common";

export const kulSmaBridgeSchema = z
  .object({
    from: nonEmptyString.describe('The "Dari" cell, verbatim.'),
    toText: nonEmptyString.describe('The "Ke" cell, verbatim.'),
    toCourses: z
      .array(kulCourseCodeSchema)
      .min(1)
      .describe("Every course code named in toText, in order of appearance."),
    basis: nonEmptyString.describe('The "Dasar dan syarat" cell, verbatim.'),
  })
  .strict();

export const kulWorkBridgeSchema = z
  .object({
    to: nonEmptyString.describe('The "Ke" cell, verbatim.'),
    how: nonEmptyString.describe('The "Bagaimana" cell, verbatim.'),
    courses: z
      .array(kulCourseCodeSchema)
      .describe("Every course code named in how, in order of appearance (may be empty)."),
    note: nonEmptyString.describe('The "Catatan" cell, verbatim.'),
  })
  .strict();

export const kulBridgesFileSchema = z
  .object({
    ...kulProvenanceShape,
    fromSma: z.array(kulSmaBridgeSchema).min(1),
    toWork: z.array(kulWorkBridgeSchema).min(1),
  })
  .strict()
  .describe("The full contents of `data/kuliah-coding/bridges.json`.");

export type KulBridgesFile = z.infer<typeof kulBridgesFileSchema>;
