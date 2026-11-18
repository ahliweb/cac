# kurikulum-informatika

Curriculum-as-code for the **Silabus Operasional Pembinaan OSN Informatika
2026** (v2.0, 4 September 2026): a typed, validated, versioned
representation of the 28-week operational syllabus, plus the governance
documentation that syllabus mandates.

> **Non-affiliation notice**
>
> The source document states, verbatim: *"Dokumen kurikulum independen.
> Bukan dokumen resmi Puspresnas, IA TOKI, atau IOI."* — this is an
> independent curriculum document and **not** an official document of
> **Puspresnas**, **IA TOKI**, or the **IOI** (International Olympiad in
> Informatics). This repository, as a machine-readable encoding of that
> document, inherits that non-affiliated status. It is authored by **Tim
> Riset AhliKoding.com dari AhliWeb.com** and is not published, endorsed,
> or reviewed by Puspresnas, IA TOKI, or the IOI.

## Panduan penggunaan (Bahasa Indonesia)

Panduan berorientasi tugas per peran ada di [`docs/panduan/`](docs/panduan/README.md):

- [Mulai cepat](docs/panduan/mulai-cepat.md): pemasangan dan pemeriksaan pertama.
- [Mentor OSN](docs/panduan/mentor-osn.md): kalender kohort, rencana sesi, lembar checkpoint, laporan KPI.
- [Guru SMA](docs/panduan/guru-sma.md): program `sma-coding`, silabus, data, kebutuhan lab.
- [Siswa](docs/panduan/siswa.md): lembar belajar, modul, kebijakan hint.
- [Pemilik dan peninjau](docs/panduan/pemilik-peninjau.md): review konten, keputusan, rilis.
- [Kontributor](docs/panduan/kontributor.md): alur issue sampai PR.

## What this repository is not

- **Not a judge.** It does not compile, run, or score submitted code.
- **Not an LMS.** It does not deliver lessons, track enrolment, or manage
  cohorts.
- **Not a student data store.** It holds no learner personal data. Sample
  data used anywhere in this repository is synthetic.

What it *is*: a schema, domain model, CLI, and rendering pipeline that
turn the syllabus's structure — the 28-week programme, the ten official
topic families, phase gates, assessment weights, mentor SOPs — into
version-controlled, testable artefacts.

## Quick start

Prerequisites: [Bun](https://bun.sh) (the project pins `1.4.4` in CI —
see `.github/workflows/ci.yml`).

```sh
bun install
bun run format:check
bun run lint
bun run assist:check
bun run typecheck
bun test
```

## Repository map

| Path | Contents |
| --- | --- |
| `src/schema/` | Zod schemas for curriculum data — the single source of truth for both runtime validation and inferred static types (ADR-0003). |
| `src/domain/` | Domain model / business rules over parsed curriculum data: KPI engine, decision playbooks, cohort planning, learning records, and more. |
| `src/cli/` | The `osn` CLI's command handlers (`validate`, `plan`, `render`, `report`, `privacy-check`, `checklist`) and dispatcher. |
| `src/render/` | Pure functions that turn domain data into mentor-facing Markdown artefacts (weekly plan, checkpoint sheet, SOP card, checklist) and the student learner sheet. |
| `src/index.ts` | Package entrypoint, built by `bun run build` into `dist/`. |
| `content/` | Authored learning-module bodies (`content/<program>/modules/<id>.md`, ADR-0007), indexed by `data/<program>/modules.json`. Always marked `DRAF` until a human approves them. |
| `data/programs.json` | The programme registry (ADR-0006): one entry per programme, validated by `src/schema/program.ts`. |
| `data/osn/` | The OSN programme corpus: 22 schema-validated JSON files plus the optional learning-module index `modules.json` (topic families, weeks, gates, references, assessment model, KPI definitions, playbooks, and more) plus `samples/` (synthetic learning records). The numbers differ by command on purpose: `osn validate` reports 22 files (the 22 corpus files it validates against schemas; `modules.json` is the optional index and is not counted), while `osn privacy-check` scans every `.json`/`.jsonl` under `data/` -- 33 files today: `data/programs.json` (1) + the 23 JSON files in `data/osn/` (22 + `modules.json`) + `data/osn/samples/learning-records.sample.jsonl` (1) + the 8 JSON files in `data/sma-coding/` (the 7 corpus files `osn validate` counts + its `modules.json`). |
| `data/sma-coding/` | The SMA coding programme corpus: seven schema-validated JSON files transcribed from the approved `docs/programs/sma-coding/silabus.md` v1.2 (CP elements, tracks A to E with their start class and relation to the CP, structure, 364-week track plan, the 7-week shared grade-X foundation block `FND-X1`, CP mapping with the enrichment links of the out-of-CP tracks D and E, OSN bridge), plus the optional module index `modules.json`. |
| `tests/unit/` | Fast, isolated tests, one module at a time. |
| `tests/integration/` | Cross-module tests (requirements-register verification, full-corpus and CLI end-to-end tests). |
| `docs/development/` | Engineering process docs: testing, CI/CD, releasing. |
| `docs/architecture/` | System architecture overview, repository map, and Architecture Decision Records (`adr/`). |
| `docs/requirements/` | The requirements register and its traceability matrices. |
| `docs/cli/` | The `osn` CLI command reference. |
| `docs/panduan/` | Panduan penggunaan berbahasa Indonesia per peran (mentor OSN, guru SMA, siswa, pemilik/peninjau, kontributor). |
| `docs/governance/` | Privacy policy, security policy, and incident-response procedure. |
| `docs/operations/` | The operational runbook and syllabus-check procedure. |
| `docs/silabus/` | The faithful Markdown transcription of the source syllabus PDF. |
| `docs/*.pdf` | The source syllabus document itself. |
| `docs/programs/` | Source documents of other programmes (ADR-0006). `sma-coding/` holds the SMA coding syllabus (grades X–XII): v1.2 approved by the owner on 2026-11-19 for five tracks — C++ (A), JS/TS/Bun/awcms-one (B), IoT/robotics (C), AI and data analysis (D, outside the CP wording) and quantum computing (E, grades XI–XII only, also outside the CP wording); v1.1 on 2026-11-19 and v1.0 on 2026-11-18. |
| `.github/workflows/` | CI pipeline (`ci.yml`). |
| `.github/ISSUE_TEMPLATE/` | Bug, feature, and curriculum-change issue forms. |
| `.changeset/` | Pending changesets (see `docs/development/releasing.md`). |
| `.claude/agents/` | Claude Code executor subagents used by the orchestrator (see `AGENTS.md`). |

See `docs/architecture/repository-map.md` for the exhaustive,
directory-by-directory description.

## Command reference

All commands are run with `bun run <script>` (or directly, e.g. `bun
test`). This table matches `package.json` exactly.

| Command | Runs | Notes |
| --- | --- | --- |
| `bun install` | Install dependencies | — |
| `bun run typecheck` | `tsc --noEmit` | — |
| `bun run lint` | `biome lint .` | — |
| `bun run assist:check` | `biome check --formatter-enabled=false --linter-enabled=false .` | Enforces import organization. Neither `lint` nor `format:check` covers Biome's assist actions. |
| `bun run lint:fix` | `biome lint --write .` | — |
| `bun run format` | `biome format --write .` | — |
| `bun run format:check` | `biome format .` | Check-only, no rewrite. |
| `bun test` | `bun test` | Full test suite. |
| `bun run test:coverage` | `bun test --coverage` | Enforces the coverage gate in `bunfig.toml` (see `docs/development/testing.md`). |
| `bun run build` | `bun build ./src/index.ts --outdir dist --target bun` | — |
| `bun run validate` | `osn validate` | Validates `data/programs.json` and the corpus of every registered programme (or one, with `--program <id>`): schema, structural invariants, referential integrity, registry version agreement. Exits 0 clean / 1 on any finding. See `docs/cli/README.md`. |
| `bun run privacy-check` | `osn privacy-check` | Recursively scans `data/` for direct-identifier-shaped keys (GR-04). Exits 0 clean / 1 on any finding. See `docs/cli/README.md`. |
| `bun run check:requirements` | `bun run scripts/check-requirements.ts` | Verifies `docs/requirements/register.md` and `traceability.md` are internally consistent and exhaustive. |
| `bun run check:checklist-fidelity` | `bun run scripts/check-checklist-fidelity.ts` | Verifies the §14.1/§14.2 data in `data/osn/` matches the source syllabus verbatim. |
| `bun run check:module-code` | `bun run scripts/check-module-code.ts` | Compiles every `cpp` block of `content/**/modules/*.md` with `g++ -std=c++17 -fsyntax-only` (never runs them). Exits 1 on a failing block or a missing `g++`. |
| `bun run check:sma-fidelity` | `bun run scripts/check-sma-coding-fidelity.ts` | Verifies `data/sma-coding/*.json` matches the tables of the approved `docs/programs/sma-coding/silabus.md` cell by cell. Exits 1 on any drift. |
| `bun run changeset` | `changeset` | Interactive changeset creation. See `docs/development/releasing.md`. |
| `bun run version` | `changeset version` | Consumes changesets into `CHANGELOG.md` and bumps `package.json` version. |

## Roadmap

Milestones as tracked in the GitHub repository (`ahliweb/osn`):

| Milestone | Scope | Status |
| --- | --- | --- |
| **M1: Engineering Foundation** | Repo scaffolding, toolchain, CI/CD, release engineering, agent docs | Complete |
| **M2: Curriculum Corpus** | PDF to Markdown, requirements register, architecture docs | Complete |
| **M3: Curriculum Data Model** | Typed, validated machine-readable curriculum datasets | Complete |
| **M4: Pedagogy & Assessment** | Session template, SOP, hint policy, rubric, KPI, playbooks | Complete |
| **M5: CLI & Generators** | `osn` CLI: validate, plan, render, report, checklist | Complete |
| **M6: Governance & Release** | Privacy, security, ISO mapping, runbook, v1.0.0 | Complete (v1.0.0, then v1.1.0). |
| **M7: Multi-program Foundation** | ADR-0006/0007, programme registry, `data/<program>/`, `--program` | Complete (v2.0.0). |
| **M8: OSN Learner Materials** | Learner sheet, learning modules | Complete — learner sheet and module framework shipped in v2.0.0; all ten modules exist since v2.1.0 ([#55](https://github.com/ahliweb/osn/issues/55)) and were approved by the programme owner on 2026-11-18. |
| **M9: SMA Coding Programme** | SMA coding syllabus (grades X–XII) and its corpus | In progress — syllabus v1.2 (tracks A, B, C, D and E, with the shared grade-X foundation block; tracks D and E are enrichment outside the CP wording and never counted as covering a CP item) approved 2026-11-19 in `docs/programs/sma-coding/` and encoded into `data/sma-coding/` ([#52](https://github.com/ahliweb/osn/issues/52), [#92](https://github.com/ahliweb/osn/issues/92), [#68](https://github.com/ahliweb/osn/issues/68), [#84](https://github.com/ahliweb/osn/issues/84), [#88](https://github.com/ahliweb/osn/issues/88); v1.0 shipped in v2.1.0 and v1.1 in v2.2.0, v1.2 in v2.3.0; `osn validate --program sma-coding`; `osn plan --track` and `osn render lembar-siswa --week <week-code>` support the programme ([#77](https://github.com/ahliweb/osn/issues/77)), while `render weekly`, `render checkpoint` and `render sop`, `report` and `checklist` exit 2). Remaining: modules for tracks C, D and E do not exist yet, and every sma-coding module awaits owner review. Done on 2026-11-19: the module index schema ([#106](https://github.com/ahliweb/osn/issues/106)) and 29 draft sma-coding modules (grade-X foundation [#107](https://github.com/ahliweb/osn/issues/107), computational maths [#87](https://github.com/ahliweb/osn/issues/87), cloud [#89](https://github.com/ahliweb/osn/issues/89), companion modules [#69](https://github.com/ahliweb/osn/issues/69) and two cross-track companion modules closing the CP gap F-LD-d/e for track A [#105](https://github.com/ahliweb/osn/issues/105)), all `draf` until the owner reviews them. |

See `gh issue list --repo ahliweb/osn --state all` (or the
[Issues](https://github.com/ahliweb/osn/issues) tab) for the individual
issues backing each milestone.

## Further reading

- [`docs/development/testing.md`](docs/development/testing.md) — testing strategy and coverage gate.
- [`docs/development/ci-cd.md`](docs/development/ci-cd.md) — what CI runs and why.
- [`docs/development/releasing.md`](docs/development/releasing.md) — changesets, versioning, release procedure.
- [`AGENTS.md`](AGENTS.md) — instructions for AI coding agents working in this repository.
- [`CONTRIBUTING.md`](CONTRIBUTING.md) — how to contribute, including proposing curriculum changes.
- Source document: [`docs/Silabus_Operasional_OSN_Informatika_2026_Siap_Pakai_AhliKoding_AhliWeb.pdf`](docs/Silabus_Operasional_OSN_Informatika_2026_Siap_Pakai_AhliKoding_AhliWeb.pdf) — Silabus Operasional Pembinaan OSN Informatika 2026, v2.0, 4 September 2026, Tim Riset AhliKoding.com dari AhliWeb.com.

## Licence

[MIT](LICENSE) — Copyright (c) 2026 Tim Riset AhliKoding.com — AhliWeb.com.

The MIT licence covers the software (schema, domain model, CLI, tooling)
in this repository. It does not by itself grant rights over the source
syllabus document's own content beyond what the document's authors have
made available here; see the source PDF for its own terms.
