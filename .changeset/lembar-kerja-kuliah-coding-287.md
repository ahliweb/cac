---
"curriculum-as-code": minor
---

Lembar kerja cetak untuk 24 modul `kuliah-coding` (issue [#287](https://github.com/ahliweb/cac/issues/287), epik #283, ADR-0011): `content/kuliah-coding/lembar/<id>.md` dengan satu SVG per lembar di `content/kuliah-coding/gambar/`, tanpa kunci jawaban dan tanpa kolom identitas. Setiap entri `data/kuliah-coding/modules.json` kini punya `learnerSheetPath` dan `learnerSheetStatus: "draf"` (modul tetap `disetujui`); lembar menunggu tinjauan pemilik. `KUL_LEARNER_SHEET_REQUIRED` kini `true`, sehingga `cac validate` menolak modul `kuliah-coding` tanpa lembar.
