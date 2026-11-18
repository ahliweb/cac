/**
 * Whole-corpus audit of the `sma-coding` programme (`data/sma-coding/`),
 * the counterpart of `auditCorpus` for the OSN corpus (ADR-0006). Like it,
 * this is a pure function of an injected {@link CorpusSource}: every
 * problem is reported in one pass, nothing is thrown for ordinary bad data,
 * and nothing reads a filesystem (the loader lives in `src/cli/`).
 *
 * Checks: schema conformance of every registered file plus the reverse
 * "unregistered file" check; fixed structural invariants (counts, the
 * 14-week semesters, structure/week consistency); and referential
 * integrity (CP codes, week codes, track ids, and the cross-programme
 * reference from the OSN bridge to `data/osn/topic-families.json`).
 */

import type { z } from "zod";
import { MODULES_FILE_NAME } from "../schema/module";
import { SMA_WEEKS_PER_SEMESTER } from "../schema/sma-common";
import { cpElementsFileSchema } from "../schema/sma-cp";
import { cpMappingFileSchema } from "../schema/sma-cp-mapping";
import { osnBridgeFileSchema } from "../schema/sma-osn-bridge";
import { SMA_STRUCTURE_ROW_IDS, smaStructureFileSchema } from "../schema/sma-structure";
import { smaTracksFileSchema } from "../schema/sma-track";
import { smaWeeksFileSchema } from "../schema/sma-week";
import type { AuditResult, CorpusFinding, CorpusSource } from "./corpus-audit";
import { expandWeekCodes } from "./sma-week-codes";

interface SmaFileEntry {
  readonly file: string;
  readonly schema: z.ZodTypeAny;
}

/** The file -> schema registry of the `sma-coding` corpus. */
export const SMA_DATA_FILE_REGISTRY: readonly SmaFileEntry[] = [
  { file: "cp-elements.json", schema: cpElementsFileSchema },
  { file: "tracks.json", schema: smaTracksFileSchema },
  { file: "structure.json", schema: smaStructureFileSchema },
  { file: "weeks.json", schema: smaWeeksFileSchema },
  { file: "cp-mapping.json", schema: cpMappingFileSchema },
  { file: "osn-bridge.json", schema: osnBridgeFileSchema },
];

/** The fixed counts the approved v1.0 syllabus has. */
export const SMA_EXPECTED_COUNTS = {
  cpQuotes: 6,
  cpItems: 36,
  structureRows: SMA_STRUCTURE_ROW_IDS.length,
  semestersPerTrack: 6,
  cpMappings: 24,
} as const;

function error(file: string, path: string, message: string): CorpusFinding {
  return { file, path, message, severity: "error" };
}

type Parsed = ReadonlyMap<string, unknown>;

function typed<T>(parsed: Parsed, file: string): T | undefined {
  return parsed.get(file) as T | undefined;
}

function schemaFindings(source: CorpusSource) {
  const findings: CorpusFinding[] = [];
  const parsed = new Map<string, unknown>();
  let filesValidated = 0;
  let filesMissing = 0;

  for (const entry of SMA_DATA_FILE_REGISTRY) {
    const found = source.get(entry.file);
    if (found === undefined) {
      filesMissing += 1;
      findings.push(
        error(
          entry.file,
          "(file)",
          `required data file is missing from the corpus (expected at data/sma-coding/${entry.file})`,
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

  const registered = new Set(SMA_DATA_FILE_REGISTRY.map((entry) => entry.file));
  let filesUnregistered = 0;
  for (const file of source.keys()) {
    // modules.json is the optional learning-module index (ADR-0007), validated by `moduleFindings`.
    if (!registered.has(file) && file !== MODULES_FILE_NAME) {
      filesUnregistered += 1;
      findings.push(
        error(
          file,
          "(file)",
          "this data file is not covered by any schema in SMA_DATA_FILE_REGISTRY " +
            "(src/domain/sma-corpus-audit.ts) -- add it there so it is validated rather than silently ignored",
        ),
      );
    }
  }

  return { findings, parsed, filesValidated, filesMissing, filesUnregistered };
}

function structuralFindings(parsed: Parsed): CorpusFinding[] {
  const findings: CorpusFinding[] = [];
  const cp = typed<z.infer<typeof cpElementsFileSchema>>(parsed, "cp-elements.json");
  const tracks = typed<z.infer<typeof smaTracksFileSchema>>(parsed, "tracks.json");
  const structure = typed<z.infer<typeof smaStructureFileSchema>>(parsed, "structure.json");
  const weeks = typed<z.infer<typeof smaWeeksFileSchema>>(parsed, "weeks.json");
  const mapping = typed<z.infer<typeof cpMappingFileSchema>>(parsed, "cp-mapping.json");

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
      SMA_EXPECTED_COUNTS.cpQuotes,
    );
    count("cp-elements.json", "items", "CP items", cp.items.length, SMA_EXPECTED_COUNTS.cpItems);
  }
  if (mapping !== undefined) {
    count(
      "cp-mapping.json",
      "mappings",
      "CP mappings",
      mapping.mappings.length,
      SMA_EXPECTED_COUNTS.cpMappings,
    );
  }
  if (structure !== undefined) {
    count(
      "structure.json",
      "rows",
      "structure rows",
      structure.rows.length,
      SMA_EXPECTED_COUNTS.structureRows,
    );
    count(
      "structure.json",
      "semesters",
      "semesters",
      structure.semesters.length,
      SMA_EXPECTED_COUNTS.semestersPerTrack,
    );
    if (structure.weeksPerSemester.teaching !== SMA_WEEKS_PER_SEMESTER) {
      findings.push(
        error(
          "structure.json",
          "weeksPerSemester.teaching",
          `must equal ${SMA_WEEKS_PER_SEMESTER}, the number of weeks M1..M${SMA_WEEKS_PER_SEMESTER} in weeks.json`,
        ),
      );
    }
    const { semesterPattern } = structure;
    if (semesterPattern.assessmentWeek !== structure.weeksPerSemester.teaching) {
      findings.push(
        error("structure.json", "semesterPattern.assessmentWeek", "must be the last teaching week"),
      );
    }
  }

  if (weeks !== undefined) {
    const bySemester = new Map<string, number[]>();
    for (const week of weeks.weeks) {
      bySemester.set(week.semesterCode, [...(bySemester.get(week.semesterCode) ?? []), week.week]);
    }
    for (const [semesterCode, numbers] of bySemester) {
      const sorted = [...numbers].sort((a, b) => a - b);
      const complete =
        sorted.length === SMA_WEEKS_PER_SEMESTER && sorted.every((n, i) => n === i + 1);
      if (!complete) {
        findings.push(
          error(
            "weeks.json",
            `weeks[semesterCode=${semesterCode}]`,
            `must contain exactly the weeks 1..${SMA_WEEKS_PER_SEMESTER} once each; found [${sorted.join(", ")}]`,
          ),
        );
      }
    }
    if (tracks !== undefined && structure !== undefined) {
      for (const track of tracks.tracks) {
        for (const semester of structure.semesters) {
          if (!bySemester.has(`${track.id}-${semester.code}`)) {
            findings.push(
              error(
                "weeks.json",
                `weeks[semesterCode=${track.id}-${semester.code}]`,
                `track ${track.id} has no weeks for semester ${semester.code}`,
              ),
            );
          }
        }
      }
    }
  }

  return findings;
}

/**
 * @param osnTopicFamilyIds the ids in `data/osn/topic-families.json`, or
 *   `undefined` when that corpus could not be loaded (reported as a finding).
 */
function referentialFindings(
  parsed: Parsed,
  osnTopicFamilyIds: ReadonlySet<string> | undefined,
): CorpusFinding[] {
  const findings: CorpusFinding[] = [];
  const cp = typed<z.infer<typeof cpElementsFileSchema>>(parsed, "cp-elements.json");
  const tracks = typed<z.infer<typeof smaTracksFileSchema>>(parsed, "tracks.json");
  const structure = typed<z.infer<typeof smaStructureFileSchema>>(parsed, "structure.json");
  const weeks = typed<z.infer<typeof smaWeeksFileSchema>>(parsed, "weeks.json");
  const mapping = typed<z.infer<typeof cpMappingFileSchema>>(parsed, "cp-mapping.json");
  const bridge = typed<z.infer<typeof osnBridgeFileSchema>>(parsed, "osn-bridge.json");

  const trackIds = tracks && new Set(tracks.tracks.map((track) => track.id));
  const weekById = weeks && new Map(weeks.weeks.map((week) => [week.id, week]));
  const cpCodes = cp && new Set(cp.items.map((item) => item.code));

  if (weeks !== undefined && trackIds !== undefined) {
    weeks.weeks.forEach((week, index) => {
      if (!trackIds.has(week.track)) {
        findings.push(
          error(
            "weeks.json",
            `weeks[${index}].track`,
            `track "${week.track}" is not in tracks.json`,
          ),
        );
      }
    });
  }

  if (weeks !== undefined && structure !== undefined) {
    const semesterByCode = new Map(structure.semesters.map((s) => [s.code, s]));
    weeks.weeks.forEach((week, index) => {
      const semester = semesterByCode.get(week.semester);
      if (semester === undefined) {
        findings.push(
          error(
            "weeks.json",
            `weeks[${index}].semester`,
            `semester "${week.semester}" is not in structure.json`,
          ),
        );
      } else if (semester.kelas !== week.kelas || semester.phase !== week.phase) {
        findings.push(
          error(
            "weeks.json",
            `weeks[${index}]`,
            `kelas/phase (${week.kelas}/${week.phase}) disagree with structure.json for semester ${week.semester} (${semester.kelas}/${semester.phase})`,
          ),
        );
      }
    });
  }

  const checkWeeks = (
    file: string,
    path: string,
    listed: readonly string[],
    allowedTracks: ReadonlySet<string>,
  ) => {
    listed.forEach((code, i) => {
      const week = weekById?.get(code);
      if (weekById !== undefined && week === undefined) {
        findings.push(error(file, `${path}[${i}]`, `week "${code}" does not exist in weeks.json`));
      } else if (week !== undefined && !allowedTracks.has(week.track)) {
        findings.push(
          error(
            file,
            `${path}[${i}]`,
            `week "${code}" belongs to track ${week.track}, which this row does not list`,
          ),
        );
      }
    });
  };

  const sameList = (a: readonly string[], b: readonly string[]) =>
    a.length === b.length && a.every((value, i) => value === b[i]);

  if (mapping !== undefined) {
    mapping.mappings.forEach((row, index) => {
      const at = `mappings[${index}]`;
      if (cpCodes !== undefined && !cpCodes.has(row.cpCode)) {
        findings.push(
          error(
            "cp-mapping.json",
            `${at}.cpCode`,
            `CP item "${row.cpCode}" does not exist in cp-elements.json`,
          ),
        );
      }
      if (trackIds !== undefined) {
        row.tracks.forEach((id, i) => {
          if (!trackIds.has(id)) {
            findings.push(
              error("cp-mapping.json", `${at}.tracks[${i}]`, `track "${id}" is not in tracks.json`),
            );
          }
        });
      }
      if (cp !== undefined && cpCodes?.has(row.cpCode)) {
        const phase = row.cpCode.slice(0, 1);
        const expectedSection = phase === "E" ? "bagian 4.1" : "bagian 4.2";
        if (row.sourceSection !== expectedSection) {
          findings.push(
            error(
              "cp-mapping.json",
              `${at}.sourceSection`,
              `CP item of phase ${phase} belongs to ${expectedSection}`,
            ),
          );
        }
      }
      try {
        if (!sameList(expandWeekCodes(row.weeksText), row.weeks)) {
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
      checkWeeks("cp-mapping.json", `${at}.weeks`, row.weeks, new Set(row.tracks));
    });
  }

  if (bridge !== undefined) {
    if (trackIds !== undefined && !trackIds.has(bridge.track)) {
      findings.push(
        error("osn-bridge.json", "track", `track "${bridge.track}" is not in tracks.json`),
      );
    }
    bridge.bridges.forEach((row, index) => {
      const at = `bridges[${index}]`;
      try {
        if (!sameList(expandWeekCodes(row.weeksText), row.weeks)) {
          findings.push(
            error(
              "osn-bridge.json",
              `${at}.weeks`,
              `does not equal weeksText "${row.weeksText}" expanded`,
            ),
          );
        }
      } catch (cause) {
        findings.push(error("osn-bridge.json", `${at}.weeksText`, (cause as Error).message));
      }
      checkWeeks("osn-bridge.json", `${at}.weeks`, row.weeks, new Set([bridge.track]));
    });

    if (osnTopicFamilyIds === undefined) {
      findings.push(
        error(
          "osn-bridge.json",
          "bridges[*].familyId",
          "cannot verify the OSN topic family ids: data/osn/topic-families.json could not be loaded",
        ),
      );
    } else {
      bridge.bridges.forEach((row, index) => {
        if (!osnTopicFamilyIds.has(row.familyId)) {
          findings.push(
            error(
              "osn-bridge.json",
              `bridges[${index}].familyId`,
              `OSN topic family "${row.familyId}" does not exist in data/osn/topic-families.json`,
            ),
          );
        }
      });
      const covered = new Set(bridge.bridges.map((row) => row.familyId));
      for (const id of osnTopicFamilyIds) {
        if (!covered.has(id)) {
          findings.push(
            error(
              "osn-bridge.json",
              "bridges",
              `OSN topic family "${id}" is not covered (silabus bagian 5 covers every family)`,
            ),
          );
        }
      }
    }
  }

  return findings;
}

/**
 * Audits `source` -- the `data/sma-coding/` corpus as file name ->
 * entry. `osnTopicFamilyIds` is the id set of the OSN corpus's topic
 * families (cross-programme reference, ADR-0006), or `undefined` when it
 * could not be loaded.
 */
export function auditSmaCorpus(
  source: CorpusSource,
  osnTopicFamilyIds: ReadonlySet<string> | undefined,
): AuditResult {
  const schema = schemaFindings(source);
  const findings = [
    ...schema.findings,
    ...structuralFindings(schema.parsed),
    ...referentialFindings(schema.parsed, osnTopicFamilyIds),
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
