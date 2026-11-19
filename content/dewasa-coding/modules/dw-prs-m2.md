## Untuk siapa modul ini

Modul ini untuk jalur **personal** (`PRS`), 5 jam, sesudah `DW-PRS-M1`. Anda perlu Python 3 yang sudah terpasang (penulis memakai Python 3.12.3; panduan pemasangan ada di [dokumentasi resmi Python](https://docs.python.org/3/using/index.html)), penyunting teks, dan terminal untuk menjalankan `python3 namaberkas.py`. Estimasi dua sesi `[asumsi]`.

Semua angka dan nama di modul ini **rekaan**. Program Anda berjalan di komputer Anda sendiri; jangan mengetik data pribadi nyata saat mencoba, dan jangan menaruh kata sandi di dalam berkas program.

## Cek awal pengalaman

Jawab tanpa melihat apa pun, lalu cocokkan dengan kunci. Skor tidak dicatat.

1. Apa hasil `7 // 2` dan `7 % 2`?
2. Apa tipe nilai yang dikembalikan `input()`, dan mengapa itu penting?
3. Apa beda `=` dan `==`?
4. Apa yang dicetak `for i in range(3): print(i)`?
5. Mengapa baris di bawah `if` harus menjorok?

Bila kelimanya benar, Anda boleh melewati "Contoh terselesaikan" dan "Contoh setengah jadi" dan langsung ke "Latihan".

## Ingat kembali

Tanpa melihat modul sebelumnya, tulis jawaban singkat.

1. (`DW-PRS-M1`) Apa itu kondisi dan pengulangan? Beri satu contoh sehari-hari untuk masing-masing.
2. (`DW-PRS-M1`) Mengapa langkah "pastikan semuanya beres" belum bisa dijalankan tanpa menebak?
3. (`DW-FND-M1`) Sebutkan tiga aturan tentang kredensial.

Cocokkan: (1) kondisi: "jika hujan, bawa payung"; pengulangan: "aduk sampai gula larut" (jawaban Anda sendiri boleh berbeda asal kondisinya menguji sesuatu dan pengulangannya punya syarat berhenti); (2) karena orang lain harus menafsirkan arti "beres"; (3) tidak di berkas kode, tidak di perintah AI, tidak di-commit atau muncul di tangkapan layar.

## Tujuan

Setelah modul ini Anda menguasai variabel, masukan dan keluaran, kondisi, dan perulangan dalam Python.

## Prediksi dulu

Sebelum menjalankan, tulis: apa yang terjadi bila potongan ini dijalankan dan pengguna mengetik `30`?

```python
umur = input()
print(umur + 1)
```

## Contoh terselesaikan

### Dasar-dasarnya

Algoritma di `DW-PRS-M1` kini diterjemahkan ke Python. Simpan sebagai `dasar.py`:

```python
nama = "Contoh"
umur = 30
print("Halo,", nama)
print("Tahun depan umur Anda", umur + 1)
print(7 / 2, 7 // 2, 7 % 2)

n = 5
total = 0
while n > 0:
    total += n
    n -= 1
print(total)
for i in range(1, 4):
    print(i, i * i)
```

Keluarannya (dijalankan dengan `python3 -I`, Python 3.12.3):

```text
Halo, Contoh
Tahun depan umur Anda 31
3.5 3 1
15
1 1
2 4
3 9
```

Yang perlu diperhatikan:

- **Variabel** memberi nama pada nilai (`umur = 30`); `=` berarti "simpan", sedangkan `==` berarti "apakah sama".
- `/` membagi biasa (hasilnya pecahan), `//` pembagian bulat, `%` sisa bagi.
- **`while`** mengulang selama syaratnya benar; `n -= 1` memastikan syaratnya suatu saat salah. **`for ... in range(1, 4)`** mengulang untuk 1, 2, 3 (batas atas tidak ikut).
- Baris yang menjorok adalah isi blok. Itulah cara Python menandai "langkah di dalam pengulangan" yang di `DW-PRS-M1` Anda tulis dengan angka 2a, 2b.

Jawaban prediksi: potongan di "Prediksi dulu" menghasilkan `TypeError: can only concatenate str (not "int") to str` (dijalankan penulis), karena `input()` selalu mengembalikan **teks**. Ubah dulu dengan `int(...)`.

### Masukan, kondisi, dan keluaran: kalkulator patungan

Simpan sebagai `patungan.py`:

```python
print("Total tagihan (rupiah):")
tagihan = int(input())
print("Jumlah orang:")
orang = int(input())

if orang <= 0:
    print("Jumlah orang harus lebih dari 0.")
else:
    per_orang = tagihan // orang
    sisa = tagihan % orang
    print("Tiap orang membayar", per_orang)
    if sisa > 0:
        print("Sisa", sisa, "ditanggung satu orang.")
```

Penulis menjalankannya tiga kali dengan masukan yang dikirim dari berkas (di terminal Anda, ketikan Anda sendiri ikut tampil di layar). Masukan `120000` lalu `4`:

```text
Total tagihan (rupiah):
Jumlah orang:
Tiap orang membayar 30000
```

Masukan `100000` lalu `3`:

```text
Total tagihan (rupiah):
Jumlah orang:
Tiap orang membayar 33333
Sisa 1 ditanggung satu orang.
```

Masukan `100000` lalu `0`:

```text
Total tagihan (rupiah):
Jumlah orang:
Jumlah orang harus lebih dari 0.
```

Cabang `orang <= 0` mencegah pembagian dengan nol. Itulah gunanya memikirkan kasus tepi (`DW-PRS-M1`): masukan pengguna tidak boleh dipercaya begitu saja.

### Perulangan dengan daftar: kuis kecil

```python
soal = [
    ("Berapa 6 x 7?", "42"),
    ("Hewan apa yang mengeong?", "kucing"),
    ("Hari sesudah Senin?", "selasa"),
]

skor = 0
for pertanyaan, kunci in soal:
    print(pertanyaan)
    jawaban = input().strip().lower()
    if jawaban == kunci:
        print("Benar")
        skor += 1
    else:
        print("Salah, jawabannya", kunci)

print("Skor:", skor, "dari", len(soal))
```

Dengan masukan `42`, `anjing`, dan `  Selasa ` (ada spasi di kedua sisi dan huruf besar), keluarannya:

```text
Berapa 6 x 7?
Benar
Hewan apa yang mengeong?
Salah, jawabannya kucing
Hari sesudah Senin?
Benar
Skor: 2 dari 3
```

`.strip()` membuang spasi di tepi dan `.lower()` menyeragamkan huruf, sehingga `  Selasa ` tetap benar. Daftar `soal` berisi pasangan (pertanyaan, kunci); `for pertanyaan, kunci in soal` membongkar tiap pasangan.

## Contoh setengah jadi

Lengkapi tiga titik `___` agar program menghitung rata-rata nilai:

```python setengah-jadi
nilai = [70, 80, 90]
total = 0
for n in ___:
    total ___ n
print("Rata-rata:", total / ___)
```

Prediksi dulu keluarannya. Kerangka berlubang bukan program yang berjalan sampai Anda mengisinya.

## Latihan

1. **Ubah.** Tambahkan soal keempat pada kuis. Prediksi dulu skor bila Anda menjawab semuanya benar, lalu jalankan.
2. **Buat.** Tulis `suhu.py`: baca suhu Celsius sebagai bilangan bulat dan cetak suhu Fahrenheit dengan rumus `c * 9 / 5 + 32`. Prediksi hasil untuk 20 dan 100 sebelum menjalankan.
3. **Jelaskan.** Apa yang terjadi pada `suhu.py` bila pengguna mengetik `abc`, dan mengapa program kalkulator patungan tidak memeriksanya? Tulis satu cara sederhana menanganinya pada tahap ini (misalnya mengingatkan pengguna di teks permintaan).
4. **Buat.** Ubah soal "Hewan apa yang mengeong?" menjadi memberi **tiga kesempatan**: ulangi bertanya sampai jawaban benar atau tiga kali salah, lalu cetak `Benar` atau `Gagal` beserta jumlah percobaan.
5. **Berpasangan (opsional).** Tukar program dengan rekan; masing-masing mencari satu masukan yang membuat program rekannya galat atau memberi hasil aneh. Peserta mandiri boleh mencoba sendiri dengan masukan nyeleneh.

## Latihan bercampur

1. (`DW-PRS-M1`) Terjemahkan algoritma anggaran jajan (Rp 100.000; pengeluaran Senin sampai Jumat 25.000, 18.000, 30.000, 22.000, 15.000) menjadi Python. Prediksi dulu hari berhenti dan sisanya, lalu cocokkan dengan jejak tabel di modul itu.
2. (`DW-FND-M1`) Teman menyarankan menaruh kata sandi surel di dalam program kalkulator supaya "praktis". Tunjukkan dua risikonya.

## Keluaran portofolio

**Kuis atau kalkulator kecil.** Satu program (`kuis.py` atau kalkulator buatan Anda) dengan setidaknya satu masukan, satu kondisi, dan satu perulangan, ditambah contoh keluaran untuk tiga masukan: biasa, tepi, dan keliru. Di komentar atas tulis tanggal dan versi Python. Tanpa data pribadi nyata.

## Ulang berjarak

Tanpa melihat modul ini, kerjakan ulang dan cocokkan. Pertanyaan ini akan muncul lagi di "Ingat kembali" modul berikutnya.

| Kapan | Pertanyaan |
| --- | --- |
| Satu minggu lagi (modul berikutnya) | Mengapa `input()` perlu dibungkus `int(...)` sebelum dihitung, dan apa yang terjadi bila lupa? |
| Tiga modul lagi | Tulis dari ingatan perulangan `for` yang menjumlahkan semua anggota daftar `[70, 80, 90]` dan mencetak rata-ratanya. |
| Akhir jalur | Tulis dari ingatan program kecil yang membaca dua bilangan, menolak pembagi nol, dan mencetak hasil bagi bulat dan sisanya. |

## Kebijakan AI

Modul ini tidak memakai asisten AI; kebijakan lengkap program ada di `DW-FND-M1` dan dipakai penuh pada `DW-PKJ-M6`, `DW-PRO-M13`, dan `DW-BIS-M7` (silabus bagian 9.1).

## Kesalahan umum

- **Lupa mengubah teks menjadi angka.** `input()` selalu memberi teks; `"3" + 1` adalah galat, `"3" + "1"` menghasilkan `"31"`.
- **Memakai `=` di tempat `==`.** `if umur = 30:` adalah galat; perbandingan memakai `==`.
- **Indentasi tidak sama.** Semua baris dalam satu blok harus menjorok sama banyak.
- **Perulangan `while` tanpa perubahan.** Bila `n -= 1` terlupa, program tidak pernah berhenti; hentikan dengan `Ctrl+C`.
- **Membagi dengan nol.** Periksa pembaginya dulu pada kasus tepi.

## Cek mandiri

Tutup modul dan jawab:

1. Mengapa `int(input())`, bukan `input()` saja, dipakai untuk hitungan?
2. Bagaimana Anda tahu perulangan `while` akan berhenti?
3. Sebutkan satu masukan tepi untuk kalkulator patungan dan hasil yang benar.

Daftar periksa (kosong; Anda isi sendiri, tidak dikumpulkan):

- [ ] Program saya dijalankan dengan tiga jenis masukan.
- [ ] Saya menulis prediksi sebelum menjalankan.
- [ ] Tidak ada kata sandi atau data pribadi nyata di program saya.
- [ ] Saya dapat menjelaskan tiap baris kepada orang lain.

## Kunci dan petunjuk

- **Cek awal:** (1) `3` dan `1`; (2) teks (`str`), sehingga harus diubah dulu sebelum dihitung; (3) `=` menyimpan nilai, `==` membandingkan; (4) `0`, `1`, `2`, masing-masing di satu baris; (5) indentasi menandai baris mana milik blok.
- **Prediksi:** `TypeError` (lihat penjelasan di contoh).
- **Setengah jadi:** `nilai`, `+=`, dan `len(nilai)`; keluarannya `Rata-rata: 80.0`.
- **Latihan 1:** empat soal benar semua memberi `Skor: 4 dari 4`.
- **Latihan 2:** `print(c * 9 / 5 + 32)` memberi `68.0` untuk 20 dan `212.0` untuk 100.
- **Latihan 3:** `ValueError: invalid literal for int() with base 10: 'abc'` (dijalankan penulis). Penanganan yang lebih baik memakai `try` dan `except` (dibahas di tutorial resmi); pada tahap ini cukup minta pengguna mengetik angka.
- **Latihan 4:** gunakan `while percobaan < 3 and not benar:` dengan penghitung `percobaan` yang naik tiap putaran. Dengan jawaban `anjing`, `sapi`, `kucing` keluarannya berakhir `Benar 3`; dengan tiga jawaban salah, `Gagal 3` (dijalankan penulis).
- **Latihan bercampur 1:** `Jumat -10000`, sama dengan jejak di `DW-PRS-M1`.
- **Latihan bercampur 2:** kata sandi ikut tersalin bila program dibagikan, dan muncul di tangkapan layar atau riwayat versi.
- **Petunjuk bila macet:** tambahkan `print(...)` di dalam perulangan untuk melihat nilai variabel tiap putaran, seperti tabel penelusuran Anda.

## Langkah berikutnya

`DW-PRS-M3`: program Anda mulai punya ingatan. Daftar dan kamus menyimpan banyak nilai, dan berkas teks membuat data bertahan setelah program berhenti.

## Catatan untuk pendamping

- **Waktu:** 5 jam. **Bahan:** Python 3, penyunting teks, terminal. Semua program dijalankan penulis dengan `python3 -I` (Python 3.12.3); masukan dikirim dari berkas teks dan keluarannya cocok dengan yang tertulis.
- **Tanda siap lanjut:** peserta menjelaskan mengapa `input()` perlu `int(...)`, dan menyusun program dengan kondisi serta perulangan tanpa menyalin.
- **Privasi:** ingatkan agar peserta tidak mengetik data pribadi nyata saat mencoba program.
