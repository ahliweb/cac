# Panduan penggunaan repositori

Panduan berbahasa Indonesia, berorientasi tugas ("saya ingin ... lalu
jalankan ..."), untuk memakai repositori `kurikulum-informatika`. Setiap
perintah di panduan ini sudah dijalankan pada repositori versi 2.2.0 dan
contoh keluarannya diambil dari keluaran nyata (kadang dipotong dengan `...`).
Referensi lengkap per perintah ada di [`docs/cli/README.md`](../cli/README.md)
(berbahasa Inggris).

## Repositori ini apa, dan bukan apa

Repositori ini menyimpan **kurikulum sebagai kode**: silabus yang dibuat
terstruktur, divalidasi, dan diberi versi, ditambah alat baris perintah
(`osn`) untuk menyusun bahan ajar darinya.

Yang **bukan** repositori ini:

- **Bukan LMS.** Tidak menyampaikan pelajaran, tidak mencatat pendaftaran,
  tidak mengelola kelas.
- **Bukan judge.** Tidak mengompilasi, menjalankan, atau menilai kode yang
  dikirim siswa.
- **Bukan penyimpan data siswa.** Tidak ada data pribadi siswa di sini, dan
  tidak boleh ada (ADR-0004). Contoh data bersifat sintetis.

Dokumen ini independen dan bukan dokumen resmi Puspresnas, IA TOKI, atau IOI.

## Dua program

| Program (`--program`) | Isi | Sumber | Dukungan alat |
| --- | --- | --- | --- |
| `osn` | Pembinaan OSN Informatika 2026, 28 minggu, 10 rumpun materi, 7 gerbang (checkpoint). | PDF silabus v2.0 (4 September 2026) di `docs/`. | Penuh: `validate`, `plan`, `render`, `report`, `checklist`. |
| `sma-coding` | Coding SMA kelas X-XII: jalur A (C++) dan jalur B (web JS/TS/Bun). | `docs/programs/sma-coding/silabus.md` v1.1, disetujui pemilik program 2026-11-19 (v1.0: 2026-11-18). | `validate`, `plan --track`, `render lembar-siswa --week <kode-minggu>` dan `render modul` (issue #77). `render weekly`, `render checkpoint` and `render sop`, `report` dan `checklist` menolak dengan exit 2. |

## Anda siapa? Baca halaman ini

| Anda | Tugas utama | Halaman |
| --- | --- | --- |
| Siapa saja yang baru mulai | Memasang alat dan menjalankan pemeriksaan pertama. | [`mulai-cepat.md`](mulai-cepat.md) |
| Mentor pembinaan OSN | Kalender kohort, rencana sesi, lembar checkpoint, laporan KPI. | [`mentor-osn.md`](mentor-osn.md) |
| Guru SMA (program `sma-coding`) | Membaca silabus, mencari minggu tertentu, menyiapkan lab. | [`guru-sma.md`](guru-sma.md) |
| Siswa | Memakai lembar belajar dan modul materi. | [`siswa.md`](siswa.md) |
| Pemilik program atau peninjau | Meninjau modul draf, mencatat keputusan, merilis. | [`pemilik-peninjau.md`](pemilik-peninjau.md) |
| Kontributor (manusia atau agent AI) | Mengubah repositori lewat issue dan PR. | [`kontributor.md`](kontributor.md) |

## Istilah penting

| Istilah | Arti |
| --- | --- |
| Corpus | Kumpulan berkas JSON data kurikulum satu program di `data/<program>/`. Divalidasi skema; `osn validate` memeriksanya. |
| Program | Satu kurikulum yang terdaftar di `data/programs.json` (ADR-0006): `osn` dan `sma-coding`. |
| Modul | Bahan belajar siswa (penjelasan, contoh, latihan) berbentuk Markdown di `content/<program>/modules/`, diindeks `data/<program>/modules.json`. Konten karangan, bukan transkripsi silabus (ADR-0007). |
| Draf (`draf`) | Status modul atau dokumen yang belum ditinjau manusia. Selalu ditandai spanduk `DRAF`. Status lain: `ditinjau`, `disetujui`, `ditarik`. |
| Disetujui (`disetujui`) | Hanya manusia (pemilik atau peninjau yang ia tunjuk) yang boleh menetapkannya, dengan tanggal dan peran peninjau. |
| Jalur | Lintasan belajar dalam program `sma-coding`: A (C++), B (web). Jalur C, D, E masih usulan. |
| Konten transkripsi | Data yang disalin setia dari sumber silabus. Tidak boleh "diperbaiki" maknanya. |
| Konten karangan | Modul dan draf silabus yang ditulis tim. Wajib ditinjau manusia sebelum disetujui. |

## Peta halaman lain yang berguna

- [`docs/operations/runbook.md`](../operations/runbook.md): siklus operasi kohort (Inggris).
- [`docs/governance/privacy.md`](../governance/privacy.md): kebijakan privasi.
- [`docs/programs/sma-coding/`](../programs/sma-coding/README.md): silabus SMA.
- [`CONTRIBUTING.md`](../../CONTRIBUTING.md) dan [`AGENTS.md`](../../AGENTS.md): aturan kontribusi.
