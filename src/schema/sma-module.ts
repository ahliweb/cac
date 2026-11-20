/**
 * Schema for the `sma-coding` learning-module index,
 * `data/sma-coding/modules.json` (ADR-0007, ADR-0006, issue #106).
 *
 * Why a separate schema: the OSN module index (`src/schema/module.ts`)
 * ties a module to OSN topic families and week numbers 1..28. A
 * `sma-coding` module is tied instead to CP items, track/foundation week
 * codes (`A-X1-M3`, `FND-X1-M2`), OSN families only through the bridge, and
 * school classes. The two index shapes therefore stay separate and the OSN
 * `moduleSchema` is untouched; what is genuinely common -- the lifecycle
 * statuses, the role-only review record and the https reference shape -- is
 * imported from `./module`, so the ADR-0007 rules are one definition.
 *
 * As for OSN, this file is only the index: each entry points at a Markdown
 * body under `content/sma-coding/modules/`. `review` is required exactly
 * when the status is `disetujui` and forbidden otherwise, and is a role,
 * never a personal name (ADR-0004). Only a human may set `disetujui`
 * (ADR-0007).
 *
 * Referential checks (CP items exist, week codes exist, OSN families
 * exist, prerequisites resolve and are acyclic) need other corpus files
 * and live in `src/domain/sma-modules.ts`.
 *
 * Per the layering rules in `docs/architecture/README.md`, this module only
 * describes shape and constraints; it never imports from `src/domain/`.
 */

import { z } from "zod";
import { nonEmptyString, slugSchema } from "./common";
import { addLearnerSheetIssues } from "./learner-sheet-rules";
import {
  moduleExplicitReferenceSchema,
  moduleReviewSchema,
  moduleStatusSchema,
  ownStatusLearnerSheetShape,
} from "./module";
import {
  cpCodeSchema,
  SMA_CODING_PROGRAM_ID,
  SMA_FOUNDATION_BLOCK_ID,
  smaClassSchema,
  smaWeekCodeSchema,
} from "./sma-common";

/** The `sma-coding` programme's module-content directory, `content/sma-coding/modules/`. */
export const SMA_MODULE_CONTENT_DIR = `content/${SMA_CODING_PROGRAM_ID}/modules/`;

/** A foundation week code (`FND-X1-M2`), the only week code a module may name as a prerequisite. */
export const smaFoundationWeekCodeSchema = smaWeekCodeSchema.refine(
  (code) => code.startsWith(`${SMA_FOUNDATION_BLOCK_ID}-`),
  `must be a foundation week code such as "${SMA_FOUNDATION_BLOCK_ID}-X1-M2"`,
);

/** A prerequisite: another module's id, or a foundation week code. */
export const smaModulePrerequisiteSchema = z.union([slugSchema, smaFoundationWeekCodeSchema]);

function isUnique(values: readonly string[]): boolean {
  return new Set(values).size === values.length;
}

/**
 * Whether every `sma-coding` module must have a worksheet (`learnerSheetPath`, ADR-0011). `true` since
 * every `sma-coding` module has a worksheet (#289).
 */
export const SMA_LEARNER_SHEET_REQUIRED = true;

/** One `sma-coding` module-index entry. */
export const smaModuleSchema = z
  .object({
    id: slugSchema.describe("Stable module id; also the Markdown file's base name."),
    title: nonEmptyString,
    cpItems: z
      .array(cpCodeSchema)
      .describe(
        "CP item codes the module serves (checked against cp-elements.json). May be empty: a series module is not counted as meeting a CP item.",
      ),
    weekCodes: z
      .array(smaWeekCodeSchema)
      .describe(
        "Track or foundation week codes the module supports (checked against weeks.json and foundation.json). May be empty.",
      ),
    bridgeFamilies: z
      .array(slugSchema)
      .describe(
        "Ids of OSN topic families the module bridges to (checked against data/osn/topic-families.json). May be empty.",
      ),
    gradeLevels: z.array(smaClassSchema).min(1).describe("School classes the module is for."),
    prerequisites: z
      .array(smaModulePrerequisiteSchema)
      .describe(
        "Ids of other modules in the index, or foundation week codes; may be empty; no cycles (checked by `osn validate`).",
      ),
    audience: z.literal("siswa"),
    language: z.literal("id"),
    status: moduleStatusSchema,
    review: moduleReviewSchema
      .optional()
      .describe("Required when status is `disetujui`, forbidden otherwise."),
    references: z.array(moduleExplicitReferenceSchema).min(1),
    contentPath: nonEmptyString.describe("`content/sma-coding/modules/<id>.md`."),
    ...ownStatusLearnerSheetShape,
  })
  .strict()
  .refine((module) => (module.status === "disetujui") === (module.review !== undefined), {
    path: ["review"],
    message:
      "`review` (approvedOn + reviewerRole) is required when status is `disetujui` and forbidden otherwise (ADR-0007)",
  })
  .refine((module) => module.contentPath === `${SMA_MODULE_CONTENT_DIR}${module.id}.md`, {
    path: ["contentPath"],
    message: `must be "${SMA_MODULE_CONTENT_DIR}<id>.md" with <id> equal to the module id`,
  })
  .superRefine((module, ctx) => {
    addLearnerSheetIssues(module, ctx, {
      programId: SMA_CODING_PROGRAM_ID,
      required: SMA_LEARNER_SHEET_REQUIRED,
    });
    const lists = {
      cpItems: module.cpItems,
      weekCodes: module.weekCodes,
      bridgeFamilies: module.bridgeFamilies,
      gradeLevels: module.gradeLevels,
      prerequisites: module.prerequisites,
    };
    for (const [field, values] of Object.entries(lists)) {
      if (!isUnique(values)) {
        ctx.addIssue({ code: "custom", path: [field], message: `${field} must be unique` });
      }
    }
  });
export type SmaModule = z.infer<typeof smaModuleSchema>;

/** The whole `data/sma-coding/modules.json` file. */
export const smaModulesFileSchema = z
  .object({
    modules: z.array(smaModuleSchema),
  })
  .strict()
  .refine((file) => isUnique(file.modules.map((module) => module.id)), {
    path: ["modules"],
    message: "module ids must be unique",
  })
  .describe(
    "The full contents of `data/sma-coding/modules.json`: the sma-coding learning-module index.",
  );
export type SmaModulesFile = z.infer<typeof smaModulesFileSchema>;
