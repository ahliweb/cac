## Untuk siapa modul ini

Modul ini untuk murid kelas XII jalur C (IoT dan robotika), minggu `C-XII1-M14` silabus v1.4: asesmen dan refleksi semester 1. Prasyarat terindeks: `c-xii1-m8` sampai `c-xii1-m13` dari batch ini, ditambah materi `C-XII1-M1` sampai `C-XII1-M7` yang belum terindeks saat modul ini ditulis; modul ini menilai semuanya.

Modul ini karangan penyusun dan disetujui pemilik program pada 2026-11-20 (keputusan lewat dialog; catatan tinjauan menjadi tindak lanjut revisi), dan tidak dihitung memenuhi butir capaian pembelajaran mana pun. Asesmen ini **tanpa AI**: jangan memakai AI generatif saat mengerjakannya (silabus 7.4). Bobot nilai dan predikat mengikuti kebijakan sekolah `[belum terverifikasi]`; modul ini hanya memberi soal dan kunci latihan.

Bagian praktik dapat dikerjakan **dengan papan (F)** atau **tanpa papan** di kertas dan komputer. Bila memakai papan, ikuti aturan keselamatan modul sebelumnya: daya USB atau baterai AA/AAA yang disediakan guru, cabut daya sebelum mengubah rangkaian, uji dengan roda terangkat, dan pemutus daya diketahui letaknya.

## Ingat kembali

Ini inti asesmen: jawab dari ingatan, tanpa melihat catatan, lalu cocokkan dengan kunci. Soal 1 dari `c-xii1-m6`, soal 2 dari `c-xii1-m11`, soal 3 dari `c-xii1-m13`, soal 4 dari `c-xii1-m9`, soal 5 dari `c-xii1-m10`.

1. Sebut dua ukuran yang dipakai untuk menilai pengikut garis dan satu kelemahan masing-masing.
2. Kapan data dari sensor yang tampak biasa, seperti log jarak, menjadi data pribadi?
3. Sebut bagian-bagian rencana proyek yang membuat kemajuan dapat diperiksa.
4. Mengapa kedua strategi memakai benih atau titik awal yang sama pada tiap percobaan?
5. Mengapa BERHENTI karena baterai lemah terkunci sampai manusia membukanya?

## Tujuan

Yang dinilai pada asesmen ini:

- membandingkan dan memilih strategi dengan syarat wajib dan peringkat yang ditulis lebih dulu;
- merancang dan meringkas uji berulang, termasuk nilai terburuk;
- menghitung tegangan baterai dan memeriksa daya, serta menyebut aturan keselamatan baterai;
- memutuskan fitur sensor menurut pokok UU PDP dan aturan kelas;
- menulis dokumentasi dan rencana proyek yang dapat diperiksa orang lain.

## Latihan bercampur

Semua soal **tanpa AI**.

1. **Tulis.** Empat strategi karangan diuji pada lintasan yang sama dengan hasil berikut. Pilih pemenang dengan syarat wajib "selesai, garis tidak hilang, simpangan terbesar paling banyak batas", lalu tick tempuh terkecil. Siapa pemenang bila batas 20 mm, dan bila batas 25 mm? Jelaskan mengapa berubah.

   | Strategi | Tick tempuh | Simpangan terbesar (mm) | Tick hilang | Selesai |
   | --- | --- | --- | --- | --- |
   | A | 52 | 14 | 0 | ya |
   | B | 47 | 22 | 0 | ya |
   | C | 44 | 31 | 0 | ya |
   | D | 50 | 18 | 1 | ya |

2. **Telusuri.** Program berikut memantau baterai. Tulis keluarannya di kertas **sebelum** menjalankannya, lalu jelaskan satu hal yang perlu diperbaiki pada rancangan pembaginya jika baterai baru bertegangan 6400 mV dan batas aman di pin 3100 mV.

```cpp
// C++17 biasa. Telusuri dulu di kertas, baru jalankan. Angka contoh karangan.
#include <iostream>

const int R1 = 10000;
const int R2 = 10000;

int mvBaterai(int mvPin) { return mvPin * (R1 + R2) / R2; }

int main() {
  int bacaan[] = {2400, 2300, 2100};
  for (int mvPin : bacaan) {
    int mv = mvBaterai(mvPin);
    std::cout << mvPin << " -> " << mv << (mv < 4600 ? " BERHENTI" : mv < 5200 ? " LEMAH" : " NORMAL") << "\n";
  }
}
```

3. **Uji berulang.** Dua strategi diuji sepuluh kali dengan rata-rata simpangan terbesar yang hampir sama, tetapi terburuk 27 mm lawan 25 mm, dan batas kebutuhan 25 mm. Tulis dua kalimat laporan yang jujur dan satu uji tambahan yang kamu usulkan.
4. **Hukum dan etika.** Beri putusan DITOLAK, TINJAU, KURANGI, atau LOLOS, dengan satu alasan: (a) mikrofon yang merekam suara penonton pameran; (b) log lari berisi nama dan jam; (c) sensor suhu ruang tanpa pengenal.
5. **Proyek.** Dari masalah karangan "kotak komponen sering jatuh saat dipindahkan", tulis dua kebutuhan terukur dan satu kriteria selesai yang dapat gagal.
6. **Praktik (F).** Dengan roda terangkat, tunjukkan kalibrasi satu sensor garis (nilai terkecil, terbesar, ambang), dan jelaskan tiga langkah panduan perakitannya. Tanpa papan, tulis ketiga langkah itu untuk rangkaian karangan dengan satu titik periksa tiap langkah.

## Refleksi

Tulis di bukumu sendiri; jawaban tidak dikumpulkan di repositori ini dan tidak memuat data pribadi.

1. Bagian mana dari semester ini yang sudah kamu kuasai, dan buktinya apa (soal yang benar tanpa melihat catatan)?
2. Soal mana yang masih keliru atau hanya benar karena menebak? Apa penyebabnya?
3. Apa satu kebiasaan dari semester ini yang akan kamu pakai pada proyek akhir, dan satu yang harus kamu ubah?
4. Apa rencana belajarmu untuk dua minggu pertama semester berikutnya, dengan jadwal ulang ingatan yang berjarak?

## Cek mandiri

- [ ] Saya memilih strategi dengan syarat wajib yang ditulis lebih dulu.
- [ ] Saya meringkas uji berulang dengan rata-rata dan nilai terburuk.
- [ ] Saya menghitung tegangan baterai dengan mengalikan dulu dan memeriksa batas pin.
- [ ] Saya memutuskan fitur sensor dan menyebut alasannya.
- [ ] Saya menulis kebutuhan dan kriteria yang dapat gagal.
- [ ] Saya menulis refleksi dengan bukti, bukan perasaan.

## Kunci dan petunjuk

**Ingat kembali.** 1: ukuran: rata-rata |x| (kelemahan: menyembunyikan simpangan sesaat yang besar), simpangan terbesar (kelemahan: satu lonjakan menentukan seluruhnya), dan pergantian arah (kelemahan: tidak menunjukkan seberapa jauh dari garis). 2: bila disandingkan dengan informasi lain, seperti nama, jam, atau tempat, sehingga seseorang dapat diidentifikasi. 3: masalah dan pengguna, kebutuhan terukur, rancangan, kriteria selesai, prediksi, rencana kerja, dan risiko dengan pencegahan dan peran. 4: supaya selisih hasil berasal dari strategi, bukan dari titik awal atau derau yang berbeda. 5: baterai yang melemah tidak berubah menjadi sehat dengan sendirinya; membuka sendiri membuat robot jalan lagi lalu mati di tengah lintasan, dan penyebab perlu diperiksa manusia.

**Latihan bercampur.** 1: batas 20 mm: A lolos (14), B dicoret (22), C dicoret (31), D dicoret (garis hilang satu tick), jadi A menang walau paling lambat; batas 25 mm: A dan B lolos, B lebih cepat (47 lawan 52), jadi B menang; syarat mengubah siapa yang boleh bersaing. 2: keluaran: `2400 -> 4800 LEMAH`, `2300 -> 4600 LEMAH` (4600 bukan di bawah 4600, jadi nilai batas masuk LEMAH), `2100 -> 4200 BERHENTI`; pembagi 10 kOhm dan 10 kOhm membuat pin menerima setengah tegangan: 6400 x 10000 / 20000 = 3200 mV, melewati 3100 mV; ganti R1 menjadi 20 kOhm sehingga pin menerima sepertiga (2133 mV). 3: contoh laporan: "Rata-rata kedua strategi hampir sama, tetapi strategi pertama melampaui batas 25 mm pada satu dari sepuluh uji dan strategi kedua tidak. Dengan sepuluh uji kesimpulan ini masih lemah." Uji tambahan: lebih banyak uji dengan benih berbeda, atau lintasan lain. 4: (a) DITOLAK: merekam orang; (b) TINJAU: nama dan jam dapat mengidentifikasi seseorang; (c) LOLOS: tanpa pengenal. 5: contoh kebutuhan: "kotak 300 gram terangkut 2 m tanpa jatuh pada 10 dari 10 lari" dan "waktu angkut paling lama 40 detik"; kriteria selesai: "10 lari berturut-turut tanpa jatuh". 6: tidak ada kunci tunggal; kalibrasi benar bila ambang di tengah antara nilai terkecil dan terbesar dan kontras cukup, dan langkah panduan masing-masing satu aksi dengan satu titik periksa.

**Refleksi.** Tidak ada kunci. Rubrik singkat: jawaban baik menyebut bukti (soal yang benar atau salah), penyebab yang spesifik, dan rencana yang punya jadwal; jawaban yang hanya "sudah paham" belum cukup.

## Langkah berikutnya

Modul berikut: `C-XII2-M1` (pemeliharaan program I), belum terindeks saat modul ini ditulis. Bacaan lanjut: Panduan Mata Pelajaran Informatika (lihat Rujukan).
