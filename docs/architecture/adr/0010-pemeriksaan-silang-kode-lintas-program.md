# ADR-0010: Pemeriksaan silang kode lintas program pada tabel jembatan

## Status

Accepted — 2026-11-19. Keputusan pemilik (dialog pilihan, 2026-11-19), pertanyaan
K7 opsi 1 pada `docs/programs/rancangan-jembatan-antarprogram.md`, issue
[#177](https://github.com/ahliweb/cac/issues/177). Melengkapi
[ADR-0008](0008-skema-khusus-per-program.md) dan memakai preseden pengecualiannya;
tidak menggantikannya.

## Context

Tiap program coding punya korpus, skema, dan audit sendiri (ADR-0008). Tabel
jembatan antarprogram (mis. `data/dewasa-coding/kuliah-bridge.json`) menyebut
kode milik program tetangga: kode minggu (`SMP7-1-M3`, `A-X1-M9`), kode mata
kuliah (`KUL-I-101`), dan kode modul (`DW-PRO-M6`). Kode itu hidup di sel teks
bebas, jadi skema satu program tidak dapat memeriksanya dan audit satu
program tidak boleh membaca korpus program lain (ADR-0008: satu program tidak
menyunting atau bergantung pada berkas program lain). Pembacaan manual atas
rancangan jembatan menemukan tiga rujukan kode yang tidak tepat; ketiganya
tertangkap hanya karena kode minggu dibaca satu per satu. Satu preseden
pengecualian sudah ada: `data/sma-coding/osn-bridge.json` memeriksa id rumpun
OSN (FR-29), lewat `ProgramAuditContext.osnTopicFamilyIds`.

## Options considered

| Opsi | Kelebihan | Kekurangan |
| --- | --- | --- |
| A. Berkas data baru dengan skema dan parser, ditambah pemeriksaan silang kode terhadap korpus program asal (dipilih) | Kesalahan rujukan tertangkap mesin pada setiap `osn validate`; sesuai pola jembatan terkodekan; pengecualian terhadap ADR-0008 sempit dan eksplisit | Biaya implementasi paling besar; `osn validate` membaca berkas program lain (hanya kolom id, tanpa skema program itu) |
| B. Berkas data baru dengan skema dan parser, tanpa pemeriksaan silang | Sesuai pola sekarang; ADR-0008 utuh | Kode lintas program tetap teks yang tidak diperiksa; kesalahan serupa baru terdeteksi lewat pembacaan manual |
| C. Tabel baru sebagai prosa tanpa kodekan | Tanpa perubahan skema atau parser | Jembatan baru tidak diperiksa mesin; menyimpang dari pola jembatan terkodekan |

Penilaian singkat: keamanan dan privasi netral (hanya id kode yang dibaca;
tidak ada data pembelajar). Ketelitian validasi memihak A; kemudahan
perawatan memihak A karena sumber kode hanya satu tabel
(`CROSS_PROGRAM_CODE_SOURCES`) dan satu daftar pola
(`CROSS_PROGRAM_CODE_KINDS`); kompleksitas operasional dan biaya kode memihak
B dan C; kompatibilitas mundur aman karena pemeriksaan hanya berjalan pada
berkas yang didaftarkan program (`crossProgramScan`). Pemilik memilih **A**.

## Decision

Pemeriksaan silang kode lintas program dilakukan oleh fungsi murni
`crossProgramCodeFindings` (`src/domain/cross-program-refs.ts`) dan dijalankan
oleh `osn validate`:

- Tiap entri `PROGRAM_MODULES` dapat mendaftarkan `crossProgramScan`: daftar
  berkas data program itu (tabel jembatan) yang nilai teksnya dipindai.
- Pemindai mengenali kode semua program (`TK-`, `SD`, `SMP`, kode minggu
  `sma-coding` termasuk `FND-X1-`, `KUL-`, `DW-`); rentang `<kode>..M<n>`
  memeriksa ujungnya juga. Kode huruf lepas yang bukan kode lengkap
  (`C-XI2`) dan kode CPMK (`KUL-U-101-C1`) tidak diperiksa.
- Setiap kode harus ada di korpus program asalnya. Himpunan kode dimuat oleh
  lapisan CLI (`loadCrossProgramCodes`, `src/cli/program-loader.ts`) langsung
  dari berkas korpus program itu (id minggu, kode mata kuliah dan modul),
  tanpa memakai skema atau audit program itu, dan hanya bila program itu
  terdaftar dan berkasnya terbaca; bila tidak, kodenya dilewati karena
  audit program itu sendiri melaporkan korpus yang rusak.
- Audit satu program (`audit<Prefix>Corpus`) tetap menerima korpusnya saja.
  Pengecualian ADR-0008 terbatas pada: id kode (bukan isi) program lain,
  dibaca oleh `osn validate`, diperiksa pada berkas jembatan yang
  didaftarkan, dan dilaporkan sebagai temuan pada berkas yang memuat kode
  itu.

Berkas jembatan yang didaftarkan bertambah sejalan dengan penerapan
rancangan jembatan (#177): `kuliah-coding` dan `dewasa-coding` (jembatan
kuliah ke `PRO`), lalu pasangan lain pada PR masing-masing.

## Consequences

- Rujukan kode yang salah di tabel jembatan gagal pada `osn validate`
  (exit 1) dengan berkas, jalur JSON, dan program asal yang disebut.
- Menambah program baru yang kodenya dirujuk berarti menambah satu baris
  pada `CROSS_PROGRAM_CODE_SOURCES` dan satu pola pada
  `CROSS_PROGRAM_CODE_KINDS`; tes `tests/unit/cross-program-refs.test.ts`
  mengunci keenam program.
- Pemeriksaan hanya membuktikan kode itu **ada**, bukan bahwa maknanya tepat
  (kode minggu yang ada tetapi salah topik tetap perlu dibaca manusia).
- Risiko: pola kode berubah bila notasi minggu satu program diubah.
  Mitigasi: pola terpusat di satu daftar dan diuji; perubahan notasi program
  sudah mengubah audit programnya sendiri.
