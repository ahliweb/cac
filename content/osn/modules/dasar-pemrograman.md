## Untuk siapa modul ini

Modul ini untuk siswa SMA yang mulai berlatih menuju OSN Informatika dan memakai C++17. Isinya mengikuti rumpun materi "Dasar pemrograman" dan topik minggu 1 sampai 2 pada silabus pembinaan: variabel, tipe data, I/O, operator, percabangan, perulangan, fungsi, integer overflow, dan format solusi. Array, string, dan STL akan dibahas terpisah.

Setelah mempelajari modul ini, kamu diharapkan bisa menulis program dasar, menelusurinya dengan tangan (dry-run), dan membedakan kapan `int` cukup dan kapan harus memakai `long long`.

Cara memakai: baca penjelasan, ketik ulang setiap contoh (jangan hanya disalin), ubah nilainya, lalu kerjakan latihan. Contoh kode di modul ini hanya diperiksa bisa dikompilasi (C++17); itu tidak membuktikan contoh benar untuk semua masukan, jadi tetap uji sendiri.

## Algoritma dan dry-run

Algoritma adalah langkah-langkah berurutan untuk menyelesaikan suatu masalah. Sebelum menulis kode, tuliskan langkahnya dengan kalimat biasa (pseudocode). Contoh: "baca dua bilangan, hitung jumlahnya, cetak hasilnya".

Dry-run berarti menelusuri program dengan tangan: tulis nilai setiap variabel pada tiap langkah di atas kertas. Kebiasaan ini membantu menemukan kesalahan logika tanpa menjalankan program.

## Struktur program C++

```cpp
#include <iostream>
using namespace std;

int main() {
    cout << "Halo, OSN!" << "\n";
    return 0;
}
```

- `#include <iostream>` memuat pustaka masukan/keluaran.
- `main` adalah titik awal program. Eksekusi dimulai dari sini.
- Setiap pernyataan diakhiri titik koma `;`.

## Variabel dan tipe data

Variabel adalah nama untuk sebuah tempat penyimpan nilai. Tipe data menentukan jenis nilai dan ukuran tempat itu.

| Tipe | Untuk apa | Catatan |
| --- | --- | --- |
| `int` | bilangan bulat | pada kompiler yang umum dipakai, 32 bit: sekitar -2,1 miliar sampai 2,1 miliar |
| `long long` | bilangan bulat besar | paling sedikit 64 bit: sekitar -9,2 x 10^18 sampai 9,2 x 10^18 |
| `double` | bilangan pecahan | hasil bisa tidak persis; hindari membandingkan dengan `==` |
| `char` | satu karakter | ditulis dengan tanda kutip tunggal, misalnya `'a'` |
| `bool` | benar atau salah | `true` atau `false` |

```cpp
#include <iostream>
using namespace std;

int main() {
    int umur = 16;
    long long populasi = 280000000LL;
    double tinggi = 165.5;
    char huruf = 'A';
    bool lulus = true;

    cout << umur << " " << populasi << " " << tinggi << " " << huruf << " " << lulus << "\n";
    return 0;
}
```

Aturan nama variabel: boleh huruf, angka, dan garis bawah; tidak boleh diawali angka; huruf besar dan kecil dianggap berbeda. Pilih nama yang menjelaskan isinya.

Variabel lokal yang belum diberi nilai berisi nilai sembarang. Selalu beri nilai awal sebelum dipakai.

## Masukan dan keluaran

`cin` membaca masukan dan `cout` mencetak keluaran. `cin >> x` melewati spasi dan baris baru sebelum membaca nilai.

```cpp
#include <iostream>
using namespace std;

int main() {
    int a, b;
    cin >> a >> b;
    cout << a + b << "\n";
    return 0;
}
```

Jika masukan berisi `3 4`, keluarannya `7`.

Untuk masukan yang besar, dua baris berikut di awal `main` mempercepat `cin` dan `cout`. Bila kamu memakainya, jangan mencampur `cin`/`cout` dengan `scanf`/`printf` pada program yang sama.

```cpp
#include <iostream>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n;
    cin >> n;
    cout << n * 2 << "\n";
    return 0;
}
```

## Operator dan ekspresi

- Aritmetika: `+ - * / %`.
- Perbandingan: `== != < <= > >=`.
- Logika: `&&` (dan), `||` (atau), `!` (bukan).
- Penugasan: `=`, serta bentuk singkat `+=`, `-=`, `*=`, `/=`, `%=`, `++`, `--`.

Dua hal yang sering membuat salah:

1. Pembagian dua bilangan bulat menghasilkan bilangan bulat (bagian pecahan dibuang ke arah nol): `7 / 2` bernilai `3`, dan `-7 / 2` bernilai `-3`.
2. `%` menghasilkan sisa pembagian, dan tandanya mengikuti bilangan yang dibagi: `-7 % 3` bernilai `-1`.

```cpp
#include <iostream>
using namespace std;

int main() {
    int a = 17, b = 5;
    cout << a / b << " " << a % b << "\n";           // 3 2
    cout << (double)a / b << "\n";                    // 3.4
    cout << (a > b && b > 0) << "\n";                 // 1
    return 0;
}
```

Untuk mendapatkan hasil pecahan dari dua bilangan bulat, ubah salah satunya menjadi `double` sebelum membagi, seperti `(double)a / b` di atas.

## Percabangan

`if`, `else if`, dan `else` memilih satu jalur berdasarkan kondisi.

```cpp
#include <iostream>
using namespace std;

int main() {
    int nilai;
    cin >> nilai;

    if (nilai >= 80) {
        cout << "A" << "\n";
    } else if (nilai >= 70) {
        cout << "B" << "\n";
    } else {
        cout << "C" << "\n";
    }
    return 0;
}
```

Urutan pengecekan penting: kondisi diperiksa dari atas, dan cabang pertama yang benar yang dijalankan. Hati-hati menulis `=` (penugasan) padahal yang dimaksud `==` (perbandingan).

## Perulangan

`for` cocok bila jumlah pengulangan diketahui; `while` cocok bila berhenti berdasarkan kondisi.

```cpp
#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;

    long long jumlah = 0;
    for (int i = 1; i <= n; i++) {
        jumlah += i;
    }
    cout << jumlah << "\n";
    return 0;
}
```

Contoh dengan `while`: menghitung berapa kali sebuah bilangan positif dapat dibagi 2 sebelum menjadi 1.

```cpp
#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;

    int langkah = 0;
    while (n > 1) {
        n /= 2;
        langkah++;
    }
    cout << langkah << "\n";
    return 0;
}
```

Dry-run untuk `n = 10`: n=10 -> 5 (langkah 1) -> 2 (langkah 2) -> 1 (langkah 3), lalu berhenti. Keluarannya `3`.

Perulangan yang kondisinya tidak pernah menjadi salah akan berjalan selamanya. Periksa bahwa ada sesuatu di dalam badan perulangan yang mendekatkan kondisi ke salah.

`break` menghentikan perulangan; `continue` melompat ke pengulangan berikutnya.

## Fungsi, parameter, dan scope

Fungsi membungkus sebagian logika agar bisa dipakai ulang dan mudah dibaca. Fungsi punya tipe kembalian, nama, dan parameter.

```cpp
#include <iostream>
using namespace std;

bool habisDibagi(int a, int b) {
    return a % b == 0;
}

int kuadrat(int x) {
    return x * x;
}

int main() {
    int n;
    cin >> n;
    if (habisDibagi(n, 3)) {
        cout << n << " habis dibagi 3" << "\n";
    }
    cout << kuadrat(n) << "\n";
    return 0;
}
```

Hal yang perlu dipahami:

- Parameter biasa dikirim berdasarkan nilai (disalin). Mengubah parameter di dalam fungsi tidak mengubah variabel asal di pemanggil.
- Scope: variabel yang dideklarasikan di dalam fungsi atau blok `{ }` hanya terlihat di dalam blok itu. Variabel di luar semua fungsi bersifat global dan terlihat di seluruh program; pakai seperlunya karena menyulitkan penelusuran.
- Fungsi harus dideklarasikan atau didefinisikan sebelum dipanggil. Itu sebabnya contoh di atas menulis `habisDibagi` dan `kuadrat` sebelum `main`.

```cpp
#include <iostream>
using namespace std;

void tambahSatu(int x) {
    x = x + 1;           // hanya mengubah salinan
}

int main() {
    int a = 5;
    tambahSatu(a);
    cout << a << "\n";   // tetap 5
    return 0;
}
```

## Integer overflow: int dan long long

Setiap tipe bulat punya batas. Jika hasil hitungan melebihi batas `int`, program tidak otomatis berhenti. Untuk `int` bertanda, melebihi batas adalah perilaku tak terdefinisi menurut standar C++: hasilnya tidak boleh diandalkan. Pada praktiknya sering terlihat "berputar" menjadi bilangan negatif.

Contoh yang sering terjadi: mengalikan dua `int` yang masing-masing besar.

```cpp
#include <iostream>
using namespace std;

int main() {
    int a = 100000, b = 100000;
    long long salah = a * b;                 // a * b dihitung sebagai int dulu: overflow
    long long benar = (long long)a * b;      // ubah salah satu ke long long sebelum mengalikan
    cout << benar << "\n";                   // 10000000000
    cout << salah << "\n";                   // tidak boleh diandalkan
    return 0;
}
```

Perhatikan bahwa menyimpan hasil ke variabel `long long` tidak menolong bila perkaliannya sendiri sudah dihitung dalam `int`. Ubah tipe operan sebelum operasinya.

Kebiasaan yang aman:

1. Baca batas soal. Jika nilai masukan atau hasil antara bisa melebihi sekitar 2 x 10^9, pakai `long long`.
2. Jumlah dari banyak bilangan, hasil kali, dan faktorial cepat membesar; hitung dalam `long long`.
3. Literal bulat besar diberi akhiran `LL`, misalnya `10000000000LL`.
4. Perkirakan nilai terbesar hasil antara, bukan hanya jawaban akhir.

Peringatan: `long long` pun berbatas. Jika hasil bisa melebihi sekitar 9 x 10^18, soal biasanya meminta hasil modulo sebuah bilangan atau rumus lain; baca pernyataan soal dengan teliti.

## Format solusi

Judge otomatis membandingkan keluaran programmu dengan keluaran yang diharapkan, jadi bentuk keluaran harus persis sesuai soal.

- Baca masukan persis seperti format pada soal; jangan mencetak kalimat perintah seperti "Masukkan n:".
- Cetak hanya yang diminta, dengan pemisah yang diminta (spasi atau baris baru) dan urutan yang diminta.
- Akhiri keluaran dengan satu baris baru.
- Jangan membaca atau mencetak lebih dari yang dispesifikasikan.
- Bacalah batasan (rentang nilai dan banyak data) sebelum memilih tipe data dan cara menghitung.
- Uji dengan contoh pada soal, lalu dengan kasus ujung buatanmu sendiri: nilai terkecil, nilai terbesar, dan kasus paling sederhana.

Kerangka yang bisa dipakai sebagai titik awal:

```cpp
#include <iostream>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    // 1. baca masukan
    // 2. hitung
    // 3. cetak keluaran sesuai format soal
    return 0;
}
```

## Kesalahan umum

- Lupa memberi nilai awal pada variabel (misalnya penjumlah).
- Pembagian bulat padahal yang dimaksud pembagian pecahan.
- Batas perulangan meleset satu (salah memilih `<` atau `<=`).
- Overflow pada `int` karena batas soal tidak dibaca.
- Mencetak teks tambahan yang tidak diminta soal.
- Menganggap `%` pada bilangan negatif selalu menghasilkan nilai tidak negatif.

## Latihan

Latihan di bawah dibuat khusus untuk modul ini. Kerjakan di komputer, lalu bandingkan dengan contoh masukan dan keluaran.

### Latihan 1: Konversi detik

Masukan: satu bilangan bulat `S` (0 <= S <= 1.000.000.000), jumlah detik. Cetak lama waktu itu dalam bentuk `H J M D`, yaitu hari, jam, menit, dan detik, dipisahkan spasi, dengan 0 <= J < 24, 0 <= M < 60, 0 <= D < 60.

Contoh masukan: `93784`
Contoh keluaran: `1 2 3 4`

Petunjuk: gunakan `/` dan `%` secara berurutan.

### Latihan 2: Bilangan terbesar dari tiga

Masukan: tiga bilangan bulat pada satu baris, masing-masing antara -1.000.000.000 dan 1.000.000.000. Cetak yang terbesar.

Contoh masukan: `5 -2 9`
Contoh keluaran: `9`

Petunjuk: coba dengan `if` bersarang, lalu tulis ulang memakai sebuah fungsi `maks(a, b)` yang kamu panggil dua kali.

### Latihan 3: Jumlah kuadrat

Masukan: satu bilangan bulat `N` (1 <= N <= 100.000). Cetak jumlah 1^2 + 2^2 + ... + N^2.

Contoh masukan: `3`
Contoh keluaran: `14`

Petunjuk: perkirakan nilai terbesar jawabannya sebelum memilih tipe data. Untuk `N = 100000`, coba lihat apa yang terjadi bila kamu memakai `int`.

### Latihan 4: Jumlah digit

Masukan: satu bilangan bulat `N` (0 <= N <= 1.000.000.000). Cetak jumlah digit desimalnya.

Contoh masukan: `90210`
Contoh keluaran: `12`

Petunjuk: ambil digit terakhir dengan `% 10`, buang dengan `/ 10`, ulangi dengan `while`. Tulis sebagai fungsi `jumlahDigit`. Pikirkan kasus `N = 0`.

### Latihan 5: Dry-run

Tanpa menjalankan, tentukan keluaran program berikut untuk masukan `n = 6`, lalu jalankan untuk memeriksa. Tulis tabel nilai `i` dan `s` pada setiap putaran.

```cpp
#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    int s = 0;
    for (int i = 1; i <= n; i++) {
        if (i % 2 == 0) {
            s += i;
        } else {
            s -= 1;
        }
    }
    cout << s << "\n";
    return 0;
}
```

### Latihan 6: Temukan kesalahannya

Program berikut dimaksudkan mencetak hasil kali dua bilangan hingga 100.000, tetapi memberi jawaban yang salah untuk beberapa masukan. Jelaskan penyebabnya dan perbaiki. Setelah itu, rancang satu masukan yang menunjukkan kesalahan itu.

```cpp
#include <iostream>
using namespace std;

int main() {
    int a, b;
    cin >> a >> b;
    long long hasil = a * b;
    cout << hasil << "\n";
    return 0;
}
```

## Cek mandiri

Setelah selesai, pastikan kamu bisa menjawab tanpa melihat catatan:

- Apa beda `7 / 2` dan `7.0 / 2`?
- Berapa nilai `-7 % 3` dan mengapa?
- Kapan `int` tidak cukup dan apa yang kamu ganti?
- Mengapa `long long x = a * b;` bisa salah walaupun `x` bertipe `long long`?
- Apa saja yang tidak boleh dicetak program yang dinilai judge otomatis?

## Langkah berikutnya

Lanjutkan ke topik berikutnya pada silabus (array, string, dan STL dasar). Untuk melihat cakupan resmi dan silabus terbaru, rujuk halaman silabus OSN di bagian Rujukan. Untuk soal latihan tambahan, pilih soal dari arsip resmi lalu kerjakan sendiri; jangan menyalin soal ke dalam modul ini.
