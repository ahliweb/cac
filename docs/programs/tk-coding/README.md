# Program Pembelajaran Coding TK/PAUD (`tk-coding`)

- **Version:** v1.1.0
- **Last updated:** 2026-11-19
- **Status:** DISETUJUI pemilik program, 2026-11-19, beserta rekomendasi penyusun (silabus v1.0.2: revisi patch kalimat status, #165, dan revisi patch jembatan ke SD, keputusan pemilik #177). Terdaftar di `data/programs.json` dengan corpus `data/tk-coding/` (ADR-0006, ADR-0008). Modul belajar: 48 modul draf (satu per minggu) di `content/tk-coding/modules/`, 48 lembar anak di `content/tk-coding/lembar/`, 48 gambar SVG di `content/tk-coding/gambar/`, terindeks di `data/tk-coding/modules.json`; semuanya berstatus `draf` dan belum ditinjau pemilik (per 2026-11-19).

> Isi folder ini adalah konten **karangan** (*authored*) menurut
> [ADR-0007](../../architecture/adr/0007-authored-learning-content.md):
> riset dan silabus pembelajaran coding untuk anak TK/PAUD (usia sekitar
> 4-6 tahun), disusun atas permintaan pemilik (issue #127). Ini bukan dokumen
> pemerintah. Silabus v1.0.0 disetujui pemilik pada 2026-11-19 (keputusan lewat
> dialog pilihan, rekomendasi penyusun dipilih untuk semua pertanyaan), lalu
> di-encode menjadi `data/tk-coding/` dan didaftarkan sesuai
> [ADR-0006](../../architecture/adr/0006-multi-program-repository.md) dan
> [ADR-0008](../../architecture/adr/0008-skema-khusus-per-program.md).
> Repositori ini tidak memuat data anak
> ([ADR-0004](../../architecture/adr/0004-no-learner-personal-data.md)).

## Tujuan program

Merancang muatan **berpikir komputasional** untuk TK A dan TK B (istilah resmi
untuk PAUD) yang bermain, mayoritas tanpa layar, dan beririsan dengan Capaian
Pembelajaran Fase Fondasi (Kepka BSKAP 046/H/KR/2025). Dasar kebijakannya
Kepmendikdasmen 127/P/2025, yang menyebut "pembelajaran muatan pengembangan
berpikir komputasional pada pendidikan anak usia dini". Program ini menjadi
jembatan awal ke program SD (`sd-coding`, kini disetujui dan terdaftar, silabus v1.0.2).

Temuan utama riset: CP Fase Fondasi tidak menyebut koding secara eksplisit;
irisannya adalah pola, klasifikasi, pemecahan masalah sederhana, rekayasa, dan
pemakaian teknologi secara aman. Keputusan pemilik (silabus bagian 9): seluruh 48 minggu tanpa
perangkat, tanpa nilai angka, tanpa data anak di repositori.

## Daftar berkas

| Berkas | Isi |
| --- | --- |
| `README.md` | Dokumen ini: status, tujuan, daftar berkas, pertanyaan pemilik, changelog. |
| `riset.md` | Riset (v0.1.0): sumber resmi yang benar-benar dibuka beserta kutipan persis dan tanggal akses 2026-11-19, panduan waktu layar, pendekatan berpikir komputasional anak usia dini, risiko, dan sumber yang tidak dapat dibuka. |
| `rancangan-modul.md` | Rancangan modul belajar (DRAF, v0.1.0): pemetaan 48 minggu, templat berbasis bukti, gelombang penulisan, gerbang mutu. Rancangan dipakai untuk menulis modul yang kini ada di `content/tk-coding/`. |
| `rancangan-modul-contoh/` | Riwayat: modul pilot (`panduan-tk-a1-m1.md`, `lembar-tk-a1-m1.md`) sebelum modul sebenarnya ditulis; modul nyatanya `content/tk-coding/modules/tk-a1-m1.md` dan `content/tk-coding/lembar/tk-a1-m1.md`. |
| `silabus.md` | Silabus v1.0.2 (disetujui, sumber corpus `data/tk-coding/`): sumber dan kutipan resmi, prinsip, struktur waktu, rencana 48 minggu (`TK-A1-M1` sampai `TK-B2-M12`), pemetaan irisan ke CP (penafsiran, bukan pemenuhan CP), jembatan ke SD, asesmen observasi, peran orang tua, privasi, sarana, opsi alat dengan rekomendasi, keputusan pemilik. |

## Keputusan pemilik (2026-11-19)

Pemilik menyetujui rekomendasi penyusun pada semua pertanyaan; rinciannya ada
di [`silabus.md`](silabus.md) bagian 9.

| No. | Pertanyaan | Keputusan |
| --- | --- | --- |
| Q1 | Penggunaan layar | Seluruh rencana tanpa layar. |
| Q2 | Durasi dan frekuensi | Satu sesi per minggu: TK A 20 menit, TK B 30 menit, plus integrasi harian opsional. |
| Q3 | Cakupan usia | TK A dan TK B. |
| Q4 | Pembagian semester | 12 minggu per semester. |
| Q5 | Penamaan program | Id `tk-coding`, isi memakai istilah resmi "berpikir komputasional". |
| Q6 | Alat opsional | Tidak memakai alat berbayar. |
| Q7 | Bahan CS Unplugged (CC BY-SA 4.0) | Hanya rujukan ide. |
| Q8 | Jembatan ke `sd-coding` | Menunggu silabus `sd-coding` terbit. |
| Q9 | Persetujuan dan registrasi | Disetujui; `data/tk-coding/` dan entri registri dibuat. |

## Modul belajar

Status per 2026-11-19, dihitung dari repositori:

| Bagian | Jumlah | Lokasi |
| --- | --- | --- |
| Modul panduan guru | 48 (`tk-a1-m1` sampai `tk-b2-m12`) | `content/tk-coding/modules/<id>.md` |
| Lembar anak | 48 | `content/tk-coding/lembar/<id>.md` |
| Gambar SVG lembar | 48 | `content/tk-coding/gambar/` |
| Indeks | 48 entri, semuanya `draf` | `data/tk-coding/modules.json` (skema `src/schema/tk-module.ts`) |

Semua modul berstatus `draf` dan belum ditinjau pemilik; tinjauan modul
dilacak di issue #125 dan butir yang perlu dicek peninjau dikumpulkan di
[`../catatan-tinjauan-modul.md`](../catatan-tinjauan-modul.md). Modul
mengikuti [`rancangan-modul.md`](rancangan-modul.md). Perintah:
`bun run check:learner-assets` (SVG dan tautan gambar lembar) dan
`osn render modul --program tk-coding --id <id> --lembar` (lembar anak).

## Cara mengusulkan perubahan

Usulan lewat issue, revisi berstatus draf, lalu persetujuan pemilik yang
dicatat dengan tanggal (ADR-0007). Perubahan isi `silabus.md` harus diikuti
`data/tk-coding/`; `bun run check:fidelity --program tk-coding` membandingkan
keduanya sel demi sel.

## Changelog

| Versi | Tanggal | Perubahan |
| --- | --- | --- |
| v0.1.0 | 2026-11-19 | Draf awal folder program (issue #127): README, riset, dan silabus draf. |
| v1.0.0 | 2026-11-19 | Silabus disetujui pemilik beserta rekomendasi penyusun; `silabus-draf.md` menjadi `silabus.md`; program di-encode ke `data/tk-coding/` dan didaftarkan (issue #127). |
| v1.0.1 | 2026-11-19 | Kalimat status `sd-coding` di bagian tujuan diperbarui (kini disetujui dan terdaftar); isi program tidak diubah. |
| v1.0.2 | 2026-11-19 | Silabus direvisi patch ke v1.0.1 (issue #165): kalimat status yang basi tentang program pasangannya diperbaiki; isi kurikulum dan corpus tidak berubah. |
| v1.0.3 | 2026-11-19 | Silabus direvisi patch ke v1.0.2 atas keputusan pemilik #177: bagian 5 (jembatan ke SD) diselaraskan dengan silabus `sd-coding` (rujukan `TK-B2-M1` dikoreksi, kode minggu SD, kosakata dan simbol disamakan, jalur padat); isi kurikulum TK tidak berubah. |
| v1.1.0 | 2026-11-19 | Sinkron dokumen (#124): status modul belajar (48 modul draf, 48 lembar, 48 gambar SVG, indeks `modules.json`), `rancangan-modul.md` dan pilot masuk daftar berkas; isi silabus dan corpus tidak berubah. |
