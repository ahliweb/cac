/**
 * Pure rules over the `dewasa-coding` learning-module index
 * (`data/dewasa-coding/modules.json`, ADR-0007, ADR-0008). No I/O; the file
 * check (each module's body exists and is non-empty) lives in
 * `src/cli/module-content.ts`.
 *
 * The syllabus's own module table is `module-plan.json` (track modules) and
 * `shared.json` (the shared `DW-FND-M1`); this file indexes the authored
 * content of those modules. When `modules.json` is present it is checked
 * for schema conformance (which includes "the id is the lower-case module
 * code") and for referential integrity: the module code exists in
 * `module-plan.json` or `shared.json`; every `skkniUnits` code is one
 * `module-plan.json` maps to that very module (track PRO only, unit-title
 * depth: never a certified competence); every prerequisite is a module of
 * the index or an existing module code; the prerequisite graph has no
 * cycle.
 */

import { dwModuleCodeSchema } from "../schema/dw-common";
import {
  type DwLearningModulesFile,
  dwLearningModulesFileSchema,
} from "../schema/dw-learning-module";
import { dwModulePlanFileSchema } from "../schema/dw-module";
import { dwSharedFileSchema } from "../schema/dw-shared";
import type { CorpusFinding, CorpusSource } from "./corpus-audit";
import {
  moduleError,
  parsedCorpusFile,
  parseIndexWith,
  prerequisiteFindings,
  requireReference,
} from "./program-modules-common";

/** Parses the index out of `source`: `undefined` when absent; findings when unreadable/invalid. */
export function parseDwModulesIndex(source: CorpusSource): {
  readonly modules: DwLearningModulesFile | undefined;
  readonly findings: CorpusFinding[];
} {
  return parseIndexWith(source, dwLearningModulesFileSchema);
}

/** Every problem in the `dewasa-coding` module index. */
export function dwModuleFindings(source: CorpusSource): CorpusFinding[] {
  const { modules, findings } = parseDwModulesIndex(source);
  if (modules === undefined) {
    return findings;
  }

  const plan = parsedCorpusFile(source, "module-plan.json", dwModulePlanFileSchema);
  const shared = parsedCorpusFile(source, "shared.json", dwSharedFileSchema);
  const unitsByModule =
    plan &&
    new Map<string, ReadonlySet<string>>(
      plan.modules.map((module) => [module.code, new Set(module.skkniUnitCodes ?? [])]),
    );
  const knownCodes =
    plan && shared && new Set([...plan.modules, ...shared.modules].map((module) => module.code));

  requireReference(
    findings,
    modules.modules.length > 0,
    plan !== undefined && shared !== undefined,
    "moduleCodes/prerequisites",
    "module-plan.json or shared.json",
  );

  modules.modules.forEach((module, index) => {
    const at = (field: string, i: number) => `modules[${index}].${field}[${i}]`;
    const code = module.moduleCodes[0] as string;

    module.moduleCodes.forEach((entry, i) => {
      if (knownCodes !== undefined && !knownCodes.has(entry)) {
        findings.push(
          moduleError(
            at("moduleCodes", i),
            `module code "${entry}" does not exist in module-plan.json or shared.json`,
          ),
        );
      }
    });

    // Units are checked against the module's own row; an unknown module code is reported above.
    if (module.skkniUnits.length > 0 && unitsByModule !== undefined && knownCodes?.has(code)) {
      const mapped = unitsByModule.get(code) ?? new Set<string>();
      module.skkniUnits.forEach((unit, i) => {
        if (!mapped.has(unit)) {
          findings.push(
            moduleError(
              at("skkniUnits", i),
              mapped.size === 0
                ? `SKKNI unit "${unit}": module ${code} maps no SKKNI unit in module-plan.json (only PRO modules do)`
                : `SKKNI unit "${unit}" is not mapped to module ${code} in module-plan.json`,
            ),
          );
        }
      });
    } else if (module.skkniUnits.length > 0 && unitsByModule === undefined) {
      findings.push(
        moduleError(
          `modules[${index}].skkniUnits`,
          "cannot be checked: module-plan.json is missing or invalid",
        ),
      );
    }
  });

  findings.push(
    ...prerequisiteFindings(modules.modules, {
      isUnitCode: (value) => dwModuleCodeSchema.safeParse(value).success,
      unitCodes: knownCodes,
      unitFile: "module-plan.json or shared.json",
      unitName: "module code",
    }),
  );

  return findings;
}
