# Program Pembelajaran Coding SMA (`sma-coding`)

- **Version:** v1.2.0
- **Last updated:** 2026-11-18
- **Status:** Silabus v1.0 DISETUJUI pemilik program (2026-11-18) untuk jalur A dan B; jalur C dan modul pendamping masih disusun.

> **Disetujui pemilik program pada 2026-11-18 untuk jalur A dan B** (issue
> #52). Isi folder ini adalah konten **karangan** (*authored*) menurut
> [ADR-0007](../../architecture/adr/0007-authored-learning-content.md),
> bukan dokumen pemerintah. Silabus v1.0 kini menjadi sumber corpus program
> `sma-coding` (ADR-0006); pengodean ke `data/sma-coding/` dikerjakan di
> issue #52. Jalur C (#68) dan modul pendamping (#69) belum disetujui.

## Tujuan program

Menyediakan silabus pembelajaran coding untuk SMA kelas X (Fase E) sampai
XI–XII (Fase F) yang berpijak pada Capaian Pembelajaran (CP) Informatika
Kurikulum Merdeka:

| Jalur | Isi | Peran | Status |
| --- | --- | --- | --- |
| A | Algoritmik dengan C++ | Selaras dengan, dan menjadi jembatan ke, pembinaan OSN Informatika (rumpun materi di `data/osn/topic-families.json`). | Disetujui v1.0 |
| B | Pengembangan web dengan JavaScript + TypeScript, runtime Bun, dan template publik `ahliweb/awcms-one` (MIT) | Keterampilan membangun produk digital, berujung pada kustomisasi profil `landing` template. | Disetujui v1.0 |
| C | IoT/robotika | Interaksi dengan perangkat fisik. | Disusun (#68) |

Modul pendamping literasi digital untuk butir CP di luar coding: disusun
(#69).

## Keputusan pemilik

Semua keputusan tertanggal 2026-11-18 dan dicatat di issue #49, #51, dan
#52; ringkasannya ada di bagian 9 [`silabus.md`](silabus.md).

## Cara mengusulkan perubahan

Perubahan pada silabus yang sudah disetujui mengikuti alur konten karangan
(ADR-0007): usulan lewat issue, revisi berstatus draf, lalu persetujuan
pemilik yang dicatat dengan tanggal. Agent tidak pernah mencatat
persetujuan atas nama pemilik.

## Daftar berkas

| Berkas | Isi |
| --- | --- |
| `README.md` | Dokumen ini: tujuan, status, keputusan, daftar berkas. |
| `silabus.md` | Silabus v1.0.0: sumber resmi dan kutipan CP, struktur dan rencana mingguan jalur A dan B, pemetaan CP, jembatan OSN, kelayakan `awcms-one`, asesmen, perangkat, privasi, keputusan pemilik, rujukan, changelog. |
| `usulan-fondasi-kelas-x.md` | Usulan blok fondasi informatika dasar wajib di kelas X (issue #86): topik per minggu, pemetaan ke butir CP v1.0, tiga opsi panjang blok dengan dampak ke kelas X, bentuk modul, hubungan dengan #68, #69, #84. Status DRAF — usulan untuk silabus v1.1, belum disetujui. |
| `riset-buku-ai-onno-w-purbo.md` | Riset buku AI karya Onno W. Purbo (issue #66): seri Buku AI SMA 6 jilid dan buku AI lain, terverifikasi dari halaman penerbit; pemetaan CP dan jalur; opsi pemanfaatan. Status DRAF — riset, belum keputusan pemilik. |

## Changelog

| Versi | Tanggal | Perubahan |
| --- | --- | --- |
| v1.2.0 | 2026-11-18 | Menambah usulan blok fondasi kelas X (issue #86) ke daftar berkas. |
| v1.1.0 | 2026-11-18 | Menambah dokumen riset buku AI karya Onno W. Purbo (issue #66) ke daftar berkas. |
| v1.0.0 | 2026-11-18 | Silabus disetujui untuk jalur A dan B; `silabus-draf.md` menjadi `silabus.md`; status jalur C dan modul pendamping dicatat. |
| v0.1.0 | 2026-11-18 | Draf awal folder program (issue #51). |
