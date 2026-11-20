/**
 * A *temporary copy* of the repository for the end-to-end tests of the
 * per-programme module indexes (ADR-0007, ADR-0008): `src/`, `data/`,
 * `content/`, the programmes' source syllabi and `package.json`, with the
 * installed dependencies linked. A synthetic `modules.json` and synthetic
 * content files are added to the copy; the committed `data/` and `content/`
 * are never touched, and no real module content is written anywhere.
 */

import { cp, mkdir, mkdtemp, readdir, rm, symlink, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";

const REPO_ROOT = join(import.meta.dir, "..", "..");

/** The five programmes whose module index this fixture exercises. */
export const MODULE_PROGRAMS = [
  "tk-coding",
  "sd-coding",
  "smp-coding",
  "kuliah-coding",
  "dewasa-coding",
] as const;

export interface CliResult {
  readonly stdout: string;
  readonly stderr: string;
  readonly exitCode: number;
}

export interface ProgramModulesRepo {
  readonly root: string;
  /** Runs the real CLI of the copy as a subprocess. */
  cli(...args: string[]): Promise<CliResult>;
  /** Writes `data/<program>/modules.json` of the copy. */
  setIndex(program: string, modules: readonly Record<string, unknown>[]): Promise<void>;
  /** Writes a file (creating its directory) relative to the copy's root. */
  write(path: string, text: string): Promise<void>;
  dispose(): Promise<void>;
}

/** Creates the temporary repository copy; call `dispose()` when done. */
export async function createProgramModulesRepo(): Promise<ProgramModulesRepo> {
  const root = await mkdtemp(join(tmpdir(), "osn-program-modul-cli-"));
  await cp(join(REPO_ROOT, "src"), join(root, "src"), { recursive: true });
  await cp(join(REPO_ROOT, "data"), join(root, "data"), { recursive: true });
  await cp(join(REPO_ROOT, "content"), join(root, "content"), { recursive: true });
  await cp(join(REPO_ROOT, "package.json"), join(root, "package.json"));
  for (const program of MODULE_PROGRAMS) {
    await mkdir(join(root, "docs", "programs", program), { recursive: true });
    await cp(
      join(REPO_ROOT, "docs", "programs", program, "silabus.md"),
      join(root, "docs", "programs", program, "silabus.md"),
    );
  }
  // Link the installed dependencies (wherever the checkout's node_modules is, e.g. a parent of a worktree).
  const zodPackage = Bun.resolveSync("zod/package.json", REPO_ROOT);
  await symlink(dirname(dirname(zodPackage)), join(root, "node_modules"));

  const write = async (path: string, text: string): Promise<void> => {
    await mkdir(dirname(join(root, path)), { recursive: true });
    await writeFile(join(root, path), text);
  };

  return {
    root,
    async cli(...args) {
      const proc = Bun.spawn(["bun", "run", join(root, "src", "cli", "index.ts"), ...args], {
        cwd: root,
        stdout: "pipe",
        stderr: "pipe",
      });
      const [stdout, stderr, exitCode] = await Promise.all([
        new Response(proc.stdout).text(),
        new Response(proc.stderr).text(),
        proc.exited,
      ]);
      return { stdout, stderr, exitCode };
    },
    async setIndex(program, modules) {
      await write(`data/${program}/modules.json`, JSON.stringify({ modules }, null, 2));
      // The copy holds the repository's real sheets; keep only those the synthetic index points at, so a
      // test starts without orphan sheets (`validate` reports a sheet no entry points at).
      const keep = new Set(modules.map((module) => String(module.learnerSheetPath)));
      for (const name of await readdir(join(root, "content", program, "lembar")).catch(() => [])) {
        if (!keep.has(`content/${program}/lembar/${name}`)) {
          await rm(join(root, "content", program, "lembar", name), { force: true });
        }
      }
    },
    write,
    async dispose() {
      await rm(root, { recursive: true, force: true });
    },
  };
}
