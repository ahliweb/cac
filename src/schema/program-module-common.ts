/**
 * Shared building blocks of the per-programme learning-module index schemas
 * (`tk-module.ts`, `sd-module.ts`, `smp-module.ts`, `kul-module.ts`,
 * `dw-learning-module.ts`; ADR-0007, ADR-0006, ADR-0008), modelled on
 * `sma-module.ts`.
 *
 * Why shared pieces at all: each programme keeps its **own** index shape
 * (its own unit code, CP/KA/SKKNI vocabulary and reader), but the ADR-0007
 * rules are one definition, as the `sma-coding` schema already imports the
 * lifecycle statuses and review record from `./module`: `review` exists
 * exactly when the status is `disetujui`, a `contentPath` lies under the
 * programme's own `content/<program>/modules/` and is named after the
 * module id, and one module serves exactly one programme unit, so its id is
 * the lower-case form of that unit's code.
 *
 * Shape only; never imports from `src/domain/` (layering rules,
 * `docs/architecture/README.md`).
 */

import { z } from "zod";
import { nonEmptyString } from "./common";
import { moduleExplicitReferenceSchema, moduleReviewSchema, moduleStatusSchema } from "./module";

/** The module-content directory of programme `programId`, `content/<id>/modules/`. */
export function moduleContentDir(programId: string): string {
  return `content/${programId}/modules/`;
}

/** The learner-sheet directory of programme `programId`, `content/<id>/lembar/` (tk-coding, sd-coding). */
export function moduleLembarDir(programId: string): string {
  return `content/${programId}/lembar/`;
}

/**
 * The module id of a programme-unit code: lower case, dots replaced by
 * hyphens. `TK-A1-M1` -> `tk-a1-m1`, `KUL-U-101` -> `kul-u-101`,
 * `DW-FND-M1` -> `dw-fnd-m1`.
 */
export function unitCodeToModuleId(code: string): string {
  return code.toLowerCase().replaceAll(".", "-");
}

/** Whether every value of `values` occurs once. */
export function isUnique(values: readonly string[]): boolean {
  return new Set(values).size === values.length;
}

/** The fields every programme's module entry has in the same form (the ADR-0007 lifecycle and sources). */
export const programModuleLifecycleShape = {
  title: nonEmptyString,
  language: z.literal("id"),
  status: moduleStatusSchema,
  review: moduleReviewSchema
    .optional()
    .describe("Required when status is `disetujui`, forbidden otherwise."),
  references: z.array(moduleExplicitReferenceSchema).min(1),
};

/** What {@link addCommonModuleIssues} reads of an entry. */
interface CommonModuleFields {
  readonly id: string;
  readonly status: string;
  readonly review?: unknown;
  readonly contentPath: string;
  readonly learnerSheetPath?: string | undefined;
}

/** Options for {@link addCommonModuleIssues}. */
interface CommonModuleOptions {
  readonly programId: string;
  /** The unit code(s) the module serves; the id must be the lower-case form of the only one. */
  readonly unitCodes: readonly string[];
  /** Fields that must hold unique values, by field name. */
  readonly uniqueLists: Readonly<Record<string, readonly string[]>>;
  /** When `true`, `learnerSheetPath` must be `content/<program>/lembar/<id>.md`. */
  readonly requiresLearnerSheet?: boolean;
}

/** Adds the rules every programme's module entry shares (see the file docblock) to `ctx`. */
export function addCommonModuleIssues(
  module: CommonModuleFields,
  ctx: z.RefinementCtx,
  options: CommonModuleOptions,
): void {
  if ((module.status === "disetujui") !== (module.review !== undefined)) {
    ctx.addIssue({
      code: "custom",
      path: ["review"],
      message:
        "`review` (approvedOn + reviewerRole) is required when status is `disetujui` and forbidden otherwise (ADR-0007)",
    });
  }
  if (module.contentPath !== `${moduleContentDir(options.programId)}${module.id}.md`) {
    ctx.addIssue({
      code: "custom",
      path: ["contentPath"],
      message: `must be "${moduleContentDir(options.programId)}<id>.md" with <id> equal to the module id`,
    });
  }
  if (
    options.requiresLearnerSheet === true &&
    module.learnerSheetPath !== `${moduleLembarDir(options.programId)}${module.id}.md`
  ) {
    ctx.addIssue({
      code: "custom",
      path: ["learnerSheetPath"],
      message: `must be "${moduleLembarDir(options.programId)}<id>.md" with <id> equal to the module id`,
    });
  }
  const [unitCode] = options.unitCodes;
  if (options.unitCodes.length === 1 && unitCode !== undefined) {
    const expected = unitCodeToModuleId(unitCode);
    if (module.id !== expected) {
      ctx.addIssue({
        code: "custom",
        path: ["id"],
        message: `must be "${expected}", the lower-case form of the unit code "${unitCode}" (one module serves one unit)`,
      });
    }
  }
  for (const [field, values] of Object.entries(options.uniqueLists)) {
    if (!isUnique(values)) {
      ctx.addIssue({ code: "custom", path: [field], message: `${field} must be unique` });
    }
  }
}

/** The error text of the `modules` array's duplicate-id rule, shared by every file schema. */
export const DUPLICATE_MODULE_ID_MESSAGE = "module ids must be unique";
