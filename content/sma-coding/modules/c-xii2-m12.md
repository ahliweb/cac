## Untuk siapa modul ini

Modul ini untuk murid kelas XII jalur C (IoT dan robotika), minggu `C-XII2-M12` silabus v1.4: proyek akhir, dokumentasi akhir. Prasyarat terindeks: `c-xii2-m11`. Kamu memakai laporan uji minggu lalu, tabel pin dari `C-XII2-M6`, dan rancangan `C-XII2-M5` yang belum terindeks saat modul ini ditulis.

Modul ini karangan penyusun dan disetujui pemilik program pada 2026-11-20 (keputusan lewat dialog; catatan tinjauan menjadi tindak lanjut revisi). Ia mendukung butir `F-BK-a` dan tidak dihitung memenuhi butir capaian pembelajaran mana pun. Keluaran minggu ini: dokumen proyek. Latihan silabusnya: panduan pengguna.

Dengan papan atau tanpa papan, dokumen ditulis dan diuji di komputer dan di kertas. Keselamatan perangkat: panduan perakitan harus memuat aturan sprint 1 (daya USB atau baterai AA/AAA dari guru, tanpa listrik 220 V atau solder, cabut daya sebelum mengubah rangkaian, roda terangkat, tombol berhenti). Nomor pin pada contoh hanya contoh `[belum terverifikasi]` untuk papanmu.

## Ingat kembali

Jawab dari ingatan dulu, baru cek kunci. Soal 1 dan 2 dari `c-xii2-m11`, soal 3 dan 4 dari `c-xii2-m9`, soal 5 dari `c-xii2-m4`.

1. Mengapa laporan uji memuat nilai terburuk, bukan hanya rata-rata?
2. Apa yang dilakukan bila hasil uji gagal dan waktu tinggal sedikit?
3. Apa yang dilakukan bila "perbaikan" membuat satu uji gagal?
4. Apa beda rilis kandidat dengan rilis akhir?
5. Apa arti "tidak ada temuan" pada pemindai, dan apa yang tidak dibuktikannya?

## Tujuan

Setelah modul ini kamu dapat:

- menentukan dokumen yang dibutuhkan, pembacanya, dan tujuannya;
- membangkitkan tabel pin dari sumber yang sama dengan program;
- menulis panduan perakitan dan panduan pengguna yang dapat diikuti orang yang tidak ikut membuatnya;
- menulis daftar yang belum beres, nomor versi, dan riwayat perubahan;
- menghasilkan dokumen proyek (keluaran minggu ini).

## Rencana sprint

Dokumen yang baik dibuat untuk **pembaca tertentu** yang akan memakainya tanpa kamu. Untuk robot proyek ini ada enam: panduan perakitan (untuk orang yang merakit), panduan pengguna (untuk guru lab fiktif yang menjalankan), laporan uji (`C-XII2-M11`), matriks keterlacakan (kebutuhan ke uji), catatan keselamatan dan privasi, serta riwayat perubahan dengan nomor versi. Kriteria selesainya: tiap dokumen punya pembaca, nomor versinya sama dengan versi program, dan **orang lain berhasil memakainya** (merakit atau menelusuri) tanpa bertanya kepadamu.

Dokumen yang menyalin angka dari program akan basi begitu program berubah. Karena itu angka yang ada di program dibangkitkan dari satu sumber. Tulis **prediksi** dulu: program berikut mencetak tabel pin dari daftar bernama dan memeriksa pin kembar. Berapa peringatan yang muncul, dan pin mana?

```cpp
// C++17 biasa, jalan di komputer. Diperiksa oleh check:module-code.
// Satu sumber untuk program dan dokumen: daftar pin bernama membangkitkan tabel pin berformat Markdown
// dan memeriksa pin kembar. Semua nomor pin adalah CONTOH; periksa papanmu `[belum terverifikasi]`.
#include <iostream>

struct Pin {
  const char *nama;
  int nomor;
  const char *arah;
  const char *fungsi;
};

const Pin DAFTAR[] = {
    {"PIN_SENSOR_0", 32, "masuk", "sensor garis paling kiri"},
    {"PIN_SENSOR_4", 36, "masuk", "sensor garis paling kanan"},
    {"PIN_BERHENTI", 4, "masuk", "tombol berhenti ke GND"},
    {"PIN_KIRI_IN1", 17, "keluar", "arah motor kiri"},
    {"PIN_KIRI_PWM", 27, "keluar", "kecepatan motor kiri"},
    {"PIN_KANAN_PWM", 27, "keluar", "kecepatan motor kanan"},
};

int main() {
  const int n = sizeof(DAFTAR) / sizeof(DAFTAR[0]);
  std::cout << "| Nama | Pin | Arah | Fungsi |\n| --- | --- | --- | --- |\n";
  for (const Pin &p : DAFTAR) {
    std::cout << "| " << p.nama << " | " << p.nomor << " | " << p.arah << " | " << p.fungsi << " |\n";
  }
  int kembar = 0;
  for (int i = 0; i < n; i++) {
    for (int j = i + 1; j < n; j++) {
      if (DAFTAR[i].nomor == DAFTAR[j].nomor) {
        std::cout << "PERINGATAN: pin " << DAFTAR[i].nomor << " dipakai " << DAFTAR[i].nama << " dan "
                  << DAFTAR[j].nama << "\n";
        kembar++;
      }
    }
  }
  std::cout << "pin kembar: " << kembar << "\n";
}
```

Keluaran program (dijalankan penulis dengan `g++ -std=c++17`):

```text
| Nama | Pin | Arah | Fungsi |
| --- | --- | --- | --- |
| PIN_SENSOR_0 | 32 | masuk | sensor garis paling kiri |
| PIN_SENSOR_4 | 36 | masuk | sensor garis paling kanan |
| PIN_BERHENTI | 4 | masuk | tombol berhenti ke GND |
| PIN_KIRI_IN1 | 17 | keluar | arah motor kiri |
| PIN_KIRI_PWM | 27 | keluar | kecepatan motor kiri |
| PIN_KANAN_PWM | 27 | keluar | kecepatan motor kanan |
PERINGATAN: pin 27 dipakai PIN_KIRI_PWM dan PIN_KANAN_PWM
pin kembar: 1
```

Bacalah dengan jujur. Tabel yang diketik tangan akan lolos begitu saja dengan dua baris bernomor 27; tabel yang dibangkitkan dari daftar bernama memperlihatkan kembarannya. Pemeriksaan ini hanya menjamin tidak ada nomor kembar, bukan bahwa nomor itu benar untuk papanmu: itu tetap diperiksa dengan lembar data dan dengan merakit. Panduan perakitan yang baik berisi langkah yang masing-masing satu aksi dengan satu titik periksa, dan panduan pengguna menyebut cara mulai, cara berhenti, arti `DIAM`, `MAJU`, dan `AMAN`, apa yang dilakukan saat `AMAN`, dan batas pemakaian robot. Daftar **yang belum beres** (misalnya kebutuhan yang ditolak di `C-XII2-M11`) ditulis jujur di dokumen; menyembunyikannya membuat pembaca salah menaruh percaya.

## Daftar periksa

Kerjakan berurutan; tiap titik periksa harus dapat ditunjukkan kepada orang lain.

1. `AI: boleh` **Daftar dokumen.** Tulis dokumen yang dibutuhkan, pembacanya, dan tujuannya. Titik periksa: tiap dokumen punya pembaca.
2. `AI: tanpa AI` **Tabel pin dari sumber.** Bangkitkan tabel pin dari daftar pin bernama proyekmu. Titik periksa: nol pin kembar, dan prediksi tertulis sebelum menjalankan.
3. `AI: boleh` **Panduan perakitan.** Tulis langkah satu aksi dengan titik periksa, ditambah aturan daya dan keselamatan. Titik periksa: kelompok lain berhasil merakit atau menelusuri hanya dari panduan.
4. `AI: boleh` **Panduan pengguna.** Cara mulai, berhenti, arti keadaan, apa yang dilakukan saat `AMAN`, dan batas pemakaian. Titik periksa: orang yang tidak ikut membuat dapat menjalankannya.
5. `AI: tanpa AI` **Versi dan yang belum beres.** Tulis nomor versi, riwayat perubahan, dan daftar yang belum beres. Titik periksa: versi di dokumen sama dengan versi program.
6. *Opsional:* **catatan pemakaian AI.** Bila memakai AI generatif untuk merapikan tulisan, tulis dulu isinya sendiri, lalu minta kritik, bukan dokumen jadi; AI tidak boleh menambah fakta atau angka yang belum kamu periksa. Catat alatnya, tujuanmu, garis besar perintahmu, bagian yang kamu pakai, dan cara memeriksanya. Jangan menaruh data pribadi pada perintah.

## Umpan balik sejawat

Minta kelompok lain mengikuti panduanmu sambil kamu diam dan mencatat tempat mereka ragu. Beri masukan pada panduan mereka: **satu yang sudah baik**, **satu yang perlu diperbaiki** (sebut langkahnya, misalnya "langkah 4 tidak menyebut polaritas"), dan **satu langkah berikutnya**. Ulasan berpasangan ini praktik yang layak dicoba, bukan jaminan hasil (buktinya paling banyak pada mahasiswa).

## Latihan bercampur

1. Dari `c-xii2-m6`: kapan tabel pin diperbarui, dan apa yang diuji ulang setelahnya?
2. Dari `c-xii2-m8`: data apa yang boleh dan tidak boleh ada di panduan pengguna tentang log?

## Ulang berjarak

Pertanyaan 1 dan 3 akan muncul lagi di `Ingat kembali` modul `C-XII2-M13` (sekitar satu minggu lagi), dan pertanyaan 2 di `C-XII2-M14` (sekitar dua minggu lagi). Jawab sekarang lalu simpan.

1. Mengapa tabel pin dibangkitkan dari daftar pin bernama yang sama dengan program?
2. Apa yang membuktikan sebuah panduan perakitan sudah baik?
3. Mengapa dokumen memuat daftar yang belum beres?

## Kesalahan umum

- **Mengetik angka ke dokumen dari ingatan.** Dokumen dan program tidak sama.
- **Panduan yang hanya dibaca penulisnya.** Ia belum diuji.
- **Langkah yang memuat beberapa aksi.** Pembaca tidak tahu di mana ia salah.
- **Menyembunyikan kebutuhan yang ditolak.**
- **Menaruh kata sandi atau nama orang di dokumen.**

## Cek mandiri

- [ ] Tabel pinku dibangkitkan dari daftar bernama dan tidak ada nomor kembar.
- [ ] Kelompok lain berhasil mengikuti panduanku.
- [ ] Dokumenku memuat versi, riwayat, dan daftar yang belum beres.
- [ ] Dokumenku tidak memuat rahasia atau pengenal orang.

## Kunci dan petunjuk

**Ingat kembali.** 1: kebutuhan berbicara tentang setiap lari, dan rata-rata menyembunyikan lari yang melanggar. 2: laporkan apa adanya; perbaiki dan uji ulang bila ada waktu, atau putuskan DITERIMA BERSYARAT dengan daftar yang belum beres. 3: tinjau kebutuhan yang bertentangan secara terbuka dan putuskan sebagai kelompok; jangan menghapus uji. 4: rilis kandidat masih menunggu ulasan dan pengujian akhir, dan berisi daftar yang diketahui belum beres. 5: tidak ada pola yang diprogramkan yang cocok; ia tidak membuktikan tidak ada masalah di luar pola itu.

**Rencana sprint.** Prediksi: satu peringatan, pin 27 yang dipakai `PIN_KIRI_PWM` dan `PIN_KANAN_PWM`; keluaran program membenarkannya.

**Daftar periksa.** Rubrik singkat: nomor 1 pembaca dan tujuan tiap dokumen; nomor 2 prediksi bertanggal dan nol pin kembar; nomor 3 satu aksi dan satu titik periksa per langkah, terbukti diikuti orang lain; nomor 4 mencakup keadaan dan `AMAN`; nomor 5 versi sama dengan program; nomor 6 opsional.

**Umpan balik sejawat.** Umpan balik yang baik menyebut butir, bukan kesan umum, dan memberi langkah yang bisa dikerjakan minggu depan.

**Latihan bercampur.** 1: setiap kali nomor pin diganti di daftar bernama; ulangi tahap pengujian yang menyentuh pin itu, bangkitkan ulang tabel, dan naikkan riwayat versi. 2: boleh: kolom log (waktu internal, keadaan, koreksi) dan cara membacanya; tidak boleh: nama, kontak, lokasi, atau kata sandi jaringan.

**Ulang berjarak.** 1: supaya dokumen dan program tidak berbeda dan pin kembar terlihat. 2: orang lain berhasil mengikutinya tanpa bertanya kepada penulis. 3: supaya pembaca tahu batas sistem dan tidak menaruh percaya melebihi buktinya.

## Langkah berikutnya

Modul berikut: `C-XII2-M13` (presentasi dan portofolio). Bacaan lanjut: praktik inti "mengomunikasikan (presentasi, dokumentasi) produk dan proses" pada glosarium Panduan Mata Pelajaran Informatika (lihat Rujukan).
