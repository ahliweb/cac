/**
 * End-to-end tests for the `sma-coding` programme at the CLI (issue #52):
 * `osn validate` covers it (alone and together with `osn`), and every
 * command that only reads the OSN corpus refuses `--program sma-coding`
 * with exit 2 instead of silently serving OSN data.
 */

import { describe, expect, test } from "bun:test";
import { cp, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { loadOsnTopicFamilyIds, loadProgramRegistry } from "../../src/cli/program-loader";

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

describe("osn validate with the sma-coding programme", () => {
  test("--program sma-coding validates its seven files, exit 0", async () => {
    const result = await runCli(["validate", "--program", "sma-coding"]);
    expect(result.exitCode).toBe(0);
    expect(result.stdout).toContain('programme "sma-coding"');
    expect(result.stdout).toContain("7 data file(s) validated, 0 problem(s) found");
  });

  test("--program sma-coding --json reports ok and no unregistered file", async () => {
    const result = await runCli(["validate", "--program", "sma-coding", "--json"]);
    expect(result.exitCode).toBe(0);
    const json = JSON.parse(result.stdout) as {
      ok: boolean;
      program: string;
      summary: { filesValidated: number; filesUnregistered: number };
    };
    expect(json.ok).toBe(true);
    expect(json.program).toBe("sma-coding");
    expect(json.summary.filesValidated).toBe(7);
    expect(json.summary.filesUnregistered).toBe(0);
  });

  test("--program osn is unaffected", async () => {
    const result = await runCli(["validate", "--program", "osn"]);
    expect(result.exitCode).toBe(0);
    expect(result.stdout).toContain("22 data file(s) validated");
  });

  test("validate without flags covers every registered programme", async () => {
    const result = await runCli(["validate", "--json"]);
    expect(result.exitCode).toBe(0);
    const json = JSON.parse(result.stdout) as { ok: boolean; programs: Array<{ program: string }> };
    expect(json.programs.map((entry) => entry.program)).toEqual(["osn", "sma-coding", "tk-coding"]);
  });

  test("a corrupted copy of the corpus is reported with exit 1", async () => {
    const dir = await mkdtemp(join(tmpdir(), "sma-validate-fixture-"));
    try {
      await cp(join(REPO_ROOT, "data", "sma-coding"), dir, { recursive: true });
      const path = join(dir, "osn-bridge.json");
      const file = JSON.parse(await readFile(path, "utf-8"));
      file.bridges[0].familyId = "tidak-ada";
      file.syllabusVersion = "9.9";
      await writeFile(path, JSON.stringify(file, null, 2));

      const result = await runCli(["validate", "--program", "sma-coding", "--data-dir", dir]);
      expect(result.exitCode).toBe(1);
      expect(result.stdout).toContain("osn-bridge.json");
      expect(result.stdout).toContain('OSN topic family "tidak-ada" does not exist');
      expect(result.stdout).toContain("syllabusVersion");
    } finally {
      await rm(dir, { recursive: true, force: true });
    }
  });
});

// `plan` and `render lembar-siswa` support sma-coding since #77 (tests/integration/cli-sma-plan.test.ts).
describe("OSN-only commands refuse --program sma-coding (exit 2, never OSN data)", () => {
  const cases: string[][] = [
    ["render", "weekly", "--week", "1"],
    ["render", "checkpoint", "--number", "1"],
    ["render", "sop"],
    ["report", "--records", "none.jsonl"],
    ["checklist"],
  ];

  test.each(cases)("osn %s", async (...args: string[]) => {
    const result = await runCli([...args, "--program", "sma-coding"]);
    expect(result.exitCode).toBe(2);
    expect(result.stderr).toContain("belum didukung untuk program sma-coding");
    expect(result.stdout).toBe("");
  });

  test("render modul reads the programme's own corpus, so it is not refused by this rule", async () => {
    const result = await runCli([
      "render",
      "modul",
      "--id",
      "tidak-ada",
      "--program",
      "sma-coding",
    ]);
    expect(result.exitCode).toBe(2);
    expect(result.stderr).not.toContain("belum didukung");
  });

  test("the same commands still work for osn", async () => {
    const result = await runCli(["render", "sop", "--program", "osn"]);
    expect(result.exitCode).toBe(0);
  });
});

describe("loadOsnTopicFamilyIds", () => {
  test("returns the ten OSN topic family ids", async () => {
    const loaded = await loadProgramRegistry();
    if (!loaded.ok) {
      throw new Error(loaded.message);
    }
    const ids = await loadOsnTopicFamilyIds(loaded.registry);
    expect(ids?.size).toBe(10);
    expect(ids?.has("graph-tree")).toBe(true);
  });

  test("returns undefined when the registry has no osn programme or its file is unreadable", async () => {
    const loaded = await loadProgramRegistry();
    if (!loaded.ok) {
      throw new Error(loaded.message);
    }
    const withoutOsn = {
      programs: loaded.registry.programs.filter((program) => program.id !== "osn"),
    };
    expect(await loadOsnTopicFamilyIds(withoutOsn)).toBeUndefined();
    expect(await loadOsnTopicFamilyIds(loaded.registry, tmpdir())).toBeUndefined();
  });
});
