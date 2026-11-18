/**
 * Tests for the learner-sheet side of `src/render/module.ts` (ADR-0007): the
 * child's sheet of a `tk-coding` or `sd-coding` module renders with the same
 * status banner as the module, and is refused when it carries a name or
 * identity field of the child. Also the `tk-coding` CP-overlap footer line of
 * `renderModule`.
 */

import { describe, expect, test } from "bun:test";
import { RenderRequestError } from "../../src/render/errors";
import { moduleBanner, renderModule, renderModuleLearnerSheet } from "../../src/render/module";

const PROGRAM = { id: "tk-coding", name: "Program Uji TK" };
const REVIEW = { approvedOn: "2026-11-19", reviewerRole: "pemilik" };

function module(overrides: Record<string, unknown> = {}) {
  return {
    title: "Kegiatan sehari-hariku",
    status: "draf" as const,
    review: undefined,
    ...overrides,
  };
}

describe("renderModuleLearnerSheet", () => {
  test("a draft sheet has the title, the child-sheet label, the banner and the footer", () => {
    const out = renderModuleLearnerSheet(module(), "Tempel gambar urutan.\n", PROGRAM);
    const lines = out.split("\n");
    expect(lines[0]).toBe("# Kegiatan sehari-hariku");
    expect(lines[2]).toBe("**Lembar anak**");
    expect(lines[4]).toBe(moduleBanner("draf") as string);
    expect(out).toContain("Tempel gambar urutan.");
    expect(out).toContain("Status modul: draf.");
    expect(out).toContain("Program: Program Uji TK (tk-coding).");
    expect(out).not.toContain("## Rujukan");
    expect(out).not.toContain("Disetujui pada");
  });

  test.each(["ditinjau", "ditarik"] as const)("%s shows its own banner", (status) => {
    const out = renderModuleLearnerSheet(module({ status }), "Isi.", PROGRAM);
    expect(out).toContain(moduleBanner(status) as string);
  });

  test("an approved sheet has no banner and records date and reviewer role", () => {
    const out = renderModuleLearnerSheet(
      module({ status: "disetujui", review: REVIEW }),
      "Isi.",
      PROGRAM,
    );
    expect(out).not.toContain("DRAF");
    expect(out).toContain("Status modul: disetujui.");
    expect(out).toContain("Disetujui pada 2026-11-19 oleh peninjau dengan peran: pemilik.");
  });

  test("a sheet with a name or identity field is refused, naming the lines", () => {
    const body = "# Lembar\n\nNama: ______\n\n## Tanggal lahir\n";
    expect(() => renderModuleLearnerSheet(module(), body, PROGRAM)).toThrow(RenderRequestError);
    try {
      renderModuleLearnerSheet(module(), body, PROGRAM);
    } catch (cause) {
      const message = (cause as Error).message;
      expect(message).toContain("line 3");
      expect(message).toContain('"Nama: ______"');
      expect(message).toContain("line 5");
      expect(message).toContain("Kegiatan sehari-hariku");
    }
  });
});

describe("renderModule: CP overlap of a tk-coding module", () => {
  test("a footer line says the CP items are an interpreted overlap, not fulfilment", () => {
    const out = renderModule(module({ cpOverlap: ["FF-DL-b", "FF-DL-c"] }), "Isi.", [], PROGRAM);
    expect(out).toContain(
      "Irisan penafsiran dengan CP Fase Fondasi (bukan pemenuhan CP): FF-DL-b, FF-DL-c.",
    );
  });

  test("no overlap, or a module of another programme, adds no such line", () => {
    expect(renderModule(module({ cpOverlap: [] }), "Isi.", [], PROGRAM)).not.toContain("Irisan");
    expect(renderModule(module(), "Isi.", [], PROGRAM)).not.toContain("Irisan");
  });
});
