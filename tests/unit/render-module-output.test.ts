/**
 * Tests for `src/cli/render-module-output.ts` (ADR-0007, ADR-0008): the
 * output side of `osn render modul`, with and without `--lembar`, over
 * hand-made loaded modules. The end-to-end behaviour is in
 * `tests/integration/cli-program-modules-render.test.ts`.
 */

import { describe, expect, test } from "bun:test";
import type { CommandContext } from "../../src/cli/command";
import type { ModuleLoadResult } from "../../src/cli/module-content";
import { buildModuleOutput } from "../../src/cli/render-module-output";

const PROGRAM = { id: "sd-coding", name: "Program Uji SD" };

function context(): { ctx: CommandContext; stderr: string[] } {
  const stderr: string[] = [];
  return {
    ctx: {
      json: false,
      cwd: process.cwd(),
      stdout: () => undefined,
      stderr: (t) => stderr.push(t),
    },
    stderr,
  };
}

function loaded(
  learnerSheet: { path: string; body: string } | undefined,
): Extract<ModuleLoadResult, { ok: true }> {
  return {
    ok: true,
    module: {
      id: "sd1-1-m1",
      title: "Mengenal urutan",
      status: "draf",
      review: undefined,
      references: [{ title: "Rujukan uji", url: "https://contoh.example/r" }],
      contentPath: "content/sd-coding/modules/sd1-1-m1.md",
      learnerSheetPath: learnerSheet?.path,
    },
    body: "## Panduan\n\nIsi panduan.\n",
    references: [{ label: null, title: "Rujukan uji", url: "https://contoh.example/r" }],
    learnerSheet,
  };
}

describe("buildModuleOutput", () => {
  test("without --lembar it renders the module with its references", () => {
    const { ctx, stderr } = context();
    const out = buildModuleOutput(loaded(undefined), false, PROGRAM, ctx);
    expect(out.ok && out.content).toContain("Isi panduan.");
    expect(out.ok && out.content).toContain("## Rujukan");
    expect(stderr).toEqual([]);
  });

  test("with --lembar it renders the child's sheet, not the guide", () => {
    const { ctx } = context();
    const sheet = { path: "content/sd-coding/lembar/sd1-1-m1.md", body: "Gambar tiga langkah.\n" };
    const out = buildModuleOutput(loaded(sheet), true, PROGRAM, ctx);
    expect(out.ok && out.content).toContain("**Lembar anak**");
    expect(out.ok && out.content).toContain("Gambar tiga langkah.");
    expect(out.ok && out.content).not.toContain("Isi panduan.");
  });

  test("a module without a learner sheet is exit 2 with a message", () => {
    const { ctx, stderr } = context();
    expect(buildModuleOutput(loaded(undefined), true, PROGRAM, ctx)).toEqual({
      ok: false,
      exitCode: 2,
    });
    expect(stderr.join("")).toBe('osn render modul: module "sd1-1-m1" has no learner sheet.\n');
  });

  test("a sheet with a name field is refused with exit 1, naming the line", () => {
    const { ctx, stderr } = context();
    const sheet = { path: "content/sd-coding/lembar/sd1-1-m1.md", body: "# L\n\nNama: ___\n" };
    expect(buildModuleOutput(loaded(sheet), true, PROGRAM, ctx)).toEqual({
      ok: false,
      exitCode: 1,
    });
    expect(stderr.join("")).toContain('line 3 ("Nama: ___")');
  });
});
