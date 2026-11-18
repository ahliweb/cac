# Program Pembelajaran Coding Perguruan Tinggi (`kuliah-coding`)

- **Version:** v0.1.0
- **Last updated:** 2026-11-19
- **Status:** **DRAF**, belum disetujui pemilik. Issue #130. Program ini **belum terdaftar**: tidak ada `data/kuliah-coding/`, tidak ada entri `data/programs.json`, dan tidak ada `content/kuliah-coding/` (ADR-0006: program berstatus draf hanya hidup di `docs/programs/`).

> Isi folder ini adalah konten **karangan** (*authored*) menurut
> [ADR-0007](../../architecture/adr/0007-authored-learning-content.md), bukan
> dokumen pemerintah dan bukan materi resmi Puspresnas, IA TOKI, ACM, IEEE,
> atau penyelenggara ICPC. Agent tidak pernah mencatat persetujuan atas nama
> pemilik.

## Tujuan program

Menyediakan silabus pembelajaran coding untuk mahasiswa Indonesia, dalam
satuan SKS dan semester menurut Permendiktisaintek 39/2025, pada tiga jalur
(rekomendasi pembagian ada di `silabus-draf.md` bagian 2.1):

| Jalur | Isi | Sasaran | Mata kuliah / SKS |
| --- | --- | --- | --- |
| U | Berpikir komputasional, Python dan analisis data, otomasi, literasi AI | Mahasiswa semua program studi | 5 / 14 SKS |
| I | Fondasi pemrograman, struktur data dan algoritma, basis data, rekayasa perangkat lunak, web, dan lainnya; dipetakan ke 17 knowledge area CS2023 | Informatika / ilmu komputer | 16 / 46 SKS (inti 42) |
| K | Pemrograman kompetitif (ICPC) sebagai lanjutan OSN dan sma-coding jalur A | Peminat kompetisi | 3 / 6 SKS |

## Daftar berkas

| Berkas | Isi |
| --- | --- |
| `README.md` | Dokumen ini: status, tujuan, berkas, pertanyaan pemilik, changelog. |
| `riset.md` | Sumber yang benar-benar dibuka pada 2026-11-19 (URL, tanggal akses, hasil), kutipan terverifikasi (Permendiktisaintek 39/2025, 17 knowledge area CS2023, aturan regional ICPC), dan yang belum terverifikasi (CPL nasional untuk coding, unit CS2023, aturan ICPC Indonesia, APTIKOM). |
| `silabus-draf.md` | Draf silabus v0.1: jalur U, I, K; 24 mata kuliah berkode `KUL-<jalur>-<nnn>` dengan SKS, semester, prasyarat, CPMK karangan; pemetaan; jembatan dari SMA dan ke dunia kerja; asesmen, integritas akademik, AI; bahasa dan alat; privasi; pertanyaan terbuka. |

## Pertanyaan untuk pemilik

Rincian opsi dan rekomendasi ada di `silabus-draf.md` bagian 9. Ringkasan
(rekomendasi di huruf tebal):

1. Pembagian jalur: **tiga jalur (U, I, K)** / dua jalur / satu jalur.
2. Bahasa pertama jalur I: **C++ dahulu (Python di jalur U)** / Python dahulu / Java.
3. Besar jalur I: **paket penuh 42 SKS inti sebagai draf** / 8 mata kuliah inti / hanya pemetaan.
4. Bentuk adopsi jalur U dan K: mata kuliah pilihan / paket lintas prodi / **keduanya**.
5. Kebijakan AI: **tiga tingkat hijau-kuning-merah** / larangan / bebas dengan pengungkapan.
6. Mata kuliah FPL dan statistik: **biarkan sebagai celah dahulu** / tambah.
7. Rujukan ICPC dan APTIKOM: **pemilik memberi tautan resmi**; sementara tanpa rujukan itu.
8. Lab dan cloud: **lab kampus dan BYOD** / cloud.
9. Hubungan ke dewasa-coding: **tautkan setelah program itu ada**.

## Cara menyetujui

Persetujuan lewat dialog pilihan pemilik (AGENTS.md, DL-043), dicatat dengan
tanggal di issue #130 dan di dokumen ini. Setelah itu mengikuti ADR-0006:
skema, lalu `data/kuliah-coding/`, entri registri, dan tes; tidak sebelumnya.

## Changelog

| Versi | Tanggal | Perubahan |
| --- | --- | --- |
| v0.1.0 | 2026-11-19 | Draf awal folder program (issue #130): README, riset, silabus draf. |
