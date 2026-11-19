/**
 * The output side of `osn render modul`: turns one loaded module (see
 * `loadModule` in `src/cli/module-content.ts`) into the Markdown that the
 * command prints, either the module itself or, with `--lembar` (`tk-coding`
 * and `sd-coding`), the child's learner sheet. Flag parsing and corpus
 * loading stay in `src/cli/commands/render.ts`; the rendering is pure
 * (`src/render/module.ts`).
 */

import { RenderRequestError } from "../render/errors";
import { renderModule, renderModuleLearnerSheet } from "../render/module";
import type { CommandContext } from "./command";
import { cliOf, EXIT_USAGE_ERROR, EXIT_VALIDATION_FAILURE } from "./command";
import type { ModuleLoadResult } from "./module-content";

export type ModuleOutput =
  | { readonly ok: true; readonly content: string }
  | { readonly ok: false; readonly exitCode: number };

/**
 * The Markdown of `loaded` for programme `program`; on a problem the message
 * is written to `ctx.stderr` and the exit code returned: 2 when the module
 * has no learner sheet, 1 when its sheet carries a name or identity field of
 * the child (the sheet is refused, nothing is printed).
 */
export function buildModuleOutput(
  loaded: Extract<ModuleLoadResult, { ok: true }>,
  lembar: boolean,
  program: { readonly id: string; readonly name: string },
  ctx: CommandContext,
): ModuleOutput {
  if (!lembar) {
    return {
      ok: true,
      content: renderModule(loaded.module, loaded.body, loaded.references, program),
    };
  }
  if (loaded.learnerSheet === undefined) {
    ctx.stderr(`${cliOf(ctx)} render modul: module "${loaded.module.id}" has no learner sheet.\n`);
    return { ok: false, exitCode: EXIT_USAGE_ERROR };
  }
  try {
    return {
      ok: true,
      content: renderModuleLearnerSheet(loaded.module, loaded.learnerSheet.body, program),
    };
  } catch (cause) {
    if (cause instanceof RenderRequestError) {
      ctx.stderr(`${cliOf(ctx)} render modul: ${cause.message}\n`);
      return { ok: false, exitCode: EXIT_VALIDATION_FAILURE };
    }
    throw cause;
  }
}
