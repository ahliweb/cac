## Untuk siapa modul ini

Modul ini untuk jalur **personal** (`PRS`), 5 jam, sesudah `DW-PRS-M4`. Anda perlu Python 3 (penulis memakai 3.12.3), penyunting teks, dan terminal. Hanya pustaka bawaan Python yang dipakai (`pathlib`, `sys`, `datetime`). Estimasi dua sesi `[asumsi]`.

Semua berkas dan angka di modul ini **rekaan**. Skrip yang mengganti nama berkas dapat merusak berkas yang tidak bisa dikembalikan, jadi jalankan hanya di folder latihan yang Anda buat sendiri dan **jangan pernah** mengarahkannya ke folder foto atau dokumen asli. Skrip anggaran memakai angka rekaan; jangan menaruh angka keuangan nyata di berkas latihan.

## Cek awal pengalaman

Jawab tanpa melihat apa pun, lalu cocokkan dengan kunci. Skor tidak dicatat.

1. Apa arti "uji coba" (*dry run*) pada skrip yang mengubah berkas?
2. Apa hasil `f"{3:03d}"`?
3. Apa hasil `(date(2026, 3, 1) - date(2026, 2, 1)).days`?
4. Apa hasil `{"a": 5}.get("b", 0) + 2`?
5. Mengapa skrip otomasi sebaiknya aman bila dijalankan dua kali berturut-turut?

Bila kelimanya benar, Anda boleh melewati "Contoh terselesaikan" dan "Contoh setengah jadi" dan langsung ke "Latihan".

## Ingat kembali

Tanpa melihat modul sebelumnya, tulis jawaban singkat.

1. (`DW-PRS-M4`) Apa beda HTML dan CSS, dan mengapa gaya dipisah ke berkas sendiri?
2. (`DW-PRS-M2`) Tulis dari ingatan perulangan `for` yang menjumlahkan semua anggota daftar `[70, 80, 90]` dan mencetak rata-ratanya.
3. (`DW-PRS-M3`) Mengapa `catatan.get("penulis", "tidak ada")` lebih aman daripada `catatan["penulis"]` bila kuncinya mungkin tidak ada?

Cocokkan: (1) HTML menandai arti dan isi, CSS mengatur tampilan; terpisah supaya satu berkas gaya dipakai banyak halaman dan mudah diubah; (2) `total = 0`, `for n in nilai: total += n`, `print(total / len(nilai))` (hasil `80.0`); (3) `.get` mengembalikan nilai cadangan, sedangkan kunci yang tidak ada pada `catatan[...]` menimbulkan `KeyError`.

## Tujuan

Setelah modul ini Anda dapat menulis skrip untuk menamai ulang berkas, menghitung anggaran, dan mengingatkan jadwal.

## Prediksi dulu

Sebuah folder latihan berisi `IMG_0003.jpg`, `IMG_0007.jpg`, dan `IMG_0012.jpg`. Skrip di bawah (lihat "Contoh terselesaikan") menamainya ulang menjadi `liburan-001.jpg` dan seterusnya. Sebelum membaca, tulis: (a) nama baru ketiganya, dan (b) apa yang tercetak dan berubah bila perintah terapkan dijalankan **untuk kedua kalinya**.

## Contoh terselesaikan

### Menamai ulang berkas: uji coba dulu

Pertama siapkan folder latihan dengan tiga berkas kosong (`siapkan.py`):

```python
from pathlib import Path

folder = Path("foto_latihan")
folder.mkdir(exist_ok=True)
for nomor in (7, 3, 12):
    (folder / f"IMG_{nomor:04d}.jpg").touch()
print(sorted(p.name for p in folder.iterdir()))
```

```text
['IMG_0003.jpg', 'IMG_0007.jpg', 'IMG_0012.jpg']
```

Lalu skrip penamaan (`rename.py`). Tanpa kata `--terapkan` skrip hanya **mencetak rencana**; berkas baru berubah hanya bila Anda menambahkannya:

```python
import sys
from pathlib import Path


def ubah_nama(folder, awalan, terapkan):
    """Ganti IMG_xxxx.jpg menjadi awalan-001.jpg dst; tanpa terapkan hanya mencetak rencana."""
    asli = sorted(folder.glob("IMG_*.jpg"))
    for urutan, berkas in enumerate(asli, start=1):
        baru = folder / f"{awalan}-{urutan:03d}.jpg"
        if baru.exists():
            print("LEWATI (sudah ada):", baru.name)
            continue
        print(berkas.name, "->", baru.name)
        if terapkan:
            berkas.rename(baru)


folder = Path("foto_latihan")
terapkan = "--terapkan" in sys.argv
ubah_nama(folder, "liburan", terapkan)
print("Mode:", "terapkan" if terapkan else "uji coba")
print(sorted(p.name for p in folder.iterdir()))
```

Jalankan `python3 rename.py` (uji coba), yang menghasilkan:

```text
IMG_0003.jpg -> liburan-001.jpg
IMG_0007.jpg -> liburan-002.jpg
IMG_0012.jpg -> liburan-003.jpg
Mode: uji coba
['IMG_0003.jpg', 'IMG_0007.jpg', 'IMG_0012.jpg']
```

Tidak ada berkas yang berubah. Bila rencananya benar, jalankan `python3 rename.py --terapkan`; barisnya sama, tetapi daftar akhir menjadi `['liburan-001.jpg', 'liburan-002.jpg', 'liburan-003.jpg']`. Menjalankan perintah terapkan **lagi** tidak mencetak apa pun selain `Mode: terapkan` dan daftar yang sama, karena tidak ada lagi berkas `IMG_*.jpg` (jawaban prediksi). Skrip ini aman diulang.

Bagian `if baru.exists()` mencegah menimpa berkas yang sudah ada. Penulis mencobanya dengan `liburan-002.jpg` yang sudah ada: skrip melewatinya (`LEWATI (sudah ada): liburan-002.jpg`), menamai dua berkas lain, dan membiarkan `IMG_0007.jpg` apa adanya. Skrip tidak memutuskan sendiri; Anda yang memeriksa dan memutuskan. Pemakaian `pathlib` dijelaskan di [dokumentasi resmi](https://docs.python.org/3/library/pathlib.html).

### Menghitung anggaran

Skrip menjumlahkan pengeluaran per kategori dengan kamus lalu membandingkan dengan batas (`anggaran.py`; angka rekaan):

```python
batas = {"makan": 600000, "transport": 200000, "hiburan": 150000}

pengeluaran = [
    ("makan", 250000),
    ("transport", 90000),
    ("hiburan", 80000),
    ("makan", 380000),
    ("hiburan", 90000),
]

terpakai = {}
for kategori, jumlah in pengeluaran:
    terpakai[kategori] = terpakai.get(kategori, 0) + jumlah

for kategori, nilai_batas in batas.items():
    pakai = terpakai.get(kategori, 0)
    sisa = nilai_batas - pakai
    tanda = "LEBIH" if sisa < 0 else "aman"
    print(f"{kategori:<10}{pakai:>9}{sisa:>10}  {tanda}")
```

```text
makan        630000    -30000  LEBIH
transport     90000    110000  aman
hiburan      170000    -20000  LEBIH
```

Pola `terpakai.get(kategori, 0) + jumlah` adalah cara memulai penjumlahan dari nol untuk kunci baru. Pada rumus `f"{kategori:<10}"`, `<10` meratakan teks ke kiri selebar 10 karakter dan `>9` ke kanan selebar 9 ([dokumentasi format](https://docs.python.org/3/tutorial/inputoutput.html)).

### Mengingatkan jadwal

Skrip menghitung selisih hari ke tiap tanggal (`pengingat.py`). Tanggal "hari ini" dibuat **tetap** supaya keluarannya sama saat Anda mencoba; untuk memakai tanggal sungguhan ganti dengan `date.today()`:

```python
from datetime import date

# Untuk uji, tanggal hari ini dibuat tetap agar keluaran sama setiap kali.
# Pakai date.today() bila ingin tanggal sungguhan.
hari_ini = date(2026, 11, 19)

jadwal = [
    ("Siram tanaman", date(2026, 11, 21)),
    ("Bayar langganan (contoh)", date(2026, 11, 19)),
    ("Servis sepeda", date(2026, 12, 5)),
    ("Kembalikan buku", date(2026, 11, 17)),
]

for nama, tanggal in sorted(jadwal, key=lambda butir: butir[1]):
    selisih = (tanggal - hari_ini).days
    if selisih < 0:
        keterangan = f"terlewat {-selisih} hari"
    elif selisih == 0:
        keterangan = "hari ini"
    else:
        keterangan = f"{selisih} hari lagi"
    print(f"{tanggal.isoformat()}  {nama}: {keterangan}")
```

```text
2026-11-17  Kembalikan buku: terlewat 2 hari
2026-11-19  Bayar langganan (contoh): hari ini
2026-11-21  Siram tanaman: 2 hari lagi
2026-12-05  Servis sepeda: 16 hari lagi
```

Selisih dua tanggal (`date - date`) adalah objek `timedelta`; `.days` memberi jumlah harinya ([dokumentasi `datetime`](https://docs.python.org/3/library/datetime.html)). Skrip ini **hanya mencetak**: ia tidak mengirim pesan atau berjalan sendiri. Agar muncul tiap pagi, Anda menjalankannya sendiri atau memakai penjadwal sistem Anda, yang di luar modul ini.

## Contoh setengah jadi

Lengkapi tiga titik `___` agar program memberi peringatan bila tenggat tinggal tiga hari atau kurang:

```python setengah-jadi
from datetime import date

hari_ini = date(2026, 11, 19)
tenggat = date(2026, 11, 25)
selisih = (___ - ___).days
if selisih ___ 3:
    print("Segera!")
else:
    print("Masih lama:", selisih, "hari")
```

Prediksi dulu keluarannya. Kerangka berlubang bukan program yang berjalan sampai Anda mengisinya.

## Latihan

1. **Ubah.** Tambahkan pengeluaran `("transport", 130000)` ke skrip anggaran. Prediksi dulu baris `transport`, lalu jalankan.
2. **Buat.** Tambahkan kolom persen terpakai pada skrip anggaran (pembulatan ke bawah dengan `//`, misalnya `pakai * 100 // nilai_batas`). Prediksi dulu persen untuk `makan`.
3. **Jelaskan.** Mengapa `rename.py` mencetak rencana dulu, dan apa yang bisa salah bila langsung menamai ulang? Beri satu contoh kejadian di folder latihan Anda sendiri.
4. **Buat.** Ubah `rename.py` agar awalannya bisa diganti dari baris perintah (mis. `python3 rename.py pantai`), dengan awalan `liburan` bila tidak diberikan. Petunjuk: `sys.argv` adalah daftar kata di baris perintah.
5. **Berpasangan (opsional).** Tukar skrip dengan rekan; masing-masing mencari satu situasi di folder latihan yang membuat skrip rekan salah menamai atau menimpa berkas. Peserta mandiri boleh mengujinya sendiri.

## Latihan bercampur

1. (`DW-PRS-M3`) Simpan jadwal dari `pengingat.py` ke berkas teks berbaris `nama|tanggal`, lalu baca kembali memakai fungsi `muat` yang serupa dengan modul sebelumnya (`date.fromisoformat` mengubah teks menjadi tanggal). Mengapa tanggal harus diubah dari teks sebelum dikurangkan?
2. (`DW-PRS-M2`) Tulis kalkulator kecil yang membaca batas dan pengeluaran dari `input()` dan mencetak `aman` atau `LEBIH`. Prediksi hasil untuk batas `150000` dan pengeluaran `170000`.

## Keluaran portofolio

**Satu skrip yang berguna.** Satu skrip untuk urusan Anda sendiri (mis. penamaan berkas, anggaran, atau pengingat) yang punya mode uji coba bila mengubah berkas, aman dijalankan dua kali, dan memakai hanya data rekaan di folder latihan. Sertakan komentar atas: tanggal, versi Python, dan cara menjalankan.

## Ulang berjarak

Tanpa melihat modul ini, kerjakan ulang dan cocokkan. Pertanyaan ini akan muncul lagi di "Ingat kembali" modul berikutnya.

| Kapan | Pertanyaan |
| --- | --- |
| Satu minggu lagi (modul berikutnya) | Mengapa skrip yang mengubah berkas perlu mode uji coba dan aman dijalankan dua kali? |
| Awal modul jalur lanjut | Tulis dari ingatan kerangka skrip yang menjumlahkan pengeluaran per kategori dengan kamus dan `.get`. |
| Akhir jalur | Apa yang kita periksa sebelum menjalankan skrip yang mengubah atau menghapus berkas? |

## Kebijakan AI

Modul ini tidak memakai asisten AI; kebijakan lengkap program ada di `DW-FND-M1` dan dipakai penuh pada `DW-PKJ-M6`, `DW-PRO-M13`, dan `DW-BIS-M7` (silabus bagian 9.1).

## Kesalahan umum

- **Langsung menjalankan perintah yang mengubah berkas.** Selalu uji coba dulu, di folder latihan.
- **Folder yang salah.** Python bekerja di folder tempat terminal dijalankan; periksa dengan `pwd` (atau `cd`) sebelum menerapkan.
- **Menimpa berkas yang sudah ada.** Periksa dulu apakah nama tujuan ada.
- **Menghitung selisih tanggal dari teks.** `"2026-11-21" - "2026-11-19"` galat; ubah menjadi `date` dulu.
- **Mengira skrip pengingat mengirim pesan.** Skrip di modul ini hanya mencetak.

## Cek mandiri

Tutup modul dan jawab:

1. Mengapa skrip penamaan punya mode uji coba?
2. Tulis dari ingatan pola menjumlahkan per kategori dengan kamus.
3. Bagaimana menghitung berapa hari lagi sampai suatu tanggal?

Daftar periksa (kosong; Anda isi sendiri, tidak dikumpulkan):

- [ ] Skrip saya diuji coba lebih dulu dan hanya berjalan di folder latihan.
- [ ] Skrip aman dijalankan dua kali.
- [ ] Saya menulis prediksi sebelum menjalankan.
- [ ] Hanya data rekaan di folder latihan.

## Kunci dan petunjuk

- **Cek awal:** (1) skrip hanya mencetak rencana tanpa mengubah apa pun; (2) `'003'`; (3) `28`; (4) `2`; (5) karena menjalankannya lagi tidak boleh merusak atau menggandakan hasil.
- **Prediksi:** (a) `liburan-001.jpg`, `liburan-002.jpg`, `liburan-003.jpg` (urut menurut nama berkas asli); (b) tidak ada baris nama yang tercetak dan tidak ada yang berubah.
- **Setengah jadi:** `tenggat`, `hari_ini`, dan `<=`; keluarannya `Masih lama: 6 hari`.
- **Latihan 1:** `transport` terpakai `220000`, sisa `-20000`, `LEBIH`.
- **Latihan 2:** `makan` `105` persen (`630000 * 100 // 600000`); `transport` `110` bila Latihan 1 dikerjakan; `hiburan` `113`.
- **Latihan 3:** bila ada berkas bernama sama atau urutan nomor tidak seperti dugaan, berkas lama tertimpa; uji coba memperlihatkannya lebih dulu.
- **Latihan 4:** `awalan = sys.argv[1] if len(sys.argv) > 1 and not sys.argv[1].startswith("--") else "liburan"`.
- **Latihan bercampur 1:** teks tidak bisa dikurangkan; `date.fromisoformat("2026-11-21")` mengubahnya menjadi `date`.
- **Latihan bercampur 2:** `LEBIH`, karena `170000 > 150000`.
- **Petunjuk bila macet:** cetak `asli` dan `baru` sebelum memanggil `rename` untuk melihat rencana.

## Langkah berikutnya

`DW-PRS-M6`: modul terakhir jalur. Anda merancang, membangun, dan menjelaskan satu proyek mandiri, lalu memilih jalur belajar lanjut.

## Catatan untuk pendamping

- **Waktu:** 5 jam. **Bahan:** Python 3, penyunting teks, terminal, folder latihan kosong. Semua skrip dijalankan penulis dengan `python3 -I` (Python 3.12.3), termasuk uji coba, penerapan, pengulangan penerapan, dan tabrakan nama; keluarannya cocok dengan yang tertulis.
- **Tanda siap lanjut:** peserta menjalankan uji coba sebelum menerapkan dan menjelaskan mengapa nama tujuan diperiksa.
- **Keselamatan:** pastikan peserta menjalankan skrip hanya di folder latihan; kehilangan berkas akibat salah folder tidak bisa dibatalkan. Skrip bukan pengganti cadangan.
