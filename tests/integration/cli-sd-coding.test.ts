/**
 * End-to-end tests for the `sd-coding` programme at the CLI (issue #128):
 * `osn validate --program sd-coding` covers its five files, the
 * all-programmes run includes it, and a drifted copy of the corpus is
 * refused with exit 1.
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

describe("osn validate with the sd-coding programme", () => {
  test("--program sd-coding validates its five files, exit 0", async () => {
    const result = await runCli(["validate", "--program", "sd-coding"]);
    expect(result.exitCode).toBe(0);
    expect(result.stdout).toContain('programme "sd-coding"');
    expect(result.stdout).toContain("5 data file(s) validated, 0 problem(s) found");
  });

  test("--program sd-coding --json reports ok and no unregistered file", async () => {
    const result = await runCli(["validate", "--program", "sd-coding", "--json"]);
    expect(result.exitCode).toBe(0);
    const json = JSON.parse(result.stdout) as {
      ok: boolean;
      program: string;
      summary: { filesValidated: number; filesUnregistered: number };
    };
    expect(json.ok).toBe(true);
    expect(json.program).toBe("sd-coding");
    expect(json.summary.filesValidated).toBe(5);
    expect(json.summary.filesUnregistered).toBe(0);
  });

  test("validate without flags includes sd-coding among the registered programmes", async () => {
    const result = await runCli(["validate", "--json"]);
    expect(result.exitCode).toBe(0);
    const json = JSON.parse(result.stdout) as { ok: boolean; programs: Array<{ program: string }> };
    expect(json.programs.map((entry) => entry.program)).toContain("sd-coding");
  });

  test("a corpus copy that credits an introduction as CP coverage is refused, exit 1", async () => {
    const dir = await mkdtemp(join(tmpdir(), "osn-sd-"));
    try {
      await cp(join(REPO_ROOT, "data", "sd-coding"), dir, { recursive: true });
      const path = join(dir, "weeks.json");
      const file = JSON.parse(await readFile(path, "utf-8")) as {
        weeks: Array<{ id: string; introduces: string[]; cpItems: string[] }>;
      };
      const target = file.weeks.find((entry) => entry.id === "SD4-1-M1");
      if (target === undefined) {
        throw new Error("SD4-1-M1 missing");
      }
      target.introduces = [];
      target.cpItems = ["C-BK-a"];
      await writeFile(path, JSON.stringify(file));
      const result = await runCli(["validate", "--program", "sd-coding", "--data-dir", dir]);
      expect(result.exitCode).toBe(1);
      expect(result.stdout).toContain("outside the CP");
    } finally {
      await rm(dir, { recursive: true, force: true });
    }
  });
});

describe("osn validate: cross-programme codes in the sd-coding bridges (ADR-0010, #177)", () => {
  test("an smp-coding week that does not exist is reported with exit 1", async () => {
    const dir = await mkdtemp(join(tmpdir(), "sd-crossref-fixture-"));
    try {
      await cp(join(REPO_ROOT, "data", "sd-coding"), dir, { recursive: true });
      const path = join(dir, "bridges.json");
      const file = JSON.parse(await readFile(path, "utf-8"));
      file.bridges[1].text += " Lihat `SMP7-1-M99`.";
      await writeFile(path, JSON.stringify(file, null, 2));
      const result = await runCli(["validate", "--program", "sd-coding", "--data-dir", dir]);
      expect(result.exitCode).toBe(1);
      expect(result.stdout).toContain("bridges.json");
      expect(result.stdout).toContain('"SMP7-1-M99" is not a week of programme "smp-coding"');
    } finally {
      await rm(dir, { recursive: true, force: true });
    }
  });
});
