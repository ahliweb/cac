## Untuk siapa modul ini

Modul ini untuk murid kelas 8 pada minggu kedua semester pertama. Kamu memakai Scratch tanpa akun, dengan ekstensi Pen (pensil) untuk menggambar; simpan berkas sesuai arahan gurumu. Kalau komputer terbatas, tabel penelusuran di kertas cukup untuk sebagian besar kegiatan. Waktunya satu pertemuan, 2 JP. Prasyaratnya `SMP7-1-M6` (dekomposisi).

## Ingat kembali

Tutup modul ini dan jawab dari ingatan.

1. Tulis pseudocode tiga baris yang membaca dua angka dan menampilkan jumlahnya. (`SMP8-1-M1`)
2. Berapa derajat putar tiap sudut untuk menggambar segitiga sama sisi, dan mengapa? (`SMP7-1-M7`)
3. Sebut arah dalam derajat untuk atas, kanan, bawah, dan kiri. (`SMP7-1-M4`)
4. Apa yang dikerjakan `repeat (4)` bila isinya `move (10) steps`? (`SMP7-1-M5`)

Kunci: (1) `BACA a`, `BACA b`, `TAMPILKAN a + b`; (2) 120, karena putaran penuh 360 dibagi tiga sudut; (3) 0, 90, 180, dan -90; (4) bergerak 10 langkah, empat kali, jadi 40 langkah.

## Tujuan

Setelah modul ini kamu dapat:

1. membuat **blok buatan sendiri** (`define`) dan memanggilnya;
2. memberi blok sebuah **masukan** (parameter) supaya ukurannya bisa diatur;
3. menelusuri posisi dan arah sprite saat blok buatan sendiri dipanggil;
4. menjelaskan beda *membuat* blok dan *memanggil* blok.

## Prediksi dulu

Di Scratch, kategori **My Blocks** (Blokku) memungkinkan kamu memberi nama pada sekumpulan blok. Isi blok itu ditulis sekali di bawah `define`; setelah itu ia dipanggil seperti blok biasa. Masukan ditulis dalam kurung, misalnya `(jarak)`.

Program P (sprite mulai di (0, 0)):

```text
define langkah-belok (jarak)
move (jarak) steps
turn right (90) degrees

when green flag clicked
go to x: (0) y: (0)
point in direction (90)
langkah-belok (50)
langkah-belok (30)
langkah-belok (50)
```

**Prediksi.** Di mana sprite berhenti dan menghadap ke mana? Tulis dulu.

**Jalankan.** Telusuri dengan tabel:

| Panggilan | x | y | arah |
| --- | --- | --- | --- |
| mulai | 0 | 0 | 90 |
| `langkah-belok (50)` | | | |
| `langkah-belok (30)` | | | |
| `langkah-belok (50)` | | | |

**Selidiki.** Cocokkan dengan prediksimu. Berapa kali `move` dijalankan? Nilai `jarak` berubah tiap panggilan, tetapi isi `define` tetap.

## Contoh terselesaikan

Penelusuran P: (50, 0) arah 180; (50, -30) arah -90; (0, -30) arah 0. Sprite berhenti di (0, -30) menghadap atas.

Sekarang blok `persegi` dengan masukan `sisi`, dipanggil dua kali dengan ukuran berbeda:

```text
define persegi (sisi)
repeat (4)
  move (sisi) steps
  turn right (90) degrees

when green flag clicked
go to x: (0) y: (0)
point in direction (90)
pen down
persegi (40)
pen up
go to x: (60) y: (0)
point in direction (90)
pen down
persegi (20)
```

Penelusuran `persegi (40)`:

| Putaran | Posisi sesudah `move` | Arah sesudah `turn` |
| --- | --- | --- |
| 1 | (40, 0) | 180 |
| 2 | (40, -40) | -90 |
| 3 | (0, -40) | 0 |
| 4 | (0, 0) | 90 |

Sesudah satu `persegi`, sprite kembali ke titik awal dan arah awal, jadi panggilan berikutnya bisa dimulai di mana saja. `persegi (20)` berjalan sama dari (60, 0) dan juga kembali ke (60, 0) menghadap 90.

Tiga hal yang perlu diingat. Pertama, `define` hanya menyimpan resep; tidak ada yang bergerak sampai blok itu dipanggil. Kedua, `sisi` adalah wadah: saat dipanggil `persegi (40)`, `sisi` berisi 40 selama panggilan itu. Ketiga, nama yang jelas membuat program utama terbaca seperti kalimat.

## Contoh setengah jadi

Buat blok `segitiga` untuk segitiga sama sisi. Isi bagian kosong.

```text setengah-jadi
define segitiga (sisi)
repeat (____)
  move (sisi) steps
  turn right (____) degrees
```

Lalu tulis dua panggilan: `segitiga (30)` dan `segitiga (60)`.

## Susun urutannya

Lima baris berikut sudah diacak. Susun menjadi program utama yang menggambar satu persegi berukuran 30 memakai blok `persegi`.

- **A.** `when green flag clicked`
- **B.** `go to x: (0) y: (0)`
- **C.** `point in direction (90)`
- **D.** `pen down`
- **E.** `persegi (30)`

Tulis urutan hurufnya. Jelaskan mengapa `pen down` harus sebelum `persegi (30)`.

## Latihan

1. **Ubah.** Pada contoh `persegi`, tambahkan panggilan `persegi (10)` sesudah `persegi (20)`. Di mana sprite berhenti dan menghadap ke mana?
2. **Buat.** Tulis blok `segitiga-sama-sisi (sisi)` lengkap dengan dua panggilan.
3. **Buat.** Tulis blok `langkah-belok (jarak) (sudut)` dengan dua masukan, lalu panggil empat kali dengan (20) dan (90). Telusuri; apa bentuknya?
4. **Selidiki.** Ganti `move (sisi) steps` di dalam `persegi` menjadi `move (40) steps`. Apa yang terjadi pada `persegi (20)`? Mengapa?
5. **Jelaskan.** Dengan dua kalimat, jelaskan beda `define` dan panggilan blok.

## Latihan bercampur

Blok buatan sendiri adalah konsep baru, jadi latihan bercampur yang memuat blok buatan sendiri dimulai di modul berikutnya; dua soal ini mengulang topik sebelumnya.

1. Pseudocode: `BACA n`, `TETAPKAN total = n * 2000`, `JIKA n >= 10 MAKA` lalu menjorok `TETAPKAN total = total - 5000`, `TAMPILKAN total`. Berapa yang ditampilkan untuk `n` = 5? (`SMP8-1-M1`)
2. Sprite di (10, 5) menjalankan `change x by (-30)` lalu `change y by (20)`. Di mana ia berhenti? (`SMP7-2-M7`)

## Ulang berjarak

Kerjakan ulang tanpa melihat modul ini, lalu cocokkan:

- **Minggu depan** (`SMP8-1-M3`): jelaskan satu manfaat merapikan program berulang dengan blok buatan sendiri.
- **Sekitar sebulan lagi** (`SMP8-1-M4`): tulis blok `lompat (jarak)` yang menggeser sprite ke atas sebanyak `jarak`.
- **Pertengahan semester** (`SMP8-1-M13`): tulis blok buatan sendiri dengan satu masukan, dan sebut apa yang terjadi bila masukan tidak dipakai di dalam isinya.

## Kesalahan umum

- **Membuat blok tetapi tidak memanggilnya.** Kenali: sprite diam saat bendera diklik.
- **Menulis angka tetap di dalam isi padahal ada masukan.** Kenali: semua panggilan menghasilkan ukuran sama.
- **Mengira isi `define` berjalan saat didefinisikan.** Kenali: kamu menunggu gerakan tanpa ada panggilan.
- **Lupa blok mengubah posisi dan arah.** Kenali: panggilan kedua mulai dari tempat yang tidak kamu duga.
- **Nama yang tidak cocok dengan isi**, misalnya `persegi` yang isinya segitiga. Kenali: orang lain bingung membaca program utama.

## Cek mandiri

Tutup modul, jawab tanpa melihat, lalu periksa.

1. Sprite di (0, 0) menghadap 90 menjalankan `langkah-belok (20)` dua kali (isi: `move (jarak) steps` lalu `turn right (90) degrees`). Di mana ia berhenti dan menghadap ke mana?
2. Apa gunanya masukan pada sebuah blok buatan sendiri?
3. Beda *membuat* dan *memanggil* blok?

Daftar periksa (kosong; kamu isi sendiri, tidak dikumpulkan):

- [ ] Aku bisa menulis blok buatan sendiri dengan satu masukan.
- [ ] Aku bisa menelusuri posisi dan arah sprite sesudah panggilan.
- [ ] Aku bisa menjelaskan manfaat nama blok yang jelas.

Kunci: (1) panggilan pertama: (20, 0) arah 180; kedua: (20, -20) arah -90; (2) supaya satu resep dipakai untuk ukuran atau nilai berbeda; (3) membuat menyimpan resep, memanggil menjalankannya.

## Langkah berikutnya

`SMP8-1-M3`, "Abstraksi". Kamu akan merapikan program lama yang berulang-ulang dengan blok buatan sendiri, dan memikirkan detail apa yang cukup disembunyikan di balik nama.

## Catatan untuk guru

- **Waktu:** 2 JP x 40 menit `[asumsi]` (silabus bagian 2). Berpasangan boleh untuk "Prediksi dulu" dan "Latihan"; bukan jaminan efek belajar.
- **Alat:** Scratch tanpa akun murid; ekstensi Pen ditambahkan lewat tombol ekstensi. Nama kategori dan blok (My Blocks, Make a Block, Pen) bisa berbeda menurut bahasa antarmuka dan versi; periksa sebelum mengajar. Penulis menelusuri tangan dan menghitung ulang posisi dengan skrip bantu; ia tidak menjalankan program di editor Scratch. Penelusuran memakai arah Scratch: 90 ke kanan, putar kanan menambah derajat, hasil dinormalkan ke -180 sampai 180.
- **Butir CP:** corpus memetakan minggu ini ke `D-BK-e` dan `DK-BK-c`. Modul ini tidak menyatakan CP "terpenuhi"; ia hanya melatih menulis instruksi dengan blok buatan sendiri.
- **Kunci "Prediksi dulu":** (50, 0) arah 180; (50, -30) arah -90; (0, -30) arah 0. `move` dijalankan tiga kali.
- **Kunci "Contoh setengah jadi":** `repeat (3)` dan `turn right (120) degrees`.
- **Kunci "Susun urutannya":** A, B, C, D, E. Bila `pen down` sesudah `persegi (30)`, sprite bergerak tanpa meninggalkan garis.
- **Kunci latihan:** (1) tetap (60, 0) arah 90, karena tiap persegi kembali ke titik awal. (2) `repeat (3)` berisi `move (sisi) steps` dan `turn right (120) degrees`. (3) (20, 0) arah 180; (20, -20) arah -90; (0, -20) arah 0; (0, 0) arah 90; bentuk persegi. (4) semua persegi berukuran 40, karena masukan tidak dipakai. (5) `define` menyimpan resep; panggilan menjalankannya.
- **Kunci "Latihan bercampur":** (1) 5 x 2000 = 10000, tanpa potongan. (2) (-20, 25).
- **Petunjuk bertahap:** (a) tulis posisi dan arah awal; (b) isi masukan dengan nilai panggilan; (c) jalankan isi blok baris demi baris; (d) catat posisi dan arah akhir panggilan sebelum panggilan berikutnya.
- **AI:** tanpa AI. Kebijakan `smp-coding` (silabus bagian 7.1): AI generatif hanya demonstrasi guru, tanpa akun murid; asesmen tanpa AI.
- **Privasi:** tanpa nama murid pada berkas proyek.
- **Unsur pembelajaran:** ingat kembali dan jarak (`K`), PRIMM (`K` usia 11 sampai 14), tabel penelusuran (`K`), contoh lengkap lalu setengah jadi (`K`), Parsons (`M`), latihan bercampur (`K`).
