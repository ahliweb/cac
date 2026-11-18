/**
 * Pure views over the validated `sma-coding` corpus for `osn plan` and
 * `osn render lembar-siswa` (issue #77, ADR-0006): the per-semester plan of
 * one track and the data behind one week's learner sheet. No I/O -- the CLI
 * loads and validates the corpus (`src/cli/sma-corpus-loader.ts`) and hands
 * the parsed files in as a {@link SmaCorpus}.
 *
 * Everything returned is a re-arrangement of corpus cells; this module never
 * writes curriculum text. A week is joined to its CP items through
 * `cp-mapping.json`, to the OSN bridge through `osn-bridge.json` and to
 * authored modules through the optional `modules.json` (whose `weekCodes`
 * name the weeks a module supports).
 */

import type { ModuleStatus } from "../schema/module";
import { SMA_CLASSES, SMA_FOUNDATION_BLOCK_ID } from "../schema/sma-common";
import type { CpElementsFile } from "../schema/sma-cp";
import type { CpMappingFile } from "../schema/sma-cp-mapping";
import type { SmaFoundationFile } from "../schema/sma-foundation";
import type { SmaModulesFile } from "../schema/sma-module";
import type { OsnBridgeFile } from "../schema/sma-osn-bridge";
import type { SmaTracksFile } from "../schema/sma-track";
import type { SmaWeeksFile } from "../schema/sma-week";

/** The parsed, schema-valid files the views are built from. `modules` is absent when the programme has no `modules.json`. */
export interface SmaCorpus {
  readonly tracks: SmaTracksFile;
  readonly weeks: SmaWeeksFile;
  readonly foundation: SmaFoundationFile;
  readonly cpMapping: CpMappingFile;
  readonly cpElements: CpElementsFile;
  readonly osnBridge: OsnBridgeFile;
  readonly modules?: SmaModulesFile | undefined;
}

/** Thrown for a request the corpus cannot satisfy (unknown track, semester or week code). */
export class SmaRequestError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "SmaRequestError";
  }
}

/** The semester codes in teaching order: X1, X2, XI1, XI2, XII1, XII2. */
export const SMA_SEMESTER_CODES: readonly string[] = SMA_CLASSES.flatMap((kelas) => [
  `${kelas}1`,
  `${kelas}2`,
]);

export interface SmaCpItemView {
  readonly code: string;
  readonly label: string;
  /** `true` when `cp-mapping.json` marks the coverage "(parsial)". */
  readonly partial: boolean;
}

export interface SmaBridgeView {
  readonly familyId: string;
  readonly topics: string;
  readonly note: string;
  readonly hasEnrichment: boolean;
}

export interface SmaModuleView {
  readonly id: string;
  readonly title: string;
  readonly status: ModuleStatus;
}

/** One teaching week of a track or of the shared foundation block. */
export interface SmaWeekView {
  readonly code: string;
  /** `"fondasi"` for `FND-*` weeks, otherwise `"jalur"`. */
  readonly block: "jalur" | "fondasi";
  /** The track the week belongs to; `null` for a foundation week. */
  readonly track: { readonly id: string; readonly name: string } | null;
  readonly kelas: string;
  readonly semester: string;
  readonly phase: string;
  readonly week: number;
  readonly topic: string;
  readonly objective: string;
  readonly output: string;
  readonly exercise: string;
  readonly cpItems: readonly SmaCpItemView[];
  readonly osnBridges: readonly SmaBridgeView[];
  readonly modules: readonly SmaModuleView[];
}

/** One CP quotation (a phase's text for one element). */
export interface SmaCpQuoteView {
  readonly phase: string;
  readonly elementId: string;
  readonly elementTitle: string;
  readonly text: string;
}

export interface SmaSemesterPlan {
  readonly semester: string;
  readonly kelas: string;
  readonly phase: string;
  /** Foundation weeks that precede the track weeks (kelas X semester 1 only); empty otherwise. */
  readonly foundation: readonly SmaWeekView[];
  readonly weeks: readonly SmaWeekView[];
}

export interface SmaTrackPlan {
  readonly track: { readonly id: string; readonly name: string; readonly tools: readonly string[] };
  readonly semesters: readonly SmaSemesterPlan[];
}

function viewOf(
  corpus: SmaCorpus,
  week: {
    id: string;
    kelas: string;
    semester: string;
    phase: string;
    week: number;
    topic: string;
    objective: string;
    output: string;
    exercise: string;
  },
  track: { id: string; name: string } | null,
): SmaWeekView {
  const itemLabels = new Map(corpus.cpElements.items.map((item) => [item.code, item.label]));
  const cpItems: SmaCpItemView[] = corpus.cpMapping.mappings
    .filter((mapping) => mapping.weeks.includes(week.id))
    .map((mapping) => ({
      code: mapping.cpCode,
      label: itemLabels.get(mapping.cpCode) ?? "",
      partial: mapping.partial,
    }));
  const osnBridges: SmaBridgeView[] = corpus.osnBridge.bridges
    .filter((bridge) => bridge.weeks.includes(week.id))
    .map((bridge) => ({
      familyId: bridge.familyId,
      topics: bridge.topics,
      note: bridge.note,
      hasEnrichment: bridge.hasEnrichment,
    }));
  const modules: SmaModuleView[] = (corpus.modules?.modules ?? [])
    .filter((module) => module.weekCodes.includes(week.id))
    .map((module) => ({ id: module.id, title: module.title, status: module.status }));
  return {
    code: week.id,
    block: track === null ? "fondasi" : "jalur",
    track,
    kelas: week.kelas,
    semester: week.semester,
    phase: week.phase,
    week: week.week,
    topic: week.topic,
    objective: week.objective,
    output: week.output,
    exercise: week.exercise,
    cpItems,
    osnBridges,
    modules,
  };
}

/** The ids of the approved tracks, in `tracks.json` order. */
export function smaTrackIds(corpus: SmaCorpus): string[] {
  return corpus.tracks.tracks.map((track) => track.id);
}

/**
 * The plan of track `trackId` for `semesters` (semester codes; all six when
 * omitted or empty), in teaching order. Kelas X semester 1 carries the shared
 * foundation block `FND-X1-M1..M7` before the track weeks. Throws
 * {@link SmaRequestError} for an unknown track or semester code.
 */
export function buildSmaTrackPlan(
  corpus: SmaCorpus,
  trackId: string,
  semesters: readonly string[] = [],
): SmaTrackPlan {
  const track = corpus.tracks.tracks.find((candidate) => candidate.id === trackId);
  if (track === undefined) {
    throw new SmaRequestError(
      `unknown track "${trackId}". Valid tracks: ${smaTrackIds(corpus).join(", ")}.`,
    );
  }
  for (const semester of semesters) {
    if (!SMA_SEMESTER_CODES.includes(semester)) {
      throw new SmaRequestError(
        `unknown semester "${semester}". Valid semesters: ${SMA_SEMESTER_CODES.join(", ")}.`,
      );
    }
  }
  const wanted = SMA_SEMESTER_CODES.filter(
    (code) => semesters.length === 0 || semesters.includes(code),
  );
  const trackRef = { id: track.id, name: track.name };
  const plans: SmaSemesterPlan[] = [];
  for (const semester of wanted) {
    const trackWeeks = corpus.weeks.weeks
      .filter((week) => week.track === track.id && week.semester === semester)
      .sort((a, b) => a.week - b.week);
    const foundationWeeks = corpus.foundation.weeks
      .filter((week) => week.semester === semester)
      .sort((a, b) => a.week - b.week);
    const first = trackWeeks[0] ?? foundationWeeks[0];
    if (first === undefined) {
      continue;
    }
    plans.push({
      semester,
      kelas: first.kelas,
      phase: first.phase,
      foundation: foundationWeeks.map((week) => viewOf(corpus, week, null)),
      weeks: trackWeeks.map((week) => viewOf(corpus, week, trackRef)),
    });
  }
  return {
    track: { id: track.id, name: track.name, tools: track.tools },
    semesters: plans,
  };
}

/** The view of week `code` (a track week or a foundation week), or `undefined` when no such week exists. */
export function findSmaWeek(corpus: SmaCorpus, code: string): SmaWeekView | undefined {
  const trackWeek = corpus.weeks.weeks.find((week) => week.id === code);
  if (trackWeek !== undefined) {
    const track = corpus.tracks.tracks.find((candidate) => candidate.id === trackWeek.track);
    return viewOf(corpus, trackWeek, { id: trackWeek.track, name: track?.name ?? trackWeek.track });
  }
  const foundationWeek = corpus.foundation.weeks.find((week) => week.id === code);
  return foundationWeek === undefined ? undefined : viewOf(corpus, foundationWeek, null);
}

/**
 * Example valid week codes for an error message: for each track and for the
 * foundation block, the first and last code (`A-X1-M8..A-XII2-M14`).
 */
export function exampleSmaWeekCodes(corpus: SmaCorpus): string[] {
  const ranges: string[] = [];
  for (const track of corpus.tracks.tracks) {
    const codes = corpus.weeks.weeks
      .filter((week) => week.track === track.id)
      .sort(
        (a, b) =>
          SMA_SEMESTER_CODES.indexOf(a.semester) - SMA_SEMESTER_CODES.indexOf(b.semester) ||
          a.week - b.week,
      )
      .map((week) => week.id);
    if (codes.length > 0) {
      ranges.push(`jalur ${track.id}: ${codes[0]} .. ${codes[codes.length - 1]}`);
    }
  }
  const foundation = [...corpus.foundation.weeks].sort((a, b) => a.week - b.week);
  const firstFoundation = foundation[0];
  const lastFoundation = foundation[foundation.length - 1];
  if (firstFoundation !== undefined && lastFoundation !== undefined) {
    ranges.push(
      `blok fondasi ${SMA_FOUNDATION_BLOCK_ID}: ${firstFoundation.id} .. ${lastFoundation.id}`,
    );
  }
  return ranges;
}

/** The CP quotations for the elements of `cpItems`, de-duplicated, in order of first appearance. */
export function cpQuotesFor(
  corpus: SmaCorpus,
  cpItems: readonly SmaCpItemView[],
): SmaCpQuoteView[] {
  const quotes: SmaCpQuoteView[] = [];
  const seen = new Set<string>();
  for (const item of cpItems) {
    const [phase, elementId] = item.code.split("-");
    const key = `${phase}-${elementId}`;
    if (seen.has(key)) {
      continue;
    }
    seen.add(key);
    const quote = corpus.cpElements.quotes.find(
      (candidate) => candidate.phase === phase && candidate.elementId === elementId,
    );
    if (quote !== undefined) {
      quotes.push({
        phase: quote.phase,
        elementId: quote.elementId,
        elementTitle: quote.elementTitle,
        text: quote.text,
      });
    }
  }
  return quotes;
}

/**
 * Splits a cell of semicolon-separated clauses (the "Tujuan" cell) into
 * clauses, ignoring semicolons inside parentheses and dropping empty parts.
 */
export function splitClauses(cell: string): string[] {
  const clauses: string[] = [];
  let depth = 0;
  let current = "";
  for (const char of cell) {
    if (char === "(") {
      depth += 1;
    } else if (char === ")") {
      depth = Math.max(0, depth - 1);
    }
    if (char === ";" && depth === 0) {
      clauses.push(current);
      current = "";
    } else {
      current += char;
    }
  }
  clauses.push(current);
  return clauses.map((clause) => clause.trim()).filter((clause) => clause.length > 0);
}
