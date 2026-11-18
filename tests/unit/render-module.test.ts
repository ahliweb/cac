/**
 * Tests for `src/render/module.ts` (issue #54, ADR-0007): the banner per
 * lifecycle status, the body, the references and the footer.
 */

import { describe, expect, test } from "bun:test";
import { moduleBanner, renderModule } from "../../src/render/module";
import type { Module } from "../../src/schema/module";

const PROGRAM = { id: "osn", name: "Program Uji" };
const REFS = [
  { label: "R1", title: "Silabus Uji", url: "https://contoh.example/silabus" },
  { label: null, title: "Buku Uji", url: "https://contoh.example/buku" },
];

function module(overrides: Partial<Module> = {}): Module {
  return {
    id: "contoh",
    title: "Modul Contoh",
    topicFamilies: ["dasar-pemrograman"],
    audience: "siswa",
    language: "id",
    status: "draf",
    references: [{ refId: "R1" }],
    contentPath: "content/osn/modules/contoh.md",
    ...overrides,
  };
}

describe("moduleBanner", () => {
  test("draf, ditinjau and ditarik have distinct banners; disetujui has none", () => {
    expect(moduleBanner("draf")).toContain("**DRAF — belum ditinjau.**");
    expect(moduleBanner("ditinjau")).toContain("**DRAF — sedang ditinjau, belum disetujui.**");
    expect(moduleBanner("ditarik")).toContain("**DITARIK");
    expect(moduleBanner("disetujui")).toBeNull();
  });
});

describe("renderModule", () => {
  test("a draft puts the banner on the first line after the title", () => {
    const lines = renderModule(module(), "## Isi\n\nTeks.\n", REFS, PROGRAM).split("\n");
    expect(lines[0]).toBe("# Modul Contoh");
    expect(lines[1]).toBe("");
    expect(lines[2]).toStartWith("> **DRAF — belum ditinjau.**");
  });

  test.each(["draf", "ditinjau", "ditarik"] as const)(
    "%s shows its banner and status footer",
    (status) => {
      const out = renderModule(module({ status }), "Isi", REFS, PROGRAM);
      expect(out).toContain(moduleBanner(status) as string);
      expect(out).toContain(`Status modul: ${status}.`);
      expect(out).not.toContain("Disetujui pada");
    },
  );

  test("an approved module has no banner and records date and reviewer role", () => {
    const out = renderModule(
      module({
        status: "disetujui",
        review: { approvedOn: "2026-12-01", reviewerRole: "pemilik" },
      }),
      "Isi",
      REFS,
      PROGRAM,
    );
    expect(out).not.toContain("DRAF");
    expect(out).not.toContain("DITARIK");
    expect(out).toContain("Status modul: disetujui.");
    expect(out).toContain("Disetujui pada 2026-12-01 oleh peninjau dengan peran: pemilik.");
  });

  test("emits the body verbatim, references and the programme footer", () => {
    const out = renderModule(module(), "## Isi\n\n```cpp\nint x;\n```\n", REFS, PROGRAM);
    expect(out).toContain("## Isi\n\n```cpp\nint x;\n```");
    expect(out).toContain("## Rujukan");
    expect(out).toContain("- R1: Silabus Uji <https://contoh.example/silabus>");
    expect(out).toContain("- Buku Uji <https://contoh.example/buku>");
    expect(out).toContain("Program: Program Uji (osn).");
  });

  test("is deterministic", () => {
    expect(renderModule(module(), "Isi", REFS, PROGRAM)).toBe(
      renderModule(module(), "Isi", REFS, PROGRAM),
    );
  });
});
