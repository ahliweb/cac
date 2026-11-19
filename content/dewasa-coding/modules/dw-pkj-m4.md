## Untuk siapa modul ini

Modul ini untuk jalur **pekerja** (`PKJ`), 5 jam, sesudah `DW-PKJ-M3`. Alatnya Python 3 (penulis memakai 3.12.3), penyunting teks, dan terminal. Hanya pustaka bawaan Python yang dipakai (`csv` dan `collections`); pustaka pengolah tabel pihak ketiga tidak diajarkan di sini. Estimasi dua sesi `[asumsi]`.

Data dua tabel kecil di modul ini **sintetis** dan tetap (bukan acak): nama produk jelas rekaan, tanpa transaksi nyata.

## Cek awal pengalaman

Jawab tanpa melihat apa pun, lalu cocokkan dengan kunci. Skor tidak dicatat.

1. Tulis satu baris yang mengambil bilangan genap dari `[1, 2, 3, 4]`.
2. Apa hasil `{"a": 1}.get("b")`?
3. Apa yang terjadi pada `{"a": 1}["b"]`?
4. Apa arti "menggabungkan dua tabel pada satu kunci"?
5. Mengapa kunci `"P01 "` (dengan spasi di akhir) tidak cocok dengan `"P01"`?

Bila kelimanya benar, Anda boleh melewati "Contoh terselesaikan" dan "Contoh setengah jadi" dan langsung ke "Latihan".

## Ingat kembali

Tanpa melihat modul sebelumnya, tulis jawaban singkat.

1. (`DW-PKJ-M3`) Mengapa nilai dari CSV harus diubah dengan `int()` sebelum dihitung, dan di mana sebaiknya perubahan itu dilakukan?
2. (`DW-PKJ-M1`) Tulis satu tugas Anda sebagai algoritma yang memuat satu keputusan.
3. (`DW-FND-M1`) Apa yang Anda lakukan sebelum menempel teks ke asisten AI?

Cocokkan: (1) isi CSV selalu teks; lakukan di satu tempat, misalnya di dalam fungsi, agar berlaku bagi semua pemanggil; (2) langkah bernomor dengan syarat dan dua cabang, misalnya "bila jam keluar kosong, catat ke daftar perlu-dicek"; (3) menghapus atau mengganti data pribadi, kredensial, dan rahasia usaha, atau tidak menempelnya sama sekali.

## Tujuan

Setelah modul ini Anda dapat memfilter, mengelompokkan, dan menggabungkan dua tabel CSV.

## Prediksi dulu

Dua tabel kecil berikut (nama berkas `produk.csv` dan `transaksi.csv`):

```text
kode_produk,nama,kategori,harga
P01,Pulpen contoh,alat-tulis,2500
P02,Buku tulis contoh,alat-tulis,4000
P03,Kopi sachet contoh,minuman,1500
P04,Teh celup contoh,minuman,2000

no_transaksi,kode_produk,jumlah
T001,P01,10
T002,P03,24
T003,P02,5
T004,P04,12
T005,P03,6
T006,P99,3
T007,P01,4
```

Sebelum menjalankan apa pun, tulis: (a) transaksi mana yang berjumlah 10 atau lebih, (b) transaksi mana yang tidak bisa digabung dengan tabel produk, dan (c) perkiraan kategori mana yang totalnya lebih besar.

## Contoh terselesaikan

Skrip pembangkit menulis kedua berkas dari data tetap; satu kode (`P99`) sengaja tidak ada di tabel produk.

```python
import csv

# Data tetap (bukan acak): dua tabel kecil yang sengaja berisi satu kode yatim.
PRODUK = [
    ("P01", "Pulpen contoh", "alat-tulis", 2500),
    ("P02", "Buku tulis contoh", "alat-tulis", 4000),
    ("P03", "Kopi sachet contoh", "minuman", 1500),
    ("P04", "Teh celup contoh", "minuman", 2000),
]
TRANSAKSI = [
    ("T001", "P01", 10),
    ("T002", "P03", 24),
    ("T003", "P02", 5),
    ("T004", "P04", 12),
    ("T005", "P03", 6),
    ("T006", "P99", 3),  # kode tidak ada di tabel produk
    ("T007", "P01", 4),
]

with open("produk.csv", "w", newline="", encoding="utf-8") as berkas:
    penulis = csv.writer(berkas)
    penulis.writerow(["kode_produk", "nama", "kategori", "harga"])
    penulis.writerows(PRODUK)

with open("transaksi.csv", "w", newline="", encoding="utf-8") as berkas:
    penulis = csv.writer(berkas)
    penulis.writerow(["no_transaksi", "kode_produk", "jumlah"])
    penulis.writerows(TRANSAKSI)
```

Skrip ringkasan lalu memfilter, menggabung, dan mengelompokkan:

```python
import csv
from collections import defaultdict


def baca_csv(nama_berkas):
    with open(nama_berkas, newline="", encoding="utf-8") as berkas:
        return list(csv.DictReader(berkas))


produk = baca_csv("produk.csv")
transaksi = baca_csv("transaksi.csv")

# Filter: hanya transaksi dengan jumlah 10 atau lebih.
besar = [t for t in transaksi if int(t["jumlah"]) >= 10]
print("transaksi besar:", [t["no_transaksi"] for t in besar])

# Gabung: kunci kode_produk -> baris produk.
produk_per_kode = {p["kode_produk"]: p for p in produk}

total_per_kategori = defaultdict(int)
tanpa_produk = []
for t in transaksi:
    p = produk_per_kode.get(t["kode_produk"])
    if p is None:
        tanpa_produk.append(t["no_transaksi"])
        continue
    total_per_kategori[p["kategori"]] += int(t["jumlah"]) * int(p["harga"])

for kategori in sorted(total_per_kategori):
    print(kategori, total_per_kategori[kategori])
print("tanpa produk:", tanpa_produk)
```

Keluarannya (dijalankan dengan `python3 -I`, Python 3.12.3):

```text
transaksi besar: ['T001', 'T002', 'T004']
alat-tulis 55000
minuman 69000
tanpa produk: ['T006']
```

Tiga langkah, tiga alat. **Filter** dengan daftar komprehensi: saring baris yang memenuhi syarat. **Gabung** dengan kamus: ubah tabel acuan menjadi kamus berkunci, lalu cari tiap transaksi dengan `.get`, yang mengembalikan `None` bila kunci tidak ada (bukan galat). **Kelompok** dengan `defaultdict(int)`: kunci baru otomatis bernilai 0 sehingga `+=` langsung bekerja ([dokumentasi `collections`](https://docs.python.org/3/library/collections.html)).

Baris yatim `T006` dicatat, tidak dibuang diam-diam. Periksa dengan hitungan: 7 transaksi masuk = 6 cocok + 1 yatim. Totalnya dapat dicek tangan: alat-tulis 25000 + 20000 + 10000 = 55000; minuman 36000 + 24000 + 9000 = 69000.

## Contoh setengah jadi

Hitung total unit per kode produk. Lengkapi satu titik `___`, lalu jalankan di akhir skrip ringkasan:

```python setengah-jadi
unit_per_kode = defaultdict(int)
for t in transaksi:
    unit_per_kode[t["kode_produk"]] += ___
for kode in sorted(unit_per_kode):
    print(kode, unit_per_kode[kode])
```

Prediksi dulu: berapa unit `P03`?

## Latihan

1. **Ubah.** Ubah ambang filter dari 10 menjadi 5. Prediksi dulu daftar transaksinya.
2. **Buat.** Hitung rata-rata nilai transaksi per kategori (jumlah dikali harga) dan cetak dengan dua angka di belakang koma. Transaksi yatim tidak ikut dihitung.
3. **Jelaskan.** Mengapa baris yatim dicatat, bukan dibuang? Dan apa yang terjadi bila kunci di salah satu tabel ditulis `"p01"` (huruf kecil)? Perbaiki dengan `.strip().upper()` pada kunci sebelum menggabung.
4. **Buat.** Tulis ringkasan per kategori ke `ringkasan.csv` dengan `csv.writer`, kolom `kategori` dan `total`. Baca kembali berkasnya untuk memeriksa.
5. **Berpasangan (opsional).** Tukar tabel dengan rekan yang menambahkan dua kode yatim di tabelnya; periksa apakah skrip Anda mencatat keduanya. Peserta mandiri boleh melewati tugas ini.

## Latihan bercampur

1. (`DW-PKJ-M3`) Ubah perhitungan nilai transaksi menjadi fungsi `nilai(transaksi, produk)` yang mengembalikan jumlah dikali harga, lalu pakai di pengelompokan.
2. (`DW-PKJ-M2`) Di LibreOffice Calc, rumus apa yang setara dengan gabung dengan `.get` dan kelompok dengan `defaultdict`? Sebut dua fungsi dan jelaskan bagaimana baris yatim ditangani di sana.

## Keluaran portofolio

**Skrip ringkasan per kategori.** Simpan skrip ringkasan, skrip pembangkit data, `ringkasan.csv` hasilnya, dan catatan dua kalimat tentang cara baris yatim ditangani. Seluruhnya data sintetis.

## Ulang berjarak

Tanpa melihat modul ini, kerjakan ulang dan cocokkan. Pertanyaan ini akan muncul lagi di "Ingat kembali" modul berikutnya.

| Kapan | Pertanyaan |
| --- | --- |
| Satu minggu lagi (modul berikutnya) | Apa itu `defaultdict(int)` dan kapan Anda memakainya? |
| Tiga modul lagi | Mengapa kunci gabung harus dibersihkan (spasi, huruf) sebelum tabel digabung? |
| Akhir jalur | Tulis kerangka menggabung dua tabel dan menangani kunci yatim. |

## Kebijakan AI

Modul ini tidak memakai asisten AI; kebijakan lengkap program ada di `DW-FND-M1` dan akan dipakai penuh pada `DW-PKJ-M6` (silabus bagian 9.1).

## Kesalahan umum

- **Membuang kunci yatim diam-diam.** Total tampak benar padahal ada transaksi hilang; selalu hitung masuk = cocok + yatim.
- **Kunci tidak seragam.** `"P01 "`, `"p01"`, dan `"P01"` dianggap tiga kunci berbeda.
- **Memakai `d["kunci"]` pada kunci yang mungkin tidak ada.** Itu menghasilkan `KeyError`; pakai `.get` bila ketiadaan wajar.
- **Lupa mengubah teks menjadi angka sebelum menjumlahkan.**
- **Menggabung tanpa memeriksa kunci ganda.** Dua baris produk berkode sama membuat salah satunya tertimpa diam-diam di kamus.

## Cek mandiri

Tutup modul dan jawab:

1. Tiga langkah dasar mengolah tabel dan alat Python untuk masing-masing.
2. Apa beda `d[k]` dan `d.get(k)`?
3. Bagaimana Anda memastikan tidak ada transaksi yang hilang saat menggabung?

Daftar periksa (kosong; Anda isi sendiri, tidak dikumpulkan):

- [ ] Skrip saya memfilter, menggabung, dan mengelompokkan dengan data sintetis.
- [ ] Baris yatim dicatat dan jumlahnya diperiksa.
- [ ] Saya menguji hasil dengan hitungan tangan pada satu kategori.
- [ ] Tidak ada data nyata di folder saya.

## Kunci dan petunjuk

- **Cek awal:** (1) `[x for x in [1, 2, 3, 4] if x % 2 == 0]` menghasilkan `[2, 4]`; (2) `None`; (3) `KeyError: 'b'`; (4) mencocokkan baris dua tabel yang punya nilai kunci sama; (5) teks harus sama persis, termasuk spasi.
- **Prediksi:** (a) `T001`, `T002`, `T004`; (b) `T006`; (c) minuman, 69000 melawan 55000.
- **Setengah jadi:** `int(t["jumlah"])`; keluaran: `P01 14`, `P02 5`, `P03 30`, `P04 12`, `P99 3`. Jadi `P03` adalah 30 unit.
- **Latihan 1:** `['T001', 'T002', 'T003', 'T004', 'T005']`.
- **Latihan 2:** `alat-tulis 18333.33` dan `minuman 23000.0`, masing-masing dari tiga transaksi (nilai transaksi dikumpulkan di daftar per kategori, lalu `round(sum(nilai) / len(nilai), 2)`).
- **Latihan 3:** `.get("p01")` menghasilkan `None`; `.get("p01".upper().strip())` menemukan `Pulpen contoh`.
- **Latihan 4:** `ringkasan.csv` berisi `kategori,total`, `alat-tulis,55000`, `minuman,69000`.
- **Latihan bercampur 2:** `VLOOKUP` untuk mencari baris acuan dan `SUMIF` untuk kelompok; baris yatim tampil `#N/A` dan, dengan `IFERROR`, diganti teks seperti "tidak ditemukan" yang kemudian dapat dihitung dengan `COUNTIF`.
- **Petunjuk bila macet:** cetak `produk_per_kode.keys()` dan bandingkan dengan kunci transaksi yang tidak cocok.

## Langkah berikutnya

`DW-PKJ-M5`: Anda sudah bisa meringkas dua tabel; berikutnya Anda mengemas langkah ini menjadi laporan bulanan otomatis dan mengganti nama berkas secara massal pada folder sintetis.

## Catatan untuk pendamping

- **Waktu:** 5 jam. **Bahan:** Python 3, penyunting teks, terminal. Skrip dijalankan penulis dengan `python3 -I` (Python 3.12.3) dan keluarannya cocok dengan yang tertulis.
- **Tanda siap lanjut:** peserta menjelaskan mengapa baris yatim harus dicatat dan memeriksa bahwa jumlah masuk sama dengan cocok ditambah yatim.
- **Cakupan:** pustaka pengolah tabel pihak ketiga sengaja tidak diajarkan; bila peserta menanyakannya, arahkan ke dokumentasi resminya sebagai bacaan lanjutan.
