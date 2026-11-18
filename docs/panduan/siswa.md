# Panduan siswa

Halaman ini untuk kamu yang belajar dengan bahan dari repositori ini:
**lembar belajar mingguan** dan **modul materi**. Kamu tidak perlu memasang
apa pun. Biasanya mentor atau gurumu membagikannya sebagai berkas atau
cetakan.

Repositori ini bukan tempat mengumpulkan jawaban dan bukan juri otomatis. Ia
tidak menyimpan namamu, sekolahmu, atau nilaimu. Lembar yang kamu terima
tidak punya kolom nama.

## Lembar belajar mingguan

Satu lembar untuk satu minggu (1-28 pada program OSN). Mentor membuatnya
dengan perintah `osn render lembar-siswa --week <n>`. Isinya, berurutan:

| Bagian | Gunanya |
| --- | --- |
| Fokus dan Cakupan materi minggu ini | Apa yang dipelajari minggu itu. |
| Capaian | Apa yang diharapkan bisa kamu lakukan di akhir minggu. |
| Rumpun materi | Kelompok topik besar yang terkait, dengan isinya. |
| Target latihan | Perkiraan jumlah soal. Angka ini kapasitas kerja, bukan batas lulus resmi. |
| Gerbang fase (hanya minggu tertentu) | Bukti yang harus kamu kuasai sebelum lanjut ke fase berikutnya. |
| Kebijakan hint | Aturan meminta bantuan (lihat di bawah). |
| Checklist mandiri | Kotak kosong untuk kamu centang sendiri. |
| Rujukan | Sumber resmi yang bisa dibuka. |

Cara memakainya: baca cakupan dan capaian di awal minggu; kerjakan latihan;
di akhir minggu centang daftar mandiri hanya untuk hal yang benar-benar bisa
kamu lakukan tanpa melihat contoh. Kotak yang belum tercentang adalah bahan
tanyamu ke mentor, bukan kegagalan.

Cuplikan nyata lembar minggu 4:

```text
# Lembar Belajar Siswa -- Minggu 4

**Fokus:** Search/sort dasar & recursion

## Cakupan materi minggu ini
- Linear/binary search
- bubble/insertion
- recursion
- call stack
- prefix sum support.

## Capaian
Memahami invariant sederhana, rekursi dasar, dan binary search.
...
## Checklist mandiri
- [ ] Linear/binary search
- [ ] bubble/insertion
...
```

Kalau kamu sendiri punya terminal dan repositori ini, perintahnya
`bun run src/cli/index.ts render lembar-siswa --week 4` (lihat
[`mulai-cepat.md`](mulai-cepat.md)).

## Lembar belajar program coding SMA

Kalau kamu belajar lewat silabus coding SMA (`sma-coding`), lembarmu dibuat
per minggu dengan kode minggu, misalnya `A-X1-M9` (jalur A, kelas X, semester
1, minggu 9) atau `FND-X1-M3` (blok fondasi bersama kelas X, sebelum memilih
jalur). Jalur yang tersedia: A (C++), B (web), C (IoT dan robotika), D
(kecerdasan buatan dan analisis data), dan E (komputasi kuantum; hanya kelas XI
dan XII, kodenya `E-XI1-M3` dan seterusnya). Jalur D dan E adalah pengayaan di
luar Capaian Pembelajaran (CP): lembarnya tidak memuat butir CP yang
"dipenuhi", hanya bagian **Irisan dengan CP** sebagai keterangan. Gurumu
menjalankan
`osn render lembar-siswa --program sma-coding --week <kode-minggu>`. Isinya:
topik, **Tujuan**, **Keluaran**, **Latihan dan kegiatan**, **Butir CP terkait**
(beserta kutipan Capaian Pembelajaran-nya), **Jembatan ke OSN** (kalau ada),
**Modul terkait** (kalau ada; modul bertanda **DRAF** belum ditinjau
manusia, jadi periksa lagi ke rujukan resminya), dan **Daftar periksa mandiri**
berisi kotak kosong. Cara memakainya sama dengan lembar OSN di atas. Lembar ini
juga tanpa kolom nama. Cuplikan nyata lembar `FND-X1-M3`:

```text
# Lembar Belajar Siswa -- Minggu FND-X1-M3

**Kode minggu:** FND-X1-M3

**Posisi:** Blok fondasi bersama, untuk semua murid sebelum memilih jalur (kelas X, semester X1, minggu 3)

**Topik:** Representasi data: biner, heksadesimal, teks, gambar sederhana

## Tujuan
mengonversi bilangan desimal, biner, dan heksadesimal; menjelaskan bit dan byte; menjelaskan bahwa teks disimpan sebagai kode karakter; menjelaskan gambar sebagai kisi piksel dan warna sebagai komponen merah-hijau-biru

## Keluaran
tabel konversi; lembar kode karakter; gambar 8x8 dalam bentuk deret bit

## Latihan dan kegiatan
konversi manual dengan lembar kerja; menyandikan kata fiktif dengan tabel kode karakter; menggambar gambar 8x8 hitam-putih di kertas kotak lalu menuliskannya sebagai deret bit; memilih warna dan membaca kode heksadesimalnya di aplikasi gambar

## Butir CP terkait
Tidak ada butir CP yang dipetakan ke minggu ini dalam pemetaan silabus.

## Daftar periksa mandiri
- [ ] mengonversi bilangan desimal, biner, dan heksadesimal
- [ ] menjelaskan bit dan byte
- [ ] menjelaskan bahwa teks disimpan sebagai kode karakter
- [ ] menjelaskan gambar sebagai kisi piksel dan warna sebagai komponen merah-hijau-biru
- [ ] Keluaran selesai: tabel konversi; lembar kode karakter; gambar 8x8 dalam bentuk deret bit

---
Sumber: Silabus Pembelajaran Coding SMA, versi 1.2.0, tanggal 2026-11-19.
```

## Modul materi

Modul adalah bacaan lebih panjang: penjelasan, contoh kode C++, dan latihan
untuk satu rumpun materi, misalnya Rekursi atau Struktur Data.

### Membaca tanpa terminal (di GitHub)

Buka halaman repositori di peramban, lalu masuk ke folder
`content/osn/modules/`. Tiap modul adalah satu berkas, misalnya:

- <https://github.com/ahliweb/osn/blob/main/content/osn/modules/dasar-pemrograman.md>
- <https://github.com/ahliweb/osn/blob/main/content/osn/modules/rekursi.md>

Sepuluh modul yang ada: `dasar-pemrograman`, `logika-bitwise`, `aritmetika`,
`aturan-berhitung`, `rekursi`, `search-sort`, `strategi-problem-solving`,
`struktur-data`, `graph-tree`, `geometri-dasar`. Bacaan di GitHub memakai
berkas mentahnya; spanduk status (di bawah) belum muncul di sana, jadi
lihat statusnya di tabel mentor ([`mentor-osn.md`](mentor-osn.md)) atau
tanyakan ke mentormu.

### Membaca dengan perintah

```sh
bun run src/cli/index.ts render modul --id rekursi
```

Hasilnya modul lengkap dengan spanduk status dan daftar rujukan di akhir.

### Arti DRAF

Sejak 2026-11-18 kesepuluh modul OSN sudah disetujui pemilik program. Modul
yang belum disetujui (misalnya modul baru) berstatus **draf** dan diawali
spanduk ini:

```text
> **DRAF — belum ditinjau.** Modul ini ditulis oleh tim (termasuk draf yang disusun agen AI) dan belum ditinjau oleh manusia. Isinya dapat memuat kekeliruan; periksa ke rujukan resmi di bagian bawah sebelum dipakai.
```

Artinya: isi modul bisa saja keliru. Perlakukan sebagai bahan bantu, cocokkan
dengan rujukan di bagian bawah modul, dan tanyakan ke mentor bila ada yang
janggal. Modul yang sudah disetujui tidak berspanduk dan menyebut tanggal
persetujuan di bagian akhir. Spanduk `DITARIK — jangan dipakai.` berarti
modul sudah ditarik.

### Cara belajar dari modul

Modul menyarankan (kutipan dari modul `dasar-pemrograman`): *"baca
penjelasan, ketik ulang setiap contoh (jangan hanya disalin), ubah nilainya,
lalu kerjakan latihan. Contoh kode di modul ini hanya diperiksa bisa
dikompilasi (C++17); itu tidak membuktikan contoh benar untuk semua
masukan, jadi tetap uji sendiri."*

## Kebijakan hint

Tangga bantuan berikut berlaku di semua lembar belajar. Teks di bawah ini
diambil dari data kurikulum (`data/osn/hint-policy.json`) dengan
`jq -r '.calloutText' data/osn/hint-policy.json`:

> Progressive hinting - Gunakan urutan: pertanyaan pemodelan -> arah complexity -> observasi kunci -> pseudocode parsial -> editorial. Solusi penuh adalah opsi terakhir. Semua soal yang membutuhkan editorial wajib dire-solve tanpa bantuan pada interval berikutnya.

Lima tingkatnya (`jq -r '.levels[] | "\(.level). \(.description)"' data/osn/hint-policy.json`):

```text
1. pertanyaan pemodelan
2. arah complexity
3. observasi kunci
4. pseudocode parsial
5. editorial
```

Tingkat 4 dan 5 mewajibkan kamu mengerjakan ulang soal itu tanpa bantuan
pada interval berikutnya. Mulailah dari tingkat 1, jangan langsung loncat ke
editorial.

## Etika latihan

- **Soal ditautkan, bukan disalin.** Soal dari juri atau kontes terdahulu
  ada di sumber resminya. Modul hanya menautkannya dan memuat soal latihan
  karangan sendiri. Kalau modul menyuruh memilih soal dari arsip resmi,
  kerjakan di sana; jangan menyalin soal ke berkas lain atau membagikannya.
- Ketik sendiri solusimu. Template boleh dipakai setelah kamu pernah
  membangunnya sendiri.
- Jangan memasukkan data pribadi (namamu, sekolah, kontak) ke berkas apa pun
  di repositori ini atau ke contoh program.
- Menemukan kesalahan di modul atau lembar? Beri tahu mentor atau gurumu;
  perbaikan dilakukan lewat alur issue dan peninjauan
  ([`kontributor.md`](kontributor.md)).
