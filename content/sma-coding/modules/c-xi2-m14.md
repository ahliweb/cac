## Untuk siapa modul ini

Modul ini untuk murid kelas XI jalur C (IoT dan robotika), minggu `C-XI2-M14` silabus v1.4: asesmen dan refleksi semester 2. Prasyarat: modul `c-xi2-m12` dan seluruh materi semester ini, `C-XI2-M1` sampai `C-XI2-M13`; modul ini menilai semuanya. Modul semester ini yang di luar batch ini belum terindeks saat modul ini ditulis, jadi tidak ditulis sebagai prasyarat resmi.

Modul ini berstatus DRAF: karangan penyusun, belum ditinjau pemilik, dan tidak dihitung sebagai pemenuhan butir capaian pembelajaran. Asesmen ini **tanpa AI**: jangan memakai AI generatif saat mengerjakannya (silabus 7.4). Bobot nilai dan predikat mengikuti kebijakan sekolah `[belum terverifikasi]`; modul ini hanya memberi soal dan kunci latihan.

Bagian praktik dapat dikerjakan **dengan papan dan jaringan lab** bila tersedia, atau **tanpa papan** di kertas dan komputer. Bila memakai papan, ikuti aturan keselamatan modul sebelumnya: daya USB atau baterai AA/AAA yang disediakan guru, cabut daya sebelum mengubah rangkaian, kipas hanya lewat modul pengendali, dan hanya jaringan lab. Jangan menempelkan sandi atau kunci ke berkas yang kamu kumpulkan.

## Ingat kembali

Ini inti asesmen: jawab dari ingatan, tanpa melihat catatan, lalu cocokkan dengan kunci. Soal 1 dari `C-XI2-M6`, soal 2 dari `C-XI2-M2`, soal 3 dari `C-XI2-M8`, soal 4 dari `C-XI2-M11`, soal 5 dari `C-XI2-M13`.

1. Mengapa papan berlangganan ulang setelah tersambung kembali ke broker?
2. Sebut tiga hal yang tidak boleh ditempel ke layanan AI.
3. Mengapa "papan tersambung ke Wi-Fi" belum berarti "data sampai ke penerima"?
4. Mengapa galat prediksi harus dihitung hanya dari data sebelum titik yang diprediksi?
5. Beri satu contoh kriteria selesai yang dapat diuji untuk sistem kipas, dan satu yang tidak dapat diuji.

## Tujuan

Soal di modul ini menilai apakah kamu dapat:

- menjelaskan pola publikasi-langganan dan mencocokkan topik dengan filter `+` dan `#`;
- menyusun dan memeriksa pesan JSON, termasuk nilai hilang, dan menentukan jaringan dari alamat dan awalan;
- menjaga kredensial dan memakai layanan AI dengan aman (tanpa menempelkan rahasia);
- menilai sumber data, merekap, memprediksi, dan menghitung galatnya dengan jujur;
- mengambil keputusan alat dengan histeresis dan keadaan aman, serta mendiagnosis gangguan jaringan secara berurutan.

## Latihan bercampur

Kerjakan sendiri, `AI: tanpa AI`, dengan waktu yang ditetapkan gurumu.

1. **Tulis.** Susun pesan JSON untuk pembacaan sensor `s03`, suhu 31,3, pada detik 210, dan untuk pembacaan `s03` yang gagal dibaca pada detik 215. Berapa karakter panjang pesan yang pertama? Mengapa `nan` tidak boleh dipakai?
2. **Telusuri.** Program berikut dijalankan. Tulis empat baris yang tercetak (`ya` atau `tidak`) dan jelaskan satu baris yang hasilnya `tidak`.

```cpp
// C++17 biasa, jalan di komputer. Diperiksa oleh check:module-code.
#include <iostream>
#include <string>
#include <vector>

std::vector<std::string> pecah(const std::string &s) {
  std::vector<std::string> hasil;
  std::string kini;
  for (char c : s) {
    if (c == '/') {
      hasil.push_back(kini);
      kini.clear();
    } else {
      kini += c;
    }
  }
  hasil.push_back(kini);
  return hasil;
}

// Apakah topik cocok dengan filter? '+' = tepat satu tingkat; '#' = sisanya, hanya di akhir.
bool cocok(const std::string &filter, const std::string &topik) {
  std::vector<std::string> f = pecah(filter);
  std::vector<std::string> t = pecah(topik);
  size_t j = 0;
  for (size_t i = 0; i < f.size(); i++) {
    if (f[i] == "#") return i == f.size() - 1;
    if (j >= t.size()) return false;
    if (f[i] != "+" && f[i] != t[j]) return false;
    j++;
  }
  return j == t.size();
}

int main() {
  const std::string uji[4][2] = {{"lab/+/suhu", "lab/a/suhu"},
                                 {"lab/+/suhu", "lab/a/b/suhu"},
                                 {"lab/#", "lab/a/b/c"},
                                 {"lab/a/suhu", "lab/a"}};
  for (const auto &u : uji) {
    std::cout << u[0] << " | " << u[1] << " -> " << (cocok(u[0], u[1]) ? "ya" : "tidak") << "\n";
  }
}
```

3. **Hitung.** (a) Pembacaan jam 0: 27,0, gagal, 28,0; jam 1: 29,0 dan 30,0. Tulis jumlah sah, jumlah gagal, terkecil, rata-rata, dan terbesar tiap jam. (b) Tiga suhu terbaru 27, 28, 29 dan nilai berikutnya sebenarnya 30. Berapa tebakan rata-rata bergerak tiga nilai dan galatnya, dan berapa tebakan garis tren? (c) Kipas awalnya mati. Tebakan datang 28,9; 29,6; 29,0; 28,4 dengan batas nyala 29,5 dan batas mati 28,5: tulis keadaan kipas tiap langkah. (d) Papan `192.0.2.23` dan broker `192.0.2.200` dengan awalan `/25`: sejaringan atau tidak?
4. **Cari galat.** Potongan berikut sengaja salah untuk jam yang pembacaannya dapat bernilai `NAN`. Tulis tiga galat, jelaskan akibatnya, dan tulis perbaikannya.

```text
double rataJam(const double y[], int n) {
  double jumlah = 0;
  for (int i = 0; i < n; i++) {
    jumlah += y[i];
  }
  return jumlah / n;
}
```

5. **Diagnosis.** Tulis lapis yang diperiksa pertama dan satu tindakannya untuk tiap kasus: (a) pelanggan menerima `{"suhu":nan}`; (b) dua papan bergantian terputus dari broker dan keduanya berlangganan topik yang sama; (c) kamu menyadari sandi jaringan sempat terunggah ke tempat bersama.
6. **Praktik atau rancangan.** Dengan papan: peragakan satu pesan dari pengirim lewat broker ke penerima, lalu tunjukkan satu gangguan yang disiapkan gurumu dan diagnosismu berurutan dengan catatan. Tanpa papan: rancang sistem fiktif "pompa kecil mengisi bak": tulis spesifikasi pesan JSON, keadaan aman dengan alasannya, dan tiga kasus uji.

## Refleksi

Tulis jawabanmu di jurnalmu sendiri. Jurnal ini tidak dikumpulkan ke repositori dan tidak ada jawaban benar atau salah; yang dinilai adalah kejujuran dan rencanamu.

1. Apa dua hal yang sekarang sudah kamu kuasai? Tulis buktinya (soal mana yang kamu jawab tanpa ragu).
2. Apa satu hal yang masih keliru atau membingungkan? Soal mana yang memperlihatkannya?
3. Apa yang akan kamu lakukan berbeda minggu depan, dan kapan kamu akan mengulang bagian yang lemah?
4. Semester berikutnya kamu merancang robot dan sistem yang lebih besar. Bagian mana dari semester ini yang paling kamu perlukan, dan mengapa?

Mengulang bagian yang lemah dengan mencoba mengingat lebih dulu, lalu menjarakkan waktunya, membantu ingatan jangka panjang lebih baik daripada membaca ulang catatan.

## Cek mandiri

- [ ] Saya dapat menjelaskan publikasi-langganan dan mencocokkan topik dengan `+` dan `#`.
- [ ] Saya dapat menyusun pesan JSON dan menentukan apakah dua alamat sejaringan.
- [ ] Saya dapat menyebut hal yang tidak boleh ditempel ke layanan AI dan cara menyimpan kredensial.
- [ ] Saya dapat merekap, memprediksi, dan menghitung galat tanpa memasukkan data hilang.
- [ ] Saya dapat menelusuri keputusan histeresis dan menyebut keadaan aman yang tepat.
- [ ] Saya dapat mendiagnosis gangguan jaringan dengan urutan daya, sinyal, alamat, broker, format.

## Kunci dan petunjuk

**Ingat kembali.** 1: pustaka menyambung dengan sesi bersih secara bawaan, dan sesi bersih membuang langganan lama; tanpa berlangganan lagi papan tersambung tetapi tidak menerima apa pun. 2: sandi, kunci, atau token; data pribadi; tugas bernilai. 3: sambungan Wi-Fi hanya sampai ke titik akses; alamat, broker, dan format masih bisa salah. 4: bila titik yang diprediksi ikut dipakai saat mencocokkan, galat tampak kecil secara palsu. 5: dapat diuji: "bila suhu naik 28,6; 29,0; 29,5, kipas menyala"; tidak dapat diuji: "sistem bekerja dengan baik" karena tidak punya nilai atau perilaku yang dapat diamati.

**Latihan bercampur.** 1: `{"sensor":"s03","suhu":31.3,"detik":210}` (40 karakter) dan `{"sensor":"s03","suhu":null,"detik":215}`. `nan` bukan nilai JSON sah; nilai hilang ditulis `null`. 2: tercetak `ya`, `tidak`, `ya`, `tidak`. Contoh penjelasan: `lab/+/suhu` hanya cocok dengan tepat satu tingkat di tengah, sedangkan `lab/a/b/suhu` punya dua tingkat; atau filter `lab/a/suhu` butuh tiga tingkat dan topik `lab/a` hanya dua. Hasil dijalankan penulis. 3: (a) jam 0: sah 2, gagal 1, terkecil 27,0, rata-rata 27,5, terbesar 28,0; jam 1: sah 2, gagal 0, terkecil 29,0, rata-rata 29,5, terbesar 30,0. (b) rata-rata bergerak (27 + 28 + 29) / 3 = 28, galat |28 - 30| = 2; garis tren menebak 30. (c) mati, nyala, nyala, mati: 28,9 di dalam pita (tetap mati); 29,6 di atas 29,5 (nyala); 29,0 di dalam pita (tetap nyala); 28,4 di bawah 28,5 (mati). (d) tidak sejaringan: pada `/25`, `192.0.2.23` ada di blok 0 sampai 127 dan `192.0.2.200` di blok 128 sampai 255. 4: galat pertama: `NAN` ikut dijumlahkan sehingga hasilnya `nan`; perbaikan: lewati pembacaan hilang. Galat kedua: pembagi `n` mencakup pembacaan hilang sehingga rata-rata salah; perbaikan: hitung jumlah sah dan bagi dengan itu. Galat ketiga: `n` bernilai 0 atau semua hilang tidak dijaga; perbaikan: bila jumlah sah 0 laporkan "tidak ada data sah", bukan membagi nol. 5: (a) format; periksa pesan dengan pemeriksa JSON dan perbaiki penyusunnya agar menulis `null`. (b) broker (ID klien); cetak ID kedua papan dan beri ID yang berbeda. (c) bukan lapis jaringan; ganti sandinya, cabut yang lama, dan simpan sandi baru di luar kode yang dibagikan. 6: tidak ada kunci tunggal; lihat rubrik.

**Rubrik singkat.** Untuk soal 3(a), 4, dan 6, periksa empat hal: ketepatan (angka dan perbaikan benar), keterbacaan (nama dan konstanta jelas), pengujian (disebut cara mengujinya, termasuk data hilang, kosong, dan batas), dan justifikasi (alasan pilihan, termasuk keadaan aman). Skala yang disarankan: sudah, sebagian, belum, per hal. Untuk soal 1, 2, 3(b) sampai 3(d), dan 5, jawaban dinilai benar bila angka, isi, dan alasan sama dengan kunci.

**Refleksi.** Tidak ada kunci. Jawaban yang baik menyebut bukti, bagian yang lemah, dan rencana yang jelas waktunya.

## Langkah berikutnya

Semester berikutnya jalur C (kelas XII) dimulai dengan merancang kebutuhan sistem (`C-XII1-M1`), lalu robot. Jadikan hasil refleksi tadi rencana belajarmu sebelum minggu pertama. Modul terkait: `c-xi2-m2` (keamanan konektivitas) dan `c-xi2-m8` (diagnosis) untuk mengulang. Pembacaan lanjut: panduan mata pelajaran Informatika Fase D sampai F.
