/**
 * The programme table (ADR-0008, issue #140): the one place that wires a
 * programme's own pieces -- data files and schemas, corpus audit, module
 * index hooks and optional fidelity module -- into `osn validate` and
 * `bun run check:fidelity`. Adding a programme means adding one entry here
 * (plus its own files); nothing in the commands changes.
 *
 * Two lists exist on purpose and must not be confused:
 *  - `data/programs.json` is the *registry*: the programmes the owner has
 *    approved (ADR-0006).
 *  - {@link PROGRAM_MODULES} is this *table*: the code that knows how to
 *    audit a programme. A registered programme with no entry here is a
 *    validation finding (never silently skipped); an entry here whose
 *    programme is not registered is a draft and is not validated.
 *
 * It lives in the CLI layer (not `src/domain/`) because a fidelity module
 * reads files; the audit functions it points to stay pure.
 */

import type { z } from "zod";
import {
  type AuditResult,
  auditCorpus,
  type CorpusFinding,
  type CorpusSource,
  DATA_FILE_REGISTRY,
} from "../domain/corpus-audit";
import { auditDewasaCorpus, DW_DATA_FILE_REGISTRY } from "../domain/dw-corpus-audit";
import { auditKulCorpus, KUL_DATA_FILE_REGISTRY } from "../domain/kul-corpus-audit";
import {
  type ModuleFindingsOptions,
  type ModulesIndex,
  moduleFindings,
  parseModulesIndex,
} from "../domain/modules";
import { REGISTRY_FILE_NAME } from "../domain/programs";
import { auditSmaCorpus, SMA_DATA_FILE_REGISTRY } from "../domain/sma-corpus-audit";
import { auditTkCorpus, TK_DATA_FILE_REGISTRY } from "../domain/tk-corpus-audit";
import { DEWASA_CODING_PROGRAM_ID } from "../schema/dw-common";
import { KUL_PROGRAM_ID } from "../schema/kul-common";
import type { Program } from "../schema/program";
import { SMA_CODING_PROGRAM_ID } from "../schema/sma-common";
import { TK_CODING_PROGRAM_ID } from "../schema/tk-common";
import { dewasaCodingFidelity } from "./fidelity/dewasa-coding";
import { kuliahCodingFidelity } from "./fidelity/kuliah-coding";
import { smaCodingFidelity } from "./fidelity/sma-coding";
import { tkCodingFidelity } from "./fidelity/tk-coding";
import type { FidelityModule } from "./fidelity/types";

/** Cross-programme inputs an audit may need; built once per `osn validate` run. */
export interface ProgramAuditContext {
  /** Ids in `data/osn/topic-families.json` (only loaded when the module sets `needsOsnTopicFamilyIds`). */
  readonly osnTopicFamilyIds?: ReadonlySet<string> | undefined;
}

/** One data file of a programme's corpus and the schema it must parse against. */
export interface ProgramDataFile {
  readonly file: string;
  readonly schema: z.ZodTypeAny;
}

/** Everything the commands need to know about one programme. */
export interface ProgramModule {
  /** The programme id, equal to its `data/programs.json` entry and `data/<id>/` directory. */
  readonly id: string;
  /** Every data file of the corpus with its schema (documentation and test anchor; the audit uses the same list). */
  readonly dataFiles: readonly ProgramDataFile[];
  /** Pure whole-corpus audit (schema, structure, references) of an injected corpus. */
  readonly audit: (source: CorpusSource, context: ProgramAuditContext) => AuditResult;
  /** `true` when the audit cross-references OSN topic families, so `osn validate` loads them first. */
  readonly needsOsnTopicFamilyIds: boolean;
  /** Parses the programme's `modules.json` (ADR-0007) with the programme's own schema. */
  readonly parseModulesIndex: (source: CorpusSource) => {
    readonly modules: ModulesIndex | undefined;
    readonly findings: CorpusFinding[];
  };
  /** Pure findings about the programme's module index. */
  readonly moduleFindings: (source: CorpusSource, context: ProgramAuditContext) => CorpusFinding[];
  /** Optional check of the corpus against the approved source document, run by `bun run check:fidelity`. */
  readonly fidelity?: FidelityModule;
}

function moduleOptions(context: ProgramAuditContext): ModuleFindingsOptions {
  return { osnTopicFamilyIds: context.osnTopicFamilyIds };
}

/** The table. One entry per programme that has code; keep ids unique. */
export const PROGRAM_MODULES: readonly ProgramModule[] = [
  {
    id: "osn",
    dataFiles: DATA_FILE_REGISTRY,
    audit: (source) => auditCorpus(source),
    needsOsnTopicFamilyIds: false,
    parseModulesIndex: (source) => parseModulesIndex(source, "osn"),
    moduleFindings: (source, context) => moduleFindings(source, "osn", moduleOptions(context)),
  },
  {
    id: KUL_PROGRAM_ID,
    dataFiles: KUL_DATA_FILE_REGISTRY,
    audit: (source) => auditKulCorpus(source),
    needsOsnTopicFamilyIds: false,
    // No learner modules yet (ADR-0007): no modules.json, no content/kuliah-coding/.
    parseModulesIndex: () => ({ modules: undefined, findings: [] }),
    moduleFindings: () => [],
    fidelity: kuliahCodingFidelity,
  },
  {
    id: SMA_CODING_PROGRAM_ID,
    dataFiles: SMA_DATA_FILE_REGISTRY,
    audit: (source, context) => auditSmaCorpus(source, context.osnTopicFamilyIds),
    needsOsnTopicFamilyIds: true,
    parseModulesIndex: (source) => parseModulesIndex(source, SMA_CODING_PROGRAM_ID),
    moduleFindings: (source, context) =>
      moduleFindings(source, SMA_CODING_PROGRAM_ID, moduleOptions(context)),
    fidelity: smaCodingFidelity,
  },
  {
    id: TK_CODING_PROGRAM_ID,
    dataFiles: TK_DATA_FILE_REGISTRY,
    audit: (source) => auditTkCorpus(source),
    needsOsnTopicFamilyIds: false,
    // tk-coding has no learning-module index (no modules.json); a stray one is an unregistered file.
    parseModulesIndex: () => ({ modules: undefined, findings: [] }),
    moduleFindings: () => [],
    fidelity: tkCodingFidelity,
  },
  {
    id: DEWASA_CODING_PROGRAM_ID,
    dataFiles: DW_DATA_FILE_REGISTRY,
    audit: (source) => auditDewasaCorpus(source),
    needsOsnTopicFamilyIds: false,
    // No ADR-0007 learning-content index yet (the module plan is module-plan.json).
    parseModulesIndex: () => ({ modules: undefined, findings: [] }),
    moduleFindings: () => [],
    fidelity: dewasaCodingFidelity,
  },
];

/** The table entry for programme `id`, or `undefined` when no code is registered for it. */
export function findProgramModule(id: string): ProgramModule | undefined {
  return PROGRAM_MODULES.find((module) => module.id === id);
}

/** Ids of every table entry that has a fidelity module, in table order. */
export function fidelityProgramIds(): string[] {
  return PROGRAM_MODULES.filter((module) => module.fidelity !== undefined).map(
    (module) => module.id,
  );
}

/**
 * The finding reported for a programme that `data/programs.json` registers
 * but the table has no entry for: its corpus cannot be audited, and saying
 * nothing would let it look validated.
 */
export function missingProgramModuleFinding(program: Program): CorpusFinding {
  return {
    file: REGISTRY_FILE_NAME,
    path: `programs[${program.id}]`,
    severity: "error",
    message:
      `programme "${program.id}" is registered but has no entry in PROGRAM_MODULES ` +
      "(src/cli/program-registry.ts), so its corpus cannot be validated; " +
      "add the programme's audit module there (ADR-0008)",
  };
}

/** An empty audit result to attach {@link missingProgramModuleFinding} to. */
export function emptyAuditResult(): AuditResult {
  return {
    ok: true,
    findings: [],
    summary: {
      filesValidated: 0,
      filesMissing: 0,
      filesUnregistered: 0,
      findingCount: 0,
      errorCount: 0,
      warningCount: 0,
    },
  };
}
