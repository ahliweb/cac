## Untuk siapa modul ini

Modul ini untuk murid kelas XII jalur A (Algoritmik dengan C++), minggu `A-XII2-M3` silabus v1.4.1: memodelkan masalah, yaitu menerjemahkan soal cerita menjadi graf atau DP. Prasyarat: modul `a-xii2-m2` (pemeliharaan program II).

Modul ini karangan penyusun dan disetujui pemilik program pada 2026-11-20 (keputusan lewat dialog; catatan tinjauan menjadi tindak lanjut revisi). Silabus tidak memetakan butir capaian pembelajaran untuk minggu ini, jadi modul ini tidak dihitung memenuhi butir CP apa pun. Keluarga materi OSN yang dipetakan juga tidak ada untuk minggu ini. Modul memakai BFS (modul `a-xi2-m6`) dan DP satu dimensi (modul `a-xi2-m2`) sebagai alat; keduanya tidak diajarkan ulang di sini.

Tiap soal latihan bertanda `AI: boleh` atau `AI: tanpa AI`. Masukan program diberikan lewat berkas: `./program < masukan.txt`. Semua soal cerita karangan.

## Ingat kembali

Jawab dari ingatan dulu, baru cek di kunci. Soal 1 dari `a-xii2-m2`, soal 2 dari `a-xi2-m6`, soal 3 dari `a-xii1-m9`.

1. Mengapa mengukur banyak langkah lebih dulu daripada mengoptimalkan berdasarkan firasat?
2. Mengapa BFS pada graf tak berbobot menemukan jarak terpendek?
3. Kapan Fenwick lebih cocok daripada larik jumlah prefiks biasa?

## Tujuan

Setelah modul ini kamu dapat:

- menemukan apa yang berubah dalam sebuah soal cerita dan menyebutnya sebagai keadaan (simpul graf atau indeks DP);
- menyebut perpindahan antarkeadaan sebagai sisi atau transisi;
- memutuskan graf atau DP dengan alasan, lalu memperkirakan banyak langkahnya;
- menulis lembar pemodelan dan menguji model dengan penyelesaian paksa pada ukuran kecil (keluaran minggu ini: lembar pemodelan).

## Prediksi dulu

Ini tugas baca-dan-prediksi, `AI: tanpa AI`. **Tebak dulu, tulis jawabanmu, baru jalankan.** Sebuah lift di gedung 10 lantai punya dua tombol: naik 4 lantai atau turun 3 lantai (hanya bila lantai tujuannya ada). Program menghitung banyak penekanan tombol minimum dari lantai 2.

```cpp
#include <iostream>
#include <queue>
#include <vector>
using namespace std;

int main() {
  int n = 10;
  int naik = 4;
  int turun = 3;
  vector<int> jarak(n + 1, -1);
  queue<int> antre;
  jarak[2] = 0;
  antre.push(2);
  while (!antre.empty()) {
    int u = antre.front();
    antre.pop();
    int tujuan[2] = {u + naik, u - turun};
    for (int v : tujuan) {
      if (v >= 1 && v <= n && jarak[v] == -1) {
        jarak[v] = jarak[u] + 1;
        antre.push(v);
      }
    }
  }
  cout << jarak[10] << " " << jarak[3] << "\n";
}
```

1. Berapa penekanan minimum dari lantai 2 ke lantai 10, dan ke lantai 3?
2. Apa yang menjadi simpul dan apa yang menjadi sisi dalam program ini?

## Contoh terselesaikan

Keluaran program tadi:

```text
2 2
```

Ke lantai 10: naik ke 6, lalu naik ke 10. Ke lantai 3: naik ke 6, lalu turun ke 3. Simpulnya lantai, sisinya penekanan tombol, dan pertanyaan "paling sedikit penekanan" adalah jarak terpendek pada graf tak berbobot, yang dijawab BFS.

**Pemodelan adalah menjawab empat pertanyaan:** apa yang berubah (keadaan), bagaimana keadaan berpindah (transisi), apa yang ditanyakan, dan alat apa yang menjawabnya. Aturan praktis: bila perpindahan bisa dilakukan bolak-balik atau berputar dan kamu butuh jarak atau keterhubungan, pilih **graf**. Bila jawaban sebuah keadaan tersusun dari jawaban keadaan yang lebih kecil dan perpindahan hanya maju, pilih **DP**. Hasil pemodelan ditulis di lembar:

| Kolom lembar | Isi untuk soal lift |
| --- | --- |
| Keadaan | nomor lantai `1..n` |
| Transisi | `u -> u + a` dan `u -> u - b` bila ada di gedung |
| Pertanyaan | penekanan minimum dari `mulai` ke `tujuan` |
| Alat dan alasan | BFS: semua sisi berbobot sama |
| Batas dan langkah | tiap lantai masuk antrean sekali, dua sisi per lantai: sekitar `2n` langkah, `O(n)` |
| Uji kecil | `a = b = 4`, `n = 8`: lantai 3 tak terjangkau |

Programnya membaca banyak kueri `n a b mulai tujuan` dan mencetak `mustahil` bila tak terjangkau.

```cpp
#include <iostream>
#include <queue>
#include <vector>
using namespace std;

int main() {
  int n;
  int a;
  int b;
  int mulai;
  int tujuan;
  while (cin >> n >> a >> b >> mulai >> tujuan) {
    vector<int> jarak(n + 1, -1);
    queue<int> antre;
    jarak[mulai] = 0;
    antre.push(mulai);
    while (!antre.empty()) {
      int u = antre.front();
      antre.pop();
      int langkah[2] = {u + a, u - b};
      for (int v : langkah) {
        if (v >= 1 && v <= n && jarak[v] == -1) {
          jarak[v] = jarak[u] + 1;
          antre.push(v);
        }
      }
    }
    if (jarak[tujuan] == -1) {
      cout << "mustahil\n";
    } else {
      cout << jarak[tujuan] << "\n";
    }
  }
}
```

Masukan (`masukan.txt`):

```text
10 4 3 2 10
10 4 3 2 3
8 4 4 1 3
5 2 2 1 1
```

Keluaran:

```text
2
2
mustahil
0
```

Kueri ketiga mustahil: dari lantai 1 hanya lantai 1 dan 5 yang terjangkau (lantai 9 di luar gedung 8 lantai), jadi 3 tak pernah tercapai. Kueri keempat mulai dan tujuannya sama, jadi 0.

**Soal kedua, DP.** Atap sepanjang `n` satuan ditutup genteng berukuran 1 atau 2, dan **tak boleh dua genteng ukuran 2 berdampingan**. Berapa susunan yang mungkin? Satu keadaan "panjang terisi `i`" tidak cukup, sebab boleh tidaknya memasang genteng 2 bergantung pada genteng terakhir. Keadaan yang benar: `(i, jenis genteng terakhir)`. Maka `kecil[i]` = banyak susunan sepanjang `i` yang berakhir genteng 1 (atau kosong), `besar[i]` yang berakhir genteng 2. Transisinya: `kecil[i] = kecil[i-1] + besar[i-1]` dan `besar[i] = kecil[i-2]`. Program menguji model dengan **penyelesaian paksa** yang mencoba semua susunan.

```cpp
#include <iostream>
#include <vector>
using namespace std;

long long cobaSemua(int sisa, bool terakhirBesar) {
  if (sisa == 0) {
    return 1;
  }
  long long total = cobaSemua(sisa - 1, false);
  if (sisa >= 2 && !terakhirBesar) {
    total += cobaSemua(sisa - 2, true);
  }
  return total;
}

int main() {
  const int N = 12;
  vector<long long> kecil(N + 1, 0);
  vector<long long> besar(N + 1, 0);
  kecil[0] = 1;
  for (int i = 1; i <= N; i++) {
    kecil[i] = kecil[i - 1] + besar[i - 1];
    if (i >= 2) {
      besar[i] = kecil[i - 2];
    }
  }
  for (int i = 1; i <= N; i++) {
    long long dp = kecil[i] + besar[i];
    long long coba = cobaSemua(i, false);
    cout << "panjang " << i << ": " << dp << (dp == coba ? " (cocok)" : " (BEDA)") << "\n";
  }
}
```

Keluaran:

```text
panjang 1: 1 (cocok)
panjang 2: 2 (cocok)
panjang 3: 3 (cocok)
panjang 4: 4 (cocok)
panjang 5: 6 (cocok)
panjang 6: 9 (cocok)
panjang 7: 13 (cocok)
panjang 8: 19 (cocok)
panjang 9: 28 (cocok)
panjang 10: 41 (cocok)
panjang 11: 60 (cocok)
panjang 12: 88 (cocok)
```

Untuk panjang 4 ada empat susunan: `1111`, `112`, `121`, `211` (`22` dilarang). DP memerlukan sekitar `2n` langkah, `O(n)`, sedangkan penyelesaian paksa tumbuh seperti jumlah susunan itu sendiri (88 untuk panjang 12, dan naik terus). Kolom "cocok" pada tiap ukuran kecil memberi kepercayaan pada model sebelum dipakai untuk ukuran besar.

## Contoh setengah jadi

Lengkapi lembar pemodelan untuk soal berikut. Kuncinya ada di `Kunci dan petunjuk`.

Soal: sebuah toko memberi `n` hari, tiap hari boleh dipilih satu tugas bernilai `v[i]`, dan **dua hari berurutan tak boleh dipilih keduanya**. Maksimalkan jumlah nilai.

```text
Keadaan     : ____
Transisi    : terbaik[i] = max(____, v[i] + ____)
Pertanyaan  : ____
Alat        : ____ karena ____
Batas       : sekitar ____ langkah
Uji kecil   : ____
```

## Soal Parsons

Susun lima baris langkah memodelkan berikut menjadi urutan yang benar. `AI: tanpa AI`.

```text
(a) uji model dengan penyelesaian paksa pada ukuran kecil
(b) tentukan apa yang berubah (keadaan)
(c) tulis alat, alasan, dan perkiraan langkah
(d) tentukan perpindahan antarkeadaan (transisi)
(e) tulis pertanyaan yang diminta soal
```

## Latihan

Untuk tiap soal tulis lembar pemodelan lebih dulu; program ditulis sesudahnya bila diminta.

1. `AI: boleh` **Kabar desa.** Desa punya `n` rumah dan `m` jalan setapak dua arah. Kabar menyebar dari rumah ke tetangga langsung. Berapa kelompok rumah yang kabarnya tak pernah sampai ke kelompok lain? Tulis lembar dan program.
2. `AI: tanpa AI` **Mesin angka.** Mulai dari 1; tiap langkah boleh mengalikan dua atau menambah tiga. Berapa langkah minimum mencapai `N`? Tulis lembar dan hitung dengan tangan untuk `N = 10` dan `N = 13`.
3. `AI: boleh` **Tangga rusak.** Tangga `n` anak tangga, tiap langkah naik 1 atau 3 anak tangga, dan beberapa anak tangga rusak tak boleh diinjak. Hitung banyak cara mencapai anak tangga `n` dari tanah. Tulis lembar dan program.
4. `AI: tanpa AI` **Hari tugas.** Soal setengah jadi di atas: tulis lembar lengkap, lalu program, dan ujilah dengan penyelesaian paksa pada `n` kecil.
5. *Opsional:* **catatan pemakaian AI.** Bila memakai AI generatif, kerjakan nomor 2 sendiri dulu, lalu minta penjelasan atau petunjuk bertahap, bukan program jadi. Catat alatnya, tujuanmu, garis besar perintahmu, bagian yang kamu pakai, dan caramu memeriksanya. Jangan menaruh data pribadi atau tugas bernilai pada perintah.

## Latihan bercampur

1. `AI: tanpa AI` Pada soal lift, bagaimana bila tiap tombol punya biaya listrik berbeda? Apa yang berubah pada alatnya (modul `a-xii1-m2`)?
2. `AI: boleh` Soal genteng dengan `n = 10^5` dan jawaban diminta modulo `10^9 + 7`: di mana `% m` diletakkan, dan tipe apa yang dipakai (modul `a-xii1-m8`)?
3. `AI: boleh` Untuk soal 3 dengan `n = 10^6`, perkirakan langkah dan memori DP, dan bagaimana menghemat memorinya (modul `a-xi2-m2`).

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `a-xii2-m4` (pertanyaan 1), sekitar tiga minggu lagi di `a-xii2-m6` (pertanyaan 2), dan sekitar delapan minggu lagi di `a-xii2-m11` (pertanyaan 3). Jawab sekarang lalu simpan.

1. Apa empat pertanyaan yang dijawab saat memodelkan soal cerita, dan kapan memilih graf, kapan DP?
2. Mengapa pada soal genteng DP memerlukan dua keadaan, bukan satu?
3. Mengapa model perlu diuji dengan penyelesaian paksa pada ukuran kecil?

## Kesalahan umum

- **Keadaan kurang lengkap.** Pada soal genteng, panjang saja tak cukup; jenis genteng terakhir menentukan pilihan berikutnya.
- **Memilih algoritma dulu, model sesudahnya.** Mulailah dari keadaan dan transisi, baru pilih BFS atau DP.
- **Tidak menguji model pada ukuran kecil.** Kesalahan model baru tampak setelah jawaban besar keliru.
- **Lupa kasus mulai sama dengan tujuan atau tak terjangkau.** Keduanya wajib ada di daftar uji.
- **Menganggap setiap soal cerita adalah graf atau DP.** Sebagian soal selesai dengan urutan atau greedy; model yang paling sederhana yang benar lebih baik.

## Cek mandiri

- [ ] Saya dapat menyebut keadaan, transisi, dan pertanyaan sebuah soal cerita.
- [ ] Saya dapat memutuskan graf atau DP dan menyebut alasannya.
- [ ] Saya dapat mengisi lembar pemodelan sampai kolom uji kecil.
- [ ] Saya dapat menguji model dengan penyelesaian paksa.
- [ ] Saya dapat memperkirakan banyak langkah dari model.

## Kunci dan petunjuk

**Ingat kembali.** 1: penghitung langkah menunjukkan bagian mana yang benar-benar boros; firasat sering menyasar bagian yang salah, sehingga tenaga terbuang dan kode menjadi lebih rumit tanpa manfaat. 2: antrean masuk-pertama-keluar-pertama memproses semua simpul berjarak `d` sebelum yang berjarak `d + 1`, jadi simpul pertama kali ditemukan lewat lapisan terdekatnya. 3: bila ada banyak pembaruan titik bercampur kueri jumlah rentang: Fenwick `O(log n)` untuk keduanya; larik prefiks menjawab kueri dalam satu langkah tetapi tiap pembaruan `O(n)`; bila data tak pernah berubah, larik prefiks cukup dan lebih sederhana.

**Prediksi dulu.** 1: `2 2` (jalur 2 ke 6 ke 10 dan 2 ke 6 ke 3). 2: simpul adalah lantai `1..n`; sisi adalah penekanan tombol, `u -> u + 4` dan `u -> u - 3` bila lantai itu ada.

**Contoh setengah jadi.** Keadaan: `terbaik[i]` = nilai terbaik dari hari `1..i`. Transisi: `terbaik[i] = max(terbaik[i-1], v[i] + terbaik[i-2])`. Pertanyaan: `terbaik[n]`. Alat: DP satu dimensi karena jawaban tiap hari tersusun dari dua hari sebelumnya dan perpindahan hanya maju. Batas: sekitar `n` langkah. Uji kecil: `n = 1` (jawabannya `v[1]`), semua nilai sama, dan bandingkan dengan penyelesaian paksa atas semua himpunan hari.

**Soal Parsons.** Urutan: b, d, e, c, a.

**Latihan.** 1: keadaan: rumah; transisi: jalan setapak dua arah; pertanyaan: banyak komponen terhubung; alat: DFS atau BFS dengan penanda kunjungan, `O(n + m)`. Uji: untuk 6 rumah dengan jalan 1-2, 2-3, dan 4-5, ada 3 kelompok (`{1,2,3}`, `{4,5}`, `{6}`); `m = 0` memberi `n` kelompok. 2: keadaan: nilai bulat `1..N` (nilai di atas `N` tak berguna karena operasi hanya menaikkan); transisi: `x -> 2x` dan `x -> x + 3`; BFS dari 1, `O(N)` langkah. Hitung tangan: dua langkah dari 1 hanya mencapai 4, 5, 7, dan 8, sehingga `N = 10` memerlukan 3 langkah (`1 -> 4 -> 7 -> 10`). Untuk `N = 13`: `1 -> 4 -> 7 -> 10 -> 13`, empat langkah, dan tiga langkah dari 1 tak mencapai 13. Jadi `N = 10` memberi 3, `N = 13` memberi 4, dan `N = 1` memberi 0. 3: keadaan: anak tangga `i`; `cara[i] = cara[i-1] + cara[i-3]` bila tidak rusak, dan 0 bila rusak, dengan `cara[0] = 1`; `O(n)`.

```cpp
#include <iostream>
#include <vector>
using namespace std;

int main() {
  int n;
  int k;
  while (cin >> n >> k) {
    vector<bool> rusak(n + 1, false);
    for (int i = 0; i < k; i++) {
      int r;
      cin >> r;
      rusak[r] = true;
    }
    vector<long long> cara(n + 1, 0);
    cara[0] = 1;
    for (int i = 1; i <= n; i++) {
      if (rusak[i]) {
        continue;
      }
      cara[i] = cara[i - 1];
      if (i >= 3) {
        cara[i] += cara[i - 3];
      }
    }
    cout << cara[n] << "\n";
  }
}
```

Masukan (`masukan.txt`):

```text
10 2
4 7
6 0
3 1
3
```

Keluaran:

```text
4
6
0
```

Untuk `n = 6` tanpa kerusakan ada 6 cara: satu cara dengan semua langkah 1, empat cara dengan satu langkah 3 di antara tiga langkah 1, dan satu cara `33`. Anak tangga 3 rusak dan tujuannya 3, jadi 0. 4:

```cpp
#include <algorithm>
#include <iostream>
#include <vector>
using namespace std;

int main() {
  int n;
  cin >> n;
  vector<int> v(n + 1, 0);
  for (int i = 1; i <= n; i++) {
    cin >> v[i];
  }
  vector<int> terbaik(n + 1, 0);
  for (int i = 1; i <= n; i++) {
    int pakai = v[i] + (i >= 2 ? terbaik[i - 2] : 0);
    terbaik[i] = max(terbaik[i - 1], pakai);
  }
  cout << terbaik[n] << "\n";
}
```

Masukan (`masukan.txt`):

```text
6
4 1 7 3 5 2
```

Keluaran:

```text
16
```

Yang dipilih: hari 1, 3, dan 5 dengan nilai `4 + 7 + 5 = 16`. Penyelesaian paksa atas semua himpunan hari tak berdekatan menghasilkan angka yang sama.

**Latihan bercampur.** 1: bobot berbeda berarti BFS tak lagi menjamin jarak terpendek; pakai Dijkstra. 2: `% m` di tiap penjumlahan pada transisi; `long long` bila hasil antara melewati `int`. 3: sekitar `n` langkah dan `n` angka `long long`, sekitar 8 MB untuk `n = 10^6`; karena `cara[i]` hanya memakai `cara[i-1]` dan `cara[i-3]`, cukup menyimpan tiga nilai terakhir.

## Langkah berikutnya

Modul berikutnya, `a-xii2-m4` (backtracking dan pruning lanjutan), memakai pemodelan keadaan untuk memangkas ruang pencarian. Modul terkait: `matkom-induksi-dan-rekursi-matematis`. Bacaan lanjut: halaman cppreference tentang `std::queue` dan `std::vector`.
