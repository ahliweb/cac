# ADR-0011: Lembar kerja cetak untuk program yang modulnya dibaca pelajar

## Status

Accepted — 2026-11-20. Keputusan pemilik (dialog pilihan baku, 2026-11-20),
epik [#283](https://github.com/ahliweb/cac/issues/283), infrastruktur di issue
[#284](https://github.com/ahliweb/cac/issues/284). Melengkapi
[ADR-0007](0007-authored-learning-content.md) (konten karangan dan siklus
tinjauan) dan [ADR-0008](0008-skema-khusus-per-program.md) (skema per program);
tidak menggantikan keduanya.

## Context

`tk-coding` dan `sd-coding` sudah punya lembar anak per modul
(`content/<program>/lembar/<id>.md` dengan SVG di `content/<program>/gambar/`):
modul di dua program itu adalah panduan guru, jadi anak membaca lembarnya, dan
lembar itu mengikuti status modulnya. Lima program lain (`osn`, `smp-coding`,
`sma-coding`, `kuliah-coding`, `dewasa-coding`) punya modul yang dibaca pelajar
langsung, dan seluruh 753 modul coding berstatus `disetujui` sejak 2026-11-20.
Pemilik memutuskan lima program itu juga mendapat lembar kerja yang bisa
dicetak, satu per modul. Lembar yang baru ditulis belum ditinjau manusia mana
pun, padahal modulnya sudah `disetujui`; bila lembar ikut status modul,
lembar draf akan tampil sebagai sudah disetujui, padahal ADR-0007 menyatakan
hanya manusia yang menyetujui.

## Options considered

| Opsi | Kelebihan | Kekurangan |
| --- | --- | --- |
| A. Lembar dengan status tinjauan sendiri, kolom indeks opsional per program (dipilih) | Modul tetap `disetujui` tanpa menyentuh persetujuan; lembar draf diberi spanduk `DRAF` jujur; program bisa menambah lembar bertahap tanpa memecah CI | Tiga kolom baru di lima skema; satu aturan bersama harus dijaga konsisten |
| B. Lembar mengikuti status modul seperti TK/SD | Tanpa kolom baru; satu status | Lembar draf tampil `disetujui`; melanggar ADR-0007 atau memaksa modul diturunkan ke `draf` |
| C. Lembar sebagai bagian isi modul (tanpa berkas dan status terpisah) | Tanpa infrastruktur | Tidak bisa dicetak sendiri; tidak bisa dirender terpisah; peninjauan tercampur dengan modul |
| D. Semua lembar langsung wajib untuk lima program | Seragam | Memblokir CI sampai ratusan lembar ditulis; tidak realistis dalam satu PR |

Penilaian singkat: keamanan dan privasi netral (lembar tanpa kolom nama atau
identitas, aturan `learner-sheet.ts` yang sama untuk semua program);
kemudahan perawatan memihak A (satu aturan di `learner-sheet-rules.ts`);
kompatibilitas aman karena kolom opsional dan skema TK/SD tidak berubah;
kompleksitas operasional A lebih kecil dari D.

## Decision

Opsi **A**, dengan tiga keputusan pemilik:

1. **Bentuk.** Satu lembar kerja cetak per modul, diambil dari latihan modul,
   tanpa kunci jawaban, dengan satu SVG per lembar. Pedoman gaya penulisan ada
   di `docs/programs/panduan-lembar-kerja.md`.
2. **Status.** Lembar punya status tinjauan **sendiri**, awalnya `draf`, terpisah
   dari modul yang tetap `disetujui`. Persetujuan lembar kelak lewat dialog
   pilihan pemilik (DL-043); agen tidak pernah menyetujui lembar sendiri.
3. **Urutan.** Infrastruktur dulu (issue #284, tanpa isi lembar), lalu satu PR
   per program.

Bentuk teknisnya: tiga kolom opsional pada entri indeks modul kelima program.
`learnerSheetPath` (bila ada, harus `content/<program>/lembar/<id>.md`),
`learnerSheetStatus` (nilai status modul; wajib persis bila `learnerSheetPath`
ada, dilarang bila tidak), dan `learnerSheetReview` (rekaman persetujuan peran
dan tanggal; wajib persis bila status lembar `disetujui`, dilarang bila tidak).
Skema `tk-coding` dan `sd-coding` tidak berubah (objek `strict` menolak kolom
baru). Tiap skema punya konstanta `*_LEARNER_SHEET_REQUIRED`, awalnya `false`, yang
dibalik satu program pada PR programnya agar lembar wajib untuk semua
modulnya (`osn`: #285; `dewasa-coding`: #286; `kuliah-coding`: #287; `smp-coding`: #288).

`osn validate` memeriksa lembar program-program itu seperti TK/SD (berkas ada
dan tidak kosong, tanpa kolom nama atau identitas) dan melaporkan lembar yatim
(`content/<program>/lembar/*.md` yang tidak ditunjuk entri mana pun).
`osn render modul --lembar` berjalan untuk setiap entri yang punya
`learnerSheetPath`; spanduknya mengikuti `learnerSheetStatus` ("Lembar ini
..."), bukan status modul. `bun run check:module-code` ikut memeriksa blok kode
di `content/*/lembar/*.md`.

## Consequences

- **Easier:** lembar ditulis dan ditinjau bertahap per program tanpa menyentuh
  persetujuan modul; lembar draf selalu bersanding dengan spanduk `DRAF`.
- **Easier:** program yang seluruh lembarnya sudah ada cukup membalik satu
  konstanta untuk mewajibkannya.
- **Harder:** dua status per modul (modul dan lembar) yang harus dibaca tidak
  tertukar; spanduk lembar dan baris kaki `Status lembar:` membedakannya.
- **Harder:** berkas lembar tanpa entri indeks kini gagal `osn validate`.
- **Risk and mitigation:** agen dapat menulis `learnerSheetStatus: disetujui`.
  Mitigasi: skema menuntut `learnerSheetReview` (tanggal dan peran), aturan
  ADR-0007 dan `AGENTS.md` berlaku, dan perubahan harus merujuk keputusan
  pemilik yang tercatat.
- **Risk and mitigation:** contoh kode lembar bisa salah. Mitigasi:
  `check:module-code` memeriksa sintaksis dan tipe blok kode lembar seperti
  modul; kebenaran semantik tetap tugas peninjau manusia.
