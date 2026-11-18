/**
 * Tests for `src/cli/format-sma-plan.ts`: the Markdown and JSON rendering of
 * a `SmaTrackPlan`, including the pengayaan note and the enrichment links of
 * a track outside the CP wording (silabus v1.2).
 */

import { describe, expect, test } from "bun:test";
import { formatSmaPlanJson, formatSmaPlanMarkdown } from "../../src/cli/format-sma-plan";
import type { SmaTrackPlan, SmaWeekView } from "../../src/domain/sma-plan";

const SOURCE = { name: "Silabus Uji", version: "1.2.0", date: "2026-11-19" };

function weekView(overrides: Partial<SmaWeekView> = {}): SmaWeekView {
  return {
    code: "D-XI1-M5",
    block: "jalur",
    track: { id: "D", name: "Jalur Pengayaan", cpStatus: "pengayaan" },
    kelas: "XI",
    semester: "XI1",
    phase: "F",
    week: 5,
    topic: "Topik lima",
    objective: "tujuan lima",
    output: "keluaran lima",
    exercise: "latihan lima",
    cpItems: [],
    enrichmentLinks: [],
    osnBridges: [],
    modules: [],
    ...overrides,
  };
}

function plan(cpStatus: "dalam-cp" | "pengayaan", weeks: SmaWeekView[]): SmaTrackPlan {
  return {
    track: {
      id: cpStatus === "pengayaan" ? "D" : "A",
      name: "Jalur Uji",
      tools: ["Python"],
      startClass: "X",
      cpStatus,
    },
    semesters: [
      {
        semester: "XI1",
        kelas: "XI",
        phase: "F",
        foundation: [],
        weeks,
      },
    ],
  };
}

describe("formatSmaPlanMarkdown", () => {
  test("a pengayaan track states it is outside the CP and lists enrichment links, not coverage", () => {
    const text = formatSmaPlanMarkdown(
      plan("pengayaan", [
        weekView({
          enrichmentLinks: [
            { code: "F-AD-a", label: "data terbuka", level: "Sedang." },
            { code: "F-AP-d", label: "library", level: "Rendah." },
          ],
        }),
      ]),
      { kelas: undefined, semester: "XI1" },
      SOURCE,
    );
    expect(text).toContain(
      "Catatan: jalur D adalah pengayaan di luar rumusan CP; tidak dihitung sebagai pemenuhan butir CP.",
    );
    expect(text).toContain("- **Butir CP:** tidak ada butir CP yang dipetakan");
    expect(text).toContain(
      "- **Irisan dengan CP (pengayaan, tidak dihitung pemenuhan CP):** F-AD-a (data terbuka); tingkat: Sedang. | F-AP-d (library); tingkat: Rendah.",
    );
  });

  test("a counted track has no pengayaan note and shows partial CP items, bridges and modules", () => {
    const text = formatSmaPlanMarkdown(
      plan("dalam-cp", [
        weekView({
          code: "A-XI1-M5",
          track: { id: "A", name: "Jalur Uji", cpStatus: "dalam-cp" },
          cpItems: [
            { code: "E-BK-a", label: "label a", partial: true },
            { code: "E-BK-b", label: "label b", partial: false },
          ],
          osnBridges: [
            { familyId: "rekursi", topics: "topik", note: "Sesuai CP.", hasEnrichment: false },
          ],
          modules: [{ id: "m-1", title: "Modul satu", status: "draf" }],
        }),
      ]),
      { kelas: "XI", semester: undefined },
      SOURCE,
    );
    expect(text).not.toContain("pengayaan di luar rumusan CP");
    expect(text).toContain("Cakupan: kelas XI");
    expect(text).toContain("E-BK-a (parsial) (label a); E-BK-b (label b)");
    expect(text).toContain("- **Jembatan OSN:** rekursi -- topik. Catatan: Sesuai CP.");
    expect(text).toContain("- **Modul:** m-1 -- Modul satu (DRAF, belum ditinjau)");
    expect(text).not.toContain("Irisan dengan CP");
  });

  test("the foundation block precedes the track weeks of a semester", () => {
    const foundation = weekView({
      code: "FND-X1-M1",
      block: "fondasi",
      track: null,
      kelas: "X",
      semester: "X1",
      phase: "E",
      week: 1,
    });
    const text = formatSmaPlanMarkdown(
      {
        ...plan("dalam-cp", [weekView({ code: "A-X1-M8", week: 8 })]),
        semesters: [
          {
            semester: "X1",
            kelas: "X",
            phase: "E",
            foundation: [foundation],
            weeks: [weekView({ code: "A-X1-M8", week: 8 })],
          },
        ],
      },
      { kelas: undefined, semester: undefined },
      SOURCE,
    );
    expect(text).toContain("Cakupan: semua semester (kelas X sampai XII)");
    expect(text.indexOf("FND-X1-M1")).toBeLessThan(text.indexOf("A-X1-M8"));
    expect(text).toContain("### Minggu jalur A");
  });
});

describe("formatSmaPlanJson", () => {
  test("carries the scope, source and the track's startClass and cpStatus", () => {
    const json = JSON.parse(
      formatSmaPlanJson(
        plan("pengayaan", [weekView()]),
        { kelas: "XI", semester: undefined },
        SOURCE,
      ),
    ) as {
      syllabusVersion: string;
      scope: { kelas: string | null; semester: string | null };
      track: { cpStatus: string; startClass: string };
    };
    expect(json.syllabusVersion).toBe("1.2.0");
    expect(json.scope).toEqual({ kelas: "XI", semester: null });
    expect(json.track).toMatchObject({ cpStatus: "pengayaan", startClass: "X" });
  });
});
