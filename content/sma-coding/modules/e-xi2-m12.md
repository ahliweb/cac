## Untuk siapa modul ini

Modul ini untuk murid kelas XI jalur E (komputasi kuantum), minggu `E-XI2-M12` silabus v1.4: algoritma Deutsch-Jozsa, yaitu menjelaskan dan menyimulasikannya pada tiga qubit. Prasyarat: modul `e-xi2-m11` (algoritma Deutsch). Di luar indeks, bagian kode memerlukan simulator `e-xi2-m4` (n qubit) dan dasar pemrograman setara `A-X1-M9..M12` atau `B-X1-M9..M12`; guru memeriksanya. Bagian konsep dan hitungan terbuka bagi semua murid. Alat: kertas, kalkulator, dan Python 3 murni (tanpa akun).

Modul ini berstatus DRAF: karangan penyusun, belum ditinjau pemilik. Jalur E adalah pengayaan di luar rumusan CP. Irisan pengayaan minggu ini `F-BK-b` (membandingkan beberapa strategi) tidak dihitung; modul ini tidak dihitung memenuhi butir CP mana pun.

Aturan AI jalur ini: AI generatif boleh dipakai dengan etika dan dicatat, tanpa data pribadi, kata sandi, atau tugas bernilai pada permintaanmu, dan tanpa akun wajib. Saran: jawab dulu sendiri, baru minta petunjuk bertahap; kode buatan AI kamu baca, jalankan, dan uji. Setiap soal `Latihan` bertanda `AI: boleh` atau `AI: tanpa AI`.

Catatan untuk guru: masalah Deutsch-Jozsa dengan janji "konstan atau seimbang", aturan baca (semua qubit query 0 berarti konstan, selain itu seimbang), batas `2^(n-1) + 1` query bagi algoritma klasik pasti benar, dan bahwa algoritma klasik acak dengan `k` masukan acak salah paling banyak dengan peluang `2^(1-k)` sehingga keunggulan kuantumnya "cukup sederhana" dibaca penyusun dari halaman IBM Quantum Learning "Deutsch-Jozsa algorithm", per 2026-11-19. Amplitudo dan peluang dihitung ulang program di bawah. Tidak ada klaim tentang perangkat nyata.

## Ingat kembali

Jawab dari ingatan, baru cek di bagian kunci.

1. Pada algoritma Deutsch, mengapa qubit bantu dimulai dari |1> lalu diberi H, dan apa keadaan qubit pertama sesudah oracle? (dari `e-xi2-m11`)
2. Mengapa penyadap yang membaca lalu mengirim ulang pada basis acak menimbulkan kesalahan sekitar 25 persen pada kunci tersaring? (dari `e-xi2-m9`)
3. Berapa memori kira-kira untuk menyimpan vektor 30 qubit bila tiap amplitudo 8 byte? (dari `e-xi2-m4`)

## Tujuan

Setelah modul ini kamu dapat:

- menelusuri Deutsch-Jozsa pada tiga qubit query dan satu qubit bantu, lalu menafsirkan hasil bacaan;
- membuat oracle konstan dan seimbang sebagai tabel delapan nilai dan menyimulasikannya;
- membandingkan satu pemasangan oracle dengan query klasik pasti benar dan acak, beserta batasnya.

## Prediksi dulu

Tebak dan tulis: (1) peluang membaca `000` pada qubit query untuk `f` konstan dan untuk `f` seimbang; (2) apa yang terjadi bila `f` melanggar janji, misalnya hanya satu nilai 1 dari delapan; (3) berapa query klasik terburuk untuk n = 3.

## Contoh terselesaikan

**Masalah.** `f` dari n bit ke 1 bit dengan janji: konstan atau seimbang (`e-xi2-m10`). Sirkuit: n qubit query dari `|0...0>` dan satu qubit bantu dari `|1>`; H pada semua qubit; satu pemasangan oracle; H pada n qubit query; baca. Semua n hasil 0 berarti konstan; ada satu saja yang 1 berarti seimbang.

**Mengapa berhasil.** Seperti `e-xi2-m11`: qubit bantu `|->` membuat oracle memberi tanda `(-1)^f(x)` pada tiap `|x>`, sehingga qubit query menjadi `(1/akar N)` kali jumlah `(-1)^f(x) |x>` dengan `N = 2^n`. H pada semua qubit query menjadikan amplitudo `|0...0>` sama dengan `(1/N)` kali jumlah `(-1)^f(x)`. Bila `f` konstan, jumlahnya `+N` atau `-N`, amplitudo `+1` atau `-1`, peluang 1. Bila seimbang, separuh `+1` dan separuh `-1`, jumlahnya 0, peluang `000` adalah 0. Bila janji dilanggar, hasilnya di antara: untuk satu nilai 1 dari delapan, `(7 - 1)/8 = 0,75`, peluang `0,5625`, tidak dapat disimpulkan. Itulah gunanya janji.

```python
from itertools import combinations
from math import sqrt

h = 1 / sqrt(2)
H = [[h, h], [h, -h]]
n = 3          # qubit query: 0, 1, 2 (kiri); qubit bantu: nomor 3 (paling kanan)
N = n + 1


def gerbang_satu(v, g, k):
    """Gerbang 2 x 2 pada qubit ke-k (0 = paling kiri), di tempat."""
    geser = N - 1 - k
    for i in range(len(v)):
        if (i >> geser) & 1 == 0:
            j = i | (1 << geser)
            a, b = v[i], v[j]
            v[i] = g[0][0] * a + g[0][1] * b
            v[j] = g[1][0] * a + g[1][1] * b


def pasang_oracle(v, f):
    """|x, y> menjadi |x, y XOR f(x)>; f adalah tuple 2^n nilai, x = n bit kiri."""
    baru = [0.0] * len(v)
    for i, amp in enumerate(v):
        x, y = i >> 1, i & 1
        baru[(x << 1) | (y ^ f[x])] = amp
    return baru


def deutsch_jozsa(f):
    """Kembalikan peluang n qubit query terbaca 000."""
    v = [0.0] * (2 ** N)
    v[1] = 1.0                               # |000>|1>
    for k in range(N):
        gerbang_satu(v, H, k)
    v = pasang_oracle(v, f)                  # satu pemasangan oracle
    for k in range(n):
        gerbang_satu(v, H, k)
    return v[0] ** 2 + v[1] ** 2             # query 000, qubit bantu 0 atau 1


konstan_0 = (0,) * 8
konstan_1 = (1,) * 8
bit_pertama = tuple((x >> 2) & 1 for x in range(8))          # f(x) = bit paling kiri dari x
paritas = tuple(bin(x).count("1") % 2 for x in range(8))     # f(x) = XOR semua bit x
satu_saja = (1, 0, 0, 0, 0, 0, 0, 0)                         # bukan konstan, bukan seimbang

for nama, f in (("konstan 0", konstan_0), ("konstan 1", konstan_1),
                ("bit pertama", bit_pertama), ("paritas", paritas), ("satu saja (melanggar janji)", satu_saja)):
    print(f"{nama:28s} f = {''.join(map(str, f))}  P(000) = {deutsch_jozsa(f):.4f}")

# Semua 2 + 70 = 72 fungsi yang memenuhi janji.
janji = [konstan_0, konstan_1]
for empat in combinations(range(8), 4):
    janji.append(tuple(1 if x in empat else 0 for x in range(8)))
p_konstan = {round(deutsch_jozsa(f), 6) for f in janji[:2]}
p_seimbang = {round(deutsch_jozsa(f), 6) for f in janji[2:]}
print("fungsi yang memenuhi janji:", len(janji))
print("P(000) untuk yang konstan  :", p_konstan)
print("P(000) untuk yang seimbang :", p_seimbang)

# Pembanding klasik pasti benar lawan klasik acak (k masukan acak bebas).
print("query klasik terburuk 2^(n-1)+1 untuk n = 3, 10, 20:", [2 ** (m - 1) + 1 for m in (3, 10, 20)])
for k in (3, 11):
    print(f"klasik acak, k = {k} query: salah paling banyak {2 ** (1 - k):.6f} (bila seimbang)")
```

Keluaran asli (dijalankan penyusun dengan `python3 -I`, Python 3.12):

```text
konstan 0                    f = 00000000  P(000) = 1.0000
konstan 1                    f = 11111111  P(000) = 1.0000
bit pertama                  f = 00001111  P(000) = 0.0000
paritas                      f = 01101001  P(000) = 0.0000
satu saja (melanggar janji)  f = 10000000  P(000) = 0.5625
fungsi yang memenuhi janji: 72
P(000) untuk yang konstan  : {1.0}
P(000) untuk yang seimbang : {0.0}
query klasik terburuk 2^(n-1)+1 untuk n = 3, 10, 20: [5, 513, 524289]
klasik acak, k = 3 query: salah paling banyak 0.250000 (bila seimbang)
klasik acak, k = 11 query: salah paling banyak 0.000977 (bila seimbang)
```

Bacaan hasilnya: dari 72 fungsi yang memenuhi janji, semua yang konstan memberi `P(000) = 1` dan semua yang seimbang memberi 0, dengan satu pemasangan oracle; fungsi yang melanggar janji memberi 0,5625. Pembanding klasik: algoritma pasti benar perlu 5 query untuk n = 3, 513 untuk n = 10, dan 524289 untuk n = 20. Namun algoritma klasik acak yang bertanya pada `k` masukan acak dan menjawab konstan bila semua sama, salah paling banyak dengan peluang `2^(1-k)`: dengan 11 query kurang dari 0,1 persen. Karena itu keunggulan kuantum di sini cukup sederhana, dan hanya terhadap pemeriksa klasik yang tidak boleh salah sama sekali.

**Batasnya.** Hitungan query adalah model: oracle dianggap sudah tersedia, dan biaya membangunnya tidak dihitung. Simulator kita membangun oracle dengan menelusuri `f` di semua masukan dan memerlukan `2^(n+1)` amplitudo (`e-xi2-m4`), jadi ia tidak memperlihatkan percepatan waktu apa pun. Tidak ada klaim tentang perangkat kuantum nyata.

## Contoh setengah jadi

Lengkapi (kunci di bagian akhir).

1. Untuk n = 3 vektor memiliki ____ komponen (tiga qubit query dan satu qubit bantu). Fungsi `00001111` punya ____ nilai 1, jadi seimbang.
2. `P(000)` untuk seimbang `((4 - 4)/8)²` = ____; untuk konstan `((8 - 0)/8)²` = ____.
3. Lengkapi:

```python setengah-jadi
def deutsch_jozsa(f):
    v = [0.0] * (2 ** N)
    v[____] = 1.0                  # |000>|1>
    for k in range(N):
        gerbang_satu(v, H, k)
    v = pasang_oracle(v, f)
    for k in range(____):          # H hanya pada qubit query
        gerbang_satu(v, H, k)
    return v[0] ** 2 + v[1] ** 2
```

## Soal Parsons

Susun baris-baris di bawah (sudah diacak) menjadi pembuatan daftar fungsi yang memenuhi janji. Penjorokan sengaja dihilangkan.

```text
(a) print(len(janji))
(b) janji.append(tuple(1 if x in empat else 0 for x in range(8)))
(c) janji = [konstan_0, konstan_1]
(d) for empat in combinations(range(8), 4):
```

## Latihan

1. **Dengan tangan.** (`AI: tanpa AI`) Hitung `P(000)` untuk `f = 11110000`, `f = 11111111`, dan `f = 10000000` memakai rumus `((jumlah (-1)^f(x))/8)²`.
2. **Buat oracle.** (`AI: tanpa AI`) Tulis tabel delapan nilai untuk: konstan 1; `f(x)` sama dengan bit terakhir `x`; dan `f(x) = 1` hanya bila dua bit pertama `x` sama dengan 1. Golongkan masing-masing (konstan, seimbang, atau bukan keduanya).
3. **Ubah n.** (`AI: boleh`) Ubah `n` menjadi 2 dan `f` menjadi tuple empat nilai. Prediksi dulu `P(00)` untuk 2 fungsi konstan dan 6 fungsi seimbang, lalu jalankan.
4. **Rancang dulu.** (`AI: boleh`) Tulis pseudocode pemeriksa klasik acak: pilih `k` masukan acak, bertanya, jawab konstan bila semua sama. Berapa peluang ia salah pada fungsi seimbang?
5. **Catatan pemakaian AI (opsional).** Bila memakai asisten AI, catat alat, tujuan, garis besar perintah, bagian yang dipakai, dan cara memeriksanya.

## Latihan bercampur

1. Ada berapa fungsi dari 3 bit ke 1 bit, dan berapa yang seimbang? (`e-xi2-m10`)
2. Pemeriksa klasik acak memakai `k = 5` masukan acak bebas. Berapa peluang ia salah pada fungsi seimbang? (`e-xi1-m2`)
3. Bandingkan `n` dengan `2^(n-1) + 1` untuk n = 5, 10, dan 20. (`matkom-pertumbuhan-fungsi`)

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `e-xi2-m13` (satu minggu lagi), `e-xii1-m1` (sekitar tiga minggu lagi), dan `e-xii1-m6` (sekitar delapan minggu lagi). Jawab sekarang lalu simpan.

1. Apa janji (promise) pada masalah Deutsch-Jozsa, dan apa yang terjadi bila fungsinya bukan konstan maupun seimbang?
2. Pada Deutsch-Jozsa, bila semua n qubit query terbaca 0 apa artinya, dan bila ada satu yang terbaca 1?
3. Mengapa jumlah query klasik terburuk 2^(n-1)+1 tumbuh jauh lebih cepat dari n, dan berapa untuk n = 10?

## Kesalahan umum

- **"Deutsch-Jozsa mencoba semua `2^n` masukan sekaligus lalu memilih jawabannya."** Oracle dipasang sekali; yang terbaca hanya apakah semua tanda sama, bukan nilai `f` di tiap masukan.
- **"Deutsch-Jozsa mengalahkan semua algoritma klasik."** Hanya yang pasti benar; algoritma klasik acak dengan sedikit query hampir selalu benar.
- **"Algoritma ini bekerja untuk setiap fungsi."** Hanya bila janji berlaku; di luar janji hasilnya ambigu (contoh `P(000) = 0,5625`).
- **"Hasil bukan `000` memberi tahu `f` yang mana."** Ia hanya menandakan seimbang.

## Cek mandiri

- [ ] Saya dapat menyebut langkah sirkuit Deutsch-Jozsa dan arti hasil bacaannya.
- [ ] Saya dapat menghitung `P(000)` dari jumlah `(-1)^f(x)`.
- [ ] Saya dapat membuat oracle konstan dan seimbang sebagai tabel.
- [ ] Saya dapat menyebut batas keunggulan terhadap pemeriksa klasik acak.
- [ ] Saya mencatat pemakaian AI bila saya memakainya.

## Kunci dan petunjuk

**Ingat kembali.** 1: qubit bantu `|1>` diberi H menjadi `|->`; `X|-> = -|->`, jadi oracle memberi tanda `(-1)^f(x)` pada qubit query; qubit query menjadi `((-1)^f(0) |0> + (-1)^f(1) |1>)` dibagi akar2. 2: Eve salah basis dengan peluang 1/2 sehingga qubit runtuh ke basis yang salah; Bob dengan basis sama salah dengan peluang 1/2; `1/2 x 1/2 = 1/4`. 3: `2^30 x 8` byte = 8589934592 byte = 8 GiB.

**Prediksi dulu.** (1) 1 untuk konstan dan 0 untuk seimbang; (2) hasilnya di antara dan tidak menentukan (0,5625 pada contoh); (3) 5.

**Contoh setengah jadi.** 1: 16 komponen; 4 nilai 1. 2: 0 dan 1. 3: `1` (komponen `0001` berarti `|000>|1>`); `n` (3). Kunci ini dikompilasi dan dijalankan penyusun.

**Soal Parsons.** c, d, b, a.

**Latihan.** 1: `11110000`: empat -1 dan empat +1, jumlah 0, peluang 0; `11111111`: jumlah -8, `(-8/8)² = 1`; `10000000`: `(7 - 1)/8 = 0,75`, peluang 0,5625. 2: konstan 1 = `11111111` (konstan); bit terakhir = `01010101` (seimbang, empat nilai 1); dua bit pertama 1 = `00000011` (dua nilai 1 dari delapan, bukan keduanya; `P(000)` = `((6 - 2)/8)²` = 0,25 menurut program penyusun). 3: untuk n = 2 ada 2 konstan dan 6 seimbang yang memenuhi janji: `P(00)` = 1 untuk konstan dan 0 untuk seimbang (keluaran penyusun). 4: contoh: `ulangi k kali: x = masukan acak; catat f(x); jika semua nilai sama jawab konstan, jika ada yang beda jawab seimbang`; peluang salah `2^(1-k)`. 5: opsional.

**Latihan bercampur.** 1: `2^8` = 256 fungsi; seimbang `C(8, 4)` = 70. 2: `2^(1-5)` = 1/16 = 0,0625. 3: n = 5, 10, 20 berturut-turut dibanding 17, 513, dan 524289.

**Ulang berjarak.** 1: janji: `f` konstan atau seimbang; di luar janji hasilnya tidak menentukan (mis. satu nilai 1 dari delapan memberi `P(000) = 0,5625`). 2: semua 0 berarti konstan; satu saja 1 berarti seimbang. 3: `2^(n-1) + 1` berlipat dua tiap n bertambah satu (eksponensial), sedangkan n bertambah satu-satu; untuk n = 10 menjadi 513.

## Langkah berikutnya

Modul berikut: `e-xi2-m13` (proyek mini semester 2): menyajikan satu fenomena. Bacaan pendamping: `e-xi2-m10` dan `e-xi2-m11` (oracle dan Deutsch).
