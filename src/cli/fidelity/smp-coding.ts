/**
 * Fidelity check for the `smp-coding` corpus: parses the Markdown tables
 * and quotations of the owner-approved syllabus
 * (`docs/programs/smp-coding/silabus.md`, bagian 1.2-1.4, 2, 3 (weekly plan
 * and club 3.4), 4 (CP mapping and enrichment) and 5 (bridges)) and compares
 * the result cell by cell with `data/smp-coding/*.json`, so any drift between
 * the approved document and the data fails hard.
 *
 * Distinct from `osn validate` (schema, structural and referential checks of
 * the data on its own): validate cannot tell whether a cell still says what
 * the document says. Run with `bun run check:fidelity --program smp-coding`
 * (programme table `src/cli/program-registry.ts`, ADR-0008). The Markdown
 * helpers are local on purpose: a programme does not import another
 * programme's fidelity module.
 */

import { join } from "node:path";
import {
  parseSmpCpCell,
  parseSmpMappingWeeks,
  smpSemesterIndex,
} from "../../domain/smp-week-codes";
import { SMP_CP_ELEMENT_NAMES, type SmpCpElementId } from "../../schema/smp-common";
import { SMP_CLOSURE_BY_REASON } from "../../schema/smp-uncovered";
import type { FidelityModule, FidelityProblem } from "./types";

export type { FidelityProblem } from "./types";

const REPO_ROOT = join(import.meta.dir, "..", "..", "..");
export const SMP_SOURCE_PATH = join(REPO_ROOT, "docs", "programs", "smp-coding", "silabus.md");
export const SMP_DATA_DIR = join(REPO_ROOT, "data", "smp-coding");
export const SMP_DATA_FILES = [
  "cp-elements.json",
  "structure.json",
  "weeks.json",
  "cp-mapping.json",
  "uncovered.json",
  "club.json",
  "bridge.json",
] as const;

export type SmpDataFileName = (typeof SMP_DATA_FILES)[number];
type Json = null | boolean | number | string | Json[] | { [key: string]: Json };

const TAG = "check-smp-coding-fidelity";

// --- Markdown parsing ----------------------------------------------------------

/**
 * Splits one table row into trimmed cells. A `|` ends a cell unless it is
 * written `\|` or sits inside a backtick code span.
 */
export function splitTableRow(line: string): string[] {
  let body = line.trim();
  if (body.startsWith("|")) {
    body = body.slice(1);
  }
  if (body.endsWith("|") && !body.endsWith("\\|")) {
    body = body.slice(0, -1);
  }
  const cells: string[] = [];
  let current = "";
  let inCode = false;
  for (let index = 0; index < body.length; index += 1) {
    const char = body[index];
    if (char === "\\" && body[index + 1] === "|") {
      current += "|";
      index += 1;
    } else if (char === "`") {
      inCode = !inCode;
      current += char;
    } else if (char === "|" && !inCode) {
      cells.push(current.trim());
      current = "";
    } else {
      current += char;
    }
  }
  cells.push(current.trim());
  return cells;
}

/** The lines of the section whose heading line starts with `headingPrefix`, up to the next heading of the same or a higher level. */
export function sectionLines(markdown: string, headingPrefix: string): string[] {
  const lines = markdown.split("\n");
  const start = lines.findIndex((line) => line.startsWith(headingPrefix));
  if (start === -1) {
    throw new Error(`${TAG}: heading ${JSON.stringify(headingPrefix)} not found.`);
  }
  const level = (lines[start] ?? "").match(/^#+/)?.[0].length ?? 1;
  const result: string[] = [];
  for (const line of lines.slice(start + 1)) {
    const hashes = line.match(/^(#+) /)?.[1];
    if (hashes !== undefined && hashes.length <= level) {
      break;
    }
    result.push(line);
  }
  return result;
}

/** The data rows (header and separator dropped) of the first table in `lines`, as cell arrays. */
export function firstTableRows(lines: readonly string[]): string[][] {
  const start = lines.findIndex((line) => line.trim().startsWith("|"));
  if (start === -1) {
    throw new Error(`${TAG}: no table found in section.`);
  }
  const rows: string[][] = [];
  for (const line of lines.slice(start + 2)) {
    if (!line.trim().startsWith("|")) {
      break;
    }
    rows.push(splitTableRow(line));
  }
  return rows;
}

/** The first paragraph (consecutive non-blank lines) of `lines`, joined by a space. */
export function firstParagraph(lines: readonly string[]): string {
  const start = lines.findIndex((line) => line.trim() !== "");
  if (start === -1) {
    throw new Error(`${TAG}: no paragraph found in section.`);
  }
  const paragraph: string[] = [];
  for (const line of lines.slice(start)) {
    if (line.trim() === "") {
      break;
    }
    paragraph.push(line.trim());
  }
  return paragraph.join(" ");
}

function cell(row: readonly string[], index: number, context: string): string {
  const value = row[index];
  if (value === undefined || value === "") {
    throw new Error(`${TAG}: ${context}: cell ${index} is missing.`);
  }
  return value;
}

function expectCells(row: readonly string[], count: number, context: string): void {
  if (row.length !== count) {
    throw new Error(
      `${TAG}: ${context}: expected ${count} cells, found ${row.length}: ${JSON.stringify(row)}`,
    );
  }
}

function match(pattern: RegExp, text: string, context: string): RegExpExecArray {
  const result = pattern.exec(text);
  if (result === null) {
    throw new Error(`${TAG}: ${context}: ${JSON.stringify(text)} does not match ${pattern}.`);
  }
  return result;
}

function group(result: RegExpExecArray, index: number): string {
  const value = result[index];
  if (value === undefined) {
    throw new Error(`${TAG}: missing capture group ${index}.`);
  }
  return value;
}

/** The semester codes from `from` to `to` inclusive, in teaching order (`SMP8-2` .. `SMP9-2`). */
function semesterRange(from: string, to: string): string[] {
  const codes: string[] = [];
  for (let kelas = 7; kelas <= 9; kelas += 1) {
    for (const half of [1, 2]) {
      const code = `SMP${kelas}-${half}`;
      if (
        smpSemesterIndex(code) >= smpSemesterIndex(from) &&
        smpSemesterIndex(code) <= smpSemesterIndex(to)
      ) {
        codes.push(code);
      }
    }
  }
  return codes;
}

// --- Expected corpus, derived from the Markdown ----------------------------------

const ELEMENT_ID_BY_NAME = new Map(
  (Object.entries(SMP_CP_ELEMENT_NAMES) as Array<[SmpCpElementId, string]>).map(([id, name]) => [
    name,
    id,
  ]),
);

const STRUCTURE_ROW_IDS: Record<string, string> = {
  "Kelas dan fase": "kelas-fase",
  "Status mata pelajaran": "status-mapel",
  Semester: "semester",
  "Alokasi JP": "alokasi-jp",
  "Lama 1 JP": "lama-jp",
  "Minggu per semester": "minggu-per-semester",
  "Pola tiap semester": "pola-semester",
  Total: "total",
  Jalur: "jalur",
  "Bahasa teks": "bahasa-teks",
};

const ENRICHMENT_KINDS = { a: "pemrograman-teks", b: "kodifikasi-biner", c: "klub" } as const;

/** The backtick-quoted tokens of `text`, in order. */
function ticks(text: string): string[] {
  return [...text.matchAll(/`([^`]+)`/g)].map((found) => group(found, 1));
}

/** Builds, from the syllabus Markdown alone, the content every `data/smp-coding/*.json` file must have. */
export function expectedCorpus(markdown: string): Record<SmpDataFileName, Json> {
  const version = group(match(/^- \*\*Version:\*\* v(.+)$/m, markdown, "Version line"), 1);
  const date = group(
    match(/^- \*\*Last updated:\*\* (\d{4}-\d{2}-\d{2})$/m, markdown, "Last updated line"),
    1,
  );
  match(
    /^- \*\*Status:\*\* DISETUJUI pemilik program, \d{4}-\d{2}-\d{2}/m,
    markdown,
    "Status line (the syllabus must be approved)",
  );
  const provenance = (sourceSection: string) => ({
    syllabusVersion: version,
    syllabusDate: date,
    sourceSection,
  });

  // bagian 1.2 and 1.3 -- CP quotations
  const quotes: Json[] = [];
  for (const [heading, family] of [
    ["### 1.2 ", "informatika"],
    ["### 1.3 ", "kka"],
  ] as const) {
    let current: { [key: string]: Json; text: string } | undefined;
    for (const line of sectionLines(markdown, heading)) {
      const title = /^\*(\d+\.\d+) (.+)\*$/.exec(line.trim());
      if (title !== null) {
        const elementTitle = group(title, 2);
        const elementId = ELEMENT_ID_BY_NAME.get(elementTitle);
        if (elementId === undefined) {
          throw new Error(`${TAG}: unknown CP element ${JSON.stringify(elementTitle)}.`);
        }
        current = { family, elementId, elementTitle, guideNumber: group(title, 1), text: "" };
        quotes.push(current);
      } else if (line.startsWith(">") && current !== undefined) {
        const piece = line.slice(1).trim();
        current.text = current.text === "" ? piece : `${current.text} ${piece}`;
      }
    }
  }

  // bagian 1.4 -- CP item codes
  const items: Json[] = [];
  for (const line of sectionLines(markdown, "### 1.4 ")) {
    const code = /^\| ((?:D|DK)-[A-Z]{2}-[a-z]) \|/.exec(line);
    if (code === null) {
      continue;
    }
    const row = splitTableRow(line);
    const id = group(code, 1);
    expectCells(row, 2, `bagian 1.4 ${id}`);
    items.push({
      code: id,
      family: id.startsWith("DK-") ? "kka" : "informatika",
      elementId: id.split("-")[1] ?? "",
      label: cell(row, 1, `bagian 1.4 ${id}`),
    });
  }

  // bagian 2 -- structure
  const structureRows = firstTableRows(sectionLines(markdown, "## 2. ")).map((row) => {
    expectCells(row, 3, "bagian 2 row");
    const item = cell(row, 0, "bagian 2 item");
    const id = STRUCTURE_ROW_IDS[item];
    if (id === undefined) {
      throw new Error(`${TAG}: unknown bagian 2 row ${JSON.stringify(item)}.`);
    }
    return {
      id,
      item,
      value: cell(row, 1, `bagian 2 ${id}`),
      status: cell(row, 2, `bagian 2 ${id}`),
    };
  });
  const rowValue = (id: string): string => {
    const found = structureRows.find((row) => row.id === id);
    if (found === undefined) {
      throw new Error(`${TAG}: bagian 2 has no row "${id}".`);
    }
    return found.value;
  };
  const classPhase = match(
    /^Kelas (\d(?:, \d)*) SMP\/MTs = Fase (D)$/,
    rowValue("kelas-fase"),
    "kelas-fase",
  );
  const classPhases = group(classPhase, 1)
    .split(", ")
    .map((kelas) => ({ kelas, phase: group(classPhase, 2) }));
  const semesterRow = match(
    /\(`(SMP\d-\d)` sampai `(SMP\d-\d)`\)/,
    rowValue("semester"),
    "semester",
  );
  const semesters = semesterRange(group(semesterRow, 1), group(semesterRow, 2)).map((code) => ({
    code,
    kelas: code.slice(3, 4),
    phase: group(classPhase, 2),
  }));
  const weeksRow = match(
    /(\d+) minggu materi \+ (\d+) minggu cadangan/,
    rowValue("minggu-per-semester"),
    "minggu-per-semester",
  );
  const loadRow = match(/\*\*(\d+) JP per minggu\*\*/, rowValue("alokasi-jp"), "alokasi-jp");
  const minutesRow = match(/^(\d+) menit/, rowValue("lama-jp"), "lama-jp");
  const patternRow = match(
    /^Minggu (\d+)-(\d+) materi; minggu (\d+) proyek mini; minggu (\d+) asesmen/,
    rowValue("pola-semester"),
    "pola-semester",
  );
  const totalRow = match(
    /^(\d+) semester x (\d+) minggu = (\d+) minggu x (\d+) JP = (\d+) JP materi$/,
    rowValue("total"),
    "total",
  );
  const languageRow = match(
    /^(\w+), mulai semester `(SMP\d-\d)`;/,
    rowValue("bahasa-teks"),
    "bahasa-teks",
  );

  // bagian 3 -- weekly plan
  const semesterInfos: Json[] = [];
  const weeks: Json[] = [];
  for (const line of sectionLines(markdown, "## 3. ")) {
    const title = /^\*\*`(SMP(\d)-\d)`: (.+)\*\*$/.exec(line.trim());
    if (title !== null) {
      semesterInfos.push({ code: group(title, 1), kelas: group(title, 2), title: group(title, 3) });
      continue;
    }
    const weekMatch = /^\| (SMP(\d)-(\d)-M(\d+)) \|/.exec(line);
    if (weekMatch !== null) {
      const id = group(weekMatch, 1);
      const row = splitTableRow(line);
      expectCells(row, 5, id);
      const cpText = cell(row, 4, id);
      weeks.push({
        id,
        kelas: group(weekMatch, 2),
        semester: `SMP${group(weekMatch, 2)}-${group(weekMatch, 3)}`,
        week: Number(group(weekMatch, 4)),
        topic: cell(row, 1, id),
        tool: cell(row, 2, id),
        output: cell(row, 3, id),
        cpText,
        ...parseSmpCpCell(cpText),
      });
    }
  }

  // bagian 3.4 -- club (outside the CP)
  const clubLines = sectionLines(markdown, "### 3.4 ");
  const clubPreface = firstParagraph(clubLines);
  if (!clubPreface.includes("tidak dihitung sebagai pemenuhan butir CP")) {
    throw new Error(`${TAG}: bagian 3.4 no longer says the club is not counted as CP coverage.`);
  }
  const clubStages: Json[] = firstTableRows(clubLines).map((row) => {
    expectCells(row, 4, "bagian 3.4 row");
    const stage = cell(row, 0, "bagian 3.4 tahap");
    return {
      kelas: group(match(/^Kelas (\d)$/, stage, "bagian 3.4 tahap"), 1),
      stage,
      content: cell(row, 1, `bagian 3.4 ${stage}`),
      tool: cell(row, 2, `bagian 3.4 ${stage}`),
      note: cell(row, 3, `bagian 3.4 ${stage}`),
    };
  });

  // bagian 4 -- CP mapping, uncovered items and enrichment outside the CP
  const mappingLines = sectionLines(markdown, "## 4. ");
  const mappings: Json[] = [];
  const uncoveredItems: Json[] = [];
  for (const row of firstTableRows(mappingLines)) {
    expectCells(row, 3, "bagian 4 row");
    const cpCode = cell(row, 0, "bagian 4 cp");
    const weeksText = cell(row, 1, cpCode);
    const coverageText = cell(row, 2, cpCode);
    const level = coverageText.startsWith("Penuh")
      ? "penuh"
      : coverageText.startsWith("Sebagian")
        ? "sebagian"
        : /^(?:\*\*)?Tidak dicakup/.test(coverageText)
          ? "tidak-dicakup"
          : undefined;
    if (level === undefined) {
      throw new Error(
        `${TAG}: bagian 4 ${cpCode}: unknown coverage ${JSON.stringify(coverageText)}.`,
      );
    }
    const parsedWeeks = parseSmpMappingWeeks(weeksText);
    mappings.push({
      cpCode,
      weeksText,
      weeks: parsedWeeks.weeks,
      otherWeeks: parsedWeeks.otherWeeks,
      coverageText,
      coverage: level,
    });
    if (level === "tidak-dicakup") {
      const reason = coverageText.includes("tanpa perangkat KA")
        ? "tanpa-perangkat-ka"
        : "luar-silabus";
      uncoveredItems.push({ cpCode, coverageText, reason, closure: SMP_CLOSURE_BY_REASON[reason] });
    }
  }
  // The closure of an uncovered item is the owner's decision Q10 / Q11 (bagian 10); it must still be recorded there.
  const decisions = firstTableRows(sectionLines(markdown, "## 10. "));
  const decisionOf = (id: string): string => {
    const found = decisions.find((row) => row[0] === id);
    if (found === undefined) {
      throw new Error(`${TAG}: bagian 10 has no decision row ${id}.`);
    }
    return cell(found, 2, `bagian 10 ${id}`);
  };
  if (!decisionOf("Q10").includes("modul pendamping")) {
    throw new Error(`${TAG}: bagian 10 Q10 no longer decides on a modul pendamping.`);
  }
  if (!decisionOf("Q11").includes("didemonstrasikan guru")) {
    throw new Error(`${TAG}: bagian 10 Q11 no longer decides on a teacher demonstration.`);
  }

  const enrichmentParagraph = (() => {
    const start = mappingLines.findIndex((line) =>
      line.startsWith("**Pengayaan di luar rumusan CP:**"),
    );
    if (start === -1) {
      throw new Error(`${TAG}: bagian 4 has no "Pengayaan di luar rumusan CP" paragraph.`);
    }
    return firstParagraph(mappingLines.slice(start));
  })();
  const enrichmentMatch = match(
    /^\*\*Pengayaan di luar rumusan CP:\*\* \(a\) (.+?); \(b\) (.+?); \(c\) (.+?)\. Ini sebabnya/,
    enrichmentParagraph,
    "bagian 4 pengayaan",
  );
  const enrichment: Json[] = (["a", "b", "c"] as const).map((id, index) => {
    const text = group(enrichmentMatch, index + 1);
    const tokens = ticks(text);
    const semesterTokens = tokens.filter((token) => /^SMP\d-\d$/.test(token));
    const weekList: string[] = [];
    let prefix = "";
    for (const token of tokens) {
      if (/^SMP\d-\d-M\d+$/.test(token)) {
        prefix = token.slice(0, token.lastIndexOf("-M"));
        weekList.push(token);
      } else if (/^M\d+$/.test(token) && prefix !== "") {
        weekList.push(`${prefix}-${token}`);
      }
    }
    const first = semesterTokens[0];
    const last = semesterTokens[semesterTokens.length - 1];
    return {
      id,
      kind: ENRICHMENT_KINDS[id],
      text,
      semesters: first !== undefined && last !== undefined ? semesterRange(first, last) : [],
      weeks: weekList,
    };
  });

  // bagian 5 -- bridges
  const bridgeRows: Json[] = firstTableRows(sectionLines(markdown, "### 5.2 ")).map((row) => {
    expectCells(row, 3, "bagian 5.2 row");
    const from = cell(row, 0, "bagian 5.2 dari");
    const to = cell(row, 1, `bagian 5.2 ${from}`);
    const fromTokens = ticks(from);
    const cpCodes: string[] = [];
    let cpPrefix = "";
    for (const token of fromTokens) {
      if (/^(?:D|DK)-[A-Z]{2}-[a-z]$/.test(token)) {
        cpPrefix = token.slice(0, -1);
        cpCodes.push(token);
      } else if (/^[a-z]$/.test(token) && cpPrefix !== "") {
        cpCodes.push(`${cpPrefix}${token}`);
      }
    }
    const smaTracks: string[] = [];
    for (const found of to.matchAll(/[Jj]alur ([A-E](?:, [A-E])*)/g)) {
      for (const letter of group(found, 1).split(", ")) {
        if (!smaTracks.includes(letter)) {
          smaTracks.push(letter);
        }
      }
    }
    return {
      from,
      to,
      note: cell(row, 2, `bagian 5.2 ${from}`),
      smpWeeks: fromTokens.filter((token) => /^SMP\d-\d-M\d+$/.test(token)),
      cpCodes,
      smaTracks,
    };
  });

  return {
    "cp-elements.json": { ...provenance("bagian 1"), quotes, items },
    "structure.json": {
      ...provenance("bagian 2"),
      rows: structureRows,
      classPhases,
      semesters,
      weeksPerSemester: {
        teaching: Number(group(weeksRow, 1)),
        reserve: Number(group(weeksRow, 2)),
      },
      load: { jpPerWeek: Number(group(loadRow, 1)), minutesPerJp: Number(group(minutesRow, 1)) },
      semesterPattern: {
        materiFromWeek: Number(group(patternRow, 1)),
        materiToWeek: Number(group(patternRow, 2)),
        miniProjectWeek: Number(group(patternRow, 3)),
        assessmentWeek: Number(group(patternRow, 4)),
      },
      totals: {
        semesters: Number(group(totalRow, 1)),
        weeks: Number(group(totalRow, 3)),
        jp: Number(group(totalRow, 5)),
      },
      textLanguage: {
        name: group(languageRow, 1),
        fromSemester: group(languageRow, 2),
        outsideCp: rowValue("bahasa-teks").includes("melampaui rumusan CP"),
      },
    },
    "weeks.json": { ...provenance("bagian 3"), semesters: semesterInfos, weeks },
    "cp-mapping.json": { ...provenance("bagian 4"), mappings, enrichment },
    "uncovered.json": { ...provenance("bagian 4"), items: uncoveredItems },
    "club.json": {
      ...provenance("bagian 3.4"),
      preface: clubPreface,
      countsAsCpCoverage: false,
      stages: clubStages,
    },
    "bridge.json": {
      ...provenance("bagian 5"),
      fromSd: { text: firstParagraph(sectionLines(markdown, "### 5.1 ")) },
      toSma: bridgeRows,
      toOsn: { text: firstParagraph(sectionLines(markdown, "### 5.3 ")) },
    },
  };
}

// --- Comparison -----------------------------------------------------------------

function show(value: unknown): string {
  return value === undefined ? "(missing)" : JSON.stringify(value);
}

function recordLabel(value: unknown, index: number): string {
  if (typeof value === "object" && value !== null && !Array.isArray(value)) {
    const record = value as Record<string, unknown>;
    const key = record.id ?? record.cpCode ?? record.code ?? record.kelas ?? record.from;
    if (typeof key === "string") {
      return `[${key}]`;
    }
  }
  return `[${index}]`;
}

function diff(path: string, expected: unknown, actual: unknown, problems: FidelityProblem[]): void {
  if (Array.isArray(expected) && Array.isArray(actual)) {
    if (expected.length !== actual.length) {
      problems.push({
        context: `${path} length`,
        expected: String(expected.length),
        actual: String(actual.length),
      });
    }
    const shared = Math.min(expected.length, actual.length);
    for (let index = 0; index < shared; index += 1) {
      diff(
        `${path}${recordLabel(expected[index], index)}`,
        expected[index],
        actual[index],
        problems,
      );
    }
    return;
  }
  if (
    typeof expected === "object" &&
    expected !== null &&
    !Array.isArray(expected) &&
    typeof actual === "object" &&
    actual !== null &&
    !Array.isArray(actual)
  ) {
    const expectedRecord = expected as Record<string, unknown>;
    const actualRecord = actual as Record<string, unknown>;
    for (const key of new Set([...Object.keys(expectedRecord), ...Object.keys(actualRecord)])) {
      diff(`${path}.${key}`, expectedRecord[key], actualRecord[key], problems);
    }
    return;
  }
  if (expected !== actual) {
    problems.push({ context: path, expected: show(expected), actual: show(actual) });
  }
}

/** Registry fields that must also agree with the document. */
export interface SmpRegistryEntry {
  readonly syllabusVersion: string;
  readonly syllabusDate: string;
}

/**
 * Compares every corpus file in `actual` (file name -> parsed JSON) with the
 * content derived from `markdown`, and the registry entry's version and date
 * with the document's. Returns every mismatch found, not just the first.
 */
export function checkSmpFidelity(
  markdown: string,
  actual: Readonly<Record<string, unknown>>,
  registry?: SmpRegistryEntry,
): FidelityProblem[] {
  const expected = expectedCorpus(markdown);
  const problems: FidelityProblem[] = [];
  for (const file of SMP_DATA_FILES) {
    if (!(file in actual)) {
      problems.push({ context: file, expected: "(file present)", actual: "(file missing)" });
      continue;
    }
    diff(file, expected[file], actual[file], problems);
  }
  if (registry !== undefined) {
    const provenance = expected["cp-elements.json"] as {
      syllabusVersion: string;
      syllabusDate: string;
    };
    diff(
      "programs.json[smp-coding].syllabusVersion",
      provenance.syllabusVersion,
      registry.syllabusVersion,
      problems,
    );
    diff(
      "programs.json[smp-coding].syllabusDate",
      provenance.syllabusDate,
      registry.syllabusDate,
      problems,
    );
  }
  return problems;
}

export function formatFidelityProblems(problems: readonly FidelityProblem[]): string {
  if (problems.length === 0) {
    return `${TAG}: OK -- every cell of data/smp-coding/*.json matches docs/programs/smp-coding/silabus.md.`;
  }
  const lines = problems.map(
    (problem, index) =>
      `  ${index + 1}. ${problem.context}\n     expected: ${problem.expected}\n     actual:   ${problem.actual}`,
  );
  return [`${TAG}: FAILED -- ${problems.length} mismatch(es) found:`, ...lines].join("\n");
}

/**
 * Reads the document, the corpus files and the registry entry under
 * `repoRoot` and runs {@link checkSmpFidelity}; the module the programme
 * table registers for `smp-coding`.
 */
export const smpCodingFidelity: FidelityModule = {
  async run(repoRoot: string = REPO_ROOT) {
    const markdown = await Bun.file(
      join(repoRoot, "docs", "programs", "smp-coding", "silabus.md"),
    ).text();
    const actual: Record<string, unknown> = {};
    for (const file of SMP_DATA_FILES) {
      const handle = Bun.file(join(repoRoot, "data", "smp-coding", file));
      if (await handle.exists()) {
        actual[file] = JSON.parse(await handle.text());
      }
    }
    const registry = JSON.parse(await Bun.file(join(repoRoot, "data", "programs.json")).text()) as {
      programs: Array<SmpRegistryEntry & { id: string }>;
    };
    const entry = registry.programs.find((program) => program.id === "smp-coding");
    const problems = checkSmpFidelity(markdown, actual, entry);
    if (entry === undefined) {
      problems.push({
        context: "programs.json",
        expected: '"smp-coding" entry',
        actual: "(missing)",
      });
    }
    return { problems, message: formatFidelityProblems(problems) };
  },
};
