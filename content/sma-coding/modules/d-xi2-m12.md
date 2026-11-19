## Untuk siapa modul ini

Modul ini untuk murid kelas XI jalur D (kecerdasan buatan dan analisis data), untuk minggu `D-XI2-M12` silabus v1.3: mendokumentasikan data, tujuan, batasan, dan risiko model, serta menyatakan perkiraan biaya komputasi dan energi beserta ketidakpastiannya. Prasyarat: modul `d-xi2-m11` (modul tertulis dalam seri yang sama). Alat: Python 3 dengan `numpy`, `pandas`, dan `scikit-learn`, tanpa akun.

Modul ini berstatus DRAF: karangan penyusun, belum ditinjau pemilik. Jalur D adalah pengayaan di luar rumusan capaian pembelajaran (CP). Minggu ini tidak punya irisan pengayaan, jadi modul ini tidak dihitung memenuhi butir CP mana pun.

Aturan jalur D yang berlaku: data hanya sintetis (karangan) atau terbuka dengan lisensi jelas, tanpa data yang bisa mengenali orang; wajah, suara, dan foto orang tidak dipakai sebagai data; AI generatif boleh dipakai dengan etika dan dicatat, tanpa data pribadi, kata sandi, atau tugas bernilai pada permintaanmu, dan kamu tidak wajib punya akun. Saran: jawab dulu sendiri, baru minta AI memberi petunjuk bertahap; kode buatan AI dibaca, dijalankan, dan diuji. Setiap soal `Latihan` bertanda `AI: boleh` atau `AI: tanpa AI`.

Catatan untuk guru: blok Python dijalankan penyusun dengan `python3 -I` (Python 3.14.6, `numpy` 2.5.5, `pandas` 3.1.1, `scikit-learn` 1.9.1, per 2026-11) dan keluarannya ditempel apa adanya; yang dinyatakan hanya "bisa dijalankan dengan keluaran ini", bukan "benar untuk semua masukan". Data "kolam karangan" sama dengan modul `d-xi2-m8`. **Angka daya 15 sampai 65 W dan waktu 2,0 detik adalah contoh karangan penyusun, bukan hasil ukur dan bukan nilai resmi (`[belum terverifikasi]`);** murid mengukur waktu mesinnya sendiri dan memeriksa spesifikasi daya mesinnya.

## Ingat kembali

Jawab dari ingatan, baru cek di bagian kunci.

1. Mengapa kunci layanan disimpan di variabel lingkungan atau penyimpan rahasia, bukan di dalam kode? (dari `d-xi2-m11`)
2. Mengapa vektorizer dipasang pada data latih saja, dan apa yang terjadi pada kata baru di data uji? (dari `d-xi2-m4`)
3. Sebutkan dua batas penjelasan fitur penting yang layak ditulis di kartu model. (dari `d-xi2-m9`)

## Tujuan

Setelah modul ini kamu dapat:

- menyusun kartu model: tujuan, di luar cakupan, data, model, evaluasi, batasan, risiko, dan biaya;
- mencatat jumlah parameter, versi pustaka, dan benih acak agar hasil bisa diulang;
- memperkirakan energi pelatihan sebagai rentang dari daya dan waktu, dengan asumsi yang ditulis;
- menulis "tidak diketahui" beserta alasannya bila sesuatu tidak dapat diperkirakan;
- membedakan apa yang boleh dan tidak boleh diklaim oleh sebuah kartu model.

Keluaran yang diminta silabus: kartu model, dengan baris perkiraan biaya komputasi dan energi (rentang kasar; "tidak diketahui" bila tak dapat diperkirakan).

## Prediksi dulu

Energi dalam watt-jam (Wh) adalah daya (W) kali waktu (jam). Pelatihan memakan 2,0 detik pada komputer yang diasumsikan berdaya 15 sampai 65 W. Tebak dan tulis, sebelum menjalankan: rentang energinya dalam Wh (empat desimal), dan rentang untuk 100 kali percobaan (dua desimal).

```python
def rentang_energi(daya_rendah, daya_tinggi, detik):
    return daya_rendah * detik / 3600, daya_tinggi * detik / 3600


rendah, tinggi = rentang_energi(15, 65, 2.0)
print(round(rendah, 4), round(tinggi, 4))
print(round(rendah * 100, 2), round(tinggi * 100, 2))
```

```text
0.0083 0.0361
0.83 3.61
```

## Contoh terselesaikan

**Apa itu kartu model.** Mitchell dkk. (2019) mengusulkan kartu model: dokumen pendek yang menyertai model terlatih, memuat konteks pemakaian yang dimaksud, cara evaluasi, dan hasil pada berbagai kondisi, supaya model tidak dipakai di tempat yang tidak cocok. Kartu bukan iklan: bagian batasan dan risiko sama wajibnya dengan bagian ketepatan. Di kelas ini, kartu juga memuat baris biaya komputasi dan energi.

**Energi: rentang, bukan satu angka.** Energi pelatihan model kecil dihitung dari daya dan waktu, dan keduanya tidak pasti: daya bergantung mesin dan beban, waktu bergantung proses lain. Maka tulis rentang, tulis asumsinya, dan tulis apa yang tidak termasuk (pembuatan perangkat, pendinginan, layar, jaringan). Angka ini hanya untuk model kecil di mesinmu. Luccioni dkk. (2024) mengukur 1.000 pemanggilan dan menemukan bahwa model generatif serba-guna jauh lebih mahal (berselisih orde besaran) daripada sistem khusus-tugas untuk berbagai tugas; angka layanan AI besar tidak bisa dibaca dari mesinmu, dan angka dari satu pengukuran tidak berlaku selamanya.

Program berikut menyusun kartu untuk jaringan kolam `d-xi2-m8` dari angka yang dihitung, bukan diketik tangan. Baris yang tidak diisi tercetak "tidak diketahui".

```python
import warnings

import numpy as np
import pandas as pd
import sklearn
from sklearn.dummy import DummyClassifier
from sklearn.metrics import recall_score
from sklearn.model_selection import StratifiedKFold, cross_val_predict, cross_val_score
from sklearn.neural_network import MLPClassifier
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler

warnings.simplefilter("ignore")


def buat_data(n, benih):
    acak = np.random.default_rng(benih)
    suhu = acak.uniform(20, 35, n)  # derajat Celsius, karangan
    oksigen = acak.uniform(2, 10, n)  # miligram per liter, karangan
    jarak = np.sqrt(((suhu - 27.5) / 7.5) ** 2 + ((oksigen - 6) / 4) ** 2)
    sehat = (jarak < 0.75).astype(int)  # aturan karangan: "sehat" hanya di tengah
    balik = acak.random(n) < 0.06  # derau: sebagian label dibalik
    sehat = np.where(balik, 1 - sehat, sehat)
    return pd.DataFrame({"suhu": suhu, "oksigen": oksigen, "sehat": sehat})


def jumlah_parameter(model):
    return sum(w.size for w in model.coefs_) + sum(b.size for b in model.intercepts_)


def rentang_energi(daya_rendah, daya_tinggi, detik):
    return daya_rendah * detik / 3600, daya_tinggi * detik / 3600  # watt kali detik, dibagi 3600 = Wh


def cetak_kartu(kartu, urutan):
    for kunci in urutan:
        nilai = kartu.get(kunci, "tidak diketahui")
        print(kunci + ":", nilai)


WAKTU_LATIH_DETIK = 2.0  # contoh; ganti dengan hasil pengukuranmu sendiri
DAYA_W = (15, 65)  # asumsi kasar untuk komputer kecil di bawah beban; periksa mesinmu

df = buat_data(400, 0)
X = df[["suhu", "oksigen"]]
y = df["sehat"]
lipatan = StratifiedKFold(n_splits=5, shuffle=True, random_state=0)
jaringan = make_pipeline(StandardScaler(), MLPClassifier(hidden_layer_sizes=(16,), max_iter=2000, random_state=0))
skor = cross_val_score(jaringan, X, y, cv=lipatan)
pembanding = cross_val_score(DummyClassifier(strategy="most_frequent"), X, y, cv=lipatan)
tebak = cross_val_predict(jaringan, X, y, cv=lipatan)
rec1 = recall_score(y, tebak, pos_label=1)
rec0 = recall_score(y, tebak, pos_label=0)
jaringan.fit(X, y)
param = jumlah_parameter(jaringan[-1])
rendah, tinggi = rentang_energi(DAYA_W[0], DAYA_W[1], WAKTU_LATIH_DETIK)

kartu = {
    "nama": "penggolong kolam sehat (karangan), jaringan 1 lapis",
    "tujuan": "latihan membandingkan model di kelas",
    "di luar cakupan": "keputusan nyata tentang kolam, ikan, atau kesehatan",
    "data": f"{len(df)} baris karangan dari buat_data (benih 0); kelas 0: {int((y == 0).sum())}, kelas 1: {int((y == 1).sum())}; 6% label dibalik",
    "model": f"StandardScaler + MLPClassifier (16 neuron, random_state 0), {param} parameter, scikit-learn {sklearn.__version__}",
    "evaluasi": f"lipatan 5: ketepatan {skor.mean():.3f} (pembanding {pembanding.mean():.3f}); recall kelas 1 {rec1:.2f}, kelas 0 {rec0:.2f}",
    "batasan": "data karangan dan kecil; hanya diuji pada data dari pembangkit yang sama; selisih dengan pohon masih dalam sebaran",
    "energi": f"latih {WAKTU_LATIH_DETIK} detik (contoh) pada daya {DAYA_W[0]} sampai {DAYA_W[1]} W (asumsi): sekitar {rendah:.4f} sampai {tinggi:.4f} Wh; tidak termasuk pembuatan perangkat, pendinginan, dan layar; ketidakpastian tinggi",
}
cetak_kartu(kartu, ["nama", "tujuan", "di luar cakupan", "data", "model", "evaluasi", "batasan", "risiko", "energi"])
```

```text
nama: penggolong kolam sehat (karangan), jaringan 1 lapis
tujuan: latihan membandingkan model di kelas
di luar cakupan: keputusan nyata tentang kolam, ikan, atau kesehatan
data: 400 baris karangan dari buat_data (benih 0); kelas 0: 231, kelas 1: 169; 6% label dibalik
model: StandardScaler + MLPClassifier (16 neuron, random_state 0), 65 parameter, scikit-learn 1.9.1
evaluasi: lipatan 5: ketepatan 0.890 (pembanding 0.577); recall kelas 1 0.82, kelas 0 0.94
batasan: data karangan dan kecil; hanya diuji pada data dari pembangkit yang sama; selisih dengan pohon masih dalam sebaran
risiko: tidak diketahui
energi: latih 2.0 detik (contoh) pada daya 15 sampai 65 W (asumsi): sekitar 0.0083 sampai 0.0361 Wh; tidak termasuk pembuatan perangkat, pendinginan, dan layar; ketidakpastian tinggi
```

Baca kartunya. Jumlah parameter 65 cocok dengan hitungan tangan (2 kali 16 bobot ditambah 16 bias, lalu 16 bobot dan 1 bias). Evaluasi dipecah per kelas: recall kelas 1 (0,82) lebih rendah daripada kelas 0 (0,94), hal yang tidak terlihat bila hanya ketepatan 0,890 yang ditulis. Baris `risiko` tercetak "tidak diketahui" karena belum diisi: itu celah yang bisa ditutup (misalnya "dipakai di luar cakupan"; "kesan keliru bahwa jaringan lebih baik daripada pohon"), berbeda dengan baris energi sebuah proyek yang memanggil layanan pihak ketiga, yang memang "tidak diketahui" karena tidak dapat diukur dari sisi klien, dan alasannya ditulis. Perkiraan energinya 0,0083 sampai 0,0361 Wh, sangat kecil; nilainya ada pada kebiasaan mencatat, dan pada perbandingan bila percobaan diulang ratusan kali.

## Contoh setengah jadi

Lengkapi `____` agar fungsi menghitung seluruh parameter jaringan (bobot dan bias) dari atribut model terlatih.

```python setengah-jadi
def jumlah_parameter(model):
    return sum(w.____ for w in model.coefs_) + sum(b.size for b in model.____)
```

## Soal Parsons

Susun baris menjadi fungsi yang mencetak tiap bagian kartu, dan "tidak diketahui" untuk bagian yang tidak diisi. Lekukan sudah dipakai; yang diacak hanya urutannya.

```text
        nilai = kartu.get(kunci, "tidak diketahui")
def cetak_kartu(kartu, urutan):
        print(kunci + ":", nilai)
    for kunci in urutan:
```

## Latihan

1. **Hitung energi.** (`AI: tanpa AI`) Pelatihan 12 detik pada komputer berdaya 20 sampai 50 W. Hitung rentang energinya dalam Wh dan untuk 30 percobaan. Tulis satu hal yang tidak termasuk dalam angkamu.
2. **Di luar cakupan dan batasan.** (`AI: tanpa AI`) Untuk kartu penggolong kolam, tulis dua hal di luar cakupan dan dua batasan, masing-masing dengan alasan.
3. **Kartu proyekmu.** (`AI: boleh`) Tulis kartu model untuk salah satu model dari semester ini (misalnya `d-xi2-m5` atau `d-xi2-m8`), dengan semua bagian dan baris biaya komputasi dan energi (rentang dan asumsi, atau "tidak diketahui" beserta alasan).
4. **Ukur waktu.** (`AI: boleh`) Ukur waktu pelatihan modelmu tiga kali dengan `time.perf_counter()`, laporkan rentangnya, jelaskan mengapa angkanya berbeda, dan hitung ulang rentang energinya.
5. **Catatan pemakaian AI (opsional).** Bila memakai asisten AI untuk menyusun kartu, catat alat, tujuan, garis besar perintah, bagian yang dipakai, dan cara memeriksanya. Angka yang disarankan AI diperiksa, bukan disalin.

## Latihan bercampur

1. Dari `d-xi2-m9`: tambahkan satu baris tentang penjelasan ke kartu: apa yang diukur dan apa yang tidak boleh disimpulkan.
2. Dari `d-xi2-m11`: sebuah proyek memanggil layanan model pihak ketiga 1.000 kali sehari. Apa yang kamu tulis pada baris energi dan pada baris data yang keluar?

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `d-xi2-m13` (sekitar satu minggu lagi), `D-XII1-M1` (sekitar tiga minggu lagi), dan `D-XII1-M6` (sekitar delapan minggu lagi). Jawab sekarang lalu simpan.

1. Apa saja bagian kartu model, dan baris mana yang menyatakan ketidakpastian?
2. Mengapa kartu model menyebut penggunaan yang di luar cakupannya?
3. Mengapa kartu model melaporkan pembanding dan metrik yang dipilih beserta alasannya?

## Kesalahan umum

- **"Kartu model itu iklan."** Batasan dan risiko wajib ada; kartu yang hanya memuat angka terbaik menyesatkan.
- **"Satu angka energi terdengar lebih ilmiah."** Daya dan waktu tidak pasti; tulis rentang dan asumsinya.
- **"Energi mesinku sama dengan energi layanan AI."** Keduanya tidak dapat dipertukarkan; angka layanan sering tidak dapat diukur dari sisi klien.
- **"Tidak diketahui berarti dikosongkan."** Tulis "tidak diketahui" dengan alasan, dan hanya untuk hal yang memang sudah dicoba diperkirakan.
- **"Kartu ditulis di akhir dari ingatan."** Catat versi, benih, dan waktu saat bekerja, atau angkanya hilang.

## Cek mandiri

- [ ] Saya dapat menyusun kartu model lengkap dengan batasan dan risiko.
- [ ] Saya dapat mencatat parameter, versi pustaka, dan benih acak.
- [ ] Saya dapat menghitung rentang energi dari daya dan waktu, dengan asumsi.
- [ ] Saya dapat menulis "tidak diketahui" dengan alasan.
- [ ] Saya dapat menyebut apa yang tidak boleh diklaim oleh kartu saya.
- [ ] Saya mencatat pemakaian AI bila saya memakainya.

## Kunci dan petunjuk

**Ingat kembali.** 1: karena kode berpindah tangan, tersalin, dan dibagikan; rahasia dipisahkan agar kode bisa dibuka tanpa membocorkan kredensial, dan kunci mudah diganti tanpa mengubah kode. 2: supaya kosakata tidak dipengaruhi data uji; kata baru di data uji diabaikan karena tidak ada di kosakata. 3: contoh: importansi mengukur ketergantungan model, bukan sebab; fitur kembar membagi nilai sehingga peringkat menyesatkan; angka bergantung pada model dan data uji yang kecil.

**Prediksi dulu.** Keluaran: `0.0083 0.0361` dan `0.83 3.61`. Hitungan: 15 W kali 2,0 detik = 30 watt-detik, dibagi 3600 = 0,0083 Wh; 65 W menghasilkan 130 watt-detik = 0,0361 Wh; kali 100 menjadi 0,83 dan 3,61.

**Contoh setengah jadi.** Isian: `size` dan `intercepts_`.

```python
import numpy as np
from sklearn.neural_network import MLPClassifier


def jumlah_parameter(model):
    return sum(w.size for w in model.coefs_) + sum(b.size for b in model.intercepts_)


X = np.array([[0.0, 0.0], [0.0, 1.0], [1.0, 0.0], [1.0, 1.0]])
y = np.array([0, 1, 1, 0])
jaringan = MLPClassifier(hidden_layer_sizes=(16,), random_state=0)
jaringan.partial_fit(X, y, classes=[0, 1])
print(jumlah_parameter(jaringan))
```

```text
65
```

**Soal Parsons.** Urutan benar: `def`, `for`, `nilai = ...`, `print(...)`.

```python
def cetak_kartu(kartu, urutan):
    for kunci in urutan:
        nilai = kartu.get(kunci, "tidak diketahui")
        print(kunci + ":", nilai)


cetak_kartu({"nama": "contoh"}, ["nama", "risiko"])
```

```text
nama: contoh
risiko: tidak diketahui
```

**Latihan.** 1: 20 W kali 12 detik = 240 watt-detik, dibagi 3600 = 0,0667 Wh; 50 W menghasilkan 600 watt-detik = 0,1667 Wh. Untuk 30 percobaan: 2,0 sampai 5,0 Wh. Tidak termasuk: pembuatan perangkat, pendinginan, layar, jaringan, dan daya komputer lain (atau waktu muat data). 2: contoh di luar cakupan: menentukan apakah kolam sungguhan layak (datanya karangan); memutuskan perawatan ikan. Batasan: data karangan dan kecil; label sebagian dibalik sehingga tidak mewakili dunia. Yang dinilai: setiap butir punya alasan. 3: dinilai dari kelengkapan bagian, angka yang dihitung dari program (bukan ditebak), batas klaim yang jujur, dan baris energi berupa rentang dengan asumsi atau "tidak diketahui" dengan alasan. 4: waktu berbeda antar-ulang karena proses lain, penjadwalan, cache, dan beban mesin; laporkan rentang terkecil sampai terbesar, lalu hitung ulang energi dengan rentang itu. 5: opsional.

**Latihan bercampur.** 1: contoh: "Penjelasan: importansi permutasi pada data uji; menunjukkan ketergantungan model, bukan sebab; fitur berkorelasi membagi nilai." 2: energi: tidak diketahui karena penyedia yang menjalankan model dan angkanya tidak dapat diukur dari sisi klien, yang diketahui hanya jumlah panggilan (1.000 per hari); data yang keluar: masukan teks karangan tanpa data pribadi, dengan alasan privasi.

**Ulang berjarak.** 1: nama dan versi, tujuan, di luar cakupan, data, model (parameter, versi, benih), evaluasi (pembanding, metrik), batasan, risiko, serta biaya komputasi dan energi (rentang dan asumsi, atau "tidak diketahui"). 2: agar pembaca tidak memakainya pada tugas yang tidak diuji dan tidak cocok. 3: agar pembaca dapat menilai klaim: pembanding sederhana memperlihatkan apa yang dicapai tanpa belajar, dan metrik harus sesuai dampak kesalahan.

## Langkah berikutnya

Modul berikut: `d-xi2-m13` (proyek mini semester 2). Bacaan lanjut: makalah *Model Cards for Model Reporting* (Mitchell dkk., 2019), makalah *Power Hungry Processing* (Luccioni dkk., 2024), dan dokumentasi kartu model dari satu platform sebagai contoh format.
