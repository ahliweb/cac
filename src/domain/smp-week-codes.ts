/**
 * Pure helpers for the week and CP notation of the SMP coding syllabus
 * (`docs/programs/smp-coding/silabus.md`), so the notation can be checked
 * referentially by the corpus audit and parsed by the fidelity module.
 */

const WEEK_CODE = /^SMP[789]-[12]-M\d+$/;
const OTHER_WEEKS = /^(.*?),? dan (\d+) minggu lain \(kolom Butir CP di bagian 3\)$/;

/**
 * Parses the "Minggu" cell of the CP mapping (bagian 4): `-` (no week), a
 * list of week codes separated by `, `, or such a list followed by
 * `, dan N minggu lain (kolom Butir CP di bagian 3)`. Throws an `Error`
 * naming the offending cell when the notation is malformed, so callers can
 * turn it into a finding.
 */
export function parseSmpMappingWeeks(text: string): { weeks: string[]; otherWeeks: number } {
  if (text === "-") {
    return { weeks: [], otherWeeks: 0 };
  }
  const tail = OTHER_WEEKS.exec(text);
  const list = tail === null ? text : (tail[1] ?? "");
  const otherWeeks = tail === null ? 0 : Number(tail[2]);
  const weeks = list.split(", ").map((part) => part.trim());
  for (const week of weeks) {
    if (!WEEK_CODE.test(week)) {
      throw new Error(`cannot parse week notation part ${JSON.stringify(week)} in "${text}"`);
    }
  }
  return { weeks, otherWeeks };
}

/**
 * Splits a "Butir CP" cell of the weekly plan (bagian 3) into the three
 * disjoint facts the corpus keeps: items counted as coverage, items marked
 * `*` (Python overlap, never coverage) and whether the cell says
 * `pengayaan`. Throws on a token that is none of those.
 */
export function parseSmpCpCell(cell: string): {
  cpCodes: string[];
  irisanCodes: string[];
  enrichment: boolean;
} {
  const cpCodes: string[] = [];
  const irisanCodes: string[] = [];
  let enrichment = false;
  for (const raw of cell.split(", ")) {
    const token = raw.trim();
    if (token === "pengayaan") {
      enrichment = true;
      continue;
    }
    const found = /^((?:D-(?:BK|LD)|DK-(?:BK|LD|EA|PA))-[a-z])(\*?)$/.exec(token);
    if (found?.[1] === undefined) {
      throw new Error(`cannot parse CP cell token ${JSON.stringify(token)} in "${cell}"`);
    }
    (found[2] === "*" ? irisanCodes : cpCodes).push(found[1]);
  }
  return { cpCodes, irisanCodes, enrichment };
}

/** The position of a semester code in teaching order (`SMP7-1` < `SMP7-2` < `SMP8-1` ...). */
export function smpSemesterIndex(code: string): number {
  const found = /^SMP([789])-([12])$/.exec(code);
  if (found?.[1] === undefined || found[2] === undefined) {
    return -1;
  }
  return (Number(found[1]) - 7) * 2 + (Number(found[2]) - 1);
}
