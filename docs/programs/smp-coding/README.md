# Program Pembelajaran Coding SMP (`smp-coding`)

- **Version:** v0.2.0
- **Last updated:** 2026-11-19
- **Status:** DRAF — riset dan draf silabus (issue #129), belum disetujui pemilik. Program ini **belum terdaftar**: tidak ada `data/smp-coding/`, tidak ada entri di `data/programs.json`, dan tidak ada modul di `content/` (ADR-0006: program berstatus draf hanya didokumentasikan di `docs/programs/<id>/`).

> Isi folder ini adalah konten **karangan** (*authored*) menurut
> [ADR-0007](../../architecture/adr/0007-authored-learning-content.md), bukan
> dokumen pemerintah. Agent tidak pernah mencatat persetujuan atas nama
> pemilik. Kutipan CP Fase D di draf berasal dari dua teks resmi: *Panduan
> Mata Pelajaran Informatika* 2025 (URL resmi, diunduh orchestrator
> 2026-11-18) dan salinan SK 046/H/KR/2025 yang ditemukan orchestrator (URL
> asal belum terverifikasi); lihat [`riset.md`](riset.md) bagian 2.

## Tujuan program

Menyediakan silabus pembelajaran coding untuk siswa SMP/MTs kelas 7-9 (Fase
D): berpikir komputasional, pemrograman blok dan pseudocode, data, proyek,
literasi dan etika kecerdasan artifisial, lalu (pengayaan) pemrograman teks
Python. Rancangan (rekomendasi penyusun, bukan keputusan):

| Butir | Rancangan |
| --- | --- |
| Jalur | Satu jalur inti blok ke teks (Scratch, MakeCode simulator, Python), ditambah klub pengayaan OSN dan pemecahan masalah yang opsional |
| Dasar CP | CP Informatika Fase D (elemen BK dan LD) dan CP Koding dan KA Fase D (BK, LD, Literasi dan Etika KA, Pemanfaatan KA); kode butir `D-BK-a`..., `DK-EA-a`... |
| Catatan penting | Kedua CP Fase D **tidak memuat pemrograman teks**; Python di rancangan ini pengayaan di luar CP (keputusan pemilik: Q3) |
| Waktu | 6 semester x 14 minggu x 2 JP `[asumsi]` |
| Jembatan | Dari `sd-coding` (paralel, belum disepakati); ke `sma-coding` v1.2 (blok fondasi kelas X, jalur A sampai E); ke OSN lewat jalur A (OSN Informatika hanya SMA/sederajat) |
| Privasi | Tanpa data murid di repositori (ADR-0004); tanpa akun murid pada layanan daring |

## Daftar berkas

| Berkas | Isi |
| --- | --- |
| `README.md` | Dokumen ini: status, tujuan, daftar berkas, pertanyaan pemilik, changelog. |
| `riset.md` | Riset: provenance sumber resmi, kutipan persis CP Informatika Fase D (Panduan 2025) dan CP Koding dan KA Fase D (SK 046), dokumen ATP guru sebagai pembanding, kebijakan KKA di SMP, OSN jenjang SMP, kajian alat. |
| `silabus-draf.md` | Draf silabus v0.2: kutipan dan kode butir CP, struktur waktu, rencana 84 minggu (`SMP7-1-M1` sampai `SMP9-2-M14`), pemetaan CP, jembatan, asesmen, privasi, kebutuhan sarana, opsi alat dan rekomendasi, pertanyaan terbuka. |

## Pertanyaan untuk pemilik

Rincian opsi dan rekomendasi ada di bagian 10 `silabus-draf.md`. Ringkasan
dan rekomendasi penyusun:

| # | Pertanyaan | Rekomendasi |
| --- | --- | --- |
| Q1 | Dasar CP Fase D (sudah terjawab sebagian: teks resmi tersedia); konfirmasi URL resmi SK 046 | Pakai teks resmi; beri atau konfirmasi URL resmi SK 046 |
| Q2 | Status di sekolah: pilihan, ekstrakurikuler, terintegrasi, atau netral | Netral |
| Q3 | Pemrograman teks di SMP (di luar CP): Python pengayaan, tanpa teks, JS, C++ | Python sebagai pengayaan yang ditandai |
| Q4 | Satu jalur inti atau beberapa | Satu jalur inti dengan klub pengayaan opsional |
| Q5 | Alat blok | Scratch (kelas 7) dan MakeCode (kelas 8) |
| Q6 | Perangkat fisik | Simulator, papan opsional |
| Q7 | Alokasi dan menit JP | Sesuai sekolah; ditulis untuk 2 JP |
| Q8 | Keselarasan dengan `sd-coding` | Samakan setelah keduanya disetujui |
| Q9 | Cakupan materi KA kelas 9 (kini terikat CP KKA) | Perluas secukupnya |
| Q10 | Butir Literasi Digital di luar coding | Modul pendamping |
| Q11 | Butir `DK-PA` (memakai perangkat KA) | Demonstrasi guru |

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
| v0.2.0 | 2026-11-19 | CP Fase D diganti dengan teks resmi (Panduan 2025 dan SK 046); pemetaan CP disusun ulang; Q1 diperbarui, Q10 dan Q11 ditambah (issue #129). |
| v0.1.0 | 2026-11-19 | Folder program dibuat: riset dan draf silabus (issue #129). |
