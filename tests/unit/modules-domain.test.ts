/**
 * Tests for `src/domain/modules.ts` and `src/cli/module-content.ts` (issue
 * #54): referential validation of the module index, the content-file check
 * and the module loader used by `osn render modul`.
 */

import { afterEach, beforeEach, describe, expect, test } from "bun:test";
import { cp, mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { loadCorpusFromDirectory } from "../../src/cli/corpus-loader";
import { loadModule, moduleContentFindings } from "../../src/cli/module-content";
import { auditCorpus, type CorpusEntry, type CorpusSource } from "../../src/domain/corpus-audit";
import { moduleFindings } from "../../src/domain/modules";

const REPO_ROOT = join(import.meta.dir, "..", "..");
const REAL_DATA_DIR = join(REPO_ROOT, "data", "osn");

function entry(overrides: Record<string, unknown> = {}): Record<string, unknown> {
  return {
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
}

async function sourceWith(modules: CorpusEntry | undefined): Promise<CorpusSource> {
  const map = new Map(await loadCorpusFromDirectory(REAL_DATA_DIR));
  map.delete("modules.json");
  if (modules !== undefined) {
    map.set("modules.json", modules);
  }
  return map;
}

const paths = (findings: ReturnType<typeof moduleFindings>) => findings.map((f) => f.path);

describe("moduleFindings", () => {
  test("a programme without modules.json has no findings", async () => {
    expect(moduleFindings(await sourceWith(undefined), "osn")).toEqual([]);
  });

  test("the committed corpus's modules.json is clean", async () => {
    const source = await loadCorpusFromDirectory(REAL_DATA_DIR);
    expect(source.has("modules.json")).toBe(true);
    expect(moduleFindings(source, "osn")).toEqual([]);
    expect(auditCorpus(source).ok).toBe(true);
  });

  test("a valid module is clean", async () => {
    const source = await sourceWith({ ok: true, data: { modules: [entry()] } });
    expect(moduleFindings(source, "osn")).toEqual([]);
  });

  test("invalid JSON and schema errors are reported against modules.json", async () => {
    const bad = moduleFindings(await sourceWith({ ok: false, error: "Unexpected token" }), "osn");
    expect(bad).toHaveLength(1);
    expect(bad[0]?.file).toBe("modules.json");
    expect(bad[0]?.message).toContain("invalid JSON");

    const schema = moduleFindings(
      await sourceWith({ ok: true, data: { modules: [entry({ status: "disetujui" })] } }),
      "osn",
    );
    expect(paths(schema)).toEqual(["modules.0.review"]);

    const root = moduleFindings(await sourceWith({ ok: true, data: [] }), "osn");
    expect(paths(root)).toEqual(["(root)"]);
  });

  test("reports an unknown topic family, week, refId and a foreign contentPath", async () => {
    const source = await sourceWith({
      ok: true,
      data: {
        modules: [
          entry({
            topicFamilies: ["tidak-ada"],
            weeks: [1, 5],
            references: [{ refId: "R999" }, { title: "S", url: "https://contoh.example" }],
            contentPath: "content/lain/modules/contoh.md",
          }),
        ],
      },
    });
    const findings = moduleFindings(source, "osn");
    expect(paths(findings)).toContain("modules[0].topicFamilies[0]");
    expect(paths(findings)).toContain("modules[0].references[0].refId");
    expect(paths(findings)).toContain("modules[0].contentPath");
    // week 1 does not exercise "tidak-ada"; both listed weeks are flagged as unrelated
    expect(findings.filter((f) => f.path.startsWith("modules[0].weeks"))).toHaveLength(2);
  });

  test("reports a week that does not exist in weeks.json", async () => {
    const source = await sourceWith({ ok: true, data: { modules: [entry({ weeks: [1] })] } });
    const real = (source.get("weeks.json") as { data: { weeks: Array<{ week: number }> } }).data;
    const withoutWeekOne = new Map(source);
    withoutWeekOne.set("weeks.json", {
      ok: true,
      data: { ...real, weeks: real.weeks.filter((w) => w.week !== 1) },
    });
    const findings = moduleFindings(withoutWeekOne, "osn");
    expect(findings).toHaveLength(1);
    expect(findings[0]?.message).toBe("week 1 does not exist in weeks.json");
  });

  test("a module whose weeks are listed but unrelated to its families is flagged", async () => {
    const source = await sourceWith({
      ok: true,
      data: { modules: [entry({ topicFamilies: ["geometri-dasar"], weeks: [1] })] },
    });
    const findings = moduleFindings(source, "osn");
    expect(findings).toHaveLength(1);
    expect(findings[0]?.message).toContain("does not exercise");
  });

  test("checks are skipped when the corpus files they need are missing or invalid", async () => {
    const source = new Map<string, CorpusEntry>([
      [
        "modules.json",
        { ok: true, data: { modules: [entry({ topicFamilies: ["x"], weeks: [3] })] } },
      ],
      ["weeks.json", { ok: false, error: "bad" }],
    ]);
    expect(moduleFindings(source, "osn")).toEqual([]);
  });
});

describe("moduleContentFindings and loadModule", () => {
  let tempRoot: string;
  let corpusDir: string;

  beforeEach(async () => {
    tempRoot = await mkdtemp(join(tmpdir(), "osn-modules-test-"));
    corpusDir = join(tempRoot, "data", "osn");
    await mkdir(corpusDir, { recursive: true });
    await cp(REAL_DATA_DIR, corpusDir, { recursive: true });
    await mkdir(join(tempRoot, "content", "osn", "modules"), { recursive: true });
  });

  afterEach(async () => {
    await rm(tempRoot, { recursive: true, force: true });
  });

  async function setModules(modules: unknown[]): Promise<CorpusSource> {
    await writeFile(join(corpusDir, "modules.json"), JSON.stringify({ modules }));
    return loadCorpusFromDirectory(corpusDir);
  }

  const body = (name: string, text: string) =>
    writeFile(join(tempRoot, "content", "osn", "modules", `${name}.md`), text);

  test("flags a missing and an empty content file; passes a present one", async () => {
    const source = await setModules([
      entry({ id: "ada", contentPath: "content/osn/modules/ada.md" }),
      entry({ id: "kosong", contentPath: "content/osn/modules/kosong.md" }),
      entry({ id: "hilang", contentPath: "content/osn/modules/hilang.md" }),
    ]);
    await body("ada", "## Isi\n");
    await body("kosong", "  \n\n");
    const findings = await moduleContentFindings(source, tempRoot);
    expect(findings.map((f) => f.path)).toEqual([
      "modules[1].contentPath",
      "modules[2].contentPath",
    ]);
    expect(findings[0]?.message).toContain("is empty");
    expect(findings[1]?.message).toContain("does not exist");
  });

  test("no findings without an index, and none for an invalid index", async () => {
    await rm(join(corpusDir, "modules.json"));
    expect(await moduleContentFindings(await loadCorpusFromDirectory(corpusDir), tempRoot)).toEqual(
      [],
    );
    const invalid = await setModules([{ id: "x" }]);
    expect(await moduleContentFindings(invalid, tempRoot)).toEqual([]);
  });

  test("loadModule returns the module, body and resolved references", async () => {
    await setModules([
      entry({
        references: [{ refId: "R1" }, { title: "Buku", url: "https://contoh.example/buku" }],
      }),
    ]);
    await body("contoh", "## Isi\n");
    const result = await loadModule(corpusDir, "contoh", tempRoot);
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.body).toBe("## Isi\n");
      expect(result.references[0]).toEqual({
        label: "R1",
        title: "Silabus OSN Informatika 2026",
        url: "https://osn.toki.id/silabus",
      });
      expect(result.references[1]).toEqual({
        label: null,
        title: "Buku",
        url: "https://contoh.example/buku",
      });
    }
  });

  test("loadModule fails clearly for every bad case", async () => {
    await rm(join(corpusDir, "modules.json"));
    const none = await loadModule(corpusDir, "contoh", tempRoot);
    expect(none).toEqual({ ok: false, message: expect.stringContaining("has no modules.json") });

    await setModules([{ id: "x" }]);
    const invalid = await loadModule(corpusDir, "x", tempRoot);
    expect(invalid.ok === false && invalid.message).toContain("is invalid");

    await setModules([entry()]);
    const unknown = await loadModule(corpusDir, "lain", tempRoot);
    expect(unknown.ok === false && unknown.message).toContain(
      'unknown module "lain". Known modules: contoh',
    );

    const noBody = await loadModule(corpusDir, "contoh", tempRoot);
    expect(noBody.ok === false && noBody.message).toContain("missing or empty");
    await body("contoh", "\n");
    const blank = await loadModule(corpusDir, "contoh", tempRoot);
    expect(blank.ok === false && blank.message).toContain("missing or empty");

    await body("contoh", "Isi");
    await setModules([entry({ references: [{ refId: "R999" }] })]);
    const dangling = await loadModule(corpusDir, "contoh", tempRoot);
    expect(dangling.ok === false && dangling.message).toContain('"R999" is not in references.json');

    const missingDir = await loadModule(join(tempRoot, "tidak-ada"), "contoh", tempRoot);
    expect(missingDir.ok === false && missingDir.message).toContain(
      "failed to read data directory",
    );
  });
});
