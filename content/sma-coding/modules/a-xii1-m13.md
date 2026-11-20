## Untuk siapa modul ini

Modul ini untuk murid kelas XII jalur A (Algoritmik dengan C++), minggu `A-XII1-M13` silabus v1.4.1: proyek. Prasyarat: modul `a-xii1-m12` dan modul struktur data sebelumnya (`a-xii1-m9`, `a-xii1-m10`). Dikerjakan berkelompok atau mandiri.

Modul ini karangan penyusun dan disetujui pemilik program pada 2026-11-20 (keputusan lewat dialog; catatan tinjauan menjadi tindak lanjut revisi). Silabus tidak memetakan butir capaian pembelajaran untuk minggu ini, jadi modul ini tidak dihitung memenuhi butir CP apa pun. Penilaian proyek memakai rubrik dari gurumu; modul ini tidak menilai. Datamu **sintetis** (buatanmu sendiri); tidak ada data murid atau orang nyata.

## Ingat kembali

Jawab dari ingatan dulu, baru cek di kunci. Soal 1 dari `a-xii1-m12`, soal 2 dari `a-xii1-m10`, soal 3 dari `a-xii1-m5`.

1. Apa isi berkas `.h` dan apa isi berkas `.cpp`, dan mengapa satu fungsi didefinisikan tepat sekali?
2. Operasi apa yang dilayani segment tree tetapi tidak Fenwick? Jelaskan dengan minimum.
3. Berapa langkah LCA sederhana pada pohon berbentuk rantai `n` simpul, dan mengapa?

## Tujuan

Setelah modul ini kamu dapat:

- merencanakan program dari pertanyaan sampai pengujian, dengan pilihan struktur data beralasan (keluaran minggu ini: program dan laporan);
- memakai Fenwick atau segment tree, atau struktur lain yang kamu pelajari, untuk kueri yang tak cukup dengan perulangan biasa;
- membagi program menjadi pustaka dan program utama yang dikompilasi terpisah;
- melaporkan banyak langkah dan batas program, dan memberi serta menerima umpan balik sejawat yang spesifik.

## Rencana proyek

Mulailah dari **pertanyaan yang harus dijawab program**, bukan dari alat. Tulis rencana satu halaman berisi tujuh bagian: tujuan, masukan, aturan, keluaran, kriteria selesai, daftar uji, dan **prediksi hasil**. Contoh terselesaikan: omzet harian sebuah kantin karangan dengan kueri jumlah, minimum, dan pembaruan.

| Bagian | Isi contoh |
| --- | --- |
| Tujuan | Menjawab "berapa omzet hari `l` sampai `r`" dan "berapa omzet harian terendahnya", sambil omzet sebuah hari bisa dikoreksi. |
| Masukan | `n` dan `q`, lalu `n` omzet, lalu `q` perintah: `U hari nilai`, `J l r`, `M l r`. Data karangan. |
| Aturan | Fenwick untuk jumlah (modul `a-xii1-m9`), segment tree iteratif untuk minimum (modul `a-xii1-m10`). Perintah di luar rentang atau tak dikenal ditolak dan dihitung. |
| Keluaran | Satu baris per perintah yang sah; di akhir banyak perintah yang ditolak. |
| Kriteria selesai | Tiap perintah sah dijawab dalam `O(log n)`; yang salah ditolak tanpa merusak data. |
| Daftar uji | Contoh di bawah; `n = 1`; `l = r`; semua perintah salah; semua omzet sama. |
| Prediksi | Jumlah `1..10` 940; minimum 60 pada hari 4; setelah hari 4 menjadi 150 jumlah `4..6` naik 90; dua perintah ditolak. |

Pseudocode-nya:

```text
baca n dan q; baca omzet; bangun Fenwick (jumlah) dan pohon minimum
untuk tiap perintah:
  BILA U dan hari sah: tambah selisih ke Fenwick, ubah pohon minimum, simpan nilai baru
  BILA J atau M dan 1 <= l <= r <= n: jawab dari Fenwick atau dari pohon minimum
  selain itu: tolak++ dan catat
cetak banyak perintah ditolak
```

Programnya (satu berkas agar bisa dikompilasi sendirian; di proyekmu kedua struktur dipisah ke pustaka seperti modul `a-xii1-m12`):

```cpp
#include <algorithm>
#include <climits>
#include <iostream>
#include <string>
#include <vector>
using namespace std;

int n;
vector<long long> fenwick;
vector<int> seg;
vector<int> nilai;

void tambah(int i, long long v) {
  for (; i <= n; i += i & -i) {
    fenwick[i] += v;
  }
}

long long prefiks(int i) {
  long long s = 0;
  for (; i > 0; i -= i & -i) {
    s += fenwick[i];
  }
  return s;
}

void ubahSeg(int p, int v) {
  for (seg[p += n] = v; p > 1; p >>= 1) {
    seg[p >> 1] = min(seg[p], seg[p ^ 1]);
  }
}

int minimumSeg(int l, int r) {
  int hasil = INT_MAX;
  for (l += n, r += n; l < r; l >>= 1, r >>= 1) {
    if (l & 1) {
      hasil = min(hasil, seg[l++]);
    }
    if (r & 1) {
      hasil = min(hasil, seg[--r]);
    }
  }
  return hasil;
}

int main() {
  int q;
  cin >> n >> q;
  fenwick.assign(n + 1, 0);
  seg.assign(2 * n, 0);
  nilai.assign(n + 1, 0);
  for (int i = 1; i <= n; i++) {
    cin >> nilai[i];
    tambah(i, nilai[i]);
    seg[n + i - 1] = nilai[i];
  }
  for (int i = n - 1; i > 0; i--) {
    seg[i] = min(seg[2 * i], seg[2 * i + 1]);
  }
  int ditolak = 0;
  for (int k = 0; k < q; k++) {
    string perintah;
    int a;
    int b;
    cin >> perintah >> a >> b;
    if (perintah == "U" && a >= 1 && a <= n) {
      tambah(a, (long long)b - nilai[a]);
      nilai[a] = b;
      ubahSeg(a - 1, b);
      cout << "hari " << a << " menjadi " << b << "\n";
    } else if ((perintah == "J" || perintah == "M") && a >= 1 && a <= b && b <= n) {
      if (perintah == "J") {
        cout << "jumlah " << a << ".." << b << " = " << prefiks(b) - prefiks(a - 1) << "\n";
      } else {
        cout << "minimum " << a << ".." << b << " = " << minimumSeg(a - 1, b) << "\n";
      }
    } else {
      ditolak++;
      cout << "ditolak: " << perintah << " " << a << " " << b << "\n";
    }
  }
  cout << ditolak << " perintah ditolak\n";
}
```

Masukan (`masukan.txt`):

```text
10 9
120 80 95 60 130 70 110 90 85 100
J 1 10
M 1 10
J 4 6
U 4 150
J 4 6
M 3 5
M 7 11
X 1 2
J 5 5
```

Keluaran:

```text
jumlah 1..10 = 940
minimum 1..10 = 60
jumlah 4..6 = 260
hari 4 menjadi 150
jumlah 4..6 = 350
minimum 3..5 = 95
ditolak: M 7 11
ditolak: X 1 2
jumlah 5..5 = 130
2 perintah ditolak
```

Cocokkan dengan prediksimu dan tulis satu hal yang berbeda. Perkiraan langkah: membangun `O(n log n)`; tiap perintah `O(log n)`. Untuk `n = q = 10^5` itu sekitar `10^5 * 17`, kurang dari dua juta langkah, sedangkan perulangan biasa pada tiap kueri memerlukan hingga `10^10`.

**Pilihan proyekmu** (pilih satu, atau usulkan ke gurumu; semua datanya karangan): (1) *Statistik rentang:* seperti contoh, untuk suhu harian, langkah kaki, atau stok barang karangan, dengan satu kueri tambahan buatanmu. (2) *Pustaka geometri:* pustaka `geo` (modul `a-xii1-m11`) dan program yang membaca poligon dan menjawab luas, keliling, arah, dan titik terdekat. (3) *Peta kota karangan:* pustaka `graf` (modul `a-xii1-m12`) untuk jarak terpendek antar kantor, ditambah satu struktur data dari semester ini. Tulis rencana tujuh bagianmu sendiri.

## Daftar periksa

Kerjakan berurutan dan centang bila selesai.

- [ ] Pertanyaan dan rencana satu halaman ditulis lebih dulu, termasuk prediksi hasil.
- [ ] Data sintetis; tidak ada data murid atau orang nyata.
- [ ] Pseudocode ditulis sebelum program.
- [ ] Program dibagi minimal menjadi satu pustaka (`.h` dan `.cpp`) dan satu program utama, dikompilasi dengan `g++ -std=c++17 -Wall -Wextra` tanpa peringatan.
- [ ] Ada berkas uji atau `Makefile` yang dapat dijalankan ulang oleh teman sekelompok.
- [ ] Minimal lima uji: contoh biasa, ukuran terkecil, masukan salah, nilai batas, dan satu ujimu sendiri; hasilnya dicatat dan dibandingkan dengan perhitungan tangan.
- [ ] Laporan menyebut banyak langkah program (O-besar) dan batas ukuran masukannya.
- [ ] Bila memakai AI generatif: catatan pemakaian AI (alat, tujuan, garis besar perintah, bagian yang dipakai, cara memeriksa); kode buatan AI kamu baca, jalankan, dan uji; tidak ada data pribadi pada perintah.
- [ ] Laporan satu halaman: pertanyaan, struktur data dan alasannya, hasil uji, satu hal yang berbeda dari prediksi, dan satu hal yang akan kamu ubah.

## Umpan balik sejawat

Tukar rencana, kode, dan laporan dengan satu kelompok lain. Beri umpan balik tentang pekerjaan, bukan orangnya, dalam tiga kalimat:

1. **Satu yang sudah baik**, dengan bagian yang kamu tunjuk.
2. **Satu yang perlu diperbaiki**, dengan alasan.
3. **Satu langkah berikutnya** yang bisa dikerjakan minggu depan.

Terima umpan balik dengan mencatat, bukan membela.

## Latihan bercampur

1. `AI: boleh` Tambahkan perintah `S l r` yang mencetak rata-rata omzet (jumlah dibagi banyak hari) dan pilih tipe bilangan agar tak terpotong.
2. `AI: tanpa AI` Mengapa pembaruan Fenwick memakai selisih `nilai baru - nilai lama`, bukan nilai baru (modul `a-xii1-m9`)?
3. `AI: boleh` Mengapa pustaka perlu penjaga `#ifndef` bila dipakai `main.cpp` dan `uji.cpp` sekaligus (modul `a-xii1-m12`)?

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `a-xii1-m14` (pertanyaan 1), sekitar tiga minggu lagi di `a-xii2-m2` (pertanyaan 2), dan sekitar delapan minggu lagi di `a-xii2-m7` (pertanyaan 3). Jawab sekarang lalu simpan.

1. Mengapa rencana ditulis sebelum program, dan apa tujuh bagian rencana proyek?
2. Mengapa memilih Fenwick untuk jumlah dan segment tree untuk minimum pada proyek contoh?
3. Apa saja isi laporan proyek program yang lengkap?

## Kesalahan umum

- **Memulai dari kode, bukan dari pertanyaan.** Hasilnya struktur data yang tak menjawab apa pun.
- **Memilih struktur data tanpa alasan.** Laporan harus menyebut operasi yang dilayani dan banyak langkahnya.
- **Mengabaikan masukan salah.** Program berhenti atau merusak data pada perintah yang tak dikenal.
- **Menguji hanya dengan contoh dari rencana.** Cacat biasanya tinggal di ukuran terkecil dan nilai batas.
- **Menaruh semua kode dalam satu berkas besar.** Sulit diuji, dibagi, dan ditinjau sejawat.

## Cek mandiri

- [ ] Saya dapat menyebut pertanyaan, struktur data, dan kriteria selesai proyek saya.
- [ ] Saya menulis pseudocode sebelum program.
- [ ] Saya membagi program menjadi pustaka dan program utama.
- [ ] Saya melaporkan banyak langkah program beserta batas masukannya.
- [ ] Saya dapat memberi umpan balik dalam tiga bagian.

## Kunci dan petunjuk

**Ingat kembali.** 1: `.h` berisi deklarasi dan penjaga; `.cpp` berisi definisi; dua definisi untuk satu nama ditolak penaut. 2: operasi seperti minimum tak punya pengurangan, jadi tak bisa dijawab dari selisih dua prefiks; segment tree menyimpan jawaban tiap rentang. 3: sekitar `n` langkah, karena pada rantai kedalaman terbesar `n - 1` dan simpul terdalam harus naik sepanjang itu.

**Rencana proyek.** Rencana yang baik menyebut kriteria selesai yang dapat diperiksa (mis. "tiap perintah sah dijawab") dan prediksi hasil yang dapat dibandingkan dengan keluaran program. Program di atas dijalankan dengan masukan contoh dan keluarannya sama dengan prediksi: jumlah `4..6` naik dari 260 menjadi 350, yaitu 90 setelah hari 4 berubah dari 60 menjadi 150.

**Daftar periksa.** Contoh uji dan hasil yang diharapkan: `n = 1` dengan omzet 5 dan `J 1 1` mencetak 5 dan `M 1 1` mencetak 5; `J 2 1` ditolak karena `l > r`; bila semua omzet sama, minimum sama dengan nilai itu; perintah `X 1 2` ditolak karena bukan `U`, `J`, atau `M`.

**Latihan bercampur.** 1: jumlah rentang (`prefiks(r) - prefiks(l - 1)`) dibagi `r - l + 1` dengan salah satu operan dijadikan `double`; pembagian dua `int` membuang pecahan. 2: Fenwick menyimpan jumlah blok; mengubah satu nilai berarti menambah selisihnya ke semua blok yang memuatnya; menambah nilai baru akan menggandakan nilai lama. 3: bila `graf.h` terbaca dua kali dalam satu berkas sumber (langsung dan lewat header lain), definisi struktur ganda ditolak kompilator; penjaga mencegahnya.

## Langkah berikutnya

Modul berikutnya, `a-xii1-m14`, adalah asesmen dan refleksi semester ini, tanpa AI. Bawa laporan dan umpan balik sejawatmu sebagai bahan refleksi. Modul terkait: `a-xii1-m12`. Bacaan lanjut: halaman cppreference tentang `std::vector` dan `std::min`.
