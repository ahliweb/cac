/**
 * Schema for the `tk-coding` learning-module index,
 * `data/tk-coding/modules.json` (ADR-0007, ADR-0006, ADR-0008).
 *
 * A `tk-coding` module is a **teacher guide** (`audience: "guru"`): TK
 * children do not read it. Each guide has a separate **learner sheet** for
 * the child, `content/tk-coding/lembar/<id>.md`, which carries no name or
 * identity field of the child (enforced by the renderer and
 * `osn validate`).
 *
 * One module serves one week (`weekCodes` holds exactly one `TK-…` code, and
 * `id` is its lower-case form: `tk-a1-m1`). `cpOverlap` records the CP Fase
 * Fondasi items the week *overlaps* in the author's interpretation
 * (`cpRelation: "irisan-penafsiran"`, silabus bagian 4): never a claim that
 * a CP item is met (`meetsCp: false`), which is why the field is not called
 * `cpItems`. `src/domain/tk-modules.ts` checks it is a subset of the week's
 * own `cp`.
 *
 * `review` is required exactly when the status is `disetujui` and forbidden
 * otherwise, and is a role, never a personal name (ADR-0004). Only a human
 * may set `disetujui` (ADR-0007).
 *
 * Referential checks (week codes, CP codes, prerequisites, acyclicity) need
 * other corpus files and live in `src/domain/tk-modules.ts`. Shape only;
 * never imports from `src/domain/`.
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
import { TK_CODING_PROGRAM_ID, tkCpCodeSchema, tkGroupSchema, tkWeekCodeSchema } from "./tk-common";

/** The `tk-coding` module-content directory, `content/tk-coding/modules/`. */
export const TK_MODULE_CONTENT_DIR = moduleContentDir(TK_CODING_PROGRAM_ID);

/** The `tk-coding` learner-sheet directory, `content/tk-coding/lembar/`. */
export const TK_LEMBAR_DIR = moduleLembarDir(TK_CODING_PROGRAM_ID);

/** A prerequisite: another module's id, or a week code of the programme. */
export const tkModulePrerequisiteSchema = z.union([slugSchema, tkWeekCodeSchema]);

/** One `tk-coding` module-index entry. */
export const tkModuleSchema = z
  .object({
    id: slugSchema.describe("Stable module id: the lower-case week code, e.g. `tk-a1-m1`."),
    ...programModuleLifecycleShape,
    weekCodes: z
      .array(tkWeekCodeSchema)
      .length(1)
      .describe("The one week code (`TK-A1-M1`) the module serves (checked against weeks.json)."),
    cpOverlap: z
      .array(tkCpCodeSchema)
      .describe(
        "CP Fase Fondasi items the week overlaps in the author's interpretation (a subset of the week's `cp`). Overlap, never fulfilment (meetsCp: false). May be empty.",
      ),
    groups: z.array(tkGroupSchema).min(1).describe('Age group of the week: exactly "A" or "B".'),
    prerequisites: z
      .array(z.union([slugSchema, tkWeekCodeSchema]))
      .describe(
        "Ids of other modules in the index, or week codes; may be empty; no cycles (checked by `osn validate`).",
      ),
    audience: z.literal("guru"),
    contentPath: nonEmptyString.describe(
      "`content/tk-coding/modules/<id>.md` (the teacher guide).",
    ),
    learnerSheetPath: nonEmptyString.describe(
      "`content/tk-coding/lembar/<id>.md` (the child's sheet; no name or identity field).",
    ),
  })
  .strict()
  .superRefine((module, ctx) => {
    addCommonModuleIssues(module, ctx, {
      programId: TK_CODING_PROGRAM_ID,
      unitCodes: module.weekCodes,
      requiresLearnerSheet: true,
      uniqueLists: {
        weekCodes: module.weekCodes,
        cpOverlap: module.cpOverlap,
        groups: module.groups,
        prerequisites: module.prerequisites,
      },
    });
    const [week] = module.weekCodes;
    if (week !== undefined) {
      const group = week.charAt(3);
      if (module.groups.length !== 1 || module.groups[0] !== group) {
        ctx.addIssue({
          code: "custom",
          path: ["groups"],
          message: `must be exactly ["${group}"], the age group of week "${week}"`,
        });
      }
    }
  });
export type TkModule = z.infer<typeof tkModuleSchema>;

/** The whole `data/tk-coding/modules.json` file. */
export const tkModulesFileSchema = z
  .object({ modules: z.array(tkModuleSchema) })
  .strict()
  .refine((file) => isUnique(file.modules.map((module) => module.id)), {
    path: ["modules"],
    message: DUPLICATE_MODULE_ID_MESSAGE,
  })
  .describe(
    "The full contents of `data/tk-coding/modules.json`: the tk-coding learning-module index.",
  );
export type TkModulesFile = z.infer<typeof tkModulesFileSchema>;
