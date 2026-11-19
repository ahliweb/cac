/**
 * Schema for the `sd-coding` learning-module index,
 * `data/sd-coding/modules.json` (ADR-0007, ADR-0006, ADR-0008).
 *
 * A `sd-coding` module is a **teacher guide** (`audience: "guru"`): the
 * pupils of SD do not read it. Each guide has a separate **learner sheet**,
 * `content/sd-coding/lembar/<id>.md`, carrying no name or identity field of
 * the child (enforced by the renderer and `osn validate`).
 *
 * One module serves one week (`weekCodes` holds exactly one
 * `SD<kelas>-<semester>-M<n>` code; `id` is its lower-case form:
 * `sd1-1-m1`). `cpItems` may name a CP item only when that week fulfils it
 * in `cp-mapping.json` (kelas 5-6, not a strengthening week); a kelas 1-4
 * week only introduces (`P-` codes) and never claims a CP item, so its
 * `cpItems` is empty. `src/domain/sd-modules.ts` reports every violation.
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
  addCommonModuleIssues,
  DUPLICATE_MODULE_ID_MESSAGE,
  isUnique,
  moduleContentDir,
  moduleLembarDir,
  programModuleLifecycleShape,
} from "./program-module-common";
import { SD_CODING_PROGRAM_ID, sdClassSchema, sdCpCodeSchema, sdWeekCodeSchema } from "./sd-common";

/** The `sd-coding` module-content directory, `content/sd-coding/modules/`. */
export const SD_MODULE_CONTENT_DIR = moduleContentDir(SD_CODING_PROGRAM_ID);

/** The `sd-coding` learner-sheet directory, `content/sd-coding/lembar/`. */
export const SD_LEMBAR_DIR = moduleLembarDir(SD_CODING_PROGRAM_ID);

/** One `sd-coding` module-index entry. */
export const sdModuleSchema = z
  .object({
    id: slugSchema.describe("Stable module id: the lower-case week code, e.g. `sd5-1-m3`."),
    ...programModuleLifecycleShape,
    weekCodes: z
      .array(sdWeekCodeSchema)
      .length(1)
      .describe("The one week code (`SD5-1-M3`) the module serves (checked against weeks.json)."),
    cpItems: z
      .array(sdCpCodeSchema)
      .describe(
        "CP items the module fulfils: only those `cp-mapping.json` maps to its week (kelas 5-6, not a strengthening week). Empty for kelas 1-4 and for `P-` introductions.",
      ),
    gradeLevels: z
      .array(sdClassSchema)
      .min(1)
      .describe("The class (kelas) of the week; exactly one value."),
    prerequisites: z
      .array(z.union([slugSchema, sdWeekCodeSchema]))
      .describe(
        "Ids of other modules in the index, or week codes; may be empty; no cycles (checked by `osn validate`).",
      ),
    audience: z.literal("guru"),
    contentPath: nonEmptyString.describe(
      "`content/sd-coding/modules/<id>.md` (the teacher guide).",
    ),
    learnerSheetPath: nonEmptyString.describe(
      "`content/sd-coding/lembar/<id>.md` (the pupil's sheet; no name or identity field).",
    ),
  })
  .strict()
  .superRefine((module, ctx) => {
    addCommonModuleIssues(module, ctx, {
      programId: SD_CODING_PROGRAM_ID,
      unitCodes: module.weekCodes,
      requiresLearnerSheet: true,
      uniqueLists: {
        weekCodes: module.weekCodes,
        cpItems: module.cpItems,
        gradeLevels: module.gradeLevels.map(String),
        prerequisites: module.prerequisites,
      },
    });
    const [week] = module.weekCodes;
    if (week !== undefined) {
      const kelas = Number(week.charAt(2));
      if (module.gradeLevels.length !== 1 || module.gradeLevels[0] !== kelas) {
        ctx.addIssue({
          code: "custom",
          path: ["gradeLevels"],
          message: `must be exactly [${kelas}], the class of week "${week}"`,
        });
      }
    }
  });
export type SdModule = z.infer<typeof sdModuleSchema>;

/** The whole `data/sd-coding/modules.json` file. */
export const sdModulesFileSchema = z
  .object({ modules: z.array(sdModuleSchema) })
  .strict()
  .refine((file) => isUnique(file.modules.map((module) => module.id)), {
    path: ["modules"],
    message: DUPLICATE_MODULE_ID_MESSAGE,
  })
  .describe(
    "The full contents of `data/sd-coding/modules.json`: the sd-coding learning-module index.",
  );
export type SdModulesFile = z.infer<typeof sdModulesFileSchema>;
