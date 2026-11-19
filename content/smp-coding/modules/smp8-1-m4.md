## Untuk siapa modul ini

Modul ini untuk murid kelas 8 pada minggu keempat semester pertama. Kamu memakai Scratch tanpa akun; simpan berkas sesuai arahan gurumu. Kalau komputer terbatas, tabel penelusuran di kertas cukup untuk sebagian besar kegiatan. Waktunya satu pertemuan, 2 JP. Prasyaratnya `SMP8-1-M3` (abstraksi) dan `SMP7-1-M9` (variabel).

## Ingat kembali

Tutup modul ini dan jawab dari ingatan.

1. Tulis dari ingatan program yang mengubah satu variabel tiap putaran dalam perulangan, lalu telusuri hasilnya dalam tabel. (`SMP7-2-M14`)
2. Tulis blok `lompat (jarak)` yang menggeser sprite ke atas sebanyak `jarak`. (`SMP8-1-M2`)
3. Beri satu contoh detail yang boleh disembunyikan di balik nama blok dan satu yang harus tetap menjadi masukan. (`SMP8-1-M3`)
4. Apa beda `set` dan `change` pada variabel? (`SMP7-1-M9`)

Kunci: (1) contoh: `set [a] to (0)`, `repeat (3)` berisi `change [a] by (2)`; tabel putaran 1, 2, 3 memberi a = 2, 4, 6; (2) `define lompat (jarak)` berisi `change y by (jarak)`; (3) detail cara menggambar bisa disembunyikan; ukuran atau posisi yang ingin kamu atur menjadi masukan; (4) `set` mengganti isi, `change` menambah ke isi yang ada.

## Tujuan

Setelah modul ini kamu dapat:

1. menulis **simulasi** sederhana: model kecil yang meniru gerak atau siklus dengan variabel dan perulangan;
2. menelusuri nilai variabel simulasi per putaran;
3. menjaga nilai di batas (misalnya tinggi tidak negatif);
4. menyebut apa yang disederhanakan oleh sebuah simulasi.

## Prediksi dulu

Simulasi adalah program yang meniru sesuatu dengan aturan sederhana yang diulang. Di bawah, benda dijatuhkan: tiap putaran kecepatannya bertambah, lalu tingginya berkurang sebesar kecepatan itu. Satuannya kiasan dan hambatan udara diabaikan; yang ditiru hanya pola "makin lama makin cepat".

Program P:

```text
when green flag clicked
set [tinggi] to (100)
set [kecepatan] to (0)
repeat (4)
  change [kecepatan] by (5)
  change [tinggi] by ((0) - (kecepatan))
```

**Prediksi.** Berapa `tinggi` dan `kecepatan` sesudah empat putaran? Tulis dulu.

**Jalankan.** Telusuri dengan tabel:

| Putaran | kecepatan | tinggi |
| --- | --- | --- |
| awal | 0 | 100 |
| 1 | | |
| 2 | | |
| 3 | | |
| 4 | | |

**Selidiki.** Cocokkan dengan prediksimu. Berapa berkurangnya tinggi di tiap putaran, dan apakah selalu sama?

## Contoh terselesaikan

Penelusuran P: kecepatan 5, 10, 15, 20; tinggi 95, 85, 70, 50. Tinggi berkurang makin besar tiap putaran (5, 10, 15, 20), itulah gerak dipercepat dalam model ini.

Sekarang benda dijatuhkan dari tinggi 50, kecepatan bertambah 6 tiap putaran, dan berhenti di tanah:

```text
when green flag clicked
set [tinggi] to (50)
set [kecepatan] to (0)
repeat until <(tinggi) < (1)>
  change [kecepatan] by (6)
  change [tinggi] by ((0) - (kecepatan))
  if <(tinggi) < (0)> then
    set [tinggi] to (0)
```

| Putaran | kecepatan | tinggi sebelum `if` | tinggi sesudah `if` |
| --- | --- | --- | --- |
| 1 | 6 | 44 | 44 |
| 2 | 12 | 32 | 32 |
| 3 | 18 | 14 | 14 |
| 4 | 24 | -10 | 0 |

Sesudah putaran 4, `tinggi` = 0, jadi `repeat until` berhenti. Tanpa baris `if`, tinggi menjadi -10, yaitu benda di bawah tanah; model kita perlu penjaga batas. Tiga hal yang perlu diingat. Pertama, urutan variabel diperbarui menentukan hasil. Kedua, `repeat until` cocok bila jumlah putaran tidak diketahui. Ketiga, setiap simulasi punya asumsi yang perlu ditulis: di sini hambatan udara diabaikan dan satuan kiasan.

## Contoh setengah jadi

Siklus air yang disederhanakan: menguap, mengembun, hujan, lalu mulai lagi. Isi bagian kosong, lalu sebut kata apa yang diucapkan pada putaran 1 sampai 5.

```text setengah-jadi
set [fase] to (1)
repeat (5)
  if <(fase) = (1)> then
    say [menguap] for (1) seconds
  if <(fase) = (2)> then
    say [mengembun] for (1) seconds
  if <(fase) = (3)> then
    say [hujan] for (1) seconds
  change [fase] by (1)
  if <(fase) > (____)> then
    set [fase] to (____)
```

## Susun urutannya

Enam baris berikut sudah diacak. Susun menjadi program jatuh bebas pada contoh terselesaikan.

- **A.** `set [tinggi] to (50)`
- **B.** `set [kecepatan] to (0)`
- **C.** `repeat until <(tinggi) < (1)>`
- **D.** `  change [kecepatan] by (6)` (di dalam `repeat until`)
- **E.** `  change [tinggi] by ((0) - (kecepatan))` (di dalam `repeat until`)
- **F.** `  if <(tinggi) < (0)> then set [tinggi] to (0)` (di dalam `repeat until`)

Tulis urutan hurufnya. Jelaskan mengapa `set` ada di luar perulangan.

## Latihan

1. **Ubah.** Pada contoh terselesaikan, ganti penambahan kecepatan 6 menjadi 4. Telusuri; berapa putaran sampai tinggi menjadi 0?
2. **Buat.** Tulis simulasi bak mandi: air 0 liter, tiap putaran bertambah 8 liter, berhenti bila air lebih dari 29, dan air tidak boleh melebihi 30. Berapa putaran?
3. **Selidiki.** Pada program P, tukar urutan dua baris di dalam `repeat` (ubah tinggi dulu, lalu kecepatan). Berapa `tinggi` dan `kecepatan` sesudah empat putaran?
4. **Jelaskan.** Sebut dua hal yang disederhanakan oleh simulasi jatuh bebas di modul ini.

## Latihan bercampur

1. Program: `set [skor] to (0)`, panggil blok `tambah (5)` lalu `tambah (3)`, dengan `define tambah (n)` berisi `change [skor] by (n)`. Berapa `skor`? (`SMP8-1-M2`, `SMP7-1-M9`)
2. Pseudocode: `TETAPKAN total = 0`, `BACA n`, `ULANGI n KALI` berisi `TETAPKAN total = total + 3`, lalu `TAMPILKAN total`. Berapa yang ditampilkan untuk `n` = 4? (`SMP8-1-M1`)

## Ulang berjarak

Kerjakan ulang tanpa melihat modul ini, lalu cocokkan:

- **Minggu depan** (`SMP8-1-M5`): telusuri `set [a] to (0)`, lalu `repeat (4)` berisi `change [a] by (3)`; tulis nilai `a` per putaran.
- **Menjelang akhir semester** (`SMP8-1-M13`): sebut dua penyederhanaan dalam simulasi yang kamu tulis.
- **Semester depan** (`SMP9-1-M10`): jelaskan mengapa sebuah simulasi perlu menuliskan asumsinya.

## Kesalahan umum

- **Mengira simulasi sama dengan kenyataan.** Ia hanya meniru bagian yang kita pilih. Kenali: hasilnya dianggap "benar" tanpa menyebut asumsi.
- **Lupa penjaga batas.** Kenali: nilai menjadi negatif atau melebihi kapasitas.
- **Menaruh `set` di dalam perulangan.** Nilai kembali ke awal tiap putaran. Kenali: tinggi tidak pernah berubah banyak.
- **Salah urutan pembaruan.** Kenali: hasil tabelmu berbeda satu putaran dari hasil program.
- **Memakai `repeat` bila jumlah putaran tak diketahui.** Kenali: benda berhenti sebelum sampai tanah.

## Cek mandiri

Tutup modul, jawab tanpa melihat, lalu periksa.

1. Telusuri: `set [t] to (20)`, `set [v] to (0)`, `repeat (3)` berisi `change [v] by (2)` dan `change [t] by ((0) - (v))`. Berapa `t` dan `v` akhir?
2. Mengapa simulasi bak mandi perlu penjaga batas?
3. Apa itu asumsi pada sebuah simulasi?

Daftar periksa (kosong; kamu isi sendiri, tidak dikumpulkan):

- [ ] Aku bisa menelusuri variabel simulasi per putaran.
- [ ] Aku bisa menjaga nilai di batas.
- [ ] Aku bisa menyebut apa yang disederhanakan simulasiku.

Kunci: (1) v = 2, 4, 6 dan t = 18, 14, 8; akhirnya t = 8 dan v = 6; (2) air tidak boleh lebih dari kapasitas bak; (3) hal yang kita abaikan atau sederhanakan agar model bisa ditulis.

## Langkah berikutnya

`SMP8-1-M5`, "Matematika dengan program: bilangan, faktor, pola". Perulangan dan variabel yang sama dipakai untuk menemukan faktor dan pola bilangan.

## Catatan untuk guru

- **Waktu:** 2 JP x 40 menit `[asumsi]` (silabus bagian 2). Berpasangan boleh untuk "Prediksi dulu" dan "Latihan"; bukan jaminan efek belajar.
- **Alat:** Scratch tanpa akun murid. Nama blok bisa berbeda menurut bahasa antarmuka. Penulis menelusuri tangan dan menghitung ulang semua angka dengan skrip bantu; ia tidak menjalankan program di editor Scratch. Model jatuh bebas dibuat kualitatif: satuan kiasan, tanpa rumus fisika; hubungkan dengan pelajaran IPA sesuai arahan guru, tanpa menyebut angka fisika di sini.
- **Butir CP:** corpus memetakan minggu ini ke `D-BK-a`, `D-BK-e`, dan `DK-BK-c`. Modul ini tidak menyatakan CP "terpenuhi"; ia hanya melatih menulis dan menelusuri perulangan dan variabel.
- **Kunci "Prediksi dulu":** kecepatan 5, 10, 15, 20; tinggi 95, 85, 70, 50.
- **Kunci "Contoh setengah jadi":** `> (3)` dan `set [fase] to (1)`. Ucapan: menguap, mengembun, hujan, menguap, mengembun; `fase` akhir 3.
- **Kunci "Susun urutannya":** A, B, C, D, E, F. `set` di luar perulangan agar nilai awal hanya disiapkan sekali.
- **Kunci latihan:** (1) kecepatan 4, 8, 12, 16, 20; tinggi 46, 38, 26, 10, -10 menjadi 0; lima putaran. (2) `set [air] to (0)`, `repeat until <(air) > (29)>` berisi `change [air] by (8)` dan `if <(air) > (30)> then set [air] to (30)`; air 8, 16, 24, 32 menjadi 30; empat putaran. (3) putaran 1: tinggi 100, kecepatan 5; 2: 95, 10; 3: 85, 15; 4: 70, 20; hasil tinggi 70 dan kecepatan 20, jadi urutan menentukan hasil. (4) hambatan udara diabaikan dan satuan kiasan; benda dianggap satu titik.
- **Kunci "Latihan bercampur":** (1) 8. (2) 12.
- **Petunjuk bertahap:** (a) tulis nilai awal tiap variabel; (b) perbarui satu variabel per baris sesuai urutan program; (c) periksa syarat berhenti sebelum putaran berikutnya; (d) periksa apakah ada nilai di luar batas.
- **AI:** tanpa AI. Kebijakan `smp-coding` (silabus bagian 7.1): AI generatif hanya demonstrasi guru, tanpa akun murid; asesmen tanpa AI.
- **Privasi:** tanpa nama murid pada berkas proyek.
- **Unsur pembelajaran:** ingat kembali dan jarak (`K`), PRIMM (`K` usia 11 sampai 14), tabel penelusuran (`K`), contoh lengkap lalu setengah jadi (`K`), Parsons (`M`), latihan bercampur (`K`).
