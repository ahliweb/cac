## Untuk siapa modul ini

Modul ini untuk murid kelas XI jalur C (IoT dan robotika), minggu `C-XI1-M2` silabus v1.3: kualitas kode dan pengujian. Prasyarat: modul `c-xi1-m1` (proses rekayasa produk IoT). Kamu juga memakai fungsi dan larik dari `c-x1-m12`, pemeriksaan data dari `c-x2-m12`, dan pembacaan analog dari `c-x1-m11`.

Modul ini karangan penyusun dan disetujui pemilik program pada 2026-11-20 (keputusan lewat dialog; catatan tinjauan menjadi tindak lanjut revisi). Ia mendukung butir `F-BK-a` (alur proses pengembangan program atau produk digital) dan `F-AP-c` (pengembangan, pemeliharaan, penyempurnaan algoritma standar, dan kualitas kode) dan tidak dihitung memenuhi butir capaian pembelajaran mana pun. Keluaran minggu ini: berkas kasus uji. Latihan silabusnya: uji tepi pembacaan sensor.

Minggu ini semua bagian pokok dikerjakan **tanpa papan**, dengan kertas dan program C++ biasa di komputer. Nilai batas cahaya pada contoh hanya contoh `[belum terverifikasi]` untuk rangkaianmu: ukur sendiri. Bila kamu mencoba dengan papan, ikuti aturan keselamatan modul sebelumnya: daya USB saja dan cabut kabel sebelum mengubah rangkaian.

## Ingat kembali

Jawab dari ingatan dulu, baru cek di kunci. Soal 1 dari `c-x2-m8`, soal 2 dari `c-x2-m13`, soal 3 dari `c-xi1-m1`.

1. Mengapa menaruh pencetakan di fungsi tersendiri, bukan di tengah logika, memudahkan pengujian?
2. Tulis satu kasus uji untuk `median` yang semua nilainya sama, dan hasil yang kamu harapkan.
3. Mengapa kriteria selesai harus bisa diuji, dan apa yang salah dengan "perangkat harus bekerja dengan baik"?

## Tujuan

Setelah modul ini kamu dapat:

- memisahkan logika keputusan dari bagian yang menyentuh perangkat keras agar dapat diuji di komputer;
- menulis kasus uji sebagai tabel masukan dan hasil yang diharapkan, termasuk nilai tepat di batas;
- menjalankan kasus uji dan membaca laporan lulus atau gagal untuk menemukan galat satu langkah;
- menjaga keterbacaan: nama bermakna, konstanta bernama, dan satu tugas per fungsi;
- menghasilkan berkas kasus uji (keluaran minggu ini).

## Prediksi dulu

Fungsi `kategoriCahaya` mengubah pembacaan mentah 0 sampai 4095 menjadi `GELAP` (di bawah 1000), `REDUP` (1000 sampai 2999), atau `TERANG` (3000 ke atas); di luar 0 sampai 4095 hasilnya `TIDAK_VALID`. Ada dua versinya: yang benar, dan yang salah menulis `<=` di tempat `<` pada batas gelap. Delapan masukan diuji: -1, 0, 999, 1000, 2999, 3000, 4095, 4096. **Tebak dulu, tulis jawabanmu, baru telusuri.**

1. Versi benar: berapa dari delapan uji yang lulus?
2. Versi salah: masukan mana yang gagal, dan apa hasil yang dikembalikannya?
3. Mengapa uji dengan masukan 500 dan 2000 saja tidak akan menemukan galat itu?

## Contoh terselesaikan

Menguji berarti menjalankan kode pada masukan yang jawabannya sudah kamu putuskan **sebelum** menjalankannya, lalu membandingkan. Kasus uji adalah pasangan masukan dan hasil yang diharapkan. Tempat galat paling sering bersembunyi adalah **nilai tepat di batas**: satu angka di bawahnya, tepat di batas, dan satu di atasnya. Galat "kurang dari" lawan "kurang dari atau sama dengan" hanya tampak di sana.

Agar mudah diuji, logika dipisahkan dari perangkat keras. Fungsi `kategoriCahaya` tidak memanggil `analogRead` dan tidak mencetak apa pun; ia hanya menerima angka dan mengembalikan kata. Fungsi sejenis itu dapat dijalankan di komputer tanpa papan. Prinsip ini sejalan dengan saran C++ Core Guidelines: satu fungsi melakukan satu operasi logis (F.2), dan hindari angka ajaib dengan konstanta bernama (ES.45). Karena itu `1000` dan `3000` tidak ditulis langsung di dalam `if`, melainkan `BATAS_GELAP` dan `BATAS_TERANG`, yang kamu tentukan dari pengukuran (`c-x1-m11`).

Program berikut menjalankan delapan kasus uji pada versi benar dan versi salah, dan mencetak hanya yang gagal beserta ringkasan.

```cpp
// C++17 biasa, jalan di komputer. Diperiksa oleh check:module-code.
#include <cstring>
#include <iostream>

const int MENTAH_MIN = 0;
const int MENTAH_MAKS = 4095;
const int BATAS_GELAP = 1000;    // contoh; ukur sendiri
const int BATAS_TERANG = 3000;   // contoh; ukur sendiri

const char* kategoriCahaya(int mentah) {
  if (mentah < MENTAH_MIN || mentah > MENTAH_MAKS) {
    return "TIDAK_VALID";
  }
  if (mentah < BATAS_GELAP) {
    return "GELAP";
  }
  if (mentah < BATAS_TERANG) {
    return "REDUP";
  }
  return "TERANG";
}

// Versi salah: sengaja memakai <= pada batas gelap.
const char* kategoriCahayaSalah(int mentah) {
  if (mentah < MENTAH_MIN || mentah > MENTAH_MAKS) {
    return "TIDAK_VALID";
  }
  if (mentah <= BATAS_GELAP) {
    return "GELAP";
  }
  if (mentah < BATAS_TERANG) {
    return "REDUP";
  }
  return "TERANG";
}

const int JUMLAH_UJI = 8;
const int MASUKAN[JUMLAH_UJI] = {-1, 0, 999, 1000, 2999, 3000, 4095, 4096};
const char* HARAPAN[JUMLAH_UJI] = {"TIDAK_VALID", "GELAP", "GELAP", "REDUP",
                                   "REDUP", "TERANG", "TERANG", "TIDAK_VALID"};

int jalankanUji(const char* nama, const char* (*fungsi)(int)) {
  int gagal = 0;
  for (int i = 0; i < JUMLAH_UJI; i++) {
    const char* hasil = fungsi(MASUKAN[i]);
    if (std::strcmp(hasil, HARAPAN[i]) != 0) {
      gagal++;
      std::cout << nama << " GAGAL: masukan " << MASUKAN[i] << ", harapan " << HARAPAN[i]
                << ", hasil " << hasil << "\n";
    }
  }
  std::cout << nama << ": " << (JUMLAH_UJI - gagal) << " dari " << JUMLAH_UJI << " lulus\n";
  return gagal;
}

int main() {
  jalankanUji("benar", kategoriCahaya);
  jalankanUji("salah", kategoriCahayaSalah);
}
```

Keluarannya:

```text
benar: 8 dari 8 lulus
salah GAGAL: masukan 1000, harapan REDUP, hasil GELAP
salah: 7 dari 8 lulus
```

Hanya kasus 1000 yang gagal. Kasus 999 dan 2999 tetap lulus pada versi salah, sehingga uji "nilai biasa" saja lolos dan galat itu baru ketahuan di perangkat, ketika lampu kelas yang tepat di batas salah dikategorikan. Lolosnya delapan uji hanya berarti fungsi cocok dengan tabel itu; kebenarannya untuk masukan lain, dan untuk rangkaianmu, tetap perlu pengukuran.

Keterbacaan menopang pengujian. Nama `kategoriCahaya` menjelaskan tugasnya; konstanta bernama membuat batas bisa diubah di satu tempat; komentar menjelaskan **mengapa** (misalnya "ukur sendiri"), bukan mengulang apa yang sudah jelas dari kodenya. Kode yang sulit dibaca sulit diuji karena orang tidak tahu apa yang diharapkan.

## Contoh setengah jadi

Fungsi `suhuValid` menerima 15,0 sampai 45,0 derajat Celsius (kedua ujung termasuk). Lengkapi data uji supaya mencakup kedua batas; bagian `____` adalah nilai dan hasil yang kamu putuskan.

```cpp setengah-jadi
// C++17. Lengkapi bagian ____: pilih nilai tepat di batas dan hasil yang diharapkan.
bool suhuValid(double c) { return c >= 15.0 && c <= 45.0; }

const double MASUKAN[] = {14.9, ____, 15.1, 44.9, ____, 45.1};
const bool HARAPAN[] = {false, true, true, true, ____, false};
```

## Soal Parsons

Susun baris-baris di bawah (sudah diacak) menjadi isi `jalankanUji`.

```text
(a)   int gagal = 0;
(b)   return gagal;
(c)   for (int i = 0; i < JUMLAH_UJI; i++) {
(d)     if (std::strcmp(hasil, HARAPAN[i]) != 0) {
(e)       gagal++;
(f)     }
(g)     const char* hasil = fungsi(MASUKAN[i]);
(h)   }
```

## Latihan

1. `AI: boleh` **Rancangan uji dulu.** Fungsi `persenDariMentah(int mentah)` mengembalikan `mentah * 100 / 4095` untuk 0 sampai 4095 dan -1 di luar itu. Tulis dulu daftar kasus uji (tabel masukan dan hasil), lalu fungsinya, lalu jalankan (keluaran minggu ini: berkas kasus uji).
2. `AI: tanpa AI` **Cari penyebab.** Laporan uji menunjukkan hanya masukan 3000 yang gagal, dengan hasil `REDUP` padahal harapannya `TERANG`. Operator mana pada `kategoriCahaya` yang salah?
3. `AI: tanpa AI` **Perbaiki keterbacaan.** Tulis ulang `if (a > 2999) x = 1;` sehingga tujuannya jelas, dengan nama dan konstanta bernama.
4. `AI: boleh` **Tambah kasus.** Tambahkan satu kasus uji untuk `kategoriCahaya` yang menurutmu belum tercakup, hitung hasilnya sebelum menjalankan, lalu jalankan.
5. *Opsional:* **catatan pemakaian AI.** Bila memakai AI generatif, jawab nomor 1 sendiri dulu, lalu minta kritik atau petunjuk bertahap, bukan jawaban jadi. Catat alatnya, tujuanmu, garis besar perintahmu, bagian yang kamu pakai, dan cara memeriksanya. Jangan menaruh data pribadi atau tugas bernilai pada perintah.

## Latihan bercampur

1. Aturan pemeriksa baris data dari `c-x2-m12` menolak suhu di luar 15 sampai 45. Tulis empat kasus uji tepi untuk aturan itu dan hasil yang diharapkan.
2. Fungsi `rataRata` dari `c-x2-m4` harus menangani jendela yang masih kosong. Tulis satu kasus uji yang memeriksanya dan hasil yang kamu harapkan.

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `c-xi1-m3` (sekitar satu minggu lagi), `c-xi1-m5` (sekitar tiga minggu lagi), dan `c-xi1-m10` (sekitar delapan minggu lagi). Jawab sekarang lalu simpan.

1. Pada kasus uji yang disimpan dalam dua larik sejajar (`MASUKAN` dan `HARAPAN`), apa risikonya bila urutannya bergeser atau panjangnya berbeda?
2. Mengapa fungsi yang tidak menyentuh pin lebih mudah diuji di komputer?
3. Sebut tiga ciri kode yang mudah dibaca orang lain.

## Kesalahan umum

- **Menguji hanya nilai biasa.** Galat `<` lawan `<=` hanya tampak tepat di batas.
- **Menulis hasil harapan dengan menyalin hasil program.** Harapan harus diputuskan lebih dulu; kalau tidak, uji hanya membenarkan galat yang sama.
- **Mencampur logika dengan `analogRead` dan `Serial.print`.** Fungsi seperti itu tidak bisa diuji tanpa papan.
- **Angka ajaib.** `2999` di tengah kode tidak menjelaskan apa-apa, dan mengubahnya berarti mencari ke seluruh program.
- **Mengira semua uji lulus berarti program benar.** Uji hanya membuktikan pasangan masukan yang kamu tulis; masukan lain dan perangkat nyata tidak tercakup.

## Cek mandiri

- [ ] Saya dapat menulis kasus uji sebagai tabel masukan dan hasil harapan.
- [ ] Saya selalu menguji satu di bawah, tepat di, dan satu di atas setiap batas.
- [ ] Saya memisahkan logika keputusan dari pembacaan pin dan pencetakan.
- [ ] Saya memakai konstanta bernama, bukan angka ajaib.
- [ ] Saya memutuskan hasil harapan sebelum menjalankan program.

## Kunci dan petunjuk

**Ingat kembali.** 1: fungsi pencetak yang terpisah membuat logika mengembalikan nilai yang bisa dibandingkan dengan harapan, tanpa harus membaca layar. 2: contoh: masukan 5, 5, 5, 5, 5 dengan harapan median 5. 3: kriteria yang tidak bisa diuji tidak dapat dinyatakan lulus atau gagal; "bekerja dengan baik" tidak punya ukuran.

**Prediksi dulu.** 1: delapan dari delapan. 2: masukan 1000 gagal; harapannya `REDUP`, hasilnya `GELAP` (karena `1000 <= 1000`). 3: 500 dan 2000 jauh dari batas, sehingga kedua versi memberi hasil sama; hanya nilai tepat di batas membedakannya.

**Contoh setengah jadi.** Isian berurutan: `15.0`, `45.0`, `true`. Kunci lengkapnya dikompilasi dan dijalankan penulis tanpa peringatan; semua enam kasus lulus.

**Soal Parsons.** Urutan benar: a, c, g, d, e, f, h, b. `hasil` harus dideklarasikan di dalam perulangan sebelum dibandingkan, dan `return gagal` ada di luar perulangan.

**Latihan.** 1: kasus yang baik mencakup -1 (hasil -1), 0 (0), 4095 (100), 4096 (-1), dan satu nilai tengah, misalnya 2048 (50: 204800 dibagi 4095 = 50 sisa 50, dibulatkan ke bawah); tidak ada kunci tunggal untuk fungsi lengkapnya. 2: `if (mentah < BATAS_TERANG)` ditulis `<=`; pada 3000 yang benar mengembalikan `TERANG`. 3: contoh: `const int BATAS_TERANG = 3000; ... if (cahaya >= BATAS_TERANG) { kategori = TERANG; }`; yang penting nama dan konstanta menjelaskan maksudnya. 4: contoh: 1 (harapan `GELAP`); semua kasus yang hasilnya sesuai penelusuranmu diterima.

**Latihan bercampur.** 1: 14,9 (ditolak), 15,0 (diterima), 45,0 (diterima), 45,1 (ditolak). 2: contoh: jendela kosong (belum ada pembacaan) dengan harapan "tidak ada" atau nilai yang ditentukan modul itu, bukan pembagian dengan nol.

**Ulang berjarak.** 1: bila urutannya bergeser, sebuah masukan dipasangkan dengan hasil harapan yang salah (uji gagal palsu atau lolos palsu); bila panjang berbeda, pembacaan melewati ujung larik. 2: karena fungsi itu hanya menerima angka dan mengembalikan hasil, tanpa bergantung pada papan, sensor, atau waktu. 3: contoh: nama bermakna, konstanta bernama, satu tugas per fungsi, komentar yang menjelaskan alasan.

## Langkah berikutnya

Modul berikut: `c-xi1-m3` (tipe data bentukan), yang menyatukan masukan dan hasil harapan dalam satu `struct` supaya dua larik sejajar tidak perlu lagi. Modul terkait: `fondasi-keamanan-dasar` untuk gagasan memeriksa masukan yang tidak valid. Pembacaan lanjut: C++ Core Guidelines bagian fungsi (F) dan ekspresi (ES).
