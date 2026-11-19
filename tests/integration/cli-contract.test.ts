/**
 * Contract tests for the two CLI names (issue #254; contract
 * `docs/migrations/2026-11-cac-cli-contract.md` section 6, CLI-C-01..13).
 * Every case runs the real entry files of `cac` and `osn` as subprocesses
 * and asserts the same behaviour for both: exit code, caller-name prefix,
 * byte-identical `--json`, identical Markdown once the caller name and the
 * absolute repository path are normalised, and a silent stderr on success.
 *
 * The golden rows of section 3 are encoded as `GOLDEN` below (summary
 * assertions, not hashes: the corpus and content move with other work).
 * Fixtures and `--out` targets live in per-test temporary directories; the
 * real repository is only read.
 */

import { afterAll, beforeAll, describe, expect, test } from "bun:test";
import { cp, mkdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import packageJson from "../../package.json";
import { packageInfo } from "../../src/index";
import {
  asOsn,
  CLI_ENTRIES,
  CLI_NAMES,
  type CliName,
  type CliResult,
  forCli,
  hashTree,
  makeTempDir,
  normalisePath,
  REPO_ROOT,
  removeDir,
  runBoth,
  runEntry,
} from "../helpers/cli-entries";

const SAMPLE_RECORDS = "data/osn/samples/learning-records.sample.jsonl";
const PROGRAM_IDS = [
  "osn",
  "sma-coding",
  "tk-coding",
  "kuliah-coding",
  "dewasa-coding",
  "sd-coding",
  "smp-coding",
] as const;
const COMMAND_LIST = "validate, plan, render, report, privacy-check, checklist";

type Kind = "help" | "json" | "text" | "version";

interface Golden {
  /** Contract test ids this row belongs to. */
  readonly ids: readonly string[];
  /** Row number in contract section 3 (0 = added by F2/04). */
  readonly row: number;
  readonly args: readonly string[];
  readonly exit: number;
  readonly kind: Kind;
  /** Substrings of stdout (`{cli}` is the caller name). */
  readonly out?: readonly string[];
  /** Substrings of stderr. */
  readonly err?: readonly string[];
  /** Exact top-level keys of the parsed JSON stdout. */
  readonly keys?: readonly string[];
}

const GOLDEN: readonly Golden[] = [
  { ids: ["01"], row: 1, args: ["--version"], exit: 0, kind: "version" },
  { ids: ["01"], row: 2, args: ["-V"], exit: 0, kind: "version" },
  { ids: ["01"], row: 3, args: ["--version", "bogus"], exit: 0, kind: "version" },
  {
    ids: ["02"],
    row: 4,
    args: [],
    exit: 2,
    kind: "help",
    err: ["Usage: {cli} <command> [options]", "Commands:"],
  },
  {
    ids: ["02"],
    row: 5,
    args: ["--help"],
    exit: 0,
    kind: "help",
    out: ["Usage: {cli} <command> [options]", "Commands:"],
  },
  {
    ids: ["02"],
    row: 6,
    args: ["-h"],
    exit: 0,
    kind: "help",
    out: ["Usage: {cli} <command> [options]"],
  },
  {
    ids: ["03"],
    row: 7,
    args: ["bogus"],
    exit: 2,
    kind: "text",
    err: [
      `{cli}: unknown command "bogus". Valid commands: ${COMMAND_LIST}. Run "{cli} --help" for usage.`,
    ],
  },
  {
    ids: ["03"],
    row: 8,
    args: ["--program", "osn", "validate"],
    exit: 2,
    kind: "text",
    err: ['{cli}: unknown command "osn".'],
  },
  {
    ids: ["02", "04"],
    row: 9,
    args: ["validate", "--help"],
    exit: 0,
    kind: "text",
    out: ["Usage: {cli} validate [options]"],
  },
  {
    ids: ["04"],
    row: 10,
    args: ["validate"],
    exit: 0,
    kind: "text",
    out: ['{cli} validate: programme "osn", corpus at ', "OK -- 22 data file(s) validated"],
  },
  {
    ids: ["04"],
    row: 11,
    args: ["validate", "--json"],
    exit: 0,
    kind: "json",
    keys: ["ok", "programs"],
  },
  {
    ids: ["04"],
    row: 12,
    args: ["--json", "validate"],
    exit: 0,
    kind: "json",
    keys: ["ok", "programs"],
  },
  {
    ids: ["04"],
    row: 13,
    args: ["validate", "--program", "osn"],
    exit: 0,
    kind: "text",
    out: ["OK -- 22 data file(s) validated, 0 problem(s) found."],
  },
  ...PROGRAM_IDS.map(
    (id, index): Golden => ({
      ids: ["04"],
      row: index === 0 ? 14 : index === 1 ? 15 : 0,
      args: ["validate", "--program", id, "--json"],
      exit: 0,
      kind: "json",
      keys: ["program", "ok", "findings", "summary"],
      out: [`"program": "${id}"`, '"ok": true'],
    }),
  ),
  {
    ids: ["04", "07"],
    row: 16,
    args: ["validate", "--program", "nope"],
    exit: 2,
    kind: "text",
    err: [
      `{cli} validate: unknown programme "nope". Registered programmes: ${PROGRAM_IDS.join(", ")}.`,
    ],
  },
  {
    ids: ["04", "07"],
    row: 17,
    args: ["validate", "--program"],
    exit: 2,
    kind: "text",
    err: ["{cli} validate: --program requires a programme id argument."],
  },
  {
    ids: ["04"],
    row: 18,
    args: ["validate", "--bogus"],
    exit: 0,
    kind: "text",
    out: ['{cli} validate: programme "osn"'],
  },
  {
    ids: ["05"],
    row: 19,
    args: ["privacy-check"],
    exit: 0,
    kind: "text",
    out: ["{cli} privacy-check: scanning ", "0 direct-identifier-shaped key(s) found."],
  },
  {
    ids: ["05"],
    row: 20,
    args: ["privacy-check", "--json"],
    exit: 0,
    kind: "json",
    keys: ["ok", "findings", "parseIssues", "summary"],
  },
  {
    ids: ["05", "07"],
    row: 21,
    args: ["privacy-check", "--bogus"],
    exit: 2,
    kind: "text",
    err: [
      '{cli} privacy-check: unrecognised argument "--bogus". Run "{cli} privacy-check --help" for usage.',
    ],
  },
  {
    ids: ["06"],
    row: 22,
    args: ["checklist"],
    exit: 0,
    kind: "text",
    out: ["# osn checklist: cohort readiness & operational rules"],
  },
  {
    ids: ["06"],
    row: 23,
    args: ["checklist", "--json"],
    exit: 0,
    kind: "json",
    keys: [
      "corpusVersion",
      "asOf",
      "syllabusCheck",
      "readinessItems",
      "operationalRules",
      "quickPointer",
    ],
  },
  {
    ids: ["06", "07"],
    row: 24,
    args: ["checklist", "--format", "xml"],
    exit: 2,
    kind: "text",
    err: ['{cli} checklist: --format must be "md" or "json"; received "xml".'],
  },
  {
    ids: ["06", "07"],
    row: 25,
    args: ["plan"],
    exit: 2,
    kind: "text",
    err: ['{cli} plan: --start <YYYY-MM-DD> is required. Run "{cli} plan --help" for usage.'],
  },
  {
    ids: ["06"],
    row: 26,
    args: ["plan", "--start", "2027-01-04"],
    exit: 0,
    kind: "text",
    out: ["# osn plan: cohort calendar"],
  },
  {
    ids: ["06"],
    row: 27,
    args: ["plan", "--start", "2027-01-04", "--json"],
    exit: 0,
    kind: "json",
    keys: [
      "startDate",
      "excludedDates",
      "targetStage",
      "weeks",
      "projectedEndDate",
      "baselineEndDate",
      "targetStageInfo",
      "warnings",
    ],
  },
  {
    ids: ["06", "07"],
    row: 28,
    args: ["plan", "--start", "2027-13-40"],
    exit: 2,
    kind: "text",
    err: ["{cli} plan: ", "is not a valid calendar date"],
  },
  {
    ids: ["06"],
    row: 29,
    args: ["plan", "--program", "sma-coding", "--track", "A"],
    exit: 0,
    kind: "text",
    out: ["# Rencana Pembelajaran -- Jalur A: Algoritmik dengan C++"],
  },
  {
    ids: ["06"],
    row: 30,
    args: ["plan", "--program", "sma-coding", "--track", "A", "--format", "json"],
    exit: 0,
    kind: "json",
    out: ['"program": "Silabus Pembelajaran Coding SMA"'],
  },
  {
    ids: ["06", "07"],
    row: 31,
    args: ["plan", "--program", "sma-coding", "--track", "A", "--start", "2027-01-04"],
    exit: 2,
    kind: "text",
    err: ["{cli} plan: "],
  },
  {
    ids: ["06", "07"],
    row: 32,
    args: ["plan", "--program", "tk-coding", "--start", "2027-01-04"],
    exit: 2,
    kind: "text",
    err: ["{cli} plan: ", "tk-coding"],
  },
  {
    ids: ["06", "07"],
    row: 33,
    args: ["render"],
    exit: 2,
    kind: "text",
    err: [
      "{cli} render: a subcommand is required. Valid subcommands: weekly, checkpoint, sop, lembar-siswa, modul.",
    ],
  },
  {
    ids: ["06"],
    row: 34,
    args: ["render", "weekly", "--week", "1"],
    exit: 0,
    kind: "text",
    out: ["# Week 1: Orientasi CP & C++ dasar"],
  },
  {
    ids: ["06"],
    row: 35,
    args: ["render", "weekly", "--week", "1", "--json"],
    exit: 0,
    kind: "text",
    out: ["# Week 1: Orientasi CP & C++ dasar"],
  },
  {
    ids: ["06", "07"],
    row: 36,
    args: ["render", "weekly", "--week", "99"],
    exit: 2,
    kind: "text",
    err: ["{cli} render weekly: ", "week 99 is out of range. Valid range: 1-28."],
  },
  {
    ids: ["06"],
    row: 37,
    args: ["render", "checkpoint", "--number", "1"],
    exit: 0,
    kind: "text",
    out: ["# Checkpoint 1 (after week 4: "],
  },
  {
    ids: ["06"],
    row: 38,
    args: ["render", "sop"],
    exit: 0,
    kind: "text",
    out: ["# Mentor SOP card"],
  },
  {
    ids: ["06"],
    row: 39,
    args: ["render", "lembar-siswa", "--week", "1"],
    exit: 0,
    kind: "text",
    out: ["# Lembar Belajar Siswa -- Minggu 1"],
  },
  {
    ids: ["06"],
    row: 40,
    args: ["render", "modul", "--id", "aritmetika"],
    exit: 0,
    kind: "text",
    out: ["# Aritmetika dan Teori Bilangan Dasar"],
  },
  {
    ids: ["06", "07"],
    row: 41,
    args: ["render", "modul", "--id", "modul-bogus"],
    exit: 2,
    kind: "text",
    err: ['{cli} render modul: unknown module "modul-bogus". Known modules: '],
  },
  {
    ids: ["06"],
    row: 42,
    args: ["render", "modul", "--program", "tk-coding", "--id", "tk-a1-m10", "--lembar"],
    exit: 0,
    kind: "text",
    out: ["# Memakai alat dengan aman"],
  },
  {
    // Not in the section-3 baseline: the row the contract says was never run.
    ids: ["06"],
    row: 0,
    args: ["render", "modul", "--program", "sma-coding", "--id", "a-x1-m10"],
    exit: 0,
    kind: "text",
    out: ["# Percabangan dan logika Boolean"],
  },
  {
    ids: ["06", "07"],
    row: 0,
    args: ["render", "modul", "--program", "sma-coding", "--id", "a-x1-m10", "--lembar"],
    exit: 2,
    kind: "text",
    err: ["{cli} render modul: --lembar ", "sma-coding"],
  },
  {
    ids: ["06", "07"],
    row: 0,
    args: ["render", "modul", "--program", "sma-coding", "--id", "modul-bogus"],
    exit: 2,
    kind: "text",
    err: ['{cli} render modul: unknown module "modul-bogus". Known modules: ', "a-x1-m10"],
  },
  {
    ids: ["06", "07"],
    row: 43,
    args: ["render", "weekly", "--week", "1", "--program", "nope"],
    exit: 2,
    kind: "text",
    err: ['{cli} render: unknown programme "nope". Registered programmes: '],
  },
  {
    ids: ["06", "07"],
    row: 44,
    args: ["report"],
    exit: 2,
    kind: "text",
    err: ['{cli} report: --records <path> is required. Run "{cli} report --help" for usage.'],
  },
  {
    ids: ["06"],
    row: 45,
    args: ["report", "--records", SAMPLE_RECORDS],
    exit: 0,
    kind: "text",
    out: ["# osn report: mentor KPI dashboard"],
  },
  {
    ids: ["06"],
    row: 46,
    args: ["report", "--records", SAMPLE_RECORDS, "--json"],
    exit: 0,
    kind: "json",
    keys: ["groupBy", "recordCount", "overall", "groups", "postmortem", "scheduledResolves"],
  },
  {
    ids: ["06", "07"],
    row: 47,
    args: ["report", "--records", "tests/nofile.jsonl"],
    exit: 2,
    kind: "text",
    err: ["{cli} report: failed to read --records "],
  },
  {
    ids: ["06", "07"],
    row: 48,
    args: ["report", "--records", SAMPLE_RECORDS, "--by", "topic"],
    exit: 2,
    kind: "text",
    err: ["{cli} report: --by topic is not supported by the CLI: "],
  },
];

/** Block between "Commands:" and "Global flags:", the part that must not differ between names. */
function commandBlock(text: string): string {
  return text.slice(text.indexOf("Commands:"), text.indexOf("Global flags:"));
}

function assertGolden(row: Golden, results: Readonly<Record<CliName, CliResult>>): void {
  for (const name of CLI_NAMES) {
    const result = results[name];
    const where = `${name} ${row.args.join(" ")}`;
    expect(result.exitCode, `${where}: exit code`).toBe(row.exit);
    if (row.exit === 0) {
      // CLI-C-11: a successful command writes nothing to stderr.
      expect(result.stderr, `${where}: stderr on success`).toBe("");
    } else {
      expect(result.stdout, `${where}: stdout on failure`).toBe("");
    }
    for (const needle of row.out ?? []) {
      expect(normalisePath(result.stdout)).toContain(forCli(needle, name));
    }
    for (const needle of row.err ?? []) {
      expect(normalisePath(result.stderr)).toContain(forCli(needle, name));
    }
    if (row.exit === 2 && row.kind !== "help") {
      expect(result.stderr.startsWith(name), `${where}: stderr starts with the caller`).toBe(true);
    }
    if (row.kind === "version") {
      expect(result.stdout).toBe(`${packageJson.version}\n`);
    }
    if (row.keys !== undefined) {
      expect(Object.keys(JSON.parse(result.stdout))).toEqual([...row.keys]);
    }
  }

  const { cac, osn } = results;
  expect(cac.exitCode).toBe(osn.exitCode);
  if (row.kind === "json") {
    // JSON carries no bin name, so the two names must agree byte for byte.
    expect(cac.stdout).toBe(osn.stdout);
    expect(cac.stderr).toBe(osn.stderr);
  } else if (row.kind === "help") {
    expect(commandBlock(cac.stdout + cac.stderr)).toBe(commandBlock(osn.stdout + osn.stderr));
  } else {
    expect(asOsn(cac.stdout)).toBe(normalisePath(osn.stdout));
    expect(asOsn(cac.stderr)).toBe(normalisePath(osn.stderr));
  }
}

for (const id of ["01", "02", "03", "04", "05", "06"]) {
  const rows = GOLDEN.filter((row) => row.ids.includes(id));
  describe(`CLI-C-${id}: golden rows for cac and osn`, () => {
    for (const row of rows) {
      const label = row.row === 0 ? "new" : `row ${row.row}`;
      test(`[${label}] ${row.args.join(" ") || "(no arguments)"}`, async () => {
        assertGolden(row, await runBoth(row.args));
      });
    }
  });
}

let tempDir: string;

beforeAll(async () => {
  tempDir = await makeTempDir("cac-contract");
});

afterAll(async () => {
  await removeDir(tempDir);
});

describe("CLI-C-04: validate over every registered programme", () => {
  test("the aggregate lists the seven programmes in registry order, all ok", async () => {
    const results = await runBoth(["validate", "--json"]);
    expect(results.cac.stdout).toBe(results.osn.stdout);
    const parsed = JSON.parse(results.cac.stdout) as {
      ok: boolean;
      programs: { program: string; ok: boolean }[];
    };
    expect(parsed.ok).toBe(true);
    expect(parsed.programs.map((entry) => entry.program)).toEqual([...PROGRAM_IDS]);
    expect(parsed.programs.every((entry) => entry.ok)).toBe(true);
  });
});

describe("CLI-C-07: exit 2 for --out without --force, and --out/--force behaviour", () => {
  /** Commands that accept `--out`/`--force` (each prints the same artefact on stdout without `--out`). */
  const OUT_CASES: readonly { label: string; args: readonly string[] }[] = [
    { label: "render weekly", args: ["render", "weekly", "--week", "1"] },
    { label: "render sop", args: ["render", "sop"] },
    {
      label: "render modul (sma-coding)",
      args: ["render", "modul", "--program", "sma-coding", "--id", "a-x1-m10"],
    },
    { label: "checklist", args: ["checklist"] },
    { label: "report", args: ["report", "--records", SAMPLE_RECORDS] },
  ];

  for (const { label, args } of OUT_CASES) {
    test(`${label}: --out writes, refuses to overwrite (2), --force overwrites`, async () => {
      for (const name of CLI_NAMES) {
        const outPath = join(tempDir, `${label.replace(/\W+/g, "-")}-${name}.md`);
        const expected = await runEntry(name, args);
        expect(expected.exitCode).toBe(0);

        const written = await runEntry(name, [...args, "--out", outPath]);
        expect(written.exitCode).toBe(0);
        expect(written.stderr).toBe("");
        expect(await readFile(outPath, "utf-8")).toBe(expected.stdout);

        await writeFile(outPath, "SENTINEL\n");
        const refused = await runEntry(name, [...args, "--out", outPath]);
        expect(refused.exitCode).toBe(2);
        expect(refused.stderr.startsWith(`${name} `)).toBe(true);
        expect(refused.stderr).toContain("already exists. Use --force to overwrite it.");
        expect(await readFile(outPath, "utf-8")).toBe("SENTINEL\n");

        const forced = await runEntry(name, [...args, "--out", outPath, "--force"]);
        expect(forced.exitCode).toBe(0);
        expect(await readFile(outPath, "utf-8")).toBe(expected.stdout);
      }
    });
  }

  test("--out into a directory that does not exist exits 2 for both names", async () => {
    const outPath = join(tempDir, "no-such-dir", "out.md");
    const results = await runBoth(["render", "sop", "--out", outPath]);
    for (const name of CLI_NAMES) {
      expect(results[name].exitCode).toBe(2);
      expect(results[name].stderr.startsWith(`${name} render sop: `)).toBe(true);
    }
  });
});

describe("CLI-C-08: exit 1 for both names", () => {
  test("validate --data-dir on a corrupted corpus copy", async () => {
    const dir = join(tempDir, "corrupt-corpus");
    await cp(join(REPO_ROOT, "data", "osn"), dir, { recursive: true });
    const weeksPath = join(dir, "weeks.json");
    const weeksFile = JSON.parse(await readFile(weeksPath, "utf-8")) as {
      weeks: { week: number }[];
    };
    weeksFile.weeks = weeksFile.weeks.filter((week) => week.week !== 27);
    await writeFile(weeksPath, JSON.stringify(weeksFile, null, 2));

    const results = await runBoth(["validate", "--data-dir", dir]);
    for (const name of CLI_NAMES) {
      expect(results[name].exitCode).toBe(1);
      expect(results[name].stdout).toContain("weeks.json:");
      expect(results[name].stdout).toContain(`${name} validate:`);
    }
    expect(asOsn(results.cac.stdout).replaceAll(dir, "<DIR>")).toBe(
      asOsn(results.osn.stdout).replaceAll(dir, "<DIR>"),
    );

    const json = await runBoth(["validate", "--data-dir", dir, "--json"]);
    expect(json.cac.exitCode).toBe(1);
    expect(json.osn.exitCode).toBe(1);
    expect(json.cac.stdout).toBe(json.osn.stdout);
    expect(JSON.parse(json.cac.stdout).ok).toBe(false);
  });

  test("privacy-check --data-dir on a directory with a planted identifier key", async () => {
    const dir = join(tempDir, "privacy-fixture");
    await mkdir(dir, { recursive: true });
    await writeFile(
      join(dir, "planted.json"),
      JSON.stringify({ id: "x", email: "sentinel-value" }),
    );

    const results = await runBoth(["privacy-check", "--data-dir", dir]);
    for (const name of CLI_NAMES) {
      expect(results[name].exitCode).toBe(1);
      expect(results[name].stdout).toContain("planted.json");
      expect(results[name].stdout).not.toContain("sentinel-value");
    }
    const json = await runBoth(["privacy-check", "--data-dir", dir, "--json"]);
    expect(json.cac.exitCode).toBe(1);
    expect(json.cac.stdout).toBe(json.osn.stdout);
  });

  test("report with a record carrying a direct identifier refuses, never echoing the value", async () => {
    const secret = "sentinel-address@example.invalid";
    const base = (await readFile(join(REPO_ROOT, SAMPLE_RECORDS), "utf-8")).split(
      "\n",
    )[0] as string;
    const recordsPath = join(tempDir, "identifier.jsonl");
    await writeFile(recordsPath, `${JSON.stringify({ ...JSON.parse(base), email: secret })}\n`);

    const results = await runBoth(["report", "--records", recordsPath]);
    for (const name of CLI_NAMES) {
      expect(results[name].exitCode).toBe(1);
      expect(results[name].stderr.startsWith(`${name} report: privacy refusal`)).toBe(true);
      expect(results[name].stderr).toContain('key "email"');
      expect(results[name].stderr).not.toContain(secret);
      expect(results[name].stdout).toBe("");
    }
    expect(asOsn(results.cac.stderr)).toBe(asOsn(results.osn.stderr));
  });

  test("report with a schema-invalid record exits 1", async () => {
    const base = (await readFile(join(REPO_ROOT, SAMPLE_RECORDS), "utf-8")).split(
      "\n",
    )[0] as string;
    const recordsPath = join(tempDir, "invalid.jsonl");
    await writeFile(
      recordsPath,
      `${JSON.stringify({ ...JSON.parse(base), verdict: "NOT-A-VERDICT" })}\n`,
    );

    const results = await runBoth(["report", "--records", recordsPath]);
    for (const name of CLI_NAMES) {
      expect(results[name].exitCode).toBe(1);
      expect(results[name].stderr).toContain("index 0");
    }
  });
});

describe("CLI-C-09: defaults and an untouched corpus", () => {
  const DEFAULT_PAIRS: readonly {
    label: string;
    implicit: readonly string[];
    explicit: readonly string[];
  }[] = [
    {
      label: "plan",
      implicit: ["plan", "--start", "2027-01-04", "--json"],
      explicit: ["plan", "--program", "osn", "--start", "2027-01-04", "--json"],
    },
    {
      label: "render weekly",
      implicit: ["render", "weekly", "--week", "1"],
      explicit: ["render", "weekly", "--week", "1", "--program", "osn"],
    },
    {
      label: "report",
      implicit: ["report", "--records", SAMPLE_RECORDS, "--json"],
      explicit: ["report", "--records", SAMPLE_RECORDS, "--json", "--program", "osn"],
    },
    {
      label: "checklist",
      implicit: ["checklist", "--json"],
      explicit: ["checklist", "--json", "--program", "osn"],
    },
  ];

  for (const { label, implicit, explicit } of DEFAULT_PAIRS) {
    test(`${label} without --program equals --program osn, for both names`, async () => {
      for (const name of CLI_NAMES) {
        const [a, b] = await Promise.all([runEntry(name, implicit), runEntry(name, explicit)]);
        expect(a.exitCode).toBe(0);
        expect(a.stdout).toBe(b.stdout);
      }
    });
  }

  test("data/ and the registry hash identically before and after a run of commands", async () => {
    const dataDir = join(REPO_ROOT, "data");
    const before = await hashTree(dataDir);
    const registryBefore = await readFile(join(dataDir, "programs.json"), "utf-8");
    const outPath = join(tempDir, "hash-check.md");
    for (const name of CLI_NAMES) {
      for (const args of [
        ["validate"],
        ["privacy-check"],
        ["checklist", "--out", outPath, "--force"],
        ["render", "weekly", "--week", "1"],
        ["report", "--records", SAMPLE_RECORDS],
      ]) {
        await runEntry(name, args);
      }
    }
    expect(await hashTree(dataDir)).toBe(before);
    expect(await readFile(join(dataDir, "programs.json"), "utf-8")).toBe(registryBefore);
  });
});

describe("CLI-C-12: package.json bin and package identity", () => {
  test("bin declares cac and osn pointing at existing entry files", async () => {
    expect(packageJson.bin).toEqual({ cac: "src/cli/cac.ts", osn: "src/cli/index.ts" });
    for (const name of CLI_NAMES) {
      expect(packageJson.bin[name]).toBe(CLI_ENTRIES[name].slice(REPO_ROOT.length + 1));
      expect(await Bun.file(CLI_ENTRIES[name]).exists()).toBe(true);
    }
  });

  test("packageInfo.name equals the package.json name (the name itself is not pinned)", () => {
    expect<string>(packageInfo.name).toBe(packageJson.name);
  });
});

describe("CLI-C-13: package scripts run the same core", () => {
  test("validate and privacy-check scripts call the osn entry, which delegates to runCli", async () => {
    expect(packageJson.scripts.validate).toBe("bun run src/cli/index.ts validate");
    expect(packageJson.scripts["privacy-check"]).toBe("bun run src/cli/index.ts privacy-check");
    for (const name of CLI_NAMES) {
      const source = await readFile(CLI_ENTRIES[name], "utf-8");
      expect(source).toContain('import { runCli } from "./run-cli";');
      expect(source).toContain("await runCli(");
    }
  });

  test("bun run validate and bun run privacy-check still pass", async () => {
    for (const script of ["validate", "privacy-check"]) {
      const proc = Bun.spawn(["bun", "run", script], {
        cwd: REPO_ROOT,
        stdout: "pipe",
        stderr: "pipe",
      });
      const [stdout, stderr, exitCode] = await Promise.all([
        new Response(proc.stdout).text(),
        new Response(proc.stderr).text(),
        proc.exited,
      ]);
      expect(exitCode, `${script}: ${stderr}`).toBe(0);
      expect(stdout).toContain(`osn ${script}:`);
    }
  });
});
