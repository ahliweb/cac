/**
 * End-to-end tests for the `smp-coding` programme at the CLI (issue #129,
 * ADR-0008): `osn validate` covers it (alone and together with the other
 * programmes), a corrupted copy of its corpus is reported with exit 1, and
 * `bun run check:fidelity --program smp-coding` runs its fidelity module.
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

describe("osn validate with the smp-coding programme", () => {
  test("--program smp-coding validates its seven files, exit 0", async () => {
    const result = await runCli(["validate", "--program", "smp-coding"]);
    expect(result.exitCode).toBe(0);
    expect(result.stdout).toContain('programme "smp-coding"');
    expect(result.stdout).toContain("7 data file(s) validated, 0 problem(s) found");
  });

  test("--program smp-coding --json reports ok and no unregistered file", async () => {
    const result = await runCli(["validate", "--program", "smp-coding", "--json"]);
    expect(result.exitCode).toBe(0);
    const json = JSON.parse(result.stdout) as {
      ok: boolean;
      program: string;
      summary: { filesValidated: number; filesUnregistered: number; filesMissing: number };
    };
    expect(json.ok).toBe(true);
    expect(json.program).toBe("smp-coding");
    expect(json.summary.filesValidated).toBe(7);
    expect(json.summary.filesUnregistered).toBe(0);
    expect(json.summary.filesMissing).toBe(0);
  });

  test("validate without flags includes smp-coding among the programmes", async () => {
    const result = await runCli(["validate", "--json"]);
    expect(result.exitCode).toBe(0);
    const json = JSON.parse(result.stdout) as { ok: boolean; programs: Array<{ program: string }> };
    expect(json.ok).toBe(true);
    expect(json.programs.map((entry) => entry.program)).toContain("smp-coding");
  });

  test("a corrupted copy of the corpus is reported with exit 1", async () => {
    const dir = await mkdtemp(join(tmpdir(), "smp-validate-fixture-"));
    try {
      await cp(join(REPO_ROOT, "data", "smp-coding"), dir, { recursive: true });
      const path = join(dir, "weeks.json");
      const file = JSON.parse(await readFile(path, "utf-8"));
      // A week silently dropped from a CP item's coverage, and a stale syllabus version.
      const week = file.weeks.find((w: { id: string }) => w.id === "SMP7-1-M3");
      week.cpCodes = week.cpCodes.filter((code: string) => code !== "D-BK-e");
      file.syllabusVersion = "9.9";
      await writeFile(path, JSON.stringify(file, null, 2));

      const result = await runCli(["validate", "--program", "smp-coding", "--data-dir", dir]);
      expect(result.exitCode).toBe(1);
      expect(result.stdout).toContain("cp-mapping.json");
      expect(result.stdout).toContain("D-BK-e is mapped to 28 weeks but 27 weeks name it");
      expect(result.stdout).toContain("syllabusVersion");
    } finally {
      await rm(dir, { recursive: true, force: true });
    }
  });
});

describe("osn validate: cross-programme codes in the smp-coding bridge (ADR-0010, #177)", () => {
  test("a sma-coding week that does not exist is reported with exit 1", async () => {
    const dir = await mkdtemp(join(tmpdir(), "smp-coding-crossref-fixture-"));
    try {
      await cp(join(REPO_ROOT, "data", "smp-coding"), dir, { recursive: true });
      const path = join(dir, "bridge.json");
      const file = JSON.parse(await readFile(path, "utf-8"));
      file.toSma[2].note += " Lihat `A-X1-M99`.";
      await writeFile(path, JSON.stringify(file, null, 2));
      const result = await runCli(["validate", "--program", "smp-coding", "--data-dir", dir]);
      expect(result.exitCode).toBe(1);
      expect(result.stdout).toContain("bridge.json");
      expect(result.stdout).toContain('"A-X1-M99" is not a week of programme "sma-coding"');
    } finally {
      await rm(dir, { recursive: true, force: true });
    }
  });
});

describe("check:fidelity for smp-coding", () => {
  test("--program smp-coding runs its fidelity module and exits 0", () => {
    const proc = Bun.spawnSync(
      ["bun", "run", "scripts/check-fidelity.ts", "--program", "smp-coding"],
      {
        cwd: REPO_ROOT,
      },
    );
    expect(proc.exitCode).toBe(0);
    expect(proc.stdout.toString()).toContain("check-smp-coding-fidelity: OK");
  });
});
