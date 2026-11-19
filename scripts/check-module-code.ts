/**
 * Code-example check for the learning modules (ADR-0007, issues #54 and
 * #178). It extracts the fenced code blocks of `content/**\/modules/*.md`
 * and checks each one without ever executing it -- this repository is not a
 * judge (ADR-0004), so a passing check means only "the example is
 * well-formed", never "the example is correct for every input":
 *
 *   - ```cpp      `g++ -std=c++17 -fsyntax-only` on the block as written.
 *   - ```arduino  the same compiler with `#include "Arduino.h"` prepended and
 *                 the include path pointed at the MOCK header in
 *                 `scripts/fixtures/arduino-mock/`. This is a syntax and type
 *                 check against a minimal mock of the Arduino API; it is NOT
 *                 evidence of behaviour on a real board (timing, voltage,
 *                 pins, memory). `setup`/`loop` are only declared; no `main`.
 *   - ```python   `python3 -I -c "import ast,sys; ast.parse(sys.stdin.read())"`
 *                 -- syntax only; the code is parsed, never run.
 *
 * Blocks of any other language (```text, ```json, ...) are ignored.
 *
 * Intentionally incomplete blocks (fill-in-the-blank exercises) are excluded
 * with ONE convention, valid for cpp, arduino and python alike: put the word
 * `setengah-jadi` in the info string of the opening fence, e.g.
 *
 *   ```cpp setengah-jadi
 *
 * (the language stays the first word; the marker is the second). An excluded
 * block is not checked but is counted and reported, so the exclusion stays
 * visible. Existing modules keep such exercises in ```text blocks, which are
 * ignored anyway, so the marker is only needed for a block that should keep
 * its language for syntax highlighting.
 *
 * Run standalone:
 *
 *   bun run scripts/check-module-code.ts
 *
 * Exits 0 when every checked block passes (or there are no modules); exits 1
 * listing every failing block (file, language, block number, first line,
 * diagnostics), and also exits 1 -- loudly -- when `g++` or `python3` itself
 * is unavailable, since a silent skip would make the check meaningless.
 */

import { join } from "node:path";

const REPO_ROOT = join(import.meta.dir, "..");

/** Directory holding the mock `Arduino.h` (syntax/type check only, see above). */
export const ARDUINO_MOCK_DIR = join(import.meta.dir, "fixtures", "arduino-mock");

/** The info-string word that excludes a block from checking. */
export const INCOMPLETE_MARKER = "setengah-jadi";

/** The languages this check covers. */
export const LANGUAGES = ["cpp", "arduino", "python"] as const;

export type Language = (typeof LANGUAGES)[number];

/** One fenced block: the 1-based line its content starts on and its source. */
export interface CodeBlock {
  readonly language: Language;
  readonly startLine: number;
  readonly code: string;
  /** True when the opening fence carries {@link INCOMPLETE_MARKER}. */
  readonly incomplete: boolean;
}

/** One fenced C++ block (kept for the original cpp-only API). */
export interface CppBlock {
  readonly startLine: number;
  readonly code: string;
}

/** The outcome of checking one block: empty `diagnostics` means it passed. */
export interface CompileResult {
  readonly ok: boolean;
  readonly diagnostics: string;
}

/** Checks `code`. Throws when the underlying tool cannot be started. */
export type Compiler = (code: string) => Promise<CompileResult>;

/** One checker per language. */
export type Checkers = Readonly<Record<Language, Compiler>>;

const isLanguage = (word: string): word is Language =>
  (LANGUAGES as readonly string[]).includes(word);

/**
 * Extracts every fenced block of `markdown` whose language is cpp, arduino or
 * python (case-insensitive); other fenced blocks are skipped. The opening
 * fence may carry further info-string words (e.g. {@link INCOMPLETE_MARKER});
 * a closing fence is a bare ```. A fence indented inside a list item has its
 * indentation removed from every content line (CommonMark), so the code is
 * checked as the reader sees it.
 */
export function extractBlocks(markdown: string): CodeBlock[] {
  const blocks: CodeBlock[] = [];
  const lines = markdown.split("\n");
  let open: { info: string[]; startLine: number; body: string[]; indent: number } | undefined;

  lines.forEach((line, index) => {
    const fence = /^\s*```(.*)$/.exec(line);
    const info = fence === null ? [] : (fence[1] ?? "").trim().split(/\s+/).filter(Boolean);
    if (open === undefined) {
      if (fence !== null) {
        open = {
          info,
          startLine: index + 2,
          body: [],
          indent: (/^ */.exec(line) as RegExpExecArray)[0].length,
        };
      }
      return;
    }
    if (fence !== null && info.length === 0) {
      const language = (open.info[0] ?? "").toLowerCase();
      if (isLanguage(language)) {
        blocks.push({
          language,
          startLine: open.startLine,
          code: `${open.body.join("\n")}\n`,
          incomplete: open.info.slice(1).includes(INCOMPLETE_MARKER),
        });
      }
      open = undefined;
      return;
    }
    // CommonMark: the opening fence's indentation is removed from each
    // content line (at most that many spaces), so a block indented inside a
    // list item reaches the checker with its own code at column zero.
    const strip = Math.min(open.indent, (/^ */.exec(line) as RegExpExecArray)[0].length);
    open.body.push(line.slice(strip));
  });

  return blocks;
}

/** Extracts every ```cpp fenced block of `markdown` (complete ones only); other fenced blocks are skipped. */
export function extractCppBlocks(markdown: string): CppBlock[] {
  return extractBlocks(markdown)
    .filter((block) => block.language === "cpp" && !block.incomplete)
    .map(({ startLine, code }) => ({ startLine, code }));
}

/** Runs a command with `code` on stdin; the result is ok when it exits 0. Throws if it cannot start. */
async function runWithStdin(command: string[], code: string): Promise<CompileResult> {
  const proc = Bun.spawn(command, {
    stdin: new Blob([code]),
    stdout: "pipe",
    stderr: "pipe",
  });
  const [stderr, exitCode] = await Promise.all([new Response(proc.stderr).text(), proc.exited]);
  return { ok: exitCode === 0, diagnostics: stderr.trim() };
}

/** The real C++ checker: `g++ -std=c++17 -fsyntax-only` reading the source from stdin. */
export const gppSyntaxCheck: Compiler = (code) =>
  runWithStdin(["g++", "-std=c++17", "-fsyntax-only", "-x", "c++", "-"], code);

/**
 * The real Arduino checker: the sketch is prefixed with
 * `#include "Arduino.h"` (the mock header, see the file comment) and
 * compiled with `g++ -std=c++17 -fsyntax-only`. `#line 1` keeps diagnostics
 * numbered from the sketch's own first line. Syntax and types against the mock
 * only -- not proof of behaviour on a board.
 */
export const arduinoSyntaxCheck: Compiler = (code) =>
  runWithStdin(
    ["g++", "-std=c++17", "-fsyntax-only", `-I${ARDUINO_MOCK_DIR}`, "-x", "c++", "-"],
    `#include "Arduino.h"\n#line 1\n${code}`,
  );

/** The real Python checker: parses the block to an AST, never runs it. */
export const pythonSyntaxCheck: Compiler = (code) =>
  runWithStdin(["python3", "-I", "-c", "import ast,sys; ast.parse(sys.stdin.read())"], code);

/** The real checkers, one per language. */
export const defaultCheckers: Checkers = {
  cpp: gppSyntaxCheck,
  arduino: arduinoSyntaxCheck,
  python: pythonSyntaxCheck,
};

/** The result of checking a repository tree. */
export interface CheckResult {
  readonly filesChecked: number;
  /** Checked blocks per language (incomplete blocks are not included). */
  readonly blocksChecked: Readonly<Record<Language, number>>;
  /** Blocks excluded with {@link INCOMPLETE_MARKER}, per language. */
  readonly blocksSkipped: Readonly<Record<Language, number>>;
  readonly failures: readonly string[];
}

const zeroCounts = (): Record<Language, number> => ({ cpp: 0, arduino: 0, python: 0 });

/**
 * Finds every `content/**\/modules/*.md` under `repoRoot` (sorted) and checks
 * each cpp, arduino and python block. `checkers` may be one function applied
 * to every language (convenient for tests) or one checker per language.
 */
export async function checkModuleCode(
  repoRoot: string,
  checkers: Compiler | Checkers = defaultCheckers,
): Promise<CheckResult> {
  const checkerFor = (language: Language): Compiler =>
    typeof checkers === "function" ? checkers : checkers[language];
  const glob = new Bun.Glob("content/**/modules/*.md");
  const files = (await Array.fromAsync(glob.scan({ cwd: repoRoot }))).sort();
  const blocksChecked = zeroCounts();
  const blocksSkipped = zeroCounts();
  const failures: string[] = [];

  for (const file of files) {
    const markdown = await Bun.file(join(repoRoot, file)).text();
    for (const block of extractBlocks(markdown)) {
      if (block.incomplete) {
        blocksSkipped[block.language] += 1;
        continue;
      }
      blocksChecked[block.language] += 1;
      const result = await checkerFor(block.language)(block.code);
      if (!result.ok) {
        const problem = block.language === "python" ? "has a syntax error" : "does not compile";
        failures.push(
          `${file}: ${block.language} block ${blocksChecked[block.language]} (starting at line ${block.startLine}) ${problem}:\n${result.diagnostics}`,
        );
      }
    }
  }

  return { filesChecked: files.length, blocksChecked, blocksSkipped, failures };
}

/** Where {@link run} writes: injected so tests can capture it. */
export interface Output {
  readonly log: (text: string) => void;
  readonly error: (text: string) => void;
}

/** Runs the check and returns the process exit code (0 clean, 1 on any failure or a missing tool). */
export async function run(
  repoRoot: string,
  checkers: Compiler | Checkers = defaultCheckers,
  out: Output = console,
): Promise<number> {
  let result: CheckResult;
  try {
    result = await checkModuleCode(repoRoot, checkers);
  } catch (cause) {
    out.error(
      `check-module-code: could not run a checker (${(cause as Error).message}). Install g++ with C++17 support and python3; the check refuses to pass without them.`,
    );
    return 1;
  }
  if (result.failures.length > 0) {
    out.error(`check-module-code: FAILED -- ${result.failures.length} block(s) failed:`);
    for (const failure of result.failures) {
      out.error(`\n${failure}`);
    }
    return 1;
  }
  const { cpp, arduino, python } = result.blocksChecked;
  const skipped = LANGUAGES.reduce((sum, language) => sum + result.blocksSkipped[language], 0);
  out.log(
    `check-module-code: OK -- ${cpp} cpp, ${arduino} arduino (mock Arduino.h) and ${python} python block(s) in ${result.filesChecked} module file(s) pass (g++ -std=c++17 -fsyntax-only; python3 ast.parse); ${skipped} block(s) marked ${INCOMPLETE_MARKER} skipped.`,
  );
  return 0;
}

if (import.meta.main) {
  process.exit(await run(REPO_ROOT));
}
