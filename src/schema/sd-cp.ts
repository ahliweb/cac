/**
 * Schema for `data/sd-coding/cp-elements.json`: the Capaian Pembelajaran
 * (CP) quotations of KKA Fase C (silabus bagian 1.3, verbatim from SK Kepala
 * BSKAP 046/H/KR/2025) and the CP item codes the syllabus uses (bagian 4).
 */

import { z } from "zod";
import { nonEmptyString } from "./common";
import {
  SD_CP_ELEMENT_NAMES,
  sdElementIdSchema,
  sdProvenanceShape,
  sdCpCodeSchema,
} from "./sd-common";

/** One CP quotation: Fase C's text for one element, verbatim from the SK. */
export const sdCpQuoteSchema = z
  .object({
    elementId: sdElementIdSchema,
    elementTitle: nonEmptyString.describe("The element's name as printed in the SK."),
    guideNumber: z
      .string()
      .regex(/^\d+\.\d+$/, 'must look like "1.1"')
      .describe("The item number the SK prints before the element name."),
    text: nonEmptyString.describe("The CP quotation, verbatim (whitespace normalised)."),
  })
  .strict()
  .refine((quote) => quote.elementTitle === SD_CP_ELEMENT_NAMES[quote.elementId], {
    path: ["elementTitle"],
    message: "must be the name of the element identified by elementId",
  });

/** One CP item code with its short reference label (bagian 4). */
export const sdCpItemSchema = z
  .object({
    code: sdCpCodeSchema,
    elementId: sdElementIdSchema,
    label: nonEmptyString.describe(
      "The item's wording, a verbatim cut of the element's quotation.",
    ),
  })
  .strict()
  .refine((item) => item.code.startsWith(`C-${item.elementId}-`), {
    path: ["code"],
    message: "must start with C-<elementId>- matching this item's own elementId",
  });

export const sdCpElementsFileSchema = z
  .object({
    ...sdProvenanceShape,
    quotes: z.array(sdCpQuoteSchema).min(1),
    items: z.array(sdCpItemSchema).min(1),
  })
  .strict()
  .superRefine((file, ctx) => {
    const quoteElements = new Set(file.quotes.map((quote) => quote.elementId));
    if (quoteElements.size !== file.quotes.length) {
      ctx.addIssue({
        code: "custom",
        path: ["quotes"],
        message: "each element may have only one quotation",
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
      if (!quoteElements.has(item.elementId)) {
        ctx.addIssue({
          code: "custom",
          path: ["items", index],
          message: `no quotation exists for element ${item.elementId}`,
        });
      }
    });
  })
  .describe("The full contents of `data/sd-coding/cp-elements.json`.");

export type SdCpElementsFile = z.infer<typeof sdCpElementsFileSchema>;
