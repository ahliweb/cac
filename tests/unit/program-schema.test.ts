/**
 * Tests for the programme registry schema (`src/schema/program.ts`) and
 * the committed `data/programs.json` (ADR-0006).
 */

import { describe, expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { parseProgramRegistry } from "../../src/domain/programs";
import { programIdSchema, programRegistrySchema } from "../../src/schema/program";

const REGISTRY_PATH = join(import.meta.dir, "..", "..", "data", "programs.json");

function validProgram(overrides: Record<string, unknown> = {}) {
  return {
    id: "osn",
    name: "Silabus Operasional Pembinaan OSN Informatika 2026",
    sourceDocument: "docs/silabus.pdf",
    syllabusVersion: "2.0",
    syllabusDate: "2026-09-04",
    corpusDir: "data/osn",
    ...overrides,
  };
}

describe("data/programs.json", () => {
  const raw: unknown = JSON.parse(readFileSync(REGISTRY_PATH, "utf-8"));

  test("parses against the registry schema", () => {
    expect(() => parseProgramRegistry(raw)).not.toThrow();
  });

  test("registers the osn programme with its source version and date", () => {
    const registry = parseProgramRegistry(raw);
    const osn = registry.programs.find((program) => program.id === "osn");
    expect(osn).toBeDefined();
    expect(osn?.name).toBe("Silabus Operasional Pembinaan OSN Informatika 2026");
    expect(osn?.syllabusVersion).toBe("2.0");
    expect(osn?.syllabusDate).toBe("2026-09-04");
    expect(osn?.corpusDir).toBe("data/osn");
    expect(osn?.sourceDocument.endsWith(".pdf")).toBe(true);
  });
});

describe("programIdSchema", () => {
  test("accepts lower-case kebab-case ids", () => {
    expect(programIdSchema.safeParse("osn").success).toBe(true);
    expect(programIdSchema.safeParse("sma-coding").success).toBe(true);
  });

  test.each(["OSN", "sma_coding", "-osn", "osn-", "sma coding", ""])("rejects %p", (id) => {
    expect(programIdSchema.safeParse(id).success).toBe(false);
  });
});

describe("programRegistrySchema", () => {
  test("accepts a minimal valid registry", () => {
    expect(programRegistrySchema.safeParse({ programs: [validProgram()] }).success).toBe(true);
  });

  test("rejects an empty registry", () => {
    expect(programRegistrySchema.safeParse({ programs: [] }).success).toBe(false);
  });

  test("rejects duplicate programme ids", () => {
    const result = programRegistrySchema.safeParse({
      programs: [validProgram(), validProgram()],
    });
    expect(result.success).toBe(false);
  });

  test("rejects a corpusDir that is not data/<id>", () => {
    const result = programRegistrySchema.safeParse({
      programs: [validProgram({ corpusDir: "data/lain" })],
    });
    expect(result.success).toBe(false);
  });

  test("rejects a malformed syllabusDate", () => {
    const result = programRegistrySchema.safeParse({
      programs: [validProgram({ syllabusDate: "4 September 2026" })],
    });
    expect(result.success).toBe(false);
  });

  test.each(["/etc/passwd", "../luar.pdf", "docs/../../luar.pdf"])(
    "rejects a non repository-relative sourceDocument %p",
    (sourceDocument) => {
      const result = programRegistrySchema.safeParse({
        programs: [validProgram({ sourceDocument })],
      });
      expect(result.success).toBe(false);
    },
  );

  test("rejects unknown keys on a programme and on the registry", () => {
    expect(
      programRegistrySchema.safeParse({ programs: [validProgram({ extra: 1 })] }).success,
    ).toBe(false);
    expect(programRegistrySchema.safeParse({ programs: [validProgram()], extra: 1 }).success).toBe(
      false,
    );
  });

  test("parseProgramRegistry reports the file name and every issue", () => {
    expect(() => parseProgramRegistry({ programs: [validProgram({ id: "OSN" })] })).toThrow(
      /programs\.json/,
    );
  });
});
