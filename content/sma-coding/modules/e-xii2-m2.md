## Untuk siapa modul ini

Modul ini untuk murid kelas XII jalur E (komputasi kuantum), minggu `E-XII2-M2` silabus v1.4: mitigasi derau (konsep), dengan keluaran catatan konsep. Prasyarat: modul `e-xii2-m1`; modul `e-xii1-m8` (derau dan dekoherensi) dan `e-xii1-m13` belum terindeks, jadi guru memeriksanya. Di luar indeks, bagian kode memerlukan dasar pemrograman setara `A-X1-M9..M12` (C++); bagian konsep terbuka bagi semua murid. Alat: kertas, kalkulator, dan simulatormu (C++17 atau TypeScript dengan Bun; tanpa akun).

Modul ini berstatus DRAF: karangan penyusun, belum ditinjau pemilik. Jalur E adalah pengayaan di luar rumusan CP; minggu ini tanpa irisan pengayaan, jadi modul ini tidak dihitung memenuhi butir CP mana pun.

Aturan AI jalur ini: AI generatif boleh dipakai dengan etika dan dicatat, tanpa data pribadi, kata sandi, atau tugas bernilai pada permintaanmu, dan tanpa akun wajib. Saran: jawab dulu sendiri, baru minta petunjuk bertahap; kode buatan AI kamu baca, jalankan, dan uji. Setiap soal `Latihan` bertanda `AI: boleh` atau `AI: tanpa AI`.

Catatan untuk guru: nama dan gagasan teknik (penekanan derau, TREX, ZNE dengan gate folding, PEC) dibaca dari halaman IBM Quantum "Overview of noise management techniques", per tanggal akses 2026-11-19; modul hanya menyebutnya, tidak menjalankannya di perangkat nyata. Model derau di program adalah buatan penyusun, jauh lebih sederhana daripada perangkat; angka `p` dan `r` bukan data perangkat.

## Ingat kembali

Jawab dari ingatan, baru cek di bagian kunci.

1. Bila hasil terlarang tidak pernah muncul pada 1000 shot, mengapa itu belum berarti peluangnya nol? (dari `e-xii2-m1`)
2. Mengapa kecocokan model dengan arsip yang dibangkitkan dari model yang sama tidak membuktikan apa pun tentang perangkat nyata? (dari `e-xii1-m13`)
3. Sebutkan tiga sumber derau pada perangkat kuantum nyata. (dari `e-xii1-m8`)

## Tujuan

Setelah modul ini kamu dapat:

- membedakan penekanan derau, mitigasi derau, dan sekadar "membersihkan hasil";
- menjelaskan koreksi kesalahan baca dan ekstrapolasi nol-derau dengan gate folding;
- menyebut batas dan biaya mitigasi: bias, shot tambahan, dan simpangan yang membesar;
- mengulang simulasi dengan model derau berbeda dan membaca perbedaannya.

Keluaran yang diminta silabus: catatan konsep.

## Prediksi dulu

Program memakai sirkuit Bell (H lalu CNOT) dan mengukur nilai harap `ZZ` (`+1` bila dua bit sama, `-1` bila beda; ideal `1`). CNOT diulang 1, 3, atau 5 kali: tiga CNOT berturut-turut sama efeknya dengan satu CNOT, jadi sirkuit idealnya tidak berubah, hanya derau yang bertambah. Kesalahan gerbang `p = 0,03` (membalik satu bit) dan kesalahan baca `r = 0,02`. Tebak dan tulis: (1) apakah `ZZ` mentah turun atau naik bila CNOT diulang, dan kira-kira berapa untuk satu CNOT; (2) apakah koreksi baca saja membuat hasilnya tepat 1; (3) apakah ekstrapolasi ke nol derau pasti memberi tepat 1.

## Contoh terselesaikan

**Tiga pekerjaan yang berbeda.** Pertama, *penekanan* derau (mis. dynamical decoupling, Pauli twirling) mengurangi dampak derau saat sirkuit dijalankan, dan menurut halaman IBM biasanya menambah beban sampling. Kedua, *mitigasi* derau memperbaiki **perkiraan nilai harap** lewat percobaan tambahan dan pengolahan hasil: TREX untuk kesalahan baca, ZNE (zero-noise extrapolation), dan PEC (probabilistic error cancellation). Ketiga, mitigasi **tidak membuat gerbang lebih baik** dan bukan koreksi kesalahan penuh.

**Dua teknik di program.** (1) Koreksi baca: siapkan `|00>` tanpa gerbang, ukur seberapa sering bit terbalik (`r` perkiraan), lalu bagi `ZZ` dengan `(1 - 2r)^2` karena dua bit sama-sama bisa terbalik. (2) ZNE dengan gate folding: mengganti gerbang `U` dengan `U U† U` melipat tigakan derau tanpa mengubah hasil ideal (faktor 1, 3, 5 di sini). Nilai `ZZ` diukur pada tiap faktor lalu dikembalikan ke faktor 0 dengan garis lurus atau kurva eksponen; halaman IBM menyatakan ZNE sering membaik tetapi **tidak dijamin tak bias**, dan PEC tak bias tetapi bebannya tumbuh eksponensial terhadap kedalaman sirkuit.

```cpp
#include <cmath>
#include <cstdint>
#include <cstdio>
#include <initializer_list>
#include <vector>

using Vektor = std::vector<double>;

const double H1 = 1.0 / std::sqrt(2.0);
const bool JENIS_X = true;  // true: kesalahan membalik bit (X); false: membalik tanda (Z)

uint64_t keadaan = 2026;  // benih tetap, hanya untuk simulasi

double acak01() {  // xorshift64
    keadaan ^= keadaan << 13;
    keadaan ^= keadaan >> 7;
    keadaan ^= keadaan << 17;
    return (keadaan >> 11) / 9007199254740992.0;
}

// Dua qubit; indeks = 2 * bit(qubit 0) + bit(qubit 1).
void gerbang_h0(Vektor& v) {
    for (size_t i : {0, 1}) {
        double a = v[i], b = v[i + 2];
        v[i] = H1 * (a + b);
        v[i + 2] = H1 * (a - b);
    }
}

void cnot01(Vektor& v) {
    double tmp = v[2];
    v[2] = v[3];
    v[3] = tmp;
}

void galat(Vektor& v, double p) {  // dengan peluang p, satu kesalahan pada qubit acak
    if (acak01() >= p) return;
    int q = (acak01() < 0.5) ? 0 : 1;
    if (JENIS_X) {
        for (size_t i = 0; i < 4; i++) {
            bool bit = (i >> (1 - q)) & 1;
            size_t j = i ^ (size_t(1) << (1 - q));
            if (!bit) {
                double tmp = v[i];
                v[i] = v[j];
                v[j] = tmp;
            }
        }
    } else {
        for (size_t i = 0; i < 4; i++)
            if ((i >> (1 - q)) & 1) v[i] = -v[i];
    }
}

size_t baca(const Vektor& a) {
    double r = acak01(), kum = 0.0;
    for (size_t i = 0; i < a.size(); i++) {
        kum += a[i] * a[i];
        if (r < kum) return i;
    }
    return a.size() - 1;
}

// <ZZ> dari Bell dengan m CNOT (m ganjil: CNOT diulang berpasangan, "gate folding");
// p = kesalahan gerbang, r = kesalahan baca per bit.
double zz(int m, double p, double r, int shot) {
    double jumlah = 0.0;
    for (int s = 0; s < shot; s++) {
        Vektor v = {1.0, 0.0, 0.0, 0.0};
        gerbang_h0(v);
        for (int i = 0; i < m; i++) {
            cnot01(v);
            galat(v, p);
        }
        size_t hasil = baca(v);
        int b0 = (hasil >> 1) & 1, b1 = hasil & 1;
        if (acak01() < r) b0 ^= 1;
        if (acak01() < r) b1 ^= 1;
        jumlah += (b0 == b1) ? 1.0 : -1.0;
    }
    return jumlah / shot;
}

// Kalibrasi baca: siapkan |00>, tanpa gerbang, lalu ukur seberapa sering bit terbalik.
double kalibrasi_baca(double r, int shot) {
    int terbalik = 0;
    for (int s = 0; s < shot; s++) {
        if (acak01() < r) terbalik++;  // bit pertama
        if (acak01() < r) terbalik++;  // bit kedua
    }
    return terbalik / (2.0 * shot);
}

// Garis lurus kuadrat terkecil y = a + b x; kembalikan a (nilai pada x = 0).
double potong(const double* x, const double* y, int n) {
    double sx = 0, sy = 0, sxx = 0, sxy = 0;
    for (int i = 0; i < n; i++) {
        sx += x[i];
        sy += y[i];
        sxx += x[i] * x[i];
        sxy += x[i] * y[i];
    }
    double b = (n * sxy - sx * sy) / (n * sxx - sx * sx);
    return (sy - b * sx) / n;
}

struct Hasil {
    double mentah, baca_ok, linier, eksponen;
};

Hasil satu_putaran(double p, double r, int shot) {
    const int M[3] = {1, 3, 5};
    double x[3], y[3], ly[3];
    double rh = kalibrasi_baca(r, 20000);
    double skala = (1.0 - 2.0 * rh) * (1.0 - 2.0 * rh);
    for (int i = 0; i < 3; i++) {
        x[i] = M[i];
        y[i] = zz(M[i], p, r, shot) / skala;  // koreksi baca
        ly[i] = std::log(y[i]);
    }
    return {y[0] * skala, y[0], potong(x, y, 3), std::exp(potong(x, ly, 3))};
}

int main() {
    const double p = 0.03, r = 0.02;
    std::printf("ideal <ZZ> = 1; p = %.2f, r = %.2f, jenis kesalahan %s\n", p, r, JENIS_X ? "X" : "Z");
    std::printf("m   rumus (1-2p)^m (1-2r)^2   simulasi\n");
    for (int m : {1, 3, 5})
        std::printf("%d   %.4f                     %.4f\n", m, std::pow(1 - 2 * p, m) * std::pow(1 - 2 * r, 2),
                    zz(m, p, r, 40000));

    Hasil h = satu_putaran(p, r, 40000);
    std::printf("satu putaran, 40000 shot per m:\n");
    std::printf("  mentah (m=1)              %.4f\n", h.mentah);
    std::printf("  + koreksi baca            %.4f\n", h.baca_ok);
    std::printf("  + ekstrapolasi linier     %.4f\n", h.linier);
    std::printf("  + ekstrapolasi eksponen   %.4f\n", h.eksponen);

    // Sebaran antar pengulangan: 200 putaran dengan 2000 shot per m.
    const int ulang = 200;
    double sb[4] = {0, 0, 0, 0}, sk[4] = {0, 0, 0, 0};
    for (int u = 0; u < ulang; u++) {
        Hasil t = satu_putaran(p, r, 2000);
        double v[4] = {t.mentah, t.baca_ok, t.linier, t.eksponen};
        for (int i = 0; i < 4; i++) {
            sb[i] += v[i];
            sk[i] += v[i] * v[i];
        }
    }
    const char* nama[4] = {"mentah", "koreksi baca", "linier", "eksponen"};
    std::printf("%d putaran, 2000 shot per m (rata-rata dan simpangan baku antar putaran):\n", ulang);
    for (int i = 0; i < 4; i++) {
        double rata = sb[i] / ulang;
        std::printf("  %-13s %.4f  %.4f\n", nama[i], rata, std::sqrt(sk[i] / ulang - rata * rata));
    }
    return 0;
}
```

Keluaran asli (dikompilasi penyusun dengan `g++ -std=c++17 -Wall -Wextra`, lalu dijalankan):

```text
ideal <ZZ> = 1; p = 0.03, r = 0.02, jenis kesalahan X
m   rumus (1-2p)^m (1-2r)^2   simulasi
1   0.8663                     0.8649
3   0.7655                     0.7944
5   0.6764                     0.7192
satu putaran, 40000 shot per m:
  mentah (m=1)              0.8651
  + koreksi baca            0.9356
  + ekstrapolasi linier     0.9729
  + ekstrapolasi eksponen   0.9784
200 putaran, 2000 shot per m (rata-rata dan simpangan baku antar putaran):
  mentah        0.8685  0.0109
  koreksi baca  0.9424  0.0121
  linier        0.9803  0.0156
  eksponen      0.9864  0.0172
```

Bacaan hasilnya. Pertama, `ZZ` mentah turun bila CNOT bertambah (0,86 pada satu CNOT), tetapi simulasi pada `m = 3` dan `m = 5` (0,7944 dan 0,7192) lebih tinggi daripada rumus sederhana `(1 - 2p)^m (1 - 2r)^2` (0,7655 dan 0,6764). Sebabnya: kesalahan `X` pada qubit kontrol menjalar lewat CNOT berikutnya dan membalik kedua bit, sehingga paritas tidak berubah. Kedua, koreksi baca menaikkan `0,865` menjadi `0,936`, hampir sama dengan `1 - 2p = 0,94`: kesalahan baca hilang, kesalahan gerbang tetap. Ketiga, ekstrapolasi memberi `0,973` (linier) dan `0,978` (eksponen), lebih dekat ke 1 tetapi **tidak persis 1**: bentuk penurunan yang diasumsikan kurva tidak persis sama dengan bentuk sebenarnya. Pada 200 putaran, rata-ratanya `0,980` dan `0,986`; biasnya nyata, bukan kebetulan satu putaran. Keempat, mitigasi tidak gratis: simpangan baku antar putaran naik dari `0,0109` (mentah) menjadi `0,0156` (linier) dan `0,0172` (eksponen), kira-kira satu setengah kali lipat, dan butuh tiga kali pengukuran (faktor 1, 3, 5).

**Batasnya.** Mitigasi memperbaiki nilai harap, bukan histogram per shot. Hasilnya bergantung pada asumsi model derau, jadi mengulang dengan model lain (soal `Latihan`) adalah bagian dari pekerjaan, bukan pilihan.

## Contoh setengah jadi

Lengkapi (kunci di bagian akhir).

1. `ZZ` mentah 0,8650 dengan `r = 0,02`: setelah koreksi baca menjadi `0,8650 / (0,96 x 0,96)` = ____.
2. Lengkapi bagian koreksi baca:

```cpp setengah-jadi
double skala = (1.0 - 2.0 * rh) * (1.0 - 2.0 * ____);
y[i] = zz(M[i], p, r, shot) / ____;  // koreksi baca
```

## Soal Parsons

Susun baris-baris di bawah (sudah diacak) menjadi fungsi `kalibrasi_baca`.

```text
(a)         if (acak01() < r) terbalik++;  // bit kedua
(b) double kalibrasi_baca(double r, int shot) {
(c)     return terbalik / (2.0 * shot);
(d)     for (int s = 0; s < shot; s++) {
(e)         if (acak01() < r) terbalik++;  // bit pertama
(f)     }
(g)     int terbalik = 0;
(h) }
```

## Latihan

1. **Hitung.** (`AI: tanpa AI`) Bila `ZZ(m) = (1 - 2p)^m` dengan `p = 0,03`, hitung `ZZ(1)` dan `ZZ(3)`. Ekstrapolasi garis lurus dua titik itu ke faktor 0. Berapa selisihnya dari nilai ideal 1?
2. **Ubah model.** (`AI: boleh`) Ubah `JENIS_X` menjadi `false` (kesalahan membalik tanda, bukan bit). Prediksi dulu nilai `ZZ` pada `m = 1, 3, 5`, lalu jalankan dan jelaskan mengapa ekstrapolasi tidak lagi berarti.
3. **Jelaskan.** (`AI: tanpa AI`) Mengapa simpangan baku antar putaran lebih besar setelah ekstrapolasi, dan apa artinya bagi jumlah shot?
4. **Rancang.** (`AI: boleh`) Susun langkah percobaan untuk memeriksa apakah kurva linier atau eksponen lebih baik pada `p = 0,05`: apa yang kamu ulang, apa yang kamu catat, dan tanda apa yang menunjukkan satu kurva lebih baik.
5. **Catatan pemakaian AI (opsional).** Bila memakai asisten AI, catat alat, tujuan, garis besar perintah, bagian yang dipakai, dan cara memeriksanya.

## Latihan bercampur

1. Dari 40000 shot, `ZZ = 0,8651`. Berapa proporsi hasil dengan dua bit sama dan berapa simpangan bakunya? (`e-xii2-m1`)
2. Peluang tanpa satu kesalahan pada 100 gerbang dengan `p = 0,01` per gerbang? (`e-xii1-m8`)

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `e-xii2-m3` (satu minggu lagi), `e-xii2-m5` (sekitar tiga minggu lagi), dan `e-xii2-m10` (sekitar delapan minggu lagi). Jawab sekarang lalu simpan.

1. Mengapa ekstrapolasi nol-derau memerlukan lebih banyak shot dan tetap belum tentu tak bias?
2. Apa yang dilakukan mitigasi derau, dan apa yang tidak dilakukannya?
3. Mengapa menguji satu model derau saja tidak cukup untuk menyatakan hasil mitigasi benar?

## Kesalahan umum

- **"Mitigasi membuat perangkat bebas derau."** Ia memperbaiki perkiraan nilai harap; gerbangnya tetap berderau.
- **"Mitigasi sama dengan koreksi kesalahan."** Mitigasi mengolah hasil dan percobaan tambahan; ia tidak melindungi tiap shot.
- **"Ekstrapolasi pasti mengembalikan nilai ideal."** Hasilnya bergantung pada kurva yang diasumsikan dan pada derau shot.
- **"Satu model derau cukup."** Jenis kesalahan yang berbeda (bit atau tanda) dapat membuat teknik yang sama tidak berguna sama sekali.
- **"Mitigasi gratis."** Ia menambah pengukuran dan memperbesar simpangan antar putaran.

## Cek mandiri

- [ ] Saya dapat membedakan penekanan derau, mitigasi, dan koreksi kesalahan.
- [ ] Saya dapat menjelaskan koreksi baca dan gate folding.
- [ ] Saya dapat menyebut tiga biaya atau batas mitigasi.
- [ ] Saya sudah mengulang simulasi dengan model derau lain.
- [ ] Saya mencatat pemakaian AI bila saya memakainya.

## Kunci dan petunjuk

**Ingat kembali.** 1: karena 1000 shot hanya dapat mendeteksi peluang yang tidak terlalu kecil; selang Wilson memberi batas atas 0,0038. 2: arsip dan modelnya berasal dari sumber yang sama, jadi kecocokan hanya menunjukkan bahwa analisis memulihkan parameter model; perangkat nyata belum diukur. 3: kesalahan gerbang, kesalahan baca, dan dekoherensi (`T1` dan `T2`).

**Prediksi dulu.** (1) turun; kira-kira 0,86 (`(1 - 2 x 0,03) x 0,96^2`). (2) tidak: kesalahan gerbang tetap, sekitar 0,94. (3) tidak pasti; ia mendekati 1 tetapi dapat bias.

**Contoh setengah jadi.** 1: `0,8650 / 0,9216` = 0,9386. 2: `rh` dan `skala`. Kunci ini dikompilasi penyusun (potongan itu ada di program di atas).

**Soal Parsons.** b, g, d, e, a, f, c, h.

**Latihan.** 1: `ZZ(1) = 0,94`; `ZZ(3) = 0,94^3` = 0,8306; kemiringan `(0,8306 - 0,94) / (3 - 1)` = -0,0547; pada faktor 0: `0,94 + 0,0547` = 0,9947; selisih -0,0053 dari 1 (dihitung tangan; model rumus sederhana tanpa penjalaran kesalahan). 2: dengan kesalahan tanda, `ZZ` mentah hampir tidak berubah menurut `m`: keluaran varian program (`JENIS_X = false`) memberi `0,9198`, `0,9240`, `0,9233` untuk `m = 1, 3, 5`, dan koreksi baca memberi kira-kira `0,996` sampai `1,00`; kesalahan tanda tidak terlihat oleh `ZZ`, jadi ekstrapolasi tidak memperbaiki apa pun dan hanya memperbesar simpangan (0,0114 lawan 0,0095). 3: ekstrapolasi menarik nilai pada faktor 0 dari tiga titik yang masing-masing berderau shot; titik terjauh ikut menentukan hasil sehingga derau shot terkuatkan (simpangan 0,0172 lawan 0,0109 pada contoh); untuk menurunkannya perlu shot lebih banyak pada tiap faktor. 4: ulangi putaran puluhan kali pada `p = 0,05`; catat rata-rata dan simpangan baku tiap kurva; kurva yang lebih baik punya rata-rata lebih dekat ke 1 dan simpangan yang tidak jauh lebih besar; periksa juga model derau lain. 5: opsional.

**Latihan bercampur.** 1: `(1 + 0,8651) / 2` = 0,93255; simpangan baku `akar(0,93255 x 0,06745 / 40000)` = 0,00125. 2: `0,99^100` = 0,366 (lihat `e-xii1-m8`).

**Ulang berjarak.** 1: ia perlu pengukuran pada beberapa faktor derau (tiga kali lipat atau lebih) dan simpangan hasil membesar; ia tidak tak bias karena bentuk kurva ekstrapolasi hanya asumsi. 2: memperbaiki perkiraan nilai harap lewat percobaan tambahan dan pengolahan hasil; tidak membuat gerbang lebih baik dan bukan koreksi kesalahan. 3: asumsi tiap teknik bergantung pada jenis derau; kesalahan tanda, misalnya, tidak terlihat pada `ZZ`.

## Langkah berikutnya

Modul berikut: `e-xii2-m3` (pengayaan: algoritma hibrida, konsep). Bacaan pendamping: `e-xii1-m8` dan `e-xii2-m1`.
