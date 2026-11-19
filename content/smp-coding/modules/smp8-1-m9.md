## Untuk siapa modul ini

Modul ini untuk murid kelas 8 pada minggu kesembilan semester pertama. Kamu memakai simulator MakeCode untuk micro:bit di peramban, tanpa akun; simpan berkas sesuai arahan gurumu. Kalau komputer terbatas, tabel penelusuran di kertas cukup untuk sebagian besar kegiatan. Waktunya satu pertemuan, 2 JP. Prasyaratnya `SMP7-1-M5` (perulangan) dan `SMP7-1-M8` (percabangan).

## Ingat kembali

Tutup modul ini dan jawab dari ingatan.

1. Sebut satu contoh perulangan dan satu contoh kondisi yang pernah kamu tulis di Scratch. (`SMP7-2-M14`)
2. Sebut tiga langkah menghitung prediksi dengan selisih rata-rata. (`SMP8-1-M8`)
3. Jelaskan beda `define` dan panggilan blok. (`SMP8-1-M2`)

Kunci: (1) contoh: `repeat (4)` yang menggeser sprite empat kali; `if <(skor) > (5)>` yang membuat sprite berbicara; (2) hitung selisih tiap pasangan, jumlahkan lalu bagi dengan banyak selisih, tambahkan ke nilai terakhir; (3) `define` menyimpan resep, panggilan menjalankannya.

## Tujuan

Setelah modul ini kamu dapat:

1. menerjemahkan program Scratch sederhana menjadi blok MakeCode dengan tabel padanan;
2. menelusuri kedua program dan menunjukkan bahwa hasilnya sama;
3. menyebut satu perbedaan satuan atau bentuk antara dua bahasa blok;
4. menjelaskan bahwa perulangan, kondisi, dan variabel tetap sama walau bahasanya berganti.

## Prediksi dulu

Konsep seperti perulangan, kondisi, dan variabel muncul di banyak bahasa pemrograman. Yang berubah hanyalah nama dan bentuk bloknya. **MakeCode** adalah editor blok untuk perangkat micro:bit; ia punya simulator di peramban, jadi papan fisik tidak wajib. Di modul ini program MakeCode ditulis dengan teks, satu baris satu blok, menjorok untuk blok di dalam blok.

Program Scratch P:

```text
when green flag clicked
set [skor] to (0)
repeat (3)
  change [skor] by (4)
say (skor) for (2) seconds
```

Program MakeCode Q:

```text
on start
  set skor to 0
  repeat 3 times
    change skor by 4
  show number skor
```

**Prediksi.** Apa yang ditampilkan P? Apa yang ditampilkan Q di layar LED simulator? Sama atau berbeda? Tulis dulu.

**Jalankan.** Telusuri keduanya dengan tabel putaran dan `skor`.

**Selidiki.** Cocokkan dengan prediksimu. Baris mana pada P dan Q yang berpasangan?

## Contoh terselesaikan

Penelusuran P dan Q: skor 4, 8, 12 sesudah putaran 1, 2, 3; keduanya menampilkan 12. Yang beda hanya cara menampilkan: `say` memunculkan balon kata, `show number` memakai layar LED.

Tabel padanan yang dipakai di modul ini:

| Scratch | MakeCode |
| --- | --- |
| `when green flag clicked` | `on start` |
| `forever` | `forever` |
| `repeat (n)` | `repeat n times` |
| `if <...> then` dan `else` | `if ... then` dan `else` |
| `set [x] to (0)` | `set x to 0` |
| `change [x] by (1)` | `change x by 1` |
| `say [teks] for (2) seconds` | `show string "teks"` |
| `say (x) for (2) seconds` | `show number x` |
| `wait (1) seconds` | `pause (ms) 1000` |
| `when key pressed` | `on button A pressed` |

Sekarang menerjemahkan program dengan percabangan. Scratch:

```text
when green flag clicked
set [nilai] to (7)
if <(nilai) > (5)> then
  say [Tinggi] for (2) seconds
else
  say [Rendah] for (2) seconds
```

Langkah penerjemahan: (1) cari blok topi dan pasangkan, `on start`; (2) pasangkan blok satu per satu dengan tabel; (3) ganti keluaran, `say` menjadi `show string`; (4) telusuri kedua program dengan nilai yang sama. Hasil:

```text
on start
  set nilai to 7
  if nilai > 5 then
    show string "Tinggi"
  else
    show string "Rendah"
```

Untuk nilai 7, syarat `7 > 5` benar, jadi keduanya menampilkan Tinggi. Untuk nilai 3 keduanya menampilkan Rendah.

Tiga hal yang perlu diingat. Pertama, terjemahkan konsepnya dulu, baru namanya. Kedua, perhatikan satuan: `wait` di Scratch memakai detik, sedangkan `pause` di MakeCode memakai milidetik (1000 milidetik = 1 detik). Ketiga, setelah menerjemahkan, telusuri dua program dengan masukan yang sama untuk membuktikan keduanya bekerja sama.

## Contoh setengah jadi

Terjemahkan program Scratch berikut. Isi bagian kosong.

```text
when green flag clicked
repeat (3)
  say [Halo] for (1) seconds
```

```text setengah-jadi
on start
  repeat ____ times
    show string "Halo"
    pause (ms) ____
```

## Susun urutannya

Lima baris program MakeCode berikut sudah diacak. Susun menjadi satu program yang menampilkan 10 di akhir.

- **A.** `on start`
- **B.** `  set skor to 0` (di dalam `on start`)
- **C.** `  repeat 5 times` (di dalam `on start`)
- **D.** `    change skor by 2` (di dalam `repeat`)
- **E.** `  show number skor` (di dalam `on start`, sesudah `repeat`)

Tulis urutan hurufnya. Jelaskan mengapa `show number` ada di luar `repeat`.

## Latihan

1. **Ubah.** Pada contoh percabangan, ganti `> 5` menjadi `> 8`. Apa yang ditampilkan untuk nilai 7?
2. **Buat.** Terjemahkan ke MakeCode: `set [x] to (10)`, lalu `repeat (4)` berisi `change [x] by (-2)`, lalu `say (x) for (2) seconds`. Berapa yang ditampilkan?
3. **Selidiki.** Seorang murid menulis `pause (ms) 2` karena ingin menunggu 2 detik. Berapa lama sebenarnya, dan bagaimana memperbaikinya?
4. **Pasangkan.** Tulis padanan MakeCode untuk `forever`, `change [x] by (1)`, dan `when key pressed`.
5. **Jelaskan.** Dengan dua kalimat, jelaskan apa yang sama dan apa yang beda antara program Scratch dan terjemahannya.

## Latihan bercampur

1. Program Scratch: `set [a] to (1)`, lalu `repeat (3)` berisi `set [a] to ((a) * (2))`. Berapa `a` akhirnya? (`SMP8-1-M4`)
2. Data rekaan pekan 1 sampai 3: 10, 13, 16. Berapa prediksi pekan 4 dengan selisih rata-rata? (`SMP8-1-M8`)

## Ulang berjarak

Kerjakan ulang tanpa melihat modul ini, lalu cocokkan:

- **Minggu depan** (`SMP8-1-M10`): sebut padanan MakeCode untuk `when green flag clicked`, `forever`, dan `say`.
- **Sekitar sebulan lagi** (`SMP8-1-M14`): terjemahkan satu program Scratch yang memakai `repeat` dan `if` menjadi blok MakeCode.
- **Semester depan** (`SMP8-2-M1`): jelaskan mengapa perulangan dan percabangan tetap sama walau bahasanya berganti.

## Kesalahan umum

- **Menerjemahkan nama tanpa konsepnya.** Kenali: bloknya mirip, tetapi hasilnya berbeda dari program asal.
- **Lupa beda satuan.** `pause` memakai milidetik. Kenali: jeda terlalu singkat sehingga tidak terlihat.
- **Mengira bentuk blok identik di semua alat.** Kenali: nama blok berbeda antar editor dan versi. Cari padanan, jangan menghafal huruf demi huruf.
- **Tidak menelusuri hasil terjemahan.** Kenali: kamu hanya mencocokkan blok, tidak membandingkan hasil.
- **Menaruh `show number` di dalam perulangan padahal hanya hasil akhir yang diminta.** Kenali: layar menampilkan angka berkali-kali.

## Cek mandiri

Tutup modul, jawab tanpa melihat, lalu periksa.

1. Terjemahkan `set [n] to (3)` dan `change [n] by (2)` ke MakeCode dan sebut nilai `n` akhirnya.
2. Apa padanan `wait (1) seconds` di MakeCode?
3. Mengapa kita menelusuri program asal dan terjemahannya dengan masukan yang sama?

Daftar periksa (kosong; kamu isi sendiri, tidak dikumpulkan):

- [ ] Aku bisa memakai tabel padanan untuk menerjemahkan program kecil.
- [ ] Aku bisa menelusuri dua program dan membandingkan hasilnya.
- [ ] Aku ingat bahwa `pause` memakai milidetik.

Kunci: (1) `set n to 3`, `change n by 2`; nilai akhir 5; (2) `pause (ms) 1000`; (3) agar kita tahu terjemahannya bekerja sama dengan aslinya, bukan hanya terlihat mirip.

## Langkah berikutnya

`SMP8-1-M10`, "Masukan dan keluaran perangkat (simulator)". Kamu memakai tombol dan lampu pada simulator: tombol sebagai masukan dan layar LED sebagai keluaran.

## Catatan untuk guru

- **Waktu:** 2 JP x 40 menit `[asumsi]` (silabus bagian 2). Berpasangan boleh untuk "Prediksi dulu" dan "Latihan"; bukan jaminan efek belajar.
- **Alat:** simulator MakeCode untuk micro:bit di peramban (situs resmi: makecode.microbit.org), tanpa akun murid; berkas disimpan lokal. Nama dan bentuk blok bisa berbeda menurut bahasa antarmuka dan versi editor; periksa padanan di simulator sebelum kelas. Nama blok MakeCode dicocokkan per 2026-11 dengan sumber resmi MakeCode micro:bit (pustaka inti `pxt-microbit`: `forever`, `pause (ms)`, `show number`, `show string`, `on button A pressed`, `plot x y`, `unplot x y`, `clear screen`; editor `pxt`: `repeat n times`, `set x to`, `change x by`, `if ... then`/`else`) dan situs resmi makecode.microbit.org (halaman referensi `basic`, `input`, `music`; blok `on start`). Nama blok Scratch (bahasa Inggris) dicocokkan per 2026-11 dengan berkas pesan resmi Scratch (`scratch-l10n`, `editor/blocks/en.json` dan `editor/extensions/en.json`). Perhatikan: di editor, `when green flag clicked` tampil sebagai `when [ikon bendera hijau] clicked` dan `when key pressed` sebagai `when [space] key pressed`; padanan antarmuka Indonesia: `ketika [bendera] diklik`, `ulangi n kali`, `jika ...`/`jika tidak`, `atur`, `ubah ... sebesar`, `katakan ... selama ... detik`, `tunggu ... detik`, `ketika tombol ... ditekan`. Padanan MakeCode berbahasa Indonesia tidak diperiksa. Penulis menelusuri tangan semua program dan menghitung ulang semua angka dengan skrip bantu; ia tidak menjalankan program di editor.
- **Butir CP:** corpus memetakan minggu ini ke `D-BK-e`. Modul ini tidak menyatakan CP "terpenuhi"; ia hanya melatih menuliskan instruksi yang sama dalam notasi lain.
- **Kunci "Prediksi dulu":** skor 4, 8, 12; P dan Q sama-sama menampilkan 12 (P lewat balon kata, Q lewat layar LED).
- **Kunci "Contoh setengah jadi":** `repeat 3 times` dan `pause (ms) 1000`.
- **Kunci "Susun urutannya":** A, B, C, D, E. `show number` di luar `repeat` agar hanya hasil akhir (2 x 5 = 10) yang tampil.
- **Kunci latihan:** (1) `7 > 8` salah, jadi Rendah. (2) `on start`, `set x to 10`, `repeat 4 times` berisi `change x by -2`, `show number x`; x = 8, 6, 4, 2; tampil 2. (3) 2 milidetik, praktis tidak terlihat; tulis `pause (ms) 2000`. (4) `forever`; `change x by 1`; `on button A pressed`. (5) logikanya sama; yang beda nama blok, satuan, dan cara menampilkan hasil.
- **Kunci "Latihan bercampur":** (1) a = 2, 4, 8; akhirnya 8. (2) selisih 3 dan 3; prediksi 19.
- **Petunjuk bertahap:** (a) pasangkan blok topi; (b) pasangkan blok lain dengan tabel; (c) ganti keluaran dan periksa satuan; (d) telusuri dua program dengan masukan yang sama.
- **AI:** tanpa AI. Kebijakan `smp-coding` (silabus bagian 7.1): AI generatif hanya demonstrasi guru, tanpa akun murid; asesmen tanpa AI.
- **Privasi:** tanpa nama murid pada berkas proyek.
- **Unsur pembelajaran:** ingat kembali dan jarak (`K`), PRIMM (`K` usia 11 sampai 14), tabel penelusuran (`K`), contoh lengkap lalu setengah jadi (`K`), Parsons (`M`), latihan bercampur (`K`).
