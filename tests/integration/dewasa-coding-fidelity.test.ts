/**
 * Runs the transcription-fidelity check of the `dewasa-coding` programme
 * in-process so it contributes to `bun test`, CI and the coverage gate:
 * `data/dewasa-coding/*.json` must match the owner-approved
 * `docs/programs/dewasa-coding/silabus.md` (and, for the SKKNI unit titles,
 * `riset.md` bagian 2.2) cell by cell, and any drift must fail.
 */

import { describe, expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import { cp, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import {
  checkDewasaFidelity,
  DW_DATA_FILES,
  dewasaCodingFidelity,
  expectedCorpus,
  firstParagraph,
  firstTableRows,
  formatFidelityProblems,
  labelledParagraph,
  sectionLines,
  splitTableRow,
} from "../../src/cli/fidelity/dewasa-coding";

const repoRoot = join(import.meta.dir, "..", "..");
const silabus = readFileSync(
  join(repoRoot, "docs", "programs", "dewasa-coding", "silabus.md"),
  "utf-8",
);
const riset = readFileSync(
  join(repoRoot, "docs", "programs", "dewasa-coding", "riset.md"),
  "utf-8",
);

// biome-ignore lint/suspicious/noExplicitAny: fixture data is mutated freely
type Json = any;

function load(): Record<string, Json> {
  return Object.fromEntries(
    DW_DATA_FILES.map((file) => [
      file,
      JSON.parse(readFileSync(join(repoRoot, "data", "dewasa-coding", file), "utf-8")),
    ]),
  );
}

const registry = JSON.parse(readFileSync(join(repoRoot, "data", "programs.json"), "utf-8")) as {
  programs: Array<{ id: string; syllabusVersion: string; syllabusDate: string }>;
};
const entry = registry.programs.find((program) => program.id === "dewasa-coding");

function contexts(
  files: Record<string, Json>,
  doc: string = silabus,
  reg: typeof entry = entry,
): string[] {
  return checkDewasaFidelity(doc, riset, files, reg).map((problem) => problem.context);
}

describe("dewasa-coding fidelity: data/dewasa-coding vs. the approved silabus", () => {
  test("every cell of every data file matches the documents", () => {
    const problems = checkDewasaFidelity(silabus, riset, load(), entry);
    expect(problems).toEqual([]);
    expect(formatFidelityProblems(problems)).toContain("OK");
  });

  test("the registry entry exists and carries the document's version and date", () => {
    expect(entry).toBeDefined();
    expect(entry?.syllabusVersion).toBe("1.0.0");
    expect(entry?.syllabusDate).toBe("2026-11-19");
  });

  test("the programme table runs it against the repository: clean", async () => {
    const run = await dewasaCodingFidelity.run();
    expect(run.problems).toEqual([]);
    expect(run.message).toContain("check-dewasa-coding-fidelity: OK");
  });

  test("the derived corpus has the expected record counts", () => {
    const expected = expectedCorpus(silabus, riset) as Record<string, Json>;
    expect(expected["tracks.json"].tracks).toHaveLength(4);
    expect(expected["module-plan.json"].modules).toHaveLength(34);
    expect(expected["shared.json"].modules).toHaveLength(1);
    expect(expected["skkni-units.json"].units).toHaveLength(47);
    expect(expected["skkni-units.json"].uncoveredUnitCodes).toHaveLength(13);
    expect(expected["skkni-units.json"].enactedOn).toBe("2016-11-08");
    expect(expected["certification.json"].lspSchemes[0].unitCodes).toHaveLength(8);
    expect(expected["certification.json"].lspSchemes[1].unitCodes).toHaveLength(9);
    expect(expected["bridges.json"].bridges).toHaveLength(6);
    expect(expected["bridges.json"].bridges[3].status).toBe("ditunda");
    expect(expected["structure.json"].rows).toHaveLength(8);
  });
});

describe("dewasa-coding fidelity: drift fails hard", () => {
  test("a changed module cell is reported with its module code and field", () => {
    const files = load();
    files["module-plan.json"].modules[5].outcome = "Hasil yang diperbaiki diam-diam";
    const problems = checkDewasaFidelity(silabus, riset, files, entry);
    expect(problems).toHaveLength(1);
    expect(problems[0]?.context).toBe("module-plan.json.modules[DW-PKJ-M6].outcome");
    expect(problems[0]?.actual).toContain("diperbaiki diam-diam");
  });

  test("a changed SKKNI unit title, unit mapping and uncovered list are reported", () => {
    const files = load();
    files["skkni-units.json"].units[3].title = "Judul yang diubah";
    files["skkni-units.json"].uncoveredUnitCodes.pop();
    const pro = files["module-plan.json"].modules.find(
      (module: { code: string }) => module.code === "DW-PRO-M7",
    );
    pro.skkniUnitCodes.pop();
    const found = contexts(files);
    expect(found).toContain("skkni-units.json.units[J.620100.004.02].title");
    expect(found).toContain("skkni-units.json.uncoveredUnitCodes length");
    expect(found).toContain("module-plan.json.modules[DW-PRO-M7].skkniUnitCodes length");
  });

  test("a changed track attribute, hours cell and project paragraph are reported", () => {
    const files = load();
    files["tracks.json"].tracks[0].goal = "Tujuan lain";
    files["tracks.json"].tracks[1].trackHours = 100;
    files["tracks.json"].tracks[3].syntheticProject = "Proyek lain";
    files["tracks.json"].tracks[2].prerequisiteModules = [];
    const found = contexts(files);
    expect(found).toContain("tracks.json.tracks[PKJ].goal");
    expect(found).toContain("tracks.json.tracks[PRO].trackHours");
    expect(found).toContain("tracks.json.tracks[BIS].syntheticProject");
    expect(found).toContain("tracks.json.tracks[PRS].prerequisiteModules length");
  });

  test("a changed shared module, structure row, bridge and certification option are reported", () => {
    const files = load();
    files["shared.json"].modules[0].topics += " tambahan";
    files["structure.json"].rows[3].value = "Java";
    files["bridges.json"].bridges[0].note = "diubah";
    files["bridges.json"].bridges[3].status = "dirancang";
    files["certification.json"].options[1].advantages = "diubah";
    files["certification.json"].defaultOptionId = "B";
    files["certification.json"].lspSchemes[0].unitCodes.pop();
    const found = contexts(files);
    expect(found).toContain("shared.json.modules[DW-FND-M1].topics");
    expect(found).toContain("structure.json.rows[Bahasa pemrograman inti].value");
    expect(found).toContain("bridges.json.bridges[bridge-1].note");
    expect(found).toContain("bridges.json.bridges[bridge-4].status");
    expect(found).toContain("certification.json.options[B].advantages");
    expect(found).toContain("certification.json.defaultOptionId");
    expect(found).toContain(
      "certification.json.lspSchemes[junior-web-programmer].unitCodes length",
    );
  });

  test("a dropped record is reported as a length mismatch, a derived rule as a field mismatch", () => {
    const files = load();
    files["module-plan.json"].modules.pop();
    files["module-plan.json"].modules[0].hours = 6;
    files["module-plan.json"].modules[1].prerequisites = ["DW-FND-M1"];
    const found = contexts(files);
    expect(found).toContain("module-plan.json.modules length");
    expect(found).toContain("module-plan.json.modules[DW-PKJ-M1].hours");
    expect(found).toContain("module-plan.json.modules[DW-PKJ-M2].prerequisites[0]");
  });

  test("a missing file and a registry that disagrees are reported", () => {
    const files = load();
    delete files["tracks.json"];
    const problems = checkDewasaFidelity(silabus, riset, files, {
      syllabusVersion: "0.9.0",
      syllabusDate: "2020-01-01",
    });
    const found = problems.map((problem) => problem.context);
    expect(found).toContain("tracks.json");
    expect(found).toContain("programs.json[dewasa-coding].syllabusVersion");
    expect(found).toContain("programs.json[dewasa-coding].syllabusDate");
    expect(formatFidelityProblems(problems)).toContain("FAILED");
  });

  test("a change in the document itself is detected against unchanged data", () => {
    const edited = silabus.replace(
      "| `DW-PRS-M2` | Program pertama dengan Python |",
      "| `DW-PRS-M2` | Program pertama |",
    );
    expect(edited).not.toBe(silabus);
    expect(contexts(load(), edited)).toContain("module-plan.json.modules[DW-PRS-M2].title");
  });

  test("a change in the riset unit table is detected", () => {
    const edited = riset.replace("| Menganalisis Tools |", "| Menganalisis Alat |");
    expect(edited).not.toBe(riset);
    const found = checkDewasaFidelity(silabus, edited, load(), entry).map((p) => p.context);
    expect(found).toContain("skkni-units.json.units[J.620100.001.01].title");
  });
});

describe("dewasa-coding fidelity: a document that breaks the shape fails loudly", () => {
  test("a module table with the wrong number of cells is refused", () => {
    const broken = silabus.replace(
      "| `DW-PKJ-M1` | Memetakan pekerjaan berulang |",
      "| `DW-PKJ-M1` | x | Memetakan pekerjaan berulang |",
    );
    expect(() => expectedCorpus(broken, riset)).toThrow("expected 4 non-empty cells");
  });

  test("a module code that skips a number is refused", () => {
    const broken = silabus.replace("| `DW-PKJ-M2` |", "| `DW-PKJ-M9` |");
    expect(() => expectedCorpus(broken, riset)).toThrow("expected DW-PKJ-M2");
  });

  test("a Durasi that disagrees with the module table is refused", () => {
    const broken = silabus.replace("(8 modul × 5 jam)", "(9 modul × 5 jam)");
    expect(broken).not.toBe(silabus);
    expect(() => expectedCorpus(broken, riset)).toThrow("Durasi says 9 modules");
  });

  test("a bad hours cell, a missing paragraph and a misordered track are refused", () => {
    expect(() => expectedCorpus(silabus.replace("8 + 40 = 48", "48"), riset)).toThrow("hours cell");
    expect(() =>
      expectedCorpus(silabus.replace("**Prasyarat:** `DW-FND-M1`; terbiasa", "terbiasa"), riset),
    ).toThrow("paragraph starting");
    expect(() =>
      expectedCorpus(silabus.replace("| `PKJ` | Pekerja |", "| `PRS` | Pekerja |"), riset),
    ).toThrow("expected track PKJ");
  });

  test("an LSP scheme whose declared count disagrees with its list is refused", () => {
    const broken = silabus.replace("(delapan unit:", "(sembilan unit:");
    expect(broken).not.toBe(silabus);
    expect(() => expectedCorpus(broken, riset)).toThrow("says sembilan unit, lists 8");
  });

  test("an uncovered unit that is not in the riset list is refused", () => {
    const broken = silabus.replace("`001`, `002`, `024`", "`001`, `099`, `024`");
    expect(() => expectedCorpus(broken, riset)).toThrow("uncovered unit 099");
  });

  test("a missing heading, bad shared heading and unknown month are refused", () => {
    expect(() =>
      expectedCorpus(silabus.replace("## 2. Struktur", "## 2x Struktur"), riset),
    ).toThrow("not found");
    expect(() =>
      expectedCorpus(
        silabus.replace("dengan kode dan AI (8 jam)", "dengan kode dan AI (delapan jam)"),
        riset,
      ),
    ).toThrow("bagian 3.1 heading");
    expect(() =>
      expectedCorpus(silabus.replace("ditetapkan 8 November", "ditetapkan 8 Nopember"), riset),
    ).toThrow("unknown month");
  });
});

describe("dewasa-coding fidelity: the script entry through the CLI", () => {
  test("drift in a copied corpus exits 1 and clean exits 0", async () => {
    const dir = await mkdtemp(join(tmpdir(), "dw-fid-drift-"));
    try {
      await cp(join(repoRoot, "data", "programs.json"), join(dir, "data", "programs.json"));
      await cp(join(repoRoot, "data", "dewasa-coding"), join(dir, "data", "dewasa-coding"), {
        recursive: true,
      });
      await cp(
        join(repoRoot, "docs", "programs", "dewasa-coding"),
        join(dir, "docs", "programs", "dewasa-coding"),
        { recursive: true },
      );
      const clean = await dewasaCodingFidelity.run(dir);
      expect(clean.problems).toEqual([]);

      const path = join(dir, "data", "dewasa-coding", "bridges.json");
      await writeFile(path, (await readFile(path, "utf-8")).replace(/"note": "/, '"note": "UBAH '));
      const drifted = await dewasaCodingFidelity.run(dir);
      expect(drifted.problems).toHaveLength(1);
      expect(drifted.message).toContain("FAILED");
      expect(drifted.message).toContain("UBAH ");

      await rm(path);
      const missing = await dewasaCodingFidelity.run(dir);
      expect(missing.problems.map((problem) => problem.context)).toContain("bridges.json");

      await writeFile(join(dir, "data", "programs.json"), JSON.stringify({ programs: [] }));
      const unregistered = await dewasaCodingFidelity.run(dir);
      expect(unregistered.problems.map((problem) => problem.context)).toContain("programs.json");
    } finally {
      await rm(dir, { recursive: true, force: true });
    }
  });

  test("bun run check:fidelity --program dewasa-coding exits 0", () => {
    const result = Bun.spawnSync(
      ["bun", "run", "scripts/check-fidelity.ts", "--program", "dewasa-coding"],
      { cwd: repoRoot },
    );
    expect(result.exitCode).toBe(0);
    expect(result.stdout.toString()).toContain("check-dewasa-coding-fidelity: OK");
  });
});

describe("Markdown helpers", () => {
  test("splitTableRow handles escaped pipes, code spans and edge pipes", () => {
    expect(splitTableRow("| a | b | c |")).toEqual(["a", "b", "c"]);
    expect(splitTableRow("| `x || y` | b |")).toEqual(["`x || y`", "b"]);
    expect(splitTableRow("| a \\| b | c |")).toEqual(["a | b", "c"]);
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

  test("labelledParagraph joins wrapped lines and firstParagraph skips leading blanks", () => {
    const lines = ["", "**Durasi:** 40 jam", "  lanjut baris", "", "lain"];
    expect(labelledParagraph(lines, "**Durasi:**")).toBe("40 jam lanjut baris");
    expect(firstParagraph(lines)).toBe("**Durasi:** 40 jam lanjut baris");
    expect(() => labelledParagraph(lines, "**Tidak ada:**")).toThrow("not found");
    expect(() => firstParagraph(["", " "])).toThrow("no paragraph");
  });
});
