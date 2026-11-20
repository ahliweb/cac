## Untuk siapa modul ini

Modul ini untuk murid kelas XI jalur C (IoT dan robotika), minggu `C-XI2-M9` silabus v1.4: sumber data terbuka dan legal. Prasyarat: modul `c-xi2-m8` (pemecahan masalah jaringan IoT); ia dipakai bersama pengetahuan format data dan pengelolaan sensor dari modul semester sebelumnya.

Modul ini karangan penyusun dan disetujui pemilik program pada 2026-11-20 (keputusan lewat dialog; catatan tinjauan menjadi tindak lanjut revisi). Ia mendukung butir `F-AD-a` (data terbuka, keputusan, dan prediksi) dan tidak dihitung memenuhi butir capaian pembelajaran mana pun. Keluaran minggu ini: catatan sumber. Latihan silabusnya: membaca lisensi satu dataset.

Seluruh modul ini dapat dikerjakan **tanpa papan**: kamu membaca lisensi dan menjalankan program di komputer. Modul ini tidak memakai perangkat fisik; aturan keselamatan dari modul sebelumnya tetap berlaku bila kamu memakai papan untuk mencatat data sendiri. Dataset, penerbit, dan nilai di modul ini **karangan**; dataset sungguhan dipilih oleh gurumu, dan hanya data tanpa data pribadi yang dipakai.

## Ingat kembali

Jawab dari ingatan dulu, baru cek di kunci. Soal 1 dari `C-XI2-M6`, soal 2 dari `C-XI2-M8`, soal 3 dari `C-XI2-M1`.

1. Apa yang terjadi bila dua papan memakai ID klien yang sama?
2. Mengapa mengubah satu hal pada satu waktu membuat penyebab gangguan lebih mudah ditemukan?
3. Mengapa alamat IP papan bisa berbeda setelah dinyalakan ulang?

## Tujuan

Setelah modul ini kamu dapat:

- membedakan data yang dapat diunduh dari data yang boleh dipakai dan dibagikan, dengan membaca lisensinya;
- menyebut syarat yang umum pada lisensi atribusi, dan menulis atribusi yang benar;
- menilai keterpercayaan sebuah sumber: penerbit, cara dan tempat pengukuran, satuan, tanggal;
- membandingkan data sensor sendiri dengan data terbuka: mengabaikan pasangan yang hilang dan menghitung bias serta galat;
- menulis catatan sumber yang lengkap (keluaran minggu ini).

## Prediksi dulu

Program di bawah membandingkan suhu per jam dari sensor sendiri dengan data terbuka (keduanya karangan). Pada jam ke-4 sensor sendiri gagal dibaca dan nilainya `NAN`. Program melewati pasangan yang salah satunya hilang, lalu menghitung **bias** (rata-rata `sendiri - terbuka`) dan galat mutlak rata-rata. **Tebak dulu, tulis jawabanmu, baru jalankan.**

Sendiri: 27,5; 28,1; 29,0; 30,2; hilang; 29,4. Terbuka: 27,0; 27,6; 28,2; 29,5; 29,8; 28,6.

1. Berapa pasangan yang sah?
2. Apakah bias positif atau negatif? Sensor sendiri cenderung membaca lebih tinggi atau lebih rendah?
3. Bila jam ke-4 tidak dilewati dan `NAN` ikut dijumlahkan, berapa hasil bias?

## Contoh terselesaikan

Data yang tersedia di internet belum tentu boleh dipakai bebas. **Lisensi** adalah pernyataan pemilik tentang apa yang boleh kamu lakukan. Menurut Open Definition 2.1, pengetahuan itu terbuka bila siapa pun bebas mengakses, memakai, mengubah, dan membagikannya, dengan syarat paling banyak berupa pelestarian asal-usul dan keterbukaannya. Lisensi atribusi yang umum, CC BY 4.0, mengizinkan membagikan dan mengadaptasi data untuk kepentingan apa pun, termasuk komersial, dengan syarat **menyebut pencipta**, menautkan lisensinya, dan menyatakan bila kamu mengubahnya. Data tanpa keterangan lisensi tidak otomatis bebas: tanyakan kepada guru atau penerbit sebelum memakainya. Portal Satu Data Indonesia (data.go.id) adalah contoh tempat mencari dataset; tiap dataset punya keterangan sendiri, jadi baca keterangannya, bukan portalnya.

Lisensi menjawab "boleh", sedangkan **keterpercayaan** menjawab "pantas dipercaya". Periksa siapa penerbitnya, bagaimana dan di mana data diukur (tinggi sensor, di bawah naungan atau terik), satuannya, selang waktunya, kapan diterbitkan atau diperbarui, dan apakah ada nilai hilang. Semua itu dicatat dalam **catatan sumber**. Program berikut memeriksa kelengkapan catatan. Dataset di dalamnya karangan.

```cpp
// C++17 biasa, jalan di komputer. Diperiksa oleh check:module-code.
#include <iostream>
#include <string>
#include <vector>

struct CatatanSumber {
  std::string judul;
  std::string penerbit;
  std::string lisensi;
  std::string tanggalAkses;
  std::string satuan;
  std::string lokasi;
};

// Mengembalikan nama bidang yang masih kosong.
std::vector<std::string> bidangKosong(const CatatanSumber &c) {
  std::vector<std::string> kosong;
  if (c.judul.empty()) kosong.push_back("judul");
  if (c.penerbit.empty()) kosong.push_back("penerbit");
  if (c.lisensi.empty()) kosong.push_back("lisensi");
  if (c.tanggalAkses.empty()) kosong.push_back("tanggalAkses");
  if (c.satuan.empty()) kosong.push_back("satuan");
  if (c.lokasi.empty()) kosong.push_back("lokasi");
  return kosong;
}

int main() {
  // Data karangan: dataset dan penerbit ini tidak ada.
  const CatatanSumber lengkap = {"Suhu Per Jam Stasiun Contoh", "Lembaga Contoh",
                                 "CC BY 4.0 (karangan untuk latihan)", "2026-11-10",
                                 "derajat Celsius", "stasiun contoh, 2 m di atas tanah"};
  const CatatanSumber kurang = {"Suhu Per Jam Stasiun Contoh", "Lembaga Contoh", "", "2026-11-10",
                                "", "stasiun contoh"};
  for (const CatatanSumber &c : {lengkap, kurang}) {
    std::vector<std::string> kosong = bidangKosong(c);
    if (kosong.empty()) {
      std::cout << "catatan lengkap\n";
    } else {
      std::cout << "catatan kurang:";
      for (const std::string &b : kosong) std::cout << " " << b;
      std::cout << "\n";
    }
  }
}
```

Keluarannya:

```text
catatan lengkap
catatan kurang: lisensi satuan
```

Program hanya memastikan bidang terisi, bukan bahwa isinya benar; kebenarannya kamu cek ke halaman sumbernya. Sekarang perbandingan data. Pasangan yang salah satunya hilang dilewati: menghitungnya sebagai 0 akan menciptakan selisih palsu.

```cpp
// C++17 biasa, jalan di komputer. Diperiksa oleh check:module-code.
#include <cmath>
#include <iostream>

const int JAM = 6;
const double TOLERANSI = 1.0;

int main() {
  // Data karangan, satu nilai per jam. NAN berarti sensor gagal dibaca.
  const double sendiri[JAM] = {27.5, 28.1, 29.0, 30.2, NAN, 29.4};
  const double terbuka[JAM] = {27.0, 27.6, 28.2, 29.5, 29.8, 28.6};

  double jumlahSelisih = 0;
  double jumlahMutlak = 0;
  int sah = 0;
  int dalamToleransi = 0;
  for (int i = 0; i < JAM; i++) {
    if (std::isnan(sendiri[i]) || std::isnan(terbuka[i])) {
      std::cout << "jam " << i << ": dilewati (data hilang)\n";
      continue;
    }
    double selisih = sendiri[i] - terbuka[i];
    jumlahSelisih += selisih;
    jumlahMutlak += std::fabs(selisih);
    sah++;
    if (std::fabs(selisih) <= TOLERANSI) dalamToleransi++;
  }
  std::cout << "pasangan sah: " << sah << "\n";
  std::cout << "bias (sendiri - terbuka): " << jumlahSelisih / sah << "\n";
  std::cout << "galat mutlak rata-rata: " << jumlahMutlak / sah << "\n";
  std::cout << "dalam toleransi " << TOLERANSI << ": " << dalamToleransi << " dari " << sah << "\n";
}
```

Keluarannya:

```text
jam 4: dilewati (data hilang)
pasangan sah: 5
bias (sendiri - terbuka): 0.66
galat mutlak rata-rata: 0.66
dalam toleransi 1: 5 dari 5
```

Selisihnya selalu positif, sehingga bias dan galat mutlak sama: sensor sendiri konsisten membaca sekitar 0,66 derajat lebih tinggi. Selisih yang searah seperti ini biasanya berasal dari **perbedaan kondisi** (sensor terkena panas papan atau terik, tinggi pemasangan berbeda), bukan acak. Perbandingan ini tidak membuktikan siapa yang benar; ia hanya menunjukkan seberapa jauh keduanya berbeda. Untuk menentukan yang benar kamu perlu pembanding ketiga atau kalibrasi.

## Contoh setengah jadi

Lengkapi `bias` agar melewati pasangan yang hilang dan mengembalikan `NAN` bila tak ada pasangan sah.

```cpp setengah-jadi
// C++17. Lengkapi bagian ____.
#include <cmath>

double bias(const double a[], const double b[], int n) {
  double jumlah = 0;
  int sah = 0;
  for (int i = 0; i < n; i++) {
    if (std::isnan(a[i]) ____ std::isnan(b[i])) continue;
    jumlah += a[i] ____ b[i];
    sah++;
  }
  return sah == 0 ? ____ : jumlah / sah;
}
```

## Soal Parsons

Susun baris-baris di bawah (sudah diacak) menjadi fungsi `dalamToleransi`: pasangan yang hilang dinyatakan tidak dalam toleransi.

```text
(a)   return std::fabs(sendiri - terbuka) <= TOLERANSI;
(b)   if (std::isnan(sendiri) || std::isnan(terbuka)) {
(c) }
(d)     return false;
(e) bool dalamToleransi(double sendiri, double terbuka) {
(f)   }
```

## Latihan

1. `AI: tanpa AI` **Baca lisensi.** Untuk tiap keterangan, tulis apa yang kamu lakukan sebelum memakai datanya di laporan: (a) "CC BY 4.0"; (b) "bebas dipakai, tidak boleh diubah"; (c) tidak ada keterangan lisensi.
2. `AI: boleh` **Pseudocode dulu.** Tulis pseudocode lalu tambahkan ke program perbandingan: jam dengan selisih mutlak terbesar beserta nilainya. Sebutkan tiga kasus uji, termasuk semua pasangan hilang.
3. `AI: tanpa AI` **Hitung tangan.** Pasangan (sendiri, terbuka): (26,0; 25,5), (27,0; 27,2), (hilang; 28,0), (28,5; 27,9). Hitung bias, galat mutlak rata-rata, dan berapa pasangan dalam toleransi 0,5.
4. `AI: boleh` **Catatan sumber.** Gurumu memilih satu dataset terbuka. Isi catatan sumber (enam bidang di atas), tambahkan satu kalimat atribusi, dan satu hal yang membuatmu ragu akan keterpercayaannya. Dengan papan: catat suhu sendiri pada jam yang sama dan bandingkan.
5. *Opsional:* **catatan pemakaian AI.** Bila memakai AI generatif, kerjakan nomor 1 sendiri dulu, lalu minta petunjuk atau kritik, bukan jawaban jadi. Catat alat, tujuan, garis besar perintah, bagian yang dipakai, dan cara memeriksanya. Jangan memasukkan data pribadi atau berkas yang lisensinya melarang pembagian ke layanan AI.

## Latihan bercampur

1. Susun pesan JSON untuk hasil perbandingan: sensor `s01`, bias 0,66, pasangan sah 5. Bagaimana bila tak ada pasangan sah dan bias tidak terdefinisi? (dari `C-XI2-M7`)
2. Selisih lima jam adalah 0,5; 0,5; 0,8; 0,7; dan 9,0 (satu jam sensor sempat terkena terik langsung). Mana yang lebih mewakili selisih umum, rata-rata atau median? Berapa masing-masing? (dari `C-X2-M10`)

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `C-XI2-M10` (sekitar satu minggu lagi), `C-XI2-M12` (sekitar tiga minggu lagi), dan `C-XII1-M3` (sekitar delapan minggu lagi). Jawab sekarang lalu simpan.

1. Mengapa satuan dan lokasi pengukuran dicatat di catatan sumber?
2. Mengapa pasangan data yang salah satunya hilang dilewati, bukan dihitung sebagai 0?
3. Apa beda "data dapat diunduh" dan "data boleh dipakai dan dibagikan"?

## Kesalahan umum

- **Mengira semua yang ada di internet bebas dipakai.** Lisensi menentukan; tanpa keterangan, tanyakan dulu.
- **Lupa atribusi.** Lisensi atribusi mensyaratkan menyebut pencipta, menautkan lisensi, dan menyatakan perubahan.
- **Menganggap data terbuka pasti benar.** Terbuka soal izin, bukan kebenaran; periksa penerbit dan cara ukur.
- **Menghitung nilai hilang sebagai 0.** Itu menciptakan selisih palsu; lewati pasangannya dan catat jumlahnya.
- **Menyimpulkan "sensorku salah" dari satu perbandingan.** Perbedaan lokasi dan kondisi sering menjelaskan bias searah.

## Cek mandiri

- [ ] Saya dapat membedakan data yang bisa diunduh dari data yang boleh dipakai dan dibagikan.
- [ ] Saya dapat menulis atribusi untuk data berlisensi atribusi.
- [ ] Saya memeriksa penerbit, cara dan tempat ukur, satuan, dan tanggal sumber.
- [ ] Saya menghitung bias dan galat tanpa memasukkan pasangan yang hilang.
- [ ] Saya menulis catatan sumber yang lengkap.

## Kunci dan petunjuk

**Ingat kembali.** 1: broker memutus klien yang lama, sehingga papan saling memutus dan pesan hilang. 2: karena bila gangguan hilang, kamu tahu perubahan mana penyebabnya, dan tidak menambah gangguan baru. 3: alamat diberikan otomatis oleh jaringan (DHCP); alamat dipinjamkan, bukan milik tetap, sehingga bisa berbeda saat dinyalakan ulang.

**Prediksi dulu.** 1: lima pasangan (jam ke-4 dilewati). 2: positif; sensor sendiri cenderung membaca lebih tinggi (0,66 derajat rata-rata). 3: `nan`; satu `NAN` membuat seluruh jumlah dan rata-rata menjadi `nan`.

**Contoh setengah jadi.** Isian berurutan: `||`, `-`, lalu `NAN`. Hasil kunci yang dikompilasi dan dijalankan penulis: pada pasangan (27,5; 27,0), (hilang; 29,8), (29,0; 28,0) bias bernilai 0,75; bila semua pasangan hilang hasilnya `nan`.

**Soal Parsons.** Urutan benar: e, b, d, f, a, c. Penjagaan data hilang harus sebelum perhitungan; baris (f) menutup `if`, baris (c) menutup fungsi.

**Latihan.** 1: (a) pakai dengan menyebut pencipta, menautkan lisensi, dan menyatakan bila kamu mengubahnya; (b) pakai tanpa mengubah dan baca syaratnya penuh sebelum membagikannya, tanyakan guru bila ragu apakah pembulatan atau pembersihan dihitung mengubah; (c) jangan dianggap bebas; tanyakan guru atau penerbit lebih dulu. 2: pseudocode: simpan selisih mutlak terbesar dan jamnya; perbarui bila selisih pasangan sah lebih besar; contoh kasus uji: selisih terbesar di awal, di akhir, dan semua pasangan hilang (laporkan "tidak ada"). Pada data contoh selisih terbesar sekitar 0,8, pada jam ke-2 dan jam ke-5; jam ke-2 yang dilaporkan bila kamu memakai "lebih besar dari", karena hitungan desimal komputer membuat selisih jam ke-2 sedikit lebih besar daripada jam ke-5 (selisih sebenarnya sama). 3: selisih 0,5; -0,2; (dilewati); 0,6. Bias (0,5 - 0,2 + 0,6) / 3 = 0,3. Galat mutlak rata-rata (0,5 + 0,2 + 0,6) / 3 = 0,43 (dibulatkan). Dalam toleransi 0,5: dua pasangan (0,5 dan 0,2) dari tiga. 4: tidak ada kunci tunggal; catatan yang baik memuat enam bidang, atribusi, dan satu hal ragu yang konkret.

**Latihan bercampur.** 1: `{"sensor":"s01","bias":0.66,"pasangan":5}`; bila bias tidak terdefinisi tulis `"bias":null`, bukan `nan`. 2: rata-rata (0,5 + 0,5 + 0,8 + 0,7 + 9,0) / 5 = 2,3; median 0,7. Median lebih mewakili karena satu lonjakan menarik rata-rata jauh.

**Ulang berjarak.** 1: satuan dan lokasi menentukan apakah dua angka layak dibandingkan, mis. suhu di bawah naungan dan di terik berbeda. 2: 0 adalah nilai nyata, sedangkan hilang berarti tidak diketahui; menghitungnya sebagai 0 menciptakan selisih palsu. 3: dapat diunduh hanya soal akses; boleh dipakai dan dibagikan ditentukan lisensinya.

## Langkah berikutnya

Modul berikut: `c-xi2-m10` (rekap dan visualisasi), yang merangkum data per jam dan menyajikannya sebagai tabel dan grafik. Pembacaan lanjut: Open Definition 2.1 dan deed CC BY 4.0 (versi bahasa Indonesia).
