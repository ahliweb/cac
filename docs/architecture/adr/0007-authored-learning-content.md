# ADR-0007: Authored learning content with a review lifecycle

## Status

Accepted, 2026-11-18.

## Context

`AGENTS.md` ("Curriculum content fidelity") requires curriculum content to
be **transcribed faithfully** from the source syllabus — never invented,
translated, or "improved" in meaning. That rule exists because this
repository's value is that its data *is* the syllabus (ADR-0001).

On 2026-11-18 the owner decided that, besides learner sheets derived from
the syllabus, the repository will hold **new learning modules** for
students: explanatory text and practice tasks written by the team,
including drafts produced by AI agents (issues #54 and #55). Such
material is by definition not in any source syllabus, so it cannot follow
the transcription rule. Without a separate set of rules it would either be
forbidden or, worse, be mixed into the corpus and look like syllabus
content.

The same question arises for the SMA coding syllabus (ADR-0006): it is
drafted by the team from the official CP Informatika, and is not a
source until the owner approves it.

## Options considered

1. **Two content classes with separate controls.** *Transcribed* content
   keeps the fidelity rule; *authored* content lives in its own files with
   its own schema and a mandatory review lifecycle, and is always visibly
   marked until a human approves it.
2. **No authored content.** Keep the repository strictly a transcription
   and leave learning modules to some other place.
3. **Authored content inside the corpus.** Add explanatory text and
   exercises directly to the existing corpus files (for example, a
   `lesson` field on each week).

### Why option 2 (no authored content) was rejected

The owner explicitly chose learner modules (issue #49). Keeping them
elsewhere would also lose the referential checks that make them useful
here: a module that names a topic family or week that does not exist
would go unnoticed.

### Why option 3 (authored content inside the corpus) was rejected

It erases the boundary the fidelity rule depends on. A reader, a mentor
or an agent could no longer tell which sentences come from the source
syllabus and which were written later, and a `syllabus check` (§14.2
rule 8) would have to be run against text that has no syllabus source.

## Decision

Option 1.

| Aspect | Decision |
| --- | --- |
| Transcribed content | Everything in a programme's corpus (`data/<program>/*.json`) and learner sheets rendered from it. The existing fidelity and syllabus-check rules apply unchanged. |
| Authored content | Learning modules: explanations, worked examples and practice tasks written by the team. Stored as an index `data/<program>/modules.json` (validated by a Zod schema, referentially checked against the programme's topic families, weeks and references) plus one Markdown body per module under `content/<program>/modules/`. The new top-level directory `content/` is scoped by issue #54. |
| Language | Modules are written in Indonesian, for Indonesian students. |
| Lifecycle | `draf` → `ditinjau` → `disetujui`, plus `ditarik` for withdrawn modules. |
| Approval | Only a human (the owner or a reviewer the owner designates) may set `disetujui`. The schema requires an approval date and the reviewer's role when the status is `disetujui`; the role is recorded, not a personal name (data minimisation). **AI agents may create and edit drafts but never set `disetujui`**, and never record an approval the owner did not give. A change to `disetujui` references the issue where the owner's decision is recorded. |
| Visibility | Every rendering of a module that is not `disetujui` carries a prominent `DRAF — belum ditinjau` banner. |
| Accuracy | Each module cites official or well-established references (the programme's `references`, official syllabi, or recognised textbooks). Code examples must be checkable; the mechanism is decided in issue #54. |
| Copyright | Problems from judges or past competitions are **linked**, not copied. Practice tasks written for a module are original. |
| Boundaries | ADR-0001 and ADR-0004 still hold: this is not an LMS or a judge, no submitted code is executed, and no learner data is stored. Self-check lists are blank forms. |
| Draft source syllabi | A draft programme syllabus (for example `docs/programs/sma-coding/`) is authored content too: it stays marked `DRAF` until the owner approves it, and only then becomes the transcription source for that programme's corpus (ADR-0006). |

## Consequences

- **Easier:** learner modules can be written and iterated quickly,
  including by AI agents, without diluting the guarantee that the corpus
  is the syllabus.
- **Easier:** a module that references a missing topic family, week or
  reference fails `osn validate`, like any other corpus error.
- **Harder:** every module needs a human review before it loses its
  `DRAF` banner, so drafted content may wait for review.
- **Risk and mitigation:** an agent could set `disetujui` by editing a
  field. Mitigation: the rule is stated here and in `AGENTS.md`; the schema
  demands an approval date and reviewer role; the change must reference the
  owner's recorded decision; and reviewers check it in the pull request.
- **Risk and mitigation:** authored text could contain technical errors
  that students learn from. Mitigation: mandatory references, checkable
  code examples, the visible draft banner, and human review before
  approval.
