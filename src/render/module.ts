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
  /** The five own-status-sheet programmes only (ADR-0011): the sheet's own status; absent for `tk-coding` and `sd-coding`. */
  readonly learnerSheetStatus?: ModuleStatus | undefined;
  /** The approval record of the sheet; present exactly when `learnerSheetStatus` is `disetujui`. */
  readonly learnerSheetReview?: Module["review"];
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

/** The banner line of a worksheet with its own status (ADR-0011), or `null` for `disetujui`. Exported for tests. */
export function sheetBanner(status: ModuleStatus): string | null {
  switch (status) {
    case "draf":
      return "> **DRAF — belum ditinjau.** Lembar ini ditulis oleh tim (termasuk draf yang disusun agen AI) dan belum ditinjau oleh manusia. Isinya dapat memuat kekeliruan; periksa ke modul dan rujukan resmi sebelum dipakai.";
    case "ditinjau":
      return "> **DRAF — sedang ditinjau, belum disetujui.** Lembar ini sedang ditinjau oleh manusia dan belum disetujui. Isinya dapat berubah atau memuat kekeliruan; periksa ke modul dan rujukan resmi.";
    case "ditarik":
      return "> **DITARIK — jangan dipakai.** Lembar ini sudah ditarik dari pemakaian dan dipertahankan hanya sebagai arsip.";
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
 * Renders the learner sheet of a module (`content/<program>/lembar/<id>.md`):
 * the module's title, a status banner, the sheet body verbatim and a footer
 * with status and programme. For `tk-coding` and `sd-coding` (the child's
 * sheet; no `learnerSheetStatus`) the banner and status are the module's,
 * as {@link renderModule}; for a module with `learnerSheetStatus` (the five
 * other programmes, ADR-0011) the label is "Lembar kerja" and banner,
 * status and approval are those of the sheet, never of the module. A child's sheet must carry no name or identity field
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

  const ownStatus = module.learnerSheetStatus;
  const lines: string[] = [
    `# ${module.title}`,
    "",
    ownStatus === undefined ? "**Lembar anak**" : "**Lembar kerja**",
    "",
  ];

  const banner = ownStatus === undefined ? moduleBanner(module.status) : sheetBanner(ownStatus);
  if (banner !== null) {
    lines.push(banner, "");
  }

  lines.push(sheetBody.trim(), "");

  lines.push("---");
  const status = ownStatus ?? module.status;
  const review = ownStatus === undefined ? module.review : module.learnerSheetReview;
  lines.push(ownStatus === undefined ? `Status modul: ${status}.` : `Status lembar: ${status}.`);
  lines.push(`Program: ${program.name} (${program.id}).`);
  if (status === "disetujui" && review !== undefined) {
    lines.push(
      `Disetujui pada ${review.approvedOn} oleh peninjau dengan peran: ${review.reviewerRole}.`,
    );
  }

  return lines.join("\n");
}
