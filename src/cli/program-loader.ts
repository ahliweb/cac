/**
 * Filesystem side of the programme registry (ADR-0006): reads and parses
 * `data/programs.json`, and resolves the `--program <id>` option shared by
 * every corpus-reading command. I/O belongs to the CLI layer; the pure
 * rules live in `src/domain/programs.ts`.
 */

import { access, readFile } from "node:fs/promises";
import { join, resolve } from "node:path";
import type { CrossProgramCodes, CrossProgramId } from "../domain/cross-program-refs";
import {
  DEFAULT_PROGRAM_ID,
  findProgram,
  listProgramIds,
  parseProgramRegistry,
  REGISTRY_FILE_NAME,
} from "../domain/programs";
import type { Program, ProgramRegistry } from "../schema/program";
import { SD_CODING_PROGRAM_ID } from "../schema/sd-common";
import { SMA_CODING_PROGRAM_ID } from "../schema/sma-common";
import { TK_CODING_PROGRAM_ID } from "../schema/tk-common";
import { topicFamiliesSchema } from "../schema/topic-family";
import type { CommandContext } from "./command";
import { cliOf, EXIT_USAGE_ERROR, EXIT_VALIDATION_FAILURE } from "./command";

/** The repository's `data/` directory, resolved from this file so it is independent of the cwd. */
export const DATA_ROOT = resolve(import.meta.dir, "../../data");

/** The repository root, for resolving a registry entry's repository-relative paths. */
export const REPO_ROOT = resolve(import.meta.dir, "../..");

export type RegistryLoadResult =
  | { readonly ok: true; readonly registry: ProgramRegistry }
  | { readonly ok: false; readonly kind: "unreadable" | "invalid"; readonly message: string };

/** Reads and validates `<dataRoot>/programs.json`. Never throws. */
export async function loadProgramRegistry(
  dataRoot: string = DATA_ROOT,
): Promise<RegistryLoadResult> {
  const path = join(dataRoot, REGISTRY_FILE_NAME);
  let text: string;
  try {
    text = await readFile(path, "utf-8");
  } catch (cause) {
    return {
      ok: false,
      kind: "unreadable",
      message: `failed to read programme registry "${path}": ${(cause as Error).message}`,
    };
  }
  try {
    return { ok: true, registry: parseProgramRegistry(JSON.parse(text)) };
  } catch (cause) {
    return { ok: false, kind: "invalid", message: (cause as Error).message };
  }
}

/** `true` when the repository-relative `path` exists. */
export async function repoPathExists(path: string, repoRoot: string = REPO_ROOT): Promise<boolean> {
  try {
    await access(resolve(repoRoot, path));
    return true;
  } catch {
    return false;
  }
}

/** Removes `--program <id>` from `args`; `value` is `undefined` when absent, `null` when it has no usable value. */
export function extractProgramFlag(args: readonly string[]): {
  readonly rest: readonly string[];
  readonly value: string | null | undefined;
} {
  const index = args.indexOf("--program");
  if (index === -1) {
    return { rest: args, value: undefined };
  }
  const value = args[index + 1];
  if (value === undefined || value.startsWith("-")) {
    return { rest: [...args.slice(0, index), ...args.slice(index + 1)], value: null };
  }
  return { rest: [...args.slice(0, index), ...args.slice(index + 2)], value };
}

/**
 * The `id`s in the default programme's (`osn`) `topic-families.json`, for
 * cross-programme references (ADR-0006), or `undefined` when the registry
 * has no such programme or its file is missing or invalid.
 */
export async function loadOsnTopicFamilyIds(
  registry: ProgramRegistry,
  repoRoot: string = REPO_ROOT,
): Promise<ReadonlySet<string> | undefined> {
  const osn = findProgram(registry, DEFAULT_PROGRAM_ID);
  if (osn === undefined) {
    return undefined;
  }
  try {
    const path = join(resolve(repoRoot, osn.corpusDir), "topic-families.json");
    const parsed = topicFamiliesSchema.safeParse(JSON.parse(await readFile(path, "utf-8")));
    return parsed.success
      ? new Set(parsed.data.topicFamilies.map((family) => family.id))
      : undefined;
  } catch {
    return undefined;
  }
}

/** Programmes whose modules come with a learner sheet for the child (`render modul --lembar`). */
const LEARNER_SHEET_PROGRAM_IDS: readonly string[] = [TK_CODING_PROGRAM_ID, SD_CODING_PROGRAM_ID];

/** Whether programme `id` has a learner sheet per module (`tk-coding`, `sd-coding`). */
export function hasLearnerSheets(id: string): boolean {
  return LEARNER_SHEET_PROGRAM_IDS.includes(id);
}

/** The `render modul` wording of the refusal message of programme `id` (it needs the programme's `modules.json`). */
function moduleCommands(id: string, cli: string): string {
  const base = `"${cli} render modul --program ${id} --id <id>"`;
  return hasLearnerSheets(id)
    ? `${base} (tambahkan --lembar untuk lembar anak; perlu data/${id}/modules.json)`
    : `${base} (perlu data/${id}/modules.json)`;
}

/**
 * Corpus-reading commands that only read the OSN corpus through static
 * imports (`render weekly/checkpoint/sop`, `report`, `checklist`; `plan`
 * and `render lembar-siswa` too, for any programme but `sma-coding`, which
 * has its own branches since issue #77; `render modul` reads each programme's
 * own module index and never reaches this function). For any other programme they must
 * refuse rather than silently present OSN data as that programme's (issue
 * #52): returns the exit code (2) after writing the message, or `undefined`
 * when the programme is the OSN one and the command may proceed.
 */
export function rejectNonOsnProgram(
  commandName: string,
  program: Program,
  ctx: CommandContext,
): number | undefined {
  if (program.id === DEFAULT_PROGRAM_ID) {
    return undefined;
  }
  const id = program.id;
  const cli = cliOf(ctx);
  const supported =
    id === SMA_CODING_PROGRAM_ID
      ? `Untuk program ${id} tersedia "${cli} plan --program ${id} --track <jalur>", "${cli} render lembar-siswa --program ${id} --week <kode-minggu>", "${cli} render modul --program ${id} --id <id>", "${cli} validate --program ${id}" dan "bun run check:fidelity --program ${id}".`
      : `"${cli} plan" dan "${cli} render lembar-siswa" hanya tersedia untuk program "${DEFAULT_PROGRAM_ID}" dan "${SMA_CODING_PROGRAM_ID}"; program ${id} didukung oleh ${moduleCommands(id, cli)}, "${cli} validate --program ${id}" dan "bun run check:fidelity --program ${id}".`;
  ctx.stderr(
    `${cli} ${commandName}: belum didukung untuk program ${id}: perintah ini membaca corpus OSN ` +
      `(program "${DEFAULT_PROGRAM_ID}") saja dan tidak akan menyajikannya sebagai data ${id}. ` +
      `${supported}\n`,
  );
  return EXIT_USAGE_ERROR;
}

export type ProgramOptionResult =
  | {
      readonly ok: true;
      /** The registered programme selected (default `osn`). */
      readonly program: Program;
      /** `args` without `--program <id>`. */
      readonly args: readonly string[];
      /** The id the user typed, or `undefined` when `--program` was absent. */
      readonly explicit: string | undefined;
    }
  | { readonly ok: false; readonly exitCode: number };

/**
 * Resolves `--program <id>` (default `osn`) against the registry. A missing
 * value or an unknown programme is a usage error (exit 2) with a message
 * naming the registered ids; an unreadable registry is also exit 2, an
 * invalid one exit 1 (`osn validate` reports it in full).
 */
export async function resolveProgramOption(
  commandName: string,
  args: readonly string[],
  ctx: CommandContext,
): Promise<ProgramOptionResult> {
  const cli = cliOf(ctx);
  const { rest, value } = extractProgramFlag(args);
  if (value === null) {
    ctx.stderr(`${cli} ${commandName}: --program requires a programme id argument.\n`);
    return { ok: false, exitCode: EXIT_USAGE_ERROR };
  }

  const loaded = await loadProgramRegistry();
  if (!loaded.ok) {
    ctx.stderr(`${cli} ${commandName}: ${loaded.message}\n`);
    return {
      ok: false,
      exitCode: loaded.kind === "invalid" ? EXIT_VALIDATION_FAILURE : EXIT_USAGE_ERROR,
    };
  }

  const id = value ?? DEFAULT_PROGRAM_ID;
  const program = findProgram(loaded.registry, id);
  if (program === undefined) {
    ctx.stderr(
      `${cli} ${commandName}: unknown programme "${id}". Registered programmes: ${listProgramIds(loaded.registry)}.\n`,
    );
    return { ok: false, exitCode: EXIT_USAGE_ERROR };
  }

  return { ok: true, program, args: rest, explicit: value };
}

/** Where each programme keeps the codes the cross-programme check looks up (ADR-0010). */
const CROSS_PROGRAM_CODE_SOURCES: Readonly<
  Record<
    CrossProgramId,
    ReadonlyArray<{ readonly file: string; readonly list: string; readonly key: string }>
  >
> = {
  "tk-coding": [{ file: "weeks.json", list: "weeks", key: "id" }],
  "sd-coding": [{ file: "weeks.json", list: "weeks", key: "id" }],
  "smp-coding": [{ file: "weeks.json", list: "weeks", key: "id" }],
  "sma-coding": [
    { file: "foundation.json", list: "weeks", key: "id" },
    { file: "weeks.json", list: "weeks", key: "id" },
  ],
  "kuliah-coding": [{ file: "courses.json", list: "courses", key: "code" }],
  "dewasa-coding": [
    { file: "shared.json", list: "modules", key: "code" },
    { file: "module-plan.json", list: "modules", key: "code" },
  ],
};

/**
 * The week, course and module codes of every registered programme the
 * cross-programme check knows (ADR-0010), read structurally from the
 * programme's own corpus files. A programme that is not registered or whose
 * files cannot be read is left out, and the check skips its codes: that
 * programme's own audit reports the broken corpus.
 */
export async function loadCrossProgramCodes(
  registry: ProgramRegistry,
  repoRoot: string = REPO_ROOT,
): Promise<CrossProgramCodes> {
  const result: Partial<Record<CrossProgramId, Set<string>>> = {};
  for (const [id, sources] of Object.entries(CROSS_PROGRAM_CODE_SOURCES) as Array<
    [CrossProgramId, (typeof CROSS_PROGRAM_CODE_SOURCES)[CrossProgramId]]
  >) {
    const program = findProgram(registry, id);
    if (program === undefined) {
      continue;
    }
    const codes = new Set<string>();
    let complete = true;
    for (const source of sources) {
      try {
        const path = join(resolve(repoRoot, program.corpusDir), source.file);
        const parsed = JSON.parse(await readFile(path, "utf-8")) as Record<string, unknown>;
        const list = parsed[source.list];
        if (!Array.isArray(list)) {
          complete = false;
          continue;
        }
        for (const entry of list) {
          const value = (entry as Record<string, unknown> | null)?.[source.key];
          if (typeof value === "string") {
            codes.add(value);
          }
        }
      } catch {
        complete = false;
      }
    }
    if (complete) {
      result[id] = codes;
    }
  }
  return result;
}
