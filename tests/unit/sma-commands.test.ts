/**
 * In-process tests for the `--program sma-coding` branches of `osn plan` and
 * `osn render lembar-siswa` (issue #77): flag handling, exit codes, `--out` /
 * `--force`. The corpus is the real `data/sma-coding/`; the subprocess
 * behaviour is covered by `tests/integration/cli-sma-plan.test.ts`.
 */

import { afterEach, beforeEach, describe, expect, test } from "bun:test";
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import type { CommandContext } from "../../src/cli/command";
import { planCommand } from "../../src/cli/commands/plan";
import { renderCommand } from "../../src/cli/commands/render";

function makeContext(overrides: Partial<CommandContext> = {}) {
  const stdout: string[] = [];
  const stderr: string[] = [];
  const ctx: CommandContext = {
    json: false,
    cwd: process.cwd(),
    stdout: (text) => stdout.push(text),
    stderr: (text) => stderr.push(text),
    ...overrides,
  };
  return { ctx, stdout, stderr };
}

async function plan(args: string[], overrides: Partial<CommandContext> = {}) {
  const made = makeContext(overrides);
  const code = await planCommand.run(["--program", "sma-coding", ...args], made.ctx);
  return { code, out: made.stdout.join(""), err: made.stderr.join("") };
}

describe("osn plan --program sma-coding", () => {
  test("--track A --semester X1 lists the foundation block before the track weeks", async () => {
    const { code, out } = await plan(["--track", "A", "--semester", "X1"]);
    expect(code).toBe(0);
    expect(out).toContain("# Rencana Pembelajaran -- Jalur A: Algoritmik dengan C++");
    expect(out.indexOf("#### FND-X1-M1")).toBeGreaterThan(-1);
    expect(out.indexOf("#### FND-X1-M7")).toBeLessThan(out.indexOf("#### A-X1-M8"));
    expect(out).toContain("#### A-X1-M14");
    expect(out).not.toContain("#### A-X2-M1 ");
  });

  test("--kelas X covers X1 and X2 only; without scope all six semesters", async () => {
    const kelasX = await plan(["--track", "B", "--kelas", "X"]);
    expect(kelasX.out).toContain("## Semester X1");
    expect(kelasX.out).toContain("## Semester X2");
    expect(kelasX.out).not.toContain("## Semester XI1");
    const all = await plan(["--track", "B"]);
    expect(all.out.match(/^## Semester /gm)?.length).toBe(6);
  });

  test("--semester 2 with --kelas XI resolves to XI2", async () => {
    const { code, out } = await plan(["--track", "A", "--kelas", "XI", "--semester", "2"]);
    expect(code).toBe(0);
    expect(out).toContain("## Semester XI2");
    expect(out).not.toContain("## Semester XI1");
  });

  test("--json and --format json emit the plan object", async () => {
    const viaFlag = await plan(["--track", "A", "--semester", "X1"], { json: true });
    const viaFormat = await plan(["--track", "A", "--semester", "X1", "--format", "json"]);
    expect(viaFlag.out).toBe(viaFormat.out);
    const json = JSON.parse(viaFlag.out) as {
      track: { id: string };
      semesters: { foundation: unknown[]; weeks: unknown[] }[];
    };
    expect(json.track.id).toBe("A");
    expect(json.semesters[0]?.foundation.length).toBe(7);
    expect(json.semesters[0]?.weeks.length).toBe(7);
  });

  test("is deterministic", async () => {
    const first = await plan(["--track", "A"]);
    const second = await plan(["--track", "A"]);
    expect(first.out).toBe(second.out);
  });

  const usageErrors: [string, string[], string][] = [
    ["no --track", [], "--track"],
    ["--track without a value", ["--track"], "--track"],
    ["an unknown track", ["--track", "Z"], 'unknown track "Z"'],
    ["a bad --kelas", ["--track", "A", "--kelas", "IX"], "--kelas harus"],
    ["--kelas without a value", ["--track", "A", "--kelas"], "--kelas memerlukan"],
    ["a bad --semester", ["--track", "A", "--semester", "Q9"], "--semester harus"],
    ["--semester without a value", ["--track", "A", "--semester"], "--semester memerlukan"],
    ["--semester 1 without --kelas", ["--track", "A", "--semester", "1"], "memerlukan --kelas"],
    [
      "--semester of another class",
      ["--track", "A", "--kelas", "X", "--semester", "XI1"],
      "bukan semester kelas X",
    ],
    ["a bad --format", ["--track", "A", "--format", "xml"], '--format must be "md" or "json"'],
    ["OSN-only --start", ["--track", "A", "--start", "2027-01-11"], "--start berlaku untuk"],
    ["OSN-only --exclude", ["--track", "A", "--exclude", "2027-01-11"], "--exclude berlaku untuk"],
    ["OSN-only --target-stage", ["--track", "A", "--target-stage", "osn-k"], "--target-stage"],
  ];
  test.each(usageErrors)(
    "%s exits 2 and writes nothing to stdout",
    async (_name, args, message) => {
      const { code, out, err } = await plan(args);
      expect(code).toBe(2);
      expect(out).toBe("");
      expect(err).toContain(message);
    },
  );
});

describe("osn render lembar-siswa --program sma-coding", () => {
  let dir: string;
  beforeEach(async () => {
    dir = await mkdtemp(join(tmpdir(), "sma-sheet-command-"));
  });
  afterEach(async () => {
    await rm(dir, { recursive: true, force: true });
  });

  async function sheet(args: string[]) {
    const made = makeContext({ cwd: dir });
    const code = await renderCommand.run(
      ["lembar-siswa", "--program", "sma-coding", ...args],
      made.ctx,
    );
    return { code, out: made.stdout.join(""), err: made.stderr.join("") };
  }

  test("a track week renders; the code is case-insensitive", async () => {
    const upper = await sheet(["--week", "A-X1-M9"]);
    const lower = await sheet(["--week", "a-x1-m9"]);
    expect(upper.code).toBe(0);
    expect(upper.out).toContain("# Lembar Belajar Siswa -- Minggu A-X1-M9");
    expect(lower.out).toBe(upper.out);
  });

  test("a foundation week renders as the shared block", async () => {
    const { code, out } = await sheet(["--week", "FND-X1-M3"]);
    expect(code).toBe(0);
    expect(out).toContain("Blok fondasi bersama");
  });

  test.each([
    ["no --week", []],
    ["--week without a value", ["--week"]],
    ["a bare number", ["--week", "3"]],
    ["an unknown code", ["--week", "A-X1-M1"]],
    ["an unknown track", ["--week", "Z-X1-M9"]],
  ])("%s exits 2 listing valid example codes", async (_name, args) => {
    const { code, out, err } = await sheet(args);
    expect(code).toBe(2);
    expect(out).toBe("");
    expect(err).toContain("A-X1-M8 .. A-XII2-M14");
    expect(err).toContain("FND-X1-M1 .. FND-X1-M7");
  });

  test("--out writes the file, refuses to overwrite without --force, and overwrites with it", async () => {
    const target = join(dir, "lembar.md");
    const first = await sheet(["--week", "A-X1-M9", "--out", "lembar.md"]);
    expect(first.code).toBe(0);
    expect(first.out).toBe("osn render lembar-siswa: wrote lembar.md\n");
    const written = await readFile(target, "utf-8");
    expect(written).toContain("# Lembar Belajar Siswa -- Minggu A-X1-M9");

    await writeFile(target, "diedit");
    const refused = await sheet(["--week", "A-X1-M9", "--out", "lembar.md"]);
    expect(refused.code).toBe(2);
    expect(await readFile(target, "utf-8")).toBe("diedit");

    const forced = await sheet(["--week", "A-X1-M9", "--out", "lembar.md", "--force"]);
    expect(forced.code).toBe(0);
    expect(await readFile(target, "utf-8")).toBe(written);
  });

  test("the other render subcommands still refuse sma-coding", async () => {
    for (const args of [["weekly", "--week", "1"], ["checkpoint", "--number", "1"], ["sop"]]) {
      const made = makeContext();
      const code = await renderCommand.run([...args, "--program", "sma-coding"], made.ctx);
      expect(code).toBe(2);
      expect(made.stderr.join("")).toContain("belum didukung untuk program sma-coding");
      expect(made.stdout.join("")).toBe("");
    }
  });
});
