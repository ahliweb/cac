## Untuk siapa modul ini

Modul ini untuk murid kelas 9 pada minggu kelima semester pertama. Kamu meringkas data dengan dua cara: editor Python dan program lembar kerja yang disediakan sekolah (atau kertas kotak-kotak bila belum ada komputer). Langkah lembar kerja ditulis tanpa nama menu karena menu berbeda antar program. Waktunya satu pertemuan, 2 JP. Prasyaratnya `SMP9-1-M4` (membaca berkas teks). Semua angka di modul ini rekaan.

## Ingat kembali

Tutup modul ini dan jawab dari ingatan.

1. Hitung jumlah dan rata-rata `[70, 80, 90, 60]` dengan `for`, lalu tulis fungsi `rata_rata(daftar)` yang mengembalikannya. (`SMP8-2-M14`)
2. Dari lima angka 4, 6, 5, 9, 6, hitung rata-rata dan nilai terbesar, lalu sebut satu hal yang tidak bisa dipastikan dari rata-rata itu. (`SMP8-1-M8`)
3. Jelaskan beda `kamus.get(k)` dan `kamus[k]` untuk kunci yang tidak ada. (`SMP9-1-M3`)
4. Tulis kerangka program yang membaca `nilai.txt` ke dalam kamus. (`SMP9-1-M4`)

Kunci: (1) `total = 0`, `for n in daftar:` lalu `total = total + n` menjorok; jumlah 300, rata-rata 75.0; fungsi: `def rata_rata(daftar):` berisi jumlah dengan `for` dan `return total / len(daftar)`; (2) jumlah 30, rata-rata 6.0, terbesar 9; yang tidak pasti: nilai tiap angka atau sebarannya, karena angka berbeda bisa memberi rata-rata sama; (3) `get` memberi `None` atau nilai cadangan, `kamus[k]` berhenti dengan `KeyError`; (4) `nilai = {}`, `with open("nilai.txt", encoding="utf-8") as berkas:`, `for baris in berkas:`, `bagian = baris.strip().split(",")`, `nilai[bagian[0]] = int(bagian[1])`.

## Tujuan

Setelah modul ini kamu dapat:

1. menghitung jumlah, rata-rata, dan nilai terbesar dari data tabel kecil dengan program;
2. melakukan hal yang sama dengan lembar kerja dan mencocokkan hasilnya;
3. mencari kunci (misalnya hari) yang memiliki nilai terbesar;
4. menyebut satu hal yang tidak bisa dipastikan dari rata-rata.

## Prediksi dulu

Meringkas data berarti mengganti banyak angka dengan sedikit angka yang menjawab satu pertanyaan. Data rekaan banyaknya botol minum yang diisi ulang di sebuah sekolah dalam satu pekan:

```python
botol = {"Senin": 12, "Selasa": 18, "Rabu": 14, "Kamis": 21, "Jumat": 10}
jumlah = sum(botol.values())
rata = jumlah / len(botol)
terbesar = max(botol.values())
print(jumlah, rata, terbesar)
```

`values()` memberi semua nilai kamus, `sum` menjumlahkannya, `len` menghitung pasangan, dan `max` memberi nilai terbesar.

**Prediksi.** Apa yang tercetak? Apakah rata-rata ada di antara lima data? Tulis dulu.

**Jalankan.** Hitung dengan tangan lebih dulu, lalu jalankan.

**Selidiki.** Cocokkan dengan prediksimu. Hari apa yang memiliki nilai terbesar, dan dari mana kamu tahu?

## Contoh terselesaikan

Keluaran: `75 15.0 21`. Jumlahnya 12 + 18 + 14 + 21 + 10 = 75; rata-ratanya 75 dibagi 5 = 15.0, dan tidak ada hari yang tepat bernilai 15. `max(botol.values())` hanya memberi nilai 21, bukan harinya. Untuk mencari harinya, telusuri kuncinya dengan program lanjutan (memakai `botol` di atas):

```python
hari_terbesar = ""
tertinggi = 0
for hari in botol:
    if botol[hari] > tertinggi:
        tertinggi = botol[hari]
        hari_terbesar = hari
print(hari_terbesar, tertinggi)
```

Tercetak `Kamis 21`. Penelusuran `tertinggi`: 12, 18, 18, 21, 21.

Cara kedua, lembar kerja: tulis hari di satu kolom dan nilai di kolom sebelahnya, lalu pada sel kosong pakai fungsi untuk jumlah, rata-rata, dan nilai terbesar pada rentang sel nilai. Nama fungsinya bergantung pada bahasa program. Tinjau ulang: kedua cara harus memberi 75, 15 dan 21; bila berbeda, periksa rentang sel dan angka yang diketik.

Rata-rata menyembunyikan sebaran. Data `[12, 18, 14, 21, 10]` dan `[15, 15, 15, 15, 15]` sama-sama berjumlah 75 dan berata-rata 15.0, tetapi nilai terbesarnya 21 dan 15. Karena itu satu ringkasan tidak cukup; tulis juga nilai terbesar dan batas data.

## Contoh setengah jadi

Ringkasan nilai ulangan `[70, 80, 90, 60]`. Isi bagian kosong.

```python setengah-jadi
nilai = [70, 80, 90, 60]
jumlah = ____(nilai)
rata = jumlah / ____(nilai)
print("Jumlah:", jumlah)
print("Rata-rata:", ____)
print("Terbesar:", ____(nilai))
```

Apa yang tercetak? Cocokkan dengan jawabanmu di "Ingat kembali".

## Susun urutannya

Lima langkah meringkas data berikut sudah diacak. Susun menjadi urutan yang masuk akal.

- **A.** Tulis pertanyaan yang ingin dijawab.
- **B.** Tulis data ke dalam program atau lembar kerja.
- **C.** Hitung jumlah, rata-rata, dan nilai terbesar.
- **D.** Cocokkan hasil dua cara.
- **E.** Tulis ringkasan dengan satuan dan batasnya.

Tulis urutan hurufnya. Jelaskan mengapa D harus sebelum E.

## Latihan

1. **Ubah.** Pada data botol, ubah Jumat menjadi 40. Hitung ulang jumlah, rata-rata, dan nilai terbesar, dan sebut hari terbesarnya.
2. **Buat.** Tulis data lima hari suhu rekaan dalam daftar, lalu hitung jumlah, rata-rata, dan terbesar dengan program dan dengan lembar kerja atau kertas. Cocokkan.
3. **Selidiki.** Untuk `[10, 10, 10, 10, 70]`, hitung rata-rata dan nilai terbesar. Apa yang rata-rata tidak ceritakan?
4. **Jelaskan.** Mengapa dua cara menghitung lebih meyakinkan daripada satu cara saja?

## Latihan bercampur

1. `hitung = {}`, lalu `hitung["a"] = hitung.get("a", 0) + 1` dua kali. Berapa nilai `hitung["a"]`? (`SMP9-1-M3`)
2. Mengapa nilai yang dibaca dari berkas harus diubah dengan `int` sebelum dijumlahkan? (`SMP9-1-M4`)

## Ulang berjarak

Kerjakan ulang tanpa melihat modul ini, lalu cocokkan:

- **Dua minggu lagi** (`SMP9-1-M7`): sebut tiga hal yang diringkas dari data tabel dan satu hal yang tidak bisa dipastikan dari rata-rata.
- **Sekitar dua bulan lagi** (`SMP9-1-M13`): hitung jumlah, rata-rata, dan nilai terbesar `[3, 8, 5, 9, 5]` dengan program.
- **Akhir semester** (`SMP9-1-M14`): tulis fungsi yang mengembalikan rata-rata sebuah daftar dan telusuri untuk `[2, 4, 9]`.

## Kesalahan umum

- **Mengira rata-rata adalah data yang paling sering muncul.** Kenali: kamu menjawab "rata-rata 15, jadi hampir tiap hari 15".
- **Membagi dengan angka yang salah.** Kenali: rata-rata dibagi 4 atau 6 padahal ada 5 data.
- **Mengira `max` memberi nama kuncinya.** Kenali: tercetak angka, bukan hari.
- **Rentang sel lembar kerja terlewat satu baris.** Kenali: jumlah lembar kerja berbeda dari jumlah program.
- **Menulis kesimpulan sebab dari rata-rata.** Kenali: kalimat memakai "karena".

## Cek mandiri

Tutup modul, jawab tanpa melihat, lalu periksa.

1. Hitung jumlah, rata-rata, dan nilai terbesar `[3, 8, 5, 9, 5]`.
2. Tulis dua baris Python yang menghitung rata-rata sebuah daftar `d`.
3. Sebut satu hal yang tidak bisa dipastikan dari rata-rata.

Daftar periksa (kosong; kamu isi sendiri, tidak dikumpulkan):

- [ ] Aku bisa menghitung ringkasan data dengan program.
- [ ] Aku bisa mencocokkannya dengan lembar kerja atau hitungan tangan.
- [ ] Aku bisa menyebut batas dari rata-rata.

Kunci: (1) jumlah 30, rata-rata 6.0, terbesar 9; (2) `jumlah = sum(d)` lalu `rata = jumlah / len(d)`; (3) sebaran data atau nilai tiap hari, karena data berbeda bisa memberi rata-rata sama.

## Langkah berikutnya

`SMP9-1-M6`, "Sumber data terbuka dan legal". Kamu memeriksa dari mana sebuah himpunan data berasal dan apa lisensinya sebelum memakainya.

## Catatan untuk guru

- **Waktu:** 2 JP x 40 menit `[asumsi]` (silabus bagian 2). Berpasangan boleh untuk "Prediksi dulu" dan "Latihan"; bukan jaminan efek belajar.
- **Alat:** editor Python 3 dan program lembar kerja sekolah. Penulis menjalankan setiap program dengan `python3 -I` (Python 3.12.3); keluaran di modul sama dengan hasilnya. Perilaku `sum`, `len`, `max`, dan `values()` dicocokkan dengan dokumentasi resmi Python. Langkah lembar kerja sengaja tanpa nama menu atau fungsi; penulis tidak menjalankan lembar kerja, jadi guru memeriksa nama fungsi dan cara memilih rentang sel pada program dan bahasa yang dipakai sebelum kelas.
- **Butir CP:** corpus memetakan minggu ini ke `D-BK-d` dan `DK-BK-a`. Modul tidak menyatakan CP "terpenuhi"; ia hanya melatih meringkas himpunan data kecil dengan dua cara.
- **Kunci "Prediksi dulu":** `75 15.0 21`; rata-rata 15.0 tidak ada di antara data; Kamis (21), diketahui dari menelusuri kunci.
- **Kunci "Contoh setengah jadi":** `sum`, `len`, `rata`, `max`. Tercetak `Jumlah: 300`, `Rata-rata: 75.0`, `Terbesar: 90`.
- **Kunci "Susun urutannya":** A, B, C, D, E. Hasil harus cocok sebelum dituliskan sebagai ringkasan.
- **Kunci latihan:** (1) jumlah 105, rata-rata 21.0, terbesar 40, hari Jumat. (2) jawaban bebas; periksa kedua cara cocok. (3) rata-rata 22.0 dan terbesar 70; rata-rata tidak menunjukkan bahwa empat dari lima nilai hanya 10. (4) cara berbeda menguji hasil dari sudut lain; kesalahan satu cara kecil kemungkinan muncul di cara lain.
- **Kunci "Latihan bercampur":** (1) 2. (2) isi berkas adalah teks; `+` pada teks menyambung, bukan menjumlah.
- **Kunci "Ulang berjarak":** `[3, 8, 5, 9, 5]` berjumlah 30, rata-rata 6.0, terbesar 9; fungsi: `def rata_rata(daftar):` dengan `for` dan `return total / len(daftar)`; untuk `[2, 4, 9]` jumlah 15, rata-rata 5.0.
- **Petunjuk bertahap:** (a) tulis pertanyaan; (b) hitung jumlah; (c) bagi dengan banyak data; (d) cocokkan dengan cara kedua.
- **AI:** tanpa AI. Kebijakan `smp-coding` (silabus bagian 7.1): AI generatif hanya demonstrasi guru, tanpa akun murid; asesmen tanpa AI.
- **Privasi:** semua data rekaan; jangan memakai data teman sekelas atau data sekolah nyata sebagai bahan latihan.
- **Unsur pembelajaran:** ingat kembali dan jarak (`K`), PRIMM (`K` usia 11 sampai 14), tabel penelusuran (`K`), contoh lengkap lalu setengah jadi (`K`), Parsons (`M`), latihan bercampur (`K`).
