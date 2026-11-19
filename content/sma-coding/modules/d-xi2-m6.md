## Untuk siapa modul ini

Modul ini untuk murid kelas XI jalur D (kecerdasan buatan dan analisis data), untuk minggu `D-XI2-M6` silabus v1.3: gambar sebagai angka, yaitu menghubungkan piksel dengan fitur dan menggolongkan gambar. Prasyarat: modul `d-xi2-m5`; sebaiknya kamu juga ingat piksel dan bit dari modul fondasi `fondasi-representasi-data` (`FND-X1-M3`). Alat: Python 3 dengan pustaka `numpy` dan `scikit-learn`, tanpa akun.

Modul ini berstatus DRAF: karangan penyusun, belum ditinjau pemilik. Jalur D adalah pengayaan di luar rumusan capaian pembelajaran (CP). Minggu ini beririsan dengan butir `F-AP-d` (memakai library untuk model) pada tingkat rendah, hanya karena alatnya coding; irisan itu **tidak dihitung** sebagai pemenuhan CP.

Aturan jalur D yang berlaku: data hanya sintetis (karangan) atau terbuka dengan lisensi jelas, tanpa data yang bisa mengenali orang; wajah, suara, dan foto orang tidak dipakai sebagai data; AI generatif boleh dipakai dengan etika dan dicatat, tanpa data pribadi, kata sandi, atau tugas bernilai pada permintaanmu, dan kamu tidak wajib punya akun. Saran: jawab dulu sendiri, baru minta AI memberi petunjuk bertahap; kode buatan AI dibaca, dijalankan, dan diuji. Setiap soal `Latihan` bertanda `AI: boleh` atau `AI: tanpa AI`.

Catatan untuk guru: blok Python dijalankan penyusun dengan `python3 -I` (Python 3.14.6, `numpy` 2.5.5, `scikit-learn` 1.9.1, per 2026-11) dan keluarannya ditempel apa adanya; yang dinyatakan hanya "bisa dijalankan dengan keluaran ini", bukan "benar untuk semua masukan". Gambar di modul ini hanya garis dan pola 8 kali 8 piksel buatan program; tidak ada foto, wajah, atau gambar orang. Pembagian latih dan uji **sengaja sulit** untuk memperlihatkan kelemahan piksel mentah; ini bukan ukuran pengenalan gambar sungguhan.

## Ingat kembali

Jawab dari ingatan, baru cek di bagian kunci.

1. Apa pertanyaan pemeriksa untuk mencurigai hasil evaluasi yang terlalu bagus? (dari `D-XI1-M12`)
2. Mengapa dua model dengan ketepatan 0,958 dan 0,959 pada data kecil belum tentu berbeda? (dari `d-xi2-m5`)
3. Apa itu `Pipeline`, dan apa gunanya menaruh pengubahan skala di dalamnya? (dari `d-xi2-m3`)
4. Sebuah gambar hitam-putih tersusun dari kisi piksel. Bagaimana komputer menyimpan satu piksel, dan berapa bit untuk gambar 8 kali 8? (dari `fondasi-representasi-data`)

## Tujuan

Setelah modul ini kamu dapat:

- menjelaskan gambar hitam-putih sebagai kisi angka 0 dan 1, lalu meratakannya menjadi satu baris fitur;
- melatih tetangga terdekat pada piksel mentah dan menjelaskan mengapa ia gagal ketika letak garis bergeser;
- membuat fitur buatan (jumlah piksel gelap per baris dan per kolom) dan membandingkannya dengan piksel mentah;
- membaca matriks kebingungan tiga kelas.

Keluaran yang diminta silabus: skrip gambar (gambar sintetis hasil program: bentuk dan pola).

## Prediksi dulu

Tebak dan tulis keluarannya, baru jalankan. Gambar 4 kali 4 ini berbentuk tanda tambah (1 = gelap).

```python
import numpy as np

g = np.array([[0, 1, 0, 0], [0, 1, 0, 0], [1, 1, 1, 1], [0, 1, 0, 0]])
print(g.sum(axis=1))
print(g.sum(axis=0))
print(g.ravel())
```

Tulis juga: baris dan kolom mana yang berjumlah paling besar, dan apa artinya bagi bentuk gambar.

## Contoh terselesaikan

**Piksel sebagai fitur.** Gambar 8 kali 8 punya 64 piksel; setelah diratakan (`ravel`), satu gambar menjadi satu baris berisi 64 fitur. Tiga kelas karangan dibangkitkan program: `H` garis mendatar, `V` garis tegak, dan `D` diagonal bergeser; sebagian piksel dibalik sebagai derau. **Data dibagi dengan sengaja sulit**: gambar latih memakai posisi 0 sampai 3 dan gambar uji posisi 4 sampai 7, sehingga model diuji pada letak yang belum pernah ia lihat. Dua penggolong tetangga terdekat dibandingkan: satu pada 64 piksel mentah, satu pada dua **fitur buatan**, yaitu jumlah piksel gelap terbanyak pada satu baris dan pada satu kolom.

```python
import numpy as np
import sklearn
from sklearn.dummy import DummyClassifier
from sklearn.metrics import confusion_matrix
from sklearn.neighbors import KNeighborsClassifier

JENIS = ["H", "V", "D"]  # garis mendatar, garis tegak, diagonal


def gambar(jenis, a, v):
    g = np.zeros((8, 8), dtype=int)
    if jenis == "H":
        g[a, :] = 1
    elif jenis == "V":
        g[:, a] = 1
    else:
        for i in range(8):
            g[i, (i + a) % 8] = 1
    for t in range(v):  # v piksel dibalik sebagai derau
        g[(a * 3 + v * 5 + t * 7) % 8, (a * 5 + v * 3 + t * 2 + 1) % 8] ^= 1
    return g


def buat_data(posisi):
    X, y = [], []
    for j in JENIS:
        for a in posisi:
            for v in range(3):
                X.append(gambar(j, a, v).ravel())
                y.append(j)
    return np.array(X), np.array(y)


print("\n".join("".join("#" if p else "." for p in baris) for baris in gambar("D", 2, 1)))
X_latih, y_latih = buat_data(range(0, 4))
X_uji, y_uji = buat_data(range(4, 8))
print(X_latih.shape, X_uji.shape)

mentah = KNeighborsClassifier(n_neighbors=3).fit(X_latih, y_latih)
print("mentah", round(mentah.score(X_uji, y_uji), 2))
print(confusion_matrix(y_uji, mentah.predict(X_uji), labels=JENIS))


def fitur(X):
    g = X.reshape(-1, 8, 8)
    return np.column_stack([g.sum(axis=2).max(axis=1), g.sum(axis=1).max(axis=1)])


buatan = KNeighborsClassifier(n_neighbors=3).fit(fitur(X_latih), y_latih)
print("buatan", round(buatan.score(fitur(X_uji), y_uji), 2))
print(confusion_matrix(y_uji, buatan.predict(fitur(X_uji)), labels=JENIS))
pembanding = DummyClassifier(strategy="most_frequent").fit(X_latih, y_latih)
print("pembanding", round(pembanding.score(X_uji, y_uji), 2))
print("scikit-learn", sklearn.__version__, "numpy", np.__version__)
```

```text
..#.....
...#....
....#...
.....##.
......#.
.......#
#.......
.#......
(36, 64) (36, 64)
mentah 0.06
[[0 7 5]
 [5 0 7]
 [4 6 2]]
buatan 1.0
[[12  0  0]
 [ 0 12  0]
 [ 0  0 12]]
pembanding 0.33
scikit-learn 1.9.1 numpy 2.5.5
```

Baca hasilnya. Gambar `D` yang dicetak punya satu piksel derau. Pembanding mendapat 0,33 (tiga kelas sama banyak). **Piksel mentah mendapat 0,06**, lebih buruk daripada menebak: matriks kebingungan (baris kenyataan H, V, D; kolom tebakan H, V, D) menunjukkan 0 dari 12 garis mendatar benar. Sebabnya terlihat dari jaraknya: garis mendatar di baris 1 dan di baris 5 berbeda pada 16 piksel, sedangkan garis mendatar di baris 1 dan garis tegak di kolom 5 hanya berbeda pada 14 piksel; garis mendatar di letak baru lebih mirip garis tegak yang pernah dilihat. Piksel mentah menyimpan **letak**, bukan **bentuk**. **Fitur buatan mendapat 1,0**: garis mendatar punya baris penuh gelap, garis tegak punya kolom penuh gelap, diagonal tidak punya keduanya, dan ukuran itu tidak peduli letak. Fitur ini dihitung dari tiap gambar sendiri, tanpa label dan tanpa gambar lain, jadi tidak bocor; tetapi 1,0 pada 36 gambar buatan yang rapi bukan bukti pengenalan gambar nyata.

## Contoh setengah jadi

Isi bagian `____` supaya program membuat gambar 5 kali 5 berbentuk tanda tambah, mencetak jumlah piksel gelap, dan mencetak jumlah angka setelah diratakan.

```python setengah-jadi
import numpy as np

g = np.zeros((5, 5), dtype=int)
g[____, :] = 1  # garis mendatar di baris tengah
g[:, ____] = 1  # garis tegak di kolom tengah
print(g.sum())
print(g.ravel().____)
```

## Soal Parsons

Susun baris menjadi program yang membuat gambar 3 kali 3 berbentuk tanda tambah lalu mencetak jumlah piksel gelap tiap kolom. Lekukan tidak dipakai; yang diacak hanya urutannya (dua baris penugasan garis boleh bertukar).

```text
print(g.sum(axis=0))
g[:, 1] = 1
g = np.zeros((3, 3), dtype=int)
import numpy as np
g[1, :] = 1
```

## Latihan

1. **Piksel ke angka.** (`AI: tanpa AI`) Gambar 4 kali 4 berikut (1 = gelap): baris 1 `1 0 0 1`, baris 2 `0 1 1 0`, baris 3 `0 1 1 0`, baris 4 `1 0 0 1`. Tulis jumlah tiap baris dan tiap kolom, lalu 16 bit setelah diratakan dan bilangan desimalnya bila dibaca sebagai satu bilangan biner.
2. **Rancang fitur dulu.** (`AI: tanpa AI`) Tulis tabel nilai fitur buatan (jumlah terbesar per baris, per kolom) yang kamu harapkan untuk garis mendatar, garis tegak, dan diagonal 8 kali 8 tanpa derau, dan mengapa satu piksel derau hanya menggesernya sedikit.
3. **Letak berpindah.** (`AI: boleh`) Tukar pembagian contoh (latih posisi 4 sampai 7, uji 0 sampai 3) dan tulis apa yang kamu lihat.
4. **Kelas baru.** (`AI: boleh`) Tambahkan kelas `P` (tanda tambah: garis mendatar dan tegak di posisi sama). Berapa ketepatan kedua cara, dan nilai fitur buatan apa yang membedakan `P`?
5. **Catatan pemakaian AI (opsional).** Bila memakai asisten AI, catat alat, tujuan, garis besar perintah, bagian yang dipakai, dan cara memeriksanya.

## Latihan bercampur

1. Dari `D-XI1-M12`: sebuah model gambar mendapat 1,0 pada data uji. Tulis tiga pertanyaan pemeriksa khusus untuk gambar, misalnya tentang gambar kembar di latih dan uji.
2. Dari `d-xi2-m3`: mengapa menghitung fitur buatan dari tiap gambar tidak bocor, berbeda dengan `SelectKBest` pada seluruh data?

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `d-xi2-m7` (sekitar satu minggu lagi), `d-xi2-m9` (sekitar tiga minggu lagi), dan `D-XI2-M14` (sekitar delapan minggu lagi). Jawab sekarang lalu simpan.

1. Mengapa model pada piksel mentah bisa gagal pada gambar yang bentuknya sama tetapi letaknya bergeser?
2. Apa itu fitur buatan dari gambar, misalnya jumlah piksel gelap per baris, dan mengapa ia lebih tahan terhadap letak?
3. Mengapa ketepatan di bawah pembanding menandakan ada yang salah, dan bagaimana mengujinya?

## Kesalahan umum

- **"Komputer melihat gambar seperti kita."** Komputer hanya mengolah angka piksel; bentuk harus dihitung dari angka itu.
- **"Ketepatan di bawah 0,33 pada tiga kelas hanya sial."** Di bawah tebakan acak berarti model dibingungkan secara sistematis oleh data.
- **"Foto teman kelas boleh dipakai untuk latihan."** Tidak: wajah dan foto orang tidak dipakai sebagai data di jalur ini.

## Cek mandiri

- [ ] Saya dapat menjelaskan gambar sebagai kisi angka dan meratakannya menjadi fitur.
- [ ] Saya dapat membangkitkan dan mencetak gambar sintetis dengan `numpy`.
- [ ] Saya dapat menjelaskan mengapa piksel mentah gagal pada letak baru.
- [ ] Saya dapat membuat fitur buatan dari gambar dan membandingkannya.
- [ ] Saya dapat membaca matriks kebingungan tiga kelas.
- [ ] Saya mencatat pemakaian AI bila saya memakainya.

## Kunci dan petunjuk

**Ingat kembali.** 1: apakah ada baris kembar di latih dan uji; apakah ada kolom yang memuat jawaban; apakah pengolahan dipasang setelah membagi; bagaimana hasil pembanding mayoritas; berapa banyak percobaan. 2: karena selisih sekecil itu hanya sekitar satu kalimat pada data uji dan dapat berbalik pada pembagian lain. 3: `Pipeline` merangkai langkah (skala, model) sebagai satu model; di validasi silang tiap lipatan memasang skala dari data latihnya saja sehingga tidak bocor. 4: satu bit per piksel (misalnya 1 gelap dan 0 terang); gambar 8 kali 8 memakai 64 bit.

**Prediksi dulu.** Keluaran: `[1 1 4 1]`, `[1 4 1 1]`, dan `[0 1 0 0 0 1 0 0 1 1 1 1 0 1 0 0]`. Baris 3 (indeks 2) berjumlah 4 dan kolom 2 (indeks 1) berjumlah 4: itu garis mendatar dan garis tegak penuh dari tanda tambah. Jumlah terbesar per baris dan per kolom menggambarkan bentuk, bukan letak.

**Contoh setengah jadi.** Isian: `2`, `2`, `size`.

```python
import numpy as np

g = np.zeros((5, 5), dtype=int)
g[2, :] = 1  # garis mendatar di baris tengah
g[:, 2] = 1  # garis tegak di kolom tengah
print(g.sum())
print(g.ravel().size)
```

```text
9
25
```

Jumlah piksel gelap 9, bukan 10, karena titik tengah dihitung sekali.

**Soal Parsons.** Urutan benar:

```python
import numpy as np
g = np.zeros((3, 3), dtype=int)
g[1, :] = 1
g[:, 1] = 1
print(g.sum(axis=0))
```

```text
[1 3 1]
```

**Latihan.** 1: jumlah baris `2 2 2 2`, jumlah kolom `2 2 2 2`; bit: `1001 0110 0110 1001`; sebagai bilangan biner sama dengan 38505 (9 kali 4096 + 6 kali 256 + 6 kali 16 + 9). 2: garis mendatar: (8, 1); garis tegak: (1, 8); diagonal: (1, 1); satu piksel derau menambah atau mengurangi satu pada paling banyak satu baris dan satu kolom, sehingga angka tetap dekat dengan angka kelasnya. 3: setelah ditukar, piksel mentah mendapat 0,03 dan fitur buatan 1,0 (pada penyusun); pola yang sama muncul dari arah sebaliknya, dan penyebabnya tetap letak yang belum pernah dilihat. 4: pada penyusun, kedua cara: mentah 0,04 dan buatan 1,0 (48 gambar uji); kelas `P` punya (7 atau 8, 7 atau 8), sedangkan `H` (7 atau 8, 1 atau 2), `V` (1 atau 2, 7 atau 8), dan `D` (1, 1) atau (2, 2) pada gambar yang dibangkitkan di sini. 5: opsional.

**Latihan bercampur.** 1: contoh: apakah gambar uji hanyalah salinan gambar latih dengan derau; apakah letak garis di uji sudah pernah ada di latih; bagaimana pembanding mayoritas; apakah model diuji pada gambar yang betul-betul baru. 2: karena `fitur` hanya memakai piksel gambar itu sendiri, tanpa label dan tanpa gambar lain; `SelectKBest` memakai label dari seluruh baris untuk memilih kolom, sehingga data uji ikut menentukan.

**Ulang berjarak.** 1: karena piksel mentah menyimpan letak, bukan bentuk; garis yang bergeser mengubah hampir semua piksel, sehingga lebih mirip bentuk lain di letak itu. 2: angka yang dihitung dari gambar, misalnya jumlah piksel gelap terbanyak per baris dan per kolom; ia tidak bergantung pada letak sehingga lebih tahan terhadap pergeseran. 3: karena model yang lebih buruk daripada menebak berarti ia dibingungkan secara sistematis oleh data (misalnya letak yang belum pernah dilihat); diuji dengan matriks kebingungan dan pembanding.

## Langkah berikutnya

Modul berikut: `d-xi2-m7` (gagasan jaringan saraf), yang memperlihatkan satu cara belajar fitur tanpa dibuat tangan. Bacaan lanjut: bagian pengolahan data gambar pada dokumentasi `numpy`.
