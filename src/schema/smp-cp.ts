/**
 * Schema for `data/smp-coding/cp-elements.json`: the Capaian Pembelajaran
 * (CP) quotations of Fase D (silabus bagian 1.2 and 1.3) and the CP item
 * codes the syllabus uses (bagian 1.4). Two official texts are quoted: the
 * CP Informatika (`D-*` codes) and the CP Koding dan Kecerdasan Artifisial
 * (`DK-*` codes).
 */

import { z } from "zod";
import { nonEmptyString } from "./common";
import {
  SMP_CP_ELEMENT_NAMES,
  SMP_CP_FAMILY_ELEMENTS,
  SMP_CP_FAMILY_PREFIX,
  smpCpCodeSchema,
  smpCpElementIdSchema,
  smpCpFamilySchema,
  smpProvenanceShape,
} from "./smp-common";

/** One CP quotation: a text's wording for one element, verbatim from the source. */
export const smpCpQuoteSchema = z
  .object({
    family: smpCpFamilySchema,
    elementId: smpCpElementIdSchema,
    elementTitle: nonEmptyString.describe("The element's name as printed in the syllabus."),
    guideNumber: z
      .string()
      .regex(/^\d+\.\d+$/, 'must look like "2.1"')
      .describe("The heading number the syllabus prints before the element name."),
    text: nonEmptyString.describe("The CP quotation, verbatim (whitespace normalised)."),
  })
  .strict()
  .superRefine((quote, ctx) => {
    if (!SMP_CP_FAMILY_ELEMENTS[quote.family].includes(quote.elementId)) {
      ctx.addIssue({
        code: "custom",
        path: ["elementId"],
        message: `the ${quote.family} CP has no element ${quote.elementId}`,
      });
    }
    if (quote.elementTitle !== SMP_CP_ELEMENT_NAMES[quote.elementId]) {
      ctx.addIssue({
        code: "custom",
        path: ["elementTitle"],
        message: "must be the name of the element identified by elementId",
      });
    }
  });

/** One CP item code with its short reference label (bagian 1.4). */
export const smpCpItemSchema = z
  .object({
    code: smpCpCodeSchema,
    family: smpCpFamilySchema,
    elementId: smpCpElementIdSchema,
    label: nonEmptyString.describe("The item's short reference text, verbatim."),
  })
  .strict()
  .refine(
    (item) => item.code.startsWith(`${SMP_CP_FAMILY_PREFIX[item.family]}${item.elementId}-`),
    {
      path: ["code"],
      message:
        'must start with the family prefix ("D-" or "DK-") and <elementId>- matching this item',
    },
  );

export const smpCpElementsFileSchema = z
  .object({
    ...smpProvenanceShape,
    quotes: z.array(smpCpQuoteSchema).min(1),
    items: z.array(smpCpItemSchema).min(1),
  })
  .strict()
  .superRefine((file, ctx) => {
    const quoteKeys = new Set(file.quotes.map((quote) => `${quote.family}/${quote.elementId}`));
    if (quoteKeys.size !== file.quotes.length) {
      ctx.addIssue({
        code: "custom",
        path: ["quotes"],
        message: "each (CP text, element) pair may have only one quotation",
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
      if (!quoteKeys.has(`${item.family}/${item.elementId}`)) {
        ctx.addIssue({
          code: "custom",
          path: ["items", index],
          message: `no quotation exists for the ${item.family} CP, element ${item.elementId}`,
        });
      }
    });
  })
  .describe("The full contents of `data/smp-coding/cp-elements.json`.");

export type SmpCpElementsFile = z.infer<typeof smpCpElementsFileSchema>;
