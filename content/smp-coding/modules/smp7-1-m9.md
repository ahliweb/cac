## Untuk siapa modul ini

Modul ini untuk murid kelas 7 pada minggu kesembilan. Kamu memakai Scratch tanpa akun; simpan berkas sesuai arahan gurumu. Kalau komputer terbatas, tabel penelusuran di kertas cukup untuk sebagian besar kegiatan. Waktunya satu pertemuan, 2 JP. Prasyaratnya `SMP7-1-M4` (peristiwa dan menggambar bentuk); percabangan dari `SMP7-1-M8` ikut dipakai di latihan.

## Ingat kembali

Tutup modul ini dan jawab dari ingatan.

1. Pada `repeat (n)`, sebut dua hal yang berubah tiap putaran dan satu hal yang tetap. (`SMP7-1-M5`)
2. Apa yang dijalankan `if ... else` bila kondisinya salah? (`SMP7-1-M8`)
3. Tulis arti **dekomposisi** dengan kalimatmu sendiri. (`SMP7-1-M6`)
4. Sebutkan tiga kebiasaan kartu instruksi yang tepat. (`SMP7-1-M1`)

Kunci: (1) yang berubah: posisi dan arah sprite (keadaan sprite); yang tetap: isi blok di dalam `repeat`; (2) cabang `else`; (3) memecah masalah besar menjadi bagian kecil yang dikerjakan sendiri-sendiri; (4) satu langkah satu tindakan, sebut benda dan jumlah, urutan dipikirkan.

## Tujuan

Setelah modul ini kamu dapat:

1. menjelaskan **variabel** sebagai kotak bernama yang menyimpan satu nilai yang bisa berubah;
2. memakai `set` untuk mengisi nilai dan `change` untuk menambah atau mengurangi nilai;
3. menelusuri nilai variabel baris demi baris dengan tabel;
4. memakai variabel sebagai angka di blok lain, misalnya panjang sisi.

## Prediksi dulu

Selama ini yang berubah hanyalah posisi dan arah sprite. Kadang kamu perlu mengingat hal lain, misalnya skor atau sisa nyawa. Untuk itu ada **variabel**: kotak bernama yang menyimpan satu nilai. Blok `set [skor] to (10)` **mengganti** isi kotak dengan 10. Blok `change [skor] by (5)` **menambah** isi kotak dengan 5; angka negatif mengurangi. Nama variabel dalam tanda kurung, seperti `(skor)`, berarti "nilai yang sedang tersimpan".

Program W:

```text
when green flag clicked
set [skor] to (10)
set [nyawa] to (3)
repeat (2)
  change [skor] by (5)
  change [nyawa] by (-1)
say (skor) for (2) seconds
```

**Prediksi.** Berapa isi `skor` dan `nyawa` pada akhirnya, dan apa yang diucapkan sprite? Tulis dulu.

**Jalankan.** Susun W, klik bendera hijau, dan isi tabel penelusuran:

| Blok | skor | nyawa |
| --- | --- | --- |
| `set [skor] to (10)` | | |
| `set [nyawa] to (3)` | | |
| `change [skor] by (5)` (putaran 1) | | |
| `change [nyawa] by (-1)` (putaran 1) | | |
| `change [skor] by (5)` (putaran 2) | | |
| `change [nyawa] by (-1)` (putaran 2) | | |

**Selidiki.** Cocokkan dengan prediksimu. Kembali ke pertanyaan minggu lalu: yang berubah tiap putaran sekarang bisa juga isi variabel, bukan hanya posisi sprite.

## Contoh terselesaikan

Penelusuran program W:

| Blok | skor | nyawa | Alasan |
| --- | --- | --- | --- |
| `set [skor] to (10)` | 10 | tak berubah | `set` mengganti isi, apa pun isi sebelumnya. |
| `set [nyawa] to (3)` | 10 | 3 | Kotak kedua diisi 3. |
| `change [skor] by (5)` (putaran 1) | 15 | 3 | 10 + 5. |
| `change [nyawa] by (-1)` (putaran 1) | 15 | 2 | 3 - 1. |
| `change [skor] by (5)` (putaran 2) | 20 | 2 | 15 + 5. |
| `change [nyawa] by (-1)` (putaran 2) | 20 | 1 | 2 - 1. |

Sprite mengucapkan 20. Tiga hal yang perlu diingat. Pertama, `set` menimpa isi lama, sedangkan `change` memakai isi lama lalu menambahkannya. Kedua, variabel **menyimpan nilainya** sampai diubah, termasuk saat bendera hijau diklik lagi; karena itu program yang menghitung selalu perlu `set` di awal supaya mulai dari nilai yang kamu mau. Ketiga, variabel bisa dipakai sebagai angka di blok lain.

Contoh pemakaian sebagai angka:

```text
when green flag clicked
set [sisi] to (60)
repeat (4)
  move (sisi) steps
  turn right (90) degrees
```

Program ini menggambar persegi sisi 60. Untuk persegi sisi 80, hanya satu blok yang diubah: `set [sisi] to (80)`. Itu keuntungan variabel: satu angka yang dipakai di banyak tempat diubah di satu tempat.

## Contoh setengah jadi

Sprite harus mengucapkan 8 sesudah empat putaran. Isi bagian kosong, lalu telusuri. Ada lebih dari satu jawaban benar; tuliskan satu pasangan.

```text
when green flag clicked
set [tekan] to (____)
repeat (4)
  change [tekan] by (____)
say (tekan) for (2) seconds
```

## Susun urutannya

Lima baris berikut sudah diacak. Susun menjadi program yang mengucapkan skor 30 sesudah tiga putaran.

- **A.** `when green flag clicked`
- **B.** `set [skor] to (0)`
- **C.** `repeat (3)`
- **D.** `  change [skor] by (10)` (di dalam `repeat`)
- **E.** `say (skor) for (2) seconds`

Tulis urutan hurufnya. Jelaskan mengapa `set` harus sebelum `repeat` dan `say` sesudah `repeat`.

## Latihan

1. **Ubah.** Pada program W, ubah `change [nyawa] by (-1)` menjadi `change [nyawa] by (-2)`. Prediksi nilai akhir `nyawa`, lalu telusuri.
2. **Buat.** Tulis program yang mengisi `skor` dengan 0, menambahnya 4 kali masing-masing 25, lalu mengucapkan hasilnya. Telusuri.
3. **Buat.** Tulis program persegi dengan variabel `sisi` dan jalankan untuk sisi 40 dan sisi 90 tanpa mengubah blok lain selain `set`.
4. **Selidiki.** Program: `set [skor] to (2)`, lalu `repeat (3)` berisi `change [skor] by (skor)`. Telusuri nilai `skor` tiap putaran. Apa yang terjadi?
5. **Jelaskan.** Dengan dua kalimat, jelaskan beda `set` dan `change`.

## Latihan bercampur

1. Program: `set [skor] to (0)`, lalu `repeat (4)` berisi `change [skor] by (3)` dan `if <(skor) > (6)> then change [skor] by (-1)`. Berapa nilai akhir `skor`? (`SMP7-1-M5`, `SMP7-1-M8`)
2. Program persegi dengan `set [sisi] to (60)` diubah menjadi segitiga sama sisi dengan sisi yang sama. Sebut dua angka yang berubah. (`SMP7-1-M4`, `SMP7-1-M7`)

## Ulang berjarak

Kerjakan ulang tanpa melihat modul ini, lalu cocokkan:

- **Minggu depan** (`SMP7-1-M10`): tulis beda `set` dan `change`, lalu telusuri `skor` pada satu program pendek.
- **Sekitar sebulan lagi** (`SMP7-1-M13`): tulis blok yang menyiapkan skor sebelum permainan dimulai.
- **Akhir semester** (`SMP7-1-M14`): tulis dari ingatan program yang menghitung skor lewat tiga putaran.

## Kesalahan umum

- **Lupa `set` di awal.** Variabel menyimpan nilai dari jalan sebelumnya. Kenali: skor makin besar tiap bendera diklik.
- **Menukar `set` dan `change`.** `set [skor] to (5)` di dalam `repeat` membuat skor selalu 5. Kenali: nilai tidak bertambah.
- **Mengira variabel hanya bisa angka.** Variabel juga bisa menyimpan teks; modul berikutnya memakainya untuk jawaban.
- **Menulis nama variabel tanpa kurung saat memakainya.** Di blok lain, nilai ditulis `(skor)`.
- **Mengira nilai lama hilang saat `change`.** `change` memakai nilai lama sebagai dasar penjumlahan.

## Cek mandiri

Tutup modul, jawab tanpa melihat, lalu periksa.

1. Apa arti variabel?
2. `set [a] to (4)`, `change [a] by (3)`, `change [a] by (-2)`. Berapa isi `a`?
3. Mengapa program yang menghitung skor perlu `set` di awal?

Daftar periksa (kosong; kamu isi sendiri, tidak dikumpulkan):

- [ ] Aku bisa memakai `set` dan `change`.
- [ ] Aku bisa menelusuri nilai variabel.
- [ ] Aku bisa memakai variabel sebagai angka di blok lain.

Kunci: (1) kotak bernama yang menyimpan satu nilai yang bisa berubah; (2) 5; (3) supaya selalu mulai dari nilai yang kamu mau, karena variabel menyimpan nilai dari sebelumnya.

## Langkah berikutnya

`SMP7-1-M10`, "Masukan pengguna: kuis". Kamu akan membuat sprite yang bertanya, menyimpan jawaban pemain, memeriksanya dengan kondisi, dan menghitung skor dengan variabel.

## Catatan untuk guru

- **Waktu:** 2 JP x 40 menit `[asumsi]` (silabus bagian 2). Berpasangan boleh untuk "Prediksi dulu" dan "Latihan"; bukan jaminan efek belajar.
- **Alat:** Scratch tanpa akun murid; variabel dibuat lewat kategori Variabel (untuk semua sprite). Penulis menelusuri tangan semua program di modul ini dan tidak menjalankannya di editor Scratch.
- **Butir CP:** corpus memetakan minggu ini ke `D-BK-e` dan `DK-BK-c`. Modul ini tidak menyatakan CP "terpenuhi"; ia hanya melatih menulis instruksi yang memakai nilai tersimpan.
- **Kunci "Prediksi dulu":** skor 20, nyawa 1; sprite mengucapkan 20.
- **Kunci "Contoh setengah jadi":** mis. `set [tekan] to (0)` dan `change [tekan] by (2)`; atau 4 dan 1; syaratnya awal + 4 x tambahan = 8.
- **Kunci "Susun urutannya":** A, B, C, D, E. `set` sebelum `repeat` agar skor mulai dari 0 satu kali; `say` sesudah `repeat` agar yang diucapkan adalah hasil akhir.
- **Kunci latihan:** (1) nyawa 3, 1, -1: nilai akhir -1. (2) `set [skor] to (0)`, `repeat (4)` dengan `change [skor] by (25)`, `say (skor)`: 100. (3) ganti hanya `set [sisi] to (40)` atau `(90)`. (4) 2, 4, 8, 16: skor berlipat tiap putaran karena `change` memakai nilai saat itu; akhirnya 16. (5) `set` mengganti isi; `change` menambah ke isi yang ada.
- **Kunci "Latihan bercampur":** (1) skor: 3, 6, 9 lalu kurang 1 menjadi 8, 11 lalu kurang 1 menjadi 10; nilai akhir 10. (2) `repeat (3)` dan `turn right (120) degrees`; sisi tetap 60.
- **Petunjuk bertahap:** (a) tulis nilai awal tiap variabel; (b) perbarui satu variabel per baris; (c) periksa kondisi dengan nilai saat itu.
- **AI:** tanpa AI. Kebijakan `smp-coding` (silabus bagian 7.1): AI generatif hanya demonstrasi guru, tanpa akun murid; asesmen tanpa AI.
- **Privasi:** tanpa nama murid pada berkas proyek.
- **Unsur pembelajaran:** ingat kembali dan jarak (`K`), PRIMM (`K` usia 11 sampai 14), tabel penelusuran (`K`), contoh lengkap lalu setengah jadi (`K`), Parsons (`M`), latihan bercampur (`K`).

## Rujukan

- *Panduan Mata Pelajaran Informatika, Fase D – F*, BSKAP, 2025:
  <https://repositori.kemendikdasmen.go.id/33634/1/32.%20Panduan%20Mata%20Pelajaran%20Informatika.pdf>
- Scratch, tentang Scratch (situs resmi Scratch Foundation): <https://scratch.mit.edu/about>
