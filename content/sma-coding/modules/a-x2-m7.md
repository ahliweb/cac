## Untuk siapa modul ini

Modul ini untuk murid kelas X jalur A (Algoritmik dengan C++), minggu `A-X2-M7` silabus v1.4.1: struktur data tumpukan (stack) dan antrian (queue). Prasyarat: modul `a-x2-m6` (`vector`). Kamu tidak perlu pernah memprogram sebelum jalur ini.

Modul ini berstatus DRAF: karangan penyusun, belum ditinjau pemilik. Butir `E-BK-a` dan `E-BK-c` dipetakan silabus sebagai dipenuhi jalur ini; modul draf ini belum dihitung sebagai pemenuhan. Keluarga materi OSN yang bertaut: `struktur-data` (stack dan queue sesuai CP, bukan pengayaan).

Bila kamu pernah memakai Python: kamu mungkin memakai `list` sebagai tumpukan atau antrian. Di C++ keduanya adalah wadah tersendiri yang sengaja membatasi akses ke ujungnya saja. Tiap soal latihan bertanda `AI: boleh` atau `AI: tanpa AI`. Masukan program diberikan lewat berkas: `./program < masukan.txt`.

## Ingat kembali

Jawab dari ingatan dulu, baru cek di kunci. Soal 1 dari `a-x2-m6`, soal 2 dari `a-x2-m4`, soal 3 dari `a-x1-m13`.

1. Apa yang dilakukan `push_back` dan `pop_back`?
2. Bagaimana mengambil digit terakhir bilangan bulat positif dan membuang digit itu?
3. Mengapa nilai penanda seperti -999 tidak boleh ikut dirata-ratakan?

## Tujuan

Setelah modul ini kamu dapat:

- menjelaskan prinsip LIFO (tumpukan) dan FIFO (antrian) dengan contoh;
- memakai `stack` dan `queue` dari pustaka standar C++;
- memeriksa kurung seimbang dengan tumpukan;
- mensimulasikan antrian loket dengan antrian, termasuk kasus antrian kosong.

## Prediksi dulu

Ini tugas baca-dan-prediksi, `AI: tanpa AI`. **Tebak dulu, tulis jawabanmu, baru jalankan.**

```cpp
#include <iostream>
#include <queue>
#include <stack>
using namespace std;

int main() {
  stack<int> s;
  queue<int> q;
  for (int i = 1; i <= 3; i++) {
    s.push(i);
    q.push(i);
  }
  cout << s.top() << " " << q.front() << "\n";
  s.pop();
  q.pop();
  cout << s.top() << " " << q.front() << " " << s.size() << "\n";
}
```

1. Apa yang tercetak pada tiap baris?
2. Keduanya diisi 1, 2, 3 dalam urutan yang sama. Mengapa elemen yang terlihat berbeda?

Simpan tebakanmu. Perbandingannya ada di bagian berikutnya.

## Contoh terselesaikan

Keluaran program tadi:

Keluaran:

```text
3 1
2 2 2
```

**Tumpukan (stack)** bekerja secara LIFO, *last in, first out*: yang terakhir masuk keluar lebih dulu, seperti tumpukan piring yang hanya bisa diambil dari atas. `push(x)` menaruh di atas, `top()` membaca yang di atas, `pop()` membuangnya, dan `empty()` menyatakan apakah tumpukan kosong. **Antrian (queue)** bekerja secara FIFO, *first in, first out*: yang pertama masuk dilayani lebih dulu, seperti antrian loket. `push(x)` menaruh di belakang, `front()` membaca yang paling depan, `pop()` membuangnya. Pada `pop()` kedua wadah itu, nilai tidak dikembalikan; baca dulu dengan `top()` atau `front()`, baru `pop()`.

Contoh klasik tumpukan: memeriksa kurung seimbang. Setiap kurung buka disimpan; setiap kurung tutup harus berpasangan dengan kurung buka teratas. Jika tumpukan kosong saat kurung tutup datang, atau pasangannya salah, hasilnya tidak seimbang; di akhir, tumpukan harus kosong. Program berikut membaca satu kata tanpa spasi.

```cpp
#include <iostream>
#include <stack>
#include <string>
using namespace std;

bool seimbang(string t) {
  stack<char> s;
  for (char c : t) {
    if (c == '(' || c == '[' || c == '{') {
      s.push(c);
    } else if (c == ')' || c == ']' || c == '}') {
      if (s.empty()) {
        return false;
      }
      char b = s.top();
      s.pop();
      if ((c == ')' && b != '(') || (c == ']' && b != '[') ||
          (c == '}' && b != '{')) {
        return false;
      }
    }
  }
  return s.empty();
}

int main() {
  string t;
  cin >> t;
  if (seimbang(t)) {
    cout << "seimbang\n";
  } else {
    cout << "tidak seimbang\n";
  }
}
```

Masukan (`masukan.txt`):

```text
{[()]}
```

Keluaran:

```text
seimbang
```

Masukan (`masukan.txt`):

```text
([)]
```

Keluaran:

```text
tidak seimbang
```

Pada `([)]`, kurung tutup `)` bertemu `[` di puncak tumpukan, bukan `(`, sehingga tidak berpasangan. Contoh antrian: simulasi antrian loket dengan data karangan. Perintah `D` berarti satu pelanggan baru datang dan mendapat nomor berikutnya; `L` berarti loket melayani pelanggan terdepan. Bila `L` datang saat antrian kosong, program harus mengatakannya, bukan memanggil `front()` pada antrian kosong.

```cpp
#include <iostream>
#include <queue>
using namespace std;

int main() {
  queue<int> antrian;
  int nomor = 0;
  char perintah;
  while (cin >> perintah) {
    if (perintah == 'D') {
      nomor++;
      antrian.push(nomor);
    } else if (perintah == 'L') {
      if (antrian.empty()) {
        cout << "loket kosong\n";
      } else {
        cout << "melayani nomor " << antrian.front() << "\n";
        antrian.pop();
      }
    }
  }
}
```

Masukan (`masukan.txt`):

```text
D D L D L L L
```

Keluaran:

```text
melayani nomor 1
melayani nomor 2
melayani nomor 3
loket kosong
```

## Contoh setengah jadi

Membalik sebuah kata dengan tumpukan: huruf dimasukkan satu per satu, lalu diambil kembali dari atas. Lengkapi bagian `____`.

```cpp setengah-jadi
#include <iostream>
#include <stack>
#include <string>
using namespace std;

int main() {
  stack<char> s;
  string t;
  cin >> t;
  for (char c : t) {
    s.____(c);
  }
  while (!s.____()) {
    cout << s.____();
    s.____();
  }
  cout << "\n";
}
```

## Soal Parsons

Susun baris-baris berikut (sudah diacak) menjadi badan `main` yang mencetak 5, lalu 8, dari sebuah antrian. Baris (c) dan (f) sama persis, jadi boleh bertukar tempat. `AI: tanpa AI`: tujuannya melatih membaca urutan program.

```text
(a)   q.pop();
(b)   queue<int> q;
(c)   cout << q.front() << "\n";
(d)   q.push(8);
(e)   q.push(5);
(f)   cout << q.front() << "\n";
```

## Latihan

1. `AI: boleh` **Pseudocode dulu.** Tulis pseudocode lalu program yang menguji palindrom dengan satu tumpukan dan satu antrian: masukkan tiap huruf ke keduanya, lalu bandingkan huruf yang keluar dari tumpukan dengan huruf yang keluar dari antrian. Uji dengan `katak` dan `kayu`.
2. `AI: tanpa AI` **Telusuri.** Untuk perintah `D L D D L L L` pada program antrian loket, tulis isi antrian setelah tiap perintah dan semua baris keluarannya.
3. `AI: boleh` **Tumpukan angka.** Baca satu kata berisi angka satu digit dan huruf `C`. Angka dimasukkan ke tumpukan; `C` mencetak angka teratas lalu membuangnya, atau mencetak `kosong` bila tumpukan kosong. Uji dengan `58C3CCC`.
4. `AI: boleh` **Hitung yang menunggu.** Tambahkan perintah `N` pada program antrian loket yang mencetak `menunggu: ` diikuti banyak pelanggan yang sedang antre. Uji dengan `D D N L N`.
5. *Opsional:* **catatan pemakaian AI.** Bila memakai AI generatif, jawab nomor 1 sendiri dulu, lalu minta penjelasan atau petunjuk bertahap, bukan program jadi. Catat alatnya, tujuanmu, garis besar perintahmu, bagian yang kamu pakai, dan caramu memeriksanya (jalankan atau telusuri). Jangan menaruh data pribadi atau tugas bernilai pada perintah.

## Latihan bercampur

1. Tulis ulang pembalik kata dengan `vector` sebagai tumpukan, memakai `push_back`, `back`, dan `pop_back` (modul `a-x2-m6`).
2. Simpan faktor prima 360 (modul `a-x2-m5`) di tumpukan, lalu cetak dari yang terbesar ke yang terkecil.
3. Ubah bilangan desimal `n` menjadi biner dengan tumpukan: ulangi memasukkan `n % 2` dan `n = n / 2` sampai `n` habis, lalu keluarkan seluruhnya (modul `a-x2-m4`). Uji dengan 10.

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `a-x2-m8` (pertanyaan 1), sekitar tiga minggu lagi di `a-x2-m10` (pertanyaan 2), dan sekitar delapan minggu lagi di `a-xi1-m1` (pertanyaan 3). Jawab sekarang lalu simpan.

1. Apa beda LIFO dan FIFO? Beri satu contoh sehari-hari untuk tiap-tiapnya.
2. Mengapa memanggil `top()` atau `front()` pada wadah kosong berbahaya, dan bagaimana mencegahnya?
3. Mengapa pemeriksaan kurung seimbang cocok memakai tumpukan?

## Kesalahan umum

- **Memanggil `top()`, `front()`, atau `pop()` pada wadah kosong.** Hasilnya tidak terdefinisi. Periksa `empty()` lebih dulu.
- **Mengira `pop()` mengembalikan nilai.** `pop()` hanya membuang. Baca dengan `top()` atau `front()` sebelum `pop()`.
- **Mengakses elemen tengah.** `stack` dan `queue` tidak punya `s[i]`; bila butuh akses tengah, `vector` yang cocok.
- **Tertukar `top()` dan `front()`.** Tumpukan memakai `top()`, antrian memakai `front()`.
- **Lupa memeriksa sisa di akhir kurung seimbang.** Kata `(()` tidak pernah menemukan kurung tutup yang salah, tetapi tumpukannya masih berisi di akhir, sehingga tidak seimbang.

## Cek mandiri

- [ ] Saya dapat menjelaskan LIFO dan FIFO dengan contoh.
- [ ] Saya dapat memakai `push`, `top` atau `front`, `pop`, dan `empty`.
- [ ] Saya dapat memeriksa kurung seimbang dengan tumpukan.
- [ ] Saya dapat mensimulasikan antrian loket dan menangani antrian kosong.
- [ ] Saya menulis pseudocode sebelum programnya.

## Kunci dan petunjuk

**Ingat kembali.** 1: `push_back` menambah elemen di ujung; `pop_back` membuang elemen di ujung. 2: `n % 10` untuk digit terakhir, `n / 10` untuk membuangnya. 3: karena -999 bukan data, hanya tanda; bila ikut dijumlahkan, rata-ratanya menjadi salah.

**Prediksi dulu.** 1: `3 1`, `2 2 2`. 2: tumpukan mengambil dari yang terakhir masuk (3, lalu 2), antrian dari yang pertama masuk (1, lalu 2).

**Contoh setengah jadi.** Isi: `push`, `empty`, `top`, `pop`. Program lengkapnya:

```cpp
#include <iostream>
#include <stack>
#include <string>
using namespace std;

int main() {
  stack<char> s;
  string t;
  cin >> t;
  for (char c : t) {
    s.push(c);
  }
  while (!s.empty()) {
    cout << s.top();
    s.pop();
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

**Soal Parsons.** Urutan benar: b, e, d, c, a, f (atau dengan (c) dan (f) bertukar). Pencetakan pertama menunjukkan 5 karena 5 masuk lebih dulu; setelah `pop()` yang depan menjadi 8.

**Latihan.** 1: pseudocode: baca kata; untuk tiap huruf: masukkan ke tumpukan dan ke antrian; selama tumpukan tidak kosong: bila huruf teratas tumpukan berbeda dari huruf terdepan antrian, bukan palindrom; keluarkan dari keduanya; bila tidak ada beda, palindrom. Program contoh:

```cpp
#include <iostream>
#include <queue>
#include <stack>
#include <string>
using namespace std;

int main() {
  string t;
  cin >> t;
  stack<char> s;
  queue<char> q;
  for (char c : t) {
    s.push(c);
    q.push(c);
  }
  bool palindrom = true;
  while (!s.empty()) {
    if (s.top() != q.front()) {
      palindrom = false;
    }
    s.pop();
    q.pop();
  }
  if (palindrom) {
    cout << t << ": palindrom\n";
  } else {
    cout << t << ": bukan palindrom\n";
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

Dengan masukan `kayu`, tumpukan memberi `u` sedangkan antrian memberi `k`, sehingga keluarannya `kayu: bukan palindrom`. 2: antrian setelah tiap perintah: D (1); L (kosong), tercetak `melayani nomor 1`; D (2); D (2, 3); L (3), `melayani nomor 2`; L (kosong), `melayani nomor 3`; L (kosong), `loket kosong`. 3: program contoh:

```cpp
#include <iostream>
#include <stack>
#include <string>
using namespace std;

int main() {
  string t;
  cin >> t;
  stack<int> s;
  for (char c : t) {
    if (c == 'C') {
      if (s.empty()) {
        cout << "kosong\n";
      } else {
        cout << s.top() << "\n";
        s.pop();
      }
    } else {
      s.push(c - '0');
    }
  }
}
```

Masukan (`masukan.txt`):

```text
58C3CCC
```

Keluaran:

```text
8
3
5
kosong
```

4: tambahkan cabang `else if (perintah == 'N') { cout << "menunggu: " << antrian.size() << "\n"; }`. Program contoh:

```cpp
#include <iostream>
#include <queue>
using namespace std;

int main() {
  queue<int> antrian;
  int nomor = 0;
  char perintah;
  while (cin >> perintah) {
    if (perintah == 'D') {
      nomor++;
      antrian.push(nomor);
    } else if (perintah == 'L') {
      if (antrian.empty()) {
        cout << "loket kosong\n";
      } else {
        cout << "melayani nomor " << antrian.front() << "\n";
        antrian.pop();
      }
    } else if (perintah == 'N') {
      cout << "menunggu: " << antrian.size() << "\n";
    }
  }
}
```

Masukan (`masukan.txt`):

```text
D D N L N
```

Keluaran:

```text
menunggu: 2
melayani nomor 1
menunggu: 1
```

**Latihan bercampur.** 1: `v.push_back(c)` untuk tiap huruf; `while (!v.empty()) { cout << v.back(); v.pop_back(); }`. 2: faktor masuk dengan `push(i)`; saat dikeluarkan urutannya 5, 3, 3, 2, 2, 2. 3: untuk `n = 10`: sisa 0, 1, 0, 1 masuk berurutan; dikeluarkan dari atas menjadi 1, 0, 1, 0, yaitu `1010`. Program contoh:

```cpp
#include <iostream>
#include <stack>
using namespace std;

int main() {
  int n;
  cin >> n;
  stack<int> s;
  while (n > 0) {
    s.push(n % 2);
    n = n / 2;
  }
  while (!s.empty()) {
    cout << s.top();
    s.pop();
  }
  cout << "\n";
}
```

Masukan (`masukan.txt`):

```text
10
```

Keluaran:

```text
1010
```

**Ulang berjarak.** 1: LIFO: yang terakhir masuk keluar lebih dulu, contoh tumpukan piring; FIFO: yang pertama masuk keluar lebih dulu, contoh antrian loket. 2: hasilnya tidak terdefinisi karena tidak ada elemen yang dibaca; periksa `empty()` sebelum memanggilnya. 3: kurung tutup harus berpasangan dengan kurung buka terakhir yang belum tertutup, yaitu elemen teratas tumpukan.

## Langkah berikutnya

Modul berikut: `a-x2-m8` (pencarian sekuensial dan biner), yang menelusuri data yang tersimpan di array dan `vector`. Bacaan lanjut: halaman cppreference tentang `std::stack` dan `std::queue`.
