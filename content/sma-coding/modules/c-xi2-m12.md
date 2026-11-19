## Untuk siapa modul ini

Modul ini untuk murid kelas XI jalur C (IoT dan robotika), minggu `C-XI2-M12` silabus v1.4: keputusan otomatis berbasis data (F). Prasyarat: modul `c-xi2-m11` (prediksi sederhana). Kamu juga memakai keputusan ambang dan histeresis dari semester sebelumnya (`c-xi1-m5` dan `c-xi1-m6`).

Modul ini berstatus DRAF: karangan penyusun, belum ditinjau pemilik. Ia mendukung butir `F-AD-a` (data terbuka, keputusan, dan prediksi) dan tidak dihitung memenuhi butir capaian pembelajaran mana pun. Keluaran minggu ini: sistem keputusan. Latihan silabusnya: kipas menyala dari tren suhu.

Ada dua cara mengerjakan. **Dengan papan (F):** kelompok menghubungkan kipas kecil lewat modul pengendali sesuai lembar guru. **Tanpa papan:** kamu menjalankan program keputusan di komputer dengan data karangan dan menelusuri keluarannya. Semua bagian pokok bisa dikerjakan tanpa papan; yang tidak teruji adalah perilaku kipas, derau, dan waktu sungguhan. Nomor pin dan ambang pada contoh hanya contoh `[belum terverifikasi]` untuk rangkaianmu.

## Keselamatan perangkat

- Daya hanya dari kabel USB atau baterai AA/AAA yang disediakan guru. Tidak ada listrik jaringan (220 V), tidak ada baterai litium tanpa pelindung, dan kamu tidak mengisi daya litium.
- Kipas **tidak** disambung langsung ke pin papan. Kipas kecil bertegangan rendah dijalankan lewat modul pengendali sesuai lembar guru; pin papan hanya mengirim sinyal ke modul itu.
- Cabut daya sebelum mengubah rangkaian dan periksa polaritas. Tidak ada kewajiban solder.
- Jangan menyentuh baling-baling saat kipas menyala, dan pasang kipas di meja yang rata dengan kabel tidak menjuntai.
- Untuk menaikkan suhu sensor saat uji, genggam sensor atau hembuskan udara hangat dari mulut; jangan memakai pengering rambut, korek, atau pemanas.
- Papan atau modul yang terasa panas, berbau, atau berasap: cabut daya dan panggil guru. Tidak ada kamera atau mikrofon, dan tidak ada sensor tubuh atau lokasi pribadi.

## Ingat kembali

Jawab dari ingatan dulu, baru cek di kunci. Soal 1 dari `C-XI2-M4`, soal 2 dari `C-XI2-M11`, soal 3 dari `C-XI2-M9`.

1. Mengapa halaman data di jaringan lab tidak dibuka ke internet?
2. Mengapa rata-rata bergerak menebak terlalu rendah pada data yang terus naik?
3. Mengapa pasangan data yang salah satunya hilang dilewati, bukan dihitung sebagai 0?

## Tujuan

Setelah modul ini kamu dapat:

- mengubah hasil analisis (tebakan dari garis tren) menjadi keputusan hidup-mati untuk aktuator;
- memakai dua batas (histeresis) agar kipas tidak berganti-ganti saat tebakan berayun di sekitar batas;
- menulis fungsi keputusan yang murni (tanpa pin) supaya dapat diuji di komputer;
- menentukan dan membenarkan keadaan aman bila sensor gagal dibaca beberapa kali;
- menelusuri keputusan sepanjang urutan data dan menjelaskan mengapa kipas menyala lebih awal dari batas.

## Prediksi dulu

Fungsi `putuskan(kipas, prediksi)` menyalakan kipas bila tebakan suhu berikutnya **lebih dari 29,5**, mematikannya bila **kurang dari 28,5**, dan di antaranya membiarkan keadaan terakhir. Kipas awalnya mati. Tebakan datang berurutan: 28,9; 29,75; 29,40; 28,05; 28,9. **Tebak dulu, tulis jawabanmu, baru jalankan atau telusuri.**

1. Tulis keadaan kipas (nyala atau mati) setelah tiap tebakan.
2. Pada menit tertentu suhu aktual 29,1, di bawah 29,5, tetapi kipas sudah menyala. Apa penjelasannya?
3. Sensor gagal dibaca tiga kali berturut-turut. Menurutmu kipas pendingin sebaiknya menyala atau mati, dan mengapa?

## Contoh terselesaikan

Sistem keputusan memiliki tiga bagian yang sebaiknya dipisah: **membaca** data (sensor), **memutuskan** (fungsi murni dari data ke keadaan), dan **bertindak** (menulis ke pin). Pemisahan ini membuat bagian tengah dapat diuji di komputer tanpa papan. Keputusan di sini memakai **tebakan** dari garis tren `K` pembacaan terakhir (dari `C-XI2-M11`), bukan suhu sekarang: bila suhu naik, kipas menyala sebelum batas terlewati. Dua batas (29,5 untuk menyala dan 28,5 untuk mati) membentuk pita histeresis seperti di `c-xi1-m6`, supaya tebakan yang berayun di sekitar satu batas tidak membuat kipas berkedip.

Bagian yang paling mudah dilupakan adalah **keadaan aman**. Bila sensor gagal tiga kali berturut-turut, data lama tidak dipercaya lagi. Apa keadaan amannya bergantung pada bahaya alatnya: pemanas dimatikan karena panas berlebih berbahaya, sedangkan kipas pendingin kecil tidak berbahaya bila menyala terus, sehingga keadaan aman kipas adalah **menyala**. Pilihanmu harus ditulis beserta alasannya. Program berikut menjalankan seluruh logika dengan data karangan yang mencakup tiga kegagalan.

```cpp
// C++17 biasa, jalan di komputer. Diperiksa oleh check:module-code.
#include <cmath>
#include <cstdio>

const int K = 4;                      // panjang jendela pembacaan
const double NYALA_DI_ATAS = 29.5;    // prediksi di atas ini: kipas menyala
const double MATI_DI_BAWAH = 28.5;    // prediksi di bawah ini: kipas mati
const int GAGAL_MAKS = 3;             // gagal berturut-turut sebelum keadaan aman

// Keputusan murni: tanpa pin, sehingga mudah diuji di komputer.
bool putuskan(bool kipas, double prediksi) {
  if (prediksi > NYALA_DI_ATAS) return true;
  if (prediksi < MATI_DI_BAWAH) return false;
  return kipas;  // di antara kedua batas: tetap
}

// Tebakan nilai berikutnya dari garis lurus pada n nilai (x = 0 ... n-1), dibaca di x = n.
double prediksiTren(const double w[], int n) {
  double sx = 0, sy = 0, sxy = 0, sxx = 0;
  for (int i = 0; i < n; i++) {
    sx += i;
    sy += w[i];
    sxy += i * w[i];
    sxx += static_cast<double>(i) * i;
  }
  double m = (n * sxy - sx * sy) / (n * sxx - sx * sx);
  return (sy - m * sx) / n + m * n;
}

struct Pengendali {
  double jendela[K] = {};
  int terisi = 0;
  int gagal = 0;
  bool kipas = false;
  double prediksi = NAN;

  void terima(double suhu) {
    prediksi = NAN;
    if (std::isnan(suhu)) {
      gagal++;
      if (gagal >= GAGAL_MAKS) {
        kipas = true;  // keadaan aman untuk kipas pendingin: menyala
        terisi = 0;    // jendela lama tidak dipercaya; isi ulang dulu
      }
      return;
    }
    gagal = 0;
    if (terisi < K) {
      jendela[terisi++] = suhu;
    } else {
      for (int i = 0; i < K - 1; i++) jendela[i] = jendela[i + 1];
      jendela[K - 1] = suhu;
    }
    if (terisi == K) {
      prediksi = prediksiTren(jendela, K);
      kipas = putuskan(kipas, prediksi);
    }
  }
};

int main() {
  // Suhu per menit, data karangan.
  const double suhu[] = {27.0, 27.6, 28.3, 29.1, 29.8, 30.2, 30.0, 29.3, 28.5,
                         27.9, NAN,  NAN,  NAN,  28.0, 27.8, 27.5, 27.2, 27.0};
  Pengendali p;
  std::printf("menit  suhu  prediksi  kipas\n");
  int menit = 0;
  for (double s : suhu) {
    p.terima(s);
    if (std::isnan(s)) {
      std::printf("%5d     -         -  %s\n", menit, p.kipas ? "nyala" : "mati");
    } else if (std::isnan(p.prediksi)) {
      std::printf("%5d  %4.1f         -  %s\n", menit, s, p.kipas ? "nyala" : "mati");
    } else {
      std::printf("%5d  %4.1f  %8.2f  %s\n", menit, s, p.prediksi, p.kipas ? "nyala" : "mati");
    }
    menit++;
  }
}
```

Keluarannya:

```text
menit  suhu  prediksi  kipas
    0  27.0         -  mati
    1  27.6         -  mati
    2  28.3         -  mati
    3  29.1     29.75  nyala
    4  29.8     30.55  nyala
    5  30.2     30.95  nyala
    6  30.0     30.55  nyala
    7  29.3     29.40  nyala
    8  28.5     28.05  mati
    9  27.9     27.15  mati
   10     -         -  mati
   11     -         -  mati
   12     -         -  nyala
   13  28.0         -  nyala
   14  27.8         -  nyala
   15  27.5         -  nyala
   16  27.2     26.95  mati
   17  27.0     26.70  mati
```

Telusuri tiga kejadian. Pada menit 3 suhu 29,1 masih di bawah batas, tetapi tebakannya 29,75 sehingga kipas menyala lebih awal: itulah gunanya keputusan berbasis tren. Pada menit 7 tebakan 29,40 berada di dalam pita, jadi kipas **tetap** menyala. Pada menit 12 kegagalan ketiga membawa kipas ke keadaan aman, dan baru pada menit 16, setelah jendela terisi lagi empat pembacaan sah, keputusan kembali memakai data. Perhatikan juga batasnya: tebakan satu langkah dari empat titik mudah terkecoh satu lonjakan, dan program ini tidak memeriksa pembacaan yang tak masuk akal (mis. 85 derajat). Penyaring dari `C-X2-M10` dapat dipasang sebelum keputusan.

Sketsa berikut memakai logika yang sama pada papan. Ia hanya diperiksa sintaksnya terhadap header tiruan, tidak dijalankan pada papan. `bacaSuhu()` masih pengganti sementara yang bernilai `NAN`, sehingga kipas akan masuk ke keadaan aman sampai kamu mengganti isinya dengan pembacaan sensormu.

```arduino
// Arduino-C++ untuk ESP32. Diperiksa check:module-code terhadap header tiruan (sintaks dan tipe saja, bukan bukti perilaku papan).
const int PIN_KIPAS = 26;  // masuk ke modul pengendali kipas, bukan ke kipas; periksa papanmu
const unsigned long SELANG_MS = 2000;
const int K = 4;
const float NYALA_DI_ATAS = 29.5;
const float MATI_DI_BAWAH = 28.5;
const int GAGAL_MAKS = 3;

float jendela[K];
int terisi = 0;
int gagal = 0;
bool kipas = false;
unsigned long mulai = 0;

// Pengganti sementara: isi dengan pembacaan sensor suhu dari modul sebelumnya.
// Selama masih NAN, kipas masuk ke keadaan aman (menyala) setelah tiga kegagalan.
float bacaSuhu() {
  return NAN;
}

float prediksiTren(const float* w, int n) {
  float sx = 0, sy = 0, sxy = 0, sxx = 0;
  for (int i = 0; i < n; i++) {
    sx += i;
    sy += w[i];
    sxy += i * w[i];
    sxx += (float)i * i;
  }
  float m = (n * sxy - sx * sy) / (n * sxx - sx * sx);
  return (sy - m * sx) / n + m * n;
}

bool putuskan(bool sekarang, float prediksi) {
  if (prediksi > NYALA_DI_ATAS) return true;
  if (prediksi < MATI_DI_BAWAH) return false;
  return sekarang;
}

void terima(float suhu) {
  if (isnan(suhu)) {
    gagal++;
    if (gagal >= GAGAL_MAKS) {
      kipas = true;
      terisi = 0;
    }
    return;
  }
  gagal = 0;
  if (terisi < K) {
    jendela[terisi++] = suhu;
  } else {
    for (int i = 0; i < K - 1; i++) jendela[i] = jendela[i + 1];
    jendela[K - 1] = suhu;
  }
  if (terisi == K) {
    kipas = putuskan(kipas, prediksiTren(jendela, K));
  }
}

void setup() {
  Serial.begin(115200);
  pinMode(PIN_KIPAS, OUTPUT);
  digitalWrite(PIN_KIPAS, LOW);
  mulai = millis();
}

void loop() {
  if (millis() - mulai >= SELANG_MS) {
    mulai += SELANG_MS;
    terima(bacaSuhu());
    digitalWrite(PIN_KIPAS, kipas ? HIGH : LOW);
    Serial.println(kipas ? "kipas nyala" : "kipas mati");
  }
}
```

## Contoh setengah jadi

Lengkapi `putuskan` agar memakai kedua batas dan menjaga keadaan di antaranya.

```cpp setengah-jadi
// C++17. Lengkapi bagian ____.
const double NYALA_DI_ATAS = 29.5;
const double MATI_DI_BAWAH = 28.5;

bool putuskan(bool kipas, double prediksi) {
  if (prediksi ____ NYALA_DI_ATAS) return true;
  if (prediksi ____ MATI_DI_BAWAH) return ____;
  return kipas;
}
```

## Soal Parsons

Susun baris-baris di bawah (sudah diacak) menjadi awal fungsi `terima`: pembacaan gagal dihitung, keadaan aman dipicu bila gagal berturut-turut mencapai batas, dan pembacaan sah mengatur ulang hitungan.

```text
(a)   gagal = 0;
(b)   if (std::isnan(suhu)) {
(c)     return;
(d) void terima(double suhu) {
(e)     gagal++;
(f)     if (gagal >= GAGAL_MAKS) kipas = true;
(g)   }
```

## Latihan

1. `AI: tanpa AI` **Telusuri.** Kipas awalnya nyala. Tebakan datang berurutan 29,0; 28,4; 29,0; 29,6. Tulis keadaan kipas setelah tiap tebakan (batas 29,5 dan 28,5).
2. `AI: boleh` **Pseudocode dulu.** Tulis pseudocode lalu tambahkan **pembatas keselamatan** ke program: bila suhu aktual lebih dari 32,0, kipas menyala tanpa memandang tebakan. Sebutkan tiga kasus uji, termasuk tepat 32,0 dan 32,1.
3. `AI: tanpa AI` **Keadaan aman.** Tentukan keadaan aman bila sensor gagal untuk (a) kipas pendingin kecil, (b) pemanas LED simulasi seperti di `c-xi1-m13`, (c) pompa kecil yang mengisi bak. Tulis alasan tiap pilihan dalam satu kalimat. Mengapa `GAGAL_MAKS` bukan 1 dan bukan 100?
4. `AI: boleh` **Dengan papan (F).** Hubungkan modul pengendali kipas sesuai lembar guru, ganti `bacaSuhu()` dengan pembacaan sensor, lalu uji dengan menggenggam sensor. Catat pada menit berapa kipas menyala dan apakah suhu aktual sudah melewati batas saat itu. Jangan menyambung kipas langsung ke pin papan.
5. *Opsional:* **catatan pemakaian AI.** Bila memakai AI generatif, kerjakan nomor 3 sendiri dulu, lalu minta kritik atas alasanmu, bukan jawaban jadi. Catat alat, tujuan, garis besar perintah, bagian yang dipakai, dan cara memeriksanya. Jangan menaruh sandi, kunci, atau data pribadi pada perintah.

## Latihan bercampur

1. Pada menit 4 tebakan 30,55, sedangkan suhu aktual menit berikutnya 30,2. Berapa galat tebakan itu, dan mengapa kipas tetap menyala? (dari `C-XI2-M11`)
2. Serial mencetak "kipas nyala" tetapi baling-baling diam. Urutkan tiga hal pertama yang kamu periksa, dan jelaskan mengapa kodenya paling akhir. (dari `C-XI2-M8`)

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `C-XI2-M13` (sekitar satu minggu lagi), `C-XII1-M1` (sekitar tiga minggu lagi), dan `C-XII1-M6` (sekitar delapan minggu lagi). Jawab sekarang lalu simpan.

1. Mengapa keputusan kipas memakai dua batas (histeresis), bukan satu?
2. Sebut satu alat yang harus mati dan satu alat yang boleh menyala saat sensor gagal, dengan alasan.
3. Mengapa fungsi keputusan dipisahkan dari pembacaan sensor dan penulisan pin?

## Kesalahan umum

- **Memakai satu batas.** Tebakan yang berayun di sekitar batas membuat kipas berkedip dan menyusahkan perangkat.
- **Tidak menentukan keadaan aman.** Saat sensor gagal, sistem bertahan pada keputusan terakhir yang mungkin sudah usang.
- **Menyamakan keadaan aman semua alat.** Keadaan aman bergantung pada bahaya alatnya.
- **Mencampur logika dan pin.** Fungsi yang menyentuh pin tidak dapat diuji di komputer.
- **Percaya penuh pada tebakan.** Satu lonjakan dapat memicu keputusan; pasang penyaring dan pembatas keselamatan.

## Cek mandiri

- [ ] Saya dapat mengubah tebakan tren menjadi keputusan hidup-mati dengan dua batas.
- [ ] Saya menulis fungsi keputusan yang murni dan mengujinya di komputer.
- [ ] Saya menentukan keadaan aman dan menuliskan alasannya.
- [ ] Saya dapat menelusuri keputusan sepanjang urutan data.
- [ ] Saya tahu aturan keselamatan untuk menyambung kipas lewat modul pengendali.

## Kunci dan petunjuk

**Ingat kembali.** 1: siapa pun di internet dapat mencobanya, sedangkan server ini tidak punya sandi dan dibuat untuk data karangan. 2: karena nilai lama yang lebih rendah ikut dirata-ratakan, sehingga hasilnya tertinggal di bawah tren. 3: 0 adalah nilai nyata, sedangkan hilang berarti tidak diketahui; menghitungnya sebagai 0 menciptakan selisih palsu.

**Prediksi dulu.** 1: mati, nyala, nyala, mati, mati. Tebakan 28,9 berada di dalam pita sehingga kipas tetap mati; 29,75 melewati 29,5 sehingga menyala; 29,40 di dalam pita sehingga tetap menyala; 28,05 di bawah 28,5 sehingga mati; 28,9 di dalam pita sehingga tetap mati. 2: keputusan memakai tebakan tren, bukan suhu sekarang; suhu yang naik membuat tebakan lebih tinggi daripada suhu aktual. 3: kipas pendingin sebaiknya menyala; bila tidak ada data, menyala terus tidak berbahaya, sedangkan mati bisa membiarkan ruang menjadi panas.

**Contoh setengah jadi.** Isian berurutan: `>`, `<`, lalu `false`. Hasil kunci yang dikompilasi dan dijalankan penulis: tebakan 29,6 menyalakan kipas, 28,4 mematikannya, dan 29,0 menjaga keadaan terakhir.

**Soal Parsons.** Urutan benar: d, b, e, f, c, g, a. Perhitungan gagal berada di dalam cabang `isnan`, `return` mengakhiri cabang itu, dan `gagal = 0` hanya dijalankan untuk pembacaan sah.

**Latihan.** 1: 29,0 di dalam pita sehingga tetap nyala; 28,4 di bawah 28,5 sehingga mati; 29,0 tetap mati; 29,6 di atas 29,5 sehingga nyala. 2: pseudocode: bila `suhu > 32.0` nyalakan kipas dan lewati keputusan tren, selain itu panggil `putuskan`; kasus uji: 32,0 (tidak melebihi, keputusan tren yang berlaku), 32,1 (nyala), tebakan turun tetapi suhu 33 (tetap nyala). Batas tepat harus diuji. 3: (a) menyala karena tidak berbahaya dan menjaga suhu; (b) mati karena panas berlebih berbahaya; (c) mati, karena pompa yang menyala terus dapat meluapkan bak. `GAGAL_MAKS` 1 membuat satu pembacaan gagal sesaat memicu keadaan aman (kipas menyala tanpa perlu); 100 membuat sistem buta terlalu lama; nilai di antaranya adalah kompromi yang kamu tuliskan alasannya. 4: tidak ada kunci tunggal; jawaban yang baik mencatat menit, suhu aktual, dan tebakan saat kipas menyala.

**Latihan bercampur.** 1: galat |30,55 - 30,2| = 0,35; kipas tetap menyala karena tebakan 30,55 jauh di atas 29,5 dan suhu aktual 30,2 pun masih di atas batas, jadi galat sebesar itu tidak mengubah keputusan. 2: daya modul dan kipas, sambungan kabel, lalu kode; kode terakhir karena tampilan "kipas nyala" sudah membuktikan keputusan di kode berjalan, sedangkan daya dan kabel paling murah diperiksa dan paling sering bermasalah (urutan dari `C-XI2-M8`).

**Ulang berjarak.** 1: agar tebakan yang berayun di sekitar satu batas tidak membuat kipas berganti-ganti; pita di antara dua batas menjaga keadaan terakhir. 2: pemanas harus mati karena panas berlebih berbahaya; kipas pendingin kecil boleh menyala karena menyala terus tidak berbahaya. 3: agar keputusan dapat diuji di komputer tanpa papan, dan agar satu bagian dapat diubah tanpa merusak bagian lain.

## Langkah berikutnya

Modul berikut: `c-xi2-m13` (proyek: sistem IoT lokal), yang menyatukan pengiriman data, analisis, dan keputusan. Pembacaan lanjut: halaman GPIO pada dokumentasi Arduino-ESP32 milik Espressif.
