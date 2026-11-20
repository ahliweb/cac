# Rancangan Seri Modul Jalur A dan B (sma-coding): 154 Modul, Satu per Minggu

- **Version:** v0.3.0
- **Last updated:** 2026-11-20
- **Status:** Rancangan **DISETUJUI pemilik 2026-11-19** lewat dialog keputusan (bagian 8): pertanyaan 1 opsi "Setujui, evaluasi guru paralel" (templat dan rancangan disetujui; penulisan tidak dijeda, evaluasi guru nyata berjalan paralel dan temuannya diperbaiki lewat PR revisi), pertanyaan 2 opsi "Per semester, A dan B paralel", pertanyaan 3 opsi "Soal orisinal + tautan resmi". Pertanyaan 4 tidak diajukan ke pemilik; orchestrator memakai opsi yang disarankan (pemeriksaan sintaks `ts`/`js` digabung sebelum P1 B) karena pemeriksaan itu sudah selesai dibuat. Persetujuan ini untuk rancangan, bukan modul: semua modul jalur A dan B yang ditulis berstatus `draf` (ADR-0007). Dua keputusan lanjutan pemilik 2026-11-20 (formulir kontak `b-xii2-m5` dan cadangan lab tanpa Docker; issue #269) dicatat di bagian 8.
- **Changeset:** `.changeset/rancangan-modul-ab.md` (patch): dokumen rancangan saja; tidak mengubah `content/`, `data/`, `src/`, atau silabus.
- **Issue:** [#237](https://github.com/ahliweb/osn/issues/237); lanjutan dari issue #124 (seri modul belajar siswa SMA).

> **Konten karangan.** Dokumen ini konten karangan menurut
> [ADR-0007](../../architecture/adr/0007-authored-learning-content.md), bukan
> transkripsi sumber resmi. Modul yang kelak ditulis berstatus `draf`; hanya
> manusia yang menyetujui (ADR-0007). Dokumen ini tidak menyetujui apa pun
> atas nama pemilik dan tidak menjawab pertanyaan bagian 8.

## 0. Cara membaca dokumen ini

Dokumen ini adalah saudara
[`rancangan-modul-cde.md`](rancangan-modul-cde.md) (disetujui pemilik
2026-11-19; modul C, D, E sudah ditulis). Yang **sama** dipakai dengan
merujuk bagiannya, tanpa disalin: templat modul (bagian 5.1 sampai 5.4 CDE),
aturan contoh kode (5.5), kebijakan AI (5.7), aturan rujukan (6), dan
mekanisme gelombang serta gerbang mutu (7). Dokumen ini hanya menambah yang
khas jalur A dan B. "Bagian 5.1 CDE" berarti bagian 5.1 dokumen CDE; "bagian 5.1"
tanpa awalan berarti bagian dokumen ini.

- `[belum terverifikasi]`: tidak dapat dipastikan dari sumber yang benar-benar
  dibuka penyusun pada 2026-11-19; bukan fakta.
- `[asumsi]`: keputusan perancangan penyusun, bukan data resmi.
- Kode minggu, topik, dan butir CP dipakai persis seperti
  [silabus.md](silabus.md) v1.4.0 dan `data/sma-coding/` (`weeks.json`,
  `tracks.json`, `cp-mapping.json`, `osn-bridge.json`, `smp-bridge.json`).
  Dokumen ini tidak membuat kode baru.
- Tabel bagian 4.1 dan 4.2 **dibangkitkan dengan skrip** dari `weeks.json`
  dan `cp-mapping.json` (2026-11-19), bukan diketik tangan; kolom topik
  adalah kutipan `weeks.json`, bukan karangan. Bila silabus berubah, tabel
  dihitung ulang. Skrip pembangkit tidak disimpan di repositori (ia alat
  penyusun sekali pakai); aturannya dijelaskan di bagian 3.
- Untuk minggu `B-XI2-M10` dan `B-XII2-M10` rumusan dasar hukum di silabus
  sedang direvisi (issue #238). Dokumen ini hanya mengutip **topik** keduanya,
  bukan tujuan atau keluarannya.

## 1. Latar dan batas

Jalur A (Algoritmik dengan C++) dan jalur B (Web dengan JavaScript,
TypeScript, dan Bun) berstatus `cpStatus` `dalam-cp` di `tracks.json`, **sama
seperti jalur C** dan **berbeda dari jalur D dan E** yang pengayaan. Akibatnya:

- Modul A dan B **mencatat `cpItems`** sesuai `cp-mapping.json` pada minggunya
  (kolom "Butir CP" bagian 4). Hanya 56 dari 77 minggu jalur A dan 60 dari 77
  minggu jalur B yang punya butir terpetakan; sisanya bertanda `-` dan
  `cpItems`-nya `[]` (modul itu tidak dihitung memenuhi butir CP apa pun).
- **Memenuhi dan mendukung** (dibedakan seperti modul C):
  - butir **tanpa tanda** di tabel: pemetaan silabus menghitung jalur itu
    memenuhi butir tersebut pada minggu tersebut. Modul draf menyatakannya
    sebagai "dipetakan silabus sebagai dipenuhi jalur ini; modul draf ini
    belum dihitung sebagai pemenuhan", sama seperti `c-x1-m8`;
  - butir bertanda **(mendukung)**: pemetaan silabus menandai jalur itu
    **parsial** (`partialTracks`). Untuk A dan B hanya empat minggu:
    `B-X2-M11` (`E-LD-a`), `B-XI2-M10` (`F-LD-e`), `B-XI2-M11` (`F-BK-d`),
    `B-XII1-M10` (`F-LD-i`). Modul menyatakan "hanya mendukung sebagian butir
    ini".
  - Pada indeks, `cpItems` memuat **semua** kode kolom (memenuhi dan
    mendukung), seperti jalur C.
- Semester X1 hanya minggu 8 sampai 14 (tujuh minggu per jalur); minggu 1
  sampai 7 adalah blok fondasi bersama (`FND-X1-M1..M7`, `foundation.json`).
  Maka modul pembuka `a-x1-m8` dan `b-x1-m8` bersandar pada kode fondasi.
  Semester lain 14 minggu. Tiap jalur 7 + 5 x 14 = 77 minggu.
- Yang ditulis hanya modul **siswa** (`audience: siswa`, bahasa Indonesia).
  Tidak ada lembar siswa terpisah dan tidak ada panduan guru (itu bentuk TK
  dan SD).

## 2. Ringkasan 154 modul

| Jalur | materi | proyek-mini | proyek-akhir | asesmen-refleksi | Jumlah |
| --- | --- | --- | --- | --- | --- |
| A | 63 | 4 | 4 | 6 | 77 |
| B | 53 | 4 | 14 | 6 | 77 |
| **Jumlah** | **116** | **8** | **18** | **12** | **154** |

Aturan jenis `[asumsi]` (sama dengan CDE bagian 2: minggu 14 asesmen dan
refleksi; minggu 13 proyek mini; rangkaian proyek akhir):

- **asesmen-refleksi:** minggu 14 tiap semester (12 modul, termasuk
  `B-XII2-M14` yang di silabus berjudul "Asesmen").
- **proyek-mini:** minggu 13 pada X1, X2, XI1, dan XI2 untuk kedua jalur
  (`A-XI2-M13` "Proyek: analisis data terbuka" dan `B-XI2-M13` "Proyek:
  aplikasi data" diperlakukan sebagai proyek mini seperti `C-XI2-M13`).
- **proyek-akhir:** `A-XII1-M13`, `A-XII2-M11` sampai `M13`; `B-XII1-M13` dan
  seluruh `B-XII2-M1` sampai `M13` (rangkaian kebutuhan, rancangan, tiga sprint,
  ulasan, presentasi, portofolio, seperti `D-XII2`).
- **materi:** selebihnya. Termasuk `A-XII2-M5` sampai `M8` ("Latihan terpadu
  I sampai IV"), yang berbentuk materi dengan latihan **tanpa AI** (bagian
  5.2 dan silabus 7.4).

## 3. Id modul dan kesesuaian dengan skema

**Id modul = kode minggu huruf kecil**: `A-X1-M8` menjadi `a-x1-m8`,
`B-XII2-M13` menjadi `b-xii2-m13`. Pemeriksaan terhadap kode nyata
(2026-11-19):

- `slugSchema` (`src/schema/common.ts`, pola `^[a-z0-9]+(-[a-z0-9]+)*$`)
  **menerima** seluruh 154 id (diuji pada skrip pembangkit); tidak ada
  tabrakan id antarmodul dan tidak ada tabrakan dengan 239 id yang sudah ada.
- `smaModuleSchema` (`src/schema/sma-module.ts`) mewajibkan: `contentPath`
  tepat `content/sma-coding/modules/<id>.md`; `weekCodes` boleh kosong
  tetapi seri ini mengisinya satu kode minggu; `gradeLevels` minimal satu;
  `references` minimal satu dengan https; `cpItems`, `weekCodes`,
  `bridgeFamilies`, `gradeLevels`, `prerequisites` unik.
- Domain `src/domain/sma-modules.ts` memeriksa: butir CP ada di
  `cp-elements.json` (semua kode di tabel diperiksa skrip: ada); kode minggu
  ada di `weeks.json` atau `foundation.json`; keluarga OSN ada di
  `data/osn/topic-families.json`; prasyarat adalah id yang **sudah terindeks**
  atau kode `FND-X1-Mn`, dan tidak ada siklus. Aturan "`cpItems` kosong"
  hanya berlaku untuk modul berawalan `d-` atau `e-` dan minggu jalur
  pengayaan; jalur A dan B **tidak** terkena aturan itu.

| Bidang indeks | Aturan untuk seri ini |
| --- | --- |
| `id` | kode minggu huruf kecil; berkas `content/sma-coding/modules/<id>.md` |
| `title` | topik minggu dari `weeks.json` (judul yang sama dipakai dua kali dalam satu jalur diberi keterangan semester) |
| `weekCodes` | tepat satu: kode minggunya |
| `cpItems` | kolom "Butir CP" bagian 4 (memenuhi dan mendukung); boleh kosong |
| `bridgeFamilies` | jalur A: keluarga OSN dari `osn-bridge.json` (bagian 4.3); jalur B: `[]` |
| `gradeLevels` | satu kelas dari kode minggu (`X`, `XI`, `XII`) |
| `prerequisites` | kolom prasyarat: id modul yang lebih awal atau kode `FND-X1-Mn` |
| `references` | minimal satu, https (CDE bagian 6) |

**Urutan penulisan dan indeks.** Seperti CDE bagian 3: modul ditulis
menurut urutan minggu, prasyarat di tabel hanya menunjuk modul yang lebih
awal di jalur yang sama (diperiksa skrip: tidak ada siklus, semua id ada,
semua lebih awal), dan **entri indeks ditambahkan orchestrator**, satu kali
per gelombang; agent penulis hanya menyentuh berkas modulnya.

**Aturan prasyarat `[asumsi]`** (diterapkan skrip, sama dengan CDE bagian 3):

- materi, proyek mini, dan asesmen merujuk **modul materi terdekat
  sebelumnya** di jalur itu (sehingga awal semester merujuk materi terakhir
  semester lalu, melewati proyek mini dan asesmen); modul proyek-akhir
  merujuk materi atau proyek-akhir terdekat sebelumnya;
- ditambah rujukan silang eksplisit yang bergantung topik (mis.
  `a-x2-m11` rekursi pada fungsi `a-x1-m12`; `a-xi2-m5` graf pada larik dua
  dimensi `a-x2-m3` dan `vector` `a-x2-m6`; `b-xi1-m5` Bun pada lingkungan
  `b-x1-m8`; `b-xii2-m9` ulasan keamanan pada `b-xi2-m10` dan `b-xii1-m10`);
- asesmen menilai seluruh materi semesternya; kolom hanya mencantumkan satu
  modul sebagai prasyarat formal;
- modul pembuka: `a-x1-m8` pada `FND-X1-M1` dan `FND-X1-M3` (sama dengan
  `c-x1-m8`); `b-x1-m8` pada `FND-X1-M1` dan `FND-X1-M2` (komputer; perangkat
  lunak, berkas, dan lisensi, yang dibutuhkan untuk editor, Git, dan
  penjalan skrip) `[asumsi]`.

## 4. Pemetaan 154 modul

Kolom "Butir CP" dihitung dari `cp-mapping.json` (`mappings`, hanya minggu
jalur itu). `(mendukung)` berarti parsial (bagian 1).

### 4.1 Jalur A: Algoritmik dengan C++ (77 modul)

| Id modul | Kode minggu | Topik minggu (`weeks.json`) | Butir CP (`cp-mapping.json`) | Prasyarat | Jenis |
| --- | --- | --- | --- | --- | --- |
| `a-x1-m8` | `A-X1-M8` | Lingkungan g++, algoritma, pseudocode, diagram alir | `E-BK-d` | `FND-X1-M1`, `FND-X1-M3` | materi |
| `a-x1-m9` | `A-X1-M9` | Variabel, tipe data, ekspresi; masukan dan keluaran | `E-BK-d` | `a-x1-m8` | materi |
| `a-x1-m10` | `A-X1-M10` | Percabangan dan logika Boolean | `E-BK-d` | `a-x1-m9` | materi |
| `a-x1-m11` | `A-X1-M11` | Perulangan | `E-BK-d` | `a-x1-m10` | materi |
| `a-x1-m12` | `A-X1-M12` | Fungsi dan parameter | `E-BK-d` | `a-x1-m11` | materi |
| `a-x1-m13` | `A-X1-M13` | Proyek mini: data berkualitas | `E-BK-b` | `a-x1-m12` | proyek-mini |
| `a-x1-m14` | `A-X1-M14` | Asesmen dan refleksi | - | `a-x1-m12` | asesmen-refleksi |
| `a-x2-m1` | `A-X2-M1` | Array satu dimensi | `E-BK-d` | `a-x1-m12` | materi |
| `a-x2-m2` | `A-X2-M2` | String | `E-BK-d` | `a-x2-m1` | materi |
| `a-x2-m3` | `A-X2-M3` | Array dua dimensi | `E-BK-d` | `a-x2-m2`, `a-x2-m1` | materi |
| `a-x2-m4` | `A-X2-M4` | Ulasan dan penelusuran galat; aritmetika dasar | - | `a-x2-m3`, `a-x1-m12` | materi |
| `a-x2-m5` | `A-X2-M5` | FPB, KPK, bilangan prima | - | `a-x2-m4` | materi |
| `a-x2-m6` | `A-X2-M6` | Struktur data: daftar (`vector`) | `E-BK-a`, `E-BK-c` | `a-x2-m5`, `a-x2-m1` | materi |
| `a-x2-m7` | `A-X2-M7` | Struktur data: tumpukan (stack) dan antrian (queue) | `E-BK-a`, `E-BK-c` | `a-x2-m6` | materi |
| `a-x2-m8` | `A-X2-M8` | Pencarian sekuensial dan biner | `E-BK-a`, `E-BK-c` | `a-x2-m7`, `a-x2-m1` | materi |
| `a-x2-m9` | `A-X2-M9` | Pengurutan: bubble sort | `E-BK-a`, `E-BK-c` | `a-x2-m8` | materi |
| `a-x2-m10` | `A-X2-M10` | Pengurutan: insertion sort | `E-BK-a`, `E-BK-c` | `a-x2-m9` | materi |
| `a-x2-m11` | `A-X2-M11` | Pengantar rekursi | - | `a-x2-m10`, `a-x1-m12` | materi |
| `a-x2-m12` | `A-X2-M12` | Efisiensi intuitif | - | `a-x2-m11`, `a-x2-m9` | materi |
| `a-x2-m13` | `A-X2-M13` | Proyek mini: pengelolaan data tabel | `E-BK-c` | `a-x2-m12` | proyek-mini |
| `a-x2-m14` | `A-X2-M14` | Asesmen dan refleksi | - | `a-x2-m12` | asesmen-refleksi |
| `a-xi1-m1` | `A-XI1-M1` | Proses rekayasa program | `F-BK-a` | `a-x2-m12` | materi |
| `a-xi1-m2` | `A-XI1-M2` | Kualitas kode dan pengujian | `F-AP-c`, `F-BK-a` | `a-xi1-m1` | materi |
| `a-xi1-m3` | `A-XI1-M3` | Pencarian lengkap (complete search); operasi bit dasar (pengayaan, dari A-X2-M12 v1.0) | `F-AP-a`, `F-AP-b`, `F-BK-b` | `a-xi1-m2`, `a-x2-m12` | materi |
| `a-xi1-m4` | `A-XI1-M4` | Pencarian lengkap dan pemangkasan | `F-AP-a`, `F-AP-b`, `F-BK-b` | `a-xi1-m3` | materi |
| `a-xi1-m5` | `A-XI1-M5` | Greedy I | `F-AP-a`, `F-AP-b`, `F-BK-b` | `a-xi1-m4` | materi |
| `a-xi1-m6` | `A-XI1-M6` | Greedy II | `F-AP-a`, `F-AP-b`, `F-BK-b` | `a-xi1-m5` | materi |
| `a-xi1-m7` | `A-XI1-M7` | Rekursi dan divide-and-conquer | `F-AP-a`, `F-AP-b`, `F-BK-b` | `a-xi1-m6`, `a-x2-m11` | materi |
| `a-xi1-m8` | `A-XI1-M8` | Merge sort, quick sort, `std::sort` | `F-AP-a`, `F-AP-b` | `a-xi1-m7`, `a-x2-m10` | materi |
| `a-xi1-m9` | `A-XI1-M9` | Pustaka standar: `pair`, `set`, `map` | `F-AP-a`, `F-AP-b`, `F-AP-d`, `F-BK-c` | `a-xi1-m8` | materi |
| `a-xi1-m10` | `A-XI1-M10` | Antrian prioritas (heap) | `F-AP-a`, `F-AP-b`, `F-AP-d`, `F-BK-c` | `a-xi1-m9`, `a-x2-m7` | materi |
| `a-xi1-m11` | `A-XI1-M11` | Backtracking | `F-AP-a`, `F-AP-b`, `F-BK-b` | `a-xi1-m10`, `a-xi1-m4`, `a-x2-m11` | materi |
| `a-xi1-m12` | `A-XI1-M12` | Membandingkan strategi | `F-AP-a`, `F-AP-b`, `F-BK-b` | `a-xi1-m11` | materi |
| `a-xi1-m13` | `A-XI1-M13` | Proyek mini | `F-AP-b` | `a-xi1-m12` | proyek-mini |
| `a-xi1-m14` | `A-XI1-M14` | Asesmen dan refleksi | - | `a-xi1-m12` | asesmen-refleksi |
| `a-xi2-m1` | `A-XI2-M1` | Pemrograman dinamis: gagasan | `F-AP-a`, `F-AP-b`, `F-BK-b` | `a-xi1-m12`, `a-xi1-m7` | materi |
| `a-xi2-m2` | `A-XI2-M2` | DP satu dimensi | `F-AP-a`, `F-AP-b`, `F-BK-b` | `a-xi2-m1` | materi |
| `a-xi2-m3` | `A-XI2-M3` | Knapsack 0/1 | `F-AP-a`, `F-AP-b`, `F-BK-b` | `a-xi2-m2` | materi |
| `a-xi2-m4` | `A-XI2-M4` | DP pada string (pengayaan) | `F-AP-a`, `F-AP-b`, `F-BK-b` | `a-xi2-m3`, `a-x2-m2` | materi |
| `a-xi2-m5` | `A-XI2-M5` | Graf: representasi | `F-BK-c` | `a-xi2-m4`, `a-x2-m3`, `a-x2-m6` | materi |
| `a-xi2-m6` | `A-XI2-M6` | BFS | `F-BK-c` | `a-xi2-m5`, `a-x2-m7` | materi |
| `a-xi2-m7` | `A-XI2-M7` | DFS dan keterhubungan | `F-BK-c` | `a-xi2-m6`, `a-x2-m11` | materi |
| `a-xi2-m8` | `A-XI2-M8` | Grid sebagai graf | `F-BK-c` | `a-xi2-m7`, `a-x2-m3` | materi |
| `a-xi2-m9` | `A-XI2-M9` | Data bervolume besar I | `F-AD-a` | `a-xi2-m8` | materi |
| `a-xi2-m10` | `A-XI2-M10` | Data bervolume besar II | `F-AD-a` | `a-xi2-m9`, `a-xi1-m9` | materi |
| `a-xi2-m11` | `A-XI2-M11` | Sumber data terbuka dan legal | `F-AD-a` | `a-xi2-m10`, `FND-X1-M2` | materi |
| `a-xi2-m12` | `A-XI2-M12` | Prediksi sederhana | `F-AD-a` | `a-xi2-m11` | materi |
| `a-xi2-m13` | `A-XI2-M13` | Proyek: analisis data terbuka | `F-AD-a` | `a-xi2-m12` | proyek-mini |
| `a-xi2-m14` | `A-XI2-M14` | Asesmen dan refleksi | - | `a-xi2-m12` | asesmen-refleksi |
| `a-xii1-m1` | `A-XII1-M1` | Lintasan terpendek I | `F-BK-c` | `a-xi2-m12` | materi |
| `a-xii1-m2` | `A-XII1-M2` | Dijkstra | `F-BK-c` | `a-xii1-m1`, `a-xi1-m10` | materi |
| `a-xii1-m3` | `A-XII1-M3` | Pohon rentang minimum | `F-BK-c` | `a-xii1-m2` | materi |
| `a-xii1-m4` | `A-XII1-M4` | Himpunan saling lepas (DSU) | `F-BK-c` | `a-xii1-m3` | materi |
| `a-xii1-m5` | `A-XII1-M5` | Pohon berakar dan LCA | `F-BK-c` | `a-xii1-m4`, `a-xi2-m7` | materi |
| `a-xii1-m6` | `A-XII1-M6` | Aturan berhitung I | - | `a-xii1-m5` | materi |
| `a-xii1-m7` | `A-XII1-M7` | Aturan berhitung II | - | `a-xii1-m6` | materi |
| `a-xii1-m8` | `A-XII1-M8` | Aritmetika modular | - | `a-xii1-m7`, `a-x2-m5` | materi |
| `a-xii1-m9` | `A-XII1-M9` | Pohon Fenwick | `F-BK-c` | `a-xii1-m8`, `a-xi1-m3` | materi |
| `a-xii1-m10` | `A-XII1-M10` | Segment tree (pengayaan) | `F-BK-c` | `a-xii1-m9` | materi |
| `a-xii1-m11` | `A-XII1-M11` | Geometri dasar | - | `a-xii1-m10` | materi |
| `a-xii1-m12` | `A-XII1-M12` | Program multi-berkas dan library | `F-AP-d` | `a-xii1-m11`, `a-xi1-m2` | materi |
| `a-xii1-m13` | `A-XII1-M13` | Proyek | - | `a-xii1-m12` | proyek-akhir |
| `a-xii1-m14` | `A-XII1-M14` | Asesmen dan refleksi | - | `a-xii1-m12` | asesmen-refleksi |
| `a-xii2-m1` | `A-XII2-M1` | Pemeliharaan program I | `F-AP-c` | `a-xii1-m12`, `a-xi1-m2` | materi |
| `a-xii2-m2` | `A-XII2-M2` | Pemeliharaan program II | `F-AP-c` | `a-xii2-m1` | materi |
| `a-xii2-m3` | `A-XII2-M3` | Memodelkan masalah | - | `a-xii2-m2` | materi |
| `a-xii2-m4` | `A-XII2-M4` | Backtracking dan pruning lanjutan | - | `a-xii2-m3`, `a-xi1-m11` | materi |
| `a-xii2-m5` | `A-XII2-M5` | Latihan terpadu I | - | `a-xii2-m4` | materi |
| `a-xii2-m6` | `A-XII2-M6` | Latihan terpadu II | - | `a-xii2-m5` | materi |
| `a-xii2-m7` | `A-XII2-M7` | Latihan terpadu III | - | `a-xii2-m6` | materi |
| `a-xii2-m8` | `A-XII2-M8` | Latihan terpadu IV | `F-BK-b` | `a-xii2-m7` | materi |
| `a-xii2-m9` | `A-XII2-M9` | Ulasan struktur data | - | `a-xii2-m8`, `a-xii1-m10` | materi |
| `a-xii2-m10` | `A-XII2-M10` | Ulasan strategi | `F-BK-b` | `a-xii2-m9`, `a-xi2-m4` | materi |
| `a-xii2-m11` | `A-XII2-M11` | Proyek akhir: rancangan | `F-BK-a` | `a-xii2-m10` | proyek-akhir |
| `a-xii2-m12` | `A-XII2-M12` | Proyek akhir: implementasi dan pengujian | `F-BK-a` | `a-xii2-m11` | proyek-akhir |
| `a-xii2-m13` | `A-XII2-M13` | Proyek akhir: presentasi dan portofolio | `F-BK-a` | `a-xii2-m12` | proyek-akhir |
| `a-xii2-m14` | `A-XII2-M14` | Asesmen dan refleksi | - | `a-xii2-m10` | asesmen-refleksi |

### 4.2 Jalur B: Web dengan JavaScript, TypeScript, dan Bun (77 modul)

| Id modul | Kode minggu | Topik minggu (`weeks.json`) | Butir CP (`cp-mapping.json`) | Prasyarat | Jenis |
| --- | --- | --- | --- | --- | --- |
| `b-x1-m8` | `B-X1-M8` | Lingkungan kerja: peramban, editor, Bun, Git; algoritma dan pseudocode | `E-BK-d` | `FND-X1-M1`, `FND-X1-M2` | materi |
| `b-x1-m9` | `B-X1-M9` | Variabel, tipe, ekspresi (JS); masukan dan keluaran | `E-BK-d` | `b-x1-m8` | materi |
| `b-x1-m10` | `B-X1-M10` | Percabangan dan logika Boolean | `E-BK-d` | `b-x1-m9` | materi |
| `b-x1-m11` | `B-X1-M11` | Perulangan | `E-BK-d` | `b-x1-m10` | materi |
| `b-x1-m12` | `B-X1-M12` | Fungsi | `E-BK-d` | `b-x1-m11` | materi |
| `b-x1-m13` | `B-X1-M13` | Proyek mini | - | `b-x1-m12` | proyek-mini |
| `b-x1-m14` | `B-X1-M14` | Asesmen dan refleksi | - | `b-x1-m12` | asesmen-refleksi |
| `b-x2-m1` | `B-X2-M1` | Array | `E-BK-d` | `b-x1-m12` | materi |
| `b-x2-m2` | `B-X2-M2` | String dan templat | `E-BK-d` | `b-x2-m1` | materi |
| `b-x2-m3` | `B-X2-M3` | Objek dan JSON | `E-BK-d` | `b-x2-m2` | materi |
| `b-x2-m4` | `B-X2-M4` | HTML dasar | `E-LD-f` | `b-x2-m3`, `FND-X1-M4` | materi |
| `b-x2-m5` | `B-X2-M5` | CSS dasar dan responsif | `E-LD-f` | `b-x2-m4` | materi |
| `b-x2-m6` | `B-X2-M6` | DOM dan peristiwa | `E-LD-f` | `b-x2-m5`, `b-x1-m12` | materi |
| `b-x2-m7` | `B-X2-M7` | Struktur data: tumpukan dan antrian | `E-BK-a`, `E-BK-c` | `b-x2-m6`, `b-x2-m1` | materi |
| `b-x2-m8` | `B-X2-M8` | Pencarian sekuensial dan biner | `E-BK-a`, `E-BK-c` | `b-x2-m7`, `b-x2-m1` | materi |
| `b-x2-m9` | `B-X2-M9` | Pengurutan: bubble sort dan insertion sort | `E-BK-a`, `E-BK-c` | `b-x2-m8` | materi |
| `b-x2-m10` | `B-X2-M10` | Data berkualitas | `E-BK-b` | `b-x2-m9`, `b-x2-m3` | materi |
| `b-x2-m11` | `B-X2-M11` | Mesin pencari dan dokumentasi | `E-LD-a` (mendukung) | `b-x2-m10` | materi |
| `b-x2-m12` | `B-X2-M12` | Git dan kolaborasi dasar | `E-LD-f` | `b-x2-m11`, `b-x1-m8` | materi |
| `b-x2-m13` | `B-X2-M13` | Proyek mini: visualisasi algoritma | `E-BK-c`, `E-LD-f` | `b-x2-m12`, `b-x2-m6`, `b-x2-m9` | proyek-mini |
| `b-x2-m14` | `B-X2-M14` | Asesmen dan refleksi | - | `b-x2-m12` | asesmen-refleksi |
| `b-xi1-m1` | `B-XI1-M1` | Proses rekayasa produk digital | `F-BK-a` | `b-x2-m12` | materi |
| `b-xi1-m2` | `B-XI1-M2` | TypeScript I: tipe dasar | - | `b-xi1-m1`, `b-x1-m12` | materi |
| `b-xi1-m3` | `B-XI1-M3` | TypeScript II: `interface`, `type`, gabungan, generik dasar | - | `b-xi1-m2` | materi |
| `b-xi1-m4` | `B-XI1-M4` | `tsconfig` dan mode ketat | `F-AP-c` | `b-xi1-m3` | materi |
| `b-xi1-m5` | `B-XI1-M5` | Bun: runtime dan pengelola paket | - | `b-xi1-m4`, `b-x1-m8` | materi |
| `b-xi1-m6` | `B-XI1-M6` | Modul ESM dan paket | - | `b-xi1-m5` | materi |
| `b-xi1-m7` | `B-XI1-M7` | Pengujian dengan `bun test` | `F-AP-c` | `b-xi1-m6` | materi |
| `b-xi1-m8` | `B-XI1-M8` | Struktur data kompleks di TS | `F-AP-b`, `F-AP-d`, `F-BK-c` | `b-xi1-m7`, `b-x2-m7` | materi |
| `b-xi1-m9` | `B-XI1-M9` | Strategi algoritmik di TS | `F-AP-a`, `F-AP-b`, `F-BK-b` | `b-xi1-m8`, `b-x2-m9` | materi |
| `b-xi1-m10` | `B-XI1-M10` | Efisiensi dan alternatif solusi | `F-BK-b` | `b-xi1-m9` | materi |
| `b-xi1-m11` | `B-XI1-M11` | Kualitas kode | `F-AP-c` | `b-xi1-m10`, `b-xi1-m7` | materi |
| `b-xi1-m12` | `B-XI1-M12` | Alur kerja Git: cabang, pull request, ulasan | `F-AP-c`, `F-BK-a` | `b-xi1-m11`, `b-x2-m12` | materi |
| `b-xi1-m13` | `B-XI1-M13` | Proyek mini | `F-AP-b` | `b-xi1-m12` | proyek-mini |
| `b-xi1-m14` | `B-XI1-M14` | Asesmen dan refleksi | - | `b-xi1-m12` | asesmen-refleksi |
| `b-xi2-m1` | `B-XI2-M1` | Server HTTP dengan Bun | `F-AP-d` | `b-xi1-m12`, `FND-X1-M4`, `FND-X1-M5` | materi |
| `b-xi2-m2` | `B-XI2-M2` | Rute dan API JSON | `F-AP-d` | `b-xi2-m1` | materi |
| `b-xi2-m3` | `B-XI2-M3` | Validasi masukan | `F-AP-d` | `b-xi2-m2`, `b-xi1-m3` | materi |
| `b-xi2-m4` | `B-XI2-M4` | Berkas dan data JSON | `F-AD-a` | `b-xi2-m3`, `b-x2-m3` | materi |
| `b-xi2-m5` | `B-XI2-M5` | Sumber data terbuka dan legal | `F-AD-a` | `b-xi2-m4`, `FND-X1-M2` | materi |
| `b-xi2-m6` | `B-XI2-M6` | Pengolahan data bervolume lebih besar | `F-AD-a` | `b-xi2-m5` | materi |
| `b-xi2-m7` | `B-XI2-M7` | Visualisasi data | `F-AD-a` | `b-xi2-m6`, `b-x2-m6` | materi |
| `b-xi2-m8` | `B-XI2-M8` | Prediksi sederhana | `F-AD-a` | `b-xi2-m7` | materi |
| `b-xi2-m9` | `B-XI2-M9` | Mengonsumsi API publik | - | `b-xi2-m8`, `b-xi2-m2` | materi |
| `b-xi2-m10` | `B-XI2-M10` | Keamanan aplikasi dan UU | `F-LD-e` (mendukung), `F-LD-g` | `b-xi2-m9`, `FND-X1-M6` | materi |
| `b-xi2-m11` | `B-XI2-M11` | Jaringan: HTTP dan pemecahan masalah | `F-BK-d` (mendukung) | `b-xi2-m10`, `FND-X1-M4`, `FND-X1-M5` | materi |
| `b-xi2-m12` | `B-XI2-M12` | Penyajian statis (opsional) | - | `b-xi2-m11` | materi |
| `b-xi2-m13` | `B-XI2-M13` | Proyek: aplikasi data | - | `b-xi2-m12` | proyek-mini |
| `b-xi2-m14` | `B-XI2-M14` | Asesmen dan refleksi | - | `b-xi2-m12` | asesmen-refleksi |
| `b-xii1-m1` | `B-XII1-M1` | Astro: halaman statis dan komponen | `F-AP-d` | `b-xi2-m12`, `b-xi1-m6` | materi |
| `b-xii1-m2` | `B-XII1-M2` | Tata letak dan konten | `F-AP-d` | `b-xii1-m1` | materi |
| `b-xii1-m3` | `B-XII1-M3` | Menjelajahi `awcms-one` | `F-AP-d` | `b-xii1-m2`, `b-xi1-m12` | materi |
| `b-xii1-m4` | `B-XII1-M4` | Menjalankan `awcms-one` secara lokal (demo terpandu) | `F-AP-d` | `b-xii1-m3` | materi |
| `b-xii1-m5` | `B-XII1-M5` | `template:init` dan profil `landing` | `F-AP-d` | `b-xii1-m4` | materi |
| `b-xii1-m6` | `B-XII1-M6` | Kustomisasi merek dan konten | `F-AP-d`, `F-LD-f` | `b-xii1-m5` | materi |
| `b-xii1-m7` | `B-XII1-M7` | Tema, CSS, dan aksesibilitas | `F-LD-f` | `b-xii1-m6`, `b-x2-m5` | materi |
| `b-xii1-m8` | `B-XII1-M8` | SEO dasar | - | `b-xii1-m7` | materi |
| `b-xii1-m9` | `B-XII1-M9` | Pengujian dan gerbang mutu | `F-AP-c` | `b-xii1-m8`, `b-xi1-m7` | materi |
| `b-xii1-m10` | `B-XII1-M10` | Rahasia dan konfigurasi | `F-LD-i` (mendukung) | `b-xii1-m9`, `FND-X1-M6`, `b-xi2-m10` | materi |
| `b-xii1-m11` | `B-XII1-M11` | Dokumentasi dan lisensi | - | `b-xii1-m10`, `FND-X1-M2` | materi |
| `b-xii1-m12` | `B-XII1-M12` | Ulasan sejawat | `F-AP-c` | `b-xii1-m11`, `b-xi1-m12` | materi |
| `b-xii1-m13` | `B-XII1-M13` | Proyek | - | `b-xii1-m12` | proyek-akhir |
| `b-xii1-m14` | `B-XII1-M14` | Asesmen dan refleksi | - | `b-xii1-m12` | asesmen-refleksi |
| `b-xii2-m1` | `B-XII2-M1` | Kebutuhan pengguna | `F-BK-a`, `F-LD-d` | `b-xii1-m13` | proyek-akhir |
| `b-xii2-m2` | `B-XII2-M2` | Rancangan | `F-BK-a`, `F-LD-d` | `b-xii2-m1` | proyek-akhir |
| `b-xii2-m3` | `B-XII2-M3` | Sprint 1: konten | `F-BK-a`, `F-LD-f` | `b-xii2-m2` | proyek-akhir |
| `b-xii2-m4` | `B-XII2-M4` | Sprint 1: tampilan | `F-BK-a`, `F-LD-f` | `b-xii2-m3` | proyek-akhir |
| `b-xii2-m5` | `B-XII2-M5` | Sprint 2: fitur | `F-BK-a`, `F-LD-f` | `b-xii2-m4` | proyek-akhir |
| `b-xii2-m6` | `B-XII2-M6` | Sprint 2: pengujian | `F-BK-a`, `F-LD-f` | `b-xii2-m5` | proyek-akhir |
| `b-xii2-m7` | `B-XII2-M7` | Sprint 3: penyempurnaan | `F-BK-a`, `F-LD-f` | `b-xii2-m6` | proyek-akhir |
| `b-xii2-m8` | `B-XII2-M8` | Sprint 3: dokumentasi | `F-BK-a`, `F-LD-f` | `b-xii2-m7` | proyek-akhir |
| `b-xii2-m9` | `B-XII2-M9` | Ulasan keamanan | `F-BK-a` | `b-xii2-m8`, `b-xi2-m10`, `b-xii1-m10` | proyek-akhir |
| `b-xii2-m10` | `B-XII2-M10` | Privasi dan hukum | `F-BK-a`, `F-LD-g` | `b-xii2-m9`, `b-xi2-m10`, `FND-X1-M6` | proyek-akhir |
| `b-xii2-m11` | `B-XII2-M11` | Ulasan sejawat | `F-BK-a` | `b-xii2-m10`, `b-xii1-m12` | proyek-akhir |
| `b-xii2-m12` | `B-XII2-M12` | Presentasi | `F-BK-a` | `b-xii2-m11` | proyek-akhir |
| `b-xii2-m13` | `B-XII2-M13` | Portofolio dan refleksi | `F-BK-a` | `b-xii2-m12` | proyek-akhir |
| `b-xii2-m14` | `B-XII2-M14` | Asesmen | - | `b-xii1-m12` | asesmen-refleksi |

### 4.3 Jembatan ke OSN, SMP, dan modul lintas jalur

**Jembatan ke OSN (`data/sma-coding/osn-bridge.json`, silabus bagian 5.1).**
Jalur A menyiapkan sepuluh keluarga materi OSN; 45 dari 77 minggu A bertaut
ke satu atau lebih keluarga. Modul A mencatat keluarga itu pada
`bridgeFamilies` (jalur C memakai `[]`; di A jembatan OSN adalah tujuan
jalurnya). Topik bertanda **P** (pengayaan, melampaui CP; wajib bagi murid
yang menuju OSN dan opsional bagi kelas reguler, keputusan pemilik
2026-11-18) ditandai di modul sebagai bagian "Pengayaan (P)" yang boleh
dilewati. Modul tidak menjanjikan kedalaman soal OSN dan tidak menggantikan
pembinaan OSN. Jalur B bukan pembinaan OSN dan `bridgeFamilies`-nya `[]`.

| Id modul | `bridgeFamilies` (dari `osn-bridge.json`) |
| --- | --- |
| `a-x1-m9` | `dasar-pemrograman` |
| `a-x1-m10` | `dasar-pemrograman`, `logika-bitwise` |
| `a-x1-m11` | `dasar-pemrograman` |
| `a-x1-m12` | `dasar-pemrograman` |
| `a-x2-m1` | `struktur-data` |
| `a-x2-m2` | `struktur-data` |
| `a-x2-m3` | `struktur-data` |
| `a-x2-m4` | `aritmetika` |
| `a-x2-m5` | `aritmetika` |
| `a-x2-m6` | `struktur-data` |
| `a-x2-m7` | `struktur-data` |
| `a-x2-m8` | `search-sort` |
| `a-x2-m9` | `search-sort` |
| `a-x2-m10` | `search-sort` |
| `a-x2-m11` | `rekursi` |
| `a-xi1-m3` | `logika-bitwise`, `strategi-problem-solving` |
| `a-xi1-m4` | `strategi-problem-solving` |
| `a-xi1-m5` | `strategi-problem-solving` |
| `a-xi1-m6` | `strategi-problem-solving` |
| `a-xi1-m7` | `rekursi`, `strategi-problem-solving` |
| `a-xi1-m8` | `search-sort` |
| `a-xi1-m9` | `struktur-data` |
| `a-xi1-m10` | `struktur-data` |
| `a-xi1-m11` | `rekursi`, `strategi-problem-solving` |
| `a-xi1-m12` | `strategi-problem-solving` |
| `a-xi2-m1` | `strategi-problem-solving` |
| `a-xi2-m2` | `strategi-problem-solving` |
| `a-xi2-m3` | `strategi-problem-solving` |
| `a-xi2-m4` | `strategi-problem-solving` |
| `a-xi2-m5` | `graph-tree` |
| `a-xi2-m6` | `graph-tree` |
| `a-xi2-m7` | `graph-tree` |
| `a-xi2-m8` | `graph-tree` |
| `a-xii1-m1` | `graph-tree` |
| `a-xii1-m2` | `graph-tree` |
| `a-xii1-m3` | `graph-tree` |
| `a-xii1-m4` | `graph-tree`, `struktur-data` |
| `a-xii1-m5` | `graph-tree` |
| `a-xii1-m6` | `aturan-berhitung` |
| `a-xii1-m7` | `aturan-berhitung` |
| `a-xii1-m8` | `aritmetika` |
| `a-xii1-m9` | `struktur-data` |
| `a-xii1-m10` | `struktur-data` |
| `a-xii1-m11` | `geometri-dasar` |
| `a-xii2-m4` | `rekursi` |

**Jembatan dari SMP (`data/smp-coding/bridge.json`; `smp-bridge.json`).**
`data/smp-coding/bridge.json` merujuk `A-X1-M9` sampai `A-X1-M12` dan
`B-X1-M9` sampai `B-X1-M12`: kedelapan modul itu **mengajar dari awal tanpa
mengandaikan SMP**. Murid berlatar teks (Python di SMP) memakai tugas
**baca-dan-prediksi** dan soal setengah jadi sebelum menulis dari halaman
kosong. Maka pada `a-x1-m9..m12` dan `b-x1-m9..m12` urutan `Prediksi dulu`,
`Contoh setengah jadi`, `Soal Parsons` didahulukan sebelum soal `Latihan`
yang dimulai dari kosong, dan tugas baca-dan-prediksi ditandai "tanpa AI"
(keduanya sesuai `smp-bridge.json`). Sintaks C++ atau JavaScript tetap
dipelajari penuh. `a-x1-m8` dan `b-x1-m8` memakai pengamatan awal fondasi
(`FND-X1-M1`) sebagai latar, tanpa menyalinnya.

**Jembatan ke jalur E (CDE bagian 4.4).** `e-xi1-m10`, `e-xi1-m11`, dan
`e-xi2-m4` (simulator buatan sendiri) bergantung pada dasar pemrograman
setara `A-X1-M9..M12` (C++) atau `B-X1-M9..M12` (TypeScript dan Bun). Modul
A dan B tidak berisi materi kuantum; modul E sudah menyebutnya sebagai
prasyarat luar indeks.

### 4.4 Modul yang sudah ada dan terkait (bukan prasyarat)

Keterkaitan disarankan sebagai bacaan pendamping, **tidak mengikat sebagai
prasyarat**; penulis menaruhnya di "Langkah berikutnya" atau "Latihan
bercampur". Kolom matkom diambil dari `weekCodes` entri `modules.json`;
kolom pendamping dan cloud adalah penilaian penyusun `[asumsi]`.

| Modul yang sudah ada | Modul A dan B terkait |
| --- | --- |
| `matkom-sistem-bilangan-basis` | `a-x1-m9`, `b-x1-m9` |
| `matkom-bilangan-bertanda-dan-luapan` | `a-x1-m9`, `a-x2-m4`, `b-x1-m9` |
| `matkom-logika-proposisi` | `a-x1-m10`, `b-x1-m10` |
| `matkom-himpunan-relasi-fungsi` | `a-x1-m12`, `a-xi1-m9`, `a-xi2-m5`, `b-x1-m12`, `b-xi1-m8` |
| `matkom-teks-gambar-suara` | `a-x2-m2`, `a-x2-m3`, `b-x2-m2`, `b-x2-m5` |
| `matkom-induksi-dan-rekursi-matematis` | `a-x2-m11`, `a-xi1-m7`, `a-xi2-m1`, `a-xi2-m2`, `b-xi1-m9` |
| `matkom-pertumbuhan-fungsi` | `a-x2-m8`, `a-x2-m12`, `a-xi1-m8`, `a-xi1-m12`, `b-x2-m8`, `b-xi1-m10` |
| `fondasi-*` (tujuh modul fondasi) | prasyarat `FND-X1-Mn` pada tabel; `fondasi-keamanan-dasar` juga untuk `b-xii1-m10`, `b-xi2-m10` |
| `pendamping-keamanan-lanjut-konektivitas` | `b-xi2-m10` |
| `pendamping-model-jaringan-dan-troubleshooting` | `b-xi2-m11` |
| `pendamping-merancang-kebutuhan-sistem` | `b-xi1-m1`, `b-xii2-m1` |
| `pendamping-riset-dan-verifikasi-konten` | `b-x2-m11` |
| `cloud-konsep-dasar`, `cloud-deploy-sederhana` | `b-xi2-m12`, `b-xii2-m7` |
| `cloud-keamanan-dan-privasi` | `b-xii2-m9`, `b-xii2-m10` |

### 4.5 Prasyarat di luar indeks

| Modul | Prasyarat luar indeks | Sumber |
| --- | --- | --- |
| `a-x1-m9` sampai `a-x1-m12`, `b-x1-m9` sampai `b-x1-m12` | pengetahuan pemrograman **tidak** diasumsikan; murid berlatar teks SMP tetap menempuhnya | `smp-bridge.json`, silabus bagian 3.0 |
| `b-xii1-m3` sampai `b-xii1-m13`, `b-xii2-m3` sampai `b-xii2-m8` | repositori turunan template di mesin lab yang disiapkan guru (Docker dan PostgreSQL oleh guru, bukan murid); kelayakan profil `landing` tanpa `apps/cms` hidup belum diverifikasi | silabus bagian 6 `[belum terverifikasi]` |
| `b-xi2-m12` | penyajian statis opsional; hanya di lab atau jaringan sekolah | silabus 3.2 |

## 5. Templat dan aturan khas jalur A dan B

### 5.1 Templat, panjang, dan gerbang

**Dipakai persis seperti CDE:** templat materi (CDE 5.1: 16 judul `##` urut),
varian proyek-mini dan proyek-akhir (CDE 5.2), varian asesmen-refleksi
(CDE 5.3), panjang sasaran (CDE 5.4: 700 sampai 1200 kata prosa untuk
materi; 500 sampai 900 untuk proyek; 500 sampai 800 untuk asesmen; blok
kode, tabel, `Kunci dan petunjuk`, dan `Rujukan` tidak dihitung), larangan
mitos belajar (gaya belajar, otak kiri dan kanan, persentase retensi),
rantai `Ingat kembali` dan `Ulang berjarak` (jarak sekitar 1, 3, dan 8 minggu).
Berkas modul tidak memakai judul `#` dan tidak memakai bagian `## Rujukan`
(judul dan rujukan dirender dari indeks; judul ganda galat di
`check:learner-assets`). Panjang total seri sekitar 134 ribu kata prosa
`[asumsi, hitungan kasar: 116 materi x ~950 + 38 modul lain x ~650]`.

**Tambahan khas:** modul berkode memakai `Soal Parsons` dengan baris kode
acak; modul proyek-akhir jalur B yang berbentuk fase memakai `Rencana sprint`
(CDE 5.2).

### 5.2 Aturan khas jalur A (C++)

- **C++17.** Setiap blok `cpp` yang bisa dijalankan dikompilasi dan
  dijalankan penulis dengan `g++ -std=c++17 -Wall -Wextra` **tanpa
  peringatan**; **keluaran asli ditempel persis**. Contoh setengah jadi
  (`____`) tidak dikompilasi, tetapi kuncinya dikompilasi. Pemeriksa repositori
  (`check:module-code`) hanya `-fsyntax-only`; modul menyatakan bahwa itu
  "bisa dikompilasi", bukan "benar untuk semua masukan" (ADR-0004: repositori
  ini bukan penilai).
- **Masukan dan keluaran gaya soal kompetitif** (bagian "Masukan",
  "Keluaran", "Batasan", dan contoh masukan-keluaran) dipakai sebagai
  kebiasaan, tetapi **soal OSN, TOKI, IOI, ICPC, atau platform lain tidak
  disalin dan tidak diparafrasekan** (ADR-0007; CDE 6.2). Semua soal ditulis
  ulang secara orisinal oleh penulis. Sumber resmi hanya **ditautkan** bila
  perlu (mis. `https://osn.toki.id/`), tanpa menyalin soal.
- **Kompleksitas waktu** dibahas pada modul algoritma dan struktur data:
  `Contoh terselesaikan` memuat perkiraan banyak langkah (ditelusuri atau
  dihitung dari contoh, bukan klaim tanpa dasar) dan satu kalimat O-besar
  bila minggu itu sudah memperkenalkannya (`a-x2-m12` memperkenalkan
  efisiensi secara intuitif; `matkom-pertumbuhan-fungsi` sebagai bacaan
  pendamping). Sebelum `a-x2-m12`, modul menyebut "naik secara linear atau
  kuadrat" tanpa notasi.
- **Pemanasan OSN** mengikuti `osn-bridge.json` (bagian 4.3): bagian
  `Pengayaan (P)` hanya untuk keluarga yang ditandai P; tidak ada target
  kompetisi. Soal "bergaya OSN" di `a-xii2-m5` sampai `m8` ditulis orisinal
  (pertanyaan keputusan 4).
- **Tanpa AI** untuk `a-xii2-m5` sampai `m8` (latihan terpadu; silabus 7.4:
  melatih kemampuan menyelesaikan ulang sendiri), untuk semua modul
  asesmen-refleksi, dan untuk tugas baca-dan-prediksi `a-x1-m9..m12`
  (bagian 4.3). Kontes mini kelas (`a-xii2-m6`) dirancang di dalam modul
  sebagai kegiatan kelas berbatas waktu tanpa platform luar.
- **Data** pada `a-xi2-m9` sampai `m13` (berkas, rekap, sumber terbuka,
  prediksi, proyek analisis): hanya data **sintetis** atau data terbuka dengan
  lisensi yang tercatat; tidak ada data murid atau orang nyata. Modul `a-xi2-m11`
  membaca lisensi dengan benar dan tidak menyalin data dari modul jalur D.
- Masukan baku (`cin`/`cout`) dijalankan lewat berkas masukan di terminal;
  tidak ada layanan penilai daring dan tidak ada akun.

### 5.3 Aturan khas jalur B (JavaScript, TypeScript, Bun)

- **Dijalankan dengan `bun`** (`bun run <berkas>` atau yang ekuivalen yang
  dibaca penulis dari dokumentasi Bun); **keluaran asli ditempel persis**.
  Versi Bun dan pustaka (mis. Astro, Zod) ditulis **"per 2026-11"** dan
  versi yang benar-benar dipakai penulis; angka versi tidak dikarang. Catatan
  alat penyusun saat dokumen ini ditulis: Bun 1.4.4, g++ 13.3.0 (hanya
  informasi, bukan klaim kompatibilitas).
- **Tanpa layanan berbayar, tanpa akun pribadi siswa, tanpa kunci API,
  tanpa unggah data siswa nyata.** Semua modul bisa dikerjakan di mesin lab
  atau lokal. `b-xi2-m9` (API publik) hanya memakai API yang terbuka tanpa
  kunci dan tanpa akun, tautannya dibuka penulis; bila tidak ada yang
  memenuhi, modul memakai berkas JSON lokal sebagai tiruan. `b-xi2-m12`
  (penyajian statis, opsional) hanya di lab atau jaringan sekolah, bukan di
  layanan hosting luar yang butuh akun.
- **Server hanya lokal; formulir tanpa kirim dan simpan.** Server
  (`b-xi2-m1..m3`) di `localhost`; data contoh sintetis dan jelas palsu (mis.
  daftar tugas karangan). Formulir kontak (`b-xii2-m5`) tidak menyimpan,
  mencatat, atau mengirim data pribadi nyata.
  Catatan `b-xii2-m5` (keputusan pemilik 2026-11-20, opsi "Formulir harus di
  situs"): silabus meminta "formulir kontak (tanpa menyimpan data pribadi
  nyata)". Profil `landing` `awcms-one` tidak punya formulir kontak, dan FAQ
  halaman kontak berasal dari pengaturan CMS, bukan dari berkas seed. Modul
  karena itu menambahkan **bagian formulir pada halaman `/kontak` di
  repositori turunan `landing` murid sendiri** (storefront Astro): validasi
  di peramban, galat dan konfirmasi yang aksesibel, tanpa `fetch`,
  `localStorage`, atau endpoint, sehingga tidak ada data yang dikirim,
  disimpan, atau dicatat. Modul menjelaskan mengapa produk nyata butuh
  backend dan dasar hukum (UU PDP) sebelum menerima pesan. Prototipe
  `localhost` terpisah yang dirancang sebelumnya tidak lagi dipakai.
  Pengisian FAQ di CMS lab tetap tugas guru.
- **Keamanan web sesuai silabus.** `b-xi2-m10` memperkenalkan XSS, rahasia di
  variabel lingkungan, dan pokok UU ITE dan UU PDP; kerentanan
  didemonstrasikan hanya pada aplikasi kecil milik latihan di mesin lokal
  dengan masukan sintetis, bukan teknik menyerang situs nyata; rahasia dalam
  contoh adalah nilai palsu yang jelas (mis. `KUNCI_PALSU_CONTOH`), berkas
  `.env` selalu masuk `.gitignore`, dan tidak ada rahasia nyata di modul.
  `b-xii1-m10` melatih tidak meng-commit rahasia dan tidak menempelkannya ke
  asisten AI (silabus 7.4). Pasal atau pokok hukum hanya dikutip dari sumber
  resmi yang dibuka penulis dan selain itu ditandai `[belum terverifikasi]`;
  untuk `b-xi2-m10` dan `b-xii2-m10` modul tidak mengutip tujuan atau
  keluaran silabus kata per kata sampai issue #238 selesai.
- **Demo `awcms-one` hanya seperti di silabus** (bagian 6, keputusan pemilik
  2026-11-18, opsi 1): `awcms-one` sebagai **studi kasus** dan kustomisasi
  profil `landing` saja di kelas XII. `b-xii1-m4` adalah **demonstrasi
  guru**; lingkungan Docker, PostgreSQL, dan `apps/cms` disiapkan dan
  dijalankan **guru**, bukan murid; murid hanya mengubah merek, konten, tema,
  SEO, dan dokumentasi serta menambahkan satu formulir kontak pada storefront
  turunannya (`b-xii2-m5`), tidak menyentuh backend, dan tidak memakai backend
  produksi `awcms-one`. Fakta tentang repositori itu (perintah, profil,
  struktur) dicek penulis dari repositori publik saat menulis dan ditandai
  `[belum terverifikasi]` bila tidak dibuka; tidak ada rahasia atau data nyata.
- **Pustaka dan paket.** Nama paket yang disarankan AI diperiksa keberadaan
  dan reputasinya sebelum dipasang (`b-xi1-m5`, silabus 7.4); contoh memakai
  paket yang dikenal dan seminim mungkin.
- **Blok `html` dan `css`** tidak diperiksa otomatis; penulis membukanya di
  peramban dan mencatat apa yang dilihat; modul memeriksa kontras dan label
  (`b-xii1-m7`) dengan alat yang dibuka penulis.
- **Pembedaan TypeScript.** Menjalankan berkas `.ts` dengan `bun` bukan
  pemeriksaan tipe; penulis membaca dokumentasi resmi Bun dan TypeScript saat
  menulis `b-xi1-m2` dan `b-xi1-m4` dan menyatakan dengan tepat apa yang
  diperiksa alat mana (tidak dikarang dari ingatan).

### 5.4 Kebijakan AI SMA (silabus 7.4)

Sama dengan CDE 5.7, tanpa perubahan: pemakaian AI bebas dengan etika, tiap
soal `Latihan` ditandai `AI: boleh` atau `AI: tanpa AI`, asesmen dan kuis kode
`tanpa AI`, ada satu soal opsional "catatan pemakaian AI", jawab dulu sendiri
baru minta penjelasan atau petunjuk bertahap, kode buatan AI dibaca,
dijalankan, dan diuji, tidak ada data pribadi atau rahasia di permintaan ke
AI, dan tidak memakai label *vibe coding* atau *AI-native engineer*. Khas
seri ini: `a-xii2-m5..m8` seluruhnya tanpa AI; `b-xi1-m12` memuat ulasan kode
buatan AI seperti kode sejawat; `b-xii1-m10` memuat pemeriksaan contoh
permintaan ke asisten AI dari rahasia.

### 5.5 Catatan teknis pemeriksaan kode

- `bun run check:module-code` hari ini memeriksa blok `cpp`, `arduino`, dan
  `python`. Agent lain **sedang menambahkan** pemeriksaan sintaks blok `ts`
  dan `js` (belum digabung saat dokumen ini ditulis).
- **Kontrak seri ini:** setelah pemeriksaan itu ada, **semua blok ` ```ts `
  dan ` ```js ` dalam modul A dan B wajib lolos**. Blok yang sengaja tidak
  utuh memakai info string `setengah-jadi` (mis. ` ```ts setengah-jadi `;
  dilewati dan dihitung), kuncinya tetap blok biasa yang lolos. Pseudocode
  memakai ` ```text `.
- Sebelum pemeriksaan itu digabung, penulis menjalankan setiap blok dengan
  `bun` dan menyatakannya di catatan penyusun (cara CDE 5.5 untuk TypeScript);
  orchestrator tidak memulai P1 jalur B tanpa pemeriksaan itu (atau
  menyatakan keputusan 3 di bagian 8).
- Pemeriksaan hanya menyatakan sintaks atau kompilasi sah, **bukan**
  kebenaran perilaku; keluaran yang ditempel adalah keluaran asli yang
  dijalankan penulis.

## 6. Aturan rujukan

Seperti CDE bagian 6: hanya sumber resmi atau terbitan ilmiah dengan URL
https yang dibuka penulis, tanpa Wikipedia, blog, atau forum; tanpa
mengarang URL, DOI, nomor pasal, harga, atau versi; tanda `[belum
terverifikasi]` untuk yang tidak dibuka; tiap tautan dicek status 2xx pada
gerbang mutu. Alamat berikut dibuka penyusun pada 2026-11-19 (HTTP 200,
judul halaman sesuai; penulis modul tetap membuka halaman **spesifik** yang
ia kutip dan mencatat tanggal akses di PR):

| Sumber (halaman yang dibuka) | Dipakai untuk |
| --- | --- |
| `https://gcc.gnu.org/onlinedocs/gcc/Warning-Options.html` | pilihan `-Wall` dan `-Wextra`, jalur A |
| `https://en.cppreference.com/w/` | pustaka standar C++ (halaman fungsi dibuka penulis), jalur A |
| `https://isocpp.org/` | rujukan bahasa C++ (bukan sumber isi) |
| `https://osn.toki.id/` | halaman resmi OSN Informatika (hanya tautan, tanpa menyalin soal) |
| `https://ioinformatics.org/page/syllabus/12` | silabus IOI, jembatan jalur A |
| `https://bun.sh/docs` dan `https://bun.sh/docs/cli/test` | Bun dan `bun test`, jalur B |
| `https://developer.mozilla.org/en-US/docs/Web/JavaScript` | JavaScript dan platform web, jalur B |
| `https://www.typescriptlang.org/docs/` | TypeScript, jalur B |
| `https://docs.astro.build/en/getting-started/` | Astro, `b-xii1-m1..m2` |
| `https://zod.dev/` | Zod (validasi), `b-xi2-m3` |
| `https://owasp.org/www-community/attacks/xss/` | XSS, `b-xi2-m10` |
| `https://repositori.kemendikdasmen.go.id/33634/1/32.%20Panduan%20Mata%20Pelajaran%20Informatika.pdf` | *Panduan Mata Pelajaran Informatika, Fase D – F, 2025* (sudah dipakai modul lain) |

Sumber lain (halaman API tertentu di MDN atau Bun, dokumentasi Git, undang-undang
resmi, ketentuan layanan) dicek penulis saat memakainya. Soal latihan tidak
disalin dari sumber mana pun (CDE 6.2).

## 7. Gelombang penulisan

Dasar (CDE bagian 7): satu agent kira-kira 7 modul, **satu batch = satu jalur
pada satu paruh semester** (tujuh minggu), **satu gelombang = satu jalur
pada satu semester**. Ada 12 gelombang (6 per jalur) dan **22 batch**
(X1: 1 batch; tiap semester lain: 2 batch). Jalur A dan B pada semester yang
sama boleh paralel (berkas dan modul berbeda, id berbeda); dua batch dalam satu
gelombang **berurutan**, karena `Ingat kembali` dan `Ulang berjarak` membaca
modul sebelumnya.

| Putaran | Gelombang (jalur, semester, jumlah modul) | Batch | Catatan |
| --- | --- | --- | --- |
| P1 | A-X1 (7), B-X1 (7) | 2 | uji tangan pertama; fondasi sebagai sumber `Ingat kembali`; modul `m9..m12` dengan urutan baca-dan-prediksi |
| P2 | A-X2 (14), B-X2 (14) | 4 | evaluasi guru berjalan paralel, tanpa jeda (keputusan pemilik pertanyaan 1) |
| P3 | A-XI1 (14), B-XI1 (14) | 4 | strategi algoritmik A; TypeScript dan Bun B |
| P4 | A-XI2 (14), B-XI2 (14) | 4 | DP dan graf A; server, data, dan keamanan B |
| P5 | A-XII1 (14), B-XII1 (14) | 4 | graf lanjut dan struktur data A; `awcms-one` B (demo guru) |
| P6 | A-XII2 (14), B-XII2 (14) | 4 | latihan terpadu tanpa AI dan proyek akhir A; proyek akhir B |

Jumlah: (7 + 7) + 5 x (14 + 14) = 154 modul; 2 + 4 x 5 = 22 batch. Paruh
pertama semester = M1 sampai M7 (X1: M8 sampai M14); paruh kedua = M8 sampai
M14.

**Pembagian kerja per batch** dan **gerbang mutu per gelombang**: persis CDE
bagian 7 (agent hanya menulis berkas `content/sma-coding/modules/<id>.md` dan
mengembalikan entri indeks siap-tempel; orchestrator memasukkan entri satu
kali per gelombang; status semua modul baru `draf`; tidak ada `disetujui`
dan tidak ada `review` yang diisi AI). Tambahan gerbang seri ini:

| Gerbang tambahan | Cara | Lolos bila |
| --- | --- | --- |
| Kode jalur A | setiap blok `cpp` dikompilasi `g++ -std=c++17 -Wall -Wextra` dan dijalankan; keluaran dibandingkan dengan teks modul | tanpa peringatan; keluaran sama |
| Kode jalur B | `bun` menjalankan setiap blok `ts` dan `js`; `bun run check:module-code` (setelah pemeriksaan `ts`/`js` ada) lolos | semua jalan; keluaran sama |
| Orisinalitas soal | orchestrator membaca soal sampel dan mencari kemiripan dengan soal OSN atau platform yang dikenal | tidak ada soal yang disalin |
| Privasi dan keamanan jalur B | modul bertanda risiko (`b-xi2-m1..m3`, `b-xi2-m9`, `b-xi2-m10`, `b-xii1-m4..m10`, `b-xii2-m5`, `b-xii2-m9`, `b-xii2-m10`) dibaca penuh | tidak ada rahasia, data nyata, atau langkah yang menyerang sistem nyata |
| Minggu hukum `B-XI2-M10`, `B-XII2-M10` | dibandingkan dengan silabus hasil revisi #238 | tidak ada kutipan yang basi |

Setelah gelombang: changeset patch, satu commit per gelombang, rujukan issue
#124 atau issue yang ditetapkan orchestrator; **tidak ada modul yang
dinyatakan `disetujui`** sampai peninjau berperan yang ditunjuk pemilik
menyetujuinya per modul (ADR-0007).

**Risiko dan mitigasi `[asumsi]`:** (1) soal tersalin dari sumber kompetitif:
penulisan ulang orisinal dan gerbang orisinalitas; (2) keluaran tidak sama
dengan teks modul: wajib dijalankan dan ditempel asli; (3) fakta `awcms-one`
atau Bun/Astro/Zod basi: tanggal akses dan "per 2026-11" di modul; (4)
kerentanan didemonstrasikan terlalu jauh: aturan 5.3 dan gerbang privasi; (5)
rantai berjarak putus bila modul diubah: cek rantai tiap gelombang; (6) beban
tinjauan 154 modul tambahan: peninjau berperan, prioritas modul berisiko.

## 8. Pertanyaan keputusan untuk pemilik

Disajikan orchestrator lewat dialog pilihan baku; **opsi pertama adalah
rekomendasi penyusun**. **Jawaban pemilik 2026-11-19:** pertanyaan 1 "Setujui, evaluasi guru paralel" (opsi 2 di bawah, disajikan sebagai opsi disarankan oleh orchestrator), pertanyaan 2 opsi 1, pertanyaan 3 opsi 1; pertanyaan 4 tidak diajukan (opsi 1 dipakai orchestrator, lihat status). Maksimal
empat, mengikuti batas satu dialog.

1. **Persetujuan rancangan dan titik evaluasi.**
   - (Disarankan) Opsi 1: setujui rancangan ini dan templatnya (templat
     CDE yang disetujui, tanpa perubahan, ditambah aturan khas bagian 5), dan
     mulai P1; titik evaluasi bersama guru setelah P2 (42 modul pertama, dua
     jalur) sebelum lanjut ke P3. Konsekuensi: kelas X dipakai lebih dulu;
     templat bisa diperbaiki sebelum diulang untuk 112 modul sisanya;
     persetujuan ini untuk rancangan, bukan modul.
   - Opsi 2: setujui dengan evaluasi guru paralel tanpa jeda (seperti CDE).
     Tercepat, tetapi perbaikan templat setelah ditemukan guru harus
     menulis ulang lebih banyak modul.
   - Opsi 3: minta revisi rancangan sebelum modul dimulai. Aman, tetapi
     menunda kelas X yang paling dulu dipakai.
2. **Urutan penulisan.**
   - (Disarankan) Opsi 1: enam putaran menurut semester lintas dua jalur
     (bagian 7), A dan B paralel. Konsekuensi: kedua jalur kelas X siap
     lebih dulu.
   - Opsi 2: jalur A selesai utuh dulu, lalu B. Jalur A (jembatan OSN) utuh
     lebih cepat, tetapi kelas X jalur B menunggu 77 modul A.
   - Opsi 3: jalur B dulu, lalu A. Kebalikan opsi 2; jembatan OSN tertunda.
3. **Sumber soal "bergaya OSN" di `a-xii2-m5..m8` (hak cipta dan
   orisinalitas).**
   - (Disarankan) Opsi 1: soal ditulis ulang orisinal oleh penyusun, ditandai
     "soal karangan gaya kompetitif", dengan tautan hanya ke halaman resmi
     (`osn.toki.id`) tanpa menyalin atau memparafrasekan soal. Konsekuensi:
     aman terhadap lisensi (ADR-0007); butuh gerbang orisinalitas dan
     soal mungkin tidak serupa tingkat OSN nyata.
   - Opsi 2: modul hanya berisi tautan ke arsip soal resmi dan rubrik
     menelaahnya, tanpa soal sendiri. Tanpa risiko salin, tetapi murid
     bergantung pada ketersediaan situs dan syarat penggunaannya
     `[belum terverifikasi]`.
   - Opsi 3: minta izin tertulis penyelenggara untuk memakai soal tertentu.
     Paling nyata, tetapi butuh tindakan manusia di luar repositori dan
     waktu tak pasti.
4. **Pemeriksaan kode otomatis jalur B.**
   - (Disarankan) Opsi 1: jalur B menunggu pemeriksaan sintaks `ts` dan `js`
     di `check:module-code` (sedang ditambah) sebelum P1 B; keluaran tetap
     dijalankan dan ditempel penulis. Konsekuensi: kualitas terjaga saat
     modul berubah; B bisa mulai setelah penggabungan, sedangkan A boleh mulai
     lebih dulu.
   - Opsi 2: mulai B tanpa menunggu, penulis menjalankan dengan `bun` dan
     menyatakannya di modul (cara CDE untuk TypeScript). Tanpa penundaan,
     tetapi tidak terjaga saat dokumen berubah dan sulit ditinjau.
   - Opsi 3: tambahan uji keluaran otomatis (perbandingan keluaran modul
     dengan hasil eksekusi). Mutu paling tinggi, tetapi menyentuh `scripts/`
     dan CI di luar rancangan ini dan butuh issue terpisah.

### Keputusan lanjutan pemilik 2026-11-20

Dicatat dari dialog pilihan baku (issue #269). Keduanya atas rancangan dan
tafsir silabus, bukan persetujuan isi modul; semua modul tetap `draf`.

1. **Formulir kontak `b-xii2-m5`:** opsi terpilih **"Formulir harus di
   situs"**. Silabus minggu `B-XII2-M5` ("menambah fitur sesuai profil
   `landing` | fitur tahap 2 | formulir kontak (tanpa menyimpan data pribadi
   nyata)") dipenuhi dengan formulir yang berada di repositori turunan
   `landing` murid, bukan prototipe `localhost` terpisah. Konsekuensi: murid
   menambah kode pada storefront (satu halaman, satu skrip, satu berkas
   gaya, satu uji) tetapi tetap tidak menyentuh backend; modul `b-xii2-m2`,
   `m8`, `m11`, `m12` menyebut formulir pada pernyataan lingkup.
2. **Cadangan lab tanpa Docker:** opsi terpilih **"Boleh, dengan batas
   jelas"**. Profil `landing` dapat di-build dengan data tiruan uji
   repositori, tanpa Docker dan tanpa CMS. Modul jalur B yang langkahnya
   memerlukan Docker, PostgreSQL, atau CMS lab memuat catatan "Cadangan tanpa
   Docker": `b-xii1-m4` (perintah dan batas lengkap), `b-xii1-m6`,
   `b-xii2-m3`, `b-xii2-m5` (rujukan singkat), dan `b-xii2-m8`. Batasnya: tanpa
   penyemaian CMS (`db:seed:cms:profil landing`), tanpa pengisian FAQ di CMS,
   dan isi halaman berasal dari data tiruan, bukan dari berkas contoh murid.
   Cadangan tidak membuktikan apa pun tentang CMS sungguhan.

## 9. Batasan dan temuan

- Tabel jenis, prasyarat, dan keterkaitan adalah rancangan penyusun
  `[asumsi]`; yang bersumber silabus hanya kode minggu, topik, butir CP,
  jembatan OSN dan SMP.
- Rancangan ini tidak diuji di kelas; panjang modul dan beban kerja murid per
  minggu 3 JP belum terbukti. Bukti belajar yang dipakai berasal dari riset
  repositori
  ([`ilmu-belajar-kognitif.md`](../../riset/ilmu-belajar-kognitif.md),
  [`ai-rekayasa-perangkat-lunak.md`](../../riset/ai-rekayasa-perangkat-lunak.md))
  dan tidak diverifikasi ulang di sini.
- **Dua minggu hukum** (`B-XI2-M10`, `B-XII2-M10`): rumusan silabus sedang
  direvisi (#238); rancangan ini hanya memakai topik, dan modulnya baru
  ditulis setelah revisi itu tuntas atau disinkronkan.
- **Bergantung pekerjaan lain:** pemeriksaan sintaks `ts`/`js` di
  `check:module-code` (agent lain; belum digabung). Kontrak bagian 5.5 berlaku
  setelah itu ada.
- **Kelayakan `awcms-one`:** profil `landing` terbukti dapat di-build tanpa
  `apps/cms` hidup terhadap tiruan uji repositori (dijalankan 2026-11-20,
  `awcms-one` 0.20.0); perilakunya dengan CMS sungguhan belum diverifikasi
  (silabus bagian 6); modul `b-xii1-m3..m13` dan `b-xii2-m*`
  memerlukan penulis membuka repositori publik itu saat menulis.
- **Soal jalur A:** silabus menyebut "set soal bergaya OSN (disusun
  terpisah)" untuk `a-xii2-m5`; belum ada set itu di repositori. Pertanyaan
  keputusan 3 menyangkut sumbernya.
- **Perbedaan dengan CDE:** domain `sma-modules.ts` kini memeriksa
  "`cpItems` kosong" hanya untuk `d-` dan `e-`; A dan B memakai `cpItems`
  seperti C. Tidak ada kebutuhan perubahan skema atau domain untuk seri ini.
- Dokumen yang akan basi bila rancangan disetujui dan modul ditulis (tidak
  diubah di sini): `docs/programs/sma-coding/README.md` (status dan tabel
  dokumen), `AGENTS.md` (jumlah modul `sma-coding`), `README.md` root,
  `docs/architecture/repository-map.md`, `docs/panduan/*`, dan
  `docs/programs/catatan-tinjauan-modul.md` bila ada butir tinjau baru.

## Changelog

| Versi | Tanggal | Perubahan |
| --- | --- | --- |
| v0.3.0 | 2026-11-20 | Mencatat dua keputusan lanjutan pemilik 2026-11-20 (issue #269): "Formulir harus di situs" (bagian 5.3: formulir `b-xii2-m5` ada di repositori turunan `landing` murid, bukan prototipe `localhost`) dan "Boleh, dengan batas jelas" (cadangan lab tanpa Docker; bagian 8, 5.3, 9). |
| v0.2.1 | 2026-11-20 | Bagian 5.3: catatan `b-xii2-m5` (profil `landing` tanpa formulir kontak; FAQ dari pengaturan CMS; formulir prototipe `localhost` yang memvalidasi lalu membuang data; FAQ di CMS lab tugas guru). |
| v0.2.0 | 2026-11-19 | Mencatat keputusan pemilik lewat dialog (pertanyaan 1: "Setujui, evaluasi guru paralel"; 2: per semester, A dan B paralel; 3: soal orisinal dan tautan resmi); pertanyaan 4 memakai opsi disarankan oleh orchestrator. Catatan P2 di bagian 7 disesuaikan (tanpa jeda evaluasi). |
| v0.1.0 | 2026-11-19 | Rancangan awal (issue #237): pemetaan 154 modul (jalur A 77, B 77) dibangkitkan dari `weeks.json` dan `cp-mapping.json` dengan jenis minggu, butir CP (memenuhi dan mendukung), dan prasyarat; jembatan OSN, SMP, dan keterkaitan modul yang ada; aturan khas jalur A (C++17, soal orisinal, kompleksitas) dan B (Bun, keamanan web, demo `awcms-one`); 12 gelombang dan 22 batch; empat pertanyaan keputusan. Status DRAF, menunggu keputusan pemilik. |
