## Untuk siapa modul ini

Modul ini untuk murid kelas XI jalur C (IoT dan robotika), minggu `C-XI1-M9` silabus v1.3: struktur data penyangga melingkar. Prasyarat: modul `c-xi1-m8` (efisiensi memori dan waktu) dan `c-x2-m9` (tumpukan dan antrian sebagai penyangga). Kamu juga memakai `struct` dari `c-xi1-m3` dan rata-rata bergerak dari `c-x2-m4`.

Modul ini berstatus DRAF: karangan penyusun, belum ditinjau pemilik. Ia mendukung butir `F-BK-c` (struktur data yang lebih kompleks dan abstrak) dan tidak dihitung memenuhi butir capaian pembelajaran mana pun; pemetaan `F-BK-c` untuk jalur C bersifat parsial. Keluaran minggu ini: program penyangga. Latihan silabusnya: rata-rata bergerak dengan penyangga.

Minggu ini tidak bertanda (F): semua bagian pokok dikerjakan **tanpa papan**, dengan kertas dan program C++ biasa di komputer yang memakai pembacaan karangan. Bila kamu mencoba dengan papan, ikuti aturan keselamatan modul sebelumnya: daya USB saja dan cabut kabel sebelum mengubah rangkaian. Nomor pin pada contoh hanya contoh `[belum terverifikasi]` untuk papanmu.

## Ingat kembali

Jawab dari ingatan dulu, baru cek di kunci. Soal 1 dari `c-xi1-m1`, soal 2 dari `c-xi1-m6`, soal 3 dari `c-xi1-m8`.

1. Apa beda kebutuhan dan rancangan? Beri satu kalimat untuk masing-masing pada pemantau suhu.
2. Bila sensor suhu gagal dibaca, apakah pemanas sebaiknya tetap menyala atau dimatikan, dan mengapa?
3. Pada jendela 64, berapa penulisan elemen per sisipan untuk cara geser dan untuk cara melingkar?

## Tujuan

Setelah modul ini kamu dapat:

- menjelaskan penyangga melingkar: larik berkapasitas tetap dengan penunjuk `kepala` dan jumlah `terisi` yang memakai ulang tempat elemen tertua;
- menulis `tambah` dengan indeks `%` sehingga tidak pernah menulis di luar larik, termasuk saat penuh;
- menjaga jumlah berjalan agar rata-rata bergerak tidak perlu menjumlah ulang seluruh isi;
- menguji penyangga pada keadaan kosong, tepat penuh, dan setelah berputar;
- menulis program penyangga (keluaran minggu ini).

## Prediksi dulu

Penyangga berkapasitas 4 yang awalnya kosong menerima 10, 20, 30, 40, 50, 60 berurutan. Bila penuh, nilai baru **menimpa yang tertua**. **Tebak dulu, tulis jawabanmu, baru telusuri.**

1. Setelah 60 masuk, nilai apa saja yang tersimpan, dari yang tertua ke yang terbaru?
2. Berapa rata-rata setelah 40 masuk, dan berapa setelah 60 masuk?
3. Setelah 60 masuk, di indeks larik berapa letak nilai tertua (itu `kepala`)?

## Contoh terselesaikan

Pada `c-x2-m9` antrian menolak data saat penuh. Untuk aliran sensor yang tak pernah berhenti sering lebih berguna membuang yang **tertua**, karena yang terbaru paling mewakili keadaan sekarang. Dengan larik biasa itu berarti menggeser semuanya (`c-xi1-m8`). **Penyangga melingkar** menghindarinya: larik dianggap melingkar, dan dua angka menandai isinya. `kepala` adalah indeks elemen tertua; `terisi` adalah jumlah elemen sah. Elemen ke-`i` dari yang tertua ada di `(kepala + i) % KAPASITAS`; sisa pembagian membuat indeks kembali ke 0 setelah melewati ujung. Bila belum penuh, nilai baru ditaruh di `(kepala + terisi) % KAPASITAS`. Bila penuh, nilai baru menimpa `data[kepala]`, lalu `kepala` maju satu tempat: yang tadinya tertua kini tertimpa, dan elemen berikutnya menjadi tertua.

Rata-rata bergerak memerlukan jumlah isi. Menjumlah ulang semua elemen tiap kali berarti pekerjaan sebanding dengan kapasitas. Cukup menjaga `jumlah`: tambahkan nilai yang masuk dan kurangi nilai yang tertimpa. Maka rata-rata menjadi satu pembagian. Pembagian oleh `terisi` hanya aman bila `terisi` bukan 0, jadi `rataRata` mengembalikan `false` untuk penyangga kosong, seperti penjagaan pada `c-x2-m4`.

```cpp
// C++17 biasa, jalan di komputer. Diperiksa oleh check:module-code.
#include <iomanip>
#include <iostream>

const int KAPASITAS = 4;

struct Penyangga {
  int data[KAPASITAS];
  int kepala;   // indeks elemen tertua
  int terisi;   // jumlah elemen yang sah
  long jumlah;  // jumlah semua elemen sah, dijaga agar rata-rata tidak perlu menjumlah ulang
};

void tambah(Penyangga& b, int nilai) {
  if (b.terisi == KAPASITAS) {
    b.jumlah -= b.data[b.kepala];
    b.data[b.kepala] = nilai;
    b.kepala = (b.kepala + 1) % KAPASITAS;
  } else {
    b.data[(b.kepala + b.terisi) % KAPASITAS] = nilai;
    b.terisi++;
  }
  b.jumlah += nilai;
}

bool rataRata(const Penyangga& b, float& hasil) {
  if (b.terisi == 0) {
    return false;
  }
  hasil = static_cast<float>(b.jumlah) / b.terisi;
  return true;
}

void cetak(const Penyangga& b) {
  std::cout << "[";
  for (int i = 0; i < b.terisi; i++) {
    std::cout << (i > 0 ? " " : "") << b.data[(b.kepala + i) % KAPASITAS];
  }
  std::cout << "]  kepala=" << b.kepala << " terisi=" << b.terisi;
  float r = 0.0f;
  if (rataRata(b, r)) {
    std::cout << "  rata-rata=" << r;
  } else {
    std::cout << "  rata-rata=-";
  }
  std::cout << "\n";
}

int main() {
  std::cout << std::fixed << std::setprecision(2);
  Penyangga b = {};
  cetak(b);
  const int MASUK[] = {10, 20, 30, 40, 50, 60};
  for (int nilai : MASUK) {
    tambah(b, nilai);
    std::cout << "tambah " << std::setw(2) << nilai << ": ";
    cetak(b);
  }
}
```

Keluarannya:

```text
[]  kepala=0 terisi=0  rata-rata=-
tambah 10: [10]  kepala=0 terisi=1  rata-rata=10.00
tambah 20: [10 20]  kepala=0 terisi=2  rata-rata=15.00
tambah 30: [10 20 30]  kepala=0 terisi=3  rata-rata=20.00
tambah 40: [10 20 30 40]  kepala=0 terisi=4  rata-rata=25.00
tambah 50: [20 30 40 50]  kepala=1 terisi=4  rata-rata=35.00
tambah 60: [30 40 50 60]  kepala=2 terisi=4  rata-rata=45.00
```

Telusuri dua langkah terakhir pada larik aslinya. Sesudah 40 masuk, larik berisi `{10, 20, 30, 40}` dan `kepala` 0. Nilai 50 menimpa `data[0]`, sehingga larik menjadi `{50, 20, 30, 40}`, `jumlah` turun 10 dan naik 50 menjadi 140, dan `kepala` maju ke 1: yang tertua kini 20. Nilai 60 menimpa `data[1]`, larik menjadi `{50, 60, 30, 40}`, `jumlah` 180, `kepala` 2. Urutan logis dari yang tertua, `data[2]`, `data[3]`, `data[0]`, `data[1]`, adalah 30, 40, 50, 60; urutan di memori berbeda dari urutan logis, dan itu wajar. Rata-rata akhir 180 / 4 = 45. Tidak ada elemen yang digeser.

Pada papan, logikanya sama; hanya pembacaannya datang dari sensor secara berkala. Sketsa di bawah menyimpan 8 pembacaan analog terakhir dan mencetak rata-ratanya tiap 100 ms. Ia hanya diperiksa sintaksnya terhadap header tiruan, tidak dijalankan pada papan.

```arduino
// Arduino-C++ untuk ESP32. Diperiksa check:module-code terhadap header tiruan (sintaks dan tipe saja, bukan bukti perilaku papan).
const int PIN_SENSOR = 34;               // contoh; periksa papanmu
const int KAPASITAS = 8;
const unsigned long SELANG_MS = 100;

struct Penyangga {
  int data[KAPASITAS];
  int kepala;
  int terisi;
  long jumlah;
};

Penyangga penyangga = {};
unsigned long mulai = 0;

void tambah(Penyangga& b, int nilai) {
  if (b.terisi == KAPASITAS) {
    b.jumlah -= b.data[b.kepala];
    b.data[b.kepala] = nilai;
    b.kepala = (b.kepala + 1) % KAPASITAS;
  } else {
    b.data[(b.kepala + b.terisi) % KAPASITAS] = nilai;
    b.terisi++;
  }
  b.jumlah += nilai;
}

void setup() {
  Serial.begin(115200);
  mulai = millis();
}

void loop() {
  if (millis() - mulai >= SELANG_MS) {
    mulai += SELANG_MS;
    tambah(penyangga, analogRead(PIN_SENSOR));
    Serial.println(penyangga.jumlah / penyangga.terisi);
  }
}
```

## Contoh setengah jadi

Lengkapi `tambah` untuk penyangga berkapasitas 3 yang menimpa yang tertua saat penuh. Bagian `____` ada pada dua tempat.

```cpp setengah-jadi
// C++17. Lengkapi bagian ____.
const int KAPASITAS = 3;

struct Penyangga {
  int data[KAPASITAS];
  int kepala;
  int terisi;
};

void tambah(Penyangga& b, int nilai) {
  if (b.terisi == KAPASITAS) {
    b.data[b.kepala] = nilai;
    b.kepala = (b.kepala + 1) % ____;
  } else {
    b.data[(b.kepala + ____) % KAPASITAS] = nilai;
    b.terisi++;
  }
}
```

## Soal Parsons

Susun baris-baris di bawah (sudah diacak) menjadi `terbaru`, yang mengembalikan nilai terbaru dan `false` bila kosong.

```text
(a)   nilai = b.data[(b.kepala + b.terisi - 1) % KAPASITAS];
(b) bool terbaru(const Penyangga& b, int& nilai) {
(c)   return true;
(d)   if (b.terisi == 0) {
(e)     return false;
(f)   }
(g) }
```

## Latihan

1. `AI: boleh` **Pseudocode dulu.** Tulis pseudocode lalu fungsi `terbaru` (seperti pada Soal Parsons) dan fungsi `tertua` untuk `Penyangga` kapasitas 3. Uji pada urutan 7, 1, 9, 4, 8.
2. `AI: tanpa AI` **Telusuri.** Kapasitas 3, urutan masuk 7, 1, 9, 4, 8. Tulis isi larik di memori, `kepala`, `terisi`, urutan logis dari tertua, dan rata-rata setelah 8 masuk.
3. `AI: tanpa AI` **Cari galat.** Seorang murid lupa baris `b.jumlah -= b.data[b.kepala];`. Setelah enam nilai pada contoh (10 sampai 60), rata-rata apa yang ia laporkan, dan apa yang benar?
4. `AI: boleh` **Bila papan tersedia (opsional).** Pasang satu sensor sesuai lembar guru dan jalankan sketsa di atas. Tutup dan buka sensor dan amati rata-ratanya berubah perlahan. Tanpa papan, kerjakan nomor 1 sampai 3. Jangan mengubah rangkaian saat daya menyala.
5. *Opsional:* **catatan pemakaian AI.** Bila memakai AI generatif, jawab nomor 2 sendiri dulu, lalu minta petunjuk bertahap atau kritik atas fungsimu, bukan fungsi jadi. Catat alatnya, tujuanmu, garis besar perintahmu, bagian yang kamu pakai, dan cara memeriksanya. Jangan menaruh data pribadi atau tugas bernilai pada perintah.

## Latihan bercampur

1. Tulis lima kasus uji tepi (`c-xi1-m2`) untuk penyangga: kosong, satu elemen, tepat penuh, satu sisipan setelah penuh, dan lebih dari satu putaran penuh.
2. Penyangga 8 elemen `int16_t` dengan `kepala`, `terisi`, dan `jumlah` bertipe `int32_t` memakai berapa byte (`c-xi1-m8`)? Mengapa menyimpan `jumlah` menghemat waktu tetapi menambah memori?

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `c-xi1-m10` (sekitar satu minggu lagi), `c-xi1-m12` (sekitar tiga minggu lagi), dan `c-xi2-m3` (sekitar delapan minggu lagi). Jawab sekarang lalu simpan.

1. Bila penyangga penuh dan data baru datang, apa yang dilakukan penyangga melingkar pada modul ini, dan apa harganya?
2. Sebut tiga kasus uji tepi untuk penyangga melingkar.
3. Mengapa penyangga melingkar cocok menampung pembacaan bila pengiriman ke server sesekali gagal, dan apa yang hilang bila penuh?

## Kesalahan umum

- **Lupa memajukan `kepala` saat menimpa.** Nilai tertua tertimpa terus di tempat yang sama dan urutan menjadi salah.
- **Menggunakan `data[i]` sebagai urutan logis.** Urutan di memori tidak sama dengan urutan dari yang tertua; pakai `(kepala + i) % KAPASITAS`.
- **Lupa mengurangi nilai yang tertimpa dari `jumlah`.** Rata-rata menyimpang makin jauh.
- **Membagi dengan `terisi` saat 0.** Penyangga kosong tidak punya rata-rata; kembalikan "tidak ada", bukan 0.
- **Tidak memberi nilai awal.** `Penyangga b;` tanpa `= {}` membiarkan `kepala` dan `terisi` berisi sampah, dan indeks bisa jatuh di luar larik.

## Cek mandiri

- [ ] Saya dapat menjelaskan peran `kepala`, `terisi`, dan `%` pada penyangga melingkar.
- [ ] Saya dapat menelusuri `tambah` pada larik di memori dan menyebut urutan logisnya.
- [ ] Saya menjaga `jumlah` dan melindungi pembagian dari `terisi` sama dengan 0.
- [ ] Saya menguji keadaan kosong, tepat penuh, dan berputar.
- [ ] Saya dapat menyebut harga penyangga melingkar dibanding larik yang digeser.

## Kunci dan petunjuk

**Ingat kembali.** 1: kebutuhan menyatakan apa yang harus dicapai, contohnya "alarm berbunyi bila suhu di atas 30 derajat pada 3 pembacaan berturut-turut"; rancangan menyatakan bagaimana, contohnya "sensor dibaca tiap 10 detik, hitung pembacaan berturut-turut, buzzer lewat satu pin keluaran". 2: dimatikan, karena pembacaan yang gagal berarti tidak ada informasi dan pemanas menyala tanpa pengawasan berisiko. 3: 64 penulisan (63 geser + 1 tulis) untuk cara geser dan 1 untuk cara melingkar.

**Prediksi dulu.** 1: 30, 40, 50, 60 (10 dan 20 tertimpa). 2: setelah 40 masuk, (10 + 20 + 30 + 40) / 4 = 25; setelah 60 masuk, (30 + 40 + 50 + 60) / 4 = 45. 3: di indeks 2, karena `data` berisi `{50, 60, 30, 40}`.

**Contoh setengah jadi.** Isian berurutan: `KAPASITAS` lalu `b.terisi`. Fungsi lengkapnya dikompilasi dan dijalankan penulis tanpa peringatan.

**Soal Parsons.** Urutan benar: b, d, e, f, a, c, g.

**Latihan.** 1: pseudocode: `terbaru`: bila `terisi` 0 kembalikan gagal; bila tidak, ambil `data[(kepala + terisi - 1) % KAPASITAS]`. `tertua`: bila `terisi` 0 kembalikan gagal; bila tidak, ambil `data[kepala]`. Pada urutan 7, 1, 9, 4, 8 hasil penulis: terbaru 8, tertua 9. 2: larik di memori `{4, 8, 9}`, `kepala` 2, `terisi` 3, urutan logis 9, 4, 8, rata-rata (9 + 4 + 8) / 3 = 7. Langkahnya: setelah 7, 1, 9 larik `{7, 1, 9}`; 4 menimpa indeks 0 (`{4, 1, 9}`, `kepala` 1); 8 menimpa indeks 1 (`{4, 8, 9}`, `kepala` 2). 3: `jumlah` tidak pernah dikurangi sehingga 10 + 20 + 30 + 40 + 50 + 60 = 210, dan rata-rata yang dilaporkan 210 / 4 = 52,5; yang benar 45. 4: tidak ada kunci tunggal; jawaban yang baik menyebut bahwa rata-rata berubah bertahap karena delapan pembacaan harus berganti.

**Latihan bercampur.** 1: contoh: kosong (`terisi` 0, rata-rata tidak ada); satu elemen (rata-rata sama dengan nilainya); tepat penuh (`kepala` masih 0); satu sisipan setelah penuh (yang tertua hilang, `kepala` 1); sembilan sisipan pada kapasitas 4 (isi urut 6, 7, 8, 9, `kepala` 1). 2: 8 x 2 = 16 byte untuk data ditambah 3 x 4 = 12 byte untuk tiga bilangan `int32_t`, total 28 byte. `jumlah` menghemat waktu karena rata-rata tidak perlu menjumlah ulang delapan elemen, tetapi menambah 4 byte dan harus dijaga tetap sinkron dengan isi.

**Ulang berjarak.** 1: ia menimpa elemen tertua dan memajukan `kepala`; harganya kehilangan data tertua, padahal mungkin belum diproses. 2: contoh: kosong; tepat penuh; satu sisipan setelah penuh; lebih dari satu putaran penuh. 3: ia menampung pembacaan baru sementara pengiriman tertunda sehingga tak langsung hilang; bila penuh, yang tertua tertimpa (hilang) sehingga server tak pernah menerimanya.

## Langkah berikutnya

Modul berikut: `c-xi1-m10` (pengiriman data antarperangkat I), yang memakai penyangga serupa untuk menampung karakter yang datang dari papan lain. Modul terkait: `c-x2-m9` (antrian), `c-xi1-m8` (biaya geser melawan melingkar), dan `matkom-pertumbuhan-fungsi`. Pembacaan lanjut: rujukan operator `%` Arduino.
