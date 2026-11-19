## Untuk siapa modul ini

Modul ini untuk murid kelas XI jalur C (IoT dan robotika), minggu `C-XI2-M3` silabus v1.4: klien HTTP (F). Prasyarat: modul `c-xi2-m2` (keamanan konektivitas); kamu juga memakai papan yang tersambung dari `c-xi2-m1`, pola waktu `millis()` dari `c-x2-m7`, dan penyangga dari `c-x2-m9`.

Modul ini berstatus DRAF: karangan penyusun, belum ditinjau pemilik. Ia mendukung butir `F-BK-d` (model jaringan, pengiriman data, dan pemecahan masalah) dan tidak dihitung memenuhi butir capaian pembelajaran mana pun. Keluaran minggu ini: program klien. Latihan silabusnya: mengirim suhu ke server lab.

Ada dua cara mengerjakan. **Dengan papan (F):** papan mengirim suhu ke server lokal di komputer guru. **Tanpa papan:** kamu menyusun teks permintaan, membaca kode jawaban, dan menjalankan "klien tiruan" di komputer dengan jawaban server yang dikarang. Alamat server dan jalurnya dari lembar guru; alamat di modul ini hanya contoh. Server guru dibuat dan dijalankan guru; menulisnya bukan tugasmu minggu ini.

## Keselamatan perangkat

- Papan hanya memakai daya dari kabel USB. Tidak ada listrik jaringan (220 V) dan tidak ada baterai pada modul ini.
- Papan hanya disambungkan ke **jaringan lab**. HTTP biasa tidak terenkripsi: yang dikirim di jaringan ini hanya data karangan atau suhu ruang, tidak pernah sandi atau data pribadi.
- Tidak ada rangkaian baru; cabut kabel USB sebelum mengubah apa pun pada papan.
- Modul ini tidak memakai kamera atau mikrofon, dan tidak mengukur tubuh siapa pun.
- Papan yang terasa panas, berbau, atau berasap: cabut kabel dan panggil guru.

## Ingat kembali

Jawab dari ingatan dulu, baru cek di kunci. Soal 1 dari `c-xi1-m9`, soal 2 dari `C-XI2-M2`, soal 3 dari `c-x2-m7`.

1. Mengapa penyangga melingkar cocok menampung pembacaan bila pengiriman ke server sesekali gagal, dan apa yang hilang bila penuh?
2. Bila sandi sempat terunggah ke tempat bersama, mengapa menghapus berkasnya tidak cukup, dan apa yang harus dilakukan?
3. Mengapa `sekarang - mulai` tetap benar saat `millis()` kembali ke 0 (tipe `unsigned long`)?

## Tujuan

Setelah modul ini kamu dapat:

- menjelaskan alur permintaan dan jawaban HTTP: metode, jalur, header, badan, dan kode status;
- menyusun permintaan POST berisi data sensor dan menghitung `Content-Length`;
- membedakan kegagalan yang layak diulang (tanpa jawaban, atau kode 5xx) dari yang tidak (kode 4xx);
- menulis pengulangan dengan batas jumlah dan jeda yang membesar;
- menulis program klien yang mengirim suhu ke server lab dengan batas waktu.

## Prediksi dulu

Fungsi `kirimDenganUlang` mencoba paling banyak `maks` kali. Ia mengulang **hanya bila** tidak ada jawaban (kode negatif) atau kode 500 ke atas, dengan jeda awal 500 ms yang dilipatkan tiap kali gagal; sesudah percobaan terakhir ia tidak menunggu lagi. Skenario memberi kode tiap percobaan. **Tebak dulu, tulis jawabanmu, baru jalankan.**

- Skenario A, `maks = 4`: kode `-1`, `-1`, `200`.
- Skenario B, `maks = 4`: kode `400`.
- Skenario C, `maks = 3`: kode `-1`, `503`, `-1`.

1. Untuk tiap skenario: berapa percobaan dilakukan, berapa milidetik total jeda, dan apakah akhirnya terkirim?
2. Mengapa kode `400` tidak diulang padahal gagal?

## Contoh terselesaikan

HTTP bekerja dengan **permintaan** dan **jawaban**. Permintaan berisi baris awal (metode, jalur, versi), beberapa baris header, baris kosong, lalu badan. Jawaban berisi baris status (versi, kode, teks), header, dan badan. Kode status dikelompokkan: 2xx berhasil, 4xx kesalahan pada permintaan (tidak akan membaik bila diulang apa adanya), 5xx kesalahan di server (mungkin pulih). Kode negatif pada `HTTPClient` papan berarti kegagalan sebelum ada jawaban, misalnya server tak terjangkau. Penjelasan ringkas HTTP ada di dokumentasi MDN (lihat rujukan).

Program berikut menyusun permintaan, membaca kode dari baris status, dan menjalankan pengulangan dengan jawaban karangan. Ia tidak menyentuh jaringan.

```cpp
// C++17 biasa, jalan di komputer. Diperiksa oleh check:module-code.
#include <iostream>
#include <string>
#include <vector>

std::string bangunPermintaan(const std::string &host, const std::string &jalur,
                             const std::string &badan) {
  return "POST " + jalur + " HTTP/1.1\r\n" + "Host: " + host + "\r\n" +
         "Content-Type: text/plain\r\n" + "Content-Length: " + std::to_string(badan.size()) +
         "\r\n" + "Connection: close\r\n" + "\r\n" + badan;
}

// "HTTP/1.1 200 OK" -> 200. Mengembalikan -1 bila baris tidak dapat dibaca.
int ambilKode(const std::string &baris) {
  size_t spasi = baris.find(' ');
  if (spasi == std::string::npos || baris.size() < spasi + 4) {
    return -1;
  }
  std::string tiga = baris.substr(spasi + 1, 3);
  for (char c : tiga) {
    if (c < '0' || c > '9') {
      return -1;
    }
  }
  return std::stoi(tiga);
}

// Pengganti POST: setiap percobaan mengambil satu kode dari skenario.
// Kode negatif = gagal sebelum ada jawaban (seperti HTTPClient pada papan).
int postTiruan(const std::vector<int> &skenario, int percobaan) {
  return skenario[percobaan - 1];
}

bool layakDiulang(int kode) { return kode < 0 || kode >= 500; }

bool kirimDenganUlang(const std::vector<int> &skenario, int maksPercobaan) {
  int tunggu = 500;
  for (int percobaan = 1; percobaan <= maksPercobaan; percobaan++) {
    int kode = postTiruan(skenario, percobaan);
    std::cout << "percobaan " << percobaan << ": kode " << kode << "\n";
    if (kode >= 200 && kode < 300) {
      return true;
    }
    if (!layakDiulang(kode)) {
      std::cout << "  kesalahan permintaan, tidak diulang\n";
      return false;
    }
    if (percobaan < maksPercobaan) {
      std::cout << "  tunggu " << tunggu << " ms\n";
      tunggu *= 2;
    }
  }
  return false;
}

int main() {
  std::string permintaan = bangunPermintaan("192.0.2.10", "/suhu", "suhu=27.5");
  for (char c : permintaan) {
    if (c != '\r') {
      std::cout << c;
    }
  }
  std::cout << "\n---\n";
  std::cout << "kode dari jawaban: " << ambilKode("HTTP/1.1 200 OK") << ", "
            << ambilKode("HTTP/1.1 404 Not Found") << ", " << ambilKode("sampah") << "\n---\n";
  std::cout << (kirimDenganUlang({-1, -1, 200}, 4) ? "terkirim" : "gagal") << "\n---\n";
  std::cout << (kirimDenganUlang({400}, 4) ? "terkirim" : "gagal") << "\n---\n";
  std::cout << (kirimDenganUlang({-1, 503, -1}, 3) ? "terkirim" : "gagal") << "\n";
}
```

Keluarannya:

```text
POST /suhu HTTP/1.1
Host: 192.0.2.10
Content-Type: text/plain
Content-Length: 9
Connection: close

suhu=27.5
---
kode dari jawaban: 200, 404, -1
---
percobaan 1: kode -1
  tunggu 500 ms
percobaan 2: kode -1
  tunggu 1000 ms
percobaan 3: kode 200
terkirim
---
percobaan 1: kode 400
  kesalahan permintaan, tidak diulang
gagal
---
percobaan 1: kode -1
  tunggu 500 ms
percobaan 2: kode 503
  tunggu 1000 ms
percobaan 3: kode -1
gagal
```

`Content-Length` bernilai 9 karena badan `suhu=27.5` terdiri dari 9 karakter. Skenario pertama berhasil pada percobaan ketiga setelah menunggu 500 ms dan 1000 ms. Skenario kedua berhenti seketika: permintaan yang salah tidak menjadi benar karena diulang. Skenario ketiga menyerah setelah batas: pengulangan **selalu punya batas**, karena server yang mati tidak boleh membuat papan sibuk mencoba selamanya (dan membebani jaringan lab dengan permintaan beruntun).

Sketsa berikut mengirim suhu contoh setiap 10 detik dengan pola `millis()`. Ia hanya diperiksa sintaksnya terhadap header tiruan, tidak dijalankan pada papan. Nama dan perilaku `HTTPClient` mengikuti pustaka Arduino-ESP32; periksa versi inti yang kamu pakai `[belum terverifikasi]`. Pengulangan di `loop()` memakai `delay(500)` pendek yang membuat papan menunggu: untuk tiga percobaan itu sekitar 1,5 detik tidak membaca apa pun, jadi pada sistem yang lebih sibuk jeda itu diganti pola `millis()`.

```arduino
// Arduino-C++ untuk ESP32. Diperiksa check:module-code terhadap header tiruan (sintaks dan tipe saja, bukan bukti perilaku papan).
#include <HTTPClient.h>
#include <WiFi.h>

// Alamat server lab dari lembar guru; "/suhu" adalah contoh jalur.
const char* ALAMAT_SERVER = "http://192.0.2.10:8080/suhu";
const unsigned long SELANG_MS = 10000;
const int MAKS_PERCOBAAN = 3;

unsigned long mulai = 0;

// Mengembalikan true bila server menjawab 2xx. Sambungan Wi-Fi diurus di setup() seperti modul 1.
bool kirimSuhu(float suhu) {
  HTTPClient http;
  http.setConnectTimeout(3000);
  http.setTimeout(3000);
  if (!http.begin(ALAMAT_SERVER)) {
    return false;
  }
  http.addHeader("Content-Type", "text/plain");
  int kode = http.POST(String("suhu=") + String(suhu, 1));
  http.end();
  Serial.print("kode: ");
  Serial.println(kode);
  return kode >= 200 && kode < 300;
}

void setup() {
  Serial.begin(115200);
  mulai = millis();
}

void loop() {
  if (WiFi.status() == WL_CONNECTED && millis() - mulai >= SELANG_MS) {
    mulai += SELANG_MS;
    for (int i = 0; i < MAKS_PERCOBAAN; i++) {
      if (kirimSuhu(27.5)) {  // nilai contoh; ganti dengan pembacaan sensor
        break;
      }
      delay(500);
    }
  }
}
```

## Contoh setengah jadi

Sekarang dua aturan pengulangan. Lengkapi bagian `____`: ulang bila kode negatif atau 500 ke atas, dan lipatkan jeda dua kali.

```cpp setengah-jadi
// C++17. Lengkapi bagian ____.
bool layakDiulang(int kode) { return kode ____ 0 || kode >= ____; }

int tungguBerikut(int tunggu) { return tunggu * ____; }
```

## Soal Parsons

Susun baris-baris di bawah (sudah diacak) menjadi fungsi `kirimSuhu` pada sketsa, dengan urutan yang benar: buat klien, mulai, tambah header, kirim, tutup, lalu laporkan.

```text
(a)   http.end();
(b) bool kirimSuhu(float suhu) {
(c)   HTTPClient http;
(d)   if (!http.begin(ALAMAT_SERVER)) {
(e)     return false;
(f)   }
(g)   int kode = http.POST(String("suhu=") + String(suhu, 1));
(h)   return kode >= 200 && kode < 300;
(i) }
(j)   http.addHeader("Content-Type", "text/plain");
```

## Latihan

1. `AI: tanpa AI` **Hitung.** Tulis permintaan POST ke host `192.0.2.10`, jalur `/lembap`, badan `lembap=61.0`. Berapa `Content-Length`?
2. `AI: boleh` **Pseudocode dulu.** Tulis pseudocode lalu ubah `layakDiulang` agar kode 429 (terlalu banyak permintaan) juga diulang; tambahkan satu skenario ke `main` yang membuktikannya (keluaran minggu ini: program klien).
3. `AI: tanpa AI` **Jelaskan.** Mengapa pengulangan tidak boleh tanpa batas dan tanpa jeda?
4. `AI: boleh` **Dengan papan (F).** Kirim suhu ke server lab dan baca kodenya di Serial Monitor. Atas arahan guru, minta server dimatikan sebentar lalu amati kode negatif dan jumlah percobaan. Tanpa papan, kerjakan nomor 2. Jangan mengirim data selain suhu karangan.
5. *Opsional:* **catatan pemakaian AI.** Bila memakai AI generatif, jawab nomor 2 sendiri dulu, lalu minta petunjuk bertahap atau kritik atas pseudocodemu, bukan program jadi. Catat alatnya, tujuanmu, garis besar perintahmu, bagian yang kamu pakai, dan cara memeriksanya. Jangan menaruh sandi, kunci, atau alamat jaringan sekolah pada perintah.

## Latihan bercampur

1. Alamat server pada sketsa adalah `http://192.0.2.10:8080/suhu`. Apakah alamat itu rahasia? Bila server kelak meminta sandi, di mana sandinya ditaruh? (dari `C-XI2-M2`)
2. Dengan `SELANG_MS = 10000`, berapa permintaan per jam dan per hari? Mengapa selang jangan terlalu pendek? (dari `c-x2-m7`)

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `C-XI2-M4` (sekitar satu minggu lagi), `C-XI2-M6` (sekitar tiga minggu lagi), dan `C-XI2-M11` (sekitar delapan minggu lagi). Jawab sekarang lalu simpan.

1. Mengapa kode 400 tidak diulang tetapi kode 503 diulang?
2. Mengapa pengulangan diberi batas jumlah dan jeda yang membesar?
3. Apa isi baris pertama permintaan HTTP, dan apa isi baris pertama jawabannya?

## Kesalahan umum

- **Mengulang tanpa batas.** Server yang mati membuat papan mencoba selamanya dan membanjiri jaringan lab.
- **Mengulang kode 4xx.** Permintaan yang salah tetap salah; perbaiki permintaannya.
- **Salah `Content-Length`.** Panjangnya harus sama dengan jumlah byte badan; kurang atau lebih membuat server salah membaca.
- **Mengira kode negatif adalah kode HTTP.** Kode negatif dari `HTTPClient` berarti gagal sebelum ada jawaban; kode HTTP yang asli antara 100 dan 599.
- **Mengirim data sensitif lewat HTTP biasa.** HTTP biasa tidak terenkripsi; di jaringan lab pun hanya data karangan.

## Cek mandiri

- [ ] Saya dapat menyebut bagian permintaan dan jawaban HTTP.
- [ ] Saya dapat menyusun permintaan POST dan menghitung `Content-Length`.
- [ ] Saya tahu kapan kegagalan layak diulang dan kapan tidak.
- [ ] Saya memberi batas jumlah dan jeda pada pengulangan.
- [ ] Saya hanya mengirim data karangan atau suhu ke server lab.

## Kunci dan petunjuk

**Ingat kembali.** 1: penyangga melingkar berukuran tetap dan menimpa data tertua saat penuh, sehingga papan tidak kehabisan memori saat server mati; yang hilang adalah pembacaan paling lama. 2: riwayat dan salinan lama masih menyimpan sandi; ganti sandinya dan cabut yang lama. 3: selisih dihitung pada `unsigned long` sehingga melingkar dengan benar: nilai setelah kembali ke 0 dikurangi nilai sebelum kembali tetap menghasilkan selisih sebenarnya.

**Prediksi dulu.** 1: A: 3 percobaan, jeda 500 + 1000 = 1500 ms, terkirim. B: 1 percobaan, 0 ms, tidak terkirim. C: 3 percobaan, jeda 500 + 1000 = 1500 ms (tidak menunggu setelah percobaan terakhir), tidak terkirim. 2: kode 4xx berarti permintaannya yang salah; mengirim ulang permintaan yang sama menghasilkan jawaban yang sama.

**Contoh setengah jadi.** Isian berurutan: `<`, `500`, `2`. Hasil kunci yang dikompilasi dan dijalankan penulis: `layakDiulang` bernilai benar untuk -1 dan 503 dan salah untuk 404 dan 200; `tungguBerikut(500)` bernilai 1000.

**Soal Parsons.** Urutan benar: b, c, d, e, f, j, g, a, h, i. Baris (j) harus sebelum (g) karena header ikut terkirim bersama POST; (a) memanggil `end()` sebelum fungsi mengembalikan hasil.

**Latihan.** 1: badan `lembap=61.0` terdiri dari 11 karakter, jadi `Content-Length: 11`; permintaan: `POST /lembap HTTP/1.1`, `Host: 192.0.2.10`, `Content-Type: text/plain`, `Content-Length: 11`, `Connection: close`, baris kosong, lalu badan. 2: pseudocode: bila kode kurang dari 0, atau 429, atau 500 ke atas, kembalikan benar. Contoh perubahan: `return kode < 0 || kode == 429 || kode >= 500;` dan skenario `{429, 200}` yang berhasil pada percobaan kedua. 3: tanpa batas, papan tak pernah menyerah; tanpa jeda, ia membanjiri server yang sedang kesulitan dan menghabiskan waktu papan. 4: tidak ada kunci tunggal; jawaban yang baik mencatat kode yang terbaca dan jumlah percobaan saat server dimatikan.

**Latihan bercampur.** 1: tidak rahasia; alamat server hanya menunjuk ke mana data dikirim dan ada di lembar guru. Sandi, bila ada, ditaruh di `rahasia.h` yang tidak dibagikan. 2: 3600 detik dibagi 10 menghasilkan 360 permintaan per jam, dan 8640 per hari. Selang yang terlalu pendek membebani server dan jaringan serta menghabiskan daya papan tanpa menambah informasi (suhu tidak berubah secepat itu).

**Ulang berjarak.** 1: 400 berarti permintaan itu sendiri salah dan tetap salah bila diulang; 503 berarti server sementara tidak mampu dan mungkin pulih. 2: tanpa batas papan tak pernah menyerah, dan jeda yang membesar memberi server waktu pulih serta mengurangi beban. 3: baris permintaan berisi metode, jalur, dan versi (mis. `POST /suhu HTTP/1.1`); baris jawaban berisi versi, kode status, dan teks (mis. `HTTP/1.1 200 OK`).

## Langkah berikutnya

Modul berikut: `c-xi2-m4` (server mini), yang membalik peran: papan atau komputer lab melayani halaman data. Pembacaan lanjut: pengantar HTTP di MDN dan kode `HTTPClient` pada repositori Arduino-ESP32.
