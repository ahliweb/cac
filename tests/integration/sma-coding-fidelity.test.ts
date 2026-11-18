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
} from "../../src/cli/fidelity/sma-coding";

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
    expect(smaEntry?.syllabusVersion).toBe("1.3.1");
    expect(smaEntry?.syllabusDate).toBe("2026-11-19");
  });

  test("the derived corpus has the expected record counts", () => {
    const expected = expectedCorpus(markdown) as Record<string, Json>;
    expect(expected["cp-elements.json"].quotes).toHaveLength(6);
    expect(expected["cp-elements.json"].items).toHaveLength(36);
    expect(expected["tracks.json"].tracks).toHaveLength(5);
    expect(expected["weeks.json"].weeks).toHaveLength(364);
    expect(expected["foundation.json"].weeks).toHaveLength(7);
    expect(expected["cp-mapping.json"].mappings).toHaveLength(26);
    expect(expected["cp-mapping.json"].enrichmentLinks).toHaveLength(9);
    expect(expected["osn-bridge.json"].bridges).toHaveLength(10);
    expect(expected["osn-bridge.json"].trackBridges).toHaveLength(1);
    expect(expected["osn-bridge.json"].trackBridges[0].track).toBe("C");
    expect(expected["osn-bridge.json"].trackBridges[0].bridges).toHaveLength(4);
    expect(expected["structure.json"].rows).toHaveLength(7);
  });

  test("the cells with a literal pipe survive the transcription", () => {
    const weeks = load()["weeks.json"].weeks as Array<{ id: string; objective: string }>;
    expect(weeks.find((week) => week.id === "A-X1-M10")?.objective).toContain("`||`");
    expect(weeks.find((week) => week.id === "A-XI1-M3")?.objective).toContain("`|`");
  });
});

describe("sma-coding fidelity: drift fails hard", () => {
  test("a changed week cell is reported with its week code and field", () => {
    const files = load();
    files["weeks.json"].weeks[5].topic = "Topik yang diperbaiki diam-diam";
    const problems = checkSmaFidelity(markdown, files, smaEntry);
    expect(problems).toHaveLength(1);
    expect(problems[0]?.context).toBe("weeks.json.weeks[A-X1-M13].topic");
    expect(problems[0]?.actual).toContain("diperbaiki diam-diam");
  });

  test("a changed foundation week cell is reported with its FND week code and field", () => {
    const files = load();
    files["foundation.json"].weeks[2].objective = "diubah diam-diam";
    const problems = checkSmaFidelity(markdown, files, smaEntry);
    expect(problems).toHaveLength(1);
    expect(problems[0]?.context).toBe("foundation.json.weeks[FND-X1-M3].objective");
  });

  test("a dropped foundation week and a missing foundation file are reported", () => {
    const files = load();
    files["foundation.json"].weeks.pop();
    expect(checkSmaFidelity(markdown, files, smaEntry).map((problem) => problem.context)).toContain(
      "foundation.json.weeks length",
    );
    delete files["foundation.json"];
    expect(checkSmaFidelity(markdown, files, smaEntry).map((problem) => problem.context)).toContain(
      "foundation.json",
    );
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

  test("a drifted cell in each of jalur C, D and E is reported with its week code and field", () => {
    const files = load();
    const weeks = files["weeks.json"].weeks as Array<Record<string, string>>;
    const byId = (id: string) => weeks.find((week) => week.id === id) as Record<string, string>;
    byId("C-X1-M8").topic = "diubah diam-diam";
    byId("D-XI1-M2").objective = "diubah diam-diam";
    byId("E-XI1-M5").exercise = "diubah diam-diam";
    const contexts = checkSmaFidelity(markdown, files, smaEntry).map((problem) => problem.context);
    expect(contexts).toEqual([
      "weeks.json.weeks[C-X1-M8].topic",
      "weeks.json.weeks[D-XI1-M2].objective",
      "weeks.json.weeks[E-XI1-M5].exercise",
    ]);
  });

  test("a drifted enrichment link, track bridge, partial marker and track attribute are reported", () => {
    const files = load();
    files["cp-mapping.json"].enrichmentLinks[0].level = "diubah";
    files["cp-mapping.json"].mappings.find(
      (m: { cpCode: string }) => m.cpCode === "F-BK-c",
    ).partialTracks = [];
    files["osn-bridge.json"].trackBridges[0].bridges[0].note = "diubah";
    files["tracks.json"].tracks[4].startClass = "X";
    files["tracks.json"].tracks[3].cpStatus = "dalam-cp";
    const contexts = checkSmaFidelity(markdown, files, smaEntry).map((problem) => problem.context);
    expect(contexts).toContain("cp-mapping.json.enrichmentLinks[D/F-AD-a].level");
    expect(contexts).toContain("cp-mapping.json.mappings[F-BK-c].partialTracks length");
    expect(contexts).toContain("osn-bridge.json.trackBridges[C].bridges[dasar-pemrograman].note");
    expect(contexts).toContain("tracks.json.tracks[E].startClass");
    expect(contexts).toContain("tracks.json.tracks[D].cpStatus");
  });

  test("the per-track partial marker is read from the Jalur cell", () => {
    const mappings = (expectedCorpus(markdown) as Record<string, Json>)["cp-mapping.json"]
      .mappings as Array<{ cpCode: string; tracks: string[]; partialTracks: string[] }>;
    const row = (code: string) => mappings.find((m) => m.cpCode === code);
    expect(row("F-BK-d")?.tracks).toEqual(["B", "C"]);
    expect(row("F-BK-d")?.partialTracks).toEqual(["B"]);
    expect(row("F-LD-e")?.partialTracks).toEqual(["B", "C"]);
    expect(row("F-BK-c")?.partialTracks).toEqual(["C"]);
    expect(row("E-BK-a")?.partialTracks).toEqual([]);
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
    const edited = markdown.replace(
      "| M11 | Perulangan | memakai `for`",
      "| M11 | Perulangan satu | memakai `for`",
    );
    expect(edited).not.toBe(markdown);
    const problems = checkSmaFidelity(edited, load(), smaEntry);
    expect(problems.map((problem) => problem.context)).toContain(
      "weeks.json.weeks[A-X1-M11].topic",
    );
  });

  test("the v1.3 AI items are in the document and in the data, and drift in either is reported", () => {
    const aiWeeks = [
      "FND-X1-M6",
      "C-XI2-M2",
      "A-XII2-M5",
      "A-XII2-M6",
      "A-XII2-M7",
      "A-XII2-M8",
      "B-XI1-M5",
      "B-XI1-M12",
      "B-XII1-M10",
      "D-X2-M11",
      "D-XI2-M12",
      "D-XII1-M10",
    ];
    const files = load();
    const weeks = [...files["weeks.json"].weeks, ...files["foundation.json"].weeks] as Array<{
      id: string;
      objective: string;
      exercise: string;
      output: string;
    }>;
    for (const id of aiWeeks) {
      const week = weeks.find((w) => w.id === id);
      expect(week).toBeDefined();
      expect(`${week?.objective} ${week?.exercise} ${week?.output}`).toMatch(/AI|energi/);
    }
    // the superseded v1.2 rule must not survive in a week cell
    expect(weeks.find((w) => w.id === "D-X2-M11")?.exercise).not.toContain("tanpa akun murid");

    const driftedData = load();
    const row = driftedData["weeks.json"].weeks.find((w: { id: string }) => w.id === "B-XI1-M12");
    row.exercise = "tinjau PR teman";
    const contexts = checkSmaFidelity(markdown, driftedData, smaEntry).map((p) => p.context);
    expect(contexts).toContain("weeks.json.weeks[B-XI1-M12].exercise");

    const driftedDoc = markdown.replace(
      "tanpa AI (menyelesaikan ulang sendiri)",
      "boleh memakai AI",
    );
    expect(driftedDoc).not.toBe(markdown);
    expect(checkSmaFidelity(driftedDoc, load(), smaEntry).map((p) => p.context)).toContain(
      "weeks.json.weeks[A-XII2-M7].exercise",
    );
  });

  test("the AI policy section replaces the v1.2 rule and keeps the privacy limits", () => {
    expect(markdown).toContain("### 7.4 Kebijakan penggunaan AI");
    expect(markdown).toContain("bebas dengan etika");
    expect(markdown).toContain("### 9.4 Keputusan atas riset AI");
    expect(markdown).not.toContain("murid tidak\n  memakainya langsung");
    expect(markdown).toContain("ADR-0004");
  });

  test("a document that breaks the table shape fails loudly instead of passing", () => {
    const broken = markdown.replace(
      "| M11 | Perulangan | memakai",
      "| M11 | Perulangan | x | memakai",
    );
    expect(() => expectedCorpus(broken)).toThrow("expected 5 cells");
  });

  test("a foundation row outside its heading is refused", () => {
    const orphan = markdown.replace(/^#### FND-X1 .*$/m, "#### Fondasi");
    expect(() => expectedCorpus(orphan)).toThrow("outside its heading");
  });

  test("an unapproved track in bagian 3 is refused", () => {
    const unapproved = markdown.replace(
      "jalur A, B, C, D, dan E (v1.3,",
      "jalur A, B, C, D, dan F (v1.3,",
    );
    expect(unapproved).not.toBe(markdown);
    expect(() => expectedCorpus(unapproved)).toThrow("not approved");
  });

  test("a track heading that disagrees with the bagian 3.6 summary is refused", () => {
    const renamed = markdown.replace(
      "### 3.3 Jalur C: IoT dan Robotika",
      "### 3.3 Jalur C: Robotika",
    );
    expect(renamed).not.toBe(markdown);
    expect(() => expectedCorpus(renamed)).toThrow("does not match the bagian 3.6 summary");
  });

  test("an unknown relation to the CP in the bagian 3.6 summary is refused", () => {
    const odd = markdown.replace("| pengayaan di luar CP |", "| mungkin CP |");
    expect(() => expectedCorpus(odd)).toThrow("unknown relation");
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
