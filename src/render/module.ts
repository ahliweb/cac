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

import { learnerSheetIdentityProblems } from "../domain/learner-sheet";
import type { Module, ModuleStatus } from "../schema/module";
import { RenderRequestError } from "./errors";

/** What the renderer needs of an index entry; the module of every programme satisfies it. */
export type RenderableModule = Pick<Module, "title" | "status" | "review"> & {
  /** `tk-coding` only: CP Fase Fondasi items the week overlaps in the author's interpretation (never fulfilment). */
  readonly cpOverlap?: readonly string[] | undefined;
};

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
  if (module.cpOverlap !== undefined && module.cpOverlap.length > 0) {
    lines.push(
      `Irisan penafsiran dengan CP Fase Fondasi (bukan pemenuhan CP): ${module.cpOverlap.join(", ")}.`,
    );
  }
  if (module.status === "disetujui" && module.review !== undefined) {
    lines.push(
      `Disetujui pada ${module.review.approvedOn} oleh peninjau dengan peran: ${module.review.reviewerRole}.`,
    );
  }

  return lines.join("\n");
}

/**
 * Renders the child's learner sheet of a `tk-coding` or `sd-coding` module
 * (`content/<program>/lembar/<id>.md`): the module's title, the same status
 * banner as {@link renderModule}, the sheet body verbatim and a footer with
 * status and programme. A child's sheet must carry no name or identity field
 * of the child (privacy, ADR-0004): a sheet with one is **refused**
 * (`RenderRequestError` naming the lines), never printed.
 *
 * **Pure**: no file I/O, no dates, no randomness.
 */
export function renderModuleLearnerSheet(
  module: RenderableModule,
  sheetBody: string,
  program: ModuleProgramInfo,
): string {
  const problems = learnerSheetIdentityProblems(sheetBody);
  if (problems.length > 0) {
    const listed = problems
      .map((problem) => `line ${problem.line} (${JSON.stringify(problem.text)})`)
      .join(", ");
    throw new RenderRequestError(
      `the learner sheet of "${module.title}" has a name or identity field of the child: ${listed}. A child's sheet carries none; remove it from the sheet.`,
    );
  }

  const lines: string[] = [`# ${module.title}`, "", "**Lembar anak**", ""];

  const banner = moduleBanner(module.status);
  if (banner !== null) {
    lines.push(banner, "");
  }

  lines.push(sheetBody.trim(), "");

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
