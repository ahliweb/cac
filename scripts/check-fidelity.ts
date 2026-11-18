/**
 * `bun run check:fidelity [--program <id>]` -- runs every programme's
 * fidelity module (data against its approved source document) from the
 * programme table, or only `--program <id>`. See
 * `src/cli/fidelity-runner.ts` and ADR-0008. Exits 0 clean, 1 on any
 * mismatch, 2 on a usage error.
 */

import { runFidelityCheck } from "../src/cli/fidelity-runner";

if (import.meta.main) {
  const code = await runFidelityCheck(Bun.argv.slice(2), {
    stdout: (text) => process.stdout.write(text),
    stderr: (text) => process.stderr.write(text),
  });
  process.exit(code);
}
