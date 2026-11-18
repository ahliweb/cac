/**
 * Tests for `src/schema/sma-module.ts` (issue #106, ADR-0007): the
 * `sma-coding` module-index schema -- shape, the shared review rule, the
 * Panduan Informatika 2025 reference, and prerequisite/uniqueness rules.
 */

import { describe, expect, test } from "bun:test";
import { smaModuleSchema, smaModulesFileSchema } from "../../src/schema/sma-module";

const PANDUAN_2025 = {
  title: "Panduan Mata Pelajaran Informatika, Fase D – F, BSKAP Kemendikdasmen, 2025",
  url: "https://repositori.kemendikdasmen.go.id/33634/1/32.%20Panduan%20Mata%20Pelajaran%20Informatika.pdf",
};

function entry(overrides: Record<string, unknown> = {}): Record<string, unknown> {
  return {
    id: "contoh-modul",
    title: "Modul Contoh",
    cpItems: ["E-BK-a"],
    weekCodes: ["FND-X1-M2", "A-X1-M8"],
    bridgeFamilies: ["graph-tree"],
    gradeLevels: ["X"],
    prerequisites: ["FND-X1-M1"],
    audience: "siswa",
    language: "id",
    status: "draf",
    references: [PANDUAN_2025],
    contentPath: "content/sma-coding/modules/contoh-modul.md",
    ...overrides,
  };
}

const messages = (value: unknown) => {
  const result = smaModuleSchema.safeParse(value);
  return result.success ? [] : result.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`);
};

describe("smaModuleSchema", () => {
  test("accepts a full entry, with the Panduan 2025 reference", () => {
    expect(smaModuleSchema.safeParse(entry()).success).toBe(true);
  });

  test("a series module may leave cpItems, weekCodes, bridgeFamilies and prerequisites empty", () => {
    const result = smaModuleSchema.safeParse(
      entry({ cpItems: [], weekCodes: [], bridgeFamilies: [], prerequisites: [] }),
    );
    expect(result.success).toBe(true);
  });

  test("a module id may be a prerequisite", () => {
    expect(smaModuleSchema.safeParse(entry({ prerequisites: ["modul-lain"] })).success).toBe(true);
  });

  test("rejects a track week code as a prerequisite (only FND codes or module ids)", () => {
    expect(messages(entry({ prerequisites: ["A-X1-M8"] })).join("\n")).toContain("prerequisites.0");
  });

  test("requires at least one grade level, and a valid one", () => {
    expect(messages(entry({ gradeLevels: [] }))).not.toEqual([]);
    expect(messages(entry({ gradeLevels: ["IX"] }))).not.toEqual([]);
    expect(smaModuleSchema.safeParse(entry({ gradeLevels: ["X", "XI", "XII"] })).success).toBe(
      true,
    );
  });

  test("requires at least one https reference and rejects refId and http", () => {
    expect(messages(entry({ references: [] }))).not.toEqual([]);
    expect(messages(entry({ references: [{ refId: "R1" }] }))).not.toEqual([]);
    expect(
      messages(entry({ references: [{ title: "T", url: "http://contoh.example" }] })).join("\n"),
    ).toContain("https");
  });

  test("rejects malformed codes and non-kebab ids", () => {
    expect(messages(entry({ cpItems: ["X-BK-a"] }))).not.toEqual([]);
    expect(messages(entry({ weekCodes: ["A-X1-M15"] }))).not.toEqual([]);
    expect(messages(entry({ id: "Contoh_Modul" }))).not.toEqual([]);
  });

  test("audience must be siswa and language id", () => {
    expect(messages(entry({ audience: "guru" }))).not.toEqual([]);
    expect(messages(entry({ language: "en" }))).not.toEqual([]);
  });

  test("rejects unknown fields (strict)", () => {
    expect(messages(entry({ topicFamilies: ["graph-tree"] }))).not.toEqual([]);
  });

  test("review is required exactly when the status is disetujui (ADR-0007)", () => {
    const review = { approvedOn: "2026-11-19", reviewerRole: "pemilik" };
    expect(messages(entry({ status: "disetujui" })).join("\n")).toContain("review");
    expect(smaModuleSchema.safeParse(entry({ status: "disetujui", review })).success).toBe(true);
    for (const status of ["draf", "ditinjau", "ditarik"]) {
      expect(messages(entry({ status, review })).join("\n")).toContain("review");
      expect(smaModuleSchema.safeParse(entry({ status })).success).toBe(true);
    }
  });

  test("review dates must be real and the review takes no extra (personal) fields", () => {
    expect(
      messages(
        entry({ status: "disetujui", review: { approvedOn: "2026-02-30", reviewerRole: "p" } }),
      ),
    ).not.toEqual([]);
    expect(
      messages(
        entry({
          status: "disetujui",
          review: { approvedOn: "2026-11-19", reviewerRole: "p", name: "Seseorang" },
        }),
      ),
    ).not.toEqual([]);
  });

  test("contentPath must be content/sma-coding/modules/<id>.md for the module's own id", () => {
    expect(messages(entry({ contentPath: "content/osn/modules/contoh-modul.md" }))).not.toEqual([]);
    expect(messages(entry({ contentPath: "content/sma-coding/modules/lain.md" }))).not.toEqual([]);
  });

  test("list fields reject duplicates", () => {
    for (const [field, value] of [
      ["cpItems", ["E-BK-a", "E-BK-a"]],
      ["weekCodes", ["A-X1-M8", "A-X1-M8"]],
      ["bridgeFamilies", ["graph-tree", "graph-tree"]],
      ["gradeLevels", ["X", "X"]],
      ["prerequisites", ["a", "a"]],
    ] as const) {
      expect(messages(entry({ [field]: value })).join("\n")).toContain(`${field} must be unique`);
    }
  });
});

describe("smaModulesFileSchema", () => {
  test("accepts an empty index and an index with entries", () => {
    expect(smaModulesFileSchema.safeParse({ modules: [] }).success).toBe(true);
    expect(smaModulesFileSchema.safeParse({ modules: [entry()] }).success).toBe(true);
  });

  test("rejects duplicate module ids and extra top-level keys", () => {
    const duplicate = smaModulesFileSchema.safeParse({ modules: [entry(), entry()] });
    expect(duplicate.success).toBe(false);
    expect(smaModulesFileSchema.safeParse({ modules: [], extra: 1 }).success).toBe(false);
  });
});
