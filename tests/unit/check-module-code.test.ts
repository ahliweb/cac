/**
 * Unit tests for `scripts/check-module-code.ts` (issue #54): fenced-block
 * extraction, the tree walk, and exit codes, all with an injected fake
 * compiler. Unit tests do not shell out (docs/development/testing.md); the
 * real `g++ -std=c++17 -fsyntax-only` checks live in
 * tests/integration/check-module-code.test.ts.
 */

import { afterEach, beforeEach, describe, expect, test } from "bun:test";
import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import {
  type Compiler,
  checkModuleCode,
  extractCppBlocks,
  run,
} from "../../scripts/check-module-code";

const VALID = "int main() { return 0; }";
const INVALID = "int main() { return undeclared_name; }";

describe("extractCppBlocks", () => {
  test("extracts only cpp blocks, with the line each starts on", () => {
    const markdown = [
      "# Judul",
      "```text",
      "bukan kode",
      "```",
      "```cpp",
      "int a;",
      "```",
      "teks",
      "```CPP",
      "int b;",
      "int c;",
      "```",
    ].join("\n");
    expect(extractCppBlocks(markdown)).toEqual([
      { startLine: 6, code: "int a;\n" },
      { startLine: 10, code: "int b;\nint c;\n" },
    ]);
  });

  test("an unterminated block is ignored and a cpp-looking line inside another fence is not a block", () => {
    expect(extractCppBlocks("```cpp\nint a;")).toEqual([]);
    expect(extractCppBlocks("```text\n```cpp\n```")).toEqual([]);
    expect(extractCppBlocks("tanpa blok")).toEqual([]);
  });
});

describe("checkModuleCode", () => {
  let root: string;

  beforeEach(async () => {
    root = await mkdtemp(join(tmpdir(), "osn-check-module-code-"));
    await mkdir(join(root, "content", "osn", "modules"), { recursive: true });
    await mkdir(join(root, "content", "lain"), { recursive: true });
  });

  afterEach(async () => {
    await rm(root, { recursive: true, force: true });
  });

  const write = (path: string, text: string) => writeFile(join(root, path), text);

  test("no modules means no blocks and no failures", async () => {
    expect(await checkModuleCode(root)).toEqual({
      filesChecked: 0,
      blocksChecked: 0,
      failures: [],
    });
  });

  test("only files under content/**/modules/ are scanned", async () => {
    await write("content/lain/catatan.md", `\`\`\`cpp\n${INVALID}\n\`\`\`\n`);
    expect((await checkModuleCode(root)).filesChecked).toBe(0);
  });

  test("uses the injected compiler and reports each failing block", async () => {
    await write(
      "content/osn/modules/a.md",
      `\`\`\`cpp\n${VALID}\n\`\`\`\n\n\`\`\`cpp\nGAGAL\n\`\`\`\n`,
    );
    const fake: Compiler = async (code) =>
      code.includes("GAGAL")
        ? { ok: false, diagnostics: "kesalahan palsu" }
        : { ok: true, diagnostics: "" };
    const result = await checkModuleCode(root, fake);
    expect(result.filesChecked).toBe(1);
    expect(result.blocksChecked).toBe(2);
    expect(result.failures).toHaveLength(1);
    expect(result.failures[0]).toContain("content/osn/modules/a.md: block 2 (starting at line 6)");
    expect(result.failures[0]).toContain("kesalahan palsu");
  });

  test("a compiler that cannot start propagates (the script then exits 1)", async () => {
    await write("content/osn/modules/a.md", `\`\`\`cpp\n${VALID}\n\`\`\`\n`);
    const missing: Compiler = async () => {
      throw new Error("g++ not found");
    };
    await expect(checkModuleCode(root, missing)).rejects.toThrow("g++ not found");
  });
});

describe("run (exit code and messages)", () => {
  let root: string;
  const lines: string[] = [];
  const out = { log: (t: string) => lines.push(t), error: (t: string) => lines.push(t) };

  beforeEach(async () => {
    lines.length = 0;
    root = await mkdtemp(join(tmpdir(), "osn-check-module-code-run-"));
    await mkdir(join(root, "content", "osn", "modules"), { recursive: true });
    await writeFile(
      join(root, "content", "osn", "modules", "a.md"),
      `\`\`\`cpp\n${INVALID}\n\`\`\`\n`,
    );
  });

  afterEach(async () => {
    await rm(root, { recursive: true, force: true });
  });

  test("exits 1 and lists the failing block when a block does not compile", async () => {
    const failing: Compiler = async () => ({ ok: false, diagnostics: "kesalahan palsu" });
    expect(await run(root, failing, out)).toBe(1);
    expect(lines.join("\n")).toContain("FAILED -- 1 block(s) do not compile");
  });

  test("exits 0 when everything compiles", async () => {
    const ok: Compiler = async () => ({ ok: true, diagnostics: "" });
    expect(await run(root, ok, out)).toBe(0);
    expect(lines.join("\n")).toContain("OK -- 1 cpp block(s) in 1 module file(s)");
  });

  test("exits 1 loudly when the compiler is unavailable", async () => {
    const missing: Compiler = async () => {
      throw new Error("spawn g++ ENOENT");
    };
    expect(await run(root, missing, out)).toBe(1);
    expect(lines.join("\n")).toContain("refuses to pass without a compiler");
  });
});
