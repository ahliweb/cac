/**
 * Pure rules over a programme's learning-module index
 * (`data/<program>/modules.json`, ADR-0007, issue #54). No I/O: the corpus
 * arrives as an injected {@link CorpusSource}; the one filesystem check
 * (that each module's Markdown body exists and is non-empty) lives in
 * `src/cli/module-content.ts`.
 *
 * `modules.json` is optional: a programme without it is valid and yields no
 * findings. When present it is checked for schema conformance and for
 * referential integrity against the same corpus: topic family ids, week
 * numbers (and that each listed week actually exercises one of the module's
 * families), `refId` references, and that `contentPath` lies under the
 * programme's own `content/<program>/modules/`.
 */

import { DEWASA_CODING_PROGRAM_ID } from "../schema/dw-common";
import { KUL_PROGRAM_ID } from "../schema/kul-common";
import {
  MODULES_FILE_NAME,
  type Module,
  type ModulesFile,
  modulesFileSchema,
} from "../schema/module";
import { referencesFileSchema } from "../schema/reference";
import { SD_CODING_PROGRAM_ID } from "../schema/sd-common";
import { SMA_CODING_PROGRAM_ID } from "../schema/sma-common";
import { SMP_CODING_PROGRAM_ID } from "../schema/smp-common";
import { TK_CODING_PROGRAM_ID } from "../schema/tk-common";
import { topicFamiliesSchema } from "../schema/topic-family";
import { weeksSchema } from "../schema/week";
import type { CorpusFinding, CorpusSource } from "./corpus-audit";
import { dwModuleFindings, parseDwModulesIndex } from "./dw-modules";
import { kulModuleFindings, parseKulModulesIndex } from "./kul-modules";
import { parseSdModulesIndex, sdModuleFindings } from "./sd-modules";
import { parseSmaModulesIndex, smaModuleFindings } from "./sma-modules";
import { parseSmpModulesIndex, smpModuleFindings } from "./smp-modules";
import { parseTkModulesIndex, tkModuleFindings } from "./tk-modules";

/**
 * The part of an index entry every programme's module shape shares: what
 * `osn validate`'s body check and `osn render modul` need. Both the OSN
 * {@link Module} and the `sma-coding` module are assignable to it.
 */
export type ModuleIndexEntry = Pick<
  Module,
  "id" | "title" | "status" | "review" | "references" | "contentPath"
> & {
  /** `tk-coding` and `sd-coding` only: the child's learner sheet, `content/<program>/lembar/<id>.md`. */
  readonly learnerSheetPath?: string | undefined;
  /** `tk-coding` only: the CP Fase Fondasi items the week overlaps (interpreted overlap, never fulfilment). */
  readonly cpOverlap?: readonly string[] | undefined;
};

/** A programme's parsed module index, reduced to the shared entry shape. */
export interface ModulesIndex {
  readonly modules: readonly ModuleIndexEntry[];
}

/** Optional cross-programme inputs for {@link moduleFindings}. */
export interface ModuleFindingsOptions {
  /** Ids in `data/osn/topic-families.json`; used by the `sma-coding` bridge-family check. */
  readonly osnTopicFamilyIds?: ReadonlySet<string> | undefined;
}

function error(path: string, message: string): CorpusFinding {
  return { file: MODULES_FILE_NAME, path, message, severity: "error" };
}

/**
 * Parses the index out of `source` with the schema of programme `programId`
 * (default OSN; every other programme has its own, `src/schema/sma-module.ts`,
 * `tk-module.ts`, `sd-module.ts`, `smp-module.ts`, `kul-module.ts`,
 * `dw-learning-module.ts`): `undefined` when absent; findings when
 * unreadable/invalid.
 */
export function parseModulesIndex(
  source: CorpusSource,
  programId: string = "osn",
): {
  readonly modules: ModulesIndex | undefined;
  readonly findings: CorpusFinding[];
} {
  switch (programId) {
    case SMA_CODING_PROGRAM_ID:
      return parseSmaModulesIndex(source);
    case TK_CODING_PROGRAM_ID:
      return parseTkModulesIndex(source);
    case SD_CODING_PROGRAM_ID:
      return parseSdModulesIndex(source);
    case SMP_CODING_PROGRAM_ID:
      return parseSmpModulesIndex(source);
    case KUL_PROGRAM_ID:
      return parseKulModulesIndex(source);
    case DEWASA_CODING_PROGRAM_ID:
      return parseDwModulesIndex(source);
    default:
      return parseOsnModulesIndex(source);
  }
}

function parseOsnModulesIndex(source: CorpusSource): {
  readonly modules: ModulesFile | undefined;
  readonly findings: CorpusFinding[];
} {
  const entry = source.get(MODULES_FILE_NAME);
  if (entry === undefined) {
    return { modules: undefined, findings: [] };
  }
  if (!entry.ok) {
    return { modules: undefined, findings: [error("(file)", `invalid JSON: ${entry.error}`)] };
  }
  const result = modulesFileSchema.safeParse(entry.data);
  if (!result.success) {
    return {
      modules: undefined,
      findings: result.error.issues.map((issue) =>
        error(issue.path.length > 0 ? issue.path.join(".") : "(root)", issue.message),
      ),
    };
  }
  return { modules: result.data, findings: [] };
}

function parsedFile<T>(
  source: CorpusSource,
  file: string,
  schema: { safeParse: (value: unknown) => { success: true; data: T } | { success: false } },
): T | undefined {
  const entry = source.get(file);
  if (entry === undefined || !entry.ok) {
    return undefined;
  }
  const result = schema.safeParse(entry.data);
  return result.success ? result.data : undefined;
}

/**
 * Every problem in the programme's module index. `programId` is the
 * registered id the corpus belongs to (a module's `contentPath` must sit
 * under `content/<programId>/modules/`). Each programme is checked with its
 * own schemas and corpus files (`smaModuleFindings`, `tkModuleFindings`, ...);
 * an id with no module shape of its own is checked as an OSN-shaped index
 * against the OSN corpus files.
 */
export function moduleFindings(
  source: CorpusSource,
  programId: string,
  options: ModuleFindingsOptions = {},
): CorpusFinding[] {
  switch (programId) {
    case SMA_CODING_PROGRAM_ID:
      return smaModuleFindings(source, options.osnTopicFamilyIds);
    case TK_CODING_PROGRAM_ID:
      return tkModuleFindings(source);
    case SD_CODING_PROGRAM_ID:
      return sdModuleFindings(source);
    case SMP_CODING_PROGRAM_ID:
      return smpModuleFindings(source);
    case KUL_PROGRAM_ID:
      return kulModuleFindings(source);
    case DEWASA_CODING_PROGRAM_ID:
      return dwModuleFindings(source);
    default:
      break;
  }
  const { modules, findings } = parseOsnModulesIndex(source);
  if (modules === undefined) {
    return findings;
  }

  const topicFamilies = parsedFile(source, "topic-families.json", topicFamiliesSchema);
  const weeks = parsedFile(source, "weeks.json", weeksSchema);
  const references = parsedFile(source, "references.json", referencesFileSchema);
  const familyIds = topicFamilies && new Set(topicFamilies.topicFamilies.map((f) => f.id));
  const weekByNumber = weeks && new Map(weeks.weeks.map((w) => [w.week, w]));
  const referenceIds = references && new Set(references.references.map((r) => r.id));

  modules.modules.forEach((module, index) => {
    const at = (field: string) => `modules[${index}].${field}`;

    if (familyIds !== undefined) {
      module.topicFamilies.forEach((id, i) => {
        if (!familyIds.has(id)) {
          findings.push(
            error(
              `${at("topicFamilies")}[${i}]`,
              `topic family "${id}" does not exist in topic-families.json`,
            ),
          );
        }
      });
    }

    if (weekByNumber !== undefined) {
      (module.weeks ?? []).forEach((number, i) => {
        const week = weekByNumber.get(number);
        if (week === undefined) {
          findings.push(
            error(`${at("weeks")}[${i}]`, `week ${number} does not exist in weeks.json`),
          );
        } else if (!week.topicFamilies.some((id) => module.topicFamilies.includes(id))) {
          findings.push(
            error(
              `${at("weeks")}[${i}]`,
              `week ${number} does not exercise any of the module's topic families (${module.topicFamilies.join(", ")})`,
            ),
          );
        }
      });
    }

    if (referenceIds !== undefined) {
      module.references.forEach((reference, i) => {
        if ("refId" in reference && !referenceIds.has(reference.refId)) {
          findings.push(
            error(
              `${at("references")}[${i}].refId`,
              `reference "${reference.refId}" does not exist in references.json`,
            ),
          );
        }
      });
    }

    const expectedPrefix = `content/${programId}/modules/`;
    if (!module.contentPath.startsWith(expectedPrefix)) {
      findings.push(
        error(at("contentPath"), `must be under "${expectedPrefix}" for programme "${programId}"`),
      );
    }
  });

  return findings;
}
