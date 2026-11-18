# Program Pembelajaran Coding untuk Dewasa (`dewasa-coding`)

- **Version:** v1.0.0
- **Last updated:** 2026-11-19
- **Status:** DISETUJUI pemilik pada 2026-11-19 (dialog pilihan, beserta rekomendasi penyusun; issue #131). Silabus dienkode ke `data/dewasa-coding/` dengan skema khusus program (ADR-0008) dan didaftarkan di `data/programs.json`. Belum ada `content/dewasa-coding/` (modul pembelajaran, ADR-0007).
- **Changeset:** `.changeset/encode-dewasa-coding.md` (minor): silabus disetujui dan dienkode (#131). Riwayat: `.changeset/draf-dewasa-coding.md` (patch), dokumen riset dan silabus draf.

> Isi folder ini adalah konten **karangan** (*authored*) menurut
> [ADR-0007](../../architecture/adr/0007-authored-learning-content.md), bukan
> dokumen pemerintah dan bukan transkripsi. Persetujuan hanya oleh pemilik;
> agent tidak pernah mencatat persetujuan atas nama pemilik. Persetujuan v1.0.0
> dicatat pemilik pada 2026-11-19.

## Tujuan program

Menyediakan jalan belajar coding bagi orang dewasa, berbasis **modul dan
jam** (bukan semester sekolah), dengan empat jalur menurut persona:

| Jalur | Awalan kode | Persona | Fokus |
| --- | --- | --- | --- |
| Pekerja | `DW-PKJ-M<n>` | upskilling di pekerjaan saat ini | otomasi lembar kerja, skrip, data, AI untuk produktivitas |
| Profesional | `DW-PRO-M<n>` | alih karier atau menjadi pengembang | pemrograman, basis data, web; dipetakan ke SKKNI 282/2016 (sampai judul unit) |
| Personal | `DW-PRS-M<n>` | pembelajar mandiri atau hobi | literasi komputasional, proyek pribadi |
| Pebisnis/UMKM | `DW-BIS-M<n>` | pemilik atau pengelola usaha kecil | situs usaha, toko daring, data penjualan, no-code/low-code, AI |

Modul bersama semua jalur: `DW-FND-M1` (keamanan, privasi, etika kerja dengan
kode dan AI; 8 jam). Jam per jalur seluruhnya `[asumsi]`: `PKJ` 48, `PRO`
128, `PRS` 38, `BIS` 56 (termasuk `DW-FND-M1`).

## Daftar berkas

| Berkas | Isi |
| --- | --- |
| `README.md` | Dokumen ini: status, tujuan, daftar berkas, keputusan pemilik, changelog. |
| `riset.md` | Riset sumber bertanggal 2026-11-19: SKKNI 282/2016 (47 unit; tabel bagian 2.2 menjadi sumber judul unit di data), skema sertifikasi LSP, program pelatihan pemerintah, kerangka kecakapan digital, kebutuhan UMKM, kajian alat (lisensi, biaya, akun); memisahkan yang dibuka dari yang tidak. |
| `silabus.md` | Silabus v1.0.0 yang disetujui: empat jalur dengan rencana modul berjam, pemetaan SKKNI untuk jalur profesional, jembatan, asesmen portofolio, opsi sertifikasi, privasi, opsi alat, biaya, dan keputusan pemilik (bagian 12). Sumber `data/dewasa-coding/`. |

## Korpus data

`data/dewasa-coding/` berisi tujuh berkas JSON, divalidasi oleh skema
`src/schema/dw-*.ts` dan audit `src/domain/dw-corpus-audit.ts`
(`osn validate --program dewasa-coding`), dan dicocokkan sel demi sel dengan
`silabus.md` oleh `bun run check:fidelity --program dewasa-coding`
(`src/cli/fidelity/dewasa-coding.ts`):

| Berkas | Isi | Sumber |
| --- | --- | --- |
| `tracks.json` | empat jalur: persona, tujuan, jam, prasyarat, durasi, proyek data sintetis | silabus bagian 1, 4-7 |
| `structure.json` | struktur program dan asumsi | silabus bagian 2 |
| `shared.json` | modul bersama `DW-FND-M1` | silabus bagian 3 |
| `module-plan.json` | 34 modul jalur dengan jam, prasyarat, keluaran portofolio atau unit SKKNI | silabus bagian 4-7 |
| `skkni-units.json` | 47 unit SKKNI 282/2016 (kode dan judul; salinan bertanda belum terverifikasi), klaim cakupan | `riset.md` bagian 2.2 dan silabus bagian 5.2 |
| `certification.json` | opsi sertifikasi (tanpa sertifikasi bawaan) dan skema LSP | silabus bagian 5.2 dan 8.2 |
| `bridges.json` | jembatan dari program lain (jembatan kuliah-coding ditunda) | silabus bagian 6.1 |

Nama `module-plan.json` sengaja bukan `modules.json`: nama itu dicadangkan
untuk indeks modul pembelajaran ADR-0007 (`content/dewasa-coding/modules/`),
yang belum ada.

## Keputusan pemilik (2026-11-19)

Rincian opsi ada di bagian 12 `silabus.md`. Semua rekomendasi penyusun dipilih:

| No | Butir | Keputusan |
| --- | --- | --- |
| 12.1 | Satu program atau empat program terpisah | satu program `dewasa-coding` dengan empat jalur dan modul bersama `DW-FND-M1` |
| 12.2 | Bentuk pelaksanaan | mandiri bermodul dengan pendampingan opsional |
| 12.3 | Bahasa inti jalur profesional | Python inti, JavaScript/TypeScript untuk web; lembar kerja LibreOffice dan Python sebagai alat inti `PKJ`/`BIS` |
| 12.4 | Target skema dan pemetaan SKKNI | Junior Web Programmer sebagai acuan; pemetaan hanya sampai judul unit; salinan 47 unit belum terverifikasi terhadap berkas resmi |
| 12.5 | Sertifikasi | tanpa sertifikasi bawaan; uji LSP opsional untuk jalur mandiri `PRO` |
| 12.6 | Program pelatihan pemerintah | hanya rujukan dengan catatan cek situs resmi |
| 12.7 | Jembatan dari kuliah-coding (#130) | ditunda sampai drafnya ada |
| 12.8 | Pengerjaan lanjutan | skema khusus per program (ADR-0008); modul `content/` mulai dari jalur `PKJ` dan `BIS` |

Modul `content/dewasa-coding/modules/` belum ditulis dan bukan bagian dari
issue #131.

## Cara mengusulkan perubahan

Usulan lewat issue; revisi silabus mengikuti ADR-0007 (persetujuan pemilik
dicatat dengan tanggal) dan, karena data dienkode dari silabus, mengubah
`silabus.md` dan `data/dewasa-coding/` bersamaan sampai
`bun run check:fidelity --program dewasa-coding` lulus.

## Changelog

| Versi | Tanggal | Perubahan |
| --- | --- | --- |
| v0.1.0 | 2026-11-19 | Draf awal folder program: `riset.md` dan `silabus-draf.md` (#131). |
| v1.0.0 | 2026-11-19 | Silabus disetujui pemilik beserta rekomendasi: `silabus-draf.md` menjadi `silabus.md` (v1.0.0), dienkode ke `data/dewasa-coding/` dan didaftarkan di `data/programs.json` (#131). |
