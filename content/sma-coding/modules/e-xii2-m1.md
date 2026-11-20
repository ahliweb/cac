## Untuk siapa modul ini

Modul ini untuk murid kelas XII jalur E (komputasi kuantum), minggu `E-XII2-M1` silabus v1.4: membaca hasil nyata, yaitu histogram, galat statistik, dan jumlah shot, dengan keluaran catatan interpretasi. Prasyarat: modul `e-xii1-m7`; modul `e-xii1-m12` (demonstrasi cloud quantum) belum terindeks, jadi guru memeriksanya. Di luar indeks, bagian kode memerlukan dasar pemrograman setara `A-X1-M9..M12` (C++); bagian konsep terbuka bagi semua murid. Alat murid: kertas, kalkulator, dan program C++ kecil di bawah. Blok Python hanya demonstrasi guru.

Modul ini karangan penyusun dan disetujui pemilik program pada 2026-11-20 (keputusan lewat dialog; catatan tinjauan menjadi tindak lanjut revisi). Jalur E adalah pengayaan di luar rumusan CP; minggu ini tanpa irisan pengayaan, jadi modul ini tidak dihitung memenuhi butir CP mana pun.

Aturan AI jalur ini: AI generatif boleh dipakai dengan etika dan dicatat, tanpa data pribadi, kata sandi, atau tugas bernilai pada permintaanmu, dan tanpa akun wajib. Saran: jawab dulu sendiri, baru minta petunjuk bertahap; kode buatan AI kamu baca, jalankan, dan uji. Setiap soal `Latihan` bertanda `AI: boleh` atau `AI: tanpa AI`.

Catatan untuk guru: rumus selang Wilson dibaca dari buku panduan statistik NIST/SEMATECH bagian 7.2.4.1, per tanggal akses 2026-11-19; buku itu juga menyatakan bahwa selang normal biasa dapat memberi batas bawah yang mustahil (negatif). Histogram di modul ini berasal dari simulator lokal Qiskit (`StatevectorSampler`, versi 2.6.2 pada venv penyusun), **bukan** dari perangkat nyata; penyusun tidak menjalankan pekerjaan cloud apa pun. Jalankan blok Python hanya di komputer guru, tanpa akun murid, tanpa token, dan dengan label sintetis `kelas-demo-01`. Bila guru punya histogram agregat dari demonstrasi cloud quantum (`e-xii1-m12`), pakai itu dengan label yang sama.

## Ingat kembali

Jawab dari ingatan, baru cek di bagian kunci.

1. Mengapa histogram 1000 shot dari peluang 0,5 tidak persis 500, dan berapa simpangan wajarnya? (dari `e-xii1-m7`)
2. Bagaimana menilai apakah selisih histogram perangkat dari simulator ideal lebih dari sekadar acak shot? (dari `e-xii1-m12`)
3. Bagaimana membandingkan hasil 1000 shot dengan peluang hitungan tangan memakai simpangan wajar? (dari `e-xi2-m13`)

## Tujuan

Setelah modul ini kamu dapat:

- menghitung proporsi hasil dari histogram beserta simpangan bakunya;
- menghitung selang Wilson 95 persen dan menafsirkannya dengan benar;
- menghubungkan jumlah shot dengan lebar selang;
- menulis catatan interpretasi yang memuat jumlah shot, sumber data, dan selang.

Keluaran yang diminta silabus: catatan interpretasi.

## Prediksi dulu

Sirkuit Bell ideal dijalankan 1000 shot di simulator tanpa derau. Tebak dan tulis: (1) kira-kira berapa kali `00` muncul, dalam rentang; (2) bila percobaan diulang, apakah angkanya sama; (3) bila kamu ingin lebar selang menyempit menjadi setengahnya, kira-kira berapa shot yang dibutuhkan.

## Contoh terselesaikan

**Dari histogram ke proporsi.** Histogram hanya berisi hitungan. Bila hasil `00` muncul `k` kali dari `n` shot, perkiraan peluangnya `p = k / n`. Simpangan bakunya `akar(p (1 - p) / n)`: ukuran seberapa jauh `p` wajar bergeser bila percobaan diulang. Makin besar `n`, makin kecil simpangan itu, tetapi hanya sebanding `1 / akar(n)`.

**Selang.** Selang 95 persen adalah prosedur: bila percobaan diulang berkali-kali dan selang dihitung tiap kali, kira-kira 95 persen selang memuat nilai benar. Satu selang tertentu **tidak** berarti "peluang 95 persen nilai benar ada di dalamnya". Rumus Wilson (NIST) lebih andal daripada rumus normal biasa saat `p` dekat 0 atau 1 atau `n` kecil, dan batas bawahnya tidak pernah negatif.

Blok Python **demonstrasi guru, tidak dijalankan murid**. Ia memakai simulator lokal Qiskit, tanpa akun, tanpa token, tanpa jaringan:

```python
# demonstrasi guru, tidak dijalankan murid
# Simulator lokal bawaan Qiskit; tanpa akun, tanpa token, tanpa jaringan.
import qiskit
from qiskit import QuantumCircuit
from qiskit.primitives import StatevectorSampler

print("Qiskit", qiskit.__version__)

bell = QuantumCircuit(2)
bell.h(0)
bell.cx(0, 1)
bell.measure_all()

LABEL = "kelas-demo-01"  # label sintetis; bukan nama murid atau kelas nyata
for shot in (100, 1000, 10000):
    sampler = StatevectorSampler(seed=2026)  # benih tetap supaya keluaran dapat diulang
    hasil = sampler.run([bell], shots=shot).result()[0]
    print(LABEL, shot, "shot:", dict(sorted(hasil.data.meas.get_counts().items())))
```

Keluaran asli (dijalankan penyusun):

```text
Qiskit 2.6.2
kelas-demo-01 100 shot: {'00': 49, '11': 51}
kelas-demo-01 1000 shot: {'00': 464, '11': 536}
kelas-demo-01 10000 shot: {'00': 4935, '11': 5065}
```

Program C++ berikut memakai hitungan 464 dari 1000, membandingkan selang normal dan selang Wilson, menunjukkan lebar selang menurut jumlah shot, lalu menguji sendiri klaim "95 persen" dengan 2000 pengulangan.

```cpp
#include <cmath>
#include <cstdint>
#include <cstdio>
#include <initializer_list>

struct Selang {
    double bawah, atas;
};

const double Z95 = 1.96;  // 95 persen, hampiran normal baku

// Selang normal biasa: p ± z * akar(p(1-p)/n). Bawahnya bisa negatif.
Selang normal(int k, int n) {
    double p = k / double(n);
    double e = Z95 * std::sqrt(p * (1.0 - p) / n);
    return {p - e, p + e};
}

// Selang Wilson (rumus pada buku panduan statistik NIST, bagian 7.2.4.1).
Selang wilson(int k, int n) {
    double p = k / double(n);
    double z2 = Z95 * Z95;
    double tengah = p + z2 / (2.0 * n);
    double akar = Z95 * std::sqrt(p * (1.0 - p) / n + z2 / (4.0 * n * n));
    double bagi = 1.0 + z2 / n;
    return {(tengah - akar) / bagi, (tengah + akar) / bagi};
}

uint64_t keadaan = 88172645463325252ull;  // benih tetap, hanya untuk simulasi

double acak01() {  // xorshift64
    keadaan ^= keadaan << 13;
    keadaan ^= keadaan >> 7;
    keadaan ^= keadaan << 17;
    return (keadaan >> 11) / 9007199254740992.0;
}

int main() {
    // 1. Histogram Bell 1000 shot (hasil simulator lokal, label kelas-demo-01).
    const int shot = 1000;
    const int hitung00 = 464;
    double p = hitung00 / double(shot);
    Selang w = wilson(hitung00, shot);
    std::printf("p topi (hasil 00) = %.4f  simpangan baku = %.4f\n", p, std::sqrt(p * (1.0 - p) / shot));
    std::printf("selang Wilson 95%%  = [%.4f ; %.4f]  memuat 0,5? %s\n", w.bawah, w.atas,
                (w.bawah <= 0.5 && 0.5 <= w.atas) ? "ya" : "tidak");

    // 2. Hasil yang tidak pernah muncul: 0 dari 1000.
    Selang n0 = normal(0, 1000), w0 = wilson(0, 1000);
    std::printf("0 dari 1000: normal [%.4f ; %.4f]  Wilson [%.4f ; %.4f]\n", n0.bawah, n0.atas, w0.bawah, w0.atas);

    // 3. Setengah lebar selang untuk p = 0,5 menurut jumlah shot.
    std::printf("shot   setengah lebar (p = 0,5)\n");
    for (int n : {100, 1000, 4000, 10000, 40000}) {
        std::printf("%5d  %.4f\n", n, Z95 * std::sqrt(0.25 / n));
    }

    // 4. Berapa kali selang memuat nilai benar 0,5? Ulangi percobaan 1000 shot sebanyak 2000 kali.
    int ulang = 2000, masuk_normal = 0, masuk_wilson = 0;
    for (int u = 0; u < ulang; u++) {
        int k = 0;
        for (int s = 0; s < shot; s++)
            if (acak01() < 0.5) k++;
        Selang a = normal(k, shot), b = wilson(k, shot);
        if (a.bawah <= 0.5 && 0.5 <= a.atas) masuk_normal++;
        if (b.bawah <= 0.5 && 0.5 <= b.atas) masuk_wilson++;
    }
    std::printf("dari %d pengulangan, selang memuat 0,5: normal %d, Wilson %d\n", ulang, masuk_normal, masuk_wilson);
    return 0;
}
```

Keluaran asli (dikompilasi penyusun dengan `g++ -std=c++17 -Wall -Wextra`, lalu dijalankan):

```text
p topi (hasil 00) = 0.4640  simpangan baku = 0.0158
selang Wilson 95%  = [0.4333 ; 0.4950]  memuat 0,5? tidak
0 dari 1000: normal [0.0000 ; 0.0000]  Wilson [0.0000 ; 0.0038]
shot   setengah lebar (p = 0,5)
  100  0.0980
 1000  0.0310
 4000  0.0155
10000  0.0098
40000  0.0049
dari 2000 pengulangan, selang memuat 0,5: normal 1889, Wilson 1889
```

Bacaan hasilnya. Pertama, histogram 1000 shot itu berasal dari simulator **ideal** yang peluang `00`-nya tepat 0,5, tetapi selang Wilson `[0,4333 ; 0,4950]` tidak memuat 0,5. Itu bukan kesalahan simulator: bagian terakhir keluaran menunjukkan 111 dari 2000 selang (5,6 persen) meleset, kira-kira satu dari dua puluh, jadi satu selang yang meleset belum membuktikan ada sebab selain acak shot. Kedua, bila `00` tidak pernah muncul pada 1000 shot, rumus normal memberi `[0 ; 0]` seolah pasti nol, sedangkan Wilson memberi batas atas 0,0038: peluang sampai kira-kira 1 dari 260 tidak terlihat oleh 1000 shot. Ketiga, lebar selang menyempit setengah bila shot dikalikan empat (`1000` ke `4000`), bukan dua. Keempat, selang ini hanya menghitung acak shot. Derau gerbang, derau baca, dan kesalahan model tidak masuk; selisih dari prediksi yang jauh melampaui selang menunjuk ke sebab lain (`e-xii1-m12`).

**Catatan interpretasi yang baik** memuat: sumber (simulator atau perangkat, label sintetis), jumlah shot, hitungan, proporsi dan selangnya, serta batas klaim.

## Contoh setengah jadi

Lengkapi (kunci di bagian akhir).

1. Simpangan baku untuk 300 dari 1000 shot: `akar(0,3 x 0,7 / 1000)` = ____.
2. Lengkapi bagian selang Wilson:

```cpp setengah-jadi
double tengah = p + z2 / (2.0 * ____);
double akar = Z95 * std::sqrt(p * (1.0 - p) / ____ + z2 / (4.0 * n * n));
```

## Soal Parsons

Susun baris-baris di bawah (sudah diacak) menjadi fungsi `normal`.

```text
(a)     double e = Z95 * std::sqrt(p * (1.0 - p) / n);
(b) Selang normal(int k, int n) {
(c)     double p = k / double(n);
(d)     return {p - e, p + e};
(e) }
```

## Latihan

1. **Hitung.** (`AI: tanpa AI`) Untuk 4935 dari 10000 shot: hitung `p`, simpangan baku, dan `z` terhadap 0,5 dengan tangan. Apakah selisihnya wajar?
2. **Ubah data.** (`AI: boleh`) Pada program, ganti ke 4935 dari 10000. Prediksi dulu apakah selang Wilson memuat 0,5, lalu jalankan.
3. **Jelaskan.** (`AI: tanpa AI`) Mengapa 0 hasil terlarang dari 1000 shot belum membuktikan bahwa peluangnya nol?
4. **Rancang.** (`AI: boleh`) Berapa shot minimal agar setengah lebar selang 95 persen untuk `p` sekitar 0,5 paling besar 0,005? Tulis rumus dan hitungannya.
5. **Catatan pemakaian AI (opsional).** Bila memakai asisten AI, catat alat, tujuan, garis besar perintah, bagian yang dipakai, dan cara memeriksanya.

## Latihan bercampur

1. Pada arsip sintetis `e-xii1-m12`, hasil terlarang `01` dan `10` berjumlah 192 dari 4000 shot. Hitung proporsinya; selang Wilson-nya (rumus yang sama) `[0,0418 ; 0,0551]`. Apakah 0 ada di dalamnya, dan apa artinya? (`e-xii1-m12`)
2. Berapa memori untuk menyimpan vektor keadaan 20 qubit bila tiap amplitudo 8 byte? (`e-xii1-m4`)

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `e-xii2-m2` (satu minggu lagi), `e-xii2-m4` (sekitar tiga minggu lagi), dan `e-xii2-m9` (sekitar delapan minggu lagi). Jawab sekarang lalu simpan.

1. Bila hasil terlarang tidak pernah muncul pada 1000 shot, mengapa itu belum berarti peluangnya nol?
2. Berapa kali lebih banyak shot yang dibutuhkan agar selang menyempit menjadi setengahnya?
3. Apa yang harus tertulis di samping sebuah histogram agar pembaca dapat menilainya?

## Kesalahan umum

- **"Selang 95 persen berarti peluang 95 persen nilai benar ada di dalamnya."** Itu sifat prosedur pada banyak pengulangan, bukan sebuah selang.
- **"Selang yang tidak memuat nilai ideal berarti simulator atau perangkat salah."** Sekitar satu dari dua puluh selang meleset karena acak shot.
- **"Dua kali shot menyempitkan selang setengahnya."** Empat kali shot yang melakukannya.
- **"0 dari 1000 berarti mustahil."** Itu hanya berarti peluangnya kecil, di bawah beberapa per mil.
- **"Selang menjelaskan seluruh selisih."** Ia hanya memuat acak shot, bukan derau perangkat atau kesalahan model.

## Cek mandiri

- [ ] Saya dapat menghitung proporsi dan simpangan baku dari sebuah histogram.
- [ ] Saya dapat menghitung selang Wilson dan menafsirkannya dengan benar.
- [ ] Saya tahu empat kali shot menyempitkan selang setengahnya.
- [ ] Saya dapat menyebut isi catatan interpretasi histogram.
- [ ] Saya mencatat pemakaian AI bila saya memakainya.

## Kunci dan petunjuk

**Ingat kembali.** 1: acak shot; tiap shot independen, jadi hitungan bergeser; simpangan wajar `akar(1000 x 0,25)` = 15,8 shot (0,0158 dalam proporsi). 2: hitung simpangan wajar `akar(shot x p x (1 - p))` untuk tiap hasil; selisih lebih dari kira-kira tiga simpangan, atau hasil yang peluang idealnya nol, menunjukkan sebab lain selain acak shot. 3: hitung `z = (hitungan - shot x p) / akar(shot x p x (1 - p))`; nilai `z` kecil (kira-kira di bawah 2 sampai 3) wajar.

**Prediksi dulu.** (1) kira-kira 470 sampai 530 (dua sampai tiga simpangan dari 500). (2) tidak sama, kecuali benih acak sama. (3) kira-kira empat kali lipat, 4000.

**Contoh setengah jadi.** 1: `akar(0,21 / 1000)` = 0,0145. 2: `n` dan `n`. Kunci ini dikompilasi penyusun (potongan itu ada di program di atas).

**Soal Parsons.** b, c, a, d, e.

**Latihan.** 1: `p` = 0,4935; simpangan baku `akar(0,4935 x 0,5065 / 10000)` = 0,0050; `z = (4935 - 5000) / akar(10000 x 0,25)` = -65 / 50 = -1,30; wajar. 2: selang Wilson `[0,4837 ; 0,5033]`, memuat 0,5 (keluaran program varian dengan hitungan itu). 3: karena 1000 shot hanya dapat mendeteksi peluang yang tidak terlalu kecil; selang Wilson untuk 0 dari 1000 punya batas atas 0,0038, jadi peluang sampai sekitar 0,4 persen masih cocok dengan data. 4: `n = z^2 x p (1 - p) / h^2` = `1,96^2 x 0,25 / 0,005^2` = 38416; jadi minimal 38416 shot (dibulatkan ke atas).

**Latihan bercampur.** 1: proporsi 0,048; 0 tidak ada di selang `[0,0418 ; 0,0551]` (batas bawah 0,0418 di atas 0), jadi hasil terlarang memang ada pada data itu dan bukan sekadar acak shot; angka selang dihitung penyusun dengan rumus Wilson yang sama. 2: `2^20 x 8` byte = 8388608 byte = 8 MiB.

**Ulang berjarak.** 1: karena 1000 shot hanya dapat mendeteksi peluang yang tidak terlalu kecil; selang Wilson memberi batas atas 0,0038. 2: empat kali, karena lebar selang sebanding `1 / akar(shot)`. 3: sumber (simulator atau perangkat), jumlah shot, hitungan atau proporsi, selang, dan batas klaim.

## Langkah berikutnya

Modul berikut: `e-xii2-m2` (mitigasi derau, konsep). Bacaan pendamping: `e-xii1-m8` dan `e-xii1-m12`.
