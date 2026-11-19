## Untuk siapa modul ini

Modul belajar untuk mata kuliah `KUL-I-101` (4 SKS, semester 1, jalur I), bagian
dari program `kuliah-coding`. Konten ini karangan menurut ADR-0007 dan belum
disetujui. Kode di modul ini adalah **C++17** (g++ 13.3, Linux): tiap blok `cpp`
dikompilasi dengan `-std=c++17 -Wall -Wextra` tanpa peringatan, dijalankan, dan
keluarannya cocok dengan yang tertulis.

Modul ini untuk mahasiswa semester 1 program studi informatika atau ilmu
komputer. Satu mata kuliah, satu semester: 14 pertemuan, ujian tengah semester
sesudah pertemuan 7, ujian akhir sesudah pertemuan 14 `[asumsi]` (silabus
bagian 2.3). Tidak ada prasyarat mata kuliah. Kamu butuh kompiler g++ (C++17),
Git, dan sebuah penyunting teks; jalankan perintah ini di terminal untuk
mencoba tiap contoh:

```bash
g++ -std=c++17 -Wall -Wextra -o program program.cpp
./program
```

`-Wall -Wextra` mengaktifkan peringatan; anggap sebagai petunjuk. Pegang modul ini sebagai pegangan belajar satu semester: kerjakan tiap bagian
**dengan tangan**. Rasa lancar saat membaca ulang solusi bukan bukti kamu bisa
menulisnya sendiri.

## Peta semester

| Pertemuan | Bagian | Pokok bahasan | CPMK | Kuis pembuka (jarak) |
| --- | --- | --- | --- | --- |
| 1 | 1 | Variabel dan tipe | C1 | pengetahuan sehari-hari |
| 2 | 1 | Alur kendali: percabangan | C1 | 1 |
| 3 | 1 | Alur kendali: perulangan | C1 | 2, lalu 1 |
| 4 | 2 | Fungsi: parameter dan nilai kembali | C2 | 3, lalu 1 |
| 5 | 2 | Fungsi: prototipe, lingkup, rekursi dasar | C2 | 4, lalu 2 |
| 6 | 2 | Fungsi: merancang dan menelusuri; **kuis kumulatif 1** | C2 | 5, lalu 3 dan 1 |
| 7 | 3 | Larik | C2 | 6, lalu 4 |
| ujian tengah | | Ujian praktik langsung, tanpa AI | C1–C2 | |
| 8 | 3 | String | C2 | 7, lalu 5 |
| 9 | 3 | Larik dan string bersama | C2 | 8, lalu 6 |
| 10 | 4 | Memori: ukuran tipe, tumpukan dan timbunan | C2 | 9, lalu 7 |
| 11 | 4 | Penunjuk dan referensi; **gerbang kesiapan AI** | C2 | 10, lalu 4 dan 8 |
| 12 | 5 | I/O berkas | C1 | 11, lalu 9 |
| 13 | 6 | Pengujian dan *debugging* dengan alat | C3 | 12, lalu 5 dan 10 |
| 14 | 6 | Git; proyek kecil; **kuis kumulatif 2** | C3–C4 | 13, lalu 1 sampai 12 |
| ujian akhir | | Ujian praktik langsung, tanpa AI | C1–C4 | |

## Ingat kembali

Tiap pertemuan dibuka dengan kuis 5 menit **tanpa catatan**, 3 sampai 5 soal
pendek. Kolom terakhir peta menunjukkan dari mana soalnya: pertemuan lalu,
lalu pertemuan yang lebih jauh. Jaraknya bertambah, jadi pertemuan 14 memuat
soal dari pertemuan 1. Kuis tidak dinilai besar; tujuannya melatih mengingat,
dan mengingat dengan usaha membuat ingatan bertahan lebih lama daripada
membaca ulang. Contoh soal pembuka pertemuan 8 (dari pertemuan 7 dan 5): berapa indeks
elemen terakhir `int a[6]`, dan mengapa `int f(int x)` yang mengubah `x` tidak
mengubah variabel pemanggil?

Setiap bagian memuat banyak soal; kerjakan **sebelum** melihat kunci.

## Tujuan

Pada akhir semester kamu dapat (CPMK, silabus bagian 3.1):

- **C1** menulis program prosedural bertipe statis;
- **C2** memakai fungsi, larik, dan penunjuk/referensi;
- **C3** men-debug dengan alat;
- **C4** memakai Git.

## Bagian 1: Variabel, tipe, dan alur kendali (pertemuan 1 sampai 3)

C++ adalah bahasa **bertipe statis**: tiap variabel punya tipe yang tetap sejak
dideklarasikan, dan kompiler memeriksanya sebelum program jalan. Itu membuat
sebagian kesalahan tertangkap lebih awal, tetapi menuntutmu memikirkan tipe.
Tipe dasar yang dipakai semester ini: `int` (bilangan bulat), `long long`
(bilangan bulat lebih besar), `double` (bilangan pecahan), `char` (satu
karakter), dan `bool`.

### Prediksi dulu

Tanpa menjalankan, tulis keluaran program ini dan nilai tiap variabel setelah
tiap baris:

```cpp
#include <iostream>
using namespace std;

int main() {
    int a = 7, b = 2;
    double c = a / b;
    double d = static_cast<double>(a) / b;
    cout << a / b << ' ' << a % b << ' ' << c << ' ' << d << '\n';
    return 0;
}
```

Setelah menuliskannya, jalankan dan cocokkan; selisihnya adalah bahan belajar.
Pertanyaan pemandu: pembagian apa yang dilakukan `a / b` pada dua `int`?

### Contoh terselesaikan

Masalah: ubah nilai angka menjadi huruf. Ambang di bawah adalah **contoh
sintetis**, bukan ketentuan kampus mana pun.

```cpp
#include <iostream>
using namespace std;

int main() {
    int nilai;
    cin >> nilai;
    char huruf;
    if (nilai >= 80) {
        huruf = 'A';
    } else if (nilai >= 65) {
        huruf = 'B';
    } else {
        huruf = 'C';
    }
    cout << huruf << '\n';
    return 0;
}
// masukan: 72
// keluaran:
// B
```

Telusuri dengan `nilai = 72`: `72 >= 80` salah, `72 >= 65` benar, jadi `huruf`
menjadi `'B'` dan cabang `else` tidak dijalankan. Syarat yang lebih ketat
ditulis dulu; kalau dibalik, semua nilai di atas 65 menjadi `'B'`.

Contoh kedua, perulangan `for` dengan akumulator: jumlah bilangan 1 sampai 30
yang habis dibagi 4 atau 6.

```cpp
#include <iostream>
using namespace std;

int main() {
    int total = 0;
    for (int i = 1; i <= 30; i++) {
        if (i % 4 == 0 || i % 6 == 0) {
            total += i;
        }
    }
    cout << total << '\n';
    return 0;
}
// keluaran:
// 166
```

Telusuri sebagian: `i` = 4 menambah 4, `i` = 6 menambah 6 (total 10), dan `i` = 12
hanya ditambah sekali walau habis dibagi keduanya. Pola "mulai dari nol,
tambahkan bila syarat terpenuhi" disebut **akumulator**.

### Contoh setengah jadi

Lengkapi tiga tempat `___` agar program menghitung ongkos kirim: gratis bila
belanja minimal 100000, selain itu 10000.

```text
int belanja;
cin >> belanja;
int ongkos;
if (belanja ___ 100000) {
    ongkos = ___;
} else {
    ongkos = ___;
}
cout << "Ongkos: " << ongkos << '\n';
```

### Susun urutannya

Susun baris-baris acak ini menjadi program yang mencetak "genap" atau "ganjil"
untuk `n = 7`. Tanda kurung kurawal ditambahkan sendiri.

```text
cout << "ganjil";
if (n % 2 == 0)
int n = 7;
else
cout << "genap";
```

### Latihan

1. **Ubah:** modifikasi program nilai agar ada huruf `'D'` untuk nilai di
   bawah 50.
2. **Buat:** tulis program yang membaca suhu (`int`) dan mencetak "dingin" (di
   bawah 20), "sejuk" (20 sampai 29), atau "panas" (30 ke atas).
3. **Jelaskan:** mengapa `static_cast<double>(a) / b` memberi 3.5 tetapi
   `double c = a / b` memberi 3?
4. **Berpasangan (pertemuan praktikum):** satu orang mengetik (pengemudi), satu
   orang mengarahkan (navigator); bertukar peran setiap sekitar 10 menit.

## Bagian 2: Fungsi (pertemuan 4 sampai 6)

Fungsi memberi nama pada sepotong pekerjaan. Fungsi punya **tipe kembali**,
**nama**, dan **parameter** bertipe. C++ meneruskan argumen **menurut nilai**
secara bawaan: fungsi menerima salinan.

### Prediksi dulu

Apa keluaran program ini? Jelaskan mengapa `a` tidak berubah.

```cpp
#include <iostream>
using namespace std;

void tambah(int x) {
    x = x + 10;
    cout << "di dalam: " << x << '\n';
}

int main() {
    int a = 5;
    tambah(a);
    cout << "di luar: " << a << '\n';
    return 0;
}
```

### Contoh terselesaikan

Fungsi rekursif untuk faktor persekutuan terbesar (algoritma Euclid), dengan
prototipe di atas `main` dan definisi di bawahnya:

```cpp
#include <iostream>
using namespace std;

int fpb(int a, int b);

int main() {
    cout << fpb(48, 18) << '\n';
    cout << fpb(7, 0) << '\n';
    return 0;
}

int fpb(int a, int b) {
    if (b == 0) {
        return a;
    }
    return fpb(b, a % b);
}
// keluaran:
// 6
// 7
```

Alasan: `b == 0` adalah **kasus dasar** yang menghentikan rekursi; tanpanya
fungsi memanggil dirinya selamanya. Tabel penelusuran `fpb(48, 18)`:

| Panggilan | `a` | `b` | `a % b` | Hasil |
| --- | --- | --- | --- | --- |
| 1 | 48 | 18 | 12 | memanggil `fpb(18, 12)` |
| 2 | 18 | 12 | 6 | memanggil `fpb(12, 6)` |
| 3 | 12 | 6 | 0 | memanggil `fpb(6, 0)` |
| 4 | 6 | 0 | | mengembalikan 6 |

Buat tabel sejenis di kertas untuk tiap fungsi baru sebelum mengujinya di
komputer. Menelusuri dengan tangan adalah keterampilan, dan keterampilan hanya
tumbuh kalau dilatih tanpa bantuan.

Perhatikan **lingkup**: `a` dan `b` hanya hidup di dalam `fpb`; `main` tidak
mengenalnya.

**Tata cara kerja berpasangan.** Pasangan dibentuk acak per bagian. Pengemudi
mengetik hanya yang dikatakan navigator; bertukar peran tiap sekitar 10 menit.
Bila kemampuan pasangan sangat timpang, beri tahu dosen. Tugas yang dinilai
tetap dikerjakan sendiri.

### Contoh setengah jadi

Lengkapi fungsi yang mengembalikan yang terbesar dari tiga bilangan:

```text
int terbesar(int a, int b, int c) {
    int hasil = a;
    if (b ___ hasil) {
        hasil = ___;
    }
    if (___ > hasil) {
        hasil = c;
    }
    return hasil;
}
```

### Latihan

1. **Ubah:** buat `prima` menolak bilangan negatif secara eksplisit, lalu
   jelaskan apakah hasilnya berubah.
2. **Buat:** fungsi `int jumlahDigit(int n)` yang mengembalikan jumlah digit
   bilangan bulat tak negatif (mis. 4072 menjadi 13), tanpa rekursi.
3. **Telusuri:** buat tabel panggilan untuk `fpb(35, 14)`.
4. **Berpasangan:** pasangan menukar fungsi dan **mencoba mematahkannya**
   dengan tiga masukan, termasuk `0`.

## Bagian 3: Larik dan string (pertemuan 7 sampai 9)

**Larik** (*array*) menyimpan sejumlah elemen bertipe sama berturut-turut di
memori; indeks mulai dari 0. Larik bawaan C++ tidak mengingat panjangnya: kamu
yang menjaga batasnya. **String** (`std::string`) adalah urutan karakter yang
mengetahui panjangnya (`size()`) dan dapat ditelusuri dengan indeks seperti
larik.

### Prediksi dulu

```cpp
#include <iostream>
using namespace std;

int main() {
    int a[5] = {4, 7, 1, 9, 3};
    int posisi = 0;
    for (int i = 1; i < 5; i++) {
        if (a[i] > a[posisi]) {
            posisi = i;
        }
    }
    cout << a[0] + a[4] << ' ' << posisi << ' ' << a[posisi] << '\n';
    return 0;
}
```

Tulis tabel `i`, `posisi` untuk tiap putaran sebelum menjalankan.

### Contoh terselesaikan

Membalik larik di tempat dan memeriksa palindrom pada string, memakai dua
indeks yang bergerak dari ujung ke tengah:

```cpp
#include <iostream>
#include <string>
using namespace std;

bool palindrom(const string &s) {
    int kiri = 0;
    int kanan = static_cast<int>(s.size()) - 1;
    while (kiri < kanan) {
        if (s[kiri] != s[kanan]) {
            return false;
        }
        kiri++;
        kanan--;
    }
    return true;
}

int main() {
    int a[6] = {1, 2, 3, 4, 5, 6};
    for (int i = 0, j = 5; i < j; i++, j--) {
        int sementara = a[i];
        a[i] = a[j];
        a[j] = sementara;
    }
    for (int i = 0; i < 6; i++) {
        cout << a[i];
        if (i < 5) {
            cout << ' ';
        }
    }
    cout << '\n';
    cout << palindrom("katak") << ' ' << palindrom("kakap") << ' ' << palindrom("") << '\n';
    return 0;
}
// keluaran:
// 6 5 4 3 2 1
// 1 0 1
```

Alasan: `sementara` mencegah nilai pertama tertimpa; berhenti saat `i >= j`
menghindari membalik dua kali; string kosong dianggap palindrom.

### Contoh setengah jadi

Lengkapi fungsi yang menghitung berapa kali huruf `x` muncul di string `s`:

```text
int hitungHuruf(const string &s, char x) {
    int banyak = 0;
    for (int i = 0; i < ___; i++) {
        if (s[___] == x) {
            ___;
        }
    }
    return banyak;
}
```

### Latihan

1. **Buat:** fungsi yang menghitung banyaknya huruf vokal pada sebuah string.
2. **Buat:** fungsi yang menerima larik `int` dan panjangnya, lalu
   mengembalikan selisih elemen terbesar dan terkecil.
3. **Jelaskan:** mengapa `a[5]` pada `int a[5]` salah dan sering tidak ditolak
   kompiler?
4. **Berpasangan:** satu orang menulis fungsi pembalik string, yang lain
   menyusun lima masukan uji termasuk string kosong dan satu karakter.

## Bagian 4: Memori, penunjuk, dan referensi (pertemuan 10 dan 11)

Setiap variabel menempati alamat di memori. **Referensi** (`int &r`) adalah
nama lain bagi variabel yang sudah ada. **Penunjuk** (`int *p`) adalah variabel
yang menyimpan alamat; `&x` mengambil alamat dan `*p` mengikuti alamat itu.
Variabel lokal hidup di **tumpukan** (*stack*) dan hilang saat fungsi selesai;
`new` membuat objek di **timbunan** (*heap*) yang kamu sendiri harus
mengembalikan dengan `delete`.

### Prediksi dulu

```cpp
#include <iostream>
using namespace std;

int main() {
    int a = 3;
    int &r = a;
    int *p = &a;
    r = 10;
    *p += 1;
    cout << a << ' ' << r << ' ' << *p << '\n';
    return 0;
}
```

Gambar kotak untuk `a` dan panah untuk `r` dan `p`.

### Contoh terselesaikan

Dua cara menukar nilai, dan ukuran tipe pada mesin yang dipakai untuk menjalankan
contoh ini (ukuran bergantung pada platform dan kompiler):

```cpp
#include <iostream>
using namespace std;

void tukarRef(int &x, int &y) {
    int t = x;
    x = y;
    y = t;
}

void tukarPtr(int *x, int *y) {
    int t = *x;
    *x = *y;
    *y = t;
}

int main() {
    int a = 1, b = 2;
    tukarRef(a, b);
    cout << a << ' ' << b << '\n';
    tukarPtr(&a, &b);
    cout << a << ' ' << b << '\n';
    cout << sizeof(char) << ' ' << sizeof(int) << ' ' << sizeof(long long) << ' '
         << sizeof(double) << '\n';
    return 0;
}
// keluaran:
// 2 1
// 1 2
// 1 4 8 8
```

Berbeda dengan `tambah(int x)` di bagian 2, kedua fungsi ini mengubah variabel
pemanggil karena menerima **alias** atau **alamat**, bukan salinan. Referensi
lebih ringkas dan tidak bisa kosong; penunjuk bisa kosong (`nullptr`) dan bisa
diarahkan ulang.

Contoh kedua: larik di timbunan dan hubungan larik dengan penunjuk.

```cpp
#include <iostream>
using namespace std;

int main() {
    int n = 5;
    int *a = new int[n];
    for (int i = 0; i < n; i++) {
        a[i] = (i + 1) * (i + 1);
    }
    int *p = a + 2;
    cout << *p << ' ' << p[1] << ' ' << *(a + 4) << '\n';
    delete[] a;
    return 0;
}
// keluaran:
// 9 16 25
```

`a + 2` menunjuk elemen berindeks 2. Setelah `delete[] a`, **jangan** memakai
`a` atau `p`: keduanya *dangling*, dan memakainya adalah perilaku tak
terdefinisi.

### Contoh setengah jadi

Lengkapi fungsi yang mengisi nol semua elemen larik lewat penunjuk:

```text
void jadikanNol(int *arr, int n) {
    for (int i = 0; i < ___; i++) {
        *(arr + ___) = ___;
    }
}
```

### Latihan

1. **Ubah:** ubah `tukarRef` agar menukar tiga variabel secara melingkar
   (`a` ke `b`, `b` ke `c`, `c` ke `a`).
2. **Buat:** fungsi `void naikkan(int &x, int delta)` dan versi penunjuk.
3. **Jelaskan:** apa yang terjadi bila `new int[n]` tidak pernah dipasangkan
   dengan `delete[]`, dan mengapa kamu tidak melihatnya dari keluaran?
4. **Berpasangan:** gambarkan bersama kondisi memori (kotak dan panah) untuk
   contoh kedua setelah baris `int *p = a + 2;`, lalu tukar peran dan
   gambarkan keadaan setelah `delete[] a;`.

**Gerbang kesiapan AI (pertemuan 11).** Kamu siap memakai asisten AI pada tugas
Kuning bila dapat (1) menelusuri program pendek, (2) menulis satu uji yang
gagal bila kode salah, dan (3) menjelaskan kode dengan kata sendiri. Kerjakan
tiga hal itu tanpa AI; dosen atau asisten menandai kesiapanmu.

## Bagian 5: I/O berkas (pertemuan 12)

Program sering membaca atau menulis berkas teks. Pustaka `<fstream>` memberi
`ofstream` (menulis) dan `ifstream` (membaca). Selalu periksa bahwa berkas
benar-benar terbuka.

### Prediksi dulu

```cpp
#include <fstream>
#include <iostream>
using namespace std;

int main() {
    ifstream masuk("tidak_ada.txt");
    if (!masuk) {
        cout << "gagal membuka\n";
        return 0;
    }
    cout << "terbuka\n";
    return 0;
}
```

Apa yang tercetak bila `tidak_ada.txt` tidak ada?

### Contoh terselesaikan

Program menulis tiga data suhu sintetis ke berkas, lalu membacanya kembali dan
menghitung rata-rata:

```cpp
#include <fstream>
#include <iostream>
using namespace std;

int main() {
    {
        ofstream keluar("suhu.txt");
        keluar << 28 << '\n' << 31 << '\n' << 25 << '\n';
    }
    ifstream masuk("suhu.txt");
    if (!masuk) {
        cerr << "berkas tidak terbuka\n";
        return 1;
    }
    int nilai;
    int jumlah = 0;
    int banyak = 0;
    while (masuk >> nilai) {
        jumlah += nilai;
        banyak++;
    }
    cout << banyak << ' ' << jumlah << ' ' << static_cast<double>(jumlah) / banyak << '\n';
    return 0;
}
// keluaran:
// 3 84 28
```

Kurung kurawal di sekitar `ofstream` menutup berkas lebih dulu sehingga
datanya tertulis sebelum dibaca. `while (masuk >> nilai)` berhenti saat tidak
ada angka lagi. Data di mata kuliah ini **sintetis atau terbuka**, tidak
berisi data pribadi.

### Latihan

1. **Ubah:** buat program menampilkan nilai terbesar di berkas, bukan rata-rata.
2. **Selidiki:** apa yang terjadi bila satu baris berisi kata `tiga` bukan
   angka? Rancang cara program memberi pesan yang jelas.

## Bagian 6: Pengujian, *debugging*, dan Git (pertemuan 13 dan 14)

Bagian ini **tanpa contoh terselesaikan penuh**: kamu bekerja dari
spesifikasi dan alat (pemudaran contoh: pertemuan 1 sampai 7 penuh, 8 sampai 12
setengah jadi, 13 dan 14 spesifikasi saja).

### Prediksi dulu

Fungsi ini punya satu kesalahan. Sebelum menjalankan, tebak mana dari dua
`assert` di bawah yang akan gagal:

```cpp
#include <cassert>
#include <iostream>
using namespace std;

int jumlahLarik(const int a[], int n) {
    int total = 0;
    for (int i = 1; i < n; i++) {
        total += a[i];
    }
    return total;
}

int main() {
    int data[3] = {5, 8, 2};
    assert(jumlahLarik(data, 3) == 15);
    assert(jumlahLarik(data, 0) == 0);
    cout << "semua uji lolos\n";
    return 0;
}
```

Uji yang baik **gagal bila kodenya salah**. Di sini `assert` pertama gagal
(hasilnya 10, karena indeks mulai dari 1) dan program berhenti dengan pesan
yang memuat kata `Assertion`, ungkapan uji yang gagal, dan nomor barisnya.
Perhatikan bahwa
uji kedua lolos secara kebetulan: uji yang hanya mencakup kasus tepi bisa
meloloskan kode salah. Karena itu, uji perlu mencakup kasus biasa **dan**
kasus tepi.

### Debugging dengan alat

Menebak dengan `cout` di mana-mana lambat. Dua alat bantu yang dipakai di
mata kuliah ini:

**1. Sanitizer** menambah pemeriksaan saat program jalan. Versi salah lain
dari penjumlahan, yang membaca satu elemen kelebihan:

```cpp
#include <iostream>
using namespace std;

int jumlahLarik(const int a[], int n) {
    int total = 0;
    for (int i = 0; i <= n; i++) {
        total += a[i];
    }
    return total;
}

int main() {
    int data[4] = {5, 8, 2, 6};
    cout << jumlahLarik(data, 4) << '\n';
    return 0;
}
// tanpa-jalan: perilaku tak terdefinisi, sengaja tidak dijalankan di sini
```

Kompilasi dengan `g++ -std=c++17 -g -fsanitize=address,undefined -o bug bug.cpp`
dan jalankan. Penyusun menjalankannya dan mendapatkan (disingkat; alamat dan
jalur berkas milikmu berbeda):

```text
ERROR: AddressSanitizer: stack-buffer-overflow on address 0x...
READ of size 4 at 0x... thread T0
    #0 0x... in jumlahLarik(int const*, int) bug.cpp:7
    #1 0x... in main bug.cpp:14
```

Pesan itu menunjuk baris 7: `a[i]` dibaca di luar larik, karena `i <= n`
seharusnya `i < n`. Belajarlah membaca **jejak tumpukan panggilan**: baris
`#0` adalah tempat kejadian, `#1` adalah pemanggilnya.

**2. Debugger (gdb).** Kompilasi dengan `-g -O0`, lalu jalankan `gdb ./bug0`,
memasang `break jumlahLarik`, `run`, dan `next` tiga kali. Penyusun
menjalankannya (g++ dan gdb di Linux; keluaran disingkat):

```text
Breakpoint 1, jumlahLarik (a=0x7fffffffd520, n=4) at bug.cpp:5
5	    int total = 0;
$1 = 0
$2 = 5
#0  jumlahLarik (a=0x7fffffffd520, n=4) at bug.cpp:6
#1  0x000055555555521a in main () at bug.cpp:14
```

Perintah inti: `break` memasang titik henti, `run` menjalankan, `next` maju
satu baris, `print` menampilkan nilai, `bt` menampilkan jejak panggilan.

### Git dasar

Git menyimpan riwayat kodemu. Penyusun menjalankan urutan ini di folder
sementara (Git 2.43.0):

```bash
git init
git add jumlah.cpp
git commit -m "Tambah jumlahLarik dan ujinya"
git log --oneline
```

`git log --oneline` menampilkan satu baris tiap *commit*: kode singkat lalu
pesan. Pesan yang baik menjelaskan **apa yang berubah dan mengapa**; riwayat
ini menjadi bukti prosesmu (silabus bagian 6.1). Jangan memasukkan berkas
hasil kompilasi, data pribadi, atau kata sandi ke repositori.

### Proyek kecil dan latihan

Proyek kecil (pertemuan 13 dan 14), **data sintetis**: program C++ yang
membaca berkas suhu rekaan, memakai fungsi, larik, dan I/O berkas, lalu
menampilkan rata-rata, terbesar, dan terkecil. Syarat: empat uji `assert`
termasuk kasus tepi, satu kesalahan yang sengaja ditanam lalu ditemukan dengan
sanitizer atau gdb, dan sedikitnya empat *commit*. Pertemuan 13 berpasangan;
pertemuan 14 mandiri dengan refleksi satu halaman.

1. **Uji:** tulis empat uji untuk `fpb` dari bagian 2, termasuk `fpb(0, 5)`;
   rusak fungsinya dengan sengaja dan pastikan satu uji gagal.
2. **Debug:** jalankan contoh `jumlahLarik` di atas dengan sanitizer, lalu
   perbaiki dan pastikan pesan hilang.
3. **Git:** buat repositori, simpan dua *commit* dengan pesan yang bermakna.
4. **Berpasangan:** tukar repositori dan baca riwayat *commit* pasanganmu;
   tuliskan satu pertanyaan tentang satu pesan.

## Latihan bercampur

Setelah bagian 2, 3, dan 5, kerjakan soal yang **tidak menyebut** topiknya.
Contoh: "Diberikan lima suhu sintetis, cetak berapa yang di atas
rata-rata." Kamu sendiri memutuskan perlu perulangan, fungsi, larik, atau
berkas. Kuis kumulatif 1 (pertemuan 6) dan 2 (pertemuan 14) berbentuk sama.

## Ulang berjarak

Kerjakan ulang tanpa melihat solusi lama:

- satu minggu setelah bagian: tulis ulang satu fungsi dari bagian itu;
- minggu sebelum ujian: tiga soal dari bagian 1 sampai 3 yang dahulu salah;
- semester 2: tulis ulang `fpb` rekursif dan pembalik larik tanpa melihat
  solusi; `KUL-I-102` memakai larik, penunjuk, dan rekursi.

## Kebijakan AI dan log pemakaian

Mata kuliah ini **Kuning** (silabus bagian 6.3): AI boleh menjelaskan konsep,
**tidak** boleh menghasilkan solusi yang kamu serahkan, dan hanya setelah
gerbang kesiapan (pertemuan 11). **Ujian praktik berlaku Merah**: tanpa AI.
Bila memakai AI untuk menjelaskan, catat di repositorimu sendiri: alat dan
versi, tujuan, perintah, dan bagian keluaran yang dipakai (log). Jangan
memasukkan data pribadi, kata sandi, atau kunci ke layanan AI. Dosen dapat
mewawancarai kamu singkat tentang kodemu dan menetapkan tingkat per tugas.

## Kesalahan umum

- **`=` dan `==` tertukar.** `=` menyimpan nilai; `==` membandingkan.
- **Selisih satu (*off-by-one*).** `i <= n` pada larik berpanjang `n`
  membaca di luar batas; indeks terakhir adalah `n - 1`.
- **Mengira argumen berubah.** Parameter `int x` adalah salinan; pakai
  referensi atau penunjuk bila fungsi harus mengubah variabel pemanggil.
- **Uji yang tidak pernah gagal.** Uji yang hanya mencakup kasus tepi atau
  `assert(true)` tidak menguji apa pun.

## Cek mandiri

Tutup modul, jawab, baru periksa.

1. Tulis tabel penelusuran `fpb(35, 14)`.
2. Sebut dua perbedaan referensi dan penunjuk.
3. Tulis satu uji yang gagal untuk `jumlahLarik` di bagian 6.
4. Mengapa `new int[n]` perlu `delete[]`?
5. Sebut tiga hal yang kamu harus bisa lakukan sebelum memakai AI pada tugas
   Kuning.

Daftar periksa (kosong; kamu isi sendiri, tidak dikumpulkan):

- [ ] Aku dapat menelusuri program pendek di kertas.
- [ ] Aku dapat menulis fungsi dengan kasus tepi.
- [ ] Aku dapat menjelaskan salinan, referensi, dan penunjuk.
- [ ] Aku dapat menyimpan kode dengan Git dan menulis pesan yang bermakna.

## Kunci dan petunjuk

- **Bagian 1:** prediksi `3 1 3 3.5`. Setengah jadi: `>=`, `0`, `10000`.
  Parsons: `int n = 7;`, `if (n % 2 == 0)`, `cout << "genap";`, `else`,
  `cout << "ganjil";`.
- **Bagian 2:** `di dalam: 15` lalu `di luar: 5`, karena parameter adalah
  salinan. Setengah jadi: `>`, `b`, `c`. `fpb(35, 14)`: (35, 14), (14, 7),
  (7, 0), hasil 7.
- **Bagian 3:** `7 3 9`: tabel `i=1` posisi 1, `i=2` tetap 1, `i=3` posisi 3,
  `i=4` tetap 3. Setengah jadi: `static_cast<int>(s.size())` (konversi
  menghindari peringatan perbandingan bertanda), `i`, `banyak++`.
- **Bagian 4:** `11 11 11`. Setengah jadi: `n`, `i`, `0`. Kebocoran memori
  tidak tampak di keluaran karena program tetap jalan dan sistem operasi
  mengambil kembali memori saat program berakhir; pada program yang jalan lama
  ia menumpuk.
- **Bagian 5:** `gagal membuka`; program tidak rusak karena `if (!masuk)`
  menangani kasusnya. Setengah jadi: `!masuk`.
- **Bagian 6:** `assert` pertama gagal (hasil 10). Kesalahan sanitizer di
  baris 7: ganti `<=` dengan `<`.
- **Petunjuk bertahap bila macet:** (1) tulis contoh masukan dan keluaran yang
  kamu harapkan; (2) telusuri kodemu dengan masukan itu; (3) cari baris tempat
  nilai pertama kali berbeda dari harapan.

## Langkah berikutnya

`KUL-I-102` (Struktur Data) memakai larik, penunjuk, dan rekursi modul ini.
`KUL-I-103` berjalan bersamaan di semester 2; `KUL-I-203` memakai bagian 4.

## Catatan untuk dosen

Bobot dan bentuk asesmen berikut **usulan**; prodi menetapkan (silabus 6.1,
6.2): tugas mingguan perorangan, kuis kumulatif (pertemuan 6 dan 14), ujian
praktik tengah dan akhir semester tanpa AI di lab, wawancara kode singkat
terhadap satu tugas, dan proyek kecil. Variasi tugas per mahasiswa: ganti
jenis data sintetis (suhu, skor, stok) agar jawaban tidak bisa disalin utuh.
Praktikum berpasangan: bentuk pasangan acak per bagian, jangan menilai
pekerjaan pasangan. Tingkat AI **Kuning** untuk tugas dasar pemrograman adalah
ketetapan silabus 6.3; gerbang kesiapan di pertemuan 11. Kompilasi dan
sanitizer disiapkan di lab sebelum pertemuan 13.

## Rujukan

- Standard C++ Foundation, *Get Started* (isocpp.org), dibuka 2026-11-19:
  <https://isocpp.org/get-started>
- GNU Project, *Using the GNU Compiler Collection (GCC)*, bagian Instrumentation
  Options (sanitizer), dibuka 2026-11-19:
  <https://gcc.gnu.org/onlinedocs/gcc/Instrumentation-Options.html>
- GNU Project, *Debugging with GDB*, dibuka 2026-11-19:
  <https://sourceware.org/gdb/current/onlinedocs/gdb.html/>
- *Git Reference*, git-scm.com, dibuka 2026-11-19: <https://git-scm.com/docs>
- ACM/IEEE-CS/AAAI, *Computer Science Curricula 2023*, knowledge area SDF dan
  FPL: <https://csed.acm.org/knowledge-areas/> (daftar KA terverifikasi;
  rincian unit **tidak** dibaca, jadi tidak dikutip).
