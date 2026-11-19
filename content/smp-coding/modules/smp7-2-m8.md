## Untuk siapa modul ini

Modul ini untuk murid kelas 7 pada minggu kedelapan semester kedua. Kamu memakai Scratch tanpa akun; simpan berkas sesuai arahan gurumu. Kalau komputer terbatas, tabel penelusuran di kertas cukup untuk sebagian besar kegiatan. Waktunya satu pertemuan, 2 JP. Prasyaratnya `SMP7-2-M7` (game: koordinat, gerak, tabrakan).

## Ingat kembali

Tutup modul ini dan jawab dari ingatan.

1. Tulis blok yang membuat Pemain kembali ke titik awal bila menyentuh Musuh. (`SMP7-2-M7`)
2. Tulis blok yang menaruh satu nilai ke ujung daftar `skor-tertinggi` dan sebut nomor urut isi pertama. (`SMP7-2-M4`)
3. Jelaskan beda `set` dan `change`, lalu tulis blok yang menambah `skor` 10 tanpa mengubah blok lain. (`SMP7-1-M9`)
4. Tulis blok yang menyiapkan `skor` dan menambahnya bila kondisi benar. (`SMP7-1-M14`)

Kunci: (1) `if <touching [Musuh]?> then` lalu `go to x: (-50) y: (0)`, di dalam `forever`; (2) `add (skor) to [skor-tertinggi]`, dan isi pertama bernomor 1; (3) `set` mengganti isi, `change` menambah ke isi yang ada; `change [skor] by (10)`; (4) `set [skor] to (0)` sekali di awal, lalu `if <kondisi> then` `change [skor] by (1)`.

## Tujuan

Setelah modul ini kamu dapat:

1. menyiapkan `skor`, `nyawa`, dan `level` dengan `set` di awal permainan;
2. mengubahnya dengan `change` pada peristiwa yang tepat;
3. mengakhiri permainan bila `nyawa` habis;
4. menelusuri ketiga variabel itu per putaran dalam tabel.

## Prediksi dulu

Game butuh tiga angka yang berubah: **skor** (naik bila berhasil), **nyawa** (turun bila kena), dan **level** (naik bila skor cukup). Ketiganya variabel. `set` dipakai sekali di awal supaya permainan selalu mulai dari nilai yang sama; `change` dipakai tiap ada peristiwa.

Program P:

```text
when green flag clicked
set [skor] to (0)
set [nyawa] to (3)
repeat (4)
  change [skor] by (10)
  if <(skor) > (25)> then
    change [nyawa] by (-1)
```

**Prediksi.** Berapa `skor` dan `nyawa` pada akhirnya? Tulis dulu.

**Jalankan.** Telusuri P:

| Putaran | skor sesudah `change` | skor > 25? | nyawa |
| --- | --- | --- | --- |
| 1 | | | |
| 2 | | | |
| 3 | | | |
| 4 | | | |

**Selidiki.** Cocokkan dengan prediksimu. Pada putaran berapa nyawa pertama kali berkurang, dan mengapa?

## Contoh terselesaikan

Penelusuran P: skor 10, 20, 30, 40; kondisi salah, salah, benar, benar; nyawa 3, 3, 2, 1. Hasil akhir `skor` 40 dan `nyawa` 1.

Sekarang skrip game lengkap untuk sprite Pemain. Anggap Pemain bersentuhan dengan Musuh hanya pada putaran 2, 4, dan 5.

```text
when green flag clicked
set [skor] to (0)
set [nyawa] to (3)
set [level] to (1)
go to x: (-50) y: (0)
repeat until <(nyawa) < (1)>
  change [skor] by (1)
  if <touching [Musuh]?> then
    change [nyawa] by (-1)
    go to x: (-50) y: (0)
  if <(skor) = (3)> then
    change [level] by (1)
say [Permainan selesai] for (2) seconds
stop [all]
```

| Putaran | skor | touching? | nyawa | level |
| --- | --- | --- | --- | --- |
| 1 | 1 | tidak | 3 | 1 |
| 2 | 2 | ya | 2 | 1 |
| 3 | 3 | tidak | 2 | 2 |
| 4 | 4 | ya | 1 | 2 |
| 5 | 5 | ya | 0 | 2 |

Sesudah putaran 5 `nyawa` bernilai 0, jadi `repeat until` berhenti, Pemain mengucap "Permainan selesai", dan `stop [all]` menghentikan semua skrip. Hasil akhir: skor 5, nyawa 0, level 2. Tiga hal yang perlu diingat. Semua `set` ada di luar perulangan. `repeat until` memeriksa kondisinya di awal tiap putaran. Dan `stop [all]` menghentikan skrip sprite lain juga.

## Contoh setengah jadi

Pemain mendapat satu nyawa tambahan tepat saat skor mencapai 10. Isi bagian kosong, lalu jelaskan mengapa memakai `change`, bukan `set`.

```text
if <(skor) = (____)> then
  change [nyawa] by (____)
```

## Susun urutannya

Tujuh baris berikut sudah diacak. Susun menjadi skrip yang mengakhiri permainan bila nyawa habis.

- **A.** `    change [nyawa] by (-1)` (di dalam `if`)
- **B.** `stop [all]`
- **C.** `repeat until <(nyawa) < (1)>`
- **D.** `set [nyawa] to (3)`
- **E.** `  if <touching [Musuh]?> then` (di dalam `repeat until`)
- **F.** `when green flag clicked`
- **G.** `say [Permainan selesai] for (2) seconds`

Tulis urutan hurufnya. Jelaskan mengapa `say` ada sesudah `repeat until`, bukan di dalamnya.

## Latihan

1. **Ubah.** Pada skrip game, ganti `set [nyawa] to (3)` menjadi `set [nyawa] to (2)`. Telusuri dengan tabel yang sama. Pada putaran berapa permainan selesai, dan berapa skor akhirnya?
2. **Buat.** Tambahkan sprite Koin. Bila Pemain `touching [Koin]`, skor bertambah 5.
3. **Buat.** Tulis `if` yang membuat `level` menjadi 2 bila `skor` lebih dari 9, memakai `set`.
4. **Selidiki.** Pindahkan `set [nyawa] to (3)` ke dalam `repeat until`. Apa yang terjadi pada `nyawa`, dan apakah permainan berakhir?
5. **Jelaskan.** Dengan dua kalimat, jelaskan kapan memakai `set` dan kapan `change` untuk `skor` dan `nyawa`.

## Latihan bercampur

1. Program: `delete all of [tertinggi]`, `add [40] to [tertinggi]`, `add [25] to [tertinggi]`, `replace item (2) of [tertinggi] with (item (1) of [tertinggi])`, lalu `say (item (2) of [tertinggi])`. Apa yang diucapkan? (`SMP7-2-M4`)
2. Program: `set [nyawa] to (2)`, lalu `repeat (3)` berisi `change [nyawa] by (-1)` dan `if <(nyawa) < (1)> then say [Habis] for (1) seconds`. Pada putaran berapa saja ucapan muncul? (`SMP7-1-M8`, `SMP7-1-M9`)

## Ulang berjarak

Kerjakan ulang tanpa melihat modul ini, lalu cocokkan:

- **Minggu depan** (`SMP7-2-M9`): tulis dari ingatan skrip yang mengurangi `nyawa` satu bila Pemain menyentuh Musuh.
- **Sekitar sebulan lagi** (`SMP7-2-M13`): tulis dari ingatan blok yang menyiapkan skor dan nyawa, dan mengakhiri game bila nyawa habis.
- **Akhir semester** (`SMP7-2-M14`): tulis blok yang menyiapkan skor dan menambahnya bila kondisi benar.

## Kesalahan umum

- **`set [skor] to (0)` di dalam perulangan.** Skor kembali nol tiap putaran. Kenali: skor tidak pernah lebih dari satu langkah.
- **Lupa `set` di awal.** Variabel menyimpan nilainya dari permainan sebelumnya. Kenali: nyawa tidak mulai dari 3.
- **Memakai `=` untuk naik level padahal skor melompat.** Bila skor naik 10 dan kondisinya `= 25`, ia tidak pernah tepat 25. Pakai `>` dan `set`.
- **Menaruh `say [Permainan selesai]` di dalam perulangan.** Ucapan muncul tiap putaran, bukan sekali.
- **Lupa `stop [all]`.** Sprite lain tetap bergerak sesudah permainan selesai.

## Cek mandiri

Tutup modul, jawab tanpa melihat, lalu periksa.

1. `set [nyawa] to (3)` lalu tiga kali `change [nyawa] by (-1)`. Berapa `nyawa`?
2. Mengapa `set [skor] to (0)` ada di luar perulangan?
3. Kapan `repeat until <(nyawa) < (1)>` berhenti?

Daftar periksa (kosong; kamu isi sendiri, tidak dikumpulkan):

- [ ] Aku bisa menyiapkan skor, nyawa, dan level.
- [ ] Aku bisa menelusuri tiga variabel dalam satu tabel.
- [ ] Aku bisa mengakhiri permainan bila nyawa habis.

Kunci: (1) 0; (2) supaya skor tidak kembali nol tiap putaran; (3) saat `nyawa` kurang dari 1, diperiksa di awal tiap putaran.

## Langkah berikutnya

`SMP7-2-M9`, "Pesan antar sprite dan klon". Game-mu akan punya beberapa objek yang saling memberi tahu, misalnya Pemain yang memberi tahu Musuh bahwa permainan selesai.

## Catatan untuk guru

- **Waktu:** 2 JP x 40 menit `[asumsi]` (silabus bagian 2). Berpasangan boleh untuk "Prediksi dulu" dan "Latihan"; bukan jaminan efek belajar.
- **Alat:** Scratch tanpa akun murid. Nama blok bisa berbeda menurut bahasa antarmuka. Penulis menelusuri tangan semua program di modul ini dan tidak menjalankannya di editor Scratch; periksa di versi yang dipakai bahwa `stop [all]` menghentikan semua sprite.
- **Butir CP:** corpus memetakan minggu ini ke `D-BK-e` dan `DK-BK-c`. Modul ini tidak menyatakan CP "terpenuhi"; ia hanya melatih menulis instruksi untuk skor, nyawa, dan level.
- **Kunci "Prediksi dulu":** skor 10, 20, 30, 40; kondisi salah, salah, benar, benar; nyawa 3, 3, 2, 1. Akhir: skor 40, nyawa 1. Nyawa pertama berkurang pada putaran 3 karena 30 > 25.
- **Kunci "Contoh setengah jadi":** 10 dan 1. `change` menambah dari nyawa yang sekarang; `set` akan menimpa nyawa dengan angka tetap.
- **Kunci "Susun urutannya":** F, D, C, E, A, G, B. `say` dan `stop` sesudah `repeat until` agar berjalan sekali, setelah nyawa habis.
- **Kunci latihan:** (1) putaran 4 (nyawa 1 pada putaran 2, 0 pada putaran 4); skor akhir 4. (2) `if <touching [Koin]?> then change [skor] by (5)`. (3) `if <(skor) > (9)> then set [level] to (2)`. (4) nyawa kembali 3 tiap putaran, jadi tidak pernah di bawah 1 dan permainan tidak berakhir. (5) `set` untuk nilai awal sekali, `change` untuk perubahan tiap peristiwa.
- **Kunci "Latihan bercampur":** (1) 40. (2) nyawa 1, 0, -1; ucapan muncul pada putaran 2 dan 3 (karena 0 dan -1 sama-sama kurang dari 1).
- **Petunjuk bertahap:** (a) tulis nilai awal tiap variabel; (b) satu baris tabel per putaran; (c) periksa kondisi dengan nilai saat itu.
- **AI:** tanpa AI oleh murid. Kebijakan `smp-coding` (silabus bagian 7.1): AI generatif hanya demonstrasi guru, tanpa akun murid; asesmen tanpa AI.
- **Privasi:** tanpa nama murid pada berkas proyek; sprite dan gambar tanpa foto murid.
- **Unsur pembelajaran:** ingat kembali dan jarak (`K`), PRIMM (`K` usia 11 sampai 14), tabel penelusuran (`K`), contoh lengkap lalu setengah jadi (`K`), Parsons (`M`), latihan bercampur (`K`).
