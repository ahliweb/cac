## Untuk siapa modul ini

Modul ini untuk siswa SMA yang berlatih menuju OSN Informatika dan memakai C++17. Isinya mengikuti rumpun materi "Aritmetika": bilangan bulat, paritas, keterbagian, aritmetika modular, perpangkatan modular, bilangan prima, pecahan, teori bilangan dasar, dan himpunan. Pada silabus pembinaan, topik ini muncul di minggu 9 (teori bilangan I: FPB/KPK, keterbagian, prima, saringan, faktorisasi, aritmetika modular) dan minggu 10 (teori bilangan II: perpangkatan cepat, perpangkatan modular, konsep himpunan, paritas).

Prasyarat: variabel, perulangan, fungsi, dan perbedaan `int` dengan `long long` (lihat modul "Dasar Pemrograman dengan C++"). Modul ini sering menyebut batas tipe data karena hampir semua kesalahan pada soal teori bilangan berasal dari overflow.

Setelah mempelajari modul ini, kamu diharapkan bisa menghitung FPB dan KPK, memeriksa dan mencari bilangan prima, memfaktorkan bilangan, menghitung sisa hasil bagi dengan aman, menghitung perpangkatan modular secara cepat, mengolah pecahan tanpa bilangan desimal, dan menghitung himpunan.

Cara memakai: baca penjelasan, ketik ulang setiap contoh, ubah nilainya, lalu kerjakan latihan. Contoh kode di modul ini hanya diperiksa bisa dikompilasi (C++17); itu tidak membuktikan contoh benar untuk semua masukan, jadi tetap uji sendiri.

## Bilangan bulat dan paritas

Bilangan bulat adalah `..., -2, -1, 0, 1, 2, ...`. Paritas adalah sifat genap atau ganjil: bilangan genap habis dibagi 2, bilangan ganjil tidak.

Sifat paritas yang sering dipakai pada soal penalaran:

- genap + genap = genap, ganjil + ganjil = genap, genap + ganjil = ganjil;
- genap x apa pun = genap; ganjil x ganjil = ganjil;
- jumlah beberapa bilangan bersifat ganjil jika dan hanya jika banyak suku ganjil di antaranya ganjil (suku genap tidak mengubah paritas jumlah).

Di C++, cek genap dengan `n % 2 == 0`. Untuk `n` negatif, `n % 2` bisa bernilai `-1`, sehingga cek ganjil yang aman adalah `n % 2 != 0`, bukan `n % 2 == 1`.

```cpp
#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    if (n % 2 == 0) {
        cout << "genap" << "\n";
    } else {
        cout << "ganjil" << "\n";
    }
    return 0;
}
```

Untuk `n = -7`, keluarannya `ganjil` (karena `-7 % 2` bernilai `-1`, yang tidak sama dengan 0, maka cabang `else` dijalankan).

## Keterbagian

Kita tulis `a | b` ("a membagi b") bila ada bilangan bulat `k` sehingga `b = a * k`. Di C++, `b % a == 0` (dengan `a != 0`). Sifat dasar:

- jika `a | b` dan `a | c`, maka `a | (b + c)` dan `a | (b - c)`;
- jika `a | b` dan `b | c`, maka `a | c`;
- 0 habis dibagi semua bilangan bukan nol; tidak ada bilangan yang boleh dibagi 0.

Menghitung banyak pembagi positif suatu bilangan `n` cukup mencoba `i` sampai `sqrt(n)`: bila `i` membagi `n`, maka `n / i` juga pembagi. Setiap pasangan `(i, n / i)` dihitung sekali, kecuali bila `i * i == n`.

```cpp
#include <iostream>
using namespace std;

int main() {
    long long n;
    cin >> n;
    int banyak = 0;
    for (long long i = 1; i * i <= n; i++) {
        if (n % i == 0) {
            banyak++;                  // i
            if (i != n / i) {
                banyak++;              // pasangannya, n / i
            }
        }
    }
    cout << banyak << "\n";
    return 0;
}
```

Untuk `n = 36`, keluarannya `9` (pembagi: 1, 2, 3, 4, 6, 9, 12, 18, 36). Perhatikan `i` bertipe `long long` agar `i * i` tidak melimpah ketika `n` besar; `i * i <= n` pada `int` dengan `n` dekat 2,1 miliar adalah overflow bertanda (perilaku tak terdefinisi).

## FPB dan KPK

Faktor Persekutuan Terbesar (FPB, `gcd`) dua bilangan adalah pembagi persekutuan terbesarnya. Kelipatan Persekutuan Terkecil (KPK, `lcm`) adalah kelipatan positif persekutuan terkecilnya. Hubungannya: untuk `a, b > 0`, `FPB(a, b) * KPK(a, b) = a * b`.

Algoritma Euclid memakai kenyataan `FPB(a, b) = FPB(b, a mod b)` dan `FPB(a, 0) = a`. Algoritma ini sangat cepat: jumlah langkahnya berbanding lurus dengan jumlah digit, bukan dengan nilainya.

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

long long kpk(long long a, long long b) {
    return a / fpb(a, b) * b;   // bagi dulu, baru kali, agar tidak melimpah tanpa perlu
}

int main() {
    long long a, b;
    cin >> a >> b;
    cout << fpb(a, b) << " " << kpk(a, b) << "\n";
    return 0;
}
```

Untuk `12 18`, keluarannya `6 36`. Menulis `a * b / fpb(a, b)` benar secara matematis, tetapi hasil kali `a * b` bisa melimpah padahal KPK-nya masih muat; `a / fpb(a, b) * b` menghindarinya. Hasil KPK tetap dapat melimpah bila memang terlalu besar, jadi baca batas soal.

C++17 juga menyediakan `std::gcd` dan `std::lcm` pada `<numeric>`; memahami algoritmanya tetap perlu.

## Aritmetika modular

Kita tulis `a ≡ b (mod m)` bila `m | (a - b)`; artinya `a` dan `b` bersisa sama bila dibagi `m`. Operator `%` di C++ memberi sisa dengan tanda mengikuti bilangan yang dibagi, sehingga untuk `a` negatif hasilnya bisa negatif.

Sifat yang membuat modulo praktis: modulo dapat diambil di tengah perhitungan untuk penjumlahan, pengurangan, dan perkalian.

- `(a + b) mod m = ((a mod m) + (b mod m)) mod m`
- `(a * b) mod m = ((a mod m) * (b mod m)) mod m`
- `(a - b) mod m = ((a mod m) - (b mod m) + m) mod m` (tambah `m` agar tidak negatif)

Pembagian tidak boleh dilakukan begitu saja: `(a / b) mod m` tidak sama dengan `((a mod m) / (b mod m)) mod m`.

```cpp
#include <iostream>
using namespace std;

const long long MOD = 1000000007LL;

long long tambah(long long a, long long b) {
    return (a % MOD + b % MOD) % MOD;
}

long long kurang(long long a, long long b) {
    return ((a % MOD - b % MOD) % MOD + MOD) % MOD;
}

long long kali(long long a, long long b) {
    return (a % MOD) * (b % MOD) % MOD;
}

int main() {
    cout << tambah(1000000006LL, 5) << "\n";   // 4
    cout << kurang(3, 10) << "\n";             // 1000000000
    cout << kali(1000000006LL, 1000000006LL) << "\n";   // 1
    return 0;
}
```

`MOD` sekitar `10^9` berarti hasil kali dua sisa kurang dari sekitar `10^18`, yang masih muat di `long long`. Bila modulonya lebih besar dari sekitar `3 x 10^9`, hasil kali dua sisa bisa melebihi batas `long long`; teknik lain diperlukan (di luar cakupan modul ini).

Untuk pembagian modulo bilangan prima `p`: jika `b` tidak habis dibagi `p`, maka kebalikan modular dari `b` adalah `b^(p-2) mod p` (teorema kecil Fermat), sehingga `a / b` dihitung sebagai `a * b^(p-2) mod p`. Kamu bisa memakainya setelah belajar perpangkatan modular di bawah.

## Perpangkatan modular

Menghitung `a^b mod m` dengan mengalikan `a` sebanyak `b` kali terlalu lambat bila `b` besar. Perpangkatan cepat (fast exponentiation) memakai pengamatan:

- `a^0 = 1`;
- jika `b` genap: `a^b = (a^(b/2))^2`;
- jika `b` ganjil: `a^b = a * a^(b-1)`.

Versi iteratif memproses bit-bit `b`: bila bit saat ini 1, kalikan hasil dengan basis; lalu kuadratkan basis dan geser `b` ke kanan. Banyak langkahnya sekitar `log2(b)`.

```cpp
#include <iostream>
using namespace std;

long long pangkatMod(long long a, long long b, long long m) {
    long long hasil = 1 % m;
    a %= m;
    while (b > 0) {
        if (b & 1) {
            hasil = hasil * a % m;
        }
        a = a * a % m;
        b >>= 1;
    }
    return hasil;
}

int main() {
    long long a, b, m;
    cin >> a >> b >> m;
    cout << pangkatMod(a, b, m) << "\n";
    return 0;
}
```

Untuk `2 10 1000`, keluarannya `24` (karena `2^10 = 1024`). `hasil` diawali dengan `1 % m` agar benar juga untuk `m = 1` (semua sisa 0). Perhitungan ini aman dari overflow selama `m` tidak lebih dari sekitar `3 x 10^9`, karena `a` dan `hasil` selalu kurang dari `m` sebelum dikalikan.

## Bilangan prima

Bilangan prima adalah bilangan bulat lebih dari 1 yang hanya punya dua pembagi positif: 1 dan dirinya sendiri. 1 bukan prima. 2 adalah satu-satunya prima genap.

Cara memeriksa apakah `n` prima: cukup coba pembagi `i` dari 2 sampai `sqrt(n)`, karena bila `n = a * b` maka salah satu faktornya tidak lebih dari `sqrt(n)`.

```cpp
#include <iostream>
using namespace std;

bool prima(long long n) {
    if (n < 2) {
        return false;
    }
    for (long long i = 2; i * i <= n; i++) {
        if (n % i == 0) {
            return false;
        }
    }
    return true;
}

int main() {
    long long n;
    cin >> n;
    cout << (prima(n) ? "prima" : "bukan prima") << "\n";
    return 0;
}
```

Untuk `n = 97` keluarannya `prima`; untuk `n = 91` keluarannya `bukan prima` (91 = 7 x 13). Pemeriksaan satu bilangan memerlukan sekitar `sqrt(n)` langkah, cukup untuk `n` hingga sekitar `10^12` pada satu bilangan, tetapi terlalu lambat bila harus memeriksa jutaan bilangan.

### Saringan Eratosthenes

Untuk menemukan semua prima sampai `N`, coret kelipatan setiap prima mulai dari kuadratnya. Kompleksitasnya sekitar `O(N log log N)` dan memori `O(N)`.

```cpp
#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<bool> prima(n + 1, true);
    prima[0] = false;
    if (n >= 1) {
        prima[1] = false;
    }
    for (long long i = 2; i * i <= n; i++) {
        if (prima[i]) {
            for (long long j = i * i; j <= n; j += i) {
                prima[j] = false;
            }
        }
    }
    int banyak = 0;
    for (int i = 2; i <= n; i++) {
        if (prima[i]) {
            banyak++;
        }
    }
    cout << banyak << "\n";
    return 0;
}
```

Untuk `n = 30`, keluarannya `10` (2, 3, 5, 7, 11, 13, 17, 19, 23, 29). Mulai dari `i * i` karena kelipatan yang lebih kecil sudah dicoret oleh faktor prima yang lebih kecil.

## Faktorisasi prima

Setiap bilangan bulat lebih dari 1 dapat ditulis sebagai hasil kali bilangan prima, dan penulisan itu unik selain urutannya (teorema dasar aritmetika). Faktorisasi dengan pembagian coba-coba sampai `sqrt(n)`:

```cpp
#include <iostream>
using namespace std;

int main() {
    long long n;
    cin >> n;
    for (long long p = 2; p * p <= n; p++) {
        int pangkat = 0;
        while (n % p == 0) {
            n /= p;
            pangkat++;
        }
        if (pangkat > 0) {
            cout << p << " " << pangkat << "\n";
        }
    }
    if (n > 1) {
        cout << n << " " << 1 << "\n";   // sisa yang pasti prima
    }
    return 0;
}
```

Untuk `n = 360`, keluarannya tiga baris: `2 3`, `3 2`, `5 1` (karena 360 = 2^3 x 3^2 x 5). Setelah semua faktor `p` sampai `sqrt(n)` dibuang, sisa `n` yang lebih dari 1 pastilah prima. Banyak pembagi positif dari `n = p1^e1 x p2^e2 x ...` adalah `(e1 + 1)(e2 + 1)...`; untuk 360 itu `4 x 3 x 2 = 24`.

## Pecahan

Hindari `double` untuk pecahan pada soal yang meminta hasil tepat. Simpan pecahan sebagai pasangan bilangan bulat pembilang dan penyebut, lalu sederhanakan dengan FPB.

- penjumlahan: `a/b + c/d = (a*d + c*b) / (b*d)`;
- perkalian: `a/b * c/d = (a*c) / (b*d)`;
- bentuk paling sederhana: bagi pembilang dan penyebut dengan `FPB` keduanya.

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
    long long a, b, c, d;
    cin >> a >> b >> c >> d;
    long long pembilang = a * d + c * b;
    long long penyebut = b * d;
    long long g = fpb(pembilang, penyebut);
    cout << pembilang / g << " " << penyebut / g << "\n";
    return 0;
}
```

Untuk `1 2 1 3` (yaitu 1/2 + 1/3), keluarannya `5 6`. Program ini mengasumsikan penyebut positif dan semua nilai masukan cukup kecil sehingga `a * d + c * b` dan `b * d` muat di `long long` (misalnya semuanya paling besar `10^9`). Bila tidak, hitung KPK penyebut lebih dulu atau kurangi pecahan sebelum mengalikan.

## Himpunan

Himpunan adalah kumpulan objek berbeda tanpa urutan. Notasi dan operasi dasar:

- `|A|`: banyak anggota (kardinalitas);
- gabungan `A ∪ B`: anggota yang ada di A atau B;
- irisan `A ∩ B`: anggota yang ada di A dan B;
- selisih `A \ B`: anggota A yang tidak ada di B.

Rumus banyak anggota gabungan: `|A ∪ B| = |A| + |B| - |A ∩ B|` (anggota persekutuan terhitung dua kali bila dijumlahkan begitu saja, maka dikurangi satu kali). Rumus ini akan diperluas pada modul "Aturan berhitung" sebagai prinsip inklusi-eksklusi.

Di C++, `set<int>` menyimpan anggota unik dengan urutan terurut. Untuk menghitung irisan, periksa setiap anggota A apakah ada di B dengan `count`.

```cpp
#include <iostream>
#include <set>
using namespace std;

int main() {
    int n, m;
    cin >> n >> m;
    set<int> a, b;
    for (int i = 0; i < n; i++) {
        int x;
        cin >> x;
        a.insert(x);
    }
    for (int i = 0; i < m; i++) {
        int x;
        cin >> x;
        b.insert(x);
    }
    int irisan = 0;
    for (int x : a) {
        if (b.count(x) > 0) {
            irisan++;
        }
    }
    int gabungan = (int)a.size() + (int)b.size() - irisan;
    cout << gabungan << " " << irisan << "\n";
    return 0;
}
```

Untuk masukan `4 3`, `1 2 3 4`, `3 4 5`, keluarannya `5 2`. Karena memakai `set`, nilai yang berulang pada masukan hanya dihitung sekali. Himpunan kecil dengan anggota `0` sampai `n - 1` juga dapat diwakili bitmask (lihat modul "Logika & bitwise").

## Kesalahan umum

- Memakai `n % 2 == 1` untuk mengecek ganjil pada bilangan yang mungkin negatif.
- Lupa bahwa `%` bisa bernilai negatif, sehingga hasil `(a - b) % m` salah; tambahkan `m` lalu ambil modulo lagi.
- Menulis `i * i <= n` dengan `i` bertipe `int` dan `n` besar (overflow bertanda, perilaku tak terdefinisi).
- Menghitung `a * b / fpb(a, b)` sehingga `a * b` melimpah padahal KPK-nya muat.
- Mengalikan dua nilai modulo tanpa mengubahnya ke `long long` lebih dulu, sehingga hasil kali melimpah di `int`.
- Mengira 1 adalah bilangan prima.
- Memakai `double` untuk menjumlahkan pecahan dan membandingkan hasilnya dengan `==`.
- Membagi modulo secara langsung (`(a / b) % m`) tanpa kebalikan modular.

## Latihan

Latihan di bawah dibuat khusus untuk modul ini. Kerjakan di komputer, lalu bandingkan dengan contoh masukan dan keluaran.

### Latihan 1: Jumlah bilangan prima

Masukan: satu bilangan bulat `N` (1 <= N <= 1.000.000). Cetak jumlah semua bilangan prima yang tidak lebih dari `N`.

Contoh masukan: `10`
Contoh keluaran: `17`

Contoh lain: masukan `100` memberi keluaran `1060`.

Petunjuk: perkirakan nilai terbesar jawabannya sebelum memilih tipe data, lalu pakai saringan.

### Latihan 2: Pangkat modular

Masukan: tiga bilangan bulat `a`, `b`, `m` pada satu baris (0 <= a <= 10^18, 0 <= b <= 10^18, 1 <= m <= 10^9). Cetak `a^b mod m`, dengan `0^0` dianggap 1.

Contoh masukan: `3 13 7`
Contoh keluaran: `3`

Contoh lain: masukan `2 10 1000` memberi keluaran `24`.

Petunjuk: ada langkah pertama sebelum perulangan yang perlu kamu lakukan pada `a` karena `a` bisa jauh lebih besar dari `m`.

### Latihan 3: Jumlah dua pecahan

Masukan: empat bilangan bulat `a b c d` (0 <= a, c <= 10^9, 1 <= b, d <= 10^9) yang mewakili `a/b` dan `c/d`. Cetak jumlah keduanya dalam bentuk paling sederhana sebagai `pembilang penyebut`. Bila hasilnya 0, cetak `0 1`.

Contoh masukan: `1 6 1 3`
Contoh keluaran: `1 2`

Petunjuk: pikirkan nilai terbesar `a * d + c * b`, dan apa yang terjadi bila pembilang 0.

### Latihan 4: Faktorisasi dan banyak pembagi

Masukan: satu bilangan bulat `N` (2 <= N <= 10^12). Cetak banyak pembagi positif `N` memakai faktorisasi prima, bukan dengan mencoba setiap bilangan sampai `N`.

Contoh masukan: `360`
Contoh keluaran: `24`

Contoh lain: masukan `97` memberi keluaran `2`.

### Latihan 5: KPK banyak bilangan

Masukan: baris pertama berisi `n` (1 <= n <= 100). Baris kedua berisi `n` bilangan bulat positif. Dijamin KPK seluruhnya tidak lebih dari 10^18. Cetak KPK-nya.

Contoh masukan:
```text
3
4 6 10
```
Contoh keluaran: `60`

Petunjuk: KPK dapat dihitung berurutan. Perhatikan urutan operasi agar hasil antara tidak melimpah tanpa perlu.

### Latihan 6: Dua himpunan

Masukan: baris pertama berisi `n` dan `m` (1 <= n, m <= 100.000). Baris kedua berisi `n` bilangan bulat (boleh berulang), baris ketiga berisi `m` bilangan bulat (boleh berulang), semuanya antara -10^9 dan 10^9. Anggap kedua baris sebagai himpunan. Cetak `|A ∪ B|`, `|A ∩ B|`, dan `|A \ B|` dalam satu baris, dipisahkan spasi.

Contoh masukan:
```text
4 3
1 2 3 4
3 4 5
```
Contoh keluaran: `5 2 2`

### Latihan 7: Temukan kesalahannya

Program berikut dimaksudkan memeriksa apakah `n` (hingga 2.000.000.000) adalah bilangan prima. Jelaskan dua masalah di dalamnya (satu soal batas tipe data, satu soal kasus kecil), perbaiki, lalu rancang masukan yang menunjukkan masing-masing.

```cpp
#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    bool prima = true;
    for (int i = 2; i * i <= n; i++) {
        if (n % i == 0) {
            prima = false;
        }
    }
    cout << (prima ? "prima" : "bukan prima") << "\n";
    return 0;
}
```

## Cek mandiri

Setelah selesai, pastikan kamu bisa menjawab tanpa melihat catatan:

- Mengapa `n % 2 == 1` bukan cek ganjil yang aman untuk `n` negatif?
- Mengapa pemeriksaan pembagi cukup sampai `sqrt(n)`?
- Bagaimana algoritma Euclid menghitung `FPB(48, 18)`, dan mengapa KPK dihitung dengan `a / fpb * b`?
- Bagaimana menghitung `(3 - 10) mod 7` agar hasilnya tak negatif?
- Mengapa perpangkatan cepat hanya perlu sekitar `log2(b)` langkah?
- Apa batas `m` agar `a * a % m` aman pada `long long`?
- Mengapa saringan Eratosthenes mulai mencoret dari `i * i`?
- Mengapa jumlah dua pecahan perlu disederhanakan dengan FPB?
- Berapa `|A ∪ B|` bila `|A| = 6`, `|B| = 5`, dan `|A ∩ B| = 2`?

## Langkah berikutnya

Lanjutkan ke topik berikutnya pada silabus (aturan berhitung, yang memakai himpunan dan modulo). Untuk melihat cakupan resmi dan silabus terbaru, rujuk halaman silabus OSN di bagian Rujukan. Untuk soal latihan tambahan, pilih soal dari arsip resmi lalu kerjakan sendiri; jangan menyalin soal ke dalam modul ini.
