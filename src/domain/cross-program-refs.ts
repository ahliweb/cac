/**
 * Cross-programme code check (ADR-0010, issue #177): the bridge tables of
 * one programme name week, course and module codes of its neighbours
 * (`SMP7-1-M3`, `KUL-I-101`, `DW-PRO-M6`, `A-X1-M9`, ...). Those codes live
 * in prose cells, so a wrong one is invisible to the schemas; three such
 * errors were found only by reading week codes one by one. This module
 * scans the string values of selected data files for codes of any
 * programme and reports every code that does not exist in the corpus of the
 * programme it belongs to.
 *
 * Pure: it takes the parsed JSON and the code sets as arguments and reads
 * nothing. The code sets are loaded by the CLI layer
 * (`src/cli/program-loader.ts`); a programme whose set is unavailable is
 * skipped, since that programme's own audit reports its broken corpus.
 */

import type { CorpusFinding } from "./corpus-audit";

/** The programmes whose codes the check understands, and the notation of each. */
export const CROSS_PROGRAM_CODE_KINDS = [
  { program: "tk-coding", label: "week", pattern: "TK-[AB][12]-M\\d+" },
  { program: "sd-coding", label: "week", pattern: "SD[1-6]-[12]-M\\d+" },
  { program: "smp-coding", label: "week", pattern: "SMP[789]-[12]-M\\d+" },
  {
    program: "sma-coding",
    label: "week",
    pattern: "(?:FND-X1|[A-E]-(?:X|XI|XII)[12])-M\\d+",
  },
  { program: "kuliah-coding", label: "course", pattern: "KUL-[UIK]-\\d{3}(?!\\d|-[A-Z])" },
  { program: "dewasa-coding", label: "module", pattern: "DW-(?:FND|PKJ|PRO|PRS|BIS)-M\\d+" },
] as const;

export type CrossProgramId = (typeof CROSS_PROGRAM_CODE_KINDS)[number]["program"];

/** The codes of each programme, by programme id; an absent entry means "not loaded". */
export type CrossProgramCodes = Partial<Record<CrossProgramId, ReadonlySet<string>>>;

/** One code found in a text, with the programme it belongs to. */
export interface FoundCode {
  readonly program: CrossProgramId;
  readonly code: string;
}

/**
 * Every code of any programme named in `text`, in order of appearance. A
 * range written `<code>..M<n>` (e.g. `FND-X1-M1..M7`) also yields the code
 * at its end, so the end of a range is checked too.
 */
export function extractProgramCodes(text: string): FoundCode[] {
  const found: Array<FoundCode & { readonly index: number }> = [];
  for (const kind of CROSS_PROGRAM_CODE_KINDS) {
    const pattern = new RegExp(`(?<![A-Za-z0-9])(${kind.pattern})(?:\\.\\.M(\\d+))?`, "g");
    for (const match of text.matchAll(pattern)) {
      const code = match[1] as string;
      found.push({ program: kind.program, code, index: match.index ?? 0 });
      const rangeEnd = match[2];
      if (rangeEnd !== undefined) {
        found.push({
          program: kind.program,
          code: code.replace(/M\d+$/, `M${rangeEnd}`),
          index: (match.index ?? 0) + 1,
        });
      }
    }
  }
  return found.sort((a, b) => a.index - b.index).map(({ program, code }) => ({ program, code }));
}

function walk(value: unknown, path: string, visit: (text: string, path: string) => void): void {
  if (typeof value === "string") {
    visit(value, path);
  } else if (Array.isArray(value)) {
    value.forEach((item, index) => {
      walk(item, `${path}[${index}]`, visit);
    });
  } else if (typeof value === "object" && value !== null) {
    for (const [key, item] of Object.entries(value)) {
      walk(item, path === "" ? key : `${path}.${key}`, visit);
    }
  }
}

/**
 * Findings for every code named in a string value of `data` (the parsed
 * content of `file`) that is missing from its programme's code set in
 * `codes`. A code is reported once per string value.
 */
export function crossProgramCodeFindings(
  file: string,
  data: unknown,
  codes: CrossProgramCodes,
): CorpusFinding[] {
  const findings: CorpusFinding[] = [];
  walk(data, "", (text, path) => {
    const reported = new Set<string>();
    for (const { program, code } of extractProgramCodes(text)) {
      const known = codes[program];
      if (known === undefined || known.has(code) || reported.has(code)) {
        continue;
      }
      reported.add(code);
      const kind = CROSS_PROGRAM_CODE_KINDS.find((entry) => entry.program === program);
      findings.push({
        file,
        path: path === "" ? "(root)" : path,
        severity: "error",
        message:
          `"${code}" is not a ${kind?.label ?? "code"} of programme "${program}" ` +
          `(data/${program}/); cross-programme codes must exist in the corpus they belong to (ADR-0010)`,
      });
    }
  });
  return findings;
}
