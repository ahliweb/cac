/**
 * Tests for the learner-sheet side of `src/render/module.ts` (ADR-0007): the
 * child's sheet of a `tk-coding` or `sd-coding` module renders with the same
 * status banner as the module, and is refused when it carries a name or
 * identity field of the child. Also the `tk-coding` CP-overlap footer line of
 * `renderModule`.
 */

import { describe, expect, test } from "bun:test";
import { RenderRequestError } from "../../src/render/errors";
import {
  moduleBanner,
  renderModule,
  renderModuleLearnerSheet,
  sheetBanner,
} from "../../src/render/module";

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

describe("renderModuleLearnerSheet of a module with its own sheet status (ADR-0011)", () => {
  const program = { id: "smp-coding", name: "Program Uji SMP" };
  const worksheetOf = (overrides: Record<string, unknown> = {}) =>
    module({
      status: "disetujui",
      review: { approvedOn: "2026-11-19", reviewerRole: "pemilik" },
      learnerSheetStatus: "draf",
      ...overrides,
    });

  test("an approved module with a draft sheet shows the sheet's DRAF banner and status, not the module's", () => {
    const out = renderModuleLearnerSheet(worksheetOf(), "Kerjakan soal 1.\n", program);
    const lines = out.split("\n");
    expect(lines[0]).toBe("# Kegiatan sehari-hariku");
    expect(lines[2]).toBe("**Lembar kerja**");
    expect(lines[4]).toBe(sheetBanner("draf") as string);
    expect(lines[4]).toContain("Lembar ini");
    expect(out).toContain("Status lembar: draf.");
    expect(out).not.toContain("Status modul");
    expect(out).not.toContain("Disetujui pada");
    expect(out).toContain("Program: Program Uji SMP (smp-coding).");
  });

  test.each(["ditinjau", "ditarik"] as const)(
    "a %s sheet has its own banner",
    (learnerSheetStatus) => {
      const out = renderModuleLearnerSheet(worksheetOf({ learnerSheetStatus }), "Isi.", program);
      expect(out).toContain(sheetBanner(learnerSheetStatus) as string);
      expect(out).not.toContain("Modul ini");
    },
  );

  test("an approved sheet has no banner and records the sheet's own approval", () => {
    const out = renderModuleLearnerSheet(
      worksheetOf({
        status: "draf",
        review: undefined,
        learnerSheetStatus: "disetujui",
        learnerSheetReview: { approvedOn: "2026-12-02", reviewerRole: "mentor" },
      }),
      "Isi.",
      program,
    );
    expect(out).not.toContain("DRAF");
    expect(out).toContain("Status lembar: disetujui.");
    expect(out).toContain("Disetujui pada 2026-12-02 oleh peninjau dengan peran: mentor.");
  });

  test('sheetBanner has no banner for disetujui and no sentence says "Modul ini"', () => {
    expect(sheetBanner("disetujui")).toBeNull();
    for (const status of ["draf", "ditinjau", "ditarik"] as const) {
      expect(sheetBanner(status)).toContain("Lembar ini");
    }
  });

  test("a sheet with a name field is refused here too", () => {
    expect(() => renderModuleLearnerSheet(worksheetOf(), "# L\n\nNama: ___\n", program)).toThrow(
      RenderRequestError,
    );
  });

  test("a module without learnerSheetStatus (tk/sd) is rendered exactly as before", () => {
    const out = renderModuleLearnerSheet(module(), "Isi.", PROGRAM);
    expect(out).toContain("**Lembar anak**");
    expect(out).toContain("Status modul: draf.");
  });
});
