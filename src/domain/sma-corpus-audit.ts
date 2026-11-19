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
import {
  SMA_CLASSES,
  SMA_FOUNDATION_BLOCK_ID,
  SMA_FOUNDATION_WEEKS,
  SMA_WEEKS_PER_SEMESTER,
} from "../schema/sma-common";
import { cpElementsFileSchema } from "../schema/sma-cp";
import { cpMappingFileSchema } from "../schema/sma-cp-mapping";
import { smaFoundationFileSchema } from "../schema/sma-foundation";
import { osnBridgeFileSchema } from "../schema/sma-osn-bridge";
import { smaSmpBridgeFileSchema } from "../schema/sma-smp-bridge";
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
  { file: "foundation.json", schema: smaFoundationFileSchema },
  { file: "cp-mapping.json", schema: cpMappingFileSchema },
  { file: "osn-bridge.json", schema: osnBridgeFileSchema },
  { file: "smp-bridge.json", schema: smaSmpBridgeFileSchema },
];

/**
 * The semester whose first weeks are taken by the shared foundation block:
 * track weeks of this semester start after the block (silabus v1.1, bagian 3.0).
 */
export const SMA_FOUNDATION_SEMESTER = "X1";

/**
 * The fixed counts the approved v1.2 syllabus has. `weeks` is the total over
 * all tracks: jalur A-D have 77 each (kelas X semester 1 starts at week 8,
 * the other five semesters have 14) and jalur E has 56 (kelas XI-XII only).
 * `enrichmentLinks` are the irisan of jalur D (7) and E (2) with CP items.
 */
export const SMA_EXPECTED_COUNTS = {
  cpQuotes: 6,
  cpItems: 36,
  structureRows: SMA_STRUCTURE_ROW_IDS.length,
  semestersPerTrack: 6,
  tracks: 5,
  weeks: 364,
  cpMappings: 26,
  enrichmentLinks: 9,
  foundationWeeks: SMA_FOUNDATION_WEEKS,
  /** Rows of the SMP entry-and-placement table in bagian 3.0 (v1.4, #177). */
  smpBridgeRows: 7,
} as const;

/** The position of a kelas in teaching order (X < XI < XII). */
function classIndex(kelas: string): number {
  return (SMA_CLASSES as readonly string[]).indexOf(kelas);
}

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
  const foundation = typed<z.infer<typeof smaFoundationFileSchema>>(parsed, "foundation.json");
  const smpBridge = typed<z.infer<typeof smaSmpBridgeFileSchema>>(parsed, "smp-bridge.json");

  const count = (file: string, path: string, label: string, actual: number, expected: number) => {
    if (actual !== expected) {
      findings.push(error(file, path, `expected exactly ${expected} ${label}, found ${actual}`));
    }
  };

  if (smpBridge !== undefined) {
    count(
      "smp-bridge.json",
      "rows",
      "SMP entry rows",
      smpBridge.rows.length,
      SMA_EXPECTED_COUNTS.smpBridgeRows,
    );
  }
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
  if (tracks !== undefined) {
    count("tracks.json", "tracks", "tracks", tracks.tracks.length, SMA_EXPECTED_COUNTS.tracks);
  }
  if (weeks !== undefined) {
    count("weeks.json", "weeks", "track weeks", weeks.weeks.length, SMA_EXPECTED_COUNTS.weeks);
  }
  if (mapping !== undefined) {
    count(
      "cp-mapping.json",
      "enrichmentLinks",
      "enrichment links",
      mapping.enrichmentLinks.length,
      SMA_EXPECTED_COUNTS.enrichmentLinks,
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

  if (foundation !== undefined) {
    const expectedCodes = `${SMA_FOUNDATION_BLOCK_ID}-${SMA_FOUNDATION_SEMESTER}`;
    const numbers = foundation.weeks.map((week) => week.week).sort((a, b) => a - b);
    const complete =
      numbers.length === SMA_FOUNDATION_WEEKS && numbers.every((n, i) => n === i + 1);
    if (!complete) {
      findings.push(
        error(
          "foundation.json",
          "weeks",
          `must contain exactly the weeks 1..${SMA_FOUNDATION_WEEKS} of ${expectedCodes} once each; found [${numbers.join(", ")}]`,
        ),
      );
    }
    foundation.weeks.forEach((week, index) => {
      if (week.semesterCode !== expectedCodes) {
        findings.push(
          error(
            "foundation.json",
            `weeks[${index}].semesterCode`,
            `the foundation block exists only in ${expectedCodes}`,
          ),
        );
      }
    });
  }

  if (weeks !== undefined) {
    const bySemester = new Map<string, number[]>();
    for (const week of weeks.weeks) {
      bySemester.set(week.semesterCode, [...(bySemester.get(week.semesterCode) ?? []), week.week]);
    }
    for (const [semesterCode, numbers] of bySemester) {
      const sorted = [...numbers].sort((a, b) => a - b);
      // Track weeks of the foundation semester start after the foundation block.
      const first = semesterCode.endsWith(`-${SMA_FOUNDATION_SEMESTER}`)
        ? SMA_FOUNDATION_WEEKS + 1
        : 1;
      const complete =
        sorted.length === SMA_WEEKS_PER_SEMESTER - first + 1 &&
        sorted.every((n, i) => n === first + i);
      if (!complete) {
        findings.push(
          error(
            "weeks.json",
            `weeks[semesterCode=${semesterCode}]`,
            `must contain exactly the weeks ${first}..${SMA_WEEKS_PER_SEMESTER} once each; found [${sorted.join(", ")}]`,
          ),
        );
      }
    }
    if (tracks !== undefined && structure !== undefined) {
      for (const track of tracks.tracks) {
        for (const semester of structure.semesters) {
          const present = bySemester.has(`${track.id}-${semester.code}`);
          const started = classIndex(semester.kelas) >= classIndex(track.startClass);
          if (started && !present) {
            findings.push(
              error(
                "weeks.json",
                `weeks[semesterCode=${track.id}-${semester.code}]`,
                `track ${track.id} has no weeks for semester ${semester.code}`,
              ),
            );
          } else if (!started && present) {
            findings.push(
              error(
                "weeks.json",
                `weeks[semesterCode=${track.id}-${semester.code}]`,
                `track ${track.id} starts in kelas ${track.startClass} (tracks.json) and must have no weeks in semester ${semester.code}`,
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
  const foundation = typed<z.infer<typeof smaFoundationFileSchema>>(parsed, "foundation.json");
  const smpBridge = typed<z.infer<typeof smaSmpBridgeFileSchema>>(parsed, "smp-bridge.json");

  const trackIds = tracks && new Set(tracks.tracks.map((track) => track.id));
  // Foundation weeks belong to no track, so a row may cite them whatever tracks it lists.
  const foundationIds = new Set(foundation?.weeks.map((week) => week.id) ?? []);
  const weekIds = weeks && new Set([...weeks.weeks.map((week) => week.id), ...foundationIds]);
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
      if (foundationIds.has(code)) {
        return;
      }
      if (weekIds !== undefined && !weekIds.has(code)) {
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

  // A pengayaan track lies outside the CP wording: it may never count as covering a CP item.
  const enrichmentTrackIds = new Set(
    tracks?.tracks.filter((track) => track.cpStatus === "pengayaan").map((track) => track.id) ?? [],
  );

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
          } else if (enrichmentTrackIds.has(id)) {
            findings.push(
              error(
                "cp-mapping.json",
                `${at}.tracks[${i}]`,
                `track "${id}" is a pengayaan track (outside the CP wording) and cannot count as covering a CP item; record it in enrichmentLinks instead`,
              ),
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

  if (mapping !== undefined) {
    mapping.enrichmentLinks.forEach((link, index) => {
      const at = `enrichmentLinks[${index}]`;
      if (cpCodes !== undefined && !cpCodes.has(link.cpCode)) {
        findings.push(
          error(
            "cp-mapping.json",
            `${at}.cpCode`,
            `CP item "${link.cpCode}" does not exist in cp-elements.json`,
          ),
        );
      }
      if (trackIds !== undefined) {
        if (!trackIds.has(link.track)) {
          findings.push(
            error("cp-mapping.json", `${at}.track`, `track "${link.track}" is not in tracks.json`),
          );
        } else if (!enrichmentTrackIds.has(link.track)) {
          findings.push(
            error(
              "cp-mapping.json",
              `${at}.track`,
              `track "${link.track}" is counted in the CP mapping (cpStatus "dalam-cp"); enrichmentLinks are only for pengayaan tracks`,
            ),
          );
        }
      }
      try {
        if (!sameList(expandWeekCodes(link.weeksText), link.weeks)) {
          findings.push(
            error(
              "cp-mapping.json",
              `${at}.weeks`,
              `does not equal weeksText "${link.weeksText}" expanded`,
            ),
          );
        }
      } catch (cause) {
        findings.push(error("cp-mapping.json", `${at}.weeksText`, (cause as Error).message));
      }
      checkWeeks("cp-mapping.json", `${at}.weeks`, link.weeks, new Set([link.track]));
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

    bridge.trackBridges.forEach((entry, entryIndex) => {
      const at = `trackBridges[${entryIndex}]`;
      if (trackIds !== undefined && !trackIds.has(entry.track)) {
        findings.push(
          error("osn-bridge.json", `${at}.track`, `track "${entry.track}" is not in tracks.json`),
        );
      }
      entry.bridges.forEach((row, index) => {
        const rowAt = `${at}.bridges[${index}]`;
        try {
          if (!sameList(expandWeekCodes(row.weeksText), row.weeks)) {
            findings.push(
              error(
                "osn-bridge.json",
                `${rowAt}.weeks`,
                `does not equal weeksText "${row.weeksText}" expanded`,
              ),
            );
          }
        } catch (cause) {
          findings.push(error("osn-bridge.json", `${rowAt}.weeksText`, (cause as Error).message));
        }
        checkWeeks("osn-bridge.json", `${rowAt}.weeks`, row.weeks, new Set([entry.track]));
        if (osnTopicFamilyIds !== undefined && !osnTopicFamilyIds.has(row.familyId)) {
          findings.push(
            error(
              "osn-bridge.json",
              `${rowAt}.familyId`,
              `OSN topic family "${row.familyId}" does not exist in data/osn/topic-families.json`,
            ),
          );
        }
      });
    });
  }

  // The SMP entry table (bagian 3.0, v1.4): every sma-coding week it names must exist.
  // The smp-coding week codes of its first column are checked by the cross-programme check (ADR-0010).
  if (smpBridge !== undefined && weekIds !== undefined) {
    smpBridge.rows.forEach((row, index) => {
      row.smaWeeks.forEach((code, i) => {
        if (!weekIds.has(code)) {
          findings.push(
            error(
              "smp-bridge.json",
              `rows[${index}].smaWeeks[${i}]`,
              `week "${code}" does not exist in weeks.json or foundation.json`,
            ),
          );
        }
      });
    });
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
