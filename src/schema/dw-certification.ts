/**
 * Schema for `data/dewasa-coding/certification.json`: the certification
 * options of silabus bagian 8.2, the LSP schemes of bagian 5.2 with the
 * SKKNI units they list, and the default option. Owner decision
 * 2026-11-19: no certification is bundled with the programme; an LSP
 * competency test is an optional, self-registered path for track `PRO`.
 */

import { z } from "zod";
import { nonEmptyString, slugSchema } from "./common";
import { dwProvenanceShape, dwSkkniUnitCodeSchema } from "./dw-common";

const optionIdSchema = z.string().regex(/^[A-Z]$/, 'must be a single upper-case letter such as "A"');

export const dwCertificationOptionSchema = z
  .object({
    id: optionIdSchema,
    name: nonEmptyString.describe('The "Opsi" cell after the letter, verbatim.'),
    content: nonEmptyString.describe('The "Isi" cell, verbatim.'),
    advantages: nonEmptyString.describe('The "Kelebihan" cell, verbatim.'),
    disadvantages: nonEmptyString.describe('The "Kekurangan" cell, verbatim.'),
  })
  .strict();

export const dwLspSchemeSchema = z
  .object({
    id: slugSchema,
    name: nonEmptyString,
    unitCodes: z.array(dwSkkniUnitCodeSchema).min(1),
  })
  .strict()
  .refine((scheme) => new Set(scheme.unitCodes).size === scheme.unitCodes.length, {
    path: ["unitCodes"],
    message: "unitCodes must be unique",
  });

export const dwCertificationFileSchema = z
  .object({
    ...dwProvenanceShape,
    options: z.array(dwCertificationOptionSchema).min(1),
    defaultOptionId: optionIdSchema.describe(
      'The option the programme uses as its base ("Rekomendasi: A sebagai dasar").',
    ),
    recommendation: nonEmptyString.describe('The "Rekomendasi" paragraph, whitespace-normalised.'),
    lspSchemes: z.array(dwLspSchemeSchema).min(1),
  })
  .strict()
  .refine((file) => new Set(file.options.map((option) => option.id)).size === file.options.length, {
    path: ["options"],
    message: "option ids must be unique",
  })
  .refine(
    (file) => new Set(file.lspSchemes.map((scheme) => scheme.id)).size === file.lspSchemes.length,
    { path: ["lspSchemes"], message: "LSP scheme ids must be unique" },
  )
  .describe("The full contents of `data/dewasa-coding/certification.json`.");

export type DwCertificationFile = z.infer<typeof dwCertificationFileSchema>;
