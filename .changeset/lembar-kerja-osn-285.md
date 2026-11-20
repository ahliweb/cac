---
"curriculum-as-code": minor
---

Lembar kerja cetak untuk 10 modul `osn` (issue [#285](https://github.com/ahliweb/cac/issues/285), epik #283, ADR-0011): `content/osn/lembar/<id>.md` dengan satu SVG per lembar di `content/osn/gambar/`, tanpa kunci jawaban dan tanpa kolom identitas. Setiap entri `data/osn/modules.json` kini punya `learnerSheetPath` dan `learnerSheetStatus: "draf"` (modul tetap `disetujui`); lembar menunggu tinjauan pemilik. `OSN_LEARNER_SHEET_REQUIRED` kini `true`, sehingga `cac validate` menolak modul `osn` tanpa lembar. `cac render modul --program osn --id <id> --lembar` mencetak lembarnya dengan banner DRAF.
