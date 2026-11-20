## Untuk siapa modul ini

Modul ini untuk murid kelas XI jalur C (IoT dan robotika), minggu `C-XI1-M12` silabus v1.3: pemecahan masalah sambungan, yaitu mendiagnosis urutan daya, kabel, kode, dan format pesan (F). Prasyarat: modul `c-xi1-m11` (pengiriman data antarperangkat II). Kamu juga memakai penerima dari `c-xi1-m10`, kasus uji dari `c-xi1-m2`, dan kebiasaan mengubah satu hal pada satu waktu dari `c-x2-m1`.

Modul ini karangan penyusun dan disetujui pemilik program pada 2026-11-20 (keputusan lewat dialog; catatan tinjauan menjadi tindak lanjut revisi). Ia mendukung butir `F-BK-d` (jaringan; untuk jalur C: pengiriman data antarperangkat) dan tidak dihitung memenuhi butir capaian pembelajaran mana pun; pemetaan `F-BK-d` untuk jalur C bersifat parsial. Keluaran minggu ini: diagram alir diagnosis. Latihan silabusnya: tiga skenario gangguan sintetis.

Ada dua cara mengerjakan. **Dengan dua papan (F):** guru menyiapkan gangguan yang disengaja pada sambungan, dan kelompok mendiagnosisnya. **Tanpa papan:** kamu mendiagnosis dari catatan hitungan karangan di komputer dan di kertas. Semua bagian pokok dapat dikerjakan tanpa papan. Nilai ambang pada contoh hanya contoh untuk data karangan.

## Keselamatan perangkat

- Daya hanya dari kabel USB. Tidak ada listrik jaringan (220 V) dan tidak ada baterai pada modul ini.
- **Gangguan disiapkan guru.** Cabut kedua kabel USB sebelum gangguan dipasang atau dilepas; murid tidak menyentuh kabel jumper atau papan saat daya menyala.
- Jangan menyambung pin ke daya atau perangkat bertegangan lain untuk "mencoba"; tegangan logika harus dicocokkan menurut lembar data papanmu `[belum terverifikasi]`.
- Tidak ada solder. Papan percobaan dan kabel jumper sudah cukup.
- Modul ini tidak memakai kamera atau mikrofon, dan tidak mengukur tubuh siapa pun.
- Papan atau kabel yang terasa panas, berbau, atau berasap: cabut kabel USB dan panggil guru.

## Ingat kembali

Jawab dari ingatan dulu, baru cek di kunci. Soal 1 dari `c-xi1-m4`, soal 2 dari `c-xi1-m11`, soal 3 dari `c-xi1-m9`, soal 4 dari `c-x2-m1`.

1. Sebut dua hal yang harus didokumentasikan agar pustaka sensor dapat dipakai orang lain tanpa membaca isinya.
2. Mengapa jumlah periksa yang cocok belum menjamin isi pesan benar?
3. Sebut tiga kasus uji tepi untuk penyangga melingkar.
4. Mengapa mengubah satu hal pada satu waktu mempercepat penemuan galat?

## Tujuan

Setelah modul ini kamu dapat:

- menyebut empat lapis diagnosis sambungan dan urutannya: daya, kabel, kode, format pesan;
- memakai **pengamatan** (hitungan byte dan baris) untuk menduga lapis yang bermasalah sebelum mengubah apa pun;
- mengubah satu hal pada satu waktu dan mencatat hasilnya dalam jurnal diagnosis;
- mengenali batas dugaan otomatis: ia petunjuk pertama, bukan bukti;
- menggambar diagram alir diagnosis (keluaran minggu ini).

## Prediksi dulu

Tiga gejala pada dua papan yang dihubungkan serial seperti di `c-xi1-m10` dan `c-xi1-m11`. Empat lapis diperiksa berurutan: **daya**, **kabel** (TX-RX silang, GND), **kode** (baud, pin, `begin`), dan **format pesan** (penanda, jumlah periksa, ruas, satuan). **Tebak dulu, tulis jawabanmu, baru telusuri.**

1. Penerima tidak menerima satu byte pun, dan lampu daya papan penerima padam. Lapis mana yang diperiksa pertama?
2. Penerima mencetak huruf acak; daya dan kabel sudah dipastikan baik. Lapis mana yang paling mungkin, dan apa yang diperiksa?
3. Penerima menerima pesan yang sah, tetapi semua suhu terbaca sepuluh kali lebih besar dari yang dikirim. Lapis mana, dan apa penyebab yang paling mungkin?

## Contoh terselesaikan

Gangguan sambungan sering tampak sama dari luar ("tidak jalan"), tetapi penyebabnya ada di lapis yang berbeda. Prinsipnya: **periksa dari yang paling mendasar ke yang paling atas**, karena lapis atas bergantung pada lapis bawah. Membaca kode tidak berguna bila papan tidak mendapat daya; menyalahkan format pesan tidak berguna bila kabelnya terlepas. Urutan ini sejalan dengan urutan diagnosis jaringan dari yang fisik ke yang logis pada `FND-X1-M5`. Dua kebiasaan menjaganya: **amati sebelum mengubah** (catat apa yang terjadi, jangan langsung mengganti), dan **ubah satu hal pada satu waktu** (`c-x2-m1`), agar kamu tahu perubahan mana yang berpengaruh.

```text
MULAI: amati gejala, catat hitungan byte dan baris
  |
  v
1 DAYA: kedua papan menyala? lampu daya hidup?
  | tidak: perbaiki daya, ulangi dari awal
  v ya
2 KABEL: TX-RX silang? GND bersama? sambungan kencang?
  | tidak: perbaiki, ulangi dari awal
  v ya
3 KODE: begin() dengan baud sama? pin benar? program terunggah?
  | tidak: perbaiki, ulangi dari awal
  v ya
4 FORMAT PESAN: penanda, jumlah periksa, ruas, satuan sesuai spesifikasi?
  | tidak: perbaiki, ulangi dari awal
  v ya
SELESAI: catat apa yang diubah dan hasilnya
```

Pengamatan dapat dikumpulkan oleh penerima sendiri, tanpa mengubah apa pun. Fungsi `diagnosa` di bawah membaca enam hitungan semenit terakhir dan menyebut **dugaan pertama** menurut urutan di atas. Ia tidak menyentuh serial sehingga dapat diuji di komputer (`c-xi1-m2`). Hitungannya: `byteMasuk` (semua byte), `bukanCetak` (byte yang bukan huruf, angka, tanda baca, atau akhir baris), `barisSah`, `gagalPeriksa` (jumlah periksa tidak cocok), dan `gagalFormat` (jumlah periksa cocok tetapi isi salah).

```cpp
// C++17 biasa, jalan di komputer. Diperiksa oleh check:module-code.
#include <iostream>

// Hitungan yang dikumpulkan penerima selama satu menit (data karangan di bawah).
struct Statistik {
  int byteMasuk;     // semua byte yang tiba
  int bukanCetak;    // byte yang bukan huruf, angka, tanda baca, atau akhir baris
  int barisSah;      // baris lolos jumlah periksa dan format
  int gagalPeriksa;  // baris utuh, jumlah periksa tidak cocok
  int gagalFormat;   // jumlah periksa cocok, tetapi isi tidak sesuai spesifikasi
};

// Diagnosis mengikuti urutan: daya dan kabel, kode, lalu format pesan.
const char* diagnosa(const Statistik& s) {
  if (s.byteMasuk == 0) {
    return "tidak ada byte: periksa daya, kabel (TX-RX, GND), lalu pin dan begin() di kode";
  }
  if (s.bukanCetak * 4 >= s.byteMasuk) {
    return "banyak byte aneh: periksa baud kedua sisi di kode, lalu kualitas kabel";
  }
  if (s.barisSah == 0 && s.gagalPeriksa > 0) {
    return "jumlah periksa selalu gagal: pengirim dan penerima menghitung berbeda (kode)";
  }
  if (s.gagalPeriksa > 0) {
    return "sebagian baris rusak: sambungan longgar atau derau (kabel)";
  }
  if (s.gagalFormat > 0) {
    return "pesan utuh tetapi isi salah: periksa format, satuan, dan rentang";
  }
  return "sehat";
}

struct Skenario {
  const char* nama;
  Statistik s;
};

int main() {
  const Skenario DAFTAR[] = {
      {"S0 sehat", {400, 0, 30, 0, 0}},
      {"S1 sunyi", {0, 0, 0, 0, 0}},
      {"S2 huruf acak", {120, 80, 0, 0, 0}},
      {"S3 putus-sambung", {400, 0, 27, 3, 0}},
      {"S4 jumlah periksa beda", {400, 0, 0, 30, 0}},
      {"S5 isi salah", {400, 0, 0, 0, 30}},
  };
  for (const Skenario& k : DAFTAR) {
    std::cout << k.nama << ": " << diagnosa(k.s) << "\n";
  }
}
```

Keluarannya:

```text
S0 sehat: sehat
S1 sunyi: tidak ada byte: periksa daya, kabel (TX-RX, GND), lalu pin dan begin() di kode
S2 huruf acak: banyak byte aneh: periksa baud kedua sisi di kode, lalu kualitas kabel
S3 putus-sambung: sebagian baris rusak: sambungan longgar atau derau (kabel)
S4 jumlah periksa beda: jumlah periksa selalu gagal: pengirim dan penerima menghitung berbeda (kode)
S5 isi salah: pesan utuh tetapi isi salah: periksa format, satuan, dan rentang
```

Baca dengan hati-hati. Tiap skenario di atas adalah data **karangan**, dan ambang `bukanCetak * 4 >= byteMasuk` (seperempat byte aneh) hanyalah pilihan contoh. Hasilnya **dugaan pertama**, bukan bukti: tidak ada byte bisa karena daya, kabel, atau `begin()` yang lupa, dan fungsi ini tidak dapat membedakannya. Karena itu langkah berikutnya selalu **satu pengamatan atau satu perubahan** yang membedakan dugaan, lalu dicatat. Untuk skenario S4, misalnya, kedua sisi menghitung jumlah periksa atas bagian yang berbeda (satu menyertakan `$`, satu tidak); satu perubahan pada satu sisi lalu pengamatan ulang cukup untuk memastikan.

Sketsa di bawah adalah alat bantu pada papan penerima: ia hanya menghitung byte yang masuk dan yang aneh, lalu melaporkannya tiap 5 detik ke monitor serial. Ia hanya diperiksa sintaksnya terhadap header tiruan, tidak dijalankan pada papan.

```arduino
// Arduino-C++ untuk ESP32, papan penerima. Diperiksa check:module-code terhadap header tiruan (sintaks dan tipe saja, bukan bukti perilaku papan).

const unsigned long BAUD = 115200;       // harus sama dengan papan pengirim
const unsigned long SELANG_LAPOR_MS = 5000;

unsigned long mulai = 0;
int byteMasuk = 0;
int bukanCetak = 0;

bool dapatDicetak(int c) {
  return (c >= 32 && c <= 126) || c == '\r' || c == '\n';
}

void setup() {
  Serial.begin(115200);
  Serial2.begin(BAUD);                   // pin bawaan Serial2: periksa papanmu
  mulai = millis();
}

void loop() {
  while (Serial2.available() > 0) {
    int c = Serial2.read();
    byteMasuk++;
    if (!dapatDicetak(c)) {
      bukanCetak++;
    }
  }
  if (millis() - mulai >= SELANG_LAPOR_MS) {
    mulai += SELANG_LAPOR_MS;
    Serial.print("byte masuk: ");
    Serial.println(byteMasuk);
    Serial.print("bukan cetak: ");
    Serial.println(bukanCetak);
  }
}
```

## Contoh setengah jadi

Jurnal diagnosis memuat lima hal: gejala, pengamatan, dugaan, **satu** tindakan, dan hasil. Lengkapi jurnal untuk skenario S2 (huruf acak). Bagian `____` ada pada tiga tempat.

```text setengah-jadi
Gejala     : penerima mencetak huruf acak
Pengamatan : byteMasuk 120, bukanCetak 80
Dugaan     : lapis ____ (baud berbeda di kedua sisi)
Tindakan   : samakan ____ di penerima dengan pengirim; ubah hanya itu
Hasil      : ____ (diisi setelah dicoba)
```

## Soal Parsons

Susun baris-baris di bawah (sudah diacak) menjadi fungsi `dapatDicetak`.

```text
(a) bool dapatDicetak(int c) {
(b)   return (c >= 32 && c <= 126) || c == '\r' || c == '\n';
(c) }
```

## Latihan

1. `AI: boleh` **Pseudocode dulu.** Gambar diagram alir diagnosismu sendiri untuk papan B yang tidak menampilkan apa pun (keluaran minggu ini). Tulis tiap lapis sebagai pertanyaan ya atau tidak dan tindakan satu langkahnya.
2. `AI: tanpa AI` **Cari celah.** Fungsi `diagnosa` diberi `{200, 0, 0, 0, 0}` (200 byte masuk, tidak ada baris sah, gagal periksa, atau gagal format). Apa keluarannya, mengapa itu menyesatkan, dan apa perbaikannya?
3. `AI: tanpa AI` **Tiga skenario gangguan sintetis.** Untuk tiap kasus, tulis gejala yang kamu duga akan teramati, lapis diagnosisnya, dan satu tindakan perbaikan: (a) TX papan A disambung ke TX papan B; (b) papan A memakai baud 115200 dan papan B 9600; (c) papan A mengirim suhu dalam derajat utuh padahal spesifikasi meminta sepersepuluh derajat.
4. `AI: boleh` **Bila dua papan tersedia (opsional).** Guru menyiapkan satu gangguan tanpa memberi tahu jenisnya. Pakai sketsa pencacah di atas, tulis jurnal diagnosis (lima baris seperti contoh), dan ubah satu hal pada satu waktu. Tanpa papan, kerjakan nomor 1 sampai 3. Jangan mengubah kabel saat daya menyala.
5. *Opsional:* **catatan pemakaian AI.** Bila memakai AI generatif, jawab nomor 3 sendiri dulu, lalu minta petunjuk bertahap atau kritik atas diagram alirmu, bukan diagram jadi. Catat alatnya, tujuanmu, garis besar perintahmu, bagian yang kamu pakai, dan cara memeriksanya. Jangan menaruh data pribadi atau tugas bernilai pada perintah.

## Latihan bercampur

1. Pesan `$S,5,6*16` dan `$S,5,6*17` diterima (`c-xi1-m11`). Mana yang dihitung `barisSah` dan mana yang `gagalPeriksa`?
2. `Statistik` berisi lima `int32_t`. Berapa byte memori yang ia pakai (`c-xi1-m8`)?

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `c-xi1-m13` (sekitar satu minggu lagi), `c-xi2-m1` (sekitar tiga minggu lagi), dan `c-xi2-m6` (sekitar delapan minggu lagi). Jawab sekarang lalu simpan.

1. Urutkan empat lapis diagnosis dari yang diperiksa pertama.
2. Mengapa memeriksa daya dan kabel sebelum membaca kode?
3. Bila penerima tidak menerima apa pun, apa dua dugaan pertama, dan bagaimana membedakannya dengan satu pengamatan?

## Kesalahan umum

- **Langsung mengubah kode.** Mengubah sebelum mengamati menghilangkan petunjuk; dan bila sebabnya kabel, kode yang benar malah menjadi rusak.
- **Mengubah beberapa hal sekaligus.** Kamu tidak tahu perubahan mana yang memperbaiki, dan bisa menambah galat baru.
- **Menganggap dugaan otomatis sebagai bukti.** `diagnosa` menunjuk lapis pertama yang patut diperiksa, bukan penyebab pasti.
- **Menyalahkan perangkat tanpa data.** Hitungan byte dan baris membedakan "tidak ada sinyal" dari "ada sinyal tetapi salah".
- **Tidak mencatat.** Tanpa jurnal, langkah yang sama diulang dan pelajaran hilang.

## Cek mandiri

- [ ] Saya dapat menyebut empat lapis diagnosis berurutan dan alasan urutannya.
- [ ] Saya mengamati dan menghitung dulu sebelum mengubah apa pun.
- [ ] Saya mengubah satu hal pada satu waktu dan mencatat hasilnya.
- [ ] Saya dapat menjelaskan batas dugaan otomatis.
- [ ] Saya menggambar diagram alir diagnosis yang dapat diikuti orang lain.

## Kunci dan petunjuk

**Ingat kembali.** 1: contoh: pin yang dipakai dan rentang ukur yang valid; satuan hasil; apa yang dikembalikan saat gagal; bahwa nilai contoh perlu diperiksa pada lembar data. 2: karena banyak galat lolos jumlah periksa, seperti dua digit tertukar atau galat yang saling meniadakan; ia mendeteksi kerusakan acak, bukan membuktikan kebenaran. 3: contoh: kosong; tepat penuh; satu sisipan setelah penuh; lebih dari satu putaran penuh. 4: karena bila beberapa hal berubah bersamaan, kamu tidak tahu perubahan mana yang memperbaiki atau merusak.

**Prediksi dulu.** 1: daya (lapis pertama): papan penerima tidak menyala, sehingga kabel dan kode belum perlu diperiksa. 2: kode, terutama baud yang berbeda di kedua sisi; periksa angka di `begin()` pada kedua program. 3: format pesan, terutama satuan: pengirim mengirim suhu yang sudah dikali 10 padahal penerima juga mengalikannya, atau sebaliknya; periksa spesifikasi dan kedua sisi.

**Contoh setengah jadi.** Isian berurutan: `kode`, `baud`, dan hasil yang kamu amati setelah mengubahnya (misalnya "huruf acak hilang, pesan sah diterima"). Jurnal yang baik hanya memuat satu tindakan.

**Soal Parsons.** Urutan benar: a, b, c.

**Latihan.** 1: tidak ada kunci tunggal; diagram yang baik memuat urutan daya, kabel, kode, format pesan, tiap lapis berupa pertanyaan ya atau tidak dengan tindakan satu langkah, dan ujung yang mencatat hasil. 2: keluarannya `sehat`; itu menyesatkan karena ada 200 byte tetapi tidak satu pun baris utuh, sehingga tidak ada yang sehat; kemungkinan pengirim tidak mengirim penanda akhir baris atau penerima tidak pernah mengenalinya. Perbaikan: tambahkan pemeriksaan sebelum `sehat`, yaitu bila `barisSah + gagalPeriksa + gagalFormat` sama dengan 0 padahal byte masuk, kembalikan "byte masuk tetapi tidak ada baris utuh: periksa penanda akhir baris". 3: (a) gejala: tidak ada byte yang masuk; lapis kabel; tindakan: sambung TX ke RX secara silang (dengan daya dicabut). (b) gejala: huruf acak atau byte aneh; lapis kode; tindakan: samakan baud di `begin()` kedua program. (c) gejala: pesan sah dan jumlah periksa cocok tetapi suhu terbaca sepuluh kali lebih kecil; lapis format pesan; tindakan: ikuti spesifikasi, kirim suhu dikali 10. 4: tidak ada kunci tunggal; jawaban yang baik memuat jurnal lima baris dengan satu tindakan per baris.

**Latihan bercampur.** 1: `$S,5,6*16` benar sehingga `barisSah`; `$S,5,6*17` jumlah periksanya salah (yang benar `16`) sehingga `gagalPeriksa`. 2: lima `int32_t` x 4 byte = 20 byte (dikonfirmasi penulis dengan `sizeof` pada komputer).

**Ulang berjarak.** 1: daya, kabel, kode, format pesan. 2: karena lapis atas bergantung pada lapis bawah dan memeriksa yang bawah lebih murah dan lebih mendasar; membaca kode tidak berguna bila papan tidak mendapat daya. 3: dugaan pertama: daya atau kabel; dugaan berikutnya: pin atau `begin()` yang salah di kode. Satu pengamatan pembeda: pastikan dulu pengirim sungguh mengirim (mis. cetak juga ke monitor serialnya); bila ya, dugaan bergeser ke kabel atau pin penerima.

## Langkah berikutnya

Modul berikut: `c-xi1-m13` (proyek mini kelas XI semester 1), yang menyatukan penyangga, pesan, dan diagnosis dalam sistem dua papan. Modul terkait: `c-xi1-m10` dan `c-xi1-m11` (protokol), `FND-X1-M5`, dan `c-xi2-m8` untuk pemecahan masalah jaringan IoT. Pembacaan lanjut: halaman Serial (UART) dokumentasi Arduino-ESP32.
