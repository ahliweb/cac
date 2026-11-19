## Untuk siapa modul ini

Modul ini untuk murid kelas XII jalur E (komputasi kuantum), minggu `E-XII2-M7` silabus v1.4: proyek akhir, implementasi I, yaitu membangun inti proyek, dengan keluaran kode dan catatan. Prasyarat: modul `e-xii2-m6` (dokumen rancanganmu). Di luar indeks, bagian kode memerlukan dasar pemrograman setara `A-X1-M9..M12` (C++) atau `B-X1-M9..M12` (TypeScript dengan Bun); murid proyek studi banding mengerjakan inti analisisnya (mis. tabel sumber atau perhitungan), bukan simulator. Alat: simulator buatanmu dan program C++ contoh di bawah (tanpa akun). Kerja minggu ini adalah satu sprint.

Modul ini berstatus DRAF: karangan penyusun, belum ditinjau pemilik. Jalur E adalah pengayaan di luar rumusan CP; minggu ini tanpa irisan pengayaan, jadi modul ini tidak dihitung memenuhi butir CP mana pun.

Aturan AI jalur ini: AI generatif boleh dipakai dengan etika dan dicatat, tanpa data pribadi, kata sandi, atau tugas bernilai pada permintaanmu, dan tanpa akun wajib. Saran: jawab dulu sendiri, baru minta petunjuk bertahap; kode buatan AI kamu baca, jalankan, dan uji. Catat pemakaian AI di log proyek.

Catatan untuk guru: program contoh adalah kerangka inti simulator amplitudo real (H, X, Z, CNOT, baca) dengan uji yang jawabannya dihitung tangan; uji lulus hanya untuk kasus yang diuji. Pembanding independen: kelas `Statevector` Qiskit (dokumentasi IBM, per akses 2026-11-19) memberi peluang GHZ 0,5 dan 0,5 pada komputer guru (diperiksa penyusun).

## Ingat kembali

Jawab dari ingatan, baru cek di bagian kunci.

1. Apa isi minimal dokumen rancangan proyek? (dari `e-xii2-m6`)
2. Mengapa klaim "komputer kuantum akan memecahkan semua enkripsi" terlalu luas dan tidak bersumber? (dari `e-xii2-m4`)
3. Sebutkan batas klaim yang harus ada pada laporan perbandingan simulator dan perangkat. (dari `e-xii1-m13`)

## Tujuan

Setelah modul ini kamu dapat:

- memecah proyek menjadi tugas kecil dengan uji hijau sedini mungkin;
- membangun inti proyek yang jalan, dengan uji yang jawabannya dihitung tangan lebih dulu;
- mencatat keputusan, hambatan, dan pemakaian AI di log sprint;
- menyatakan apa yang sudah dan belum dikerjakan secara jujur.

Keluaran yang diminta silabus: kode dan catatan.

## Rencana sprint

Sprint ini menghubungkan rancangan `e-xii2-m6` dengan kode. **Tujuan sprint satu kalimat:** "inti jalan dan tiga uji hitung tangan lulus". Urutan yang aman: (1) representasi keadaan dan fungsi baca; (2) satu gerbang dan ujinya; (3) gerbang dua qubit dan ujinya; (4) histogram dan ujinya. Setiap langkah berakhir dengan uji hijau sebelum langkah berikutnya, supaya bug ditemukan di tempat ia dibuat. Jangan mengoptimalkan atau menambah fitur sebelum uji hijau; catat ide itu di log untuk sprint berikutnya.

**Uji tangan lebih dulu.** Tulis jawaban yang kamu hitung sendiri, baru kode. Contoh: `H` pada `|0>` memberi peluang 0 sebesar 0,5; `H` dua kali memberi 1; Bell memberi `00` dan `11` masing-masing 0,5; GHZ tiga qubit memberi `000` dan `111` masing-masing 0,5; `H`, `Z`, `H` memberi peluang 1 pada hasil 1. Pada kerangka ini qubit 0 adalah bit paling kiri pada indeks hasil, sama dengan simulator `e-xii1-m8`.

```cpp
#include <cmath>
#include <cstdint>
#include <cstdio>
#include <utility>
#include <vector>

// Inti simulator vektor keadaan (amplitudo real). Qubit 0 adalah bit paling kiri pada indeks.
class Simulator {
public:
    explicit Simulator(int n) : n_(n), v_(size_t(1) << n, 0.0) { v_[0] = 1.0; }

    void h(int q) {
        const double s = 1.0 / std::sqrt(2.0);
        size_t bit = mask(q);
        for (size_t i = 0; i < v_.size(); i++) {
            if (i & bit) continue;
            double a = v_[i], b = v_[i | bit];
            v_[i] = s * (a + b);
            v_[i | bit] = s * (a - b);
        }
    }
    void x(int q) {
        size_t bit = mask(q);
        for (size_t i = 0; i < v_.size(); i++)
            if (!(i & bit)) std::swap(v_[i], v_[i | bit]);
    }
    void z(int q) {
        size_t bit = mask(q);
        for (size_t i = 0; i < v_.size(); i++)
            if (i & bit) v_[i] = -v_[i];
    }
    void cnot(int kontrol, int target) {
        size_t kb = mask(kontrol), tb = mask(target);
        for (size_t i = 0; i < v_.size(); i++)
            if ((i & kb) && !(i & tb)) std::swap(v_[i], v_[i | tb]);
    }
    double peluang(size_t hasil) const { return v_[hasil] * v_[hasil]; }
    double norma() const {
        double s = 0.0;
        for (double a : v_) s += a * a;
        return s;
    }
    // Ambil satu hasil baca dari peluang; r adalah bilangan acak di [0, 1).
    size_t baca(double r) const {
        double kum = 0.0;
        for (size_t i = 0; i < v_.size(); i++) {
            kum += peluang(i);
            if (r < kum) return i;
        }
        return v_.size() - 1;
    }
    size_t ukuran() const { return v_.size(); }

private:
    size_t mask(int q) const { return size_t(1) << (n_ - 1 - q); }
    int n_;
    std::vector<double> v_;
};

int gagal = 0;

void periksa(const char* nama, double didapat, double harap) {
    bool ok = std::fabs(didapat - harap) < 1e-12;
    if (!ok) gagal++;
    std::printf("%-34s didapat %.6f  harap %.6f  %s\n", nama, didapat, harap, ok ? "OK" : "GAGAL");
}

uint64_t keadaan = 7;  // benih tetap, hanya untuk simulasi

double acak01() {  // xorshift64
    keadaan ^= keadaan << 13;
    keadaan ^= keadaan >> 7;
    keadaan ^= keadaan << 17;
    return (keadaan >> 11) / 9007199254740992.0;
}

int main() {
    // Setiap uji punya jawaban yang dihitung tangan lebih dulu.
    Simulator a(1);
    a.h(0);
    periksa("H pada |0>: peluang 0", a.peluang(0), 0.5);

    Simulator b(1);
    b.h(0);
    b.h(0);
    periksa("H dua kali: peluang 0", b.peluang(0), 1.0);

    Simulator bell(2);
    bell.h(0);
    bell.cnot(0, 1);
    periksa("Bell: peluang 00", bell.peluang(0), 0.5);
    periksa("Bell: peluang 01", bell.peluang(1), 0.0);
    periksa("Bell: peluang 11", bell.peluang(3), 0.5);

    Simulator ghz(3);
    ghz.h(0);
    ghz.cnot(0, 1);
    ghz.cnot(1, 2);
    periksa("GHZ tiga qubit: peluang 000", ghz.peluang(0), 0.5);
    periksa("GHZ tiga qubit: peluang 111", ghz.peluang(7), 0.5);
    periksa("GHZ tiga qubit: norma", ghz.norma(), 1.0);

    Simulator tanda(1);
    tanda.h(0);
    tanda.z(0);
    tanda.h(0);
    periksa("H, Z, H: peluang 1 (seperti X)", tanda.peluang(1), 1.0);

    // Histogram GHZ 1000 shot; hanya 000 dan 111 yang boleh muncul.
    int hitung[8] = {0};
    for (int s = 0; s < 1000; s++) hitung[ghz.baca(acak01())]++;
    std::printf("GHZ 1000 shot: 000=%d 111=%d lainnya=%d\n", hitung[0], hitung[7],
                1000 - hitung[0] - hitung[7]);
    if (hitung[0] + hitung[7] != 1000) gagal++;

    if (gagal == 0) {
        std::printf("semua uji lulus\n");
        return 0;
    }
    std::printf("ada %d uji gagal\n", gagal);
    return 1;
}
```

Keluaran asli (dikompilasi penyusun dengan `g++ -std=c++17 -Wall -Wextra`, lalu dijalankan):

```text
H pada |0>: peluang 0              didapat 0.500000  harap 0.500000  OK
H dua kali: peluang 0              didapat 1.000000  harap 1.000000  OK
Bell: peluang 00                   didapat 0.500000  harap 0.500000  OK
Bell: peluang 01                   didapat 0.000000  harap 0.000000  OK
Bell: peluang 11                   didapat 0.500000  harap 0.500000  OK
GHZ tiga qubit: peluang 000        didapat 0.500000  harap 0.500000  OK
GHZ tiga qubit: peluang 111        didapat 0.500000  harap 0.500000  OK
GHZ tiga qubit: norma              didapat 1.000000  harap 1.000000  OK
H, Z, H: peluang 1 (seperti X)     didapat 1.000000  harap 1.000000  OK
GHZ 1000 shot: 000=486 111=514 lainnya=0
semua uji lulus
```

Bacaan hasilnya. Sembilan uji lulus, dan histogram GHZ 1000 shot memberi 486 untuk `000` dan 514 untuk `111`; `z` terhadap 500 adalah -0,89, wajar (`e-xii2-m1`). Dua hal patut dicatat. Uji memakai toleransi `1e-12`, bukan kesamaan persis, karena bilangan pecahan jarang persis sama. Pada GHZ hanya `000` dan `111` yang boleh muncul; satu hasil lain berarti bug, bukan acak shot. Proyekmu boleh memakai TypeScript atau struktur lain asal ujinya setara.

**Log sprint** (tulis tiap hari kerja, satu sampai tiga kalimat): apa yang selesai, apa yang menghambat, apa langkah berikutnya, dan catatan pemakaian AI bila ada.

## Daftar periksa

- [ ] Tujuan sprint satu kalimat tertulis di log.
- [ ] Tiap uji punya jawaban hitung tangan yang ditulis sebelum kode.
- [ ] Representasi keadaan dan fungsi baca jalan.
- [ ] Minimal satu gerbang satu qubit dan satu gerbang dua qubit lulus uji.
- [ ] Uji norma (jumlah kuadrat sama dengan 1) lulus setelah beberapa gerbang.
- [ ] Histogram diperiksa dengan simpangan wajar, bukan kesamaan persis.
- [ ] Log sprint dan log pemakaian AI terisi.
- [ ] Tidak ada data pribadi, nama murid, token, atau kunci di kode dan log.

## Umpan balik sejawat

Tukar kode dan log dengan satu teman. Beri tiga hal, tertulis: **satu yang sudah baik**, **satu yang perlu diperbaiki**, dan **satu langkah berikutnya**. Periksa secara khusus: apakah tiap uji punya jawaban hitung tangan yang tertulis sebelum kode, dan apakah log menyebut apa yang belum jalan. Nilai karyanya, bukan orangnya. Penerima membalas dengan satu perubahan yang akan dibuat.

## Latihan bercampur

1. Dari 1000 shot GHZ, hasil `000` muncul 486 kali. Hitung `z` terhadap harapan 500. (`e-xii2-m1`)
2. Bila GHZ tiga qubit mengalami satu kesalahan bit-flip `X` pada qubit 2 setelah CNOT terakhir, hasil apa yang muncul bersama `000` dan `111`? (`e-xii1-m8`)

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `e-xii2-m8` (satu minggu lagi), `e-xii2-m10` (sekitar tiga minggu lagi), dan `e-xii2-m14` (sekitar tujuh minggu lagi). Jawab sekarang lalu simpan.

1. Mengapa kita menguji dengan jawaban hitung tangan sebelum menjalankan kode, bukan sesudahnya?
2. Bila uji GHZ gagal karena peluang `000` bukan 0,5, tiga hal apa yang diperiksa lebih dulu?
3. Tulis uji kecil yang menunjukkan bahwa gerbang `H` adalah kebalikan dirinya sendiri.

## Kesalahan umum

- **"Uji lulus berarti simulator benar."** Uji hanya menyatakan kasus yang diuji lulus.
- **"Kesamaan persis antar bilangan pecahan adalah uji yang baik."** Pakai toleransi kecil untuk hitungan eksak dan simpangan wajar untuk histogram.
- **"Urutan bit tidak penting."** Salah urutan membuat `01` dan `10` tertukar, dan uji GHZ pun tidak mendeteksinya; uji `X` pada satu qubit untuk memeriksanya.
- **"Mulai dengan simulator selengkap mungkin."** Mulai dari kasus terkecil yang punya jawaban hitung tangan.
- **"Log hanya untuk guru."** Log membantu kamu menemukan di mana bug mulai muncul.

## Cek mandiri

- [ ] Saya dapat memecah proyek menjadi langkah kecil yang berakhir dengan uji hijau.
- [ ] Saya menulis jawaban hitung tangan sebelum kode.
- [ ] Saya dapat menjelaskan mengapa histogram diuji dengan simpangan wajar.
- [ ] Saya mencatat log sprint dan pemakaian AI.
- [ ] Saya dapat menyatakan apa yang belum dikerjakan.

## Kunci dan petunjuk

**Ingat kembali.** 1: topik dan pertanyaan, jenis proyek, kriteria selesai terukur, uji tangan beserta jawabannya, rencana sprint, risiko, dan batas klaim. 2: sumber NIST menyebut "banyak" sistem kunci publik, bukan semua; mesin besarnya mungkin masih bertahun-tahun atau puluhan tahun lagi; kunci simetris terdampak lebih kecil. 3: sumber histogram (nyata atau sintetis), tanggal, jumlah shot, tanpa klaim kecepatan atau keunggulan kuantum; arsip sintetis dari model yang sama bersifat melingkar dan tidak membuktikan apa pun tentang perangkat nyata.

**Rencana sprint.** Contoh uji tangan di atas dihitung dengan tangan: `H|0>`: `(1/akar 2)^2` = 0,5; Bell: setengah-setengah; `H`, `Z`, `H` sama dengan `X`.

**Daftar periksa.** Tidak ada jawaban tunggal; pemeriksa memastikan tiap butir bisa dicek orang lain.

**Umpan balik sejawat.** Penilaian berupa tiga kalimat tertulis; tidak ada nilai angka.

**Latihan bercampur.** 1: `(486 - 500) / akar(1000 x 0,25)` = -14 / 15,81 = -0,89; wajar. 2: `X` pada qubit 2 mengubah `000` menjadi `001` dan `111` menjadi `110`, jadi hasil `001` dan `110` muncul bersama `000` dan `111`.

**Ulang berjarak.** 1: jawaban yang ditulis setelah kode mudah ikut-ikutan keluaran program, sehingga uji tidak lagi independen. 2: urutan bit (bit mana qubit 0), penutup bit pada gerbang, dan norma vektor (jumlah kuadrat 1) atau definisi gerbang `H`. 3: `H` dua kali pada `|0>` harus memberi peluang 0 sama dengan 1 (dengan toleransi kecil).

## Langkah berikutnya

Modul berikut: `e-xii2-m8` (proyek akhir: implementasi II). Bacaan pendamping: `e-xii1-m4` dan `e-xii2-m6`.
