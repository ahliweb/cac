/**
 * `osn render <weekly|checkpoint|sop|lembar-siswa|modul>` -- turns validated
 * corpus data into Markdown artefacts (issues #21, #53, #54). See
 * `src/render/weekly.ts`, `src/render/checkpoint.ts`, `src/render/sop.ts`
 * and `src/render/student-sheet.ts` for the actual pure
 * rendering logic; this module is only the thin subcommand/flag parsing +
 * `--out`/`--force` file-writing + exit-code shell around them, per the
 * "Layering rules" in `docs/architecture/README.md` -- exactly the same
 * split `src/cli/commands/plan.ts` uses around `buildCohortPlan`.
 */

import { resolve } from "node:path";
import { renderCheckpointSheet } from "../../render/checkpoint";
import { RenderRequestError } from "../../render/errors";
import { renderModule } from "../../render/module";
import { renderSopCard } from "../../render/sop";
import { renderStudentSheet } from "../../render/student-sheet";
import { renderWeeklyPlan } from "../../render/weekly";
import type { Command } from "../command";
import { EXIT_SUCCESS, EXIT_USAGE_ERROR } from "../command";
import { loadModule } from "../module-content";
import { writeOutputFile } from "../output-writer";
import { REPO_ROOT, rejectNonOsnProgram, resolveProgramOption } from "../program-loader";

const SUBCOMMANDS = ["weekly", "checkpoint", "sop", "lembar-siswa", "modul"] as const;
type RenderSubcommand = (typeof SUBCOMMANDS)[number];

function isRenderSubcommand(value: string | undefined): value is RenderSubcommand {
  return value !== undefined && (SUBCOMMANDS as readonly string[]).includes(value);
}

const HELP_TEXT = `osn render -- render mentor-facing Markdown artefacts

Turns the validated curriculum corpus into mentor-ready Markdown: a
weekly session plan (focus, content, outcome, both §5.1 120-minute
session templates, the SOP reminder, the hint ladder, the exit ticket,
and -- on a gate week -- the §4.1 gate evidence), a checkpoint sheet
(gate evidence, §6.1 rubric weights, the §6.2 A/B/C/D recording grid,
and the §6.3 KPI snapshot fields), or a one-page mentor SOP card (the
§5.2 seven-step SOP, minimum test checklist, post-Accepted questions,
and the §5.3 hint ladder), or a learner sheet for students ("lembar
belajar siswa": the week's coverage and outcome, topic families, practice
target, gate evidence, the §5.3 hint callout, a blank self-check list,
and references -- derived only from the validated corpus), or a learning
module ("modul": authored learning content from data/<program>/modules.json;
unless its status is "disetujui" it starts with a DRAF/DITARIK banner).

Usage:
  osn render weekly --week <1-28> [--out <path>] [--force]
  osn render checkpoint --number <1-7> [--out <path>] [--force]
  osn render sop [--out <path>] [--force]
  osn render lembar-siswa --week <1-28> [--out <path>] [--force]
  osn render modul --id <module-id> [--out <path>] [--force]

Options:
  --week <n>      Week number, 1-28. Required for "weekly" and "lembar-siswa".
  --number <n>    Checkpoint number, 1-7. Required for "checkpoint".
  --id <id>       Module id from the programme's modules.json. Required for "modul".
  --out <path>    Write the rendered Markdown to this path instead of
                  stdout.
  --force         Overwrite --out if it already exists. Without it, an
                  existing file at --out is left byte-for-byte untouched
                  and the command exits 2.
  --program <id>  Programme whose corpus to use (a registered id; default osn).
                  Only "modul" accepts another programme; the other
                  subcommands exit 2 for any programme but osn.
  -h, --help      Show this help.

Exit codes:
  0   success.
  2   usage error: missing/unknown subcommand, a missing required flag
      (--week/--number/--id), --week/--number outside its valid range, an
      unknown or unreadable module, or
      --out already exists without --force, or an unknown --program.`;

/** Extracts the value following the first occurrence of `flag` in `args`, or `undefined` if `flag` is absent (or has nothing after it). */
function readFlagValue(args: readonly string[], flag: string): string | undefined {
  const index = args.indexOf(flag);
  if (index === -1) {
    return undefined;
  }
  return args[index + 1];
}

/** Parses `rawValue` as a plain base-10 integer (optionally signed), returning `null` for anything else -- no leading/trailing junk, no decimals, no scientific notation, no `Infinity`/`NaN`. */
function parseInteger(rawValue: string): number | null {
  const trimmed = rawValue.trim();
  if (!/^-?\d+$/.test(trimmed)) {
    return null;
  }
  return Number(trimmed);
}

export const renderCommand: Command = {
  name: "render",
  summary:
    "Render Markdown artefacts (weekly plan, checkpoint sheet, SOP card, student learner sheet, learning module).",
  help: () => HELP_TEXT,

  async run(rawArgs, ctx) {
    const resolved = await resolveProgramOption("render", rawArgs, ctx);
    if (!resolved.ok) {
      return resolved.exitCode;
    }
    const args = resolved.args;
    const subcommand = args[0];
    if (!isRenderSubcommand(subcommand)) {
      const problem =
        subcommand === undefined
          ? "a subcommand is required"
          : `unknown subcommand ${JSON.stringify(subcommand)}`;
      ctx.stderr(
        `osn render: ${problem}. Valid subcommands: ${SUBCOMMANDS.join(", ")}. Run "osn render --help" for usage.\n`,
      );
      return EXIT_USAGE_ERROR;
    }

    // Only "modul" reads the programme's own corpus directory; every other subcommand reads the OSN corpus.
    if (subcommand !== "modul") {
      const unsupported = rejectNonOsnProgram(`render ${subcommand}`, resolved.program, ctx);
      if (unsupported !== undefined) {
        return unsupported;
      }
    }

    const rest = args.slice(1);
    let content: string;

    if (subcommand === "weekly" || subcommand === "lembar-siswa") {
      const weekRaw = readFlagValue(rest, "--week");
      if (weekRaw === undefined) {
        ctx.stderr(`osn render ${subcommand}: --week <1-28> is required.\n`);
        return EXIT_USAGE_ERROR;
      }
      const week = parseInteger(weekRaw);
      if (week === null) {
        ctx.stderr(
          `osn render ${subcommand}: --week must be an integer (1-28); received ${JSON.stringify(weekRaw)}.\n`,
        );
        return EXIT_USAGE_ERROR;
      }
      try {
        content =
          subcommand === "weekly"
            ? renderWeeklyPlan(week)
            : renderStudentSheet(week, {
                name: resolved.program.name,
                version: resolved.program.syllabusVersion,
                date: resolved.program.syllabusDate,
              });
      } catch (cause) {
        if (cause instanceof RenderRequestError) {
          ctx.stderr(`osn render ${subcommand}: ${cause.message}\n`);
          return EXIT_USAGE_ERROR;
        }
        throw cause;
      }
    } else if (subcommand === "checkpoint") {
      const numberRaw = readFlagValue(rest, "--number");
      if (numberRaw === undefined) {
        ctx.stderr("osn render checkpoint: --number <1-7> is required.\n");
        return EXIT_USAGE_ERROR;
      }
      const number = parseInteger(numberRaw);
      if (number === null) {
        ctx.stderr(
          `osn render checkpoint: --number must be an integer (1-7); received ${JSON.stringify(numberRaw)}.\n`,
        );
        return EXIT_USAGE_ERROR;
      }
      try {
        content = renderCheckpointSheet(number);
      } catch (cause) {
        if (cause instanceof RenderRequestError) {
          ctx.stderr(`osn render checkpoint: ${cause.message}\n`);
          return EXIT_USAGE_ERROR;
        }
        throw cause;
      }
    } else if (subcommand === "modul") {
      const id = readFlagValue(rest, "--id");
      if (id === undefined || id.startsWith("-")) {
        ctx.stderr("osn render modul: --id <module-id> is required.\n");
        return EXIT_USAGE_ERROR;
      }
      const loaded = await loadModule(resolve(REPO_ROOT, resolved.program.corpusDir), id);
      if (!loaded.ok) {
        ctx.stderr(`osn render modul: ${loaded.message}\n`);
        return EXIT_USAGE_ERROR;
      }
      content = renderModule(loaded.module, loaded.body, loaded.references, {
        id: resolved.program.id,
        name: resolved.program.name,
      });
    } else {
      content = renderSopCard();
    }

    const output = `${content}\n`;
    const outValue = readFlagValue(rest, "--out");

    if (outValue === undefined) {
      ctx.stdout(output);
      return EXIT_SUCCESS;
    }

    const force = rest.includes("--force");
    const outPath = resolve(ctx.cwd, outValue);
    const result = await writeOutputFile(outPath, output, force);

    if (!result.ok) {
      if (result.reason === "exists") {
        ctx.stderr(
          `osn render ${subcommand}: --out ${JSON.stringify(outValue)} already exists. Use --force to overwrite it.\n`,
        );
      } else {
        ctx.stderr(
          `osn render ${subcommand}: failed to write ${JSON.stringify(outValue)}: ${result.message}\n`,
        );
      }
      return EXIT_USAGE_ERROR;
    }

    ctx.stdout(`osn render ${subcommand}: wrote ${outValue}\n`);
    return EXIT_SUCCESS;
  },
};
