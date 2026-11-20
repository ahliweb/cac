## Untuk siapa modul ini

Modul ini untuk murid kelas XI jalur D (kecerdasan buatan dan analisis data), untuk minggu `D-XI1-M12` silabus v1.3: kebocoran data dan bias evaluasi, yaitu mengenali kebocoran data dan evaluasi yang menyesatkan. Prasyarat: modul `d-xi1-m11`. Alat: Python 3 dengan pustaka `pandas` dan `scikit-learn`, tanpa akun.

Modul ini karangan penyusun dan disetujui pemilik program pada 2026-11-20 (keputusan lewat dialog; catatan tinjauan menjadi tindak lanjut revisi). Jalur D adalah pengayaan di luar rumusan capaian pembelajaran (CP); minggu ini tidak punya irisan pengayaan, jadi modul ini tidak dihitung memenuhi butir CP mana pun.

Aturan jalur D yang berlaku: data hanya sintetis (karangan) atau terbuka dengan lisensi jelas, tanpa data yang bisa mengenali orang; wajah, suara, dan foto orang tidak dipakai sebagai data; AI generatif boleh dipakai dengan etika dan dicatat, tanpa data pribadi, kata sandi, atau tugas bernilai pada permintaanmu, dan kamu tidak wajib punya akun. Saran: jawab dulu sendiri, baru minta AI memberi petunjuk bertahap; kode buatan AI dibaca, dijalankan, dan diuji. Setiap soal `Latihan` bertanda `AI: boleh` atau `AI: tanpa AI`.

Catatan untuk guru: blok Python dijalankan penyusun dengan `python3 -I` (Python 3.14.6, `pandas` 3.1.1, `scikit-learn` 1.9.1, per 2026-11) dan keluarannya ditempel apa adanya; yang dinyatakan hanya "bisa dijalankan dengan keluaran ini", bukan "benar untuk semua masukan". Kolom `dikarantina` dan tabel berlabel acak semu seluruhnya karangan penyusun dan sengaja dibuat untuk memperlihatkan kebocoran; angka 1,0 dan 0,5 adalah akibat rancangan itu, bukan temuan tentang model. Versi pustaka lain dapat memberi angka berbeda.

## Ingat kembali

Jawab dari ingatan, baru cek di bagian kunci.

1. Mengapa berkas data mentah tidak ditimpa, dan hasil olahan ditulis ke berkas baru? (dari `d-xi1-m4`)
2. Mengapa pembanding mayoritas dijalankan sebelum model? (dari `d-xi1-m9`)
3. Mengapa selisih kecil antar model pada data kecil belum membuktikan pemenang? (dari `d-xi1-m11`)

## Tujuan

Setelah modul ini kamu dapat:

- menjelaskan apa itu kebocoran data dan menyebut tiga bentuknya: fitur yang memuat jawaban, baris kembar di data latih dan uji, dan pengolahan memakai seluruh data sebelum dibagi;
- menunjukkan bahwa ketepatan 1,0 pada evaluasi patut dicurigai, bukan dirayakan;
- menjelaskan mengapa melaporkan angka terbaik dari banyak percobaan menyesatkan;
- memperbaiki evaluasi yang bocor dengan urutan yang benar: bagi dulu, olah kemudian;
- menulis pertanyaan pemeriksa untuk hasil evaluasi yang terlalu bagus.

Keluaran yang diminta silabus: catatan kasus (perbaiki evaluasi yang bocor).

## Prediksi dulu

Tebak dan tulis keluaran sebelum menjalankan. Bagian latih tidak berisi baris `5`.

```python
from sklearn.neighbors import KNeighborsClassifier

X_latih = [[1], [2], [8], [9]]
y_latih = [0, 0, 1, 1]
model = KNeighborsClassifier(n_neighbors=1).fit(X_latih, y_latih)
print(model.score([[2], [8]], [0, 1]))
print(model.predict([[5.4]]))
```

Tulis juga: apakah ketepatan 1,0 pada titik uji `[2]` dan `[8]` membuktikan model akan benar pada titik 5?

## Contoh terselesaikan

**Kebocoran pertama: fitur yang memuat jawaban.** Kita ingin menebak biji cacat sebelum diperiksa. Seseorang menambahkan kolom `dikarantina`, yang baru terisi **setelah** biji dinyatakan cacat. Kolom itu hampir sama dengan labelnya, sehingga model "belajar" membaca jawaban, bukan pola biji. Saat dipakai pada biji baru, kolom itu belum ada.

```python
import pandas as pd
from sklearn.dummy import DummyClassifier
from sklearn.model_selection import cross_val_score
from sklearn.tree import DecisionTreeClassifier


def buat_data(n):
    baris = []
    for i in range(n):
        ukuran = 10 + (i * 7) % 13  # mm
        berat = 20 + (i * 11) % 17  # mg
        cacat = 1 if ukuran + berat / 2 > 30 else 0
        if i % 13 == 12:  # label sengaja dibalik (derau)
            cacat = 1 - cacat
        baris.append((ukuran, berat, cacat))
    return pd.DataFrame(baris, columns=["ukuran", "berat", "cacat"])


df = buat_data(60)
df["dikarantina"] = df["cacat"]  # baru terisi SETELAH biji dinyatakan cacat
y = df["cacat"]

pohon = DecisionTreeClassifier(random_state=0)
pembanding = DummyClassifier(strategy="most_frequent")
for nama, model, kolom in [
    ("pembanding", pembanding, ["ukuran", "berat"]),
    ("tanpa kolom bocor", pohon, ["ukuran", "berat"]),
    ("dengan kolom bocor", pohon, ["ukuran", "berat", "dikarantina"]),
]:
    skor = cross_val_score(model, df[kolom], y, cv=5)
    print(nama, round(skor.mean(), 2))
```

```text
pembanding 0.52
tanpa kolom bocor 0.75
dengan kolom bocor 1.0
```

Baca hasilnya. Tanpa kolom bocor, pohon mendapat 0,75, di atas pembanding 0,52: itu penilaian yang jujur (sedang, bukan sempurna). Dengan kolom bocor, ketepatannya **1,00**: sempurna, dan itu justru tanda bahaya. Pertanyaan pemeriksanya: apakah semua fitur sudah tersedia **pada saat kita harus menebak**? Bila tidak, fitur itu dibuang.

**Kebocoran kedua dan bias: baris kembar dan memilih yang terbaik.** Tabel 40 baris berikut berlabel acak semu: tidak berhubungan dengan `a` dan `b`, jadi kemampuan menebak yang jujur hanya sekitar kebetulan, 0,5.

```python
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.neighbors import KNeighborsClassifier

n = 40
tabel = pd.DataFrame(
    {
        "a": [(i * 7) % 11 for i in range(n)],
        "b": [(i * 5) % 13 for i in range(n)],
        # label acak semu: tidak berhubungan dengan a dan b
        "y": [((i * i * 17 + 3 * i + 5) % 23) % 2 for i in range(n)],
    }
)
print("baris kembar:", tabel.duplicated().sum())


def ketepatan_uji(data, k, rs):
    X_latih, X_uji, y_latih, y_uji = train_test_split(
        data[["a", "b"]], data["y"], test_size=0.25, random_state=rs
    )
    return KNeighborsClassifier(n_neighbors=k).fit(X_latih, y_latih).score(X_uji, y_uji)


print("tanpa salinan:", ketepatan_uji(tabel, 1, 0))
kembar = pd.concat([tabel, tabel], ignore_index=True)  # tiap baris disalin
print("dengan salinan:", ketepatan_uji(kembar, 1, 0))
semua = [ketepatan_uji(tabel, 3, rs) for rs in range(30)]
print("terbaik dari 30:", max(semua), "rata-rata:", round(sum(semua) / len(semua), 2))
```

```text
baris kembar: 0
tanpa salinan: 0.5
dengan salinan: 1.0
terbaik dari 30: 0.7 rata-rata: 0.44
```

Tanpa salinan, ketepatan 0,5, yaitu kebetulan, sesuai dugaan. Setelah setiap baris disalin lalu dibagi acak, banyak baris uji punya kembaran di data latih, sehingga ketepatan melonjak ke 1,0 padahal modelnya tetap tidak bisa menebak apa pun: ia hanya mengingat. Perbaikannya: buang baris kembar **sebelum** membagi. Terakhir, 30 kali mencoba pembagian lalu melaporkan yang terbaik memberi 0,7, padahal rata-ratanya 0,44. Melaporkan yang terbaik dari banyak percobaan pada data yang sama membuat angka tampak lebih baik dari kemampuan sebenarnya; laporkan semua percobaan atau simpan data uji untuk satu kali penilaian akhir.

Bentuk ketiga: **mengubah skala seluruh data sebelum membagi**. Rata-rata dan simpangan dari seluruh data sudah memuat keterangan tentang data uji. Urutan yang benar: bagi dulu, pelajari penskala hanya dari data latih, lalu terapkan ke data latih dan uji. `make_pipeline` di `scikit-learn` merangkai penskala dan model sehingga di dalam validasi silang urutan itu terjaga otomatis.

## Contoh setengah jadi

Isi bagian `____` supaya penskala hanya belajar dari data latih lalu diterapkan ke data uji.

```python setengah-jadi
from sklearn.preprocessing import StandardScaler

X_latih = [[1.0], [2.0], [3.0]]
X_uji = [[10.0]]
skala = StandardScaler()
skala.____(X_latih)
print(skala.____(X_uji).round(2).tolist())
```

## Soal Parsons

Susun baris menjadi program yang membagi dulu, baru mempelajari penskala dari data latih. Lekukan tidak dipakai; yang diacak hanya urutannya.

```text
skala = StandardScaler().fit(X_latih)
from sklearn.preprocessing import StandardScaler
X_latih, X_uji = train_test_split(X, test_size=0.25, random_state=0)
print(len(skala.transform(X_uji)))
from sklearn.model_selection import train_test_split
X = [[1.0], [2.0], [3.0], [4.0], [5.0], [6.0], [7.0], [8.0]]
```

## Latihan

1. **Bocor atau tidak?** (`AI: tanpa AI`) Untuk tiap kasus, tulis bocor atau tidak, dan alasannya: (a) memprediksi apakah murid fiktif lulus ulangan memakai kolom "nilai ulangan susulan"; (b) menormalkan seluruh kolom lalu membagi data; (c) mengacak data suhu harian lalu membagi, untuk memprediksi suhu esok; (d) membagi data dulu, baru mengisi nilai hilang dengan median data latih.
2. **Pertanyaan pemeriksa.** (`AI: tanpa AI`) Tulis lima pertanyaan yang kamu ajukan ketika sebuah model mendapat ketepatan sangat tinggi. Lalu tulis satu baris `pandas` untuk menghitung jumlah baris kembar pada sebuah tabel.
3. **Perbaiki evaluasi bocor.** (`AI: boleh`) Ambil blok baris kembar pada contoh. Tulis ulang evaluasinya dengan urutan yang benar (buang baris kembar, bagi, latih, nilai) dan bandingkan angkanya. Tulis apa yang berubah dan mengapa.
4. **Banyak percobaan.** (`AI: boleh`) Hitung "terbaik dari N percobaan" untuk N = 1, 5, dan 30 pada tabel berlabel acak, dan bandingkan dengan rata-ratanya. Tulis satu kalimat tentang apa yang terjadi pada angka terbaik bila N makin besar.
5. **Catatan pemakaian AI (opsional).** Bila memakai asisten AI, catat alat, tujuan, garis besar perintah, bagian yang dipakai, dan cara memeriksanya.

## Latihan bercampur

1. Dari `d-xi1-m10`: sebuah model mendapat ketepatan 0,95 pada data dengan 5 persen kelas langka. Tulis dua pemeriksaan, satu dari modul ini dan satu dari `d-xi1-m10`, sebelum mempercayai angka itu.
2. Dari `d-xi1-m11`: apa yang harus sama agar perbandingan dua model adil, dan di mana kebocoran bisa merusak keadilan itu?

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `d-xi1-m13` (sekitar satu minggu lagi) dan modul jalur D kelas XI semester 2 pada minggu `D-XI2-M1` (sekitar tiga minggu lagi) dan `D-XI2-M6` (sekitar delapan minggu lagi). Jawab sekarang lalu simpan.

1. Apa itu kebocoran data, dan sebutkan dua contohnya?
2. Mengapa pengubahan skala dipasang pada data latih saja?
3. Apa pertanyaan pemeriksa untuk mencurigai hasil evaluasi yang terlalu bagus?

## Kesalahan umum

- **"Ketepatan 1,0 berarti modelnya sempurna."** Pada data sungguhan itu hampir selalu tanda kebocoran, baris kembar, atau data uji yang terlalu mudah.
- **"Kebocoran hanya terjadi bila data uji dilatihkan."** Fitur yang memuat jawaban, baris kembar, dan pengolahan sebelum membagi juga membocorkan.
- **"Boleh mengubah skala dulu, baru membagi, karena hasilnya hanya sedikit berbeda."** Selisih kecil yang tidak terlihat itulah sebabnya kebocoran jenis ini mudah lolos; urutannya dibuat benar dari awal.
- **"Melaporkan percobaan terbaik itu jujur karena angkanya memang ada."** Angka itu sebagian keberuntungan; laporkan semua percobaan atau satu penilaian akhir pada data uji yang disimpan.

## Cek mandiri

- [ ] Saya dapat menyebut tiga bentuk kebocoran data dan contohnya.
- [ ] Saya memeriksa apakah setiap fitur tersedia saat harus menebak, dan baris kembar sebelum membagi.
- [ ] Saya membagi dulu, lalu mengolah dengan penskala yang belajar dari data latih.
- [ ] Saya mencurigai ketepatan yang terlalu tinggi dan menulis pertanyaan pemeriksanya.
- [ ] Saya mencatat pemakaian AI bila saya memakainya.

## Kunci dan petunjuk

**Ingat kembali.** 1: supaya data asli tetap bisa dipakai ulang dan diperiksa; menimpanya menghilangkan jejak dan tidak bisa dibatalkan. 2: untuk patokan: menebak kelas terbanyak sudah memberi ketepatan tertentu, dan model harus lebih baik dari itu. 3: karena sebaran antar lipatan atau pembagian bisa sebesar selisihnya; urutannya bisa berbalik pada data lain.

**Prediksi dulu.** Keluaran: `1.0` lalu `[1]`. Titik uji 2 dan 8 sama persis dengan titik latih, jadi satu tetangga terdekat selalu benar. Titik 5,4 lebih dekat ke 8 (jarak 2,6) daripada ke 2 (jarak 3,4), jadi label 1. Ketepatan 1,0 pada titik yang sudah ada di data latih tidak membuktikan apa pun tentang titik 5 yang belum terlihat: itu bentuk kecil kebocoran, karena yang diuji sudah pernah dilihat.

**Contoh setengah jadi.** Isian: `fit` dan `transform`.

```python
from sklearn.preprocessing import StandardScaler

X_latih = [[1.0], [2.0], [3.0]]
X_uji = [[10.0]]
skala = StandardScaler()
skala.fit(X_latih)
print(skala.transform(X_uji).round(2).tolist())
```

```text
[[9.8]]
```

Penskala belajar rata-rata 2 dan simpangan sekitar 0,82 dari data latih, lalu titik uji 10 diubah menjadi sekitar 9,8. Titik uji tidak ikut menentukan rata-rata dan simpangan itu.

**Soal Parsons.** Urutan benar:

```python
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
X = [[1.0], [2.0], [3.0], [4.0], [5.0], [6.0], [7.0], [8.0]]
X_latih, X_uji = train_test_split(X, test_size=0.25, random_state=0)
skala = StandardScaler().fit(X_latih)
print(len(skala.transform(X_uji)))
```

```text
2
```

Data dibagi sebelum penskala dipelajari; `fit` hanya menerima `X_latih`.

**Latihan.** 1: (a) bocor: nilai susulan baru ada setelah hasil ulangan, jadi tidak tersedia saat menebak; (b) bocor: penskala memakai keterangan dari data uji; (c) bocor: acakan menaruh hari-hari setelah esok di data latih; bagi menurut urutan waktu; (d) tidak bocor: median dihitung dari data latih saja. 2: contoh pertanyaan: adakah fitur yang baru terisi setelah hasilnya diketahui; adakah baris kembar antara data latih dan uji; apakah pengolahan dilakukan setelah membagi; berapa ketepatan pembanding mayoritas; berapa banyak percobaan yang dicoba sebelum angka ini dilaporkan. Satu baris: `tabel.duplicated().sum()`. 3: dinilai dari urutan yang benar (`drop_duplicates()` sebelum `train_test_split`) dan angka tanpa kembar yang kembali sekitar kebetulan, bukan 1,0. 4: dinilai dari tiga angka terbaik yang dilaporkan; makin besar N, angka terbaik makin tinggi walau kemampuan sebenarnya tetap kebetulan. 5: opsional.

**Latihan bercampur.** 1: pemeriksaan dari modul ini: cari fitur yang memuat jawaban atau baris kembar; dari `d-xi1-m10`: bandingkan dengan ketepatan menebak kelas terbanyak (95 persen) dan lihat recall kelas langka. 2: data, lipatan atau pembagian, dan metrik yang sama; kebocoran membuat satu model tampak jauh lebih baik hanya karena ia diuntungkan oleh kebocoran, bukan karena lebih baik.

**Ulang berjarak.** 1: kebocoran data adalah keterangan tentang jawaban atau data uji yang ikut masuk saat model belajar; contoh: fitur yang memuat jawaban, baris kembar di data latih dan uji, mengubah skala sebelum membagi. 2: supaya data uji tidak ikut menentukan rata-rata dan simpangan, sehingga tetap data yang belum terlihat. 3: contoh: apakah semua fitur tersedia saat menebak, adakah baris kembar, apakah pengolahan setelah membagi, bagaimana dengan pembanding mayoritas, berapa banyak percobaan.

## Langkah berikutnya

Modul berikut: `d-xi1-m13` (proyek mini kelas XI semester 1), tempat kamu mengerjakan seluruh alur dari data sampai prediksi dan evaluasi yang jujur. Bacaan lanjut: bagian tentang kesalahan umum pada dokumentasi `scikit-learn`.
