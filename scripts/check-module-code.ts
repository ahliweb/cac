/**
 * Code-example check for the learning modules (ADR-0007, issue #54):
 * extracts every fenced ```cpp block from `content/**\/modules/*.md` and
 * runs `g++ -std=c++17 -fsyntax-only` on it. Nothing is ever executed or
 * linked -- this repository is not a judge (ADR-0004); a syntax/semantic
 * compile check is all that is promised, so a passing check means "the
 * example compiles", not "the example is correct for every input".
 *
 * Run standalone:
 *
 *   bun run scripts/check-module-code.ts
 *
 * Exits 0 when every block compiles (or there are no modules); exits 1
 * listing every failing block (file, block number, first line, compiler
 * output), and also exits 1 -- loudly -- when `g++` itself is unavailable,
 * since a silent skip would make the check meaningless.
 */

import { join } from "node:path";

const REPO_ROOT = join(import.meta.dir, "..");

/** One fenced C++ block: the 1-based line its content starts on and its source. */
export interface CppBlock {
  readonly startLine: number;
  readonly code: string;
}

/** The outcome of compiling one block: empty `diagnostics` means it compiled. */
export interface CompileResult {
  readonly ok: boolean;
  readonly diagnostics: string;
}

/** Compiles `code` as C++17 (syntax only). Throws when the compiler cannot be started. */
export type Compiler = (code: string) => Promise<CompileResult>;

/** Extracts every ```cpp fenced block of `markdown`; other fenced blocks are skipped. */
export function extractCppBlocks(markdown: string): CppBlock[] {
  const blocks: CppBlock[] = [];
  const lines = markdown.split("\n");
  let open: { language: string; startLine: number; body: string[] } | undefined;

  lines.forEach((line, index) => {
    const fence = /^\s*```(\S*)\s*$/.exec(line);
    if (open === undefined) {
      if (fence !== null) {
        open = { language: (fence[1] ?? "").toLowerCase(), startLine: index + 2, body: [] };
      }
      return;
    }
    if (fence !== null && fence[1] === "") {
      if (open.language === "cpp") {
        blocks.push({ startLine: open.startLine, code: `${open.body.join("\n")}\n` });
      }
      open = undefined;
      return;
    }
    open.body.push(line);
  });

  return blocks;
}

/** The real compiler: `g++ -std=c++17 -fsyntax-only` reading the source from stdin. */
export const gppSyntaxCheck: Compiler = async (code) => {
  const proc = Bun.spawn(["g++", "-std=c++17", "-fsyntax-only", "-x", "c++", "-"], {
    stdin: new Blob([code]),
    stdout: "pipe",
    stderr: "pipe",
  });
  const [stderr, exitCode] = await Promise.all([new Response(proc.stderr).text(), proc.exited]);
  return { ok: exitCode === 0, diagnostics: stderr.trim() };
};

/** The result of checking a repository tree. */
export interface CheckResult {
  readonly filesChecked: number;
  readonly blocksChecked: number;
  readonly failures: readonly string[];
}

/** Finds every `content/**\/modules/*.md` under `repoRoot` (sorted) and compiles each cpp block. */
export async function checkModuleCode(
  repoRoot: string,
  compile: Compiler = gppSyntaxCheck,
): Promise<CheckResult> {
  const glob = new Bun.Glob("content/**/modules/*.md");
  const files = (await Array.fromAsync(glob.scan({ cwd: repoRoot }))).sort();
  let blocksChecked = 0;
  const failures: string[] = [];

  for (const file of files) {
    const markdown = await Bun.file(join(repoRoot, file)).text();
    const blocks = extractCppBlocks(markdown);
    for (const [index, block] of blocks.entries()) {
      blocksChecked += 1;
      const result = await compile(block.code);
      if (!result.ok) {
        failures.push(
          `${file}: block ${index + 1} (starting at line ${block.startLine}) does not compile:\n${result.diagnostics}`,
        );
      }
    }
  }

  return { filesChecked: files.length, blocksChecked, failures };
}

/** Where {@link run} writes: injected so tests can capture it. */
export interface Output {
  readonly log: (text: string) => void;
  readonly error: (text: string) => void;
}

/** Runs the check and returns the process exit code (0 clean, 1 on any failure or a missing compiler). */
export async function run(
  repoRoot: string,
  compile: Compiler = gppSyntaxCheck,
  out: Output = console,
): Promise<number> {
  let result: CheckResult;
  try {
    result = await checkModuleCode(repoRoot, compile);
  } catch (cause) {
    out.error(
      `check-module-code: could not run g++ (${(cause as Error).message}). Install g++ with C++17 support; the check refuses to pass without a compiler.`,
    );
    return 1;
  }
  if (result.failures.length > 0) {
    out.error(`check-module-code: FAILED -- ${result.failures.length} block(s) do not compile:`);
    for (const failure of result.failures) {
      out.error(`\n${failure}`);
    }
    return 1;
  }
  out.log(
    `check-module-code: OK -- ${result.blocksChecked} cpp block(s) in ${result.filesChecked} module file(s) compile with g++ -std=c++17 -fsyntax-only.`,
  );
  return 0;
}

if (import.meta.main) {
  process.exit(await run(REPO_ROOT));
}
