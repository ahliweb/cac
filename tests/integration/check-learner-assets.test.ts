/**
 * Integration tests for `scripts/check-learner-assets.ts` (issue #178): the
 * tree walk over a synthetic `content/` directory in a temporary folder
 * (SVG rules on real files, image-link resolution, orphan warnings, exit
 * codes). No network, no external tool.
 */

import { afterEach, beforeEach, describe, expect, test } from "bun:test";
import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { checkLearnerAssets, MAX_SVG_BYTES, run } from "../../scripts/check-learner-assets";

const GOOD_SVG =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10"><circle r="4"/></svg>';

describe("checkLearnerAssets and run", () => {
  let root: string;
  const lines: string[] = [];
  const out = { log: (t: string) => lines.push(t), error: (t: string) => lines.push(t) };
  const write = (path: string, text: string) => writeFile(join(root, path), text);

  beforeEach(async () => {
    lines.length = 0;
    root = await mkdtemp(join(tmpdir(), "osn-check-learner-assets-"));
    await mkdir(join(root, "content", "tk-sintetis", "gambar"), { recursive: true });
    await mkdir(join(root, "content", "tk-sintetis", "lembar"), { recursive: true });
    await mkdir(join(root, "content", "tk-sintetis", "modules"), { recursive: true });
  });

  afterEach(async () => {
    await rm(root, { recursive: true, force: true });
  });

  test("an empty tree is clean", async () => {
    await rm(join(root, "content"), { recursive: true });
    expect(await checkLearnerAssets(root)).toEqual({
      svgChecked: 0,
      sheetsChecked: 0,
      linksChecked: 0,
      errors: [],
      warnings: [],
    });
    expect(await run(root, out)).toBe(0);
    expect(lines.join("\n")).toContain(
      "OK -- 0 SVG file(s), 0 image link(s) in 0 sheet(s); 0 warning(s).",
    );
  });

  test("a referenced clean SVG passes with exit 0", async () => {
    await write("content/tk-sintetis/gambar/bola.svg", GOOD_SVG);
    await write("content/tk-sintetis/lembar/satu.md", "# Satu\n\n![bola](../gambar/bola.svg)\n");
    const result = await checkLearnerAssets(root);
    expect(result).toMatchObject({
      svgChecked: 1,
      sheetsChecked: 1,
      linksChecked: 1,
      errors: [],
      warnings: [],
    });
    expect(await run(root, out)).toBe(0);
  });

  test("an orphan SVG is only a warning and keeps exit 0", async () => {
    await write("content/tk-sintetis/gambar/yatim.svg", GOOD_SVG);
    const result = await checkLearnerAssets(root);
    expect(result.errors).toEqual([]);
    expect(result.warnings).toEqual([
      "content/tk-sintetis/gambar/yatim.svg: orphan SVG, not referenced by any sheet in content/*/lembar/",
    ]);
    expect(await run(root, out)).toBe(0);
    expect(lines.join("\n")).toContain("WARNING -- content/tk-sintetis/gambar/yatim.svg");
  });

  test("a bad SVG fails with the file name and the rule", async () => {
    await write(
      "content/tk-sintetis/gambar/buruk.svg",
      '<svg viewBox="0 0 1 1"><script>x()</script></svg>',
    );
    await write("content/tk-sintetis/lembar/satu.md", "![x](../gambar/buruk.svg)\n");
    const result = await checkLearnerAssets(root);
    expect(result.errors).toEqual([
      "content/tk-sintetis/gambar/buruk.svg: forbidden element <script>",
    ]);
    expect(await run(root, out)).toBe(1);
    expect(lines.join("\n")).toContain("FAILED -- 1 problem(s)");
  });

  test("an SVG over the size limit fails", async () => {
    await write(
      "content/tk-sintetis/gambar/besar.svg",
      `<svg viewBox="0 0 1 1"><!-- ${"x".repeat(MAX_SVG_BYTES)} --></svg>`,
    );
    const result = await checkLearnerAssets(root);
    expect(result.errors[0]).toContain("besar.svg: size");
  });

  test("a sheet link to a missing file, outside gambar/, external or in another programme fails", async () => {
    await mkdir(join(root, "content", "lain", "gambar"), { recursive: true });
    await write("content/lain/gambar/x.svg", GOOD_SVG);
    await write("content/tk-sintetis/gambar/ada.svg", GOOD_SVG);
    await write("content/tk-sintetis/modules/m.md", "bukan gambar\n");
    await write(
      "content/tk-sintetis/lembar/dua.md",
      [
        "![a](../gambar/hilang.svg)",
        "![b](../modules/m.md)",
        "![c](https://contoh.test/x.svg)",
        "![d](//contoh.test/x.svg)",
        "![e](../../lain/gambar/x.svg)",
        "![f](../gambar/../modules/m.md)",
        "![g](../gambar/ada.svg?v=1#bagian)",
      ].join("\n"),
    );
    const result = await checkLearnerAssets(root);
    expect(result.linksChecked).toBe(7);
    expect(result.errors).toEqual([
      'content/tk-sintetis/lembar/dua.md:1: image link "../gambar/hilang.svg" points to a file that does not exist',
      'content/tk-sintetis/lembar/dua.md:2: image link "../modules/m.md" is outside content/tk-sintetis/gambar/',
      'content/tk-sintetis/lembar/dua.md:3: image link "https://contoh.test/x.svg" is external; use a file in content/tk-sintetis/gambar/',
      'content/tk-sintetis/lembar/dua.md:4: image link "//contoh.test/x.svg" is external; use a file in content/tk-sintetis/gambar/',
      'content/tk-sintetis/lembar/dua.md:5: image link "../../lain/gambar/x.svg" is outside content/tk-sintetis/gambar/',
      'content/tk-sintetis/lembar/dua.md:6: image link "../gambar/../modules/m.md" is outside content/tk-sintetis/gambar/',
    ]);
    expect(result.warnings).toContain(
      "content/lain/gambar/x.svg: orphan SVG, not referenced by any sheet in content/*/lembar/",
    );
  });
});
