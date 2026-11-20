## Untuk siapa modul ini

Modul ini untuk murid kelas XII jalur D (kecerdasan buatan dan analisis data), untuk minggu `D-XII2-M5` silabus v1.3: sprint 2 model, yaitu membangun dan membandingkan model, dengan keluaran model dan catatan. Prasyarat: modul `d-xii2-m4`. Alat: Python 3 dengan `numpy`, `pandas`, dan `scikit-learn`, tanpa akun. Berkelompok atau sendiri.

Modul ini karangan penyusun dan disetujui pemilik program pada 2026-11-20 (keputusan lewat dialog; catatan tinjauan menjadi tindak lanjut revisi). Jalur D adalah pengayaan di luar rumusan capaian pembelajaran (CP). Minggu ini tidak punya irisan pengayaan, jadi modul ini tidak dihitung memenuhi butir CP mana pun.

Aturan jalur D yang berlaku: data hanya sintetis (karangan) atau terbuka dengan lisensi jelas, tanpa data yang bisa mengenali orang; wajah, suara, dan foto orang tidak dipakai sebagai data; AI generatif boleh dipakai dengan etika dan dicatat, tanpa data pribadi, kata sandi, atau tugas bernilai pada permintaanmu, dan kamu tidak wajib punya akun. Saran: jawab dulu sendiri, baru minta AI memberi petunjuk bertahap; kode buatan AI dibaca, dijalankan, dan diuji. Pada proyek, catat pemakaian AI di log.

Catatan untuk guru: blok Python dijalankan penyusun dengan `python3 -I` (Python 3.14.6, `numpy` 2.5.5, `pandas` 3.1.1, `scikit-learn` 1.9.1, per 2026-11) dan keluarannya ditempel apa adanya; yang dinyatakan hanya "bisa dijalankan dengan keluaran ini", bukan "benar untuk semua masukan". Data sama dengan `d-xii2-m3`; semua karangan.

## Ingat kembali

Jawab dari ingatan, baru cek di bagian kunci.

1. Mengapa jumlah baris tiap kelompok ditulis di samping angkanya? (dari `d-xii1-m11`)
2. Mengapa pembanding dinilai pada lipatan yang sama dengan model, dan apa arti presisi nol pada tebakan mayoritas? (dari `d-xii2-m4`)
3. Apa yang dikunci di dokumen rancangan, dan mengapa sidik jari dipakai? (dari `d-xii2-m2`)

## Tujuan

Setelah modul ini kamu dapat:

- membandingkan tiga model dengan data, fitur, lipatan, metrik, dan benih yang sama;
- membaca rata-rata dan sebaran, dan menilai apakah selisih antarmodel melebihi sebaran;
- memilih model dengan aturan yang ditulis di rancangan, bukan dengan selera;
- menulis catatan model yang memuat juga model yang tidak dipilih.

Keluaran yang diminta silabus: model dan catatan.

## Rencana sprint

Sprint ini menjalankan bagian model dari rancangan `d-xii2-m2`: tiga kandidat dari sederhana ke rumit, dipilih dengan aturan tertulis (F1 tertinggi; selisih yang tidak melebihi sebaran dianggap setara, lalu pilih yang paling sederhana). Agar adil, enam hal berikut harus sama:

| Harus sama | Nilai di proyek |
| --- | --- |
| Data dan fitur | 450 baris latih; tebal, hari, jenis, musim ujian |
| Pembagian | lima lipatan, `random_state=0` |
| Metrik | recall, presisi, F1 (`zero_division=0`) |
| Bobot kelas | seimbang pada ketiganya |
| Benih model | `random_state=0` untuk pohon dan hutan |
| Versi | Python dan pustaka dicatat |

Prediksi dulu. Dari `d-xii2-m4`, aturan tulisan tangan memiliki recall 0,34. Tebak dan tulis: apakah ketiga model mengalahkannya, apakah model yang paling rumit pasti menang, dan model mana yang dipilih oleh aturan di atas?

```python
import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import f1_score, make_scorer, precision_score, recall_score
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

# urutan kandidat = urutan kerumitan (sesuai dokumen rancangan)
kandidat = {
    "regresi logistik seimbang": LogisticRegression(max_iter=1000, class_weight="balanced"),
    "pohon kedalaman 3": DecisionTreeClassifier(max_depth=3, class_weight="balanced", random_state=0),
    "hutan acak": RandomForestClassifier(n_estimators=100, max_depth=4, class_weight="balanced", random_state=0),
}
print("terlambat per lipatan validasi:", [int(y_latih.iloc[v].sum()) for _, v in lipatan.split(X_latih, y_latih)])

hasil = {}
for nama, model in kandidat.items():
    h = cross_validate(model, X_latih, y_latih, cv=lipatan, scoring=metrik)
    hasil[nama] = {k: (h["test_" + k].mean(), h["test_" + k].std()) for k in metrik}
    r, p, f = (hasil[nama][k] for k in ("recall", "presisi", "f1"))
    print(f"{nama:<26} | recall {r[0]:.2f} +- {r[1]:.2f} | presisi {p[0]:.2f} +- {p[1]:.2f} | F1 {f[0]:.2f} +- {f[1]:.2f}")


def pilih(hasil):
    """Aturan rancangan: F1 tertinggi; selisih yang tidak melebihi sebaran dianggap setara; pilih yang paling sederhana."""
    terbaik = max(hasil, key=lambda nama: hasil[nama]["f1"][0])
    rata, sebaran = hasil[terbaik]["f1"]
    setara = [nama for nama in hasil if rata - hasil[nama]["f1"][0] <= sebaran]
    return terbaik, setara, setara[0]  # dict menjaga urutan sederhana ke rumit


terbaik, setara, dipilih = pilih(hasil)
print("F1 tertinggi:", terbaik)
print("setara dengan yang tertinggi:", setara)
print("dipilih:", dipilih)
```

```text
terlambat per lipatan validasi: [22, 22, 21, 21, 21]
regresi logistik seimbang  | recall 0.66 +- 0.15 | presisi 0.36 +- 0.05 | F1 0.47 +- 0.08
pohon kedalaman 3          | recall 0.75 +- 0.06 | presisi 0.34 +- 0.03 | F1 0.46 +- 0.04
hutan acak                 | recall 0.71 +- 0.08 | presisi 0.37 +- 0.04 | F1 0.48 +- 0.05
F1 tertinggi: hutan acak
setara dengan yang tertinggi: ['regresi logistik seimbang', 'pohon kedalaman 3', 'hutan acak']
dipilih: regresi logistik seimbang
```

Baca hasilnya. Ketiga model menaikkan recall jauh di atas aturan tulisan tangan (0,34) dengan selisih yang melampaui sebaran, tetapi presisinya masih sekitar 0,35, jauh dari sasaran 0,50. Hutan acak memiliki F1 tertinggi (0,48), tetapi selisihnya dengan dua model lain (0,01 dan 0,02) jauh di dalam sebaran, jadi ketiganya setara menurut aturan; yang dipilih regresi logistik karena paling sederhana. Pohon memiliki recall tertinggi (0,75) dengan presisi terendah; bila tim lebih mementingkan recall, itu perubahan aturan yang dicatat lewat catatan perubahan, bukan pergantian pilihan sesudah melihat hasil. Setiap lipatan validasi hanya berisi sekitar 21 baris terlambat, jadi angka itu berayun.

**Catatan model** memuat untuk tiap kandidat: parameter, hasil beserta sebaran, dan keputusan, termasuk model yang tidak dipilih dan alasannya. Hutan acak bergantung pada benih; benih dicatat.

## Daftar periksa

Centang tiap langkah dengan bukti.

- [ ] Enam hal yang harus sama tertulis dan benar-benar sama di kode.
- [ ] Rata-rata dan sebaran dilaporkan; jumlah baris terlambat per lipatan ditulis.
- [ ] Pilihan model mengikuti aturan di rancangan; sidik rancangan tidak berubah.
- [ ] Catatan model memuat model yang tidak dipilih.
- [ ] Data uji tidak disentuh.
- [ ] Prediksi ditulis sebelum menjalankan; log AI diisi bila AI dipakai.

## Umpan balik sejawat

Tukar catatan model dengan tim lain: satu yang sudah baik, satu yang perlu diperbaiki, satu langkah berikutnya, masing-masing menunjuk baris tabel. Pemeriksa bertanya: apakah keenam hal sama, apakah keputusan mengikuti aturan, dan apakah selisih dibaca bersama sebarannya.

## Latihan bercampur

1. Dari `d-xii2-m4`: model baru dengan recall 0,36 mengalahkan aturan tulisan tangan 0,34 pada sebaran 0,07. Apa yang kamu katakan (`AI: tanpa AI`)?
2. Dari `d-xii1-m7`: hutan acak berbeda hasil bila benihnya diganti. Apa yang kamu catat, dan bagaimana kamu memeriksa kestabilan pilihanmu (`AI: boleh`)?

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `d-xii2-m6` (sekitar satu minggu lagi), `d-xii2-m8` (sekitar tiga minggu lagi), dan `D-XII2-M13` (sekitar delapan minggu lagi). Jawab sekarang lalu simpan.

1. Apa saja yang harus sama agar tiga model dibandingkan secara adil?
2. Apa aturan memilih model bila selisih tidak melebihi sebaran, dan mengapa pilihan jatuh pada yang sederhana?
3. Apa isi catatan model, dan mengapa model yang tidak dipilih tetap dicatat?

## Kesalahan umum

- **"Model rumit pasti lebih baik."** Selisih yang kecil dari sebaran tidak membuktikan apa pun, dan model sederhana lebih mudah dijelaskan serta diperiksa.
- **"Aturan pilih diganti sesudah melihat hasil."** Itu memilih dengan selera; ubah lewat catatan perubahan beserta alasannya.
- **"Hasil satu benih sudah pasti."** Model yang bergantung benih perlu dicatat benihnya, dan stabilitasnya diperiksa.
- **"Model yang kalah tidak perlu dicatat."** Percobaan yang gagal mencegah timmu mengulanginya.

## Cek mandiri

- [ ] Saya dapat membandingkan tiga model secara adil.
- [ ] Saya dapat menilai selisih terhadap sebaran.
- [ ] Saya dapat memilih model dengan aturan tertulis.
- [ ] Saya dapat menulis catatan model lengkap.
- [ ] Saya mencatat pemakaian AI bila memakainya.

## Kunci dan petunjuk

**Ingat kembali.** 1: agar pembaca menilai kuat-lemahnya angka; persen dari kelompok tipis goyah. 2: agar perbandingan adil (data, lipatan, benih sama); presisi nol berarti tak ada tanda positif, bukan hasil baik. 3: rancangan lengkap (data, model, evaluasi, tindakan bila gagal) agar tidak berubah diam-diam; sidik jari (hash) berubah bila isinya berubah.

**Rencana sprint.** Tebakan wajar: ketiganya mengalahkan aturan pada recall; yang rumit belum tentu menang; aturan akan memilih yang sederhana bila ketiga F1 berdekatan. Hasilnya: regresi logistik seimbang.

**Daftar periksa.** Dinilai dari bukti: catatan model, kode, dan sidik rancangan.

**Latihan bercampur.** 1: selisih 0,02 jauh di bawah sebaran 0,07, jadi belum terbukti; ia tidak dipakai sebagai alasan memilih. 2: catat benih; ganti beberapa benih dan lihat apakah pilihan aturan sama; bila berubah-ubah, laporkan sebarannya.

**Ulang berjarak.** 1: data, fitur, lipatan, metrik, bobot kelas, benih, dan versi. 2: selisih yang tidak melebihi sebaran dianggap setara, lalu pilih yang paling sederhana karena lebih mudah dijelaskan dan diperiksa. 3: parameter, hasil beserta sebaran, dan keputusan; yang kalah dicatat agar tidak diulang dan agar keputusan dapat diperiksa.

## Langkah berikutnya

Modul berikut: `d-xii2-m6` (sprint evaluasi: mengevaluasi dengan benar dan mencari galat). Bacaan lanjut: `cross_validate` dan `RandomForestClassifier` pada dokumentasi `scikit-learn` (di `Rujukan`).
