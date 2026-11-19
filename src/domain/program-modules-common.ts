/**
 * Pure helpers shared by the per-programme module-index rules
 * (`tk-modules.ts`, `sd-modules.ts`, `smp-modules.ts`, `kul-modules.ts`,
 * `dw-modules.ts`; ADR-0007, ADR-0008), the counterpart of what
 * `sma-modules.ts` does inline: parse an index with a programme's schema,
 * read a reference file of the corpus, and check prerequisites against the
 * unit codes of the programme and the module ids of the index (no cycles).
 *
 * No I/O: the corpus arrives as an injected {@link CorpusSource}. A
 * reference file that a used field needs but that is missing or invalid is
 * itself a finding, never a silent skip: a check that cannot run must not
 * look like a check that passed.
 */

import type { z } from "zod";
import { MODULES_FILE_NAME } from "../schema/module";
import type { CorpusFinding, CorpusSource } from "./corpus-audit";

/** An error finding against `modules.json`. */
export function moduleError(path: string, message: string): CorpusFinding {
  return { file: MODULES_FILE_NAME, path, message, severity: "error" };
}

/** Parses `modules.json` of `source` with `schema`: `undefined` when absent; findings when unreadable or invalid. */
export function parseIndexWith<S extends z.ZodTypeAny>(
  source: CorpusSource,
  schema: S,
): { readonly modules: z.infer<S> | undefined; readonly findings: CorpusFinding[] } {
  const entry = source.get(MODULES_FILE_NAME);
  if (entry === undefined) {
    return { modules: undefined, findings: [] };
  }
  if (!entry.ok) {
    return {
      modules: undefined,
      findings: [moduleError("(file)", `invalid JSON: ${entry.error}`)],
    };
  }
  const result = schema.safeParse(entry.data);
  if (!result.success) {
    return {
      modules: undefined,
      findings: result.error.issues.map((issue) =>
        moduleError(issue.path.length > 0 ? issue.path.join(".") : "(root)", issue.message),
      ),
    };
  }
  return { modules: result.data as z.infer<S>, findings: [] };
}

/** `file` of the corpus parsed with `schema`, or `undefined` when it is missing, unreadable or invalid. */
export function parsedCorpusFile<S extends z.ZodTypeAny>(
  source: CorpusSource,
  file: string,
  schema: S,
): z.infer<S> | undefined {
  const entry = source.get(file);
  if (entry === undefined || !entry.ok) {
    return undefined;
  }
  const result = schema.safeParse(entry.data);
  return result.success ? (result.data as z.infer<S>) : undefined;
}

/** Pushes the "cannot be checked" finding when a field is used but the reference file it is checked against is not available. */
export function requireReference(
  findings: CorpusFinding[],
  used: boolean,
  available: boolean,
  path: string,
  what: string,
): void {
  if (used && !available) {
    findings.push(moduleError(path, `cannot be checked: ${what} is missing or invalid`));
  }
}

/** Whether `target` is reachable from `start` along prerequisite edges. */
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

/** A module as the prerequisite check needs it. */
export interface PrerequisiteEntry {
  readonly id: string;
  readonly prerequisites: readonly string[];
}

/**
 * Findings for the prerequisites of every module: each must be the id of a
 * module of the index or a unit code of the programme (`unitCodes`, from
 * `unitFile`; `undefined` when that file is unavailable, which is itself a
 * finding when a unit code is named), and the module-to-module graph has
 * no cycle. A unit code is recognised by `isUnitCode`.
 */
export function prerequisiteFindings(
  modules: readonly PrerequisiteEntry[],
  options: {
    readonly isUnitCode: (value: string) => boolean;
    readonly unitCodes: ReadonlySet<string> | undefined;
    readonly unitFile: string;
    readonly unitName: string;
  },
): CorpusFinding[] {
  const findings: CorpusFinding[] = [];
  const moduleIds = new Set(modules.map((module) => module.id));
  const edges = new Map<string, readonly string[]>();
  for (const module of modules) {
    edges.set(
      module.id,
      module.prerequisites.filter((entry) => moduleIds.has(entry)),
    );
  }
  modules.forEach((module, index) => {
    module.prerequisites.forEach((entry, i) => {
      const path = `modules[${index}].prerequisites[${i}]`;
      if (options.isUnitCode(entry)) {
        if (options.unitCodes !== undefined && !options.unitCodes.has(entry)) {
          findings.push(
            moduleError(
              path,
              `${options.unitName} "${entry}" does not exist in ${options.unitFile}`,
            ),
          );
        }
      } else if (!moduleIds.has(entry)) {
        findings.push(
          moduleError(
            path,
            `prerequisite "${entry}" is neither a module in modules.json nor a ${options.unitName}`,
          ),
        );
      } else if (reaches(edges, entry, module.id)) {
        findings.push(moduleError(path, `prerequisite "${entry}" closes a prerequisite cycle`));
      }
    });
  });
  return findings;
}
