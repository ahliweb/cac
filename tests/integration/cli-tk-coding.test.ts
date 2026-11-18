/**
 * End-to-end tests for the `tk-coding` programme at the CLI (issue #127):
 * `osn validate` covers it (alone and together with the other programmes),
 * a corrupted copy of the corpus fails with exit 1, and every command that
 * only reads the OSN corpus refuses `--program tk-coding` with exit 2
 * instead of silently serving OSN data.
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

describe("osn validate with the tk-coding programme", () => {
  test("--program tk-coding validates its seven files, exit 0", async () => {
    const result = await runCli(["validate", "--program", "tk-coding"]);
    expect(result.exitCode).toBe(0);
    expect(result.stdout).toContain('programme "tk-coding"');
    expect(result.stdout).toContain("7 data file(s) validated, 0 problem(s) found");
  });

  test("--program tk-coding --json reports ok and no unregistered file", async () => {
    const result = await runCli(["validate", "--program", "tk-coding", "--json"]);
    expect(result.exitCode).toBe(0);
    const json = JSON.parse(result.stdout) as {
      ok: boolean;
      program: string;
      summary: { filesValidated: number; filesUnregistered: number };
    };
    expect(json.ok).toBe(true);
    expect(json.program).toBe("tk-coding");
    expect(json.summary.filesValidated).toBe(7);
    expect(json.summary.filesUnregistered).toBe(0);
  });

  test("validate without flags includes tk-coding among the registered programmes", async () => {
    const result = await runCli(["validate", "--json"]);
    expect(result.exitCode).toBe(0);
    const json = JSON.parse(result.stdout) as { programs: Array<{ program: string }> };
    expect(json.programs.map((entry) => entry.program)).toContain("tk-coding");
  });

  test("a corrupted copy of the corpus is reported with exit 1", async () => {
    const dir = await mkdtemp(join(tmpdir(), "tk-validate-fixture-"));
    try {
      await cp(join(REPO_ROOT, "data", "tk-coding"), dir, { recursive: true });
      const path = join(dir, "weeks.json");
      const file = JSON.parse(await readFile(path, "utf-8"));
      file.weeks[0].cp = ["FF-DL-z"];
      file.syllabusVersion = "9.9";
      await writeFile(path, JSON.stringify(file, null, 2));
      await writeFile(join(dir, "modules.json"), "{}");

      const result = await runCli(["validate", "--program", "tk-coding", "--data-dir", dir]);
      expect(result.exitCode).toBe(1);
      expect(result.stdout).toContain("weeks.json");
      expect(result.stdout).toContain('CP item "FF-DL-z" of week TK-A1-M1');
      expect(result.stdout).toContain("syllabusVersion");
      expect(result.stdout).toContain("modules.json");
    } finally {
      await rm(dir, { recursive: true, force: true });
    }
  });
});

describe("OSN-only commands refuse --program tk-coding (exit 2, never OSN data)", () => {
  const cases: string[][] = [["render", "weekly", "--week", "1"], ["render", "sop"], ["checklist"]];

  test.each(cases)("osn %s", async (...args: string[]) => {
    const result = await runCli([...args, "--program", "tk-coding"]);
    expect(result.exitCode).toBe(2);
    expect(result.stderr).toContain("belum didukung untuk program tk-coding");
    expect(result.stdout).toBe("");
  });
});

describe("plan and render lembar-siswa refuse --program tk-coding honestly (exit 2)", () => {
  const cases: string[][] = [
    ["plan", "--track", "A"],
    ["render", "lembar-siswa", "--week", "1"],
  ];

  test.each(cases)("osn %s", async (...args: string[]) => {
    const result = await runCli([...args, "--program", "tk-coding"]);
    expect(result.exitCode).toBe(2);
    expect(result.stderr).toContain("belum didukung untuk program tk-coding");
    expect(result.stderr).toContain('hanya tersedia untuk program "osn" dan "sma-coding"');
    expect(result.stderr).toContain(
      'program tk-coding didukung oleh "osn render modul --program tk-coding --id <id>" (tambahkan --lembar untuk lembar anak; perlu data/tk-coding/modules.json), "osn validate --program tk-coding" dan "bun run check:fidelity --program tk-coding"',
    );
    // The old wording advertised the very commands being refused.
    expect(result.stderr).not.toContain("Perintah yang didukung untuk program");
    expect(result.stdout).toBe("");
  });
});
