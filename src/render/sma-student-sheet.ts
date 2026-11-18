/**
 * `renderSmaStudentSheet` -- a pure function from one validated `sma-coding`
 * week (and the CP quotations and source attribution around it) to a
 * Markdown learner sheet ("lembar belajar siswa") for that week (issue #77).
 *
 * The OSN sheet (`student-sheet.ts`) reads the OSN corpus through static
 * imports; this one takes the week as an argument because the `sma-coding`
 * corpus is loaded and validated at run time. Everything in it comes from the
 * corpus: code, track (or the shared foundation block), topic, objective,
 * output, exercise, the mapped CP items with the CP quotation of their
 * element, the OSN bridge, and the indexed modules that support the week
 * (a module that is not `disetujui` is marked DRAF). The only text added is
 * Indonesian headings and labels. The self-check list is a blank form with
 * no field for a name, school or any other identifier (ADR-0004).
 *
 * **Pure**: no I/O, no dates, no randomness -- identical input yields
 * byte-identical output.
 */

import type { SmaCpQuoteView, SmaWeekView } from "../domain/sma-plan";
import { splitClauses } from "../domain/sma-plan";
import type { ModuleStatus } from "../schema/module";
import type { StudentSheetSource } from "./student-sheet";

/** The status label shown beside a module; only `disetujui` carries none of the DRAF marking. */
export function smaModuleStatusLabel(status: ModuleStatus): string {
  switch (status) {
    case "draf":
      return "DRAF, belum ditinjau";
    case "ditinjau":
      return "DRAF, sedang ditinjau";
    case "ditarik":
      return "DITARIK, jangan dipakai";
    case "disetujui":
      return "disetujui";
  }
}

/** Where the learner sheet sits in the syllabus, e.g. "Jalur A -- Algoritmik dengan C++ (kelas X, semester X1, minggu 9)". */
export function smaWeekPlacement(week: SmaWeekView): string {
  const place = `kelas ${week.kelas}, semester ${week.semester}, minggu ${week.week}`;
  return week.track === null
    ? `Blok fondasi bersama, untuk semua murid sebelum memilih jalur (${place})`
    : `Jalur ${week.track.id} -- ${week.track.name} (${place})`;
}

/** Renders the learner sheet for `week` with the CP `quotes` of its elements and the footer attribution `source`. */
export function renderSmaStudentSheet(
  week: SmaWeekView,
  quotes: readonly SmaCpQuoteView[],
  source: StudentSheetSource,
): string {
  const lines: string[] = [];
  lines.push(`# Lembar Belajar Siswa -- Minggu ${week.code}`);
  lines.push("");
  lines.push(`**Kode minggu:** ${week.code}`);
  lines.push("");
  lines.push(`**Posisi:** ${smaWeekPlacement(week)}`);
  lines.push("");
  lines.push(`**Topik:** ${week.topic}`);
  lines.push("");

  lines.push("## Tujuan");
  lines.push(week.objective);
  lines.push("");

  lines.push("## Keluaran");
  lines.push(week.output);
  lines.push("");

  lines.push("## Latihan dan kegiatan");
  lines.push(week.exercise);
  lines.push("");

  lines.push("## Butir CP terkait");
  if (week.track?.cpStatus === "pengayaan") {
    lines.push(
      `Jalur ${week.track.id} adalah pengayaan di luar rumusan CP; minggu jalur ini tidak dihitung sebagai pemenuhan butir CP mana pun.`,
    );
  } else if (week.cpItems.length === 0) {
    lines.push("Tidak ada butir CP yang dipetakan ke minggu ini dalam pemetaan silabus.");
  } else {
    for (const item of week.cpItems) {
      lines.push(`- ${item.code}: ${item.label}${item.partial ? " (parsial)" : ""}`);
    }
    for (const quote of quotes) {
      lines.push("");
      lines.push(`**Kutipan CP, ${quote.elementTitle} (Fase ${quote.phase}):**`);
      lines.push("");
      lines.push(`> ${quote.text}`);
    }
  }
  lines.push("");

  if (week.enrichmentLinks.length > 0) {
    lines.push("## Irisan dengan CP (pengayaan, tidak dihitung pemenuhan CP)");
    for (const link of week.enrichmentLinks) {
      lines.push(`- ${link.code}: ${link.label}. Tingkat irisan: ${link.level}`);
    }
    lines.push("");
  }

  if (week.osnBridges.length > 0) {
    lines.push("## Jembatan ke OSN");
    for (const bridge of week.osnBridges) {
      lines.push(`- ${bridge.familyId}: ${bridge.topics}. Catatan: ${bridge.note}`);
    }
    lines.push("");
  }

  if (week.modules.length > 0) {
    lines.push("## Modul terkait");
    for (const module of week.modules) {
      const marked = module.status === "disetujui" ? "" : "**DRAF** ";
      lines.push(
        `- ${marked}${module.id}: ${module.title} (status: ${smaModuleStatusLabel(module.status)})`,
      );
    }
    lines.push("");
  }

  lines.push("## Daftar periksa mandiri");
  for (const clause of splitClauses(week.objective)) {
    lines.push(`- [ ] ${clause}`);
  }
  lines.push(`- [ ] Keluaran selesai: ${week.output}`);
  lines.push("");

  lines.push("---");
  lines.push(`Sumber: ${source.name}, versi ${source.version}, tanggal ${source.date}.`);

  return lines.join("\n");
}
