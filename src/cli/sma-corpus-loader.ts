/**
 * Loads the `sma-coding` corpus for the commands that derive output from it
 * (`osn plan`, `osn render lembar-siswa`; issue #77). The corpus is audited
 * first with the same `auditSmaCorpus` that `osn validate` runs (plus the
 * module-index checks), so a view is never built from data that fails
 * validation. I/O stays here; the views are pure (`src/domain/sma-plan.ts`).
 */

import { moduleFindings } from "../domain/modules";
import { auditSmaCorpus } from "../domain/sma-corpus-audit";
import { parseSmaModulesIndex } from "../domain/sma-modules";
import type { SmaCorpus } from "../domain/sma-plan";
import { SMA_CODING_PROGRAM_ID } from "../schema/sma-common";
import { cpElementsFileSchema } from "../schema/sma-cp";
import { cpMappingFileSchema } from "../schema/sma-cp-mapping";
import { smaFoundationFileSchema } from "../schema/sma-foundation";
import { osnBridgeFileSchema } from "../schema/sma-osn-bridge";
import { smaTracksFileSchema } from "../schema/sma-track";
import { smaWeeksFileSchema } from "../schema/sma-week";
import { loadCorpusFromDirectory } from "./corpus-loader";
import { loadOsnTopicFamilyIds, loadProgramRegistry } from "./program-loader";

export type SmaCorpusLoadResult =
  | { readonly ok: true; readonly corpus: SmaCorpus }
  | { readonly ok: false; readonly message: string };

/**
 * Reads, audits and parses the corpus in `corpusDir`. `osnTopicFamilyIds`
 * defaults to the OSN corpus's ids from the registry (the audit's
 * cross-programme check). Never throws; failures come back as a message
 * pointing at `osn validate --program sma-coding`.
 */
export async function loadSmaCorpus(
  corpusDir: string,
  osnTopicFamilyIds?: ReadonlySet<string>,
): Promise<SmaCorpusLoadResult> {
  let source: Awaited<ReturnType<typeof loadCorpusFromDirectory>>;
  try {
    source = await loadCorpusFromDirectory(corpusDir);
  } catch (cause) {
    return { ok: false, message: (cause as Error).message };
  }

  let familyIds = osnTopicFamilyIds;
  if (familyIds === undefined) {
    const registry = await loadProgramRegistry();
    familyIds = registry.ok ? await loadOsnTopicFamilyIds(registry.registry) : undefined;
  }

  const audit = auditSmaCorpus(source, familyIds);
  const moduleProblems = moduleFindings(source, SMA_CODING_PROGRAM_ID, {
    osnTopicFamilyIds: familyIds,
  });
  const problems = [...audit.findings, ...moduleProblems];
  const first = problems[0];
  if (first !== undefined) {
    return {
      ok: false,
      message:
        `corpus "${corpusDir}" gagal validasi (${problems.length} temuan; pertama: ` +
        `${first.file} ${first.path}: ${first.message}). ` +
        'Jalankan "osn validate --program sma-coding".',
    };
  }

  const parsed = <T>(file: string, schema: { parse: (value: unknown) => T }): T => {
    const entry = source.get(file);
    if (entry === undefined || !entry.ok) {
      throw new Error(`${file} is missing or invalid`);
    }
    return schema.parse(entry.data);
  };
  return {
    ok: true,
    corpus: {
      tracks: parsed("tracks.json", smaTracksFileSchema),
      weeks: parsed("weeks.json", smaWeeksFileSchema),
      foundation: parsed("foundation.json", smaFoundationFileSchema),
      cpMapping: parsed("cp-mapping.json", cpMappingFileSchema),
      cpElements: parsed("cp-elements.json", cpElementsFileSchema),
      osnBridge: parsed("osn-bridge.json", osnBridgeFileSchema),
      modules: parseSmaModulesIndex(source).modules,
    },
  };
}
