/**
 * Tests for the own-status learner-sheet fields (ADR-0011) of the five
 * programmes whose modules learners read directly (`osn`, `smp-coding`,
 * `sma-coding`, `kuliah-coding`, `dewasa-coding`): `learnerSheetPath`,
 * `learnerSheetStatus` and `learnerSheetReview`, and the proof that the
 * `tk-coding` and `sd-coding` schemas (whose sheet follows the module status)
 * do not accept the status and review fields.
 */

import { describe, expect, test } from "bun:test";
import type { z } from "zod";
import {
  DW_LEARNER_SHEET_REQUIRED,
  dwLearningModuleSchema,
} from "../../src/schema/dw-learning-module";
import { KUL_LEARNER_SHEET_REQUIRED, kulModuleSchema } from "../../src/schema/kul-module";
import {
  addLearnerSheetIssues,
  type LearnerSheetFields,
  moduleLembarDir,
} from "../../src/schema/learner-sheet-rules";
import { moduleSchema, OSN_LEARNER_SHEET_REQUIRED } from "../../src/schema/module";
import { sdModuleSchema } from "../../src/schema/sd-module";
import { SMA_LEARNER_SHEET_REQUIRED, smaModuleSchema } from "../../src/schema/sma-module";
import { SMP_LEARNER_SHEET_REQUIRED, smpModuleSchema } from "../../src/schema/smp-module";
import { tkModuleSchema } from "../../src/schema/tk-module";
import { dw, kul, sd, smp, tk } from "../helpers/program-module-entries";

const REVIEW = { approvedOn: "2026-11-21", reviewerRole: "pemilik" };

function osn(overrides: Record<string, unknown> = {}): Record<string, unknown> {
  return {
    id: "contoh",
    title: "Contoh",
    topicFamilies: ["dasar-pemrograman"],
    audience: "siswa",
    language: "id",
    status: "draf",
    references: [{ refId: "R1" }],
    contentPath: "content/osn/modules/contoh.md",
    ...overrides,
  };
}

function sma(overrides: Record<string, unknown> = {}): Record<string, unknown> {
  return {
    id: "a-x1-m1",
    title: "Contoh",
    cpItems: [],
    weekCodes: [],
    bridgeFamilies: [],
    gradeLevels: ["X"],
    prerequisites: [],
    audience: "siswa",
    language: "id",
    status: "draf",
    references: [{ title: "Rujukan", url: "https://contoh.example/r" }],
    contentPath: "content/sma-coding/modules/a-x1-m1.md",
    ...overrides,
  };
}

interface Case {
  readonly program: string;
  readonly schema: z.ZodTypeAny;
  readonly entry: (overrides?: Record<string, unknown>) => Record<string, unknown>;
  readonly required: boolean;
}

const CASES: readonly Case[] = [
  { program: "osn", schema: moduleSchema, entry: osn, required: OSN_LEARNER_SHEET_REQUIRED },
  {
    program: "smp-coding",
    schema: smpModuleSchema,
    entry: (o) => smp("SMP7-1-M1", o),
    required: SMP_LEARNER_SHEET_REQUIRED,
  },
  {
    program: "sma-coding",
    schema: smaModuleSchema,
    entry: sma,
    required: SMA_LEARNER_SHEET_REQUIRED,
  },
  {
    program: "kuliah-coding",
    schema: kulModuleSchema,
    entry: (o) => kul("KUL-U-101", o),
    required: KUL_LEARNER_SHEET_REQUIRED,
  },
  {
    program: "dewasa-coding",
    schema: dwLearningModuleSchema,
    entry: (o) => dw("DW-PRO-M1", o),
    required: DW_LEARNER_SHEET_REQUIRED,
  },
];

const messages = (schema: z.ZodTypeAny, value: unknown): string[] => {
  const result = schema.safeParse(value);
  return result.success ? [] : result.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`);
};

for (const c of CASES) {
  describe(`${c.program}: own-status learner sheet`, () => {
    const id = c.entry().id as string;
    const path = `content/${c.program}/lembar/${id}.md`;

    test("the sheet is still optional for this programme (flag off)", () => {
      expect(c.required).toBe(false);
      expect(messages(c.schema, c.entry())).toEqual([]);
    });

    test("a draft sheet of an approved module is accepted", () => {
      expect(
        messages(
          c.schema,
          c.entry({
            status: "disetujui",
            review: REVIEW,
            learnerSheetPath: path,
            learnerSheetStatus: "draf",
          }),
        ),
      ).toEqual([]);
    });

    test("learnerSheetPath must be content/<program>/lembar/<id>.md", () => {
      for (const learnerSheetPath of [
        `content/${c.program}/modules/${id}.md`,
        `content/${c.program}/lembar/lain.md`,
        `content/lain-program/lembar/${id}.md`,
        `${path}.bak`,
      ]) {
        expect(
          messages(c.schema, c.entry({ learnerSheetPath, learnerSheetStatus: "draf" })).join("\n"),
        ).toContain("learnerSheetPath");
      }
    });

    test("learnerSheetStatus is required exactly when learnerSheetPath is present", () => {
      expect(messages(c.schema, c.entry({ learnerSheetPath: path })).join("\n")).toContain(
        "learnerSheetStatus",
      );
      expect(messages(c.schema, c.entry({ learnerSheetStatus: "draf" })).join("\n")).toContain(
        "learnerSheetStatus",
      );
      expect(
        messages(c.schema, c.entry({ learnerSheetPath: path, learnerSheetStatus: "selesai" })),
      ).not.toEqual([]);
      for (const learnerSheetStatus of ["draf", "ditinjau", "ditarik"]) {
        expect(messages(c.schema, c.entry({ learnerSheetPath: path, learnerSheetStatus }))).toEqual(
          [],
        );
      }
    });

    test("learnerSheetReview is required exactly when the sheet is disetujui (ADR-0007)", () => {
      const base = { learnerSheetPath: path };
      expect(
        messages(c.schema, c.entry({ ...base, learnerSheetStatus: "disetujui" })).join("\n"),
      ).toContain("learnerSheetReview");
      expect(
        messages(
          c.schema,
          c.entry({ ...base, learnerSheetStatus: "disetujui", learnerSheetReview: REVIEW }),
        ),
      ).toEqual([]);
      expect(
        messages(
          c.schema,
          c.entry({ ...base, learnerSheetStatus: "draf", learnerSheetReview: REVIEW }),
        ).join("\n"),
      ).toContain("learnerSheetReview");
      expect(
        messages(
          c.schema,
          c.entry({
            ...base,
            learnerSheetStatus: "disetujui",
            learnerSheetReview: { approvedOn: "2026-02-30", reviewerRole: "pemilik" },
          }),
        ).join("\n"),
      ).toContain("approvedOn");
    });

    test("the module review and the sheet review are independent", () => {
      // an approved sheet of a draft module still needs the sheet review, and the module needs none
      expect(
        messages(
          c.schema,
          c.entry({
            status: "draf",
            learnerSheetPath: path,
            learnerSheetStatus: "disetujui",
            learnerSheetReview: REVIEW,
          }),
        ),
      ).toEqual([]);
    });
  });
}

describe("tk-coding and sd-coding keep their schemas (the sheet follows the module status)", () => {
  test.each([
    ["tk-coding", tkModuleSchema, tk("TK-A1-M1")],
    ["sd-coding", sdModuleSchema, sd("SD5-1-M3", { cpItems: ["C-BK-a"] })],
  ] as const)("%s rejects learnerSheetStatus and learnerSheetReview", (_program, schema, entry) => {
    expect(messages(schema, entry)).toEqual([]);
    expect(messages(schema, { ...entry, learnerSheetStatus: "draf" })).not.toEqual([]);
    expect(messages(schema, { ...entry, learnerSheetReview: REVIEW })).not.toEqual([]);
  });

  test("their learnerSheetPath stays required", () => {
    const { learnerSheetPath: _omitted, ...without } = tk("TK-A1-M1");
    expect(messages(tkModuleSchema, without)).not.toEqual([]);
  });
});

describe("addLearnerSheetIssues with required: true (the later per-programme switch)", () => {
  function issuesOf(fields: LearnerSheetFields, required: boolean): string[] {
    const paths: string[] = [];
    const ctx = {
      addIssue: (issue: { path?: (string | number)[] }) => paths.push(String(issue.path?.[0])),
    } as unknown as z.RefinementCtx;
    addLearnerSheetIssues(fields, ctx, { programId: "smp-coding", required });
    return paths;
  }

  test("a missing sheet is an issue only when required", () => {
    expect(issuesOf({ id: "x" }, false)).toEqual([]);
    expect(issuesOf({ id: "x" }, true)).toEqual(["learnerSheetPath"]);
  });

  test("a complete sheet is clean either way", () => {
    const fields = {
      id: "x",
      learnerSheetPath: `${moduleLembarDir("smp-coding")}x.md`,
      learnerSheetStatus: "draf",
    };
    expect(issuesOf(fields, true)).toEqual([]);
    expect(issuesOf(fields, false)).toEqual([]);
  });
});
