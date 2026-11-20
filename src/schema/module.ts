/**
 * Schema for the learning-module index, `data/<program>/modules.json`
 * (ADR-0007, issue #54).
 *
 * A *module* is **authored** learning content (explanations, worked
 * examples, practice tasks written by the team), kept apart from the
 * transcribed corpus. This file is only the index: each entry points at a
 * Markdown body under `content/<program>/modules/` and carries the review
 * lifecycle `draf` -> `ditinjau` -> `disetujui` (plus `ditarik`).
 *
 * Approval is recorded by role, never by a personal name (data
 * minimisation, ADR-0004): `review` is required exactly when the status is
 * `disetujui` and forbidden otherwise. Only a human may set `disetujui`
 * (ADR-0007); the schema can only make the record complete, not prove who
 * wrote it.
 *
 * Per the layering rules in `docs/architecture/README.md`, this module only
 * describes shape and constraints; it never imports from `src/domain/`.
 */

import { z } from "zod";
import { nonEmptyString, slugSchema } from "./common";
import { addLearnerSheetIssues } from "./learner-sheet-rules";
import { MAX_WEEK, MIN_WEEK } from "./week";

/** The index file's name inside a programme's corpus directory; optional per programme. */
export const MODULES_FILE_NAME = "modules.json";

/** The lifecycle states of a module (ADR-0007). */
export const MODULE_STATUSES = ["draf", "ditinjau", "disetujui", "ditarik"] as const;
export const moduleStatusSchema = z.enum(MODULE_STATUSES);
export type ModuleStatus = z.infer<typeof moduleStatusSchema>;

const isoDateSchema = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, 'must be an ISO date "YYYY-MM-DD"')
  .refine((value) => {
    const parsed = new Date(`${value}T00:00:00Z`);
    return !Number.isNaN(parsed.getTime()) && parsed.toISOString().slice(0, 10) === value;
  }, "must be a real calendar date");

/** The recorded human approval of a module. A role, never a person's name. */
export const moduleReviewSchema = z
  .object({
    approvedOn: isoDateSchema.describe("The date a human approved the module."),
    reviewerRole: nonEmptyString.describe(
      'The reviewer\'s role (for example "pemilik" or "mentor"), not a personal name.',
    ),
  })
  .strict();

/**
 * The three optional own-status learner-sheet fields (ADR-0011) of the five programmes whose modules
 * learners read directly; the shared rule is `addLearnerSheetIssues` (`./learner-sheet-rules`).
 * `tk-coding` and `sd-coding` do not spread this (their sheet follows the module status).
 */
export const ownStatusLearnerSheetShape = {
  learnerSheetPath: nonEmptyString
    .optional()
    .describe(
      "`content/<program>/lembar/<id>.md` (the printable worksheet), when the module has one.",
    ),
  learnerSheetStatus: moduleStatusSchema
    .optional()
    .describe(
      "The worksheet's own review status; required exactly when `learnerSheetPath` is present.",
    ),
  learnerSheetReview: moduleReviewSchema
    .optional()
    .describe("Required when `learnerSheetStatus` is `disetujui`, forbidden otherwise."),
};

/** An explicit reference: a title and an https URL (shared with the `sma-coding` module schema). */
export const moduleExplicitReferenceSchema = z
  .object({
    title: nonEmptyString,
    url: z
      .string()
      .url()
      .refine((value) => value.startsWith("https://"), "must be an https URL"),
  })
  .strict();

/** A reference: an id in the programme's references register, or an explicit title + https URL. */
export const moduleReferenceSchema = z.union([
  z.object({ refId: nonEmptyString }).strict(),
  moduleExplicitReferenceSchema,
]);
export type ModuleReference = z.infer<typeof moduleReferenceSchema>;

const CONTENT_PATH_PATTERN = /^content\/([a-z0-9]+(?:-[a-z0-9]+)*)\/modules\/([a-z0-9-]+)\.md$/;

/** Parses a `contentPath` into its programme segment and file id, or `null` if malformed. */
export function parseContentPath(path: string): { program: string; id: string } | null {
  const match = CONTENT_PATH_PATTERN.exec(path);
  return match === null ? null : { program: match[1] as string, id: match[2] as string };
}

/**
 * Whether every OSN module must have a worksheet (`learnerSheetPath`, ADR-0011). `true` since every
 * OSN module has a worksheet (#285).
 */
export const OSN_LEARNER_SHEET_REQUIRED = true;

/** One module-index entry. */
export const moduleSchema = z
  .object({
    id: slugSchema.describe("Stable module id; also the Markdown file's base name."),
    title: nonEmptyString,
    topicFamilies: z
      .array(slugSchema)
      .min(1)
      .describe("Ids of the topic families the module covers (checked by `osn validate`)."),
    weeks: z
      .array(z.number().int().min(MIN_WEEK).max(MAX_WEEK))
      .optional()
      .describe("Week numbers the module supports (checked by `osn validate`)."),
    audience: z.literal("siswa"),
    language: z.literal("id"),
    status: moduleStatusSchema,
    review: moduleReviewSchema
      .optional()
      .describe("Required when status is `disetujui`, forbidden otherwise."),
    references: z.array(moduleReferenceSchema).min(1),
    contentPath: nonEmptyString.describe("`content/<program>/modules/<id>.md`."),
    ...ownStatusLearnerSheetShape,
  })
  .strict()
  .refine((module) => (module.status === "disetujui") === (module.review !== undefined), {
    path: ["review"],
    message:
      "`review` (approvedOn + reviewerRole) is required when status is `disetujui` and forbidden otherwise (ADR-0007)",
  })
  .refine(
    (module) => {
      const parsed = parseContentPath(module.contentPath);
      return parsed !== null && parsed.id === module.id;
    },
    {
      path: ["contentPath"],
      message: 'must be "content/<program>/modules/<id>.md" with <id> equal to the module id',
    },
  )
  .superRefine((module, ctx) => {
    const parsed = parseContentPath(module.contentPath);
    // The sheet lies in the same programme segment as the module body (`content/<program>/lembar/<id>.md`).
    addLearnerSheetIssues(module, ctx, {
      programId: parsed?.program ?? "osn",
      required: OSN_LEARNER_SHEET_REQUIRED,
    });
  })
  .refine((module) => new Set(module.topicFamilies).size === module.topicFamilies.length, {
    path: ["topicFamilies"],
    message: "topic family ids must be unique",
  })
  .refine(
    (module) => module.weeks === undefined || new Set(module.weeks).size === module.weeks.length,
    { path: ["weeks"], message: "week numbers must be unique" },
  );
export type Module = z.infer<typeof moduleSchema>;

/** The whole `data/<program>/modules.json` file. */
export const modulesFileSchema = z
  .object({
    modules: z.array(moduleSchema),
  })
  .strict()
  .refine((file) => new Set(file.modules.map((module) => module.id)).size === file.modules.length, {
    path: ["modules"],
    message: "module ids must be unique",
  })
  .describe("The full contents of `data/<program>/modules.json`: the learning-module index.");
export type ModulesFile = z.infer<typeof modulesFileSchema>;
