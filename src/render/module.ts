/**
 * `renderModule` -- a pure function from a module's index entry, its
 * Markdown body and its resolved references to the learner-facing Markdown
 * document (ADR-0007, issue #54).
 *
 * Every module that is not `disetujui` carries a prominent banner as the
 * first thing after the title (`DRAF`, `DRAF -- sedang ditinjau`, or
 * `DITARIK`); the footer states status, programme and -- for an approved
 * module -- the approval date and reviewer role. The body is authored
 * content and is emitted verbatim.
 *
 * **Pure**: no file I/O, no dates, no randomness.
 */

import type { Module, ModuleStatus } from "../schema/module";

/** What the renderer needs of an index entry; OSN and `sma-coding` modules both satisfy it. */
export type RenderableModule = Pick<Module, "title" | "status" | "review">;

/** A module reference with its label/title/url resolved (register entry or explicit). */
export interface ResolvedModuleReference {
  /** The register id (e.g. `R1`), or `null` for an explicit title + URL reference. */
  readonly label: string | null;
  readonly title: string;
  readonly url: string;
}

/** The programme the module belongs to, for the footer. */
export interface ModuleProgramInfo {
  readonly id: string;
  readonly name: string;
}

/** The banner line for a status, or `null` for `disetujui` (no banner). Exported for tests. */
export function moduleBanner(status: ModuleStatus): string | null {
  switch (status) {
    case "draf":
      return "> **DRAF — belum ditinjau.** Modul ini ditulis oleh tim (termasuk draf yang disusun agen AI) dan belum ditinjau oleh manusia. Isinya dapat memuat kekeliruan; periksa ke rujukan resmi di bagian bawah sebelum dipakai.";
    case "ditinjau":
      return "> **DRAF — sedang ditinjau, belum disetujui.** Modul ini sedang ditinjau oleh manusia dan belum disetujui. Isinya dapat berubah atau memuat kekeliruan; periksa ke rujukan resmi di bagian bawah.";
    case "ditarik":
      return "> **DITARIK — jangan dipakai.** Modul ini sudah ditarik dari pemakaian dan dipertahankan hanya sebagai arsip.";
    case "disetujui":
      return null;
  }
}

/** Renders `module` with its Markdown `body`, resolved `references` and the owning `program`. */
export function renderModule(
  module: RenderableModule,
  body: string,
  references: readonly ResolvedModuleReference[],
  program: ModuleProgramInfo,
): string {
  const lines: string[] = [`# ${module.title}`, ""];

  const banner = moduleBanner(module.status);
  if (banner !== null) {
    lines.push(banner, "");
  }

  lines.push(body.trim(), "");

  lines.push("## Rujukan");
  for (const reference of references) {
    const prefix = reference.label === null ? "" : `${reference.label}: `;
    lines.push(`- ${prefix}${reference.title} <${reference.url}>`);
  }
  lines.push("");

  lines.push("---");
  lines.push(`Status modul: ${module.status}.`);
  lines.push(`Program: ${program.name} (${program.id}).`);
  if (module.status === "disetujui" && module.review !== undefined) {
    lines.push(
      `Disetujui pada ${module.review.approvedOn} oleh peninjau dengan peran: ${module.review.reviewerRole}.`,
    );
  }

  return lines.join("\n");
}
