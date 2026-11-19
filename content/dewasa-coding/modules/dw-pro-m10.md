## Untuk siapa modul ini

Modul ini untuk jalur **profesional** (`PRO`), 10 jam, sesudah `DW-PRO-M9`. Alatnya Python 3 (penulis memakai 3.12.3), terminal, dan `gudang_db.py`, `skema.sql`, `api.py`, `klien.py`, `konfigurasi.toml` dari modul sebelumnya. Estimasi lima sesi dua jam `[asumsi]`. Semua kode dan data rekaan; "sejawat" di sini adalah kiriman rekaan, bukan orang nyata.

Jembatan kuliah-coding (silabus 6.2), per profil masuk: `I-lengkap` **lewati**, `I-awal` **wajib**, `U-lengkap` **wajib**. Dasarnya `KUL-I-204` C2 dan C3 serta `KUL-I-401`. Jembatan bukan alih kredit dan bukan sertifikat.

## Cek awal pengalaman

Jawab tanpa melihat apa pun. Skor tidak dicatat.

1. Apa yang diperiksa peninjau selain "apakah jalan"?
2. Apa beda uji unit dan uji integrasi?
3. Mengapa pengurangan stok dan penambahan stok dalam satu perpindahan harus dibungkus satu transaksi?
4. Apa yang bisa ditemukan analisis statis, dan apa yang tidak?
5. Bagaimana menulis komentar tinjauan yang tidak menyerang penulisnya?

Bila kelimanya benar, Anda boleh melewati "Contoh terselesaikan" dan "Contoh setengah jadi".

## Ingat kembali

1. (`DW-PRO-M9`) Mengapa layanan memeriksa sendiri isian walaupun halaman sudah memeriksanya?
2. (`DW-PRO-M13`) Sebut empat hal yang diperiksa pada tinjauan kode hasil AI dan tiga hal sebelum memasang paket baru.
3. (`DW-PRO-M5`) Sebutkan enam langkah menelusuri galat dan mengapa uji yang menemukan galat disimpan.
4. (`DW-PRO-M4`) Apa guna `if __name__ == "__main__":` dan apa isi minimal docstring yang membantu orang lain meninjau kode Anda?

Cocokkan: (1) halaman dapat dilewati atau dipalsukan; (2) kebenaran, keamanan, kebergantungan, pemahaman; keberadaan, reputasi, pemasangan di lingkungan terpisah dengan versi tertentu; (3) reproduksi, perkecil, hipotesis, buktikan, perbaiki satu hal, simpan uji; uji disimpan agar galat yang sama tidak kembali tanpa disadari; (4) kode di bawahnya hanya jalan bila berkas dijalankan langsung; ringkasan satu baris dan perilaku pada batas.

## Tujuan

Setelah modul ini Anda dapat meninjau kode sejawat, menulis uji integrasi, dan memakai analisis kode statis.

## Prediksi dulu

Sejawat mengirim fungsi `pindah_stok` di bawah (di contoh). Sebelum menjalankan apa pun, tulis daftar masalah sebanyak yang Anda temukan (target empat atau lebih), lalu prediksi: stok `B02` awal 3, dipindahkan 2 unit ke kode `B99` yang tidak ada; berapa stok `B02` sesudahnya, dan apa yang dicetak?

## Contoh terselesaikan

### Tinjauan

Urutan tinjauan: tujuan perubahan, kode, jalankan, uji, komentar. Kiriman rekaan (`pindah_awal.py`) menjanjikan "memindahkan stok antar barang":

```python
def pindah_stok(conn, dari, ke, jumlah):
    try:
        conn.execute("UPDATE barang SET stok = stok - " + str(jumlah) + " WHERE kode = '" + dari + "'")
        conn.execute("UPDATE barang SET stok = stok + ? WHERE kode = ?", (jumlah, ke))
        conn.commit()
    except:
        print("gagal")
```

Dijalankan dengan tiga barang (`B02` 3, `B05` 7, `B09` 12), pemanggilan pertama `pindah_stok(conn, "B02", "B99", 2)`, yang kedua dengan `dari` berisi `B02' OR '1'='1` dan pindah 1 unit ke `B05`, masing-masing pada basis baru:

```text
[('B02', 1), ('B05', 7), ('B09', 12)]
[('B02', 2), ('B05', 7), ('B09', 11)]
```

Pada yang pertama dua unit lenyap (tujuan tidak ada dan tidak ada galat) dan tidak ada yang tercetak. Pada yang kedua `B09` ikut berkurang: nilai `dari` menjadi bagian perintah. Komentar tinjauan ditulis berupa apa yang terlihat, mengapa penting, dan saran, dengan tingkat yang jelas:

- **Harus diperbaiki** (baris 3): nilai disambung ke SQL; pakai `?`. Tampak pada `B09` yang ikut berkurang.
- **Harus diperbaiki** (baris 3-5): pengurangan dan penambahan terpisah tanpa transaksi; bila tujuan tidak ada, stok hilang. Pakai `with conn:` dan periksa `rowcount`.
- **Harus diperbaiki** (baris 6-7): `except:` menelan semua galat dan hanya mencetak "gagal"; penelepon tidak tahu. Tangkap galat tertentu atau biarkan naik.
- **Harus diperbaiki**: `jumlah` tidak divalidasi (nol, negatif, teks).
- **Saran**: tulis uji dahulu, sertakan docstring, dan jangan `print` di kode pustaka. Kalimat contoh: "Bagaimana bila `ke` tidak ada? Pada percobaan saya stok asal tetap berkurang."

Penulis memperbaiki; Anda meninjau perbaikannya, bukan menggantikannya, dan tidak menyetujui kode yang tidak Anda pahami.

### Uji lebih dulu, lalu perbaikan

Uji tinjauan (`uji_pindah.py`) menangkap temuan; dua dari tiga ujinya gagal pada kiriman awal:

```python
import unittest

import gudang_db
from pindah import pindah_stok


class UjiPindah(unittest.TestCase):
    def setUp(self):
        self.conn = gudang_db.buka()
        gudang_db.buat_skema(self.conn)
        k = gudang_db.tambah_kategori(self.conn, "Listrik")
        gudang_db.tambah_barang(self.conn, "B02", "Baterai contoh", k, 3)
        gudang_db.tambah_barang(self.conn, "B05", "Lampu contoh", k, 7)

    def stok(self):
        baris = self.conn.execute("SELECT stok FROM barang ORDER BY kode")
        return [b["stok"] for b in baris]

    def test_berhasil(self):
        pindah_stok(self.conn, "B02", "B05", 2)
        self.assertEqual(self.stok(), [1, 9])

    def test_tujuan_tidak_ada_membatalkan_semua(self):
        with self.assertRaises(ValueError):
            pindah_stok(self.conn, "B02", "B99", 2)
        self.assertEqual(self.stok(), [3, 7])

    def test_masukan_tidak_valid_ditolak(self):
        kasus = [("B02", "B05", 0), ("B02", "B05", "2"), ("B02", "B05", 4), ("B02", "B02", 1)]
        kasus.append(("B02' OR '1'='1", "B05", 1))
        for dari, ke, jumlah in kasus:
            with self.assertRaises(ValueError, msg=(dari, ke, jumlah)):
                pindah_stok(self.conn, dari, ke, jumlah)
        self.assertEqual(self.stok(), [3, 7])


if __name__ == "__main__":
    unittest.main()
```

Perbaikannya (`pindah.py`). Galat di dalam `with conn:` membatalkan pengurangan yang sudah terjadi:

```python
def pindah_stok(conn, dari, ke, jumlah):
    """Pindahkan stok antar barang dalam satu transaksi."""
    if type(jumlah) is not int or jumlah <= 0:
        raise ValueError("jumlah harus bilangan bulat positif")
    if dari == ke:
        raise ValueError("asal dan tujuan sama")
    with conn:
        kurang = conn.execute(
            "UPDATE barang SET stok = stok - ? WHERE kode = ? AND stok >= ?",
            (jumlah, dari, jumlah),
        )
        if kurang.rowcount == 0:
            raise ValueError("asal tidak ada atau stok tidak cukup")
        tambah = conn.execute(
            "UPDATE barang SET stok = stok + ? WHERE kode = ?",
            (jumlah, ke),
        )
        if tambah.rowcount == 0:
            raise ValueError("tujuan tidak ada")
```

`python3 -m unittest uji_pindah` menjalankan tiga uji: `OK`.

### Uji integrasi

Uji unit memeriksa satu unit; uji integrasi menjalankan beberapa bagian bersama: berkas basis data sungguhan, `pindah_stok`, dan API dari `DW-PRO-M9`, dengan sambungan terpisah. `uji_integrasi.py`:

```python
import tempfile
import threading
import unittest
from pathlib import Path

import api
import gudang_db
from klien import panggil
from pindah import pindah_stok


class UjiIntegrasi(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        self.db = str(Path(self.tmp.name) / "uji.db")
        conn = gudang_db.buka(self.db)
        gudang_db.buat_skema(conn)
        k = gudang_db.tambah_kategori(conn, "Listrik")
        gudang_db.tambah_barang(conn, "B02", "Baterai contoh", k, 3)
        gudang_db.tambah_barang(conn, "B05", "Lampu contoh", k, 7)
        conn.close()
        konfig = api.muat_konfigurasi("konfigurasi.toml")
        konfig["server"]["port"] = 0
        konfig["basis_data"]["path"] = self.db
        self.server = api.buat_server(konfig)
        threading.Thread(target=self.server.serve_forever, daemon=True).start()
        self.basis = f"http://127.0.0.1:{self.server.server_address[1]}"

    def tearDown(self):
        self.server.shutdown()
        self.server.server_close()
        self.tmp.cleanup()

    def stok_api(self):
        return [b["stok"] for b in panggil(self.basis, "GET", "/barang")[1]]

    def test_pindah_terlihat_di_api(self):
        conn = gudang_db.buka(self.db)
        pindah_stok(conn, "B02", "B05", 2)
        conn.close()
        self.assertEqual(self.stok_api(), [1, 9])

    def test_gagal_setelah_api_keluar_tidak_mengubah(self):
        panggil(self.basis, "POST", "/barang/B05/keluar", {"jumlah": 5})
        conn = gudang_db.buka(self.db)
        with self.assertRaises(ValueError):
            pindah_stok(conn, "B05", "B02", 3)
        conn.close()
        self.assertEqual(self.stok_api(), [3, 2])
```

Keduanya lolos (`python3 -m unittest uji_integrasi`: `Ran 2 tests`, `OK`).

### Analisis kode statis

Analisis statis membaca kode tanpa menjalankannya. Pemeriksa mini dari `ast` ini (`pemeriksa.py`) mencari tiga pola dari tinjauan tadi, dan keluar dengan kode 1 bila ada temuan, sehingga dapat menjadi gerbang:

```python
import ast
import sys


def periksa(sumber):
    pohon = ast.parse(sumber)
    temuan = []
    for simpul in ast.walk(pohon):
        if isinstance(simpul, ast.ExceptHandler) and simpul.type is None:
            temuan.append(f"baris {simpul.lineno}: except tanpa jenis galat")
        if (
            isinstance(simpul, ast.Call)
            and isinstance(simpul.func, ast.Attribute)
            and simpul.func.attr == "execute"
            and simpul.args
            and isinstance(simpul.args[0], (ast.BinOp, ast.JoinedStr))
        ):
            temuan.append(f"baris {simpul.lineno}: SQL disusun dengan penyambungan teks")
        if isinstance(simpul, ast.Call) and getattr(simpul.func, "id", "") == "print":
            temuan.append(f"baris {simpul.lineno}: print di kode pustaka")
    return sorted(temuan, key=lambda t: int(t.split()[1].rstrip(":")))


if __name__ == "__main__":
    ada = False
    for path in sys.argv[1:]:
        with open(path, encoding="utf-8") as berkas:
            for catatan in periksa(berkas.read()):
                print(f"{path}: {catatan}")
                ada = True
    sys.exit(1 if ada else 0)
```

```text
pindah_awal.py: baris 3: SQL disusun dengan penyambungan teks
pindah_awal.py: baris 6: except tanpa jenis galat
pindah_awal.py: baris 7: print di kode pustaka
```

`python3 pemeriksa.py pindah.py` tidak mencetak apa pun. Pemeriksa ini tidak menemukan transaksi yang hilang atau validasi yang kurang; itu tetap tugas uji dan peninjau. Alat sungguhan dapat dipasang bila tim memilihnya.

## Contoh setengah jadi

Tambahkan pemeriksaan "galat ditelan diam-diam" ke `periksa`, yaitu penangan galat yang isinya hanya `pass`, lalu coba pada contoh `try: x()` dengan `except ValueError: pass`:

```python setengah-jadi
        if isinstance(simpul, ast.ExceptHandler) and all(isinstance(s, ast.___) for s in simpul.body):
            temuan.append(f"baris {simpul.lineno}: galat ditelan diam-diam")
```

Prediksi dulu: apakah `except:` bertubuh `pass` ditandai oleh pemeriksaan ini?

## Latihan

1. **Ubah.** Ubah spesifikasi: `pindah_stok` mengembalikan stok akhir asal dan tujuan sebagai pasangan. Ubah ujinya lebih dulu, lihat gagal, baru ubah kode.
2. **Buat.** Tulis tinjauan (lima komentar dengan tingkat harus atau saran) untuk kode rekaan buatan sendiri yang sengaja berisi tiga kekeliruan, lalu tinggalkan sehari, lalu baca catatan Anda dan tebak kekeliruannya tanpa melihat kodenya.
3. **Buat.** Tambahkan satu uji integrasi: setelah `POST /barang/B05/keluar` berhasil, `pindah_stok` memindahkan sisanya, dan `GET /barang` memperlihatkan nilai akhir.
4. **Jelaskan.** Mengapa uji integrasi sebaiknya sedikit, dan mengapa uji `test_tujuan_tidak_ada_membatalkan_semua` dibuat sebagai uji unit?
5. **Berpasangan (opsional).** Tinjau kode rekan dengan urutan di atas dan tulis komentar sebagai pertanyaan. Peserta mandiri boleh meninjau kodenya sendiri seminggu kemudian.

## Latihan bercampur

1. (`DW-PRO-M7`) Tinjau `keluarkan` di `gudang_db.py`: apa yang Anda periksa dari sisi transaksi, `?`, dan batasan skema?
2. (`DW-PRO-M13`) Draf AI untuk `pindah_stok` memuat `import requests` yang tidak dipakai. Tulis komentar tinjauan dan langkah yang Anda ambil sebelum paket itu dipasang.

## Ulang berjarak

Tanpa melihat modul ini, kerjakan ulang dan cocokkan.

| Kapan | Pertanyaan |
| --- | --- |
| Satu minggu lagi | Sebut urutan tinjauan kode dan tiga tingkat komentar, dan mengapa komentar ditulis berupa pertanyaan atau pengamatan. |
| Awal modul ke-4 berikutnya | Apa beda uji unit dan uji integrasi, dan satu hal yang tidak ditemukan analisis statis? |
| Akhir jalur | Tulis dari ingatan fungsi yang memindahkan stok dalam satu transaksi dan tiga uji untuk batasnya. |

## Kebijakan AI

Mengikuti kebijakan program (silabus 9.1) yang dipraktikkan di `DW-PRO-M13`. Kode hasil AI ditinjau seperti kode sejawat dengan daftar periksa yang sama, dan lebih ketat pada nama paket yang tidak dikenal. Jangan menempel kode kantor atau data pelanggan ke asisten untuk "meminta tinjauan"; hanya kode sintetis atau milik Anda sendiri. Catat alat, versi, dan perintah. Kode yang tidak dapat dijelaskan peninjau tidak digabung. Memakai AI tidak diwajibkan.

## Kesalahan umum

- **Meninjau hanya gaya.** Kebenaran, keamanan, dan uji lebih dulu.
- **Komentar yang menyerang orang.** Tulis tentang kode dan perilakunya.
- **Mempercayai analisis statis yang bersih.** Ia hanya menemukan pola yang diprogramkan.
- **Uji integrasi sebagai pengganti uji unit.** Penyebab galat sulit dilacak, dan ujinya lambat.
- **Menelan galat demi "tidak merusak program".** Galat yang hilang tampak sebagai data yang salah di tempat lain.

## Cek mandiri

Tutup modul dan jawab:

1. Tiga masalah pada kiriman awal dan satu komentar tinjauan untuk salah satunya.
2. Apa yang dibuktikan uji integrasi yang tidak dibuktikan uji unit?
3. Apa yang diperiksa dan tidak diperiksa pemeriksa mini?

Daftar periksa (kosong; Anda isi sendiri, tidak dikumpulkan):

- [ ] Saya membaca tujuan perubahan dan menjalankan kodenya sebelum berkomentar.
- [ ] Komentar saya bertingkat (harus atau saran) dan menyebut buktinya.
- [ ] Temuan tinjauan saya jadikan uji dan saya simpan.
- [ ] Saya tidak menyetujui kode yang tidak saya pahami.

## Kunci dan petunjuk

- **Cek awal:** (1) kebenaran, keamanan, uji, keterbacaan, dan ukuran perubahan; (2) unit satu bagian terpisah, integrasi beberapa bagian nyata bersama; (3) agar keduanya berhasil bersama atau tidak sama sekali; (4) pola yang diprogramkan tanpa menjalankan kode, bukan logika yang salah; (5) tulis tentang kode, beri bukti dan saran.
- **Prediksi:** stok `B02` menjadi 1, dua unit hilang, dan tidak ada yang tercetak karena tidak ada galat yang memicu `except`; daftar masalah: injeksi, tanpa transaksi, `except:` tanpa jenis, validasi `jumlah`, `print` di pustaka, tanpa uji.
- **Setengah jadi:** `Pass`. `except:` bertubuh `pass` ditandai dua kali (tanpa jenis dan ditelan), dan itu wajar.
- **Latihan 4:** integrasi lambat dan sulit dilacak sumber galatnya; uji unit pada transaksi cukup cepat dan menunjuk langsung ke fungsinya.
- **Latihan bercampur 1:** `?` dipakai, syarat `stok >= ?` ada dalam `UPDATE`, `with conn:` membungkus, dan `CHECK` skema menjadi lapis kedua.
- **Latihan bercampur 2:** impor yang tidak dipakai dibuang atau tidak dipasang; periksa keberadaan, reputasi, dan lisensi sebelum pemasangan di lingkungan terpisah.
- **Petunjuk bila macet:** jalankan satu uji dan cetak `self.stok()`; untuk integrasi, panggil API dengan `panggil` dan cetak jawabannya.

## Langkah berikutnya

`DW-PRO-M11`: konfigurasi, pencatatan, dan operasi dasar. Pesan "gagal" yang dicetak sejawat adalah awal dari kebutuhan log yang layak.

## Catatan untuk pendamping

- **Waktu:** 10 jam, lima sesi dua jam. **Bahan:** Python 3, terminal. Semua blok dijalankan penulis (Python 3.12.3): dua keluaran kiriman awal, tiga uji unit dan dua uji integrasi lolos pada kode perbaikan, dua dari tiga uji unit gagal pada kiriman awal, dan pemeriksa mencetak tiga temuan pada kiriman awal dan nol pada perbaikan.
- **Jembatan kuliah:** `I-lengkap` L, `I-awal` W, `U-lengkap` W (dasar `KUL-I-204` C2 dan C3, `KUL-I-401`; silabus 6.2).
- **Unit SKKNI yang disentuh (judul saja, tidak menjamin kompetensi):** Menerapkan Code Review (`J.620100.032.01`); Melaksanakan Pengujian Integrasi Program (`J.620100.034.02`); Melaksanakan Pengujian Kode Program Secara Statis (`J.620100.036.02`). Salinan daftar unit belum terverifikasi terhadap berkas resmi.
- **Tanda siap lanjut:** peserta menulis komentar bertingkat dengan bukti dan menjalankan uji integrasi.
