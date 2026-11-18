# Architecture Decision Records

This directory records the significant architectural decisions made for
`kurikulum-informatika`, in the lightweight ADR format popularised by
Michael Nygard. An ADR exists to answer, permanently, "why is it built
this way and not some other way" — without it, the reasoning behind a
choice like "JSON, not YAML" or "no LMS" lives only in someone's memory
and gets re-litigated every time a new contributor (human or agent) asks
the question.

## Format

Every ADR in this directory uses the same five sections, in this order:

| Section | Content |
| --- | --- |
| **Status** | `Proposed`, `Accepted`, `Superseded by ADR-NNNN`, or `Deprecated`. All ADRs below are `Accepted`. |
| **Context** | The problem or force that made a decision necessary — what requirement or constraint is driving this, with a citation to the syllabus section or requirement ID behind it. |
| **Options considered** | Every option that was seriously weighed, including the one chosen. At least two rejected alternatives, each with a concrete, specific reason it was rejected — not "we didn't like it." |
| **Decision** | The option chosen, stated plainly. |
| **Consequences** | What this decision makes easier, what it makes harder, and any risk it introduces along with its mitigation. |

ADRs are numbered sequentially, zero-padded to four digits
(`0001`, `0002`, ...), and never renumbered — like requirement IDs in
`docs/requirements/register.md`, an ADR number is permanent once assigned.
A superseding decision gets a new ADR number and updates the old one's
`Status` line to point at it; it does not overwrite or delete the old
file.

## Index

| ADR | Title | Status |
| --- | --- | --- |
| [0001](0001-curriculum-as-code.md) | Curriculum-as-code instead of an LMS or judge implementation | Accepted |
| [0002](0002-bun-typescript-zod.md) | Bun + TypeScript + Zod toolchain | Accepted |
| [0003](0003-json-data-with-zod-contracts.md) | JSON data with Zod schemas as the contract | Accepted |
| [0004](0004-no-learner-personal-data.md) | No learner personal data in the repository | Accepted |
| [0005](0005-dual-versioning.md) | Dual versioning: software SemVer vs. independent syllabus version | Accepted |
| [0006](0006-multi-program-repository.md) | Multi-program repository with per-programme corpora | Accepted |
| [0007](0007-authored-learning-content.md) | Authored learning content with a review lifecycle | Accepted |
| [0008](0008-skema-khusus-per-program.md) | Skema khusus per program dan titik sambung audit/fidelity | Accepted |
| [0009](0009-cac-platform-identity.md) | Curriculum as Code (CaC): target ahliweb/cac dan kompatibilitas migrasi | Accepted (rename pending) |

ADRs 0001–0005 satisfy requirement **TR-05** in
`docs/requirements/register.md` ("Architecture documentation and ADRs...
at least five Architecture Decision Records... each listing rejected
alternatives"), tracked under GitHub issue **#8**.
