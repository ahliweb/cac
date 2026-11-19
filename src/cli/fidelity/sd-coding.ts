/**
 * Fidelity check for the `sd-coding` corpus: parses the Markdown tables
 * and quotations of the owner-approved syllabus
 * (`docs/programs/sd-coding/silabus.md`, bagian 1.3 (CP quotations from SK
 * 046/H/KR/2025), 2 (structure), 4 (CP item codes), 5 (weekly plan per
 * class), 6 (CP item to weeks), 7 and 8 (bridges)) and compares the result
 * cell by cell with `data/sd-coding/*.json`, so any drift between the
 * approved document and the data fails hard (ADR-0008).
 *
 * Distinct from `bun run validate` (schema, structural and referential
 * checks of the data on its own): validate cannot tell whether a cell still
 * says what the document says. Run it with
 * `bun run check:fidelity --program sd-coding`; the programme table
 * (`src/cli/program-registry.ts`) registers {@link sdCodingFidelity}.
 *
 * The check exits 0 with a summary line when every field matches, and 1
 * listing every mismatch (not just the first) otherwise.
 */

import { join } from "node:path";
import { expandSdWeekCodes } from "../../domain/sd-week-codes";
import { SD_CP_ELEMENT_NAMES, type SdElementId } from "../../schema/sd-common";
import type { FidelityModule, FidelityProblem } from "./types";

const REPO_ROOT = join(import.meta.dir, "..", "..", "..");
export const SD_DATA_FILES = [
  "cp-elements.json",
  "structure.json",
  "weeks.json",
  "cp-mapping.json",
  "bridges.json",
] as const;

export type SdDataFileName = (typeof SD_DATA_FILES)[number];
type Json = null | boolean | number | string | Json[] | { [key: string]: Json };

const LABEL = "check-sd-coding-fidelity";

// --- Markdown parsing ----------------------------------------------------------

/**
 * Splits one table row into trimmed cells. A `|` ends a cell unless it is
 * written `\|` (a literal pipe, unescaped here) or sits inside a backtick
 * code span.
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
    throw new Error(`${LABEL}: heading ${JSON.stringify(headingPrefix)} not found.`);
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

/** The data rows (header and separator dropped) of every table in `lines`, in order, as cell arrays. */
export function allTableRows(lines: readonly string[]): string[][][] {
  const tables: string[][][] = [];
  let current: string[][] | undefined;
  let skip = 0;
  for (const line of lines) {
    if (line.trim().startsWith("|")) {
      if (current === undefined) {
        current = [];
        tables.push(current);
        skip = 2;
      }
      if (skip > 0) {
        skip -= 1;
      } else {
        current.push(splitTableRow(line));
      }
    } else {
      current = undefined;
    }
  }
  return tables;
}

/** The data rows of the first table in `lines`. */
export function firstTableRows(lines: readonly string[]): string[][] {
  const first = allTableRows(lines)[0];
  if (first === undefined) {
    throw new Error(`${LABEL}: no table found in section.`);
  }
  return first;
}

/** Paragraphs (blank-line separated blocks) of `lines`, each joined into one whitespace-normalised string. */
export function paragraphsOf(lines: readonly string[]): string[] {
  const paragraphs: string[][] = [[]];
  for (const line of lines) {
    if (line.trim() === "") {
      paragraphs.push([]);
    } else {
      paragraphs[paragraphs.length - 1]?.push(line.trim());
    }
  }
  return paragraphs
    .filter((paragraph) => paragraph.length > 0)
    .map((paragraph) => paragraph.join(" "));
}

function cell(row: readonly string[], index: number, context: string): string {
  const value = row[index];
  if (value === undefined || value === "") {
    throw new Error(`${LABEL}: ${context}: cell ${index} is missing.`);
  }
  return value;
}

function expectCells(row: readonly string[], count: number, context: string): void {
  if (row.length !== count) {
    throw new Error(
      `${LABEL}: ${context}: expected ${count} cells, found ${row.length}: ${JSON.stringify(row)}`,
    );
  }
}

function match(pattern: RegExp, text: string, context: string): RegExpExecArray {
  const result = pattern.exec(text);
  if (result === null) {
    throw new Error(`${LABEL}: ${context}: ${JSON.stringify(text)} does not match ${pattern}.`);
  }
  return result;
}

function group(result: RegExpExecArray, index: number): string {
  const value = result[index];
  if (value === undefined) {
    throw new Error(`${LABEL}: missing capture group ${index}.`);
  }
  return value;
}

/** Splits `text` at commas that are not inside parentheses. */
function splitTopLevel(text: string): string[] {
  const parts: string[] = [];
  let depth = 0;
  let current = "";
  for (const char of text) {
    if (char === "(") {
      depth += 1;
    } else if (char === ")") {
      depth -= 1;
    }
    if (char === "," && depth === 0) {
      parts.push(current.trim());
      current = "";
    } else {
      current += char;
    }
  }
  parts.push(current.trim());
  return parts;
}

// --- Expected corpus, derived from the Markdown ----------------------------------

const ELEMENT_ID_BY_NAME = new Map(
  (Object.entries(SD_CP_ELEMENT_NAMES) as Array<[SdElementId, string]>).map(([id, name]) => [
    name,
    id,
  ]),
);

const STRUCTURE_ROW_IDS: Record<string, string> = {
  Pertemuan: "pertemuan",
  Semester: "semester",
  "Minggu materi per semester": "minggu-materi",
  "Minggu cadangan": "minggu-cadangan",
  "Pola semester": "pola-semester",
  "Beban JP kelas 5-6": "beban-jp",
  Pemilihan: "pemilihan",
  Perangkat: "perangkat",
};

const NUMBER_WORDS: Record<string, number> = { Satu: 1, Dua: 2, Tiga: 3 };

const BRIDGE_IDS: Record<string, string> = {
  "7.1": "tk-ke-kelas-1",
  "7.2": "kelas-6-ke-smp",
  "7.3": "ke-sma",
};

function classRange(from: string, to: string | undefined): number[] {
  const first = Number(from);
  const last = to === undefined ? first : Number(to);
  const result: number[] = [];
  for (let kelas = first; kelas <= last; kelas += 1) {
    result.push(kelas);
  }
  return result;
}

/** Parses the "Butir" cell of a weekly row into its four reference lists. */
function parseItemsCell(text: string, context: string) {
  const introduces: string[] = [];
  const leadsTo: string[] = [];
  const cpItems: string[] = [];
  const cpElements: string[] = [];
  for (const token of splitTopLevel(text)) {
    const intro = /^(P-(?:BK|LD|LE|PP))(?: \(menuju ([^)]+)\))?$/.exec(token);
    if (intro?.[1] !== undefined) {
      introduces.push(intro[1]);
      if (intro[2] !== undefined) {
        leadsTo.push(...intro[2].split(",").map((code) => code.trim()));
      }
    } else if (/^C-(?:BK|LD|LE|PP)-[a-z]$/.test(token)) {
      cpItems.push(token);
    } else if (/^C-(?:BK|LD|LE|PP)$/.test(token)) {
      cpElements.push(token.slice(2));
    } else {
      throw new Error(
        `${LABEL}: ${context}: cannot parse item reference ${JSON.stringify(token)}.`,
      );
    }
  }
  return { introduces, leadsTo, cpItems, cpElements };
}

/** Builds, from the syllabus Markdown alone, the content every `data/sd-coding/*.json` file must have. */
export function expectedCorpus(markdown: string): Record<SdDataFileName, Json> {
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

  // bagian 1.3 -- CP quotations
  const quotes: Json[] = [];
  for (const paragraph of paragraphsOf(sectionLines(markdown, "### 1.3 "))) {
    if (paragraph.startsWith("*")) {
      const quote = match(/^\*(\d+\.\d+) (.+?)\* — "(.*)"$/, paragraph, "CP quotation");
      const elementTitle = group(quote, 2);
      const elementId = ELEMENT_ID_BY_NAME.get(elementTitle);
      if (elementId === undefined) {
        throw new Error(`${LABEL}: unknown CP element ${JSON.stringify(elementTitle)}.`);
      }
      quotes.push({
        elementId,
        elementTitle,
        guideNumber: group(quote, 1),
        text: group(quote, 3),
      });
    }
  }

  // bagian 4 -- CP item codes
  const items: Json[] = firstTableRows(sectionLines(markdown, "## 4. ")).map((row) => {
    expectCells(row, 2, "bagian 4 row");
    const code = cell(row, 0, "bagian 4 code");
    const label = match(/^"(.*)"$/, cell(row, 1, `bagian 4 ${code}`), `bagian 4 ${code} label`);
    return { code, elementId: code.split("-")[1] ?? "", label: group(label, 1) };
  });

  // bagian 2 -- structure
  const [stageTable, rowTable] = allTableRows(sectionLines(markdown, "## 2. "));
  if (stageTable === undefined || rowTable === undefined) {
    throw new Error(`${LABEL}: bagian 2 must hold the stage table and the "Butir" table.`);
  }
  const stages = stageTable.map((row) => {
    expectCells(row, 6, "bagian 2 stage row");
    const tahap = match(/^(\d+)\. (.+)$/, cell(row, 0, "bagian 2 Tahap"), "bagian 2 Tahap");
    const stageId = Number(group(tahap, 1));
    const hours = cell(row, 4, `bagian 2 stage ${stageId} hours`);
    const jp = match(/(\d+) JP \((\d+) menit\)/, hours, `bagian 2 stage ${stageId} hours`);
    const classes = cell(row, 1, `bagian 2 stage ${stageId} kelas`)
      .split(",")
      .map((value) => Number(value.trim()));
    const status = cell(row, 2, `bagian 2 stage ${stageId} status`);
    return {
      id: stageId,
      name: group(tahap, 2),
      classes,
      status,
      role: cell(row, 3, `bagian 2 stage ${stageId} role`),
      hoursText: hours,
      delivery: cell(row, 5, `bagian 2 stage ${stageId} delivery`),
      jpPerWeek: Number(group(jp, 1)),
      minutesPerWeek: Number(group(jp, 2)),
      meetsCp: status.startsWith("Fase C"),
    };
  });
  const structureRows = rowTable.map((row) => {
    expectCells(row, 3, "bagian 2 row");
    const item = cell(row, 0, "bagian 2 item");
    const id = STRUCTURE_ROW_IDS[item];
    if (id === undefined) {
      throw new Error(`${LABEL}: unknown bagian 2 row ${JSON.stringify(item)}.`);
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
      throw new Error(`${LABEL}: bagian 2 has no row "${id}".`);
    }
    return found.value;
  };
  const semesterWord = rowValue("semester").split(" ")[0] ?? "";
  const semestersPerClass = NUMBER_WORDS[semesterWord];
  if (semestersPerClass === undefined) {
    throw new Error(
      `${LABEL}: bagian 2 semester row ${JSON.stringify(rowValue("semester"))} does not start with a number word.`,
    );
  }
  const teachingRow = match(
    /^(\d+) minggu \(M1-M(\d+)\)$/,
    rowValue("minggu-materi"),
    "bagian 2 minggu materi",
  );
  const patternRow = match(
    /^M(\d+)-M(\d+) materi dan penguatan; M(\d+) proyek mini; M(\d+) asesmen dan refleksi$/,
    rowValue("pola-semester"),
    "bagian 2 pola semester",
  );
  const weeksPerYear = rowValue("minggu-cadangan")
    .split(";")
    .map((segment) => {
      const parsed = match(
        /^kelas (\d+)(?:-(\d+))?: (?:tersedia )?(\d+) minggu(?: per tahun)?, (\d+) terpakai, (\d+) cadangan(?: \(.*\))?$/i,
        segment.trim(),
        "bagian 2 minggu cadangan",
      );
      return {
        classes: classRange(group(parsed, 1), parsed[2]),
        available: Number(group(parsed, 3)),
        used: Number(group(parsed, 4)),
        reserve: Number(group(parsed, 5)),
      };
    });
  const jpLoad = rowValue("beban-jp")
    .split(";")
    .map((segment) => {
      const parsed = match(
        /^kelas (\d+): (\d+)(?: minggu)? x (\d+)(?: JP)? = (\d+) dari (\d+) JP$/i,
        segment.trim(),
        "bagian 2 beban JP",
      );
      return {
        kelas: Number(group(parsed, 1)),
        weeks: Number(group(parsed, 2)),
        jpPerWeek: Number(group(parsed, 3)),
        used: Number(group(parsed, 4)),
        allocated: Number(group(parsed, 5)),
      };
    });

  // bagian 5 -- weekly plan, one subsection per class
  const weeks: Json[] = [];
  const headings = markdown
    .split("\n")
    .map((line) => /^### (5\.\d+) Kelas (\d) \(tahap (\d),/.exec(line))
    .filter((found): found is RegExpExecArray => found !== null);
  for (const heading of headings) {
    const kelas = Number(group(heading, 2));
    const stage = Number(group(heading, 3));
    let semester = 0;
    let inTable = false;
    let skip = 0;
    for (const line of sectionLines(markdown, `### ${group(heading, 1)} `)) {
      const marker = /^\*\*Semester (\d)/.exec(line);
      if (marker !== null) {
        semester = Number(group(marker, 1));
      }
      if (!line.trim().startsWith("|")) {
        inTable = false;
        continue;
      }
      if (!inTable) {
        inTable = true;
        skip = 2;
      }
      if (skip > 0) {
        skip -= 1;
        continue;
      }
      const row = splitTableRow(line);
      expectCells(row, 4, `bagian ${group(heading, 1)} row`);
      const id = cell(row, 0, "week code");
      const codeMatch = match(/^SD(\d)-(\d)-M(\d+)$/, id, "week code");
      if (Number(group(codeMatch, 1)) !== kelas || Number(group(codeMatch, 2)) !== semester) {
        throw new Error(`${LABEL}: ${id} sits under kelas ${kelas} semester ${semester}.`);
      }
      const topic = cell(row, 1, `${id} topic`);
      const itemsText = cell(row, 2, `${id} items`);
      const exercise = cell(row, 3, `${id} exercise`);
      weeks.push({
        id,
        kelas,
        semester,
        semesterCode: `SD${kelas}-${semester}`,
        week: Number(group(codeMatch, 3)),
        stage,
        topic,
        itemsText,
        exercise,
        ...parseItemsCell(itemsText, id),
        strengthening: topic.includes("`[penguatan]`"),
        screenOption: `${topic} ${exercise}`.includes("`[opsi layar]`"),
      });
    }
  }

  // bagian 6 -- CP item -> weeks
  const mappings: Json[] = firstTableRows(sectionLines(markdown, "## 6. ")).map((row) => {
    expectCells(row, 2, "bagian 6 row");
    const cpCode = cell(row, 0, "bagian 6 code");
    const weeksText = cell(row, 1, `bagian 6 ${cpCode}`);
    return { cpCode, weeksText, weeks: expandSdWeekCodes(weeksText) };
  });

  // bagian 7 -- bridges (verbatim paragraphs)
  const bridgeLines = sectionLines(markdown, "## 7. ");
  const firstSub = bridgeLines.findIndex((line) => line.startsWith("### "));
  const intro = paragraphsOf(bridgeLines.slice(0, firstSub)).join(" ");
  const bridges: Json[] = [];
  for (const line of bridgeLines) {
    const heading = /^### (7\.\d) (.+)$/.exec(line);
    if (heading === null) {
      continue;
    }
    const number = group(heading, 1);
    const id = BRIDGE_IDS[number];
    if (id === undefined) {
      throw new Error(`${LABEL}: unknown bridge section ${number}.`);
    }
    bridges.push({
      id,
      sourceSection: `bagian ${number}`,
      heading: group(heading, 2),
      text: paragraphsOf(sectionLines(markdown, `### ${number} `)).join(" "),
    });
  }

  // bagian 8 -- no OSN bridge for SD
  const osnLines = sectionLines(markdown, "## 8. ");
  const statement = group(
    match(/^Hasil: \*\*(.+)\*\*$/m, osnLines.join("\n"), "bagian 8 statement"),
    1,
  );
  if (!statement.startsWith("tidak ada")) {
    throw new Error(
      `${LABEL}: bagian 8 statement ${JSON.stringify(statement)} is not a "tidak ada" statement.`,
    );
  }
  const findings: string[] = [];
  const proseLines: string[] = [];
  let inList = false;
  for (const line of osnLines) {
    if (line.startsWith("- ")) {
      findings.push(line.slice(2).trim());
      inList = true;
    } else if (line.trim() === "") {
      inList = false;
      proseLines.push("");
    } else if (inList && line.startsWith(" ")) {
      findings[findings.length - 1] += ` ${line.trim()}`;
    } else if (!line.startsWith("Hasil:")) {
      proseLines.push(line);
    }
  }
  const proseParagraphs = paragraphsOf(proseLines);
  const enrichmentText = proseParagraphs.at(-1);
  if (enrichmentText === undefined) {
    throw new Error(`${LABEL}: bagian 8 has no closing paragraph.`);
  }
  const enrichmentWeeks = [...enrichmentText.matchAll(/`(SD\d-\d-M\d+)`/g)].map((found) =>
    group(found, 1),
  );

  return {
    "cp-elements.json": { ...provenance("bagian 1.3"), quotes, items },
    "structure.json": {
      ...provenance("bagian 2"),
      stages,
      rows: structureRows,
      semestersPerClass,
      weeksPerSemester: { teaching: Number(group(teachingRow, 1)) },
      semesterPattern: {
        materiFromWeek: Number(group(patternRow, 1)),
        materiToWeek: Number(group(patternRow, 2)),
        miniProjectWeek: Number(group(patternRow, 3)),
        assessmentWeek: Number(group(patternRow, 4)),
      },
      weeksPerYear,
      jpLoad,
    },
    "weeks.json": { ...provenance("bagian 5"), weeks },
    "cp-mapping.json": { ...provenance("bagian 6"), mappings },
    "bridges.json": {
      ...provenance("bagian 7"),
      intro,
      bridges,
      osn: {
        status: "tidak-ada",
        sourceSection: "bagian 8",
        statement,
        findings,
        enrichmentText,
        enrichmentWeeks,
      },
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
    const key = record.id ?? record.cpCode ?? record.code ?? record.elementId ?? record.kelas;
    if (typeof key === "string" || typeof key === "number") {
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
export interface SdRegistryEntry {
  readonly syllabusVersion: string;
  readonly syllabusDate: string;
}

/**
 * Compares every corpus file in `actual` (file name -> parsed JSON) with the
 * content derived from `markdown`, and the registry entry's version and date
 * with the document's. Returns every mismatch found, not just the first.
 */
export function checkSdFidelity(
  markdown: string,
  actual: Readonly<Record<string, unknown>>,
  registry?: SdRegistryEntry,
): FidelityProblem[] {
  const expected = expectedCorpus(markdown);
  const problems: FidelityProblem[] = [];
  for (const file of SD_DATA_FILES) {
    if (!(file in actual)) {
      problems.push({ context: file, expected: "(file present)", actual: "(file missing)" });
      continue;
    }
    diff(file, expected[file], actual[file], problems);
  }
  if (registry !== undefined) {
    const provenance = expected["weeks.json"] as { syllabusVersion: string; syllabusDate: string };
    diff(
      "programs.json[sd-coding].syllabusVersion",
      provenance.syllabusVersion,
      registry.syllabusVersion,
      problems,
    );
    diff(
      "programs.json[sd-coding].syllabusDate",
      provenance.syllabusDate,
      registry.syllabusDate,
      problems,
    );
  }
  return problems;
}

export function formatFidelityProblems(problems: readonly FidelityProblem[]): string {
  if (problems.length === 0) {
    return `${LABEL}: OK -- every cell of data/sd-coding/*.json matches docs/programs/sd-coding/silabus.md.`;
  }
  const lines = problems.map(
    (problem, index) =>
      `  ${index + 1}. ${problem.context}\n     expected: ${problem.expected}\n     actual:   ${problem.actual}`,
  );
  return [`${LABEL}: FAILED -- ${problems.length} mismatch(es) found:`, ...lines].join("\n");
}

/**
 * Reads the document, the corpus files and the registry entry under
 * `repoRoot` and runs {@link checkSdFidelity}; the module the programme
 * table registers for `sd-coding`.
 */
export const sdCodingFidelity: FidelityModule = {
  async run(repoRoot: string = REPO_ROOT) {
    const markdown = await Bun.file(
      join(repoRoot, "docs", "programs", "sd-coding", "silabus.md"),
    ).text();
    const actual: Record<string, unknown> = {};
    for (const file of SD_DATA_FILES) {
      const handle = Bun.file(join(repoRoot, "data", "sd-coding", file));
      if (await handle.exists()) {
        actual[file] = JSON.parse(await handle.text());
      }
    }
    const registry = JSON.parse(await Bun.file(join(repoRoot, "data", "programs.json")).text()) as {
      programs: Array<SdRegistryEntry & { id: string }>;
    };
    const entry = registry.programs.find((program) => program.id === "sd-coding");
    const problems = checkSdFidelity(markdown, actual, entry);
    if (entry === undefined) {
      problems.push({
        context: "programs.json",
        expected: '"sd-coding" entry',
        actual: "(missing)",
      });
    }
    return { problems, message: formatFidelityProblems(problems) };
  },
};
