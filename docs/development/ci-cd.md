# CI/CD pipeline

§13 ("Quality Review") of the operational syllabus requires an audit gate
before an artefact is used. Mechanically, that means every push and every
pull request runs the full local quality suite in CI, and nothing merges
without it passing.

## What runs, and in what order

The workflow is defined in `.github/workflows/ci.yml`. It has a single job,
`quality`, that runs the following steps in sequence on `ubuntu-latest`:

1. **Checkout** — `actions/checkout@v7`.
2. **Set up Bun** — `oven-sh/setup-bun@v2`, pinned to an exact Bun version
   (see "Action and tool pinning policy" below).
3. **Install dependencies** — `bun install --frozen-lockfile`. The frozen
   lockfile means CI fails if `bun.lock` is out of sync with `package.json`,
   rather than silently resolving different versions than local development.
4. **Check formatting** — `bun run format:check` (Biome, check-only — does
   not rewrite files).
5. **Lint** — `bun run lint` (Biome).
6. **Check import organization** — `bun run assist:check` (Biome assist
   actions only, with the formatter and linter disabled so a failure here is
   unambiguously about import order and nothing else).
7. **Typecheck** — `bun run typecheck` (`tsc --noEmit`).
8. **Test with coverage** — `bun run test:coverage` (`bun test --coverage`).
   This also enforces the coverage gate configured in `bunfig.toml` — see
   `docs/development/testing.md`.
9. **Build** — `bun run build` (`bun build ./src/index.ts --outdir dist
   --target bun`).
10. **Validate curriculum data** — `bun run validate` (`osn validate`).
   Parses `data/programs.json` and every registered programme's `data/<program>/*.json` file against its schema, checks
   the fixed structural invariants (28 weeks, 7 gates, 10 topic families,
   41 references, and so on), and checks referential integrity across the
   corpus (week → topic family, week checkpoint numbering ↔ gate weeks,
   assessment-bank kind → competition stage, every `Rnn` citation → the
   reference register), and that each registry entry's version/date match its corpus — see `docs/cli/README.md` for the full command
   reference. Exits `0` on a clean corpus, `1` if any finding exists.
11. **Validate with the canonical CLI (`cac`)** — `bun src/cli/cac.ts validate`.
    The same validation through the `cac` entry point (`package.json` `bin`,
    IDENTITY-CAC-003). Exits `0` clean, `1` on any finding, `2` on misuse.
12. **Validate with the transitional alias CLI (`osn`)** —
    `bun src/cli/index.ts validate`, with `if: ${{ !cancelled() }}` so it
    still runs when step 11 failed and the run reports both CLIs
    (IDENTITY-CAC-004). Neither step names the repository, so the
    workflow does not depend on the repository's name.
13. **Check requirements register and traceability** —
    `bun run check:requirements`. Besides the FR/TR/OR/ER/GR rules it
    checks `docs/requirements/identity-cac.md` against `register.md` and
    `traceability.md` (every `IDENTITY-CAC-nnn` registered with the same
    statement and traced in the issue matrix).
14. **Ensure python3 is available** — `python3 --version`. The module
    check parses ```` ```python ```` blocks with it (`ubuntu-latest` ships
    it); this step names a missing interpreter before the check does.
15. **Check module code examples** — `bun run check:module-code`
    (`scripts/check-module-code.ts`). Extracts the fenced blocks of
    `content/**/modules/*.md` and of the learner sheets
    `content/**/lembar/*.md` (ADR-0011) and checks them; nothing is executed (this
    repository is not a judge, ADR-0004). ```` ```cpp ```` runs
    `g++ -std=c++17 -fsyntax-only`; ```` ```arduino ```` runs the same
    compiler with `#include "Arduino.h"` against the mock header in
    `scripts/fixtures/arduino-mock/` (syntax and types against a mock API,
    not proof of board behaviour); ```` ```python ```` runs
    `python3 -I -c "import ast,sys; ast.parse(sys.stdin.read())"`. A block
    with `setengah-jadi` in its info string (e.g. ```` ```cpp setengah-jadi ````)
    is skipped and counted. Fails if a block does not pass, and also if
    `g++` or `python3` is not installed. Exits `0` clean, `1` otherwise.
16. **Check learner assets** — `bun run check:learner-assets`
    (`scripts/check-learner-assets.ts`). Validates `content/<program>/gambar/*.svg`
    (well-formed, `viewBox`, no script/raster/external reference, at most
    50 KB) and the image links of `content/<program>/lembar/*.md`; an
    orphan SVG is a warning only. Exits `0` clean, `1` on any error.
17. **Privacy check** — `bun run privacy-check` (`osn privacy-check`,
    GR-04). Recursively scans every `.json`/`.jsonl` file under `data/`
    (including `data/osn/samples/`) for a direct-identifier-shaped key, and
    fails the build if any is found (beyond the documented `"name"`
    tolerance — see `docs/cli/README.md`'s "osn privacy-check" section).
    Runs after `osn validate`, since both are corpus-wide checks over
    `data/`. Exits `0` clean, `1` if any finding exists.

Steps run in this order deliberately: cheaper, faster checks (formatting,
lint, typecheck) fail fast before the more expensive test and build steps
run. Each step is a separate, individually named step (not one shell script)
so that a failure is attributable to a specific check from the GitHub
checks list, without needing to open the log.

## Local checks that are not CI steps

Three `package.json` scripts exist for contributors but are **not** steps of
`.github/workflows/ci.yml`; CI never runs them as commands:

| Script | What it checks | Still guarded in CI through |
| --- | --- | --- |
| `bun run check:checklist-fidelity` | §14.1/§14.2 data against the source syllabus verbatim. | `tests/integration/checklist-fidelity.test.ts`, run by the same step. |
| `bun run check:fidelity [--program <id>]` | Every registered programme's data against its approved source document, through the programme table (`src/cli/program-registry.ts`, ADR-0008); today only `sma-coding` has a fidelity module. | `tests/integration/check-fidelity.test.ts` (the runner and the script) and `tests/integration/sma-coding-fidelity.test.ts`, run by the same step. |
| `bun run check:sma-fidelity` | `data/sma-coding/*.json` cell by cell against `docs/programs/sma-coding/silabus.md`. | `tests/integration/sma-coding-fidelity.test.ts`, run by the same step. |

The test files import the checkers' functions and assert that the committed
documents and data pass, so a drift also fails the `Test with coverage` step.
What CI does not do is run the scripts' own command-line entry points
(argument handling, exit code), so run the script before pushing when you
touch the files it covers. By contrast `bun run check:requirements` (step 13), `bun run check:module-code` (step 15),
`bun run check:learner-assets` (step 16) and `bun run privacy-check` (step 17)
are real CI steps.

## Triggers

The workflow runs on:

- `push` to `main`.
- `pull_request`, for any branch (targeting any base).

This means every PR gets a CI run against its proposed changes, and every
merge to `main` is re-verified on the resulting commit.

## Least-privilege permissions

The workflow sets a top-level `permissions: { contents: read }` block. This
is the minimum needed to check out the repository and run the quality
suite — nothing in this pipeline writes back to the repository, publishes a
release, or touches any other GitHub API surface, so no broader permission
(such as `contents: write`, `pull-requests: write`, or `packages: write`) is
granted anywhere in the workflow. If a future job needs to write (for
example, publishing a release), that permission should be scoped to that
specific job, not added to the top-level block.

## Action and tool pinning policy

- **GitHub Actions are pinned to a major version tag** (e.g. `@v4`,
  `@v2`), not to a full commit SHA and not to a floating `@main` or
  unpinned tag. This tracks the publisher's own compatibility promise for
  that major version (bug fixes and minor features land automatically,
  breaking changes do not) while still being an explicit, auditable
  reference rather than "whatever is newest today."
- **Bun is pinned to an exact version** via `bun-version` on
  `oven-sh/setup-bun@v2` — not a floating range like `latest` or `1.x`.
  Unlike an action's major-version tag, the Bun runtime itself directly
  affects test and build output (coverage engine, bundler, `bun:test`
  behavior all vary by version), so CI must use the same concrete version
  as local development rather than "whatever is newest at run time." The
  version pinned in `.github/workflows/ci.yml` should be kept in sync with
  whatever Bun version the project's contributors are expected to run
  locally; bump it deliberately, not as a side effect of an unrelated
  change.

## Concurrency behavior

The workflow sets:

```yaml
concurrency:
  group: ci-${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: true
```

Every push to the same ref (a branch or a PR head) shares one concurrency
group. When a new run starts for a group that already has a run in
progress, the older run is cancelled. In practice this means pushing two
commits to the same PR in quick succession does not run CI twice to
completion — only the latest push's result matters, so the superseded run
is cancelled rather than wasting runner time.

## Reproducing CI locally

Run the same steps CI runs, in the same order, with one command each:

```sh
bun install --frozen-lockfile && \
bun run format:check && \
bun run lint && \
bun run assist:check && \
bun run typecheck && \
bun run test:coverage && \
bun run build && \
bun run validate && \
bun src/cli/cac.ts validate && \
bun src/cli/index.ts validate && \
bun run check:requirements && \
python3 --version && \
bun run check:module-code && \
bun run check:learner-assets && \
bun run privacy-check
```

To also run the local-only checks above, add `bun run check:checklist-fidelity`, `bun run check:fidelity` and `bun run check:sma-fidelity` to that
list.

Any step that fails locally will fail identically in CI, since CI runs
these exact `package.json` scripts with the same pinned Bun version — there
is no CI-only configuration or hidden step.
