/**
 * Tests for `src/cli/program-loader.ts`: registry loading, the
 * `--program` flag extraction, and unknown-programme handling shared by
 * every corpus-reading command. Also pins that `osn privacy-check`'s
 * recursive scan covers `data/programs.json` and each programme's
 * subfolders (GR-04, ADR-0006).
 */

import { describe, expect, test } from "bun:test";
import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import type { CommandContext } from "../../src/cli/command";
import { checklistCommand } from "../../src/cli/commands/checklist";
import { planCommand } from "../../src/cli/commands/plan";
import { renderCommand } from "../../src/cli/commands/render";
import { reportCommand } from "../../src/cli/commands/report";
import { loadPrivacyScanEntries } from "../../src/cli/privacy-scan-loader";
import {
  DATA_ROOT,
  extractProgramFlag,
  loadProgramRegistry,
  repoPathExists,
  resolveProgramOption,
} from "../../src/cli/program-loader";

function makeContext(): { ctx: CommandContext; stdout: string[]; stderr: string[] } {
  const stdout: string[] = [];
  const stderr: string[] = [];
  const ctx: CommandContext = {
    json: false,
    cwd: process.cwd(),
    stdout: (text) => stdout.push(text),
    stderr: (text) => stderr.push(text),
  };
  return { ctx, stdout, stderr };
}

describe("extractProgramFlag", () => {
  test("returns args untouched and value undefined when the flag is absent", () => {
    expect(extractProgramFlag(["--start", "x"])).toEqual({
      rest: ["--start", "x"],
      value: undefined,
    });
  });

  test("removes the flag and its value from anywhere in args", () => {
    expect(extractProgramFlag(["weekly", "--program", "osn", "--week", "1"])).toEqual({
      rest: ["weekly", "--week", "1"],
      value: "osn",
    });
  });

  test("a trailing flag or one followed by another flag has no usable value (null)", () => {
    expect(extractProgramFlag(["--program"]).value).toBeNull();
    expect(extractProgramFlag(["--program", "--json"])).toEqual({
      rest: ["--json"],
      value: null,
    });
  });
});

describe("loadProgramRegistry", () => {
  test("loads the committed registry", async () => {
    const loaded = await loadProgramRegistry();
    expect(loaded.ok).toBe(true);
    if (loaded.ok) {
      expect(loaded.registry.programs.map((program) => program.id)).toContain("osn");
    }
  });

  test("a directory without programs.json is unreadable", async () => {
    const dir = await mkdtemp(join(tmpdir(), "osn-registry-missing-"));
    try {
      const loaded = await loadProgramRegistry(dir);
      expect(loaded.ok).toBe(false);
      if (!loaded.ok) {
        expect(loaded.kind).toBe("unreadable");
        expect(loaded.message).toContain("failed to read programme registry");
      }
    } finally {
      await rm(dir, { recursive: true, force: true });
    }
  });

  test("a schema-invalid or non-JSON registry is invalid", async () => {
    const dir = await mkdtemp(join(tmpdir(), "osn-registry-invalid-"));
    try {
      await writeFile(join(dir, "programs.json"), JSON.stringify({ programs: [] }));
      const schemaInvalid = await loadProgramRegistry(dir);
      expect(schemaInvalid.ok).toBe(false);
      if (!schemaInvalid.ok) {
        expect(schemaInvalid.kind).toBe("invalid");
      }

      await writeFile(join(dir, "programs.json"), "{ not json");
      const notJson = await loadProgramRegistry(dir);
      expect(notJson.ok).toBe(false);
      if (!notJson.ok) {
        expect(notJson.kind).toBe("invalid");
      }
    } finally {
      await rm(dir, { recursive: true, force: true });
    }
  });
});

describe("repoPathExists", () => {
  test("is true for the registered source document and false for a missing path", async () => {
    const loaded = await loadProgramRegistry();
    if (!loaded.ok) {
      throw new Error("registry must load");
    }
    const osn = loaded.registry.programs[0];
    expect(await repoPathExists(osn?.sourceDocument ?? "")).toBe(true);
    expect(await repoPathExists("docs/tidak-ada.pdf")).toBe(false);
  });
});

describe("resolveProgramOption", () => {
  test("defaults to osn and passes args through", async () => {
    const { ctx } = makeContext();
    const result = await resolveProgramOption("plan", ["--start", "2026-01-05"], ctx);
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.program.id).toBe("osn");
      expect(result.explicit).toBeUndefined();
      expect(result.args).toEqual(["--start", "2026-01-05"]);
    }
  });

  test("honours an explicit registered programme and strips the flag", async () => {
    const { ctx } = makeContext();
    const result = await resolveProgramOption("plan", ["--program", "osn", "--json"], ctx);
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.explicit).toBe("osn");
      expect(result.args).toEqual(["--json"]);
    }
  });

  test("an unknown programme is exit 2 with a clear message", async () => {
    const { ctx, stderr } = makeContext();
    const result = await resolveProgramOption("plan", ["--program", "tidak-ada"], ctx);
    expect(result).toEqual({ ok: false, exitCode: 2 });
    expect(stderr.join("")).toContain('osn plan: unknown programme "tidak-ada"');
    expect(stderr.join("")).toContain("Registered programmes: osn");
  });

  test("a missing value is exit 2", async () => {
    const { ctx, stderr } = makeContext();
    const result = await resolveProgramOption("report", ["--program"], ctx);
    expect(result).toEqual({ ok: false, exitCode: 2 });
    expect(stderr.join("")).toContain("--program requires a programme id argument");
  });
});

describe("every corpus-reading command rejects an unknown --program with exit 2", () => {
  const commands = [
    ["plan", planCommand, ["--start", "2026-01-05"]],
    ["render", renderCommand, ["sop"]],
    ["report", reportCommand, ["--records", "x.jsonl"]],
    ["checklist", checklistCommand, []],
  ] as const;

  test.each(commands)("osn %s", async (_name, command, base) => {
    const { ctx, stderr } = makeContext();
    const code = await command.run([...base, "--program", "tidak-ada"], ctx);
    expect(code).toBe(2);
    expect(stderr.join("")).toContain('unknown programme "tidak-ada"');
  });

  test.each(commands)(
    "osn %s: --program osn is not rejected by the flag",
    async (_name, command, base) => {
      const { ctx, stderr } = makeContext();
      await command.run([...base, "--program", "osn"], ctx);
      expect(stderr.join("")).not.toContain("unknown programme");
      expect(stderr.join("")).not.toContain("--program requires");
    },
  );
});

describe("privacy scan reach", () => {
  test("covers data/programs.json, data/osn/*.json and data/osn/samples/*.jsonl", async () => {
    const loaded = await loadPrivacyScanEntries(DATA_ROOT);
    const files = loaded.entries.map((entry) => entry.file);
    expect(files).toContain("programs.json");
    expect(files).toContain("osn/weeks.json");
    expect(
      files.some((file) => file.startsWith("osn/samples/learning-records.sample.jsonl:")),
    ).toBe(true);
    expect(loaded.parseIssues).toEqual([]);
  });
});
