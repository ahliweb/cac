## Untuk siapa modul ini

Modul ini untuk murid kelas XII jalur E (komputasi kuantum), minggu `E-XII1-M8` silabus v1.4: derau dan dekoherensi, dengan keluaran simulator dengan derau. Prasyarat: modul `e-xi2-m14` dan seluruh materi semester sebelumnya; modul `e-xii1-m1` sampai `e-xii1-m7` (terutama Grover dan batas komputasi kuantum) belum terindeks, jadi guru memeriksanya. Di luar indeks, bagian kode memerlukan dasar pemrograman setara `A-X1-M9..M12` (C++); bagian konsep terbuka bagi semua murid. Alat: kertas, kalkulator, dan simulatormu (C++17 atau TypeScript dengan Bun; tanpa akun).

Modul ini karangan penyusun dan disetujui pemilik program pada 2026-11-20 (keputusan lewat dialog; catatan tinjauan menjadi tindak lanjut revisi). Jalur E adalah pengayaan di luar rumusan CP; minggu ini tanpa irisan pengayaan, jadi modul ini tidak dihitung memenuhi butir CP mana pun.

Aturan AI jalur ini: AI generatif boleh dipakai dengan etika dan dicatat, tanpa data pribadi, kata sandi, atau tugas bernilai pada permintaanmu, dan tanpa akun wajib. Saran: jawab dulu sendiri, baru minta petunjuk bertahap; kode buatan AI kamu baca, jalankan, dan uji. Setiap soal `Latihan` bertanda `AI: boleh` atau `AI: tanpa AI`.

Catatan untuk guru: definisi T1 dan T2 serta contoh keluaran (kesalahan gerbang dua qubit sekitar 0,003, kesalahan baca sekitar 0,02) dibaca dari halaman IBM Quantum "View backend details", per 2026-11-19; itu contoh keluaran halaman, bukan kondisi perangkat sekarang. Gagasan bahwa peluang keadaan tetap benar turun sebagai `(1 - p)^m` dibaca dari halaman "Exact and noisy simulation with Qiskit Aer primitives", per 2026-11-19. Model derau di modul ini buatan penyusun dan jauh lebih sederhana daripada perangkat nyata. Teknik mitigasi derau hanya disebut, dari halaman "Overview of noise management techniques".

## Ingat kembali

Jawab dari ingatan, baru cek di bagian kunci.

1. Apa rumus peluang item bertanda setelah `t` pengulangan Grover, dengan `sin(theta) = 1/akar N`? (dari `e-xii1-m5`)
2. Mengapa "komputer kuantum mencoba semua jawaban sekaligus" adalah gambaran yang menyesatkan? (dari `e-xii1-m7`)
3. Bagaimana membandingkan hasil 1000 shot dengan peluang hitungan tangan memakai simpangan wajar? (dari `e-xi2-m13`)

## Tujuan

Setelah modul ini kamu dapat:

- menyebut tiga sumber derau (gerbang, pembacaan, dekoherensi) dan membedakan T1 dari T2 secara garis besar;
- memprediksi histogram Bell berderau dari model kesalahan acak per gerbang;
- menghitung peluang tanpa kesalahan `(1 - p)^m` dan menjelaskan mengapa sirkuit dalam gagal;
- membandingkan histogram ideal dan berderau dari simulator buatanmu.

Keluaran yang diminta silabus: simulator dengan derau.

## Prediksi dulu

Model di bawah memberi, setelah tiap gerbang, kesalahan acak dengan peluang `p` pada salah satu qubit yang disentuh gerbang: separuh membalik bit (X), separuh membalik tanda (Z). Tebak dan tulis: (1) sirkuit Bell (H lalu CNOT), 1000 shot, `p = 0,10`: hasil apa yang muncul padahal tidak ada pada keadaan ideal, dan kira-kira berapa kali (petunjuk: tidak semua jenis kesalahan mengubah peluang); (2) untuk 100 gerbang dengan `p = 0,01`, kira-kira berapa persen shot tidak mengalami satu kesalahan pun.

## Contoh terselesaikan

**Tiga sumber derau.** Pertama, gerbang tidak sempurna: tiap operasi membawa kesalahan kecil, paling besar pada gerbang dua qubit. Kedua, pembacaan salah: bit terbaca terbalik. Ketiga, dekoherensi: qubit kehilangan keadaannya seiring waktu walau tidak diapa-apakan. Halaman IBM mendefinisikan `T1` sebagai rata-rata lama qubit tetap di `|1>` sebelum meluruh ke `|0>`, dan `T2` sebagai rentang waktu qubit mempertahankan koherensi fase superposisi. Pada program di bawah, dekoherensi dimodelkan sebagai pembalikan tanda acak selama menunggu, pendekatan kasar untuk pengaruh `T2`.

**Menalar Bell berderau.** Kesalahan X setelah CNOT membalik satu bit, jadi keluar `01` atau `10`. Kesalahan Z hanya membalik tanda, dan tanda tidak terlihat pada pembacaan langsung (`e-xii1-m2`). Kesalahan setelah H juga tidak mengubah peluang. Maka hasil terlarang kira-kira `p/2`: untuk `p = 0,10`, sekitar 50 dari 1000 shot, dengan simpangan wajar `akar(1000 x 0,05 x 0,95)` = 6,9.

```cpp
#include <cmath>
#include <cstdint>
#include <cstdio>
#include <vector>

using Vektor = std::vector<double>;

const double H1 = 1.0 / std::sqrt(2.0);

uint32_t benih = 2026;  // benih tetap, hanya untuk simulasi
int galat = 0;          // banyak kesalahan yang terjadi pada satu shot

double acak01() {
    benih = 1664525u * benih + 1013904223u;
    return benih / 4294967296.0;
}

void gerbang_h(Vektor& v, int n, int k) {
    int geser = n - 1 - k;
    for (size_t i = 0; i < v.size(); i++) {
        if (((i >> geser) & 1) == 0) {
            size_t j = i | (size_t(1) << geser);
            double a = v[i], b = v[j];
            v[i] = H1 * (a + b);
            v[j] = H1 * (a - b);
        }
    }
}

void cnot(Vektor& v, int n, int kontrol, int target) {
    int gk = n - 1 - kontrol, gt = n - 1 - target;
    for (size_t i = 0; i < v.size(); i++) {
        if (((i >> gk) & 1) == 1 && ((i >> gt) & 1) == 0) {
            size_t j = i | (size_t(1) << gt);
            double tmp = v[i];
            v[i] = v[j];
            v[j] = tmp;
        }
    }
}

void balik_bit(Vektor& v, int n, int k) {  // gerbang X
    int geser = n - 1 - k;
    for (size_t i = 0; i < v.size(); i++) {
        if (((i >> geser) & 1) == 0) {
            size_t j = i | (size_t(1) << geser);
            double tmp = v[i];
            v[i] = v[j];
            v[j] = tmp;
        }
    }
}

void balik_tanda(Vektor& v, int n, int k) {  // gerbang Z
    int geser = n - 1 - k;
    for (size_t i = 0; i < v.size(); i++)
        if ((i >> geser) & 1) v[i] = -v[i];
}

size_t baca(const Vektor& a) {
    double r = acak01(), kumulatif = 0.0;
    for (size_t i = 0; i < a.size(); i++) {
        kumulatif += a[i] * a[i];
        if (r < kumulatif) return i;
    }
    return a.size() - 1;
}

// Model derau: setelah satu gerbang, dengan peluang p terjadi satu kesalahan
// pada salah satu qubit yang disentuh gerbang (a atau b): separuh balik bit, separuh balik tanda.
void derau_gerbang(Vektor& v, int n, int a, int b, double p) {
    if (acak01() < p) {
        int k = (acak01() < 0.5) ? a : b;
        if (acak01() < 0.5) balik_bit(v, n, k); else balik_tanda(v, n, k);
        galat++;
    }
}

Vektor siapkan_bell(double p) {
    Vektor v = {1.0, 0.0, 0.0, 0.0};
    gerbang_h(v, 2, 0);
    derau_gerbang(v, 2, 0, 0, p);
    cnot(v, 2, 0, 1);
    derau_gerbang(v, 2, 0, 1, p);
    return v;
}

// Dekoherensi: tiap langkah menunggu, fase dapat terbalik dengan peluang q.
void tunggu(Vektor& v, double q) {
    if (acak01() < q) balik_tanda(v, 1, 0);
}

double peluang_nol_setelah_tunggu(int t, double q, int shot) {
    int nol = 0;
    for (int s = 0; s < shot; s++) {
        Vektor v = {1.0, 0.0};
        gerbang_h(v, 1, 0);                              // H pertama
        for (int i = 0; i < t; i++) tunggu(v, q);
        gerbang_h(v, 1, 0);                              // H kedua
        if (baca(v) == 0) nol++;
    }
    return nol / double(shot);
}

int main() {
    const int shot = 1000;
    for (double p : {0.0, 0.10}) {
        int hitung[4] = {0, 0, 0, 0};
        for (int s = 0; s < shot; s++) hitung[baca(siapkan_bell(p))]++;
        std::printf("Bell, p = %.2f: 00=%d 01=%d 10=%d 11=%d\n", p, hitung[0], hitung[1], hitung[2], hitung[3]);
    }

    std::printf("peluang tanpa satu pun kesalahan, p = 0.01 per gerbang:\n");
    for (int m : {10, 50, 100, 500}) {
        int bersih = 0;
        for (int s = 0; s < 2000; s++) {
            galat = 0;
            Vektor v = {1.0, 0.0, 0.0, 0.0};
            for (int i = 0; i < m; i++) {
                cnot(v, 2, 0, 1);
                derau_gerbang(v, 2, 0, 1, 0.01);
            }
            if (galat == 0) bersih++;
        }
        std::printf("  m = %3d gerbang: rumus %.4f, simulasi %.4f\n", m, std::pow(0.99, m), bersih / 2000.0);
    }

    std::printf("H, tunggu t langkah, H, baca (q = 0.10):\n");
    for (int t : {0, 1, 2, 5, 10}) {
        double rumus = 0.5 + 0.5 * std::pow(1.0 - 2.0 * 0.10, t);
        std::printf("  t = %2d: P(0) rumus %.4f, simulasi %.4f\n", t, rumus, peluang_nol_setelah_tunggu(t, 0.10, 4000));
    }
    return 0;
}
```

Keluaran asli (dikompilasi penyusun dengan `g++ -std=c++17 -Wall -Wextra`, lalu dijalankan):

```text
Bell, p = 0.00: 00=522 01=0 10=0 11=478
Bell, p = 0.10: 00=468 01=32 10=33 11=467
peluang tanpa satu pun kesalahan, p = 0.01 per gerbang:
  m =  10 gerbang: rumus 0.9044, simulasi 0.9025
  m =  50 gerbang: rumus 0.6050, simulasi 0.6035
  m = 100 gerbang: rumus 0.3660, simulasi 0.3670
  m = 500 gerbang: rumus 0.0066, simulasi 0.0075
H, tunggu t langkah, H, baca (q = 0.10):
  t =  0: P(0) rumus 1.0000, simulasi 1.0000
  t =  1: P(0) rumus 0.9000, simulasi 0.9038
  t =  2: P(0) rumus 0.8200, simulasi 0.8225
  t =  5: P(0) rumus 0.6638, simulasi 0.6615
  t = 10: P(0) rumus 0.5537, simulasi 0.5430
```

Bacaan hasilnya. Hasil terlarang `01` dan `10` berjumlah 65, harapan 50: selisih 15 sekitar 2,2 simpangan, masih wajar. Tabel kedua: tiap gerbang hanya salah 1 persen, tetapi setelah 100 gerbang hanya sekitar 37 persen shot yang bersih, dan setelah 500 gerbang hampir tidak ada. Peluang bersih turun eksponensial terhadap jumlah gerbang. Pada contoh halaman IBM (`p` sekitar 0,003), `0,997^1000` masih sekitar 0,05, sehingga sirkuit dengan seribu gerbang dua qubit sudah sulit tanpa perlindungan khusus. Tabel ketiga: tanpa derau, H lalu H mengembalikan `|0>` (peluang 1); makin lama menunggu, fase makin teracak dan `P(0)` mendekati 0,5 sebesar `0,5 + 0,5 (1 - 2q)^t`. Grover dan algoritma lain bergantung pada interferensi, jadi dekoherensi merusaknya.

**Batasnya.** Ini model buatan: kesalahan tidak saling berkaitan, hanya dua jenis, dan angka `p` dan `q` bukan data perangkat. Teknik mengurangi derau ada (mitigasi, `e-xii2-m2`), tetapi tidak menghapusnya.

## Contoh setengah jadi

Lengkapi (kunci di bagian akhir).

1. Untuk `p = 0,01` dan `m = 100`, `0,99^100` kira-kira ____.
2. Lengkapi:

```cpp setengah-jadi
void tunggu(Vektor& v, double q) {
    if (acak01() < ____) balik_tanda(v, 1, 0);
}
```

## Soal Parsons

Susun baris-baris di bawah (sudah diacak) menjadi isi satu putaran `for (int s ...)` pada `peluang_nol_setelah_tunggu`.

```text
(a)         gerbang_h(v, 1, 0);   // H kedua
(b)         Vektor v = {1.0, 0.0};
(c)         if (baca(v) == 0) nol++;
(d)         for (int i = 0; i < t; i++) tunggu(v, q);
(e)         gerbang_h(v, 1, 0);   // H pertama
```

## Latihan

1. **Hitung.** (`AI: tanpa AI`) Dengan `p = 0,02` per gerbang, berapa peluang tanpa kesalahan untuk 30 gerbang, dan berapa gerbang paling sedikit agar peluangnya turun di bawah 0,5?
2. **Ubah program.** (`AI: boleh`) Pakai `p = 0,05` pada Bell. Prediksi dulu jumlah hasil terlarang dari 1000 shot dan rentang tiga simpangan, lalu jalankan dan bandingkan.
3. **Rancang dulu, lalu kode.** (`AI: boleh`) Tambahkan kesalahan baca: setelah keadaan siap, tiap bit terbaca terbalik dengan peluang `r = 0,02` (tanpa derau gerbang). Tulis pseudocode, prediksi jumlah hasil terlarang, lalu kodekan.
4. **Jelaskan.** (`AI: tanpa AI`) Mengapa kesalahan Z tidak mengubah histogram Bell tetapi mengubah hasil H, tunggu, H?
5. **Catatan pemakaian AI (opsional).** Bila memakai asisten AI, catat alat, tujuan, garis besar perintah, bagian yang dipakai, dan cara memeriksanya.

## Latihan bercampur

1. Grover `N = 8` dengan dua pengulangan memberi peluang 0,9453 (`e-xii1-m4`). Anggap tiap pengulangan memuat 20 gerbang dua qubit dengan `p = 0,01` dan tiap kesalahan merusak hasil. Taksir peluang jawaban terbaca.
2. Simulator vektor keadaan 20 qubit dengan 8 byte per amplitudo: berapa memorinya? (`e-xi2-m4`)

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `e-xii1-m9` (satu minggu lagi), `e-xii1-m11` (sekitar tiga minggu lagi), dan `e-xii2-m2` (sekitar delapan minggu lagi). Jawab sekarang lalu simpan.

1. Mengapa kesalahan tanda tidak mengubah histogram Bell tetapi mengubah hasil H, tunggu, H?
2. Bila satu gerbang bersih dengan peluang 0,99, berapa peluang 100 gerbang bersih, dan mengapa turunnya secepat itu?
3. Sebutkan tiga sumber derau pada perangkat kuantum nyata.

## Kesalahan umum

- **"Derau hanya membuat hasil acak."** Kesalahan tanda tidak mengubah pembacaan langsung, tetapi menghancurkan interferensi.
- **"Kesalahan 1 persen per gerbang kecil, jadi aman."** Peluang bersih `(1 - p)^m` turun eksponensial terhadap jumlah gerbang.
- **"Simulator berderau sama dengan perangkat nyata."** Ia model buatan; derau nyata bergantung pada perangkat dan berubah.
- **"Dekoherensi berarti qubit rusak."** Qubit kehilangan keadaan seiring waktu, dan itu menggeser hasil bila sirkuit terlalu lama.

## Cek mandiri

- [ ] Saya dapat menyebut tiga sumber derau dan makna kasar `T1` dan `T2`.
- [ ] Saya dapat memprediksi hasil terlarang Bell berderau dan memeriksanya dengan simpangan wajar.
- [ ] Saya dapat menghitung `(1 - p)^m` dan menjelaskan akibatnya bagi sirkuit dalam.
- [ ] Saya dapat menjelaskan mengapa dekoherensi merusak interferensi.
- [ ] Saya mencatat pemakaian AI bila saya memakainya.

## Kunci dan petunjuk

**Ingat kembali.** 1: `sin²((2t + 1) theta)`. 2: satu bacaan hanya memberi satu hasil acak; amplitudo semua item ada, tetapi jawaban baru terbaca bila interferensi menaikkan peluangnya. 3: hitung harapan `shot x peluang` dan simpangan `akar(shot x p x (1 - p))`, lalu lihat selisih dalam satuan simpangan; lebih dari kira-kira tiga simpangan mencurigakan.

**Prediksi dulu.** (1) hasil `01` dan `10`; kira-kira `p/2` x 1000 = 50 (separuh kesalahan adalah Z yang tidak terlihat); keluaran asli 65. (2) `0,99^100` kira-kira 0,37, jadi sekitar 37 persen.

**Contoh setengah jadi.** 1: 0,366 (keluaran program: rumus 0,3660). 2: `q`. Kunci ini dikompilasi dan dijalankan penyusun (potongan itu ada di program di atas).

**Soal Parsons.** b, e, d, a, c.

**Latihan.** 1: `0,98^30` = 0,5455; `ln 0,5 / ln 0,98` = 34,3, jadi 35 gerbang (`0,98^35` = 0,4931, sedangkan `0,98^34` = 0,5031). 2: harapan `p/2` x 1000 = 25, simpangan `akar(1000 x 0,025 x 0,975)` = 4,9, tiga simpangan kira-kira 15, jadi hasil wajar antara 10 dan 40 (angka pasti bergantung pada benih; penyusun tidak menjalankan). 3: pseudocode: untuk tiap shot, siapkan Bell, baca satu hasil, balik tiap bit dengan peluang `r`; peluang hasil terlarang `2r(1 - r)` = 0,0392, sekitar 39 dari 1000, simpangan sekitar 6,1 (penyusun tidak menjalankan). 4: Z hanya mengubah tanda amplitudo; pembacaan langsung memakai kuadrat amplitudo, jadi tidak terlihat; pada H, tunggu, H tanda itu mengubah hasil interferensi H kedua, sehingga bacaan bisa berubah dari 0 ke 1. 5: opsional.

**Latihan bercampur.** 1: `0,99^40` = 0,669; taksiran `0,9453 x 0,669` = 0,632 (taksiran kasar, bukan hasil model). 2: `2^20 x 8` = 8.388.608 byte = 8 MiB.

**Ulang berjarak.** 1: tanda tidak terlihat pada kuadrat amplitudo, tetapi memengaruhi interferensi pada H kedua. 2: `0,99^100` = 0,366; tiap gerbang mengalikan peluang dengan 0,99, jadi turun eksponensial. 3: gerbang tidak sempurna, pembacaan salah, dekoherensi.

## Langkah berikutnya

Modul berikut: `e-xii1-m9` (pustaka Qiskit dan Python I, demonstrasi guru). Bacaan pendamping: `e-xii1-m7` dan `e-xi2-m13`.
