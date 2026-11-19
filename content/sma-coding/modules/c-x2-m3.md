## Untuk siapa modul ini

Modul ini untuk murid kelas X jalur C (IoT dan robotika), minggu `C-X2-M3` silabus v1.3: data berkualitas dari sensor. Prasyarat: modul `c-x2-m2` (membaca sensor).

Modul ini berstatus DRAF: karangan penyusun, belum ditinjau pemilik. Ia mendukung butir `E-BK-b` (proses komputasi manusia untuk data berkualitas) dan tidak dihitung memenuhi butir capaian pembelajaran mana pun. Keluaran minggu ini: tabel data bersih. Latihan silabusnya: validasi rentang dan menandai lonjakan palsu.

Minggu ini tidak bertanda (F): semua bagian pokok dikerjakan **tanpa papan**, dengan kertas dan program di komputer. Bila kamu mencoba dengan papan, ikuti aturan keselamatan modul sebelumnya (daya USB saja, cabut kabel sebelum mengubah rangkaian). Semua angka di modul ini karangan.

## Ingat kembali

Jawab dari ingatan dulu, baru cek di kunci. Soal 1 dari `c-x1-m9`, soal 2 dari `c-x2-m2`, soal 3 dari `c-x2-m1`.

1. Beri satu contoh keputusan sehari-hari yang memakai "dan" dan satu yang memakai "atau", lalu tulis dengan `&&` atau `||`.
2. Apa arti `isnan(suhu)` bernilai benar, dan mengapa nilai itu tidak boleh langsung dicetak sebagai suhu?
3. Sebutkan tiga jenis galat (kompilasi, logika, rangkaian) beserta satu gejala masing-masing.

## Tujuan

Setelah modul ini kamu dapat:

- memeriksa apakah sebuah pembacaan berada dalam rentang yang masuk akal;
- mengenali derau, lonjakan palsu, nilai di luar rentang, dan data hilang pada deretan pembacaan;
- menulis aturan membuang atau menandai data ganjil, dan menyimpan alasan setiap keputusan;
- menjelaskan peran manusia dalam data berkualitas: menentukan batas, memeriksa dengan alat acuan, dan mencatat;
- menghasilkan tabel data bersih (keluaran minggu ini).

## Prediksi dulu

Aturan: kelembapan harus antara 0 dan 100 persen; bila selisih dengan **nilai baik terakhir** lebih dari 10, pembacaan ditandai sebagai lonjakan dan tidak diterima. **Tebak dulu, tulis jawabanmu, baru telusuri.**

```text
55, 56, 120, 57, 58, 79, 58, -3
```

1. Pembacaan mana yang dibuang dan mana yang ditandai?
2. Berapa pembacaan yang tersisa sebagai data bersih?
3. Mengapa 79 ditandai, bukan langsung dibuang?

## Contoh terselesaikan

Data berkualitas berarti data yang bisa dipercaya untuk keputusan. Sensor tidak menjamin itu. Ada empat masalah yang sering muncul. **Nilai di luar rentang:** angka yang mustahil, seperti kelembapan 120 persen, atau nilai penanda gagal yang dipakai pustaka tertentu (baca dokumentasinya). **Data hilang:** pembacaan gagal dan nilainya NaN. **Derau:** variasi kecil acak di sekitar nilai sebenarnya, wajar dan tidak dibuang. **Lonjakan palsu:** satu nilai yang melompat jauh lalu kembali, sering karena sambungan longgar atau gangguan sesaat.

Pemeriksaan dilakukan berurutan. Pertama rentang: `dalamRentang()` memakai `&&` karena nilai harus bukan NaN **dan** tidak di bawah batas bawah **dan** tidak di atas batas atas. Kedua lonjakan: bandingkan dengan nilai baik terakhir, bukan dengan pembacaan mentah sebelumnya, karena satu pembacaan buruk tidak boleh merusak pembanding. Terakhir, catat keputusan dan alasannya supaya orang lain dapat memeriksa ulang.

Mengapa ini disebut proses komputasi manusia? Program menjalankan aturan, tetapi **manusia** yang menentukan aturannya: batas rentang diambil dari lembar data dan pengamatan, bukan ditebak; sensor dibandingkan dengan alat acuan yang kamu percaya; dua pengamat mencatat sendiri-sendiri lalu mencocokkannya; dan kamu menulis keputusan untuk data yang meragukan.

```cpp
// C++17 biasa, jalan di komputer. Diperiksa oleh check:module-code.
#include <cmath>
#include <iostream>

const float SUHU_MIN = -10.0f;      // contoh rentang; ikuti lembar data sensormu
const float SUHU_MAX = 50.0f;
const float LONJAKAN_MAKS = 3.0f;   // contoh; tentukan dari pengamatanmu

bool dalamRentang(float x) {
  return !std::isnan(x) && x >= SUHU_MIN && x <= SUHU_MAX;
}

int main() {
  // Data karangan: satu baris per pembacaan tiap detik.
  const float MENTAH[] = {28.1f, 28.3f, 28.2f, 85.0f, 28.4f, -999.0f, 28.6f, 31.9f, 28.5f, NAN};
  const int JUMLAH = 10;
  float terakhirBaik = NAN;
  int bersih = 0;

  for (int i = 0; i < JUMLAH; i++) {
    float x = MENTAH[i];
    const char* keputusan;
    if (!dalamRentang(x)) {
      keputusan = "buang (di luar rentang)";
    } else if (!std::isnan(terakhirBaik) && std::fabs(x - terakhirBaik) > LONJAKAN_MAKS) {
      keputusan = "tandai (lonjakan)";
    } else {
      keputusan = "terima";
      terakhirBaik = x;
      bersih++;
    }
    std::cout << i + 1 << ": " << x << " -> " << keputusan << "\n";
  }
  std::cout << "bersih: " << bersih << " dari " << JUMLAH << "\n";
}
```

Keluarannya:

```text
1: 28.1 -> terima
2: 28.3 -> terima
3: 28.2 -> terima
4: 85 -> buang (di luar rentang)
5: 28.4 -> terima
6: -999 -> buang (di luar rentang)
7: 28.6 -> terima
8: 31.9 -> tandai (lonjakan)
9: 28.5 -> terima
10: nan -> buang (di luar rentang)
bersih: 6 dari 10
```

Tabel data bersihnya berisi pembacaan 1, 2, 3, 5, 7, dan 9. Pembacaan 8 (31,9) ditandai, bukan dibuang: selisihnya 3,3 dari nilai baik terakhir (28,6) memang melewati batas 3,0, tetapi satu angka belum cukup untuk memutuskan apakah itu gangguan atau perubahan nyata. Karena itu aturan menandai dan mencatatnya.

## Contoh setengah jadi

Sekarang sebagian diisi olehmu. Tujuannya: dua fungsi pemeriksa yang memakai batas sebagai parameter. Lengkapi bagian `____`.

```cpp setengah-jadi
// C++17 biasa. Lengkapi bagian ____.
#include <cmath>

bool dalamRentang(float x, float terendah, float tertinggi) {
  return !std::isnan(x) && x >= ____ && x <= ____;
}

bool lonjakan(float x, float terakhirBaik, float batas) {
  return std::fabs(x - ____) > ____;
}
```

## Soal Parsons

Susun baris-baris di bawah (sudah diacak) menjadi potongan keputusan untuk satu pembacaan `x`.

```text
(a)   } else {
(b)     keputusan = "terima";
(c)   if (!dalamRentang(x)) {
(d)     keputusan = "buang";
(e)   }
```

## Latihan

1. `AI: boleh` **Pseudocode dulu.** Tulis pseudocode lalu programnya untuk memeriksa kelembapan: rentang 0 sampai 100, lonjakan lebih dari 10 dari nilai baik terakhir. Uji dengan data di bagian Prediksi.
2. `AI: tanpa AI` **Telusuri.** Data suhu 27,0; 27,2; 40,5; 27,3; 27,4 dengan rentang -10 sampai 50 dan batas lonjakan 3,0. Tulis keputusan tiap pembacaan dan jumlah data bersih.
3. `AI: tanpa AI` **Rancang aturan.** Pembacaannya 28, 28, 35, 35, 35, 35. Dengan aturan di atas, apa yang terjadi pada keempat angka 35, dan bagaimana kamu mengubah aturan agar perubahan nyata tidak terus ditolak?
4. `AI: boleh` **Rencana pemeriksaan.** Tulis tiga langkah memeriksa sensormu terhadap alat acuan, termasuk selisih yang kamu terima dan dasarnya.
5. *Opsional:* **catatan pemakaian AI.** Bila memakai AI generatif, jawab nomor 1 sendiri dulu, lalu minta penjelasan atau petunjuk bertahap, bukan program jadi. Catat alatnya, tujuanmu, garis besar perintahmu, bagian yang kamu pakai, dan cara memeriksanya (jalankan atau telusuri). Jangan menaruh data pribadi atau tugas bernilai pada perintah.

## Latihan bercampur

1. Pembacaan 28,7 dan 28,2 disimpan ke variabel `int`. Apa yang tersimpan, dan apa akibatnya pada pemeriksa lonjakan berbatas 0,5?
2. `dalamRentang` ditulis dengan `||` sebagai pengganti `&&` di antara kedua batas. Apa akibatnya?
3. Dari 10 pembacaan, 6 lolos. Berapa persen data bersih, dengan aturan bilangan bulat?

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `c-x2-m4` (sekitar satu minggu lagi), `c-x2-m6` (sekitar tiga minggu lagi), dan `c-x2-m11` (sekitar delapan minggu lagi). Jawab sekarang lalu simpan.

1. Tulis `dalamRentang` untuk nilai 0 sampai 100 memakai `&&`.
2. Bagaimana membedakan lonjakan palsu dari perubahan nyata?
3. Sebut dua cara memeriksa bahwa sensormu membaca dengan benar tanpa bergantung pada program.

## Kesalahan umum

- **Membuang data tanpa mencatat alasan.** Orang lain, dan dirimu minggu depan, tidak bisa memeriksa keputusannya.
- **Menganggap setiap lonjakan palsu.** Kadang suhu memang berubah; menandai lalu memeriksa lebih aman daripada langsung membuang.
- **Menebak batas rentang.** Ambil dari lembar data dan pengamatanmu sendiri.
- **Mengira data bersih berarti data benar.** Sensor yang bergeser secara konsisten tetap lolos pemeriksaan rentang dan lonjakan; hanya pembandingan dengan alat acuan yang menangkapnya.
- **Mengira komputer menilai kualitas sendiri.** Komputer hanya menjalankan aturan yang ditulis manusia.

## Cek mandiri

- [ ] Saya dapat membedakan nilai di luar rentang, data hilang, derau, dan lonjakan palsu.
- [ ] Saya dapat menulis `dalamRentang` dengan `&&`.
- [ ] Saya membandingkan dengan nilai baik terakhir, bukan pembacaan mentah sebelumnya.
- [ ] Saya mencatat alasan setiap data yang dibuang atau ditandai.
- [ ] Saya dapat menyebut dua cara memeriksa sensor dengan alat acuan.

## Kunci dan petunjuk

**Ingat kembali.** 1: contoh: boleh bermain bila tugas selesai **dan** hujan reda (`&&`); boleh naik bila punya karcis **atau** kartu (`||`). 2: pembacaan gagal dan nilainya bukan angka; mencetaknya sebagai suhu menyesatkan. 3: kompilasi: pesan galat menunjuk baris; logika: program jalan tetapi perilaku salah; rangkaian: program benar tetapi sambungan tidak sesuai rencana.

**Prediksi dulu.** 1: 120 dan -3 dibuang (di luar rentang); 79 ditandai (selisih 21 dari 58 melewati 10). 2: 5 pembacaan (55, 56, 57, 58, 58). 3: satu angka belum cukup untuk memutuskan bahwa itu gangguan; bisa saja perubahan nyata.

**Contoh setengah jadi.** Isian berurutan: `terendah`, `tertinggi`, `terakhirBaik`, `batas`. Fungsi lengkapnya dikompilasi penulis tanpa peringatan.

**Soal Parsons.** Urutan benar: c, d, a, b, e.

**Latihan.** 1: pseudocode: untuk tiap pembacaan: BILA di luar 0 sampai 100, buang; JIKA TIDAK BILA selisih dengan nilai baik terakhir > 10, tandai; JIKA TIDAK terima dan simpan sebagai nilai baik terakhir. Pada data Prediksi: 5 diterima. 2: 27,0 terima; 27,2 terima; 40,5 tandai (selisih 13,3); 27,3 terima (dibanding 27,2); 27,4 terima; bersih 4 dari 5. 3: keempat angka 35 ditandai semua karena dibanding 28 selalu selisih 7; ubah aturan: bila tiga pembacaan berturut-turut dekat satu sama lain tetapi jauh dari nilai lama, anggap kemungkinan perubahan nyata, terima, dan periksa dengan alat acuan atau guru. 4: contoh langkah: letakkan sensor dan alat acuan berdampingan; catat keduanya beberapa kali; hitung selisih rata-ratanya dan putuskan selisih yang diterima berdasarkan lembar data atau keperluanmu.

**Latihan bercampur.** 1: tersimpan 28 dan 28, sehingga selisihnya 0 dan lonjakan 0,5 tidak pernah terdeteksi; jenis tipe data yang salah menghilangkan informasi. 2: semua angka lolos, karena setiap bilangan selalu di atas batas bawah **atau** di bawah batas atas; nilai seperti 85 atau -999 tidak ditolak. 3: 6 x 100 / 10 = 60 persen.

**Ulang berjarak.** 1: `return x >= 0 && x <= 100;` dengan pemeriksaan `!isnan(x)` bila perlu. 2: lonjakan palsu hanya satu atau dua pembacaan lalu kembali; perubahan nyata bertahan beberapa pembacaan berturut-turut dan cocok dengan alat acuan. 3: bandingkan dengan alat acuan; dua pengamat mencatat sendiri-sendiri lalu mencocokkan.

## Langkah berikutnya

Modul berikut: `c-x2-m4` (larik dan rata-rata bergerak), yang meratakan derau dengan menyimpan beberapa pembacaan terakhir. Modul terkait: `matkom-logika-proposisi` untuk logika "dan" dan "atau". Pembacaan lanjut: lembar data sensormu.

## Rujukan

- Panduan Mata Pelajaran Informatika, Fase D – F, 2025. <https://repositori.kemendikdasmen.go.id/33634/1/32.%20Panduan%20Mata%20Pelajaran%20Informatika.pdf>
- Espressif, dokumentasi Arduino-ESP32: ADC (pembacaan masukan analog). <https://docs.espressif.com/projects/arduino-esp32/en/latest/api/adc.html>
