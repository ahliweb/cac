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
  type Checkers,
  type Compiler,
  checkModuleCode,
  extractBlocks,
  extractCppBlocks,
  jsSyntaxCheck,
  run,
  tsSyntaxCheck,
} from "../../scripts/check-module-code";

const VALID = "int main() { return 0; }";
const INVALID = "int main() { return undeclared_name; }";

describe("extractBlocks (fence indented inside a list item, CommonMark)", () => {
  test("removes the fence indentation from every content line, keeping deeper indentation", () => {
    const markdown = [
      "1. Langkah:",
      "",
      "   ```python",
      "   def f(x):",
      "       return x",
      "",
      "   print(f(1))",
      "   ```",
      "",
    ].join("\n");
    const [block] = extractBlocks(markdown);
    expect(block?.language).toBe("python");
    expect(block?.code).toBe("def f(x):\n    return x\n\nprint(f(1))\n");
  });

  test("strips at most the fence indentation (lines indented less keep what they have)", () => {
    const markdown = ["- butir", "   ```cpp", "  int a;", "      int b;", "   ```"].join("\n");
    expect(extractBlocks(markdown)[0]?.code).toBe("int a;\n   int b;\n");
  });

  test("an unindented fence is unchanged", () => {
    const markdown = "```python\n    x = 1\n```\n";
    expect(extractBlocks(markdown)[0]?.code).toBe("    x = 1\n");
  });
});

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

describe("extractBlocks (arduino, python, setengah-jadi)", () => {
  test("recognises cpp, arduino and python blocks with their language", () => {
    const markdown = [
      "```arduino",
      "void setup() {}",
      "```",
      "```Python",
      "print(1)",
      "```",
      "```py",
      "x = 1",
      "```",
      "```tsx",
      "let a = 1;",
      "```",
    ].join("\n");
    expect(extractBlocks(markdown)).toEqual([
      { language: "arduino", startLine: 2, code: "void setup() {}\n", incomplete: false },
      { language: "python", startLine: 5, code: "print(1)\n", incomplete: false },
    ]);
  });

  test("the setengah-jadi marker in the info string flags a block as incomplete, for every language", () => {
    const markdown = [
      "```cpp setengah-jadi",
      "int x = ____;",
      "```",
      "```arduino setengah-jadi",
      "void setup() { ____ }",
      "```",
      "```python setengah-jadi",
      "def f(:",
      "```",
      "```python",
      "pass",
      "```",
    ].join("\n");
    expect(extractBlocks(markdown).map((block) => [block.language, block.incomplete])).toEqual([
      ["cpp", true],
      ["arduino", true],
      ["python", true],
      ["python", false],
    ]);
  });

  test("the marker only counts after the language and extractCppBlocks drops incomplete blocks", () => {
    expect(extractBlocks("```text setengah-jadi\nx\n```")).toEqual([]);
    expect(
      extractCppBlocks("```cpp setengah-jadi\nint x = ____;\n```\n```cpp\nint y;\n```"),
    ).toEqual([{ startLine: 5, code: "int y;\n" }]);
  });
});

describe("extractBlocks (ts and js, with aliases)", () => {
  test("ts/typescript and js/javascript map to ts and js, case-insensitively; tsx and jsx are ignored", () => {
    const markdown = [
      "```ts",
      "let a: number = 1;",
      "```",
      "```TypeScript",
      "let b = 2;",
      "```",
      "```js",
      "var c = 3;",
      "```",
      "```JavaScript setengah-jadi",
      "var d = ____;",
      "```",
      "```tsx",
      "x",
      "```",
      "```jsx",
      "y",
      "```",
    ].join("\n");
    expect(extractBlocks(markdown).map((b) => [b.language, b.startLine, b.incomplete])).toEqual([
      ["ts", 2, false],
      ["ts", 5, false],
      ["js", 8, false],
      ["js", 11, true],
    ]);
  });

  test("an indented ts block is dedented", () => {
    const markdown =
      "1. Langkah:\n\n   ```ts\n   function f(x: number) {\n     return x;\n   }\n   ```\n";
    expect(extractBlocks(markdown)[0]?.code).toBe("function f(x: number) {\n  return x;\n}\n");
  });
});

describe("tsSyntaxCheck and jsSyntaxCheck (real Bun.Transpiler, syntax only)", () => {
  test("accept valid TypeScript: types, generics, import/export, enum, top-level await", async () => {
    const code = [
      'import { baca } from "./baca";',
      "interface Titik { x: number; y: number }",
      "type Pasangan<T> = [T, T] | null;",
      "enum Warna { Merah, Biru }",
      "export function salin<T extends object>(a: T): T { return { ...a }; }",
      "class Kotak { constructor(private sisi: number) {} luas(): number { return this.sisi ** 2; } }",
      "export const data = await baca();",
      "",
    ].join("\n");
    expect(await tsSyntaxCheck(code)).toEqual({ ok: true, diagnostics: "" });
  });

  test("a type error is not a syntax error (syntax check only)", async () => {
    expect(await tsSyntaxCheck("let x: string = 5;\nnamaTakAda();\n")).toEqual({
      ok: true,
      diagnostics: "",
    });
  });

  test("reject broken TypeScript with the line and column inside the block", async () => {
    const bad = await tsSyntaxCheck("const a = 1;\nconst b: number = ;\n");
    expect(bad.ok).toBe(false);
    expect(bad.diagnostics).toContain("line 2");
    const open = await tsSyntaxCheck("function f() {\n");
    expect(open.ok).toBe(false);
    const dup = await tsSyntaxCheck("const a = 1;\nconst a = 2;\n");
    expect(dup.ok).toBe(false);
    expect(dup.diagnostics).toContain("already been declared");
  });

  test("accept valid JavaScript and reject broken JavaScript", async () => {
    expect(await jsSyntaxCheck("const f = (a, b) => a + b;\nconsole.log(f(1, 2));\n")).toEqual({
      ok: true,
      diagnostics: "",
    });
    const bad = await jsSyntaxCheck("for (const x of ) {}\n");
    expect(bad.ok).toBe(false);
    expect(bad.diagnostics).toContain("line 1");
    // Type annotations are not JavaScript.
    expect((await jsSyntaxCheck("let x: number = 1;\n")).ok).toBe(false);
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
      blocksChecked: { cpp: 0, arduino: 0, python: 0, ts: 0, js: 0 },
      blocksSkipped: { cpp: 0, arduino: 0, python: 0, ts: 0, js: 0 },
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
    expect(result.blocksChecked.cpp).toBe(2);
    expect(result.failures).toHaveLength(1);
    expect(result.failures[0]).toContain(
      "content/osn/modules/a.md: cpp block 2 (starting at line 6) does not compile",
    );
    expect(result.failures[0]).toContain("kesalahan palsu");
  });

  test("routes each language to its own checker, skips setengah-jadi blocks and counts them", async () => {
    await write(
      "content/osn/modules/a.md",
      [
        "```cpp",
        "int a;",
        "```",
        "```arduino",
        "void setup() {}",
        "```",
        "```python",
        "SALAH(",
        "```",
        "```python setengah-jadi",
        "def f(:",
        "```",
        "```cpp setengah-jadi",
        "int ____;",
        "```",
        "```ts",
        "let t: number = 1;",
        "```",
        "```javascript",
        "var j = 1;",
        "```",
        "```ts setengah-jadi",
        "let u: ____ = 1;",
        "```",
      ].join("\n"),
    );
    const seen: string[] = [];
    const checkers: Checkers = {
      cpp: async () => {
        seen.push("cpp");
        return { ok: true, diagnostics: "" };
      },
      arduino: async () => {
        seen.push("arduino");
        return { ok: true, diagnostics: "" };
      },
      python: async (code) => {
        seen.push("python");
        return code.includes("SALAH")
          ? { ok: false, diagnostics: "SyntaxError palsu" }
          : { ok: true, diagnostics: "" };
      },
      ts: async () => {
        seen.push("ts");
        return { ok: true, diagnostics: "" };
      },
      js: async () => {
        seen.push("js");
        return { ok: true, diagnostics: "" };
      },
    };
    const result = await checkModuleCode(root, checkers);
    expect(seen).toEqual(["cpp", "arduino", "python", "ts", "js"]);
    expect(result.blocksChecked).toEqual({ cpp: 1, arduino: 1, python: 1, ts: 1, js: 1 });
    expect(result.blocksSkipped).toEqual({ cpp: 1, arduino: 0, python: 1, ts: 1, js: 0 });
    expect(result.failures).toHaveLength(1);
    expect(result.failures[0]).toContain("python block 1 (starting at line 8) has a syntax error");
    expect(result.failures[0]).toContain("SyntaxError palsu");
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
    expect(lines.join("\n")).toContain("FAILED -- 1 block(s) failed");
  });

  test("exits 0 when everything compiles", async () => {
    const ok: Compiler = async () => ({ ok: true, diagnostics: "" });
    expect(await run(root, ok, out)).toBe(0);
    expect(lines.join("\n")).toContain(
      "OK -- 1 cpp, 0 arduino (mock Arduino.h), 0 python, 0 ts and 0 js block(s) in 1 module file(s)",
    );
  });

  test("reports skipped setengah-jadi blocks in the OK line", async () => {
    await writeFile(
      join(root, "content", "osn", "modules", "a.md"),
      "```python setengah-jadi\ndef f(:\n```\n",
    );
    const ok: Compiler = async () => ({ ok: true, diagnostics: "" });
    expect(await run(root, ok, out)).toBe(0);
    expect(lines.join("\n")).toContain("1 block(s) marked setengah-jadi skipped");
  });

  test("exits 1 loudly when the compiler is unavailable", async () => {
    const missing: Compiler = async () => {
      throw new Error("spawn g++ ENOENT");
    };
    expect(await run(root, missing, out)).toBe(1);
    expect(lines.join("\n")).toContain("refuses to pass without them");
  });
});
