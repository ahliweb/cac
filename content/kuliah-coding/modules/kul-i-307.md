## Untuk siapa modul ini

Mahasiswa semester 7 informatika atau ilmu komputer yang memilih mata kuliah
pilihan `KUL-I-307` dan sudah menempuh `KUL-I-202` (basis data); `KUL-I-303`
membantu tetapi bukan prasyarat. 2 SKS, jalur I; 14 pertemuan, ujian tengah
sesudah pertemuan 7 dan ujian akhir sesudah pertemuan 14 `[asumsi]` (silabus
2.3). Fokusnya **alur data terapan**: berkas mentah, basis data, fitur, model,
evaluasi, laporan. Modelnya sengaja kecil; yang dilatih adalah ketelitian alur.

Bahasa: **Python 3.12** (`sqlite3` dan `csv` bawaan) dengan **NumPy 1.26.4**, dan
**SQL (SQLite 3.45.1)**, per 2026-11 (silabus 7.1: Python untuk AI dan data).
Pilihan alat ini `[asumsi]` penulis. Blok kode **berurutan**: simpan tiap blok
sebagai berkas di satu folder kerja (nama berkas di komentar baris pertama) dan
jalankan dengan `python3 nama.py`. Setiap blok sudah dijalankan berurutan dan
keluarannya sama dengan yang tertulis; blok `setengah-jadi` sengaja berlubang.
Semua data **sintetis**.

## Peta semester

| Pertemuan | Bagian: pokok bahasan | CPMK | Kuis pembuka (jarak) |
| --- | --- | --- | --- |
| 1 | B1: ekstraksi dan pembersihan | C1 | `KUL-I-202`: JOIN dan NULL |
| 2 | B1: validasi dan baris ditolak | C1 | 1; `KUL-I-205`: kueri berparameter |
| 3 | B1: pemuatan idempoten; **kuis kumulatif 1** | C1 | 2; 1 |
| 4 | B1: ringkasan alur | C1 | 3; `KUL-I-303`: kebocoran |
| 5 | B2: fitur dengan SQL | C1 | 4; 2 |
| 6 | B2: titik pemotongan waktu | C1 | 5; 3 |
| 7 | B2: kebocoran data; **kuis kumulatif 2** | C1 | 6; 4 |
| ujian tengah | Ujian praktik, tanpa AI | C1 | |
| 8 | B3: baseline | C2 | 7; 5 |
| 9 | B3: melatih model kecil | C2 | 8; 6 |
| 10 | B3: menyimpan dan memuat model | C2 | 9; 7 |
| 11 | B4: matriks konfusi | C2 | 10; 8 |
| 12 | B4: per kelompok, ketidakpastian; **kuis kumulatif 3** | C2 | 11; 9 |
| 13 | B5: penyajian dan pergeseran | C2 | 12; 10 |
| 14 | B5: kartu model; **kuis kumulatif akhir** | C2 | 13; 1 sampai 12 |
| ujian akhir | Ujian praktik, tanpa AI | C1 sampai C2 | |

## Ingat kembali

Tiap pertemuan dibuka kuis 5 menit **tanpa catatan**, 3 sampai 5 soal dari asal
pada kolom terakhir peta; jaraknya bertambah. Contoh pertemuan 1 sampai 4:

1. Apa beda `INNER JOIN` dan `LEFT JOIN`, dan mengapa `COUNT(*)` dan
   `COUNT(kolom)` bisa berbeda bila ada `NULL`? (`KUL-I-202`)
2. Mengapa kueri SQL tidak boleh disusun dengan menyambung masukan pengguna ke
   string, dan apa gantinya? (`KUL-I-205`)
3. Mengapa akurasi 95% dapat menyesatkan pada kejadian langka, dan apa itu
   kebocoran data? (`KUL-I-303`)
4. Mengapa menghapus nama dari tabel tidak membuat data anonim? (`KUL-I-305`)

Soal 1 dasar bagian 2; soal 3 dasar bagian 2 dan 4.

## Tujuan

Pada akhir semester kamu dapat (CPMK, silabus bagian 3.1):

- **C1** membangun alur data;
- **C2** menerapkan model terlatih pada data.

## Bagian 1: ETL (pertemuan 1 sampai 4)

**ETL** (*extract, transform, load*): ambil data mentah, ubah menjadi bentuk
yang sah, muat ke basis data. Data mentah selalu kotor: duplikat, sel kosong,
tanggal mustahil, angka negatif, kunci tak dikenal. **Jangan membuang tanpa
catatan**: tiap baris yang ditolak punya alasan yang dapat dihitung. Pemuatan
harus **idempoten**: dijalankan dua kali pada data yang sama menghasilkan
keadaan yang sama, sehingga kegagalan di tengah dapat diulang dengan aman.
SQLite mendukung ini lewat `INSERT ... ON CONFLICT ... DO UPDATE` (*upsert*).
Sisipan memakai **parameter** (`:nama`), bukan sambungan string.

### Prediksi dulu

Pembangkit di bawah membuat sekitar 1.200 baris pesanan dan menyisipkan lima
cacat: satu duplikat persis, satu jumlah kosong, satu harga negatif, satu
tanggal `2026-02-30`, satu pelanggan `P999` yang tak terdaftar. Berapa baris
diterima, dan berapa pesanan di basis data setelah pemuatan dijalankan dua kali?

### Contoh terselesaikan

```python
# etl.py
import csv
import datetime
import io
import os
import random
import sqlite3

rng = random.Random(42)


def acak(n):  # bilangan bulat 0..n-1; deret sama di semua mesin dan versi
    return int(rng.random() * n)


# SINTETIS: 200 pelanggan fiktif. Tingkat 0, 1, 2 menentukan seberapa sering memesan.
PEL = [(f"P{i:03d}", "grosir" if i % 5 == 0 else "reguler", i % 3) for i in range(1, 201)]
MULA = datetime.date(2026, 1, 1)
baris = []
for hari in range(180):
    for pid, _, tingkat in PEL:
        if acak(100) < (1, 3, 6)[tingkat]:
            tgl = MULA + datetime.timedelta(days=hari)
            baris.append([f"O{len(baris) + 1:04d}", pid, str(tgl), 1 + acak(5), (10 + acak(40)) * 1000])
baris.append(list(baris[5]))  # cacat 1: duplikat persis
baris[10][3] = ""  # cacat 2: jumlah kosong
baris[20][4] = -5000  # cacat 3: harga negatif
baris[30][2] = "2026-02-30"  # cacat 4: tanggal tak ada
baris[40][1] = "P999"  # cacat 5: pelanggan tak dikenal
mentah = "\n".join(["id_pesanan,id_pelanggan,tanggal,jumlah,harga_satuan"] + [",".join(map(str, b)) for b in baris])


def periksa(r):
    """Kembalikan alasan penolakan, atau None bila baris sah."""
    if r["id_pelanggan"] not in {p[0] for p in PEL}:
        return "pelanggan tak dikenal"
    try:
        datetime.date.fromisoformat(r["tanggal"])
    except ValueError:
        return "tanggal tak sah"
    if not r["jumlah"].strip():
        return "jumlah kosong"
    if int(r["jumlah"]) <= 0 or int(r["harga_satuan"]) <= 0:
        return "angka tak positif"
    return None


def transformasi(teks):
    diterima, tolak, dobel = {}, [], 0
    for r in csv.DictReader(io.StringIO(teks)):
        alasan = periksa(r)
        if alasan:
            tolak.append((r["id_pesanan"], alasan))
        else:
            dobel += r["id_pesanan"] in diterima
            diterima[r["id_pesanan"]] = r  # id sama: yang terakhir menang
    return diterima, tolak, dobel


def muat(db, diterima):
    db.executescript(
        """
        CREATE TABLE IF NOT EXISTS pelanggan (id_pelanggan TEXT PRIMARY KEY, segmen TEXT NOT NULL);
        CREATE TABLE IF NOT EXISTS pesanan (
            id_pesanan TEXT PRIMARY KEY,
            id_pelanggan TEXT NOT NULL REFERENCES pelanggan(id_pelanggan),
            tanggal TEXT NOT NULL, jumlah INTEGER NOT NULL, harga_satuan INTEGER NOT NULL);
        DELETE FROM pelanggan;
        """
    )
    db.executemany("INSERT INTO pelanggan VALUES (?, ?)", [(p[0], p[1]) for p in PEL])
    db.executemany(
        """INSERT INTO pesanan VALUES (:id_pesanan, :id_pelanggan, :tanggal, :jumlah, :harga_satuan)
           ON CONFLICT(id_pesanan) DO UPDATE SET jumlah = excluded.jumlah, harga_satuan = excluded.harga_satuan""",
        list(diterima.values()),
    )
    db.commit()


if os.path.exists("toko.db"):
    os.remove("toko.db")
db = sqlite3.connect("toko.db")
diterima, tolak, dobel = transformasi(mentah)
print("baris mentah:", len(baris), "| diterima:", len(diterima), "| duplikat:", dobel)
for alasan in sorted({a for _, a in tolak}):
    print(" ditolak:", alasan, sum(1 for _, a in tolak if a == alasan))
muat(db, diterima)
n1 = db.execute("SELECT COUNT(*) FROM pesanan").fetchone()[0]
muat(db, diterima)  # jalankan kedua kali: harus idempoten
n2 = db.execute("SELECT COUNT(*) FROM pesanan").fetchone()[0]
print("pesanan di basis data:", n1, "lalu", n2)
# keluaran:
# baris mentah: 1203 | diterima: 1198 | duplikat: 1
#  ditolak: angka tak positif 1
#  ditolak: jumlah kosong 1
#  ditolak: pelanggan tak dikenal 1
#  ditolak: tanggal tak sah 1
# pesanan di basis data: 1198 lalu 1198
```

Dari 1.203 baris: 4 ditolak (tiap satu dengan alasan), 1 duplikat dilebur,
tersisa 1.198. Pemuatan kedua tidak menambah baris: `ON CONFLICT` memperbarui
baris yang ada. Baris ditolak hanya dicetak di sini; di praktik ia disimpan
(latihan 2). `id` yang sama diambil **yang terakhir**: tulis keputusan itu di
dokumentasi alur.

### Contoh setengah jadi

```python setengah-jadi
db.executemany(
    """INSERT INTO pesanan VALUES (:id_pesanan, :id_pelanggan, :tanggal, :jumlah, :harga_satuan)
       ON CONFLICT(___) DO UPDATE SET jumlah = excluded.___""",
    list(diterima.values()),
)
# dijalankan dua kali pada data yang sama: jumlah baris ___ (sama atau dua kali lipat)
```

### Latihan

1. **Ubah:** tambahkan aturan "harga satuan di atas 1.000.000 dicurigai";
   prediksi berapa baris ditolak, lalu jalankan.
2. **Buat:** tabel `tolak(id_pesanan, alasan)` yang diisi oleh `muat`, dan
   kueri SQL yang menghitung penolakan per alasan.
3. **Jelaskan:** mengapa pemuatan tanpa `ON CONFLICT` gagal pada kali kedua, dan
   mengapa itu berguna untuk mendeteksi kekeliruan?
4. **Berpasangan (praktikum):** pengemudi dan navigator bertukar peran tiap
   sekitar 10 menit; pasangan acak per bagian, tugas yang dinilai tetap
   perorangan. Satu orang menuliskan lima cacat data baru, satunya menebak
   alasan penolakan yang akan keluar.

## Bagian 2: Fitur (pertemuan 5 sampai 7)

**Fitur** adalah angka yang menggambarkan objek untuk model. Objeknya pelanggan;
tugasnya meramalkan **apakah ia memesan lagi dalam 30 hari berikutnya**. SQL
cocok untuk fitur agregat: frekuensi, nilai belanja, hari sejak pesanan
terakhir. Dua jebakan. (1) `LEFT JOIN` mempertahankan pelanggan tanpa pesanan
**hanya bila syarat tanggal ada di `ON`**, bukan di `WHERE`; dan
`COUNT(o.id_pesanan)` memberi 0 sedangkan `COUNT(*)` memberi 1 untuk baris
kosong itu. (2) **Titik pemotongan waktu**: fitur hanya boleh memakai kejadian
**sebelum** titik pemotongan; label diambil dari **sesudahnya**. Fitur yang
mengintip masa depan adalah **kebocoran data**.

### Prediksi dulu

Aturan "pernah memesan dalam 30 hari terakhir berarti akan kembali" dinilai
terhadap label. Berapa akurasinya bila `hari_sejak` dihitung tanpa mengintip,
dan berapa bila dihitung dari pesanan yang sudah masuk jendela label?

### Contoh terselesaikan

```python
# fitur.py
import sqlite3

# Fitur dihitung HANYA dari pesanan sebelum :pot (hari pemotongan).
# Label: apakah pelanggan memesan lagi pada [:pot, :akhir).
SQL = """
SELECT p.id_pelanggan, p.segmen,
       COUNT(o.id_pesanan) AS frekuensi,
       COALESCE(SUM(o.jumlah * o.harga_satuan), 0) AS nilai,
       CAST(julianday(:pot) - julianday(MAX(o.tanggal)) AS INTEGER) AS hari_sejak,
       EXISTS (SELECT 1 FROM pesanan z
               WHERE z.id_pelanggan = p.id_pelanggan
                 AND z.tanggal >= :pot AND z.tanggal < :akhir) AS kembali
FROM pelanggan p
LEFT JOIN pesanan o ON o.id_pelanggan = p.id_pelanggan AND o.tanggal < :pot
GROUP BY p.id_pelanggan
ORDER BY p.id_pelanggan
"""


def ambil(db, pot, akhir):
    db.row_factory = sqlite3.Row
    return [dict(r) for r in db.execute(SQL, {"pot": pot, "akhir": akhir})]


def aturan(hari_sejak):  # "memesan dalam 30 hari terakhir"
    return hari_sejak is not None and hari_sejak <= 30


if __name__ == "__main__":
    db = sqlite3.connect("toko.db")
    baris = ambil(db, "2026-04-01", "2026-05-01")
    print("pelanggan:", len(baris), "| kembali:", sum(r["kembali"] for r in baris))
    print(baris[0])

    # COUNT(*) dan COUNT(kolom) pada LEFT JOIN, untuk pelanggan tanpa pesanan di jendela itu
    print(db.execute("""
        SELECT COUNT(*), COUNT(o.id_pesanan)
        FROM pelanggan p LEFT JOIN pesanan o
          ON o.id_pelanggan = p.id_pelanggan AND o.tanggal < '2026-01-02'
        WHERE p.id_pelanggan = 'P001'""").fetchone()[:])

    # BOCOR: hari_sejak dihitung dari pesanan yang sudah masuk jendela label
    bocor = dict(db.execute("""
        SELECT p.id_pelanggan, CAST(julianday('2026-05-01') - julianday(MAX(o.tanggal)) AS INTEGER)
        FROM pelanggan p LEFT JOIN pesanan o
          ON o.id_pelanggan = p.id_pelanggan AND o.tanggal < '2026-05-01'
        GROUP BY p.id_pelanggan""").fetchall())
    acc_bocor = sum(aturan(bocor[r["id_pelanggan"]]) == bool(r["kembali"]) for r in baris) / len(baris)
    acc_jujur = sum(aturan(r["hari_sejak"]) == bool(r["kembali"]) for r in baris) / len(baris)
    print("aturan | bocor:", acc_bocor, "| jujur:", acc_jujur)
# keluaran:
# pelanggan: 200 | kembali: 119
# {'id_pelanggan': 'P001', 'segmen': 'reguler', 'frekuensi': 1, 'nilai': 72000, 'hari_sejak': 80, 'kembali': 0}
# (1, 0)
# aturan | bocor: 1.0 | jujur: 0.625
```

Dari 200 pelanggan, 119 memesan lagi pada April (59,5%). `COUNT(*)` memberi 1 dan
`COUNT(o.id_pesanan)` memberi 0 untuk pelanggan tanpa pesanan: salah satunya
menyesatkan laporan. Versi **bocor** menghitung hari sejak pesanan terakhir dari
akhir jendela label, sehingga aturannya **tepat 100%**: ia sekadar membaca
jawaban. Versi jujur hanya 62,5%, angka yang benar. Bila akurasi uji nyaris
sempurna pada masalah yang sulit, curigai kebocoran sebelum merayakan.

### Contoh setengah jadi

```sql setengah-jadi
-- pelanggan tanpa pesanan harus tetap muncul dengan frekuensi 0:
SELECT p.id_pelanggan, COUNT(___) AS frekuensi
FROM pelanggan p ___ JOIN pesanan o
  ON o.id_pelanggan = p.id_pelanggan AND o.tanggal < :pot
GROUP BY p.id_pelanggan
-- bila syarat tanggal dipindah ke WHERE, pelanggan tanpa pesanan ___ dari hasil
```

### Latihan

1. **Ubah:** pindahkan `o.tanggal < :pot` dari `ON` ke `WHERE`; prediksi
   jumlah baris hasil, lalu jalankan.
2. **Buat:** fitur `frekuensi_60` (pesanan dalam 60 hari sebelum titik
   pemotongan) dengan satu kueri SQL; ujilah pada satu pelanggan dengan tangan.
3. **Jelaskan:** mengapa pembagian data acak (bukan menurut waktu) dapat
   menggembungkan hasil pada data yang berurutan waktu?

## Bagian 3: Model (pertemuan 8 sampai 10)

Tetapkan dulu **baseline**: aturan paling sederhana, misalnya selalu menebak
kelas terbanyak; model berguna bila mengalahkannya. Model di sini **regresi
logistik** (`KUL-I-303`). Fitur dibakukan dengan **rerata dan
simpangan baku dari data latih saja**; memakai seluruh data adalah kebocoran.
Hasil latihan disimpan sebagai **berkas model** beserta **kontrak masukannya**
(nama dan urutan fitur, statistik baku, versi), di sini berformat **JSON**:
terbaca orang dan tidak menjalankan kode. Berkas `pickle` dapat menjalankan kode
sembarang saat dimuat; dokumentasi Python menyatakan modul itu tidak aman dan
hanya untuk data yang kamu percaya. Aturan itu berlaku juga untuk model unduhan.

### Prediksi dulu

Model dilatih pada titik pemotongan 2026-04-01 dan diuji pada 2026-05-01
(lebih baru). Di data uji, 114 dari 200 pelanggan kembali. Berapa akurasi
baseline (selalu tebak kelas terbanyak data latih)? Apakah model tiga fitur
mengalahkannya jauh? Apa yang terjadi bila urutan kolom masukan tertukar?

### Contoh terselesaikan

```python
# model.py
import json
import sqlite3

import numpy as np

from fitur import ambil

FITUR = ["frekuensi", "nilai_juta", "hari_sejak"]


def matriks(baris):
    # hari_sejak kosong = belum pernah memesan: diisi 200 (keputusan tercatat)
    X = np.array([[r["frekuensi"], r["nilai"] / 1e6, 200 if r["hari_sejak"] is None else r["hari_sejak"]]
                  for r in baris], dtype=float)
    return X, np.array([r["kembali"] for r in baris], dtype=float)


def latih(X, y):
    rerata, simpang = X.mean(axis=0), X.std(axis=0)  # statistik DARI DATA LATIH saja
    Z = (X - rerata) / simpang
    w, b = np.zeros(Z.shape[1]), 0.0
    for _ in range(2000):
        p = 1 / (1 + np.exp(-(Z @ w + b)))
        w -= 0.1 * (Z.T @ (p - y)) / len(y)
        b -= 0.1 * np.mean(p - y)
    return {"versi": 1, "fitur": FITUR, "rerata": rerata.tolist(), "simpang": simpang.tolist(),
            "bobot": w.tolist(), "bias": b}


def terapkan(model, X, fitur):
    if fitur != model["fitur"]:  # kontrak masukan: urutan kolom harus sama
        raise ValueError(f"fitur tak cocok: {fitur} != {model['fitur']}")
    Z = (X - np.array(model["rerata"])) / np.array(model["simpang"])
    return 1 / (1 + np.exp(-(Z @ np.array(model["bobot"]) + model["bias"])))


if __name__ == "__main__":
    db = sqlite3.connect("toko.db")
    Xl, yl = matriks(ambil(db, "2026-04-01", "2026-05-01"))  # latih
    Xu, yu = matriks(ambil(db, "2026-05-01", "2026-06-01"))  # uji: pemotongan lebih baru
    with open("model.json", "w") as f:
        json.dump(latih(Xl, yl), f)  # JSON, bukan pickle: terbaca orang dan tak menjalankan kode

    with open("model.json") as f:
        dimuat = json.load(f)
    tebak = (terapkan(dimuat, Xu, FITUR) >= 0.5).astype(float)
    terbanyak = float(yl.mean() >= 0.5)  # baseline: selalu tebak kelas terbanyak di data latih
    print("kembali di data uji:", int(yu.sum()), "dari", len(yu))
    print("akurasi baseline:", np.mean(terbanyak == yu), "| model:", np.mean(tebak == yu))
    print("bobot:", dict(zip(FITUR, np.round(dimuat["bobot"], 3))))
    try:
        terapkan(dimuat, Xu, ["nilai_juta", "frekuensi", "hari_sejak"])
    except ValueError as e:
        print("galat:", e)
# keluaran:
# kembali di data uji: 114 dari 200
# akurasi baseline: 0.57 | model: 0.65
# bobot: {'frekuensi': 1.099, 'nilai_juta': -0.442, 'hari_sejak': -0.07}
# galat: fitur tak cocok: ['nilai_juta', 'frekuensi', 'hari_sejak'] != ['frekuensi', 'nilai_juta', 'hari_sejak']
```

Baseline 57%, model 65%: lebih baik, tidak jauh. Bobot `frekuensi` terbesar;
tanda negatif pada `nilai_juta` tampak ganjil. Fitur saling berkorelasi,
jadi **satu bobot tidak boleh ditafsirkan sebagai sebab**. Kontrak masukan
menolak kolom yang tertukar dengan galat jelas; bila tertukar diam-diam,
hasilnya angka yang tampak wajar tetapi salah.

### Contoh setengah jadi

```python setengah-jadi
rerata, simpang = X.mean(axis=0), X.std(axis=0)   # dari data ___ saja
Z = (X - ___) / ___
# berkas model berformat pickle dari sumber tak dikenal: dimuat? ___
```

### Latihan

1. **Ubah:** tambahkan `frekuensi_60` (latihan bagian 2); prediksi apakah
   akurasi naik, lalu bandingkan.
2. **Buat:** `periksa_model(model)` yang menolak berkas bila `versi` tak dikenal
   atau panjang `bobot` berbeda dari jumlah fitur.
3. **Jelaskan:** mengapa baseline wajib dilaporkan berdampingan dengan model?
4. **Berpasangan:** satu orang menyebut fitur yang menurutnya paling
   berpengaruh, satunya mengubahnya sambil menjaga fitur lain tetap dan melihat
   efeknya.

## Bagian 4: Evaluasi (pertemuan 11 dan 12)

Akurasi satu angka belum cukup. **Matriks konfusi** memisahkan TP, FP, FN, TN;
**presisi** `TP / (TP + FP)` dan **recall** `TP / (TP + FN)` menjawab pertanyaan
berbeda, dan biaya tiap jenis salah tidak sama. **Periksa per kelompok** (di sini
segmen `reguler` dan `grosir`): rata-rata bisa baik sementara satu kelompok
kecil buruk. Karena data terbatas, akurasi punya **ketidakpastian**: selang dari
*bootstrap* (sampel ulang dengan pengembalian) memberi gambaran.

### Prediksi dulu

Akurasi model pada 200 pelanggan uji tadi 65%. Bila `grosir` hanya 40
pelanggan, akurasinya lebih stabil atau kurang stabil daripada `reguler`? Berapa
lebar selang 95% kira-kira: 1 poin atau 10 poin?

### Contoh terselesaikan

```python
# evaluasi.py
import json
import sqlite3

import numpy as np

from fitur import ambil
from model import FITUR, matriks, terapkan

db = sqlite3.connect("toko.db")
baris = ambil(db, "2026-05-01", "2026-06-01")
X, y = matriks(baris)
with open("model.json") as f:
    model = json.load(f)
tebak = (terapkan(model, X, FITUR) >= 0.5).astype(float)


def ringkas(y, t):
    tp = int(np.sum((t == 1) & (y == 1)))
    fp = int(np.sum((t == 1) & (y == 0)))
    fn = int(np.sum((t == 0) & (y == 1)))
    tn = int(np.sum((t == 0) & (y == 0)))
    return {"TP": tp, "FP": fp, "FN": fn, "TN": tn, "akurasi": round((tp + tn) / len(y), 3),
            "presisi": round(tp / (tp + fp), 3), "recall": round(tp / (tp + fn), 3)}


print("semua  ", ringkas(y, tebak))
for seg in ("reguler", "grosir"):
    m = np.array([r["segmen"] == seg for r in baris])
    print(f"{seg:7}", int(m.sum()), ringkas(y[m], tebak[m]))

# selang ketidakpastian akurasi: bootstrap 500 kali, benih tetap agar hasil sama
benar = (tebak == y).astype(float)
rng = np.random.default_rng(7)
akurasi = np.sort(benar[rng.integers(0, len(y), size=(500, len(y)))].mean(axis=1))
print("akurasi", round(float(benar.mean()), 3), "| selang 95% kira-kira",
      round(float(akurasi[12]), 3), "sampai", round(float(akurasi[487]), 3))
# keluaran:
# semua   {'TP': 98, 'FP': 54, 'FN': 16, 'TN': 32, 'akurasi': 0.65, 'presisi': 0.645, 'recall': 0.86}
# reguler 160 {'TP': 81, 'FP': 39, 'FN': 13, 'TN': 27, 'akurasi': 0.675, 'presisi': 0.675, 'recall': 0.862}
# grosir  40 {'TP': 17, 'FP': 15, 'FN': 3, 'TN': 5, 'akurasi': 0.55, 'presisi': 0.531, 'recall': 0.85}
# akurasi 0.65 | selang 95% kira-kira 0.59 sampai 0.715
```

Recall 86% tetapi presisi 64,5%: model cenderung menebak "kembali" (FP 54).
`grosir` (40 pelanggan) berakurasi 55%, di bawah baseline 57%, sedangkan
`reguler` 67,5%; selisih itu belum tentu nyata pada 40 pelanggan, tetapi cukup
untuk ditandai. Selang 95% total kira-kira 59% sampai 71,5%, **lebarnya sekitar
12 poin**: laporkan 65% bersama rentangnya. Selang ini hanya memuat variasi
sampel yang sama, bukan variasi antar bulan.

### Contoh setengah jadi

```text setengah-jadi
// TP = 40, FP = 10, FN = 20, TN = 130
// akurasi = ___ ; presisi = ___ ; recall = ___
// model "selalu tebak tidak kembali": recall = ___ ; presisi = ___
```

### Latihan

1. **Ubah:** ambang `0.5` menjadi `0.7`; prediksi arah presisi dan recall.
2. **Buat:** fungsi yang menghitung presisi dan recall per `segmen` dan mencetak
   peringatan bila kelompok memuat kurang dari 50 pelanggan.
3. **Jelaskan:** mengapa selang bootstrap dari satu bulan tidak menjamin hasil
   bulan depan?

## Bagian 5: Penyajian (pertemuan 13 dan 14)

Hasil model sampai ke orang lewat **laporan** dan **tabel**. Sajikan **hitungan
dan rentang**, bukan kepastian; jelaskan batas pemakaian; simpan **hanya yang
diperlukan** (id samaran, skor, pita), tanpa data pribadi. Model menua: data baru
bergeser dari data latih. **Pemeriksaan pergeseran** sederhana membandingkan
rerata fitur data baru dengan data latih dalam simpang baku. Ringkas dalam
**kartu model** satu halaman: tujuan, data, metrik per kelompok dengan selang,
batas, dan siapa yang meninjau. Keputusan yang berdampak pada orang tidak
diserahkan pada skor tanpa tinjauan manusia (`KUL-I-305`).

### Prediksi dulu

`frekuensi` dihitung dari seluruh riwayat sejak 2026-01-01. Pada data yang lebih
baru, rerata `frekuensi` turun, tetap, atau naik, dan apakah itu berarti
pelanggan berubah perilaku?

### Contoh terselesaikan

```python
# sajian.py
import json
import sqlite3

import numpy as np

from fitur import ambil
from model import FITUR, matriks, terapkan

db = sqlite3.connect("toko.db")
with open("model.json") as f:
    model = json.load(f)
baris = ambil(db, "2026-05-01", "2026-06-01")
X, _ = matriks(baris)
skor = terapkan(model, X, FITUR)


def pita(k):
    return "tinggi" if k >= 0.7 else ("sedang" if k >= 0.4 else "rendah")


# 1) hanya yang perlu disajikan: hitungan per segmen dan pita, tanpa nama atau kontak
hitung = {}
for r, k in zip(baris, skor):
    kunci = (r["segmen"], pita(k))
    hitung[kunci] = hitung.get(kunci, 0) + 1
for (segmen, p), n in sorted(hitung.items()):
    print(segmen, p, n)

# 2) pemeriksaan pergeseran: rerata fitur data baru, dalam simpang baku data latih
geser = (X.mean(axis=0) - np.array(model["rerata"])) / np.array(model["simpang"])
print("pergeseran:", dict(zip(FITUR, np.round(geser, 2))))
# keluaran:
# grosir rendah 4
# grosir sedang 15
# grosir tinggi 21
# reguler rendah 14
# reguler sedang 85
# reguler tinggi 61
# pergeseran: {'frekuensi': 0.48, 'nilai_juta': 0.4, 'hari_sejak': -0.09}
```

Rerata `frekuensi` naik 0,48 simpang baku dan `nilai_juta` 0,4. Itu belum berarti
pelanggan berubah: riwayat 4 bulan lebih panjang daripada 3 bulan (jendela
fitur ikut tumbuh), jadi hitungan memang lebih besar. Untuk pergeseran
sungguhan, pakai **jendela fitur tetap** (misalnya 60 hari terakhir). Pita
hanya penanda urutan tindak lanjut; keputusan akhir ada pada orang.

### Contoh setengah jadi

```text setengah-jadi
// kartu model untuk model ini: tujuan = ___ ; batas pemakaian = ___
// metrik wajib per kelompok: ___ ; ___
// pergeseran 0,9 simpang baku pada satu fitur: tindakan = ___
```

### Latihan

1. **Ubah:** hitung ulang pergeseran dengan fitur jendela tetap 60 hari; prediksi
   dulu apakah angkanya mengecil.
2. **Buat:** satu halaman kartu model untuk model ini, dengan selang akurasi dan
   peringatan kelompok kecil.
3. **Jelaskan:** mengapa tabel hasil tidak memuat nama atau kontak pelanggan, dan
   apa yang tetap dapat diidentifikasi bila `id_pelanggan` bocor?
4. **Berpasangan (proyek):** pilih usaha kecil fiktif, rancang alur dari berkas
   mentah sampai laporan, dan saling meninjau kontrak masukan model.

## Latihan bercampur

Soal berikut **tidak menyebut** topiknya. Contoh: "Akurasi uji 99,8% pada data
yang sulit"; "Jumlah pelanggan berkurang setelah syarat dipindah". Kuis
kumulatif (pertemuan 3, 7, 12, 14) berbentuk sama.

## Ulang berjarak

Kerjakan ulang tanpa melihat solusi lama:

- satu minggu setelah bagian: tulis ulang pemuatan idempoten, kueri fitur dengan
  `LEFT JOIN`, atau fungsi presisi dan recall dari ingatan;
- awal bagian baru: dua soal dari bagian sebelumnya;
- semester berikutnya, jawab tanpa catatan (dipakai `KUL-I-401`): mengapa berkas
  model tidak dimuat dengan `pickle` dari sumber tak dikenal; mengapa satu angka
  akurasi harus disertai selang dan baseline.

## Kebijakan AI dan log pemakaian

Silabus bagian 6.3 **belum menyatakan** tingkat AI mata kuliah ini. Modul
memakai usulan baku `[asumsi]` (Q2 rancangan): **Kuning** untuk tugas membangun
alur dan model dari dasar, **Hijau** untuk proyek (dengan log), **Merah** untuk
ujian praktik; dosen menetapkan per tugas. Pada Kuning AI boleh menjelaskan
konsep, **tidak** boleh menghasilkan solusi yang diserahkan, dan hanya sesudah
gerbang kesiapan: kamu dapat (1) menelusuri program pendek, (2) menulis satu uji
yang gagal bila kode salah, (3) menjelaskan kode dengan kata sendiri. Pada
Hijau, AI boleh dipakai dengan pengungkapan ringkas dan **log wajib** di
repositorimu sendiri: alat dan versi, tujuan, perintah, bagian keluaran yang
dipakai. Dosen dapat mewawancarai kodemu.

**Butir khas: data.** Jangan menempelkan data pelanggan nyata, kolom identitas,
kata sandi, atau kunci ke layanan AI; pakai data sintetis atau cuplikan buatanmu
sendiri. Verifikasi SQL dan fitur dari AI dengan **hitungan tangan pada
beberapa baris** dan uji kebocoran (apakah fitur hanya memakai data sebelum titik
pemotongan): akurasi tinggi yang mencurigakan sering berasal dari kebocoran.
Jangan memuat model atau berkas `pickle` dari sumber tak dipercaya. Keputusan
yang berdampak pada orang tidak diserahkan pada keluaran model tanpa tinjauan
manusia.

## Kesalahan umum

- **Membuang baris tanpa catatan**, atau **pemuatan tidak idempoten**.
- **Syarat tanggal di `WHERE` pada `LEFT JOIN`**, atau `COUNT(*)` menggantikan
  `COUNT(kolom)`.
- **Kebocoran data:** fitur mengintip masa depan, atau pembakuan memakai seluruh
  data.
- **Tanpa baseline**, atau **satu angka akurasi tanpa selang dan tanpa kelompok**.
- **Memuat model `pickle` dari sumber tak dikenal.**

## Cek mandiri

Tutup modul, jawab, baru periksa.

1. Apa arti pemuatan idempoten, dan bagaimana `ON CONFLICT` membantu?
2. Mengapa `COUNT(o.id_pesanan)` dan `COUNT(*)` berbeda pada pelanggan tanpa
   pesanan?
3. Apa itu titik pemotongan waktu, dan apa akibat melanggarnya?
4. Mengapa statistik pembakuan dihitung dari data latih saja?
5. Presisi dan recall untuk TP = 40, FP = 10, FN = 20?

Daftar periksa (kosong; kamu isi sendiri, tidak dikumpulkan):

- [ ] Aku dapat membangun alur ETL yang idempoten dengan catatan penolakan.
- [ ] Aku dapat membuat fitur tanpa kebocoran dan memakai model dengan kontrak
  masukan.
- [ ] Aku dapat melaporkan metrik per kelompok dengan baseline dan rentang.

## Kunci dan petunjuk

- **Ingat kembali:** `LEFT JOIN` mempertahankan baris kiri dengan `NULL` bila
  tak berpasangan, `INNER JOIN` tidak; `COUNT(*)` menghitung baris,
  `COUNT(kolom)` hanya yang tak `NULL`. Kueri berparameter menjaga isi data tak
  menjadi perintah. Akurasi 95% pada kejadian langka dicapai dengan selalu
  menebak "tidak"; kebocoran data: informasi uji masuk ke latihan. Menghapus
  nama tidak cukup karena kombinasi atribut lain dapat mengenali orang.
- **Bagian 1:** prediksi: 1.198 diterima; 1.198 baris setelah dua kali muat.
  Setengah jadi: `id_pesanan`; `jumlah`; sama. Latihan 1: 0 baris (harga
  tertinggi 49.000); aturan yang tak pernah memicu perlu dipertanyakan.
- **Bagian 2:** prediksi: sekitar 62% (jujur) dan 100% (bocor). Setengah jadi:
  `o.id_pesanan`; `LEFT`; hilang. Latihan 1: baris berkurang menjadi
  pelanggan yang berpesanan saja.
- **Bagian 3:** prediksi: baseline 57%, model 65%; kolom tertukar ditolak
  dengan galat. Setengah jadi: `latih`; `rerata`; `simpang`; pickle: tidak,
  jangan dimuat tanpa percaya sumbernya.
- **Bagian 4:** prediksi: kelompok 40 kurang stabil; selang sekitar 12 poin.
  Setengah jadi: akurasi 0,85; presisi 0,8; recall 0,667; model "selalu tidak":
  recall 0, presisi tak terdefinisi (0 dibagi 0).
- **Bagian 5:** prediksi: naik, bukan perubahan perilaku (jendela fitur tumbuh).
  Setengah jadi: tujuan: urutan tindak lanjut; batas: bukan untuk memutus
  layanan, keputusan oleh orang; metrik per kelompok: presisi dan recall dengan
  selang; pergeseran besar: periksa data, lalu latih ulang atau tinjau.
- **Cek mandiri:** (5) presisi 0,8, recall 0,667.
- **Petunjuk bertahap bila macet:** (1) hitung beberapa baris dengan tangan;
  (2) jalankan kueri di `sqlite3` dan lihat baris hasilnya; (3) periksa apakah
  tiap fitur sudah diketahui pada saat prediksi.

## Langkah berikutnya

`KUL-I-401` memakai disiplin serupa (log, tinjau, uji) pada produk tim;
`KUL-I-305` membahas privasi dan tata kelola AI; `KUL-I-303` memperdalam
evaluasi model.

## Catatan untuk dosen

Bobot dan bentuk asesmen berikut **usulan**; prodi menetapkan (silabus 6.1,
6.2): proyek alur data kecil dengan kartu model dan log pemakaian AI, praktikum
per bagian, wawancara kode, kuis kumulatif, ujian praktik tanpa AI. Variasi
tugas per mahasiswa: domain data (toko, perpustakaan, klinik fiktif), titik
pemotongan, fitur. Silabus memuat "model terlatih"; modul ini melatih model kecil
sendiri agar jalur dari data sampai model terlihat, lalu memuatnya dari berkas
dengan kontrak masukan. Memakai model pihak ketiga (unduhan) berada di luar
contoh; bila dilakukan, ajarkan pemeriksaan sumber, lisensi, dan format berkas.
Angka di modul berasal dari data sintetis, bukan klaim tentang kinerja nyata.
Tidak ada data berisi orang nyata.
