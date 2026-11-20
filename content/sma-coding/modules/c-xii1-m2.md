## Untuk siapa modul ini

Modul ini untuk murid kelas XII jalur C (IoT dan robotika), minggu `C-XII1-M2` silabus v1.4: arsitektur dan pemilihan komponen. Prasyarat: modul `c-xii1-m1` (merancang kebutuhan sistem); kebutuhan K1 sampai K5 dari modul itu menjadi masukan di sini. Kamu juga memakai struktur data bentukan dari `c-xi1-m3`.

Modul ini karangan penyusun dan disetujui pemilik program pada 2026-11-20 (keputusan lewat dialog; catatan tinjauan menjadi tindak lanjut revisi). Ia mendukung butir `F-BK-a` (alur proses pengembangan program atau produk digital) dan `F-LD-d` (merancang kebutuhan sistem komputer sesuai kebutuhan pengguna), dan tidak dihitung memenuhi butir capaian pembelajaran mana pun. Keluaran minggu ini: tabel pemilihan komponen. Latihan silabusnya: bandingkan dua susunan komponen.

Seluruh modul ini dikerjakan **tanpa papan**, dengan kertas dan program C++ di komputer. Tidak ada perangkat fisik; aturan keselamatan perangkat dari modul sebelumnya tetap berlaku bila kamu menyentuh papan. Semua angka komponen pada contoh adalah **karangan** untuk latihan, bukan data produk nyata; di proyekmu ambil angka dari lembar data dan pengukuranmu sendiri, dan tulis "belum diketahui" bila tidak ada.

## Ingat kembali

Jawab dari ingatan dulu, baru cek di kunci. Soal 1 dari `c-xii1-m1`, soal 2 dari `C-XI2-M13`, soal 3 dari `C-XI2-M8`.

1. Mengapa kebutuhan "robot harus cepat" tidak dapat diuji, dan bagaimana menulis ulang agar dapat diuji?
2. Sebut dua alasan satu pembacaan tidak boleh langsung mengubah keputusan alat.
3. Mengapa 'papan tersambung ke Wi-Fi' belum berarti 'data sampai ke penerima'?

## Tujuan

Setelah modul ini kamu dapat:

- menggambar arsitektur sistem sebagai blok: sensor, pengendali, aktuator, dan daya;
- menurunkan syarat komponen dari kebutuhan, bukan dari komponen yang kebetulan ada;
- menghitung perkiraan waktu operasi dari arus rata-rata dan kapasitas baterai dengan bilangan bulat;
- memisahkan syarat wajib (mencoret) dari skor berbobot (meranking), dan membenarkan bobotnya;
- menyusun tabel pemilihan komponen (keluaran minggu ini).

## Prediksi dulu

Rumus perkiraan waktu operasi di program: `kapasitas * FAKTOR_PERSEN * 60 / (100 * arus)` dengan hasil dipotong ke menit bulat, dan `FAKTOR_PERSEN` bernilai 70 (asumsi: hanya sebagian kapasitas baterai terpakai). Susunan S berarus rata-rata total 500 mA dan berbaterai 800 mAh. **Tebak dulu, tulis jawabanmu, baru telusuri.**

1. Berapa menit perkiraan waktu operasi S?
2. Satu motor macet sehingga arus total naik menjadi 900 mA. Berapa menit sekarang?
3. Mengapa angka ini hanya perkiraan kasar?

## Contoh terselesaikan

Arsitektur menjawab "bagian apa saja yang ada dan bagaimana hubungannya", sebelum "komponen apa". Untuk robot pengantar kotak dari modul 1, bloknya:

```text
[sensor garis]  --\
[sensor jarak]  ---+--> [pengendali] --> [driver motor] --> [motor kiri, motor kanan]
[tombol berhenti]-/          ^                 ^
                             |                 |
                      [daya dari baterai AA/AAA yang disediakan guru]
```

Dari kebutuhan modul 1 diturunkan syarat. Pengguna fiktif kita memperbarui K3 menjadi waktu operasi paling sedikit 30 menit (perubahan dicatat), dan menambah dua syarat: kemampuan angkut paling sedikit 300 gram (kotak komponen) dan massa total paling banyak 800 gram (guru harus bisa mengangkatnya dengan satu tangan). Satu batasan tidak ditawar: daya hanya dari USB atau baterai AA/AAA yang disediakan guru; baterai litium tidak dipilih untuk proyek sekolah tanpa pelindung dan izin guru, dan murid tidak mengisi daya litium.

Tiga susunan karangan dibandingkan. Perhatikan bahwa waktu operasi dihitung dari **arus rata-rata** (bukan arus puncak) dan kapasitas, dengan perkalian lebih dulu sebelum pembagian agar bilangan bulat tidak kehilangan hasil.

| Susunan | Total arus (mA) | Baterai (mAh) | Angkut (g) | Massa (g) | Biaya (poin karangan) |
| --- | --- | --- | --- | --- | --- |
| P | 430 | 600 | 200 | 450 | 80 |
| Q | 730 | 1000 | 500 | 650 | 100 |
| R | 730 | 2400 | 500 | 780 | 150 |

Pemilihan dua tahap. Tahap pertama **syarat wajib**: komponen yang gagal dicoret, berapa pun skor lainnya. Tahap kedua **matriks keputusan** untuk yang lolos: tiap kriteria diberi nilai 1 sampai 5 (penilaian manusia, 5 terbaik) dan bobot, lalu dijumlah. Bobot ditulis lebih dulu, dari prioritas pengguna, bukan setelah tahu siapa pemenangnya.

```cpp
// C++17 biasa, jalan di komputer. Diperiksa oleh check:module-code.
// Semua angka KARANGAN untuk latihan; di proyekmu ambil dari lembar data komponen dan ukuran sendiri.
#include <iostream>

struct Komponen {
  const char *nama;
  int arusMa;  // arus rata-rata, bukan arus puncak
};

const int MAKS_KOMPONEN = 6;

struct Susunan {
  const char *nama;
  int jumlah;
  Komponen komponen[MAKS_KOMPONEN];
  int kapasitasMah;
  int angkutGram;
  int massaGram;
  int biayaPoin;
};

const int FAKTOR_PERSEN = 70;  // asumsi: hanya sebagian kapasitas baterai terpakai
const int BATAS_MENIT_MIN = 30;
const int ANGKUT_MIN_GRAM = 300;
const int MASSA_MAKS_GRAM = 800;

int totalArusMa(const Susunan &s) {
  int total = 0;
  for (int i = 0; i < s.jumlah; i++) {
    total += s.komponen[i].arusMa;
  }
  return total;
}

// Kalikan dulu, baru bagi: bilangan bulat.
int menitOperasi(const Susunan &s) {
  return s.kapasitasMah * FAKTOR_PERSEN * 60 / (100 * totalArusMa(s));
}

// Syarat wajib: tidak lolos berarti dicoret, berapa pun skor lainnya.
bool lolosSyarat(const Susunan &s, const char *&alasan) {
  if (menitOperasi(s) < BATAS_MENIT_MIN) {
    alasan = "waktu operasi kurang";
    return false;
  }
  if (s.angkutGram < ANGKUT_MIN_GRAM) {
    alasan = "kemampuan angkut kurang";
    return false;
  }
  if (s.massaGram > MASSA_MAKS_GRAM) {
    alasan = "terlalu berat";
    return false;
  }
  alasan = "";
  return true;
}

struct Nilai {
  int biaya;
  int waktu;
  int massa;
};  // skala 1 sampai 5, 5 terbaik; penilaian manusia

int skor(const Nilai &n, int bBiaya, int bWaktu, int bMassa) {
  return n.biaya * bBiaya + n.waktu * bWaktu + n.massa * bMassa;
}

int main() {
  const int JUMLAH = 3;
  const Susunan susunan[JUMLAH] = {
      {"P", 5, {{"pengendali", 80}, {"sensor garis", 25}, {"sensor jarak", 15}, {"driver", 10}, {"motor x2", 300}}, 600, 200, 450, 80},
      {"Q", 5, {{"pengendali", 80}, {"sensor garis", 25}, {"sensor jarak", 15}, {"driver", 10}, {"motor x2", 600}}, 1000, 500, 650, 100},
      {"R", 5, {{"pengendali", 80}, {"sensor garis", 25}, {"sensor jarak", 15}, {"driver", 10}, {"motor x2", 600}}, 2400, 500, 780, 150},
  };
  const Nilai nilai[JUMLAH] = {{4, 3, 5}, {4, 3, 4}, {2, 5, 3}};
  for (int i = 0; i < JUMLAH; i++) {
    const char *alasan = "";
    bool lolos = lolosSyarat(susunan[i], alasan);
    std::cout << "susunan " << susunan[i].nama << ": " << totalArusMa(susunan[i]) << " mA, "
              << menitOperasi(susunan[i]) << " menit, " << (lolos ? "lolos" : "dicoret: ") << alasan << "\n";
  }
  std::cout << "bobot (biaya,waktu,massa) = (3,2,1):";
  for (int i = 1; i < JUMLAH; i++) {
    std::cout << " " << susunan[i].nama << "=" << skor(nilai[i], 3, 2, 1);
  }
  std::cout << "\nbobot (biaya,waktu,massa) = (1,3,1):";
  for (int i = 1; i < JUMLAH; i++) {
    std::cout << " " << susunan[i].nama << "=" << skor(nilai[i], 1, 3, 1);
  }
  std::cout << "\n";
}
```

Keluarannya:

```text
susunan P: 430 mA, 58 menit, dicoret: kemampuan angkut kurang
susunan Q: 730 mA, 57 menit, lolos
susunan R: 730 mA, 138 menit, lolos
bobot (biaya,waktu,massa) = (3,2,1): Q=22 R=19
bobot (biaya,waktu,massa) = (1,3,1): Q=17 R=20
```

P dicoret karena hanya mampu mengangkut 200 gram. Q dan R lolos, dan pemenangnya **berbalik** ketika bobot berubah: bila biaya paling penting, Q menang; bila ketahanan operasi paling penting, R menang. Itu sebabnya bobot harus dibenarkan dari kebutuhan pengguna dan dicatat di tabel pemilihan. Dua keterbatasan: arus rata-rata menutupi lonjakan saat motor macet atau mulai berputar (angkanya dari lembar data `[belum terverifikasi]`), dan 70 persen hanyalah asumsi latihan.

## Contoh setengah jadi

Lengkapi `____` pada versi ringkas ini: waktu operasi memakai `FAKTOR_PERSEN` dan pembagi 100, dan setiap syarat wajib mencoret bila **tidak** terpenuhi.

```cpp setengah-jadi
// C++17. Lengkapi bagian ____.
int menitOperasi(const Susunan &s) {
  return s.kapasitasMah * ____ * 60 / (____ * totalArusMa(s));
}

bool lolosSyarat(const Susunan &s) {
  if (menitOperasi(s) ____ BATAS_MENIT_MIN) { return false; }
  if (s.angkutGram ____ ANGKUT_MIN_GRAM) { return false; }
  if (s.massaGram ____ MASSA_MAKS_GRAM) { return false; }
  return true;
}
```

## Soal Parsons

Susun baris-baris di bawah (sudah diacak) menjadi fungsi `totalArusMa`.

```text
(a)   total += s.komponen[i].arusMa;
(b) int totalArusMa(const Susunan &s) {
(c)   return total;
(d)   for (int i = 0; i < s.jumlah; i++) {
(e)   int total = 0;
(f)   }
(g) }
```

## Latihan

1. `AI: tanpa AI` **Hitung.** Susunan berarus total 520 mA dan berbaterai 1500 mAh, `FAKTOR_PERSEN` 70. Berapa menit perkiraan operasinya?
2. `AI: boleh` **Bandingkan dua susunan.** Pakai komponen yang tersedia di lab (nama dari lembar guru): gambar diagram blok, isi tabel pemilihan komponen (keluaran minggu ini), tulis syarat wajib dari kebutuhanmu, dan tulis bobotmu beserta alasannya. Angka yang tidak kamu ketahui ditulis "belum diketahui", bukan ditebak.
3. `AI: tanpa AI` **Bobot.** Dengan nilai Q = (biaya 4, waktu 3, massa 4) dan R = (2, 5, 3), cari satu set bobot bulat positif (biaya, waktu, massa) yang membuat skor Q dan R sama.
4. `AI: boleh` **Syarat baru.** Tambahkan syarat wajib "lebar robot paling besar 15 cm" ke program, dengan datanya, lalu pastikan satu susunan karangan menjadi dicoret karenanya. Telusuri dulu di kertas.
5. *Opsional:* **catatan pemakaian AI.** Bila memakai AI generatif, kerjakan nomor 2 sendiri dulu, lalu minta kritik atas alasan bobotmu, bukan tabel jadi. Catat alatnya, tujuanmu, garis besar perintahmu, bagian yang kamu pakai, dan cara memeriksanya. Jangan menaruh data pribadi pada perintah.

## Latihan bercampur

1. Pada arsitektur di atas, komponen mana yang menjalankan logika "berhenti bila sensor jarak gagal" dari K4 modul 1, dan komponen mana yang melaksanakannya (dari `c-xii1-m1`)?
2. Mengapa `Susunan` dan `Komponen` dibuat sebagai `struct`, bukan beberapa larik terpisah (dari `c-xi1-m3`)?

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `C-XII1-M3` (sekitar satu minggu lagi), `C-XII1-M5` (sekitar tiga minggu lagi), dan `C-XII1-M10` (sekitar delapan minggu lagi). Jawab sekarang lalu simpan.

1. Mengapa syarat wajib diperiksa lebih dulu daripada skor berbobot?
2. Mengapa perkiraan waktu operasi memakai arus rata-rata, dan apa yang membuatnya meleset pada motor yang macet?
3. Mengapa hitungan waktu operasi tidak memakai seluruh kapasitas baterai?

## Kesalahan umum

- **Memilih komponen sebelum kebutuhan.** Susunan yang kebetulan ada bisa gagal syarat sejak awal.
- **Memakai seluruh kapasitas baterai.** Kapasitas tertera tidak seluruhnya terpakai; faktor 70 persen di sini hanya asumsi latihan.
- **Membiarkan skor tinggi menutupi kegagalan syarat.** Komponen yang gagal syarat wajib dicoret.
- **Memilih bobot setelah tahu pemenangnya.** Bobot harus datang dari prioritas pengguna dan ditulis lebih dulu.
- **Menyalin angka contoh ke proyek.** Angka di modul ini karangan; ukur dan baca lembar data.

## Cek mandiri

- [ ] Saya dapat menggambar diagram blok sensor, pengendali, aktuator, dan daya.
- [ ] Saya menurunkan syarat komponen dari kebutuhan.
- [ ] Saya menghitung perkiraan waktu operasi dengan perkalian lebih dulu, lalu menyebut keterbatasannya.
- [ ] Saya memisahkan syarat wajib dari skor berbobot dan membenarkan bobotnya.
- [ ] Saya tidak memilih daya litium tanpa pelindung dan izin guru.

## Kunci dan petunjuk

**Ingat kembali.** 1: "cepat" tidak punya angka sehingga tidak ada hasil uji yang bisa gagal; tulis dengan angka, satuan, dan cara ukur. 2: contoh: satu pembacaan bisa derau atau galat sesaat; keputusan perlu dukungan lebih dari satu pembacaan atau nilai yang disaring supaya alat tidak berganti-ganti. 3: tersambung ke jaringan hanya berarti papan punya alamat; data masih bisa tidak sampai karena penerima mati, alamat atau topik salah, atau pesan hilang; harus dibuktikan di penerima.

**Prediksi dulu.** 1: 800 x 70 x 60 = 3.360.000; dibagi (100 x 500 = 50.000) menghasilkan 67,2; dipotong menjadi 67 menit. 2: 3.360.000 dibagi 90.000 menghasilkan 37,3; dipotong menjadi 37 menit. 3: arus tidak konstan (naik saat motor macet atau mulai berputar), kapasitas tertera tidak seluruhnya tersedia (70 persen hanya asumsi), dan hasilnya dipengaruhi suhu serta usia baterai `[belum terverifikasi]`.

**Contoh setengah jadi.** Isian berurutan: `FAKTOR_PERSEN`, `100`, `<`, `<`, `>`. Kunci yang dikompilasi dan dijalankan penulis tidak mengubah keluaran contoh terselesaikan.

**Soal Parsons.** Urutan benar: b, e, d, a, f, c, g. `total` dideklarasikan sebelum perulangan, penjumlahan ada di dalam perulangan, dan `return` setelah perulangan ditutup.

**Latihan.** 1: 1500 x 70 x 60 = 6.300.000; dibagi (100 x 520 = 52.000) menghasilkan 121,15; jawabannya 121 menit. 2: tidak ada kunci tunggal; jawaban yang baik menurunkan syarat dari kebutuhan, memisahkan syarat wajib dari skor, dan menjelaskan bobot. 3: selisih skor Q dikurangi R adalah 2b - 2w + m; seri bila 2b - 2w + m = 0. Contoh: (1, 2, 2) memberi Q = 4 + 6 + 8 = 18 dan R = 2 + 10 + 6 = 18. 4: tidak ada kunci tunggal; jawaban yang baik menaruh syarat baru di `lolosSyarat` dan menyertakan data uji yang membuktikannya.

**Latihan bercampur.** 1: pengendali (program di papan) yang memutuskan berhenti; driver motor yang melaksanakannya dengan memutus daya ke motor. 2: satu `struct` menjaga semua data satu susunan tetap sejajar; beberapa larik terpisah mudah bergeser urutannya dan sulit dirawat.

**Ulang berjarak.** 1: komponen yang gagal syarat tidak boleh dipilih apa pun skornya; skor hanya untuk meranking yang sudah layak. 2: arus rata-rata tidak menyertakan lonjakan; motor yang macet menarik arus jauh lebih besar sehingga baterai habis lebih cepat dari hitungan. 3: kapasitas tertera tidak seluruhnya tersedia pada beban nyata, sehingga hitungan memakai faktor (di sini 70 persen, asumsi latihan) agar perkiraan tidak terlalu optimistis.

## Langkah berikutnya

Modul berikut: `c-xii1-m3` (motor DC dan pengendali motor), yang memakai syarat komponen ini untuk menggerakkan roda secara aman. Bacaan pendamping: `pendamping-merancang-kebutuhan-sistem`.
