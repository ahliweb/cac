## Untuk siapa modul ini

Modul ini untuk murid kelas XI jalur C (IoT dan robotika), minggu `C-XI2-M6` silabus v1.4: publikasi-langganan, praktik (F). Prasyarat: modul `c-xi2-m5` (konsep publikasi-langganan); kamu juga memakai sambungan Wi-Fi dari `c-xi2-m1`, pola `millis()` dari `c-x2-m7`, dan keamanan dari `c-xi2-m2`.

Modul ini berstatus DRAF: karangan penyusun, belum ditinjau pemilik. Ia mendukung butir `F-BK-d` (model jaringan, pengiriman data, dan pemecahan masalah) dan tidak dihitung memenuhi butir capaian pembelajaran mana pun. Keluaran minggu ini: program penerbit dan pelanggan. Latihan silabusnya: dua papan bertukar data lewat broker lokal.

Ada dua cara mengerjakan. **Dengan papan (F):** dua papan (satu penerbit, satu pelanggan) tersambung ke broker lokal di komputer guru. **Tanpa papan:** kamu menjalankan "papan tiruan" di komputer yang meniru broker dan pemanggil balik. Alamat dan port broker dari lembar guru `[belum terverifikasi]`; guru biasanya memakai broker seperti Mosquitto.

## Keselamatan perangkat

- Papan hanya memakai daya dari kabel USB. Tidak ada listrik jaringan (220 V) dan tidak ada baterai pada modul ini.
- Aktuator pada modul ini cukup satu LED dengan resistor sesuai lembar guru. Kipas atau motor hanya lewat modul pengendali bertegangan rendah sesuai lembar guru, tidak langsung ke pin papan.
- Cabut kabel USB sebelum memasang atau memindahkan komponen; periksa polaritas LED.
- Papan hanya disambungkan ke **jaringan lab** dan hanya ke broker yang ditunjuk guru. Tidak ada solder.
- Modul ini tidak memakai kamera atau mikrofon, dan tidak mengukur tubuh siapa pun.
- Papan atau komponen yang terasa panas, berbau, atau berasap: cabut kabel dan panggil guru.

## Ingat kembali

Jawab dari ingatan dulu, baru cek di kunci. Soal 1 dari `c-xi1-m12`, soal 2 dari `C-XI2-M5`, soal 3 dari `C-XI2-M3`.

1. Bila penerima tidak menerima apa pun, apa dua dugaan pertama, dan bagaimana membedakannya dengan satu pengamatan?
2. Siapa yang menentukan penerima sebuah pesan: penerbit atau broker? Jelaskan.
3. Mengapa pengulangan diberi batas jumlah dan jeda yang membesar?

## Tujuan

Setelah modul ini kamu dapat:

- menulis program penerbit yang menerbitkan suhu ke sebuah topik lewat broker lokal;
- menulis program pelanggan yang berlangganan topik dan menangani pesan di pemanggil balik;
- menyalin isi pesan dengan panjang yang diketahui, karena isinya tidak dijamin berakhir nol;
- memberi setiap papan ID klien yang unik, dan menyambung ulang tanpa memblokir program;
- menjelaskan mengapa langganan perlu dibuat ulang setelah tersambung kembali.

## Prediksi dulu

Papan B berlangganan `lab/a/suhu` dan menyalakan kipas bila suhu **lebih dari** 28,0. Sebuah penerbit menerbitkan berturut-turut `26.0`, `29.5`, dan `28.0`. Setelah itu sebuah klien baru dengan ID `papan-b` yang sama menyambung, lalu penerbit menerbitkan `30.1`. Ada pula pemanggil balik yang **salah**: ia mencetak isi pesan tanpa memakai panjang, padahal sisa penyangga berisi tanda `#` (di papan nyata isinya bisa apa saja). **Tebak dulu, tulis jawabanmu, baru jalankan.**

1. Bagaimana keadaan kipas setelah masing-masing dari tiga pesan pertama?
2. Apa yang terjadi pada klien lama saat klien baru ber-ID sama menyambung, dan siapa yang menerima `30.1`?
3. Apa yang dicetak versi yang salah untuk pesan `26.0`?

## Contoh terselesaikan

Pada pustaka MQTT di papan, kamu mendaftarkan sebuah **pemanggil balik** (fungsi yang dipanggil pustaka setiap kali pesan tiba) dan memanggil `klien.loop()` terus-menerus agar pustaka bekerja. Pemanggil balik menerima topik, isi pesan, dan **panjang**. Topik berakhir nol, tetapi isi pesan **tidak dijamin** berakhir nol (sumber pustaka: hanya topik yang diberi akhiran nol), sehingga kamu menyalinnya dengan panjang yang diketahui ke penyangga sendiri dan menambahkan akhiran nol. Aturan MQTT lain yang mudah terlupa: bila sebuah klien menyambung dengan ID yang sudah dipakai, broker **memutus klien lama**. Karena itu setiap papan memakai ID sendiri.

Program berikut meniru broker dan dua pemanggil balik (salah dan benar) dengan bentuk fungsi seperti pustaka, tanpa jaringan.

```cpp
// C++17 biasa, jalan di komputer. Diperiksa oleh check:module-code.
#include <cstdint>
#include <cstdlib>
#include <cstring>
#include <iostream>
#include <string>
#include <vector>

// Bentuk fungsi pemanggil balik sama dengan pustaka PubSubClient di papan.
typedef void (*PemanggilBalik)(char *topik, uint8_t *isi, unsigned int panjang);

struct KlienTiruan {
  std::string id;
  PemanggilBalik saatPesan;
  std::string topik;  // satu langganan saja, tanpa karakter pengganti
};

std::vector<KlienTiruan> klien;

// Broker tiruan: ID yang sama memutus klien lama (aturan MQTT).
void sambung(const std::string &id, PemanggilBalik saatPesan, const std::string &topik) {
  for (size_t i = 0; i < klien.size(); i++) {
    if (klien[i].id == id) {
      std::cout << "broker memutus " << id << " yang lama\n";
      klien.erase(klien.begin() + i);
      break;
    }
  }
  klien.push_back({id, saatPesan, topik});
}

void terbitkan(const std::string &topik, const std::string &pesan) {
  for (const KlienTiruan &k : klien) {
    if (k.topik == topik) {
      // Penyangga bersama: isi pesan TIDAK diakhiri nol, sisanya bukan bagian pesan.
      uint8_t penyangga[16];
      std::memset(penyangga, '#', sizeof(penyangga) - 1);
      penyangga[sizeof(penyangga) - 1] = 0;
      std::memcpy(penyangga, pesan.data(), pesan.size());
      char salinanTopik[32];
      std::strncpy(salinanTopik, topik.c_str(), sizeof(salinanTopik) - 1);
      salinanTopik[sizeof(salinanTopik) - 1] = 0;
      k.saatPesan(salinanTopik, penyangga, static_cast<unsigned int>(pesan.size()));
    }
  }
}

bool kipasNyala = false;

void salah(char *topik, uint8_t *isi, unsigned int panjang) {
  (void)panjang;
  // SALAH: mengira isi berakhir nol.
  std::cout << "[salah] " << topik << ": " << reinterpret_cast<char *>(isi) << "\n";
}

void saatPesan(char *topik, uint8_t *isi, unsigned int panjang) {
  char salinan[16];
  unsigned int n = panjang < sizeof(salinan) - 1 ? panjang : sizeof(salinan) - 1;
  std::memcpy(salinan, isi, n);
  salinan[n] = 0;
  double suhu = std::atof(salinan);
  kipasNyala = suhu > 28.0;
  std::cout << "[benar] " << topik << ": " << salinan << " -> kipas "
            << (kipasNyala ? "hidup" : "mati") << "\n";
}

void saatPesanBaru(char *topik, uint8_t *isi, unsigned int panjang) {
  (void)isi;
  std::cout << "[klien baru] " << topik << ", " << panjang << " byte\n";
}

int main() {
  sambung("papan-b", salah, "lab/a/suhu");
  terbitkan("lab/a/suhu", "26.0");
  klien.clear();
  sambung("papan-b", saatPesan, "lab/a/suhu");
  terbitkan("lab/a/suhu", "26.0");
  terbitkan("lab/a/suhu", "29.5");
  terbitkan("lab/a/suhu", "28.0");
  sambung("papan-b", saatPesanBaru, "lab/a/suhu");
  terbitkan("lab/a/suhu", "30.1");
}
```

Keluarannya:

```text
[salah] lab/a/suhu: 26.0###########
[benar] lab/a/suhu: 26.0 -> kipas mati
[benar] lab/a/suhu: 29.5 -> kipas hidup
[benar] lab/a/suhu: 28.0 -> kipas mati
broker memutus papan-b yang lama
[klien baru] lab/a/suhu, 4 byte
```

Versi salah mencetak `26.0###########`: ia membaca sampai akhiran nol yang kebetulan ada di ujung penyangga, bukan sampai panjang pesan. Versi benar menyalin tepat `panjang` byte, mengubah ke angka, dan memutuskan kipas; `28.0` tidak lebih dari 28,0 sehingga kipas mati. Pada baris terakhir klien lama diputus dan hanya klien baru yang menerima.

Dua sketsa berikut mengikuti pola ini pada papan nyata. Keduanya hanya diperiksa sintaksnya terhadap header tiruan, tidak dijalankan pada papan; periksa versi pustaka yang kamu pasang `[belum terverifikasi]`. Sambungan Wi-Fi seperti `c-xi2-m1`, tanpa sandi di kode (`c-xi2-m2`). Port 1883 adalah port MQTT tanpa enkripsi menurut spesifikasi MQTT 3.1.1: cukup untuk jaringan lab terpisah, tetapi jaringan sungguhan memakai sambungan terenkripsi. Sambungan ulang dicoba paling cepat tiap 5 detik dengan pola `millis()`.

Papan A, penerbit:

```arduino
// Arduino-C++ untuk ESP32, papan A (penerbit). Diperiksa check:module-code terhadap header tiruan (sintaks dan tipe saja, bukan bukti perilaku papan).
#include <PubSubClient.h>
#include <WiFi.h>

const char* ALAMAT_BROKER = "192.0.2.10";  // dari lembar guru
const uint16_t PORT_BROKER = 1883;            // port MQTT tanpa enkripsi (lab terpisah)
const char* ID_KLIEN = "papan-a";             // harus berbeda dari papan lain
const char* TOPIK = "lab/a/suhu";
const unsigned long SELANG_MS = 5000;

WiFiClient jaringan;
PubSubClient klien(jaringan);
unsigned long mulai = 0;
unsigned long terakhirCoba = 0;

void setup() {
  Serial.begin(115200);
  // Sambungan Wi-Fi seperti modul 1 (tanpa sandi di kode: modul 2).
  klien.setServer(ALAMAT_BROKER, PORT_BROKER);
  mulai = millis();
}

void loop() {
  if (!klien.connected()) {
    if (millis() - terakhirCoba >= 5000) {  // jangan mencoba tanpa jeda
      terakhirCoba = millis();
      klien.connect(ID_KLIEN);
    }
    return;
  }
  klien.loop();
  if (millis() - mulai >= SELANG_MS) {
    mulai += SELANG_MS;
    klien.publish(TOPIK, "27.5");  // nilai contoh; ganti dengan pembacaan sensor
  }
}
```

Papan B, pelanggan:

```arduino
// Arduino-C++ untuk ESP32, papan B (pelanggan). Diperiksa check:module-code terhadap header tiruan (sintaks dan tipe saja, bukan bukti perilaku papan).
#include <PubSubClient.h>
#include <WiFi.h>
#include <stdlib.h>
#include <string.h>

const char* ALAMAT_BROKER = "192.0.2.10";  // dari lembar guru
const uint16_t PORT_BROKER = 1883;
const char* ID_KLIEN = "papan-b";             // berbeda dari papan A
const char* TOPIK = "lab/a/suhu";
const int PIN_KIPAS = 26;                     // contoh; periksa papanmu dan lembar guru
const float BATAS_SUHU = 28.0;

WiFiClient jaringan;
PubSubClient klien(jaringan);
unsigned long terakhirCoba = 0;

void saatPesan(char* topik, byte* isi, unsigned int panjang) {
  (void)topik;  // tidak dipakai
  char salinan[16];
  unsigned int n = panjang < sizeof(salinan) - 1 ? panjang : sizeof(salinan) - 1;
  memcpy(salinan, isi, n);
  salinan[n] = 0;  // isi tidak dijamin berakhir nol
  digitalWrite(PIN_KIPAS, atof(salinan) > BATAS_SUHU ? HIGH : LOW);
}

void setup() {
  Serial.begin(115200);
  pinMode(PIN_KIPAS, OUTPUT);
  // Sambungan Wi-Fi seperti modul 1 (tanpa sandi di kode: modul 2).
  klien.setServer(ALAMAT_BROKER, PORT_BROKER);
  klien.setCallback(saatPesan);
}

void loop() {
  if (!klien.connected()) {
    if (millis() - terakhirCoba >= 5000) {
      terakhirCoba = millis();
      if (klien.connect(ID_KLIEN)) {
        klien.subscribe(TOPIK);  // berlangganan ulang setelah tersambung kembali
      }
    }
    return;
  }
  klien.loop();
}
```

Perhatikan `klien.subscribe` sesudah `connect` berhasil. Pustaka ini menyambung dengan sesi bersih secara bawaan (pada sumbernya `connect(id)` meneruskan `cleanSession` bernilai 1), dan menurut spesifikasi MQTT sesi bersih membuang langganan lama; karena itu langganan dibuat lagi setiap tersambung kembali. Penyangga bawaan pustaka juga terbatas (256 byte pada sumbernya).

## Contoh setengah jadi

Sekarang pemanggil balik yang aman. Lengkapi bagian `____`: salin paling banyak 15 byte pesan, lalu akhiri dengan nol.

```cpp setengah-jadi
// C++17. Lengkapi bagian ____.
#include <cstdint>
#include <cstring>

void saatPesan(char *topik, uint8_t *isi, unsigned int panjang) {
  (void)topik;
  char salinan[16];
  unsigned int n = panjang < sizeof(salinan) - ____ ? panjang : sizeof(salinan) - ____;
  memcpy(salinan, isi, ____);
  salinan[n] = ____;
}
```

## Soal Parsons

Susun baris-baris di bawah (sudah diacak) menjadi `loop()` papan B: bila belum tersambung, coba menyambung tiap 5 detik lalu berlangganan; bila sudah tersambung, jalankan `klien.loop()`. Indentasi menunjukkan bersarang.

```text
(a)   klien.loop();
(b) void loop() {
(c)   if (!klien.connected()) {
(d)     if (millis() - terakhirCoba >= 5000) {
(e)       terakhirCoba = millis();
(f)       if (klien.connect(ID_KLIEN)) {
(g)         klien.subscribe(TOPIK);
(h)       }
(i)     }
(j)     return;
(k)   }
(l) }
```

## Latihan

1. `AI: tanpa AI` **Telusuri.** Pada pemanggil balik papan B, apa keadaan kipas untuk pesan `28.5`, `28.0`, dan pesan kosong? Apa risiko `atof` mengembalikan 0 untuk teks yang bukan angka?
2. `AI: boleh` **Rancang dulu.** Tulis pseudocode, lalu rancang topik dan program penerbit serta pelanggan untuk kelompokmu: topik memuat nomor kelompok (mis. `lab/k3/suhu`) supaya tidak bertabrakan dengan kelompok lain, dan ID klien unik (keluaran minggu ini: program penerbit dan pelanggan).
3. `AI: tanpa AI` **Jelaskan.** Apa akibatnya bila papan A dan papan B memakai ID klien yang sama, dan bagaimana gejalanya terlihat?
4. `AI: boleh` **Dengan papan (F).** Dua papan bertukar suhu lewat broker lokal guru. Pakai topik dengan nomor kelompokmu. Bila pelanggan tidak menerima apa pun, periksa berurutan: sambungan Wi-Fi dan alamat broker, ID klien, topik penerbit dan pelanggan, lalu langganan. Tanpa papan, kerjakan nomor 2 dan jalankan program tiruan. Jangan menyambungkan papan ke broker lain.
5. *Opsional:* **catatan pemakaian AI.** Bila memakai AI generatif, jawab nomor 2 sendiri dulu, lalu minta petunjuk bertahap atau kritik atas rancanganmu, bukan program jadi. Catat alatnya, tujuanmu, garis besar perintahmu, bagian yang kamu pakai, dan cara memeriksanya. Jangan menaruh sandi, kunci, atau alamat broker sekolah pada perintah.

## Latihan bercampur

1. Tulis filter yang menerima suhu dari semua kelompok bila topiknya berbentuk `lab/k1/suhu`, `lab/k2/suhu`, dan seterusnya. (dari `C-XI2-M5`)
2. Papan mencoba menyambung ulang tiap 5 detik tanpa batas jumlah. Apakah itu bertentangan dengan aturan "pengulangan selalu punya batas" dari `C-XI2-M3`? Jelaskan.

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `C-XI2-M7` (sekitar satu minggu lagi), `C-XI2-M9` (sekitar tiga minggu lagi), dan `C-XI2-M14` (sekitar delapan minggu lagi). Jawab sekarang lalu simpan.

1. Mengapa isi pesan dari pustaka harus disalin dengan panjang yang diketahui sebelum dipakai sebagai teks?
2. Apa yang terjadi bila dua papan memakai ID klien yang sama?
3. Mengapa papan berlangganan ulang setelah tersambung kembali ke broker?

## Kesalahan umum

- **Mengira isi pesan berakhir nol.** Hanya topik yang diberi akhiran nol; pakai panjang pesan.
- **Memakai ID klien yang sama pada dua papan.** Broker memutus yang lama; kedua papan saling memutus tanpa henti.
- **Menunda `klien.loop()` atau memakai `delay` panjang.** Pustaka tidak menerima pesan atau menjaga sambungan selama itu.
- **Lupa berlangganan ulang setelah tersambung kembali.** Papan tersambung tetapi tidak menerima apa pun.
- **Menulis sandi atau alamat broker sekolah di kode yang dibagikan.** Pakai berkas rahasia dan tempat pengisi.

## Cek mandiri

- [ ] Saya dapat menulis penerbit dan pelanggan dengan topik dan ID klien unik.
- [ ] Saya menyalin isi pesan dengan panjang yang diketahui sebelum dipakai sebagai teks.
- [ ] Saya menyambung ulang dengan jeda dan tidak memblokir program.
- [ ] Saya berlangganan lagi setelah tersambung kembali.
- [ ] Saya tidak menaruh sandi atau alamat jaringan sekolah di kode yang dibagikan.

## Kunci dan petunjuk

**Ingat kembali.** 1: contoh dugaan: pengirim tidak mengirim, atau sambungan (kabel, daya, jaringan) terputus. Satu pengamatan pembeda: lihat keluaran Serial pengirim; bila pengirim mencetak bahwa ia mengirim, sambungan atau penerima yang bermasalah; bila tidak, pengirimnya. 2: broker, yang mencocokkan topik dengan filter pelanggan. 3: tanpa batas papan tak pernah menyerah, dan jeda yang membesar memberi server waktu pulih serta mengurangi beban.

**Prediksi dulu.** 1: `26.0` membuat kipas mati; `29.5` menghidupkan kipas; `28.0` mematikan kipas (28,0 tidak lebih dari 28,0). 2: klien lama diputus broker; hanya klien baru yang menerima `30.1`. 3: `26.0` diikuti tanda `#` sampai ujung penyangga, 11 tanda `#`.

**Contoh setengah jadi.** Isian berurutan: `1`, `1`, `n`, `0`. Hasil kunci yang dikompilasi dan dijalankan penulis: pesan `29.5` dengan panjang 4 tercetak `29.5`; dengan panjang 40 pesan dipotong menjadi 15 byte dan tidak meluap (`29.5###########`).

**Soal Parsons.** Urutan benar: b, c, d, e, f, g, h, i, j, k, a, l. Indentasi menunjukkan bersarang: (h) menutup `if (klien.connect...)`, (i) menutup `if (millis...)`, (k) menutup `if (!klien.connected())`, dan (a) dijalankan hanya bila sudah tersambung.

**Latihan.** 1: `28.5` menghidupkan kipas; `28.0` mematikan; pesan kosong menjadi 0 sehingga kipas mati. Risikonya: pesan rusak atau bukan angka tidak terlihat sebagai galat dan kipas mati diam-diam; periksa dulu bahwa teks adalah angka yang masuk akal dan catat pesan yang ditolak. 2: pseudocode: sambung ke broker dengan ID kelompok; penerbit menerbitkan suhu tiap selang waktu ke `lab/kN/suhu`; pelanggan berlangganan topik itu dan menyalakan kipas bila suhu lebih dari ambang. 3: broker memutus klien lama tiap klien baru menyambung, sehingga kedua papan saling memutus; gejalanya papan sering "tersambung lalu putus" dan pesan hilang bergantian. 4: tidak ada kunci tunggal; jawaban yang baik mencatat urutan pemeriksaan yang dipakai dan penyebab yang ditemukan.

**Latihan bercampur.** 1: `lab/+/suhu`. 2: tidak bertentangan; aturan itu menjaga papan tidak menyerang server tanpa henti. Perangkat yang harus tetap terhubung memakai jeda tetap yang wajar dan melaporkan kegagalan, tanpa mengulang beruntun. Yang dilarang adalah mengulang tanpa jeda.

**Ulang berjarak.** 1: isi pesan tidak dijamin berakhir nol; membacanya sebagai teks melewati akhir pesan dan membaca isi penyangga yang bukan bagian pesan. 2: broker memutus klien yang lama, sehingga papan saling memutus dan pesan hilang. 3: pustaka menyambung dengan sesi bersih secara bawaan, dan sesi bersih membuang langganan lama; tanpa berlangganan lagi papan tersambung tetapi tidak menerima apa pun.

## Langkah berikutnya

Modul berikut: `c-xi2-m7` (format data), yang menyusun pesan sebagai JSON agar penerima mana pun bisa membacanya. Pembacaan lanjut: spesifikasi MQTT 3.1.1, repositori pustaka PubSubClient, dan situs proyek Mosquitto.
