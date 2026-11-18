/**
 * Tests for the programme table `src/cli/program-registry.ts` (ADR-0008,
 * issue #140): its entries agree with `data/programs.json` and the data
 * directories, a registered programme without an entry is reported (not
 * skipped), and an entry without a registry record is not validated.
 */

import { describe, expect, test } from "bun:test";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { auditProgram } from "../../src/cli/commands/validate";
import { loadCorpusFromDirectory } from "../../src/cli/corpus-loader";
import { DATA_ROOT, loadProgramRegistry } from "../../src/cli/program-loader";
import {
  emptyAuditResult,
  fidelityProgramIds,
  findProgramModule,
  missingProgramModuleFinding,
  PROGRAM_MODULES,
} from "../../src/cli/program-registry";
import type { Program } from "../../src/schema/program";

const ghost: Program = {
  id: "ghost-coding",
  name: "Program tanpa entri tabel",
  sourceDocument: "docs/programs/sma-coding/silabus.md",
  syllabusVersion: "1.0",
  syllabusDate: "2026-11-19",
  corpusDir: "data/ghost-coding",
};

describe("PROGRAM_MODULES", () => {
  test("ids are unique and every registered programme has an entry", async () => {
    const ids = PROGRAM_MODULES.map((module) => module.id);
    expect(new Set(ids).size).toBe(ids.length);
    const loaded = await loadProgramRegistry();
    if (!loaded.ok) {
      throw new Error(loaded.message);
    }
    for (const program of loaded.registry.programs) {
      expect(findProgramModule(program.id)).toBeDefined();
    }
  });

  test("every declared data file exists in the programme's corpus directory", async () => {
    for (const module of PROGRAM_MODULES) {
      const source = await loadCorpusFromDirectory(join(DATA_ROOT, module.id));
      for (const { file } of module.dataFiles) {
        expect(source.has(file)).toBe(true);
      }
    }
  });

  test("the committed corpora audit clean through the table", async () => {
    for (const module of PROGRAM_MODULES) {
      const source = await loadCorpusFromDirectory(join(DATA_ROOT, module.id));
      const loaded = await loadProgramRegistry();
      if (!loaded.ok) {
        throw new Error(loaded.message);
      }
      const program = loaded.registry.programs.find((entry) => entry.id === module.id);
      if (program === undefined) {
        throw new Error(`${module.id} not registered`);
      }
      const result = await auditProgram(program, join(DATA_ROOT, module.id), loaded.registry);
      expect(result.findings).toEqual([]);
      expect(source.size).toBeGreaterThan(0);
    }
  });

  test("only sma-coding needs the OSN topic families; sma-coding and tk-coding have a fidelity module (today)", () => {
    expect(findProgramModule("osn")?.needsOsnTopicFamilyIds).toBe(false);
    expect(findProgramModule("sma-coding")?.needsOsnTopicFamilyIds).toBe(true);
    expect(findProgramModule("tk-coding")?.needsOsnTopicFamilyIds).toBe(false);
    expect(fidelityProgramIds()).toEqual(["sma-coding", "tk-coding"]);
  });

  test("findProgramModule returns undefined for an id with no entry", () => {
    expect(findProgramModule("ghost-coding")).toBeUndefined();
  });
});

describe("a registered programme without a table entry", () => {
  test("missingProgramModuleFinding names the programme and the table", () => {
    const finding = missingProgramModuleFinding(ghost);
    expect(finding.severity).toBe("error");
    expect(finding.file).toBe("programs.json");
    expect(finding.path).toBe("programs[ghost-coding]");
    expect(finding.message).toContain("PROGRAM_MODULES");
    expect(emptyAuditResult().ok).toBe(true);
  });

  test("auditProgram reports it instead of staying silent", async () => {
    const dir = await mkdtemp(join(tmpdir(), "osn-ghost-"));
    try {
      const loaded = await loadProgramRegistry();
      if (!loaded.ok) {
        throw new Error(loaded.message);
      }
      const result = await auditProgram(ghost, dir, loaded.registry);
      expect(result.ok).toBe(false);
      expect(result.findings.map((finding) => finding.path)).toContain("programs[ghost-coding]");
      expect(result.summary.errorCount).toBe(1);
    } finally {
      await rm(dir, { recursive: true, force: true });
    }
  });
});
