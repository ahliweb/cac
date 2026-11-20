## Untuk siapa modul ini

Modul ini untuk murid kelas XI jalur C (IoT dan robotika), minggu `C-XI1-M1` silabus v1.3: proses rekayasa produk IoT. Prasyarat: modul `c-x2-m12` (mencatat data) dan `c-x2-m14` (asesmen kelas X semester 2); keduanya diperiksa guru karena belum terindeks saat modul ini ditulis. Kamu juga memakai `millis()` dari `c-x2-m7`, larik dari `c-x1-m12`, dan gagasan "uji dengan data karangan" dari `c-x2-m12`.

Modul ini karangan penyusun dan disetujui pemilik program pada 2026-11-20 (keputusan lewat dialog; catatan tinjauan menjadi tindak lanjut revisi). Ia mendukung butir `F-BK-a` (alur proses pengembangan program atau produk digital) dan tidak dihitung memenuhi butir capaian pembelajaran mana pun. Keluaran minggu ini: dokumen rancangan satu halaman. Latihan silabusnya: rancang perangkat pemantau.

Minggu ini semua bagian pokok dikerjakan **tanpa papan**, dengan kertas dan "papan tiruan" di komputer. Bila kamu mencoba dengan papan, ikuti aturan keselamatan modul sebelumnya: daya USB saja, tanpa listrik jaringan 220 V, dan cabut kabel sebelum mengubah rangkaian. Nilai batas pada contoh hanya contoh `[belum terverifikasi]` untuk perangkatmu. Data yang dibahas hanya suhu ruangan dan data karangan; tidak ada nama atau identitas.

## Ingat kembali

Jawab dari ingatan dulu, baru cek di kunci. Soal 1 dari `c-x2-m7`, soal 2 dari `c-x2-m12`, soal 3 dari `c-x2-m10`.

1. Apa kelemahan `delay()` untuk program yang harus melakukan dua hal?
2. Mengapa baris yang ditolak dicatat beserta alasannya, bukan dihapus diam-diam?
3. Mengapa median tujuh pembacaan membuang lonjakan tunggal, sedangkan rata-rata tidak?

## Tujuan

Setelah modul ini kamu dapat:

- menguraikan empat tahap proses rekayasa produk: kebutuhan, rancangan, implementasi, dan uji;
- menulis kebutuhan yang terukur sehingga bisa diuji, bukan kalimat kabur;
- menerjemahkan satu kebutuhan menjadi kriteria selesai, rancangan masukan-proses-keluaran, dan daftar uji;
- menjelaskan mengapa kebutuhan dan rancangan ditulis sebelum kode;
- menulis dokumen rancangan satu halaman untuk sebuah perangkat pemantau (keluaran minggu ini).

## Prediksi dulu

Sebuah tim ingin membuat pemantau suhu untuk ruang penyimpanan alat peraga. Empat kalimat kebutuhan diusulkan. **Tebak dulu, tulis jawabanmu, baru telusuri.**

- (a) "Pemantau harus bekerja dengan baik."
- (b) "Alarm berbunyi bila suhu di atas 30 derajat Celsius pada 3 pembacaan berturut-turut."
- (c) "Pembacaan dilakukan tiap 10 detik."
- (d) "Alarm harus cepat."

1. Kalimat mana yang dapat diuji dengan jawaban "lulus" atau "gagal" yang jelas?
2. Untuk kalimat (b), apa hasil `perluAlarm` pada urutan 29, 31, 32, 33 dan pada urutan 31, 32, 29, 33, 34?
3. Mengapa 30,0 tepat tidak membuat alarm berbunyi menurut kalimat (b)?

## Contoh terselesaikan

Perangkat IoT yang baik tidak dimulai dari kode. Prosesnya empat tahap yang saling mengisi. **Kebutuhan:** apa yang harus dilakukan produk, ditulis sehingga bisa diuji. **Rancangan:** bagaimana kebutuhan itu dipenuhi, yaitu masukan, proses, keluaran, dan batas yang dipilih. **Implementasi:** menulis program dan merakit. **Uji:** memeriksa bahwa kriteria dari tahap pertama terpenuhi. Tahap-tahap itu tidak sekali jalan: hasil uji sering mengubah rancangan, dan rancangan yang gagal sering menunjukkan kebutuhan yang kurang jelas.

Kalimat kebutuhan yang baik punya angka, satuan, dan kondisi. Kalimat (b) di atas memenuhi syarat itu: batasnya 30 derajat, jumlah pembacaan 3, dan kata "di atas" berarti 30,0 sendiri tidak cukup. Kalimat (a) dan (d) tidak bisa diuji karena tidak ada ukuran "baik" atau "cepat".

Rancangan satu halaman untuk kalimat (b) terlihat seperti tabel berikut. Angka pada kolom isi hanya contoh.

| Bagian | Isi contoh |
| --- | --- |
| Kebutuhan | Alarm berbunyi bila suhu di atas 30 derajat Celsius pada 3 pembacaan berturut-turut. |
| Masukan | Sensor suhu, dibaca tiap 10 detik dengan `millis()`. |
| Proses | Hitung pembacaan berturut-turut yang di atas batas; setel ulang hitungan bila ada pembacaan yang tidak di atas batas. |
| Keluaran | Satu keluaran digital untuk buzzer; satu baris catatan per pembacaan ke `Serial`. |
| Kriteria selesai | Empat data karangan menghasilkan alarm sesuai tabel uji; nilai tepat 30,0 tidak membunyikan alarm. |
| Daftar uji | Naik terus; naik lalu turun; hanya dua pembacaan; semuanya tepat 30,0. |

Bagian proses itu dapat ditulis lebih dulu sebagai fungsi yang tidak menyentuh perangkat keras, sehingga bisa diuji di komputer tanpa papan. Fungsi di bawah adalah "papan tiruan" untuk proses itu: ia menerima urutan suhu dan mengembalikan apakah alarm perlu berbunyi.

```cpp
// C++17 biasa, jalan di komputer. Diperiksa oleh check:module-code.
#include <iostream>

bool perluAlarm(const double suhu[], int jumlah, double batas, int minimalBerturut) {
  int beruntun = 0;
  for (int i = 0; i < jumlah; i++) {
    if (suhu[i] > batas) {
      beruntun++;
    } else {
      beruntun = 0;
    }
    if (beruntun >= minimalBerturut) {
      return true;
    }
  }
  return false;
}

int main() {
  const double naikTerus[] = {29.0, 31.0, 32.0, 33.0};
  const double naikTurun[] = {31.0, 32.0, 29.0, 33.0, 34.0};
  const double hanyaDua[] = {31.0, 32.0};
  const double tepatBatas[] = {30.0, 30.0, 30.0};

  std::cout << std::boolalpha;
  std::cout << "naik terus: " << perluAlarm(naikTerus, 4, 30.0, 3) << "\n";
  std::cout << "naik lalu turun: " << perluAlarm(naikTurun, 5, 30.0, 3) << "\n";
  std::cout << "hanya dua pembacaan: " << perluAlarm(hanyaDua, 2, 30.0, 3) << "\n";
  std::cout << "tepat 30,0: " << perluAlarm(tepatBatas, 3, 30.0, 3) << "\n";
}
```

Keluarannya:

```text
naik terus: true
naik lalu turun: false
hanya dua pembacaan: false
tepat 30,0: false
```

Telusuri `naik terus`: 29,0 tidak di atas batas, hitungan 0; 31,0 hitungan 1; 32,0 hitungan 2; 33,0 hitungan 3, jadi alarm. Pada `naik lalu turun` hitungan mencapai 2, lalu 29,0 menyetel ulang ke 0, lalu hanya mencapai 2 lagi. Lolosnya keempat uji hanya berarti fungsi itu sesuai kriteria pada empat data ini; ia belum membuktikan perangkatnya bekerja di papan dan di ruangan nyata.

## Contoh setengah jadi

Sekarang kebutuhan baru: "Siaga bila kelembapan di atas 70 persen pada 2 pembacaan berturut-turut." Kerangka fungsinya sama; lengkapi bagian `____`.

```cpp setengah-jadi
// C++17. Lengkapi bagian ____.
bool perluSiaga(const double lembap[], int jumlah) {
  int beruntun = 0;
  for (int i = 0; i < jumlah; i++) {
    if (lembap[i] ____ 70.0) {
      beruntun++;
    } else {
      beruntun = ____;
    }
    if (beruntun >= ____) {
      return true;
    }
  }
  return false;
}
```

## Soal Parsons

Susun baris-baris di bawah (sudah diacak) menjadi isi perulangan `perluAlarm`.

```text
(a)     if (beruntun >= minimalBerturut) {
(b)       beruntun = 0;
(c)     }
(d)     if (suhu[i] > batas) {
(e)       beruntun++;
(f)     } else {
(g)       return true;
(h)     }
```

## Latihan

1. `AI: boleh` **Rancangan dulu.** Tulis dokumen rancangan satu halaman untuk perangkat pemantau pilihanmu (misalnya suhu ruang penyimpanan atau cahaya kelas) dengan enam bagian seperti tabel di atas (keluaran minggu ini).
2. `AI: tanpa AI` **Terukur atau tidak.** Dari empat kalimat pada "Prediksi dulu", tulis ulang yang tidak dapat diuji menjadi kalimat yang dapat diuji.
3. `AI: tanpa AI` **Telusuri.** Berapa hasil `perluAlarm` pada 35, 35, 35 dengan batas 30 dan minimal 3? Pada 31, 29, 31, 29, 31?
4. `AI: boleh` **Tambah uji.** Tulis satu data uji baru dan hasil yang kamu harapkan yang menguji kasus ujung yang belum tercakup oleh empat data di contoh, lalu jalankan.
5. *Opsional:* **catatan pemakaian AI.** Bila memakai AI generatif, kerjakan nomor 1 sendiri dulu, lalu minta kritik atau petunjuk bertahap, bukan dokumen jadi. Catat alatnya, tujuanmu, garis besar perintahmu, bagian yang kamu pakai, dan cara memeriksanya. Jangan menaruh data pribadi atau tugas bernilai pada perintah.

## Latihan bercampur

1. Aturan pemeriksa baris data dari `c-x2-m12` ("suhu antara 15 dan 45") dijadikan kebutuhan. Tulis sebagai kalimat terukur dan sebutkan dua data uji, termasuk satu nilai tepat di batas.
2. Kebutuhan (c) meminta pembacaan tiap 10 detik. Mengapa `millis()` (`c-x2-m7`) cocok untuk itu, sedangkan `delay(10000)` bermasalah bila perangkat harus melakukan hal lain?

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `c-xi1-m2` (sekitar satu minggu lagi), `c-xi1-m4` (sekitar tiga minggu lagi), dan `c-xi1-m9` (sekitar delapan minggu lagi). Jawab sekarang lalu simpan.

1. Mengapa kriteria selesai harus bisa diuji, dan apa yang salah dengan "perangkat harus bekerja dengan baik"?
2. Sebut empat tahap proses rekayasa produk IoT secara berurutan.
3. Apa beda kebutuhan dan rancangan? Beri satu kalimat untuk masing-masing pada pemantau suhu.

## Kesalahan umum

- **Menulis kode sebelum kebutuhan jelas.** Kamu lalu menguji kode terhadap kebutuhan yang tidak pernah ditulis, sehingga "selesai" tidak punya arti.
- **Kebutuhan kabur.** "Cepat", "baik", dan "stabil" tidak dapat diuji; ganti dengan angka, satuan, dan kondisi.
- **Menguji hanya nilai biasa.** Nilai tepat di batas (30,0 pada contoh) dan urutan yang terputus adalah tempat galat bersembunyi.
- **Mengira papan tiruan lolos berarti perangkat lolos.** Papan tiruan memeriksa logika; sensor, kabel, dan ruangan nyata baru teruji di perangkat.
- **Menganggap empat tahap sekali jalan.** Hasil uji boleh dan sering menggerakkan perbaikan rancangan atau kebutuhan.

## Cek mandiri

- [ ] Saya dapat menyebut empat tahap proses rekayasa produk dan isi tiap tahap.
- [ ] Saya dapat menulis kebutuhan dengan angka, satuan, dan kondisi.
- [ ] Saya dapat menurunkan kriteria selesai dan daftar uji dari satu kebutuhan.
- [ ] Saya menyertakan kasus tepat di batas pada daftar ujiku.
- [ ] Saya menulis rancangan sebelum kode.

## Kunci dan petunjuk

**Ingat kembali.** 1: selama `delay()` berjalan papan hanya menunggu, jadi tombol dan sensor lain tidak dibaca; `millis()` memungkinkan beberapa pekerjaan bergantian. 2: supaya orang lain tahu apa yang dibuang dan mengapa, dan supaya kamu dapat menilai apakah aturannya terlalu ketat atau sensornya bermasalah. 3: median mengurutkan lalu mengambil nilai tengah, sehingga satu nilai ekstrem hanya menempati ujung urutan; rata-rata menjumlahkan semuanya, sehingga nilai ekstrem menarik hasilnya.

**Prediksi dulu.** 1: hanya (b) dan (c) yang dapat diuji (ada angka dan kondisi); (a) dan (d) tidak punya ukuran. 2: urutan pertama true (31, 32, 33 berturut-turut), urutan kedua false (hitungan terputus oleh 29). 3: kalimat (b) berkata "di atas" 30, dan 30,0 tidak lebih besar dari 30,0.

**Contoh setengah jadi.** Isian berurutan: `>`, `0`, `2`. Fungsi lengkapnya dikompilasi dan dijalankan penulis tanpa peringatan.

**Soal Parsons.** Urutan benar: d, e, f, b, h, a, g, c. Pemeriksaan `beruntun >= minimalBerturut` berada setelah blok `if`/`else` agar hitungan sudah diperbarui; `return true` ada di dalamnya.

**Latihan.** 1: tidak ada kunci tunggal; dokumen yang baik punya enam bagian, kebutuhan terukur, dan kriteria yang dapat diuji. 2: contoh: (a) "Perangkat mencatat satu pembacaan tiap 10 detik tanpa hilang selama 10 menit"; (d) "Alarm berbunyi paling lambat 1 detik setelah pembacaan ketiga yang di atas batas". 3: pertama: true (35 tiga kali; hitungan 3 pada i = 2). Kedua: false (hitungan tidak pernah melewati 1). 4: contoh: 31, 31, 29, 31, 31, 31 (hitungan dipotong lalu naik lagi) mengharapkan true karena tiga terakhir berturut-turut; data lain yang menguji ujung diterima bila hasilnya sesuai penelusuranmu.

**Latihan bercampur.** 1: contoh: "Baris data diterima bila suhu terisi dan antara 15,0 dan 45,0 derajat Celsius." Data uji: 15,0 (diterima), 14,9 (ditolak), 45,0 (diterima), 45,1 (ditolak). 2: `millis()` hanya membandingkan waktu sehingga program dapat membaca hal lain di antaranya; `delay(10000)` menghentikan semuanya selama 10 detik.

**Ulang berjarak.** 1: kriteria yang tidak bisa diuji tidak dapat dinyatakan lulus atau gagal; "bekerja dengan baik" tidak punya ukuran. 2: kebutuhan, rancangan, implementasi, uji. 3: kebutuhan menyatakan apa yang harus dicapai ("alarm berbunyi bila suhu di atas 30 derajat pada 3 pembacaan berturut-turut"); rancangan menyatakan bagaimana ("sensor dibaca tiap 10 detik, hitung pembacaan berturut-turut, buzzer lewat satu pin keluaran").

## Langkah berikutnya

Modul berikut: `c-xi1-m2` (kualitas kode dan pengujian), yang menjadikan daftar uji sebagai berkas kasus uji. Modul terkait: `pendamping-merancang-kebutuhan-sistem` untuk menulis kebutuhan sistem. Pembacaan lanjut: *Panduan Mata Pelajaran Informatika, Fase D – F* untuk kerangka capaian fase F.
