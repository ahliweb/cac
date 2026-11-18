---
"kurikulum-informatika": minor
---

Add `osn render lembar-siswa --week <1-28> [--out <path>] [--force] [--program <id>]` (issue #53), which renders an Indonesian learner sheet for students: the week's focus, content coverage and outcome, the topic families it exercises (name and coverage), the practice target and mini-contest marker, the phase-gate evidence when a gate follows the week, the §5.3 hint-policy callout verbatim, a blank self-check list, the references cited by those topic families, and a source footer (syllabus name, version, date from the programme registry). Derived only from the validated corpus; no explanatory material and no learner-identity fields (ADR-0004); output is deterministic. `--out`/`--force` and exit codes behave as for the other `osn render` subcommands.
