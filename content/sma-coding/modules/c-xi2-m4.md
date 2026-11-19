## Untuk siapa modul ini

Modul ini untuk murid kelas XI jalur C (IoT dan robotika), minggu `C-XI2-M4` silabus v1.4: server mini (F). Prasyarat: modul `c-xi2-m3` (klien HTTP); kamu juga memakai alamat IP dari `c-xi2-m1` dan penyangga berukuran tetap dari `c-xi1-m10` (modul `c-xi1-m10` belum terindeks saat modul ini ditulis, jadi tidak ditulis sebagai prasyarat resmi).

Modul ini berstatus DRAF: karangan penyusun, belum ditinjau pemilik. Ia mendukung butir `F-BK-d` (model jaringan, pengiriman data, dan pemecahan masalah) dan tidak dihitung memenuhi butir capaian pembelajaran mana pun. Keluaran minggu ini: halaman data. Latihan silabusnya: halaman suhu lokal.

Ada dua cara mengerjakan. **Dengan papan (F):** papan ESP32 melayani halaman suhu, dan kamu membukanya dari peramban komputer yang berada di jaringan lab yang sama; bila gurumu memilih, layanan dijalankan di komputer lab. **Tanpa papan:** kamu menjalankan program di komputer yang menjawab permintaan karangan dan membaca kode serta isinya. Alamat dari lembar guru; angka suhu di modul ini karangan.

## Keselamatan perangkat

- Papan hanya memakai daya dari kabel USB. Tidak ada listrik jaringan (220 V) dan tidak ada baterai pada modul ini.
- Server mini hanya ada di **jaringan lab**. Jangan membuka akses ke internet (misalnya meneruskan port di router) dan jangan menyambungkan papan ke jaringan lain.
- Halaman hanya menampilkan suhu karangan atau suhu ruang; tidak ada data pribadi dan tidak ada halaman yang mengendalikan perangkat.
- Papan yang terasa panas, berbau, atau berasap: cabut kabel dan panggil guru.

## Ingat kembali

Jawab dari ingatan dulu, baru cek di kunci. Soal 1 dari `c-xi1-m10`, soal 2 dari `C-XI2-M3`, soal 3 dari `C-XI2-M1`.

1. Mengapa penerima memakai penyangga berukuran tetap dan membuang baris yang terlalu panjang, bukan menumbuhkannya?
2. Mengapa kode 400 tidak diulang tetapi kode 503 diulang?
3. Dua perangkat berada di jaringan yang sama bila bagian mana dari alamat IP mereka sama? Beri contoh dengan `/24`.

## Tujuan

Setelah modul ini kamu dapat:

- menjelaskan peran server: menunggu permintaan, mencocokkan jalur, dan menjawab dengan kode serta isi;
- menulis penanganan jalur dengan kode 200, 404, dan 405, serta menolak permintaan yang terlalu panjang;
- menjelaskan mengapa teks dari luar harus diloloskan sebelum masuk ke halaman HTML;
- menjalankan server mini tanpa memblokir `loop()`;
- membuat halaman suhu lokal (keluaran minggu ini).

## Prediksi dulu

Fungsi `tangani` menerima baris pertama permintaan. Aturannya: baris lebih dari 64 karakter dijawab `414`; baris yang tidak punya tiga bagian dijawab `400`; metode selain `GET` dijawab `405`; jalur `/` dijawab `200` dengan halaman HTML; jalur `/suhu` dijawab `200` dengan teks; jalur lain dijawab `404`, dan halaman 404 **menyalin jalur ke dalam HTML**. **Tebak dulu, tulis jawabanmu, baru jalankan.**

1. Berapa kode jawaban untuk: `GET /suhu HTTP/1.1`, `POST /suhu HTTP/1.1`, `GET /angin HTTP/1.1`, dan baris `GET /` diikuti 70 huruf `a` lalu ` HTTP/1.1`?
2. Pada permintaan `GET /<b>x HTTP/1.1`, apa yang sebaiknya tertulis di halaman 404? Apa risikonya bila jalur disalin apa adanya?

## Contoh terselesaikan

Server menunggu permintaan, membaca baris pertama, mencocokkan jalur, lalu menjawab. Dua hal membuatnya aman dipakai di mikrokontroler: **batas ukuran** (penyangga tetap; baris terlalu panjang ditolak, bukan ditumbuhkan sampai memori habis) dan **tidak mempercayai teks dari luar**: jalur yang dikirim peramban lain bisa berisi karakter seperti `<` yang, bila disalin apa adanya ke halaman, ditafsirkan sebagai kode halaman. Karena itu karakter khusus HTML diloloskan (`<` menjadi `&lt;`). Program berikut mengerjakan keduanya tanpa jaringan.

```cpp
// C++17 biasa, jalan di komputer. Diperiksa oleh check:module-code.
#include <iostream>
#include <string>

struct Jawaban {
  int kode;
  std::string jenis;
  std::string isi;
};

const size_t MAKS_BARIS = 64;  // penyangga berukuran tetap: lebih panjang ditolak
const double SUHU_TERAKHIR = 27.5;  // karangan

std::string escapeHtml(const std::string &s) {
  std::string hasil;
  for (char c : s) {
    if (c == '<') {
      hasil += "&lt;";
    } else if (c == '>') {
      hasil += "&gt;";
    } else if (c == '&') {
      hasil += "&amp;";
    } else if (c == '"') {
      hasil += "&quot;";
    } else {
      hasil += c;
    }
  }
  return hasil;
}

std::string suhuTeks() {
  std::string t = std::to_string(SUHU_TERAKHIR);  // 27.500000
  return t.substr(0, t.find('.') + 2);
}

Jawaban tangani(const std::string &baris) {
  if (baris.size() > MAKS_BARIS) {
    return {414, "text/plain", "Baris terlalu panjang"};
  }
  size_t s1 = baris.find(' ');
  size_t s2 = baris.find(' ', s1 + 1);
  if (s1 == std::string::npos || s2 == std::string::npos) {
    return {400, "text/plain", "Permintaan tidak dapat dibaca"};
  }
  std::string metode = baris.substr(0, s1);
  std::string jalur = baris.substr(s1 + 1, s2 - s1 - 1);
  if (metode != "GET") {
    return {405, "text/plain", "Hanya GET"};
  }
  if (jalur == "/") {
    return {200, "text/html", "<p>Suhu: " + suhuTeks() + " C</p>"};
  }
  if (jalur == "/suhu") {
    return {200, "text/plain", suhuTeks()};
  }
  return {404, "text/html", "<p>Tidak ditemukan: " + escapeHtml(jalur) + "</p>"};
}

int main() {
  const std::string uji[] = {
      "GET / HTTP/1.1",
      "GET /suhu HTTP/1.1",
      "GET /<b>x HTTP/1.1",
      "POST /suhu HTTP/1.1",
      "GET /" + std::string(70, 'a') + " HTTP/1.1",
      "sampah",
  };
  for (const std::string &baris : uji) {
    Jawaban j = tangani(baris);
    std::cout << j.kode << " " << j.jenis << " | " << j.isi << "\n";
  }
}
```

Keluarannya:

```text
200 text/html | <p>Suhu: 27.5 C</p>
200 text/plain | 27.5
404 text/html | <p>Tidak ditemukan: /&lt;b&gt;x</p>
405 text/plain | Hanya GET
414 text/plain | Baris terlalu panjang
400 text/plain | Permintaan tidak dapat dibaca
```

Baris ketiga adalah intinya: jalur `/<b>x` ditulis `/&lt;b&gt;x`, tampil sebagai teks, bukan sebagai tag. Baris kelima menunjukkan batas: permintaan panjang ditolak dengan `414`.

Sketsa berikut menjalankan server mini pada papan. Ia hanya diperiksa sintaksnya terhadap header tiruan, tidak dijalankan pada papan; nama anggota `WebServer` mengikuti pustaka Arduino-ESP32, periksa versi intimu `[belum terverifikasi]`. Perhatikan `loop()`: `handleClient()` dipanggil terus-menerus. Bila kamu menaruh `delay` panjang di sana, papan tak menjawab selama menunggu, sama seperti masalah `delay` di modul waktu sebelumnya.

```arduino
// Arduino-C++ untuk ESP32. Diperiksa check:module-code terhadap header tiruan (sintaks dan tipe saja, bukan bukti perilaku papan).
#include <WebServer.h>
#include <WiFi.h>

WebServer server(80);
float suhuTerakhir = 27.5;  // nilai contoh; ganti dengan pembacaan sensor

void halamanUtama() {
  server.send(200, "text/html", String("<p>Suhu: ") + String(suhuTerakhir, 1) + " C</p>");
}

void jalurSuhu() {
  server.send(200, "text/plain", String(suhuTerakhir, 1));
}

void tidakAda() {
  // Jangan menyalin alamat dari permintaan ke dalam halaman tanpa meloloskan karakternya.
  server.send(404, "text/plain", "Tidak ditemukan");
}

void setup() {
  Serial.begin(115200);
  // Sambungan Wi-Fi seperti modul 1 (WiFi.begin ... WL_CONNECTED), lalu:
  server.on("/", halamanUtama);
  server.on("/suhu", jalurSuhu);
  server.onNotFound(tidakAda);
  server.begin();
  Serial.println(WiFi.localIP().toString());
}

void loop() {
  server.handleClient();  // dipanggil sering; jangan pakai delay panjang di sini
}
```

Sketsa ini menjawab 404 dengan teks tetap, sehingga tidak menyalin jalur sama sekali; itu cara paling aman. Bila kelak sebuah halaman harus menampilkan teks dari luar, loloskan seperti pada program komputer di atas. Server ini tidak punya sandi: siapa pun di jaringan lab dapat membuka halamannya, jadi isinya harus data yang memang boleh dilihat, dan perangkat tidak dikendalikan dari halaman ini.

## Contoh setengah jadi

Sekarang menambah jalur. Lengkapi bagian `____`: tambahkan jalur `/lembap` yang menjawab `200` dengan kelembapan karangan `60`, dan jawab `404` untuk jalur lain.

```cpp setengah-jadi
// C++17. Lengkapi bagian ____.
#include <string>

struct Jawaban {
  int kode;
  std::string jenis;
  std::string isi;
};

Jawaban rute(const std::string &jalur) {
  if (jalur == "/suhu") {
    return {200, "text/plain", "27.5"};
  }
  if (jalur == ____) {
    return {200, "text/plain", ____};
  }
  return {____, "text/plain", "Tidak ditemukan"};
}
```

## Soal Parsons

Susun baris-baris di bawah (sudah diacak) menjadi `setup()` server: mulai Serial, daftarkan jalur, baru jalankan server.

```text
(a)   server.begin();
(b) void setup() {
(c)   Serial.begin(115200);
(d)   server.on("/", halamanUtama);
(e)   server.on("/suhu", jalurSuhu);
(f)   server.onNotFound(tidakAda);
(g) }
```

## Latihan

1. `AI: tanpa AI` **Telusuri.** Program contoh menerima `GET /suhu?x=1 HTTP/1.1`. Berapa kode jawabannya, dan mengapa? Bagaimana memperbaikinya?
2. `AI: boleh` **Rancang dulu.** Tulis pseudocode lalu tambahkan jalur `/lembap` ke program contoh, beserta satu halaman `/` yang menampilkan suhu dan kelembapan (keluaran minggu ini: halaman data).
3. `AI: tanpa AI` **Jelaskan.** Mengapa `<` diubah menjadi `&lt;` sebelum jalur dimasukkan ke halaman?
4. `AI: boleh` **Dengan papan (F).** Jalankan server mini, lalu buka alamat papan dari peramban komputer di jaringan lab dan catat apa yang tampil untuk `/`, `/suhu`, dan satu jalur yang tidak ada. Tanpa papan, kerjakan nomor 2. Jangan membuka akses ke luar jaringan lab.
5. *Opsional:* **catatan pemakaian AI.** Bila memakai AI generatif, jawab nomor 2 sendiri dulu, lalu minta petunjuk bertahap atau kritik atas rancanganmu, bukan program jadi. Catat alatnya, tujuanmu, garis besar perintahmu, bagian yang kamu pakai, dan cara memeriksanya. Jangan menaruh sandi, kunci, atau alamat jaringan sekolah pada perintah.

## Latihan bercampur

1. Hitung `Content-Length` untuk badan `suhu=-5.0`, lalu sebut satu hal yang harus diperiksa server sebelum mempercayai badan itu. (dari `C-XI2-M3`)
2. Server mini ini tidak punya sandi. Sebut dua kebiasaan keamanan yang sudah kamu pelajari dan masih berlaku untuknya. (dari `C-XI2-M2`)

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `C-XI2-M5` (sekitar satu minggu lagi), `C-XI2-M7` (sekitar tiga minggu lagi), dan `C-XI2-M12` (sekitar delapan minggu lagi). Jawab sekarang lalu simpan.

1. Mengapa teks dari luar harus diloloskan sebelum dimasukkan ke halaman HTML?
2. Mengapa server harus memanggil `handleClient()` sesering mungkin, dan apa akibat `delay` panjang di `loop()`?
3. Mengapa halaman data di jaringan lab tidak dibuka ke internet?

## Kesalahan umum

- **Menyalin jalur atau masukan ke halaman tanpa meloloskannya.** Teks dari luar bisa memuat tag atau skrip yang ikut dijalankan peramban.
- **Menaruh `delay` panjang di `loop()`.** Selama menunggu, server tidak menjawab dan peramban menampilkan "tidak terhubung".
- **Membandingkan jalur tanpa memisahkan argumen.** `/suhu?x=1` tidak sama dengan `/suhu`; pustaka server menyediakan cara membaca jalur dan argumen terpisah.
- **Mengira 404 untuk `/favicon.ico` adalah galat program.** Peramban sering meminta berkas ikon sendiri; jawaban 404 untuknya wajar.
- **Mengira halaman yang "hanya terlihat di lab" tidak perlu aturan keamanan.** Siapa pun di jaringan itu dapat membukanya; batasi isinya dan jangan meneruskan port ke luar.

## Cek mandiri

- [ ] Saya dapat menjelaskan peran server dan alur permintaan dan jawabannya.
- [ ] Saya menulis jawaban 200, 404, dan 405 serta menolak permintaan terlalu panjang.
- [ ] Saya meloloskan teks dari luar sebelum memasukkannya ke halaman.
- [ ] Saya tidak menaruh `delay` panjang di `loop()` server.
- [ ] Saya tahu server mini tidak dibuka ke internet.

## Kunci dan petunjuk

**Ingat kembali.** 1: memori mikrokontroler terbatas; baris tanpa batas dapat menghabiskan atau meluapkan memori (dan bisa dikirim sengaja panjang); membuang baris yang melebihi batas, dan mencatat bahwa ada yang dibuang, menjaga program tetap hidup. 2: 400 berarti permintaan salah dan tetap salah bila diulang; 503 berarti server sementara tak mampu dan mungkin pulih. 3: bagian jaringan, yaitu bit awal sepanjang awalan; pada `/24` tiga angka pertama sama, mis. `192.0.2.23` dan `192.0.2.200`.

**Prediksi dulu.** 1: `GET /suhu` menjadi 200; `POST /suhu` menjadi 405; `GET /angin` menjadi 404; baris panjang menjadi 414. 2: halaman sebaiknya menulis jalur sebagai teks, yaitu `/&lt;b&gt;x`. Bila disalin apa adanya, peramban menafsirkan `<b>` sebagai tag dan, pada kasus yang lebih berbahaya, bisa menjalankan skrip yang disisipkan orang lain.

**Contoh setengah jadi.** Isian berurutan: `"/lembap"`, `"60"`, `404`. Hasil kunci yang dikompilasi dan dijalankan penulis untuk `/suhu`, `/lembap`, dan `/angin`: `200 27.5`, `200 60`, dan `404 Tidak ditemukan`.

**Soal Parsons.** Urutan benar: b, c, d, e, f, a, g. Baris (d), (e), dan (f) boleh bertukar urutan asal semuanya sebelum (a): jalur didaftarkan sebelum server dijalankan.

**Latihan.** 1: kode 404, karena jalur yang dibaca adalah `/suhu?x=1` yang tidak sama dengan `/suhu`. Perbaiki dengan memotong jalur pada tanda `?` sebelum dibandingkan. 2: pseudocode: bila jalur `/lembap`, jawab 200 dengan angka kelembapan; bila `/`, jawab halaman berisi suhu dan kelembapan; selain itu jawab 404. 3: supaya karakter itu tampil sebagai teks, bukan ditafsirkan peramban sebagai tag. 4: tidak ada kunci tunggal; jawaban yang baik mencatat isi halaman untuk tiga jalur tersebut.

**Latihan bercampur.** 1: badan `suhu=-5.0` terdiri dari 9 karakter, jadi `Content-Length: 9`; server memeriksa bahwa panjang badan sama dengan `Content-Length` dan bahwa nilainya masuk akal (angka dalam rentang) sebelum memakainya. 2: contoh: jaringan lab terpisah dan hanya data yang boleh dilihat; sandi bawaan diganti dan rahasia tidak ditanam di kode.

**Ulang berjarak.** 1: agar karakter khusus tampil sebagai teks dan tidak ditafsirkan sebagai tag atau skrip. 2: server hanya menjawab saat `handleClient()` dipanggil; `delay` panjang membuat permintaan menunggu atau gagal. 3: siapa pun di internet dapat mencobanya, sedangkan server ini tidak punya sandi dan dibuat untuk data karangan.

## Langkah berikutnya

Modul berikut: `c-xi2-m5` (publikasi-langganan: konsep), yang memperkenalkan pola lain untuk menyampaikan data: penengah pesan. Pembacaan lanjut: pengantar HTTP di MDN dan kode `WebServer` pada repositori Arduino-ESP32.
