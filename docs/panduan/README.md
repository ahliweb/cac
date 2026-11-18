# Panduan penggunaan repositori

Panduan berbahasa Indonesia, berorientasi tugas ("saya ingin ... lalu
jalankan ..."), untuk memakai repositori `kurikulum-informatika`. Setiap
perintah di panduan ini sudah dijalankan pada repositori versi 2.3.0 dan
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

## Tujuh program

Tujuh program terdaftar di `data/programs.json` (ADR-0006); semuanya diperiksa
`osn validate`. Peta jenjang lengkap ada di
[`docs/programs/README.md`](../programs/README.md).

| Program (`--program`) | Isi | Sumber | Dukungan alat |
| --- | --- | --- | --- |
| `osn` | Pembinaan OSN Informatika 2026, 28 minggu, 10 rumpun materi, 7 gerbang (checkpoint). | PDF silabus v2.0 (4 September 2026) di `docs/`. Kebijakan AI: [`kebijakan-ai-osn.md`](../operations/kebijakan-ai-osn.md). | Penuh: `validate`, `plan`, `render`, `report`, `checklist`. |
| `sma-coding` | Coding SMA kelas X-XII: jalur A (C++), B (web JS/TS/Bun), C (IoT dan robotika), D (kecerdasan buatan dan analisis data), E (komputasi kuantum, kelas XI-XII). | `docs/programs/sma-coding/silabus.md` v1.3.0 (disetujui pemilik 2026-11-19; jalur D dan E di luar rumusan CP, pengayaan). Murid boleh memakai AI dengan etika (bagian 7.4). | `validate`, `check:fidelity`, `plan --track`, `render lembar-siswa --week <kode-minggu>` dan `render modul` (issue #77). `render weekly`, `render checkpoint` dan `render sop`, `report` dan `checklist` menolak dengan exit 2. |
| `tk-coding` | Berpikir komputasional TK A dan TK B, tanpa layar. | `docs/programs/tk-coding/silabus.md` v1.0.0. Tanpa alat AI generatif untuk murid. | `validate`, `check:fidelity`. |
| `sd-coding` | Coding SD kelas 1-6 (inti kelas 5-6, KKA Fase C). | `docs/programs/sd-coding/silabus.md` v1.0.0. Tanpa alat AI generatif untuk murid. | `validate`, `check:fidelity`. |
| `smp-coding` | Coding SMP kelas 7-9 (Fase D), 84 minggu. | `docs/programs/smp-coding/silabus.md` v1.1.0. Demonstrasi guru, tanpa akun murid (bagian 7.1). | `validate`, `check:fidelity`. |
| `kuliah-coding` | Coding perguruan tinggi dalam SKS: jalur U, I, K. | `docs/programs/kuliah-coding/silabus.md` v1.1.0. Kebijakan AI tiga tingkat (bagian 6.3-6.5). | `validate`, `check:fidelity`. |
| `dewasa-coding` | Coding untuk dewasa: jalur Pekerja, Profesional, Personal, Pebisnis/UMKM, berbasis modul dan jam. | `docs/programs/dewasa-coding/silabus.md` v1.1.0. Kebijakan AI peserta dewasa (bagian 9.1). | `validate`, `check:fidelity`. |

Untuk `tk-coding`, `sd-coding`, `smp-coding`, `kuliah-coding`, dan
`dewasa-coding`, `plan` dan `render lembar-siswa` menolak dengan exit 2 ("belum didukung
untuk program <id>"; pesannya menyebut bahwa kedua perintah itu hanya ada untuk
`osn` dan `sma-coding`, dan bahwa program itu hanya didukung `validate` dan
`check:fidelity`). `render modul` juga exit 2 karena kelima program itu belum
punya modul materi di `content/`.

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
| Program | Satu kurikulum yang terdaftar di `data/programs.json` (ADR-0006): `osn`, `sma-coding`, `tk-coding`, `sd-coding`, `smp-coding`, `kuliah-coding`, dan `dewasa-coding`. |
| Modul | Bahan belajar siswa (penjelasan, contoh, latihan) berbentuk Markdown di `content/<program>/modules/`, diindeks `data/<program>/modules.json`. Konten karangan, bukan transkripsi silabus (ADR-0007). |
| Draf (`draf`) | Status modul atau dokumen yang belum ditinjau manusia. Selalu ditandai spanduk `DRAF`. Status lain: `ditinjau`, `disetujui`, `ditarik`. |
| Disetujui (`disetujui`) | Hanya manusia (pemilik atau peninjau yang ia tunjuk) yang boleh menetapkannya, dengan tanggal dan peran peninjau. |
| Jalur | Lintasan belajar dalam program `sma-coding`: A (C++), B (web), C (IoT dan robotika), D (AI dan analisis data), E (komputasi kuantum, hanya kelas XI-XII). Jalur D dan E adalah pengayaan di luar CP. |
| Konten transkripsi | Data yang disalin setia dari sumber silabus. Tidak boleh "diperbaiki" maknanya. |
| Konten karangan | Modul dan draf silabus yang ditulis tim. Wajib ditinjau manusia sebelum disetujui. |

## Peta halaman lain yang berguna

- [`docs/operations/runbook.md`](../operations/runbook.md): siklus operasi kohort (Inggris).
- [`docs/governance/privacy.md`](../governance/privacy.md): kebijakan privasi.
- [`docs/programs/`](../programs/README.md): peta jenjang program coding (TK sampai dewasa) dan status tiap program; ketujuh program terdaftar dan disetujui pemilik.
- [`docs/programs/sma-coding/`](../programs/sma-coding/README.md): silabus SMA.
- [`docs/riset/ilmu-belajar-kognitif.md`](../riset/ilmu-belajar-kognitif.md): riset ilmu kognitif tentang cara belajar efektif, rujukan pedagogi semua program.
- [`docs/riset/ai-rekayasa-perangkat-lunak.md`](../riset/ai-rekayasa-perangkat-lunak.md): riset AI dalam rekayasa perangkat lunak, dasar kebijakan AI per program (issue #139).
- [`CONTRIBUTING.md`](../../CONTRIBUTING.md) dan [`AGENTS.md`](../../AGENTS.md): aturan kontribusi.
