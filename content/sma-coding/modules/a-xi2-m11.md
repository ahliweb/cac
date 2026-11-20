## Untuk siapa modul ini

Modul ini untuk murid kelas XI jalur A (Algoritmik dengan C++), minggu `A-XI2-M11` silabus v1.4.1: sumber data terbuka dan legal. Prasyarat: modul `a-xi2-m10` dan fondasi `FND-X1-M2` (perangkat lunak, berkas, dan lisensi).

Modul ini karangan penyusun dan disetujui pemilik program pada 2026-11-20 (keputusan lewat dialog; catatan tinjauan menjadi tindak lanjut revisi). Butir `F-AD-a` dipetakan silabus sebagai dipenuhi jalur ini; pemenuhan butir mengikuti pemetaan silabus, bukan status modul. Modul ini bukan nasihat hukum: bila ragu, tanyakan gurumu dan jangan memakai datanya. Semua data contoh adalah **karangan** dengan alamat berakhiran `.example`; tidak ada data murid atau orang nyata. Tiap soal latihan bertanda `AI: boleh` atau `AI: tanpa AI`. Masukan lewat berkas: `./program < sumber.csv`.

## Ingat kembali

Jawab dari ingatan dulu, baru cek di kunci. Soal 1 dari `a-xi2-m10`, soal 2 dari `a-xi2-m8`, soal 3 dari `a-xi2-m3`.

1. Mengapa `map` bisa mengelompokkan data tanpa mengurutkannya lebih dulu, dan terurut menurut apa isinya?
2. Berapa kira-kira langkah BFS pada grid 1000 kali 1000, dan mengapa tiap sel dimasukkan antrian paling banyak sekali?
3. Mengapa DP knapsack tidak layak bila `W = 10^12` meskipun `n` kecil, dan strategi apa yang masih mungkin?

## Tujuan

Setelah modul ini kamu dapat:

- membedakan data terbuka dari data yang sekadar bisa diunduh;
- membaca lisensi data dari halaman resminya dan menyebut izin serta syaratnya (keluaran minggu ini: catatan sumber);
- menilai keterpercayaan sebuah dataset: penerbit, tanggal, definisi kolom, dan cara pengumpulan;
- menolak data yang lisensinya tidak jelas atau memuat data pribadi.

## Prediksi dulu

Ini tugas baca-dan-prediksi, `AI: tanpa AI`. Fungsi berikut menyaring teks lisensi pada catatan sumber. **Tebak dulu, tulis, baru jalankan.**

```cpp
#include <iostream>
#include <string>
using namespace std;

string status(const string& lisensi) {
  if (lisensi.empty() || lisensi == "tidak-tertulis") {
    return "tolak";
  }
  if (lisensi == "CC0-1.0" || lisensi == "CC-BY-4.0") {
    return "siap";
  }
  return "baca-dulu";
}

int main() {
  string contoh[4] = {"CC-BY-4.0", "", "semua-hak-dilindungi", "CC0-1.0"};
  for (int i = 0; i < 4; i++) {
    cout << i + 1 << ": " << status(contoh[i]) << "\n";
  }
}
```

1. Apa yang tercetak untuk keempat contoh?
2. Mengapa lisensi yang kosong ditolak, bukan dianggap bebas?

## Contoh terselesaikan

Keluaran program tadi:

```text
1: siap
2: tolak
3: baca-dulu
4: siap
```

**Data terbuka** adalah data yang boleh dipakai, diubah, dan dibagikan menurut lisensi yang tertulis. Data yang terlihat di situs belum tentu boleh dipakai: tanpa pernyataan lisensi, jangan menganggapnya bebas. Karena itu langkah pertama menilai sebuah sumber adalah **membaca lisensi dari halaman resminya**, bukan dari ingatan atau dugaan.

Penyusun membuka dua halaman resmi pada 2026-11-20. Halaman Creative Commons untuk *Atribusi 4.0 Internasional* (CC BY 4.0) menyatakan bahwa kamu boleh "menyalin dan menyebarluaskan kembali materi ini dalam bentuk atau format apapun" dan "menggubah, mengubah, dan membuat turunan", termasuk untuk kepentingan komersial, dengan syarat: mencantumkan nama yang sesuai, menyertakan tautan ke lisensi, dan menyatakan bahwa telah ada perubahan yang dilakukan bila kamu mengubahnya. Halaman itu sendiri mengingatkan bahwa ia hanya ringkasan dan teks lisensi lengkapnya yang berlaku. Halaman *CC0 1.0 Universal* menyatakan pemilik karya melepaskan hak cipta dan hak terkait sehingga kamu dapat menyalin, mengubah, dan mendistribusikannya, termasuk untuk tujuan komersial, tanpa meminta izin.

Perhatikan perbedaannya: CC0 tidak mewajibkan atribusi menurut halamannya, sedangkan CC BY 4.0 mewajibkannya. Sebaiknya kamu tetap mencatat sumber CC0 demi keterlacakan. Lisensi lain, misalnya yang membatasi pemakaian komersial atau mewajibkan hasil ubahan dibagikan dengan lisensi sama, tidak dibahas di sini: bacalah halaman resminya dulu dan jangan menduga.

Penyusun juga membuka halaman depan portal data pemerintah Indonesia (`data.go.id`, bernama "Portal Satu Data Indonesia"). Halaman depan itu tidak memuat keterangan lisensi atau ketentuan penggunaan data; hanya keterangan hak cipta situsnya. Pelajarannya: portal yang menghimpun banyak dataset tidak otomatis berarti semuanya berlisensi sama. Lisensi dibaca pada halaman dataset yang kamu pakai `[belum terverifikasi]` untuk dataset tertentu di portal itu, sebab modul ini tidak membuka satu pun halaman dataset-nya.

Selain lisensi, nilai **keterpercayaan**: siapa penerbitnya, kapan datanya dibuat atau diperbarui, adakah penjelasan arti kolom dan satuannya, bagaimana data dikumpulkan, dan apakah memuat data pribadi (nama, alamat, nomor identitas). Data yang memuat data pribadi orang nyata tidak kamu pakai di kelas ini, apa pun lisensinya.

Hasil penilaian dicatat dalam **catatan sumber**: satu baris per dataset. Berikut contoh catatan **karangan**; semua nama dan lembaganya fiktif, dan tidak ada data diambil dari modul lain.

Program berikut membaca catatan itu dengan teknik modul `a-xi2-m9`, memberi status tiap baris dengan fungsi tadi, dan untuk lisensi CC BY 4.0 mencetak kalimat atribusi.

```cpp
#include <iostream>
#include <sstream>
#include <string>
#include <vector>
using namespace std;

string status(const string& lisensi) {
  if (lisensi.empty() || lisensi == "tidak-tertulis") {
    return "tolak";
  }
  if (lisensi == "CC0-1.0" || lisensi == "CC-BY-4.0") {
    return "siap";
  }
  return "baca-dulu";
}

int main() {
  string baris;
  getline(cin, baris);
  int siap = 0, tolak = 0, baca = 0;
  while (getline(cin, baris)) {
    vector<string> k;
    istringstream ss(baris);
    string bagian;
    while (getline(ss, bagian, ';')) {
      k.push_back(bagian);
    }
    if (k.size() != 4) {
      cout << "baris rusak: " << baris << "\n";
      continue;
    }
    string s = status(k[2]);
    cout << k[0] << ": " << s << "\n";
    if (s == "siap") {
      siap++;
    } else if (s == "tolak") {
      tolak++;
    } else {
      baca++;
    }
    if (k[2] == "CC-BY-4.0") {
      cout << "  atribusi: \"" << k[0] << "\" oleh " << k[1] << ", CC BY 4.0 (https://creativecommons.org/licenses/by/4.0/), diakses " << k[3] << "\n";
    }
  }
  cout << siap << " siap, " << baca << " baca dulu, " << tolak << " ditolak\n";
}
```

Masukan (`sumber.csv`, dipisah titik koma):

```text
nama;penerbit;lisensi;tanggal_akses
Curah hujan kota karangan;Dinas Contoh;CC-BY-4.0;2026-11-20
Pengunjung taman karangan;Kelompok Contoh;CC0-1.0;2026-11-20
Peta sampah karangan;Lembaga Contoh;tidak-tertulis;2026-11-20
Harga pasar karangan;Toko Contoh;semua-hak-dilindungi;2026-11-20
Suhu stasiun karangan;Balai Contoh;;2026-11-20
Data tanpa tanggal;Balai Contoh;CC0-1.0
```

Keluaran:

```text
Curah hujan kota karangan: siap
  atribusi: "Curah hujan kota karangan" oleh Dinas Contoh, CC BY 4.0 (https://creativecommons.org/licenses/by/4.0/), diakses 2026-11-20
Pengunjung taman karangan: siap
Peta sampah karangan: tolak
Harga pasar karangan: baca-dulu
Suhu stasiun karangan: tolak
baris rusak: Data tanpa tanggal;Balai Contoh;CC0-1.0
2 siap, 1 baca dulu, 2 ditolak
```

Program ini hanya memeriksa **catatan**; ia tidak bisa tahu apakah isi lisensi yang kamu tulis benar. Kebenaran lisensi tetap kamu baca sendiri di halaman resminya. Untuk enam baris ia membaca setiap baris sekali, jadi `O(n)` untuk `n` baris catatan; yang mahal adalah membaca lisensinya, dan itu pekerjaan manusia.

## Contoh setengah jadi

Lengkapi fungsi yang menyatakan apakah sebuah dataset wajib diberi atribusi menurut lisensinya.

```cpp setengah-jadi
bool wajibAtribusi(const string& lisensi) {
  if (lisensi == "____") {
    return true;
  }
  if (lisensi == "CC0-1.0") {
    return ____;
  }
  return ____;
}
```

## Soal Parsons

Susun delapan langkah (sudah diacak) menjadi prosedur menilai satu dataset terbuka sebelum dipakai. `AI: tanpa AI`.

```text
(a)   Catat nama, penerbit, tanggal akses, dan tautan sumber.
(b)   Temukan dataset yang kamu butuhkan.
(c)   Putuskan: pakai, baca lebih dulu, atau tolak.
(d)   Baca lisensi pada halaman resmi dataset itu.
(e)   Periksa definisi kolom, cara pengumpulan, dan tanggal pembaruan.
(f)   Pastikan tidak ada data pribadi orang nyata.
(g)   Bila dipakai, tulis atribusi dan catat bila datanya kamu ubah.
(h)   Simpan catatan sumber bersama programmu.
```

## Latihan

1. `AI: boleh` **Catatan sendiri.** Buat tiga baris catatan sumber untuk data karanganmu sendiri (misalnya data buatanmu di modul sebelumnya). Tentukan lisensinya sendiri dan tulis alasannya. Tulis pseudocode lebih dulu bila memperluas program.
2. `AI: boleh` **Tanggal wajib.** Ubah program agar baris dengan `tanggal_akses` kosong ditolak, dan hitung banyak yang ditolak karena tidak ada lisensi dibanding karena baris rusak.
3. `AI: tanpa AI` **Mengubah data.** Kamu memakai data CC BY 4.0, membuang tiga kolomnya, dan menjumlahkan per kategori. Apa yang wajib kamu tulis pada laporanmu?
4. `AI: tanpa AI` **Menilai.** Sebuah situs menampilkan tabel harga tanpa keterangan lisensi dan tanpa penerbit. Bolehkah kamu memakainya untuk proyek? Beri dua alasan.
5. *Opsional:* **catatan pemakaian AI.** Bila memakai AI generatif, jawab nomor 3 sendiri dulu, lalu minta penjelasan atau petunjuk bertahap, bukan jawaban jadi. Catat alatnya, tujuanmu, garis besar perintahmu, bagian yang kamu pakai, dan caramu memeriksanya. Jangan menaruh data pribadi atau tugas bernilai pada perintah.

## Latihan bercampur

1. `AI: boleh` Tambahkan pada pembaca CSV dari modul `a-xi2-m9` penghitung baris yang ditolak, lalu laporkan di akhir bersama lisensi data yang dibaca.
2. `AI: tanpa AI` Mengapa data terbuka tetap perlu diperiksa nilainya sebelum direkap, padahal sumbernya resmi (modul `a-xi2-m10`)?
3. `AI: boleh` Rekap per kategori dari data berlisensi CC BY 4.0: tulis atribusi dan jelaskan bagian rekap yang merupakan perubahan dari data aslinya.

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `a-xi2-m12` (pertanyaan 1), sekitar tiga minggu lagi di `a-xi2-m14` (pertanyaan 2), dan sekitar delapan minggu lagi di `a-xii1-m5` (pertanyaan 3). Jawab sekarang lalu simpan.

1. Apa saja yang perlu ada dalam catatan sumber sebuah dataset?
2. Apa yang wajib dilakukan bila memakai data berlisensi CC BY 4.0 dan mengubahnya?
3. Mengapa lisensi dibaca pada halaman dataset itu sendiri, bukan diandaikan dari portal yang menampungnya?

## Kesalahan umum

- **Menganggap yang bisa diunduh boleh dipakai.** Tanpa lisensi tertulis, izin belum ada.
- **Menganggap "gratis" sama dengan "terbuka".** Data gratis bisa saja berlisensi membatasi.
- **Mengandalkan ingatan tentang isi lisensi.** Baca halaman resminya.
- **Lupa atribusi dan catatan perubahan.** CC BY 4.0 mewajibkannya, termasuk bila datanya hanya direkap.
- **Memakai dataset yang memuat data pribadi karena lisensinya terbuka.** Di kelas ini data pribadi orang nyata tidak dipakai.

## Cek mandiri

- [ ] Saya dapat menyebut izin dan syarat CC BY 4.0 dan CC0 1.0 dari halaman resminya.
- [ ] Saya dapat menulis atribusi untuk data berlisensi CC BY 4.0.
- [ ] Saya dapat menilai keterpercayaan sebuah dataset dengan lima pertanyaan.
- [ ] Saya menolak data yang lisensinya tidak jelas atau berisi data pribadi.
- [ ] Saya menyimpan catatan sumber bersama programku.

## Kunci dan petunjuk

**Ingat kembali.** 1: `map` menaruh entri menurut kunci saat memasukkan, sehingga baris berkunci sama bertemu di entri yang sama; isinya terurut menurut kunci. 2: sekitar `4 * 1.000.000 = 4.000.000` pemeriksaan tetangga; tiap sel masuk antrian paling banyak sekali karena ditandai saat dimasukkan. 3: langkahnya `n * W` dan tabelnya sepanjang `W + 1` sel, keduanya tumbuh bersama `W`, sehingga `W` raksasa tak muat dan tak selesai; bila `n` sangat kecil (sekitar 20 ke bawah) pencarian lengkap `2^n` masih mungkin.

**Prediksi dulu.** 1: lihat keluaran di atas: `siap`, `tolak`, `baca-dulu`, `siap`. 2: tanpa pernyataan lisensi tidak ada izin yang tertulis; memakai data itu berisiko melanggar hak pembuatnya.

**Contoh setengah jadi.** Isi: `CC-BY-4.0`, `false`, `true`. CC0 tidak mewajibkan atribusi (menurut halaman resminya), sedangkan lisensi lain dianggap wajib sampai kamu membacanya. Program lengkap:

```cpp
#include <iostream>
#include <string>
using namespace std;

bool wajibAtribusi(const string& lisensi) {
  if (lisensi == "CC-BY-4.0") {
    return true;
  }
  if (lisensi == "CC0-1.0") {
    return false;
  }
  return true;
}

int main() {
  string contoh[3] = {"CC-BY-4.0", "CC0-1.0", "lain"};
  for (int i = 0; i < 3; i++) {
    cout << contoh[i] << ": " << (wajibAtribusi(contoh[i]) ? "ya" : "tidak") << "\n";
  }
}
```

Keluaran:

```text
CC-BY-4.0: ya
CC0-1.0: tidak
lain: ya
```

**Soal Parsons.** Urutan benar: b, d, e, f, c, g, a, h. Baca lisensi sebelum menyimpulkan apa pun; keputusan (c) datang sesudah semua pemeriksaan; atribusi (g) hanya bila dipakai, dan catatan (a) merekam hasilnya.

**Latihan.** 1: baris contoh: `Data kelas karangan;Saya;CC0-1.0;2026-11-20`; alasan: datanya buatanmu sendiri sehingga kamu yang berhak menentukan, dan tidak ada data orang nyata di dalamnya. 2: tolak bila `k[3].empty()`; gunakan dua penghitung terpisah, `tanpaLisensi` dan `rusak`. 3: nama pembuat dan sumber, tautan ke lisensi CC BY 4.0, serta pernyataan bahwa datanya kamu ubah (kolom dibuang dan dijumlahkan per kategori). 4: tidak: tanpa lisensi tertulis tidak ada izin, dan tanpa penerbit keterpercayaannya tidak bisa dinilai.

**Latihan bercampur.** 1: tambahkan `ditolak++` pada cabang rusak dan cetak di akhir; lisensi dicatat dari catatan sumber, bukan ditebak. 2: sumber resmi pun bisa salah catat atau punya data hilang; lisensi mengizinkan memakai, bukan menjamin benar. 3: contoh: `"Curah hujan" oleh Dinas Contoh, CC BY 4.0, diakses 2026-11-20; diubah: dijumlahkan per kategori`.

**Ulang berjarak.** 1: nama, penerbit, lisensi, tanggal akses, dan tautan sumber; juga ada tidaknya data pribadi. 2: mencantumkan nama yang sesuai, menyertakan tautan ke lisensi, dan menyatakan bahwa telah ada perubahan. 3: karena lisensi bisa berbeda tiap dataset; halaman depan portal yang dibuka penyusun tidak memuat keterangan lisensi.

## Langkah berikutnya

Modul berikut: `a-xi2-m12` (prediksi sederhana) memakai data yang sudah dinilai sumbernya. Modul terkait: `fondasi-software-dan-sistem-operasi`. Bacaan lanjut: halaman Creative Commons untuk CC BY 4.0 dan CC0 1.0 (teks lengkapnya, bukan hanya ringkasan).
