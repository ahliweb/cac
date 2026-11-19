## Untuk siapa modul ini

Modul ini untuk jalur **pekerja** (`PKJ`), 5 jam, sesudah `DW-PKJ-M4`. Alatnya Python 3 (penulis memakai 3.12.3), penyunting teks, dan terminal. Hanya pustaka bawaan Python yang dipakai (`pathlib`, `csv`, `collections`, `shutil`, `random`). Estimasi dua sesi `[asumsi]`.

Semua berkas di modul ini **sintetis** dan dibangkitkan skrip dari benih acak yang dicatat. Jalankan skrip hanya di folder latihan yang Anda buat sendiri, jangan di folder kerja. Skrip yang mengganti nama atau memindahkan berkas bisa merusak berkas yang tidak bisa dikembalikan; karena itu modul ini mengajarkan uji coba lebih dulu.

## Cek awal pengalaman

Jawab tanpa melihat apa pun, lalu cocokkan dengan kunci. Skor tidak dicatat.

1. Apa hasil `Path("laporan") / "mei.csv"`?
2. Apa yang terjadi bila `Path.rename` diarahkan ke nama berkas yang sudah ada di Linux atau macOS?
3. Apa arti "uji coba" (*dry run*) pada skrip yang mengubah berkas?
4. Tulis ekspresi yang memberi semua berkas berakhiran `.csv` dalam `folder`, urut menurut nama.
5. Mengapa skrip otomasi sebaiknya aman bila dijalankan dua kali berturut-turut?

Bila kelimanya benar, Anda boleh melewati "Contoh terselesaikan" dan "Contoh setengah jadi" dan langsung ke "Latihan".

## Ingat kembali

Tanpa melihat modul sebelumnya, tulis jawaban singkat.

1. (`DW-PKJ-M4`) Apa itu `defaultdict(int)` dan kapan Anda memakainya?
2. (`DW-PKJ-M2`) Mengapa hasil pembersihan ditaruh di kolom atau berkas baru, bukan menimpa data asli?
3. (`DW-PKJ-M1`) Sebutkan empat pertanyaan kelayakan otomasi.

Cocokkan: (1) kamus yang kunci barunya otomatis bernilai 0, dipakai untuk menjumlahkan per kelompok dengan `+=`; (2) data asli tetap utuh sehingga kesalahan bisa diulang dari awal dan hasil bisa dibandingkan; (3) seberapa sering, berapa lama sekali kerja, apakah aturannya bisa ditulis tegas, dan apa akibat bila salah atau adakah data sensitif.

## Tujuan

Setelah modul ini Anda dapat membuat laporan bulanan otomatis (CSV ke ringkasan) dan mengganti nama berkas secara massal pada folder sintetis.

## Prediksi dulu

Sebuah folder sintetis berisi tiga berkas bernama `rekap-maret-2026.csv`, `Rekap_April_2026.csv`, dan `REKAP MEI 2026.csv`. Skrip akan menamai ulang semuanya menjadi `TTTT-BB.csv` (tahun, tanda hubung, bulan dua angka). Sebelum membaca, tulis: (a) nama baru ketiganya, (b) apa yang tercetak bila skrip yang sama dijalankan untuk kedua kalinya, dan (c) apa yang sebaiknya terjadi bila dua berkas akan mendapat nama baru yang sama.

## Contoh terselesaikan

### Membangkitkan folder latihan

Skrip pertama membuat tiga berkas penjualan kecil dengan benih tetap, ditambah satu baris rusak sengaja (`n/a` sebagai jumlah) di berkas Mei.

```python
import csv
import random
from pathlib import Path

BENIH = 20261119  # dicatat: benih acak tetap
acak = random.Random(BENIH)

NAMA_BERKAS = [
    "rekap-maret-2026.csv",
    "Rekap_April_2026.csv",
    "REKAP MEI 2026.csv",
]
KODE = ["P01", "P02", "P03", "P04"]
HARGA = {"P01": 2500, "P02": 4000, "P03": 1500, "P04": 2000}

folder = Path("laporan_masuk")
folder.mkdir(exist_ok=True)
for nama in NAMA_BERKAS:
    with open(folder / nama, "w", newline="", encoding="utf-8") as berkas:
        penulis = csv.writer(berkas)
        penulis.writerow(["kode_produk", "jumlah", "harga"])
        for _ in range(5):
            kode = acak.choice(KODE)
            penulis.writerow([kode, acak.randint(1, 20), HARGA[kode]])

# Satu baris rusak sengaja, untuk melatih penanganan galat.
with open(folder / "REKAP MEI 2026.csv", "a", newline="", encoding="utf-8") as berkas:
    csv.writer(berkas).writerow(["P02", "n/a", 4000])
```

### Ganti nama massal yang aman

Skrip kedua mengenali bulan dan tahun dari nama lama, **hanya mencetak rencana** kecuali Anda menambahkan `--terapkan`, dan berhenti sama sekali bila ada nama tujuan ganda atau sudah ada. Pemeriksaan terakhir itu perlu karena di Linux dan macOS `Path.rename` mengganti berkas tujuan secara diam-diam ([dokumentasi `pathlib`](https://docs.python.org/3/library/pathlib.html)).

```python
import re
import sys
from pathlib import Path

BULAN = {
    "januari": 1, "februari": 2, "maret": 3, "april": 4, "mei": 5, "juni": 6,
    "juli": 7, "agustus": 8, "september": 9, "oktober": 10, "november": 11,
    "desember": 12,
}


def nama_baru(nama_berkas):
    """Kembalikan 'TTTT-BB.csv', atau None bila nama tidak dikenali."""
    bagian = re.split(r"[ _-]+", Path(nama_berkas).stem.lower())
    bulan = next((BULAN[b] for b in bagian if b in BULAN), None)
    tahun = next((b for b in bagian if re.fullmatch(r"\d{4}", b)), None)
    if bulan is None or tahun is None:
        return None
    return f"{tahun}-{bulan:02d}.csv"


def rencana(folder):
    hasil, dilewati = [], []
    for lama in sorted(folder.glob("*.csv")):
        baru = nama_baru(lama.name)
        if baru is None or baru == lama.name:
            dilewati.append(lama.name)
        else:
            hasil.append((lama, folder / baru))
    return hasil, dilewati


def main():
    folder = Path("laporan_masuk")
    terapkan = "--terapkan" in sys.argv
    hasil, dilewati = rencana(folder)
    tujuan = [baru for _, baru in hasil]
    if len(set(tujuan)) != len(tujuan) or any(b.exists() for b in tujuan):
        print("BERHENTI: ada nama tujuan ganda atau sudah ada; tidak ada yang diubah.")
        return
    for lama, baru in hasil:
        print(f"{lama.name} -> {baru.name}")
        if terapkan:
            lama.rename(baru)
    print(f"dilewati: {dilewati}")
    print("sudah diterapkan" if terapkan else "uji coba saja (tambahkan --terapkan)")


main()
```

Jalankan dulu tanpa `--terapkan` (dengan `python3 -I ganti_nama.py`). Keluarannya (Python 3.12.3):

```text
REKAP MEI 2026.csv -> 2026-05.csv
Rekap_April_2026.csv -> 2026-04.csv
rekap-maret-2026.csv -> 2026-03.csv
dilewati: []
uji coba saja (tambahkan --terapkan)
```

Setelah rencana terlihat benar, jalankan dengan `--terapkan`. Menjalankannya lagi menghasilkan `dilewati: ['2026-03.csv', '2026-04.csv', '2026-05.csv']`: nama yang sudah benar tidak disentuh lagi, jadi skrip aman diulang. Bila dua berkas, misalnya `rekap-maret-2026.csv` dan `Rekap_Maret_2026.csv`, menghasilkan nama tujuan sama, skrip mencetak `BERHENTI` dan tidak mengubah apa pun.

### Laporan bulanan

Skrip ketiga membaca setiap `TTTT-BB.csv`, menjumlahkan nilai (jumlah dikali harga), mencari produk terlaris, dan menulis `laporan.csv`. Baris yang tidak bisa dibaca **dicatat**, bukan membuat skrip berhenti atau dibuang diam-diam.

```python
import csv
from collections import defaultdict
from pathlib import Path

folder = Path("laporan_masuk")
baris_laporan = []
catatan = []

for berkas in sorted(folder.glob("????-??.csv")):
    total = 0
    unit = defaultdict(int)
    with open(berkas, newline="", encoding="utf-8") as isi:
        for nomor, baris in enumerate(csv.DictReader(isi), start=2):
            try:
                jumlah = int(baris["jumlah"])
                harga = int(baris["harga"])
            except ValueError:
                catatan.append(f"{berkas.name} baris {nomor}: dilewati ({baris['jumlah']})")
                continue
            total += jumlah * harga
            unit[baris["kode_produk"]] += jumlah
    terlaris = max(sorted(unit), key=lambda kode: unit[kode])
    baris_laporan.append([berkas.stem, total, terlaris])

with open("laporan.csv", "w", newline="", encoding="utf-8") as keluar:
    penulis = csv.writer(keluar)
    penulis.writerow(["bulan", "total", "produk_terlaris"])
    penulis.writerows(baris_laporan)

for baris in baris_laporan:
    print(baris)
print("catatan:", catatan)
```

Keluarannya:

```text
['2026-03', 113000, 'P04']
['2026-04', 73500, 'P04']
['2026-05', 123500, 'P01']
catatan: ['2026-05.csv baris 7: dilewati (n/a)']
```

Periksa dengan hitungan tangan untuk Mei: 8 x 2500 = 20000, 16 x 4000 = 64000, 6 x 2500 = 15000, 13 x 1500 = 19500, 2 x 2500 = 5000; jumlahnya 123500, sama dengan laporan. Pada Mei, `P01` dan `P02` sama-sama terjual 16 unit; karena daftar kode diurutkan dulu, `max` mengambil yang pertama (`P01`). Hasil seri seperti ini harus Anda putuskan sendiri aturannya, bukan dibiarkan kebetulan.

## Contoh setengah jadi

Tambahkan pemeriksaan berkas kosong. Lengkapi satu titik `___`, lalu jalankan:

```python setengah-jadi
for berkas in sorted(folder.glob("*.csv")):
    if berkas.stat().st_size ___ 0:
        print("kosong:", berkas.name)
```

Prediksi dulu: apa yang tercetak pada folder di atas sebelum Anda membuat berkas `kosong.csv` dengan `Path("laporan_masuk/kosong.csv").touch()`?

## Latihan

1. **Ubah.** Jalankan `nama_baru("rekap-juni.csv")` dan `nama_baru("Rekap Juni 2026 (final).csv")`. Prediksi dulu hasil keduanya, lalu jelaskan mengapa berkas pertama masuk daftar `dilewati`.
2. **Buat.** Tambahkan kolom `baris_dilewati` ke `laporan.csv` (jumlah baris rusak per bulan).
3. **Jelaskan.** Mengapa ada uji coba lebih dulu, dan mengapa skrip memeriksa nama tujuan yang sudah ada sebelum mengganti nama apa pun?
4. **Buat.** Salin `laporan.csv` (bukan memindahkannya) ke folder `arsip/` dengan nama `laporan-<bulan terakhir>.csv`, memakai `shutil.copy`. Periksa isi folder `arsip`.
5. **Berpasangan (opsional).** Tukar folder dengan rekan yang menaruh satu berkas bernama aneh; periksa apakah skrip pasangan Anda mencatatnya di `dilewati` dan tidak merusaknya. Peserta mandiri boleh melewati tugas ini.

## Latihan bercampur

1. (`DW-PKJ-M4`) Ubah `laporan.py` agar total tiap bulan dikelompokkan menurut kategori produk dari `produk.csv` modul sebelumnya; kode yang tidak ada di tabel produk dicatat sebagai yatim.
2. (`DW-PKJ-M2`) Di LibreOffice Calc, fungsi apa yang setara dengan "jumlah per kelompok" dan "cari nilai terbesar"? Sebut dua fungsi dan satu kekurangan pekerjaan manual dibanding skrip ini.

## Keluaran portofolio

**Skrip laporan bulanan.** Simpan skrip pembangkit, skrip ganti nama (dengan uji coba), skrip laporan, `laporan.csv` hasilnya, dan catatan tiga kalimat tentang cara skrip menangani baris rusak, nama ganda, dan hasil seri. Seluruhnya data sintetis.

## Ulang berjarak

Tanpa melihat modul ini, kerjakan ulang dan cocokkan. Pertanyaan ini akan muncul lagi di "Ingat kembali" modul berikutnya.

| Kapan | Pertanyaan |
| --- | --- |
| Satu minggu lagi (modul berikutnya) | Mengapa skrip yang mengubah berkas harus punya uji coba dan aman dijalankan dua kali? |
| Tiga modul lagi | Apa yang dilakukan skrip laporan terhadap baris yang tidak bisa dibaca, dan mengapa tidak dibuang diam-diam? |
| Akhir jalur | Tulis dari ingatan kerangka skrip yang membaca semua CSV di folder, menjumlahkan per bulan, dan mencatat baris rusak. |

## Kebijakan AI

Modul ini tidak memakai asisten AI; kebijakan lengkap program ada di `DW-FND-M1` dan dipakai penuh pada `DW-PKJ-M6` (silabus bagian 9.1).

## Kesalahan umum

- **Langsung menerapkan tanpa uji coba.** Pada berkas nyata, kesalahan nama tidak bisa dibatalkan.
- **Menganggap `rename` melindungi berkas tujuan.** Di Linux dan macOS ia menimpa diam-diam.
- **Menjalankan skrip di folder kerja, bukan folder latihan.**
- **Membuang baris rusak tanpa catatan.** Total tampak benar padahal data hilang.
- **Membiarkan hasil seri ditentukan kebetulan.** Tulis aturannya (misalnya urut kode) di dokumentasi skrip.

## Cek mandiri

Tutup modul dan jawab:

1. Tiga ciri skrip ganti nama yang aman.
2. Apa beda `Path.rename` dan `shutil.copy` terhadap berkas asal?
3. Bagaimana Anda memeriksa bahwa total laporan benar tanpa mempercayai skrip?

Daftar periksa (kosong; Anda isi sendiri, tidak dikumpulkan):

- [ ] Skrip saya punya uji coba dan baru mengubah berkas bila diminta.
- [ ] Skrip berhenti bila nama tujuan ganda atau sudah ada.
- [ ] Baris rusak dicatat, dan saya mencocokkan satu total dengan hitungan tangan.
- [ ] Hanya folder sintetis yang saya sentuh.

## Kunci dan petunjuk

- **Cek awal:** (1) `Path("laporan/mei.csv")`; (2) berkas tujuan diganti diam-diam (dokumentasi `pathlib`); (3) skrip hanya menampilkan apa yang akan diubah tanpa mengubahnya; (4) `sorted(folder.glob("*.csv"))`; (5) agar ulangan tidak merusak, mengganda, atau mengubah ulang hasil yang sudah benar.
- **Prediksi:** (a) `2026-03.csv`, `2026-04.csv`, `2026-05.csv`; (b) semuanya tercetak di `dilewati` dan tidak ada yang diubah; (c) berhenti sebelum mengubah apa pun dan melapor.
- **Setengah jadi:** `==`; sebelum `kosong.csv` dibuat tidak tercetak apa-apa, sesudahnya tercetak `kosong: kosong.csv`.
- **Latihan 1:** `None`, karena tidak ada tahun, sehingga masuk `dilewati`; `2026-06.csv` untuk nama kedua (kata `(final)` diabaikan).
- **Latihan 2:** `baris_dilewati` bernilai 0, 0, dan 1 untuk Maret, April, dan Mei.
- **Latihan 3:** uji coba memperlihatkan rencana sebelum ada yang berubah; pemeriksaan tujuan mencegah berkas tertimpa diam-diam, dan dilakukan sebelum mengganti apa pun supaya tidak ada perubahan setengah jalan.
- **Latihan 4:** `arsip/laporan-2026-05.csv`; berkas asal tetap ada.
- **Latihan bercampur 2:** `SUMIF` untuk jumlah per kelompok dan `MAX` untuk nilai terbesar; kekurangan kerja manual: harus diulang tiap bulan dan mudah salah pilih sel.
- **Petunjuk bila macet:** cetak `rencana(folder)` sebelum `main()` dan baca pasangan lama dan baru satu per satu.

## Langkah berikutnya

`DW-PKJ-M6`: skrip Anda sudah mengotomasi satu alur; berikutnya Anda belajar meminta draf rumus atau skrip dari asisten AI, lalu **memeriksa dan mengujinya** sebelum dipakai.

## Catatan untuk pendamping

- **Waktu:** 5 jam. **Bahan:** Python 3, penyunting teks, terminal, folder latihan kosong. Skrip dijalankan penulis dengan `python3 -I` (Python 3.12.3) dan keluarannya cocok dengan yang tertulis.
- **Tanda siap lanjut:** peserta menjalankan uji coba sebelum menerapkan, dan menjelaskan mengapa nama tujuan diperiksa lebih dulu.
- **Keselamatan:** pastikan peserta menjalankan skrip hanya di folder latihan; kehilangan berkas akibat salah folder tidak bisa dibatalkan. Skrip bukan pengganti cadangan.
