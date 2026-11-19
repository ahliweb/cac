## Untuk siapa modul ini

Modul ini untuk murid kelas 8 pada minggu keenam semester kedua. Kamu memakai Scratch untuk membaca program asal dan editor Python yang disiapkan gurumu untuk menjalankan terjemahannya. Python adalah pengayaan di luar capaian pembelajaran. Waktunya satu pertemuan, 2 JP. Prasyaratnya `SMP8-2-M5` (perulangan `for` dan `while`). Semua nama dan angka di modul ini rekaan.

## Ingat kembali

Tutup modul ini dan jawab dari ingatan.

1. Terjemahkan ke Python: `set [total] to (0)`, lalu `repeat (4)` berisi `change [total] by (3)`, lalu `say (total)`. (`SMP8-2-M5`)
2. Tulis padanan Python untuk `ask [7 + 5 = ?] and wait` lalu `if <(answer) = (12)> then`. (`SMP8-2-M2`)
3. Tulis urutan `ask`, `if`, dan `change` untuk satu soal kuis dan jelaskan mengapa urutannya begitu. (`SMP7-1-M10`)

Kunci: (1) `total = 0`, `for putaran in range(4):` lalu `total = total + 3` menjorok, `print(total)`; hasil 12; (2) `jawab = int(input("7 + 5 = ? "))` lalu `if jawab == 12:`; (3) `ask` dulu agar ada `answer`, `if` memeriksa `answer`, `change` menambah skor hanya bila benar.

## Tujuan

Setelah modul ini kamu dapat:

1. menerjemahkan program Scratch yang memakai variabel, `ask`, `if`, dan `repeat` menjadi Python dengan empat langkah;
2. menelusuri program asal dan terjemahannya dengan masukan yang sama;
3. menyebut satu perbedaan perilaku antara `say` dan `print`;
4. menyebut satu keuntungan blok dan satu keuntungan teks.

## Prediksi dulu

Kamu sudah menulis instruksi yang sama dalam blok dan dalam teks. Blok lebih mudah dirangkai dan membuat pemula lebih cepat maju; teks lebih mirip yang dipakai pemrogram sungguhan. Keduanya punya tempat. Program Scratch X dan Python Y dibuat sepasang.

```text
when green flag clicked
set [total] to (0)
repeat (5)
  change [total] by (3)
  if <(total) > (10)> then
    say [Lebih dari 10] for (1) seconds
```

```python
total = 0
for putaran in range(5):
    total = total + 3
    if total > 10:
        print("Lebih dari 10")
```

**Prediksi.** Pada putaran ke berapa pesan muncul? Berapa kali pesan muncul di X dan di Y? Tulis dulu.

**Jalankan.** Telusuri dengan tabel: putaran, `total`, `total > 10`. Jalankan Y di editor.

**Selidiki.** Cocokkan dengan prediksimu. Di X pesan hilang sesudah satu detik; apa yang terjadi pada pesan di Y?

## Contoh terselesaikan

Penelusuran: `total` 3, 6, 9, 12, 15. Syarat benar pada putaran 4 dan 5, jadi pesan muncul dua kali. Bedanya: `say` menimpa balon kata sebelumnya, sedangkan `print` menambah satu baris di layar, sehingga Y meninggalkan dua baris.

Empat langkah menerjemahkan: (1) cari variabel dan beri nilai awal; (2) pasangkan blok satu per satu dengan tabel pasangan dari `SMP8-2-M1`; (3) blok yang membungkus blok lain menjadi baris berakhiran titik dua dan isinya menjorok; (4) telusuri kedua program dengan masukan yang sama.

Kuis satu soal. Scratch:

```text
when green flag clicked
set [skor] to (0)
ask [7 + 5 = ?] and wait
if <(answer) = (12)> then
  change [skor] by (1)
  say [Benar] for (2) seconds
else
  say [Salah] for (2) seconds
```

Python:

```python
skor = 0
jawab = int(input("7 + 5 = ? "))
if jawab == 12:
    skor = skor + 1
    print("Benar")
else:
    print("Salah")
print("Skor:", skor)
```

Untuk masukan 12 tercetak `Benar` lalu `Skor: 1`; untuk 11 tercetak `Salah` lalu `Skor: 0`. Tiga hal yang perlu diingat. Pertama, `answer` menjadi `input` yang dibungkus `int(...)`, karena Python membedakan teks dan bilangan. Kedua, `change [skor] by (1)` menjadi `skor = skor + 1` di dalam cabang yang sama. Ketiga, baris `print("Skor:", skor)` menjadi tambahan penulis; terjemahan boleh menambah baris untuk membuat hasil terlihat.

## Contoh setengah jadi

Terjemahkan: `ask [Siapa namamu?] and wait`, lalu `say (join [Halo, ] (answer))`. Isi bagian kosong.

```python setengah-jadi
nama = ____("Siapa namamu? ")
print("Halo,", ____)
```

Telusuri untuk masukan `Murid-01`. Apa yang tercetak?

## Susun urutannya

Enam baris berikut sudah diacak. Susun menjadi kuis tiga soal yang sama dan mencetak skor akhir.

- **A.** `skor = 0`
- **B.** `for soal in range(3):`
- **C.** `    jawab = int(input("2 + 2 = ? "))` (menjorok di bawah `for`)
- **D.** `    if jawab == 4:` (menjorok di bawah `for`)
- **E.** `        skor = skor + 1` (menjorok di bawah `if`)
- **F.** `print("Skor:", skor)` (di kolom paling kiri)

Tulis urutan hurufnya. Telusuri untuk jawaban 4, 5, 4.

## Latihan

1. **Ubah.** Ubah program kuis menjadi soal `9 - 4`. Tulis dua baris yang berubah.
2. **Buat.** Terjemahkan: `set [x] to (1)`, lalu `repeat (3)` berisi `set [x] to ((x) * (2))`, lalu `say (x)`. Berapa yang tercetak?
3. **Buat.** Terjemahkan: `if <(suhu) > (30)> then say [Panas] else say [Sejuk]`, dengan `suhu` diisi 31 lebih dulu.
4. **Selidiki.** Seorang murid menulis `jawab = input("7 + 5 = ? ")` lalu `if jawab == 12:` tanpa `int`. Untuk masukan 12, apa yang tercetak dan mengapa?
5. **Jelaskan.** Sebut satu keuntungan blok dan satu keuntungan teks menurut pengalamanmu.

## Latihan bercampur

1. Apa yang dicetak: `print(135 // 60, 135 % 60)`? (`SMP8-2-M3`)
2. `total = 0`, lalu `for i in range(1, 5):` berisi `total = total + i` dan `if total > 5:` lalu `print(total)`. Apa yang dicetak? (`SMP8-2-M4`, `SMP8-2-M5`)

## Ulang berjarak

Kerjakan ulang tanpa melihat modul ini, lalu cocokkan:

- **Minggu depan** (`SMP8-2-M7`): tulis kerangka `for` dari `repeat (4)` berisi `move (50) steps` dan `turn right (90) degrees`.
- **Sekitar sebulan lagi** (`SMP8-2-M10`): sebut empat langkah menerjemahkan program Scratch ke Python dan satu hal yang sering salah.
- **Akhir semester** (`SMP8-2-M14`): terjemahkan satu program Scratch ke Python tanpa melihat tabel pasangan.

## Kesalahan umum

- **Menerjemahkan blok satu per satu tanpa jorokan.** Kenali: semua baris sejajar, dan isi perulangan atau cabang tidak ikut terulang.
- **Lupa `int(...)` pada jawaban.** Kenali: `jawab == 12` tidak pernah benar.
- **Mengira `say` sama dengan `print`.** Kenali: Python meninggalkan banyak baris, sedangkan Scratch hanya menampilkan balon terakhir.
- **Menaruh penambahan skor di luar `if`.** Kenali: skor bertambah pada jawaban salah.
- **Tidak menelusuri hasil terjemahan.** Kenali: kamu hanya mencocokkan baris, tidak membandingkan hasil.

## Cek mandiri

Tutup modul, jawab tanpa melihat, lalu periksa.

1. Terjemahkan `set [n] to (0)`, lalu `repeat (3)` berisi `change [n] by (2)`.
2. Sebut empat langkah menerjemahkan program Scratch ke Python.
3. Apa beda `say` di dalam `repeat` dengan `print` di dalam `for`?

Daftar periksa (kosong; kamu isi sendiri, tidak dikumpulkan):

- [ ] Aku bisa menerjemahkan program Scratch kecil ke Python.
- [ ] Aku bisa menelusuri dua program dengan masukan yang sama.
- [ ] Aku ingat membungkus `input` dengan `int` bila akan dihitung.

Kunci: (1) `n = 0`, `for putaran in range(3):` lalu `n = n + 2` menjorok; (2) cari variabel dan nilai awal; pasangkan blok dengan tabel; blok pembungkus menjadi titik dua dan jorokan; telusuri dengan masukan yang sama; (3) `say` menimpa balon, sedangkan `print` menambah baris.

## Langkah berikutnya

`SMP8-2-M7`, "Menggambar dengan perulangan (grafik kura-kura)". Perulangan `for` dipakai untuk menggambar bentuk di layar, seperti di Scratch kelas 7 tetapi dengan teks.

## Catatan untuk guru

- **Waktu:** 2 JP x 40 menit `[asumsi]` (silabus bagian 2). Berpasangan boleh untuk "Prediksi dulu" dan "Latihan"; bukan jaminan efek belajar.
- **Alat:** Scratch tanpa akun murid (situs resmi: scratch.mit.edu) dan Python 3 dengan editor sekolah. Penulis menjalankan semua program Python dengan Python 3.12.3 dan keluarannya sama dengan yang tertulis. Nama blok Scratch (`ask ... and wait`, `answer`, `join`) memakai antarmuka bahasa Inggris dan tidak dicocokkan dengan dokumentasi blok resmi; guru memeriksanya di editor sebelum kelas. Scratch dan Python tidak dijalankan berdampingan oleh penulis; penelusuran Scratch dilakukan dengan tangan.
- **Pertukaran blok ke teks:** penelitian pada murid SMA (Weintrop dan Wilensky, 2017; riset 6.4) menemukan blok memberi kenaikan belajar dan minat lebih besar, sedangkan teks terasa lebih otentik; bukti SMA, lima minggu, kuasi-eksperimen, untuk SMP hanya `[inferensi]`. Sebutkan pertukaran itu tanpa memaksa murid memilih.
- **Butir CP:** corpus memetakan minggu ini ke `D-BK-e`. Modul tidak menyatakan CP "terpenuhi"; ia hanya melatih menuliskan instruksi yang sama dalam notasi lain. `DK-BK-c*` adalah irisan dan tidak diklaim.
- **Kunci "Prediksi dulu":** total 3, 6, 9, 12, 15; pesan pada putaran 4 dan 5, dua kali di X dan di Y. Di Y kedua baris tetap terlihat di layar.
- **Kunci "Contoh setengah jadi":** `input` dan `nama`; tercetak `Halo, Murid-01`.
- **Kunci "Susun urutannya":** A, B, C, D, E, F. Untuk 4, 5, 4: skor 1, 1, 2; tercetak `Skor: 2`.
- **Kunci latihan:** (1) `jawab = int(input("9 - 4 = ? "))` dan `if jawab == 5:`. (2) `x = 1`, `for putaran in range(3):` lalu `x = x * 2` menjorok, `print(x)`; x = 2, 4, 8; tercetak 8. (3) `suhu = 31`, `if suhu > 30:` lalu `print("Panas")`, `else:` lalu `print("Sejuk")`; tercetak `Panas`. (4) `input` menghasilkan teks `"12"`, dan `"12" == 12` salah; tercetak `Salah` lalu `Skor: 0`. (5) contoh: blok mudah dirangkai tanpa salah ketik; teks lebih mirip yang dipakai pemrogram dan lebih cepat ditulis ulang.
- **Kunci "Latihan bercampur":** (1) `2 15`. (2) total = 1, 3, 6, 10; tercetak 6 lalu 10.
- **Petunjuk bertahap:** (a) tulis variabel dan nilai awalnya; (b) pasangkan tiap blok dengan baris Python; (c) beri titik dua dan jorokan pada blok pembungkus; (d) telusuri dua program dengan masukan yang sama.
- **AI:** tanpa AI. Kebijakan `smp-coding` (silabus bagian 7.1): AI generatif hanya demonstrasi guru, tanpa akun murid; asesmen tanpa AI.
- **Privasi:** nama masukan contoh rekaan (`Murid-01`); tanpa nama murid pada berkas.
- **Unsur pembelajaran:** ingat kembali dan jarak (`K`), PRIMM (`K` usia 11 sampai 14), tabel penelusuran (`K`), contoh lengkap lalu setengah jadi (`K`), Parsons (`M`), latihan bercampur (`K`).
