/**
 * Fidelity check for the `dewasa-coding` corpus: parses the Markdown tables
 * and labelled paragraphs of the owner-approved syllabus
 * (`docs/programs/dewasa-coding/silabus.md`, bagian 1 (tracks), 2
 * (structure), 3.1 (shared module), 4-7 (modules per track), 5.2 (SKKNI
 * claims and LSP schemes), 6.1 (bridges), 8.2 (certification options)) and,
 * for the 47 SKKNI unit titles, the table of
 * `docs/programs/dewasa-coding/riset.md` bagian 2.2, and compares the result
 * cell by cell with `data/dewasa-coding/*.json`, so any drift between the
 * approved document and the data fails hard.
 *
 * Distinct from `bun run validate` (schema, structural and referential
 * checks of the data on its own): validate cannot tell whether a cell still
 * says what the document says. Run with
 * `bun run check:fidelity --program dewasa-coding`.
 *
 * Two derivations are rules, not cells, and are stated here so a change to
 * them is a deliberate edit of this module: a module's `hours` is its
 * track's "(N modul × H jam)" figure (track PRO, whose modules are unequal
 * since v1.1.0, has a "Jam" column instead), and a module's `prerequisites`
 * is the previous row of the table (the first module names the shared
 * module). A table lists modules in learning order, so a module number may
 * differ from its row position (`DW-PRO-M13` sits after `DW-PRO-M5`).
 */

import { join } from "node:path";
import { DW_SHARED_MODULE_CODE } from "../../schema/dw-common";
import type { FidelityModule, FidelityProblem } from "./types";

const REPO_ROOT = join(import.meta.dir, "..", "..", "..");
export const DW_DATA_FILES = [
  "tracks.json",
  "structure.json",
  "shared.json",
  "module-plan.json",
  "skkni-units.json",
  "certification.json",
  "bridges.json",
] as const;

export type DwDataFileName = (typeof DW_DATA_FILES)[number];

const SILABUS_PATH = ["docs", "programs", "dewasa-coding", "silabus.md"] as const;
const RISET_PATH = ["docs", "programs", "dewasa-coding", "riset.md"] as const;
const TRACK_IDS = ["PKJ", "PRO", "PRS", "BIS"] as const;
const TRACK_HEADINGS: Readonly<Record<string, string>> = {
  PKJ: "## 4. ",
  PRO: "## 5. ",
  PRS: "## 6. ",
  BIS: "## 7. ",
};
const MONTHS: Readonly<Record<string, string>> = {
  Januari: "01",
  Februari: "02",
  Maret: "03",
  April: "04",
  Mei: "05",
  Juni: "06",
  Juli: "07",
  Agustus: "08",
  September: "09",
  Oktober: "10",
  November: "11",
  Desember: "12",
};
const COUNT_WORDS: Readonly<Record<string, number>> = { delapan: 8, sembilan: 9 };
const UNIT_PREFIX = "J.620100.";

// --- Markdown parsing ----------------------------------------------------------

function fail(message: string): never {
  throw new Error(`check-dewasa-coding-fidelity: ${message}`);
}

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

function normalise(text: string): string {
  return text.replace(/\s+/g, " ").trim();
}

/** The paragraph (up to the next blank line) that starts with `prefix`, whitespace-normalised, `prefix` dropped. */
export function labelledParagraph(lines: readonly string[], prefix: string): string {
  const start = lines.findIndex((line) => line.startsWith(prefix));
  if (start === -1) {
    fail(`paragraph starting ${JSON.stringify(prefix)} not found.`);
  }
  const collected: string[] = [];
  for (const line of lines.slice(start)) {
    if (line.trim() === "") {
      break;
    }
    collected.push(line);
  }
  return normalise(collected.join(" ").slice(prefix.length));
}

/** The first paragraph (up to the first blank line after the first text line) of `lines`, whitespace-normalised. */
export function firstParagraph(lines: readonly string[]): string {
  const start = lines.findIndex((line) => line.trim() !== "");
  if (start === -1) {
    fail("section has no paragraph.");
  }
  return labelledParagraph(lines.slice(start), "");
}

function cells(row: readonly string[], count: number, context: string): readonly string[] {
  if (row.length !== count || row.some((value) => value === "")) {
    fail(`${context}: expected ${count} non-empty cells, found ${JSON.stringify(row)}.`);
  }
  return row;
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

function stripCode(text: string): string {
  return text.replace(/^`|`$/g, "");
}

function unitCode(short: string): string {
  return `${UNIT_PREFIX}${short}`;
}

// --- The corpus the documents imply ------------------------------------------------

type Json = null | boolean | number | string | Json[] | { [key: string]: Json };

interface Track {
  readonly [key: string]: Json;
  readonly id: string;
  readonly moduleCount: number;
  /** Hours of every own module; absent when the track's modules take unequal hours. */
  readonly hoursPerModule?: number;
  readonly trackHours: number;
}

function parseTracks(silabus: string): Track[] {
  const overview = firstTableRows(sectionLines(silabus, "## 1. "));
  if (overview.length !== TRACK_IDS.length) {
    fail(`bagian 1 table: expected ${TRACK_IDS.length} tracks, found ${overview.length}.`);
  }
  return overview.map((row, index) => {
    const [idCell, persona, goal, hoursCell, endOfTrack] = cells(row, 5, `bagian 1 row ${index}`);
    const id = stripCode(idCell as string);
    if (id !== TRACK_IDS[index]) {
      fail(`bagian 1 row ${index}: expected track ${TRACK_IDS[index]}, found ${id}.`);
    }
    const hours = match(/^(\d+) \+ (\d+) = (\d+)$/, hoursCell as string, `${id} hours cell`);
    const section = sectionLines(silabus, TRACK_HEADINGS[id] as string);
    const durationText = labelledParagraph(section, "**Durasi:**");
    const groups = [...durationText.matchAll(/(\d+) modul × (\d+) jam/g)].map((found) => ({
      count: Number(group(found, 1)),
      hours: Number(group(found, 2)),
    }));
    if (groups.length === 0) {
      fail(`${id} Durasi: no "N modul × H jam" term in ${JSON.stringify(durationText)}.`);
    }
    const hourSum = groups.reduce((sum, term) => sum + term.count * term.hours, 0);
    if (hourSum !== Number(group(hours, 2))) {
      fail(
        `${id} Durasi: the terms add up to ${hourSum} hours, the hours cell says ${group(hours, 2)}.`,
      );
    }
    const prerequisitesText = labelledParagraph(section, "**Prasyarat:**");
    const syntheticProject =
      id === "PRO"
        ? firstParagraph(sectionLines(silabus, "### 5.3 "))
        : labelledParagraph(section, "**Proyek berbasis data sintetis:**");
    return {
      id,
      persona: persona as string,
      goal: goal as string,
      sharedHours: Number(group(hours, 1)),
      trackHours: Number(group(hours, 2)),
      totalHours: Number(group(hours, 3)),
      moduleCount: groups.reduce((sum, term) => sum + term.count, 0),
      ...(groups.length === 1 ? { hoursPerModule: groups[0]?.hours as number } : {}),
      durationText,
      endOfTrack: endOfTrack as string,
      prerequisitesText,
      prerequisiteModules: [...prerequisitesText.matchAll(/`(DW-[A-Z]+-M\d+)`/g)].map((found) =>
        group(found, 1),
      ),
      syntheticProject,
    };
  });
}

function parseModules(silabus: string, tracks: readonly Track[]): Json[] {
  const modules: Json[] = [];
  for (const track of tracks) {
    const section =
      track.id === "PRO"
        ? sectionLines(silabus, "### 5.1 ")
        : sectionLines(silabus, TRACK_HEADINGS[track.id] as string);
    const rows = firstTableRows(section);
    if (rows.length !== track.moduleCount) {
      fail(`${track.id}: Durasi says ${track.moduleCount} modules, the table has ${rows.length}.`);
    }
    // PRO states each module's hours in a "Jam" column (unequal hours since v1.1.0).
    const hoursColumn = track.hoursPerModule === undefined;
    const trackModules: Json[] = [];
    let previous = DW_SHARED_MODULE_CODE;
    rows.forEach((row, index) => {
      const parts = cells(row, hoursColumn ? 5 : 4, `${track.id} module row ${index}`);
      const [codeCell, title, outcome] = parts;
      const last = parts[parts.length - 1];
      const code = stripCode(codeCell as string);
      const found = match(
        new RegExp(`^DW-${track.id}-M([1-9]\\d*)$`),
        code,
        `${track.id} row ${index} code`,
      );
      const number = Number(group(found, 1));
      const hours = hoursColumn
        ? Number(group(match(/^(\d+)$/, parts[3] as string, `${track.id} row ${index} Jam`), 1))
        : (track.hoursPerModule as number);
      const base = {
        code,
        track: track.id,
        number,
        title: title as string,
        hours,
        outcome: outcome as string,
      };
      const prerequisites = [previous];
      previous = code;
      if (track.id === "PRO") {
        trackModules.push({
          ...base,
          skkniUnitCodes: [...(last as string).matchAll(/J\.620100\.\d{3}\.\d{2}/g)].map(
            (found) => found[0],
          ),
          prerequisites,
        });
      } else {
        trackModules.push({ ...base, portfolioOutput: last as string, prerequisites });
      }
    });
    const numbers = trackModules.map((module) => (module as { number: number }).number);
    if ([...numbers].sort((a, b) => a - b).some((n, i) => n !== i + 1)) {
      fail(
        `${track.id}: module numbers must be 1..${numbers.length} once each; found [${numbers.join(", ")}].`,
      );
    }
    const hourSum = trackModules.reduce<number>(
      (sum, module) => sum + (module as { hours: number }).hours,
      0,
    );
    if (hourSum !== track.trackHours) {
      fail(
        `${track.id}: the module hours add up to ${hourSum}, the track has ${track.trackHours}.`,
      );
    }
    modules.push(...trackModules);
  }
  return modules;
}

function parseShared(silabus: string): Json[] {
  const heading = silabus.split("\n").find((line) => line.startsWith("### 3.1 "));
  if (heading === undefined) {
    fail("heading '### 3.1 ' not found.");
  }
  const head = match(
    /^### 3\.1 `(DW-FND-M\d+)` — (.+) \((\d+) jam\)$/,
    heading,
    "bagian 3.1 heading",
  );
  const rows = new Map(
    firstTableRows(sectionLines(silabus, "### 3.1 ")).map((row, index) => {
      const [item, value] = cells(row, 2, `bagian 3.1 row ${index}`);
      return [item as string, value as string] as const;
    }),
  );
  const field = (name: string): string => {
    const value = rows.get(name);
    if (value === undefined) {
      fail(`bagian 3.1: row "${name}" not found.`);
    }
    return value;
  };
  return [
    {
      code: group(head, 1),
      title: group(head, 2),
      hours: Number(group(head, 3)),
      outcome: field("Hasil belajar"),
      topics: field("Topik"),
      exercises: field("Latihan"),
      references: field("Rujukan"),
    },
  ];
}

function parseUnits(riset: string): Array<{ code: string; title: string }> {
  return firstTableRows(sectionLines(riset, "### 2.2 ")).map((row, index) => {
    const [, code, title] = cells(row, 3, `riset.md bagian 2.2 row ${index}`);
    return { code: code as string, title: title as string };
  });
}

function parseSkkni(silabus: string, units: ReturnType<typeof parseUnits>): Json {
  const section = sectionLines(silabus, "### 5.2 ");
  const text = normalise(section.join("\n"));
  const regulation = match(
    /\*\*Sumber:\*\* (Keputusan Menteri Ketenagakerjaan Nomor \d+ Tahun \d{4}) \(ditetapkan (\d+) (\p{L}+) (\d{4})/u,
    text,
    "bagian 5.2 Sumber",
  );
  const month = MONTHS[group(regulation, 3)];
  if (month === undefined) {
    fail(`bagian 5.2: unknown month ${group(regulation, 3)}.`);
  }
  const day = group(regulation, 2).padStart(2, "0");
  const touched = match(/menyentuh (\d+) dari (\d+) unit/, text, "bagian 5.2 cakupan");
  const uncoveredLine = section.find((line) => line.includes("unit tidak dicakup:"));
  if (uncoveredLine === undefined) {
    fail("bagian 5.2: the 'unit tidak dicakup' row not found.");
  }
  const uncoveredCell = splitTableRow(uncoveredLine)[0] as string;
  const uncovered = [...uncoveredCell.matchAll(/`(\d{3})`/g)].map((found) => {
    const number = group(found, 1);
    const unit = units.find((candidate) => candidate.code.startsWith(`${UNIT_PREFIX}${number}.`));
    if (unit === undefined) {
      fail(`bagian 5.2: uncovered unit ${number} is not in riset.md bagian 2.2.`);
    }
    return unit.code;
  });
  return {
    ...{ unitsSource: "docs/programs/dewasa-coding/riset.md", unitsSourceSection: "bagian 2.2" },
    regulation: group(regulation, 1),
    enactedOn: `${group(regulation, 4)}-${month}-${day}`,
    mappingDepth: "judul-unit",
    touchedUnitCount: Number(group(touched, 1)),
    uncoveredUnitCodes: uncovered,
    units: units.map((unit) => ({ ...unit, verification: "judul-cocok-lampiran-resmi" })),
  };
}

function parseCertification(silabus: string): Json {
  const options = firstTableRows(sectionLines(silabus, "### 8.2 ")).map((row, index) => {
    const [optionCell, content, advantages, disadvantages] = cells(
      row,
      4,
      `bagian 8.2 row ${index}`,
    );
    const option = match(/^([A-Z])\. (.+)$/, optionCell as string, `bagian 8.2 row ${index} opsi`);
    return {
      id: group(option, 1),
      name: group(option, 2),
      content: content as string,
      advantages: advantages as string,
      disadvantages: disadvantages as string,
    };
  });
  const recommendation = labelledParagraph(sectionLines(silabus, "### 8.2 "), "**Rekomendasi:**");
  const lspParagraph = labelledParagraph(
    sectionLines(silabus, "### 5.2 "),
    "**Skema LSP yang relevan",
  );
  const list = lspParagraph.slice(lspParagraph.indexOf(":** ") + ":** ".length);
  const lspSchemes = [
    ...list.matchAll(/(Junior Web Programmer|Programmer) \((\p{L}+) unit: ([^)]*)\)/gu),
  ].map((found) => {
    const name = group(found, 1);
    const unitCodes = [...group(found, 3).matchAll(/\d{3}\.\d{2}/g)].map((code) =>
      unitCode(code[0]),
    );
    const declared = COUNT_WORDS[group(found, 2)];
    if (declared !== unitCodes.length) {
      fail(`bagian 5.2 skema ${name}: says ${group(found, 2)} unit, lists ${unitCodes.length}.`);
    }
    return { id: name.toLowerCase().replace(/ /g, "-"), name, unitCodes };
  });
  const base = match(/^([A-Z]) sebagai dasar/, recommendation, "bagian 8.2 Rekomendasi");
  return { options, defaultOptionId: group(base, 1), recommendation, lspSchemes };
}

function parseBridges(silabus: string): Json[] {
  return firstTableRows(sectionLines(silabus, "### 6.1 ")).map((row, index) => {
    const [from, to, note] = cells(row, 3, `bagian 6.1 row ${index}`);
    return {
      id: `bridge-${index + 1}`,
      from: from as string,
      to: to as string,
      note: note as string,
      status: (note as string).includes("Belum dapat dirancang") ? "ditunda" : "dirancang",
    };
  });
}

function parseStructure(silabus: string): Json[] {
  return firstTableRows(sectionLines(silabus, "## 2. ")).map((row, index) => {
    const [item, value] = cells(row, 2, `bagian 2 row ${index}`);
    return { item: item as string, value: value as string };
  });
}

/** The corpus the two documents imply: file name -> the JSON that file must hold. */
export function expectedCorpus(silabus: string, riset: string): Record<DwDataFileName, Json> {
  const version = match(/^- \*\*Version:\*\* v(\S+)$/m, silabus, "Version header");
  const date = match(
    /^- \*\*Last updated:\*\* (\d{4}-\d{2}-\d{2})$/m,
    silabus,
    "Last updated header",
  );
  const provenance = (sourceSection: string) => ({
    syllabusVersion: group(version, 1),
    syllabusDate: group(date, 1),
    sourceSection,
  });
  const tracks = parseTracks(silabus);
  return {
    "tracks.json": { ...provenance("bagian 1-7"), tracks },
    "structure.json": { ...provenance("bagian 2"), rows: parseStructure(silabus) },
    "shared.json": { ...provenance("bagian 3"), modules: parseShared(silabus) },
    "module-plan.json": { ...provenance("bagian 4-7"), modules: parseModules(silabus, tracks) },
    "skkni-units.json": {
      ...provenance("bagian 5.2"),
      ...(parseSkkni(silabus, parseUnits(riset)) as object),
    },
    "certification.json": {
      ...provenance("bagian 5.2-8.2"),
      ...(parseCertification(silabus) as object),
    },
    "bridges.json": { ...provenance("bagian 6.1"), bridges: parseBridges(silabus) },
  };
}

// --- Comparison -----------------------------------------------------------------

function show(value: unknown): string {
  return value === undefined ? "(missing)" : JSON.stringify(value);
}

function recordLabel(value: unknown, index: number): string {
  if (typeof value === "object" && value !== null && !Array.isArray(value)) {
    const record = value as Record<string, unknown>;
    const key = record.code ?? record.id ?? record.item;
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
export interface DwRegistryEntry {
  readonly syllabusVersion: string;
  readonly syllabusDate: string;
}

/**
 * Compares every corpus file in `actual` (file name -> parsed JSON) with the
 * content derived from the documents, and the registry entry's version and
 * date with the syllabus's. Returns every mismatch found, not just the first.
 */
export function checkDewasaFidelity(
  silabus: string,
  riset: string,
  actual: Readonly<Record<string, unknown>>,
  registry?: DwRegistryEntry,
): FidelityProblem[] {
  const expected = expectedCorpus(silabus, riset);
  const problems: FidelityProblem[] = [];
  for (const file of DW_DATA_FILES) {
    if (!(file in actual)) {
      problems.push({ context: file, expected: "(file present)", actual: "(file missing)" });
      continue;
    }
    diff(file, expected[file], actual[file], problems);
  }
  if (registry !== undefined) {
    const provenance = expected["tracks.json"] as { syllabusVersion: string; syllabusDate: string };
    diff(
      "programs.json[dewasa-coding].syllabusVersion",
      provenance.syllabusVersion,
      registry.syllabusVersion,
      problems,
    );
    diff(
      "programs.json[dewasa-coding].syllabusDate",
      provenance.syllabusDate,
      registry.syllabusDate,
      problems,
    );
  }
  return problems;
}

export function formatFidelityProblems(problems: readonly FidelityProblem[]): string {
  if (problems.length === 0) {
    return "check-dewasa-coding-fidelity: OK -- every cell of data/dewasa-coding/*.json matches docs/programs/dewasa-coding/silabus.md (SKKNI unit titles: riset.md bagian 2.2).";
  }
  const lines = problems.map(
    (problem, index) =>
      `  ${index + 1}. ${problem.context}\n     expected: ${problem.expected}\n     actual:   ${problem.actual}`,
  );
  return [
    `check-dewasa-coding-fidelity: FAILED -- ${problems.length} mismatch(es) found:`,
    ...lines,
  ].join("\n");
}

/**
 * Reads the documents, the corpus files and the registry entry under
 * `repoRoot` and runs {@link checkDewasaFidelity}; the module the programme
 * table registers for `dewasa-coding`.
 */
export const dewasaCodingFidelity: FidelityModule = {
  async run(repoRoot: string = REPO_ROOT) {
    const silabus = await Bun.file(join(repoRoot, ...SILABUS_PATH)).text();
    const riset = await Bun.file(join(repoRoot, ...RISET_PATH)).text();
    const actual: Record<string, unknown> = {};
    for (const file of DW_DATA_FILES) {
      const handle = Bun.file(join(repoRoot, "data", "dewasa-coding", file));
      if (await handle.exists()) {
        actual[file] = JSON.parse(await handle.text());
      }
    }
    const registry = JSON.parse(await Bun.file(join(repoRoot, "data", "programs.json")).text()) as {
      programs: Array<DwRegistryEntry & { id: string }>;
    };
    const entry = registry.programs.find((program) => program.id === "dewasa-coding");
    const problems = checkDewasaFidelity(silabus, riset, actual, entry);
    if (entry === undefined) {
      problems.push({
        context: "programs.json",
        expected: '"dewasa-coding" entry',
        actual: "(missing)",
      });
    }
    return { problems, message: formatFidelityProblems(problems) };
  },
};
