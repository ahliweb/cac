/**
 * Schema for `data/tk-coding/cp-elements.json`: the quotations of the CP
 * Fase Fondasi items the syllabus uses (silabus bagian 4.1, quoted verbatim
 * from bagian 1.2) and the scope explanations it cites (bagian 1.2,
 * "Penjelasan lingkup").
 */

import { z } from "zod";
import { nonEmptyString } from "./common";
import { tkCpCodeSchema, tkCpElementIdSchema, tkProvenanceShape } from "./tk-common";

export const TK_SCOPE_SUBJECTS = ["Matematika", "Teknologi", "Rekayasa"] as const;

export const tkCpItemSchema = z
  .object({
    code: tkCpCodeSchema,
    elementId: tkCpElementIdSchema,
    text: nonEmptyString.describe("The CP quotation, verbatim (whitespace normalised)."),
  })
  .strict()
  .refine((item) => item.code.startsWith(`FF-${item.elementId}-`), {
    path: ["code"],
    message: "must start with FF-<elementId>- matching this item's own elementId",
  });

export const tkScopeNoteSchema = z
  .object({
    subject: z.enum(TK_SCOPE_SUBJECTS).describe("The subject whose PAUD scope is quoted."),
    text: nonEmptyString.describe('The "Penjelasan lingkup" quotation, verbatim.'),
  })
  .strict();

export const tkCpElementsFileSchema = z
  .object({
    ...tkProvenanceShape,
    items: z.array(tkCpItemSchema).min(1),
    scope: z.array(tkScopeNoteSchema).min(1),
  })
  .strict()
  .superRefine((file, ctx) => {
    const codes = new Set<string>();
    file.items.forEach((item, index) => {
      if (codes.has(item.code)) {
        ctx.addIssue({
          code: "custom",
          path: ["items", index, "code"],
          message: `duplicate CP item code "${item.code}"`,
        });
      }
      codes.add(item.code);
    });
    const subjects = new Set(file.scope.map((note) => note.subject));
    if (subjects.size !== file.scope.length) {
      ctx.addIssue({
        code: "custom",
        path: ["scope"],
        message: "each subject may have only one scope note",
      });
    }
  })
  .describe("The full contents of `data/tk-coding/cp-elements.json`.");

export type TkCpElementsFile = z.infer<typeof tkCpElementsFileSchema>;
