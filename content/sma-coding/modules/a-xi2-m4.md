## Untuk siapa modul ini

Modul ini untuk murid kelas XI jalur A (Algoritmik dengan C++), minggu `A-XI2-M4` silabus v1.4.1: DP pada string, bagian pengayaan. Prasyarat: modul `a-xi2-m3` (knapsack 0/1, tabel dua dimensi) dan `a-x2-m2` (string).

Modul ini berstatus DRAF: karangan penyusun, belum ditinjau pemilik. Butir `F-AP-a`, `F-AP-b`, dan `F-BK-b` dipetakan silabus sebagai dipenuhi jalur ini; modul draf ini belum dihitung sebagai pemenuhan. Keluarga materi OSN yang bertaut: `strategi-problem-solving`. Topik minggu ini ditandai pengayaan (P) di silabus: seluruh modul ini boleh dilewati oleh kelas reguler dan dikerjakan murid yang menuju OSN; modul berikutnya tidak bergantung padanya. Modul tidak menjanjikan kedalaman soal OSN.

Tiap soal latihan bertanda `AI: boleh` atau `AI: tanpa AI`. Masukan program diberikan lewat berkas: `./program < masukan.txt`. Semua data karangan.

## Ingat kembali

Jawab dari ingatan dulu, baru cek di kunci. Soal 1 dari `a-xi2-m3`, soal 2 dari `a-xi2-m1`, soal 3 dari `a-xi1-m10`.

1. Mengapa pada knapsack 0/1 satu dimensi kapasitas harus diulang dari besar ke kecil?
2. Apa beda memoisasi dan tabel, dan mengapa penanda "belum dihitung" tidak boleh nilai yang mungkin menjadi jawaban?
3. Mengapa untuk `k` nilai terbesar dari `n` data, heap berukuran `k` lebih hemat daripada mengurutkan semuanya?

## Tujuan

Setelah modul ini kamu dapat:

- membedakan subsekuens (huruf boleh tidak berdekatan) dari substring (huruf berdekatan);
- merumuskan DP dua barisan: arti `dp[i][j]`, nilai awal, dan peralihan;
- mengisi tabel, mencetak satu subsekuens persekutuan terpanjang, dan menghitung langkah dan memorinya;
- menjelaskan mengapa tabel dua dimensi diisi dari kecil ke besar (keluaran minggu ini: program DP string).

## Prediksi dulu

Ini tugas baca-dan-prediksi, `AI: tanpa AI`. **Tebak dulu, tulis jawabanmu, baru jalankan.** Subsekuens diperoleh dengan menghapus beberapa huruf tanpa mengubah urutan sisanya. Program menghitung panjang subsekuens persekutuan terpanjang dua kata karangan.

```cpp
#include <algorithm>
#include <iostream>
#include <string>
#include <vector>
using namespace std;

int main() {
  string s = "ACBAD";
  string t = "ABAZD";
  int m = s.size();
  int n = t.size();
  vector<vector<int>> dp(m + 1, vector<int>(n + 1, 0));
  for (int i = 1; i <= m; i++) {
    for (int j = 1; j <= n; j++) {
      if (s[i - 1] == t[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }
  cout << "panjang " << dp[m][n] << "\n";
}
```

1. Apa yang tercetak? Tulis satu subsekuens yang kamu temukan.
2. Apakah subsekuens itu juga substring dari kedua kata?

## Contoh terselesaikan

Tebakanmu dapat diperiksa dengan tangan: `ABAD` ada di kedua kata dengan menghapus huruf, tetapi bukan substring keduanya. Kita rumuskan tiga langkah.

1. **Arti `dp[i][j]`:** panjang subsekuens persekutuan terpanjang dari `i` huruf pertama `s` dan `j` huruf pertama `t`.
2. **Nilai awal:** `dp[0][j] = 0` dan `dp[i][0] = 0` (salah satu kata kosong).
3. **Peralihan:** bila huruf terakhirnya sama (`s[i - 1] == t[j - 1]`), kedua huruf itu dipakai: `dp[i - 1][j - 1] + 1`. Bila beda, salah satu huruf dibuang: `max(dp[i - 1][j], dp[i][j - 1])`.

Tabel diisi dari atas ke bawah dan kiri ke kanan, karena tiap sel membaca sel di atas, kiri, atau kiri-atas yang sudah terisi. Program berikut mencetak tabel, satu subsekuens (mundur dari sel kanan-bawah), dan membandingkan banyak langkah dengan rekursi tanpa penyimpanan.

```cpp
#include <algorithm>
#include <iostream>
#include <string>
#include <vector>
using namespace std;

int lengkap(const string& s, const string& t, int i, int j, long long& panggilan) {
  panggilan++;
  if (i == 0 || j == 0) {
    return 0;
  }
  if (s[i - 1] == t[j - 1]) {
    return 1 + lengkap(s, t, i - 1, j - 1, panggilan);
  }
  return max(lengkap(s, t, i - 1, j, panggilan), lengkap(s, t, i, j - 1, panggilan));
}

int main() {
  int banyak;
  cin >> banyak;
  for (int k = 0; k < banyak; k++) {
    string s;
    string t;
    cin >> s >> t;
    int m = s.size();
    int n = t.size();
    vector<vector<int>> dp(m + 1, vector<int>(n + 1, 0));
    long long langkah = 0;
    for (int i = 1; i <= m; i++) {
      for (int j = 1; j <= n; j++) {
        langkah++;
        if (s[i - 1] == t[j - 1]) {
          dp[i][j] = dp[i - 1][j - 1] + 1;
        } else {
          dp[i][j] = max(dp[i - 1][j], dp[i][j - 1]);
        }
      }
    }
    cout << s << " dan " << t << "\n";
    for (int i = 0; i <= m; i++) {
      for (int j = 0; j <= n; j++) {
        cout << dp[i][j] << " ";
      }
      cout << "\n";
    }
    string hasil;
    int i = m;
    int j = n;
    while (i > 0 && j > 0) {
      if (s[i - 1] == t[j - 1]) {
        hasil.push_back(s[i - 1]);
        i--;
        j--;
      } else if (dp[i - 1][j] >= dp[i][j - 1]) {
        i--;
      } else {
        j--;
      }
    }
    reverse(hasil.begin(), hasil.end());
    cout << "panjang " << dp[m][n] << ", salah satu: " << hasil << " (" << langkah << " langkah)\n";
    long long panggilan = 0;
    int cek = lengkap(s, t, m, n, panggilan);
    cout << "rekursi tanpa simpan: " << cek << " (" << panggilan << " panggilan)\n";
  }
}
```

Masukan (`masukan.txt`):

```text
2
ALGORITMA LOGARITMA
ABCDEF GHIJKL
```

Keluaran:

```text
ALGORITMA dan LOGARITMA
0 0 0 0 0 0 0 0 0 0 
0 0 0 0 1 1 1 1 1 1 
0 1 1 1 1 1 1 1 1 1 
0 1 1 2 2 2 2 2 2 2 
0 1 2 2 2 2 2 2 2 2 
0 1 2 2 2 3 3 3 3 3 
0 1 2 2 2 3 4 4 4 4 
0 1 2 2 2 3 4 5 5 5 
0 1 2 2 2 3 4 5 6 6 
0 1 2 2 3 3 4 5 6 7 
panjang 7, salah satu: LGRITMA (81 langkah)
rekursi tanpa simpan: 7 (50 panggilan)
ABCDEF dan GHIJKL
0 0 0 0 0 0 0 
0 0 0 0 0 0 0 
0 0 0 0 0 0 0 
0 0 0 0 0 0 0 
0 0 0 0 0 0 0 
0 0 0 0 0 0 0 
0 0 0 0 0 0 0 
panjang 0, salah satu:  (36 langkah)
rekursi tanpa simpan: 0 (1847 panggilan)
```

Baca angkanya. Tabel memerlukan `m * n` langkah, `O(m * n)`, dan `(m + 1) * (n + 1)` sel memori. Pada pasangan pertama rekursi tanpa simpanan justru lebih sedikit, karena huruf yang sama langsung dipakai dan hanya satu cabang yang dijelajahi. Pada pasangan kedua, yang tak punya huruf sama, rekursi menjelajahi dua cabang di tiap sel dan memanggil `(i, j)` yang sama berulang, sehingga pemanggilannya melonjak jauh di atas `m * n` langkah tabel. Kedua cara memberi panjang yang sama, dan itu cara memeriksa DP pada data kecil. Mungkin ada lebih dari satu subsekuens terpanjang; program mencetak satu.

## Contoh setengah jadi

Lengkapi peralihan tabel untuk `s = "ACBAD"` dan `t = "ABAZD"`.

```cpp setengah-jadi
for (int i = 1; i <= m; i++) {
  for (int j = 1; j <= n; j++) {
    if (s[i - 1] == t[j - 1]) {
      dp[i][j] = dp[____][____] + 1;
    } else {
      dp[i][j] = max(dp[i - 1][j], dp[i][____]);
    }
  }
}
```

## Soal Parsons

Susun sembilan baris berikut (sudah diacak, tanpa lekuk) menjadi pengisian tabel. `AI: tanpa AI`: tujuannya melatih membaca urutan.

```text
(a) dp[i][j] = max(dp[i - 1][j], dp[i][j - 1]);
(b) for (int i = 1; i <= m; i++) {
(c) if (s[i - 1] == t[j - 1]) {
(d) } else {
(e) for (int j = 1; j <= n; j++) {
(f) dp[i][j] = dp[i - 1][j - 1] + 1;
(g) }
(h) }
(i) }
```

## Latihan

1. `AI: boleh` **LCS.** Tulis pseudocode lebih dulu, lalu program yang membaca dua kata dan mencetak panjang subsekuens persekutuan terpanjangnya. Uji dua kata yang sama, dua kata tanpa huruf yang sama, dan kata satu huruf.
2. `AI: tanpa AI` **Telusuri.** Isi tabel `dp` untuk `s = "ABC"` dan `t = "AC"` dengan tangan. Berapa panjangnya dan apa subsekuensnya?
3. `AI: boleh` **Substring.** Cari panjang substring persekutuan terpanjang. Bila huruf sama, `dp[i][j] = dp[i - 1][j - 1] + 1`; bila beda, `dp[i][j] = 0`. Jawabannya nilai terbesar di seluruh tabel. Uji `"ABABC"` dan `"BABCA"`.
4. `AI: boleh` **Hapus agar sama.** Berapa huruf paling sedikit yang harus dihapus dari kedua kata agar keduanya menjadi kata yang sama? Pakai panjang LCS.
5. *Opsional:* **catatan pemakaian AI.** Bila memakai AI generatif, jawab nomor 2 sendiri dulu, lalu minta penjelasan atau petunjuk bertahap, bukan program jadi. Catat alatnya, tujuanmu, garis besar perintahmu, bagian yang kamu pakai, dan caramu memeriksanya. Jangan menaruh data pribadi atau tugas bernilai pada perintah.

## Latihan bercampur

1. `AI: boleh` Program di atas memakai `cin >> s`. Kapan itu cukup dan kapan perlu `getline` (modul `a-x2-m2`)? Ubah program untuk kata berspasi.
2. `AI: tanpa AI` Tabel `int` untuk dua kata sepanjang 2.000 memakai kira-kira berapa memori (modul `a-xi2-m3`: tabel `n * W`)?
3. `AI: boleh` Tulis `lengkap` dengan memoisasi (modul `a-xi2-m1`) dan cetak banyak pemanggilannya untuk `"ABCDEF"` dan `"GHIJKL"`. Bandingkan dengan rekursi tanpa simpanan pada pasangan yang sama.

## Pengayaan (P)

Bagian ini boleh dilewati; ia bukan syarat modul berikutnya. **Jarak sunting** menghitung operasi paling sedikit (hapus, sisip, atau ganti satu huruf) untuk mengubah `s` menjadi `t`. Tabelnya mirip LCS: `dp[i][j]` biaya mengubah `i` huruf pertama `s` menjadi `j` huruf pertama `t`, dengan `dp[i][0] = i` (hapus semua) dan `dp[0][j] = j` (sisip semua). Bila huruf terakhir sama, `dp[i][j] = dp[i - 1][j - 1]`; bila beda, ambil yang terkecil dari `dp[i - 1][j] + 1` (hapus), `dp[i][j - 1] + 1` (sisip), dan `dp[i - 1][j - 1] + 1` (ganti). Dua baris cukup bila hanya jaraknya yang dibutuhkan, sehingga memori turun dari `m * n` menjadi `2 * n`.

```cpp
#include <algorithm>
#include <iostream>
#include <string>
#include <vector>
using namespace std;

int jarak(const string& s, const string& t) {
  int m = s.size();
  int n = t.size();
  vector<int> lama(n + 1);
  vector<int> baru(n + 1);
  for (int j = 0; j <= n; j++) {
    lama[j] = j;
  }
  for (int i = 1; i <= m; i++) {
    baru[0] = i;
    for (int j = 1; j <= n; j++) {
      if (s[i - 1] == t[j - 1]) {
        baru[j] = lama[j - 1];
      } else {
        baru[j] = min(min(lama[j], baru[j - 1]), lama[j - 1]) + 1;
      }
    }
    lama = baru;
  }
  return lama[n];
}

int main() {
  cout << "kopi -> topi: " << jarak("kopi", "topi") << "\n";
  cout << "sapu -> sepatu: " << jarak("sapu", "sepatu") << "\n";
  cout << "kelapa -> kelapa: " << jarak("kelapa", "kelapa") << "\n";
  cout << "padi -> (kosong): " << jarak("padi", "") << "\n";
}
```

Keluaran:

```text
kopi -> topi: 1
sapu -> sepatu: 3
kelapa -> kelapa: 0
padi -> (kosong): 4
```

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `a-xi2-m5` (pertanyaan 1), sekitar tiga minggu lagi di `a-xi2-m7` (pertanyaan 2), dan sekitar delapan minggu lagi di `a-xi2-m12` (pertanyaan 3). Jawab sekarang lalu simpan.

1. Apa beda subsekuens dan substring?
2. Dari sel mana saja nilai `dp[i][j]` pada LCS dihitung, dan mengapa tabel diisi dari atas ke bawah dan kiri ke kanan?
3. Mengapa tabel LCS untuk dua kata sepanjang 10.000 sangat besar, dan bagaimana mengakalinya bila hanya panjangnya yang dibutuhkan?

## Kesalahan umum

- **Mencampur subsekuens dengan substring.** Subsekuens boleh melompati huruf; substring harus berdekatan.
- **Tabel tanpa baris dan kolom nol.** Ukuran `m * n` membuat `dp[i - 1][j - 1]` keluar dari larik; pakai `(m + 1) * (n + 1)`.
- **Salah indeks huruf.** Pada `dp[i][j]` huruf yang dibandingkan adalah `s[i - 1]` dan `t[j - 1]`, bukan `s[i]` dan `t[j]`.
- **Mencetak hasil tanpa membalik.** Mundur dari kanan-bawah menghasilkan huruf dari belakang; balik dulu.
- **Mengira hanya ada satu jawaban.** Beberapa subsekuens bisa sama panjang; panjangnya pasti, isinya tidak selalu tunggal.

## Cek mandiri

- [ ] Saya dapat membedakan subsekuens dan substring.
- [ ] Saya dapat menulis arti `dp[i][j]`, nilai awal, dan peralihan LCS.
- [ ] Saya dapat mengisi tabel dan mencetak satu subsekuens.
- [ ] Saya dapat menyebut langkah dan memori `m * n`.
- [ ] Saya dapat menjelaskan mengapa tabel diisi dari kecil ke besar.

## Kunci dan petunjuk

**Ingat kembali.** 1: agar `dp[c - berat]` masih berisi keadaan sebelum barang ini; perulangan menaik membaca sel yang sudah memasukkan barang yang sama sehingga barang terambil berulang. 2: memoisasi rekursi atas-bawah dengan jawaban disimpan; tabel memakai perulangan bawah-atas; penanda yang bisa menjadi jawaban membuat jawaban yang sah dikira belum dihitung. 3: heap `k` hanya `n log k` langkah dan memori `k`, sedangkan mengurutkan semuanya `n log n` langkah dan menyimpan seluruh data.

**Prediksi dulu.** 1: `panjang 4`; salah satu subsekuensnya `ABAD`. 2: bukan substring; di `ACBAD` huruf `A`, `B`, `A`, `D` tidak berdekatan, dan di `ABAZD` huruf `Z` berada di antara `A` dan `D`.

```text
panjang 4
```

**Contoh setengah jadi.** Isi: `i - 1`, `j - 1`, dan `j - 1`. Program lengkap yang diisi dari kunci:

```cpp
#include <algorithm>
#include <iostream>
#include <string>
#include <vector>
using namespace std;

int main() {
  string s = "ACBAD";
  string t = "ABAZD";
  int m = s.size();
  int n = t.size();
  vector<vector<int>> dp(m + 1, vector<int>(n + 1, 0));
  for (int i = 1; i <= m; i++) {
    for (int j = 1; j <= n; j++) {
      if (s[i - 1] == t[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }
  for (int i = 0; i <= m; i++) {
    for (int j = 0; j <= n; j++) {
      cout << dp[i][j] << " ";
    }
    cout << "\n";
  }
}
```

Keluaran:

```text
0 0 0 0 0 0 
0 1 1 1 1 1 
0 1 1 1 1 1 
0 1 2 2 2 2 
0 1 2 3 3 3 
0 1 2 3 3 4 
```

**Soal Parsons.** Urutan benar: b, e, c, f, d, a, g, h, i.

**Latihan.** 1: pseudocode: `dp[0][*] = dp[*][0] = 0`; untuk `i` dari 1 sampai `m`, `j` dari 1 sampai `n`: bila `s[i-1] == t[j-1]` maka `dp[i][j] = dp[i-1][j-1] + 1`, bila tidak `max(dp[i-1][j], dp[i][j-1])`; cetak `dp[m][n]`. Program contoh:

```cpp
#include <algorithm>
#include <iostream>
#include <string>
#include <vector>
using namespace std;

int main() {
  int banyak;
  cin >> banyak;
  for (int k = 0; k < banyak; k++) {
    string s;
    string t;
    cin >> s >> t;
    int m = s.size();
    int n = t.size();
    vector<vector<int>> dp(m + 1, vector<int>(n + 1, 0));
    for (int i = 1; i <= m; i++) {
      for (int j = 1; j <= n; j++) {
        if (s[i - 1] == t[j - 1]) {
          dp[i][j] = dp[i - 1][j - 1] + 1;
        } else {
          dp[i][j] = max(dp[i - 1][j], dp[i][j - 1]);
        }
      }
    }
    cout << s << " " << t << ": " << dp[m][n] << "\n";
  }
}
```

Masukan (`masukan.txt`):

```text
3
buku buku
abc xyz
a a
```

Keluaran:

```text
buku buku: 4
abc xyz: 0
a a: 1
```

2: baris `i = 0`: `0 0 0`; `i = 1` (`A`): `0 1 1`; `i = 2` (`B`): `0 1 1`; `i = 3` (`C`): `0 1 2`. Panjangnya 2, subsekuensnya `AC`. 3: program contoh:

```cpp
#include <algorithm>
#include <iostream>
#include <string>
#include <vector>
using namespace std;

int main() {
  string s = "ABABC";
  string t = "BABCA";
  int m = s.size();
  int n = t.size();
  vector<vector<int>> dp(m + 1, vector<int>(n + 1, 0));
  int terbesar = 0;
  for (int i = 1; i <= m; i++) {
    for (int j = 1; j <= n; j++) {
      if (s[i - 1] == t[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
        terbesar = max(terbesar, dp[i][j]);
      }
    }
  }
  cout << "substring terpanjang: " << terbesar << "\n";
}
```

Keluaran:

```text
substring terpanjang: 4
```

Substringnya `BABC`. 4: jumlah huruf yang dihapus adalah `m + n - 2 * LCS`. Program contoh:

```cpp
#include <algorithm>
#include <iostream>
#include <string>
#include <vector>
using namespace std;

int main() {
  string s;
  string t;
  cin >> s >> t;
  int m = s.size();
  int n = t.size();
  vector<vector<int>> dp(m + 1, vector<int>(n + 1, 0));
  for (int i = 1; i <= m; i++) {
    for (int j = 1; j <= n; j++) {
      if (s[i - 1] == t[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }
  cout << "dihapus: " << m + n - 2 * dp[m][n] << " huruf\n";
}
```

Masukan (`masukan.txt`):

```text
ALGORITMA LOGARITMA
```

Keluaran:

```text
dihapus: 4 huruf
```

**Latihan bercampur.** 1: `cin >> s` berhenti di spasi sehingga cukup untuk kata tanpa spasi; untuk baris berspasi pakai `getline(cin, s)`. Pada masukan berbentuk `banyak` lalu baris, buang akhir baris setelah `cin >> banyak` dengan `cin.ignore()` sebelum `getline`. 2: `2001 * 2001 * 4` bita, sekitar 16 MB. 3: program:

```cpp
#include <algorithm>
#include <iostream>
#include <string>
#include <vector>
using namespace std;

int memo(const string& s, const string& t, int i, int j, vector<vector<int>>& simpan, long long& panggilan) {
  panggilan++;
  if (i == 0 || j == 0) {
    return 0;
  }
  if (simpan[i][j] != -1) {
    return simpan[i][j];
  }
  int hasil;
  if (s[i - 1] == t[j - 1]) {
    hasil = 1 + memo(s, t, i - 1, j - 1, simpan, panggilan);
  } else {
    hasil = max(memo(s, t, i - 1, j, simpan, panggilan), memo(s, t, i, j - 1, simpan, panggilan));
  }
  simpan[i][j] = hasil;
  return hasil;
}

int main() {
  string s = "ABCDEF";
  string t = "GHIJKL";
  vector<vector<int>> simpan(s.size() + 1, vector<int>(t.size() + 1, -1));
  long long panggilan = 0;
  int hasil = memo(s, t, s.size(), t.size(), simpan, panggilan);
  cout << "memoisasi: " << hasil << " (" << panggilan << " panggilan)\n";
}
```

Keluaran:

```text
memoisasi: 0 (73 panggilan)
```

Pemanggilan dengan simpanan paling banyak sekitar `2 * m * n`, jauh di bawah rekursi tanpa simpanan pada pasangan tanpa huruf sama (bandingkan dengan keluaran contoh).

**Pengayaan (P).** Jarak `kopi` ke `topi` 1 (ganti `k` dengan `t`); `sapu` ke `sepatu` 3 (ganti `a` dengan `e`, sisip `a` dan `t`); `kelapa` ke `kelapa` 0; menghapus semua huruf `padi` menjadi kosong memerlukan 4 operasi.

**Ulang berjarak.** 1: subsekuens boleh melompati huruf asal urutan terjaga; substring harus berupa huruf yang berdekatan tanpa lompatan. 2: dari tiga sel: kiri-atas `dp[i - 1][j - 1]` (bila huruf sama), atas `dp[i - 1][j]`, dan kiri `dp[i][j - 1]`; ketiganya sudah terisi bila tabel diisi baris demi baris dari kiri ke kanan. 3: `10.001 * 10.001` sel `int` sekitar `10^8` sel, sekitar 400 MB; bila hanya panjangnya yang dibutuhkan, dua baris cukup (memori `2 * n`), tetapi satu subsekuens tak dapat dicetak dari dua baris tanpa teknik tambahan.

## Langkah berikutnya

Modul berikut: `a-xi2-m5` (graf: representasi dengan matriks dan daftar ketetanggaan). Modul terkait: `matkom-induksi-dan-rekursi-matematis`. Bacaan lanjut: halaman cppreference tentang `std::basic_string` dan `std::vector`.
