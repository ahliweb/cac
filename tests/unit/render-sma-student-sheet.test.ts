/**
 * Tests for `src/render/sma-student-sheet.ts` (issue #77): the sections, the
 * DRAF marking of modules, the optional sections, the blank self-check and
 * the absence of any learner-identifying field (ADR-0004).
 */

import { describe, expect, test } from "bun:test";
import type { SmaWeekView } from "../../src/domain/sma-plan";
import {
  renderSmaStudentSheet,
  smaModuleStatusLabel,
  smaWeekPlacement,
} from "../../src/render/sma-student-sheet";

const SOURCE = { name: "Silabus Uji", version: "1.1.0", date: "2026-11-19" };

const TRACK_WEEK: SmaWeekView = {
  code: "A-X1-M9",
  block: "jalur",
  track: { id: "A", name: "Algoritmik dengan C++" },
  kelas: "X",
  semester: "X1",
  phase: "E",
  week: 9,
  topic: "Variabel dan masukan",
  objective: "memilih tipe (`int`; `double`); membaca data",
  output: "program hitung",
  exercise: "luas dan keliling",
  cpItems: [
    { code: "E-BK-d", label: "pseudocode", partial: false },
    { code: "E-BK-e", label: "model I-P-O", partial: true },
  ],
  osnBridges: [
    { familyId: "dasar-pemrograman", topics: "sintaks", note: "Sesuai CP.", hasEnrichment: false },
  ],
  modules: [
    { id: "m-draf", title: "Modul draf", status: "draf" },
    { id: "m-final", title: "Modul final", status: "disetujui" },
  ],
};

const QUOTES = [
  { phase: "E", elementId: "BK", elementTitle: "Berpikir Komputasional", text: "Kutipan CP." },
];

describe("renderSmaStudentSheet", () => {
  const sheet = renderSmaStudentSheet(TRACK_WEEK, QUOTES, SOURCE);

  test("has the sections in order", () => {
    const headings = sheet.split("\n").filter((line) => line.startsWith("## "));
    expect(headings).toEqual([
      "## Tujuan",
      "## Keluaran",
      "## Latihan dan kegiatan",
      "## Butir CP terkait",
      "## Jembatan ke OSN",
      "## Modul pendamping",
      "## Daftar periksa mandiri",
    ]);
  });

  test("carries code, placement, CP items with quotation, bridge and footer", () => {
    expect(sheet).toContain("# Lembar Belajar Siswa -- Minggu A-X1-M9");
    expect(sheet).toContain(
      "**Posisi:** Jalur A -- Algoritmik dengan C++ (kelas X, semester X1, minggu 9)",
    );
    expect(sheet).toContain("- E-BK-d: pseudocode\n");
    expect(sheet).toContain("- E-BK-e: model I-P-O (parsial)");
    expect(sheet).toContain("> Kutipan CP.");
    expect(sheet).toContain("- dasar-pemrograman: sintaks. Catatan: Sesuai CP.");
    expect(sheet.endsWith("Sumber: Silabus Uji, versi 1.1.0, tanggal 2026-11-19.")).toBe(true);
  });

  test("marks a non-approved module DRAF and leaves an approved one unmarked", () => {
    expect(sheet).toContain("- **DRAF** m-draf: Modul draf (status: DRAF, belum ditinjau)");
    expect(sheet).toContain("- m-final: Modul final (status: disetujui)");
  });

  test("the self-check is blank checkboxes, one per objective clause plus the output", () => {
    const boxes = sheet.split("\n").filter((line) => line.startsWith("- [ ] "));
    expect(boxes).toEqual([
      "- [ ] memilih tipe (`int`; `double`)",
      "- [ ] membaca data",
      "- [ ] Keluaran selesai: program hitung",
    ]);
    expect(sheet).not.toContain("[x]");
  });

  test("has no field for a learner's name or school (ADR-0004)", () => {
    expect(sheet.toLowerCase()).not.toMatch(/nama\s*:|sekolah\s*:|nis\b/);
  });

  test("is deterministic", () => {
    expect(renderSmaStudentSheet(TRACK_WEEK, QUOTES, SOURCE)).toBe(sheet);
  });

  test("a foundation week without CP items, bridge or modules omits those sections", () => {
    const foundation: SmaWeekView = {
      ...TRACK_WEEK,
      code: "FND-X1-M3",
      block: "fondasi",
      track: null,
      cpItems: [],
      osnBridges: [],
      modules: [],
    };
    const text = renderSmaStudentSheet(foundation, [], SOURCE);
    expect(text).toContain(
      "**Posisi:** Blok fondasi bersama, untuk semua murid sebelum memilih jalur",
    );
    expect(text).toContain("Tidak ada butir CP yang dipetakan ke minggu ini");
    expect(text).not.toContain("## Jembatan ke OSN");
    expect(text).not.toContain("## Modul pendamping");
  });
});

describe("helpers", () => {
  test("smaModuleStatusLabel covers every status", () => {
    expect(smaModuleStatusLabel("draf")).toContain("DRAF");
    expect(smaModuleStatusLabel("ditinjau")).toContain("DRAF");
    expect(smaModuleStatusLabel("ditarik")).toContain("DITARIK");
    expect(smaModuleStatusLabel("disetujui")).toBe("disetujui");
  });

  test("smaWeekPlacement names the track or the foundation block", () => {
    expect(smaWeekPlacement(TRACK_WEEK)).toContain("Jalur A");
    expect(smaWeekPlacement({ ...TRACK_WEEK, track: null })).toContain("Blok fondasi bersama");
  });
});
