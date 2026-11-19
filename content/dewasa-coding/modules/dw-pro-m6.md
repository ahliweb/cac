## Untuk siapa modul ini

Modul ini untuk jalur **profesional** (`PRO`), 10 jam, sesudah `DW-PRO-M13` (silabus 5.1: modul ini bergantung pada M13, bukan langsung pada M5). Alatnya Python 3 (penulis memakai 3.12.3), penyunting teks, dan terminal; hanya pustaka bawaan. Estimasi lima sesi dua jam `[asumsi]`. Data berupa barang rekaan.

Jembatan kuliah-coding (silabus 6.2): kuliah-coding tidak memuat pemrograman berorientasi objek, jadi semua profil (`I-lengkap`, `I-awal`, `U-lengkap`) berstatus **wajib** (W). Jembatan bukan alih kredit dan bukan sertifikat. Sesuai jalur setelah M5, modul ini bertumpu pada spesifikasi dan uji lebih dulu; contoh terselesaikan dibuat ringkas.

## Cek awal pengalaman

Jawab tanpa melihat apa pun, lalu cocokkan dengan kunci. Skor tidak dicatat.

1. Apa beda kelas dan objek (instans)?
2. Apa guna `self` dan `__init__`?
3. Apa beda atribut dan metode?
4. Mengapa atribut `_stok` diawali garis bawah dan diakses lewat `@property`?
5. Apa yang diperiksa sebelum memakai pustaka pihak ketiga, dan kapan pustaka bawaan sudah cukup?

Bila kelimanya benar, Anda boleh melewati "Contoh terselesaikan" dan "Contoh setengah jadi" dan langsung ke "Latihan".

## Ingat kembali

Tanpa melihat modul sebelumnya, tulis jawaban singkat.

1. (`DW-PRO-M13`) Urutkan: spesifikasi, uji, draf AI, tinjauan, catatan asal. Apa yang diperiksa pada tinjauan?
2. (`DW-PRO-M4`) Apa isi docstring yang membantu orang lain, dan bagaimana contoh di dalamnya diuji?
3. (`DW-FND-M1`) Apa yang Anda lakukan sebelum menempel teks ke asisten AI?

Cocokkan: (1) spesifikasi, uji, draf, tinjauan, catatan; tinjauan memeriksa kebenaran, keamanan, kebergantungan, dan pemahaman; (2) ringkasan satu baris dan perilaku batas; contoh diuji dengan `python3 -m doctest`; (3) menghapus atau mengganti data pribadi dan rahasia, atau tidak menempel.

## Tujuan

Setelah modul ini Anda dapat membuat kelas dan objek serta memakai pustaka siap pakai dengan memeriksa dulu apakah pustaka itu perlu.

## Prediksi dulu

Kelas `Barang` di bawah ini dijelaskan di contoh. Sebelum menjalankan, tulis hasil dua `print`:

```python
a = Barang("B02", "Baterai contoh", 5)
b = a
b.masuk(3)
print(a.stok, b.stok, a is b)
c = Barang("B02", "Baterai contoh", 5)
print(c == a, c.stok)
```

## Contoh terselesaikan

### Spesifikasi, uji, lalu kelas

Spesifikasi (Anda tulis lebih dulu). `Barang(kode, nama, stok=0)`: `masuk(n)` menambah stok, `keluar(n)` mengurangi; `n` harus positif; stok tidak boleh menjadi negatif; stok dibaca lewat properti `stok`. `Gudang`: `tambah_barang(barang)` menolak kode ganda, `cari(kode)` mengembalikan `None` bila tidak ada, `total_stok()`, dan `ke_json()` urut menurut kode.

Ujinya (`uji_gudang.py`) memeriksa batas dan penolakan:

```python
import unittest

from gudang import Barang, Gudang


class UjiBarang(unittest.TestCase):
    def test_masuk_dan_keluar(self):
        b = Barang("B02", "Baterai contoh", 5)
        b.masuk(3)
        b.keluar(2)
        self.assertEqual(b.stok, 6)

    def test_stok_tidak_boleh_negatif(self):
        b = Barang("B02", "Baterai contoh", 1)
        with self.assertRaises(ValueError):
            b.keluar(2)
        self.assertEqual(b.stok, 1)

    def test_jumlah_harus_positif(self):
        b = Barang("B02", "Baterai contoh")
        with self.assertRaises(ValueError):
            b.masuk(0)

    def test_stok_awal_negatif(self):
        with self.assertRaises(ValueError):
            Barang("B02", "Baterai contoh", -1)


class UjiGudang(unittest.TestCase):
    def setUp(self):
        self.gudang = Gudang()
        self.gudang.tambah_barang(Barang("B05", "Lampu contoh", 7))
        self.gudang.tambah_barang(Barang("B02", "Baterai contoh", 3))

    def test_total_dan_cari(self):
        self.assertEqual(self.gudang.total_stok(), 10)
        self.assertEqual(self.gudang.cari("B05").nama, "Lampu contoh")
        self.assertIsNone(self.gudang.cari("B99"))

    def test_kode_ganda_ditolak(self):
        with self.assertRaises(ValueError):
            self.gudang.tambah_barang(Barang("B05", "Lampu lain contoh"))

    def test_ke_json_berurutan(self):
        self.assertEqual(
            self.gudang.ke_json(),
            '[{"kode": "B02", "nama": "Baterai contoh", "stok": 3},'
            ' {"kode": "B05", "nama": "Lampu contoh", "stok": 7}]',
        )


if __name__ == "__main__":
    unittest.main()
```

Kelasnya (`gudang.py`). Objek menyimpan keadaan (atribut) dan perilaku yang menjaga keadaan itu (metode): stok hanya berubah lewat `masuk` dan `keluar`, yang menolak nilai tak masuk akal.

```python
import json


class Barang:
    """Satu jenis barang; stok tidak pernah negatif."""

    def __init__(self, kode, nama, stok=0):
        if stok < 0:
            raise ValueError("stok awal tidak boleh negatif")
        self.kode = kode
        self.nama = nama
        self._stok = stok

    @property
    def stok(self):
        return self._stok

    def masuk(self, jumlah):
        if jumlah <= 0:
            raise ValueError("jumlah masuk harus positif")
        self._stok += jumlah

    def keluar(self, jumlah):
        if jumlah <= 0:
            raise ValueError("jumlah keluar harus positif")
        if jumlah > self._stok:
            raise ValueError("stok tidak cukup")
        self._stok -= jumlah

    def __repr__(self):
        return f"Barang({self.kode!r}, {self.nama!r}, stok={self._stok})"


class Gudang:
    """Kumpulan Barang yang dicari lewat kode."""

    def __init__(self):
        self._barang = {}

    def tambah_barang(self, barang):
        if barang.kode in self._barang:
            raise ValueError("kode sudah ada")
        self._barang[barang.kode] = barang

    def cari(self, kode):
        return self._barang.get(kode)

    def total_stok(self):
        return sum(b.stok for b in self._barang.values())

    def ke_json(self):
        data = [
            {"kode": b.kode, "nama": b.nama, "stok": b.stok}
            for b in sorted(self._barang.values(), key=lambda b: b.kode)
        ]
        return json.dumps(data, sort_keys=True)
```

`python3 -m unittest uji_gudang -v` (bukan `-I`, karena modul diimpor dari folder kerja) menjalankan tujuh uji; ringkasannya `Ran 7 tests` lalu `OK` (Python 3.12.3).

### Memakai pustaka siap pakai

`json` dan `statistics` dari pustaka bawaan sudah cukup di sini:

```python
import statistics

from gudang import Barang, Gudang

gudang = Gudang()
for kode, nama, stok in [("B05", "Lampu contoh", 7), ("B02", "Baterai contoh", 3), ("B09", "Saklar contoh", 12)]:
    gudang.tambah_barang(Barang(kode, nama, stok))

print(gudang.cari("B02"))
print(gudang.total_stok(), statistics.median([7, 3, 12]))
print(gudang.ke_json())
```

```text
Barang('B02', 'Baterai contoh', stok=3)
22 7
[{"kode": "B02", "nama": "Baterai contoh", "stok": 3}, {"kode": "B05", "nama": "Lampu contoh", "stok": 7}, {"kode": "B09", "nama": "Saklar contoh", "stok": 12}]
```

Mengidentifikasi pustaka sebelum memakainya: (1) **kebutuhan** tertulis dulu; (2) **pustaka bawaan** sudah memenuhinya? (3) bila tidak, periksa **keberadaan dan reputasi** (pemelihara, riwayat rilis, repositori sumber), **lisensi**, **ukuran kebergantungan** yang ikut terpasang, dan **alternatif**; (4) pasang di lingkungan terpisah dengan versi tertentu; (5) catat keputusannya. Ini kelanjutan pemeriksaan paket di `DW-PRO-M13`.

## Contoh setengah jadi

Lengkapi satu kata kunci pada `Gudang`, lalu jalankan `UjiGudang`:

```python setengah-jadi
class Gudang:
    def __init__(self):
        self._barang = {}

    def tambah_barang(self, barang):
        if barang.kode ___ self._barang:
            raise ValueError("kode sudah ada")
        self._barang[barang.kode] = barang
```

Prediksi dulu: uji mana yang gagal bila Anda menghapus seluruh blok `if`?

## Latihan

1. **Ubah.** Ubah spesifikasi: `keluar(n)` mengembalikan stok sisa. Ubah ujinya dahulu, lihat gagal, baru ubah kode.
2. **Buat.** Tulis lebih dulu uji untuk kelas `Pesanan` (`tambah(kode, jumlah)` menggabung kode sama dan menolak jumlah nol atau negatif; `total(daftar_harga)` menjumlahkan harga kali jumlah; kode yang tidak ada di `daftar_harga` memunculkan `KeyError`), lalu tulis kelasnya.
3. **Jelaskan.** Mengapa `stok` hanya properti baca? Apa yang bisa salah bila `b.stok = -5` diizinkan, dan apa yang ditentukan `__repr__`?
4. **Buat.** Isi lembar keputusan pustaka (lima butir di atas) untuk kebutuhan "membaca tanggal dari teks". Putuskan apakah pustaka bawaan cukup dan catat alasannya.
5. **Berpasangan (opsional).** Tukar uji nomor 2 dengan rekan tanpa kode, tulis kelasnya masing-masing, dan bandingkan. Peserta mandiri boleh menulis dua versi.

## Latihan bercampur

1. (`DW-PRO-M13`) Bila Anda meminta draf kelas `Pesanan` dari asisten AI, tulis spesifikasi dan uji lebih dulu, tinjau drafnya, dan isi catatan asal (alat, versi, perintah, hasil uji). Tanpa asisten, tinjau draf rekaan buatan sendiri.
2. (`DW-PRO-M5`) Sebuah uji `Gudang` gagal dengan `KeyError`. Tulis enam langkah penelusuran Anda untuk kasus itu secara singkat.

## Ulang berjarak

Tanpa melihat modul ini, kerjakan ulang dan cocokkan.

| Kapan | Pertanyaan |
| --- | --- |
| Satu minggu lagi | Apa beda atribut dan metode, dan mengapa stok diubah hanya lewat metode? |
| Awal modul ke-4 berikutnya | Sebut lima butir mengidentifikasi pustaka sebelum memakainya. |
| Akhir jalur | Tulis dari ingatan kerangka kelas dengan `__init__`, satu properti, dan satu metode yang menolak masukan tidak valid. |

## Kebijakan AI

Mengikuti kebijakan program (silabus 9.1) yang dipraktikkan di `DW-PRO-M13`: bila Anda memakai asisten AI, hanya data sintetis, tanpa kredensial, keluaran adalah draf yang diuji dan dapat Anda jelaskan, nama pustaka dari AI diperiksa lebih dulu, serta alat, versi, dan perintah dicatat. Memakai AI tidak diwajibkan.

## Kesalahan umum

- **Mengira `b = a` menyalin objek.** Keduanya menunjuk objek yang sama; ubah lewat satu, terlihat di yang lain.
- **Mengubah atribut dari luar sehingga aturan terlewati.** Ubah keadaan lewat metode yang menjaga aturannya.
- **Membuat kelas untuk segalanya.** Bila hanya fungsi tunggal tanpa keadaan, fungsi cukup.
- **Memasang pustaka demi satu fungsi kecil.** Periksa pustaka bawaan dan biaya kebergantungan.
- **Membandingkan objek dengan `==` tanpa mendefinisikannya.** Bawaannya membandingkan identitas, bukan isi.

## Cek mandiri

Tutup modul dan jawab:

1. Apa beda kelas dan objek, dan apa yang dijaga metode?
2. Mengapa `c == a` bernilai `False` pada contoh prediksi?
3. Lima butir mengidentifikasi pustaka.

Daftar periksa (kosong; Anda isi sendiri, tidak dikumpulkan):

- [ ] Saya menulis spesifikasi dan uji sebelum kelasnya.
- [ ] Keadaan objek saya hanya berubah lewat metode yang menolak nilai tidak valid.
- [ ] Saya memeriksa pustaka bawaan sebelum memasang pustaka lain.
- [ ] Saya mencatat asal kode bila memakai AI.

## Kunci dan petunjuk

- **Cek awal:** (1) kelas adalah cetak biru, objek adalah satu wujudnya; (2) `self` adalah objek yang sedang dipakai, `__init__` menyiapkan keadaan awalnya; (3) atribut adalah data, metode adalah perilaku; (4) isyarat bahwa atribut internal, dan properti membuatnya hanya terbaca sehingga aturan tidak dilewati; (5) keberadaan, reputasi, lisensi, ukuran kebergantungan; pustaka bawaan cukup bila kebutuhan terpenuhi.
- **Prediksi:** `8 8 True`, lalu `False 5`.
- **Setengah jadi:** `in`. Tanpa blok itu, `test_kode_ganda_ditolak` gagal dan barang lama tertimpa.
- **Latihan 2:** ujinya (empat uji) dan kelas `Pesanan` memakai kamus `{kode: jumlah}` dan `.get`; `total` memakai `daftar_harga[kode] * jumlah` sehingga kode asing memunculkan `KeyError`. Contoh: dua kali `tambah("B02", ...)` dengan 2 dan 1 pada harga 1500 memberi total 4500.
- **Latihan 3:** tanpa penjaga, stok negatif lolos dan semua hitungan sesudahnya salah; `__repr__` menentukan tampilan objek saat dicetak.
- **Latihan bercampur 2:** reproduksi dengan masukan terkecil, perkecil, hipotesis (kode tidak ada di kamus), buktikan dengan mencetak kuncinya, perbaiki satu hal, simpan uji.
- **Petunjuk bila macet:** cetak `repr(objek)` pada tiap langkah, dan ujilah satu metode saja.

## Langkah berikutnya

`DW-PRO-M7`: SQL dan akses basis data. Kelas `Gudang` di sini adalah gambaran awal penyimpanan data barang; di modul berikutnya data itu disimpan dalam tabel.

## Catatan untuk pendamping

- **Waktu:** 10 jam, lima sesi dua jam. **Bahan:** Python 3, penyunting teks, terminal. Semua blok dijalankan penulis (Python 3.12.3): uji dengan `python3 -m unittest`, pemakaian dengan `python3`, keluaran cocok; kunci latihan 2 dan prediksi juga dijalankan.
- **Jembatan kuliah:** `I-lengkap` W, `I-awal` W, `U-lengkap` W (kuliah-coding tidak memuat pemrograman berorientasi objek, silabus 6.2).
- **Unit SKKNI yang disentuh (judul saja, tidak menjamin kompetensi):** Mengimplementasikan Pemrograman Berorientasi Objek (`J.620100.018.02`); Menggunakan Library atau Komponen Pre-Existing (`J.620100.019.02`); Melakukan Identifikasi Library, Komponen atau Framework yang Diperlukan (`J.620100.003.01`). Salinan daftar unit belum terverifikasi terhadap berkas resmi.
- **Tanda siap lanjut:** peserta menjelaskan mengapa stok diubah hanya lewat metode dan menyelesaikan lembar keputusan pustaka.
