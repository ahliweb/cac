# Program Pembelajaran Coding Perguruan Tinggi (`kuliah-coding`)

- **Version:** v1.1.0
- **Last updated:** 2026-11-19
- **Status:** **DISETUJUI** pemilik program: v1.0 pada 2026-11-19 (issue #130) beserta rekomendasi penyusun, revisi v1.1 (rekayasa perangkat lunak berbantuan AI) lewat keputusan pemilik 2026-11-19 (issue #139). Program **terdaftar** di `data/programs.json` (versi silabus 1.1.0) dan corpusnya ada di `data/kuliah-coding/` (ADR-0006, ADR-0008). Belum ada `content/kuliah-coding/` (modul pendamping).

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
| `silabus.md` | Silabus v1.1 (disetujui; sumber `data/kuliah-coding/`): jalur U, I, K; 24 mata kuliah berkode `KUL-<jalur>-<nnn>` dengan SKS, semester, prasyarat, CPMK karangan; pemetaan; jembatan dari SMA dan ke dunia kerja; asesmen, integritas akademik, AI; bahasa dan alat; privasi; keputusan pemilik atas pertanyaan terbuka dan atas revisi v1.1; kebijakan AI diperkuat (bagian 6.3 sampai 6.5). |

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

## Revisi v1.1: rekayasa perangkat lunak berbantuan AI (issue #139)

Keputusan pemilik 2026-11-19 atas usulan U-09 sampai U-12 pada
[`docs/riset/ai-rekayasa-perangkat-lunak.md`](../../riset/ai-rekayasa-perangkat-lunak.md)
(opsi rekomendasi), tanpa mengubah jumlah mata kuliah (24) maupun SKS (66,
inti 62):

| Mata kuliah | Perubahan |
| --- | --- |
| `KUL-U-202` | Pokok bahasan diperluas dalam 2 SKS: verifikasi dengan uji, non-determinisme, privasi, hak cipta (status hukum berkembang), energi sekilas; CPMK C5 baru. |
| `KUL-I-204` | Rekayasa perangkat lunak berbantuan AI 3-4 minggu (spesifikasi dan uji lebih dulu, tinjau kode hasil AI, CI dengan analis statis, SSDF dan SLSA, kebijakan AI tim dan log); CPMK C4 baru. |
| `KUL-I-401` | Kebijakan AI tim dan log, tinjauan manusia atas kode yang digabung; CPMK C4 baru. |
| `KUL-I-301` | Rantai pasok perangkat lunak dan paket fiktif; CPMK C4 baru. |
| `KUL-I-305` | Tata kelola AI, hak cipta dan lisensi keluaran AI, SE 9/2023; CPMK C3 baru. |
| `KUL-I-303` | Biaya komputasi dan energi sebagai butir singkat dengan ketidakpastian; CPMK C4 baru. |
| `KUL-K-201`, `KUL-K-301`, `KUL-K-401` | Merah saat kontes; setelah kontes AI untuk menjelaskan solusi dengan pengungkapan dan *re-solve* tanpa AI. |
| `KUL-U-101`, `KUL-I-101`, `KUL-I-102` | Ujian praktik tanpa AI dan wawancara kode singkat pada asesmen. |
| Kebijakan AI (bagian 6.3 dan 6.4) | Log pemakaian wajib pada Hijau, wawancara kode, gerbang kesiapan sebelum AI menulis kode, Merah untuk kontes jalur K; glosarium (bagian 6.5) memuat "vibe coding" dan "AI-native engineer" hanya sebagai istilah. |

Kebijakan AI ini khusus program `kuliah-coding` (keputusan pemilik: kebijakan
AI disusun per program).

## Corpus

`data/kuliah-coding/` ditranskripsi setia dari `silabus.md`; skemanya
`src/schema/kul-*.ts`, auditnya `src/domain/kul-corpus-audit.ts`, dan
kesetiaannya diperiksa sel demi sel oleh `bun run check:fidelity --program
kuliah-coding` (`src/cli/fidelity/kuliah-coding.ts`). Perubahan isi silabus
memerlukan persetujuan pemilik baru. Bentuk data tidak berubah pada v1.1 (skema
dan audit tetap); hanya isi sel dan versi (1.1.0).

## Changelog

| Versi | Tanggal | Perubahan |
| --- | --- | --- |
| v1.1.0 | 2026-11-19 | Rekayasa perangkat lunak berbantuan AI (issue #139): `KUL-U-202`, `KUL-I-204`, `KUL-I-401`, `KUL-I-301`, `KUL-I-305`, `KUL-I-303`, jalur K, kebijakan AI diperkuat, glosarium; SKS tidak berubah; corpus dan registri ke 1.1.0. |
| v1.0.0 | 2026-11-19 | Disetujui pemilik (issue #130); `silabus-draf.md` menjadi `silabus.md`; program terdaftar dan di-encode ke `data/kuliah-coding/`. |
| v0.1.0 | 2026-11-19 | Draf awal folder program (issue #130): README, riset, silabus draf. |
