## Untuk siapa modul ini

Modul ini untuk murid kelas XI jalur E (komputasi kuantum), minggu `E-XI2-M8` silabus v1.4: pengayaan permainan CHSH, yaitu membandingkan strategi klasik dan kuantum secara simulasi. Prasyarat: modul `e-xi1-m14` (inti semester XI1); modul `e-xi2-m2`, `e-xi2-m3`, dan `e-xi2-m7` sebaiknya sudah kamu kerjakan. Alat: kertas, kalkulator, dan Python 3 murni opsional (tanpa akun); hitungan tangan lebih dulu.

Modul ini berstatus DRAF: karangan penyusun, belum ditinjau pemilik. Jalur E adalah pengayaan di luar rumusan CP; minggu ini pengayaan murni, jadi modul ini tidak dihitung memenuhi butir CP mana pun.

Aturan AI jalur ini: AI generatif boleh dipakai dengan etika dan dicatat, tanpa data pribadi, kata sandi, atau tugas bernilai pada permintaanmu, dan tanpa akun wajib. Saran: jawab dulu sendiri, baru minta petunjuk bertahap; kode buatan AI kamu baca, jalankan, dan uji. Setiap soal `Latihan` bertanda `AI: boleh` atau `AI: tanpa AI`.

Catatan untuk guru: aturan permainan CHSH, batas 3/4 bagi semua strategi klasik (juga yang memakai keacakan bersama), dan strategi kuantum dengan satu pasangan terjerat beserta peluang menangnya `(2 + akar2)/4` dibaca penyusun dari halaman IBM Quantum Learning "CHSH game", per 2026-11-19. Program di modul ini menghitung ulang angka itu dengan matriks real. Simulasi di komputer klasik hanya mengikuti model matematika, bukan bukti perilaku alam; eksperimen nyata tidak dibahas dan klaim tentangnya `[belum terverifikasi]`.

## Ingat kembali

Jawab dari ingatan, baru cek di bagian kunci.

1. Mengapa teleportasi tidak melanggar batas kecepatan cahaya? (dari `e-xi2-m7`)
2. Apa hasil rotasi Ry(theta) pada `|0>`, dan berapa peluang membaca 1? (dari `e-xi2-m5`)
3. Mengapa korelasi "selalu sama" pada pembacaan 0/1 belum membuktikan keanehan kuantum, bila dua bit acak yang dibagi dapat meniru korelasi itu? (dari `e-xi2-m3`)
4. Bagaimana memeriksa bahwa vektor dua qubit tidak dapat difaktorkan? Beri contoh angka. (dari `e-xi2-m2`)

## Tujuan

Setelah modul ini kamu dapat:

- menelusuri semua strategi klasik pasti pada permainan CHSH dan menyebut kemenangan terbaiknya;
- menghitung dan menyimulasikan peluang menang strategi kuantum dengan keadaan Bell dan arah baca yang diputar;
- menjelaskan mengapa selisih itu bukan alat komunikasi dan apa batas simulasinya.

## Prediksi dulu

Tebak dan tulis: (1) peluang menang terbaik dua pemain klasik yang tidak boleh berbicara; (2) apakah satu pasang qubit terjerat dapat membuat mereka menang 100 persen; (3) apakah peluang jawaban Alice berubah bila pertanyaan Bob diganti.

## Contoh terselesaikan

**Aturan.** Wasit memilih dua bit pertanyaan acak: `x` untuk Alice dan `y` untuk Bob. Keempat pasangan berpeluang sama, 1/4. Alice menjawab satu bit `a`, Bob satu bit `b`, tanpa berbicara. Mereka menang bila `a XOR b = x AND y`: jawaban sama, kecuali bila kedua pertanyaan 1, saat jawaban harus berbeda (`matkom-logika-proposisi`).

**Strategi klasik.** Pada strategi pasti, `a` ditentukan oleh `x` saja dan `b` oleh `y` saja: ada 16 strategi. Andaikan sebuah strategi menang di `(0,0)`, `(0,1)`, dan `(1,0)`. Maka `a(0) = b(0)`, `a(0) = b(1)`, dan `a(1) = b(0)`, jadi keempat nilai itu sama, dan strategi itu kalah di `(1,1)` yang menuntut jawaban berbeda. Program menghitung 8 strategi yang menang di satu pasangan dan 8 yang menang di tiga, tidak ada yang menang di keempatnya: terbaik 3/4. Strategi acak, termasuk acak bersama, hanyalah pilihan acak di antara strategi pasti, dan rata-rata tidak melebihi maksimumnya (penalaran halaman IBM).

```python
from itertools import product


def menang(x, y, a, b):
    """CHSH: menang bila a XOR b sama dengan x AND y."""
    return (a ^ b) == (x & y)


daftar = []
for a0, a1, b0, b1 in product((0, 1), repeat=4):
    a = {0: a0, 1: a1}  # jawaban Alice untuk pertanyaan x
    b = {0: b0, 1: b1}  # jawaban Bob untuk pertanyaan y
    n = sum(menang(x, y, a[x], b[y]) for x, y in product((0, 1), repeat=2))
    daftar.append(((a0, a1, b0, b1), n))

print("jumlah strategi deterministik:", len(daftar))
for n in range(5):
    print(f"  menang di {n} dari 4 pasangan pertanyaan: {sum(1 for _, k in daftar if k == n)} strategi")
terbaik = max(k for _, k in daftar)
print("terbaik:", terbaik, "dari 4 =", terbaik / 4)
print("contoh strategi terbaik (a(0), a(1), b(0), b(1)):", [s for s, k in daftar if k == terbaik][0])
```

Keluaran asli (dijalankan penyusun dengan `python3 -I`, Python 3.12):

```text
jumlah strategi deterministik: 16
  menang di 0 dari 4 pasangan pertanyaan: 0 strategi
  menang di 1 dari 4 pasangan pertanyaan: 8 strategi
  menang di 2 dari 4 pasangan pertanyaan: 0 strategi
  menang di 3 dari 4 pasangan pertanyaan: 8 strategi
  menang di 4 dari 4 pasangan pertanyaan: 0 strategi
terbaik: 3 dari 4 = 0.75
contoh strategi terbaik (a(0), a(1), b(0), b(1)): (0, 0, 0, 0)
```

**Strategi kuantum.** Sebelum permainan, Alice dan Bob berbagi keadaan Bell `(h, 0, 0, h)`, Alice memegang qubit pertama dan Bob qubit kedua. Tiap pemain memutar qubitnya dengan matriks real `U(t) = [[cos t, sin t], [-sin t, cos t]]`, lalu membacanya; hasil bacaan adalah jawabannya. Sudut bergantung pada pertanyaan: Alice memakai `0` bila `x = 0` dan `pi/4` bila `x = 1`; Bob memakai `pi/8` bila `y = 0` dan `-pi/8` bila `y = 1`. Program menghitung peluang tiap pasangan jawaban. Pada keempat pasangan pertanyaan peluang menangnya sama, `cos²(pi/8)` atau `(2 + akar2)/4`, kira-kira 0,8536. Peluang dua jawaban sama setelah rotasi `s` dan `t` ternyata `cos²(s - t)` (program memeriksanya). Di `(1,1)` selisih sudutnya `3pi/8` dan menang berarti jawaban berbeda: `1 - cos²(3pi/8) = cos²(pi/8)`.

**Bukan alat komunikasi.** Kolom terakhir keluaran memperlihatkan `P(a = 0) = 0,5` untuk setiap `(x, y)`. Jawaban Alice acak 50:50 apa pun pertanyaan Bob, jadi Bob tidak dapat menitipkan pesan lewat pertanyaannya (`e-xi2-m3`); selisih baru terlihat setelah wasit membandingkan jawaban.

**Menjawab teka-teki `e-xi2-m3`.** Dua amplop berisi bit acak yang sama dapat meniru "selalu sama" pada pembacaan 0/1. Di permainan ini jawaban harus bergantung pada pertanyaan yang tidak diketahui pasangannya: strategi klasik mentok di 3/4, modelnya memberi 0,8536.

```python
import random
from math import cos, pi, sin, sqrt

h = 1 / sqrt(2)


def U(t):
    """Putar arah baca sebesar t: matriks real [[cos, sin], [-sin, cos]]."""
    return [[cos(t), sin(t)], [-sin(t), cos(t)]]


def tensor(a, b):
    """Hasil kali tensor dua matriks 2 x 2 menjadi matriks 4 x 4."""
    return [[a[i // 2][j // 2] * b[i % 2][j % 2] for j in range(4)] for i in range(4)]


def kali(m, v):
    return [sum(m[i][j] * v[j] for j in range(len(v))) for i in range(len(m))]


bell = [h, 0, 0, h]
alice = {0: 0.0, 1: pi / 4}       # arah baca Alice untuk x = 0 dan x = 1
bob = {0: pi / 8, 1: -pi / 8}     # arah baca Bob untuk y = 0 dan y = 1

semua = {}
total = 0.0
for x in (0, 1):
    for y in (0, 1):
        v = kali(tensor(U(alice[x]), U(bob[y])), bell)
        p = [c * c for c in v]            # peluang 00, 01, 10, 11
        semua[(x, y)] = p
        # menang bila a XOR b = x AND y; indeks i = 2 a + b
        pm = sum(p[i] for i in range(4) if ((i >> 1) ^ (i & 1)) == (x & y))
        total += pm / 4
        print(f"x={x} y={y}: peluang 00,01,10,11 = {[round(q, 4) for q in p]}, "
              f"menang {pm:.4f}, P(a=0) = {p[0] + p[1]:.4f}")
print(f"rata-rata menang: {total:.4f}; cos^2(pi/8) = {cos(pi / 8) ** 2:.4f}")

# Simulasi 10000 putaran: jawaban diambil dari peluang di atas (model, bukan perangkat nyata).
rng = random.Random(2026)
putaran = 10000
menangs = 0
for _ in range(putaran):
    x, y = rng.randint(0, 1), rng.randint(0, 1)
    r, kum, hasil = rng.random(), 0.0, 3
    for i, q in enumerate(semua[(x, y)]):
        kum += q
        if r < kum:
            hasil = i
            break
    menangs += ((hasil >> 1) ^ (hasil & 1)) == (x & y)
sigma = sqrt(putaran * total * (1 - total))
print(f"{putaran} putaran: menang {menangs}, harapan {putaran * total:.0f}, simpangan wajar {sigma:.1f}")
```

Keluaran asli (dijalankan penyusun dengan `python3 -I`, Python 3.12):

```text
x=0 y=0: peluang 00,01,10,11 = [0.4268, 0.0732, 0.0732, 0.4268], menang 0.8536, P(a=0) = 0.5000
x=0 y=1: peluang 00,01,10,11 = [0.4268, 0.0732, 0.0732, 0.4268], menang 0.8536, P(a=0) = 0.5000
x=1 y=0: peluang 00,01,10,11 = [0.4268, 0.0732, 0.0732, 0.4268], menang 0.8536, P(a=0) = 0.5000
x=1 y=1: peluang 00,01,10,11 = [0.0732, 0.4268, 0.4268, 0.0732], menang 0.8536, P(a=0) = 0.5000
rata-rata menang: 0.8536; cos^2(pi/8) = 0.8536
10000 putaran: menang 8558, harapan 8536, simpangan wajar 35.4
```

Bacaan hasilnya: 8558 selisih 22 dari harapan, kira-kira 0,6 simpangan: wajar. Batasnya: program mengambil jawaban dari peluang yang ia hitung sendiri, jadi ia menguji aritmetika model, bukan perilaku alam atau perangkat nyata.

## Contoh setengah jadi

Lengkapi (kunci di bagian akhir).

1. Pertanyaan `(1, 1)`, jawaban `a = 1` dan `b = 0`: `a XOR b` = ____, `x AND y` = ____, jadi mereka ____ (menang atau kalah).
2. Untuk selisih sudut `pi/8`: `cos²(pi/8) = (1 + cos(pi/4))/2` = ____ (empat desimal).
3. Lengkapi fungsi berikut:

```python setengah-jadi
def menang(x, y, a, b):
    return (a ____ b) == (x ____ y)


def peluang_menang(p, x, y):
    """p = [P(00), P(01), P(10), P(11)], indeks i = 2a + b."""
    target = x & y
    return sum(p[i] for i in range(4) if ((i >> 1) ____ (i & 1)) == target)
```

## Soal Parsons

Susun baris-baris di bawah (sudah diacak) menjadi perhitungan rata-rata menang. Penjorokan sengaja dihilangkan.

```text
(a) print(total)
(b) for y in (0, 1):
(c) total = 0
(d) for x in (0, 1):
(e) total += peluang_menang(semua[(x, y)], x, y) / 4
```

## Latihan

1. **Dengan tangan.** (`AI: tanpa AI`) Strategi pasti `a(0) = 0`, `a(1) = 1`, `b(0) = 0`, `b(1) = 0`. Di pasangan pertanyaan mana ia menang, dan berapa dari 4?
2. **Selisih sudut.** (`AI: tanpa AI`) Pada keadaan Bell, peluang dua jawaban sama adalah `cos²(d)` untuk selisih sudut `d`. Hitung untuk `d` = 0, `pi/8`, `pi/4`, dan `pi/2`.
3. **Ganti sudut.** (`AI: boleh`) Prediksi dulu, lalu jalankan: Alice memakai `0` dan `pi/4`, Bob memakai `0` dan `0`. Berapa rata-rata menang? Apakah melampaui 3/4?
4. **Rancang dulu.** (`AI: boleh`) Tulis pseudocode satu putaran: wasit memilih `x` dan `y`, pemain menjawab dari peluang, wasit memutuskan.
5. **Catatan pemakaian AI (opsional).** Bila memakai asisten AI, catat alat, tujuan, garis besar perintah, bagian yang dipakai, dan cara memeriksanya.

## Latihan bercampur

1. Keadaan Bell `(h, 0, 0, h)` dibaca langsung. Berapa peluang dua hasil sama, dan pada 1000 shot berapa harapan hasil `00` serta simpangan wajarnya? (`e-xi2-m3`, `e-xi1-m7`)
2. Simulasi 10000 putaran strategi kuantum di atas melaporkan 8650 kemenangan. Berapa simpangannya dari harapan, dan apa yang kamu periksa lebih dulu? (`e-xi1-m7`)
3. Apakah `U(t)` reversibel? Tulis kebalikannya. (`e-xi2-m6`)

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `e-xi2-m9` (satu minggu lagi), `e-xi2-m11` (sekitar tiga minggu lagi), dan `e-xii1-m2` (sekitar delapan minggu lagi). Jawab sekarang lalu simpan.

1. Mengapa keterjeratan tidak dapat dipakai pemain CHSH untuk saling mengirim pesan?
2. Berapa peluang menang terbaik strategi klasik pada permainan CHSH, dan berapa pada strategi kuantum dalam simulasi?
3. Pada keadaan Bell, berapa peluang dua hasil sama bila arah baca kedua qubit berselisih sudut pi/8?

## Kesalahan umum

- **"Keterjeratan membuat Alice dapat mengirim pesan kepada Bob di permainan ini."** Peluang jawaban Alice tetap 50:50 apa pun pertanyaan Bob.
- **"Strategi kuantum selalu menang."** Pada model, peluang menangnya sekitar 0,8536, bukan 1.
- **"Strategi klasik dengan keacakan bersama dapat melampaui 3/4."** Tidak: strategi acak hanyalah pilihan acak di antara strategi pasti.
- **"Simulasi ini membuktikan alam bekerja demikian."** Program mengikuti model matematika di komputer klasik; perilaku alam memerlukan percobaan nyata, yang tidak dibahas di sini.

## Cek mandiri

- [ ] Saya dapat menyebut aturan menang CHSH dan menunjukkan mengapa strategi pasti paling banyak menang 3/4.
- [ ] Saya dapat menghitung peluang menang strategi kuantum di satu pasangan pertanyaan.
- [ ] Saya dapat menjelaskan mengapa permainan ini bukan alat komunikasi.
- [ ] Saya dapat menyebut batas simulasi di komputer klasik.
- [ ] Saya mencatat pemakaian AI bila saya memakainya.

## Kunci dan petunjuk

**Ingat kembali.** 1: Bob memerlukan dua bit klasik dari Alice untuk memilih koreksi; sebelum itu pembacaannya 50:50 tidak bergantung pada keadaan yang dikirim. 2: `Ry(theta) |0> = (cos(theta/2), sin(theta/2))`, jadi peluang membaca 1 adalah `sin²(theta/2)`. 3: dua bit acak yang dibagi (misalnya salinan satu koin di dua amplop) juga memberi "selalu sama" pada pembacaan 0/1; pembedanya ada pada pembacaan dengan arah lain, yaitu bahan modul ini. 4: untuk `(a, b, c, d)` hitung `a*d` dan `b*c`; bila tidak sama vektor tidak dapat difaktorkan; contoh `(h, 0, 0, h)`: `a*d` = 0,5 dan `b*c` = 0.

**Prediksi dulu.** (1) 3/4 menurut halaman IBM dan perhitungan program; (2) tidak pada model ini: peluang menang terbaiknya sekitar 0,8536; (3) tidak: `P(a = 0)` selalu 0,5.

**Contoh setengah jadi.** 1: `1 XOR 0` = 1 dan `1 AND 1` = 1, jadi menang. 2: `(1 + 0,7071)/2` = 0,8536. 3: `^` untuk XOR dan `&` untuk AND pada `menang`; pada `peluang_menang` operatornya `^`. Kunci ini dikompilasi dan dijalankan penyusun.

**Soal Parsons.** c, d, b, e, a.

**Latihan.** 1: di `(0,0)`, `(0,1)`, dan `(1,1)` menang (masing-masing `a XOR b` sama dengan `x AND y`); di `(1,0)` kalah karena `a(1) XOR b(0) = 1` sedangkan `x AND y = 0`; jadi 3 dari 4. 2: `cos²(0)` = 1; `cos²(pi/8)` = 0,8536; `cos²(pi/4)` = 0,5; `cos²(pi/2)` = 0. 3: untuk `x = 0` selisih sudut 0 sehingga jawaban selalu sama dan menang di `(0,0)` dan `(0,1)`; untuk `x = 1` selisih `pi/4` memberi peluang sama 0,5, jadi menang 0,5 di `(1,0)` dan di `(1,1)` (menang berarti berbeda, juga 0,5); rata-rata `(1 + 1 + 0,5 + 0,5)/4` = 0,75, tidak melampaui 3/4 (keluaran program 0,75). 4: contoh: `x dan y = dua bit acak; ambil satu hasil dua bit (a, b) dengan peluang p[(x, y)]; menang bila a XOR b = x AND y`. 5: opsional.

**Latihan bercampur.** 1: peluang sama = 1 (hanya `00` dan `11`); harapan 500; simpangan akar(1000 x 0,5 x 0,5) = 15,8. 2: harapan 8536, simpangan 35,4; selisih 114, kira-kira 3,2 simpangan: sangat jarang; curigai kode (sudut, aturan menang) sebelum curiga alam. 3: reversibel; `U(t)` adalah rotasi, kebalikannya transposnya, `U(-t)`.

**Ulang berjarak.** 1: peluang jawaban satu pihak 50:50 apa pun pertanyaan pihak lain, sehingga tidak ada pesan yang lewat; selisih hanya tampak setelah membandingkan jawaban. 2: klasik paling banyak 3/4; kuantum dalam simulasi `cos²(pi/8)`, kira-kira 0,8536. 3: `cos²(pi/8)`, kira-kira 0,8536.

## Langkah berikutnya

Modul berikut: `e-xi2-m9` (pengayaan: distribusi kunci, konsep): ide protokol BB84 pada simulasi. Bacaan pendamping: `e-xi2-m3` (mengukur qubit terjerat).
