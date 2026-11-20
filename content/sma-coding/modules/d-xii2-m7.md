## Untuk siapa modul ini

Modul ini untuk murid kelas XII jalur D (kecerdasan buatan dan analisis data), untuk minggu `D-XII2-M7` silabus v1.3: sprint 3 penyempurnaan, yaitu memperbaiki model dan kode, dengan keluaran rilis kandidat. Prasyarat: modul `d-xii2-m6`. Alat: Python 3 dengan `numpy`, `pandas`, dan `scikit-learn`, tanpa akun. Berkelompok atau sendiri.

Modul ini karangan penyusun dan disetujui pemilik program pada 2026-11-20 (keputusan lewat dialog; catatan tinjauan menjadi tindak lanjut revisi). Jalur D adalah pengayaan di luar rumusan capaian pembelajaran (CP). Minggu ini tidak punya irisan pengayaan, jadi modul ini tidak dihitung memenuhi butir CP mana pun.

Aturan jalur D yang berlaku: data hanya sintetis (karangan) atau terbuka dengan lisensi jelas, tanpa data yang bisa mengenali orang; wajah, suara, dan foto orang tidak dipakai sebagai data; AI generatif boleh dipakai dengan etika dan dicatat, tanpa data pribadi, kata sandi, atau tugas bernilai pada permintaanmu, dan kamu tidak wajib punya akun. Saran: jawab dulu sendiri, baru minta AI memberi petunjuk bertahap; kode buatan AI dibaca, dijalankan, dan diuji. Pada proyek, catat pemakaian AI di log.

Catatan untuk guru: blok Python dijalankan penyusun dengan `python3 -I` (Python 3.14.6, `numpy` 2.5.5, `pandas` 3.1.1, `scikit-learn` 1.9.1, per 2026-11) dan keluarannya ditempel apa adanya; yang dinyatakan hanya "bisa dijalankan dengan keluaran ini", bukan "benar untuk semua masukan". Data sama dengan `d-xii2-m3`. "Pengguna fiktif" dan anggaran 35 persen karangan penyusun; semua karangan.

## Ingat kembali

Jawab dari ingatan, baru cek di bagian kunci.

1. Kapan data uji dibuka, berapa kali, dan mengapa? (dari `d-xii1-m13`)
2. Mengapa galat dibaca baris demi baris, dan apa yang dicatat dari tiap kelompok galat? (dari `d-xii2-m6`)
3. Sebutkan lima isi laporan garis dasar. (dari `d-xii2-m4`)

## Tujuan

Setelah modul ini kamu dapat:

- mengubah satu hal per eksperimen dari hipotesis analisis galat dan menilai selisihnya terhadap sebaran;
- memilih ambang keputusan dari tebakan di luar lipatan dan sebuah anggaran dari pengguna, tanpa data uji;
- menulis catatan perubahan sasaran yang terbuka, dan tetap melaporkan sasaran lama;
- membekukan rilis kandidat dengan sidik jari sebelum data uji dibuka.

Keluaran yang diminta silabus: rilis kandidat.

## Rencana sprint

Dua hipotesis dari `d-xii2-m6`: (S1) fitur turunan `tebal_per_hari` membantu model menangkap buku tebal berjangka pendek; (S2) tanda yang terlalu banyak (43 persen peminjaman) melampaui kemampuan petugas, jadi ambang keputusan perlu dinaikkan. Perubahan ambang tidak membuat model lebih pintar; ia hanya memilih titik kerja antara recall dan presisi. Kode dirapikan seperti `d-xii1-m10`: benih di satu tempat, fungsi satu tugas.

Dalam peran pengguna fiktif, seorang teman menyatakan petugas hanya sanggup mengirim pengingat untuk 35 persen peminjaman (anggaran karangan). Anggaran itu masuk sebagai syarat, bukan sebagai pilihan sesudah melihat data uji.

Prediksi dulu. Tebak dan tulis: apakah S1 menaikkan F1 melebihi sebarannya, dan pada ambang berapa tanda masih di bawah 35 persen?

```python
import hashlib
import json

import numpy as np
import pandas as pd
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import f1_score, make_scorer, precision_score, recall_score
from sklearn.model_selection import StratifiedKFold, cross_val_predict, cross_validate, train_test_split

BENIH = 2026
ANGGARAN = 0.35  # pengguna fiktif: pengingat paling banyak untuk 35 persen peminjaman


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


data = buat_data(600)
latih, uji = train_test_split(data, test_size=0.25, stratify=data["terlambat"], random_state=BENIH)
X = pd.get_dummies(data[["tebal", "hari", "jenis", "musim_ujian"]], drop_first=True).astype(float)
X_latih, y_latih = X.loc[latih.index], latih["terlambat"]
lipatan = StratifiedKFold(n_splits=5, shuffle=True, random_state=0)
metrik = {
    "recall": make_scorer(recall_score, zero_division=0),
    "presisi": make_scorer(precision_score, zero_division=0),
    "f1": make_scorer(f1_score, zero_division=0),
}


def model():
    return LogisticRegression(max_iter=1000, class_weight="balanced")


def eksperimen(kode, perubahan, fitur):
    h = cross_validate(model(), fitur, y_latih, cv=lipatan, scoring=metrik)
    f = h["test_f1"]
    print(f"{kode} | {perubahan:<24} | recall {h['test_recall'].mean():.2f} | presisi {h['test_presisi'].mean():.2f} | F1 {f.mean():.2f} +- {f.std():.2f}")
    return f


# S1: satu perubahan fitur dari model terpilih (hipotesis dari analisis galat)
X_baru = X_latih.assign(tebal_per_hari=latih["tebal"] / latih["hari"])
f0 = eksperimen("S0", "model terpilih", X_latih)
f1 = eksperimen("S1", "tambah tebal_per_hari", X_baru)
selisih = f1.mean() - f0.mean()
print(f"S1: selisih F1 {selisih:+.2f}; sebaran {max(f0.std(), f1.std()):.2f}; ->", "dipakai" if selisih > max(f0.std(), f1.std()) else "belum terbukti, tidak dipakai")

# S2: ambang keputusan, dipilih dari tebakan di luar lipatan di bawah anggaran pengingat
peluang = cross_val_predict(model(), X_latih, y_latih, cv=lipatan, method="predict_proba")[:, 1]
print("ambang | pengingat | recall | presisi")
for ambang in (0.45, 0.50, 0.55, 0.60, 0.65):
    tanda = peluang >= ambang
    tp = int((tanda & (y_latih == 1)).sum())
    print(f"{ambang:.2f} | {tanda.mean():.2f} | {tp / y_latih.sum():.2f} | {tp / tanda.sum():.2f}")
grid = [round(0.30 + 0.05 * i, 2) for i in range(11)]
AMBANG = min(a for a in grid if (peluang >= a).mean() <= ANGGARAN)
print("ambang terpilih (terendah yang masih dalam anggaran):", AMBANG)

recall, presisi = [], []
for _, v in lipatan.split(X_latih, y_latih):
    tanda = peluang[v] >= AMBANG
    benar = (tanda & (y_latih.iloc[v].to_numpy() == 1)).sum()
    recall.append(benar / y_latih.iloc[v].sum())
    presisi.append(benar / tanda.sum())
print(f"S2 | ambang {AMBANG} | recall {np.mean(recall):.2f} +- {np.std(recall):.2f} | presisi {np.mean(presisi):.2f} +- {np.std(presisi):.2f}")
print("terhadap sasaran lama (recall 0.60, presisi 0.50):", "terpenuhi" if np.mean(recall) >= 0.60 and np.mean(presisi) >= 0.50 else "belum terpenuhi")
SASARAN_BARU = {"recall": 0.55, "presisi": 0.35, "pengingat_maks": ANGGARAN}
bagian_tanda = float((peluang >= AMBANG).mean())
ok = np.mean(recall) >= SASARAN_BARU["recall"] and np.mean(presisi) >= SASARAN_BARU["presisi"] and bagian_tanda <= ANGGARAN
print("terhadap sasaran baru (recall 0.55, presisi 0.35, pengingat paling banyak 0.35):", "terpenuhi" if ok else "belum terpenuhi")

# catatan perubahan sasaran: terbuka, beralasan, dan sasaran lama tetap dilaporkan
perubahan = {
    "minggu": 7,
    "sasaran_lama": {"recall": 0.60, "presisi": 0.50},
    "sasaran_baru": SASARAN_BARU,
    "alasan": "presisi 0.50 tidak tercapai oleh tiga model; pengguna fiktif hanya sanggup 35 persen pengingat; sasaran baru ditetapkan sesudah melihat lipatan",
    "bukti": "lipatan data latih; data uji tidak dibuka",
}
print("catatan perubahan:", json.dumps(perubahan, ensure_ascii=False))

# rilis kandidat: konfigurasi dibekukan dan diberi sidik jari
KANDIDAT = {
    "data": "buat_data(n=600, benih=2026); uji 0.25 ditutup",
    "model": "LogisticRegression(max_iter=1000, class_weight='balanced')",
    "fitur": list(X_latih.columns),
    "ambang": AMBANG,
}
print("sidik kandidat:", hashlib.sha256(json.dumps(KANDIDAT, sort_keys=True).encode("utf-8")).hexdigest()[:12])
```

```text
S0 | model terpilih           | recall 0.66 | presisi 0.36 | F1 0.47 +- 0.08
S1 | tambah tebal_per_hari    | recall 0.68 | presisi 0.37 | F1 0.48 +- 0.06
S1: selisih F1 +0.01; sebaran 0.08; -> belum terbukti, tidak dipakai
ambang | pengingat | recall | presisi
0.45 | 0.51 | 0.75 | 0.35
0.50 | 0.43 | 0.65 | 0.36
0.55 | 0.34 | 0.58 | 0.41
0.60 | 0.27 | 0.50 | 0.44
0.65 | 0.20 | 0.39 | 0.46
ambang terpilih (terendah yang masih dalam anggaran): 0.55
S2 | ambang 0.55 | recall 0.58 +- 0.13 | presisi 0.40 +- 0.06
terhadap sasaran lama (recall 0.60, presisi 0.50): belum terpenuhi
terhadap sasaran baru (recall 0.55, presisi 0.35, pengingat paling banyak 0.35): terpenuhi
catatan perubahan: {"minggu": 7, "sasaran_lama": {"recall": 0.6, "presisi": 0.5}, "sasaran_baru": {"recall": 0.55, "presisi": 0.35, "pengingat_maks": 0.35}, "alasan": "presisi 0.50 tidak tercapai oleh tiga model; pengguna fiktif hanya sanggup 35 persen pengingat; sasaran baru ditetapkan sesudah melihat lipatan", "bukti": "lipatan data latih; data uji tidak dibuka"}
sidik kandidat: a1f97fdbe259
```

Baca hasilnya. S1 menaikkan F1 hanya 0,01, jauh di dalam sebaran 0,08: belum terbukti, jadi tidak dipakai, dan model yang lebih sederhana dipertahankan. Menaikkan ambang menurunkan recall dan menaikkan presisi: ambang 0,55 menandai 34 persen peminjaman, dengan recall 0,58 dan presisi 0,40. Sasaran lama (recall 0,60, presisi 0,50) belum terpenuhi, dan itu tetap dilaporkan. Sasaran baru ditetapkan bersama pengguna fiktif dengan catatan perubahan; karena ditetapkan sesudah melihat lipatan, kelonggarannya ditulis sebagai kelemahan, dan keputusan akhir menunggu data uji. Ambang dipilih dari data yang sama dengan penilaiannya, sehingga angkanya sedikit optimis; pengujian akhir memeriksanya.

**Rilis kandidat** adalah konfigurasi yang dibekukan: data, model, fitur, ambang, benih, dan versi, dengan sidik jari. Sesudah itu perubahan apa pun berarti rilis kandidat baru; data uji belum boleh dibuka sampai kandidat final. README memuat rilis kandidat, catatan perubahan, dan log AI.

## Daftar periksa

Centang tiap langkah dengan bukti.

- [ ] Tiap eksperimen mengubah satu hal dan dinilai pada lipatan; hasil dicatat bersama sebaran.
- [ ] Ambang dipilih tanpa data uji; anggaran berasal dari pengguna.
- [ ] Catatan perubahan sasaran memuat sasaran lama, sasaran baru, alasan, dan bukti.
- [ ] Hasil terhadap sasaran lama dan baru sama-sama dilaporkan.
- [ ] Kode dirapikan; keluaran sebelum dan sesudah sama; sidik kandidat dicatat di README.
- [ ] Prediksi ditulis sebelum menjalankan; log AI diisi bila AI dipakai.

## Umpan balik sejawat

Tukar rilis kandidat dengan tim lain: satu yang sudah baik, satu yang perlu diperbaiki, satu langkah berikutnya, masing-masing menunjuk bagian catatan. Pemeriksa bertanya: apakah perubahan sasaran beralasan dan terbuka, dan apakah ada tanda data uji dipakai memilih.

## Latihan bercampur

1. Dari `d-xii2-m5`: S1 tidak dipakai karena selisihnya di dalam sebaran. Tulis baris tabel eksperimen untuk S1 dengan hipotesis, perubahan, hasil, dan keputusan (`AI: boleh`).
2. Dari `d-xii2-m2`: apa yang berubah pada sidik rancangan bila sasaran diubah, dan mengapa catatan perubahan tetap diperlukan (`AI: tanpa AI`)?

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `d-xii2-m8` (sekitar satu minggu lagi), `d-xii2-m10` (sekitar tiga minggu lagi), dan `D-XII2-M14` (sekitar tujuh minggu lagi). Jawab sekarang lalu simpan.

1. Apa arti rilis kandidat, dan apa yang dibekukan sebelum data uji dibuka?
2. Kapan sasaran boleh diubah, dan apa yang dicatat dalam catatan perubahan?
3. Mengapa ambang keputusan menjadi bagian model yang dibekukan, dan mengapa dipilih tanpa data uji?

## Kesalahan umum

- **"Ambang yang baik adalah yang memberi angka terbaik pada data uji."** Itu memilih dengan data uji; pilih dari lipatan dan anggaran.
- **"Sasaran turun diam-diam asal hasilnya tampak lulus."** Catat sasaran lama, sasaran baru, alasan, dan lapor keduanya.
- **"Dua perubahan sekaligus lebih hemat."** Kamu tak tahu mana yang bekerja.
- **"Rilis kandidat boleh diutak-atik sesudah uji."** Setiap perubahan setelah uji membuat angka uji tak berlaku.

## Cek mandiri

- [ ] Saya dapat menguji satu perubahan terhadap sebaran.
- [ ] Saya dapat memilih ambang dari anggaran tanpa data uji.
- [ ] Saya dapat menulis catatan perubahan sasaran yang terbuka.
- [ ] Saya dapat membekukan rilis kandidat dengan sidik jari.
- [ ] Saya mencatat pemakaian AI bila memakainya.

## Kunci dan petunjuk

**Ingat kembali.** 1: sekali, di akhir setelah model dan keputusan tetap, agar angkanya jujur; bila dipakai memilih, angka akhir terlalu optimis. 2: galat memperlihatkan pola yang tak terlihat di rata-rata; catat ciri, jumlah, dan hipotesis tiap kelompok. 3: pembanding dan cara memilihnya, metrik utama beserta alasan, ukuran data dan jumlah per kelas, tabel hasil, kesimpulan yang boleh dan tidak boleh.

**Rencana sprint.** Tebakan wajar: S1 tidak membantu banyak karena model linear sudah memakai tebal dan hari; ambang sekitar 0,55 sampai 0,60 masuk anggaran.

**Daftar periksa.** Dinilai dari bukti: tabel, catatan perubahan, dan sidik kandidat.

**Latihan bercampur.** 1: contoh: S1 | dari S0 | tambah `tebal_per_hari` | hipotesis: membantu buku tebal berjangka pendek | F1 0,48 +- 0,06 lawan 0,47 +- 0,08 | belum terbukti, tidak dipakai. 2: sidik berubah total; catatan perubahan menjelaskan siapa, mengapa, dan atas bukti apa, sehingga perubahan itu sah, bukan diam-diam.

**Ulang berjarak.** 1: konfigurasi dibekukan (data, model, fitur, ambang, benih, versi) dan diberi sidik jari; data uji tetap tertutup sampai kandidat final. 2: bila bukti dan pengguna menunjukkan sasaran tak realistis, lewat catatan perubahan: sasaran lama dan baru, alasan, bukti, dan keduanya dilaporkan; tidak boleh diam-diam. 3: ambang mengubah recall dan presisi sehingga termasuk model yang diuji; dipilih dari lipatan dan anggaran supaya data uji tak memengaruhinya.

## Langkah berikutnya

Modul berikut: `d-xii2-m8` (pengujian akhir: menguji pada data yang belum dipakai). Bacaan lanjut: bagian *Tuning the decision threshold for class prediction* pada dokumentasi `scikit-learn` (di `Rujukan`).
