/**
 * Schema for the `dewasa-coding` learning-module index,
 * `data/dewasa-coding/modules.json` (ADR-0007, ADR-0006, ADR-0008).
 *
 * Not to be confused with `dw-module.ts`, which describes
 * `module-plan.json`: the syllabus's own table of modules (hours, outcomes).
 * This file indexes the authored learning content of those modules.
 *
 * A `dewasa-coding` module is read by the participant (`audience:
 * "peserta"`). One module serves one syllabus module (`moduleCodes` holds
 * exactly one `DW-…` code, including the shared `DW-FND-M1`; `id` is its
 * lower-case form: `dw-pro-m1`, `dw-fnd-m1`). `skkniUnits` holds SKKNI
 * 282/2016 unit codes and may name only the units `module-plan.json` maps to
 * that module (track PRO), at unit-title depth only: a touched unit is never
 * a certified competence. `src/domain/dw-modules.ts` reports every
 * violation.
 *
 * `review` is required exactly when the status is `disetujui` and forbidden
 * otherwise, and is a role, never a personal name (ADR-0004). Only a human
 * may set `disetujui` (ADR-0007).
 *
 * Shape only; never imports from `src/domain/`.
 */

import { z } from "zod";
import { nonEmptyString, slugSchema } from "./common";
import {
  DEWASA_CODING_PROGRAM_ID,
  DW_SHARED_TRACK_ID,
  DW_TRACK_IDS,
  dwModuleCodeSchema,
  dwSkkniUnitCodeSchema,
} from "./dw-common";
import {
  addCommonModuleIssues,
  DUPLICATE_MODULE_ID_MESSAGE,
  isUnique,
  moduleContentDir,
  ownStatusLearnerSheetShape,
  programModuleLifecycleShape,
} from "./program-module-common";

/** The `dewasa-coding` module-content directory, `content/dewasa-coding/modules/`. */
export const DW_MODULE_CONTENT_DIR = moduleContentDir(DEWASA_CODING_PROGRAM_ID);

/** The track a module belongs to: a persona track or the shared pseudo-track `FND`. */
export const dwModuleTrackSchema = z
  .enum([...DW_TRACK_IDS, DW_SHARED_TRACK_ID])
  .describe('"PKJ", "PRO", "PRS", "BIS" or "FND" (the shared module).');

/**
 * Whether every `dewasa-coding` module must have a worksheet (`learnerSheetPath`, ADR-0011). `false` until the
 * programme's worksheets are written; a later per-programme change flips it.
 */
export const DW_LEARNER_SHEET_REQUIRED = false;

/** One `dewasa-coding` module-index entry. */
export const dwLearningModuleSchema = z
  .object({
    id: slugSchema.describe("Stable module id: the lower-case module code, e.g. `dw-pro-m1`."),
    ...programModuleLifecycleShape,
    moduleCodes: z
      .array(dwModuleCodeSchema)
      .length(1)
      .describe(
        "The one module code (`DW-PRO-M1`, or the shared `DW-FND-M1`) the module serves (checked against module-plan.json and shared.json).",
      ),
    skkniUnits: z
      .array(dwSkkniUnitCodeSchema)
      .describe(
        "SKKNI 282/2016 unit codes the module touches: only those module-plan.json maps to it (track PRO), to unit-title depth. Empty for every other module.",
      ),
    track: dwModuleTrackSchema.describe("The track of the module code."),
    prerequisites: z
      .array(z.union([slugSchema, dwModuleCodeSchema]))
      .describe(
        "Ids of other modules in the index, or module codes; may be empty; no cycles (checked by `osn validate`).",
      ),
    audience: z.literal("peserta"),
    contentPath: nonEmptyString.describe("`content/dewasa-coding/modules/<id>.md`."),
    ...ownStatusLearnerSheetShape,
  })
  .strict()
  .superRefine((module, ctx) => {
    addCommonModuleIssues(module, ctx, {
      programId: DEWASA_CODING_PROGRAM_ID,
      ownStatusLearnerSheet: { required: DW_LEARNER_SHEET_REQUIRED },
      unitCodes: module.moduleCodes,
      uniqueLists: {
        moduleCodes: module.moduleCodes,
        skkniUnits: module.skkniUnits,
        prerequisites: module.prerequisites,
      },
    });
    const [code] = module.moduleCodes;
    if (code !== undefined) {
      const track = code.split("-")[1];
      if (module.track !== track) {
        ctx.addIssue({
          code: "custom",
          path: ["track"],
          message: `must be "${track}", the track of module code "${code}"`,
        });
      }
    }
  });
export type DwLearningModule = z.infer<typeof dwLearningModuleSchema>;

/** The whole `data/dewasa-coding/modules.json` file. */
export const dwLearningModulesFileSchema = z
  .object({ modules: z.array(dwLearningModuleSchema) })
  .strict()
  .refine((file) => isUnique(file.modules.map((module) => module.id)), {
    path: ["modules"],
    message: DUPLICATE_MODULE_ID_MESSAGE,
  })
  .describe(
    "The full contents of `data/dewasa-coding/modules.json`: the dewasa-coding learning-module index.",
  );
export type DwLearningModulesFile = z.infer<typeof dwLearningModulesFileSchema>;
