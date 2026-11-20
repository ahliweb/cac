# Program Pembelajaran Coding untuk Dewasa (`dewasa-coding`)

- **Version:** v1.4.1
- **Last updated:** 2026-11-20
- **Status:** DISETUJUI pemilik pada 2026-11-19 (dialog pilihan, beserta rekomendasi penyusun; issue #131). Silabus dienkode ke `data/dewasa-coding/` dengan skema khusus program (ADR-0008) dan didaftarkan di `data/programs.json`. Modul pembelajaran (ADR-0007): 36 modul draf di `content/dewasa-coding/modules/`, terindeks di `data/dewasa-coding/modules.json`; semuanya berstatus `draf` dan belum ditinjau pemilik (per 2026-11-19). Revisi v1.1.0 (rekayasa perangkat lunak berbantuan AI) disetujui pemilik pada 2026-11-19 lewat keputusan #139. Revisi v1.2.0 (jembatan kuliah-coding ke jalur `PRO`) disetujui lewat keputusan #177.
- **Changeset:** `.changeset/encode-dewasa-coding.md` (minor): silabus disetujui dan dienkode (#131). Revisi v1.1.0: `.changeset/dewasa-coding-v1-1-ai.md` (minor, #139). Riwayat: `.changeset/draf-dewasa-coding.md` (patch), dokumen riset dan silabus draf. Revisi v1.2.0 (#177): `.changeset/jembatan-kuliah-dewasa.md` (minor).

> Isi folder ini adalah konten **karangan** (*authored*) menurut
> [ADR-0007](../../architecture/adr/0007-authored-learning-content.md), bukan
> dokumen pemerintah dan bukan transkripsi. Persetujuan hanya oleh pemilik;
> agent tidak pernah mencatat persetujuan atas nama pemilik. Persetujuan v1.0.0
> dan revisi v1.1.0 (#139) dicatat pemilik pada 2026-11-19.

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
136, `PRS` 38, `BIS` 56 (termasuk `DW-FND-M1`). Sejak v1.1.0 jalur `PRO`
memuat `DW-PRO-M13` (rekayasa perangkat lunak berbantuan AI, 8 jam, setelah
`DW-PRO-M5`), dan silabus memuat kebijakan penggunaan AI untuk peserta dewasa
(bagian 9.1). Dasar bukti revisi ini ada di
[`../../riset/ai-rekayasa-perangkat-lunak.md`](../../riset/ai-rekayasa-perangkat-lunak.md).

## Daftar berkas

| Berkas | Isi |
| --- | --- |
| `README.md` | Dokumen ini: status, tujuan, daftar berkas, keputusan pemilik, changelog. |
| `riset.md` | Riset sumber bertanggal 2026-11-19: SKKNI 282/2016 (47 unit; tabel bagian 2.2 menjadi sumber judul unit di data), skema sertifikasi LSP, program pelatihan pemerintah, kerangka kecakapan digital, kebutuhan UMKM, kajian alat (lisensi, biaya, akun); memisahkan yang dibuka dari yang tidak. |
| `rancangan-modul.md` | Rancangan modul belajar (DRAF, v0.1.0): pemetaan 36 modul (35 modul jalur ditambah `DW-FND-M1`), templat berbasis bukti, gelombang penulisan, gerbang mutu. Rancangan dipakai untuk menulis modul yang kini ada di `content/dewasa-coding/`. |
| `rancangan-modul-contoh/` | Riwayat: modul pilot `dw-fnd-m1.md` sebelum modul sebenarnya ditulis; modul nyatanya `content/dewasa-coding/modules/dw-fnd-m1.md`. |
| `silabus.md` | Silabus v1.2.1 yang disetujui: empat jalur dengan rencana modul berjam, pemetaan SKKNI untuk jalur profesional, jembatan (termasuk jembatan kuliah-coding ke jalur `PRO`, bagian 6.2), asesmen portofolio, opsi sertifikasi, privasi dan kebijakan penggunaan AI (bagian 9), opsi alat, biaya, dan keputusan pemilik (bagian 12). Sumber `data/dewasa-coding/`. |

## Korpus data

`data/dewasa-coding/` berisi delapan berkas JSON korpus (ditambah `modules.json`, indeks modul belajar yang bukan transkripsi silabus), divalidasi oleh skema
`src/schema/dw-*.ts` dan audit `src/domain/dw-corpus-audit.ts`
(`osn validate --program dewasa-coding`), dan dicocokkan sel demi sel dengan
`silabus.md` oleh `bun run check:fidelity --program dewasa-coding`
(`src/cli/fidelity/dewasa-coding.ts`):

| Berkas | Isi | Sumber |
| --- | --- | --- |
| `tracks.json` | empat jalur: persona, tujuan, jam, prasyarat, durasi, proyek data sintetis | silabus bagian 1, 4-7 |
| `structure.json` | struktur program dan asumsi | silabus bagian 2 |
| `shared.json` | modul bersama `DW-FND-M1` | silabus bagian 3 |
| `module-plan.json` | 35 modul jalur (`PRO` 13 modul, urutan belajar menempatkan `DW-PRO-M13` setelah `DW-PRO-M5`) dengan jam, prasyarat, keluaran portofolio atau unit SKKNI | silabus bagian 4-7 |
| `skkni-units.json` | 47 unit SKKNI 282/2016 (kode dan judul; dicocokkan dengan lampiran resmi JDIH Kemnaker 2026-11-19, status `judul-cocok-lampiran-resmi`), klaim cakupan | `riset.md` bagian 2.2 dan silabus bagian 5.2 |
| `certification.json` | opsi sertifikasi (tanpa sertifikasi bawaan) dan skema LSP | silabus bagian 5.2 dan 8.2 |
| `bridges.json` | jembatan dari program lain (jembatan kuliah-coding berstatus `dirancang` sejak v1.2.0) | silabus bagian 6.1 |
| `kuliah-bridge.json` | jembatan kuliah-coding ke `PRO` (v1.2.0, #177): tiga profil masuk, status lewati/padatkan/wajib tiap modul `PRO`, dampak jam, modul yang wajib bagi semua; skema `src/schema/dw-kuliah-bridge.ts`; kode `KUL-` diperiksa silang terhadap korpus kuliah-coding (ADR-0010) | silabus bagian 6.2 |

Nama `module-plan.json` sengaja bukan `modules.json`: `module-plan.json` adalah
rencana modul dari silabus (transkripsi), sedangkan `modules.json` adalah
indeks modul pembelajaran ADR-0007 (`content/dewasa-coding/modules/`), yang
kini ada dan berisi 36 entri.

## Modul belajar

Status per 2026-11-19, dihitung dari repositori:

| Bagian | Jumlah | Lokasi |
| --- | --- | --- |
| Modul | 36: `dw-fnd` 1, `dw-pkj` 8, `dw-pro` 13, `dw-prs` 6, `dw-bis` 8 | `content/dewasa-coding/modules/<id>.md` |
| Indeks | 36 entri, semuanya `disetujui` | `data/dewasa-coding/modules.json` (skema `src/schema/dw-learning-module.ts`) |

Tidak ada `lembar/` dan `gambar/` untuk program ini. Semua modul berstatus `disetujui` sejak 2026-11-20 atas keputusan pemilik program lewat dialog pilihan baku (#125), bukan hasil tinjauan isi per modul; butir yang perlu dicek dikumpulkan sebagai tindak lanjut revisi di
[`../catatan-tinjauan-modul.md`](../catatan-tinjauan-modul.md). Modul
mengikuti [`rancangan-modul.md`](rancangan-modul.md).

## Keputusan pemilik (2026-11-19)

Rincian opsi ada di bagian 12 `silabus.md`. Semua rekomendasi penyusun dipilih:

| No | Butir | Keputusan |
| --- | --- | --- |
| 12.1 | Satu program atau empat program terpisah | satu program `dewasa-coding` dengan empat jalur dan modul bersama `DW-FND-M1` |
| 12.2 | Bentuk pelaksanaan | mandiri bermodul dengan pendampingan opsional |
| 12.3 | Bahasa inti jalur profesional | Python inti, JavaScript/TypeScript untuk web; lembar kerja LibreOffice dan Python sebagai alat inti `PKJ`/`BIS` |
| 12.4 | Target skema dan pemetaan SKKNI | Junior Web Programmer sebagai acuan; pemetaan hanya sampai judul unit; judul 47 unit dicocokkan dengan lampiran resmi JDIH Kemnaker (2026-11-19); sufiks kode belum terverifikasi |
| 12.5 | Sertifikasi | tanpa sertifikasi bawaan; uji LSP opsional untuk jalur mandiri `PRO` |
| 12.6 | Program pelatihan pemerintah | hanya rujukan dengan catatan cek situs resmi |
| 12.7 | Jembatan dari kuliah-coding (#130) | ditunda sampai drafnya ada |
| 12.8 | Pengerjaan lanjutan | skema khusus per program (ADR-0008); modul `content/` mulai dari jalur `PKJ` dan `BIS` |
| 12.9 | Revisi v1.1.0, rekayasa perangkat lunak berbantuan AI (#139, 2026-11-19) | U-13 butir tambahan di `DW-FND-M1`; U-14 butir tambahan di `DW-PKJ-M6`; U-15 modul baru `DW-PRO-M13` setelah `DW-PRO-M5` (8 jam `[asumsi]`); U-16 tanpa perubahan; kebijakan AI per program (bagian 9.1); energi dan biaya komputasi sebagai butir singkat dengan ketidakpastian |

Modul `content/dewasa-coding/modules/` bukan bagian dari issue #131; modulnya
ditulis kemudian dan kini ada serta disetujui pemilik pada 2026-11-20 (lihat "Modul belajar").

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
| v1.1.0 | 2026-11-19 | Revisi minor atas keputusan pemilik #139: modul `DW-PRO-M13` (jalur `PRO` 128 menjadi 136 jam), butir AI di `DW-FND-M1` dan `DW-PKJ-M6`, glosarium istilah AI, kebijakan penggunaan AI (bagian 9.1); `data/dewasa-coding/` dan registri diperbarui ke 1.1.0; skema `tracks.json` menjadikan `hoursPerModule` opsional (jalur dengan jam modul tak seragam); fidelity membaca kolom jam tabel `PRO` dan urutan belajar. |
| v1.1.1 | 2026-11-19 | Silabus direvisi patch ke v1.1.1 (issue #165): kalimat status yang basi tentang program pasangannya diperbaiki; isi kurikulum dan corpus tidak berubah. |
| v1.1.2 | 2026-11-19 | Silabus direvisi patch ke v1.1.2: judul 47 unit SKKNI dicocokkan dengan lampiran resmi JDIH Kemnaker, judul unit 47 dikoreksi menjadi "Melakukan Pembaharuan Perangkat Lunak" (`riset.md` v1.0.2), status unit di `skkni-units.json` menjadi `judul-cocok-lampiran-resmi`. |
| v1.3.0 | 2026-11-19 | Sinkron dokumen (#124): status modul belajar (36 modul draf dan indeks `modules.json`), `rancangan-modul.md` dan pilot masuk daftar berkas; keterangan nama `module-plan.json` dan `modules.json` diperbarui; isi silabus dan corpus tidak berubah. |
| v1.2.0 | 2026-11-19 | Revisi minor atas keputusan pemilik #177: jembatan kuliah-coding ke jalur `PRO` (bagian 6.1 baris kuliah-coding, bagian 6.2 baru, keputusan 12.7 dan 12.8), berkas data baru `kuliah-bridge.json` dengan skema dan audit, pemeriksaan silang kode lintas program (ADR-0010); modul dan jam `PRO` tidak berubah. |
| v1.4.0 | 2026-11-20 | Pemilik menyetujui 36 modul belajar lewat dialog pilihan baku ("Setujui semua, catatan jadi tindak lanjut", #125): indeks `modules.json` berstatus `disetujui`; butir catatan tinjauan jadi tindak lanjut revisi; isi silabus dan corpus tidak berubah. |
| v1.4.1 | 2026-11-20 | Silabus direvisi patch ke v1.2.1 atas keputusan pemilik 2026-11-20 (#281, dialog pilihan baku): bagian 9.1 memuat baris "Pagar belajar jalur `PRO` (anjuran)" (tiga anjuran U-18); anjuran, bukan larangan; modul, jam, dan pemetaan SKKNI tidak berubah; `data/dewasa-coding/` hanya naik versi dan tanggal. |
