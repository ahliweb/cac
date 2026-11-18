# Program Pembelajaran Coding SMA (`sma-coding`)

- **Version:** v0.1.0
- **Last updated:** 2026-11-18
- **Status:** DRAF

> **DRAF — belum disetujui pemilik.** Seluruh isi folder ini adalah konten
> **karangan** (*authored*) berstatus DRAF sesuai
> [ADR-0007](../../architecture/adr/0007-authored-learning-content.md). Ini
> bukan transkripsi sumber resmi, bukan dokumen pemerintah, dan belum boleh
> dipakai sebagai sumber data. Program ini belum terdaftar di registri
> program dan belum punya korpus di `data/` (ADR-0006).

## Tujuan program

Menyediakan silabus pembelajaran coding untuk SMA kelas X (Fase E) sampai
XI–XII (Fase F) yang berpijak pada Capaian Pembelajaran (CP) Informatika
Kurikulum Merdeka, dengan dua jalur:

| Jalur | Isi | Peran |
| --- | --- | --- |
| A | Algoritmik dengan C++ | Selaras dengan, dan menjadi jembatan ke, pembinaan OSN Informatika (rumpun materi di `data/topic-families.json`). |
| B | Pengembangan web dengan JavaScript + TypeScript, runtime Bun, dan template publik `ahliweb/awcms-one` (MIT) | Keterampilan membangun produk digital, berujung pada kustomisasi template. |

Keputusan pemilik tertanggal 2026-11-18 (issue #49 dan #51) mengikat
pilihan sumber, cakupan kelas, dan dua jalur di atas.

## Cara review

1. Baca [`silabus-draf.md`](silabus-draf.md) mulai dari bagian 1 (sumber
   resmi); tandai setiap butir `[belum terverifikasi]`.
2. Periksa tabel pemetaan CP (bagian 4) dan jembatan OSN (bagian 5).
3. Nilai analisis kelayakan `awcms-one` (bagian 6) dan jawab "Pertanyaan
   terbuka untuk pemilik" (bagian 9).
4. Catat keputusan (tanggal dan opsi terpilih) di issue #51. Persetujuan
   hanya sah bila dipilih pemilik; draf ini tidak pernah mencatat
   persetujuan atas nama pemilik.
5. Setelah disetujui, pengodean ke `data/` dikerjakan di issue terpisah
   (#52): skema lebih dulu, lalu data, domain, dan uji.

## Daftar berkas

| Berkas | Isi |
| --- | --- |
| `README.md` | Dokumen ini: tujuan, status, cara review, daftar berkas. |
| `silabus-draf.md` | Draf silabus v0.1.0: sumber resmi, struktur dan rencana mingguan kedua jalur, pemetaan CP, jembatan OSN, kelayakan `awcms-one`, asesmen, perangkat, privasi, rujukan, pertanyaan terbuka, changelog. |

## Changelog

| Versi | Tanggal | Perubahan |
| --- | --- | --- |
| v0.1.0 | 2026-11-18 | Draf awal folder program (issue #51). |
