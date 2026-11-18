# Program Pembelajaran Coding SMA (`sma-coding`)

- **Version:** v1.3.0
- **Last updated:** 2026-11-19
- **Status:** Silabus v1.1 DISETUJUI pemilik program (2026-11-19) untuk jalur A dan B, termasuk blok fondasi kelas X (v1.0: 2026-11-18); jalur C dan modul pendamping masih disusun.

> **Silabus v1.1 disetujui pemilik program pada 2026-11-19 untuk jalur A dan
> B** (issue #92; v1.0 disetujui 2026-11-18, issue #52). Isi folder ini
> adalah konten **karangan** (*authored*) menurut
> [ADR-0007](../../architecture/adr/0007-authored-learning-content.md),
> bukan dokumen pemerintah. Silabus v1.1 menjadi sumber corpus program
> `sma-coding` (ADR-0006), dikodekan ke `data/sma-coding/` (tujuh berkas,
> termasuk blok fondasi kelas X `foundation.json`). Jalur C (#68), modul
> pendamping (#69), dan berkas rancangan lain di folder ini belum disetujui.

## Tujuan program

Menyediakan silabus pembelajaran coding untuk SMA kelas X (Fase E) sampai
XI–XII (Fase F) yang berpijak pada Capaian Pembelajaran (CP) Informatika
Kurikulum Merdeka:

| Jalur | Isi | Peran | Status |
| --- | --- | --- | --- |
| A | Algoritmik dengan C++ | Selaras dengan, dan menjadi jembatan ke, pembinaan OSN Informatika (rumpun materi di `data/osn/topic-families.json`). | Disetujui v1.1 |
| B | Pengembangan web dengan JavaScript + TypeScript, runtime Bun, dan template publik `ahliweb/awcms-one` (MIT) | Keterampilan membangun produk digital, berujung pada kustomisasi profil `landing` template. | Disetujui v1.1 |
| C | IoT/robotika | Interaksi dengan perangkat fisik. | Disusun (#68) |

Modul pendamping literasi digital untuk butir CP di luar coding: disusun
(#69).

## Keputusan pemilik

Keputusan atas v1.0 tertanggal 2026-11-18 (issue #49, #51, #52); keputusan
atas blok fondasi kelas X tertanggal 2026-11-18 (issue #86) dan persetujuan
v1.1 tertanggal 2026-11-19 (issue #92). Ringkasannya ada di bagian 9
[`silabus.md`](silabus.md).

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
| `rancangan-modul-pendamping.md` | Rancangan modul pendamping literasi digital (issue #69): tujuh modul, pemetaan butir CP, opsi pelaksanaan. Status DRAF — belum disetujui pemilik. |
| `rancangan-seri-cloud.md` | Rancangan seri modul cloud computing (issue #89): tujuh modul lintas jalur sebagai pengayaan. Status DRAF — belum disetujui pemilik. |
| `rancangan-seri-matematika-komputasi.md` | Rancangan seri modul matematika komputasi dasar (issue #87): tujuh modul. Status DRAF — belum disetujui pemilik; pemetaan minggunya masih memakai kode v1.0 dan perlu ditinjau ulang terhadap v1.1. |
| `riset-buku-ai-onno-w-purbo.md` | Riset buku AI karya Onno W. Purbo (issue #66): seri Buku AI SMA 6 jilid dan buku AI lain, terverifikasi dari halaman penerbit; pemetaan CP dan jalur; opsi pemanfaatan. Status DRAF — riset, belum keputusan pemilik. |

## Changelog

| Versi | Tanggal | Perubahan |
| --- | --- | --- |
| v1.3.0 | 2026-11-19 | Silabus v1.1 disetujui (issue #92): status, daftar berkas (menambah ketiga berkas rancangan), dan keputusan diperbarui; `silabus-v1.1-draf.md` menjadi `silabus.md`. |
| v1.2.0 | 2026-11-18 | Menambah usulan blok fondasi kelas X (issue #86) ke daftar berkas. |
| v1.1.0 | 2026-11-18 | Menambah dokumen riset buku AI karya Onno W. Purbo (issue #66) ke daftar berkas. |
| v1.0.0 | 2026-11-18 | Silabus disetujui untuk jalur A dan B; `silabus-draf.md` menjadi `silabus.md`; status jalur C dan modul pendamping dicatat. |
| v0.1.0 | 2026-11-18 | Draf awal folder program (issue #51). |
