## Untuk siapa modul ini

Modul ini untuk jalur **pekerja** (`PKJ`), 5 jam, sesudah `DW-PKJ-M7`. Ini **proyek akhir**: Anda mengotomasi satu alur kerja kantor sintetis dari awal sampai akhir dan mendokumentasikannya. Alatnya Python 3 (penulis memakai 3.12.3), penyunting teks, dan terminal; hanya pustaka bawaan Python. Estimasi dua sesi `[asumsi]`.

Proyek contoh: **rekap absensi dan lembur** untuk tiga karyawan rekaan (`Karyawan Contoh A`, `B`, `C`). Seluruh data sintetis dan dibangkitkan skrip dari benih acak yang dicatat. Aturan lembur di sini adalah aturan latihan, **bukan** aturan ketenagakerjaan atau penggajian; jangan memakainya untuk menghitung hak orang sungguhan. Anda boleh mengganti alur dengan alur lain dari peta tugas `DW-PKJ-M1` (misalnya rekap faktur), asal datanya sintetis.

## Cek awal pengalaman

Jawab tanpa melihat apa pun, lalu cocokkan dengan kunci. Skor tidak dicatat.

1. Apa beda baris "yatim" dan baris "rusak" saat mengolah tabel?
2. Mengapa skrip diuji dengan data yang sengaja berisi baris buruk?
3. Apa yang dicapai pernyataan "masuk = dihitung + perlu dicek"?
4. Sebut empat hal minimal dalam dokumentasi skrip untuk orang lain.
5. Sebut tiga hal yang tidak boleh ada di folder proyek latihan.

Bila kelimanya benar, Anda boleh melewati "Contoh terselesaikan" dan "Contoh setengah jadi" dan langsung ke "Latihan".

## Ingat kembali

Tanpa melihat modul sebelumnya, tulis jawaban singkat.

1. (`DW-FND-M1`) Tinjau proyek akhir Anda terhadap daftar periksa privasi: data apa yang nyata, di mana kredensial, dan apa yang Anda lakukan sebelum menempel teks ke asisten AI?
2. (`DW-PKJ-M1`) Hitung titik impas satu tugas (jam membuat otomasi dibagi jam hemat per bulan) dan sebut satu hal yang tidak dihitung rumus itu.
3. (`DW-PKJ-M2`) Pilih satu rumus pencarian dari proyek Anda dan jelaskan apa yang terjadi bila nilai yang dicari tidak ada.
4. (`DW-PKJ-M3`) Tulis dari ingatan kerangka membaca CSV dengan `csv.DictReader`.
5. (`DW-PKJ-M4`) Tulis kerangka menggabung dua tabel dan menangani kunci yatim (kunci yang tidak ada di tabel acuan).

Cocokkan: (1) tidak ada data nyata (semua sintetis); kredensial tidak di berkas kode maupun permintaan AI; sebelum menempel teks, hapus atau ganti data pribadi dan rahasia, atau tidak menempel sama sekali; (2) jam membuat otomasi / jam hemat per bulan; yang tidak dihitung: waktu perawatan dan belajar alat; (3) `VLOOKUP` menghasilkan `#N/A`, dan `IFERROR` dapat menggantinya dengan teks seperti "tidak ditemukan"; (4) `with open(nama, newline="", encoding="utf-8") as berkas:` lalu `for baris in csv.DictReader(berkas):`; (5) ubah tabel acuan menjadi kamus berkunci, cari dengan `.get`, dan catat kunci yang menghasilkan `None`.

## Tujuan

Setelah modul ini Anda dapat mengotomasi satu alur kerja kantor sintetis dari awal sampai akhir dengan dokumentasi.

## Prediksi dulu

Tiga baris absensi sintetis (masuk dan keluar `HH:MM`). Anggap hari kerja normal 8 jam (480 menit); kelebihannya adalah lembur.

| kode | tanggal | masuk | keluar |
| --- | --- | --- | --- |
| K01 | 2026-03-02 | 08:00 | 17:30 |
| K02 | 2026-03-02 | 07:45 | 15:45 |
| K03 | 2026-03-02 | 08:10 | (kosong) |

Sebelum membaca, tulis: menit kerja dan menit lembur tiap baris, dan baris mana yang tidak boleh ikut dihitung.

## Contoh terselesaikan

### Rancangan alur

Alur: **masukan** (`karyawan.csv`, `absensi.csv`) -> **bersihkan** (kode dirapikan `.strip().upper()`) -> **periksa** (kode dikenal? jam keluar ada dan setelah masuk?) -> **hitung** (jam kerja dan lembur per karyawan) -> **keluaran** (`rekap.csv`) -> **dokumentasi dan pemeriksaan**. Baris bermasalah tidak dibuang diam-diam; ia dicatat untuk dicek manusia.

### Pembangkit data

```python
import csv
import random

acak = random.Random(20261119)  # benih acak dicatat
KARYAWAN = [("K01", "Karyawan Contoh A"), ("K02", "Karyawan Contoh B"), ("K03", "Karyawan Contoh C")]


def hhmm(menit):
    return f"{menit // 60:02d}:{menit % 60:02d}"


baris = []
for hari in range(1, 6):
    for kode, _ in KARYAWAN:
        masuk = 465 + acak.randrange(0, 46, 15)  # 07:45 sampai 08:30
        keluar = 990 + acak.randrange(0, 151, 15)  # 16:30 sampai 19:00
        baris.append((kode, f"2026-03-{hari:02d}", hhmm(masuk), hhmm(keluar)))

# Tiga baris bermasalah yang sengaja ditambahkan.
baris.append((" k02 ", "2026-03-06", "08:00", ""))
baris.append(("K99", "2026-03-06", "08:00", "17:00"))
baris.append(("K01", "2026-03-06", "17:00", "08:00"))

with open("karyawan.csv", "w", newline="", encoding="utf-8") as berkas:
    penulis = csv.writer(berkas)
    penulis.writerow(["kode", "nama"])
    penulis.writerows(KARYAWAN)

with open("absensi.csv", "w", newline="", encoding="utf-8") as berkas:
    penulis = csv.writer(berkas)
    penulis.writerow(["kode", "tanggal", "masuk", "keluar"])
    penulis.writerows(baris)
```

### Skrip alur

```python
import csv
from collections import defaultdict

BATAS_NORMAL = 8 * 60  # aturan latihan ini, bukan aturan ketenagakerjaan


def menit(teks):
    jam, mnt = teks.split(":")
    return int(jam) * 60 + int(mnt)


def hitung_hari(masuk, keluar):
    """Kembalikan (menit kerja, menit lembur); ValueError bila tidak masuk akal."""
    selisih = menit(keluar) - menit(masuk)
    if selisih <= 0:
        raise ValueError("keluar tidak setelah masuk")
    return selisih, max(0, selisih - BATAS_NORMAL)


def uji_cepat():
    assert menit("08:30") == 510
    assert hitung_hari("08:00", "17:00") == (540, 60)
    assert hitung_hari("08:00", "15:00") == (420, 0)
    try:
        hitung_hari("17:00", "08:00")
    except ValueError:
        pass
    else:
        raise AssertionError("harus ValueError")
    print("uji cepat lolos")


def baca_csv(nama_berkas):
    with open(nama_berkas, newline="", encoding="utf-8") as berkas:
        return list(csv.DictReader(berkas))


def proses():
    nama = {k["kode"]: k["nama"] for k in baca_csv("karyawan.csv")}
    hari = defaultdict(int)
    kerja = defaultdict(int)
    lembur = defaultdict(int)
    perlu_dicek = []
    baris_absensi = baca_csv("absensi.csv")
    for nomor, b in enumerate(baris_absensi, start=2):
        kode = b["kode"].strip().upper()
        if kode not in nama:
            perlu_dicek.append(f"baris {nomor}: kode tidak dikenal ({kode})")
            continue
        if not b["keluar"]:
            perlu_dicek.append(f"baris {nomor}: jam keluar kosong ({kode})")
            continue
        try:
            menit_kerja, menit_lembur = hitung_hari(b["masuk"], b["keluar"])
        except ValueError as galat:
            perlu_dicek.append(f"baris {nomor}: {galat} ({kode})")
            continue
        hari[kode] += 1
        kerja[kode] += menit_kerja
        lembur[kode] += menit_lembur
    dihitung = sum(hari.values())
    assert len(baris_absensi) == dihitung + len(perlu_dicek), "ada baris yang hilang"
    with open("rekap.csv", "w", newline="", encoding="utf-8") as keluar:
        penulis = csv.writer(keluar)
        penulis.writerow(["nama", "hari_kerja", "jam_kerja", "jam_lembur"])
        for kode in sorted(hari):
            penulis.writerow([nama[kode], hari[kode], round(kerja[kode] / 60, 2), round(lembur[kode] / 60, 2)])
    print(f"masuk {len(baris_absensi)} = dihitung {dihitung} + perlu dicek {len(perlu_dicek)}")
    for catatan in perlu_dicek:
        print(catatan)


uji_cepat()
proses()
```

Jalankan `python3 -I bangkit.py` lalu `python3 -I alur.py`. Keluarannya (Python 3.12.3):

```text
uji cepat lolos
masuk 18 = dihitung 15 + perlu dicek 3
baris 17: jam keluar kosong (K02)
baris 18: kode tidak dikenal (K99)
baris 19: keluar tidak setelah masuk (K01)
```

`rekap.csv` berisi:

```text
nama,hari_kerja,jam_kerja,jam_lembur
Karyawan Contoh A,5,48.25,8.25
Karyawan Contoh B,5,47.0,7.0
Karyawan Contoh C,5,51.0,11.0
```

Periksa satu angka dengan tangan, `Karyawan Contoh A`: lima hari berdurasi 600, 555, 570, 555, dan 615 menit berjumlah 2895 menit = 48,25 jam; kelebihan di atas 480 per hari 120, 75, 90, 75, dan 135 menit berjumlah 495 menit = 8,25 jam. Kunci `" k02 "` yang berspasi dan huruf kecil tetap dikenali setelah dirapikan; tanpa `.strip().upper()` ia jatuh sebagai kunci yatim.

### Dokumentasi

Dokumentasi untuk orang lain (dan Anda sendiri tiga bulan lagi) cukup satu berkas pendek:

```text
# Rekap absensi dan lembur (data sintetis)
Tujuan: menjumlahkan jam kerja dan lembur per karyawan dari absensi.
Cara menjalankan: python3 -I bangkit.py, lalu python3 -I alur.py (Python 3.12.3)
Masukan: karyawan.csv (kode, nama); absensi.csv (kode, tanggal, masuk, keluar)
Keluaran: rekap.csv; baris bermasalah dicetak untuk dicek manusia
Aturan: lembur = menit kerja di atas 480 per hari (aturan latihan, bukan aturan ketenagakerjaan)
Pemeriksaan: uji cepat; masuk = dihitung + perlu dicek
Batas: hanya data sintetis; baris bermasalah tidak dihitung
Pemakaian AI: (bila ada) alat, versi, perintah, dan hasil uji
```

## Contoh setengah jadi

Lengkapi pembanding pada fungsi pemeriksa, lalu jalankan `uji_cepat()`:

```python setengah-jadi
def hitung_hari(masuk, keluar):
    selisih = menit(keluar) - menit(masuk)
    if selisih ___ 0:
        raise ValueError("keluar tidak setelah masuk")
    return selisih, max(0, selisih - BATAS_NORMAL)
```

Prediksi dulu: bila Anda menulis `<` alih-alih tanda yang benar, apa yang terjadi pada baris dengan masuk dan keluar yang sama?

## Latihan

1. **Ubah.** Ubah `BATAS_NORMAL` menjadi `7 * 60`. Prediksi dulu: apa yang terjadi pada `uji_cepat()` sebelum Anda mengubah apa pun lagi?
2. **Buat.** Tulis berkas dokumentasi untuk alur Anda sendiri dengan delapan baris seperti contoh, dan jalankan perintah di dalamnya persis seperti tertulis.
3. **Jelaskan.** Mengapa baris bermasalah dicatat, bukan dibuang? Apa yang dijaga oleh `assert` yang membandingkan jumlah baris?
4. **Buat.** Tambahkan dua pernyataan ke `uji_cepat()`: `menit("00:00")` dan `hitung_hari("08:00", "16:00")`. Prediksi dulu hasilnya.
5. **Berpasangan (opsional).** Tukar proyek dengan rekan dan telaah dengan lima butir rubrik (ketepatan, keterbacaan, pengujian atau pemeriksaan hasil, dokumentasi, keamanan data). Peserta mandiri boleh menelaah sendiri.

## Latihan bercampur

1. (`DW-PKJ-M6`) Mintalah draf dokumentasi alur Anda dari asisten AI (atau pakai draf rekaan buatan sendiri), lalu periksa tiga klaimnya terhadap kode: perintah menjalankan, aturan lembur, dan nama berkas. Catat alat, versi, dan perintah.
2. (`DW-PKJ-M7`) Rancang satu grafik batang jam lembur per karyawan dari `rekap.csv` dengan sumbu dari nol. Tuliskan judul yang menyatakan temuan.

## Keluaran portofolio

**Portofolio `PKJ`.** Kumpulkan dalam satu folder: peta tugas dan algoritma (`DW-PKJ-M1`), lembar kerja bersih (`M2`), skrip CSV (`M3`) dan ringkasan (`M4`), skrip laporan (`M5`), catatan AI (`M6`), satu halaman laporan dengan grafik (`M7`), dan alur proyek akhir ini beserta dokumentasinya. Telaah dengan rubrik: **ketepatan** (berjalan benar pada data sintetis), **keterbacaan**, **pengujian atau pemeriksaan hasil**, **dokumentasi**, dan **keamanan data** (tanpa kredensial dan data nyata). Seluruhnya data sintetis.

## Ulang berjarak

Tanpa melihat modul ini, kerjakan ulang dan cocokkan. Jalur `PKJ` berakhir di modul ini, jadi pertanyaan ini dipakai bila Anda kembali ke portofolio kelak.

| Kapan | Pertanyaan |
| --- | --- |
| Satu minggu lagi | Sebutkan lima butir rubrik portofolio dan satu bukti untuk masing-masing dari proyek Anda. |
| Tiga bulan lagi (atau awal jalur lanjut) | Mengapa baris bermasalah dicatat dan mengapa jumlah baris diperiksa? |
| Akhir jalur | Tulis dari ingatan rancangan alur lima tahap dari masukan sampai dokumentasi. |

## Kebijakan AI

Mengikuti kebijakan program (silabus bagian 9.1) yang dipraktikkan di `DW-PKJ-M6`: bila Anda memakai asisten AI pada proyek, hanya data sintetis, tanpa kredensial, keluaran adalah draf yang Anda uji dan pahami, serta alat, versi, dan perintah dicatat. Memakai AI tidak diwajibkan.

## Kesalahan umum

- **Menghitung semua baris tanpa memeriksa.** Baris tanpa jam keluar atau dengan kode asing membuat jumlah salah diam-diam.
- **Dokumentasi yang tidak sesuai kode.** Perintah di dokumentasi harus dicoba persis seperti tertulis.
- **Mengubah aturan tanpa memperbarui uji.** Uji gagal adalah sinyal berguna, bukan gangguan.
- **Menganggap aturan latihan sebagai aturan sungguhan.** Aturan lembur sungguhan mengikuti ketentuan tempat kerja dan hukum yang berlaku.

## Cek mandiri

Tutup modul dan jawab:

1. Lima tahap alur otomasi dari masukan sampai dokumentasi.
2. Lima butir rubrik portofolio.
3. Dua cara skrip ini memastikan tidak ada baris yang hilang.

Daftar periksa (kosong; Anda isi sendiri, tidak dikumpulkan):

- [ ] Alur saya berjalan dari awal sampai akhir pada data sintetis.
- [ ] Baris bermasalah dicatat dan jumlah baris cocok.
- [ ] Dokumentasi saya dicoba persis seperti tertulis.
- [ ] Tidak ada kredensial atau data nyata di folder.

## Kunci dan petunjuk

- **Cek awal:** (1) yatim: kuncinya tidak ada di tabel acuan; rusak: nilainya tidak bisa dibaca atau tidak masuk akal; (2) agar kasus tepi terbukti ditangani, bukan diasumsikan; (3) memastikan tidak ada baris yang hilang diam-diam; (4) tujuan, cara menjalankan, masukan dan keluaran, aturan atau batas; (5) data nyata, kredensial, dan berkas kerja kantor.
- **Prediksi:** K01 570 menit kerja dan 90 menit lembur; K02 480 menit kerja dan 0 lembur; K03 tidak dihitung karena jam keluar kosong dan dicatat untuk dicek.
- **Setengah jadi:** `<=`. Dengan `<`, baris dengan masuk dan keluar sama lolos sebagai hari kerja berdurasi nol menit tanpa tercatat sebagai bermasalah.
- **Latihan 1:** `AssertionError` pada `hitung_hari("08:00", "17:00") == (540, 60)`, karena hasil baru `(540, 120)`. Setelah uji diperbarui, jam lembur menjadi 13,25; 12,0; dan 16,0 untuk A, B, dan C.
- **Latihan 3:** agar manusia dapat memperbaikinya; `assert` menjaga bahwa masuk sama dengan dihitung ditambah perlu dicek.
- **Latihan 4:** `menit("00:00")` memberi `0`; `hitung_hari("08:00", "16:00")` memberi `(480, 0)`.
- **Latihan bercampur 2:** contoh judul: "Karyawan Contoh C mencatat lembur terbanyak, 11 jam (sintetis)"; sumbu dari nol dan satuan jam tertulis.
- **Petunjuk bila macet:** jalankan `uji_cepat()` saja, lalu cetak `perlu_dicek`.

## Langkah berikutnya

Jalur `PKJ` selesai. Pilihan lanjutan: jalur `PRO` (silabus bagian 6.1 mencatat bahwa `DW-PKJ-M3` sampai `M5` menggantikan sebagian `DW-PRO-M2` `[asumsi]`), atau mengulang proyek ini dengan alur dari pekerjaan Anda sendiri sesuai kebijakan kantor.

## Catatan untuk pendamping

- **Waktu:** 5 jam (proyek dapat melebar ke sesi tambahan). **Bahan:** Python 3, penyunting teks, terminal. Skrip dijalankan penulis dengan `python3 -I` (Python 3.12.3), keluarannya cocok, dan perhitungan Karyawan Contoh A dicek dengan tangan.
- **Rubrik** (silabus 8.1): ketepatan, keterbacaan, pengujian atau pemeriksaan hasil, dokumentasi, keamanan data; ambang belum diputuskan, usulan "selesai bila rubrik terpenuhi, tanpa nilai angka".
- **Aturan lembur** di modul adalah aturan latihan; jangan dipakai untuk penggajian nyata, dan modul tidak membuka teks hukum ketenagakerjaan.
- **Tanda siap lanjut:** peserta menjalankan dokumentasinya persis seperti tertulis dan menjelaskan mengapa baris bermasalah dicatat.
