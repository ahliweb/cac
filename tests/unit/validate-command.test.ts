/**
 * Tests for `src/cli/commands/validate.ts`'s own argument handling
 * (`--data-dir`), calling `validateCommand.run` directly. Fixture-based
 * corruption of the corpus itself is covered by
 * `tests/unit/corpus-audit.test.ts` (the pure logic) and
 * `tests/integration/cli-validate-fixtures.test.ts` (a real end-to-end
 * subprocess run against a corrupted temp-directory copy).
 */

import { describe, expect, test } from "bun:test";
import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import type { CommandContext } from "../../src/cli/command";
import { validateCommand } from "../../src/cli/commands/validate";
import { DATA_ROOT } from "../../src/cli/program-loader";

function makeContext(overrides: Partial<CommandContext> = {}): {
  ctx: CommandContext;
  stdout: string[];
  stderr: string[];
} {
  const stdout: string[] = [];
  const stderr: string[] = [];
  const ctx: CommandContext = {
    json: false,
    cwd: process.cwd(),
    stdout: (text) => stdout.push(text),
    stderr: (text) => stderr.push(text),
    ...overrides,
  };
  return { ctx, stdout, stderr };
}

describe("DATA_ROOT", () => {
  test("resolves to the repository's real data/ directory", () => {
    expect(DATA_ROOT.endsWith(`${join("osn", "data")}`) || DATA_ROOT.endsWith("data")).toBe(true);
  });
});

describe("validateCommand.run", () => {
  test("with no args, validates the real corpus and returns exit 0", async () => {
    const { ctx, stdout } = makeContext();
    const code = await validateCommand.run([], ctx);
    expect(code).toBe(0);
    expect(stdout.join("")).toContain("OK");
  });

  test("--data-dir with no following path is a usage error (exit 2)", async () => {
    const { ctx, stderr } = makeContext();
    const code = await validateCommand.run(["--data-dir"], ctx);
    expect(code).toBe(2);
    expect(stderr.join("")).toContain("--data-dir requires a directory path argument");
  });

  test("--data-dir pointing at a non-existent directory is a usage error (exit 2)", async () => {
    const { ctx, stderr } = makeContext();
    const missing = join(tmpdir(), "osn-validate-command-does-not-exist", String(Date.now()));
    const code = await validateCommand.run(["--data-dir", missing], ctx);
    expect(code).toBe(2);
    expect(stderr.join("")).toContain("failed to read data directory");
  });

  test("--data-dir pointing at a fixture directory validates that corpus instead of the real one", async () => {
    const dir = await mkdtemp(join(tmpdir(), "osn-validate-command-fixture-"));
    try {
      await writeFile(join(dir, "weeks.json"), JSON.stringify({ not: "a valid weeks file" }));
      const { ctx, stdout } = makeContext();
      const code = await validateCommand.run(["--data-dir", dir], ctx);
      expect(code).toBe(1);
      expect(stdout.join("")).toContain(dir);
      expect(stdout.join("")).toContain("FAILED");
    } finally {
      await rm(dir, { recursive: true, force: true });
    }
  });

  test("--data-dir is resolved relative to ctx.cwd when given a relative path", async () => {
    const parent = await mkdtemp(join(tmpdir(), "osn-validate-command-relative-"));
    try {
      await writeFile(join(parent, "weeks.json"), JSON.stringify({ not: "valid" }));
      const { ctx, stdout } = makeContext({ cwd: parent });
      const code = await validateCommand.run(["--data-dir", "."], ctx);
      expect(code).toBe(1);
      expect(stdout.join("")).toContain(parent);
    } finally {
      await rm(parent, { recursive: true, force: true });
    }
  });

  test("--json emits a JSON object with ok: true against the real corpus", async () => {
    const { ctx, stdout } = makeContext({ json: true });
    const code = await validateCommand.run([], ctx);
    expect(code).toBe(0);
    const parsed = JSON.parse(stdout.join(""));
    expect(parsed.ok).toBe(true);
    expect(parsed.programs).toHaveLength(1);
    expect(parsed.programs[0].program).toBe("osn");
    expect(parsed.programs[0].ok).toBe(true);
  });
});

describe("validateCommand.run --program", () => {
  test("--program osn validates only that programme (exit 0, programme named in the output)", async () => {
    const { ctx, stdout } = makeContext();
    const code = await validateCommand.run(["--program", "osn"], ctx);
    expect(code).toBe(0);
    expect(stdout.join("")).toContain('programme "osn"');
  });

  test("--program osn --json emits the single-programme shape with a program field", async () => {
    const { ctx, stdout } = makeContext({ json: true });
    const code = await validateCommand.run(["--program", "osn"], ctx);
    expect(code).toBe(0);
    const parsed = JSON.parse(stdout.join(""));
    expect(parsed.program).toBe("osn");
    expect(parsed.ok).toBe(true);
    expect(parsed.programs).toBeUndefined();
  });

  test("an unknown programme is a usage error (exit 2) naming the registered ids", async () => {
    const { ctx, stderr } = makeContext();
    const code = await validateCommand.run(["--program", "tidak-ada"], ctx);
    expect(code).toBe(2);
    expect(stderr.join("")).toContain('unknown programme "tidak-ada"');
    expect(stderr.join("")).toContain("Registered programmes: osn");
  });

  test("--program with no value is a usage error (exit 2)", async () => {
    const { ctx, stderr } = makeContext();
    const code = await validateCommand.run(["--program"], ctx);
    expect(code).toBe(2);
    expect(stderr.join("")).toContain("--program requires a programme id argument");
  });

  test("--data-dir with an unknown --program is still a usage error", async () => {
    const { ctx } = makeContext();
    const code = await validateCommand.run(["--program", "tidak-ada", "--data-dir", "."], ctx);
    expect(code).toBe(2);
  });
});
