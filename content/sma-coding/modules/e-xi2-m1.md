## Untuk siapa modul ini

Modul ini untuk murid kelas XI jalur E (komputasi kuantum), minggu `E-XI2-M1` silabus v1.4: gerbang dua qubit, yaitu CNOT. Prasyarat di indeks: `e-xi1-m7` (pengukuran). Di luar indeks kamu juga memakai `e-xi1-m8` (gerbang X) dan `e-xi1-m12` (dua qubit dan hasil kali tensor) dari semester sebelumnya; guru memeriksa bahwa keduanya sudah kamu kerjakan. Alat: kertas, kalkulator, Quirk (tanpa akun), dan Python 3 murni opsional; murid jalur A atau B boleh menerjemahkannya ke C++ atau TypeScript. Hitungan tangan lebih dulu.

Modul ini berstatus DRAF: karangan penyusun, belum ditinjau pemilik. Jalur E adalah pengayaan di luar rumusan capaian pembelajaran (CP); minggu ini tidak punya irisan pengayaan, jadi modul ini tidak dihitung memenuhi butir CP mana pun.

Aturan AI jalur ini: AI generatif boleh dipakai dengan etika dan dicatat, tanpa data pribadi, kata sandi, atau tugas bernilai pada permintaanmu, dan tanpa akun wajib. Saran: jawab dulu sendiri, baru minta penjelasan atau petunjuk bertahap. Setiap soal `Latihan` bertanda `AI: boleh` atau `AI: tanpa AI`.

Catatan untuk guru: matriks CNOT 4 x 4, peran kontrol dan target, dan fakta bahwa CNOT tidak dapat ditulis sebagai hasil kali tensor dua gerbang satu qubit dibaca penyusun dari halaman IBM Quantum Learning "Quantum information" (multiple systems) dan "Quantum circuits", per 2026-11-19; urutan komponen `00, 01, 10, 11` dengan kontrol di kiri sama dengan halaman itu. Di Quirk, penyusun melihat kabel bawah adalah qubit pertama (kontrol) dan kabel atas qubit kedua (target); pada kotak amplitudo akhir, kabel atas menentukan kolom dan kabel bawah menentukan baris. Angka dihitung ulang penyusun dengan Python 3.12.

## Ingat kembali

Jawab dari ingatan, baru cek di bagian kunci.

1. Apa arti shot, dan mengapa satu shot tidak cukup untuk mengetahui keadaan? (dari `e-xi1-m7`)
2. Bagaimana menghitung keadaan produk dari (a, b) dan (c, d)? Beri contoh angka. (dari `e-xi1-m12`)
3. Tulis matriks X dan hitung X kali (1, 0). (dari `e-xi1-m8`)

## Tujuan

Setelah modul ini kamu dapat:

- menuliskan CNOT sebagai matriks 4 x 4 dengan urutan komponen `00, 01, 10, 11`, dan menyebut mana qubit kontrol dan mana target;
- membuat tabel CNOT pada empat keadaan dasar;
- menerapkan CNOT pada vektor empat komponen sembarang dan memeriksa bahwa jumlah kuadratnya tetap 1;
- menjelaskan mengapa CNOT dikerjakan dua kali mengembalikan keadaan semula.

## Prediksi dulu

Qubit pertama `|1>`, qubit kedua `|0>`, CNOT dengan qubit pertama sebagai kontrol. Tebak dan tulis: (1) keadaan sesudahnya; (2) apa yang terjadi bila qubit pertama `|0>`; (3) bila qubit pertama `(h, h)` dan qubit kedua `|0>`, apakah keadaan sesudahnya masih berupa produk dua qubit, dan mengapa. Di sini `h` berarti 1/akar2, kira-kira 0,7071.

## Contoh terselesaikan

**Kontrol dan target.** CNOT (controlled-NOT) memakai dua qubit. Qubit pertama adalah **kontrol**, qubit kedua adalah **target**. Aturannya: bila kontrol bernilai 0, target dibiarkan; bila kontrol bernilai 1, target dibalik seperti gerbang X. Pada keadaan dasar `|ab>` hasilnya `|a, a XOR b>`.

- `|00>` menjadi `|00>` (kontrol 0: target dibiarkan);
- `|01>` menjadi `|01>` (kontrol 0: target dibiarkan);
- `|10>` menjadi `|11>` (kontrol 1: target dibalik);
- `|11>` menjadi `|10>` (kontrol 1: target dibalik).

**Matriks.** Kolom ke-j matriks adalah ke mana keadaan dasar ke-j pergi. Dengan urutan `00, 01, 10, 11`, matriks 4 x 4 CNOT adalah matriks identitas untuk dua komponen pertama, dan menukar dua komponen terakhir:

```text
CNOT = [[1, 0, 0, 0],
        [0, 1, 0, 0],
        [0, 0, 0, 1],
        [0, 0, 1, 0]]
```

Pada vektor `(a00, a01, a10, a11)`, hasilnya `(a00, a01, a11, a10)`: komponen `10` dan `11` bertukar tempat. Untuk `(0,48 ; -0,36 ; 0,64 ; -0,48)` hasilnya `(0,48 ; -0,36 ; -0,48 ; 0,64)`.

**Kontrol dalam superposisi.** Qubit pertama `(h, h)` dan qubit kedua `|0>` adalah keadaan produk `(h, 0, h, 0)`. CNOT menukar komponen ketiga dan keempat: `(h, 0, 0, h)`. Uji dari `e-xi1-m12`: `a*d = h*h = 0,5` sedangkan `b*c = 0*0 = 0`, tidak sama, jadi keadaan ini **bukan** produk dua qubit. CNOT dapat mengubah dua qubit yang terpisah menjadi keadaan yang tidak dapat dipisah; itu bahan `E-XI2-M2`.

**CNOT dua kali.** Menukar dua komponen lalu menukarnya lagi mengembalikan vektor semula, jadi CNOT kali CNOT adalah matriks identitas.

Program berikut menerapkan semua ini (Python 3, murni):

```python
from math import sqrt

h = 1 / sqrt(2)  # 0,7071


def kali(matriks, vektor):
    """Matriks (daftar baris) dikalikan vektor."""
    return [sum(m * v for m, v in zip(baris, vektor)) for baris in matriks]


def tulis(v):
    return "(" + ", ".join(f"{x:.4f}" for x in v) + ")"


# Urutan komponen: 00, 01, 10, 11 (digit kiri = qubit pertama = kontrol).
CNOT = [
    [1, 0, 0, 0],
    [0, 1, 0, 0],
    [0, 0, 0, 1],
    [0, 0, 1, 0],
]

dasar = {
    "00": [1, 0, 0, 0],
    "01": [0, 1, 0, 0],
    "10": [0, 0, 1, 0],
    "11": [0, 0, 0, 1],
}

for nama, v in dasar.items():
    print("CNOT", "|" + nama + ">", "=", tulis(kali(CNOT, v)))

# Kontrol dalam superposisi: qubit pertama H|0> = (h, h), qubit kedua |0>.
awal = [h, 0, h, 0]
akhir = kali(CNOT, awal)
print("awal  ", tulis(awal))
print("akhir ", tulis(akhir))
print("peluang akhir", tulis([x * x for x in akhir]))

# CNOT dua kali memberi keadaan semula.
coba = [0.48, -0.36, 0.64, -0.48]
sekali = kali(CNOT, coba)
dua_kali = kali(CNOT, sekali)
print("sekali  ", tulis(sekali))
print("dua kali", tulis(dua_kali))
print("jumlah kuadrat sesudah CNOT:", f"{sum(x * x for x in sekali):.4f}")
```

Keluaran asli (dijalankan penyusun dengan `python3 -I`, Python 3.12):

```text
CNOT |00> = (1.0000, 0.0000, 0.0000, 0.0000)
CNOT |01> = (0.0000, 1.0000, 0.0000, 0.0000)
CNOT |10> = (0.0000, 0.0000, 0.0000, 1.0000)
CNOT |11> = (0.0000, 0.0000, 1.0000, 0.0000)
awal   (0.7071, 0.0000, 0.7071, 0.0000)
akhir  (0.7071, 0.0000, 0.0000, 0.7071)
peluang akhir (0.5000, 0.0000, 0.0000, 0.5000)
sekali   (0.4800, -0.3600, -0.4800, 0.6400)
dua kali (0.4800, -0.3600, 0.6400, -0.4800)
jumlah kuadrat sesudah CNOT: 1.0000
```

Peluang akhir: `00` dan `11` masing-masing 0,5, `01` dan `10` mustahil; `E-XI2-M3` membahas arti pembacaannya.

**Quirk.** Buka [CNOT dengan masukan `|10>`](https://algassert.com/quirk#circuit=%7B%22cols%22:%5B%5B%22X%22,%22%E2%80%A2%22%5D%5D,%22init%22:%5B0,1%5D%7D). Pada tautan itu penyusun melihat kabel bawah (qubit pertama, kontrol, titik hitam) bernilai 1 dan kabel atas (target, lingkaran dengan tanda plus) awalnya 0; kotak amplitudo akhir menyala hanya pada sel kanan-bawah, yaitu `11`, dan kedua tampilan kabel menyatakan "On". Itu sesuai baris ketiga tabel. Seperti biasa, **prediksi dulu**, baru buka tautannya.

## Contoh setengah jadi

Lengkapi (kunci di bagian akhir).

1. CNOT pada `|11>` memberi `|____>`; CNOT pada `|01>` memberi `|____>`.
2. CNOT pada `(0,6 ; 0 ; 0,8 ; 0)` memberi `(____ ; ____ ; ____ ; ____)`.
3. Lengkapi matriks CNOT:

```python setengah-jadi
CNOT = [
    [1, 0, 0, 0],
    [0, 1, 0, 0],
    [0, 0, ____, ____],
    [0, 0, ____, ____],
]
```

## Soal Parsons

Susun baris-baris di bawah (sudah diacak) menjadi perulangan yang mencetak hasil CNOT pada empat keadaan dasar. Baris (b) dan (c) berada di dalam perulangan; penjorokan sengaja dihilangkan.

```text
(a) for nama, v in dasar.items():
(b) hasil = kali(CNOT, v)
(c) print("CNOT", nama, tulis(hasil))
```

## Latihan

1. **Dengan tangan.** (`AI: tanpa AI`) Keadaan `(0 ; 0,6 ; 0 ; 0,8)` sah? Hitung CNOT kali keadaan itu, lalu peluang tiap hasil dua bit.
2. **Tabel.** (`AI: boleh`) Tunjukkan bahwa CNOT pada `|ab>` memberi `|a, a XOR b>` untuk keempat `ab`, dan jelaskan peran kontrol.
3. **Prediksi lalu uji.** (`AI: boleh`) Di Quirk, siapkan masukan `|11>` pada CNOT yang sama seperti contoh, tebak sel mana yang menyala, lalu cek di [tautan](https://algassert.com/quirk#circuit=%7B%22cols%22:%5B%5B%22X%22,%22%E2%80%A2%22%5D%5D,%22init%22:%5B1,1%5D%7D).
4. **Dua kali.** (`AI: tanpa AI`) Terapkan CNOT dua kali pada `(0,48 ; -0,36 ; 0,64 ; -0,48)` dan jelaskan mengapa hasilnya kembali semula.
5. **Rancang dulu.** (`AI: boleh`) Tulis pseudocode fungsi yang menerapkan CNOT pada vektor empat komponen tanpa membuat matriks. Baru ubah menjadi kode bila mau.
6. **Catatan pemakaian AI (opsional).** Bila memakai asisten AI, catat alat, tujuan, garis besar perintah, bagian yang dipakai, dan cara memeriksa jawabannya.

## Latihan bercampur

1. Qubit pertama `(0,6 ; 0,8)` dan qubit kedua `|0>`. Tulis keadaan produknya, hitung peluang tiap hasil, lalu terapkan CNOT dan hitung peluang barunya. (`e-xi1-m12`, `e-xi1-m6`)
2. Keadaan hasil CNOT pada soal 1 dibaca 1000 shot. Perkirakan jumlah hasil `00` beserta simpangan wajarnya. (`e-xi1-m7`)
3. Ambil CNOT sebagai pemetaan dari himpunan `{00, 01, 10, 11}` ke dirinya sendiri. Apakah tiap keluaran berbeda untuk masukan berbeda? (`matkom-himpunan-relasi-fungsi`)

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `e-xi2-m2` (satu minggu lagi), `e-xi2-m4` (sekitar tiga minggu lagi), dan `e-xi2-m10` (sekitar sembilan minggu lagi). Jawab sekarang lalu simpan.

1. Apa hasil CNOT pada keempat keadaan dasar `|00>`, `|01>`, `|10>`, `|11>`?
2. Berapa hasil CNOT pada keadaan `(h, 0, h, 0)`, dengan qubit pertama sebagai kontrol?
3. Apa yang dilakukan CNOT pada qubit kedua bila qubit pertama 0, dan bila 1?

## Kesalahan umum

- **"CNOT menukar `01` dan `10`."** Itu gerbang lain (penukar, SWAP). CNOT menukar `10` dan `11`: komponen yang kontrolnya 1.
- **"Qubit kedua selalu dibalik."** Hanya bila qubit pertama (kontrol) bernilai 1.
- **"CNOT menyalin qubit pertama ke qubit kedua."** Pada keadaan dasar tampak begitu, tetapi pada `(h, 0, h, 0)` hasilnya `(h, 0, 0, h)`, bukan salinan; `E-XI2-M7` membahas alasannya.
- **"Simulator atau Quirk membuat dua qubit saling mengirim sinyal."** Simulator hanya mengalikan matriks 4 x 4 pada vektor empat komponen; tidak ada sinyal yang dikirim.
- **"Urutan komponen boleh sembarang."** Matriks hanya benar untuk urutan `00, 01, 10, 11` dengan kontrol di kiri; urutan lain memberi matriks lain.

## Cek mandiri

- [ ] Saya dapat menuliskan matriks CNOT dan menyebut kontrol serta targetnya.
- [ ] Saya dapat membuat tabel CNOT pada empat keadaan dasar.
- [ ] Saya dapat menerapkan CNOT pada vektor empat komponen dan memeriksa jumlah kuadratnya.
- [ ] Saya dapat menjelaskan mengapa CNOT dua kali memberi keadaan semula.
- [ ] Saya mencatat pemakaian AI bila saya memakainya.

## Kunci dan petunjuk

**Ingat kembali.** 1: shot adalah satu kali proses siapkan, jalankan, dan baca; satu hasil bisa berasal dari banyak keadaan, jadi keadaan hanya dapat diperkirakan dari banyak shot. 2: `(a*c, a*d, b*c, b*d)`; contoh `(0,6 ; 0,8)` dan `(0,8 ; -0,6)` memberi `(0,48 ; -0,36 ; 0,64 ; -0,48)`. 3: `X = [[0, 1], [1, 0]]`; X kali `(1, 0)` adalah `(0, 1)`.

**Prediksi dulu.** (1) `|11>`: kontrol 1 membalik target. (2) tidak berubah, karena kontrol 0. (3) hasilnya `(h, 0, 0, h)` dan bukan produk, sebab `a*d = 0,5` berbeda dari `b*c = 0`. Banyak murid menebak bahwa hasilnya tetap produk karena "kedua qubit tidak bersentuhan".

**Contoh setengah jadi.** 1: `|10>` dan `|01>`. 2: `(0,6 ; 0 ; 0 ; 0,8)`, karena komponen ketiga dan keempat bertukar. 3: baris ketiga `[0, 0, 0, 1]`, baris keempat `[0, 0, 1, 0]`; yaitu `0, 1` lalu `1, 0`.

**Soal Parsons.** a, b, c.

**Latihan.** 1: jumlah kuadrat `0,36 + 0,64 = 1`, sah; hasil `(0 ; 0,6 ; 0,8 ; 0)`; peluang `01` adalah 0,36 dan `10` adalah 0,64, sedangkan `00` dan `11` nol. 2: `00` ke `00`, `01` ke `01`, `10` ke `11`, `11` ke `10`; bila `a = 0` bagian kedua tetap `b`, bila `a = 1` menjadi kebalikan `b`; kontrol menentukan apakah target dibalik. 3: `|11>` menjadi `|10>`, jadi hanya sel kiri-bawah yang menyala (kabel bawah 1, kabel atas 0). 4: sekali memberi `(0,48 ; -0,36 ; -0,48 ; 0,64)`, dua kali `(0,48 ; -0,36 ; 0,64 ; -0,48)`; menukar dua komponen lalu menukarnya lagi memulihkan susunan semula. 5: contoh: `kembalikan [v0, v1, v3, v2]`. 6: opsional.

**Latihan bercampur.** 1: produk `(0,6 ; 0 ; 0,8 ; 0)`, peluang `(0,36 ; 0 ; 0,64 ; 0)`; sesudah CNOT `(0,6 ; 0 ; 0 ; 0,8)`, peluang `00` 0,36 dan `11` 0,64 (kontrol tetap pada peluang yang sama; targetnya kini ikut kontrol). 2: harapan 1000 x 0,36 = 360; simpangan akar(1000 x 0,36 x 0,64) = akar 230,4, kira-kira 15,2. 3: ya: keempat keluaran berbeda, jadi CNOT adalah pemetaan satu-ke-satu dan pada himpunan itu (bijeksi); ini dasar `E-XI2-M6`.

**Ulang berjarak.** 1: `|00>` ke `|00>`, `|01>` ke `|01>`, `|10>` ke `|11>`, `|11>` ke `|10>`. 2: `(h, 0, 0, h)`. 3: bila qubit pertama 0, qubit kedua dibiarkan; bila 1, qubit kedua dibalik (seperti X).

## Langkah berikutnya

Modul berikut: `e-xi2-m2` (entanglement dan keadaan Bell): H lalu CNOT dari `|00>`. Bacaan pendamping: `e-xi1-m12` (hasil kali tensor) dan `e-xi1-m3` (perkalian matriks).
