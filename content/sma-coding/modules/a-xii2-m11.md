## Untuk siapa modul ini

Modul ini untuk murid kelas XII jalur A (Algoritmik dengan C++), minggu `A-XII2-M11` silabus v1.4.1: proyek akhir, tahap rancangan. Prasyarat: modul `a-xii2-m10`. Dikerjakan mandiri atau berkelompok. Keluaran minggu ini: **dokumen rancangan**.

Modul ini berstatus DRAF: karangan penyusun, belum ditinjau pemilik. Butir capaian pembelajaran yang bertaut: `F-BK-a` (proses rekayasa). **Tanpa data orang nyata:** semua data proyek buatanmu sendiri (sintetis); nama lokasi, barang, atau tokoh memakai nama karangan, bukan orang atau tempat nyata. Pemakaian AI generatif boleh dengan etika dan dicatat.

## Ingat kembali

Jawab dari ingatan dulu, baru cek di kunci. Soal 1 dari `a-xii2-m10`, soal 2 dari `a-xii2-m8`, soal 3 dari `a-xii2-m3`.

1. Apa tiga pertanyaan pada tabel pemilihan strategi, dan dalam urutan apa diajukan?
2. Mengapa uji pembanding yang tak menemukan beda belum membuktikan solusi B benar?
3. Mengapa model perlu diuji dengan penyelesaian paksa pada ukuran kecil?

## Tujuan

Setelah modul ini kamu dapat:

- memilih topik yang bisa selesai dalam dua minggu dan menuliskannya sebagai pertanyaan yang dijawab program;
- menulis dokumen rancangan: spesifikasi, pilihan struktur data dan strategi beserta alasan efisiensinya, pembagian berkas, rencana uji, dan jadwal;
- menguji kelayakan gagasan lewat prototipe kecil sebelum menulis seluruh program;
- memberi dan menerima umpan balik sejawat yang spesifik (keluaran minggu ini: dokumen rancangan).

## Rencana proyek

Tulis rencana satu sampai dua halaman **sebelum** menyentuh kode, lalu **prediksi hasil** pada contoh masukan. Bagian yang diminta tercantum pada tabel berikut. Kriteria selesai harus bisa diperiksa, bukan "program bagus".

**Contoh rencana terselesaikan: Peta Kurir Kampung (karangan).** Sebuah kurir karangan memetakan `n` lokasi bernomor dan `m` jalan berbobot (waktu tempuh dalam menit). Program menjawab tiga perintah: `D a b` (jarak terpendek), `B a b w` (bangun jalan baru), dan `K` (banyak kelompok lokasi yang saling terhubung).

| Bagian rancangan | Isi contoh |
| --- | --- |
| Tujuan | Menjawab "berapa menit tercepat dari lokasi `a` ke `b`" dan "berapa kelompok lokasi terpisah" sambil jalan baru bisa ditambahkan. |
| Masukan | `n m`, lalu `m` baris `u v w`, lalu `q`, lalu `q` perintah. Data karangan, `1 <= n <= 10^5`, `w` bilangan bulat positif sampai `10^4`. |
| Keluaran | Satu baris per perintah. Jarak `-1` ditulis "tidak terhubung". Perintah tak dikenal atau lokasi di luar rentang ditolak dan dihitung. |
| Struktur dan strategi | Daftar ketetanggaan; Dijkstra dengan `priority_queue` (modul `a-xii1-m2`) untuk `D`; himpunan saling lepas (modul `a-xii1-m4`) untuk `K`. |
| Alasan efisiensi | Bobot positif, jadi Dijkstra benar; `O((n + m) log n)` per kueri `D`. Greedy BFS salah untuk bobot berbeda; pencarian lengkap `n!` jalur tak layak. |
| Pembagian berkas | `graf.h` dan `graf.cpp` (struktur dan Dijkstra), `kelompok.h` dan `kelompok.cpp` (himpunan saling lepas), `main.cpp` (membaca perintah), `Makefile`. |
| Rencana uji | Contoh di bawah; `n = 1`; dua lokasi tak terhubung; dua jalan sejajar dengan bobot berbeda; perintah salah. |
| Risiko | Luapan `int` pada jarak; lupa mengosongkan struktur antar-kueri; kueri `D` berulang pada `q` besar. |
| Jadwal | M12: pustaka, program utama, uji. M13: demo, presentasi, portofolio. |

**Prediksi hasil.** Pada graf contoh di bawah, jarak 1 ke 4 lewat `1-3-2-4` adalah `1 + 2 + 5 = 8` (alternatif lain 9), lokasi 1 ke 6 tak terhubung, ada 2 kelompok, dan jarak ke diri sendiri 0.

**Prototipe.** Tulis dulu bagian paling berisiko saja (Dijkstra dan himpunan saling lepas) dan jalankan pada contoh. Prototipe ini belum memeriksa masukan salah dan belum punya perintah `B`.

```cpp
#include <climits>
#include <iostream>
#include <queue>
#include <string>
#include <utility>
#include <vector>
using namespace std;

int n;
vector<vector<pair<int, int>>> adj;
vector<int> wakil;

int cari(int x) {
  while (wakil[x] != x) {
    wakil[x] = wakil[wakil[x]];
    x = wakil[x];
  }
  return x;
}

long long jarak(int dari, int ke) {
  vector<long long> d(n + 1, LLONG_MAX);
  priority_queue<pair<long long, int>, vector<pair<long long, int>>, greater<pair<long long, int>>> pq;
  d[dari] = 0;
  pq.push({0, dari});
  while (!pq.empty()) {
    auto [dist, u] = pq.top();
    pq.pop();
    if (dist > d[u]) {
      continue;
    }
    for (auto [v, w] : adj[u]) {
      if (d[u] + w < d[v]) {
        d[v] = d[u] + w;
        pq.push({d[v], v});
      }
    }
  }
  return d[ke] == LLONG_MAX ? -1 : d[ke];
}

int main() {
  int m;
  cin >> n >> m;
  adj.assign(n + 1, {});
  wakil.resize(n + 1);
  for (int i = 1; i <= n; i++) {
    wakil[i] = i;
  }
  for (int k = 0; k < m; k++) {
    int u;
    int v;
    int w;
    cin >> u >> v >> w;
    adj[u].push_back({v, w});
    adj[v].push_back({u, w});
    wakil[cari(u)] = cari(v);
  }
  int q;
  cin >> q;
  for (int k = 0; k < q; k++) {
    string perintah;
    cin >> perintah;
    if (perintah == "D") {
      int a;
      int b;
      cin >> a >> b;
      long long j = jarak(a, b);
      if (j < 0) {
        cout << "jarak " << a << " -> " << b << ": tidak terhubung\n";
      } else {
        cout << "jarak " << a << " -> " << b << " = " << j << "\n";
      }
    } else {
      int kelompok = 0;
      for (int i = 1; i <= n; i++) {
        if (cari(i) == i) {
          kelompok++;
        }
      }
      cout << "kelompok: " << kelompok << "\n";
    }
  }
}
```

Masukan (`masukan.txt`):

```text
6 6
1 2 4
1 3 1
3 2 2
2 4 5
3 4 8
5 6 3
4
D 1 4
D 1 6
K
D 2 2
```

Keluaran:

```text
jarak 1 -> 4 = 8
jarak 1 -> 6: tidak terhubung
kelompok: 2
jarak 2 -> 2 = 0
```

Cocokkan dengan prediksi: keempat baris sama. Perkiraan langkah: tiap `D` memakai `O((n + m) log n)`; untuk `n = m = 10^5` itu sekitar `2 * 10^5 * 17`, kurang dari empat juta langkah tiap kueri `D`. Untuk `q = 10^3` kueri `D`, totalnya sekitar `4 * 10^9` langkah, di atas pedoman seratus juta langkah per detik; ini dicatat sebagai risiko dan alasan membatasi `q`.

**Topik pilihanmu** (pilih satu, atau usulkan ke gurumu; data karangan): (1) *Peta kurir* dengan perintah tambahan buatanmu. (2) *Rekap stok toko:* jumlah, minimum, dan koreksi lewat Fenwick dan segment tree (modul `a-xii1-m9` dan `a-xii1-m10`). (3) *Paket bekal:* knapsack dengan greedy, DP, dan pencarian lengkap dibandingkan (modul `a-xii2-m10`). (4) *Pustaka geometri* poligon (modul `a-xii1-m11`). (5) *Teka-teki kecil* dengan backtracking dan pemangkasan (modul `a-xii2-m4`). Tulis dokumen rancanganmu sendiri.

## Daftar periksa

Kerjakan berurutan dan centang bila selesai.

- [ ] Topik dituliskan sebagai pertanyaan yang dijawab program.
- [ ] Spesifikasi memuat masukan, keluaran, dan batasan angka.
- [ ] Tabel pemilihan struktur data dan strategi memuat alasan efisiensi.
- [ ] Prediksi hasil pada contoh ditulis sebelum prototipe dijalankan.
- [ ] Prototipe bagian paling berisiko dikompilasi dengan `g++ -std=c++17 -Wall -Wextra` tanpa peringatan.
- [ ] Rencana uji memuat paling sedikit lima kasus, termasuk ukuran terkecil dan masukan salah.
- [ ] Data sintetis; tidak ada nama, data, atau tempat orang nyata.
- [ ] Bila memakai AI generatif: catatan pemakaian AI (alat, tujuan, bagian yang dipakai, cara memeriksa); tidak ada data pribadi pada perintah.
- [ ] Jadwal M12 dan M13 ditulis.

## Umpan balik sejawat

Tukar dokumen rancangan dengan satu kelompok lain. Beri umpan balik tentang dokumen dalam tiga kalimat:

1. **Satu yang sudah baik**, dengan bagian yang kamu tunjuk.
2. **Satu yang perlu diperbaiki**, dengan alasan.
3. **Satu langkah berikutnya** yang bisa dikerjakan minggu depan.

Terima umpan balik dengan mencatat.

## Latihan bercampur

1. `AI: boleh` Tulis tiga kriteria selesai yang dapat diperiksa untuk rancangan contoh.
2. `AI: tanpa AI` Mengapa `D` pada contoh memakai Dijkstra, bukan BFS, dan apa yang berubah bila ada jalan berbobot negatif (modul `a-xii1-m2`)?
3. `AI: boleh` Perkirakan langkah dan memori Fenwick untuk topik (2) dengan `n = 10^5` (modul `a-xii1-m9`).

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `a-xii2-m12` (pertanyaan 1), sekitar tiga minggu lagi di `a-xii2-m14` (pertanyaan 2), dan pertanyaan 3 untuk pengulangan mandiri (tidak ada modul jalur A sesudah `a-xii2-m14`). Jawab sekarang lalu simpan.

1. Apa saja bagian dokumen rancangan proyek, dan mengapa ada prediksi hasil sebelum program ditulis?
2. Mengapa prototipe bagian paling berisiko ditulis lebih dulu?
3. Mengapa spesifikasi memuat batasan angka seperti `1 <= n <= 10^5`?

## Kesalahan umum

- **Memilih topik yang terlalu besar.** Dua minggu cukup untuk satu pertanyaan jelas.
- **Memilih struktur data tanpa alasan.** Sebut operasi yang dilayani dan banyak langkahnya.
- **Spesifikasi tanpa batasan angka.** Tanpa batas, pilihan tak dapat dinilai.
- **Menunda pengujian ke akhir.** Rencana uji ditulis sekarang.
- **Memakai nama orang nyata pada contoh.** Pakai data karangan.

## Cek mandiri

- [ ] Saya dapat menyebut pertanyaan yang dijawab proyekku.
- [ ] Saya menulis spesifikasi dengan batasan angka.
- [ ] Saya memilih struktur data dan strategi dengan alasan efisiensi.
- [ ] Saya menulis prediksi dan menguji kelayakan dengan prototipe.
- [ ] Saya dapat memberi umpan balik dalam tiga bagian.

## Kunci dan petunjuk

**Ingat kembali.** 1: ada pilihan lokal terbukti aman (greedy)? submasalah bertumpang-tindih dengan keadaan kecil (DP)? `n` cukup kecil untuk `2^n` (pencarian lengkap)? diajukan berurutan dari yang paling murah. 2: uji hanya mencoba sebagian masukan; cacat bisa tinggal pada masukan yang belum dicoba, sehingga uji menambah keyakinan tanpa membuktikan. 3: model bisa tampak masuk akal tetapi keliru; penyelesaian paksa mencoba semua kemungkinan pada ukuran kecil sehingga jawabannya pasti benar, dan bila keduanya sama, kepercayaan pada model naik sebelum dipakai untuk ukuran besar (misalnya DP genteng cocok pada panjang kecil).

**Rencana proyek.** Rancangan yang baik menyebut kriteria selesai yang dapat diperiksa dan prediksi yang dapat dibandingkan dengan keluaran. Prototipe di atas menghasilkan `8`, tidak terhubung, `2`, dan `0`, sama dengan prediksi. Dijkstra benar karena semua bobot positif; BFS menghitung jumlah jalan, bukan menit.

**Daftar periksa.** Contoh kasus uji untuk rancangan: `n = 1` tanpa jalan dan `D 1 1` mencetak 0; dua lokasi tanpa jalan dan `D 1 2` mencetak "tidak terhubung"; dua jalan sejajar `1-2` bobot 5 dan 3 memberi jarak 3; perintah `X 1 2` ditolak.

**Latihan bercampur.** 1: contoh kriteria: "tiap perintah `D` sah dijawab dalam `O((n + m) log n)`", "perintah salah ditolak tanpa merusak graf", "lima uji pada rencana lulus". 2: BFS mengasumsikan semua jalan berbobot sama; pada bobot berbeda, jalur dengan jalan terbanyak bisa lebih cepat. Bila ada bobot negatif, Dijkstra tak boleh dipakai karena jarak simpul yang sudah final bisa diperpendek. 3: Fenwick memakai larik `n + 1` bilangan `long long`, sekitar 0,8 megabita untuk `n = 10^5`; tiap operasi sekitar `log2 10^5`, yaitu kira-kira 17 langkah.

## Langkah berikutnya

Modul berikutnya, `a-xii2-m12`, adalah implementasi dan pengujian: mengubah rancangan menjadi program dan menjalankan uji. Bawa dokumen rancangan dan umpan balik sejawat. Bacaan lanjut: halaman cppreference tentang `std::priority_queue` dan `std::vector`.
