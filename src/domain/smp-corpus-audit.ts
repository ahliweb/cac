/**
 * Whole-corpus audit of the `smp-coding` programme (`data/smp-coding/`),
 * the counterpart of `auditSmaCorpus` (ADR-0006, ADR-0008). Like it, this is
 * a pure function of an injected {@link CorpusSource}: every problem is
 * reported in one pass, nothing is thrown for ordinary bad data, and nothing
 * reads a filesystem (the loader lives in `src/cli/`).
 *
 * Checks: schema conformance of every registered file plus the reverse
 * "unregistered file" check; fixed structural invariants (84 weeks, 14 per
 * semester, counts, structure/week consistency, one provenance across
 * files); and referential integrity (CP codes, week codes, the CP mapping
 * against the weeks that actually name each item, the explicit list of
 * uncovered items, the enrichment outside the CP wording, the bridges).
 *
 * The central rule of this programme: coverage of a CP item is counted from
 * `cpCodes` only. Python overlaps (`irisanCodes`), `pengayaan` weeks, the
 * club and the binary-coding weeks never count, and an item no week covers
 * is listed in `uncovered.json` rather than left silent.
 */

import type { z } from "zod";
import { smpBridgeFileSchema } from "../schema/smp-bridge";
import { smpClubFileSchema } from "../schema/smp-club";
import { SMP_WEEKS_PER_SEMESTER } from "../schema/smp-common";
import { smpCpElementsFileSchema } from "../schema/smp-cp";
import { smpCpMappingFileSchema } from "../schema/smp-cp-mapping";
import { SMP_STRUCTURE_ROW_IDS, smpStructureFileSchema } from "../schema/smp-structure";
import { smpUncoveredFileSchema } from "../schema/smp-uncovered";
import { smpWeeksFileSchema } from "../schema/smp-week";
import type { AuditResult, CorpusFinding, CorpusSource } from "./corpus-audit";
import { parseSmpMappingWeeks, smpSemesterIndex } from "./smp-week-codes";

interface SmpFileEntry {
  readonly file: string;
  readonly schema: z.ZodTypeAny;
}

/** The file -> schema registry of the `smp-coding` corpus. */
export const SMP_DATA_FILE_REGISTRY: readonly SmpFileEntry[] = [
  { file: "cp-elements.json", schema: smpCpElementsFileSchema },
  { file: "structure.json", schema: smpStructureFileSchema },
  { file: "weeks.json", schema: smpWeeksFileSchema },
  { file: "cp-mapping.json", schema: smpCpMappingFileSchema },
  { file: "uncovered.json", schema: smpUncoveredFileSchema },
  { file: "club.json", schema: smpClubFileSchema },
  { file: "bridge.json", schema: smpBridgeFileSchema },
];

/**
 * The fixed counts the approved v1.0 syllabus has: 2 CP texts (6 element
 * quotations, 35 item codes: D-BK 5, D-LD 17, DK-BK 3, DK-LD 1, DK-EA 7,
 * DK-PA 2), 6 semesters of 14 weeks = 84 weeks, 11 items no week covers,
 * 3 enrichment kinds, 3 club stages and 6 bridge rows to `sma-coding`.
 */
export const SMP_EXPECTED_COUNTS = {
  cpQuotes: 6,
  cpItems: 35,
  structureRows: SMP_STRUCTURE_ROW_IDS.length,
  semesters: 6,
  weeks: 84,
  cpMappings: 35,
  uncovered: 11,
  enrichment: 3,
  clubStages: 3,
  bridgeRows: 6,
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

  for (const entry of SMP_DATA_FILE_REGISTRY) {
    const found = source.get(entry.file);
    if (found === undefined) {
      filesMissing += 1;
      findings.push(
        error(
          entry.file,
          "(file)",
          `required data file is missing from the corpus (expected at data/smp-coding/${entry.file})`,
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

  const registered = new Set(SMP_DATA_FILE_REGISTRY.map((entry) => entry.file));
  let filesUnregistered = 0;
  for (const file of source.keys()) {
    if (!registered.has(file)) {
      filesUnregistered += 1;
      findings.push(
        error(
          file,
          "(file)",
          "this data file is not covered by any schema in SMP_DATA_FILE_REGISTRY " +
            "(src/domain/smp-corpus-audit.ts) -- add it there so it is validated rather than silently ignored",
        ),
      );
    }
  }

  return { findings, parsed, filesValidated, filesMissing, filesUnregistered };
}

function structuralFindings(parsed: Parsed): CorpusFinding[] {
  const findings: CorpusFinding[] = [];
  const cp = typed<z.infer<typeof smpCpElementsFileSchema>>(parsed, "cp-elements.json");
  const structure = typed<z.infer<typeof smpStructureFileSchema>>(parsed, "structure.json");
  const weeks = typed<z.infer<typeof smpWeeksFileSchema>>(parsed, "weeks.json");
  const mapping = typed<z.infer<typeof smpCpMappingFileSchema>>(parsed, "cp-mapping.json");
  const uncovered = typed<z.infer<typeof smpUncoveredFileSchema>>(parsed, "uncovered.json");
  const club = typed<z.infer<typeof smpClubFileSchema>>(parsed, "club.json");
  const bridge = typed<z.infer<typeof smpBridgeFileSchema>>(parsed, "bridge.json");

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
      SMP_EXPECTED_COUNTS.cpQuotes,
    );
    count("cp-elements.json", "items", "CP items", cp.items.length, SMP_EXPECTED_COUNTS.cpItems);
  }
  if (mapping !== undefined) {
    count(
      "cp-mapping.json",
      "mappings",
      "CP mappings",
      mapping.mappings.length,
      SMP_EXPECTED_COUNTS.cpMappings,
    );
    count(
      "cp-mapping.json",
      "enrichment",
      "enrichment entries",
      mapping.enrichment.length,
      SMP_EXPECTED_COUNTS.enrichment,
    );
  }
  if (uncovered !== undefined) {
    count(
      "uncovered.json",
      "items",
      "uncovered CP items",
      uncovered.items.length,
      SMP_EXPECTED_COUNTS.uncovered,
    );
  }
  if (club !== undefined) {
    count("club.json", "stages", "club stages", club.stages.length, SMP_EXPECTED_COUNTS.clubStages);
  }
  if (bridge !== undefined) {
    count(
      "bridge.json",
      "toSma",
      "bridge rows to sma-coding",
      bridge.toSma.length,
      SMP_EXPECTED_COUNTS.bridgeRows,
    );
  }
  if (weeks !== undefined) {
    count("weeks.json", "weeks", "weeks", weeks.weeks.length, SMP_EXPECTED_COUNTS.weeks);
    count(
      "weeks.json",
      "semesters",
      "semesters",
      weeks.semesters.length,
      SMP_EXPECTED_COUNTS.semesters,
    );
  }

  if (structure !== undefined) {
    count(
      "structure.json",
      "rows",
      "structure rows",
      structure.rows.length,
      SMP_EXPECTED_COUNTS.structureRows,
    );
    count(
      "structure.json",
      "semesters",
      "semesters",
      structure.semesters.length,
      SMP_EXPECTED_COUNTS.semesters,
    );
    const { weeksPerSemester, semesterPattern, totals, load } = structure;
    if (weeksPerSemester.teaching !== SMP_WEEKS_PER_SEMESTER) {
      findings.push(
        error(
          "structure.json",
          "weeksPerSemester.teaching",
          `must equal ${SMP_WEEKS_PER_SEMESTER}, the number of weeks M1..M${SMP_WEEKS_PER_SEMESTER} in weeks.json`,
        ),
      );
    }
    if (semesterPattern.assessmentWeek !== weeksPerSemester.teaching) {
      findings.push(
        error("structure.json", "semesterPattern.assessmentWeek", "must be the last teaching week"),
      );
    }
    if (
      semesterPattern.miniProjectWeek !== semesterPattern.materiToWeek + 1 ||
      semesterPattern.assessmentWeek !== semesterPattern.miniProjectWeek + 1 ||
      semesterPattern.materiFromWeek !== 1
    ) {
      findings.push(
        error(
          "structure.json",
          "semesterPattern",
          "must run materi from week 1 to week N, the mini project at N+1 and the assessment at N+2",
        ),
      );
    }
    if (totals.semesters !== structure.semesters.length) {
      findings.push(
        error("structure.json", "totals.semesters", "must equal the number of semesters listed"),
      );
    }
    if (totals.weeks !== totals.semesters * weeksPerSemester.teaching) {
      findings.push(
        error(
          "structure.json",
          "totals.weeks",
          `must equal semesters x teaching weeks (${totals.semesters * weeksPerSemester.teaching})`,
        ),
      );
    }
    if (totals.jp !== totals.weeks * load.jpPerWeek) {
      findings.push(
        error(
          "structure.json",
          "totals.jp",
          `must equal weeks x jpPerWeek (${totals.weeks * load.jpPerWeek})`,
        ),
      );
    }
    if (weeks !== undefined && totals.weeks !== weeks.weeks.length) {
      findings.push(
        error(
          "structure.json",
          "totals.weeks",
          `says ${totals.weeks} but weeks.json has ${weeks.weeks.length} weeks`,
        ),
      );
    }
  }

  if (weeks !== undefined) {
    const bySemester = new Map<string, number[]>();
    for (const week of weeks.weeks) {
      bySemester.set(week.semester, [...(bySemester.get(week.semester) ?? []), week.week]);
    }
    for (const [semester, numbers] of bySemester) {
      const sorted = [...numbers].sort((a, b) => a - b);
      const complete =
        sorted.length === SMP_WEEKS_PER_SEMESTER && sorted.every((n, i) => n === i + 1);
      if (!complete) {
        findings.push(
          error(
            "weeks.json",
            `weeks[semester=${semester}]`,
            `must contain exactly the weeks 1..${SMP_WEEKS_PER_SEMESTER} once each; found [${sorted.join(", ")}]`,
          ),
        );
      }
    }
    const planSemesters = new Set(weeks.semesters.map((semester) => semester.code));
    for (const code of bySemester.keys()) {
      if (!planSemesters.has(code)) {
        findings.push(
          error("weeks.json", `weeks[semester=${code}]`, `semester "${code}" is not in semesters`),
        );
      }
    }
    for (const code of planSemesters) {
      if (!bySemester.has(code)) {
        findings.push(error("weeks.json", `semesters[${code}]`, `semester "${code}" has no weeks`));
      }
    }
  }

  // One syllabus version and date across every file.
  const provenance = [...parsed.entries()].map(([file, data]) => {
    const record = data as { syllabusVersion: string; syllabusDate: string };
    return { file, version: record.syllabusVersion, date: record.syllabusDate };
  });
  const first = provenance[0];
  if (first !== undefined) {
    for (const entry of provenance) {
      if (entry.version !== first.version || entry.date !== first.date) {
        findings.push(
          error(
            entry.file,
            "syllabusVersion",
            `version/date ${entry.version} (${entry.date}) differ from ${first.file} (${first.version}, ${first.date}); every file transcribes the same syllabus`,
          ),
        );
      }
    }
  }

  return findings;
}

function referentialFindings(parsed: Parsed): CorpusFinding[] {
  const findings: CorpusFinding[] = [];
  const cp = typed<z.infer<typeof smpCpElementsFileSchema>>(parsed, "cp-elements.json");
  const structure = typed<z.infer<typeof smpStructureFileSchema>>(parsed, "structure.json");
  const weeks = typed<z.infer<typeof smpWeeksFileSchema>>(parsed, "weeks.json");
  const mapping = typed<z.infer<typeof smpCpMappingFileSchema>>(parsed, "cp-mapping.json");
  const uncovered = typed<z.infer<typeof smpUncoveredFileSchema>>(parsed, "uncovered.json");
  const club = typed<z.infer<typeof smpClubFileSchema>>(parsed, "club.json");
  const bridge = typed<z.infer<typeof smpBridgeFileSchema>>(parsed, "bridge.json");

  const cpCodes = cp && new Set(cp.items.map((item) => item.code));
  const weekById = weeks && new Map(weeks.weeks.map((week) => [week.id, week]));
  const structureSemesters = structure && new Set(structure.semesters.map((s) => s.code));

  /** For each CP item, the ids of the weeks that count towards covering it (cpCodes only). */
  const coveringWeeks = new Map<string, string[]>();
  if (weeks !== undefined) {
    for (const week of weeks.weeks) {
      for (const code of week.cpCodes) {
        coveringWeeks.set(code, [...(coveringWeeks.get(code) ?? []), week.id]);
      }
    }
  }
  const coveredCount = (code: string): number => coveringWeeks.get(code)?.length ?? 0;
  /** For each CP item, how many weeks name it only as a Python overlap (`*`): never coverage. */
  const overlapWeeks = new Map<string, number>();
  if (weeks !== undefined) {
    for (const week of weeks.weeks) {
      for (const code of week.irisanCodes) {
        overlapWeeks.set(code, (overlapWeeks.get(code) ?? 0) + 1);
      }
    }
  }
  const irisanCount = (code: string): number => overlapWeeks.get(code) ?? 0;

  if (weeks !== undefined && cpCodes !== undefined) {
    weeks.weeks.forEach((week, index) => {
      for (const field of ["cpCodes", "irisanCodes"] as const) {
        week[field].forEach((code, i) => {
          if (!cpCodes.has(code)) {
            findings.push(
              error(
                "weeks.json",
                `weeks[${index}].${field}[${i}]`,
                `CP item "${code}" does not exist in cp-elements.json`,
              ),
            );
          }
        });
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
      } else if (semester.kelas !== week.kelas) {
        findings.push(
          error(
            "weeks.json",
            `weeks[${index}].kelas`,
            `kelas ${week.kelas} disagrees with structure.json for semester ${week.semester} (kelas ${semester.kelas})`,
          ),
        );
      }
    });
    const planned = weeks.semesters.map((s) => s.code).sort();
    const structural = structure.semesters.map((s) => s.code).sort();
    if (planned.join(",") !== structural.join(",")) {
      findings.push(
        error(
          "weeks.json",
          "semesters",
          `semesters [${planned.join(", ")}] differ from structure.json [${structural.join(", ")}]`,
        ),
      );
    }
  }

  // Python (text programming) lies beyond the CP wording: an overlap marked `*` may only occur
  // from the semester structure.json says text programming starts, and never counts as coverage.
  if (weeks !== undefined && structure !== undefined) {
    const from = structure.textLanguage.fromSemester;
    if (!structureSemesters?.has(from)) {
      findings.push(
        error(
          "structure.json",
          "textLanguage.fromSemester",
          `semester "${from}" is not in structure.json`,
        ),
      );
    }
    weeks.weeks.forEach((week, index) => {
      if (week.irisanCodes.length > 0 && smpSemesterIndex(week.semester) < smpSemesterIndex(from)) {
        findings.push(
          error(
            "weeks.json",
            `weeks[${index}].irisanCodes`,
            `week ${week.id} marks a Python overlap (*) before text programming starts in ${from}`,
          ),
        );
      }
    });
  }

  if (mapping !== undefined) {
    const mapped = new Set(mapping.mappings.map((row) => row.cpCode));
    if (cpCodes !== undefined) {
      for (const code of cpCodes) {
        if (!mapped.has(code)) {
          findings.push(
            error(
              "cp-mapping.json",
              "mappings",
              `CP item "${code}" has no mapping row (silabus bagian 4 maps every item, covered or not)`,
            ),
          );
        }
      }
    }
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
      try {
        const parsedText = parseSmpMappingWeeks(row.weeksText);
        if (
          parsedText.weeks.join(",") !== row.weeks.join(",") ||
          parsedText.otherWeeks !== row.otherWeeks
        ) {
          findings.push(
            error(
              "cp-mapping.json",
              `${at}.weeks`,
              `weeks/otherWeeks do not equal weeksText "${row.weeksText}" parsed`,
            ),
          );
        }
      } catch (cause) {
        findings.push(error("cp-mapping.json", `${at}.weeksText`, (cause as Error).message));
      }
      row.weeks.forEach((code, i) => {
        const week = weekById?.get(code);
        if (weekById !== undefined && week === undefined) {
          findings.push(
            error(
              "cp-mapping.json",
              `${at}.weeks[${i}]`,
              `week "${code}" does not exist in weeks.json`,
            ),
          );
        } else if (
          week !== undefined &&
          !week.cpCodes.includes(row.cpCode) &&
          !week.irisanCodes.includes(row.cpCode)
        ) {
          findings.push(
            error(
              "cp-mapping.json",
              `${at}.weeks[${i}]`,
              `week "${code}" does not name ${row.cpCode} in its Butir CP cell (cpCodes or irisanCodes)`,
            ),
          );
        }
      });
      if (weeks !== undefined) {
        // The "Minggu" column lists every week whose Butir CP cell names the item, Python-marked (*) ones included.
        const covering = coveredCount(row.cpCode);
        const overlapping = irisanCount(row.cpCode);
        const claimed = row.weeks.length + row.otherWeeks;
        if (claimed !== covering + overlapping) {
          findings.push(
            error(
              "cp-mapping.json",
              `${at}`,
              `${row.cpCode} is mapped to ${claimed} weeks but ${covering + overlapping} weeks name it in their Butir CP cell (${covering} in cpCodes, ${overlapping} marked *)`,
            ),
          );
        }
        // Coverage rests on cpCodes only: an item named only through Python overlaps is not covered.
        if (row.coverage !== "tidak-dicakup" && covering === 0) {
          findings.push(
            error(
              "cp-mapping.json",
              `${at}.coverage`,
              `${row.cpCode} is "${row.coverage}" but no week counts towards it (cpCodes); Python overlaps (*) and pengayaan never count as coverage`,
            ),
          );
        }
        if (overlapping > 0 && !row.coverageText.includes("melampaui rumusan CP")) {
          findings.push(
            error(
              "cp-mapping.json",
              `${at}.coverageText`,
              `${row.cpCode} is named by ${overlapping} Python-marked (*) weeks, so its Cakupan must say they go beyond the CP wording ("melampaui rumusan CP")`,
            ),
          );
        }
      }
    });

    mapping.enrichment.forEach((entry, index) => {
      const at = `enrichment[${index}]`;
      entry.semesters.forEach((code, i) => {
        if (structureSemesters !== undefined && !structureSemesters.has(code)) {
          findings.push(
            error(
              "cp-mapping.json",
              `${at}.semesters[${i}]`,
              `semester "${code}" is not in structure.json`,
            ),
          );
        }
      });
      entry.weeks.forEach((code, i) => {
        const week = weekById?.get(code);
        if (weekById !== undefined && week === undefined) {
          findings.push(
            error(
              "cp-mapping.json",
              `${at}.weeks[${i}]`,
              `week "${code}" does not exist in weeks.json`,
            ),
          );
        } else if (week !== undefined && entry.kind === "kodifikasi-biner") {
          if (week.cpCodes.length > 0 || !week.enrichment) {
            findings.push(
              error(
                "cp-mapping.json",
                `${at}.weeks[${i}]`,
                `binary-coding week "${code}" must be pure enrichment (cell "pengayaan", no counted CP item)`,
              ),
            );
          }
        }
      });
      if (entry.kind === "klub" && (entry.semesters.length > 0 || entry.weeks.length > 0)) {
        findings.push(
          error(
            "cp-mapping.json",
            at,
            "the club is outside the 168 core JP and has no semesters or weeks",
          ),
        );
      }
    });

    const textEntries = mapping.enrichment.filter((entry) => entry.kind === "pemrograman-teks");
    if (textEntries.length !== 1) {
      findings.push(
        error(
          "cp-mapping.json",
          "enrichment",
          `exactly one enrichment entry must be of kind pemrograman-teks, found ${textEntries.length}`,
        ),
      );
    } else if (structure !== undefined && textEntries[0] !== undefined) {
      const from = smpSemesterIndex(structure.textLanguage.fromSemester);
      const expected = structure.semesters
        .map((s) => s.code)
        .filter((code) => smpSemesterIndex(code) >= from)
        .sort();
      const actual = [...textEntries[0].semesters].sort();
      if (expected.join(",") !== actual.join(",")) {
        findings.push(
          error(
            "cp-mapping.json",
            "enrichment",
            `the pemrograman-teks entry must cover every semester from ${structure.textLanguage.fromSemester} (structure.json): expected [${expected.join(", ")}], found [${actual.join(", ")}]`,
          ),
        );
      }
    }
  }

  if (uncovered !== undefined) {
    const mappingByCode = new Map(mapping?.mappings.map((row) => [row.cpCode, row]));
    uncovered.items.forEach((item, index) => {
      const at = `items[${index}]`;
      if (cpCodes !== undefined && !cpCodes.has(item.cpCode)) {
        findings.push(
          error(
            "uncovered.json",
            `${at}.cpCode`,
            `CP item "${item.cpCode}" does not exist in cp-elements.json`,
          ),
        );
      }
      if (weeks !== undefined && coveredCount(item.cpCode) > 0) {
        findings.push(
          error(
            "uncovered.json",
            `${at}.cpCode`,
            `CP item "${item.cpCode}" is listed as uncovered but ${coveredCount(item.cpCode)} weeks cover it`,
          ),
        );
      }
      const row = mappingByCode.get(item.cpCode);
      if (mapping !== undefined && row === undefined) {
        findings.push(
          error("uncovered.json", `${at}.cpCode`, `CP item "${item.cpCode}" has no mapping row`),
        );
      } else if (row !== undefined) {
        if (row.coverage !== "tidak-dicakup") {
          findings.push(
            error(
              "uncovered.json",
              `${at}.cpCode`,
              `CP item "${item.cpCode}" is uncovered here but its mapping row says ${row.coverage}`,
            ),
          );
        }
        if (row.coverageText !== item.coverageText) {
          findings.push(
            error(
              "uncovered.json",
              `${at}.coverageText`,
              `must equal the mapping row's coverageText ("${row.coverageText}")`,
            ),
          );
        }
      }
      const noDevice = item.coverageText.includes("tanpa perangkat KA");
      if (noDevice !== (item.reason === "tanpa-perangkat-ka")) {
        findings.push(
          error(
            "uncovered.json",
            `${at}.reason`,
            `reason "${item.reason}" disagrees with coverageText ("${item.coverageText}")`,
          ),
        );
      }
    });
    // The reverse: every item no week covers (and every mapping row marked tidak-dicakup) must be listed.
    const listed = new Set(uncovered.items.map((item) => item.cpCode));
    if (cpCodes !== undefined && weeks !== undefined) {
      for (const code of cpCodes) {
        if (coveredCount(code) === 0 && !listed.has(code)) {
          findings.push(
            error(
              "uncovered.json",
              "items",
              `CP item "${code}" is covered by no week but is not listed as uncovered (gaps must be explicit)`,
            ),
          );
        }
      }
    }
    for (const row of mapping?.mappings ?? []) {
      if (row.coverage === "tidak-dicakup" && !listed.has(row.cpCode)) {
        findings.push(
          error(
            "uncovered.json",
            "items",
            `CP item "${row.cpCode}" is tidak-dicakup in cp-mapping.json but not listed here`,
          ),
        );
      }
    }
  }

  if (club !== undefined && structure !== undefined) {
    const classes = new Set(structure.classPhases.map((entry) => entry.kelas));
    club.stages.forEach((stage, index) => {
      if (!classes.has(stage.kelas)) {
        findings.push(
          error(
            "club.json",
            `stages[${index}].kelas`,
            `kelas ${stage.kelas} is not in structure.json`,
          ),
        );
      }
    });
  }

  if (bridge !== undefined) {
    bridge.toSma.forEach((row, index) => {
      const at = `toSma[${index}]`;
      row.smpWeeks.forEach((code, i) => {
        if (weekById !== undefined && !weekById.has(code)) {
          findings.push(
            error(
              "bridge.json",
              `${at}.smpWeeks[${i}]`,
              `week "${code}" does not exist in weeks.json`,
            ),
          );
        }
      });
      row.cpCodes.forEach((code, i) => {
        if (cpCodes !== undefined && !cpCodes.has(code)) {
          findings.push(
            error(
              "bridge.json",
              `${at}.cpCodes[${i}]`,
              `CP item "${code}" does not exist in cp-elements.json`,
            ),
          );
        } else if (weeks !== undefined && coveredCount(code) === 0) {
          findings.push(
            error(
              "bridge.json",
              `${at}.cpCodes[${i}]`,
              `CP item "${code}" is named as a foundation for sma-coding but no week covers it`,
            ),
          );
        }
      });
    });
  }

  return findings;
}

/**
 * Audits `source` -- the `data/smp-coding/` corpus as file name -> entry.
 * The programme references no other programme's corpus (the bridges to
 * `sma-coding` and OSN are string references), so nothing else is injected.
 */
export function auditSmpCorpus(source: CorpusSource): AuditResult {
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
