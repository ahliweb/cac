## Untuk siapa modul ini

Modul ini untuk murid kelas XII jalur E (komputasi kuantum), minggu `E-XII1-M4` silabus v1.4: Grover II, yaitu menjelaskan operator difusi dan amplifikasi amplitudo, dengan keluaran diagram amplitudo per pengulangan. Prasyarat: modul `e-xii1-m3` (Grover I). Di luar indeks, bagian kode memerlukan simulator n qubit `e-xi2-m4` dan dasar pemrograman setara `A-X1-M9..M12` (C++) atau `B-X1-M9..M12` (TypeScript/Bun); guru memeriksanya. Bagian konsep dan hitungan terbuka bagi semua murid. Alat: kertas, kalkulator, dan simulatormu (tanpa akun).

Modul ini berstatus DRAF: karangan penyusun, belum ditinjau pemilik. Jalur E adalah pengayaan di luar rumusan CP; minggu ini tanpa irisan pengayaan, jadi modul ini tidak dihitung memenuhi butir CP mana pun.

Aturan AI jalur ini: AI generatif boleh dipakai dengan etika dan dicatat, tanpa data pribadi, kata sandi, atau tugas bernilai pada permintaanmu, dan tanpa akun wajib. Saran: jawab dulu sendiri, baru minta petunjuk bertahap; kode buatan AI kamu baca, jalankan, dan uji. Setiap soal `Latihan` bertanda `AI: boleh` atau `AI: tanpa AI`.

Catatan untuk guru: bahwa difusi `H Z_OR H` sama dengan `2|u><u| - I` (dengan `|u>` keadaan seragam), dan bahwa Grover memutar keadaan dalam bidang dua arah (bertanda dan tak bertanda), dibaca penyusun dari halaman IBM Quantum Learning "Analysis" pada pelajaran algoritma Grover, per 2026-11-19. Tafsiran "cermin terhadap rata-rata" adalah cara menghitung yang sama, ditulis ulang oleh penyusun dan dicocokkan dengan versi gerbang oleh program di bawah. Tiga item bukan jumlah item yang dapat dibuat dari qubit utuh; contoh tiga item hanyalah model aritmetika cermin. Tidak ada klaim tentang perangkat nyata.

## Ingat kembali

Jawab dari ingatan, baru cek di bagian kunci.

1. Dengan empat item dan satu item bertanda, berapa pengulangan Grover yang membuat peluang item bertanda 1, dan berapa peluangnya setelah dua pengulangan? (dari `e-xii1-m3`)
2. Apa yang terjadi pada hasil Bernstein-Vazirani bila `f` melanggar janji? Beri contoh. (dari `e-xii1-m1`)
3. Mengapa jumlah query klasik terburuk untuk membedakan fungsi konstan dari seimbang pada `n` bit adalah `2^(n-1) + 1`? (dari `e-xi2-m10`)

## Tujuan

Setelah modul ini kamu dapat:

- menjelaskan difusi sebagai cermin terhadap rata-rata amplitudo;
- menelusuri tiga dan empat item dengan tangan dan menggambar diagram amplitudo per pengulangan;
- menunjukkan, dengan simulasi, bahwa cermin rata-rata sama dengan difusi gerbang `H Z_OR H` dan membaca amplifikasi pada delapan item.

Keluaran yang diminta silabus: diagram amplitudo per pengulangan.

## Prediksi dulu

Tebak dan tulis: (1) pada tiga item (model aritmetika) dengan satu item bertanda, berapa rata-rata amplitudo setelah oracle, dan apakah peluang item bertanda sesudah satu cermin mencapai 1; (2) pada empat item, berapa amplitudo tiap item sesudah satu pengulangan; (3) pada delapan item, apakah peluang item bertanda terus naik pada pengulangan ketiga dan keempat.

## Contoh terselesaikan

**Cermin terhadap rata-rata.** Misalkan `r` rata-rata semua amplitudo. Difusi mengganti tiap amplitudo `a_i` dengan `2r - a_i`: yang di atas rata-rata turun, yang di bawah rata-rata naik, masing-masing sejauh pantulan terhadap `r`. Alasannya: `H Z_OR H` sama dengan `2|u><u| - I`; perkalian dengan `|u><u|` menghitung rata-rata, jadi komponen ke-`i` menjadi `2r - a_i`.

**Mengapa memperkuat.** Setelah oracle, amplitudo item bertanda negatif, jauh di bawah rata-rata, sehingga dipantulkan jauh ke atas; yang lain hanya sedikit turun. Itu amplifikasi amplitudo.

**Empat item, item ke-2 ditandai.** Awal `(0,5; 0,5; 0,5; 0,5)`; setelah oracle `(0,5; 0,5; -0,5; 0,5)`; rata-rata `1/4`; cermin: `2 x 0,25 - a_i` memberi `(0; 0; 1; 0)`. Peluang 1.

**Tiga item, item ke-2 ditandai.** Awal `(1; 1; 1)` dibagi akar3; setelah oracle `(1; 1; -1)` dibagi akar3; rata-rata `1/(3 akar3)`; cermin memberi `(-1; -1; 5)` dibagi `3 akar3`, yaitu `(-0,1925; -0,1925; 0,9623)`. Peluang `25/27`, kira-kira 0,9259, belum 1.

```cpp
#include <cmath>
#include <cstdio>
#include <vector>

using Vektor = std::vector<double>;

const double H1 = 1.0 / std::sqrt(2.0);
const int N = 3;  // tiga qubit, delapan item (dipakai untuk pencocokan dengan gerbang)

void balik_fase(Vektor& a, int m) { a[m] = -a[m]; }

// Difusi sebagai "cermin terhadap rata-rata": a_i menjadi 2 * rata - a_i.
void balik_rata(Vektor& a) {
    double jumlah = 0.0;
    for (double x : a) jumlah += x;
    double rata = jumlah / a.size();
    for (double& x : a) x = 2.0 * rata - x;
}

void cetak(const char* nama, const Vektor& a) {
    std::printf("  %-18s", nama);
    for (double x : a) std::printf(" %8.4f", x);
    std::printf("\n");
}

void telusuri(int banyak_item, int ditandai) {
    Vektor a(banyak_item, 1.0 / std::sqrt(double(banyak_item)));
    std::printf("%d item, item ke-%d ditandai\n", banyak_item, ditandai);
    cetak("awal", a);
    balik_fase(a, ditandai);
    cetak("sesudah oracle", a);
    balik_rata(a);
    cetak("sesudah cermin rata", a);
    std::printf("  peluang item ditandai: %.4f\n", a[ditandai] * a[ditandai]);
}

// Versi gerbang untuk tiga qubit: H, Z_OR, H.
void gerbang_h(Vektor& v, int k) {
    int geser = N - 1 - k;
    for (size_t i = 0; i < v.size(); i++) {
        if (((i >> geser) & 1) == 0) {
            size_t j = i | (size_t(1) << geser);
            double a = v[i], b = v[j];
            v[i] = H1 * (a + b);
            v[j] = H1 * (a - b);
        }
    }
}

void difusi_gerbang(Vektor& v) {
    for (int k = 0; k < N; k++) gerbang_h(v, k);
    for (size_t i = 1; i < v.size(); i++) v[i] = -v[i];  // Z_OR
    for (int k = 0; k < N; k++) gerbang_h(v, k);
}

int main() {
    telusuri(3, 2);  // model abstrak: tiga item tidak dapat dibuat dari qubit utuh
    telusuri(4, 2);

    std::printf("8 item, item ke-5 ditandai, per pengulangan\n");
    Vektor a(8, 1.0 / std::sqrt(8.0));
    Vektor g(8, 0.0);
    g[0] = 1.0;
    for (int k = 0; k < N; k++) gerbang_h(g, k);
    double beda = 0.0;
    for (int t = 0; t <= 4; t++) {
        std::printf("  t=%d  ditandai %8.4f  tiap yang lain %8.4f  peluang ditandai %.4f\n", t, a[5], a[0], a[5] * a[5]);
        balik_fase(a, 5);
        balik_rata(a);
        balik_fase(g, 5);
        difusi_gerbang(g);
        for (int i = 0; i < 8; i++) beda = std::fmax(beda, std::fabs(a[i] - g[i]));
    }
    std::printf("cermin rata-rata sama dengan H, Z_OR, H: %s\n", beda < 1e-12 ? "ya" : "tidak");
    return 0;
}
```

Keluaran asli (dikompilasi penyusun dengan `g++ -std=c++17 -Wall -Wextra`, lalu dijalankan):

```text
3 item, item ke-2 ditandai
  awal                 0.5774   0.5774   0.5774
  sesudah oracle       0.5774   0.5774  -0.5774
  sesudah cermin rata  -0.1925  -0.1925   0.9623
  peluang item ditandai: 0.9259
4 item, item ke-2 ditandai
  awal                 0.5000   0.5000   0.5000   0.5000
  sesudah oracle       0.5000   0.5000  -0.5000   0.5000
  sesudah cermin rata   0.0000   0.0000   1.0000   0.0000
  peluang item ditandai: 1.0000
8 item, item ke-5 ditandai, per pengulangan
  t=0  ditandai   0.3536  tiap yang lain   0.3536  peluang ditandai 0.1250
  t=1  ditandai   0.8839  tiap yang lain   0.1768  peluang ditandai 0.7812
  t=2  ditandai   0.9723  tiap yang lain  -0.0884  peluang ditandai 0.9453
  t=3  ditandai   0.5745  tiap yang lain  -0.3094  peluang ditandai 0.3301
  t=4  ditandai  -0.1105  tiap yang lain  -0.3757  peluang ditandai 0.0122
cermin rata-rata sama dengan H, Z_OR, H: ya
```

Bacaan hasil. Tiga dan empat item cocok dengan hitungan tangan di atas. Pada delapan item amplitudo item bertanda naik `0,3536`, `0,8839`, `0,9723`, lalu turun menjadi `0,5745` pada pengulangan ketiga: peluangnya `0,1250`, `0,7812`, `0,9453`, lalu jatuh ke `0,3301` dan `0,0122`. Tanda amplitudo yang lain berbalik menjadi negatif; itu tidak mengubah peluang. Program juga memastikan cermin rata-rata sama dengan versi gerbang `H, Z_OR, H` pada tiga qubit. Jadi ada jumlah pengulangan yang tepat; `e-xii1-m5` menghitungnya.

**Batasnya.** Cermin hanya cara menghitung; pada perangkat nyata yang dipakai adalah gerbang. Tiga item dipakai untuk melatih aritmetika, bukan sirkuit qubit. Oracle dianggap tersedia dan biaya membangunnya tidak dihitung.

## Contoh setengah jadi

Lengkapi (kunci di bagian akhir).

1. Untuk `(0,5; 0,5; -0,5; 0,5)`: jumlah = ____, rata-rata `r` = ____, dan `2r - (-0,5)` = ____.
2. Lengkapi:

```cpp setengah-jadi
void balik_rata(Vektor& a) {
    double jumlah = 0.0;
    for (double x : a) jumlah += x;
    double rata = jumlah / a.size();
    for (double& x : a) x = ____ * rata - x;
}
```

## Soal Parsons

Susun baris-baris di bawah (sudah diacak) menjadi isi fungsi `balik_rata`. Penjorokan dan kurung kurawal penutup sengaja dihilangkan.

```text
(a) double rata = jumlah / a.size();
(b) for (double x : a) jumlah += x;
(c) for (double& x : a) x = 2.0 * rata - x;
(d) double jumlah = 0.0;
```

## Latihan

1. **Tiga item.** (`AI: tanpa AI`) Tiga item, item pertama ditandai. Telusuri satu pengulangan dengan pecahan dan hitung peluang item bertanda.
2. **Empat item.** (`AI: tanpa AI`) Empat item, item keempat ditandai. Gambar diagram amplitudo (batang naik dan turun) untuk awal, sesudah oracle, dan sesudah cermin.
3. **Ubah program.** (`AI: boleh`) Ubah menjadi lima item (model aritmetika). Prediksi dulu peluang setelah satu dan dua pengulangan, lalu jalankan.
4. **Rancang dulu.** (`AI: boleh`) Tulis pseudocode yang mencari `t` pertama dengan peluang di atas 0,9 untuk delapan item memakai `balik_fase` dan `balik_rata`.
5. **Catatan pemakaian AI (opsional).** Bila memakai asisten AI, catat alat, tujuan, garis besar perintah, bagian yang dipakai, dan cara memeriksanya.

## Latihan bercampur

1. Pada delapan item, berapa peluang pembacaan langsung item bertanda sesudah oracle fase saja, dan sesudah satu pengulangan penuh? (`e-xii1-m2`, `e-xii1-m3`)
2. Berapa query klasik terburuk untuk satu item dari delapan, dan berapa pengulangan Grover yang terbaik menurut keluaran di atas? (`e-xii1-m3`)

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `e-xii1-m5` (satu minggu lagi), `e-xii1-m7` (sekitar tiga minggu lagi), dan `e-xii1-m12` (sekitar delapan minggu lagi). Jawab sekarang lalu simpan.

1. Tuliskan operasi cermin terhadap rata-rata pada amplitudo `a_i`, lalu hitung hasilnya untuk `(0,5; 0,5; -0,5; 0,5)`.
2. Mengapa terlalu banyak pengulangan Grover justru menurunkan peluang item bertanda?
3. Berapa amplitudo yang harus disimpan simulator untuk `n` qubit, dan apa akibatnya bagi `n = 30`?

## Kesalahan umum

- **"Difusi memperbesar semua amplitudo."** Ia memantulkan terhadap rata-rata: yang di atas rata-rata turun, yang di bawah naik.
- **"Amplitudo item bertanda terus tumbuh."** Pada delapan item ia turun lagi pada pengulangan ketiga.
- **"Cermin bekerja pada peluang."** Ia bekerja pada amplitudo bertanda; peluang baru dihitung dari kuadratnya.
- **"Tiga item dapat dibuat dari qubit."** Dua qubit memberi empat item; tiga item hanyalah model aritmetika.

## Cek mandiri

- [ ] Saya dapat menulis cermin terhadap rata-rata dan menghitungnya untuk empat amplitudo.
- [ ] Saya dapat menelusuri tiga dan empat item dengan tangan.
- [ ] Saya dapat menjelaskan mengapa item bertanda diperkuat.
- [ ] Saya dapat menjelaskan mengapa pengulangan berlebih merugikan.
- [ ] Saya mencatat pemakaian AI bila saya memakainya.

## Kunci dan petunjuk

**Ingat kembali.** 1: satu pengulangan memberi peluang 1; setelah dua pengulangan 0,25. 2: bacaan tersebar pada beberapa string dan tidak menunjuk satu `s`; contoh AND dua bit pertama memberi empat string masing-masing 0,25. 3: pemeriksa pasti benar harus mengantisipasi `f` yang sama pada `2^(n-1)` masukan pertama; itu masih bisa konstan atau seimbang, sehingga perlu satu query lagi.

**Prediksi dulu.** (1) rata-rata `1/(3 akar3)`, kira-kira 0,1925; peluang `25/27`, belum 1. (2) `(0; 0; 1; 0)`. (3) tidak: pada pengulangan ketiga peluangnya turun ke 0,3301.

**Contoh setengah jadi.** 1: jumlah 1; `r = 0,25`; `2 x 0,25 + 0,5 = 1`. 2: `2.0`. Kunci ini dikompilasi dan dijalankan penyusun (potongan itu ada di program di atas).

**Soal Parsons.** d, b, a, c.

**Latihan.** 1: awal `(1; 1; 1)` dibagi akar3; setelah oracle `(-1; 1; 1)` dibagi akar3; rata-rata `1/(3 akar3)`; cermin memberi `(5; -1; -1)` dibagi `3 akar3`; peluang `25/27`, kira-kira 0,9259. 2: awal `(0,5; 0,5; 0,5; 0,5)`; sesudah oracle `(0,5; 0,5; 0,5; -0,5)`; sesudah cermin `(0; 0; 0; 1)`. 3: untuk lima item peluang setelah satu pengulangan 0,9680 dan setelah dua 0,5379 (keluaran program penyusun). 4: contoh: `a = seragam; t = 0; selama a[ditandai]^2 <= 0,9: balik_fase; balik_rata; t = t + 1; kembalikan t`; hasilnya `t = 2`. 5: opsional.

**Latihan bercampur.** 1: sesudah oracle fase saja `1/8` = 0,125; sesudah satu pengulangan penuh 0,7812. 2: klasik terburuk 7; pengulangan terbaik 2 (peluang 0,9453).

**Ulang berjarak.** 1: `a_i` menjadi `2r - a_i` dengan `r` rata-rata semua amplitudo; untuk `(0,5; 0,5; -0,5; 0,5)` hasilnya `(0; 0; 1; 0)`. 2: setelah titik terbaik amplitudo item bertanda berputar melewati puncak dan peluangnya menurun lagi (delapan item: 0,9453 lalu 0,3301). 3: `2^n` amplitudo; untuk `n = 30` ada `2^30` amplitudo, 8 GiB bila tiap amplitudo 8 byte.

## Langkah berikutnya

Modul berikut: `e-xii1-m5` (Grover III: jumlah pengulangan). Bacaan pendamping: `e-xii1-m3` dan `e-xii1-m2`.
