/**
 * Integration tests for `scripts/check-module-code.ts` (issue #54) against
 * the real `g++ -std=c++17 -fsyntax-only`. They shell out to the compiler,
 * so they live here rather than in tests/unit/ (docs/development/testing.md).
 * Nothing is executed: `-fsyntax-only` only parses and type-checks.
 */

import { afterEach, beforeEach, describe, expect, test } from "bun:test";
import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import {
  arduinoSyntaxCheck,
  checkModuleCode,
  gppSyntaxCheck,
  pythonSyntaxCheck,
  run,
} from "../../scripts/check-module-code";

const VALID = "int main() { return 0; }";
const INVALID = "int main() { return undeclared_name; }";
// Real g++ runs can exceed bun's 5 s default on a busy CI runner.
const GPP_TIMEOUT_MS = 30_000;

describe("gppSyntaxCheck (real g++)", () => {
  test(
    "accepts C++17 code and rejects a syntax error",
    async () => {
      const good = await gppSyntaxCheck(
        "#include <optional>\nint main() { std::optional<int> x; return x.value_or(0); }\n",
      );
      expect(good).toEqual({ ok: true, diagnostics: "" });
      const bad = await gppSyntaxCheck("int main( {\n");
      expect(bad.ok).toBe(false);
      expect(bad.diagnostics.length).toBeGreaterThan(0);
    },
    GPP_TIMEOUT_MS,
  );
});

const SKETCH = `void setup() {
  pinMode(LED_BUILTIN, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  int nilai = analogRead(A0);
  int persen = map(nilai, 0, 1023, 0, 100);
  digitalWrite(LED_BUILTIN, persen > 50 ? HIGH : LOW);
  Serial.println(constrain(persen, 0, 100));
  delay(500);
}
`;

describe("arduinoSyntaxCheck (real g++ and the mock Arduino.h)", () => {
  test(
    "accepts a sketch that uses the mock API with only setup and loop",
    async () => {
      expect(await arduinoSyntaxCheck(SKETCH)).toEqual({ ok: true, diagnostics: "" });
    },
    GPP_TIMEOUT_MS,
  );

  test(
    "rejects a syntax error, an unknown function and a type error, with sketch line numbers",
    async () => {
      const syntax = await arduinoSyntaxCheck("void setup( {\n");
      expect(syntax.ok).toBe(false);
      const unknown = await arduinoSyntaxCheck("void setup() {\n  nyalakanLampu();\n}\n");
      expect(unknown.ok).toBe(false);
      expect(unknown.diagnostics).toContain("nyalakanLampu");
      expect(unknown.diagnostics).toContain("<stdin>:2");
      const type = await arduinoSyntaxCheck('void setup() {\n  pinMode(LED_BUILTIN, "x");\n}\n');
      expect(type.ok).toBe(false);
    },
    GPP_TIMEOUT_MS,
  );
});

describe("pythonSyntaxCheck (real python3)", () => {
  test(
    "accepts valid Python without running it and rejects a syntax error",
    async () => {
      // A program that would exit non-zero if it were executed.
      const good = await pythonSyntaxCheck("import sys\nwhile True:\n    sys.exit(3)\n");
      expect(good).toEqual({ ok: true, diagnostics: "" });
      const bad = await pythonSyntaxCheck("def f(:\n    pass\n");
      expect(bad.ok).toBe(false);
      expect(bad.diagnostics).toContain("SyntaxError");
    },
    GPP_TIMEOUT_MS,
  );
});

describe("indented fenced blocks inside list items (real checkers)", () => {
  let root: string;
  beforeEach(async () => {
    root = await mkdtemp(join(tmpdir(), "osn-check-module-code-indent-"));
    await mkdir(join(root, "content", "osn", "modules"), { recursive: true });
  });
  afterEach(async () => {
    await rm(root, { recursive: true, force: true });
  });

  test(
    "an indented python and cpp block are dedented and pass; a real error in one still fails",
    async () => {
      await writeFile(
        join(root, "content", "osn", "modules", "menjorok.md"),
        [
          "1. Python:",
          "",
          "   ```python",
          "   def f(x):",
          "       return x + 1",
          "   ```",
          "",
          "2. C++:",
          "",
          "   ```cpp",
          "   int main() {",
          "       return 0;",
          "   }",
          "   ```",
          "",
        ].join("\n"),
      );
      const ok = await checkModuleCode(root);
      expect(ok.failures).toEqual([]);
      expect(ok.blocksChecked).toMatchObject({ python: 1, cpp: 1 });

      await writeFile(
        join(root, "content", "osn", "modules", "salah.md"),
        "- butir\n\n  ```python\n  def f(:\n      pass\n  ```\n",
      );
      const bad = await checkModuleCode(root);
      expect(bad.failures).toHaveLength(1);
      expect(bad.failures[0]).toContain("salah.md");
      expect(bad.failures[0]).toContain("SyntaxError");
    },
    GPP_TIMEOUT_MS,
  );
});

describe("checkModuleCode and run (real g++)", () => {
  let root: string;
  const lines: string[] = [];
  const out = { log: (t: string) => lines.push(t), error: (t: string) => lines.push(t) };
  const write = (path: string, text: string) => writeFile(join(root, path), text);

  beforeEach(async () => {
    lines.length = 0;
    root = await mkdtemp(join(tmpdir(), "osn-check-module-code-int-"));
    await mkdir(join(root, "content", "osn", "modules"), { recursive: true });
  });

  afterEach(async () => {
    await rm(root, { recursive: true, force: true });
  });

  test(
    "a valid block passes and an invalid block fails",
    async () => {
      await write("content/osn/modules/baik.md", `\`\`\`cpp\n${VALID}\n\`\`\`\n`);
      expect((await checkModuleCode(root)).failures).toEqual([]);
      await write("content/osn/modules/buruk.md", `\`\`\`cpp\n${INVALID}\n\`\`\`\n`);
      const result = await checkModuleCode(root);
      expect(result.blocksChecked.cpp).toBe(2);
      expect(result.failures).toHaveLength(1);
      expect(result.failures[0]).toContain("buruk.md");
      expect(result.failures[0]).toContain("undeclared_name");
    },
    GPP_TIMEOUT_MS,
  );

  test(
    "run exits 1 and lists the failing block",
    async () => {
      await write("content/osn/modules/buruk.md", `\`\`\`cpp\n${INVALID}\n\`\`\`\n`);
      expect(await run(root, gppSyntaxCheck, out)).toBe(1);
      expect(lines.join("\n")).toContain("FAILED -- 1 block(s) failed");
    },
    GPP_TIMEOUT_MS,
  );

  test(
    "checks cpp, arduino and python blocks together and skips setengah-jadi blocks",
    async () => {
      await write(
        "content/osn/modules/campur.md",
        [
          "```cpp",
          VALID,
          "```",
          "```arduino",
          SKETCH,
          "```",
          "```python",
          "print(sum(range(3)))",
          "```",
          "```python setengah-jadi",
          "def f(____:",
          "```",
          "```arduino setengah-jadi",
          "void setup() { ____ }",
          "```",
          "```ts",
          "const n: number = 1;",
          "```",
          "```js",
          "const m = 2;",
          "```",
          "```ts setengah-jadi",
          "const k: ____ = 3;",
          "```",
          "```cpp setengah-jadi",
          "int x = ____;",
          "```",
        ].join("\n"),
      );
      const result = await checkModuleCode(root);
      expect(result.failures).toEqual([]);
      expect(result.blocksChecked).toEqual({ cpp: 1, arduino: 1, python: 1, ts: 1, js: 1 });
      expect(result.blocksSkipped).toEqual({ cpp: 1, arduino: 1, python: 1, ts: 1, js: 0 });
      expect(await run(root, undefined, out)).toBe(0);
      expect(lines.join("\n")).toContain(
        "1 cpp, 1 arduino (mock Arduino.h), 1 python, 1 ts and 1 js block(s)",
      );
    },
    GPP_TIMEOUT_MS,
  );

  test("a broken ts block and a broken js block each fail the run, with file and block line", async () => {
    await write(
      "content/osn/modules/buruk.md",
      "teks\n\n```ts\nconst a: number = ;\n```\n```javascript\nfunction f( {\n```\n",
    );
    expect(await run(root, undefined, out)).toBe(1);
    const output = lines.join("\n");
    expect(output).toContain("FAILED -- 2 block(s) failed");
    expect(output).toContain("buruk.md: ts block 1 (starting at line 4) has a syntax error");
    expect(output).toContain("buruk.md: js block 1 (starting at line 7) has a syntax error");
  });

  test(
    "a broken arduino sketch and a broken python block each fail the run",
    async () => {
      await write(
        "content/osn/modules/buruk.md",
        "```arduino\nvoid setup() { tidakAda(); }\n```\n```python\ndef f(:\n```\n",
      );
      expect(await run(root, undefined, out)).toBe(1);
      const output = lines.join("\n");
      expect(output).toContain("FAILED -- 2 block(s) failed");
      expect(output).toContain("arduino block 1");
      expect(output).toContain("python block 1");
    },
    GPP_TIMEOUT_MS,
  );
});
