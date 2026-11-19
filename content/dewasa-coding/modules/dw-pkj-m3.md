## Untuk siapa modul ini

Modul ini untuk jalur **pekerja** (`PKJ`), 5 jam, sesudah `DW-PKJ-M2`. Anda perlu Python 3 yang sudah terpasang (penulis memakai Python 3.12.3; panduan pemasangan ada di [dokumentasi resmi Python](https://docs.python.org/3/using/index.html)), penyunting teks, dan terminal untuk menjalankan `python3 namaberkas.py`. Estimasi dua sesi `[asumsi]`.

Semua data **sintetis** dan dibangkitkan skrip dari benih acak yang dicatat. Jangan menaruh berkas CSV kantor nyata di folder latihan.

## Cek awal pengalaman

Jawab tanpa melihat apa pun, lalu cocokkan dengan kunci. Skor tidak dicatat.

1. Apa beda `harga = 2500` dan `harga == 2500`?
2. Apa hasil `len([3, 5, 8])`?
3. Apa yang dicetak `for i in [1, 2, 3]: print(i * 2)`?
4. Mengapa nilai dari berkas CSV harus diubah dengan `int()` sebelum dihitung?
5. Apa tugas kata `return` pada fungsi?

Bila kelimanya benar, Anda boleh melewati "Contoh terselesaikan" dan "Contoh setengah jadi" dan langsung ke "Latihan".

## Ingat kembali

Tanpa melihat modul sebelumnya, tulis jawaban singkat.

1. (`DW-PKJ-M2`) Tulis rumus yang membuang spasi berlebih dan menyeragamkan huruf, lalu satu alasan memakai kolom baru.
2. (`DW-PKJ-M1`) Sebutkan empat pertanyaan kelayakan tugas untuk diotomasi.
3. (`DW-FND-M1`) Mengapa keluaran asisten AI harus diperiksa sebelum dipakai?

Cocokkan: (1) `=LOWER(TRIM(B2))`, dan data asli tetap utuh untuk diperiksa; (2) seberapa sering, berapa lama sekali kerja, apakah aturannya tegas, apa akibat bila salah atau adakah data sensitif; (3) AI bisa keliru atau mengarang walau terdengar yakin.

## Tujuan

Setelah modul ini Anda menguasai variabel, daftar, pengulangan, dan fungsi, serta dapat membaca berkas CSV.

## Prediksi dulu

Sel CSV selalu terbaca sebagai **teks**. Sebelum menjalankan, prediksi: apa yang terjadi pada potongan ini?

```python
baris = {"jumlah": "11", "harga_satuan": "2500"}
print(baris["jumlah"] * baris["harga_satuan"])
```

## Contoh terselesaikan

### Dasar: variabel, daftar, pengulangan, fungsi

```python
harga = 2500
jumlah = 11
total = harga * jumlah
print(total)

nilai_faktur = [27500, 204000, 48000]
nilai_faktur.append(50000)
print(len(nilai_faktur), nilai_faktur[0])

for nilai in nilai_faktur:
    if nilai >= 100000:
        print(nilai, "besar")
    else:
        print(nilai, "kecil")


def dengan_biaya(nilai, persen):
    return nilai + nilai * persen // 100


print(dengan_biaya(50000, 11))
```

Keluarannya (dijalankan dengan `python3 -I`, Python 3.12.3):

```text
27500
4 27500
27500 kecil
204000 besar
48000 kecil
50000 kecil
55500
```

Variabel memberi nama pada nilai; daftar menyimpan banyak nilai berurutan (indeks mulai dari 0); `for` mengulang untuk tiap anggota; fungsi mengemas langkah yang dipakai berulang, dan `return` mengembalikan hasilnya. Indentasi menentukan baris mana milik blok mana. Jawaban prediksi: potongan di bagian "Prediksi dulu" berakhir dengan `TypeError: can't multiply sequence by non-int of type 'str'` (dijalankan penulis), karena `"11"` dan `"2500"` adalah teks.

### Membuat data sintetis dengan benih acak

Skrip berikut membuat `faktur.csv` yang sama persis setiap kali dijalankan karena benihnya dicatat (`2026`). Untuk keperluan modul, hasilnya juga dituliskan di bawah; bila isi berkas Anda berbeda (misalnya karena versi Python), salin isi di bawah ke `faktur.csv`.

```python
import csv
import random

BENIH = 2026  # catat benih agar data bisa dibangkitkan ulang sama persis
random.seed(BENIH)

PRODUK = {"P01": 2500, "P02": 4000, "P03": 12000}

with open("faktur.csv", "w", newline="", encoding="utf-8") as berkas:
    penulis = csv.writer(berkas)
    penulis.writerow(["no_faktur", "tanggal", "kode_produk", "jumlah", "harga_satuan"])
    for nomor in range(1, 9):
        kode = random.choice(list(PRODUK))
        penulis.writerow(
            [f"F{nomor:03d}", f"2026-03-{nomor * 3:02d}", kode, random.randint(1, 20), PRODUK[kode]]
        )
```

```text
no_faktur,tanggal,kode_produk,jumlah,harga_satuan
F001,2026-03-03,P01,11,2500
F002,2026-03-06,P03,17,12000
F003,2026-03-09,P03,4,12000
F004,2026-03-12,P01,20,2500
F005,2026-03-15,P03,18,12000
F006,2026-03-18,P02,19,4000
F007,2026-03-21,P03,16,12000
F008,2026-03-24,P03,15,12000
```

### Membaca CSV

```python
import csv


def total_baris(baris):
    """Jumlah dikali harga satuan; nilai dari CSV berupa teks, jadi diubah dulu."""
    return int(baris["jumlah"]) * int(baris["harga_satuan"])


daftar_faktur = []
with open("faktur.csv", newline="", encoding="utf-8") as berkas:
    for baris in csv.DictReader(berkas):
        daftar_faktur.append(baris)

total_semua = 0
for baris in daftar_faktur:
    nilai = total_baris(baris)
    total_semua += nilai
    print(baris["no_faktur"], baris["kode_produk"], nilai)

print("banyak faktur:", len(daftar_faktur))
print("total:", total_semua)
```

```text
F001 P01 27500
F002 P03 204000
F003 P03 48000
F004 P01 50000
F005 P03 216000
F006 P02 76000
F007 P03 192000
F008 P03 180000
banyak faktur: 8
total: 993500
```

`csv.DictReader` membaca baris pertama sebagai nama kolom dan menghasilkan satu kamus per baris. `with open(...)` menutup berkas otomatis, `newline=""` dan `encoding` mengikuti [dokumentasi modul `csv`](https://docs.python.org/3/library/csv.html). Perhatikan bahwa `total_baris` mengubah teks menjadi angka **di dalam fungsi**, sehingga satu perbaikan berlaku untuk semua pemanggil.

## Contoh setengah jadi

Lengkapi dua titik `___`, lalu jalankan pada `daftar_faktur`:

```python setengah-jadi
def total_per_kode(daftar, kode):
    hasil = 0
    for baris in daftar:
        if baris["kode_produk"] == ___:
            hasil += int(baris["jumlah"]) * ___
    return hasil
```

Prediksi dulu nilai `total_per_kode(daftar_faktur, "P01")`. Kerangka berlubang bukan kode yang berjalan sampai Anda mengisinya.

## Latihan

1. **Ubah.** Ubah skrip pembaca agar hanya mencetak faktur bernilai 100000 atau lebih, lalu hitung banyaknya. Prediksi dulu banyaknya.
2. **Buat.** Tulis fungsi `rata_rata(daftar)` yang mengembalikan rata-rata nilai per faktur, dan cetak dengan satu angka di belakang koma.
3. **Jelaskan.** Mengapa berkas dibuka dengan `with open(...)`, bukan hanya `open(...)`? Dan apa yang berubah bila `int()` dihapus dari `total_baris`?
4. **Buat.** Ubah skrip pembangkit: benih `7` dan 10 baris. Catat benih dan versi Python di komentar paling atas, lalu jalankan ulang pembaca.
5. **Berpasangan (opsional).** Tukar skrip dengan rekan dan prediksi keluaran skrip masing-masing sebelum menjalankannya. Peserta mandiri boleh melewati tugas ini.

## Latihan bercampur

1. (`DW-PKJ-M2`) Tulis ulang rumus `=IF(G2>=100000;"besar";"kecil")` sebagai fungsi Python `ukuran(nilai)`, lalu uji dengan `50000` dan `204000`.
2. (`DW-FND-M1`) Rekan meminta Anda menjalankan skrip ini pada berkas faktur sungguhan dari kantor. Apa yang Anda katakan, dan data apa yang tetap dipakai?

## Keluaran portofolio

**Skrip yang membaca CSV sintetis.** Simpan skrip pembaca, skrip pembangkit dengan benih yang dicatat, dan contoh keluarannya. Di komentar atas tulis tanggal, versi Python, dan cara menjalankan. Tidak ada data nyata di folder.

## Ulang berjarak

Tanpa melihat modul ini, kerjakan ulang dan cocokkan. Pertanyaan ini akan muncul lagi di "Ingat kembali" modul berikutnya.

| Kapan | Pertanyaan |
| --- | --- |
| Satu minggu lagi (modul berikutnya) | Mengapa nilai dari CSV harus diubah dengan `int()` sebelum dihitung, dan di mana sebaiknya perubahan itu dilakukan? |
| Tiga modul lagi | Tulis fungsi yang menerima satu baris CSV (kamus) dan mengembalikan nilainya (jumlah dikali harga). |
| Akhir jalur | Tulis dari ingatan kerangka membaca CSV dengan `csv.DictReader`. |

## Kebijakan AI

Modul ini tidak memakai asisten AI; kebijakan lengkap program ada di `DW-FND-M1` dan akan dipakai penuh pada `DW-PKJ-M6` (silabus bagian 9.1).

## Kesalahan umum

- **Lupa mengubah teks menjadi angka.** `"11" * "2500"` adalah galat, dan `"11" + "5"` menghasilkan `"115"`, bukan 16.
- **Salah folder.** Python mencari `faktur.csv` di folder tempat Anda menjalankan terminal. Jalankan dari folder yang berisi berkasnya.
- **Indentasi salah.** Baris di dalam `for` atau `if` harus menjorok sama.
- **Mengira indeks mulai dari 1.** Anggota pertama daftar adalah indeks 0.
- **Menaruh berkas nyata di folder latihan.** Pakai hanya data hasil pembangkit.

## Cek mandiri

Tutup modul dan jawab:

1. Tulis dari ingatan fungsi yang mengembalikan jumlah dikali harga dari satu baris CSV.
2. Apa beda daftar dan kamus, dan mengapa `DictReader` menghasilkan kamus?
3. Mengapa benih acak dicatat?

Daftar periksa (kosong; Anda isi sendiri, tidak dikumpulkan):

- [ ] Skrip saya berjalan dari folder bersih tanpa data nyata.
- [ ] Saya mencatat benih dan versi Python.
- [ ] Saya bisa menjelaskan tiap baris skrip pembaca.
- [ ] Saya menguji dengan hitungan tangan pada dua baris.

## Kunci dan petunjuk

- **Cek awal:** (1) `=` memberi nilai pada nama, `==` membandingkan dua nilai; (2) `3`; (3) `2`, `4`, `6`, masing-masing di satu baris; (4) isi CSV selalu teks; (5) mengembalikan nilai kepada pemanggil dan mengakhiri fungsi.
- **Prediksi:** `TypeError` (lihat penjelasan di contoh).
- **Setengah jadi:** `kode` dan `int(baris["harga_satuan"])`. Hasil `"P01"` adalah `77500` (27500 + 50000); `"P02"` adalah `76000`; `"P03"` adalah `840000`.
- **Latihan 1:** empat faktur (`F002`, `F005`, `F007`, `F008`). Tambahkan `if total_baris(baris) >= 100000:` di dalam pengulangan.
- **Latihan 2:** `def rata_rata(daftar): return sum(total_baris(b) for b in daftar) / len(daftar)`; `print(f"{rata_rata(daftar_faktur):.1f}")` menghasilkan `124187.5`.
- **Latihan bercampur 1:** `ukuran(50000)` menghasilkan `kecil`, `ukuran(204000)` menghasilkan `besar`.
- **Petunjuk bila macet:** cetak `baris` dalam pengulangan untuk melihat kunci dan nilai teksnya.

## Langkah berikutnya

`DW-PKJ-M4`: Anda sudah bisa membaca satu tabel; berikutnya memfilter, mengelompokkan, dan menggabungkan dua tabel CSV.

## Catatan untuk pendamping

- **Waktu:** 5 jam. **Bahan:** Python 3, penyunting teks, terminal. Semua skrip dijalankan penulis dengan `python3 -I` (Python 3.12.3) dan keluarannya cocok.
- **Kebiasaan benih:** pastikan peserta mencatat benih; urutan angka acak dapat berbeda antar versi Python, karena itu isi `faktur.csv` dicantumkan di modul.
- **Tanda siap lanjut:** peserta menulis ulang pembaca CSV dari ingatan dan menjelaskan peran `int()`.
