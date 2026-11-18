## Summary

<!-- What does this PR do, and why? -->

## Linked issue

<!-- Closes #... -->

## Checklist

- [ ] Linked to an issue (`Closes #...` above).
- [ ] Scope is atomic — this PR does one thing; unrelated changes are not bundled in.
- [ ] Tests added/updated for the change.
- [ ] All local checks pass: `bun run format:check`, `bun run lint`, `bun run assist:check`, `bun run typecheck`, `bun run test:coverage`, `bun run build`, `bun run validate`, `bun run privacy-check`, `bun run check:module-code`.
- [ ] Conditional checks pass when relevant: `bun run check:requirements` (if `docs/requirements/` was touched) and `bun run check:sma-fidelity` (if `data/sma-coding/` or `docs/programs/sma-coding/silabus.md` changed).
- [ ] Docs updated (`docs/`) if behavior, setup, or process changed.
- [ ] Changeset added if this PR is user-visible (see release process).
- [ ] Acceptance criteria from the linked issue are met.
- [ ] Syllabus check done (per §14.2 rule 8) if curriculum data changed — official source, date checked, and changelog impact are recorded.
- [ ] No secrets, credentials, or personal data committed.
