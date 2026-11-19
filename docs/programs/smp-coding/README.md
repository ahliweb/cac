# Program Pembelajaran Coding SMP (`smp-coding`)

- **Version:** v1.3.0
- **Last updated:** 2026-11-19
- **Status:** DISETUJUI pemilik program, 2026-11-19 — silabus v1.1.2 (revisi patch status verifikasi sumber SK 046; v1.1.1 revisi patch kalimat status, #165; v1.0.0 beserta semua rekomendasi penyusun, issue #129; v1.1.0 menambah butir dan kebijakan AI, keputusan di issue #139). Program **terdaftar** di `data/programs.json` dan corpusnya di `data/smp-coding/` (skema khusus program, ADR-0008). Modul belajar (ADR-0007): 84 modul draf (satu per minggu) di `content/smp-coding/modules/`, terindeks di `data/smp-coding/modules.json`; semuanya berstatus `draf` dan belum ditinjau pemilik (per 2026-11-19). Revisi v1.2.0 (jembatan dari SD dan ke SMA, bagian 5.1 dan 5.2) disetujui lewat keputusan pemilik 2026-11-19 (issue #177).

> Isi folder ini adalah konten **karangan** (*authored*) menurut
> [ADR-0007](../../architecture/adr/0007-authored-learning-content.md), bukan
> dokumen pemerintah. Agent tidak pernah mencatat persetujuan atas nama
> pemilik; persetujuan 2026-11-19 adalah pilihan pemilik lewat dialog pilihan
> dan dicatat di issue #129. Kutipan CP Fase D di silabus berasal dari dua teks
> resmi: *Panduan Mata Pelajaran Informatika* 2025 (URL resmi, diunduh
> orchestrator 2026-11-18) dan salinan SK 046/H/KR/2025 yang ditemukan
> orchestrator (URL asal `[terverifikasi 2026-11-19]`, subdomain resmi `kemendikdasmen.go.id`); lihat
> [`riset.md`](riset.md) bagian 2.

## Tujuan program

Menyediakan silabus pembelajaran coding untuk siswa SMP/MTs kelas 7-9 (Fase
D): berpikir komputasional, pemrograman blok dan pseudocode, data, proyek,
literasi dan etika kecerdasan artifisial, lalu (pengayaan) pemrograman teks
Python. Keputusan pemilik 2026-11-19:

| Butir | Keputusan |
| --- | --- |
| Jalur | Satu jalur inti blok ke teks (Scratch, MakeCode simulator, Python), ditambah klub pengayaan OSN dan pemecahan masalah yang opsional |
| Dasar CP | CP Informatika Fase D (elemen BK dan LD) dan CP Koding dan KA Fase D (BK, LD, Literasi dan Etika KA, Pemanfaatan KA); kode butir `D-BK-a`..., `DK-EA-a`...; CP KKA Fase D menjadi dasar materi AI kelas 9 |
| Catatan penting | Kedua CP Fase D **tidak memuat pemrograman teks**; Python hanya pengayaan di luar CP, tidak dihitung sebagai pemenuhan CP |
| Waktu | 6 semester x 14 minggu x 2 JP `[asumsi]` = 84 minggu (`SMP7-1-M1` sampai `SMP9-2-M14`) |
| Jembatan | Dari `sd-coding` (disamakan setelah keduanya disetujui); ke `sma-coding` v1.2 (blok fondasi kelas X, jalur A sampai E); ke OSN lewat jalur A (OSN Informatika hanya SMA/sederajat) |
| Privasi | Tanpa data murid di repositori (ADR-0004); tanpa akun murid pada layanan daring |
| Kebijakan AI (v1.1, #139) | Pemakaian AI generatif oleh murid SMP tetap demonstrasi guru (tanpa akun murid); kebijakan per program di bagian 7.1 silabus: alasan usia dan ketentuan layanan, etika (termasuk mengalihkan pekerjaan berpikir ke AI di `SMP9-2-M10`), data pribadi dan kata sandi tidak ditempel ke layanan AI (`SMP8-2-M11`), asesmen tanpa AI, energi dan biaya komputasi sebagai butir singkat berketidakpastian |
| Butir belum tercakup | 11 butir CP tidak dicakup minggu mana pun dan dicatat eksplisit di `data/smp-coding/uncovered.json`: 7 butir Literasi Digital dan 2 butir `DK-EA` ditutup lewat modul pendamping (pekerjaan lanjutan, belum dibuat; modul mingguan sudah ada, modul pendamping belum), 2 butir `DK-PA` hanya didemonstrasikan guru |

## Daftar berkas

| Berkas | Isi |
| --- | --- |
| `README.md` | Dokumen ini: status, tujuan, daftar berkas, keputusan pemilik, pekerjaan lanjutan, changelog. |
| `riset.md` | Riset: provenance sumber resmi, kutipan persis CP Informatika Fase D (Panduan 2025) dan CP Koding dan KA Fase D (SK 046), dokumen ATP guru sebagai pembanding, kebijakan KKA di SMP, OSN jenjang SMP, kajian alat. |
| `rancangan-modul.md` | Rancangan modul belajar (DRAF, v0.1.0): pemetaan 84 modul, templat berbasis bukti, gelombang penulisan, gerbang mutu. Rancangan dipakai untuk menulis modul yang kini ada di `content/smp-coding/modules/`. |
| `rancangan-modul-contoh/` | Riwayat: modul pilot `smp7-1-m1.md` sebelum modul sebenarnya ditulis; modul nyatanya `content/smp-coding/modules/smp7-1-m1.md`. |
| `silabus.md` | Silabus v1.2.0 (disetujui; bagian 7.1 memuat kebijakan penggunaan AI): kutipan dan kode butir CP, struktur waktu, rencana 84 minggu, klub pengayaan, pemetaan CP, jembatan, asesmen, privasi, kebutuhan sarana, opsi alat, catatan keputusan pemilik. Sumber corpus `data/smp-coding/`. |

Corpus yang di-encode dari `silabus.md` ada di `data/smp-coding/` (tujuh
berkas: `cp-elements`, `structure`, `weeks`, `cp-mapping`, `uncovered`,
`club`, `bridge`), divalidasi `osn validate --program smp-coding` dan dicocokkan
sel demi sel dengan `bun run check:fidelity --program smp-coding`.

## Keputusan pemilik (2026-11-19)

Pemilik menyetujui opsi yang direkomendasikan untuk semua pertanyaan; tabel
lengkap Q1-Q11 ada di bagian 10 `silabus.md`. Ringkasan: Q1 teks resmi (URL
padanan SK 046 di JDIH Kemendikdasmen belum ditemukan); Q2 netral; Q3 Python pengayaan di luar CP;
Q4 satu jalur inti dan klub opsional; Q5 Scratch lalu MakeCode; Q6 simulator,
papan opsional; Q7 sesuai sekolah; Q8 samakan dengan `sd-coding` setelah
keduanya disetujui; Q9 CP KKA untuk materi AI kelas 9; Q10 modul pendamping;
Q11 demonstrasi guru.

## Modul belajar

Status per 2026-11-19, dihitung dari repositori:

| Bagian | Jumlah | Lokasi |
| --- | --- | --- |
| Modul | 84 (`smp7-1-m1` sampai `smp9-2-m14`; 6 semester x 14 minggu) | `content/smp-coding/modules/<id>.md` |
| Indeks | 84 entri, semuanya `draf` | `data/smp-coding/modules.json` (skema `src/schema/smp-module.ts`) |

Tidak ada `lembar/` dan `gambar/` untuk program ini (hanya `tk-coding` dan
`sd-coding` punya lembar anak). Semua modul berstatus `draf` dan belum
ditinjau pemilik; tinjauan dilacak di issue #125 dan butir yang perlu dicek
peninjau dikumpulkan di
[`../catatan-tinjauan-modul.md`](../catatan-tinjauan-modul.md). Modul
mengikuti [`rancangan-modul.md`](rancangan-modul.md); contoh Python di modul
diperiksa sintaksnya oleh `bun run check:module-code`.

## Pekerjaan lanjutan (belum dikerjakan)

- Modul pendamping untuk butir Literasi Digital yang belum tercakup (Q10),
  dan perluasan untuk `DK-EA-a`, `DK-EA-d` (Q9); keduanya perlu issue sendiri.
- Dukungan `osn plan` dan `osn render lembar-siswa` untuk `smp-coding`:
  belum ada. Yang mendukungnya: `osn validate`, `check:fidelity`, dan
  `osn render modul --program smp-coding`. (Penyelarasan jembatan dengan
  `sd-coding`, Q8, sudah selesai lewat keputusan #177, v1.2.0.)

## Changelog

| Versi | Tanggal | Perubahan |
| --- | --- | --- |
| v1.3.0 | 2026-11-19 | Sinkron dokumen (#124): status modul belajar (84 modul draf dan indeks `modules.json`), `rancangan-modul.md` dan pilot masuk daftar berkas, "Pekerjaan lanjutan" yang sudah selesai dihapus; isi silabus dan corpus tidak berubah. |
| v1.2.0 | 2026-11-19 | Revisi minor atas keputusan pemilik #177: bagian 5.1 tidak lagi mengasumsikan blok, perulangan, dan percabangan dari SD (`SMP7-1-M1` pengamatan awal, hanya `SMP7-1-M1` dan `SMP7-1-M2` boleh dipadatkan); bagian 5.2 memperinci pemetaan ke SMA per kode minggu dan mengoreksi pemetaan blok kelas 7 ke fondasi `FND-X1-M1..M7`; rencana minggu, CP, dan jam tidak berubah. |
| v1.1.1 | 2026-11-19 | Silabus direvisi patch ke v1.1.1 (issue #165): kalimat status yang basi tentang program pasangannya diperbaiki; isi kurikulum dan corpus tidak berubah. |
| v1.1.2 | 2026-11-19 | Silabus direvisi patch ke v1.1.2: URL asal salinan SK 046 terverifikasi (`riset.md` v0.3.1); isi kurikulum dan corpus tidak berubah. |
| v1.1.0 | 2026-11-19 | Silabus v1.1: bagian 7.1 "Kebijakan penggunaan AI"; butir mengalihkan pekerjaan berpikir ke AI di `SMP9-2-M10` dan data pribadi dan kata sandi tidak ditempel ke layanan AI di `SMP8-2-M11`; `data/smp-coding/weeks.json` diperbarui; versi registri 1.1.0; kode butir CP dan struktur tidak berubah (usulan U-06, keputusan pemilik di issue #139). |
| v1.0.0 | 2026-11-19 | Silabus disetujui pemilik beserta rekomendasi; `silabus-draf.md` menjadi `silabus.md` v1.0.0; program didaftarkan dan di-encode ke `data/smp-coding/` dengan skema khusus per program (ADR-0008); pertanyaan untuk pemilik diganti catatan keputusan (issue #129). |
| v0.2.0 | 2026-11-19 | CP Fase D diganti dengan teks resmi (Panduan 2025 dan SK 046); pemetaan CP disusun ulang; Q1 diperbarui, Q10 dan Q11 ditambah (issue #129). |
| v0.1.0 | 2026-11-19 | Folder program dibuat: riset dan draf silabus (issue #129). |
