## Untuk siapa modul ini

Modul ini untuk murid kelas XII jalur C (IoT dan robotika), minggu `C-XII1-M1` silabus v1.4: merancang kebutuhan sistem. Prasyarat: modul `c-xi2-m7` (format data), modul C terakhir yang sudah terindeks saat modul ini ditulis. Urutan sebenarnya melewati `C-XI2-M8` sampai `C-XI2-M14`; modul itu belum terindeks sehingga tidak ditulis sebagai prasyarat resmi. Kamu juga memakai pengertian kebutuhan dan kriteria selesai dari `c-xi1-m1`.

Modul ini karangan penyusun dan disetujui pemilik program pada 2026-11-20 (keputusan lewat dialog; catatan tinjauan menjadi tindak lanjut revisi). Ia mendukung butir `F-BK-a` (alur proses pengembangan program atau produk digital) dan `F-LD-d` (merancang kebutuhan sistem komputer sesuai kebutuhan pengguna), dan tidak dihitung memenuhi butir capaian pembelajaran mana pun. Keluaran minggu ini: dokumen kebutuhan. Latihan silabusnya: wawancara pengguna fiktif untuk robot sederhana.

Seluruh modul ini dikerjakan **tanpa papan**, dengan kertas dan program C++ di komputer. Modul ini tidak memakai perangkat fisik; aturan keselamatan perangkat dari modul sebelumnya tetap berlaku bila kamu menyentuh papan. Semua tokoh, nama, dan angka adalah karangan.

## Ingat kembali

Jawab dari ingatan dulu, baru cek di kunci. Soal 1 dari `C-XI2-M7`, soal 2 dari `C-XI2-M12`, soal 3 dari `c-xi1-m1`.

1. Apa kelebihan dan kekurangan JSON dibanding format biner untuk data sensor?
2. Sebut satu alat yang harus mati dan satu alat yang boleh menyala saat sensor gagal, dengan alasan.
3. Apa beda kebutuhan dan rancangan? Beri satu kalimat untuk masing-masing pada pemantau suhu.

## Tujuan

Setelah modul ini kamu dapat:

- menerjemahkan kalimat pengguna fiktif menjadi kebutuhan yang terukur, dengan cara uji;
- membedakan kebutuhan (apa yang harus dilakukan sistem), batasan (syarat dari lingkungan), dan rancangan (bagaimana caranya);
- menulis kebutuhan keselamatan, yaitu perilaku sistem saat sesuatu gagal;
- memeriksa hasil uji terhadap kebutuhan dengan nilai terburuk, dan mencatat kebutuhan yang belum diuji;
- menyusun dokumen kebutuhan satu halaman (keluaran minggu ini).

## Prediksi dulu

Program di bawah membandingkan hasil uji dengan batas. Jenis `MAKSIMUM` berarti semua hasil harus kurang dari atau sama dengan batas; `MINIMUM` berarti semua hasil harus lebih dari atau sama dengan batas. **Tebak dulu, tulis jawabanmu, baru jalankan.**

1. Kebutuhan K2 (jarak berhenti, minimum 10 cm) mendapat hasil 14, 12, 9, 13, 12. Apa lulus atau gagal, dan nilai terburuknya berapa?
2. Kebutuhan K1 (waktu antar, maksimum 40 detik) mendapat hasil 32, 35, 38, 40, 36. Lulus atau gagal?
3. Pengguna berkata "robotnya harus cepat". Bisakah kalimat itu diuji apa adanya? Bila tidak, tulis ulang menjadi kalimat yang bisa diuji.

## Contoh terselesaikan

Pengguna fiktif kita, Bu Laras (tokoh karangan), menjaga sebuah laboratorium komputer. Ia ingin robot kecil membawa kotak komponen dari meja A ke meja B di lorong lab. Langkah pertama bukan memilih sensor, melainkan mendengar dan mencatat kalimatnya apa adanya. Langkah kedua memilah: **kebutuhan** menyatakan apa yang harus dilakukan sistem dan harus terukur; **batasan** adalah syarat dari lingkungan, seperti daya hanya dari USB atau baterai AA/AAA yang disediakan guru, tanpa listrik jaringan 220 V, dan tanpa kamera atau mikrofon (privasi); **rancangan** adalah cara memenuhinya, misalnya sensor apa yang dipakai, dan baru dibahas di modul berikutnya. Kebutuhan tanpa cara uji tinggal harapan.

| Ucapan Bu Laras | Kebutuhan terukur | Cara uji |
| --- | --- | --- |
| "Jangan lama-lama." | K1: waktu antar A ke B paling lama 40 detik | lima kali jalan, catat waktu |
| "Jangan sampai menabrak." | K2: berhenti paling dekat 10 cm dari halangan | lima kali mendekati kardus, ukur jarak berhenti |
| "Baterainya awet." | K3: beroperasi paling sedikit 20 menit | tiga kali sampai baterai lemah |
| "Kalau ada yang rusak, jangan ngamuk." | K4: sensor jarak dicabut, robot berhenti; jumlah kali tetap bergerak paling banyak 0 | tiga kali pencabutan |
| "Kotaknya jangan jatuh." | K5: kotak jatuh sepanjang lintasan paling banyak 0 kali | belum diuji |

K4 adalah kebutuhan keselamatan: ia tidak menyebut cara kerja normal, tetapi apa yang terjadi saat gagal, seperti keadaan aman pada `C-XI2-M12`. Angka 10 cm dan 40 detik hanya contoh; di proyekmu angka datang dari pengguna dan dari ukuran nyata.

Program berikut memeriksa hasil uji terhadap kebutuhan. Ia membandingkan **nilai terburuk** dengan batas, karena satu kali gagal berarti sistem belum memenuhi kebutuhan; rata-rata menyembunyikannya. Kebutuhan yang belum diuji dihitung belum lulus.

```cpp
// C++17 biasa, jalan di komputer. Diperiksa oleh check:module-code.
#include <iostream>

enum class Jenis { MAKSIMUM, MINIMUM };

struct Kebutuhan {
  const char *id;
  const char *teks;
  Jenis jenis;
  int batas;
};

const int MAKS_HASIL = 5;

struct HasilUji {
  int jumlah;
  int nilai[MAKS_HASIL];
};

// Nilai terburuk: yang paling jauh dari memenuhi kebutuhan.
int nilaiTerburuk(const Kebutuhan &k, const HasilUji &h) {
  int terburuk = h.nilai[0];
  for (int i = 1; i < h.jumlah; i++) {
    if (k.jenis == Jenis::MAKSIMUM && h.nilai[i] > terburuk) {
      terburuk = h.nilai[i];
    }
    if (k.jenis == Jenis::MINIMUM && h.nilai[i] < terburuk) {
      terburuk = h.nilai[i];
    }
  }
  return terburuk;
}

bool lulus(const Kebutuhan &k, const HasilUji &h) {
  if (h.jumlah == 0) {
    return false;  // belum diuji bukan berarti lulus
  }
  int terburuk = nilaiTerburuk(k, h);
  return k.jenis == Jenis::MAKSIMUM ? terburuk <= k.batas : terburuk >= k.batas;
}

int main() {
  const int JUMLAH = 5;
  const Kebutuhan kebutuhan[JUMLAH] = {
      {"K1", "waktu antar meja A ke meja B, detik", Jenis::MAKSIMUM, 40},
      {"K2", "jarak berhenti dari halangan, cm", Jenis::MINIMUM, 10},
      {"K3", "waktu operasi satu baterai, menit", Jenis::MINIMUM, 20},
      {"K4", "uji dengan sensor jarak dicabut: kali robot tetap bergerak", Jenis::MAKSIMUM, 0},
      {"K5", "uji kotak jatuh di sepanjang lintasan, kali", Jenis::MAKSIMUM, 0},
  };
  const HasilUji hasil[JUMLAH] = {
      {5, {32, 35, 38, 41, 36}},
      {5, {14, 12, 11, 13, 12}},
      {3, {26, 24, 25}},
      {3, {0, 0, 0}},
      {0, {}},
  };
  int gagal = 0;
  for (int i = 0; i < JUMLAH; i++) {
    bool ok = lulus(kebutuhan[i], hasil[i]);
    if (!ok) {
      gagal++;
    }
    std::cout << kebutuhan[i].id << " ";
    if (hasil[i].jumlah == 0) {
      std::cout << "belum diuji";
    } else {
      std::cout << "terburuk " << nilaiTerburuk(kebutuhan[i], hasil[i]) << " dari batas " << kebutuhan[i].batas
                << ": " << (ok ? "lulus" : "GAGAL");
    }
    std::cout << "\n";
  }
  std::cout << "belum lulus: " << gagal << " dari " << JUMLAH << " kebutuhan\n";
}
```

Keluarannya:

```text
K1 terburuk 41 dari batas 40: GAGAL
K2 terburuk 11 dari batas 10: lulus
K3 terburuk 24 dari batas 20: lulus
K4 terburuk 0 dari batas 0: lulus
K5 belum diuji
belum lulus: 2 dari 5 kebutuhan
```

K1 gagal karena satu kali jalan 41 detik, walau empat lainnya di bawah 40. Lulus pada lima kali uji tidak membuktikan akan selalu lulus; ia hanya menyatakan belum ditemukan pelanggaran pada uji itu. Program ini juga hanya membandingkan angka; benar tidaknya pengukuran tetap tanggung jawab penguji. Perubahan kebutuhan dicatat: bila K3 naik menjadi 30 menit, tulis tanggal dan alasannya, jangan menimpanya diam-diam.

## Contoh setengah jadi

Lengkapi bagian `____` pada fungsi `lulus`: kebutuhan yang belum diuji tidak lulus; `MAKSIMUM` memakai kurang dari atau sama dengan, `MINIMUM` lebih dari atau sama dengan.

```cpp setengah-jadi
// C++17. Lengkapi bagian ____.
bool lulus(const Kebutuhan &k, const HasilUji &h) {
  if (h.jumlah ____ 0) {
    return ____;
  }
  int terburuk = nilaiTerburuk(k, h);
  return k.jenis == Jenis::MAKSIMUM ? terburuk ____ k.batas : terburuk ____ k.batas;
}
```

## Soal Parsons

Susun baris-baris di bawah (sudah diacak) menjadi fungsi `nilaiTerburuk`. Dua baris `if` di dalam perulangan boleh bertukar tempat.

```text
(a)   int terburuk = h.nilai[0];
(b) int nilaiTerburuk(const Kebutuhan &k, const HasilUji &h) {
(c)   for (int i = 1; i < h.jumlah; i++) {
(d)     if (k.jenis == Jenis::MAKSIMUM && h.nilai[i] > terburuk) { terburuk = h.nilai[i]; }
(e)     if (k.jenis == Jenis::MINIMUM && h.nilai[i] < terburuk) { terburuk = h.nilai[i]; }
(f)   }
(g)   return terburuk;
(h) }
```

## Latihan

1. `AI: tanpa AI` **Klasifikasi.** Untuk tiap pernyataan, tulis kebutuhan, batasan, atau rancangan: (a) robot memakai sensor ultrasonik; (b) daya hanya dari baterai AA yang disediakan guru; (c) robot berhenti sebelum menabrak halangan; (d) robot tidak memakai kamera; (e) robot memakai dua motor DC.
2. `AI: boleh` **Wawancara fiktif.** Berpasangan: satu murid berperan sebagai pengguna fiktif dengan nama peran saja (misalnya "penjaga lab"), satu mencatat. Dari sepuluh kalimat pengguna, tulis dokumen kebutuhan satu halaman (keluaran minggu ini) dengan paling sedikit lima kebutuhan terukur beserta cara uji, dan pisahkan batasan dari rancangan. Jangan menulis nama atau data pribadi temanmu.
3. `AI: tanpa AI` **Keselamatan.** Tulis satu kebutuhan keselamatan untuk "baterai hampir habis" beserta cara mengujinya tanpa merusak apa pun.
4. `AI: boleh` **Ubah program.** Tambahkan dua kebutuhan ke program, lalu pilih data uji karangan sehingga satu lulus dan satu gagal. Telusuri dulu di kertas sebelum menjalankan.
5. *Opsional:* **catatan pemakaian AI.** Bila memakai AI generatif, tulis kebutuhanmu sendiri dulu, lalu minta kritik "mana yang tidak bisa diuji" dan bukan dokumen jadi. Catat alatnya, tujuanmu, garis besar perintahmu, bagian yang kamu pakai, dan cara memeriksanya. Jangan menaruh data pribadi pada perintah.

## Latihan bercampur

1. Tulis dua kebutuhan terukur untuk pesan sensor berbentuk JSON agar penerima dapat membacanya (dari `c-xi2-m7`).
2. Pemantau suhu kelas harus "tidak kehilangan data". Ubah kalimat itu menjadi kebutuhan yang bisa diuji, dengan memakai pencatatan dari `c-x2-m12`.

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `C-XII1-M2` (sekitar satu minggu lagi), `C-XII1-M4` (sekitar tiga minggu lagi), dan `C-XII1-M9` (sekitar delapan minggu lagi). Jawab sekarang lalu simpan.

1. Mengapa kebutuhan "robot harus cepat" tidak dapat diuji, dan bagaimana menulis ulang agar dapat diuji?
2. Apa beda kebutuhan, batasan, dan rancangan? Beri satu contoh masing-masing pada robot pengantar kotak.
3. Mengapa nilai terburuk, bukan rata-rata, yang dibandingkan dengan batas pada kebutuhan?

## Kesalahan umum

- **Menulis rancangan sebagai kebutuhan.** "Robot memakai sensor ultrasonik" mengikat cara, padahal pengguna butuh "berhenti sebelum menabrak".
- **Kebutuhan tanpa angka atau cara uji.** "Cepat", "awet", dan "aman" belum bisa diuji.
- **Menghitung rata-rata hasil uji.** Satu kegagalan hilang di dalam rata-rata.
- **Menganggap belum diuji sama dengan lulus.** Kebutuhan tanpa data adalah celah.
- **Menulis kebutuhan hanya untuk keadaan normal.** Kebutuhan keselamatan menyatakan perilaku saat sensor, daya, atau sambungan gagal.

## Cek mandiri

- [ ] Saya dapat mengubah kalimat pengguna menjadi kebutuhan dengan angka dan cara uji.
- [ ] Saya dapat membedakan kebutuhan, batasan, dan rancangan.
- [ ] Saya menulis paling sedikit satu kebutuhan keselamatan.
- [ ] Saya memeriksa nilai terburuk dan mencatat kebutuhan yang belum diuji.
- [ ] Saya tidak menulis nama atau data pribadi orang nyata di dokumen kebutuhan.

## Kunci dan petunjuk

**Ingat kembali.** 1: JSON dapat dibaca manusia dan nama kuncinya menjelaskan isi, tetapi lebih panjang dan perlu diurai; format biner ringkas, tetapi sulit dibaca dan penerima harus tahu tata letaknya. 2: alat yang berbahaya bila tak terkendali (motor, pemanas) dimatikan; alat yang melindungi (alarm, kipas pendingin pada suhu tinggi) boleh menyala, karena kegagalan sensor tidak boleh membuat keadaan lebih buruk. 3: kebutuhan menyatakan apa yang harus dipenuhi pengguna (misalnya "suhu ruang tercatat tiap menit"); rancangan menyatakan caranya (sensor dan papan mana).

**Prediksi dulu.** 1: gagal; nilai terburuk 9 (jenis `MINIMUM`, nilai terkecil), dan 9 kurang dari 10. Baris keluarannya `K2 terburuk 9 dari batas 10: GAGAL`. 2: lulus; 40 sama dengan batas dan `MAKSIMUM` memakai kurang dari atau sama dengan. 3: tidak bisa diuji karena "cepat" tidak punya angka. Contoh tulis ulang: "waktu antar A ke B paling lama 40 detik pada lima kali uji".

**Contoh setengah jadi.** Isian berurutan: `==`, `false`, `<=`, `>=`. Kunci yang dikompilasi dan dijalankan penulis menghasilkan keluaran yang sama dengan contoh terselesaikan.

**Soal Parsons.** Urutan benar: b, a, c, d, e, f, g, h (d dan e boleh bertukar). Nilai awal `terburuk` diambil dari elemen pertama, sehingga perulangan mulai dari indeks 1; `return` ada di luar perulangan.

**Latihan.** 1: (a) rancangan; (b) batasan; (c) kebutuhan; (d) batasan; (e) rancangan. 2: tidak ada kunci tunggal; dokumen yang baik memuat angka dan cara uji pada tiap kebutuhan, memisahkan batasan, dan tidak menyebut komponen tertentu. 3: contoh: "bila tegangan baterai turun di bawah batas yang tertulis di lembar data baterai, robot berhenti dan menyalakan penanda; uji dengan sumber tegangan variabel dari guru atau dengan membaca nilai tiruan di komputer". 4: tidak ada kunci tunggal; jawaban yang baik memuat prediksi tertulis sebelum menjalankan program.

**Latihan bercampur.** 1: contoh: "pesan sah bila dapat diurai sebagai JSON, dan nilai yang hilang ditulis `null`"; uji: kirim seratus pesan karangan, nol pesan gagal diurai. 2: contoh: "dari 60 menit pencatatan, jumlah menit yang tidak punya baris data paling banyak 0"; cara uji: hitung baris berkas catatan.

**Ulang berjarak.** 1: "cepat" tidak punya angka sehingga tidak ada hasil uji yang bisa gagal; tulis dengan angka, satuan, dan cara ukur. 2: kebutuhan = apa yang harus dilakukan (berhenti sebelum menabrak); batasan = syarat lingkungan (daya hanya USB atau baterai AA); rancangan = cara (sensor ultrasonik dan dua motor DC). 3: satu kali melanggar berarti sistem belum memenuhi kebutuhan; rata-rata menyembunyikan pelanggaran itu.

## Langkah berikutnya

Modul berikut: `c-xii1-m2` (arsitektur dan pemilihan komponen), yang mengubah dokumen kebutuhan menjadi pilihan komponen. Bacaan pendamping: `pendamping-merancang-kebutuhan-sistem`. Bacaan lanjut: panduan mata pelajaran Informatika (lihat Rujukan).
