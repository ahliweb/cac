/**
 * Whole-corpus audit of the `tk-coding` programme (`data/tk-coding/`), the
 * counterpart of `auditSmaCorpus` for the TK/PAUD syllabus (ADR-0006,
 * ADR-0008). Like it, this is a pure function of an injected
 * {@link CorpusSource}: every problem is reported in one pass, nothing is
 * thrown for ordinary bad data, and nothing reads a filesystem (the loader
 * lives in `src/cli/`).
 *
 * Checks: schema conformance of every registered file plus the reverse
 * "unregistered file" check (this programme has no `modules.json`, so one
 * is reported too); fixed structural invariants (record counts, exactly
 * the four semesters of twelve weeks, structure/week consistency); and
 * referential integrity (CP codes used by weeks and the concept mapping,
 * the bridge's and the screen option's week codes). It also guards the
 * honesty of the CP link: the notes must keep saying the mapping is an
 * interpreted overlap and not fulfilment (the schema pins the literal
 * markers `cpRelation` and `meetsCp`).
 */

import type { z } from "zod";
import { tkBridgeFileSchema } from "../schema/tk-bridge";
import { TK_GROUPS, TK_SEMESTERS, TK_WEEKS_PER_SEMESTER } from "../schema/tk-common";
import { tkCpElementsFileSchema } from "../schema/tk-cp-elements";
import { tkCpMappingFileSchema } from "../schema/tk-cp-mapping";
import { tkDecisionsFileSchema } from "../schema/tk-decisions";
import { tkGoalsFileSchema } from "../schema/tk-goals";
import { TK_STRUCTURE_ROW_IDS, tkStructureFileSchema } from "../schema/tk-structure";
import { tkWeeksFileSchema } from "../schema/tk-weeks";
import type { AuditResult, CorpusFinding, CorpusSource } from "./corpus-audit";

interface TkFileEntry {
  readonly file: string;
  readonly schema: z.ZodTypeAny;
}

/** The file -> schema registry of the `tk-coding` corpus. */
export const TK_DATA_FILE_REGISTRY: readonly TkFileEntry[] = [
  { file: "goals.json", schema: tkGoalsFileSchema },
  { file: "structure.json", schema: tkStructureFileSchema },
  { file: "weeks.json", schema: tkWeeksFileSchema },
  { file: "cp-elements.json", schema: tkCpElementsFileSchema },
  { file: "cp-mapping.json", schema: tkCpMappingFileSchema },
  { file: "bridge.json", schema: tkBridgeFileSchema },
  { file: "decisions.json", schema: tkDecisionsFileSchema },
];

/**
 * The fixed counts the approved v1.0 syllabus has: 4 semesters x 12 weeks
 * = 48 weeks (bagian 3.1), 7 CP items and 3 scope notes (bagian 4.1, 1.2),
 * 9 concept rows (4.2), 5 bridge rows (5), 8 principles and 7 goals (2),
 * 7 structure rows and 4 session steps (3.1, 3.2) and 9 owner decisions (9).
 */
export const TK_EXPECTED_COUNTS = {
  cpItems: 7,
  cpScopeNotes: 3,
  concepts: 9,
  weeks: TK_SEMESTERS.length * TK_WEEKS_PER_SEMESTER,
  bridgeRows: 5,
  principles: 8,
  goals: 7,
  structureRows: TK_STRUCTURE_ROW_IDS.length,
  sessionSteps: 4,
  decisions: 9,
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

  for (const entry of TK_DATA_FILE_REGISTRY) {
    const found = source.get(entry.file);
    if (found === undefined) {
      filesMissing += 1;
      findings.push(
        error(
          entry.file,
          "(file)",
          `required data file is missing from the corpus (expected at data/tk-coding/${entry.file})`,
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

  const registered = new Set(TK_DATA_FILE_REGISTRY.map((entry) => entry.file));
  let filesUnregistered = 0;
  for (const file of source.keys()) {
    if (!registered.has(file)) {
      filesUnregistered += 1;
      findings.push(
        error(
          file,
          "(file)",
          "this data file is not covered by any schema in TK_DATA_FILE_REGISTRY " +
            "(src/domain/tk-corpus-audit.ts) -- add it there so it is validated rather than silently ignored",
        ),
      );
    }
  }

  return { findings, parsed, filesValidated, filesMissing, filesUnregistered };
}

function structuralFindings(parsed: Parsed): CorpusFinding[] {
  const findings: CorpusFinding[] = [];
  const cp = typed<z.infer<typeof tkCpElementsFileSchema>>(parsed, "cp-elements.json");
  const mapping = typed<z.infer<typeof tkCpMappingFileSchema>>(parsed, "cp-mapping.json");
  const structure = typed<z.infer<typeof tkStructureFileSchema>>(parsed, "structure.json");
  const weeks = typed<z.infer<typeof tkWeeksFileSchema>>(parsed, "weeks.json");
  const bridge = typed<z.infer<typeof tkBridgeFileSchema>>(parsed, "bridge.json");
  const goals = typed<z.infer<typeof tkGoalsFileSchema>>(parsed, "goals.json");
  const decisions = typed<z.infer<typeof tkDecisionsFileSchema>>(parsed, "decisions.json");

  const count = (file: string, path: string, label: string, actual: number, expected: number) => {
    if (actual !== expected) {
      findings.push(error(file, path, `expected exactly ${expected} ${label}, found ${actual}`));
    }
  };

  if (cp !== undefined) {
    count("cp-elements.json", "items", "CP items", cp.items.length, TK_EXPECTED_COUNTS.cpItems);
    count(
      "cp-elements.json",
      "scope",
      "scope notes",
      cp.scope.length,
      TK_EXPECTED_COUNTS.cpScopeNotes,
    );
  }
  if (mapping !== undefined) {
    count(
      "cp-mapping.json",
      "concepts",
      "concept rows",
      mapping.concepts.length,
      TK_EXPECTED_COUNTS.concepts,
    );
    if (!mapping.interpretationNote.toLowerCase().includes("penafsiran")) {
      findings.push(
        error(
          "cp-mapping.json",
          "interpretationNote",
          'must keep stating that the mapping is the author\'s interpretation ("penafsiran"), not a CP fulfilment',
        ),
      );
    }
  }
  if (goals !== undefined) {
    count(
      "goals.json",
      "principles",
      "principles",
      goals.principles.length,
      TK_EXPECTED_COUNTS.principles,
    );
    count("goals.json", "goals", "goals", goals.goals.length, TK_EXPECTED_COUNTS.goals);
    if (!goals.cpRelationNote.toLowerCase().includes("bukan pemenuhan cp")) {
      findings.push(
        error(
          "goals.json",
          "cpRelationNote",
          'must keep stating that the goals are not CP fulfilment ("bukan pemenuhan CP")',
        ),
      );
    }
  }
  if (bridge !== undefined) {
    count("bridge.json", "rows", "bridge rows", bridge.rows.length, TK_EXPECTED_COUNTS.bridgeRows);
  }
  if (decisions !== undefined) {
    count(
      "decisions.json",
      "decisions",
      "owner decisions",
      decisions.decisions.length,
      TK_EXPECTED_COUNTS.decisions,
    );
    decisions.decisions.forEach((decision, index) => {
      if (decision.id !== `Q${index + 1}`) {
        findings.push(
          error(
            "decisions.json",
            `decisions[${index}].id`,
            `must be "Q${index + 1}" (questions are numbered Q1..Qn in order)`,
          ),
        );
      }
    });
  }

  if (structure !== undefined) {
    count(
      "structure.json",
      "rows",
      "structure rows",
      structure.rows.length,
      TK_EXPECTED_COUNTS.structureRows,
    );
    count(
      "structure.json",
      "sessionPattern",
      "session steps",
      structure.sessionPattern.length,
      TK_EXPECTED_COUNTS.sessionSteps,
    );
    if (structure.groups.map((group) => group.id).join() !== TK_GROUPS.join()) {
      findings.push(
        error("structure.json", "groups", `must be exactly the groups ${TK_GROUPS.join(", ")}`),
      );
    }
    if (structure.semesters.join() !== TK_SEMESTERS.join()) {
      findings.push(
        error(
          "structure.json",
          "semesters",
          `must be exactly the semesters ${TK_SEMESTERS.join(", ")} in order`,
        ),
      );
    }
    if (structure.weeksPerSemester.teaching !== TK_WEEKS_PER_SEMESTER) {
      findings.push(
        error(
          "structure.json",
          "weeksPerSemester.teaching",
          `must equal ${TK_WEEKS_PER_SEMESTER}, the number of weeks M1..M${TK_WEEKS_PER_SEMESTER} in weeks.json`,
        ),
      );
    }
    const expectedTotal = structure.semesters.length * structure.weeksPerSemester.teaching;
    if (structure.totalWeeks !== expectedTotal) {
      findings.push(
        error(
          "structure.json",
          "totalWeeks",
          `must equal semesters x weeks per semester = ${expectedTotal}, found ${structure.totalWeeks}`,
        ),
      );
    }
  }

  if (weeks !== undefined) {
    count("weeks.json", "weeks", "weeks", weeks.weeks.length, TK_EXPECTED_COUNTS.weeks);
    if (structure !== undefined && weeks.weeks.length !== structure.totalWeeks) {
      findings.push(
        error(
          "weeks.json",
          "weeks",
          `has ${weeks.weeks.length} weeks but structure.json totalWeeks is ${structure.totalWeeks}`,
        ),
      );
    }
    const bySemester = new Map<string, number[]>();
    for (const week of weeks.weeks) {
      bySemester.set(week.semester, [...(bySemester.get(week.semester) ?? []), week.week]);
    }
    for (const semester of TK_SEMESTERS) {
      const numbers = [...(bySemester.get(semester) ?? [])].sort((a, b) => a - b);
      const complete =
        numbers.length === TK_WEEKS_PER_SEMESTER && numbers.every((n, i) => n === i + 1);
      if (!complete) {
        findings.push(
          error(
            "weeks.json",
            `weeks[semester=${semester}]`,
            `must contain exactly the weeks 1..${TK_WEEKS_PER_SEMESTER} once each; found [${numbers.join(", ")}]`,
          ),
        );
      }
    }
  }

  return findings;
}

function referentialFindings(parsed: Parsed): CorpusFinding[] {
  const findings: CorpusFinding[] = [];
  const cp = typed<z.infer<typeof tkCpElementsFileSchema>>(parsed, "cp-elements.json");
  const mapping = typed<z.infer<typeof tkCpMappingFileSchema>>(parsed, "cp-mapping.json");
  const structure = typed<z.infer<typeof tkStructureFileSchema>>(parsed, "structure.json");
  const weeks = typed<z.infer<typeof tkWeeksFileSchema>>(parsed, "weeks.json");
  const bridge = typed<z.infer<typeof tkBridgeFileSchema>>(parsed, "bridge.json");

  const cpCodes = cp && new Set(cp.items.map((item) => item.code));
  const weekIds = weeks && new Set(weeks.weeks.map((week) => week.id));

  if (cpCodes !== undefined && weeks !== undefined) {
    const used = new Set<string>();
    weeks.weeks.forEach((week, index) => {
      week.cp.forEach((code, i) => {
        used.add(code);
        if (!cpCodes.has(code)) {
          findings.push(
            error(
              "weeks.json",
              `weeks[${index}].cp[${i}]`,
              `CP item "${code}" of week ${week.id} does not exist in cp-elements.json`,
            ),
          );
        }
      });
    });
    for (const code of cpCodes) {
      if (!used.has(code)) {
        findings.push(
          error(
            "cp-elements.json",
            "items",
            `CP item "${code}" is listed (bagian 4.1) but no week cites it`,
          ),
        );
      }
    }
  }

  if (cpCodes !== undefined && mapping !== undefined) {
    mapping.concepts.forEach((concept, index) => {
      concept.cpCodes.forEach((code, i) => {
        if (!cpCodes.has(code)) {
          findings.push(
            error(
              "cp-mapping.json",
              `concepts[${index}].cpCodes[${i}]`,
              `CP item "${code}" does not exist in cp-elements.json`,
            ),
          );
        }
      });
    });
  }

  if (weekIds !== undefined && structure !== undefined) {
    structure.screen.optionalWeeks.forEach((id, index) => {
      if (!weekIds.has(id)) {
        findings.push(
          error(
            "structure.json",
            `screen.optionalWeeks[${index}]`,
            `week "${id}" does not exist in weeks.json`,
          ),
        );
      }
    });
    const semesters = new Set<string>(structure.semesters);
    const groupOfSemester = (semester: string) => semester.slice(0, 1);
    weeks?.weeks.forEach((week, index) => {
      if (!semesters.has(week.semester)) {
        findings.push(
          error(
            "weeks.json",
            `weeks[${index}].semester`,
            `semester "${week.semester}" is not in structure.json semesters`,
          ),
        );
      }
      if (groupOfSemester(week.semester) !== week.group) {
        findings.push(
          error("weeks.json", `weeks[${index}].group`, `must be ${groupOfSemester(week.semester)}`),
        );
      }
    });
  }

  if (weekIds !== undefined && bridge !== undefined) {
    bridge.rows.forEach((row, index) => {
      row.outputWeeks.forEach((id, i) => {
        if (!weekIds.has(id)) {
          findings.push(
            error(
              "bridge.json",
              `rows[${index}].outputWeeks[${i}]`,
              `week "${id}" does not exist in weeks.json`,
            ),
          );
        }
      });
    });
  }

  return findings;
}

/**
 * Audits `source` -- the `data/tk-coding/` corpus as file name -> entry.
 * The programme references no other programme's corpus.
 */
export function auditTkCorpus(source: CorpusSource): AuditResult {
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
