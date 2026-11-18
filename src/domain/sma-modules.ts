/**
 * Pure rules over the `sma-coding` learning-module index
 * (`data/sma-coding/modules.json`, ADR-0007, issue #106). No I/O: the corpus
 * arrives as an injected {@link CorpusSource}, and the OSN topic family ids
 * (a cross-programme reference, ADR-0006) as an injected set; the one
 * filesystem check (that each module's Markdown body exists and is
 * non-empty) lives in `src/cli/module-content.ts`.
 *
 * `modules.json` is optional: a corpus without it yields no findings. When
 * present it is checked for schema conformance and for referential
 * integrity: every CP item exists in `cp-elements.json`, every week code in
 * `weeks.json` or `foundation.json`, every bridge family in the OSN topic
 * families, every prerequisite is a module of the index or an existing
 * foundation week code, and the prerequisite graph has no cycle.
 *
 * A reference file that a used field needs but that is missing or invalid is
 * itself a finding, never a silent skip: a check that cannot run must not
 * look like a check that passed.
 */

import { MODULES_FILE_NAME } from "../schema/module";
import { cpElementsFileSchema } from "../schema/sma-cp";
import { smaFoundationFileSchema } from "../schema/sma-foundation";
import { type SmaModulesFile, smaModulesFileSchema } from "../schema/sma-module";
import { smaWeeksFileSchema } from "../schema/sma-week";
import type { CorpusFinding, CorpusSource } from "./corpus-audit";

function error(path: string, message: string): CorpusFinding {
  return { file: MODULES_FILE_NAME, path, message, severity: "error" };
}

/** Parses the index out of `source`: `undefined` when absent; findings when unreadable/invalid. */
export function parseSmaModulesIndex(source: CorpusSource): {
  readonly modules: SmaModulesFile | undefined;
  readonly findings: CorpusFinding[];
} {
  const entry = source.get(MODULES_FILE_NAME);
  if (entry === undefined) {
    return { modules: undefined, findings: [] };
  }
  if (!entry.ok) {
    return { modules: undefined, findings: [error("(file)", `invalid JSON: ${entry.error}`)] };
  }
  const result = smaModulesFileSchema.safeParse(entry.data);
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

/** Whether `target` is reachable from `start` along prerequisite edges (a node reaches itself only via a path of length >= 1 when `start === target`). */
function reaches(
  edges: ReadonlyMap<string, readonly string[]>,
  start: string,
  target: string,
): boolean {
  const seen = new Set<string>();
  const pending = [...(edges.get(start) ?? [])];
  while (pending.length > 0) {
    const id = pending.pop() as string;
    if (id === target) {
      return true;
    }
    if (!seen.has(id)) {
      seen.add(id);
      pending.push(...(edges.get(id) ?? []));
    }
  }
  return false;
}

/**
 * Every problem in the `sma-coding` module index. `osnTopicFamilyIds` is the
 * id set of `data/osn/topic-families.json` (`undefined` when that file could
 * not be read; a module that names a bridge family then gets a finding).
 */
export function smaModuleFindings(
  source: CorpusSource,
  osnTopicFamilyIds: ReadonlySet<string> | undefined,
): CorpusFinding[] {
  const { modules, findings } = parseSmaModulesIndex(source);
  if (modules === undefined) {
    return findings;
  }

  const cpElements = parsedFile(source, "cp-elements.json", cpElementsFileSchema);
  const weeks = parsedFile(source, "weeks.json", smaWeeksFileSchema);
  const foundation = parsedFile(source, "foundation.json", smaFoundationFileSchema);
  const cpCodes = cpElements && new Set(cpElements.items.map((item) => item.code));
  const trackWeekCodes = weeks && new Set(weeks.weeks.map((week) => week.id));
  const foundationWeekCodes = foundation && new Set(foundation.weeks.map((week) => week.id));
  const moduleIds = new Set(modules.modules.map((module) => module.id));

  const needs = (used: boolean, available: boolean, path: string, what: string) => {
    if (used && !available) {
      findings.push(error(path, `cannot be checked: ${what} is missing or invalid`));
    }
  };
  needs(
    modules.modules.some((m) => m.cpItems.length > 0),
    cpCodes !== undefined,
    "cpItems",
    "cp-elements.json",
  );
  needs(
    modules.modules.some((m) => m.weekCodes.some((code) => !code.startsWith("FND-"))),
    trackWeekCodes !== undefined,
    "weekCodes",
    "weeks.json",
  );
  needs(
    modules.modules.some(
      (m) =>
        m.weekCodes.some((code) => code.startsWith("FND-")) ||
        m.prerequisites.some((code) => code.startsWith("FND-")),
    ),
    foundationWeekCodes !== undefined,
    "weekCodes/prerequisites",
    "foundation.json",
  );
  needs(
    modules.modules.some((m) => m.bridgeFamilies.length > 0),
    osnTopicFamilyIds !== undefined,
    "bridgeFamilies",
    "the OSN data/osn/topic-families.json",
  );

  const edges = new Map<string, readonly string[]>();
  for (const module of modules.modules) {
    edges.set(
      module.id,
      module.prerequisites.filter((entry) => moduleIds.has(entry)),
    );
  }

  modules.modules.forEach((module, index) => {
    const at = (field: string, i: number) => `modules[${index}].${field}[${i}]`;

    if (cpCodes !== undefined) {
      module.cpItems.forEach((code, i) => {
        if (!cpCodes.has(code)) {
          findings.push(
            error(at("cpItems", i), `CP item "${code}" does not exist in cp-elements.json`),
          );
        }
      });
    }

    module.weekCodes.forEach((code, i) => {
      const foundationCode = code.startsWith("FND-");
      const known = foundationCode ? foundationWeekCodes : trackWeekCodes;
      if (known !== undefined && !known.has(code)) {
        findings.push(
          error(
            at("weekCodes", i),
            `week code "${code}" does not exist in ${foundationCode ? "foundation.json" : "weeks.json"}`,
          ),
        );
      }
    });

    if (osnTopicFamilyIds !== undefined) {
      module.bridgeFamilies.forEach((id, i) => {
        if (!osnTopicFamilyIds.has(id)) {
          findings.push(
            error(
              at("bridgeFamilies", i),
              `OSN topic family "${id}" does not exist in data/osn/topic-families.json`,
            ),
          );
        }
      });
    }

    module.prerequisites.forEach((entry, i) => {
      if (entry.startsWith("FND-")) {
        if (foundationWeekCodes !== undefined && !foundationWeekCodes.has(entry)) {
          findings.push(
            error(
              at("prerequisites", i),
              `foundation week code "${entry}" does not exist in foundation.json`,
            ),
          );
        }
      } else if (!moduleIds.has(entry)) {
        findings.push(
          error(
            at("prerequisites", i),
            `prerequisite "${entry}" is neither a module in modules.json nor a foundation week code`,
          ),
        );
      } else if (reaches(edges, entry, module.id)) {
        findings.push(
          error(at("prerequisites", i), `prerequisite "${entry}" closes a prerequisite cycle`),
        );
      }
    });
  });

  return findings;
}
