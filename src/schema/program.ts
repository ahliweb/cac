/**
 * Schema for the programme registry, `data/programs.json` (ADR-0006).
 *
 * A *programme* is one curriculum with its own source document, syllabus
 * version and date, and corpus directory `data/<id>/`. The registry lists
 * only programmes whose corpus exists; `osn validate` checks that every
 * entry's version and date agree with the files of its corpus (ADR-0005,
 * applied per programme) and that its source document exists.
 *
 * Per the layering rules in `docs/architecture/README.md`, this module only
 * describes shape and constraints; it never imports from `src/domain/`.
 */

import { z } from "zod";
import { nonEmptyString, slugSchema } from "./common";

/** A programme ID: lower-case kebab-case, e.g. `osn` or `sma-coding`. */
export const programIdSchema = slugSchema.describe(
  'A programme ID: lower-case kebab-case, e.g. "osn" or "sma-coding".',
);

/** One registered programme. */
export const programSchema = z
  .object({
    id: programIdSchema,
    name: nonEmptyString.describe("The programme's full, official source-document title."),
    sourceDocument: nonEmptyString
      .refine((path) => !path.startsWith("/") && !path.split("/").includes(".."), {
        message: "must be a repository-relative path with no leading slash and no `..` segment",
      })
      .describe(
        "Repository-relative path of the programme's source document " +
          '(e.g. the PDF under "docs/"). `osn validate` checks the file exists.',
      ),
    syllabusVersion: nonEmptyString.describe(
      'The source document\'s own version string, e.g. "2.0". Must equal the ' +
        "`syllabusVersion` carried by every file of the programme's corpus (ADR-0005).",
    ),
    syllabusDate: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, 'must be an ISO date "YYYY-MM-DD"')
      .describe(
        "The source document's own revision date. Must equal the `syllabusDate` " +
          "carried by every file of the programme's corpus (ADR-0005).",
      ),
    corpusDir: nonEmptyString.describe(
      'Repository-relative corpus directory; always "data/<id>" (ADR-0006).',
    ),
  })
  .strict()
  .refine((program) => program.corpusDir === `data/${program.id}`, {
    path: ["corpusDir"],
    message: 'must equal "data/<id>" for the programme\'s own id (ADR-0006)',
  });

/** The whole `data/programs.json` file. */
export const programRegistrySchema = z
  .object({
    programs: z
      .array(programSchema)
      .min(1)
      .describe("Every registered programme; each needs an existing corpus directory."),
  })
  .strict()
  .refine(
    (registry) =>
      new Set(registry.programs.map((program) => program.id)).size === registry.programs.length,
    { path: ["programs"], message: "programme ids must be unique" },
  )
  .describe("The full contents of `data/programs.json`: the programme registry (ADR-0006).");

export type Program = z.infer<typeof programSchema>;
export type ProgramRegistry = z.infer<typeof programRegistrySchema>;
