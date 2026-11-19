/**
 * Registry invariants of the identity migration (issue #254; invariants
 * `docs/migrations/2026-11-cac-invariants.md`, proposals F2-A and F2-B):
 * the programme id `osn`, every `corpusDir`, the seven programmes and their
 * order stay put whatever the package or the CLI is called, and the package
 * `version` stays separate from each programme's `syllabusVersion`.
 *
 * Deliberately not pinned: the syllabus content, the `syllabusVersion`
 * values themselves (they move with a syllabus revision, not a rename) and
 * the package `name` (see `packageInfo.name === package.json name` in
 * `tests/unit/smoke.test.ts`).
 */

import { describe, expect, test } from "bun:test";
import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";
import packageJson from "../../package.json";
import { loadProgramRegistry } from "../../src/cli/program-loader";
import { DEFAULT_PROGRAM_ID } from "../../src/domain/programs";
import { REPO_ROOT } from "../helpers/cli-entries";

const EXPECTED_IDS = [
  "osn",
  "sma-coding",
  "tk-coding",
  "kuliah-coding",
  "dewasa-coding",
  "sd-coding",
  "smp-coding",
] as const;

async function registry() {
  const loaded = await loadProgramRegistry(join(REPO_ROOT, "data"));
  if (!loaded.ok) {
    throw new Error(`registry did not load: ${loaded.message}`);
  }
  return loaded.registry.programs;
}

describe("registry invariants (F2-A)", () => {
  test("the seven programme ids are registered in this order", async () => {
    expect((await registry()).map((program) => program.id)).toEqual([...EXPECTED_IDS]);
  });

  test("the default programme is `osn`, the first entry", async () => {
    expect(DEFAULT_PROGRAM_ID).toBe("osn");
    expect((await registry())[0]?.id).toBe("osn");
  });

  test("every corpusDir is data/<id> and holds that programme's JSON corpus", async () => {
    for (const program of await registry()) {
      expect(program.corpusDir).toBe(`data/${program.id}`);
      const files = await readdir(join(REPO_ROOT, program.corpusDir));
      expect(files.some((file) => file.endsWith(".json"))).toBe(true);
    }
  });

  test("every sourceDocument exists", async () => {
    for (const program of await registry()) {
      expect(await Bun.file(join(REPO_ROOT, program.sourceDocument)).exists()).toBe(true);
    }
  });

  test("no data/<dir> exists without a registered programme", async () => {
    const dirs = (await readdir(join(REPO_ROOT, "data"), { withFileTypes: true }))
      .filter((entry) => entry.isDirectory())
      .map((entry) => entry.name)
      .sort();
    expect(dirs).toEqual([...EXPECTED_IDS].sort());
  });
});

describe("package version vs syllabusVersion (F2-B)", () => {
  const SEMVER = /^\d+\.\d+\.\d+$/;
  const SYLLABUS_VERSION = /^\d+\.\d+(\.\d+)?$/;

  test("package.json carries a SemVer version; each programme has its own syllabusVersion", async () => {
    expect(packageJson.version).toMatch(SEMVER);
    for (const program of await registry()) {
      expect(program.syllabusVersion).toMatch(SYLLABUS_VERSION);
    }
  });

  test("the registry file holds no package version or bin", async () => {
    const text = await readFile(join(REPO_ROOT, "data", "programs.json"), "utf-8");
    expect(text).not.toContain('"bin"');
    expect(text).not.toContain('"version"');
  });

  test("the data, schema and domain layers never import package.json", async () => {
    const offenders: string[] = [];
    for (const dir of ["src/schema", "src/domain"]) {
      const files = await readdir(join(REPO_ROOT, dir));
      for (const file of files.filter((name) => name.endsWith(".ts"))) {
        const source = await readFile(join(REPO_ROOT, dir, file), "utf-8");
        if (source.includes("package.json")) {
          offenders.push(`${dir}/${file}`);
        }
      }
    }
    expect(offenders).toEqual([]);
  });
});
