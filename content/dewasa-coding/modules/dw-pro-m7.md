## Untuk siapa modul ini

Modul ini untuk jalur **profesional** (`PRO`), 10 jam, sesudah `DW-PRO-M6`. Alatnya Python 3 (penulis memakai 3.12.3) dengan modul bawaan `sqlite3` (SQLite 3.45.1 di mesin penulis), penyunting teks, dan terminal; tanpa server basis data dan tanpa pemasangan paket. Estimasi lima sesi dua jam `[asumsi]`. Semua data adalah barang rekaan; tabel gudang di sini melanjutkan kelas `Gudang` dari `DW-PRO-M6`.

Jembatan kuliah-coding (silabus 6.2), per profil masuk: `I-lengkap` **padatkan**, `I-awal` **wajib**, `U-lengkap` **wajib**. Dasarnya hanya `KUL-I-202` C2 (SQL); akses basis data dari kode tidak dinyatakan di CPMK kuliah. Jembatan bukan alih kredit dan bukan sertifikat.

## Cek awal pengalaman

Jawab tanpa melihat apa pun. Skor tidak dicatat.

1. Apa fungsi kunci primer dan kunci asing?
2. Apa beda `INNER JOIN` dan `LEFT JOIN`?
3. Mengapa nilai dari pengguna dititipkan ke kueri lewat tanda tanya (`?`), bukan disambung ke teks SQL?
4. Apa yang dijamin transaksi saat dua `UPDATE` harus berhasil bersama?
5. Apa guna indeks, dan apa harganya?

Bila kelimanya benar, Anda boleh melewati "Contoh terselesaikan" dan "Contoh setengah jadi".

## Ingat kembali

1. (`DW-PRO-M6`) Mengapa keadaan objek diubah hanya lewat metode yang menolak nilai tidak valid, dan apa akibat `b = a` pada dua nama untuk satu objek?
2. (`DW-PRO-M3`) Kapan Anda memilih kamus berkunci dibanding daftar untuk mencari data, dan apa akibat memakai pencarian biner pada data yang belum berurutan?
3. (`DW-FND-M1`) Di mana kata sandi dan kunci API tidak boleh berada?

Cocokkan: (1) agar aturan tidak terlewati; `b = a` tidak menyalin, keduanya menunjuk objek sama; (2) kamus untuk mencari lewat kunci tanpa menyisir; pencarian biner pada data tak berurutan memberi hasil salah tanpa peringatan; (3) di berkas kode, repositori, tangkapan layar, dan permintaan ke asisten AI.

## Tujuan

Setelah modul ini Anda dapat merancang skema dan relasi antar tabel, menulis kueri SQL, serta mengakses basis data dari kode dengan aman.

## Prediksi dulu

Tabel `kategori` berisi `Listrik`, `Alat tulis`, dan `Kosong` (tanpa barang); `barang` berisi tiga barang `Listrik` (stok 3, 7, 12) dan satu barang `Alat tulis` (stok 40). Sebelum membaca hasilnya, tuliskan: berapa baris dikembalikan kueri berikut, dan apa isi baris `Kosong`? Lalu: berapa baris bila `LEFT JOIN` diganti `JOIN`?

```sql
SELECT k.nama, COUNT(b.kode), COALESCE(SUM(b.stok), 0)
FROM kategori k
LEFT JOIN barang b ON b.kategori_id = k.id
GROUP BY k.id
ORDER BY k.nama;
```

## Contoh terselesaikan

Anda menulis rancangan lebih dulu: satu kategori punya banyak barang (relasi satu-ke-banyak), maka tabel `barang` memegang kunci asing ke `kategori`. Aturan yang boleh dijaga basis data (kode unik, stok tidak negatif, kategori harus ada) dipindahkan dari kode ke skema, karena skema berlaku untuk semua program yang menulis ke basis data itu. Berkas `skema.sql`:

```sql
CREATE TABLE kategori (
    id   INTEGER PRIMARY KEY,
    nama TEXT NOT NULL UNIQUE
);

CREATE TABLE barang (
    kode        TEXT PRIMARY KEY,
    nama        TEXT NOT NULL,
    kategori_id INTEGER NOT NULL REFERENCES kategori(id),
    stok        INTEGER NOT NULL DEFAULT 0 CHECK (stok >= 0)
);

CREATE INDEX idx_barang_kategori ON barang(kategori_id);
```

Kode akses (`gudang_db.py`) memakai pustaka standar. Tiga kebiasaan: kunci asing dinyalakan di **tiap koneksi** (SQLite mematikannya secara bawaan), nilai dititipkan lewat `?`, dan perubahan dibungkus `with conn:` sehingga satu transaksi berhasil seluruhnya atau dibatalkan seluruhnya.

```python
import sqlite3
from pathlib import Path

SKEMA = Path(__file__).with_name("skema.sql")


def buka(path=":memory:"):
    conn = sqlite3.connect(path)
    conn.execute("PRAGMA foreign_keys = ON")
    conn.row_factory = sqlite3.Row
    return conn


def buat_skema(conn):
    conn.executescript(SKEMA.read_text(encoding="utf-8"))


def tambah_kategori(conn, nama):
    with conn:
        return conn.execute("INSERT INTO kategori (nama) VALUES (?)", (nama,)).lastrowid


def tambah_barang(conn, kode, nama, kategori_id, stok=0):
    with conn:
        conn.execute(
            "INSERT INTO barang (kode, nama, kategori_id, stok) VALUES (?, ?, ?, ?)",
            (kode, nama, kategori_id, stok),
        )


def cari(conn, kode):
    return conn.execute("SELECT * FROM barang WHERE kode = ?", (kode,)).fetchone()


def ringkas_kategori(conn):
    return conn.execute(
        """
        SELECT k.nama AS kategori, COUNT(b.kode) AS jenis, COALESCE(SUM(b.stok), 0) AS total
        FROM kategori k
        LEFT JOIN barang b ON b.kategori_id = k.id
        GROUP BY k.id
        ORDER BY k.nama
        """
    ).fetchall()
```

Pengisian dan pemakaian (`contoh.py`). Fungsi `keluarkan` yang dipakainya Anda lengkapi di "Contoh setengah jadi"; keluaran di bawah adalah keluaran sesudah fungsi itu lengkap:

```python
import gudang_db

conn = gudang_db.buka()
gudang_db.buat_skema(conn)
listrik = gudang_db.tambah_kategori(conn, "Listrik")
tulis = gudang_db.tambah_kategori(conn, "Alat tulis")
gudang_db.tambah_kategori(conn, "Kosong")
gudang_db.tambah_barang(conn, "B02", "Baterai contoh", listrik, 3)
gudang_db.tambah_barang(conn, "B05", "Lampu contoh", listrik, 7)
gudang_db.tambah_barang(conn, "B09", "Saklar contoh", listrik, 12)
gudang_db.tambah_barang(conn, "B11", "Pensil contoh", tulis, 40)

for baris in gudang_db.ringkas_kategori(conn):
    print(tuple(baris))
gudang_db.keluarkan(conn, "B02", 2)
print(gudang_db.cari(conn, "B02")["stok"])
try:
    gudang_db.keluarkan(conn, "B02", 5)
except ValueError as galat:
    print("ditolak:", galat, gudang_db.cari(conn, "B02")["stok"])
```

```text
('Alat tulis', 1, 40)
('Kosong', 0, 0)
('Listrik', 3, 22)
1
ditolak: kode tidak ada atau stok tidak cukup 1
```

Pada `keluarkan`, kondisi `stok >= ?` ikut di dalam `UPDATE` supaya pemeriksaan dan pengurangan terjadi dalam satu langkah; memeriksa dulu dengan `SELECT` lalu mengurangi terpisah membuka celah bila dua proses jalan bersamaan. `COALESCE` mengganti `NULL` dari `SUM` kategori kosong menjadi 0.

## Contoh setengah jadi

Lengkapi fungsi `keluarkan` di `gudang_db.py`, lalu jalankan `contoh.py`:

```python setengah-jadi
def keluarkan(conn, kode, jumlah):
    if jumlah <= 0:
        raise ValueError("jumlah harus positif")
    with conn:
        cur = conn.execute(
            "UPDATE barang SET stok = stok - ? WHERE kode = ? AND stok ___ ?",
            (jumlah, kode, jumlah),
        )
        if cur.rowcount ___ 0:
            raise ValueError("kode tidak ada atau stok tidak cukup")
```

Prediksi dulu: berapa stok `B02` bila Anda menulis `>` pada lubang pertama dan meminta 3 dari stok 3?

## Latihan

1. **Ubah.** Tambahkan kolom `harga INTEGER NOT NULL CHECK (harga >= 0)` dengan cara yang tidak menghapus data (`ALTER TABLE ... ADD COLUMN ... DEFAULT 0`), lalu tulis kueri nilai stok per kategori (`SUM(stok * harga)`).
2. **Buat.** Tulis uji lebih dulu, lalu fungsi `barang_menipis(conn, ambang)` yang mengembalikan kode dan nama barang berstok kurang dari `ambang`, terurut menurut stok lalu kode.
3. **Buat.** Rancang tabel `mutasi` (kode barang, jumlah, jenis `masuk` atau `keluar`, waktu) dengan kunci asing dan batasan `CHECK`; gambar relasinya sebagai tiga baris teks.
4. **Jelaskan.** Mengapa `ringkas_kategori` memakai `LEFT JOIN`? Mengapa `PRAGMA foreign_keys` harus diulang di tiap koneksi? Jalankan `EXPLAIN QUERY PLAN` pada kueri `WHERE kategori_id = 1` dan baca apakah indeks dipakai.
5. **Berpasangan (opsional).** Tukar rancangan tabel nomor 3 dengan rekan dan cari satu aturan yang belum dijaga skemanya. Peserta mandiri boleh meninjau rancangannya sendiri esok hari.

## Latihan bercampur

1. (`DW-PRO-M6`) Bungkus akses di atas menjadi kelas `GudangDB` dengan metode `tambah`, `cari`, dan `keluarkan`; tulis spesifikasi dan ujinya dulu.
2. (`DW-PRO-M5`) Uji `test_kategori_tidak_ada_ditolak` gagal karena tidak ada galat. Tulis enam langkah penelusuran dan sebut baris pertama yang Anda curigai.

## Ulang berjarak

Tanpa melihat modul ini, kerjakan ulang dan cocokkan.

| Kapan | Pertanyaan |
| --- | --- |
| Satu minggu lagi | Mengapa nilai dititipkan lewat `?` dan apa yang terjadi bila disambung ke teks SQL? |
| Awal modul ke-4 berikutnya | Kapan `LEFT JOIN` dipakai, dan apa yang hilang bila memakai `JOIN`? |
| Akhir jalur | Tulis dari ingatan skema dua tabel dengan kunci asing dan satu `CHECK`, lalu satu fungsi yang mengubah stok dalam transaksi. |

## Kebijakan AI

Mengikuti kebijakan program (silabus 9.1) yang dipraktikkan di `DW-PRO-M13`. Bila Anda meminta asisten AI menulis kueri, kirim skema dan data sintetis saja, bukan basis data nyata. Keluaran adalah draf: periksa apakah ia menyambung teks ke SQL (kerentanan injeksi) dan jalankan terhadap data uji. Catat alat, versi, dan perintah. Memakai AI tidak diwajibkan.

## Kesalahan umum

- **Menyambung nilai ke teks SQL.** Masukan `x' OR '1'='1` mengubah arti kueri; pada basis contoh, penyambungan mengembalikan 1 baris dan `?` mengembalikan 0.
- **Lupa menyalakan kunci asing.** Tanpa `PRAGMA foreign_keys = ON`, baris `B99` dengan kategori 999 masuk begitu saja.
- **Memakai `JOIN` padahal butuh semua kategori.** Baris tanpa pasangan hilang diam-diam.
- **Memeriksa lalu mengubah di dua langkah.** Dua proses bisa menyelip di antaranya; pindahkan syarat ke `UPDATE`.
- **Mengira indeks selalu menolong.** Indeks mempercepat pencarian tetapi memperlambat penulisan dan memakai ruang.

## Cek mandiri

Tutup modul dan jawab:

1. Mengapa aturan stok tidak negatif ditaruh di skema, bukan hanya di kode?
2. Apa yang dijamin `with conn:`?
3. Apa yang Anda pilih antara `JOIN` dan `LEFT JOIN` untuk daftar "semua kategori beserta jumlah barangnya"?

Daftar periksa (kosong; Anda isi sendiri, tidak dikumpulkan):

- [ ] Nilai dari luar selalu lewat `?`.
- [ ] Kunci asing dinyalakan di tiap koneksi.
- [ ] Perubahan berkait dibungkus satu transaksi.
- [ ] Data uji sintetis dan basis data nyata tidak ikut ke repositori.

## Kunci dan petunjuk

- **Cek awal:** (1) kunci primer mengenali satu baris, kunci asing menautkan ke baris tabel lain; (2) `JOIN` hanya baris yang berpasangan, `LEFT JOIN` semua baris kiri; (3) agar nilai selalu dianggap data, bukan bagian perintah; (4) semua berhasil atau tidak satu pun; (5) mempercepat pencarian, menambah ruang dan beban penulisan.
- **Prediksi:** tiga baris: `Alat tulis 1 40`, `Kosong 0 0`, `Listrik 3 22`. Dengan `JOIN`: dua baris, `Kosong` hilang.
- **Setengah jadi:** `>=` lalu `==`; tanda `?` ketiga adalah `jumlah` yang sama dengan pengurang. Dengan `>`, permintaan 3 dari stok 3 ditolak dan stok tetap 3.
- **Latihan 2:** kueri `WHERE stok < ? ORDER BY stok, kode`; uji kasus ambang 0 (kosong) dan stok persis sama dengan ambang (tidak ikut).
- **Latihan 4:** supaya kategori tanpa barang tetap tampil; pengaturan kunci asing berlaku per koneksi; rencana menyebut `SEARCH barang USING INDEX idx_barang_kategori`.
- **Latihan bercampur 2:** reproduksi, perkecil, hipotesis (kunci asing mati), buktikan dengan `PRAGMA foreign_keys`, perbaiki satu hal, simpan uji.
- **Petunjuk bila macet:** cetak `tuple(baris)` dari tiap kueri dan jalankan SQL satu per satu.

## Langkah berikutnya

`DW-PRO-M8`: antarmuka web. Data stok yang kini ada di basis data akan ditampilkan sebagai halaman yang dapat dibaca dan disaring di peramban.

## Catatan untuk pendamping

- **Waktu:** 10 jam, lima sesi dua jam. **Bahan:** Python 3 dengan `sqlite3`, penyunting teks, terminal. Semua blok Python dan SQL dijalankan penulis (Python 3.12.3, SQLite 3.45.1): `contoh.py` mencetak keluaran yang tertulis, lima uji `unittest` lolos, dan kebenaran klaim kesalahan umum (injeksi 1 baris dibanding 0, `B99` masuk tanpa kunci asing, rencana memakai indeks) dicoba sendiri.
- **Jembatan kuliah:** `I-lengkap` P, `I-awal` W, `U-lengkap` W (dasar `KUL-I-202` C2; akses dari kode tidak dinyatakan di CPMK, silabus 6.2).
- **Unit SKKNI yang disentuh (judul saja, tidak menjamin kompetensi):** Menggunakan SQL (`J.620100.020.02`); Menerapkan Akses Basis Data (`J.620100.021.02`); Mengimplementasikan Rancangan Entitas dan Keterkaitan Antar Entitas (`J.620100.007.01`). Salinan daftar unit belum terverifikasi terhadap berkas resmi.
- **Tanda siap lanjut:** peserta menjelaskan mengapa `?` dipakai dan dapat memilih `JOIN` atau `LEFT JOIN` untuk kasus yang diberikan.
