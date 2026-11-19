## Untuk siapa modul ini

Modul ini untuk murid kelas XII jalur C (IoT dan robotika), minggu `C-XII2-M4` silabus v1.4: ulasan keamanan dan privasi. Prasyarat: modul `c-xii2-m3` (memodelkan masalah lapangan). Kamu juga memakai keamanan konektivitas dari `c-xi2-m2` dan hukum dan etika sensor dari `C-XII1-M11` (belum terindeks saat modul ini ditulis).

Modul ini berstatus DRAF: karangan penyusun, belum ditinjau pemilik, dan tidak dihitung memenuhi butir capaian pembelajaran mana pun. Keluaran minggu ini: laporan keamanan. Latihan silabusnya: mengaudit proyek sendiri.

Semua pekerjaan di komputer dan kertas; papan hanya dibaca programnya. Keselamatan perangkat: audit ini tidak mengubah rangkaian; bila kamu memperbaiki lalu mengunggah ke papan, ikuti aturan daya USB atau baterai dari guru dan cabut daya sebelum mengubah rangkaian. Semua kata sandi, token, dan alamat pada contoh adalah karangan dan bukan milik siapa pun.

## Ingat kembali

Jawab dari ingatan dulu, baru cek di kunci. Soal 1 dari `c-xii2-m3`, soal 2 dari `c-xii2-m1`, soal 3 dari `c-xii1-m10`.

1. Sebut bagian-bagian lembar pemodelan.
2. Mengapa perbaikan galat dipisahkan dari refaktor?
3. Mengapa arus saat motor macet lebih penting daripada arus rata-rata untuk memilih pengendali motor?

## Tujuan

Setelah modul ini kamu dapat:

- memeriksa proyek pada tiga lapis: rahasia, jaringan, dan data;
- mengenali rahasia yang tertulis di kode dan memindahkannya dari repositori;
- membedakan temuan berdasarkan tingkat dan menuliskan bukti serta perbaikannya;
- menjelaskan batas pemindai otomatis: "tidak ada temuan" bukan bukti aman;
- menulis laporan keamanan (keluaran minggu ini).

## Prediksi dulu

Pemindai aturan sederhana membaca sembilan baris program karangan di bawah. Aturannya: **R1** nama berisi `SANDI`, `TOKEN`, `KUNCI`, atau `PASS` dan diberi nilai tulisan langsung; **R2** alamat `http://` (tanpa enkripsi); **R3** mencetak variabel berisi `NAMA`, `ALAMATRUMAH`, atau `TELEPON`. **Tebak dulu, tulis jawabanmu, baru telusuri.**

```text
1  const char *SSID_LAB = "jaringan-lab-contoh";
2  const char *KATA_SANDI = "contoh-bukan-asli";
3  const char *TOKEN_LAYANAN = "abc-bukan-token-asli";
4  const char *ALAMAT_SERVER = "http://penengah.lab.example/data";
5  Serial.println(namaPengguna);
6  const int PIN_SENSOR = 34;
7  const char *ALAMAT_AMAN = "https://penengah.lab.example/data";
8  const char *PW_WIFI = "contoh-bukan-asli";
9  #include "rahasia.h"
```

1. Baris mana yang ditandai pemindai?
2. Baris mana yang sebenarnya masalah tetapi lolos?
3. Apakah baris 9 masalah? Mengapa?

## Contoh terselesaikan

Ulasan keamanan memeriksa tiga lapis. **Rahasia:** kata sandi, token, dan kunci tidak boleh tertulis di kode. Panduan OWASP tentang pengelolaan rahasia menyatakan rahasia tidak ditanam di kode sumber, rahasia perlu dideteksi sebelum di-commit, dan bila rahasia ditemukan di kode, ia dicabut, diganti, dan dihapus dari kode. Rahasia yang pernah masuk repositori harus dianggap bocor, walau sudah dihapus dari berkas, karena riwayatnya menyimpan salinannya; menulis ulang riwayat punya efek samping sehingga mengganti rahasia lebih pasti. **Jaringan:** data hanya ke penengah pesan atau server lokal milik guru atau lab, bukan layanan publik dan bukan hotspot ponsel pribadi murid (aturan jalur C), dan lebih baik terenkripsi. **Data:** kumpulkan seminimal mungkin; proyek akhir tidak mengumpulkan data pribadi nyata; apa yang tidak perlu tidak dicetak ke Serial atau dicatat.

Sebagai lensa pertanyaan, NIST IR 8259A mendefinisikan enam kemampuan dasar keamanan perangkat IoT: identifikasi perangkat, konfigurasi perangkat, perlindungan data, akses logis ke antarmuka, pembaruan perangkat lunak, dan kesadaran keadaan keamanan siber. Pakai itu sebagai daftar pertanyaan ("bagaimana perangkatku diidentifikasi? siapa yang dapat mengubah konfigurasinya? bagaimana ia diperbarui?"), bukan sebagai sertifikasi: robot kelas belum memenuhinya dan tidak diklaim memenuhinya.

Pemindai otomatis membantu menemukan yang jelas. Program berikut memindai potongan program karangan dengan tiga aturan. Ia hanya menemukan yang kamu tulis sebagai aturan.

```cpp
// C++17 biasa, jalan di komputer. Diperiksa oleh check:module-code.
// Pemindai aturan sederhana untuk potongan program karangan. Ia hanya menemukan pola yang kamu tulis
// sebagai aturan; "tidak ada temuan" BUKAN bukti bahwa proyek aman.
#include <cctype>
#include <iostream>
#include <string>

const char *BARIS[] = {
    "const char *SSID_LAB = \"jaringan-lab-contoh\";",
    "const char *KATA_SANDI = \"contoh-bukan-asli\";",
    "const char *TOKEN_LAYANAN = \"abc-bukan-token-asli\";",
    "const char *ALAMAT_SERVER = \"http://penengah.lab.example/data\";",
    "Serial.println(namaPengguna);",
    "const int PIN_SENSOR = 34;",
    "const char *ALAMAT_AMAN = \"https://penengah.lab.example/data\";",
    "const char *PW_WIFI = \"contoh-bukan-asli\";",
    "#include \"rahasia.h\"",
};
const int JUMLAH = sizeof(BARIS) / sizeof(BARIS[0]);

std::string besar(const std::string &s) {
  std::string h = s;
  for (char &c : h) {
    c = static_cast<char>(std::toupper(static_cast<unsigned char>(c)));
  }
  return h;
}

bool memuat(const std::string &s, const std::string &kata) { return s.find(kata) != std::string::npos; }

int main() {
  int temuan = 0;
  for (int i = 0; i < JUMLAH; i++) {
    std::string b = BARIS[i];
    std::string B = besar(b);
    bool memberiNilai = memuat(b, "= \"");
    // Aturan R1: nama berisi SANDI, TOKEN, KUNCI, atau PASS DAN diberi nilai tulisan langsung di kode.
    if (memberiNilai && (memuat(B, "SANDI") || memuat(B, "TOKEN") || memuat(B, "KUNCI") || memuat(B, "PASS"))) {
      std::cout << "baris " << i + 1 << ": [R1 tinggi] rahasia tertulis di kode; pindahkan ke berkas rahasia\n";
      temuan++;
    }
    // Aturan R2: alamat http:// (tanpa enkripsi) dipakai untuk mengirim data.
    if (memuat(b, "\"http://")) {
      std::cout << "baris " << i + 1 << ": [R2 sedang] data dikirim tanpa enkripsi; periksa apakah jaringan tepercaya\n";
      temuan++;
    }
    // Aturan R3: mencetak variabel yang namanya mengisyaratkan identitas orang.
    if (memuat(b, "Serial.print") && (memuat(B, "NAMA") || memuat(B, "ALAMATRUMAH") || memuat(B, "TELEPON"))) {
      std::cout << "baris " << i + 1 << ": [R3 sedang] mencetak data yang mungkin pribadi; apakah perlu?\n";
      temuan++;
    }
  }
  std::cout << "baris diperiksa: " << JUMLAH << ", temuan: " << temuan << "\n";
}
```

Keluaran program (dijalankan penulis dengan `g++ -std=c++17`):

```text
baris 2: [R1 tinggi] rahasia tertulis di kode; pindahkan ke berkas rahasia
baris 3: [R1 tinggi] rahasia tertulis di kode; pindahkan ke berkas rahasia
baris 4: [R2 sedang] data dikirim tanpa enkripsi; periksa apakah jaringan tepercaya
baris 5: [R3 sedang] mencetak data yang mungkin pribadi; apakah perlu?
baris diperiksa: 9, temuan: 4
```

Bacalah dengan jujur. Empat temuan benar. Tetapi baris 8 (`PW_WIFI`) lolos karena `PW` tidak ada di daftar kata: itu **negatif palsu**, dan lebih berbahaya daripada peringatan berlebih karena memberi rasa aman. Baris 1 (nama jaringan) tidak ditandai: nama jaringan bukan rahasia, tetapi bersama kata sandi yang bocor ia memberi akses. Baris 9 bukan masalah, melainkan **pola yang benar**: nilai rahasia diletakkan di berkas terpisah yang tidak masuk repositori. Pemindai tidak membaca isi berkas itu, dan pemindai tidak bisa menilai apakah jaringan lab memang tepercaya.

Pola berkas rahasia:

```text
.gitignore                : memuat baris  rahasia.h
rahasia.h                 : nilai NYATA; tidak pernah di-commit
rahasia_contoh.h          : nama konstanta dengan nilai tiruan, ikut di-commit
```

## Contoh setengah jadi

Lengkapi `____` pada pemeriksa aturan R2 (alamat `http://`, bukan `https://`).

```cpp setengah-jadi
// C++17. Lengkapi bagian ____.
bool memuat(const std::string &s, const std::string &kata) { return s.find(kata) != ____; }
bool pakaiHttpTanpaEnkripsi(const std::string &baris) { return memuat(baris, "____"); }
```

## Soal Parsons

Susun baris-baris di bawah (sudah diacak; kurung kurawal penutup tidak ditulis) menjadi pembuka perulangan pemindai.

```text
(a)     std::string b = BARIS[i];
(b)   for (int i = 0; i < JUMLAH; i++) {
(c)     std::string B = besar(b);
(d)     if (memberiNilai && memuat(B, "TOKEN")) { temuan++; }
(e)     bool memberiNilai = memuat(b, "= \"");
```

## Latihan

1. `AI: tanpa AI` **Negatif palsu.** Sebut dua cara lain sebuah rahasia dapat lolos dari pemindai di atas.
2. `AI: boleh` **Audit proyekmu.** Periksa proyek akhir rancanganmu pada tiga lapis. Tulis laporan keamanan berisi tabel: temuan, tingkat (tinggi, sedang, rendah), bukti, perbaikan, dan status.
3. `AI: tanpa AI` **Sudah dihapus.** Seorang murid melakukan commit dengan kata sandi di kode, lalu menghapus baris itu di commit berikutnya. Amankah? Apa yang harus ia lakukan?
4. `AI: boleh` **Positif palsu.** Menambahkan `PW` ke daftar kata menangkap `PW_WIFI`, tetapi apa risikonya? Beri satu contoh nama yang akan salah ditandai.
5. *Opsional:* **catatan pemakaian AI.** Bila memakai AI generatif, kerjakan nomor 3 sendiri dulu, lalu minta kritik atas jawabanmu, bukan jawaban jadi. Catat alatnya, tujuanmu, garis besar perintahmu, bagian yang kamu pakai, dan cara memeriksanya. Jangan menaruh kata sandi, kunci, atau data pribadi pada perintah ke layanan AI.

## Latihan bercampur

1. Dari `c-xi2-m2`: mengapa kata sandi jaringan lab tidak dimasukkan ke kode yang di-commit, dan di mana letaknya?
2. Dari `C-XII1-M11`: sebut dua data yang tergolong data pribadi, dan mengapa proyek akhir tidak boleh mengumpulkannya.

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `C-XII2-M5` (sekitar satu minggu lagi), `C-XII2-M7` (sekitar tiga minggu lagi), dan `C-XII2-M12` (sekitar delapan minggu lagi). Jawab sekarang lalu simpan.

1. Sebut tiga lapis yang diperiksa pada ulasan keamanan.
2. Mengapa rahasia yang pernah masuk repositori harus dianggap bocor?
3. Apa arti "tidak ada temuan" pada pemindai, dan apa yang tidak dibuktikannya?

## Kesalahan umum

- **Menganggap pemindai bersih berarti aman.** Ia hanya menemukan pola yang diprogramkan.
- **Menghapus rahasia dari berkas tanpa menggantinya.** Salinan di riwayat tetap ada.
- **Mengirim data lewat `http://` tanpa menimbang jaringannya.** Siapa pun di jaringan dapat membaca.
- **Mencetak semua ke Serial "untuk sementara".** Log sering terbawa ke proyek jadi.
- **Memakai hotspot ponsel pribadi atau layanan publik untuk data proyek.** Itu di luar aturan jalur C.
- **Memperlakukan daftar NIST sebagai sertifikat.** Itu daftar pertanyaan, bukan pernyataan lulus.

## Cek mandiri

- [ ] Saya memeriksa rahasia, jaringan, dan data.
- [ ] Tidak ada kata sandi, token, atau kunci tertulis di kode yang di-commit.
- [ ] Saya menulis temuan dengan tingkat, bukti, dan perbaikan.
- [ ] Saya tahu pemindai dapat meloloskan masalah.
- [ ] Proyek saya tidak mengumpulkan data pribadi nyata.

## Kunci dan petunjuk

**Ingat kembali.** 1: masalah dan pengguna, tujuan yang dapat gagal, masukan dan keluaran, asumsi dan yang tidak dimodelkan, data dan privasi, uji, dan keputusan. 2: bila uji gagal, penyebabnya hanya satu; perubahan perilaku harus disengaja dan diuji sendiri. 3: motor yang macet menarik arus paling besar; pengendali yang hanya tahan arus rata-rata dapat rusak atau panas pada saat itu.

**Prediksi dulu.** 1: baris 2, 3, 4, dan 5 (R1 dua kali, R2, dan R3). 2: baris 8, kata sandi dengan nama `PW_WIFI`, lolos karena `PW` bukan kata aturan. 3: tidak; baris 9 memuat rahasia dari berkas terpisah yang tidak di-commit, yaitu pola yang benar (asalkan berkas itu memang dikecualikan dari repositori).

**Contoh setengah jadi.** Isian berurutan: `std::string::npos`, `http://`. Kunci dikompilasi dan dijalankan penulis: baris dengan `http://` terdeteksi, dengan `https://` tidak.

**Soal Parsons.** Urutan benar: b, a, c, e, d (a boleh sebelum atau sesudah c). `memberiNilai` harus ada sebelum dipakai di `d`.

**Latihan.** 1: contoh: kata sandi dibentuk dari dua string yang digabung; rahasia ada di komentar; nama variabel tak mengandung kata aturan (`PW`). 2: tidak ada kunci tunggal; laporan yang baik menyebut bukti (nomor baris atau gambar rangkaian), tingkat yang dibenarkan, dan perbaikan yang dapat dikerjakan. 3: tidak aman; riwayat menyimpan salinan; ia harus mencabut dan mengganti kata sandi itu, lalu menaruh yang baru di berkas rahasia di luar repositori. 4: nama yang tidak ada hubungannya dengan rahasia dapat mengandung `PW`, misalnya `NAMA_PWM = "kanal-1"` (PWM adalah pengatur lebar pulsa); peringatan palsu yang banyak membuat orang berhenti membaca laporan.

**Latihan bercampur.** 1: rahasia di kode ikut tersalin ke riwayat dan dapat terbaca orang lain; letaknya di berkas rahasia yang dikecualikan dari repositori. 2: contoh: detak jantung dan lokasi (bukan dari sensor proyek jalur C); proyek akhir tidak mengumpulkan data pribadi nyata supaya tidak ada orang yang dirugikan bila data bocor.

**Ulang berjarak.** 1: rahasia, jaringan, dan data. 2: riwayat repositori menyimpan salinan; orang yang punya akses ke riwayat masih dapat membacanya, jadi rahasia diganti. 3: tidak ada pola yang diprogramkan yang cocok; ia tidak membuktikan tidak ada masalah di luar pola itu.

## Langkah berikutnya

Modul berikut: `C-XII2-M5` (proyek akhir: rancangan). Bacaan lanjut: OWASP Secrets Management Cheat Sheet dan NIST IR 8259A (lihat Rujukan).
