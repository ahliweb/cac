/**
 * Formats a `SmaTrackPlan` (`src/domain/sma-plan.ts`) for `osn plan --program
 * sma-coding`: Markdown (the default) or `--format json` (the plan object
 * plus the source attribution). Mirrors `format-plan.ts` for the OSN plan.
 */

import type { SmaTrackPlan, SmaWeekView } from "../domain/sma-plan";
import { smaModuleStatusLabel } from "../render/sma-student-sheet";
import type { StudentSheetSource } from "../render/student-sheet";

/** What the plan covers, for the header line: all semesters, one class or one semester. */
export interface SmaPlanScope {
  readonly kelas: string | undefined;
  readonly semester: string | undefined;
}

function scopeText(scope: SmaPlanScope): string {
  if (scope.semester !== undefined) {
    return `semester ${scope.semester}`;
  }
  if (scope.kelas !== undefined) {
    return `kelas ${scope.kelas}`;
  }
  return "semua semester (kelas X sampai XII)";
}

function pushWeek(lines: string[], week: SmaWeekView): void {
  lines.push(`#### ${week.code} -- ${week.topic}`);
  lines.push("");
  lines.push(`- **Tujuan:** ${week.objective}`);
  lines.push(`- **Keluaran:** ${week.output}`);
  lines.push(`- **Latihan:** ${week.exercise}`);
  const cp =
    week.cpItems.length === 0
      ? "tidak ada butir CP yang dipetakan"
      : week.cpItems
          .map((item) => `${item.code}${item.partial ? " (parsial)" : ""} (${item.label})`)
          .join("; ");
  lines.push(`- **Butir CP:** ${cp}`);
  if (week.enrichmentLinks.length > 0) {
    lines.push(
      `- **Irisan dengan CP (pengayaan, tidak dihitung pemenuhan CP):** ${week.enrichmentLinks
        .map((link) => `${link.code} (${link.label}); tingkat: ${link.level}`)
        .join(" | ")}`,
    );
  }
  for (const bridge of week.osnBridges) {
    lines.push(
      `- **Jembatan OSN:** ${bridge.familyId} -- ${bridge.topics}. Catatan: ${bridge.note}`,
    );
  }
  for (const module of week.modules) {
    lines.push(
      `- **Modul:** ${module.id} -- ${module.title} (${smaModuleStatusLabel(module.status)})`,
    );
  }
  lines.push("");
}

/** Renders `plan` as a Markdown document, one section per semester. */
export function formatSmaPlanMarkdown(
  plan: SmaTrackPlan,
  scope: SmaPlanScope,
  source: StudentSheetSource,
): string {
  const lines: string[] = [];
  lines.push(`# Rencana Pembelajaran -- Jalur ${plan.track.id}: ${plan.track.name}`);
  lines.push("");
  lines.push(`Program: ${source.name}`);
  lines.push(`Cakupan: ${scopeText(scope)}`);
  lines.push(`Sumber: silabus versi ${source.version}, tanggal ${source.date}.`);
  if (plan.track.cpStatus === "pengayaan") {
    lines.push(
      `Catatan: jalur ${plan.track.id} adalah pengayaan di luar rumusan CP; tidak dihitung sebagai pemenuhan butir CP.`,
    );
  }
  lines.push("");
  for (const semester of plan.semesters) {
    lines.push(
      `## Semester ${semester.semester} (kelas ${semester.kelas}, fase ${semester.phase})`,
    );
    lines.push("");
    if (semester.foundation.length > 0) {
      const first = semester.foundation[0]?.code ?? "";
      const last = semester.foundation[semester.foundation.length - 1]?.code ?? "";
      lines.push(
        `### Blok fondasi bersama (${first}..${last}): untuk semua murid sebelum memilih jalur`,
      );
      lines.push("");
      for (const week of semester.foundation) {
        pushWeek(lines, week);
      }
      lines.push(`### Minggu jalur ${plan.track.id}`);
      lines.push("");
    }
    for (const week of semester.weeks) {
      pushWeek(lines, week);
    }
  }
  return lines.join("\n").replace(/\n+$/, "");
}

/** Machine-readable `--format json` output: the plan with its scope and source, pretty-printed. */
export function formatSmaPlanJson(
  plan: SmaTrackPlan,
  scope: SmaPlanScope,
  source: StudentSheetSource,
): string {
  return JSON.stringify(
    {
      program: source.name,
      syllabusVersion: source.version,
      syllabusDate: source.date,
      scope: { kelas: scope.kelas ?? null, semester: scope.semester ?? null },
      ...plan,
    },
    null,
    2,
  );
}
