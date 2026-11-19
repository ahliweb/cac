## Untuk siapa modul ini

Modul ini untuk murid kelas XII jalur D (kecerdasan buatan dan analisis data), untuk minggu `D-XII2-M4` silabus v1.3: sprint 1 garis dasar, yaitu membuat model pembanding, dengan keluaran laporan garis dasar. Prasyarat: modul `d-xii2-m3`. Alat: Python 3 dengan `numpy`, `pandas`, dan `scikit-learn`, tanpa akun. Berkelompok atau sendiri.

Modul ini berstatus DRAF: karangan penyusun, belum ditinjau pemilik. Jalur D adalah pengayaan di luar rumusan capaian pembelajaran (CP). Minggu ini tidak punya irisan pengayaan, jadi modul ini tidak dihitung memenuhi butir CP mana pun.

Aturan jalur D yang berlaku: data hanya sintetis (karangan) atau terbuka dengan lisensi jelas, tanpa data yang bisa mengenali orang; wajah, suara, dan foto orang tidak dipakai sebagai data; AI generatif boleh dipakai dengan etika dan dicatat, tanpa data pribadi, kata sandi, atau tugas bernilai pada permintaanmu, dan kamu tidak wajib punya akun. Saran: jawab dulu sendiri, baru minta AI memberi petunjuk bertahap; kode buatan AI dibaca, dijalankan, dan diuji. Pada proyek, catat pemakaian AI di log.

Catatan untuk guru: blok Python dijalankan penyusun dengan `python3 -I` (Python 3.14.6, `numpy` 2.5.5, `pandas` 3.1.1, `scikit-learn` 1.9.1, per 2026-11) dan keluarannya ditempel apa adanya; yang dinyatakan hanya "bisa dijalankan dengan keluaran ini", bukan "benar untuk semua masukan". Berbeda dari `d-xii1-m6`, garis dasar di sini dihitung pada lipatan data latih, bukan pada data uji, karena data uji proyek akhir tetap tertutup sampai pengujian akhir. Data sama dengan `d-xii2-m3`; semua karangan.

## Ingat kembali

Jawab dari ingatan, baru cek di bagian kunci.

1. Mengapa perubahan versi pustaka atau benih dapat mengubah angka, dan bagaimana kamu menjaganya? (dari `d-xii1-m10`)
2. Mengapa pembagian latih dan uji dibuat sebelum melihat hasil, dan pemeriksaan apa memastikan tidak ada baris yang sama di keduanya? (dari `d-xii2-m3`)
3. Apa empat syarat topik yang layak, dan mengapa topik dikecilkan lebih dulu? (dari `d-xii2-m1`)

## Tujuan

Setelah modul ini kamu dapat:

- membuat tiga pembanding: tebakan mayoritas, aturan tulisan tangan, dan model bawaan;
- menilai pembanding pada lipatan data latih yang sama, dengan rata-rata dan sebaran, tanpa membuka data uji;
- memilih metrik utama sesuai dampak kesalahan dan menjelaskan mengapa ketepatan saja menyesatkan;
- menulis laporan garis dasar dan menetapkan angka yang harus dikalahkan model.

Keluaran yang diminta silabus: laporan garis dasar.

## Rencana sprint

Sprint ini menjalankan bagian pembanding dari rancangan `d-xii2-m2`. Metrik utama tetap recall kelas terlambat, ditemani presisi (`d-xii1-m6`): tanda terlewat berarti pengingat tak terkirim, tanda palsu hanya membuang satu pengingat. Pembanding dinilai dengan lipatan yang sama dengan model nanti, supaya adil.

Prediksi dulu. Tebak dan tulis: berapa ketepatan tebakan "selalu tepat waktu" pada lipatan, dan berapa recall-nya? Menurutmu, mana yang recall-nya lebih tinggi, aturan tulisan tangan atau regresi logistik bawaan?

```python
import numpy as np
import pandas as pd
from sklearn.base import BaseEstimator, ClassifierMixin
from sklearn.dummy import DummyClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import f1_score, make_scorer, precision_score, recall_score
from sklearn.model_selection import StratifiedKFold, cross_validate, train_test_split

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


class AturanTebalUjian(BaseEstimator, ClassifierMixin):
    """Pembanding tulisan tangan dari d-xii1-m6: tandai buku tebal 300 halaman atau lebih pada musim ujian."""

    def fit(self, X, y):
        self.classes_ = np.unique(y)
        return self

    def predict(self, X):
        return ((X["tebal"] >= 300) & (X["musim_ujian"] == 1)).astype(int).to_numpy()


data = buat_data(600)
latih, uji = train_test_split(data, test_size=0.25, stratify=data["terlambat"], random_state=BENIH)
X = pd.get_dummies(data[["tebal", "hari", "jenis", "musim_ujian"]], drop_first=True).astype(float)
X_latih, y_latih = X.loc[latih.index], latih["terlambat"]
lipatan = StratifiedKFold(n_splits=5, shuffle=True, random_state=0)
metrik = {
    "ketepatan": "accuracy",
    "recall": make_scorer(recall_score, zero_division=0),
    "presisi": make_scorer(precision_score, zero_division=0),
    "f1": make_scorer(f1_score, zero_division=0),
}

print("latih:", len(latih), "terlambat:", int(y_latih.sum()), "| uji ditutup:", len(uji), "baris")
print("pembanding | ketepatan | recall | presisi | F1")
for nama, model in {
    "tebakan mayoritas": DummyClassifier(strategy="most_frequent"),
    "aturan tebal+ujian": AturanTebalUjian(),
    "regresi logistik bawaan": LogisticRegression(max_iter=1000),
}.items():
    h = cross_validate(model, X_latih, y_latih, cv=lipatan, scoring=metrik)
    sel = " | ".join(f"{h['test_' + k].mean():.2f} +- {h['test_' + k].std():.2f}" for k in metrik)
    print(f"{nama} | {sel}")
```

```text
latih: 450 terlambat: 107 | uji ditutup: 150 baris
pembanding | ketepatan | recall | presisi | F1
tebakan mayoritas | 0.76 +- 0.01 | 0.00 +- 0.00 | 0.00 +- 0.00 | 0.00 +- 0.00
aturan tebal+ujian | 0.74 +- 0.02 | 0.34 +- 0.07 | 0.43 +- 0.04 | 0.38 +- 0.06
regresi logistik bawaan | 0.75 +- 0.03 | 0.10 +- 0.05 | 0.46 +- 0.29 | 0.17 +- 0.08
```

Baca hasilnya. Tebakan mayoritas memiliki ketepatan tertinggi (0,76) tetapi tidak menangkap satu pun peminjaman terlambat; ketepatan saja menyesatkan pada data timpang. Presisinya 0 karena ia tidak pernah menandai; `zero_division=0` menetapkan nilai itu secara terbuka. Aturan tulisan tangan menangkap sekitar sepertiga (recall 0,34) dengan presisi 0,43. Regresi logistik bawaan hampir tidak menandai apa pun (recall 0,10), sehingga presisinya goyah (sebaran 0,29). Tidak satu pun memenuhi sasaran (recall 0,60, presisi 0,50). Kesimpulan yang sah: model berikutnya harus mengalahkan aturan tulisan tangan, yaitu recall di atas 0,34 dan F1 di atas 0,38. Kesimpulan yang tidak sah: "regresi logistik jelek"; yang diukur hanya versi bawaan, bobot kelas (`d-xii1-m7`) belum dicoba di sini.

**Laporan garis dasar** memuat: pembanding dan cara memilihnya (aturan dari data latih saja); metrik utama beserta alasannya; ukuran data (450 baris latih, 107 terlambat, sekitar 21 per lipatan; data uji 150 baris, ditutup); tabel hasil dengan sebaran; dan kesimpulan yang boleh ditarik beserta yang tidak boleh. Pada `d-xii2-m8` pembanding yang sama dinilai sekali pada data uji, di samping model.

## Daftar periksa

Centang tiap langkah dengan bukti.

- [ ] Tiga pembanding dijalankan pada lipatan yang sama; benih dan versi dicatat.
- [ ] Data uji tidak disentuh; aturan tulisan tangan tidak dipilih dengan melihatnya.
- [ ] Rata-rata dan sebaran dilaporkan; perlakuan pembagian nol ditulis (`zero_division`).
- [ ] Metrik utama punya alasan; ketepatan hanya pelengkap.
- [ ] Angka yang harus dikalahkan model ditulis; kesimpulan yang tidak sah disebut.
- [ ] Prediksi ditulis sebelum menjalankan; log AI diisi bila AI dipakai.

## Umpan balik sejawat

Tukar laporan garis dasar dengan tim lain: satu yang sudah baik, satu yang perlu diperbaiki, satu langkah berikutnya, masing-masing menunjuk baris tabel. Pemeriksa bertanya: apakah ada pembanding sederhana, apakah sebaran ditulis, dan apakah kesimpulan melampaui bukti.

## Latihan bercampur

1. Dari `d-xii2-m2`: sasaran proyek ditulis di dokumen rancangan yang dikunci. Bila garis dasar menunjukkan sasaran presisi sulit dicapai, apa yang boleh dan tidak boleh kamu lakukan (`AI: tanpa AI`)?
2. Dari `d-xii1-m6`: tebakan mayoritas pada data uji kecil bisa tampak sama baik dengan model. Mengapa lipatan dengan sebaran lebih jujur daripada satu angka (`AI: boleh`)?

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `d-xii2-m5` (sekitar satu minggu lagi), `d-xii2-m7` (sekitar tiga minggu lagi), dan `D-XII2-M12` (sekitar delapan minggu lagi). Jawab sekarang lalu simpan.

1. Mengapa pembanding dinilai pada lipatan yang sama dengan model, dan apa arti presisi nol pada tebakan mayoritas?
2. Sebutkan lima isi laporan garis dasar.
3. Mengapa slide hasil selalu memuat pembanding sederhana di samping model?

## Kesalahan umum

- **"Ketepatan tinggi berarti baik."** Tebakan yang tak menangkap satu pun peminjaman terlambat bisa memiliki ketepatan tertinggi.
- **"Pembanding cukup dihitung sekali pada data uji."** Itu membuka data uji; hitung pada lipatan dan buka uji sekali di akhir.
- **"Pembanding dipilih dengan mengintip data uji."** Aturan dipilih dari data latih atau pengetahuan pengguna.
## Cek mandiri

- [ ] Saya dapat membuat pembanding dan menilainya pada lipatan.
- [ ] Saya dapat membaca rata-rata dan sebaran.
- [ ] Saya dapat memilih metrik utama dan menjelaskan alasannya.
- [ ] Saya dapat menulis laporan garis dasar dengan angka yang harus dikalahkan.
- [ ] Saya mencatat pemakaian AI bila memakainya.

## Kunci dan petunjuk

**Ingat kembali.** 1: algoritma atau urutan acak dapat berubah antarversi, jadi catat versi Python dan pustaka serta benih, dan jalankan ulang dari awal untuk memeriksa hasil sama. 2: agar keputusan tidak dipengaruhi hasil; periksa bahwa irisan kode (atau ciri) kedua bagian kosong. 3: ada keputusan yang dibantu, data legal, pembanding dan ukuran sukses, tanpa data pribadi; proyek kecil yang selesai lebih berharga daripada yang besar tak selesai.

**Rencana sprint.** Tebakan wajar: ketepatan sekitar 0,76 (bagian peminjaman tepat waktu), recall 0. Aturan tulisan tangan cenderung lebih tinggi recall-nya daripada regresi logistik bawaan karena model bawaan jarang menandai kelas minoritas.

**Daftar periksa.** Dinilai dari bukti: laporan, keluaran program, dan catatan versi.

**Latihan bercampur.** 1: boleh: melaporkan apa adanya, mencari sebab lewat analisis galat, mencoba satu perubahan per eksperimen, atau membahas kelayakan sasaran dengan pengguna dan mencatatnya lewat catatan perubahan; tidak boleh: mengubah sasaran diam-diam (sidik rancangan akan berubah) atau memakai data uji. 2: satu angka pada data kecil goyah; lima lipatan memperlihatkan sebarannya, sehingga selisih kecil tidak terbaca sebagai bukti.

**Ulang berjarak.** 1: agar perbandingan adil (data, lipatan, dan benih sama); presisi nol berarti tidak ada tanda positif, bukan hasil yang baik. 2: pembanding dan cara memilihnya, metrik utama beserta alasan, ukuran data dan jumlah per kelas, tabel hasil, kesimpulan yang boleh dan tidak boleh. 3: karena angka model tanpa pembanding tidak berarti; pembaca perlu tahu apa yang dicapai tanpa belajar.

## Langkah berikutnya

Modul berikut: `d-xii2-m5` (sprint model: membangun dan membandingkan tiga model). Bacaan lanjut: `DummyClassifier` dan `precision_recall_fscore_support` (perlakuan `zero_division`) pada dokumentasi `scikit-learn` (di `Rujukan`).
