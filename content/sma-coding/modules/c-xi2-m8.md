## Untuk siapa modul ini

Modul ini untuk murid kelas XI jalur C (IoT dan robotika), minggu `C-XI2-M8` silabus v1.4: pemecahan masalah jaringan IoT (F). Prasyarat: modul `c-xi1-m14` (modul semester sebelumnya, termasuk diagnosis sambungan di `c-xi1-m12`). Kamu juga memakai `C-XI2-M1` (alamat IP), `C-XI2-M5` dan `C-XI2-M6` (broker) dan `C-XI2-M7` (format data); modul itu belum terindeks saat modul ini ditulis, jadi tidak ditulis sebagai prasyarat resmi.

Modul ini karangan penyusun dan disetujui pemilik program pada 2026-11-20 (keputusan lewat dialog; catatan tinjauan menjadi tindak lanjut revisi). Ia mendukung butir `F-BK-d` (model jaringan, pengiriman data, dan pemecahan masalah) dan tidak dihitung memenuhi butir capaian pembelajaran mana pun. Keluaran minggu ini: catatan diagnosis. Latihan silabusnya: tiga gangguan sintetis.

Ada dua cara mengerjakan. **Dengan papan (F):** gurumu menyiapkan tiga gangguan di jaringan lab dan kelompok mendiagnosisnya. **Tanpa papan:** kamu memakai program "pemeriksa lapis" di komputer dengan pengamatan karangan. Semua alamat adalah alamat contoh; jaringan lab sungguhan memakai alamat dari gurumu.

## Keselamatan perangkat

- Papan hanya memakai daya dari kabel USB. Tidak ada listrik jaringan (220 V) dan tidak ada baterai pada modul ini.
- Papan hanya disambungkan ke **jaringan lab** yang disiapkan guru, bukan ke jaringan pribadi atau jaringan sekolah lain.
- Gangguan sintetis dibuat oleh guru **pada perangkat lunak atau pengaturan jaringan lab** (mis. alamat broker yang diubah), bukan dengan mengutak-atik kabel atau daya.
- Cabut kabel USB sebelum mengubah apa pun pada papan. Papan yang terasa panas, berbau, atau berasap: cabut kabel dan panggil guru.

## Ingat kembali

Jawab dari ingatan dulu, baru cek di kunci. Soal 1 dari `C-XI2-M1`, soal 2 dari `C-XI2-M5`, soal 3 dari `C-XI2-M7`.

1. Urutkan lima tahap diagnosis jaringan dari fisik sampai layanan.
2. Apa beda `+` dan `#` pada filter topik? Beri satu contoh masing-masing.
3. Mengapa suhu yang gagal dibaca ditulis `null`, bukan `nan` atau 0?

## Tujuan

Setelah modul ini kamu dapat:

- menyebut urutan diagnosis jaringan IoT: daya, sinyal, alamat, broker, format;
- memilih satu pengamatan murah yang menyingkirkan atau menunjuk satu lapis;
- mengubah satu hal pada satu waktu dan mencatat gejala, dugaan, pengamatan, dan hasilnya;
- membedakan "tersambung ke Wi-Fi" dari "data sampai ke broker" dan dari "data dapat dibaca penerima";
- menulis catatan diagnosis yang dapat dibaca orang lain (keluaran minggu ini).

## Prediksi dulu

Program di bawah memeriksa pengamatan dari lapis paling dasar dulu dan melaporkan lapis pertama yang bermasalah. Lima pengamatan karangan (RSSI: makin negatif makin lemah; ambang lemah di program `-80`):

| No | Daya | Wi-Fi | RSSI | Alamat | Sejaringan dengan broker | Broker menerima | Pesan terakhir |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | ya | tidak | -60 | tidak | tidak | tidak | (kosong) |
| 2 | ya | ya | -85 | ya | ya | ya | `{"suhu":27.5}` |
| 3 | ya | ya | -55 | ya | tidak | tidak | `{"suhu":27.5}` |
| 4 | ya | ya | -55 | ya | ya | tidak | `{"suhu":27.5}` |
| 5 | ya | ya | -55 | ya | ya | ya | `{"suhu":nan}` |

**Tebak dulu, tulis jawabanmu, baru jalankan.**

1. Lapis pertama yang bermasalah pada tiap nomor?
2. Pada nomor 2 semua lapis berikutnya sehat. Mengapa program tetap menandai lapis sinyal?
3. Bila nomor 1 diperbaiki sehingga Wi-Fi tersambung, apakah lapis berikutnya pasti sehat?

## Contoh terselesaikan

Gangguan IoT sering terdengar sama, "data tidak sampai", padahal penyebabnya berlapis. Urutan diagnosis yang dipakai di sini: **daya** (papan menyala), **sinyal** (tersambung ke titik akses dan cukup kuat), **alamat** (punya alamat IP dan sejaringan dengan broker), **broker** (broker menerima sambungan papan), dan **format** (pesan dapat dibaca penerima). Ini versi lab dari lima tahap umum di `C-XI2-M1`: alamat broker di lab ditulis sebagai angka IP, sehingga DNS biasanya tidak terlibat. Aturannya: periksa dari lapis paling dasar, karena lapis atas tidak dapat diamati dengan jujur sebelum lapis bawahnya baik, dan ubah **satu hal pada satu waktu**.

Program berikut menjalankan pemeriksaan itu. Pemeriksa format di dalamnya kasar: ia hanya mencari tiga cacat yang kamu kenal dari `C-XI2-M7`, bukan pengurai JSON sebenarnya.

```cpp
// C++17 biasa, jalan di komputer. Diperiksa oleh check:module-code.
#include <iostream>
#include <string>

struct Pengamatan {
  bool dayaMenyala;           // lampu daya papan menyala
  bool wifiTersambung;        // status sambungan ke titik akses
  int rssi;                   // kekuatan sinyal dalam dBm (makin negatif makin lemah)
  bool punyaAlamat;           // papan menerima alamat IP
  bool sejaringanBroker;      // alamat papan dan alamat broker satu jaringan
  bool brokerMenerima;        // broker menerima sambungan papan
  std::string pesanTerakhir;  // isi pesan yang dikirim
};

const int RSSI_LEMAH = -80;  // ambang contoh; tanyakan gurumu untuk jaringan labmu

// Pemeriksa kasar: bukan pengurai JSON, hanya mencari tiga cacat yang sudah dikenal.
bool bentukSah(const std::string &pesan) {
  if (pesan.size() < 2 || pesan.front() != '{' || pesan.back() != '}') return false;
  if (pesan.find("nan") != std::string::npos) return false;
  if (pesan.find(",}") != std::string::npos) return false;
  if (pesan.find('\'') != std::string::npos) return false;
  return true;
}

// Mengembalikan lapis pertama yang bermasalah, dari yang paling dasar.
std::string lapisBermasalah(const Pengamatan &p) {
  if (!p.dayaMenyala) return "daya";
  if (!p.wifiTersambung) return "sinyal";
  if (p.rssi < RSSI_LEMAH) return "sinyal (lemah)";
  if (!p.punyaAlamat) return "alamat";
  if (!p.sejaringanBroker) return "alamat (beda jaringan)";
  if (!p.brokerMenerima) return "broker";
  if (!bentukSah(p.pesanTerakhir)) return "format";
  return "tidak ada";
}

int main() {
  const Pengamatan uji[] = {
      {true, false, -60, false, false, false, ""},
      {true, true, -85, true, true, true, "{\"suhu\":27.5}"},
      {true, true, -55, true, false, false, "{\"suhu\":27.5}"},
      {true, true, -55, true, true, false, "{\"suhu\":27.5}"},
      {true, true, -55, true, true, true, "{\"suhu\":nan}"},
      {true, true, -55, true, true, true, "{\"suhu\":27.5}"},
  };
  int nomor = 1;
  for (const Pengamatan &p : uji) {
    std::cout << nomor++ << ": " << lapisBermasalah(p) << "\n";
  }
}
```

Keluarannya (nomor 6 adalah sistem yang sehat):

```text
1: sinyal
2: sinyal (lemah)
3: alamat (beda jaringan)
4: broker
5: format
6: tidak ada
```

Nomor 2 patut dibaca ulang. Semua lapis di atasnya lolos, tetapi sinyal lemah tetap dilaporkan: sinyal lemah belum tentu gagal, namun ia penyebab umum gangguan yang datang dan pergi, jadi ia dicatat sebagai dugaan pertama. Nomor 1 hanya menunjuk satu lapis; setelah Wi-Fi tersambung, pengamatan lapis alamat baru bermakna dan bisa saja menemukan masalah baru. Nomor 5 menunjukkan bahwa broker menerima pesan apa pun: broker meneruskan isi pesan apa adanya, sehingga pesan berbentuk salah tetap "terkirim" dan baru gagal di penerima (spesifikasi MQTT menyebut isi pesan sebagai urusan aplikasi).

Sketsa di bawah mencetak tiga pengamatan pertama tiap 5 detik tanpa `delay`. Ia hanya diperiksa sintaksnya terhadap header tiruan, tidak dijalankan pada papan. Cocokkan arti angka `status` Wi-Fi dan `state` klien MQTT dengan daftar kode di dokumentasi pustaka masing-masing `[belum terverifikasi]`; header tiruan tidak menirunya. Ia juga tidak mencetak sandi.

```arduino
// Arduino-C++ untuk ESP32. Diperiksa check:module-code terhadap header tiruan (sintaks dan tipe saja, bukan bukti perilaku papan).
#include <PubSubClient.h>
#include <WiFi.h>

// Tempat pengisi. Isi dari lembar guru di komputer sendiri; jangan membagikan berkas berisi sandi.
const char* NAMA_JARINGAN = "ISI_DARI_LEMBAR_GURU";
const char* SANDI_JARINGAN = "ISI_DARI_LEMBAR_GURU";
const char* ALAMAT_BROKER = "192.0.2.10";  // alamat contoh; pakai alamat dari gurumu
const uint16_t PORT_BROKER = 1883;
const char* ID_KLIEN = "papan-diag-01";
const unsigned long SELANG_LAPOR_MS = 5000;

WiFiClient jaringan;
PubSubClient klien(jaringan);
const unsigned long SELANG_COBA_MS = 5000;
unsigned long terakhirLapor = 0;
unsigned long terakhirCoba = 0;

void laporDiagnosis() {
  Serial.print("1 sinyal  : status ");
  Serial.print((int)WiFi.status());
  Serial.print(", RSSI ");
  Serial.println((int)WiFi.RSSI());
  Serial.print("2 alamat  : ");
  Serial.println(WiFi.localIP().toString());
  Serial.print("3 broker  : state ");
  Serial.println(klien.state());
}

void setup() {
  Serial.begin(115200);
  WiFi.mode(WIFI_STA);
  WiFi.begin(NAMA_JARINGAN, SANDI_JARINGAN);
  klien.setServer(ALAMAT_BROKER, PORT_BROKER);
}

void loop() {
  if (WiFi.status() == WL_CONNECTED && !klien.connected() &&
      millis() - terakhirCoba >= SELANG_COBA_MS) {
    terakhirCoba = millis();
    klien.connect(ID_KLIEN);  // menunggu sampai batas waktu pustaka; jangan dipanggil tanpa jeda
  }
  klien.loop();
  if (millis() - terakhirLapor >= SELANG_LAPOR_MS) {
    terakhirLapor += SELANG_LAPOR_MS;
    laporDiagnosis();
  }
}
```

**Catatan diagnosis** adalah keluaran minggu ini: setiap langkah satu baris, supaya orang lain (atau kamu sendiri minggu depan) dapat mengulanginya. Contoh untuk gejala "data suhu tidak sampai ke komputer guru"; jaringan lab `192.0.2.0/24`, papan di `192.0.2.23`:

| No | Dugaan | Satu pengamatan | Hasil | Tindakan |
| --- | --- | --- | --- | --- |
| 1 | papan mati | lihat lampu daya | menyala | lanjut |
| 2 | tidak tersambung Wi-Fi | cetak status Wi-Fi | tersambung | lanjut |
| 3 | tidak punya alamat | cetak alamat | `192.0.2.23` | lanjut |
| 4 | broker tidak terjangkau | bandingkan alamat broker di kode (`198.51.100.10`) dengan jaringan lab | beda jaringan | betulkan alamat broker, unggah ulang |
| 5 | perbaikan berhasil | terbitkan satu pesan uji | pesan tiba | selesai; catat penyebabnya: alamat broker salah ketik |

## Contoh setengah jadi

Lengkapi bagian `____` pada fungsi untuk tiga lapis tengah. Setiap pemeriksaan hanya boleh dicapai bila lapis di bawahnya lolos.

```cpp setengah-jadi
// C++17. Lengkapi bagian ____.
#include <string>

std::string lapisAlamat(bool wifiTersambung, bool punyaAlamat, bool sejaringanBroker) {
  if (____wifiTersambung) return "sinyal";
  if (!punyaAlamat) return "____";
  if (____) return "alamat (beda jaringan)";
  return "broker";
}
```

## Soal Parsons

Susun baris-baris di bawah (sudah diacak) menjadi fungsi yang memeriksa lapis dari yang paling dasar ke yang paling atas.

```text
(a)   if (!p.punyaAlamat) return "alamat";
(b) }
(c)   return "tidak ada";
(d)   if (!p.dayaMenyala) return "daya";
(e) std::string lapisBermasalah(const Pengamatan &p) {
(f)   if (!p.brokerMenerima) return "broker";
(g)   if (!p.wifiTersambung) return "sinyal";
```

## Latihan

1. `AI: tanpa AI` **Tentukan lapis.** Untuk tiap kasus, tulis lapis pertama yang bermasalah dan satu pengamatan yang membuktikannya: (a) lampu daya padam; (b) Wi-Fi tersambung, alamat `0.0.0.0`; (c) alamat papan `192.0.2.23/24`, alamat broker `192.0.2.10`, broker menolak sambungan; (d) semuanya sehat tetapi penerima menolak pesan `{'suhu':27.5}`.
2. `AI: boleh` **Pseudocode dulu.** Tulis pseudocode lalu tambahkan ke program: pengamatan `gagalBerturut` (berapa kali sambung ke broker gagal beruntun). Bila lebih dari 3, laporkan "broker" bahkan saat `brokerMenerima` bernilai ya. Tulis tiga kasus uji, termasuk tepat 3 dan 4.
3. `AI: tanpa AI` **Catatan diagnosis.** Gangguan: papan tersambung dan punya alamat, tetapi pelanggan di komputer guru tidak menerima apa pun. Tulis catatan lima baris (dugaan, satu pengamatan, hasil, tindakan), dengan satu perubahan pada satu waktu, untuk penyebab "ID klien dipakai dua papan" (`C-XI2-M6`).
4. `AI: boleh` **Dengan papan (F).** Unggah sketsa pengamat, lalu catat apa yang tercetak pada tiga gangguan sintetis dari gurumu, dan tulis catatan diagnosis tiap gangguan. Jangan mengubah kabel atau daya.
5. *Opsional:* **catatan pemakaian AI.** Bila memakai AI generatif, kerjakan nomor 3 sendiri dulu, lalu minta petunjuk bertahap atau kritik atas catatanmu, bukan catatan jadi. Catat alat, tujuan, garis besar perintah, bagian yang dipakai, dan cara memeriksanya. Jangan menaruh sandi, kunci, alamat jaringan nyata, atau data pribadi pada perintah.

## Latihan bercampur

1. Papan berada di `192.0.2.23` dan broker di `192.0.2.130` pada jaringan lab `/25`. Apakah keduanya satu jaringan? Lapis diagnosis mana yang menolaknya? (dari `C-XI2-M1`)
2. Pelanggan menerima `{"suhu":27.5,}` dan berhenti memprosesnya. Di lapis mana galatnya, dan mengapa broker tidak menolak? (dari `C-XI2-M7`)

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `C-XI2-M9` (sekitar satu minggu lagi), `C-XI2-M11` (sekitar tiga minggu lagi), dan `C-XII1-M2` (sekitar delapan minggu lagi). Jawab sekarang lalu simpan.

1. Mengapa mengubah satu hal pada satu waktu membuat penyebab gangguan lebih mudah ditemukan?
2. Sebut lima lapis diagnosis jaringan IoT berurutan, dan satu pengamatan murah untuk tiap lapis.
3. Mengapa "papan tersambung ke Wi-Fi" belum berarti "data sampai ke penerima"?

## Kesalahan umum

- **Langsung membaca kode.** Banyak gangguan ada di daya, sinyal, atau alamat; periksa dari lapis dasar.
- **Mengubah banyak hal sekaligus.** Bila gangguan hilang, kamu tidak tahu perubahan mana yang menyembuhkannya, dan bisa menambah gangguan baru.
- **Menganggap "tersambung" berarti "sehat".** Wi-Fi tersambung tidak menjamin alamat benar, broker terjangkau, atau format sah.
- **Menganggap broker memeriksa isi pesan.** Broker hanya meneruskan; format menjadi tanggung jawab pengirim dan penerima.
- **Tidak mencatat.** Tanpa catatan, langkah yang sudah dicoba diulang dan penyebab yang ditemukan terlupa.

## Cek mandiri

- [ ] Saya dapat menyebut urutan diagnosis: daya, sinyal, alamat, broker, format.
- [ ] Saya memilih satu pengamatan murah untuk tiap lapis.
- [ ] Saya mengubah satu hal pada satu waktu dan mencatatnya.
- [ ] Saya dapat menjelaskan mengapa pesan salah bentuk tetap diterima broker.
- [ ] Saya dapat menulis catatan diagnosis yang dapat diulang orang lain.

## Kunci dan petunjuk

**Ingat kembali.** 1: fisik (kabel atau Wi-Fi), alamat IP, gateway, DNS, layanan. 2: `+` tepat satu tingkat, mis. `lab/+/suhu` cocok dengan `lab/a/suhu`; `#` semua tingkat sisanya dan hanya di akhir, mis. `lab/#` cocok dengan `lab/a/suhu` dan `lab/a/b/c`. 3: `nan` bukan JSON sah dan 0 menyamarkan kegagalan sebagai "0 derajat"; `null` menyatakan "tidak ada nilai" dengan jelas.

**Prediksi dulu.** 1: nomor 1 sinyal; nomor 2 sinyal (lemah); nomor 3 alamat (beda jaringan); nomor 4 broker; nomor 5 format (nomor 6 sehat). 2: sinyal lemah belum tentu gagal, tetapi penyebab umum gangguan yang datang dan pergi, sehingga dicatat sebagai dugaan pertama. 3: belum pasti; lapis berikutnya baru bisa diamati dengan jujur setelah lapis di bawahnya baik, dan masih mungkin bermasalah.

**Contoh setengah jadi.** Isian berurutan: `!`, `alamat`, lalu `!sejaringanBroker`. Hasil kunci yang dikompilasi penulis: tanpa Wi-Fi laporannya `sinyal`; tersambung tanpa alamat `alamat`; punya alamat tetapi beda jaringan `alamat (beda jaringan)`; semua baik `broker`.

**Soal Parsons.** Urutan benar: e, d, g, a, f, c, b. Pemeriksaan harus dari daya ke atas; fungsi ditutup dengan `return "tidak ada"` sebelum kurung kurawal penutup.

**Latihan.** 1: (a) daya; pengamatan: lampu daya padam, periksa kabel USB. (b) alamat; pengamatan: cetak alamat, `0.0.0.0` berarti belum dapat alamat. (c) broker, karena alamat sejaringan (`192.0.2.23` dan `192.0.2.10` pada `/24`); pengamatan: status sambungan klien dan catatan di broker. (d) format; pengamatan: pesan memakai tanda kutip tunggal yang bukan JSON sah. 2: pseudocode: bila `gagalBerturut > 3` kembalikan "broker" sebelum memeriksa pesan; kasus uji: `gagalBerturut` 3 tidak melaporkan broker karena batasnya "lebih dari 3", 4 melaporkannya, 0 tidak berpengaruh; nilai batas wajib diuji. 3: tidak ada kunci tunggal. Catatan yang baik: tiap baris satu dugaan dan satu pengamatan (mis. cetak ID klien kedua papan), hasilnya, dan tindakan seperti mengganti ID papan kedua. 4: tidak ada kunci tunggal; jawaban yang baik mencatat lapis, pengamatan, dan tindakan, tanpa mengubah banyak hal sekaligus.

**Latihan bercampur.** 1: pada `/25`, `192.0.2.23` ada di blok 0 sampai 127 dan `192.0.2.130` di blok 128 sampai 255, jadi beda jaringan; ditolak di lapis alamat (sejaringan dengan broker). 2: lapis format; koma sebelum `}` tidak diizinkan JSON; broker meneruskan isi pesan apa adanya dan tidak memeriksa bentuknya.

**Ulang berjarak.** 1: karena bila gangguan hilang, kamu tahu perubahan mana penyebabnya, dan tidak menambah gangguan baru. 2: daya (lampu menyala), sinyal (status Wi-Fi dan RSSI), alamat (cetak alamat dan bandingkan dengan jaringan broker), broker (status sambungan klien), format (periksa pesan dengan pemeriksa JSON). 3: sambungan Wi-Fi hanya sampai ke titik akses; alamat, broker, dan format masih bisa salah.

## Langkah berikutnya

Modul berikut: `c-xi2-m9` (sumber data terbuka dan legal), yang beralih dari menyambungkan data ke menilai dari mana data berasal. Pembacaan lanjut: dokumentasi Wi-Fi Arduino-ESP32 milik Espressif dan spesifikasi MQTT.
