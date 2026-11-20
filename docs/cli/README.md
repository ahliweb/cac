# `cac` CLI reference

The `cac` command-line interface (Curriculum as Code, CaC; product
AhliKoding Curriculum; issue #19) is the outermost layer of
this repository (see `docs/architecture/README.md`'s "four layers"): it
dispatches subcommands that call into `src/domain/` (and, for later
issues, `src/render/`). It has no external CLI framework dependency
(TR-11) -- subcommand dispatch, flag parsing, and help text are all
hand-rolled in `src/cli/run-cli.ts`.

`cac` is the canonical name (entry `src/cli/cac.ts`, `bin.cac` in
`package.json`). `osn` is a compatible alias with identical behaviour
(entry `src/cli/index.ts`, `bin.osn`): both entries call the same
`runCli`, so commands, flags, `--json` output and exit codes are the same,
and only the name printed in usage, help and message prefixes follows the
name you typed (`cac validate: ...` versus `osn validate: ...`). The alias
prints no deprecation warning. Titles of saved Markdown artefacts (for
example `# osn checklist:`) do not change. This reference writes `cac`;
every example also works with `osn`, apart from the message prefix.

Alias policy (ADR-0009, owner decision K3 of 2026-11-20): the `osn` alias
is removed only in a MAJOR release, at the earliest six months after the
removal is announced and only when no consumer still uses it. The
programme id `osn` (`data/osn/`, `--program osn`) is unrelated to the alias
and does not change. This is an independent curriculum tool, not official
Puspresnas / IA TOKI / IOI material.

## Synopsis

```sh
cac <command> [options]

# equivalently, during development, without installing a bin symlink:
bun run src/cli/cac.ts <command> [options]

# the compatible alias (same behaviour, `osn` in message prefixes):
bun run src/cli/index.ts <command> [options]
```

## Global flags

These are recognised regardless of which subcommand (if any) is present:

| Flag | Meaning |
| --- | --- |
| `-h`, `--help` | With no subcommand: print global usage (this command list) and exit `0`. After a subcommand (`osn <command> --help`): print that command's own help and exit `0`, without running the command. |
| `-V`, `--version` | Print the version from `package.json` (never hard-coded) and exit `0`. Takes precedence over everything else -- even `cac --version bogus-command` prints the version rather than failing on the unknown command. |
| `--json` | Emit machine-readable JSON output instead of human-readable text, for commands that support it (`validate`, `plan`, `report`, `checklist` and `privacy-check`). **`render` ignores it**: `cac render --json ...` still prints Markdown (a rendered sheet is a document, not data), so a script must not expect JSON from it. May appear before or after the subcommand name. |
| `--program <id>` | Per-command (`validate`, `plan`, `render`, `report`, `checklist`): the registered programme (`data/programs.json`) whose corpus to use; default `osn`. An unknown id is a usage error (exit `2`) naming the registered ids. Write it after the subcommand name. `cac validate` without it validates every registered programme. All seven registered programmes are supported by `validate`. `plan` (`--track`), `render lembar-siswa` (`--week <week-code>`) and `render modul` additionally support `sma-coding`; `render modul` also supports each of the five other coding programmes (`tk-coding`, `kuliah-coding`, `dewasa-coding`, `sd-coding`, `smp-coding`) once its `data/<id>/modules.json` exists (and `--lembar` for the learner sheet of `tk-coding` and `sd-coding`), and exits `2` with "this programme has no modules.json" until then; for those five `plan` and `render lembar-siswa` exit `2` with "belum didukung untuk program <id>" (the message says `plan` and `render lembar-siswa` exist only for `osn` and `sma-coding`, and that the programme is supported by `render modul`, `validate` and `check:fidelity`). `render weekly`, `render checkpoint` and `render sop`, `report` and `checklist` read the OSN corpus only and exit `2` with the "belum didukung" message for every programme other than `osn` (for `sma-coding` it lists the commands that do work), rather than present OSN data as that programme's. `privacy-check` takes no `--program`: it always scans all of `data/`. |

## Exit codes

Applied consistently across every subcommand:

| Code | Meaning |
| --- | --- |
| `0` | Success. |
| `1` | Validation failure -- the command ran to completion but found a problem (e.g. `cac validate` found one or more corpus findings). |
| `2` | Usage error -- unknown command, bad flag, or a missing required argument (including running `cac` with no subcommand at all). |

An uncaught internal error inside a command is also reported as exit `1`,
after being caught and printed as a plain message -- never as a raw stack
trace.

## Command dispatch and how new commands are added

`src/cli/run-cli.ts`'s `runCli` is the single dispatcher. It:

1. Checks `--version`/`-V` first, anywhere in argv.
2. Finds the first argv token that does not start with `-` as the
   subcommand name. No such token (bare `cac`, or only flags) -> global
   usage, exit `0` if `--help`/`-h` was given, else exit `2`.
3. Looks the subcommand up in a registry (`src/cli/commands/index.ts`'s
   `COMMAND_REGISTRY`, keyed by name). Unknown name -> an error naming
   every valid command, exit `2`.
4. If `--help`/`-h` is among the remaining args, prints that command's own
   `help()` text and exits `0` -- handled once, centrally, so no command
   has to implement `--help` itself.
5. Otherwise calls the command's `run(args, ctx)`, with the subcommand
   token and `--json` already stripped from `args`.

Adding a new subcommand (`plan` #20, `render` #21, `report` #22,
`checklist` #25, all done -- see below) means writing a new
`src/cli/commands/<name>.ts`
exporting a `Command` (`src/cli/command.ts`'s interface: `name`,
`summary`, `help()`, `run(args, ctx)`) and adding it to the `COMMANDS`
array in `src/cli/commands/index.ts` -- nothing in `run-cli.ts` itself
needs to change.

## `cac validate`

Validates `data/programs.json` (the programme registry) and the **entire** corpus of one programme (every `data/<program>/*.json` file) or of every registered programme in
one pass and reports **every** problem found, not just the first.

```sh
cac validate [options]
```

Which audit runs for a programme is decided by the programme table
(`PROGRAM_MODULES` in `src/cli/program-registry.ts`, ADR-0008), not by a
per-id branch: each entry holds the programme's data files and schemas, its
corpus audit and its module-index checks (and an optional fidelity module). A
programme registered in `data/programs.json` with no table entry is reported as
a finding (`programs[<id>]` in `programs.json`), never skipped; a table entry
whose programme is not registered is a draft and is not validated.

### What it checks

1. **Schema conformance.** Every file in the typed file->schema registry
   (`DATA_FILE_REGISTRY` in `src/domain/corpus-audit.ts`) is parsed
   against its Zod schema (the same schemas under `src/schema/` the
   domain layer uses). A file that is missing, that is not valid JSON, or
   that fails its schema is reported with every issue Zod found for it
   (not just the first).

   The registry also runs in reverse: a `.json` file present under
   `data/<program>/` that is **not** listed in the registry is itself reported as a
   finding ("this data file is not covered by any schema...") rather than
   silently ignored -- this is what keeps a newly-added, unwired data file
   loud instead of invisible.

2. **Structural invariants**, checked against whichever files parsed
   successfully: 28 weeks numbered 1-28; 7 gates at weeks 4/8/12/16/20/24/28;
   10 topic families; 41 references R1-R41; assessment weights summing to
   exactly 100; both weekly session templates summing to exactly 120
   minutes; 5 hint-escalation levels; 4 problem-completion status codes; 7
   KPI metrics; 7 decision playbooks; 6 assessment-bank kinds; 4
   competition stages; 4 curriculum categories; 8 §14.1 readiness-checklist
   items; 8 §14.2 operational rules; 10 §14.2 mentor quick-pointer stages;
   a non-empty §14.2 rule 8 syllabus-check log.

3. **Registry agreement** (ADR-0006), per programme: every corpus file carrying `syllabusVersion`/`syllabusDate` must equal the values registered for the programme in `data/programs.json`, and the registered `sourceDocument` must exist. `data/programs.json` itself is validated by `src/schema/program.ts` (kebab-case unique ids, `corpusDir` = `data/<id>`, ISO date, repository-relative source path).

4. **Referential integrity**, spanning two files where the fact cannot be
   expressed by either file's own schema:
   - every week's `topicFamilies` id resolves to a real topic family
     (`data/osn/topic-families.json`);
   - the set of weeks carrying a non-null `checkpoint` matches the gate
     weeks in `data/osn/gates.json` exactly, and checkpoint numbers are 1..N
     in ascending week order;
   - every assessment-bank kind's non-null `servesStage` resolves to a
     real competition stage (`data/osn/competition-stages.json`);
   - every `Rnn`-shaped citation anywhere in the corpus resolves to a real
     reference in `data/osn/references.json`.

5. **Learning modules** (ADR-0007, issue #54), only when the programme has
   a `data/<program>/modules.json` (it is optional; a programme without
   one is valid). The index is parsed against `src/schema/module.ts`:
   unique kebab-case ids, `audience` `siswa`, `language` `id`, a `status`
   of `draf`/`ditinjau`/`disetujui`/`ditarik`, at least one reference, and
   a `review` (`approvedOn` date and `reviewerRole`, never a name) that is
   **required when the status is `disetujui` and forbidden otherwise**.
   Referentially: every `topicFamilies` id exists in `topic-families.json`;
   every `weeks` number exists in `weeks.json` and that week exercises one
   of the module's families; every `refId` exists in `references.json`
   (explicit `{ title, url }` references must be `https`); `contentPath`
   is `content/<program>/modules/<id>.md` for this programme; and the
   Markdown file exists and is not blank.

   For `sma-coding` the index is parsed against its own schema,
   `src/schema/sma-module.ts` (issue #106; the OSN schema is unchanged),
   whose entries carry `cpItems`, `weekCodes`, `bridgeFamilies`,
   `gradeLevels`, `prerequisites`, `audience`, `language`, `status`,
   `review`, `references` (explicit `{ title, url }` with an `https` URL;
   no `refId`, the programme has no `references.json`) and `contentPath`
   (`content/sma-coding/modules/<id>.md`); `review` follows the same rule
   as above. `cpItems`, `weekCodes`, `bridgeFamilies` and `prerequisites`
   may be empty (a series module is not counted as meeting a CP item).
   For `sma-coding`, a module of an enrichment track (D or E: id starting
   `d-` or `e-`, or a week code of a track whose `cpStatus` is `pengayaan`
   in `tracks.json`) must have `cpItems: []`.
   Referentially: every `cpItems` code exists in `cp-elements.json`; every
   `weekCodes` entry exists in `weeks.json` (track weeks) or
   `foundation.json` (`FND-...`); every `bridgeFamilies` id exists in
   `data/osn/topic-families.json`; every `prerequisites` entry is the id of
   another module in the index or an existing foundation week code, and the
   module prerequisites contain no cycle (a module cannot require itself);
   and the Markdown file exists and is not blank. A reference file that a
   used field needs but that is missing or invalid is itself reported
   ("cannot be checked"), never skipped silently.

   Each of the five other coding programmes has its own module-index schema
   too (ADR-0007, ADR-0008; `modules.json` stays optional for all of them).
   A module serves **one** programme unit and its `id` is that unit's code in
   lower case (`tk-a1-m1`, `sd1-1-m1`, `smp7-1-m1`, `kul-u-101`,
   `dw-pro-m1`, `dw-fnd-m1`); `review`, `references`, `contentPath` and the
   statuses follow the rules above. What differs:

   | Programme | Schema / rules | Reader | Unit field | Programme-specific fields (all checked against the corpus) |
   | --- | --- | --- | --- | --- |
   | `tk-coding` | `src/schema/tk-module.ts`, `src/domain/tk-modules.ts` | `guru` | `weekCodes` (one `TK-...` week) | `cpOverlap`: only CP Fase Fondasi items the week itself lists in `cp` (an interpreted overlap, never fulfilment: `meetsCp: false`); `groups` = the week's age group; `learnerSheetPath` (required) |
   | `sd-coding` | `src/schema/sd-module.ts`, `src/domain/sd-modules.ts` | `guru` | `weekCodes` (one `SD<kelas>-<sem>-M<n>` week) | `cpItems`: only items `cp-mapping.json` maps to the week (never a kelas 1-4 week, never a `P-` introduction, never a `[penguatan]` week); `gradeLevels` = the week's kelas; `learnerSheetPath` (required) |
   | `smp-coding` | `src/schema/smp-module.ts`, `src/domain/smp-modules.ts` | `siswa` | `weekCodes` (one `SMP<kelas>-<sem>-M<n>` week) | `cpCodes`: only items `weeks.json` maps to the week as covered (an enrichment week, or an item marked `*` for Python, claims none); `gradeLevels` = the week's kelas |
   | `kuliah-coding` | `src/schema/kul-module.ts`, `src/domain/kul-modules.ts` | `mahasiswa` | `courseCodes` (one `KUL-...` course) | `knowledgeAreas`: only areas mapped to the course (its `kaCodes`, or a link or support entry in `knowledge-areas.json`); `semester` = the course's semester |
   | `dewasa-coding` | `src/schema/dw-learning-module.ts`, `src/domain/dw-modules.ts` | `peserta` | `moduleCodes` (one `DW-...` module, also the shared `DW-FND-M1`; found in `module-plan.json` or `shared.json`) | `skkniUnits`: SKKNI unit codes only for the units `module-plan.json` maps to that module (track PRO, unit-title depth); `track` = the module code's track |

   Findings reported for all five: an unknown unit code, or a CP / CP-overlap /
   knowledge-area / SKKNI code that is unknown or not valid for that unit; a
   prerequisite (another module's id, or a unit code of the programme) that is
   unknown or closes a cycle (a module cannot require itself); a duplicate id;
   an `id` that is not the lower-case unit code; a missing or blank Markdown
   body; a missing or blank learner sheet (`content/<program>/lembar/<id>.md`)
   or one with a name or identity field of the child (see `cac render modul
   --lembar`), for the modules that have one (every module of `tk-coding` and
   `sd-coding`; the other five programmes may have a worksheet per module with
   its own status, ADR-0011, see the three optional fields below); and an
   orphan sheet: a `content/<program>/lembar/*.md` file that no module entry
   names as its `learnerSheetPath`. The optional fields `learnerSheetPath`
   (`content/<program>/lembar/<id>.md`), `learnerSheetStatus` (required exactly
   when the path is present) and `learnerSheetReview` (required exactly when
   the status is `disetujui`) are accepted by `osn`, `smp-coding`, `sma-coding`,
   `kuliah-coding` and `dewasa-coding` and rejected by `tk-coding` and
   `sd-coding`. A reference file that a used
   field needs but that is missing or invalid is itself reported ("cannot be
   checked"), never skipped silently.

6. **Cross-programme codes** (ADR-0010, issue #177), for the bridge files a
   programme lists in `crossProgramScan` of its table entry (today
   `dewasa-coding`: `bridges.json` and `kuliah-bridge.json`;
   `kuliah-coding`: `bridges.json`). Every string value of those files is
   scanned for week, course and module codes of any programme (`TK-B1-M5`,
   `SD1-1-M8`, `SMP7-1-M3`, `A-X1-M9`, `FND-X1-M1`, `KUL-I-101`,
   `DW-PRO-M6`; a range `<code>..M<n>` also checks its end), and each code
   must exist in the corpus of the programme it belongs to (week `id`s,
   course and module `code`s, read from that programme's own files). A code
   that does not exist is reported with its file, JSON path and programme;
   a programme whose corpus cannot be read is skipped here (its own audit
   reports it). Prose cells give no other protection against a wrong code.

### The `sma-coding` programme

`cac validate --program sma-coding` validates `data/sma-coding/` with its
own file set and schemas (`SMA_DATA_FILE_REGISTRY` in
`src/domain/sma-corpus-audit.ts`; schemas `src/schema/sma-*.ts`), not the
OSN invariants above. The eight files transcribe the owner-approved
`docs/programs/sma-coding/silabus.md` v1.4.2 (tracks A to E plus the shared
grade-X foundation block): `cp-elements.json`, `tracks.json`,
`structure.json`, `weeks.json`, `foundation.json`, `cp-mapping.json`,
`osn-bridge.json` and `smp-bridge.json` (the SMP entry-and-placement table of
bagian 3.0, v1.4, #177). It checks:

- **Schema conformance** of every file, the reverse "unregistered file"
  check (the optional `modules.json` is exempt), and registry agreement
  (item 3 above).
- **Structural invariants:** 5 tracks, 6 CP quotations, 36 CP items, 7
  structure rows, 26 CP mappings, 9 enrichment links, 6 semesters per
  programme, every track-semester holding exactly the weeks 1-14 except
  grade X semester 1, which holds weeks 8-14 after the foundation block;
  a track that starts in grade X (`startClass` in `tracks.json`; tracks A-D)
  has all six semesters, a track that starts in grade XI (track E) has only
  XI1..XII2 and no grade X week (364 track weeks in all: 77 each for A-D, 56
  for E); the foundation block `FND-X1` holds exactly the weeks 1-7;
  `structure.json` agrees with the 14-week semester and with each week's
  class and phase.
- **Pengayaan tracks (silabus v1.2, unchanged in v1.3):** tracks D and E have `cpStatus`
  `pengayaan` (outside the CP wording). They may never appear in
  `cp-mapping.json` `mappings[].tracks`; their resemblance to CP items lives
  only in `enrichmentLinks` (bagian 4.5), whose tracks must be pengayaan
  tracks and whose weeks must belong to that track. `partialTracks` of a
  mapping row (the "(parsial)" marker, per track) must be a subset of its
  `tracks`.
- **Referential integrity:** every mapped CP code exists in
  `cp-elements.json`; every week code in `cp-mapping.json` and
  `osn-bridge.json` exists in `weeks.json` (and belongs to a track the row
  lists) or is a foundation week in `foundation.json`, which counts for any
  track; the normalised `weeks` equal the source `weeksText` expanded; every
  track id exists in `tracks.json`; and every `familyId` of the OSN bridge
  exists in `data/osn/topic-families.json` (a cross-programme reference,
  ADR-0006). The main bridge (track A) covers all ten OSN families; the
  `trackBridges` of other tracks (track C, bagian 5.2) cover only some and
  their weeks must belong to that track.

Whether the data still equals the document cell by cell is a separate
check: `bun run check:sma-fidelity` (`scripts/check-sma-coding-fidelity.ts`,
also run by `bun test` in `tests/integration/sma-coding-fidelity.test.ts`)
parses the Markdown tables of bagian 1.3, 1.4, 2, 3 (including the foundation
table and the track summary 3.6), 4 (including the enrichment links 4.5) and 5
(one table per track) and exits `1` listing every mismatching cell.

`bun run check:fidelity [--program <id>]` (`scripts/check-fidelity.ts`) runs the
fidelity module of every registered programme that has one (today the six
coding programmes: `sma-coding`, `tk-coding`, `kuliah-coding`, `dewasa-coding`,
`sd-coding`, `smp-coding`; each logic is `src/cli/fidelity/<id>.ts`, and
`check:sma-fidelity` runs the same `sma-coding` module) or only the programme
named by `--program`. It exits `0` when the data equals the document, `1`
listing every mismatch, and `2` for a usage error: `--program` without a
value, a programme that is not registered, or a registered programme with no
fidelity module (`osn` today; the message names the programmes that have one).
Real output:

```text
$ bun run check:fidelity
check-kuliah-coding-fidelity: OK -- every cell of data/kuliah-coding/*.json matches docs/programs/kuliah-coding/silabus.md.
check-sma-coding-fidelity: OK -- every cell of data/sma-coding/*.json matches docs/programs/sma-coding/silabus.md.
check-tk-coding-fidelity: OK -- every cell of data/tk-coding/*.json matches docs/programs/tk-coding/silabus.md.
check-dewasa-coding-fidelity: OK -- every cell of data/dewasa-coding/*.json matches docs/programs/dewasa-coding/silabus.md (SKKNI unit titles: riset.md bagian 2.2).
check-sd-coding-fidelity: OK -- every cell of data/sd-coding/*.json matches docs/programs/sd-coding/silabus.md.
check-smp-coding-fidelity: OK -- every cell of data/smp-coding/*.json matches docs/programs/smp-coding/silabus.md.
```

### The other coding programmes

Each of the five further coding programmes has its own file set and schemas
and its own corpus audit, picked from the programme table (ADR-0008); the
numbers below are the corpus files `cac validate` counts (the optional
`modules.json` is not counted and, like `sma-coding`'s, is exempt from the
"unregistered file" check; its rules are above). All five syllabi are
owner-approved (2026-11-19).

| Programme | Syllabus | Corpus files | Schemas / audit |
| --- | --- | --- | --- |
| `tk-coding` | v1.0.3 | 7 (`bridge`, `cp-elements`, `cp-mapping`, `decisions`, `goals`, `structure`, `weeks`) | `src/schema/tk-*.ts`, `src/domain/tk-corpus-audit.ts` |
| `kuliah-coding` | v1.2.1 | 6 (`ai-policy`, `bridges`, `courses`, `cpl`, `knowledge-areas`, `tracks`) | `src/schema/kul-*.ts`, `src/domain/kul-corpus-audit.ts` |
| `dewasa-coding` | v1.2.1 | 8 (`bridges`, `certification`, `kuliah-bridge`, `module-plan`, `shared`, `skkni-units`, `structure`, `tracks`) | `src/schema/dw-*.ts`, `src/domain/dw-corpus-audit.ts` |
| `sd-coding` | v1.1.0 | 5 (`bridges`, `cp-elements`, `cp-mapping`, `structure`, `weeks`) | `src/schema/sd-*.ts`, `src/domain/sd-corpus-audit.ts` |
| `smp-coding` | v1.2.0 | 7 (`bridge`, `club`, `cp-elements`, `cp-mapping`, `structure`, `uncovered`, `weeks`) | `src/schema/smp-*.ts`, `src/domain/smp-corpus-audit.ts` |

Real output of `cac validate` (all registered programmes; each block is one
programme, the path is shortened):

```text
$ cac validate
cac validate: programme "osn", corpus at /path/to/repo/data/osn
OK -- 22 data file(s) validated, 0 problem(s) found.

cac validate: programme "sma-coding", corpus at /path/to/repo/data/sma-coding
OK -- 8 data file(s) validated, 0 problem(s) found.

cac validate: programme "tk-coding", corpus at /path/to/repo/data/tk-coding
OK -- 7 data file(s) validated, 0 problem(s) found.

cac validate: programme "kuliah-coding", corpus at /path/to/repo/data/kuliah-coding
OK -- 6 data file(s) validated, 0 problem(s) found.

cac validate: programme "dewasa-coding", corpus at /path/to/repo/data/dewasa-coding
OK -- 8 data file(s) validated, 0 problem(s) found.

cac validate: programme "sd-coding", corpus at /path/to/repo/data/sd-coding
OK -- 5 data file(s) validated, 0 problem(s) found.

cac validate: programme "smp-coding", corpus at /path/to/repo/data/smp-coding
OK -- 7 data file(s) validated, 0 problem(s) found.
```

### Options

| Flag | Meaning |
| --- | --- |
| `--program <id>` | Validate only this registered programme. Without it (and without `--data-dir`) every programme in `data/programs.json` is validated. An unknown id is a usage error (exit `2`). |
| `--json` | Emit JSON instead of grouped text: `{ ok, program, findings, summary }` for one programme, `{ ok, programs: [{ program, ok, findings, summary }, ...] }` when all programmes are validated. |
| `--data-dir <path>` | Validate a different corpus directory for one programme (`--program`, default `osn`) instead of its registered `data/<program>/`. Primarily for testing against a deliberately corrupted fixture corpus (see `tests/integration/cli-validate-fixtures.test.ts`) -- not needed for normal use. |
| `-h`, `--help` | Show `cac validate`'s own help. |

### Exit codes

| Code | Meaning |
| --- | --- |
| `0` | The corpus has zero findings. |
| `1` | The corpus has one or more findings. |
| `2` | Usage error: unknown `--program`, `--program`/`--data-dir` given with no value, or the given directory cannot be read. |

### Example: clean corpus

```text
$ cac validate --program osn
cac validate: programme "osn", corpus at /path/to/repo/data/osn
OK -- 22 data file(s) validated, 0 problem(s) found.
```

```sh
$ cac validate --program osn --json
{
  "program": "osn",
  "ok": true,
  "findings": [],
  "summary": {
    "filesValidated": 22,
    "filesMissing": 0,
    "filesUnregistered": 0,
    "findingCount": 0,
    "errorCount": 0,
    "warningCount": 0
  }
}
```

### Example: a corrupted corpus (illustrative)

```text
$ cac validate --program osn
cac validate: programme "osn", corpus at /path/to/repo/data/osn
FAILED -- 2 problem(s) found (2 error(s), 0 warning(s)):

curriculum-categories.json:
  - [error] categories: category ids must be exactly [core, support, extension, de-prioritized], each appearing once; got [support, extension, de-prioritized]

weeks.json:
  - [error] weeks: week numbers must be exactly [1, 2, ..., 28], each appearing once; got [1, 2, ..., 26, 28]
```

Every finding names the file, an in-file `path` (dot-separated, e.g.
`weeks[week=4].checkpoint`, or `(file)`/`(root)` when the problem is not
about one field), and a human-readable `message` -- enough to fix the
problem without re-reading the whole corpus.

### How the validator is testable against a fixture, not just the real corpus

`cac validate`'s actual checking logic (`auditCorpus` in
`src/domain/corpus-audit.ts`) is a pure function of an injected
`CorpusSource` (a `file name -> parsed JSON` map) -- it never statically
imports `data/<program>/*.json` itself, unlike every other module under
`src/domain/`. The one piece of filesystem I/O (reading a directory of
`.json` files into that shape) lives in `src/cli/corpus-loader.ts`
instead. This is why `--data-dir` above can point at an arbitrary
directory, and why `tests/unit/corpus-audit.test.ts` can construct a
corrupted `CorpusSource` in memory without touching disk at all. See
`src/domain/corpus-audit.ts`'s docblock for the full rationale (including
why this module could not simply reuse
`assertNoDanglingCitations`/`findDanglingCitations` from
`src/domain/registers.ts`).

## `cac plan`

Generates the dated 28-week cohort calendar against the §4 operational
syllabus: for each week, its date range, focus, two session dates,
mini-contest/checkpoint markers, and (on a gate week) the evidence required
to proceed past that gate. Implements TR-07 (deterministic, UTC-only date
arithmetic), FR-23 and OR-03.

```sh
cac plan --start <YYYY-MM-DD> [options]
```

The actual planning logic (`buildCohortPlan`) lives in
`src/domain/cohort-plan.ts` as a pure function with no I/O -- `cac plan`
itself (`src/cli/commands/plan.ts`) is only flag parsing plus the two
renderers in `src/cli/format-plan.ts` (`formatPlanMarkdown`,
`formatPlanJson`), exactly the same split `cac validate` uses around
`auditCorpus`.

### Options

| Flag | Meaning |
| --- | --- |
| `--program <id>` | The registered programme whose corpus to use. Default `osn`; an unknown id is exit `2`. `sma-coding` has its own plan (see "`cac plan --program sma-coding`" below); the flags in this table other than `--program`, `--format` and `--json` are OSN-only. |
| `--start <date>` | The cohort's start date, ISO `YYYY-MM-DD`. **Required.** |
| `--exclude <d1,d2,...>` | A comma-separated list of ISO `YYYY-MM-DD` dates to exclude (school holidays, exam days, ...). Optional; defaults to none. Order and duplicates don't matter -- the output normalises this list (deduplicated, ascending). |
| `--target-stage <id>` | Report against a target competition stage's intensive-preparation week: one of `osn-k`, `osn-p`, `osn-nasional`, `toki-ioi-extension` (`src/domain/structure.ts`'s `STAGE_IDS`). Optional. See "Target-stage informational entry and schedule-slip warning" below. |
| `--format <md\|json>` | Output format. Default `md`. `--json` (the global flag) is equivalent to `--format json`; an explicit `--format` wins if both are given. |
| `-h`, `--help` | Show `cac plan`'s own help. |

### Week-shifting rule

A week is **7 usable calendar days** -- calendar days that are not in
`--exclude`. Weeks are laid out back-to-back with no gaps and no overlap:
week 1 starts on `--start`; every later week starts the calendar day
immediately after the previous week's last day. Within a week, days are
consumed one at a time from that week's start: an excluded date is
consumed (so it lies inside exactly one week's date range and is never
silently dropped, and can never reappear in a later week) but does **not**
count toward that week's 7 usable days -- the walk simply continues one
more calendar day to make up the shortfall. A week's end date is therefore
its 7th usable day, whatever calendar date that turns out to be: it is 6
days after that week's start when no excluded date falls inside it, and
grows by exactly one calendar day for every excluded date that does. Since
every following week starts the day after the previous one ends, one
excluded date pushes every subsequent week's whole date range one day
later, and this accumulates: two excluded dates anywhere in weeks 1-10
push week 11 onward two days later in total, regardless of which of those
ten weeks each one fell in.

### Session-date rule

Each week's two session dates (§1.3's "2 sesi mentor/minggu" baseline) are
that week's **1st and 4th usable day** (i.e. the 1st and 4th non-excluded
calendar day counting from the week's start). This is fully deterministic
and does not assume any particular weekday alignment -- `--exclude` already
carries whatever school-specific calendar structure matters. An excluded
day can never be picked as a session date, since it is never one of a
week's usable days in the first place.

### Target-stage informational entry and schedule-slip warning

§4 places OSN-K intensive preparation at week 25, OSN-P at week 26,
national mixed at week 27, and final readiness at week 28 (`toki-ioi-extension`
has no dedicated intensive week in §4, so it is mapped to week 28,
final readiness, as the closest applicable milestone -- a derived reading,
noted as such in the output). Issue #20 asks for a warning "when the
corresponding intensive week falls after a supplied target date", but `osn
plan` has no target-*date* input, only `--target-stage`. Given `--target-stage`,
two things are reported instead:

1. **An informational entry** naming which week that stage's intensive
   preparation lands on and that week's *actual*, post-shift date range in
   this specific plan -- so a mentor can see exactly which calendar dates
   the relevant intensive week now covers once `--exclude` is accounted
   for.
2. **A schedule-slip warning**, only if `projectedEndDate` is pushed more
   than 14 days later than `baselineEndDate` (what the same 28 weeks would
   look like with zero excluded dates) -- a slip that large is exactly the
   kind of drift that could push an intensive week past the real-world
   selection dates §14.1 requires the calendar to be aligned against.

Both are gated on `--target-stage` being given, by design: `baselineEndDate`
itself is always reported regardless (it costs nothing and is useful
context on its own), but the warning only fires once a stage has actually
been named -- an `--exclude`-heavy plan with no stated target is not
assumed to be "wrong" just because it runs long, since without a named
target there is no operational deadline it could have slipped against.

### Determinism (TR-07)

All date arithmetic is UTC-only: dates are represented as the epoch-
millisecond instant of UTC midnight on that calendar day, arithmetic is
plain millisecond addition, and every value is read back out via
`Date#getUTC*` accessors only (never `Date#setDate`/`Date#getDate`, which
are sensitive to the host's local timezone) -- see
`src/domain/cohort-plan.ts`'s docblock. No date library is used. `cac plan`
is a pure function of its flags: identical `--start`/`--exclude`/
`--target-stage`/`--format` produce byte-identical stdout, on any machine,
regardless of host timezone.

### Exit codes

| Code | Meaning |
| --- | --- |
| `0` | Success. |
| `1` | (`sma-coding` only) the programme corpus fails validation. |
| `2` | Usage error: `--start` missing, `--start`/an `--exclude` entry is not a real ISO `YYYY-MM-DD` calendar date, an unknown `--target-stage`, or an unknown `--format`; for `sma-coding`: `--track` missing or unknown, an unknown `--kelas`/`--semester`, a kelas X semester asked of track E (which starts in kelas XI), or an OSN-only flag. |

### Example

```text
$ cac plan --start 2026-01-05 --exclude 2026-01-07 --target-stage osn-k
# osn plan: cohort calendar

Start date: 2026-01-05
Excluded dates (1): 2026-01-07
Target stage: osn-k
Projected end date: 2026-07-20 (un-excluded baseline: 2026-07-19)

Target stage "osn-k" (OSN-K): intensive preparation lands on week 25, 2026-06-23 to 2026-06-29. §4 places OSN-K intensive preparation at week 25.

| Week | Start | End | Focus | Sessions | Mini-contest | Checkpoint | Gate evidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 2026-01-05 | 2026-01-12 | Orientasi CP & C++ dasar | 2026-01-05, 2026-01-09 | no | - | - |
| 2 | 2026-01-13 | 2026-01-19 | Control flow, fungsi, array/string | 2026-01-13, 2026-01-16 | no | - | - |
...
```

Note week 1's date range is extended by one day (05-12, not 05-11) and its
second session date shifts from 08 to 09, since 2026-01-07 was excluded --
see "Week-shifting rule" and "Session-date rule" above.

### `cac plan --program sma-coding`

For the `sma-coding` programme `cac plan` prints the **plan per semester of
one track** instead of a dated cohort calendar (owner decision 2026-11-18,
issue #77). It is derived only from the validated `data/sma-coding/` corpus
(`auditSmaCorpus` plus the module-index checks run first; a corpus that fails
them exits `1` with a pointer to `cac validate --program sma-coding`).

```sh
cac plan --program sma-coding --track <A|B|C|D|E> [--kelas <X|XI|XII>] [--semester <kode>] [--format md|json]
```

| Flag | Meaning |
| --- | --- |
| `--track <id>` | The learning track, one of `tracks.json` (`A`, `B`, `C`, `D`, `E`). **Required**; missing or unknown is exit `2` naming the valid tracks. |
| `--kelas <X\|XI\|XII>` | Only the two semesters of this class. Default: all semesters of the track (six; four for track E, which starts in kelas XI, so `--track E --kelas X` is exit `2`). |
| `--semester <kode>` | Only this semester: `X1`, `X2`, `XI1`, `XI2`, `XII1` or `XII2` (or `1`/`2` together with `--kelas`). A semester that does not belong to `--kelas` is exit `2`. |
| `--format <md\|json>`, `--json` | Markdown (default) or JSON: the plan object with `program`, `syllabusVersion`, `syllabusDate`, `scope`, `track` and `semesters[]` (each with `foundation[]` and `weeks[]`; every week has `code`, `topic`, `objective`, `output`, `exercise`, `cpItems`, `enrichmentLinks`, `osnBridges`, `modules`; `track` carries `startClass` and `cpStatus`). |

`--start`, `--exclude` and `--target-stage` belong to the OSN cohort calendar
and are rejected with exit `2` for `sma-coding` (never silently ignored).

Per week the Markdown shows the code, topic, objective, output and exercise
(verbatim corpus cells), the CP items mapped to that week by `cp-mapping.json`
(with their short label; "(parsial)" when the mapping marks the week's own
track partial), for a week of a pengayaan track (D, E) the enrichment links
(CP resemblances that are not counted as covering the item) with a note that
the track lies outside the CP wording, the OSN bridge entries of
`osn-bridge.json` that name the week (tracks A and C) and,
when `data/sma-coding/modules.json` exists, the indexed modules that list the
week in `weekCodes` (a module that is not approved is marked DRAF). Kelas X
semester 1 starts with the shared foundation block `FND-X1-M1..M7` (the same
for every track) before the track's weeks `M8..M14`. Output is
byte-deterministic.

Real output (`cac plan --program sma-coding --track A --semester X1`, abridged):

```text
# Rencana Pembelajaran -- Jalur A: Algoritmik dengan C++

Program: Silabus Pembelajaran Coding SMA
Cakupan: semester X1
Sumber: silabus versi 1.4.2, tanggal 2026-11-20.

## Semester X1 (kelas X, fase E)

### Blok fondasi bersama (FND-X1-M1..FND-X1-M7): untuk semua murid sebelum memilih jalur

#### FND-X1-M1 -- Komputer dan perangkat keras; model Input-Proses-Output Von Neumann

- **Tujuan:** menyebut fungsi komponen (CPU, memori, penyimpanan, perangkat masukan dan keluaran, papan induk, catu daya); menjelaskan dan menyimulasikan siklus I-P-O komputer Von Neumann; membaca spesifikasi perangkat
- **Keluaran:** diagram I-P-O beranotasi; lembar spesifikasi komputer lab
- **Latihan:** kegiatan utama: simulasi I-P-O tanpa komputer (murid berperan CPU, memori, dan perangkat masukan/keluaran menjalankan kartu instruksi sederhana); membaca spesifikasi komputer lab lewat informasi sistem; mengenali komponen dari foto; opsional bila lab menyediakan komponen bekas: mengenali komponen dari komponen bekas (perangkat yang masih dipakai tidak dibongkar)
- **Butir CP:** E-BK-e (model Input-Process-Output Von Neumann dan peran sistem operasi)

...

### Minggu jalur A

#### A-X1-M8 -- Lingkungan g++, algoritma, pseudocode, diagram alir

- **Tujuan:** mengompilasi program pertama; menulis solusi sederhana dalam pseudocode
- **Keluaran:** `hello.cpp`; 3 pseudocode
- **Latihan:** cetak teks; tukar dua nilai; cari nilai terbesar dari tiga
- **Butir CP:** E-BK-d (solusi program sederhana dalam format pseudocode)

#### A-X1-M9 -- Variabel, tipe data, ekspresi; masukan dan keluaran

- **Tujuan:** memilih tipe (`int`, `long long`, `double`, `char`, `bool`) dan menulis ekspresi; membaca dan menulis data dengan `cin`/`cout`
- **Keluaran:** program hitung berformat
- **Latihan:** luas dan keliling; pembagian bulat dan sisa; konversi suhu; rata-rata dua bilangan
- **Butir CP:** E-BK-d (solusi program sederhana dalam format pseudocode)
- **Jembatan OSN:** dasar-pemrograman -- sintaks C++, variabel, I/O, percabangan, perulangan, fungsi. Catatan: Sesuai CP.

...
```

A pengayaan track states so in the header (`cac plan --program sma-coding --track D --semester XI1`, first lines):

```text
# Rencana Pembelajaran -- Jalur D: Kecerdasan Buatan dan Analisis Data

Program: Silabus Pembelajaran Coding SMA
Cakupan: semester XI1
Sumber: silabus versi 1.4.2, tanggal 2026-11-20.
Catatan: jalur D adalah pengayaan di luar rumusan CP; tidak dihitung sebagai pemenuhan butir CP.
```

A kelas X semester of track E (which starts in kelas XI) is a usage error:

```text
$ cac plan --program sma-coding --track E --kelas X
cac plan: jalur E tidak memiliki semester X1: jalur ini dimulai di kelas XI.
```

## `cac render`

Turns the validated curriculum corpus into Markdown artefacts: for
mentors (issue #21) a weekly session plan, a checkpoint sheet, or a
one-page SOP card, and for students a weekly learner sheet (issue #53)
or a learning module (issue #54).

```sh
cac render weekly --week <1-28> [--out <path>] [--force]
cac render checkpoint --number <1-7> [--out <path>] [--force]
cac render sop [--out <path>] [--force]
cac render lembar-siswa --week <1-28> [--out <path>] [--force]
cac render modul [--program <id>] --id <module-id> [--out <path>] [--force]
cac render modul [--program <id>] --id <module-id> --lembar [--out <path>] [--force]
```

The actual rendering logic (`renderWeeklyPlan`, `renderCheckpointSheet`,
`renderSopCard`, `renderStudentSheet`) lives in `src/render/weekly.ts`,
`src/render/checkpoint.ts`, `src/render/sop.ts` and
`src/render/student-sheet.ts` as **pure functions from validated
data to a Markdown string** -- no file I/O, no `process` access, no dates,
no randomness. `cac render` itself (`src/cli/commands/render.ts`) is only
subcommand/flag parsing plus the thin `--out`/`--force` file-writing layer
(`src/cli/output-writer.ts`), exactly the same split `cac plan` uses
around `buildCohortPlan`.

Every renderer fails loudly on an out-of-range request: it throws a named
`RenderRequestError` (`src/render/errors.ts`) naming the valid range,
before emitting anything, rather than ever producing a partially-filled
document. `cac render` catches that one error class and reports it as a
clean usage error (exit `2`).

### `cac render weekly`

Renders a mentor-ready plan for one week of the §4 28-week syllabus: the
week number and focus, its content list, its learning outcome, the
practice/evaluation target together with the curated problem-load range
(or an explicit "no fixed count" note where a week's `problemLoad` is
`null` -- simulation/contest weeks), both §5.1 120-minute session
templates with their five segment timings and activities, the §5.1
exit-ticket instruction, the §5.2 seven-step SOP reminder, the §5.3 hint
policy ladder, and -- only on a gate week -- the §4.1 gate evidence
required to proceed past it.

| Flag | Meaning |
| --- | --- |
| `--week <n>` | The week number, `1`-`28`. **Required.** |

### `cac render checkpoint`

Renders a checkpoint sheet for one of the seven §4.1 phase gates: the
gate evidence required to proceed, the §6.1 rubric weights table (with
each component's evidence column), an A/B/C/D recording grid (§6.2, with
each status's prescribed follow-up action), and the §6.3 KPI snapshot
fields (from `listKpiDefinitions()`).

| Flag | Meaning |
| --- | --- |
| `--number <n>` | The checkpoint number, `1`-`7`. **Required.** |

### `cac render sop`

Renders a one-page mentor SOP card: the §5.2 seven-step SOP, its minimum
test checklist, its four post-Accepted questions, and the §5.3 hint
policy ladder together with the mandatory re-solve obligation it carries
from level 4 onward. Takes no subcommand-specific flags.

### `cac render lembar-siswa`

Renders an Indonesian-language learner sheet ("lembar belajar siswa") for
one week, derived **only** from the validated corpus -- it adds headings
and labels but no explanatory teaching text (authored material is a
separate matter, ADR-0007). Sections, in order: title, week and focus;
the week's content coverage; the outcome (capaian); the topic families
the week exercises (name and coverage); the practice target with the
problem-load range (or a note that there is no fixed count, and a marker
when the week has a mini contest); -- only when a §4.1 phase gate follows
the week -- the evidence to master before moving on; the §5.3 hint-policy
callout quoted verbatim; a self-check list of **blank** checkboxes (one
per content item plus the outcome); the references cited by the week's
topic families (deduplicated, in order of first appearance); and a footer naming
the source syllabus, version and date from the programme registry.

The sheet has no fields for a learner's name, school or any other
identifier, and the output is byte-deterministic (ADR-0004: nothing about
a learner is stored).

| Flag | Meaning |
| --- | --- |
| `--week <n>` | The week number, `1`-`28`. **Required.** |

### `cac render lembar-siswa --program sma-coding`

The learner sheet of one week of the `sma-coding` programme (issue #77),
derived **only** from the validated corpus. `--week` takes a **week code**
instead of a number: a track week such as `A-X1-M9`, `C-X1-M8`, `D-XI1-M5` or
`E-XI2-M12`, or a week of the shared foundation block such as `FND-X1-M3`
(case-insensitive). An unknown code is exit `2` and the message lists example
valid codes (`jalur A: A-X1-M8 .. A-XII2-M14; jalur B: ...; jalur E: E-XI1-M1 ..
E-XII2-M14; blok fondasi FND: FND-X1-M1 .. FND-X1-M7`).

Sections, in order: title and code; the position (track, class, semester and
week, or "blok fondasi bersama"); the topic; **Tujuan**, **Keluaran** and
**Latihan dan kegiatan** (verbatim corpus cells); **Butir CP terkait** (the
items `cp-mapping.json` maps to the week, with their label, plus the CP
quotation of each element from `cp-elements.json`; for a pengayaan track
the section says the track is outside the CP wording and shows no quotation);
**Irisan dengan CP (pengayaan, tidak dihitung pemenuhan CP)** (only when
`enrichmentLinks` names the week); **Jembatan ke OSN** (only
when `osn-bridge.json` names the week); **Modul terkait** (only when
`data/sma-coding/modules.json` exists and an indexed module lists the week in
`weekCodes`: id, title and status; a module that is not `disetujui` is marked
**DRAF**); **Daftar periksa mandiri** (blank checkboxes, one per clause of the
objective plus one for the output); and a footer with the syllabus name,
version and date from the programme registry. There is no field for a name or
school (ADR-0004), and the output is byte-deterministic. `--out` and `--force`
behave as for the other render subcommands. The week data are the same that
`cac plan --program sma-coding` prints.

Real output (`cac render lembar-siswa --program sma-coding --week FND-X1-M3`):

```text
# Lembar Belajar Siswa -- Minggu FND-X1-M3

**Kode minggu:** FND-X1-M3

**Posisi:** Blok fondasi bersama, untuk semua murid sebelum memilih jalur (kelas X, semester X1, minggu 3)

**Topik:** Representasi data: biner, heksadesimal, teks, gambar sederhana

## Tujuan
mengonversi bilangan desimal, biner, dan heksadesimal; menjelaskan bit dan byte; menjelaskan bahwa teks disimpan sebagai kode karakter; menjelaskan gambar sebagai kisi piksel dan warna sebagai komponen merah-hijau-biru

## Keluaran
tabel konversi; lembar kode karakter; gambar 8x8 dalam bentuk deret bit

## Latihan dan kegiatan
konversi manual dengan lembar kerja; menyandikan kata fiktif dengan tabel kode karakter; menggambar gambar 8x8 hitam-putih di kertas kotak lalu menuliskannya sebagai deret bit; memilih warna dan membaca kode heksadesimalnya di aplikasi gambar

## Butir CP terkait
Tidak ada butir CP yang dipetakan ke minggu ini dalam pemetaan silabus.

## Daftar periksa mandiri
- [ ] mengonversi bilangan desimal, biner, dan heksadesimal
- [ ] menjelaskan bit dan byte
- [ ] menjelaskan bahwa teks disimpan sebagai kode karakter
- [ ] menjelaskan gambar sebagai kisi piksel dan warna sebagai komponen merah-hijau-biru
- [ ] Keluaran selesai: tabel konversi; lembar kode karakter; gambar 8x8 dalam bentuk deret bit

---
Sumber: Silabus Pembelajaran Coding SMA, versi 1.4.2, tanggal 2026-11-20.
```

Unknown code (exit `2`):

```text
cac render lembar-siswa: kode minggu "A-X1-M1" tidak dikenal untuk program sma-coding. Contoh kode yang sah: jalur A: A-X1-M8 .. A-XII2-M14; jalur B: B-X1-M8 .. B-XII2-M14; jalur C: C-X1-M8 .. C-XII2-M14; jalur D: D-X1-M8 .. D-XII2-M14; jalur E: E-XI1-M1 .. E-XII2-M14; blok fondasi FND: FND-X1-M1 .. FND-X1-M7.
```

A week of a pengayaan track (`cac render lembar-siswa --program sma-coding --week D-XI1-M5`, middle of the output):

```text
## Butir CP terkait
Jalur D adalah pengayaan di luar rumusan CP; minggu jalur ini tidak dihitung sebagai pemenuhan butir CP mana pun.

## Irisan dengan CP (pengayaan, tidak dihitung pemenuhan CP)
- F-AD-a: sumber data terbuka, terpercaya, legal untuk keputusan dan prediksi. Tingkat irisan: **Irisan terdekat.** Sedang: rumusan menyebut "prediksi" dan "tanpa atau dengan komputer", tetapi tidak menyebut AI atau pembelajaran mesin.
```

### `cac render modul`

Renders one learning module of the programme (`--program`, default
`osn`; every programme with a `modules.json` is supported: `sma-coding`,
issue #106, and `tk-coding`, `sd-coding`, `smp-coding`, `kuliah-coding` and
`dewasa-coding`, ADR-0008) from
`data/<program>/modules.json` and its Markdown body under
`content/<program>/modules/`. Unlike the other renderers this output is
**authored content** (ADR-0007), not derived from the syllabus, so its
status is always visible. Layout, in order: `# <title>`; unless the
status is `disetujui`, a banner as the first line after the title --
`> **DRAF — belum ditinjau.**` (`draf`),
`> **DRAF — sedang ditinjau, belum disetujui.**` (`ditinjau`) or
`> **DITARIK — jangan dipakai.**` (`ditarik`); the module body verbatim;
`## Rujukan` (each `refId` resolved against the programme's
`references.json`, or the explicit title and URL; the modules of every
programme but `osn` only have explicit references); and a footer with the
status, the programme and, for `disetujui`, the approval date and the
reviewer's role. A `tk-coding` module that records a `cpOverlap` adds the
footer line `Irisan penafsiran dengan CP Fase Fondasi (bukan pemenuhan CP):
<kode>.` Output is byte-deterministic.

An unknown `--id` (the error lists the known ids), a missing `--id`, a
programme without `modules.json` (the message is `this programme has no
modules.json`), an invalid index, a missing or blank body, or a dangling
`refId` is exit `2` (run `cac validate` for the full findings).

| Flag | Meaning |
| --- | --- |
| `--id <id>` | The module id. **Required.** |
| `--lembar` | Render the module's learner sheet (`content/<program>/lembar/<id>.md`) instead of the module body: the child's sheet of `tk-coding` and `sd-coding`, or the worksheet ("lembar kerja") of a module of any other programme whose index entry has a `learnerSheetPath` (ADR-0011). Exit `2` when the module has no sheet or with any other `render` subcommand. |

#### Examples (synthetic fixture)

The examples below were produced against a temporary copy of the repository
with a synthetic `data/tk-coding/modules.json` and synthetic content files
(`tk-a1-m1`) whose status is `draf`, to show the draft banner; the
repository's own module indexes of these programmes exist and every entry is
`disetujui` since 2026-11-20 (no banner, footer `Disetujui pada 2026-11-20 oleh
peninjau dengan peran: pemilik program.`).

A `tk-coding` module is a **teacher guide**; its status banner is the same as
for every programme, and `cpOverlap` is shown as an interpreted overlap:

```text
$ cac render modul --program tk-coding --id tk-a1-m1
# Kegiatan sehari-hariku

> **DRAF — belum ditinjau.** Modul ini ditulis oleh tim (termasuk draf yang disusun agen AI) dan belum ditinjau oleh manusia. Isinya dapat memuat kekeliruan; periksa ke rujukan resmi di bagian bawah sebelum dipakai.

## Tujuan

Anak menyebut dua kegiatan yang berurutan.

## Rujukan
- Rujukan sintetis untuk uji <https://contoh.example/rujukan>

---
Status modul: draf.
Program: Silabus Pembelajaran Coding TK/PAUD (Berpikir Komputasional) (tk-coding).
Irisan penafsiran dengan CP Fase Fondasi (bukan pemenuhan CP): FF-DL-b.
```

`--lembar` renders the separate sheet for the child (`content/tk-coding/lembar/tk-a1-m1.md`):
same title and banner, a `**Lembar anak**` label, the sheet verbatim and a
footer with status and programme; no `## Rujukan` section.

```text
$ cac render modul --program tk-coding --id tk-a1-m1 --lembar
# Kegiatan sehari-hariku

**Lembar anak**

> **DRAF — belum ditinjau.** Modul ini ditulis oleh tim (termasuk draf yang disusun agen AI) dan belum ditinjau oleh manusia. Isinya dapat memuat kekeliruan; periksa ke rujukan resmi di bagian bawah sebelum dipakai.

## Tempel urutannya

Tempel gambar cuci tangan, lalu gambar makan.

---
Status modul: draf.
Program: Silabus Pembelajaran Coding TK/PAUD (Berpikir Komputasional) (tk-coding).
```

A child's sheet must have **no name or identity field of the child**
(privacy, ADR-0004; `src/domain/learner-sheet.ts`): a heading, a table
header or a fill-in line such as `Nama:`, `Nama anak`, `NIS`, `Tanggal
lahir`, `Alamat`, `Identitas` -- bare or filled in. The renderer refuses such
a sheet (exit `1`, nothing on stdout) and `cac validate` reports it. A line
that merely begins with the word (`Nama binatang: kucing`) is not a field.

```text
$ cac render modul --program tk-coding --id tk-a1-m1 --lembar
cac render modul: the learner sheet of "Kegiatan sehari-hariku" has a name or identity field of the child: line 3 ("Nama: ______"). A child's sheet carries none; remove it from the sheet.
[exit 1]

$ cac render modul --program smp-coding --id smp7-1-m1 --lembar
cac render modul: module "smp7-1-m1" has no learner sheet.
[exit 2]
```

The other programmes (`smp-coding`, `kuliah-coding`, `dewasa-coding`)
render exactly like `sma-coding` modules: the guide for the pupil, student
or participant, with its own `Program:` footer line.

**Worksheets with their own status (ADR-0011).** For `osn`, `smp-coding`,
`sma-coding`, `kuliah-coding` and `dewasa-coding` a module may have a printable
worksheet whose review status is its own (`learnerSheetStatus`), apart from the
module's (the module may be `disetujui` while its worksheet is still `draf`).
`--lembar` prints the title, the label `**Lembar kerja**` (instead of `**Lembar
anak**`), a banner taken from the **sheet's** status (`draf`, `ditinjau` or
`ditarik`: the wording says "Lembar ini ..."; none for `disetujui`), the sheet
verbatim, and a footer `Status lembar: <status>.` with the programme and, for an
approved sheet, the date and reviewer role of `learnerSheetReview`. The rule
about a name or identity field applies to these sheets too. Worksheets are
optional per module for now; none has been added yet.

`plan` and `render lembar-siswa` still refuse these programmes (they read
the OSN corpus, or only `sma-coding`'s); the message is honest about it and
names `render modul`:

```text
$ cac plan --program tk-coding --track A
cac plan: belum didukung untuk program tk-coding: perintah ini membaca corpus OSN (program "osn") saja dan tidak akan menyajikannya sebagai data tk-coding. "cac plan" dan "cac render lembar-siswa" hanya tersedia untuk program "osn" dan "sma-coding"; program tk-coding didukung oleh "cac render modul --program tk-coding --id <id>" (tambahkan --lembar untuk lembar anak; perlu data/tk-coding/modules.json), "cac validate --program tk-coding" dan "bun run check:fidelity --program tk-coding".
[exit 2]
```

### Checking a module's code examples

`bun run check:module-code` (`scripts/check-module-code.ts`, run in CI
after `cac validate`) extracts the fenced blocks from
`content/**/modules/*.md` and from the learner sheets
`content/**/lembar/*.md` (ADR-0011) and checks them without running anything:

- ```` ```cpp ```` -- `g++ -std=c++17 -fsyntax-only`.
- ```` ```arduino ```` -- the same compiler with `#include "Arduino.h"`
  resolved to the mock header `scripts/fixtures/arduino-mock/Arduino.h`
  (`pinMode`, `digitalWrite`, `Serial`, `String`, `map`, `constrain`, ...;
  `setup`/`loop` only declared). This is a syntax and type check against a
  mock API, not evidence of behaviour on a board.
- ```` ```python ```` -- `python3 -I -c "import ast,sys; ast.parse(sys.stdin.read())"`;
  syntax only.
- ```` ```ts ```` (also ```` ```typescript ````) and ```` ```js ```` (also
  ```` ```javascript ````) -- Bun's built-in `Bun.Transpiler` with the `ts` or
  `js` loader parses the block and the output is discarded; nothing is run and
  no dependency is added. This is a **syntax check only, not a type check**:
  `let x: string = 5;` and a call to an undeclared name pass, a top-level
  `return` passes, and imports are not resolved. Malformed code and a
  duplicate declaration in one scope are rejected, with the line and column
  inside the block. JSX is not enabled (```` ```tsx ```` and ```` ```jsx ````
  blocks are not checked at all).

A fenced block indented inside a list item (for example a fence opened with
three spaces) is dedented as CommonMark does: the opening fence's
indentation is removed from each content line (at most that many spaces)
before the block is checked.

An intentionally incomplete block (a fill-in-the-blank exercise) is excluded
by adding the word `setengah-jadi` after the language in the opening fence
(```` ```cpp setengah-jadi ````, ```` ```arduino setengah-jadi ````,
```` ```python setengah-jadi ````, ```` ```ts setengah-jadi ````,
```` ```js setengah-jadi ````); it is skipped but counted in the output.
Exit `0` clean, `1` when a block fails or when `g++` or `python3` is not
installed.

### Checking learner-sheet assets

`bun run check:learner-assets` (`scripts/check-learner-assets.ts`, run in
CI) checks `content/<program>/gambar/*.svg`: well-formed XML, an `svg` root
with a `viewBox`, no `<script>`, `<image>` or `<foreignObject>`, no `on*`
attribute, no `href` / `xlink:href` other than `#fragment`, no `data:` URI,
no DOCTYPE, no `@import` or `url()` that is not a `#fragment`, and at most
50 KB. It also checks every image link `![...](...)` in
`content/<program>/lembar/*.md`: the target must exist inside that
programme's `gambar/`. An SVG no sheet references is printed as a warning
and does not change the exit code. Exit `0` clean (warnings allowed), `1` on
any error.

The same command also fails when a module body
(`content/<program>/modules/*.md`) or a sheet (`lembar/*.md`) begins with
its own `# ` title: `cac render modul` already prints the H1 from the index,
so the title would appear twice. This is an **error** (exit code 1;
`DUPLICATE_TITLE_IS_ERROR` in `scripts/check-learner-assets.ts` is `true`).

### `--out` / `--force` (all `cac render` subcommands)

| Flag | Meaning |
| --- | --- |
| `--program <id>` | The registered programme whose corpus to use. Default `osn`; an unknown id is exit `2`. `sma-coding` is supported by `render lembar-siswa` (with a week code, see below) and `render modul`; `weekly`, `checkpoint` and `sop` read the OSN corpus only and exit `2` with "belum didukung untuk program <id>" for every programme other than `osn`; the five other coding programmes (everything but `osn` and `sma-coding`) also refuse `render lembar-siswa` the same way (the message now names `render modul`), and support `render modul` once they have a `modules.json` (`--lembar` for any module whose index entry has a `learnerSheetPath`), else exit `2` with "this programme has no modules.json". |
| `--out <path>` | Write the rendered Markdown to this path instead of printing it to stdout. Resolved against the process's current working directory. |
| `--force` | Required to overwrite a file that already exists at `--out`. Without it, an existing file is left byte-for-byte untouched (the write itself never opens the file for truncation) and the command exits `2` -- a mentor should never silently lose an edited worksheet to a repeated `cac render ... --out` invocation. |

Without `--out`, the rendered Markdown is printed to stdout and nothing is
written to disk.

### Exit codes

| Code | Meaning |
| --- | --- |
| `0` | Success. |
| `1` | (`render lembar-siswa --program sma-coding` only) the programme corpus fails validation; or (`render modul --lembar`) the learner sheet has a name or identity field. |
| `2` | Usage error: a missing or unknown subcommand, a missing required flag (`--week`/`--number`/`--id`), a `--week`/`--number` value outside its valid range (or not an integer, or, for `sma-coding`, an unknown week code), an unknown or unreadable module, or a module without a learner sheet when `--lembar` is given (`render modul`), or `--out` already exists without `--force`. |

### Example

```text
$ cac render checkpoint --number 1
# Checkpoint 1 (after week 4: Search/sort dasar & recursion)

## Gate evidence required (§4.1)
- Dapat coding dasar tanpa template berlebihan
- memahami Big-O dasar
- binary search/recursion sederhana
- tracing C++.

## Rubric weights (§6.1)
| Component | Weight | Evidence |
| --- | --- | --- |
| Computational thinking & konsep | 20% | Tracing; modeling; quiz logika/complexity. |
...
```

## `cac report`

Computes the seven §6.3 mentor KPI metrics (`src/domain/kpi.ts`), a §13.1
step-4 postmortem error-taxonomy breakdown, and a §13.1 step-5
scheduled-re-solves listing (`src/domain/assessment.ts`'s
`resolveSchedule`) from a file of already-produced §15 learning records.
Implements FR-25, OR-09, OR-10.

```sh
cac report --records <path> [options]
```

The actual reporting logic (`buildKpiReport`) lives in
`src/domain/report.ts` as a pure function with no I/O -- `cac report`
itself (`src/cli/commands/report.ts`) is only input-format detection, the
**privacy gate** (below), schema validation, and the two renderers in
`src/cli/format-report.ts` (`formatReportMarkdown`, `formatReportJson`),
exactly the same split `cac validate`/`cac plan` use around their own
domain functions.

### Options

| Flag | Meaning |
| --- | --- |
| `--program <id>` | The registered programme whose corpus to use. Default `osn`; an unknown id is exit `2`. every programme other than `osn` is registered but not supported: exit `2`, "belum didukung untuk program <id>" (for example `sma-coding`). |
| `--records <path>` | A `.jsonl` (one JSON record per line, blank lines skipped) or `.json` (a JSON array of records) file. **Required.** See "Input format detection" below. |
| `--by <topic\|week\|none>` | Group the KPI metrics by topic family or by §4 week number, in addition to the always-present overall (ungrouped) section. Default `none`. `topic` and `week` are a documented limit: they always exit `2` with an explanatory message. See "Grouping: a documented limit" below. |
| `--format <md\|json>` | Output format. Default `md`. |
| `--out <path>` | Write the rendered report to this path instead of stdout. |
| `--force` | Required to overwrite a file that already exists at `--out`. Without it, an existing file is left byte-for-byte untouched and the command exits `2` -- same safety property as `cac render`'s `--out`/`--force` (`src/cli/output-writer.ts`). |
| `-h`, `--help` | Show `cac report`'s own help. |

### Input format detection

`--records` accepts two shapes, chosen by this rule:

1. A `.jsonl` extension (case-insensitive) -> parsed as one JSON value per
   line; blank (whitespace-only) lines are skipped entirely and consume no
   record index.
2. A `.json` extension -> parsed as a single JSON array of records.
3. Any other extension -> **content-sniffed**: the whole trimmed file is
   parsed as JSON; if that succeeds and the result is an array, it is
   treated as `.json`-mode, otherwise as `.jsonl`-mode.

A record index reported in any error message below is: for `.jsonl` input,
the record's 0-indexed position among *non-blank* lines (so a blank line
never shifts later indices); for `.json` input, its 0-indexed position in
the array.

### The privacy gate

**Before anything is computed** -- before schema validation, before any
KPI is touched -- every successfully-parsed record in the input is scanned
with `findDirectIdentifiers` (`src/schema/learning-record.ts`'s recursive
walk against `DIRECT_IDENTIFIER_DENYLIST`, at any nesting depth). If
**any** record anywhere in the file carries a denylisted-identifier-shaped
key (`name`, `email`, `nisn`, `school`, ...; see ADR-0004), the whole file
is refused outright: no report is computed, no partial output is printed,
and the command exits non-zero.

The refusal message names every offending field's **path** and the
**record index** it was found in -- **never the value found there**, so a
real identifier accidentally present in an export is never echoed back
into a terminal, a CI log, or a redirected `--out` file. For example:

```text
$ cac report --records ./export-with-a-mistake.jsonl
cac report: privacy refusal: 1 field(s) shaped like a direct or indirect personal identifier were
found (see ADR-0004). Refusing to process "./export-with-a-mistake.jsonl". Values are never logged
-- only field paths and record indices are shown below. Remove or rename these fields in the
source data and re-run:
  - [index 3] (root): key "email"
```

This gate runs strictly before schema validation, so the message a mentor
sees is unambiguously "you have personal data in this file, remove it" --
never a generic "unrecognized key" schema error that could be mistaken for
an ordinary typo (a denylisted key like `email` would also fail
`learningRecordSchema`'s `.strict()` mode, since it is not a recognised
field, but that is not the error this command reports for it).

### Invalid records

If the privacy gate passes but one or more records fail
`learningRecordSchema` (or, for `.jsonl` input, one or more lines are not
valid JSON at all), the command refuses to process the file and reports
**every** failing record index at once (not just the first) -- the same
"report every invalid index" discipline `parseLearningRecords`
(`src/domain/learning-record.ts`) already uses for #15's batch parsing.

### Grouping: a documented limit

`buildKpiReport` (`src/domain/report.ts`) supports grouping the report by
topic or by §4 week number, but only when given a `resolveTopic`/
`resolveWeek` function -- a `LearningRecord` carries a `problemId` and a
`recordedAt` timestamp, but no topic-family id and no week number of its
own (see that module's docblock for the full reasoning). **This repository
ships no `problemId` -> topic-family registry and no timestamp -> §4-week
registry** -- there is no `data/osn/*.json` file mapping specific problem ids
to topic families, and mapping a timestamp to a week number needs a
cohort's own start date and excluded-days list (`src/domain/cohort-plan.ts`),
which `cac report` has no flag to supply.

Consequently, **`--by topic` and `--by week` are a documented limit of the
CLI, not a pending feature**: they always exit `2`, and the pesan galat
(decided by the owner on 2026-11-18, issue #95) states the reason and the
supported alternatives. For `--by topic`:

```text
cac report: --by topic is not supported by the CLI: a learning record carries a problemId but no topic family (rumpun materi), and no problem-to-topic mapping is shipped with the CLI. Supported: omit --by (or use --by none) for the overall report; export --format json and group by topic outside the CLI. This is a documented limit (docs/cli/README.md, "cac report").
```

`--by week` gives the same message with its own reason (a record carries
a `recordedAt` timestamp but no week number, and a week depends on a
cohort's own start date and excluded days). The only grouping that works
via the CLI is `--by none` (the default). `buildKpiReport` itself is fully
generic over any caller-supplied resolver, so a programmatic caller in the
same process that does have a real topic/week mapping can pass
`resolveTopic`/`resolveWeek` and get per-group sections without any change
to `src/domain/report.ts`.

### Report contents

Regardless of `--by`, every report contains:

- **The seven §6.3 KPI metrics** (`src/domain/kpi.ts`), computed over the
  whole input (the `overall` section) and, when grouping succeeds, again
  per group. Each metric is reported as either its computed value or an
  explicit `"insufficient data: <reason>"` -- never coerced to a bare `0`
  (see `src/domain/kpi.ts`'s "no NaN/Infinity, ever" contract).
- **A postmortem section** (§13.1 step 4): counts and shares of the five
  error-taxonomy classes (`conceptual`, `modeling`, `complexity`,
  `implementation`, `debugging`) across every record that carries a
  non-null `errorTaxonomy`. All five classes are always listed, even one
  nobody hit in that batch (`count: 0`).
- **A scheduled re-solves section** (§13.1 step 5): every record whose
  `status` is `B` or `C`, paired with the §6.2 3-7 day re-solve window
  `resolveSchedule` (`src/domain/assessment.ts`) computes from that
  record's own `recordedAt` -- sorted by that window's earliest date. This
  reports each entry's due *window* only, never an "is it overdue right
  now" boolean computed against the current wall-clock time (that would
  make the report non-deterministic; a record's own `resolveStatus` field
  is already the authoritative source for whether a re-solve is still
  outstanding).

### Exit codes

| Code | Meaning |
| --- | --- |
| `0` | Success. |
| `1` | Invalid input: one or more records failed schema validation (every failing index listed), or a privacy refusal (see above). Both cases exit `1`; a privacy refusal is distinguished by its message (always starting `"cac report: privacy refusal:"`), never by a different exit code -- see `src/cli/commands/report.ts`'s docblock for why this repository did not add a fourth exit code just for this one case. |
| `2` | Usage error: `--records` missing, the given path cannot be read, an unknown `--by`, an unknown `--format`, `--by topic`/`--by week` (a documented limit, see "Grouping" above), or `--out` already exists without `--force`. |

### Example

```text
$ cac report --records data/osn/samples/learning-records.sample.jsonl
# osn report: mentor KPI dashboard

Generated from 58 learning record(s), grouped by "none".
§6.3 caveat: every metric below must be read alongside "Jumlah soal bukan satu-satunya KPI; mastery dan transfer lebih penting."

## overall (58 record(s))

### A/B/C/D per topic

_Mengukur independensi dan dependency pada bantuan._

Total records: 58

| Topic | Total | A | B | C | D |
| --- | --- | --- | --- | --- | --- |
| unresolved | 58 | 23 (39.7%) | 11 (19.0%) | 11 (19.0%) | 13 (22.4%) |

### Time-to-first-correct
...
```

(The output is cut after the first metric here; the real report continues
with the remaining six metrics, the postmortem and the scheduled re-solves.
Its section headings are `##` for `overall`, the postmortem and the
scheduled re-solves, and `###` for each metric. The `A/B/C/D per topic` metric shows one `unresolved`
bucket because no topic mapping is available to the CLI -- see "Grouping"
above; every record still counts, per `statusDistributionByTopic`'s own
"never silently drop a record" contract in `src/domain/kpi.ts`.)

### Sample data

`data/osn/samples/learning-records.sample.jsonl` (see
`data/osn/samples/README.md`) is a committed, clearly-synthetic sample dataset
-- fake pseudonymous learners (`lr_demo0001`-`lr_demo0010`), fake problem
ids (`demo-problem-001`-`demo-problem-015`), no real learner data of any
kind (ADR-0004). It exists so this command (and its tests) have real input
to run against without this repository ever holding real learner data;
**it must never be replaced with real cohort data.**

## `cac privacy-check`

A CI-checkable governance control (issue #23, GR-04): recursively scans
every `.json`/`.jsonl` file under `data/` — including nested directories
such as `data/osn/samples/` — for object keys shaped like a direct or
indirect personal identifier, at any nesting depth. This promotes the ad
hoc scan `tests/unit/learning-record.test.ts` already ran (top-level
`data/osn/*.json` only) to a first-class subcommand, per ADR-0004's "Decision
detail: enforcement mechanism".

```sh
cac privacy-check [options]
```

The actual scanning logic (`scanEntriesForDirectIdentifiers`) lives in
`src/domain/privacy-scan.ts` as a pure function over an injected entry
list — `cac privacy-check` itself (`src/cli/commands/privacy-check.ts`)
is only the recursive directory read (`src/cli/privacy-scan-loader.ts`)
plus the two renderers in `src/cli/format-privacy-check.ts`, exactly the
same split `cac validate` uses around `auditCorpus`.

### What it checks

Every object key found anywhere in the parsed contents of every
`.json`/`.jsonl` file under the scanned directory is compared against
`DIRECT_IDENTIFIER_DENYLIST` (`src/schema/learning-record.ts`): `name`,
`nama`, `email`, `phone`, `telepon`, `nik`, `nisn`, `school`, `sekolah`,
`address`, `alamat`, `birthdate`, `tanggallahir`, `dob`, `photo`, `foto`,
`ip`, `ipaddress` — case-insensitively, matching camelCase/snake_case/
kebab-case word boundaries, never a substring (see `isDenylistedKey`'s
docblock).

**Tolerance rule:** the key `name` is permitted everywhere under `data/`,
because this repository's pre-existing curriculum corpus (topic
families, competition stages, curriculum categories, ...) legitimately
carries a `name` field for a *curriculum entity's* printed name (e.g.
`{ "id": "osn-k", "name": "OSN-K" }` in `data/osn/competition-stages.json`),
never a person's name. Every other denylisted term is zero-tolerance: a
single occurrence anywhere under `data/` is reported. See
`docs/governance/privacy.md`'s "Must-not-collect list" section for the
full rationale, and `TOLERATED_KEY` in `src/domain/privacy-scan.ts` for
the enforcement.

A file that is not valid JSON (or a `.jsonl` line that is not valid JSON)
is skipped and reported separately as a `parseIssues` entry — this is
`cac validate`'s concern (schema/JSON conformance), not this control's;
one malformed file never prevents every other file from being scanned,
and a parse issue never affects this command's exit code.

### Options

| Flag | Meaning |
| --- | --- |
| `--json` | Emit `{ ok, findings, parseIssues, summary }` instead of grouped text. |
| `--data-dir <path>` | Scan a different directory instead of the repository's real `data/` (primarily for testing against a fixture directory). |
| `-h`, `--help` | Show `cac privacy-check`'s own help. |

### Finding shape: never the value

Every finding carries exactly three fields: `file` (or, for a `.jsonl`
file, `"<file>:<line>"`), `path` (the dot-separated in-file path to the
offending key's parent, or `"(root)"`), and `key` (the offending key
itself) — **never the value found there**, matching `cac report`'s
privacy-gate refusal pattern (`src/cli/commands/report.ts`'s docblock): a
real identifier accidentally committed must never be echoed back into a
terminal, a CI log, or a `--json` payload.

### Exit codes

| Code | Meaning |
| --- | --- |
| `0` | Clean — no direct-identifier-shaped key found (beyond the `name` tolerance). |
| `1` | One or more direct-identifier-shaped keys found. |
| `2` | Usage error: an unrecognised flag/argument, `--data-dir` given with no path, or the given directory cannot be read. |

### Example: clean corpus

```text
$ cac privacy-check
cac privacy-check: scanning /path/to/repo/data
OK -- 33 file(s) scanned, 0 direct-identifier-shaped key(s) found.
```

### Example: a planted identifier (illustrative)

```text
$ cac privacy-check --data-dir ./fixture-with-a-mistake
cac privacy-check: scanning ./fixture-with-a-mistake
FAILED -- 1 direct-identifier-shaped key(s) found in 3 file(s) scanned. Values are never shown -- only file, path, and key:

samples/learning-records.sample.jsonl:12:
  - (root): key "email"
```

### CI

`cac privacy-check` runs in CI (`.github/workflows/ci.yml`, the "Privacy
check" step) immediately after `cac validate`, on every push and pull
request, via `bun run privacy-check`.

## `cac checklist`

Renders the §14.1 eight-item cohort-readiness checklist, the §14.2 eight
operational rules and mentor quick-pointer callout, and the latest §14.2
rule 8 syllabus-check status (issue #25), together with this operational
corpus's own `syllabusVersion`/`syllabusDate`.

```sh
cac checklist [options]
```

The actual data lives in `data/osn/readiness-checklist.json` (the eight §14.1
items, each with a `verificationMethod` and `evidenceRequired`, both
DERIVED -- see `src/schema/readiness-checklist.ts`'s docblock) and
`data/osn/operational-rules.json` (the eight §14.2 rules and the mentor
quick-pointer callout, verbatim). The typed loaders
(`listReadinessItems`, `getReadinessItem`, `listOperationalRules`,
`quickPointer`, `listSyllabusChecks`, `latestSyllabusCheck`,
`daysSinceLastSyllabusCheck`) live in `src/domain/operations.ts`. The
Markdown renderer (`renderChecklist`) lives in `src/render/checklist.ts`
as a function of an explicit `asOf: Date` -- exactly as
`src/domain/cohort-plan.ts`'s `buildCohortPlan` takes its dates as
explicit input rather than calling `new Date()` itself, since "days since
last syllabus check" is necessarily relative to *some* current date. `osn
checklist` itself (`src/cli/commands/checklist.ts`) is the one place that
reads the wall clock, then passes that single `asOf` to both the Markdown
renderer and the `--format json` builder (`src/cli/format-checklist.ts`),
exactly the same split `cac plan`/`cac render` use around their own pure
functions.

### Options

| Flag | Meaning |
| --- | --- |
| `--format <md\|json>` | Output format. Default `md`. `--json` (the global flag) is equivalent to `--format json`; an explicit `--format` wins if both are given. |
| `--program <id>` | The registered programme whose corpus to use. Default `osn`; an unknown id is exit `2`. every programme other than `osn` is registered but not supported: exit `2`, "belum didukung untuk program <id>" (for example `sma-coding`). |
| `--out <path>` | Write the rendered checklist to this path instead of stdout. |
| `--force` | Required to overwrite a file that already exists at `--out`. Without it, an existing file is left byte-for-byte untouched and the command exits `2` -- same safety property as `cac render`'s/`cac report`'s `--out`/`--force` (`src/cli/output-writer.ts`). |
| `-h`, `--help` | Show `cac checklist`'s own help. |

### Contents

Regardless of `--format`, `cac checklist` reports:

- **The corpus version** -- `syllabusVersion`/`syllabusDate` from
  `data/osn/readiness-checklist.json` (`operationsCorpusVersion()` in
  `src/domain/operations.ts`).
- **The latest syllabus-check status** (§14.2 rule 8) -- the most recent
  entry in `data/osn/syllabus-check-log.json` by `checkedOn`, its `outcome`,
  the official sources it checked, and the number of whole days between
  that date and `asOf` (`daysSinceLastSyllabusCheck`, UTC-only date
  arithmetic, no `Date` mutation -- see that function's docblock).
- **The eight §14.1 readiness-checklist items**, each with its
  verification method and the evidence a mentor records.
- **The eight §14.2 operational rules**, in order.
- **The §14.2 mentor quick-pointer callout**: its ten ordered stages
  (Problem Solving -> C++ -> Complexity -> Math/Logic -> Complete Search
  -> Greedy -> DP -> Graph/Tree -> Data Structures -> Contest Engineering)
  and its closing condition that extension only follows once core is
  stable.

### Exit codes

| Code | Meaning |
| --- | --- |
| `0` | Success. |
| `2` | Usage error: an unknown `--format`, or `--out` already exists without `--force`. |

### Example

```text
$ cac checklist
# osn checklist: cohort readiness & operational rules

Corpus version: 2.0 (2026-09-04)

## Syllabus-check status (§14.2 rule 8)

Latest check: 2026-11-18 -- outcome: no-change.
Sources checked: R1, R2, R3, R7, R8.
Days since last check (as of 2026-11-18): 0.

## Cohort readiness checklist (§14.1)

1. **Verifikasi silabus resmi OSN dan halaman OSN-K/OSN-P terbaru.** (`verify-official-syllabus`)
   - Verification: ...
   - Evidence required: ...
...

## Operational rules (§14.2)

1. Core OSN harus lebih dahulu daripada extension.
...

## Mentor quick pointer (§14.2 callout)

Problem Solving -> C++ -> Complexity -> Math/Logic -> Complete Search -> Greedy -> DP -> Graph/Tree -> Data Structures -> Contest Engineering

Extension hanya setelah core stabil.
```

See `docs/operations/runbook.md` for how `cac checklist` fits into the
cohort-start procedure, and `docs/operations/syllabus-check.md` for the
full §14.2 rule 8 syllabus-check procedure this command's status line
summarises.
