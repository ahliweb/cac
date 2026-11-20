## Untuk siapa modul ini

Modul ini untuk murid kelas XI jalur A (Algoritmik dengan C++), minggu `A-XI2-M13` silabus v1.4.1: proyek analisis data terbuka. Prasyarat: modul `a-xi2-m12` dan modul data sebelumnya (`a-xi2-m9` sampai `a-xi2-m11`). Dikerjakan mandiri atau berkelompok.

Modul ini berstatus DRAF: karangan penyusun, belum ditinjau pemilik. Butir `F-AD-a` dipetakan silabus sebagai dipenuhi jalur ini; modul draf ini belum dihitung sebagai pemenuhan. Penilaian proyek memakai rubrik dari gurumu; modul ini tidak menilai. Datamu **sintetis** (buatanmu sendiri) atau **data terbuka berlisensi yang kamu baca dari halaman resminya dan kamu catat**; tidak ada data murid atau orang nyata.

## Ingat kembali

Jawab dari ingatan dulu, baru cek di kunci. Soal 1 dari `a-xi2-m12`, soal 2 dari `a-xi2-m10`, soal 3 dari `a-xi2-m5`.

1. Mengapa prediksi dinilai dengan data yang tidak dipakai untuk membuatnya?
2. Kira-kira berapa langkah merekap `n` baris ke `k` kelompok dengan `map`?
3. Kira-kira berapa entri daftar ketetanggaan untuk 100.000 simpul dan 200.000 sisi tak berarah, dan mengapa matriksnya tak muat?

## Tujuan

Setelah modul ini kamu dapat:

- merencanakan analisis data dari pertanyaan sampai laporan, dengan sumber dan lisensi tercatat (keluaran minggu ini: program dan laporan);
- membaca, memvalidasi, merekap, dan memprediksi data dalam satu program;
- melaporkan prediksi bersama galat dan keterbatasannya untuk mendukung satu keputusan;
- memberi dan menerima umpan balik sejawat yang spesifik.

## Rencana proyek

Analisis data yang baik dimulai dari **pertanyaan keputusan**, bukan dari alat. Tulis rencana satu halaman dengan tujuh bagian: tujuan, masukan, aturan, keluaran, kriteria selesai, daftar uji, dan **prediksi hasil**. Contoh terselesaikan: pemakaian listrik bulanan tiga ruang sebuah sekolah karangan (data sintetis, kWh), untuk memutuskan ruang mana yang perlu dihemat.

| Bagian | Isi contoh |
| --- | --- |
| Tujuan | Menentukan ruang yang pemakaiannya paling besar dan paling cepat naik, dan memprediksi bulan berikutnya. |
| Masukan | CSV `bulan,ruang,kwh` dengan judul; satu baris per ruang per bulan. Sumber: dibuat penyusun (karangan), tanpa data orang atau tempat nyata. |
| Aturan | Tolak baris yang bukan tiga kolom atau `kwh`-nya bukan angka dan hitung. Rekap per ruang dengan `map`. Prediksi tiap ruang dengan rata-rata bergerak (`k = 3`) dan garis kecenderungan, uji dengan galat rata-rata mutlak pada titik ke-5 ke atas, pilih yang galatnya lebih kecil. |
| Keluaran | Per ruang: banyak bulan, jumlah, terbesar, ramalan bulan berikutnya, galat kedua cara, dan cara terpilih; lalu banyak baris ditolak. |
| Kriteria selesai | Tiap ruang punya satu ramalan dan galat; baris rusak dilaporkan; data kurang dari 5 bulan dilaporkan tidak bisa diuji. |
| Daftar uji | Contoh di bawah; hanya baris judul; satu ruang dengan 4 bulan; semua baris rusak; ruang dengan nilai tetap. |
| Prediksi | Ruang `lab-1` naik terus sehingga garis menang; ruang `lab-2` naik turun sehingga rata-rata bergerak menang; satu baris ditolak. |

Pseudocode-nya:

```text
buang baris judul
untuk tiap baris: pecah; BILA bukan tiga kolom atau kwh bukan angka: tolak++ lalu lanjut
simpan kwh pada deret milik ruang (map dari ruang ke daftar)
untuk tiap ruang: hitung banyak, jumlah, terbesar
  BILA banyak < 5: lapor "data kurang" lalu lanjut
  uji rata-rata bergerak dan garis pada titik ke-5 ke atas, hitung galat rata-rata mutlak
  cetak ramalan berikutnya dari cara yang galatnya lebih kecil
cetak banyak baris ditolak
```

Programnya (satu berkas; fungsi prediksi dari modul `a-xi2-m12`):

```cpp
#include <cmath>
#include <iomanip>
#include <iostream>
#include <map>
#include <sstream>
#include <string>
#include <vector>
using namespace std;

bool semuaAngka(const string& s) {
  if (s.empty()) {
    return false;
  }
  for (char c : s) {
    if (c < '0' || c > '9') {
      return false;
    }
  }
  return true;
}

double rataBergerak(const vector<double>& v, int hingga, int k) {
  double jumlah = 0;
  for (int i = hingga - k; i < hingga; i++) {
    jumlah += v[i];
  }
  return jumlah / k;
}

double garis(const vector<double>& v, int hingga) {
  double sx = 0, sy = 0, sxy = 0, sxx = 0;
  for (int i = 0; i < hingga; i++) {
    sx += i;
    sy += v[i];
    sxy += i * v[i];
    sxx += (double)i * i;
  }
  double n = hingga;
  double b = (n * sxy - sx * sy) / (n * sxx - sx * sx);
  double a = (sy - b * sx) / n;
  return a + b * hingga;
}

int main() {
  string baris;
  getline(cin, baris);
  map<string, vector<double>> deret;
  int ditolak = 0;
  while (getline(cin, baris)) {
    vector<string> kolom;
    istringstream ss(baris);
    string bagian;
    while (getline(ss, bagian, ',')) {
      kolom.push_back(bagian);
    }
    if (kolom.size() != 3 || !semuaAngka(kolom[2])) {
      ditolak++;
      continue;
    }
    deret[kolom[1]].push_back(stod(kolom[2]));
  }
  cout << fixed << setprecision(1);
  for (const auto& p : deret) {
    const vector<double>& v = p.second;
    int n = v.size();
    double jumlah = 0, terbesar = v[0];
    for (double x : v) {
      jumlah += x;
      if (x > terbesar) {
        terbesar = x;
      }
    }
    cout << p.first << ": " << n << " bulan, jumlah " << jumlah << ", terbesar " << terbesar << "\n";
    if (n < 5) {
      cout << "  data kurang dari 5 bulan, tidak bisa diuji\n";
      continue;
    }
    double galatRB = 0, galatG = 0;
    for (int i = 4; i < n; i++) {
      galatRB += fabs(rataBergerak(v, i, 3) - v[i]);
      galatG += fabs(garis(v, i) - v[i]);
    }
    galatRB /= (n - 4);
    galatG /= (n - 4);
    bool rbMenang = galatRB < galatG;
    cout << "  galat rata-rata bergerak " << galatRB << ", garis " << galatG << "\n";
    cout << "  ramalan bulan berikutnya " << (rbMenang ? rataBergerak(v, n, 3) : garis(v, n)) << " (" << (rbMenang ? "rata-rata bergerak" : "garis kecenderungan") << ")\n";
  }
  cout << ditolak << " baris ditolak\n";
}
```

Masukan (`kwh.csv`):

```text
bulan,ruang,kwh
2025-01,lab-1,310
2025-01,lab-2,220
2025-01,perpus,150
2025-02,lab-1,318
2025-02,lab-2,245
2025-02,perpus,148
2025-03,lab-1,325
2025-03,lab-2,210
2025-03,perpus,152
2025-04,lab-1,331
2025-04,lab-2,250
2025-04,perpus,151
2025-05,lab-1,340
2025-05,lab-2,215
2025-05,perpus,149
2025-06,lab-1,347
2025-06,lab-2,240
2025-06,perpus,153
2025-07,lab-1,352
2025-07,lab-2,rusak
2025-07,perpus,150
2025-08,lab-1,361
2025-08,lab-2,255
2025-08,perpus,152
2025-09,lab-1,366
2025-09,lab-2,205
2025-09,perpus,151
2025-10,lab-1,375
2025-10,lab-2,245
2025-10,perpus,150
2025-11,lab-1,381
2025-11,lab-2,230
2025-11,perpus,154
2025-12,lab-1,390
2025-12,lab-2,250
2025-12,perpus,152
```

Keluaran:

```text
lab-1: 12 bulan, jumlah 4196.0, terbesar 390.0
  galat rata-rata bergerak 14.4, garis 1.2
  ramalan bulan berikutnya 396.0 (garis kecenderungan)
lab-2: 11 bulan, jumlah 2565.0, terbesar 255.0
  galat rata-rata bergerak 18.1, garis 20.4
  ramalan bulan berikutnya 241.7 (rata-rata bergerak)
perpus: 12 bulan, jumlah 1812.0, terbesar 154.0
  galat rata-rata bergerak 1.4, garis 1.8
  ramalan bulan berikutnya 152.0 (rata-rata bergerak)
1 baris ditolak
```

Cocokkan dengan prediksimu dan tulis satu hal yang berbeda. Perkiraan langkah untuk laporan: membaca dan merekap `n` baris `O(n log k)` untuk `k` ruang; pengujian garis menghitung ulang untuk tiap titik uji sehingga `O(m²)` untuk deret `m` bulan per ruang. Di sini `m = 12`, jadi ratusan operasi saja.

**Pilihan proyekmu** (pilih satu, atau usulkan ke gurumu): (1) *Data buatanmu:* buat CSV sintetis 24 bulan dengan tiga kelompok yang kamu rancang (satu naik, satu naik turun, satu tetap), analisis seperti contoh. (2) *Data terbuka:* pilih satu dataset berlisensi yang jelas, baca lisensinya di halaman datasetnya, tulis catatan sumber dan atribusi (modul `a-xi2-m11`), pastikan tidak memuat data pribadi, ambil bagian kecil sebagai berkas, lalu analisis; bila lisensinya tidak jelas, pilih dataset lain. Tulis rencana tujuh bagianmu sendiri.

## Daftar periksa

Kerjakan berurutan dan centang bila selesai.

- [ ] Pertanyaan keputusan dan rencana satu halaman ditulis lebih dulu, termasuk prediksi hasil untuk datamu.
- [ ] Catatan sumber: nama, penerbit, lisensi, tanggal akses, dan tautan (atau keterangan "buatan sendiri").
- [ ] Data sintetis atau berlisensi tercatat; tidak ada data murid atau orang nyata.
- [ ] Pseudocode ditulis sebelum program.
- [ ] Program menolak dan menghitung baris rusak, merekap, dan memprediksi dengan galat.
- [ ] Minimal lima uji: contoh biasa, hanya baris judul, data kurang dari 5 bulan, semua baris rusak, dan satu uji buatanmu sendiri; hasil dicatat.
- [ ] Laporan memuat banyak langkah atau waktu baca kira-kira, dan keterbatasan prediksi.
- [ ] Bila memakai AI generatif: catatan pemakaian AI (alat, tujuan, garis besar perintah, bagian yang dipakai, cara memeriksa); kode buatan AI kamu baca, jalankan, dan uji; tidak ada data pribadi pada perintah.
- [ ] Laporan satu halaman: pertanyaan, sumber dan lisensi, hasil rekap, ramalan beserta galatnya, satu hal yang berbeda dari prediksi, dan satu keputusan yang kamu sarankan.

## Umpan balik sejawat

Tukar rencana, catatan sumber, dan program dengan satu kelompok lain. Beri umpan balik tentang pekerjaan, bukan orangnya, dalam tiga kalimat:

1. **Satu yang sudah baik**, dengan bagian yang kamu tunjuk.
2. **Satu yang perlu diperbaiki**, dengan alasan.
3. **Satu langkah berikutnya** yang bisa dikerjakan minggu depan.

Terima umpan balik dengan mencatat, bukan membela.

## Latihan bercampur

1. `AI: boleh` Ubah jendela dari `k = 3` menjadi `k = 2`. Ruang mana yang ramalannya berubah, dan apakah cara terpilihnya ikut berubah (modul `a-xi2-m12`)?
2. `AI: tanpa AI` Mengapa lisensi dan atribusi masuk laporan, bukan hanya program (modul `a-xi2-m11`)?
3. `AI: boleh` Tambahkan pencatat banyak baris ditolak per alasan: kolom salah atau bukan angka (modul `a-xi2-m9`).

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `a-xi2-m14` (pertanyaan 1), sekitar tiga minggu lagi di `a-xii1-m2` (pertanyaan 2), dan sekitar delapan minggu lagi di `a-xii1-m7` (pertanyaan 3). Jawab sekarang lalu simpan.

1. Mengapa data terbuka tetap dicek sebelum dianalisis, dan apa yang dicatat tentang baris rusak?
2. Apa yang membedakan laporan prediksi yang jujur dari yang menyesatkan?
3. Apa saja isi laporan analisis data yang lengkap?

## Kesalahan umum

- **Memulai dari program, bukan dari pertanyaan.** Hasilnya banyak angka tanpa keputusan.
- **Tidak mencatat sumber dan lisensi.** Laporan tidak bisa dipertanggungjawabkan.
- **Melaporkan ramalan tanpa galat.** Pembaca tidak tahu seberapa bisa dipercaya.
- **Membandingkan dua cara dengan data yang dipakai membuatnya.** Galatnya menyesatkan.
- **Memakai data pribadi karena "datanya terbuka".** Di kelas ini tidak dipakai.

## Cek mandiri

- [ ] Saya dapat menyebut pertanyaan keputusan, sumber, dan kriteria selesai proyek saya.
- [ ] Saya menulis pseudocode sebelum program.
- [ ] Saya mencatat sumber, lisensi, dan baris yang ditolak.
- [ ] Saya melaporkan ramalan bersama galatnya.
- [ ] Saya dapat memberi umpan balik dalam tiga bagian.

## Kunci dan petunjuk

**Ingat kembali.** 1: nilai uji harus belum dilihat model; kalau tidak galatnya tampak kecil karena model sudah "menghafal". 2: sekitar `n * log2 k` langkah, jadi `O(n log k)`. 3: `2 * 200.000 = 400.000` entri (ditambah satu daftar per simpul); matriks `100.000 * 100.000 = 10^10` sel, jauh di atas memori yang lazim tersedia.

**Rencana proyek.** Contoh di atas satu jawaban yang mungkin; rencanamu boleh berbeda selama ketujuh bagian ada dan kriteria selesai dapat diuji. Uji hanya baris judul memberi keluaran:

```text
0 baris ditolak
```

Untuk proyek pilihan: rencana yang baik menyebut pertanyaan keputusan, sumber dan lisensi, dan prediksi untuk datamu sendiri.

**Daftar periksa.** Tidak ada kunci tunggal; guru memeriksa tiap butir dengan rubrik.

**Umpan balik sejawat.** Umpan balik yang baik menunjuk bagian tertentu, menyebut alasan, dan menawarkan langkah yang bisa dikerjakan. "Bagus" saja bukan umpan balik.

**Latihan bercampur.** 1: ubah angka `3` menjadi `2` pada pemanggilan `rataBergerak` (di tiga tempat); ramalan rata-rata bergerak berubah pada semua ruang, tetapi cara terpilih hanya berubah bila urutan galatnya berbalik; periksa dari keluaran barumu. 2: karena pembaca laporan perlu tahu dari mana angka berasal dan apakah boleh dipakai; atribusi adalah syarat CC BY 4.0 dan pengakuan atas pembuat data. 3: tambahkan dua penghitung: satu pada cabang `kolom.size() != 3`, satu pada cabang `!semuaAngka`, dan cetak keduanya.

**Ulang berjarak.** 1: karena lisensi membolehkan memakai, bukan menjamin benar; baris rusak dicatat nomor dan isinya serta jumlahnya. 2: laporan yang jujur menyertakan galat, cara menguji, dan keterbatasan; yang menyesatkan hanya menyebut angka ramalan. 3: pertanyaan keputusan, sumber dan lisensi, cara membersihkan data, hasil rekap, ramalan dengan galat, keterbatasan, dan saran keputusan.

## Langkah berikutnya

Modul berikut: `a-xi2-m14` (asesmen dan refleksi semester ini). Semester berikutnya (kelas XII) membahas lintasan terpendek dan graf berbobot. Bacaan lanjut: halaman cppreference tentang `std::map` dan `std::stod`.
