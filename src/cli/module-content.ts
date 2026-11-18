/**
 * Filesystem side of the learning modules (ADR-0007, issue #54): checks that
 * each indexed module's Markdown body exists and is non-empty (used by
 * `osn validate`), and loads one module with its body and resolved
 * references (used by `osn render modul`). The pure rules live in
 * `src/domain/modules.ts`; the renderer in `src/render/module.ts`.
 */

import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import type { CorpusFinding, CorpusSource } from "../domain/corpus-audit";
import { parseModulesIndex } from "../domain/modules";
import type { ResolvedModuleReference } from "../render/module";
import { MODULES_FILE_NAME, type Module } from "../schema/module";
import { referencesFileSchema } from "../schema/reference";
import { loadCorpusFromDirectory } from "./corpus-loader";
import { REPO_ROOT } from "./program-loader";

async function readBody(contentPath: string, repoRoot: string): Promise<string | undefined> {
  try {
    return await readFile(resolve(repoRoot, contentPath), "utf-8");
  } catch {
    return undefined;
  }
}

/** One finding per module whose body file is missing or blank. Skips an absent or invalid index (reported elsewhere). */
export async function moduleContentFindings(
  source: CorpusSource,
  repoRoot: string = REPO_ROOT,
): Promise<CorpusFinding[]> {
  const { modules } = parseModulesIndex(source);
  const findings: CorpusFinding[] = [];
  if (modules === undefined) {
    return findings;
  }
  for (const [index, module] of modules.modules.entries()) {
    const body = await readBody(module.contentPath, repoRoot);
    const problem =
      body === undefined
        ? `content file "${module.contentPath}" does not exist`
        : body.trim() === ""
          ? `content file "${module.contentPath}" is empty`
          : undefined;
    if (problem !== undefined) {
      findings.push({
        file: MODULES_FILE_NAME,
        path: `modules[${index}].contentPath`,
        message: problem,
        severity: "error",
      });
    }
  }
  return findings;
}

export type ModuleLoadResult =
  | {
      readonly ok: true;
      readonly module: Module;
      readonly body: string;
      readonly references: readonly ResolvedModuleReference[];
    }
  | { readonly ok: false; readonly message: string };

/**
 * Loads module `id` of the programme whose corpus lives in `corpusDir`,
 * with its Markdown body and its references resolved against the
 * programme's `references.json`. Never throws; failures come back as a message.
 */
export async function loadModule(
  corpusDir: string,
  id: string,
  repoRoot: string = REPO_ROOT,
): Promise<ModuleLoadResult> {
  let source: CorpusSource;
  try {
    source = await loadCorpusFromDirectory(corpusDir);
  } catch (cause) {
    return { ok: false, message: (cause as Error).message };
  }
  const { modules, findings } = parseModulesIndex(source);
  if (modules === undefined) {
    return {
      ok: false,
      message:
        findings.length > 0
          ? `${MODULES_FILE_NAME} is invalid (run "osn validate"): ${findings[0]?.message}`
          : `this programme has no ${MODULES_FILE_NAME}`,
    };
  }
  const module = modules.modules.find((candidate) => candidate.id === id);
  if (module === undefined) {
    const known = modules.modules.map((candidate) => candidate.id).join(", ");
    return { ok: false, message: `unknown module "${id}". Known modules: ${known || "(none)"}.` };
  }
  const body = await readBody(module.contentPath, repoRoot);
  if (body === undefined || body.trim() === "") {
    return {
      ok: false,
      message: `content file "${module.contentPath}" is missing or empty (run "osn validate")`,
    };
  }

  const referencesEntry = source.get("references.json");
  const register =
    referencesEntry?.ok === true ? referencesFileSchema.safeParse(referencesEntry.data) : undefined;
  const byId = new Map(
    register?.success ? register.data.references.map((reference) => [reference.id, reference]) : [],
  );
  const references: ResolvedModuleReference[] = [];
  for (const reference of module.references) {
    if ("refId" in reference) {
      const found = byId.get(reference.refId);
      if (found === undefined) {
        return {
          ok: false,
          message: `reference "${reference.refId}" is not in references.json (run "osn validate")`,
        };
      }
      references.push({ label: found.id, title: found.title, url: found.url });
    } else {
      references.push({ label: null, title: reference.title, url: reference.url });
    }
  }
  return { ok: true, module, body, references };
}
