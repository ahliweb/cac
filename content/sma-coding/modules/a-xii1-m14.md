## Untuk siapa modul ini

Modul ini untuk murid kelas XII jalur A (Algoritmik dengan C++), minggu `A-XII1-M14` silabus v1.4.1: asesmen dan refleksi semester 1 kelas XII. Prasyarat: modul `a-xii1-m12` dan seluruh modul `a-xii1-m1` sampai `a-xii1-m13`; modul ini menilai graf, pohon, berhitung, aritmetika modular, struktur data, geometri, dan program multi-berkas.

Modul ini karangan penyusun dan disetujui pemilik program pada 2026-11-20 (keputusan lewat dialog; catatan tinjauan menjadi tindak lanjut revisi), dan tidak dihitung sebagai pemenuhan butir capaian pembelajaran. Asesmen ini **tanpa AI**: jangan memakai AI generatif saat mengerjakannya (silabus 7.4), karena tujuannya melihat apa yang bisa kamu selesaikan sendiri. Bobot nilai dan predikat mengikuti kebijakan sekolah `[belum terverifikasi]`; modul ini hanya memberi soal dan kunci latihan. Semua data di soal adalah karangan.

## Ingat kembali

Ini inti asesmen: jawab dari ingatan, tanpa melihat catatan, lalu cocokkan dengan kunci. Soal 1 dari `a-xii1-m13`, soal 2 dari `a-xii1-m11`, soal 3 dari `a-xii1-m6`. Soal 4 dan 5 adalah tambahan penguji bagian struktur data dan graf semester ini.

1. Mengapa rencana ditulis sebelum program, dan apa tujuh bagian rencana proyek?
2. Apa arti tanda hasil perkalian silang `(b - a) x (c - a)`?
3. Mengapa faktorial cepat meluap, dan mengapa `C(n, k)` tidak dihitung dari `n!` penuh?
4. Sebutkan tiga kasus pada kueri rekursif segment tree.
5. Mengapa algoritma Dijkstra tidak boleh dipakai bila ada sisi berbobot negatif?

## Tujuan

Soal di modul ini menilai apakah kamu dapat:

- membaca graf, menelusuri BFS, dan menyebut banyak langkahnya;
- menghitung kombinasi dan pangkat modular dengan hasil antara yang aman;
- menelusuri Fenwick atau segment tree dan memilih di antara keduanya dengan alasan;
- memecah program menjadi pustaka dan program utama, mengompilasinya, dan menguji pustaka itu.

## Latihan bercampur

Kerjakan sendiri, `AI: tanpa AI`, dengan waktu yang ditetapkan gurumu.

1. **Tulis.** Tulis pseudocode lalu program: baca graf tak berarah `n m` dan `m` sisi, hitung jarak BFS dari simpul 1, dan cetak simpul terjauh beserta jaraknya (bila seri, pilih nomor terkecil).
2. **Telusuri.** Program berikut dijalankan. Apa yang tercetak, dan apa arti baris kedua bagi Fenwick?

   ```cpp
#include <iostream>
   using namespace std;
   
   int main() {
     long long P = 13;
     long long f = 1;
     for (int i = 1; i <= 6; i++) {
       f = f * i % P;
       cout << f << " ";
     }
     cout << "\n";
     for (int i = 12; i > 0; i -= i & -i) {
       cout << i << " ";
     }
     cout << "\n";
   }
   ```

3. **Cari galat.** Tiga potongan berikut sengaja salah. Untuk tiap potongan tulis galatnya, akibatnya, dan perbaikannya.

   ```cpp setengah-jadi
   (a) int a, b, m;  cin >> a >> b >> m;  int hasil = a * b % m;   // a, b sampai 10^9
   (b) // alat.h tanpa penjaga dan tanpa inline, disertakan oleh dua berkas .cpp
       int kuadrat(int x) { return x * x; }
   (c) for (int i = 0; i <= n; i++) tambah(i, nilai[i]);   // Fenwick
   ```

4. **Praktik.** Bagi programmu dari nomor 1 menjadi `graf.h`, `graf.cpp`, dan `main.cpp`, kompilasi dengan `g++ -std=c++17 -Wall -Wextra -c`, tautkan, dan jalankan dengan masukan dari berkas. Tulis dua uji yang kamu pilih, satu di antaranya graf dengan satu simpul, beserta hasil yang kamu prediksi.
5. **Strategi.** (a) Pohon berakar punya `n` simpul: berapa sisinya, dan mengapa BFS dari akar memberi kedalaman tiap simpul? (b) Hitung `C(5, 2)` dengan segitiga Pascal. (c) Kueri maksimum rentang dengan pembaruan titik pada `n = 10^5` data: pilih Fenwick atau segment tree, dengan perkiraan langkah tiap operasi.

## Refleksi

Tulis jawabanmu di jurnalmu sendiri. Jurnal ini tidak dikumpulkan ke repositori dan tidak ada jawaban benar atau salah; yang dinilai adalah kejujuran dan rencanamu.

1. Apa dua hal yang sekarang sudah kamu kuasai? Tulis buktinya (soal mana yang kamu jawab tanpa ragu).
2. Apa satu hal yang masih keliru atau membingungkan? Soal mana yang memperlihatkannya?
3. Apa yang akan kamu lakukan berbeda semester depan, dan kapan kamu akan mengulang bagian yang lemah?
4. Dari graf, struktur data, dan program multi-berkas, bagian mana yang paling ingin kamu pakai di proyek akhir, dan mengapa?

Mengulang bagian yang lemah dengan mencoba mengingat lebih dulu, lalu menjarakkan waktunya, membantu ingatan jangka panjang lebih baik daripada membaca ulang catatan.

## Cek mandiri

- [ ] Saya dapat menelusuri BFS dan menyebut jarak terpendek pada graf tak berbobot.
- [ ] Saya dapat menghitung pangkat dan invers modular dengan tipe yang aman.
- [ ] Saya dapat menelusuri Fenwick dan memilihnya atau segment tree dengan alasan.
- [ ] Saya dapat membagi program menjadi pustaka dan program utama dan menguji pustakanya.
- [ ] Saya dapat membedakan galat kompilasi dan galat penautan.

## Kunci dan petunjuk

**Ingat kembali.** 1: rencana memaksa kamu menjelaskan tujuan sebelum menulis kode dan memberi prediksi yang bisa dibandingkan; tujuh bagian: tujuan, masukan, aturan, keluaran, kriteria selesai, daftar uji, prediksi hasil. 2: positif berarti belok berlawanan arah jarum jam, negatif searah jarum jam, nol segaris. 3: faktorial mengalikan bilangan yang terus membesar, sehingga `21!` sudah melampaui `long long`; `C(n, k)` dihitung dengan perkalian dan pembagian bertahap agar hasil antara tetap kecil. 4: rentang simpul di luar kueri (kembalikan nilai netral), di dalam penuh (kembalikan nilai simpul), dan sebagian (gabungkan hasil kedua anak). 5: Dijkstra mengandaikan bahwa begitu simpul diambil jaraknya sudah final; sisi negatif dapat memperpendek jarak simpul yang sudah final.

**Latihan bercampur.** 1: pseudocode: baca graf ke daftar ketetanggaan; `jarak[1] = 0`; antrian berisi 1; selama antrian tak kosong ambil `u`, untuk tiap tetangga `v` dengan `jarak[v] = -1` isi `jarak[u] + 1` dan masukkan; lalu pilih simpul dengan jarak terbesar. Program contoh:

```cpp
#include <iostream>
#include <queue>
#include <vector>
using namespace std;

int main() {
  int n;
  int m;
  cin >> n >> m;
  vector<vector<int>> adj(n + 1);
  for (int k = 0; k < m; k++) {
    int u;
    int v;
    cin >> u >> v;
    adj[u].push_back(v);
    adj[v].push_back(u);
  }
  vector<int> jarak(n + 1, -1);
  queue<int> q;
  jarak[1] = 0;
  q.push(1);
  while (!q.empty()) {
    int u = q.front();
    q.pop();
    for (int v : adj[u]) {
      if (jarak[v] == -1) {
        jarak[v] = jarak[u] + 1;
        q.push(v);
      }
    }
  }
  int terjauh = 1;
  for (int i = 2; i <= n; i++) {
    if (jarak[i] > jarak[terjauh]) {
      terjauh = i;
    }
  }
  cout << "terjauh: " << terjauh << " (jarak " << jarak[terjauh] << ")\n";
}
```

Masukan (`masukan.txt`):

```text
5 4
1 2
2 3
3 4
1 5
```

Keluaran:

```text
terjauh: 4 (jarak 3)
```

Simpul 4 berjarak 3 (`1-2-3-4`); simpul 5 hanya berjarak 1. BFS memproses tiap simpul dan sisi sekali, `O(n + m)`. 2: keluaran program:

```text
1 2 6 11 3 5 
12 8 
```

Baris pertama adalah `i! mod 13` untuk `i = 1` sampai 6 (`6! = 720 = 55 * 13 + 5`). Baris kedua menunjukkan blok yang dijumlah `jumlahPrefiks(12)`: `tree[12]` (empat elemen, 9 sampai 12) lalu `tree[8]` (delapan elemen, 1 sampai 8), sehingga dua langkah. 3: (a) `a * b` dihitung dalam `int` dan meluap sebelum `% m`; perbaikan: baca sebagai `long long`. (b) fungsi didefinisikan di header yang dibaca dua berkas sehingga muncul `multiple definition` saat penautan; perbaikan: taruh deklarasi di header dan definisi di `.cpp` (atau `inline`). (c) `i = 0` membuat `i & -i = 0` sehingga `tambah` tak pernah maju dan perulangan tak berakhir; perbaikan: mulai dari `i = 1`. 4: contoh uji: graf satu simpul (`1 0`) dengan prediksi `terjauh: 1 (jarak 0)`; masukan di atas dengan prediksi seperti keluaran kunci. Bila `g++` memberi peringatan, baca dan perbaiki. 5: (a) `n - 1` sisi; BFS dari akar memberi jarak (jumlah sisi) tiap simpul ke akar, yaitu kedalamannya, karena ada tepat satu jalur. (b) baris `1 4 6 4 1` menghasilkan baris berikutnya `1 5 10 10 5 1`, sehingga `C(5, 2) = 10`. (c) segment tree untuk maksimum, karena Fenwick untuk jumlah tak punya pengurangan yang berlaku untuk maksimum; tiap operasi sekitar `log2 10^5`, yaitu kira-kira 17 tingkat (dan beberapa kali itu simpul yang dikunjungi).

**Rubrik singkat.** Untuk soal 1 dan 4, periksa empat hal: ketepatan (program memenuhi tujuan), keterbacaan (nama dan fungsi jelas), pengujian (disebut cara mengujinya, termasuk nilai batas), dan justifikasi (alasan pilihan). Skala yang disarankan: sudah, sebagian, belum, per hal. Untuk soal 2, 3, dan 5, jawaban dinilai benar bila angka dan alasan sama dengan kunci atau setara.

**Refleksi.** Tidak ada kunci. Jawaban yang baik menyebut bukti, bagian yang lemah, dan rencana yang jelas waktunya.

## Langkah berikutnya

Kelas XII semester 2 jalur A dimulai dengan `a-xii2-m1` (pemeliharaan program I), yang memakai pustaka dan pengujian dari minggu ini. Jadikan hasil refleksi tadi rencana belajarmu sebelum minggu pertama. Modul terkait: `matkom-pertumbuhan-fungsi` untuk memperdalam perbandingan pertumbuhan langkah. Bacaan lanjut: halaman cppreference tentang `std::queue` dan `std::vector`.
