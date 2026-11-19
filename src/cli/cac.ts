#!/usr/bin/env bun
/**
 * The `cac` command-line entrypoint: the canonical name of the CLI
 * (issue #251). Like `osn.ts`/`index.ts` it is a thin shell around the one
 * shared `runCli`, differing only in the caller name it passes.
 */

import { runCli } from "./run-cli";

if (import.meta.main) {
  const exitCode = await runCli(process.argv.slice(2), {
    stdout: (text) => {
      process.stdout.write(text);
    },
    stderr: (text) => {
      process.stderr.write(text);
    },
    cwd: process.cwd(),
    cli: "cac",
  });
  process.exit(exitCode);
}
