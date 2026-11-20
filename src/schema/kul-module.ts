/**
 * Schema for the `kuliah-coding` learning-module index,
 * `data/kuliah-coding/modules.json` (ADR-0007, ADR-0006, ADR-0008).
 *
 * A `kuliah-coding` module is read by the student (`audience:
 * "mahasiswa"`). One module serves one course (`courseCodes` holds exactly
 * one `KUL-<jalur>-<nnn>` code; `id` is its lower-case form: `kul-u-101`).
 * `knowledgeAreas` names CS2023 knowledge areas and may hold only those the
 * corpus maps to that course (the course's own `kaCodes`, or a link in
 * `knowledge-areas.json`); `semester` is the course's own semester.
 * `src/domain/kul-modules.ts` reports every violation.
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
  KUL_PROGRAM_ID,
  kulCourseCodeSchema,
  kulKnowledgeAreaCodeSchema,
  kulSemesterSchema,
} from "./kul-common";
import {
  addCommonModuleIssues,
  DUPLICATE_MODULE_ID_MESSAGE,
  isUnique,
  moduleContentDir,
  ownStatusLearnerSheetShape,
  programModuleLifecycleShape,
} from "./program-module-common";

/** The `kuliah-coding` module-content directory, `content/kuliah-coding/modules/`. */
export const KUL_MODULE_CONTENT_DIR = moduleContentDir(KUL_PROGRAM_ID);

/**
 * Whether every `kuliah-coding` module must have a worksheet (`learnerSheetPath`, ADR-0011). `true` since
 * every `kuliah-coding` module has a worksheet (#287).
 */
export const KUL_LEARNER_SHEET_REQUIRED = true;

/** One `kuliah-coding` module-index entry. */
export const kulModuleSchema = z
  .object({
    id: slugSchema.describe("Stable module id: the lower-case course code, e.g. `kul-u-101`."),
    ...programModuleLifecycleShape,
    courseCodes: z
      .array(kulCourseCodeSchema)
      .length(1)
      .describe(
        "The one course code (`KUL-U-101`) the module serves (checked against courses.json).",
      ),
    knowledgeAreas: z
      .array(kulKnowledgeAreaCodeSchema)
      .describe(
        "CS2023 knowledge areas the module touches: only those the corpus maps to its course. May be empty.",
      ),
    semester: kulSemesterSchema.describe(
      "The course's semester `S1`..`S8` (checked against courses.json).",
    ),
    prerequisites: z
      .array(z.union([slugSchema, kulCourseCodeSchema]))
      .describe(
        "Ids of other modules in the index, or course codes; may be empty; no cycles (checked by `osn validate`).",
      ),
    audience: z.literal("mahasiswa"),
    contentPath: nonEmptyString.describe("`content/kuliah-coding/modules/<id>.md`."),
    ...ownStatusLearnerSheetShape,
  })
  .strict()
  .superRefine((module, ctx) => {
    addCommonModuleIssues(module, ctx, {
      programId: KUL_PROGRAM_ID,
      ownStatusLearnerSheet: { required: KUL_LEARNER_SHEET_REQUIRED },
      unitCodes: module.courseCodes,
      uniqueLists: {
        courseCodes: module.courseCodes,
        knowledgeAreas: module.knowledgeAreas,
        prerequisites: module.prerequisites,
      },
    });
  });
export type KulModule = z.infer<typeof kulModuleSchema>;

/** The whole `data/kuliah-coding/modules.json` file. */
export const kulModulesFileSchema = z
  .object({ modules: z.array(kulModuleSchema) })
  .strict()
  .refine((file) => isUnique(file.modules.map((module) => module.id)), {
    path: ["modules"],
    message: DUPLICATE_MODULE_ID_MESSAGE,
  })
  .describe(
    "The full contents of `data/kuliah-coding/modules.json`: the kuliah-coding learning-module index.",
  );
export type KulModulesFile = z.infer<typeof kulModulesFileSchema>;
