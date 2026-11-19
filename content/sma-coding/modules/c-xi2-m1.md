## Untuk siapa modul ini

Modul ini untuk murid kelas XI jalur C (IoT dan robotika), minggu `C-XI2-M1` silabus v1.4: jaringan nirkabel dan perangkat IoT (F). Prasyarat: modul `c-xi1-m7`, serta `FND-X1-M4` dan `FND-X1-M5` (konsep jaringan, alamat IP, dan urutan diagnosis). Sebaiknya kamu juga sudah mengerjakan `C-XI1-M10` sampai `C-XI1-M12` (pengiriman data antarperangkat); modul itu belum terindeks saat modul ini ditulis, jadi tidak ditulis sebagai prasyarat resmi.

Modul ini berstatus DRAF: karangan penyusun, belum ditinjau pemilik. Ia mendukung butir `E-LD-e` (keamanan dasar konektivitas jaringan; minggu ini baru tahap sambungan) dan `F-BK-d` (model jaringan, pengiriman data, dan pemecahan masalah), dan tidak dihitung memenuhi butir capaian pembelajaran mana pun. Keluaran minggu ini: papan terhubung ke jaringan lab. Latihan silabusnya: mencetak alamat IP papan.

Ada dua cara mengerjakan. **Dengan papan (F):** kelompok menghubungkan papan ESP32 ke jaringan lab yang disiapkan guru. **Tanpa papan:** kamu menghitung dengan kertas dan menjalankan program di komputer yang memeriksa apakah dua alamat berada di jaringan yang sama. Semua alamat di modul ini adalah alamat contoh; jaringan lab sungguhan memakai alamat dari gurumu.

## Keselamatan perangkat

- Papan hanya memakai daya dari kabel USB. Tidak ada listrik jaringan (220 V) dan tidak ada baterai pada modul ini.
- Papan hanya disambungkan ke **jaringan lab** yang disiapkan guru. Jangan menyambungkannya ke jaringan pribadi, hotspot ponsel, atau jaringan sekolah lain.
- Tidak ada rangkaian yang dirakit minggu ini. Cabut kabel USB sebelum mengubah apa pun pada papan.
- Modul ini tidak memakai kamera atau mikrofon, dan tidak mengukur tubuh siapa pun.
- Papan yang terasa panas, berbau, atau berasap: cabut kabel dan panggil guru.

## Ingat kembali

Jawab dari ingatan dulu, baru cek di kunci. Soal 1 dari `c-xi1-m7`, soal 2 dari `c-xi1-m12`, soal 3 dari `FND-X1-M5`.

1. Apa beda perubahan keluaran terbesar antar sampel pada kendali hidup-mati dan proporsional untuk masukan yang berderau?
2. Mengapa memeriksa daya dan kabel sebelum membaca kode?
3. Sebutkan lima tahap diagnosis gangguan jaringan dari lapisan fisik sampai layanan.

## Tujuan

Setelah modul ini kamu dapat:

- menjelaskan bahwa papan terhubung lewat titik akses ke jaringan lab dan memakai nama jaringan serta sandi;
- menjelaskan peran alamat IP, bagian jaringan dan bagian perangkat pada alamat itu, dan menentukan apakah dua alamat berada di jaringan yang sama;
- membaca sketsa yang menghubungkan papan ke Wi-Fi dengan batas waktu, lalu mencetak alamat IP-nya;
- mengaitkan "tersambung" dan "punya alamat IP" dengan dua tahap pertama diagnosis jaringan.

## Prediksi dulu

Papan berada di `192.0.2.23` dan jaringan lab memakai awalan `/24` (24 bit pertama adalah bagian jaringan, sisanya bagian perangkat). **Tebak dulu, tulis jawabanmu, baru telusuri.**

1. Apakah komputer guru di `192.0.2.200` berada di jaringan yang sama dengan papan? Bagaimana dengan `198.51.100.5`?
2. Bila awalannya diubah menjadi `/25`, apakah `192.0.2.200` masih sejaringan dengan papan? (Petunjuk: `/25` memotong jaringan menjadi dua bagian sama besar.)
3. Menurutmu, mengapa papan tidak perlu diberi alamat IP secara manual di kode?

## Contoh terselesaikan

Papan ESP32 punya radio Wi-Fi. Agar terhubung, ia perlu tiga hal: **nama jaringan** (SSID) dari sebuah titik akses, **sandi** jaringan, dan **alamat IP**. Alamat IP umumnya diberikan otomatis oleh router atau titik akses lewat DHCP, sehingga papan yang dinyalakan ulang bisa memperoleh alamat yang berbeda. Dalam kerangka I-P-O:

| Masukan | Proses | Keluaran |
| --- | --- | --- |
| nama dan sandi jaringan (dari guru) | papan meminta sambungan dan menunggu paling lama batas waktu | status tersambung dan alamat IP di Serial Monitor |

Alamat IPv4 terdiri dari empat angka 0 sampai 255, atau 32 bit. Awalan `/24` berarti 24 bit pertama menandai jaringan. **Topeng jaringan** adalah bilangan 32 bit dengan 24 bit pertama bernilai 1: `alamat & topeng` menyisakan bagian jaringan. Dua alamat sejaringan bila hasil `&`-nya sama. Program berikut menghitungnya; ia hanya aritmetika, tidak menyentuh jaringan.

```cpp
// C++17 biasa, jalan di komputer. Diperiksa oleh check:module-code.
#include <cstdint>
#include <iostream>
#include <string>

struct Alamat {
  int a, b, c, d;
};

uint32_t keAngka(Alamat x) {
  return (uint32_t(x.a) << 24) | (uint32_t(x.b) << 16) | (uint32_t(x.c) << 8) | uint32_t(x.d);
}

uint32_t topeng(int prefiks) {
  if (prefiks <= 0) {
    return 0;
  }
  return 0xFFFFFFFFu << (32 - prefiks);
}

std::string keTeks(uint32_t v) {
  return std::to_string(v >> 24) + "." + std::to_string((v >> 16) & 255) + "." +
         std::to_string((v >> 8) & 255) + "." + std::to_string(v & 255);
}

bool samaJaringan(Alamat x, Alamat y, int prefiks) {
  uint32_t m = topeng(prefiks);
  return (keAngka(x) & m) == (keAngka(y) & m);
}

int main() {
  Alamat papan = {192, 0, 2, 23};
  Alamat uji[3] = {{192, 0, 2, 200}, {198, 51, 100, 5}, {192, 0, 2, 200}};
  int prefiks[3] = {24, 24, 25};
  for (int i = 0; i < 3; i++) {
    uint32_t m = topeng(prefiks[i]);
    std::cout << keTeks(keAngka(papan)) << "/" << prefiks[i] << " vs " << keTeks(keAngka(uji[i]))
              << ": jaringan papan " << keTeks(keAngka(papan) & m) << ", jaringan lawan "
              << keTeks(keAngka(uji[i]) & m) << " -> "
              << (samaJaringan(papan, uji[i], prefiks[i]) ? "sama" : "beda") << "\n";
  }
}
```

Keluarannya:

```text
192.0.2.23/24 vs 192.0.2.200: jaringan papan 192.0.2.0, jaringan lawan 192.0.2.0 -> sama
192.0.2.23/24 vs 198.51.100.5: jaringan papan 192.0.2.0, jaringan lawan 198.51.100.0 -> beda
192.0.2.23/25 vs 192.0.2.200: jaringan papan 192.0.2.0, jaringan lawan 192.0.2.128 -> beda
```

Baris ketiga adalah kejutannya: dengan `/25` jaringan `192.0.2.0` hanya mencakup alamat 0 sampai 127, sehingga `192.0.2.200` jatuh ke jaringan sebelah (128 sampai 255). Satu bit awalan mengubah jawaban. Menurut [RFC 5737](https://www.rfc-editor.org/rfc/rfc5737), rentang `192.0.2.0/24` dan `198.51.100.0/24` disediakan untuk contoh.

Sketsa berikut menghubungkan papan dan mencetak alamatnya. Ia hanya diperiksa sintaksnya terhadap header tiruan, tidak dijalankan pada papan. Perhatikan dua hal: papan **tidak menunggu selamanya** (ada batas waktu, memakai pola `millis()` yang kamu pelajari), dan nama serta sandi ditulis sebagai tempat pengisi. Jangan menulis sandi sungguhan di berkas yang kamu bagikan; modul berikutnya membahas caranya.

```arduino
// Arduino-C++ untuk ESP32. Diperiksa check:module-code terhadap header tiruan (sintaks dan tipe saja, bukan bukti perilaku papan).
#include <WiFi.h>

// Tempat pengisi. Isi dari lembar guru di komputer sendiri; jangan membagikan berkas berisi sandi (modul berikutnya).
const char* NAMA_JARINGAN = "ISI_DARI_LEMBAR_GURU";
const char* SANDI_JARINGAN = "ISI_DARI_LEMBAR_GURU";
const unsigned long BATAS_MS = 15000;

void setup() {
  Serial.begin(115200);
  WiFi.mode(WIFI_STA);
  WiFi.begin(NAMA_JARINGAN, SANDI_JARINGAN);

  unsigned long mulai = millis();
  while (WiFi.status() != WL_CONNECTED && millis() - mulai < BATAS_MS) {
    delay(250);
    Serial.print('.');
  }
  Serial.println();

  if (WiFi.status() == WL_CONNECTED) {
    Serial.print("IP papan: ");
    Serial.println(WiFi.localIP().toString());
  } else {
    Serial.println("Belum terhubung: periksa nama jaringan, sandi, dan jarak ke titik akses");
  }
}

void loop() {}
```

Pengaturan Wi-Fi bergantung pada versi inti Arduino-ESP32; periksa dokumentasi Espressif dan lembar guru `[belum terverifikasi]`. Perilaku radio (sinyal, waktu sambung) tidak ditiru program komputer di atas.

## Contoh setengah jadi

Sekarang kamu menghitung ukuran jaringan. Lengkapi bagian `____`: `jumlahAlamat` memberi banyaknya alamat dalam satu jaringan dengan awalan tertentu, dan `adalahAlamatJaringan` menguji apakah sebuah alamat adalah alamat jaringan itu sendiri (seluruh bit bagian perangkat bernilai 0).

```cpp setengah-jadi
// C++17. Lengkapi bagian ____.
#include <cstdint>

uint32_t jumlahAlamat(int prefiks) {
  return ____ << (32 - prefiks);
}

bool adalahAlamatJaringan(uint32_t alamat, int prefiks) {
  uint32_t topengBit = 0xFFFFFFFFu << (32 - prefiks);
  return (alamat & ~topengBit) == ____;
}
```

## Soal Parsons

Susun baris-baris di bawah (sudah diacak) menjadi `setup()` yang menghubungkan papan, menunggu dengan batas waktu, lalu mencetak alamatnya.

```text
(a)   WiFi.begin(NAMA_JARINGAN, SANDI_JARINGAN);
(b) void setup() {
(c)   Serial.begin(115200);
(d)   unsigned long mulai = millis();
(e)   while (WiFi.status() != WL_CONNECTED && millis() - mulai < BATAS_MS) {
(f)     delay(250);
(g)   }
(h)   Serial.println(WiFi.localIP().toString());
(i) }
```

## Latihan

1. `AI: tanpa AI` **Hitung.** Papan di `192.0.2.77` dengan awalan `/26` (blok berukuran 64). Apakah `192.0.2.100` sejaringan? Bagaimana dengan `192.0.2.130`? Tunjukkan blok jaringan masing-masing.
2. `AI: boleh` **Pseudocode dulu.** Tulis pseudocode lalu ubah sketsa agar mencetak berapa milidetik yang dipakai sampai tersambung (keluaran minggu ini: papan terhubung ke jaringan lab).
3. `AI: tanpa AI` **Diagnosis.** Setelah 15 detik papan belum tersambung. Sebut tiga penyebab yang kamu periksa, urut dari tahap fisik.
4. `AI: boleh` **Dengan papan (F).** Unggah sketsa, cetak alamat IP papan, lalu bandingkan dengan awalan jaringan lab dari guru: sejaringankah papanmu dengan komputer guru? Tanpa papan, kerjakan nomor 1. Jangan menyambungkan papan ke jaringan lain.
5. *Opsional:* **catatan pemakaian AI.** Bila memakai AI generatif, jawab nomor 2 sendiri dulu, lalu minta petunjuk bertahap atau kritik atas pseudocodemu, bukan program jadi. Catat alatnya, tujuanmu, garis besar perintahmu, bagian yang kamu pakai, dan cara memeriksanya. Jangan menaruh nama jaringan, sandi, alamat jaringan sekolah, atau data pribadi pada perintah.

## Latihan bercampur

1. Ubah setiap bagian alamat `192.0.2.10` ke biner delapan bit (dari `FND-X1-M3`).
2. Tulis kondisi `millis()` yang benar untuk "sudah lewat 15 detik sejak `mulai`", dan jelaskan mengapa pengurangan itu tetap benar saat `millis()` kembali ke 0.

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `C-XI2-M2` (sekitar satu minggu lagi), `C-XI2-M4` (sekitar tiga minggu lagi), dan `C-XI2-M8` (sekitar tujuh minggu lagi). Jawab sekarang lalu simpan.

1. Apa yang dilakukan DHCP, dan mengapa alamat IP papan bisa berbeda setiap kali dinyalakan?
2. Dua perangkat berada di jaringan yang sama bila bagian mana dari alamat IP mereka sama? Beri contoh dengan `/24`.
3. Urutkan lima tahap diagnosis jaringan dari fisik sampai layanan.

## Kesalahan umum

- **Menunggu Wi-Fi tanpa batas waktu.** Bila jaringan tidak ada, program menggantung dan tidak melaporkan apa pun; beri batas dan cetak pesan.
- **Mengira "tersambung" berarti "bisa membuka server".** Tersambung ke titik akses baru dua tahap pertama; alamat gateway, nama, dan layanan masih bisa bermasalah.
- **Menulis alamat IP papan atau server di kode seolah tetap.** Alamat dari DHCP bisa berubah; catat dari lembar guru dan siap mengubahnya.
- **Mengira awalan hanya hiasan.** `/24` dan `/25` memberi jawaban berbeda untuk alamat yang sama.
- **Menulis sandi sungguhan di kode yang dibagikan.** Sandi di kode ikut terbaca siapa pun yang menerima berkasnya.

## Cek mandiri

- [ ] Saya dapat menjelaskan peran nama jaringan, sandi, dan alamat IP bagi papan.
- [ ] Saya dapat menentukan apakah dua alamat sejaringan dari awalan.
- [ ] Saya memberi batas waktu pada penantian sambungan dan mencetak hasilnya.
- [ ] Saya tidak menulis sandi sungguhan di berkas yang kubagikan.
- [ ] Saya tahu papan hanya disambungkan ke jaringan lab.

## Kunci dan petunjuk

**Ingat kembali.** 1: pada hidup-mati keluaran melonjak sebesar rentang penuh (255) saat masukan melewati batas; pada proporsional perubahan sebanding dengan selisih masukan, jadi jauh lebih kecil untuk derau yang sama. 2: karena daya atau kabel yang lepas menghasilkan gejala yang mirip galat program; memeriksa yang paling mudah dan murah lebih dulu menghemat waktu. 3: fisik (kabel atau Wi-Fi), alamat IP, gateway, DNS, layanan.

**Prediksi dulu.** 1: `192.0.2.200` sejaringan (bagian jaringan `192.0.2.0` sama); `198.51.100.5` tidak. 2: tidak; dengan `/25`, `192.0.2.23` ada di blok 0 sampai 127 dan `192.0.2.200` di blok 128 sampai 255. 3: karena alamat diberikan otomatis oleh jaringan (DHCP); papan cukup meminta.

**Contoh setengah jadi.** Isian berurutan: `1u`, lalu `0`. Hasil kunci yang dikompilasi dan dijalankan penulis: `jumlahAlamat(24)` bernilai 256, `jumlahAlamat(25)` bernilai 128, dan `192.0.2.0` adalah alamat jaringan sedangkan `192.0.2.23` bukan. Pada jaringan IPv4 biasa, alamat pertama dan terakhir dalam blok dipakai sebagai alamat jaringan dan alamat siaran, sehingga perangkat yang bisa diberi alamat lebih sedikit dua dari jumlah itu.

**Soal Parsons.** Urutan benar: b, c, a, d, e, f, g, h, i. Baris (a) dan (d) boleh bertukar tempat; yang penting `mulai` diambil sebelum perulangan.

**Latihan.** 1: pada `/26` blok berukuran 64. `192.0.2.77` ada di blok `192.0.2.64` sampai `192.0.2.127`; `192.0.2.100` ada di blok yang sama, jadi sejaringan; `192.0.2.130` ada di blok `192.0.2.128` sampai `192.0.2.191`, jadi tidak. 2: pseudocode: catat `mulai`; selama belum tersambung dan belum lewat batas, tunggu sebentar; setelah selesai, cetak `millis() - mulai`. 3: contoh: titik akses mati atau terlalu jauh (fisik); nama atau sandi jaringan salah; jaringan menolak perangkat atau tidak memberi alamat. 4: tidak ada kunci tunggal; jawaban yang baik menyebut awalan dari guru dan hasil perbandingan. Bila papan tidak tersambung, periksa tahap diagnosis berurutan, mulai dari fisik.

**Latihan bercampur.** 1: `192` = `11000000`, `0` = `00000000`, `2` = `00000010`, `10` = `00001010`. 2: `millis() - mulai >= 15000`. Selisih dihitung pada tipe `unsigned long`, sehingga tetap benar walau penghitung kembali ke 0 (selisihnya "melingkar" dengan benar).

**Ulang berjarak.** 1: DHCP memberi alamat otomatis kepada perangkat yang bergabung; alamat dipinjamkan, bukan milik tetap, sehingga bisa berbeda saat dinyalakan ulang. 2: bagian jaringan, yaitu bit awal sepanjang awalan; pada `/24` tiga angka pertama sama, mis. `192.0.2.23` dan `192.0.2.200`. 3: fisik, alamat IP, gateway, DNS, layanan.

## Langkah berikutnya

Modul berikut: `c-xi2-m2` (keamanan konektivitas), yang menjawab bagaimana nama dan sandi jaringan disimpan tanpa tertanam di kode. Pembacaan lanjut: dokumentasi Wi-Fi Arduino-ESP32 milik Espressif dan modul fondasi `fondasi-jaringan-dan-internet`.
