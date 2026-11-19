/**
 * `osn validate` -- validates the curriculum corpus of one programme (every
 * `data/<program>/*.json` file) or of every registered programme in one
 * pass: schema conformance, structural invariants, referential integrity,
 * and agreement with the programme registry `data/programs.json`
 * (ADR-0006). See `src/domain/corpus-audit.ts` and
 * `src/domain/programs.ts` for the actual checks; this module is only the
 * thin I/O + formatting + exit-code shell around them, per the "Layering
 * rules" in `docs/architecture/README.md`.
 */

import { resolve } from "node:path";
import { crossProgramCodeFindings } from "../../domain/cross-program-refs";
import {
  DEFAULT_PROGRAM_ID,
  findProgram,
  listProgramIds,
  REGISTRY_FILE_NAME,
  registryVersionFindings,
  withExtraFindings,
} from "../../domain/programs";
import type { Program, ProgramRegistry } from "../../schema/program";
import type { Command, CommandContext } from "../command";
import {
  cliOf,
  DEFAULT_CLI_NAME,
  EXIT_SUCCESS,
  EXIT_USAGE_ERROR,
  EXIT_VALIDATION_FAILURE,
} from "../command";
import { loadCorpusFromDirectory } from "../corpus-loader";
import { formatAuditJson, formatAuditText } from "../format-audit";
import { moduleContentFindings } from "../module-content";
import {
  extractProgramFlag,
  loadCrossProgramCodes,
  loadOsnTopicFamilyIds,
  loadProgramRegistry,
  REPO_ROOT,
  repoPathExists,
} from "../program-loader";
import {
  emptyAuditResult,
  findProgramModule,
  missingProgramModuleFinding,
  type ProgramAuditContext,
} from "../program-registry";

function helpText(cli: string): string {
  return `${cli} validate -- validate the curriculum corpus of one or every programme

Validates data/programs.json (the programme registry) and, per programme,
every data/<program>/*.json file against its schema. Programme "osn" is
checked against the fixed
structural invariants (28 weeks, 7 gates, 10 topic families, 41
references, 4 stages, 4 categories, 4 status codes, 7 KPI metrics, 7
playbooks, 6 assessment bank kinds, assessment weights summing to 100,
both session templates summing to 120 minutes, 5 hint levels), and checks
referential integrity across the corpus (week -> topic family, week
checkpoint numbering <-> gate weeks, assessment-bank kind -> competition
stage, every Rnn citation -> the reference register). Programme "sma-coding"
has its own file set and schemas (data/sma-coding/, ADR-0006): the fixed counts
of the approved syllabus (6 CP quotations, 36 CP items, 6 semesters per track
whose weeks run 1..14, except kelas X semester 1 where track weeks run 8..14
after the 7-week shared foundation block FND-X1), CP code / week code / track references, and that every OSN topic
family id used by the OSN bridge exists in data/osn/topic-families.json. When a programme has a
learning-module index (data/<program>/modules.json, ADR-0007) it is checked
too, with the programme's own schema: OSN modules by topic family / week /
reference ids; sma-coding modules by CP item codes (cp-elements.json), week
codes (weeks.json or foundation.json), OSN bridge family ids,
prerequisites (module ids or foundation week codes, no cycle); tk-coding,
sd-coding, smp-coding, kuliah-coding and dewasa-coding modules each by their
own schema: the one unit code (week, course or module code) and its id, the
CP overlap / CP item / CP code / knowledge area / SKKNI unit codes that the
corpus maps to that unit and no others, prerequisites (module ids or unit
codes, no cycle); and for every programme that every module's Markdown body
exists and is non-empty (tk-coding and sd-coding: also the child's learner
sheet content/<program>/lembar/<id>.md, which must carry no name or identity
field). A reference file that a check needs but that is missing or invalid is
a finding, not a skipped check. It also checks that
the registry's syllabusVersion/syllabusDate equal the ones carried by the
programme's corpus files and that the registered source document exists.
For the bridge files a programme lists (ADR-0010) it also checks that every week,
course and module code of any programme named in them exists in the corpus of
the programme it belongs to.
Reports every problem found in one pass, grouped by file.

Usage: ${cli} validate [options]

Options:
  --program <id>      Validate only this registered programme. Without it (and
                       without --data-dir), every registered programme is validated.
  --json              Emit machine-readable JSON instead of text:
                       { ok, program, findings, summary } for one programme,
                       { ok, programs: [...] } for all of them.
  --data-dir <path>   Validate a different corpus directory for one programme
                       (--program, default osn) instead of its registered
                       data/<program>/ (primarily for testing against a fixture corpus).
  -h, --help          Show this help.

Exit codes:
  0   every validated corpus is clean (no findings).
  1   a corpus or the registry has one or more findings (schema, structural, referential, version).
  2   usage error, e.g. unknown --program, --program/--data-dir given with no value, or a directory that cannot be read.`;
}

/**
 * One programme's audit: its corpus plus the registry cross-checks. The
 * programme-specific parts come from the table entry
 * (`src/cli/program-registry.ts`, ADR-0008); a registered programme with no
 * entry is reported as a finding rather than skipped.
 */
export async function auditProgram(program: Program, corpusDir: string, registry: ProgramRegistry) {
  const source = await loadCorpusFromDirectory(corpusDir);
  const module = findProgramModule(program.id);
  const extra = registryVersionFindings(program, source);
  const scanFiles = module?.crossProgramScan ?? [];
  const context: ProgramAuditContext = {
    osnTopicFamilyIds: module?.needsOsnTopicFamilyIds
      ? await loadOsnTopicFamilyIds(registry)
      : undefined,
    crossProgramCodes: scanFiles.length > 0 ? await loadCrossProgramCodes(registry) : undefined,
  };
  if (module !== undefined) {
    extra.push(
      ...module.moduleFindings(source, context),
      ...(await moduleContentFindings(source, REPO_ROOT, program.id, module.parseModulesIndex)),
    );
    // Cross-programme codes in the bridge tables must exist in the corpus they belong to (ADR-0010).
    for (const file of scanFiles) {
      const entry = source.get(file);
      if (entry?.ok === true && context.crossProgramCodes !== undefined) {
        extra.push(...crossProgramCodeFindings(file, entry.data, context.crossProgramCodes));
      }
    }
  } else {
    extra.push(missingProgramModuleFinding(program));
  }
  if (!(await repoPathExists(program.sourceDocument))) {
    extra.push({
      file: REGISTRY_FILE_NAME,
      path: `programs[${program.id}].sourceDocument`,
      severity: "error",
      message: `source document "${program.sourceDocument}" does not exist`,
    });
  }
  const base = module === undefined ? emptyAuditResult() : module.audit(source, context);
  return withExtraFindings(base, extra);
}

type ProgramAudit = Awaited<ReturnType<typeof auditProgram>>;

function emit(ctx: CommandContext, text: string): void {
  ctx.stdout(`${text}\n`);
}

export const validateCommand: Command = {
  name: "validate",
  summary: "Validate the corpus of one (--program) or every registered programme.",
  help: (cli = DEFAULT_CLI_NAME) => helpText(cli),

  async run(args, ctx) {
    const cli = cliOf(ctx);
    const { rest, value: programValue } = extractProgramFlag(args);
    if (programValue === null) {
      ctx.stderr(`${cli} validate: --program requires a programme id argument.\n`);
      return EXIT_USAGE_ERROR;
    }

    let dataDirOverride: string | undefined;
    const dataDirFlagIndex = rest.indexOf("--data-dir");
    if (dataDirFlagIndex !== -1) {
      const value = rest[dataDirFlagIndex + 1];
      if (value === undefined) {
        ctx.stderr(`${cli} validate: --data-dir requires a directory path argument.\n`);
        return EXIT_USAGE_ERROR;
      }
      dataDirOverride = resolve(ctx.cwd, value);
    }

    const loaded = await loadProgramRegistry();
    if (!loaded.ok) {
      ctx.stderr(`${cli} validate: ${loaded.message}\n`);
      return loaded.kind === "invalid" ? EXIT_VALIDATION_FAILURE : EXIT_USAGE_ERROR;
    }
    const { registry } = loaded;

    // One programme: an explicit --program, or --data-dir (which implies the default programme).
    if (programValue !== undefined || dataDirOverride !== undefined) {
      const id = programValue ?? DEFAULT_PROGRAM_ID;
      const program = findProgram(registry, id);
      if (program === undefined) {
        ctx.stderr(
          `${cli} validate: unknown programme "${id}". Registered programmes: ${listProgramIds(registry)}.\n`,
        );
        return EXIT_USAGE_ERROR;
      }
      const corpusDir = dataDirOverride ?? resolve(REPO_ROOT, program.corpusDir);
      let result: ProgramAudit;
      try {
        result = await auditProgram(program, corpusDir, registry);
      } catch (cause) {
        ctx.stderr(`${cli} validate: ${(cause as Error).message}\n`);
        return EXIT_USAGE_ERROR;
      }
      emit(
        ctx,
        ctx.json
          ? formatAuditJson({ program: program.id, ...result })
          : formatAuditText(result, corpusDir, program.id, cli),
      );
      return result.ok ? EXIT_SUCCESS : EXIT_VALIDATION_FAILURE;
    }

    // Every registered programme.
    const results: Array<{ program: string; corpusDir: string; audit: ProgramAudit }> = [];
    for (const program of registry.programs) {
      const corpusDir = resolve(REPO_ROOT, program.corpusDir);
      try {
        results.push({
          program: program.id,
          corpusDir,
          audit: await auditProgram(program, corpusDir, registry),
        });
      } catch (cause) {
        ctx.stderr(`${cli} validate: programme "${program.id}": ${(cause as Error).message}\n`);
        return EXIT_USAGE_ERROR;
      }
    }
    const ok = results.every((entry) => entry.audit.ok);
    emit(
      ctx,
      ctx.json
        ? formatAuditJson({
            ok,
            programs: results.map((entry) => ({ program: entry.program, ...entry.audit })),
          })
        : results
            .map((entry) => formatAuditText(entry.audit, entry.corpusDir, entry.program, cli))
            .join("\n\n"),
    );
    return ok ? EXIT_SUCCESS : EXIT_VALIDATION_FAILURE;
  },
};
