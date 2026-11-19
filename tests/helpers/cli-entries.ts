/**
 * Support code for the contract tests of the two CLI names (issue #254):
 * `cac` (canonical, `src/cli/cac.ts`) and `osn` (legacy alias,
 * `src/cli/index.ts`) as real subprocesses, path normalisation, a tree
 * hash, and the temporary-directory helpers. Never a `*.test.ts`.
 */

import { mkdtemp, readdir, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

export const REPO_ROOT = join(import.meta.dir, "..", "..");

export const CLI_NAMES = ["cac", "osn"] as const;
export type CliName = (typeof CLI_NAMES)[number];

export const CLI_ENTRIES: Readonly<Record<CliName, string>> = {
  cac: join(REPO_ROOT, "src", "cli", "cac.ts"),
  osn: join(REPO_ROOT, "src", "cli", "index.ts"),
};

export interface CliResult {
  readonly stdout: string;
  readonly stderr: string;
  readonly exitCode: number;
}

/** Runs one CLI entry as a real subprocess from the repository root. */
export async function runEntry(name: CliName, args: readonly string[]): Promise<CliResult> {
  const proc = Bun.spawn(["bun", "run", CLI_ENTRIES[name], ...args], {
    cwd: REPO_ROOT,
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

/** Runs the same arguments through both entries, concurrently. */
export async function runBoth(
  args: readonly string[],
): Promise<Readonly<Record<CliName, CliResult>>> {
  const [cac, osn] = await Promise.all([runEntry("cac", args), runEntry("osn", args)]);
  return { cac, osn };
}

/** Replaces the absolute repository path so output is comparable across checkouts. */
export function normalisePath(text: string): string {
  return text.split(REPO_ROOT).join("<REPO>");
}

/** Maps `cac` output onto the `osn` spelling (caller-name prefix only) and normalises paths. */
export function asOsn(text: string): string {
  return normalisePath(text).replace(/\bcac\b/g, "osn");
}

/** Substitutes the `{cli}` placeholder with the caller name. */
export function forCli(template: string, name: CliName): string {
  return template.replaceAll("{cli}", name);
}

export async function makeTempDir(prefix: string): Promise<string> {
  return mkdtemp(join(tmpdir(), `${prefix}-`));
}

export async function removeDir(dir: string): Promise<void> {
  await rm(dir, { recursive: true, force: true });
}

/** sha256 over every file under `root` (sorted relative paths and contents). */
export async function hashTree(root: string): Promise<string> {
  const hasher = new Bun.CryptoHasher("sha256");
  const entries = (await readdir(root, { recursive: true, withFileTypes: true }))
    .filter((entry) => entry.isFile())
    .map((entry) => join(entry.parentPath, entry.name))
    .sort();
  for (const path of entries) {
    hasher.update(`${path.slice(root.length)}\0`);
    hasher.update(await readFile(path));
    hasher.update("\0");
  }
  return hasher.digest("hex");
}
