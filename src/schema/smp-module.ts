/**
 * Schema for the `smp-coding` learning-module index,
 * `data/smp-coding/modules.json` (ADR-0007, ADR-0006, ADR-0008).
 *
 * A `smp-coding` module is read by the pupil (`audience: "siswa"`). One
 * module serves one week (`weekCodes` holds exactly one
 * `SMP<kelas>-<semester>-M<n>` code; `id` is its lower-case form:
 * `smp7-1-m1`). `cpCodes` may name only the CP items that `weeks.json` maps
 * to that week as covered; an enrichment (`pengayaan`) week, or an item
 * written `*` (Python, beyond the CP wording), never claims a CP item.
 * `src/domain/smp-modules.ts` reports every violation.
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
  ownStatusLearnerSheetShape,
  programModuleLifecycleShape,
} from "./program-module-common";
import {
  SMP_CODING_PROGRAM_ID,
  smpClassSchema,
  smpCpCodeSchema,
  smpWeekCodeSchema,
} from "./smp-common";

/** The `smp-coding` module-content directory, `content/smp-coding/modules/`. */
export const SMP_MODULE_CONTENT_DIR = moduleContentDir(SMP_CODING_PROGRAM_ID);

/**
 * Whether every `smp-coding` module must have a worksheet (`learnerSheetPath`, ADR-0011). `true` since
 * every `smp-coding` module has a worksheet (#288).
 */
export const SMP_LEARNER_SHEET_REQUIRED = true;

/** One `smp-coding` module-index entry. */
export const smpModuleSchema = z
  .object({
    id: slugSchema.describe("Stable module id: the lower-case week code, e.g. `smp7-1-m1`."),
    ...programModuleLifecycleShape,
    weekCodes: z
      .array(smpWeekCodeSchema)
      .length(1)
      .describe("The one week code (`SMP7-1-M1`) the module serves (checked against weeks.json)."),
    cpCodes: z
      .array(smpCpCodeSchema)
      .describe(
        "CP items the module counts towards covering: only those weeks.json maps to its week as covered. Empty for an enrichment or a Python-only week.",
      ),
    gradeLevels: z
      .array(smpClassSchema)
      .min(1)
      .describe("The class (kelas) of the week; exactly one value."),
    prerequisites: z
      .array(z.union([slugSchema, smpWeekCodeSchema]))
      .describe(
        "Ids of other modules in the index, or week codes; may be empty; no cycles (checked by `osn validate`).",
      ),
    audience: z.literal("siswa"),
    contentPath: nonEmptyString.describe("`content/smp-coding/modules/<id>.md`."),
    ...ownStatusLearnerSheetShape,
  })
  .strict()
  .superRefine((module, ctx) => {
    addCommonModuleIssues(module, ctx, {
      programId: SMP_CODING_PROGRAM_ID,
      ownStatusLearnerSheet: { required: SMP_LEARNER_SHEET_REQUIRED },
      unitCodes: module.weekCodes,
      uniqueLists: {
        weekCodes: module.weekCodes,
        cpCodes: module.cpCodes,
        gradeLevels: module.gradeLevels,
        prerequisites: module.prerequisites,
      },
    });
    const [week] = module.weekCodes;
    if (week !== undefined) {
      const kelas = week.charAt(3);
      if (module.gradeLevels.length !== 1 || module.gradeLevels[0] !== kelas) {
        ctx.addIssue({
          code: "custom",
          path: ["gradeLevels"],
          message: `must be exactly ["${kelas}"], the class of week "${week}"`,
        });
      }
    }
  });
export type SmpModule = z.infer<typeof smpModuleSchema>;

/** The whole `data/smp-coding/modules.json` file. */
export const smpModulesFileSchema = z
  .object({ modules: z.array(smpModuleSchema) })
  .strict()
  .refine((file) => isUnique(file.modules.map((module) => module.id)), {
    path: ["modules"],
    message: DUPLICATE_MODULE_ID_MESSAGE,
  })
  .describe(
    "The full contents of `data/smp-coding/modules.json`: the smp-coding learning-module index.",
  );
export type SmpModulesFile = z.infer<typeof smpModulesFileSchema>;
