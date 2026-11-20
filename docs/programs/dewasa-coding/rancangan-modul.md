# Rancangan Modul Belajar `dewasa-coding` (36 modul)

- **Version:** v0.1.2
- **Last updated:** 2026-11-20
- **Status:** Rancangan **DISETUJUI pemilik 2026-11-19** lewat dialog keputusan (opsi "Setujui semua rekomendasi"). Persetujuan ini untuk rancangan, bukan modul. Modulnya **sudah ditulis** per 2026-11-19: 36 modul di `content/dewasa-coding/modules/`, terindeks di `data/dewasa-coding/modules.json`; semuanya berstatus `draf`.
- **Changeset:** v0.1.0: dokumen pertama (rancangan modul belajar `dewasa-coding`, satu modul per modul silabus, 36 modul: 35 modul jalur ditambah `DW-FND-M1`), bersama pilot `dw-fnd-m1`.

> **Catatan status (2026-11-20, #125).** Pernyataan "berstatus `draf`" atau "modul draf" di dokumen ini adalah keadaan saat rancangan ditulis. Pada 2026-11-20 pemilik program memilih "Setujui semua, catatan jadi tindak lanjut" lewat dialog pilihan baku, sehingga seluruh 753 modul enam program coding berstatus `disetujui` di `data/<id>/modules.json` (bukan hasil tinjauan isi per modul; butir [`catatan-tinjauan-modul.md`](../catatan-tinjauan-modul.md) menjadi tindak lanjut revisi). Pernyataan status modul di bawah, termasuk aturan "modul baru berstatus `draf`", adalah riwayat atau aturan untuk modul baru.

> **Catatan status (2026-11-19, sinkron dokumen #124).** Frasa "belum satu pun modul ditulis" dan "belum ada `modules.json`" di bawah adalah riwayat: 36 modul ada di `content/dewasa-coding/modules/` (`dw-fnd` 1, `dw-pkj` 8, `dw-pro` 13, `dw-prs` 6, `dw-bis` 8) dan terindeks di `data/dewasa-coding/modules.json` (skema `src/schema/dw-learning-module.ts`), semua `draf`, belum ditinjau. Pilot `rancangan-modul-contoh/` kini riwayat; modul nyatanya `content/dewasa-coding/modules/dw-fnd-m1.md`. Aturan "agen tidak menyunting `modules.json`" adalah aturan masa penulisan. Judul `#` dan bagian `## Rujukan` tidak lagi ada di tubuh modul (judul dan rujukan dirender dari indeks); judul ganda kini galat di `bun run check:learner-assets`.
> Keputusan dan kontrak yang disetujui pemilik di dokumen ini tidak berubah; yang diperbarui hanya klausa status yang basi.

> Isi dokumen ini adalah konten **karangan** (*authored*) menurut
> [ADR-0007](../../architecture/adr/0007-authored-learning-content.md), bukan
> transkripsi silabus dan bukan nasihat hukum. Agent tidak pernah mencatat
> persetujuan atas nama pemilik; semua keputusan di bagian 8 menunggu dialog
> pilihan pemilik. Modul yang kelak ditulis berstatus `draf` sampai pemilik
> atau peninjau yang ditunjuknya menyetujui, per modul.

## 0. Cara membaca dokumen ini

| Tanda | Arti |
| --- | --- |
| `K` | Unsur didukung bukti kuat untuk prinsipnya (riset ilmu belajar bagian 8: `[A]` atau `[B]`). Untuk **pemrograman** bukti langsungnya sering terbatas; batas itu ditulis di kolom dasar. |
| `M` | Masuk akal tetapi bukti terbatas untuk pemrograman atau untuk dewasa (`[inferensi]`). |
| `[asumsi]` | Keputusan perancangan penyusun, bukan data resmi. |
| `[belum terverifikasi]` | Tidak dapat dipastikan dari sumber yang dibuka penyusun pada 2026-11-19. |
| Rujukan `riset X.Y` | Bagian X.Y dari [`ilmu-belajar-kognitif.md`](../../riset/ilmu-belajar-kognitif.md); `AI X.Y` berarti [`ai-rekayasa-perangkat-lunak.md`](../../riset/ai-rekayasa-perangkat-lunak.md). |

## 1. Tujuan dan batas

Keputusan pemilik 2026-11-19: modul belajar `dewasa-coding` **lengkap**, satu
modul per modul silabus: **36 modul** (35 modul jalur: `PKJ` 8, `PRO` 13, `PRS`
6, `BIS` 8; ditambah modul bersama `DW-FND-M1`), pembaca peserta dewasa.

Batas:

- Tidak mengubah `content/`, `data/`, `src/`, `silabus.md`, `riset.md`, `README`
  program, atau `docs/panduan/`. Skema indeks khusus program dibuat pelaksana
  lain; dokumen ini hanya memegang kontraknya (bagian 2).
- Modul **bukan jaminan kompetensi** dan **bukan nasihat hukum, pajak, atau
  sertifikasi**. Pemetaan SKKNI hanya sampai **judul unit** dan salinan daftar
  unit belum terverifikasi terhadap berkas resmi; modul tidak boleh menjanjikan
  kelulusan uji kompetensi (silabus 12.4).
- Tidak memakai andragogi (teori Knowles) sebagai dasar klaim: bukti
  empirisnya tidak diuji di riset (riset 7). Dasar yang dipakai adalah
  prinsip umum (riset 3) dan efek keahlian terbalik.
- Tidak menyimpan data peserta (ADR-0004); semua latihan memakai data
  sintetis.

## 2. Kontrak indeks modul (dari pelaksana skema)

| Bidang | Aturan untuk 36 modul |
| --- | --- |
| `id` | Kode modul huruf kecil: `dw-fnd-m1`, `dw-pkj-m1`, `dw-pro-m13`, dst., cocok dengan `data/dewasa-coding/shared.json` dan `module-plan.json`. Perhatikan: urutan belajar `dw-pro-m13` berada **sesudah** `dw-pro-m5`, sebelum `dw-pro-m6`. |
| `skkniUnits` | **Hanya** unit yang dipetakan di silabus bagian 5.2 untuk modul itu, **sebatas judul** (kode unit boleh dicantumkan; elemen kompetensi dan kriteria unjuk kerja tidak). Hanya 13 modul `PRO` yang memetakan; modul jalur lain dan `dw-fnd-m1` punya `skkniUnits` kosong. Total 34 unit disentuh; 13 unit tidak tersentuh (`uncoveredUnitCodes`) dan **tidak** boleh diklaim modul mana pun. |
| Berkas isi | `content/dewasa-coding/modules/<id>.md`. |
| Status | `draf`. Hanya manusia yang menetapkan `disetujui`. |
| Pembaca | Peserta dewasa (kata ganti "Anda"); panduan untuk pendamping di ujung. |
| Pemilik indeks | Orchestrator mengisi `modules.json` setelah modul ditinjau. |

## 3. Pemetaan: 36 modul

Disalin dari `data/dewasa-coding/shared.json`, `module-plan.json`, dan tabel
silabus bagian 5.2 (judul unit dari `skkni-units.json`, tanda
`salinan-belum-terverifikasi`). Prasyarat adalah rantai di silabus (tiap modul
jalur bergantung pada modul sebelumnya di jalur itu; modul pertama tiap jalur
bergantung pada `dw-fnd-m1`; `dw-pro-m6` bergantung pada `dw-pro-m13`).

| id | Kode | Judul modul | Jalur, jam | Unit SKKNI 282/2016 (judul unit) | Prasyarat |
| --- | --- | --- | --- | --- | --- |
| `dw-fnd-m1` | DW-FND-M1 | Keamanan, privasi, dan etika kerja dengan kode dan AI | FND, 8 jam | (tidak dipetakan) | (tidak ada) |
| `dw-pkj-m1` | DW-PKJ-M1 | Memetakan pekerjaan berulang | PKJ, 5 jam | (tidak dipetakan) | `dw-fnd-m1` |
| `dw-pkj-m2` | DW-PKJ-M2 | Rumus dan pembersihan data lembar kerja | PKJ, 5 jam | (tidak dipetakan) | `dw-pkj-m1` |
| `dw-pkj-m3` | DW-PKJ-M3 | Pengantar Python untuk data lembar kerja | PKJ, 5 jam | (tidak dipetakan) | `dw-pkj-m2` |
| `dw-pkj-m4` | DW-PKJ-M4 | Mengolah dan menggabungkan data | PKJ, 5 jam | (tidak dipetakan) | `dw-pkj-m3` |
| `dw-pkj-m5` | DW-PKJ-M5 | Otomasi berkas dan laporan | PKJ, 5 jam | (tidak dipetakan) | `dw-pkj-m4` |
| `dw-pkj-m6` | DW-PKJ-M6 | AI untuk produktivitas kerja | PKJ, 5 jam | (tidak dipetakan) | `dw-pkj-m5` |
| `dw-pkj-m7` | DW-PKJ-M7 | Visualisasi dan penyajian | PKJ, 5 jam | (tidak dipetakan) | `dw-pkj-m6` |
| `dw-pkj-m8` | DW-PKJ-M8 | Proyek akhir | PKJ, 5 jam | (tidak dipetakan) | `dw-pkj-m7` |
| `dw-pro-m1` | DW-PRO-M1 | Lingkungan kerja pengembang dan Git | PRO, 10 jam | Melakukan Instalasi Software Tools Pemrograman (`J.620100.011.01`); Melakukan Pengaturan Software Tools Pemrograman (`J.620100.012.01`); Menggunakan Source Code Versioning (`J.620100.026.01`) | `dw-fnd-m1` |
| `dw-pro-m2` | DW-PRO-M2 | Dasar pemrograman terstruktur | PRO, 10 jam | Menerapkan Pemecahan Permasalahan Menjadi Subrutin (`J.620100.013.01`); Mengimplementasikan Pemrograman Terstruktur (`J.620100.017.02`); Menerapkan Perintah Eksekusi Bahasa Pemrograman Berbasis Teks, Grafik, dan Multimedia (`J.620100.010.01`) | `dw-pro-m1` |
| `dw-pro-m3` | DW-PRO-M3 | Struktur data dan algoritma dasar | PRO, 10 jam | Menggunakan Struktur Data (`J.620100.004.02`); Mengimplementasikan Algoritma Pemrograman (`J.620100.022.02`) | `dw-pro-m2` |
| `dw-pro-m4` | DW-PRO-M4 | Fungsi, modul, dan kode yang rapi | PRO, 10 jam | Menerapkan Metode dan Praktik Penggunaan Kembali (Reusable) Subrutin-Subrutin (`J.620100.014.01`); Menyusun Fungsi, File atau Sumber Daya Pemrograman yang Lain dalam Organisasi yang Rapi (`J.620100.015.01`); Menulis Kode dengan Prinsip Sesuai Guidelines dan Best Practices (`J.620100.016.01`); Membuat Dokumen Kode Program (`J.620100.023.02`) | `dw-pro-m3` |
| `dw-pro-m5` | DW-PRO-M5 | Debugging dan pengujian unit | PRO, 10 jam | Melakukan Debugging (`J.620100.025.02`); Melaksanakan Pengujian Unit Program (`J.620100.033.02`) | `dw-pro-m4` |
| `dw-pro-m13` | DW-PRO-M13 | Rekayasa perangkat lunak berbantuan AI | PRO, 8 jam | Menggunakan Spesifikasi Program (`J.620100.009.01`); Melaksanakan Pengujian Unit Program (`J.620100.033.02`); Menerapkan Code Review (`J.620100.032.01`); Melaksanakan Pengujian Kode Program Secara Statis (`J.620100.036.02`); Menggunakan Library atau Komponen Pre-Existing (`J.620100.019.02`) | `dw-pro-m5` |
| `dw-pro-m6` | DW-PRO-M6 | Pemrograman berorientasi objek dan pustaka | PRO, 10 jam | Mengimplementasikan Pemrograman Berorientasi Objek (`J.620100.018.02`); Menggunakan Library atau Komponen Pre-Existing (`J.620100.019.02`); Melakukan Identifikasi Library, Komponen atau Framework yang Diperlukan (`J.620100.003.01`) | `dw-pro-m13` |
| `dw-pro-m7` | DW-PRO-M7 | SQL dan akses basis data | PRO, 10 jam | Menggunakan SQL (`J.620100.020.02`); Menerapkan Akses Basis Data (`J.620100.021.02`); Mengimplementasikan Rancangan Entitas dan Keterkaitan Antar Entitas (`J.620100.007.01`) | `dw-pro-m6` |
| `dw-pro-m8` | DW-PRO-M8 | Antarmuka web: HTML, CSS, JavaScript/TypeScript | PRO, 10 jam | Mengimplementasikan User Interface (`J.620100.005.02`); Merancang User Experience (`J.620100.006.01`) | `dw-pro-m7` |
| `dw-pro-m9` | DW-PRO-M9 | Layanan web dan API | PRO, 10 jam | Mengimplementasikan Network Programming (`J.620100.027.01`); Menggunakan Library atau Komponen Pre-Existing (`J.620100.019.02`) | `dw-pro-m8` |
| `dw-pro-m10` | DW-PRO-M10 | Kolaborasi: tinjau kode dan pengujian lanjut | PRO, 10 jam | Menerapkan Code Review (`J.620100.032.01`); Melaksanakan Pengujian Integrasi Program (`J.620100.034.02`); Melaksanakan Pengujian Kode Program Secara Statis (`J.620100.036.02`) | `dw-pro-m9` |
| `dw-pro-m11` | DW-PRO-M11 | Konfigurasi, pencatatan, dan operasi dasar | PRO, 10 jam | Melaksanakan Konfigurasi Perangkat Lunak Sesuai Environment (Development, Staging, Production) (`J.620100.042.01`); Melakukan Logging Aplikasi (`J.620100.046.01`); Menerapkan Alert Notification Jika Aplikasi Bermasalah (`J.620100.044.01`); Melakukan Pembaruan Perangkat Lunak (`J.620100.047.01`) | `dw-pro-m10` |
| `dw-pro-m12` | DW-PRO-M12 | Proyek akhir dan persiapan portofolio | PRO, 10 jam | Menggunakan Spesifikasi Program (`J.620100.009.01`); Melaksanakan Pengujian Oleh Pengguna (UAT) (`J.620100.038.01`); Memberikan Petunjuk Teknis Kepada Pelanggan (`J.620100.039.02`); Merancang Arsitektur Aplikasi (`J.620100.008.01`) | `dw-pro-m11` |
| `dw-prs-m1` | DW-PRS-M1 | Berpikir komputasional tanpa kode | PRS, 5 jam | (tidak dipetakan) | `dw-fnd-m1` |
| `dw-prs-m2` | DW-PRS-M2 | Program pertama dengan Python | PRS, 5 jam | (tidak dipetakan) | `dw-prs-m1` |
| `dw-prs-m3` | DW-PRS-M3 | Data dan berkas | PRS, 5 jam | (tidak dipetakan) | `dw-prs-m2` |
| `dw-prs-m4` | DW-PRS-M4 | Halaman web pertama | PRS, 5 jam | (tidak dipetakan) | `dw-prs-m3` |
| `dw-prs-m5` | DW-PRS-M5 | Mengotomasi urusan sehari-hari | PRS, 5 jam | (tidak dipetakan) | `dw-prs-m4` |
| `dw-prs-m6` | DW-PRS-M6 | Proyek mandiri dan jalan lanjut | PRS, 5 jam | (tidak dipetakan) | `dw-prs-m5` |
| `dw-bis-m1` | DW-BIS-M1 | Peta digital usaha | BIS, 6 jam | (tidak dipetakan) | `dw-fnd-m1` |
| `dw-bis-m2` | DW-BIS-M2 | Pencatatan penjualan di lembar kerja | BIS, 6 jam | (tidak dipetakan) | `dw-bis-m1` |
| `dw-bis-m3` | DW-BIS-M3 | Membaca data penjualan | BIS, 6 jam | (tidak dipetakan) | `dw-bis-m2` |
| `dw-bis-m4` | DW-BIS-M4 | Situs usaha | BIS, 6 jam | (tidak dipetakan) | `dw-bis-m3` |
| `dw-bis-m5` | DW-BIS-M5 | Toko daring dan pembayaran digital (konsep) | BIS, 6 jam | (tidak dipetakan) | `dw-bis-m4` |
| `dw-bis-m6` | DW-BIS-M6 | Otomasi no-code/low-code | BIS, 6 jam | (tidak dipetakan) | `dw-bis-m5` |
| `dw-bis-m7` | DW-BIS-M7 | AI untuk usaha | BIS, 6 jam | (tidak dipetakan) | `dw-bis-m6` |
| `dw-bis-m8` | DW-BIS-M8 | Proyek akhir: rencana digital usaha | BIS, 6 jam | (tidak dipetakan) | `dw-bis-m7` |

Ringkasan jam: `FND` 8; `PKJ` 8 x 5 = 40 (total jalur 48 dengan `FND`); `PRO`
12 x 10 + 8 = 128 (136); `PRS` 6 x 5 = 30; `BIS` 8 x 6 = 48. Jam di tabel
adalah estimasi silabus `[asumsi]`; modul tidak mengubahnya.

### 3.1 Keluaran portofolio dan proyek per jalur

| Jalur | Keluaran akhir (silabus) | Proyek sintetis |
| --- | --- | --- |
| `PKJ` | Portofolio: satu alur kerja kantor sintetis yang diotomasi, dengan dokumentasi (`dw-pkj-m8`); tiap modul `m1` sampai `m7` punya keluaran portofolio sendiri | Rekap absensi dan lembur, rekap faktur bulanan, atau daftar tugas tim; data dibangkitkan skrip dengan benih acak yang dicatat |
| `PRO` | Repositori kode lengkap, pengujian, petunjuk teknis (`dw-pro-m12`) | Aplikasi inventaris kecil (Python, SQL, antarmuka web) atau API laporan penjualan sintetis |
| `PRS` | Proyek mandiri dan jalan lanjut (`dw-prs-m6`) | Pilihan peserta, tanpa data nyata |
| `BIS` | Rencana digital usaha dan prototipe (`dw-bis-m8`) | Usaha rekaan dengan data penjualan sintetis |

## 4. Templat modul berbasis bukti

Judul bagian **persis begini dan urutan ini**; judul `Untuk siapa modul ini`,
`Latihan`, `Kesalahan umum`, `Cek mandiri`, `Kunci dan petunjuk`, dan
`Langkah berikutnya` sudah dipakai seri `sma-coding`.

| # | Judul bagian | Isi | Label | Dasar dan batasnya |
| --- | --- | --- | --- | --- |
| 0 | `# ...` dan spanduk | Judul = judul modul di corpus; spanduk "DRAF — belum ditinjau". | (aturan) | ADR-0007. |
| 1 | `## Untuk siapa modul ini` | Jalur, jam, prasyarat, alat, estimasi sesi, peringatan data sintetis. | `M` | Orientasi. |
| 2 | `## Cek awal pengalaman` | Lima soal pendek tanpa melihat apa pun, kunci di akhir; bila semua benar peserta boleh melompati "Contoh terselesaikan" dan "Contoh setengah jadi". Tidak ada nilai yang disimpan. | `K` untuk prinsip efek keahlian terbalik; `M` untuk bentuknya | Kalyuga dkk. (2003) `[D]`: teknik pemula dapat merugikan yang berpengalaman (riset 3.4, 7); keyakinan tidak sama dengan kinerja (riset 3.1 dan 3.9, `[A]`/`[C]`), sehingga pengakuan pengalaman diuji, bukan dipercaya. |
| 3 | `## Ingat kembali` | Tiga sampai lima soal tanpa catatan dari modul sebelumnya, modul beberapa langkah lalu, dan satu modul awal jalur; jarak bertambah. Modul pertama jalur memakai kebiasaan peserta. | `K` prinsip; `M` untuk pemrograman | Riset 3.1 dan 3.2 (`[A]`; bukti langsung efek uji pada keterampilan pemrograman belum dibuka). |
| 4 | `## Tujuan` | Hasil belajar dari corpus (kutipan persis). | (aturan) | Corpus; tidak mengubah. |
| 5 | `## Prediksi dulu` | Tulis prediksi hasil kode, rumus, atau keputusan **sebelum** menjalankan atau membaca jawaban; modul konseptual: prediksi keputusan dalam kasus rekaan. | `K` (penelusuran); `M` PRIMM pada dewasa | Lister dkk. (2004), Sorva (2013), riset 6.2; PRIMM diuji usia 11 sampai 14, bukan dewasa (riset 6.3). |
| 6 | `## Contoh terselesaikan` | Contoh lengkap dengan alasan; **dipersingkat** bagi peserta berpengalaman (lihat bagian 2 tabel ini). | `K` pemula | Riset 3.4 (`[B]`; bukti terkuat aljabar dan geometri). |
| 7 | `## Contoh setengah jadi` | *Fading*: bagian dikosongkan atau diganti "baca dan sempurnakan kode ini". Parsons bila relevan sebagai sub-judul `### Susun urutannya`. | `M` | Riset 3.4, 6.3 (Ericson dkk., 2017: efisien, belajar sama). |
| 8 | `## Latihan` | Tiga sampai lima tugas bertingkat: **Ubah**, **Buat**, **Jelaskan**; satu tugas berpasangan **opsional** (peserta mandiri boleh melewatinya). Data sintetis. | `M` (bimbingan `K`) | Bimbingan lebih baik daripada penemuan tanpa bantuan (Alfieri dkk., 2011, `[A]`; riset 3.5); berpasangan paling teruji pada mahasiswa (Hanks dkk., 2011; riset 6.4, 7). |
| 9 | `## Latihan bercampur` | Dua soal yang mencampur topik modul ini dengan modul sebelumnya; **tidak** untuk perkenalan pertama konsep. | `K` prinsip (sedang, bergantung materi) | Brunmair dan Richter (2019) (riset 3.3). |
| 10 | `## Keluaran portofolio` (hanya bila corpus menyebutnya) | Apa yang disimpan peserta sebagai bukti kerja (mis. skrip, lembar kerja bersih), dengan data sintetis. | `M` | Asesmen berbasis portofolio, silabus 8.1 (`[asumsi]`). |
| 11 | `## Ulang berjarak` | Tes mengingat berjarak: tulis ulang atau kerjakan ulang tanpa melihat; satu minggu, awal modul ke-4 berikutnya, akhir jalur. | `K` | Cepeda dkk. (2006, 2008) (riset 3.2, 8.4 baris dewasa). |
| 12 | `## Kebijakan AI` | Kebijakan dewasa silabus 9.1: data sintetis, kredensial, verifikasi (draf, bukan jawaban), lisensi dan hak cipta keluaran AI (status hukum belum pasti), instruksi tersembunyi, energi dan biaya sekilas, gerbang kesiapan (`PRO`: sesudah `dw-pro-m5`). Hanya modul yang menyebut AI (`dw-pkj-m6`, `dw-pro-m13`, `dw-bis-m7`, `dw-fnd-m1`) memuat bagian penuh; modul lain satu kalimat tautan. | `M` | Silabus 9.1 (keputusan pemilik 2026-11-19); AI 4.5, 5, 6; bukti awal, bukan Indonesia. |
| 13 | `## Kesalahan umum` | Tiga sampai lima kekeliruan tipikal dan cara mengenalinya. | `M` | Riset 6.1 (miskonsepsi pemula). |
| 14 | `## Cek mandiri` | Soal mengingat dijawab sebelum melihat kunci; daftar periksa kosong, tidak dikumpulkan. | `K` | Roediger dan Karpicke (2006), Adesope dkk. (2017) (riset 3.1); riset 3.9. |
| 15 | `## Kunci dan petunjuk` | Kunci cek awal, prediksi, dan latihan terpilih; petunjuk bertahap. | `K` | Alfieri dkk. (2011); riset 3.5, 3.8. |
| 16 | `## Langkah berikutnya` | Modul berikutnya dan hubungannya; opsi jalur bila relevan (silabus 6.1 jembatan). | `M` | Koherensi urutan. |
| 17 | `## Catatan untuk pendamping` | Waktu, bahan, kunci, tanda kesiapan, rujukan hukum yang **tidak** dibuka. | `M` | Konvensi seri `sma-coding`. |
| 18 | `## Rujukan` | Aturan rujukan bagian 5. | (aturan) | ADR-0007. |

### 4.1 Penyesuaian untuk peserta dewasa

| Hal | Aturan | Label dan dasar |
| --- | --- | --- |
| Efek keahlian terbalik | Peserta berpengalaman tidak dipaksa melewati contoh terselesaikan; mereka diuji lewat **cek awal** dan memilih melompat bila lolos. Contoh terselesaikan makin sedikit menuju akhir jalur, digantikan membaca dan menyempurnakan kode serta spesifikasi. Modul jalur `PRO` setelah `dw-pro-m5` lebih banyak memakai spesifikasi dan uji ketimbang contoh. | `K` (Kalyuga dkk., 2003; riset 3.4, 7); keputusan batas modul `[asumsi]`. |
| Pengakuan pengalaman | Kolom "Untuk siapa" dan cek awal menyebut jalur lompat resmi; **tidak** ada ujian nilai atau penyimpanan skor. Dokumen jembatan dari program lain (silabus 6.1) tetap berlaku. | `M`; konsisten dengan ADR-0004. |
| Tes mengingat berjarak | "Ingat kembali" dan "Ulang berjarak" wajib di tiap modul; interval dalam hari/minggu karena peserta mandiri 3 sampai 5 jam per minggu. | `K` prinsip (riset 3.1, 3.2, 8.4). |
| Pemrograman berpasangan | **Opsional**: peserta mandiri atau belajar di kelas pendamping boleh berpasangan; tidak ada modul yang mensyaratkannya. | `M` (bukti pada mahasiswa, Hanks dkk., 2011; riset 7). |
| Kebijakan AI | Silabus 9.1: peserta boleh memakai asisten AI pada latihan yang menyebutnya (`dw-pkj-m6`, `dw-pro-m13`, `dw-bis-m7`) dan bertanggung jawab penuh; data sintetis; kredensial tidak ditempel; keluaran adalah draf; *vibe coding* tidak diajarkan. Jalur `PRO` memulai AI untuk menulis kode **sesudah** `dw-pro-m5`. | Silabus 9.1; `M`. |
| Contoh keluaran AI | Modul memakai keluaran AI **rekaan penulis**, ditandai "contoh rekaan, bukan keluaran layanan tertentu"; tidak menempel tangkapan nyata. | `M`: keluaran AI berbeda tiap permintaan (AI 4.2, 5.5). |
| Andragogi | Tidak dipakai sebagai alasan desain atau klaim. | Riset 7 (tidak diuji). |
| Tidur, motivasi | Tidak ada klaim kesehatan atau ceramah *growth mindset*. | Riset 3.10 dan 3.11. |

### 4.2 Varian menurut jalur

| Jalur | Bahasa dan alat | Penyesuaian |
| --- | --- | --- |
| `FND` | Python (satu blok contoh) | Fokus kebiasaan dan keputusan; tanpa pemasangan alat berat. |
| `PKJ` | Lembar kerja LibreOffice (MPL 2.0) dan Python (silabus 10.1 A) | Langkah lembar kerja dicek terhadap dokumentasi resmi; data sintetis dibangkitkan dengan skrip dan benih acak yang dicatat. |
| `PRO` | Python inti, JavaScript atau TypeScript untuk web, SQL (silabus 12.3 A) | Contoh kode dijalankan; modul dengan unit SKKNI menyebut **judul** unit di catatan pendamping saja. |
| `PRS` | Python, HTML dan CSS | Bahasa ringan, proyek mandiri; jembatan ke jalur lain. |
| `BIS` | Lembar kerja, situs statis atau no-code, konsep pembayaran | Tanpa pemasangan server; modul berisiko regulasi (`dw-bis-m5` pembayaran digital, `dw-bis-m4` domain dan hosting) **hanya konsep**, tanpa angka tarif atau aturan yang tidak dibuka sumbernya. |

### 4.3 Aturan contoh kode

- **C++** tidak dipakai jalur dewasa menurut silabus (Python inti); bila suatu
  modul kelak memuat blok ```` ```cpp ````, ia harus lolos `bun run check:module-code` dan
  dijalankan penulis.
- **Python, SQL, JavaScript atau TypeScript, shell**: ditandai bahasa pada blok
  dan **dijalankan penulis** dengan versi alat dicatat; keluaran yang tertulis
  harus sama dengan keluaran nyata. Tidak ada pemeriksaan otomatis di
  repositori untuk bahasa ini (bagian 8, Q3).
- **Rumus lembar kerja**: ditulis dengan nama fungsi yang ada di dokumentasi
  resmi alat dan **dicoba** di alat itu; hasil sel dicatat.
- Contoh yang berlubang (`___`) bukan kode yang berjalan; kunci lengkapnya
  dijalankan penulis.
- Data sintetis dibangkitkan dengan skrip dari benih acak yang dicatat; tidak
  ada nama, perusahaan, atau transaksi nyata; kredensial selalu palsu dan
  ditandai demikian.

### 4.4 Panjang modul

**1200 sampai 2000 kata per modul**, dihitung dengan `wc -w` pada tubuh tanpa
"Catatan untuk pendamping" dan "Rujukan"; blok kode ikut. Modul 5 jam sekitar
1200 sampai 1500 kata; modul 10 jam dan proyek akhir mendekati 2000. Pilot
`dw-fnd-m1` (8 jam) bertubuh sekitar 1340 kata.

## 5. Aturan rujukan

Rujukan adalah **sumber resmi atau terverifikasi** dan dibuka penulis sendiri
(tanggal dibuka dicatat). Alamat selalu `https`. Yang tidak terbuka ditandai
`[belum terverifikasi]` dan **tidak dipakai sebagai dasar klaim**.

| Keperluan | Sumber yang boleh | Catatan |
| --- | --- | --- |
| SKKNI | Keputusan Menteri Ketenagakerjaan Nomor 282 Tahun 2016, halaman JDIH: `https://jdih.kemnaker.go.id/peraturan/detail/1381/keputusan-menteri-ketenagakerjaan-nomor-282-tahun-2016` (judul, tanggal 8 November 2016, status "Berlaku", dan 47 unit terverifikasi; halaman tidak melampirkan berkas lampiran) | Salinan daftar unit (`skkni-units.json`) **belum terverifikasi** terhadap berkas resmi; dikutip **hanya judul unit**. Lampiran resmi di JDIH belum terbuka; sampai terbuka, modul tidak menyalin elemen kompetensi atau kriteria unjuk kerja. Berkas pihak ketiga (mis. salinan LSP kampus) bukan sumber otoritatif. |
| Sertifikasi | `https://bnsp.go.id/` untuk lembaga; skema, biaya, dan jadwal LSP `[belum terverifikasi]` | Jangan menjanjikan kelulusan atau biaya. |
| Literasi digital | DigComp 3.0 (area 4 "Safety, wellbeing and responsible use"), `https://joint-research-centre.ec.europa.eu/projects-and-activities/education-and-training/digital-transformation-education/digital-competence-framework-citizens-digcomp/digcomp-framework_en` | Hanya sebagai pembanding, bukan standar program. |
| Bahasa dan alat | Dokumentasi resmi: `https://docs.python.org/3/`, `https://www.libreoffice.org/` beserta `https://documentation.libreoffice.org/` dan `https://help.libreoffice.org/`, `https://sqlite.org/docs.html`, `https://www.typescriptlang.org/docs/`, `https://bun.sh/docs`, `https://git-scm.com/docs`, `https://developer.mozilla.org/en-US/docs/Web` untuk HTML, CSS, dan JavaScript | Halaman yang dipakai dibuka dan dicatat. Lisensi alat mengikuti `riset.md` bagian 7 (mis. LibreOffice MPL 2.0, n8n berlisensi "fair-code" bukan OSI). |
| AI, keamanan, tata kelola | Rujukan terverifikasi di riset AI bagian 9.3 (OWASP Top 10 for LLM Applications, NIST SSDF, SLSA, SE Menteri Kominfo 9/2023, UNESCO, U.S. Copyright Office untuk hukum AS) | Hukum Indonesia tentang hak cipta keluaran AI dan pelindungan data pribadi `[belum terverifikasi]` kecuali penulis membuka teks resmi dan mencatatnya. |
| Hal berisiko regulasi (QRIS dan pembayaran, pajak UMKM, domain) | Sumber resmi regulator yang **dibuka dan dibaca** | Bila tidak terbuka: konsep saja, tanpa angka atau aturan; tulis `[belum terverifikasi]` di catatan pendamping. |
| Bukti belajar | Dua dokumen riset repositori | Di catatan pendamping, bukan di bahan peserta. |

**Larangan menyalin soal.** Soal latihan **ditulis sendiri**. Soal ujian
sertifikasi, soal platform daring, dan bahan pelatihan berbayar atau
berhak cipta tidak disalin; yang resmi dan dibuka hanya **ditautkan**
(ADR-0007, bagian "Copyright"). Teks regulasi dikutip pendek dengan sumber,
bukan disalin panjang.

## 6. Gelombang penulisan dan gerbang mutu

### 6.1 Pembagian

Satu agen pelaksana menulis sekitar **lima modul** (sekitar 6500 sampai 8000
kata per paket); 36 modul menjadi **7 paket**:

| Paket | Modul | Alasan pengelompokan |
| --- | --- | --- |
| D1 | `dw-fnd-m1`, `dw-pkj-m1`, `dw-pkj-m2`, `dw-pkj-m3`, `dw-pkj-m4` | Modul bersama dari pilot; awal `PKJ` (lembar kerja dan Python). |
| D2 | `dw-pkj-m5`, `dw-pkj-m6`, `dw-pkj-m7`, `dw-pkj-m8`, `dw-prs-m1` | Akhir `PKJ` (termasuk AI); awal `PRS`. |
| D3 | `dw-prs-m2`, `dw-prs-m3`, `dw-prs-m4`, `dw-prs-m5`, `dw-prs-m6` | Seluruh sisa `PRS`. |
| D4 | `dw-bis-m1`, `dw-bis-m2`, `dw-bis-m3`, `dw-bis-m4`, `dw-bis-m5` | Awal `BIS` (lembar kerja, situs, konsep pembayaran; berisiko regulasi). |
| D5 | `dw-bis-m6`, `dw-bis-m7`, `dw-bis-m8`, `dw-pro-m1`, `dw-pro-m2` | Akhir `BIS` (no-code, AI untuk usaha); awal `PRO`. |
| D6 | `dw-pro-m3`, `dw-pro-m4`, `dw-pro-m5`, `dw-pro-m13`, `dw-pro-m6` | Inti pemrograman `PRO` dan AI berbantuan (`dw-pro-m13` setelah `m5`). |
| D7 | `dw-pro-m7`, `dw-pro-m8`, `dw-pro-m9`, `dw-pro-m10`, `dw-pro-m11`, `dw-pro-m12` | Basis data, web, API, kolaborasi, operasi, proyek akhir (enam modul). |

| Gelombang | Paket | Agen paralel | Syarat mulai |
| --- | --- | --- | --- |
| 0 (orchestrator) | Skema indeks digabung; pilot disetujui; keputusan Q1 dan Q2 diambil | 0 | Pilot menjadi acuan gaya; Q2 menentukan isi `dw-bis-m6`. |
| 1 | D1 | 1 | Kalibrasi gaya dengan satu paket sebelum paralel; `dw-fnd-m1` adalah prasyarat semua jalur. |
| 2 | D2, D3, D4 | 3 | Setelah D1 lolos gerbang mutu. |
| 3 | D5, D6 | 2 | Setelah gelombang 2; D5 membutuhkan keputusan Q2. |
| 4 | D7 | 1 | Proyek akhir `PRO` mengacu seluruh modul `PRO` sebelumnya. |

Paralel hanya dalam satu gelombang karena tiap paket menulis berkas berbeda.

### 6.2 Aturan isolasi

- Agen hanya membuat `content/dewasa-coding/modules/<id>.md` untuk id paketnya;
  tidak menyunting `modules.json`, corpus, silabus, atau modul lain.
- Pemetaan unit SKKNI hanya dari tabel bagian 3; agen tidak menambah atau
  mengurangi unit.
- Perbedaan gaya antar-paket dicatat sebagai temuan; orchestrator menyelaraskan.
- Satu issue per gelombang; satu commit per paket; tanpa `push` oleh agen.

### 6.3 Gerbang mutu

| Gerbang | Pemeriksaan | Cara |
| --- | --- | --- |
| G1 Struktur | Semua judul bagian 4 ada dan berurutan (kecuali "Keluaran portofolio" yang kondisional); spanduk `DRAF`; panjang 1200 sampai 2000 kata | Skrip judul dan `wc -w` |
| G2 Corpus | Hasil belajar dan keluaran portofolio sesuai corpus; `skkniUnits` hanya dari tabel bagian 3 dan hanya judul; tidak ada janji sertifikasi | Pencocokan tabel dan pencarian teks |
| G3 Pedagogi | Cek awal ada dan kuncinya benar; ada prediksi sebelum jawaban; ingat kembali berjarak; contoh terselesaikan lalu setengah jadi; latihan bercampur bukan di perkenalan; ulang berjarak; tanpa klaim andragogi | Daftar periksa |
| G4 Akurasi | Kode dijalankan (versi dicatat), rumus lembar kerja dicoba di alat, keluaran cocok; klaim hukum hanya dari sumber yang dibuka | Berkas log verifikasi di laporan |
| G5 AI dan privasi | Kebijakan AI silabus 9.1 dipatuhi; data sintetis; kredensial palsu; contoh keluaran AI rekaan; `privacy-check` bersih | Pencarian teks dan `privacy-check` |
| G6 Orisinalitas dan hukum | Tidak ada soal salinan; semua tautan `https` resmi dan dibuka; tidak ada klaim hukum, pajak, atau pembayaran tanpa sumber | Peninjau membuka sampel |
| G7 Tinjauan independen | Agen tinjau lain (bukan penulis) mengerjakan G1 sampai G6; orchestrator memeriksa sampel (sekitar satu dari lima modul) | Laporan tinjau |
| G8 Status | Semua `draf`; tidak ada `disetujui` | Pemeriksaan indeks |

Gerbang gelombang: `bun run format:check`, `lint`, `assist:check`, `typecheck`,
`bun test`, `validate`, `privacy-check`, `check:module-code`, dan
`check:fidelity` bila corpus tersentuh (AGENTS.md).

## 7. Pilot

Modul contoh lengkap untuk satuan pertama:
[`rancangan-modul-contoh/dw-fnd-m1.md`](rancangan-modul-contoh/dw-fnd-m1.md)
(modul bersama; satu blok Python yang dijalankan). Verifikasi penyusun
(Python 3.12.3): tiga blok Python dijalankan dengan `python3 -I` tanpa galat;
blok pemindai kredensial mencetak `baris 2` dan `baris 3` sebagaimana
tertulis. Tidak ada blok C++ pada satuan ini. Tautan OWASP Top 10 for LLM
Applications, DigComp 3.0, dan modul `re` dibuka 2026-11-19.

## 8. Pertanyaan keputusan untuk pemilik

Hanya orchestrator yang menyajikan ini ke pemilik (dialog pilihan baku).
Rekomendasi di urutan pertama.

**Q1. Bagaimana modul mengakui pengalaman peserta dewasa (efek keahlian terbalik)?**

| Opsi | Konsekuensi |
| --- | --- |
| **A. "Cek awal pengalaman" lima soal mandiri di tiap modul; bila semua benar, peserta melompati contoh terselesaikan dan contoh setengah jadi (Disarankan)** | Pengalaman dihargai tanpa percaya mentah-mentah (keyakinan tidak sama dengan kinerja, riset 3.9); tidak menyimpan skor (ADR-0004); penulis harus menulis lima soal baik per modul, menambah sekitar 150 kata |
| B. Hanya catatan "bila berpengalaman, boleh melompat" tanpa tes | Paling ringkas; berisiko peserta melompat karena terlalu percaya diri (kesenjangan keyakinan dan kinerja, riset 3.1) |
| C. Tes penempatan oleh pendamping per jalur | Paling akurat; memerlukan orang dan jadwal, tidak cocok untuk jalur mandiri (silabus 12.2) |

**Q2. Alat apa yang dipakai di `dw-bis-m6` (otomasi no-code dan low-code)?**

| Opsi | Konsekuensi |
| --- | --- |
| **A. Modul netral alat: konsep pemicu, aksi, data; tabel kriteria memilih alat (lisensi, lokasi data, biaya); tanpa langkah klik spesifik (Disarankan)** | Tahan perubahan alat, tanpa promosi, sesuai silabus 10.3 A; peserta harus memilih dan mempelajari alat sendiri; latihan memakai lembar kerja dan formulir yang ada |
| B. Satu alat (mis. n8n terpasang sendiri) dengan langkah rinci | Latihan konkret; lisensinya "fair-code" (bukan OSI, penggunaan internal atau nonkomersial) dan pemasangan serta perawatan menjadi beban peserta; langkah cepat basi |
| C. Lembar kerja ditambah Apps Script | Cocok kantor yang memakai lembar kerja web; butuh akun layanan dan data berada di pihak lain, bertentangan dengan semangat ADR-0004 bila data nyata dipakai; kuota 6 menit per eksekusi |

**Q3. Bagaimana contoh Python, SQL, TypeScript, shell, dan rumus lembar kerja dibuktikan benar (hampir semua modul memuatnya)?**

| Opsi | Konsekuensi |
| --- | --- |
| **A. Penulis menjalankan atau mencoba tiap contoh dan mencatat versi alat serta keluaran di laporan; buka issue terpisah untuk perluasan `check:module-code` (Disarankan)** | Tidak menunda gelombang 1; kebenaran bergantung disiplin penulis sampai skrip ada; rumus lembar kerja mungkin tidak pernah diperiksa mesin; satu issue tambahan |
| B. Perluas pemeriksa kode **sebelum** menulis gelombang 1 | Pemeriksaan otomatis untuk Python (mungkin SQL); penulisan tertunda, perlu PR dan dependensi di luar scope dokumen ini; rumus lembar kerja tetap manual |
| C. Hanya tinjauan manusia | Tercepat; risiko contoh salah sampai ke peserta yang belajar mandiri tanpa pendamping |

## 9. Keputusan rancangan penyusun dan temuan

| Butir | Keputusan atau temuan | Status |
| --- | --- | --- |
| Keluaran AI dalam modul | Selalu rekaan penulis dan ditandai; tidak ada tangkapan layanan nyata | `[asumsi]` (dapat dibalik pemilik) |
| Struktur `Cek awal pengalaman` | Bagian baru khusus dewasa; bergantung Q1 | Menunggu Q1 |
| Tidak ada modul memuat C++ | Silabus dewasa memakai Python inti | Sesuai silabus 12.3 |
| Modul berisiko regulasi | `dw-bis-m4`, `dw-bis-m5`: konsep saja bila sumber resmi tidak dibuka | `[asumsi]` |
| Data corpus | `module-plan.json` tidak memuat unit SKKNI; pemetaan hanya di silabus 5.2, sehingga kontrak "skkniUnits dari `module-plan.json`" dipenuhi lewat silabus 5.2 (13 modul `PRO`) | Catatan untuk skema dan orchestrator |
| Dokumen basi bila rancangan disetujui | `README.md` program (bagian "Pekerjaan lanjutan") dan `docs/programs/README.md` bila memuat status modul; AGENTS.md (tabel `content/`) | Catatan untuk orchestrator |
| Di luar scope | `check:module-code` hanya mengompilasi blok `cpp`; tidak ada pemeriksaan Python, SQL, TypeScript, atau rumus | Lihat Q3 |

## Changelog

| Versi | Tanggal | Perubahan |
| --- | --- | --- |
| v0.1.0 | 2026-11-19 | Dokumen pertama: pemetaan 36 modul beserta unit SKKNI sebatas judul, templat berbasis bukti, aturan rujukan, gelombang dan gerbang mutu, tiga pertanyaan keputusan, dan pilot `dw-fnd-m1`. |
| v0.1.1 | 2026-11-19 | Sinkron dokumen (#124): catatan status; 36 modul kini ada di `content/dewasa-coding/` dan terindeks; pilot menjadi riwayat. Isi rancangan tidak berubah. |
| v0.1.2 | 2026-11-20 | Catatan status 2026-11-20: pemilik menyetujui 753 modul enam program coding (#125); pernyataan `draf` di dokumen ini menjadi riwayat; isi rancangan tidak berubah. |
