## Untuk siapa modul ini

Modul ini untuk murid kelas XI jalur C (IoT dan robotika), minggu `C-XI2-M11` silabus v1.4: prediksi sederhana. Prasyarat: modul `c-xi2-m10` (rekap dan visualisasi); kamu memakai rata-rata dan penjagaan pembagian nol dari modul sebelumnya.

Modul ini berstatus DRAF: karangan penyusun, belum ditinjau pemilik. Ia mendukung butir `F-AD-a` (data terbuka, keputusan, dan prediksi) dan tidak dihitung memenuhi butir capaian pembelajaran mana pun. Keluaran minggu ini: program prediksi. Latihan silabusnya: memprediksi suhu berikutnya dan galatnya.

Seluruh modul ini dapat dikerjakan **tanpa papan**: program berjalan di komputer dengan data karangan. Dengan papan, kamu dapat memakai catatan suhu yang kamu kumpulkan sendiri. Modul ini tidak memakai perangkat fisik; aturan keselamatan dari modul sebelumnya tetap berlaku bila kamu memakai papan.

## Ingat kembali

Jawab dari ingatan dulu, baru cek di kunci. Soal 1 dari `C-XI2-M3`, soal 2 dari `C-XI2-M8`, soal 3 dari `C-XI2-M10`.

1. Apa isi baris pertama permintaan HTTP, dan apa isi baris pertama jawabannya?
2. Sebut lima lapis diagnosis jaringan IoT berurutan, dan satu pengamatan murah untuk tiap lapis.
3. Mengapa sumbu grafik yang tidak dimulai dari nol harus dinyatakan dengan jelas?

## Tujuan

Setelah modul ini kamu dapat:

- menghitung rata-rata bergerak dari `k` nilai terakhir dan memakainya sebagai tebakan nilai berikutnya;
- menghitung garis kecenderungan (kuadrat terkecil) dan memakainya untuk menebak nilai berikutnya;
- mengukur galat prediksi dengan jujur: memakai hanya data sebelum titik yang diprediksi;
- membandingkan dua metode dengan galat mutlak rata-rata dan menyebut keadaan yang membuat masing-masing gagal;
- menyatakan batas sebuah prediksi, bukan menyajikannya sebagai kepastian.

## Prediksi dulu

Suhu per jam (karangan), jam 0 sampai 7: 26,0; 26,8; 27,5; 28,4; 29,0; 29,9; 30,5; 31,2. Program di bawah menebak suhu jam ke-3 sampai ke-7. Pada tiap jam `t`, ia hanya memakai data sebelum jam `t`: rata-rata bergerak tiga nilai terakhir, dan garis lurus yang dicocokkan ke semua nilai sebelumnya. **Tebak dulu, tulis jawabanmu, baru jalankan.**

1. Untuk jam 7, hitung tebakan rata-rata bergerak tiga nilai terakhir (jam 4, 5, 6) dan galatnya terhadap 31,2.
2. Metode mana yang galat mutlak rata-ratanya lebih kecil pada data yang terus naik ini: rata-rata bergerak atau garis tren? Mengapa?
3. Bila suhu naik lalu turun (28, 29, 30, 29, 28), apa yang terjadi pada tebakan garis tren untuk nilai berikutnya?

## Contoh terselesaikan

Prediksi sederhana menebak nilai berikutnya dari nilai-nilai yang sudah ada. **Rata-rata bergerak** memakai rata-rata `k` nilai terakhir; ia meredam derau tetapi **tertinggal** bila data terus naik, karena nilai yang lama ikut dirata-ratakan. **Garis kecenderungan** mencocokkan garis lurus `y = potongan + kemiringan x` ke seluruh data dengan kuadrat terkecil (jumlah kuadrat selisih ke garis dibuat sekecil mungkin), lalu membacanya di `x` berikutnya; ia mengikuti tren, tetapi hanya bila tren itu memang lurus.

Ukur **galat** dengan jujur. Tebakan untuk jam `t` hanya boleh memakai data sebelum `t`; bila kamu ikut memakai nilai jam `t` saat mencocokkan, galatmu tampak kecil secara palsu. Galat mutlak adalah selisih mutlak antara tebakan dan nilai sebenarnya, dan **galat mutlak rata-rata** (MAE) adalah rata-ratanya.

```cpp
// C++17 biasa, jalan di komputer. Diperiksa oleh check:module-code.
#include <cmath>
#include <cstdio>

struct Garis {
  double kemiringan;
  double potongan;
};

// Rata-rata k nilai terakhir dari n nilai; NAN bila datanya kurang.
double rataBergerak(const double y[], int n, int k) {
  if (n < k || k <= 0) return NAN;
  double jumlah = 0;
  for (int i = n - k; i < n; i++) jumlah += y[i];
  return jumlah / k;
}

// Garis lurus y = potongan + kemiringan * x dengan x = 0, 1, ..., n-1 (kuadrat terkecil).
Garis cocokkan(const double y[], int n) {
  if (n < 2) return {0.0, n == 1 ? y[0] : NAN};
  double sx = 0, sy = 0, sxy = 0, sxx = 0;
  for (int i = 0; i < n; i++) {
    sx += i;
    sy += y[i];
    sxy += i * y[i];
    sxx += static_cast<double>(i) * i;
  }
  double penyebut = n * sxx - sx * sx;
  double m = (n * sxy - sx * sy) / penyebut;
  return {m, (sy - m * sx) / n};
}

int main() {
  const int N = 8;
  const int K = 3;
  // Suhu per jam, data karangan dengan kecenderungan naik.
  const double suhu[N] = {26.0, 26.8, 27.5, 28.4, 29.0, 29.9, 30.5, 31.2};

  double jumlahRB = 0;
  double jumlahTren = 0;
  int banyak = 0;
  std::printf("jam  aktual  rata-bergerak(galat)  tren(galat)\n");
  for (int t = K; t < N; t++) {
    double rb = rataBergerak(suhu, t, K);
    Garis g = cocokkan(suhu, t);
    double tren = g.potongan + g.kemiringan * t;
    double galatRB = std::fabs(rb - suhu[t]);
    double galatTren = std::fabs(tren - suhu[t]);
    std::printf("%3d  %6.1f  %6.2f (%4.2f)         %6.2f (%4.2f)\n", t, suhu[t], rb, galatRB, tren,
                galatTren);
    jumlahRB += galatRB;
    jumlahTren += galatTren;
    banyak++;
  }
  std::printf("galat mutlak rata-rata: rata-bergerak %.2f, tren %.2f\n", jumlahRB / banyak,
              jumlahTren / banyak);
}
```

Keluarannya:

```text
jam  aktual  rata-bergerak(galat)  tren(galat)
  3    28.4   26.77 (1.63)          28.27 (0.13)
  4    29.0   27.57 (1.43)          29.15 (0.15)
  5    29.9   28.30 (1.60)          29.82 (0.08)
  6    30.5   29.10 (1.40)          30.63 (0.13)
  7    31.2   29.80 (1.40)          31.33 (0.13)
galat mutlak rata-rata: rata-bergerak 1.49, tren 0.13
```

Rata-rata bergerak selalu menebak terlalu rendah karena data terus naik, dan galatnya sekitar 1,4 derajat. Garis tren hanya meleset sekitar 0,1 derajat karena data memang hampir lurus. Perhatikan bahwa kesimpulan ini berlaku untuk data ini: pada data yang berbalik arah, garis tren akan menebak ke arah yang salah. Pembanding di Python untuk tujuh jam pertama memastikan hitungan garis:

```python
# Python 3.10 ke atas, jalan di komputer: pembanding garis tren untuk tujuh jam pertama.
import statistics

suhu = [26.0, 26.8, 27.5, 28.4, 29.0, 29.9, 30.5, 31.2]
r = statistics.linear_regression(range(7), suhu[:7])
print(f"kemiringan {r.slope:.3f}, potongan {r.intercept:.2f}")
print(f"prediksi jam 7: {r.intercept + r.slope * 7:.2f}, aktual {suhu[7]}")
```

Keluarannya:

```text
kemiringan 0.757, potongan 26.03
prediksi jam 7: 31.33, aktual 31.2
```

Hasil 31,33 sama dengan program C++ pada jam ke-7. Satu prediksi satu langkah ke depan dengan data yang rapi boleh dipercaya sebatas galat yang sudah diukur; menebak jauh ke depan (misalnya 12 jam lagi dengan garis ini) berarti memperpanjang garis melewati data yang kamu punya, dan suhu harian akan berbalik arah. Prediksi juga tidak tahu apa pun di luar datanya.

## Contoh setengah jadi

Lengkapi `cocokkan` agar memakai rumus kuadrat terkecil dengan benar.

```cpp setengah-jadi
// C++17. Lengkapi bagian ____.
struct Garis {
  double kemiringan;
  double potongan;
};

Garis cocokkan(const double y[], int n) {
  double sx = 0, sy = 0, sxy = 0, sxx = 0;
  for (int i = 0; i < n; i++) {
    sx += i;
    sy += y[i];
    sxy += i * y[i];
    sxx += static_cast<double>(i) * i;
  }
  double penyebut = n * sxx - ____ * sx;
  double m = (n * sxy - sx * ____) / penyebut;
  return {m, (sy - m * ____) / n};
}
```

## Soal Parsons

Susun baris-baris di bawah (sudah diacak) menjadi `rataBergerak`: kembalikan `NAN` bila data kurang dari `k`, selain itu rata-rata `k` nilai terakhir.

```text
(a)   double jumlah = 0;
(b)   if (n < k || k <= 0) return NAN;
(c)   for (int i = n - k; i < n; i++) jumlah += y[i];
(d) double rataBergerak(const double y[], int n, int k) {
(e)   return jumlah / k;
(f) }
```

## Latihan

1. `AI: tanpa AI` **Hitung tangan.** Data 20, 22, 21, 25. Hitung tebakan rata-rata bergerak `k = 3` untuk nilai berikutnya. Bila nilai sebenarnya 26, berapa galat mutlaknya?
2. `AI: boleh` **Pseudocode dulu.** Tulis pseudocode lalu tambahkan ke program tebakan untuk jam 8 dari seluruh delapan data dengan kedua metode. Sebutkan tiga kasus uji, termasuk data yang kurang dari `k`.
3. `AI: tanpa AI` **Data berbalik arah.** Data 28, 29, 30, 29, 28. Garis tren yang dicocokkan ke kelima nilai itu mendatar (kemiringan 0). Berapa tebakannya untuk nilai berikutnya dan berapa galatnya bila nilai sebenarnya 27? Berapa tebakan rata-rata bergerak `k = 3` dan galatnya? Apa yang kamu simpulkan?
4. `AI: boleh` **Prediksi suhu berikutnya dan galatnya.** Ganti `suhu` dengan catatanmu sendiri atau data karangan dari gurumu (tanpa data pribadi, sekurangnya delapan nilai), jalankan, dan tulis dua kalimat tentang metode mana yang lebih baik dan mengapa.
5. *Opsional:* **catatan pemakaian AI.** Bila memakai AI generatif, kerjakan nomor 3 sendiri dulu, lalu minta kritik atas kesimpulanmu, bukan jawaban jadi. Catat alat, tujuan, garis besar perintah, bagian yang dipakai, dan cara memeriksanya. Jangan menaruh sandi, kunci, atau data pribadi pada perintah.

## Latihan bercampur

1. Satu pembacaan di tengah data hilang (`NAN`). Apa yang terjadi pada rata-rata bergerak yang jendelanya memuat `NAN`, dan bagaimana menanganinya sesuai `C-XI2-M9`? (dari `C-XI2-M9`)
2. Rata-rata tiap jam dari rekap `C-XI2-M10` dipakai sebagai data masukan prediksi. Mengapa jumlah pembacaan sah `n` per jam penting diketahui sebelum mempercayai prediksinya? (dari `C-XI2-M10`)

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `C-XI2-M12` (sekitar satu minggu lagi), `C-XI2-M14` (sekitar tiga minggu lagi), dan `C-XII1-M5` (sekitar delapan minggu lagi). Jawab sekarang lalu simpan.

1. Mengapa rata-rata bergerak menebak terlalu rendah pada data yang terus naik?
2. Mengapa galat prediksi harus dihitung hanya dari data sebelum titik yang diprediksi?
3. Sebut satu keadaan yang membuat garis tren menebak jauh meleset.

## Kesalahan umum

- **Mengintip nilai yang diprediksi.** Mencocokkan garis dengan data yang ikut berisi titik target membuat galat tampak kecil secara palsu.
- **Menarik garis jauh ke depan.** Garis tren hanya sah di sekitar data; suhu harian berbalik arah.
- **Memilih `k` besar untuk "lebih halus".** `k` besar meredam derau tetapi menambah ketertinggalan.
- **Tidak menjaga data kurang dari `k` atau kurang dari dua titik.** Pembagian nol atau penyebut nol menghasilkan hasil tak bermakna.
- **Menyebut prediksi sebagai kepastian.** Prediksi menyertakan galat yang sudah diukur dan batas datanya.

## Cek mandiri

- [ ] Saya dapat menghitung rata-rata bergerak dan memakainya sebagai tebakan.
- [ ] Saya dapat menjelaskan garis kecenderungan dan membaca nilainya di titik berikutnya.
- [ ] Saya menghitung galat hanya dengan data sebelum titik yang diprediksi.
- [ ] Saya dapat membandingkan dua metode dengan galat mutlak rata-rata.
- [ ] Saya dapat menyebut keadaan yang membuat masing-masing metode gagal.

## Kunci dan petunjuk

**Ingat kembali.** 1: baris permintaan berisi metode, jalur, dan versi (mis. `POST /suhu HTTP/1.1`); baris jawaban berisi versi, kode status, dan teks (mis. `HTTP/1.1 200 OK`). 2: daya (lampu menyala), sinyal (status Wi-Fi dan RSSI), alamat (cetak alamat dan bandingkan dengan jaringan broker), broker (status sambungan klien), format (periksa pesan dengan pemeriksa JSON). 3: karena panjang batang tampak sebagai nilai; sumbu yang dipotong membuat beda kecil tampak besar, jadi pembaca perlu tahu.

**Prediksi dulu.** 1: (29,0 + 29,9 + 30,5) / 3 = 29,8; galat |29,8 - 31,2| = 1,4. 2: garis tren; data hampir lurus sehingga garis mengikutinya, sedangkan rata-rata bergerak memuat nilai lama yang lebih rendah dan selalu tertinggal. Dihitung penulis: 1,49 lawan 0,13. 3: garis tren mendatar dan menebak sekitar nilai rata-rata, tidak mengenali bahwa suhu sedang turun.

**Contoh setengah jadi.** Isian berurutan: `sx`, `sy`, lalu `sx`. Hasil kunci yang dikompilasi penulis memberi tebakan jam ke-7 yang sama dengan contoh terselesaikan (31,33).

**Soal Parsons.** Urutan benar: d, b, a, c, e, f. Penjagaan data kurang dari `k` harus sebelum perulangan agar tidak membaca di luar larik.

**Latihan.** 1: (22 + 21 + 25) / 3 = 22,67 (dibulatkan); galat |22,67 - 26| = 3,33. 2: pseudocode: panggil `rataBergerak` dan `cocokkan` dengan `n = 8`, baca garis di `x = 8`; hasil penulis: rata-rata bergerak 30,53, garis tren 32,02; kasus uji: data kurang dari `k` mengembalikan `NAN`, `n = 1` untuk `cocokkan`, dan data yang semuanya sama (kemiringan 0). 3: tebakan garis tren 28,8, galat |28,8 - 27| = 1,8; tebakan rata-rata bergerak (30 + 29 + 28) / 3 = 29, galat 2,0. Keduanya meleset pada data yang berbalik arah; tidak ada metode yang selalu benar. 4: tidak ada kunci tunggal; jawaban yang baik menyebut galat kedua metode dan sifat datanya.

**Latihan bercampur.** 1: satu `NAN` membuat jumlah dan rata-rata menjadi `nan`; lewati pembacaan yang hilang dan catat jumlahnya, atau tolak jendela yang berisi pembacaan hilang. 2: rata-rata dari sedikit pembacaan sah kurang kuat dan prediksi di atasnya mewarisi ketidakpastian itu.

**Ulang berjarak.** 1: karena nilai lama yang lebih rendah ikut dirata-ratakan, sehingga hasilnya tertinggal di bawah tren. 2: bila titik yang diprediksi ikut dipakai saat mencocokkan, galat tampak kecil secara palsu. 3: data yang berbalik arah, misalnya suhu setelah puncak harian, atau menarik garis jauh melewati data.

## Langkah berikutnya

Modul berikut: `c-xi2-m12` (keputusan otomatis berbasis data), yang mengaitkan hasil analisis tren ke aktuator. Pembacaan lanjut: dokumentasi `statistics.linear_regression` pada pustaka standar Python dan pengantar rata-rata bergerak dari NIST.
