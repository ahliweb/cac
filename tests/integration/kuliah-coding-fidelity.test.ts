/**
 * Runs the transcription-fidelity check of `kuliah-coding` in-process so it
 * contributes to `bun test`, CI and the coverage gate:
 * `data/kuliah-coding/*.json` must match the owner-approved
 * `docs/programs/kuliah-coding/silabus.md` cell by cell, and any drift (in the
 * data or in the document) must fail.
 */

import { describe, expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import {
  checkKulFidelity,
  expectedCorpus,
  formatFidelityProblems,
  KUL_DATA_FILES,
  kuliahCodingFidelity,
  sectionLines,
  splitTableRow,
  tableRows,
} from "../../src/cli/fidelity/kuliah-coding";

const repoRoot = join(import.meta.dir, "..", "..");
const markdown = readFileSync(
  join(repoRoot, "docs", "programs", "kuliah-coding", "silabus.md"),
  "utf-8",
);

// biome-ignore lint/suspicious/noExplicitAny: fixture data is mutated freely
type Json = any;

function load(): Record<string, Json> {
  return Object.fromEntries(
    KUL_DATA_FILES.map((file) => [
      file,
      JSON.parse(readFileSync(join(repoRoot, "data", "kuliah-coding", file), "utf-8")),
    ]),
  );
}

const registry = JSON.parse(readFileSync(join(repoRoot, "data", "programs.json"), "utf-8")) as {
  programs: Array<{ id: string; syllabusVersion: string; syllabusDate: string }>;
};
const entry = registry.programs.find((program) => program.id === "kuliah-coding");

function contexts(files: Record<string, Json>, text = markdown): string[] {
  return checkKulFidelity(text, files, entry).map((problem) => problem.context);
}

describe("kuliah-coding fidelity: data/kuliah-coding vs. the approved silabus", () => {
  test("every cell of every data file matches the document", () => {
    const problems = checkKulFidelity(markdown, load(), entry);
    expect(problems).toEqual([]);
    expect(formatFidelityProblems(problems)).toContain("OK");
  });

  test("the module reads the repository and reports clean", async () => {
    const run = await kuliahCodingFidelity.run();
    expect(run.problems).toEqual([]);
    expect(run.message).toContain("check-kuliah-coding-fidelity: OK");
  });

  test("the registry entry carries the document's version and date", () => {
    expect(entry?.syllabusVersion).toBe("1.1.1");
    expect(entry?.syllabusDate).toBe("2026-11-19");
  });

  test("the derived corpus has the expected record counts", () => {
    const expected = expectedCorpus(markdown) as Record<string, Json>;
    expect(expected["tracks.json"].tracks).toHaveLength(3);
    expect(expected["courses.json"].courses).toHaveLength(24);
    expect(expected["knowledge-areas.json"].areas).toHaveLength(17);
    expect(expected["knowledge-areas.json"].gaps).toHaveLength(4);
    expect(expected["cpl.json"].competencyGroups).toHaveLength(4);
    expect(expected["cpl.json"].trackGroups).toHaveLength(3);
    expect(expected["ai-policy.json"].levels).toHaveLength(3);
    expect(expected["bridges.json"].fromSma).toHaveLength(5);
    expect(expected["bridges.json"].toWork).toHaveLength(4);
  });

  test("elective marker, prerequisite codes and CPMK splitting come from the document", () => {
    const courses = (expectedCorpus(markdown) as Record<string, Json>)["courses.json"]
      .courses as Array<Json>;
    const byCode = (code: string) => courses.find((c) => c.code === code);
    expect(byCode("KUL-I-306").elective).toBe(true);
    expect(byCode("KUL-I-306").name).toBe("Grafika dan Teknik Interaktif");
    expect(byCode("KUL-U-301").prerequisites).toEqual(["KUL-U-102", "KUL-U-201"]);
    expect(byCode("KUL-I-303").prerequisites).toEqual(["KUL-I-201"]);
    expect(byCode("KUL-U-101").cpmk).toHaveLength(4);
    expect(byCode("KUL-U-101").cpmk[3].code).toBe("KUL-U-101-C4");
    expect(byCode("KUL-I-102").cpmk).toHaveLength(3);
    expect(byCode("KUL-K-201").kaCodes).toEqual(["AL", "SDF"]);
  });

  test("v1.1 AI revision: AI-assisted engineering outcomes, strengthened policy, unchanged SKS", () => {
    const corpus = expectedCorpus(markdown) as Record<string, Json>;
    const courses = corpus["courses.json"].courses as Array<Json>;
    const byCode = (code: string) => courses.find((c) => c.code === code);
    expect(byCode("KUL-U-202").cpmk).toHaveLength(5);
    expect(byCode("KUL-U-202").sks).toBe(2);
    expect(byCode("KUL-I-204").cpmk).toHaveLength(4);
    expect(byCode("KUL-I-204").sks).toBe(3);
    expect(byCode("KUL-I-204").topics).toContain("SSDF dan SLSA");
    expect(byCode("KUL-I-401").cpmk).toHaveLength(4);
    for (const code of ["KUL-I-301", "KUL-I-303", "KUL-I-305"]) {
      expect(byCode(code).cpmk.length).toBeGreaterThanOrEqual(3);
    }
    const sks = courses.reduce((sum, c) => sum + (c.sks as number), 0);
    expect(sks).toBe(66);
    const levels = corpus["ai-policy.json"].levels as Array<Json>;
    expect(levels[0].rule).toContain("log pemakaian wajib");
    expect(levels[2].usedOnCourses).toEqual(["KUL-K-201", "KUL-K-301", "KUL-K-401"]);
    expect(corpus["ai-policy.json"].syllabusVersion).toBe("1.1.1");
  });
});

describe("kuliah-coding fidelity: drift fails hard", () => {
  test("a changed course cell is reported with its course code and field", () => {
    const files = load();
    files["courses.json"].courses[7].topics = "diubah diam-diam";
    const problems = checkKulFidelity(markdown, files, entry);
    expect(problems).toHaveLength(1);
    expect(problems[0]?.context).toBe("courses.json.courses[KUL-I-103].topics");
    expect(problems[0]?.actual).toContain("diam-diam");
  });

  test("a changed CPMK, SKS, semester and prerequisite are reported", () => {
    const files = load();
    files["courses.json"].courses[0].cpmk[0].text = "diubah";
    files["courses.json"].courses[1].sks = 4;
    files["courses.json"].courses[2].semester = "S4";
    files["courses.json"].courses[4].prerequisitesText = "tidak ada";
    expect(contexts(files)).toEqual([
      "courses.json.courses[KUL-U-101].cpmk[KUL-U-101-C1].text",
      "courses.json.courses[KUL-U-102].sks",
      "courses.json.courses[KUL-U-201].semester",
      "courses.json.courses[KUL-U-301].prerequisitesText",
    ]);
  });

  test("a dropped record is reported as a length mismatch", () => {
    const files = load();
    files["courses.json"].courses.pop();
    files["knowledge-areas.json"].areas.pop();
    expect(contexts(files)).toContain("courses.json.courses length");
    expect(contexts(files)).toContain("knowledge-areas.json.areas length");
  });

  test("a changed track, area, CPL, AI and bridge cell are reported", () => {
    const files = load();
    files["tracks.json"].tracks[1].sksText = "47 (inti 43)";
    files["knowledge-areas.json"].areas[0].supportText = "diubah";
    files["knowledge-areas.json"].gaps[0] = "diubah";
    files["cpl.json"].fillCell = "(diisi pengembang)";
    files["cpl.json"].trackGroups[0].groupText = "diubah";
    files["ai-policy.json"].levels[2].rule = "AI boleh";
    files["bridges.json"].fromSma[0].basis = "diubah";
    files["bridges.json"].toWork[0].note = "diubah";
    const found = contexts(files);
    expect(found).toContain("tracks.json.tracks[I].sksText");
    expect(found).toContain("knowledge-areas.json.areas[AL].supportText");
    expect(found).toContain("knowledge-areas.json.gaps[0]");
    expect(found).toContain("cpl.json.fillCell");
    expect(found).toContain("cpl.json.trackGroups[U].groupText");
    expect(found).toContain("ai-policy.json.levels[merah].rule");
    expect(found).toContain("bridges.json.fromSma[0].basis");
    expect(found).toContain("bridges.json.toWork[0].note");
  });

  test("a missing file and a registry that disagrees are reported", () => {
    const files = load();
    delete files["cpl.json"];
    const problems = checkKulFidelity(markdown, files, {
      syllabusVersion: "0.9.0",
      syllabusDate: "2020-01-01",
    });
    const found = problems.map((problem) => problem.context);
    expect(found).toContain("cpl.json");
    expect(found).toContain("programs.json[kuliah-coding].syllabusVersion");
    expect(found).toContain("programs.json[kuliah-coding].syllabusDate");
    expect(formatFidelityProblems(problems)).toContain("FAILED");
  });

  test("a change in the document itself is detected against unchanged data", () => {
    const edited = markdown.replace(
      "| KUL-U-102 | Analisis Data dengan Python | 3 |",
      "| KUL-U-102 | Analisis Data dengan R | 3 |",
    );
    expect(edited).not.toBe(markdown);
    // the block heading no longer agrees with the table row, which fails loudly
    expect(() => expectedCorpus(edited)).toThrow("disagrees with the table row");
    const retitled = edited.replace(
      "**KUL-U-102 Analisis Data dengan Python (3 SKS)**",
      "**KUL-U-102 Analisis Data dengan R (3 SKS)**",
    );
    expect(contexts(load(), retitled)).toContain("courses.json.courses[KUL-U-102].name");
  });

  test("a document that breaks the table shape or loses a section fails loudly", () => {
    const broken = markdown.replace(
      "| KUL-U-101 | Berpikir Komputasional dan Dasar Pemrograman | 3 | S1 | tidak ada |",
      "| KUL-U-101 | Berpikir Komputasional dan Dasar Pemrograman | 3 | S1 | x | tidak ada |",
    );
    expect(() => expectedCorpus(broken)).toThrow("expected 5 cells");
    expect(() => expectedCorpus(markdown.replace("### 6.3 ", "### 6.9 "))).toThrow("not found");
    expect(() => expectedCorpus(markdown.replace("- **Version:** v1.1.1", "- Version"))).toThrow(
      "header Version",
    );
  });

  test("a CPMK out of order, an unknown knowledge area and a missing bullet are refused", () => {
    const swapped = markdown.replace("C2 menulis program Python", "C3 menulis program Python");
    expect(() => expectedCorpus(swapped)).toThrow("out of order");
    const unknown = markdown.replace("- KA CS2023: SDF, AL (pengantar).", "- KA CS2023: SDF, ZZ.");
    expect(() => expectedCorpus(unknown)).toThrow('"ZZ" is not a CS2023 knowledge area code');
    const noBullet = markdown.replace("- Asesmen: kuis mingguan", "- Penilaian: kuis mingguan");
    expect(() => expectedCorpus(noBullet)).toThrow('bullet "Asesmen" not found');
  });

  test("a course level missing in the knowledge-area table is refused", () => {
    const edited = markdown.replace("KUL-I-203 (utama) | |", "KUL-I-203 | |");
    expect(edited).not.toBe(markdown);
    expect(() => expectedCorpus(edited)).toThrow("has no (utama|sebagian|pilihan) level");
  });
});

describe("Markdown helpers", () => {
  test("splitTableRow handles escaped pipes, code spans and edge pipes", () => {
    expect(splitTableRow("| a | b | c |")).toEqual(["a", "b", "c"]);
    expect(splitTableRow("| `x || y` | b |")).toEqual(["`x || y`", "b"]);
    expect(splitTableRow("| `\\|` | b |")).toEqual(["`|`", "b"]);
    expect(splitTableRow("| a | b \\|")).toEqual(["a", "b |"]);
  });

  test("sectionLines stops at the next heading of the same or higher level", () => {
    const text = "## A\nx\n### A1\ny\n## B\nz";
    expect(sectionLines(text, "## A")).toEqual(["x", "### A1", "y"]);
    expect(() => sectionLines(text, "## Q")).toThrow("not found");
  });

  test("tableRows picks the nth table and drops header and separator", () => {
    const lines = [
      "| h1 | h2 |",
      "| --- | --- |",
      "| a | b |",
      "",
      "| h3 | h4 |",
      "| --- | --- |",
      "| c | d |",
    ];
    expect(tableRows(lines)).toEqual([["a", "b"]]);
    expect(tableRows(lines, 1)).toEqual([["c", "d"]]);
    expect(() => tableRows(lines, 2)).toThrow("table number 3 not found");
  });
});
