/**
 * End-to-end tests (real `bun run src/cli/index.ts` subprocesses against the
 * real `data/sma-coding/` corpus) for `osn plan` and `osn render
 * lembar-siswa` with `--program sma-coding` (issue #77, owner decision
 * 2026-11-18), and for the commands that must keep refusing the programme.
 */

import { describe, expect, test } from "bun:test";
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

async function readJson<T>(path: string): Promise<T> {
  return (await Bun.file(join(REPO_ROOT, path)).json()) as T;
}

describe("osn plan --program sma-coding", () => {
  test("track A, kelas X semester 1: foundation block first, then M8..M14, from the real corpus", async () => {
    const result = await runCli([
      "plan",
      "--program",
      "sma-coding",
      "--track",
      "A",
      "--semester",
      "X1",
    ]);
    expect(result.exitCode).toBe(0);
    expect(result.stderr).toBe("");
    const headings = result.stdout.split("\n").filter((line) => line.startsWith("#### "));
    expect(headings.map((line) => line.split(" ")[1])).toEqual([
      ...[1, 2, 3, 4, 5, 6, 7].map((n) => `FND-X1-M${n}`),
      ...[8, 9, 10, 11, 12, 13, 14].map((n) => `A-X1-M${n}`),
    ]);
    // Every cell shown is a verbatim corpus cell.
    const weeks = await readJson<{ weeks: { id: string; topic: string; objective: string }[] }>(
      "data/sma-coding/weeks.json",
    );
    const m9 = weeks.weeks.find((week) => week.id === "A-X1-M9");
    expect(result.stdout).toContain(`#### A-X1-M9 -- ${m9?.topic}`);
    expect(result.stdout).toContain(`**Tujuan:** ${m9?.objective}`);
    expect(result.stdout).toContain("**Jembatan OSN:** dasar-pemrograman");
    expect(result.stdout).toContain("**Butir CP:** E-BK-d");
  });

  test("track B, kelas XII: both semesters, no foundation block", async () => {
    const result = await runCli([
      "plan",
      "--program",
      "sma-coding",
      "--track",
      "B",
      "--kelas",
      "XII",
    ]);
    expect(result.exitCode).toBe(0);
    expect(result.stdout).toContain("## Semester XII1");
    expect(result.stdout).toContain("## Semester XII2");
    expect(result.stdout).not.toContain("FND-X1");
    expect(result.stdout).not.toContain("**Jembatan OSN:**");
  });

  test("--json is valid JSON with 77 track weeks and 7 foundation weeks for a whole track", async () => {
    const result = await runCli(["plan", "--program", "sma-coding", "--track", "A", "--json"]);
    expect(result.exitCode).toBe(0);
    const json = JSON.parse(result.stdout) as {
      track: { id: string };
      syllabusVersion: string;
      semesters: { semester: string; foundation: unknown[]; weeks: unknown[] }[];
    };
    expect(json.track.id).toBe("A");
    expect(json.syllabusVersion).toBe("1.3.0");
    expect(json.semesters.map((s) => s.semester)).toEqual([
      "X1",
      "X2",
      "XI1",
      "XI2",
      "XII1",
      "XII2",
    ]);
    expect(json.semesters.reduce((n, s) => n + s.foundation.length, 0)).toBe(7);
    expect(json.semesters.reduce((n, s) => n + s.weeks.length, 0)).toBe(77);
  });

  test("output is byte-identical across runs", async () => {
    const args = ["plan", "--program", "sma-coding", "--track", "B"];
    const [first, second] = [await runCli(args), await runCli(args)];
    expect(first.stdout).toBe(second.stdout);
  });

  test.each([
    [["plan", "--program", "sma-coding"], "--track"],
    [["plan", "--program", "sma-coding", "--track", "Z"], 'unknown track "Z"'],
    [["plan", "--program", "sma-coding", "--track", "Z"], "Valid tracks: A, B, C, D, E."],
    [
      ["plan", "--program", "sma-coding", "--track", "E", "--kelas", "X"],
      "jalur E tidak memiliki semester X1: jalur ini dimulai di kelas XI",
    ],
    [
      ["plan", "--program", "sma-coding", "--track", "E", "--semester", "X2"],
      "jalur E tidak memiliki semester X2",
    ],
    [["plan", "--program", "sma-coding", "--track", "A", "--start", "2027-01-11"], "--start"],
  ])("%j exits 2 with a clear message and empty stdout", async (args, message) => {
    const result = await runCli(args);
    expect(result.exitCode).toBe(2);
    expect(result.stdout).toBe("");
    expect(result.stderr).toContain(message);
  });

  test("track C: the whole track has 77 weeks with partial CP markers per track", async () => {
    const result = await runCli(["plan", "--program", "sma-coding", "--track", "C", "--json"]);
    expect(result.exitCode).toBe(0);
    const json = JSON.parse(result.stdout) as {
      track: { id: string; startClass: string; cpStatus: string };
      semesters: { semester: string; foundation: unknown[]; weeks: unknown[] }[];
    };
    expect(json.track).toMatchObject({ id: "C", startClass: "X", cpStatus: "dalam-cp" });
    expect(json.semesters.reduce((n, s) => n + s.weeks.length, 0)).toBe(77);
    expect(json.semesters[0]?.foundation).toHaveLength(7);
    const md = await runCli([
      "plan",
      "--program",
      "sma-coding",
      "--track",
      "C",
      "--semester",
      "XII1",
    ]);
    expect(md.stdout).toContain("#### C-XII1-M11 -- Hukum dan etika sensor");
    expect(md.stdout).toContain("F-LD-g (parsial)");
    expect(md.stdout).not.toContain("Catatan: jalur C adalah pengayaan");
  });

  test("track D: a pengayaan note, enrichment links, and no CP coverage", async () => {
    const result = await runCli([
      "plan",
      "--program",
      "sma-coding",
      "--track",
      "D",
      "--semester",
      "XI1",
    ]);
    expect(result.exitCode).toBe(0);
    expect(result.stdout).toContain(
      "Catatan: jalur D adalah pengayaan di luar rumusan CP; tidak dihitung sebagai pemenuhan butir CP.",
    );
    expect(result.stdout).toContain("#### D-XI1-M5 -- Sumber data terbuka dan legal");
    expect(result.stdout).toContain(
      "**Irisan dengan CP (pengayaan, tidak dihitung pemenuhan CP):** F-AD-a",
    );
    expect(result.stdout).toContain("**Butir CP:** tidak ada butir CP yang dipetakan");
  });

  test("track E: four semesters from XI1, no foundation block", async () => {
    const result = await runCli(["plan", "--program", "sma-coding", "--track", "E", "--json"]);
    expect(result.exitCode).toBe(0);
    const json = JSON.parse(result.stdout) as {
      track: { startClass: string; cpStatus: string };
      semesters: { semester: string; foundation: unknown[]; weeks: unknown[] }[];
    };
    expect(json.track).toMatchObject({ startClass: "XI", cpStatus: "pengayaan" });
    expect(json.semesters.map((s) => s.semester)).toEqual(["XI1", "XI2", "XII1", "XII2"]);
    expect(json.semesters.reduce((n, s) => n + s.foundation.length, 0)).toBe(0);
    expect(json.semesters.reduce((n, s) => n + s.weeks.length, 0)).toBe(56);
  });

  test("osn plan for osn is unchanged", async () => {
    const result = await runCli(["plan", "--start", "2026-01-05"]);
    expect(result.exitCode).toBe(0);
    expect(result.stdout).toContain("osn plan: cohort calendar");
  });
});

describe("osn render lembar-siswa --program sma-coding", () => {
  test("a track week: sections, CP quotation, OSN bridge, blank self-check, source", async () => {
    const result = await runCli([
      "render",
      "lembar-siswa",
      "--program",
      "sma-coding",
      "--week",
      "A-X1-M9",
    ]);
    expect(result.exitCode).toBe(0);
    const text = result.stdout;
    expect(text).toContain("# Lembar Belajar Siswa -- Minggu A-X1-M9");
    expect(text).toContain("Jalur A -- Algoritmik dengan C++");
    expect(text).toContain("**Kutipan CP, Berpikir Komputasional (Fase E):**");
    expect(text).toContain("## Jembatan ke OSN");
    expect(text).toContain("- [ ] ");
    expect(text).not.toContain("[x]");
    expect(text).toContain(
      "Sumber: Silabus Pembelajaran Coding SMA, versi 1.3.0, tanggal 2026-11-19.",
    );
  });

  test("a jalur C week lists its counted CP items and its own OSN bridge", async () => {
    const result = await runCli([
      "render",
      "lembar-siswa",
      "--program",
      "sma-coding",
      "--week",
      "C-X1-M9",
    ]);
    expect(result.exitCode).toBe(0);
    expect(result.stdout).toContain("Jalur C -- IoT dan Robotika");
    expect(result.stdout).toContain("- E-BK-d:");
    expect(result.stdout).toContain("## Jembatan ke OSN");
    expect(result.stdout).toContain("- logika-bitwise:");
    const partial = await runCli([
      "render",
      "lembar-siswa",
      "--program",
      "sma-coding",
      "--week",
      "c-xi2-m2",
    ]);
    expect(partial.exitCode).toBe(0);
    expect(partial.stdout).toContain("- F-LD-e:");
    expect(partial.stdout).toContain("(parsial)");
  });

  test("jalur D and E sheets say they are outside the CP and show irisan, not coverage", async () => {
    const d = await runCli([
      "render",
      "lembar-siswa",
      "--program",
      "sma-coding",
      "--week",
      "D-XI1-M5",
    ]);
    expect(d.exitCode).toBe(0);
    expect(d.stdout).toContain("Jalur D adalah pengayaan di luar rumusan CP");
    expect(d.stdout).toContain("## Irisan dengan CP (pengayaan, tidak dihitung pemenuhan CP)");
    expect(d.stdout).toContain("- F-AD-a:");
    expect(d.stdout).not.toContain("**Kutipan CP");
    const e = await runCli([
      "render",
      "lembar-siswa",
      "--program",
      "sma-coding",
      "--week",
      "E-XI2-M12",
    ]);
    expect(e.exitCode).toBe(0);
    expect(e.stdout).toContain(
      "Jalur E -- Komputasi Kuantum dan Cloud Quantum (kelas XI, semester XI2, minggu 12)",
    );
    expect(e.stdout).toContain("- F-BK-b:");
    expect(e.stdout).not.toContain("## Jembatan ke OSN");
  });

  test("a kelas X code of jalur E does not exist", async () => {
    const result = await runCli([
      "render",
      "lembar-siswa",
      "--program",
      "sma-coding",
      "--week",
      "E-X1-M8",
    ]);
    expect(result.exitCode).toBe(2);
    expect(result.stderr).toContain("kode minggu");
    expect(result.stdout).toBe("");
  });

  test("a foundation week is the shared block, not a track", async () => {
    const result = await runCli([
      "render",
      "lembar-siswa",
      "--program",
      "sma-coding",
      "--week",
      "FND-X1-M3",
    ]);
    expect(result.exitCode).toBe(0);
    expect(result.stdout).toContain("Blok fondasi bersama");
    expect(result.stdout).not.toContain("**Posisi:** Jalur");
  });

  test("every week of the corpus renders (364 track weeks + 7 foundation weeks)", async () => {
    const weeks = await readJson<{ weeks: { id: string }[] }>("data/sma-coding/weeks.json");
    const foundation = await readJson<{ weeks: { id: string }[] }>(
      "data/sma-coding/foundation.json",
    );
    const { renderSmaStudentSheet } = await import("../../src/render/sma-student-sheet");
    const { findSmaWeek, cpQuotesFor } = await import("../../src/domain/sma-plan");
    const { loadSmaCorpus } = await import("../../src/cli/sma-corpus-loader");
    const loaded = await loadSmaCorpus(join(REPO_ROOT, "data", "sma-coding"));
    if (!loaded.ok) {
      throw new Error(loaded.message);
    }
    const source = { name: "n", version: "1", date: "d" };
    for (const { id } of [...weeks.weeks, ...foundation.weeks]) {
      const week = findSmaWeek(loaded.corpus, id);
      expect(week).toBeDefined();
      if (week !== undefined) {
        const text = renderSmaStudentSheet(week, cpQuotesFor(loaded.corpus, week.cpItems), source);
        expect(text).toContain(`Minggu ${id}`);
      }
    }
  });

  test("output is byte-identical across runs", async () => {
    const args = ["render", "lembar-siswa", "--program", "sma-coding", "--week", "B-X2-M9"];
    const [first, second] = [await runCli(args), await runCli(args)];
    expect(first.exitCode).toBe(0);
    expect(first.stdout).toBe(second.stdout);
  });

  test("an unknown code exits 2 with example valid codes and empty stdout", async () => {
    const result = await runCli([
      "render",
      "lembar-siswa",
      "--program",
      "sma-coding",
      "--week",
      "A-X1-M1",
    ]);
    expect(result.exitCode).toBe(2);
    expect(result.stdout).toBe("");
    expect(result.stderr).toContain("A-X1-M8 .. A-XII2-M14");
    expect(result.stderr).toContain("jalur C: C-X1-M8 .. C-XII2-M14");
    expect(result.stderr).toContain("jalur D: D-X1-M8 .. D-XII2-M14");
    expect(result.stderr).toContain("jalur E: E-XI1-M1 .. E-XII2-M14");
    expect(result.stderr).toContain("FND-X1-M1 .. FND-X1-M7");
  });

  test("osn lembar-siswa for osn is unchanged", async () => {
    const result = await runCli(["render", "lembar-siswa", "--week", "4"]);
    expect(result.exitCode).toBe(0);
    expect(result.stdout).toContain("# Lembar Belajar Siswa -- Minggu 4");
  });
});

describe("commands that still refuse --program sma-coding (exit 2, never OSN data)", () => {
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
});
