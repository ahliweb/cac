/**
 * Pure rules over the programme registry (`data/programs.json`, ADR-0006).
 * No I/O: the registry and each corpus arrive as injected values (see
 * `src/cli/program-loader.ts` for the filesystem side).
 */

import { parseDataFile } from "../schema/common";
import { type Program, type ProgramRegistry, programRegistrySchema } from "../schema/program";
import type { AuditResult, CorpusFinding, CorpusSource } from "./corpus-audit";

/** The file name findings about the registry itself are reported under. */
export const REGISTRY_FILE_NAME = "programs.json";

/** The programme every corpus-reading command uses when `--program` is absent. */
export const DEFAULT_PROGRAM_ID = "osn";

/** Parses raw JSON as the registry; throws `CorpusValidationError` listing every issue. */
export function parseProgramRegistry(raw: unknown): ProgramRegistry {
  return parseDataFile(programRegistrySchema, raw, REGISTRY_FILE_NAME);
}

/** The registered programme with `id`, or `undefined`. */
export function findProgram(registry: ProgramRegistry, id: string): Program | undefined {
  return registry.programs.find((program) => program.id === id);
}

/** Comma-separated registered ids, for usage-error messages. */
export function listProgramIds(registry: ProgramRegistry): string {
  return registry.programs.map((program) => program.id).join(", ");
}

/**
 * Findings for every corpus file whose own `syllabusVersion`/`syllabusDate`
 * disagree with the registry entry (ADR-0005 per programme). Files that do
 * not carry the fields, or that failed to parse, are not this check's
 * concern -- schema conformance already reports them.
 */
export function registryVersionFindings(program: Program, source: CorpusSource): CorpusFinding[] {
  const findings: CorpusFinding[] = [];
  const checks = [
    ["syllabusVersion", program.syllabusVersion],
    ["syllabusDate", program.syllabusDate],
  ] as const;

  for (const [file, entry] of source) {
    if (!entry.ok || typeof entry.data !== "object" || entry.data === null) {
      continue;
    }
    const record = entry.data as Record<string, unknown>;
    for (const [field, expected] of checks) {
      if (field in record && record[field] !== expected) {
        findings.push({
          file,
          path: field,
          severity: "error",
          message:
            `is ${JSON.stringify(record[field])} but ${REGISTRY_FILE_NAME} registers ` +
            `programme "${program.id}" with ${field} ${JSON.stringify(expected)}`,
        });
      }
    }
  }

  return findings;
}

/** Returns `result` with `extra` findings merged in and the summary counts recomputed. */
export function withExtraFindings(
  result: AuditResult,
  extra: readonly CorpusFinding[],
): AuditResult {
  if (extra.length === 0) {
    return result;
  }
  const findings = [...result.findings, ...extra];
  const errorCount = findings.filter((finding) => finding.severity === "error").length;
  return {
    ok: false,
    findings,
    summary: {
      ...result.summary,
      findingCount: findings.length,
      errorCount,
      warningCount: findings.length - errorCount,
    },
  };
}
