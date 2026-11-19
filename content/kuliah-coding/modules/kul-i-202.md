# Basis Data

> **DRAF — belum ditinjau.** Ini modul belajar untuk mata kuliah `KUL-I-202`
> (3 SKS, semester 3, jalur I), bagian dari program `kuliah-coding`. Konten
> karangan menurut ADR-0007; belum disetujui pemilik atau peninjau. Kode di
> modul ini adalah **SQL (SQLite 3.45.1)**, dijalankan lewat modul `sqlite3`
> Python 3.12.3 dengan `python3 -I`, dan sedikit Python. Setiap blok `sql`
> dan `python` dijalankan penulis dan keluarannya cocok dengan yang tertulis.
> Blok berinfo `setengah-jadi` sengaja berlubang dan tidak dijalankan.

## Untuk siapa modul ini

Mahasiswa semester 3 informatika atau ilmu komputer yang sudah menempuh
`KUL-I-102` (struktur data: pohon, tabel hash). Satu mata kuliah, satu
semester: 14 pertemuan, ujian tengah sesudah pertemuan 7, ujian akhir sesudah
pertemuan 14 `[asumsi]` (silabus 2.3). Kamu butuh Python 3 (modul `sqlite3`
bawaan), editor teks, dan Git. SQL di modul ini berdialek **SQLite**, yang
berbeda dari sistem lain (tipe data longgar, kunci asing mati secara bawaan);
perbedaan disebut di tempatnya. Di semester 3 contoh terselesaikan penuh
hanya untuk konsep **baru**; sisanya setengah jadi.

**Cara menjalankan.** Skrip `.sql` dijalankan lewat penjalan kecil ini (satu
basis data memori untuk semua berkas pada argumen; baris dicetak dengan
pemisah `|`; `NULL` dicetak `NULL`, sedangkan CLI `sqlite3` mencetaknya
kosong). Bila CLI `sqlite3` ada di mesinmu, `sqlite3 :memory: < berkas.sql`
setara.

```python
import sqlite3
import sys

con = sqlite3.connect(":memory:", isolation_level=None)
for path in sys.argv[1:]:
    for stmt in open(path, encoding="utf-8").read().split(";\n"):
        if not stmt.strip():
            continue
        try:
            for row in con.execute(stmt):
                if stmt.lstrip().upper().startswith("EXPLAIN"):
                    row = row[3:]
                print("|".join("NULL" if v is None else str(v) for v in row))
        except sqlite3.Error as e:
            print("galat:", e)
```

Penjalan ini memecah berkas pada `;` di akhir baris, sehingga tiap pernyataan
harus berakhir `;` di ujung barisnya (seperti semua berkas di modul ini).

Simpan sebagai `jalankan_sql.py`; contoh: `python3 -I jalankan_sql.py toko.sql
uji.sql`.

## Peta semester

| Pertemuan | Bagian | Pokok bahasan | CPMK | Kuis pembuka (jarak) |
| --- | --- | --- | --- | --- |
| 1 | 1 | Entitas, atribut, relasi (ER) | C1 | `KUL-I-102`: tabel hash |
| 2 | 1 | Skema relasional, kunci utama dan kunci asing | C1 | 1, lalu `KUL-I-102`: BST |
| 3 | 1 | Batasan (`NOT NULL`, `CHECK`, `UNIQUE`); **kuis kumulatif 1** | C1 | 2, lalu 1 |
| 4 | 2 | `SELECT`, `WHERE`, `ORDER BY` | C2 | 3, lalu 1 |
| 5 | 2 | `JOIN` | C2 | 4, lalu 2 |
| 6 | 2 | `GROUP BY`, `HAVING`, agregat | C2 | 5, lalu 3 |
| 7 | 2 | `NULL`, subkueri, kueri berparameter; **kuis kumulatif 2** | C2 | 6, lalu 4 |
| ujian tengah | | Ujian praktik, tanpa AI | C1–C2 | |
| 8 | 3 | Anomali dan ketergantungan fungsional | C3 | 7, lalu 5 |
| 9 | 3 | 1NF, 2NF, 3NF; dekomposisi | C3 | 8, lalu 6 |
| 10 | 4 | Transaksi dan atomisitas | C3 | 9, lalu 7 |
| 11 | 4 | Isolasi dan penguncian; **kuis kumulatif 3** | C3 | 10, lalu 8 |
| 12 | 5 | Indeks dan rencana kueri | C3 | 11, lalu 9 |
| 13 | 5 | Proyek basis data (1) | C1–C3 | 12, lalu 10 |
| 14 | 5 | Proyek basis data (2); **kuis kumulatif akhir** | C1–C3 | 13, lalu 1 sampai 12 |
| ujian akhir | | Ujian praktik, tanpa AI | C1–C3 | |

## Ingat kembali

Tiap pertemuan dibuka kuis 5 menit **tanpa catatan**, 3 sampai 5 soal. Kolom
terakhir peta menunjukkan asal soalnya, dengan jarak bertambah; pertemuan 1
sampai 3 mengambil dari `KUL-I-102` dan mata kuliah lain yang sudah lewat.
Contoh soal untuk pertemuan 1 sampai 3:

1. Mengapa pencarian di tabel hash bisa jadi lambat walau ember banyak?
2. Sebut biaya pencarian BST seimbang dan terburuknya, dan data yang membuatnya
   terburuk.
3. Mengapa satu sel kosong mengubah kolom bilangan bulat menjadi `float64` di
   pandas, dan apa tiga pilihan menanganinya?

Soal ketiga berasal dari analisis data (`KUL-U-102`) dan berguna di bagian 2:
sel kosong adalah `NULL`. Mengingat dengan usaha, bukan membaca ulang, yang membuat ingatan bertahan.

## Tujuan

Pada akhir semester kamu dapat (CPMK, silabus bagian 3.1):

- **C1** memodelkan data (ER, relasional);
- **C2** menulis kueri SQL;
- **C3** menerapkan normalisasi, indeks, transaksi.

## Bagian 1: Model data (pertemuan 1 sampai 3)

Model **ER** menggambarkan dunia sebagai **entitas**, **atribut**, dan
**relasi** beserta **kardinalitasnya** (satu-ke-banyak, banyak-ke-banyak).
Model **relasional** mewujudkannya sebagai tabel: **kunci utama** membedakan
baris, **kunci asing** menunjuk kunci utama tabel lain, relasi
banyak-ke-banyak menjadi **tabel penghubung**.

Contoh sepanjang modul: toko buku fiktif. Penerbit menerbitkan banyak buku;
pelanggan membuat banyak pesanan; satu pesanan memuat banyak buku dan satu
buku muncul di banyak pesanan (dijembatani `item_pesanan` yang menyimpan
`jumlah`).

```text
penerbit 1 ---- N buku
pelanggan 1 --- N pesanan
pesanan N ----- M buku    (tabel penghubung: item_pesanan, atribut jumlah)
```

### Prediksi dulu

Baca skema berikut, lalu **sebelum menjalankan**, tebak dari tiga `INSERT`
terakhir (berkas `uji.sql`) mana yang gagal dan alasan masing-masing.

```sql
PRAGMA foreign_keys = ON;

CREATE TABLE penerbit (
    id INTEGER PRIMARY KEY,
    nama TEXT NOT NULL UNIQUE
);

CREATE TABLE buku (
    id INTEGER PRIMARY KEY,
    judul TEXT NOT NULL,
    harga INTEGER NOT NULL CHECK (harga > 0),
    penerbit_id INTEGER NOT NULL REFERENCES penerbit (id)
);

CREATE TABLE pelanggan (
    id INTEGER PRIMARY KEY,
    nama TEXT NOT NULL,
    kota TEXT
);

CREATE TABLE pesanan (
    id INTEGER PRIMARY KEY,
    pelanggan_id INTEGER NOT NULL REFERENCES pelanggan (id),
    tanggal TEXT NOT NULL
);

CREATE TABLE item_pesanan (
    pesanan_id INTEGER NOT NULL REFERENCES pesanan (id),
    buku_id INTEGER NOT NULL REFERENCES buku (id),
    jumlah INTEGER NOT NULL CHECK (jumlah > 0),
    PRIMARY KEY (pesanan_id, buku_id)
);

INSERT INTO penerbit VALUES (1, 'Penerbit Alfa'), (2, 'Penerbit Beta'), (3, 'Penerbit Gamma');
INSERT INTO buku VALUES
    (1, 'Dasar Algoritma Contoh', 90000, 1),
    (2, 'Basis Data Ringkas', 75000, 1),
    (3, 'Sistem Operasi Contoh', 120000, 2),
    (4, 'Jaringan Sederhana', 60000, 2);
INSERT INTO pelanggan VALUES
    (1, 'Ayu Contoh', 'Bandung'),
    (2, 'Bima Contoh', 'Medan'),
    (3, 'Citra Contoh', NULL),
    (4, 'Dewa Contoh', 'Bandung');
INSERT INTO pesanan VALUES
    (1, 1, '2026-11-01'),
    (2, 1, '2026-11-05'),
    (3, 2, '2026-11-05'),
    (4, 4, '2026-11-09');
INSERT INTO item_pesanan VALUES
    (1, 1, 2), (1, 2, 1), (2, 3, 1), (3, 1, 1), (3, 4, 3), (4, 2, 2);
```

Simpan sebagai `toko.sql`. Nama pelanggan di atas rekaan, bukan orang nyata.

```sql
INSERT INTO buku VALUES (5, 'Buku Hantu', 50000, 99);
INSERT INTO buku VALUES (6, 'Buku Gratis', 0, 1);
INSERT INTO penerbit VALUES (4, 'Penerbit Alfa');
SELECT COUNT(*) FROM buku;
```

Simpan sebagai `uji.sql` dan jalankan: `python3 -I jalankan_sql.py toko.sql
uji.sql`. Keluaran:

```text
galat: FOREIGN KEY constraint failed
galat: CHECK constraint failed: harga > 0
galat: UNIQUE constraint failed: penerbit.nama
4
```

### Contoh terselesaikan

Ketiganya gagal dan jumlah buku tetap 4. Penerbit 99 tidak ada sehingga
kunci asing menolak; **ini hanya terjadi karena `PRAGMA foreign_keys = ON`**.
SQLite mematikannya secara bawaan dan pengaturan itu berlaku **per
sambungan**; bila lupa, buku bisa menunjuk penerbit hantu tanpa galat. Harga 0
melanggar `CHECK`; nama penerbit kembar melanggar `UNIQUE`. Pelajarannya:
**batasan menjaga kebenaran data di satu tempat**, bukan diulang di tiap
program yang menulis. Sebuah buku dicatat sekali di `buku`, penerbit sekali
di `penerbit`; keuntungannya terlihat di bagian 3.

### Contoh setengah jadi

Tabel `ulasan` (satu ulasan per pasangan pelanggan-buku, nilai 1 sampai 5):

```sql setengah-jadi
CREATE TABLE ulasan (
    pelanggan_id INTEGER NOT NULL REFERENCES pelanggan (___),
    buku_id INTEGER NOT NULL REFERENCES ___ (id),
    nilai INTEGER NOT NULL CHECK (nilai BETWEEN ___ AND ___),
    PRIMARY KEY (___, ___)
);
```

### Latihan

1. **Ubah:** tambah `CHECK (harga % 1000 = 0)` dan prediksi `INSERT` harga
   75500.
2. **Buat:** model ER (di kertas) untuk perpustakaan kecil: anggota, buku,
   peminjaman; tentukan kardinalitas dan kunci.
3. **Jelaskan:** mengapa relasi banyak-ke-banyak butuh tabel penghubung
   berkunci gabungan?
4. **Berpasangan (praktikum):** pengemudi mengetik, navigator menjelaskan
   dengan kata-kata, tukar peran tiap sekitar 10 menit; pasangan dibentuk acak
   per bagian dan tugas yang dinilai tetap perorangan. Tugas: satu orang
   menggambar ER, satu orang menurunkannya menjadi `CREATE TABLE`.

## Bagian 2: SQL (pertemuan 4 sampai 7)

SQL **deklaratif**: kamu menyebut **hasil** yang diinginkan, bukan langkahnya.
Urutan penulisan: `SELECT` kolom `FROM` tabel `WHERE` syarat baris
`GROUP BY` pengelompokan `HAVING` syarat kelompok `ORDER BY` pengurutan.
`JOIN` menggabungkan baris dua tabel berdasarkan kunci; `INNER JOIN` hanya
mempertahankan pasangan yang cocok, `LEFT JOIN` mempertahankan semua baris
kiri (isi `NULL` bila tak ada pasangan).

### Prediksi dulu

Dengan data `toko.sql`, tulis hasil kueri berikut sebelum menjalankan:
(a) total belanja tiap pelanggan yang pernah memesan; (b) nama pelanggan tanpa
pesanan; (c) `SELECT COUNT(*), COUNT(kota) FROM pelanggan`; (d) nama pelanggan
dengan `kota <> 'Bandung'` (perhatikan Citra, kota `NULL`).

### Contoh terselesaikan

Simpan sebagai `q2.sql`, jalankan `python3 -I jalankan_sql.py toko.sql q2.sql`:

```sql
SELECT p.nama, SUM(i.jumlah * b.harga) AS total
FROM pelanggan p
JOIN pesanan o ON o.pelanggan_id = p.id
JOIN item_pesanan i ON i.pesanan_id = o.id
JOIN buku b ON b.id = i.buku_id
GROUP BY p.id
ORDER BY total DESC;

SELECT p.nama
FROM pelanggan p
LEFT JOIN pesanan o ON o.pelanggan_id = p.id
WHERE o.id IS NULL;

SELECT COUNT(*), COUNT(kota) FROM pelanggan;
SELECT nama FROM pelanggan WHERE kota <> 'Bandung';
SELECT nama FROM pelanggan WHERE kota <> 'Bandung' OR kota IS NULL;

SELECT pb.nama, SUM(i.jumlah) AS terjual
FROM penerbit pb
JOIN buku b ON b.penerbit_id = pb.id
JOIN item_pesanan i ON i.buku_id = b.id
GROUP BY pb.id
HAVING SUM(i.jumlah) >= 5;

SELECT judul FROM buku WHERE harga > (SELECT AVG(harga) FROM buku);
```

Keluaran:

```text
Ayu Contoh|375000
Bima Contoh|270000
Dewa Contoh|150000
Citra Contoh
4|3
Bima Contoh
Bima Contoh
Citra Contoh
Penerbit Alfa|6
Dasar Algoritma Contoh
Sistem Operasi Contoh
```

Pembacaan: total Ayu `2*90000 + 75000 + 120000 = 375000`. `LEFT JOIN` ...
`WHERE o.id IS NULL` menemukan pelanggan **tanpa** pesanan (Citra);
`INNER JOIN` menghilangkannya, jadi pilihan `JOIN` menentukan baris yang ada.
`HAVING` menyaring **kelompok** sesudah agregasi (Alfa terjual `3 + 3 = 6`;
Beta `1 + 3 = 4`, tersaring); `WHERE` menyaring **baris** sebelum
pengelompokan. Subkueri memberi rata-rata harga 86250, sehingga dua buku
lolos.

**`NULL` bukan nilai, melainkan "tidak diketahui".** `COUNT(*)` menghitung
baris (4), `COUNT(kota)` melewatkan `NULL` (3). `kota <> 'Bandung'` terhadap
`NULL` menghasilkan *tidak diketahui*, bukan benar, sehingga Citra **tidak**
muncul pada kueri pertama; ia muncul bila kamu menulis `OR kota IS NULL`.
Itulah asal "sel kosong" di analisis data: kolom bilangan bulat dengan satu
`NULL` tak dapat tetap bilangan bulat biasa di pandas. Di SQL, `NULL`
ditangani dengan `IS NULL`, `COALESCE`, atau batasan `NOT NULL`.

**Jangan menempelkan masukan ke string kueri.** Peragaan dengan Python
(Python 3.12.3, `python3 -I`):

```python
import sqlite3

con = sqlite3.connect(":memory:")
con.execute("CREATE TABLE buku (id INTEGER PRIMARY KEY, judul TEXT NOT NULL)")
con.executemany("INSERT INTO buku VALUES (?, ?)", [(1, "Basis Data Ringkas"), (2, "Jaringan Sederhana")])

masukan = "0 OR 1=1"

salah = "SELECT judul FROM buku WHERE id = " + masukan
print([r[0] for r in con.execute(salah)])

benar = "SELECT judul FROM buku WHERE id = ?"
print([r[0] for r in con.execute(benar, (masukan,))])
print([r[0] for r in con.execute(benar, (2,))])
# keluaran:
# ['Basis Data Ringkas', 'Jaringan Sederhana']
# []
# ['Jaringan Sederhana']
```

Masukan yang disambung menjadi bagian **perintah** dan mengembalikan semua
baris (*SQL injection*); parameter `?` menjadikan masukan selalu **data**:
`0 OR 1=1` hanyalah teks yang tak cocok dengan `id` mana pun. Aturan: masukan
dari luar selalu lewat parameter.

### Contoh setengah jadi

Tulis kueri "judul buku dan nama penerbitnya, hanya penerbit yang bukunya
dipesan paling sedikit dua kali":

```sql setengah-jadi
SELECT b.judul, pb.nama
FROM buku b
JOIN ___ pb ON pb.id = b.___
JOIN item_pesanan i ON i.buku_id = b.id
GROUP BY b.id
HAVING ___(i.jumlah) >= 2;
```

### Latihan

1. **Ubah:** sertakan pelanggan tanpa pesanan dengan total 0 pada kueri total
   (`LEFT JOIN`, `COALESCE`); prediksi barisnya lebih dulu.
2. **Buat:** kueri "buku yang dipesan pada lebih dari satu pesanan"
   (`COUNT(DISTINCT pesanan_id)`); tulis prediksinya.
3. **Jelaskan:** mengapa `WHERE kota = NULL` tak pernah mengembalikan baris,
   dan apa penggantinya?
4. **Berpasangan:** satu orang menulis kueri dari pertanyaan berbahasa
   Indonesia, satu orang menelusuri hasilnya dengan tangan; ganti peran.

## Bagian 3: Normalisasi (pertemuan 8 dan 9)

**Anomali** muncul bila satu fakta disimpan di banyak tempat: **update**
(diubah di satu baris, tidak di yang lain), **penyisipan** (fakta tak dapat
dicatat tanpa fakta lain), **penghapusan** (menghapus satu fakta menghilangkan
fakta lain). Akarnya **ketergantungan fungsional** `A -> B`: `A` menentukan
`B` (mis. `pelanggan_id -> kota`). **Normalisasi** menguraikan tabel agar tiap
fakta tinggal di satu tempat:

- **1NF**: tiap sel satu nilai tunggal dan ada kunci;
- **2NF**: 1NF dan atribut non-kunci bergantung pada **seluruh** kunci;
- **3NF**: 2NF dan tak ada ketergantungan transitif (non-kunci menentukan
  non-kunci).

### Prediksi dulu

Tabel `datar` digabung dari data `toko.sql` (satu baris per item pesanan).
Tebak: berapa baris? Bila kota Ayu diubah menjadi `Surabaya` pada satu baris,
berapa kota berbeda untuk Ayu? Bila baris pesanan 4 dihapus, apakah Dewa masih
tercatat? Dapatkah Citra (belum memesan) ada di `datar`?

### Contoh terselesaikan

```sql
CREATE TABLE datar AS
SELECT o.id AS pesanan_id, o.tanggal, p.id AS pelanggan_id, p.nama AS pelanggan, p.kota,
       b.id AS buku_id, b.judul, b.harga, pb.nama AS penerbit, i.jumlah
FROM pesanan o
JOIN pelanggan p ON p.id = o.pelanggan_id
JOIN item_pesanan i ON i.pesanan_id = o.id
JOIN buku b ON b.id = i.buku_id
JOIN penerbit pb ON pb.id = b.penerbit_id;

SELECT COUNT(*) FROM datar;

UPDATE datar SET kota = 'Surabaya' WHERE pesanan_id = 1 AND buku_id = 1;
SELECT DISTINCT pelanggan_id, kota FROM datar WHERE pelanggan_id = 1 ORDER BY kota;

DELETE FROM datar WHERE pesanan_id = 4;
SELECT COUNT(*) FROM datar WHERE pelanggan_id = 4;

SELECT COUNT(*) FROM (SELECT DISTINCT pelanggan_id, pelanggan, kota FROM datar);
```

Simpan sebagai `n3.sql`, jalankan bersama `toko.sql`. Keluaran:

```text
6
1|Bandung
1|Surabaya
0
3
```

Hasilnya: 6 baris; Ayu kini punya **dua** kota (anomali update); Dewa lenyap
dari `datar` (anomali penghapusan); Citra tak pernah dapat ada tanpa memesan
(anomali penyisipan), sehingga hanya 3 dari 4 pelanggan tercatat. Sumbernya:
kunci `datar` adalah `(pesanan_id, buku_id)`. `tanggal` dan `pelanggan_id`
ditentukan `pesanan_id` saja, dan `judul`, `harga`, `penerbit` oleh `buku_id`
saja: **ketergantungan sebagian** (melanggar 2NF). `pelanggan` dan `kota`
ditentukan `pelanggan_id`, bukan bagian kunci: **ketergantungan transitif**
(`pesanan_id -> pelanggan_id -> kota`, melanggar 3NF).

Skema `toko.sql` adalah hasil **dekomposisi**: `JOIN` ulang tabel-tabelnya
menghasilkan persis 6 baris asal. Syarat dekomposisi baik: **lossless-join**
(gabung ulang tak membuat baris palsu atau hilang) dan sebisa mungkin
**menjaga ketergantungan**. Normalisasi bukan dogma: laporan baca-saja kadang
sengaja **denormalisasi** untuk kecepatan, menanggung risiko anomali.

### Contoh setengah jadi

Tabel `jadwal(kelas, hari, dosen, ruang)` dengan kunci `(kelas, hari)`; fakta:
`dosen` dan `ruang` hanya bergantung pada `kelas`. Tentukan 2NF-nya:

```sql setengah-jadi
-- ketergantungan: kelas -> ___, ___
-- pelanggaran: atribut non-kunci bergantung pada ___ dari kunci
-- hasil dekomposisi:
--   kelas_info(kelas, ___, ___)   kunci: ___
--   jadwal_hari(___, ___)         kunci: gabungan
```

### Latihan

1. **Ubah:** buat `UPDATE` berlaku untuk **semua** baris pelanggan 1; jelaskan
   mengapa itu mengatasi gejala, bukan akarnya.
2. **Buat:** `pegawai(id, nama, departemen, kepala_departemen)`: tunjuk
   ketergantungan transitif dan tulis dekomposisi 3NF.
3. **Jelaskan:** apa beda 2NF dan 3NF dengan satu contoh tiap-tiapnya.
4. **Berpasangan:** satu orang mengusulkan skema tak ternormalisasi (mis.
   klinik), satu orang mencari tiga anomali; lalu gantian memperbaikinya.

## Bagian 4: Transaksi (pertemuan 10 dan 11)

**Transaksi** adalah kesatuan kerja yang diperlakukan sebagai satu langkah.
Empat sifat **ACID**: **atomisitas** (semua langkah terjadi atau tak satu
pun), **konsistensi** (batasan tetap terpenuhi), **isolasi** (transaksi
bersamaan tak saling melihat setengah jadi), **ketahanan** (setelah *commit*
data bertahan walau sistem mati). Perintah: `BEGIN`, `COMMIT`, `ROLLBACK`.

### Prediksi dulu

Tabel `rekening(id, saldo)` dengan `CHECK (saldo >= 0)`; rekening 1 berisi
100, rekening 2 berisi 0. Transaksi pertama memindahkan 70 dari 1 ke 2
(tambah ke 2 dulu). Transaksi kedua memindahkan 50 dari 2 ke 1, **lalu**
mengurangi 50 lagi dari 2, diakhiri `ROLLBACK`. Tulis saldo sesudah tiap
transaksi.

### Contoh terselesaikan

Simpan sebagai `tx.sql` dan jalankan `python3 -I jalankan_sql.py tx.sql`:

```sql
CREATE TABLE rekening (
    id INTEGER PRIMARY KEY,
    saldo INTEGER NOT NULL CHECK (saldo >= 0)
);
INSERT INTO rekening VALUES (1, 100), (2, 0);

BEGIN;
UPDATE rekening SET saldo = saldo + 70 WHERE id = 2;
UPDATE rekening SET saldo = saldo - 70 WHERE id = 1;
COMMIT;
SELECT id, saldo FROM rekening ORDER BY id;

BEGIN;
UPDATE rekening SET saldo = saldo + 50 WHERE id = 1;
UPDATE rekening SET saldo = saldo - 50 WHERE id = 2;
UPDATE rekening SET saldo = saldo - 50 WHERE id = 2;
ROLLBACK;
SELECT id, saldo FROM rekening ORDER BY id;
```

```text
1|30
2|70
galat: CHECK constraint failed: saldo >= 0
1|30
2|70
```

Transaksi pertama: 30 dan 70 (jumlah tetap 100). Transaksi kedua: dua langkah
berhasil (rekening 1 menjadi 80, rekening 2 menjadi 20), langkah ketiga
melanggar `CHECK` (20 - 50), dan `ROLLBACK` mengembalikan **semua** langkah,
termasuk dua yang berhasil: saldo kembali 30 dan 70. Itulah atomisitas.
Pada kode sungguhan, galat di tengah transaksi harus berujung `ROLLBACK`.

**Isolasi** perlu dua sambungan (Python, SQLite 3.45.1, berkas sementara;
`isolation_level=None` agar `BEGIN` dan `COMMIT` eksplisit, `timeout=0` agar
B tidak menunggu):

```python
import os
import sqlite3
import tempfile

with tempfile.TemporaryDirectory() as d:
    path = os.path.join(d, "bank.db")
    a = sqlite3.connect(path, isolation_level=None)
    b = sqlite3.connect(path, isolation_level=None, timeout=0)
    a.execute("CREATE TABLE rekening (id INTEGER PRIMARY KEY, saldo INTEGER NOT NULL)")
    a.execute("INSERT INTO rekening VALUES (1, 100), (2, 0)")

    a.execute("BEGIN")
    a.execute("UPDATE rekening SET saldo = saldo - 70 WHERE id = 1")
    print("A melihat:", a.execute("SELECT saldo FROM rekening WHERE id = 1").fetchone())
    print("B melihat:", b.execute("SELECT saldo FROM rekening WHERE id = 1").fetchone())
    try:
        b.execute("UPDATE rekening SET saldo = 0 WHERE id = 1")
    except sqlite3.OperationalError as e:
        print("B menulis:", e)
    a.execute("COMMIT")
    print("B sesudah commit:", b.execute("SELECT saldo FROM rekening WHERE id = 1").fetchone())
    a.close()
    b.close()
# keluaran:
# A melihat: (30,)
# B melihat: (100,)
# B menulis: database is locked
# B sesudah commit: (30,)
```

A melihat perubahannya sendiri (30), B masih melihat nilai lama (100):
perubahan yang belum di-*commit* **tidak bocor** ke sambungan lain. B yang
menulis ditolak ("database is locked") karena SQLite hanya mengizinkan satu
penulis pada satu waktu; sesudah `COMMIT`, B melihat 30. Sistem lain
(PostgreSQL, MySQL) punya isolasi dan penguncian lebih halus; yang dilatih
adalah **gagasannya**. Ketahanan tak dapat diperagakan dengan skrip pendek
(perlu mematikan proses di tengah penulisan); ia bergantung pada jurnal tulis
di disk.

### Contoh setengah jadi

Transaksi "pesan buku" yang mencatat pesanan **dan** itemnya:

```sql setengah-jadi
___;
INSERT INTO pesanan VALUES (5, 3, '2026-11-12');
INSERT INTO item_pesanan VALUES (5, 99, 1);  -- buku 99 tidak ada
-- bila ada galat pada langkah mana pun: ___;
-- bila semua langkah berhasil: ___;
```

### Latihan

1. **Ubah:** urutkan transaksi kedua "kurangi dari 2 dulu, baru tambah ke 1";
   prediksi apa yang berubah saat galat.
2. **Buat:** skrip Python pemindah saldo dengan `COMMIT` pada sukses dan
   `ROLLBACK` pada `sqlite3.Error`; uji dengan saldo kurang.
3. **Jelaskan:** apa yang terjadi bila dua pemesan membeli stok terakhir
   bersamaan tanpa transaksi dan isolasi?
4. **Berpasangan:** satu orang menyusun skenario dua sambungan "baca nilai
   lama", satu orang memprediksi keluarannya; jalankan bersama.

## Bagian 5: Indeks dan proyek (pertemuan 12 sampai 14)

**Indeks** adalah struktur tambahan (di SQLite pohon-B, kerabat pohon pencarian
`KUL-I-102`) yang memetakan nilai kolom ke baris sehingga pencarian tak perlu
membaca seluruh tabel. Tanpa indeks: **pemindaian penuh** (`SCAN`,
`Theta(n)`); dengan indeks: **pencarian** (`SEARCH`, kira-kira `Theta(log n)`
ditambah banyaknya hasil). Harganya: ruang tambahan, dan tiap `INSERT`,
`UPDATE`, `DELETE` ikut memperbarui indeks. `EXPLAIN QUERY PLAN` menampilkan
strategi mesin tanpa menjalankan kueri.

### Prediksi dulu

Tabel `log_akses` berisi 20000 baris (pengguna `u0000` sampai `u0499`, tiap
pengguna berulang sama banyak). Tebak: berapa baris untuk
`pengguna = 'u0042'`? Apa strategi untuk kueri itu sebelum dan sesudah indeks
pada `pengguna`? Apakah indeks juga membantu `LIKE '%42'`?

### Contoh terselesaikan

Simpan sebagai `idx.sql` dan jalankan `python3 -I jalankan_sql.py idx.sql`:

```sql
CREATE TABLE log_akses (
    id INTEGER PRIMARY KEY,
    pengguna TEXT NOT NULL,
    jalur TEXT NOT NULL
);

WITH RECURSIVE n(i) AS (SELECT 1 UNION ALL SELECT i + 1 FROM n WHERE i < 20000)
INSERT INTO log_akses (pengguna, jalur)
SELECT printf('u%04d', i % 500), printf('/hal/%d', i % 7) FROM n;

SELECT COUNT(*) FROM log_akses;
SELECT COUNT(*) FROM log_akses WHERE pengguna = 'u0042';

EXPLAIN QUERY PLAN SELECT * FROM log_akses WHERE pengguna = 'u0042';

CREATE INDEX idx_pengguna ON log_akses (pengguna);

EXPLAIN QUERY PLAN SELECT * FROM log_akses WHERE pengguna = 'u0042';
SELECT COUNT(*) FROM log_akses WHERE pengguna = 'u0042';
EXPLAIN QUERY PLAN SELECT * FROM log_akses WHERE pengguna LIKE '%42';
```

```text
20000
40
SCAN log_akses
SEARCH log_akses USING INDEX idx_pengguna (pengguna=?)
40
SCAN log_akses
```

Pembacaan: 40 baris cocok (20000 / 500). Sebelum indeks mesin memindai semua
20000 baris; sesudahnya langsung menuju entri `u0042`. Hasilnya tetap 40:
**indeks tidak mengubah jawaban, hanya biaya**. `LIKE '%42'` tetap `SCAN`
karena awalan wildcard tak dapat dijelajahi pohon terurut (seperti pencarian
biner butuh kunci yang dicari pada data terurut). Teks rencana dapat
berbeda antarversi SQLite; yang penting kamu membedakan `SCAN` dan `SEARCH`.
Aturan praktis: indeks kolom yang sering dipakai di `WHERE` dan `JOIN`; jangan
mengindeks semuanya (penulisan melambat, ruang terbuang); **ukur** dengan
`EXPLAIN QUERY PLAN`, jangan menebak.

### Contoh setengah jadi

Indeks gabungan untuk "akses pengguna tertentu pada jalur tertentu":

```sql setengah-jadi
CREATE INDEX idx_pengguna_jalur ON log_akses (___, ___);
EXPLAIN QUERY PLAN SELECT * FROM log_akses
WHERE pengguna = 'u0042' AND jalur = '/hal/3';
-- strategi yang diharapkan: SEARCH ... USING INDEX ___
```

### Latihan

1. **Ubah:** buat `idx_jalur` dan prediksi apakah `WHERE jalur = '/hal/3'`
   berubah dari `SCAN` ke `SEARCH`; jalankan dan cocokkan.
2. **Buat:** dua tabel kecil dan satu `JOIN`; bandingkan rencana sebelum dan
   sesudah mengindeks kunci asing.
3. **Jelaskan:** mengapa terlalu banyak indeks memperlambat `INSERT`?
4. **Berpasangan:** satu orang menyusun kueri lambat, satu orang mengusulkan
   indeks dan membuktikannya dengan rencana kueri.

**Proyek basis data (pertemuan 13 dan 14).** Pilih satu domain dari daftar
dosen (klinik, perpustakaan, koperasi; data **sintetis**). Tidak ada contoh
terselesaikan: kamu bekerja dari spesifikasi. Serahkan model ER dan skema
dengan batasan, data contoh, lima kueri (termasuk `JOIN`, `HAVING`, dan
`LEFT JOIN`), argumen 3NF atau alasan denormalisasi, satu transaksi dengan uji
`ROLLBACK`, dan satu indeks dengan rencana kueri sebelum-sesudah, serta
riwayat Git dengan sedikitnya empat *commit*. Pertemuan 13 berpasangan, 14
mandiri dengan refleksi satu halaman.

## Latihan bercampur

Setelah bagian 2, 3, dan 4, kerjakan soal yang **tidak menyebut** konsepnya.
Contoh: "Stok buku berkurang dua kali untuk satu pesanan. Apa penyebab paling
mungkin dan perbaikannya?" Kamu memutuskan: transaksi tidak atomik, atau skema
yang menyimpan stok di dua tempat? Kuis kumulatif (pertemuan 3, 7, 11, 14)
berbentuk sama, dengan soal dari semua bagian.

## Ulang berjarak

Kerjakan ulang tanpa melihat solusi lama:

- satu minggu setelah bagian: tulis ulang satu skema atau kueri (mis. total
  per pelanggan) dari ingatan;
- awal tiap bagian baru: dua soal dari bagian sebelumnya;
- minggu sebelum ujian: tiga soal yang dahulu salah;
- semester berikutnya: tulis ulang kueri berparameter dan penjelasan
  `NULL`; `KUL-I-205` dan `KUL-I-307` memakainya.

## Kebijakan AI dan log pemakaian

Silabus bagian 6.3 **belum menyatakan** tingkat AI mata kuliah ini. Modul
memakai usulan baku `[asumsi]` (Q2 rancangan): **Kuning** untuk tugas kueri
dan skema, **Hijau** untuk proyek basis data bagian 5, **Merah** untuk ujian
praktik; dosen menetapkan per tugas. Pada Kuning, AI boleh menjelaskan konsep,
**tidak** boleh menghasilkan kueri atau skema yang kamu serahkan, dan hanya
setelah gerbang kesiapan: kamu dapat (1) menelusuri kueri pendek dengan
tangan, (2) menulis satu data yang membuat kueri salah memberi jawaban keliru,
(3) menjelaskan kueri dengan kata sendiri. Bila memakai AI, catat di
repositorimu sendiri: alat dan versi, tujuan, perintah, bagian keluaran yang
dipakai (log). **Jangan memasukkan data nyata, kata sandi, atau kunci ke
asisten AI**; pakai data sintetis. Dosen dapat mewawancarai kamu tentang
kuerimu dan memintamu mengubahnya langsung.

## Kesalahan umum

- **Lupa `PRAGMA foreign_keys = ON` di SQLite.** Kunci asing diam-diam tak
  diperiksa.
- **Membandingkan dengan `NULL` memakai `=` atau `<>`.** Pakai `IS NULL`.
- **`WHERE` dan `HAVING` tertukar.** `WHERE` sebelum pengelompokan.
- **`INNER JOIN` padahal ingin semua baris kiri.** Pakai `LEFT JOIN`.
- **Menyambung masukan ke string kueri.** Pakai parameter `?`.
- **Menyimpan fakta yang sama di banyak baris.** Normalisasi.
- **Mengira indeks selalu membantu.** `LIKE '%x'` tetap `SCAN`; penulisan
  melambat.

## Cek mandiri

Tutup modul, jawab, baru periksa.

1. Gambar ER "dosen mengajar banyak kelas, mahasiswa mengikuti banyak kelas"
   dan tabel penghubungnya.
2. Mengapa `COUNT(*)` dan `COUNT(kolom)` bisa berbeda?
3. Beri satu anomali update dan perbaikannya dengan dekomposisi.
4. Apa arti atomisitas, dan apa yang dilakukan `ROLLBACK`?
5. Apa beda `SCAN` dan `SEARCH`?
6. Mengapa kueri berparameter mencegah *SQL injection*?
7. Sebut tiga hal yang harus bisa kamu lakukan sebelum memakai AI pada tugas
   Kuning.

Daftar periksa (kosong; kamu isi sendiri, tidak dikumpulkan):

- [ ] Aku dapat memodelkan data (ER) dan menurunkannya ke tabel dengan kunci.
- [ ] Aku dapat menulis `JOIN`, agregat, subkueri dan menjelaskan `NULL`.
- [ ] Aku dapat menormalkan tabel sampai 3NF dengan alasan.
- [ ] Aku dapat menulis transaksi dan menjelaskan ACID.
- [ ] Aku dapat membaca rencana kueri dan memutuskan indeks.

## Kunci dan petunjuk

- **Bagian 1:** ketiganya gagal (kunci asing, `CHECK`, `UNIQUE`); jumlah buku
  4. Setengah jadi: `id`, `buku`, `1` dan `5`, `(pelanggan_id, buku_id)`.
  Latihan 1: 75500 melanggar `CHECK`.
- **Bagian 2:** (a) Ayu 375000, Bima 270000, Dewa 150000; (b) Citra Contoh;
  (c) `4|3`; (d) hanya Bima Contoh. Setengah jadi: `penerbit`, `penerbit_id`,
  `SUM`. Latihan 3: `= NULL` selalu *tidak diketahui*; pakai `IS NULL`.
- **Bagian 3:** 6 baris; Ayu dua kota; Dewa tak tercatat lagi; Citra tak dapat
  ada. Setengah jadi: `kelas -> dosen, ruang`; bergantung pada `sebagian`
  kunci; `kelas_info(kelas, dosen, ruang)` kunci `kelas`;
  `jadwal_hari(kelas, hari)`.
- **Bagian 4:** setelah transaksi pertama 30 dan 70; setelah kedua tetap 30
  dan 70. Setengah jadi: `BEGIN`; `ROLLBACK`; `COMMIT`.
- **Bagian 5:** 40 baris; `SCAN` lalu `SEARCH ... USING INDEX`; `LIKE '%42'`
  tetap `SCAN`. Setengah jadi: `pengguna`, `jalur`, `idx_pengguna_jalur`.
- **Ingat kembali (soal 3):** satu `NULL` membuat kolom bilangan bulat pandas
  menjadi `float64` karena sel kosong diwakili `NaN`, bertipe `float`. Tiga
  pilihan: membuang baris kosong, mengisinya dengan nilai pengganti
  (imputasi), atau memakai tipe bilangan bulat yang mengizinkan kosong
  (`Int64`).
- **Petunjuk bertahap bila macet:** (1) tulis pertanyaan sebagai satu kalimat
  dan tabel yang dibutuhkan; (2) jalankan potongan kueri satu per satu dan
  lihat baris perantara; (3) cari langkah tempat hasilmu mulai berbeda dari
  dugaan.

## Langkah berikutnya

`KUL-I-205` (Pengembangan Web) memakai kueri berparameter dan transaksi di
belakang layanan web. `KUL-I-307` (Rekayasa Data dan Pengantar Pembelajaran
Mesin Terapan) memakai `JOIN`, `GROUP BY`, dan penanganan `NULL` saat membentuk
fitur dari tabel.

## Catatan untuk dosen

Bobot dan bentuk asesmen berikut **usulan**; prodi menetapkan (silabus 6.1,
6.2): proyek basis data, ujian praktik tanpa AI, kuis kumulatif, wawancara
singkat tentang kueri. Variasi tugas per mahasiswa: ganti domain (klinik,
perpustakaan, koperasi) dan pertanyaan kueri. Praktikum berpasangan dengan
pasangan acak per bagian; jangan menilai pasangan. Dialek SQL di modul adalah
SQLite; bila prodi memakai sistem lain (PostgreSQL, MySQL), sesuaikan tipe
data, `AUTO_INCREMENT` atau `SERIAL`, dan tingkat isolasi. Ketahanan transaksi
dijelaskan konseptual karena tidak dapat diperagakan dalam skrip pendek.
Data contoh di modul (pelanggan fiktif) tidak memuat data pribadi nyata;
larang mahasiswa memakai data nyata pada tugas.

## Rujukan

- SQLite, *Documentation* (sqlite.org), dibuka 2026-11-19:
  <https://sqlite.org/docs.html>
- SQLite, *Foreign Key Support*, dibuka 2026-11-19:
  <https://www.sqlite.org/foreignkeys.html>
- SQLite, *Transaction*, dibuka 2026-11-19:
  <https://www.sqlite.org/lang_transaction.html>
- SQLite, *Query Planning* (`EXPLAIN QUERY PLAN` dan indeks), dibuka
  2026-11-19: <https://www.sqlite.org/queryplanner.html>
- SQLite, *NULL Handling*, dibuka 2026-11-19:
  <https://www.sqlite.org/nulls.html>
- Python, *sqlite3: DB-API 2.0 interface for SQLite databases*, dibuka
  2026-11-19: <https://docs.python.org/3/library/sqlite3.html>
- ACM/IEEE-CS/AAAI, *Computer Science Curricula 2023*, knowledge area DM:
  <https://csed.acm.org/knowledge-areas/> (daftar KA terverifikasi; rincian
  unit **tidak** dibaca, jadi tidak dikutip).
