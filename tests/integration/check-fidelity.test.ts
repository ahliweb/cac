/**
 * `bun run check:fidelity [--program <id>]` (ADR-0008, issue #140), run
 * in-process through `runFidelityCheck` and once as a subprocess for the
 * script's own entry point. The failing case runs against a temporary copy
 * of the sma-coding document, data and registry with one cell changed.
 */

import { describe, expect, test } from "bun:test";
import { cp, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { runFidelityCheck } from "../../src/cli/fidelity-runner";

const repoRoot = join(import.meta.dir, "..", "..");

async function run(args: string[], root?: string) {
  const out: string[] = [];
  const err: string[] = [];
  const code = await runFidelityCheck(
    args,
    { stdout: (text) => out.push(text), stderr: (text) => err.push(text) },
    root,
    root === undefined ? undefined : join(root, "data"),
  );
  return { code, out: out.join(""), err: err.join("") };
}

describe("check:fidelity", () => {
  test("without --program runs every programme that has a fidelity module", async () => {
    const result = await run([]);
    expect(result.code).toBe(0);
    expect(result.out).toContain("check-sma-coding-fidelity: OK");
    expect(result.err).toBe("");
  });

  test("--program sma-coding runs just that programme", async () => {
    const result = await run(["--program", "sma-coding"]);
    expect(result.code).toBe(0);
    expect(result.out).toContain("OK");
  });

  test("a programme without a fidelity module is a usage error naming the alternatives", async () => {
    const result = await run(["--program", "osn"]);
    expect(result.code).toBe(2);
    expect(result.err).toContain('"osn" has no fidelity module');
    expect(result.err).toContain("sma-coding");
    expect(result.out).toBe("");
  });

  test("an unregistered programme is a usage error", async () => {
    const result = await run(["--program", "ghost-coding"]);
    expect(result.code).toBe(2);
    expect(result.err).toContain("not registered");
  });

  test("--program without a value and stray arguments are usage errors", async () => {
    expect((await run(["--program"])).code).toBe(2);
    const stray = await run(["extra"]);
    expect(stray.code).toBe(2);
    expect(stray.err).toContain('unexpected argument "extra"');
  });

  test("an unreadable registry is a usage error", async () => {
    const dir = await mkdtemp(join(tmpdir(), "osn-fid-empty-"));
    try {
      const result = await run([], dir);
      expect(result.code).toBe(2);
      expect(result.err).toContain("programme registry");
    } finally {
      await rm(dir, { recursive: true, force: true });
    }
  });

  test("drift in the data exits 1 and lists the mismatch", async () => {
    const dir = await mkdtemp(join(tmpdir(), "osn-fid-drift-"));
    try {
      // Every programme's data and source document, so each fidelity module can run.
      await cp(join(repoRoot, "data"), join(dir, "data"), { recursive: true });
      await cp(join(repoRoot, "docs", "programs"), join(dir, "docs", "programs"), {
        recursive: true,
      });
      const weeksPath = join(dir, "data", "sma-coding", "weeks.json");
      const weeks = (await readFile(weeksPath, "utf-8")).replace(/"topic": "/, '"topic": "UBAH ');
      await writeFile(weeksPath, weeks);
      const result = await run([], dir);
      expect(result.code).toBe(1);
      expect(result.out).toContain("FAILED");
      expect(result.out).toContain("UBAH ");
    } finally {
      await rm(dir, { recursive: true, force: true });
    }
  });

  test("the script entry point exits 0 and 2", async () => {
    const ok = Bun.spawnSync(["bun", "run", "scripts/check-fidelity.ts"], { cwd: repoRoot });
    expect(ok.exitCode).toBe(0);
    expect(ok.stdout.toString()).toContain("OK");
    const bad = Bun.spawnSync(["bun", "run", "scripts/check-fidelity.ts", "--program", "osn"], {
      cwd: repoRoot,
    });
    expect(bad.exitCode).toBe(2);
    const legacy = Bun.spawnSync(["bun", "run", "scripts/check-sma-coding-fidelity.ts"], {
      cwd: repoRoot,
    });
    expect(legacy.exitCode).toBe(0);
    expect(legacy.stdout.toString()).toContain("OK");
  });
});
