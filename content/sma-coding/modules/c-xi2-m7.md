## Untuk siapa modul ini

Modul ini untuk murid kelas XI jalur C (IoT dan robotika), minggu `C-XI2-M7` silabus v1.4: format data. Prasyarat: modul `c-xi2-m6` (publikasi-langganan, praktik); kamu juga memakai pesan antarperangkat dari `C-XI1-M11` (modul itu belum terindeks saat modul ini ditulis, jadi tidak ditulis sebagai prasyarat resmi).

Modul ini karangan penyusun dan disetujui pemilik program pada 2026-11-20 (keputusan lewat dialog; catatan tinjauan menjadi tindak lanjut revisi). Ia mendukung butir `F-BK-d` (model jaringan, pengiriman data, dan pemecahan masalah) dan tidak dihitung memenuhi butir capaian pembelajaran mana pun. Keluaran minggu ini: pesan JSON. Latihan silabusnya: mengubah pembacaan menjadi JSON.

Seluruh modul ini dapat dikerjakan **tanpa papan**: kamu menulis dan memeriksa teks JSON di komputer. Sketsa papan disertakan sebagai pembanding dan hanya diperiksa sintaksnya. Modul ini tidak memakai perangkat fisik; aturan keselamatan perangkat dari modul sebelumnya tetap berlaku bila kamu menyentuh papan. Semua nama sensor dan nilai karangan.

## Ingat kembali

Jawab dari ingatan dulu, baru cek di kunci. Soal 1 dari `c-xi1-m13`, soal 2 dari `C-XI2-M6`, soal 3 dari `C-XI2-M4`.

1. Apa kelebihan pesan berbentuk teks yang bisa dibaca manusia dibanding biner saat memecahkan masalah?
2. Mengapa isi pesan dari pustaka harus disalin dengan panjang yang diketahui sebelum dipakai sebagai teks?
3. Mengapa server harus memanggil `handleClient()` sesering mungkin, dan apa akibat `delay` panjang di `loop()`?

## Tujuan

Setelah modul ini kamu dapat:

- menyusun satu pembacaan sensor sebagai pesan JSON dengan kunci yang jelas;
- menulis nilai yang hilang sebagai `null`, bukan `nan` atau angka palsu;
- meloloskan tanda kutip dalam teks dan memeriksa bahwa penyangga cukup besar;
- membedakan JSON yang sah dari yang tidak, dan memeriksanya dengan alat;
- membandingkan ukuran JSON dengan format biner dan menyebut kelebihan serta harga masing-masing.

## Prediksi dulu

Fungsi `bentukJson` menyusun pesan berbentuk `{"sensor":"...","suhu":...,"detik":...}` dengan suhu satu desimal. Bila suhu tidak valid (`NaN`), nilainya ditulis `null`. Tanda kutip dalam nama sensor diloloskan dengan garis miring terbalik. **Tebak dulu, tulis jawabanmu, baru jalankan.** Pembacaan karangan: (`s01`, 27,5, 120 detik), (`s01`, tidak valid, 125 detik), dan (sensor bernama `lab "A"`, 26,04, 130 detik).

1. Tulis pesan untuk ketiga pembacaan itu.
2. Muatkah pesan pertama di penyangga 20 byte? Berapa karakter panjang pesan pertama?
3. Bila `NaN` dicetak dengan `%.1f` tanpa pemeriksaan, apa yang terjadi pada pesannya?

## Contoh terselesaikan

Penerima yang berbeda dari pengirim harus sepakat pada **format**. JSON adalah format teks untuk data: objek `{ ... }` berisi pasangan kunci dan nilai, kunci dan teks di dalam tanda kutip ganda, angka tanpa tanda kutip, dan `null` untuk "tidak ada". JSON tidak punya `NaN` atau `Infinity` (spesifikasi RFC 8259 menyatakannya tidak diizinkan), tidak boleh ada koma di akhir, dan tidak memakai tanda kutip tunggal. Teks bisa dibaca langsung di Serial Monitor atau halaman web, tanpa alat khusus.

Program berikut menyusun JSON dengan `snprintf`, yang menulis ke penyangga berukuran tetap dan mengembalikan panjang yang **seharusnya** ditulis; bila panjang itu tidak lebih kecil dari ukuran penyangga, pesan terpotong dan fungsi mengembalikan `false`. Ia juga membandingkan ukuran dengan format biner 8 byte.

```cpp
// C++17 biasa, jalan di komputer. Diperiksa oleh check:module-code.
#include <cmath>
#include <cstdint>
#include <cstdio>
#include <iostream>
#include <string>

struct Pembacaan {
  std::string sensor;
  double suhu;
  long detik;
};

std::string escapeJson(const std::string &s) {
  std::string hasil;
  for (char c : s) {
    if (c == '"') {
      hasil += "\\\"";
    } else if (c == '\\') {
      hasil += "\\\\";
    } else if (c == '\n') {
      hasil += "\\n";
    } else {
      hasil += c;
    }
  }
  return hasil;
}

// Mengisi `keluar`; false bila terpotong atau gagal.
bool bentukJson(const Pembacaan &p, char *keluar, size_t ukuran) {
  std::string sensor = escapeJson(p.sensor);
  int n;
  if (std::isnan(p.suhu)) {
    n = std::snprintf(keluar, ukuran, "{\"sensor\":\"%s\",\"suhu\":null,\"detik\":%ld}",
                      sensor.c_str(), p.detik);
  } else {
    n = std::snprintf(keluar, ukuran, "{\"sensor\":\"%s\",\"suhu\":%.1f,\"detik\":%ld}",
                      sensor.c_str(), p.suhu, p.detik);
  }
  return n > 0 && static_cast<size_t>(n) < ukuran;
}

struct PembacaanBiner {
  uint16_t sensor;
  int16_t suhuPerSepuluh;
  uint32_t detik;
};
static_assert(sizeof(PembacaanBiner) == 8, "tanpa padding");

int main() {
  const Pembacaan uji[] = {
      {"s01", 27.5, 120},
      {"s01", std::nan(""), 125},
      {"lab \"A\"", 26.04, 130},
  };
  char buf[64];
  for (const Pembacaan &p : uji) {
    if (bentukJson(p, buf, sizeof(buf))) {
      std::cout << buf << "\n";
    }
  }
  char kecil[20];
  std::cout << "penyangga 20: " << (bentukJson(uji[0], kecil, sizeof(kecil)) ? "muat" : "terpotong")
            << "\n";
  bentukJson(uji[0], buf, sizeof(buf));
  std::cout << "panjang JSON " << std::string(buf).size() << " byte, biner "
            << sizeof(PembacaanBiner) << " byte\n";
  std::snprintf(buf, sizeof(buf), "{\"suhu\":%.1f}", std::nan(""));
  std::cout << "tanpa pemeriksaan NaN: " << buf << "\n";
}
```

Keluarannya:

```text
{"sensor":"s01","suhu":27.5,"detik":120}
{"sensor":"s01","suhu":null,"detik":125}
{"sensor":"lab \"A\"","suhu":26.0,"detik":130}
penyangga 20: terpotong
panjang JSON 40 byte, biner 8 byte
tanpa pemeriksaan NaN: {"suhu":nan}
```

Beberapa hal patut dibaca. Pembacaan 26,04 ditulis `26.0`: format `%.1f` membulatkan, dan angka desimal di komputer memang hanya hampiran. Penyangga 20 byte terlalu kecil sehingga pesan dinyatakan terpotong, bukan dikirim setengah-setengah. Dan tanpa pemeriksaan `NaN`, hasilnya `{"suhu":nan}` yang bukan JSON sah. Sistem lain akan menolak seluruh pesan karena satu nilai.

Sketsa di bawah memakai bentuk yang sama pada papan. Ia hanya diperiksa sintaksnya terhadap header tiruan, tidak dijalankan pada papan; dukungan `%f` pada `snprintf` bergantung pada papan dan inti Arduino yang dipakai, jadi periksa dokumentasinya `[belum terverifikasi]`.

```arduino
// Arduino-C++ untuk ESP32. Diperiksa check:module-code terhadap header tiruan (sintaks dan tipe saja, bukan bukti perilaku papan).
#include <stdio.h>

const char* ID_SENSOR = "s01";
const unsigned long SELANG_MS = 2000;
unsigned long mulai = 0;

bool bentukJson(const char* sensor, float suhu, unsigned long detik, char* keluar, size_t ukuran) {
  int n;
  if (isnan(suhu)) {
    n = snprintf(keluar, ukuran, "{\"sensor\":\"%s\",\"suhu\":null,\"detik\":%lu}", sensor, detik);
  } else {
    n = snprintf(keluar, ukuran, "{\"sensor\":\"%s\",\"suhu\":%.1f,\"detik\":%lu}", sensor, suhu, detik);
  }
  return n > 0 && (size_t)n < ukuran;
}

void setup() {
  Serial.begin(115200);
  mulai = millis();
}

void loop() {
  if (millis() - mulai >= SELANG_MS) {
    mulai += SELANG_MS;
    char pesan[64];
    float suhu = 27.5;  // nilai contoh; ganti dengan pembacaan sensor
    if (bentukJson(ID_SENSOR, suhu, millis() / 1000, pesan, sizeof(pesan))) {
      Serial.println(pesan);
    } else {
      Serial.println("pesan terlalu panjang");
    }
  }
}
```

JSON lebih panjang daripada biner (40 byte lawan 8 byte pada contoh), tetapi dapat dibaca orang dan tidak bergantung pada urutan byte atau penjajaran bidang. Biner lebih ringkas, tetapi kamu butuh alat dan kesepakatan tepat tentang setiap byte untuk membacanya. Pilihannya soal harga: pada pembacaan yang jarang, keterbacaan biasanya lebih bernilai daripada beberapa puluh byte. Pemeriksaan bahwa pesan benar-benar JSON sah paling mudah dengan pustaka standar bahasa lain. Program Python berikut memeriksa pesan dari keluaran di atas, ditambah satu pesan rusak.

```python
# Python 3, jalan di komputer: memeriksa bahwa pesan benar-benar JSON yang sah.
import json

pesan = [
    '{"sensor":"s01","suhu":27.5,"detik":120}',
    '{"sensor":"s01","suhu":null,"detik":125}',
    '{"sensor":"lab \\"A\\"","suhu":26.0,"detik":130}',
    '{"suhu":nan}',
]
for teks in pesan:
    try:
        data = json.loads(teks)
        print("sah  :", data)
    except ValueError:
        print("tidak sah:", teks)
```

Keluarannya:

```text
sah  : {'sensor': 's01', 'suhu': 27.5, 'detik': 120}
sah  : {'sensor': 's01', 'suhu': None, 'detik': 125}
sah  : {'sensor': 'lab "A"', 'suhu': 26.0, 'detik': 130}
tidak sah: {"suhu":nan}
```

Pemeriksaan ini hanya menyatakan "bentuknya sah", bukan "nilainya benar" atau "pesannya aman". Nilai di dalamnya tetap perlu diperiksa rentangnya.

## Contoh setengah jadi

Sekarang pesan kelembapan. Lengkapi bagian `____`: satu desimal, dan pesan dinyatakan muat hanya bila panjangnya kurang dari ukuran penyangga.

```cpp setengah-jadi
// C++17. Lengkapi bagian ____.
#include <cstdio>

bool bentukJson(double lembap, char *keluar, size_t ukuran) {
  int n = snprintf(keluar, ukuran, "{\"lembap\":%.____f}", lembap);
  return n > 0 && static_cast<size_t>(n) ____ ukuran;
}
```

## Soal Parsons

Susun baris-baris di bawah (sudah diacak) menjadi `bentukJson` pada sketsa: nilai hilang ditulis `null`, nilai ada ditulis dengan satu desimal, lalu laporkan apakah muat.

```text
(a)   int n;
(b) bool bentukJson(const char* sensor, float suhu, unsigned long detik, char* keluar, size_t ukuran) {
(c)   if (isnan(suhu)) {
(d)     n = snprintf(keluar, ukuran, "{\"sensor\":\"%s\",\"suhu\":null,\"detik\":%lu}", sensor, detik);
(e)   } else {
(f)     n = snprintf(keluar, ukuran, "{\"sensor\":\"%s\",\"suhu\":%.1f,\"detik\":%lu}", sensor, suhu, detik);
(g)   }
(h)   return n > 0 && (size_t)n < ukuran;
(i) }
```

## Latihan

1. `AI: tanpa AI` **Tulis tangan.** Tulis pesan JSON untuk pembacaan (`s02`, 31,3, 200 detik) dan untuk pembacaan `s02` yang gagal dibaca pada detik 205. Berapa karakter panjang pesan yang pertama?
2. `AI: boleh` **Pseudocode dulu.** Tulis pseudocode lalu ubah program agar pesan memuat satu bidang bilangan bulat `lembap` (persen). Sebutkan tiga kasus uji, termasuk satu pesan yang harus dinyatakan terpotong (keluaran minggu ini: pesan JSON).
3. `AI: tanpa AI` **Cari galat.** Mengapa keempat teks ini bukan JSON sah: `{'suhu':27.5}`, `{"suhu":27.5,}`, `{"suhu":nan}`, dan `{suhu:27.5}`?
4. `AI: boleh` **Periksa dengan alat.** Salin pesan keluaran programmu ke program Python pemeriksa. Dengan papan, cetak pesan ke Serial Monitor tiap 2 detik dan periksa dengan cara yang sama. Jangan memuat data pribadi pada pesan.
5. *Opsional:* **catatan pemakaian AI.** Bila memakai AI generatif, jawab nomor 2 sendiri dulu, lalu minta petunjuk bertahap atau kritik atas kasus ujimu, bukan program jadi. Catat alatnya, tujuanmu, garis besar perintahmu, bagian yang kamu pakai, dan cara memeriksanya. Jangan menaruh sandi, kunci, atau data pribadi pada perintah.

## Latihan bercampur

1. Pemanggil balik di papan penerima menyalin pesan ke penyangga 16 byte, padahal pesan JSON sepanjang 40 byte. Apa yang terjadi pada pesan yang terpotong, dan apa dua cara yang benar menanganinya? (dari `C-XI2-M6`)
2. Pesan JSON 40 byte dikirim lewat HTTP POST dengan `Content-Type: application/json`. Berapa nilai `Content-Length`? (dari `C-XI2-M3`)

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `C-XI2-M8` (sekitar satu minggu lagi), `C-XI2-M10` (sekitar tiga minggu lagi), dan `C-XII1-M1` (sekitar delapan minggu lagi). Jawab sekarang lalu simpan.

1. Mengapa suhu yang gagal dibaca ditulis `null`, bukan `nan` atau 0?
2. Mengapa teks di dalam JSON harus meloloskan tanda kutip?
3. Apa kelebihan dan kekurangan JSON dibanding format biner untuk data sensor?

## Kesalahan umum

- **Mencetak `NaN` langsung ke JSON.** `nan` bukan JSON sah; tulis `null` atau jangan kirim bidangnya.
- **Mengganti nilai hilang dengan 0 atau angka palsu.** Penerima tak dapat membedakan "0 derajat" dari "gagal dibaca".
- **Lupa meloloskan tanda kutip dalam teks.** Tanda kutip dalam nama merusak struktur pesan.
- **Mengabaikan nilai kembali `snprintf`.** Pesan terpotong dikirim seolah utuh.
- **Memakai tanda kutip tunggal atau koma di akhir.** Itu bukan JSON sah walau sering diterima bahasa pemrograman tertentu.

## Cek mandiri

- [ ] Saya dapat menulis pembacaan sensor sebagai pesan JSON.
- [ ] Saya menulis nilai hilang sebagai `null`.
- [ ] Saya meloloskan tanda kutip dan memeriksa bahwa pesan muat di penyangga.
- [ ] Saya dapat menunjukkan mengapa sebuah teks bukan JSON sah.
- [ ] Saya dapat membandingkan JSON dan format biner.

## Kunci dan petunjuk

**Ingat kembali.** 1: bisa dibaca langsung di Serial Monitor atau log tanpa alat khusus, sehingga galat format cepat terlihat. 2: isi tidak dijamin berakhir nol; membacanya sebagai teks melewati akhir pesan dan membaca isi penyangga yang bukan bagian pesan. 3: server hanya menjawab saat `handleClient()` dipanggil; `delay` panjang membuat permintaan menunggu atau gagal.

**Prediksi dulu.** 1: `{"sensor":"s01","suhu":27.5,"detik":120}`, `{"sensor":"s01","suhu":null,"detik":125}`, dan `{"sensor":"lab \"A\"","suhu":26.0,"detik":130}` (26,04 dibulatkan ke satu desimal). 2: tidak muat; panjang pesan pertama 40 karakter. 3: tertulis `nan`, yang bukan JSON sah.

**Contoh setengah jadi.** Isian berurutan: `1`, lalu `<`. Hasil kunci yang dikompilasi dan dijalankan penulis: pesan kelembapan muat pada penyangga 32 byte dan tidak muat pada penyangga 8 byte.

**Soal Parsons.** Urutan benar: b, a, c, d, e, f, g, h, i. Baris (a) mendeklarasikan `n` sebelum dipakai di dua cabang.

**Latihan.** 1: `{"sensor":"s02","suhu":31.3,"detik":200}` (40 karakter) dan `{"sensor":"s02","suhu":null,"detik":205}`. 2: pseudocode: bila suhu tidak valid tulis `null`, selain itu satu desimal; tambahkan `"lembap":%d`; kembalikan `false` bila panjang tidak kurang dari ukuran penyangga. Kasus uji contoh: pembacaan normal; suhu tidak valid; penyangga yang terlalu kecil. 3: tanda kutip tunggal bukan pembatas JSON; koma di akhir tidak diizinkan; `nan` bukan nilai JSON; kunci harus berada di dalam tanda kutip ganda. 4: tidak ada kunci tunggal; jawaban yang baik mencatat apakah tiap pesan dinyatakan sah oleh pemeriksa.

**Latihan bercampur.** 1: pesan terpotong menjadi JSON tidak sah dan tidak dapat dibaca; cara yang benar: perbesar penyangga hingga cukup (periksa ukuran pesan terbesar) atau tolak dan catat pesan yang melebihi penyangga, jangan memakainya terpotong. 2: `Content-Length: 40`.

**Ulang berjarak.** 1: `nan` bukan JSON sah, dan 0 menyamarkan kegagalan sebagai "0 derajat"; `null` menyatakan "tidak ada nilai" dengan jelas. 2: tanda kutip tanpa lolos mengakhiri teks lebih awal sehingga struktur pesan rusak atau salah tafsir. 3: JSON dapat dibaca orang dan tidak bergantung pada urutan byte, tetapi lebih panjang (40 lawan 8 byte pada contoh); biner ringkas, tetapi membutuhkan alat dan kesepakatan byte demi byte.

## Langkah berikutnya

Modul berikut: `c-xi2-m8` (pemecahan masalah jaringan IoT), yang menyatukan sinyal, alamat, broker, dan format menjadi urutan diagnosis. Pembacaan lanjut: spesifikasi JSON (RFC 8259) dan penjelasan di json.org.
