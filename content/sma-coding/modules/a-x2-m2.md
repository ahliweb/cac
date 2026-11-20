## Untuk siapa modul ini

Modul ini untuk murid kelas X jalur A (Algoritmik dengan C++), minggu `A-X2-M2` silabus v1.4.1: string. Prasyarat: modul `a-x2-m1` (array satu dimensi). Kamu tidak perlu pernah memprogram sebelum jalur ini.

Modul ini karangan penyusun dan disetujui pemilik program pada 2026-11-20 (keputusan lewat dialog; catatan tinjauan menjadi tindak lanjut revisi). Butir `E-BK-d` dipetakan silabus sebagai dipenuhi jalur ini; pemenuhan butir mengikuti pemetaan silabus, bukan status modul. Keluarga materi OSN yang bertaut: `struktur-data` (string sesuai CP, bukan pengayaan).

Bila kamu pernah memakai Python: `string` di C++ bisa diubah per karakter, karakter ditulis dengan tanda kutip tunggal (`'a'`), dan teks dengan tanda kutip ganda (`"a"`). Tiap soal latihan bertanda `AI: boleh` atau `AI: tanpa AI`. Masukan program diberikan lewat berkas: `./program < masukan.txt`.

## Ingat kembali

Jawab dari ingatan dulu, baru cek di kunci. Soal 1 dari `a-x2-m1`, soal 2 dari `a-x1-m13`, soal 3 dari `a-x1-m8`.

1. Apa indeks elemen pertama dan terakhir array berukuran `n`?
2. Sebut dua cara memeriksa kualitas data masukan.
3. Apa beda pseudocode dan program C++, dan apa untungnya menulis pseudocode lebih dulu?

## Tujuan

Setelah modul ini kamu dapat:

- memakai `string`: panjang, akses karakter berindeks, penyambungan, dan perbandingan;
- membaca satu kata dengan `cin` dan satu baris dengan `getline`;
- mengolah teks karakter demi karakter dengan perulangan;
- menulis program palindrom dan penghitung vokal.

## Prediksi dulu

Ini tugas baca-dan-prediksi, `AI: tanpa AI`. **Tebak dulu, tulis jawabanmu, baru jalankan.**

```cpp
#include <iostream>
#include <string>
using namespace std;

int main() {
  string s = "kode";
  cout << s.size() << " " << s[0] << s[3] << "\n";
  s[0] = 'm';
  cout << s << "\n";
  string t = s + "!";
  cout << t << " " << (s < "mata") << "\n";
}
```

1. Apa yang tercetak pada tiap baris?
2. Apa isi `s` setelah `s[0] = 'm';`?
3. Pada baris terakhir, mengapa perbandingan `s < "mata"` bernilai 0 atau 1?

Simpan tebakanmu. Perbandingannya ada di bagian berikutnya.

## Contoh terselesaikan

Keluaran program tadi:

Keluaran:

```text
4 ke
mode
mode! 0
```

`string` adalah deretan karakter yang diindeks seperti array: `s[0]` karakter pertama, `s[s.size() - 1]` karakter terakhir. Tanda `+` menyambung dua string. Perbandingan `<` membandingkan urutan abjad (karakter demi karakter): `"mode"` lebih besar dari `"mata"` karena `'o'` datang sesudah `'a'`, sehingga hasilnya salah (0). Satu karakter ditulis `'k'`; teks ditulis `"k"`; keduanya berbeda jenis.

`cin >> s` hanya membaca satu kata (berhenti di spasi). Untuk membaca satu baris utuh, termasuk spasi, pakai `getline(cin, s)`. Program berikut menghitung vokal pada satu baris teks karangan.

```cpp
#include <iostream>
#include <string>
using namespace std;

int main() {
  string s;
  getline(cin, s);
  int n = s.size();
  int vokal = 0;
  for (int i = 0; i < n; i++) {
    char c = s[i];
    if (c == 'a' || c == 'i' || c == 'u' || c == 'e' || c == 'o') {
      vokal++;
    }
  }
  cout << "vokal: " << vokal << "\n";
}
```

Masukan (`masukan.txt`):

```text
belajar menulis kode
```

Keluaran:

```text
vokal: 8
```

Palindrom adalah kata yang sama bila dibaca dari belakang. Cukup bandingkan karakter ke-`i` dengan pasangannya dari belakang, `s[n - 1 - i]`, sampai tengah. Satu pasangan yang berbeda sudah memastikan hasilnya bukan palindrom, sehingga fungsi boleh langsung `return false`.

```cpp
#include <iostream>
#include <string>
using namespace std;

bool palindrom(string s) {
  int n = s.size();
  for (int i = 0; i < n / 2; i++) {
    if (s[i] != s[n - 1 - i]) {
      return false;
    }
  }
  return true;
}

int main() {
  string s;
  cin >> s;
  if (palindrom(s)) {
    cout << s << ": palindrom\n";
  } else {
    cout << s << ": bukan palindrom\n";
  }
}
```

Masukan (`masukan.txt`):

```text
katak
```

Keluaran:

```text
katak: palindrom
```

Karakter juga bilangan: komputer menyimpannya sebagai kode (`matkom-teks-gambar-suara`), dan selisih `c - '0'` mengubah karakter digit menjadi nilainya.

```cpp
#include <iostream>
#include <string>
using namespace std;

int main() {
  string s;
  cin >> s;
  int n = s.size();
  int jumlah = 0;
  for (int i = 0; i < n; i++) {
    jumlah += s[i] - '0';
  }
  cout << "jumlah digit: " << jumlah << "\n";
}
```

Masukan (`masukan.txt`):

```text
40213
```

Keluaran:

```text
jumlah digit: 10
```

## Contoh setengah jadi

Program yang membaca satu baris dan mencetak berapa kali huruf `a` muncul. Lengkapi bagian `____`.

```cpp setengah-jadi
#include <iostream>
#include <string>
using namespace std;

int main() {
  string s;
  ____(cin, s);
  int n = s.____();
  int banyak = 0;
  for (int i = 0; i < ____; i++) {
    if (s[i] == ____) {
      banyak++;
    }
  }
  cout << banyak << "\n";
}
```

## Soal Parsons

Susun baris-baris berikut (sudah diacak; indentasi ikut barisnya) menjadi badan `main` yang membaca satu kata dan mencetaknya dengan tanda hubung di antara karakternya, misalnya `k-o-d-e`. `AI: tanpa AI`: tujuannya melatih membaca urutan program.

```text
(a)     cout << "-";
(b)   cout << "\n";
(c)   }
(d)   string s;
(e)   int n = s.size();
(f)     cout << s[i];
(g)   for (int i = 0; i < n; i++) {
(h)     }
(i)   cin >> s;
(j)     if (i > 0) {
```

## Latihan

1. `AI: boleh` **Pseudocode dulu.** Tulis pseudocode lalu program yang membaca satu baris dan mencetak banyak kata di dalamnya. Anggap kata dipisahkan tepat satu spasi dan baris tidak diawali atau diakhiri spasi. Uji dengan `belajar menulis kode`.
2. `AI: tanpa AI` **Telusuri.** Buat tabel penelusuran `palindrom("kakek")`: nilai `i`, dua karakter yang dibandingkan, dan hasilnya. Apa nilai yang dikembalikan, dan pada `i` berapa?
3. `AI: boleh` **Kata terbalik.** Baca satu kata dan cetak kata itu dari belakang (`kode` menjadi `edok`).
4. `AI: boleh` **Angka dalam campuran.** Baca satu kata campuran huruf dan angka, lalu cetak jumlah angkanya saja. Uji dengan `a1b2c3`; gunakan syarat `c >= '0' && c <= '9'`.
5. *Opsional:* **catatan pemakaian AI.** Bila memakai AI generatif, jawab nomor 1 sendiri dulu, lalu minta penjelasan atau petunjuk bertahap, bukan program jadi. Catat alatnya, tujuanmu, garis besar perintahmu, bagian yang kamu pakai, dan caramu memeriksanya (jalankan atau telusuri). Jangan menaruh data pribadi atau tugas bernilai pada perintah.

## Latihan bercampur

1. Baca `n`, lalu baca `n` kata, dan cetak berapa kata yang palindrom. Pakai fungsi `palindrom` dari contoh (modul `a-x1-m12`).
2. Baca `n` kata, simpan panjang tiap kata di array `int panjang[100]`, lalu cetak panjang terbesar (modul `a-x2-m1`).
3. Mengapa komputer dapat menjawab bahwa `'a' < 'b'` benar (modul `matkom-teks-gambar-suara`)?

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `a-x2-m3` (pertanyaan 1), sekitar tiga minggu lagi di `a-x2-m5` (pertanyaan 2), dan sekitar delapan minggu lagi di `a-x2-m10` (pertanyaan 3). Jawab sekarang lalu simpan.

1. Apa beda `cin >> s` dan `getline(cin, s)`?
2. Bagaimana mengubah karakter digit `'7'` menjadi bilangan 7?
3. Bagaimana membandingkan dua `string` menurut urutan abjad?

## Kesalahan umum

- **Memakai `cin >> s` untuk satu baris.** Pembacaan berhenti di spasi pertama; bagian sisanya tertinggal untuk pembacaan berikutnya.
- **Memakai `getline` tepat setelah `cin >> n`.** Tanda pindah baris setelah `n` masih tertinggal, sehingga `getline` membaca baris kosong. Tambahkan `cin.ignore();` sebelum `getline`.
- **Mencampur `'a'` dan `"a"`.** `'a'` satu karakter, `"a"` string; `s[i] == "a"` ditolak kompilator.
- **Mengira `'7'` sama dengan 7.** Karakter digit menyimpan kode, bukan nilai; pakai `'7' - '0'`.
- **Mengakses karakter di luar batas atau memakai `s.size() - 1` pada string kosong.** `s.size()` bertipe tak bertanda, jadi 0 dikurangi 1 menjadi bilangan yang sangat besar, bukan -1.

## Cek mandiri

- [ ] Saya dapat membaca satu kata dengan `cin` dan satu baris dengan `getline`.
- [ ] Saya dapat mengakses dan mengubah karakter lewat indeks.
- [ ] Saya dapat menulis pemeriksa palindrom dan penghitung vokal.
- [ ] Saya dapat membedakan `'a'` dan `"a"`.
- [ ] Saya menulis pseudocode sebelum programnya.

## Kunci dan petunjuk

**Ingat kembali.** 1: indeks 0 dan `n - 1`. 2: contoh: memeriksa nilai batas dan rentang yang sah, menolak nilai penanda seperti -999 sebelum dihitung, atau mencocokkan banyak data dengan yang dijanjikan. 3: pseudocode ditulis untuk manusia dan tidak punya aturan penulisan ketat; program C++ harus mengikuti sintaks agar bisa dikompilasi. Untungnya, kamu memikirkan langkah lebih dulu sebelum terjebak pada sintaks.

**Prediksi dulu.** 1: `4 ke`, `mode`, `mode! 0`. 2: `mode`. 3: perbandingan string menghasilkan nilai benar atau salah yang dicetak sebagai 1 atau 0; `"mode"` tidak lebih kecil dari `"mata"` karena `'o'` sesudah `'a'`, jadi 0.

**Contoh setengah jadi.** Isi: `getline`, `size`, `n`, `'a'`. Program lengkapnya:

```cpp
#include <iostream>
#include <string>
using namespace std;

int main() {
  string s;
  getline(cin, s);
  int n = s.size();
  int banyak = 0;
  for (int i = 0; i < n; i++) {
    if (s[i] == 'a') {
      banyak++;
    }
  }
  cout << banyak << "\n";
}
```

Masukan (`masukan.txt`):

```text
anak bangsa
```

Keluaran:

```text
4
```

**Soal Parsons.** Urutan benar: d, i, e, g, j, a, h, f, c, b. Dua baris `}` berbeda indentasi: (h) menutup `if` dan (c) menutup `for`, jadi tidak boleh bertukar.

**Latihan.** 1: pseudocode: baca baris; spasi <- 0; untuk tiap karakter: bila spasi, tambah spasi; cetak spasi + 1. Program contoh:

```cpp
#include <iostream>
#include <string>
using namespace std;

int main() {
  string s;
  getline(cin, s);
  int n = s.size();
  int spasi = 0;
  for (int i = 0; i < n; i++) {
    if (s[i] == ' ') {
      spasi++;
    }
  }
  cout << spasi + 1 << "\n";
}
```

Masukan (`masukan.txt`):

```text
belajar menulis kode
```

Keluaran:

```text
3
```

2: `kakek` berpanjang 5, jadi `i` berjalan 0 dan 1. `i = 0`: `s[0] = 'k'` dan `s[4] = 'k'`, sama. `i = 1`: `s[1] = 'a'` dan `s[3] = 'e'`, beda, sehingga fungsi mengembalikan `false` pada `i = 1`. 3: program contoh:

```cpp
#include <iostream>
#include <string>
using namespace std;

int main() {
  string s;
  cin >> s;
  int n = s.size();
  for (int i = n - 1; i >= 0; i--) {
    cout << s[i];
  }
  cout << "\n";
}
```

Masukan (`masukan.txt`):

```text
kode
```

Keluaran:

```text
edok
```

4: program contoh:

```cpp
#include <iostream>
#include <string>
using namespace std;

int main() {
  string s;
  cin >> s;
  int n = s.size();
  int jumlah = 0;
  for (int i = 0; i < n; i++) {
    char c = s[i];
    if (c >= '0' && c <= '9') {
      jumlah += c - '0';
    }
  }
  cout << jumlah << "\n";
}
```

Masukan (`masukan.txt`):

```text
a1b2c3
```

Keluaran:

```text
6
```

**Latihan bercampur.** 1: di dalam perulangan `n` kali, baca `s` dengan `cin >> s`, lalu `if (palindrom(s)) { banyak++; }`. 2: simpan `panjang[i] = kata.size();`, lalu cari terbesar seperti pada pencarian maksimum modul `a-x2-m1`. 3: karena karakter disimpan sebagai kode angka dan kode `'a'` lebih kecil dari kode `'b'`; huruf abjad berurutan menurut kodenya.

**Ulang berjarak.** 1: `cin >> s` membaca satu kata dan berhenti di spasi; `getline(cin, s)` membaca satu baris utuh. 2: `'7' - '0'` bernilai 7. 3: dengan operator `<`, `>`, atau `==` langsung pada dua `string`; perbandingan berjalan karakter demi karakter.

## Langkah berikutnya

Modul berikut: `a-x2-m3` (array dua dimensi), yang mengolah data berbentuk tabel. Modul terkait: `matkom-teks-gambar-suara` sebagai bacaan pendamping tentang kode karakter. Bacaan lanjut: halaman cppreference tentang `std::basic_string`.
