/**
 * Schema for `data/dewasa-coding/module-plan.json`: the own modules of the
 * four persona tracks (silabus bagian 4-7), `DW-<PKJ|PRO|PRS|BIS>-M<n>`.
 *
 * Named `module-plan.json`, not `modules.json`, on purpose: `modules.json`
 * is reserved for the ADR-0007 learning-content index (`content/` bodies),
 * which this programme does not have yet.
 *
 * A track `PRO` module carries the SKKNI 282/2016 units it touches (mapped
 * to unit *titles* only); a module of any other track carries its portfolio
 * output instead. Referential checks (units exist, prerequisites resolve
 * and are acyclic, hours add up) need other corpus files and live in
 * `src/domain/dw-corpus-audit.ts`.
 */

import { z } from "zod";
import { nonEmptyString } from "./common";
import {
  dwHoursSchema,
  dwModuleCodeSchema,
  dwProvenanceShape,
  dwSkkniUnitCodeSchema,
  dwTrackIdSchema,
} from "./dw-common";

function isUnique(values: readonly string[]): boolean {
  return new Set(values).size === values.length;
}

export const dwModuleSchema = z
  .object({
    code: dwModuleCodeSchema,
    track: dwTrackIdSchema,
    number: z.number().int().min(1),
    title: nonEmptyString.describe('The "Modul" cell, verbatim.'),
    hours: dwHoursSchema,
    outcome: nonEmptyString.describe('The "Hasil belajar" cell, verbatim.'),
    portfolioOutput: nonEmptyString
      .optional()
      .describe('The "Keluaran portofolio" cell, verbatim; every track except PRO.'),
    skkniUnitCodes: z
      .array(dwSkkniUnitCodeSchema)
      .min(1)
      .optional()
      .describe('The codes of the "Unit SKKNI terkait" cell; track PRO only.'),
    prerequisites: z
      .array(dwModuleCodeSchema)
      .min(1)
      .describe(
        "Module codes taken before this one: the previous module of the track in table order; the track's first module names the shared module.",
      ),
  })
  .strict()
  .superRefine((module, ctx) => {
    if (module.code !== `DW-${module.track}-M${module.number}`) {
      ctx.addIssue({
        code: "custom",
        path: ["code"],
        message: `must be "DW-${module.track}-M${module.number}" (track and number)`,
      });
    }
    if (module.track === "PRO") {
      if (module.skkniUnitCodes === undefined) {
        ctx.addIssue({
          code: "custom",
          path: ["skkniUnitCodes"],
          message: "a PRO module must list its SKKNI units",
        });
      }
      if (module.portfolioOutput !== undefined) {
        ctx.addIssue({
          code: "custom",
          path: ["portfolioOutput"],
          message: "a PRO module has no portfolioOutput (its table maps SKKNI units instead)",
        });
      }
    } else {
      if (module.portfolioOutput === undefined) {
        ctx.addIssue({
          code: "custom",
          path: ["portfolioOutput"],
          message: "a module of this track must name its portfolio output",
        });
      }
      if (module.skkniUnitCodes !== undefined) {
        ctx.addIssue({
          code: "custom",
          path: ["skkniUnitCodes"],
          message: "only PRO modules map SKKNI units",
        });
      }
    }
    if (module.skkniUnitCodes !== undefined && !isUnique(module.skkniUnitCodes)) {
      ctx.addIssue({
        code: "custom",
        path: ["skkniUnitCodes"],
        message: "skkniUnitCodes must be unique",
      });
    }
    if (!isUnique(module.prerequisites)) {
      ctx.addIssue({
        code: "custom",
        path: ["prerequisites"],
        message: "prerequisites must be unique",
      });
    }
  });

export const dwModulePlanFileSchema = z
  .object({
    ...dwProvenanceShape,
    modules: z.array(dwModuleSchema).min(1),
  })
  .strict()
  .refine((file) => isUnique(file.modules.map((module) => module.code)), {
    path: ["modules"],
    message: "module codes must be unique",
  })
  .describe("The full contents of `data/dewasa-coding/module-plan.json`.");

export type DwModule = z.infer<typeof dwModuleSchema>;
export type DwModulePlanFile = z.infer<typeof dwModulePlanFileSchema>;
