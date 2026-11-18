# Program Pembelajaran Coding Perguruan Tinggi (`kuliah-coding`)

- **Version:** v1.0.0
- **Last updated:** 2026-11-19
- **Status:** **DISETUJUI** pemilik program, 2026-11-19 (issue #130), beserta rekomendasi penyusun. Program **terdaftar** di `data/programs.json` (versi silabus 1.0.0) dan corpusnya ada di `data/kuliah-coding/` (ADR-0006, ADR-0008). Belum ada `content/kuliah-coding/` (modul pendamping).

> Isi folder ini adalah konten **karangan** (*authored*) menurut
> [ADR-0007](../../architecture/adr/0007-authored-learning-content.md), bukan
> dokumen pemerintah dan bukan materi resmi Puspresnas, IA TOKI, ACM, IEEE,
> atau penyelenggara ICPC. Persetujuan pemilik atas silabus tidak mengubah
> sifat karangan itu.

## Tujuan program

Menyediakan silabus pembelajaran coding untuk mahasiswa Indonesia, dalam
satuan SKS dan semester menurut Permendiktisaintek 39/2025, pada tiga jalur
(pembagian dijelaskan di `silabus.md` bagian 2.1):

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
| `silabus.md` | Silabus v1.0 (disetujui; sumber `data/kuliah-coding/`): jalur U, I, K; 24 mata kuliah berkode `KUL-<jalur>-<nnn>` dengan SKS, semester, prasyarat, CPMK karangan; pemetaan; jembatan dari SMA dan ke dunia kerja; asesmen, integritas akademik, AI; bahasa dan alat; privasi; keputusan pemilik atas pertanyaan terbuka. |

## Keputusan pemilik (2026-11-19)

Dijawab lewat dialog pilihan dan dicatat di issue #130; rinciannya ada di
`silabus.md` bagian 9. Draf disetujui beserta rekomendasi penyusun:

1. Pembagian jalur: **tiga jalur (U, I, K)**.
2. Bahasa pertama jalur I: **C++ dahulu** (Python di jalur U).
3. Besar jalur I: **paket penuh 42 SKS inti**; prodi dapat mengadopsi sebagian.
4. Bentuk adopsi jalur U dan K: **keduanya** (mata kuliah pilihan/umum dan paket lintas prodi).
5. Kebijakan AI: **tiga tingkat hijau-kuning-merah**.
6. Mata kuliah FPL dan statistik: **dibiarkan sebagai celah yang diakui**.
7. Rujukan ICPC dan APTIKOM: tautan resmi diminta dari pemilik; sementara tanpa rujukan itu. CPL tetap **kolom isian program studi pengadopsi**.
8. Lab dan cloud: **lab kampus dan BYOD**.
9. Hubungan ke dewasa-coding: **ditautkan setelah program itu ada**.

## Corpus

`data/kuliah-coding/` ditranskripsi setia dari `silabus.md`; skemanya
`src/schema/kul-*.ts`, auditnya `src/domain/kul-corpus-audit.ts`, dan
kesetiaannya diperiksa sel demi sel oleh `bun run check:fidelity --program
kuliah-coding` (`src/cli/fidelity/kuliah-coding.ts`). Perubahan isi silabus
memerlukan persetujuan pemilik baru.

## Changelog

| Versi | Tanggal | Perubahan |
| --- | --- | --- |
| v1.0.0 | 2026-11-19 | Disetujui pemilik (issue #130); `silabus-draf.md` menjadi `silabus.md`; program terdaftar dan di-encode ke `data/kuliah-coding/`. |
| v0.1.0 | 2026-11-19 | Draf awal folder program (issue #130): README, riset, silabus draf. |
