/**
 * `renderStudentSheet` -- a pure function from a validated week number (and
 * the programme's source attribution) to a Markdown learner sheet ("lembar
 * belajar siswa") for that week of the §4 28-week syllabus (issue #53).
 *
 * Everything in the sheet is derived from validated corpus data via the
 * domain layer (`curriculum`, `topic-families`, `pedagogy`, `registers`):
 * the week's focus, content and outcome, the topic families it exercises
 * (name + coverage), the practice target, the gate evidence when a phase
 * gate follows the week, the §5.3 hint callout verbatim, and the references
 * its topic families cite. The only text this module adds is Indonesian
 * headings/labels (presentation); it never writes explanatory teaching
 * material (that is authored content, ADR-0007).
 *
 * The self-check list is a blank form: one empty checkbox per content item
 * and outcome. There is deliberately no field for a learner's name, school
 * or any other identifier (ADR-0004) -- nothing about a learner is stored.
 *
 * **Pure**: no file I/O, no `process` access, no dates, no randomness --
 * identical input always produces byte-identical output. Fails loudly
 * (throws {@link RenderRequestError}) on an out-of-range week.
 */

import { gateAfter, getWeek } from "../domain/curriculum";
import { hintPolicyCallout } from "../domain/pedagogy";
import { getReference } from "../domain/registers";
import { getTopicFamily } from "../domain/topic-families";
import { MAX_WEEK, MIN_WEEK } from "../schema/week";
import { RenderRequestError } from "./errors";

/** Where the sheet's content comes from: shown in the footer. */
export interface StudentSheetSource {
  /** The syllabus name, e.g. the registry entry's `name`. */
  readonly name: string;
  readonly version: string;
  readonly date: string;
}

function requireWeekInRange(week: number): void {
  if (!Number.isInteger(week) || week < MIN_WEEK || week > MAX_WEEK) {
    throw new RenderRequestError(
      `renderStudentSheet: week ${week} is out of range. Valid range: ${MIN_WEEK}-${MAX_WEEK}.`,
    );
  }
}

/**
 * The "Rujukan" bullet lines for `citationIds` (each resolved against the
 * references register, in the given order), or a single note when there are
 * none. Exported for direct testing: in the current corpus every week cites
 * only R1, so the empty and multi-reference shapes are otherwise unreachable.
 */
export function referenceLines(citationIds: readonly string[]): string[] {
  if (citationIds.length === 0) {
    return ["Tidak ada rujukan yang dikutip untuk rumpun materi minggu ini."];
  }
  return citationIds.map((id) => {
    const reference = getReference(id);
    return `- ${reference.id}: ${reference.title} <${reference.url}>`;
  });
}

/**
 * Renders the learner sheet for `week` (an integer {@link MIN_WEEK}-
 * {@link MAX_WEEK}) with the footer attribution `source`.
 *
 * Throws {@link RenderRequestError} for a `week` outside the valid range
 * (including non-integers), before doing anything else.
 */
export function renderStudentSheet(week: number, source: StudentSheetSource): string {
  requireWeekInRange(week);
  const weekData = getWeek(week);
  const families = weekData.topicFamilies.map((id) => getTopicFamily(id));

  const lines: string[] = [];
  lines.push(`# Lembar Belajar Siswa -- Minggu ${weekData.week}`);
  lines.push("");
  lines.push(`**Fokus:** ${weekData.focus}`);
  lines.push("");

  lines.push("## Cakupan materi minggu ini");
  for (const item of weekData.content) {
    lines.push(`- ${item}`);
  }
  lines.push("");

  lines.push("## Capaian");
  lines.push(weekData.outcome);
  lines.push("");

  lines.push("## Rumpun materi");
  for (const family of families) {
    lines.push(`### ${family.name}`);
    for (const item of family.coverage) {
      lines.push(`- ${item}`);
    }
    lines.push("");
  }

  lines.push("## Target latihan");
  lines.push(weekData.practice);
  lines.push("");
  if (weekData.problemLoad === null) {
    lines.push("Jumlah soal: tidak ada angka tetap untuk minggu ini (simulasi atau kontes).");
  } else {
    lines.push(
      `Jumlah soal: ${weekData.problemLoad.min}-${weekData.problemLoad.max} soal. Angka soal adalah kapasitas kerja internal, bukan ambang resmi kelulusan.`,
    );
  }
  if (weekData.hasMiniContest) {
    lines.push("");
    lines.push("Minggu ini ada mini contest.");
  }
  lines.push("");

  const gate = gateAfter(weekData.week);
  if (gate !== undefined) {
    lines.push(`## Gerbang fase setelah minggu ${gate.afterWeek}`);
    lines.push("Bukti yang harus dikuasai sebelum lanjut:");
    for (const item of gate.evidence) {
      lines.push(`- ${item}`);
    }
    lines.push("");
  }

  lines.push("## Kebijakan hint");
  lines.push(`> ${hintPolicyCallout()}`);
  lines.push("");

  lines.push("## Checklist mandiri");
  for (const item of weekData.content) {
    lines.push(`- [ ] ${item}`);
  }
  lines.push(`- [ ] ${weekData.outcome}`);
  lines.push("");

  // De-duplicated, in order of first appearance across the week's families.
  const citationIds = [...new Set(families.flatMap((family) => family.citations))];
  lines.push("## Rujukan");
  lines.push(...referenceLines(citationIds));
  lines.push("");

  lines.push("---");
  lines.push(`Sumber: ${source.name}, versi ${source.version}, tanggal ${source.date}.`);

  return lines.join("\n");
}
