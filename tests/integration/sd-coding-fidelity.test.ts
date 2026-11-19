/**
 * Runs the transcription-fidelity check of `sd-coding`
 * (`bun run check:fidelity --program sd-coding`) in-process so it
 * contributes to `bun test`, CI and the coverage gate:
 * `data/sd-coding/*.json` must match the owner-approved
 * `docs/programs/sd-coding/silabus.md` cell by cell, and any drift (in the
 * data or in the document) must fail.
 */

import { describe, expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import {
  allTableRows,
  checkSdFidelity,
  expectedCorpus,
  firstTableRows,
  formatFidelityProblems,
  paragraphsOf,
  SD_DATA_FILES,
  sdCodingFidelity,
  sectionLines,
  splitTableRow,
} from "../../src/cli/fidelity/sd-coding";
import { runFidelityCheck } from "../../src/cli/fidelity-runner";

const repoRoot = join(import.meta.dir, "..", "..");
const markdown = readFileSync(
  join(repoRoot, "docs", "programs", "sd-coding", "silabus.md"),
  "utf-8",
);

// biome-ignore lint/suspicious/noExplicitAny: fixture data is mutated freely
type Json = any;

function load(): Record<string, Json> {
  return Object.fromEntries(
    SD_DATA_FILES.map((file) => [
      file,
      JSON.parse(readFileSync(join(repoRoot, "data", "sd-coding", file), "utf-8")),
    ]),
  );
}

const registry = JSON.parse(readFileSync(join(repoRoot, "data", "programs.json"), "utf-8")) as {
  programs: Array<{ id: string; syllabusVersion: string; syllabusDate: string }>;
};
const sdEntry = registry.programs.find((program) => program.id === "sd-coding");

function contexts(files: Record<string, Json>, text: string = markdown): string[] {
  return checkSdFidelity(text, files, sdEntry).map((problem) => problem.context);
}

describe("sd-coding fidelity: data/sd-coding vs. the approved silabus", () => {
  test("every cell of every data file matches the document", () => {
    const problems = checkSdFidelity(markdown, load(), sdEntry);
    expect(problems).toEqual([]);
    expect(formatFidelityProblems(problems)).toContain("OK");
  });

  test("the programme table's module and the runner agree: exit 0, OK line", async () => {
    const run = await sdCodingFidelity.run();
    expect(run.problems).toEqual([]);
    let out = "";
    let err = "";
    const code = await runFidelityCheck(["--program", "sd-coding"], {
      stdout: (text) => {
        out += text;
      },
      stderr: (text) => {
        err += text;
      },
    });
    expect(code).toBe(0);
    expect(out).toContain("check-sd-coding-fidelity: OK");
    expect(err).toBe("");
  });

  test("the registry entry exists and carries the document's version and date", () => {
    expect(sdEntry).toBeDefined();
    expect(sdEntry?.syllabusVersion).toBe("1.1.0");
    expect(sdEntry?.syllabusDate).toBe("2026-11-19");
  });

  test("the derived corpus has the expected record counts", () => {
    const expected = expectedCorpus(markdown) as Record<string, Json>;
    expect(expected["cp-elements.json"].quotes).toHaveLength(4);
    expect(expected["cp-elements.json"].items).toHaveLength(16);
    expect(expected["structure.json"].stages).toHaveLength(3);
    expect(expected["structure.json"].rows).toHaveLength(8);
    expect(expected["weeks.json"].weeks).toHaveLength(168);
    expect(expected["cp-mapping.json"].mappings).toHaveLength(16);
    expect(expected["bridges.json"].bridges).toHaveLength(3);
    expect(expected["bridges.json"].osn.findings).toHaveLength(3);
    expect(expected["bridges.json"].osn.enrichmentWeeks).toEqual(["SD3-1-M7", "SD3-1-M8"]);
  });

  test("CP quotations carry the SK wording, not the BGTK page's", () => {
    const quotes = load()["cp-elements.json"].quotes as Array<{ elementId: string; text: string }>;
    const ld = quotes.find((quote) => quote.elementId === "LD")?.text ?? "";
    expect(ld).toContain("manfaat, dan dampak teknologi digital");
    expect(ld).toContain("tingkat pradasar");
    expect(quotes.find((quote) => quote.elementId === "PP")?.text).toStartWith("Menyimulasikan");
    expect(quotes.every((quote) => !quote.text.includes("murid mampu"))).toBe(true);
  });

  test("the markers and the Butir cell are read: [penguatan], [opsi layar], P-, menuju, element level", () => {
    const weeks = load()["weeks.json"].weeks as Array<Record<string, Json>>;
    const byId = (id: string) => weeks.find((w) => w.id === id) as Record<string, Json>;
    expect(weeks.filter((w) => w.strengthening)).toHaveLength(16);
    expect(weeks.filter((w) => w.screenOption).map((w) => w.id)).toEqual(["SD6-1-M7", "SD6-1-M9"]);
    expect(byId("SD4-1-M2").introduces).toEqual(["P-BK"]);
    expect(byId("SD4-1-M2").leadsTo).toEqual(["C-BK-b"]);
    expect(byId("SD4-2-M14").introduces).toEqual(["P-BK", "P-LD"]);
    expect(byId("SD5-2-M14").cpElements).toEqual(["LE", "PP"]);
    expect(byId("SD6-2-M7").cpItems).toEqual(["C-PP-c", "C-LE-e"]);
  });

  test("the cells with a backtick marker survive the transcription verbatim", () => {
    const weeks = load()["weeks.json"].weeks as Array<{ id: string; topic: string }>;
    expect(weeks.find((w) => w.id === "SD6-1-M9")?.topic).toBe(
      "`[penguatan]` `[opsi layar]` Instruksi di layar dengan blok",
    );
  });
});

describe("sd-coding fidelity: v1.1 bridges (#177)", () => {
  test("the bridges are placement in the class, not a prerequisite chain, and name what is not guaranteed", () => {
    const expected = expectedCorpus(markdown) as Record<string, Json>;
    const file = expected["bridges.json"];
    expect(file.intro).toContain(
      "tidak satu pun dari ketiga program mewajibkan program tetangganya",
    );
    expect(file.intro).not.toContain("disusun sebelum keduanya dibaca");
    const [fromTk, toSmp, toSma] = file.bridges;
    expect(fromTk.id).toBe("tk-ke-kelas-1");
    expect(fromTk.text).toContain("tanpa tes, tanpa nilai angka");
    expect(fromTk.text).toContain("`SD1-2-M8`, `SD1-2-M9`) tidak dipadatkan");
    expect(toSmp.id).toBe("kelas-6-ke-smp");
    expect(toSmp.text).toContain("Yang tidak dijamin oleh kelas 5-6");
    expect(toSmp.text).toContain("`SD6-1-M9` dan `SD6-1-M10`");
    expect(toSma.id).toBe("ke-sma");
  });
});

describe("sd-coding fidelity: drift fails hard", () => {
  test("a changed week cell is reported with its week code and field", () => {
    const files = load();
    files["weeks.json"].weeks[100].topic = "Topik yang diperbaiki diam-diam";
    const problems = checkSdFidelity(markdown, files, sdEntry);
    expect(problems).toHaveLength(1);
    expect(problems[0]?.context).toBe(
      `weeks.json.weeks[${files["weeks.json"].weeks[100].id}].topic`,
    );
    expect(problems[0]?.actual).toContain("diperbaiki diam-diam");
  });

  test("a dropped week and a dropped record are reported as length mismatches", () => {
    const files = load();
    files["weeks.json"].weeks.pop();
    files["cp-mapping.json"].mappings.pop();
    files["cp-elements.json"].items.pop();
    expect(contexts(files)).toEqual(
      expect.arrayContaining([
        "weeks.json.weeks length",
        "cp-mapping.json.mappings length",
        "cp-elements.json.items length",
      ]),
    );
  });

  test("a changed CP quotation, CP label, structure cell and stage field are reported", () => {
    const files = load();
    files["cp-elements.json"].quotes[1].text += " tambahan";
    files["cp-elements.json"].items[0].label = "diubah";
    files["structure.json"].rows[4].value = "diubah";
    files["structure.json"].stages[2].jpPerWeek = 4;
    files["structure.json"].jpLoad[0].allocated = 99;
    files["structure.json"].weeksPerYear[1].reserve = 9;
    const found = contexts(files);
    expect(found).toContain("cp-elements.json.quotes[LD].text");
    expect(found).toContain("cp-elements.json.items[C-BK-a].label");
    expect(found).toContain("structure.json.rows[pola-semester].value");
    expect(found).toContain("structure.json.stages[3].jpPerWeek");
    expect(found).toContain("structure.json.jpLoad[5].allocated");
    expect(found).toContain("structure.json.weeksPerYear[1].reserve");
  });

  test("a P- introduction silently turned into CP coverage in the data is reported", () => {
    const files = load();
    const target = files["weeks.json"].weeks.find((w: { id: string }) => w.id === "SD4-1-M1");
    target.introduces = [];
    target.cpItems = ["C-BK-a"];
    const found = contexts(files);
    expect(found).toContain("weeks.json.weeks[SD4-1-M1].introduces length");
    expect(found).toContain("weeks.json.weeks[SD4-1-M1].cpItems length");
  });

  test("a changed mapping row, normalised week list, bridge paragraph and OSN statement are reported", () => {
    const files = load();
    files["cp-mapping.json"].mappings[0].weeksText = "SD5-1-M1";
    files["cp-mapping.json"].mappings[1].weeks.pop();
    files["bridges.json"].bridges[0].text += " tambahan";
    files["bridges.json"].intro = "diubah";
    files["bridges.json"].osn.statement = "ada jembatan OSN";
    files["bridges.json"].osn.findings.pop();
    files["bridges.json"].osn.enrichmentWeeks = ["SD3-1-M7"];
    const found = contexts(files);
    expect(found).toContain("cp-mapping.json.mappings[C-BK-a].weeksText");
    expect(found).toContain("cp-mapping.json.mappings[C-BK-b].weeks length");
    expect(found).toContain("bridges.json.bridges[tk-ke-kelas-1].text");
    expect(found).toContain("bridges.json.intro");
    expect(found).toContain("bridges.json.osn.statement");
    expect(found).toContain("bridges.json.osn.findings length");
    expect(found).toContain("bridges.json.osn.enrichmentWeeks length");
  });

  test("a missing file and a registry that disagrees are reported", () => {
    const files = load();
    delete files["structure.json"];
    const problems = checkSdFidelity(markdown, files, {
      syllabusVersion: "0.9.0",
      syllabusDate: "2020-01-01",
    });
    const found = problems.map((problem) => problem.context);
    expect(found).toContain("structure.json");
    expect(found).toContain("programs.json[sd-coding].syllabusVersion");
    expect(found).toContain("programs.json[sd-coding].syllabusDate");
    expect(formatFidelityProblems(problems)).toContain("FAILED");
  });

  test("a change in the document itself is detected against unchanged data", () => {
    const edited = markdown.replace(
      "| SD1-1-M2 | Urutan kegiatan sehari-hari |",
      "| SD1-1-M2 | Urutan kegiatan malam hari |",
    );
    expect(edited).not.toBe(markdown);
    expect(contexts(load(), edited)).toContain("weeks.json.weeks[SD1-1-M2].topic");
  });

  test("a changed CP quotation in the document is detected (the SK wording is pinned)", () => {
    const edited = markdown.replace(
      "tingkat pradasar, menerapkan",
      "tingkat pra dasar, menerapkan",
    );
    expect(edited).not.toBe(markdown);
    expect(contexts(load(), edited)).toContain("cp-elements.json.quotes[LD].text");
  });

  test("a document that breaks the table shape or a cell notation fails loudly", () => {
    const wide = markdown.replace(
      "| SD1-1-M2 | Urutan kegiatan sehari-hari | P-BK |",
      "| SD1-1-M2 | Urutan kegiatan sehari-hari | x | P-BK |",
    );
    expect(() => expectedCorpus(wide)).toThrow("expected 4 cells");
    const badItem = markdown.replace(
      "| SD1-1-M2 | Urutan kegiatan sehari-hari | P-BK |",
      "| SD1-1-M2 | Urutan kegiatan sehari-hari | X-BK |",
    );
    expect(() => expectedCorpus(badItem)).toThrow("cannot parse item reference");
    const misplaced = markdown.replace("| SD1-1-M2 |", "| SD2-1-M2 |");
    expect(() => expectedCorpus(misplaced)).toThrow("sits under kelas 1 semester 1");
  });

  test("an unknown CP element and an unknown structure row are refused", () => {
    const element = markdown.replace("*1.2 Literasi Digital*", "*1.2 Literasi Lain*");
    expect(() => expectedCorpus(element)).toThrow("unknown CP element");
    const row = markdown.replace("| Perangkat |", "| Peralatan |");
    expect(() => expectedCorpus(row)).toThrow("unknown bagian 2 row");
  });

  test("structure cells that no longer parse are refused", () => {
    const hours = markdown.replace("1 JP (35 menit)", "satu JP");
    expect(() => expectedCorpus(hours)).toThrow("hours");
    const pola = markdown.replace("M13 proyek mini", "M13 proyek");
    expect(() => expectedCorpus(pola)).toThrow("pola semester");
    const beban = markdown.replace("28 minggu x 2 JP = 56 dari 72 JP", "banyak");
    expect(() => expectedCorpus(beban)).toThrow("beban JP");
    const cadangan = markdown.replace("28 terpakai, 8 cadangan", "banyak");
    expect(() => expectedCorpus(cadangan)).toThrow("minggu cadangan");
    const semester = markdown.replace("| Dua per kelas |", "| Banyak per kelas |");
    expect(() => expectedCorpus(semester)).toThrow("number word");
  });

  test("a bridge section the table does not know, and an OSN statement that is not 'tidak ada', are refused", () => {
    const section = markdown.replace("### 7.3 Ke SMA", "### 7.4 Ke SMA");
    expect(() => expectedCorpus(section)).toThrow("unknown bridge section");
    const osn = markdown.replace("**tidak ada jembatan OSN untuk SD.**", "**ada jembatan OSN.**");
    expect(() => expectedCorpus(osn)).toThrow('not a "tidak ada" statement');
  });
});

describe("Markdown helpers", () => {
  test("splitTableRow handles escaped pipes, code spans and edge pipes", () => {
    expect(splitTableRow("| a | b | c |")).toEqual(["a", "b", "c"]);
    expect(splitTableRow("| `x || y` | b |")).toEqual(["`x || y`", "b"]);
    expect(splitTableRow("| a | b \\|")).toEqual(["a", "b |"]);
  });

  test("sectionLines stops at the next heading of the same or higher level", () => {
    const text = "## A\nx\n### A1\ny\n## B\nz";
    expect(sectionLines(text, "## A")).toEqual(["x", "### A1", "y"]);
    expect(() => sectionLines(text, "## Q")).toThrow("not found");
  });

  test("allTableRows and firstTableRows drop headers and separate tables", () => {
    const lines = ["| h | h |", "| - | - |", "| a | b |", "", "| h |", "| - |", "| c |"];
    expect(allTableRows(lines)).toEqual([[["a", "b"]], [["c"]]]);
    expect(firstTableRows(lines)).toEqual([["a", "b"]]);
    expect(() => firstTableRows(["no table"])).toThrow("no table found");
  });

  test("paragraphsOf joins blank-separated blocks into single lines", () => {
    expect(paragraphsOf(["a", "  b", "", "", "c"])).toEqual(["a b", "c"]);
  });
});
