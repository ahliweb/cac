## Untuk siapa modul ini

Mahasiswa semester 5 informatika atau ilmu komputer yang sudah menempuh
`KUL-I-201` dan memiliki dasar statistik (prasyarat dari prodi). `KUL-I-303`: 3
SKS, jalur I; 14 pertemuan, ujian tengah sesudah pertemuan 7 dan ujian akhir
sesudah pertemuan 14 `[asumsi]` (silabus 2.3). Kamu butuh Python 3 dan NumPy.

Kode memakai **Python 3.12** dan **NumPy 1.26.4** (satu-satunya pustaka luar).
Tiap blok lengkap sudah dijalankan dan keluarannya sama dengan yang tertulis;
blok `setengah-jadi` sengaja berlubang. Semua data **sintetis**, dibuat dengan
pembangkit kongruen linear kecil agar hasilnya sama di setiap mesin. Algoritma
ditulis dari nol agar isinya terlihat; pustaka dipakai di `KUL-I-307`. Contoh
terselesaikan penuh sangat terbatas.

## Peta semester

| Pertemuan | Bagian: pokok bahasan | CPMK | Kuis pembuka (jarak) |
| --- | --- | --- | --- |
| 1 | B1: pencarian, BFS | C1 | `KUL-I-201` |
| 2 | B1: A*, heuristik | C1 | 1, lalu `KUL-I-201` |
| 3 | B1: ringkasan; **kuis kumulatif 1** | C1 | 2, lalu 1 |
| 4 | B2: regresi linear | C1 | 3, lalu `KUL-I-201` |
| 5 | B2: turun gradien | C1 | 4, lalu 2 |
| 6 | B2: klasifikasi logistik | C1 | 5, lalu 3 |
| 7 | B3: data latih dan uji; **kuis kumulatif 2** | C2 | 6, lalu 4 |
| ujian tengah | Ujian, tanpa AI | C1 sampai C2 | |
| 8 | B3: overfitting | C2 | 7, lalu 5 |
| 9 | B3: matriks konfusi | C2 | 8, lalu 6 |
| 10 | B4: neuron dan lapisan | C1 | 9, lalu 7 |
| 11 | B4: propagasi balik; **kuis kumulatif 3** | C1 | 10, lalu 8 |
| 12 | B5: bias data | C3 | 11, lalu 9 |
| 13 | B5: ukuran kesetaraan, tata kelola | C3 | 12, lalu 10 |
| 14 | B6: biaya dan energi; **kuis kumulatif akhir** | C4 | 13, lalu 1 sampai 12 |
| ujian akhir | Ujian, tanpa AI | C1 sampai C4 | |

## Ingat kembali

Tiap pertemuan dibuka kuis 5 menit **tanpa catatan**, 3 sampai 5 soal, dari
asal pada kolom terakhir peta. Contoh pertemuan 1 sampai 3:

1. Mengapa BFS memberi jalur terpendek pada grid tanpa bobot, dan mengapa
   memori BFS bisa besar? (`KUL-I-201`)
2. Apa beda masalah yang dapat diverifikasi cepat dan yang dapat dipecahkan
   cepat? Beri satu contoh. (`KUL-I-201`)
3. Apa arti rata-rata dan simpangan baku, dan kapan median lebih tepat?
   (statistik, prasyarat prodi)

Soal 1 dasar bagian 1; soal 3 dasar bagian 3.

## Tujuan

Pada akhir semester kamu dapat (CPMK, silabus bagian 3.1):

- **C1** menerapkan pencarian dan pembelajaran terbimbing;
- **C2** mengevaluasi model;
- **C3** membahas etika dan bias;
- **C4** memperkirakan biaya komputasi dan energi pelatihan dan pemakaian model
  secara kasar dengan menyebut ketidakpastiannya.

## Bagian 1: Pencarian (pertemuan 1 sampai 3)

Agen mencari urutan langkah dari keadaan awal ke tujuan. **BFS** memperluas
keadaan menurut jarak; pada graf tanpa bobot ia menemukan jalur terpendek
tetapi menyimpan banyak keadaan. **A\*** mengurutkan keadaan menurut
`f = g + h`: `g` biaya sampai sini, `h` **heuristik** perkiraan sisa biaya.
Bila `h` tak pernah melebihi biaya sebenarnya (*admissible*, mis. jarak
Manhattan di grid), A\* tetap menemukan jalur terpendek.

### Prediksi dulu

Pada grid 7x8 hampir terbuka berikut (`#` tembok), berapa panjang jalur
terpendek `S` ke `G`, dan mana yang membuka lebih banyak sel: BFS atau A\*?

### Contoh terselesaikan

```python
import heapq
from collections import deque

PETA = [
    "S.......",
    "........",
    "..####..",
    "........",
    "........",
    "..####..",
    ".......G",
]
R, C = len(PETA), len(PETA[0])
MULA, TUJUAN = (0, 0), (6, 7)


def tetangga(s):
    for dr, dc in ((1, 0), (-1, 0), (0, 1), (0, -1)):
        r, c = s[0] + dr, s[1] + dc
        if 0 <= r < R and 0 <= c < C and PETA[r][c] != "#":
            yield (r, c)


def bfs():
    jarak, antrean, dibuka = {MULA: 0}, deque([MULA]), 0
    while antrean:
        s = antrean.popleft()
        dibuka += 1
        if s == TUJUAN:
            return jarak[s], dibuka
        for t in tetangga(s):
            if t not in jarak:
                jarak[t] = jarak[s] + 1
                antrean.append(t)


def h(s):  # jarak Manhattan: tak pernah melebihi jarak sebenarnya
    return abs(s[0] - TUJUAN[0]) + abs(s[1] - TUJUAN[1])


def a_bintang():
    g, tumpukan, dibuka = {MULA: 0}, [(h(MULA), 0, 0, MULA)], 0
    while tumpukan:
        _, _, biaya, s = heapq.heappop(tumpukan)
        if biaya > g[s]:
            continue
        dibuka += 1
        if s == TUJUAN:
            return biaya, dibuka
        for t in tetangga(s):
            if t not in g or biaya + 1 < g[t]:
                g[t] = biaya + 1
                heapq.heappush(tumpukan, (biaya + 1 + h(t), -(biaya + 1), biaya + 1, t))


print("BFS", *bfs())
print("A*", *a_bintang())
print("Manhattan", h(MULA))
# keluaran:
# BFS 13 48
# A* 13 14
# Manhattan 13
```

Panjang 13 sama dengan jarak Manhattan. BFS membuka 48 sel (hampir seluruh
grid); A\* hanya 14. Ikatan `f` diurai dengan memilih `g` terbesar (`-g` pada
tumpukan): tanpa itu A\* juga membuka 48 sel karena banyak sel ber-`f` sama.
Hemat langkah tidak mengorbankan kebenaran selama `h` *admissible*.

### Contoh setengah jadi

```text setengah-jadi
// grid kosong 5x5, S di (0,0), G di (4,4):
// jarak terpendek = ___ ; h(S) = ___ ; apakah A* dengan h = 0 sama dengan BFS? ___
// bila h melebihi biaya nyata (mis. h = 3 * Manhattan), hasil A* menjadi ___
```

### Latihan

1. **Ubah:** tambahkan tembok yang memaksa memutar; prediksi panjang baru dan
   bandingkan sel dibuka.
2. **Buat:** heuristik jarak lurus (Euclid, dibulatkan ke atas); ujilah apakah
   *admissible* di grid ini.
3. **Jelaskan:** mengapa BFS bisa kehabisan memori, dan kapan A\* tak membantu?
4. **Berpasangan (praktikum):** pengemudi dan navigator bertukar peran tiap
   sekitar 10 menit; pasangan acak, tugas dinilai tetap perorangan. Satu orang
   menggambar grid, satunya menelusuri A\* lima langkah di kertas.

## Bagian 2: Regresi dan klasifikasi (pertemuan 4 sampai 6)

**Pembelajaran terbimbing** mencari fungsi dari contoh berlabel. **Regresi**
memprediksi bilangan, mis. garis `y = w·x + b` yang meminimalkan galat kuadrat
rata-rata (MSE), dihitung langsung (kuadrat terkecil) atau lewat **turun
gradien**: ubah parameter sedikit ke arah yang menurunkan kerugian, ulangi.
**Klasifikasi** memprediksi kelas; **regresi logistik** memakai sigmoid agar
keluaran bermakna peluang 0 sampai 1, dilatih dengan turun gradien juga.
**Laju belajar** dan jumlah iterasi diatur manusia.

### Prediksi dulu

Data dari `y = 3x + 2` ditambah derau kecil. Tebak kemiringan dan titik potong
kuadrat terkecil, dan apakah turun gradien menemukan angka yang sama. Pada
dua gugus yang saling menimpa, dapatkah akurasi latih mencapai 100%?

### Contoh terselesaikan

```python
import numpy as np

s = 7


def acak():  # pembangkit kongruen linear: data sama di semua mesin, di [-1, 1)
    global s
    s = (1103515245 * s + 12345) % 2**31
    return s / 2**30 - 1.0


# Regresi: y = 3x + 2 + derau
x = np.arange(20) / 2.0
y = 3.0 * x + 2.0 + np.array([acak() for _ in x])
(m, c), *_ = np.linalg.lstsq(np.column_stack([x, np.ones_like(x)]), y, rcond=None)
print("lstsq", round(m, 3), round(c, 3))

w, b = 0.0, 0.0
for _ in range(5000):
    e = w * x + b - y
    w -= 0.02 * np.mean(e * x)
    b -= 0.02 * np.mean(e)
print("turun gradien", round(w, 3), round(b, 3))

# Klasifikasi: dua gugus yang saling menimpa, regresi logistik
n = 40
X = np.array([[sg * 0.5 + acak(), sg * 0.5 + acak()] for sg in (-1, 1) for _ in range(n)])
t = np.array([0] * n + [1] * n)
bobot, bias = np.zeros(2), 0.0
for _ in range(2000):
    p = 1 / (1 + np.exp(-(X @ bobot + bias)))
    bobot -= 0.5 * (X.T @ (p - t)) / len(t)
    bias -= 0.5 * np.mean(p - t)
akurasi = np.mean(((X @ bobot + bias) >= 0).astype(int) == t)
print("akurasi latih", akurasi)
# keluaran:
# lstsq 2.966 2.196
# turun gradien 2.966 2.196
# akurasi latih 0.875
```

Kuadrat terkecil dan turun gradien sepakat (2,966 dan 2,196; selisih dari 3 dan
2 adalah derau). Klasifikasi tak sempurna (87,5%) karena gugus saling menimpa:
tak ada garis yang memisahkannya. Akurasi latih belum bukti: bagian 3.

### Contoh setengah jadi

```python setengah-jadi
for _ in range(5000):
    e = w * x + b - y
    w -= ___ * np.mean(e * x)
    b -= ___ * np.mean(___)
# laju belajar 2.0 pada data ini: ___
```

### Latihan

1. **Ubah:** laju belajar 0.02 menjadi 0.2 lalu 0.0001; prediksi dulu.
2. **Buat:** regresi dua fitur (`x1`, `x2`) dengan kuadrat terkecil.
3. **Jelaskan:** apa arti keluaran sigmoid 0,8, dan mengapa ambang 0,5 hanya
   satu pilihan?
4. **Berpasangan:** satu orang membuat data dengan satu pencilan, satunya
   memperkirakan pengaruhnya pada garis.

## Bagian 3: Evaluasi model (pertemuan 7 sampai 9)

**Overfitting**: galat latih rendah, galat pada data baru tinggi. Karena itu
data dibagi: **latih** (belajar), **validasi** (memilih pengaturan), **uji**
(dipakai sekali di akhir). **Kebocoran data** terjadi bila informasi uji masuk
ke pelatihan (mis. menormalkan memakai seluruh data). Untuk klasifikasi,
**akurasi** menyesatkan bila kelas tak seimbang; pakai matriks konfusi:
**presisi** `TP / (TP + FP)` (dari yang ditebak positif, berapa benar) dan
**recall** `TP / (TP + FN)` (dari yang sebenarnya positif, berapa tertangkap).

### Prediksi dulu

Polinom derajat 1, 2, 9 dipasang pada 12 titik dari `y = x² - 0.5x` dengan
derau: mana galat latih terkecil, mana galat uji terkecil? Lalu penguji "95%
akurat" memeriksa penyakit yang diderita 1% orang: dari yang positif, berapa
persen benar-benar sakit?

### Contoh terselesaikan

```python
import numpy as np

s = 11


def acak():
    global s
    s = (1103515245 * s + 12345) % 2**31
    return s / 2**30 - 1.0


def f(x):
    return x**2 - 0.5 * x


x_latih = np.linspace(-1, 1, 12)
y_latih = f(x_latih) + 0.15 * np.array([acak() for _ in x_latih])
x_uji = np.linspace(-0.95, 0.95, 12)
y_uji = f(x_uji) + 0.15 * np.array([acak() for _ in x_uji])

print("derajat  MSE-latih  MSE-uji")
for d in (1, 2, 9):
    k = np.polyfit(x_latih, y_latih, d)
    latih = np.mean((np.polyval(k, x_latih) - y_latih) ** 2)
    uji = np.mean((np.polyval(k, x_uji) - y_uji) ** 2)
    print(f"{d:>7}  {latih:9.4f}  {uji:7.4f}")

benar = np.array([1] * 5 + [0] * 11)
tebak = np.array([1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0])
tp = int(np.sum((tebak == 1) & (benar == 1)))
fp = int(np.sum((tebak == 1) & (benar == 0)))
fn = int(np.sum((tebak == 0) & (benar == 1)))
tn = int(np.sum((tebak == 0) & (benar == 0)))
presisi, recall = tp / (tp + fp), tp / (tp + fn)
print("TP FP FN TN", tp, fp, fn, tn)
print("akurasi", (tp + tn) / len(benar), "presisi", presisi, "recall", recall)

benar_positif = 0.01 * 0.95
palsu_positif = 0.99 * 0.05
print("P(kasus | positif)", round(benar_positif / (benar_positif + palsu_positif), 3))
# keluaran:
# derajat  MSE-latih  MSE-uji
#       1     0.1056   0.0967
#       2     0.0052   0.0085
#       9     0.0002   0.0193
# TP FP FN TN 3 2 2 9
# akurasi 0.75 presisi 0.6 recall 0.6
# P(kasus | positif) 0.161
```

Galat latih turun terus (0,1056, 0,0052, 0,0002) tetapi galat uji terkecil pada
derajat 2 (0,0085) dan naik pada derajat 9 (0,0193): derajat 9 menghafal derau.
Akurasi 75% menyembunyikan presisi dan recall 60%. Hanya 16,1% yang
positif benar-benar sakit pada penyakit 1%: **frekuensi dasar** menentukan
arti hasil.

### Contoh setengah jadi

```text setengah-jadi
// TP = 6, FP = 2, FN = 4, TN = 88
// akurasi = ___ ; presisi = ___ ; recall = ___
// model yang selalu menebak "negatif": akurasi = ___ ; recall = ___
```

### Latihan

1. **Ubah:** ganti derajat 9 dengan 5; prediksi urutan galat uji.
2. **Buat:** validasi silang 3 lipatan untuk memilih derajat polinom.
3. **Jelaskan:** beri contoh kebocoran data dan akibatnya pada galat uji.
4. **Berpasangan:** satu orang membuat tabel konfusi 20 contoh, satunya
   menghitung presisi dan recall dan menilai mana lebih penting.

## Bagian 4: Jaringan saraf dasar (pertemuan 10 dan 11)

**Neuron** menghitung jumlah berbobot masukannya lalu menerapkan fungsi
aktivasi (`tanh`, sigmoid). Neuron disusun menjadi **lapisan**; satu lapisan
tersembunyi cukup untuk mempelajari fungsi yang tak terpisah secara linear,
misalnya **XOR**. Pelatihan: **propagasi maju** menghitung keluaran dan
kerugian; **propagasi balik** memakai aturan rantai menghitung turunan
kerugian terhadap tiap bobot; turun gradien memperbarui bobot. Bobot awal tak
boleh semuanya sama, agar neuron tak seragam.

### Prediksi dulu

XOR: `00→0`, `01→1`, `10→1`, `11→0`. Mengapa tak ada satu garis yang
memisahkannya? Dengan 4 neuron tersembunyi, berapa parameternya?

### Contoh terselesaikan

```python
import numpy as np

s = 3


def acak():
    global s
    s = (1103515245 * s + 12345) % 2**31
    return s / 2**30 - 1.0


X = np.array([[0, 0], [0, 1], [1, 0], [1, 1]], dtype=float)
t = np.array([[0], [1], [1], [0]], dtype=float)  # XOR: tidak terpisah secara linear

H = 4
W1 = np.array([[acak() for _ in range(H)] for _ in range(2)])
b1 = np.zeros((1, H))
W2 = np.array([[acak()] for _ in range(H)])
b2 = np.zeros((1, 1))

for epoch in range(5001):
    h = np.tanh(X @ W1 + b1)  # maju
    p = 1 / (1 + np.exp(-(h @ W2 + b2)))
    kerugian = -np.mean(t * np.log(p) + (1 - t) * np.log(1 - p))
    if epoch in (0, 100, 5000):
        print("epoch", epoch, "kerugian", round(float(kerugian), 4))
    dz2 = (p - t) / len(t)  # mundur: turunan kerugian terhadap tiap bobot
    dz1 = (dz2 @ W2.T) * (1 - h**2)
    W2 -= h.T @ dz2
    b2 -= dz2.sum(axis=0, keepdims=True)
    W1 -= X.T @ dz1
    b1 -= dz1.sum(axis=0, keepdims=True)

print("prediksi", np.round(p.ravel(), 3))
print("jumlah parameter", W1.size + b1.size + W2.size + b2.size)
# keluaran:
# epoch 0 kerugian 0.6998
# epoch 100 kerugian 0.1589
# epoch 5000 kerugian 0.0005
# prediksi [0.    0.999 0.999 0.001]
# jumlah parameter 17
```

Parameter: `W1` 8, `b1` 4, `W2` 4, `b2` 1; total 17. Kerugian turun dari 0,6998
ke 0,0005 dan keempat prediksi benar, tetapi **diuji pada data yang sama**:
bukan bukti jaringan itu umum. Jaringan dengan jutaan parameter berisiko
overfitting dan berbiaya pelatihan jauh lebih besar (bagian 6).

### Contoh setengah jadi

```python setengah-jadi
dz2 = (p - t) / len(t)
dz1 = (dz2 @ W2.T) * (1 - h**2)   # turunan tanh(z) = 1 - ___
W2 -= h.T @ ___
W1 -= X.T @ ___
```

### Latihan

1. **Ubah:** `H = 1`; prediksi apakah XOR masih dapat dipelajari.
2. **Buat:** hitung gradien `W1[0, 0]` dengan beda hingga dan bandingkan
   dengan propagasi balik.
3. **Jelaskan:** mengapa fungsi aktivasi harus tak linear?
4. **Berpasangan:** satu orang memilih bobot jaringan 2-2-1, satunya menghitung
   keluaran maju satu masukan di kertas.

## Bagian 5: Etika dan bias (pertemuan 12 dan 13)

**Bias** dalam sistem AI sering bersumber dari data: kelompok yang jarang
dilayani buruk; label mencerminkan penilaian masa lalu; data mengukur sesuatu
yang berbeda dari tujuan. Akurasi keseluruhan menyembunyikannya: **periksa
metrik per kelompok**. Ukuran kesetaraan juga bisa bertentangan: bila frekuensi
dasar tiap kelompok berbeda, galat yang sama (TPR dan FPR) dapat memberi
presisi berbeda. Memilih ukuran adalah keputusan nilai, bukan sekadar teknik: ia perlu
pemangku kepentingan, dokumentasi, dan pengawasan manusia untuk keputusan yang
berdampak pada orang. Di Indonesia ada Surat Edaran Menteri Komunikasi dan
Informatika Nomor 9 Tahun 2023 tentang Etika Kecerdasan Artifisial (berstatus
berlaku menurut JDIH Komdigi per 2026-11); modul tidak mengutip isinya.

### Prediksi dulu

Satu model dilatih pada 190 contoh kelompok A dan 10 contoh B yang polanya
berlawanan. Tebak akurasi keseluruhan, A, dan B. Lalu dua kelompok ber-TPR dan
FPR sama tetapi frekuensi dasar 40% dan 10%: apakah presisi sama?

### Contoh terselesaikan

```python
import numpy as np

s = 5


def acak():
    global s
    s = (1103515245 * s + 12345) % 2**31
    return s / 2**30 - 1.0


def gugus(n, pusat):
    return [[pusat[0] + 0.6 * acak(), pusat[1] + 0.6 * acak()] for _ in range(n)]


# SINTETIS. Kelompok A besar (190 contoh); kelompok B kecil (10) dengan pola
# kelas berlawanan arah dengan A.
XA = np.array(gugus(95, (-1, -1)) + gugus(95, (1, 1)))
tA = np.array([0] * 95 + [1] * 95)
XB = np.array(gugus(5, (0.6, 0.6)) + gugus(5, (-0.6, -0.6)))
tB = np.array([0] * 5 + [1] * 5)
X, t = np.vstack([XA, XB]), np.concatenate([tA, tB])

w, b = np.zeros(2), 0.0
for _ in range(3000):
    p = 1 / (1 + np.exp(-(X @ w + b)))
    w -= 0.5 * (X.T @ (p - t)) / len(t)
    b -= 0.5 * np.mean(p - t)


def akurasi(Xk, tk):
    return float(np.mean(((Xk @ w + b) >= 0).astype(int) == tk))


print("keseluruhan", round(akurasi(X, t), 3), "A", akurasi(XA, tA), "B", akurasi(XB, tB))


# tabel hitungan karangan: A punya 40 dari 100 positif sungguhan, B hanya 10
for nama, tp, fn, fp, tn in (("A", 32, 8, 6, 54), ("B", 8, 2, 9, 81)):
    print(nama, "TPR", round(tp / (tp + fn), 2), "FPR", round(fp / (fp + tn), 2),
          "presisi", round(tp / (tp + fp), 2))
# keluaran:
# keseluruhan 0.95 A 1.0 B 0.0
# A TPR 0.8 FPR 0.1 presisi 0.84
# B TPR 0.8 FPR 0.1 presisi 0.47
```

Akurasi keseluruhan **95%** tampak baik, tetapi untuk kelompok B **0%**: model
mempelajari pola mayoritas. Data sintetis ini ekstrem agar jelas; kasus nyata
lebih halus dan hanya ketemu bila tiap kelompok diperiksa. Pada tabel hitungan
karangan, A dan B sama-sama TPR 0,8 dan FPR 0,1 tetapi presisi 0,84 dan 0,47:
galat yang sama menghasilkan presisi berbeda. Tidak ada satu angka kesetaraan
yang selalu benar; pilih dan jelaskan alasannya.

### Contoh setengah jadi

```text setengah-jadi
// Penyaring lamaran dilatih pada data 10 tahun perekrutan.
// Dua sumber bias: ___ ; ___ . Dua pemeriksaan sebelum dipakai: ___ ; ___
// Siapa meninjau keputusan yang menolak pelamar? ___
```

### Latihan

1. **Ubah:** contoh kelompok B dari 10 menjadi 100; prediksi akurasi B.
2. **Buat:** `laporan_kelompok(model, X, t, kelompok)` yang mencetak akurasi,
   TPR, FPR per kelompok.
3. **Jelaskan:** mengapa "buang atribut sensitif" tidak otomatis
   menghilangkan bias?
4. **Berpasangan:** satu orang menggambarkan sistem AI di kampus (tanpa data
   pribadi), satunya mendaftar pihak terdampak dan satu risiko bias.

## Bagian 6: Biaya komputasi dan energi (pertemuan 14)

Butir singkat; ketidakpastian wajib ditulis. Komputasi memakai **energi** dan
**uang**. Dasar perkiraan: energi = daya x waktu x pengali pendingin pusat data
(PUE). Diketahui dari sumber yang dibuka: Strubell dkk. (2019) memperkirakan
biaya finansial dan lingkungan melatih model bahasa dan mengajukan rekomendasi
menguranginya; IEA (2025) melaporkan pusat data memakai sekitar 415 TWh listrik
pada 2024 (sekitar 1,5% listrik dunia), diproyeksikan sekitar 945 TWh pada 2030
dengan AI sebagai pendorong terpenting. **Tidak** diketahui: energi per tugas
pemrograman; energi per perintah ke asisten AI bervariasi puluhan kali lipat
menurut model dan cara ukur (silabus 6.4 `[belum terverifikasi]`). Jawaban
jujur adalah **rentang** dengan masukan yang disebut. Praktik: pilih alat sesuai
kebutuhan; jalankan uji **sebelum** meminta pembangkitan ulang.

### Prediksi dulu

Energi pelatihan 100 jam pada 300 sampai 700 W dengan PUE 1,1 sampai 1,6, dan
1000 perintah pada 0,3 sampai 15 Wh per perintah (isian contoh): berapa
rentang tiap perkiraan, dan berapa kali lipat lebarnya?

### Contoh terselesaikan

```python
def energi_kwh(daya_watt, jam, pue):
    return daya_watt * jam * pue / 1000.0


def rentang(rendah, tinggi):
    return f"{rendah:.1f} sampai {tinggi:.1f} kWh (faktor {tinggi / rendah:.1f})"


# SEMUA masukan di bawah ISIAN CONTOH, bukan fakta perangkat atau layanan tertentu.
print("pelatihan 100 jam:", rentang(energi_kwh(300, 100, 1.1), energi_kwh(700, 100, 1.6)))
rendah, tinggi = 1000 * 0.3 / 1000, 1000 * 15 / 1000  # 0,3 sampai 15 Wh per perintah
print("1000 perintah:", rentang(rendah, tinggi))
print("diulang 5 kali:", rentang(5 * rendah, 5 * tinggi))
# keluaran:
# pelatihan 100 jam: 33.0 sampai 112.0 kWh (faktor 3.4)
# 1000 perintah: 0.3 sampai 15.0 kWh (faktor 50.0)
# diulang 5 kali: 1.5 sampai 75.0 kWh (faktor 50.0)
```

Pelatihan 33,0 sampai 112,0 kWh (faktor 3,4); 1000 perintah 0,3 sampai 15,0
kWh (faktor 50); diulang lima kali, rentang ikut dikali lima. **Ketidakpastian
dilaporkan, bukan disembunyikan**: tulis rentang dan sumber tiap masukan.
Mengulang pembangkitan tanpa menjalankan uji melipatgandakan biaya; satu uji
yang gagal lebih murah daripada lima percobaan.

### Contoh setengah jadi

```text setengah-jadi
// energi_kwh(400, 10, 1.2) = ___ kWh ; bila PUE sebenarnya 1.6, selisihnya ___ %
// laporan jujur: "perkiraan ___ sampai ___ kWh, dengan asumsi ___"
```

### Latihan

1. **Ubah:** rentang daya pelatihan menjadi 200 sampai 900 W; prediksi faktornya.
2. **Buat:** fungsi yang menerima daftar `(daya, jam, pue)` dan mencetak rentang
   total beserta asumsinya.
3. **Jelaskan:** mengapa satu angka tunggal "energi AI" patut dicurigai?
4. **Berpasangan:** satu orang menulis perkiraan biaya satu tugas, satunya
   mencari asumsi yang paling rapuh.

## Latihan bercampur

Soal berikut **tidak menyebut** topiknya. Contoh: "Model benar 99% tetapi tak
menangkap satu pun kasus langka"; "Galat latih turun terus, galat uji naik".
Kuis kumulatif
(pertemuan 3, 7, 11, 14) berbentuk sama.

## Ulang berjarak

Kerjakan ulang tanpa melihat solusi lama:

- satu minggu setelah bagian: tulis ulang A\*, turun gradien, atau propagasi
  balik XOR dari ingatan;
- awal bagian baru: dua soal dari bagian sebelumnya;
- semester berikutnya, jawab tanpa catatan (dipakai `KUL-I-307`, `KUL-I-305`,
  `KUL-I-401`): mengapa akurasi 95% dapat menyesatkan pada kejadian langka; apa
  itu kebocoran data; dua ukuran kesetaraan yang tak dapat dipenuhi sekaligus;
  dua cara mengurangi biaya komputasi dari pemakaian AI di proyek tim.

## Kebijakan AI dan log pemakaian

Silabus bagian 6.3 **belum menyatakan** tingkat AI mata kuliah ini. Modul
memakai usulan baku `[asumsi]` (Q2 rancangan): **Kuning** untuk tugas
mengimplementasikan algoritma, **Hijau** untuk proyek dan eksplorasi (dengan
log), **Merah** untuk ujian dan praktik; dosen menetapkan per tugas. Pada
Kuning AI boleh menjelaskan konsep, **tidak** boleh menghasilkan solusi yang
diserahkan, dan hanya sesudah gerbang kesiapan: kamu dapat (1) menelusuri
program pendek, (2) menulis satu uji yang gagal bila kode salah, (3)
menjelaskan kode dengan kata sendiri. Log di repositorimu: alat dan versi,
tujuan, perintah, bagian keluaran yang dipakai. Jangan memasukkan data pribadi,
kata sandi, atau kunci ke layanan AI.

**Butir khas: tata kelola dan biaya komputasi.** AI di sini juga **subjek**:
untuk model yang kamu bangun, tulis kartu singkat (data, tujuan, batas, metrik
per kelompok, perkiraan biaya berentang). Sebagai **alat**, pilih alat sesuai
kebutuhan, jangan mengulang pembangkitan tanpa menjalankan uji, dan catat
jumlah percobaan di log. Keputusan yang berdampak pada orang tidak diserahkan
pada keluaran model tanpa tinjauan manusia. Dosen dapat mewawancarai kodemu.

## Kesalahan umum

- **Menilai model pada data latih**, atau kebocoran data (menormalkan memakai
  seluruh data).
- **Memakai akurasi pada kelas tak seimbang**, atau mengabaikan frekuensi dasar.
- **Melaporkan hanya metrik keseluruhan**, tanpa tiap kelompok.
- **Heuristik A\* yang melebihi biaya nyata** lalu mengklaim jalur terpendek.
- **Melaporkan satu angka energi** tanpa rentang dan asumsi.

## Cek mandiri

Tutup modul, jawab, baru periksa.

1. Syarat `h` agar A\* menjamin jalur terpendek?
2. Mengapa laju belajar terlalu besar dapat membuat turun gradien gagal?
3. Presisi dan recall bila `TP = 6, FP = 2, FN = 4`?
4. Mengapa galat latih kecil bukan bukti model baik?
5. Mengapa akurasi keseluruhan dapat menyembunyikan bias?
6. Apa yang dilaporkan bila angka energi tidak pasti?

Daftar periksa (kosong; kamu isi sendiri, tidak dikumpulkan):

- [ ] Aku dapat menjelaskan A\* dan melatih lalu menguji model pada data uji.
- [ ] Aku dapat memeriksa metrik per kelompok.
- [ ] Aku dapat menulis perkiraan biaya dengan rentang dan asumsi.

## Kunci dan petunjuk

- **Ingat kembali:** BFS memperluas menurut jarak, jadi yang pertama
  mencapai tujuan memakai langkah paling sedikit; memorinya menyimpan seluruh
  batas pencarian. Diverifikasi cepat: memeriksa solusi berwaktu polinom;
  dipecahkan cepat: menemukannya berwaktu polinom; contoh jumlah subset
  (diverifikasi cepat, belum diketahui dipecahkan cepat).
- **Setengah jadi:** bagian 1: 8; 8; ya; hasil dapat tak optimal. Bagian 2:
  `0.02`, `0.02`, `e`; laju 2.0 membuat parameter menyimpang. Bagian 3: 0,94;
  0,75; 0,6; 0,9 dan 0. Bagian 4: `h**2`; `dz2`; `dz1`. Bagian 5: data lampau
  memuat bias perekrutan, atribut proksi; metrik per kelompok, uji coba dengan
  manusia; manusia bertanggung jawab. Bagian 6: 4,8; 33,3%; isi sesuai
  masukanmu.
- **Cek mandiri:** (3) presisi 0,75, recall 0,6.
- **Petunjuk bertahap:** (1) gambar data dan garis atau rute; (2) hitung satu
  langkah dengan tangan; (3) bandingkan dengan program pada langkah itu.

## Langkah berikutnya

`KUL-I-307` memakai pustaka dan alur data untuk model terapan; `KUL-I-305`
etika dan tata kelola AI; `KUL-I-401` kebijakan AI dan biaya pada proyek tim.

## Catatan untuk dosen

Bobot dan bentuk asesmen berikut **usulan**; prodi menetapkan (silabus 6.1,
6.2): praktikum per bagian, kuis kumulatif, wawancara kode, proyek model kecil
dengan kartu model, ujian tertulis dan praktik tanpa AI. Variasi tugas per
mahasiswa: grid, data sintetis, fitur, kelompok. Statistik adalah prasyarat
dari prodi; bila belum diajarkan, sisipkan rata-rata, simpangan baku, dan
peluang bersyarat. Angka energi adalah isian contoh; silabus menyatakannya tak
pasti dan tak ada angka terverifikasi per tugas pemrograman. NumPy dipakai
untuk aljabar; algoritma ditulis sendiri agar isinya terlihat.
