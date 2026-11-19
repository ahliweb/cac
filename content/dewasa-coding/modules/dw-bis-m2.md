## Untuk siapa modul ini

Modul ini untuk jalur **pebisnis/UMKM** (`BIS`), 6 jam, sesudah `DW-BIS-M1`. Alatnya LibreOffice Calc (lembar kerja bebas, lisensi MPL 2.0). Rumus ditulis dengan **titik koma** sebagai pemisah argumen. Semua rumus di modul ini dicoba di LibreOffice 24.2.7.2 dengan pengaturan bawaan; di versi atau pengaturan lain hasilnya dapat berbeda, jadi cocokkan dengan hasil yang tertulis. Python 3 (penulis memakai 3.12.3) dipakai satu kali untuk membangkitkan data latihan; bila tidak ada, pendamping menyediakan berkasnya. Estimasi tiga sesi `[asumsi]`.

Seluruh data adalah **sintetis**: 200 transaksi buatan untuk Toko Kue Contoh, dibangkitkan dari benih acak yang dicatat. Kode pelanggan seperti `PLG-027` hanyalah nomor acak, bukan orang. Jangan memasukkan data penjualan atau pelanggan usaha Anda yang nyata, dan jangan mengunggah berkas ini ke layanan lembar kerja web. Modul ini bukan nasihat pajak atau akuntansi.

## Cek awal pengalaman

Jawab tanpa melihat apa pun, lalu cocokkan dengan kunci. Skor tidak dicatat.

1. Apa arti "satu baris satu transaksi", dan mengapa baris total tidak boleh diselipkan di tengah data?
2. Bila jumlah ada di `D2` dan harga satuan di `E2`, tulis rumus total.
3. Mengapa tanggal harus tersimpan sebagai tanggal sungguhan, bukan teks?
4. Apa fungsi validasi data pada sebuah sel?
5. Mengapa harga sebaiknya disalin ke tiap baris transaksi, bukan hanya dilihat dari daftar harga yang berlaku sekarang?

Bila kelimanya benar, Anda boleh melewati "Contoh terselesaikan" dan "Contoh setengah jadi" dan langsung ke "Latihan".

## Ingat kembali

Tanpa melihat modul sebelumnya, tulis jawaban singkat.

1. (`DW-BIS-M1`) Bagaimana menghitung jam per bulan sebuah proses?
2. (`DW-BIS-M1`) Mengapa proses fisik tidak masuk daftar yang bisa didigitalkan?
3. (`DW-FND-M1`) Apa yang tidak boleh ada di berkas yang Anda bagikan?

Cocokkan: (1) kali per bulan dikali menit per kali, dibagi 60; (2) lembar kerja tidak mengerjakan kerja fisik; (3) kata sandi, kunci, token, dan data pelanggan nyata.

## Tujuan

Setelah modul ini Anda dapat merancang tabel transaksi, memakai rumus total dan laba kasar, dan memasang validasi data.

## Prediksi dulu

Tabel penjualan Toko Kue Contoh punya 200 baris. Sebelum membangunnya, tulis prediksi Anda:

1. Total dan laba kasar baris pertama: 5 buah kue lapis, harga satuan 40.000, biaya bahan satuan 24.000.
2. Total penjualan 200 baris: di bawah 10 juta, antara 10 dan 30 juta, atau di atas 30 juta?
3. Harga brownies naik pada 1 Maret. Bila kolom pemeriksa membandingkan harga tiap baris dengan daftar harga sekarang, apakah baris brownies bulan Januari akan "sama" atau "beda"?

## Contoh terselesaikan

### Rancang tabel dulu

Aturannya: satu baris satu kejadian (satu transaksi); satu kolom satu jenis isi; baris pertama judul kolom; tanpa sel gabungan; tanpa baris total di tengah; ringkasan di lembar terpisah. Kolom `A` sampai `H` adalah data (`id`, `tanggal`, `produk`, `jumlah`, `harga_satuan`, `biaya_satuan`, `metode`, `pelanggan_kode`); kolom `I` sampai `L` rumus (`total`, `laba_kasar`, `harga_cek`, `id_cek`).

**Harga dan biaya disalin ke tiap baris.** Daftar harga berubah; transaksi Januari harus tetap memakai harga Januari. Karena itu `harga_satuan` dan `biaya_satuan` adalah catatan pada saat transaksi, bukan acuan yang selalu mengikuti daftar harga.

**Laba kasar** di sini berarti penjualan dikurangi biaya bahan langsung. Ia bukan laba bersih: tenaga, sewa, listrik, dan biaya lain belum dikurangkan.

### Bangkitkan data sintetis

```python
import csv
import random
from datetime import date, timedelta

rng = random.Random(2026)  # benih acak: 2026

# nama, harga s.d. 28 Feb, harga sejak 1 Mar, biaya bahan per unit
PRODUK = [
    ("Brownies", 45000, 48000, 28000),
    ("Bolu pandan", 35000, 35000, 20000),
    ("Kue lapis", 40000, 40000, 24000),
    ("Nastar", 85000, 85000, 55000),
    ("Roti sobek", 22000, 22000, 12000),
    ("Donat", 30000, 30000, 17000),
]
METODE = ["tunai", "qris", "transfer"]
mentah = []
for _ in range(200):
    tgl = date(2026, 1, 1) + timedelta(days=rng.randint(0, 89))
    nama, lama, baru, biaya = rng.choice(PRODUK)
    harga = baru if tgl >= date(2026, 3, 1) else lama
    mentah.append((tgl, nama, rng.randint(1, 5), harga, biaya,
                   rng.choice(METODE), f"PLG-{rng.randint(1, 40):03d}"))
mentah.sort(key=lambda b: b[0])

with open("penjualan_sintetis.csv", "w", newline="", encoding="utf-8") as f:
    w = csv.writer(f)
    w.writerow(["id", "tanggal", "produk", "jumlah", "harga_satuan",
                "biaya_satuan", "metode", "pelanggan_kode"])
    for no, (tgl, nama, jml, harga, biaya, metode, plg) in enumerate(mentah, 1):
        w.writerow([f"T-{no:03d}", tgl.isoformat(), nama, jml, harga, biaya, metode, plg])

print("baris:", len(mentah))
print("total penjualan:", sum(b[2] * b[3] for b in mentah))
print("laba kasar:", sum(b[2] * (b[3] - b[4]) for b in mentah))
```

Keluarannya (dijalankan dengan `python3 -I`, Python 3.12.3):

```text
baris: 200
total penjualan: 25199000
laba kasar: 10098000
```

Lima baris pertama berkas itu: `T-001,2026-01-01,Kue lapis,5,40000,24000,transfer,PLG-027`, lalu `T-002` brownies 2 buah (45000), `T-003` brownies 4, `T-004` brownies 1, dan `T-005` roti sobek 2. Bila angka Anda berbeda, versi Python atau salinan kode Anda berbeda; cocokkan dulu sebelum lanjut.

### Impor ke Calc dan periksa tipenya

Buka berkas CSV di Calc (pemisah koma, pengodean UTF-8). Tanggal berbentuk `2026-01-01` dikenali sebagai tanggal sungguhan bila kolomnya rata kanan; rata kiri berarti teks. Ubah nama lembar menjadi `Penjualan`, lalu tambah lembar `Produk` berisi `produk`, `harga_sekarang`, `biaya_bahan` pada `A1:C7` (brownies 48000 dan 28000; bolu pandan 35000 dan 20000; kue lapis 40000 dan 24000; nastar 85000 dan 55000; roti sobek 22000 dan 12000; donat 30000 dan 17000).

### Rumus (dicoba di LibreOffice 24.2.7.2)

Tulis di baris 2 lalu salin ke baris 3 sampai 201.

| Kolom | Rumus pada baris 2 | Tujuan | Hasil baris 2 |
| --- | --- | --- | --- |
| `I` | `=D2*E2` | total penjualan | `200000` |
| `J` | `=D2*(E2-F2)` | laba kasar | `80000` |
| `K` | `=IF(E2=VLOOKUP(C2;$Produk.$A$2:$C$7;2;0);"sama";"beda")` | bandingkan dengan harga sekarang | `sama` |
| `L` | `=IF(COUNTIF($A$2:A2;A2)>1;"ganda";"ok")` | tandai id ganda | `ok` |

`$Produk.$A$2:$C$7` mengacu ke lembar `Produk`; tanda `$` mengunci rentang saat rumus disalin. Rumus `K` dan `L` mengikuti pola `DW-PKJ-M2`.

### Validasi data

Pilih `D2:D1000`, buka menu Data > Validity, tab Criteria (nama menu mengikuti bahasa antarmuka; lihat [dokumentasi Validity](https://help.libreoffice.org/latest/en-US/text/scalc/01/12120000.html) dan [tab Criteria](https://help.libreoffice.org/latest/en-US/text/scalc/01/12120100.html)), lalu pilih Whole numbers antara 1 dan 100. Untuk `C2:C1000` pilih jenis Cell range dengan sumber `$Produk.$A$2:$A$7`, dan untuk `G2:G1000` pilih jenis List dengan isian `tunai`, `qris`, `transfer`. Validasi menolak ketikan baru yang salah; data yang sudah ada tidak diperiksa ulang oleh validasi saja.

### Ringkasan di lembar `Ringkasan` (hasil dicoba)

| Tujuan | Rumus | Hasil |
| --- | --- | --- |
| Total penjualan | `=SUM($Penjualan.I2:I1000)` | `25199000` |
| Laba kasar | `=SUM($Penjualan.J2:J1000)` | `10098000` |
| Persentase laba kasar | `=ROUND(SUM($Penjualan.J2:J1000)/SUM($Penjualan.I2:I1000);3)` | `0.401` |
| Jumlah transaksi | `=COUNTA($Penjualan.A2:A1000)` | `200` |
| Baris harga "beda" | `=COUNTIF($Penjualan.K2:K1000;"beda")` | `26` |
| Penjualan brownies | `=SUMIF($Penjualan.C2:C1000;"Brownies";$Penjualan.I2:I1000)` | `4215000` |

Rentang dibuat sampai baris 1000 supaya baris baru ikut terhitung; sel kosong tidak mengubah jumlah. Dua puluh enam baris "beda" bukan kesalahan: itu 26 baris brownies sebelum 1 Maret yang memakai harga lama. Bila Anda menimpa harga lama dengan harga baru, laporan Januari berubah diam-diam.

## Contoh setengah jadi

Lengkapi titik-titik, lalu tulis hasil perkiraan Anda:

1. Total: `=D2*___`.
2. Persentase laba kasar: `=SUM($Penjualan.J2:J1000)/SUM($Penjualan.___2:___1000)`.
3. Validasi jumlah: bilangan bulat dari ___ sampai 100.

Lalu lengkapi: "Bila kolom `tanggal` rata kiri, saya periksa dulu apakah ____."

## Latihan

1. **Ubah.** Setiap kue dikemas dengan biaya 2.000 per buah. Ubah rumus laba kasar agar memuatnya. Prediksi dulu: laba kasar seluruh tabel naik atau turun, dan kira-kira berapa?
2. **Buat.** Tambahkan produk ketujuh ke lembar `Produk` dan satu transaksi uji untuknya. Pastikan validasi kolom `produk` mengenalinya (petunjuk: perluas rentang sumber validasi).
3. **Jelaskan.** Mengapa `harga_satuan` ditulis di tiap transaksi? Tuliskan satu akibat bila kolom itu selalu mengambil harga dari daftar sekarang.
4. **Buat.** Buat lembar `Catatan`: satu baris per kolom rumus (tujuan, rumus, satu masukan yang bisa membuatnya salah).
5. **Berpasangan (opsional).** Tukar tabel dengan rekan; masing-masing mencoba memasukkan jumlah `0`, jumlah `-3`, dan produk yang tidak ada. Peserta mandiri boleh melewati tugas ini.

## Latihan bercampur

1. (`DW-BIS-M1`) Kolom `pelanggan_kode` pada buku penjualan Anda bila berisi nama dan nomor telepon nyata: risiko mana dari peta Anda yang naik?
2. (`DW-FND-M1`) Anda ingin asisten AI memeriksa rumus buku penjualan. Apa yang diganti atau dihapus sebelum menempel contoh?

## Keluaran portofolio

**Buku penjualan sintetis.** Berkas lembar kerja berisi lembar `Penjualan` (200 baris), `Produk`, `Ringkasan`, dan `Catatan`. Seluruhnya data sintetis; kode pelanggan hanya nomor acak.

## Ulang berjarak

Tanpa melihat modul ini, kerjakan ulang dan cocokkan. Pertanyaan ini akan muncul lagi di "Ingat kembali" modul berikutnya.

| Kapan | Pertanyaan |
| --- | --- |
| Satu minggu lagi (modul berikutnya) | Mengapa harga dan biaya per baris disalin ke transaksi, bukan hanya diambil dari daftar harga sekarang? |
| Tiga modul lagi | Tulis rumus total dan laba kasar satu baris, dan jelaskan mengapa setiap acuan sel dipilih. |
| Akhir jalur | Mengapa satu baris satu transaksi, dan apa tiga aturan validasi yang mencegah salah ketik? |

## Kebijakan AI

Modul ini tidak memakai asisten AI; kebijakan lengkap program ada di `DW-FND-M1` dan dipakai penuh pada `DW-BIS-M7` (silabus bagian 9.1).

## Kesalahan umum

- **Menyelipkan baris total atau sel gabungan di tengah data.** Tabel tidak lagi bisa disaring, diurutkan, atau diringkas.
- **Mengetik total dengan tangan.** Ubah satu angka, total tidak ikut berubah.
- **Menimpa harga lama.** Laporan masa lalu berubah diam-diam.
- **Rentang rumus terlalu pendek.** Baris baru tidak ikut terjumlah.
- **Mengira validasi memperbaiki data lama.** Ia hanya menjaga ketikan baru.

## Cek mandiri

Tutup modul dan jawab:

1. Tiga aturan merancang tabel transaksi.
2. Beda laba kasar dan laba bersih.
3. Mengapa dua puluh enam baris "beda" bukan kesalahan?

Daftar periksa (kosong; Anda isi sendiri, tidak dikumpulkan):

- [ ] Tabel saya satu baris satu transaksi, tanpa sel gabungan.
- [ ] Setiap rumus punya tujuan di lembar `Catatan`.
- [ ] Saya memeriksa hasil dengan hitungan tangan pada tiga baris.
- [ ] Berkas saya tidak memuat data nyata.

## Kunci dan petunjuk

- **Cek awal:** (1) tiap baris mewakili satu transaksi; baris total di tengah merusak penyaringan dan ringkasan; (2) `=D2*E2`; (3) teks tidak bisa diurutkan menurut waktu atau dihitung; (4) menolak isi yang tidak sesuai aturan; (5) harga berubah, dan laporan lama harus tetap benar.
- **Prediksi:** (1) 200.000 dan 80.000; (2) antara 10 dan 30 juta (25.199.000); (3) "beda" untuk brownies Januari.
- **Setengah jadi:** (1) `E2`; (2) `I` dan `I`; (3) 1. Bila rata kiri: apakah ia teks, bukan tanggal.
- **Latihan 1:** `=D2*(E2-F2-2000)`; laba kasar turun 2.000 dikali jumlah seluruh unit (643), yaitu menjadi 8.812.000 (dicoba: `=SUM($Penjualan.J2:J1000)-2000*SUM($Penjualan.D2:D1000)`).
- **Latihan 5:** `0` dan `-3` ditolak oleh aturan bilangan bulat 1 sampai 100; produk di luar daftar ditolak oleh aturan daftar.
- **Petunjuk bila macet:** uji tiap potongan rumus di sel terpisah dan cocokkan dengan satu baris yang Anda hitung dengan tangan.

## Langkah berikutnya

`DW-BIS-M3`: buku penjualan sudah rapi; berikutnya Anda membaca isinya, yaitu ringkasan per produk dan per bulan, tabel pivot, dan grafik yang jujur.

## Catatan untuk pendamping

- **Waktu:** 6 jam. **Bahan:** LibreOffice Calc dan berkas CSV (dibangkitkan skrip atau disediakan pendamping).
- **Verifikasi penulis:** CSV diimpor dengan filter teks bawaan, rumus dan ringkasan dicoba di LibreOffice 24.2.7.2 lewat antarmuka pemrograman LibreOffice dan hasilnya sama dengan tabel. Aturan validasi dipasang lewat antarmuka yang sama; penolakan ketikan oleh dialog tidak diuji manual. Langkah menu mengikuti dokumentasi resmi.
- **Pajak:** modul ini tidak memberi nasihat pajak; kewajiban pajak usaha peserta dirujuk ke sumber resmi (mis. `https://pajak.go.id/`, dibuka 2026-11-19) atau konsultan, dan isinya `[belum terverifikasi]` di modul ini.
- **Tanda siap lanjut:** peserta menjelaskan mengapa harga disalin ke tiap transaksi dan mendokumentasikan tiap rumusnya.
