/**
 * Schema for `data/sma-coding/cp-elements.json`: the Capaian Pembelajaran
 * (CP) quotations of Fase E/F (silabus bagian 1.3) and the CP item codes
 * the syllabus uses (bagian 1.4).
 */

import { z } from "zod";
import { nonEmptyString } from "./common";
import {
  CP_ELEMENT_NAMES,
  cpCodeSchema,
  cpElementIdSchema,
  smaPhaseSchema,
  smaProvenanceShape,
} from "./sma-common";

/** One CP quotation: a phase's text for one element, verbatim from the source guide. */
export const cpQuoteSchema = z
  .object({
    phase: smaPhaseSchema,
    elementId: cpElementIdSchema,
    elementTitle: nonEmptyString.describe("The element's name as printed in the source guide."),
    guideNumber: z
      .string()
      .regex(/^\d+\.\d+$/, 'must look like "2.1"')
      .describe("The heading number the syllabus prints before the element name."),
    text: nonEmptyString.describe("The CP quotation, verbatim (whitespace normalised)."),
  })
  .strict()
  .refine((quote) => quote.elementTitle === CP_ELEMENT_NAMES[quote.elementId], {
    path: ["elementTitle"],
    message: "must be the name of the element identified by elementId",
  });

/** One CP item code with its short reference label (bagian 1.4). */
export const cpItemSchema = z
  .object({
    code: cpCodeSchema,
    phase: smaPhaseSchema,
    elementId: cpElementIdSchema,
    label: nonEmptyString.describe("The item's short reference text, verbatim."),
  })
  .strict()
  .refine((item) => item.code.startsWith(`${item.phase}-${item.elementId}-`), {
    path: ["code"],
    message: "must start with <phase>-<elementId>- matching this item's own phase and elementId",
  });

export const cpElementsFileSchema = z
  .object({
    ...smaProvenanceShape,
    quotes: z.array(cpQuoteSchema).min(1),
    items: z.array(cpItemSchema).min(1),
  })
  .strict()
  .superRefine((file, ctx) => {
    const quoteKeys = new Set(file.quotes.map((quote) => `${quote.phase}-${quote.elementId}`));
    if (quoteKeys.size !== file.quotes.length) {
      ctx.addIssue({
        code: "custom",
        path: ["quotes"],
        message: "each (phase, element) pair may have only one quotation",
      });
    }
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
      if (!quoteKeys.has(`${item.phase}-${item.elementId}`)) {
        ctx.addIssue({
          code: "custom",
          path: ["items", index],
          message: `no quotation exists for phase ${item.phase}, element ${item.elementId}`,
        });
      }
    });
  })
  .describe("The full contents of `data/sma-coding/cp-elements.json`.");

export type CpElementsFile = z.infer<typeof cpElementsFileSchema>;
