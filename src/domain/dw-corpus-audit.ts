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
 * The audit takes only the corpus. Codes of other programmes named in the
 * bridge tables (the `KUL-` codes of `kuliah-bridge.json`) are checked by the
 * separate cross-programme check (`src/domain/cross-program-refs.ts`,
 * ADR-0010), which `osn validate` runs with the code sets of the other
 * corpora.
 */

import type { z } from "zod";
import { dwBridgeFileSchema } from "../schema/dw-bridge";
import { dwCertificationFileSchema } from "../schema/dw-certification";
import { DW_SHARED_MODULE_CODE, DW_SHARED_TRACK_ID, DW_TRACK_IDS } from "../schema/dw-common";
import { dwKuliahBridgeFileSchema } from "../schema/dw-kuliah-bridge";
import { dwModulePlanFileSchema } from "../schema/dw-module";
import { dwSharedFileSchema } from "../schema/dw-shared";
import { dwSkkniFileSchema } from "../schema/dw-skkni";
import { dwStructureFileSchema } from "../schema/dw-structure";
import { dwTracksFileSchema } from "../schema/dw-track";
import { MODULES_FILE_NAME } from "../schema/module";
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
  { file: "kuliah-bridge.json", schema: dwKuliahBridgeFileSchema },
];

/**
 * The fixed numbers of the approved v1.1 syllabus. `hours` is
 * shared + own = total per track (`[asumsi]` estimates, but fixed by the
 * approved text); `modules` is the own-module count per track. Track PRO
 * has 13 modules since v1.1.0 (#139): twelve of 10 hours plus
 * `DW-PRO-M13` of 8, taught after `DW-PRO-M5`.
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
  kuliahBridge: { profiles: 3, modules: 13, impactRows: 3 },
  modules: { PKJ: 8, PRO: 13, PRS: 6, BIS: 8 },
  hours: {
    PKJ: { shared: 8, own: 40, total: 48 },
    PRO: { shared: 8, own: 128, total: 136 },
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
    // modules.json is the optional learning-module index (ADR-0007), validated by `moduleFindings`.
    if (!registered.has(file) && file !== MODULES_FILE_NAME) {
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
  const kuliahBridge = typed<z.infer<typeof dwKuliahBridgeFileSchema>>(
    parsed,
    "kuliah-bridge.json",
  );

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
  if (kuliahBridge !== undefined) {
    const expected = DW_EXPECTED_COUNTS.kuliahBridge;
    const file = "kuliah-bridge.json";
    count(file, "profiles", "entry profiles", kuliahBridge.profiles.length, expected.profiles);
    count(file, "modules", "PRO modules", kuliahBridge.modules.length, expected.modules);
    count(
      file,
      "hourImpact",
      "hour-impact rows",
      kuliahBridge.hourImpact.length,
      expected.impactRows,
    );
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

/** The hours one module costs under a recognition status: L = 1 hour, P = half the module, W = all of it. */
function statusHours(status: "L" | "P" | "W", hours: number): number {
  return status === "L" ? 1 : status === "P" ? hours / 2 : hours;
}

/**
 * Referential and arithmetic integrity of the kuliah-coding bridge
 * (`kuliah-bridge.json`, silabus bagian 6.2): the modules are exactly the
 * PRO modules of the module plan with the same hours, every module has a
 * status for every profile, the mandatory modules exist and stay mandatory,
 * and the hour-impact table is what the status counts and the rule
 * L = 1 hour, P = half the module, W = the whole module give. `KUL-` codes
 * are checked against the kuliah-coding corpus by the cross-programme check
 * (ADR-0010), not here.
 */
function kuliahBridgeFindings(parsed: Parsed): CorpusFinding[] {
  const findings: CorpusFinding[] = [];
  const file = "kuliah-bridge.json";
  const bridge = typed<z.infer<typeof dwKuliahBridgeFileSchema>>(parsed, file);
  const plan = typed<z.infer<typeof dwModulePlanFileSchema>>(parsed, "module-plan.json");
  const shared = typed<z.infer<typeof dwSharedFileSchema>>(parsed, "shared.json");
  const tracks = typed<z.infer<typeof dwTracksFileSchema>>(parsed, "tracks.json");
  if (bridge === undefined) {
    return findings;
  }
  const profileIds = bridge.profiles.map((profile) => profile.id);
  const proModules = new Map(
    (plan?.modules ?? []).filter((module) => module.track === "PRO").map((m) => [m.code, m]),
  );
  const sharedHours = (shared?.modules ?? [])
    .filter((module) => module.code.startsWith(`DW-${DW_SHARED_TRACK_ID}-`))
    .reduce((sum, module) => sum + module.hours, 0);

  if (plan !== undefined) {
    for (const [code] of proModules) {
      if (!bridge.modules.some((module) => module.code === code)) {
        findings.push(
          error(file, "modules", `PRO module ${code} has no row in the recognition table`),
        );
      }
    }
  }
  bridge.modules.forEach((module, index) => {
    const at = `modules[${index}]`;
    const planned = proModules.get(module.code);
    if (plan !== undefined && planned === undefined) {
      findings.push(
        error(file, `${at}.code`, `"${module.code}" is not a PRO module of module-plan.json`),
      );
    } else if (planned !== undefined && planned.hours !== module.hours) {
      findings.push(
        error(
          file,
          `${at}.hours`,
          `says ${module.hours} hours but module-plan.json has ${planned.hours} for ${module.code}`,
        ),
      );
    }
    const keys = Object.keys(module.statuses).sort();
    if (keys.join(",") !== [...profileIds].sort().join(",")) {
      findings.push(
        error(
          file,
          `${at}.statuses`,
          `must have exactly one status per profile [${profileIds.join(", ")}]; found [${keys.join(", ")}]`,
        ),
      );
    }
  });

  for (const code of bridge.mandatoryModules) {
    const inShared = (shared?.modules ?? []).some((module) => module.code === code);
    if (plan !== undefined && shared !== undefined && !inShared && !proModules.has(code)) {
      findings.push(error(file, "mandatoryModules", `mandatory module "${code}" does not exist`));
    }
    const row = bridge.modules.find((module) => module.code === code);
    if (row !== undefined) {
      for (const profile of profileIds) {
        if (row.statuses[profile] !== "W") {
          findings.push(
            error(
              file,
              "mandatoryModules",
              `${code} is mandatory but has status ${row.statuses[profile] ?? "(none)"} for ${profile}`,
            ),
          );
        }
      }
    }
  }
  for (const required of ["DW-FND-M1", "DW-PRO-M12"]) {
    if (!bridge.mandatoryModules.includes(required)) {
      findings.push(
        error(
          file,
          "mandatoryModules",
          `${required} must stay mandatory for every participant (owner decision K6, #177)`,
        ),
      );
    }
  }

  if (tracks !== undefined) {
    const pro = tracks.tracks.find((track) => track.id === "PRO");
    if (pro !== undefined && bridge.baselineHours !== pro.totalHours) {
      findings.push(
        error(
          file,
          "baselineHours",
          `is ${bridge.baselineHours} but track PRO totals ${pro.totalHours} hours in tracks.json`,
        ),
      );
    }
  }

  bridge.hourImpact.forEach((row, index) => {
    const at = `hourImpact[${index}]`;
    if (!profileIds.includes(row.profile)) {
      findings.push(error(file, `${at}.profile`, `profile "${row.profile}" is not in profiles`));
      return;
    }
    const statuses = bridge.modules.map((module) => ({
      hours: module.hours,
      status: module.statuses[row.profile],
    }));
    if (statuses.some((entry) => entry.status === undefined)) {
      return;
    }
    const countOf = (status: string) => statuses.filter((entry) => entry.status === status).length;
    const expected = {
      lewati: countOf("L"),
      padatkan: countOf("P"),
      wajib: countOf("W"),
      moduleHours: statuses.reduce(
        (sum, entry) => sum + statusHours(entry.status as "L" | "P" | "W", entry.hours),
        0,
      ),
    };
    for (const key of ["lewati", "padatkan", "wajib", "moduleHours"] as const) {
      if (row[key] !== expected[key]) {
        findings.push(
          error(
            file,
            `${at}.${key}`,
            `is ${row[key]} but the statuses of ${row.profile} give ${expected[key]}`,
          ),
        );
      }
    }
    if (shared !== undefined && row.totalHours !== expected.moduleHours + sharedHours) {
      findings.push(
        error(
          file,
          `${at}.totalHours`,
          `is ${row.totalHours} but module hours ${expected.moduleHours} plus shared hours ${sharedHours} give ${expected.moduleHours + sharedHours}`,
        ),
      );
    }
    if (row.reductionHours !== bridge.baselineHours - row.totalHours) {
      findings.push(
        error(
          file,
          `${at}.reductionHours`,
          `is ${row.reductionHours} but ${bridge.baselineHours} minus ${row.totalHours} is ${bridge.baselineHours - row.totalHours}`,
        ),
      );
    }
  });
  const impactProfiles = bridge.hourImpact
    .map((row) => row.profile)
    .sort()
    .join(",");
  if (impactProfiles !== [...profileIds].sort().join(",")) {
    findings.push(
      error(file, "hourImpact", `must have one row per profile [${profileIds.join(", ")}]`),
    );
  }
  return findings;
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
 * No cross-programme input is needed: the `KUL-` codes of `kuliah-bridge.json` are checked
 * against the kuliah-coding corpus by the cross-programme check (ADR-0010), in `osn validate`.
 */
export function auditDewasaCorpus(source: CorpusSource): AuditResult {
  const schema = schemaFindings(source);
  const findings = [
    ...schema.findings,
    ...structuralFindings(schema.parsed),
    ...referentialFindings(schema.parsed),
    ...kuliahBridgeFindings(schema.parsed),
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
