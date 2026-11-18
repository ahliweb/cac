---
"kurikulum-informatika": minor
---

Add the `sma-coding` programme corpus, `data/sma-coding/`, transcribed from the approved SMA coding syllabus v1.0 (tracks A and B): CP quotations and item codes, tracks, programme structure, the 168-week plan, the CP-to-week mapping and the bridge to the OSN topic families. The programme is registered in `data/programs.json`; new schemas `src/schema/sma-*.ts` and `src/domain/sma-corpus-audit.ts` back `osn validate --program sma-coding` (which also checks that every OSN topic family id used by the bridge exists in the OSN corpus). `osn validate` without `--program` now validates both programmes. `osn plan`, `render` (except `render modul`), `report` and `checklist` refuse `--program sma-coding` with exit 2 ("belum didukung untuk program sma-coding") instead of serving OSN data. New `bun run check:sma-fidelity` (also run by `bun test`) compares every table cell of the syllabus with the data and fails on drift.
