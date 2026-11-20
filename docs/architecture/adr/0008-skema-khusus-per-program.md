# ADR-0008: Skema khusus per program dan titik sambung audit/fidelity

## Status

Accepted — 2026-11-19. Keputusan pemilik (dialog pilihan, 2026-11-19).
Melengkapi [ADR-0006](0006-multi-program-repository.md) (repositori
multi-program) dan [ADR-0007](0007-authored-learning-content.md) (konten
buatan sendiri); tidak menggantikan keduanya. Issue
[#140](https://github.com/ahliweb/cac/issues/140).

**Catatan status pelaksanaan (2026-11-19, tidak mengubah keputusan):**
keputusan ini sudah dilaksanakan. Kelima program ter-encode dan terdaftar
(PR #145 `tk-coding`, #146 `kuliah-coding`, #147 `dewasa-coding`, #148
`sd-coding`, #149 `smp-coding`); tabel `PROGRAM_MODULES` di
`src/cli/program-registry.ts` memuat tujuh entri, dan `bun run check:fidelity`
menjalankan enam modul fidelity. Bagian "Context" dan seterusnya
mencerminkan keadaan saat keputusan dibuat dan sengaja tidak diubah.

**Catatan status pelaksanaan lanjutan (2026-11-19, bukan keputusan baru):**
pola yang sama kini juga dipakai untuk indeks modul belajar (ADR-0007) lima
program. Masing-masing punya skema sendiri (`tk-module.ts`, `sd-module.ts`,
`smp-module.ts`, `kul-module.ts`, `dw-learning-module.ts` di `src/schema/`,
seperti `sma-module.ts` untuk `sma-coding`), aturan rujukan silang sendiri
(`<awalan>-modules.ts` di `src/domain/`), dan terhubung lewat kait
`parseModulesIndex` dan `moduleFindings` pada entri `PROGRAM_MODULES`; hanya
aturan ADR-0007 yang sama yang dipakai bersama (`program-module-common.ts`).
`osn render modul` mendukung kelima program, dan `--lembar` merender lembar
anak program `tk-coding` dan `sd-coding`. Belum ada `modules.json` atau
modul isi nyata untuk kelima program.

**Catatan (2026-11-19, tidak mengubah keputusan):** [ADR-0010](0010-pemeriksaan-silang-kode-lintas-program.md)
memberi satu pengecualian sempit atas larangan satu program bergantung pada
program lain: `osn validate` memeriksa silang kode minggu, mata kuliah, dan
modul program lain yang disebut di tabel jembatan (issue #177).

## Context

Setelah `osn` dan `sma-coding`, lima program coding lain memiliki draf
silabus yang pada 2026-11-19 disetujui pemilik dan siap di-encode menjadi
data: `tk-coding`, `sd-coding`, `smp-coding`, `kuliah-coding`,
`dewasa-coding` (saat keputusan ini ditulis, berkasnya
`docs/programs/<id>/silabus-draf.md`; sejak persetujuan menjadi
`docs/programs/<id>/silabus.md`, lihat catatan status di bawah). Bentuk silabusnya
berbeda jauh: OSN adalah 28 minggu dengan 7 gerbang; SMA adalah 5 jalur x 6
semester dengan peta CP; TK dan SD bermain tanpa layar atau berjam pendek;
kuliah memakai SKS dan area pengetahuan; dewasa memakai jalur persona dan
unit kompetensi SKKNI. Sebelum keputusan ini, `osn validate` memilih audit
dengan pernyataan `if (program.id === "sma-coding")` dan pemeriksa fidelity
hanya ada sebagai skrip tunggal untuk SMA. Lima program yang di-encode
paralel akan menyunting titik yang sama dan bentrok.

## Options considered

| Opsi | Kelebihan | Kekurangan |
| --- | --- | --- |
| A. Satu skema generik untuk semua program baru | Satu kode, satu audit; program baru murah ditambah. | Bentuk yang berbeda dipaksa masuk satu cetakan: bidang opsional membengkak, invarian (jumlah minggu, rantai prasyarat, pemetaan CP/SKKNI) tidak bisa diperiksa ketat; validasi menjadi longgar sehingga kehilangan nilai kurikulum-sebagai-kode (ADR-0001). |
| B. Skema khusus per program, seperti `sma-coding` (dipilih) | Setiap program memeriksa invarian miliknya sendiri; perubahan satu program tidak menyentuh program lain; fidelity terhadap dokumen sumber bisa dibuat sel demi sel. | Lebih banyak kode (skema, audit, fidelity, tes per program); risiko duplikasi pola; titik pendaftaran harus dibuat modular agar tidak bentrok. |
| C. Tunda: tahan encode sampai skema generik diputuskan | Tidak ada kode yang mungkin dibuang. | Lima program yang sudah disetujui tertahan; pekerjaan paralel tidak bisa dimulai; keputusan generik sulit tanpa contoh nyata kelima bentuk. |

Penilaian singkat (kriteria skill eksekusi): keamanan dan privasi netral;
ketelitian validasi, kemudahan perawatan per program, dan kompatibilitas
mundur memihak B; kompleksitas operasional dan biaya kode memihak A;
implikasi jangka panjang memihak B karena perubahan silabus satu jenjang
tidak merembet. Aksesibilitas, SEO, dan UI tidak terpengaruh (tidak ada
antarmuka baru). Pemilik memilih **B**.

## Decision

Setiap program memiliki skema, audit, dan (bila silabus sumbernya berbentuk
tabel) pemeriksa fidelity sendiri. Agar program baru cukup menambah
berkasnya sendiri dan satu baris pendaftaran, dispatch program-spesifik
dipusatkan di **tabel program** `PROGRAM_MODULES` pada
`src/cli/program-registry.ts`. Tiap entri `ProgramModule` memuat: `id`,
`dataFiles` (berkas data + skema), `audit` (fungsi murni
`(source, context) => AuditResult`), `needsOsnTopicFamilyIds`,
`parseModulesIndex` dan `moduleFindings` (indeks modul ADR-0007 dengan skema
program itu), serta `fidelity` opsional (`FidelityModule`).

Dua daftar sengaja berbeda: **registri** `data/programs.json` adalah daftar
program yang sudah disetujui pemilik (ADR-0006); **tabel** adalah kode yang
tahu cara memeriksanya. Program di registri tanpa entri tabel adalah temuan
`osn validate` (bukan dilewati diam-diam); entri tabel tanpa entri registri
dianggap draf dan tidak divalidasi.

`osn validate` dan `bun run check:fidelity [--program <id>]` memakai tabel
itu; tidak ada lagi percabangan `if (program.id === ...)` di perintah.

### Pola menambah program

Urutan mengikuti aturan "skema dulu, lalu data, lalu domain, lalu tes"
(`AGENTS.md`). Untuk program `<id>` dengan awalan berkas `<prefix>`
(contoh `tk` untuk `tk-coding`):

1. `src/schema/<prefix>-*.ts`: skema Zod tiap berkas data, konstanta id program
   (`<PREFIX>_CODING_PROGRAM_ID`), dan skema indeks modul bila program punya
   `modules.json`.
2. `src/domain/<prefix>-corpus-audit.ts`: `<PREFIX>_DATA_FILE_REGISTRY`
   (berkas + skema) dan `audit<Prefix>Corpus(source, ...)` murni (skema,
   invarian, integritas referensi, berkas tak terdaftar).
   Bila ada indeks modul: `src/domain/<prefix>-modules.ts` dengan
   `parse<Prefix>ModulesIndex` dan `<prefix>ModuleFindings`.
3. `src/cli/fidelity/<id>.ts` (opsional): objek `FidelityModule` yang
   membandingkan `data/<id>/` dengan `docs/programs/<id>/silabus*.md`
   (lihat `src/cli/fidelity/sma-coding.ts`); beserta `check:<prefix>-fidelity`
   bila ingin skrip sendiri.
4. Satu entri di `PROGRAM_MODULES` (`src/cli/program-registry.ts`) dan, setelah
   pemilik menyetujui silabusnya, satu entri di `data/programs.json`
   (ADR-0006; `corpusDir` harus `data/<id>`).
5. `data/<id>/*.json` yang lolos skema; `content/<id>/modules/*.md` bila ada modul.
6. Tes: `tests/unit/<prefix>-corpus-audit.test.ts`,
   `tests/integration/<id>-fidelity.test.ts` (bila ada fidelity), dan tes
   `osn validate --program <id>`; tabel `tests/unit/program-registry.test.ts`
   menguji otomatis bahwa tiap program terdaftar punya entri.
7. Dokumen: `docs/requirements/` (ID baru dan matriks), `docs/cli/README.md`,
   `AGENTS.md` (tata letak dan checklist), changeset.

Satu program tidak boleh menyunting berkas program lain; satu-satunya
berkas bersama yang disunting adalah `src/cli/program-registry.ts` (satu
entri), `data/programs.json` (satu entri), dan dokumen.

## Consequences

- Lima encode dapat berjalan paralel; konflik terbatas pada satu baris
  tabel dan satu entri registri, yang mudah digabung.
- Setiap program mendapat validasi seketat bentuknya; harga yang dibayar
  adalah kode skema dan audit per program (diterima oleh pemilik) serta
  disiplin agar pola di atas diikuti.
- `check:fidelity` memberi satu perintah untuk seluruh fidelity;
  `check:sma-fidelity` tetap ada dan memanggil modul yang sama.
- Risiko: tabel dan registri bisa tidak sinkron. Mitigasi: temuan eksplisit
  untuk registri tanpa tabel, serta tes yang gagal bila ada program
  terdaftar tanpa entri.
- Perintah yang masih OSN-saja atau SMA-saja (`osn plan`, `osn render`)
  tidak ikut tabel; menambah dukungan per program tetap pekerjaan
  tersendiri.
