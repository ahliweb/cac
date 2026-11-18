/**
 * Fidelity check for the `tk-coding` corpus: parses the Markdown tables,
 * lists and quotations of the owner-approved syllabus
 * (`docs/programs/tk-coding/silabus.md`, bagian 1.2, 2, 3.1 to 3.6, 4, 5 and
 * 9) and compares the result cell by cell with `data/tk-coding/*.json`, so
 * any drift between the approved document and the data fails hard.
 *
 * Distinct from `bun run validate` (schema, structural and referential
 * checks of the data on its own): validate cannot tell whether a cell still
 * says what the document says. Run with
 * `bun run check:fidelity --program tk-coding` (the programme table,
 * `src/cli/program-registry.ts`, registers {@link tkCodingFidelity}).
 *
 * Besides the data, the check guards that the document keeps saying the CP
 * mapping is an interpreted overlap and not fulfilment, and that the CP
 * quotations of bagian 4.1 equal the ones of bagian 1.2.
 *
 * The check returns every mismatch (not just the first).
 */

import { join } from "node:path";
import type { FidelityModule, FidelityProblem } from "./types";

export type { FidelityProblem } from "./types";

const REPO_ROOT = join(import.meta.dir, "..", "..", "..");
export const TK_SOURCE_PATH = join(REPO_ROOT, "docs", "programs", "tk-coding", "silabus.md");
export const TK_DATA_DIR = join(REPO_ROOT, "data", "tk-coding");
export const TK_DATA_FILES = [
  "goals.json",
  "structure.json",
  "weeks.json",
  "cp-elements.json",
  "cp-mapping.json",
  "bridge.json",
  "decisions.json",
] as const;

export type TkDataFileName = (typeof TK_DATA_FILES)[number];
type Json = null | boolean | number | string | Json[] | { [key: string]: Json };

const PREFIX = "check-tk-coding-fidelity";

function fail(message: string): never {
  throw new Error(`${PREFIX}: ${message}`);
}

// --- Markdown parsing ----------------------------------------------------------

/** Splits one table row into trimmed cells; `\|` is a literal pipe, a `|` inside a backtick span does not split. */
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
    fail(`heading ${JSON.stringify(headingPrefix)} not found.`);
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
    fail("no table found in section.");
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

function expectCells(row: readonly string[], count: number, context: string): void {
  if (row.length !== count || row.some((value) => value === "")) {
    fail(
      `${context}: expected ${count} non-empty cells, found ${row.length}: ${JSON.stringify(row)}`,
    );
  }
}

function cell(row: readonly string[], index: number): string {
  return row[index] ?? "";
}

function match(pattern: RegExp, text: string, context: string): RegExpExecArray {
  const result = pattern.exec(text);
  if (result === null) {
    fail(`${context}: ${JSON.stringify(text)} does not match ${pattern}.`);
  }
  return result;
}

function group(result: RegExpExecArray, index: number): string {
  const value = result[index];
  if (value === undefined) {
    fail(`missing capture group ${index}.`);
  }
  return value;
}

/** The text of the paragraph(s) of `lines` before the first table, with lines joined by one space. */
function leadingParagraph(lines: readonly string[]): string {
  const text: string[] = [];
  for (const line of lines) {
    if (line.trim().startsWith("|")) {
      break;
    }
    if (line.trim() !== "") {
      text.push(line.trim());
    }
  }
  return text.join(" ");
}

/** A quotation cell `"..."` without its surrounding straight quotes. */
function unquote(text: string, context: string): string {
  return group(match(/^"(.*)"$/, text, context), 1);
}

const CP_CODE_PATTERN = /FF-(?:DL|JD)-[a-z]/g;
const WEEK_CODE_PATTERN = /TK-[AB][12]-M\d+/g;

function unique(values: readonly string[]): string[] {
  return [...new Set(values)];
}

// --- Expected corpus, derived from the Markdown ----------------------------------

const STRUCTURE_ROW_IDS: Record<string, string> = {
  Kelompok: "kelompok",
  "Tahun ajaran": "tahun-ajaran",
  "Minggu per semester": "minggu-per-semester",
  "Sesi inti": "sesi-inti",
  "Integrasi harian": "integrasi-harian",
  "Waktu layar program": "waktu-layar",
  "Kelompok anak": "kelompok-anak",
};

const WEEK_SECTIONS = [
  { heading: "### 3.3 ", semester: "A1" },
  { heading: "### 3.4 ", semester: "A2" },
  { heading: "### 3.5 ", semester: "B1" },
  { heading: "### 3.6 ", semester: "B2" },
] as const;

/** The CP item code letters of the element-3 bullets (a..e), in the order bagian 1.2 lists them. */
const DL_LETTERS = ["a", "b", "c", "d", "e"] as const;

interface QuoteLists {
  readonly dl: string[];
  readonly jd: string[];
  readonly scope: Array<{ subject: string; text: string }>;
}

/** The quotations of bagian 1.2: element 3 bullets, element 2 bullets and the scope notes. */
function quotesOfSection12(markdown: string): QuoteLists {
  const dl: string[] = [];
  const jd: string[] = [];
  const scope: Array<{ subject: string; text: string }> = [];
  let state: "none" | "dl" | "jd" | "scope" = "none";
  for (const line of sectionLines(markdown, "### 1.2 ")) {
    if (line.startsWith("**3. ")) {
      state = "dl";
    } else if (line.startsWith("Dari elemen 2")) {
      state = "jd";
    } else if (line.startsWith("Penjelasan lingkup")) {
      state = "scope";
    } else if (line.startsWith("- ")) {
      if (state === "dl") {
        dl.push(unquote(line.slice(2).trim(), "bagian 1.2 element 3 bullet"));
      } else if (state === "jd") {
        jd.push(unquote(line.slice(2).trim(), "bagian 1.2 element 2 bullet"));
      } else if (state === "scope") {
        const found = match(/^- ([A-Za-z]+): (".*")$/, line.trim(), "bagian 1.2 scope bullet");
        scope.push({
          subject: group(found, 1),
          text: unquote(group(found, 2), "bagian 1.2 scope bullet"),
        });
      }
    }
  }
  return { dl, jd, scope };
}

/** Builds, from the syllabus Markdown alone, the content every `data/tk-coding/*.json` file must have. */
export function expectedCorpus(markdown: string): Record<TkDataFileName, Json> {
  const version = group(match(/^- \*\*Version:\*\* v(.+)$/m, markdown, "Version line"), 1);
  const date = group(
    match(/^- \*\*Last updated:\*\* (\d{4}-\d{2}-\d{2})$/m, markdown, "Last updated line"),
    1,
  );
  const provenance = (sourceSection: string) => ({
    syllabusVersion: version,
    syllabusDate: date,
    sourceSection,
  });

  // bagian 1.2 and 4.1 -- CP items and scope notes
  const quotes = quotesOfSection12(markdown);
  const items: Json[] = firstTableRows(sectionLines(markdown, "### 4.1 ")).map((row, index) => {
    expectCells(row, 2, `bagian 4.1 row ${index + 1}`);
    const code = cell(row, 0);
    match(/^FF-(DL|JD)-[a-z]$/, code, `bagian 4.1 row ${index + 1} code`);
    return {
      code,
      elementId: code.slice(3, 5),
      text: unquote(cell(row, 1), `bagian 4.1 ${code}`),
    };
  });

  // bagian 4.2 and 4.3 -- the concept mapping
  const mappingLines = sectionLines(markdown, "### 4.2 ");
  const concepts: Json[] = firstTableRows(mappingLines).map((row, index) => {
    expectCells(row, 3, `bagian 4.2 row ${index + 1}`);
    const matchText = cell(row, 2);
    return {
      concept: cell(row, 0),
      cpText: cell(row, 1),
      cpCodes: unique(cell(row, 1).match(CP_CODE_PATTERN) ?? []),
      matchText,
      matchLevel: group(match(/^(\w+)/, matchText, `bagian 4.2 row ${index + 1}`), 1).toLowerCase(),
    };
  });

  // bagian 3.1 -- time structure; 3.2 -- session pattern
  const structureLines = sectionLines(markdown, "### 3.1 ");
  const structureRows = firstTableRows(structureLines).map((row, index) => {
    expectCells(row, 3, `bagian 3.1 row ${index + 1}`);
    const id = STRUCTURE_ROW_IDS[cell(row, 0)];
    if (id === undefined) {
      fail(`bagian 3.1: unknown row "${cell(row, 0)}".`);
    }
    return { id, item: cell(row, 0), value: cell(row, 1), status: cell(row, 2) };
  });
  const rowValue = (id: string): string => {
    const row = structureRows.find((entry) => entry.id === id);
    if (row === undefined) {
      fail(`bagian 3.1: row "${id}" missing.`);
    }
    return row.value;
  };
  const ages = match(
    /TK A \(usia sekitar (\d+)-(\d+) tahun\) dan TK B \(usia sekitar (\d+)-(\d+) tahun\)/,
    rowValue("kelompok"),
    "bagian 3.1 Kelompok",
  );
  const minutes = match(
    /TK A (\d+) menit, TK B (\d+) menit/,
    rowValue("sesi-inti"),
    "bagian 3.1 Sesi inti",
  );
  const weeksRow = match(
    /^(\d+) minggu materi \(M1-M(\d+) tema, M(\d+) permainan besar, M(\d+) refleksi\)/,
    rowValue("minggu-per-semester"),
    "bagian 3.1 Minggu per semester",
  );
  const integration = match(
    /^Opsional (\d+)-(\d+) menit/,
    rowValue("integrasi-harian"),
    "bagian 3.1 Integrasi harian",
  );
  const screenRow = rowValue("waktu-layar");
  const total = match(
    /^Total: (\d+) semester x (\d+) minggu = (\d+) minggu/m,
    structureLines.join("\n"),
    "bagian 3.1 Total line",
  );
  const sessionPattern: Json[] = [];
  for (const line of sectionLines(markdown, "### 3.2 ")) {
    const step = /^(\d+)\. \*\*(.+?) \((.+?)\):\*\* (.+)$/.exec(line.trim());
    if (step !== null) {
      sessionPattern.push({
        order: Number(group(step, 1)),
        name: group(step, 2),
        minutesText: group(step, 3),
        description: group(step, 4),
      });
    }
  }

  // bagian 3.3 to 3.6 -- the weekly plan
  const weeks: Json[] = [];
  for (const { heading, semester } of WEEK_SECTIONS) {
    const lines = sectionLines(markdown, heading);
    const headingCode = group(
      match(/\(`TK-([AB][12])`\)/, headingLine(markdown, heading), heading),
      1,
    );
    if (headingCode !== semester) {
      fail(`${heading}: heading names ${headingCode}, expected ${semester}.`);
    }
    for (const row of firstTableRows(lines)) {
      expectCells(row, 6, `${heading} row ${cell(row, 0)}`);
      const id = cell(row, 0);
      const parsed = match(/^TK-([AB][12])-M(\d+)$/, id, `${heading} week code`);
      weeks.push({
        id,
        group: group(parsed, 1).slice(0, 1),
        semester: group(parsed, 1),
        week: Number(group(parsed, 2)),
        theme: cell(row, 1),
        objective: cell(row, 2),
        activity: cell(row, 3),
        observation: cell(row, 4),
        cp: cell(row, 5)
          .split(",")
          .map((code) => code.trim()),
      });
    }
  }

  // bagian 5 -- bridge to SD
  const bridgeLines = sectionLines(markdown, "## 5. ");
  const bullet = (prefix: string): string => {
    const line = bridgeLines.find((entry) => entry.startsWith(`- ${prefix}`));
    if (line === undefined) {
      fail(`bagian 5: bullet starting with ${JSON.stringify(prefix)} not found.`);
    }
    return line.slice(2).trim();
  };
  const bridgeRows: Json[] = firstTableRows(bridgeLines).map((row, index) => {
    expectCells(row, 3, `bagian 5 row ${index + 1}`);
    return {
      order: index + 1,
      output: cell(row, 0),
      outputWeeks: cell(row, 0).match(WEEK_CODE_PATTERN) ?? [],
      prerequisite: cell(row, 1),
      note: cell(row, 2),
    };
  });

  // bagian 2 -- principles and goals
  const principles: Json[] = [];
  for (const line of sectionLines(markdown, "### 2.1 ")) {
    const found = /^(\d+)\. \*\*(.+?)\*\* (.+)$/.exec(line.trim());
    if (found !== null) {
      principles.push({
        order: Number(group(found, 1)),
        title: group(found, 2),
        text: group(found, 3),
      });
    }
  }
  const goalLines = sectionLines(markdown, "### 2.2 ");
  const goals: Json[] = [];
  for (const line of goalLines) {
    const found = /^(\d+)\. (.+)$/.exec(line.trim());
    if (found !== null) {
      goals.push({ order: Number(group(found, 1)), text: group(found, 2) });
    }
  }
  const goalsIntro = goalLines.find((line) => line.startsWith("Pada akhir TK B"));
  const cpRelationNote = goalLines.find((line) => line.startsWith("Seluruh tujuan adalah irisan"));
  if (goalsIntro === undefined || cpRelationNote === undefined) {
    fail("bagian 2.2: the goals intro line or the CP relation sentence was not found.");
  }

  // bagian 9 -- owner decisions
  const decisionLines = sectionLines(markdown, "## 9. ");
  const decidedOn = group(
    match(
      /Pemilik memutuskan pada (\d{4}-\d{2}-\d{2})/,
      decisionLines.join(" "),
      "bagian 9 decision date",
    ),
    1,
  );
  const decisions: Json[] = firstTableRows(decisionLines).map((row, index) => {
    expectCells(row, 4, `bagian 9 row ${index + 1}`);
    return {
      id: cell(row, 0),
      question: cell(row, 1),
      decision: cell(row, 2),
      consequence: cell(row, 3),
    };
  });

  return {
    "goals.json": {
      ...provenance("bagian 2"),
      principles,
      goalsIntro,
      goals,
      cpRelationNote: cpRelationNote.trim(),
    },
    "structure.json": {
      ...provenance("bagian 3.1"),
      rows: structureRows,
      groups: [
        {
          id: "A",
          ageFrom: Number(group(ages, 1)),
          ageTo: Number(group(ages, 2)),
          sessionMinutes: Number(group(minutes, 1)),
        },
        {
          id: "B",
          ageFrom: Number(group(ages, 3)),
          ageTo: Number(group(ages, 4)),
          sessionMinutes: Number(group(minutes, 2)),
        },
      ],
      semesters:
        rowValue("tahun-ajaran")
          .match(/`([AB][12])`/g)
          ?.map((code) => code.slice(1, -1)) ?? [],
      weeksPerSemester: {
        teaching: Number(group(weeksRow, 1)),
        themeWeeksTo: Number(group(weeksRow, 2)),
        bigGameWeek: Number(group(weeksRow, 3)),
        reflectionWeek: Number(group(weeksRow, 4)),
      },
      totalWeeks: Number(group(total, 3)),
      sessionsPerWeek: Number(
        group(match(/^(\d+) sesi per minggu/, rowValue("sesi-inti"), "bagian 3.1 Sesi inti"), 1),
      ),
      dailyIntegrationMinutes: {
        min: Number(group(integration, 1)),
        max: Number(group(integration, 2)),
      },
      screen: {
        defaultMinutes: Number(
          group(match(/Bawaan (\d+) menit\./, screenRow, "bagian 3.1 Waktu layar"), 1),
        ),
        optionalWeeks: screenRow.match(WEEK_CODE_PATTERN) ?? [],
        maxOptionalMinutes: Number(
          group(
            match(/paling lama (\d+) menit per minggu/, screenRow, "bagian 3.1 Waktu layar"),
            1,
          ),
        ),
      },
      sessionPattern,
    },
    "weeks.json": {
      ...provenance("bagian 3.3"),
      cpRelation: "irisan-penafsiran",
      meetsCp: false,
      weeks,
    },
    "cp-elements.json": {
      ...provenance("bagian 4.1"),
      items,
      scope: quotes.scope.map((note) => ({ subject: note.subject, text: note.text })),
    },
    "cp-mapping.json": {
      ...provenance("bagian 4.2"),
      cpRelation: "irisan-penafsiran",
      meetsCp: false,
      interpretationNote: leadingParagraph(mappingLines),
      concepts,
      untouchedNote: leadingParagraph(sectionLines(markdown, "### 4.3 ")),
    },
    "bridge.json": {
      ...provenance("bagian 5"),
      policy: bullet("**Kebijakan.**"),
      sdProgram: bullet("**Program `sd-coding`.**"),
      rows: bridgeRows,
    },
    "decisions.json": { ...provenance("bagian 9"), decidedOn, decisions },
  };
}

function headingLine(markdown: string, headingPrefix: string): string {
  return markdown.split("\n").find((line) => line.startsWith(headingPrefix)) ?? "";
}

/**
 * Guards on the document itself (not the data): the CP quotations of bagian
 * 4.1 equal those of bagian 1.2, and the document keeps saying the CP mapping
 * is the author's interpretation and not fulfilment of the CP.
 */
export function documentProblems(markdown: string): FidelityProblem[] {
  const problems: FidelityProblem[] = [];
  const quotes = quotesOfSection12(markdown);
  const items = firstTableRows(sectionLines(markdown, "### 4.1 "));
  const jdTexts: string[] = [];
  for (const row of items) {
    const code = cell(row, 0);
    const text = unquote(cell(row, 1), `bagian 4.1 ${code}`);
    if (code.startsWith("FF-DL-")) {
      const index = DL_LETTERS.indexOf(code.slice(-1) as (typeof DL_LETTERS)[number]);
      const source = quotes.dl[index];
      if (source !== text) {
        problems.push({
          context: `silabus.md bagian 4.1 ${code} vs bagian 1.2`,
          expected: String(source),
          actual: text,
        });
      }
    } else {
      jdTexts.push(text);
    }
  }
  jdTexts.forEach((text, index) => {
    if (quotes.jd[index] !== text) {
      problems.push({
        context: `silabus.md bagian 4.1 Jati Diri item ${index + 1} vs bagian 1.2`,
        expected: String(quotes.jd[index]),
        actual: text,
      });
    }
  });
  for (const phrase of ["bukan pemenuhan CP", "penafsiran penyusun"]) {
    if (!markdown.includes(phrase)) {
      problems.push({
        context: "silabus.md CP relation statement",
        expected: `the document states "${phrase}"`,
        actual: "(missing)",
      });
    }
  }
  return problems;
}

// --- Comparison -----------------------------------------------------------------

function show(value: unknown): string {
  return value === undefined ? "(missing)" : JSON.stringify(value);
}

function recordLabel(value: unknown, index: number): string {
  if (typeof value === "object" && value !== null && !Array.isArray(value)) {
    const record = value as Record<string, unknown>;
    const key = record.id ?? record.code ?? record.subject ?? record.concept ?? record.order;
    if (typeof key === "string") {
      return `[${key}]`;
    }
    if (typeof key === "number") {
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
export interface TkRegistryEntry {
  readonly syllabusVersion: string;
  readonly syllabusDate: string;
}

/**
 * Compares every corpus file in `actual` (file name -> parsed JSON) with the
 * content derived from `markdown`, and the registry entry's version and date
 * with the document's. Returns every mismatch found, not just the first.
 */
export function checkTkFidelity(
  markdown: string,
  actual: Readonly<Record<string, unknown>>,
  registry?: TkRegistryEntry,
): FidelityProblem[] {
  const expected = expectedCorpus(markdown);
  const problems: FidelityProblem[] = documentProblems(markdown);
  for (const file of TK_DATA_FILES) {
    if (!(file in actual)) {
      problems.push({ context: file, expected: "(file present)", actual: "(file missing)" });
      continue;
    }
    diff(file, expected[file], actual[file], problems);
  }
  if (registry !== undefined) {
    const provenance = expected["weeks.json"] as { syllabusVersion: string; syllabusDate: string };
    diff(
      "programs.json[tk-coding].syllabusVersion",
      provenance.syllabusVersion,
      registry.syllabusVersion,
      problems,
    );
    diff(
      "programs.json[tk-coding].syllabusDate",
      provenance.syllabusDate,
      registry.syllabusDate,
      problems,
    );
  }
  return problems;
}

export function formatFidelityProblems(problems: readonly FidelityProblem[]): string {
  if (problems.length === 0) {
    return "check-tk-coding-fidelity: OK -- every cell of data/tk-coding/*.json matches docs/programs/tk-coding/silabus.md.";
  }
  const lines = problems.map(
    (problem, index) =>
      `  ${index + 1}. ${problem.context}\n     expected: ${problem.expected}\n     actual:   ${problem.actual}`,
  );
  return [`${PREFIX}: FAILED -- ${problems.length} mismatch(es) found:`, ...lines].join("\n");
}

/**
 * Reads the document, the corpus files and the registry entry under
 * `repoRoot` and runs {@link checkTkFidelity}; the module the programme
 * table registers for `tk-coding`.
 */
export const tkCodingFidelity: FidelityModule = {
  async run(repoRoot: string = REPO_ROOT) {
    const markdown = await Bun.file(
      join(repoRoot, "docs", "programs", "tk-coding", "silabus.md"),
    ).text();
    const actual: Record<string, unknown> = {};
    for (const file of TK_DATA_FILES) {
      const handle = Bun.file(join(repoRoot, "data", "tk-coding", file));
      if (await handle.exists()) {
        actual[file] = JSON.parse(await handle.text());
      }
    }
    const registry = JSON.parse(await Bun.file(join(repoRoot, "data", "programs.json")).text()) as {
      programs: Array<TkRegistryEntry & { id: string }>;
    };
    const entry = registry.programs.find((program) => program.id === "tk-coding");
    const problems = checkTkFidelity(markdown, actual, entry);
    if (entry === undefined) {
      problems.push({
        context: "programs.json",
        expected: '"tk-coding" entry',
        actual: "(missing)",
      });
    }
    return { problems, message: formatFidelityProblems(problems) };
  },
};
