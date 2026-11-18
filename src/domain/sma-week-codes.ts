/**
 * Pure helper that expands the week notation used in the SMA coding
 * syllabus (`docs/programs/sma-coding/silabus.md`, bagian 4 and 5) into
 * individual week codes, so the notation can be checked referentially.
 *
 * Notation: segments are separated by `;`. A segment starts with a full
 * code carrying its semester prefix (`A-X2-M4..M9`); later parts of the
 * same segment, separated by `,`, reuse that prefix (`, M13`). A part is a
 * single week (`M13`) or an inclusive range (`M4..M9`).
 */

const FULL_PART = /^([A-Z]-(?:X|XI|XII)[12])-M(\d+)(?:\.\.M(\d+))?$/;
const SHORT_PART = /^M(\d+)(?:\.\.M(\d+))?$/;

/**
 * Expands `text` into week codes in source order. Throws an `Error` naming
 * the offending part when the notation is malformed or a range runs
 * backwards, so callers can turn it into a finding.
 */
export function expandWeekCodes(text: string): string[] {
  const codes: string[] = [];
  for (const segment of text.split(";")) {
    let prefix: string | undefined;
    for (const rawPart of segment.split(",")) {
      const part = rawPart.trim();
      const full = FULL_PART.exec(part);
      const short = full === null ? SHORT_PART.exec(part) : null;
      let from: number;
      let to: number;
      if (full?.[1] !== undefined && full[2] !== undefined) {
        prefix = full[1];
        from = Number(full[2]);
        to = full[3] === undefined ? from : Number(full[3]);
      } else if (short?.[1] !== undefined && prefix !== undefined) {
        from = Number(short[1]);
        to = short[2] === undefined ? from : Number(short[2]);
      } else {
        throw new Error(`cannot parse week notation part ${JSON.stringify(part)} in "${text}"`);
      }
      if (to < from) {
        throw new Error(`week range ${JSON.stringify(part)} in "${text}" runs backwards`);
      }
      for (let week = from; week <= to; week += 1) {
        codes.push(`${prefix}-M${week}`);
      }
    }
  }
  return codes;
}
