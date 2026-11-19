## Untuk siapa modul ini

Modul ini untuk murid kelas XI jalur C (IoT dan robotika), minggu `C-XI1-M14` silabus v1.3: asesmen dan refleksi semester 1. Prasyarat: modul `c-xi1-m12` dan seluruh materi semester ini, `c-xi1-m1` sampai `c-xi1-m13`; modul ini menilai semuanya.

Modul ini berstatus DRAF: karangan penyusun, belum ditinjau pemilik, dan tidak dihitung sebagai pemenuhan butir capaian pembelajaran. Asesmen ini **tanpa AI**: jangan memakai AI generatif saat mengerjakannya (silabus 7.4). Bobot nilai dan predikat mengikuti kebijakan sekolah `[belum terverifikasi]`; modul ini hanya memberi soal dan kunci latihan.

Bagian praktik dapat dikerjakan **dengan dua papan** bila tersedia, atau **tanpa papan** di kertas dan komputer. Bila memakai papan, ikuti aturan keselamatan modul sebelumnya: daya USB saja, cabut kabel USB sebelum mengubah sambungan, GND bersama, dan jangan menyambung pin ke daya atau perangkat bertegangan lain.

## Ingat kembali

Ini inti asesmen: jawab dari ingatan, tanpa melihat catatan, lalu cocokkan dengan kunci. Soal 1 dari `c-xi1-m6`, soal 2 dari `c-xi1-m11`, soal 3 dari `c-xi1-m13`, soal 4 dari `c-xi1-m9`, soal 5 dari `c-xi1-m12`.

1. Sebut dua ukuran untuk menilai kualitas kendali hidup-mati.
2. Hitung jumlah periksa (jumlah kode karakter modulo 256) untuk isi `AB` (A = 65, B = 66).
3. Apa yang membuat sebuah kriteria selesai dapat diuji, bukan sekadar niat?
4. Pada penyangga melingkar berkapasitas 4 yang berisi 10, 20, 30, 40, nilai mana yang tertimpa saat 50 masuk?
5. Urutkan empat lapis diagnosis sambungan dari yang diperiksa pertama.

## Tujuan

Soal di modul ini menilai apakah kamu dapat:

- menguraikan kebutuhan, rancangan, implementasi, dan uji, dan menulis kasus uji yang menjaga keterbacaan;
- memakai `struct` dan membuat pustaka kecil untuk sensor;
- membandingkan ambang, histeresis, hidup-mati, dan proporsional dengan ukuran yang ditetapkan lebih dulu;
- menghitung memori dan operasi, dan memakai penyangga melingkar;
- merancang pesan berpenanda dan berjumlah periksa, serta mendiagnosis gangguan sambungan secara berurutan.

## Latihan bercampur

Kerjakan sendiri, `AI: tanpa AI`, dengan waktu yang ditetapkan gurumu.

1. **Tulis.** `Penyangga` berkapasitas 3 terdiri atas `data[3]`, `kepala`, dan `terisi`. Tulis pseudocode lalu fungsi `keluarTertua(Penyangga& b, int& nilai)` yang mengambil dan menghapus elemen tertua, dan mengembalikan `false` bila kosong.
2. **Telusuri.** Program berikut dijalankan:

   ```cpp
   // C++17 biasa, jalan di komputer. Diperiksa oleh check:module-code.
   #include <iostream>

   const int K = 3;

   struct Penyangga {
     int data[K];
     int kepala;
     int terisi;
   };

   void tambah(Penyangga& b, int nilai) {
     if (b.terisi == K) {
       b.data[b.kepala] = nilai;
       b.kepala = (b.kepala + 1) % K;
     } else {
       b.data[(b.kepala + b.terisi) % K] = nilai;
       b.terisi++;
     }
   }

   int main() {
     Penyangga b = {};
     const int masuk[] = {5, 15, 25, 35, 45};
     for (int v : masuk) {
       tambah(b, v);
     }
     for (int i = 0; i < b.terisi; i++) {
       std::cout << b.data[(b.kepala + i) % K] << " ";
     }
     std::cout << "| kepala " << b.kepala << "\n";
   }
   ```

   Apa yang tercetak? Tulis juga isi larik `data` di memori.
3. **Hitung.** (a) Jumlah periksa isi `S,7,9` dalam desimal dan heksadesimal (`S` = 83, `,` = 44, `7` = 55, `9` = 57). (b) Satu pembacaan berisi `uint32_t detik`, `int16_t suhu10`, dan `int16_t cahaya` tanpa anggota lain (8 byte): berapa byte untuk 50 pembacaan? (c) Histeresis dengan batas nyala 1900 dan batas mati 2100, lampu awalnya mati: tulis keadaan lampu (nyala atau mati) untuk pembacaan 2200, 2050, 1950, 1850, 1950, 2050, 2150, dan berapa kali ia berganti.
4. **Cari galat.** Potongan berikut sengaja salah. Tulis dua galat, jelaskan akibatnya, dan tulis perbaikannya.

   ```text
   char baris[16];
   int panjang = 0;
   void terima(char c) {
     baris[panjang] = c;
     panjang++;
     if (c == '\n') {
       proses(baris);
       panjang = 0;
     }
   }
   ```
5. **Diagnosis.** Tulis lapis yang diperiksa pertama dan satu tindakannya untuk tiap kasus: (a) papan penerima tidak menampilkan apa pun dan lampu dayanya padam; (b) penerima menerima banyak baris, tetapi hitungan `gagalPeriksa` mendekati jumlah semua baris dan `barisSah` 0.
6. **Praktik atau rancangan.** Dengan dua papan: peragakan satu pesan berjumlah periksa dari papan A ke papan B, lalu tunjukkan satu gangguan yang disiapkan gurumu dan diagnosismu berurutan. Tanpa papan: tulis spesifikasi pesan (lima bagian: penanda awal, isi, pemisah jumlah periksa, jumlah periksa, penanda akhir) untuk pesan yang membawa satu ruas tambahan, dan hitung satu contoh pesan lengkap.

## Refleksi

Tulis jawabanmu di jurnalmu sendiri. Jurnal ini tidak dikumpulkan ke repositori dan tidak ada jawaban benar atau salah; yang dinilai adalah kejujuran dan rencanamu.

1. Apa dua hal yang sekarang sudah kamu kuasai? Tulis buktinya (soal mana yang kamu jawab tanpa ragu).
2. Apa satu hal yang masih keliru atau membingungkan? Soal mana yang memperlihatkannya?
3. Apa yang akan kamu lakukan berbeda minggu depan, dan kapan kamu akan mengulang bagian yang lemah?
4. Semester berikutnya papanmu terhubung ke jaringan. Bagian mana dari semester ini yang paling kamu perlukan, dan mengapa?

Mengulang bagian yang lemah dengan mencoba mengingat lebih dulu, lalu menjarakkan waktunya, membantu ingatan jangka panjang lebih baik daripada membaca ulang catatan.

## Cek mandiri

- [ ] Saya dapat menguraikan kebutuhan, rancangan, implementasi, dan uji dengan contoh.
- [ ] Saya dapat membandingkan dua solusi dengan ukuran yang ditetapkan lebih dulu.
- [ ] Saya dapat menelusuri penyangga melingkar dan menyebut isi larik di memori.
- [ ] Saya dapat menghitung memori `struct` dan jumlah periksa.
- [ ] Saya dapat menyebut empat lapis diagnosis dan mengubah satu hal pada satu waktu.
- [ ] Saya tahu langkah keselamatan sebelum mengubah sambungan dua papan.

## Kunci dan petunjuk

**Ingat kembali.** 1: contoh: lebar ayunan dan jumlah pergantian per satuan waktu (juga boleh: lambatnya mencapai nilai acuan). 2: 65 + 66 = 131. 3: kriteria berisi nilai, kondisi, atau perilaku yang dapat diamati sehingga hasilnya jelas lulus atau gagal; "bekerja dengan baik" tidak punya ukuran. 4: nilai 10, yang tertua. 5: daya, kabel, kode, format pesan.

**Latihan bercampur.** 1: pseudocode: bila `terisi` 0 kembalikan `false`; bila tidak, ambil `data[kepala]`, majukan `kepala` menjadi `(kepala + 1) % 3`, kurangi `terisi`, kembalikan `true`. Contoh program: `bool keluarTertua(Penyangga& b, int& nilai) { if (b.terisi == 0) return false; nilai = b.data[b.kepala]; b.kepala = (b.kepala + 1) % K; b.terisi--; return true; }`. Penulis menjalankannya: setelah 5, 15, 25, 35 masuk (5 tertimpa), pemanggilan berulang mengeluarkan 15, 25, 35, lalu `false`. 2: tercetak `25 35 45 | kepala 2`. Larik `data` di memori `{35, 45, 25}`: 5 dan 15 tertimpa oleh 35 dan 45, sedangkan 25 tetap di indeks 2 dan menjadi yang tertua. 3: (a) 83 + 44 + 55 + 44 + 57 = 283, dan 283 modulo 256 adalah 27, heksadesimal `1B`. (b) 8 byte x 50 = 400 byte (ukuran struct dikonfirmasi penulis dengan `sizeof` pada komputer). (c) mati, mati, mati, nyala, nyala, nyala, mati; berganti dua kali (pada 1850 dan pada 2150); 2050 dan 1950 berada di pita sehingga keputusan tidak berubah. 4: galat pertama: tidak ada penjagaan batas; setelah 16 karakter tanpa `\n`, `baris[panjang]` menulis di luar larik; perbaikan: periksa `panjang < 15` sebelum menulis dan buang baris yang kepanjangan. Galat kedua: `\n` ikut disimpan dan tidak ada `\0` penutup, sehingga `proses` menerima teks yang tidak berakhir semestinya; perbaikan: jangan menyimpan `\n`, dan isi `baris[panjang] = '\0'` sebelum `proses`. (Juga diterima: `\r` dari `println` tidak diabaikan.) 5: (a) daya: periksa lampu daya dan kabel USB papan penerima; (b) kode: kedua sisi menghitung jumlah periksa atas bagian yang berbeda; samakan bagian yang dijumlahkan di satu sisi, lalu amati ulang. 6: tidak ada kunci tunggal; lihat rubrik.

**Rubrik singkat.** Untuk soal 1 dan 6, periksa empat hal: ketepatan (fungsi atau spesifikasi memenuhi tujuan), keterbacaan (nama dan konstanta jelas), pengujian (disebut cara mengujinya, termasuk keadaan kosong, penuh, dan pesan rusak), dan justifikasi (alasan pilihan). Skala yang disarankan: sudah, sebagian, belum, per hal. Untuk soal 2 sampai 5, jawaban dinilai benar bila angka, isi, dan alasan sama dengan kunci.

**Refleksi.** Tidak ada kunci. Jawaban yang baik menyebut bukti, bagian yang lemah, dan rencana yang jelas waktunya.

## Langkah berikutnya

Semester berikutnya jalur C (kelas XI) dimulai dengan jaringan nirkabel dan perangkat IoT: papan terhubung ke jaringan lab. Jadikan hasil refleksi tadi rencana belajarmu sebelum minggu pertama. Modul terkait: `FND-X1-M4` dan `FND-X1-M5` untuk mengulang konsep jaringan. Pembacaan lanjut: halaman Serial (UART) dokumentasi Arduino-ESP32.
