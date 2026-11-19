# Rancangan Modul Belajar `kuliah-coding` (24 modul)

- **Version:** v0.1.1
- **Last updated:** 2026-11-19
- **Status:** Rancangan **DISETUJUI pemilik 2026-11-19** lewat dialog keputusan (opsi "Setujui semua rekomendasi", termasuk tingkat AI baku `[asumsi]` untuk mata kuliah yang belum ditetapkan silabus). Persetujuan ini untuk rancangan, bukan modul. Modulnya **sudah ditulis** per 2026-11-19: 24 modul di `content/kuliah-coding/modules/`, terindeks di `data/kuliah-coding/modules.json`; semuanya berstatus `draf`.
- **Changeset:** v0.1.0: dokumen pertama (rancangan modul belajar `kuliah-coding`, satu modul per mata kuliah, 24 modul, struktur internal per pekan atau pokok bahasan), bersama pilot `kul-u-101`.

> **Catatan status (2026-11-19, sinkron dokumen #124).** Frasa "belum satu pun modul ditulis" dan "belum ada `modules.json`" di bawah adalah riwayat: 24 modul ada di `content/kuliah-coding/modules/` (jalur U 5, I 16, K 3) dan terindeks di `data/kuliah-coding/modules.json` (skema `src/schema/kul-module.ts`), semua `draf`, belum ditinjau. Pilot `rancangan-modul-contoh/` kini riwayat; modul nyatanya `content/kuliah-coding/modules/kul-u-101.md`. Aturan "agen penulis tidak menyunting indeks" adalah aturan masa penulisan. Judul `#` dan bagian `## Rujukan` tidak lagi ada di tubuh modul (judul dan rujukan dirender dari indeks); judul ganda kini galat di `bun run check:learner-assets`.
> Keputusan dan kontrak yang disetujui pemilik di dokumen ini tidak berubah; yang diperbarui hanya klausa status yang basi.

> Isi dokumen ini adalah konten **karangan** (*authored*) menurut
> [ADR-0007](../../architecture/adr/0007-authored-learning-content.md), bukan
> transkripsi silabus. Agent tidak pernah mencatat persetujuan atas nama
> pemilik; semua keputusan di bagian 8 menunggu dialog pilihan pemilik. Modul
> yang kelak ditulis berstatus `draf` sampai pemilik atau peninjau yang
> ditunjuknya menyetujui, per modul.

## 0. Cara membaca dokumen ini

| Tanda | Arti |
| --- | --- |
| `K` | Unsur didukung bukti kuat untuk prinsipnya (riset ilmu belajar bagian 8: `[A]` atau `[B]`). Untuk **pemrograman** bukti langsungnya sering terbatas; batas itu ditulis di kolom dasar. |
| `M` | Masuk akal tetapi bukti terbatas untuk pemrograman atau untuk tingkat itu (`[inferensi]`). |
| `[asumsi]` | Keputusan perancangan penyusun, bukan data resmi. |
| `[belum terverifikasi]` | Tidak dapat dipastikan dari sumber yang dibuka penyusun pada 2026-11-19. |
| Rujukan `riset X.Y` | Bagian X.Y dari [`ilmu-belajar-kognitif.md`](../../riset/ilmu-belajar-kognitif.md); `AI X.Y` berarti [`ai-rekayasa-perangkat-lunak.md`](../../riset/ai-rekayasa-perangkat-lunak.md). |

## 1. Tujuan dan batas

Keputusan pemilik 2026-11-19: modul belajar `kuliah-coding` **lengkap**, **satu
modul per mata kuliah** (24 modul), pembaca mahasiswa. Karena satu mata kuliah
adalah satu semester, satu modul adalah **pegangan belajar satu semester**
(sasaran 2500 sampai 4000 kata) dengan struktur internal per pokok bahasan dan
per pertemuan (bagian 4).

Batas:

- Tidak mengubah `content/`, `data/`, `src/`, `silabus.md`, `riset.md`, `README`
  program, atau `docs/panduan/`. Skema indeks khusus program dibuat pelaksana
  lain; dokumen ini hanya memegang kontraknya (bagian 2).
- Modul tidak mengubah CPMK, SKS, semester, atau pemetaan KA; kolom **CPL
  program studi tetap isian prodi pengadopsi** (silabus bagian 4.1) dan tidak
  diisi modul. Mata kuliah mengikuti paket yang diadopsi prodi (silabus 2.4).
- Modul adalah bahan belajar, bukan RPS, bukan LMS, dan bukan penilai
  (ADR-0004: tidak menyimpan nilai, nama, atau kode yang diserahkan).

## 2. Kontrak indeks modul (dari pelaksana skema)

| Bidang | Aturan untuk 24 modul |
| --- | --- |
| `id` | Kode mata kuliah huruf kecil: `kul-u-101`, `kul-i-204`, `kul-k-301`, dst., cocok dengan `courses[].code` di `data/kuliah-coding/courses.json`. |
| `knowledgeAreas` | **Hanya** `kaCodes` mata kuliah itu menurut corpus (kolom KA di bagian 3). Tidak menambah KA berdasarkan isi modul. |
| Berkas isi | `content/kuliah-coding/modules/<id>.md`. |
| Status | `draf`. Hanya manusia yang menetapkan `disetujui`. |
| Pembaca | Mahasiswa; bagian pengantar untuk dosen ada di ujung ("Catatan untuk dosen"). |
| Pemilik indeks | Orchestrator mengisi `modules.json` setelah modul ditinjau; agen penulis tidak menyunting indeks. |

## 3. Pemetaan: 24 modul

Kolom disalin dari `data/kuliah-coding/courses.json` (kode, nama, SKS,
semester, prasyarat, `kaCodes`) dan `knowledge-areas.json` (tingkat pemetaan:
`utama`, `sebagian`, `pilihan`, `pendukung`); "Tingkat AI" dari
`ai-policy.json` bagian 6.3 silabus. **Pemetaan KA tidak diaudit di dalam
KA** karena unit CS2023 tidak terverifikasi (silabus riset; `knowledge-areas.json`
bagian `gaps`): modul tidak menyebut nama unit atau jam CS2023.

| id | Kode | Judul modul (mata kuliah) | SKS, semester | KA CS2023 (tingkat pemetaan) | Prasyarat | Tingkat AI (silabus 6.3) |
| --- | --- | --- | --- | --- | --- | --- |
| `kul-u-101` | KUL-U-101 | Berpikir Komputasional dan Dasar Pemrograman | 3 SKS, S1 | SDF (pendukung), AL (-) | (tidak ada) | Kuning |
| `kul-u-102` | KUL-U-102 | Analisis Data dengan Python | 3 SKS, S2 | DM (pendukung), MSF (-), SDF (pendukung) | `kul-u-101` | belum dinyatakan |
| `kul-u-201` | KUL-U-201 | Otomasi Kerja dan Skrip | 3 SKS, S3 | SDF (pendukung), SEC (pendukung), NC (pendukung) | `kul-u-101` | belum dinyatakan |
| `kul-u-202` | KUL-U-202 | Literasi, Etika, dan Keamanan AI | 2 SKS, S4 | AI (pendukung), SEP (pendukung), SEC (pendukung) | (tidak ada) | Hijau |
| `kul-u-301` | KUL-U-301 | Proyek Komputasi Lintas Disiplin | 3 SKS, S6 | SDF (-), SE (pendukung), SEP (pendukung) | `kul-u-102` atau `kul-u-201` | belum dinyatakan |
| `kul-i-101` | KUL-I-101 | Fondasi Pemrograman | 4 SKS, S1 | SDF (utama), FPL (sebagian) | (tidak ada) | Kuning |
| `kul-i-102` | KUL-I-102 | Struktur Data | 3 SKS, S2 | SDF (utama), AL (sebagian) | `kul-i-101` | Kuning |
| `kul-i-103` | KUL-I-103 | Matematika Diskret untuk Komputasi | 3 SKS, S2 | MSF (utama) | (tidak ada) | belum dinyatakan |
| `kul-i-201` | KUL-I-201 | Analisis dan Desain Algoritma | 3 SKS, S3 | AL (utama) | `kul-i-102`, `kul-i-103` | belum dinyatakan |
| `kul-i-202` | KUL-I-202 | Basis Data | 3 SKS, S3 | DM (utama) | `kul-i-102` | belum dinyatakan |
| `kul-i-203` | KUL-I-203 | Organisasi Komputer dan Sistem Operasi | 3 SKS, S4 | AR (utama), OS (utama), SF (sebagian) | `kul-i-101` | belum dinyatakan |
| `kul-i-204` | KUL-I-204 | Rekayasa Perangkat Lunak | 3 SKS, S4 | SE (utama) | `kul-i-102` | Hijau |
| `kul-i-205` | KUL-I-205 | Pengembangan Web | 3 SKS, S4 | SPD (utama) | `kul-i-202` | belum dinyatakan |
| `kul-i-301` | KUL-I-301 | Jaringan Komputer dan Keamanan | 3 SKS, S5 | NC (utama), SEC (sebagian) | `kul-i-203` | belum dinyatakan |
| `kul-i-302` | KUL-I-302 | Komputasi Paralel, Terdistribusi, dan Cloud | 3 SKS, S6 | PDC (utama) | `kul-i-203` | belum dinyatakan |
| `kul-i-303` | KUL-I-303 | Kecerdasan Buatan dan Pembelajaran Mesin | 3 SKS, S5 | AI (utama) | `kul-i-201`, statistik | belum dinyatakan |
| `kul-i-304` | KUL-I-304 | Interaksi Manusia-Komputer | 2 SKS, S5 | HCI (utama) | `kul-i-205` | belum dinyatakan |
| `kul-i-305` | KUL-I-305 | Profesi, Etika, dan Masyarakat | 2 SKS, S6 | SEP (utama) | (tidak ada) | belum dinyatakan |
| `kul-i-306` | KUL-I-306 | Grafika dan Teknik Interaktif (pilihan) | 2 SKS, S6 | GIT (pilihan) | `kul-i-102` | belum dinyatakan |
| `kul-i-307` | KUL-I-307 | Rekayasa Data dan Pengantar Pembelajaran Mesin Terapan (pilihan) | 2 SKS, S7 | DM (sebagian), AI (sebagian) | `kul-i-202` | belum dinyatakan |
| `kul-i-401` | KUL-I-401 | Proyek Perangkat Lunak Tim | 4 SKS, S7 | SE (utama), SEP (sebagian) | `kul-i-204` | Hijau |
| `kul-k-201` | KUL-K-201 | Pemrograman Kompetitif I | 2 SKS, S3 | AL (pendukung), SDF (-) | `kul-i-102` atau sma-coding jalur A atau `kul-u-101` dengan seleksi `[asumsi]` | Merah |
| `kul-k-301` | KUL-K-301 | Pemrograman Kompetitif II | 2 SKS, S5 | AL (pendukung), MSF (pendukung) | `kul-k-201` | Merah |
| `kul-k-401` | KUL-K-401 | Studio Tim Kompetisi | 2 SKS, S7 | AL (pendukung), SEP (pendukung) | `kul-k-301` | Merah |

Ringkasan: 24 modul, 66 SKS (inti 62, dua pilihan `kul-i-306` dan `kul-i-307`
masing-masing 2 SKS); jalur U 5 modul (14 SKS), jalur I 16 modul (46 SKS),
jalur K 3 modul (6 SKS). Prasyarat disalin dari corpus apa adanya, termasuk
`[asumsi]` pada `kul-k-201` dan "statistik" pada `kul-i-303` yang bukan mata
kuliah di paket ini (prodi menyediakan).

## 4. Struktur internal per mata kuliah

Pola semester 16 minggu `[asumsi]` (silabus 2.3): **14 pertemuan**, ujian
tengah setelah pertemuan 7 dan ujian akhir setelah pertemuan 14. Beban per SKS
dibagi sepertiga belajar terbimbing, sepertiga penugasan terstruktur, sepertiga
mandiri (silabus 2.3); modul menjadi sumber untuk ketiganya. Satu modul terdiri
dari **4 sampai 6 bagian** (pokok bahasan yang mencakup 1 sampai 4 pertemuan),
dan tiap bagian memakai sub-bagian templat (bagian 5). Tabel berikut
merancang pembagian per mata kuliah; "Pokok bahasan" memakai kata dari kolom
`topics` corpus dan **tidak menambah** topik.

### 4.1 Jalur U (coding untuk semua prodi; Python)

**`kul-u-101`** (S1, 3 SKS; pilot):

| Bagian | Pertemuan | Pokok bahasan | CPMK |
| --- | --- | --- | --- |
| 1 | 1 sampai 3 | Berpikir komputasional; Python dasar (nilai, variabel, percabangan) | C1, C2 |
| 2 | 4 sampai 6 | Perulangan, fungsi, daftar | C2 |
| 3 | 7 | Struktur data bawaan (dict, set); kuis kumulatif | C2 |
| 4 | 8 sampai 10 | Berkas teks dan CSV; modul dan pustaka standar | C2 |
| 5 | 11 dan 12 | Pengujian dasar; Git dasar; gerbang kesiapan AI | C3, C4 |
| 6 | 13 dan 14 | Proyek kecil di bidang prodi | C1 sampai C4 |

**`kul-u-102`** (S2, 3 SKS):

| Bagian | Pertemuan | Pokok bahasan | CPMK |
| --- | --- | --- | --- |
| 1 | 1 sampai 3 | Tabel data; memuat dan memeriksa data | C1 |
| 2 | 4 sampai 6 | Pembersihan data | C1 |
| 3 | 7 sampai 9 | Ringkasan statistik | C2 |
| 4 | 10 dan 11 | Grafik | C2 |
| 5 | 12 | Notebook dan alur yang dapat diulang | C3 |
| 6 | 13 dan 14 | Sumber data terbuka; kualitas dan bias data; laporan | C4 |

**`kul-u-201`** (S3, 3 SKS):

| Bagian | Pertemuan | Pokok bahasan | CPMK |
| --- | --- | --- | --- |
| 1 | 1 sampai 3 | Pengolahan berkas | C1 |
| 2 | 4 dan 5 | Ekspresi reguler dasar | C1 |
| 3 | 6 sampai 8 | Permintaan HTTP dan JSON | C2 |
| 4 | 9 dan 10 | Penjadwalan dan pencatatan (log) | C3 |
| 5 | 11 dan 12 | Pengelolaan rahasia (kunci API tidak masuk repositori); risiko skrip | C4 |
| 6 | 13 dan 14 | Etika dan hukum otomasi; proyek akhir | C1 sampai C4 |

**`kul-u-202`** (S4, 2 SKS; tidak punya prasyarat; Hijau):

| Bagian | Pertemuan | Pokok bahasan | CPMK |
| --- | --- | --- | --- |
| 1 | 1 sampai 3 | Pembelajaran mesin secara konseptual; model bahasa; gerbang kesiapan | C1 |
| 2 | 4 sampai 6 | Rekayasa perintah dan evaluasi; keluaran yang dapat berbeda untuk perintah yang sama | C2, C5 |
| 3 | 7 sampai 9 | Verifikasi keluaran dengan uji; log pemakaian | C3, C5 |
| 4 | 10 dan 11 | Privasi dan pelindungan data pribadi; hak cipta dan lisensi keluaran AI | C4 |
| 5 | 12 sampai 14 | Integritas akademik; energi dan biaya komputasi sekilas; dampak sosial | C2, C3 |

**`kul-u-301`** (S6, 3 SKS):

| Bagian | Pertemuan | Pokok bahasan | CPMK |
| --- | --- | --- | --- |
| 1 | 1 sampai 3 | Perumusan masalah bersama pemangku kepentingan | C1 |
| 2 | 4 dan 5 | Perencanaan proyek | C1, C4 |
| 3 | 6 sampai 10 | Pengembangan iteratif (tiga iterasi dengan bukti di repositori) | C2, C4 |
| 4 | 11 dan 12 | Dokumentasi dan pengujian | C3 |
| 5 | 13 dan 14 | Presentasi; refleksi etika | C3 |

### 4.2 Jalur I (informatika dan ilmu komputer; C++ kecuali dinyatakan)

**`kul-i-101`** (S1, 4 SKS):

| Bagian | Pertemuan | Pokok bahasan | CPMK |
| --- | --- | --- | --- |
| 1 | 1 sampai 3 | Variabel dan tipe, alur kendali | C1 |
| 2 | 4 sampai 6 | Fungsi | C2 |
| 3 | 7 sampai 9 | Larik dan string | C2 |
| 4 | 10 dan 11 | Memori; penunjuk dan referensi | C2 |
| 5 | 12 | I/O berkas | C1 |
| 6 | 13 dan 14 | Pengujian; *debugging* dengan alat; Git | C3, C4 |

**`kul-i-102`** (S2, 3 SKS):

| Bagian | Pertemuan | Pokok bahasan | CPMK |
| --- | --- | --- | --- |
| 1 | 1 dan 2 | Struktur linear (list, stack, queue) | C1 |
| 2 | 3 sampai 5 | Pohon | C1 |
| 3 | 6 sampai 8 | Tabel hash dan heap | C1 |
| 4 | 9 sampai 11 | Graf dasar | C1 |
| 5 | 12 sampai 14 | Pengantar kompleksitas; memilih struktur | C2, C3 |

**`kul-i-103`** (S2, 3 SKS):

| Bagian | Pertemuan | Pokok bahasan | CPMK |
| --- | --- | --- | --- |
| 1 | 1 sampai 3 | Logika | C1 |
| 2 | 4 dan 5 | Himpunan dan relasi | C1 |
| 3 | 6 sampai 8 | Bukti dan induksi | C2 |
| 4 | 9 sampai 11 | Hitungan (kombinatorika) | C3 |
| 5 | 12 sampai 14 | Graf; aritmetika modular; bilangan dasar | C4 |

**`kul-i-201`** (S3, 3 SKS):

| Bagian | Pertemuan | Pokok bahasan | CPMK |
| --- | --- | --- | --- |
| 1 | 1 dan 2 | Notasi asimtotik | C2 |
| 2 | 3 dan 4 | Rekurens | C2 |
| 3 | 5 sampai 7 | Rancangan algoritma: greedy dan *divide and conquer* | C1 |
| 4 | 8 sampai 10 | Pemrograman dinamis (DP) | C1 |
| 5 | 11 dan 12 | Graf; pencarian | C1, C2 |
| 6 | 13 dan 14 | Kelas masalah | C3 |

**`kul-i-202`** (S3, 3 SKS; SQL):

| Bagian | Pertemuan | Pokok bahasan | CPMK |
| --- | --- | --- | --- |
| 1 | 1 sampai 3 | Model data (ER dan relasional) | C1 |
| 2 | 4 sampai 7 | SQL | C2 |
| 3 | 8 dan 9 | Normalisasi | C3 |
| 4 | 10 dan 11 | Transaksi | C3 |
| 5 | 12 sampai 14 | Indeks; proyek basis data | C3 |

**`kul-i-203`** (S4, 3 SKS):

| Bagian | Pertemuan | Pokok bahasan | CPMK |
| --- | --- | --- | --- |
| 1 | 1 sampai 3 | Representasi data; arsitektur CPU dan memori | C1 |
| 2 | 4 dan 5 | Assembly dasar | C1 |
| 3 | 6 sampai 8 | Proses dan utas; penjadwalan | C2 |
| 4 | 9 sampai 11 | Memori (termasuk memori virtual) | C2 |
| 5 | 12 sampai 14 | Berkas; baris perintah | C3 |

**`kul-i-204`** (S4, 3 SKS; Hijau):

| Bagian | Pertemuan | Pokok bahasan | CPMK |
| --- | --- | --- | --- |
| 1 | 1 sampai 3 | Proses; kebutuhan dan rancangan; UML ringan | C1 |
| 2 | 4 sampai 6 | Pengujian; tinjau kode | C2 |
| 3 | 7 dan 8 | Kendali versi dan CI dalam tim | C3 |
| 4 | 9 sampai 12 | Rekayasa perangkat lunak berbantuan AI (spesifikasi dan uji lebih dulu; tinjau kode hasil AI; analis statis; SSDF dan SLSA; kebijakan AI tim dan log; agen kode dengan batas kewenangan) | C4 |
| 5 | 13 dan 14 | Pemeliharaan; proyek tim kecil | C2, C3 |

**`kul-i-205`** (S4, 3 SKS; HTML, CSS, JavaScript atau TypeScript):

| Bagian | Pertemuan | Pokok bahasan | CPMK |
| --- | --- | --- | --- |
| 1 | 1 sampai 3 | HTML dan CSS; aksesibilitas | C1 |
| 2 | 4 sampai 6 | JavaScript dan TypeScript | C1 |
| 3 | 7 sampai 9 | HTTP dan REST; perancangan API | C2 |
| 4 | 10 dan 11 | Autentikasi dasar; pengamanan dasar | C3 |
| 5 | 12 sampai 14 | Proyek web | C1 sampai C3 |

**`kul-i-301`** (S5, 3 SKS):

| Bagian | Pertemuan | Pokok bahasan | CPMK |
| --- | --- | --- | --- |
| 1 | 1 sampai 3 | Model lapisan; TCP/IP | C1 |
| 2 | 4 sampai 6 | Soket | C2 |
| 3 | 7 sampai 9 | Kriptografi dasar | C3 |
| 4 | 10 dan 11 | Ancaman umum; praktik dasar | C3 |
| 5 | 12 sampai 14 | Pengantar SSDF; rantai pasok dan pemeriksaan paket sebelum dipasang | C4 |

**`kul-i-302`** (S6, 3 SKS):

| Bagian | Pertemuan | Pokok bahasan | CPMK |
| --- | --- | --- | --- |
| 1 | 1 sampai 4 | Utas dan sinkronisasi | C1 |
| 2 | 5 sampai 7 | Model terdistribusi; konsistensi | C2 |
| 3 | 8 sampai 10 | Kontainer | C3 |
| 4 | 11 sampai 14 | Layanan cloud; proyek | C3 |

**`kul-i-303`** (S5, 3 SKS; Python):

| Bagian | Pertemuan | Pokok bahasan | CPMK |
| --- | --- | --- | --- |
| 1 | 1 sampai 3 | Pencarian | C1 |
| 2 | 4 sampai 6 | Regresi dan klasifikasi | C1 |
| 3 | 7 sampai 9 | Evaluasi model | C2 |
| 4 | 10 dan 11 | Jaringan saraf dasar | C1 |
| 5 | 12 dan 13 | Etika dan bias | C3 |
| 6 | 14 | Biaya komputasi dan energi (butir singkat, angka tidak pasti) | C4 |

**`kul-i-304`** (S5, 2 SKS):

| Bagian | Pertemuan | Pokok bahasan | CPMK |
| --- | --- | --- | --- |
| 1 | 1 sampai 4 | Prinsip rancangan | C1 |
| 2 | 5 sampai 9 | Evaluasi kebergunaan | C2 |
| 3 | 10 sampai 12 | Aksesibilitas | C2 |
| 4 | 13 dan 14 | Proyek rancangan | C1, C2 |

**`kul-i-305`** (S6, 2 SKS):

| Bagian | Pertemuan | Pokok bahasan | CPMK |
| --- | --- | --- | --- |
| 1 | 1 sampai 4 | Etika; kasus etika profesi | C1 |
| 2 | 5 sampai 7 | Lisensi dan hak cipta | C2 |
| 3 | 8 sampai 10 | Privasi dan pelindungan data pribadi | C2 |
| 4 | 11 dan 12 | Dampak sosial; profesi | C1 |
| 5 | 13 dan 14 | Tata kelola AI (SE 9/2023; kebijakan pemakaian AI di tempat kerja) | C3 |

**`kul-i-306`** (S6, 2 SKS, pilihan):

| Bagian | Pertemuan | Pokok bahasan | CPMK |
| --- | --- | --- | --- |
| 1 | 1 sampai 5 | Rendering dasar | C1 |
| 2 | 6 sampai 10 | Transformasi | C1 |
| 3 | 11 sampai 14 | Interaksi; proyek | C2 |

**`kul-i-307`** (S7, 2 SKS, pilihan; Python dan SQL):

| Bagian | Pertemuan | Pokok bahasan | CPMK |
| --- | --- | --- | --- |
| 1 | 1 sampai 4 | ETL | C1 |
| 2 | 5 sampai 7 | Fitur | C1 |
| 3 | 8 sampai 10 | Model | C2 |
| 4 | 11 dan 12 | Evaluasi | C2 |
| 5 | 13 dan 14 | Penyajian | C2 |

**`kul-i-401`** (S7, 4 SKS; Hijau):

| Bagian | Pertemuan | Pokok bahasan | CPMK |
| --- | --- | --- | --- |
| 1 | 1 dan 2 | Kapstone dengan pemangku kepentingan; perencanaan | C1, C2 |
| 2 | 3 sampai 11 | Iterasi kerja tim (tiga iterasi): tinjau kode, rilis | C1, C2 |
| 3 | 12 | Kebijakan AI tim dan log pemakaian; tinjauan manusia wajib atas kode yang digabung | C4 |
| 4 | 13 dan 14 | Dokumentasi; demo; sidang dengan tanya jawab tentang kode sendiri | C3 |

### 4.3 Jalur K (kompetitif, lanjutan OSN; C++)

**`kul-k-201`** (S3, 2 SKS; Merah saat kontes):

| Bagian | Pertemuan | Pokok bahasan | CPMK |
| --- | --- | --- | --- |
| 1 | 1 dan 2 | Templat kode; I/O cepat; pustaka standar | C4 |
| 2 | 3 sampai 5 | Pengurutan; pencarian biner | C1, C2 |
| 3 | 6 sampai 8 | Greedy | C1, C3 |
| 4 | 9 sampai 11 | DP dasar | C1, C2 |
| 5 | 12 sampai 14 | Graf dasar (BFS dan DFS) | C1, C3 |

Lima kontes mingguan perorangan (asesmen silabus) ditempatkan pada pertemuan
4, 6, 9, 11, dan 14 `[asumsi]`; soal **ditautkan, tidak disalin**.

**`kul-k-301`** (S5, 2 SKS; Merah saat kontes):

| Bagian | Pertemuan | Pokok bahasan | CPMK |
| --- | --- | --- | --- |
| 1 | 1 sampai 4 | DP lanjutan | C1, C3 |
| 2 | 5 sampai 8 | Graf lanjutan (jalur terpendek, pohon rentang minimum, aliran dasar) | C1 |
| 3 | 9 dan 10 | Teori bilangan | C1 |
| 4 | 11 dan 12 | Struktur data lanjutan (segment tree, DSU) | C2 |
| 5 | 13 dan 14 | String; geometri dasar | C3 |

**`kul-k-401`** (S7, 2 SKS; Merah saat simulasi kontes):

| Bagian | Pertemuan | Pokok bahasan | CPMK |
| --- | --- | --- | --- |
| 1 | 1 dan 2 | Strategi tim; pembagian peran | C1 |
| 2 | 3 sampai 10 | Simulasi kontes (tim tiga orang, satu komputer, durasi sekitar lima jam sebagai bentuk latihan) | C1, C2 |
| 3 | 11 sampai 13 | Analisis soal yang gagal; *debugging* dan kode pembanding | C3 |
| 4 | 14 | Refleksi dan rencana latihan | C4 |

Catatan: semua 24 mata kuliah memakai pola 14 pertemuan; mata kuliah 2 SKS
tetap memiliki 14 pertemuan dengan beban per pertemuan lebih kecil (silabus
2.3: beban per SKS sama).

## 5. Templat modul berbasis bukti

Judul bagian **persis begini dan urutan ini**; judul `Untuk siapa modul ini`,
`Latihan`, `Kesalahan umum`, `Cek mandiri`, `Kunci dan petunjuk`, dan
`Langkah berikutnya` sudah dipakai seri `sma-coding`. Karena satu modul adalah
satu semester, bagian `Prediksi dulu` sampai `Latihan` diulang sebagai
sub-bagian (`###`) **di dalam tiap bagian pokok bahasan** (`## Bagian n: ...`),
bukan sekali di awal. Pilot `kul-u-101` mengikuti susunan ini.

| # | Judul bagian | Isi | Label | Dasar dan batasnya |
| --- | --- | --- | --- | --- |
| 0 | `# ...` dan spanduk | Judul = nama mata kuliah di corpus; spanduk "DRAF — belum ditinjau". | (aturan) | ADR-0007. |
| 1 | `## Untuk siapa modul ini` | Prodi sasaran, semester, SKS, prasyarat, alat, pola 14 pertemuan. | `M` | Orientasi. |
| 2 | `## Peta semester` | Tabel pertemuan: bagian, pokok bahasan, CPMK, **sumber kuis pembuka** (jarak bertambah). | `M` | Struktur, bagian 4. |
| 3 | `## Ingat kembali` | Aturan kuis pembuka 5 menit tanpa catatan, soal dari pertemuan lalu dan yang lebih jauh; contoh soal. | `K` prinsip; `M` untuk pemrograman | Riset 3.1 dan 3.2 (`[A]`; bukti langsung efek uji pada keterampilan pemrograman belum dibuka). |
| 4 | `## Tujuan` | CPMK dari corpus (kutipan persis). | (aturan) | Corpus; tidak mengubah CPMK. |
| 5 | `## Bagian n: <pokok>` (4 sampai 6 kali), berisi `###`: | | | |
| 5a | `### Prediksi dulu` | Prediksi hasil atau penelusuran **sebelum** menjalankan; pada konseptual (etika, RPL), prediksi keputusan dalam kasus. | `K` (penelusuran); `M` PRIMM di tingkat universitas | Lister dkk. (2004), Sorva (2013), riset 6.2; PRIMM diuji usia 11 sampai 14, bukan mahasiswa (riset 6.3). |
| 5b | `### Contoh terselesaikan` | Contoh lengkap dengan alasan dan tabel penelusuran. **Jumlah dikurangi menurut tahun** (bagian 5.1). | `K` pemula; `K` efek keahlian terbalik | Riset 3.4: contoh terselesaikan `[B]`; berbalik pada pelajar yang sudah ahli (Kalyuga dkk., 2003, `[D]`). |
| 5c | `### Contoh setengah jadi` dan `### Susun urutannya` | *Fading*: bagian dikosongkan; Parsons bila cocok. | `M` | Riset 3.4, 6.3 (Ericson dkk., 2017: efisien, belajar sama). |
| 5d | `### Latihan` | **Ubah, Buat, Jelaskan**, plus **Berpasangan** pada pertemuan praktikum. | `K` untuk berpasangan; `M` lainnya | Hanks dkk. (2011) `[A]`/tinjauan: pemrograman berpasangan di tingkat sarjana; tantangan: penjadwalan dan kecocokan pasangan (riset 6.4, 8.3). |
| 6 | `## Latihan bercampur` | Kuis kumulatif per 3 sampai 4 pertemuan dan akhir semester, soal **tanpa menyebut topiknya** (mengenali jenis masalah). | `K` prinsip (sedang, bergantung materi) | Brunmair dan Richter (2019) `[A]` (riset 3.3); paling cocok jalur K dan struktur data (riset 8.3). |
| 7 | `## Ulang berjarak` | Kalender pengulangan: tulis ulang tanpa melihat solusi, jarak makin jauh, termasuk dari mata kuliah prasyarat. | `K` | Cepeda dkk. (2006, 2008) (riset 3.2). |
| 8 | `## Kebijakan AI dan log pemakaian` | Tingkat Hijau, Kuning, atau Merah mata kuliah; gerbang kesiapan; format log; larangan data pribadi, kata sandi, kunci; wawancara kode. | `M` | Silabus 6.3 sampai 6.5 (keputusan pemilik 2026-11-19); AI 4.5, 6; Bastani dkk. (2025), Shen dan Tamkin (2026), Prather dkk. (2024) memberi bukti awal, bukan Indonesia. |
| 9 | `## Kesalahan umum` | Miskonsepsi tipikal pokok bahasan itu. | `M` | Qian dan Lehman (2017) (riset 6.1). |
| 10 | `## Cek mandiri` | Soal mengingat tanpa melihat kunci, plus daftar periksa kosong. Tidak dikumpulkan. | `K` (uji latihan) | Roediger dan Karpicke (2006), Adesope dkk. (2017) (riset 3.1); riset 3.9: rasa lancar bukan bukti. |
| 11 | `## Kunci dan petunjuk` | Kunci prediksi dan latihan terpilih; petunjuk bertahap (bukan jawaban langsung). | `K` | Bimbingan bertahap (Alfieri dkk., 2011; riset 3.5) dan umpan balik berisi (riset 3.8, sangat heterogen). |
| 12 | `## Langkah berikutnya` | Mata kuliah lanjutan yang memakai bahan ini. | `M` | Koherensi urutan. |
| 13 | `## Catatan untuk dosen` | Bobot dan bentuk asesmen **usulan** (silabus 6.1, prodi menetapkan), ruang untuk variasi tugas per mahasiswa, bahan praktikum. | `M` | Silabus 6.1, 6.2. |
| 14 | `## Rujukan` | Bagian 6. | (aturan) | ADR-0007. |

### 5.1 Penyesuaian per tingkat (kuliah)

| Hal | Aturan | Label dan dasar |
| --- | --- | --- |
| Pemrograman berpasangan | Tata cara pengemudi dan navigator, tukar peran tiap sekitar 10 menit, pasangan dibentuk acak per bagian; **tugas yang dinilai tetap perorangan** sehingga ujian praktik Merah tidak terganggu. Proyek tim (`kul-u-301`, `kul-i-204`, `kul-i-401`, `kul-k-401`) memakai peran tim, bukan berpasangan. | `K` untuk mahasiswa (Hanks dkk., 2011; riset 6.4, 8.3). |
| Kuis kumulatif dan latihan bercampur | Kuis kumulatif per 3 sampai 4 pertemuan dan di akhir semester; jalur K memakai soal bercampur sebagai bentuk utama. | `K` prinsip (riset 3.3 dan 8.3). |
| **Efek keahlian terbalik** | Contoh terselesaikan **dikurangi** menurut tingkat: semester 1 sampai 2 contoh penuh lalu setengah jadi; semester 3 sampai 4 contoh penuh hanya untuk konsep baru, selebihnya setengah jadi atau membaca kode orang lain; semester 5 sampai 7 contoh penuh sangat terbatas, diganti kasus, spesifikasi, dan tinjau kode; jalur K: editorial hanya **sesudah** mencoba menyelesaikan ulang tanpa petunjuk. Pada satu mata kuliah pun, pertemuan awal memuat lebih banyak contoh daripada pertemuan akhir (pilot: pertemuan 1 sampai 7 contoh penuh, 8 sampai 12 setengah jadi, 13 dan 14 spesifikasi saja). | `K` (Kalyuga dkk., 2003; riset 3.4 dan 8.3); angka batas semester adalah `[asumsi]`. |
| Kebijakan AI tiga tingkat | Tiap modul menyatakan tingkat mata kuliahnya (kolom bagian 3) dan, untuk **Kuning**, gerbang kesiapan (menelusuri program pendek, menulis satu uji yang gagal bila kode salah, menjelaskan kode dengan kata sendiri) serta format **log pemakaian** (alat dan versi, tujuan, perintah, bagian keluaran yang dipakai) yang disimpan mahasiswa di repositorinya sendiri, bukan di repositori ini. Ujian praktik selalu Merah. Wawancara kode singkat dapat dipakai dosen. | Silabus 6.3 sampai 6.5; `M` (bukti awal, bukan Indonesia). |
| **Tanpa AI saat kontes (jalur K)** | `kul-k-201`, `kul-k-301`, `kul-k-401`: Merah selama kontes dan simulasi; sesudahnya AI hanya untuk menjelaskan solusi dengan pengungkapan dan *re-solve* tanpa petunjuk. | Silabus 6.3; AI 6; selaras *re-solve* OSN (`data/osn/hint-policy.json`). |
| Umpan balik | Kunci memberi langkah berikutnya (apa yang dicek, apa yang dicoba), bukan hanya benar atau salah. | `M` (riset 3.8, 6.5). |
| Privasi | Data contoh sintetis atau terbuka; tanpa nama, NIM, atau kode serahan nyata di repositori (ADR-0004). | ADR-0004. |
| Hal yang dihindari | Gaya belajar, otak kiri atau kanan, persentase retensi tetap, dan *growth mindset* sebagai unsur inti. | Riset bagian 5 dan 3.10. |

### 5.2 Bahasa dan alat per mata kuliah

Mengikuti silabus bagian 7: **C++ (C++17, g++)** untuk jalur I (kecuali yang
disebut) dan jalur K; **Python** untuk jalur U serta `kul-i-303` dan
`kul-i-307` (silabus 7.1: Python untuk AI dan data); **SQL (SQLite)** untuk
`kul-i-202`; **HTML, CSS, JavaScript atau TypeScript** (selaras `sma-coding`
jalur B) untuk `kul-i-205`; **assembly** untuk `kul-i-203` (arsitektur
instruksi dipilih penulis dan dicatat `[asumsi]`); `kul-i-306` bahasa dipilih
penulis dan dicatat. Kendali versi **Git** sejak tahun pertama.

### 5.3 Aturan contoh kode

- **C++**: tiap blok ```` ```cpp ```` lolos `bun run check:module-code` (g++ C++17,
  `-fsyntax-only`) **dan** dikompilasi serta dijalankan penulis di folder
  sementara, dengan keluaran dicatat di laporan.
- **Python, SQL, TypeScript, shell, assembly, Dockerfile**: ditandai bahasa
  pada blok dan **dijalankan penulis** dengan versi alat dicatat; keluaran yang
  tertulis di modul harus sama dengan keluaran nyata. Tidak ada pemeriksaan
  otomatis di repositori untuk bahasa ini (bagian 8, Q3).
- Contoh yang berlubang (`___`) bukan kode yang berjalan; kunci lengkapnya
  dijalankan penulis.
- Data sintetis atau terbuka; rahasia (kunci, token) tidak pernah ditulis
  sebagai nilai nyata.

### 5.4 Panjang modul

**2500 sampai 4000 kata per modul mata kuliah**, dihitung dengan `wc -w` pada
tubuh tanpa "Catatan untuk dosen" dan "Rujukan"; blok kode ikut dihitung.
Pilot `kul-u-101` bertubuh sekitar 2490 kata menurut hitungan itu (tepat di
batas bawah, dengan enam bagian). Mata kuliah 2 SKS cukup sekitar 2500 kata;
mata kuliah 4 SKS dan proyek dapat mendekati 4000.

## 6. Aturan rujukan

Rujukan adalah **sumber resmi atau terverifikasi** dan dibuka penulis sendiri
(tanggal dibuka dicatat). Alamat selalu `https`. Yang tidak terbuka ditandai
`[belum terverifikasi]` dan **tidak dipakai sebagai dasar klaim**.

| Keperluan | Sumber yang boleh | Catatan |
| --- | --- | --- |
| Kerangka kurikulum | ACM/IEEE-CS/AAAI *Computer Science Curricula 2023*: `https://csed.acm.org/` dan `https://csed.acm.org/knowledge-areas/` (daftar 17 KA terverifikasi) | Rincian unit, jam, dan kerangka kompetensi **tidak** terbaca (`riset.md`); jangan dikutip. Berkas beta bertebakan alamat (`.../Version-Beta-v1.pdf`) mengembalikan 404 dan tidak dipakai. |
| SKS, CPL, integritas akademik | Permendiktisaintek 39 Tahun 2025: `https://peraturan.go.id/files/permendiktisaintek-no-39-tahun-2025.pdf` (teks dibuka dan dibaca) | Hanya untuk pasal yang benar-benar dibaca silabus (SKS, CPL, integritas). |
| Kontes | Aturan regional yang dibuka: `https://euc.icpc.global/?p=2499` dan `https://nc.na.icpc.global/rules/` | Halaman aturan global `icpc.global` hanya terbaca judulnya; isinya tidak dipakai. Pelaksanaan di Indonesia `[belum terverifikasi]`. |
| Bahasa dan alat | Dokumentasi resmi: `https://docs.python.org/3/`, `https://isocpp.org/`, `https://gcc.gnu.org/onlinedocs/`, `https://sqlite.org/docs.html`, `https://www.typescriptlang.org/docs/`, `https://bun.sh/docs`, `https://docs.docker.com/`, `https://git-scm.com/docs`, dan dokumentasi LibreOffice bila relevan | Halaman yang dipakai dibuka dan dicatat; perilaku alat dicek dengan menjalankannya. |
| AI, keamanan, tata kelola | Rujukan terverifikasi di riset AI bagian 9.3: SE Menteri Kominfo 9/2023 (JDIH Komdigi), NIST SSDF (`https://csrc.nist.gov/pubs/sp/800/218/final`), SLSA, OWASP Top 10 for LLM Applications, UNESCO, IEA | Teks yang tidak dibuka penuh tidak dikutip isinya; hukum Indonesia tentang hak cipta keluaran AI `[belum terverifikasi]`. |
| Bukti belajar | Dua dokumen riset repositori | Di catatan dosen, bukan mengutip angka di bahan mahasiswa. |

**Larangan menyalin soal.** Soal latihan **ditulis sendiri**. Soal kompetisi
(ICPC, OSN, platform daring, buku teks) hanya **ditautkan** ke alamat resmi
yang dibuka; teks soal, gambar, dan kasus ujinya tidak disalin
(ADR-0007, bagian "Copyright"). Mata kuliah jalur K memakai tautan atau
soal karangan. Cuplikan kode dari dokumentasi hanya yang pendek dan ditulis
ulang dengan sumber disebut.

## 7. Gelombang penulisan dan gerbang mutu

### 7.1 Pembagian

Satu agen pelaksana menulis **tiga modul mata kuliah** (sekitar 3000 kata per
modul, jadi sekitar 9000 kata per paket); 24 modul menjadi **8 paket**:

| Paket | Modul | Alasan pengelompokan |
| --- | --- | --- |
| P1 | `kul-u-101`, `kul-u-102`, `kul-u-201` | Seri Python jalur U; `kul-u-101` berangkat dari pilot yang sudah ada. |
| P2 | `kul-u-202`, `kul-u-301`, `kul-i-305` | AI, proyek lintas disiplin, etika profesi (konseptual, kasus, kebijakan AI). |
| P3 | `kul-i-101`, `kul-i-102`, `kul-i-103` | Fondasi jalur I (C++ dan matematika diskret). |
| P4 | `kul-i-201`, `kul-i-202`, `kul-i-203` | Algoritma, basis data, organisasi komputer dan sistem operasi. |
| P5 | `kul-i-204`, `kul-i-205`, `kul-i-304` | RPL (termasuk berbantuan AI), web, interaksi manusia-komputer. |
| P6 | `kul-i-301`, `kul-i-302`, `kul-i-303` | Jaringan dan keamanan, paralel dan cloud, AI dan ML. |
| P7 | `kul-i-306`, `kul-i-307`, `kul-i-401` | Pilihan dan kapstone. |
| P8 | `kul-k-201`, `kul-k-301`, `kul-k-401` | Jalur K (C++, kontes, soal tertaut). |

| Gelombang | Paket | Agen paralel | Syarat mulai |
| --- | --- | --- | --- |
| 0 (orchestrator) | Skema indeks digabung; pilot disetujui | 0 | Tanpa skema, indeks tidak dapat diisi; pilot menjadi acuan gaya. |
| 1 | P1, P3 | 2 | Kalibrasi gaya: satu jalur U dan satu jalur I. |
| 2 | P2, P4, P8 | 3 | Setelah gelombang 1 lolos gerbang mutu. |
| 3 | P5, P6 | 2 | Prasyarat dari P3 dan P4 sudah tertulis. |
| 4 | P7 | 1 | Kapstone mengacu hampir seluruh jalur I. |

Paralel hanya dalam satu gelombang karena tiap paket menulis berkas berbeda.
Mata kuliah yang bergantung (prasyarat) menaut ke **tabel bagian 3**, bukan ke
isi modul yang mungkin belum ada; "Ingat kembali" lintas mata kuliah hanya
memakai pokok bahasan prasyarat dari kolom `topics` corpus.

### 7.2 Aturan isolasi

- Agen hanya membuat `content/kuliah-coding/modules/<id>.md` untuk id
  paketnya; tidak menyunting `modules.json`, corpus, silabus, atau modul lain.
- Perbedaan gaya atau istilah antar-paket dicatat sebagai temuan; orchestrator
  yang menyelaraskan.
- Satu issue per gelombang; satu commit per paket; tanpa `push` oleh agen.
- Pengisian `modules.json` oleh orchestrator, bersama
  `bun run validate --program kuliah-coding`.

### 7.3 Gerbang mutu

| Gerbang | Pemeriksaan | Cara |
| --- | --- | --- |
| G1 Struktur | Semua judul bagian 5 ada dan berurutan; spanduk `DRAF`; 4 sampai 6 bagian; panjang 2500 sampai 4000 kata | Skrip judul dan `wc -w` |
| G2 Corpus | Tabel pertemuan mengacu CPMK corpus; hanya `kaCodes` mata kuliah itu; topik tidak ditambah; CPL prodi tidak diisi | Pencocokan tabel bagian 3 dan 4 |
| G3 Pedagogi | Prediksi sebelum menjalankan; contoh terselesaikan menurut tingkat (bagian 5.1); kuis pembuka berjarak; latihan bercampur dan kuis kumulatif; berpasangan untuk praktikum; ulang berjarak | Daftar periksa |
| G4 Akurasi | C++ lolos `check:module-code` dan dijalankan; bahasa lain dijalankan dengan versi dicatat; keluaran cocok; tiap klaim punya rujukan yang dibuka | Berkas log verifikasi di laporan |
| G5 AI dan privasi | Tingkat AI sesuai kolom bagian 3; log, gerbang kesiapan, tanpa AI di kontes; data sintetis; `privacy-check` bersih | Pencarian teks dan `privacy-check` |
| G6 Orisinalitas | Tidak ada soal atau teks salinan; semua tautan `https` resmi dan dibuka | Peninjau membuka sampel |
| G7 Tinjauan independen | Agen tinjau lain (bukan penulis) mengerjakan daftar G1 sampai G6; orchestrator memeriksa sampel (sekitar satu dari tiga modul pada gelombang kalibrasi) | Laporan tinjau |
| G8 Status | Semua `draf`; tidak ada `disetujui` | Pemeriksaan indeks |

Gerbang gelombang: `bun run format:check`, `lint`, `assist:check`, `typecheck`,
`bun test`, `validate`, `privacy-check`, `check:module-code`, dan
`check:fidelity` bila corpus tersentuh (AGENTS.md).

## 8. Pertanyaan keputusan untuk pemilik

Hanya orchestrator yang menyajikan ini ke pemilik (dialog pilihan baku).
Rekomendasi di urutan pertama.

**Q1. Bagaimana satu modul satu semester dibentuk di berkas?**

| Opsi | Konsekuensi |
| --- | --- |
| **A. Satu berkas per mata kuliah, 4 sampai 6 bagian, peta pertemuan di dalamnya (Disarankan)** | Cocok 1:1 dengan indeks 24 modul dan keputusan pemilik; mudah ditinjau per mata kuliah; berkas panjang (2500 sampai 4000 kata) |
| B. Modul induk ditambah satu berkas per bagian atau pekan | Berkas pendek dan mudah dirujuk; indeks 24 modul tidak lagi memuat isi lengkap, perlu aturan tambahan di skema, dan jumlah berkas menjadi sekitar 120 |
| C. Satu berkas per pertemuan (336 berkas) | Paling modular; bertentangan dengan keputusan "satu modul per mata kuliah" dan memberatkan tinjauan |

**Q2. Tingkat AI untuk 15 mata kuliah yang belum dinyatakan di silabus 6.3 (hanya 9 yang dinyatakan)?**

| Opsi | Konsekuensi |
| --- | --- |
| **A. Modul menulis usulan baku `[asumsi]`: Kuning untuk tugas pemrograman dasar sampai menengah, Hijau untuk proyek dan eksplorasi, Merah untuk ujian praktik; dosen dapat mengubah per tugas (Disarankan)** | Sejalan dengan silabus ("dosen menetapkan tingkat per tugas"); mahasiswa memperoleh kejelasan; memerlukan tinjauan pemilik atas usulan itu |
| B. Modul hanya menaut ke kebijakan silabus dan tidak menyebut tingkat | Tidak menambah asumsi; mahasiswa dan dosen kurang terbantu, dan dua mata kuliah serupa dapat berbeda perlakuan |
| C. Kuning untuk semua mata kuliah yang belum dinyatakan | Paling ketat dan seragam; menghalangi pemakaian AI sah di proyek dan etika profesi |

**Q3. Bagaimana contoh Python, SQL, TypeScript, shell, dan assembly dibuktikan benar (belasan mata kuliah memuatnya)?**

| Opsi | Konsekuensi |
| --- | --- |
| **A. Penulis menjalankan tiap contoh dan mencatat versi alat dan keluaran; buka issue terpisah untuk perluasan `check:module-code` (Disarankan)** | Tidak menunda gelombang 1; bergantung disiplin penulis sampai skrip ada; satu issue tambahan |
| B. Perluas pemeriksa kode **sebelum** menulis gelombang 1 | Pemeriksaan otomatis seperti C++; penulisan tertunda, memerlukan PR dan dependensi di luar scope dokumen ini |
| C. Hanya tinjauan manusia | Tercepat; risiko contoh salah sampai ke mahasiswa |

## 9. Pilot

Modul contoh lengkap untuk satuan pertama menurut corpus:
[`rancangan-modul-contoh/kul-u-101.md`](rancangan-modul-contoh/kul-u-101.md)
(Python, bukan C++; enam bagian). Verifikasi penyusun (Python 3.12.3, Git 2.43.0): dari 13 blok
Python, 9 dijalankan dengan `python3 -I` dan keluarannya cocok dengan yang
tertulis; 1 sengaja gagal dengan `AssertionError` sebagaimana dijelaskan; 3
blok berlubang (`___`) tidak dijalankan, tetapi versi terisi menurut kunci
dijalankan terpisah dan cocok; urutan perintah Git dijalankan di folder
sementara. Tautan Python tutorial, modul `csv`, dan referensi Git dibuka
2026-11-19. Tidak ada blok C++ pada satuan ini.

## 10. Keputusan rancangan penyusun dan temuan

| Butir | Keputusan atau temuan | Status |
| --- | --- | --- |
| Pola 14 pertemuan dan ujian setelah pertemuan 7 dan 14 | Mengikuti silabus 2.3 | `[asumsi]` di silabus |
| Pembagian pertemuan per bagian (bagian 4) | Disusun penyusun dari kolom `topics`; tidak menambah topik | `[asumsi]` |
| Lima kontes di `kul-k-201` pada pertemuan 4, 6, 9, 11, 14 | Penempatan penyusun | `[asumsi]` |
| `kul-u-202` tanpa prasyarat tetapi bergerbang kesiapan yang bergantung keterampilan memprogram | Mahasiswa non-pemrogram memakai AI hanya pada tugas non-kode sampai gerbang terpenuhi; perlu keputusan dosen atau pemilik bila ingin lain | Temuan |
| `kul-i-203` assembly dan `kul-i-306` bahasa | Arsitektur instruksi dan bahasa belum ditetapkan silabus; penulis memilih dan mencatat | Temuan |
| Dokumen basi bila rancangan disetujui | `README.md` program (bagian "Pekerjaan lanjutan") dan `docs/programs/README.md` bila memuat status modul; AGENTS.md (tabel `content/`) | Catatan untuk orchestrator |
| Di luar scope | `check:module-code` hanya mengompilasi blok `cpp` | Lihat Q3 |
| Temuan corpus | Beberapa `kaCodes` mata kuliah tidak punya tingkat pemetaan di `knowledge-areas.json` (mis. AL pada `kul-u-101`, MSF pada `kul-u-102`, SDF pada `kul-u-301`; ditandai "tingkat tidak tercatat" di tabel). Modul tetap memakai `kaCodes` corpus apa adanya; selisih ini perlu ditinjau pemilik corpus, bukan diperbaiki modul | Catatan untuk orchestrator |
| Peringatan editor markdown | Templat menaruh `###` bernama sama di tiap bagian sehingga linter markdown (MD024) memberi peringatan; sengaja demi keterbacaan | Diterima |

## Changelog

| Versi | Tanggal | Perubahan |
| --- | --- | --- |
| v0.1.0 | 2026-11-19 | Dokumen pertama: pemetaan 24 modul, struktur internal per mata kuliah, templat berbasis bukti, aturan rujukan, gelombang dan gerbang mutu, tiga pertanyaan keputusan, dan pilot `kul-u-101`. |
| v0.1.1 | 2026-11-19 | Sinkron dokumen (#124): catatan status; 24 modul kini ada di `content/kuliah-coding/` dan terindeks; pilot menjadi riwayat. Isi rancangan tidak berubah. |
