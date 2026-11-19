## Untuk siapa modul ini

Modul ini untuk murid kelas 8 pada minggu pertama semester kedua. Mulai modul ini kamu mengenal **Python**, bahasa pemrograman yang ditulis sebagai teks, bukan blok. Python di sini adalah pengayaan di luar capaian pembelajaran; kalau kamu tidak berminat, kamu tidak dirugikan, dan modul ini tetap melatih membaca program. Kamu memakai editor Python yang disiapkan gurumu dan Scratch untuk membandingkan. Waktunya satu pertemuan, 2 JP. Prasyaratnya `SMP8-1-M1` (pseudocode) dan `SMP8-1-M9` (menerjemahkan antarbahasa blok).

## Ingat kembali

Tutup modul ini dan jawab dari ingatan.

1. Ubah pseudocode `ULANGI 3 KALI` berisi `TAMPILKAN "Halo"` menjadi blok Scratch. (`SMP8-1-M14`)
2. Jelaskan mengapa perulangan dan percabangan tetap sama walau bahasanya berganti. (`SMP8-1-M9`)
3. Telusuri `set [a] to (0)`, lalu `repeat (4)` berisi `change [a] by (3)`. Berapa `a` akhirnya? (`SMP8-1-M4`)

Kunci: (1) `repeat (3)` berisi `say [Halo] for (1) seconds`; (2) yang dilakukan sama, hanya nama dan bentuk tulisannya berbeda; (3) 3, 6, 9, 12; akhirnya 12.

## Tujuan

Setelah modul ini kamu dapat:

1. memasangkan blok Scratch dengan baris Python untuk `set`, `change`, `repeat`, `if` dengan `else`, dan `say`;
2. membaca program Python pendek dan menelusurinya dengan tabel;
3. menyebut dua aturan penulisan Python: titik dua dan jorokan;
4. menjelaskan satu hal yang sama dan satu hal yang beda antara blok dan teks.

## Prediksi dulu

Blok dan teks sama-sama instruksi. Blok mudah dirangkai dan sulit salah ketik. Teks lebih mirip yang ditulis pemrogram sungguhan, tetapi satu salah ketik bisa membuat program berhenti. Program Scratch P dan Python Q berikut dibuat sepasang.

```text
when green flag clicked
set [skor] to (0)
repeat (3)
  change [skor] by (4)
say (skor) for (2) seconds
```

```python
skor = 0
for putaran in range(3):
    skor = skor + 4
print(skor)
```

**Prediksi.** Apa yang ditampilkan P? Apa yang dicetak Q? Sama atau berbeda? Tulis dulu.

**Jalankan.** Telusuri keduanya dengan tabel putaran dan `skor`, lalu jalankan Q di editor Python.

**Selidiki.** Cocokkan dengan prediksimu. Baris Q mana yang berpasangan dengan `repeat (3)`? Mengapa baris `skor = skor + 4` bergeser ke kanan?

## Contoh terselesaikan

Penelusuran: `skor` menjadi 4, 8, 12 sesudah putaran 1, 2, 3; P dan Q menampilkan 12. Yang beda hanya tulisannya: `say` memunculkan balon kata, `print` menulis satu baris di layar teks.

Pasangan yang dipakai di modul ini:

| Scratch | Python |
| --- | --- |
| `set [x] to (0)` | `x = 0` |
| `change [x] by (1)` | `x = x + 1` |
| `repeat (3)` | `for putaran in range(3):` |
| `if <...> then` | `if ...:` |
| `else` | `else:` |
| `say (x)` | `print(x)` |
| `ask [...] and wait`, lalu `(answer)` | `input("...")` |

Menerjemahkan program dengan percabangan. Scratch:

```text
when green flag clicked
set [nilai] to (7)
if <(nilai) > (5)> then
  say [Tinggi] for (2) seconds
else
  say [Rendah] for (2) seconds
```

Python:

```python
nilai = 7
if nilai > 5:
    print("Tinggi")
else:
    print("Rendah")
```

Untuk `nilai` 7 syarat `7 > 5` benar, jadi keduanya menampilkan Tinggi. Untuk `nilai` 3 keduanya menampilkan Rendah. Tiga hal yang perlu diingat. Pertama, blok yang membungkus blok lain menjadi baris berakhiran titik dua, dan isinya **menjorok** empat spasi. Kedua, `=` di Python berarti mengisi; untuk membandingkan dipakai `==`. Ketiga, huruf besar dan kecil dibedakan: `Print` bukan `print`.

## Contoh setengah jadi

Terjemahkan program Scratch `repeat (3)` berisi `say [Halo] for (1) seconds`. Isi bagian kosong.

```python setengah-jadi
for putaran in range(____):
    print("____")
```

Berapa baris yang tercetak bila program dijalankan?

## Susun urutannya

Lima baris Python berikut sudah diacak. Susun menjadi program yang mencetak 10 di akhir.

- **A.** `skor = 0`
- **B.** `for putaran in range(5):`
- **C.** `    skor = skor + 2` (menjorok di bawah `for`)
- **D.** `print(skor)` (di kolom paling kiri, sesudah perulangan)

Tulis urutan hurufnya. Jelaskan mengapa `print` tidak menjorok.

## Latihan

1. **Ubah.** Pada contoh percabangan, ganti `> 5` menjadi `> 8`. Apa yang dicetak untuk `nilai` 7?
2. **Buat.** Terjemahkan ke Python: `set [x] to (10)`, lalu `repeat (4)` berisi `change [x] by (-2)`, lalu `say (x)`. Berapa yang dicetak?
3. **Selidiki.** Seorang murid menulis `if nilai = 5:` dan Python menolaknya dengan pesan galat. Apa yang keliru dan bagaimana memperbaikinya?
4. **Jelaskan.** Dengan dua kalimat, jelaskan satu hal yang sama dan satu hal yang beda antara program Scratch dan terjemahannya.

## Latihan bercampur

Python baru dimulai, jadi latihan bercampur dengan topik Python lain dimulai di modul berikutnya; dua soal ini mengulang semester lalu.

1. Pseudocode: `BACA n`, `TETAPKAN total = n * 2000`, `JIKA n >= 10 MAKA` lalu `TETAPKAN total = total - 5000`, `TAMPILKAN total`. Berapa total untuk `n` = 12? (`SMP8-1-M1`)
2. Scratch: `set [a] to (1)`, lalu `repeat (3)` berisi `set [a] to ((a) * (3))`. Berapa `a` akhirnya? (`SMP8-1-M4`)

## Ulang berjarak

Kerjakan ulang tanpa melihat modul ini, lalu cocokkan:

- **Minggu depan** (`SMP8-2-M2`): tulis padanan Python untuk `set [x] to (5)` dan `say (x)`.
- **Sekitar sebulan lagi** (`SMP8-2-M6`): terjemahkan satu program Scratch yang memakai `repeat` ke Python tanpa melihat tabel.
- **Akhir semester** (`SMP8-2-M14`): jelaskan satu hal yang sama dan satu hal yang beda antara blok Scratch dan baris Python.

## Kesalahan umum

- **Lupa titik dua** di akhir baris `for`, `if`, atau `else`. Kenali: Python berhenti dengan pesan `SyntaxError`.
- **Tidak menjorok isi perulangan.** Kenali: pesan galat soal jorokan, atau baris itu hanya berjalan sekali.
- **Memakai `=` untuk membandingkan.** Kenali: pesan galat pada baris `if`.
- **Menaruh `print` di dalam perulangan padahal hanya hasil akhir yang diminta.** Kenali: layar penuh angka.
- **Mengira `repeat (3)` sama dengan `range(3)` yang dihitung dari 1.** Kenali: `putaran` bernilai 0, 1, 2; pembahasannya di `SMP8-2-M5`.

## Cek mandiri

Tutup modul, jawab tanpa melihat, lalu periksa.

1. Terjemahkan `set [n] to (3)` dan `change [n] by (2)` ke Python, lalu sebut `n` akhirnya.
2. Aturan apa yang membuat Python tahu bahwa sebuah baris berada di dalam `for`?
3. Apa beda `=` dan `==`?

Daftar periksa (kosong; kamu isi sendiri, tidak dikumpulkan):

- [ ] Aku bisa memasangkan blok Scratch dengan baris Python.
- [ ] Aku bisa menelusuri program Python pendek dengan tabel.
- [ ] Aku ingat titik dua dan jorokan.

Kunci: (1) `n = 3` dan `n = n + 2`; `n` akhirnya 5; (2) jorokan, empat spasi di kiri baris; (3) `=` mengisi nilai, `==` membandingkan dua nilai.

## Langkah berikutnya

`SMP8-2-M2`, "Keluaran, masukan, variabel". Kamu membuat program Python yang menyapa pengguna dan menghitung, dengan `input` sebagai padanan `ask`.

## Catatan untuk guru

- **Waktu:** 2 JP x 40 menit `[asumsi]` (silabus bagian 2). Berpasangan boleh untuk "Prediksi dulu" dan "Latihan"; bukan jaminan efek belajar.
- **Alat:** Python 3 dengan editor yang dipilih sekolah (penulis tidak menetapkan satu editor; pastikan satu editor dan satu cara menjalankan sudah siap sebelum kelas). Semua program Python di modul dijalankan penulis dengan Python 3.12.3 dan keluarannya sama dengan yang tertulis. Nama blok Scratch di tabel padanan memakai antarmuka bahasa Inggris dan tidak dicocokkan dengan dokumentasi blok resmi; guru memeriksanya di editor sebelum kelas.
- **Pertukaran blok ke teks:** penelitian pada murid SMA (Weintrop dan Wilensky, 2017; riset 6.4) menemukan blok memberi kenaikan belajar dan minat lebih besar, sedangkan teks terasa lebih otentik. Bukti SMA, lima minggu, kuasi-eksperimen; untuk SMP hanya `[inferensi]`. Karena itu Python diposisikan sebagai pengayaan.
- **Butir CP:** corpus memetakan minggu ini ke `D-BK-e`. Modul ini tidak menyatakan CP "terpenuhi"; ia hanya melatih menuliskan instruksi yang sama dalam notasi lain. `DK-BK-c*` adalah irisan terdekat dan tidak diklaim.
- **Kunci "Prediksi dulu":** skor 4, 8, 12; P menampilkan 12 lewat balon kata, Q mencetak `12`. `putaran` bernilai 0, 1, 2 (tabel boleh memuatnya).
- **Kunci "Contoh setengah jadi":** `range(3)` dan `"Halo"`; tiga baris `Halo`.
- **Kunci "Susun urutannya":** A, B, C, D. `print` tidak menjorok agar hanya jalan sekali, sesudah perulangan selesai (2 x 5 = 10).
- **Kunci latihan:** (1) `7 > 8` salah, jadi Rendah. (2) `x = 10`, `for putaran in range(4):` dengan `x = x - 2` menjorok, `print(x)`; x = 8, 6, 4, 2; dicetak 2. (3) memakai `=` yang mengisi nilai; perbaikannya `if nilai == 5:`; Python 3.12 menjawab `SyntaxError: invalid syntax. Maybe you meant '==' or ':=' instead of '='?`, dan pesan bisa berbeda antarversi. (4) logikanya sama; yang beda bentuk tulisan, titik dua dan jorokan, serta cara menampilkan hasil.
- **Kunci "Latihan bercampur":** (1) 12 x 2000 = 24000, dipotong 5000 menjadi 19000. (2) a = 3, 9, 27; akhirnya 27.
- **Petunjuk bertahap:** (a) cari padanan tiap blok di tabel; (b) beri titik dua pada blok pembungkus; (c) jorokkan isinya; (d) telusuri Scratch dan Python dengan masukan yang sama.
- **AI:** tanpa AI. Kebijakan `smp-coding` (silabus bagian 7.1): AI generatif hanya demonstrasi guru, tanpa akun murid; asesmen tanpa AI.
- **Privasi:** tanpa nama murid pada berkas.
- **Unsur pembelajaran:** ingat kembali dan jarak (`K`), PRIMM (`K` usia 11 sampai 14), tabel penelusuran (`K`), contoh lengkap lalu setengah jadi (`K`), Parsons (`M`), latihan bercampur (`K`).
