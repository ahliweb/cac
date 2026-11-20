## Untuk siapa modul ini

Modul ini untuk murid kelas XII jalur A (Algoritmik dengan C++), minggu `A-XII2-M6` silabus v1.4.1: latihan terpadu II, yaitu memilih strategi dan struktur data dengan batas waktu, dalam bentuk **kontes mini kelas**. Prasyarat: modul `a-xii2-m5` (latihan terpadu I).

Modul ini berstatus DRAF: karangan penyusun, belum ditinjau pemilik. Silabus tidak memetakan butir capaian pembelajaran untuk minggu ini, jadi modul ini tidak dihitung memenuhi butir CP apa pun. Modul ini **seluruhnya tanpa AI**: semua soal bertanda `AI: tanpa AI` (silabus bagian 7.4), karena tujuannya melatih dan menguji kemampuan menyelesaikan sendiri. Soal adalah **soal karangan bergaya kompetitif**, ditulis orisinal, bukan salinan atau parafrase soal OSN, TOKI, IOI, atau platform lain; sumber resmi hanya ditautkan: <https://osn.toki.id/>. Modul tidak menjanjikan kedalaman soal OSN, dan kontes mini ini **bukan kompetisi**: tidak ada peringkat, hadiah, atau target hasil.

Masukan program diberikan lewat berkas: `./program < masukan.txt`. Semua data karangan.

## Ingat kembali

Jawab dari ingatan dulu, baru cek di kunci. Soal 1 dari `a-xii2-m5`, soal 2 dari `a-xii2-m3`, soal 3 dari `a-xii1-m12`.

1. Apa lima langkah memilih strategi dari batas soal?
2. Mengapa pada soal genteng DP memerlukan dua keadaan, bukan satu?
3. Apa beda galat `undefined reference` dan `multiple definition`?

## Tujuan

Setelah modul ini kamu dapat:

- membagi waktu terbatas untuk membaca semua soal, mengerjakan, menguji, dan mencatat;
- mengambil jawaban sebagian (subtugas) lebih dulu, lalu memperbaikinya menjadi penuh;
- menjalankan kontes mini di kelas tanpa platform luar dan tanpa akun;
- memilih strategi dari batas dan menguji dengan masukan buatanmu sendiri (keluaran minggu ini: solusi dan catatan).

## Prediksi dulu

Ini tugas baca-dan-prediksi, `AI: tanpa AI`. **Tebak dulu, tulis jawabanmu, baru jalankan.** Tiga lampu dan dua saklar: saklar pertama membalik lampu 2 dan 3, saklar kedua membalik lampu 1 dan 2 (tiga bit dicetak dari lampu 3 ke lampu 1). Program mencoba semua pilihan "tekan atau tidak" untuk kedua saklar.

```cpp
#include <iostream>
using namespace std;

int main() {
  int saklar[2] = {0b110, 0b011};
  for (int pilih = 0; pilih < 4; pilih++) {
    int lampu = 0;
    for (int s = 0; s < 2; s++) {
      if ((pilih >> s) & 1) {
        lampu ^= saklar[s];
      }
    }
    for (int b = 2; b >= 0; b--) {
      cout << ((lampu >> b) & 1);
    }
    cout << "\n";
  }
}
```

1. Apa keempat baris yang tercetak?
2. Berapa pilihan yang dicoba untuk `m` saklar, dan mengapa tiap saklar cukup ditekan paling banyak sekali?

## Contoh terselesaikan

Keluaran program tadi:

```text
000
110
011
101
```

Menekan keduanya memberi `110 ^ 011 = 101`. Dua kali menekan saklar yang sama membatalkan dirinya, jadi `2^m` pilihan sudah mencakup semuanya.

**Bentuk kontes mini kelas.** Ini kegiatan kelas berbatas waktu, perorangan, dengan tiga soal. Tanpa platform luar dan tanpa akun: soal dibagikan guru (cetak atau tampil di layar), kamu mengerjakan di komputer sekolah dengan `g++`, dan keluaran diperiksa guru dengan `diff` terhadap berkas masukan uji yang disiapkan guru dan dibagikan sesudah waktu habis. Aturan: tanpa AI, tanpa mencari jawaban; dokumentasi bahasa boleh dibuka bila guru mengizinkan. Hasilnya dipakai untuk modul berikutnya, bukan untuk peringkat. Contoh pembagian 90 menit (guru boleh mengubahnya):

| Menit | Kegiatan |
| --- | --- |
| 0 sampai 10 | baca ketiga soal, tandai yang tampak termudah, tulis perkiraan langkah |
| 10 sampai 25 | soal A: tulis, uji dengan contoh dan satu masukan buatanmu |
| 25 sampai 50 | soal B |
| 50 sampai 80 | soal C (ambil subtugas dulu bila tak selesai penuh) |
| 80 sampai 90 | uji ulang, tulis catatan tiga baris tiap soal: strategi dan alasannya, perkiraan langkah dan batas, hasil uji beserta satu hal yang akan diubah |

**Strategi waktu: kumpulkan jawaban sebagian lebih dulu.** Contoh: jumlah ruas terbesar sebuah larik `a` (bilangan boleh negatif). Tiga solusi berurutan: `O(n^3)` benar tetapi lambat, `O(n^2)` dengan jumlah berjalan, dan `O(n)` dengan menyimpan jumlah terbaik yang berakhir di posisi sekarang. Bila batas `n <= 20`, solusi pertama sudah mendapat poin; satu ide kecil membuatnya cukup untuk `n <= 2000`; ide berikutnya untuk batas penuh. Berikut ketiganya pada 300 bilangan karangan, dengan penghitung langkah.

```cpp
#include <algorithm>
#include <iostream>
#include <vector>
using namespace std;

long long kasarKubik(const vector<int>& a, long long& langkah) {
  long long terbaik = a[0];
  for (size_t i = 0; i < a.size(); i++) {
    for (size_t j = i; j < a.size(); j++) {
      long long jumlah = 0;
      for (size_t k = i; k <= j; k++) {
        jumlah += a[k];
        langkah++;
      }
      terbaik = max(terbaik, jumlah);
    }
  }
  return terbaik;
}

long long kuadrat(const vector<int>& a, long long& langkah) {
  long long terbaik = a[0];
  for (size_t i = 0; i < a.size(); i++) {
    long long jumlah = 0;
    for (size_t j = i; j < a.size(); j++) {
      jumlah += a[j];
      langkah++;
      terbaik = max(terbaik, jumlah);
    }
  }
  return terbaik;
}

long long linear(const vector<int>& a, long long& langkah) {
  long long terbaik = a[0];
  long long berakhirDi = 0;
  for (int x : a) {
    langkah++;
    berakhirDi = max(static_cast<long long>(x), berakhirDi + x);
    terbaik = max(terbaik, berakhirDi);
  }
  return terbaik;
}

int main() {
  vector<int> a(300);
  unsigned s = 11;
  for (int& x : a) {
    s = s * 1103515245u + 12345u;
    x = static_cast<int>((s >> 16) % 41) - 20;
  }
  long long l1 = 0;
  long long l2 = 0;
  long long l3 = 0;
  long long h1 = kasarKubik(a, l1);
  long long h2 = kuadrat(a, l2);
  long long h3 = linear(a, l3);
  cout << "kubik   : " << h1 << ", " << l1 << " langkah\n";
  cout << "kuadrat : " << h2 << ", " << l2 << " langkah\n";
  cout << "linear  : " << h3 << ", " << l3 << " langkah\n";
}
```

Keluaran:

```text
kubik   : 262, 4545100 langkah
kuadrat : 262, 45150 langkah
linear  : 262, 300 langkah
```

Ketiganya sepakat pada 262, tetapi langkahnya `n(n+1)(n+2)/6 = 4.545.100`, `n(n+1)/2 = 45.150`, dan `n = 300`: `O(n^3)`, `O(n^2)`, `O(n)`. Selisih ini yang menentukan poin pada batas besar. Kebiasaan yang menyelamatkan waktu: tulis solusi yang pasti benar lebih dulu, lalu gunakan sebagai pembanding bagi solusi yang lebih cepat.

## Contoh setengah jadi

Lengkapi solusi linear. Kuncinya ada di `Kunci dan petunjuk`.

```cpp setengah-jadi
  long long berakhirDi = ____;
  for (int x : a) {
    berakhirDi = max(static_cast<long long>(x), berakhirDi + ____);
    terbaik = max(terbaik, ____);
  }
```

## Soal Parsons

Susun enam baris berikut (sudah diacak, tanpa lekuk) menjadi inti soal B di bawah. `AI: tanpa AI`.

```text
(a) for (int p : harga) {
(b) untung = max(untung, p - termurah);
(c) termurah = min(termurah, p);
(d) }
(e) int termurah = harga[0];
(f) int untung = 0;
```

## Latihan

Tiga soal kontes, semua `AI: tanpa AI`. Soal karangan; data fiktif. Skor saran: A 20, B 30, C 50.

1. **A, Pagar warna.** Satu baris string berhuruf `M`, `K`, `B` (panjang paling banyak `10^5`). Cetak panjang deret huruf sama berturut-turut terpanjang. Contoh: `MMKKKBMMMMK` memberi `4`.
2. **B, Harga tiket.** `n` hari (paling banyak `10^5`) dengan harga `p_i` (paling banyak `10^9`). Beli di hari `i`, jual di hari `j > i`. Cetak keuntungan terbesar, atau `0` bila tak mungkin untung. Contoh: `7` hari dengan harga `9 4 6 3 8 5 10` memberi `7`.
3. **C, Lampu taman.** `n` lampu (paling banyak 15), awalnya mati, dan `m` saklar (paling banyak 15). Tiap saklar menyebut lampu yang dibaliknya. Cetak penekanan minimum agar semua lampu menyala, atau `-1`. Contoh: `4 3` dengan saklar `1 2`, `2 3`, `3 4` memberi `2`.
4. **Rencana.** Sebelum mengerjakan, tulis pembagian menit sendiri dan perkiraan langkah tiap soal.

## Latihan bercampur

1. `AI: tanpa AI` Pada soal C, apa yang dilakukan `^=` bila saklar yang sama ditekan dua kali, dan mengapa itu memperkecil pilihan menjadi `2^m` (modul `a-xi1-m3`)?
2. `AI: tanpa AI` Untuk soal A pada panjang `10^5`, perkirakan langkah solusi dengan membandingkan semua pasangan posisi, dan bandingkan dengan satu penelusuran (modul `a-x2-m12`).
3. `AI: tanpa AI` Mengapa batas `m <= 15` pada soal C menentukan strategi pencarian lengkap, dan apa yang berubah bila `m = 60` (modul `a-xi1-m4`)?

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `a-xii2-m7` (pertanyaan 1), sekitar tiga minggu lagi di `a-xii2-m9` (pertanyaan 2), dan sekitar delapan minggu lagi di `a-xii2-m14` (pertanyaan 5). Jawab sekarang lalu simpan.

1. Mengapa membaca semua soal dulu dan mengambil jawaban sebagian lebih dulu membantu saat waktu terbatas?
2. Bagaimana penghitung langkah menunjukkan bahwa solusi linear mengungguli solusi kuadrat dan kubik?
3. Apa tiga hal yang dicatat sesudah kontes mini untuk tiap soal?

## Kesalahan umum

- **Terpaku pada satu soal.** Sesudah kira-kira waktu yang direncanakan, ambil jawaban sebagian dan pindah.
- **Tidak menguji dengan masukan sendiri.** Contoh soal hampir selalu lolos; cacat tinggal di ukuran terkecil dan nilai batas.
- **Mengoptimalkan sebelum benar.** Solusi pasti benar dulu, baru dipercepat dan dibandingkan dengannya.
- **Meluap pada jumlah.** Jumlah banyak nilai besar perlu `long long`.
- **Menganggap kontes mini sebagai lomba.** Tujuannya latihan dan umpan balik; tidak ada peringkat.

## Cek mandiri

- [ ] Saya dapat menyusun pembagian waktu untuk tiga soal.
- [ ] Saya dapat mengambil subtugas lebih dulu lalu memperbaikinya.
- [ ] Saya dapat menulis masukan uji sendiri untuk soal yang kukerjakan.
- [ ] Saya dapat menyebut langkah tiap solusi dengan penghitung.
- [ ] Saya menulis catatan tiga baris untuk tiap soal.

## Kunci dan petunjuk

**Ingat kembali.** 1: baca batas dan perkirakan langkah; tulis kandidat strategi; cari contoh kecil yang mematahkan tiap kandidat; tulis dan uji; catat. 2: boleh tidaknya genteng 2 bergantung pada genteng terakhir, sehingga keadaan `(panjang, jenis genteng terakhir)` diperlukan. 3: `undefined reference`: ada deklarasi tetapi tak ada definisi di berkas objek yang ditautkan; `multiple definition`: definisi yang sama ada di lebih dari satu berkas objek.

**Prediksi dulu.** 1: `000`, `110`, `011`, `101`. 2: `2^m`; menekan saklar dua kali membatalkannya (pembalikan dua kali kembali ke awal), jadi cukup tiap saklar sekali atau tidak sama sekali.

**Contoh setengah jadi.** Isi: `0`, `x`, dan `berakhirDi`. Pada tiap posisi, jumlah terbaik yang berakhir di situ adalah `x` sendiri atau `x` ditambah jumlah terbaik yang berakhir di posisi sebelumnya; jumlah terbaik keseluruhan adalah yang terbesar di antara semuanya.

**Soal Parsons.** Urutan: e, f, a, b, c, d. Baris e dan f menyiapkan penampung; `untung` dihitung memakai harga termurah sebelum hari ini.

**Latihan.** A: satu penelusuran, `O(n)`.

```cpp
#include <algorithm>
#include <iostream>
#include <string>
using namespace std;

int main() {
  string s;
  cin >> s;
  int terpanjang = 1;
  int saatIni = 1;
  for (size_t i = 1; i < s.size(); i++) {
    saatIni = (s[i] == s[i - 1]) ? saatIni + 1 : 1;
    terpanjang = max(terpanjang, saatIni);
  }
  cout << terpanjang << "\n";
}
```

Masukan (`masukan.txt`):

```text
MMKKKBMMMMK
```

Keluaran:

```text
4
```

Uji: satu huruf memberi 1. B: simpan harga termurah sejauh ini dan keuntungan terbaik; `O(n)`.

```cpp
#include <algorithm>
#include <iostream>
#include <vector>
using namespace std;

int main() {
  int n;
  cin >> n;
  vector<int> harga(n);
  for (int& p : harga) {
    cin >> p;
  }
  int termurah = harga[0];
  int untung = 0;
  for (int p : harga) {
    untung = max(untung, p - termurah);
    termurah = min(termurah, p);
  }
  cout << untung << "\n";
}
```

Masukan (`masukan.txt`):

```text
7
9 4 6 3 8 5 10
```

Keluaran:

```text
7
```

Beli di harga 3, jual di 10. Uji: harga turun terus (`9 7 5 3`) memberi 0. C: tiap saklar sebagai topeng bit, coba semua `2^m` himpunan saklar dengan `^`; `2^15 * 15`, sekitar 491.520 langkah.

```cpp
#include <iostream>
using namespace std;

int main() {
  int n;
  int m;
  cin >> n >> m;
  int saklar[15] = {0};
  for (int s = 0; s < m; s++) {
    int k;
    cin >> k;
    for (int i = 0; i < k; i++) {
      int lampu;
      cin >> lampu;
      saklar[s] |= 1 << (lampu - 1);
    }
  }
  int semua = (1 << n) - 1;
  int terbaik = -1;
  for (int pilih = 0; pilih < (1 << m); pilih++) {
    int keadaan = 0;
    int tekan = 0;
    for (int s = 0; s < m; s++) {
      if ((pilih >> s) & 1) {
        keadaan ^= saklar[s];
        tekan++;
      }
    }
    if (keadaan == semua && (terbaik == -1 || tekan < terbaik)) {
      terbaik = tekan;
    }
  }
  cout << terbaik << "\n";
}
```

Masukan (`masukan.txt`):

```text
4 3
2 1 2
2 2 3
2 3 4
```

Keluaran:

```text
2
```

Saklar 1 dan 3 membalik lampu `1 2` dan `3 4`, menyalakan semua. Uji: `3 2` dengan saklar `1 1` dan `1 2` tak pernah menyalakan lampu 3, sehingga jawabannya `-1`.

**Latihan bercampur.** 1: `^=` membalik bit; dua kali memberi keadaan semula, jadi tiap saklar punya dua pilihan dan seluruhnya `2^m`. 2: membandingkan semua pasangan posisi sekitar `5 * 10^9` langkah, tak layak; satu penelusuran `10^5` langkah. 3: `2^15` pilihan (32.768) mudah; `2^60` tak mungkin, sehingga butuh ide lain (mis. aljabar atas bit), yang di luar modul ini.

## Langkah berikutnya

Modul berikutnya, `a-xii2-m7` (latihan terpadu III), menganalisis kesalahan jawaban dari latihan seperti ini, tanpa AI. Bawa catatan tiga barismu dari kontes. Modul terkait: `matkom-pertumbuhan-fungsi`. Bacaan lanjut: halaman resmi <https://osn.toki.id/> (hanya tautan) dan halaman cppreference tentang `std::max`.
