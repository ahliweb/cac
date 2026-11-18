/**
 * Whole-corpus audit of the `dewasa-coding` programme
 * (`data/dewasa-coding/`), the counterpart of `auditCorpus` (OSN) and
 * `auditSmaCorpus` (ADR-0006, ADR-0008). Like them, a pure function of an
 * injected {@link CorpusSource}: every problem is reported in one pass,
 * nothing is thrown for ordinary bad data, nothing reads a filesystem.
 *
 * Checks: schema conformance of every registered file plus the reverse
 * "unregistered file" check; fixed structural invariants of the approved
 * syllabus (four tracks, hours per track, module counts, 47 SKKNI units,
 * the touched/uncovered unit claim); and referential integrity (module
 * codes unique, prerequisites resolve without a cycle and lead back to the
 * shared module `DW-FND-M1` for every module of every track, SKKNI unit
 * codes named by modules and LSP schemes exist, the default certification
 * option exists).
 *
 * The programme has no cross-programme reference, so the audit takes only
 * the corpus.
 */

import type { z } from "zod";
import { dwBridgeFileSchema } from "../schema/dw-bridge";
import { dwCertificationFileSchema } from "../schema/dw-certification";
import { DW_SHARED_MODULE_CODE, DW_SHARED_TRACK_ID, DW_TRACK_IDS } from "../schema/dw-common";
import { dwModulePlanFileSchema } from "../schema/dw-module";
import { dwSharedFileSchema } from "../schema/dw-shared";
import { dwSkkniFileSchema } from "../schema/dw-skkni";
import { dwStructureFileSchema } from "../schema/dw-structure";
import { dwTracksFileSchema } from "../schema/dw-track";
import type { AuditResult, CorpusFinding, CorpusSource } from "./corpus-audit";

interface DwFileEntry {
  readonly file: string;
  readonly schema: z.ZodTypeAny;
}

/** The file -> schema registry of the `dewasa-coding` corpus. */
export const DW_DATA_FILE_REGISTRY: readonly DwFileEntry[] = [
  { file: "tracks.json", schema: dwTracksFileSchema },
  { file: "structure.json", schema: dwStructureFileSchema },
  { file: "shared.json", schema: dwSharedFileSchema },
  { file: "module-plan.json", schema: dwModulePlanFileSchema },
  { file: "skkni-units.json", schema: dwSkkniFileSchema },
  { file: "certification.json", schema: dwCertificationFileSchema },
  { file: "bridges.json", schema: dwBridgeFileSchema },
];

/**
 * The fixed numbers of the approved v1.0 syllabus. `hours` is
 * shared + own = total per track (`[asumsi]` estimates, but fixed by the
 * approved text); `modules` is the own-module count per track.
 */
export const DW_EXPECTED_COUNTS = {
  tracks: 4,
  sharedModules: 1,
  structureRows: 8,
  skkniUnits: 47,
  touchedUnits: 34,
  uncoveredUnits: 13,
  certificationOptions: 3,
  lspSchemes: 2,
  bridges: 6,
  modules: { PKJ: 8, PRO: 12, PRS: 6, BIS: 8 },
  hours: {
    PKJ: { shared: 8, own: 40, total: 48 },
    PRO: { shared: 8, own: 120, total: 128 },
    PRS: { shared: 8, own: 30, total: 38 },
    BIS: { shared: 8, own: 48, total: 56 },
  },
} as const;

function error(file: string, path: string, message: string): CorpusFinding {
  return { file, path, message, severity: "error" };
}

type Parsed = ReadonlyMap<string, unknown>;

function typed<T>(parsed: Parsed, file: string): T | undefined {
  return parsed.get(file) as T | undefined;
}

function schemaFindings(source: CorpusSource) {
  const findings: CorpusFinding[] = [];
  const parsed = new Map<string, unknown>();
  let filesValidated = 0;
  let filesMissing = 0;

  for (const entry of DW_DATA_FILE_REGISTRY) {
    const found = source.get(entry.file);
    if (found === undefined) {
      filesMissing += 1;
      findings.push(
        error(
          entry.file,
          "(file)",
          `required data file is missing from the corpus (expected at data/dewasa-coding/${entry.file})`,
        ),
      );
      continue;
    }
    if (!found.ok) {
      findings.push(error(entry.file, "(file)", `invalid JSON: ${found.error}`));
      continue;
    }
    const result = entry.schema.safeParse(found.data);
    if (!result.success) {
      for (const issue of result.error.issues) {
        findings.push(
          error(entry.file, issue.path.length > 0 ? issue.path.join(".") : "(root)", issue.message),
        );
      }
      continue;
    }
    filesValidated += 1;
    parsed.set(entry.file, result.data);
  }

  const registered = new Set(DW_DATA_FILE_REGISTRY.map((entry) => entry.file));
  let filesUnregistered = 0;
  for (const file of source.keys()) {
    if (!registered.has(file)) {
      filesUnregistered += 1;
      findings.push(
        error(
          file,
          "(file)",
          "this data file is not covered by any schema in DW_DATA_FILE_REGISTRY " +
            "(src/domain/dw-corpus-audit.ts) -- add it there so it is validated rather than silently ignored",
        ),
      );
    }
  }

  return { findings, parsed, filesValidated, filesMissing, filesUnregistered };
}

function structuralFindings(parsed: Parsed): CorpusFinding[] {
  const findings: CorpusFinding[] = [];
  const tracks = typed<z.infer<typeof dwTracksFileSchema>>(parsed, "tracks.json");
  const structure = typed<z.infer<typeof dwStructureFileSchema>>(parsed, "structure.json");
  const shared = typed<z.infer<typeof dwSharedFileSchema>>(parsed, "shared.json");
  const plan = typed<z.infer<typeof dwModulePlanFileSchema>>(parsed, "module-plan.json");
  const skkni = typed<z.infer<typeof dwSkkniFileSchema>>(parsed, "skkni-units.json");
  const certification = typed<z.infer<typeof dwCertificationFileSchema>>(
    parsed,
    "certification.json",
  );
  const bridges = typed<z.infer<typeof dwBridgeFileSchema>>(parsed, "bridges.json");

  const count = (file: string, path: string, label: string, actual: number, expected: number) => {
    if (actual !== expected) {
      findings.push(error(file, path, `expected exactly ${expected} ${label}, found ${actual}`));
    }
  };

  if (tracks !== undefined) {
    count("tracks.json", "tracks", "tracks", tracks.tracks.length, DW_EXPECTED_COUNTS.tracks);
    const ids = tracks.tracks.map((track) => track.id);
    if (ids.join(",") !== DW_TRACK_IDS.join(",")) {
      findings.push(
        error(
          "tracks.json",
          "tracks",
          `tracks must be ${DW_TRACK_IDS.join(", ")} in this order; found ${ids.join(", ")}`,
        ),
      );
    }
    tracks.tracks.forEach((track, index) => {
      const expected = DW_EXPECTED_COUNTS.hours[track.id];
      const at = `tracks[${index}]`;
      if (track.sharedHours !== expected.shared) {
        findings.push(
          error(
            "tracks.json",
            `${at}.sharedHours`,
            `track ${track.id} must have ${expected.shared}`,
          ),
        );
      }
      if (track.trackHours !== expected.own) {
        findings.push(
          error("tracks.json", `${at}.trackHours`, `track ${track.id} must have ${expected.own}`),
        );
      }
      if (track.totalHours !== expected.total) {
        findings.push(
          error(
            "tracks.json",
            `${at}.totalHours`,
            `track ${track.id} must total ${expected.total}`,
          ),
        );
      }
      if (track.moduleCount !== DW_EXPECTED_COUNTS.modules[track.id]) {
        findings.push(
          error(
            "tracks.json",
            `${at}.moduleCount`,
            `track ${track.id} must have ${DW_EXPECTED_COUNTS.modules[track.id]} modules`,
          ),
        );
      }
    });
  }
  if (structure !== undefined) {
    count(
      "structure.json",
      "rows",
      "structure rows",
      structure.rows.length,
      DW_EXPECTED_COUNTS.structureRows,
    );
  }
  if (shared !== undefined) {
    count(
      "shared.json",
      "modules",
      "shared modules",
      shared.modules.length,
      DW_EXPECTED_COUNTS.sharedModules,
    );
    if (!shared.modules.some((module) => module.code === DW_SHARED_MODULE_CODE)) {
      findings.push(
        error("shared.json", "modules", `the shared module ${DW_SHARED_MODULE_CODE} is missing`),
      );
    }
  }
  if (plan !== undefined) {
    count(
      "module-plan.json",
      "modules",
      "track modules",
      plan.modules.length,
      Object.values(DW_EXPECTED_COUNTS.modules).reduce((sum, n) => sum + n, 0),
    );
  }
  if (skkni !== undefined) {
    count(
      "skkni-units.json",
      "units",
      "SKKNI units",
      skkni.units.length,
      DW_EXPECTED_COUNTS.skkniUnits,
    );
    count(
      "skkni-units.json",
      "touchedUnitCount",
      "touched units (claim)",
      skkni.touchedUnitCount,
      DW_EXPECTED_COUNTS.touchedUnits,
    );
    count(
      "skkni-units.json",
      "uncoveredUnitCodes",
      "uncovered units",
      skkni.uncoveredUnitCodes.length,
      DW_EXPECTED_COUNTS.uncoveredUnits,
    );
  }
  if (certification !== undefined) {
    count(
      "certification.json",
      "options",
      "certification options",
      certification.options.length,
      DW_EXPECTED_COUNTS.certificationOptions,
    );
    count(
      "certification.json",
      "lspSchemes",
      "LSP schemes",
      certification.lspSchemes.length,
      DW_EXPECTED_COUNTS.lspSchemes,
    );
  }
  if (bridges !== undefined) {
    count("bridges.json", "bridges", "bridges", bridges.bridges.length, DW_EXPECTED_COUNTS.bridges);
  }
  return findings;
}

/** Whether `target` is reachable from `start` along prerequisite edges (at least one edge). */
function reaches(
  edges: ReadonlyMap<string, readonly string[]>,
  start: string,
  target: string,
): boolean {
  const seen = new Set<string>();
  const pending = [...(edges.get(start) ?? [])];
  while (pending.length > 0) {
    const code = pending.pop() as string;
    if (code === target) {
      return true;
    }
    if (!seen.has(code)) {
      seen.add(code);
      pending.push(...(edges.get(code) ?? []));
    }
  }
  return false;
}

function referentialFindings(parsed: Parsed): CorpusFinding[] {
  const findings: CorpusFinding[] = [];
  const tracks = typed<z.infer<typeof dwTracksFileSchema>>(parsed, "tracks.json");
  const shared = typed<z.infer<typeof dwSharedFileSchema>>(parsed, "shared.json");
  const plan = typed<z.infer<typeof dwModulePlanFileSchema>>(parsed, "module-plan.json");
  const skkni = typed<z.infer<typeof dwSkkniFileSchema>>(parsed, "skkni-units.json");
  const certification = typed<z.infer<typeof dwCertificationFileSchema>>(
    parsed,
    "certification.json",
  );

  const sharedCodes = new Set((shared?.modules ?? []).map((module) => module.code));
  const moduleCodes = new Set([...sharedCodes, ...(plan?.modules ?? []).map((m) => m.code)]);
  const trackIds = new Set<string>(tracks?.tracks.map((track) => track.id) ?? []);

  if (shared !== undefined) {
    shared.modules.forEach((module, index) => {
      if ((plan?.modules ?? []).some((own) => own.code === module.code)) {
        findings.push(
          error("shared.json", `modules[${index}].code`, `"${module.code}" is also a track module`),
        );
      }
    });
  }

  if (plan !== undefined) {
    const edges = new Map<string, readonly string[]>();
    for (const module of plan.modules) {
      edges.set(
        module.code,
        module.prerequisites.filter((code) => moduleCodes.has(code)),
      );
    }

    plan.modules.forEach((module, index) => {
      const at = `modules[${index}]`;
      if (tracks !== undefined && !trackIds.has(module.track)) {
        findings.push(
          error("module-plan.json", `${at}.track`, `track "${module.track}" is not in tracks.json`),
        );
      }
      module.prerequisites.forEach((code, i) => {
        if (!moduleCodes.has(code)) {
          findings.push(
            error(
              "module-plan.json",
              `${at}.prerequisites[${i}]`,
              `prerequisite "${code}" does not exist`,
            ),
          );
        } else if (code === module.code || reaches(edges, code, module.code)) {
          findings.push(
            error(
              "module-plan.json",
              `${at}.prerequisites[${i}]`,
              `prerequisite "${code}" closes a prerequisite cycle`,
            ),
          );
        }
      });
      // The shared module must come first for every module of every track.
      if (
        module.code !== DW_SHARED_MODULE_CODE &&
        !reaches(edges, module.code, DW_SHARED_MODULE_CODE)
      ) {
        findings.push(
          error(
            "module-plan.json",
            `${at}.prerequisites`,
            `${module.code} does not lead back to the shared module ${DW_SHARED_MODULE_CODE}`,
          ),
        );
      }
    });

    // Numbers of one track are 1..n once each, hours add up to the track's figures.
    for (const [index, track] of (tracks?.tracks ?? []).entries()) {
      const own = plan.modules.filter((module) => module.track === track.id);
      const numbers = own.map((module) => module.number).sort((a, b) => a - b);
      if (!numbers.every((n, i) => n === i + 1)) {
        findings.push(
          error(
            "module-plan.json",
            "modules",
            `track ${track.id} must number its modules 1..${numbers.length} once each; found [${numbers.join(", ")}]`,
          ),
        );
      }
      if (own.length !== track.moduleCount) {
        findings.push(
          error(
            "tracks.json",
            `tracks[${index}].moduleCount`,
            `says ${track.moduleCount} modules but module-plan.json has ${own.length} for ${track.id}`,
          ),
        );
      }
      const hours = own.reduce((sum, module) => sum + module.hours, 0);
      if (hours !== track.trackHours) {
        findings.push(
          error(
            "tracks.json",
            `tracks[${index}].trackHours`,
            `is ${track.trackHours} but the ${track.id} modules in module-plan.json add up to ${hours}`,
          ),
        );
      }
      const sharedHours = (shared?.modules ?? [])
        .filter((module) => module.code.startsWith(`DW-${DW_SHARED_TRACK_ID}-`))
        .reduce((sum, module) => sum + module.hours, 0);
      if (shared !== undefined && sharedHours !== track.sharedHours) {
        findings.push(
          error(
            "tracks.json",
            `tracks[${index}].sharedHours`,
            `is ${track.sharedHours} but the shared modules in shared.json add up to ${sharedHours}`,
          ),
        );
      }
      if (!track.prerequisiteModules.includes(DW_SHARED_MODULE_CODE)) {
        findings.push(
          error(
            "tracks.json",
            `tracks[${index}].prerequisiteModules`,
            `track ${track.id} must list ${DW_SHARED_MODULE_CODE} as a prerequisite`,
          ),
        );
      }
      track.prerequisiteModules.forEach((code, i) => {
        if (!moduleCodes.has(code)) {
          findings.push(
            error(
              "tracks.json",
              `tracks[${index}].prerequisiteModules[${i}]`,
              `module "${code}" does not exist`,
            ),
          );
        }
      });
    }
  }

  if (skkni !== undefined) {
    const unitCodes = new Set(skkni.units.map((unit) => unit.code));
    skkni.units.forEach((unit, index) => {
      const number = Number(unit.code.split(".")[2]);
      if (number !== index + 1) {
        findings.push(
          error(
            "skkni-units.json",
            `units[${index}].code`,
            `units must run 001..047 in order; position ${index + 1} holds ${unit.code}`,
          ),
        );
      }
    });

    const touched = new Set<string>();
    plan?.modules.forEach((module, index) => {
      module.skkniUnitCodes?.forEach((code, i) => {
        touched.add(code);
        if (!unitCodes.has(code)) {
          findings.push(
            error(
              "module-plan.json",
              `modules[${index}].skkniUnitCodes[${i}]`,
              `SKKNI unit "${code}" does not exist in skkni-units.json`,
            ),
          );
        }
      });
    });
    if (plan !== undefined) {
      if (touched.size !== skkni.touchedUnitCount) {
        findings.push(
          error(
            "skkni-units.json",
            "touchedUnitCount",
            `claims ${skkni.touchedUnitCount} touched units but the PRO modules touch ${touched.size}`,
          ),
        );
      }
      const complement = skkni.units.filter((unit) => !touched.has(unit.code)).map((u) => u.code);
      const declared = [...skkni.uncoveredUnitCodes].sort();
      if (complement.join(",") !== declared.join(",")) {
        findings.push(
          error(
            "skkni-units.json",
            "uncoveredUnitCodes",
            `must equal the units no PRO module touches [${complement.join(", ")}]; found [${declared.join(", ")}]`,
          ),
        );
      }
    }
    skkni.uncoveredUnitCodes.forEach((code, index) => {
      if (!unitCodes.has(code)) {
        findings.push(
          error(
            "skkni-units.json",
            `uncoveredUnitCodes[${index}]`,
            `SKKNI unit "${code}" does not exist in the unit list`,
          ),
        );
      }
    });

    certification?.lspSchemes.forEach((scheme, index) => {
      scheme.unitCodes.forEach((code, i) => {
        const at = `lspSchemes[${index}].unitCodes[${i}]`;
        if (!unitCodes.has(code)) {
          findings.push(
            error(
              "certification.json",
              at,
              `SKKNI unit "${code}" does not exist in skkni-units.json`,
            ),
          );
        } else if (plan !== undefined && !touched.has(code)) {
          findings.push(
            error(
              "certification.json",
              at,
              `SKKNI unit "${code}" of scheme "${scheme.id}" is not touched by any PRO module (silabus bagian 5.2 says all are)`,
            ),
          );
        }
      });
    });
  }

  if (certification !== undefined) {
    if (!certification.options.some((option) => option.id === certification.defaultOptionId)) {
      findings.push(
        error(
          "certification.json",
          "defaultOptionId",
          `option "${certification.defaultOptionId}" does not exist in options`,
        ),
      );
    }
  }

  return findings;
}

/**
 * Audits `source` -- the `data/dewasa-coding/` corpus as file name -> entry.
 * No cross-programme input is needed.
 */
export function auditDewasaCorpus(source: CorpusSource): AuditResult {
  const schema = schemaFindings(source);
  const findings = [
    ...schema.findings,
    ...structuralFindings(schema.parsed),
    ...referentialFindings(schema.parsed),
  ];
  const errorCount = findings.filter((finding) => finding.severity === "error").length;
  return {
    ok: findings.length === 0,
    findings,
    summary: {
      filesValidated: schema.filesValidated,
      filesMissing: schema.filesMissing,
      filesUnregistered: schema.filesUnregistered,
      findingCount: findings.length,
      errorCount,
      warningCount: findings.length - errorCount,
    },
  };
}
