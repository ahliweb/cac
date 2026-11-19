/**
 * Tests for the per-programme learning-module index schemas (ADR-0007,
 * ADR-0008): `tk-module.ts`, `sd-module.ts`, `smp-module.ts`,
 * `kul-module.ts` and `dw-learning-module.ts`, plus their shared helpers in
 * `program-module-common.ts`. Shape and local rules only; the referential
 * rules against the corpus are covered by
 * `tests/unit/program-modules-domain.test.ts`.
 */

import { describe, expect, test } from "bun:test";
import type { z } from "zod";
import {
  dwLearningModuleSchema,
  dwLearningModulesFileSchema,
} from "../../src/schema/dw-learning-module";
import { kulModuleSchema, kulModulesFileSchema } from "../../src/schema/kul-module";
import {
  moduleContentDir,
  moduleLembarDir,
  unitCodeToModuleId,
} from "../../src/schema/program-module-common";
import { sdModuleSchema, sdModulesFileSchema } from "../../src/schema/sd-module";
import { smpModuleSchema, smpModulesFileSchema } from "../../src/schema/smp-module";
import { tkModuleSchema, tkModulesFileSchema } from "../../src/schema/tk-module";

const REFERENCE = {
  title: "Panduan Pembelajaran Koding dan Kecerdasan Artifisial, 2025",
  url: "https://repositori.kemendikdasmen.go.id/contoh.pdf",
};

function lifecycle(program: string, id: string): Record<string, unknown> {
  return {
    title: `Modul ${id}`,
    language: "id",
    status: "draf",
    references: [REFERENCE],
    contentPath: `content/${program}/modules/${id}.md`,
  };
}

function tkEntry(overrides: Record<string, unknown> = {}): Record<string, unknown> {
  return {
    id: "tk-a1-m1",
    ...lifecycle("tk-coding", "tk-a1-m1"),
    weekCodes: ["TK-A1-M1"],
    cpOverlap: ["FF-DL-b"],
    groups: ["A"],
    prerequisites: [],
    audience: "guru",
    learnerSheetPath: "content/tk-coding/lembar/tk-a1-m1.md",
    ...overrides,
  };
}

function sdEntry(overrides: Record<string, unknown> = {}): Record<string, unknown> {
  return {
    id: "sd5-1-m3",
    ...lifecycle("sd-coding", "sd5-1-m3"),
    weekCodes: ["SD5-1-M3"],
    cpItems: ["C-BK-a"],
    gradeLevels: [5],
    prerequisites: [],
    audience: "guru",
    learnerSheetPath: "content/sd-coding/lembar/sd5-1-m3.md",
    ...overrides,
  };
}

function smpEntry(overrides: Record<string, unknown> = {}): Record<string, unknown> {
  return {
    id: "smp7-1-m1",
    ...lifecycle("smp-coding", "smp7-1-m1"),
    weekCodes: ["SMP7-1-M1"],
    cpCodes: ["D-BK-a"],
    gradeLevels: ["7"],
    prerequisites: [],
    audience: "siswa",
    ...overrides,
  };
}

function kulEntry(overrides: Record<string, unknown> = {}): Record<string, unknown> {
  return {
    id: "kul-u-101",
    ...lifecycle("kuliah-coding", "kul-u-101"),
    courseCodes: ["KUL-U-101"],
    knowledgeAreas: ["SDF"],
    semester: "S1",
    prerequisites: [],
    audience: "mahasiswa",
    ...overrides,
  };
}

function dwEntry(overrides: Record<string, unknown> = {}): Record<string, unknown> {
  return {
    id: "dw-pro-m1",
    ...lifecycle("dewasa-coding", "dw-pro-m1"),
    moduleCodes: ["DW-PRO-M1"],
    skkniUnits: ["J.620100.011.01"],
    track: "PRO",
    prerequisites: ["DW-FND-M1"],
    audience: "peserta",
    ...overrides,
  };
}

interface Case {
  readonly name: string;
  readonly program: string;
  readonly entry: (overrides?: Record<string, unknown>) => Record<string, unknown>;
  readonly schema: z.ZodTypeAny;
  readonly fileSchema: z.ZodTypeAny;
  readonly audience: string;
  /** The field holding the one unit code, and a valid second code of the same kind. */
  readonly unitField: string;
  readonly otherUnit: string;
  readonly otherId: string;
  readonly hasLearnerSheet: boolean;
  /** A prerequisite value that is neither a slug nor a unit code of the programme. */
  readonly badPrerequisite: string;
  readonly goodPrerequisite: string;
}

const CASES: readonly Case[] = [
  {
    name: "tkModuleSchema",
    program: "tk-coding",
    entry: tkEntry,
    schema: tkModuleSchema,
    fileSchema: tkModulesFileSchema,
    audience: "guru",
    unitField: "weekCodes",
    otherUnit: "TK-A1-M2",
    otherId: "tk-a1-m2",
    hasLearnerSheet: true,
    badPrerequisite: "SD5-1-M3",
    goodPrerequisite: "TK-A1-M2",
  },
  {
    name: "sdModuleSchema",
    program: "sd-coding",
    entry: sdEntry,
    schema: sdModuleSchema,
    fileSchema: sdModulesFileSchema,
    audience: "guru",
    unitField: "weekCodes",
    otherUnit: "SD5-1-M4",
    otherId: "sd5-1-m4",
    hasLearnerSheet: true,
    badPrerequisite: "TK-A1-M1",
    goodPrerequisite: "SD5-1-M2",
  },
  {
    name: "smpModuleSchema",
    program: "smp-coding",
    entry: smpEntry,
    schema: smpModuleSchema,
    fileSchema: smpModulesFileSchema,
    audience: "siswa",
    unitField: "weekCodes",
    otherUnit: "SMP7-1-M2",
    otherId: "smp7-1-m2",
    hasLearnerSheet: false,
    badPrerequisite: "SD5-1-M3",
    goodPrerequisite: "SMP7-1-M2",
  },
  {
    name: "kulModuleSchema",
    program: "kuliah-coding",
    entry: kulEntry,
    schema: kulModuleSchema,
    fileSchema: kulModulesFileSchema,
    audience: "mahasiswa",
    unitField: "courseCodes",
    otherUnit: "KUL-U-102",
    otherId: "kul-u-102",
    hasLearnerSheet: false,
    badPrerequisite: "KUL-U-1",
    goodPrerequisite: "KUL-U-102",
  },
  {
    name: "dwLearningModuleSchema",
    program: "dewasa-coding",
    entry: dwEntry,
    schema: dwLearningModuleSchema,
    fileSchema: dwLearningModulesFileSchema,
    audience: "peserta",
    unitField: "moduleCodes",
    otherUnit: "DW-PRO-M2",
    otherId: "dw-pro-m2",
    hasLearnerSheet: false,
    badPrerequisite: "DW-XYZ-M1",
    goodPrerequisite: "DW-PRO-M2",
  },
];

const messages = (schema: z.ZodTypeAny, value: unknown): string[] => {
  const result = schema.safeParse(value);
  return result.success ? [] : result.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`);
};

describe("program-module-common helpers", () => {
  test("unitCodeToModuleId lower-cases and turns dots into hyphens", () => {
    expect(unitCodeToModuleId("TK-A1-M1")).toBe("tk-a1-m1");
    expect(unitCodeToModuleId("DW-FND-M1")).toBe("dw-fnd-m1");
    expect(unitCodeToModuleId("J.620100.011.01")).toBe("j-620100-011-01");
  });

  test("content and sheet directories are per programme", () => {
    expect(moduleContentDir("sd-coding")).toBe("content/sd-coding/modules/");
    expect(moduleLembarDir("tk-coding")).toBe("content/tk-coding/lembar/");
  });
});

for (const c of CASES) {
  describe(c.name, () => {
    test("accepts a full entry", () => {
      expect(messages(c.schema, c.entry())).toEqual([]);
    });

    test(`requires audience "${c.audience}", language "id" and rejects unknown fields`, () => {
      expect(messages(c.schema, c.entry({ audience: "orang-lain" }))).not.toEqual([]);
      expect(messages(c.schema, c.entry({ language: "en" }))).not.toEqual([]);
      expect(messages(c.schema, c.entry({ topicFamilies: ["graph-tree"] }))).not.toEqual([]);
    });

    test("the id must be the lower-case unit code (one module, one unit)", () => {
      const wrongId = c.entry({
        id: c.otherId,
        contentPath: `content/${c.program}/modules/${c.otherId}.md`,
        ...(c.hasLearnerSheet
          ? { learnerSheetPath: `content/${c.program}/lembar/${c.otherId}.md` }
          : {}),
      });
      expect(messages(c.schema, wrongId).join("\n")).toContain("id: must be");
    });

    test("exactly one unit code is allowed", () => {
      const original = (c.entry() as Record<string, unknown[]>)[c.unitField] as string[];
      expect(messages(c.schema, c.entry({ [c.unitField]: [] }))).not.toEqual([]);
      expect(
        messages(c.schema, c.entry({ [c.unitField]: [...original, c.otherUnit] })).join("\n"),
      ).toContain(c.unitField);
    });

    test("contentPath must be content/<program>/modules/<id>.md", () => {
      for (const contentPath of [
        "content/osn/modules/x.md",
        `content/${c.program}/modules/lain.md`,
        `content/${c.program}/${c.entry().id}.md`,
      ]) {
        expect(messages(c.schema, c.entry({ contentPath })).join("\n")).toContain("contentPath");
      }
    });

    test("review is required exactly when the status is disetujui (ADR-0007)", () => {
      const review = { approvedOn: "2026-11-19", reviewerRole: "pemilik" };
      expect(messages(c.schema, c.entry({ status: "disetujui" })).join("\n")).toContain("review");
      expect(messages(c.schema, c.entry({ status: "disetujui", review }))).toEqual([]);
      expect(messages(c.schema, c.entry({ status: "draf", review })).join("\n")).toContain(
        "review",
      );
      expect(messages(c.schema, c.entry({ status: "ditinjau" }))).toEqual([]);
      expect(messages(c.schema, c.entry({ status: "ditarik" }))).toEqual([]);
      expect(messages(c.schema, c.entry({ status: "selesai" }))).not.toEqual([]);
    });

    test("review.approvedOn must be a real date", () => {
      const review = { approvedOn: "2026-02-30", reviewerRole: "pemilik" };
      expect(messages(c.schema, c.entry({ status: "disetujui", review })).join("\n")).toContain(
        "approvedOn",
      );
    });

    test("requires at least one https reference (explicit title and url, no refId)", () => {
      expect(messages(c.schema, c.entry({ references: [] }))).not.toEqual([]);
      expect(messages(c.schema, c.entry({ references: [{ refId: "R1" }] }))).not.toEqual([]);
      expect(
        messages(c.schema, c.entry({ references: [{ title: "T", url: "http://x.example" }] })),
      ).not.toEqual([]);
    });

    test("a prerequisite is a module id or a unit code of this programme, nothing else", () => {
      expect(messages(c.schema, c.entry({ prerequisites: ["modul-lain"] }))).toEqual([]);
      expect(messages(c.schema, c.entry({ prerequisites: [c.goodPrerequisite] }))).toEqual([]);
      expect(
        messages(c.schema, c.entry({ prerequisites: [c.badPrerequisite] })).join("\n"),
      ).toContain("prerequisites.0");
      expect(messages(c.schema, c.entry({ prerequisites: ["Modul Lain"] }))).not.toEqual([]);
    });

    test("duplicate prerequisites are rejected", () => {
      expect(
        messages(c.schema, c.entry({ prerequisites: ["modul-lain", "modul-lain"] })).join("\n"),
      ).toContain("prerequisites must be unique");
    });

    test("the file schema rejects duplicate ids and extra top-level keys", () => {
      expect(messages(c.fileSchema, { modules: [c.entry()] })).toEqual([]);
      expect(messages(c.fileSchema, { modules: [] })).toEqual([]);
      expect(messages(c.fileSchema, { modules: [c.entry(), c.entry()] }).join("\n")).toContain(
        "module ids must be unique",
      );
      expect(messages(c.fileSchema, { modules: [], extra: 1 })).not.toEqual([]);
    });

    if (c.hasLearnerSheet) {
      test("learnerSheetPath is required and must be content/<program>/lembar/<id>.md", () => {
        const id = c.entry().id as string;
        const { learnerSheetPath: _omitted, ...without } = c.entry();
        expect(messages(c.schema, without)).not.toEqual([]);
        for (const learnerSheetPath of [
          `content/${c.program}/modules/${id}.md`,
          `content/${c.program}/lembar/lain.md`,
          `content/osn/lembar/${id}.md`,
        ]) {
          expect(messages(c.schema, c.entry({ learnerSheetPath })).join("\n")).toContain(
            "learnerSheetPath",
          );
        }
      });
    } else {
      test("has no learner sheet field", () => {
        expect(
          messages(c.schema, c.entry({ learnerSheetPath: "content/x/lembar/y.md" })),
        ).not.toEqual([]);
      });
    }
  });
}

describe("tkModuleSchema specifics", () => {
  test("cpOverlap may be empty but must hold FF- codes, once each", () => {
    expect(messages(tkModuleSchema, tkEntry({ cpOverlap: [] }))).toEqual([]);
    expect(messages(tkModuleSchema, tkEntry({ cpOverlap: ["C-BK-a"] }))).not.toEqual([]);
    expect(
      messages(tkModuleSchema, tkEntry({ cpOverlap: ["FF-DL-a", "FF-DL-a"] })).join("\n"),
    ).toContain("cpOverlap must be unique");
  });

  test("does not accept a `cpItems` field: overlap is never fulfilment (meetsCp: false)", () => {
    expect(messages(tkModuleSchema, tkEntry({ cpItems: ["FF-DL-b"] }))).not.toEqual([]);
  });

  test("groups must be exactly the age group of the week", () => {
    expect(messages(tkModuleSchema, tkEntry({ groups: ["B"] })).join("\n")).toContain(
      'must be exactly ["A"]',
    );
    expect(messages(tkModuleSchema, tkEntry({ groups: ["A", "B"] })).join("\n")).toContain(
      "groups",
    );
    expect(messages(tkModuleSchema, tkEntry({ groups: [] }))).not.toEqual([]);
  });

  test("a week code outside TK-<A|B><1|2>-M1..M12 is rejected", () => {
    expect(messages(tkModuleSchema, tkEntry({ weekCodes: ["TK-A3-M1"] }))).not.toEqual([]);
    expect(messages(tkModuleSchema, tkEntry({ weekCodes: ["TK-A1-M13"] }))).not.toEqual([]);
  });
});

describe("sdModuleSchema specifics", () => {
  test("cpItems may be empty (kelas 1-4 introduction) and must hold C- codes", () => {
    expect(
      messages(
        sdModuleSchema,
        sdEntry({
          id: "sd1-1-m1",
          cpItems: [],
          gradeLevels: [1],
          weekCodes: ["SD1-1-M1"],
          contentPath: "content/sd-coding/modules/sd1-1-m1.md",
          learnerSheetPath: "content/sd-coding/lembar/sd1-1-m1.md",
        }),
      ),
    ).toEqual([]);
    expect(messages(sdModuleSchema, sdEntry({ cpItems: ["P-BK"] }))).not.toEqual([]);
  });

  test("gradeLevels must be exactly the class of the week", () => {
    expect(messages(sdModuleSchema, sdEntry({ gradeLevels: [6] })).join("\n")).toContain(
      "must be exactly [5]",
    );
    expect(messages(sdModuleSchema, sdEntry({ gradeLevels: [7] }))).not.toEqual([]);
  });
});

describe("smpModuleSchema specifics", () => {
  test("cpCodes may be empty (enrichment) and holds D- or DK- codes", () => {
    expect(messages(smpModuleSchema, smpEntry({ cpCodes: [] }))).toEqual([]);
    expect(messages(smpModuleSchema, smpEntry({ cpCodes: ["D-BK-a", "DK-EA-g"] }))).toEqual([]);
    expect(messages(smpModuleSchema, smpEntry({ cpCodes: ["C-BK-a"] }))).not.toEqual([]);
  });

  test("gradeLevels must be exactly the class of the week", () => {
    expect(messages(smpModuleSchema, smpEntry({ gradeLevels: ["8"] })).join("\n")).toContain(
      'must be exactly ["7"]',
    );
  });
});

describe("kulModuleSchema specifics", () => {
  test("knowledgeAreas holds CS2023 codes, once each; may be empty", () => {
    expect(messages(kulModuleSchema, kulEntry({ knowledgeAreas: [] }))).toEqual([]);
    expect(messages(kulModuleSchema, kulEntry({ knowledgeAreas: ["XYZ"] }))).not.toEqual([]);
    expect(
      messages(kulModuleSchema, kulEntry({ knowledgeAreas: ["SDF", "SDF"] })).join("\n"),
    ).toContain("knowledgeAreas must be unique");
  });

  test("semester is S1..S8", () => {
    expect(messages(kulModuleSchema, kulEntry({ semester: "S9" }))).not.toEqual([]);
    expect(messages(kulModuleSchema, kulEntry({ semester: "S8" }))).toEqual([]);
  });
});

describe("dwLearningModuleSchema specifics", () => {
  test("the shared module DW-FND-M1 is a module like any other", () => {
    expect(
      messages(
        dwLearningModuleSchema,
        dwEntry({
          id: "dw-fnd-m1",
          moduleCodes: ["DW-FND-M1"],
          skkniUnits: [],
          track: "FND",
          prerequisites: [],
          contentPath: "content/dewasa-coding/modules/dw-fnd-m1.md",
        }),
      ),
    ).toEqual([]);
  });

  test("track must be the track of the module code", () => {
    expect(messages(dwLearningModuleSchema, dwEntry({ track: "PKJ" })).join("\n")).toContain(
      'must be "PRO"',
    );
    expect(messages(dwLearningModuleSchema, dwEntry({ track: "XYZ" }))).not.toEqual([]);
  });

  test("skkniUnits holds SKKNI unit codes (not titles), once each; may be empty", () => {
    expect(messages(dwLearningModuleSchema, dwEntry({ skkniUnits: [] }))).toEqual([]);
    expect(
      messages(dwLearningModuleSchema, dwEntry({ skkniUnits: ["Menganalisis Tools"] })),
    ).not.toEqual([]);
    expect(
      messages(
        dwLearningModuleSchema,
        dwEntry({ skkniUnits: ["J.620100.011.01", "J.620100.011.01"] }),
      ).join("\n"),
    ).toContain("skkniUnits must be unique");
  });
});
