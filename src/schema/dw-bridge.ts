/**
 * Schema for `data/dewasa-coding/bridges.json`: the "Jembatan dari program
 * lain" table (silabus bagian 6.1), one record per row. Cells are verbatim.
 * `status` says whether the bridge is designed or postponed (the
 * kuliah-coding bridge is postponed by owner decision 12.7).
 */

import { z } from "zod";
import { nonEmptyString, slugSchema } from "./common";
import { dwProvenanceShape } from "./dw-common";

export const DW_BRIDGE_STATUSES = ["dirancang", "ditunda"] as const;

export const dwBridgeSchema = z
  .object({
    id: slugSchema.describe('A stable id such as "bridge-1" (row order of the table).'),
    from: nonEmptyString.describe('The "Asal" cell, verbatim.'),
    to: nonEmptyString.describe('The "Tujuan" cell, verbatim.'),
    note: nonEmptyString.describe('The "Catatan" cell, verbatim.'),
    status: z
      .enum(DW_BRIDGE_STATUSES)
      .describe('"ditunda" when the row says it cannot be designed yet.'),
  })
  .strict();

export const dwBridgeFileSchema = z
  .object({
    ...dwProvenanceShape,
    bridges: z.array(dwBridgeSchema).min(1),
  })
  .strict()
  .refine((file) => new Set(file.bridges.map((bridge) => bridge.id)).size === file.bridges.length, {
    path: ["bridges"],
    message: "bridge ids must be unique",
  })
  .describe("The full contents of `data/dewasa-coding/bridges.json`.");

export type DwBridge = z.infer<typeof dwBridgeSchema>;
export type DwBridgeFile = z.infer<typeof dwBridgeFileSchema>;
