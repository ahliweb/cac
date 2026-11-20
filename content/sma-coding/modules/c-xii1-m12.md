## Untuk siapa modul ini

Modul ini untuk murid kelas XII jalur C (IoT dan robotika), minggu `C-XII1-M12` silabus v1.4: dokumentasi dan pemeliharaan (F). Prasyarat: modul `c-xii1-m11` (hukum dan etika sensor). Kamu juga memakai kalibrasi dari `c-xii1-m4` dan hasil uji dari `c-xii1-m9`.

Modul ini karangan penyusun dan disetujui pemilik program pada 2026-11-20 (keputusan lewat dialog; catatan tinjauan menjadi tindak lanjut revisi). Ia mendukung butir `F-BK-a` (alur proses pengembangan program atau produk digital) dan tidak dihitung memenuhi butir capaian pembelajaran mana pun. Keluaran minggu ini: dokumen proyek. Latihan silabusnya: panduan perakitan.

Ada dua cara mengerjakan. **Dengan papan (F):** kelompok menulis panduan perakitan untuk robotnya, lalu kelompok lain mencoba merakit hanya dari panduan itu. **Tanpa papan:** kamu menulis panduan untuk rangkaian karangan dan memakai program pembuat tabel pin di komputer. Nomor pin hanya contoh `[belum terverifikasi]` untuk papanmu.

## Keselamatan perangkat

- Papan memakai daya USB; motor memakai baterai AA/AAA yang disediakan guru lewat modul pengendali. Tidak ada listrik jaringan (220 V), baterai litium tanpa pelindung, atau pengisian daya litium oleh murid.
- Cabut baterai dan kabel USB sebelum merakit atau mengubah rangkaian; periksa polaritas. Motor tidak langsung ke pin papan. Tidak ada solder.
- Panduan yang baik **memuat** langkah keselamatan: cabut daya sebelum mengubah, uji dengan roda terangkat, dan apa yang dilakukan bila ada bagian panas atau berbau. Kelompok yang mencoba panduan mengikuti aturan yang sama.
- Tidak ada kamera atau mikrofon, dan tidak ada sensor tubuh.

## Ingat kembali

Jawab dari ingatan dulu, baru cek di kunci. Soal 1 dari `c-xii1-m4`, soal 2 dari `c-xii1-m9`, soal 3 dari `c-xii1-m11`.

1. Catatan apa yang harus ada dalam dokumen perakitan agar orang lain dapat mengulang kalibrasi sensor garis?
2. Mengapa tabel hasil uji menyimpan setiap percobaan, bukan hanya rata-ratanya?
3. Sebut dua jenis data yang tergolong data pribadi spesifik menurut UU PDP.

## Tujuan

Setelah modul ini kamu dapat:

- menulis dokumen perakitan yang dapat diikuti orang lain tanpa bertanya kepadamu;
- membuat tabel pin dari satu sumber yang sama dengan program, dan memeriksa konflik pin;
- menulis panduan pengguna singkat, termasuk langkah keselamatan;
- mencatat versi dan riwayat perubahan agar pemeliharaan dapat dilakukan orang lain.

## Prediksi dulu

Seorang murid menambahkan lampu status ke robot tanpa membuka tabel pin. Ia memakai pin 16, padahal pin itu sudah dipakai `KIRI_IN2`. **Tebak dulu, tulis jawabanmu, baru jalankan.**

1. Apa yang akan terjadi pada motor kiri saat lampu status dinyalakan?
2. Kapan sebaiknya kesalahan ini ketahuan: saat robot jalan, atau sebelum diunggah? Bagaimana?
3. Dari daftar dokumen perakitan (tujuan, komponen, tabel pin, langkah, kalibrasi, uji penerimaan, keselamatan, riwayat), bagian mana yang menurutmu paling sering dilupakan?

## Contoh terselesaikan

Dokumen proyek ada supaya orang lain, atau dirimu tiga bulan lagi, dapat merakit, memakai, dan memperbaiki robot tanpa menebak. **Dokumen perakitan** memuat: tujuan dan batas (termasuk batas keselamatan); daftar komponen dengan jumlah dan nilainya; tabel pin; langkah perakitan yang masing-masing berisi **satu aksi** dengan satu **titik periksa**; catatan kalibrasi (ambang, tanggal, cahaya, tinggi sensor, seperti pada `c-xii1-m4` dan `c-xii1-m9`); uji penerimaan; keselamatan; dan nomor versi dengan riwayat perubahan. **Panduan pengguna** lebih pendek: cara menyalakan, menjalankan, menghentikan, apa yang dilakukan bila ada yang salah, dan kapan memanggil guru.

Bagian yang paling mudah usang adalah tabel pin, karena nomor pin berubah saat rangkaian diubah. Cara menjaganya: tulis pin **sekali**, sebagai daftar bernama, dan buat tabelnya dari daftar itu. Dokumentasi Arduino-ESP32 mengingatkan bahwa sebagian GPIO punya batasan khusus dan tidak semuanya tersedia di papan, jadi lihat tata letak pin papanmu sebelum memilih. Program berikut membuat tabel dari daftar dan memeriksa pin kembar.

```cpp
// C++17 biasa, jalan di komputer. Diperiksa oleh check:module-code.
// Satu sumber kebenaran: tabel pin dokumen dibuat dari daftar pin yang sama dengan program robot.
// Nomor pin adalah CONTOH; periksa papanmu.
#include <iostream>

struct Pin {
  const char *nama;
  int nomor;
  const char *fungsi;
};

const Pin ROBOT[] = {
    {"SENSOR_1", 32, "sensor garis paling kiri (masukan analog)"},
    {"SENSOR_2", 33, "sensor garis kiri-tengah (masukan analog)"},
    {"SENSOR_3", 34, "sensor garis tengah (masukan analog)"},
    {"SENSOR_4", 35, "sensor garis kanan-tengah (masukan analog)"},
    {"SENSOR_5", 36, "sensor garis paling kanan (masukan analog)"},
    {"KIRI_IN1", 17, "arah motor kiri"},
    {"KIRI_IN2", 16, "arah motor kiri"},
    {"KIRI_PWM", 27, "kecepatan motor kiri"},
    {"KANAN_IN1", 18, "arah motor kanan"},
    {"KANAN_IN2", 19, "arah motor kanan"},
    {"KANAN_PWM", 14, "kecepatan motor kanan"},
    {"TOMBOL_BERHENTI", 4, "tombol berhenti ke GND"},
    {"TOMBOL_MULAI", 5, "tombol mulai ke GND"},
};

// Mencari dua pin yang memakai nomor sama. Mengembalikan true dan mengisi a dan b bila ada.
bool adaKembar(const Pin *p, int n, int &a, int &b) {
  for (int i = 0; i < n; i++) {
    for (int j = i + 1; j < n; j++) {
      if (p[i].nomor == p[j].nomor) {
        a = i;
        b = j;
        return true;
      }
    }
  }
  return false;
}

void laporkan(const Pin *p, int n) {
  int a = 0;
  int b = 0;
  if (adaKembar(p, n, a, b)) {
    std::cout << "KONFLIK: " << p[a].nama << " dan " << p[b].nama << " memakai pin " << p[a].nomor << "\n";
  } else {
    std::cout << "tidak ada pin kembar (" << n << " pin)\n";
  }
}

int main() {
  const int jumlah = sizeof(ROBOT) / sizeof(ROBOT[0]);
  std::cout << "| nama | pin | fungsi |\n";
  std::cout << "| --- | --- | --- |\n";
  for (const Pin &p : ROBOT) {
    std::cout << "| " << p.nama << " | " << p.nomor << " | " << p.fungsi << " |\n";
  }
  laporkan(ROBOT, jumlah);

  // Percobaan: seseorang menambah LED status tanpa memeriksa tabel.
  const Pin percobaan[] = {{"KIRI_IN2", 16, "arah motor kiri"}, {"LED_STATUS", 16, "lampu tanda keadaan"}};
  laporkan(percobaan, 2);
}
```

Keluaran program:

```text
| nama | pin | fungsi |
| --- | --- | --- |
| SENSOR_1 | 32 | sensor garis paling kiri (masukan analog) |
| SENSOR_2 | 33 | sensor garis kiri-tengah (masukan analog) |
| SENSOR_3 | 34 | sensor garis tengah (masukan analog) |
| SENSOR_4 | 35 | sensor garis kanan-tengah (masukan analog) |
| SENSOR_5 | 36 | sensor garis paling kanan (masukan analog) |
| KIRI_IN1 | 17 | arah motor kiri |
| KIRI_IN2 | 16 | arah motor kiri |
| KIRI_PWM | 27 | kecepatan motor kiri |
| KANAN_IN1 | 18 | arah motor kanan |
| KANAN_IN2 | 19 | arah motor kanan |
| KANAN_PWM | 14 | kecepatan motor kanan |
| TOMBOL_BERHENTI | 4 | tombol berhenti ke GND |
| TOMBOL_MULAI | 5 | tombol mulai ke GND |
tidak ada pin kembar (13 pin)
KONFLIK: KIRI_IN2 dan LED_STATUS memakai pin 16
```

Bacalah dengan jujur. Pemeriksa hanya menemukan **pin yang sama**; ia tidak tahu apakah pin itu cocok untuk fungsinya (misalnya tidak semua pin bisa membaca analog). Tabelnya benar selama daftar pin di program dan daftar di dokumen berasal dari sumber yang sama; bila kamu mengetik tabel di tempat lain, tabel itu akan usang. Uji penerimaan adalah apa yang membuktikan rakitan benar: misalnya "dengan roda terangkat, tombol mulai membuat kedua roda berputar maju, dan tombol berhenti menghentikannya". Tanpa uji penerimaan, "sudah dirakit" hanya klaim.

Contoh bentuk dokumen (kerangka, bukan isi nyata):

```text
Dokumen perakitan robot pengikut garis, versi 0.2 (riwayat di bagian akhir)
1. Tujuan dan batas      2. Komponen (jumlah, nilai, sumber lembar data)
3. Tabel pin (dibuat dari daftar pin program)
4. Langkah 1: cabut daya. Titik periksa: tidak ada lampu menyala.
   Langkah 2: pasang sensor garis ke pin 32 sampai 36. Titik periksa: nilai berubah saat digeser.
5. Kalibrasi (tanggal, cahaya, tinggi sensor, ambang)
6. Uji penerimaan   7. Keselamatan   8. Pemeliharaan dan riwayat perubahan
```

## Contoh setengah jadi

Lengkapi `____` pada `adaKembar`: bandingkan setiap pin hanya dengan pin sesudahnya, supaya tidak membandingkan pin dengan dirinya sendiri atau memeriksa pasangan dua kali.

```cpp setengah-jadi
// C++17. Lengkapi bagian ____.
bool adaKembar(const Pin *p, int n, int &a, int &b) {
  for (int i = 0; i < n; i++) {
    for (int j = ____; j < n; j++) {
      if (p[i].____ == p[j].nomor) { a = i; b = ____; return true; }
    }
  }
  return false;
}
```

## Soal Parsons

Susun baris-baris di bawah (sudah diacak) menjadi pencetak tabel pin dari daftar. Judul dan pemisah tabel dicetak sebelum baris data.

```text
(a)   std::cout << "| " << p.nama << " | " << p.nomor << " | " << p.fungsi << " |\n";
(b) std::cout << "| --- | --- | --- |\n";
(c) for (const Pin &p : ROBOT) {
(d) std::cout << "| nama | pin | fungsi |\n";
(e) }
```

## Latihan

1. `AI: tanpa AI` **Perbaiki langkah.** Perbaiki langkah ini menjadi langkah yang dapat diikuti: "Pasang semua sensor dan motor lalu coba jalankan." Tulis paling sedikit empat langkah, masing-masing dengan satu aksi dan satu titik periksa.
2. `AI: boleh` **Konflik pin.** Ubah `TOMBOL_MULAI` menjadi pin 4. Prediksikan dulu keluaran pemeriksa, lalu jalankan.
3. `AI: boleh` **Panduan perakitan (F).** Tulis panduan perakitan satu halaman untuk robotmu, lalu minta kelompok lain merakit hanya dari panduan itu; catat langkah yang membuat mereka bertanya. Tanpa papan, tulis panduan untuk rangkaian karangan dengan tabel pin dari program.
4. `AI: tanpa AI` **Panduan pengguna.** Tulis panduan pengguna lima baris: menyalakan, menjalankan, menghentikan, bila ada bagian panas atau berbau, dan kapan memanggil guru.
5. *Opsional:* **catatan pemakaian AI.** Bila memakai AI generatif, kerjakan nomor 4 sendiri dulu, lalu minta kritik atas panduanmu, bukan panduan jadi. Catat alatnya, tujuanmu, garis besar perintahmu, bagian yang kamu pakai, dan cara memeriksanya. Jangan menaruh data pribadi pada perintah.

## Latihan bercampur

1. Pada `c-xii1-m10` ada lembar periksa daya. Di bagian mana dokumen perakitan ia diletakkan, dan mengapa angkanya perlu tanggal dan sumbernya?
2. Pada `c-xii1-m11` kamu menulis catatan kepatuhan. Apa yang harus ada di panduan pengguna agar orang lain tidak menambah sensor yang merekam orang?

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `C-XII1-M13` (sekitar satu minggu lagi), `C-XII2-M1` (sekitar tiga minggu lagi), dan `C-XII2-M6` (sekitar delapan minggu lagi). Jawab sekarang lalu simpan.

1. Apa yang membuktikan sebuah rakitan benar, selain "sudah dipasang"?
2. Sebut tiga isi tabel pin pada dokumen perakitan.
3. Mengapa dokumen perlu nomor versi dan riwayat perubahan?

## Kesalahan umum

- **Mengetik tabel pin terpisah dari program.** Salah satunya akan usang tanpa ada yang tahu.
- **Satu langkah berisi banyak aksi.** Pembaca tidak tahu di mana ia salah.
- **Langkah tanpa titik periksa.** Kesalahan baru ketahuan di akhir.
- **Menulis hanya untuk dirimu sendiri.** Uji panduan dengan orang lain yang tidak ikut merakit.
- **Melupakan keselamatan dan versi.** Pembaca baru tidak tahu apa yang boleh dilakukan dan apa yang berubah.

## Cek mandiri

- [ ] Saya menulis langkah dengan satu aksi dan satu titik periksa.
- [ ] Saya membuat tabel pin dari sumber yang sama dengan program.
- [ ] Saya menulis uji penerimaan yang dapat dilihat hasilnya.
- [ ] Saya mencatat versi dan riwayat perubahan.
- [ ] Saya meminta orang lain mencoba panduanku.

## Kunci dan petunjuk

**Ingat kembali.** 1: tanggal, cahaya ruangan, tinggi sensor dari lantai, nilai terkecil dan terbesar tiap sensor, ambang yang dipakai, dan siapa atau program versi berapa yang mengukurnya. 2: dari tiap percobaan orang lain dapat menghitung ulang nilai terburuk dan percobaan yang aneh; rata-rata menghilangkannya. 3: contoh: data kesehatan, data biometrik, data anak (Pasal 4 ayat 2).

**Prediksi dulu.** 1: kedua kegunaan pin 16 saling mengganggu: lampu menyala atau padam bersama arah motor kiri, sehingga motor berperilaku aneh. 2: sebelum diunggah, dengan pemeriksa pin kembar yang berjalan pada daftar pin; setelah robot jalan, penyebabnya sulit dilacak. 3: tidak ada kunci tunggal; contoh yang sering lupa: uji penerimaan dan riwayat perubahan.

**Contoh setengah jadi.** Isian berurutan: `i + 1`, `nomor`, `j`. Kunci dikompilasi dan dijalankan penulis dengan keluaran yang sama dengan contoh terselesaikan.

**Soal Parsons.** Urutan benar: d, b, c, a, e. Judul dan pemisah sebelum perulangan; baris data di dalam perulangan.

**Latihan.** 1: contoh: (1) cabut daya; titik periksa: tidak ada lampu menyala. (2) pasang sensor garis ke pin 32 sampai 36; titik periksa: nilai berubah saat digeser. (3) pasang pengendali motor ke motor kiri dan kanan; titik periksa: kabel tidak longgar saat ditarik pelan. (4) pasang daya dan jalankan dengan roda terangkat; titik periksa: roda berputar maju saat tombol mulai ditekan. 2: pemeriksa mencetak `KONFLIK: TOMBOL_BERHENTI dan TOMBOL_MULAI memakai pin 4`, lalu baris percobaan tetap melaporkan konfliknya sendiri. 3: tidak ada kunci tunggal; panduan yang baik membuat pembaca baru dapat merakit tanpa bertanya, dan catatan kelompok lain menunjukkan langkah yang perlu dipecah. 4: contoh: nyalakan hanya dengan baterai yang disediakan guru; tekan mulai; tekan berhenti atau cabut daya; bila panas atau berbau cabut daya dan panggil guru; langkah di luar panduan ditanyakan ke guru.

**Latihan bercampur.** 1: di bagian komponen atau daya; angka dari contoh atau lembar data dapat berubah (seri baterai, versi komponen), sehingga pembaca perlu tahu dari mana dan kapan angka itu. 2: larangan merekam orang beserta alasannya, dan bahwa sensor baru harus ditinjau dulu bersama guru.

**Ulang berjarak.** 1: uji penerimaan yang hasilnya terlihat, misalnya roda terangkat berputar maju saat tombol ditekan dan berhenti saat tombol berhenti ditekan. 2: nama, nomor pin, dan fungsi (boleh ditambah arah atau keterangan analog). 3: orang lain dapat tahu bagian mana yang berubah, kapan, dan mengapa, sehingga perbaikan dan pemeliharaan tidak menebak.

## Langkah berikutnya

Modul berikut: `C-XII1-M13` (proyek: rencana proyek akhir). Bacaan lanjut: dokumentasi GPIO Arduino-ESP32 dan Panduan Mata Pelajaran Informatika (lihat Rujukan).
