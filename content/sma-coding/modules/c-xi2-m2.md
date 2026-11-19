## Untuk siapa modul ini

Modul ini untuk murid kelas XI jalur C (IoT dan robotika), minggu `C-XI2-M2` silabus v1.4: keamanan konektivitas. Prasyarat: modul `c-xi2-m1` (menghubungkan papan ke jaringan lab) dan `FND-X1-M6` (keamanan dasar: kata sandi dan konektivitas).

Modul ini berstatus DRAF: karangan penyusun, belum ditinjau pemilik. Ia mendukung butir `E-LD-e` (keamanan dasar konektivitas jaringan), `F-LD-e` (keamanan lanjut konektivitas jaringan), dan `F-LD-i` (kata sandi dan autentikasi), dan tidak dihitung memenuhi butir capaian pembelajaran mana pun; pemetaan `F-LD-e` dan `F-LD-i` untuk jalur C bersifat parsial. Keluaran minggu ini: lembar periksa keamanan. Latihan silabusnya: mengaudit kode dari rahasia yang tertanam, dan memeriksa contoh permintaan ke asisten AI yang memuat kredensial.

Seluruh modul ini dapat dikerjakan **tanpa papan**: kamu membaca kode, menjalankan program pemeriksa di komputer, dan menulis lembar periksa. Modul ini tidak memakai perangkat fisik; aturan keselamatan perangkat dari modul sebelumnya tetap berlaku bila kamu menyentuh papan. Semua nama, sandi, dan kunci di modul ini karangan dan sudah tidak berguna; jangan pernah memakai sandi sungguhan milikmu atau milik orang lain dalam latihan.

## Ingat kembali

Jawab dari ingatan dulu, baru cek di kunci. Soal 1 dari `c-xi1-m8`, soal 2 dari `c-xi1-m13`, soal 3 dari `C-XI2-M1`.

1. Mengapa menulis di luar batas larik bisa menjadi celah keamanan, bukan hanya galat?
2. Sebut dua hal yang tidak boleh ada di berkas proyek yang dibagikan, seperti laporan atau kode.
3. Apa yang dilakukan DHCP, dan mengapa alamat IP papan bisa berbeda setiap kali dinyalakan?

## Tujuan

Setelah modul ini kamu dapat:

- menjelaskan mengapa kredensial (sandi, kunci, token) tidak boleh tertanam di kode yang dibagikan, dan menyimpannya di luar kode;
- mengganti sandi bawaan perangkat dan menjelaskan manfaat jaringan lab yang terpisah;
- mengaudit sebuah sketsa dari rahasia yang tertanam, sambil memahami batas pemeriksaan otomatis;
- menyusun permintaan ke asisten AI tanpa kredensial, data pribadi, atau tugas bernilai;
- menulis lembar periksa keamanan konektivitas (keluaran minggu ini).

## Prediksi dulu

Berikut sebuah sketsa karangan. Program pemeriksa di bagian berikutnya menandai sebuah baris bila namanya memuat kata kunci seperti `sandi`, `password`, `token`, `apikey`, atau `secret`, ada tanda `=`, dan nilainya berupa teks tidak kosong yang bukan tempat pengisi berawalan `ISI_`. **Tebak dulu, tulis jawabanmu, baru jalankan.**

```text
1: const char* SSID_LAB = "lab-contoh";
2: const char* SANDI_LAB = "kucing-biru-42";
3: const char* TOKEN_SERVER = "ISI_DARI_RAHASIA_H";
4: String apiKey = "contoh-palsu-0000";
5: // sandi lama: kucing-hijau-7
6: int ambang = 2000;
7: const char* PASSWORD_ADMIN = "admin";
```

1. Baris mana yang ditandai pemeriksa?
2. Adakah rahasia yang lolos dari pemeriksa? Baris mana?
3. Apakah baris 7 aman karena sandinya "hanya admin"?

## Contoh terselesaikan

Rahasia yang tertanam di kode mudah bocor: kode dibagikan ke teman, ditempel ke laporan, diunggah ke repositori, difoto layar, atau ditempel ke asisten AI. Pola yang dipakai: rahasia ditaruh di berkas terpisah yang **tidak ikut dibagikan**, dan kode hanya memuat nama konstantanya.

```text
rahasia.h            (hanya di komputermu; masuk daftar yang diabaikan repositori)
const char* SANDI_JARINGAN = "isi sandi dari guru di sini";

rahasia.contoh.h     (ikut dibagikan; hanya tempat pengisi)
const char* SANDI_JARINGAN = "ISI_DARI_RAHASIA_H";
```

Sketsa menulis `#include "rahasia.h"` dan memakai `SANDI_JARINGAN`; teman yang menerima proyekmu menyalin `rahasia.contoh.h` menjadi `rahasia.h` dan mengisinya sendiri. Dua kebiasaan lain melengkapinya: **ganti sandi bawaan** perangkat (titik akses, server mini, penengah pesan) sebelum dipasang, karena sandi bawaan sering sama untuk satu model dan mudah ditebak, dan **pakai jaringan lab yang terpisah** dari jaringan sekolah dan pribadi, supaya perangkat IoT yang lemah, bila disusupi, tidak menjangkau perangkat lain. Bila sebuah sandi sempat terunggah ke tempat bersama, anggap sandi itu bocor dan ganti: menghapus berkasnya tidak menghapus riwayat, yang masih menyimpan salinan lama (periksa kebijakan repositori yang kamu pakai).

Program berikut adalah pemeriksa sederhana yang menandai baris mencurigakan. Ia alat bantu, bukan bukti bersih.

```cpp
// C++17 biasa, jalan di komputer. Diperiksa oleh check:module-code.
#include <algorithm>
#include <cctype>
#include <iostream>
#include <string>
#include <vector>

std::string huruf_kecil(std::string s) {
  std::transform(s.begin(), s.end(), s.begin(), [](unsigned char c) { return std::tolower(c); });
  return s;
}

// Isi literal teks pertama pada baris, atau "" bila tidak ada.
std::string isi_literal(const std::string &baris) {
  size_t buka = baris.find('"');
  if (buka == std::string::npos) {
    return "";
  }
  size_t tutup = baris.find('"', buka + 1);
  if (tutup == std::string::npos) {
    return "";
  }
  return baris.substr(buka + 1, tutup - buka - 1);
}

// Mengembalikan kata kunci yang cocok, atau "" bila baris tidak mencurigakan.
std::string curigai(const std::string &baris) {
  const std::vector<std::string> kata_kunci = {"sandi", "password", "token", "apikey", "secret"};
  std::string kecil = huruf_kecil(baris);
  if (kecil.find('=') == std::string::npos) {
    return "";
  }
  std::string isi = isi_literal(baris);
  if (isi.empty() || isi.rfind("ISI_", 0) == 0) {
    return "";  // tidak ada nilai, atau tempat pengisi yang aman
  }
  for (const std::string &kata : kata_kunci) {
    if (kecil.find(kata) != std::string::npos) {
      return kata;
    }
  }
  return "";
}

int main() {
  const std::vector<std::string> sketsa = {
      "const char* SSID_LAB = \"lab-contoh\";",
      "const char* SANDI_LAB = \"kucing-biru-42\";",
      "const char* TOKEN_SERVER = \"ISI_DARI_RAHASIA_H\";",
      "String apiKey = \"contoh-palsu-0000\";",
      "// sandi lama: kucing-hijau-7",
      "int ambang = 2000;",
      "const char* PASSWORD_ADMIN = \"admin\";",
  };
  int temuan = 0;
  for (size_t i = 0; i < sketsa.size(); i++) {
    std::string kata = curigai(sketsa[i]);
    if (!kata.empty()) {
      std::cout << "baris " << i + 1 << ": curiga '" << kata << "'\n";
      temuan++;
    }
  }
  std::cout << temuan << " temuan dari " << sketsa.size() << " baris\n";
}
```

Keluarannya:

```text
baris 2: curiga 'sandi'
baris 4: curiga 'apikey'
baris 7: curiga 'password'
3 temuan dari 7 baris
```

Baris 2, 4, dan 7 ditandai. Baris 3 aman karena nilainya tempat pengisi. Baris 5, **komentar berisi sandi lama**, lolos karena pemeriksa mencari tanda `=`: ada rahasia yang tidak terdeteksi walau pemeriksanya "bekerja". Karena itu "tidak ada temuan" tidak berarti kode bersih; baca kodenya sendiri juga, termasuk komentar dan teks uji. Baris 7 tetap temuan: sandi bawaan seperti "admin" lebih berbahaya karena sudah diketahui orang. Keamanan kali ini diperiksa pada kode karangan, bukan pada jaringan sungguhan.

Pola yang sama berlaku untuk permintaan ke asisten AI. Tidak ada larangan memakai AI (kebijakan AI jalur ini: bebas dengan etika), tetapi **jangan menempelkan sandi, kunci, token, data pribadi, atau tugas bernilai**. Tempelkan bagian kode dengan tempat pengisi, dan jelaskan galatnya dengan kata-kata.

## Contoh setengah jadi

Sekarang pemeriksa untuk komentar yang lolos tadi. Lengkapi bagian `____`: sebuah baris komentar (diawali `//`) yang memuat kata `sandi` dan tanda titik dua `:` ditandai.

```cpp setengah-jadi
// C++17. Lengkapi bagian ____.
#include <string>

bool komentarMemuatRahasia(const std::string &baris) {
  bool komentar = baris.rfind("____", 0) == 0;
  bool punyaKataKunci = baris.find("sandi") != std::string::npos;
  bool punyaNilai = baris.find(____) != std::string::npos;
  return komentar && punyaKataKunci && punyaNilai;
}
```

## Soal Parsons

Susun baris-baris di bawah (sudah diacak) menjadi fungsi yang menandai baris bila nilai literalnya tidak kosong dan bukan tempat pengisi.

```text
(a)   return isi.rfind("ISI_", 0) == 0 ? "" : "curiga";
(b) }
(c)   std::string isi = isi_literal(baris);
(d)     return "";
(e) std::string curigai(const std::string &baris) {
(f)   if (isi.empty()) {
(g)   }
```

## Latihan

1. `AI: tanpa AI` **Audit kode.** Baca sketsa karangan di bawah dan daftarkan semua rahasia yang tertanam, termasuk yang lolos dari pemeriksa nomor `=`. Untuk tiap rahasia, tulis di mana seharusnya disimpan.
2. `AI: tanpa AI` **Periksa permintaan.** Baca contoh permintaan di bawah, sebut semua yang tidak boleh dikirim, lalu tulis ulang permintaan yang aman.
3. `AI: boleh` **Lembar periksa.** Tulis lembar periksa keamanan konektivitas berisi lima butir yang bisa dijawab "ya" atau "tidak" (keluaran minggu ini), mencakup rahasia di luar kode, sandi bawaan, jaringan lab terpisah, dan permintaan ke AI.
4. *Opsional:* **catatan pemakaian AI.** Bila memakai AI generatif, jawab nomor 3 sendiri dulu, lalu minta kritik atas lembarmu, bukan lembar jadi. Catat alatnya, tujuanmu, garis besar perintahmu, bagian yang kamu pakai, dan cara memeriksanya. Jangan menaruh sandi, kunci, atau data pribadi pada perintah.

Sketsa untuk nomor 1 (semua nilai karangan):

```text
const char* NAMA_JARINGAN = "lab-contoh";
const char* SANDI_JARINGAN = "kucing-biru-42";
const char* ALAMAT_BROKER = "192.0.2.10";
const char* SANDI_BROKER = "broker-palsu-1";
String tokenLaporan = "tok-palsu-12345";
// uji: sandi admin papan = admin
```

Permintaan untuk nomor 2:

```text
Papanku tidak bisa tersambung. Tolong perbaiki kode ini:
const char* SANDI_JARINGAN = "kucing-biru-42";
Sandi panel admin router lab adalah admin, alamatnya 192.0.2.1.
```

## Latihan bercampur

1. Papan di `192.0.2.40` dengan awalan `/26`. Apakah `192.0.2.70` sejaringan? (dari `C-XI2-M1`)
2. Tulis tiga kasus uji untuk `curigai` (dari `c-xi1-m2`): satu baris yang harus ditandai, satu yang tidak, dan satu kasus tepi (nilai teks kosong).

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `C-XI2-M3` (sekitar satu minggu lagi), `C-XI2-M5` (sekitar tiga minggu lagi), dan `C-XI2-M10` (sekitar delapan minggu lagi). Jawab sekarang lalu simpan.

1. Bila sandi sempat terunggah ke tempat bersama, mengapa menghapus berkasnya tidak cukup, dan apa yang harus dilakukan?
2. Sebut tiga hal yang tidak boleh ditempel ke layanan AI.
3. Mengapa sandi bawaan perangkat harus diganti sebelum perangkat dipasang di jaringan?

## Kesalahan umum

- **Mengira "tidak ada temuan" berarti bersih.** Pemeriksa otomatis hanya menangkap pola yang ia kenal; komentar, berkas uji, dan tangkapan layar tetap perlu dibaca.
- **Menghapus berkas lalu menganggap beres.** Riwayat repositori dan salinan yang sudah dibagikan tetap ada; ganti sandinya.
- **Membiarkan sandi bawaan karena "hanya di jaringan lab".** Sandi bawaan sudah diketahui orang; ganti, dan tetap pisahkan jaringannya.
- **Menyamarkan sandi dengan sedikit mengubahnya saat ditempel ke AI.** Jangan menempelkan sandi sama sekali; pakai tempat pengisi.
- **Menyimpan rahasia di berkas yang ikut dibagikan** (misalnya `rahasia.h` ikut terunggah). Pastikan berkas itu tidak ikut dibagikan.

## Cek mandiri

- [ ] Saya dapat menjelaskan mengapa rahasia tidak boleh tertanam di kode.
- [ ] Saya menyimpan nama jaringan dan sandi di luar kode dan memakai tempat pengisi di berkas yang dibagikan.
- [ ] Saya tahu apa yang dilakukan bila sandi sempat bocor.
- [ ] Saya tidak menempelkan kredensial atau data pribadi ke layanan AI.
- [ ] Saya menulis lembar periksa keamanan yang dapat dijawab ya atau tidak.

## Kunci dan petunjuk

**Ingat kembali.** 1: menulis di luar batas menimpa memori lain (variabel tetangga atau data pengatur jalannya program); bila isi yang melampaui batas berasal dari luar (misalnya paket jaringan), penyerang dapat memilih isinya sehingga program berperilaku tak terduga, tidak sekadar salah hitung. 2: contoh: sandi, kunci, atau token; data pribadi (nama lengkap, kontak, foto). 3: DHCP memberi alamat secara otomatis dan hanya meminjamkannya, sehingga alamat bisa berbeda tiap dinyalakan.

**Prediksi dulu.** 1: baris 2 (`sandi`), 4 (`apikey` setelah huruf diubah ke kecil), dan 7 (`password`). 2: baris 5, komentar berisi sandi lama, tidak berisi `=`. 3: tidak aman; sandi bawaan paling dulu dicoba orang, jadi harus diganti.

**Contoh setengah jadi.** Isian berurutan: `//`, lalu `':'`. Kunci yang dikompilasi dan dijalankan penulis: `// sandi lama: kucing-hijau-7` bernilai benar (1), `// ambil sandi dari rahasia.h` bernilai salah (0, tidak ada titik dua), dan `int x = 1;` bernilai salah (0).

**Soal Parsons.** Urutan benar: e, c, f, d, g, a, b.

**Latihan.** 1: rahasia: `SANDI_JARINGAN`, `SANDI_BROKER`, `tokenLaporan`, dan sandi `admin` pada komentar (yang terakhir lolos dari pemeriksa nomor `=`). Simpan semuanya di `rahasia.h` yang tidak dibagikan (dan tempat pengisi di `rahasia.contoh.h`); ganti sandi `admin` dengan sandi baru yang kuat. Nama jaringan dan alamat broker bukan rahasia utama, tetapi tidak perlu dibagikan ke luar kelas. 2: yang tidak boleh dikirim: sandi jaringan, sandi panel admin, dan alamat panel admin; tidak ada pesan galat yang menjelaskan masalahnya. Contoh permintaan aman: "Papanku tidak tersambung ke Wi-Fi setelah 15 detik. Ini kodenya (sandi diganti `ISI_DARI_RAHASIA_H`): ... Sudah kuperiksa nama jaringan dan jarak. Apa yang sebaiknya kuperiksa berikutnya?" 3: contoh butir: apakah sandi ada di luar kode? apakah sandi bawaan sudah diganti? apakah papan di jaringan lab terpisah? apakah berkas rahasia tidak ikut dibagikan? apakah permintaan ke AI bebas dari kredensial? Tidak ada kunci tunggal; butirnya harus dapat dijawab ya atau tidak. 4: tidak ada kunci tunggal.

**Latihan bercampur.** 1: pada `/26` blok berukuran 64; `192.0.2.40` ada di blok 0 sampai 63 dan `192.0.2.70` di blok 64 sampai 127, jadi tidak sejaringan. 2: contoh: `const char* SANDI = "rahasia-palsu";` ditandai; `int ambang = 2000;` tidak ditandai; `const char* SANDI = "";` tidak ditandai (nilai kosong).

**Ulang berjarak.** 1: riwayat repositori dan salinan yang sudah dibagikan masih menyimpan sandi lama; ganti sandinya dan cabut yang lama. 2: sandi, kunci, atau token; data pribadi; tugas bernilai. 3: sandi bawaan sudah diketahui orang dan paling dulu dicoba, sehingga perangkat dengan sandi bawaan mudah diambil alih.

## Langkah berikutnya

Modul berikut: `c-xi2-m3` (klien HTTP), yang mengirim data sensor ke server lokal guru tanpa menaruh rahasia di kode. Pembacaan lanjut: panduan pengelolaan rahasia dari OWASP dan modul fondasi `fondasi-keamanan-dasar`.
