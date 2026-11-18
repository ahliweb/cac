/**
 * Pure rules over the `smp-coding` learning-module index
 * (`data/smp-coding/modules.json`, ADR-0007, ADR-0008). No I/O; the file
 * check (each module's body exists and is non-empty) lives in
 * `src/cli/module-content.ts`.
 *
 * `modules.json` is optional: a corpus without it yields no findings. When
 * present it is checked for schema conformance (which includes "the id is
 * the lower-case week code") and for referential integrity: the week code
 * exists in `weeks.json`; every `cpCodes` item exists in `cp-elements.json`
 * and is one `weeks.json` counts the module's week as covering; an
 * enrichment (`pengayaan`) week claims no CP item at all, and an item
 * marked `*` (Python, beyond the CP wording) is never claimed; every
 * prerequisite is a module of the index or an existing week code; the
 * prerequisite graph has no cycle.
 */

import { smpWeekCodeSchema } from "../schema/smp-common";
import { smpCpElementsFileSchema } from "../schema/smp-cp";
import { type SmpModulesFile, smpModulesFileSchema } from "../schema/smp-module";
import { smpWeeksFileSchema } from "../schema/smp-week";
import type { CorpusFinding, CorpusSource } from "./corpus-audit";
import {
  moduleError,
  parsedCorpusFile,
  parseIndexWith,
  prerequisiteFindings,
  requireReference,
} from "./program-modules-common";

/** Parses the index out of `source`: `undefined` when absent; findings when unreadable/invalid. */
export function parseSmpModulesIndex(source: CorpusSource): {
  readonly modules: SmpModulesFile | undefined;
  readonly findings: CorpusFinding[];
} {
  return parseIndexWith(source, smpModulesFileSchema);
}

/** Every problem in the `smp-coding` module index. */
export function smpModuleFindings(source: CorpusSource): CorpusFinding[] {
  const { modules, findings } = parseSmpModulesIndex(source);
  if (modules === undefined) {
    return findings;
  }

  const weeks = parsedCorpusFile(source, "weeks.json", smpWeeksFileSchema);
  const cpElements = parsedCorpusFile(source, "cp-elements.json", smpCpElementsFileSchema);
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
    modules.modules.some((module) => module.cpCodes.length > 0),
    cpCodes !== undefined,
    "cpCodes",
    "cp-elements.json",
  );

  modules.modules.forEach((module, index) => {
    const at = (field: string, i: number) => `modules[${index}].${field}[${i}]`;
    const weekCode = module.weekCodes[0] as string;
    const week = weekByCode?.get(weekCode);

    module.weekCodes.forEach((code, i) => {
      if (weekByCode !== undefined && !weekByCode.has(code)) {
        findings.push(
          moduleError(at("weekCodes", i), `week code "${code}" does not exist in weeks.json`),
        );
      }
    });

    module.cpCodes.forEach((code, i) => {
      if (cpCodes !== undefined && !cpCodes.has(code)) {
        findings.push(
          moduleError(at("cpCodes", i), `CP item "${code}" does not exist in cp-elements.json`),
        );
      } else if (week?.enrichment === true) {
        findings.push(
          moduleError(
            at("cpCodes", i),
            `week ${weekCode} is an enrichment (pengayaan) week: it claims no CP item, not "${code}"`,
          ),
        );
      } else if (week?.irisanCodes.includes(code) === true) {
        findings.push(
          moduleError(
            at("cpCodes", i),
            `CP item "${code}" is only an overlap (marked * in weeks.json: Python goes beyond the CP wording) for week ${weekCode}, never coverage`,
          ),
        );
      } else if (week !== undefined && !week.cpCodes.includes(code)) {
        findings.push(
          moduleError(
            at("cpCodes", i),
            `CP item "${code}" is not mapped to week ${weekCode} in weeks.json (${week.cpCodes.join(", ") || "none"})`,
          ),
        );
      }
    });
  });

  findings.push(
    ...prerequisiteFindings(modules.modules, {
      isUnitCode: (value) => smpWeekCodeSchema.safeParse(value).success,
      unitCodes: weekByCode && new Set(weekByCode.keys()),
      unitFile: "weeks.json",
      unitName: "week code",
    }),
  );

  return findings;
}
