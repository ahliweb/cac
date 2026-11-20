---
"curriculum-as-code": minor
---

Lembar kerja cetak untuk 393 modul `sma-coding` (issue [#289](https://github.com/ahliweb/cac/issues/289), epik #283, ADR-0011): `content/sma-coding/lembar/<id>.md` dengan satu SVG per lembar di `content/sma-coding/gambar/`, tanpa kunci jawaban dan tanpa kolom identitas. Setiap entri `data/sma-coding/modules.json` kini punya `learnerSheetPath` dan `learnerSheetStatus: "draf"` (modul tetap `disetujui`); lembar menunggu tinjauan pemilik. `SMA_LEARNER_SHEET_REQUIRED` kini `true`, sehingga `cac validate` menolak modul `sma-coding` tanpa lembar.
