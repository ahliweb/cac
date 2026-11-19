/**
 * Schema for `data/smp-coding/cp-mapping.json`: the mapping of CP items to
 * weeks (silabus bagian 4) and the enrichment outside the CP wording
 * (bagian 4, "Pengayaan di luar rumusan CP").
 *
 * A `mappings` entry says how far the weekly plan covers one CP item. Only
 * the weeks whose `cpCodes` name the item count; a week that merely
 * overlaps it through Python (`irisanCodes`) or is `pengayaan` never does,
 * so the coverage of an item is not inflated by enrichment. An item no
 * week covers is `tidak-dicakup` and is listed explicitly in
 * `uncovered.json` rather than left silent.
 */

import { z } from "zod";
import { nonEmptyString } from "./common";
import {
  smpCpCodeSchema,
  smpProvenanceShape,
  smpSemesterSchema,
  smpWeekCodeSchema,
} from "./smp-common";

export const SMP_COVERAGE_LEVELS = ["penuh", "sebagian", "tidak-dicakup"] as const;
export const smpCoverageSchema = z
  .enum(SMP_COVERAGE_LEVELS)
  .describe('How far the plan covers a CP item: "penuh", "sebagian" or "tidak-dicakup".');
export type SmpCoverage = z.infer<typeof smpCoverageSchema>;

export const smpCpMappingSchema = z
  .object({
    cpCode: smpCpCodeSchema,
    weeksText: nonEmptyString.describe(
      'The "Minggu" cell, verbatim ("-" when no week covers the item).',
    ),
    weeks: z
      .array(smpWeekCodeSchema)
      .describe("The week codes weeksText names explicitly (a sample when otherWeeks > 0)."),
    otherWeeks: z
      .number()
      .int()
      .min(0)
      .describe('The N of "dan N minggu lain" in weeksText: weeks not named, 0 when none.'),
    coverageText: nonEmptyString.describe('The "Cakupan" cell, verbatim.'),
    coverage: smpCoverageSchema.describe("The level the coverageText begins with."),
  })
  .strict()
  .superRefine((row, ctx) => {
    const named = row.weeks.length + row.otherWeeks;
    if (row.coverage === "tidak-dicakup" && named > 0) {
      ctx.addIssue({
        code: "custom",
        path: ["coverage"],
        message: "an item marked tidak-dicakup cannot have covering weeks",
      });
    }
    if (row.coverage !== "tidak-dicakup" && named === 0) {
      ctx.addIssue({
        code: "custom",
        path: ["coverage"],
        message: `an item with no covering week must be tidak-dicakup, not ${row.coverage}`,
      });
    }
    if (new Set(row.weeks).size !== row.weeks.length) {
      ctx.addIssue({ code: "custom", path: ["weeks"], message: "week codes must be unique" });
    }
  });

export const SMP_ENRICHMENT_KINDS = ["pemrograman-teks", "kodifikasi-biner", "klub"] as const;

export const smpEnrichmentSchema = z
  .object({
    id: z.enum(["a", "b", "c"]).describe("The letter the syllabus prints: (a), (b) or (c)."),
    kind: z.enum(SMP_ENRICHMENT_KINDS),
    text: nonEmptyString.describe("The enrichment item's text, verbatim."),
    semesters: z
      .array(smpSemesterSchema)
      .describe("Whole semesters the item covers (Python: SMP8-2 .. SMP9-2)."),
    weeks: z.array(smpWeekCodeSchema).describe("Individual weeks the item names."),
  })
  .strict();

export const smpCpMappingFileSchema = z
  .object({
    ...smpProvenanceShape,
    mappings: z.array(smpCpMappingSchema).min(1),
    enrichment: z
      .array(smpEnrichmentSchema)
      .min(1)
      .describe("Enrichment outside the CP wording (bagian 4); never CP coverage."),
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
    if (new Set(file.enrichment.map((e) => e.id)).size !== file.enrichment.length) {
      ctx.addIssue({
        code: "custom",
        path: ["enrichment"],
        message: "enrichment ids must be unique",
      });
    }
  })
  .describe("The full contents of `data/smp-coding/cp-mapping.json`.");

export type SmpCpMappingFile = z.infer<typeof smpCpMappingFileSchema>;
