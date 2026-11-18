# Program Pembelajaran Coding untuk Dewasa (`dewasa-coding`)

- **Version:** v0.1.0
- **Last updated:** 2026-11-19
- **Status:** DRAF — riset dan silabus draf (issue #131); belum disetujui pemilik. Belum ada `data/dewasa-coding/`, entri `data/programs.json`, maupun `content/dewasa-coding/` (ADR-0006: program berstatus draf tidak mendapat data atau entri registri).
- **Changeset:** `.changeset/draf-dewasa-coding.md` (patch): dokumen riset dan silabus draf coding dewasa (#131).

> Isi folder ini adalah konten **karangan** (*authored*) menurut
> [ADR-0007](../../architecture/adr/0007-authored-learning-content.md), bukan
> dokumen pemerintah dan bukan transkripsi. Persetujuan hanya oleh pemilik;
> agent tidak pernah mencatat persetujuan atas nama pemilik.

## Tujuan program

Menyediakan jalan belajar coding bagi orang dewasa, berbasis **modul dan
jam** (bukan semester sekolah), dengan empat jalur menurut persona:

| Jalur | Awalan kode | Persona | Fokus |
| --- | --- | --- | --- |
| Pekerja | `DW-PKJ-M<n>` | upskilling di pekerjaan saat ini | otomasi lembar kerja, skrip, data, AI untuk produktivitas |
| Profesional | `DW-PRO-M<n>` | alih karier atau menjadi pengembang | pemrograman, basis data, web; dipetakan ke SKKNI 282/2016 |
| Personal | `DW-PRS-M<n>` | pembelajar mandiri atau hobi | literasi komputasional, proyek pribadi |
| Pebisnis/UMKM | `DW-BIS-M<n>` | pemilik atau pengelola usaha kecil | situs usaha, toko daring, data penjualan, no-code/low-code, AI |

Modul bersama semua jalur: `DW-FND-M1` (keamanan, privasi, etika kerja
dengan kode dan AI). Jam per jalur seluruhnya `[asumsi]`.

## Daftar berkas

| Berkas | Isi |
| --- | --- |
| `README.md` | Dokumen ini: status, tujuan, daftar berkas, pertanyaan pemilik, changelog. |
| `riset.md` | Riset sumber bertanggal 2026-11-19: SKKNI 282/2016 (47 unit), skema sertifikasi LSP, program pelatihan pemerintah, kerangka kecakapan digital, kebutuhan UMKM, kajian alat (lisensi, biaya, akun); memisahkan yang dibuka dari yang tidak. |
| `silabus-draf.md` | Silabus draf v0.1: empat jalur dengan rencana modul berjam, pemetaan SKKNI untuk jalur profesional, jembatan, asesmen portofolio, opsi sertifikasi, privasi, opsi alat dengan rekomendasi, biaya, pertanyaan terbuka. |

## Pertanyaan terbuka bagi pemilik

Rincian opsi dan rekomendasi ada di bagian 12 `silabus-draf.md`. Ringkasan
(rekomendasi penyusun):

| No | Pertanyaan | Rekomendasi |
| --- | --- | --- |
| 12.1 | Satu program atau empat program terpisah | satu program `dewasa-coding` dengan empat jalur |
| 12.2 | Bentuk pelaksanaan | mandiri bermodul dengan pendampingan opsional |
| 12.3 | Bahasa inti jalur profesional | Python inti, JavaScript/TypeScript untuk web |
| 12.4 | Target skema dan pemetaan SKKNI | Junior Web Programmer sebagai acuan; verifikasi dengan LSP |
| 12.5 | Sertifikasi | tanpa sertifikasi bawaan; LSP opsional jalur mandiri |
| 12.6 | Program pelatihan pemerintah | hanya rujukan dengan catatan cek situs resmi |
| 12.7 | Jembatan dari kuliah-coding (#130) | tunda sampai drafnya ada |
| 12.8 | Urutan pengerjaan lanjutan | jalur pekerja dan pebisnis lebih dulu |

Tindak lanjut setelah persetujuan (skema, `data/dewasa-coding/`, entri
registri, modul `content/`) mengikuti urutan AGENTS.md dan bukan bagian dari
issue #131.

## Cara mengusulkan perubahan

Usulan lewat issue; revisi berstatus draf; persetujuan pemilik dicatat dengan
tanggal (ADR-0007).

## Changelog

| Versi | Tanggal | Perubahan |
| --- | --- | --- |
| v0.1.0 | 2026-11-19 | Draf awal folder program: `riset.md` dan `silabus-draf.md` (#131). |
