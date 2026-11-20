# Program Pembelajaran Coding SMA (`sma-coding`)

- **Version:** v1.17.0
- **Last updated:** 2026-11-20
- **Status:** Silabus v1.3 (butir dan kebijakan AI, issue #139) dan sebelumnya v1.2 DISETUJUI pemilik program (2026-11-19) untuk jalur A, B, C, D, dan E, termasuk blok fondasi kelas X (v1.1: 2026-11-19; v1.0: 2026-11-18); jalur D dan E di luar rumusan CP (pengayaan); rancangan seri matematika komputasi, seri cloud, dan modul pendamping DISETUJUI pemilik (2026-11-19), 393 modulnya (per 2026-11-20) ada di `content/sma-coding/modules/` dan terindeks di `data/sma-coding/modules.json` (29 modul fondasi, matematika komputasi, cloud, dan pendamping, termasuk 6 modul fondasi dan 2 modul pendamping lintas jalur untuk F-LD-d dan F-LD-e, #105; ditambah 364 modul mingguan jalur A sampai E, #124 dan #237), berstatus `disetujui` sejak 2026-11-20 (keputusan pemilik lewat dialog pilihan baku, #125; bukan tinjauan isi per modul); draf jalur C, D, dan E disetujui pemilik 2026-11-19 beserta semua rekomendasi dan sudah masuk silabus v1.2 (dokumen drafnya tetap sebagai riwayat). Revisi v1.4.0 (kemampuan masuk dari SMP dan penempatan di blok fondasi, bagian 3.0) disetujui lewat keputusan pemilik 2026-11-19 (issue #177).

> **Silabus v1.3 (revisi dari v1.2) disetujui pemilik program pada 2026-11-19
> untuk jalur A, B, C, D, dan E** (issue #139 untuk v1.3: butir AI pada dua belas
> minggu dan bagian 7.4 "Kebijakan penggunaan AI"; issue #68, #84, #88 untuk v1.2; v1.1: issue #92; v1.0 disetujui
> 2026-11-18, issue #52). Isi folder ini
> adalah konten **karangan** (*authored*) menurut
> [ADR-0007](../../architecture/adr/0007-authored-learning-content.md),
> bukan dokumen pemerintah. Silabus v1.2 menjadi sumber corpus program
> `sma-coding` (ADR-0006), dikodekan ke `data/sma-coding/` (tujuh berkas,
> termasuk blok fondasi kelas X `foundation.json`; lima jalur, 364 minggu
> jalur). Pada 2026-11-19 pemilik
> juga menyetujui **rancangan** tiga seri modul (matematika komputasi #87,
> cloud #89, pendamping literasi digital #69) beserta seluruh rekomendasinya;
> persetujuan itu atas rancangan, bukan atas isi modul. **Modul sma-coding
> sudah ada dan disetujui pemilik pada 2026-11-20** (keputusan lewat dialog pilihan baku, bukan tinjauan isi per modul): 393 modul ada di
> `content/sma-coding/modules/` dan terindeks di `data/sma-coding/modules.json`
> (29 modul lintas jalur: 6 fondasi kelas X, 7 matematika komputasi, 7 cloud,
> dan 9 pendamping literasi digital; ditambah 364 modul mingguan: jalur A 77, B 77, C 77,
> D 77, E 56, [#124](https://github.com/ahliweb/osn/issues/124));
> butir catatan tinjauannya menjadi tindak lanjut revisi
> ([#125](https://github.com/ahliweb/osn/issues/125)). Modul mingguan jalur A dan B
> lengkap ditulis dalam enam putaran P1 sampai P6 (154 modul,
> [#237](https://github.com/ahliweb/osn/issues/237), rancangan
> [`rancangan-modul-ab.md`](rancangan-modul-ab.md)). Draf jalur C
> (#68), D (#84), dan E (#88) disetujui pemilik pada 2026-11-19 beserta
> semua rekomendasi penyusun dan kini menjadi bagian silabus v1.2 (bagian
> 3.3 sampai 3.6, 4.5, 5.2 dan keputusan di bagian 9.3); berkas drafnya
> dipertahankan sebagai riwayat.

## Tujuan program

Menyediakan silabus pembelajaran coding untuk SMA kelas X (Fase E) sampai
XI–XII (Fase F) yang berpijak pada Capaian Pembelajaran (CP) Informatika
Kurikulum Merdeka:

| Jalur | Isi | Peran | Status |
| --- | --- | --- | --- |
| A | Algoritmik dengan C++ | Selaras dengan, dan menjadi jembatan ke, pembinaan OSN Informatika (rumpun materi di `data/osn/topic-families.json`). | Disetujui v1.1 |
| B | Pengembangan web dengan JavaScript + TypeScript, runtime Bun, dan template publik `ahliweb/awcms-one` (MIT) | Keterampilan membangun produk digital, berujung pada kustomisasi profil `landing` template. | Disetujui v1.1 |
| C | IoT dan robotika (C++ gaya Arduino, ESP32), kelas X-XII | Interaksi dengan perangkat fisik; dipetakan ke CP hanya lewat prinsip komputasinya; jembatan OSN sebagian (bagian 5.2). | Disetujui v1.2, 2026-11-19 (#68; asal [`draf-jalur-c-iot.md`](draf-jalur-c-iot.md)) |
| D | Kecerdasan buatan dan analisis data (Orange, lalu Python), kelas X-XII | **Pengayaan di luar rumusan CP**; tidak dihitung sebagai pemenuhan CP; tanpa jembatan OSN. | Disetujui v1.2, 2026-11-19 (#84; asal [`draf-jalur-d-ai.md`](draf-jalur-d-ai.md)) |
| E | Komputasi kuantum dan cloud quantum (Quirk dan simulator buatan sendiri), **kelas XI-XII saja**, awalan kode `E-` | **Pengayaan di luar rumusan CP**; tidak dihitung sebagai pemenuhan CP; tanpa blok fondasi dan tanpa jembatan OSN. | Disetujui v1.2, 2026-11-19 (#88; asal [`draf-jalur-e-kuantum.md`](draf-jalur-e-kuantum.md)) |

Jalur C, D, dan E sudah masuk silabus v1.2 dan `data/sma-coding/` (ADR-0006).
Corpus mencatat jalur D dan E sebagai `cpStatus` "pengayaan" dan hanya
menyimpan irisan terdekatnya dengan butir CP sebagai `enrichmentLinks`
(silabus bagian 4.5), bukan sebagai pemetaan.

Modul pendamping literasi digital untuk butir CP di luar coding: rancangan
disetujui pemilik 2026-11-19 (#69); sembilan modul `pendamping-*` ada di
`content/sma-coding/modules/` (#69, ditambah dua modul untuk F-LD-d dan F-LD-e,
#105).

## Modul belajar

Status per 2026-11-20, dihitung dari `data/sma-coding/modules.json` dan
`content/sma-coding/modules/` (393 entri dan 393 berkas, semuanya `disetujui`
sejak 2026-11-20 atas keputusan pemilik lewat dialog pilihan baku, #125, bukan tinjauan isi per modul):

| Kelompok | Jumlah | Id | Rancangan |
| --- | --- | --- | --- |
| Fondasi kelas X | 6 | `fondasi-*` | silabus bagian 3.0 |
| Matematika komputasi | 7 | `matkom-*` | [`rancangan-seri-matematika-komputasi.md`](rancangan-seri-matematika-komputasi.md) |
| Cloud | 7 | `cloud-*` | [`rancangan-seri-cloud.md`](rancangan-seri-cloud.md) |
| Pendamping literasi digital | 9 | `pendamping-*` | [`rancangan-modul-pendamping.md`](rancangan-modul-pendamping.md) |
| Jalur C (IoT dan robotika) | 77 | `c-x1-m1` .. `c-xii2-m14` | [`rancangan-modul-cde.md`](rancangan-modul-cde.md) |
| Jalur D (AI dan data) | 77 | `d-x1-m1` .. `d-xii2-m14` | [`rancangan-modul-cde.md`](rancangan-modul-cde.md) |
| Jalur E (kuantum) | 56 | `e-xi1-m1` .. `e-xii2-m14` | [`rancangan-modul-cde.md`](rancangan-modul-cde.md) |
| Jalur A (algoritmik C++) | 77 | `a-x1-m8` .. `a-xii2-m14` | [`rancangan-modul-ab.md`](rancangan-modul-ab.md) |
| Jalur B (web JS/TS/Bun) | 77 | `b-x1-m8` .. `b-xii2-m14` | [`rancangan-modul-ab.md`](rancangan-modul-ab.md) |

Tidak ada `lembar/` dan `gambar/` untuk program ini. Butir yang masih perlu dicek
manusia (tindak lanjut revisi, #125) dikumpulkan di
[`../catatan-tinjauan-modul.md`](../catatan-tinjauan-modul.md); catatan
tinjauan seri cloud/pendamping dan fondasi/matkom ada di
[`tinjauan-modul/`](tinjauan-modul/).

## Keputusan pemilik

Keputusan atas v1.0 tertanggal 2026-11-18 (issue #49, #51, #52); keputusan
atas blok fondasi kelas X tertanggal 2026-11-18 (issue #86) dan persetujuan
v1.1 tertanggal 2026-11-19 (issue #92); keputusan atas draf jalur C, D, dan E
tertanggal 2026-11-19 (issue #68, #84, #88; semua rekomendasi penyusun
dipilih, untuk jalur E kelas XI-XII saja dan awalan kode `E-`). Ringkasannya
ada di bagian 9 [`silabus.md`](silabus.md) (9.3 untuk v1.2).

Keputusan atas riset AI dalam rekayasa perangkat lunak, 2026-11-19 (dialog
pilihan; issue #139, silabus bagian 9.4): usulan U-02 sampai U-05 untuk program
ini diterapkan tanpa minggu baru; pemakaian AI generatif oleh murid SMA di
semua jalur **bebas dengan etika**, menggantikan aturan jalur D v1.2
"hanya didemonstrasikan guru"; kebijakan AI disusun per program (silabus
bagian 7.4); data pribadi murid tetap tidak masuk repositori (ADR-0004).

Persetujuan rancangan seri modul, 2026-11-19 (dialog pilihan; dicatat di
komentar issue masing-masing): seri matematika komputasi (#87) beserta enam
rekomendasi, seri cloud (#89) beserta tujuh rekomendasi, dan modul pendamping
(#69) beserta enam rekomendasi. Rinciannya di bagian awal tiap dokumen
rancangan.

Sudah dikerjakan: skema indeks modul sma-coding (#106), modul fondasi kelas X
(#107), dan dua modul pendamping lintas jalur untuk celah butir CP F-LD-d dan
F-LD-e (#105, dicatat di silabus bagian 4.3) dan 210 modul mingguan jalur C, D, dan E
(#124); semua modulnya disetujui pemilik pada 2026-11-20 (#125).

## Cara mengusulkan perubahan

Perubahan pada silabus yang sudah disetujui mengikuti alur konten karangan
(ADR-0007): usulan lewat issue, revisi berstatus draf, lalu persetujuan
pemilik yang dicatat dengan tanggal. Agent tidak pernah mencatat
persetujuan atas nama pemilik.

## Daftar berkas

| Berkas | Isi |
| --- | --- |
| `README.md` | Dokumen ini: tujuan, status, keputusan, daftar berkas. |
| `silabus.md` | Silabus v1.4.1: sumber resmi dan kutipan CP, struktur, blok fondasi kelas X bersama (`FND-X1-M1..M7`) dan rencana mingguan jalur A, B, C, D, dan E (ringkasan jalur di bagian 3.6), pemetaan CP (jalur D dan E sebagai pengayaan di luar CP, bagian 4.5), jembatan OSN (jalur A dan C), kelayakan `awcms-one`, asesmen, perangkat, privasi, kebijakan penggunaan AI (bagian 7.4), keputusan pemilik, rujukan, changelog. |
| `usulan-fondasi-kelas-x.md` | Usulan blok fondasi informatika dasar wajib di kelas X (issue #86): topik per minggu, pemetaan ke butir CP v1.0, tiga opsi panjang blok dengan dampak ke kelas X, bentuk modul, hubungan dengan #68, #69, #84. Usulan asal blok fondasi yang kini diterapkan di silabus v1.1 (bagian 3.0); dokumen itu sendiri tetap berstatus DRAF sebagai riwayat usulan. |
| `draf-jalur-c-iot.md` | Draf jalur C IoT/robotika (issue #68): disetujui pemilik 2026-11-19 dan masuk silabus v1.2; riwayat draf (perbandingan platform, harga bertanggal, sumber). |
| `draf-jalur-d-ai.md` | Draf jalur D kecerdasan buatan dan analisis data (issue #84): disetujui pemilik 2026-11-19 dan masuk silabus v1.2; riwayat draf (perbandingan alat, sumber). |
| `draf-jalur-e-kuantum.md` | Draf jalur E komputasi kuantum dan cloud quantum (issue #88): disetujui pemilik 2026-11-19 dan masuk silabus v1.2; riwayat draf (perbandingan stack, fakta layanan cloud quantum bertanggal, analisis kode). |
| `rancangan-modul-cde.md` | Rancangan seri modul jalur C, D, dan E (issue #124): 210 modul, satu per minggu (C 77, D 77, E 56). Dokumen DRAF; 210 modul `c-*`, `d-*`, `e-*` ada di repositori sejak 2026-11-19. |
| `rancangan-modul-cde-contoh/` | Riwayat: dua modul pilot (`c-x1-m8.md`, `d-x1-m8.md`) sebelum modul sebenarnya ditulis; modul nyatanya `content/sma-coding/modules/c-x1-m8.md` dan `d-x1-m8.md`. |
| `tinjauan-modul/` | Catatan tinjauan modul: `fondasi-matkom.md` dan `cloud-pendamping.md`. |
| `rancangan-modul-pendamping.md` | Rancangan modul pendamping literasi digital (issue #69): tujuh modul, pemetaan butir CP, opsi pelaksanaan. Rancangan disetujui pemilik 2026-11-19 beserta rekomendasinya; sembilan modul `pendamping-*` ada di repositori (tujuh sejak 2026-11-19, #118; dua untuk F-LD-d dan F-LD-e, #105). |
| `rancangan-seri-cloud.md` | Rancangan seri modul cloud computing (issue #89): tujuh modul lintas jalur sebagai pengayaan. Rancangan disetujui pemilik 2026-11-19 beserta rekomendasinya; tujuh modul `cloud-*` ada di repositori sejak 2026-11-19 (#117). Kode minggu sudah mengikuti silabus v1.1. |
| `rancangan-seri-matematika-komputasi.md` | Rancangan seri modul matematika komputasi dasar (issue #87): tujuh modul. Rancangan disetujui pemilik 2026-11-19 beserta rekomendasinya; tujuh modul `matkom-*` ada di repositori sejak 2026-11-19 (#116). Kode minggu sudah dipetakan ke silabus v1.1. |
| `riset-buku-ai-onno-w-purbo.md` | Riset buku AI karya Onno W. Purbo (issue #66): seri Buku AI SMA 6 jilid dan buku AI lain, terverifikasi dari halaman penerbit; pemetaan CP dan jalur; opsi pemanfaatan. Status DRAF — riset, belum keputusan pemilik. |

## Changelog

| Versi | Tanggal | Perubahan |
| --- | --- | --- |
| v1.17.0 | 2026-11-20 | Pemilik menyetujui 393 modul belajar lewat dialog pilihan baku ("Setujui semua, catatan jadi tindak lanjut", #125): indeks `modules.json` berstatus `disetujui`; butir catatan tinjauan jadi tindak lanjut revisi; isi silabus dan corpus tidak berubah. |
| v1.16.0 | 2026-11-20 | Putaran P6 modul jalur A dan B (#237): 28 modul draf `a-xii2-m1..m14` dan `b-xii2-m1..m14` (kelas XII semester 2); seri jalur A dan B lengkap (77 + 77 modul); jumlah modul dan tabel kelompok diperbarui. |
| v1.15.0 | 2026-11-20 | Putaran P5 modul jalur A dan B (#237): 28 modul draf `a-xii1-m1..m14` dan `b-xii1-m1..m14` (kelas XII semester 1); jumlah modul dan tabel kelompok diperbarui. |
| v1.14.0 | 2026-11-20 | Putaran P4 modul jalur A dan B (#237): 28 modul draf `a-xi2-m1..m14` dan `b-xi2-m1..m14` (kelas XI semester 2); jumlah modul dan tabel kelompok diperbarui. |
| v1.13.0 | 2026-11-20 | Putaran P3 modul jalur A dan B (#237): 28 modul draf `a-xi1-m1..m14` dan `b-xi1-m1..m14` (kelas XI semester 1); jumlah modul dan tabel kelompok diperbarui. |
| v1.12.0 | 2026-11-20 | Putaran P2 modul jalur A dan B (#237): 28 modul draf `a-x2-m1..m14` dan `b-x2-m1..m14`; jumlah modul dan tabel kelompok diperbarui; kalimat "jalur A dan B tidak punya modul mingguan" yang basi diganti. |
| v1.11.0 | 2026-11-19 | Modul jalur A dan B mulai ditulis (#237, rancangan `rancangan-modul-ab.md`): putaran P1, 14 modul draf `a-x1-m8..m14` dan `b-x1-m8..m14`; jumlah modul dan tabel kelompok diperbarui. |
| v1.10.1 | 2026-11-19 | Silabus direvisi patch ke v1.4.1 atas instruksi pemilik 2026-11-19 (#238): dasar hukum siber diselaraskan dengan UU 1/2023 (KUHP); isi kurikulum selain rumusan dasar hukum tidak berubah. |
| v1.10.0 | 2026-11-19 | Sinkron dokumen (#124): 239 modul draf di `content/sma-coding/modules/` dan `data/sma-coding/modules.json` (29 lintas jalur ditambah 210 modul jalur C, D, E); bagian "Modul belajar" baru; `rancangan-modul-cde.md` dan folder pilot masuk daftar berkas; jalur A dan B tercatat tanpa modul mingguan; isi silabus dan corpus tidak berubah. |
| v1.9.0 | 2026-11-19 | Silabus v1.4.0 disetujui (issue #177, keputusan pemilik K1, K3, K7): subbagian baru di bagian 3.0 "Kemampuan masuk dari SMP dan penempatan di blok fondasi" (tidak mensyaratkan SMP; irisan minggu SMP dengan fondasi dan jalur A, B; pengamatan awal dan tugas pendalaman di kelas bersama), dicerminkan di `data/sma-coding/smp-bridge.json` (8 berkas korpus); kode minggu, jumlah minggu, pemetaan CP, dan jalur tidak berubah. |
| v1.8.2 | 2026-11-19 | Silabus direvisi patch ke v1.3.1: status verifikasi sumber (alamat resmi teks SK 046/H/KR/2025 terverifikasi; padanan JDIH Kemendikdasmen tetap belum terverifikasi); isi kurikulum dan corpus tidak berubah. |
| v1.8.1 | 2026-11-19 | Paragraf status diperbaiki: modul sma-coding sudah ada (29 modul draf, menunggu tinjauan #125; modul jalur C, D, E belum ada, #124). Isi silabus tidak berubah (issue #165). |
| v1.8.0 | 2026-11-19 | Silabus v1.3 disetujui (issue #139): butir AI pada `FND-X1-M6`, `C-XI2-M2`, `A-XII2-M5..M8`, `B-XI1-M5`, `B-XI1-M12`, `B-XII1-M10`, `D-X2-M11`, `D-XI2-M12`, `D-XII1-M10` tanpa minggu baru; pemakaian AI generatif oleh murid bebas dengan etika (menggantikan aturan jalur D v1.2); bagian 7.4 kebijakan AI per program. Status, keputusan, dan daftar berkas diperbarui; `draf-jalur-d-ai.md` diberi catatan bahwa aturan lamanya digantikan. |
| v1.7.0 | 2026-11-19 | Silabus v1.2 disetujui (issue #68, #84, #88): jalur C, D, dan E masuk silabus dan `data/sma-coding/`; tabel jalur, keputusan, dan daftar berkas diperbarui; jalur D dan E tercatat sebagai pengayaan di luar CP. |
| v1.6.0 | 2026-11-19 | Dua modul pendamping lintas jalur untuk butir F-LD-d dan F-LD-e (#105) masuk repositori dan terindeks; jumlah modul draf menjadi 29. |
| v1.5.0 | 2026-11-19 | 27 modul draf sma-coding (fondasi, matematika komputasi, cloud, pendamping) masuk repositori dan terindeks (#115–#118); status rancangan diperbarui. |
| v1.4.0 | 2026-11-19 | Menyelaraskan dengan keadaan nyata: jalur C, D, dan E (draf, #68, #84, #88) masuk tabel jalur dan daftar berkas; rancangan seri matematika komputasi, seri cloud, dan modul pendamping tercatat disetujui pemilik 2026-11-19 beserta rekomendasinya (modul belum ada di repositori; menunggu #106 dan #107); bagian keputusan memuat persetujuan itu dan issue lanjutan #105, #106, #107. |
| v1.3.0 | 2026-11-19 | Silabus v1.1 disetujui (issue #92): status, daftar berkas (menambah ketiga berkas rancangan), dan keputusan diperbarui; `silabus-v1.1-draf.md` menjadi `silabus.md`. |
| v1.2.0 | 2026-11-18 | Menambah usulan blok fondasi kelas X (issue #86) ke daftar berkas. |
| v1.1.0 | 2026-11-18 | Menambah dokumen riset buku AI karya Onno W. Purbo (issue #66) ke daftar berkas. |
| v1.0.0 | 2026-11-18 | Silabus disetujui untuk jalur A dan B; `silabus-draf.md` menjadi `silabus.md`; status jalur C dan modul pendamping dicatat. |
| v0.1.0 | 2026-11-18 | Draf awal folder program (issue #51). |
