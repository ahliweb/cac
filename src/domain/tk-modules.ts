/**
 * Pure rules over the `tk-coding` learning-module index
 * (`data/tk-coding/modules.json`, ADR-0007, ADR-0008). No I/O; the files
 * that each module's teacher guide and learner sheet exist and are
 * non-empty (and that the sheet has no identity field) are checked in
 * `src/cli/module-content.ts`.
 *
 * `modules.json` is optional: a corpus without it yields no findings. When
 * present it is checked for schema conformance (which includes "the id is
 * the lower-case week code") and for referential integrity: the week code
 * exists in `weeks.json`; every `cpOverlap` item exists in
 * `cp-elements.json` and is one the week itself lists in `cp` (an
 * interpreted overlap, never fulfilment: the corpus has `meetsCp: false`);
 * every prerequisite is a module of the index or an existing week code; the
 * prerequisite graph has no cycle.
 */

import { tkWeekCodeSchema } from "../schema/tk-common";
import { tkCpElementsFileSchema } from "../schema/tk-cp-elements";
import { type TkModulesFile, tkModulesFileSchema } from "../schema/tk-module";
import { tkWeeksFileSchema } from "../schema/tk-weeks";
import type { CorpusFinding, CorpusSource } from "./corpus-audit";
import {
  moduleError,
  parsedCorpusFile,
  parseIndexWith,
  prerequisiteFindings,
  requireReference,
} from "./program-modules-common";

/** Parses the index out of `source`: `undefined` when absent; findings when unreadable/invalid. */
export function parseTkModulesIndex(source: CorpusSource): {
  readonly modules: TkModulesFile | undefined;
  readonly findings: CorpusFinding[];
} {
  return parseIndexWith(source, tkModulesFileSchema);
}

/** Every problem in the `tk-coding` module index. */
export function tkModuleFindings(source: CorpusSource): CorpusFinding[] {
  const { modules, findings } = parseTkModulesIndex(source);
  if (modules === undefined) {
    return findings;
  }

  const weeks = parsedCorpusFile(source, "weeks.json", tkWeeksFileSchema);
  const cpElements = parsedCorpusFile(source, "cp-elements.json", tkCpElementsFileSchema);
  const weekByCode = weeks && new Map(weeks.weeks.map((week) => [week.id, week]));
  const cpCodes = cpElements && new Set(cpElements.items.map((item) => item.code));

  requireReference(
    findings,
    modules.modules.length > 0,
    weeks !== undefined,
    "weekCodes/prerequisites",
    "weeks.json",
  );
  requireReference(
    findings,
    modules.modules.some((module) => module.cpOverlap.length > 0),
    cpCodes !== undefined,
    "cpOverlap",
    "cp-elements.json",
  );

  modules.modules.forEach((module, index) => {
    const at = (field: string, i: number) => `modules[${index}].${field}[${i}]`;
    const week = weekByCode?.get(module.weekCodes[0] as string);

    module.weekCodes.forEach((code, i) => {
      if (weekByCode !== undefined && !weekByCode.has(code)) {
        findings.push(
          moduleError(at("weekCodes", i), `week code "${code}" does not exist in weeks.json`),
        );
      }
    });

    module.cpOverlap.forEach((code, i) => {
      if (cpCodes !== undefined && !cpCodes.has(code)) {
        findings.push(
          moduleError(at("cpOverlap", i), `CP item "${code}" does not exist in cp-elements.json`),
        );
      } else if (week !== undefined && !week.cp.includes(code)) {
        findings.push(
          moduleError(
            at("cpOverlap", i),
            `CP item "${code}" is not among the CP items week ${week.id} overlaps in weeks.json (${week.cp.join(", ")})`,
          ),
        );
      }
    });
  });

  findings.push(
    ...prerequisiteFindings(modules.modules, {
      isUnitCode: (value) => tkWeekCodeSchema.safeParse(value).success,
      unitCodes: weekByCode && new Set(weekByCode.keys()),
      unitFile: "weeks.json",
      unitName: "week code",
    }),
  );

  return findings;
}
