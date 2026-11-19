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
import { checkModuleCode, gppSyntaxCheck, run } from "../../scripts/check-module-code";

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
      expect(result.blocksChecked).toBe(2);
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
      expect(lines.join("\n")).toContain("FAILED -- 1 block(s) do not compile");
    },
    GPP_TIMEOUT_MS,
  );
});
