## Untuk siapa modul ini

Modul ini untuk murid kelas 9 pada minggu keempat semester pertama. Kamu memakai editor Python yang disiapkan gurumu dan satu berkas teks kecil. Waktunya satu pertemuan, 2 JP. Prasyaratnya `SMP9-1-M2` (teks) dan `SMP8-1-M6` (lembar kerja dan tabel). Semua data di modul ini rekaan: "Murid-01" dan seterusnya bukan nama nyata.

## Ingat kembali

Tutup modul ini dan jawab dari ingatan.

1. Pecah `"Murid-01,80"` menjadi dua bagian dan ubah bagian kedua menjadi bilangan. (`SMP9-1-M2`)
2. Tulis kamus dengan tiga pasangan nama dan nilai, lalu tambahkan satu pasangan baru. (`SMP9-1-M3`)
3. Pada sebuah tabel, apa itu baris, kolom, dan sel? (`SMP8-1-M6`)
4. Tulis perulangan yang mencetak angka 1 sampai 5, satu per baris. (`SMP8-2-M5`)

Kunci: (1) `bagian = "Murid-01,80".split(",")` lalu `int(bagian[1])`, hasilnya 80; (2) contoh `n = {"Murid-01": 80, "Murid-02": 70, "Murid-03": 90}` lalu `n["Murid-04"] = 60`; (3) baris datar, kolom tegak, sel adalah pertemuan baris dan kolom; (4) `for i in range(1, 6):` lalu `print(i)` menjorok.

## Tujuan

Setelah modul ini kamu dapat:

1. membaca berkas teks baris demi baris dengan `with open(...)`;
2. memecah tiap baris dengan `strip` dan `split` dan mengubah bagian angka dengan `int`;
3. menyimpan hasil bacaan dalam kamus atau menjumlahkannya;
4. menjelaskan sebab `FileNotFoundError`.

## Prediksi dulu

Data sering tersimpan di berkas. Buat berkas `nilai.txt` di folder yang sama dengan programmu. Data sintetis ini satu baris satu murid, nama dan nilai dipisah koma:

```text
Murid-01,80
Murid-02,70
Murid-03,90
Murid-04,60
```

`with open(...) as berkas:` membuka berkas dan menutupnya otomatis saat blok selesai, dan `for baris in berkas:` mengambil satu baris tiap putaran. Program P:

```python
total = 0
with open("nilai.txt", encoding="utf-8") as berkas:
    for baris in berkas:
        bagian = baris.strip().split(",")
        print(bagian[0], bagian[1])
        total = total + int(bagian[1])
print("Total:", total)
```

**Prediksi.** Apa yang tercetak? Berapa nilai `total` sesudah putaran kedua? Tulis dulu.

**Jalankan.** Buat tabel penelusuran: putaran, `bagian`, `total`. Lalu jalankan.

**Selidiki.** Cocokkan dengan prediksimu. Mengapa `strip()` dipakai sebelum `split(",")`?

## Contoh terselesaikan

Keluaran P: empat baris `Murid-01 80`, `Murid-02 70`, `Murid-03 90`, `Murid-04 60`, lalu `Total: 300`. Penelusuran `total`: 80, 150, 240, 300.

Tiap `baris` yang dibaca masih membawa tanda pindah baris di ujungnya: baris pertama sebenarnya `'Murid-01,80\n'`. `strip()` membuangnya, `split(",")` memecah di koma, dan `int(bagian[1])` mengubah teks `"80"` menjadi bilangan agar bisa dijumlahkan.

Menyimpan hasil bacaan dalam kamus:

```python
nilai = {}
with open("nilai.txt", encoding="utf-8") as berkas:
    for baris in berkas:
        bagian = baris.strip().split(",")
        nilai[bagian[0]] = int(bagian[1])
print(nilai)
```

Tercetak `{'Murid-01': 80, 'Murid-02': 70, 'Murid-03': 90, 'Murid-04': 60}`. Tinjau ulang: empat baris di berkas, empat pasangan di kamus, dan nilainya cocok.

Tiga hal yang perlu diingat. Pertama, isi berkas adalah teks; angka harus diubah dengan `int`. Kedua, pola bacanya selalu buka, ulangi per baris, bersihkan, pecah. Ketiga, nama berkas dan folder harus tepat; bila tidak, Python berhenti dengan `FileNotFoundError: [Errno 2] No such file or directory: 'nilaii.txt'`.

## Contoh setengah jadi

Menghitung berapa murid bernilai paling sedikit 75. Isi bagian kosong.

```python setengah-jadi
lulus = 0
with open("nilai.txt", encoding="utf-8") as berkas:
    for baris in berkas:
        bagian = baris.____().split(",")
        if int(bagian[____]) >= 75:
            lulus = lulus + ____
print("Lulus:", lulus)
```

Telusuri `lulus` tiap putaran. Apa yang tercetak?

## Susun urutannya

Enam baris berikut sudah diacak. Susun menjadi program yang mencetak total semua nilai di `nilai.txt`.

- **A.** `total = 0`
- **B.** `with open("nilai.txt", encoding="utf-8") as berkas:`
- **C.** `for baris in berkas:` (menjorok di bawah `with`)
- **D.** `bagian = baris.strip().split(",")` (menjorok di bawah `for`)
- **E.** `total = total + int(bagian[1])` (menjorok di bawah `for`)
- **F.** `print("Total:", total)` (di kolom paling kiri)

Tulis urutan hurufnya. Jelaskan mengapa A harus sebelum B.

## Latihan

1. **Ubah.** Ubah P agar mencetak rata-rata, yaitu total dibagi banyak murid. Berapa hasilnya?
2. **Buat.** Baca berkas ke dalam kamus, lalu cetak nama murid dengan nilai tertinggi beserta nilainya.
3. **Selidiki.** Hapus `.strip()` dari P lalu jalankan; apa yang berubah pada keluaran, dan mengapa `int(bagian[1])` tetap berhasil? Lalu ubah nama berkas menjadi `nilaii.txt`; apa pesan galatnya?
4. **Jelaskan.** Dengan dua kalimat, jelaskan mengapa `with` dipakai untuk membuka berkas.

## Latihan bercampur

1. `n = {"a": 1}`, lalu `n["b"] = 2`, lalu `n["a"] = 5`, lalu `print(n)`. Apa yang tercetak? (`SMP9-1-M3`)
2. Apa yang tercetak oleh `print("80" + "5", int("80") + 5)`? (`SMP8-2-M3`)

## Ulang berjarak

Kerjakan ulang tanpa melihat modul ini, lalu cocokkan:

- **Minggu depan** (`SMP9-1-M5`): tulis dari ingatan kerangka program yang membaca `nilai.txt` ke dalam kamus.
- **Sekitar dua bulan lagi** (`SMP9-1-M13`): sebut jenis galat bila berkas tidak ditemukan dan dua penyebabnya.
- **Akhir semester** (`SMP9-1-M14`): tulis dari ingatan kerangka program yang membaca berkas teks, memecah tiap baris, dan menjumlahkan satu kolom.

## Kesalahan umum

- **Lupa `int` pada bagian angka.** Kenali: `"80" + "70"` menghasilkan `8070`, bukan 150.
- **Lupa `strip()`.** Kenali: baris kosong ekstra saat dicetak.
- **Berkas tidak berada di folder yang sama dengan program.** Kenali: `FileNotFoundError`.
- **Salah indeks sesudah `split`.** Kenali: `IndexError` bila baris tidak punya koma.
- **Memulai `total` di dalam perulangan.** Kenali: hasil akhir hanya nilai baris terakhir.

## Cek mandiri

Tutup modul, jawab tanpa melihat, lalu periksa.

1. Tulis kerangka program yang membaca `nilai.txt` baris demi baris dan mencetak nama tiap baris.
2. Apa isi `baris` pertama sebelum `strip()`, dan sesudahnya?
3. Mengapa total nilai tidak bisa dihitung bila `int` dilupakan?

Daftar periksa (kosong; kamu isi sendiri, tidak dikumpulkan):

- [ ] Aku bisa membaca berkas teks per baris.
- [ ] Aku bisa memecah baris dan mengubah angkanya.
- [ ] Aku bisa menjelaskan `FileNotFoundError`.

Kunci: (1) `with open("nilai.txt", encoding="utf-8") as berkas:` lalu `for baris in berkas:` dan `print(baris.strip().split(",")[0])` menjorok; (2) `'Murid-01,80\n'` lalu `'Murid-01,80'`; (3) nilainya masih teks, sehingga `+` menyambung teks, bukan menjumlah.

## Langkah berikutnya

`SMP9-1-M5`, "Data tabel kecil: jumlah, rata-rata, terbesar". Kamu meringkas data dengan dua cara, dengan program dan dengan lembar kerja, lalu membandingkan hasilnya.

## Catatan untuk guru

- **Waktu:** 2 JP x 40 menit `[asumsi]` (silabus bagian 2). Berpasangan boleh untuk "Prediksi dulu" dan "Latihan"; bukan jaminan efek belajar.
- **Alat:** editor Python 3 yang dijalankan dari folder tempat `nilai.txt` berada (murid sering menjalankan dari folder lain; periksa lebih dulu). Penulis menjalankan setiap program dengan `python3 -I` (Python 3.12.3) pada berkas `nilai.txt` di atas; keluaran di modul sama dengan hasilnya. Perilaku `with open`, pembacaan baris, dan parameter `encoding` dicocokkan dengan tutorial resmi Python bagian membaca dan menulis berkas. Tulis berkas dengan editor teks biasa; hindari editor yang menambah format.
- **Butir CP:** corpus memetakan minggu ini ke `D-BK-d` dan `DK-BK-a`. Modul tidak menyatakan CP "terpenuhi"; ia hanya melatih membaca dan memproses data berstruktur kecil.
- **Kunci "Prediksi dulu":** tabel: (1) `['Murid-01', '80']`, total 80; (2) `['Murid-02', '70']`, total 150; (3) 240; (4) 300. Tercetak empat baris nama dan nilai, lalu `Total: 300`. `strip()` membuang `\n` di ujung baris.
- **Kunci "Contoh setengah jadi":** `strip`, `1`, `1`. Lulus: 80 dan 90, jadi `Lulus: 2`.
- **Kunci "Susun urutannya":** A, B, C, D, E, F. `total` harus dibuat sebelum dipakai di dalam perulangan.
- **Kunci latihan:** (1) 300 / 4 = 75.0. (2) `terbaik = ""`, `tinggi = 0`, lalu `for nama in nilai:` berisi `if nilai[nama] > tinggi:` dengan dua penugasan; hasil `Murid-03 90`. (3) tanpa `strip()` tiap `print` memberi baris kosong ekstra karena `bagian[1]` masih berisi `\n`; `int("80\n")` tetap berhasil karena `int` mengabaikan spasi dan tanda pindah baris di ujung; nama salah menimbulkan `FileNotFoundError: [Errno 2] No such file or directory: 'nilaii.txt'`. (4) `with` menutup berkas otomatis, juga bila terjadi galat.
- **Kunci "Latihan bercampur":** (1) `{'a': 5, 'b': 2}`. (2) `805 85`.
- **Kunci "Ulang berjarak":** `nilai = {}`, `with open(...)`, `for baris in berkas:`, `bagian = baris.strip().split(",")`, `nilai[bagian[0]] = int(bagian[1])`; `FileNotFoundError`, penyebab: nama salah atau folder salah; kerangka penjumlahan seperti kunci "Susun urutannya".
- **Petunjuk bertahap:** (a) tulis isi satu `baris` apa adanya; (b) bersihkan; (c) pecah; (d) ubah bagian angka.
- **AI:** tanpa AI. Kebijakan `smp-coding` (silabus bagian 7.1): AI generatif hanya demonstrasi guru, tanpa akun murid; asesmen tanpa AI.
- **Privasi:** semua data sintetis; jangan memakai nilai murid sungguhan sebagai bahan latihan.
- **Unsur pembelajaran:** ingat kembali dan jarak (`K`), PRIMM (`K` usia 11 sampai 14), tabel penelusuran (`K`), contoh lengkap lalu setengah jadi (`K`), Parsons (`M`), latihan bercampur (`K`).
