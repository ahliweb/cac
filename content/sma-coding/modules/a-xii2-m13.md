## Untuk siapa modul ini

Modul ini untuk murid kelas XII jalur A (Algoritmik dengan C++), minggu `A-XII2-M13` silabus v1.4.1: proyek akhir, tahap presentasi dan portofolio. Prasyarat: modul `a-xii2-m12` (programmu dan ujinya). Keluaran minggu ini: **presentasi** dan **portofolio**.

Modul ini karangan penyusun dan disetujui pemilik program pada 2026-11-20 (keputusan lewat dialog; catatan tinjauan menjadi tindak lanjut revisi). Butir capaian pembelajaran yang bertaut: `F-BK-a` (proses rekayasa). **Tanpa data orang nyata:** demo dan portofolio hanya memuat data karangan. **Tanpa akun layanan luar:** presentasi dan portofolio dibuat dan disimpan di komputer lab, perangkatmu, atau media lokal; tidak ada yang wajib diunggah ke layanan daring. Pemakaian AI generatif boleh dengan etika dan dicatat.

## Ingat kembali

Jawab dari ingatan dulu, baru cek di kunci. Soal 1 dari `a-xii2-m12`, soal 2 dari `a-xii2-m10`, soal 3 dari `a-xii2-m5`.

1. Mengapa uji ditulis sebelum fiturnya, dan mengapa sengaja membuat satu uji gagal?
2. Mengapa greedy rasio salah pada knapsack `(6, 30)`, `(5, 20)`, `(5, 20)` dengan kapasitas 10?
3. Apa lima isi catatan penyelesaian satu soal?

## Tujuan

Setelah modul ini kamu dapat:

- mendemonstrasikan programmu dalam lima menit: pertanyaan, rancangan, demo, bukti uji, dan satu hal yang akan kamu ubah;
- menyajikan bukti efisiensi berupa angka dari programmu, bukan sekadar klaim;
- menyusun portofolio proyek yang bisa dibuka ulang dan dijalankan orang lain tanpa akun layanan apa pun;
- menerima umpan balik dan menuliskan refleksi proyek (keluaran minggu ini: presentasi dan portofolio).

## Rencana sprint

Hubungkan dengan sprint sebelumnya: bahan presentasi adalah dokumen rancangan (M11) dan hasil uji (M12). Urutan kerja: (1) tulis naskah demo lima menit; (2) kumpulkan angka bukti; (3) latih demo satu kali sambil mengukur waktu; (4) susun portofolio; (5) presentasikan dan catat umpan balik. Kriteria selesai: naskah dan demo selesai dalam lima menit, ada tabel angka, dan portofolio dapat dijalankan dari nol di komputer lain.

**Naskah demo lima menit.** Satu menit pertanyaan dan masukan contoh; satu menit rancangan (struktur data, strategi, alasannya); dua menit demo langsung dari terminal dengan masukan yang sudah disiapkan, termasuk satu masukan salah; satu menit bukti uji dan angka efisiensi. Siapkan cadangan keluaran tertulis. Slide boleh berupa berkas teks lokal.

**Bukti efisiensi dari program.** Pada proyek contoh (Peta Kurir Kampung), program berikut menjalankan Dijkstra pada graf sintetis (rantai dengan jalan pintas) dan menghitung berapa simpul diambil dari antrean dan berapa relaksasi terjadi. Angka ini yang masuk tabel slide.

```cpp
#include <climits>
#include <cmath>
#include <iostream>
#include <queue>
#include <utility>
#include <vector>
using namespace std;

int main() {
  for (int n : {1000, 10000, 100000}) {
    vector<vector<pair<int, int>>> adj(n + 1);
    long long m = 0;
    for (int i = 1; i < n; i++) {
      int w = 1 + i % 5;
      adj[i].push_back({i + 1, w});
      adj[i + 1].push_back({i, w});
      m++;
      if (i + 7 <= n) {
        adj[i].push_back({i + 7, 3});
        adj[i + 7].push_back({i, 3});
        m++;
      }
    }
    vector<long long> d(n + 1, LLONG_MAX);
    priority_queue<pair<long long, int>, vector<pair<long long, int>>, greater<pair<long long, int>>> pq;
    long long diambil = 0;
    long long relaksasi = 0;
    d[1] = 0;
    pq.push({0, 1});
    while (!pq.empty()) {
      auto [dist, u] = pq.top();
      pq.pop();
      diambil++;
      if (dist > d[u]) {
        continue;
      }
      for (auto [v, w] : adj[u]) {
        if (d[u] + w < d[v]) {
          d[v] = d[u] + w;
          relaksasi++;
          pq.push({d[v], v});
        }
      }
    }
    long long batas = (long long)((n + m) * log2((double)n));
    cout << "n=" << n << " jalan=" << m << " diambil=" << diambil << " relaksasi=" << relaksasi << " (n+m)log2n=" << batas << "\n";
  }
}
```

```text
n=1000 jalan=1992 diambil=1010 relaksasi=1009 (n+m)log2n=29817
n=10000 jalan=19992 diambil=10010 relaksasi=10009 (n+m)log2n=398525
n=100000 jalan=199992 diambil=100010 relaksasi=100009 (n+m)log2n=4982759
```

Kerja nyata (`diambil` dan `relaksasi`) sekitar `n` pada graf ini, jauh di bawah batas atas `(n + m) log2 n`. Batas atas menjamin kasus terburuk; graf ini ramah karena jarak bertambah berurutan. Slide menyebut keduanya, tanpa mengklaim angka terukur berlaku untuk semua graf.

**Portofolio tanpa akun.** Satu folder berisi semua yang dibutuhkan untuk menjalankan ulang proyek, dan bisa dikemas menjadi satu arsip:

```text
portofolio-kurir/
portofolio-kurir/README.md
portofolio-kurir/catatan-ai.md
portofolio-kurir/jalankan_uji.sh
portofolio-kurir/laporan.md
portofolio-kurir/rancangan.md
portofolio-kurir/refleksi.md
portofolio-kurir/src/
portofolio-kurir/src/kurir.cpp
portofolio-kurir/uji/
portofolio-kurir/uji/uji1.in
portofolio-kurir/uji/uji1.out
```

`README.md` menyebut pertanyaan proyek, cara mengompilasi (`g++ -std=c++17 -Wall -Wextra`), cara menjalankan uji, dan versi `g++` yang dipakai; `rancangan.md` dan `laporan.md` dari M11 dan M12; `catatan-ai.md` hanya bila memakai AI; `refleksi.md` milikmu sendiri. Arsip disimpan di perangkatmu atau media lokal sekolah. Repositori `git` lokal (`git init` dan `git commit`) boleh dipakai untuk riwayat, tanpa remote dan tanpa akun. Jangan memasukkan data orang lain.

## Daftar periksa

Kerjakan berurutan dan centang bila selesai.

- [ ] Naskah demo lima menit ditulis dan dilatih satu kali.
- [ ] Demo memuat satu masukan salah dan cadangan keluaran tertulis.
- [ ] Slide atau berkas teks memuat tabel angka dari programmu (langkah atau waktu terukur), dengan keterangan data dan batasnya.
- [ ] Portofolio dapat dikompilasi dan diuji dari nol di komputer lain dengan perintah di `README.md`.
- [ ] Portofolio tidak memuat data orang nyata, rahasia, atau tautan ke akun layanan luar yang wajib.
- [ ] Bila memakai AI generatif: `catatan-ai.md` berisi alat, tujuan, bagian yang dipakai, dan cara memeriksa.
- [ ] Umpan balik sejawat dicatat dalam tiga bagian.
- [ ] Refleksi proyek ditulis.

## Umpan balik sejawat

Setelah tiap demo, penonton memberi umpan balik dalam tiga kalimat:

1. **Satu yang sudah baik**, dengan bagian yang kamu tunjuk.
2. **Satu yang perlu diperbaiki**, dengan alasan.
3. **Satu langkah berikutnya** yang bisa dikerjakan.

Penyaji mencatat.

## Latihan bercampur

1. `AI: boleh` Tulis isi `README.md` untuk proyekmu dalam lima baris: pertanyaan, kompilasi, uji, versi alat, dan batas masukan.
2. `AI: tanpa AI` Dari angka `n = 100000` dan `(n + m) log2 n = 4.982.759` pada tabel, berapa kali lebih besar batas atas daripada `relaksasi`, dan mengapa selisih itu tidak boleh dijadikan klaim umum?
3. `AI: boleh` Rancang satu masukan salah untuk demomu yang ditolak dengan pesan jelas.

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `a-xii2-m14` (pertanyaan 1). Pertanyaan 2 dan 3 untuk pengulangan mandiri (tidak ada modul jalur A sesudah `a-xii2-m14`). Jawab sekarang lalu simpan.

1. Apa lima bagian demo lima menit, dan mengapa perlu cadangan keluaran tertulis?
2. Mengapa bukti efisiensi harus menyebut data dan batasnya, bukan hanya angkanya?
3. Apa isi portofolio yang bisa dijalankan ulang tanpa akun layanan luar?

## Kesalahan umum

- **Demo tanpa latihan waktu.** Bagian bukti hilang.
- **Klaim efisiensi tanpa data.** Angka datang dari programmu dengan batasnya.
- **Portofolio yang hanya jalan di komputermu.** Catat versi alat dan perintah.
- **Mewajibkan akun layanan luar.** Portofolio harus terbuka tanpa akun.
- **Memasukkan data orang nyata.** Pakai data karangan.

## Cek mandiri

- [ ] Saya dapat mendemonstrasikan programku dalam lima menit.
- [ ] Saya dapat menunjukkan angka bukti dari programku beserta batasnya.
- [ ] Portofolioku dapat dijalankan dari nol tanpa akun layanan luar.
- [ ] Saya dapat memberi dan mencatat umpan balik dalam tiga bagian.
- [ ] Saya sudah menulis refleksi proyek.

## Kunci dan petunjuk

**Ingat kembali.** 1: uji yang ditulis lebih dulu memaksa keluaran dihitung tanpa terpengaruh program; satu uji sengaja digagalkan membuktikan ujimu menangkap galat. 2: greedy rasio mengambil `(6, 30)` (rasio 5) sehingga `(5, 20)` tak muat dan nilainya 30, padahal dua barang berberat 5 memberi 40. 3: soal dalam satu kalimat; strategi dan alasannya; perkiraan langkah dan batas; uji kecil, termasuk yang mematahkan alternatif; dan kekeliruan yang ditemukan.

**Rencana sprint.** Lima bagian demo: pertanyaan dan masukan, rancangan, demo langsung, bukti uji dan angka, dan satu hal yang akan diubah (total lima menit). Angka tabel contoh berasal dari keluaran program di atas.

**Daftar periksa.** Contoh keterangan angka: "Dijkstra pada graf rantai sintetis `n = 100000`: `relaksasi = 100009`; batas atas teori `(n + m) log2 n = 4.982.759`; berlaku untuk graf ini, bukan semua graf."

**Latihan bercampur.** 1: contoh isi: `Peta Kurir Kampung (karangan)`; `g++ -std=c++17 -Wall -Wextra -o kurir src/kurir.cpp`; `bash jalankan_uji.sh`; `g++ 13.3.0` (versi yang kamu pakai); `n sampai 10^5, bobot positif sampai 10^4`. 2: `4.982.759 / 100.009` sekitar 50 kali; selisih itu khas graf sintetis yang jaraknya bertambah berurutan, sedangkan graf lain dapat memicu relaksasi jauh lebih banyak, sehingga angka terukur tak boleh dianggap berlaku untuk semua graf. 3: contoh `B 1 2 0` (bobot nol), yang ditolak dengan pesan `ditolak: B 1 2 0` dan program lanjut ke perintah berikutnya.

## Langkah berikutnya

Modul berikutnya, `a-xii2-m14`, adalah asesmen dan refleksi semester ini, tanpa AI. Bawa portofolio dan catatan umpan balikmu sebagai bahan refleksi. Bacaan lanjut: halaman cppreference tentang `std::priority_queue` dan `std::vector`.
