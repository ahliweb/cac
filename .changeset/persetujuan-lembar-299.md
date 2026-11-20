---
"curriculum-as-code": minor
---

Pemilik program menyetujui 547 lembar kerja lima program modul-pelajar pada 2026-11-20 lewat dialog pilihan baku ("Setujui semua 547 lembar", [#299](https://github.com/ahliweb/cac/issues/299), epik #283): `osn` 10, `dewasa-coding` 36, `kuliah-coding` 24, `smp-coding` 84, `sma-coding` 393. Entri `data/<program>/modules.json` kini berstatus lembar `disetujui` dengan `learnerSheetReview` (`approvedOn` 2026-11-20, `reviewerRole` "pemilik program"), sehingga `cac render modul --lembar` tidak lagi mencetak banner DRAF dan mencatat tanggal serta peran persetujuan di kaki lembar. Persetujuan ini keputusan pemilik yang dicatat agent, bukan tinjauan isi per lembar. Status lembar dapat ditarik (`ditarik`) bila revisi menuntutnya. Dokumen disesuaikan.
