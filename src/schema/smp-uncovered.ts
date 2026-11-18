/**
 * Schema for `data/smp-coding/uncovered.json`: the CP items no week of the
 * plan covers (silabus bagian 4, "Butir di luar silabus coding ini" and the
 * owner's decisions Q10 and Q11 in bagian 10). Listing them is the point:
 * the syllabus does not claim to cover the whole CP, and the gap is data,
 * not silence.
 *
 * `reason` says why an item is outside the plan; `closure` records how the
 * owner decided to close it: items outside the coding syllabus go to a
 * companion module (follow-up work, not yet written); items needing an AI
 * tool in the pupil's hands are only demonstrated by the teacher.
 */

import { z } from "zod";
import { nonEmptyString } from "./common";
import { smpCpCodeSchema, smpProvenanceShape } from "./smp-common";

export const SMP_UNCOVERED_REASONS = ["luar-silabus", "tanpa-perangkat-ka"] as const;
export const SMP_UNCOVERED_CLOSURES = ["modul-pendamping", "demonstrasi-guru"] as const;

/** The closure each reason implies (owner decisions Q10 and Q11, 2026-11-19). */
export const SMP_CLOSURE_BY_REASON = {
  "luar-silabus": "modul-pendamping",
  "tanpa-perangkat-ka": "demonstrasi-guru",
} as const;

export const smpUncoveredItemSchema = z
  .object({
    cpCode: smpCpCodeSchema,
    coverageText: nonEmptyString.describe(
      'The "Cakupan" cell of the CP mapping row, verbatim (it states the reason).',
    ),
    reason: z.enum(SMP_UNCOVERED_REASONS),
    closure: z.enum(SMP_UNCOVERED_CLOSURES),
  })
  .strict()
  .refine((item) => SMP_CLOSURE_BY_REASON[item.reason] === item.closure, {
    path: ["closure"],
    message:
      "closure must follow from reason (luar-silabus: modul-pendamping; tanpa-perangkat-ka: demonstrasi-guru)",
  });

export const smpUncoveredFileSchema = z
  .object({
    ...smpProvenanceShape,
    items: z.array(smpUncoveredItemSchema).min(1),
  })
  .strict()
  .refine((file) => new Set(file.items.map((i) => i.cpCode)).size === file.items.length, {
    path: ["items"],
    message: "each CP item may be listed only once",
  })
  .describe("The full contents of `data/smp-coding/uncovered.json`.");

export type SmpUncoveredFile = z.infer<typeof smpUncoveredFileSchema>;
