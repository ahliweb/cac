/**
 * Tests for the cross-programme code check (ADR-0010, issue #177): code
 * extraction for every programme's notation, range ends, the findings for a
 * code that does not exist, the skip of a programme whose code set is not
 * loaded, and the loader that reads the sets from the committed corpora.
 */

import { describe, expect, test } from "bun:test";
import { join } from "node:path";
import { loadCrossProgramCodes, loadProgramRegistry } from "../../src/cli/program-loader";
import {
  CROSS_PROGRAM_CODE_KINDS,
  type CrossProgramCodes,
  crossProgramCodeFindings,
  extractProgramCodes,
} from "../../src/domain/cross-program-refs";

const REPO_ROOT = join(import.meta.dir, "..", "..");

describe("extractProgramCodes", () => {
  test("finds the codes of every programme in order of appearance", () => {
    const text =
      "`TK-B1-M5`, `SD1-1-M8`, `SMP7-1-M3`, `FND-X1-M1`, `A-X1-M9`, `D-XI1-M2`, " +
      "`C-XII2-M13`, `KUL-I-101`, `DW-PRO-M6`, `DW-FND-M1`";
    expect(extractProgramCodes(text)).toEqual([
      { program: "tk-coding", code: "TK-B1-M5" },
      { program: "sd-coding", code: "SD1-1-M8" },
      { program: "smp-coding", code: "SMP7-1-M3" },
      { program: "sma-coding", code: "FND-X1-M1" },
      { program: "sma-coding", code: "A-X1-M9" },
      { program: "sma-coding", code: "D-XI1-M2" },
      { program: "sma-coding", code: "C-XII2-M13" },
      { program: "kuliah-coding", code: "KUL-I-101" },
      { program: "dewasa-coding", code: "DW-PRO-M6" },
      { program: "dewasa-coding", code: "DW-FND-M1" },
    ]);
  });

  test("also yields the end of a range written <code>..M<n>", () => {
    expect(extractProgramCodes("`FND-X1-M1..M7` dan `A-X1-M9..M12`")).toEqual([
      { program: "sma-coding", code: "FND-X1-M1" },
      { program: "sma-coding", code: "FND-X1-M7" },
      { program: "sma-coding", code: "A-X1-M9" },
      { program: "sma-coding", code: "A-X1-M12" },
    ]);
  });

  test("ignores course outcome codes, partial codes and look-alikes", () => {
    expect(extractProgramCodes("KUL-U-101-C1 dan `C-XI2` serta M5 dan PRO-M2")).toEqual([]);
    // A code glued to a longer token is not a code (no letter or digit before it).
    expect(extractProgramCodes("XSD1-1-M8")).toEqual([]);
  });

  test("names a pattern for every programme the loader knows", () => {
    expect(CROSS_PROGRAM_CODE_KINDS.map((kind) => kind.program).sort()).toEqual([
      "dewasa-coding",
      "kuliah-coding",
      "sd-coding",
      "sma-coding",
      "smp-coding",
      "tk-coding",
    ]);
  });
});

describe("crossProgramCodeFindings", () => {
  const codes: CrossProgramCodes = {
    "kuliah-coding": new Set(["KUL-I-101", "KUL-U-101"]),
    "dewasa-coding": new Set(["DW-PRO-M1"]),
  };

  test("accepts codes that exist in their own programme", () => {
    const data = { rows: [{ note: "`KUL-I-101` dan `KUL-U-101`, lalu `DW-PRO-M1`" }] };
    expect(crossProgramCodeFindings("kuliah-bridge.json", data, codes)).toEqual([]);
  });

  test("reports a missing code once per string, with the path of the string", () => {
    const data = { rows: [{ note: "`KUL-I-199` dan `KUL-I-199` serta `DW-PRO-M99`" }] };
    const findings = crossProgramCodeFindings("kuliah-bridge.json", data, codes);
    expect(findings.map((finding) => finding.path)).toEqual(["rows[0].note", "rows[0].note"]);
    expect(findings[0]?.file).toBe("kuliah-bridge.json");
    expect(findings[0]?.severity).toBe("error");
    expect(findings[0]?.message).toContain(
      '"KUL-I-199" is not a course of programme "kuliah-coding"',
    );
    expect(findings[1]?.message).toContain(
      '"DW-PRO-M99" is not a module of programme "dewasa-coding"',
    );
  });

  test("skips a programme whose code set was not loaded and names a root string", () => {
    expect(crossProgramCodeFindings("x.json", { note: "`SMP7-1-M99`" }, codes)).toEqual([]);
    const root = crossProgramCodeFindings("x.json", "`KUL-I-199`", codes);
    expect(root[0]?.path).toBe("(root)");
  });
});

describe("loadCrossProgramCodes", () => {
  test("reads week, course and module codes of every registered programme", async () => {
    const loaded = await loadProgramRegistry();
    if (!loaded.ok) {
      throw new Error(loaded.message);
    }
    const codes = await loadCrossProgramCodes(loaded.registry, REPO_ROOT);
    expect(codes["tk-coding"]?.has("TK-B2-M12")).toBe(true);
    expect(codes["sd-coding"]?.has("SD6-2-M14")).toBe(true);
    expect(codes["smp-coding"]?.has("SMP9-2-M14")).toBe(true);
    expect(codes["sma-coding"]?.has("FND-X1-M7")).toBe(true);
    expect(codes["sma-coding"]?.has("A-XII2-M13")).toBe(true);
    expect(codes["kuliah-coding"]?.has("KUL-I-101")).toBe(true);
    expect(codes["dewasa-coding"]?.has("DW-FND-M1")).toBe(true);
    expect(codes["dewasa-coding"]?.has("DW-PRO-M13")).toBe(true);
  });

  test("leaves out a programme that is not registered or whose files are missing", async () => {
    const loaded = await loadProgramRegistry();
    if (!loaded.ok) {
      throw new Error(loaded.message);
    }
    const onlyKuliah = {
      programs: loaded.registry.programs.filter((program) => program.id === "kuliah-coding"),
    };
    expect(Object.keys(await loadCrossProgramCodes(onlyKuliah, REPO_ROOT))).toEqual([
      "kuliah-coding",
    ]);
    const missing = { programs: [{ ...onlyKuliah.programs[0], corpusDir: "data/tidak-ada" }] };
    // biome-ignore lint/suspicious/noExplicitAny: a deliberately broken registry entry
    expect(await loadCrossProgramCodes(missing as any, REPO_ROOT)).toEqual({});
  });
});
