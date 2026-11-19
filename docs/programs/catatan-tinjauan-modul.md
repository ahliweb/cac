# Catatan Tinjauan Modul Draf untuk Peninjau Manusia

- **Version:** v0.1.0
- **Last updated:** 2026-11-19
- **Status:** **DRAF** (catatan kerja untuk peninjau manusia, bukan keputusan pemilik dan bukan persetujuan modul apa pun). Konten karangan menurut [ADR-0007](../architecture/adr/0007-authored-learning-content.md). Tidak mengubah silabus, korpus, atau isi modul.
- **Changeset:** `.changeset/sinkron-dokumen-modul-belajar.md` (patch): dokumen baru, sinkron dokumen modul belajar enam program (#124).

> **DRAF, bukan keputusan pemilik.** Dokumen ini mengumpulkan butir yang
> **diketahui** perlu dicek manusia pada modul draf, supaya tinjauan
> ([#125](https://github.com/ahliweb/osn/issues/125)) dan penulisan modul
> baru tidak mengulang pencarian. Daftarnya **tidak lengkap**: modul yang tidak
> disebut di sini tetap belum ditinjau. Seluruh 599 modul enam program coding
> berstatus `draf` per 2026-11-19. Agent tidak pernah mengubah status modul
> menjadi `ditinjau` atau `disetujui` dan tidak mencatat persetujuan atas nama
> pemilik. Butir yang berakhir pada keputusan (perubahan silabus, tingkat AI,
> aturan permainan) adalah hak pemilik; peninjau hanya memeriksa dan
> melaporkan.

## 0. Cara memakai catatan ini

- Tiap butir menyebut **modul**, **apa yang dicek**, dan **sumber** (berkas
  repositori atau sumber resmi yang perlu dibuka).
- `[asumsi]`: pilihan penyusun modul, bukan data resmi atau keputusan pemilik.
- Daftar periksa umum tinjauan (fakta bertanggal, regulasi, unsur ilmiah,
  kode dijalankan, tanpa data pribadi, kebijakan AI per program) ada di
  [`docs/panduan/pemilik-peninjau.md`](../panduan/pemilik-peninjau.md), bagian
  "Meninjau modul draf".
- Membaca modul: `osn render modul --program <id-program> --id <id-modul>`
  (tambahkan `--lembar` untuk lembar anak `tk-coding` dan `sd-coding`).
- Modul draf berspanduk `DRAF`; hapus spanduk itu hanya lewat siklus ulas
  ADR-0007 oleh manusia.

## 1. Nama blok dan menu belum dicocokkan ke dokumentasi resmi

### 1.1 Blok MakeCode dan Scratch di `smp-coding`

| Butir | Modul | Yang dicek | Sumber |
| --- | --- | --- | --- |
| 1 | `smp8-1-m9`, `smp8-1-m10`, `smp8-1-m11` | Nama dan bentuk blok MakeCode untuk micro:bit (misalnya `on start`, `repeat`, `forever`, `pause (ms)`, `show number`) ditulis dari pengetahuan penyusun, **belum dicocokkan** ke dokumentasi resmi; modul sendiri menyatakan nama blok dapat berbeda menurut versi editor dan bahasa antarmuka. Cocokkan dengan simulator yang dipakai sekolah dan dokumentasi blok resmi. | `content/smp-coding/modules/smp8-1-m9.md` sampai `smp8-1-m11.md`; dokumentasi resmi MakeCode micro:bit (makecode.microbit.org) |
| 2 | `smp8-2-m1`, `smp8-2-m6`, `smp8-2-m7`, `smp8-2-m8`, `smp8-2-m9` | Nama blok atau menu Scratch dan MakeCode serta cara kerjanya pada modul peralihan blok ke teks belum dicocokkan ke dokumentasi resmi (modul bertanda `[belum terverifikasi]` bila ada). | `content/smp-coding/modules/smp8-2-m1.md`, `smp8-2-m6.md` sampai `smp8-2-m9.md`; dokumentasi resmi Scratch dan MakeCode |

## 2. Tingkat AI dan aturan `[asumsi]`

| Butir | Modul | Yang dicek | Sumber |
| --- | --- | --- | --- |
| 3 | `kul-i-306`, `kul-i-307` | Tingkat kebijakan AI (Hijau, Kuning, Merah) pada dua modul ini `[asumsi]` karena silabus belum menetapkannya untuk mata kuliah tersebut. Keputusan tingkatnya hak pemilik; peninjau memeriksa kelayakannya terhadap kebijakan AI kuliah. | `content/kuliah-coding/modules/kul-i-306.md`, `kul-i-307.md`; `docs/programs/kuliah-coding/silabus.md` bagian 6.3 sampai 6.5 |
| 4 | `sd6-2-m4` sampai `sd6-2-m7` dan `sd6-2-m8` sampai `sd6-2-m14` | Aturan mesin kartu "petunjuk dan suara" (sifat yang hanya muncul di satu kelompok menjadi petunjuk, tiap petunjuk memberi satu suara) `[asumsi]`, **berbeda** dari aturan kelas 5. Periksa kesesuaiannya dengan silabus kelas 6 dan keterbacaannya untuk anak. | `content/sd-coding/modules/sd6-2-m4.md` sampai `sd6-2-m14.md`; `docs/programs/sd-coding/silabus.md` bagian 5 dan 6 |
| 5 | `sd3-2-m10`, `sd3-2-m12` | Kosakata JIKA, MAKA, TIDAK untuk "mesin kotak" (juga AMBIL dan TARUH) `[asumsi]`. Periksa apakah kosakata itu konsisten dengan modul kelas sebelum dan sesudahnya serta cocok bagi murid kelas 3. | `content/sd-coding/modules/sd3-2-m10.md`, `sd3-2-m12.md`; `docs/programs/sd-coding/silabus.md` |

## 3. Menyimpang dari rancangan atau tidak sejalan antarberkas

| Butir | Modul atau berkas | Yang dicek | Sumber |
| --- | --- | --- | --- |
| 6 | `smp8-2-m13` | Bagian "Ingat kembali" memuat **7 soal**, sedangkan rancangan menetapkan 3 sampai 5 pertanyaan berjarak (modul penutup semester, 7 soal menjangkau banyak minggu). Putuskan apakah tujuh soal diterima atau dipangkas. | `content/smp-coding/modules/smp8-2-m13.md`; `docs/programs/smp-coding/rancangan-modul.md` (gerbang G3 pedagogi) |
| 7 | `tk-coding` (`goals.json` dan `weeks.json`) | `data/tk-coding/goals.json` menyebut "belok kanan" pada tujuan instruksi arah, sedangkan `data/tk-coding/weeks.json` tidak. Ini ketidaksejajaran **silabus** (keputusan pemilik), bukan galat modul; peninjau modul TK perlu tahu supaya tidak menganggap modul menyimpang. | `data/tk-coding/goals.json`; `data/tk-coding/weeks.json`; `docs/programs/tk-coding/silabus.md` |
| 8 | `d-xii1-m10` | Angka model "E1" berbeda dari `d-xii1-m7` dan `d-xii1-m8` karena data karangan di modul ini lebih sederhana; modul menyatakannya. Periksa bahwa perbedaan itu dinyatakan jelas dan tidak membingungkan murid. | `content/sma-coding/modules/d-xii1-m10.md`, `d-xii1-m7.md`, `d-xii1-m8.md` |

## 4. Rujukan yang sulit diverifikasi dari luar

| Butir | Modul | Yang dicek | Sumber |
| --- | --- | --- | --- |
| 9 | `c-xii1-m1`, `c-xii1-m2` | Indeks hanya merujuk *Panduan Mata Pelajaran Informatika, Fase D - F, 2025*. Rujukan dokumentasi Arduino (`docs.arduino.cc`) dirender JavaScript, sehingga isinya tidak terbaca oleh pemeriksa tautan biasa; bacalah isi dari repositori sumber dokumentasi Arduino, bukan dari halaman web. | `data/sma-coding/modules.json` (entri `c-xii1-m1`, `c-xii1-m2`); `content/sma-coding/modules/c-xii1-m1.md`, `c-xii1-m2.md` |

## 5. Fakta layanan dan perangkat lunak yang berubah cepat

| Butir | Modul | Yang dicek | Sumber |
| --- | --- | --- | --- |
| 10 | `e-xii1-m11`, `e-xii1-m12`, `e-xii2-m1` sampai `e-xii2-m13` (khususnya yang menyebut layanan) | Angka layanan IBM Quantum (jenis paket, jatah setara 10 menit, tarif awal, satuan RU) ditulis "per 2026-11-19"; **jatah ditulis "per 28 hari" pada halaman dokumentasi dan "per bulan" pada halaman harga**, jadi selisihnya perlu diperiksa ulang. API Qiskit Runtime berubah antarversi; cocokkan nama dan tanda tangan fungsi dengan versi yang dicatat modul. Ulangi pada hari tinjauan. | `content/sma-coding/modules/e-xii1-m11.md`, `e-xii1-m12.md`, `e-xii2-m*.md`; halaman resmi IBM Quantum (paket, harga, dokumentasi Qiskit Runtime) |

## 6. Hukum

| Butir | Modul atau berkas | Yang dicek | Sumber |
| --- | --- | --- | --- |
| 11 | Silabus `sma-coding` minggu `B-XI2-M10` (dan modul yang kelak mengikutinya); modul yang sudah menyebut pasal | Silabus memuat "pokok UU ITE dan UU PDP" pada `B-XI2-M10` (juga `B-XII2-M10`, `C-XII1-M11`, bagian 4 butir F-LD-g) **tanpa menyebut nomor pasal**. Pasal 30 UU ITE (UU 11/2008, akses ilegal) sudah **dicabut** oleh UU 1/2023, berlaku 2 Januari 2026; modul untuk minggu itu harus memakai sumber resmi, bukan menyebut pasal itu sebagai hukum yang masih berlaku. Modul yang sudah menyebutnya (`kul-i-301`, `kul-i-305`, `kul-u-201`, `c-xii1-m11`) perlu diperiksa bahwa pencabutannya dinyatakan dengan benar. Menyunting silabus adalah keputusan pemilik (revisi silabus, ADR-0007); peninjau hanya melaporkan. | `docs/programs/sma-coding/silabus.md` (baris minggu `B-XI2-M10`, bagian 4 butir F-LD-g); `content/kuliah-coding/modules/kul-i-301.md`, `kul-i-305.md`, `kul-u-201.md`; `content/sma-coding/modules/c-xii1-m11.md`; JDIH BPK atau situs resmi pembentuk undang-undang |

## 7. Cakupan program yang belum ada (keputusan pemilik)

| Butir | Bagian | Keadaan | Sumber |
| --- | --- | --- | --- |
| 12 | Jalur A dan B `sma-coding` | Tidak punya **modul mingguan** di `content/sma-coding/`; hanya jalur C, D, dan E (210 modul) dan 29 modul lintas jalur yang ada. Menulis modul jalur A dan B adalah pekerjaan lanjutan yang belum diputuskan. | `data/sma-coding/modules.json`; `docs/programs/sma-coding/README.md` bagian "Modul belajar" |
| 13 | Jembatan `smp-coding` ke `sma-coding` | `data/smp-coding/bridge.json` dan `data/sma-coding/smp-bridge.json` menyebut minggu `A-X1-M9` sampai `A-X1-M12` (dan `B-X1-M9` sampai `B-X1-M12`) sebagai tempat "mengajar dari awal", padahal modul mingguan jalur A dan B belum ada. Itu pekerjaan lanjutan dan keputusan pemilik; modul SMP tidak boleh menyebut modul A atau B yang belum ada sebagai prasyarat. | `data/smp-coding/bridge.json`; `data/sma-coding/smp-bridge.json` |

## Cara memperbarui catatan ini

Tambahkan butir baru saat penulis atau peninjau menemukannya, dengan tiga
unsur (modul, yang dicek, sumber). Hapus atau tandai selesai sebuah butir
**hanya** bila manusia sudah memeriksanya dan hasilnya dicatat di issue
tinjauan; catatan ini bukan bukti bahwa modul sudah ditinjau.

## Changelog

| Versi | Tanggal | Perubahan |
| --- | --- | --- |
| v0.1.0 | 2026-11-19 | Dokumen pertama (#124, #125): 13 butir tinjauan yang sudah diketahui untuk modul draf enam program. |
