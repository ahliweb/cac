## Untuk siapa modul ini

Modul ini untuk murid kelas XII jalur E (komputasi kuantum), minggu `E-XII2-M10` silabus v1.4: proyek akhir, pengujian lanjutan, yaitu memperbaiki dan mengoptimalkan, dengan keluaran versi perbaikan. Prasyarat: modul `e-xii2-m9`. Di luar indeks, bagian kode memerlukan dasar pemrograman setara `A-X1-M9..M12` (C++) atau `B-X1-M9..M12` (TypeScript dengan Bun); proyek studi banding memakai pola uji yang sama pada tabel dan hitungannya. Alat: kertas, kalkulator, dan program C++ di bawah (tanpa akun). Kerja minggu ini satu sprint.

Modul ini berstatus DRAF: karangan penyusun, belum ditinjau pemilik. Jalur E adalah pengayaan di luar rumusan CP; minggu ini tanpa irisan pengayaan, jadi modul ini tidak dihitung memenuhi butir CP mana pun.

Aturan AI jalur ini: AI generatif boleh dipakai dengan etika dan dicatat, tanpa data pribadi, kata sandi, atau tugas bernilai pada permintaanmu, dan tanpa akun wajib. Saran: jawab dulu sendiri, baru minta petunjuk; kode buatan AI kamu baca, jalankan, dan uji. Catat pemakaian AI di log proyek.

Catatan untuk guru: program contoh dikompilasi dan dijalankan penyusun; biaya dihitung dari iterasi loop, bukan jam, supaya sama di semua mesin, dan sirkuit acaknya berbenih tetap (`xorshift64`, bilangan bulat). Pembalikan sirkuit memakai fakta bahwa `H`, `X`, `Z`, dan `CNOT` masing-masing kebalikan dirinya; ini tidak berlaku untuk gerbang rotasi.

## Ingat kembali

Jawab dari ingatan, baru cek di bagian kunci.

1. Mengapa menguji satu model derau saja tidak cukup untuk menyatakan hasil mitigasi benar? (dari `e-xii2-m2`)
2. Bila uji GHZ gagal karena peluang `000` bukan 0,5, tiga hal apa yang diperiksa lebih dulu? (dari `e-xii2-m7`)
3. Sebutkan lima bagian dokumentasi proyek yang kamu tulis. (dari `e-xii2-m9`)

## Tujuan

Setelah modul ini kamu dapat:

- menulis uji sifat (norma tetap 1, urutan dibalik mengembalikan keadaan awal);
- memperbaiki atau mengoptimalkan satu bagian kode dan membuktikan hasilnya tidak berubah dengan uji regresi;
- melaporkan biaya dengan ukuran yang jujur (jumlah iterasi), bukan angka waktu yang tidak diukur;
- mencatat apa yang diperbaiki, mengapa, dan apa yang tetap belum diuji.

Keluaran yang diminta silabus: versi perbaikan.

## Rencana sprint

**Tujuan sprint satu kalimat:** "satu perbaikan atau optimasi masuk, dan tiga uji (sifat, regresi, mutasi) tetap hijau". Urutan: (1) simpan versi lama sebagai pembanding; (2) tulis uji sifat; (3) ubah satu hal saja; (4) bandingkan versi baru dan lama pada sirkuit yang sama; (5) rusak satu bagian dan pastikan ujinya menangkapnya.

**Dua uji sifat.** *Norma*: jumlah kuadrat amplitudo tetap 1 setelah gerbang apa pun. *Pembalikan*: karena `H`, `X`, `Z`, dan `CNOT` kebalikan dirinya, menerapkan sirkuit lalu urutannya dibalik harus mengembalikan `|0...0>`. Keduanya berlaku untuk sirkuit acak, jadi satu program menguji banyak kasus; jawaban tangan tetap perlu untuk kasus bernilai (`e-xii2-m8`).

**Optimasi.** Versi awal `H` menjelajah semua `2^n` indeks dan melewati separuhnya; versi perbaikan menjelajah hanya `2^(n-1)` pasangan. Optimasi hanya sah bila vektor hasilnya sama; itulah uji regresi.

```cpp
#include <cmath>
#include <cstdint>
#include <cstdio>
#include <utility>
#include <vector>

// Simulator amplitudo real; qubit 0 adalah bit paling kiri pada indeks.
class Simulator {
public:
    explicit Simulator(int n) : n_(n), v_(size_t(1) << n, 0.0) { v_[0] = 1.0; }

    // Versi awal: lewati separuh indeks di dalam loop.
    void h_lambat(int q) {
        const double s = 1.0 / std::sqrt(2.0);
        size_t bit = mask(q);
        for (size_t i = 0; i < v_.size(); i++) {
            iterasi++;
            if (i & bit) continue;
            double a = v_[i], b = v_[i | bit];
            v_[i] = s * (a + b);
            v_[i | bit] = s * (a - b);
        }
    }
    // Versi perbaikan: hanya menjelajah pasangan (indeks dengan bit q = 0).
    void h_cepat(int q) {
        const double s = 1.0 / std::sqrt(2.0);
        size_t bit = mask(q);
        for (size_t k = 0; k < v_.size() / 2; k++) {
            iterasi++;
            size_t rendah = k & (bit - 1);
            size_t i = ((k & ~(bit - 1)) << 1) | rendah;
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
    double norma() const {
        double s = 0.0;
        for (double a : v_) s += a * a;
        return s;
    }
    double peluang(size_t i) const { return v_[i] * v_[i]; }
    double selisih_maks(const Simulator& lain) const {
        double m = 0.0;
        for (size_t i = 0; i < v_.size(); i++) m = std::fmax(m, std::fabs(v_[i] - lain.v_[i]));
        return m;
    }
    long iterasi = 0;

private:
    size_t mask(int q) const { return size_t(1) << (n_ - 1 - q); }
    int n_;
    std::vector<double> v_;
};

struct Gerbang {
    int jenis;  // 0 = H, 1 = X, 2 = Z, 3 = CNOT
    int a, b;
};

uint64_t keadaan = 12345;  // benih tetap
uint64_t acak() {          // xorshift64
    keadaan ^= keadaan << 13;
    keadaan ^= keadaan >> 7;
    keadaan ^= keadaan << 17;
    return keadaan;
}

std::vector<Gerbang> sirkuit_acak(int n, int panjang) {
    std::vector<Gerbang> s;
    for (int k = 0; k < panjang; k++) {
        Gerbang g;
        g.jenis = int(acak() % 4);
        g.a = int(acak() % n);
        g.b = (g.a + 1 + int(acak() % (n - 1))) % n;  // berbeda dari a
        s.push_back(g);
    }
    return s;
}

void terapkan(Simulator& sim, const Gerbang& g, bool cepat) {
    if (g.jenis == 0) {
        if (cepat) sim.h_cepat(g.a);
        else sim.h_lambat(g.a);
    } else if (g.jenis == 1) sim.x(g.a);
    else if (g.jenis == 2) sim.z(g.a);
    else sim.cnot(g.a, g.b);
}

int main() {
    const int n = 4;
    std::vector<Gerbang> s = sirkuit_acak(n, 200);
    int gagal = 0;

    // Uji sifat 1: norma tetap 1 setelah tiap gerbang.
    Simulator a(n);
    double penyimpangan = 0.0;
    for (const Gerbang& g : s) {
        terapkan(a, g, false);
        penyimpangan = std::fmax(penyimpangan, std::fabs(a.norma() - 1.0));
    }
    bool ok1 = penyimpangan < 1e-12;
    std::printf("uji norma, 200 gerbang acak: penyimpangan maksimum < 1e-12: %s\n", ok1 ? "OK" : "GAGAL");
    if (!ok1) gagal++;

    // Uji sifat 2: keempat gerbang adalah kebalikan dirinya, jadi urutan dibalik mengembalikan |0000>.
    for (size_t k = s.size(); k-- > 0;) terapkan(a, s[k], false);
    bool ok2 = std::fabs(a.peluang(0) - 1.0) < 1e-9;
    std::printf("uji balik urutan: peluang 0000 kembali 1: %s\n", ok2 ? "OK" : "GAGAL");
    if (!ok2) gagal++;

    // Uji regresi: versi perbaikan harus memberi vektor yang sama dengan versi awal.
    Simulator lama(n), baru(n);
    for (const Gerbang& g : s) {
        terapkan(lama, g, false);
        terapkan(baru, g, true);
    }
    bool ok3 = lama.selisih_maks(baru) < 1e-12;
    std::printf("uji regresi H lambat vs cepat: vektor sama: %s\n", ok3 ? "OK" : "GAGAL");
    if (!ok3) gagal++;

    // Biaya dihitung dengan iterasi loop, bukan jam: sama di semua mesin.
    int jumlah_h = 0;
    for (const Gerbang& g : s)
        if (g.jenis == 0) jumlah_h++;
    std::printf("jumlah H dalam sirkuit: %d\n", jumlah_h);
    std::printf("iterasi loop H: lambat %ld, cepat %ld (n = %d)\n", lama.iterasi, baru.iterasi, n);

    // Uji mutasi: rusak sengaja satu gerbang; uji balik urutan harus menangkapnya.
    Simulator m(n);
    for (const Gerbang& g : s) terapkan(m, g, false);
    m.z(0);  // gerbang sisipan yang tidak ada dalam sirkuit
    for (size_t k = s.size(); k-- > 0;) terapkan(m, s[k], false);
    bool tertangkap = std::fabs(m.peluang(0) - 1.0) > 1e-9;
    std::printf("uji mutasi (Z sisipan): peluang 0000 setelah balik = %.4f, tertangkap: %s\n", m.peluang(0),
                tertangkap ? "ya" : "tidak");
    if (!tertangkap) gagal++;

    std::printf(gagal == 0 ? "semua uji lulus\n" : "ada uji gagal\n");
    return gagal == 0 ? 0 : 1;
}
```

Keluaran asli (dikompilasi penyusun dengan `g++ -std=c++17 -Wall -Wextra`, lalu dijalankan):

```text
uji norma, 200 gerbang acak: penyimpangan maksimum < 1e-12: OK
uji balik urutan: peluang 0000 kembali 1: OK
uji regresi H lambat vs cepat: vektor sama: OK
jumlah H dalam sirkuit: 58
iterasi loop H: lambat 928, cepat 464 (n = 4)
uji mutasi (Z sisipan): peluang 0000 setelah balik = 0.0000, tertangkap: ya
semua uji lulus
```

Bacaan hasilnya. Tiga uji pertama lulus. Sirkuit memuat 58 gerbang `H`; versi lama memakai `58 x 16` = 928 iterasi dan versi baru `58 x 8` = 464, setengahnya, dengan vektor yang sama. Penghematannya setengah per gerbang `H` pada `n` qubit mana pun, dan iterasi bukan waktu: waktu bergantung mesin dan harus diukur berulang bila dilaporkan. Uji mutasi menangkap `Z` sisipan karena peluang `0000` turun jauh dari 1. Uji ini tidak selalu menangkap: bila qubit sedang di keadaan `|0>`, `Z` tidak mengubah apa pun, sehingga gangguan itu tidak terlihat.

**Log sprint** (satu sampai tiga kalimat per hari kerja): perubahan tunggal hari ini, uji yang menjaganya, hasil regresi, dan catatan pemakaian AI.

## Daftar periksa

- [ ] Tujuan sprint satu kalimat tertulis di log.
- [ ] Versi lama disimpan sebagai pembanding.
- [ ] Uji norma dan uji pembalikan (atau uji sifat setara untuk proyekmu) lulus.
- [ ] Tepat satu perubahan per langkah, dan tiap perubahan diikuti uji regresi.
- [ ] Biaya dilaporkan dengan iterasi atau pengukuran waktu berulang, bukan taksiran.
- [ ] Satu uji mutasi dijalankan, dan batas kemampuannya dicatat.
- [ ] Log pemakaian AI terisi.
- [ ] Tidak ada data pribadi, nama murid, token, atau kunci di kode dan log.

## Umpan balik sejawat

Tukar kode dan log dengan satu teman. Beri tiga hal, tertulis: **satu yang sudah baik**, **satu yang perlu diperbaiki**, dan **satu langkah berikutnya**. Periksa: apakah tiap optimasi punya uji regresi terhadap versi lama, dan apakah klaim biaya didukung ukuran yang jujur. Penerima membalas dengan satu perubahan yang akan dibuat.

## Latihan bercampur

1. Pada `n = 10` qubit, berapa iterasi loop satu gerbang `H` pada versi lama dan baru, dan berapa total untuk 40 gerbang `H`? (`e-xii2-m10`)
2. Tulis uji kecil yang menunjukkan bahwa `X` adalah kebalikan dirinya sendiri pada satu qubit. (`e-xii2-m7`)

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `e-xii2-m11` (satu minggu lagi), `e-xii2-m13` (sekitar tiga minggu lagi), dan `e-xii2-m14` (empat minggu lagi). Jawab sekarang lalu simpan.

1. Sebutkan dua sifat yang dapat diuji tanpa jawaban hitung tangan per kasus.
2. Mengapa mengoptimalkan sebelum ada uji hijau berbahaya, dan apa yang menjaga agar optimasi tidak mengubah hasil?
3. Bagaimana menguji bahwa urutan gerbang yang dibalik mengembalikan keadaan awal, dan gerbang mana yang boleh diuji dengan cara itu?

## Kesalahan umum

- **"Optimasi aman asal programnya jalan."** Tanpa uji regresi, hasil salah pun terlihat "jalan".
- **"Iterasi sama dengan waktu."** Iterasi adalah hitungan kerja; waktu bergantung mesin.
- **"Mengubah beberapa hal sekaligus menghemat waktu."** Bila uji gagal, penyebabnya tak terlacak.
- **"Uji mutasi pasti menangkap kerusakan."** Ia hanya menangkap yang mengubah hasil pada keadaan yang diuji.
- **"Uji sifat menggantikan jawaban hitung tangan."** Uji sifat menjaga banyak kasus; hitung tangan menjaga kebenaran nilai.

## Cek mandiri

- [ ] Saya dapat menulis uji norma dan uji pembalikan.
- [ ] Saya dapat membuktikan optimasi tidak mengubah hasil.
- [ ] Saya dapat melaporkan biaya dengan ukuran yang jujur.
- [ ] Saya dapat menjelaskan batas uji mutasi.
- [ ] Saya mencatat log sprint dan pemakaian AI.

## Kunci dan petunjuk

**Ingat kembali.** 1: satu model derau hanya menguji satu keadaan dunia; hasil bisa kebetulan cocok, jadi uji beberapa model dan bandingkan dengan tanpa mitigasi. 2: urutan bit (qubit 0 yang mana), definisi gerbang atau penutup bit, dan norma vektor (jumlah kuadrat 1); lalu jumlah shot dan benih. 3: Pertanyaan, Cara menjalankan, Hasil, Batas klaim, Privasi dan AI.

**Rencana sprint.** Keluaran di atas: norma tetap 1 (penyimpangan di bawah `1e-12`), pembalikan mengembalikan peluang `0000` ke 1, vektor lama dan baru sama, 928 lawan 464 iterasi, dan mutasi `Z` tertangkap.

**Daftar periksa.** Tidak ada jawaban tunggal; pemeriksa memastikan tiap butir bisa dicek orang lain.

**Umpan balik sejawat.** Penilaian berupa tiga kalimat tertulis; tidak ada nilai angka.

**Latihan bercampur.** 1: versi lama `2^10` = 1024 iterasi per `H`, versi baru `2^9` = 512; untuk 40 gerbang `H`: 40.960 dan 20.480. 2: terapkan `X` dua kali pada `|0>` lalu periksa peluang `0` sama dengan 1 (dengan toleransi kecil), dan periksa juga setelah satu kali `X` peluang `1` sama dengan 1.

**Ulang berjarak.** 1: norma tetap 1 dan pembalikan urutan mengembalikan keadaan awal (untuk gerbang yang kebalikan dirinya). 2: perubahan tanpa pembanding tidak dapat dibuktikan benar; uji regresi terhadap versi lama menjaga hasil, dan tiap langkah hanya satu perubahan. 3: terapkan sirkuit lalu gerbang yang sama dalam urutan terbalik dan periksa peluang keadaan awal 1; berlaku untuk `H`, `X`, `Z`, `CNOT`, tidak untuk gerbang rotasi dengan sudut sembarang.

## Langkah berikutnya

Modul berikut: `e-xii2-m11` (proyek akhir: presentasi). Bacaan pendamping: `e-xii2-m7` dan `e-xii2-m8`.
