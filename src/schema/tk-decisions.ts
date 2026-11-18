/**
 * Schema for `data/tk-coding/decisions.json`: the owner's decisions Q1..Q9
 * recorded in silabus bagian 9. Only the owner's chosen option is stored;
 * the schema has no "approved" flag of its own -- the syllabus text is the
 * record, and an approval the owner did not give cannot be encoded here.
 */

import { z } from "zod";
import { nonEmptyString } from "./common";
import { tkProvenanceShape } from "./tk-common";

export const tkDecisionSchema = z
  .object({
    id: z.string().regex(/^Q[1-9][0-9]*$/, 'must be a question id such as "Q1"'),
    question: nonEmptyString.describe('The "Pertanyaan" cell, verbatim.'),
    decision: nonEmptyString.describe('The "Keputusan pemilik (opsi terpilih)" cell, verbatim.'),
    consequence: nonEmptyString.describe('The "Konsekuensi" cell, verbatim.'),
  })
  .strict();

export const tkDecisionsFileSchema = z
  .object({
    ...tkProvenanceShape,
    decidedOn: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, 'must be an ISO date "YYYY-MM-DD"')
      .describe("The date the owner decided, as stated in bagian 9."),
    decisions: z.array(tkDecisionSchema).min(1),
  })
  .strict()
  .refine((file) => new Set(file.decisions.map((d) => d.id)).size === file.decisions.length, {
    path: ["decisions"],
    message: "decision ids must be unique",
  })
  .describe("The full contents of `data/tk-coding/decisions.json`.");

export type TkDecisionsFile = z.infer<typeof tkDecisionsFileSchema>;
