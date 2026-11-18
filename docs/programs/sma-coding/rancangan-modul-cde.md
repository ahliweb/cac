# Rancangan Seri Modul Jalur C, D, dan E (sma-coding): 210 Modul, Satu per Minggu

- **Version:** v0.1.0
- **Last updated:** 2026-11-19
- **Status:** DRAF. Rancangan seri menunggu persetujuan pemilik (issue #124). Belum ada modul jalur C, D, atau E di `content/`; hanya dua modul contoh pilot di `rancangan-modul-cde-contoh/` (bukan modul resmi, belum terindeks).
- **Changeset:** `.changeset/rancangan-modul-cde.md` (patch): dokumen rancangan dan dua modul contoh; tidak mengubah `content/`, `data/`, `src/`, atau silabus.

> **Prasyarat issue #124:** "Rancangan seri per jalur (daftar modul, pemetaan
> minggu, butir CP atau irisan pengayaan) disetujui pemilik sebelum modul
> ditulis." Dokumen ini adalah rancangan itu. **Keputusan pemilik
> 2026-11-19:** modul **lengkap**, **satu modul per minggu**, untuk jalur C
> (77 minggu), D (77), dan E (56), total **210 modul** untuk siswa SMA.
> Dokumen ini konten karangan menurut
> [ADR-0007](../../architecture/adr/0007-authored-learning-content.md),
> bukan transkripsi sumber resmi. Modul yang kelak ditulis berstatus `draf`;
> hanya manusia yang menyetujui (ADR-0007). Dokumen ini tidak menyetujui
> apa pun atas nama pemilik.

## 0. Cara membaca dokumen ini

- `[belum terverifikasi]`: tidak dapat dipastikan dari sumber yang benar-benar
  dibuka penyusun pada 2026-11-19; bukan fakta.
- `[asumsi]`: keputusan perancangan penyusun, bukan data resmi.
- `K` dan `M`: label bukti dengan arti yang sama seperti
  [`ilmu-belajar-kognitif.md`](../../riset/ilmu-belajar-kognitif.md) bagian 8:
  **K** = prinsipnya didukung bukti kuat (`[A]` atau `[B]`); **M** = masuk akal
  tetapi bukti terbatas untuk pemrograman atau untuk remaja (`[inferensi]`).
  Bukti prinsip belajar umumnya dari mahasiswa dan negara WEIRD; penerapannya
  pada siswa SMA Indonesia adalah `[inferensi]` (riset bagian 7).
- Kode minggu dan butir CP dipakai persis seperti
  [silabus.md](silabus.md) v1.3 dan `data/sma-coding/` (`weeks.json`,
  `tracks.json`, `cp-mapping.json`). Dokumen ini tidak membuat kode baru.
- Tabel di bagian 4 dibangkitkan dari `weeks.json` dan `cp-mapping.json`
  (2026-11-19), bukan diketik tangan; bila silabus berubah, tabel dihitung
  ulang.

## 1. Latar dan batas

Jalur C (IoT dan robotika) ada di dalam rumusan CP hanya lewat prinsip
komputasinya; jalur D (AI) dan E (komputasi kuantum) adalah **pengayaan di luar
rumusan CP** (`tracks.json`: `cpStatus` `dalam-cp` untuk C, `pengayaan` untuk D
dan E). Karena itu:

- Modul **jalur C** mencatat butir CP yang dipetakan `cp-mapping.json` pada
  minggunya (sebagian besar "mendukung", bukan "memenuhi"; keterampilan
  perakitan tidak dihitung sebagai butir CP mana pun, silabus bagian 3.3).
- Modul **jalur D dan E** **tidak pernah mengklaim butir CP**. Kolom mereka
  memuat `enrichmentLinks` (irisan terdekat, tidak dihitung) dan, pada indeks,
  `cpItems` tetap **kosong**.
- Jalur E **mulai di kelas XI** (empat semester: XI1, XI2, XII1, XII2; tidak
  ada kelas X dan tidak mengikuti blok fondasi). Maka modul E hanya
  `gradeLevels: ["XI"]` atau `["XII"]`, dan prasyaratnya bukan kode `FND-*`
  melainkan modul `matkom-*` atau modul E sebelumnya.
- Jalur C dan D punya semester kelas X: `X1` hanya minggu 8 sampai 14 (tujuh
  minggu, minggu 1 sampai 7 adalah blok fondasi bersama), semester lain 14
  minggu.

## 2. Ringkasan 210 modul

| Jalur | materi | proyek-mini | proyek-akhir | asesmen-refleksi | Jumlah |
| --- | --- | --- | --- | --- | --- |
| C: IoT dan robotika | 57 | 4 | 10 | 6 | 77 |
| D: AI dan analisis data | 53 | 4 | 14 | 6 | 77 |
| E: komputasi kuantum | 42 | 3 | 7 | 4 | 56 |
| **Jumlah** | **152** | **11** | **31** | **16** | **210** |

Aturan jenis `[asumsi]` (dihitung dari pola semester silabus bagian 3.3:
minggu 1 sampai 12 materi, 13 proyek mini, 14 asesmen dan refleksi):

- **asesmen-refleksi:** minggu 14 tiap semester (16 modul).
- **proyek-mini:** minggu 13 tiap semester, kecuali minggu 13 semester XII1
  jalur C dan D yang berjudul "Proyek" (itu proyek-akhir).
- **proyek-akhir:** rangkaian proyek akhir (fase rancangan, sprint, ulasan,
  dokumentasi, presentasi, portofolio): jalur C `C-XII1-M13` dan `C-XII2-M5`
  sampai `M13`; jalur D `D-XII1-M13` dan seluruh `D-XII2-M1` sampai `M13`;
  jalur E `E-XII2-M6` sampai `M12`.
- **materi:** selebihnya (termasuk `E-XII2-M13` "Cadangan terstruktur:
  tinjauan", yang berupa tinjauan materi).
- Tanda **(F)** pada judul jalur C mengikuti kolom Latihan silabus: minggu itu
  memakai perangkat fisik (32 minggu); minggu tanpa (F) bisa dikerjakan tanpa
  papan.
- Sebanyak 54 dari 77 minggu jalur C punya butir CP terpetakan; 31 dari 133
  minggu D dan E punya irisan pengayaan. Sisanya bertanda `-`: modul itu tidak
  dihitung memenuhi butir CP apa pun.

## 3. Id modul dan kesesuaian dengan skema

**Id modul = kode minggu huruf kecil**, mis. `C-X1-M8` menjadi `c-x1-m8`,
`E-XII2-M13` menjadi `e-xii2-m13`.

Pemeriksaan: `slugSchema` di `src/schema/common.ts` memakai pola
`^[a-z0-9]+(-[a-z0-9]+)*$`. Pola itu **menerima** seluruh 210 id (diuji dengan
mengubah kode minggu dari `weeks.json` dan mencocokkannya; tidak ada tabrakan
id, dan tidak ada tabrakan dengan 29 id modul yang sudah ada). Maka tidak perlu
pola baru. Konsekuensinya:

| Bidang indeks `smaModuleSchema` | Aturan untuk seri ini |
| --- | --- |
| `id` | kode minggu huruf kecil; berkas `content/sma-coding/modules/<id>.md` (`contentPath` wajib sama dengan id) |
| `title` | kolom "Judul modul" di bagian 4 (judul generik seperti "Proyek mini" diberi keterangan semester) |
| `weekCodes` | tepat satu: kode minggunya (dicek terhadap `weeks.json`) |
| `cpItems` | jalur C: kolom butir CP (dicek terhadap `cp-elements.json`; boleh kosong); jalur D dan E: **selalu `[]`** |
| `bridgeFamilies` | `[]` (jembatan OSN jalur C dibahas silabus bagian 5.2 dan tidak dijadikan klaim modul) |
| `gradeLevels` | satu kelas dari kode minggu (`X`, `XI`, `XII`); jalur E tidak pernah `X` |
| `prerequisites` | kolom prasyarat: id modul yang **sudah terindeks** atau kode `FND-X1-Mn` |
| `references` | minimal satu, https (aturan bagian 6) |

Dua kendala skema yang menentukan urutan penulisan (`src/domain/sma-modules.ts`):

1. Prasyarat harus berupa modul yang ada di `modules.json` atau kode
   fondasi, dan tidak boleh siklus. Maka **modul ditulis menurut urutan
   minggu**, dan prasyarat di tabel hanya menunjuk modul yang lebih awal
   (diperiksa saat tabel dibangkitkan: tidak ada siklus).
2. Indeks adalah berkas bersama; banyak agent menulisnya bersamaan akan
   bentrok. Aturan gelombang (bagian 7): agent hanya menulis berkas modulnya;
   entri indeks ditambahkan **orchestrator**, satu kali per gelombang.

Aturan prasyarat `[asumsi]` (kolom di bagian 4): materi dan asesmen merujuk
**modul materi terdekat sebelumnya** di jalur yang sama; modul proyek-akhir
merujuk modul materi atau proyek-akhir terdekat sebelumnya; ditambah rujukan
silang eksplisit untuk 30 minggu yang bergantung pada topik tertentu (mis.
`c-xi1-m3` pada fungsi dan larik `c-x1-m12`; `c-xi2-m2` pada keamanan
`FND-X1-M6`; `e-xi2-m10` pada `matkom-logika-proposisi`). Modul asesmen
menilai seluruh materi semesternya; kolom hanya mencantumkan satu modul
sebagai prasyarat formal, sisanya tersirat. Dua modul pembuka jalur
(`c-x1-m8`, `d-x1-m8`) bersandar pada blok fondasi; `e-xi1-m1` tanpa
prasyarat.

## 4. Pemetaan 210 modul

Kolom "Butir CP" untuk jalur C dihitung dari `cp-mapping.json`
(`mappings`); untuk jalur D dan E kolom itu memuat kode dari
`enrichmentLinks` sebagai **irisan pengayaan**, bukan klaim CP.
Rincian level irisan ada di `cp-mapping.json` dan silabus bagian 4.5.

### 4.1 Jalur C: IoT dan robotika (77 modul)

| Id modul | Kode minggu | Judul modul | Butir CP (dihitung dari `cp-mapping.json`) | Prasyarat | Jenis |
| --- | --- | --- | --- | --- | --- |
| `c-x1-m8` | `C-X1-M8` | Mikrokontroler, papan, dan program pertama; keluaran digital (F) | `E-BK-d`, `E-BK-e` | `FND-X1-M1`, `FND-X1-M3` | materi |
| `c-x1-m9` | `C-X1-M9` | Masukan digital, percabangan, logika Boolean (F) | `E-BK-d` | `c-x1-m8` | materi |
| `c-x1-m10` | `C-X1-M10` | Perulangan dan keluaran serial (F) | `E-BK-d` | `c-x1-m9` | materi |
| `c-x1-m11` | `C-X1-M11` | Masukan analog dan tipe data (F) | `E-BK-d` | `c-x1-m10` | materi |
| `c-x1-m12` | `C-X1-M12` | Fungsi dan array | `E-BK-d` | `c-x1-m11` | materi |
| `c-x1-m13` | `C-X1-M13` | Proyek mini (kelas X semester 1) (F) | `E-BK-d` | `c-x1-m12` | proyek-mini |
| `c-x1-m14` | `C-X1-M14` | Asesmen dan refleksi (termasuk asesmen formatif fondasi) | - | `c-x1-m12` | asesmen-refleksi |
| `c-x2-m1` | `C-X2-M1` | Ulasan dan penelusuran galat perangkat (F) | - | `c-x1-m12` | materi |
| `c-x2-m2` | `C-X2-M2` | Sensor suhu dan kelembapan (F) | - | `c-x2-m1` | materi |
| `c-x2-m3` | `C-X2-M3` | Data berkualitas dari sensor | `E-BK-b` | `c-x2-m2` | materi |
| `c-x2-m4` | `C-X2-M4` | Array dan rata-rata bergerak | `E-BK-a`, `E-BK-c` | `c-x2-m3`, `c-x1-m12` | materi |
| `c-x2-m5` | `C-X2-M5` | Keluaran analog (PWM) (F) | - | `c-x2-m4` | materi |
| `c-x2-m6` | `C-X2-M6` | Aktuator: servo dan buzzer (F) | - | `c-x2-m5` | materi |
| `c-x2-m7` | `C-X2-M7` | Waktu tanpa `delay` dan mesin keadaan sederhana | - | `c-x2-m6` | materi |
| `c-x2-m8` | `C-X2-M8` | Menampilkan data (F) | - | `c-x2-m7` | materi |
| `c-x2-m9` | `C-X2-M9` | Struktur data: tumpukan dan antrian sebagai penyangga | `E-BK-a`, `E-BK-c` | `c-x2-m8` | materi |
| `c-x2-m10` | `C-X2-M10` | Pencarian dan pengurutan data sensor | `E-BK-a`, `E-BK-c` | `c-x2-m9` | materi |
| `c-x2-m11` | `C-X2-M11` | Sensor jarak dan keputusan (F) | - | `c-x2-m10` | materi |
| `c-x2-m12` | `C-X2-M12` | Mencatat data | `E-BK-b` | `c-x2-m11` | materi |
| `c-x2-m13` | `C-X2-M13` | Proyek mini: stasiun pengamat (F) | `E-BK-c` | `c-x2-m12` | proyek-mini |
| `c-x2-m14` | `C-X2-M14` | Asesmen dan refleksi (kelas X semester 2) | - | `c-x2-m12` | asesmen-refleksi |
| `c-xi1-m1` | `C-XI1-M1` | Proses rekayasa produk IoT | `F-BK-a` | `c-x2-m12` | materi |
| `c-xi1-m2` | `C-XI1-M2` | Kualitas kode dan pengujian | `F-BK-a`, `F-AP-c` | `c-xi1-m1` | materi |
| `c-xi1-m3` | `C-XI1-M3` | Tipe data bentukan | `F-BK-c`, `F-AP-b` | `c-xi1-m2`, `c-x1-m12` | materi |
| `c-xi1-m4` | `C-XI1-M4` | Pustaka sendiri (F) | `F-AP-b`, `F-AP-d` | `c-xi1-m3` | materi |
| `c-xi1-m5` | `C-XI1-M5` | Alternatif solusi I: ambang dan histeresis | `F-BK-b`, `F-AP-a`, `F-AP-b` | `c-xi1-m4` | materi |
| `c-xi1-m6` | `C-XI1-M6` | Kendali hidup-mati (F) | `F-BK-b`, `F-AP-a`, `F-AP-b` | `c-xi1-m5` | materi |
| `c-xi1-m7` | `C-XI1-M7` | Alternatif solusi II: kendali proporsional (F) | `F-BK-b`, `F-AP-a`, `F-AP-b` | `c-xi1-m6` | materi |
| `c-xi1-m8` | `C-XI1-M8` | Efisiensi memori dan waktu pada mikrokontroler | `F-BK-b`, `F-AP-a` | `c-xi1-m7` | materi |
| `c-xi1-m9` | `C-XI1-M9` | Struktur data: penyangga melingkar | `F-BK-c` | `c-xi1-m8`, `c-x2-m9` | materi |
| `c-xi1-m10` | `C-XI1-M10` | Pengiriman data antarperangkat I (F) | `F-BK-d` | `c-xi1-m9`, `c-x1-m10`, `FND-X1-M5` | materi |
| `c-xi1-m11` | `C-XI1-M11` | Pengiriman data antarperangkat II | `F-BK-d` | `c-xi1-m10` | materi |
| `c-xi1-m12` | `C-XI1-M12` | Pemecahan masalah sambungan (F) | `F-BK-d` | `c-xi1-m11` | materi |
| `c-xi1-m13` | `C-XI1-M13` | Proyek mini (kelas XI semester 1) (F) | - | `c-xi1-m12` | proyek-mini |
| `c-xi1-m14` | `C-XI1-M14` | Asesmen dan refleksi (kelas XI semester 1) | - | `c-xi1-m12` | asesmen-refleksi |
| `c-xi2-m1` | `C-XI2-M1` | Jaringan nirkabel dan perangkat IoT (F) | `E-LD-e`, `F-BK-d` | `c-xi1-m12`, `FND-X1-M4`, `FND-X1-M5` | materi |
| `c-xi2-m2` | `C-XI2-M2` | Keamanan konektivitas | `E-LD-e`, `F-LD-e`, `F-LD-i` | `c-xi2-m1`, `FND-X1-M6` | materi |
| `c-xi2-m3` | `C-XI2-M3` | Klien HTTP (F) | `F-BK-d` | `c-xi2-m2` | materi |
| `c-xi2-m4` | `C-XI2-M4` | Server mini (F) | `F-BK-d` | `c-xi2-m3` | materi |
| `c-xi2-m5` | `C-XI2-M5` | Publikasi-langganan: konsep | `F-BK-d` | `c-xi2-m4` | materi |
| `c-xi2-m6` | `C-XI2-M6` | Publikasi-langganan: praktik (F) | `F-BK-d` | `c-xi2-m5` | materi |
| `c-xi2-m7` | `C-XI2-M7` | Format data | `F-BK-d` | `c-xi2-m6`, `c-xi1-m11` | materi |
| `c-xi2-m8` | `C-XI2-M8` | Pemecahan masalah jaringan IoT (F) | `F-BK-d` | `c-xi2-m7` | materi |
| `c-xi2-m9` | `C-XI2-M9` | Sumber data terbuka dan legal | `F-AD-a` | `c-xi2-m8` | materi |
| `c-xi2-m10` | `C-XI2-M10` | Rekap dan visualisasi | `F-AD-a` | `c-xi2-m9`, `c-x2-m12` | materi |
| `c-xi2-m11` | `C-XI2-M11` | Prediksi sederhana | `F-AD-a` | `c-xi2-m10` | materi |
| `c-xi2-m12` | `C-XI2-M12` | Keputusan otomatis berbasis data (F) | `F-AD-a` | `c-xi2-m11` | materi |
| `c-xi2-m13` | `C-XI2-M13` | Proyek: sistem IoT lokal (F) | - | `c-xi2-m12` | proyek-mini |
| `c-xi2-m14` | `C-XI2-M14` | Asesmen dan refleksi (kelas XI semester 2) | - | `c-xi2-m12` | asesmen-refleksi |
| `c-xii1-m1` | `C-XII1-M1` | Merancang kebutuhan sistem | `F-BK-a`, `F-LD-d` | `c-xi2-m12` | materi |
| `c-xii1-m2` | `C-XII1-M2` | Arsitektur dan pemilihan komponen | `F-BK-a`, `F-LD-d` | `c-xii1-m1` | materi |
| `c-xii1-m3` | `C-XII1-M3` | Motor DC dan pengendali motor (F) | - | `c-xii1-m2` | materi |
| `c-xii1-m4` | `C-XII1-M4` | Sensor garis dan jarak (F) | - | `c-xii1-m3` | materi |
| `c-xii1-m5` | `C-XII1-M5` | Mesin keadaan robot (F) | `F-AP-b` | `c-xii1-m4`, `c-x2-m7` | materi |
| `c-xii1-m6` | `C-XII1-M6` | Pengikut garis: strategi 1 (F) | `F-AP-a`, `F-AP-b` | `c-xii1-m5` | materi |
| `c-xii1-m7` | `C-XII1-M7` | Pengikut garis: strategi 2 (F) | `F-AP-a`, `F-AP-b` | `c-xii1-m6` | materi |
| `c-xii1-m8` | `C-XII1-M8` | Membandingkan strategi | `F-BK-b`, `F-AP-a`, `F-AP-b` | `c-xii1-m7` | materi |
| `c-xii1-m9` | `C-XII1-M9` | Kalibrasi dan pengujian sistematis | - | `c-xii1-m8` | materi |
| `c-xii1-m10` | `C-XII1-M10` | Daya dan keselamatan baterai | - | `c-xii1-m9`, `FND-X1-M6` | materi |
| `c-xii1-m11` | `C-XII1-M11` | Hukum dan etika sensor | `F-LD-g` | `c-xii1-m10`, `c-xi2-m2` | materi |
| `c-xii1-m12` | `C-XII1-M12` | Dokumentasi dan pemeliharaan | `F-BK-a` | `c-xii1-m11` | materi |
| `c-xii1-m13` | `C-XII1-M13` | Proyek (kelas XII semester 1) | - | `c-xii1-m12` | proyek-akhir |
| `c-xii1-m14` | `C-XII1-M14` | Asesmen dan refleksi (kelas XII semester 1) | - | `c-xii1-m12` | asesmen-refleksi |
| `c-xii2-m1` | `C-XII2-M1` | Pemeliharaan program I | `F-AP-c` | `c-xii1-m12`, `c-xi1-m2` | materi |
| `c-xii2-m2` | `C-XII2-M2` | Pemeliharaan program II | `F-AP-c` | `c-xii2-m1` | materi |
| `c-xii2-m3` | `C-XII2-M3` | Memodelkan masalah lapangan | - | `c-xii2-m2` | materi |
| `c-xii2-m4` | `C-XII2-M4` | Ulasan keamanan dan privasi | - | `c-xii2-m3` | materi |
| `c-xii2-m5` | `C-XII2-M5` | Proyek akhir: rancangan | `F-BK-a` | `c-xii2-m4` | proyek-akhir |
| `c-xii2-m6` | `C-XII2-M6` | Proyek akhir: sprint 1 (perangkat keras) (F) | `F-BK-a`, `F-AP-d` | `c-xii2-m5` | proyek-akhir |
| `c-xii2-m7` | `C-XII2-M7` | Proyek akhir: sprint 2 (program) | `F-BK-a`, `F-AP-d` | `c-xii2-m6` | proyek-akhir |
| `c-xii2-m8` | `C-XII2-M8` | Proyek akhir: sprint 3 (jaringan dan data) (F) | `F-BK-a`, `F-AP-d` | `c-xii2-m7` | proyek-akhir |
| `c-xii2-m9` | `C-XII2-M9` | Proyek akhir: sprint 4 (penyempurnaan) | `F-BK-a`, `F-AP-d` | `c-xii2-m8` | proyek-akhir |
| `c-xii2-m10` | `C-XII2-M10` | Ulasan sejawat (kelas XII semester 2) | `F-BK-a` | `c-xii2-m9` | proyek-akhir |
| `c-xii2-m11` | `C-XII2-M11` | Pengujian akhir (kelas XII semester 2) | `F-BK-a` | `c-xii2-m10` | proyek-akhir |
| `c-xii2-m12` | `C-XII2-M12` | Dokumentasi akhir | `F-BK-a` | `c-xii2-m11` | proyek-akhir |
| `c-xii2-m13` | `C-XII2-M13` | Presentasi dan portofolio | - | `c-xii2-m12` | proyek-akhir |
| `c-xii2-m14` | `C-XII2-M14` | Asesmen dan refleksi (kelas XII semester 2) | - | `c-xii2-m4` | asesmen-refleksi |

### 4.2 Jalur D: AI dan analisis data (77 modul)

| Id modul | Kode minggu | Judul modul | Irisan pengayaan (`enrichmentLinks`; bukan klaim CP) | Prasyarat | Jenis |
| --- | --- | --- | --- | --- | --- |
| `d-x1-m8` | `D-X1-M8` | Apa itu AI dan apa yang bukan | - | `FND-X1-M1`, `FND-X1-M3` | materi |
| `d-x1-m9` | `D-X1-M9` | Data, fitur, dan label | `E-BK-b` | `d-x1-m8` | materi |
| `d-x1-m10` | `D-X1-M10` | Klasifikasi tanpa komputer | - | `d-x1-m9` | materi |
| `d-x1-m11` | `D-X1-M11` | Orange: memuat dan melihat data | - | `d-x1-m10` | materi |
| `d-x1-m12` | `D-X1-M12` | Model pertama dan pembagian data latih/uji | - | `d-x1-m11` | materi |
| `d-x1-m13` | `D-X1-M13` | Proyek mini (kelas X semester 1) | `E-BK-b` | `d-x1-m12` | proyek-mini |
| `d-x1-m14` | `D-X1-M14` | Asesmen dan refleksi (kelas X semester 1) | - | `d-x1-m12` | asesmen-refleksi |
| `d-x2-m1` | `D-X2-M1` | Dari data ke keputusan; ulasan | `E-BK-b` | `d-x1-m12` | materi |
| `d-x2-m2` | `D-X2-M2` | Bias dan keadilan | - | `d-x2-m1`, `d-x1-m9` | materi |
| `d-x2-m3` | `D-X2-M3` | Privasi dan data pribadi | `F-LD-g`, `E-LD-l` | `d-x2-m2`, `FND-X1-M6` | materi |
| `d-x2-m4` | `D-X2-M4` | Regresi: garis kecenderungan | - | `d-x2-m3`, `d-x1-m12` | materi |
| `d-x2-m5` | `D-X2-M5` | Galat dan kelebihan-suai (overfitting) | - | `d-x2-m4` | materi |
| `d-x2-m6` | `D-X2-M6` | Klasifikasi: pohon keputusan dan tetangga terdekat | - | `d-x2-m5` | materi |
| `d-x2-m7` | `D-X2-M7` | Mengevaluasi klasifikasi | - | `d-x2-m6` | materi |
| `d-x2-m8` | `D-X2-M8` | Pengelompokan tanpa label | - | `d-x2-m7` | materi |
| `d-x2-m9` | `D-X2-M9` | Visualisasi untuk bercerita | - | `d-x2-m8` | materi |
| `d-x2-m10` | `D-X2-M10` | Teks sebagai data | - | `d-x2-m9` | materi |
| `d-x2-m11` | `D-X2-M11` | AI generatif dan verifikasi | `F-LD-b` | `d-x2-m10`, `d-x1-m8` | materi |
| `d-x2-m12` | `D-X2-M12` | HAKI, lisensi data, dan AI | `E-LD-g` | `d-x2-m11`, `FND-X1-M2` | materi |
| `d-x2-m13` | `D-X2-M13` | Proyek mini (kelas X semester 2) | - | `d-x2-m12` | proyek-mini |
| `d-x2-m14` | `D-X2-M14` | Asesmen dan refleksi (kelas X semester 2) | - | `d-x2-m12` | asesmen-refleksi |
| `d-xi1-m1` | `D-XI1-M1` | Proses proyek data dan AI | - | `d-x2-m12` | materi |
| `d-xi1-m2` | `D-XI1-M2` | Python I | - | `d-xi1-m1` | materi |
| `d-xi1-m3` | `D-XI1-M3` | Python II | `F-AP-d` | `d-xi1-m2` | materi |
| `d-xi1-m4` | `D-XI1-M4` | Membaca berkas tabel | `F-AP-d` | `d-xi1-m3` | materi |
| `d-xi1-m5` | `D-XI1-M5` | Sumber data terbuka dan legal | `F-AD-a` | `d-xi1-m4`, `d-x2-m12` | materi |
| `d-xi1-m6` | `D-XI1-M6` | Membersihkan data | `F-AD-a` | `d-xi1-m5` | materi |
| `d-xi1-m7` | `D-XI1-M7` | Statistik deskriptif dan grafik | `F-AD-a` | `d-xi1-m6` | materi |
| `d-xi1-m8` | `D-XI1-M8` | Prediksi sederhana | `F-AD-a` | `d-xi1-m7` | materi |
| `d-xi1-m9` | `D-XI1-M9` | Klasifikasi dengan `scikit-learn` | `F-AP-d` | `d-xi1-m8`, `d-x2-m6` | materi |
| `d-xi1-m10` | `D-XI1-M10` | Evaluasi dan validasi | - | `d-xi1-m9` | materi |
| `d-xi1-m11` | `D-XI1-M11` | Membandingkan model | - | `d-xi1-m10` | materi |
| `d-xi1-m12` | `D-XI1-M12` | Kebocoran data dan bias evaluasi | - | `d-xi1-m11` | materi |
| `d-xi1-m13` | `D-XI1-M13` | Proyek mini (kelas XI semester 1) | `F-AD-a` | `d-xi1-m12` | proyek-mini |
| `d-xi1-m14` | `D-XI1-M14` | Asesmen dan refleksi (kelas XI semester 1) | - | `d-xi1-m12` | asesmen-refleksi |
| `d-xi2-m1` | `D-XI2-M1` | Pengelompokan dengan Python | - | `d-xi1-m12`, `d-x2-m8` | materi |
| `d-xi2-m2` | `D-XI2-M2` | Pohon keputusan dan ensambel | `F-AP-d` | `d-xi2-m1` | materi |
| `d-xi2-m3` | `D-XI2-M3` | Rekayasa fitur | `F-AP-d` | `d-xi2-m2` | materi |
| `d-xi2-m4` | `D-XI2-M4` | Teks: pembersihan dan representasi | `F-AP-d` | `d-xi2-m3` | materi |
| `d-xi2-m5` | `D-XI2-M5` | Klasifikasi teks | `F-AP-d` | `d-xi2-m4` | materi |
| `d-xi2-m6` | `D-XI2-M6` | Gambar sebagai angka | `F-AP-d` | `d-xi2-m5` | materi |
| `d-xi2-m7` | `D-XI2-M7` | Gagasan jaringan saraf | `F-AP-d` | `d-xi2-m6` | materi |
| `d-xi2-m8` | `D-XI2-M8` | Melatih jaringan kecil | `F-AP-d` | `d-xi2-m7` | materi |
| `d-xi2-m9` | `D-XI2-M9` | Menjelaskan keputusan model | - | `d-xi2-m8` | materi |
| `d-xi2-m10` | `D-XI2-M10` | Penyalahgunaan AI dan verifikasi konten | `F-LD-b` | `d-xi2-m9`, `d-x2-m11` | materi |
| `d-xi2-m11` | `D-XI2-M11` | Layanan lewat API (opsional) | - | `d-xi2-m10` | materi |
| `d-xi2-m12` | `D-XI2-M12` | Kartu model dan dokumentasi | - | `d-xi2-m11` | materi |
| `d-xi2-m13` | `D-XI2-M13` | Proyek mini (kelas XI semester 2) | - | `d-xi2-m12` | proyek-mini |
| `d-xi2-m14` | `D-XI2-M14` | Asesmen dan refleksi (kelas XI semester 2) | - | `d-xi2-m12` | asesmen-refleksi |
| `d-xii1-m1` | `D-XII1-M1` | Merumuskan proyek akhir | - | `d-xi2-m12` | materi |
| `d-xii1-m2` | `D-XII1-M2` | Studi kasus AI I | - | `d-xii1-m1` | materi |
| `d-xii1-m3` | `D-XII1-M3` | Studi kasus AI II | - | `d-xii1-m2` | materi |
| `d-xii1-m4` | `D-XII1-M4` | Hukum dan kebijakan | `F-LD-g` | `d-xii1-m3`, `d-x2-m3` | materi |
| `d-xii1-m5` | `D-XII1-M5` | Menyiapkan data proyek | `F-AD-a` | `d-xii1-m4` | materi |
| `d-xii1-m6` | `D-XII1-M6` | Garis dasar dan metrik | - | `d-xii1-m5` | materi |
| `d-xii1-m7` | `D-XII1-M7` | Iterasi model I | - | `d-xii1-m6` | materi |
| `d-xii1-m8` | `D-XII1-M8` | Iterasi model II | - | `d-xii1-m7` | materi |
| `d-xii1-m9` | `D-XII1-M9` | Ulasan sejawat (kelas XII semester 1) | - | `d-xii1-m8` | materi |
| `d-xii1-m10` | `D-XII1-M10` | Kualitas kode dan keterulangan | - | `d-xii1-m9` | materi |
| `d-xii1-m11` | `D-XII1-M11` | Penilaian risiko dan etika proyek | - | `d-xii1-m10` | materi |
| `d-xii1-m12` | `D-XII1-M12` | Menyajikan hasil | - | `d-xii1-m11` | materi |
| `d-xii1-m13` | `D-XII1-M13` | Proyek (kelas XII semester 1) | - | `d-xii1-m12` | proyek-akhir |
| `d-xii1-m14` | `D-XII1-M14` | Asesmen dan refleksi (kelas XII semester 1) | - | `d-xii1-m12` | asesmen-refleksi |
| `d-xii2-m1` | `D-XII2-M1` | Perencanaan proyek akhir | - | `d-xii1-m13` | proyek-akhir |
| `d-xii2-m2` | `D-XII2-M2` | Rancangan (kelas XII semester 2) | - | `d-xii2-m1` | proyek-akhir |
| `d-xii2-m3` | `D-XII2-M3` | Sprint 1: data | - | `d-xii2-m2` | proyek-akhir |
| `d-xii2-m4` | `D-XII2-M4` | Sprint 1: garis dasar | - | `d-xii2-m3` | proyek-akhir |
| `d-xii2-m5` | `D-XII2-M5` | Sprint 2: model | - | `d-xii2-m4` | proyek-akhir |
| `d-xii2-m6` | `D-XII2-M6` | Sprint 2: evaluasi | - | `d-xii2-m5` | proyek-akhir |
| `d-xii2-m7` | `D-XII2-M7` | Sprint 3: penyempurnaan | - | `d-xii2-m6` | proyek-akhir |
| `d-xii2-m8` | `D-XII2-M8` | Pengujian akhir (kelas XII semester 2) | - | `d-xii2-m7` | proyek-akhir |
| `d-xii2-m9` | `D-XII2-M9` | Dokumentasi (kelas XII semester 2) | - | `d-xii2-m8` | proyek-akhir |
| `d-xii2-m10` | `D-XII2-M10` | Ulasan etika dan privasi | - | `d-xii2-m9` | proyek-akhir |
| `d-xii2-m11` | `D-XII2-M11` | Ulasan sejawat (kelas XII semester 2) | - | `d-xii2-m10` | proyek-akhir |
| `d-xii2-m12` | `D-XII2-M12` | Presentasi (kelas XII semester 2) | - | `d-xii2-m11` | proyek-akhir |
| `d-xii2-m13` | `D-XII2-M13` | Portofolio dan refleksi | - | `d-xii2-m12` | proyek-akhir |
| `d-xii2-m14` | `D-XII2-M14` | Asesmen (kelas XII semester 2) | - | `d-xii1-m12` | asesmen-refleksi |

### 4.3 Jalur E: komputasi kuantum (56 modul, mulai kelas XI)

| Id modul | Kode minggu | Judul modul | Irisan pengayaan (`enrichmentLinks`; bukan klaim CP) | Prasyarat | Jenis |
| --- | --- | --- | --- | --- | --- |
| `e-xi1-m1` | `E-XI1-M1` | Mengapa komputasi kuantum; bit klasik dan acak | - | - | materi |
| `e-xi1-m2` | `E-XI1-M2` | Probabilitas dan vektor | - | `e-xi1-m1` | materi |
| `e-xi1-m3` | `E-XI1-M3` | Matriks | - | `e-xi1-m2` | materi |
| `e-xi1-m4` | `E-XI1-M4` | Bilangan kompleks dasar | - | `e-xi1-m3` | materi |
| `e-xi1-m5` | `E-XI1-M5` | Qubit dan keadaan | - | `e-xi1-m4`, `matkom-sistem-bilangan-basis` | materi |
| `e-xi1-m6` | `E-XI1-M6` | Superposisi dan aturan Born | - | `e-xi1-m5` | materi |
| `e-xi1-m7` | `E-XI1-M7` | Pengukuran | - | `e-xi1-m6` | materi |
| `e-xi1-m8` | `E-XI1-M8` | Gerbang satu qubit | - | `e-xi1-m7` | materi |
| `e-xi1-m9` | `E-XI1-M9` | Sirkuit satu qubit dan interferensi | - | `e-xi1-m8` | materi |
| `e-xi1-m10` | `E-XI1-M10` | Simulator sendiri I | `F-AP-d` | `e-xi1-m9` | materi |
| `e-xi1-m11` | `E-XI1-M11` | Simulator sendiri II | `F-AP-d` | `e-xi1-m10` | materi |
| `e-xi1-m12` | `E-XI1-M12` | Dua qubit dan hasil kali tensor | - | `e-xi1-m11`, `e-xi1-m3` | materi |
| `e-xi1-m13` | `E-XI1-M13` | Proyek mini (kelas XI semester 1) | - | `e-xi1-m12` | proyek-mini |
| `e-xi1-m14` | `E-XI1-M14` | Asesmen dan refleksi (kelas XI semester 1) | - | `e-xi1-m12` | asesmen-refleksi |
| `e-xi2-m1` | `E-XI2-M1` | Gerbang dua qubit: CNOT | - | `e-xi1-m12` | materi |
| `e-xi2-m2` | `E-XI2-M2` | Entanglement dan keadaan Bell | - | `e-xi2-m1` | materi |
| `e-xi2-m3` | `E-XI2-M3` | Mengukur qubit terjerat | - | `e-xi2-m2` | materi |
| `e-xi2-m4` | `E-XI2-M4` | Simulator sendiri III: n qubit | `F-AP-d` | `e-xi2-m3` | materi |
| `e-xi2-m5` | `E-XI2-M5` | Gerbang fase dan rotasi (pengayaan) | - | `e-xi2-m4` | materi |
| `e-xi2-m6` | `E-XI2-M6` | Reversibilitas | - | `e-xi2-m5`, `matkom-himpunan-relasi-fungsi` | materi |
| `e-xi2-m7` | `E-XI2-M7` | Tak dapat menggandakan dan teleportasi (konsep) | - | `e-xi2-m6` | materi |
| `e-xi2-m8` | `E-XI2-M8` | Pengayaan: permainan CHSH | - | `e-xi2-m7` | materi |
| `e-xi2-m9` | `E-XI2-M9` | Pengayaan: distribusi kunci (konsep) | - | `e-xi2-m8` | materi |
| `e-xi2-m10` | `E-XI2-M10` | Oracle dan fungsi Boolean | - | `e-xi2-m9`, `matkom-logika-proposisi`, `matkom-himpunan-relasi-fungsi` | materi |
| `e-xi2-m11` | `E-XI2-M11` | Algoritma Deutsch | - | `e-xi2-m10` | materi |
| `e-xi2-m12` | `E-XI2-M12` | Algoritma Deutsch-Jozsa | `F-BK-b` | `e-xi2-m11` | materi |
| `e-xi2-m13` | `E-XI2-M13` | Proyek mini (kelas XI semester 2) | - | `e-xi2-m12` | proyek-mini |
| `e-xi2-m14` | `E-XI2-M14` | Asesmen dan refleksi (kelas XI semester 2) | - | `e-xi2-m12` | asesmen-refleksi |
| `e-xii1-m1` | `E-XII1-M1` | Bernstein-Vazirani | - | `e-xi2-m12` | materi |
| `e-xii1-m2` | `E-XII1-M2` | Pembalikan fase | - | `e-xii1-m1` | materi |
| `e-xii1-m3` | `E-XII1-M3` | Grover I | - | `e-xii1-m2` | materi |
| `e-xii1-m4` | `E-XII1-M4` | Grover II | - | `e-xii1-m3` | materi |
| `e-xii1-m5` | `E-XII1-M5` | Grover III: jumlah iterasi | `F-BK-b` | `e-xii1-m4`, `matkom-pertumbuhan-fungsi` | materi |
| `e-xii1-m6` | `E-XII1-M6` | Gagasan Fourier kuantum dan Shor (konsep) | - | `e-xii1-m5` | materi |
| `e-xii1-m7` | `E-XII1-M7` | Batas komputasi kuantum | - | `e-xii1-m6` | materi |
| `e-xii1-m8` | `E-XII1-M8` | Derau dan dekoherensi | - | `e-xii1-m7` | materi |
| `e-xii1-m9` | `E-XII1-M9` | Pustaka Qiskit dan Python I (demonstrasi) | `F-AP-d` | `e-xii1-m8` | materi |
| `e-xii1-m10` | `E-XII1-M10` | Pustaka Qiskit dan Python II | `F-AP-d` | `e-xii1-m9` | materi |
| `e-xii1-m11` | `E-XII1-M11` | Peran cloud quantum | - | `e-xii1-m10` | materi |
| `e-xii1-m12` | `E-XII1-M12` | Demonstrasi cloud quantum oleh guru | - | `e-xii1-m11` | materi |
| `e-xii1-m13` | `E-XII1-M13` | Proyek mini (kelas XII semester 1) | - | `e-xii1-m12` | proyek-mini |
| `e-xii1-m14` | `E-XII1-M14` | Asesmen dan refleksi (kelas XII semester 1) | - | `e-xii1-m12` | asesmen-refleksi |
| `e-xii2-m1` | `E-XII2-M1` | Membaca hasil nyata | - | `e-xii1-m12` | materi |
| `e-xii2-m2` | `E-XII2-M2` | Mitigasi derau (konsep) | - | `e-xii2-m1` | materi |
| `e-xii2-m3` | `E-XII2-M3` | Pengayaan: algoritma hibrida (konsep) | - | `e-xii2-m2` | materi |
| `e-xii2-m4` | `E-XII2-M4` | Dampak ke keamanan informasi (konsep) | - | `e-xii2-m3`, `e-xii1-m6` | materi |
| `e-xii2-m5` | `E-XII2-M5` | Etika, ekspektasi, dan karier | - | `e-xii2-m4` | materi |
| `e-xii2-m6` | `E-XII2-M6` | Proyek akhir: rancangan | - | `e-xii2-m5` | proyek-akhir |
| `e-xii2-m7` | `E-XII2-M7` | Proyek akhir: implementasi I | - | `e-xii2-m6` | proyek-akhir |
| `e-xii2-m8` | `E-XII2-M8` | Proyek akhir: implementasi II | - | `e-xii2-m7` | proyek-akhir |
| `e-xii2-m9` | `E-XII2-M9` | Proyek akhir: pengujian dan dokumentasi | - | `e-xii2-m8` | proyek-akhir |
| `e-xii2-m10` | `E-XII2-M10` | Proyek akhir: pengujian lanjutan | - | `e-xii2-m9` | proyek-akhir |
| `e-xii2-m11` | `E-XII2-M11` | Proyek akhir: presentasi | - | `e-xii2-m10` | proyek-akhir |
| `e-xii2-m12` | `E-XII2-M12` | Proyek akhir: portofolio | - | `e-xii2-m11` | proyek-akhir |
| `e-xii2-m13` | `E-XII2-M13` | Cadangan terstruktur: tinjauan | - | `e-xii2-m5` | materi |
| `e-xii2-m14` | `E-XII2-M14` | Asesmen dan refleksi (kelas XII semester 2) | - | `e-xii2-m13` | asesmen-refleksi |

### 4.4 Prasyarat di luar indeks

Hal berikut dibutuhkan tetapi **tidak dapat ditulis sebagai prasyarat indeks**
karena belum ada modulnya; guru memeriksanya, dan modul menyebutnya di
"Untuk siapa modul ini":

| Modul | Prasyarat luar indeks | Sumber |
| --- | --- | --- |
| `e-xi1-m10`, `e-xi1-m11`, `e-xi2-m4` (simulator buatan sendiri) | dasar pemrograman setara `A-X1-M9..M12` (C++) atau `B-X1-M9..M12` (TypeScript/Bun); bagian konsep terbuka bagi semua murid | silabus bagian 3.5 |
| `e-xi1-m2`, `e-xi1-m3`, `e-xi1-m4` | probabilitas, vektor, matriks, bilangan kompleks dibangun di dalam jalur (tiga minggu); apakah sudah diajarkan Matematika SMA tidak diverifikasi | silabus bagian 3.5 `[belum terverifikasi]` |
| `d-xi1-m2` sampai `d-xi1-m4` | murid yang hanya mengambil jalur D belajar Python di sini; tiga minggu mungkin kurang | silabus bagian 3.4 |
| seluruh jalur C | blok fondasi `FND-X1-M1..M7`; pengetahuan pemrograman tidak diasumsikan | silabus bagian 3.3 |

### 4.5 Modul yang sudah ada dan terkait (bukan prasyarat)

Modul draf yang sudah ada disarankan sebagai bacaan pendamping, tanpa
mengikatnya sebagai prasyarat (dihitung dari judul dan isi `modules.json`
`[asumsi]`): `pendamping-keamanan-lanjut-konektivitas` untuk `c-xi2-m2`;
`pendamping-merancang-kebutuhan-sistem` untuk `c-xii1-m1`;
`pendamping-periksa-fakta-dan-baca-lateral` untuk `d-x2-m11` dan `d-xi2-m10`;
`pendamping-riset-dan-verifikasi-konten` untuk `d-xi2-m10`;
`matkom-pertumbuhan-fungsi` untuk `e-xii1-m5`; `cloud-keamanan-dan-privasi` dan
`cloud-biaya-dan-tagihan` untuk `e-xii1-m11` dan `e-xii1-m12`. Penulis
menaruhnya di "Langkah berikutnya" atau "Latihan bercampur".

## 5. Templat modul berbasis bukti

Satu templat untuk tiap jenis minggu. **Judul bagian di bawah wajib dipakai
persis** (heading tingkat 2, `##`), karena agent tinjauan modul memeriksa
judul yang sama. Berkas modul tidak memakai heading tingkat 1 (judul dari
indeks), sama seperti modul sma-coding yang sudah ada.

### 5.1 Templat materi

| # | Judul bagian (`##`) | Isi | Label bukti | Rujukan riset |
| --- | --- | --- | --- | --- |
| 1 | `Untuk siapa modul ini` | kelas, minggu silabus, prasyarat (modul dan luar indeks), butir CP atau irisan pengayaan dan pernyataan "tidak dihitung memenuhi CP" bila berlaku, status DRAF, cara mengerjakan, pilihan dengan atau tanpa perangkat (jalur C). Bagian pembuka yang sudah ada di modul sma-coding lain (satu tes integrasi CLI memeriksanya pada modul yang ada) | `M` | 3.5 (bimbingan eksplisit, Alfieri dkk., 2011 `[A]`) |
| 2 | `Keselamatan perangkat` (jalur C bertanda (F); modul C lain satu kalimat di bagian 1) | aturan bagian 5.6 | tanpa klaim bukti (aturan silabus) | silabus 3.3 |
| 3 | `Ingat kembali` | 3 sampai 5 pertanyaan terbuka, dijawab dari ingatan **sebelum** membuka catatan: dari modul 1 minggu, sekitar 3 minggu, dan sekitar 8 minggu sebelumnya (bila modul pada jarak itu tidak relevan, pakai modul relevan terdekat; di awal jalur ambil dari fondasi atau `matkom-*`). Jarak bertambah bila ujiannya lebih jauh | `K` untuk prinsipnya; `M` untuk pemrograman SMA dan angka 1, 3, 8 minggu (`[asumsi]`) | 3.1 `[A]`, 3.2 `[A]`, 8.2 |
| 4 | `Tujuan` | 3 sampai 5 butir "kamu dapat ...", terukur, selaras kolom Tujuan dan Keluaran `weeks.json` | `M` | 3.5, 3.9 |
| 5 | `Prediksi dulu` | PRIMM: kode atau situasi pendek, **tebak dan tulis hasilnya sebelum menjalankan atau menelusuri**; pada jalur D tanpa kode, tebak keluaran sebuah aturan atau model di atas kertas; pada jalur E tebak distribusi hasil | `M` (PRIMM diuji usia 11 sampai 14, kuasi) | 6.2 `[C]`, 6.3 |
| 6 | `Contoh terselesaikan` | satu contoh lengkap dengan penelusuran langkah demi langkah dan keluaran asli yang dijalankan penulis; diagram atau tabel pendamping (*dual coding*) | `K` untuk pemula pada domain terstruktur | 3.4 `[B]`, 3.7 |
| 7 | `Contoh setengah jadi` | contoh serupa dengan sebagian dikosongkan (`____`), *fading* menuju soal utuh; kuncinya ada di `Kunci dan petunjuk` | `K` (prinsip), `M` (pemrograman; hasil sub-tujuan campuran) | 3.4, 6.3 (Xie dkk., 2019) |
| 8 | `Soal Parsons` (hanya modul berkode; modul tanpa kode memakai "Soal susun urutan" untuk langkah proses) | baris kode diacak, murid menyusun; kunci tercantum | `M` (efisiensi terbukti, belajar setara) | 6.3 (Ericson dkk., 2017) |
| 9 | `Latihan` | 3 sampai 5 soal berurutan dari mudah, termasuk satu soal "tulis pseudocode atau rancangan dulu" bila berkode; tiap soal ditandai `AI: boleh` atau `AI: tanpa AI` (bagian 5.7); kunci berisi langkah, bukan hanya jawaban | `M` | 3.5, 3.8 `[A]` heterogen |
| 10 | `Latihan bercampur` | 2 sampai 3 soal yang **memadukan** topik minggu-minggu sebelumnya (jalur sama atau fondasi), dengan jenis masalah yang mirip di permukaan; bukan untuk pengenalan pertama konsep | `M` (interleaving bergantung materi) | 3.3 `[A]` sedang |
| 11 | `Ulang berjarak` | 3 pertanyaan yang **akan muncul lagi** di `Ingat kembali` modul 1, sekitar 3, dan sekitar 8 minggu ke depan; pertanyaan itu dicatat penulis di modul tujuannya (rantai dijaga lewat bagian 7) | `K` | 3.2 `[A]` |
| 12 | `Kesalahan umum` | 3 sampai 5 salah konsep nyata (termasuk salah konsep tentang mesin konseptual: apa yang sebenarnya dilakukan papan, program, atau simulator) | `M` | 6.2 (Sorva, 2013), 6.5 |
| 13 | `Cek mandiri` | daftar centang kosong "saya dapat ..." (formulir kosong, tanpa data siswa); mengajak murid menguji diri tanpa melihat solusi | `M` (metakognisi; efek pada pemrograman tidak diverifikasi) | 3.9 |
| 14 | `Kunci dan petunjuk` | kunci tiap bagian di atas, dengan langkah; bukan hanya jawaban | `M` | 3.8, 6.5 |
| 15 | `Langkah berikutnya` | modul berikutnya, modul terkait (bagian 4.5), bacaan lanjut | tanpa klaim bukti | - |
| 16 | `Rujukan` | daftar tautan https yang dipakai (aturan bagian 6); dicerminkan ke `references` di indeks | tanpa klaim bukti | - |

**Yang sengaja tidak dipakai:** penyesuaian materi ke "gaya belajar" murid,
"otak kiri dan kanan", angka persentase "kita ingat 10 persen dari yang
dibaca", dan anggapan murid sebagai *digital native* (riset bagian 5).
Membaca ulang dan menyorot tidak dijadikan strategi utama (riset 3.12).

### 5.2 Templat proyek-mini dan proyek-akhir

Pola yang sama dengan bagian 5.1, dengan bagian pengganti:

| Judul bagian | Pengganti dari templat materi |
| --- | --- |
| `Untuk siapa modul ini`, `Keselamatan perangkat` (C), `Ingat kembali` (3 pertanyaan) | sama |
| `Tujuan` | sama, ditambah keluaran yang diminta silabus |
| `Rencana proyek` | menggantikan `Prediksi dulu` dan contoh: murid menulis rencana, kriteria selesai, dan prediksi hasil sebelum mengerjakan; contoh rencana terselesaikan satu halaman |
| `Daftar periksa` | menggantikan `Latihan`: langkah dan titik periksa (termasuk uji, keselamatan, privasi, log pemakaian AI) |
| `Umpan balik sejawat` | ulasan berpasangan atau kelompok dengan format "satu yang sudah baik, satu yang perlu diperbaiki, satu langkah berikutnya" (umpan balik berisi, 3.8); pemrograman berpasangan paling banyak dibuktikan pada mahasiswa, `M` untuk SMA (riset 6.4) |
| `Latihan bercampur`, `Ulang berjarak`, `Kesalahan umum`, `Cek mandiri`, `Kunci dan petunjuk`, `Langkah berikutnya`, `Rujukan` | sama (tidak ada `Contoh setengah jadi` dan `Soal Parsons`) |

Untuk modul proyek-akhir yang berbentuk fase (mis. "Sprint 2", "Ulasan
sejawat"), bagian `Rencana proyek` diganti `Rencana sprint` yang menghubungkan
ke fase sebelumnya. Panjang sasaran 500 sampai 900 kata prosa.

### 5.3 Templat asesmen-refleksi

| Judul bagian | Isi |
| --- | --- |
| `Untuk siapa modul ini` | sama; menyebut bahwa asesmen **tanpa AI** (silabus 7.4) |
| `Ingat kembali` | 5 pertanyaan terbuka dari seluruh semester, dikerjakan dari ingatan; ini inti asesmen formatif berjarak (riset 3.1, 3.2, 8.2) |
| `Tujuan` | kemampuan yang dinilai, selaras silabus 7.1 |
| `Latihan bercampur` | soal terpadu semester (tulis, telusuri, dan praktik), mencampur topik |
| `Refleksi` | pertanyaan jurnal: apa yang sudah dikuasai, apa yang masih keliru, apa rencana belajar berikutnya; murid menulis sendiri, tidak disimpan di repositori |
| `Cek mandiri` | daftar centang kosong |
| `Kunci dan petunjuk` | kunci dengan langkah dan rubrik singkat |
| `Langkah berikutnya`, `Rujukan` | sama |

Panjang sasaran 500 sampai 800 kata prosa.

### 5.4 Panjang

Sasaran **700 sampai 1200 kata prosa** per modul materi (tidak termasuk blok
kode, tabel, bagian `Kunci dan petunjuk`, dan `Rujukan`), agar 210 modul tetap bisa ditinjau:
seluruh seri sekitar 190 ribu kata prosa `[asumsi, hitungan kasar]`. Modul
yang melampaui 1200 kata dipecah atau dipangkas, bukan dilonggarkan. Modul
pilot mengikuti batas ini: `c-x1-m8` 892 kata prosa, `d-x1-m8` 1060 kata prosa
(dihitung 2026-11-19 dengan aturan di atas).

### 5.5 Aturan contoh kode

Pemeriksa yang ada, `scripts/check-module-code.ts`, hanya mengompilasi blok
` ```cpp ` (`g++ -std=c++17 -fsyntax-only`) dan **tidak** menjalankan apa pun.
Karena itu:

| Jenis kode | Label blok | Pemeriksaan |
| --- | --- | --- |
| C++ biasa (jalur C untuk logika di komputer, simulator E) | ` ```cpp ` | `check:module-code` wajib lolos; penulis juga **menjalankan** dan menempelkan keluaran asli |
| Arduino-C++ untuk ESP32 | ` ```arduino ` (bukan `cpp`, agar tidak dikompilasi sebagai C++ biasa) | tidak diperiksa otomatis; penulis mengompilasinya dengan pustaka tiruan `Arduino.h` di komputer (`g++ -fsyntax-only`) dan menyatakannya di catatan penyusun, serta menyertakan blok `cpp` "papan tiruan" untuk ditelusuri tanpa papan |
| Python (jalur D, demonstrasi guru jalur E) | ` ```python ` | tidak diperiksa otomatis; penulis menjalankan dengan Python 3 dan menempelkan keluaran asli; pustaka (mis. `pandas`, `scikit-learn`) disebut versinya |
| TypeScript (jalur E untuk murid jalur B) | ` ```ts ` | diperiksa manual dengan `bun`, dinyatakan di modul |
| Simulator atau alat visual (Quirk) | teks dan tautan | penulis membukanya sendiri dan mencatat apa yang dilihat |
| Pseudocode | ` ```text ` | tidak diperiksa |

Aturan umum: setiap blok yang bisa dijalankan dijalankan penulis lebih dulu;
keluaran di modul adalah keluaran asli; tidak ada data pribadi; data latihan
sintetis dan jelas palsu; satu blok memuat satu gagasan; soal setengah jadi
(`____`) tidak dikompilasi, tetapi **kuncinya dikompilasi** oleh penulis.
Modul menyebut bahwa pemeriksaan hanya menyatakan "bisa dikompilasi atau
dijalankan", bukan "benar untuk semua masukan" (ADR-0004: repositori ini bukan
penilai). Pertanyaan keputusan 3 membahas otomatisasi pemeriksaan non-C++.

### 5.6 Keselamatan perangkat keras (jalur C)

Berlaku untuk seluruh modul C, mengikuti silabus bagian 3.3 `[asumsi]`;
modul tidak menambah aturan baru dan tidak mengutip standar keselamatan
resmi (sumbernya `[belum terverifikasi]`; mitra menyusun dan mengaudit aturan,
pemilik meninjau):

- bagian `Keselamatan perangkat` ada di setiap modul C bertanda (F) dan
  memuat: tanpa listrik jaringan 220 V; hanya daya USB atau baterai AA/AAA yang
  disediakan guru; tidak ada baterai litium tanpa pelindung dan murid tidak
  mengisi daya litium; cabut daya sebelum mengubah rangkaian dan periksa
  polaritas; motor lewat modul pengendali, tidak langsung ke pin papan; tanpa
  kewajiban solder; robot diuji di meja bertepi dan bagian bergerak tidak
  disentuh saat menyala; langkah apa yang dilakukan bila papan panas atau
  berbau;
- daftar periksa keselamatan dibaca di `c-x1-m8` dan `c-xii1-m10` (silabus);
- tidak ada kamera atau mikrofon yang merekam murid dan tidak ada sensor tubuh
  atau lokasi pribadi (silabus 3.3);
- setiap modul C menyediakan jalur **tanpa papan**: kertas dan "papan tiruan"
  C++ di komputer yang mencetak apa yang akan dilakukan papan (pilot `c-x1-m8`);
- nilai pin, tegangan, dan arus yang berbeda antar papan ditulis "periksa
  papanmu" dan ditandai `[belum terverifikasi]`; angka tidak dikarang.

### 5.7 Kebijakan AI SMA (silabus bagian 7.4)

- Pemakaian AI generatif oleh murid di semua jalur **bebas dengan etika**;
  modul tidak melarang dan tidak mewajibkan alat, dan tidak mewajibkan akun.
- Setiap soal `Latihan` ditandai `AI: boleh` atau `AI: tanpa AI`; modul
  asesmen-refleksi dan kuis kode ditandai `tanpa AI`; kontes mini jalur A tidak
  dibahas di sini.
- Pagar pengaman berbasis bukti (`[inferensi]` dari Bastani dkk., 2025;
  Prather dkk., 2024; Lehmann dkk., 2024; riset AI 4.5 dan 6): modul
  menyarankan **jawab dulu sendiri, lalu minta AI menjelaskan atau memberi
  petunjuk bertahap, bukan jawaban jadi**; kode buatan AI dibaca, dijalankan,
  dan diuji; bagian `Latihan` memuat satu soal opsional "catatan pemakaian AI"
  (alat, tujuan, garis besar perintah, bagian yang dipakai, cara memeriksa).
- Tidak menaruh data pribadi, kata sandi, kunci, atau tugas bernilai pada
  permintaan ke layanan AI; modul tidak memuat contoh perintah dengan data
  nyata.
- Modul tidak menggunakan istilah *vibe coding* atau *AI-native engineer*
  sebagai label capaian (silabus 7.4, glosarium).

### 5.8 Privasi dan etika jalur D

- Data latih dan uji hanya sintetis, atau data terbuka dengan lisensi tercatat
  (`D-XI1-M5`); data yang syaratnya tidak jelas tidak dipakai. Data sintetis
  dibangkitkan dengan program atau dikarang dan ditandai "karangan".
- **Tanpa wajah, suara, atau foto siswa atau orang lain sebagai data latih**
  atau uji, termasuk pada Teachable Machine (hanya benda atau pola sintetis).
- Tanpa nama, sekolah, kontak, atau penanda lain yang mengenali orang; contoh
  memakai nama jelas palsu.
- Tanpa akun wajib; kunci layanan dan `.env` tidak ditaruh di modul.
- Modul tentang bias dan privasi (`d-x2-m2`, `d-x2-m3`) memakai kasus
  karangan, bukan kasus orang nyata.
- Klaim tentang cara kerja model, akurasi, atau hukum (UU PDP, UU ITE) ditulis
  sebatas pokok dan bersumber; status lisensi keluaran AI ditandai
  `[belum terverifikasi]` (silabus 7.4).

### 5.9 Aturan jalur E

- Alat murid: Quirk (peramban) dan simulator vektor keadaan buatan sendiri
  (C++ jalur A atau TypeScript jalur B); modul menyatakan kapan bagian itu
  memerlukan dasar pemrograman (bagian 4.4).
- **Qiskit, Python, dan cloud quantum hanyalah demonstrasi guru lewat akun
  sekolah atau lembaga** (`e-xii1-m9` sampai `m12`, `e-xii2-m1`): blok Python
  diberi label "demonstrasi guru, tidak dijalankan murid"; **tanpa akun murid**;
  tanpa token atau kunci di modul; label pekerjaan sintetis (mis.
  `kelas-demo-01`); hasil hanya histogram agregat.
- Klaim tentang perangkat kuantum nyata (jumlah qubit, derau, kuota, harga,
  antrian) berubah cepat: modul menulis "per tanggal akses", mengutip halaman
  resmi, dan menandai `[belum terverifikasi]` bila tidak dibuka; modul tidak
  menjanjikan bahwa Shor atau Grover bermakna dapat dijalankan di perangkat saat
  ini (catatan silabus sendiri `[belum terverifikasi]`).
- Mitos populer (komputasi kuantum "mencoba semua jawaban sekaligus")
  dibongkar eksplisit, sesuai tujuan 6 jalur E dan `e-xi1-m1`, `e-xii1-m7`.
- Amplitudo real dahulu; bilangan kompleks hanya untuk fase (silabus 3.5).

## 6. Aturan rujukan

1. **Hanya sumber resmi atau terverifikasi, dengan URL `https`.** Sumber yang
   sudah dicek pada 2026-11-19 (HTTP 200, halaman sesuai; halaman dokumentasi
   Arduino dimuat lewat JavaScript sehingga yang dicek adalah status 200 pada
   alamat fungsi yang sama, sementara alamat palsu mengembalikan 404):

   | Sumber | Dipakai untuk |
   | --- | --- |
   | `https://docs.arduino.cc/language-reference/en/functions/...` (diperiksa: `pinMode`, `digitalWrite`, `delay`, `digitalRead`) | fungsi Arduino jalur C |
   | `https://docs.espressif.com/projects/arduino-esp32/en/latest/` | dokumentasi Arduino-ESP32 (ESP32) |
   | `https://orangedatamining.com/` | Orange Data Mining, jalur D kelas X |
   | `https://scikit-learn.org/stable/` | `scikit-learn`, jalur D kelas XI |
   | `https://docs.python.org/3/` | Python, jalur D dan demonstrasi E |
   | `https://algassert.com/quirk` | Quirk, jalur E |
   | `https://quantum.cloud.ibm.com/docs/en` | dokumentasi IBM Quantum (demonstrasi guru) |
   | `https://repositori.kemendikdasmen.go.id/33634/1/32.%20Panduan%20Mata%20Pelajaran%20Informatika.pdf` | *Panduan Mata Pelajaran Informatika, Fase D – F, 2025* (sudah dipakai modul lain) |
   | `https://www.elementsofai.com/` | bacaan tambahan pengantar AI (bukan sumber isi) |

   Sumber lain (mis. dokumentasi `pandas`, Qiskit, cppreference, standar
   keselamatan, ketentuan layanan penyedia) **dicek penulis saat memakainya**
   dan ditandai `[belum terverifikasi]` bila tidak dibuka. Penulis mencatat
   tanggal akses di PR.
2. **Tidak menyalin soal.** Soal latihan ditulis sendiri dan orisinal; soal OSN,
   kompetisi, buku, dan situs hanya **ditautkan**, tidak disalin atau
   diparafrasekan (ADR-0007). Seri *Buku AI SMA* tidak ditautkan dan isinya
   tidak disalin atau diparafrasekan sebelum guru membacanya dan penerbit
   menjelaskan lisensinya (silabus bagian 3.4;
   [`riset-buku-ai-onno-w-purbo.md`](riset-buku-ai-onno-w-purbo.md)).
3. **Tidak mengarang fakta.** Harga komponen, versi, dukungan simulator,
   ketentuan layanan, usia minimum, batas kuota, dan nomor pin papan tertentu
   ditandai `[belum terverifikasi]` bila tidak dibuka dan dibaca.
4. **Tidak ada rujukan palsu atau tautan fiktif.** Tiap tautan dicek status
   2xx pada gerbang mutu (bagian 7); tautan mati diganti atau dibuang.
5. **Tidak ada materi hak cipta tanpa izin**, termasuk gambar, diagram, dan
   dataset; gambar dibuat penulis (teks atau tabel) atau berlisensi jelas.

## 7. Gelombang penulisan

Dasar pembagian: **satu agent kira-kira 7 modul**, **satu gelombang = satu
jalur pada satu semester**. Ada 16 gelombang (C 6, D 6, E 4) dan 30 batch
agent. Jalur berbeda pada semester yang sama boleh dikerjakan paralel karena
berkas dan modulnya berbeda; dua batch dalam satu gelombang berjalan
**berurutan**, karena `Ingat kembali` dan `Ulang berjarak` membaca modul
sebelumnya.

| Putaran | Gelombang (jalur, semester, jumlah modul) | Batch agent | Catatan |
| --- | --- | --- | --- |
| P1 | C-X1 (7), D-X1 (7) | 2 | uji tangan pertama; fondasi sebagai sumber `Ingat kembali` |
| P2 | C-X2 (14), D-X2 (14) | 4 | titik evaluasi dengan guru setelah P2 (pertanyaan keputusan 1) |
| P3 | C-XI1 (14), D-XI1 (14), E-XI1 (14) | 6 | jalur E mulai; `e-xi1-m2..m4` matematika |
| P4 | C-XI2, D-XI2, E-XI2 (14 masing-masing) | 6 | jaringan C; AI D; entanglement E |
| P5 | C-XII1, D-XII1, E-XII1 (14 masing-masing) | 6 | robot C; Qiskit (demonstrasi) E |
| P6 | C-XII2, D-XII2, E-XII2 (14 masing-masing) | 6 | proyek akhir ketiga jalur |

Jumlah: (7 + 7) + 14 x 14 = 210 modul; 2 + 4 + 6 + 6 + 6 + 6 = 30 batch.

**Pembagian kerja per batch:**

- Agent menulis hanya berkas `content/sma-coding/modules/<id>.md` modulnya
  dan mengembalikan **entri indeks siap-tempel** (id, judul, `cpItems`,
  `weekCodes`, `gradeLevels`, `prerequisites`, `references`) serta daftar
  catatan penyusun (apa yang dijalankan, apa yang `[belum terverifikasi]`).
- Orchestrator memasukkan entri ke `data/sma-coding/modules.json`, satu
  kali per gelombang, dan memperbarui dokumen yang basi (README program,
  `AGENTS.md` bila perlu). Agent tidak menyentuh indeks, README, atau modul
  agent lain (aturan isolasi paralel).
- Status semua modul baru: `draf`. Agent tidak pernah menulis `disetujui`
  atau mengisi `review`.

**Gerbang mutu per gelombang** (semua harus lolos sebelum gelombang
dinyatakan selesai dan sebelum putaran berikutnya dimulai; dicek orchestrator
sendiri, bukan hanya dari laporan agent):

| Gerbang | Perintah atau cara | Lolos bila |
| --- | --- | --- |
| Validasi korpus | `bun run validate` | keluar 0: indeks, prasyarat, kode minggu, tanpa siklus |
| Kode C++ | `bun run check:module-code` | keluar 0 |
| Kode non-C++ | blok `arduino` dikompilasi dengan `Arduino.h` tiruan, `python` dijalankan, `ts` dijalankan dengan `bun` (manual; otomatis bila keputusan 3 opsi 1) | semua jalan; keluaran di modul sama dengan keluaran asli |
| Cek tautan | tiap URL di `## Rujukan` diakses; status 2xx dan halaman sesuai (belum ada skrip; ad hoc dengan `curl`, hasil dicatat di PR; skrip bila keputusan 3 opsi 1) | semua tautan hidup dan sesuai topik |
| Cek struktur | judul bagian templat lengkap, urut, persis; kata prosa dalam rentang bagian 5.4 | tidak ada bagian hilang atau judul beda |
| Cek sampel isi | orchestrator membaca penuh minimal 3 modul acak per gelombang **dan semua modul bertanda risiko** (keselamatan C bertanda (F), privasi D, demonstrasi cloud E); menghitung ulang angka dan kunci; mencari kata mitos (gaya belajar, otak kiri, persentase retensi); memastikan tidak ada nama, sekolah, atau data nyata; memastikan kebijakan AI, keselamatan, dan privasi bagian 5 | tidak ada temuan terbuka |
| Rantai berjarak | `Ulang berjarak` modul n muncul di `Ingat kembali` modul tujuannya (+1, +3, +8) bila modul itu sudah ada | rantai utuh untuk modul yang sudah ada |
| Mutu umum repo | `format:check`, `lint`, `assist:check`, `typecheck`, `bun test`, `build`, `privacy-check` | semua lolos |
| Fidelity | `check:fidelity` bila `data/sma-coding/` berubah | lolos |

Setelah gelombang: changeset patch, satu commit per gelombang, rujukan issue
#124; **tidak ada modul yang dinyatakan `disetujui`** sampai peninjau yang
ditunjuk pemilik menyetujuinya per modul (pertanyaan 2).

**Risiko dan mitigasi `[asumsi]`:** (1) mutu menurun di akhir seri: batas
panjang, templat ketat, sampel; (2) rantai berjarak putus bila modul diubah:
cek rantai tiap gelombang; (3) beban tinjauan 210 modul: peninjau berperan,
prioritas modul berisiko (pertanyaan 2); (4) fakta cepat basi (perangkat
kuantum, versi pustaka): tanggal akses di modul; (5) aturan keselamatan resmi
dari mitra belum ada: modul C mengikuti silabus saat ini dan diperbarui ketika
mitra menyerahkannya.

## 8. Pertanyaan keputusan untuk pemilik

Setiap pertanyaan disajikan orchestrator lewat dialog pilihan baku;
**opsi pertama adalah rekomendasi**. Dokumen ini tidak mencatat jawaban apa
pun.

1. **Urutan penulisan.**
   - (Disarankan) Opsi 1: enam putaran menurut semester lintas jalur
     (bagian 7), dengan titik evaluasi bersama guru setelah putaran P2
     (42 modul pertama) sebelum lanjut. Kelas X dipakai lebih dulu oleh
     sekolah, dan templat bisa diperbaiki sebelum diulang untuk 168 modul sisanya.
     Konsekuensi: jalur E baru mulai di P3.
   - Opsi 2: jalur per jalur (seluruh C, lalu D, lalu E). Satu jalur selesai
     utuh lebih cepat, tetapi kelas X jalur D baru ada setelah 77 modul C,
     dan perbaikan templat terlambat.
   - Opsi 3: semua putaran tanpa titik evaluasi. Tercepat, tetapi perubahan
     templat membutuhkan penulisan ulang banyak modul.
2. **Peninjauan dan persetujuan.**
   - (Disarankan) Opsi 1: pemilik menunjuk peninjau berperan (guru
     informatika untuk C dan D; mitra untuk keselamatan C; penelaah
     komputasi kuantum untuk E; peran, bukan nama) yang menyetujui **per
     modul**; modul yang belum ditinjau tetap `draf` dengan banner.
     Konsekuensi: sesuai ADR-0007; 210 modul akan lama berstatus draf; modul
     berisiko diprioritaskan.
   - Opsi 2: pemilik meninjau semua sendiri. Kendali penuh, tetapi 210 modul
     menjadi hambatan besar.
   - Opsi 3: persetujuan per gelombang berdasarkan sampel. Cepat, tetapi
     menyetujui modul yang tidak dibaca; bertentangan dengan semangat ADR-0007
     dan perlu perubahan aturan lebih dulu (tidak disarankan).
3. **Pemeriksaan otomatis kode non-C++.**
   - (Disarankan) Opsi 1: issue terpisah, dikerjakan **sebelum P1** untuk
     jalur C dan sebelum modul Python pertama (P3): `check:module-code`
     diperluas agar blok `arduino` dikompilasi dengan `Arduino.h` tiruan di
     komputer dan blok `python` diperiksa sintaksnya (`python3 -m
     py_compile`); TypeScript tetap manual. Konsekuensi: menyentuh `scripts/`
     dan CI di luar rancangan ini; butuh `python3` di CI `[belum
     diperiksa]`; kualitas terjaga saat modul berubah.
   - Opsi 2: manual (penulis menjalankan dan menyatakannya di modul),
     seperti TypeScript di seri matematika. Tanpa pekerjaan skrip, tetapi
     tidak terjaga saat dokumen berubah dan sulit ditinjau pada 210 modul.
   - Opsi 3: tanpa pemeriksaan non-C++ (tidak disarankan: kode salah akan
     dipelajari siswa).
4. **Latihan jalur C tanpa papan.**
   - (Disarankan) Opsi 1: kertas dan "papan tiruan" C++ di komputer
     (dibuktikan di pilot `c-x1-m8`): tanpa akun, tanpa layanan luar, kode
     diperiksa `g++`. Konsekuensi: bukan perilaku papan sungguhan (waktu,
     derau, pin).
   - Opsi 2: sebagai tambahan, simulator daring pihak ketiga (mis. Wokwi,
     Tinkercad) bila lolos verifikasi: dukungan ESP32, akun, ketentuan usia,
     dan ketersediaan semuanya `[belum terverifikasi]`; menambah tautan luar
     dan risiko akun.
   - Opsi 3: wajib papan fisik. Pengalaman nyata, tetapi sekolah tanpa papan
     tidak bisa mengerjakan, bertentangan dengan rancangan silabus bahwa
     setiap minggu praktik dapat dilatih di simulator.

## 9. Modul contoh pilot

Dua modul lengkap sesuai templat bagian 5.1, di
`rancangan-modul-cde-contoh/`. Isinya modul siap pakai yang kelak menjadi
modul nyata; **belum terindeks**, belum berstatus apa pun, dan bukan modul
resmi sampai pemilik menyetujui rancangan ini.

| Berkas | Minggu | Jenis | Catatan |
| --- | --- | --- | --- |
| [`c-x1-m8.md`](rancangan-modul-cde-contoh/c-x1-m8.md) | `C-X1-M8` | materi, jalur C, minggu pertama | Arduino-C++ dan papan tiruan C++; keselamatan; dengan dan tanpa papan |
| [`d-x1-m8.md`](rancangan-modul-cde-contoh/d-x1-m8.md) | `D-X1-M8` | materi, jalur D, minggu pertama | tanpa kode (kelas X jalur D tanpa kode); aturan privasi dan AI; Soal susun urutan |

Bukti verifikasi (2026-11-19, di direktori kerja sementara, bukan di
repositori):

- `c-x1-m8`: blok `cpp` dikompilasi dengan `g++ -std=c++17 -Wall -Wextra` tanpa
  peringatan, **dijalankan**, dan keluarannya (tujuh baris) sama dengan teks di
  modul; blok `arduino` pertama dikompilasi (`-fsyntax-only`) dengan
  `Arduino.h` tiruan; kunci contoh setengah jadi juga dikompilasi.
- `d-x1-m8`: tanpa kode; semua angka dihitung ulang (tanda aturan 4 dari 6
  benar, 7 dari 10 pesan berhadiah spam, `010111010` biner = 186, `1101` biner
  = 13).
- Tautan rujukan diakses (status 200).

Entri indeks contoh (bila kelak disetujui dan ditulis ke `content/`):

```json
{
  "id": "c-x1-m8",
  "title": "Mikrokontroler, papan, dan program pertama; keluaran digital",
  "cpItems": ["E-BK-d", "E-BK-e"],
  "weekCodes": ["C-X1-M8"],
  "bridgeFamilies": [],
  "gradeLevels": ["X"],
  "prerequisites": ["FND-X1-M1", "FND-X1-M3"],
  "audience": "siswa",
  "language": "id",
  "status": "draf",
  "references": [
    {"title": "Arduino: digitalWrite()", "url": "https://docs.arduino.cc/language-reference/en/functions/digital-io/digitalwrite/"},
    {"title": "Arduino-ESP32 (Espressif)", "url": "https://docs.espressif.com/projects/arduino-esp32/en/latest/"}
  ],
  "contentPath": "content/sma-coding/modules/c-x1-m8.md"
}
```

Untuk `d-x1-m8`: `cpItems: []` (jalur D tidak mengklaim CP, dan minggu itu
tidak punya irisan pengayaan), `weekCodes: ["D-X1-M8"]`, `gradeLevels: ["X"]`,
`prerequisites: ["FND-X1-M1", "FND-X1-M3"]`.

## 10. Batasan dan temuan

- Tabel jenis, prasyarat, dan kolom CP adalah rancangan penyusun `[asumsi]`;
  yang bersumber silabus hanya kode minggu, topik, butir CP, dan irisan.
- Dokumen ini tidak diuji di kelas; panjang modul dan beban kerja murid per
  minggu 3 JP belum terbukti.
- Bukti belajar yang dipakai berasal dari riset repositori
  ([`ilmu-belajar-kognitif.md`](../../riset/ilmu-belajar-kognitif.md),
  [`ai-rekayasa-perangkat-lunak.md`](../../riset/ai-rekayasa-perangkat-lunak.md))
  dan tidak diverifikasi ulang di sini; label `K` dan `M` mengikuti riset.
- Dokumen yang akan basi bila rancangan disetujui dan modul ditulis:
  `docs/programs/sma-coding/README.md` (paragraf status dan tabel dokumen),
  `AGENTS.md` tabel tata letak dan `docs/architecture/repository-map.md` bila
  ada berkas baru, `docs/panduan/*` (panduan guru), dan `data/programs.json`
  bila versi program berubah. Dokumen ini tidak mengubahnya.
- Catatan skema di luar lingkup: domain `sma-modules.ts` tidak memeriksa bahwa
  modul jalur D dan E berisi `cpItems` kosong; aturan itu hanya ditegakkan
  lewat rancangan dan tinjauan. Pemeriksaan otomatis dapat diusulkan sebagai
  issue terpisah.

## Changelog

| Versi | Tanggal | Perubahan |
| --- | --- | --- |
| v0.1.0 | 2026-11-19 | Rancangan awal (issue #124): pemetaan 210 modul (jalur C 77, D 77, E 56) dengan jenis minggu, butir CP atau irisan pengayaan, dan prasyarat; templat modul berbasis bukti dengan varian proyek dan asesmen; aturan kode, keselamatan, AI, privasi, rujukan; 16 gelombang penulisan dengan gerbang mutu; empat pertanyaan keputusan; dua modul contoh pilot (`c-x1-m8`, `d-x1-m8`). Status DRAF. |
