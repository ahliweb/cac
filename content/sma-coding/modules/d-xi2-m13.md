## Untuk siapa modul ini

Modul ini untuk murid kelas XI jalur D (kecerdasan buatan dan analisis data), untuk minggu `D-XI2-M13` silabus v1.3: proyek mini semester 2, yaitu satu proyek model dari data hingga kartu model. Prasyarat: modul `d-xi2-m12` (modul tertulis dalam seri yang sama). Alat: Python 3 dengan `numpy`, `pandas`, dan `scikit-learn`, tanpa akun. Berkelompok atau sendiri.

Modul ini karangan penyusun dan disetujui pemilik program pada 2026-11-20 (keputusan lewat dialog; catatan tinjauan menjadi tindak lanjut revisi). Jalur D adalah pengayaan di luar rumusan capaian pembelajaran (CP). Minggu ini tidak punya irisan pengayaan, jadi modul ini tidak dihitung memenuhi butir CP mana pun.

Aturan jalur D yang berlaku: data hanya sintetis (karangan) atau terbuka dengan lisensi jelas, tanpa data yang bisa mengenali orang; wajah, suara, dan foto orang tidak dipakai sebagai data; AI generatif boleh dipakai dengan etika dan dicatat, tanpa data pribadi, kata sandi, atau tugas bernilai pada permintaanmu, dan kamu tidak wajib punya akun. Saran: jawab dulu sendiri, baru minta AI memberi petunjuk bertahap; kode buatan AI dibaca, dijalankan, dan diuji. Pada proyek, catat pemakaian AI di log (lihat `Daftar periksa`).

Catatan untuk guru: blok Python dijalankan penyusun dengan `python3 -I` (Python 3.14.6, `numpy` 2.5.5, `pandas` 3.1.1, `scikit-learn` 1.9.1, per 2026-11) dan keluarannya ditempel apa adanya; yang dinyatakan hanya "bisa dijalankan dengan keluaran ini", bukan "benar untuk semua masukan". Data "mesin karangan" dibangkitkan program, dan aturannya karangan penyusun. Murid memilih datanya sendiri; data terbuka harus lolos pemeriksaan lisensi `d-xi1-m5`. Rubrik pada kunci adalah usulan, tanpa angka resmi.

## Ingat kembali

Jawab dari ingatan, baru cek di bagian kunci.

1. Mengapa kata yang paling mendorong tebakan hanya menunjukkan pola, bukan sebab? (dari `d-xi2-m5`)
2. Apa saja bagian kartu model, dan baris mana yang menyatakan ketidakpastian? (dari `d-xi2-m12`)
3. Apa tiga status klaim di lembar periksa, dan apa yang dilakukan bila klaim belum bisa dipastikan? (dari `d-xi2-m10`)

## Tujuan

Setelah modul ini kamu dapat:

- menulis rencana satu halaman beserta prediksi hasil sebelum mengerjakan;
- mengerjakan alur data, pembanding, sedikitnya dua model, penjelasan, dan kartu model tanpa kebocoran;
- menulis kartu model dengan batasan, risiko, dan baris biaya komputasi dan energi;
- mencatat pemakaian AI dan menjalankan program ulang dari awal;
- memberi umpan balik sejawat yang berisi.

Keluaran yang diminta silabus: program dan laporan.

## Rencana proyek

Tulis rencana **sebelum** kode. Satu halaman berisi: **pertanyaan** (apa yang ditebak, untuk keputusan apa); **data** (sumber dan lisensi, atau pembangkit "karangan"); **pembersihan**; **pembanding**; **metrik utama** dengan alasan; **kriteria selesai**; **prediksi** angka pembanding dan model; **risiko**.

**Contoh rencana terselesaikan.** Pertanyaan: dari suhu, getaran, dan jam pakai mesin karangan, tebak apakah mesin rusak, untuk memilih mesin yang diperiksa lebih dulu. Data: `buat_mesin` (300 baris; sebagian getaran hilang; sebagian label dibalik). Pembersihan: nilai hilang diisi median di dalam `Pipeline`; jumlahnya dicatat. Pembanding: tebakan "tidak rusak". Metrik utama: recall kelas rusak, karena melewatkan mesin rusak paling merugikan dalam keputusan fiktif ini. Prediksi: pembanding sekitar 0,7 dengan recall 0; pohon sederhana di atas 0,85; jaringan belum tentu mengalahkan pohon. Risiko: mengisi nilai hilang sebelum membagi data. Kriteria selesai: program jalan ulang dan kartu model terisi.

Kerangka berikut menjalankan rencana itu sampai kartu; ganti data, pertanyaan, dan modelnya dengan milikmu.

```python
import warnings

import numpy as np
import pandas as pd
from sklearn.dummy import DummyClassifier
from sklearn.impute import SimpleImputer
from sklearn.inspection import permutation_importance
from sklearn.model_selection import StratifiedKFold, cross_validate, train_test_split
from sklearn.neural_network import MLPClassifier
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.tree import DecisionTreeClassifier

warnings.simplefilter("ignore")


def buat_mesin(n, benih):
    acak = np.random.default_rng(benih)
    suhu = acak.uniform(40, 90, n)  # derajat Celsius, karangan
    getaran = acak.uniform(0, 10, n)  # satuan karangan
    jam = acak.uniform(0, 5000, n)  # jam pakai, karangan
    rusak = (((suhu > 75) & (getaran > 6)) | (jam > 4200)).astype(int)  # aturan karangan
    balik = acak.random(n) < 0.07  # derau: sebagian label dibalik
    rusak = np.where(balik, 1 - rusak, rusak)
    df = pd.DataFrame({"suhu": suhu, "getaran": getaran, "jam": jam, "rusak": rusak})
    df.loc[df.index % 25 == 3, "getaran"] = np.nan  # nilai hilang sengaja
    return df


df = buat_mesin(300, 0)
X = df[["suhu", "getaran", "jam"]]
y = df["rusak"]
print("baris:", len(df), "| hilang (getaran):", int(X["getaran"].isna().sum()), "| kelas:", y.value_counts().to_dict())

lipatan = StratifiedKFold(n_splits=5, shuffle=True, random_state=0)  # lipatan yang sama untuk semua model
model = {
    "pembanding": DummyClassifier(strategy="most_frequent"),
    "pohon": make_pipeline(SimpleImputer(strategy="median"), DecisionTreeClassifier(max_depth=3, random_state=0)),
    "jaringan": make_pipeline(
        SimpleImputer(strategy="median"),  # nilai hilang diisi DI DALAM Pipeline: tanpa kebocoran
        StandardScaler(),
        MLPClassifier(hidden_layer_sizes=(8,), max_iter=2000, random_state=0),
    ),
}
ringkas = {}
for nama, m in model.items():
    hasil = cross_validate(m, X, y, cv=lipatan, scoring=["accuracy", "recall"])
    ringkas[nama] = (hasil["test_accuracy"].mean(), hasil["test_recall"].mean())
    print(f"{nama:10s} ketepatan {ringkas[nama][0]:.3f} | recall rusak {ringkas[nama][1]:.3f}")

X_latih, X_uji, y_latih, y_uji = train_test_split(X, y, test_size=0.3, stratify=y, random_state=0)
pohon = model["pohon"].fit(X_latih, y_latih)
imp = permutation_importance(pohon, X_uji, y_uji, n_repeats=20, random_state=0)  # penjelasan pada data uji
for nama, rata, sebar in zip(X.columns, imp.importances_mean, imp.importances_std):
    print(f"importansi {nama:8s} {rata:6.3f} +- {sebar:.3f}")

kartu = {  # lihat d-xi2-m12; bagian yang belum diisi tercetak "tidak diketahui"
    "nama": "penggolong kerusakan mesin (karangan), pohon kedalaman 3",
    "tujuan": "latihan proyek model dari data sampai kartu",
    "di luar cakupan": "keputusan perawatan mesin sungguhan",
    "data": f"{len(df)} baris karangan; nilai getaran hilang diisi median di dalam Pipeline",
    "evaluasi": f"lipatan 5: pembanding {ringkas['pembanding'][0]:.2f}; pohon {ringkas['pohon'][0]:.2f}, recall rusak {ringkas['pohon'][1]:.2f}; jaringan {ringkas['jaringan'][0]:.2f}",
    "batasan": "data karangan dan kecil; label sebagian dibalik; hanya diuji pada pembangkit yang sama",
}
for bagian in ["nama", "tujuan", "di luar cakupan", "data", "evaluasi", "batasan", "risiko", "energi"]:
    print(bagian + ":", kartu.get(bagian, "tidak diketahui"))
```

```text
baris: 300 | hilang (getaran): 12 | kelas: {0: 206, 1: 94}
pembanding ketepatan 0.687 | recall rusak 0.000
pohon      ketepatan 0.920 | recall rusak 0.830
jaringan   ketepatan 0.850 | recall rusak 0.767
importansi suhu      0.116 +- 0.036
importansi getaran   0.118 +- 0.023
importansi jam       0.217 +- 0.027
nama: penggolong kerusakan mesin (karangan), pohon kedalaman 3
tujuan: latihan proyek model dari data sampai kartu
di luar cakupan: keputusan perawatan mesin sungguhan
data: 300 baris karangan; nilai getaran hilang diisi median di dalam Pipeline
evaluasi: lipatan 5: pembanding 0.69; pohon 0.92, recall rusak 0.83; jaringan 0.85
batasan: data karangan dan kecil; label sebagian dibalik; hanya diuji pada pembangkit yang sama
risiko: tidak diketahui
energi: tidak diketahui
```

Laporan menulis: pembanding 0,687 (recall 0), pohon 0,920 (recall rusak 0,830), jaringan 0,850 (0,767). Pohon, bukan jaringan, yang unggul, dan jam pakai paling dipakainya pada data uji; kesimpulan ini hanya untuk data karangan ini. Baris `risiko` dan `energi` masih "tidak diketahui": lengkapi sesuai `d-xi2-m12`.

## Daftar periksa

Centang tiap langkah **dengan bukti** (catatan atau keluaran yang bisa ditunjukkan).

- [ ] Rencana dan prediksi ditulis sebelum kode.
- [ ] Sumber dan lisensi data tercatat, atau pembangkitnya ditandai "karangan"; tanpa data pribadi, wajah, suara, atau foto orang.
- [ ] Keputusan pembersihan dicatat dengan jumlahnya; pengisian nilai hilang ada di dalam `Pipeline`.
- [ ] Pembanding dijalankan; sedikitnya dua model dibandingkan pada lipatan yang sama, dengan sebaran.
- [ ] Satu penjelasan (misalnya importansi permutasi) ditulis dengan hal yang tidak boleh disimpulkan.
- [ ] Kartu model lengkap: batasan, risiko, dan baris biaya komputasi dan energi (rentang dan asumsi, atau "tidak diketahui" dengan alasan).
- [ ] Program dijalankan ulang dari awal dengan hasil sama; versi pustaka dan benih dicatat.
- [ ] Log pemakaian AI diisi bila AI dipakai (alat, tujuan, garis besar perintah, bagian yang dipakai, cara memeriksa).

## Umpan balik sejawat

Tukar proyek dengan kelompok lain dan beri umpan balik dalam tiga kalimat: **satu yang sudah baik, satu yang perlu diperbaiki, satu langkah berikutnya**, masing-masing menunjuk bagian tertentu (baris kode, angka, atau baris kartu). Pemeriksa bertanya: bisakah programnya dijalankan dari awal, dan apakah klaim di laporan sesuai angka? Ulasan memakai nama kelompok atau nomor, bukan nama orang.

## Latihan bercampur

1. Dari `d-xi2-m8`: kerangka menaruh `SimpleImputer` dan `StandardScaler` di dalam `make_pipeline`. Apa yang berubah bila keduanya dipasang pada seluruh `X` sebelum `cross_validate`?
2. Dari `d-xi2-m9`: pada keluaran importansi, `jam` paling tinggi. Tulis satu kalimat yang boleh dan satu yang tidak boleh disimpulkan.

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `d-xi2-m14` (sekitar satu minggu lagi), `D-XII1-M2` (sekitar tiga minggu lagi), dan `D-XII1-M7` (sekitar delapan minggu lagi). Jawab sekarang lalu simpan.

1. Urutkan isi proyek model dari pertanyaan sampai kartu model.
2. Apa tiga hal yang kamu tanyakan pada klaim "model ini 95 persen akurat" sebelum mempercayainya?
3. Apa yang dicatat agar eksperimen perbaikan model dapat diulang orang lain?

## Kesalahan umum

- **"Mengoding dulu, rencananya menyusul."** Tanpa prediksi tertulis, angka apa pun tampak masuk akal setelah dilihat.
- **"Jaringan saraf pasti dipilih karena paling canggih."** Pada kerangka, pohon sederhana mengungguli jaringan.
- **"Kartu model ditulis dari kesan."** Angka kartu dihitung program; yang belum diketahui ditulis dengan alasan.
- **"Energi terlalu kecil, jadi diabaikan."** Catat rentang dan asumsinya.

## Cek mandiri

- [ ] Saya menulis rencana dan prediksi sebelum mengerjakan.
- [ ] Saya membandingkan model dengan pembanding pada lipatan yang sama, tanpa kebocoran.
- [ ] Saya menulis kartu model dengan baris biaya komputasi dan energi.
- [ ] Saya memberi umpan balik tiga kalimat dan mengisi log AI bila memakainya.

## Kunci dan petunjuk

**Ingat kembali.** 1: karena model hanya menghitung kemunculan kata pada data latih; hubungan itu bisa kebetulan atau hasil rancangan data, bukan bukti sebab. 2: nama dan versi, tujuan, di luar cakupan, data, model, evaluasi, batasan, risiko, serta biaya komputasi dan energi; ketidakpastian dinyatakan pada baris energi (rentang, asumsi, atau "tidak diketahui") dan pada batasan. 3: didukung, bertentangan, dan tidak ditemukan; bila belum bisa dipastikan, tahan: jangan sebarkan dan cari sumber lain atau tanya pihak resmi.

**Rencana proyek.** Tidak ada satu jawaban benar. Rencana yang baik: pertanyaannya memutuskan sesuatu, data jelas, pembanding dan metrik utama punya alasan, prediksi tertulis dengan angka sebelum dijalankan, risiko disebut. Pada contoh, prediksi pembanding sekitar 0,7 mendekati 0,687 (206 dari 300 baris adalah kelas terbanyak) dan pohon di atas 0,85 terpenuhi (0,920); prediksi "jaringan belum tentu mengalahkan pohon" juga terpenuhi (0,850). Bila prediksimu meleset, tulis mengapa; itu bagian belajarnya.

**Daftar periksa.** Dinilai dari bukti tiap butir, bukan dari centang. Usulan rubrik guru (tiga tingkat, tanpa angka resmi): *kuat* bila alur lengkap, pengisian nilai hilang di dalam `Pipeline`, pembanding dan dua model dibandingkan adil dengan sebaran, penjelasan memuat batas, kartu lengkap dengan baris energi berasumsi, program jalan ulang, dan log AI jujur; *cukup* bila alurnya ada tetapi kartu atau batas kesimpulan belum lengkap; *perlu dilengkapi* bila belum ada pembanding, kebocoran belum diperiksa, kartu tanpa batasan, atau program tidak dapat dijalankan ulang.

**Umpan balik sejawat.** Contoh: "Sudah baik: kartu menyebut di luar cakupan dan baris energi memakai rentang. Perlu diperbaiki: baris risiko masih 'tidak diketahui'. Langkah berikutnya: isi risiko dengan dua kemungkinan penyalahgunaan dan tambahkan sebaran antar lipatan."

**Latihan bercampur.** 1: ada kebocoran: median dan skala dihitung dengan data lipatan uji, jadi data uji ikut memengaruhi; di dalam `Pipeline`, keduanya dipelajari ulang dari data latih tiap lipatan. 2: boleh: pohon ini paling bergantung pada `jam` pada data uji karangan ini. Tidak boleh: bahwa jam pakai menyebabkan mesin rusak di dunia, atau bahwa suhu dan getaran tidak berpengaruh.

**Ulang berjarak.** 1: pertanyaan dan rencana (prediksi), data (sumber dan lisensi atau karangan), pembersihan tercatat, pembanding, sedikitnya dua model pada lipatan yang sama, evaluasi dengan metrik utama, penjelasan beserta batasnya, lalu kartu model. 2: berapa pembanding sederhananya; diuji pada data apa dan berapa banyak; metrik apa dan jenis kesalahan mana (positif atau negatif palsu) yang dihitung, serta sebarannya. 3: versi Python dan pustaka, benih acak, data atau versinya, parameter model, cara membagi data, dan perubahan pada tiap percobaan.

## Langkah berikutnya

Modul berikut: `d-xi2-m14` (asesmen dan refleksi semester 2). Bacaan lanjut: bagian "Common pitfalls and recommended practices" pada panduan pengguna `scikit-learn`, dan makalah *Model Cards for Model Reporting*.
