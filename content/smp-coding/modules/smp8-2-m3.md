## Untuk siapa modul ini

Modul ini untuk murid kelas 8 pada minggu ketiga semester kedua. Minggu ini **pengayaan**: ia memperdalam Python, bukan prasyarat capaian pembelajaran, dan boleh dipadatkan bila waktu sempit. Kamu memakai editor Python yang disiapkan gurumu dan kertas untuk menghitung. Waktunya satu pertemuan, 2 JP. Prasyaratnya `SMP8-2-M2` (keluaran, masukan, variabel).

## Ingat kembali

Tutup modul ini dan jawab dari ingatan.

1. Jelaskan mengapa hasil `input` perlu dibungkus `int(...)` sebelum dijumlahkan. (`SMP8-2-M2`)
2. Apa beda `=` dan `==` di Python? (`SMP8-2-M1`)
3. Apa arti `<((n) mod (i)) = (0)>` pada blok Scratch? (`SMP8-1-M5`)

Kunci: (1) `input` menghasilkan teks, dan teks tidak bisa dijumlahkan dengan bilangan; (2) `=` mengisi nilai, `==` membandingkan; (3) `n` habis dibagi `i`, jadi `i` adalah faktor `n`.

## Tujuan

Setelah modul ini kamu dapat:

1. memakai operator `+`, `-`, `*`, `/`, `//`, `%`, dan `**` serta urutan pengerjaannya;
2. membedakan bilangan bulat (`int`), bilangan desimal (`float`), dan teks (`str`) dengan `type`;
3. mengubah jenis nilai dengan `int()`, `float()`, dan `str()`;
4. menjelaskan mengapa `"7" + "2"` berbeda dari `7 + 2`.

## Prediksi dulu

Setiap nilai di Python punya **jenis**, dan jenis menentukan apa yang boleh dilakukan padanya. Operator yang dipakai di modul ini:

| Operator | Arti | Contoh | Hasil |
| --- | --- | --- | --- |
| `+`, `-`, `*` | tambah, kurang, kali | `7 * 2` | 14 |
| `/` | bagi; hasil selalu desimal | `7 / 2` | 3.5 |
| `//` | bagi, dibulatkan ke bawah | `7 // 2` | 3 |
| `%` | sisa bagi | `7 % 2` | 1 |
| `**` | pangkat | `2 ** 5` | 32 |

Program P:

```python
a = 7
b = 2
print(a / b, a // b, a % b)
print("7" + "2", 7 + 2)
print(type(a / b), type("7"))
```

**Prediksi.** Apa yang dicetak pada tiga baris keluaran? Tulis dulu.

**Jalankan.** Hitung dengan tangan lebih dulu, lalu jalankan di editor.

**Selidiki.** Cocokkan dengan prediksimu. Mengapa `"7" + "2"` menghasilkan `72`?

## Contoh terselesaikan

Keluaran P: `3.5 3 1`, lalu `72 9`, lalu `<class 'float'> <class 'str'>`. Tanda kutip membuat `"7"` menjadi teks, dan `+` pada teks menyambung, bukan menjumlah. Perkalian dan pembagian dikerjakan lebih dulu daripada tambah dan kurang: `2 + 3 * 4` bernilai 14, sedangkan `(2 + 3) * 4` bernilai 20.

Kalkulator kecil:

```python
a = float(input("Angka pertama? "))
b = float(input("Angka kedua? "))
print("Jumlah:", a + b)
print("Hasil bagi:", a / b)
```

Untuk masukan 7 dan 2 tercetak `Jumlah: 9.0` dan `Hasil bagi: 3.5`. `float` dipakai agar masukan boleh desimal; hasilnya ditulis dengan `.0`.

Kegunaan `//` dan `%`: mengubah 135 menit menjadi jam dan menit.

```python
menit = 135
print(menit // 60, "jam", menit % 60, "menit")
```

Tercetak `2 jam 15 menit`, karena 135 = 2 x 60 + 15. Tiga hal yang perlu diingat. Pertama, jenis nilai ditentukan penulisannya: `7`, `7.0`, dan `"7"` adalah tiga hal berbeda. Kedua, `/` selalu menghasilkan desimal, `//` bilangan bulat. Ketiga, ubah jenis secara sengaja dengan `int()`, `float()`, atau `str()`.

## Contoh setengah jadi

Program yang mengubah tinggi dalam sentimeter menjadi meter. Isi bagian kosong.

```python setengah-jadi
tinggi = ____(input("Tinggi (cm)? "))
print(tinggi / ____, "m")
```

Telusuri untuk masukan 150. Apa yang tercetak?

## Susun urutannya

Empat baris berikut sudah diacak. Susun menjadi program yang mengubah menit menjadi jam dan sisa menit.

- **A.** `menit = int(input("Menit? "))`
- **B.** `jam = menit // 60`
- **C.** `sisa = menit % 60`
- **D.** `print(jam, "jam", sisa, "menit")`

Tulis urutan hurufnya. B dan C boleh bertukar tempat; jelaskan mengapa A harus pertama dan D terakhir.

## Latihan

1. **Ubah.** Ubah kalkulator kecil menjadi pencetak hasil kali. Apa yang tercetak untuk 7 dan 2?
2. **Buat.** Tulis program yang membaca banyak detik sebagai bilangan bulat lalu mencetak menit dan sisa detik. Telusuri untuk 200.
3. **Selidiki.** Apa yang dicetak `print("3" * 4)`, dan mengapa `print("3" + 4)` berhenti dengan `TypeError`?
4. **Jelaskan.** Dengan dua kalimat, jelaskan mengapa `7 / 2` menghasilkan 3.5 tetapi `7 // 2` menghasilkan 3.

## Latihan bercampur

1. Apa yang dicetak `print(int("12") + 1, str(12) + "5")`? (`SMP8-2-M2`)
2. Tulis dalam Python: `set [n] to (3)`, lalu `repeat (2)` berisi `change [n] by (4)`, lalu `say (n)`. Berapa yang tercetak? (`SMP8-2-M1`)

## Ulang berjarak

Kerjakan ulang tanpa melihat modul ini, lalu cocokkan:

- **Minggu depan** (`SMP8-2-M4`): hitung `17 // 5` dan `17 % 5` tanpa melihat.
- **Sekitar sebulan lagi** (`SMP8-2-M8`): jelaskan mengapa `"7" + "2"` menghasilkan `72` dan bukan 9.
- **Akhir semester** (`SMP8-2-M14`): tulis dari ingatan program kalkulator kecil yang membaca dua bilangan desimal dan mencetak jumlah dan hasil baginya.

## Kesalahan umum

- **Menjumlahkan teks dengan bilangan.** Kenali: `TypeError` pada baris yang memakai `+`.
- **Mengira `input` menghasilkan bilangan.** Kenali: `10` dan `5` menjadi `105`, bukan 15.
- **Mengira `/` menghasilkan bilangan bulat.** Kenali: hasil `6 / 3` tercetak `2.0`, bukan `2`.
- **Salah urutan pengerjaan.** Kenali: `2 + 3 * 4` kamu kira 20.
- **Memakai `^` untuk pangkat.** Kenali: hasil tidak sesuai harapan; pangkat ditulis `**`.

## Cek mandiri

Tutup modul, jawab tanpa melihat, lalu periksa.

1. Hitung `17 // 5`, `17 % 5`, dan `2 ** 3`.
2. Sebut jenis nilai dari `7`, `7.0`, dan `"7"`.
3. Tulis dua baris yang mengubah teks `"40"` menjadi bilangan dan menambahnya dengan 2.

Daftar periksa (kosong; kamu isi sendiri, tidak dikumpulkan):

- [ ] Aku bisa memakai `/`, `//`, dan `%` dan tahu bedanya.
- [ ] Aku bisa menyebut jenis sebuah nilai.
- [ ] Aku bisa mengubah jenis nilai dengan `int()`, `float()`, dan `str()`.

Kunci: (1) 3, 2, dan 8; (2) bilangan bulat, bilangan desimal, dan teks; (3) `a = int("40")` lalu `print(a + 2)`, yang mencetak 42.

## Langkah berikutnya

`SMP8-2-M4`, "Percabangan `if`". Program akan memilih jalan menurut kondisi, dengan `if`, `elif`, dan `else` sebagai padanan `if` dan `else` di Scratch.

## Catatan untuk guru

- **Waktu:** 2 JP x 40 menit `[asumsi]` (silabus bagian 2). Minggu ini bertanda pengayaan di corpus; guru boleh memadatkannya. Berpasangan boleh; bukan jaminan efek belajar.
- **Alat:** Python 3 dengan editor sekolah. Penulis menjalankan semua program dengan Python 3.12.3 dan keluarannya sama dengan yang tertulis. Contoh lanjutan bila waktu ada: `0.1 + 0.2` tercetak `0.30000000000000004` (bilangan desimal disimpan hampir tepat); `-7 // 2` bernilai -4 (dibulatkan ke bawah). Keduanya tidak diujikan.
- **Butir CP:** corpus memetakan minggu ini ke `DK-BK-c*` (irisan, pengayaan); `cpCodes` modul kosong. Modul tidak menyatakan CP "terpenuhi".
- **Kunci "Prediksi dulu":** `3.5 3 1`; `72 9`; `<class 'float'> <class 'str'>`.
- **Kunci "Contoh setengah jadi":** `float` dan `100`; tercetak `1.5 m`.
- **Kunci "Susun urutannya":** A, B, C, D (atau A, C, B, D). A pertama karena `menit` dipakai baris lain; D terakhir karena memakai `jam` dan `sisa`. Untuk 135 tercetak `2 jam 15 menit`.
- **Kunci latihan:** (1) `print("Hasil kali:", a * b)`; tercetak 14.0. (2) `detik = int(input("Detik? "))` lalu `print(detik // 60, "menit", detik % 60, "detik")`; 200 mencetak `3 menit 20 detik`. (3) `3333` karena teks yang dikali empat diulang empat kali; `"3" + 4` mencoba menyambung teks dengan bilangan (`TypeError: can only concatenate str (not "int") to str`). (4) `/` bagi biasa dan hasilnya desimal; `//` membagi lalu membuang sisa.
- **Kunci "Latihan bercampur":** (1) `13 125`. (2) `n = 3`, `for putaran in range(2):` dengan `n = n + 4` menjorok, `print(n)`; n = 7, 11; tercetak 11.
- **Petunjuk bertahap:** (a) tulis jenis tiap nilai; (b) hitung pembagian dan sisanya dengan tangan; (c) ubah jenis sebelum menghitung; (d) cetak hasil dan cocokkan.
- **AI:** tanpa AI. Kebijakan `smp-coding` (silabus bagian 7.1): AI generatif hanya demonstrasi guru, tanpa akun murid; asesmen tanpa AI.
- **Privasi:** semua angka rekaan; tanpa nama murid pada berkas.
- **Unsur pembelajaran:** ingat kembali dan jarak (`K`), PRIMM (`K` usia 11 sampai 14), tabel penelusuran (`K`), contoh lengkap lalu setengah jadi (`K`), Parsons (`M`), latihan bercampur (`K`).
