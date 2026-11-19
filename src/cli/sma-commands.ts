/**
 * The `--program sma-coding` branches of `osn plan` and `osn render
 * lembar-siswa` (issue #77, owner decision 2026-11-18). Flag parsing, corpus
 * loading and exit codes live here; the views are pure
 * (`src/domain/sma-plan.ts`, `src/render/sma-student-sheet.ts`,
 * `src/cli/format-sma-plan.ts`).
 */

import { resolve } from "node:path";
import {
  buildSmaTrackPlan,
  cpQuotesFor,
  exampleSmaWeekCodes,
  findSmaWeek,
  SMA_SEMESTER_CODES,
  SmaRequestError,
} from "../domain/sma-plan";
import { renderSmaStudentSheet } from "../render/sma-student-sheet";
import type { Program } from "../schema/program";
import { SMA_CLASSES } from "../schema/sma-common";
import type { CommandContext } from "./command";
import { cliOf, EXIT_SUCCESS, EXIT_USAGE_ERROR, EXIT_VALIDATION_FAILURE } from "./command";
import { formatSmaPlanJson, formatSmaPlanMarkdown } from "./format-sma-plan";
import { REPO_ROOT } from "./program-loader";
import { loadSmaCorpus } from "./sma-corpus-loader";

/** The value after `flag`: `undefined` when the flag is absent, `null` when it has no usable value. */
function flagValue(args: readonly string[], flag: string): string | undefined | null {
  const index = args.indexOf(flag);
  if (index === -1) {
    return undefined;
  }
  const value = args[index + 1];
  return value === undefined || value.startsWith("-") ? null : value;
}

const OSN_ONLY_PLAN_FLAGS = ["--start", "--exclude", "--target-stage"] as const;

/**
 * `osn plan --program sma-coding --track <id> [--kelas X|XI|XII] [--semester
 * <code>] [--format md|json]`. Returns the exit code (0, 1 or 2).
 */
export async function runSmaPlan(
  args: readonly string[],
  ctx: CommandContext,
  program: Program,
): Promise<number> {
  const usage = (message: string): number => {
    ctx.stderr(`${cliOf(ctx)} plan: ${message}\n`);
    return EXIT_USAGE_ERROR;
  };

  for (const flag of OSN_ONLY_PLAN_FLAGS) {
    if (args.includes(flag)) {
      return usage(
        `${flag} berlaku untuk rencana kohort OSN saja dan tidak dipakai untuk program ${program.id}. ` +
          "Gunakan --track, --kelas dan --semester.",
      );
    }
  }

  const track = flagValue(args, "--track");
  if (track === undefined || track === null) {
    return usage(
      `--track <jalur> wajib untuk program ${program.id} (jalur yang disetujui: A, B, C, D atau E). ` +
        `Jalankan "${cliOf(ctx)} plan --help".`,
    );
  }

  const kelas = flagValue(args, "--kelas");
  if (kelas === null) {
    return usage("--kelas memerlukan nilai (X, XI atau XII).");
  }
  if (kelas !== undefined && !(SMA_CLASSES as readonly string[]).includes(kelas)) {
    return usage(`--kelas harus X, XI atau XII; diterima ${JSON.stringify(kelas)}.`);
  }

  let semester = flagValue(args, "--semester");
  if (semester === null) {
    return usage(
      `--semester memerlukan nilai (${SMA_SEMESTER_CODES.join(", ")}, atau 1/2 bersama --kelas).`,
    );
  }
  if (semester === "1" || semester === "2") {
    if (kelas === undefined) {
      return usage(
        `--semester ${semester} memerlukan --kelas; atau pakai kode seperti X${semester}.`,
      );
    }
    semester = `${kelas}${semester}`;
  }
  if (semester !== undefined && !SMA_SEMESTER_CODES.includes(semester)) {
    return usage(
      `--semester harus salah satu dari ${SMA_SEMESTER_CODES.join(", ")} (atau 1/2 bersama --kelas); diterima ${JSON.stringify(semester)}.`,
    );
  }
  if (semester !== undefined && kelas !== undefined && semester.slice(0, -1) !== kelas) {
    return usage(`--semester ${semester} bukan semester kelas ${kelas}.`);
  }

  let format: "md" | "json" = ctx.json ? "json" : "md";
  if (args.includes("--format")) {
    const formatValue = flagValue(args, "--format");
    if (formatValue !== "md" && formatValue !== "json") {
      return usage(
        `--format must be "md" or "json"; received ${JSON.stringify(formatValue ?? "")}.`,
      );
    }
    format = formatValue;
  }

  const loaded = await loadSmaCorpus(resolve(REPO_ROOT, program.corpusDir));
  if (!loaded.ok) {
    ctx.stderr(`${cliOf(ctx)} plan: ${loaded.message}\n`);
    return EXIT_VALIDATION_FAILURE;
  }

  const semesters =
    semester !== undefined
      ? [semester]
      : kelas !== undefined
        ? SMA_SEMESTER_CODES.filter(
            (code) => code.startsWith(kelas) && code.length === kelas.length + 1,
          )
        : [];

  let plan: ReturnType<typeof buildSmaTrackPlan>;
  try {
    plan = buildSmaTrackPlan(loaded.corpus, track, semesters);
  } catch (cause) {
    if (cause instanceof SmaRequestError) {
      return usage(cause.message);
    }
    throw cause;
  }

  const source = {
    name: program.name,
    version: program.syllabusVersion,
    date: program.syllabusDate,
  };
  const scope = { kelas, semester };
  ctx.stdout(
    `${format === "json" ? formatSmaPlanJson(plan, scope, source) : formatSmaPlanMarkdown(plan, scope, source)}\n`,
  );
  return EXIT_SUCCESS;
}

export type SmaSheetResult =
  | { readonly ok: true; readonly content: string }
  | { readonly ok: false; readonly exitCode: number };

/** `osn render lembar-siswa --program sma-coding --week <kode>`: the sheet text, or the exit code after writing the error. */
export async function buildSmaLembarSiswa(
  weekRaw: string | undefined,
  ctx: CommandContext,
  program: Program,
): Promise<SmaSheetResult> {
  const fail = (message: string, exitCode: number = EXIT_USAGE_ERROR): SmaSheetResult => {
    ctx.stderr(`${cliOf(ctx)} render lembar-siswa: ${message}\n`);
    return { ok: false, exitCode };
  };

  const loaded = await loadSmaCorpus(resolve(REPO_ROOT, program.corpusDir));
  if (!loaded.ok) {
    return fail(loaded.message, EXIT_VALIDATION_FAILURE);
  }
  const examples = exampleSmaWeekCodes(loaded.corpus).join("; ");
  if (weekRaw === undefined || weekRaw.startsWith("-")) {
    return fail(
      `--week <kode minggu> wajib untuk program ${program.id}. Contoh kode yang sah: ${examples}.`,
    );
  }
  const code = weekRaw.trim().toUpperCase();
  const week = findSmaWeek(loaded.corpus, code);
  if (week === undefined) {
    return fail(
      `kode minggu ${JSON.stringify(weekRaw)} tidak dikenal untuk program ${program.id}. Contoh kode yang sah: ${examples}.`,
    );
  }
  const content = renderSmaStudentSheet(week, cpQuotesFor(loaded.corpus, week.cpItems), {
    name: program.name,
    version: program.syllabusVersion,
    date: program.syllabusDate,
  });
  return { ok: true, content };
}
