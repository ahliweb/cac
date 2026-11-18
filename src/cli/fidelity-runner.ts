/**
 * `bun run check:fidelity [--program <id>]` (ADR-0008, issue #140): runs the
 * fidelity module of one programme, or of every registered programme that
 * has one, as listed in the programme table (`src/cli/program-registry.ts`).
 * The script `scripts/check-fidelity.ts` is only the process shell around
 * {@link runFidelityCheck}, which takes its output streams and the
 * repository root as arguments so tests can run it in-process.
 *
 * Exit codes follow the CLI: 0 clean, 1 at least one mismatch, 2 usage error
 * (unknown programme, a programme without a fidelity module, a programme
 * that is not registered in `data/programs.json`, an unreadable registry).
 */

import { EXIT_SUCCESS, EXIT_USAGE_ERROR, EXIT_VALIDATION_FAILURE } from "./command";
import { DATA_ROOT, extractProgramFlag, loadProgramRegistry, REPO_ROOT } from "./program-loader";
import { fidelityProgramIds, findProgramModule } from "./program-registry";

export interface FidelityIo {
  readonly stdout: (text: string) => void;
  readonly stderr: (text: string) => void;
}

/** Runs the check for `args` (`--program <id>` optional) and returns the exit code. */
export async function runFidelityCheck(
  args: readonly string[],
  io: FidelityIo,
  repoRoot: string = REPO_ROOT,
  dataRoot: string = DATA_ROOT,
): Promise<number> {
  const { rest, value } = extractProgramFlag(args);
  if (value === null) {
    io.stderr("check:fidelity: --program requires a programme id argument.\n");
    return EXIT_USAGE_ERROR;
  }
  if (rest.length > 0) {
    io.stderr(
      `check:fidelity: unexpected argument "${rest[0]}". Usage: check:fidelity [--program <id>].\n`,
    );
    return EXIT_USAGE_ERROR;
  }

  const loaded = await loadProgramRegistry(dataRoot);
  if (!loaded.ok) {
    io.stderr(`check:fidelity: ${loaded.message}\n`);
    return EXIT_USAGE_ERROR;
  }
  const registered = new Set(loaded.registry.programs.map((program) => program.id));
  const withFidelity = fidelityProgramIds().filter((id) => registered.has(id));
  const available = withFidelity.join(", ") || "(none)";

  let ids: string[];
  if (value === undefined) {
    ids = withFidelity;
  } else {
    if (!registered.has(value)) {
      io.stderr(
        `check:fidelity: programme "${value}" is not registered in data/programs.json. ` +
          `Programmes with a fidelity check: ${available}.\n`,
      );
      return EXIT_USAGE_ERROR;
    }
    if (findProgramModule(value)?.fidelity === undefined) {
      io.stderr(
        `check:fidelity: programme "${value}" has no fidelity module. ` +
          `Programmes with a fidelity check: ${available}.\n`,
      );
      return EXIT_USAGE_ERROR;
    }
    ids = [value];
  }

  let failed = false;
  for (const id of ids) {
    const fidelity = findProgramModule(id)?.fidelity;
    if (fidelity === undefined) {
      continue;
    }
    const run = await fidelity.run(repoRoot);
    io.stdout(`${run.message}\n`);
    failed ||= run.problems.length > 0;
  }
  return failed ? EXIT_VALIDATION_FAILURE : EXIT_SUCCESS;
}
