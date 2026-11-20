---
"curriculum-as-code": minor
---

Lembar kerja cetak untuk 84 modul `smp-coding` (issue [#288](https://github.com/ahliweb/cac/issues/288), epik #283, ADR-0011): `content/smp-coding/lembar/<id>.md` dengan satu SVG per lembar di `content/smp-coding/gambar/`, tanpa kunci jawaban dan tanpa kolom identitas. Setiap entri `data/smp-coding/modules.json` kini punya `learnerSheetPath` dan `learnerSheetStatus: "draf"` (modul tetap `disetujui`); lembar menunggu tinjauan pemilik. `SMP_LEARNER_SHEET_REQUIRED` kini `true`, sehingga `cac validate` menolak modul `smp-coding` tanpa lembar.
