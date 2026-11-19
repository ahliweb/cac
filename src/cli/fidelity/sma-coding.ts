/**
 * Fidelity check for the `sma-coding` corpus: parses the Markdown tables
 * and quotations of the owner-approved syllabus
 * (`docs/programs/sma-coding/silabus.md`, bagian 1.3, 1.4, 2, 3 (incl. the
 * shared foundation block 3.0 and the track summary 3.6), 4 (incl. the
 * enrichment links 4.5, and the SMP entry-and-placement subsection of 3.0
 * mirrored in `smp-bridge.json`) and 5 (per track))
 * and compares the result cell by cell with `data/sma-coding/*.json`, so any
 * drift between the approved document and the data fails hard.
 *
 * Distinct from `bun run validate` (schema, structural and referential
 * checks of the data on its own): validate cannot tell whether a cell still
 * says what the document says. Run standalone with
 * `bun run check:sma-fidelity` or, together with the other programmes,
 * `bun run check:fidelity --program sma-coding`. Moved here from
 * `scripts/check-sma-coding-fidelity.ts` (issue #140, ADR-0008) so the
 * programme table (`src/cli/program-registry.ts`) can run it; the script
 * remains as a thin entry point.
 *
 * The commands exit 0 with a summary line when every field matches, and 1
 * listing every mismatch (not just the first) otherwise.
 */

import { join } from "node:path";
import { expandWeekCodes } from "../../domain/sma-week-codes";
import { CP_ELEMENT_NAMES, type CpElementId } from "../../schema/sma-common";
import type { FidelityModule, FidelityProblem } from "./types";

export type { FidelityProblem } from "./types";

const REPO_ROOT = join(import.meta.dir, "..", "..", "..");
export const SMA_SOURCE_PATH = join(REPO_ROOT, "docs", "programs", "sma-coding", "silabus.md");
export const SMA_DATA_DIR = join(REPO_ROOT, "data", "sma-coding");
export const SMA_DATA_FILES = [
  "cp-elements.json",
  "tracks.json",
  "structure.json",
  "weeks.json",
  "foundation.json",
  "cp-mapping.json",
  "osn-bridge.json",
  "smp-bridge.json",
] as const;

export type SmaDataFileName = (typeof SMA_DATA_FILES)[number];
type Json = null | boolean | number | string | Json[] | { [key: string]: Json };

// --- Markdown parsing ----------------------------------------------------------

/**
 * Splits one table row into trimmed cells. A `|` ends a cell unless it is
 * written `\|` (a literal pipe, unescaped here) or sits inside a backtick
 * code span (the syllabus writes `||` as code in one cell).
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
    throw new Error(
      `check-sma-coding-fidelity: heading ${JSON.stringify(headingPrefix)} not found.`,
    );
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
    throw new Error("check-sma-coding-fidelity: no table found in section.");
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

function cell(row: readonly string[], index: number, context: string): string {
  const value = row[index];
  if (value === undefined || value === "") {
    throw new Error(`check-sma-coding-fidelity: ${context}: cell ${index} is missing.`);
  }
  return value;
}

function expectCells(row: readonly string[], count: number, context: string): void {
  if (row.length !== count) {
    throw new Error(
      `check-sma-coding-fidelity: ${context}: expected ${count} cells, found ${row.length}: ${JSON.stringify(row)}`,
    );
  }
}

function match(pattern: RegExp, text: string, context: string): RegExpExecArray {
  const result = pattern.exec(text);
  if (result === null) {
    throw new Error(
      `check-sma-coding-fidelity: ${context}: ${JSON.stringify(text)} does not match ${pattern}.`,
    );
  }
  return result;
}

function group(result: RegExpExecArray, index: number): string {
  const value = result[index];
  if (value === undefined) {
    throw new Error(`check-sma-coding-fidelity: missing capture group ${index}.`);
  }
  return value;
}

/** The paragraphs (blank-line separated, whitespace-normalised) of `lines`, in order. */
function paragraphsOf(lines: readonly string[]): string[] {
  const result: string[] = [];
  let current: string[] = [];
  for (const line of lines) {
    if (line.trim() === "" || line.trim().startsWith("|")) {
      if (current.length > 0) {
        result.push(current.join(" ").replace(/\s+/g, " ").trim());
        current = [];
      }
    } else {
      current.push(line.trim());
    }
  }
  if (current.length > 0) {
    result.push(current.join(" ").replace(/\s+/g, " ").trim());
  }
  return result;
}

/** The heading prefix of the SMP entry subsection of bagian 3.0 (silabus v1.4, #177). */
const SMP_BRIDGE_HEADING = "#### Kemampuan masuk dari SMP dan penempatan di blok fondasi";

/** Parses the SMP entry-and-placement subsection of bagian 3.0 into the content of `smp-bridge.json`. */
function parseSmpBridge(markdown: string): { intro: string; rows: Json[]; observation: string } {
  const section = sectionLines(markdown, SMP_BRIDGE_HEADING);
  const paragraphs = paragraphsOf(section);
  const intro = paragraphs[0];
  const observation = paragraphs.find((paragraph) => paragraph.startsWith("Pengamatan awal:"));
  if (intro === undefined || observation === undefined) {
    throw new Error(
      "check-sma-coding-fidelity: the SMP entry subsection needs an intro paragraph and a paragraph starting 'Pengamatan awal:'.",
    );
  }
  const rows: Json[] = firstTableRows(section).map((row, index) => {
    expectCells(row, 3, `SMP entry row ${index}`);
    const smpText = cell(row, 0, `SMP entry row ${index} asal`);
    const smaText = cell(row, 1, `SMP entry row ${index} minggu`);
    return {
      smpText,
      smpWeeks: [...smpText.matchAll(/SMP[789]-[12]-M\d+/g)].map((found) => found[0]),
      smaText,
      smaWeeks: [...smaText.matchAll(/(?:FND-X1|[A-E]-(?:X|XI|XII)[12])-M\d+/g)].map(
        (found) => found[0],
      ),
      treatment: cell(row, 2, `SMP entry row ${index} perlakuan`),
    };
  });
  return { intro, rows, observation };
}

// --- Expected corpus, derived from the Markdown ----------------------------------

const ELEMENT_ID_BY_NAME = new Map(
  (Object.entries(CP_ELEMENT_NAMES) as Array<[CpElementId, string]>).map(([id, name]) => [
    name,
    id,
  ]),
);

const CP_STATUS_BY_TEXT: Record<string, string> = {
  "dalam CP": "dalam-cp",
  "pengayaan di luar CP": "pengayaan",
};

const STRUCTURE_ROW_IDS: Record<string, string> = {
  "Kelas dan fase": "kelas-fase",
  Semester: "semester",
  "Minggu per semester": "minggu-per-semester",
  "Alokasi JP": "alokasi-jp",
  "Hubungan jalur": "hubungan-jalur",
  "Pola tiap semester": "pola-semester",
  "Nilai dasar": "nilai-dasar",
};

/** Builds, from the syllabus Markdown alone, the content every `data/sma-coding/*.json` file must have. */
export function expectedCorpus(markdown: string): Record<SmaDataFileName, Json> {
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
  let phase = "";
  const paragraphs: string[][] = [[]];
  for (const line of sectionLines(markdown, "### 1.3 ")) {
    if (line.trim() === "") {
      paragraphs.push([]);
    } else {
      paragraphs[paragraphs.length - 1]?.push(line.trim());
    }
  }
  for (const paragraph of paragraphs) {
    const text = paragraph.join(" ");
    const phaseMatch = /^\*\*Fase ([EF])\*\*$/.exec(text);
    if (phaseMatch !== null) {
      phase = group(phaseMatch, 1);
    } else if (text.startsWith("*")) {
      const quote = match(/^\*(\d+\.\d+) (.+?)\* — "(.*)"$/, text, "CP quotation");
      const elementTitle = group(quote, 2);
      const elementId = ELEMENT_ID_BY_NAME.get(elementTitle);
      if (elementId === undefined) {
        throw new Error(
          `check-sma-coding-fidelity: unknown CP element ${JSON.stringify(elementTitle)}.`,
        );
      }
      quotes.push({
        phase,
        elementId,
        elementTitle,
        guideNumber: group(quote, 1),
        text: group(quote, 3),
      });
    }
  }

  // bagian 1.4 -- CP item codes
  const items: Json[] = firstTableRows(sectionLines(markdown, "### 1.4 ")).map((row) => {
    expectCells(row, 2, "bagian 1.4 row");
    const code = cell(row, 0, "bagian 1.4 code");
    const parts = code.split("-");
    return {
      code,
      phase: parts[0] ?? "",
      elementId: parts[1] ?? "",
      label: cell(row, 1, `bagian 1.4 ${code}`),
    };
  });

  // bagian 2 -- structure
  const structureRows = firstTableRows(sectionLines(markdown, "## 2. ")).map((row) => {
    expectCells(row, 3, "bagian 2 row");
    const item = cell(row, 0, "bagian 2 item");
    const id = STRUCTURE_ROW_IDS[item];
    if (id === undefined) {
      throw new Error(`check-sma-coding-fidelity: unknown bagian 2 row ${JSON.stringify(item)}.`);
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
      throw new Error(`check-sma-coding-fidelity: bagian 2 has no row "${id}".`);
    }
    return found.value;
  };
  const classPhases = rowValue("kelas-fase")
    .split(";")
    .flatMap((part) => {
      const parsed = match(/^(.+?) = Fase ([EF])$/, part.trim(), "kelas-fase");
      return group(parsed, 1)
        .split(" dan ")
        .map((kelas) => ({ kelas: kelas.trim(), phase: group(parsed, 2) }));
    });
  const phaseOf = (kelas: string): string =>
    classPhases.find((entry) => entry.kelas === kelas)?.phase ?? "";
  const semesters = [...rowValue("semester").matchAll(/\b((?:XII|XI|X)[12])\b/g)].map((found) => {
    const code = group(found, 1);
    const kelas = code.slice(0, -1);
    return { code, kelas, phase: phaseOf(kelas) };
  });
  const weeksRow = match(
    /(\d+) minggu materi \+ (\d+) minggu cadangan/,
    rowValue("minggu-per-semester"),
    "minggu-per-semester",
  );
  const loadRow = match(
    /^Satu pertemuan (\d+) JP x (\d+) menit per minggu/,
    rowValue("alokasi-jp"),
    "alokasi-jp",
  );
  const patternRow = match(
    /^Minggu (\d+)-(\d+) materi; minggu (\d+) proyek mini; minggu (\d+) asesmen/,
    rowValue("pola-semester"),
    "pola-semester",
  );

  // bagian 3 -- tracks and weekly plan
  const tracks: Json[] = [];
  const weeks: Json[] = [];
  const foundationWeeks: Json[] = [];
  let inFoundation: { semester: string; kelas: string; phase: string } | undefined;
  const status = match(
    /^- \*\*Status:\*\* DISETUJUI pemilik program, (\d{4}-\d{2}-\d{2}) — jalur ([A-Z](?:, [A-Z])*,? dan [A-Z])\b/m,
    markdown,
    "Status line",
  );
  const approvedTracks = new Set(group(status, 2).match(/[A-Z]/g) ?? []);
  // bagian 3.6 -- the track summary table (name, tools, first class, relation to the CP)
  const summaryByTrack = new Map<
    string,
    { name: string; tools: string[]; startClass: string; cpStatus: string }
  >();
  for (const row of firstTableRows(sectionLines(markdown, "### 3.6 "))) {
    expectCells(row, 5, "bagian 3.6 row");
    const id = cell(row, 0, "bagian 3.6 track");
    const relation = cell(row, 4, `bagian 3.6 ${id}`);
    const cpStatus = CP_STATUS_BY_TEXT[relation];
    if (cpStatus === undefined) {
      throw new Error(
        `check-sma-coding-fidelity: bagian 3.6 ${id}: unknown relation ${JSON.stringify(relation)}.`,
      );
    }
    summaryByTrack.set(id, {
      name: cell(row, 1, `bagian 3.6 ${id}`),
      tools: cell(row, 2, `bagian 3.6 ${id}`).split(", "),
      startClass: cell(row, 3, `bagian 3.6 ${id}`),
      cpStatus,
    });
  }
  let current: { track: string; semester: string; kelas: string; phase: string } | undefined;
  for (const line of sectionLines(markdown, "## 3. ")) {
    const trackHeading = /^### 3\.\d Jalur ([A-Z]): (.+)$/.exec(line);
    if (trackHeading !== null) {
      const id = group(trackHeading, 1);
      const name = group(trackHeading, 2);
      if (!approvedTracks.has(id)) {
        throw new Error(`check-sma-coding-fidelity: track ${id} is in bagian 3 but not approved.`);
      }
      const summary = summaryByTrack.get(id);
      if (summary === undefined || summary.name !== name) {
        throw new Error(
          `check-sma-coding-fidelity: track ${id} heading ${JSON.stringify(name)} does not match the bagian 3.6 summary (${JSON.stringify(summary?.name)}).`,
        );
      }
      tracks.push({
        id,
        name,
        tools: summary.tools,
        startClass: summary.startClass,
        cpStatus: summary.cpStatus,
        approvalStatus: "disetujui",
        approvedOn: group(status, 1),
      });
      continue;
    }
    const foundationHeading =
      /^#### FND-((?:XII|XI|X)[12]) \(kelas (X|XI|XII), semester (\d); blok fondasi[^)]*\)$/.exec(
        line,
      );
    if (foundationHeading !== null) {
      const semester = group(foundationHeading, 1);
      if (semester !== `${group(foundationHeading, 2)}${group(foundationHeading, 3)}`) {
        throw new Error(`check-sma-coding-fidelity: inconsistent heading ${JSON.stringify(line)}.`);
      }
      inFoundation = {
        semester,
        kelas: group(foundationHeading, 2),
        phase: phaseOf(group(foundationHeading, 2)),
      };
      continue;
    }
    const foundationRow = /^\| (FND-((?:XII|XI|X)[12])-M(\d+)) \|/.exec(line);
    if (foundationRow !== null) {
      if (inFoundation === undefined || inFoundation.semester !== group(foundationRow, 2)) {
        throw new Error(
          `check-sma-coding-fidelity: foundation row ${group(foundationRow, 1)} outside its heading.`,
        );
      }
      const row = splitTableRow(line);
      const id = group(foundationRow, 1);
      expectCells(row, 5, id);
      foundationWeeks.push({
        id,
        kelas: inFoundation.kelas,
        semester: inFoundation.semester,
        semesterCode: `FND-${inFoundation.semester}`,
        phase: inFoundation.phase,
        week: Number(group(foundationRow, 3)),
        topic: cell(row, 1, id),
        objective: cell(row, 2, id),
        output: cell(row, 3, id),
        exercise: cell(row, 4, id),
      });
      continue;
    }
    const semesterHeading =
      /^#### ([A-Z])-((?:XII|XI|X)[12]) \(kelas (X|XI|XII), semester (\d); Fase ([EF])\)$/.exec(
        line,
      );
    if (semesterHeading !== null) {
      current = {
        track: group(semesterHeading, 1),
        semester: group(semesterHeading, 2),
        kelas: group(semesterHeading, 3),
        phase: group(semesterHeading, 5),
      };
      if (current.semester !== `${current.kelas}${group(semesterHeading, 4)}`) {
        throw new Error(`check-sma-coding-fidelity: inconsistent heading ${JSON.stringify(line)}.`);
      }
      continue;
    }
    const weekMatch = /^\| M(\d+) \|/.exec(line);
    if (weekMatch !== null) {
      if (current === undefined) {
        throw new Error("check-sma-coding-fidelity: week row before any semester heading.");
      }
      const row = splitTableRow(line);
      const semesterCode = `${current.track}-${current.semester}`;
      const context = `${semesterCode}-M${group(weekMatch, 1)}`;
      expectCells(row, 5, context);
      weeks.push({
        id: context,
        track: current.track,
        kelas: current.kelas,
        semester: current.semester,
        semesterCode,
        phase: current.phase,
        week: Number(group(weekMatch, 1)),
        topic: cell(row, 1, context),
        objective: cell(row, 2, context),
        output: cell(row, 3, context),
        exercise: cell(row, 4, context),
      });
    }
  }

  // bagian 4 -- CP mapping
  const mappings: Json[] = [];
  for (const [heading, sourceSection] of [
    ["### 4.1 ", "bagian 4.1"],
    ["### 4.2 ", "bagian 4.2"],
  ] as const) {
    for (const row of firstTableRows(sectionLines(markdown, heading))) {
      expectCells(row, 4, sourceSection);
      const cpCode = cell(row, 0, sourceSection);
      const weeksText = cell(row, 2, cpCode);
      const tracksText = cell(row, 3, cpCode);
      match(/^[A-Z](?: \(parsial\))?(?:, [A-Z](?: \(parsial\))?)*$/, tracksText, `${cpCode} jalur`);
      // "(parsial)" qualifies the track just before it ("B (parsial), C" = B partial, C full).
      const trackTokens = tracksText.split(", ").map((token) => ({
        id: token.slice(0, 1),
        partial: token.endsWith("(parsial)"),
      }));
      mappings.push({
        cpCode,
        topic: cell(row, 1, cpCode),
        weeksText,
        weeks: expandWeekCodes(weeksText),
        tracksText,
        tracks: trackTokens.map((token) => token.id),
        partialTracks: trackTokens.filter((token) => token.partial).map((token) => token.id),
        sourceSection,
      });
    }
  }

  // bagian 4.5 -- enrichment links of the pengayaan tracks (not CP coverage)
  const enrichmentLinks: Json[] = firstTableRows(sectionLines(markdown, "### 4.5 ")).map((row) => {
    expectCells(row, 5, "bagian 4.5 row");
    const track = cell(row, 0, "bagian 4.5 jalur");
    const cpCode = cell(row, 1, `bagian 4.5 ${track}`);
    const weeksText = cell(row, 3, `${track}/${cpCode}`);
    return {
      track,
      cpCode,
      topic: cell(row, 2, `${track}/${cpCode}`),
      weeksText,
      weeks: expandWeekCodes(weeksText),
      level: cell(row, 4, `${track}/${cpCode}`),
    };
  });

  // bagian 5 -- OSN bridges: 5.1 is the main track (jalur A), later "### 5.n Jalur X" tables are trackBridges
  const bridgeTables: Array<{ track: string; bridges: Json[] }> = [];
  const bridgeLines = sectionLines(markdown, "## 5. ");
  for (let index = 0; index < bridgeLines.length; index += 1) {
    const heading = /^### 5\.\d Jalur ([A-Z])$/.exec(bridgeLines[index] ?? "");
    if (heading === null) {
      continue;
    }
    const track = group(heading, 1);
    let end = index + 1;
    while (end < bridgeLines.length && !/^### /.test(bridgeLines[end] ?? "")) {
      end += 1;
    }
    const rows = firstTableRows(bridgeLines.slice(index + 1, end)).map((row) => {
      expectCells(row, 4, `bagian 5 ${track} row`);
      const familyCell = cell(row, 0, `bagian 5 ${track} family`);
      const familyId = group(match(/^`(.+)`$/, familyCell, "bagian 5 family id"), 1);
      const weeksText = cell(row, 2, familyId);
      const note = cell(row, 3, familyId);
      return {
        familyId,
        topics: cell(row, 1, familyId),
        weeksText,
        weeks: expandWeekCodes(weeksText),
        note,
        hasEnrichment: note.includes("**P**"),
      };
    });
    bridgeTables.push({ track, bridges: rows });
  }
  const mainBridge = bridgeTables[0];
  if (mainBridge === undefined) {
    throw new Error(
      "check-sma-coding-fidelity: bagian 5 has no per-track table (### 5.1 Jalur A).",
    );
  }
  const bridgeTrack = mainBridge.track;
  const bridges = mainBridge.bridges;
  const trackBridges: Json[] = bridgeTables.slice(1).map((entry) => ({
    track: entry.track,
    bridges: entry.bridges,
  }));

  return {
    "cp-elements.json": { ...provenance("bagian 1"), quotes, items },
    "tracks.json": { ...provenance("bagian 3"), tracks },
    "structure.json": {
      ...provenance("bagian 2"),
      rows: structureRows,
      classPhases,
      semesters,
      weeksPerSemester: {
        teaching: Number(group(weeksRow, 1)),
        reserve: Number(group(weeksRow, 2)),
      },
      load: {
        sessionsPerWeek: 1,
        jpPerSession: Number(group(loadRow, 1)),
        minutesPerJp: Number(group(loadRow, 2)),
      },
      semesterPattern: {
        materiFromWeek: Number(group(patternRow, 1)),
        materiToWeek: Number(group(patternRow, 2)),
        miniProjectWeek: Number(group(patternRow, 3)),
        assessmentWeek: Number(group(patternRow, 4)),
      },
    },
    "weeks.json": { ...provenance("bagian 3"), weeks },
    "foundation.json": { ...provenance("bagian 3.0"), weeks: foundationWeeks },
    "cp-mapping.json": { ...provenance("bagian 4"), mappings, enrichmentLinks },
    "osn-bridge.json": { ...provenance("bagian 5"), track: bridgeTrack, bridges, trackBridges },
    "smp-bridge.json": { ...provenance("bagian 3.0"), ...parseSmpBridge(markdown) },
  };
}

// --- Comparison -----------------------------------------------------------------

function show(value: unknown): string {
  return value === undefined ? "(missing)" : JSON.stringify(value);
}

function recordLabel(value: unknown, index: number): string {
  if (typeof value === "object" && value !== null && !Array.isArray(value)) {
    const record = value as Record<string, unknown>;
    // enrichment links are keyed by (track, CP item); a trackBridges entry by its track
    if (typeof record.track === "string" && typeof record.cpCode === "string") {
      return `[${record.track}/${record.cpCode}]`;
    }
    const key = record.id ?? record.cpCode ?? record.code ?? record.familyId ?? record.track;
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
export interface SmaRegistryEntry {
  readonly syllabusVersion: string;
  readonly syllabusDate: string;
}

/**
 * Compares every corpus file in `actual` (file name -> parsed JSON) with the
 * content derived from `markdown`, and the registry entry's version and date
 * with the document's. Returns every mismatch found, not just the first.
 */
export function checkSmaFidelity(
  markdown: string,
  actual: Readonly<Record<string, unknown>>,
  registry?: SmaRegistryEntry,
): FidelityProblem[] {
  const expected = expectedCorpus(markdown);
  const problems: FidelityProblem[] = [];
  for (const file of SMA_DATA_FILES) {
    if (!(file in actual)) {
      problems.push({ context: file, expected: "(file present)", actual: "(file missing)" });
      continue;
    }
    diff(file, expected[file], actual[file], problems);
  }
  if (registry !== undefined) {
    const provenance = expected["tracks.json"] as { syllabusVersion: string; syllabusDate: string };
    diff(
      "programs.json[sma-coding].syllabusVersion",
      provenance.syllabusVersion,
      registry.syllabusVersion,
      problems,
    );
    diff(
      "programs.json[sma-coding].syllabusDate",
      provenance.syllabusDate,
      registry.syllabusDate,
      problems,
    );
  }
  return problems;
}

export function formatFidelityProblems(problems: readonly FidelityProblem[]): string {
  if (problems.length === 0) {
    return "check-sma-coding-fidelity: OK -- every cell of data/sma-coding/*.json matches docs/programs/sma-coding/silabus.md.";
  }
  const lines = problems.map(
    (problem, index) =>
      `  ${index + 1}. ${problem.context}\n     expected: ${problem.expected}\n     actual:   ${problem.actual}`,
  );
  return [
    `check-sma-coding-fidelity: FAILED -- ${problems.length} mismatch(es) found:`,
    ...lines,
  ].join("\n");
}

/**
 * Reads the document, the corpus files and the registry entry under
 * `repoRoot` and runs {@link checkSmaFidelity}; the module the programme
 * table registers for `sma-coding`.
 */
export const smaCodingFidelity: FidelityModule = {
  async run(repoRoot: string = REPO_ROOT) {
    const markdown = await Bun.file(
      join(repoRoot, "docs", "programs", "sma-coding", "silabus.md"),
    ).text();
    const actual: Record<string, unknown> = {};
    for (const file of SMA_DATA_FILES) {
      const handle = Bun.file(join(repoRoot, "data", "sma-coding", file));
      if (await handle.exists()) {
        actual[file] = JSON.parse(await handle.text());
      }
    }
    const registry = JSON.parse(await Bun.file(join(repoRoot, "data", "programs.json")).text()) as {
      programs: Array<SmaRegistryEntry & { id: string }>;
    };
    const entry = registry.programs.find((program) => program.id === "sma-coding");
    const problems = checkSmaFidelity(markdown, actual, entry);
    if (entry === undefined) {
      problems.push({
        context: "programs.json",
        expected: '"sma-coding" entry',
        actual: "(missing)",
      });
    }
    return { problems, message: formatFidelityProblems(problems) };
  },
};
