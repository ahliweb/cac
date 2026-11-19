## Untuk siapa modul ini

Modul ini untuk murid kelas 7 pada minggu kesembilan semester kedua. Kamu memakai Scratch tanpa akun; simpan berkas sesuai arahan gurumu. Kalau komputer terbatas, tabel penelusuran di kertas cukup untuk sebagian besar kegiatan. Waktunya satu pertemuan, 2 JP. Prasyaratnya `SMP7-2-M7` (game: koordinat, gerak, tabrakan).

## Ingat kembali

Tutup modul ini dan jawab dari ingatan.

1. Apa yang membuat `repeat until <(nyawa) < (1)>` berhenti? (`SMP7-2-M8`)
2. Mengapa `if <touching [Musuh]?>` dibungkus `forever`? (`SMP7-2-M7`)
3. Apa yang diberikan `length of` pada sebuah daftar? (`SMP7-2-M4`)
4. Apa beda data dan informasi? Beri satu contoh. (`SMP7-2-M1`)

Kunci: (1) saat `nyawa` kurang dari 1, diperiksa di awal tiap putaran; (2) supaya diperiksa tiap putaran, bukan sekali; (3) banyak isi daftar; (4) data adalah fakta mentah, informasi adalah hasil olahan yang menjawab pertanyaan, contoh bebas.

## Tujuan

Setelah modul ini kamu dapat:

1. memakai `broadcast` dan `when I receive` supaya satu sprite memberi tahu sprite lain;
2. membedakan `broadcast` dari `broadcast and wait`;
3. menjelaskan **klon** sebagai salinan sprite dan memakai `create clone of`, `when I start as a clone`, dan `delete this clone`;
4. menelusuri urutan kejadian dua sprite dalam tabel waktu.

## Prediksi dulu

Sprite tidak bisa saling membaca skrip, tetapi bisa saling memberi **pesan**. `broadcast [giliran]` mengirim pesan bernama `giliran` ke semua sprite; sprite yang punya `when I receive [giliran]` lalu menjalankan skripnya. Pengirim tidak menunggu penerima.

Sprite Pemain:

```text
when green flag clicked
say [Mulai] for (1) seconds
broadcast [giliran]
say [Selesai] for (1) seconds
```

Sprite Penjaga:

```text
when I receive [giliran]
say [Aku jalan] for (2) seconds
```

**Prediksi.** Pada detik berapa tiap ucapan muncul dan berakhir? Tulis dulu, mulai dari bendera hijau diklik pada detik 0.

**Jalankan.** Isi tabel waktu:

| Sprite | Ucapan | Mulai (detik) | Selesai (detik) |
| --- | --- | --- | --- |
| Pemain | Mulai | | |
| Pemain | Selesai | | |
| Penjaga | Aku jalan | | |

**Selidiki.** Cocokkan dengan prediksimu. Apakah "Selesai" menunggu "Aku jalan"?

## Contoh terselesaikan

Penelusuran: Pemain mengucap "Mulai" pada detik 0 sampai 1. Pada detik 1 pesan terkirim; Pemain langsung lanjut dan mengucap "Selesai" pada detik 1 sampai 2, sementara Penjaga mengucap "Aku jalan" pada detik 1 sampai 3. Kedua ucapan itu berjalan bersamaan.

Bila `broadcast [giliran]` diganti `broadcast [giliran] and wait`, Pemain berhenti di baris itu sampai skrip Penjaga selesai pada detik 3. Jadi "Selesai" bergeser menjadi detik 3 sampai 4.

Sekarang klon. **Klon** adalah salinan sprite yang dibuat saat program berjalan; ia menjalankan skrip `when I start as a clone`. Sprite Musuh membuat tiga klon:

```text
when green flag clicked
hide
go to x: (100) y: (0)
repeat (3)
  create clone of [myself]
  wait (1) seconds
```

Skrip yang dijalankan tiap klon:

```text
when I start as a clone
show
repeat (5)
  change x by (-20)
delete this clone
```

Satu klon mulai di x = 100 (posisi induknya), lalu x menjadi 80, 60, 40, 20, 0, dan klon itu dihapus. Anggap tiap klon selesai dalam kurang dari satu detik.

| Sesudah putaran | Klon dibuat | Klon aktif | Alasan |
| --- | --- | --- | --- |
| 1 | 1 | 0 | klon pertama sudah dihapus |
| 2 | 2 | 0 | klon kedua sudah dihapus |
| 3 | 3 | 0 | klon ketiga sudah dihapus |

Tanpa `delete this clone`, ketiga klon tetap ada: tiga klon aktif ditambah satu sprite induk.

## Contoh setengah jadi

Bila `nyawa` habis, Pemain memberi tahu Musuh supaya hilang. Nama pesan di pengirim dan di penerima harus **sama persis**. Isi bagian kosong dengan nama pesan yang sama.

```text
if <(nyawa) < (1)> then
  broadcast [____]
```

```text
when I receive [____]
hide
```

## Susun urutannya

Enam baris berikut sudah diacak. Susun menjadi skrip klon Musuh yang bergerak lalu dihapus.

- **A.** `delete this clone`
- **B.** `repeat (5)`
- **C.** `when I start as a clone`
- **D.** `  change x by (-20)` (di dalam `repeat`)
- **E.** `show`
- **F.** `go to x: (100) y: (0)`

Tulis urutan hurufnya. Jelaskan mengapa `delete this clone` ada paling akhir.

## Latihan

1. **Ubah.** Pada program Pemain dan Penjaga, ganti `broadcast` dengan `broadcast and wait`. Tulis lagi waktu mulai dan selesai ketiga ucapan.
2. **Buat.** Saat tombol spasi ditekan, Pemain mengirim pesan `mulai`; Musuh menerimanya dan menjalankan `go to x: (50) y: (0)`.
3. **Buat.** Ubah skrip klon supaya tiap klon bergerak `change x by (-10)` sebanyak 4 kali sebelum dihapus. Di mana x klon pada akhirnya?
4. **Selidiki.** Pengirim memakai pesan `giliran`, penerima memakai `gilirn` (kurang satu huruf). Apa yang terjadi pada Penjaga, dan mengapa?
5. **Jelaskan.** Dengan dua kalimat, jelaskan beda `broadcast` dan `broadcast and wait`.

## Latihan bercampur

Pesan dan klon baru diperkenalkan di modul ini, jadi latihan bercampur dengan konsep ini dimulai di modul berikutnya. Dua soal berikut mengulang topik lama.

1. Program: `set [jumlah] to (0)`, lalu `repeat (3)` berisi `change [jumlah] by (2)`, lalu `say (jumlah)`. Apa yang diucapkan? (`SMP7-1-M9`, `SMP7-1-M5`)
2. Daftar `nilai` berisi 7, 3, 5 (isi pertama 7). Program: `replace item (2) of [nilai] with [9]`, lalu `say (item (2) of [nilai])`. Apa yang diucapkan, dan berapa `length of [nilai]`? (`SMP7-2-M4`)

## Ulang berjarak

Kerjakan ulang tanpa melihat modul ini, lalu cocokkan:

- **Minggu depan** (`SMP7-2-M10`): sebut apa yang menjadi masukan, proses, dan keluaran pada game saat sprite menerima pesan lalu berbicara.
- **Sekitar sebulan lagi** (`SMP7-2-M13`): tulis dari ingatan pasangan `broadcast` dan `when I receive` yang mengakhiri game bila nyawa habis.
- **Akhir semester** (`SMP7-2-M14`): tulis dari ingatan beda `broadcast` dan `broadcast and wait`.

## Kesalahan umum

- **Mengira `broadcast` menunggu penerima selesai.** Hanya `broadcast and wait` yang menunggu. Kenali: ucapan pengirim dan penerima berjalan bersamaan.
- **Nama pesan beda satu huruf.** Penerima tidak pernah berjalan. Kenali: tidak ada galat, tetapi tidak ada yang terjadi.
- **Lupa `delete this clone`.** Klon menumpuk selama program berjalan. Kenali: makin lama makin banyak objek di panggung.
- **Membuat klon dari dalam skrip klon tanpa batas.** Klon membuat klon lagi tanpa henti. Kenali: panggung cepat penuh.
- **Mengira variabel "untuk sprite ini saja" terbaca sprite lain.** Sprite lain tidak melihatnya. Kenali: nilai yang dibaca sprite lain tidak berubah.

## Cek mandiri

Tutup modul, jawab tanpa melihat, lalu periksa.

1. Pemain `broadcast [giliran]` pada detik 1 tanpa `and wait`. Apakah Pemain menunggu Penjaga?
2. Apa yang terjadi bila nama pesan di `when I receive` tidak sama dengan di `broadcast`?
3. Apa fungsi `delete this clone`, dan apa akibatnya bila dilupakan?

Daftar periksa (kosong; kamu isi sendiri, tidak dikumpulkan):

- [ ] Aku bisa menulis pesan dan penerimanya.
- [ ] Aku bisa membedakan `broadcast` dan `broadcast and wait`.
- [ ] Aku bisa menjelaskan apa itu klon.

Kunci: (1) tidak; (2) penerima tidak berjalan; (3) menghapus klon itu; bila dilupakan klon menumpuk selama program berjalan.

## Langkah berikutnya

`SMP7-2-M10`, "Komputer sebagai sistem: masukan, proses, keluaran". Tanpa komputer, kamu akan menggambar bagaimana masukan, proses, dan keluaran bekerja, termasuk pada game yang baru kamu buat.

## Catatan untuk guru

- **Waktu:** 2 JP x 40 menit `[asumsi]` (silabus bagian 2). Berpasangan boleh untuk "Prediksi dulu" dan "Latihan"; bukan jaminan efek belajar.
- **Alat:** Scratch tanpa akun murid. Nama blok bisa berbeda menurut bahasa antarmuka. Penulis menelusuri tangan semua program di modul ini dan tidak menjalankannya di editor Scratch. Sebelum mengajar, periksa di versi yang dipakai bahwa klon hilang saat proyek dihentikan, dan bahwa waktu ucapan sesuai tabel.
- **Butir CP:** corpus memetakan minggu ini ke `D-BK-e` dan `DK-BK-c`. Modul ini tidak menyatakan CP "terpenuhi"; ia hanya melatih menulis instruksi untuk pesan dan klon.
- **Kunci "Prediksi dulu":** Pemain "Mulai" 0 sampai 1; Pemain "Selesai" 1 sampai 2; Penjaga "Aku jalan" 1 sampai 3. "Selesai" tidak menunggu.
- **Kunci "Contoh setengah jadi":** nama yang sama di kedua tempat, mis. `game selesai`.
- **Kunci "Susun urutannya":** C, E, F, B, D, A. `delete this clone` paling akhir agar klon bergerak dulu, baru dihapus.
- **Kunci latihan:** (1) Pemain "Mulai" 0 sampai 1; Penjaga "Aku jalan" 1 sampai 3; Pemain "Selesai" 3 sampai 4. (2) `when [space] key pressed`, `broadcast [mulai]`; di Musuh `when I receive [mulai]`, `go to x: (50) y: (0)`. (3) x = 100 - 40 = 60. (4) Penjaga tidak berjalan, karena penerima hanya bereaksi pada nama yang sama persis. (5) `broadcast` tidak menunggu; `broadcast and wait` menunggu semua penerima selesai.
- **Kunci "Latihan bercampur":** (1) 6. (2) 9; `length of` tetap 3.
- **Petunjuk bertahap:** (a) tulis siapa mengirim dan siapa menerima; (b) satu baris tabel per ucapan; (c) tandai di mana pengirim menunggu.
- **AI:** tanpa AI oleh murid. Kebijakan `smp-coding` (silabus bagian 7.1): AI generatif hanya demonstrasi guru, tanpa akun murid; asesmen tanpa AI.
- **Privasi:** tanpa nama murid pada berkas proyek; sprite dan gambar tanpa foto murid.
- **Unsur pembelajaran:** ingat kembali dan jarak (`K`), PRIMM (`K` usia 11 sampai 14), tabel penelusuran (`K`), contoh lengkap lalu setengah jadi (`K`), Parsons (`M`), latihan bercampur (`K`).
