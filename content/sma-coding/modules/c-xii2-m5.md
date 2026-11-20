## Untuk siapa modul ini

Modul ini untuk murid kelas XII jalur C (IoT dan robotika), minggu `C-XII2-M5` silabus v1.4: proyek akhir, rancangan. Prasyarat: modul `c-xii2-m4` (ulasan keamanan dan privasi). Kamu memakai rencana proyek dari `C-XII1-M13`, ulasan keamanan minggu lalu, dan lembar pemodelan dari `c-xii2-m3`; `C-XII1-M13` belum terindeks saat modul ini ditulis.

Modul ini karangan penyusun dan disetujui pemilik program pada 2026-11-20 (keputusan lewat dialog; catatan tinjauan menjadi tindak lanjut revisi). Ia mendukung butir `F-BK-a` (alur proses pengembangan program atau produk digital) dan tidak dihitung memenuhi butir capaian pembelajaran mana pun. Keluaran minggu ini: dokumen rancangan. Latihan silabusnya: memilih topik. Rancangan ini dipakai pada `C-XII2-M6` sampai `C-XII2-M13`.

Minggu ini kerja di kertas dan komputer, dalam kelompok kecil dengan peran tertentu. Keselamatan perangkat: rancangan menentukan keselamatan nanti, jadi tulis batas daya (USB atau baterai AA/AAA dari guru, tanpa listrik jaringan 220 V, tanpa baterai litium tanpa pelindung, tanpa solder). Proyek akhir tidak mengumpulkan data pribadi nyata.

## Ingat kembali

Jawab dari ingatan dulu, baru cek di kunci. Soal 1 dari `c-xii2-m4`, soal 2 dari `c-xii2-m2`, soal 3 dari `c-xii1-m11`.

1. Sebut tiga lapis yang diperiksa pada ulasan keamanan.
2. Bagian apa saja pada catatan optimasi yang membuat orang lain dapat menilai keputusanmu?
3. Sebut dua langkah untuk mengurangi data pribadi yang dikumpulkan robot.

## Tujuan

Setelah modul ini kamu dapat:

- menulis dokumen rancangan: kebutuhan, arsitektur, antarmuka, rencana uji, keselamatan dan privasi, rencana kerja, dan risiko;
- menelusuri tiap kebutuhan ke minimal satu uji, dan tiap uji ke kebutuhan;
- menentukan fitur yang boleh dipotong bila waktu habis dan menulis kriteria selesai serta prediksi sebelum mengerjakan;
- memberi umpan balik sejawat yang spesifik.

## Rencana proyek

**Rancangan** lebih rinci daripada rencana proyek minggu `C-XII1-M13`: rencana berkata apa dan kapan, rancangan berkata bagaimana. Bagian dokumen rancangan: (1) masalah, pengguna, dan kebutuhan terukur; (2) arsitektur: blok sensor, pengolah, aktuator, daya, dan (bila perlu) jaringan, dengan satu kalimat tanggung jawab tiap blok; (3) antarmuka: rencana tabel pin dan format data; (4) strategi dan alasan pilihannya, dibandingkan dengan satu alternatif (seperti `c-xii1-m8`); (5) rencana uji yang menunjuk kebutuhan; (6) keselamatan, keamanan, dan privasi (ulasan `c-xii2-m4`); (7) rencana kerja `C-XII2-M6` sampai `M13` dengan peran; (8) risiko beserta pencegahan; (9) fitur yang boleh dipotong lebih dulu; (10) kriteria selesai dan prediksi, ditulis **sebelum** mengerjakan.

Kunci rancangan yang baik adalah **keterlacakan**: setiap kebutuhan punya uji, dan setiap uji menunjuk kebutuhan. Kebutuhan tanpa uji hanya harapan. Program berikut memeriksa draf karangan dari robot pengantar kotak (proyek contoh `C-XII1-M13`) yang sengaja belum lengkap. Ia memeriksa kelengkapan, bukan kebenaran rancangannya.

```cpp
// C++17 biasa, jalan di komputer. Diperiksa oleh check:module-code.
// Memeriksa dokumen rancangan karangan: tiap kebutuhan punya batas angka, cara ukur, dan paling sedikit satu uji;
// tiap uji menunjuk kebutuhan yang ada. Hanya memeriksa kelengkapan, bukan kebenaran rancangannya.
#include <iostream>
#include <string>
#include <vector>

struct Kebutuhan {
  std::string id;
  std::string batas;     // angka dan satuan; kosong berarti tidak bisa gagal
  std::string caraUkur;  // kosong berarti tidak bisa diperiksa
};

struct Uji {
  std::string id;
  std::string untuk;  // id kebutuhan yang diuji
};

int main() {
  std::vector<Kebutuhan> kebutuhan = {
      {"K1", "paling lama 40 detik untuk 2 m", "pengatur waktu, 10 lari"},
      {"K2", "simpangan paling besar 25 mm", "penggaris di lintasan, 10 lari"},
      {"K3", "berhenti di AMAN bila garis hilang", "angkat robot dari garis, 5 kali"},
      {"K4", "beroperasi paling sedikit 30 menit", ""},
      {"K5", "", ""},
  };
  std::vector<Uji> uji = {
      {"U1", "K1"},
      {"U2", "K2"},
      {"U3", "K3"},
      {"U4", "K9"},
  };

  int masalah = 0;
  for (const Kebutuhan &k : kebutuhan) {
    if (k.batas.empty()) {
      std::cout << k.id << ": tidak punya batas terukur (tidak bisa gagal)\n";
      masalah++;
    }
    if (k.caraUkur.empty()) {
      std::cout << k.id << ": tidak punya cara ukur\n";
      masalah++;
    }
    int jumlahUji = 0;
    for (const Uji &u : uji) {
      if (u.untuk == k.id) {
        jumlahUji++;
      }
    }
    if (jumlahUji == 0) {
      std::cout << k.id << ": belum ada uji yang menunjuknya\n";
      masalah++;
    }
  }
  for (const Uji &u : uji) {
    bool ada = false;
    for (const Kebutuhan &k : kebutuhan) {
      if (k.id == u.untuk) {
        ada = true;
      }
    }
    if (!ada) {
      std::cout << u.id << ": menunjuk kebutuhan " << u.untuk << " yang tidak ada\n";
      masalah++;
    }
  }
  std::cout << "masalah ditemukan: " << masalah << "\n";
}
```

Keluaran program (dijalankan penulis dengan `g++ -std=c++17`):

```text
K4: tidak punya cara ukur
K4: belum ada uji yang menunjuknya
K5: tidak punya batas terukur (tidak bisa gagal)
K5: tidak punya cara ukur
K5: belum ada uji yang menunjuknya
U4: menunjuk kebutuhan K9 yang tidak ada
masalah ditemukan: 6
```

Bacalah dengan jujur. K1, K2, dan K3 lengkap. K4 punya batas (30 menit) tetapi belum punya cara ukur dan belum ada ujinya; K5 (tanpa data pribadi) bahkan belum punya batas yang dapat diperiksa, jadi perlu ditulis ulang, misalnya "tidak ada kolom nama, kontak, atau lokasi pada data yang dicatat", dengan cara ukur "periksa tabel data dan program". U4 menunjuk K9 yang tidak ada: mungkin salah ketik, mungkin kebutuhan yang lupa ditulis.

## Daftar periksa

Kerjakan berurutan; tiap titik periksa harus dapat ditunjukkan kepada orang lain.

1. `AI: boleh` **Topik.** Pilih topik dari ide kelompok (boleh meneruskan rencana `C-XII1-M13`) dan tulis masalah serta pengguna fiktif dalam dua kalimat. Titik periksa: orang lain dapat menyebut masalahnya kembali.
2. `AI: tanpa AI` **Kebutuhan dan uji.** Tulis tiga sampai lima kebutuhan dengan angka, satuan, dan cara ukur, lalu satu uji untuk tiap kebutuhan. Titik periksa: tiap kebutuhan dapat gagal dan punya uji.
3. `AI: boleh` **Arsitektur dan antarmuka.** Gambar blok, tulis rencana tabel pin dan format data. Titik periksa: tiap blok punya satu tanggung jawab dan tidak ada pin kembar.
4. `AI: boleh` **Keselamatan, keamanan, privasi.** Tulis batas daya, rencana rahasia (berkas terpisah), dan data apa yang dicatat. Titik periksa: tidak ada sensor yang merekam orang dan tidak ada data pribadi nyata.
5. `AI: tanpa AI` **Kriteria dan prediksi.** Tulis kriteria selesai, prediksi hasil, dan daftar fitur yang boleh dipotong lebih dulu. Titik periksa: prediksi bertanggal sebelum merakit.
6. `AI: boleh` **Rencana kerja dan risiko.** Petakan tugas ke `C-XII2-M6` sampai `M13` dengan satu peran per tugas, dan risiko dengan pencegahan dan penanggung jawab. Titik periksa: tiap minggu punya keluaran yang dapat dilihat.
7. *Opsional:* **catatan pemakaian AI.** Bila memakai AI generatif, tulis dulu draf sendiri, lalu minta kritik, bukan rancangan jadi. Catat alatnya, tujuanmu, garis besar perintahmu, bagian yang kamu pakai, dan cara memeriksanya. Jangan menaruh data pribadi pada perintah.

## Umpan balik sejawat

Tukar rancangan dengan kelompok lain. Beri masukan: **satu yang sudah baik**, **satu yang perlu diperbaiki** (sebut butirnya, misalnya "K4 belum punya uji"), dan **satu langkah berikutnya**. Ulasan berpasangan ini praktik yang layak dicoba, bukan jaminan hasil (buktinya paling banyak pada mahasiswa).

## Latihan bercampur

1. Dari `c-xii2-m3`: tujuan pada lembar pemodelan menjadi bagian mana dari dokumen rancangan, dan mengapa ia harus dapat gagal?
2. Dari `c-xii2-m4`: sebut satu temuan ulasan keamanan yang harus sudah ada jawabannya di rancangan sebelum merakit.

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `C-XII2-M6` (sekitar satu minggu lagi), `C-XII2-M8` (sekitar tiga minggu lagi), dan `C-XII2-M13` (sekitar delapan minggu lagi). Jawab sekarang lalu simpan.

1. Mengapa tiap kebutuhan harus punya uji yang menunjuknya?
2. Sebut bagian-bagian dokumen rancangan.
3. Mengapa fitur yang boleh dipotong ditulis sejak rancangan?

## Kesalahan umum

- **Kebutuhan tanpa uji.** Ia hanya harapan.
- **Uji tanpa kebutuhan.** Waktu terbuang, atau ada kebutuhan yang lupa ditulis.
- **Tidak menulis fitur yang boleh dipotong.** Saat waktu habis, kelompok berdebat alih-alih bertindak.
- **Menunda keselamatan dan privasi sampai merakit.**

## Cek mandiri

- [ ] Tiap kebutuhanku punya angka, satuan, cara ukur, dan uji.
- [ ] Tiap ujiku menunjuk kebutuhan yang ada.
- [ ] Rancanganku menyebut batas daya, rahasia, dan data yang dicatat.
- [ ] Aku menulis fitur yang boleh dipotong lebih dulu.
- [ ] Prediksiku ditulis sebelum mengerjakan.

## Kunci dan petunjuk

**Ingat kembali.** 1: rahasia, jaringan, dan data. 2: alasan dan masalah, ukuran sebelum, perubahan, ukuran sesudah, uji kebenaran, ongkos, dan keputusan. 3: contoh: tidak mencatat data yang tidak diperlukan, dan memakai data karangan atau tanpa kolom pengenal; tidak ada kamera atau mikrofon yang merekam orang.

**Rencana proyek.** Rancangan yang baik memiliki kebutuhan yang dapat gagal, uji yang menunjuk kebutuhan, alasan pilihan strategi, batas keselamatan dan privasi, fitur yang boleh dipotong, dan prediksi bertanggal. Bandingkan dengan bagian (1) sampai (10): tidak ada yang kosong.

**Daftar periksa.** Rubrik singkat: nomor 1 dua kalimat dengan masalah yang jelas; nomor 2 tiap butir ada angka, satuan, cara ukur, dan uji; nomor 3 blok, pin, dan format data konsisten; nomor 4 batas daya, rahasia, dan data tertulis; nomor 5 kriteria dapat gagal dan prediksi bertanggal; nomor 6 satu peran per tugas dan satu keluaran per minggu; nomor 7 opsional.

**Umpan balik sejawat.** Umpan balik yang baik menyebut butir, bukan kesan umum, dan memberi langkah yang bisa dikerjakan minggu depan.

**Latihan bercampur.** 1: ia menjadi bagian kebutuhan terukur; ia harus dapat gagal supaya hasil uji bisa jujur, seperti T1 pada gudang fiktif yang ternyata tidak tercapai. 2: contoh: rahasia jaringan lab disimpan di berkas yang tidak di-commit; atau data yang dicatat tidak memuat kolom pengenal orang.

**Ulang berjarak.** 1: kebutuhan tanpa uji tidak dapat dibuktikan tercapai, dan uji tanpa kebutuhan tidak punya tujuan. 2: masalah dan kebutuhan, arsitektur, antarmuka, strategi dan alasannya, rencana uji, keselamatan dan privasi, rencana kerja, risiko, fitur yang boleh dipotong, serta kriteria dan prediksi. 3: supaya keputusan memotong dibuat tenang di awal, bukan saat tekanan waktu.

## Langkah berikutnya

Modul berikut: `C-XII2-M6` (sprint 1: perangkat keras). Bacaan lanjut: bagian proses rekayasa pada Panduan Mata Pelajaran Informatika (lihat Rujukan).
