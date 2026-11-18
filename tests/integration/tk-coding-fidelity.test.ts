/**
 * Runs the transcription-fidelity check of `tk-coding` in-process so it
 * contributes to `bun test`, CI and the coverage gate: `data/tk-coding/*.json`
 * must match the owner-approved `docs/programs/tk-coding/silabus.md` cell by
 * cell. Drift is simulated on in-memory or temporary copies only; the
 * committed data and document are never changed.
 */

import { describe, expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import { cp, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import {
  checkTkFidelity,
  documentProblems,
  expectedCorpus,
  firstTableRows,
  formatFidelityProblems,
  sectionLines,
  splitTableRow,
  TK_DATA_FILES,
  tkCodingFidelity,
} from "../../src/cli/fidelity/tk-coding";
import { runFidelityCheck } from "../../src/cli/fidelity-runner";

const repoRoot = join(import.meta.dir, "..", "..");
const markdown = readFileSync(
  join(repoRoot, "docs", "programs", "tk-coding", "silabus.md"),
  "utf-8",
);

// biome-ignore lint/suspicious/noExplicitAny: fixture data is mutated freely
type Json = any;

function load(): Record<string, Json> {
  return Object.fromEntries(
    TK_DATA_FILES.map((file) => [
      file,
      JSON.parse(readFileSync(join(repoRoot, "data", "tk-coding", file), "utf-8")),
    ]),
  );
}

const registry = JSON.parse(readFileSync(join(repoRoot, "data", "programs.json"), "utf-8")) as {
  programs: Array<{ id: string; syllabusVersion: string; syllabusDate: string }>;
};
const tkEntry = registry.programs.find((program) => program.id === "tk-coding");

const contextsOf = (problems: ReadonlyArray<{ context: string }>) =>
  problems.map((problem) => problem.context);

describe("tk-coding fidelity: data/tk-coding vs. the approved silabus", () => {
  test("every cell of every data file matches the document", () => {
    const problems = checkTkFidelity(markdown, load(), tkEntry);
    expect(problems).toEqual([]);
    expect(formatFidelityProblems(problems)).toContain("OK");
  });

  test("the registry entry exists and carries the document's version and date", () => {
    expect(tkEntry).toBeDefined();
    expect(tkEntry?.syllabusVersion).toBe("1.0.0");
    expect(tkEntry?.syllabusDate).toBe("2026-11-19");
  });

  test("the derived corpus has the expected record counts", () => {
    const expected = expectedCorpus(markdown) as Record<string, Json>;
    expect(expected["weeks.json"].weeks).toHaveLength(48);
    expect(expected["cp-elements.json"].items).toHaveLength(7);
    expect(expected["cp-elements.json"].scope).toHaveLength(3);
    expect(expected["cp-mapping.json"].concepts).toHaveLength(9);
    expect(expected["bridge.json"].rows).toHaveLength(5);
    expect(expected["goals.json"].principles).toHaveLength(8);
    expect(expected["goals.json"].goals).toHaveLength(7);
    expect(expected["structure.json"].rows).toHaveLength(7);
    expect(expected["structure.json"].sessionPattern).toHaveLength(4);
    expect(expected["decisions.json"].decisions).toHaveLength(9);
    expect(expected["decisions.json"].decidedOn).toBe("2026-11-19");
  });

  test("the structured facts are read from the document's cells", () => {
    const structure = (expectedCorpus(markdown) as Record<string, Json>)["structure.json"];
    expect(structure.groups).toEqual([
      { id: "A", ageFrom: 4, ageTo: 5, sessionMinutes: 20 },
      { id: "B", ageFrom: 5, ageTo: 6, sessionMinutes: 30 },
    ]);
    expect(structure.semesters).toEqual(["A1", "A2", "B1", "B2"]);
    expect(structure.totalWeeks).toBe(48);
    expect(structure.screen).toEqual({
      defaultMinutes: 0,
      optionalWeeks: ["TK-B2-M9", "TK-B2-M10"],
      maxOptionalMinutes: 10,
    });
  });

  test("the CP quotations of bagian 4.1 equal those of bagian 1.2", () => {
    expect(documentProblems(markdown)).toEqual([]);
  });

  test("the CP link markers are encoded as an interpreted overlap", () => {
    const expected = expectedCorpus(markdown) as Record<string, Json>;
    expect(expected["weeks.json"].cpRelation).toBe("irisan-penafsiran");
    expect(expected["weeks.json"].meetsCp).toBe(false);
    expect(expected["cp-mapping.json"].meetsCp).toBe(false);
    expect(expected["cp-mapping.json"].concepts[0].matchLevel).toBe("sedang");
    expect(expected["cp-mapping.json"].concepts[1].matchLevel).toBe("langsung");
  });
});

describe("tk-coding fidelity: drift fails hard", () => {
  test("a changed week cell is reported with its week code and field", () => {
    const files = load();
    files["weeks.json"].weeks[5].activity = "Kegiatan yang diperbaiki diam-diam";
    const problems = checkTkFidelity(markdown, files, tkEntry);
    expect(problems).toHaveLength(1);
    expect(problems[0]?.context).toBe("weeks.json.weeks[TK-A1-M6].activity");
    expect(problems[0]?.actual).toContain("diperbaiki diam-diam");
  });

  test("a changed CP code list of a week is reported", () => {
    const files = load();
    files["weeks.json"].weeks[47].cp = ["FF-DL-b"];
    expect(contextsOf(checkTkFidelity(markdown, files, tkEntry))).toContain(
      "weeks.json.weeks[TK-B2-M12].cp[0]",
    );
  });

  test("a dropped record is reported as a length mismatch", () => {
    const files = load();
    files["weeks.json"].weeks.pop();
    files["cp-mapping.json"].concepts.pop();
    files["bridge.json"].rows.pop();
    const contexts = contextsOf(checkTkFidelity(markdown, files, tkEntry));
    expect(contexts).toContain("weeks.json.weeks length");
    expect(contexts).toContain("cp-mapping.json.concepts length");
    expect(contexts).toContain("bridge.json.rows length");
  });

  test("a changed CP quotation, scope note, mapping cell and structure fact are reported", () => {
    const files = load();
    files["cp-elements.json"].items[0].text += " tambahan";
    files["cp-elements.json"].scope[1].text = "diubah";
    files["cp-mapping.json"].concepts[2].matchText = "Sedang.";
    files["cp-mapping.json"].interpretationNote = "Pemetaan resmi.";
    files["structure.json"].rows[3].value = "2 sesi per minggu";
    files["structure.json"].groups[1].sessionMinutes = 45;
    files["structure.json"].screen.maxOptionalMinutes = 30;
    const contexts = contextsOf(checkTkFidelity(markdown, files, tkEntry));
    expect(contexts).toContain("cp-elements.json.items[FF-DL-a].text");
    expect(contexts).toContain("cp-elements.json.scope[Teknologi].text");
    expect(contexts).toContain(
      "cp-mapping.json.concepts[Pengelompokan (klasifikasi), data sederhana].matchText",
    );
    expect(contexts).toContain("cp-mapping.json.interpretationNote");
    expect(contexts).toContain("structure.json.rows[sesi-inti].value");
    expect(contexts).toContain("structure.json.groups[B].sessionMinutes");
    expect(contexts).toContain("structure.json.screen.maxOptionalMinutes");
  });

  test("a changed principle, goal, bridge, decision and the CP-relation marker are reported", () => {
    const files = load();
    files["goals.json"].principles[0].title = "Belajar adalah bermain.";
    files["goals.json"].goals[2].text = "diubah";
    files["goals.json"].cpRelationNote = "Seluruh tujuan memenuhi CP.";
    files["bridge.json"].rows[0].outputWeeks = ["TK-B1-M2"];
    files["bridge.json"].policy = "diubah";
    files["decisions.json"].decisions[0].decision = "(c) Layar rutin";
    files["decisions.json"].decidedOn = "2026-11-01";
    files["weeks.json"].meetsCp = true;
    const contexts = contextsOf(checkTkFidelity(markdown, files, tkEntry));
    expect(contexts).toContain("goals.json.principles[1].title");
    expect(contexts).toContain("goals.json.goals[3].text");
    expect(contexts).toContain("goals.json.cpRelationNote");
    expect(contexts).toContain("bridge.json.rows[1].outputWeeks length");
    expect(contexts).toContain("bridge.json.policy");
    expect(contexts).toContain("decisions.json.decisions[Q1].decision");
    expect(contexts).toContain("decisions.json.decidedOn");
    expect(contexts).toContain("weeks.json.meetsCp");
  });

  test("a missing file and a registry that disagrees are reported", () => {
    const files = load();
    delete files["bridge.json"];
    const problems = checkTkFidelity(markdown, files, {
      syllabusVersion: "0.9.0",
      syllabusDate: "2020-01-01",
    });
    const contexts = contextsOf(problems);
    expect(contexts).toContain("bridge.json");
    expect(contexts).toContain("programs.json[tk-coding].syllabusVersion");
    expect(contexts).toContain("programs.json[tk-coding].syllabusDate");
    expect(formatFidelityProblems(problems)).toContain("FAILED");
  });

  test("a change in the document itself is detected against unchanged data", () => {
    const edited = markdown.replace(
      "| TK-A1-M7 | Kumpulan benda |",
      "| TK-A1-M7 | Kumpulan mainan |",
    );
    expect(edited).not.toBe(markdown);
    expect(contextsOf(checkTkFidelity(edited, load(), tkEntry))).toContain(
      "weeks.json.weeks[TK-A1-M7].theme",
    );
  });

  test("a document that loses the CP-relation statements is reported", () => {
    const edited = markdown
      .replaceAll("bukan pemenuhan CP", "memenuhi CP")
      .replaceAll("penafsiran penyusun", "pemetaan resmi");
    const problems = documentProblems(edited);
    expect(problems.map((problem) => problem.expected)).toEqual([
      'the document states "bukan pemenuhan CP"',
      'the document states "penafsiran penyusun"',
    ]);
  });

  test("a CP quotation of bagian 4.1 that no longer equals bagian 1.2 is reported", () => {
    const edited = markdown.replace(
      '| FF-DL-e | "Murid mengeksplorasi',
      '| FF-DL-e | "Murid mengeksplorasi ulang',
    );
    expect(edited).not.toBe(markdown);
    expect(contextsOf(documentProblems(edited))).toContain(
      "silabus.md bagian 4.1 FF-DL-e vs bagian 1.2",
    );
    const jd = markdown.replace(
      '| FF-JD-e | "Murid memiliki fungsi gerak',
      '| FF-JD-e | "Murid tidak memiliki fungsi gerak',
    );
    expect(contextsOf(documentProblems(jd))).toContain(
      "silabus.md bagian 4.1 Jati Diri item 2 vs bagian 1.2",
    );
  });

  test("a document that breaks the table shape fails loudly instead of passing", () => {
    const broken = markdown.replace(
      "| TK-A1-M7 | Kumpulan benda |",
      "| TK-A1-M7 | x | Kumpulan benda |",
    );
    expect(() => expectedCorpus(broken)).toThrow("expected 6 non-empty cells");
  });

  test("an unknown structure row and a week table under the wrong heading are refused", () => {
    expect(() => expectedCorpus(markdown.replace("| Sesi inti |", "| Sesi lain |"))).toThrow(
      'unknown row "Sesi lain"',
    );
    expect(() =>
      expectedCorpus(markdown.replace("(`TK-A2`): urutan", "(`TK-B1`): urutan")),
    ).toThrow("heading names B1, expected A2");
  });

  test("a time-structure cell whose wording changed is refused", () => {
    expect(() =>
      expectedCorpus(markdown.replace("TK A 20 menit, TK B 30 menit", "TK A dua puluh menit")),
    ).toThrow("bagian 3.1 Sesi inti");
  });
});

describe("tk-coding fidelity: the module and the runner", () => {
  test("the module run on the repository is clean", async () => {
    const run = await tkCodingFidelity.run();
    expect(run.problems).toEqual([]);
    expect(run.message).toContain("check-tk-coding-fidelity: OK");
  });

  test("check:fidelity --program tk-coding passes and a drifted copy fails", async () => {
    const ok = await runCheck(["--program", "tk-coding"]);
    expect(ok.code).toBe(0);
    expect(ok.out).toContain("check-tk-coding-fidelity: OK");

    const dir = await mkdtemp(join(tmpdir(), "osn-tk-fid-"));
    try {
      await cp(join(repoRoot, "docs"), join(dir, "docs"), { recursive: true });
      await cp(join(repoRoot, "data"), join(dir, "data"), { recursive: true });
      const path = join(dir, "data", "tk-coding", "weeks.json");
      const weeks = JSON.parse(await readFile(path, "utf-8"));
      weeks.weeks[0].theme = "Tema yang diubah diam-diam";
      await writeFile(path, JSON.stringify(weeks, null, 2));
      const failing = await runCheck(["--program", "tk-coding"], dir);
      expect(failing.code).toBe(1);
      expect(failing.out).toContain("weeks.json.weeks[TK-A1-M1].theme");
    } finally {
      await rm(dir, { recursive: true, force: true });
    }
  });

  test("a registry without the tk-coding entry is reported by the module", async () => {
    const dir = await mkdtemp(join(tmpdir(), "osn-tk-fid-noreg-"));
    try {
      await cp(join(repoRoot, "docs"), join(dir, "docs"), { recursive: true });
      await cp(join(repoRoot, "data"), join(dir, "data"), { recursive: true });
      await writeFile(join(dir, "data", "programs.json"), JSON.stringify({ programs: [] }));
      const run = await tkCodingFidelity.run(dir);
      expect(contextsOf(run.problems)).toEqual(["programs.json"]);
    } finally {
      await rm(dir, { recursive: true, force: true });
    }
  });
});

async function runCheck(args: string[], root?: string) {
  const out: string[] = [];
  const err: string[] = [];
  const code = await runFidelityCheck(
    args,
    { stdout: (text) => out.push(text), stderr: (text) => err.push(text) },
    root,
    root === undefined ? undefined : join(root, "data"),
  );
  return { code, out: out.join(""), err: err.join("") };
}

describe("tk-coding Markdown helpers", () => {
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

  test("firstTableRows drops header and separator, stops at the first non-table line", () => {
    const lines = [
      "intro",
      "| h1 | h2 |",
      "| --- | --- |",
      "| a | b |",
      "| c | d |",
      "",
      "| x | y |",
    ];
    expect(firstTableRows(lines)).toEqual([
      ["a", "b"],
      ["c", "d"],
    ]);
    expect(() => firstTableRows(["no table"])).toThrow("no table found");
  });
});
