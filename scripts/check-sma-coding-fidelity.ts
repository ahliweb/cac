/**
 * `bun run check:sma-fidelity` -- the transcription-fidelity check of the
 * `sma-coding` corpus against `docs/programs/sma-coding/silabus.md`. The
 * logic lives in `src/cli/fidelity/sma-coding.ts` (moved there by issue #140
 * so `bun run check:fidelity` can run it from the programme table); this
 * script keeps the original command (the tests import the module directly,
 * so this entry point is not loaded in-process). Exits 0 when every field
 * matches, 1 listing every mismatch.
 */

import { smaCodingFidelity } from "../src/cli/fidelity/sma-coding";

if (import.meta.main) {
  const { problems, message } = await smaCodingFidelity.run();
  console.log(message);
  process.exit(problems.length === 0 ? 0 : 1);
}
