# ADR-0006: Multi-program repository with per-programme corpora

## Status

Accepted, 2026-11-18.

## Context

Until now this repository encoded exactly one curriculum: the **Silabus
Operasional Pembinaan OSN Informatika 2026** (v2.0). Every file under
`data/` carries that syllabus's `syllabusVersion`/`syllabusDate`
(ADR-0005), the CLI assumes that one corpus, and the package is named
after it (`osn-informatika-2026`).

On 2026-11-18 the owner decided that the repository must also serve:

1. **Learning for OSN students** — learner-facing material, not only
   mentor-facing artefacts (see ADR-0007 for the content rules).
2. **A coding programme for Indonesian senior high schools (SMA)**,
   grades X–XII, with a C++ track aligned with OSN and a web track in
   JavaScript and TypeScript on the Bun runtime using the public
   `ahliweb/awcms-one` template. Its source syllabus does not exist yet; it
   is drafted from the official *Capaian Pembelajaran* (CP) Informatika of
   Kurikulum Merdeka and must be approved by the owner before it is
   encoded (issues #51 and #52).

The owner explicitly chose a **full restructure** over an additive layout
or a separate repository (decision recorded in issue #49). This ADR
records how the repository is reshaped so that more than one curriculum
programme can live in it without weakening the guarantees of ADR-0001
(schema-validated, version-controlled, testable curriculum data).

## Options considered

1. **Additive layout.** Keep the OSN corpus in `data/` as is, put any new
   programme in a sub-directory, and treat OSN as the implicit default.
2. **Separate repository** for the SMA programme, leaving this repository
   OSN-only (plus learner sheets).
3. **Full restructure.** Introduce an explicit *programme* concept: a
   registry of programmes, one corpus directory per programme
   (`data/<program>/`), a programme selector on every CLI command, and a
   package name that is no longer tied to one programme.

### Why option 1 (additive layout) was rejected

It is non-breaking, but it makes the layout permanently asymmetric: OSN
would be the only programme whose files sit at the top of `data/`, every
loader and script would need a special case for "the programme with no
directory", and nothing in the data would say which programme a file
belongs to. The owner rejected it in favour of a uniform layout.

### Why option 2 (separate repository) was rejected

The schema layer, corpus loader, validator, renderers, privacy scan, CI
and governance documents would all be duplicated and would drift. It
would also make the planned bridge from the SMA C++ track to OSN (a
student moving from school coding into olympiad training) a cross-
repository reference that `osn validate` cannot check.

## Decision

Option 3. Concretely:

| Aspect | Decision |
| --- | --- |
| Programme | A curriculum with its own source document, syllabus version and date, and corpus. Programme IDs are lower-case kebab-case. The first two are `osn` and `sma-coding`. |
| Registry | `data/programs.json`, validated by a Zod schema in `src/schema/`. It lists only programmes whose corpus exists in `data/`. A programme whose source syllabus is still a draft is documented under `docs/programs/<id>/` but is **not** registered and has **no** `data/<id>/` directory. |
| Corpus layout | `data/<program>/` holds that programme's JSON corpus. The OSN corpus moves, byte-identical, from `data/*.json` to `data/osn/`, and `data/osn/samples/` to `data/osn/samples/`. |
| Schemas | Existing schemas stay in `src/schema/` and may be reused by any programme whose source has the same shape. A programme-specific shape gets its own schema file. The rule "never data without a schema" (`AGENTS.md`) applies per programme. |
| CLI | The binary keeps the name `osn` (the repository's name; renaming it would break every documented command for no functional gain). Every command that reads a corpus accepts `--program <id>`, defaulting to `osn`. An unknown programme is a usage error (exit 2). `osn validate` without `--program` validates every registered programme. `osn privacy-check` keeps scanning all of `data/` recursively. |
| Package | Renamed from `osn-informatika-2026` to `kurikulum-informatika`. The repository itself keeps the name `osn`. |
| Versioning | ADR-0005 still holds, per programme: one package SemVer for the software, plus an independent `syllabusVersion`/`syllabusDate` carried by each programme's corpus and mirrored in the registry. `osn validate` checks that the two agree. |
| Documentation | The OSN transcription stays at `docs/silabus/` and the source PDF at `docs/*.pdf`; moving them would break every link in the requirements register and traceability matrices without changing behaviour. New programmes keep their source documents under `docs/programs/<id>/`. |
| Requirements | `docs/requirements/` remains the OSN register. A new programme's requirements are added under new IDs when its corpus is encoded, never by renumbering existing ones. |
| Release | The restructure is a **major** release (moved data paths and a renamed package break any consumer that reads them). |

## Consequences

- **Easier:** adding a programme is a mechanical, reviewable sequence —
  approved source document, schema, `data/<id>/`, registry entry, tests —
  and every programme gets the same validation, rendering and privacy
  guarantees.
- **Easier:** cross-programme references (for example, an SMA topic that
  prepares for an OSN topic family) can be validated by `osn validate`
  because both corpora live in one repository.
- **Harder:** every path, test, script and document that mentions
  `data/<file>.json` must change in one coordinated pull request (#50),
  and any downstream consumer reading those paths breaks.
- **Risk and mitigation:** the move could silently alter curriculum
  content. Mitigation: files are moved, not rewritten; the restructure
  pull request proves byte-identity (hash comparison before and after)
  and keeps `osn validate`, `check:checklist-fidelity` and
  `check:requirements` green. The breaking change is announced through a
  `major` changeset.
- **Risk and mitigation:** a draft programme could be encoded before its
  source is approved. Mitigation: the registry only admits programmes
  whose corpus exists, and the issue that encodes `sma-coding` (#52)
  requires the owner's dated approval of the source syllabus before its
  pull request is opened.
