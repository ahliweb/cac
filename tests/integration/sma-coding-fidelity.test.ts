/**
 * Runs the same transcription-fidelity check as
 * `bun run check:sma-fidelity` in-process so it contributes to `bun test`,
 * CI and the coverage gate: `data/sma-coding/*.json` must match the
 * owner-approved `docs/programs/sma-coding/silabus.md` cell by cell, and any
 * drift (in the data or in the document) must fail.
 */

import { describe, expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import {
  checkSmaFidelity,
  expectedCorpus,
  firstTableRows,
  formatFidelityProblems,
  SMA_DATA_FILES,
  sectionLines,
  splitTableRow,
} from "../../scripts/check-sma-coding-fidelity";

const repoRoot = join(import.meta.dir, "..", "..");
const markdown = readFileSync(
  join(repoRoot, "docs", "programs", "sma-coding", "silabus.md"),
  "utf-8",
);

// biome-ignore lint/suspicious/noExplicitAny: fixture data is mutated freely
type Json = any;

function load(): Record<string, Json> {
  return Object.fromEntries(
    SMA_DATA_FILES.map((file) => [
      file,
      JSON.parse(readFileSync(join(repoRoot, "data", "sma-coding", file), "utf-8")),
    ]),
  );
}

const registry = JSON.parse(readFileSync(join(repoRoot, "data", "programs.json"), "utf-8")) as {
  programs: Array<{ id: string; syllabusVersion: string; syllabusDate: string }>;
};
const smaEntry = registry.programs.find((program) => program.id === "sma-coding");

describe("sma-coding fidelity: data/sma-coding vs. the approved silabus", () => {
  test("every cell of every data file matches the document", () => {
    const problems = checkSmaFidelity(markdown, load(), smaEntry);
    expect(problems).toEqual([]);
    expect(formatFidelityProblems(problems)).toContain("OK");
  });

  test("the registry entry exists and carries the document's version and date", () => {
    expect(smaEntry).toBeDefined();
    expect(smaEntry?.syllabusVersion).toBe("1.0.0");
    expect(smaEntry?.syllabusDate).toBe("2026-11-18");
  });

  test("the derived corpus has the expected record counts", () => {
    const expected = expectedCorpus(markdown) as Record<string, Json>;
    expect(expected["cp-elements.json"].quotes).toHaveLength(6);
    expect(expected["cp-elements.json"].items).toHaveLength(36);
    expect(expected["weeks.json"].weeks).toHaveLength(168);
    expect(expected["cp-mapping.json"].mappings).toHaveLength(24);
    expect(expected["osn-bridge.json"].bridges).toHaveLength(10);
    expect(expected["structure.json"].rows).toHaveLength(7);
  });

  test("the cells with a literal pipe survive the transcription", () => {
    const weeks = load()["weeks.json"].weeks as Array<{ id: string; objective: string }>;
    expect(weeks.find((week) => week.id === "A-X1-M8")?.objective).toContain("`||`");
    expect(weeks.find((week) => week.id === "A-X2-M12")?.objective).toContain("`|`");
  });
});

describe("sma-coding fidelity: drift fails hard", () => {
  test("a changed week cell is reported with its week code and field", () => {
    const files = load();
    files["weeks.json"].weeks[5].topic = "Topik yang diperbaiki diam-diam";
    const problems = checkSmaFidelity(markdown, files, smaEntry);
    expect(problems).toHaveLength(1);
    expect(problems[0]?.context).toBe("weeks.json.weeks[A-X1-M6].topic");
    expect(problems[0]?.actual).toContain("diperbaiki diam-diam");
  });

  test("a dropped record is reported as a length mismatch", () => {
    const files = load();
    files["cp-mapping.json"].mappings.pop();
    const contexts = checkSmaFidelity(markdown, files, smaEntry).map((problem) => problem.context);
    expect(contexts).toContain("cp-mapping.json.mappings length");
  });

  test("a changed CP quotation, CP label, structure cell, bridge note and track name are reported", () => {
    const files = load();
    files["cp-elements.json"].quotes[0].text += " tambahan";
    files["cp-elements.json"].items[0].label = "diubah";
    files["structure.json"].rows[3].value = "4 JP";
    files["structure.json"].load.jpPerSession = 4;
    files["osn-bridge.json"].bridges[0].note = "diubah";
    files["tracks.json"].tracks[0].name = "Jalur lain";
    const contexts = checkSmaFidelity(markdown, files, smaEntry).map((problem) => problem.context);
    expect(contexts).toContain("cp-elements.json.quotes[0].text");
    expect(contexts).toContain("cp-elements.json.items[E-BK-a].label");
    expect(contexts).toContain("structure.json.rows[alokasi-jp].value");
    expect(contexts).toContain("structure.json.load.jpPerSession");
    expect(contexts).toContain("osn-bridge.json.bridges[dasar-pemrograman].note");
    expect(contexts).toContain("tracks.json.tracks[A].name");
  });

  test("a normalised week list that no longer matches the document is reported", () => {
    const files = load();
    files["cp-mapping.json"].mappings[0].weeks.pop();
    const contexts = checkSmaFidelity(markdown, files, smaEntry).map((problem) => problem.context);
    expect(contexts).toContain("cp-mapping.json.mappings[E-BK-a].weeks length");
  });

  test("a missing file and a registry that disagrees are reported", () => {
    const files = load();
    delete files["tracks.json"];
    const problems = checkSmaFidelity(markdown, files, {
      syllabusVersion: "0.9.0",
      syllabusDate: "2020-01-01",
    });
    const contexts = problems.map((problem) => problem.context);
    expect(contexts).toContain("tracks.json");
    expect(contexts).toContain("programs.json[sma-coding].syllabusVersion");
    expect(contexts).toContain("programs.json[sma-coding].syllabusDate");
    expect(formatFidelityProblems(problems)).toContain("FAILED");
  });

  test("a change in the document itself is detected against unchanged data", () => {
    const edited = markdown.replace("| M6 | Perulangan I |", "| M6 | Perulangan satu |");
    expect(edited).not.toBe(markdown);
    const problems = checkSmaFidelity(edited, load(), smaEntry);
    expect(problems.map((problem) => problem.context)).toContain("weeks.json.weeks[A-X1-M6].topic");
  });

  test("a document that breaks the table shape fails loudly instead of passing", () => {
    const broken = markdown.replace(
      "| M6 | Perulangan I | memakai",
      "| M6 | Perulangan I | x | memakai",
    );
    expect(() => expectedCorpus(broken)).toThrow("expected 5 cells");
  });

  test("an unapproved track in bagian 3 is refused", () => {
    const unapproved = markdown.replace("jalur A dan B (issue #52)", "jalur A dan C (issue #52)");
    expect(() => expectedCorpus(unapproved)).toThrow("not approved");
  });
});

describe("Markdown helpers", () => {
  test("splitTableRow handles escaped pipes, code spans and edge pipes", () => {
    expect(splitTableRow("| a | b | c |")).toEqual(["a", "b", "c"]);
    expect(splitTableRow("| `x || y` | b |")).toEqual(["`x || y`", "b"]);
    expect(splitTableRow("| `&`, `\\|`, `^` | b |")).toEqual(["`&`, `|`, `^`", "b"]);
    expect(splitTableRow("| a | b \\|")).toEqual(["a", "b |"]);
  });

  test("sectionLines stops at the next heading of the same or higher level", () => {
    const text = "## A\nx\n### A1\ny\n## B\nz";
    expect(sectionLines(text, "## A")).toEqual(["x", "### A1", "y"]);
    expect(() => sectionLines(text, "## Q")).toThrow("not found");
  });

  test("firstTableRows drops the header and separator and stops at the table end", () => {
    const lines = [
      "text",
      "| h1 | h2 |",
      "| --- | --- |",
      "| a | b |",
      "| c | d |",
      "",
      "| e | f |",
    ];
    expect(firstTableRows(lines)).toEqual([
      ["a", "b"],
      ["c", "d"],
    ]);
    expect(() => firstTableRows(["no table"])).toThrow("no table found");
  });
});
