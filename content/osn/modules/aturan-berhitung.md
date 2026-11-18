## Untuk siapa modul ini

Modul ini untuk siswa SMA yang berlatih menuju OSN Informatika dan memakai C++17. Isinya mengikuti rumpun materi "Aturan berhitung": aturan jumlah dan aturan kali, barisan, bilangan Fibonacci, permutasi dan kombinasi, probabilitas, prinsip sarang merpati (pigeonhole), prinsip inklusi-eksklusi, serta segitiga Pascal dan koefisien binomial. Pada silabus pembinaan, topik ini muncul di minggu 11 (kombinatorika dan probabilitas) dan minggu 12 (pigeonhole, inklusi-eksklusi, barisan, Fibonacci, dan intuisi induksi).

Prasyarat: variabel, perulangan, fungsi, `long long`, dan sedikit aritmetika modular serta himpunan (lihat modul "Aritmetika"). Hampir semua kesalahan pada soal berhitung di komputer berasal dari hasil yang cepat membesar, jadi modul ini sering menghitung batas nilai.

Setelah mempelajari modul ini, kamu diharapkan bisa memilih aturan hitung yang tepat, menghitung banyak susunan dan pilihan, menghitung probabilitas kejadian sederhana dengan hasil sama mungkin, memakai pigeonhole dan inklusi-eksklusi dalam penalaran, dan menulis kodenya tanpa overflow.

Cara memakai: baca penjelasan, ketik ulang setiap contoh, ubah nilainya, lalu kerjakan latihan. Contoh kode di modul ini hanya diperiksa bisa dikompilasi (C++17); itu tidak membuktikan contoh benar untuk semua masukan, jadi tetap uji sendiri.

## Aturan jumlah dan aturan kali

Aturan jumlah: bila suatu pekerjaan dapat dilakukan dengan salah satu dari dua cara yang tidak mungkin terjadi bersamaan, dan cara pertama punya `m` kemungkinan serta cara kedua punya `n` kemungkinan, maka totalnya `m + n`. Contoh: memilih satu buku dari 4 buku matematika atau 3 buku fisika: `4 + 3 = 7` pilihan.

Aturan kali: bila suatu pekerjaan terdiri atas dua tahap berurutan, tahap pertama punya `m` kemungkinan dan untuk setiap kemungkinan itu tahap kedua punya `n` kemungkinan, maka totalnya `m x n`. Contoh: memilih satu buku matematika dan satu buku fisika sekaligus: `4 x 3 = 12` pasangan.

Cara berpikir yang sehat: tentukan dulu apakah situasinya "atau" (jumlah, kasus saling lepas) atau "lalu" (kali, tahap berurutan). Bila kasus-kasusnya bisa tumpang-tindih, aturan jumlah tidak langsung berlaku; lihat bagian inklusi-eksklusi.

```cpp
#include <iostream>
using namespace std;

int main() {
    // banyak kode terdiri atas 2 huruf (A-Z, boleh sama) lalu 3 angka (0-9, boleh sama)
    long long huruf = 26, angka = 10;
    long long kode = huruf * huruf * angka * angka * angka;
    cout << kode << "\n";   // 676000
    return 0;
}
```

Untuk kode tiga angka lalu dua huruf, hasilnya sama karena perkalian bersifat komutatif; yang berubah hanya susunannya, bukan jumlahnya.

## Barisan

Barisan adalah daftar bilangan berurutan `u1, u2, u3, ...`.

Barisan aritmetika memiliki beda tetap `b` antara suku yang berdekatan:

- suku ke-`n`: `un = a + (n - 1) x b`, dengan `a` suku pertama;
- jumlah `n` suku pertama: `Sn = n x (2a + (n - 1) x b) / 2`.

Barisan geometri memiliki rasio tetap `r`:

- suku ke-`n`: `un = a x r^(n-1)`;
- jumlah `n` suku pertama bila `r != 1`: `Sn = a x (r^n - 1) / (r - 1)`.

Contoh: barisan aritmetika dengan `a = 3` dan `b = 4` adalah 3, 7, 11, 15, 19; jumlah lima suku pertamanya `5 x (6 + 16) / 2 = 55`.

Perhatikan di program bahwa `n x (2a + (n - 1) x b)` selalu genap, sehingga pembagian dengan 2 tepat; tetapi perkalian di dalamnya bisa melimpah. Untuk `n` hingga `10^9`, nilainya dapat mencapai sekitar `10^18` atau lebih, jadi hitung dalam `long long` dan perkirakan batasnya lebih dulu.

```cpp
#include <iostream>
using namespace std;

int main() {
    long long a, b, n;
    cin >> a >> b >> n;
    long long suku = a + (n - 1) * b;
    long long jumlah = n * (2 * a + (n - 1) * b) / 2;
    cout << suku << " " << jumlah << "\n";
    return 0;
}
```

Untuk masukan `3 4 5`, keluarannya `19 55`. Program ini aman selama nilai antara tidak melebihi batas `long long`; ia tidak mengecek hal itu.

## Bilangan Fibonacci

Barisan Fibonacci didefinisikan `F(1) = 1`, `F(2) = 1`, dan `F(n) = F(n-1) + F(n-2)` untuk `n >= 3`. Delapan suku pertamanya: 1, 1, 2, 3, 5, 8, 13, 21.

Menghitung `F(n)` dengan fungsi rekursif langsung mengulang perhitungan yang sama berkali-kali dan menjadi sangat lambat untuk `n` sekitar 40 ke atas. Cara iteratif cukup menyimpan dua suku terakhir.

```cpp
#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    long long sebelum = 1, sekarang = 1;   // F(1) dan F(2)
    for (int i = 3; i <= n; i++) {
        long long berikut = sebelum + sekarang;
        sebelum = sekarang;
        sekarang = berikut;
    }
    cout << sekarang << "\n";
    return 0;
}
```

Untuk `n = 10`, keluarannya `55`. Program ini juga benar untuk `n = 1` dan `n = 2` (hasil 1), karena perulangan tidak berjalan.

Fibonacci tumbuh cepat. `F(46)` masih muat di `int` 32 bit (1.836.311.903), tetapi `F(47)` tidak. Pada `long long`, `F(92) = 7.540.113.804.746.346.429` masih muat, sedangkan `F(93)` melebihi batas `long long` bertanda. Bila soal meminta Fibonacci untuk `n` besar, biasanya yang diminta adalah sisa pembagian dengan suatu modulo; ambil modulo pada setiap penjumlahan.

Intuisi induksi: untuk membuktikan sebuah pernyataan benar untuk semua `n` berurutan, tunjukkan (1) kasus awal benar, dan (2) bila pernyataan benar untuk `n`, maka benar untuk `n + 1`. Seperti dominó: jatuhkan yang pertama, dan setiap domino yang jatuh menjatuhkan berikutnya. Contoh: jumlah `1 + 2 + ... + n = n(n+1)/2`. Untuk `n = 1` benar (1 = 1). Bila benar untuk `n`, tambahkan `n + 1` pada kedua sisi: `n(n+1)/2 + (n+1) = (n+1)(n+2)/2`, yaitu bentuk yang sama untuk `n + 1`.

## Permutasi

Permutasi adalah susunan berurutan: urutan memengaruhi. Banyak cara menyusun `n` objek berbeda dalam satu baris adalah `n! = n x (n-1) x ... x 1` (dengan `0! = 1`).

Banyak cara memilih dan menyusun `k` dari `n` objek berbeda (urutan penting): `P(n, k) = n x (n-1) x ... x (n-k+1) = n! / (n-k)!`.

Bila ada objek yang sama, banyak susunan berbeda dari `n` objek yang terdiri atas kelompok sama berukuran `a, b, c, ...` adalah `n! / (a! x b! x c! x ...)`. Contoh: susunan huruf pada kata `AABBB` adalah `5! / (2! x 3!) = 10`.

Banyak cara menyusun `n` objek berbeda melingkar (rotasi dianggap sama) adalah `(n-1)!`.

```cpp
#include <iostream>
using namespace std;

int main() {
    int n, k;
    cin >> n >> k;
    long long hasil = 1;
    for (int i = 0; i < k; i++) {
        hasil *= (n - i);   // n x (n-1) x ... x (n-k+1)
    }
    cout << hasil << "\n";
    return 0;
}
```

Untuk `5 2`, keluarannya `20`. Faktorial tumbuh sangat cepat: `20! = 2.432.902.008.176.640.000` masih muat di `long long`, tetapi `21!` tidak. Bila hasil bisa lebih besar, soal biasanya meminta modulo.

## Kombinasi

Kombinasi adalah pemilihan tanpa memperhatikan urutan. Banyak cara memilih `k` dari `n` objek berbeda adalah `C(n, k) = n! / (k! x (n-k)!)`, juga ditulis dengan lambang binomial. Alasannya: `P(n, k)` menghitung pilihan berurutan, dan setiap himpunan terpilih terhitung `k!` kali dengan urutan berbeda, sehingga dibagi `k!`.

Sifat penting: `C(n, k) = C(n, n-k)`, `C(n, 0) = C(n, n) = 1`.

Contoh: memilih 3 orang dari 10 untuk menjadi panitia (tanpa jabatan): `C(10, 3) = 120`. Bila ketiganya mendapat jabatan berbeda (urutan penting), `P(10, 3) = 720 = 6 x 120`.

## Segitiga Pascal dan koefisien binomial

Kombinasi memenuhi hubungan `C(n, k) = C(n-1, k-1) + C(n-1, k)`: sebuah himpunan terpilih berukuran `k` dari `n` objek hanya punya dua kemungkinan, mengandung objek terakhir (sisanya `k-1` dari `n-1` objek lainnya) atau tidak (semua `k` dari `n-1` objek lainnya). Nilai-nilai ini membentuk segitiga Pascal, dengan baris ke-`n` berisi `C(n, 0), C(n, 1), ..., C(n, n)`:

```text
1
1 1
1 2 1
1 3 3 1
1 4 6 4 1
```

Hubungan ini memberi cara menghitung `C(n, k)` tanpa pembagian, dengan hanya penjumlahan:

```cpp
#include <iostream>
using namespace std;

int main() {
    int n, k;
    cin >> n >> k;
    static long long c[61][61];
    for (int i = 0; i <= n; i++) {
        c[i][0] = 1;
        for (int j = 1; j <= i; j++) {
            c[i][j] = c[i - 1][j - 1] + (j <= i - 1 ? c[i - 1][j] : 0);
        }
    }
    cout << c[n][k] << "\n";
    return 0;
}
```

Untuk `10 3`, keluarannya `120`. Program ini memakai `n <= 60` dan `0 <= k <= n`; `static` membuat array berisi nol di awal. `C(60, 30) = 118.264.581.564.861.424` masih muat di `long long`. Untuk `n` yang lebih besar, nilai-nilainya akan melimpah (misalnya `C(67, 33)` sudah melebihi batas), dan soal biasanya meminta modulo; penjumlahan Pascal tetap berlaku dengan modulo karena hanya memakai penjumlahan.

Teorema binomial: `(x + y)^n` memiliki koefisien `C(n, k)` pada suku `x^(n-k) y^k`. Dua akibatnya: jumlah satu baris `C(n, 0) + C(n, 1) + ... + C(n, n) = 2^n` (banyak himpunan bagian dari `n` objek), dan jumlah selang-seling baris `n >= 1` adalah 0.

## Probabilitas

Bila semua hasil percobaan sama mungkin, probabilitas kejadian `A` adalah `P(A) = (banyak hasil yang memenuhi A) / (banyak semua hasil)`. Nilainya antara 0 dan 1.

- Komplemen: `P(bukan A) = 1 - P(A)`.
- Kejadian saling lepas: `P(A atau B) = P(A) + P(B)`.
- Kejadian bebas: `P(A dan B) = P(A) x P(B)`.

Contoh: dua dadu enam sisi dilempar. Semua hasil: `6 x 6 = 36`. Jumlah mata 7 muncul dari pasangan (1,6), (2,5), (3,4), (4,3), (5,2), (6,1): 6 hasil, sehingga `P = 6/36 = 1/6`.

Kuncinya: hitung pembilang dan penyebut dengan aturan hitung yang sama pada ruang hasil yang sama. Syarat "sama mungkin" harus benar; misalnya jumlah mata dua dadu tidak sama mungkin, tetapi pasangan berurutan (dadu pertama, dadu kedua) sama mungkin.

```cpp
#include <iostream>
using namespace std;

int main() {
    int sisiA, sisiB, target;
    cin >> sisiA >> sisiB >> target;
    int memenuhi = 0;
    for (int a = 1; a <= sisiA; a++) {
        for (int b = 1; b <= sisiB; b++) {
            if (a + b == target) {
                memenuhi++;
            }
        }
    }
    cout << memenuhi << "/" << sisiA * sisiB << "\n";
    return 0;
}
```

Untuk `6 6 7`, keluarannya `6/36`. Program mencetak pecahan tanpa disederhanakan; menyederhanakannya dengan FPB dibahas pada modul "Aritmetika".

## Prinsip sarang merpati (pigeonhole)

Bila `n + 1` objek ditempatkan ke dalam `n` kotak, maka paling sedikit satu kotak berisi dua objek atau lebih. Bentuk umumnya: bila `m` objek ditempatkan ke `n` kotak, maka ada kotak yang berisi paling sedikit `ceil(m / n)` objek (pembulatan ke atas).

Prinsip ini hanya menjamin keberadaan; ia tidak menunjuk kotak mana. Langkah kerjanya: (1) tentukan apa yang menjadi "objek", (2) tentukan apa yang menjadi "kotak" sehingga dua objek pada kotak yang sama berarti sifat yang dicari, (3) hitung.

Contoh:

- Di antara 13 orang, dua orang pasti lahir pada bulan yang sama (13 objek, 12 kotak bulan).
- Di antara 25 siswa, ada bulan yang dipakai paling sedikit `ceil(25 / 12) = 3` siswa.
- Di antara `n + 1` bilangan bulat, ada dua yang bersisa sama bila dibagi `n` (kotaknya adalah sisa `0, 1, ..., n-1`), sehingga selisih keduanya habis dibagi `n`.

```cpp
#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<long long> a(n + 1);
    for (int i = 0; i <= n; i++) {
        cin >> a[i];
    }
    // cari dua indeks dengan sisa sama modulo n; pigeonhole menjamin keberadaannya
    vector<int> terlihat(n, -1);
    for (int i = 0; i <= n; i++) {
        int sisa = (int)(((a[i] % n) + n) % n);
        if (terlihat[sisa] != -1) {
            cout << terlihat[sisa] + 1 << " " << i + 1 << "\n";
            return 0;
        }
        terlihat[sisa] = i;
    }
    return 0;
}
```

Untuk `n = 4` dan bilangan `7 10 3 8 12`: sisa modulo 4 adalah 3, 2, 3, 0, 0. Pasangan pertama yang ditemukan adalah indeks 1 dan 3 (nilai 7 dan 3), sehingga keluarannya `1 3`. Program mengasumsikan `n >= 1`.

## Prinsip inklusi-eksklusi

Untuk menghitung banyak anggota gabungan himpunan yang saling tumpang-tindih, jumlahkan ukuran setiap himpunan, kurangi ukuran irisan setiap pasangan, tambah ukuran irisan setiap tiga, dan seterusnya bergantian tanda.

- Dua himpunan: `|A ∪ B| = |A| + |B| - |A ∩ B|`.
- Tiga himpunan: `|A ∪ B ∪ C| = |A| + |B| + |C| - |A ∩ B| - |A ∩ C| - |B ∩ C| + |A ∩ B ∩ C|`.

Contoh: banyak bilangan dari 1 sampai 30 yang habis dibagi 2 atau 3 atau 5. Misalkan `A`, `B`, `C` himpunan kelipatan 2, 3, 5. Maka `|A| = 15`, `|B| = 10`, `|C| = 6`, `|A ∩ B|` adalah kelipatan 6 sehingga 5, `|A ∩ C|` kelipatan 10 sehingga 3, `|B ∩ C|` kelipatan 15 sehingga 2, dan `|A ∩ B ∩ C|` kelipatan 30 sehingga 1. Hasilnya `15 + 10 + 6 - 5 - 3 - 2 + 1 = 22`. Yang tidak habis dibagi satupun adalah `30 - 22 = 8`.

Irisan kelipatan `a` dan `b` adalah kelipatan `KPK(a, b)`, dan banyak kelipatan `d` pada `1..N` adalah `N / d` (pembagian bulat). Untuk banyak himpunan yang kecil, semua himpunan bagian tak kosong dapat dienumerasi dengan bitmask (lihat modul "Logika & bitwise"), dengan tanda `+` bila banyak himpunan yang dipilih ganjil dan `-` bila genap.

```cpp
#include <iostream>
using namespace std;

long long fpb(long long a, long long b) {
    while (b != 0) {
        long long sisa = a % b;
        a = b;
        b = sisa;
    }
    return a;
}

int main() {
    long long n;
    long long d[3];
    cin >> n >> d[0] >> d[1] >> d[2];
    long long total = 0;
    for (int mask = 1; mask < 8; mask++) {
        long long kpk = 1;
        int banyak = 0;
        for (int i = 0; i < 3; i++) {
            if ((mask >> i) & 1) {
                kpk = kpk / fpb(kpk, d[i]) * d[i];
                banyak++;
            }
        }
        long long kelipatan = n / kpk;
        if (banyak % 2 == 1) {
            total += kelipatan;
        } else {
            total -= kelipatan;
        }
    }
    cout << total << "\n";
    return 0;
}
```

Untuk masukan `30 2 3 5`, keluarannya `22`. Program ini mengasumsikan `d[i]` kecil (misalnya paling besar 1000) sehingga KPK tiga bilangan tidak melimpah.

Inklusi-eksklusi dapat dibalik untuk menghitung "tidak memenuhi satupun": total dikurangi banyak yang memenuhi paling sedikit satu.

## Kesalahan umum

- Memakai aturan jumlah pada kasus yang tumpang-tindih sehingga ada yang terhitung dua kali.
- Menjumlahkan padahal tahapnya berurutan (seharusnya dikali), atau sebaliknya.
- Tertukar antara permutasi (urutan penting) dan kombinasi (urutan tidak penting).
- Lupa membagi dengan faktorial kelompok objek yang sama saat menghitung susunan.
- Menghitung `n!` atau `C(n, k)` dengan `int` atau menghitung faktorial lengkap padahal hasil akhirnya kecil, sehingga melimpah di hasil antara.
- Menganggap hasil percobaan sama mungkin padahal tidak (misalnya jumlah mata dua dadu).
- Memakai pigeonhole tanpa menyatakan dengan jelas apa objek dan apa kotaknya.
- Pada inklusi-eksklusi, lupa menyesuaikan tanda atau lupa bahwa irisan kelipatan adalah kelipatan KPK, bukan hasil kali.
- Menghitung Fibonacci secara rekursif langsung untuk `n` besar.

## Latihan

Latihan di bawah dibuat khusus untuk modul ini. Kerjakan di komputer atau di kertas, lalu bandingkan dengan contoh masukan dan keluaran.

### Latihan 1: Permutasi sebagian

Masukan: dua bilangan bulat `n` dan `k` (0 <= k <= n <= 20). Cetak `P(n, k)`, yaitu banyak cara memilih dan menyusun `k` dari `n` objek berbeda.

Contoh masukan: `5 2`
Contoh keluaran: `20`

Petunjuk: hitung langsung dengan hasil kali `k` suku; jangan menghitung `n!` dan `(n-k)!` terpisah. Pastikan kamu bisa menjelaskan mengapa hasil untuk `n = 20` masih muat di `long long`.

### Latihan 2: Kombinasi dengan Pascal

Masukan: dua bilangan bulat `n` dan `k` (0 <= k <= n <= 60). Cetak `C(n, k)`.

Contoh masukan: `10 3`
Contoh keluaran: `120`

Contoh lain: masukan `60 30` memberi keluaran `118264581564861424`.

### Latihan 3: Tidak habis dibagi satupun

Masukan: empat bilangan bulat `N a b c` (1 <= N <= 10^9, 1 <= a, b, c <= 1000). Cetak banyak bilangan dari 1 sampai `N` yang tidak habis dibagi `a`, `b`, maupun `c`.

Contoh masukan: `30 2 3 5`
Contoh keluaran: `8`

Petunjuk: hitung dulu yang habis dibagi paling sedikit satu dengan inklusi-eksklusi. Perhatikan bahwa `a`, `b`, `c` tidak harus berbeda atau saling prima.

### Latihan 4: Bilangan Fibonacci

Masukan: satu bilangan bulat `n` (1 <= n <= 90). Cetak `F(n)` dengan `F(1) = F(2) = 1`.

Contoh masukan: `10`
Contoh keluaran: `55`

Contoh lain: masukan `50` memberi keluaran `12586269025`.

Petunjuk: mengapa batas `n` dibuat 90 dan bukan 100?

### Latihan 5: Peluang jumlah genap

Masukan: dua bilangan bulat `p` dan `q` (1 <= p, q <= 1000), banyak sisi dua dadu adil (dadu bernomor 1 sampai jumlah sisinya). Kedua dadu dilempar sekali. Cetak peluang jumlah kedua mata genap, dalam bentuk pecahan paling sederhana `pembilang/penyebut`.

Contoh masukan: `3 3`
Contoh keluaran: `5/9`

Contoh lain: masukan `2 3` memberi keluaran `1/2`.

Petunjuk: hitung banyak hasil yang memenuhi dan banyak semua hasil, lalu sederhanakan dengan FPB.

### Latihan 6: Penalaran di kertas

1. Sebuah laci berisi sangat banyak kaus kaki berwarna merah, biru, dan hijau. Berapa kaus kaki minimum yang harus diambil dalam gelap agar pasti ada sepasang berwarna sama? Berapa bila ingin pasti ada tiga berwarna sama?
2. Ada 8 orang akan duduk melingkar di meja bundar. Berapa susunan berbeda (rotasi dianggap sama)? Berapa bila dua orang tertentu harus selalu duduk bersebelahan?
3. Berapa banyak susunan huruf berbeda dari kata `KAKAK`?
4. Tunjukkan dengan pigeonhole bahwa di antara 5 bilangan bulat apa pun, ada dua bilangan yang selisihnya habis dibagi 4.
5. Barisan aritmetika memiliki suku pertama 5 dan beda 3. Tentukan suku ke-10 dan jumlah 10 suku pertama.

### Latihan 7: Temukan kesalahannya

Program berikut dimaksudkan menghitung jumlah `1 + 2 + ... + n` untuk `n` hingga `10^9`, tetapi memberi jawaban salah untuk `n` besar. Jelaskan penyebabnya, perbaiki, dan rancang satu masukan yang menunjukkan kesalahan itu.

```cpp
#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    long long jumlah = n * (n + 1) / 2;
    cout << jumlah << "\n";
    return 0;
}
```

## Cek mandiri

Setelah selesai, pastikan kamu bisa menjawab tanpa melihat catatan:

- Kapan memakai aturan jumlah dan kapan aturan kali?
- Apa beda permutasi dan kombinasi, dan mengapa `C(n, k) = P(n, k) / k!`?
- Mengapa `C(n, k) = C(n-1, k-1) + C(n-1, k)`?
- Berapa banyak susunan huruf kata `AABBB`, dan mengapa dibagi `2! x 3!`?
- Apa syarat agar rumus peluang "banyak yang memenuhi dibagi banyak semua" boleh dipakai?
- Pada pigeonhole, bagaimana menentukan "objek" dan "kotak"?
- Mengapa irisan kelipatan 4 dan kelipatan 6 adalah kelipatan 12, bukan kelipatan 24?
- Berapa nilai terbesar `n` agar `F(n)` masih muat di `long long`?

## Langkah berikutnya

Lanjutkan ke topik berikutnya pada silabus (pemrograman dinamis). Banyak soal DP menghitung banyak cara dengan hubungan seperti Pascal dan Fibonacci, sehingga pemahaman rekursi dan batas nilai di modul ini akan terpakai. Untuk melihat cakupan resmi dan silabus terbaru, rujuk halaman silabus OSN di bagian Rujukan. Untuk soal latihan tambahan, pilih soal dari arsip resmi lalu kerjakan sendiri; jangan menyalin soal ke dalam modul ini.
