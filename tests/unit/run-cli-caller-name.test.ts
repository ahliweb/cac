/**
 * `runCli`'s caller name (issue #251): `cac` and `osn` share one core; the
 * name only changes the printed command prefix, never behaviour or JSON.
 */

import { describe, expect, test } from "bun:test";
import { buildGlobalUsage, runCli } from "../../src/cli/run-cli";

async function capture(argv: readonly string[], cli?: string) {
  let stdout = "";
  let stderr = "";
  const exitCode = await runCli(argv, {
    stdout: (text) => {
      stdout += text;
    },
    stderr: (text) => {
      stderr += text;
    },
    cwd: process.cwd(),
    ...(cli === undefined ? {} : { cli }),
  });
  return { stdout, stderr, exitCode };
}

describe("runCli caller name", () => {
  test("defaults to osn", async () => {
    const result = await capture(["bogus"]);
    expect(result.exitCode).toBe(2);
    expect(result.stderr).toContain('osn: unknown command "bogus"');
    expect(buildGlobalUsage()).toBe(buildGlobalUsage("osn"));
    expect(buildGlobalUsage()).toStartWith("osn -- OSN Informatika 2026 curriculum CLI\n");
  });

  test("cac prints cac in usage, errors and command help", async () => {
    expect(buildGlobalUsage("cac")).toStartWith("cac -- ");
    expect(buildGlobalUsage("cac")).toContain("Usage: cac <command> [options]");
    expect(buildGlobalUsage("cac")).toContain("`cac <command> --help`");
    const unknown = await capture(["bogus"], "cac");
    expect(unknown.stderr).toContain('cac: unknown command "bogus"');
    expect(unknown.stderr).toContain('Run "cac --help" for usage.');
    const help = await capture(["plan", "--help"], "cac");
    expect(help.exitCode).toBe(0);
    expect(help.stdout).toContain("  cac plan --start <YYYY-MM-DD>");
    const usage = await capture(["plan"], "cac");
    expect(usage.stderr).toContain(
      'cac plan: --start <YYYY-MM-DD> is required. Run "cac plan --help"',
    );
  });

  test("the osn help text is unchanged by the caller-name parameter", async () => {
    const help = await capture(["--help"], "osn");
    expect(help.stdout).toBe(`${buildGlobalUsage()}\n`);
    expect(help.stdout).not.toContain("cac");
  });

  test("--json output does not depend on the caller name", async () => {
    const cac = await capture(["checklist", "--json"], "cac");
    const osn = await capture(["checklist", "--json"], "osn");
    expect(cac.exitCode).toBe(0);
    expect(cac.stdout).toBe(osn.stdout);
  });
});
