## Untuk siapa modul ini

Modul ini untuk murid kelas XI jalur E (komputasi kuantum), minggu `E-XI2-M10` silabus v1.4: oracle dan fungsi Boolean, yaitu memodelkan fungsi sebagai oracle dan menghitung query. Prasyarat: modul `e-xi2-m9`, `matkom-logika-proposisi` (XOR dan tabel kebenaran), dan `matkom-himpunan-relasi-fungsi` (fungsi satu-satu dan pada). Alat: kertas, kalkulator, dan C++17 opsional (tanpa akun; murid jalur B boleh menerjemahkannya ke TypeScript); hitungan tangan lebih dulu.

Modul ini karangan penyusun dan disetujui pemilik program pada 2026-11-20 (keputusan lewat dialog; catatan tinjauan menjadi tindak lanjut revisi). Jalur E adalah pengayaan di luar rumusan CP; minggu ini tanpa irisan pengayaan, jadi modul ini tidak dihitung memenuhi butir CP mana pun.

Aturan AI jalur ini: AI generatif boleh dipakai dengan etika dan dicatat, tanpa data pribadi, kata sandi, atau tugas bernilai pada permintaanmu, dan tanpa akun wajib. Saran: jawab dulu sendiri, baru minta petunjuk bertahap; kode buatan AI kamu baca, jalankan, dan uji. Setiap soal `Latihan` bertanda `AI: boleh` atau `AI: tanpa AI`.

Catatan untuk guru: definisi fungsi konstan dan seimbang, masalah Deutsch dan Deutsch-Jozsa, bentuk oracle `|x>|y>` menjadi `|x>|y XOR f(x)>`, dan batas `2^(n-1) + 1` query bagi algoritma klasik yang pasti benar dibaca penyusun dari halaman IBM Quantum Learning "Deutsch's algorithm" dan "Deutsch-Jozsa algorithm", per 2026-11-19. Tabel dan jumlah fungsi dihitung program di modul ini. Hitungan query adalah model, bukan waktu: ia tidak menghitung biaya membangun oracle.

## Ingat kembali

Jawab dari ingatan, baru cek di bagian kunci.

1. Bagaimana satu bit kunci dipakai mengenkripsi satu bit pesan dengan XOR, dan bagaimana mendekripsinya? (dari `e-xi2-m9`)
2. Mengapa CNOT hanya menyalin keadaan dasar `|0>` dan `|1>`, bukan keadaan sembarang? (dari `e-xi2-m7`)
3. Apa yang dilakukan CNOT pada qubit kedua bila qubit pertama 0, dan bila 1? (dari `e-xi2-m1`)

## Tujuan

Setelah modul ini kamu dapat:

- menulis fungsi Boolean dari n bit ke 1 bit sebagai tabel dan menggolongkannya konstan, seimbang, atau bukan keduanya;
- menuliskan oracle `U_f` dan menunjukkan ia reversibel walaupun `f` tidak;
- menghitung banyak query terburuk bagi pemeriksa klasik yang pasti benar.

## Prediksi dulu

Tebak dan tulis: (1) ada berapa fungsi dari 2 bit ke 1 bit, dan berapa yang konstan; (2) apakah oracle untuk fungsi konstan reversibel; (3) berapa kali kotak hitam harus ditanya agar pasti tahu fungsi dari 2 bit itu konstan atau seimbang, bila sudah dijamin salah satunya.

## Contoh terselesaikan

**Fungsi Boolean.** Fungsi `f` dari n bit ke 1 bit adalah tabel dengan `2^n` nilai, jadi ada `2^(2^n)` fungsi. Fungsi **konstan** bernilai sama untuk semua masukan. Fungsi **seimbang** bernilai 0 dan 1 sama banyak. Untuk n = 1 ada empat fungsi, ditulis `f(0)f(1)`: `00` dan `11` konstan, `01` dan `10` seimbang. Untuk n = 2 ada 16 fungsi: 2 konstan, 6 seimbang, dan 8 yang bukan keduanya (misalnya `1000`).

**Query.** Kotak hitam menyimpan `f`; satu query adalah satu pertanyaan "berapa `f(x)`?". Dijamin (janji) `f` konstan atau seimbang, pemeriksa klasik yang pasti benar tetap harus bertanya sampai ada dua nilai berbeda atau lebih dari setengah masukan telah ditanya: `2^(n-1) + 1` query pada kasus terburuk. Program menghitung terburuknya 2, 3, dan 5 untuk n = 1, 2, 3, sama dengan rumus itu.

**Oracle.** `f` tidak dapat langsung dipasang sebagai gerbang: fungsi konstan memetakan dua masukan ke satu keluaran, jadi tidak reversibel (`e-xi2-m6`). Oracle `U_f` memakai dua register dan memetakan `|x>|y>` menjadi `|x>|y XOR f(x)>`: `x` dibiarkan, hasil `f(x)` di-XOR-kan ke `y`. Tiap `U_f` hanya menukar tempat komponen, jadi ia permutasi dan reversibel; dipasang dua kali, `y XOR f(x) XOR f(x) = y` mengembalikan keadaan semula. Beberapa di antaranya sudah kamu kenal: `f = 01` adalah CNOT (`e-xi2-m1`), `f = 00` identitas, `f = 11` gerbang X pada `y`. Bila `y` dimulai dari 0, hasilnya `|x>|f(x)>`, pola yang sama dengan Toffoli yang menghitung AND.

```cpp
#include <cstdio>
#include <set>
#include <string>
#include <vector>

// Oracle U_f untuk f dari 1 bit ke 1 bit: |x, y> menjadi |x, y XOR f(x)>.
// Indeks komponen = 2 x + y; tujuan[i] adalah indeks tujuan komponen i.
std::vector<int> tabel_oracle(int f0, int f1) {
    int f[2] = {f0, f1};
    std::vector<int> tujuan;
    for (int x = 0; x < 2; x++)
        for (int y = 0; y < 2; y++) tujuan.push_back(2 * x + (y ^ f[x]));
    return tujuan;
}

// f ditulis sebagai bitmask: bit ke-i adalah f(i); panjang tabel = 2^n.
// 0 = konstan, 1 = seimbang, 2 = lain.
int klasifikasi(unsigned f, int panjang) {
    int satu = 0;
    for (int i = 0; i < panjang; i++) satu += (f >> i) & 1;
    if (satu == 0 || satu == panjang) return 0;
    if (satu == panjang / 2) return 1;
    return 2;
}

// Banyak query terburuk bagi strategi klasik pasti benar (janji: konstan atau seimbang),
// bila masukan ditanyakan berurutan 0, 1, 2, ...
int query_terburuk(int n) {
    int panjang = 1 << n;
    std::vector<unsigned> janji;
    for (unsigned f = 0; f < (1u << panjang); f++)
        if (klasifikasi(f, panjang) != 2) janji.push_back(f);
    int terburuk = 0;
    for (unsigned f : janji) {
        for (int k = 1; k <= panjang; k++) {
            unsigned topeng = (1u << k) - 1;
            std::set<int> kelas;  // kelas semua fungsi janji yang cocok dengan f pada k masukan pertama
            for (unsigned g : janji)
                if (((g ^ f) & topeng) == 0) kelas.insert(klasifikasi(g, panjang));
            if (kelas.size() == 1) {
                if (k > terburuk) terburuk = k;
                break;
            }
        }
    }
    return terburuk;
}

int main() {
    const char* nama[4] = {"f1", "f2", "f3", "f4"};
    for (int i = 0; i < 4; i++) {
        int f0 = i >> 1, f1 = i & 1;  // f1 = 00, f2 = 01, f3 = 10, f4 = 11 (f(0)f(1))
        std::vector<int> t = tabel_oracle(f0, f1);
        bool permutasi = true;  // reversibel bila tiap indeks tujuan muncul tepat satu kali
        for (int j = 0; j < 4; j++) {
            int muncul = 0;
            for (int k : t) muncul += (k == j);
            if (muncul != 1) permutasi = false;
        }
        std::printf("%s: f(0)=%d f(1)=%d (%s); indeks 00,01,10,11 menuju [%d, %d, %d, %d]; reversibel (permutasi): %s\n",
                    nama[i], f0, f1, f0 == f1 ? "konstan" : "seimbang", t[0], t[1], t[2], t[3],
                    permutasi ? "ya" : "tidak");
    }

    for (int n = 1; n <= 3; n++) {
        int panjang = 1 << n;
        int hitung[3] = {0, 0, 0};
        for (unsigned f = 0; f < (1u << panjang); f++) hitung[klasifikasi(f, panjang)]++;
        std::printf("n=%d: %u fungsi; konstan %d, seimbang %d, lain %d\n", n, 1u << panjang, hitung[0],
                    hitung[1], hitung[2]);
    }

    for (int n = 1; n <= 3; n++)
        std::printf("n=%d: query klasik terburuk = %d; rumus 2^(n-1)+1 = %d\n", n, query_terburuk(n),
                    (1 << (n - 1)) + 1);
    return 0;
}
```

Keluaran asli (dikompilasi penyusun dengan `g++ -std=c++17 -Wall -Wextra`, lalu dijalankan):

```text
f1: f(0)=0 f(1)=0 (konstan); indeks 00,01,10,11 menuju [0, 1, 2, 3]; reversibel (permutasi): ya
f2: f(0)=0 f(1)=1 (seimbang); indeks 00,01,10,11 menuju [0, 1, 3, 2]; reversibel (permutasi): ya
f3: f(0)=1 f(1)=0 (seimbang); indeks 00,01,10,11 menuju [1, 0, 2, 3]; reversibel (permutasi): ya
f4: f(0)=1 f(1)=1 (konstan); indeks 00,01,10,11 menuju [1, 0, 3, 2]; reversibel (permutasi): ya
n=1: 4 fungsi; konstan 2, seimbang 2, lain 0
n=2: 16 fungsi; konstan 2, seimbang 6, lain 8
n=3: 256 fungsi; konstan 2, seimbang 70, lain 184
n=1: query klasik terburuk = 2; rumus 2^(n-1)+1 = 2
n=2: query klasik terburuk = 3; rumus 2^(n-1)+1 = 3
n=3: query klasik terburuk = 5; rumus 2^(n-1)+1 = 5
```

Bacaan hasilnya: `f2` menukar komponen `10` dan `11`, persis CNOT. Semua `U_f` adalah permutasi. Program menulis fungsi sebagai bitmask (bit ke-i adalah `f(i)`) dan hanya memeriksa n sampai 3; rumus umum berasal dari halaman IBM, bukan dibuktikan di sini. Penghitung query ini menganggap strategi klasik bertanya berurutan; strategi acak diperlakukan di `e-xi2-m12`.

## Contoh setengah jadi

Lengkapi (kunci di bagian akhir).

1. Untuk n = 2 ada 4 masukan dan `2^4` = ____ fungsi; fungsi seimbang punya ____ nilai 1.
2. Oracle untuk `f(0) = 1`, `f(1) = 0` memetakan `|1>|1>` ke `|1>|____>`.
3. Lengkapi:

```cpp setengah-jadi
std::vector<int> tabel_oracle(int f0, int f1) {
    int f[2] = {f0, f1};
    std::vector<int> tujuan;
    for (int x = 0; x < 2; x++)
        for (int y = 0; y < 2; y++) tujuan.push_back(2 * x + (y ____ f[x]));
    return tujuan;
}
```

## Soal Parsons

Susun baris-baris di bawah (sudah diacak) menjadi fungsi `klasifikasi` (0 konstan, 1 seimbang, 2 lain). Penjorokan dan kurung kurawal penutup sengaja dihilangkan.

```text
(a) int satu = 0;
(b) for (int i = 0; i < panjang; i++) satu += (f >> i) & 1;
(c) return 2;
(d) int klasifikasi(unsigned f, int panjang) {
(e) if (satu == panjang / 2) return 1;
(f) if (satu == 0 || satu == panjang) return 0;
```

## Latihan

1. **Golongkan.** (`AI: tanpa AI`) Fungsi dari 2 bit ditulis `f(00)f(01)f(10)f(11)`. Golongkan `0110`, `1111`, dan `1000`.
2. **Tabel oracle.** (`AI: tanpa AI`) Untuk `f(0) = 1`, `f(1) = 0`, ke mana oracle memetakan `|00>`, `|01>`, `|10>`, dan `|11>`?
3. **Naikkan n.** (`AI: boleh`) Tambahkan `n = 4` pada perhitungan penggolongan. Prediksi dulu banyak fungsi konstan dan seimbang. Jangan menjalankan `query_terburuk(4)`: terlalu lambat.
4. **Rancang dulu.** (`AI: boleh`) Tulis pseudocode strategi klasik: tanya masukan berurutan; kapan ia berhenti dan menjawab seimbang, dan kapan konstan?
5. **Catatan pemakaian AI (opsional).** Bila memakai asisten AI, catat alat, tujuan, garis besar perintah, bagian yang dipakai, dan cara memeriksanya.

## Latihan bercampur

1. Sirkuit untuk fungsi dari 2 bit memakai dua qubit `x` dan satu qubit `y`. Berapa komponen vektornya, dan sebutkan hasilnya berurutan. (`e-xi1-m12`)
2. Tunjukkan dengan tabel XOR bahwa memasang `U_f` dua kali mengembalikan `|x, y>`. (`matkom-logika-proposisi`)
3. Mengapa `f` konstan tidak reversibel tetapi `U_f` reversibel? (`e-xi2-m6`, `matkom-himpunan-relasi-fungsi`)

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `e-xi2-m11` (satu minggu lagi), `e-xi2-m13` (sekitar tiga minggu lagi), dan `e-xii1-m4` (sekitar delapan minggu lagi). Jawab sekarang lalu simpan.

1. Tuliskan efek oracle U_f pada |x, y>, dan mengapa U_f reversibel walau f konstan?
2. Berapa fungsi Boolean dari 2 bit ke 1 bit, dan berapa yang konstan, seimbang, dan bukan keduanya?
3. Mengapa jumlah query klasik terburuk untuk membedakan fungsi konstan dari seimbang pada n bit adalah 2^(n-1)+1?

## Kesalahan umum

- **"Oracle adalah fungsi `f` yang dipasang langsung sebagai gerbang."** `f` bisa tidak reversibel; `U_f` memakai XOR ke register tambahan `y`.
- **"Seimbang berarti nilainya bergantian 0, 1, 0, 1."** Seimbang hanya berarti jumlah 0 dan 1 sama; letaknya bebas.
- **"Setiap fungsi dari n bit adalah konstan atau seimbang."** Untuk n = 2 ada 8 dari 16 yang bukan keduanya; karena itu ada "janji".
- **"Memasang oracle sekali berarti kita langsung tahu semua nilai `f`."** Hasil bacaan hanya memberi sedikit bit; apa yang dapat dilakukan dengan satu pemasangan dibahas di `e-xi2-m11` dan `e-xi2-m12`.

## Cek mandiri

- [ ] Saya dapat menggolongkan fungsi Boolean menjadi konstan, seimbang, atau bukan keduanya.
- [ ] Saya dapat menulis oracle `U_f` dan menunjukkan ia reversibel.
- [ ] Saya dapat menghitung query klasik terburuk dengan rumus `2^(n-1) + 1`.
- [ ] Saya mencatat pemakaian AI bila saya memakainya.

## Kunci dan petunjuk

**Ingat kembali.** 1: sandi = pesan XOR kunci, dekripsi = sandi XOR kunci, karena XOR dengan kunci yang sama dua kali mengembalikan pesan. 2: untuk `|x>|0>` hasilnya `|x>|x>`; untuk superposisi `(a, b)` hasilnya `(a, 0, 0, b)`, bukan `(a², ab, ab, b²)`; kelinearan melarang salinan umum. 3: bila qubit pertama 0 qubit kedua dibiarkan; bila 1 qubit kedua dibalik (X).

**Prediksi dulu.** (1) 16 fungsi, 2 konstan (`0000` dan `1111`); (2) ya, `U_f` selalu permutasi; (3) 3 kali (dua nilai sama masih bisa konstan atau seimbang).

**Contoh setengah jadi.** 1: `2^4` = 16; fungsi seimbang dari 2 bit punya 2 nilai 1 (dua dari empat). 2: `y XOR f(1) = 1 XOR 0 = 1`, jadi `|1>|1>`. 3: `^` (XOR). Kunci ini dikompilasi dan dijalankan penyusun.

**Soal Parsons.** d, a, b, f, e, c.

**Latihan.** 1: `0110` seimbang (dua nilai 1); `1111` konstan; `1000` bukan keduanya (hanya satu nilai 1 dari empat). 2: `|00>` menuju `|01>`, `|01>` menuju `|00>` (x = 0, f(0) = 1 membalik y); `|10>` tetap `|10>` dan `|11>` tetap `|11>` (x = 1, f(1) = 0); sesuai `[1, 0, 2, 3]`. 3: untuk n = 4 ada 65536 fungsi: 2 konstan, 12870 seimbang (`C(16, 8)`), dan 52664 bukan keduanya (dihitung penyusun). 4: contoh: `tanya f(0), f(1), ...; bila ada dua nilai berbeda berhenti dan jawab seimbang; bila 2^(n-1) + 1 nilai sama berhenti dan jawab konstan` (lebih dari setengah masukan yang sama mustahil pada fungsi seimbang). 5: opsional.

**Latihan bercampur.** 1: tiga qubit, jadi `2^3` = 8 komponen: `000, 001, 010, 011, 100, 101, 110, 111`. 2: `y XOR f(x) XOR f(x) = y`, karena `a XOR a = 0` dan `y XOR 0 = y`, untuk `f(x)` bernilai 0 maupun 1. 3: fungsi konstan memetakan dua masukan ke satu keluaran sehingga tidak satu-satu; `U_f` hanya menukar tempat komponen sehingga satu-satu dan pada (bijeksi).

**Ulang berjarak.** 1: `|x>|y>` menjadi `|x>|y XOR f(x)>`; ia permutasi komponen (bijeksi) walau `f` konstan, dan dipasang dua kali mengembalikan keadaan semula. 2: 16 fungsi; 2 konstan, 6 seimbang, 8 bukan keduanya. 3: pemeriksa pasti benar harus mengantisipasi `f` yang sama pada `2^(n-1)` masukan pertama: itu masih bisa konstan atau seimbang, sehingga perlu satu query lagi.

## Langkah berikutnya

Modul berikut: `e-xi2-m11` (algoritma Deutsch): memakai oracle satu kali. Bacaan pendamping: `e-xi2-m1` (CNOT) dan `e-xi2-m6` (Toffoli).
