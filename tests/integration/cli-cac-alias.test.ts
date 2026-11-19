/**
 * End-to-end tests for the two CLI names (issue #251): `cac` (canonical,
 * `src/cli/cac.ts`) and `osn` (legacy alias, `src/cli/index.ts`) are thin
 * entries over one `runCli`. Each case spawns both entries as real
 * subprocesses and asserts that the exit code and the `--json` output are
 * identical, and that only the printed caller name differs (`cac:` vs
 * `osn:`).
 */

import { describe, expect, test } from "bun:test";
import { join } from "node:path";
import packageJson from "../../package.json";

const REPO_ROOT = join(import.meta.dir, "..", "..");

const ENTRIES = {
  cac: join(REPO_ROOT, "src", "cli", "cac.ts"),
  osn: join(REPO_ROOT, "src", "cli", "index.ts"),
} as const;

interface CliResult {
  readonly stdout: string;
  readonly stderr: string;
  readonly exitCode: number;
}

async function run(name: keyof typeof ENTRIES, args: readonly string[]): Promise<CliResult> {
  const proc = Bun.spawn(["bun", "run", ENTRIES[name], ...args], {
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

/** Replaces the absolute repository path so text output is comparable across checkouts. */
function normalise(text: string): string {
  return text.split(REPO_ROOT).join("<REPO>");
}

describe("package.json bin", () => {
  test("declares both cac and osn, pointing at existing entry files", async () => {
    expect(packageJson.bin).toEqual({ cac: "src/cli/cac.ts", osn: "src/cli/index.ts" });
    for (const path of Object.values(packageJson.bin)) {
      expect(await Bun.file(join(REPO_ROOT, path)).exists()).toBe(true);
    }
  });
});

describe("cac and osn run one core", () => {
  test("--version prints the package version for both, stderr empty", async () => {
    for (const name of ["cac", "osn"] as const) {
      const result = await run(name, ["--version"]);
      expect(result.exitCode).toBe(0);
      expect(result.stdout).toBe(`${packageJson.version}\n`);
      expect(result.stderr).toBe("");
    }
  });

  test("--help: exit 0, caller name in title/usage, same command list", async () => {
    const cac = await run("cac", ["--help"]);
    const osn = await run("osn", ["--help"]);
    expect(cac.exitCode).toBe(0);
    expect(osn.exitCode).toBe(0);
    expect(cac.stdout).toContain("Usage: cac <command> [options]");
    expect(cac.stdout.startsWith("cac -- ")).toBe(true);
    expect(osn.stdout.startsWith("osn -- OSN Informatika 2026 curriculum CLI\n")).toBe(true);
    expect(osn.stdout).toContain("Usage: osn <command> [options]");
    expect(osn.stdout).not.toContain("cac");
    const commandBlock = (text: string): string =>
      text.slice(text.indexOf("Commands:"), text.indexOf("Global flags:"));
    expect(commandBlock(cac.stdout)).toBe(commandBlock(osn.stdout));
  });

  test("command help carries the caller name", async () => {
    const cac = await run("cac", ["validate", "--help"]);
    const osn = await run("osn", ["validate", "--help"]);
    expect(cac.exitCode).toBe(0);
    expect(osn.exitCode).toBe(0);
    expect(cac.stdout).toContain("Usage: cac validate [options]");
    expect(osn.stdout).toContain("Usage: osn validate [options]");
    expect(cac.stdout.replaceAll("cac ", "osn ")).toBe(osn.stdout);
  });

  test("validate: exit 0 for both; text differs only by the caller prefix", async () => {
    const cac = await run("cac", ["validate"]);
    const osn = await run("osn", ["validate"]);
    expect(cac.exitCode).toBe(0);
    expect(osn.exitCode).toBe(0);
    expect(cac.stdout).toContain('cac validate: programme "osn", corpus at ');
    expect(osn.stdout).toContain('osn validate: programme "osn", corpus at ');
    expect(normalise(cac.stdout).replaceAll("cac validate:", "osn validate:")).toBe(
      normalise(osn.stdout),
    );
    expect(cac.stderr).toBe("");
    expect(osn.stderr).toBe("");
  });

  test("validate --json is byte-identical", async () => {
    const cac = await run("cac", ["validate", "--json"]);
    const osn = await run("osn", ["validate", "--json"]);
    expect(cac.exitCode).toBe(0);
    expect(osn.exitCode).toBe(0);
    expect(cac.stdout).toBe(osn.stdout);
    expect(Object.keys(JSON.parse(cac.stdout))).toEqual(["ok", "programs"]);
  });

  test("privacy-check: exit 0 for both; --json byte-identical", async () => {
    const cac = await run("cac", ["privacy-check"]);
    const osn = await run("osn", ["privacy-check"]);
    expect(cac.exitCode).toBe(0);
    expect(osn.exitCode).toBe(0);
    expect(cac.stdout).toContain("cac privacy-check: scanning ");
    expect(osn.stdout).toContain("osn privacy-check: scanning ");

    const cacJson = await run("cac", ["privacy-check", "--json"]);
    const osnJson = await run("osn", ["privacy-check", "--json"]);
    expect(cacJson.stdout).toBe(osnJson.stdout);
  });

  test("usage errors exit 2 with the caller prefix", async () => {
    const cases: readonly (readonly string[])[] = [
      ["bogus"],
      ["privacy-check", "--bogus"],
      ["validate", "--program", "nope"],
      ["plan"],
    ];
    for (const args of cases) {
      const cac = await run("cac", args);
      const osn = await run("osn", args);
      expect(cac.exitCode).toBe(2);
      expect(osn.exitCode).toBe(2);
      expect(cac.stderr.startsWith("cac")).toBe(true);
      expect(osn.stderr.startsWith("osn")).toBe(true);
      expect(cac.stderr.replaceAll("cac", "osn")).toBe(osn.stderr);
    }
  });

  test("unknown command names the caller in the prefix and the hint", async () => {
    const cac = await run("cac", ["bogus"]);
    expect(cac.stderr).toContain('cac: unknown command "bogus".');
    expect(cac.stderr).toContain('Run "cac --help" for usage.');
    const osn = await run("osn", ["bogus"]);
    expect(osn.stderr).toContain('osn: unknown command "bogus".');
    expect(osn.stderr).toContain('Run "osn --help" for usage.');
  });

  test("artefact titles do not change with the caller name", async () => {
    const cac = await run("cac", ["checklist"]);
    const osn = await run("osn", ["checklist"]);
    expect(cac.stdout).toBe(osn.stdout);
    expect(cac.stdout).toContain("# osn checklist:");
  });

  test("--json is byte-identical for checklist", async () => {
    const cac = await run("cac", ["checklist", "--json"]);
    const osn = await run("osn", ["checklist", "--json"]);
    expect(cac.exitCode).toBe(0);
    expect(cac.stdout).toBe(osn.stdout);
  });
});
