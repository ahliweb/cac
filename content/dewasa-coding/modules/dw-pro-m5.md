## Untuk siapa modul ini

Modul ini untuk jalur **profesional** (`PRO`), 10 jam, sesudah `DW-PRO-M4`. Alatnya Python 3 (penulis memakai 3.12.3), penyunting teks, dan terminal; hanya pustaka bawaan (`unittest`). Estimasi lima sesi dua jam `[asumsi]`. Semua data rekaan.

Jembatan kuliah-coding (silabus 6.2), per modul dan dengan bukti yang diperiksa pendaftaran: profil `I-lengkap` **lewati** (L), `I-awal` dan `U-lengkap` **padatkan** (P). Jembatan bukan alih kredit dan bukan sertifikat. Modul ini penutup **gerbang kesiapan** sebelum AI dipakai untuk menulis kode (silabus 9.1): akhir modul memuat daftar periksanya.

## Cek awal pengalaman

Jawab tanpa melihat apa pun, lalu cocokkan dengan kunci. Skor tidak dicatat.

1. Pada *traceback* Python, baris mana yang pertama kali Anda baca, dan mengapa?
2. Apa beda `AssertionError` (uji gagal) dan galat lain (uji *error*) di `unittest`?
3. Mengapa uji ditulis untuk daftar kosong dan nilai batas?
4. Sebut urutan enam langkah menelusuri galat secara sistematis.
5. Mengapa setelah galat diperbaiki, uji yang menemukannya tetap disimpan?

Bila kelimanya benar, Anda boleh melewati "Contoh terselesaikan" dan "Contoh setengah jadi" dan langsung ke "Latihan".

## Ingat kembali

Tanpa melihat modul sebelumnya, tulis jawaban singkat.

1. (`DW-PRO-M4`) Apa guna `if __name__ == "__main__":`, dan bagaimana contoh docstring diuji?
2. (`DW-PRO-M2`) Apa beda galat sintaks dan galat saat program berjalan? Beri satu contoh masing-masing.
3. (`DW-FND-M1`) Mengapa keluaran asisten AI harus diperiksa sebelum dipakai?

Cocokkan: (1) kode di bawahnya hanya jalan bila berkas dijalankan langsung; `python3 -m doctest -v berkas.py`; (2) sintaks: program tidak mulai (kurung tidak ditutup); saat berjalan: `ZeroDivisionError` atau `KeyError`; (3) AI bisa keliru atau mengarang walau terdengar yakin; kefasihan bukan bukti.

## Tujuan

Setelah modul ini Anda dapat menemukan galat secara sistematis dan menulis uji unit yang mereproduksi, menjaga, dan mencegah kembalinya galat.

## Prediksi dulu

Fungsi ini seharusnya mengembalikan rata-rata tiap dua nilai berurutan. Sebelum menjalankan, tulis hasil `rata_rata_bergerak([2, 4, 6, 8], 2)` yang Anda harapkan dan hasil yang menurut Anda dikembalikan kode ini.

```python
def rata_rata_bergerak(nilai, jendela):
    hasil = []
    for i in range(len(nilai) - jendela):
        potong = nilai[i : i + jendela]
        hasil.append(sum(potong) / jendela)
    return hasil
```

## Contoh terselesaikan

### Enam langkah menelusuri galat

1. **Reproduksi**: temukan masukan terkecil yang membuat galatnya muncul.
2. **Perkecil**: buang apa yang tidak perlu.
3. **Hipotesis**: tulis satu dugaan penyebab, bukan lima.
4. **Buktikan**: cetak nilai antara atau pakai *debugger* (`pdb`) untuk menguji dugaan.
5. **Perbaiki** satu hal.
6. **Jaga**: tambahkan uji yang gagal sebelum perbaikan dan lolos sesudahnya.

### Uji unit lebih dulu, perbaikan kemudian

Folder berisi `bergerak.py` (kode di atas) dan `uji_bergerak.py`:

```python
import unittest

from bergerak import rata_rata_bergerak


class UjiRataRataBergerak(unittest.TestCase):
    def test_kasus_biasa(self):
        self.assertEqual(rata_rata_bergerak([2, 4, 6, 8], 2), [3.0, 5.0, 7.0])

    def test_jendela_sama_dengan_panjang(self):
        self.assertEqual(rata_rata_bergerak([2, 4, 6], 3), [4.0])

    def test_jendela_lebih_besar_dari_data(self):
        self.assertEqual(rata_rata_bergerak([2, 4], 3), [])

    def test_daftar_kosong(self):
        self.assertEqual(rata_rata_bergerak([], 2), [])

    def test_jendela_tidak_valid(self):
        with self.assertRaises(ValueError):
            rata_rata_bergerak([1, 2], 0)


if __name__ == "__main__":
    unittest.main()
```

Jalankan `python3 -m unittest uji_bergerak` di folder itu (bukan `-I`: mode terisolasi membuang folder kerja dari jalur impor). Cuplikan keluarannya (Python 3.12.3):

```text
..FEF
ERROR: test_jendela_tidak_valid
ZeroDivisionError: division by zero
FAIL: test_jendela_sama_dengan_panjang
AssertionError: Lists differ: [] != [4.0]
FAIL: test_kasus_biasa
AssertionError: Lists differ: [3.0, 5.0] != [3.0, 5.0, 7.0]
Ran 5 tests in 0.001s
FAILED (failures=2, errors=1)
```

Titik bacanya: `[3.0, 5.0]` kehilangan `7.0`, dan `[2, 4, 6]` dengan jendela 3 menghasilkan kosong. Hipotesis: pengulangan berhenti satu langkah terlalu cepat. Buktinya: untuk `n` nilai dan jendela `w` ada `n - w + 1` jendela, bukan `n - w`. Perbaikan satu hal ditambah penjaga untuk jendela yang tidak masuk akal:

```python
def rata_rata_bergerak(nilai, jendela):
    """Rata-rata tiap `jendela` nilai berurutan; jendela harus minimal 1."""
    if jendela < 1:
        raise ValueError("jendela harus minimal 1")
    hasil = []
    for i in range(len(nilai) - jendela + 1):
        potong = nilai[i : i + jendela]
        hasil.append(sum(potong) / jendela)
    return hasil
```

Jalankan ulang dengan `python3 -m unittest uji_bergerak -v`: kelima uji `ok` dan ringkasannya `Ran 5 tests` lalu `OK`.

### Membaca *traceback*

```text
Traceback (most recent call last):
  File "harga.py", line 8, in <module>
    print(harga_total({"B02": 2, "B99": 1}, {"B02": 1500, "B05": 2000}))
  File "harga.py", line 4, in harga_total
    total += daftar_harga[kode] * jumlah
KeyError: 'B99'
```

Baca dari **bawah**: jenis galat dan nilainya (`KeyError: 'B99'`), lalu naik ke baris di fungsi sendiri. Jalur berkas dipersingkat di sini. Kunci `B99` ada di pesanan, tidak ada di daftar harga: masalah data, bukan salah ketik di rumus. Uji yang menjaganya ada di kunci latihan 3.

## Contoh setengah jadi

Lengkapi dua nama metode `unittest`:

```python setengah-jadi
class UjiRataRataBergerak(unittest.TestCase):
    def test_jendela_tidak_valid(self):
        with self.___(ValueError):
            rata_rata_bergerak([1, 2], 0)

    def test_kasus_biasa(self):
        self.___(rata_rata_bergerak([2, 4, 6, 8], 2), [3.0, 5.0, 7.0])
```

Prediksi dulu: bila Anda memakai `assertTrue` pada bagian kedua dengan daftar tak kosong, apakah uji bisa menangkap hasil yang salah?

## Latihan

1. **Ubah.** Hapus `+ 1` dari kode yang sudah benar (penjaga tetap). Prediksi dulu uji mana yang gagal dan berapa jumlahnya, baru jalankan.
2. **Buat.** Tulis lebih dulu empat uji untuk `persen(bagian, total)` (hasil dibulatkan satu desimal; `total` nol memunculkan `ValueError`), lihat semuanya gagal, lalu tulis fungsinya sampai lolos.
3. **Jelaskan.** Pada *traceback* `KeyError: 'B99'` di atas, tulis hipotesis, cara membuktikannya, dan satu uji yang menjaga perbaikannya. Kebijakan perbaikannya (kode dicatat, dilewati, atau memunculkan galat) Anda putuskan dan alasankan.
4. **Buat.** Catat satu galat yang Anda temukan dalam format enam baris: gejala, masukan terkecil, hipotesis, bukti, perbaikan, uji.
5. **Berpasangan (opsional).** Tukar fungsi berisi galat yang Anda tanam sendiri; temukan galat rekan dengan enam langkah. Peserta mandiri boleh menanam dan menemukan galat pada kode lamanya sendiri.

## Latihan bercampur

1. (`DW-PRO-M3`) Tulis uji unit untuk `cari_biner` pada daftar kosong, satu elemen, kedua ujung, dan nilai yang tidak ada.
2. (`DW-PRO-M4`) Pindahkan `persen` ke modul `hitungan.py` dengan docstring, impor dari berkas uji, dan jalankan ujinya.

## Ulang berjarak

Tanpa melihat modul ini, kerjakan ulang dan cocokkan.

| Kapan | Pertanyaan |
| --- | --- |
| Satu minggu lagi | Sebutkan enam langkah menelusuri galat dan mengapa langkah terakhir tidak boleh dilewati. |
| Awal modul ke-4 berikutnya | Apa beda uji yang gagal dan uji yang *error*, dan di mana Anda mulai membaca *traceback*? |
| Akhir jalur | Mengapa uji ditulis untuk kasus kosong dan batas, bukan hanya kasus biasa? |

## Kebijakan AI

Modul ini tidak memakai asisten AI untuk menulis kode; ia mempersiapkan Anda untuk `DW-PRO-M13`. Mengikuti silabus 9.1, pemakaian AI diajarkan setelah modul ini karena mengawasi keluaran AI membutuhkan kemampuan menelusuri kode, menulis uji, dan menjelaskan kode.

## Kesalahan umum

- **Mengubah banyak hal sekaligus.** Bila galat hilang, Anda tidak tahu perubahan mana yang berperan.
- **Memperbaiki gejala, bukan penyebab.** Mengembalikan daftar kosong agar galat diam tidak menyelesaikan data yang salah.
- **Uji yang hanya memeriksa kasus biasa.** Galat paling sering di kasus kosong, batas, dan nilai yang tidak ada.
- **Menghapus uji yang gagal.** Uji yang gagal adalah informasi; hapus hanya bila spesifikasinya memang berubah.
- **Uji tanpa pernah gagal.** Uji yang belum pernah Anda lihat gagal belum terbukti dapat menangkap galat.

## Cek mandiri

Tutup modul dan jawab:

1. Enam langkah menelusuri galat.
2. Apa yang diperiksa dan dilaporkan `python3 -m unittest`?
3. Mengapa uji ditulis sebelum perbaikan?

Gerbang kesiapan sebelum `DW-PRO-M13` (kerjakan tanpa asisten AI; daftar periksa kosong, tidak dikumpulkan):

- [ ] Saya dapat menelusuri program pendek dengan tabel nilai variabel.
- [ ] Saya dapat menulis satu uji yang gagal bila kode salah.
- [ ] Saya dapat menjelaskan kode dengan kata sendiri, baris demi baris.

## Kunci dan petunjuk

- **Cek awal:** (1) baris terakhir (jenis galat dan nilainya), lalu naik ke baris di kode sendiri; (2) `AssertionError` berarti hasil berbeda dari harapan, galat lain berarti kode meledak sebelum perbandingan; (3) di situlah galat paling sering; (4) reproduksi, perkecil, hipotesis, buktikan, perbaiki, jaga; (5) agar galat yang sama tidak kembali tanpa diketahui.
- **Prediksi:** diharapkan `[3.0, 5.0, 7.0]`; kode mengembalikan `[3.0, 5.0]`.
- **Setengah jadi:** `assertRaises` dan `assertEqual`. `assertTrue` pada daftar tak kosong selalu lolos, sehingga hasil yang salah tidak tertangkap.
- **Latihan 1:** dua uji gagal (`test_kasus_biasa`, `test_jendela_sama_dengan_panjang`); dua uji lain lolos karena `range` dengan batas negatif kosong.
- **Latihan 2:** `round(bagian * 100 / total, 1)`; `persen(1, 3)` memberi `33.3`; `total == 0` memunculkan `ValueError`.
- **Latihan 3:** hipotesis: kode pada pesanan tidak ada di daftar harga; bukti: cetak `kode` dan `daftar_harga.keys()`; satu perbaikan: kembalikan `(total, tidak_dikenal)` dan uji `harga_total({"B02": 2, "B99": 1}, HARGA) == (3000, ["B99"])` serta pesanan kosong `(0, [])`.
- **Latihan bercampur 1:** uji lolos mengikuti `cari_biner` dari `DW-PRO-M3`: kosong `None`, satu elemen `0`, ujung `0` dan `3`, tidak ada `None`.
- **Petunjuk bila macet:** jalankan satu uji saja dengan `python3 -m unittest uji_bergerak.UjiRataRataBergerak.test_kasus_biasa` dan cetak nilai `i` serta `potong` di setiap putaran.

## Langkah berikutnya

`DW-PRO-M13`: rekayasa perangkat lunak berbantuan AI. Kebiasaan modul ini (uji yang gagal dahulu, bukti sebelum perbaikan, penjelasan baris demi baris) menjadi cara Anda mengawasi kode dari asisten AI. `DW-PRO-M6` baru dipelajari sesudahnya (silabus 5.1).

## Catatan untuk pendamping

- **Waktu:** 10 jam, lima sesi dua jam. **Bahan:** Python 3, penyunting teks, terminal. Semua blok dijalankan penulis (Python 3.12.3): uji dengan `python3 -m unittest`; keluaran yang ditulis berupa cuplikan dari keluaran nyata. Contoh kunci latihan 2, 3, dan bercampur 1 juga dijalankan dan lolos.
- **Jembatan kuliah:** `I-lengkap` L, `I-awal` P, `U-lengkap` P (dasar: `KUL-U-101` C3, `KUL-I-101` C3, `KUL-I-204` C2). Bukti berupa tugas praktik singkat tanpa AI.
- **Unit SKKNI yang disentuh (judul saja, tidak menjamin kompetensi):** Melakukan Debugging (`J.620100.025.02`); Melaksanakan Pengujian Unit Program (`J.620100.033.02`). Salinan daftar unit belum terverifikasi terhadap berkas resmi.
- **Tanda siap lanjut:** peserta lolos tiga butir gerbang kesiapan tanpa AI.
