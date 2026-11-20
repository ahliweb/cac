## Untuk siapa modul ini

Modul ini untuk murid kelas XI jalur C (IoT dan robotika), minggu `C-XI2-M5` silabus v1.4: publikasi-langganan, konsep. Prasyarat: modul `c-xi2-m4` (server mini); kamu juga memakai klien HTTP dari `c-xi2-m3` sebagai pembanding.

Modul ini karangan penyusun dan disetujui pemilik program pada 2026-11-20 (keputusan lewat dialog; catatan tinjauan menjadi tindak lanjut revisi). Ia mendukung butir `F-BK-d` (model jaringan, pengiriman data, dan pemecahan masalah) dan tidak dihitung memenuhi butir capaian pembelajaran mana pun. Keluaran minggu ini: diagram alir pesan. Latihan silabusnya: permainan peran broker.

Seluruh modul ini dapat dikerjakan **tanpa papan**: kamu memainkan peran dengan kartu, menggambar diagram, dan menjalankan "broker tiruan" di komputer. Modul ini tidak memakai perangkat fisik; aturan keselamatan perangkat dari modul sebelumnya tetap berlaku bila kamu menyentuh papan. Semua topik, nama, dan nilai di modul ini karangan.

## Ingat kembali

Jawab dari ingatan dulu, baru cek di kunci. Soal 1 dari `c-xi1-m11`, soal 2 dari `C-XI2-M4`, soal 3 dari `C-XI2-M2`.

1. Mengapa pengirim dan penerima harus sepakat pada format pesan, dan apa yang terjadi bila tidak?
2. Mengapa teks dari luar harus diloloskan sebelum dimasukkan ke halaman HTML?
3. Sebut tiga hal yang tidak boleh ditempel ke layanan AI.

## Tujuan

Setelah modul ini kamu dapat:

- menjelaskan pola publikasi-langganan: penerbit, pelanggan, topik, dan penengah pesan (broker);
- membedakannya dari pola klien-server HTTP: siapa yang tahu alamat siapa, dan berapa penerima satu pesan;
- menulis filter topik dengan karakter pengganti `+` dan `#`, dan menentukan topik mana yang cocok;
- menggambar diagram alir pesan untuk sebuah sistem kecil (keluaran minggu ini);
- menyebut kelemahan broker sebagai titik tunggal dan risiko keamanannya.

## Prediksi dulu

Sebuah broker karangan menyimpan empat langganan (nama, filter): `pantau` dengan `lab/+/suhu`, `arsip` dengan `lab/#`, `kipasA` dengan `lab/a/kipas`, dan `papanA` dengan `lab/a/suhu`. Karakter `+` mewakili tepat satu tingkat topik; `#` mewakili semua tingkat sisanya dan hanya ditulis di akhir. Tingkat dipisahkan garis miring. **Tebak dulu, tulis jawabanmu, baru jalankan.**

1. Siapa saja yang menerima pesan bertopik `lab/a/suhu`?
2. Siapa yang menerima `lab/a/lembap`? Dan `lab/c/suhu/atas`?
3. Siapa yang menerima `LAB/a/suhu` (huruf besar)? Dan `ruang/a/suhu`?

## Contoh terselesaikan

Pada HTTP, klien tahu alamat server dan mengirim langsung. Pada **publikasi-langganan**, penerbit tidak tahu siapa penerimanya: ia menerbitkan pesan ke sebuah **topik**, dan **broker** (penengah pesan) meneruskannya ke semua pelanggan yang filter topiknya cocok. Penerbit dan pelanggan hanya perlu tahu alamat broker dan nama topik. Dalam kerangka I-P-O untuk satu pesan:

| Masukan | Proses | Keluaran |
| --- | --- | --- |
| topik dan isi pesan dari penerbit | broker mencocokkan topik dengan filter tiap pelanggan | salinan pesan ke setiap pelanggan yang cocok |

Aturan pencocokan mengikuti spesifikasi MQTT 3.1.1: nama topik peka huruf besar-kecil, `+` mewakili tepat satu tingkat, dan `#` mewakili parent dan semua tingkat di bawahnya (sehingga `lab/#` juga cocok dengan `lab`). Broker nyata punya banyak hal lain (jaminan pengiriman, pesan yang disimpan); minggu ini yang dipelajari hanya pola dan pencocokan topik.

```text
penerbit  --lab/a/suhu = 28.1-->  [ BROKER ]  --> pantau   (lab/+/suhu)
                                       |-------> arsip    (lab/#)
                                       '-------> papanA   (lab/a/suhu)
```

Program berikut adalah broker tiruan di dalam satu program: fungsi `cocok` mengikuti aturan di atas, dan `terbitkan` meneruskan pesan ke pelanggan yang cocok. Ia tidak memakai jaringan.

```cpp
// C++17 biasa, jalan di komputer. Diperiksa oleh check:module-code.
#include <iostream>
#include <string>
#include <vector>

std::vector<std::string> pecah(const std::string &teks) {
  std::vector<std::string> bagian;
  std::string sekarang;
  for (char c : teks) {
    if (c == '/') {
      bagian.push_back(sekarang);
      sekarang.clear();
    } else {
      sekarang += c;
    }
  }
  bagian.push_back(sekarang);
  return bagian;
}

// Apakah topik cocok dengan filter? '+' = tepat satu tingkat, '#' = sisanya (di akhir).
bool cocok(const std::string &filter, const std::string &topik) {
  std::vector<std::string> f = pecah(filter);
  std::vector<std::string> t = pecah(topik);
  for (size_t i = 0; i < f.size(); i++) {
    if (f[i] == "#") {
      return true;
    }
    if (i >= t.size()) {
      return false;
    }
    if (f[i] != "+" && f[i] != t[i]) {
      return false;
    }
  }
  return f.size() == t.size();
}

struct Langganan {
  std::string pelanggan;
  std::string filter;
};

std::vector<Langganan> daftar;

void berlangganan(const std::string &pelanggan, const std::string &filter) {
  daftar.push_back({pelanggan, filter});
}

void terbitkan(const std::string &topik, const std::string &pesan) {
  std::cout << topik << " = " << pesan << "\n";
  int terkirim = 0;
  for (const Langganan &l : daftar) {
    if (cocok(l.filter, topik)) {
      std::cout << "  -> " << l.pelanggan << "\n";
      terkirim++;
    }
  }
  if (terkirim == 0) {
    std::cout << "  (tidak ada pelanggan; pesan tidak disimpan)\n";
  }
}

int main() {
  berlangganan("pantau", "lab/+/suhu");
  berlangganan("arsip", "lab/#");
  berlangganan("kipasA", "lab/a/kipas");
  berlangganan("papanA", "lab/a/suhu");
  terbitkan("lab/a/suhu", "28.1");
  terbitkan("lab/b/suhu", "26.4");
  terbitkan("lab/a/lembap", "60");
  terbitkan("lab/a/kipas", "hidup");
  terbitkan("lab/c/suhu/atas", "30.2");
  terbitkan("LAB/a/suhu", "1");
  terbitkan("ruang/a/suhu", "25.0");
}
```

Keluarannya:

```text
lab/a/suhu = 28.1
  -> pantau
  -> arsip
  -> papanA
lab/b/suhu = 26.4
  -> pantau
  -> arsip
lab/a/lembap = 60
  -> arsip
lab/a/kipas = hidup
  -> arsip
  -> kipasA
lab/c/suhu/atas = 30.2
  -> arsip
LAB/a/suhu = 1
  (tidak ada pelanggan; pesan tidak disimpan)
ruang/a/suhu = 25.0
  (tidak ada pelanggan; pesan tidak disimpan)
```

Perhatikan tiga hal. `lab/c/suhu/atas` tidak cocok dengan `lab/+/suhu` karena `+` hanya satu tingkat, tetapi cocok dengan `lab/#`. `LAB/a/suhu` tidak diterima siapa pun karena huruf besar dan kecil dibedakan. Pesan tanpa pelanggan yang cocok tidak dikirim ke siapa pun; pada broker nyata aturannya lebih rinci (misalnya pesan yang ditandai untuk disimpan), jadi periksa dokumentasi broker yang dipakai.

Dua kelemahan pola ini perlu kamu ingat. Broker adalah **titik kegagalan tunggal**: bila ia mati, semua pesan berhenti walau semua papan sehat. Dan broker yang tidak diberi sandi dapat dibaca dan ditulisi siapa saja di jaringannya; di jaringan lab terpisah risikonya kecil, tetapi tetap ada (pelajaran keamanan konektivitas minggu kedua). Pada jaringan sungguhan, penerbit dan pelanggan memakai ID klien yang berbeda; praktiknya di modul berikut.

## Contoh setengah jadi

Sekarang pencocokan topik. Lengkapi bagian `____`: `f` adalah filter dan `t` adalah topik yang sudah dipecah per tingkat.

```cpp setengah-jadi
// C++17. Lengkapi bagian ____.
#include <string>
#include <vector>

bool cocok(const std::vector<std::string> &f, const std::vector<std::string> &t) {
  for (size_t i = 0; i < f.size(); i++) {
    if (f[i] == "____") {
      return true;
    }
    if (i >= t.size()) {
      return ____;
    }
    if (f[i] != "____" && f[i] != t[i]) {
      return false;
    }
  }
  return f.size() == ____;
}
```

## Soal Parsons

Susun baris-baris di bawah (sudah diacak) menjadi `terbitkan`: untuk tiap langganan, bila filternya cocok, cetak nama pelanggan. Indentasi menunjukkan tingkat bersarang.

```text
(a)   }
(b) void terbitkan(const std::string &topik, const std::string &pesan) {
(c)     if (cocok(l.filter, topik)) {
(d)   for (const Langganan &l : daftar) {
(e)       std::cout << "  -> " << l.pelanggan << "\n";
(f)     }
(g) }
```

## Latihan

1. `AI: tanpa AI` **Cocokkan.** Topik mana yang cocok dengan filter `lab/+/suhu`: `lab/a/suhu`, `lab/a/b/suhu`, `lab/suhu`, `kelas/a/suhu`, `lab/c/suhu`?
2. `AI: boleh` **Rancang dulu.** Sebuah sistem punya dua ruang (`a` dan `b`) dengan masing-masing sensor `suhu` dan `lembap`. Tulis rancangan topik, lalu tulis filter untuk "semua suhu dari semua ruang" dan "semua data ruang b", dan gambar diagram alir pesannya (keluaran minggu ini: diagram alir pesan).
3. `AI: tanpa AI` **Jelaskan.** Mengapa broker disebut titik kegagalan tunggal? Sebut satu akibat bagi sistem kelompokmu.
4. `AI: tanpa AI` **Permainan peran (kelompok, tanpa papan).** Satu murid menjadi broker dengan daftar langganan di meja; tiga murid menjadi pelanggan yang mendaftarkan filternya; satu murid menjadi penerbit yang membuat kartu bertopik (mis. `lab/a/suhu = 28.1`) dan menyerahkannya hanya kepada broker. Broker meneruskan salinan kartu ke pelanggan yang cocok. Ulangi dengan satu putaran di mana broker "mati": apa yang terjadi? Satu pengamat mencatat urutan, lalu kelompok menggambar diagram alir pesan.
5. *Opsional:* **catatan pemakaian AI.** Bila memakai AI generatif, jawab nomor 2 sendiri dulu, lalu minta kritik atas rancangan topikmu, bukan rancangan jadi. Catat alatnya, tujuanmu, garis besar perintahmu, bagian yang kamu pakai, dan cara memeriksanya. Jangan menaruh sandi, kunci, atau alamat jaringan sekolah pada perintah.

## Latihan bercampur

1. Broker lab tidak diberi sandi. Sebut dua risiko dan dua langkah yang kamu pelajari di `C-XI2-M2` untuk mengurangi risikonya.
2. Bandingkan HTTP klien-server dan publikasi-langganan: siapa yang harus tahu alamat siapa, dan berapa penerima untuk satu pengiriman?

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `C-XI2-M6` (sekitar satu minggu lagi), `C-XI2-M8` (sekitar tiga minggu lagi), dan `C-XI2-M13` (sekitar delapan minggu lagi). Jawab sekarang lalu simpan.

1. Siapa yang menentukan penerima sebuah pesan: penerbit atau broker? Jelaskan.
2. Apa beda `+` dan `#` pada filter topik? Beri satu contoh masing-masing.
3. Mengapa broker menjadi titik kegagalan tunggal, dan apa dampaknya pada sistem proyek?

## Kesalahan umum

- **Mengira penerbit mengirim langsung ke pelanggan.** Penerbit hanya berbicara dengan broker; broker yang memilih penerima.
- **Mencampur `+` dan `#`.** `+` tepat satu tingkat; `#` semua tingkat sisanya dan hanya di akhir filter.
- **Salah huruf pada topik.** `LAB/a/suhu` dan `lab/a/suhu` adalah topik berbeda.
- **Menganggap pesan tersimpan untuk pelanggan yang datang terlambat.** Tanpa aturan khusus broker, pelanggan baru tidak menerima pesan lama.
- **Menganggap broker tidak perlu dilindungi karena "hanya di lab".** Siapa pun di jaringan itu dapat membaca atau menulis bila tidak ada sandi.

## Cek mandiri

- [ ] Saya dapat menjelaskan penerbit, pelanggan, topik, dan broker.
- [ ] Saya dapat menentukan topik yang cocok dengan filter yang memakai `+` dan `#`.
- [ ] Saya dapat membandingkan publikasi-langganan dengan HTTP klien-server.
- [ ] Saya dapat menggambar diagram alir pesan untuk sistem kecil.
- [ ] Saya dapat menyebut titik kegagalan tunggal dan risiko keamanan broker.

## Kunci dan petunjuk

**Ingat kembali.** 1: pesan hanyalah deretan byte; penerima yang tidak sepakat soal formatnya salah menafsirkan atau membuangnya, sehingga data rusak atau program galat. 2: supaya karakter khusus tampil sebagai teks dan tidak ditafsirkan peramban sebagai tag atau skrip. 3: contoh: sandi, kunci, atau token; data pribadi; tugas bernilai.

**Prediksi dulu.** 1: `pantau`, `arsip`, dan `papanA`. 2: `lab/a/lembap` hanya diterima `arsip`; `lab/c/suhu/atas` hanya diterima `arsip` (terlalu banyak tingkat untuk `lab/+/suhu`). 3: `LAB/a/suhu` tidak diterima siapa pun (peka huruf besar-kecil); `ruang/a/suhu` juga tidak diterima siapa pun (awalannya bukan `lab`).

**Contoh setengah jadi.** Isian berurutan: `#`, `false`, `+`, `t.size()`. Hasil kunci yang dikompilasi dan dijalankan penulis: `lab/+/suhu` cocok untuk `lab/a/suhu` (1) dan tidak untuk `lab/a/b/suhu` (0); `lab/#` cocok untuk `lab` (1) dan tidak untuk `ruang/a` (0); filter `lab/a` tidak cocok untuk topik `lab` (0). Urutannya tercetak `10100`.

**Soal Parsons.** Urutan benar: b, d, c, e, f, a, g. Indentasi menunjukkan bersarang: (f) menutup `if`, (a) menutup `for`, (g) menutup fungsi.

**Latihan.** 1: cocok: `lab/a/suhu` dan `lab/c/suhu`; tidak cocok: `lab/a/b/suhu` (terlalu banyak tingkat), `lab/suhu` (kurang satu tingkat), `kelas/a/suhu` (awalan beda). 2: contoh topik: `lab/a/suhu`, `lab/a/lembap`, `lab/b/suhu`, `lab/b/lembap`; "semua suhu semua ruang" = `lab/+/suhu`; "semua data ruang b" = `lab/b/#` atau `lab/b/+`. Diagram: panah dari tiap penerbit ke broker, lalu dari broker ke tiap pelanggan yang cocok. 3: bila broker mati, semua pesan berhenti walau semua papan sehat; akibatnya sistem tidak mengirim data dan keputusan berhenti, sehingga perlu rencana (mis. papan menyimpan sementara dan mengirim ulang). 4: tidak ada kunci tunggal; pada putaran tanpa broker pelanggan tidak menerima kartu apa pun, walau penerbit sudah menerbitkan.

**Latihan bercampur.** 1: risiko: siapa pun di jaringan dapat membaca atau mengirim pesan palsu; sandi bawaan mudah ditebak. Langkah: pakai jaringan lab terpisah; ganti sandi bawaan dan beri sandi (di luar kode). 2: pada HTTP klien harus tahu alamat server dan mengirim ke satu penerima per permintaan; pada publikasi-langganan penerbit hanya tahu broker dan topik, dan satu pesan dapat sampai ke banyak pelanggan.

**Ulang berjarak.** 1: broker; ia mencocokkan topik dengan filter pelanggan. 2: `+` tepat satu tingkat, mis. `lab/+/suhu` cocok dengan `lab/a/suhu`; `#` semua tingkat sisanya dan hanya di akhir, mis. `lab/#` cocok dengan `lab/a/suhu` dan `lab/a/b/c`. 3: bila broker mati semua pesan berhenti walau papan sehat; sistem proyek tidak mengirim atau menerima data sampai broker pulih.

## Langkah berikutnya

Modul berikut: `c-xi2-m6` (publikasi-langganan, praktik), yang memakai broker lokal guru untuk dua papan. Pembacaan lanjut: spesifikasi MQTT 3.1.1 (bagian nama topik dan filter topik) dan situs proyek Mosquitto sebagai contoh broker.
