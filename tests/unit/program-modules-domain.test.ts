/**
 * Tests for the per-programme learning-module rules (ADR-0007, ADR-0008):
 * `tkModuleFindings`, `sdModuleFindings`, `smpModuleFindings`,
 * `kulModuleFindings` and `dwModuleFindings`, reached through
 * `moduleFindings` / `parseModulesIndex` and through the programme table
 * `PROGRAM_MODULES`; the shared prerequisite rules; the content and learner
 * sheet file checks; and `loadModule`. The corpus is the committed
 * `data/<program>/`; the module indexes are synthetic and built in memory or
 * in a temporary directory.
 */

import { afterEach, beforeEach, describe, expect, test } from "bun:test";
import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { loadCorpusFromDirectory } from "../../src/cli/corpus-loader";
import { loadModule, moduleContentFindings } from "../../src/cli/module-content";
import { findProgramModule } from "../../src/cli/program-registry";
import type { CorpusEntry, CorpusSource } from "../../src/domain/corpus-audit";
import { learnerSheetIdentityProblems } from "../../src/domain/learner-sheet";
import { moduleFindings, parseModulesIndex } from "../../src/domain/modules";
import { auditTkCorpus } from "../../src/domain/tk-corpus-audit";
import { dw, kul, REFERENCE, sd, smp, tk } from "../helpers/program-module-entries";

const REPO_ROOT = join(import.meta.dir, "..", "..");
const index = (...modules: Record<string, unknown>[]): CorpusEntry => ({
  ok: true,
  data: { modules },
});

const corpora = new Map<string, CorpusSource>();
beforeEach(async () => {
  if (corpora.size === 0) {
    for (const id of ["tk-coding", "sd-coding", "smp-coding", "kuliah-coding", "dewasa-coding"]) {
      corpora.set(id, await loadCorpusFromDirectory(join(REPO_ROOT, "data", id)));
    }
  }
});

function sourceWith(
  program: string,
  modules: CorpusEntry | undefined,
  without: readonly string[] = [],
): Map<string, CorpusEntry> {
  const map = new Map(corpora.get(program));
  map.delete("modules.json");
  for (const file of without) {
    map.delete(file);
  }
  if (modules !== undefined) {
    map.set("modules.json", modules);
  }
  return map;
}

const find = (program: string, source: CorpusSource) => moduleFindings(source, program);
const messagesOf = (findings: ReturnType<typeof find>) => findings.map((f) => f.message).join("\n");
const pathsOf = (findings: ReturnType<typeof find>) => findings.map((f) => f.path);

const PROGRAMS = ["tk-coding", "sd-coding", "smp-coding", "kuliah-coding", "dewasa-coding"];

describe("every programme: absent, invalid and clean indexes", () => {
  const empty: Record<string, (code?: string) => Record<string, unknown>> = {
    "tk-coding": () => tk("TK-A1-M1"),
    "sd-coding": () => sd("SD1-1-M1"),
    "smp-coding": () => smp("SMP7-1-M1"),
    "kuliah-coding": () => kul("KUL-U-101"),
    "dewasa-coding": () => dw("DW-FND-M1"),
  };

  for (const program of PROGRAMS) {
    test(`${program}: no modules.json means no findings (the index is optional)`, () => {
      expect(find(program, sourceWith(program, undefined))).toEqual([]);
      expect(parseModulesIndex(sourceWith(program, undefined), program)).toEqual({
        modules: undefined,
        findings: [],
      });
    });

    test(`${program}: an empty index and a minimal valid entry are clean`, () => {
      expect(find(program, sourceWith(program, index()))).toEqual([]);
      const entry = (empty[program] as () => Record<string, unknown>)();
      expect(find(program, sourceWith(program, index(entry)))).toEqual([]);
      expect(
        parseModulesIndex(sourceWith(program, index(entry)), program).modules?.modules,
      ).toHaveLength(1);
    });

    test(`${program}: invalid JSON and schema errors are reported against modules.json`, () => {
      const broken = find(program, sourceWith(program, { ok: false, error: "Unexpected token" }));
      expect(broken).toHaveLength(1);
      expect(broken[0]).toMatchObject({ file: "modules.json", path: "(file)", severity: "error" });
      expect(broken[0]?.message).toContain("invalid JSON: Unexpected token");

      const bad = find(program, sourceWith(program, index({ id: "x" })));
      expect(bad.length).toBeGreaterThan(0);
      expect(bad.every((f) => f.file === "modules.json")).toBe(true);

      const rootless = find(program, sourceWith(program, { ok: true, data: 5 }));
      expect(pathsOf(rootless)).toEqual(["(root)"]);
    });

    test(`${program}: an OSN-shaped entry is a schema violation`, () => {
      const osnShaped = {
        ...(empty[program] as () => Record<string, unknown>)(),
        topicFamilies: ["graph-tree"],
      };
      expect(find(program, sourceWith(program, index(osnShaped))).length).toBeGreaterThan(0);
    });

    test(`${program}: the programme table parses and checks with the same rules`, () => {
      const table = findProgramModule(program);
      expect(table).toBeDefined();
      const entry = (empty[program] as () => Record<string, unknown>)();
      const source = sourceWith(program, index(entry));
      expect(table?.parseModulesIndex(source).modules?.modules).toHaveLength(1);
      expect(table?.moduleFindings(source, {})).toEqual([]);
      const bad = sourceWith(program, index({ id: "x" }));
      expect(table?.moduleFindings(bad, {}).length).toBeGreaterThan(0);
    });
  }

  test("the OSN default and sma-coding keep their own shapes", () => {
    const source = sourceWith("tk-coding", index(tk("TK-A1-M1")));
    expect(parseModulesIndex(source).modules).toBeUndefined();
    expect(parseModulesIndex(source, "sma-coding").modules).toBeUndefined();
    expect(parseModulesIndex(source, "tk-coding").modules).toBeDefined();
  });
});

describe("tk-coding module rules", () => {
  const run = (modules: Record<string, unknown>[], without: readonly string[] = []) =>
    find("tk-coding", sourceWith("tk-coding", index(...modules), without));

  test("an overlap that the week itself lists is clean", () => {
    expect(run([tk("TK-A1-M2", { cpOverlap: ["FF-DL-a", "FF-DL-c"] })])).toEqual([]);
  });

  test("an unknown CP code and a CP code of another week are named", () => {
    expect(run([tk("TK-B2-M12")])).toEqual([]);

    const bad = run([
      tk("TK-A1-M1", { cpOverlap: ["FF-JD-z"] }),
      tk("TK-A1-M2", { cpOverlap: ["FF-DL-d"] }),
    ]);
    expect(messagesOf(bad)).toContain('CP item "FF-JD-z" does not exist in cp-elements.json');
    expect(messagesOf(bad)).toContain(
      'CP item "FF-DL-d" is not among the CP items week TK-A1-M2 overlaps',
    );
    expect(pathsOf(bad)).toEqual(["modules[0].cpOverlap[0]", "modules[1].cpOverlap[0]"]);
  });

  test("a week code that is not in weeks.json is reported", () => {
    const weeks = corpora.get("tk-coding")?.get("weeks.json");
    const trimmed = structuredClone(weeks?.ok === true ? weeks.data : {}) as {
      weeks: { id: string }[];
    };
    trimmed.weeks = trimmed.weeks.filter((week) => week.id !== "TK-A1-M1");
    const source = sourceWith("tk-coding", index(tk("TK-A1-M1")));
    source.set("weeks.json", { ok: true, data: trimmed });
    expect(messagesOf(find("tk-coding", source))).toContain(
      'week code "TK-A1-M1" does not exist in weeks.json',
    );
  });

  test("weeks.json missing is a finding, never a skipped check", () => {
    const findings = run([tk("TK-A1-M1")], ["weeks.json"]);
    expect(messagesOf(findings)).toContain("cannot be checked: weeks.json is missing or invalid");
  });

  test("cp-elements.json missing is a finding only when an overlap is named", () => {
    expect(run([tk("TK-A1-M1")], ["cp-elements.json"])).toEqual([]);
    const findings = run([tk("TK-A1-M1", { cpOverlap: ["FF-DL-b"] })], ["cp-elements.json"]);
    expect(messagesOf(findings)).toContain("cp-elements.json is missing or invalid");
  });

  test("prerequisites: unknown module, unknown week code, cycle, self, and valid ones", () => {
    const findings = run([
      tk("TK-A1-M1", { prerequisites: ["tk-a1-m2", "tk-a1-m1", "hilang", "TK-B2-M12"] }),
      tk("TK-A1-M2", { prerequisites: ["tk-a1-m1"] }),
      tk("TK-A1-M3", { prerequisites: ["TK-A1-M1", "tk-a1-m1"] }),
    ]);
    const text = messagesOf(findings);
    expect(text).toContain('prerequisite "tk-a1-m2" closes a prerequisite cycle');
    expect(text).toContain('prerequisite "tk-a1-m1" closes a prerequisite cycle');
    expect(text).toContain('prerequisite "hilang" is neither a module in modules.json');
    expect(findings.filter((f) => f.path.startsWith("modules[2]"))).toEqual([]);
    expect(
      run([tk("TK-A1-M1"), tk("TK-A1-M2", { prerequisites: ["tk-a1-m1", "TK-A1-M1"] })]),
    ).toEqual([]);
  });

  test("a prerequisite week code that does not exist in weeks.json is reported", () => {
    const findings = run([tk("TK-A1-M1", { prerequisites: ["TK-A1-M12"] })]);
    expect(findings).toEqual([]);
    const source = sourceWith("tk-coding", index(tk("TK-A1-M1", { prerequisites: ["TK-A2-M1"] })));
    const weeks = source.get("weeks.json");
    const cut = structuredClone(weeks?.ok === true ? weeks.data : {}) as {
      weeks: { id: string }[];
    };
    cut.weeks = cut.weeks.filter((week) => week.id !== "TK-A2-M1");
    source.set("weeks.json", { ok: true, data: cut });
    expect(messagesOf(find("tk-coding", source))).toContain(
      'week code "TK-A2-M1" does not exist in weeks.json',
    );
  });

  test("auditTkCorpus does not report modules.json as an unregistered file", () => {
    const result = auditTkCorpus(sourceWith("tk-coding", index(tk("TK-A1-M1"))));
    expect(result.ok).toBe(true);
  });
});

describe("sd-coding module rules", () => {
  const run = (modules: Record<string, unknown>[], without: readonly string[] = []) =>
    find("sd-coding", sourceWith("sd-coding", index(...modules), without));

  test("a kelas 5-6 week may claim the items cp-mapping.json maps to it", () => {
    expect(run([sd("SD5-1-M3", { cpItems: ["C-BK-a", "C-BK-b"] })])).toEqual([]);
  });

  test("a kelas 1-4 introduction week is clean without CP items and never claims one", () => {
    expect(run([sd("SD1-1-M1")])).toEqual([]);
    const findings = run([sd("SD1-1-M1", { cpItems: ["C-BK-a"] })]);
    expect(messagesOf(findings)).toContain("kelas 1-4 introduction (outside the CP)");
  });

  test("a strengthening week does not fulfil a CP item", () => {
    const findings = run([sd("SD5-1-M11", { cpItems: ["C-BK-c"] })]);
    expect(messagesOf(findings)).toContain("strengthening week ([penguatan])");
    expect(run([sd("SD5-1-M11")])).toEqual([]);
  });

  test("a CP item that cp-mapping.json does not map to the week, or does not have, is named", () => {
    const wrongWeek = run([sd("SD5-1-M3", { cpItems: ["C-LD-a"] })]);
    expect(messagesOf(wrongWeek)).toContain(
      'week SD5-1-M3 does not fulfil CP item "C-LD-a" according to cp-mapping.json',
    );
    const mapping = corpora.get("sd-coding")?.get("cp-mapping.json");
    const cut = structuredClone(mapping?.ok === true ? mapping.data : {}) as {
      mappings: { cpCode: string }[];
    };
    cut.mappings = cut.mappings.filter((row) => row.cpCode !== "C-BK-a");
    const source = sourceWith("sd-coding", index(sd("SD5-1-M3", { cpItems: ["C-BK-a"] })));
    source.set("cp-mapping.json", { ok: true, data: cut });
    expect(messagesOf(find("sd-coding", source))).toContain(
      'CP item "C-BK-a" does not exist in cp-mapping.json',
    );
  });

  test("an unknown week code is named; weeks.json and cp-mapping.json missing are findings", () => {
    const missing = run(
      [sd("SD5-1-M3", { cpItems: ["C-BK-a"] })],
      ["weeks.json", "cp-mapping.json"],
    );
    expect(messagesOf(missing)).toContain("weeks.json is missing or invalid");
    expect(messagesOf(missing)).toContain("cp-mapping.json is missing or invalid");
    expect(run([sd("SD5-1-M3")], ["cp-mapping.json"])).toEqual([]);

    const weeks = corpora.get("sd-coding")?.get("weeks.json");
    const cut = structuredClone(weeks?.ok === true ? weeks.data : {}) as {
      weeks: { id: string }[];
    };
    cut.weeks = cut.weeks.filter((week) => week.id !== "SD5-1-M3");
    const source = sourceWith(
      "sd-coding",
      index(sd("SD5-1-M3", { prerequisites: ["SD5-1-M2", "SD5-1-M3"] })),
    );
    source.set("weeks.json", { ok: true, data: cut });
    const text = messagesOf(find("sd-coding", source));
    expect(text).toContain('week code "SD5-1-M3" does not exist in weeks.json');
  });

  test("prerequisites: cycle and unknown module", () => {
    const text = messagesOf(
      run([
        sd("SD5-1-M2", { prerequisites: ["sd5-1-m3"] }),
        sd("SD5-1-M3", { prerequisites: ["sd5-1-m2", "hilang", "SD5-1-M1"] }),
      ]),
    );
    expect(text).toContain("closes a prerequisite cycle");
    expect(text).toContain('prerequisite "hilang"');
  });
});

describe("smp-coding module rules", () => {
  const run = (modules: Record<string, unknown>[], without: readonly string[] = []) =>
    find("smp-coding", sourceWith("smp-coding", index(...modules), without));

  test("a week may claim the items weeks.json maps to it", () => {
    expect(run([smp("SMP7-1-M1", { cpCodes: ["D-BK-a"] })])).toEqual([]);
    expect(run([smp("SMP8-2-M1", { cpCodes: ["D-BK-e"] })])).toEqual([]);
  });

  test("an enrichment week claims no CP item at all", () => {
    expect(run([smp("SMP7-2-M2")])).toEqual([]);
    const text = messagesOf(run([smp("SMP7-2-M14", { cpCodes: ["D-BK-e"] })]));
    expect(text).toContain("is an enrichment (pengayaan) week");
  });

  test("a Python overlap item (marked *) is never claimed", () => {
    const text = messagesOf(run([smp("SMP8-2-M2", { cpCodes: ["DK-BK-c"] })]));
    expect(text).toContain("only an overlap (marked * in weeks.json");
    expect(run([smp("SMP8-2-M2")])).toEqual([]);
  });

  test("a CP item the week does not map, an unknown CP item and an unknown week are named", () => {
    const other = messagesOf(run([smp("SMP7-1-M1", { cpCodes: ["D-LD-a"] })]));
    expect(other).toContain('CP item "D-LD-a" is not mapped to week SMP7-1-M1');
    const unknown = messagesOf(run([smp("SMP7-1-M1", { cpCodes: ["D-BK-z"] })]));
    expect(unknown).toContain('CP item "D-BK-z" does not exist in cp-elements.json');
    const weeks = corpora.get("smp-coding")?.get("weeks.json");
    const cut = structuredClone(weeks?.ok === true ? weeks.data : {}) as {
      weeks: { id: string }[];
    };
    cut.weeks = cut.weeks.filter((week) => week.id !== "SMP7-1-M1");
    const source = sourceWith("smp-coding", index(smp("SMP7-1-M1")));
    source.set("weeks.json", { ok: true, data: cut });
    expect(messagesOf(find("smp-coding", source))).toContain(
      'week code "SMP7-1-M1" does not exist in weeks.json',
    );
  });

  test("a week with no mapped item says so", () => {
    const text = messagesOf(run([smp("SMP8-2-M2", { id: "smp8-2-m2", cpCodes: ["D-BK-a"] })]));
    expect(text).toContain("is not mapped to week SMP8-2-M2 in weeks.json (none)");
  });

  test("missing reference files are findings; prerequisites are checked", () => {
    const missing = run(
      [smp("SMP7-1-M1", { cpCodes: ["D-BK-a"] })],
      ["weeks.json", "cp-elements.json"],
    );
    expect(messagesOf(missing)).toContain("weeks.json is missing or invalid");
    expect(messagesOf(missing)).toContain("cp-elements.json is missing or invalid");
    const text = messagesOf(
      run([
        smp("SMP7-1-M1", { prerequisites: ["smp7-1-m2"] }),
        smp("SMP7-1-M2", { prerequisites: ["smp7-1-m1", "SMP7-1-M1"] }),
      ]),
    );
    expect(text).toContain("closes a prerequisite cycle");
  });
});

describe("kuliah-coding module rules", () => {
  const run = (modules: Record<string, unknown>[], without: readonly string[] = []) =>
    find("kuliah-coding", sourceWith("kuliah-coding", index(...modules), without));

  test("knowledge areas of the course's kaCodes and of a knowledge-areas.json link are clean", () => {
    // KUL-U-101: kaCodes SDF, AL; knowledge-areas.json lists it as support of SDF.
    expect(run([kul("KUL-U-101", { knowledgeAreas: ["SDF", "AL"] })])).toEqual([]);
  });

  test("a knowledge area not mapped to the course, a wrong semester and an unknown course are named", () => {
    const text = messagesOf(run([kul("KUL-U-101", { knowledgeAreas: ["NC"], semester: "S5" })]));
    expect(text).toContain('knowledge area "NC" is not mapped to course KUL-U-101');
    expect(text).toContain("course KUL-U-101 is in semester S1 in courses.json, not S5");
    const courses = corpora.get("kuliah-coding")?.get("courses.json");
    const cut = structuredClone(courses?.ok === true ? courses.data : {}) as {
      courses: { code: string }[];
    };
    cut.courses = cut.courses.filter((course) => course.code !== "KUL-U-101");
    const source = sourceWith("kuliah-coding", index(kul("KUL-U-101")));
    source.set("courses.json", { ok: true, data: cut });
    expect(messagesOf(find("kuliah-coding", source))).toContain(
      'course code "KUL-U-101" does not exist in courses.json',
    );
  });

  test("missing reference files are findings", () => {
    const missing = run(
      [kul("KUL-U-101", { knowledgeAreas: ["SDF"] })],
      ["courses.json", "knowledge-areas.json"],
    );
    expect(messagesOf(missing)).toContain("courses.json is missing or invalid");
    expect(messagesOf(missing)).toContain("knowledge-areas.json is missing or invalid");
    expect(run([kul("KUL-U-101")], ["knowledge-areas.json"])).toEqual([]);
  });

  test("prerequisites: a real course code is accepted, an unknown one and a cycle are not", () => {
    expect(run([kul("KUL-U-102", { semester: "S2", prerequisites: ["KUL-U-101"] })])).toEqual([]);
    const text = messagesOf(
      run([
        kul("KUL-U-101", { prerequisites: ["kul-u-102", "KUL-U-999"] }),
        kul("KUL-U-102", { prerequisites: ["kul-u-101"] }),
      ]),
    );
    expect(text).toContain("closes a prerequisite cycle");
    expect(text).toContain('course code "KUL-U-999" does not exist in courses.json');
  });
});

describe("dewasa-coding module rules", () => {
  const run = (modules: Record<string, unknown>[], without: readonly string[] = []) =>
    find("dewasa-coding", sourceWith("dewasa-coding", index(...modules), without));

  test("the shared module and a PRO module with exactly its mapped units are clean", () => {
    expect(run([dw("DW-FND-M1")])).toEqual([]);
    expect(
      run([
        dw("DW-PRO-M1", {
          skkniUnits: ["J.620100.011.01", "J.620100.012.01", "J.620100.026.01"],
          prerequisites: ["DW-FND-M1"],
        }),
      ]),
    ).toEqual([]);
  });

  test("a unit the module is not mapped to, units on a non-PRO module and an unknown module are named", () => {
    const text = messagesOf(
      run([
        dw("DW-PRO-M1", { skkniUnits: ["J.620100.047.01"] }),
        dw("DW-PKJ-M1", { skkniUnits: ["J.620100.011.01"] }),
        dw("DW-FND-M1", { skkniUnits: ["J.620100.011.01"] }),
      ]),
    );
    expect(text).toContain('SKKNI unit "J.620100.047.01" is not mapped to module DW-PRO-M1');
    expect(text).toContain(
      'SKKNI unit "J.620100.011.01": module DW-PKJ-M1 maps no SKKNI unit in module-plan.json',
    );
    expect(text).toContain("module DW-FND-M1 maps no SKKNI unit");

    const unknown = messagesOf(run([dw("DW-PRO-M99")]));
    expect(unknown).toContain(
      'module code "DW-PRO-M99" does not exist in module-plan.json or shared.json',
    );
  });

  test("missing reference files are findings", () => {
    const missing = run(
      [dw("DW-PRO-M1", { skkniUnits: ["J.620100.011.01"] })],
      ["module-plan.json"],
    );
    expect(messagesOf(missing)).toContain("module-plan.json or shared.json is missing or invalid");
    expect(messagesOf(missing)).toContain(
      "cannot be checked: module-plan.json is missing or invalid",
    );
    const noShared = run([dw("DW-FND-M1")], ["shared.json"]);
    expect(messagesOf(noShared)).toContain("module-plan.json or shared.json is missing or invalid");
  });

  test("prerequisites: module codes (including the shared one) and ids; cycle and unknown", () => {
    expect(run([dw("DW-PKJ-M1", { prerequisites: ["DW-FND-M1"] })])).toEqual([]);
    const text = messagesOf(
      run([
        dw("DW-PKJ-M1", { prerequisites: ["dw-pkj-m2", "DW-PKJ-M99", "hilang"] }),
        dw("DW-PKJ-M2", { prerequisites: ["dw-pkj-m1"] }),
      ]),
    );
    expect(text).toContain("closes a prerequisite cycle");
    expect(text).toContain('module code "DW-PKJ-M99" does not exist');
    expect(text).toContain('prerequisite "hilang"');
  });
});

describe("learnerSheetIdentityProblems", () => {
  const problems = (body: string) => learnerSheetIdentityProblems(body).map((p) => p.line);

  test("a sheet without an identity field is clean", () => {
    expect(
      problems(
        [
          "# Lembar Kegiatan",
          "",
          "Nama binatang: kucing",
          "Nama-nama hewan di kebun",
          "Namamu tidak perlu ditulis di sini.",
          "Gambar tiga langkah cuci tangan.",
          "| Langkah | Gambar |",
          "|---|---|",
          "| 1 | pagi |",
          "Alamatkan surat ini ke teman.",
        ].join("\n"),
      ),
    ).toEqual([]);
  });

  test("a heading, fill-in line, filled line or table header of a name or identity is found", () => {
    const body = [
      "# Lembar", // 1
      "Nama: ________", // 2
      "**Nama:** ......", // 3
      "## Nama", // 4
      "- Nama anak: Budi", // 5
      "NIS = 1234", // 6
      "| Nama | Kelas |", // 7
      "|---|---|", // 8
      "Nama ______", // 9
      "> Tanggal lahir:", // 10
      "Alamat:", // 11
      "[ ] Identitas", // 12
      "NAMA KAMU: _____", // 13
    ].join("\n");
    expect(problems(body)).toEqual([2, 3, 4, 5, 6, 7, 9, 10, 11, 12, 13]);
    expect(learnerSheetIdentityProblems(body)[0]).toEqual({ line: 2, text: "Nama: ________" });
  });

  test("CRLF line endings count lines the same way", () => {
    expect(problems("a\r\nNama:\r\nb")).toEqual([2]);
  });
});

describe("module content, learner sheet and loader", () => {
  let repo: string;
  beforeEach(async () => {
    repo = await mkdtemp(join(tmpdir(), "osn-program-modul-"));
    for (const program of PROGRAMS) {
      await mkdir(join(repo, "content", program, "modules"), { recursive: true });
    }
    await mkdir(join(repo, "content", "tk-coding", "lembar"), { recursive: true });
    await mkdir(join(repo, "content", "sd-coding", "lembar"), { recursive: true });
  });
  afterEach(async () => {
    await rm(repo, { recursive: true, force: true });
  });

  const parser = (program: string) => (source: CorpusSource) => parseModulesIndex(source, program);

  test("moduleContentFindings flags a missing and a blank body for every programme", async () => {
    const entries: Record<string, [Record<string, unknown>, Record<string, unknown>]> = {
      "smp-coding": [smp("SMP7-1-M1"), smp("SMP7-1-M2")],
      "kuliah-coding": [kul("KUL-U-101"), kul("KUL-U-102")],
      "dewasa-coding": [dw("DW-FND-M1"), dw("DW-PKJ-M1")],
    };
    for (const [program, [absent, blank]] of Object.entries(entries)) {
      await writeFile(join(repo, `content/${program}/modules/${blank?.id}.md`), "  \n");
      const source = sourceWith(program, index(absent as never, blank as never));
      const findings = await moduleContentFindings(source, repo, program);
      expect(findings.map((f) => f.path)).toEqual([
        "modules[0].contentPath",
        "modules[1].contentPath",
      ]);
      expect(findings[0]?.message).toContain("does not exist");
      expect(findings[1]?.message).toContain("is empty");
    }
  });

  test("tk-coding and sd-coding: a missing, blank or identity-bearing learner sheet is found", async () => {
    const cases: [string, Record<string, unknown>[]][] = [
      ["tk-coding", [tk("TK-A1-M1"), tk("TK-A1-M2"), tk("TK-A1-M3"), tk("TK-A1-M4")]],
      ["sd-coding", [sd("SD1-1-M1"), sd("SD1-1-M2"), sd("SD1-1-M3"), sd("SD1-1-M4")]],
    ];
    for (const [program, modules] of cases) {
      for (const module of modules) {
        await writeFile(join(repo, `content/${program}/modules/${module.id}.md`), "Isi panduan.\n");
      }
      const [absent, blank, named, clean] = modules.map((m) => m.id as string);
      await writeFile(join(repo, `content/${program}/lembar/${blank}.md`), " \n");
      await writeFile(
        join(repo, `content/${program}/lembar/${named}.md`),
        "# Lembar\n\nNama: ______\n",
      );
      await writeFile(join(repo, `content/${program}/lembar/${clean}.md`), "# Lembar\n\nGambar.\n");
      const source = sourceWith(program, index(...modules));
      const findings = await moduleContentFindings(source, repo, program);
      expect(findings.map((f) => f.path)).toEqual([
        "modules[0].learnerSheetPath",
        "modules[1].learnerSheetPath",
        "modules[2].learnerSheetPath",
      ]);
      expect(findings[0]?.message).toContain(
        `learner sheet "content/${program}/lembar/${absent}.md" does not exist`,
      );
      expect(findings[1]?.message).toContain("is empty");
      expect(findings[2]?.message).toContain("line 3 is a name or identity field of the child");
    }
  });

  test("moduleContentFindings uses the programme's own parser (default by id)", async () => {
    const source = sourceWith("smp-coding", index(smp("SMP7-1-M1")));
    expect(
      await moduleContentFindings(source, repo, "smp-coding", parser("smp-coding")),
    ).toHaveLength(1);
    // Under the OSN schema the same index is invalid, so nothing is checked (reported elsewhere).
    expect(await moduleContentFindings(source, repo)).toEqual([]);
  });

  async function corpusDir(program: string, modules: Record<string, unknown>[]): Promise<string> {
    const dir = join(repo, "data", program);
    await mkdir(dir, { recursive: true });
    for (const [name, entry] of corpora.get(program) ?? []) {
      if (name !== "modules.json" && entry.ok) {
        await writeFile(join(dir, name), JSON.stringify(entry.data));
      }
    }
    await writeFile(join(dir, "modules.json"), JSON.stringify({ modules }));
    return dir;
  }

  test("loadModule loads a module of each of the five programmes with explicit references", async () => {
    const samples: [string, Record<string, unknown>][] = [
      ["tk-coding", tk("TK-A1-M1")],
      ["sd-coding", sd("SD1-1-M1")],
      ["smp-coding", smp("SMP7-1-M1")],
      ["kuliah-coding", kul("KUL-U-101")],
      ["dewasa-coding", dw("DW-FND-M1")],
    ];
    for (const [program, module] of samples) {
      await writeFile(
        join(repo, `content/${program}/modules/${module.id}.md`),
        "## Isi\n\nTeks.\n",
      );
      if (module.learnerSheetPath !== undefined) {
        await writeFile(join(repo, String(module.learnerSheetPath)), "# Lembar\n\nGambar.\n");
      }
      const loaded = await loadModule(
        await corpusDir(program, [module]),
        String(module.id),
        repo,
        program,
      );
      if (!loaded.ok) {
        throw new Error(loaded.message);
      }
      expect(loaded.references).toEqual([
        { label: null, title: REFERENCE.title, url: REFERENCE.url },
      ]);
      expect(loaded.body).toContain("Teks.");
      expect(loaded.learnerSheet === undefined).toBe(module.learnerSheetPath === undefined);
    }
  });

  test("loadModule returns the learner sheet of a tk-coding module and fails when it is gone", async () => {
    const module = tk("TK-A1-M1");
    await writeFile(join(repo, "content/tk-coding/modules/tk-a1-m1.md"), "Isi.\n");
    const dir = await corpusDir("tk-coding", [module]);
    const gone = await loadModule(dir, "tk-a1-m1", repo, "tk-coding");
    expect(gone.ok === false && gone.message).toContain("learner sheet");
    expect(gone.ok === false && gone.message).toContain("missing or empty");
    await writeFile(join(repo, "content/tk-coding/lembar/tk-a1-m1.md"), "# Lembar\n");
    const loaded = await loadModule(dir, "tk-a1-m1", repo, "tk-coding");
    expect(loaded.ok && loaded.learnerSheet).toEqual({
      path: "content/tk-coding/lembar/tk-a1-m1.md",
      body: "# Lembar\n",
    });
  });

  test("loadModule reports an unknown id, a missing body, an invalid and an absent index", async () => {
    const dir = await corpusDir("smp-coding", [smp("SMP7-1-M1")]);
    const unknown = await loadModule(dir, "lain", repo, "smp-coding");
    expect(unknown.ok === false && unknown.message).toContain("Known modules: smp7-1-m1");
    const noBody = await loadModule(dir, "smp7-1-m1", repo, "smp-coding");
    expect(noBody.ok === false && noBody.message).toContain("missing or empty");
    const invalid = await loadModule(
      await corpusDir("smp-coding", [{ id: "x" }]),
      "x",
      repo,
      "smp-coding",
    );
    expect(invalid.ok === false && invalid.message).toContain("is invalid");
    const none = join(repo, "kosong");
    await mkdir(none);
    const absent = await loadModule(none, "x", repo, "smp-coding");
    expect(absent.ok === false && absent.message).toContain("has no modules.json");
  });
});
