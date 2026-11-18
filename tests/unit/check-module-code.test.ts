/**
 * Tests for `scripts/check-module-code.ts` (issue #54): fenced-block
 * extraction, the tree walk with an injected compiler, and the real
 * `g++ -std=c++17 -fsyntax-only` check on a valid and an invalid block.
 */

import { afterEach, beforeEach, describe, expect, test } from "bun:test";
import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import {
  type Compiler,
  checkModuleCode,
  extractCppBlocks,
  gppSyntaxCheck,
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

  test("real g++: a valid block passes and an invalid block fails", async () => {
    await write("content/osn/modules/baik.md", `\`\`\`cpp\n${VALID}\n\`\`\`\n`);
    expect((await checkModuleCode(root)).failures).toEqual([]);
    await write("content/osn/modules/buruk.md", `\`\`\`cpp\n${INVALID}\n\`\`\`\n`);
    const result = await checkModuleCode(root);
    expect(result.blocksChecked).toBe(2);
    expect(result.failures).toHaveLength(1);
    expect(result.failures[0]).toContain("buruk.md");
    expect(result.failures[0]).toContain("undeclared_name");
  });
});

describe("gppSyntaxCheck", () => {
  test("accepts C++17 code and rejects a syntax error", async () => {
    const good = await gppSyntaxCheck(
      "#include <optional>\nint main() { std::optional<int> x; return x.value_or(0); }\n",
    );
    expect(good).toEqual({ ok: true, diagnostics: "" });
    const bad = await gppSyntaxCheck("int main( {\n");
    expect(bad.ok).toBe(false);
    expect(bad.diagnostics.length).toBeGreaterThan(0);
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
    expect(await run(root, gppSyntaxCheck, out)).toBe(1);
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
