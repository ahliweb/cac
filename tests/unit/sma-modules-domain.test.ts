/**
 * Tests for the `sma-coding` module rules (issue #106): `smaModuleFindings`
 * via `moduleFindings`, the per-programme dispatch (the old silent skip of
 * the week check for sma-coding), the content-file check and the loader.
 */

import { afterEach, beforeEach, describe, expect, test } from "bun:test";
import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { loadCorpusFromDirectory } from "../../src/cli/corpus-loader";
import { loadModule, moduleContentFindings } from "../../src/cli/module-content";
import type { CorpusEntry, CorpusSource } from "../../src/domain/corpus-audit";
import { moduleFindings, parseModulesIndex } from "../../src/domain/modules";
import { auditSmaCorpus } from "../../src/domain/sma-corpus-audit";
import { renderModule } from "../../src/render/module";

const REPO_ROOT = join(import.meta.dir, "..", "..");
const SMA_DIR = join(REPO_ROOT, "data", "sma-coding");
const OSN_FAMILIES: ReadonlySet<string> = new Set(["graph-tree", "dasar-pemrograman"]);
const REFERENCE = {
  title: "Panduan Mata Pelajaran Informatika, Fase D – F, 2025",
  url: "https://repositori.kemendikdasmen.go.id/33634/1/32.%20Panduan%20Mata%20Pelajaran%20Informatika.pdf",
};

function entry(overrides: Record<string, unknown> = {}): Record<string, unknown> {
  return {
    id: "contoh",
    title: "Contoh",
    cpItems: ["E-BK-a"],
    weekCodes: ["FND-X1-M2", "A-X1-M8"],
    bridgeFamilies: ["graph-tree"],
    gradeLevels: ["X"],
    prerequisites: ["FND-X1-M1"],
    audience: "siswa",
    language: "id",
    status: "draf",
    references: [REFERENCE],
    contentPath: "content/sma-coding/modules/contoh.md",
    ...overrides,
  };
}

let base: CorpusSource;
let REAL_OSN_FAMILIES: ReadonlySet<string>;
beforeEach(async () => {
  base = await loadCorpusFromDirectory(SMA_DIR);
  const osn = await loadCorpusFromDirectory(join(REPO_ROOT, "data", "osn"));
  const families = osn.get("topic-families.json");
  const data =
    families?.ok === true ? (families.data as { topicFamilies: { id: string }[] }) : null;
  REAL_OSN_FAMILIES = new Set(data?.topicFamilies.map((family) => family.id));
});

function sourceWith(
  modules: CorpusEntry | undefined,
  without: readonly string[] = [],
): CorpusSource {
  const map = new Map(base);
  map.delete("modules.json");
  for (const file of without) {
    map.delete(file);
  }
  if (modules !== undefined) {
    map.set("modules.json", modules);
  }
  return map;
}

const index = (...modules: Record<string, unknown>[]): CorpusEntry => ({
  ok: true,
  data: { modules },
});
const run = (source: CorpusSource, ...families: [ReadonlySet<string> | undefined] | []) =>
  moduleFindings(source, "sma-coding", {
    osnTopicFamilyIds: families.length === 0 ? OSN_FAMILIES : families[0],
  });
const paths = (findings: ReturnType<typeof run>) => findings.map((f) => f.path);

describe("moduleFindings for sma-coding", () => {
  test("no modules.json means no findings (the index is optional)", () => {
    expect(run(sourceWith(undefined))).toEqual([]);
  });

  test("the committed corpus is clean with an empty index and with one valid entry", () => {
    expect(run(sourceWith(index()))).toEqual([]);
    expect(run(sourceWith(index(entry())))).toEqual([]);
  });

  test("a series entry with every list empty (except grades) is clean without any reference file", () => {
    const series = entry({ cpItems: [], weekCodes: [], bridgeFamilies: [], prerequisites: [] });
    const source = sourceWith(index(series), ["cp-elements.json", "weeks.json", "foundation.json"]);
    expect(run(source, undefined)).toEqual([]);
  });

  test("invalid JSON and schema errors are reported against modules.json", () => {
    const bad = run(sourceWith({ ok: false, error: "Unexpected token" }));
    expect(bad).toHaveLength(1);
    expect(bad[0]?.file).toBe("modules.json");
    expect(bad[0]?.message).toContain("invalid JSON");
    expect(paths(run(sourceWith(index(entry({ status: "disetujui" })))))).toEqual([
      "modules.0.review",
    ]);
    expect(paths(run(sourceWith({ ok: true, data: [] })))).toEqual(["(root)"]);
  });

  test("an OSN-shaped entry is rejected by the sma-coding schema", () => {
    const osnShaped = entry({ topicFamilies: ["graph-tree"], weeks: [1] });
    expect(run(sourceWith(index(osnShaped))).length).toBeGreaterThan(0);
  });

  test("reports an unknown CP item, track week, foundation week and bridge family", () => {
    const findings = run(
      sourceWith(
        index(
          entry({
            cpItems: ["E-BK-z"],
            weekCodes: ["A-X1-M2", "FND-X1-M9", "Z-X1-M8"],
            bridgeFamilies: ["tidak-ada"],
            prerequisites: [],
          }),
        ),
      ),
    );
    // A-X1-M2 does not exist: kelas X semester 1 track weeks run 8..14 (foundation takes 1..7).
    expect(paths(findings)).toEqual([
      "modules[0].cpItems[0]",
      "modules[0].weekCodes[0]",
      "modules[0].weekCodes[1]",
      "modules[0].weekCodes[2]",
      "modules[0].bridgeFamilies[0]",
    ]);
    expect(findings[1]?.message).toContain("weeks.json");
    expect(findings[2]?.message).toContain("foundation.json");
  });

  test("the week check is not skipped for sma-coding (regression: it was parsed with the OSN schema)", () => {
    const findings = run(sourceWith(index(entry({ weekCodes: ["B-XII2-M14", "A-X1-M1"] }))));
    expect(paths(findings)).toEqual(["modules[0].weekCodes[1]"]);
  });

  test("prerequisites: unknown module, unknown foundation week, and a valid module id", () => {
    const findings = run(
      sourceWith(
        index(
          entry({
            id: "a",
            contentPath: "content/sma-coding/modules/a.md",
            prerequisites: ["b", "c", "FND-X1-M8"],
          }),
          entry({ id: "b", contentPath: "content/sma-coding/modules/b.md", prerequisites: [] }),
        ),
      ),
    );
    expect(paths(findings)).toEqual(["modules[0].prerequisites[1]", "modules[0].prerequisites[2]"]);
    expect(findings[0]?.message).toContain("neither a module");
    expect(findings[1]?.message).toContain("foundation.json");
  });

  test("prerequisite cycles are flagged, including a self-prerequisite; a diamond is fine", () => {
    const mod = (id: string, prerequisites: string[]) =>
      entry({ id, contentPath: `content/sma-coding/modules/${id}.md`, prerequisites });
    const cyclic = run(
      sourceWith(
        index(mod("a", ["b"]), mod("b", ["c"]), mod("c", ["a"]), mod("d", ["d"]), mod("e", ["a"])),
      ),
    );
    expect(paths(cyclic)).toEqual([
      "modules[0].prerequisites[0]",
      "modules[1].prerequisites[0]",
      "modules[2].prerequisites[0]",
      "modules[3].prerequisites[0]",
    ]);
    expect(cyclic.every((f) => f.message.includes("cycle"))).toBe(true);

    const diamond = run(
      sourceWith(index(mod("a", []), mod("b", ["a"]), mod("c", ["a"]), mod("d", ["b", "c"]))),
    );
    expect(diamond).toEqual([]);
  });

  test("a check that cannot run is a finding, never a silent skip", () => {
    const used = index(entry({ prerequisites: [] }));
    const findings = run(
      sourceWith(used, ["cp-elements.json", "weeks.json", "foundation.json"]),
      undefined,
    );
    expect(paths(findings)).toEqual([
      "cpItems",
      "weekCodes",
      "weekCodes/prerequisites",
      "bridgeFamilies",
    ]);
    expect(findings.every((f) => f.message.includes("cannot be checked"))).toBe(true);
  });

  test("an invalid weeks.json also turns a used track week code into a finding", () => {
    const map = new Map(sourceWith(index(entry({ weekCodes: ["A-X1-M8"] }))));
    map.set("weeks.json", { ok: true, data: { weeks: "bukan array" } });
    expect(paths(run(map))).toEqual(["weekCodes"]);
  });

  test("the OSN path is untouched: an OSN-shaped entry is checked against the OSN corpus", async () => {
    const osn = await loadCorpusFromDirectory(join(REPO_ROOT, "data", "osn"));
    expect(moduleFindings(osn, "osn")).toEqual([]);
  });
});

describe("auditSmaCorpus with a module index", () => {
  test("modules.json is not reported as an unregistered data file", () => {
    const result = auditSmaCorpus(sourceWith(index(entry())), REAL_OSN_FAMILIES);
    expect(result.ok).toBe(true);
  });
});

describe("parseModulesIndex per programme", () => {
  test("sma-coding uses the sma-coding schema; the default stays OSN", () => {
    const source = sourceWith(index(entry()));
    expect(parseModulesIndex(source, "sma-coding").modules?.modules).toHaveLength(1);
    expect(parseModulesIndex(source).modules).toBeUndefined();
    expect(parseModulesIndex(sourceWith(undefined), "sma-coding").findings).toEqual([]);
  });
});

describe("sma-coding module content and loader", () => {
  let repo: string;
  beforeEach(async () => {
    repo = await mkdtemp(join(tmpdir(), "osn-sma-modul-"));
    await mkdir(join(repo, "content", "sma-coding", "modules"), { recursive: true });
  });
  afterEach(async () => {
    await rm(repo, { recursive: true, force: true });
  });

  test("moduleContentFindings flags a missing and a blank body", async () => {
    await writeFile(join(repo, "content/sma-coding/modules/kosong.md"), "  \n");
    const source = sourceWith(
      index(
        entry({ id: "hilang", contentPath: "content/sma-coding/modules/hilang.md" }),
        entry({ id: "kosong", contentPath: "content/sma-coding/modules/kosong.md" }),
        entry({ id: "ada", contentPath: "content/sma-coding/modules/ada.md" }),
      ),
    );
    await writeFile(join(repo, "content/sma-coding/modules/ada.md"), "Isi.\n");
    const findings = await moduleContentFindings(source, repo, "sma-coding");
    expect(
      findings.map((f) => [f.path, f.message.includes("exist") ? "missing" : "blank"]),
    ).toEqual([
      ["modules[0].contentPath", "missing"],
      ["modules[1].contentPath", "blank"],
    ]);
    // Under the OSN schema the same index is invalid, so nothing is checked (reported elsewhere).
    expect(await moduleContentFindings(source, repo)).toEqual([]);
  });

  async function corpusDir(modules: Record<string, unknown>[]): Promise<string> {
    const dir = join(repo, "data", "sma-coding");
    await mkdir(dir, { recursive: true });
    await writeFile(join(dir, "modules.json"), JSON.stringify({ modules }));
    return dir;
  }

  test("loadModule loads an sma-coding module and renders it with the DRAF banner and its references", async () => {
    await writeFile(join(repo, "content/sma-coding/modules/contoh.md"), "## Isi\n\nTeks.\n");
    const dir = await corpusDir([entry()]);
    const loaded = await loadModule(dir, "contoh", repo, "sma-coding");
    if (!loaded.ok) {
      throw new Error(loaded.message);
    }
    expect(loaded.references).toEqual([
      { label: null, title: REFERENCE.title, url: REFERENCE.url },
    ]);
    const out = renderModule(loaded.module, loaded.body, loaded.references, {
      id: "sma-coding",
      name: "Silabus Coding SMA",
    });
    const lines = out.split("\n");
    expect(lines[0]).toBe("# Contoh");
    expect(lines[2]).toStartWith("> **DRAF — belum ditinjau.**");
    expect(out).toContain("## Rujukan");
    expect(out).toContain(`- ${REFERENCE.title} <${REFERENCE.url}>`);
    expect(out).toContain("Status modul: draf.");
    expect(out).toContain("Program: Silabus Coding SMA (sma-coding).");
  });

  test("loadModule reports an unknown id, a missing index, an invalid index and a missing body", async () => {
    const dir = await corpusDir([entry()]);
    const unknown = await loadModule(dir, "lain", repo, "sma-coding");
    expect(unknown).toMatchObject({ ok: false });
    expect(unknown.ok === false && unknown.message).toContain("Known modules: contoh");

    const missingBody = await loadModule(dir, "contoh", repo, "sma-coding");
    expect(missingBody.ok === false && missingBody.message).toContain("missing or empty");

    const invalid = await loadModule(await corpusDir([{ id: "x" }]), "x", repo, "sma-coding");
    expect(invalid.ok === false && invalid.message).toContain("is invalid");

    const none = join(repo, "kosong");
    await mkdir(none);
    const absent = await loadModule(none, "x", repo, "sma-coding");
    expect(absent.ok === false && absent.message).toContain("has no modules.json");
  });
});
