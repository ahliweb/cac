## Untuk siapa modul ini

Modul ini untuk jalur **profesional** (`PRO`), 10 jam, sesudah `DW-PRO-M3`. Alatnya Python 3 (penulis memakai 3.12.3), penyunting teks, dan terminal; hanya pustaka bawaan. Estimasi lima sesi dua jam `[asumsi]`. Data berupa barang rekaan.

Jembatan kuliah-coding (silabus 6.2), per modul dan dengan bukti yang diperiksa pendaftaran: profil `I-lengkap` dan `U-lengkap` **padatkan** (P), `I-awal` **wajib** (W). Jembatan bukan alih kredit dan bukan sertifikat.

## Cek awal pengalaman

Jawab tanpa melihat apa pun, lalu cocokkan dengan kunci. Skor tidak dicatat.

1. Apa yang dimaksud fungsi "murni", dan mengapa lebih mudah diuji?
2. Apa guna `if __name__ == "__main__":` di bawah berkas Python?
3. Sebut tiga aturan PEP 8 tentang nama dan spasi.
4. Di mana docstring ditulis, dan apa yang minimal dikandungnya?
5. Mengapa nama seperti `d`, `t`, dan `x` menyulitkan orang lain?

Bila kelimanya benar, Anda boleh melewati "Contoh terselesaikan" dan "Contoh setengah jadi" dan langsung ke "Latihan".

## Ingat kembali

Tanpa melihat modul sebelumnya, tulis jawaban singkat.

1. (`DW-PRO-M3`) Kapan kamus lebih tepat daripada daftar, dan apa syarat pencarian biner?
2. (`DW-PRO-M2`) Apa guna subrutin, dan apa beda parameter dengan argumen?
3. (`DW-PRO-M1`) Apa pesan *commit* yang baik, dan mengapa perubahan kecil lebih mudah ditinjau?
4. (`DW-FND-M1`) Apa yang Anda lakukan sebelum menempel teks ke asisten AI?

Cocokkan: (1) kamus untuk pencarian berulang lewat kunci; biner mensyaratkan data berurutan; (2) subrutin menghindari salinan dan memberi nama pada satu pekerjaan; parameter ada di definisi, argumen diberikan saat memanggil; (3) menyatakan apa dan mengapa dalam satu baris, dan perubahan kecil mudah dibaca serta dibatalkan; (4) menghapus atau mengganti data pribadi dan rahasia, atau tidak menempel.

## Tujuan

Setelah modul ini Anda dapat menggunakan ulang kode lewat fungsi dan modul, menata berkas, mengikuti pedoman penulisan, dan mendokumentasikan kode.

## Prediksi dulu

Skrip di bawah menghitung hal yang sama tiga kali dengan nama satu huruf. Sebelum membaca contoh, tulis: (a) apa yang dicetak, (b) tiga hal yang akan Anda ubah agar orang lain bisa membacanya.

```python
d = [(" b07 ", "Kabel contoh", 12), ("B02", "Baterai contoh", 0), ("B05", "Lampu contoh", 3)]
t = 0
for x in d:
    t = t + x[2]
print("Total stok:", t)
m = []
for x in d:
    if x[2] < 5:
        m.append(x[0].strip().upper())
print("Menipis:", sorted(m))
```

## Contoh terselesaikan

### Dari skrip berantakan ke modul

Skrip lengkapnya menambah satu perulangan lagi yang mencetak nama barang menipis. Keluarannya:

```text
Total stok: 15
Menipis: ['B02', 'B05']
Nama menipis: ['Baterai contoh', 'Lampu contoh']
```

Tiga perbaikannya: **nama bermakna** (`barang`, `stok`, bukan `x[2]`); **fungsi** untuk setiap pekerjaan (jumlah, penyaringan) supaya tidak disalin; **modul** terpisah dari program yang memakainya. Berkas pertama, `stok.py`, berisi fungsi, konstanta bernama, dan docstring dengan contoh pendek:

```python
"""Fungsi stok untuk latihan (data rekaan)."""

AMBANG_MENIPIS = 5


def rapikan_kode(kode):
    """Kembalikan kode tanpa spasi di tepi dan berhuruf besar.

    >>> rapikan_kode(" b07 ")
    'B07'
    """
    return kode.strip().upper()


def total_stok(daftar):
    """Jumlahkan stok semua barang; daftar kosong menghasilkan 0.

    >>> total_stok([{"stok": 3}, {"stok": 4}])
    7
    >>> total_stok([])
    0
    """
    return sum(barang["stok"] for barang in daftar)


def barang_menipis(daftar, ambang=AMBANG_MENIPIS):
    """Kembalikan barang yang stoknya di bawah ambang, sesuai urutan masukan.

    >>> barang_menipis([{"stok": 2}, {"stok": 5}, {"stok": 0}])
    [{'stok': 2}, {'stok': 0}]
    """
    return [barang for barang in daftar if barang["stok"] < ambang]
```

Berkas kedua, `laporan.py`, hanya memakai fungsi itu. Blok `if __name__ == "__main__":` membuat `main()` jalan bila berkas dijalankan langsung, tetapi tidak saat berkas di-*impor*.

```python
"""Cetak laporan stok dari data rekaan."""

from stok import barang_menipis, rapikan_kode, total_stok

DATA = [
    {"kode": " b07 ", "nama": "Kabel contoh", "stok": 12},
    {"kode": "B02", "nama": "Baterai contoh", "stok": 0},
    {"kode": "B05", "nama": "Lampu contoh", "stok": 3},
]


def main():
    menipis = barang_menipis(DATA)
    print("Total stok:", total_stok(DATA))
    print("Menipis:", sorted(rapikan_kode(b["kode"]) for b in menipis))
    print("Nama menipis:", [b["nama"] for b in menipis])


if __name__ == "__main__":
    main()
```

Taruh keduanya dalam satu folder. Jalankan `python3 laporan.py`; keluarannya sama persis dengan skrip berantakan di atas. Catatan: untuk dua berkas ini jangan memakai `-I`; mode terisolasi membuang folder skrip dari jalur impor, sehingga `import stok` gagal dengan `ModuleNotFoundError` (penulis mencobanya). Contoh dalam docstring diuji dengan:

```text
python3 -I -m doctest -v stok.py
```

yang mencetak `4 tests in 4 items.`, `4 passed and 0 failed.`, dan `Test passed.` (Python 3.12.3).

### Pedoman penulisan

Pedoman Python yang luas dipakai (PEP 8): nama fungsi dan variabel `huruf_kecil_dengan_garis_bawah`, konstanta `HURUF_BESAR`, indentasi empat spasi, spasi sesudah koma dan di sekitar `=` pada penugasan, dan baris yang tidak terlalu panjang. Pedoman bukan hukum: tim boleh menetapkan aturannya sendiri, asal konsisten. Docstring mengikuti PEP 257: satu kalimat ringkas di baris pertama, lalu penjelasan bila perlu.

## Contoh setengah jadi

Lengkapi nilai yang diharapkan di docstring dan penyebut pembagian, lalu jalankan doctest:

```python setengah-jadi
def rata_rata_stok(daftar):
    """Kembalikan rata-rata stok; daftar kosong menghasilkan 0.

    >>> rata_rata_stok([{"stok": 2}, {"stok": 4}])
    ___
    >>> rata_rata_stok([])
    0
    """
    if not daftar:
        return 0
    return total_stok(daftar) / ___
```

Prediksi dulu: apa yang terjadi bila baris `if not daftar:` dihapus dan daftarnya kosong?

## Latihan

Potongan untuk latihan 3 (sengaja tidak rapi, tidak untuk dijalankan sebagai contoh):

```text
def Hitung(X,y):
  hasil=X+y
  return hasil
```

1. **Ubah.** Ubah `AMBANG_MENIPIS` menjadi 3. Prediksi dulu apa yang dicetak bagian "Menipis" di `laporan.py`, lalu jalankan. Apakah doctest di `stok.py` masih lolos, dan mengapa?
2. **Buat.** Tambahkan `nama_menipis(daftar, ambang=...)` ke `stok.py` yang mengembalikan nama barang menipis, memakai `barang_menipis`, dengan docstring dan dua contoh doctest (satu daftar kosong).
3. **Jelaskan.** Tulis ulang potongan `Hitung` di atas mengikuti PEP 8 dan sebut lima yang Anda ubah.
4. **Buat.** Rapikan skrip pribadi sintetis buatan Anda (di bawah 30 baris) menjadi satu modul fungsi dan satu berkas program; jalankan sebelum dan sesudah, dan bandingkan keluarannya.
5. **Berpasangan (opsional).** Tukar modul nomor 4 dengan rekan; masing-masing mencoba memakai fungsi lawan hanya dari docstring. Peserta mandiri boleh membacanya sendiri sebagai orang asing.

## Latihan bercampur

1. (`DW-PRO-M3`) Tambahkan fungsi `cari_barang(per_kode, kode)` yang memakai kamus `per_kode` dan `rapikan_kode`, dan mengembalikan `None` bila tidak ada. Beri docstring dan uji dengan kode `" b05 "`.
2. (`DW-PRO-M2`) Tulis `kategori_stok(stok)` dengan kondisi `"habis"`, `"menipis"`, dan `"aman"`, lalu sebut satu nilai batas yang menurut Anda perlu diuji.

## Ulang berjarak

Tanpa melihat modul ini, kerjakan ulang dan cocokkan.

| Kapan | Pertanyaan |
| --- | --- |
| Satu minggu lagi | Sebutkan tiga perbaikan yang mengubah skrip berantakan menjadi modul yang dapat dipakai ulang. |
| Awal modul ke-4 berikutnya | Apa guna `if __name__ == "__main__":`, dan apa yang terjadi saat modul di-*impor*? |
| Akhir jalur | Apa isi minimal docstring yang membantu orang lain, dan bagaimana contoh di dalamnya diuji? |

## Kebijakan AI

Modul ini tidak memakai asisten AI. Mengikuti silabus 9.1: pemakaian AI untuk menulis kode diajarkan sesudah `DW-PRO-M5`, di `DW-PRO-M13`; kode yang tidak Anda pahami tidak dipakai.

## Kesalahan umum

- **Menyalin potongan kode alih-alih membuat fungsi.** Perbaikan di satu tempat tertinggal di tempat lain.
- **Fungsi yang mencetak sekaligus menghitung.** Pisahkan: fungsi mengembalikan nilai, program yang mencetak.
- **Docstring yang tidak diperbarui.** Docstring yang salah lebih buruk daripada tidak ada; uji contohnya.
- **Mengimpor dari berkas yang tidak ada di jalur impor.** Jalankan dari folder yang tepat dan catat caranya di dokumentasi.
- **Pedoman gaya sebagai pengganti penalaran.** Gaya yang rapi tidak membuktikan kode benar.

## Cek mandiri

Tutup modul dan jawab:

1. Tiga perbaikan dari skrip berantakan ke modul.
2. Apa yang dicetak bila `stok.py` di-*impor* dan bila dijalankan langsung?
3. Mengapa contoh di docstring ikut diuji?

Daftar periksa (kosong; Anda isi sendiri, tidak dikumpulkan):

- [ ] Nama saya bermakna dan mengikuti pedoman yang disepakati.
- [ ] Setiap fungsi punya docstring dan satu tugas.
- [ ] Contoh di docstring saya diuji.
- [ ] Saya mencoba menjalankan modul persis seperti ditulis di dokumentasi.

## Kunci dan petunjuk

- **Cek awal:** (1) fungsi yang hasilnya hanya bergantung pada masukan dan tidak mengubah keadaan luar; mudah diuji karena masukan dan keluaran cukup; (2) kode di bawahnya hanya jalan bila berkas dijalankan langsung, bukan saat di-*impor*; (3) contoh: `snake_case` untuk fungsi, empat spasi, spasi sesudah koma; (4) tepat di bawah `def`, ringkasan satu baris; (5) tidak menyatakan maksud.
- **Prediksi:** (a) `Total stok: 15` lalu `Menipis: ['B02', 'B05']`; (b) misalnya nama bermakna, fungsi, dan docstring.
- **Setengah jadi:** `3.0` dan `len(daftar)`. Tanpa `if not daftar:`, daftar kosong menghasilkan `ZeroDivisionError`.
- **Latihan 1:** `Menipis: ['B02']`; doctest tetap lolos karena stok 2 dan 0 tetap di bawah 3 dan stok 5 tetap di atasnya; contoh yang kebetulan tidak peka terhadap nilai ambang tidak mendeteksi perubahan itu, jadi tambahkan contoh pada batas (stok 3).
- **Latihan 2:** `return [b["nama"] for b in barang_menipis(daftar, ambang)]`; contoh: `nama_menipis([])` menghasilkan `[]`.
- **Latihan 3:** `def hitung(x, y):`, empat spasi, `hasil = x + y`, nama bermakna, dan docstring.
- **Latihan bercampur 1:** `per_kode.get(rapikan_kode(kode))`.
- **Petunjuk bila macet:** jalankan doctest satu fungsi; jika `ModuleNotFoundError`, periksa folder kerja dan jangan pakai `-I`.

## Langkah berikutnya

`DW-PRO-M5`: debugging dan pengujian unit. Contoh doctest di sini adalah bentuk paling sederhana dari uji otomatis; di modul berikutnya Anda menulis uji yang lebih lengkap dan menelusuri galat secara sistematis.

## Catatan untuk pendamping

- **Waktu:** 10 jam, lima sesi dua jam. **Bahan:** Python 3, penyunting teks, terminal. Semua blok dijalankan penulis (Python 3.12.3): `laporan.py` dengan `python3 laporan.py`, doctest dengan `python3 -I -m doctest -v stok.py`, keluaran cocok.
- **Jembatan kuliah:** `I-lengkap` P, `I-awal` W, `U-lengkap` P (dasar: `KUL-U-101`, `KUL-I-204`). Bukti berupa tugas praktik singkat tanpa AI.
- **Unit SKKNI yang disentuh (judul saja, tidak menjamin kompetensi):** Menerapkan Metode dan Praktik Penggunaan Kembali (Reusable) Subrutin-Subrutin (`J.620100.014.01`); Menyusun Fungsi, File atau Sumber Daya Pemrograman yang Lain dalam Organisasi yang Rapi (`J.620100.015.01`); Menulis Kode dengan Prinsip Sesuai Guidelines dan Best Practices (`J.620100.016.01`); Membuat Dokumen Kode Program (`J.620100.023.02`). Salinan daftar unit belum terverifikasi terhadap berkas resmi.
- **Tanda siap lanjut:** peserta menjelaskan guna `if __name__ == "__main__":` dan menjalankan doctest modulnya sendiri.
