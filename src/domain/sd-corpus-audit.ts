/**
 * Whole-corpus audit of the `sd-coding` programme (`data/sd-coding/`), the
 * counterpart of `auditSmaCorpus` for the SMA corpus (ADR-0006, ADR-0008).
 * Like it, this is a pure function of an injected {@link CorpusSource}:
 * every problem is reported in one pass, nothing is thrown for ordinary bad
 * data, and nothing reads a filesystem (the loader lives in `src/cli/`).
 *
 * Checks: schema conformance of every registered file plus the reverse
 * "unregistered file" check; the fixed structural invariants of the
 * approved syllabus (6 classes x 2 semesters x 14 weeks, 3 stages, 16 CP
 * items, the JP load of kelas 5-6); and referential integrity (CP codes,
 * element codes, week codes). The central rule of this programme: the
 * `P-` introductions of kelas 1-4 are outside the CP and are never counted
 * as covering a CP item -- every CP item is fulfilled only by kelas 5-6
 * weeks that are not marked `[penguatan]` and that cite the item.
 */

import type { z } from "zod";
import { MODULES_FILE_NAME } from "../schema/module";
import { SD_BRIDGE_IDS, sdBridgesFileSchema } from "../schema/sd-bridges";
import {
  SD_CP_CLASSES,
  SD_CP_STAGE,
  SD_MINUTES_PER_JP,
  SD_WEEKS_PER_SEMESTER,
} from "../schema/sd-common";
import { sdCpElementsFileSchema } from "../schema/sd-cp";
import { sdCpMappingFileSchema } from "../schema/sd-cp-mapping";
import { SD_STRUCTURE_ROW_IDS, sdStructureFileSchema } from "../schema/sd-structure";
import { sdWeeksFileSchema } from "../schema/sd-week";
import type { AuditResult, CorpusFinding, CorpusSource } from "./corpus-audit";
import { expandSdWeekCodes } from "./sd-week-codes";

interface SdFileEntry {
  readonly file: string;
  readonly schema: z.ZodTypeAny;
}

/** The file -> schema registry of the `sd-coding` corpus. */
export const SD_DATA_FILE_REGISTRY: readonly SdFileEntry[] = [
  { file: "cp-elements.json", schema: sdCpElementsFileSchema },
  { file: "structure.json", schema: sdStructureFileSchema },
  { file: "weeks.json", schema: sdWeeksFileSchema },
  { file: "cp-mapping.json", schema: sdCpMappingFileSchema },
  { file: "bridges.json", schema: sdBridgesFileSchema },
];

/**
 * The fixed counts the approved v1.0.0 syllabus has: 4 CP quotations and 16
 * CP items (Fase C), 3 stages, 6 classes x 2 semesters x 14 weeks = 168
 * weeks, one mapping row per CP item, the 8 structure rows of bagian 2 and
 * the 3 bridge paragraphs of bagian 7.
 */
export const SD_EXPECTED_COUNTS = {
  cpQuotes: 4,
  cpItems: 16,
  stages: 3,
  classes: 6,
  semestersPerClass: 2,
  weeks: 6 * 2 * SD_WEEKS_PER_SEMESTER,
  cpMappings: 16,
  structureRows: SD_STRUCTURE_ROW_IDS.length,
  bridges: SD_BRIDGE_IDS.length,
} as const;

function error(file: string, path: string, message: string): CorpusFinding {
  return { file, path, message, severity: "error" };
}

type Parsed = ReadonlyMap<string, unknown>;

function typed<T>(parsed: Parsed, file: string): T | undefined {
  return parsed.get(file) as T | undefined;
}

function sameList(a: readonly string[], b: readonly string[]): boolean {
  return a.length === b.length && a.every((value, index) => value === b[index]);
}

function schemaFindings(source: CorpusSource) {
  const findings: CorpusFinding[] = [];
  const parsed = new Map<string, unknown>();
  let filesValidated = 0;
  let filesMissing = 0;

  for (const entry of SD_DATA_FILE_REGISTRY) {
    const found = source.get(entry.file);
    if (found === undefined) {
      filesMissing += 1;
      findings.push(
        error(
          entry.file,
          "(file)",
          `required data file is missing from the corpus (expected at data/sd-coding/${entry.file})`,
        ),
      );
      continue;
    }
    if (!found.ok) {
      findings.push(error(entry.file, "(file)", `invalid JSON: ${found.error}`));
      continue;
    }
    const result = entry.schema.safeParse(found.data);
    if (!result.success) {
      for (const issue of result.error.issues) {
        findings.push(
          error(entry.file, issue.path.length > 0 ? issue.path.join(".") : "(root)", issue.message),
        );
      }
      continue;
    }
    filesValidated += 1;
    parsed.set(entry.file, result.data);
  }

  const registered = new Set(SD_DATA_FILE_REGISTRY.map((entry) => entry.file));
  let filesUnregistered = 0;
  for (const file of source.keys()) {
    // modules.json is the optional learning-module index (ADR-0007), validated by `moduleFindings`.
    if (!registered.has(file) && file !== MODULES_FILE_NAME) {
      filesUnregistered += 1;
      findings.push(
        error(
          file,
          "(file)",
          "this data file is not covered by any schema in SD_DATA_FILE_REGISTRY " +
            "(src/domain/sd-corpus-audit.ts) -- add it there so it is validated rather than silently ignored",
        ),
      );
    }
  }

  return { findings, parsed, filesValidated, filesMissing, filesUnregistered };
}

function structuralFindings(parsed: Parsed): CorpusFinding[] {
  const findings: CorpusFinding[] = [];
  const cp = typed<z.infer<typeof sdCpElementsFileSchema>>(parsed, "cp-elements.json");
  const structure = typed<z.infer<typeof sdStructureFileSchema>>(parsed, "structure.json");
  const weeks = typed<z.infer<typeof sdWeeksFileSchema>>(parsed, "weeks.json");
  const mapping = typed<z.infer<typeof sdCpMappingFileSchema>>(parsed, "cp-mapping.json");
  const bridges = typed<z.infer<typeof sdBridgesFileSchema>>(parsed, "bridges.json");

  const count = (file: string, path: string, label: string, actual: number, expected: number) => {
    if (actual !== expected) {
      findings.push(error(file, path, `expected exactly ${expected} ${label}, found ${actual}`));
    }
  };

  if (cp !== undefined) {
    count(
      "cp-elements.json",
      "quotes",
      "CP quotations",
      cp.quotes.length,
      SD_EXPECTED_COUNTS.cpQuotes,
    );
    count("cp-elements.json", "items", "CP items", cp.items.length, SD_EXPECTED_COUNTS.cpItems);
  }
  if (mapping !== undefined) {
    count(
      "cp-mapping.json",
      "mappings",
      "CP mappings",
      mapping.mappings.length,
      SD_EXPECTED_COUNTS.cpMappings,
    );
  }
  if (weeks !== undefined) {
    count("weeks.json", "weeks", "weeks", weeks.weeks.length, SD_EXPECTED_COUNTS.weeks);
  }
  if (bridges !== undefined) {
    count(
      "bridges.json",
      "bridges",
      "bridge paragraphs",
      bridges.bridges.length,
      SD_EXPECTED_COUNTS.bridges,
    );
  }

  if (structure !== undefined) {
    count("structure.json", "stages", "stages", structure.stages.length, SD_EXPECTED_COUNTS.stages);
    count(
      "structure.json",
      "rows",
      "structure rows",
      structure.rows.length,
      SD_EXPECTED_COUNTS.structureRows,
    );
    count(
      "structure.json",
      "semestersPerClass",
      "semesters per class",
      structure.semestersPerClass,
      SD_EXPECTED_COUNTS.semestersPerClass,
    );
    const teaching = structure.weeksPerSemester.teaching;
    if (teaching !== SD_WEEKS_PER_SEMESTER) {
      findings.push(
        error(
          "structure.json",
          "weeksPerSemester.teaching",
          `must equal ${SD_WEEKS_PER_SEMESTER}, the number of weeks M1..M${SD_WEEKS_PER_SEMESTER} in weeks.json`,
        ),
      );
    }
    const pattern = structure.semesterPattern;
    if (pattern.materiFromWeek !== 1) {
      findings.push(error("structure.json", "semesterPattern.materiFromWeek", "must be week 1"));
    }
    if (pattern.assessmentWeek !== teaching) {
      findings.push(
        error("structure.json", "semesterPattern.assessmentWeek", "must be the last teaching week"),
      );
    }
    if (pattern.miniProjectWeek !== teaching - 1) {
      findings.push(
        error(
          "structure.json",
          "semesterPattern.miniProjectWeek",
          "must be the week before the assessment week",
        ),
      );
    }
    if (pattern.materiToWeek !== pattern.miniProjectWeek - 1) {
      findings.push(
        error(
          "structure.json",
          "semesterPattern.materiToWeek",
          "must be the week before the mini project week",
        ),
      );
    }

    // Stages: classes 1..6 each in exactly one stage; only stage 3 (kelas 5-6) fulfils the CP.
    const stageClasses = structure.stages
      .flatMap((stage) => [...stage.classes])
      .sort((a, b) => a - b);
    if (!sameList(stageClasses.map(String), ["1", "2", "3", "4", "5", "6"])) {
      findings.push(
        error(
          "structure.json",
          "stages",
          `the stages must cover kelas 1..6 exactly once each; found [${stageClasses.join(", ")}]`,
        ),
      );
    }
    structure.stages.forEach((stage, index) => {
      if (stage.minutesPerWeek !== stage.jpPerWeek * SD_MINUTES_PER_JP) {
        findings.push(
          error(
            "structure.json",
            `stages[${index}].minutesPerWeek`,
            `must equal jpPerWeek x ${SD_MINUTES_PER_JP} minutes (1 JP = ${SD_MINUTES_PER_JP} minutes, Permendikdasmen 13/2025)`,
          ),
        );
      }
      const cpClasses = stage.classes.every((kelas) =>
        (SD_CP_CLASSES as readonly number[]).includes(kelas),
      );
      if (stage.meetsCp !== (stage.id === SD_CP_STAGE)) {
        findings.push(
          error(
            "structure.json",
            `stages[${index}].meetsCp`,
            `only stage ${SD_CP_STAGE} (Fase C) fulfils the CP`,
          ),
        );
      }
      if (stage.id === SD_CP_STAGE && !cpClasses) {
        findings.push(
          error(
            "structure.json",
            `stages[${index}].classes`,
            `stage ${SD_CP_STAGE} must hold only kelas ${SD_CP_CLASSES.join(" and ")}`,
          ),
        );
      }
      if (
        stage.id !== SD_CP_STAGE &&
        stage.classes.some((kelas) => (SD_CP_CLASSES as readonly number[]).includes(kelas))
      ) {
        findings.push(
          error(
            "structure.json",
            `stages[${index}].classes`,
            "kelas 5-6 belong to the CP stage only; kelas 1-4 are outside the CP",
          ),
        );
      }
    });

    // Time structure: weeks used per year, reserve, and the JP load of the CP classes.
    const usedPerYear = structure.semestersPerClass * teaching;
    const yearClasses = structure.weeksPerYear
      .flatMap((entry) => [...entry.classes])
      .sort((a, b) => a - b);
    if (!sameList(yearClasses.map(String), ["1", "2", "3", "4", "5", "6"])) {
      findings.push(
        error(
          "structure.json",
          "weeksPerYear",
          `must cover kelas 1..6 exactly once each; found [${yearClasses.join(", ")}]`,
        ),
      );
    }
    structure.weeksPerYear.forEach((entry, index) => {
      if (entry.used !== usedPerYear) {
        findings.push(
          error(
            "structure.json",
            `weeksPerYear[${index}].used`,
            `must equal semestersPerClass x teaching weeks = ${usedPerYear}`,
          ),
        );
      }
      if (entry.reserve !== entry.available - entry.used) {
        findings.push(
          error("structure.json", `weeksPerYear[${index}].reserve`, "must equal available - used"),
        );
      }
    });
    const cpStage = structure.stages.find((stage) => stage.id === SD_CP_STAGE);
    const loadClasses = structure.jpLoad.map((entry) => entry.kelas).sort((a, b) => a - b);
    if (!sameList(loadClasses.map(String), SD_CP_CLASSES.map(String))) {
      findings.push(
        error(
          "structure.json",
          "jpLoad",
          `must hold exactly kelas ${SD_CP_CLASSES.join(" and ")}; found [${loadClasses.join(", ")}]`,
        ),
      );
    }
    structure.jpLoad.forEach((entry, index) => {
      const at = `jpLoad[${index}]`;
      if (entry.weeks !== usedPerYear) {
        findings.push(
          error("structure.json", `${at}.weeks`, `must equal ${usedPerYear} weeks used per year`),
        );
      }
      if (cpStage !== undefined && entry.jpPerWeek !== cpStage.jpPerWeek) {
        findings.push(
          error(
            "structure.json",
            `${at}.jpPerWeek`,
            `must equal the CP stage's ${cpStage.jpPerWeek} JP per week`,
          ),
        );
      }
      if (entry.used !== entry.weeks * entry.jpPerWeek) {
        findings.push(error("structure.json", `${at}.used`, "must equal weeks x jpPerWeek"));
      }
      if (entry.used > entry.allocated) {
        findings.push(
          error("structure.json", `${at}.used`, "must not exceed the JP the regulation allocates"),
        );
      }
      const year = structure.weeksPerYear.find((candidate) =>
        candidate.classes.includes(entry.kelas),
      );
      if (year !== undefined && entry.allocated !== year.available * entry.jpPerWeek) {
        findings.push(
          error(
            "structure.json",
            `${at}.allocated`,
            `must equal the weeks per year (${year.available}) x jpPerWeek`,
          ),
        );
      }
    });
  }

  if (weeks !== undefined) {
    const byClassSemester = new Map<string, number[]>();
    for (const week of weeks.weeks) {
      byClassSemester.set(week.semesterCode, [
        ...(byClassSemester.get(week.semesterCode) ?? []),
        week.week,
      ]);
    }
    for (const [semesterCode, numbers] of byClassSemester) {
      const sorted = [...numbers].sort((a, b) => a - b);
      const complete =
        sorted.length === SD_WEEKS_PER_SEMESTER && sorted.every((n, i) => n === i + 1);
      if (!complete) {
        findings.push(
          error(
            "weeks.json",
            `weeks[semesterCode=${semesterCode}]`,
            `must contain exactly the weeks 1..${SD_WEEKS_PER_SEMESTER} once each; found [${sorted.join(", ")}]`,
          ),
        );
      }
    }
    if (structure !== undefined) {
      for (const stage of structure.stages) {
        for (const kelas of stage.classes) {
          for (let semester = 1; semester <= structure.semestersPerClass; semester += 1) {
            if (!byClassSemester.has(`SD${kelas}-${semester}`)) {
              findings.push(
                error(
                  "weeks.json",
                  `weeks[semesterCode=SD${kelas}-${semester}]`,
                  `kelas ${kelas} has no weeks for semester ${semester}`,
                ),
              );
            }
          }
        }
      }
      const stageOfClass = new Map(
        structure.stages.flatMap((stage) =>
          stage.classes.map((kelas) => [kelas, stage.id] as const),
        ),
      );
      weeks.weeks.forEach((week, index) => {
        const expected = stageOfClass.get(week.kelas);
        if (expected !== undefined && week.stage !== expected) {
          findings.push(
            error(
              "weeks.json",
              `weeks[${index}].stage`,
              `${week.id}: kelas ${week.kelas} belongs to stage ${expected} (structure.json), not ${week.stage}`,
            ),
          );
        }
      });
    }
  }

  return findings;
}

function referentialFindings(parsed: Parsed): CorpusFinding[] {
  const findings: CorpusFinding[] = [];
  const cp = typed<z.infer<typeof sdCpElementsFileSchema>>(parsed, "cp-elements.json");
  const weeks = typed<z.infer<typeof sdWeeksFileSchema>>(parsed, "weeks.json");
  const mapping = typed<z.infer<typeof sdCpMappingFileSchema>>(parsed, "cp-mapping.json");
  const bridges = typed<z.infer<typeof sdBridgesFileSchema>>(parsed, "bridges.json");

  const cpCodes = cp && new Set(cp.items.map((item) => item.code));
  const elementIds = cp && new Set(cp.quotes.map((quote) => quote.elementId));
  const weekById = weeks && new Map(weeks.weeks.map((week) => [week.id, week]));

  if (cp !== undefined) {
    // An item's label is a verbatim cut of its element's quotation.
    const quoteByElement = new Map(
      cp.quotes.map((quote) => [quote.elementId, quote.text.toLowerCase()]),
    );
    cp.items.forEach((item, index) => {
      const quote = quoteByElement.get(item.elementId);
      if (quote !== undefined && !quote.includes(item.label.toLowerCase())) {
        findings.push(
          error(
            "cp-elements.json",
            `items[${index}].label`,
            `${item.code}: label is not a verbatim cut of the element's quotation`,
          ),
        );
      }
    });
    for (const quote of cp.quotes) {
      if (!cp.items.some((item) => item.elementId === quote.elementId)) {
        findings.push(
          error(
            "cp-elements.json",
            "items",
            `element ${quote.elementId} has a quotation but no CP item`,
          ),
        );
      }
    }
  }

  if (weeks !== undefined && cpCodes !== undefined && elementIds !== undefined) {
    weeks.weeks.forEach((week, index) => {
      const at = `weeks[${index}]`;
      week.cpItems.forEach((code, i) => {
        if (!cpCodes.has(code)) {
          findings.push(
            error(
              "weeks.json",
              `${at}.cpItems[${i}]`,
              `${week.id}: CP item "${code}" is not in cp-elements.json`,
            ),
          );
        }
      });
      week.leadsTo.forEach((code, i) => {
        if (!cpCodes.has(code)) {
          findings.push(
            error(
              "weeks.json",
              `${at}.leadsTo[${i}]`,
              `${week.id}: CP item "${code}" is not in cp-elements.json`,
            ),
          );
        }
        const element = code.split("-")[1];
        if (!week.introduces.some((intro) => intro.split("-")[1] === element)) {
          findings.push(
            error(
              "weeks.json",
              `${at}.leadsTo[${i}]`,
              `${week.id}: "${code}" must lead from an introduction of the same element`,
            ),
          );
        }
      });
      week.cpElements.forEach((id, i) => {
        if (!elementIds.has(id)) {
          findings.push(
            error(
              "weeks.json",
              `${at}.cpElements[${i}]`,
              `${week.id}: element "${id}" is not in cp-elements.json`,
            ),
          );
        }
      });
      week.introduces.forEach((code, i) => {
        const element = code.split("-")[1];
        if (element !== undefined && !(elementIds as ReadonlySet<string>).has(element)) {
          findings.push(
            error(
              "weeks.json",
              `${at}.introduces[${i}]`,
              `${week.id}: element of "${code}" is not in cp-elements.json`,
            ),
          );
        }
      });
    });
  }

  if (mapping !== undefined) {
    const mapped = new Set<string>();
    mapping.mappings.forEach((row, index) => {
      const at = `mappings[${index}]`;
      mapped.add(row.cpCode);
      if (cpCodes !== undefined && !cpCodes.has(row.cpCode)) {
        findings.push(
          error(
            "cp-mapping.json",
            `${at}.cpCode`,
            `CP item "${row.cpCode}" is not in cp-elements.json`,
          ),
        );
      }
      try {
        if (!sameList(expandSdWeekCodes(row.weeksText), row.weeks)) {
          findings.push(
            error(
              "cp-mapping.json",
              `${at}.weeks`,
              `does not equal weeksText "${row.weeksText}" expanded`,
            ),
          );
        }
      } catch (cause) {
        findings.push(error("cp-mapping.json", `${at}.weeksText`, (cause as Error).message));
      }
      row.weeks.forEach((code, i) => {
        const week = weekById?.get(code);
        const wat = `${at}.weeks[${i}]`;
        if (weekById === undefined) {
          return;
        }
        if (week === undefined) {
          findings.push(error("cp-mapping.json", wat, `week "${code}" is not in weeks.json`));
          return;
        }
        if (week.stage !== SD_CP_STAGE) {
          findings.push(
            error(
              "cp-mapping.json",
              wat,
              `${code} is a stage ${week.stage} introduction (kelas 1-4), outside the CP; only stage ${SD_CP_STAGE} weeks fulfil a CP item`,
            ),
          );
        }
        if (week.strengthening) {
          findings.push(
            error(
              "cp-mapping.json",
              wat,
              `${code} is marked [penguatan]: strengthening deepens an item, it is not counted as fulfilling it`,
            ),
          );
        }
        if (!week.cpItems.includes(row.cpCode)) {
          findings.push(
            error(
              "cp-mapping.json",
              wat,
              `${code} does not cite ${row.cpCode} in its "Butir" cell (weeks.json)`,
            ),
          );
        }
      });
    });
    if (cp !== undefined) {
      for (const item of cp.items) {
        if (!mapped.has(item.code)) {
          findings.push(
            error(
              "cp-mapping.json",
              "mappings",
              `CP item "${item.code}" is not fulfilled by any week (silabus bagian 6 maps every item)`,
            ),
          );
        }
      }
    }
  }

  if (bridges !== undefined && weekById !== undefined) {
    const ids = new Set(bridges.bridges.map((bridge) => bridge.id));
    for (const id of SD_BRIDGE_IDS) {
      if (!ids.has(id)) {
        findings.push(error("bridges.json", "bridges", `bridge "${id}" is missing`));
      }
    }
    bridges.osn.enrichmentWeeks.forEach((code, index) => {
      const week = weekById.get(code);
      const at = `osn.enrichmentWeeks[${index}]`;
      if (week === undefined) {
        findings.push(error("bridges.json", at, `week "${code}" is not in weeks.json`));
      } else if (week.stage === SD_CP_STAGE) {
        findings.push(
          error(
            "bridges.json",
            at,
            `${code} is a CP week; the enrichment named in bagian 8 is outside the CP and is not an OSN bridge`,
          ),
        );
      }
    });
  }

  return findings;
}

/** Audits `source` -- the `data/sd-coding/` corpus as file name -> entry. */
export function auditSdCorpus(source: CorpusSource): AuditResult {
  const schema = schemaFindings(source);
  const findings = [
    ...schema.findings,
    ...structuralFindings(schema.parsed),
    ...referentialFindings(schema.parsed),
  ];
  const errorCount = findings.filter((finding) => finding.severity === "error").length;
  return {
    ok: findings.length === 0,
    findings,
    summary: {
      filesValidated: schema.filesValidated,
      filesMissing: schema.filesMissing,
      filesUnregistered: schema.filesUnregistered,
      findingCount: findings.length,
      errorCount,
      warningCount: findings.length - errorCount,
    },
  };
}
