/**
 * Schema for `data/tk-coding/goals.json`: the principles (silabus bagian
 * 2.1) and the end-of-TK-B goals (bagian 2.2). `cpRelationNote` carries the
 * syllabus's statement that the goals overlap the CP and do not fulfil it.
 */

import { z } from "zod";
import { nonEmptyString } from "./common";
import { tkProvenanceShape } from "./tk-common";

const orderSchema = z.number().int().positive();

export const tkPrincipleSchema = z
  .object({
    order: orderSchema,
    title: nonEmptyString.describe(
      'The bold principle title, verbatim, e.g. "Bermain adalah belajar."',
    ),
    text: nonEmptyString.describe("The rest of the principle, verbatim."),
  })
  .strict();

export const tkGoalSchema = z
  .object({
    order: orderSchema,
    text: nonEmptyString.describe("The goal, verbatim."),
  })
  .strict();

const sequential = (items: ReadonlyArray<{ order: number }>) =>
  items.every((item, index) => item.order === index + 1);

export const tkGoalsFileSchema = z
  .object({
    ...tkProvenanceShape,
    principles: z.array(tkPrincipleSchema).min(1),
    goalsIntro: nonEmptyString.describe(
      'The line that introduces the goals ("Pada akhir TK B ..."), verbatim.',
    ),
    goals: z.array(tkGoalSchema).min(1),
    cpRelationNote: nonEmptyString.describe(
      "The closing sentence of bagian 2.2: the goals are an overlap with the CP, not fulfilment of it.",
    ),
  })
  .strict()
  .superRefine((file, ctx) => {
    if (!sequential(file.principles)) {
      ctx.addIssue({
        code: "custom",
        path: ["principles"],
        message: "orders must be 1..n in sequence",
      });
    }
    if (!sequential(file.goals)) {
      ctx.addIssue({ code: "custom", path: ["goals"], message: "orders must be 1..n in sequence" });
    }
  })
  .describe("The full contents of `data/tk-coding/goals.json`.");

export type TkGoalsFile = z.infer<typeof tkGoalsFileSchema>;
