## Untuk siapa modul ini

Modul ini untuk murid kelas XII jalur C (IoT dan robotika), minggu `C-XII2-M8` silabus v1.4: proyek akhir, sprint 3 (jaringan dan data) (F). Prasyarat terindeks: `c-xii1-m14`; belum terindeks: `C-XII2-M7` (sprint 2: program) dan `C-XII2-M4` (ulasan keamanan dan privasi).

Modul ini karangan penyusun dan disetujui pemilik program pada 2026-11-20 (keputusan lewat dialog; catatan tinjauan menjadi tindak lanjut revisi). Ia mendukung butir `F-BK-a` dan `F-AP-d`, dan tidak dihitung memenuhi butir capaian pembelajaran mana pun. Keluaran: sistem terhubung. Latihan silabus: integrasi (F).

**Dengan papan (F):** kelompok menyambungkan robot ke jaringan lab milik guru dan mengirim log. **Tanpa papan:** kamu menelusuri program papan tiruan dengan jaringan karangan yang bisa putus. Alamat dan angka pada contoh hanya contoh `[belum terverifikasi]` untuk labmu.

## Keselamatan perangkat

- Papan memakai daya USB; motor memakai baterai AA/AAA dari guru lewat modul pengendali. Tidak ada listrik jaringan (220 V), baterai litium tanpa pelindung, pengisian daya litium oleh murid, atau solder.
- Cabut baterai dan kabel USB sebelum mengubah rangkaian; periksa polaritas; motor tidak pernah langsung ke pin papan.
- Uji dengan **roda terangkat**, di meja bertepi, dengan tombol berhenti terpasang dan pemutus daya yang kamu ketahui letaknya, termasuk uji "jaringan mati". Bagian yang bergerak tidak disentuh saat menyala.
- Papan, modul, motor, atau baterai yang panas, berbau, atau berasap: cabut daya dan panggil guru. Tanpa kamera, mikrofon, atau sensor tubuh; pakai hanya jaringan lab yang diizinkan guru.

## Ingat kembali

Jawab dari ingatan dulu, baru cek kunci. Soal 1 dari `c-xii2-m7`, soal 2 dari `c-xii2-m5`, soal 3 dari `c-xii1-m11`.

1. Mengapa logika keputusan dipisahkan dari perangkat lewat antarmuka?
2. Sebut bagian-bagian dokumen rancangan.
3. Kapan data dari sensor yang tampak biasa menjadi data pribadi?

## Tujuan

Setelah modul ini kamu dapat:

- menjelaskan mengapa keselamatan robot tidak boleh bergantung pada jaringan;
- mengirim log tanpa menghalangi pengendalian;
- menelusuri apa yang hilang bila jaringan putus dan melaporkannya;
- menjaga data tanpa pengenal dan rahasia di luar repositori;
- menghasilkan sistem terhubung (keluaran minggu ini).

## Rencana sprint

Sprint 3 menyambungkan program inti `C-XII2-M7` dengan jaringan lab. Kriteria selesainya: robot tetap berhenti di `AMAN` saat garis hilang walaupun jaringan mati (kebutuhan K3); log tiba di server lab bila jaringan hidup; catatan yang hilang dilaporkan; data tidak memuat pengenal (K5). Prinsipnya: **jaringan melayani robot, bukan sebaliknya.** Pengiriman HTTP menunggu sampai batas waktu bila server diam, dan selama itu robot yang `MAJU` tidak membaca garis. Karena itu log disimpan dulu di penyangga melingkar dan dikirim hanya saat robot tidak `MAJU`.

Tulis **prediksi** dulu: jaringan karangan putus pada tick 8 dan 9, penyangga muat enam catatan. Berapa catatan tertimpa saat pengiriman berhasil kedua, dan tick berapa catatan tertua yang tersisa?

```cpp
// C++17 biasa, jalan di komputer. Diperiksa oleh check:module-code.
// "Papan tiruan" pengirim log: penyangga melingkar berukuran tetap, jaringan karangan yang bisa putus,
// dan aturan: kirim hanya bila robot tidak MAJU. Semua angka karangan.
#include <iostream>

enum Keadaan { DIAM, MAJU, AMAN };
const char *NAMA[] = {"DIAM", "MAJU", "AMAN"};

struct Catatan {
  int tick;
  Keadaan keadaan;
};

const int KAPASITAS = 6;

struct LogBulat {
  Catatan isi[KAPASITAS];
  int awal = 0;
  int banyak = 0;
  int tertimpa = 0;  // berapa catatan hilang karena penuh
  void tambah(const Catatan &c) {
    isi[(awal + banyak) % KAPASITAS] = c;
    if (banyak < KAPASITAS) {
      banyak++;
    } else {
      awal = (awal + 1) % KAPASITAS;
      tertimpa++;
    }
  }
};

Keadaan keadaanDiTick(int t) { return t == 0 ? DIAM : (t <= 7 ? MAJU : AMAN); }
bool jaringanHidup(int t) { return !(t == 8 || t == 9); }  // putus pada tick 8 dan 9

int main() {
  LogBulat log;
  for (int t = 0; t <= 11; t++) {
    Keadaan k = keadaanDiTick(t);
    log.tambah({t, k});
    bool bolehKirim = (k != MAJU) && (t % 2 == 0);  // robot MAJU: tidak mengirim
    if (!bolehKirim) {
      continue;
    }
    if (!jaringanHidup(t)) {
      std::cout << "tick " << t << ": jaringan putus, tunda (tersimpan " << log.banyak << ")\n";
      continue;
    }
    std::cout << "tick " << t << ": kirim tertimpa=" << log.tertimpa;
    for (int i = 0; i < log.banyak; i++) {
      const Catatan &c = log.isi[(log.awal + i) % KAPASITAS];
      std::cout << " [" << c.tick << " " << NAMA[c.keadaan] << "]";
    }
    std::cout << "\n";
    log.awal = 0;
    log.banyak = 0;
    log.tertimpa = 0;
  }
}
```

Keluaran program (dijalankan penulis dengan `g++ -std=c++17`):

```text
tick 0: kirim tertimpa=0 [0 DIAM]
tick 8: jaringan putus, tunda (tersimpan 6)
tick 10: kirim tertimpa=4 [5 MAJU] [6 MAJU] [7 MAJU] [8 AMAN] [9 AMAN] [10 AMAN]
```

Bacalah dengan jujur. Selama `MAJU` (tick 1 sampai 7) tidak ada pengiriman, jadi penyangga penuh sebelum jaringan putus; saat tick 10 mengirim, catatan tick 1 sampai 4 sudah ditimpa, dan **tertimpa=4** membuat kehilangan itu terlihat. Yang hilang justru awal lari. Ada ongkosnya: kapasitas lebih besar memakan memori (ukur dulu seperti `c-xii2-m2`), mencatat lebih jarang mengurangi rincian.

Sketsa berikut adalah bentuk papannya; ia hanya diperiksa sintaksnya terhadap header tiruan, tidak dijalankan pada papan. Perhatikan: `setup()` tidak menunggu sambungan (contoh Arduino-ESP32 menunggu dalam perulangan, yang akan menghentikan robot); selisih `millis()` memakai `unsigned long` agar aman saat penghitung kembali ke nol sekitar 49 hari.

```arduino
// Arduino-C++ untuk ESP32. Diperiksa check:module-code terhadap header tiruan (sintaks dan tipe saja, bukan bukti perilaku papan).
// Alamat, jeda, dan kapasitas adalah contoh; ganti dengan lembar guru. Rahasia jaringan didefinisikan di berkas
// terpisah yang tidak masuk repositori (modul c-xii2-m4), bukan di sini.
#include <HTTPClient.h>
#include <WiFi.h>
#include <stdio.h>

extern const char *WIFI_SSID_LAB;
extern const char *WIFI_KATA_SANDI_LAB;

const char *ALAMAT_LAB = "http://192.0.2.20:8080/log";  // alamat dokumentasi, bukan alamat nyata
const unsigned long SELANG_KIRIM_MS = 5000;
const int KAPASITAS = 8;

struct Baris {
  unsigned long ms;
  char keadaan;  // 'D', 'M', atau 'A'
  int koreksi;
};

Baris antrean[KAPASITAS];
int awal = 0;
int banyak = 0;
unsigned long tertimpa = 0;
unsigned long terakhirKirim = 0;
char keadaanSekarang = 'D';  // diisi oleh program inti (modul c-xii2-m7)

void catat(char keadaan, int koreksi) {
  antrean[(awal + banyak) % KAPASITAS] = {millis(), keadaan, koreksi};
  if (banyak < KAPASITAS) {
    banyak++;
  } else {
    awal = (awal + 1) % KAPASITAS;
    tertimpa++;
  }
}

// Mengembalikan true hanya bila server menjawab 2xx; selain itu antrean dibiarkan utuh.
bool kirimAntrean() {
  char muatan[256];
  int n = snprintf(muatan, sizeof(muatan), "tertimpa=%lu\n", tertimpa);
  for (int i = 0; i < banyak && n < (int)sizeof(muatan) - 24; i++) {
    const Baris &b = antrean[(awal + i) % KAPASITAS];
    n += snprintf(muatan + n, sizeof(muatan) - n, "%lu,%c,%d\n", b.ms, b.keadaan, b.koreksi);
  }
  HTTPClient http;
  http.setConnectTimeout(1000);
  http.setTimeout(1000);
  if (!http.begin(ALAMAT_LAB)) {
    return false;
  }
  int kode = http.POST(String(muatan));
  http.end();
  return kode >= 200 && kode < 300;
}

void setup() {
  Serial.begin(115200);
  WiFi.mode(WIFI_STA);
  WiFi.begin(WIFI_SSID_LAB, WIFI_KATA_SANDI_LAB);  // jangan menunggu di sini: robot tetap harus bisa berhenti
}

void loop() {
  // 1. Program inti dan keselamatan lebih dulu (modul c-xii2-m7); ia memanggil catat(...).
  // 2. Jaringan hanya sesudahnya, hanya saat robot tidak MAJU, dan tanpa menghalangi langkah berikutnya.
  bool terhubung = WiFi.status() == WL_CONNECTED;
  bool bolehKirim = keadaanSekarang != 'M' && millis() - terakhirKirim >= SELANG_KIRIM_MS;
  if (terhubung && bolehKirim) {
    terakhirKirim = millis();
    if (kirimAntrean()) {
      awal = 0;
      banyak = 0;
      tertimpa = 0;
    }
  }
}
```

Isi log hanya `ms`, keadaan, dan koreksi: tanpa nama, kontak, atau lokasi.

## Daftar periksa

Kerjakan berurutan; tiap titik periksa harus dapat ditunjukkan kepada orang lain.

1. `AI: tanpa AI` **Prediksi.** Tulis prediksi jumlah catatan tertimpa untuk skenario karanganmu sebelum menjalankan. Titik periksa: prediksi bertanggal sebelum hasil.
2. `AI: boleh` **Format dan kapasitas.** Pilih kolom log dan hitung byte seluruh penyangga. Titik periksa: ukuran tercatat, tanpa kolom pengenal.
3. `AI: boleh` **Rahasia.** Taruh nama jaringan dan kata sandi di berkas di luar repositori. Titik periksa: pemindai `c-xii2-m4` tidak menemukan rahasia.
4. `AI: tanpa AI` **Uji jaringan mati (F).** Roda terangkat: matikan jaringan lab saat robot `MAJU`, lalu hilangkan garis. Titik periksa: robot tetap masuk `AMAN`. Tanpa papan: ubah `jaringanHidup` agar selalu `false` dan prediksi keluarannya dulu.
5. `AI: boleh` **Kirim saat tidak MAJU.** Tulis satu uji yang gagal bila pengiriman terjadi saat `MAJU`. Titik periksa: uji itu lulus.
6. *Opsional:* **catatan pemakaian AI.** Bila memakai AI generatif, tulis dulu rancangan sendiri, lalu minta kritik, bukan kode jadi; kode buatan AI dibaca, dijalankan, dan diuji. Catat alatnya, tujuanmu, garis besar perintahmu, bagian yang kamu pakai, dan cara memeriksanya. Jangan menaruh data pribadi atau kata sandi pada perintah.

## Umpan balik sejawat

Tukar program dan lembar uji dengan kelompok lain. Beri masukan: **satu yang sudah baik**, **satu yang perlu diperbaiki** (sebut butirnya, misalnya "pengiriman terjadi saat `MAJU`"), dan **satu langkah berikutnya**. Ulasan berpasangan ini praktik yang layak dicoba, bukan jaminan hasil.

## Latihan bercampur

1. Dari `c-xii2-m6`: apa yang kamu catat pada lembar uji "jaringan mati"?
2. Dari `c-xii2-m7`: apa yang sama pada log robot dan log sketsa jaringan saat keduanya penuh?

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `C-XII2-M9` (sekitar satu minggu lagi), `C-XII2-M11` (sekitar tiga minggu lagi), dan `C-XII2-M13` (sekitar lima minggu lagi). Jawab sekarang lalu simpan.

1. Mengapa pengiriman data lewat jaringan tidak dilakukan saat robot `MAJU`?
2. Mengapa catatan yang tertimpa harus dilaporkan, bukan dibiarkan diam-diam?
3. Mengapa kata sandi jaringan tidak ditulis di dalam program yang masuk repositori?

## Kesalahan umum

- **Menunggu sambungan di `setup()` tanpa batas.** Robot tidak dapat berhenti saat jaringan tidak ada.
- **Mengirim saat `MAJU`.** Robot buta selama pengiriman menunggu.
- **Log tanpa kapasitas atau tanpa laporan kehilangan.**
- **Kata sandi di berkas yang di-commit.**
- **Menganggap jaringan selalu ada.**

## Cek mandiri

- [ ] Robotku tetap `AMAN` bila jaringan mati.
- [ ] Pengiriman hanya saat robot tidak `MAJU`.
- [ ] Log berukuran tetap dan kehilangan terlapor.
- [ ] Data tanpa pengenal; rahasia di luar repositori.

## Kunci dan petunjuk

**Ingat kembali.** 1: supaya logika dapat diuji tanpa papan dan perangkat yang berganti tidak mengubah logika. 2: masalah dan kebutuhan, arsitektur, antarmuka, strategi dan alasannya, rencana uji, keselamatan dan privasi, rencana kerja, risiko, fitur yang boleh dipotong, serta kriteria dan prediksi. 3: bila disandingkan dengan informasi lain, seperti nama, jam, atau tempat, sehingga seseorang dapat diidentifikasi.

**Rencana sprint.** Prediksi: tick 1 sampai 10 menghasilkan 10 catatan setelah tick 0 terkirim; penyangga muat 6, jadi 4 tertimpa (tick 1 sampai 4) dan tersimpan tick 5 sampai 10 (keluaran program membenarkannya). Tanpa papan, bila `jaringanHidup` selalu `false`: tidak ada pengiriman berhasil; keluarannya `tick 0: jaringan putus, tunda (tersimpan 1)`, `tick 8: ... (tersimpan 6)`, dan `tick 10: ... (tersimpan 6)`, dan catatan tertua yang tersisa pada tick 10 adalah tick 5.

**Daftar periksa.** Rubrik singkat: nomor 1 prediksi bertanggal; nomor 2 ukuran baris dikalikan kapasitas tercantum dan tanpa kolom nama atau kontak; nomor 3 pemindai tidak menemukan rahasia (ingat bahwa itu tidak membuktikan tidak ada masalah lain); nomor 4 robot berhenti di `AMAN` saat jaringan mati; nomor 5 ada uji yang gagal bila pengiriman terjadi saat `MAJU`; nomor 6 opsional.

**Umpan balik sejawat.** Umpan balik yang baik menyebut butir, bukan kesan umum, dan memberi langkah yang bisa dikerjakan minggu depan.

**Latihan bercampur.** 1: tahap pengujian setelah rangkaian dan program inti terbukti, dengan roda terangkat; catat tanggal, prediksi, hasil, kondisi (jaringan mati), dan siapa yang menguji. 2: kapasitas tetap sehingga memori tidak habis, dan catatan tertua yang ditimpa catatan baru.

**Ulang berjarak.** 1: pengiriman menunggu sampai batas waktu bila server tidak menjawab, dan selama itu robot tidak membaca garis. 2: supaya orang yang memakai data tahu bahwa ada bagian yang hilang dan tidak menyimpulkan dari data yang tidak utuh. 3: riwayat repositori menyimpan salinan; orang yang punya akses ke riwayat masih dapat membacanya.

## Langkah berikutnya

Modul berikut: `C-XII2-M9` (sprint 4: penyempurnaan). Bacaan lanjut: `millis()` pada referensi Arduino dan Wi-Fi pada dokumentasi Arduino-ESP32 (lihat Rujukan).
