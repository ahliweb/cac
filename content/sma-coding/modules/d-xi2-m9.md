## Untuk siapa modul ini

Modul ini untuk murid kelas XI jalur D (kecerdasan buatan dan analisis data), untuk minggu `D-XI2-M9` silabus v1.3: menafsirkan fitur berpengaruh dan keterbatasan penjelasan. Prasyarat: modul `d-xi2-m8` (melatih jaringan kecil; modul tertulis dalam seri yang sama). Alat: Python 3 dengan `numpy`, `pandas`, dan `scikit-learn`, tanpa akun.

Modul ini berstatus DRAF: karangan penyusun, belum ditinjau pemilik. Jalur D adalah pengayaan di luar rumusan capaian pembelajaran (CP). Minggu ini tidak punya irisan pengayaan, jadi modul ini tidak dihitung memenuhi butir CP mana pun.

Aturan jalur D yang berlaku: data hanya sintetis (karangan) atau terbuka dengan lisensi jelas, tanpa data yang bisa mengenali orang; wajah, suara, dan foto orang tidak dipakai sebagai data; AI generatif boleh dipakai dengan etika dan dicatat, tanpa data pribadi, kata sandi, atau tugas bernilai pada permintaanmu, dan kamu tidak wajib punya akun. Saran: jawab dulu sendiri, baru minta AI memberi petunjuk bertahap; kode buatan AI dibaca, dijalankan, dan diuji. Setiap soal `Latihan` bertanda `AI: boleh` atau `AI: tanpa AI`.

Catatan untuk guru: blok Python dijalankan penyusun dengan `python3 -I` (Python 3.14.6, `numpy` 2.5.5, `pandas` 3.1.1, `scikit-learn` 1.9.1, per 2026-11) dan keluarannya ditempel apa adanya; yang dinyatakan hanya "bisa dijalankan dengan keluaran ini", bukan "benar untuk semua masukan". Data "pengiriman karangan" dibangkitkan oleh `buat_data`; `berat_kg` dan `kode_acak` sengaja tidak ikut dalam aturannya, dan `jarak_mil` adalah salinan `jarak_km` dalam satuan lain. Angka dapat berbeda pada versi pustaka lain.

## Ingat kembali

Jawab dari ingatan, baru cek di bagian kunci.

1. Mengapa k-means dijalankan beberapa kali (`n_init`), dan bagaimana memilih k? (dari `d-xi2-m1`)
2. Apa itu fitur buatan dari gambar, misalnya jumlah piksel gelap per baris, dan mengapa ia lebih tahan terhadap letak? (dari `d-xi2-m6`)
3. Mengapa selisih ketepatan yang lebih kecil daripada sebaran antar lipatan atau antar `random_state` belum membuktikan satu model lebih baik? (dari `d-xi2-m8`)

## Tujuan

Setelah modul ini kamu dapat:

- menghitung importansi permutasi pada data uji dan membacanya bersama sebarannya;
- membandingkannya dengan importansi bawaan hutan acak dan menjelaskan mengapa keduanya bisa berbeda;
- menjelaskan pengaruh fitur kembar atau berkorelasi pada peringkat;
- menulis catatan penjelasan: apa yang diukur, pada model dan data apa, dan apa yang tidak boleh disimpulkan.

Keluaran yang diminta silabus: catatan penjelasan (tafsirkan satu model).

## Prediksi dulu

Aturan sederhana menebak "terlambat" hanya dari `hujan`. Importansi permutasi menggeser melingkar satu kolom (kolom lain tetap) lalu melihat berapa ketepatan turun. Tebak dan tulis: ketepatan awal, penurunan rata-rata bila kolom `hujan` digeser 1 sampai 5 kali, dan penurunan bila kolom `jarak` yang digeser. Hitung geser 1 untuk `hujan` dengan tangan.

```python
hujan = [1, 1, 0, 0, 1, 0]
jarak = [5, 18, 7, 22, 12, 3]
terlambat = [1, 1, 0, 1, 1, 0]


def tebak(jarak_i, hujan_i):
    return 1 if hujan_i == 1 else 0  # aturan sederhana: hanya melihat hujan


def ketepatan(hujan_x, jarak_x):
    benar = sum(tebak(j, h) == t for j, h, t in zip(jarak_x, hujan_x, terlambat))
    return benar / len(terlambat)


def geser(daftar, k):
    return daftar[k:] + daftar[:k]  # permutasi sederhana: geser melingkar


awal = ketepatan(hujan, jarak)
print("ketepatan awal", round(awal, 3))
for nama in ("hujan", "jarak"):
    turun = []
    for k in range(1, 6):
        if nama == "hujan":
            turun.append(awal - ketepatan(geser(hujan, k), jarak))
        else:
            turun.append(awal - ketepatan(hujan, geser(jarak, k)))
    print(nama, "penurunan rata-rata", round(sum(turun) / len(turun), 3))
```

```text
ketepatan awal 0.833
hujan penurunan rata-rata 0.4
jarak penurunan rata-rata 0.0
```

## Contoh terselesaikan

**Dua cara mengukur.** Hutan acak dilatih pada data pengiriman karangan: `jarak_km`, `jarak_mil` (salinan jarak), `hujan`, `jam_sibuk`, `berat_kg`, dan `kode_acak` (angka acak murni). Dua ukuran dibandingkan. Importansi **bawaan** hutan dihitung dari data latih berdasarkan seberapa sering fitur dipakai memecah pohon. Importansi **permutasi** diacak pada **data uji**: ketepatan turun berapa bila satu kolom diacak, diulang 20 kali dengan sebarannya (`scikit-learn` menganjurkan data uji atau validasi, dan memperingatkan bahwa fitur yang berkorelasi kuat dapat menyesatkan). Percobaan diulang tanpa `jarak_mil`.

```python
import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.inspection import permutation_importance
from sklearn.model_selection import train_test_split


def buat_data(n, benih):
    acak = np.random.default_rng(benih)
    jarak_km = acak.uniform(1, 30, n)  # karangan
    hujan = (acak.random(n) < 0.3).astype(int)
    jam_sibuk = (acak.random(n) < 0.4).astype(int)
    berat_kg = acak.uniform(0.5, 20, n)  # tidak ikut dalam aturan
    skor = 0.08 * jarak_km + 1.5 * hujan + 1.0 * jam_sibuk + acak.normal(0, 0.8, n)
    return pd.DataFrame(
        {
            "jarak_km": jarak_km,
            "jarak_mil": jarak_km * 0.621371,  # salinan jarak dalam satuan lain
            "hujan": hujan,
            "jam_sibuk": jam_sibuk,
            "berat_kg": berat_kg,
            "kode_acak": acak.uniform(0, 1, n),  # angka acak murni
            "terlambat": (skor > 3.0).astype(int),
        }
    )


def tampilkan(judul, nama, nilai, sebaran=None):
    print(judul)
    for i in np.argsort(-nilai):
        if sebaran is None:
            print(f"  {nama[i]:10s} {nilai[i]:6.3f}")
        else:
            print(f"  {nama[i]:10s} {nilai[i]:6.3f} +- {sebaran[i]:.3f}")


df = buat_data(600, 0)
y = df["terlambat"]
print("kelas:", y.value_counts().to_dict())
for judul, kolom in [
    ("DENGAN salinan jarak", [c for c in df.columns if c != "terlambat"]),
    ("TANPA salinan jarak", [c for c in df.columns if c not in ("terlambat", "jarak_mil")]),
]:
    X = df[kolom]
    X_latih, X_uji, y_latih, y_uji = train_test_split(X, y, test_size=0.3, stratify=y, random_state=0)
    hutan = RandomForestClassifier(n_estimators=200, random_state=0).fit(X_latih, y_latih)
    print(judul, "| ketepatan uji", round(hutan.score(X_uji, y_uji), 3))
    tampilkan("  bawaan hutan (dihitung dari data latih):", list(X.columns), hutan.feature_importances_)
    hasil = permutation_importance(hutan, X_uji, y_uji, n_repeats=20, random_state=0)
    tampilkan("  permutasi pada data uji:", list(X.columns), hasil.importances_mean, hasil.importances_std)
```

```text
kelas: {0: 450, 1: 150}
DENGAN salinan jarak | ketepatan uji 0.844
  bawaan hutan (dihitung dari data latih):
  jarak_mil   0.240
  jarak_km    0.216
  hujan       0.177
  kode_acak   0.152
  berat_kg    0.128
  jam_sibuk   0.087
  permutasi pada data uji:
  hujan       0.123 +- 0.024
  jarak_mil   0.025 +- 0.016
  jam_sibuk   0.021 +- 0.019
  jarak_km    0.011 +- 0.019
  berat_kg    0.004 +- 0.010
  kode_acak   0.004 +- 0.010
TANPA salinan jarak | ketepatan uji 0.844
  bawaan hutan (dihitung dari data latih):
  jarak_km    0.362
  kode_acak   0.190
  hujan       0.189
  berat_kg    0.165
  jam_sibuk   0.093
  permutasi pada data uji:
  hujan       0.131 +- 0.025
  jarak_km    0.101 +- 0.022
  jam_sibuk   0.024 +- 0.020
  berat_kg   -0.001 +- 0.013
  kode_acak  -0.002 +- 0.010
```

Empat bacaan. (1) Importansi bawaan memberi `kode_acak`, angka acak murni, nilai 0,15 sampai 0,19, hampir setinggi `hujan`; permutasi pada data uji memberinya sekitar 0 (0,004 atau -0,002, dalam sebaran). Ukuran bawaan dapat menyesatkan dan nilai negatif kecil hanya derau. (2) Dengan `jarak_mil`, nilai permutasi jarak terbagi: 0,011 (km) dan 0,025 (mil), padahal tanpa salinan `jarak_km` bernilai 0,101: model dapat memakai salah satu saat yang lain diacak. (3) `hujan` terbesar (0,13), tetapi itu hanya berarti model paling bergantung padanya pada data uji ini. (4) Penurunan `jam_sibuk` hanya 0,02 walau aturan karangan memakainya; nilai kecil tidak berarti tidak berpengaruh di dunia, hanya bahwa model ini dan data uji sebesar ini sedikit memakainya.

**Catatan penjelasan (contoh).** "Model: hutan acak 200 pohon pada 600 baris data karangan; ketepatan uji 0,844. Diukur: penurunan ketepatan pada 180 baris uji bila satu kolom diacak (20 ulangan). Hasil: model paling bergantung pada `hujan` lalu `jarak_km`. Tidak boleh disimpulkan: bahwa hujan menyebabkan keterlambatan di dunia nyata, bahwa `jam_sibuk` tidak berpengaruh, atau bahwa peringkat ini berlaku pada model atau data lain. Batas: data karangan, satu pembagian, dan peringkat fitur kembar terbagi."

## Contoh setengah jadi

Lengkapi `____` agar program menghitung importansi permutasi dengan 20 ulangan, lalu mencetak nama fitur, rata-rata, dan simpangan bakunya (pakai `hutan`, `X`, `X_uji`, dan `y_uji` seperti pada contoh, versi tanpa `jarak_mil`).

```python setengah-jadi
hasil = permutation_importance(hutan, X_uji, y_uji, n_repeats=____, random_state=0)
for nama, rata, sebar in zip(X.columns, hasil.____, hasil.importances_std):
    print(nama, round(rata, 3), round(sebar, 3))
```

## Soal Parsons

Susun baris menjadi fungsi `penurunan` yang menghitung berapa ketepatan turun bila satu kolom data uji diacak.

```text
    return awal - model.score(salinan, y_uji)
    salinan[kolom] = acak.permutation(salinan[kolom].to_numpy())
def penurunan(model, X_uji, y_uji, kolom, acak):
    salinan = X_uji.copy()
    awal = model.score(X_uji, y_uji)
```

## Latihan

1. **Baca tabel.** (`AI: tanpa AI`) Dari keluaran "TANPA salinan jarak", sebut dua fitur yang paling dipakai model dan dua yang tidak. Apa arti nilai -0,002 pada `kode_acak`? Tulis satu kalimat yang boleh dan satu yang tidak boleh disimpulkan.
2. **Salinan fitur.** (`AI: boleh`) Pada data tanpa `jarak_mil`, tambahkan dua salinan jarak: `jarak_mil` (mil) dan `jarak_m` (meter), lalu hitung ulang importansi permutasi. Apa yang terjadi pada ketiga kolom jarak, dan apa salahnya menyimpulkan "jarak tidak penting"?
3. **Satu baris.** (`AI: boleh`) Pada model tanpa `jarak_mil`, ambil tiga baris uji berhujan 0, ubah `hujan` menjadi 1, dan catat perubahan `predict_proba` (peluang kelas 1). Apa yang tidak dikatakan hasil itu tentang dunia?
4. **Tulis catatan penjelasan.** (`AI: tanpa AI`) Untuk model apa pun dari modul ini, tulis catatan lima baris: model dan data, apa yang diukur, hasil, tiga hal yang tidak boleh disimpulkan, dan batas.
5. **Catatan pemakaian AI (opsional).** Bila memakai asisten AI untuk menafsirkan hasil, catat alat, tujuan, garis besar perintah, bagian yang dipakai, dan cara memeriksanya. Penafsiran AI bisa keliru, jadi cocokkan dengan angkamu.

## Latihan bercampur

1. Dari `d-xi2-m3`: seorang siswa memilih tiga fitur teratas berdasarkan importansi yang dihitung pada seluruh data, lalu melatih dan menguji model. Apa masalahnya, dan bagaimana bentuk yang benar?
2. Dari `d-xi2-m2`: pohon pendek lebih mudah dibaca daripada hutan 200 pohon. Apakah "mudah dijelaskan" berarti "lebih benar"?

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `d-xi2-m10` (sekitar satu minggu lagi), `d-xi2-m12` (sekitar tiga minggu lagi), dan `D-XII1-M3` (sekitar delapan minggu lagi). Jawab sekarang lalu simpan.

1. Apa pertanyaan yang diajukan sebelum mempercayai sebuah penjelasan model: diukur pada data apa, pada model mana, dan apa batasnya?
2. Sebutkan dua batas penjelasan fitur penting yang layak ditulis di kartu model.
3. Mengapa "fitur X paling berpengaruh" belum membuktikan sebab, dan apa dua hal lain yang dapat membuat peringkat menyesatkan?

## Kesalahan umum

- **"Fitur paling penting adalah penyebabnya."** Importansi mengukur ketergantungan model pada fitur itu, bukan sebab di dunia.
- **"Importansi bawaan hutan pasti benar."** Ia dihitung dari data latih dan bisa memberi nilai tinggi pada angka acak.
- **"Dua fitur kembar sama-sama penting."** Nilainya terbagi, dan masing-masing tampak kecil.
- **"Nilai nol berarti fitur itu tak berpengaruh."** Artinya model ini pada data uji ini tidak memakainya.
- **"Model yang bisa dijelaskan pasti benar."** Kejelasan dan ketepatan adalah dua hal berbeda.

## Cek mandiri

- [ ] Saya dapat menghitung dan membaca importansi permutasi beserta sebarannya.
- [ ] Saya dapat menjelaskan mengapa importansi bawaan hutan dan permutasi bisa berbeda.
- [ ] Saya dapat menjelaskan pengaruh fitur kembar pada peringkat.
- [ ] Saya dapat menulis catatan penjelasan dengan batas kesimpulan.
- [ ] Saya mencatat pemakaian AI bila saya memakainya.

## Kunci dan petunjuk

**Ingat kembali.** 1: karena hasilnya bergantung pada pusat awal, jadi dijalankan beberapa kali dan yang terbaik disimpan; k dipilih dengan ukuran seperti siluet dan dengan memeriksa apakah isi kelompok masuk akal. 2: angka yang dihitung dari gambar, misalnya jumlah piksel gelap terbanyak per baris dan per kolom; ia tidak bergantung pada letak sehingga lebih tahan terhadap pergeseran. 3: karena selisih sekecil itu bisa timbul dari pembagian data atau awal bobot yang acak.

**Prediksi dulu.** Keluaran: ketepatan awal 0,833 (5 dari 6 benar), `hujan` turun rata-rata 0,4, `jarak` turun 0. Geser 1 untuk `hujan`: `[1, 0, 0, 1, 0, 1]` melawan `terlambat` `[1, 1, 0, 1, 1, 0]` benar pada posisi 1, 3, dan 4, jadi 0,5 dan turun 0,333. Aturan itu tidak melihat `jarak`, jadi mengacaknya tidak mengubah apa pun: nol.

**Contoh setengah jadi.** Isian: `20` dan `importances_mean`.

```python
import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.inspection import permutation_importance
from sklearn.model_selection import train_test_split


def buat_data(n, benih):
    acak = np.random.default_rng(benih)
    jarak_km = acak.uniform(1, 30, n)  # karangan
    hujan = (acak.random(n) < 0.3).astype(int)
    jam_sibuk = (acak.random(n) < 0.4).astype(int)
    berat_kg = acak.uniform(0.5, 20, n)  # tidak ikut dalam aturan
    skor = 0.08 * jarak_km + 1.5 * hujan + 1.0 * jam_sibuk + acak.normal(0, 0.8, n)
    return pd.DataFrame(
        {
            "jarak_km": jarak_km,
            "hujan": hujan,
            "jam_sibuk": jam_sibuk,
            "berat_kg": berat_kg,
            "kode_acak": acak.uniform(0, 1, n),  # angka acak murni
            "terlambat": (skor > 3.0).astype(int),
        }
    )


df = buat_data(600, 0)
X = df.drop(columns="terlambat")
y = df["terlambat"]
X_latih, X_uji, y_latih, y_uji = train_test_split(X, y, test_size=0.3, stratify=y, random_state=0)
hutan = RandomForestClassifier(n_estimators=200, random_state=0).fit(X_latih, y_latih)
hasil = permutation_importance(hutan, X_uji, y_uji, n_repeats=20, random_state=0)
for nama, rata, sebar in zip(X.columns, hasil.importances_mean, hasil.importances_std):
    print(nama, round(rata, 3), round(sebar, 3))
```

```text
jarak_km 0.101 0.022
hujan 0.131 0.025
jam_sibuk 0.024 0.02
berat_kg -0.001 0.013
kode_acak -0.002 0.01
```

**Soal Parsons.** Urutan benar: `def penurunan(...)`, `awal = ...`, `salinan = X_uji.copy()`, `salinan[kolom] = ...`, `return ...`. Salinan dipakai agar `X_uji` asli tidak rusak.

```python
import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split


def buat_data(n, benih):
    acak = np.random.default_rng(benih)
    jarak_km = acak.uniform(1, 30, n)  # karangan
    hujan = (acak.random(n) < 0.3).astype(int)
    jam_sibuk = (acak.random(n) < 0.4).astype(int)
    skor = 0.08 * jarak_km + 1.5 * hujan + 1.0 * jam_sibuk + acak.normal(0, 0.8, n)
    return pd.DataFrame(
        {"jarak_km": jarak_km, "hujan": hujan, "jam_sibuk": jam_sibuk, "terlambat": (skor > 3.0).astype(int)}
    )


def penurunan(model, X_uji, y_uji, kolom, acak):
    awal = model.score(X_uji, y_uji)
    salinan = X_uji.copy()
    salinan[kolom] = acak.permutation(salinan[kolom].to_numpy())
    return awal - model.score(salinan, y_uji)


df = buat_data(600, 0)
X = df.drop(columns="terlambat")
y = df["terlambat"]
X_latih, X_uji, y_latih, y_uji = train_test_split(X, y, test_size=0.3, stratify=y, random_state=0)
hutan = RandomForestClassifier(n_estimators=200, random_state=0).fit(X_latih, y_latih)
acak = np.random.default_rng(0)
for kolom in X.columns:
    print(kolom, round(penurunan(hutan, X_uji, y_uji, kolom, acak), 3))
```

```text
jarak_km 0.122
hujan 0.1
jam_sibuk 0.022
```

Satu kali acak memberi angka yang bergeser dari rata-rata 20 ulangan; itu sebabnya `scikit-learn` mengulang dan melaporkan sebaran.

**Latihan.** 1: dua fitur terpakai: `hujan` (0,131) dan `jarak_km` (0,101); dua yang tidak: `berat_kg` (-0,001) dan `kode_acak` (-0,002), keduanya dalam sebaran sekitar 0,01. Nilai negatif kecil adalah derau: mengacak kolom itu sesekali kebetulan memperbaiki tebakan. Boleh: model ini bergantung pada hujan dan jarak. Tidak boleh: bahwa berat tidak berpengaruh di dunia atau bahwa hujan penyebab keterlambatan. 2: pada penyusun, tiga kolom jarak memberi -0,012 (km), -0,002 (mil), dan -0,007 (m), padahal satu kolom saja memberi 0,101: saat satu kolom diacak, model memakai salinannya, sehingga ketiganya tampak tak berguna. Menyimpulkan "jarak tidak penting" keliru; gabungkan atau buang salinan sebelum menafsirkan (angkamu boleh berbeda, polanya sama). 3: pada penyusun, tiga baris pertama berhujan 0 pada data uji berpeluang 0,655, 0,000, dan 0,000, lalu 0,930, 0,000, dan 0,095 setelah `hujan` menjadi 1: pengaruhnya berbeda antar baris dan bisa nol. Hasil itu hanya perilaku model pada satu baris, bukan bukti sebab di dunia. 4: dinilai dari keberadaan lima unsur dan tiga larangan kesimpulan yang masuk akal. 5: opsional.

**Latihan bercampur.** 1: label data uji ikut menentukan fitur mana yang dipilih, jadi data uji tidak lagi "belum terlihat" dan ketepatannya terlalu bagus; hitung importansi dan pilih fitur dari data latih saja, di dalam `Pipeline` bila memakai validasi silang. 2: tidak; mudah dijelaskan menyangkut keterbacaan, sedangkan benar atau tidaknya dinilai dari ketepatan pada data uji dan pembanding.

**Ulang berjarak.** 1: diukur pada data apa (latih atau uji), pada model mana, berapa sebarannya, dan apa yang tidak boleh disimpulkan. 2: contoh: peringkat fitur kembar terbagi; importansi mengukur ketergantungan model, bukan sebab; angka bergantung pada model dan data uji yang kecil. 3: karena yang diukur adalah ketergantungan model pada data; dua hal lain: fitur berkorelasi membagi nilai, dan importansi bawaan hutan bisa tinggi untuk angka acak.

## Langkah berikutnya

Modul berikut: `d-xi2-m10` (penyalahgunaan AI dan verifikasi konten). Bacaan lanjut: bagian "Permutation feature importance" pada panduan pengguna `scikit-learn`, termasuk bagian tentang fitur berkorelasi.
