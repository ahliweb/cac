## Untuk siapa modul ini

Modul ini untuk murid kelas XII jalur A (Algoritmik dengan C++), minggu `A-XII2-M12` silabus v1.4.1: proyek akhir, tahap implementasi dan pengujian. Prasyarat: modul `a-xii2-m11` (dokumen rancanganmu). Keluaran minggu ini: **program dan uji**.

Modul ini berstatus DRAF: karangan penyusun, belum ditinjau pemilik. Butir capaian pembelajaran yang bertaut: `F-BK-a` (proses rekayasa). **Tanpa data orang nyata:** data pengujianmu buatanmu sendiri. Pemakaian AI generatif boleh dengan etika dan dicatat; kode buatan AI kamu baca, jalankan, dan uji seperti kode sejawat.

## Ingat kembali

Jawab dari ingatan dulu, baru cek di kunci. Soal 1 dari `a-xii2-m11`, soal 2 dari `a-xii2-m9`, soal 3 dari `a-xii2-m4`.

1. Apa saja bagian dokumen rancangan proyek, dan mengapa ada prediksi hasil sebelum program ditulis?
2. Mengapa `m[x]` pada `map` bisa menambah kunci, dan kapan itu masalah?
3. Mengapa urutan pilihan memengaruhi banyak simpul yang dikunjungi tetapi tidak jawabannya?

## Tujuan

Setelah modul ini kamu dapat:

- mengubah dokumen rancangan menjadi program yang dikompilasi tanpa peringatan;
- menulis rencana uji sebagai berkas masukan dan keluaran yang diharapkan, dan menjalankannya ulang dengan satu perintah;
- membaca hasil uji yang gagal dan menemukan galatnya;
- mencatat banyak langkah dan batas masukan program (keluaran minggu ini: program dan uji).

## Rencana sprint

Sprint ini satu minggu. Hubungkan dengan rancangan M11: tiap baris rencana uji di sana menjadi satu berkas uji. Urutannya: (1) tulis uji **sebelum** fiturnya selesai, dengan keluaran yang kamu hitung dengan tangan; (2) tulis fitur sampai uji lulus; (3) tambahkan masukan salah; (4) rapikan dan catat langkah. Kriteria selesai: semua uji pada rencana lulus dan program tidak memberi peringatan kompilator.

**Contoh: Peta Kurir Kampung (lanjutan dari M11).** Program lengkapnya di bawah. Di proyekmu sendiri, bagi kode menjadi `graf.h`, `graf.cpp`, `kelompok.h`, `kelompok.cpp`, dan `main.cpp` seperti modul `a-xii1-m12`; satu berkas dipakai di sini hanya agar bisa dikompilasi sendirian. Dibanding prototipe M11, program ini membaca perintah per baris, menolak perintah yang salah (lokasi di luar rentang, bobot tak positif, argumen kurang), dan menambah perintah `B`.

```cpp
#include <climits>
#include <iostream>
#include <queue>
#include <sstream>
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

void satukan(int a, int b) {
  wakil[cari(a)] = cari(b);
}

void tambahJalan(int u, int v, int w) {
  adj[u].push_back({v, w});
  adj[v].push_back({u, w});
  satukan(u, v);
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

bool lokasiSah(int x) {
  return x >= 1 && x <= n;
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
    tambahJalan(u, v, w);
  }
  int q;
  cin >> q;
  string baris;
  getline(cin, baris);
  int ditolak = 0;
  for (int k = 0; k < q; k++) {
    getline(cin, baris);
    istringstream in(baris);
    string perintah;
    in >> perintah;
    int a = 0;
    int b = 0;
    int w = 0;
    bool sah = false;
    if (perintah == "D") {
      sah = static_cast<bool>(in >> a >> b) && lokasiSah(a) && lokasiSah(b);
      if (sah) {
        long long j = jarak(a, b);
        if (j < 0) {
          cout << "jarak " << a << " -> " << b << ": tidak terhubung\n";
        } else {
          cout << "jarak " << a << " -> " << b << " = " << j << "\n";
        }
      }
    } else if (perintah == "B") {
      sah = static_cast<bool>(in >> a >> b >> w) && lokasiSah(a) && lokasiSah(b) && w > 0;
      if (sah) {
        tambahJalan(a, b, w);
        cout << "jalan " << a << " - " << b << " (" << w << ") ditambahkan\n";
      }
    } else if (perintah == "K") {
      sah = true;
      int kelompok = 0;
      for (int i = 1; i <= n; i++) {
        if (cari(i) == i) {
          kelompok++;
        }
      }
      cout << "kelompok: " << kelompok << "\n";
    }
    if (!sah) {
      ditolak++;
      cout << "ditolak: " << baris << "\n";
    }
  }
  cout << ditolak << " perintah ditolak\n";
}
```

Masukan contoh (`uji/uji1.in`):

```text
6 6
1 2 4
1 3 1
3 2 2
2 4 5
3 4 8
5 6 3
7
D 1 4
D 1 6
K
D 2 2
B 4 5 1
D 1 6
K
```

Keluaran:

```text
jarak 1 -> 4 = 8
jarak 1 -> 6: tidak terhubung
kelompok: 2
jarak 2 -> 2 = 0
jalan 4 - 5 (1) ditambahkan
jarak 1 -> 6 = 12
kelompok: 1
0 perintah ditolak
```

Prediksi M11 ditambah perintah `B`: jarak 1 ke 6 sesudah jalan baru `4 - 5` bernilai `8 + 1 + 3 = 12`, dan kelompok menjadi 1. Perkiraan langkah: tiap `D` `O((n + m) log n)`, `B` hampir `O(1)`, `K` `O(n)`; untuk `n = 10^5` itu kurang dari empat juta langkah per `D`, jadi laporan menyatakan batas `D` sekitar 25 kueri per detik pada ukuran itu bila ingin tetap dalam pedoman seratus juta langkah per detik.

**Rencana uji sebagai berkas.** Tiap kasus punya `uji/ujiN.in` dan `uji/ujiN.out`. Kompilasi dan jalankan semuanya dengan satu skrip:

```bash
#!/bin/bash
# pemakaian: bash jalankan_uji.sh [./program]
program=${1:-./kurir}
gagal=0
for masukan in uji/uji*.in; do
  nama=$(basename "$masukan" .in)
  if $program < "$masukan" | diff -q - "uji/$nama.out" > /dev/null; then
    echo "LULUS $nama"
  else
    echo "GAGAL $nama"
    gagal=1
  fi
done
exit $gagal
```

```text
LULUS uji1
LULUS uji2
LULUS uji3
LULUS uji4
LULUS uji5
```

Lima uji: contoh biasa (`uji1`), ukuran terkecil `n = 1` (`uji2`), dua lokasi tanpa jalan (`uji3`), dua jalan sejajar berbobot berbeda (`uji4`), dan masukan salah (`uji5`). **Uji yang gagal itu berguna.** Bila satu baris diubah sehingga `tambahJalan` lupa memanggil `satukan(u, v)`, hasilnya:

```text
GAGAL uji1
LULUS uji2
LULUS uji3
LULUS uji4
LULUS uji5
```

`uji1` gagal karena `K` sesudah jalan baru mencetak 2, bukan 1; uji lain tidak menangkapnya. Itu alasan memadukan beberapa kasus, termasuk perintah `B` diikuti `K`.

## Daftar periksa

Kerjakan berurutan dan centang bila selesai.

- [ ] Uji ditulis sebelum fitur, dengan keluaran hasil hitung tangan.
- [ ] Program dikompilasi dengan `g++ -std=c++17 -Wall -Wextra` tanpa peringatan.
- [ ] Semua uji pada rencana lulus lewat satu skrip yang bisa dijalankan ulang oleh temanmu.
- [ ] Ada paling sedikit lima uji: contoh biasa, ukuran terkecil, masukan salah, nilai batas, dan satu ujimu sendiri.
- [ ] Satu uji sengaja digagalkan untuk memastikan ujimu benar-benar menangkap galat.
- [ ] Data sintetis; tidak ada data atau nama orang nyata.
- [ ] Banyak langkah program dan batas masukannya dicatat.
- [ ] Bila memakai AI generatif: catatan pemakaian AI; kode buatan AI dibaca, dijalankan, dan diuji.

## Umpan balik sejawat

Tukar program, uji, dan catatan dengan satu kelompok lain, lalu jalankan skrip ujinya. Beri umpan balik dalam tiga kalimat:

1. **Satu yang sudah baik**, dengan bagian yang kamu tunjuk.
2. **Satu yang perlu diperbaiki**, dengan alasan.
3. **Satu langkah berikutnya** untuk minggu depan.

Terima umpan balik dengan mencatat.

## Latihan bercampur

1. `AI: boleh` Tambahkan uji keenam untuk perintah `B` dengan bobot `0` dan tuliskan keluaran yang diharapkan.
2. `AI: tanpa AI` Mengapa `d` pada `jarak` bertipe `long long`, padahal tiap bobot paling besar `10^4` (modul `a-xii1-m8`)?
3. `AI: boleh` Mengapa `getline` diperlukan sesudah `cin >> q`?

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `a-xii2-m13` (pertanyaan 1). Pertanyaan 2 dan 3 untuk pengulangan mandiri (tidak ada modul jalur A yang menanyakannya lagi; `a-xii2-m14` adalah modul terakhir). Jawab sekarang lalu simpan.

1. Mengapa uji ditulis sebelum fiturnya, dan mengapa sengaja membuat satu uji gagal?
2. Mengapa kasus uji yang semuanya lulus tidak membuktikan program benar?
3. Apa yang dicatat laporan proyek tentang banyak langkah dan batas masukan?

## Kesalahan umum

- **Menulis uji hanya dari keluaran program.** Hitung keluaran dengan tangan lebih dulu.
- **Hanya menguji contoh dari rencana.** Cacat tinggal di ukuran terkecil dan masukan salah.
- **Mengabaikan peringatan kompilator.** Peringatan sering menunjuk galat sungguhan.
- **Tidak mengosongkan keadaan antar-kueri.** Hasil kueri lama bocor ke kueri baru.

## Cek mandiri

- [ ] Saya dapat menulis uji sebagai berkas masukan dan keluaran.
- [ ] Saya dapat menjalankan semua uji dengan satu perintah.
- [ ] Saya dapat membaca uji yang gagal dan mencari galatnya.
- [ ] Saya dapat menyebut banyak langkah dan batas masukan programku.
- [ ] Saya dapat memberi umpan balik dalam tiga bagian.

## Kunci dan petunjuk

**Ingat kembali.** 1: tujuan, spesifikasi (masukan, keluaran, batasan), pilihan struktur data dan strategi dengan alasan, pembagian berkas, rencana uji, risiko, dan jadwal; prediksi memberi hasil yang dapat dibandingkan dengan keluaran program. 2: `m[x]` membuat pasangan `x` dengan nilai awal bila belum ada, sehingga hanya mengecek pun mengubah isi dan ukuran `map`; itu masalah bila ukuran dipakai sebagai jawaban. 3: urutan pilihan menentukan seberapa cepat pangkasan terpicu sehingga banyak simpul berubah, tetapi pangkasan hanya membuang cabang yang pasti gagal, jadi jawabannya tetap sama.

**Rencana sprint.** Program contoh dijalankan dengan masukan di atas dan keluarannya sama dengan perhitungan tangan. Batas `q` bagi `D`: pedoman seratus juta langkah per detik dibagi sekitar empat juta langkah per kueri adalah sekitar 25 kueri `D` per detik.

**Daftar periksa.** Contoh uji keenam: `B 1 2 0` ditolak dan `ditolak: B 1 2 0` tercetak karena bobot harus positif.

**Latihan bercampur.** 1: masukan `2 0 / 1 / B 1 2 0` dengan keluaran `ditolak: B 1 2 0` lalu `1 perintah ditolak`. 2: jarak adalah jumlah bobot sepanjang jalur; jalur terpanjang dengan `10^5` jalan berbobot `10^4` mencapai `10^9`, mendekati batas `int` (sekitar `2,1 * 10^9`); penanda "belum terjangkau" `LLONG_MAX` juga hanya muat di `long long`, dan menjumlahkannya dengan bobot pada `int` akan meluap. 3: `cin >> q` berhenti sebelum karakter baris baru; `getline` pertama akan membaca sisa baris kosong itu, sehingga satu `getline` pembuang diperlukan sebelum membaca perintah per baris.

## Langkah berikutnya

Modul berikutnya, `a-xii2-m13`, adalah presentasi dan portofolio: mendemonstrasikan program dan mengarsipkan karyamu. Bawa program, skrip uji, dan catatan langkahmu. Bacaan lanjut: halaman cppreference tentang `std::priority_queue` dan `std::vector`.
