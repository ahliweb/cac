# Program Pembelajaran Coding SMP (`smp-coding`)

- **Version:** v0.1.0
- **Last updated:** 2026-11-19
- **Status:** DRAF — riset dan draf silabus (issue #129), belum disetujui pemilik. Program ini **belum terdaftar**: tidak ada `data/smp-coding/`, tidak ada entri di `data/programs.json`, dan tidak ada modul di `content/` (ADR-0006: program berstatus draf hanya didokumentasikan di `docs/programs/<id>/`).

> Isi folder ini adalah konten **karangan** (*authored*) menurut
> [ADR-0007](../../architecture/adr/0007-authored-learning-content.md), bukan
> dokumen pemerintah. Agent tidak pernah mencatat persetujuan atas nama
> pemilik. Peringatan utama: dokumen resmi CP Informatika Fase D versi 2025
> **tidak berhasil dibuka** saat riset (2026-11-19), sehingga pemetaan CP di
> draf memakai kerangka sementara yang belum terverifikasi (lihat
> [`riset.md`](riset.md) bagian 1 dan 2).

## Tujuan program

Menyediakan silabus pembelajaran coding untuk siswa SMP/MTs kelas 7-9 (Fase
D): berpikir komputasional, pemrograman blok, lalu pemrograman teks (Python),
data, proyek, dan etika (termasuk etika kecerdasan artifisial). Rancangan
(rekomendasi penyusun, bukan keputusan):

| Butir | Rancangan |
| --- | --- |
| Jalur | Satu jalur inti blok ke teks (Scratch, MakeCode simulator, Python), ditambah klub pengayaan OSN dan pemecahan masalah yang opsional |
| Waktu | 6 semester x 14 minggu x 2 JP `[asumsi]` |
| Jembatan | Dari `sd-coding` (paralel, belum disepakati); ke `sma-coding` v1.2 (blok fondasi kelas X, jalur A sampai E); ke OSN lewat jalur A (OSN Informatika hanya SMA/sederajat) |
| Privasi | Tanpa data murid di repositori (ADR-0004); tanpa akun murid pada layanan daring |

## Daftar berkas

| Berkas | Isi |
| --- | --- |
| `README.md` | Dokumen ini: status, tujuan, daftar berkas, pertanyaan pemilik, changelog. |
| `riset.md` | Riset: sumber resmi yang dibuka dan yang gagal dibuka (URL dan tanggal akses), kutipan CP Fase D persis dari dokumen ATP yang dibuka (bukan resmi), kebijakan KKA di SMP, OSN jenjang SMP, kajian alat. |
| `silabus-draf.md` | Draf silabus v0.1: kutipan dan kode butir CP, struktur waktu, rencana 84 minggu (`SMP7-1-M1` sampai `SMP9-2-M14`), pemetaan CP, jembatan, asesmen, privasi, kebutuhan sarana, opsi alat dan rekomendasi, pertanyaan terbuka. |

## Pertanyaan untuk pemilik

Rincian opsi dan rekomendasi ada di bagian 10 `silabus-draf.md`. Ringkasan
dan rekomendasi penyusun:

| # | Pertanyaan | Rekomendasi |
| --- | --- | --- |
| Q1 | Dasar CP Fase D: berikan teks resmi Panduan Informatika 2025 atau SK 046/H/KR/2025 | Berikan teks resmi agar pemetaan diganti dan dikutip persis |
| Q2 | Status di sekolah: pilihan, ekstrakurikuler, terintegrasi, atau netral | Netral |
| Q3 | Bahasa teks pertama | Python |
| Q4 | Satu jalur inti atau beberapa | Satu jalur inti dengan klub pengayaan opsional |
| Q5 | Alat blok | Scratch (kelas 7) dan MakeCode (kelas 8) |
| Q6 | Perangkat fisik | Simulator, papan opsional |
| Q7 | Alokasi dan menit JP | Sesuai sekolah; ditulis untuk 2 JP |
| Q8 | Keselarasan dengan `sd-coding` | Samakan setelah keduanya disetujui |
| Q9 | Materi AI kelas 9 | Dua minggu tanpa perangkat |

Keputusan diambil pemilik (dialog pilihan) dan dicatat di issue #129 dengan
tanggal; sebelum itu, dokumen berstatus DRAF.

## Langkah setelah persetujuan

Mengikuti pola `sma-coding` (ADR-0006, aturan urutan di `AGENTS.md`): skema
(`src/schema/`), lalu `data/smp-coding/`, entri `data/programs.json`, domain,
dan uji; modul di `content/smp-coding/modules/` mengikuti ADR-0007. Tidak ada
langkah itu yang dikerjakan di sini.

## Changelog

| Versi | Tanggal | Perubahan |
| --- | --- | --- |
| v0.1.0 | 2026-11-19 | Folder program dibuat: riset dan draf silabus (issue #129). |
