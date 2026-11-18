/**
 * Filesystem side of the programme registry (ADR-0006): reads and parses
 * `data/programs.json`, and resolves the `--program <id>` option shared by
 * every corpus-reading command. I/O belongs to the CLI layer; the pure
 * rules live in `src/domain/programs.ts`.
 */

import { access, readFile } from "node:fs/promises";
import { join, resolve } from "node:path";
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
import { EXIT_USAGE_ERROR, EXIT_VALIDATION_FAILURE } from "./command";

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
function moduleCommands(id: string): string {
  const base = `"osn render modul --program ${id} --id <id>"`;
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
  const supported =
    id === SMA_CODING_PROGRAM_ID
      ? `Untuk program ${id} tersedia "osn plan --program ${id} --track <jalur>", "osn render lembar-siswa --program ${id} --week <kode-minggu>", "osn render modul --program ${id} --id <id>", "osn validate --program ${id}" dan "bun run check:fidelity --program ${id}".`
      : `"osn plan" dan "osn render lembar-siswa" hanya tersedia untuk program "${DEFAULT_PROGRAM_ID}" dan "${SMA_CODING_PROGRAM_ID}"; program ${id} didukung oleh ${moduleCommands(id)}, "osn validate --program ${id}" dan "bun run check:fidelity --program ${id}".`;
  ctx.stderr(
    `osn ${commandName}: belum didukung untuk program ${id}: perintah ini membaca corpus OSN ` +
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
  const { rest, value } = extractProgramFlag(args);
  if (value === null) {
    ctx.stderr(`osn ${commandName}: --program requires a programme id argument.\n`);
    return { ok: false, exitCode: EXIT_USAGE_ERROR };
  }

  const loaded = await loadProgramRegistry();
  if (!loaded.ok) {
    ctx.stderr(`osn ${commandName}: ${loaded.message}\n`);
    return {
      ok: false,
      exitCode: loaded.kind === "invalid" ? EXIT_VALIDATION_FAILURE : EXIT_USAGE_ERROR,
    };
  }

  const id = value ?? DEFAULT_PROGRAM_ID;
  const program = findProgram(loaded.registry, id);
  if (program === undefined) {
    ctx.stderr(
      `osn ${commandName}: unknown programme "${id}". Registered programmes: ${listProgramIds(loaded.registry)}.\n`,
    );
    return { ok: false, exitCode: EXIT_USAGE_ERROR };
  }

  return { ok: true, program, args: rest, explicit: value };
}
