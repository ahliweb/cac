---
"curriculum-as-code": minor
---

Lembar kerja cetak untuk 36 modul `dewasa-coding` (issue [#286](https://github.com/ahliweb/cac/issues/286), epik #283, ADR-0011): `content/dewasa-coding/lembar/<id>.md` dengan satu SVG per lembar di `content/dewasa-coding/gambar/`, tanpa kunci jawaban dan tanpa kolom identitas. Setiap entri `data/dewasa-coding/modules.json` kini punya `learnerSheetPath` dan `learnerSheetStatus: "draf"` (modul tetap `disetujui`); lembar menunggu tinjauan pemilik. `DW_LEARNER_SHEET_REQUIRED` kini `true`, sehingga `cac validate` menolak modul `dewasa-coding` tanpa lembar. Fixture uji `kuliah-coding`, `smp-coding`, dan `sma-coding` ikut membawa lembar supaya flag program itu dapat dibalik pada PR-nya.
