/**
 * Fidelity check for the `kuliah-coding` corpus: parses the Markdown tables,
 * course blocks and short passages of the owner-approved syllabus
 * (`docs/programs/kuliah-coding/silabus.md`, bagian 2.2, 3.1-3.3, 4.1, 4.2,
 * 5.1, 5.2 and 6.3) and compares the result cell by cell with
 * `data/kuliah-coding/*.json`, so any drift between the approved document
 * and the data fails hard.
 *
 * Distinct from `osn validate` (schema, structural and referential checks of
 * the data on its own): validate cannot tell whether a cell still says what
 * the document says. Run with `bun run check:fidelity --program
 * kuliah-coding` (ADR-0008). Exits 0 with a summary line when every field
 * matches and 1 listing every mismatch (not just the first) otherwise.
 *
 * Derived fields (parsed numbers, extracted course and knowledge-area codes)
 * follow fixed rules documented on the schemas, so the data stays a
 * mechanical function of the document.
 */

import { join } from "node:path";
import { KUL_KNOWLEDGE_AREA_CODES } from "../../schema/kul-common";
import type { FidelityModule, FidelityProblem } from "./types";

export type { FidelityProblem } from "./types";

const REPO_ROOT = join(import.meta.dir, "..", "..", "..");
export const KUL_PROGRAM_DIR = "kuliah-coding";
export const KUL_DATA_FILES = [
  "tracks.json",
  "courses.json",
  "knowledge-areas.json",
  "cpl.json",
  "ai-policy.json",
  "bridges.json",
] as const;

export type KulDataFileName = (typeof KUL_DATA_FILES)[number];
type Json = null | boolean | number | string | Json[] | { [key: string]: Json };

const TAG = "check-kuliah-coding-fidelity";

function fail(message: string): never {
  throw new Error(`${TAG}: ${message}`);
}

// --- Markdown parsing ----------------------------------------------------------

/** Splits one table row into trimmed cells; `\|` is a literal pipe and a `|` inside a backtick span does not end a cell. */
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

/** The data rows (header and separator dropped) of the `nth` table in `lines`, as cell arrays. */
export function tableRows(lines: readonly string[], nth = 0): string[][] {
  let seen = -1;
  let index = 0;
  while (index < lines.length) {
    const line = lines[index] ?? "";
    const previous = lines[index - 1] ?? "";
    if (line.trim().startsWith("|") && !previous.trim().startsWith("|")) {
      seen += 1;
      if (seen === nth) {
        const rows: string[][] = [];
        for (const row of lines.slice(index + 2)) {
          if (!row.trim().startsWith("|")) {
            break;
          }
          rows.push(splitTableRow(row));
        }
        return rows;
      }
    }
    index += 1;
  }
  return fail(`table number ${nth + 1} not found in section.`);
}

function cells(row: readonly string[], count: number, context: string): string[] {
  if (row.length !== count) {
    fail(`${context}: expected ${count} cells, found ${row.length}: ${JSON.stringify(row)}`);
  }
  return [...row];
}

function required(value: string, context: string): string {
  if (value === "") {
    fail(`${context}: cell is empty.`);
  }
  return value;
}

function match(pattern: RegExp, text: string, context: string): RegExpExecArray {
  const result = pattern.exec(text);
  if (result === null) {
    fail(`${context}: ${JSON.stringify(text)} does not match ${pattern}.`);
  }
  return result;
}

/** Collapses whitespace runs (including line breaks) to single spaces. */
function flat(text: string): string {
  return text.replace(/\s+/g, " ").trim();
}

function dropFinalStop(text: string): string {
  return text.endsWith(".") ? text.slice(0, -1) : text;
}

function courseCodes(text: string): string[] {
  return text.match(/KUL-[UIK]-\d{3}/g) ?? [];
}

function kaCodes(text: string, context: string): string[] {
  const codes = text.replace(/\([^)]*\)/g, "").match(/\b[A-Z]{2,3}\b/g) ?? [];
  const known = new Set<string>(KUL_KNOWLEDGE_AREA_CODES);
  for (const code of codes) {
    if (!known.has(code)) {
      fail(`${context}: "${code}" is not a CS2023 knowledge area code.`);
    }
  }
  return codes;
}

// --- Per-file derivation -----------------------------------------------------------

function provenance(markdown: string, sourceSection: string) {
  return {
    syllabusVersion: match(/^- \*\*Version:\*\* v(\S+)$/m, markdown, "header Version")[1] as string,
    syllabusDate: match(
      /^- \*\*Last updated:\*\* (\d{4}-\d{2}-\d{2})$/m,
      markdown,
      "header date",
    )[1] as string,
    sourceSection,
  };
}

const TRACK_IDS = ["U", "I", "K"] as const;

function tracksFile(markdown: string): Json {
  const names: Record<string, string> = {};
  for (const line of markdown.split("\n")) {
    const heading = /^### 3\.\d Jalur ([UIK]): (.+)$/.exec(line);
    if (heading !== null) {
      names[heading[1] as string] = (heading[2] as string).trim();
    }
  }
  const rows = tableRows(sectionLines(markdown, "### 2.2 "));
  if (rows.length !== TRACK_IDS.length + 1) {
    fail(
      `bagian 2.2: expected ${TRACK_IDS.length + 1} rows (3 tracks and Jumlah), found ${rows.length}.`,
    );
  }
  const tracks = TRACK_IDS.map((id, index) => {
    const [jalur, target, courseText, sksText, rangeText] = cells(
      rows[index] ?? [],
      5,
      `bagian 2.2 jalur ${id}`,
    ) as [string, string, string, string, string];
    if (jalur !== id) {
      fail(`bagian 2.2: row ${index + 1} is jalur "${jalur}", expected "${id}".`);
    }
    const count = match(
      /^(\d+)(?: \((\d+) inti \+ (\d+) pilihan\))?$/,
      courseText,
      `bagian 2.2 jalur ${id} Mata kuliah`,
    );
    const sks = match(/^(\d+)(?: \(inti (\d+)\))?$/, sksText, `bagian 2.2 jalur ${id} SKS`);
    const range = match(
      /^(S[1-8])-(S[1-8])$/,
      rangeText,
      `bagian 2.2 jalur ${id} Rentang semester`,
    );
    return {
      id,
      name: required(names[id] ?? "", `bagian 3 heading of jalur ${id}`),
      target: required(target, `bagian 2.2 jalur ${id} Sasaran`),
      courseCountText: courseText,
      sksText,
      semesterRangeText: rangeText,
      courseCount: Number(count[1]),
      coreCourseCount: Number(count[2] ?? count[1]),
      sks: Number(sks[1]),
      coreSks: Number(sks[2] ?? sks[1]),
      firstSemester: range[1] as string,
      lastSemester: range[2] as string,
    };
  });
  const [label, , totalCourses, totalSks] = cells(rows[3] ?? [], 5, "bagian 2.2 Jumlah") as [
    string,
    string,
    string,
    string,
    string,
  ];
  if (label !== "**Jumlah**") {
    fail(`bagian 2.2: last row is "${label}", expected "**Jumlah**".`);
  }
  const sks = match(/^(\d+)(?: \(inti (\d+)\))?$/, totalSks, "bagian 2.2 Jumlah SKS");
  return {
    ...provenance(markdown, "bagian 2.2"),
    tracks,
    total: {
      courseCountText: totalCourses,
      sksText: totalSks,
      courseCount: Number(match(/^(\d+)$/, totalCourses, "bagian 2.2 Jumlah Mata kuliah")[1]),
      sks: Number(sks[1]),
      coreSks: Number(sks[2] ?? sks[1]),
    },
  };
}

interface CourseDraft {
  code: string;
  track: string;
  name: string;
  elective: boolean;
  sks: number;
  semester: string;
  prerequisitesText: string;
  kaText: string;
  cpmkText: string;
  topics: string;
  assessment: string;
}

function splitCpmk(code: string, text: string): Json[] {
  const parts = text.split(/; (?=C\d+ )/);
  return parts.map((part, index) => {
    const item = match(/^C(\d+) (.+)$/, part.trim(), `${code} CPMK`);
    if (Number(item[1]) !== index + 1) {
      fail(`${code}: CPMK number C${item[1]} out of order, expected C${index + 1}.`);
    }
    return { code: `${code}-C${index + 1}`, text: item[2] as string, origin: "karangan" };
  });
}

/** The bullets of a `**KUL-...**` block, keyed by their label, continuation lines joined. */
function courseBlocks(
  lines: readonly string[],
): Map<string, { name: string; sks: number; bullets: string[] }> {
  const blocks = new Map<string, { name: string; sks: number; bullets: string[] }>();
  let current: { name: string; sks: number; bullets: string[] } | undefined;
  for (const line of lines) {
    const heading = /^\*\*(KUL-[UIK]-\d{3}) (.+) \((\d+) SKS\)\*\*$/.exec(line);
    if (heading !== null) {
      current = { name: heading[2] as string, sks: Number(heading[3]), bullets: [] };
      blocks.set(heading[1] as string, current);
    } else if (current !== undefined) {
      if (line.startsWith("- ")) {
        current.bullets.push(line.slice(2).trim());
      } else if (line.startsWith("  ") && current.bullets.length > 0 && line.trim() !== "") {
        current.bullets[current.bullets.length - 1] += ` ${line.trim()}`;
      }
    }
  }
  return blocks;
}

function bulletsOf(
  code: string,
  block: { bullets: string[] },
): { cpmk: string; topics: string; assessment: string; ka: string } {
  const find = (pattern: RegExp, label: string): string => {
    for (const bullet of block.bullets) {
      const found = pattern.exec(bullet);
      if (found !== null) {
        return dropFinalStop(flat(found[1] as string));
      }
    }
    return fail(`${code}: bullet "${label}" not found.`);
  };
  return {
    cpmk: find(/^CPMK(?: `\[karangan\]`)?: (.+)$/, "CPMK"),
    topics: find(/^Pokok bahasan: (.+)$/, "Pokok bahasan"),
    assessment: find(/^Asesmen: (.+)$/, "Asesmen"),
    ka: find(/^KA CS2023: (.+)$/, "KA CS2023"),
  };
}

function trackCourses(markdown: string, id: string, heading: string): CourseDraft[] {
  const lines = sectionLines(markdown, heading);
  const rows = tableRows(lines);
  const blocks = courseBlocks(lines);
  const shortTable = rows.map((row) => cells(row, 5, `${heading} row`));
  return shortTable.map(([code, name, sks, semester, prerequisites]) => {
    const codeValue = required(code as string, `${heading} Kode`);
    const block = blocks.get(codeValue);
    if (block === undefined) {
      return fail(`${codeValue}: no "**${codeValue} ... (n SKS)**" block under ${heading}.`);
    }
    if (block.name !== name || block.sks !== Number(sks)) {
      fail(
        `${codeValue}: block heading "${block.name} (${block.sks} SKS)" disagrees with the table row "${name} (${sks})".`,
      );
    }
    const parts = bulletsOf(codeValue, block);
    return {
      code: codeValue,
      track: id,
      name: name as string,
      elective: false,
      sks: Number(sks),
      semester: required(semester as string, `${codeValue} Smt`),
      prerequisitesText: required(prerequisites as string, `${codeValue} Prasyarat`),
      kaText: parts.ka,
      cpmkText: parts.cpmk,
      topics: parts.topics,
      assessment: parts.assessment,
    };
  });
}

function trackICourses(markdown: string): CourseDraft[] {
  const lines = sectionLines(markdown, "### 3.2 ");
  const plan = tableRows(lines, 0).map((row) => cells(row, 6, "bagian 3.2 plan row"));
  const outcomes = tableRows(lines, 1).map((row) => cells(row, 4, "bagian 3.2 outcome row"));
  if (plan.length !== outcomes.length) {
    fail(`bagian 3.2: ${plan.length} plan rows but ${outcomes.length} outcome rows.`);
  }
  return plan.map(([code, rawName, sks, semester, prerequisites, ka], index) => {
    const codeValue = required(code as string, "bagian 3.2 Kode");
    const [outCode, cpmk, topics, assessment] = outcomes[index] as [string, string, string, string];
    if (outCode !== codeValue) {
      fail(`bagian 3.2: outcome row ${index + 1} is ${outCode}, expected ${codeValue}.`);
    }
    const elective = (rawName as string).endsWith(" (pilihan)");
    return {
      code: codeValue,
      track: "I",
      name: elective ? (rawName as string).slice(0, -" (pilihan)".length) : (rawName as string),
      elective,
      sks: Number(sks),
      semester: required(semester as string, `${codeValue} Smt`),
      prerequisitesText: required(prerequisites as string, `${codeValue} Prasyarat`),
      kaText: required(ka as string, `${codeValue} KA utama`),
      cpmkText: required(cpmk, `${codeValue} CPMK`),
      topics: required(topics, `${codeValue} Pokok bahasan`),
      assessment: required(assessment, `${codeValue} Asesmen`),
    };
  });
}

function coursesFile(markdown: string): Json {
  const drafts = [
    ...trackCourses(markdown, "U", "### 3.1 "),
    ...trackICourses(markdown),
    ...trackCourses(markdown, "K", "### 3.3 "),
  ];
  const courses = drafts.map((draft) => ({
    code: draft.code,
    track: draft.track,
    name: draft.name,
    elective: draft.elective,
    sks: draft.sks,
    semester: draft.semester,
    prerequisitesText: draft.prerequisitesText,
    prerequisites: courseCodes(draft.prerequisitesText),
    kaText: draft.kaText,
    kaCodes: kaCodes(draft.kaText, `${draft.code} KA`),
    cpmk: splitCpmk(draft.code, draft.cpmkText),
    topics: draft.topics,
    assessment: draft.assessment,
    cplProdi: [],
  }));
  return { ...provenance(markdown, "bagian 3.1"), courses };
}

function knowledgeAreasFile(markdown: string): Json {
  const lines = sectionLines(markdown, "### 4.2 ");
  const areas = tableRows(lines).map((row) => {
    const [kaCell, coursesText, supportText] = cells(row, 3, "bagian 4.2 row");
    const head = match(/^(.+) \(([A-Z]+)\)$/, kaCell as string, "bagian 4.2 KA cell");
    const links = [
      ...(coursesText as string).matchAll(/(KUL-[UIK]-\d{3}) \((utama|sebagian|pilihan)\)/g),
    ].map((found) => ({ course: found[1] as string, level: found[2] as string }));
    if (links.length !== courseCodes(coursesText as string).length) {
      fail(
        `bagian 4.2 ${head[2]}: a course in "${coursesText}" has no (utama|sebagian|pilihan) level.`,
      );
    }
    return {
      code: head[2] as string,
      name: head[1] as string,
      coursesText: coursesText as string,
      courseLinks: links,
      supportText: supportText as string,
      supportCourses: courseCodes(supportText as string),
    };
  });
  const start = lines.findIndex((line) => line.startsWith("**Celah yang diakui:**"));
  if (start === -1) {
    fail('bagian 4.2: paragraph "**Celah yang diakui:**" not found.');
  }
  const paragraph: string[] = [];
  for (const line of lines.slice(start)) {
    if (line.trim() === "") {
      break;
    }
    paragraph.push(line);
  }
  const gapsText = flat(paragraph.join(" ")).replace("**Celah yang diakui:** ", "");
  const gaps = gapsText
    .split(/\(\d\) /)
    .slice(1)
    .map((item) => (/^[^;.]*/.exec(item)?.[0] ?? "").trim());
  return { ...provenance(markdown, "bagian 4.2"), areas, gaps };
}

function cplFile(markdown: string): Json {
  const lines = sectionLines(markdown, "### 4.1 ");
  const rows = tableRows(lines);
  if (rows.length !== 1) {
    fail(`bagian 4.1: expected exactly one table row, found ${rows.length}.`);
  }
  const [codeCell, fillCell, noteCell] = cells(rows[0] ?? [], 3, "bagian 4.1 row") as [
    string,
    string,
    string,
  ];
  const text = flat(lines.filter((line) => !line.trim().startsWith("|")).join(" "));
  const groups = match(
    /kompetensi CPL \(([^)]+)\)/,
    text,
    "bagian 4.1 Pasal 7 groups",
  )[1] as string;
  const trackGroups = [...text.matchAll(/jalur ([UIK]) memperkuat ([^;.]+)/g)].map((found) => ({
    track: found[1] as string,
    groupText: (found[2] as string).trim(),
  }));
  return {
    ...provenance(markdown, "bagian 4.1"),
    codeCell,
    fillCell,
    noteCell,
    competencyGroups: groups.split("; ").map((group) => group.trim()),
    trackGroups,
  };
}

function aiPolicyFile(markdown: string): Json {
  const levels = tableRows(sectionLines(markdown, "### 6.3 ")).map((row) => {
    const [levelText, rule, usedOnText] = cells(row, 3, "bagian 6.3 row") as [
      string,
      string,
      string,
    ];
    return {
      level: levelText.toLowerCase(),
      levelText,
      rule,
      usedOnText,
      usedOnCourses: courseCodes(usedOnText),
    };
  });
  return { ...provenance(markdown, "bagian 6.3"), levels };
}

function bridgesFile(markdown: string): Json {
  const fromSma = tableRows(sectionLines(markdown, "### 5.1 ")).map((row) => {
    const [from, toText, basis] = cells(row, 3, "bagian 5.1 row") as [string, string, string];
    return { from, toText, toCourses: courseCodes(toText), basis };
  });
  const toWork = tableRows(sectionLines(markdown, "### 5.2 ")).map((row) => {
    const [to, how, note] = cells(row, 3, "bagian 5.2 row") as [string, string, string];
    return { to, how, courses: courseCodes(how), note };
  });
  return { ...provenance(markdown, "bagian 5"), fromSma, toWork };
}

/** The content every corpus file must have, derived only from the document. */
export function expectedCorpus(markdown: string): Record<KulDataFileName, Json> {
  return {
    "tracks.json": tracksFile(markdown),
    "courses.json": coursesFile(markdown),
    "knowledge-areas.json": knowledgeAreasFile(markdown),
    "cpl.json": cplFile(markdown),
    "ai-policy.json": aiPolicyFile(markdown),
    "bridges.json": bridgesFile(markdown),
  };
}

// --- Comparison ----------------------------------------------------------------------

function show(value: unknown): string {
  return value === undefined ? "(absent)" : JSON.stringify(value);
}

/** A readable label for an array element: its id-like key, else its index. */
function recordLabel(value: unknown, index: number): string {
  if (typeof value === "object" && value !== null && !Array.isArray(value)) {
    const record = value as Record<string, unknown>;
    const key = record.code ?? record.id ?? record.track ?? record.level;
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
export interface KulRegistryEntry {
  readonly syllabusVersion: string;
  readonly syllabusDate: string;
}

/**
 * Compares every corpus file in `actual` (file name -> parsed JSON) with the
 * content derived from `markdown`, and the registry entry's version and date
 * with the document's. Returns every mismatch found, not just the first.
 */
export function checkKulFidelity(
  markdown: string,
  actual: Readonly<Record<string, unknown>>,
  registry?: KulRegistryEntry,
): FidelityProblem[] {
  const expected = expectedCorpus(markdown);
  const problems: FidelityProblem[] = [];
  for (const file of KUL_DATA_FILES) {
    if (!(file in actual)) {
      problems.push({ context: file, expected: "(file present)", actual: "(file missing)" });
      continue;
    }
    diff(file, expected[file], actual[file], problems);
  }
  if (registry !== undefined) {
    const provenanceOf = expected["tracks.json"] as {
      syllabusVersion: string;
      syllabusDate: string;
    };
    diff(
      "programs.json[kuliah-coding].syllabusVersion",
      provenanceOf.syllabusVersion,
      registry.syllabusVersion,
      problems,
    );
    diff(
      "programs.json[kuliah-coding].syllabusDate",
      provenanceOf.syllabusDate,
      registry.syllabusDate,
      problems,
    );
  }
  return problems;
}

export function formatFidelityProblems(problems: readonly FidelityProblem[]): string {
  if (problems.length === 0) {
    return `${TAG}: OK -- every cell of data/kuliah-coding/*.json matches docs/programs/kuliah-coding/silabus.md.`;
  }
  const lines = problems.map(
    (problem, index) =>
      `  ${index + 1}. ${problem.context}\n     expected: ${problem.expected}\n     actual:   ${problem.actual}`,
  );
  return [`${TAG}: FAILED -- ${problems.length} mismatch(es) found:`, ...lines].join("\n");
}

/**
 * Reads the document, the corpus files and the registry entry under
 * `repoRoot` and runs {@link checkKulFidelity}; the module the programme
 * table registers for `kuliah-coding`.
 */
export const kuliahCodingFidelity: FidelityModule = {
  async run(repoRoot: string = REPO_ROOT) {
    const markdown = await Bun.file(
      join(repoRoot, "docs", "programs", KUL_PROGRAM_DIR, "silabus.md"),
    ).text();
    const actual: Record<string, unknown> = {};
    for (const file of KUL_DATA_FILES) {
      const handle = Bun.file(join(repoRoot, "data", KUL_PROGRAM_DIR, file));
      if (await handle.exists()) {
        actual[file] = JSON.parse(await handle.text());
      }
    }
    const registry = JSON.parse(await Bun.file(join(repoRoot, "data", "programs.json")).text()) as {
      programs: Array<KulRegistryEntry & { id: string }>;
    };
    const entry = registry.programs.find((program) => program.id === KUL_PROGRAM_DIR);
    const problems = checkKulFidelity(markdown, actual, entry);
    if (entry === undefined) {
      problems.push({
        context: "programs.json",
        expected: '"kuliah-coding" entry',
        actual: "(missing)",
      });
    }
    return { problems, message: formatFidelityProblems(problems) };
  },
};
