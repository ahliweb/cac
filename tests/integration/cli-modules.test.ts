/**
 * End-to-end tests for the learning modules (issue #54, ADR-0007): the real
 * CLI as a subprocess -- `osn render modul` and `osn validate` against a
 * fixture corpus with a broken module index -- plus the standalone
 * `check:module-code` script against the committed modules.
 */

import { afterEach, beforeEach, describe, expect, test } from "bun:test";
import { cp, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

const REPO_ROOT = join(import.meta.dir, "..", "..");
const CLI_ENTRYPOINT = join(REPO_ROOT, "src", "cli", "index.ts");
const REAL_DATA_DIR = join(REPO_ROOT, "data", "osn");

interface CliResult {
  readonly stdout: string;
  readonly stderr: string;
  readonly exitCode: number;
}

async function run(command: readonly string[]): Promise<CliResult> {
  const proc = Bun.spawn([...command], { cwd: REPO_ROOT, stdout: "pipe", stderr: "pipe" });
  const [stdout, stderr, exitCode] = await Promise.all([
    new Response(proc.stdout).text(),
    new Response(proc.stderr).text(),
    proc.exited,
  ]);
  return { stdout, stderr, exitCode };
}

const cli = (...args: string[]) => run(["bun", "run", CLI_ENTRYPOINT, ...args]);

let tempDir: string;

beforeEach(async () => {
  tempDir = await mkdtemp(join(tmpdir(), "osn-modules-cli-"));
});

afterEach(async () => {
  await rm(tempDir, { recursive: true, force: true });
});

describe("osn render modul (real subprocess)", () => {
  test("renders the approved pilot module without a banner and with its approval footer", async () => {
    // The pilot was approved by the programme owner on 2026-11-18 (issue #55).
    // Banner text per status is covered by tests/unit/render-module.test.ts.
    const result = await cli("render", "modul", "--id", "dasar-pemrograman");
    expect(result.exitCode).toBe(0);
    expect(result.stderr).toBe("");
    const lines = result.stdout.split("\n");
    expect(lines[0]).toBe("# Dasar Pemrograman dengan C++");
    expect(lines[2]).toBe("## Untuk siapa modul ini");
    expect(result.stdout).not.toContain("DRAF");
    expect(result.stdout).toContain("## Rujukan");
    expect(result.stdout).toContain(
      "- R1: Silabus OSN Informatika 2026 <https://osn.toki.id/silabus>",
    );
    expect(result.stdout).toContain("Status modul: disetujui.");
    expect(result.stdout).toContain(
      "Disetujui pada 2026-11-18 oleh peninjau dengan peran: pemilik program.",
    );
  });

  test("is deterministic and writes with --out, refusing to overwrite without --force", async () => {
    const out = join(tempDir, "modul.md");
    const first = await cli("render", "modul", "--id", "dasar-pemrograman", "--out", out);
    expect(first.exitCode).toBe(0);
    expect(await readFile(out, "utf-8")).toBe(
      (await cli("render", "modul", "--id", "dasar-pemrograman")).stdout,
    );
    const again = await cli("render", "modul", "--id", "dasar-pemrograman", "--out", out);
    expect(again.exitCode).toBe(2);
    expect(again.stderr).toContain("already exists");
    const forced = await cli(
      "render",
      "modul",
      "--id",
      "dasar-pemrograman",
      "--out",
      out,
      "--force",
    );
    expect(forced.exitCode).toBe(0);
  });

  test("an unknown id, a missing --id and an unknown programme exit 2", async () => {
    const unknown = await cli("render", "modul", "--id", "tidak-ada");
    expect(unknown.exitCode).toBe(2);
    expect(unknown.stderr).toContain('unknown module "tidak-ada"');
    const missing = await cli("render", "modul");
    expect(missing.exitCode).toBe(2);
    expect(missing.stderr).toContain("--id <module-id> is required");
    const flagAsValue = await cli("render", "modul", "--id", "--force");
    expect(flagAsValue.exitCode).toBe(2);
    const program = await cli(
      "render",
      "modul",
      "--id",
      "dasar-pemrograman",
      "--program",
      "tidak-ada",
    );
    expect(program.exitCode).toBe(2);
  });
});

describe("osn validate with a module index (real subprocess, fixture corpus)", () => {
  async function fixture(modules: unknown): Promise<string> {
    const dir = join(tempDir, "osn");
    await cp(REAL_DATA_DIR, dir, { recursive: true });
    await writeFile(join(dir, "modules.json"), JSON.stringify(modules));
    return dir;
  }

  const base = {
    id: "dasar-pemrograman",
    title: "Contoh",
    topicFamilies: ["dasar-pemrograman"],
    weeks: [1],
    audience: "siswa",
    language: "id",
    status: "draf",
    references: [{ refId: "R1" }],
    contentPath: "content/osn/modules/dasar-pemrograman.md",
  };

  test("a valid index validates clean", async () => {
    const dir = await fixture({ modules: [base] });
    const result = await cli("validate", "--data-dir", dir);
    expect(result.exitCode).toBe(0);
  });

  test("a programme without modules.json is still valid", async () => {
    const dir = await fixture({ modules: [] });
    await rm(join(dir, "modules.json"));
    expect((await cli("validate", "--data-dir", dir)).exitCode).toBe(0);
  });

  test("approval without a review, a dangling family and a missing body file are all reported", async () => {
    const dir = await fixture({
      modules: [
        { ...base, status: "disetujui" },
        {
          ...base,
          id: "rusak",
          topicFamilies: ["tidak-ada"],
          weeks: undefined,
          contentPath: "content/osn/modules/rusak.md",
        },
      ],
    });
    const result = await cli("validate", "--data-dir", dir);
    expect(result.exitCode).toBe(1);
    expect(result.stdout).toContain("modules.json");
    expect(result.stdout).toContain("review");
  });

  test("a dangling topic family and a missing body file are reported with exit 1", async () => {
    const dir = await fixture({
      modules: [
        {
          ...base,
          id: "rusak",
          topicFamilies: ["tidak-ada"],
          contentPath: "content/osn/modules/rusak.md",
        },
      ],
    });
    const result = await cli("validate", "--data-dir", dir, "--json");
    expect(result.exitCode).toBe(1);
    const report = JSON.parse(result.stdout) as {
      findings: Array<{ file: string; message: string }>;
    };
    const messages = report.findings.filter((f) => f.file === "modules.json").map((f) => f.message);
    expect(messages.some((m) => m.includes('topic family "tidak-ada"'))).toBe(true);
    expect(messages.some((m) => m.includes("does not exist"))).toBe(true);
  });
});

describe("bun run check:module-code (real subprocess)", () => {
  // Compiles every cpp block of every module with g++, so it grows with the
  // module count (#55) and needs more than bun's 5 s default timeout.
  test("passes on the committed modules and counts their cpp blocks", async () => {
    const result = await run(["bun", "run", "scripts/check-module-code.ts"]);
    expect(result.exitCode).toBe(0);
    // The module count grows as modules are added (#55); assert the shape only.
    expect(result.stdout).toMatch(/OK -- \d+ cpp block\(s\) in \d+ module file\(s\)/);
  }, 180_000);
});
