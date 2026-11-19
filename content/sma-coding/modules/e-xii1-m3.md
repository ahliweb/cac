## Untuk siapa modul ini

Modul ini untuk murid kelas XII jalur E (komputasi kuantum), minggu `E-XII1-M3` silabus v1.4: Grover I, yaitu menjelaskan gagasan pencarian tak terurut dan oracle, dengan keluaran sketsa algoritma. Prasyarat: modul `e-xii1-m2` (pembalikan fase). Di luar indeks, bagian kode memerlukan simulator n qubit `e-xi2-m4` dan dasar pemrograman setara `A-X1-M9..M12` (C++) atau `B-X1-M9..M12` (TypeScript/Bun); guru memeriksanya. Bagian konsep dan hitungan terbuka bagi semua murid. Alat: kertas, kalkulator, dan simulatormu (tanpa akun).

Modul ini berstatus DRAF: karangan penyusun, belum ditinjau pemilik. Jalur E adalah pengayaan di luar rumusan CP; minggu ini tanpa irisan pengayaan, jadi modul ini tidak dihitung memenuhi butir CP mana pun.

Aturan AI jalur ini: AI generatif boleh dipakai dengan etika dan dicatat, tanpa data pribadi, kata sandi, atau tugas bernilai pada permintaanmu, dan tanpa akun wajib. Saran: jawab dulu sendiri, baru minta petunjuk bertahap; kode buatan AI kamu baca, jalankan, dan uji. Setiap soal `Latihan` bertanda `AI: boleh` atau `AI: tanpa AI`.

Catatan untuk guru: rumusan masalah pencarian tak terurut, banyak evaluasi klasik (`N`), banyak evaluasi Grover (`O(akar N)`, dengan peluang tinggi), dan catatan bahwa keunggulan kuadratnya diperkirakan belum memberi keunggulan praktis dalam waktu dekat dibaca penyusun dari halaman IBM Quantum Learning "Introduction" dan "Unstructured search" pada pelajaran algoritma Grover, per 2026-11-19. Semua angka di bawah dihitung ulang program. Tidak ada klaim tentang perangkat nyata, dan modul ini tidak menjanjikan bahwa Grover bermakna dapat dijalankan di perangkat saat ini.

## Ingat kembali

Jawab dari ingatan, baru cek di bagian kunci.

1. Mengapa tanda minus pada seluruh keadaan tidak dapat dibedakan, sedangkan tanda minus pada sebagian amplitudo dapat? (dari `e-xii1-m2`)
2. Mengapa keadaan |0> dan |+> tidak dapat dibedakan dengan pasti oleh satu pembacaan? (dari `e-xi2-m9`)
3. Mengapa qubit bantu dimulai dari |1> lalu diberi H, dan apa keadaan qubit pertama sesudah oracle? (dari `e-xi2-m11`)

## Tujuan

Setelah modul ini kamu dapat:

- menyatakan masalah pencarian tak terurut dan menjelaskan mengapa pencarian klasik memerlukan banyak query;
- menyebut langkah satu pengulangan Grover: oracle fase lalu difusi;
- menelusuri dua qubit dengan satu item ditandai sampai item itu terbaca dengan peluang 1.

Keluaran yang diminta silabus: sketsa algoritma.

## Prediksi dulu

Ada empat item `00`, `01`, `10`, `11`, dan satu di antaranya ditandai oleh sebuah oracle yang hanya boleh dipanggil. Tebak dan tulis: (1) peluang membaca item ditandai tanpa operasi apa pun selain H; (2) peluang itu bila oracle fase dipasang sekali lalu langsung dibaca; (3) query klasik terburuk untuk memastikan item yang mana; (4) peluang item ditandai sesudah satu pengulangan Grover.

## Contoh terselesaikan

**Masalah.** Diberi fungsi `f` dari `n` bit ke 1 bit, cari `x` dengan `f(x) = 1`. Tidak ada urutan atau struktur yang dapat dimanfaatkan; kita hanya boleh memanggil `f` ("kotak hitam" atau oracle). Misalkan `N = 2^n`. Cara klasik memanggil `f` pada item satu per satu, sampai `N` kali; bila diketahui tepat satu item bertanda, item terakhir pasti tanpa dipanggil, sehingga terburuk `N - 1`. Grover memerlukan sekitar akar `N` pemanggilan, dan pemanggilan itu dilakukan pada superposisi.

**Sketsa algoritma.**

1. Mulai dari `|0...0>`, pasang H pada semua qubit: keadaan seragam, semua amplitudo sama.
2. Ulangi: (a) oracle fase `Z_f`, yang membalik tanda amplitudo item bertanda (`e-xii1-m2`); (b) *difusi*: H pada semua qubit, balik tanda semua amplitudo kecuali `|0...0>`, lalu H pada semua qubit. Mengapa difusi berfungsi dibahas di `e-xii1-m4`; di modul ini ia dipakai sebagai kotak.
3. Baca.

Perhatikan yang tidak ada: tidak ada langkah "periksa semua item sekaligus lalu ambil yang benar". Oracle dipanggil sekali per pengulangan, dan yang membuat item bertanda menonjol adalah interferensi.

```cpp
#include <cmath>
#include <cstdio>
#include <vector>

using Vektor = std::vector<double>;

const double H1 = 1.0 / std::sqrt(2.0);
const int N = 2;  // dua qubit, empat item: 00, 01, 10, 11

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

void oracle_fase(Vektor& v, int ditandai) { v[ditandai] = -v[ditandai]; }  // Z_f

void tanda_semua_kecuali_nol(Vektor& v) {  // Z_OR: |0..0> tetap, lainnya berubah tanda
    for (size_t i = 1; i < v.size(); i++) v[i] = -v[i];
}

void difusi(Vektor& v) {  // H, Z_OR, H pada semua qubit
    for (int k = 0; k < N; k++) gerbang_h(v, k);
    tanda_semua_kecuali_nol(v);
    for (int k = 0; k < N; k++) gerbang_h(v, k);
}

void cetak(const char* nama, const Vektor& v) {
    std::printf("%-22s", nama);
    for (double a : v) std::printf(" %7.4f", a);
    std::printf("\n");
}

Vektor seragam() {
    Vektor v(4, 0.0);
    v[0] = 1.0;
    for (int k = 0; k < N; k++) gerbang_h(v, k);
    return v;
}

int main() {
    for (int m = 0; m < 4; m++) {
        std::printf("item ditandai: %d%d\n", (m >> 1) & 1, m & 1);
        Vektor v = seragam();
        cetak("  awal", v);
        oracle_fase(v, m);
        cetak("  sesudah oracle", v);
        difusi(v);
        cetak("  sesudah difusi", v);
        std::printf("  peluang item ditandai: %.4f\n", v[m] * v[m]);
    }

    // Terus mengulang untuk m = 2 (item 10).
    std::printf("peluang item ditandai (10) setelah t pengulangan:");
    Vektor v = seragam();
    for (int t = 0; t <= 3; t++) {
        std::printf(" t=%d: %.4f", t, v[2] * v[2]);
        oracle_fase(v, 2);
        difusi(v);
    }
    std::printf("\n");

    // Klasik: bertanya item 00, 01, 10 berurutan; bila tiga pertama kosong, item terakhir pasti.
    std::printf("query klasik (urutan 00, 01, 10, 11):");
    for (int m = 0; m < 4; m++) {
        int query = 0;
        for (int i = 0; i < 3; i++) {
            query++;
            if (i == m) break;
        }
        std::printf(" m=%d: %d", m, query);
    }
    std::printf("\n");
    return 0;
}
```

Keluaran asli (dikompilasi penyusun dengan `g++ -std=c++17 -Wall -Wextra`, lalu dijalankan):

```text
item ditandai: 00
  awal                  0.5000  0.5000  0.5000  0.5000
  sesudah oracle       -0.5000  0.5000  0.5000  0.5000
  sesudah difusi        1.0000  0.0000  0.0000  0.0000
  peluang item ditandai: 1.0000
item ditandai: 01
  awal                  0.5000  0.5000  0.5000  0.5000
  sesudah oracle        0.5000 -0.5000  0.5000  0.5000
  sesudah difusi        0.0000  1.0000  0.0000  0.0000
  peluang item ditandai: 1.0000
item ditandai: 10
  awal                  0.5000  0.5000  0.5000  0.5000
  sesudah oracle        0.5000  0.5000 -0.5000  0.5000
  sesudah difusi        0.0000  0.0000  1.0000  0.0000
  peluang item ditandai: 1.0000
item ditandai: 11
  awal                  0.5000  0.5000  0.5000  0.5000
  sesudah oracle        0.5000  0.5000  0.5000 -0.5000
  sesudah difusi        0.0000  0.0000  0.0000  1.0000
  peluang item ditandai: 1.0000
peluang item ditandai (10) setelah t pengulangan: t=0: 0.2500 t=1: 1.0000 t=2: 0.2500 t=3: 0.2500
query klasik (urutan 00, 01, 10, 11): m=0: 1 m=1: 2 m=2: 3 m=3: 3
```

Bacaan hasil. Untuk tiap dari empat kemungkinan item bertanda, keadaan seragam `(0,5; 0,5; 0,5; 0,5)` dibalik tandanya pada item itu oleh oracle, lalu difusi mengubahnya menjadi `1` pada item itu dan `0` pada yang lain. Peluang item bertanda sesudah satu pengulangan adalah 1, dengan satu pemanggilan oracle, sedangkan klasik memerlukan 1, 2, 3, atau 3 query tergantung letak item (rata-rata 2,25 bila letaknya merata). Namun perhatikan baris terakhir: dengan terus mengulang, peluang item `10` menjadi 0,25 pada `t = 2` dan `t = 3`. Terlalu banyak pengulangan membuang hasil; `e-xii1-m5` menghitung jumlah yang tepat.

**Batasnya.** Untuk `N = 4` satu pengulangan kebetulan memberi peluang tepat 1; untuk `N` lain peluang tinggi tetapi tidak selalu 1 (`e-xii1-m4`). Oracle dianggap tersedia, dan biaya membangunnya tidak dihitung. Keunggulannya kuadrat, bukan eksponensial, dan sumber di atas memperkirakannya belum praktis dalam waktu dekat.

## Contoh setengah jadi

Lengkapi (kunci di bagian akhir).

1. Pada pencarian klasik empat item, bila tiga item pertama kosong maka item ke-____ pasti item bertanda.
2. Lengkapi:

```cpp setengah-jadi
void difusi(Vektor& v) {
    for (int k = 0; k < N; k++) gerbang_h(v, k);
    tanda_semua_kecuali_nol(v);
    for (int k = 0; k < ____; k++) gerbang_h(v, k);
}

void oracle_fase(Vektor& v, int ditandai) { v[ditandai] = -v[____]; }
```

## Soal Parsons

Susun baris-baris di bawah (sudah diacak) menjadi pencarian Grover dengan `ulangan` pengulangan. Kurung kurawal penutup sengaja dihilangkan.

```text
(a) for (int t = 0; t < ulangan; t++) {
(b)     oracle_fase(v, m);
(c)     difusi(v);
(d) Vektor v = seragam();
(e) double p = v[m] * v[m];
```

## Latihan

1. **Dengan tangan.** (`AI: tanpa AI`) Untuk tiap item ditandai `m` dari `00` sampai `11`, tulis vektor setelah oracle, lalu cocokkan dengan keluaran program.
2. **Klasik.** (`AI: tanpa AI`) Pencarian klasik memeriksa urutan `11`, `10`, `01`, lalu menyimpulkan `00`. Berapa query untuk tiap letak item, dan berapa rata-ratanya?
3. **Ubah program.** (`AI: boleh`) Perpanjang perulangan pengulangan sampai `t = 5` untuk item `10`. Tebak pola peluangnya dulu, lalu jalankan.
4. **Rancang dulu.** (`AI: boleh`) Tulis pseudocode pencarian klasik acak: pilih item acak tanpa mengulang sampai ketemu. Berapa query rata-rata untuk empat item?
5. **Catatan pemakaian AI (opsional).** Bila memakai asisten AI, catat alat, tujuan, garis besar perintah, bagian yang dipakai, dan cara memeriksanya.

## Latihan bercampur

1. Setelah oracle fase pada empat item dengan satu item bertanda, berapa peluang pembacaan langsung tiap item, dan mengapa? (`e-xii1-m2`)
2. Berapa query klasik terburuk untuk menemukan `s` pada Bernstein-Vazirani dengan `n = 2`, dan untuk menemukan satu item dari empat? (`e-xii1-m1`)

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `e-xii1-m4` (satu minggu lagi), `e-xii1-m6` (sekitar tiga minggu lagi), dan `e-xii1-m11` (sekitar delapan minggu lagi). Jawab sekarang lalu simpan.

1. Dengan empat item dan satu item bertanda, berapa pengulangan Grover yang membuat peluang item bertanda 1, dan berapa peluangnya setelah dua pengulangan?
2. Mengapa Grover tidak "memeriksa semua item sekaligus lalu membaca jawabannya"?
3. Apa yang dihitung sebagai query pada pencarian Grover, dan apa yang tidak dihitung?

## Kesalahan umum

- **"Grover memeriksa semua item sekaligus, lalu membaca yang benar."** Oracle dipanggil sekali per pengulangan pada superposisi, dan satu bacaan memberi satu item acak; yang menaikkan peluang item bertanda adalah interferensi.
- **"Grover membaca isi atau struktur `f`."** Ia hanya memakai oracle sebagai kotak hitam.
- **"Lebih banyak pengulangan selalu lebih baik."** Pada empat item, dua pengulangan menurunkan peluang menjadi 0,25.
- **"Grover selalu menemukan item dengan peluang 1."** Itu kebetulan pada `N = 4`; umumnya peluangnya tinggi tetapi tidak persis 1.

## Cek mandiri

- [ ] Saya dapat menyatakan masalah pencarian tak terurut dan peran oracle.
- [ ] Saya dapat menyebut langkah satu pengulangan Grover.
- [ ] Saya dapat menelusuri empat item dengan satu item bertanda.
- [ ] Saya dapat menjelaskan mengapa Grover bukan "periksa semua sekaligus".
- [ ] Saya mencatat pemakaian AI bila saya memakainya.

## Kunci dan petunjuk

**Ingat kembali.** 1: fase global tidak mengubah peluang apa pun, termasuk setelah operasi lain; tanda pada sebagian amplitudo mengubah hasil interferensi, jadi bisa terbaca setelah H. 2: hasil kali dalamnya `h` (akar2 dibagi 2), bukan 0, jadi keduanya tidak saling tegak lurus; hasil 0 dapat berasal dari `|0>` (peluang 1) maupun `|+>` (peluang 0,5). 3: `|1>` diberi H menjadi `|->`; `X|-> = -|->`, sehingga oracle memberi tanda `(-1)^f(x)` pada qubit query dan qubit bantu tetap `|->`; qubit pertama menjadi `((-1)^f(0) |0> + (-1)^f(1) |1>)` dibagi akar2.

**Prediksi dulu.** (1) `0,25`. (2) `0,25`, karena oracle fase hanya mengubah tanda. (3) 3. (4) 1.

**Contoh setengah jadi.** 1: ke-4 (item `11`). 2: `N`; `ditandai`. Kunci ini dikompilasi dan dijalankan penyusun (potongan itu ada di program di atas).

**Soal Parsons.** d, a, b, c, e.

**Latihan.** 1: `m = 00`: `(-0,5; 0,5; 0,5; 0,5)`; `01`: `(0,5; -0,5; 0,5; 0,5)`; `10`: `(0,5; 0,5; -0,5; 0,5)`; `11`: `(0,5; 0,5; 0,5; -0,5)`. 2: `11`: 1 query; `10`: 2; `01`: 3; `00`: 3 (setelah tiga item pertama kosong, `00` pasti); rata-rata `(1 + 2 + 3 + 3)/4 = 2,25`. 3: peluang `0,25; 1; 0,25; 0,25; 1; 0,25` untuk `t = 0..5`, berulang dengan periode 3 (keluaran program penyusun). 4: contoh: `urutan = acakkan({00, 01, 10, 11}); untuk item dalam urutan: panggil f(item); jika f(item) = 1 berhenti`; rata-rata 2,5 query bila tidak menyimpulkan item terakhir dan 2,25 bila menyimpulkannya. 5: opsional.

**Latihan bercampur.** 1: `0,25` untuk tiap item, karena oracle fase hanya mengubah tanda dan peluang adalah kuadrat amplitudo. 2: dua untuk `n = 2` (satu per bit); tiga untuk empat item.

**Ulang berjarak.** 1: satu pengulangan membuat peluang 1; setelah dua pengulangan peluangnya 0,25. 2: oracle dipanggil sekali pada superposisi; satu bacaan memberi satu item acak, dan hanya interferensi yang menaikkan peluang item bertanda. 3: yang dihitung: banyak pemanggilan oracle (pengulangan); yang tidak dihitung: biaya membangun oracle dan biaya simulasi.

## Langkah berikutnya

Modul berikut: `e-xii1-m4` (Grover II: difusi). Bacaan pendamping: `e-xii1-m2` dan `e-xi2-m11` (qubit bantu `|->`).
