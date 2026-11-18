/**
 * Tests for `src/render/student-sheet.ts`'s `renderStudentSheet` (issue
 * #53): pure Markdown rendering of the learner sheet from validated corpus
 * data, checked against the real corpus.
 */

import { describe, expect, test } from "bun:test";
import { gateAfter, getWeek, listWeeks } from "../../src/domain/curriculum";
import { hintPolicyCallout } from "../../src/domain/pedagogy";
import { getTopicFamily } from "../../src/domain/topic-families";
import { RenderRequestError } from "../../src/render/errors";
import { referenceLines, renderStudentSheet } from "../../src/render/student-sheet";

const SOURCE = { name: "Silabus Uji", version: "9.9", date: "2030-01-02" };

describe("renderStudentSheet: content", () => {
  test("week 1 carries focus, content, outcome, families, practice target and footer", () => {
    const week = getWeek(1);
    const markdown = renderStudentSheet(1, SOURCE);
    expect(markdown).toContain("# Lembar Belajar Siswa -- Minggu 1");
    expect(markdown).toContain(`**Fokus:** ${week.focus}`);
    for (const item of week.content) {
      expect(markdown).toContain(`- ${item}`);
    }
    expect(markdown).toContain(week.outcome);
    for (const id of week.topicFamilies) {
      const family = getTopicFamily(id);
      expect(markdown).toContain(`### ${family.name}`);
      for (const item of family.coverage) {
        expect(markdown).toContain(`- ${item}`);
      }
    }
    expect(markdown).toContain(week.practice);
    expect(markdown).toContain("Jumlah soal: 6-10 soal");
    expect(markdown).toContain("Sumber: Silabus Uji, versi 9.9, tanggal 2030-01-02.");
  });

  test("a non-gate week has no gate section", () => {
    const markdown = renderStudentSheet(1, SOURCE);
    expect(markdown).not.toContain("Gerbang fase");
    expect(markdown).not.toContain("Bukti yang harus dikuasai");
  });

  test("a gate week lists the gate evidence", () => {
    const gate = gateAfter(4);
    expect(gate).toBeDefined();
    const markdown = renderStudentSheet(4, SOURCE);
    expect(markdown).toContain("## Gerbang fase setelah minggu 4");
    expect(markdown).toContain("Bukti yang harus dikuasai sebelum lanjut:");
    for (const item of gate?.evidence ?? []) {
      expect(markdown).toContain(`- ${item}`);
    }
  });

  test("quotes the hint-policy callout verbatim", () => {
    expect(renderStudentSheet(1, SOURCE)).toContain(`> ${hintPolicyCallout()}`);
  });

  test("the self-check list is blank: one empty box per content item plus the outcome", () => {
    const week = getWeek(2);
    const markdown = renderStudentSheet(2, SOURCE);
    const checklist = markdown.split("## Checklist mandiri\n")[1]?.split("\n\n")[0] ?? "";
    const boxes = checklist.split("\n");
    expect(boxes).toHaveLength(week.content.length + 1);
    for (const line of boxes) {
      expect(line.startsWith("- [ ] ")).toBe(true);
    }
    expect(markdown).not.toMatch(/\[[xX]\]/);
  });

  test("references are the de-duplicated citations of the week's families", () => {
    const week = getWeek(4);
    const expected = [...new Set(week.topicFamilies.flatMap((id) => getTopicFamily(id).citations))];
    const section = renderStudentSheet(4, SOURCE).split("## Rujukan\n")[1] ?? "";
    const ids = [...section.matchAll(/^- (R\d+): /gm)].map((match) => match[1]);
    expect(ids).toEqual(expected);
  });

  test("a simulation/contest week states there is no fixed problem count; mini contest is marked", () => {
    const markdown = renderStudentSheet(8, SOURCE);
    expect(markdown).toContain("tidak ada angka tetap");
    expect(markdown).toContain("Minggu ini ada mini contest.");
    expect(renderStudentSheet(1, SOURCE)).not.toContain("mini contest");
  });

  test("never contains identity fields (ADR-0004)", () => {
    for (const { week } of listWeeks()) {
      const markdown = renderStudentSheet(week, SOURCE);
      expect(markdown).not.toMatch(/\b(nama siswa|nama:|sekolah|NISN|nomor induk)\b/i);
    }
  });

  test("every week renders without unresolved placeholders", () => {
    for (const { week } of listWeeks()) {
      expect(renderStudentSheet(week, SOURCE)).not.toMatch(/\{\{|undefined|NaN|TODO/);
    }
  });
});

describe("referenceLines", () => {
  test("lists each reference in the given order with id, title and url", () => {
    const lines = referenceLines(["R2", "R1"]);
    expect(lines).toHaveLength(2);
    expect(lines[0]).toMatch(/^- R2: .+ <https:\/\/.+>$/);
    expect(lines[1]).toMatch(/^- R1: .+ <https:\/\/.+>$/);
  });

  test("states there are none when no citation is given", () => {
    expect(referenceLines([])).toEqual([
      "Tidak ada rujukan yang dikutip untuk rumpun materi minggu ini.",
    ]);
  });

  test("an unknown id fails loudly", () => {
    expect(() => referenceLines(["R999"])).toThrow();
  });
});

describe("renderStudentSheet: determinism and errors", () => {
  test("identical input yields byte-identical output", () => {
    expect(renderStudentSheet(12, SOURCE)).toBe(renderStudentSheet(12, SOURCE));
  });

  test.each([0, 29, -1, 1.5, Number.NaN])(
    "week %p throws RenderRequestError naming the range",
    (week) => {
      expect(() => renderStudentSheet(week, SOURCE)).toThrow(RenderRequestError);
      expect(() => renderStudentSheet(week, SOURCE)).toThrow("Valid range: 1-28");
    },
  );
});
