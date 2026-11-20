## Untuk siapa modul ini

Modul ini untuk murid kelas XII jalur D (kecerdasan buatan dan analisis data), untuk minggu `D-XII1-M8` silabus v1.3: iterasi model II, yaitu mencatat eksperimen agar dapat diulang, dengan keluaran tabel eksperimen (latihan: tiga eksperimen). Prasyarat terindeks: modul `d-xi2-m14`. Modul `d-xii1-m7` (satu perbaikan terukur, kode E0 sampai E2) dan `d-xii1-m5` (data Pustaka Contoh) ditulis dalam seri yang sama dan dibaca lebih dulu. Alat: Python 3 dengan `numpy`, `pandas`, dan `scikit-learn`, tanpa akun.

Modul ini karangan penyusun dan disetujui pemilik program pada 2026-11-20 (keputusan lewat dialog; catatan tinjauan menjadi tindak lanjut revisi). Jalur D adalah pengayaan di luar rumusan capaian pembelajaran (CP). Minggu ini tidak punya irisan pengayaan, jadi modul ini tidak dihitung memenuhi butir CP mana pun.

Aturan jalur D yang berlaku: data hanya sintetis (karangan) atau terbuka dengan lisensi jelas, tanpa data yang bisa mengenali orang; wajah, suara, dan foto orang tidak dipakai sebagai data; AI generatif boleh dipakai dengan etika dan dicatat, tanpa data pribadi, kata sandi, atau tugas bernilai pada permintaanmu, dan kamu tidak wajib punya akun. Saran: jawab dulu sendiri, baru minta AI memberi petunjuk bertahap; kode buatan AI dibaca, dijalankan, dan diuji. Setiap soal `Latihan` bertanda `AI: boleh` atau `AI: tanpa AI`.

Catatan untuk guru: blok Python dijalankan penyusun dengan `python3 -I` (Python 3.14.6, `numpy` 2.5.5, `pandas` 3.1.1, `scikit-learn` 1.9.1, per 2026-11) dan keluarannya ditempel apa adanya; yang dinyatakan hanya "bisa dijalankan dengan keluaran ini", bukan "benar untuk semua masukan". Angka dapat sedikit berbeda pada versi lain. Fungsi `buat_data` disalin dari `d-xii1-m5` agar program berdiri sendiri; data uji tidak dibuka di modul ini.

## Ingat kembali

Jawab dari ingatan, baru cek di bagian kunci.

1. Mengapa hanya satu hal diubah per eksperimen, dan apa yang dicatat di tabel eksperimen? (dari `d-xii1-m7`)
2. Apa yang dicatat di catatan sumber dan data, dan mengapa data sintetis harus menyebut asumsinya? (dari `d-xii1-m5`)
3. Mengapa selisih ketepatan yang lebih kecil daripada sebaran antar lipatan belum membuktikan satu model lebih baik? (dari `d-xi2-m8`)

## Tujuan

Setelah modul ini kamu dapat:

- menulis tabel eksperimen dengan kode, kode induk, satu perubahan, hipotesis, hasil beserta sebaran, dan keputusan;
- menjalankan tiga eksperimen dari satu kode induk dan menilai tiap selisih terhadap sebarannya;
- menulis keputusan sesudah membaca hasil, termasuk "belum terbukti";
- menjalankan ulang seluruh tabel dari program dan mendapat angka yang sama.

Keluaran yang diminta silabus: tabel eksperimen.

## Prediksi dulu

Dari `d-xii1-m7`: E1 (bobot kelas seimbang) mencapai recall 0,63 dengan sebaran 0,31. Tiga eksperimen berikutnya masing-masing mengubah satu hal dari E1: `C = 0.1` (E2), tambahan fitur `tebal` kali `musim_ujian` (E3), dan pohon keputusan kedalaman 3 (E4). Tebak dan tulis: manakah yang selisih recall-nya terhadap E1 melebihi sebaran 0,31? Tebak juga: bila seluruh program dijalankan dua kali, apakah tabelnya sama?

## Contoh terselesaikan

**Tabel eksperimen adalah ingatan proyek.** Satu baris per percobaan: *kode*, *dari* (kode induk, sehingga jelas apa yang dibandingkan), *perubahan* (tepat satu), *hipotesis* (ditulis sebelum menjalankan), *hasil* (rata-rata dan sebaran), dan *keputusan* (ditulis sesudah membaca hasil). Kondisi tetap dicatat sekali di atas tabel: data, benih 2026, lipatan `random_state=0`, versi pustaka. Percobaan yang gagal tetap dicatat, supaya orang lain (dan dirimu bulan depan) tidak mengulanginya.

Aturan keputusan yang dipakai di sini sederhana: selisih rata-rata yang tidak melebihi sebaran dianggap **belum terbukti**. Ini aturan kasar untuk latihan, bukan uji statistik.

```python
import numpy as np
import pandas as pd
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import make_scorer, precision_score
from sklearn.model_selection import StratifiedKFold, cross_validate, train_test_split
from sklearn.tree import DecisionTreeClassifier

BENIH = 2026


def buat_data(n=200, benih=BENIH):
    rng = np.random.default_rng(benih)
    tebal = rng.integers(40, 500, n)
    hari = rng.choice([7, 14, 21], n, p=[0.4, 0.4, 0.2])
    jenis = rng.choice(["anak", "umum", "referensi"], n, p=[0.3, 0.55, 0.15])
    ujian = rng.integers(0, 2, n)
    skor = -3.0 + 0.006 * tebal + 0.9 * ujian - 0.05 * hari + (jenis == "umum") * 0.4
    p = 1 / (1 + np.exp(-skor))
    terlambat = (rng.random(n) < p).astype(int)
    return pd.DataFrame(
        {
            "kode": [f"P{i:03d}" for i in range(1, n + 1)],
            "tebal": tebal,
            "hari": hari,
            "jenis": jenis,
            "musim_ujian": ujian,
            "terlambat": terlambat,
        }
    )


data = buat_data()
latih, uji = train_test_split(data, test_size=0.25, stratify=data["terlambat"], random_state=BENIH)
X = pd.get_dummies(data[["tebal", "hari", "jenis", "musim_ujian"]], drop_first=True).astype(float)
X_latih, y_latih = X.loc[latih.index], latih["terlambat"]
lipatan = StratifiedKFold(n_splits=5, shuffle=True, random_state=0)

PERCOBAAN = [  # (kode, dari, perubahan, hipotesis)
    ("E0", "-", "regresi logistik bawaan", "garis dasar"),
    ("E1", "E0", "bobot kelas seimbang", "recall naik"),
    ("E2", "E1", "C = 0.1", "kurang meluap"),
    ("E3", "E1", "tambah fitur tebal*ujian", "interaksi membantu"),
    ("E4", "E1", "pohon kedalaman 3", "pola bukan garis"),
]
X3 = X_latih.assign(tebal_ujian=X_latih["tebal"] * X_latih["musim_ujian"])
MODEL = {
    "E0": (LogisticRegression(max_iter=1000), X_latih),
    "E1": (LogisticRegression(max_iter=1000, class_weight="balanced"), X_latih),
    "E2": (LogisticRegression(max_iter=1000, class_weight="balanced", C=0.1), X_latih),
    "E3": (LogisticRegression(max_iter=1000, class_weight="balanced"), X3),
    "E4": (DecisionTreeClassifier(max_depth=3, class_weight="balanced", random_state=0), X_latih),
}
zd = make_scorer(precision_score, zero_division=0)


def jalankan():
    baris = []
    for kode, dari, perubahan, hipotesis in PERCOBAAN:
        model, fitur = MODEL[kode]
        h = cross_validate(model, fitur, y_latih, cv=lipatan, scoring={"recall": "recall", "presisi": zd})
        r, p = h["test_recall"], h["test_presisi"]
        baris.append((kode, dari, perubahan, hipotesis, round(r.mean(), 2), round(r.std(), 2), round(p.mean(), 2)))
    return pd.DataFrame(baris, columns=["kode", "dari", "perubahan", "hipotesis", "recall", "sebaran", "presisi"])


KEPUTUSAN = {  # ditulis SESUDAH membaca hasil
    "E0": "dasar",
    "E1": "dipakai",
    "E2": "belum terbukti",
    "E3": "belum terbukti",
    "E4": "belum terbukti",
}
tabel = jalankan()
tabel["keputusan"] = tabel["kode"].map(KEPUTUSAN)
for b in tabel.itertuples():
    print(f"{b.kode} dari {b.dari:<2} | {b.perubahan:<26} | recall {b.recall:.2f} +- {b.sebaran:.2f} | presisi {b.presisi:.2f} | {b.keputusan}")
print("diulang, tabel sama:", jalankan().equals(tabel.drop(columns="keputusan")))
```

```text
E0 dari -  | regresi logistik bawaan    | recall 0.04 +- 0.08 | presisi 0.10 | dasar
E1 dari E0 | bobot kelas seimbang       | recall 0.63 +- 0.31 | presisi 0.26 | dipakai
E2 dari E1 | C = 0.1                    | recall 0.67 +- 0.22 | presisi 0.27 | belum terbukti
E3 dari E1 | tambah fitur tebal*ujian   | recall 0.63 +- 0.31 | presisi 0.26 | belum terbukti
E4 dari E1 | pohon kedalaman 3          | recall 0.50 +- 0.09 | presisi 0.20 | belum terbukti
diulang, tabel sama: True
```

Baca hasilnya. E1 naik jauh dari E0 (0,04 menjadi 0,63, jauh melampaui sebaran), jadi keputusannya "dipakai". Tiga eksperimen berikutnya **tidak satu pun** melampaui sebaran E1: selisih E2 hanya 0,04, E3 persis sama dengan E1 (fitur tambahannya tidak membantu model linear ini), dan E4 lebih rendah 0,13 tetapi masih di dalam sebaran 0,31. Itu hasil yang sah. Presisi semuanya sekitar 0,2 sampai 0,3: ukuran sukses `d-xii1-m1` (presisi sedikitnya 0,50) belum tercapai. Baris terakhir menunjukkan keterulangan: data, benih, dan lipatan tetap, sehingga tabel sama. Angka yang sebenarnya goyah ditunjukkan pada Latihan 2.

## Contoh setengah jadi

Lengkapi `____` agar program menilai selisih E2 terhadap E1.

```python setengah-jadi
e1, sebaran_e1, e2 = 0.63, 0.31, 0.67
selisih = round(____ - e1, 2)
print(selisih, "ada bukti" if abs(selisih) > ____ else "belum terbukti")
```

## Soal Parsons

Susun baris menjadi fungsi `bukti` yang benar bila selisih melebihi sebaran, lalu mencetak hasil untuk dua pasang angka. Lekukan dipakai; yang diacak hanya urutannya.

```text
print(bukti(0.67, 0.63, 0.31), bukti(0.90, 0.63, 0.10))
    return abs(baru - lama) > sebaran
def bukti(baru, lama, sebaran):
```

## Latihan

1. **Tiga eksperimen.** (`AI: boleh`) Untuk proyekmu, tulis tiga baris tabel eksperimen: tiap baris punya kode induk, tepat satu perubahan, dan hipotesis yang ditulis sebelum menjalankan. Jalankan, lalu tulis keputusan.
2. **Benih lipatan lain.** (`AI: boleh`) Ubah `random_state` lipatan dari 0 menjadi 1 dan jalankan ulang program contoh. Apa yang berubah pada E1 dan E4, dan apa artinya bagi keputusanmu?
3. **Baris yang kurang.** (`AI: tanpa AI`) Sebuah baris berbunyi "E5 | tambah fitur | recall naik | dipakai". Sebutkan paling sedikit empat hal yang kurang.
4. **Hipotesis sesudahnya.** (`AI: tanpa AI`) Temanmu menulis hipotesis E3 setelah melihat hasilnya. Mengapa itu menyesatkan?
5. **Catatan pemakaian AI (opsional).** Catat alat, tujuan, garis besar perintah, bagian yang dipakai, dan cara memeriksanya. Jangan menaruh data pribadi apa pun pada permintaanmu.

## Latihan bercampur

1. Dari `d-xii1-m5`: tabel eksperimen memakai data karangan. Tulis satu kalimat asumsi yang harus ada di catatan sumber dan data supaya pembaca tidak mengira hasilnya fakta dunia nyata.
2. Dari `d-xii1-m6`: E1 punya recall 0,63 dan presisi 0,26, sedangkan tebakan mayoritas recall 0. Apa yang dikatakan tabel tentang E1 dan apa yang belum?

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `D-XII1-M9` (sekitar satu minggu lagi), `D-XII1-M11` (sekitar tiga minggu lagi), dan `D-XII2-M2` (sekitar delapan minggu lagi). Jawab sekarang lalu simpan.

1. Bagaimana kamu memutuskan sebuah perubahan "terbukti membantu", dan apa yang kamu lakukan bila tidak ada yang terbukti?
2. Mengapa eksperimen yang tidak menaikkan metrik tetap dicatat?
3. Sebutkan empat hal yang membuat tabel eksperimen dapat diulang orang lain.

## Kesalahan umum

- **"Eksperimen yang gagal tak perlu dicatat."** Tanpa catatannya, kegagalan yang sama diulang dan tabel tampak lebih mulus daripada kenyataan.
- **"Hipotesis boleh ditulis sesudah melihat hasil."** Hipotesis sesudahnya selalu tampak benar, jadi tidak menguji apa pun.
- **"Selisih 0,04 berarti E2 menang."** Selisih sekecil itu masih di dalam sebaran antar lipatan.
- **"Satu benih lipatan cukup."** Benih lain dapat mengubah sebaran, bahkan kesimpulan; cobalah beberapa benih.

## Cek mandiri

- [ ] Saya dapat menulis tabel eksperimen lengkap dengan kode induk dan keputusan.
- [ ] Saya menulis hipotesis sebelum menjalankan dan keputusan sesudahnya.
- [ ] Saya menilai selisih terhadap sebaran dan berani menulis "belum terbukti".
- [ ] Saya dapat menjalankan ulang tabel dan mendapat angka yang sama.
- [ ] Saya mencatat pemakaian AI bila saya memakainya.

## Kunci dan petunjuk

**Ingat kembali.** 1: agar penyebab perubahan hasil jelas; tabel memuat kode, hipotesis, perubahan, kondisi tetap, hasil beserta sebaran, dan keputusan. 2: asal, lisensi, baris dan kolom, arti label, asumsi, batas, dan privasi; asumsi disebut karena hanya itu yang bisa "ditemukan" model dari data sintetis. 3: karena selisih sekecil itu bisa timbul dari pembagian data atau awal bobot yang acak; sebaran menunjukkan seberapa besar selisih yang bisa kebetulan.

**Prediksi dulu.** Tidak satu pun melampaui sebaran 0,31: E2 +0,04, E3 0,00, E4 −0,13. Tabelnya sama bila dijalankan dua kali karena data, benih, dan lipatan tetap.

**Contoh setengah jadi.** Isian: `e2`, `sebaran_e1`.

```python
e1, sebaran_e1, e2 = 0.63, 0.31, 0.67
selisih = round(e2 - e1, 2)
print(selisih, "ada bukti" if abs(selisih) > sebaran_e1 else "belum terbukti")
```

```text
0.04 belum terbukti
```

**Soal Parsons.** Urutan benar:

```python
def bukti(baru, lama, sebaran):
    return abs(baru - lama) > sebaran
print(bukti(0.67, 0.63, 0.31), bukti(0.90, 0.63, 0.10))
```

```text
False True
```

**Latihan.** 1: rubrik: tiap baris punya kode induk, satu perubahan, hipotesis sebelum hasil, sebaran, dan keputusan sesudah hasil. 2: dengan `random_state=1`: E1 recall 0,58 dengan sebaran 0,04, E2 0,61 dengan 0,14, E3 0,58, dan E4 0,38 dengan sebaran 0,16. Sebaran E1 menyempit, dan E4 kini lebih rendah 0,20, melebihi sebaran: pada benih ini E4 tampak lebih buruk, padahal pada benih 0 "belum terbukti". Kesimpulan tentang selisih kecil bergantung pada pembagian lipatan; ulangi dengan beberapa benih sebelum memutuskan. 3: kode induk, perubahan yang spesifik, hipotesis, kondisi tetap, sebaran, dan alasan keputusan; "tambah fitur" terlalu kabur, dan "recall naik" belum angka. 4: karena hipotesis dibentuk dari hasil, sehingga pasti cocok dan tidak bisa salah. 5: opsional.

**Latihan bercampur.** 1: contoh: "Data dibangkitkan program dengan aturan karangan penulis; hasil model hanya berlaku untuk pembangkit ini, bukan untuk perpustakaan nyata." 2: E1 jauh lebih baik daripada tebakan mayoritas dalam menangkap peminjaman terlambat (0,63 lawan 0), tetapi presisinya rendah (sekitar 0,26), sehingga sekitar tiga dari empat pengingat terbuang dan ukuran sukses belum tercapai; tabel belum menunjukkan bahwa model layak dipakai.

**Ulang berjarak.** 1: selisih rata-rata melebihi sebaran antar lipatan, idealnya diulang dengan benih lipatan lain; bila tidak ada yang terbukti, pertahankan yang sederhana dan tulis "belum terbukti". 2: agar kegagalan tidak diulang, hasil tidak tampak lebih mulus daripada kenyataan, dan orang lain tahu apa yang sudah dicoba. 3: data atau versinya, benih acak dan lipatan, versi Python dan pustaka, parameter model dan perubahan tiap percobaan (kode induk dan hasil beserta sebaran).

## Langkah berikutnya

Modul berikut: `d-xii1-m9` (ulasan sejawat), yang memakai tabel eksperimen timmu sebagai bahan menilai proyek tim lain. Bacaan lanjut: `cross_validate` dan bagian *Common pitfalls* pada dokumentasi `scikit-learn`, serta laporan Pineau dkk. tentang keterulangan riset pembelajaran mesin (di `Rujukan`).
