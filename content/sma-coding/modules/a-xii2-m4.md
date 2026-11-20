## Untuk siapa modul ini

Modul ini untuk murid kelas XII jalur A (Algoritmik dengan C++), minggu `A-XII2-M4` silabus v1.4.1: backtracking dan pruning lanjutan, yaitu memangkas ruang pencarian dengan cerdas. Prasyarat: modul `a-xii2-m3` (memodelkan masalah) dan `a-xi1-m11` (backtracking).

Modul ini berstatus DRAF: karangan penyusun, belum ditinjau pemilik. Silabus tidak memetakan butir capaian pembelajaran untuk minggu ini, jadi modul ini tidak dihitung memenuhi butir CP apa pun. Keluarga materi OSN yang bertaut: `rekursi` (rekursi, divide-and-conquer, backtracking); jembatan OSN tidak menandainya pengayaan, sehingga modul ini tak punya bagian `Pengayaan (P)`. Modul tidak menjanjikan kedalaman soal OSN dan tidak menggantikan pembinaan OSN.

Tiap soal latihan bertanda `AI: boleh` atau `AI: tanpa AI`. Masukan program diberikan lewat berkas: `./program < masukan.txt`. Semua soal karangan.

## Ingat kembali

Jawab dari ingatan dulu, baru cek di kunci. Soal 1 dari `a-xii2-m3`, soal 2 dari `a-xii2-m1`, soal 3 dari `a-xii1-m10`.

1. Apa empat pertanyaan yang dijawab saat memodelkan soal cerita, dan kapan memilih graf, kapan DP?
2. Sebutkan tiga bau kode dan satu perbaikan untuk masing-masing.
3. Sebutkan tiga kasus pada kueri rekursif segment tree.

## Tujuan

Setelah modul ini kamu dapat:

- menyebut pruning sebagai pembuangan cabang pencarian yang pasti tak menghasilkan jawaban;
- memasang tiga jenis pangkasan: periksa batasan segera, batas dari sisa pilihan, dan urutan pilihan yang menguntungkan;
- menghitung banyak simpul pencarian untuk membuktikan pangkasan bekerja;
- membuktikan pangkasan tidak mengubah jawaban (keluaran minggu ini: program backtracking).

## Prediksi dulu

Ini tugas baca-dan-prediksi, `AI: tanpa AI`. **Tebak dulu, tulis jawabanmu, baru jalankan.** Program menjelajah pohon pilihan "ambil atau lewati" untuk tiga nilai `5 4 3` dengan target 5, dan menghitung banyak simpul yang dikunjungi, tanpa pangkas lalu dengan pangkas (hentikan cabang bila jumlah sudah melebihi target).

```cpp
#include <iostream>
using namespace std;

int simpul = 0;

void jelajah(int i, int jumlah, int n, const int nilai[], int target, bool pangkas) {
  simpul++;
  if (i == n) {
    return;
  }
  if (pangkas && jumlah > target) {
    return;
  }
  jelajah(i + 1, jumlah + nilai[i], n, nilai, target, pangkas);
  jelajah(i + 1, jumlah, n, nilai, target, pangkas);
}

int main() {
  const int nilai[3] = {5, 4, 3};
  jelajah(0, 0, 3, nilai, 5, false);
  cout << simpul << " ";
  simpul = 0;
  jelajah(0, 0, 3, nilai, 5, true);
  cout << simpul << "\n";
}
```

1. Berapa simpul tanpa pangkas, dan mengapa angkanya `2^(n+1) - 1`?
2. Tebak: lebih sedikit atau sama banyak simpul dengan pangkas, dan berapa?

## Contoh terselesaikan

Keluaran program tadi:

```text
15 13
```

Tanpa pangkas pohonnya penuh: `1 + 2 + 4 + 8 = 15`. Dengan pangkas, simpul "ambil 5, ambil 4" (jumlah 9) tetap dikunjungi sekali lalu dihentikan, sehingga dua daun di bawahnya hilang: `15 - 2 = 13`. Hasilnya hanya sedikit lebih hemat karena pohonnya kecil; manfaat besar baru tampak pada ukuran yang lebih besar.

**Prinsip pruning: buang cabang yang pasti gagal, dan jangan pernah membuang cabang yang mungkin berhasil.** Tiga alat, dari yang paling dasar:

1. **Periksa batasan sedini mungkin.** Begitu semua sel sebuah batasan terisi, periksa saat itu juga, jangan menunggu daun.
2. **Batas dari sisa pilihan.** Bila jumlah sekarang ditambah *seluruh* sisa yang mungkin pun tak mencapai target, atau sudah melewatinya (nilai positif), cabang itu dibuang.
3. **Urutan pilihan.** Mencoba pilihan yang paling cepat memicu pangkasan lebih dulu memperkecil pohon tanpa mengubah jawaban.

**Teka-teki angka pertama.** Isi kotak 3x3 dengan angka 1 sampai 9 (tiap angka sekali) sehingga tiap baris, kolom, dan kedua diagonal berjumlah 15. Tingkat 0 baru memeriksa di daun; tingkat 1 memeriksa baris begitu penuh; tingkat 2 memeriksa semua delapan garis begitu penuh. Tanpa pangkas, simpul pohon permutasi berjumlah `sum 9!/(9-k)!` untuk `k` 0 sampai 9, yaitu 986410.

```cpp
#include <algorithm>
#include <iostream>
using namespace std;

const int GARIS[8][3] = {{0, 1, 2}, {3, 4, 5}, {6, 7, 8}, {0, 3, 6}, {1, 4, 7}, {2, 5, 8}, {0, 4, 8}, {2, 4, 6}};

int petak[9];
bool dipakai[10];
long long simpul;
int solusi;

bool garisSah(int g) {
  return petak[GARIS[g][0]] + petak[GARIS[g][1]] + petak[GARIS[g][2]] == 15;
}

// Tingkat 0: tanpa pangkas. Tingkat 1: garis baris dicek begitu penuh.
// Tingkat 2: semua garis (baris, kolom, diagonal) dicek begitu penuh.
bool lolos(int pos, int tingkat) {
  int garisDicek = tingkat == 0 ? 0 : (tingkat == 1 ? 3 : 8);
  for (int g = 0; g < garisDicek; g++) {
    int terakhir = max(GARIS[g][0], max(GARIS[g][1], GARIS[g][2]));
    if (terakhir == pos && !garisSah(g)) {
      return false;
    }
  }
  return true;
}

void isi(int pos, int tingkat) {
  simpul++;
  if (pos == 9) {
    bool semua = true;
    for (int g = 0; g < 8; g++) {
      semua = semua && garisSah(g);
    }
    if (semua) {
      solusi++;
    }
    return;
  }
  for (int v = 1; v <= 9; v++) {
    if (dipakai[v]) {
      continue;
    }
    dipakai[v] = true;
    petak[pos] = v;
    if (lolos(pos, tingkat)) {
      isi(pos + 1, tingkat);
    }
    dipakai[v] = false;
  }
}

int main() {
  for (int tingkat = 0; tingkat <= 2; tingkat++) {
    simpul = 0;
    solusi = 0;
    isi(0, tingkat);
    cout << "tingkat " << tingkat << ": " << solusi << " solusi, " << simpul << " simpul\n";
  }
}
```

Keluaran:

```text
tingkat 0: 8 solusi, 986410 simpul
tingkat 1: 8 solusi, 8770 simpul
tingkat 2: 8 solusi, 2378 simpul
```

Ketiganya menemukan 8 solusi yang sama (rotasi dan pencerminan satu kotak ajaib), tetapi simpulnya turun dari 986.410 menjadi 8770 lalu 2378, sekitar 415 kali lebih sedikit untuk tingkat 2. Pangkasan ini aman karena sebuah garis yang sudah penuh dan tak berjumlah 15 membuat semua isian lanjutan pasti gagal.

**Teka-teki angka kedua.** Dari 16 bilangan karangan, hitung banyak himpunan bagian berjumlah tepat 30, dengan pangkas jumlah melebihi target (semua nilai positif), pangkas "sisa tak cukup", dan urutan menurun.

```cpp
#include <algorithm>
#include <functional>
#include <iostream>
#include <vector>
using namespace std;

long long simpul;
int banyak;

// pangkas 0: tanpa; 1: jumlah melebihi target; 2: ditambah "sisa tak cukup"
void cari(int i, int jumlah, const vector<int>& a, const vector<int>& sisa, int target, int pangkas) {
  simpul++;
  if (i == static_cast<int>(a.size())) {
    if (jumlah == target) {
      banyak++;
    }
    return;
  }
  if (pangkas >= 1 && jumlah > target) {
    return;
  }
  if (pangkas >= 2 && jumlah + sisa[i] < target) {
    return;
  }
  cari(i + 1, jumlah + a[i], a, sisa, target, pangkas);
  cari(i + 1, jumlah, a, sisa, target, pangkas);
}

void jalankan(vector<int> a, int target, int pangkas, bool urutMenurun) {
  if (urutMenurun) {
    sort(a.begin(), a.end(), greater<int>());
  }
  vector<int> sisa(a.size() + 1, 0);
  for (int i = static_cast<int>(a.size()) - 1; i >= 0; i--) {
    sisa[i] = sisa[i + 1] + a[i];
  }
  simpul = 0;
  banyak = 0;
  cari(0, 0, a, sisa, target, pangkas);
  cout << "pangkas " << pangkas << (urutMenurun ? ", menurun" : ", asal") << ": " << banyak << " himpunan, " << simpul
       << " simpul\n";
}

int main() {
  vector<int> a = {3, 34, 4, 12, 5, 2, 9, 7, 15, 8, 21, 6, 1, 11, 10, 13};
  int target = 30;
  jalankan(a, target, 0, false);
  jalankan(a, target, 1, false);
  jalankan(a, target, 2, false);
  jalankan(a, target, 2, true);
}
```

Keluaran:

```text
pangkas 0, asal: 164 himpunan, 131071 simpul
pangkas 1, asal: 164 himpunan, 8271 simpul
pangkas 2, asal: 164 himpunan, 7923 simpul
pangkas 2, menurun: 164 himpunan, 1685 simpul
```

Jawabannya sama, 164, pada keempat baris; hanya simpulnya yang berubah dari 131.071 (`2^17 - 1`) menjadi 1685, sekitar 78 kali lebih sedikit. Urutan menurun membantu karena nilai besar memicu "jumlah melebihi target" lebih cepat; urutan itu mengubah banyak simpul, bukan jawaban. Pangkasan pertama memberi penghematan terbesar di sini; kedua dan ketiga menambahnya. Pencarian ini tetap eksponensial dalam kasus terburuk (`O(2^n)`), dan pangkasan hanya menggeser angka di praktik, bukan jaminan pertumbuhan.

## Contoh setengah jadi

Lengkapi pangkasan pada pencarian yang mengisi empat kotak dengan angka 1..9 berbeda yang berjumlah 20, dengan batasan tambahan: dua kotak bersebelahan tak boleh berselisih tepat 1. Kuncinya ada di `Kunci dan petunjuk`.

```cpp setengah-jadi
  for (int v = 1; v <= 9; v++) {
    if (dipakai[v]) {
      continue;
    }
    if (pos > 0 && abs(v - kotak[____]) == ____) {
      continue;
    }
    if (pangkas && jumlah + v > ____) {
      continue;
    }
    dipakai[v] = true;
    kotak[pos] = v;
    isi(pos + 1, jumlah + v, pangkas);
    dipakai[v] = ____;
  }
```

## Soal Parsons

Susun enam baris berikut (sudah diacak, tanpa lekuk) menjadi satu langkah pilih-jelajahi-batalkan di dalam perulangan. `AI: tanpa AI`.

```text
(a) isi(pos + 1, jumlah + v);
(b) dipakai[v] = false;
(c) dipakai[v] = true;
(d) kotak[pos] = v;
(e) if (dipakai[v]) continue;
(f) if (jumlah + v > 20) continue;
```

## Latihan

1. `AI: boleh` **Empat kotak.** Tulis pseudocode lebih dulu, lalu program soal contoh setengah jadi: banyak susunan empat angka berbeda 1..9 berjumlah 20 tanpa dua kotak bersebelahan berselisih 1. Bandingkan banyak simpul dengan dan tanpa pangkas jumlah.
2. `AI: tanpa AI` **Hitung tangan.** Berapa simpul pohon "ambil atau lewati" untuk `n = 4` tanpa pangkas, dan berapa untuk `n = 10`?
3. `AI: boleh` **Pangkas sisa.** Tambahkan pangkas "sisa tak cukup" pada nomor 1: jumlah sekarang ditambah angka terbesar yang mungkin untuk kotak yang tersisa tak mencapai 20. Apakah jawabannya berubah, dan mengapa?
4. `AI: boleh` **Urutan pilihan.** Pada subset-sum, kapan mengurutkan menurun tidak membantu? Beri satu contoh data.
5. *Opsional:* **catatan pemakaian AI.** Bila memakai AI generatif, kerjakan nomor 2 sendiri dulu, lalu minta penjelasan atau petunjuk bertahap, bukan program jadi. Catat alatnya, tujuanmu, garis besar perintahmu, bagian yang kamu pakai, dan caramu memeriksanya. Jangan menaruh data pribadi atau tugas bernilai pada perintah.

## Latihan bercampur

1. `AI: tanpa AI` Mengapa pencarian lengkap `2^n` dengan `n = 16` masih layak (131.071 simpul) tetapi dengan `n = 60` tidak (modul `a-xi1-m4`)?
2. `AI: boleh` Soal genteng di modul `a-xii2-m3` dapat dikerjakan dengan backtracking atau DP. Bandingkan banyak langkah keduanya untuk `n = 40` dan tentukan mana yang masuk akal.
3. `AI: boleh` Pada contoh kotak ajaib, mengapa DP tidak cocok, dan apa ciri soal yang membuat backtracking lebih cocok (modul `a-xi2-m1`)?

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `a-xii2-m5` (pertanyaan 1), sekitar tiga minggu lagi di `a-xii2-m7` (pertanyaan 2), dan sekitar delapan minggu lagi di `a-xii2-m12` (pertanyaan 3). Jawab sekarang lalu simpan.

1. Sebutkan tiga cara memangkas ruang pencarian dan syarat agar pangkasan itu aman.
2. Mengapa pangkasan tidak boleh mengubah jawaban, dan bagaimana membuktikannya pada sebuah program?
3. Mengapa urutan pilihan memengaruhi banyak simpul yang dikunjungi tetapi tidak jawabannya?

## Kesalahan umum

- **Memangkas cabang yang mungkin berhasil.** Pangkasan salah mengubah jawaban; bandingkan dengan versi tanpa pangkas pada ukuran kecil.
- **Menghitung solusi di setiap simpul.** Himpunan yang sama bisa terhitung berkali-kali; hitung di daun (atau saat keputusan terakhir).
- **Lupa membatalkan pilihan.** `dipakai[v]` dan `kotak[pos]` harus kembali ke keadaan semula setelah panggilan rekursif.
- **Mengira pangkasan mengubah kelas kerumitan.** Kasus terburuk tetap eksponensial; pangkasan hanya mengurangi pekerjaan nyata.
- **Pangkas "sisa tak cukup" pada nilai negatif.** Pangkasan itu hanya sah bila semua nilai tak negatif.

## Cek mandiri

- [ ] Saya dapat menyebut tiga jenis pangkasan beserta syarat amannya.
- [ ] Saya dapat menghitung banyak simpul pohon pencarian dengan dan tanpa pangkas.
- [ ] Saya dapat membuktikan pangkasan tak mengubah jawaban lewat perbandingan.
- [ ] Saya dapat menulis pola pilih, jelajahi, batalkan dengan benar.
- [ ] Saya dapat menyebut mengapa urutan pilihan mengubah simpul tetapi tidak jawaban.

## Kunci dan petunjuk

**Ingat kembali.** 1: keadaan (apa yang berubah), transisi (bagaimana berpindah), pertanyaan (apa yang diminta), dan alat; pilih graf bila perlu jarak atau keterhubungan dengan perpindahan yang bisa berputar, pilih DP bila jawaban tersusun dari keadaan yang lebih kecil dan perpindahan hanya maju. 2: contoh: nama tak bermakna (beri nama jelas), angka ajaib (jadikan konstanta), variabel global (jadikan parameter), salinan kode (jadikan fungsi). 3: rentang simpul di luar kueri (kembalikan nilai netral), rentang simpul berada penuh di dalam kueri (kembalikan nilai simpul itu), dan sebagian (tanyakan kedua anak lalu gabungkan hasilnya).

**Prediksi dulu.** 1: `15`; tiap tingkat pohon menggandakan simpul: `1 + 2 + 4 + 8 = 2^4 - 1`. 2: lebih sedikit, 13.

**Contoh setengah jadi.** Isi: `pos - 1`, `1`, `20`, dan `false`. Perhatikan `dipakai[v] = false` sesudah panggilan rekursif: itulah langkah membatalkan.

**Soal Parsons.** Urutan: e, f, c, d, a, b. Dua pemeriksaan dulu (angka sudah dipakai, jumlah melebihi), lalu pilih (`dipakai`, `kotak`), jelajahi (`isi`), dan batalkan (`dipakai[v] = false`). Ini cuplikan langkah, bukan program utuh.

**Latihan.** 1: pseudocode: `isi(pos, jumlah): jika pos = 4, hitung bila jumlah = 20; untuk tiap v dari 1..9 yang belum dipakai dan tidak berselisih 1 dengan kotak sebelumnya, dan (bila pangkas) jumlah + v <= 20, pilih v, panggil isi(pos + 1), batalkan`. Program lengkap:

```cpp
#include <cstdlib>
#include <iostream>
using namespace std;

int kotak[4];
bool dipakai[10];
long long simpul;
int banyak;

void isi(int pos, int jumlah, bool pangkas) {
  simpul++;
  if (pos == 4) {
    if (jumlah == 20) {
      banyak++;
    }
    return;
  }
  for (int v = 1; v <= 9; v++) {
    if (dipakai[v]) {
      continue;
    }
    if (pos > 0 && abs(v - kotak[pos - 1]) == 1) {
      continue;
    }
    if (pangkas && jumlah + v > 20) {
      continue;
    }
    dipakai[v] = true;
    kotak[pos] = v;
    isi(pos + 1, jumlah + v, pangkas);
    dipakai[v] = false;
  }
}

int main() {
  isi(0, 0, false);
  cout << "tanpa pangkas jumlah: " << banyak << " susunan, " << simpul << " simpul\n";
  banyak = 0;
  simpul = 0;
  isi(0, 0, true);
  cout << "dengan pangkas jumlah: " << banyak << " susunan, " << simpul << " simpul\n";
}
```

Keluaran:

```text
tanpa pangkas jumlah: 152 susunan, 1692 simpul
dengan pangkas jumlah: 152 susunan, 1088 simpul
```

Jawabannya sama, 152; simpulnya turun dari 1692 menjadi 1088. Cek: perhitungan terpisah atas semua permutasi empat angka dari sembilan juga memberi 152. 2: `2^5 - 1 = 31` untuk `n = 4` dan `2^11 - 1 = 2047` untuk `n = 10`. 3: batas atas sisa tak mengubah jawaban asalkan memang batas atas yang sah (tak pernah lebih kecil dari yang bisa dicapai); ia hanya membuang cabang yang pasti gagal. 4: bila semua nilai sama, urutan tak mengubah apa pun; contoh: enam belas nilai 1 dan target 10.

**Latihan bercampur.** 1: sekitar 131.071 simpul masih cepat; `2^60` sekitar `10^18` simpul tak selesai dalam waktu wajar. 2: backtracking: sekitar jumlah susunan itu sendiri, yang tumbuh sangat cepat; DP: sekitar `2n = 80` langkah; DP masuk akal. 3: DP cocok bila submasalah tumpang-tindih dan keadaan kecil; di kotak ajaib keadaan (angka mana sudah dipakai) berjumlah `2^9` dan batasan melibatkan banyak sel sekaligus; backtracking dengan pemeriksaan batasan cocok untuk batasan kombinatorik yang menolak isian sebagian.

## Langkah berikutnya

Modul berikutnya, `a-xii2-m5` (latihan terpadu I), seluruhnya tanpa AI: kamu memilih sendiri strategi dan struktur data tepat. Modul terkait: `matkom-induksi-dan-rekursi-matematis`. Bacaan lanjut: halaman cppreference tentang `std::vector` dan `std::sort`.
