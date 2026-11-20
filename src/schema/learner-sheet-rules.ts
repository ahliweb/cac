/**
 * The rule of the **own-status learner sheet** (ADR-0011): the five
 * programmes whose modules learners read directly (`osn`, `smp-coding`,
 * `sma-coding`, `kuliah-coding`, `dewasa-coding`) may carry a printable
 * worksheet (`lembar kerja`) per module, `content/<program>/lembar/<id>.md`,
 * whose review status is **its own** (`learnerSheetStatus`), apart from the
 * module's. `tk-coding` and `sd-coding` do not use this: their sheet follows
 * the module status, so their schemas have no such fields.
 *
 * Three optional index fields share one rule:
 *
 *   - `learnerSheetPath`: when present, `content/<program>/lembar/<id>.md`
 *     with `<id>` the module id; absent is allowed unless the programme's
 *     schema flips {@link LearnerSheetRuleOptions.required} to `true` (a later
 *     per-programme change, once every module of it has a sheet);
 *   - `learnerSheetStatus`: required exactly when `learnerSheetPath` is
 *     present, forbidden otherwise;
 *   - `learnerSheetReview`: required exactly when `learnerSheetStatus` is
 *     `disetujui`, forbidden otherwise (ADR-0007: only a human approves).
 *
 * The rule is a plain function over the three fields, with no schema import,
 * so that both `module.ts` (OSN) and `program-module-common.ts` can use it
 * without a circular import. Shape only; never imports from `src/domain/`.
 */

import type { z } from "zod";

/** The learner-sheet directory of programme `programId`, `content/<id>/lembar/`. */
export function moduleLembarDir(programId: string): string {
  return `content/${programId}/lembar/`;
}

/** What {@link addLearnerSheetIssues} reads of an entry. */
export interface LearnerSheetFields {
  readonly id: string;
  readonly learnerSheetPath?: string | undefined;
  readonly learnerSheetStatus?: string | undefined;
  readonly learnerSheetReview?: unknown;
}

/** Options for {@link addLearnerSheetIssues}. */
export interface LearnerSheetRuleOptions {
  readonly programId: string;
  /** When `true`, every module must have a sheet (`learnerSheetPath` is then required). */
  readonly required: boolean;
}

/** Adds the issues of the own-status learner-sheet rule (see the file docblock) to `ctx`. */
export function addLearnerSheetIssues(
  module: LearnerSheetFields,
  ctx: z.RefinementCtx,
  options: LearnerSheetRuleOptions,
): void {
  const hasPath = module.learnerSheetPath !== undefined;
  const expected = `${moduleLembarDir(options.programId)}${module.id}.md`;
  if (hasPath ? module.learnerSheetPath !== expected : options.required) {
    ctx.addIssue({
      code: "custom",
      path: ["learnerSheetPath"],
      message: `must be "${moduleLembarDir(options.programId)}<id>.md" with <id> equal to the module id`,
    });
  }
  if (hasPath !== (module.learnerSheetStatus !== undefined)) {
    ctx.addIssue({
      code: "custom",
      path: ["learnerSheetStatus"],
      message: "`learnerSheetStatus` is required exactly when `learnerSheetPath` is present",
    });
  }
  if ((module.learnerSheetStatus === "disetujui") !== (module.learnerSheetReview !== undefined)) {
    ctx.addIssue({
      code: "custom",
      path: ["learnerSheetReview"],
      message:
        "`learnerSheetReview` (approvedOn + reviewerRole) is required when learnerSheetStatus is `disetujui` and forbidden otherwise (ADR-0007)",
    });
  }
}
