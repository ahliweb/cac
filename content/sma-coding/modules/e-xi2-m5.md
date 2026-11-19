## Untuk siapa modul ini

Modul ini untuk murid kelas XI jalur E (komputasi kuantum), minggu `E-XI2-M5` silabus v1.4: gerbang fase dan rotasi, tanda **pengayaan** pada judul minggunya. Prasyarat: modul `e-xi2-m4` (simulator n qubit). Bilangan kompleks dipakai hanya untuk fase (`e-xi1-m4`): kalikan dengan bilangan yang modulusnya 1 memutar titik tanpa mengubah panjangnya. Alat: kertas, kalkulator, Quirk (tanpa akun), dan Python 3 murni opsional; hitungan tangan lebih dulu.

Modul ini berstatus DRAF: karangan penyusun, belum ditinjau pemilik. Jalur E adalah pengayaan di luar rumusan capaian pembelajaran (CP); minggu ini tidak punya irisan pengayaan, jadi modul ini tidak dihitung memenuhi butir CP mana pun.

Aturan AI jalur ini: AI generatif boleh dipakai dengan etika dan dicatat, tanpa data pribadi, kata sandi, atau tugas bernilai pada permintaanmu, dan tanpa akun wajib. Saran: jawab dulu sendiri, baru minta penjelasan atau petunjuk bertahap. Setiap soal `Latihan` bertanda `AI: boleh` atau `AI: tanpa AI`.

Catatan untuk guru: matriks Pauli (X, Y, Z), H, gerbang fase `P(theta)` beserta `S` (`theta` = pi/2) dan `T` (`theta` = pi/4) dibaca penyusun dari halaman IBM Quantum Learning "Quantum information" (single systems), per 2026-11-19. Matriks rotasi Ry dibaca dari halaman dokumentasi Qiskit untuk `RYGate`. Istilah **fase global** dan **fase relatif** serta pernyataan bahwa fase global tidak teramati tidak ditemukan penyusun dengan kata itu di halaman IBM yang dibuka `[belum terverifikasi]`; keduanya diperlihatkan lewat hitungan di modul ini. Di Quirk, gerbang S dan T tampil dengan nama itu; penyusun melihat bahwa H, T, H pada `|0>` memberi peluang hasil 1 sebesar 14,6 persen pada tampilan kabel. Angka dihitung ulang dengan Python 3.12.

## Ingat kembali

Jawab dari ingatan, baru cek di bagian kunci.

1. Apa beda `(h, 0, 0, h)` dan `(h, 0, 0, -h)`, dan apakah peluang hasilnya berbeda? (dari `e-xi2-m2`)
2. Berapa komponen vektor keadaan n qubit, dan berapa untuk n = 10? (dari `e-xi2-m4`)
3. Saat jumlah shot membesar, apa yang terjadi pada selisih mutlak dan pada selisih relatif terhadap harapan? (dari `e-xi1-m11`)

## Tujuan

Setelah modul ini kamu dapat:

- menuliskan gerbang Y, S, T, dan rotasi Ry sebagai matriks 2 x 2 dan menerapkannya pada vektor satu qubit;
- membedakan fase global dari fase relatif dan menyebut mana yang dapat mengubah peluang;
- menyatakan sebuah gerbang dengan urutan gerbang lain (misalnya `S S = Z` dan `H Z H = X`);
- menentukan sudut Ry yang memberi peluang tertentu.

## Prediksi dulu

Keadaan `(h, h)` diberi gerbang Z, S, atau T. Sebelum membaca contoh, tebak dan tulis: (1) peluang membaca 0 tepat setelah tiap gerbang itu, tanpa gerbang lain; (2) bila H dipasang lagi sebelum dibaca, apakah ketiganya masih sama; urutkan dari peluang 0 terkecil ke terbesar.

## Contoh terselesaikan

**Gerbang fase.** `P(theta)` adalah matriks `[[1, 0], [0, e^(i theta)]]`: komponen `|0>` dibiarkan, komponen `|1>` dikali bilangan yang modulusnya 1, sehingga hanya **fasenya** (arahnya) berubah. Z adalah `theta` = pi (kali minus 1), S adalah `theta` = pi/2 (kali `i`), T adalah `theta` = pi/4 (kali `(1 + i)/akar2`). Y adalah `[[0, -i], [i, 0]]`.

**Fase relatif mengubah peluang, lewat H.** Pada `(h, h)`: Z memberi `(h, -h)`, S memberi `(h, h*i)`, T memberi `(h, 0,5 + 0,5i)`. Ketiganya memberi peluang 0,5 dan 0,5 bila dibaca langsung, karena modulusnya sama. Tetapi bila H dipasang sesudahnya, peluang 0 menjadi 0 (Z), 0,5 (S), dan kira-kira 0,8536 (T). Beda arah antara dua komponen, yaitu **fase relatif**, menentukan apakah dua jalur amplitudo saling menguatkan atau menghapus (interferensi, `e-xi1-m9`).

**Fase global tidak teramati.** Mengalikan seluruh vektor dengan `i` memberi `(ih, ih)`. Beda arah antara kedua komponen tetap nol, dan peluang apa pun sesudah gerbang lain tidak berubah: setelah H tetap `(1, 0)` dalam peluang. Karena itu `Y` dan `X Z` hanya berbeda faktor global `i` (`Y = i X Z`) dan tidak dapat dibedakan dari peluang.

**Gerbang pengganti.** Hasil hitungan di program: `S S = Z`, `T T = S`, `H Z H = X`, `i (X Z) = Y`, dan `X Z` sendiri tidak sama dengan `Y`.

**Rotasi Ry.** `Ry(theta) = [[cos(theta/2), -sin(theta/2)], [sin(theta/2), cos(theta/2)]]`: semua entri real, jadi amplitudonya tetap real. Pada `|0>`: `(cos(theta/2), sin(theta/2))`, sehingga peluang membaca 1 adalah `sin²(theta/2)`. Untuk membuat `(0,6 ; 0,8)`: `theta/2` adalah sudut yang kosinusnya 0,6 dan sinusnya 0,8, yaitu kira-kira 53,13 derajat, jadi `theta` kira-kira 106,26 derajat.

```python
import cmath
from math import atan2, cos, degrees, pi, sin, sqrt

h = 1 / sqrt(2)
X = [[0, 1], [1, 0]]
Y = [[0, -1j], [1j, 0]]
Z = [[1, 0], [0, -1]]
H = [[h, h], [h, -h]]
S = [[1, 0], [0, 1j]]
T = [[1, 0], [0, cmath.exp(1j * pi / 4)]]


def kali(m, v):
    return [sum(a * b for a, b in zip(baris, v)) for baris in m]


def kali_matriks(a, b):
    return [[sum(a[i][k] * b[k][j] for k in range(2)) for j in range(2)] for i in range(2)]


def sama(a, b):
    return all(abs(a[i][j] - b[i][j]) < 1e-9 for i in range(2) for j in range(2))


def tulis(v):
    return "(" + ", ".join(f"{z.real:.4f}{z.imag:+.4f}i" for z in v) + ")"


def peluang(v):
    return [abs(z) ** 2 for z in v]


def ry(sudut):
    """Rotasi Ry: matriks real, jadi amplitudo tetap real."""
    c, s = cos(sudut / 2), sin(sudut / 2)
    return [[c, -s], [s, c]]


plus = [h, h]
print("keadaan (h, h):", tulis(plus))
for nama, g in (("Z", Z), ("S", S), ("T", T)):
    sesudah = kali(g, plus)
    lalu_h = kali(H, sesudah)
    print(f"{nama}: {tulis(sesudah)}  peluang {[round(p, 4) for p in peluang(sesudah)]}"
          f"  lalu H: peluang {[round(p, 4) for p in peluang(lalu_h)]}")

# Fase global: mengalikan seluruh vektor dengan i tidak mengubah peluang apa pun.
global_i = [1j * z for z in plus]
print("(h, h) kali i :", tulis(global_i), " lalu H: peluang",
      [round(p, 4) for p in peluang(kali(H, global_i))])
print("(h, h) biasa  :", tulis(plus), " lalu H: peluang",
      [round(p, 4) for p in peluang(kali(H, plus))])

# Gerbang pengganti.
print("S kali S = Z        :", sama(kali_matriks(S, S), Z))
print("T kali T = S        :", sama(kali_matriks(T, T), S))
print("H Z H = X           :", sama(kali_matriks(H, kali_matriks(Z, H)), X))
iXZ = [[1j * z for z in baris] for baris in kali_matriks(X, Z)]
print("i kali (X Z) = Y    :", sama(iXZ, Y))
print("Y dan X Z sama?     :", sama(kali_matriks(X, Z), Y))

# Rotasi Ry membuat keadaan (0,6 ; 0,8) dari |0>.
theta = 2 * atan2(0.8, 0.6)
hasil = kali(ry(theta), [1, 0])
print(f"sudut Ry = {degrees(theta):.2f} derajat -> ({hasil[0].real:.4f}, {hasil[1].real:.4f}),"
      f" P(1) = {abs(hasil[1]) ** 2:.4f}")
```

Keluaran asli (dijalankan penyusun dengan `python3 -I`, Python 3.12):

```text
keadaan (h, h): (0.7071+0.0000i, 0.7071+0.0000i)
Z: (0.7071+0.0000i, -0.7071+0.0000i)  peluang [0.5, 0.5]  lalu H: peluang [0.0, 1.0]
S: (0.7071+0.0000i, 0.0000+0.7071i)  peluang [0.5, 0.5]  lalu H: peluang [0.5, 0.5]
T: (0.7071+0.0000i, 0.5000+0.5000i)  peluang [0.5, 0.5]  lalu H: peluang [0.8536, 0.1464]
(h, h) kali i : (0.0000+0.7071i, 0.0000+0.7071i)  lalu H: peluang [1.0, 0.0]
(h, h) biasa  : (0.7071+0.0000i, 0.7071+0.0000i)  lalu H: peluang [1.0, 0.0]
S kali S = Z        : True
T kali T = S        : True
H Z H = X           : True
i kali (X Z) = Y    : True
Y dan X Z sama?     : False
sudut Ry = 106.26 derajat -> (0.6000, 0.8000), P(1) = 0.6400
```

Program ini memeriksa kesamaan matriks pada beberapa gerbang; ia tidak membuktikan identitas umum, hanya bahwa identitas itu berlaku untuk matriks-matriks ini.

**Quirk.** Buka [H, T, H pada `|0>`](https://algassert.com/quirk#circuit=%7B%22cols%22:%5B%5B1,%22H%22%5D,%5B1,%22Z%5E%C2%BC%22%5D,%5B1,%22H%22%5D%5D%7D). Penyusun melihat tampilan kabel 14,6 persen, sesuai peluang 1 sebesar 0,1464 pada hitungan di atas, dan lingkaran amplitudo `|0>` lebih besar daripada lingkaran `|1>`. **Prediksi dulu**, baru buka tautannya. Quirk menamai gerbang T lewat `Z^¼`; pada kotak gerbang tampil huruf T.

## Contoh setengah jadi

Lengkapi (kunci di bagian akhir).

1. `S` kali `S` = gerbang ____; sebabnya `i` kali `i` = ____.
2. `Ry(theta)` pada `|0>` memberi `(____ , ____)`; untuk `theta` = 180 derajat hasilnya `(____ , ____)`.
3. Lengkapi matriks Ry:

```python setengah-jadi
def ry(sudut):
    c, s = cos(sudut / 2), sin(sudut / 2)
    return [[c, ____], [____, c]]
```

## Soal Parsons

Susun baris-baris di bawah (sudah diacak) menjadi pemeriksaan bahwa `S kali S = Z`. Penjorokan sengaja dihilangkan.

```text
(a) hasil = kali_matriks(S, S)
(b) print("S kali S = Z :", sama(hasil, Z))
```

## Latihan

1. **Dengan tangan.** (`AI: tanpa AI`) Hitung H, S, H pada `|0>` langkah demi langkah, lalu peluang tiap hasil. Bandingkan dengan jawaban Prediksi dulu untuk S.
2. **Gerbang pengganti.** (`AI: tanpa AI`) Tunjukkan dengan perkalian matriks bahwa `T T = S` dan bahwa `S S = Z`. Lalu sebutkan satu urutan gerbang yang sama dengan X (`H Z H`).
3. **Prediksi lalu uji.** (`AI: boleh`) Di Quirk, pasang H, T, H pada `|0>`. Tebak peluang membaca 1 (angka), lalu cek di [tautan](https://algassert.com/quirk#circuit=%7B%22cols%22:%5B%5B1,%22H%22%5D,%5B1,%22Z%5E%C2%BC%22%5D,%5B1,%22H%22%5D%5D%7D).
4. **Rancang dulu.** (`AI: boleh`) Tulis pseudocode yang menerima peluang p dan mengembalikan sudut `theta` agar `Ry(theta)|0>` memberi peluang 1 sebesar p. Uji dengan p = 0,64.
5. **Catatan pemakaian AI (opsional).** Bila memakai asisten AI, catat alat, tujuan, garis besar perintah, bagian yang dipakai, dan cara memeriksa jawabannya.

## Latihan bercampur

1. H, Z, H dipasang berturut-turut pada `|0>`. Tulis keadaan akhir, dan jelaskan mengapa itu sama dengan X pada `|0>`. (`e-xi1-m9`)
2. Z dipasang pada qubit pertama keadaan Bell `(h, 0, 0, h)`. Tulis keadaan hasilnya dan peluang tiap hasil dua bit. (`e-xi2-m2`)
3. Keadaan akhir H, T, H dibaca 1000 shot. Perkirakan jumlah hasil 1 dan simpangan wajarnya. (`e-xi1-m7`)

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `e-xi2-m6` (satu minggu lagi), `e-xi2-m8` (sekitar tiga minggu lagi), dan `e-xi2-m13` (sekitar delapan minggu lagi). Jawab sekarang lalu simpan.

1. Apa hasil gerbang S dua kali, dan apa kebalikan (invers) Z?
2. Apa hasil rotasi Ry(theta) pada `|0>`, dan berapa peluang membaca 1?
3. Apa beda fase global dan fase relatif, dan mana yang mengubah peluang?

## Kesalahan umum

- **"Fase mengubah peluang."** Fase sendiri tidak mengubah peluang pada bacaan langsung; yang mengubahnya adalah fase relatif **ditambah** gerbang lain seperti H.
- **"Fase global dan fase relatif sama saja."** Global mengalikan seluruh vektor (tak teramati); relatif membedakan komponen satu dari yang lain.
- **"S dan Z hanya berbeda tanda."** S mengalikan `|1>` dengan `i` (putar 90 derajat), Z dengan `-1` (putar 180 derajat); dua S sama dengan satu Z.
- **"Gerbang kompleks berarti simulator butuh pustaka khusus."** Python sudah punya bilangan kompleks; yang berubah hanya cara mencetak amplitudo.
- **"Rotasi Ry memutar qubit secara fisik."** Ry adalah matriks yang kita kalikan pada vektor; apa yang dilakukan perangkat nyata tidak ditentukan oleh modul ini.

## Cek mandiri

- [ ] Saya dapat menulis matriks Y, S, T, dan Ry.
- [ ] Saya dapat menjelaskan fase global dan fase relatif.
- [ ] Saya dapat menunjukkan bahwa `S S = Z` dan `H Z H = X`.
- [ ] Saya dapat menghitung sudut Ry untuk peluang tertentu.
- [ ] Saya mencatat pemakaian AI bila saya memakainya.

## Kunci dan petunjuk

**Ingat kembali.** 1: tanda minus pada komponen `11` (`Phi-` lawan `Phi+`); peluang sama, `00` dan `11` masing-masing 0,5; beda fase relatif. 2: `2^n` komponen; untuk n = 10 ada 1024. 3: selisih mutlak tumbuh kira-kira seperti akar N, sedangkan selisih relatif terhadap harapan mengecil kira-kira seperti 1 per akar N.

**Prediksi dulu.** (1) 0,5 untuk ketiganya, karena modulus komponen tidak berubah; (2) tidak sama: Z memberi peluang 0 sebesar 0, S sebesar 0,5, T sebesar kira-kira 0,8536. Urutan: Z, S, T. Banyak murid menjawab "fase tidak mengubah apa pun, jadi semuanya 0,5".

**Contoh setengah jadi.** 1: Z; `i` kali `i` = `-1`. 2: `(cos(theta/2), sin(theta/2))`; untuk 180 derajat: `(0, 1)`, karena `cos 90 = 0` dan `sin 90 = 1`. 3: `-s` lalu `s`; yaitu `[[c, -s], [s, c]]`.

**Soal Parsons.** a, b.

**Latihan.** 1: `H|0> = (h, h)`; S memberi `(h, ih)`; H memberi `(h(h + ih), h(h - ih)) = ((1+i)/2, (1-i)/2)`; peluang `|1+i|²/4 = 2/4 = 0,5` untuk kedua hasil, sama dengan hasil S pada Prediksi dulu. 2: `T T`: `diag(1, e^(i pi/4))` kali dirinya memberi `diag(1, e^(i pi/2)) = diag(1, i) = S`; `S S = diag(1, i x i) = diag(1, -1) = Z`; `X = H Z H`. 3: kira-kira 0,146 (14,6 persen); Quirk menampilkan 14,6 persen. 4: contoh: `theta = 2 x arcsin(akar p)`; untuk p = 0,64: akar p = 0,8, arcsin 0,8 kira-kira 53,13 derajat, jadi `theta` kira-kira 106,26 derajat (sama dengan program). 5: opsional.

**Latihan bercampur.** 1: `H|0> = (h, h)`; Z memberi `(h, -h)`; H memberi `(0, 1)`; itu sama dengan `X|0> = |1>`, karena `H Z H = X`. 2: Z pada qubit pertama mengganti tanda komponen `10` dan `11`: `(h, 0, 0, -h) = Phi-`; peluang `00` dan `11` masing-masing 0,5. 3: peluang 1 adalah `(2 - akar2)/4`, kira-kira 0,1464, jadi harapan kira-kira 146; simpangan akar(1000 x 0,1464 x 0,8536) = akar 125, kira-kira 11,2.

**Ulang berjarak.** 1: S dua kali memberi Z; Z adalah kebalikan dirinya sendiri (Z kali Z = identitas). 2: `(cos(theta/2), sin(theta/2))`; peluang membaca 1 adalah `sin²(theta/2)`. 3: fase global adalah faktor pada seluruh vektor dan tidak mengubah peluang apa pun; fase relatif adalah beda arah antara komponen dan dapat mengubah peluang setelah gerbang lain (interferensi).

## Langkah berikutnya

Modul berikut: `e-xi2-m6` (reversibilitas): mengapa gerbang kuantum dapat dibalik. Bacaan pendamping: `e-xi1-m4` (bilangan kompleks) dan `e-xi1-m9` (interferensi).
