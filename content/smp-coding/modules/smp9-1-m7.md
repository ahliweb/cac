## Untuk siapa modul ini

Modul ini untuk murid kelas 9 pada minggu ketujuh semester pertama. Kamu bisa memakai editor Python, program lembar kerja yang disediakan sekolah, atau kertas kotak-kotak. Langkah lembar kerja ditulis tanpa nama menu karena menu berbeda antar program. Waktunya satu pertemuan, 2 JP. Prasyaratnya `SMP8-1-M7` (grafik dan interpretasi data) dan `SMP9-1-M5` (data tabel kecil). Semua data di modul ini rekaan.

## Ingat kembali

Tutup modul ini dan jawab dari ingatan.

1. Jelaskan bagaimana sumbu yang tidak mulai dari 0 bisa menyesatkan pembaca grafik, termasuk grafik prediksi. (`SMP8-1-M7`)
2. Sebut tiga hal yang diringkas dari data tabel dan satu hal yang tidak bisa dipastikan dari rata-rata. (`SMP9-1-M5`)
3. Sebut tiga hal yang dicantumkan pada grafik dari data orang lain: sumber, lisensi, dan tanggal. (`SMP9-1-M6`)
4. Tulis `for` yang mencetak tiap kunci dan nilai kamus `{"a": 1, "b": 2}`. (`SMP9-1-M3`)

Kunci: (1) batang yang dipotong membuat selisih kecil tampak besar, dan prediksi yang digambar seperti data pasti menipu pembaca; (2) jumlah, rata-rata, nilai terbesar; yang tidak pasti: sebaran data atau nilai tiap data; (3) sumber, lisensi, dan tanggal; (4) `kamus = {"a": 1, "b": 2}`, `for kunci in kamus:` lalu `print(kunci, kamus[kunci])` menjorok.

## Tujuan

Setelah modul ini kamu dapat:

1. membuat grafik batang teks dari kamus dengan `for` dan `"#" * n`, atau grafik batang dengan lembar kerja;
2. memberi judul, satuan, dan sumber pada grafik;
3. mengenali sumbu yang dipotong yang menyesatkan;
4. menulis satu kesimpulan beserta angka pendukung dan batasnya.

## Prediksi dulu

Grafik mengubah angka menjadi panjang batang supaya mudah dibandingkan. Di Python, `"#" * 3` menghasilkan `###`. Data rekaan sampah plastik yang terkumpul per kelas dalam satu pekan. Program P dan Q:

```python
data = {"Kelas A": 9, "Kelas B": 15, "Kelas C": 12, "Kelas D": 18, "Kelas E": 6}
print("Sampah plastik terkumpul per kelas (1 # = 1 kg)")
for nama in data:
    print(nama, "|", "#" * data[nama], data[nama])
```

Program Q sama, tetapi batangnya `"#" * (data[nama] - 5)`.

**Prediksi.** Pada P, batang Kelas D tampak berapa kali batang Kelas E? Pada Q? Tulis dulu.

**Jalankan.** Hitung `#` pada tiap baris dengan tangan, lalu jalankan keduanya.

**Selidiki.** Cocokkan dengan prediksimu. Mengapa Q terlihat lebih dramatis padahal datanya sama?

## Contoh terselesaikan

Keluaran P:

```text
Sampah plastik terkumpul per kelas (1 # = 1 kg)
Kelas A | ######### 9
Kelas B | ############### 15
Kelas C | ############ 12
Kelas D | ################## 18
Kelas E | ###### 6
```

Batang D 18 dan batang E 6, jadi D tiga kali E. Pada Q, batang menjadi 4, 10, 7, 13, dan 1, sehingga D tampak 13 kali E. Sumbu yang dipotong di 5 membuang bagian bawah batang dan melebih-lebihkan selisih; sumbu harus mulai dari 0. Tinjau ulang: jumlah `#` P harus 9 + 15 + 12 + 18 + 6 = 60, sama dengan jumlah data.

Grafik yang jujur memuat judul dengan satuan, sumbu mulai dari 0, dan sumber. Tulis di bawahnya: "Sumber: data rekaan guru, 2026." Kesimpulan satu kalimat: "Kelas D mengumpulkan paling banyak (18 kg), tiga kali Kelas E (6 kg); data hanya satu pekan sehingga tidak menunjukkan sebabnya." Rumusnya: pernyataan, angka pendukung, lalu batas.

Dengan lembar kerja: tulis nama kelas di satu kolom dan nilainya di kolom sebelahnya, pilih keduanya, buat grafik batang, lalu isi judul, label sumbu, dan satuan, dan pastikan sumbu mulai dari 0. Grafik boleh ditempel di dokumen beserta kesimpulannya. Bila memakai data orang lain, sebut juga sumber dan lisensinya.

## Contoh setengah jadi

Gelas air putih per hari: Senin 5, Selasa 8, Rabu 3. Isi bagian kosong.

```python setengah-jadi
data = {"Senin": 5, "Selasa": 8, "Rabu": 3}
print("Gelas air putih per hari (1 # = 1 gelas)")
for hari in ____:
    print(hari, "|", "#" * ____, data[hari])
print("Terbanyak:", max(____.values()))
```

Tulis keluarannya, lalu satu kesimpulan beserta batasnya.

## Susun urutannya

Empat baris berikut sudah diacak. Susun menjadi program yang mencetak grafik batang teks.

- **A.** `data = {"Kelas A": 9, "Kelas B": 15}`
- **B.** `print("Sampah plastik (1 # = 1 kg)")`
- **C.** `for nama in data:`
- **D.** `print(nama, "|", "#" * data[nama], data[nama])` (menjorok di bawah `for`)

Tulis urutan hurufnya. Jelaskan mengapa B tidak boleh di dalam perulangan.

## Latihan

1. **Ubah.** Ubah P menjadi `1 # = 2 kg` dengan `data[nama] // 2`. Tulis batang tiap kelas dan sebut satu hal yang hilang dari pembulatan.
2. **Buat.** Buat grafik batang untuk data rekaan empat ekstrakurikuler: 7, 12, 9, dan 5 murid. Beri judul, satuan, dan sumber, lalu tulis satu kesimpulan beserta batasnya.
3. **Selidiki.** Pada Q, berapa batang Kelas E, dan apa yang tampak benar atau salah pada gambar itu?
4. **Jelaskan.** Sebut tiga hal yang membuat sebuah grafik jujur.

## Latihan bercampur

1. Hitung jumlah, rata-rata, dan nilai terbesar `[9, 15, 12, 18, 6]`. (`SMP9-1-M5`)
2. Data di bawah grafik berlisensi CC BY. Apa yang kamu tulis di bawah grafik? (`SMP9-1-M6`)

## Ulang berjarak

Kerjakan ulang tanpa melihat modul ini, lalu cocokkan:

- **Minggu depan** (`SMP9-1-M8`): tulis dua cara berbeda untuk mencetak batang teks `#` sebanyak `n`.
- **Sekitar sebulan lagi** (`SMP9-1-M11`): sebut dua cara sebuah grafik bisa menyesatkan pembacanya.
- **Menjelang akhir semester** (`SMP9-1-M13`): tulis dari ingatan program yang mencetak grafik batang teks dari sebuah kamus, lalu satu kesimpulan beserta batasnya.

## Kesalahan umum

- **Memotong sumbu.** Kenali: batang terpendek hampir hilang.
- **Menulis sebab dari angka.** Kenali: kesimpulan memakai "karena", padahal data tidak menunjukkan sebab.
- **Tidak memberi judul, satuan, atau sumber.** Kenali: orang lain bertanya "ini angka apa dan dari mana?".
- **Memakai grafik untuk data yang tidak cocok.** Kenali: batang kategori disambung seperti garis waktu.
- **Lupa menyertakan angka pada batang.** Kenali: pembaca harus menebak nilainya.

## Cek mandiri

Tutup modul, jawab tanpa melihat, lalu periksa.

1. Tulis program yang mencetak grafik batang teks dari `{"X": 4, "Y": 7}`.
2. Mengapa sumbu batang harus mulai dari 0?
3. Tulis satu kesimpulan dari grafik P beserta batasnya.

Daftar periksa (kosong; kamu isi sendiri, tidak dikumpulkan):

- [ ] Aku bisa membuat grafik batang dari data tabel kecil.
- [ ] Aku bisa mengenali sumbu yang menyesatkan.
- [ ] Aku bisa menulis kesimpulan beserta batasnya.

Kunci: (1) `data = {"X": 4, "Y": 7}`, `for nama in data:` lalu `print(nama, "|", "#" * data[nama], data[nama])` menjorok; (2) sumbu yang dipotong membuat selisih tampak lebih besar daripada kenyataannya; (3) contoh: "Kelas D paling banyak (18 kg); data hanya satu pekan."

## Langkah berikutnya

`SMP9-1-M8`, "Lebih dari satu solusi untuk satu masalah". Kamu menulis dua program untuk soal yang sama dan membandingkannya.

## Catatan untuk guru

- **Waktu:** 2 JP x 40 menit `[asumsi]` (silabus bagian 2). Berpasangan boleh untuk "Prediksi dulu" dan "Latihan"; bukan jaminan efek belajar.
- **Alat:** editor Python 3 (hanya pustaka standar; grafik berupa teks), program lembar kerja sekolah, atau kertas kotak-kotak. Penulis menjalankan setiap program dengan `python3 -I` (Python 3.12.3); keluaran di modul sama dengan hasilnya. Penulis tidak menjalankan lembar kerja; guru memeriksa menu grafik pada program dan bahasa yang dipakai sebelum kelas.
- **Butir CP:** corpus memetakan minggu ini ke `D-BK-d`, `DK-BK-a`, dan `D-LD-e`. Modul tidak menyatakan CP "terpenuhi"; ia hanya melatih membuat, membaca, dan menyimpulkan grafik data kecil.
- **Kunci "Prediksi dulu":** P: 18 / 6 = 3 kali; Q: 13 dibanding 1, tampak 13 kali. Q lebih dramatis karena sumbu dipotong di 5.
- **Kunci "Contoh setengah jadi":** `data`, `data[hari]`, `data`. Keluaran: `Senin | ##### 5`, `Selasa | ######## 8`, `Rabu | ### 3`, `Terbanyak: 8`. Contoh kesimpulan: "Selasa paling banyak (8 gelas); data hanya tiga hari."
- **Kunci "Susun urutannya":** A, B, C, D. Judul dicetak sekali sebelum perulangan; di dalam perulangan judul akan terulang di tiap baris.
- **Kunci latihan:** (1) batang 4, 7, 6, 9, 3; `//` membulatkan ke bawah sehingga 1 kg hilang pada Kelas A (9) dan Kelas B (15), dan batangnya tidak lagi tepat sebanding dengan data. (2) jawaban bebas; periksa judul, satuan, sumber, dan batas. (3) 1 batang, tampak hampir nol padahal 6 kg; sumbu dipotong. (4) judul dan satuan, sumbu mulai dari 0, sumber (dan angka yang cocok dengan data).
- **Kunci "Latihan bercampur":** (1) 60, 12.0, 18. (2) sumber, pencipta, dan lisensi CC BY, misalnya "Sumber: Dinas Contoh, 2026, lisensi CC BY."
- **Kunci "Ulang berjarak":** minggu depan: `"#" * n`, dan `batang = ""` lalu `for i in range(n):` berisi `batang = batang + "#"`; sekitar sebulan lagi: sumbu dipotong dan data tanpa sumber atau satuan; menjelang akhir semester: seperti kunci "Cek mandiri".
- **Petunjuk bertahap:** (a) tulis pertanyaan; (b) siapkan data; (c) cetak judul sekali; (d) cetak satu baris per kunci; (e) tulis kesimpulan dengan batas.
- **AI:** tanpa AI. Kebijakan `smp-coding` (silabus bagian 7.1): AI generatif hanya demonstrasi guru, tanpa akun murid; asesmen tanpa AI.
- **Privasi:** semua data rekaan; jangan memakai data teman sekelas atau data sekolah nyata sebagai bahan latihan.
- **Unsur pembelajaran:** ingat kembali dan jarak (`K`), PRIMM (`K` usia 11 sampai 14), tabel penelusuran (`K`), contoh lengkap lalu setengah jadi (`K`), Parsons (`M`), latihan bercampur (`K`).
