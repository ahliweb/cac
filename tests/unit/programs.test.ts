/**
 * Tests for the pure registry rules in `src/domain/programs.ts`.
 */

import { describe, expect, test } from "bun:test";
import type { AuditResult, CorpusSource } from "../../src/domain/corpus-audit";
import {
  findProgram,
  listProgramIds,
  registryVersionFindings,
  withExtraFindings,
} from "../../src/domain/programs";
import type { Program, ProgramRegistry } from "../../src/schema/program";

const OSN: Program = {
  id: "osn",
  name: "OSN",
  sourceDocument: "docs/x.pdf",
  syllabusVersion: "2.0",
  syllabusDate: "2026-09-04",
  corpusDir: "data/osn",
};

const REGISTRY: ProgramRegistry = {
  programs: [OSN, { ...OSN, id: "sma-coding", corpusDir: "data/sma-coding" }],
};

describe("findProgram / listProgramIds", () => {
  test("finds a registered programme and returns undefined otherwise", () => {
    expect(findProgram(REGISTRY, "osn")).toBe(OSN);
    expect(findProgram(REGISTRY, "tidak-ada")).toBeUndefined();
  });

  test("lists ids in registry order", () => {
    expect(listProgramIds(REGISTRY)).toBe("osn, sma-coding");
  });
});

describe("registryVersionFindings", () => {
  test("is empty when every file agrees, and ignores unparsable or field-less files", () => {
    const source: CorpusSource = new Map([
      ["a.json", { ok: true, data: { syllabusVersion: "2.0", syllabusDate: "2026-09-04" } }],
      ["b.json", { ok: true, data: { other: 1 } }],
      ["c.json", { ok: true, data: [1, 2] }],
      ["d.json", { ok: true, data: null }],
      ["e.json", { ok: false, error: "bad json" }],
    ]);
    expect(registryVersionFindings(OSN, source)).toEqual([]);
  });

  test("reports each disagreeing field of each file, naming file and field", () => {
    const source: CorpusSource = new Map([
      ["a.json", { ok: true, data: { syllabusVersion: "3.0", syllabusDate: "2026-09-04" } }],
      ["b.json", { ok: true, data: { syllabusVersion: "2.0", syllabusDate: "2027-01-01" } }],
    ]);
    const findings = registryVersionFindings(OSN, source);
    expect(findings.map((finding) => `${finding.file}:${finding.path}`)).toEqual([
      "a.json:syllabusVersion",
      "b.json:syllabusDate",
    ]);
    expect(findings[0]?.message).toContain('programme "osn"');
    expect(findings.every((finding) => finding.severity === "error")).toBe(true);
  });
});

describe("withExtraFindings", () => {
  const clean: AuditResult = {
    ok: true,
    findings: [],
    summary: {
      filesValidated: 3,
      filesMissing: 0,
      filesUnregistered: 0,
      findingCount: 0,
      errorCount: 0,
      warningCount: 0,
    },
  };

  test("returns the same result when there is nothing to add", () => {
    expect(withExtraFindings(clean, [])).toBe(clean);
  });

  test("merges findings, flips ok and recomputes counts", () => {
    const merged = withExtraFindings(clean, [
      { file: "x.json", path: "p", message: "m", severity: "error" },
      { file: "y.json", path: "p", message: "m", severity: "warning" },
    ]);
    expect(merged.ok).toBe(false);
    expect(merged.summary.findingCount).toBe(2);
    expect(merged.summary.errorCount).toBe(1);
    expect(merged.summary.warningCount).toBe(1);
    expect(merged.summary.filesValidated).toBe(3);
  });
});
