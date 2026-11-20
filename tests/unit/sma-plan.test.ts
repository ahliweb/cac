/**
 * Tests for the pure `sma-coding` views (`src/domain/sma-plan.ts`) and the
 * corpus loader that feeds them (`src/cli/sma-corpus-loader.ts`, issue #77).
 * The views are exercised on a small hand-built corpus (so the module,
 * foundation and bridge cases are independent of the repository data) and
 * the loader on the real corpus and on temp-directory copies of it.
 */

import { afterEach, beforeEach, describe, expect, test } from "bun:test";
import { cp, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { loadSmaCorpus } from "../../src/cli/sma-corpus-loader";
import {
  buildSmaTrackPlan,
  cpQuotesFor,
  exampleSmaWeekCodes,
  findSmaWeek,
  SMA_SEMESTER_CODES,
  type SmaCorpus,
  SmaRequestError,
  smaTrackIds,
  splitClauses,
} from "../../src/domain/sma-plan";

const REPO_ROOT = join(import.meta.dir, "..", "..");
const SMA_DIR = join(REPO_ROOT, "data", "sma-coding");

const PROVENANCE = { syllabusVersion: "1.1.0", syllabusDate: "2026-11-19" } as const;

function week(id: string, topic: string) {
  const [track, semester, m] = id.split("-") as [string, string, string];
  const kelas = semester.slice(0, -1);
  return {
    id,
    track,
    kelas,
    semester,
    semesterCode: `${track}-${semester}`,
    phase: "E",
    week: Number(m.slice(1)),
    topic,
    objective: `tujuan ${topic}`,
    output: `keluaran ${topic}`,
    exercise: `latihan ${topic}`,
  };
}

function fixture(): SmaCorpus {
  const fnd = week("FND-X1-M1", "Fondasi satu");
  return {
    tracks: {
      ...PROVENANCE,
      sourceSection: "bagian 3",
      tracks: [
        {
          id: "A",
          name: "Jalur Uji",
          tools: ["C++"],
          startClass: "X",
          cpStatus: "dalam-cp",
          approvalStatus: "disetujui",
          approvedOn: "2026-11-19",
        },
        {
          id: "D",
          name: "Jalur Pengayaan",
          tools: ["Python"],
          startClass: "X",
          cpStatus: "pengayaan",
          approvalStatus: "disetujui",
          approvedOn: "2026-11-19",
        },
        {
          id: "E",
          name: "Jalur Kelas XI",
          tools: ["Quirk"],
          startClass: "XI",
          cpStatus: "pengayaan",
          approvalStatus: "disetujui",
          approvedOn: "2026-11-19",
        },
      ],
    },
    weeks: {
      ...PROVENANCE,
      sourceSection: "bagian 3",
      weeks: [
        week("A-X1-M9", "Sembilan"),
        week("A-X1-M8", "Delapan"),
        week("A-X2-M1", "Semester dua"),
        week("D-X1-M8", "Pengayaan delapan"),
        week("E-XI1-M1", "Kuantum satu"),
      ].map((w) => ({ ...w, phase: "E" as const, kelas: w.kelas as "X" })) as never,
    },
    foundation: {
      ...PROVENANCE,
      sourceSection: "bagian 3.0",
      weeks: [
        {
          id: fnd.id,
          kelas: "X",
          semester: "X1",
          semesterCode: "FND-X1",
          phase: "E",
          week: 1,
          topic: fnd.topic,
          objective: fnd.objective,
          output: fnd.output,
          exercise: fnd.exercise,
        },
      ],
    },
    cpMapping: {
      ...PROVENANCE,
      sourceSection: "bagian 4",
      mappings: [
        {
          cpCode: "E-BK-a",
          topic: "t",
          weeksText: "A-X1-M9",
          weeks: ["A-X1-M9"],
          tracksText: "A (parsial)",
          tracks: ["A"],
          partialTracks: ["A"],
          sourceSection: "bagian 4.1",
        },
        {
          cpCode: "E-BK-b",
          topic: "t",
          weeksText: "A-X1-M9",
          weeks: ["A-X1-M9"],
          tracksText: "A",
          tracks: ["A"],
          partialTracks: [],
          sourceSection: "bagian 4.1",
        },
      ],
      enrichmentLinks: [
        {
          track: "D",
          cpCode: "E-BK-a",
          topic: "irisan",
          weeksText: "D-X1-M8",
          weeks: ["D-X1-M8"],
          level: "Rendah: tafsir penyusun.",
        },
      ],
    },
    cpElements: {
      ...PROVENANCE,
      sourceSection: "bagian 1",
      quotes: [
        {
          phase: "E",
          elementId: "BK",
          elementTitle: "Berpikir Komputasional",
          guideNumber: "2.1",
          text: "kutipan BK",
        },
      ],
      items: [
        { code: "E-BK-a", phase: "E", elementId: "BK", label: "label a" },
        { code: "E-BK-b", phase: "E", elementId: "BK", label: "label b" },
      ],
    },
    osnBridge: {
      ...PROVENANCE,
      sourceSection: "bagian 5",
      track: "A",
      bridges: [
        {
          familyId: "dasar-pemrograman",
          topics: "topik jembatan",
          weeksText: "A-X1-M9",
          weeks: ["A-X1-M9"],
          note: "catatan",
          hasEnrichment: false,
        },
      ],
      trackBridges: [
        {
          track: "D",
          bridges: [
            {
              familyId: "struktur-data",
              topics: "topik jembatan D",
              weeksText: "D-X1-M8",
              weeks: ["D-X1-M8"],
              note: "catatan D",
              hasEnrichment: false,
            },
          ],
        },
      ],
    },
    modules: {
      modules: [
        {
          id: "modul-uji",
          title: "Modul uji",
          cpItems: [],
          weekCodes: ["A-X1-M9", "FND-X1-M1"],
          bridgeFamilies: [],
          gradeLevels: ["X"],
          prerequisites: [],
          audience: "siswa",
          language: "id",
          status: "draf",
          references: [{ title: "r", url: "https://example.org/r" }],
          contentPath: "content/sma-coding/modules/modul-uji.md",
          learnerSheetPath: "content/sma-coding/lembar/modul-uji.md",
          learnerSheetStatus: "draf",
        },
      ],
    },
  };
}

describe("buildSmaTrackPlan", () => {
  test("orders weeks within a semester and puts the foundation block first in X1", () => {
    const plan = buildSmaTrackPlan(fixture(), "A");
    expect(plan.track.id).toBe("A");
    expect(plan.semesters.map((s) => s.semester)).toEqual(["X1", "X2"]);
    const x1 = plan.semesters[0];
    expect(x1?.foundation.map((w) => w.code)).toEqual(["FND-X1-M1"]);
    expect(x1?.foundation[0]?.block).toBe("fondasi");
    expect(x1?.foundation[0]?.track).toBeNull();
    expect(x1?.weeks.map((w) => w.code)).toEqual(["A-X1-M8", "A-X1-M9"]);
    expect(plan.semesters[1]?.foundation).toEqual([]);
  });

  test("joins CP items, the OSN bridge and modules to the week", () => {
    const plan = buildSmaTrackPlan(fixture(), "A", ["X1"]);
    const m9 = plan.semesters[0]?.weeks[1];
    expect(m9?.cpItems).toEqual([
      { code: "E-BK-a", label: "label a", partial: true },
      { code: "E-BK-b", label: "label b", partial: false },
    ]);
    expect(m9?.osnBridges[0]?.familyId).toBe("dasar-pemrograman");
    expect(m9?.modules).toEqual([{ id: "modul-uji", title: "Modul uji", status: "draf" }]);
    const m8 = plan.semesters[0]?.weeks[0];
    expect(m8?.cpItems).toEqual([]);
    expect(m8?.modules).toEqual([]);
  });

  test("a corpus without modules.json yields weeks without modules", () => {
    const { modules: _omitted, ...withoutModules } = fixture();
    const plan = buildSmaTrackPlan(withoutModules, "A", ["X1"]);
    expect(plan.semesters[0]?.weeks.every((w) => w.modules.length === 0)).toBe(true);
  });

  test("only the requested semesters are returned, in teaching order", () => {
    const plan = buildSmaTrackPlan(fixture(), "A", ["X2"]);
    expect(plan.semesters.map((s) => s.semester)).toEqual(["X2"]);
  });

  test("a semester with no weeks at all is omitted", () => {
    expect(buildSmaTrackPlan(fixture(), "A", ["XII2"]).semesters).toEqual([]);
  });

  test("an unknown track or semester throws SmaRequestError naming the valid values", () => {
    expect(() => buildSmaTrackPlan(fixture(), "Z")).toThrow(SmaRequestError);
    expect(() => buildSmaTrackPlan(fixture(), "Z")).toThrow("Valid tracks: A, D, E");
    expect(() => buildSmaTrackPlan(fixture(), "A", ["Q1"])).toThrow(SMA_SEMESTER_CODES.join(", "));
  });
});

describe("findSmaWeek, exampleSmaWeekCodes, cpQuotesFor, splitClauses", () => {
  test("findSmaWeek resolves a track week, a foundation week, and returns undefined otherwise", () => {
    const corpus = fixture();
    expect(findSmaWeek(corpus, "A-X1-M9")?.track).toEqual({
      id: "A",
      name: "Jalur Uji",
      cpStatus: "dalam-cp",
    });
    expect(findSmaWeek(corpus, "FND-X1-M1")?.block).toBe("fondasi");
    expect(findSmaWeek(corpus, "A-X1-M1")).toBeUndefined();
  });

  test("exampleSmaWeekCodes gives the first and last code of each track and of the foundation", () => {
    expect(exampleSmaWeekCodes(fixture())).toEqual([
      "jalur A: A-X1-M8 .. A-X2-M1",
      "jalur D: D-X1-M8 .. D-X1-M8",
      "jalur E: E-XI1-M1 .. E-XI1-M1",
      "blok fondasi FND: FND-X1-M1 .. FND-X1-M1",
    ]);
    expect(smaTrackIds(fixture())).toEqual(["A", "D", "E"]);
  });

  test("cpQuotesFor returns each element's quotation once, in order", () => {
    const corpus = fixture();
    const week9 = findSmaWeek(corpus, "A-X1-M9");
    const quotes = cpQuotesFor(corpus, week9?.cpItems ?? []);
    expect(quotes).toEqual([
      {
        phase: "E",
        elementId: "BK",
        elementTitle: "Berpikir Komputasional",
        text: "kutipan BK",
      },
    ]);
    expect(cpQuotesFor(corpus, [{ code: "F-AP-a", label: "x", partial: false }])).toEqual([]);
  });

  test("splitClauses splits on semicolons outside parentheses only", () => {
    expect(splitClauses("a (x; y); b ;; c")).toEqual(["a (x; y)", "b", "c"]);
    expect(splitClauses("tanpa pemisah")).toEqual(["tanpa pemisah"]);
    expect(splitClauses("a) ; b")).toEqual(["a)", "b"]);
  });
});

describe("loadSmaCorpus", () => {
  let dir: string;
  beforeEach(async () => {
    dir = await mkdtemp(join(tmpdir(), "sma-plan-loader-"));
    await cp(SMA_DIR, dir, { recursive: true });
  });
  afterEach(async () => {
    await rm(dir, { recursive: true, force: true });
  });

  test("loads and audits the real corpus", async () => {
    const loaded = await loadSmaCorpus(SMA_DIR);
    expect(loaded.ok).toBe(true);
    if (loaded.ok) {
      expect(loaded.corpus.weeks.weeks.length).toBe(364);
      expect(loaded.corpus.foundation.weeks.length).toBe(7);
    }
  });

  test("refuses a corpus that fails validation, pointing at osn validate", async () => {
    const path = join(dir, "osn-bridge.json");
    const file = JSON.parse(await readFile(path, "utf-8"));
    file.bridges[0].familyId = "tidak-ada";
    await writeFile(path, JSON.stringify(file));
    const loaded = await loadSmaCorpus(dir);
    expect(loaded.ok).toBe(false);
    if (!loaded.ok) {
      expect(loaded.message).toContain("gagal validasi");
      expect(loaded.message).toContain("osn validate --program sma-coding");
    }
  });

  test("an unreadable directory comes back as a message, not an exception", async () => {
    const loaded = await loadSmaCorpus(join(dir, "tidak-ada"));
    expect(loaded.ok).toBe(false);
  });

  test("a valid modules.json is carried into the corpus", async () => {
    const modules = {
      modules: [
        {
          id: "modul-uji",
          title: "Modul uji",
          cpItems: [],
          weekCodes: ["A-X1-M9"],
          bridgeFamilies: [],
          gradeLevels: ["X"],
          prerequisites: [],
          audience: "siswa",
          language: "id",
          status: "draf",
          references: [{ title: "r", url: "https://example.org/r" }],
          contentPath: "content/sma-coding/modules/modul-uji.md",
          learnerSheetPath: "content/sma-coding/lembar/modul-uji.md",
          learnerSheetStatus: "draf",
        },
      ],
    };
    await writeFile(join(dir, "modules.json"), JSON.stringify(modules));
    const loaded = await loadSmaCorpus(dir);
    expect(loaded.ok).toBe(true);
    if (loaded.ok) {
      expect(findSmaWeek(loaded.corpus, "A-X1-M9")?.modules.map((m) => m.id)).toEqual([
        "modul-uji",
      ]);
    }
  });

  test("an invalid modules.json fails the load", async () => {
    await writeFile(join(dir, "modules.json"), JSON.stringify({ modules: [{ id: "x" }] }));
    const loaded = await loadSmaCorpus(dir);
    expect(loaded.ok).toBe(false);
  });
});

describe("pengayaan and late-start tracks (silabus v1.2)", () => {
  test("a week of a pengayaan track carries enrichment links, not CP items", () => {
    const plan = buildSmaTrackPlan(fixture(), "D", ["X1"]);
    expect(plan.track.cpStatus).toBe("pengayaan");
    const d8 = plan.semesters[0]?.weeks[0];
    expect(d8?.code).toBe("D-X1-M8");
    expect(d8?.track?.cpStatus).toBe("pengayaan");
    expect(d8?.cpItems).toEqual([]);
    expect(d8?.enrichmentLinks).toEqual([
      { code: "E-BK-a", label: "label a", level: "Rendah: tafsir penyusun." },
    ]);
  });

  test("weeks of a counted track have no enrichment links", () => {
    expect(findSmaWeek(fixture(), "A-X1-M9")?.enrichmentLinks).toEqual([]);
  });

  test("the OSN bridges of another track reach its own weeks only", () => {
    const corpus = fixture();
    expect(findSmaWeek(corpus, "D-X1-M8")?.osnBridges.map((b) => b.topics)).toEqual([
      "topik jembatan D",
    ]);
    expect(findSmaWeek(corpus, "A-X1-M9")?.osnBridges.map((b) => b.topics)).toEqual([
      "topik jembatan",
    ]);
  });

  test("a track that starts in kelas XI lists no kelas X semester and takes no foundation block", () => {
    const plan = buildSmaTrackPlan(fixture(), "E");
    expect(plan.track.startClass).toBe("XI");
    expect(plan.semesters.map((s) => s.semester)).toEqual(["XI1"]);
    expect(plan.semesters[0]?.foundation).toEqual([]);
  });

  test("asking a kelas XI track for a kelas X semester is a request error", () => {
    expect(() => buildSmaTrackPlan(fixture(), "E", ["X1"])).toThrow(SmaRequestError);
    expect(() => buildSmaTrackPlan(fixture(), "E", ["X1"])).toThrow(
      "jalur E tidak memiliki semester X1: jalur ini dimulai di kelas XI",
    );
  });

  test("(parsial) is per track: a week is partial only when its own track is", () => {
    const corpus = fixture();
    const mapping = corpus.cpMapping.mappings[1];
    if (mapping === undefined) {
      throw new Error("fixture changed");
    }
    const shared = {
      ...mapping,
      cpCode: "E-BK-b",
      weeksText: "A-X1-M8; D-X1-M8; FND-X1-M1",
      weeks: ["A-X1-M8", "D-X1-M8", "FND-X1-M1"],
      tracksText: "A, D (parsial)",
      tracks: ["A", "D"],
      partialTracks: ["D"],
    };
    const patched: SmaCorpus = {
      ...corpus,
      cpMapping: { ...corpus.cpMapping, mappings: [shared] },
    };
    const partialOf = (code: string) => findSmaWeek(patched, code)?.cpItems[0]?.partial;
    expect(partialOf("A-X1-M8")).toBe(false);
    expect(partialOf("D-X1-M8")).toBe(true);
    // a foundation week is partial only when every listed track is partial
    expect(partialOf("FND-X1-M1")).toBe(false);
    const allPartial: SmaCorpus = {
      ...patched,
      cpMapping: {
        ...patched.cpMapping,
        mappings: [{ ...shared, partialTracks: ["A", "D"] }],
      },
    };
    expect(findSmaWeek(allPartial, "FND-X1-M1")?.cpItems[0]?.partial).toBe(true);
  });
});
