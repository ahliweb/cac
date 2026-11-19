# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

Version numbers here (`vX.Y.Z`) track the software in this repository —
schema, domain model, CLI, and tooling. They are independent of each
programme's own syllabus version (`syllabusVersion` / `syllabusDate`), which
tracks that programme's source document and is registered per programme in
`data/programs.json` (ADR-0006). Currently seven programmes are
registered: `osn` at syllabus version `2.0`, dated `2026-09-04`,
`sma-coding` at `1.4.0`, `tk-coding` at `1.0.2`, `sd-coding` at `1.1.0`,
`smp-coding` at `1.2.0`, `kuliah-coding` at `1.2.0` and `dewasa-coding` at
`1.2.0`. See
[`docs/development/releasing.md`](docs/development/releasing.md) for how the
two relate.

## [Unreleased]

Nothing yet.

## [2.5.0] — 2026-11-19

Learning modules for all six coding programmes, alignment of the
inter-programme bridges, source verification of two regulations, and new
automatic checks for module code and learner-sheet assets. **No breaking
changes** — see [`docs/releases/v2.5.0.md`](docs/releases/v2.5.0.md). Every
module is a draft: all 599 modules in `data/<program>/modules.json` have
status `draf`, and none is approved by the owner. The OSN corpus
(transcribed syllabus content) and `docs/silabus/` are unchanged since
v2.4.0.

### Added

- **Learning-module index per programme** ([#124]): `tk-coding`,
  `sd-coding`, `smp-coding`, `kuliah-coding` and `dewasa-coding` may carry
  `data/<id>/modules.json`, each with a schema of its own
  (`src/schema/tk-module.ts`, `sd-module.ts`, `smp-module.ts`,
  `kul-module.ts`, `dw-learning-module.ts`) following `sma-module.ts`. The
  module id is the unit code in lower case; module bodies live in
  `content/<program>/modules/<id>.md`. `osn validate --program <id>` checks
  unit codes, CP, knowledge-area and SKKNI references, prerequisites and
  status against ADR-0007. `osn render modul --program <id>` now works for
  all six programmes; `--lembar` renders the child's sheet for `tk-coding`
  and `sd-coding`. Requirements `FR-39`..`FR-43`.
- **599 draft learning modules** ([#124], owner decision 2026-11-19:
  complete modules, one per week, course or syllabus module), all `draf`:
  - `tk-coding`: 48 modules, each a teacher guide with a separate learner
    sheet without an identity field and an SVG picture.
  - `sd-coding`: 168 modules for grades 1–6, each with a teacher guide,
    learner sheet and SVG picture.
  - `smp-coding`: 84 modules for grades 7–9.
  - `sma-coding`: 210 modules for tracks C (IoT and robotics, 77), D (AI
    and data analysis, 77) and E (quantum computing, 56), in addition to
    the 29 earlier modules (239 in total); the series design is in
    `docs/programs/sma-coding/rancangan-modul-cde.md`. Tracks A and B have
    no weekly modules.
  - `kuliah-coding`: 24 modules, one per course, with a structure per
    meeting.
  - `dewasa-coding`: 36 modules across the four persona tracks and the
    shared module `DW-FND-M1`.
  - Design documents for each series (`docs/programs/<id>/rancangan-modul*.md`)
    and `docs/programs/catatan-tinjauan-modul.md`, a list of points for the
    human reviewer.
- **Inter-programme bridges aligned** ([#177], owner decisions 2026-11-19,
  five atomic changes): `kuliah-coding` to `dewasa-coding` track `PRO`
  (new `data/dewasa-coding/kuliah-bridge.json`, three entry profiles,
  per-module recognition, decision 12.7 option A, requirement `FR-44`),
  `sma-coding` to `kuliah-coding` (recognition per CPMK), `smp-coding` and
  `sma-coding` (new `data/sma-coding/smp-bridge.json` and placement in the
  foundation block, requirement `FR-45`), `sd-coding` and `smp-coding`
  (no assumption about blocks), and `tk-coding` to `sd-coding`. Syllabi
  rose to `sma-coding` 1.4.0, `tk-coding` 1.0.2, `sd-coding` 1.1.0,
  `smp-coding` 1.2.0, `kuliah-coding` 1.2.0 and `dewasa-coding` 1.2.0. The
  design is in `docs/programs/rancangan-jembatan-antarprogram.md`.
- **Cross-programme code check** (ADR-0010, `TR-22`): `osn validate` scans
  the bridge files each programme registers and reports every week, course
  or module code that does not exist in its source corpus.
- **Checks for module code and learner assets** ([#178], `TR-20`, `TR-21`):
  `bun run check:module-code` now also checks ```` ```arduino ```` blocks
  (compiled with `g++ -std=c++17 -fsyntax-only` against the mock
  `scripts/fixtures/arduino-mock/Arduino.h`; syntax and types only) and
  ```` ```python ```` blocks (`ast.parse`, syntax only); a block whose info
  string carries `setengah-jadi` is skipped and counted. New `bun run
  check:learner-assets` checks `content/<program>/gambar/*.svg` and the
  image links of learner sheets. CI gained steps for both.
- **Scientific review of the 29 earlier `sma-coding` modules** ([#125]):
  two draft reports in `docs/programs/sma-coding/tinjauan-modul/`
  (`fondasi-matkom.md`, `cloud-pendamping.md`) with corrections to the
  modules; the modules stay `draf`, no approval recorded.

### Changed

- **Source verification** (owner decision 2026-11-19): the origin of SK
  BSKAP 046/H/KR/2025 is verified and the CP quotations in
  `data/sd-coding/cp-elements.json` and the CP KKA Phase D in
  `data/smp-coding/cp-elements.json` match word for word; the 47 SKKNI
  282/2016 unit codes and titles were matched against the official
  attachment, one title spelling corrected (unit `J.620100.047.01`).
  `src/schema/dw-skkni.ts` gained the verification value
  `judul-cocok-lampiran-resmi`. Patch revisions of the syllabi (`sma-coding`
  1.3.1, `sd-coding` 1.0.2, `smp-coding` 1.1.2, `dewasa-coding` 1.1.2) before
  the bridge revisions above.
- **Stricter module rules** ([#178]): `osn validate` rejects an enrichment
  module of `sma-coding` (tracks D and E) whose `cpItems` is not empty;
  `check:module-code` dedents fenced blocks nested in list items;
  `check:learner-assets` rejects (error, not warning) module or sheet
  content that starts with its own `# ` title.
- **Normalisation** ([#124]): module and sheet bodies no longer carry their
  own title or DRAF banner (155 files) nor a `## Rujukan` section (136
  modules; the renderer adds both from the index); 18 references added to
  the `kuliah-coding` index; prerequisites made consistent; index entries
  sorted in corpus order; the mock `Arduino.h` knows `Serial2`.
- `AGENTS.md`, `README.md`, architecture docs, CLI reference, user guides,
  programme READMEs and the requirements register (109 requirements) were
  synchronised with the module series and the new checks.
- Tests: the real `g++` tests have a 30 second timeout.

### Notes

- All 599 modules are `draf`. Human review of the 29 earlier `sma-coding`
  modules and of the new series is still open ([#125]); a parallel
  evaluation by teachers has not happened.
- Weekly modules for `sma-coding` tracks A and B do not exist.

## [2.4.0] — 2026-11-19

Five more coding programmes (TK, SD, SMP, university, adults) approved and
encoded with a schema of their own each, a per-programme audit and fidelity
table (ADR-0008), two research documents shared by every programme, and an
AI-use policy per programme. **No breaking changes** — see
[`docs/releases/v2.4.0.md`](docs/releases/v2.4.0.md). The OSN corpus
(transcribed syllabus content) is unchanged.

### Added

- **Per-programme audit and fidelity table** ([#140], ADR-0008): `osn
  validate` picks each programme's schemas, audit and module-index checks
  from `PROGRAM_MODULES` in `src/cli/program-registry.ts`; a registered
  programme with no table entry is a finding. New `bun run check:fidelity
  [--program <id>]` runs every programme's cell-by-cell fidelity module
  (`src/cli/fidelity/<id>.ts`); `check:sma-fidelity` still works.
  Requirement `TR-14`.
- **Five programmes approved by the owner on 2026-11-19 and encoded**, each
  with its own `src/schema/<prefix>-*.ts`, pure audit, `data/<id>/` corpus
  and fidelity module (requirements `FR-34`..`FR-38`, `TR-15`..`TR-19`):
  - `tk-coding` ([#127]): 48 weeks; the link to CP Fase Fondasi is an
    interpreted overlap (`meetsCp: false`), never CP fulfilment.
  - `sd-coding` ([#128]): 168 weeks for grades 1–6; only non-reinforcement
    weeks in grades 5–6 fulfil a CP Fase C item, `P-` introductions never do.
  - `smp-coding` ([#129]): 84 weeks, CP Informatika and CP Koding dan KA
    Fase D, an explicit list of uncovered items, optional OSN club.
  - `kuliah-coding` ([#130]): tracks U, I and K, 24 courses, 66 SKS,
    mapping to the 17 CS2023 knowledge areas, empty CPL column for the
    adopting study programme.
  - `dewasa-coding` ([#131]): four persona tracks and shared module
    `DW-FND-M1`, mapped to SKKNI 282/2016 unit titles only.
- **Research documents** (`DRAF`, authored content): cognitive science of
  learning, including the work of Prof. Stella Christie
  (`docs/riset/ilmu-belajar-kognitif.md`, [#133]), and AI in software
  engineering — vibe coding, AI-native engineering, sustainable
  development (`docs/riset/ai-rekayasa-perangkat-lunak.md`, [#139]). DOIs
  and arXiv IDs checked against their registries.
- **AI-use policy per programme** ([#139], requirement `ER-17`): OSN
  coaching in `docs/operations/kebijakan-ai-osn.md`; `sma-coding` v1.3.0
  (learners may use AI under ethics rules, replacing the track D
  "teacher demonstration only" rule), `smp-coding` v1.1.0 (teacher
  demonstration, no learner accounts), `kuliah-coding` v1.1.0 (AI-assisted
  software engineering in `KUL-I-204`, three-level policy with usage log)
  and `dewasa-coding` v1.1.0 (new module `DW-PRO-M13`, track `PRO` 136
  hours). No new weeks or credits were added for this.
- Level map `docs/programs/README.md` (TK → SD → SMP → SMA → university →
  adults) with each programme's status, version and AI policy.

### Changed

- `osn validate` now checks seven programmes; `osn privacy-check` scans 65
  data files.
- The refusal message of `osn plan`, `osn render lembar-siswa`, `render
  weekly`, `report` and `checklist` for a programme other than `osn` names
  only the commands that really support it ([#165]); exit code stays 2.
- Patch revisions of the approved syllabi `tk-coding` 1.0.1, `sd-coding`
  1.0.1, `smp-coding` 1.1.1, `kuliah-coding` 1.1.1 and `dewasa-coding`
  1.1.1 ([#165]): only stale sentences about whether a sibling programme
  exists; no curriculum content, CP code or regulation quotation changed.
- `AGENTS.md`, `README.md`, architecture docs, CLI reference, user guides
  and the requirements register (99 requirements) describe the seven
  programmes.

### Notes

- No learning modules exist yet for `tk-coding`, `sd-coding`,
  `smp-coding`, `kuliah-coding` or `dewasa-coding`. The 29 `sma-coding`
  modules are still `draf` ([#125]); modules for tracks C, D and E do not
  exist yet ([#124]).
- Bridges between neighbouring programmes were drafted before the other
  syllabus existed and are marked to be aligned later.
- Some regulatory copies are marked unverified in the research notes (the
  origin URL of SK BSKAP 046/H/KR/2025, the SKKNI 282/2016 copy).
- The AI research is due for review in May 2027 ([#151]).

## [2.3.0] — 2026-11-19

SMA coding syllabus v1.2 with tracks C, D and E, and two cross-track companion
modules for CP items F-LD-d and F-LD-e. **No breaking changes** — see
[`docs/releases/v2.3.0.md`](docs/releases/v2.3.0.md). The OSN corpus is
unchanged.

### Added

- **SMA coding syllabus v1.2** approved by the programme owner on 2026-11-19
  with every author recommendation and encoded (#123; [#68], [#84], [#88]):
  track C (IoT and robotics, ESP32 with C++ in Arduino style), track D (AI;
  Orange and unplugged activities in grade X, Python in XI–XII) and track E
  (quantum computing, grades XI–XII only). Tracks D and E are enrichment
  outside the CP wording and are never counted as covering a CP item.
  `data/sma-coding/` is at 1.2.0: 5 tracks, 364 track weeks, 26 CP mappings,
  9 enrichment links.
- `tracks.json` gains `startClass` and `cpStatus`; `cp-mapping.json` gains
  per-track `partialTracks` and `enrichmentLinks`; `osn-bridge.json` gains
  `trackBridges` (track C). The audit rejects enrichment tracks in CP
  mappings and grade-X weeks for track E.
- `osn plan --program sma-coding --track C|D|E` and `osn render lembar-siswa
  --week C-…|D-…|E-…`, with an enrichment note for tracks D and E.
- Two draft companion modules closing the CP gap F-LD-d and F-LD-e for track
  A (#122; [#105]): `pendamping-merancang-kebutuhan-sistem` and
  `pendamping-keamanan-lanjut-konektivitas`; 29 draft `sma-coding` modules in
  all.

### Notes

- Every `sma-coding` module is `draf` until the owner reviews it ([#125]);
  modules for tracks C, D and E do not exist yet ([#124]). The weekly plans
  of tracks C, D and E have not been tried in a classroom.

## [2.2.0] — 2026-11-19

SMA coding syllabus v1.1 with the grade-X foundation block, `plan` and
`render lembar-siswa` for `sma-coding`, 27 draft `sma-coding` modules, and the
owner approval of the nine OSN modules. **No breaking changes** — see
[`docs/releases/v2.2.0.md`](docs/releases/v2.2.0.md). The OSN corpus
(transcribed syllabus content) is unchanged.

### Added

- **SMA coding syllabus v1.1** approved by the programme owner on 2026-11-19
  and encoded (#112, #92): the shared grade-X foundation block
  `FND-X1-M1..M7` in the new `data/sma-coding/foundation.json` (schema
  `src/schema/sma-foundation.ts`, week-code prefix `FND`). `osn validate
  --program sma-coding` now checks seven data files, 154 track weeks and 26
  CP mappings; the registry entry moves to `1.1.0`. Drafted first in #104.
- **`osn plan` and `osn render lembar-siswa` for `sma-coding`** (#119, #77):
  `osn plan --program sma-coding --track <A|B>` prints a per-semester plan;
  `osn render lembar-siswa --program sma-coding --week <week-code>` renders
  an Indonesian learner sheet derived only from the validated corpus (CP
  items, OSN bridge, no identity fields). Requirement `FR-33` added.
- **Module index schema for `sma-coding`** (#114, #106):
  `src/schema/sma-module.ts` for `data/sma-coding/modules.json`; `osn
  validate --program sma-coding` checks the index and `osn render modul --id
  <id> --program sma-coding` renders with the same status banner as OSN.
- **27 draft `sma-coding` modules** under `content/sma-coding/modules/`, all
  `draf` and indexed: the grade-X foundation block (#115, #107),
  computational maths (#116, #87), cloud computing (#117, #89) and companion
  digital-literacy modules (#118, #69).
- **Design documents**: companion modules (#100), cloud series (#101) and
  computational maths series (#102), approved by the owner with their
  recommendations on 2026-11-19; drafts of track C IoT and robotics (#108,
  #68), track D AI (#110, #84) and track E quantum (#111, #88), `DRAF` in this
  release (their integration into the syllabus is not part of it).
- **Requirements for the `sma-coding` programme** (#103, #76): `FR-27`..`FR-31`,
  `TR-12`, `TR-13` and `GR-13` with a third traceability matrix; `FR-32`
  for the `sma-coding` module index (#114, #106) and `FR-33` for `plan` and
  `render lembar-siswa` on `sma-coding` (#119, #77).
- **Usage guide** `docs/panduan/` in Indonesian, per role (#96, #94).

### Changed

- **Nine OSN modules approved** by the programme owner on 2026-11-18 (#99,
  #98): all ten OSN modules are now `disetujui` and render without the `DRAF`
  banner. Content unchanged; M8 is complete.
- **`render lembar-siswa` titles related modules "Modul terkait"** for
  `sma-coding` instead of "Modul pendamping", which is a separate series
  (#120).
- **`osn report --by topic|week`** keeps exiting 2 (documented limit) but the
  message now states the reason and the alternative (#109, #95).
- **`check:requirements` is stricter** (#103): it accepts issue references
  above #26 and reports malformed references (`#0`, `#abc`, `26`) instead of
  ignoring them.
- **Biome 2.6** with Markdown excluded from formatting (#97, #44).
- **Stale documents refreshed** (#109, #113, #120, #95): CLI and guide
  examples are now real output; the programme and owner documents match the
  decisions of 2026-11-18 and 2026-11-19. A syllabus check of R1, R2, R3, R7
  and R8 on 2026-11-18 is logged in `data/osn/syllabus-check-log.json`
  (performed by an AI agent; no corpus change).

### Fixed

- **A silently skipped week check** (#114): the module check for `sma-coding`
  read `weeks.json` with the OSN schema and was skipped without a report. It
  now uses each programme's own schema, and a check that cannot run because
  a reference file is missing is reported as a finding.

### Notes

- Authored content stays `draf` until the owner approves it (ADR-0007); the
  27 `sma-coding` modules and the drafts of tracks C, D and E are not
  approved.
- Open: track C ([#68]), track D AI ([#84]), track E quantum ([#88]) and the
  CP gap F-LD-d/e for track A ([#105]) await owner decisions.

## [2.1.0] — 2026-11-18

Nine draft learning modules, the `sma-coding` programme corpus and the owner
approvals behind them. **No breaking changes** — see
[`docs/releases/v2.1.0.md`](docs/releases/v2.1.0.md). The OSN corpus is
unchanged.

### Added

- **`sma-coding` programme corpus** `data/sma-coding/` (#52, #82),
  transcribed from the approved SMA coding syllabus v1.0 (tracks A and B): CP
  quotations and item codes, tracks, programme structure, the 168-week plan,
  the CP-to-week mapping and the bridge to the ten OSN topic families. It is
  registered in `data/programs.json`; new schemas `src/schema/sma-*.ts` and
  `src/domain/sma-corpus-audit.ts` back `osn validate --program sma-coding`,
  which also checks that every OSN topic family id used by the bridge exists
  in the OSN corpus. `osn validate` without `--program` now validates both
  programmes.
- **`bun run check:sma-fidelity`** (also run by `bun test`) compares every
  table cell of the syllabus with the data and fails on drift.
- **Nine learning modules** for the OSN programme, all status `draf` (ADR-0007,
  #55): `aritmetika`, `aturan-berhitung`, `geometri-dasar`, `graph-tree`,
  `logika-bitwise`, `rekursi`, `search-sort`, `strategi-problem-solving` and
  `struktur-data` (#71-#75, #78-#81). They render with the `DRAF` banner until
  the owner approves them.
- **Research on AI books** by Onno W. Purbo as possible references for the
  SMA coding programme (#66, #83): verified titles, unverified items listed
  separately, fit against CP codes and tracks, utilisation options. Docs
  only; links to the books and does not copy their content.

### Changed

- **Pilot module `dasar-pemrograman` is `disetujui`** (#55, #67): approved by
  the programme owner on 2026-11-18, so `osn render modul --id
  dasar-pemrograman` no longer shows the `DRAF` banner. Content unchanged.
- **SMA coding syllabus v1.0 approved** by the programme owner for tracks A
  (C++) and B (JS/TS on Bun with `awcms-one`) on 2026-11-18 (#70); renamed from
  `docs/programs/sma-coding/silabus-draf.md` to `silabus.md`. The six open
  questions are answered; track C and the companion modules are not part of
  this approval.
- **Owner decision on the AI book research** (#84, #85): the findings feed a
  separate AI track D in the SMA coding programme; the research note moves to
  v0.2.0.
- **`osn plan`, `render` (except `render modul`), `report` and `checklist`
  refuse `--program sma-coding`** with exit 2 ("belum didukung untuk program
  sma-coding") instead of serving OSN data.

### Notes

- The nine new modules are authored content in `draf` status; approval is a
  human step (ADR-0007) and is not part of this release.
- The decree number of the 2025 subject guide used as the CP source is still
  unverified.
- Open: track C ([#68]), companion modules ([#69]), requirements for the
  programme ([#76]), CLI support for `sma-coding` ([#77]), track D AI ([#84]),
  the grade-X foundation block ([#86]), computational-maths modules ([#87]),
  track E quantum ([#88]) and cloud modules ([#89]).

## [2.0.0] — 2026-11-18

Multi-programme restructure, learner sheets and learning modules. **This
release contains breaking changes** — read the upgrade notes in
[`docs/releases/v2.0.0.md`](docs/releases/v2.0.0.md). No curriculum content
changed: the OSN corpus is byte-identical to v1.1.0, only moved.

### Breaking

- **Corpus paths moved.** `data/*.json` is now `data/osn/*.json` and
  `data/samples/` is now `data/osn/samples/`. Any consumer reading the old
  paths must update them (#50, #57).
- **Package renamed** from `osn-informatika-2026` to `kurikulum-informatika`.
  The `osn` binary keeps its name.
- **`osn validate --json` output shape.** Without `--program` it validates
  every registered programme and emits `{ ok, programs: [...] }`. With
  `--program <id>` it emits `{ ok, program, findings, summary }`.

### Added

- **Programme registry** `data/programs.json` with schema
  `src/schema/program.ts`, checked by `osn validate` (kebab-case unique ids,
  `corpusDir` = `data/<id>`, source document exists, registered
  `syllabusVersion`/`syllabusDate` equal the corpus files').
- **`--program <id>`** (default `osn`) on `osn validate`, `plan`, `render`,
  `report` and `checklist`; an unknown programme is a usage error (exit 2).
  `osn privacy-check` still scans all of `data/` recursively.
- **`osn render lembar-siswa --week <1-28>`** (#58) renders an Indonesian
  learner sheet derived only from the validated corpus, with no explanatory
  material and no learner-identity fields (ADR-0004). Supports `--out`,
  `--force` and `--program`.
- **Learning modules** (#59, ADR-0007): optional per-programme index
  `data/<program>/modules.json` (schema `src/schema/module.ts`), Markdown
  bodies under the new top-level `content/<program>/modules/`, and
  `osn render modul --id <id>` with a `DRAF`/`DITARIK` banner unless the
  module is `disetujui`. `osn validate` also checks the module index.
- **`bun run check:module-code`** (also a CI step) compiles every `cpp` block
  of the modules with `g++ -std=c++17 -fsyntax-only`, without running
  anything, and fails when `g++` is missing.
- **Pilot module `dasar-pemrograman`** (weeks 1-2, references R1), status
  `draf`; it has not been reviewed or approved by a human.
- **ADR-0006** (multi-programme repository) and **ADR-0007** (authored
  learning content kept apart from the transcribed corpus, with a `draf` →
  `ditinjau` → `disetujui` lifecycle only a human can complete) (#56).
- **Draft SMA coding syllabus** under `docs/programs/sma-coding/` (#60, #64):
  grades X-XII, a C++ track bridging to the ten OSN topic families and a web
  track ending with the public `awcms-one` template. Status `DRAF`, not yet a
  data source; recorded owner decisions: `awcms-one` option 1, and
  C++-track topics beyond the CP are optional enrichment.

### Changed

- Third-party dependencies updated within their current major: zod 4.6.7,
  `@changesets/cli` 3.0.3, `@types/bun` 1.4.4. Biome stays on 2.5.x because
  2.6 would format Markdown and reformat every document (#44).
- Bun pin raised from 1.4.0 to 1.4.4 in CI, the README and the bug-report
  template (#46).

### Fixed

- `scripts/check-checklist-fidelity.ts` dropped to 84.82% line coverage under
  Bun 1.4.4, just under the 85% per-file threshold. Tests added for the
  rule-text mismatch and missing-section-marker error paths (now 91.07%); the
  threshold is unchanged.

### Notes

- The pilot module and the SMA draft are authored content and remain `DRAF`;
  neither has been approved by the owner.
- All known limitations recorded in the v1.0.0 notes below still stand.

## [1.1.0] — 2026-09-05

Toolchain and dependency modernisation. No curriculum content, schema shape
or CLI behaviour changed; the corpus is byte-identical to v1.0.0.

### Changed

- **Zod 3 → 4** — the validation library backing all 26 schema modules. The
  one deprecated call site (`z.string().url()`) is migrated to `z.url()` in
  the same change, rather than left as fresh debt for Zod 5 to break.
  Validation behaviour was verified unchanged by probing the schemas that
  carry security or correctness weight, not by relying on the test suite
  alone: the https URL validator still rejects `http:`, `javascript:`,
  malformed input and the empty string; `parseDataFile` still reports every
  issue at once and names the source file; and the learning-record guard
  still rejects all five identifier-injection vectors from #15.
- **TypeScript 5 → 7** — the native compiler rewrite. The risk with a
  rewrite is strict options being accepted but silently ignored, which
  would remove type safety while CI stayed green, so enforcement was probed
  directly: `noUncheckedIndexedAccess` still errors. The full strict config
  typechecks with no unsupported-option warnings.
- **Biome 1 → 2** — `biome.json` migrated to the Biome 2 schema with
  identical intent. The five findings from Biome 2's expanded recommended
  rules are fixed in the code; no rule was disabled and no suppression
  added.
- **`actions/checkout` v4 → v7** in CI.

### Added

- `bun run assist:check` and a matching CI step, enforcing Biome's import
  organization. See **Fixed** below.

### Fixed

- **An import standard that nothing enforced.** `biome.json` has declared
  organize-imports on since the project began, but neither `format:check`
  nor `lint` runs Biome's assist actions — only `biome check` does. 36 of
  137 files had unsorted imports. The ordering is applied and the gap is
  now closed by a dedicated CI step.
- **Dependabot lockfile drift.** The `npm` ecosystem updates
  `package.json` without touching `bun.lock`, so every dependency pull
  request failed CI on `--frozen-lockfile` and needed manual regeneration.
  Switched to the `bun` ecosystem, which maintains the lockfile itself.
  Relaxing `--frozen-lockfile` was rejected: it is a supply-chain control
  (RISK-05), and removing a security control to silence a build error is
  the wrong trade.

### Documentation

- `CONTRIBUTING.md` records the lockfile discipline, including that
  removing `--frozen-lockfile` is not an acceptable workaround.
- `README.md`, `AGENTS.md`, `CONTRIBUTING.md` and
  `docs/development/ci-cd.md` updated for the new `assist:check` command
  and the now eleven-step CI pipeline.

### Notes

- No breaking changes. The version is `minor` rather than `patch` because
  Zod 4's inferred types differ subtly from Zod 3's, and the exported
  schemas are this library layer's public surface.
- All known limitations recorded in the v1.0.0 notes below still stand,
  unchanged.

## [1.0.0] — 2026-09-05

Initial stable release. The *Silabus Operasional Pembinaan OSN Informatika
2026* (v2.0, 4 September 2026) is now available as a validated,
version-controlled corpus with a mentor-facing CLI and the governance
documentation the syllabus itself mandates.

### Added — curriculum corpus

- The complete source syllabus as structured Markdown under
  [`docs/silabus/`](docs/silabus/): an index with the document control table
  and executive summary, one file per numbered section §1–§14, and the
  R1–R41 reference register. The transcription keeps the original
  Indonesian, preserves every table row and column, links every citation
  marker to its reference anchor, and retains the five operational callouts
  as blockquotes.
- A requirements register and traceability matrices under
  [`docs/requirements/`](docs/requirements/): **77 requirements** across
  functional, technical, operational, educational and governance
  categories, each citing its source section, a verification method and its
  implementing issue.

### Added — curriculum data model

- The ten official topic families (§2.1), the 28-week operational syllabus
  and seven phase gates (§4, §4.1), the four curriculum categories (§3),
  the four competition stages with structured contest formats (§2.2), and
  the §1.3 baseline learning load — all as JSON validated by Zod contracts.
- The reference (R1–R41), regulation (§10), ISO/IEC standard (§11) and
  mentor source-priority (§12) registers.
- `assertNoDanglingCitations()` walks the whole corpus at load, so a
  citation can never point at a reference that does not exist.

### Added — pedagogy and assessment

- The §5.1 two-session weekly template, with the schema enforcing
  contiguous segments totalling exactly 120 minutes; the §5.2 seven-step
  mentor SOP with its minimum test checklist and post-Accepted questions;
  and the §5.3 progressive hint ladder with terminal escalation.
- The §6.1 weighted rubric, with the schema enforcing that the five
  components sum to 100, and a weighted-score computation that avoids
  floating-point drift by summing integer products and dividing once.
- The §6.2 A/B/C/D status engine, including `resolveSchedule` and the 3–7
  day re-solve window.
- The learning-record and problem-taxonomy schemas, with per-field privacy
  classification (see **Security** below).
- The seven §6.3 mentor KPI definitions and a pure computation engine whose
  every metric returns an explicit "insufficient data" state rather than
  `NaN`.
- The seven §7 decision playbooks with executable selectors for
  constraint-to-complexity, shortest-path choice, range-query structure
  choice, the DP design checklist and the stress-test plan. Every selector
  returns a justification alongside its decision, because the syllabus
  requires the applicability condition to be stated before coding.
- The six-kind assessment bank (§13) and a blueprint generator that derives
  OSN-K and OSN-P formats from the competition-stage data rather than
  restating them.

### Added — the `osn` CLI

- `osn validate` — audits the entire corpus in one pass: schema conformance
  against a typed file registry that flags any unwired data file,
  structural invariants, and referential integrity. Reports every problem
  found, not just the first.
- `osn plan` — generates a dated 28-week cohort calendar from a start date,
  with holiday/exam exclusions shifting subsequent weeks rather than
  overlapping. Output is byte-identical across host timezones.
- `osn render` — produces mentor-ready weekly plans, checkpoint sheets and
  the SOP card as Markdown.
- `osn report` — computes the KPI dashboard, the §13.1 postmortem error
  taxonomy and scheduled re-solves from a learning-record file.
- `osn checklist` — renders the §14.1 cohort readiness checklist with the
  corpus version and syllabus-check status.
- `osn privacy-check` — see **Security** below.

### Added — operations and governance

- [`docs/operations/runbook.md`](docs/operations/runbook.md) and
  [`docs/operations/syllabus-check.md`](docs/operations/syllabus-check.md):
  the cohort-start procedure, the weekly cycle, the contest → postmortem →
  upsolve loop, the monthly review, the §13 governance roles, and the
  mandatory pre-cycle syllabus-check procedure.
- The §14.1 readiness checklist, §14.2 operational rules and ten-stage
  mentor quick pointer as validated data, plus a dated syllabus-check log
  implementing §14.2 rule 8.

### Security

- **No learner personal data is stored in this repository, by design.** The
  learning-record schema is `.strict()` and carries a recursive
  direct-identifier guard over an 18-term English/Indonesian denylist. A
  downstream platform that bolts on a name, email or NISN field — at any
  nesting depth, in any of camelCase, snake_case or kebab-case — gets a
  validation error rather than silent acceptance.
- `osn privacy-check` runs in CI and scans `data/` recursively, including
  `.jsonl` files and `data/samples/`. Findings report file, path and key
  but **never the value**, so a privacy error cannot itself become a
  disclosure in a terminal scrollback or CI log. `osn report` applies the
  same refusal before computing anything.
- [`docs/governance/privacy.md`](docs/governance/privacy.md) — the policy
  for minors' data under UU No. 27 Tahun 2022, with a role-access matrix,
  retention schedule and regulatory mapping.
- [`docs/governance/security.md`](docs/governance/security.md) — the six
  §13 controls expanded into implementable statements, mapped to all
  fourteen §11 ISO/IEC standards, with a seven-row risk register.
- [`docs/governance/incident-response.md`](docs/governance/incident-response.md)
  and [`SECURITY.md`](SECURITY.md), including the UU 27/2022 personal-data
  breach escalation duty.
- `.github/dependabot.yml` watches npm and GitHub Actions dependencies
  weekly. CI runs with `contents: read` only.

### Architecture

- A strict one-way dependency direction — `data` → `schema` → `domain` →
  `render`/`cli` — documented in
  [`docs/architecture/`](docs/architecture/) and honoured throughout:
  schemas never import domain, and validation happens once, at load.
- Five Architecture Decision Records covering curriculum-as-code (rather
  than an LMS or judge), the Bun/TypeScript/Zod stack, JSON data with Zod
  contracts, the no-learner-personal-data rule, and dual versioning of
  software against curriculum.

### Documentation

- `README.md`, `AGENTS.md`, `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`, and
  developer documentation for [testing](docs/development/testing.md),
  [CI/CD](docs/development/ci-cd.md) and
  [releasing](docs/development/releasing.md).
- The [CLI command reference](docs/cli/README.md).
- The source document's non-affiliation notice is carried in `README.md`:
  this is an independent curriculum document, not an official document of
  Puspresnas, IA TOKI or the IOI.

### Notes

- **No breaking changes** — this is the initial release.
- This repository is **not certified** to any ISO/IEC standard. The
  governance documents map controls onto those standards, which is a
  different claim, and they say so explicitly.
- Contact points in `SECURITY.md`, `CODE_OF_CONDUCT.md`,
  `docs/governance/privacy.md` and
  `docs/governance/incident-response.md` are marked placeholders that must
  be filled before publication. No address or person was invented.
- The seeded syllabus-check log entry records transcription provenance
  only. No live check of the external OSN/IOI sources was performed for it,
  and the entry says so; the next check must perform the live verification
  per [`docs/operations/syllabus-check.md`](docs/operations/syllabus-check.md).

[Unreleased]: https://github.com/ahliweb/osn/compare/v2.5.0...HEAD
[2.5.0]: https://github.com/ahliweb/osn/compare/v2.4.0...v2.5.0
[2.4.0]: https://github.com/ahliweb/osn/compare/v2.3.0...v2.4.0
[2.3.0]: https://github.com/ahliweb/osn/compare/v2.2.0...v2.3.0
[2.2.0]: https://github.com/ahliweb/osn/compare/v2.1.0...v2.2.0
[2.1.0]: https://github.com/ahliweb/osn/compare/v2.0.0...v2.1.0
[2.0.0]: https://github.com/ahliweb/osn/compare/v1.1.0...v2.0.0
[1.1.0]: https://github.com/ahliweb/osn/compare/v1.0.0...v1.1.0
[1.0.0]: https://github.com/ahliweb/osn/releases/tag/v1.0.0
[#68]: https://github.com/ahliweb/osn/issues/68
[#69]: https://github.com/ahliweb/osn/issues/69
[#76]: https://github.com/ahliweb/osn/issues/76
[#77]: https://github.com/ahliweb/osn/issues/77
[#84]: https://github.com/ahliweb/osn/issues/84
[#105]: https://github.com/ahliweb/osn/issues/105
[#124]: https://github.com/ahliweb/osn/issues/124
[#125]: https://github.com/ahliweb/osn/issues/125
[#177]: https://github.com/ahliweb/osn/issues/177
[#178]: https://github.com/ahliweb/osn/issues/178
[#86]: https://github.com/ahliweb/osn/issues/86
[#87]: https://github.com/ahliweb/osn/issues/87
[#88]: https://github.com/ahliweb/osn/issues/88
[#89]: https://github.com/ahliweb/osn/issues/89
[#127]: https://github.com/ahliweb/osn/issues/127
[#128]: https://github.com/ahliweb/osn/issues/128
[#129]: https://github.com/ahliweb/osn/issues/129
[#130]: https://github.com/ahliweb/osn/issues/130
[#131]: https://github.com/ahliweb/osn/issues/131
[#133]: https://github.com/ahliweb/osn/issues/133
[#139]: https://github.com/ahliweb/osn/issues/139
[#140]: https://github.com/ahliweb/osn/issues/140
[#151]: https://github.com/ahliweb/osn/issues/151
[#165]: https://github.com/ahliweb/osn/issues/165
