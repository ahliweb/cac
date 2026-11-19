/**
 * Tests for the `modul` subcommand and the `--lembar` flag of
 * `src/cli/commands/render.ts` (ADR-0007, ADR-0008), calling
 * `renderCommand.run` in-process like `render-command.test.ts`. They use
 * only the committed corpus: the OSN module `dasar-pemrograman` and the
 * refusals that need no module index. The per-programme modules (with a
 * synthetic index) are covered end-to-end by
 * `tests/integration/cli-program-modules-render.test.ts`.
 */

import { describe, expect, test } from "bun:test";
import type { CommandContext } from "../../src/cli/command";
import { renderCommand } from "../../src/cli/commands/render";

function makeContext(): { ctx: CommandContext; stdout: string[]; stderr: string[] } {
  const stdout: string[] = [];
  const stderr: string[] = [];
  const ctx: CommandContext = {
    json: false,
    cwd: process.cwd(),
    stdout: (text) => stdout.push(text),
    stderr: (text) => stderr.push(text),
  };
  return { ctx, stdout, stderr };
}

describe("renderCommand.run: modul and --lembar (in-process)", () => {
  test("renders the committed OSN module", async () => {
    const { ctx, stdout, stderr } = makeContext();
    const code = await renderCommand.run(["modul", "--id", "dasar-pemrograman"], ctx);
    expect(code).toBe(0);
    expect(stderr).toEqual([]);
    expect(stdout.join("")).toStartWith("# Dasar Pemrograman dengan C++");
  });

  test("a missing --id and an unknown id are exit 2", async () => {
    const missing = makeContext();
    expect(await renderCommand.run(["modul"], missing.ctx)).toBe(2);
    expect(missing.stderr.join("")).toContain("--id <module-id> is required");
    const unknown = makeContext();
    expect(await renderCommand.run(["modul", "--id", "tidak-ada"], unknown.ctx)).toBe(2);
    expect(unknown.stderr.join("")).toContain("unknown module");
  });

  test("--lembar is refused for a programme without learner sheets", async () => {
    const osn = makeContext();
    expect(await renderCommand.run(["modul", "--id", "x", "--lembar"], osn.ctx)).toBe(2);
    expect(osn.stderr.join("")).toContain(
      "--lembar berlaku untuk program tk-coding dan sd-coding saja",
    );
    const smp = makeContext();
    expect(
      await renderCommand.run(
        ["modul", "--program", "smp-coding", "--id", "x", "--lembar"],
        smp.ctx,
      ),
    ).toBe(2);
    expect(smp.stderr.join("")).toContain("program smp-coding tidak punya lembar anak");
  });

  test("--lembar with another subcommand is refused", async () => {
    const { ctx, stderr } = makeContext();
    expect(await renderCommand.run(["sop", "--lembar"], ctx)).toBe(2);
    expect(stderr.join("")).toContain('--lembar is only valid with "osn render modul"');
  });

  test("a programme without a modules.json says so", async () => {
    const { ctx, stderr } = makeContext();
    expect(
      await renderCommand.run(
        ["modul", "--program", "tk-coding", "--id", "tk-a1-m1", "--lembar"],
        ctx,
      ),
    ).toBe(2);
    expect(stderr.join("")).toContain("this programme has no modules.json");
  });
});
