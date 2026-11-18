# Program Pembelajaran Coding SMA (`sma-coding`)

- **Version:** v1.4.0
- **Last updated:** 2026-11-19
- **Status:** Silabus v1.1 DISETUJUI pemilik program (2026-11-19) untuk jalur A dan B, termasuk blok fondasi kelas X (v1.0: 2026-11-18); rancangan seri matematika komputasi, seri cloud, dan modul pendamping DISETUJUI pemilik (2026-11-19), modulnya belum ada di repositori; draf jalur C, D, dan E berstatus DRAF menunggu keputusan pemilik.

> **Silabus v1.1 disetujui pemilik program pada 2026-11-19 untuk jalur A dan
> B** (issue #92; v1.0 disetujui 2026-11-18, issue #52). Isi folder ini
> adalah konten **karangan** (*authored*) menurut
> [ADR-0007](../../architecture/adr/0007-authored-learning-content.md),
> bukan dokumen pemerintah. Silabus v1.1 menjadi sumber corpus program
> `sma-coding` (ADR-0006), dikodekan ke `data/sma-coding/` (tujuh berkas,
> termasuk blok fondasi kelas X `foundation.json`). Pada 2026-11-19 pemilik
> juga menyetujui **rancangan** tiga seri modul (matematika komputasi #87,
> cloud #89, pendamping literasi digital #69) beserta seluruh rekomendasinya;
> persetujuan itu atas rancangan, bukan atas isi modul. **Belum ada modul
> sma-coding di repositori** (`content/sma-coding/` dan
> `data/sma-coding/modules.json` belum ada): modul draf menunggu skema indeks
> modul (#106) dan modul fondasi kelas X dikerjakan di #107. Draf jalur C
> (#68), D (#84), dan E (#88) sudah ada di folder ini berstatus DRAF;
> keputusan opsinya menunggu pemilik dan belum menjadi bagian silabus.

## Tujuan program

Menyediakan silabus pembelajaran coding untuk SMA kelas X (Fase E) sampai
XI–XII (Fase F) yang berpijak pada Capaian Pembelajaran (CP) Informatika
Kurikulum Merdeka:

| Jalur | Isi | Peran | Status |
| --- | --- | --- | --- |
| A | Algoritmik dengan C++ | Selaras dengan, dan menjadi jembatan ke, pembinaan OSN Informatika (rumpun materi di `data/osn/topic-families.json`). | Disetujui v1.1 |
| B | Pengembangan web dengan JavaScript + TypeScript, runtime Bun, dan template publik `ahliweb/awcms-one` (MIT) | Keterampilan membangun produk digital, berujung pada kustomisasi profil `landing` template. | Disetujui v1.1 |
| C | IoT/robotika | Interaksi dengan perangkat fisik. | DRAF, menunggu keputusan pemilik (#68; [`draf-jalur-c-iot.md`](draf-jalur-c-iot.md)) |
| D | Kecerdasan buatan dan analisis data | Di luar rumusan CP; pengayaan AI dan data (menurut draf). | DRAF, menunggu keputusan pemilik (#84; [`draf-jalur-d-ai.md`](draf-jalur-d-ai.md)) |
| E | Komputasi kuantum dan cloud quantum | Di luar rumusan CP; pengayaan (menurut draf). | DRAF, menunggu keputusan pemilik (#88; [`draf-jalur-e-kuantum.md`](draf-jalur-e-kuantum.md)) |

Jalur C, D, dan E belum masuk silabus dan belum punya `data/` maupun entri
registri (ADR-0006) sampai pemilik memutuskan dan menyetujui silabusnya.

Modul pendamping literasi digital untuk butir CP di luar coding: rancangan
disetujui pemilik 2026-11-19 (#69); modulnya belum ditulis ke repositori.

## Keputusan pemilik

Keputusan atas v1.0 tertanggal 2026-11-18 (issue #49, #51, #52); keputusan
atas blok fondasi kelas X tertanggal 2026-11-18 (issue #86) dan persetujuan
v1.1 tertanggal 2026-11-19 (issue #92). Ringkasannya ada di bagian 9
[`silabus.md`](silabus.md).

Persetujuan rancangan seri modul, 2026-11-19 (dialog pilihan; dicatat di
komentar issue masing-masing): seri matematika komputasi (#87) beserta enam
rekomendasi, seri cloud (#89) beserta tujuh rekomendasi, dan modul pendamping
(#69) beserta enam rekomendasi. Rinciannya di bagian awal tiap dokumen
rancangan.

Masih menunggu keputusan pemilik: pertanyaan terbuka pada draf jalur C, D,
dan E (#68, #84, #88). Pekerjaan lanjutan yang sudah dicatat sebagai issue:
skema indeks modul sma-coding (#106), modul fondasi kelas X (#107), dan celah
butir CP F-LD-d dan F-LD-e untuk jalur A (#105).

## Cara mengusulkan perubahan

Perubahan pada silabus yang sudah disetujui mengikuti alur konten karangan
(ADR-0007): usulan lewat issue, revisi berstatus draf, lalu persetujuan
pemilik yang dicatat dengan tanggal. Agent tidak pernah mencatat
persetujuan atas nama pemilik.

## Daftar berkas

| Berkas | Isi |
| --- | --- |
| `README.md` | Dokumen ini: tujuan, status, keputusan, daftar berkas. |
| `silabus.md` | Silabus v1.1.0: sumber resmi dan kutipan CP, struktur, blok fondasi kelas X bersama (`FND-X1-M1..M7`) dan rencana mingguan jalur A dan B, pemetaan CP, jembatan OSN, kelayakan `awcms-one`, asesmen, perangkat, privasi, keputusan pemilik, rujukan, changelog. |
| `usulan-fondasi-kelas-x.md` | Usulan blok fondasi informatika dasar wajib di kelas X (issue #86): topik per minggu, pemetaan ke butir CP v1.0, tiga opsi panjang blok dengan dampak ke kelas X, bentuk modul, hubungan dengan #68, #69, #84. Usulan asal blok fondasi yang kini diterapkan di silabus v1.1 (bagian 3.0); dokumen itu sendiri tetap berstatus DRAF sebagai riwayat usulan. |
| `draf-jalur-c-iot.md` | Draf jalur C IoT/robotika (issue #68). Status DRAF; keputusan opsi menunggu pemilik. |
| `draf-jalur-d-ai.md` | Draf jalur D kecerdasan buatan dan analisis data (issue #84). Status DRAF; keputusan opsi menunggu pemilik. |
| `draf-jalur-e-kuantum.md` | Draf jalur E komputasi kuantum dan cloud quantum (issue #88). Status DRAF; keputusan opsi menunggu pemilik. |
| `rancangan-modul-pendamping.md` | Rancangan modul pendamping literasi digital (issue #69): tujuh modul, pemetaan butir CP, opsi pelaksanaan. Rancangan disetujui pemilik 2026-11-19 beserta rekomendasinya; modul draf menyusul lewat #106 (skema indeks), belum ada di repositori. |
| `rancangan-seri-cloud.md` | Rancangan seri modul cloud computing (issue #89): tujuh modul lintas jalur sebagai pengayaan. Rancangan disetujui pemilik 2026-11-19 beserta rekomendasinya; modul draf menyusul lewat #106, belum ada di repositori. Kode minggu sudah mengikuti silabus v1.1. |
| `rancangan-seri-matematika-komputasi.md` | Rancangan seri modul matematika komputasi dasar (issue #87): tujuh modul. Rancangan disetujui pemilik 2026-11-19 beserta rekomendasinya; modul draf menyusul lewat #106, belum ada di repositori. Kode minggu sudah dipetakan ke silabus v1.1. |
| `riset-buku-ai-onno-w-purbo.md` | Riset buku AI karya Onno W. Purbo (issue #66): seri Buku AI SMA 6 jilid dan buku AI lain, terverifikasi dari halaman penerbit; pemetaan CP dan jalur; opsi pemanfaatan. Status DRAF — riset, belum keputusan pemilik. |

## Changelog

| Versi | Tanggal | Perubahan |
| --- | --- | --- |
| v1.4.0 | 2026-11-19 | Menyelaraskan dengan keadaan nyata: jalur C, D, dan E (draf, #68, #84, #88) masuk tabel jalur dan daftar berkas; rancangan seri matematika komputasi, seri cloud, dan modul pendamping tercatat disetujui pemilik 2026-11-19 beserta rekomendasinya (modul belum ada di repositori; menunggu #106 dan #107); bagian keputusan memuat persetujuan itu dan issue lanjutan #105, #106, #107. |
| v1.3.0 | 2026-11-19 | Silabus v1.1 disetujui (issue #92): status, daftar berkas (menambah ketiga berkas rancangan), dan keputusan diperbarui; `silabus-v1.1-draf.md` menjadi `silabus.md`. |
| v1.2.0 | 2026-11-18 | Menambah usulan blok fondasi kelas X (issue #86) ke daftar berkas. |
| v1.1.0 | 2026-11-18 | Menambah dokumen riset buku AI karya Onno W. Purbo (issue #66) ke daftar berkas. |
| v1.0.0 | 2026-11-18 | Silabus disetujui untuk jalur A dan B; `silabus-draf.md` menjadi `silabus.md`; status jalur C dan modul pendamping dicatat. |
| v0.1.0 | 2026-11-18 | Draf awal folder program (issue #51). |
