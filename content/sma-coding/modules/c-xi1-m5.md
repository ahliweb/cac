## Untuk siapa modul ini

Modul ini untuk murid kelas XI jalur C (IoT dan robotika), minggu `C-XI1-M5` silabus v1.3: alternatif solusi I, ambang dan histeresis. Prasyarat: modul `c-xi1-m4` (pustaka sendiri). Kamu juga memakai ambang yang diukur dari `c-x1-m11`, keputusan sensor jarak dari `c-x2-m11`, dan kasus uji dari `c-xi1-m2`.

Modul ini berstatus DRAF: karangan penyusun, belum ditinjau pemilik. Ia mendukung butir `F-BK-b` (lebih dari satu solusi, strategi algoritmik, justifikasi efisiensi), `F-AP-a` (konsep strategi algoritmik), dan `F-AP-b` (program terstruktur berdasarkan strategi algoritmik), dan tidak dihitung memenuhi butir capaian pembelajaran mana pun; pemetaan butir `F-BK-b` untuk jalur C bersifat parsial. Keluaran minggu ini: laporan perbandingan. Latihan silabusnya: lampu, ambang sederhana lawan histeresis.

Minggu ini tidak bertanda (F): semua bagian pokok dikerjakan **tanpa papan**, dengan kertas dan program C++ biasa di komputer yang membaca data karangan. Bila kamu mencoba dengan papan, ikuti aturan keselamatan modul sebelumnya (daya USB saja, cabut kabel sebelum mengubah rangkaian). Nomor pin dan angka cahaya pada contoh hanya contoh `[belum terverifikasi]` untuk rangkaianmu; ukur sendiri.

## Ingat kembali

Jawab dari ingatan dulu, baru cek di kunci. Soal 1 dari `c-x2-m11`, soal 2 dari `c-xi1-m4`, soal 3 dari `c-xi1-m2`.

1. Bila jarak berayun antara 19 dan 21 cm di sekitar batas 20 cm, apa yang terjadi pada alarm, dan mengapa itu mengganggu?
2. Apa beda bagian publik dan privat sebuah kelas, dan mengapa pin disimpan sebagai anggota privat?
3. Mengapa fungsi yang tidak menyentuh pin lebih mudah diuji di komputer?

## Tujuan

Setelah modul ini kamu dapat:

- menjelaskan mengapa satu ambang membuat keluaran berkedip saat masukan berderau di sekitar batas;
- menulis keputusan dengan histeresis: dua batas dan keadaan sebelumnya;
- membandingkan dua solusi atas data yang sama dengan ukuran yang jelas: jumlah pergantian, lambatnya tanggapan, dan kerumitan;
- menjustifikasi pilihan lebar pita histeresis dari pengukuran derau;
- menulis laporan perbandingan (keluaran minggu ini).

## Prediksi dulu

Lampu menyala bila cahaya gelap. Solusi A (ambang): nyala bila `cahaya < 2000`. Solusi B (histeresis): nyala bila `cahaya < 1900`, mati bila `cahaya > 2100`, dan di antaranya **tetap seperti sebelumnya**. Keduanya mulai dalam keadaan mati. Data karangan (cahaya mentah, berurutan): 2300, 2100, 2010, 1990, 2005, 1995, 2020, 1985, 1880, 1950, 2000, 2060, 2120, 2080, 2150, 2250. **Tebak dulu, tulis jawabanmu, baru telusuri.**

1. Berapa kali lampu berganti keadaan pada solusi A, dan pada solusi B?
2. Pada masukan 1985, apa keadaan lampu menurut A dan menurut B?
3. Pada masukan 2000, mengapa A dan B berbeda?

## Contoh terselesaikan

Sensor selalu berderau: pembacaan berayun beberapa angka walaupun cahayanya tetap. Dengan **satu ambang**, ayunan di sekitar batas membuat keputusan terus berganti, sehingga lampu berkedip atau relai berdetak cepat. **Histeresis** memakai dua batas: batas menyala dan batas mati yang berbeda. Di antara keduanya (pita) keputusan **tidak berubah**, sehingga ia harus mengingat keadaan sebelumnya. Itu sebabnya fungsi histeresis memakai parameter `sebelumnya`, sedangkan fungsi ambang tidak.

Keduanya adalah dua solusi untuk masalah yang sama, dan memilih di antaranya adalah pekerjaan insinyur: tidak ada yang selalu menang. Ambang sederhana, mudah dibaca, dan segera bereaksi, tetapi berkedip. Histeresis tenang, tetapi lebih rumit (butuh keadaan), dan **lebih lambat bereaksi**: lampu baru menyala setelah cahaya turun jauh di bawah batas lama, yaitu di bawah 1900, bukan 2000. Lebar pita adalah harga yang dibayar; memilihnya dari derau yang kamu ukur sendiri (rentang ayunan pembacaan pada cahaya tetap), bukan menebak.

Program berikut menjalankan kedua solusi pada data di atas dan menghitung pergantian. Kedua keputusan berupa fungsi yang tidak menyentuh pin, sehingga mudah diuji (`c-xi1-m2`).

```cpp
// C++17 biasa, jalan di komputer. Diperiksa oleh check:module-code.
#include <iomanip>
#include <iostream>

const int BATAS = 2000;
const int BATAS_NYALA = 1900;
const int BATAS_MATI = 2100;

bool lampuAmbang(int cahaya) { return cahaya < BATAS; }

bool lampuHisteresis(bool sebelumnya, int cahaya) {
  if (cahaya < BATAS_NYALA) {
    return true;
  }
  if (cahaya > BATAS_MATI) {
    return false;
  }
  return sebelumnya;
}

const int JUMLAH = 16;
const int CAHAYA[JUMLAH] = {2300, 2100, 2010, 1990, 2005, 1995, 2020, 1985,
                            1880, 1950, 2000, 2060, 2120, 2080, 2150, 2250};

int main() {
  bool ambang = false;
  bool histeresis = false;
  int gantiAmbang = 0;
  int gantiHisteresis = 0;
  std::cout << "cahaya  ambang  histeresis\n";
  for (int i = 0; i < JUMLAH; i++) {
    bool baruAmbang = lampuAmbang(CAHAYA[i]);
    bool baruHisteresis = lampuHisteresis(histeresis, CAHAYA[i]);
    if (baruAmbang != ambang) {
      gantiAmbang++;
    }
    if (baruHisteresis != histeresis) {
      gantiHisteresis++;
    }
    ambang = baruAmbang;
    histeresis = baruHisteresis;
    std::cout << std::setw(6) << CAHAYA[i] << "  " << std::setw(6) << (ambang ? "NYALA" : "mati")
              << "  " << std::setw(10) << (histeresis ? "NYALA" : "mati") << "\n";
  }
  std::cout << "pergantian: ambang " << gantiAmbang << ", histeresis " << gantiHisteresis << "\n";
}
```

Keluarannya:

```text
cahaya  ambang  histeresis
  2300    mati        mati
  2100    mati        mati
  2010    mati        mati
  1990   NYALA        mati
  2005    mati        mati
  1995   NYALA        mati
  2020    mati        mati
  1985   NYALA        mati
  1880   NYALA       NYALA
  1950   NYALA       NYALA
  2000    mati       NYALA
  2060    mati       NYALA
  2120    mati        mati
  2080    mati        mati
  2150    mati        mati
  2250    mati        mati
pergantian: ambang 6, histeresis 2
```

Pada data karangan ini ambang berganti 6 kali, histeresis hanya 2. Perhatikan harga histeresis di baris `1990`: ambang sudah menyala, histeresis belum. Laporan perbandingan memuat ukuran seperti ini, bukan sekadar "B lebih bagus". Contoh bentuknya:

| Ukuran | A (ambang) | B (histeresis) |
| --- | --- | --- |
| Pergantian pada data uji | 6 | 2 |
| Lambatnya menyala | segera di bawah 2000 | baru di bawah 1900 |
| Keadaan yang harus diingat | tidak ada | satu `bool` |
| Pilihan lebar pita | tidak ada | harus ditentukan dari derau |

Kesimpulannya hanya berlaku untuk data karangan ini. Sketsa Arduino di bawah memakai solusi B pada pin analog; ia hanya diperiksa sintaksnya terhadap header tiruan, bukan dijalankan pada papan.

```arduino
// Arduino-C++ untuk ESP32. Diperiksa check:module-code terhadap header tiruan (sintaks dan tipe saja, bukan bukti perilaku papan).
const int PIN_CAHAYA = 34;               // contoh; periksa papanmu
const int PIN_LAMPU = 2;                 // contoh; periksa papanmu
const int BATAS_NYALA = 1900;            // ukur sendiri; ini contoh
const int BATAS_MATI = 2100;
const unsigned long SELANG_MS = 100;

bool lampuNyala = false;
unsigned long mulai = 0;

bool lampuHisteresis(bool sebelumnya, int cahaya) {
  if (cahaya < BATAS_NYALA) {
    return true;
  }
  if (cahaya > BATAS_MATI) {
    return false;
  }
  return sebelumnya;
}

void setup() {
  pinMode(PIN_LAMPU, OUTPUT);
  mulai = millis();
}

void loop() {
  if (millis() - mulai >= SELANG_MS) {
    mulai += SELANG_MS;
    lampuNyala = lampuHisteresis(lampuNyala, analogRead(PIN_CAHAYA));
    digitalWrite(PIN_LAMPU, lampuNyala ? HIGH : LOW);
  }
}
```

## Contoh setengah jadi

Sekarang kipas: menyala bila suhu di atas 30,0 dan mati bila di bawah 28,0, dan di antaranya tetap. Lengkapi bagian `____`.

```cpp setengah-jadi
// C++17. Lengkapi bagian ____.
bool kipasHisteresis(bool sebelumnya, float suhu) {
  if (suhu ____ 30.0f) {
    return true;
  }
  if (suhu ____ 28.0f) {
    return false;
  }
  return ____;
}
```

## Soal Parsons

Susun baris-baris di bawah (sudah diacak) menjadi `lampuHisteresis`.

```text
(a)   return sebelumnya;
(b)   if (cahaya > BATAS_MATI) {
(c) bool lampuHisteresis(bool sebelumnya, int cahaya) {
(d)     return false;
(e)   }
(f)   if (cahaya < BATAS_NYALA) {
(g)     return true;
(h)   }
(i) }
```

## Latihan

1. `AI: boleh` **Pseudocode dulu.** Tulis pseudocode lalu uji `kipasHisteresis` (nyala di atas 30,0; mati di bawah 28,0) pada urutan 27,5; 29,5; 28,5; 29,5; 28,5; 30,5; 29,5; 27,9 (kipas mulai mati). Bandingkan dengan ambang tunggal "nyala bila suhu di atas 29,0": berapa kali kipas berganti keadaan pada tiap solusi (keluaran minggu ini: laporan perbandingan dengan tabel ukuran seperti di contoh)?
2. `AI: tanpa AI` **Telusuri.** Pada solusi B dengan data contoh, di baris mana lampu menyala pertama kali dan di baris mana mati?
3. `AI: tanpa AI` **Pita terbalik.** Apa yang terjadi bila `BATAS_NYALA` diisi 2100 dan `BATAS_MATI` diisi 1900?
4. `AI: boleh` **Pilih lebar pita.** Pada cahaya tetap, pembacaan berayun antara 1960 dan 2040. Usulkan `BATAS_NYALA` dan `BATAS_MATI` untuk batas keputusan 2000 dan jelaskan alasannya.
5. *Opsional:* **catatan pemakaian AI.** Bila memakai AI generatif, jawab nomor 1 sendiri dulu, lalu minta petunjuk bertahap atau kritik atas laporanmu, bukan laporan jadi. Catat alatnya, tujuanmu, garis besar perintahmu, bagian yang kamu pakai, dan cara memeriksanya. Jangan menaruh data pribadi atau tugas bernilai pada perintah.

## Latihan bercampur

1. Tulis lima kasus uji tepi (`c-xi1-m2`) untuk `lampuHisteresis`, termasuk nilai tepat 1900 dan 2100 dengan `sebelumnya` benar dan salah.
2. Sensor jarak (`c-xi1-m4`) dipakai untuk alarm parkir dengan batas 20 cm. Rancang batas menyala dan batas mati untuk alarm itu dan jelaskan apa yang dikorbankan.

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `c-xi1-m6` (sekitar satu minggu lagi), `c-xi1-m8` (sekitar tiga minggu lagi), dan `c-xi1-m13` (sekitar delapan minggu lagi). Jawab sekarang lalu simpan.

1. Mengapa histeresis memakai dua batas yang berbeda, bukan satu?
2. Apa harga yang dibayar dengan memperlebar pita histeresis?
3. Bila lampu berkedip di sekitar batas, bagaimana membedakan galat sensor dari galat keputusan?

## Kesalahan umum

- **Mengira berkedip berarti sensor rusak.** Derau di sekitar satu ambang sudah cukup membuat keputusan berganti.
- **Memperlebar pita tanpa mengukur derau.** Pita yang terlalu lebar membuat sistem lamban; yang terlalu sempit tidak menolong.
- **Lupa menyimpan keadaan sebelumnya.** Tanpa `sebelumnya`, histeresis menjadi ambang biasa.
- **Menyimpulkan "histeresis selalu lebih baik" dari satu data.** Perbandingan hanya berlaku untuk data dan ukuran yang dipakai; tetapkan ukurannya sebelum membandingkan.
- **Menganggap lolos uji di komputer berarti lampu di meja tenang.** Derau nyata bisa lebih besar atau lain dari data karangan.

## Cek mandiri

- [ ] Saya dapat menjelaskan mengapa satu ambang membuat keluaran berkedip.
- [ ] Saya dapat menulis fungsi histeresis dengan dua batas dan keadaan sebelumnya.
- [ ] Saya membandingkan dua solusi dengan ukuran yang ditetapkan lebih dulu.
- [ ] Saya memilih lebar pita dari derau yang diukur.
- [ ] Saya menyebut apa yang dikorbankan oleh histeresis.

## Kunci dan petunjuk

**Ingat kembali.** 1: alarm berganti hidup dan mati berulang karena pembacaan melewati batas bolak-balik; itu mengganggu dan bisa merusak aktuator yang sering berganti. 2: anggota publik dapat dipakai dari luar kelas; privat hanya dari dalam; pin dibuat privat supaya tak diubah dari luar secara tak sengaja. 3: karena fungsi itu hanya menerima angka dan mengembalikan hasil, tanpa bergantung pada papan, sensor, atau waktu.

**Prediksi dulu.** 1: A berganti 6 kali (menyala pada 1990, 1995, 1985, mati pada 2005, 2020, 2000); B berganti 2 kali (menyala pada 1880, mati pada 2120). 2: A menyala, B masih mati (1985 belum di bawah 1900). 3: pada 2000 A mati karena `2000 < 2000` salah; B berada di pita (1900 sampai 2100) sehingga tetap seperti sebelumnya, yaitu menyala.

**Contoh setengah jadi.** Isian berurutan: `>`, `<`, `sebelumnya`. Fungsi lengkapnya dikompilasi dan dijalankan penulis tanpa peringatan.

**Soal Parsons.** Urutan benar: c, f, g, h, b, d, e, a, i.

**Latihan.** 1: histeresis: 27,5 mati; 29,5 tetap mati (di dalam pita 28,0 sampai 30,0); 28,5 mati; 29,5 mati; 28,5 mati; 30,5 menyala (1); 29,5 tetap menyala; 27,9 mati (2); jadi 2 pergantian. Ambang tunggal 29,0: mati; menyala (1); mati (2); menyala (3); mati (4); menyala (5); tetap menyala; mati (6); jadi 6 pergantian. Laporanmu harus menyebut bahwa kesimpulan hanya berlaku untuk urutan karangan ini. 2: menyala pada baris `1880` (pertama di bawah 1900), mati pada baris `2120` (pertama di atas 2100). 3: `cahaya < 2100` selalu didahulukan sehingga pembacaan di bawah 2100 menyala dan di atas 2100 mati; pita lenyap dan perilakunya menjadi ambang tunggal 2100. 4: lebar pita harus lebih besar dari lebar derau 80 (2040 dikurangi 1960); contoh: nyala di bawah 1940 dan mati di atas 2060; jawaban lain diterima bila alasannya menyebut derau dan lambatnya tanggapan.

**Latihan bercampur.** 1: contoh: (`sebelumnya` salah, 1899) menyala; (salah, 1900) tetap mati; (benar, 2100) tetap menyala; (benar, 2101) mati; (benar, 2000) tetap menyala. 2: contoh: nyala di bawah 18 cm dan mati di atas 22 cm; yang dikorbankan: alarm baru berbunyi saat benda sudah lebih dekat dari 20 cm dan baru padam saat sudah lebih jauh dari 20 cm.

**Ulang berjarak.** 1: karena satu batas membuat keputusan berganti bolak-balik saat masukan berderau di sekitarnya; dua batas membuat keputusan hanya berganti setelah masukan melewati pita. 2: tanggapan lebih lambat (keputusan baru berganti setelah masukan menyeberangi pita lebih jauh). 3: lihat pembacaan mentahnya: bila pembacaan sendiri berayun di sekitar batas, itu derau sensor yang butuh penyaringan atau histeresis; bila pembacaan tenang tetapi keputusan berganti, kesalahan ada di logika keputusan.

## Langkah berikutnya

Modul berikut: `c-xi1-m6` (kendali hidup-mati), yang memakai histeresis untuk termostat mini. Modul terkait: `pendamping-model-jaringan-dan-troubleshooting` untuk gagasan menelusuri masalah secara bertahap. Pembacaan lanjut: dokumentasi `analogRead()` untuk resolusi pembacaan analog papanmu.

## Rujukan

- Arduino, rujukan bahasa: `analogRead()`. <https://docs.arduino.cc/language-reference/en/functions/analog-io/analogRead/>
- Arduino, rujukan bahasa: `digitalWrite()`. <https://docs.arduino.cc/language-reference/en/functions/digital-io/digitalwrite/>
