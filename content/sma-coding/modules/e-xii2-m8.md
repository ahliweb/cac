## Untuk siapa modul ini

Modul ini untuk murid kelas XII jalur E (komputasi kuantum), minggu `E-XII2-M8` silabus v1.4: proyek akhir, implementasi II, yaitu menguji dan membandingkan dengan perhitungan tangan, dengan keluaran uji dan catatan. Prasyarat: modul `e-xii1-m14`; modul `e-xii2-m7` (inti proyek dan log sprint pertamamu) belum terindeks, jadi guru memeriksanya. Di luar indeks, bagian kode memerlukan dasar pemrograman setara `A-X1-M9..M12` (C++) atau `B-X1-M9..M12` (TypeScript dengan Bun); proyek studi banding memakai tabel yang sama untuk angka sumber. Alat: kertas, kalkulator, dan program C++ di bawah (tanpa akun). Kerja minggu ini satu sprint.

Modul ini berstatus DRAF: karangan penyusun, belum ditinjau pemilik. Jalur E adalah pengayaan di luar rumusan CP; minggu ini tanpa irisan pengayaan, jadi modul ini tidak dihitung memenuhi butir CP mana pun.

Aturan AI jalur ini: AI generatif boleh dipakai dengan etika dan dicatat, tanpa data pribadi, kata sandi, atau tugas bernilai pada permintaanmu, dan tanpa akun wajib. Saran: jawab dulu sendiri, baru minta petunjuk; kode buatan AI kamu baca, jalankan, dan uji. Catat pemakaian AI di log proyek.

Catatan untuk guru: program contoh dikompilasi dan dijalankan penyusun; angka hitung tangan dihitung dari `sin^2((2t + 1) theta)` dengan `sin(theta) = 1/akar 8`, dan `theta` dari halaman "Analysis" kursus IBM Quantum Learning tentang Grover, per tanggal akses 2026-11-19. Kelas `Simulator` di sini hanya memuat gerbang yang dipakai.

## Ingat kembali

Jawab dari ingatan, baru cek di bagian kunci.

1. Mengapa kita menguji dengan jawaban hitung tangan sebelum menjalankan kode, bukan sesudahnya? (dari `e-xii2-m7`)
2. Mengapa hasil yang cocok dengan perhitungan tangan lebih meyakinkan daripada hasil yang cocok dengan program yang sama? (dari `e-xii2-m5`)
3. Mengapa histogram 1000 shot dari peluang 0,5 tidak persis 500, dan berapa simpangan wajarnya? (dari `e-xii2-m1`)

## Tujuan

Setelah modul ini kamu dapat:

- menulis tabel uji berisi jawaban hitung tangan, toleransi, dan hasil program sebelum membandingkannya;
- memilih toleransi yang sesuai: sangat kecil untuk hitungan eksak, simpangan wajar untuk histogram;
- menjalankan uji mutasi dan menjelaskan mengapa uji yang tetap lulus pada kode rusak belum menguji bagian itu;
- mencatat selisih dan keputusanmu di log sprint.

Keluaran yang diminta silabus: uji dan catatan.

## Rencana sprint

Sprint ini melanjutkan `e-xii2-m7`. **Tujuan sprint satu kalimat:** "tabel uji hitung tangan untuk satu kasus yang lebih rumit lulus, dan uji mutasi gagal sebagaimana mestinya". Contoh di bawah memakai Grover pada `N = 8` (tiga qubit, item bertanda indeks 5), kasus yang menguji lebih banyak bagian daripada GHZ.

**Langkahnya.** (1) Tulis dulu tabel: `t`, jawaban tangan, toleransi. (2) Jalankan kode. (3) Selisih harus di bawah toleransi. (4) Rusak satu bagian kode dengan sengaja; tabel harus gagal.

**Jawaban tangan.** `sin(theta) = 1/akar 8`, `P(t) = sin^2((2t + 1) theta)`: `t = 0`: `1/8`; `t = 1`: `25/32`; `t = 2`: `121/128`; `t = 3`: `169/512`. Karena nilainya eksak, toleransinya `1e-12` (pembulatan bilangan pecahan, bukan simpangan shot).

```cpp
#include <cmath>
#include <cstdio>
#include <vector>

// Simulator amplitudo real. Qubit 0 adalah bit paling kiri pada indeks.
class Simulator {
public:
    explicit Simulator(int n) : n_(n), v_(size_t(1) << n, 0.0) { v_[0] = 1.0; }

    void h(int q) {
        const double s = 1.0 / std::sqrt(2.0);
        size_t bit = size_t(1) << (n_ - 1 - q);
        for (size_t i = 0; i < v_.size(); i++) {
            if (i & bit) continue;
            double a = v_[i], b = v_[i | bit];
            v_[i] = s * (a + b);
            v_[i | bit] = s * (a - b);
        }
    }
    void h_semua() {
        for (int q = 0; q < n_; q++) h(q);
    }
    // Oracle: balik tanda amplitudo item bertanda.
    void oracle(size_t bertanda) { v_[bertanda] = -v_[bertanda]; }
    // 2|0><0| - I : tanda semua amplitudo berbalik kecuali indeks 0.
    void balik_kecuali_nol() {
        for (size_t i = 1; i < v_.size(); i++) v_[i] = -v_[i];
    }
    // Satu pengulangan Grover: oracle, lalu difusi H^n (2|0><0| - I) H^n.
    // Bila rusak == true, H^n terakhir sengaja dilupakan (untuk uji mutasi).
    void grover(size_t bertanda, bool rusak) {
        oracle(bertanda);
        h_semua();
        balik_kecuali_nol();
        if (!rusak) h_semua();
    }
    double peluang(size_t i) const { return v_[i] * v_[i]; }

private:
    int n_;
    std::vector<double> v_;
};

struct Baris {
    int t;
    double tangan;
    double toleransi;
};

// Jawaban tangan dihitung lebih dulu: sin(theta) = 1/akar(8), P(t) = sin^2((2t+1) theta).
const Baris TABEL[] = {
    {0, 0.125, 1e-12},        // 1/8
    {1, 0.78125, 1e-12},      // 25/32
    {2, 0.9453125, 1e-12},    // 121/128
    {3, 0.330078125, 1e-12},  // 169/512
};

int jalankan(bool rusak) {
    int gagal = 0;
    for (const Baris& b : TABEL) {
        Simulator s(3);
        s.h_semua();
        for (int k = 0; k < b.t; k++) s.grover(5, rusak);
        double sim = s.peluang(5);
        double selisih = std::fabs(sim - b.tangan);
        bool ok = selisih < b.toleransi;
        if (!ok) gagal++;
        if (selisih < 1e-12)
            std::printf("t=%d  tangan %.7f  simulator %.7f  selisih <1e-12  %s\n", b.t, b.tangan,
                        sim, ok ? "OK" : "GAGAL");
        else
            std::printf("t=%d  tangan %.7f  simulator %.7f  selisih %.2f  %s\n", b.t, b.tangan,
                        sim, selisih, ok ? "OK" : "GAGAL");
    }
    return gagal;
}

int main() {
    std::printf("Uji biasa:\n");
    int g1 = jalankan(false);
    std::printf("Uji mutasi (H^n terakhir dihapus), HARUS gagal:\n");
    int g2 = jalankan(true);
    bool ok = (g1 == 0) && (g2 > 0);
    std::printf(ok ? "tabel uji sehat\n" : "tabel uji bermasalah\n");
    return ok ? 0 : 1;
}
```

Keluaran asli (dikompilasi penyusun dengan `g++ -std=c++17 -Wall -Wextra`, lalu dijalankan):

```text
Uji biasa:
t=0  tangan 0.1250000  simulator 0.1250000  selisih <1e-12  OK
t=1  tangan 0.7812500  simulator 0.7812500  selisih <1e-12  OK
t=2  tangan 0.9453125  simulator 0.9453125  selisih <1e-12  OK
t=3  tangan 0.3300781  simulator 0.3300781  selisih <1e-12  OK
Uji mutasi (H^n terakhir dihapus), HARUS gagal:
t=0  tangan 0.1250000  simulator 0.1250000  selisih <1e-12  OK
t=1  tangan 0.7812500  simulator 0.0625000  selisih 0.72  GAGAL
t=2  tangan 0.9453125  simulator 0.5000000  selisih 0.45  GAGAL
t=3  tangan 0.3300781  simulator 0.5625000  selisih 0.23  GAGAL
tabel uji sehat
```

Bacaan hasilnya. Keempat baris uji biasa lulus. Pada uji mutasi, `t = 0` tetap lulus karena belum ada pengulangan Grover yang dijalankan, jadi baris itu tidak menyentuh bagian yang dirusak; `t = 1` sampai `3` gagal dengan selisih besar. Uji yang tidak pernah bisa gagal tidak menjaga apa pun. Untuk histogram (bukan nilai eksak) toleransinya simpangan wajar `akar(shot x p x (1 - p))`, seperti di `e-xii2-m1`, bukan `1e-12`.

**Log sprint** (satu sampai tiga kalimat per hari kerja): selisih terbesar yang kamu temukan, keputusan (kode diperbaiki atau tabel dikoreksi, dan alasannya), dan catatan pemakaian AI. Salah hitung di jawaban tangan dicatat juga.

## Daftar periksa

- [ ] Tujuan sprint satu kalimat tertulis di log.
- [ ] Tabel uji ditulis (jawaban tangan dan toleransi) sebelum kode dijalankan.
- [ ] Toleransi eksak dan toleransi histogram dibedakan.
- [ ] Satu uji mutasi dijalankan dan gagal sebagaimana mestinya.
- [ ] Selisih terbesar dan keputusanmu dicatat di log.
- [ ] Log pemakaian AI terisi.
- [ ] Tidak ada data pribadi, nama murid, token, atau kunci di kode dan log.

## Umpan balik sejawat

Tukar tabel uji dan log dengan satu teman. Beri tiga hal, tertulis: **satu yang sudah baik**, **satu yang perlu diperbaiki**, dan **satu langkah berikutnya**. Periksa dua hal: apakah jawaban tangan bisa dihitung ulang orang lain, dan apakah ada uji yang pasti gagal bila suatu bagian dirusak. Penerima membalas dengan satu perubahan yang akan dibuat.

## Latihan bercampur

1. Tulis baris tabel uji untuk Grover `N = 4` dengan satu item bertanda dan `t = 1`, lengkap dengan jawaban tangannya. (`e-xii1-m5`)
2. Simulatormu memberi histogram 1000 shot dengan 790 hasil benar pada `N = 8`, `t = 1`. Hitung `z` terhadap harapan `25/32` dan nilailah. (`e-xii2-m1`)

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `e-xii2-m9` (satu minggu lagi), `e-xii2-m11` (sekitar tiga minggu lagi), dan `e-xii2-m14` (enam minggu lagi). Jawab sekarang lalu simpan.

1. Mengapa selisih di bawah toleransi pada satu kasus tidak membuktikan simulator benar untuk semua kasus?
2. Pada Grover `N = 8`, mengapa peluang `t = 3` lebih kecil daripada `t = 2`?
3. Bila tabel uji tetap lulus setelah kode dirusak sengaja, apa artinya bagi tabel itu?

## Kesalahan umum

- **"Tabel uji lulus berarti proyek benar."** Ia hanya menyatakan baris yang diuji lulus.
- **"Toleransi boleh dilonggarkan sampai uji lulus."** Toleransi ditetapkan sebelum membandingkan, dari sifat hitungan (eksak atau histogram).
- **"Kalau tidak cocok, pasti kodenya yang salah."** Jawaban tangan juga bisa salah hitung; periksa keduanya.
- **"Nol pengulangan juga uji Grover."** Baris `t = 0` hanya memeriksa keadaan awal.

## Cek mandiri

- [ ] Saya dapat menulis tabel uji dengan jawaban tangan sebelum menjalankan kode.
- [ ] Saya dapat memilih toleransi eksak dan toleransi histogram.
- [ ] Saya dapat menjelaskan apa yang dibuktikan dan tidak dibuktikan oleh uji mutasi.
- [ ] Saya mencatat selisih dan keputusan di log sprint.
- [ ] Saya dapat menyatakan bagian proyekku yang belum teruji.

## Kunci dan petunjuk

**Ingat kembali.** 1: jawaban yang ditulis setelah kode mudah ikut-ikutan keluaran program, sehingga uji tidak independen. 2: program yang sama dapat salah dengan cara yang sama (kesalahan yang diwarisi), sedangkan kertas adalah jalan hitung yang terpisah. 3: shot adalah sampel acak; simpangan wajar `akar(1000 x 0,25)` = 15,81, jadi hasil sekitar 484 sampai 516 pada satu simpangan.

**Rencana sprint.** Jawaban tangan: `theta = asin(1/akar 8)` = 0,3614 rad; `sin^2(theta)` = 0,125; `sin^2(3 theta)` = 0,78125; `sin^2(5 theta)` = 0,9453125; `sin^2(7 theta)` = 0,330078125 (dihitung ulang penyusun dengan program kecil terpisah). Selisih uji biasa di bawah `1e-12`; pada uji mutasi `t = 0` lulus sedangkan `t = 1`, `2`, `3` gagal.

**Daftar periksa.** Tidak ada jawaban tunggal; pemeriksa memastikan tiap butir bisa dicek orang lain.

**Umpan balik sejawat.** Penilaian berupa tiga kalimat tertulis; tidak ada nilai angka.

**Latihan bercampur.** 1: `sin(theta) = 1/2`, `theta` = 30 derajat; `sin^2(3 theta)` = `sin^2(90 derajat)` = 1; baris: `t = 1`, jawaban tangan `1,0`, toleransi `1e-12`. 2: simpangan `akar(1000 x 0,78125 x 0,21875)` = 13,07; `z = (790 - 781,25) / 13,07` = 0,67, jadi wajar (dalam tiga simpangan).

**Ulang berjarak.** 1: uji hanya memeriksa kasus yang diuji; bagian lain, ukuran lain, atau kasus tepi bisa saja salah, dan jawaban tangan pun bisa salah. 2: amplitudo item bertanda berputar melewati titik terbaik pada `t = 3` (sudut `7 theta` melewati 90 derajat), jadi `sin^2` turun. 3: tabel itu tidak menguji bagian yang dirusak, sehingga perlu kasus yang menyentuh bagian tersebut.

## Langkah berikutnya

Modul berikut: `e-xii2-m9` (proyek akhir: pengujian dan dokumentasi). Bacaan pendamping: `e-xii1-m5` dan `e-xii2-m7`.
