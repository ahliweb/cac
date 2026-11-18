/**
 * End-to-end tests for the `kuliah-coding` programme at the CLI (issue #130):
 * `osn validate --program kuliah-coding` and `bun run check:fidelity`.
 */

import { describe, expect, test } from "bun:test";
import { join } from "node:path";

const REPO_ROOT = join(import.meta.dir, "..", "..");

async function run(args: readonly string[]) {
  const proc = Bun.spawn(["bun", "run", ...args], {
    cwd: REPO_ROOT,
    stdout: "pipe",
    stderr: "pipe",
  });
  const [stdout, stderr, exitCode] = await Promise.all([
    new Response(proc.stdout).text(),
    new Response(proc.stderr).text(),
    proc.exited,
  ]);
  return { stdout, stderr, exitCode };
}

const CLI = join(REPO_ROOT, "src", "cli", "index.ts");
const FIDELITY = join(REPO_ROOT, "scripts", "check-fidelity.ts");

describe("osn validate with the kuliah-coding programme", () => {
  test("--program kuliah-coding validates its six files, exit 0", async () => {
    const result = await run([CLI, "validate", "--program", "kuliah-coding"]);
    expect(result.exitCode).toBe(0);
    expect(result.stdout).toContain('programme "kuliah-coding"');
    expect(result.stdout).toContain("6 data file(s) validated, 0 problem(s) found");
  });

  test("--program kuliah-coding --json reports ok and no unregistered file", async () => {
    const result = await run([CLI, "validate", "--program", "kuliah-coding", "--json"]);
    expect(result.exitCode).toBe(0);
    const json = JSON.parse(result.stdout) as {
      ok: boolean;
      program: string;
      summary: { filesValidated: number; filesUnregistered: number };
    };
    expect(json.ok).toBe(true);
    expect(json.program).toBe("kuliah-coding");
    expect(json.summary.filesValidated).toBe(6);
    expect(json.summary.filesUnregistered).toBe(0);
  });

  test("plain validate covers every registered programme, kuliah-coding included", async () => {
    const result = await run([CLI, "validate"]);
    expect(result.exitCode).toBe(0);
    expect(result.stdout).toContain("kuliah-coding");
  });
});

describe("check:fidelity with the kuliah-coding programme", () => {
  test("--program kuliah-coding is clean, exit 0", async () => {
    const result = await run([FIDELITY, "--program", "kuliah-coding"]);
    expect(result.exitCode).toBe(0);
    expect(result.stdout).toContain("check-kuliah-coding-fidelity: OK");
  });
});
