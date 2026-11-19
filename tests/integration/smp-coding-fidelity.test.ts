/**
 * Runs the transcription-fidelity check for `smp-coding` in-process so it
 * contributes to `bun test`, CI and the coverage gate:
 * `data/smp-coding/*.json` must match the owner-approved
 * `docs/programs/smp-coding/silabus.md` cell by cell, and any drift (in the
 * data or in the document) must fail. Drift is simulated in memory; no
 * committed file is changed.
 */

import { describe, expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import {
  checkSmpFidelity,
  expectedCorpus,
  firstParagraph,
  firstTableRows,
  formatFidelityProblems,
  SMP_DATA_FILES,
  sectionLines,
  smpCodingFidelity,
  splitTableRow,
} from "../../src/cli/fidelity/smp-coding";

const repoRoot = join(import.meta.dir, "..", "..");
const markdown = readFileSync(
  join(repoRoot, "docs", "programs", "smp-coding", "silabus.md"),
  "utf-8",
);

// biome-ignore lint/suspicious/noExplicitAny: fixture data is mutated freely
type Json = any;

function load(): Record<string, Json> {
  return Object.fromEntries(
    SMP_DATA_FILES.map((file) => [
      file,
      JSON.parse(readFileSync(join(repoRoot, "data", "smp-coding", file), "utf-8")),
    ]),
  );
}

const registry = JSON.parse(readFileSync(join(repoRoot, "data", "programs.json"), "utf-8")) as {
  programs: Array<{ id: string; syllabusVersion: string; syllabusDate: string }>;
};
const smpEntry = registry.programs.find((program) => program.id === "smp-coding");

describe("smp-coding fidelity: data/smp-coding vs. the approved silabus", () => {
  test("every cell of every data file matches the document", () => {
    const problems = checkSmpFidelity(markdown, load(), smpEntry);
    expect(problems).toEqual([]);
    expect(formatFidelityProblems(problems)).toContain("OK");
  });

  test("the module registered in the programme table passes on the real repository", async () => {
    const run = await smpCodingFidelity.run();
    expect(run.problems).toEqual([]);
    expect(run.message).toContain("check-smp-coding-fidelity: OK");
  });

  test("the registry entry exists and carries the document's version and date", () => {
    expect(smpEntry).toBeDefined();
    expect(smpEntry?.syllabusVersion).toBe("1.2.0");
    expect(smpEntry?.syllabusDate).toBe("2026-11-19");
    expect(registry.programs.find((p) => p.id === "smp-coding")).toMatchObject({
      sourceDocument: "docs/programs/smp-coding/silabus.md",
      corpusDir: "data/smp-coding",
    });
  });

  test("the derived corpus has the expected record counts", () => {
    const expected = expectedCorpus(markdown) as Record<string, Json>;
    expect(expected["cp-elements.json"].quotes).toHaveLength(6);
    expect(expected["cp-elements.json"].items).toHaveLength(35);
    expect(expected["structure.json"].rows).toHaveLength(10);
    expect(expected["structure.json"].semesters).toHaveLength(6);
    expect(expected["weeks.json"].weeks).toHaveLength(84);
    expect(expected["cp-mapping.json"].mappings).toHaveLength(35);
    expect(expected["cp-mapping.json"].enrichment).toHaveLength(3);
    expect(expected["uncovered.json"].items).toHaveLength(11);
    expect(expected["club.json"].stages).toHaveLength(3);
    expect(expected["bridge.json"].toSma).toHaveLength(6);
  });

  test("the Python overlap marker and pengayaan survive the transcription", () => {
    const weeks = load()["weeks.json"].weeks as Json[];
    const m1 = weeks.find((week) => week.id === "SMP8-2-M1");
    expect(m1.cpText).toBe("DK-BK-c*, D-BK-e");
    expect(m1.cpCodes).toEqual(["D-BK-e"]);
    expect(m1.irisanCodes).toEqual(["DK-BK-c"]);
    const m14 = weeks.find((week) => week.id === "SMP7-2-M14");
    expect(m14.enrichment).toBe(true);
    expect(m14.cpCodes).toEqual(["D-BK-e", "DK-BK-c"]);
  });
});

describe("smp-coding fidelity: drift fails hard", () => {
  test("a changed week cell is reported with its week code and field", () => {
    const files = load();
    files["weeks.json"].weeks[5].topic = "Topik yang diperbaiki diam-diam";
    const problems = checkSmpFidelity(markdown, files, smpEntry);
    expect(problems).toHaveLength(1);
    expect(problems[0]?.context).toBe("weeks.json.weeks[SMP7-1-M6].topic");
    expect(problems[0]?.actual).toContain("diperbaiki diam-diam");
  });

  test("the v1.1 AI items (SMP9-2-M10, SMP8-2-M11) cannot be dropped silently from the data", () => {
    const files = load();
    const m10 = files["weeks.json"].weeks.find((w: Json) => w.id === "SMP9-2-M10");
    const m11 = files["weeks.json"].weeks.find((w: Json) => w.id === "SMP8-2-M11");
    expect(m10.topic).toContain("mengalihkan pekerjaan berpikir ke AI");
    expect(m11.topic).toContain("tidak ditempel ke layanan AI");
    m10.topic = m10.topic.replace(", mengalihkan pekerjaan berpikir ke AI", "");
    m11.topic = m11.topic.replace("; data pribadi dan kata sandi tidak ditempel ke layanan AI", "");
    const contexts = checkSmpFidelity(markdown, files, smpEntry).map((p) => p.context);
    expect(contexts).toContain("weeks.json.weeks[SMP9-2-M10].topic");
    expect(contexts).toContain("weeks.json.weeks[SMP8-2-M11].topic");
  });

  test("the silabus keeps the AI policy section (7.1)", () => {
    expect(markdown).toContain("### 7.1 Kebijakan penggunaan AI");
    expect(markdown).toContain("Demonstrasi guru, tanpa akun murid");
  });

  test("a Python overlap silently promoted to coverage is reported", () => {
    const files = load();
    const week = files["weeks.json"].weeks.find((w: Json) => w.id === "SMP8-2-M1");
    week.cpCodes.push("DK-BK-c");
    week.irisanCodes = [];
    const problems = checkSmpFidelity(markdown, files, smpEntry);
    expect(problems.map((p) => p.context)).toContain("weeks.json.weeks[SMP8-2-M1].cpCodes length");
    expect(problems.map((p) => p.context)).toContain(
      "weeks.json.weeks[SMP8-2-M1].irisanCodes length",
    );
  });

  test("a changed CP quotation, label, structure value and registry version are reported", () => {
    const files = load();
    files["cp-elements.json"].quotes[2].text += " (diubah)";
    files["cp-elements.json"].items[0].label = "label lain";
    files["structure.json"].load.jpPerWeek = 3;
    const problems = checkSmpFidelity(markdown, files, {
      syllabusVersion: "9.9",
      syllabusDate: "2026-01-01",
    });
    const contexts = problems.map((p) => p.context);
    expect(contexts).toContain("cp-elements.json.quotes[2].text");
    expect(contexts).toContain("cp-elements.json.items[D-BK-a].label");
    expect(contexts).toContain("structure.json.load.jpPerWeek");
    expect(contexts).toContain("programs.json[smp-coding].syllabusVersion");
    expect(contexts).toContain("programs.json[smp-coding].syllabusDate");
  });

  test("a changed coverage, uncovered item, club stage or bridge row is reported", () => {
    const files = load();
    files["cp-mapping.json"].mappings[1].coverage = "penuh";
    files["uncovered.json"].items.pop();
    files["club.json"].stages[0].content = "isi lain";
    files["bridge.json"].toSma[2].smaTracks = ["A"];
    const contexts = checkSmpFidelity(markdown, files, smpEntry).map((p) => p.context);
    expect(contexts).toContain("cp-mapping.json.mappings[D-BK-b].coverage");
    expect(contexts).toContain("uncovered.json.items length");
    expect(contexts).toContain("club.json.stages[7].content");
    expect(contexts.some((c) => /^bridge\.json\.toSma\[.+\]\.smaTracks length$/.test(c))).toBe(
      true,
    );
  });

  test("a missing data file is reported", () => {
    const files = load();
    delete files["uncovered.json"];
    const problems = checkSmpFidelity(markdown, files, smpEntry);
    expect(problems).toEqual([
      { context: "uncovered.json", expected: "(file present)", actual: "(file missing)" },
    ]);
    expect(formatFidelityProblems(problems)).toContain("FAILED -- 1 mismatch(es)");
  });

  test("a change in the document is caught by the data (the document is the source)", () => {
    const edited = markdown.replace(
      "| SMP7-1-M1 | Apa itu komputasi: instruksi sehari-hari dan ketepatan |",
      "| SMP7-1-M1 | Apa itu komputasi, direvisi |",
    );
    expect(edited).not.toBe(markdown);
    const problems = checkSmpFidelity(edited, load(), smpEntry);
    expect(problems.map((p) => p.context)).toEqual(["weeks.json.weeks[SMP7-1-M1].topic"]);
  });
});

describe("smp-coding fidelity: the document must keep the statements the data relies on", () => {
  test("an unapproved status line is refused", () => {
    const draft = markdown.replace(/^- \*\*Status:\*\* DISETUJUI/m, "- **Status:** DRAF");
    expect(() => expectedCorpus(draft)).toThrow("Status line");
  });

  test("the club must still say it is not counted as CP coverage", () => {
    const edited = markdown.replace(/tidak dihitung sebagai\s+pemenuhan\s+butir\s+CP/g, "dihitung");
    expect(() => expectedCorpus(edited)).toThrow("not counted as CP coverage");
  });

  test("the owner decisions Q10 and Q11 must still back the closure of the uncovered items", () => {
    expect(() =>
      expectedCorpus(
        markdown.replace("Ditutup lewat modul pendamping", "Ditutup lewat Informatika"),
      ),
    ).toThrow("Q10 no longer decides on a modul pendamping");
    expect(() =>
      expectedCorpus(markdown.replaceAll("hanya didemonstrasikan guru", "bebas")),
    ).toThrow("Q11 no longer decides on a teacher demonstration");
    expect(() => expectedCorpus(markdown.replace("| Q11 |", "| Q99 |"))).toThrow(
      "bagian 10 has no decision row Q11",
    );
  });

  test("a malformed table cell, week notation or coverage is refused", () => {
    expect(() => expectedCorpus(markdown.replace("| Penuh |", "| Entah |"))).toThrow(
      "unknown coverage",
    );
    expect(() =>
      expectedCorpus(markdown.replace("| D-BK-e, DK-BK-c* |", "| D-BK-e, X-BK-c* |")),
    ).toThrow("cannot parse CP cell token");
    expect(() => expectedCorpus(markdown.replace("| Kelas dan fase |", "| Kelas |"))).toThrow(
      "unknown bagian 2 row",
    );
    expect(() => expectedCorpus(markdown.replace("### 5.2 Ke SMA", "### 5.2x Ke SMA"))).toThrow(
      "heading",
    );
  });

  test("the Markdown helpers handle escaped pipes, code spans and missing sections", () => {
    expect(splitTableRow("| a | `b | c` | d\\|e |")).toEqual(["a", "`b | c`", "d|e"]);
    expect(sectionLines("# A\n\n## B\nx\n## C\ny", "## B")).toEqual(["x"]);
    expect(firstParagraph(["", "satu", "dua", "", "tiga"])).toBe("satu dua");
    expect(firstTableRows(["x", "| h |", "| --- |", "| a |", "", "| b |"])).toEqual([["a"]]);
    expect(() => sectionLines("# A", "## Tidak ada")).toThrow("not found");
    expect(() => firstTableRows(["tanpa tabel"])).toThrow("no table found");
    expect(() => firstParagraph(["", " "])).toThrow("no paragraph found");
  });
});
