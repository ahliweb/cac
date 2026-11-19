## Untuk siapa modul ini

Modul ini untuk murid kelas X jalur C (IoT dan robotika), minggu `C-X2-M7` silabus v1.3: waktu tanpa `delay` dan mesin keadaan sederhana. Prasyarat: modul `c-x2-m6` (aktuator). Kamu juga memakai perulangan dan keluaran serial dari `c-x1-m10`.

Modul ini berstatus DRAF: karangan penyusun, belum ditinjau pemilik, dan tidak dihitung memenuhi butir capaian pembelajaran mana pun. Keluaran minggu ini: diagram keadaan dan program. Latihan silabusnya: lampu lalu lintas mini.

Minggu ini tidak bertanda (F): semua bagian pokok dikerjakan **tanpa papan**, dengan kertas dan "papan tiruan" di komputer. Bila kamu mencoba dengan papan, ikuti aturan keselamatan modul sebelumnya: daya USB saja, LED selalu bersama resistor, dan cabut kabel sebelum mengubah rangkaian. Nomor pin pada contoh hanya contoh `[belum terverifikasi]` untuk papanmu.

## Ingat kembali

Jawab dari ingatan dulu, baru cek di kunci. Soal 1 dari `c-x1-m13`, soal 2 dari `c-x2-m6`, soal 3 dari `c-x2-m4`.

1. Apa beda "papan tiruan lolos uji" dan "rangkaian saya bekerja"?
2. Mengapa sudut servo dibatasi sebelum dikirim ke `write`?
3. Apa yang terjadi pada rata-rata bergerak bila satu pembacaan melonjak, dan apa harga memperbesar jendela?

## Tujuan

Setelah modul ini kamu dapat:

- menjelaskan mengapa `delay()` membuat program tidak tanggap selama menunggu;
- memakai `millis()` dan selisih waktu untuk bertindak setelah selang tertentu;
- menggambar diagram keadaan dan menerjemahkannya menjadi `enum` dan satu fungsi peralihan;
- menjelaskan mengapa selisih waktu tetap benar saat penghitung kembali ke nol;
- menulis program lampu lalu lintas mini tanpa `delay` (keluaran minggu ini).

## Prediksi dulu

Baca program ini dan **tebak dulu, tulis jawabanmu, baru telusuri**. Tombol memakai `INPUT_PULLUP`.

```arduino
// Arduino-C++ untuk ESP32. Diperiksa check:module-code terhadap header tiruan (sintaks dan tipe saja, bukan bukti perilaku papan).
const int PIN_LED = 2;
const int PIN_TOMBOL = 15;

void setup() {
  Serial.begin(115200);
  pinMode(PIN_LED, OUTPUT);
  pinMode(PIN_TOMBOL, INPUT_PULLUP);
}

void loop() {
  digitalWrite(PIN_LED, HIGH);
  delay(1000);
  digitalWrite(PIN_LED, LOW);
  delay(1000);
  if (digitalRead(PIN_TOMBOL) == LOW) {
    Serial.println("tombol");
  }
}
```

1. Tombol ditekan 100 ms tepat setelah LED menyala, lalu dilepas. Apakah "tombol" tercetak?
2. Berapa lama paling lama tombol harus ditahan agar pasti terbaca?
3. Menurutmu, apa penyebabnya?

## Contoh terselesaikan

`delay()` menahan seluruh program: selama menunggu, papan tidak membaca tombol, tidak mengecek sensor, dan tidak melakukan apa pun. Cara lain menunggu adalah **mengecek jam sambil terus berjalan**. Fungsi `millis()` memberi jumlah milidetik sejak papan mulai berjalan. Programmu mencatat kapan sebuah tahap dimulai, lalu di setiap putaran `loop()` bertanya: sudah berapa lama sejak itu? Bila belum cukup, putaran selesai dengan cepat dan program bisa membaca tombol di putaran berikutnya.

Selang waktu selalu dihitung sebagai **selisih**: `sekarang - mulai >= durasi`. Penghitung `millis()` bertipe `unsigned long` (32 bit pada papan umum `[belum terverifikasi]`), sehingga kembali ke nol sekitar 49,7 hari setelah papan menyala (2 pangkat 32 milidetik). Selisih tanpa tanda tetap benar walau penghitung baru saja kembali ke nol, sedangkan `sekarang >= mulai + durasi` tidak. Gagasan bilangan yang "melilit" seperti odometer dibahas di modul `matkom-bilangan-bertanda-dan-luapan`; pada bilangan tanpa tanda, pengurangan dihitung melingkar dengan cara yang sama.

**Mesin keadaan** adalah cara menata perilaku: sistem selalu berada tepat dalam satu keadaan, dan berpindah ke keadaan lain bila suatu syarat terpenuhi. Pada lampu lalu lintas, syaratnya adalah waktu tinggal habis.

| Keadaan | LED menyala | Lama tinggal | Berikutnya |
| --- | --- | --- | --- |
| MERAH | merah | 4000 ms | HIJAU |
| HIJAU | hijau | 3000 ms | KUNING |
| KUNING | kuning | 1000 ms | MERAH |

Diagram keadaannya berupa lingkaran: MERAH ke HIJAU ke KUNING lalu kembali ke MERAH. Kode di bawah memetakan tiap keadaan menjadi satu nilai `enum`, dan seluruh perilaku ada di satu fungsi `loop()` yang kecil.

```arduino
// Arduino-C++ untuk ESP32. Diperiksa check:module-code terhadap header tiruan (sintaks dan tipe saja, bukan bukti perilaku papan).
const int PIN_MERAH = 25;    // contoh; periksa papanmu
const int PIN_HIJAU = 26;
const int PIN_KUNING = 27;

enum Keadaan { MERAH, HIJAU, KUNING };
const unsigned long DURASI_MS[] = {4000, 3000, 1000};

Keadaan keadaan = MERAH;
unsigned long mulai = 0;

Keadaan berikutnya(Keadaan sekarang) {
  if (sekarang == MERAH) return HIJAU;
  if (sekarang == HIJAU) return KUNING;
  return MERAH;
}

void tampilkan() {
  digitalWrite(PIN_MERAH, keadaan == MERAH ? HIGH : LOW);
  digitalWrite(PIN_HIJAU, keadaan == HIJAU ? HIGH : LOW);
  digitalWrite(PIN_KUNING, keadaan == KUNING ? HIGH : LOW);
}

void setup() {
  pinMode(PIN_MERAH, OUTPUT);
  pinMode(PIN_HIJAU, OUTPUT);
  pinMode(PIN_KUNING, OUTPUT);
  tampilkan();
  mulai = millis();
}

void loop() {
  unsigned long sekarang = millis();
  if (sekarang - mulai >= DURASI_MS[keadaan]) {
    keadaan = berikutnya(keadaan);
    mulai = sekarang;
    tampilkan();
  }
}
```

Papan tiruan di bawah memegang jam sendiri dan memajukannya 100 ms setiap putaran. Ia mencetak tiap peralihan, lalu menguji selisih waktu yang melewati batas penghitung 32 bit: awal 4294967000 dan sekarang 200.

```cpp
// C++17 biasa, jalan di komputer. Diperiksa oleh check:module-code.
#include <cstdint>
#include <iostream>

// Papan tiruan: waktu dikendalikan oleh program uji.
uint32_t waktu_ms = 0;
uint32_t millis() { return waktu_ms; }

// Program yang sama dengan versi Arduino.
enum Keadaan { MERAH, HIJAU, KUNING };
const char* NAMA[] = {"MERAH", "HIJAU", "KUNING"};
const uint32_t DURASI_MS[] = {4000, 3000, 1000};

Keadaan keadaan = MERAH;
uint32_t mulai = 0;

Keadaan berikutnya(Keadaan sekarang) {
  if (sekarang == MERAH) return HIJAU;
  if (sekarang == HIJAU) return KUNING;
  return MERAH;
}

void loop() {
  uint32_t sekarang = millis();
  if (sekarang - mulai >= DURASI_MS[keadaan]) {
    keadaan = berikutnya(keadaan);
    mulai = sekarang;
    std::cout << sekarang << " ms: " << NAMA[keadaan] << "\n";
  }
}

int main() {
  std::cout << "0 ms: " << NAMA[keadaan] << "\n";
  for (waktu_ms = 0; waktu_ms <= 12000; waktu_ms += 100) {
    loop();
  }
  // Uji loncatan ke nol pada penghitung 32 bit: 496 ms berlalu melewati batasnya.
  uint32_t awal = 4294967000u;
  uint32_t kini = 200u;
  std::cout << "selisih melewati batas: " << kini - awal << " ms\n";
}
```

Keluarannya:

```text
0 ms: MERAH
4000 ms: HIJAU
7000 ms: KUNING
8000 ms: MERAH
12000 ms: HIJAU
selisih melewati batas: 496 ms
```

MERAH bertahan 4000 ms, HIJAU 3000 ms (sampai 7000), KUNING 1000 ms (sampai 8000), lalu MERAH lagi. Baris terakhir membuktikan bahwa selisih tanpa tanda memberi 496 ms yang benar walau `kini` lebih kecil daripada `awal`. Papan tiruan hanya membuktikan urutan keadaan; kedipan LED sungguhan dan ketepatan waktu papanmu hanya terbukti dengan papan, dan pada papan sungguhan peralihan terjadi pada putaran pertama setelah waktunya lewat.

## Contoh setengah jadi

Sekarang sebagian diisi olehmu. Tujuannya: `loop()` yang berpindah keadaan bila waktu tinggal habis. Lengkapi bagian `____`.

```arduino setengah-jadi
// Arduino-C++ untuk ESP32. Lengkapi bagian ____.
void loop() {
  unsigned long sekarang = ____();
  if (sekarang - ____ >= DURASI_MS[keadaan]) {
    keadaan = berikutnya(keadaan);
    ____ = sekarang;
    tampilkan();
  }
}
```

## Soal Parsons

Susun baris-baris di bawah (sudah diacak) menjadi `loop()` mesin keadaan lampu lalu lintas.

```text
(a)   mulai = sekarang;
(b)   if (sekarang - mulai >= DURASI_MS[keadaan]) {
(c)     keadaan = berikutnya(keadaan);
(d) void loop() {
(e)   unsigned long sekarang = millis();
(f)   }
(g) }
```

## Latihan

1. `AI: boleh` **Rancangan dulu.** Gambar atau tulis tabel keadaan, lalu tulis pseudocode dan programnya: lampu lalu lintas mini tanpa `delay`, dengan MERAH 5 detik, HIJAU 4 detik, dan KUNING 1 detik (keluaran minggu ini).
2. `AI: tanpa AI` **Telusuri.** Durasi MERAH 2000, HIJAU 1000, KUNING 500 (milidetik), dan `loop()` dicek tiap 100 ms. Tulis waktu tiap peralihan sampai 4000 ms.
3. `AI: tanpa AI` **Cari galat.** Seorang murid menulis `if (sekarang >= mulai + DURASI)`. Dengan penghitung 32 bit, `mulai` bernilai 4294967000 dan `DURASI` 1000, hitung `mulai + DURASI` dan jelaskan apa yang terjadi bila `sekarang` bernilai 4294967100.
4. `AI: boleh` **Perluas.** Tambahkan LED kelima yang berkedip tiap 300 ms bersamaan dengan lampu lalu lintas, tanpa `delay`. Apa yang perlu kamu tambah di program?
5. *Opsional:* **catatan pemakaian AI.** Bila memakai AI generatif, jawab nomor 1 sendiri dulu, lalu minta penjelasan atau petunjuk bertahap, bukan program jadi. Catat alatnya, tujuanmu, garis besar perintahmu, bagian yang kamu pakai, dan cara memeriksanya (jalankan atau telusuri). Jangan menaruh data pribadi atau tugas bernilai pada perintah.

## Latihan bercampur

1. Palang pintu dari minggu lalu punya empat keadaan: TUTUP, MEMBUKA, TERBUKA, dan MENUTUP. Tulis tabel keadaannya: syarat berpindah dan keadaan berikutnya.
2. LED diredupkan dengan PWM: nilai naik 5 tiap 20 ms dari 0 sampai 255. Berapa kali kenaikan agar mencapai 255, dan berapa milidetik sapuan naiknya?

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `c-x2-m8` (sekitar satu minggu lagi), `c-x2-m10` (sekitar tiga minggu lagi), dan modul pertama kelas XI jalur C (sekitar delapan minggu lagi). Jawab sekarang lalu simpan.

1. Tulis syarat `millis()` yang benar untuk "sudah lewat 500 ms sejak `mulai`".
2. Mengapa `sekarang - mulai` tetap benar saat `millis()` kembali ke 0 (tipe `unsigned long`)?
3. Apa kelemahan `delay()` untuk program yang harus melakukan dua hal?

## Kesalahan umum

- **Menulis `sekarang >= mulai + durasi`.** Rumus ini rusak saat penghitung hampir kembali ke nol; pakai selisih `sekarang - mulai >= durasi`.
- **Memakai `int` untuk waktu.** Tipe bertanda dan lebih kecil dapat meluap; pakai `unsigned long`.
- **Lupa memperbarui `mulai`.** Syaratnya tetap benar di semua putaran berikutnya, sehingga keadaan berganti terus.
- **Mencampur `delay` panjang dengan `millis()`.** Satu `delay` panjang membuat mesin keadaanmu tidak tanggap lagi.
- **Mengira peralihan terjadi tepat pada milidetik yang dihitung.** Peralihan terjadi pada putaran pertama setelah waktunya lewat.
- **Mengira papan tiruan lolos uji berarti rangkaian bekerja.** Papan tiruan membuktikan urutan, bukan kabel dan waktu nyata.

## Cek mandiri

- [ ] Saya dapat menjelaskan mengapa `delay()` membuat program tidak tanggap.
- [ ] Saya menulis selang waktu dengan `sekarang - mulai >= durasi`.
- [ ] Saya dapat menggambar diagram keadaan dan menerjemahkannya ke `enum`.
- [ ] Saya dapat menjelaskan mengapa selisih tanpa tanda tetap benar saat penghitung kembali ke nol.
- [ ] Saya dapat membedakan apa yang dibuktikan papan tiruan dan papan sungguhan.

## Kunci dan petunjuk

**Ingat kembali.** 1: papan tiruan hanya membuktikan logika di komputer; rangkaian yang bekerja butuh sambungan, waktu, dan perangkat sungguhan yang diuji dengan papan. 2: agar lengan tidak didorong melewati batas mekanik palang. 3: rata-rata naik tetapi lebih kecil dari lonjakannya, dan pengaruhnya bertahan sampai nilai itu keluar dari jendela; jendela lebih besar lebih halus tetapi lebih lambat mengikuti perubahan nyata.

**Prediksi dulu.** 1: tidak; tombol hanya dibaca sekali per putaran, sesudah kedua `delay`, dan sudah dilepas. 2: sampai satu putaran penuh, kira-kira 2 detik, supaya tombol masih tertekan saat dibaca. 3: selama `delay` papan menunggu dan tidak menjalankan baris berikutnya, sehingga tidak bisa membaca tombol.

**Contoh setengah jadi.** Isian berurutan: `millis`, `mulai`, `mulai`. Program lengkapnya dikompilasi penulis dengan `Arduino.h` tiruan tanpa peringatan.

**Soal Parsons.** Urutan benar: d, e, b, c, a, f, g.

**Latihan.** 1: tabel: MERAH 5000 ms ke HIJAU; HIJAU 4000 ms ke KUNING; KUNING 1000 ms ke MERAH. Pseudocode: ULANG TERUS: ambil waktu sekarang; BILA selisih dengan awal tahap >= lama tahap, pindah ke keadaan berikutnya, catat waktu awal baru, dan nyalakan LED yang sesuai. Program memakai `DURASI_MS[] = {5000, 4000, 1000}`. 2: 0 ms MERAH; 2000 ms HIJAU; 3000 ms KUNING; 3500 ms MERAH; tiga peralihan sampai 4000 ms (peralihan berikutnya pada 5500 ms). 3: 4294967000 + 1000 = 4294968000, dikurangi 4294967296 menjadi 704 pada 32 bit; dengan `sekarang` 4294967100 syarat `sekarang >= 704` langsung benar, sehingga peralihan terjadi setelah 100 ms, bukan 1000 ms. Selisih `sekarang - mulai` bernilai 100 dan benar. 4: perlu `mulaiKedip` tersendiri, keadaan LED, dan satu `if` kedua pada selang 300 ms di `loop()`.

**Latihan bercampur.** 1: TUTUP, bila tombol ditekan, ke MEMBUKA; MEMBUKA, bila `GERAK_MS` habis, ke TERBUKA; TERBUKA, bila 2000 ms habis, ke MENUTUP; MENUTUP, bila `GERAK_MS` habis, ke TUTUP. 2: 255 / 5 = 51 kenaikan; 51 x 20 = 1020 ms.

**Ulang berjarak.** 1: `millis() - mulai >= 500`. 2: pada bilangan tanpa tanda 32 bit, pengurangan dihitung melingkar, sehingga selisih melewati batas tetap sama dengan waktu yang benar-benar berlalu. 3: selama `delay` berjalan, papan tidak bisa mengerjakan hal kedua, seperti membaca tombol atau sensor.

## Langkah berikutnya

Modul berikut: `c-x2-m8` (menampilkan data), yang memakai penunjuk waktu ini untuk memperbarui tampilan tanpa membeku. Modul terkait: `matkom-bilangan-bertanda-dan-luapan` untuk luapan bilangan. Pembacaan lanjut: contoh Arduino "Blink Without Delay".

## Rujukan

- Arduino, rujukan bahasa: `millis()`. <https://docs.arduino.cc/language-reference/en/functions/time/millis/>
- Arduino, contoh bawaan: Blink Without Delay. <https://docs.arduino.cc/built-in-examples/digital/BlinkWithoutDelay/>
- Espressif, dokumentasi Arduino-ESP32. <https://docs.espressif.com/projects/arduino-esp32/en/latest/>
