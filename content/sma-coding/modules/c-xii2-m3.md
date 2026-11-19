## Untuk siapa modul ini

Modul ini untuk murid kelas XII jalur C (IoT dan robotika), minggu `C-XII2-M3` silabus v1.4: memodelkan masalah lapangan. Prasyarat: modul `c-xii2-m2` (pemeliharaan program II). Kamu juga memakai kebutuhan terukur dari `c-xii1-m1`, histeresis dari `c-xi1-m5`, dan perbandingan strategi dari `c-xii1-m8` (belum terindeks saat modul ini ditulis).

Modul ini berstatus DRAF: karangan penyusun, belum ditinjau pemilik, dan tidak dihitung memenuhi butir capaian pembelajaran mana pun. Keluaran minggu ini: lembar pemodelan. Latihan silabusnya: tiga masalah fiktif.

Semua pekerjaan di komputer dan kertas; tidak perlu papan. Keselamatan perangkat: tidak ada perangkat yang dirakit minggu ini. Semua masalah dan data bersifat karangan: tanpa sekolah, orang, atau tempat nyata, dan tanpa merekam orang. Angka pada contoh (kelembapan, daya kipas) hanya karangan, bukan fisika ruangan nyata.

## Ingat kembali

Jawab dari ingatan dulu, baru cek di kunci. Soal 1 dari `c-xii2-m2`, soal 2 dari `c-xii1-m9`, soal 3 dari `c-xii1-m1`.

1. Mengapa kamu mengukur memori sebelum mengubah program?
2. Bila rata-rata dua strategi hampir sama tetapi nilai terburuknya berbeda, strategi mana yang kamu pilih untuk robot di lantai kelas, dan mengapa?
3. Apa beda kebutuhan yang dapat diuji dengan sekadar harapan? Beri contoh.

## Tujuan

Setelah modul ini kamu dapat:

- menerjemahkan masalah lapangan fiktif menjadi sistem: pengguna, masukan, keluaran, dan batas;
- menulis ukuran keberhasilan yang dapat gagal sebelum memilih komponen;
- menyatakan asumsi dan apa yang sengaja tidak dimodelkan;
- menguji model sederhana pada data karangan dan membaca hasilnya dengan jujur;
- menghasilkan lembar pemodelan (keluaran minggu ini).

## Prediksi dulu

Gudang alat olahraga fiktif cepat lembap, sehingga bola dan matras berjamur. Kelembapan diukur tiap 10 menit selama sehari (144 pembacaan); sensor berderau sekitar 2 poin persen. Tiga strategi untuk kipas: **mati**; **ambang tunggal** (nyala bila bacaan di atas 70,0 persen); **histeresis** (nyala bila 72,0 persen atau lebih, padam bila 65,0 persen atau kurang). Tujuan karangan: kelembapan di atas 75,0 persen paling banyak 10 persen waktu, dan kipas berganti nyala-padam paling banyak 10 kali sehari. **Tebak dulu, tulis jawabanmu, baru telusuri.**

1. Strategi mana yang paling sering mengganti kipas, dan mengapa derau sensor memengaruhinya?
2. Apakah rata-rata kelembapan saja cukup untuk memilih strategi? Mengapa?
3. Menurutmu, apakah ada strategi yang memenuhi kedua tujuan? Tulis tebakanmu.

## Contoh terselesaikan

**Memodelkan** adalah menyusun gambaran yang cukup sederhana untuk diuji tetapi cukup dekat untuk berguna. Panduan Mata Pelajaran Informatika menjelaskan abstraksi sebagai proses mengurangi detail dan merangkum persoalan menjadi hal-hal penting terkait tujuan; hasilnya disebut model, dan ia mewakili persoalan dari sudut pandang tertentu. Karena itu model selalu salah dalam hal yang tidak dimodelkan, dan tugasmu adalah menyatakan hal itu.

Langkah memodelkan masalah lapangan: (1) tulis masalah dan pengguna, (2) tulis tujuan yang dapat gagal, (3) tentukan masukan dan keluaran, (4) tulis asumsi dan yang tidak dimodelkan, (5) tentukan data dan privasi, (6) uji model, (7) baca hasil dan putuskan. Lembar pemodelan untuk gudang fiktif:

```text
Masalah dan pengguna: peralatan di gudang olahraga fiktif berjamur; pengguna: guru olahraga fiktif.
Tujuan (dapat gagal): T1 kelembapan > 75,0 % paling banyak 10 % waktu; T2 kipas berganti paling banyak 10 kali/hari.
Masukan: pembacaan kelembapan tiap 10 menit (berderau sekitar 2 poin).
Keluaran: kipas nyala atau padam. Tidak ada kamera atau mikrofon; tidak ada data orang.
Asumsi: kipas menurunkan 1,2 poin per langkah (karangan); kelembapan luar berubah mengikuti pola siang, malam, hujan.
Tidak dimodelkan: suhu, bocor atap, orang membuka pintu, listrik padam.
Uji: simulasi 24 jam dengan data karangan; ukur rata-rata, nilai terburuk, langkah buruk, jumlah pergantian.
Keputusan: setelah membaca hasil (di bawah).
```

Program berikut menjalankan simulasi itu untuk tiga strategi. Model dan angkanya karangan; ia membandingkan cara memutuskan, bukan meramalkan ruangan nyata.

```cpp
// C++17 biasa, jalan di komputer. Diperiksa oleh check:module-code.
// MODEL SEDERHANA KARANGAN untuk gudang alat olahraga fiktif. Bukan fisika ruangan nyata.
// Satuan: kelembapan dalam persepuluh persen (750 = 75,0 %). Satu langkah = 10 menit; 144 langkah = 24 jam.
#include <iomanip>
#include <iostream>

const int LANGKAH = 144;
const int BATAS_LEMBAP = 750;  // kriteria: kelembapan di atas 75,0 % dianggap buruk
const int KIPAS_TURUN = 12;    // kipas menurunkan 1,2 poin persen per langkah (angka karangan)

// Kelembapan luar karangan: siang 600, malam 800, hujan 950 pada langkah 60..83.
int luar(int t) {
  if (t >= 60 && t < 84) return 950;
  if (t >= 108 || t < 36) return 800;
  return 600;
}

// Derau sensor karangan: pembacaan = nilai sebenarnya + derau (persepuluh persen), berulang tiap 8 langkah.
const int DERAU[8] = {-15, 10, -5, 20, -20, 5, 15, -10};

enum Strategi { MATI, AMBANG_TUNGGAL, HISTERESIS };

struct Hasil {
  long jumlah;     // untuk rata-rata
  int maks;        // nilai terburuk
  int langkahBuruk;
  int pergantian;
  int kipasHidup;
};

Hasil simulasi(Strategi s) {
  Hasil h = {0, 0, 0, 0, 0};
  int lembap = 700;
  bool kipas = false;
  for (int t = 0; t < LANGKAH; t++) {
    int bacaan = lembap + DERAU[t % 8];
    bool baru = kipas;
    if (s == AMBANG_TUNGGAL) {
      baru = bacaan > 700;
    } else if (s == HISTERESIS) {
      if (bacaan >= 720) baru = true;
      if (bacaan <= 650) baru = false;
    } else {
      baru = false;
    }
    if (baru != kipas) h.pergantian++;
    kipas = baru;
    if (kipas) h.kipasHidup++;
    lembap = lembap + (luar(t) - lembap) / 8 - (kipas ? KIPAS_TURUN : 0);
    if (lembap < 0) lembap = 0;
    if (lembap > 1000) lembap = 1000;
    h.jumlah += lembap;
    if (lembap > h.maks) h.maks = lembap;
    if (lembap > BATAS_LEMBAP) h.langkahBuruk++;
  }
  return h;
}

void cetak(const char *nama, const Hasil &h) {
  std::cout << std::setw(15) << nama << std::setw(8) << h.jumlah / LANGKAH << std::setw(8) << h.maks << std::setw(9)
            << h.langkahBuruk << std::setw(11) << h.pergantian << std::setw(8) << h.kipasHidup << "\n";
}

int main() {
  std::cout << "strategi        rata2    maks   >75,0%  pergantian  kipas\n";
  cetak("mati", simulasi(MATI));
  cetak("ambang-tunggal", simulasi(AMBANG_TUNGGAL));
  cetak("histeresis", simulasi(HISTERESIS));
}
```

Keluaran program (dijalankan penulis dengan `g++ -std=c++17`):

```text
strategi        rata2    maks   >75,0%  pergantian  kipas
           mati     752     933       85          0       0
 ambang-tunggal     703     842       22         37      80
     histeresis     694     843       22          5      95
```

Bacalah dengan jujur, dalam persepuluh persen. Rata-rata ambang tunggal dan histeresis hampir sama (703 lawan 694) dan nilai terburuknya juga (842 lawan 843), tetapi pergantian kipas 37 lawan 5: hanya histeresis memenuhi T2, karena derau membuat ambang tunggal bolak-balik di sekitar 70,0 persen. Langkah buruk 22 dari 144 (sekitar 15 persen) berarti **tidak ada strategi yang memenuhi T1**; kelembapan buruk terutama terjadi saat hujan dan kipas tidak cukup kuat dalam model ini. Jangan diam-diam melonggarkan T1 supaya "lolos". Keputusan yang jujur: tujuan T1 perlu ditinjau, atau sistemnya perlu ditambah (kipas lebih kuat, penghisap embun), lalu model dijalankan lagi. Itu manfaat memodelkan: kegagalan ketahuan sebelum membeli komponen.

## Contoh setengah jadi

Lengkapi `____` pada keputusan histeresis: nyala bila 720 atau lebih, padam bila 650 atau kurang, dan di antaranya tetap seperti sekarang.

```cpp setengah-jadi
// C++17. Lengkapi bagian ____.
bool keputusanKipas(bool kipasSekarang, int bacaan) {
  bool baru = kipasSekarang;
  if (bacaan >= ____) { baru = true; }
  if (bacaan <= ____) { baru = false; }
  return ____;
}
```

## Soal Parsons

Susun baris-baris di bawah (sudah diacak; baris `<= 650` tidak ditulis) menjadi isi satu langkah simulasi strategi histeresis.

```text
(a)     lembap = lembap + (luar(t) - lembap) / 8 - (kipas ? KIPAS_TURUN : 0);
(b)     int bacaan = lembap + DERAU[t % 8];
(c)     kipas = baru;
(d)     if (bacaan >= 720) baru = true;
(e)     bool baru = kipas;
```

## Latihan

1. `AI: tanpa AI` **Tiga masalah fiktif.** Untuk tiap masalah, isi lembar pemodelan ringkas (satu baris per bagian): (a) lampu selasar fiktif menyala sepanjang siang; (b) tanaman pot fiktif kering saat libur; (c) pintu laboratorium fiktif sering terbuka sehingga pendingin ruangan terbuang. Keluaran: tiga lembar.
2. `AI: boleh` **Ukuran yang dapat gagal.** Untuk satu masalah dari nomor 1, tulis dua tujuan dengan angka, satuan, dan cara ukur, lalu satu prediksi hasil sebelum menguji.
3. `AI: tanpa AI` **Kipas lebih kuat.** Ubah `KIPAS_TURUN` menjadi 20. Prediksi dulu: apakah langkah buruk histeresis turun di bawah 15 (10 persen dari 144), dan bagaimana pergantian kipas? Lalu jalankan.
4. `AI: boleh` **Tanpa derau.** Ubah semua `DERAU` menjadi 0. Prediksi pergantian kipas pada ambang tunggal, lalu jalankan. Apa yang dibuktikan hasilnya tentang peran histeresis?
5. *Opsional:* **catatan pemakaian AI.** Bila memakai AI generatif, kerjakan nomor 1 sendiri dulu, lalu minta kritik atas lembarmu, bukan lembar jadi. Catat alatnya, tujuanmu, garis besar perintahmu, bagian yang kamu pakai, dan cara memeriksanya. Jangan menaruh data pribadi pada perintah.

## Latihan bercampur

1. Dari `c-xii2-m2`: bila model harus dijalankan di papan bermemori kecil, bagian mana dari catatan optimasi yang kamu tulis, dan mengapa?
2. Dari `c-xii1-m9`: simulasi di atas dijalankan sekali. Mengapa satu kali belum cukup untuk memutuskan, dan apa yang dapat kamu ubah agar lebih meyakinkan?

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `C-XII2-M4` (sekitar satu minggu lagi), `C-XII2-M6` (sekitar tiga minggu lagi), dan `C-XII2-M11` (sekitar delapan minggu lagi). Jawab sekarang lalu simpan.

1. Sebut bagian-bagian lembar pemodelan.
2. Mengapa tujuan ditulis dapat gagal, dan apa yang kamu lakukan bila model menunjukkan tujuan tidak tercapai?
3. Apa peran histeresis bila sensor berderau?

## Kesalahan umum

- **Memilih komponen sebelum menulis tujuan.** Kamu tidak tahu apa yang harus dicapai.
- **Tujuan yang tidak dapat gagal.** "Gudang tidak terlalu lembap" tidak dapat diuji.
- **Melonggarkan tujuan supaya lolos.** Itu menyembunyikan temuan; tinjau tujuan secara terbuka.
- **Menganggap model sama dengan kenyataan.** Model hanya benar pada hal yang dimodelkan; tulis yang tidak dimodelkan.
- **Memilih hanya dari rata-rata.** Nilai terburuk dan jumlah pergantian dapat berbeda jauh.

## Cek mandiri

- [ ] Saya dapat menulis masalah, pengguna, masukan, dan keluaran sebuah sistem.
- [ ] Tujuan saya punya angka, satuan, dan cara ukur, dan dapat gagal.
- [ ] Saya menyatakan asumsi dan hal yang tidak dimodelkan.
- [ ] Saya membaca hasil uji model dengan jujur, termasuk saat tujuan tidak tercapai.
- [ ] Data dan masalah saya fiktif tanpa data pribadi.

## Kunci dan petunjuk

**Ingat kembali.** 1: tanpa ukuran kamu tidak tahu bagian mana yang bermasalah dan tidak bisa menunjukkan bahwa perubahan membantu. 2: pilih yang terburuknya lebih baik bila kegagalan berbahaya atau merepotkan (robot jatuh dari meja, keluar dari lantai); rata-rata menyembunyikan lari yang buruk. 3: kebutuhan memuat angka, satuan, dan cara ukur sehingga dapat gagal; contoh: "paling lama 40 detik untuk 2 m" lawan harapan "robot cepat".

**Prediksi dulu.** 1: ambang tunggal; derau 2 poin membuat bacaan melintasi 70,0 persen berulang kali sehingga kipas berganti terus. 2: tidak; rata-ratanya hampir sama tetapi pergantiannya jauh berbeda, jadi ukuran lain diperlukan. 3: tidak ada kunci tunggal; dari simulasi tidak ada yang memenuhi T1 (langkah buruk 22 dari 144 sekitar 15 persen), dan hanya histeresis memenuhi T2.

**Contoh setengah jadi.** Isian berurutan: `720`, `650`, `baru`. Kunci dikompilasi dan dijalankan penulis: nyala dari padam pada 725, tetap nyala pada 700, padam pada 650, tetap padam pada 700.

**Soal Parsons.** Urutan benar: b, e, d, c, a (b dan e boleh bertukar). Keputusan memakai bacaan dan keadaan kipas sekarang; kelembapan baru dihitung dengan keadaan kipas yang sudah diperbarui.

**Latihan.** 1: tidak ada kunci tunggal; lembar yang baik memuat tujuan dengan angka, masukan dan keluaran, asumsi, dan hal yang tidak dimodelkan, dan tanpa data orang. 2: contoh: "lampu selasar padam paling lambat 2 menit setelah cahaya cukup, dalam 20 dari 20 uji"; satuan menit, cara ukur pengatur waktu. 3: langkah buruk histeresis turun hanya dari 22 menjadi 20 (belum di bawah 15), dan pergantian naik dari 5 menjadi 12 (dijalankan penulis): kipas lebih kuat menurunkan kelembapan lebih cepat sehingga cepat melewati batas padam, jadi lebih sering berganti. 4: pergantian ambang tunggal menjadi 5, sama dengan histeresis; derau adalah penyebab ambang tunggal bolak-balik, dan histeresis menyerap derau itu.

**Latihan bercampur.** 1: ukuran sebelum dan sesudah, ongkos (misalnya batas rentang), dan keputusan, karena memori kecil membuat ongkos pemadatan nyata. 2: hasil dapat dipengaruhi kondisi awal atau kebetulan; ulangi dengan pola luar dan derau yang berbeda, dan laporkan nilai terburuk selain rata-rata.

**Ulang berjarak.** 1: masalah dan pengguna, tujuan yang dapat gagal, masukan dan keluaran, asumsi dan yang tidak dimodelkan, data dan privasi, uji, serta keputusan. 2: supaya hasil dapat dinilai jujur; bila model menunjukkan tujuan tidak tercapai, tinjau tujuan atau tambah sistemnya secara terbuka, lalu uji ulang. 3: ia memberi dua ambang berbeda sehingga derau kecil di sekitar satu ambang tidak membuat keluaran bolak-balik.

## Langkah berikutnya

Modul berikut: `C-XII2-M4` (ulasan keamanan dan privasi). Bacaan lanjut: istilah abstraksi pada Panduan Mata Pelajaran Informatika (lihat Rujukan).
