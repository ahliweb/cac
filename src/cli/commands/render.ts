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
import { renderModule, renderModuleLearnerSheet } from "../../render/module";
import { renderSopCard } from "../../render/sop";
import { renderStudentSheet } from "../../render/student-sheet";
import { renderWeeklyPlan } from "../../render/weekly";
import { SMA_CODING_PROGRAM_ID } from "../../schema/sma-common";
import type { Command } from "../command";
import { EXIT_SUCCESS, EXIT_USAGE_ERROR, EXIT_VALIDATION_FAILURE } from "../command";
import { loadModule } from "../module-content";
import { writeOutputFile } from "../output-writer";
import {
  hasLearnerSheets,
  REPO_ROOT,
  rejectNonOsnProgram,
  resolveProgramOption,
} from "../program-loader";
import { buildSmaLembarSiswa } from "../sma-commands";

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
unless its status is "disetujui" it starts with a DRAF/DITARIK banner). For
tk-coding and sd-coding a module is a teacher guide, and "modul --lembar"
renders the separate learner sheet for the child instead (same banner; a sheet
with a name or identity field of the child is refused).

Usage:
  osn render weekly --week <1-28> [--out <path>] [--force]
  osn render checkpoint --number <1-7> [--out <path>] [--force]
  osn render sop [--out <path>] [--force]
  osn render lembar-siswa --week <1-28> [--out <path>] [--force]
  osn render lembar-siswa --program sma-coding --week <week-code> [--out <path>] [--force]
  osn render modul --id <module-id> [--out <path>] [--force]
  osn render modul --program <id> --id <module-id> [--out <path>] [--force]
  osn render modul --program <tk-coding|sd-coding> --id <module-id> --lembar [--out <path>] [--force]

Options:
  --week <n>      Week number, 1-28. Required for "weekly" and "lembar-siswa".
                  For sma-coding, "lembar-siswa" takes a week code instead
                  (A-X1-M9, B-X2-M3, or a foundation week FND-X1-M3); an
                  unknown code exits 2 listing valid examples.
  --number <n>    Checkpoint number, 1-7. Required for "checkpoint".
  --id <id>       Module id from the programme's modules.json. Required for "modul".
  --lembar        With "modul", for tk-coding and sd-coding only: render the
                  child's learner sheet (content/<program>/lembar/<id>.md)
                  instead of the teacher guide. Exit 2 for any other programme.
  --out <path>    Write the rendered Markdown to this path instead of
                  stdout.
  --force         Overwrite --out if it already exists. Without it, an
                  existing file at --out is left byte-for-byte untouched
                  and the command exits 2.
  --program <id>  Programme whose corpus to use (a registered id; default osn).
                  sma-coding supports "lembar-siswa" (a sheet per week of a
                  track or of the foundation block, derived only from its
                  validated corpus) and "modul"; "weekly", "checkpoint" and
                  "sop" exit 2 for any programme but osn. "modul" works for
                  every programme that has a data/<program>/modules.json
                  (osn, sma-coding, tk-coding, sd-coding, smp-coding,
                  kuliah-coding, dewasa-coding).
  -h, --help      Show this help.

Exit codes:
  0   success.
  1   the sma-coding corpus fails validation (run osn validate), or the
      learner sheet asked for with --lembar has a name or identity field.
  2   usage error: missing/unknown subcommand, a missing required flag
      (--week/--number/--id), --week/--number outside its valid range (or an
      unknown sma-coding week code), an unknown or unreadable module,
      --lembar for a programme without learner sheets or with another
      subcommand than "modul", or
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

    // "modul" reads the programme's own corpus directory, and so does "lembar-siswa" for
    // sma-coding (issue #77); every other subcommand reads the OSN corpus.
    const smaSheet = subcommand === "lembar-siswa" && resolved.program.id === SMA_CODING_PROGRAM_ID;
    if (subcommand !== "modul" && !smaSheet) {
      const unsupported = rejectNonOsnProgram(`render ${subcommand}`, resolved.program, ctx);
      if (unsupported !== undefined) {
        return unsupported;
      }
    }

    const rest = args.slice(1);
    if (subcommand !== "modul" && rest.includes("--lembar")) {
      ctx.stderr(`osn render ${subcommand}: --lembar is only valid with "osn render modul".\n`);
      return EXIT_USAGE_ERROR;
    }
    let content: string;

    if (smaSheet) {
      const built = await buildSmaLembarSiswa(readFlagValue(rest, "--week"), ctx, resolved.program);
      if (!built.ok) {
        return built.exitCode;
      }
      content = built.content;
    } else if (subcommand === "weekly" || subcommand === "lembar-siswa") {
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
      const lembar = rest.includes("--lembar");
      if (lembar && !hasLearnerSheets(resolved.program.id)) {
        ctx.stderr(
          `osn render modul: --lembar berlaku untuk program tk-coding dan sd-coding saja (panduan guru plus lembar anak); program ${resolved.program.id} tidak punya lembar anak.\n`,
        );
        return EXIT_USAGE_ERROR;
      }
      const loaded = await loadModule(
        resolve(REPO_ROOT, resolved.program.corpusDir),
        id,
        REPO_ROOT,
        resolved.program.id,
      );
      if (!loaded.ok) {
        ctx.stderr(`osn render modul: ${loaded.message}\n`);
        return EXIT_USAGE_ERROR;
      }
      const programInfo = { id: resolved.program.id, name: resolved.program.name };
      if (lembar) {
        if (loaded.learnerSheet === undefined) {
          ctx.stderr(`osn render modul: module "${id}" has no learner sheet.\n`);
          return EXIT_USAGE_ERROR;
        }
        try {
          content = renderModuleLearnerSheet(loaded.module, loaded.learnerSheet.body, programInfo);
        } catch (cause) {
          if (cause instanceof RenderRequestError) {
            ctx.stderr(`osn render modul: ${cause.message}\n`);
            return EXIT_VALIDATION_FAILURE;
          }
          throw cause;
        }
      } else {
        content = renderModule(loaded.module, loaded.body, loaded.references, programInfo);
      }
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
