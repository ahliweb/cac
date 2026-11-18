/**
 * Schema for `data/kuliah-coding/ai-policy.json`: the three-level policy on
 * the use of AI in coursework (silabus bagian 6.3; owner decision
 * 2026-11-19: option A, hijau-kuning-merah).
 */

import { z } from "zod";
import { nonEmptyString } from "./common";
import { kulCourseCodeSchema, kulProvenanceShape } from "./kul-common";

export const KUL_AI_LEVELS = ["hijau", "kuning", "merah"] as const;

export const kulAiLevelSchema = z
  .object({
    level: z.enum(KUL_AI_LEVELS).describe('The policy level: "hijau", "kuning" or "merah".'),
    levelText: nonEmptyString.describe('The "Tingkat" cell, verbatim.'),
    rule: nonEmptyString.describe('The "Aturan" cell, verbatim.'),
    usedOnText: nonEmptyString.describe('The "Dipakai pada" cell, verbatim.'),
    usedOnCourses: z
      .array(kulCourseCodeSchema)
      .describe("Every course code named in usedOnText, in order of appearance."),
  })
  .strict();

export const kulAiPolicyFileSchema = z
  .object({
    ...kulProvenanceShape,
    levels: z.array(kulAiLevelSchema).min(1),
  })
  .strict()
  .describe("The full contents of `data/kuliah-coding/ai-policy.json`.");

export type KulAiPolicyFile = z.infer<typeof kulAiPolicyFileSchema>;
