/**
 * Tests for `src/schema/module.ts` (issue #54, ADR-0007): the module-index
 * schema, in particular the status/review refine.
 */

import { describe, expect, test } from "bun:test";
import { moduleSchema, modulesFileSchema, parseContentPath } from "../../src/schema/module";

function valid(overrides: Record<string, unknown> = {}): Record<string, unknown> {
  const merged: Record<string, unknown> = {
    id: "contoh",
    title: "Contoh",
    topicFamilies: ["dasar-pemrograman"],
    weeks: [1],
    audience: "siswa",
    language: "id",
    status: "draf",
    references: [{ refId: "R1" }],
    contentPath: "content/osn/modules/contoh.md",
    ...overrides,
  };
  // every OSN module carries its worksheet (OSN_LEARNER_SHEET_REQUIRED, #285)
  return {
    learnerSheetPath: `content/osn/lembar/${String(merged.id)}.md`,
    learnerSheetStatus: "draf",
    ...merged,
  };
}

function messages(value: unknown): string[] {
  const result = moduleSchema.safeParse(value);
  return result.success ? [] : result.error.issues.map((issue) => issue.message);
}

describe("moduleSchema", () => {
  test("accepts a draft without review and without weeks", () => {
    expect(moduleSchema.safeParse(valid()).success).toBe(true);
    const { weeks: _weeks, ...withoutWeeks } = valid();
    expect(moduleSchema.safeParse(withoutWeeks).success).toBe(true);
  });

  test("accepts an explicit https reference", () => {
    const result = moduleSchema.safeParse(
      valid({ references: [{ title: "Sumber", url: "https://contoh.example/halaman" }] }),
    );
    expect(result.success).toBe(true);
  });

  test("rejects an http reference, an unknown key, and an empty reference list", () => {
    expect(
      moduleSchema.safeParse(valid({ references: [{ title: "S", url: "http://contoh.example" }] }))
        .success,
    ).toBe(false);
    expect(moduleSchema.safeParse(valid({ nama: "x" })).success).toBe(false);
    expect(moduleSchema.safeParse(valid({ references: [] })).success).toBe(false);
  });

  test("rejects a non-student audience and a non-Indonesian language", () => {
    expect(moduleSchema.safeParse(valid({ audience: "mentor" })).success).toBe(false);
    expect(moduleSchema.safeParse(valid({ language: "en" })).success).toBe(false);
  });

  test("rejects an unknown status", () => {
    expect(moduleSchema.safeParse(valid({ status: "final" })).success).toBe(false);
  });

  test("disetujui requires a review with a real date and a role", () => {
    expect(messages(valid({ status: "disetujui" })).join(" ")).toContain("`review`");
    const approved = valid({
      status: "disetujui",
      review: { approvedOn: "2026-11-18", reviewerRole: "pemilik" },
    });
    expect(moduleSchema.safeParse(approved).success).toBe(true);
    expect(
      moduleSchema.safeParse(
        valid({
          status: "disetujui",
          review: { approvedOn: "2026-02-30", reviewerRole: "pemilik" },
        }),
      ).success,
    ).toBe(false);
    expect(
      moduleSchema.safeParse(
        valid({
          status: "disetujui",
          review: { approvedOn: "18-11-2026", reviewerRole: "pemilik" },
        }),
      ).success,
    ).toBe(false);
    expect(
      moduleSchema.safeParse(
        valid({ status: "disetujui", review: { approvedOn: "2026-11-18", reviewerRole: "  " } }),
      ).success,
    ).toBe(false);
  });

  test.each(["draf", "ditinjau", "ditarik"])("review is forbidden when status is %s", (status) => {
    const result = moduleSchema.safeParse(
      valid({ status, review: { approvedOn: "2026-11-18", reviewerRole: "pemilik" } }),
    );
    expect(result.success).toBe(false);
    expect(
      messages(valid({ status, review: { approvedOn: "2026-11-18", reviewerRole: "x" } })).join(
        " ",
      ),
    ).toContain("forbidden otherwise");
  });

  test("a review carries only a date and a role (no name field)", () => {
    const result = moduleSchema.safeParse(
      valid({
        status: "disetujui",
        review: { approvedOn: "2026-11-18", reviewerRole: "pemilik", name: "Seseorang" },
      }),
    );
    expect(result.success).toBe(false);
  });

  test("contentPath must match the id and the content layout", () => {
    expect(
      moduleSchema.safeParse(valid({ contentPath: "content/osn/modules/lain.md" })).success,
    ).toBe(false);
    expect(moduleSchema.safeParse(valid({ contentPath: "data/osn/contoh.md" })).success).toBe(
      false,
    );
    expect(
      moduleSchema.safeParse(valid({ contentPath: "content/osn/modules/../contoh.md" })).success,
    ).toBe(false);
    expect(
      moduleSchema.safeParse(valid({ contentPath: "/content/osn/modules/contoh.md" })).success,
    ).toBe(false);
  });

  test("rejects duplicate families, duplicate weeks, and out-of-range weeks", () => {
    expect(
      moduleSchema.safeParse(valid({ topicFamilies: ["dasar-pemrograman", "dasar-pemrograman"] }))
        .success,
    ).toBe(false);
    expect(moduleSchema.safeParse(valid({ weeks: [1, 1] })).success).toBe(false);
    expect(moduleSchema.safeParse(valid({ weeks: [0] })).success).toBe(false);
    expect(moduleSchema.safeParse(valid({ weeks: [29] })).success).toBe(false);
    expect(moduleSchema.safeParse(valid({ topicFamilies: [] })).success).toBe(false);
  });
});

describe("modulesFileSchema and parseContentPath", () => {
  test("module ids must be unique", () => {
    expect(modulesFileSchema.safeParse({ modules: [valid(), valid()] }).success).toBe(false);
    expect(modulesFileSchema.safeParse({ modules: [valid()] }).success).toBe(true);
    expect(modulesFileSchema.safeParse({ modules: [], extra: 1 }).success).toBe(false);
  });

  test("parseContentPath splits programme and id", () => {
    expect(parseContentPath("content/sma-coding/modules/a-b.md")).toEqual({
      program: "sma-coding",
      id: "a-b",
    });
    expect(parseContentPath("content/osn/modules/a.txt")).toBeNull();
  });
});
