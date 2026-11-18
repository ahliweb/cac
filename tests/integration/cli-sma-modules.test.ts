/**
 * End-to-end tests for the `sma-coding` module index (issue #106): the real
 * CLI as a subprocess against a *temporary copy* of the repository (`src/`,
 * `data/`, the syllabus, `node_modules` linked) in which a `modules.json`
 * and `content/sma-coding/modules/*.md` are added. The committed
 * `data/sma-coding/` and `content/` are never touched.
 */

import { afterAll, beforeAll, describe, expect, test } from "bun:test";
import { cp, mkdir, mkdtemp, rm, symlink, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";

const REPO_ROOT = join(import.meta.dir, "..", "..");
const REFERENCE = {
  title: "Panduan Mata Pelajaran Informatika, Fase D – F, 2025",
  url: "https://repositori.kemendikdasmen.go.id/33634/1/32.%20Panduan%20Mata%20Pelajaran%20Informatika.pdf",
};

let repo: string;

interface CliResult {
  readonly stdout: string;
  readonly stderr: string;
  readonly exitCode: number;
}

async function cli(...args: string[]): Promise<CliResult> {
  const proc = Bun.spawn(["bun", "run", join(repo, "src", "cli", "index.ts"), ...args], {
    cwd: repo,
    stdout: "pipe",
    stderr: "pipe",
  });
  const [stdout, stderr, exitCode] = await Promise.all([
    new Response(proc.stdout).text(),
    new Response(proc.stderr).text(),
    proc.exited,
  ]);
  return { stdout, stderr, exitCode };
}

function entry(id: string, overrides: Record<string, unknown> = {}): Record<string, unknown> {
  return {
    id,
    title: `Modul ${id}`,
    cpItems: ["E-BK-a"],
    weekCodes: ["FND-X1-M2", "A-X1-M8"],
    bridgeFamilies: ["graph-tree"],
    gradeLevels: ["X"],
    prerequisites: ["FND-X1-M1"],
    audience: "siswa",
    language: "id",
    status: "draf",
    references: [REFERENCE],
    contentPath: `content/sma-coding/modules/${id}.md`,
    ...overrides,
  };
}

async function setIndex(modules: Record<string, unknown>[]): Promise<void> {
  await writeFile(
    join(repo, "data", "sma-coding", "modules.json"),
    JSON.stringify({ modules }, null, 2),
  );
}

beforeAll(async () => {
  repo = await mkdtemp(join(tmpdir(), "osn-sma-modul-cli-"));
  await cp(join(REPO_ROOT, "src"), join(repo, "src"), { recursive: true });
  await cp(join(REPO_ROOT, "data"), join(repo, "data"), { recursive: true });
  await cp(join(REPO_ROOT, "content"), join(repo, "content"), { recursive: true });
  await mkdir(join(repo, "docs", "programs", "sma-coding"), { recursive: true });
  await cp(
    join(REPO_ROOT, "docs", "programs", "sma-coding", "silabus.md"),
    join(repo, "docs", "programs", "sma-coding", "silabus.md"),
  );
  await cp(join(REPO_ROOT, "package.json"), join(repo, "package.json"));
  await cp(
    join(
      REPO_ROOT,
      "docs",
      "Silabus_Operasional_OSN_Informatika_2026_Siap_Pakai_AhliKoding_AhliWeb.pdf",
    ),
    join(
      repo,
      "docs",
      "Silabus_Operasional_OSN_Informatika_2026_Siap_Pakai_AhliKoding_AhliWeb.pdf",
    ),
  );
  // Link the installed dependencies (wherever the checkout's node_modules is, e.g. a parent of a worktree).
  const zodPackage = Bun.resolveSync("zod/package.json", REPO_ROOT);
  await symlink(dirname(dirname(zodPackage)), join(repo, "node_modules"));
  await mkdir(join(repo, "content", "sma-coding", "modules"), { recursive: true });
  await writeFile(
    join(repo, "content", "sma-coding", "modules", "contoh.md"),
    "## Isi modul\n\nTeks isi.\n",
  );
  await writeFile(join(repo, "content", "sma-coding", "modules", "kosong.md"), "\n");
});

afterAll(async () => {
  await rm(repo, { recursive: true, force: true });
});

describe("osn validate --program sma-coding with a module index", () => {
  test("a valid index with an existing body is clean (exit 0)", async () => {
    await setIndex([entry("contoh")]);
    const result = await cli("validate", "--program", "sma-coding");
    expect(result.stderr).toBe("");
    expect(result.exitCode).toBe(0);
  });

  test("a bad index is exit 1 and every problem is named in one pass", async () => {
    await setIndex([
      entry("contoh", {
        cpItems: ["E-BK-z"],
        weekCodes: ["A-X1-M1"],
        bridgeFamilies: ["tidak-ada"],
        prerequisites: ["contoh", "hilang"],
      }),
      entry("tanpa-isi"),
      entry("kosong"),
    ]);
    const result = await cli("validate", "--program", "sma-coding");
    expect(result.exitCode).toBe(1);
    for (const fragment of [
      'CP item "E-BK-z"',
      'week code "A-X1-M1"',
      'OSN topic family "tidak-ada"',
      "prerequisite cycle",
      'prerequisite "hilang"',
      'content file "content/sma-coding/modules/tanpa-isi.md" does not exist',
      'content file "content/sma-coding/modules/kosong.md" is empty',
    ]) {
      expect(result.stdout).toContain(fragment);
    }
  });

  test("a schema violation (OSN-shaped entry) is exit 1", async () => {
    await setIndex([entry("contoh", { topicFamilies: ["graph-tree"] })]);
    const result = await cli("validate", "--program", "sma-coding");
    expect(result.exitCode).toBe(1);
    expect(result.stdout).toContain("modules.json");
  });

  test("osn is unaffected by an sma-coding index", async () => {
    const result = await cli("validate", "--program", "osn");
    expect(result.exitCode).toBe(0);
  });
});

describe("osn render modul --program sma-coding", () => {
  test("renders title, DRAF banner, body, Rujukan and the programme footer", async () => {
    await setIndex([entry("contoh")]);
    const result = await cli("render", "modul", "--id", "contoh", "--program", "sma-coding");
    expect(result.stderr).toBe("");
    expect(result.exitCode).toBe(0);
    const lines = result.stdout.split("\n");
    expect(lines[0]).toBe("# Modul contoh");
    expect(lines[2]).toStartWith("> **DRAF — belum ditinjau.**");
    expect(result.stdout).toContain("## Isi modul");
    expect(result.stdout).toContain(`## Rujukan\n- ${REFERENCE.title} <${REFERENCE.url}>`);
    expect(result.stdout).toContain("Status modul: draf.");
    expect(result.stdout).toContain("Program: ");
    expect(result.stdout).toContain("(sma-coding).");
  });

  test("an approved module has no banner and shows the approval footer", async () => {
    await setIndex([
      entry("contoh", {
        status: "disetujui",
        review: { approvedOn: "2026-11-19", reviewerRole: "pemilik" },
      }),
    ]);
    const result = await cli("render", "modul", "--id", "contoh", "--program", "sma-coding");
    expect(result.exitCode).toBe(0);
    expect(result.stdout).not.toContain("DRAF");
    expect(result.stdout).toContain(
      "Disetujui pada 2026-11-19 oleh peninjau dengan peran: pemilik.",
    );
  });

  test("an unknown id lists the known ids; a blank or missing body is exit 2", async () => {
    await setIndex([entry("contoh"), entry("kosong")]);
    const unknown = await cli("render", "modul", "--id", "lain", "--program", "sma-coding");
    expect(unknown.exitCode).toBe(2);
    expect(unknown.stderr).toContain("Known modules: contoh, kosong");
    const blank = await cli("render", "modul", "--id", "kosong", "--program", "sma-coding");
    expect(blank.exitCode).toBe(2);
    expect(blank.stderr).toContain("missing or empty");
  });

  test("OSN rendering is unchanged", async () => {
    const result = await cli("render", "modul", "--id", "dasar-pemrograman");
    expect(result.exitCode).toBe(0);
    expect(result.stdout.split("\n")[0]).toBe("# Dasar Pemrograman dengan C++");
  });
});
