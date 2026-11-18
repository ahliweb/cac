/**
 * End-to-end tests for the `dewasa-coding` programme at the CLI (#131):
 * `osn validate` covers it (alone and together with the other programmes),
 * a corrupted copy of the corpus is reported with exit 1, and `privacy-check`
 * stays clean.
 */

import { describe, expect, test } from "bun:test";
import { cp, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

const REPO_ROOT = join(import.meta.dir, "..", "..");
const CLI_ENTRYPOINT = join(REPO_ROOT, "src", "cli", "index.ts");

interface CliResult {
  readonly stdout: string;
  readonly stderr: string;
  readonly exitCode: number;
}

async function runCli(args: readonly string[]): Promise<CliResult> {
  const proc = Bun.spawn(["bun", "run", CLI_ENTRYPOINT, ...args], {
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

describe("osn validate with the dewasa-coding programme", () => {
  test("--program dewasa-coding validates its seven files, exit 0", async () => {
    const result = await runCli(["validate", "--program", "dewasa-coding"]);
    expect(result.exitCode).toBe(0);
    expect(result.stdout).toContain('programme "dewasa-coding"');
    expect(result.stdout).toContain("7 data file(s) validated, 0 problem(s) found");
  });

  test("--json reports ok, no unregistered file and the programme among all", async () => {
    const one = await runCli(["validate", "--program", "dewasa-coding", "--json"]);
    expect(one.exitCode).toBe(0);
    const json = JSON.parse(one.stdout) as {
      ok: boolean;
      program: string;
      summary: { filesValidated: number; filesUnregistered: number };
    };
    expect(json.ok).toBe(true);
    expect(json.program).toBe("dewasa-coding");
    expect(json.summary.filesValidated).toBe(7);
    expect(json.summary.filesUnregistered).toBe(0);

    const all = await runCli(["validate", "--json"]);
    expect(all.exitCode).toBe(0);
    const parsed = JSON.parse(all.stdout) as { programs: Array<{ program: string }> };
    expect(parsed.programs.map((entry) => entry.program)).toContain("dewasa-coding");
  });

  test("a corrupted copy of the corpus is reported with exit 1", async () => {
    const dir = await mkdtemp(join(tmpdir(), "dw-validate-fixture-"));
    try {
      await cp(join(REPO_ROOT, "data", "dewasa-coding"), dir, { recursive: true });
      const path = join(dir, "module-plan.json");
      const file = JSON.parse(await readFile(path, "utf-8"));
      file.modules[0].prerequisites = ["DW-PKJ-M99"];
      file.syllabusVersion = "9.9";
      await writeFile(path, JSON.stringify(file, null, 2));
      const result = await runCli(["validate", "--program", "dewasa-coding", "--data-dir", dir]);
      expect(result.exitCode).toBe(1);
      expect(result.stdout).toContain("module-plan.json");
      expect(result.stdout).toContain("DW-PKJ-M99");
      expect(result.stdout).toContain("9.9");
    } finally {
      await rm(dir, { recursive: true, force: true });
    }
  });
});

describe("osn privacy-check with the dewasa-coding corpus", () => {
  test("finds no direct-identifier-shaped key", async () => {
    const result = await runCli(["privacy-check"]);
    expect(result.exitCode).toBe(0);
    expect(result.stdout).toContain("0 direct-identifier-shaped key(s) found");
  });
});
