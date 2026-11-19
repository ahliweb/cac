/**
 * Pure rules over the `sd-coding` learning-module index
 * (`data/sd-coding/modules.json`, ADR-0007, ADR-0008). No I/O; the files
 * that each module's teacher guide and learner sheet exist and are
 * non-empty (and that the sheet has no identity field) are checked in
 * `src/cli/module-content.ts`.
 *
 * `modules.json` is optional: a corpus without it yields no findings. When
 * present it is checked for schema conformance (which includes "the id is
 * the lower-case week code") and for referential integrity: the week code
 * exists in `weeks.json`; a `cpItems` entry is allowed only when
 * `cp-mapping.json` lists the module's week as fulfilling that item (so
 * never a kelas 1-4 week, never a `P-` introduction, never a strengthening
 * week); every prerequisite is a module of the index or an existing week
 * code; the prerequisite graph has no cycle.
 */

import { sdWeekCodeSchema } from "../schema/sd-common";
import { sdCpMappingFileSchema } from "../schema/sd-cp-mapping";
import { type SdModulesFile, sdModulesFileSchema } from "../schema/sd-module";
import { sdWeeksFileSchema } from "../schema/sd-week";
import type { CorpusFinding, CorpusSource } from "./corpus-audit";
import {
  moduleError,
  parsedCorpusFile,
  parseIndexWith,
  prerequisiteFindings,
  requireReference,
} from "./program-modules-common";

/** Parses the index out of `source`: `undefined` when absent; findings when unreadable/invalid. */
export function parseSdModulesIndex(source: CorpusSource): {
  readonly modules: SdModulesFile | undefined;
  readonly findings: CorpusFinding[];
} {
  return parseIndexWith(source, sdModulesFileSchema);
}

/** Every problem in the `sd-coding` module index. */
export function sdModuleFindings(source: CorpusSource): CorpusFinding[] {
  const { modules, findings } = parseSdModulesIndex(source);
  if (modules === undefined) {
    return findings;
  }

  const weeks = parsedCorpusFile(source, "weeks.json", sdWeeksFileSchema);
  const mapping = parsedCorpusFile(source, "cp-mapping.json", sdCpMappingFileSchema);
  const weekByCode = weeks && new Map(weeks.weeks.map((week) => [week.id, week]));
  const fulfilmentByItem =
    mapping && new Map(mapping.mappings.map((row) => [row.cpCode, new Set<string>(row.weeks)]));

  requireReference(
    findings,
    modules.modules.length > 0,
    weeks !== undefined,
    "weekCodes/prerequisites",
    "weeks.json",
  );
  requireReference(
    findings,
    modules.modules.some((module) => module.cpItems.length > 0),
    mapping !== undefined,
    "cpItems",
    "cp-mapping.json",
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

    module.cpItems.forEach((code, i) => {
      if (week !== undefined && week.stage < 3) {
        findings.push(
          moduleError(
            at("cpItems", i),
            `week ${weekCode} is a kelas 1-4 introduction (outside the CP): it never claims CP item "${code}"`,
          ),
        );
      } else if (week?.strengthening === true) {
        findings.push(
          moduleError(
            at("cpItems", i),
            `week ${weekCode} is a strengthening week ([penguatan]): it does not fulfil CP item "${code}"`,
          ),
        );
      } else if (fulfilmentByItem !== undefined) {
        const fulfilling = fulfilmentByItem.get(code);
        if (fulfilling === undefined) {
          findings.push(
            moduleError(at("cpItems", i), `CP item "${code}" does not exist in cp-mapping.json`),
          );
        } else if (!fulfilling.has(weekCode)) {
          findings.push(
            moduleError(
              at("cpItems", i),
              `week ${weekCode} does not fulfil CP item "${code}" according to cp-mapping.json`,
            ),
          );
        }
      }
    });
  });

  findings.push(
    ...prerequisiteFindings(modules.modules, {
      isUnitCode: (value) => sdWeekCodeSchema.safeParse(value).success,
      unitCodes: weekByCode && new Set(weekByCode.keys()),
      unitFile: "weeks.json",
      unitName: "week code",
    }),
  );

  return findings;
}
