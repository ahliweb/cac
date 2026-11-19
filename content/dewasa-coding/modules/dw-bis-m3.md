## Untuk siapa modul ini

Modul ini untuk jalur **pebisnis/UMKM** (`BIS`), 6 jam, sesudah `DW-BIS-M2`. Alatnya LibreOffice Calc. Rumus memakai **titik koma** dan dicoba di LibreOffice 24.2.7.2 dengan pengaturan bawaan; di versi atau pengaturan lain hasilnya dapat berbeda, jadi cocokkan dengan hasil yang tertulis. Anda memakai buku penjualan sintetis dari `DW-BIS-M2` (200 transaksi Toko Kue Contoh, benih acak 2026) dengan lembar `Penjualan`, `Produk`, dan `Ringkasan`. Satu blok Python kecil hanya untuk dibaca dan dijalankan bila ada. Estimasi tiga sesi `[asumsi]`.

Data **sintetis dan acak**: pola di dalamnya (misalnya bulan terbaik) tidak berlaku untuk usaha nyata mana pun. Jangan menarik kesimpulan usaha Anda dari angka latihan ini, dan jangan memasukkan data penjualan nyata. Modul ini bukan nasihat keuangan.

## Cek awal pengalaman

Jawab tanpa melihat apa pun, lalu cocokkan dengan kunci. Skor tidak dicatat.

1. Apa beda `SUMIF` dan `SUMIFS`?
2. Apa yang dilakukan tabel pivot, dalam satu kalimat?
3. Mengapa total Februari lebih kecil dari Januari belum tentu berarti usaha menurun?
4. Mengapa sumbu grafik batang sebaiknya dimulai dari nol?
5. Sebutkan satu keterangan wajib di bawah sebuah grafik.

Bila kelimanya benar, Anda boleh melewati "Contoh terselesaikan" dan "Contoh setengah jadi" dan langsung ke "Latihan".

## Ingat kembali

Tanpa melihat modul sebelumnya, tulis jawaban singkat.

1. (`DW-BIS-M2`) Mengapa harga dan biaya per baris disalin ke transaksi, bukan hanya diambil dari daftar harga sekarang?
2. (`DW-BIS-M2`) Tulis rumus total dan laba kasar untuk satu baris.
3. (`DW-BIS-M1`) Mengapa kode pelanggan acak lebih aman daripada nama dan nomor telepon di sebuah tabel yang dibagikan?

Cocokkan: (1) harga berubah dan laporan lama harus tetap benar; (2) `=D2*E2` dan `=D2*(E2-F2)`; (3) kode acak tidak mengidentifikasi orang; nama dan telepon adalah data pribadi.

## Tujuan

Setelah modul ini Anda dapat membuat ringkasan per produk dan per bulan, memakai tabel pivot, dan menyajikan grafik yang jujur.

## Prediksi dulu

Sebelum menghitung, tulis prediksi Anda untuk data 200 transaksi:

1. Produk mana yang total penjualannya terbesar, dan produk mana yang persentase laba kasarnya terbesar? Samakah?
2. Bulan mana yang total penjualannya terbesar?
3. Bila dihitung rata-rata per hari, apakah Februari masih kalah dari Januari?
4. Bila grafik batang total per bulan memulai sumbunya dari 7 juta, berapa persen tinggi batang Februari dibanding batang tertinggi?

## Contoh terselesaikan

### Ringkasan per produk

Di lembar baru, tulis nama produk di `A2:A7`, lalu rumus berikut di baris 2 dan salin ke bawah (hasil dicoba):

| Kolom | Rumus pada baris 2 | Arti |
| --- | --- | --- |
| `B` | `=SUMIF($Penjualan.C2:C1000;A2;$Penjualan.I2:I1000)` | total penjualan produk |
| `C` | `=ROUND(B2/SUM($Penjualan.I2:I1000);3)` | bagian dari seluruh penjualan |
| `D` | `=SUMIF($Penjualan.C2:C1000;A2;$Penjualan.J2:J1000)` | laba kasar produk |
| `E` | `=ROUND(D2/B2;3)` | persentase laba kasar |

| Produk | Penjualan | Bagian | Laba kasar | % laba kasar |
| --- | --- | --- | --- | --- |
| Nastar | 6.035.000 | 23,9% | 2.130.000 | 35,3% |
| Kue lapis | 5.240.000 | 20,8% | 2.096.000 | 40,0% |
| Brownies | 4.215.000 | 16,7% | 1.611.000 | 38,2% |
| Donat | 3.360.000 | 13,3% | 1.456.000 | 43,3% |
| Roti sobek | 3.234.000 | 12,8% | 1.470.000 | 45,5% |
| Bolu pandan | 3.115.000 | 12,4% | 1.335.000 | 42,9% |

Produk dengan penjualan terbesar (nastar) bukan yang berpersentase laba kasar terbesar (roti sobek, 45,5%). Satu ukuran saja bisa menyesatkan; baca keduanya.

### Ringkasan per bulan

Tambahkan kolom `M` di lembar `Penjualan` dengan `=MONTH(B2)`, salin sampai baris 201. Lalu `=SUMIFS($Penjualan.I2:I1000;$Penjualan.M2:M1000;A10)` dengan `A10` berisi nomor bulan. Hasilnya sama dengan versi rentang tanggal: `=SUMIFS($Penjualan.I2:I1000;$Penjualan.B2:B1000;">="&DATE(2026;1;1);$Penjualan.B2:B1000;"<"&DATE(2026;2;1))` (Januari: `8276000`). Jumlah hari bulan: `=DAY(DATE(2026;A10+1;1)-1)`; rata-rata per hari: `=ROUND(B10/C10;0)`.

| Bulan | Penjualan | Hari | Rata-rata per hari | Laba kasar |
| --- | --- | --- | --- | --- |
| Januari | 8.276.000 | 31 | 266.968 | 3.304.000 |
| Februari | 7.167.000 | 28 | 255.964 | 2.884.000 |
| Maret | 9.756.000 | 31 | 314.710 | 3.910.000 |

Februari hanya 28 hari. Per hari, Februari masih sedikit di bawah Januari (sekitar 4%), tetapi selisihnya jauh lebih kecil daripada selisih totalnya (sekitar 13%). Membandingkan total antarbulan tanpa memperhitungkan jumlah hari melebih-lebihkan penurunan.

### Tabel pivot

Letakkan kursor di dalam data `Penjualan` (judul kolom `id` sampai `bulan`), pilih Insert > Pivot Table, lalu Current selection ([dokumentasi resmi](https://help.libreoffice.org/latest/en-US/text/scalc/guide/datapilot_createtable.html); nama menu mengikuti bahasa antarmuka). Seret `produk` ke Row Fields, `bulan` ke Column Fields, dan `total` ke Data Fields dengan fungsi Sum. Hasil (dicoba, dibuat lewat antarmuka pemrograman LibreOffice):

| Produk | 1 | 2 | 3 | Total |
| --- | --- | --- | --- | --- |
| Bolu pandan | 980.000 | 770.000 | 1.365.000 | 3.115.000 |
| Brownies | 2.160.000 | 1.575.000 | 480.000 | 4.215.000 |
| Donat | 1.020.000 | 750.000 | 1.590.000 | 3.360.000 |
| Kue lapis | 1.640.000 | 1.760.000 | 1.840.000 | 5.240.000 |
| Nastar | 1.530.000 | 1.190.000 | 3.315.000 | 6.035.000 |
| Roti sobek | 946.000 | 1.122.000 | 1.166.000 | 3.234.000 |
| **Total** | 8.276.000 | 7.167.000 | 9.756.000 | 25.199.000 |

Pivot tidak berubah sendiri bila data berubah: pilih Data > Pivot Table > Refresh ([dokumentasi](https://help.libreoffice.org/latest/en-US/text/scalc/guide/datapilot_updatetable.html)). Pemeriksaan wajib: jumlah akhir pivot (`25199000`) harus sama dengan `=SUM($Penjualan.I2:I1000)`.

### Grafik yang jujur

Misalkan Anda membuat grafik batang total per bulan. Bandingkan tinggi batang bila sumbu dimulai dari nol dengan sumbu yang dipotong:

```python
bulan = {"Jan": 8276000, "Feb": 7167000, "Mar": 9756000}

for dasar in (0, 7000000):
    tinggi = {nama: nilai - dasar for nama, nilai in bulan.items()}
    tertinggi = max(tinggi.values())
    print("sumbu mulai dari", dasar)
    for nama, t in tinggi.items():
        print(f"  {nama}: batang {t / tertinggi:.0%} dari batang tertinggi")
```

Keluaran (`python3 -I`, Python 3.12.3):

```text
sumbu mulai dari 0
  Jan: batang 85% dari batang tertinggi
  Feb: batang 73% dari batang tertinggi
  Mar: batang 100% dari batang tertinggi
sumbu mulai dari 7000000
  Jan: batang 46% dari batang tertinggi
  Feb: batang 6% dari batang tertinggi
  Mar: batang 100% dari batang tertinggi
```

Data yang sama, kesan berbeda: dengan sumbu dipotong, Februari tampak hampir hilang. Lima pemeriksaan grafik yang jujur: (1) batang mulai dari nol; (2) judul, satuan, dan periode jelas; (3) skala yang sama bila dua grafik dibandingkan; (4) kategori tidak terlalu banyak dan urutannya masuk akal; (5) catatan sumber dan hal yang memengaruhi angka (misalnya "Februari 28 hari"). Jangan mengandalkan pengaturan otomatis alat: buka pengaturan sumbu dan periksa batas bawahnya ([bantuan grafik](https://help.libreoffice.org/latest/en-US/text/schart/main0000.html)).

### Satu halaman ringkasan

Susunan satu halaman: judul dengan periode dan sumber ("Toko Kue Contoh, Januari sampai Maret 2026, data sintetis"); tiga angka utama (total penjualan 25.199.000, laba kasar 10.098.000, 200 transaksi); tabel per produk; grafik batang per bulan dengan sumbu dari nol; dan satu baris catatan.

## Contoh setengah jadi

Lengkapi titik-titik:

1. Rata-rata nilai per transaksi: `=ROUND(SUM($Penjualan.I2:I1000)/COUNTA($Penjualan.___2:___1000);0)`.
2. Jumlah transaksi dengan QRIS: `=COUNTIF($Penjualan.G2:G1000;"___")`.
3. Bagian QRIS dari seluruh penjualan: `=ROUND(SUMIF($Penjualan.G2:G1000;"qris";$Penjualan.I2:I1000)/SUM($Penjualan.___2:___1000);3)`.

Lalu lengkapi: "Pivot saya benar bila jumlah akhirnya sama dengan ____."

## Latihan

1. **Ubah.** Ubah pivot agar `Data Fields` berisi `laba_kasar`, bukan `total`. Prediksi dulu: berapa jumlah akhirnya?
2. **Buat.** Buat tabel ringkasan per metode pembayaran (tunai, QRIS, transfer): jumlah transaksi dan total penjualan.
3. **Jelaskan.** Mengapa produk dengan penjualan terbesar belum tentu yang paling menguntungkan? Beri satu keputusan usaha yang bisa berubah karenanya.
4. **Buat.** Buat satu halaman ringkasan penjualan sesuai susunan di atas, lengkap dengan grafik batang per bulan dan catatan.
5. **Berpasangan (opsional).** Tukar grafik dengan rekan; cari satu hal yang membuat grafik itu menyesatkan. Peserta mandiri boleh melewati tugas ini.

## Latihan bercampur

1. (`DW-BIS-M2`) Dua puluh enam baris brownies bertanda "beda" pada `harga_cek`. Apakah ringkasan penjualan Anda memakai harga lama atau baru untuk baris itu, dan mengapa?
2. (`DW-FND-M1`) Anda ingin membagikan halaman ringkasan kepada seorang kerabat. Apa yang diperiksa dulu agar berkas tidak membawa data pribadi?

## Keluaran portofolio

**Satu halaman ringkasan penjualan sintetis.** Satu halaman (dicetak atau berkas) berisi judul dengan periode, tiga angka utama, tabel per produk, grafik batang per bulan dengan sumbu dari nol, dan catatan sumber. Seluruhnya data sintetis.

## Ulang berjarak

Tanpa melihat modul ini, kerjakan ulang dan cocokkan. Pertanyaan ini akan muncul lagi di "Ingat kembali" modul berikutnya.

| Kapan | Pertanyaan |
| --- | --- |
| Satu minggu lagi (modul berikutnya) | Mengapa sumbu grafik batang sebaiknya dimulai dari nol? |
| Tiga modul lagi | Apa beda total per bulan dan rata-rata per hari, dan kapan yang kedua lebih adil? |
| Akhir jalur | Sebutkan lima pemeriksaan agar ringkasan penjualan dan grafiknya jujur. |

## Kebijakan AI

Modul ini tidak memakai asisten AI; kebijakan lengkap program ada di `DW-FND-M1` dan dipakai penuh pada `DW-BIS-M7` (silabus bagian 9.1).

## Kesalahan umum

- **Membandingkan total antarbulan tanpa memperhatikan jumlah hari.** Hitung juga rata-rata per hari.
- **Memotong sumbu grafik.** Perbedaan kecil tampak besar.
- **Menganggap pivot selalu terbarui.** Lakukan Refresh setelah data berubah.
- **Menarik kesimpulan dari satu ukuran.** Penjualan terbesar belum tentu laba terbesar.
- **Tidak mencocokkan jumlah pivot dengan jumlah data asli.** Cek silang selalu.

## Cek mandiri

Tutup modul dan jawab:

1. Cara membuat pivot dan menyegarkannya.
2. Lima pemeriksaan grafik yang jujur.
3. Mengapa Februari tidak otomatis menandakan penurunan usaha?

Daftar periksa (kosong; Anda isi sendiri, tidak dikumpulkan):

- [ ] Jumlah akhir pivot sama dengan jumlah di data asli.
- [ ] Grafik batang saya dimulai dari nol.
- [ ] Halaman ringkasan memuat periode, satuan, dan sumber.
- [ ] Berkas saya tidak memuat data nyata.

## Kunci dan petunjuk

- **Cek awal:** (1) `SUMIF` memakai satu syarat, `SUMIFS` beberapa syarat; (2) meringkas data menurut baris dan kolom pilihan; (3) jumlah hari berbeda; (4) tinggi batang harus sebanding dengan nilai; (5) satuan, periode, atau sumber.
- **Prediksi:** (1) nastar penjualan terbesar; roti sobek persentase laba terbesar; tidak sama; (2) Maret; (3) ya, Februari masih sedikit di bawah Januari (255.964 dan 266.968); (4) sekitar 6% (batang tertinggi, Maret, 100%).
- **Setengah jadi:** (1) `A` dan `A`, hasil `125995`; (2) `qris`, hasil `64`; (3) `I` dan `I`, hasil `0.344`. Jumlah akhir pivot harus sama dengan `25199000`.
- **Latihan 1:** `10098000` (Januari 3.304.000, Februari 2.884.000, Maret 3.910.000).
- **Latihan 2:** tunai 70 transaksi dan 8.845.000; QRIS 64 dan 8.672.000; transfer 66 dan 7.682.000 (jumlah 25.199.000).
- **Latihan bercampur 1:** harga yang tercatat pada saat transaksi (lama), karena harga disalin ke baris.
- **Petunjuk bila macet:** cocokkan jumlah akhir dengan `=SUM($Penjualan.I2:I1000)` sebelum percaya hasil apa pun.

## Langkah berikutnya

`DW-BIS-M4`: angka usaha sudah terbaca; berikutnya Anda membuat halaman usaha statis agar pembeli menemukan dan memahami usaha Anda.

## Catatan untuk pendamping

- **Waktu:** 6 jam. **Bahan:** LibreOffice Calc dan buku penjualan dari `DW-BIS-M2`.
- **Verifikasi penulis:** ringkasan, rumus per bulan (kolom bantu dan rentang tanggal), dan pivot dicoba di LibreOffice 24.2.7.2 lewat antarmuka pemrograman LibreOffice; semua jumlah cocok dengan hitungan Python 3.12.3. Langkah menu pivot mengikuti dokumentasi resmi dan tidak diketik manual. Sumbu grafik tidak diuji: batas bawah otomatis tidak diklaim.
- **Tanda siap lanjut:** peserta menjelaskan mengapa jumlah pivot dicocokkan dengan data asli dan menunjukkan sumbu grafiknya.
