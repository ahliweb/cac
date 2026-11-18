/**
 * Contract of a per-programme fidelity module (ADR-0008, issue #140): a
 * check that the programme's encoded corpus (`data/<id>/`) still equals its
 * approved source document cell by cell. Distinct from `osn validate`,
 * which checks the data on its own. A programme registers one in the table
 * `src/cli/program-registry.ts`; `bun run check:fidelity` runs them.
 */

/** One mismatch between the source document and the data. */
export interface FidelityProblem {
  readonly context: string;
  readonly expected: string;
  readonly actual: string;
}

/** The outcome of one programme's fidelity run. */
export interface FidelityRun {
  /** Every mismatch found (not just the first); empty when the data matches. */
  readonly problems: readonly FidelityProblem[];
  /** The text to print: an OK line or the numbered mismatch list. */
  readonly message: string;
}

export interface FidelityModule {
  /** Compares the programme's data under `repoRoot` (default: this repository) with its source document. */
  readonly run: (repoRoot?: string) => Promise<FidelityRun>;
}
