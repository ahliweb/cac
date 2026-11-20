/**
 * End-to-end tests of `osn validate` with the module index of each of the
 * five programmes `tk-coding`, `sd-coding`, `smp-coding`, `kuliah-coding` and
 * `dewasa-coding` (ADR-0007, ADR-0008): the real CLI as a subprocess against
 * a temporary copy of the repository (see
 * `tests/helpers/program-modules-repo.ts`) in which a synthetic
 * `modules.json` and synthetic content files are added.
 */

import { afterAll, beforeAll, describe, expect, test } from "bun:test";
import { rm } from "node:fs/promises";
import {
  dwSheeted as dw,
  kulSheeted as kul,
  sd,
  smpSheeted as smp,
  tk,
} from "../helpers/program-module-entries";
import { createProgramModulesRepo, type ProgramModulesRepo } from "../helpers/program-modules-repo";

let repo: ProgramModulesRepo;

beforeAll(async () => {
  repo = await createProgramModulesRepo();
});
afterAll(async () => {
  await repo.dispose();
});

type Entry = Record<string, unknown>;

interface Scenario {
  readonly program: string;
  /** A valid index: entries plus the files they need. */
  readonly valid: Entry[];
  /** An invalid index (with its content files written) and what `osn validate` must say. */
  readonly bad: Entry[];
  readonly fragments: readonly string[];
  /** Whether the entries carry a sheet (tk/sd: the child's sheet; the others: an own-status worksheet). */
  readonly sheets: boolean;
  /** Whether the sheet has its own status (ADR-0011): smp, kuliah, dewasa. */
  readonly ownStatus: boolean;
}

const SCENARIOS: readonly Scenario[] = [
  {
    program: "tk-coding",
    sheets: true,
    ownStatus: false,
    valid: [
      tk("TK-A1-M1", { cpOverlap: ["FF-DL-b"] }),
      tk("TK-A1-M2", { prerequisites: ["tk-a1-m1"] }),
    ],
    bad: [
      tk("TK-A1-M1", { cpOverlap: ["FF-DL-d"], prerequisites: ["tk-a1-m2", "hilang"] }),
      tk("TK-A1-M2", { prerequisites: ["tk-a1-m1"] }),
    ],
    fragments: [
      'CP item "FF-DL-d" is not among the CP items week TK-A1-M1 overlaps',
      "prerequisite cycle",
      'prerequisite "hilang"',
    ],
  },
  {
    program: "sd-coding",
    sheets: true,
    ownStatus: false,
    valid: [sd("SD5-1-M3", { cpItems: ["C-BK-a"] }), sd("SD1-1-M1")],
    bad: [
      sd("SD5-1-M3", { cpItems: ["C-LD-a"], prerequisites: ["sd1-1-m1"] }),
      sd("SD1-1-M1", { cpItems: ["C-BK-a"], prerequisites: ["sd5-1-m3"] }),
      sd("SD5-1-M11", { cpItems: ["C-BK-c"] }),
    ],
    fragments: [
      'week SD5-1-M3 does not fulfil CP item "C-LD-a" according to cp-mapping.json',
      "kelas 1-4 introduction (outside the CP)",
      "strengthening week ([penguatan])",
      "prerequisite cycle",
    ],
  },
  {
    program: "smp-coding",
    sheets: true,
    ownStatus: true,
    valid: [smp("SMP7-1-M1", { cpCodes: ["D-BK-a"] }), smp("SMP8-2-M2")],
    bad: [
      smp("SMP7-1-M1", { cpCodes: ["D-LD-a"] }),
      smp("SMP7-2-M14", { cpCodes: ["D-BK-e"] }),
      smp("SMP8-2-M2", { cpCodes: ["DK-BK-c"], prerequisites: ["hilang"] }),
    ],
    fragments: [
      'CP item "D-LD-a" is not mapped to week SMP7-1-M1',
      "is an enrichment (pengayaan) week",
      "only an overlap (marked * in weeks.json",
      'prerequisite "hilang"',
    ],
  },
  {
    program: "kuliah-coding",
    sheets: true,
    ownStatus: true,
    valid: [
      kul("KUL-U-101", { knowledgeAreas: ["SDF", "AL"] }),
      kul("KUL-U-102", { semester: "S2", prerequisites: ["kul-u-101"] }),
    ],
    bad: [
      kul("KUL-U-101", { knowledgeAreas: ["NC"], prerequisites: ["kul-u-102"] }),
      kul("KUL-U-102", { semester: "S2", prerequisites: ["kul-u-101", "KUL-U-999"] }),
      kul("KUL-I-101", { semester: "S7" }),
    ],
    fragments: [
      'knowledge area "NC" is not mapped to course KUL-U-101',
      'course code "KUL-U-999" does not exist in courses.json',
      "course KUL-I-101 is in semester",
      "prerequisite cycle",
    ],
  },
  {
    program: "dewasa-coding",
    sheets: true,
    ownStatus: true,
    valid: [
      dw("DW-FND-M1"),
      dw("DW-PRO-M1", {
        skkniUnits: ["J.620100.011.01"],
        prerequisites: ["DW-FND-M1"],
      }),
    ],
    bad: [
      dw("DW-PRO-M1", { skkniUnits: ["J.620100.047.01"], prerequisites: ["dw-pro-m2"] }),
      dw("DW-PRO-M2", { prerequisites: ["dw-pro-m1"] }),
      dw("DW-PKJ-M1", { skkniUnits: ["J.620100.011.01"] }),
    ],
    fragments: [
      'SKKNI unit "J.620100.047.01" is not mapped to module DW-PRO-M1',
      "maps no SKKNI unit in module-plan.json",
      "prerequisite cycle",
    ],
  },
];

async function writeContent(entries: Entry[], sheets: boolean): Promise<void> {
  for (const entry of entries) {
    await repo.write(String(entry.contentPath), "## Isi modul\n\nTeks isi sintetis.\n");
    if (sheets) {
      await repo.write(String(entry.learnerSheetPath), "# Lembar\n\nGambar sintetis.\n");
    }
  }
}

describe("osn validate --program <id> with a module index", () => {
  for (const scenario of SCENARIOS) {
    describe(scenario.program, () => {
      test("a valid index with its content files is clean (exit 0)", async () => {
        await repo.setIndex(scenario.program, scenario.valid);
        await writeContent(scenario.valid, scenario.sheets);
        const result = await repo.cli("validate", "--program", scenario.program);
        expect(result.stderr).toBe("");
        expect(result.stdout).not.toContain("modules.json");
        expect(result.exitCode).toBe(0);
      });

      test("a bad index is exit 1 and every problem is named in one pass", async () => {
        await repo.setIndex(scenario.program, scenario.bad);
        await writeContent(scenario.bad, scenario.sheets);
        const result = await repo.cli("validate", "--program", scenario.program);
        expect(result.exitCode).toBe(1);
        for (const fragment of scenario.fragments) {
          expect(result.stdout).toContain(fragment);
        }
      });

      test("a missing and an empty content file are findings", async () => {
        await repo.setIndex(scenario.program, scenario.valid);
        await writeContent(scenario.valid, scenario.sheets);
        const [first, second] = scenario.valid;
        await repo.write(String((first as Entry).contentPath), "\n");
        const missing = String((second as Entry).contentPath);
        await repo.write(missing, "x");
        await rm(`${repo.root}/${missing}`);
        const result = await repo.cli("validate", "--program", scenario.program);
        expect(result.exitCode).toBe(1);
        expect(result.stdout).toContain(
          `content file "${String((first as Entry).contentPath)}" is empty`,
        );
        expect(result.stdout).toContain(`content file "${missing}" does not exist`);
      });

      test("an id that is not the lower-case unit code is a schema violation (exit 1)", async () => {
        const wrong = { ...(scenario.valid[0] as Entry), id: "bukan-kode-satuan" };
        await repo.setIndex(scenario.program, [wrong]);
        const result = await repo.cli("validate", "--program", scenario.program);
        expect(result.exitCode).toBe(1);
        expect(result.stdout).toContain("the lower-case form of the unit code");
      });

      test("an OSN-shaped entry is a schema violation (exit 1)", async () => {
        await repo.setIndex(scenario.program, [
          { ...(scenario.valid[0] as Entry), topicFamilies: ["graph-tree"] },
        ]);
        const result = await repo.cli("validate", "--program", scenario.program);
        expect(result.exitCode).toBe(1);
        expect(result.stdout).toContain("modules.json");
      });

      test("without modules.json the programme is still valid", async () => {
        await rm(`${repo.root}/data/${scenario.program}/modules.json`, { force: true });
        const result = await repo.cli("validate", "--program", scenario.program);
        expect(result.stderr).toBe("");
        expect(result.exitCode).toBe(0);
      });
    });
  }

  for (const program of ["tk-coding", "sd-coding"]) {
    test(`${program}: a learner sheet that is missing, empty or has a name field is exit 1`, async () => {
      const make = program === "tk-coding" ? tk : sd;
      const codes =
        program === "tk-coding"
          ? ["TK-A2-M5", "TK-A2-M6", "TK-A2-M7"]
          : ["SD1-2-M5", "SD1-2-M6", "SD1-2-M7"];
      const entries = codes.map((code) => make(code));
      await repo.setIndex(program, entries);
      for (const entry of entries) {
        await repo.write(String(entry.contentPath), "## Panduan\n\nTeks.\n");
      }
      // The synthetic codes may name real modules whose sheets exist in the
      // copied repository; the first sheet must be absent for this case.
      await rm(`${repo.root}/${String(entries[0]?.learnerSheetPath)}`, { force: true });
      await repo.write(String(entries[1]?.learnerSheetPath), "\n");
      await repo.write(String(entries[2]?.learnerSheetPath), "# Lembar\n\nNama: ________\n");
      const result = await repo.cli("validate", "--program", program);
      expect(result.exitCode).toBe(1);
      expect(result.stdout).toContain(
        `learner sheet "${String(entries[0]?.learnerSheetPath)}" does not exist`,
      );
      expect(result.stdout).toContain(
        `learner sheet "${String(entries[1]?.learnerSheetPath)}" is empty`,
      );
      expect(result.stdout).toContain("line 3 is a name or identity field of the child");
    });
  }

  describe("own-status worksheets (smp-coding, kuliah-coding, dewasa-coding; ADR-0011)", () => {
    const sheetEntry = (scenario: Scenario, extra: Entry = {}): Entry => {
      const entry = scenario.valid[0] as Entry;
      return {
        ...entry,
        learnerSheetPath: `content/${scenario.program}/lembar/${String(entry.id)}.md`,
        learnerSheetStatus: "draf",
        ...extra,
      };
    };

    for (const scenario of SCENARIOS.filter((s) => s.ownStatus)) {
      test(`${scenario.program}: a draft worksheet is clean, a bad one is checked like TK/SD`, async () => {
        const entry = sheetEntry(scenario);
        const path = String(entry.learnerSheetPath);
        await repo.setIndex(scenario.program, [entry]);
        await repo.write(String(entry.contentPath), "## Isi\n\nTeks.\n");
        // the copy may hold the repository's real sheet for this id; the first case needs it absent
        await rm(`${repo.root}/${path}`, { force: true });

        // missing
        expect((await repo.cli("validate", "--program", scenario.program)).stdout).toContain(
          `learner sheet "${path}" does not exist`,
        );
        // empty
        await repo.write(path, "\n");
        expect((await repo.cli("validate", "--program", scenario.program)).stdout).toContain(
          `learner sheet "${path}" is empty`,
        );
        // a name field
        await repo.write(path, "## Latihan\n\nNama: ______\n");
        const named = await repo.cli("validate", "--program", scenario.program);
        expect(named.exitCode).toBe(1);
        expect(named.stdout).toContain("line 3 is a name or identity field of the child");
        // clean
        await repo.write(path, "## Latihan\n\nKerjakan tiga soal.\n");
        const clean = await repo.cli("validate", "--program", scenario.program);
        expect(clean.stderr).toBe("");
        expect(clean.stdout).not.toContain("modules.json");
        expect(clean.exitCode).toBe(0);
      });

      test(`${scenario.program}: a sheet status without a path, or a path without status, is exit 1`, async () => {
        const entry = sheetEntry(scenario);
        await repo.setIndex(scenario.program, [{ ...entry, learnerSheetStatus: undefined }]);
        const noStatus = await repo.cli("validate", "--program", scenario.program);
        expect(noStatus.exitCode).toBe(1);
        expect(noStatus.stdout).toContain("`learnerSheetStatus` is required exactly when");
        await repo.setIndex(scenario.program, [{ ...entry, learnerSheetPath: undefined }]);
        const noPath = await repo.cli("validate", "--program", scenario.program);
        expect(noPath.exitCode).toBe(1);
        expect(noPath.stdout).toContain("`learnerSheetStatus` is required exactly when");
      });
    }
  });

  describe("orphan sheets", () => {
    for (const scenario of SCENARIOS) {
      test(`${scenario.program}: a lembar file no index entry points at is exit 1`, async () => {
        await repo.setIndex(scenario.program, scenario.valid);
        await writeContent(scenario.valid, scenario.sheets);
        const orphan = `content/${scenario.program}/lembar/tidak-terindeks.md`;
        await repo.write(orphan, "## Latihan\n");
        const result = await repo.cli("validate", "--program", scenario.program);
        expect(result.exitCode).toBe(1);
        expect(result.stdout).toContain(
          `orphan learner sheet "${orphan}": no module entry has it as learnerSheetPath`,
        );
        await rm(`${repo.root}/${orphan}`);
        expect((await repo.cli("validate", "--program", scenario.program)).exitCode).toBe(0);
      });
    }
  });
});
