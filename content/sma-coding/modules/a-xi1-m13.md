## Untuk siapa modul ini

Modul ini untuk murid kelas XI jalur A (Algoritmik dengan C++), minggu `A-XI1-M13` silabus v1.4.1: proyek mini yang memadukan strategi pada satu masalah. Prasyarat: modul `a-xi1-m12` dan modul strategi yang kamu perlukan, terutama pengurutan dengan pembanding, greedy, dan pencarian lengkap.

Modul ini berstatus DRAF: karangan penyusun, belum ditinjau pemilik. Butir `F-AP-b` dipetakan silabus sebagai dipenuhi jalur ini; modul draf ini belum dihitung sebagai pemenuhan. Penilaian proyek memakai rubrik dari gurumu; modul ini tidak menilai. Semua data di proyek ini **sintetis atau karangan**; jangan memakai data orang atau tempat yang nyata.

## Ingat kembali

Jawab dari ingatan dulu, baru cek di kunci. Soal 1 dari `a-xi1-m12`, soal 2 dari `a-xi1-m10`, soal 3 dari `a-xi1-m5`.

1. Mengapa greedy bisa gagal, dan beri satu contoh voucher yang menunjukkannya?
2. Berapa langkah `push` dan `pop` pada `priority_queue`, dan apa yang tidak bisa dilakukannya?
3. Bagaimana pencarian lengkap pada data kecil dipakai untuk menguji sebuah greedy?

## Tujuan

Setelah modul ini kamu dapat:

- merancang penyelesaian satu masalah dengan dua strategi dan memadukannya (keluaran minggu ini: program dan laporan);
- memakai solusi pencarian lengkap yang lambat untuk memeriksa solusi greedy yang cepat pada data kecil;
- menguji program dengan data biasa dan data batas, lalu melaporkan banyak langkah kedua cara;
- memberi dan menerima umpan balik sejawat yang spesifik.

## Rencana proyek

Tulis rencana satu halaman dengan tujuh bagian: tujuan, masukan, aturan, keluaran, kriteria selesai, daftar uji, dan **prediksi hasil**. Contoh terselesaikan: klub karangan memiliki satu ruang latihan dan `n` permintaan pemakaian dengan jam mulai dan selesai. Dua permintaan boleh berurutan bila yang kedua mulai tepat saat yang pertama selesai. Tujuannya memilih permintaan sebanyak-banyaknya yang tidak bertumpuk.

| Bagian | Isi contoh |
| --- | --- |
| Tujuan | Memilih permintaan sebanyak mungkin tanpa bertumpuk, dan memeriksa jawabannya. |
| Masukan | `n`, lalu `n` pasang `mulai selesai` (bilangan bulat, `mulai < selesai`). |
| Aturan | Cara cepat (greedy): urutkan menurut jam selesai, pilih permintaan yang mulainya tidak lebih awal daripada selesai pilihan terakhir. Cara periksa: backtracking atas semua himpunan bagian untuk `n` kecil. |
| Keluaran | Banyak permintaan terpilih beserta daftarnya, hasil cara periksa, banyak pemanggilan, dan apakah keduanya sama. |
| Kriteria selesai | Hasil greedy dan cara periksa sama pada semua uji; `n = 0` dan `n = 1` ditangani. |
| Daftar uji | Contoh di bawah; `n = 0`; `n = 1`; semua bertumpuk; tidak ada yang bertumpuk; satu permintaan selesai tepat saat yang lain mulai. |
| Prediksi | Greedy memilih 6 permintaan dari 10 pada contoh; cara periksa menemukan 6 juga. |

Pseudocode-nya:

```text
baca n; BILA n = 0: cetak "tidak ada permintaan" lalu selesai
baca n pasang (mulai, selesai)
urutkan menurut selesai (pembanding sendiri)
greedy: akhir <- sangat kecil; untuk tiap permintaan berurutan:
        BILA mulai >= akhir: pilih, akhir <- selesai
periksa: cari(i, akhir, banyak): coba lewati permintaan i, lalu coba pilih bila mulai >= akhir
bandingkan banyak terbaik dengan hasil greedy
```

Programnya (urutkan, greedy, lalu cara periksa dengan backtracking):

```cpp
#include <algorithm>
#include <iostream>
#include <vector>
using namespace std;

struct Minta {
  int mulai;
  int selesai;
};

bool lebihDulu(const Minta& a, const Minta& b) {
  if (a.selesai != b.selesai) {
    return a.selesai < b.selesai;
  }
  return a.mulai < b.mulai;
}

void periksa(const vector<Minta>& m, int i, int akhir, int banyak, int& terbaik, long long& panggilan) {
  panggilan++;
  int n = m.size();
  if (i == n) {
    if (banyak > terbaik) {
      terbaik = banyak;
    }
    return;
  }
  periksa(m, i + 1, akhir, banyak, terbaik, panggilan);
  if (m[i].mulai >= akhir) {
    periksa(m, i + 1, m[i].selesai, banyak + 1, terbaik, panggilan);
  }
}

int main() {
  int n;
  cin >> n;
  if (n == 0) {
    cout << "tidak ada permintaan\n";
    return 0;
  }
  vector<Minta> m(n);
  for (int i = 0; i < n; i++) {
    cin >> m[i].mulai >> m[i].selesai;
  }
  sort(m.begin(), m.end(), lebihDulu);
  int akhir = -1000000;
  int banyak = 0;
  cout << "greedy memilih:";
  for (int i = 0; i < n; i++) {
    if (m[i].mulai >= akhir) {
      banyak++;
      akhir = m[i].selesai;
      cout << " [" << m[i].mulai << "," << m[i].selesai << "]";
    }
  }
  cout << "\n";
  int terbaik = 0;
  long long panggilan = 0;
  periksa(m, 0, -1000000, 0, terbaik, panggilan);
  cout << "greedy: " << banyak << ", periksa: " << terbaik << " (" << panggilan << " pemanggilan), sama: " << (banyak == terbaik ? "ya" : "tidak") << "\n";
}
```

Masukan (`masukan.txt`):

```text
10
0 3
2 4
3 6
5 8
4 5
7 9
8 10
9 12
6 7
1 2
```

Keluaran:

```text
greedy memilih: [1,2] [2,4] [4,5] [6,7] [7,9] [9,12]
greedy: 6, periksa: 6 (416 pemanggilan), sama: ya
```

Cocokkan dengan prediksimu. Perkiraan langkah untuk laporan: pengurutan sekitar `n log n` dan greedy satu putaran `n`, jadi cara cepat `O(n log n)`. Cara periksa memanggil `2^n`-an kali (di sini sekitar `2^11 = 2048` pemanggilan paling banyak, kurang karena pemangkasan `mulai >= akhir`), sehingga hanya layak untuk `n` kecil dan dipakai sebagai pemeriksa, bukan sebagai jawaban akhir.

**Pilihan proyekmu** (pilih satu, atau usulkan ke gurumu): (1) *Muatan:* `n` paket karangan dengan berat dan nilai, kapasitas `W`; bandingkan greedy menurut nilai per berat dengan pencarian lengkap (`n` paling banyak 15) dan, bila sempat, tabel DP kecil. (2) *Rute keliling:* enam titik berkoordinat karangan; bandingkan tetangga terdekat (greedy) dengan mencoba semua urutan kunjungan. Tulis rencana tujuh bagianmu sendiri.

## Daftar periksa

Kerjakan berurutan dan centang bila selesai.

- [ ] Rencana satu halaman ditulis lebih dulu, termasuk prediksi hasil untuk datamu.
- [ ] Pseudocode ditulis sebelum program.
- [ ] Program memakai paling sedikit dua strategi dan satu pembanding atau pengurutan sendiri.
- [ ] Cara lengkap dipakai untuk memeriksa cara cepat pada data kecil, dan hasilnya dicatat.
- [ ] Minimal lima uji: contoh biasa, `n = 0`, `n = 1`, semua bertumpuk atau semua sama, dan satu uji batas buatanmu sendiri; hasilnya dicatat.
- [ ] Laporan memuat banyak langkah atau pemanggilan kedua cara, dihitung oleh programmu.
- [ ] Data sintetis atau karangan; tidak ada data orang atau tempat nyata.
- [ ] Bila memakai AI generatif: catatan pemakaian AI (alat, tujuan, garis besar perintah, bagian yang dipakai, cara memeriksa); kode buatan AI kamu baca, jalankan, dan uji.
- [ ] Laporan singkat satu halaman: tujuan, strategi dan alasan memilihnya, hasil uji, satu hal yang berbeda dari prediksi, dan satu perbaikan berikutnya.

## Umpan balik sejawat

Tukar rencana dan program dengan satu kelompok lain. Beri umpan balik tentang pekerjaan, bukan orangnya, dalam tiga kalimat:

1. **Satu yang sudah baik**, dengan bagian yang kamu tunjuk.
2. **Satu yang perlu diperbaiki**, dengan alasan.
3. **Satu langkah berikutnya** yang bisa dikerjakan minggu depan.

Terima umpan balik dengan mencatat, bukan membela.

## Latihan bercampur

1. `AI: boleh` Ubah syarat `m[i].mulai >= akhir` menjadi `m[i].mulai > akhir`. Apa artinya bagi permintaan yang berurutan, dan data mana yang berubah jawabannya (modul `a-xi1-m12`)?
2. `AI: tanpa AI` Mengapa pengurutan menurut jam selesai, bukan menurut jam mulai, yang dipakai greedy ini? Beri satu contoh kecil yang menunjukkan urutan menurut mulai bisa salah (modul `a-xi1-m5`).
3. `AI: boleh` Tulis pembanding lain yang mengurutkan menurut lama kegiatan (`selesai - mulai`) menaik. Apakah greedy dengan urutan itu selalu benar? Uji dengan cara periksa (modul `a-xi1-m8`).

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `a-xi1-m14` (pertanyaan 1), sekitar tiga minggu lagi di `a-xi2-m2` (pertanyaan 2), dan sekitar delapan minggu lagi di `a-xi2-m7` (pertanyaan 3). Jawab sekarang lalu simpan.

1. Mengapa solusi cepat diperiksa dengan solusi lengkap pada data kecil?
2. Sebutkan empat uji batas untuk program yang memilih dari rentang waktu.
3. Bagaimana memberi umpan balik sejawat yang spesifik dalam tiga kalimat?

## Kesalahan umum

- **Mengurutkan menurut jam mulai.** Satu kegiatan panjang yang mulai paling awal menghalangi banyak kegiatan pendek.
- **Memakai cara periksa untuk `n` besar.** Pemanggilannya berlipat tiap tambah satu data.
- **Memakai `>` padahal berurutan tepat boleh.** Syarat batas menentukan jawaban; tulis aturannya di rencana.
- **Tidak menguji `n = 0` dan `n = 1`.** Program menyentuh elemen yang tidak ada.
- **Menganggap sama pada satu contoh sudah membuktikan benar.** Bandingkan pada banyak data kecil.

## Cek mandiri

- [ ] Saya dapat menyebut aturan, keluaran, dan kriteria selesai proyek saya.
- [ ] Saya menulis pseudocode sebelum program.
- [ ] Saya memeriksa cara cepat dengan cara lengkap pada data kecil.
- [ ] Saya menguji nilai biasa, nilai batas, `n = 0`, dan `n = 1`.
- [ ] Saya dapat memberi umpan balik dalam tiga bagian.

## Kunci dan petunjuk

**Ingat kembali.** 1: karena pilihan terbesar yang tampak terbaik saat itu bisa menutup jalan ke solusi yang lebih baik; contoh voucher `{4, 3, 1}` dengan `T = 6`: greedy 3, benar 2. 2: keduanya `O(log n)`; `priority_queue` tidak dapat mencari elemen sembarang atau menelusuri isinya. 3: jalankan greedy dan pencarian lengkap pada banyak data kecil, lalu bandingkan hasilnya; satu data yang berbeda sudah menjadi contoh tandingan.

**Rencana proyek.** Contoh di atas satu jawaban yang mungkin; rencanamu boleh berbeda selama ketujuh bagian ada dan kriteria selesai dapat diuji. Uji `n = 0` dengan masukan `0` memberi keluaran:

```text
tidak ada permintaan
```

Untuk proyek pilihan: rencana yang baik menyebut aturan yang bisa diperiksa dan prediksi untuk data yang kamu tulis sendiri; kasus kecilnya harus cukup kecil untuk dicoba semua kemungkinannya.

**Daftar periksa.** Tidak ada kunci tunggal; guru memeriksa tiap butir dengan rubrik.

**Umpan balik sejawat.** Umpan balik yang baik menunjuk bagian tertentu, menyebut alasan, dan menawarkan langkah yang bisa dikerjakan. "Bagus" saja bukan umpan balik.

**Latihan bercampur.** 1: dengan `>` dua permintaan yang berurutan tepat (satu selesai pada jam 5, lain mulai pada jam 5) dianggap bertumpuk dan tidak boleh keduanya; pada data contoh jawaban greedy turun dari 6 menjadi 4 (cara periksa ikut 4 karena aturannya sama), sebab pasangan seperti `[4,5]` dan `[5,8]` tidak lagi boleh berurutan. 2: urutan menurut selesai memberi sisa waktu terbanyak bagi permintaan berikutnya; contoh: `[0,10]`, `[1,2]`, `[3,4]`: urut menurut mulai memilih `[0,10]` lebih dulu (1 permintaan) padahal `[1,2]` dan `[3,4]` (2 permintaan) lebih baik. 3: tidak selalu benar; contoh `[0,5]`, `[4,6]`, `[5,10]`: kegiatan terpendek `[4,6]` bertumpuk dengan keduanya sehingga greedy memilih satu, padahal `[0,5]` dan `[5,10]` boleh keduanya (dua). Uji dengan cara periksa untuk memastikan.

**Ulang berjarak.** 1: cara lengkap pasti benar dan sederhana, sehingga bisa menjadi pembanding yang dipercaya untuk solusi cepat yang belum terbukti. 2: contoh: `n = 0`, `n = 1`, semua bertumpuk, tidak ada yang bertumpuk, selesai tepat saat yang lain mulai. 3: satu yang sudah baik (menunjuk bagian), satu yang perlu diperbaiki (dengan alasan), dan satu langkah berikutnya.

## Langkah berikutnya

Modul berikut: `a-xi1-m14` (asesmen dan refleksi semester ini). Semester berikutnya memperdalam DP dan graf. Bacaan lanjut: halaman cppreference tentang `std::sort`.
