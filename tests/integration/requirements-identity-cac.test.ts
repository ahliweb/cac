/**
 * IDENTITY-CAC coverage of `check:requirements` (issue #255): the real
 * documents pass, and every kind of inconsistency between
 * `identity-cac.md`, `register.md` and `traceability.md` is reported.
 * Fixtures are the real documents with one deliberate defect each.
 */

import { describe, expect, test } from "bun:test";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import {
  checkIdentityCac,
  formatProblems,
  parseIdentityCac,
  parseRegister,
  REQUIREMENT_ID_PATTERN,
  runChecks,
} from "../../scripts/check-requirements";

const repoRoot = join(import.meta.dir, "..", "..");
const read = (name: string): string =>
  readFileSync(join(repoRoot, "docs", "requirements", name), "utf-8");
const registerText = read("register.md");
const traceabilityText = read("traceability.md");
const identityText = read("identity-cac.md");
const fileExists = (relativePath: string): boolean => existsSync(join(repoRoot, relativePath));

const run = (register = registerText, traceability = traceabilityText, identity = identityText) =>
  runChecks(register, traceability, fileExists, identity).problems;

/** Removes every line that starts with `prefix`. */
function dropLines(text: string, prefix: string): string {
  return text
    .split("\n")
    .filter((line) => !line.startsWith(prefix))
    .join("\n");
}

/** Inserts `extra` as a new table row directly after the row starting with `prefix`. */
function addRowAfter(text: string, prefix: string, extra: string): string {
  return text
    .split("\n")
    .flatMap((line) => (line.startsWith(prefix) ? [line, extra] : [line]))
    .join("\n");
}

describe("IDENTITY-CAC in the real documents", () => {
  test("identity-cac.md defines IDENTITY-CAC-001..010 and the full check passes", () => {
    const rows = parseIdentityCac(identityText);
    expect(rows.map((row) => row.id)).toEqual(
      Array.from({ length: 10 }, (_, i) => `IDENTITY-CAC-${String(i + 1).padStart(3, "0")}`),
    );
    expect(run()).toEqual([]);
    expect(formatProblems(run())).toContain("OK");
  });

  test("every IDENTITY-CAC ID is registered, matches the ID scheme and is planned or better", () => {
    const rows = parseRegister(registerText).filter((row) => row.id.startsWith("IDENTITY-CAC-"));
    expect(rows).toHaveLength(10);
    for (const row of rows) {
      expect(row.id).toMatch(REQUIREMENT_ID_PATTERN);
      expect(row.invalidIssueTokens).toEqual([]);
    }
  });

  test("the ID pattern still rejects malformed identity IDs", () => {
    for (const bad of [
      "IDENTITY-CAC-01",
      "IDENTITY-CAC-0001",
      "IDENTITY-001",
      "identity-cac-001",
    ]) {
      expect(REQUIREMENT_ID_PATTERN.test(bad)).toBe(false);
    }
  });
});

describe("IDENTITY-CAC inconsistencies are reported", () => {
  test("an ID missing from traceability.md fails", () => {
    const broken = traceabilityText.replaceAll(", IDENTITY-CAC-008", "");
    // 008 only appears in the #255 row, so it is now absent from both matrices.
    const problems = run(registerText, broken);
    expect(
      problems.some((p) => p.includes("IDENTITY-CAC-008") && p.includes("absent from both")),
    ).toBe(true);
  });

  test("an ID missing from the register fails (in the register and against identity-cac.md)", () => {
    const broken = dropLines(registerText, "| IDENTITY-CAC-004 ");
    const problems = run(broken);
    expect(
      problems.some((p) => p.includes("IDENTITY-CAC-004") && p.includes("absent from register.md")),
    ).toBe(true);
    expect(problems.some((p) => p.includes("IDENTITY-CAC-004 is defined in identity-cac.md"))).toBe(
      true,
    );
  });

  test("a duplicate ID in the register fails", () => {
    const line = registerText.split("\n").find((l) => l.startsWith("| IDENTITY-CAC-002 "));
    expect(line).toBeDefined();
    const problems = run(addRowAfter(registerText, "| IDENTITY-CAC-002 ", line ?? ""));
    expect(problems.some((p) => p.includes('"IDENTITY-CAC-002" appears 2 times'))).toBe(true);
  });

  test("a duplicate ID in identity-cac.md fails", () => {
    const line = identityText.split("\n").find((l) => l.startsWith("| IDENTITY-CAC-003 "));
    const problems = run(
      registerText,
      traceabilityText,
      addRowAfter(identityText, "| IDENTITY-CAC-003 ", line ?? ""),
    );
    expect(
      problems.some((p) => p.includes('identity-cac.md: ID "IDENTITY-CAC-003" appears 2')),
    ).toBe(true);
  });

  test("a gap in identity-cac.md numbering fails", () => {
    const problems = run(
      registerText,
      traceabilityText,
      dropLines(identityText, "| IDENTITY-CAC-005 "),
    );
    expect(problems.some((p) => p.includes("not contiguous"))).toBe(true);
    expect(
      problems.some((p) => p.includes("IDENTITY-CAC-005 is absent from identity-cac.md")),
    ).toBe(true);
  });

  test("an unknown ID referenced in traceability.md fails", () => {
    const broken = traceabilityText.replace(
      "IDENTITY-CAC-009 |",
      "IDENTITY-CAC-009, IDENTITY-CAC-099 |",
    );
    const problems = run(registerText, broken);
    expect(
      problems.some((p) => p.includes("IDENTITY-CAC-099") && p.includes("absent from register.md")),
    ).toBe(true);
  });

  test("an unknown ID in the register that identity-cac.md does not define fails", () => {
    const line = registerText.split("\n").find((l) => l.startsWith("| IDENTITY-CAC-010 "));
    const extra = (line ?? "").replace("IDENTITY-CAC-010", "IDENTITY-CAC-011");
    const problems = run(addRowAfter(registerText, "| IDENTITY-CAC-010 ", extra));
    expect(
      problems.some((p) => p.includes("IDENTITY-CAC-011 is absent from identity-cac.md")),
    ).toBe(true);
  });

  test("a register statement that drifts from identity-cac.md fails", () => {
    const broken = registerText.replace(
      "Platform SHALL beridentitas",
      "Platform SHOULD beridentitas",
    );
    const problems = run(broken);
    expect(problems.some((p) => p.includes("IDENTITY-CAC-001 statement differs"))).toBe(true);
  });

  test("a malformed identity ID fails the pattern check", () => {
    const problems = run(
      registerText,
      traceabilityText,
      addRowAfter(identityText, "| IDENTITY-CAC-010 ", "| IDENTITY-CAC-11 | x | y | z |"),
    );
    expect(problems.some((p) => p.includes('"IDENTITY-CAC-11" does not match'))).toBe(true);
  });

  test("a missing or unparsable identity-cac.md table fails", () => {
    expect(checkIdentityCac([], parseRegister(registerText))[0]).toContain("no requirement rows");
    expect(run(registerText, traceabilityText, "# empty\n")[0]).toContain("no requirement rows");
  });

  test("without identity text the identity rule is skipped (library use)", () => {
    expect(runChecks(registerText, traceabilityText, fileExists).problems).toEqual([]);
  });
});
