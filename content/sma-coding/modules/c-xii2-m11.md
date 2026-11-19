## Untuk siapa modul ini

Modul ini untuk murid kelas XII jalur C (IoT dan robotika), minggu `C-XII2-M11` silabus v1.4: proyek akhir, pengujian akhir. Prasyarat terindeks: `c-xii2-m10`. Kamu memakai kebutuhan dari rancangan `C-XII2-M5`, rilis kandidat `c-xii2-m9`, dan lembar uji `C-XII2-M6` yang belum terindeks saat modul ini ditulis.

Modul ini berstatus DRAF: karangan penyusun, belum ditinjau pemilik. Ia mendukung butir `F-BK-a` dan tidak dihitung memenuhi butir capaian pembelajaran mana pun. Keluaran minggu ini: laporan uji. Latihan silabusnya: uji penerimaan.

Perhitungan dan laporan dikerjakan di komputer; uji lari dan uji lama pakai robot bila ada, dan bila tidak ada, pakai data karangan seperti di bawah. Keselamatan perangkat: uji lari di meja atau lintasan yang aman dengan tombol berhenti terpasang; uji lama beroperasi dengan roda terangkat atau diawasi; daya baterai AA/AAA dari guru; berhenti bila tegangan di bawah ambang atau ada bagian panas atau berbau. Angka pada contoh hanya karangan.

## Ingat kembali

Jawab dari ingatan dulu, baru cek kunci. Soal 1 dan 4 dari `c-xii2-m10`, soal 2 dari `c-xii2-m8`, soal 3 dari `c-xii2-m3`.

1. Apa beda catatan WAJIB, SARAN, dan Nit?
2. Mengapa catatan yang tertimpa harus dilaporkan, bukan dibiarkan diam-diam?
3. Apa peran histeresis bila sensor berderau?
4. Mengapa nilai tepat di batas harus ada pada data uji?

## Tujuan

Setelah modul ini kamu dapat:

- menulis protokol uji yang dapat diulang orang lain sebelum menguji;
- menguji sistem terhadap tiap kebutuhan dan melaporkan nilai terburuk, bukan hanya rata-rata;
- memberi putusan per kebutuhan dan menjelaskannya, termasuk yang gagal;
- menghasilkan laporan uji (keluaran minggu ini).

## Rencana sprint

Pengujian akhir bertanya satu hal: apakah sistem memenuhi **kebutuhan yang ditulis di rancangan**? **Uji penerimaan** memakai batas kebutuhan itu sebagai ukuran, dan batas itu **tidak diubah setelah kamu melihat hasil**. Aturannya: tulis protokol (lintasan, baterai, jumlah ulang, penguji, tanggal) dan prediksi lebih dulu; catat semua nilai, juga yang buruk, dan jangan mengulang diam-diam lari yang jelek; laporkan terburuk, jumlah gagal, dan putusan per kebutuhan. Tulis **prediksi** dulu: pada data karangan di bawah, berapa dari empat kebutuhan terukur yang akan ditolak?

```cpp
// C++17 biasa, jalan di komputer. Diperiksa oleh check:module-code.
// Uji penerimaan: hasil uji karangan dibandingkan dengan batas kebutuhan, dilaporkan jujur
// (terburuk, bukan hanya rata-rata) dan dilacak ke kebutuhan. Semua angka KARANGAN, bukan hasil robot nyata.
#include <iostream>
#include <vector>

struct Hasil {
  const char *kebutuhan;
  const char *ukuran;
  std::vector<int> nilai;
  int batas;
  bool lebihKecilLebihBaik;  // true: nilai harus <= batas; false: nilai harus >= batas
};

int terburuk(const Hasil &h) {
  int t = h.nilai[0];
  for (int v : h.nilai) {
    if (h.lebihKecilLebihBaik ? v > t : v < t) {
      t = v;
    }
  }
  return t;
}

int main() {
  std::vector<Hasil> daftar = {
      {"K1", "waktu 2 m (detik), 10 lari", {34, 36, 33, 41, 35, 34, 37, 35, 36, 34}, 40, true},
      {"K2", "simpangan terbesar (mm), 10 lari", {18, 22, 19, 26, 21, 20, 23, 18, 22, 19}, 25, true},
      {"K3", "berhenti saat garis hilang (1 ya, 0 tidak), 5 uji", {1, 1, 1, 1, 1}, 1, false},
      {"K4", "lama beroperasi (menit), 1 uji", {27}, 30, false},
  };
  int ditolak = 0;
  for (const Hasil &h : daftar) {
    int jumlah = 0;
    int gagal = 0;
    for (int v : h.nilai) {
      jumlah += v;
      bool lulus = h.lebihKecilLebihBaik ? v <= h.batas : v >= h.batas;
      if (!lulus) {
        gagal++;
      }
    }
    int t = terburuk(h);
    bool diterima = gagal == 0;
    std::cout << h.kebutuhan << " " << h.ukuran << ": rata-rata " << jumlah / static_cast<int>(h.nilai.size())
              << ", terburuk " << t << ", batas " << h.batas << ", gagal " << gagal << " dari " << h.nilai.size()
              << " -> " << (diterima ? "DITERIMA" : "DITOLAK") << "\n";
    if (!diterima) {
      ditolak++;
    }
  }
  std::cout << "K5 tanpa data pribadi: diperiksa dengan tabel data, bukan angka\n";
  std::cout << "kebutuhan ditolak: " << ditolak << " dari 4 yang diukur\n";
}
```

Keluaran program (dijalankan penulis dengan `g++ -std=c++17`):

```text
K1 waktu 2 m (detik), 10 lari: rata-rata 35, terburuk 41, batas 40, gagal 1 dari 10 -> DITOLAK
K2 simpangan terbesar (mm), 10 lari: rata-rata 20, terburuk 26, batas 25, gagal 1 dari 10 -> DITOLAK
K3 berhenti saat garis hilang (1 ya, 0 tidak), 5 uji: rata-rata 1, terburuk 1, batas 1, gagal 0 dari 5 -> DITERIMA
K4 lama beroperasi (menit), 1 uji: rata-rata 27, terburuk 27, batas 30, gagal 1 dari 1 -> DITOLAK
K5 tanpa data pribadi: diperiksa dengan tabel data, bukan angka
kebutuhan ditolak: 3 dari 4 yang diukur
```

Bacalah dengan jujur. Rata-rata K1 (35 detik) dan K2 (20 mm) tampak aman, tetapi kebutuhan K1 dan K2 berbicara tentang setiap lari: lari ke-4 melanggar keduanya, dan hanya nilai terburuk yang memperlihatkannya. Putusannya **DITOLAK**, bukan "hampir lulus". Tindak lanjutnya ada dua jalan: perbaiki lalu uji ulang seluruh protokol (kembali ke langkah `c-xii2-m9`), atau, bila waktu habis, putuskan **DITERIMA BERSYARAT** dengan daftar yang belum beres di laporan. Mengubah batas supaya lulus hanya sah bila alasannya tertulis beserta tanggal dan batas semula tetap dilaporkan. Dengan sepuluh lari kesimpulan masih lemah: satu lari buruk bisa kebetulan, atau tanda kelemahan nyata; itu alasan menambah uji, bukan membuang lari ke-4.

## Daftar periksa

Kerjakan berurutan; tiap titik periksa harus dapat ditunjukkan kepada orang lain.

1. `AI: tanpa AI` **Protokol.** Tulis kondisi uji: lintasan, baterai, jumlah ulang, penguji, dan tanggal. Titik periksa: orang lain dapat mengulangnya.
2. `AI: tanpa AI` **Prediksi.** Tulis nilai dan putusan yang kamu harapkan untuk tiap kebutuhan. Titik periksa: bertanggal sebelum menguji.
3. `AI: boleh` **Uji dan catat.** Jalankan protokol dan catat semua nilai, termasuk yang buruk. Titik periksa: jumlah nilai yang tercatat sama dengan jumlah lari yang dilakukan.
4. `AI: boleh` **Laporan.** Tulis rata-rata, terburuk, jumlah gagal, dan putusan per kebutuhan. Titik periksa: tiap kebutuhan menunjuk uji dan tiap uji menunjuk kebutuhan.
5. `AI: boleh` **Putusan dan tindak lanjut.** Putuskan DITERIMA, DITERIMA BERSYARAT, atau DITOLAK dengan alasan, dan tulis tindak lanjut. Titik periksa: perubahan batas, bila ada, tercatat dengan tanggal dan alasan.
6. *Opsional:* **catatan pemakaian AI.** Bila memakai AI generatif untuk merapikan laporan, tulis dulu angkamu sendiri, lalu minta kritik, bukan laporan jadi; AI tidak boleh membuat angka. Catat alatnya, tujuanmu, garis besar perintahmu, bagian yang kamu pakai, dan cara memeriksanya. Jangan menaruh data pribadi pada perintah.

## Umpan balik sejawat

Tukar laporan uji dengan kelompok lain. Beri masukan: **satu yang sudah baik**, **satu yang perlu diperbaiki** (sebut butirnya, misalnya "K2 hanya melaporkan rata-rata"), dan **satu langkah berikutnya**. Ulasan berpasangan ini praktik yang layak dicoba, bukan jaminan hasil (buktinya paling banyak pada mahasiswa).

## Latihan bercampur

1. Dari `c-xii2-m6`: apa saja yang harus ada pada protokol uji agar sama kuatnya dengan lembar uji tahap perakitan?
2. Dari `c-xii2-m4`: apakah data yang dicatat pada ujimu memuat pengenal orang? Bagaimana kamu memeriksanya, dan apa yang tidak dibuktikan oleh pemeriksaan itu?

## Ulang berjarak

Pertanyaan 1 dan 2 akan muncul lagi di `Ingat kembali` modul `C-XII2-M12` (sekitar satu minggu lagi), dan pertanyaan 3 di `C-XII2-M14` (sekitar tiga minggu lagi). Jawab sekarang lalu simpan.

1. Mengapa laporan uji memuat nilai terburuk, bukan hanya rata-rata?
2. Apa yang dilakukan bila hasil uji gagal dan waktu tinggal sedikit?
3. Mengapa batas kebutuhan tidak boleh diubah diam-diam setelah melihat hasil?

## Kesalahan umum

- **Melaporkan rata-rata saja.** Satu lari yang melanggar tersembunyi.
- **Mengulang lari yang jelek tanpa mencatatnya.** Laporan menjadi lebih indah daripada kenyataan.
- **Mengubah batas setelah melihat hasil.**
- **Menyimpulkan dari satu uji.** Nyatakan batas kepastiannya.

## Cek mandiri

- [ ] Protokol ujiku ditulis sebelum menguji dan dapat diulang orang lain.
- [ ] Prediksiku bertanggal sebelum menguji.
- [ ] Laporanku memuat terburuk, jumlah gagal, dan putusan per kebutuhan.
- [ ] Tiap kebutuhan menunjuk uji dan sebaliknya.

## Kunci dan petunjuk

**Ingat kembali.** 1: WAJIB melanggar kebutuhan, keselamatan, atau privasi dan harus diperbaiki; SARAN membuat lebih mudah dirawat; Nit hal kecil yang boleh diabaikan. 2: supaya orang yang memakai data tahu ada bagian yang hilang dan tidak menyimpulkan dari data yang tidak utuh. 3: ia memberi dua ambang berbeda sehingga derau kecil di sekitar satu ambang tidak membuat keluaran bolak-balik. 4: kesalahan batas (`<` melawan `<=`) hanya tertangkap oleh nilai tepat di batas.

**Rencana sprint.** Prediksi: K1, K2, dan K4 ditolak, K3 diterima; jadi 3 dari 4 (keluaran program membenarkannya). Jumlah K1: 34+36+33+41+35+34+37+35+36+34 = 355, dibagi 10 = 35 (dipangkas); K2: 208 dibagi 10 = 20. Lari ke-4 (41 detik dan 26 mm) yang melanggar.

**Daftar periksa.** Rubrik singkat: nomor 1 lima unsur protokol; nomor 2 prediksi bertanggal; nomor 3 jumlah nilai sama dengan jumlah lari; nomor 4 terburuk dan jumlah gagal ada, bukan hanya rata-rata; nomor 5 putusan beralasan dan perubahan batas bertanggal; nomor 6 opsional.

**Umpan balik sejawat.** Umpan balik yang baik menyebut butir, bukan kesan umum, dan memberi langkah yang bisa dikerjakan minggu depan.

**Latihan bercampur.** 1: tanggal, kondisi (lintasan, baterai), prediksi, hasil, dan penguji, serta jumlah ulang. 2: periksa tabel data dan program untuk kolom nama, kontak, atau lokasi; "tidak ada temuan" hanya berarti tidak ada pola yang diperiksa yang cocok, bukan bahwa tidak ada masalah lain.

**Ulang berjarak.** 1: kebutuhan berbicara tentang setiap lari, dan rata-rata menyembunyikan lari yang melanggar. 2: laporkan apa adanya; perbaiki dan uji ulang bila ada waktu, atau putuskan DITERIMA BERSYARAT dengan daftar yang belum beres. 3: supaya hasil tidak disesuaikan dengan batas; perubahan sah hanya bila tertulis dengan tanggal dan alasan, dan batas semula tetap dilaporkan.

## Langkah berikutnya

Modul berikut: `C-XII2-M12` (dokumentasi akhir). Bacaan lanjut: praktik inti "menguji, menyempurnakan" pada Panduan Mata Pelajaran Informatika (lihat Rujukan).
