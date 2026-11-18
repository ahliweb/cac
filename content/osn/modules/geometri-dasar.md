## Untuk siapa modul ini

Modul ini untuk siswa SMA yang sudah memahami dasar pemrograman C++17 dan ingin mempelajari geometri dasar untuk OSN Informatika. Isinya mengikuti rumpun materi "Geometri dasar" dan topik minggu 24 pada silabus pembinaan: titik dan koordinat, garis, segmen, dan sudut, bangun dasar, jarak Euclidean dan teorema Pythagoras, intuisi cross product, serta definisi convex hull. Algoritma pembentuk convex hull tidak dibahas; yang dibahas adalah definisinya dan cara memeriksa sifat-sifat dasarnya.

Setelah mempelajari modul ini, kamu diharapkan bisa menyelesaikan soal geometri dasar sebisa mungkin dengan bilangan bulat, dan tahu kapan bilangan pecahan (`double`) diperlukan serta bagaimana menjaga ketelitiannya.

Cara memakai: baca penjelasan, ketik ulang setiap contoh (jangan hanya disalin), ubah nilainya, lalu kerjakan latihan. Contoh kode di modul ini hanya diperiksa bisa dikompilasi (C++17); itu tidak membuktikan contoh benar untuk semua masukan, jadi tetap uji sendiri. Gambarlah titik-titiknya di kertas berpetak; geometri hampir selalu lebih mudah dipahami dengan gambar.

## Titik dan koordinat

Sebuah titik pada bidang dinyatakan dengan pasangan `(x, y)`. Pada soal kompetisi, koordinat sering berupa bilangan bulat. Simpan titik dalam `struct` supaya kodenya rapi, dan pakai `long long` karena hasil kali koordinat mudah melampaui batas `int`.

```cpp
struct Titik {
    long long x, y;
};
```

Vektor dari titik `a` ke titik `b` adalah `(b.x - a.x, b.y - a.y)`. Hampir semua perhitungan geometri dasar dapat ditulis dengan selisih koordinat seperti ini.

## Jarak Euclidean dan teorema Pythagoras

Jarak Euclidean antara `(x1, y1)` dan `(x2, y2)` mengikuti teorema Pythagoras: sisi horizontalnya `dx = x1 - x2`, sisi vertikalnya `dy = y1 - y2`, dan jaraknya adalah akar dari `dx^2 + dy^2`.

Kebiasaan penting: **hindari akar kuadrat selama masih bisa**. Untuk membandingkan jarak, bandingkan jarak kuadratnya; hasilnya sama karena akar kuadrat menaikkan urutan, dan perhitungan tetap bilangan bulat tepat. Gunakan `sqrt` hanya bila soal benar-benar meminta jarak sebenarnya, itu pun di langkah paling akhir.

```cpp
#include <cmath>
#include <iomanip>
#include <iostream>
using namespace std;

struct Titik {
    long long x, y;
};

long long jarakKuadrat(Titik a, Titik b) {
    long long dx = a.x - b.x;
    long long dy = a.y - b.y;
    return dx * dx + dy * dy;
}

int main() {
    Titik a, b, c;
    cin >> a.x >> a.y >> b.x >> b.y >> c.x >> c.y;

    cout << jarakKuadrat(a, b) << "\n";
    cout << fixed << setprecision(3) << sqrt((double)jarakKuadrat(a, b)) << "\n";

    if (jarakKuadrat(a, b) < jarakKuadrat(a, c)) {
        cout << "B lebih dekat" << "\n";
    } else {
        cout << "C sama dekat atau lebih dekat" << "\n";
    }
    return 0;
}
```

Untuk `A = (0, 0)`, `B = (3, 4)`, dan `C = (6, 8)`, keluarannya `25`, `5.000`, lalu `B lebih dekat`. Jarak A ke B adalah 5 (segitiga siku-siku 3, 4, 5).

Tentang rentang bilangan: bila koordinat bernilai paling banyak 10^9 dalam nilai mutlak, selisih `dx` dan `dy` paling besar 2 x 10^9, kuadratnya 4 x 10^18, dan jumlah keduanya paling besar 8 x 10^18. Itu masih di bawah batas `long long` (sekitar 9,22 x 10^18), tetapi tidak muat di `int` dan tidak lagi persis bila diubah ke `double` (di atas sekitar 9 x 10^15, `double` tidak dapat menyimpan semua bilangan bulat dengan persis).

## Bilangan pecahan dan presisi floating point

`double` menyimpan bilangan pecahan dalam bentuk biner dengan jumlah digit terbatas (sekitar 15 digit desimal yang dapat diandalkan). Banyak bilangan desimal sederhana, seperti 0,1, tidak dapat disimpan persis, sehingga hasil hitungan bisa meleset sangat kecil. Akibatnya:

- Jangan membandingkan dua `double` dengan `==`. Bandingkan selisih mutlaknya dengan sebuah toleransi kecil (epsilon).
- Epsilon harus sesuai skala bilangan. Untuk nilai sekitar 10^9, jarak antara dua `double` yang bersebelahan sudah sekitar 10^-7, sehingga epsilon 10^-9 tidak ada gunanya. Untuk skala besar, bandingkan secara relatif atau hindari `double`.
- Kesalahan kecil menumpuk. Rumus yang mengurangkan dua bilangan hampir sama atau membagi dengan bilangan kecil dapat memperbesar kesalahan.
- `long double` memberi presisi lebih tinggi pada banyak kompiler, tetapi bukan jaminan standar dan lebih lambat; ia mengurangi masalah, tidak menghilangkannya.

```cpp
#include <cmath>
#include <iostream>
using namespace std;

const double EPS = 1e-9;

bool hampirSama(double a, double b) {
    return fabs(a - b) < EPS;
}

int main() {
    double a = 0.1 + 0.2;
    double b = 0.3;
    cout << (a == b) << " " << hampirSama(a, b) << "\n";    // 0 1
    return 0;
}
```

Aturan praktis: **kalau datanya bilangan bulat dan pertanyaannya bisa dijawab dengan bilangan bulat, kerjakan dengan bilangan bulat.** Contoh: membandingkan jarak (pakai jarak kuadrat), menentukan arah belokan (pakai cross product, di bawah), dan menghitung luas poligon (hitung dua kali luasnya sebagai bilangan bulat, lalu bagi dua hanya saat mencetak). Saat hasil memang pecahan, cetak dengan jumlah desimal yang diminta soal memakai `fixed` dan `setprecision`.

## Dot product dan cross product

Untuk dua vektor `u = (ux, uy)` dan `v = (vx, vy)`:

- Dot product: `u . v = ux * vx + uy * vy`. Bernilai 0 bila keduanya tegak lurus, positif bila sudut di antaranya lancip, dan negatif bila tumpul.
- Cross product (dua dimensi): `u x v = ux * vy - uy * vx`. Nilainya positif bila `v` berada di sisi kiri `u` (berlawanan arah jarum jam dari `u`), negatif bila di kanan, dan 0 bila sejajar (segaris). Besarnya sama dengan dua kali luas segitiga yang dibentuk kedua vektor.

Dengan tiga titik `a`, `b`, `c`, ambil `silang(a, b, c)` sebagai cross product vektor `ab` dan `ac`. Tandanya menyatakan arah belokan dari `a` ke `b` lalu `c`: positif berarti belok kiri, negatif belok kanan, nol berarti ketiganya segaris. Semuanya bilangan bulat, jadi tepat.

```cpp
#include <iostream>
using namespace std;

struct Titik {
    long long x, y;
};

long long silang(Titik a, Titik b, Titik c) {
    return (b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x);
}

int main() {
    Titik a, b, c;
    cin >> a.x >> a.y >> b.x >> b.y >> c.x >> c.y;
    long long s = silang(a, b, c);
    if (s > 0) {
        cout << "KIRI" << "\n";
    } else if (s < 0) {
        cout << "KANAN" << "\n";
    } else {
        cout << "LURUS" << "\n";
    }
    return 0;
}
```

Untuk `(0, 0)`, `(4, 0)`, `(4, 3)`: `silang = 4 * 3 - 0 * 4 = 12`, positif, jadi keluarannya `KIRI`. Nilai 12 adalah dua kali luas segitiga itu (luasnya 6).

Seperti jarak, cross product dapat mencapai sekitar 8 x 10^18 untuk koordinat sampai 10^9: masih muat di `long long`, tetapi periksa batas soal dan jangan mengalikan dua hasil cross product tanpa berpikir tentang overflow (untuk membandingkan tanda, bandingkan tandanya, bukan hasil kalinya).

## Garis, segmen, dan sudut

Beberapa istilah: garis memanjang tak terbatas ke dua arah; segmen adalah bagian garis di antara dua titik ujung; sinar (ray) memanjang tak terbatas ke satu arah.

Persamaan garis melalui `(x1, y1)` dan `(x2, y2)` dapat ditulis `a x + b y = c` dengan `a = y2 - y1`, `b = x1 - x2`, `c = a * x1 + b * y1`. Semua bilangan bulat jika koordinatnya bulat. Cara ini menghindari kelemahan memakai kemiringan `m = (y2 - y1) / (x2 - x1)`: garis vertikal membuat penyebutnya 0, dan pembagian menghasilkan bilangan pecahan yang tidak persis.

Memeriksa apakah titik `p` berada pada segmen `a-b`: `p` harus segaris dengan `a` dan `b` (cross product 0) dan berada di dalam kotak pembatas kedua titik ujung. Memeriksa apakah dua segmen berpotongan memakai tanda cross product: bila `c` dan `d` berada di sisi berlawanan dari garis `a-b`, dan `a` dan `b` berada di sisi berlawanan dari garis `c-d`, kedua segmen berpotongan; kasus segaris atau titik ujung yang menyentuh ditangani terpisah.

```cpp
#include <algorithm>
#include <iostream>
using namespace std;

struct Titik {
    long long x, y;
};

long long silang(Titik a, Titik b, Titik c) {
    return (b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x);
}

int tanda(long long v) {
    return (v > 0) - (v < 0);
}

bool padaSegmen(Titik a, Titik b, Titik p) {
    return silang(a, b, p) == 0 && min(a.x, b.x) <= p.x && p.x <= max(a.x, b.x) &&
           min(a.y, b.y) <= p.y && p.y <= max(a.y, b.y);
}

bool berpotongan(Titik a, Titik b, Titik c, Titik d) {
    int d1 = tanda(silang(a, b, c));
    int d2 = tanda(silang(a, b, d));
    int d3 = tanda(silang(c, d, a));
    int d4 = tanda(silang(c, d, b));
    if (d1 * d2 < 0 && d3 * d4 < 0) {
        return true;                          // berpotongan tepat di satu titik di dalam kedua segmen
    }
    return padaSegmen(a, b, c) || padaSegmen(a, b, d) || padaSegmen(c, d, a) ||
           padaSegmen(c, d, b);               // menyentuh di ujung atau saling menumpuk
}

int main() {
    int t;
    cin >> t;
    while (t--) {
        Titik a, b, c, d;
        cin >> a.x >> a.y >> b.x >> b.y >> c.x >> c.y >> d.x >> d.y;
        cout << (berpotongan(a, b, c, d) ? "YA" : "TIDAK") << "\n";
    }
    return 0;
}
```

Untuk segmen `(0,0)-(4,4)` dan `(0,4)-(4,0)` keluarannya `YA` (berpotongan di `(2,2)`); untuk `(0,0)-(1,1)` dan `(2,2)-(3,3)` keluarannya `TIDAK` (segaris tetapi terpisah). Perhatikan bahwa fungsi `tanda` dipakai agar tidak mengalikan dua cross product besar.

Sudut. Sudut dapat dinyatakan dalam derajat atau radian: `180` derajat sama dengan `pi` radian. Fungsi `atan2(y, x)` memberi sudut vektor `(x, y)` terhadap sumbu x positif dalam radian, antara `-pi` dan `pi`. Sudut antara dua vektor dapat dihitung dari `atan2(fabs(cross), dot)`, yang lebih stabil daripada memakai `acos` karena tidak bermasalah pada sudut yang sangat kecil atau mendekati 180 derajat. Konstanta `pi` didapat dengan `acos(-1.0)`; nama `M_PI` bukan bagian standar C++ dan tidak tersedia di semua lingkungan.

```cpp
#include <cmath>
#include <iomanip>
#include <iostream>
using namespace std;

int main() {
    double ux, uy, vx, vy;
    cin >> ux >> uy >> vx >> vy;
    double pi = acos(-1.0);
    double silang = ux * vy - uy * vx;
    double titik = ux * vx + uy * vy;
    double sudut = atan2(fabs(silang), titik) * 180.0 / pi;
    cout << fixed << setprecision(2) << sudut << "\n";
    return 0;
}
```

Untuk `u = (1, 0)` dan `v = (1, 1)`, keluarannya `45.00`; untuk `u = (1, 0)` dan `v = (0, 1)`, keluarannya `90.00`. Jika kedua vektor bulat dan yang ditanyakan hanya "lancip, siku-siku, atau tumpul", cukup lihat tanda dot product tanpa menghitung sudutnya.

## Bangun dasar

Rumus yang perlu diingat:

| Bangun | Luas | Keliling |
| --- | --- | --- |
| Persegi panjang (p x l) | `p * l` | `2 * (p + l)` |
| Segitiga (alas a, tinggi t) | `a * t / 2` | jumlah ketiga sisi |
| Lingkaran (jari-jari r) | `pi * r^2` | `2 * pi * r` |

Untuk poligon dengan titik-titik berurutan `p[0], p[1], ..., p[n-1]` (searah atau berlawanan arah jarum jam), rumus tali sepatu (shoelace) memberi dua kali luasnya: jumlah `p[i].x * p[i+1].y - p[i+1].x * p[i].y` untuk semua `i` (dengan `p[n]` sama dengan `p[0]`), lalu ambil nilai mutlaknya. Karena dua kali luas selalu bilangan bulat bila koordinatnya bulat, simpan dalam bilangan bulat dan bagi dua hanya saat mencetak: bagian desimalnya hanya `.0` atau `.5`.

```cpp
#include <cstdlib>
#include <iostream>
#include <vector>
using namespace std;

struct Titik {
    long long x, y;
};

int main() {
    int n;
    cin >> n;
    vector<Titik> p(n);
    for (auto& t : p) {
        cin >> t.x >> t.y;
    }
    long long duaLuas = 0;
    for (int i = 0; i < n; i++) {
        int j = (i + 1) % n;
        duaLuas += p[i].x * p[j].y - p[j].x * p[i].y;
    }
    if (duaLuas < 0) {
        duaLuas = -duaLuas;
    }
    cout << duaLuas / 2 << (duaLuas % 2 == 0 ? ".0" : ".5") << "\n";
    return 0;
}
```

Untuk persegi panjang `(0,0)`, `(4,0)`, `(4,3)`, `(0,3)`, jumlahnya 24 sehingga luasnya `12.0`. Untuk segitiga `(0,0)`, `(3,0)`, `(0,3)`, jumlahnya 9 sehingga luasnya `4.5`. Rumus ini benar untuk poligon sederhana (sisinya tidak saling berpotongan). Untuk koordinat besar dan banyak titik, jumlahnya bisa melebihi `long long`; periksa batas soal.

## Convex hull: definisi

Sebuah himpunan titik disebut konveks bila untuk setiap dua titik di dalamnya, seluruh segmen yang menghubungkannya juga berada di dalamnya. Convex hull dari sekumpulan titik adalah poligon konveks terkecil yang memuat semua titik itu. Bayangkan paku dipaku pada papan di setiap titik dan sebuah karet gelang diregangkan mengelilingi semuanya; bentuk karet itulah convex hull. Titik-titik yang menjadi sudut karet adalah titik pada hull; titik lain berada di dalam atau tepat pada sisinya.

Contoh: dari titik `(0,0)`, `(4,0)`, `(4,4)`, `(0,4)`, dan `(2,2)`, hull-nya adalah persegi dengan empat sudut pertama; titik `(2,2)` berada di dalamnya.

Cakupan rumpun ini hanya definisi dan intuisinya, jadi algoritma pembentuk hull (misalnya monotone chain atau Graham scan, yang bergantung pada cross product dan pengurutan titik) tidak dibahas di modul ini. Yang bisa kamu periksa sekarang: apakah sebuah poligon sederhana yang titiknya diberikan berurutan berlawanan arah jarum jam adalah konveks. Poligon seperti itu konveks bila tidak ada belokan ke kanan di sepanjang batasnya, yaitu cross product setiap tiga titik berturut-turut tidak negatif.

```cpp
#include <iostream>
#include <vector>
using namespace std;

struct Titik {
    long long x, y;
};

long long silang(Titik a, Titik b, Titik c) {
    return (b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x);
}

int main() {
    int n;
    cin >> n;
    vector<Titik> p(n);
    for (auto& t : p) {
        cin >> t.x >> t.y;
    }
    bool konveks = true;
    for (int i = 0; i < n; i++) {
        Titik a = p[i], b = p[(i + 1) % n], c = p[(i + 2) % n];
        if (silang(a, b, c) < 0) {
            konveks = false;
        }
    }
    cout << (konveks ? "YA" : "TIDAK") << "\n";
    return 0;
}
```

Penting: pemeriksaan ini hanya berlaku bila poligonnya sederhana dan titiknya diberikan berlawanan arah jarum jam. Poligon berbentuk bintang yang sisinya saling memotong bisa lolos pemeriksaan tanda tetapi bukan poligon sederhana; jika soal tidak menjamin hal itu, diperlukan pemeriksaan tambahan.

## Kesalahan umum

- Memakai `==` untuk membandingkan `double`, atau epsilon yang tidak sesuai skala.
- Memakai `sqrt` padahal perbandingan jarak kuadrat sudah cukup.
- Memakai `int` untuk selisih, kuadrat, atau cross product.
- Menghitung kemiringan dengan pembagian sehingga garis vertikal menyebabkan pembagian dengan nol.
- Lupa bahwa tanda cross product bergantung pada urutan titik, sehingga arah (kiri atau kanan) tertukar.
- Menghitung luas poligon dengan `double` padahal dua kali luas dalam bilangan bulat sudah tepat.
- Mencampur derajat dan radian pada fungsi trigonometri (fungsi `<cmath>` memakai radian).
- Lupa kasus khusus: titik berimpit, tiga titik segaris, atau segmen yang saling menumpuk.
- Mencetak jawaban pecahan dengan jumlah desimal yang tidak diminta soal.

## Latihan

Latihan di bawah dibuat khusus untuk modul ini. Kerjakan di komputer, lalu bandingkan dengan contoh masukan dan keluaran.

### Latihan 1: Pasangan terdekat

Masukan: `N` (2 <= N <= 1000), lalu `N` titik berkoordinat bulat `x y` (nilai mutlak paling besar 1.000.000.000), semuanya berbeda. Cetak kuadrat jarak terkecil di antara semua pasangan titik.

Contoh masukan:

```
4
0 0
5 5
1 1
7 0
```

Contoh keluaran: `2`

Petunjuk: coba semua pasangan (sekitar 500.000 pasangan untuk `N = 1000`) dan simpan nilai terkecil. Pakai `long long` dan jangan memakai `sqrt`.

### Latihan 2: Luas poligon

Masukan: `N` (3 <= N <= 100.000), lalu `N` titik berkoordinat bulat `x y` (nilai mutlak paling besar 1.000), membentuk poligon sederhana berurutan. Cetak luasnya dengan tepat satu angka desimal.

Contoh masukan:

```
3
0 0
3 0
0 3
```

Contoh keluaran: `4.5`

Petunjuk: pakai dua kali luas dalam bilangan bulat. Perkirakan nilai terbesar jumlahnya sebelum memilih tipe data.

### Latihan 3: Belokan

Masukan: `N` (3 <= N <= 100.000), lalu `N` titik berkoordinat bulat berurutan membentuk sebuah lintasan (bukan poligon tertutup). Untuk setiap tiga titik berturut-turut, tentukan apakah lintasan berbelok kiri, kanan, atau lurus. Cetak tiga bilangan: banyak belok kiri, belok kanan, dan lurus.

Contoh masukan:

```
5
0 0
2 0
2 2
0 2
0 4
```

Contoh keluaran: `2 1 0`

Petunjuk: telusuri tangan tiga titik pertama; hasilnya belok kiri. Gambarkan lintasannya dulu.

### Latihan 4: Dua segmen

Masukan: `T` (banyak kasus), lalu `T` baris masing-masing berisi delapan bilangan bulat `ax ay bx by cx cy dx dy`: segmen `a-b` dan segmen `c-d`. Untuk setiap kasus, cetak `YA` bila kedua segmen memiliki paling sedikit satu titik bersama (termasuk bila hanya menyentuh di ujung), selain itu `TIDAK`.

Contoh masukan:

```
3
0 0 4 4 0 4 4 0
0 0 1 1 2 2 3 3
0 0 2 2 2 2 5 0
```

Contoh keluaran:

```
YA
TIDAK
YA
```

Petunjuk: gambar ketiga kasus. Kasus kedua segaris tetapi terpisah; kasus ketiga hanya bersentuhan di titik `(2, 2)`.

### Latihan 5: Dua lingkaran

Masukan: `x1 y1 r1 x2 y2 r2`, bilangan bulat (r > 0), dua lingkaran. Cetak `YA` bila garis kedua lingkaran (kelilingnya, bukan daerah dalamnya) memiliki paling sedikit satu titik bersama, selain itu `TIDAK`.

Contoh masukan: `0 0 3 5 0 2`
Contoh keluaran: `YA`

Contoh masukan: `0 0 5 1 0 1`
Contoh keluaran: `TIDAK`

Petunjuk: jarak `d` antara pusat memenuhi `|r1 - r2| <= d <= r1 + r2`. Kuadratkan semua sisinya supaya tidak memakai akar, dan pertimbangkan batas nilainya sebelum memilih tipe data.

### Latihan 6: Konveks atau bukan

Masukan: `N` (3 <= N <= 100.000), lalu `N` titik berkoordinat bulat yang membentuk poligon sederhana, berurutan berlawanan arah jarum jam. Cetak `YA` bila poligon konveks, selain itu `TIDAK`.

Contoh masukan:

```
5
0 0
4 0
4 4
2 1
0 4
```

Contoh keluaran: `TIDAK`

Petunjuk: hitung cross product setiap tiga titik berturut-turut; belokan di titik `(2, 1)` ke arah mana?

### Latihan 7: Sudut tumpul

Masukan: enam bilangan bulat `ax ay bx by cx cy` (nilai mutlak paling besar 1.000.000.000), tiga titik berbeda. Cetak `LANCIP`, `SIKU`, atau `TUMPUL` untuk sudut di titik `b` pada segitiga `abc`, tanpa memakai `double`.

Contoh masukan: `0 0 2 0 2 3`
Contoh keluaran: `SIKU`

Petunjuk: pakai dot product dari vektor `ba` dan `bc`. Vektor `ba = (-2, 0)` dan `bc = (0, 3)`; berapa dot product-nya?

### Latihan 8: Presisi

Tanpa menjalankan program, jawablah:

1. Mengapa `0.1 + 0.2 == 0.3` bernilai salah pada C++, dan bagaimana cara yang benar membandingkannya?
2. Sebuah soal meminta menentukan titik `P` lebih dekat ke `A` atau ke `B`, dengan koordinat bulat sampai 10^9. Tulis cara membandingkannya tanpa `double`, dan jelaskan mengapa `double` dengan `sqrt` bisa salah pada kasus yang jaraknya hampir sama.
3. Poligon dengan koordinat bulat: mengapa lebih baik menghitung dua kali luas sebagai bilangan bulat dibanding menghitung luas dengan `double`?

## Cek mandiri

Setelah selesai, pastikan kamu bisa menjawab tanpa melihat catatan:

- Bagaimana membandingkan dua jarak tanpa memakai akar kuadrat?
- Apa arti tanda positif, negatif, dan nol pada cross product tiga titik?
- Apa hubungan nilai cross product dengan luas segitiga?
- Mengapa persamaan garis `a x + b y = c` lebih aman daripada kemiringan?
- Apa beda garis, segmen, dan sinar?
- Berapa konversi 180 derajat ke radian, dan fungsi `<cmath>` memakai satuan apa?
- Apa definisi convex hull, dan bagaimana intuisi karet gelangnya?
- Kapan epsilon 10^-9 tidak lagi bermakna untuk `double`?

## Langkah berikutnya

Lanjutkan ke topik campuran algoritma dan struktur data pada silabus. Pemahaman cross product ini akan dipakai bila kamu nanti mempelajari algoritma convex hull. Untuk melihat cakupan resmi dan silabus terbaru, rujuk halaman silabus OSN di bagian Rujukan. Untuk soal latihan tambahan, pilih soal dari arsip resmi (https://osn.toki.id/arsip) lalu kerjakan sendiri; jangan menyalin soal ke dalam modul ini.
