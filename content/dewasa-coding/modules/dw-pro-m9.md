## Untuk siapa modul ini

Modul ini untuk jalur **profesional** (`PRO`), 10 jam, sesudah `DW-PRO-M8`. Alatnya Python 3 (penulis memakai 3.12.3) dengan pustaka bawaan `http.server`, `urllib.request`, `json`, dan `tomllib`; modul ini memakai `gudang_db.py` dan `skema.sql` dari `DW-PRO-M7`. Estimasi lima sesi dua jam `[asumsi]`. Layanan hanya dijalankan di komputer Anda sendiri dan data berupa barang rekaan.

Jembatan kuliah-coding (silabus 6.2), per profil masuk: `I-lengkap` **lewati**, `I-awal` **wajib**, `U-lengkap` **padatkan**. Dasarnya `KUL-I-205` C2 dan `KUL-U-201` C2 (yang terakhir memakai API publik, bukan membuatnya). Jembatan bukan alih kredit dan bukan sertifikat.

## Cek awal pengalaman

Jawab tanpa melihat apa pun. Skor tidak dicatat.

1. Apa beda metode `GET` dan `POST`, dan mana yang tidak boleh mengubah data?
2. Apa arti kode status 200, 400, 404, dan 409?
3. Mengapa isian dari klien diperiksa di sisi layanan walaupun halaman sudah memeriksanya?
4. Apa yang ditaruh di berkas konfigurasi dan apa yang tidak boleh?
5. Mengapa layanan latihan dipasang di alamat `127.0.0.1`, bukan `0.0.0.0`?

Bila kelimanya benar, Anda boleh melewati "Contoh terselesaikan" dan "Contoh setengah jadi".

## Ingat kembali

1. (`DW-PRO-M8`) Mengapa teks dari data dinetralkan sebelum dipasang ke halaman?
2. (`DW-PRO-M6`) Sebutkan lima butir mengidentifikasi pustaka sebelum memakainya, dan kapan pustaka bawaan sudah cukup.
3. (`DW-PRO-M3`) Bagaimana Anda membandingkan dua solusi tanpa stopwatch (hitung langkah pada kasus terbaik, tengah, dan terburuk)?

Cocokkan: (1) data dapat memuat tag atau skrip yang akan dijalankan peramban; (2) kebutuhan, pustaka bawaan, keberadaan dan reputasi serta lisensi dan ukuran kebergantungan, pasang di lingkungan terpisah dengan versi tertentu, catat keputusan; bawaan cukup bila kebutuhan terpenuhi; (3) menghitung langkah dari masukan kecil sampai besar, bukan waktu mesin.

## Tujuan

Setelah modul ini Anda dapat membuat dan memanggil API sederhana, serta memakai berkas konfigurasi.

## Prediksi dulu

Stok `B02` adalah 3. Layanan di bawah dijelaskan di contoh. Tuliskan pasangan (kode status, isi) untuk lima permintaan berurutan: `GET /barang/B02`; `POST /barang/B02/keluar` dengan `{"jumlah": 2}`; permintaan yang sama sekali lagi; `POST` dengan `{"jumlah": "2"}`; `GET /barang/B99`.

## Contoh terselesaikan

Spesifikasi (Anda tulis lebih dulu): `GET /barang` mengembalikan daftar; `GET /barang/<kode>` satu barang atau 404; `POST /barang/<kode>/keluar` dengan badan JSON `{"jumlah": n}` mengurangi stok. Jumlah harus bilangan bulat positif (kalau tidak, 400), barang yang tidak ada 404, stok yang kurang 409 (benturan dengan keadaan sekarang). Alamat hanya yang cocok pola; badan dibatasi 1024 bita. Pengaturan alamat dan basis data ada di berkas konfigurasi, bukan di kode.

Konfigurasi (`konfigurasi.toml`). Berkas ini boleh masuk repositori karena tidak memuat rahasia; kata sandi atau kunci tidak ditaruh di sini:

```text
[server]
host = "127.0.0.1"
port = 8000

[basis_data]
path = "gudang.db"
```

Layanan (`api.py`). `http.server` cukup untuk belajar, tetapi dokumentasi Python menyatakan bahwa ia tidak disarankan untuk produksi karena hanya punya pemeriksaan keamanan dasar:

```python
import json
import re
import tomllib
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer

import gudang_db

POLA_BARANG = re.compile(r"^/barang/([A-Za-z0-9]{1,10})$")
POLA_KELUAR = re.compile(r"^/barang/([A-Za-z0-9]{1,10})/keluar$")
BATAS_BADAN = 1024


def muat_konfigurasi(path):
    with open(path, "rb") as berkas:
        return tomllib.load(berkas)


def buat_server(konfig):
    db_path = konfig["basis_data"]["path"]

    class Penangan(BaseHTTPRequestHandler):
        def _kirim(self, status, isi):
            data = json.dumps(isi).encode("utf-8")
            self.send_response(status)
            self.send_header("Content-Type", "application/json; charset=utf-8")
            self.send_header("Content-Length", str(len(data)))
            self.end_headers()
            self.wfile.write(data)

        def do_GET(self):
            conn = gudang_db.buka(db_path)
            try:
                if self.path == "/barang":
                    baris = conn.execute("SELECT kode, nama, stok FROM barang ORDER BY kode")
                    return self._kirim(200, [dict(b) for b in baris])
                cocok = POLA_BARANG.match(self.path)
                if not cocok:
                    return self._kirim(404, {"galat": "alamat tidak dikenal"})
                b = gudang_db.cari(conn, cocok.group(1))
                if b is None:
                    return self._kirim(404, {"galat": "barang tidak ada"})
                self._kirim(200, {"kode": b["kode"], "nama": b["nama"], "stok": b["stok"]})
            finally:
                conn.close()

        def do_POST(self):
            cocok = POLA_KELUAR.match(self.path)
            if not cocok:
                return self._kirim(404, {"galat": "alamat tidak dikenal"})
            try:
                panjang = int(self.headers.get("Content-Length", "0"))
                if not 0 < panjang <= BATAS_BADAN:
                    raise ValueError("ukuran badan")
                jumlah = json.loads(self.rfile.read(panjang))["jumlah"]
                if type(jumlah) is not int or jumlah <= 0:
                    raise ValueError("jumlah")
            except (ValueError, KeyError, TypeError):
                return self._kirim(400, {"galat": "isian tidak valid"})
            conn = gudang_db.buka(db_path)
            try:
                if gudang_db.cari(conn, cocok.group(1)) is None:
                    return self._kirim(404, {"galat": "barang tidak ada"})
                try:
                    gudang_db.keluarkan(conn, cocok.group(1), jumlah)
                except ValueError:
                    return self._kirim(409, {"galat": "stok tidak cukup"})
                stok = gudang_db.cari(conn, cocok.group(1))["stok"]
                self._kirim(200, {"kode": cocok.group(1), "stok": stok})
            finally:
                conn.close()

        def log_message(self, format, *args):
            pass

    return ThreadingHTTPServer((konfig["server"]["host"], konfig["server"]["port"]), Penangan)
```

Setiap permintaan membuka sambungan basis data sendiri karena `ThreadingHTTPServer` melayani tiap permintaan di utas berbeda. `log_message` sengaja dibisukan; pencatatan yang layak dibahas di `DW-PRO-M11`. Klien (`klien.py`) memanggil API dan mengembalikan pasangan (status, isi), termasuk saat layanan menjawab galat:

```python
import json
import urllib.error
import urllib.request


def panggil(basis, metode, jalur, badan=None):
    data = None if badan is None else json.dumps(badan).encode("utf-8")
    permintaan = urllib.request.Request(
        basis + jalur,
        data=data,
        method=metode,
        headers={"Content-Type": "application/json"},
    )
    try:
        with urllib.request.urlopen(permintaan, timeout=5) as jawaban:
            return jawaban.status, json.loads(jawaban.read())
    except urllib.error.HTTPError as galat:
        return galat.code, json.loads(galat.read())
```

Skrip pemakaian menyalakan layanan di port acak (`port = 0`) dengan basis data sementara, memanggil lima permintaan dari prediksi, lalu mematikannya:

```python
import tempfile
import threading
from pathlib import Path

import api
import gudang_db
from klien import panggil

with tempfile.TemporaryDirectory() as tmp:
    db = str(Path(tmp) / "contoh.db")
    conn = gudang_db.buka(db)
    gudang_db.buat_skema(conn)
    k = gudang_db.tambah_kategori(conn, "Listrik")
    gudang_db.tambah_barang(conn, "B02", "Baterai contoh", k, 3)
    conn.close()

    konfig = api.muat_konfigurasi("konfigurasi.toml")
    konfig["server"]["port"] = 0
    konfig["basis_data"]["path"] = db
    server = api.buat_server(konfig)
    threading.Thread(target=server.serve_forever, daemon=True).start()
    basis = f"http://127.0.0.1:{server.server_address[1]}"

    print(panggil(basis, "GET", "/barang/B02"))
    print(panggil(basis, "POST", "/barang/B02/keluar", {"jumlah": 2}))
    print(panggil(basis, "POST", "/barang/B02/keluar", {"jumlah": 2}))
    print(panggil(basis, "POST", "/barang/B02/keluar", {"jumlah": "2"}))
    print(panggil(basis, "GET", "/barang/B99"))
    server.shutdown()
    server.server_close()
```

```text
(200, {'kode': 'B02', 'nama': 'Baterai contoh', 'stok': 3})
(200, {'kode': 'B02', 'stok': 1})
(409, {'galat': 'stok tidak cukup'})
(400, {'galat': 'isian tidak valid'})
(404, {'galat': 'barang tidak ada'})
```

Uji otomatis (`uji_api.py`, dijalankan dengan `python3 -m unittest uji_api`, bukan `-I`) memakai layanan yang sama di port acak, enam uji untuk daftar, satu barang, `404`, `409`, `400` pada lima badan buruk (`-1`, `"3"`, `0`, kunci salah, bukan objek), dan barang tidak ada pada `POST`. Hasilnya `Ran 6 tests` lalu `OK`.

## Contoh setengah jadi

Lengkapi pemuat konfigurasi, lalu jalankan skrip pemakaian:

```python setengah-jadi
def muat_konfigurasi(path):
    with open(path, "___") as berkas:
        return tomllib.___(berkas)
```

Prediksi dulu: apa pesan galat bila lubang pertama diisi `"r"`?

## Latihan

1. **Ubah.** Sebuah tim memilih `422` untuk stok kurang. Ubah ujinya lebih dulu, lihat gagal, baru ubah kode, lalu tulis satu kalimat tentang kode mana yang Anda pilih dan mengapa.
2. **Buat.** Tulis uji dulu, lalu `POST /barang/<kode>/masuk` dengan aturan jumlah yang sama (tambahkan `masuk` ke `gudang_db`).
3. **Buat.** Tambahkan `[server] batas_badan = 1024` ke konfigurasi dan pakai nilainya dari berkas, bukan dari konstanta.
4. **Jelaskan.** Mengapa `type(jumlah) is not int` dipakai, padahal `True` juga dianggap bilangan bulat oleh `isinstance`? Mengapa alamat dicocokkan dengan pola, bukan langsung dipakai?
5. **Berpasangan (opsional).** Rancang tiga alamat API untuk modul `mutasi` bersama rekan sebelum menulis kode. Peserta mandiri boleh menulisnya sendiri dan membandingkannya esok hari.

## Latihan bercampur

1. (`DW-PRO-M8`) Rancang `fetch` dari `stok.ts` ke `GET /barang`; apa yang dilakukan halaman bila status bukan 200?
2. (`DW-PRO-M7`) Mengapa `keluarkan` memeriksa stok di dalam `UPDATE`, dan apa akibatnya pada dua permintaan `POST` yang datang bersamaan?

## Ulang berjarak

Tanpa melihat modul ini, kerjakan ulang dan cocokkan.

| Kapan | Pertanyaan |
| --- | --- |
| Satu minggu lagi | Sebut arti kode 200, 400, 404, dan 409, dan satu aturan validasi untuk badan `POST`. |
| Awal modul ke-4 berikutnya | Apa yang ditaruh di berkas konfigurasi dan apa yang tidak, dan mengapa `http.server` tidak dipakai di produksi? |
| Akhir jalur | Tulis dari ingatan kerangka fungsi klien yang memanggil API dan mengembalikan status serta isi, termasuk saat galat. |

## Kebijakan AI

Mengikuti kebijakan program (silabus 9.1) yang dipraktikkan di `DW-PRO-M13`. Bila Anda meminta asisten AI membuat API, tulis spesifikasi dan uji dulu, minta kode status dan batas ukuran badan, dan jangan menempel kunci, token, atau data pelanggan. Periksa nama pustaka yang diusulkan dan apakah layanan membuka alamat ke seluruh jaringan tanpa Anda minta. Catat alat, versi, dan perintah. Memakai AI tidak diwajibkan.

## Kesalahan umum

- **Menjawab semua galat dengan `200` atau `500`.** Klien tidak bisa membedakan salah isian (400), tidak ada (404), dan benturan (409).
- **Memercayai isian klien.** Halaman dapat dilewati; layanan memeriksa sendiri.
- **Menaruh rahasia di berkas konfigurasi yang di-commit.** Rahasia dibahas di `DW-PRO-M11`.
- **Memasang layanan di `0.0.0.0` demi kemudahan.** Layanan latihan terbuka bagi jaringan sekitar; pakai `127.0.0.1`.
- **Membuka berkas TOML dengan mode teks.** `tomllib` meminta mode biner.

## Cek mandiri

Tutup modul dan jawab:

1. Mengapa stok kurang diberi `409`, bukan `400`?
2. Apa yang dicegah pola alamat dan batas ukuran badan?
3. Apa akibatnya bila alamat layanan `0.0.0.0` dan Anda belum memeriksa isian?

Daftar periksa (kosong; Anda isi sendiri, tidak dikumpulkan):

- [ ] Spesifikasi alamat, isian, dan kode status tertulis sebelum kode.
- [ ] Setiap isian divalidasi di layanan.
- [ ] Konfigurasi di berkas, rahasia di luar repositori.
- [ ] Layanan latihan hanya di `127.0.0.1` dengan data sintetis.

## Kunci dan petunjuk

- **Cek awal:** (1) `GET` membaca dan tidak boleh mengubah; `POST` mengirim sesuatu untuk diproses; (2) berhasil, isian salah, tidak ada, benturan dengan keadaan; (3) klien dapat dipalsukan atau dilewati; (4) alamat, port, jalur berkas; bukan kata sandi dan kunci; (5) agar hanya komputer sendiri yang dapat menjangkau.
- **Prediksi:** `(200, {... 'stok': 3})`, `(200, {... 'stok': 1})`, `(409, ...)`, `(400, ...)`, `(404, ...)`.
- **Setengah jadi:** `rb` dan `load`. Dengan `"r"` muncul `TypeError` berpesan bahwa berkas harus dibuka dalam mode biner.
- **Cek mandiri:** (1) isian benar bentuknya, tetapi bertentangan dengan keadaan stok sekarang; (2) jalur aneh dan badan raksasa; (3) layanan dapat dijangkau seluruh jaringan dan menerima isian apa pun.
- **Latihan 4:** `isinstance(True, int)` bernilai benar, sehingga `{"jumlah": true}` lolos; pola alamat mencegah jalur aneh seperti `..`.
- **Latihan bercampur 1:** periksa `jawaban.ok`; bila tidak, tampilkan pesan dan jangan kosongkan tabel.
- **Latihan bercampur 2:** pemeriksaan dan pengurangan satu langkah, sehingga yang kedua mendapat 409 dan stok tidak negatif.
- **Petunjuk bila macet:** panggil API dengan `panggil` dari baris perintah dan cetak status serta isinya; uji satu alamat dulu.

## Langkah berikutnya

`DW-PRO-M10`: kolaborasi, tinjau kode dan pengujian lanjut. API ini menjadi bahan tinjauan sejawat dan uji integrasi yang lebih luas.

## Catatan untuk pendamping

- **Waktu:** 10 jam, lima sesi dua jam. **Bahan:** Python 3, terminal. Semua blok dijalankan penulis (Python 3.12.3): skrip pemakaian mencetak lima baris yang tertulis, enam uji `unittest` lolos (tiga detik karena `shutdown`), dan pesan galat mode teks `tomllib` dicoba. Dokumentasi `http.server` dibuka 2026-11-19.
- **Jembatan kuliah:** `I-lengkap` L, `I-awal` W, `U-lengkap` P (dasar `KUL-I-205` C2 dan `KUL-U-201` C2, silabus 6.2).
- **Unit SKKNI yang disentuh (judul saja, tidak menjamin kompetensi):** Mengimplementasikan Network Programming (`J.620100.027.01`); Menggunakan Library atau Komponen Pre-Existing (`J.620100.019.02`). Salinan daftar unit belum terverifikasi terhadap berkas resmi.
- **Tanda siap lanjut:** peserta menjelaskan pemilihan kode status dan menjalankan uji API.
