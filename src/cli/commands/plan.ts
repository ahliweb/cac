/**
 * `osn plan` -- generates the dated 28-week cohort calendar against the §4
 * operational syllabus (issue #20). See `src/domain/cohort-plan.ts` for the
 * actual planning logic (`buildCohortPlan`); this module is only the thin
 * I/O + flag parsing + formatting + exit-code shell around it, per the
 * "Layering rules" in `docs/architecture/README.md` -- exactly the same
 * split `src/cli/commands/validate.ts` uses around `auditCorpus`.
 */

import { buildCohortPlan, type CohortPlan } from "../../domain/cohort-plan";
import { SMA_CODING_PROGRAM_ID } from "../../schema/sma-common";
import type { Command } from "../command";
import { cliOf, DEFAULT_CLI_NAME, EXIT_SUCCESS, EXIT_USAGE_ERROR } from "../command";
import { formatPlanJson, formatPlanMarkdown } from "../format-plan";
import { rejectNonOsnProgram, resolveProgramOption } from "../program-loader";
import { runSmaPlan } from "../sma-commands";

function helpText(cli: string): string {
  return `${cli} plan -- generate the dated 28-week cohort calendar

Builds the §4 28-week operational calendar from a cohort start date:
per-week date ranges, focus, session dates, mini-contest and checkpoint
markers, and the gate evidence required to proceed past a gate week.
Excluded dates (holidays, exams) shift subsequent weeks rather than
silently overlapping -- see docs/cli/README.md's "osn plan" section for
the exact week-shifting and session-date rules.

Usage:
  ${cli} plan --start <YYYY-MM-DD> [options]
  ${cli} plan --program sma-coding --track <A|B|C|D|E> [--kelas <X|XI|XII>] [--semester <kode>] [options]

Options:
  --start <date>          Cohort start date, ISO YYYY-MM-DD. Required (osn).
  --exclude <d1,d2,...>   Comma-separated ISO YYYY-MM-DD dates to exclude
                           (school holidays, exam days, ...). Optional (osn).
  --target-stage <id>     Report against a target competition stage's
                           intensive week (osn-k, osn-p, osn-nasional, or
                           toki-ioi-extension). Optional (osn).
  --track <id>            Learning track of the sma-coding programme (A, B, C,
                           D or E, the approved tracks). Required for
                           sma-coding. Track E starts in kelas XI.
  --kelas <X|XI|XII>      sma-coding: only the two semesters of this class.
  --semester <kode>       sma-coding: only this semester (X1, X2, XI1, XI2,
                           XII1, XII2; or 1/2 together with --kelas). Without
                           --kelas and --semester, all six semesters (four for
                           track E, which has no kelas X semesters).
  --format <md|json>      Output format. Default: md. --json is equivalent
                           to --format json.
  --program <id>  Programme whose corpus to use (a registered id; default osn).
                  osn: the dated 28-week cohort calendar. sma-coding: the
                  plan per semester of one track (Markdown or JSON): every
                  week with its code, topic, objective, output, exercise,
                  mapped CP items and OSN bridge; kelas X semester 1 starts
                  with the shared foundation block FND-X1-M1..M7. The
                  OSN-only flags --start, --exclude and --target-stage exit 2
                  for sma-coding.
  -h, --help              Show this help.

Exit codes:
  0   success.
  1   the sma-coding corpus fails validation (run ${cli} validate).
  2   usage error: missing --start (osn) or --track (sma-coding), an
      invalid/non-ISO date, an unknown --target-stage, --track, --kelas,
      --semester, --format, or an unknown --program.`;
}

/** Extracts the value following the first occurrence of `flag` in `args`, or `undefined` if `flag` is absent. */
function readFlagValue(args: readonly string[], flag: string): string | undefined {
  const index = args.indexOf(flag);
  if (index === -1) {
    return undefined;
  }
  return args[index + 1];
}

export const planCommand: Command = {
  name: "plan",
  summary: "Generate the dated 28-week cohort calendar from a start date.",
  help: (cli = DEFAULT_CLI_NAME) => helpText(cli),

  async run(rawArgs, ctx) {
    const cli = cliOf(ctx);
    const resolved = await resolveProgramOption("plan", rawArgs, ctx);
    if (!resolved.ok) {
      return resolved.exitCode;
    }
    if (resolved.program.id === SMA_CODING_PROGRAM_ID) {
      return runSmaPlan(resolved.args, ctx, resolved.program);
    }
    const unsupported = rejectNonOsnProgram("plan", resolved.program, ctx);
    if (unsupported !== undefined) {
      return unsupported;
    }
    const args = resolved.args;
    if (!args.includes("--start")) {
      ctx.stderr(
        `${cli} plan: --start <YYYY-MM-DD> is required. Run "${cli} plan --help" for usage.\n`,
      );
      return EXIT_USAGE_ERROR;
    }

    const startValue = readFlagValue(args, "--start");
    if (startValue === undefined) {
      ctx.stderr(`${cli} plan: --start requires a date argument (YYYY-MM-DD).\n`);
      return EXIT_USAGE_ERROR;
    }

    let excludedDates: readonly string[] = [];
    if (args.includes("--exclude")) {
      const excludeValue = readFlagValue(args, "--exclude");
      if (excludeValue === undefined) {
        ctx.stderr(`${cli} plan: --exclude requires a comma-separated list of dates.\n`);
        return EXIT_USAGE_ERROR;
      }
      excludedDates = excludeValue
        .split(",")
        .map((entry) => entry.trim())
        .filter((entry) => entry.length > 0);
    }

    let targetStage: string | undefined;
    if (args.includes("--target-stage")) {
      const targetStageValue = readFlagValue(args, "--target-stage");
      if (targetStageValue === undefined) {
        ctx.stderr(`${cli} plan: --target-stage requires a stage id argument.\n`);
        return EXIT_USAGE_ERROR;
      }
      targetStage = targetStageValue;
    }

    let format: "md" | "json" = ctx.json ? "json" : "md";
    if (args.includes("--format")) {
      const formatValue = readFlagValue(args, "--format");
      if (formatValue !== "md" && formatValue !== "json") {
        ctx.stderr(
          `${cli} plan: --format must be "md" or "json"; received ${JSON.stringify(formatValue ?? "")}.\n`,
        );
        return EXIT_USAGE_ERROR;
      }
      format = formatValue;
    }

    let plan: CohortPlan;
    try {
      plan = buildCohortPlan({
        startDate: startValue,
        excludedDates,
        ...(targetStage !== undefined ? { targetStage } : {}),
      });
    } catch (cause) {
      ctx.stderr(`${cli} plan: ${(cause as Error).message}\n`);
      return EXIT_USAGE_ERROR;
    }

    ctx.stdout(`${format === "json" ? formatPlanJson(plan) : formatPlanMarkdown(plan)}\n`);
    return EXIT_SUCCESS;
  },
};
