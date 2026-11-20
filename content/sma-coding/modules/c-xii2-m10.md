## Untuk siapa modul ini

Modul ini untuk murid kelas XII jalur C (IoT dan robotika), minggu `C-XII2-M10` silabus v1.4: proyek akhir, ulasan sejawat. Prasyarat terindeks: `c-xii2-m9`. Kamu memakai rilis kandidat dan matriks keterlacakan dari sprint 4, dan daftar kebutuhan dari rancangan `C-XII2-M5` yang belum terindeks saat modul ini ditulis.

Modul ini karangan penyusun dan disetujui pemilik program pada 2026-11-20 (keputusan lewat dialog; catatan tinjauan menjadi tindak lanjut revisi). Ia mendukung butir `F-BK-a` dan tidak dihitung memenuhi butir capaian pembelajaran mana pun. Keluaran minggu ini: catatan ulasan. Latihan silabusnya: tinjau proyek.

Pekerjaan minggu ini membaca dan menguji tiruan, dengan atau tanpa papan. Keselamatan perangkat: bila menjalankan robot kelompok lain, penulisnya mendampingi, roda terangkat, tombol berhenti terpasang, dan daya dari guru. Jangan membuka berkas rahasia atau data kelompok lain di luar yang diserahkan untuk ulasan.

## Ingat kembali

Jawab dari ingatan dulu, baru cek kunci. Soal 1 dari `c-xii2-m9`, soal 2 dari `c-xii2-m7`, soal 3 dari `c-xii2-m2`.

1. Mengapa tiap perubahan penyempurnaan dibuat satu per satu dan diuji ulang?
2. Mengapa log memakai penyangga melingkar, dan apa yang hilang bila penuh?
3. Sebut dua ongkos memadatkan data, dan mengapa lebih kecil tidak selalu lebih baik.

## Tujuan

Setelah modul ini kamu dapat:

- membaca proyek kelompok lain dan menelusuri tiap kebutuhannya ke ujinya;
- menulis catatan ulasan yang menyebut butir, bukti, tingkat, dan saran;
- membedakan cacat yang wajib diperbaiki dari saran dan hal kecil;
- menjawab ulasan atas proyekmu dengan alasan, bukan dengan membela diri.

## Rencana sprint

Ulasan sejawat menyambungkan rilis kandidat `C-XII2-M9` dengan pengujian akhir `C-XII2-M11`. Tujuannya membuat proyek lebih baik dari kemarin, bukan mencari kesempurnaan dan bukan menilai orangnya. Pedoman ulasan kode Google yang dipublikasikan terbuka (lihat Rujukan) menyebut hal yang diperiksa: desain, fungsi, kerumitan, uji, penamaan, komentar, gaya, dan dokumentasi. Untuk proyek robot, tambahkan tiga hal milik kita: **keterlacakan** (tiap kebutuhan punya uji), **keselamatan** (keadaan aman, tombol berhenti), dan **privasi** (tanpa pengenal, tanpa rahasia di repositori).

Setiap catatan diberi tingkat: **WAJIB** (melanggar kebutuhan, keselamatan, atau privasi), **SARAN** (membuat lebih mudah dirawat), dan **Nit** (hal kecil yang boleh diabaikan penulis). Penulis memutuskan cara memperbaikinya; ulasan menyebut masalah dan alasannya. Tulis **prediksi** dulu: apa keluaran program karangan berikut, dan apa yang akan kamu catat?

```cpp
// C++17 biasa, jalan di komputer. Diperiksa oleh check:module-code.
// KODE YANG DIULAS. Milik kelompok karangan; di dalamnya ada cacat yang sengaja ditanam.
// Baca dan catat temuanmu sebelum melihat keluaran. Kebutuhan K2: simpangan terbesar paling besar 25 mm.
#include <iostream>

int s[5] = {12, 25, 18, 20, 9};  // simpangan terbesar tiap lari, mm

int f() {
  int m = 0;
  for (int i = 0; i < 5; i++) {
    if (s[i] > m) {
      m = s[i];
    }
  }
  return m;
}

int g() {
  int j = 0;
  for (int i = 0; i < 5; i++) {
    j += s[i];
  }
  return j / 5;
}

bool ok() { return f() < 25; }

int main() {
  std::cout << "terburuk " << f() << " mm, rata-rata " << g() << " mm\n";
  std::cout << (ok() ? "K2 LULUS" : "K2 GAGAL") << "\n";
}
```

Keluaran program (dijalankan penulis dengan `g++ -std=c++17`):

```text
terburuk 25 mm, rata-rata 16 mm
K2 GAGAL
```

Contoh catatan ulasan untuk kode di atas:

| Tingkat | Butir | Catatan |
| --- | --- | --- |
| WAJIB | `ok()` memakai `<` | K2 berbunyi "paling besar 25 mm", jadi 25 mm harus lulus. Data di atas membuktikan: terburuk 25, hasil GAGAL. Pakai `<=` dan tambahkan data uji tepat di batas. |
| SARAN | nama `s`, `f`, `g`, `ok` | Nama tidak menyebut isinya. Misalnya `simpangan`, `terburuk`, `rataRata`, `memenuhiK2`. |
| SARAN | angka 5 dan 25 berulang | Beri konstanta bernama `JUMLAH_LARI` dan `BATAS_MM`. |
| Nit | rata-rata 16 | Hasil sebenarnya 16,8 dan dibulatkan ke bawah; kebutuhan tidak memakainya. |

## Daftar periksa

Kerjakan berurutan; tiap titik periksa harus dapat ditunjukkan kepada orang lain.

1. `AI: tanpa AI` **Baca dulu.** Baca kode dan dokumen kelompok lain tanpa menjalankannya dan tulis prediksi perilakunya. Titik periksa: prediksi bertanggal sebelum menjalankan.
2. `AI: tanpa AI` **Telusuri kebutuhan.** Cocokkan tiap kebutuhan dengan ujinya. Titik periksa: daftar kebutuhan tanpa uji dan uji tanpa kebutuhan.
3. `AI: boleh` **Keselamatan dan privasi.** Periksa keadaan aman, tombol berhenti, batas daya, rahasia, dan kolom data. Titik periksa: tiap temuan menyebut berkas atau baris.
4. `AI: boleh` **Tulis catatan.** Tiap catatan memuat tingkat, butir, bukti, dan saran. Titik periksa: tidak ada catatan "kurang bagus" tanpa butir.
5. `AI: tanpa AI` **Balas ulasan.** Penulis menjawab tiap catatan WAJIB: diperbaiki, ditunda dengan alasan, atau ditolak dengan alasan. Titik periksa: tidak ada yang dibiarkan tanpa jawaban.
6. *Opsional:* **catatan pemakaian AI.** Bila memakai AI generatif untuk membantu membaca, tulis dulu temuanmu sendiri, lalu minta kritik, bukan ulasan jadi; temuan AI diperiksa sendiri. Catat alatnya, tujuanmu, garis besar perintahmu, bagian yang kamu pakai, dan cara memeriksanya. Jangan menaruh data pribadi, rahasia, atau kode orang lain tanpa izin pada perintah.

## Umpan balik sejawat

Tiap ulasan ditutup dengan **satu yang sudah baik**, **satu yang perlu diperbaiki**, dan **satu langkah berikutnya**. Kritik ditujukan pada kode dan dokumen, bukan pada orang. Ulasan sejawat ini praktik yang layak dicoba, bukan jaminan hasil (buktinya paling banyak pada mahasiswa).

## Latihan bercampur

1. Dari `c-xii2-m5`: tulis satu uji yang akan menangkap cacat `<` melawan `<=` di atas, lengkap dengan id kebutuhannya.
2. Dari `c-xii2-m9`: setelah pembekuan fitur, ulasan menemukan fitur yang "enak ditambah". Apa yang kamu tulis pada catatan?

## Ulang berjarak

Pertanyaan 1 dan 3 akan muncul lagi di `Ingat kembali` modul `C-XII2-M11` (sekitar satu minggu lagi), dan pertanyaan 2 di `C-XII2-M13` (sekitar tiga minggu lagi). Jawab sekarang lalu simpan.

1. Apa beda catatan WAJIB, SARAN, dan Nit?
2. Mengapa ulasan menyebut butir dan bukti, bukan "kurang bagus"?
3. Mengapa nilai tepat di batas harus ada pada data uji?

## Kesalahan umum

- **Mengulas orangnya.** Ulaslah kode dan dokumen.
- **Semua catatan sama beratnya.** Penulis tidak tahu mana yang harus diperbaiki lebih dulu.
- **Menuntut kesempurnaan.** Tujuannya proyek yang lebih baik, bukan yang tanpa cela.
- **Mengabaikan batas keselamatan dan privasi demi gaya penulisan.**

## Cek mandiri

- [ ] Tiap catatanku menyebut tingkat, butir, bukti, dan saran.
- [ ] Aku menelusuri kebutuhan ke uji, bukan hanya membaca kode.
- [ ] Aku memeriksa keselamatan dan privasi.
- [ ] Aku menjawab tiap catatan WAJIB atas proyekku.

## Kunci dan petunjuk

**Ingat kembali.** 1: supaya uji yang gagal dapat ditunjuk ke satu penyebab. 2: memori tetap sehingga tidak habis; yang hilang adalah catatan tertua yang ditimpa catatan baru. 3: contoh: kode pengemasan tambahan yang sulit dibaca, rentang yang dibatasi, dan nilai di luar batas rusak diam-diam; lebih kecil tidak berguna bila program lebih sulit dirawat atau salah.

**Rencana sprint.** Prediksi: terburuk 25 mm dan rata-rata 16 mm (84 dibagi 5 = 16,8 dipangkas ke 16); karena `25 < 25` salah, K2 GAGAL padahal kebutuhan membolehkan 25. Daftar catatan lain boleh berbeda dari contoh bila menyebut butir, bukti, dan tingkatnya.

**Daftar periksa.** Rubrik singkat: nomor 1 prediksi bertanggal; nomor 2 dua daftar (kebutuhan tanpa uji, uji tanpa kebutuhan); nomor 3 temuan menyebut berkas atau baris; nomor 4 catatan lengkap empat bagian; nomor 5 tiap WAJIB berjawab; nomor 6 opsional.

**Umpan balik sejawat.** Umpan balik yang baik menyebut butir, bukan kesan umum, dan memberi langkah yang bisa dikerjakan minggu depan.

**Latihan bercampur.** 1: contoh: "U4 untuk K2: data lari {25, 10, 10}, harapan LULUS"; ia menangkap `<` karena terburuk 25 melanggar. 2: tingkat Nit atau SARAN dan ditunda ke setelah rilis; sebut bahwa fitur dibekukan dan hanya perbaikan galat yang masuk.

**Ulang berjarak.** 1: WAJIB: melanggar kebutuhan, keselamatan, atau privasi dan harus diperbaiki; SARAN: membuat lebih mudah dirawat; Nit: hal kecil yang boleh diabaikan. 2: supaya penulis tahu apa yang salah, di mana, dan mengapa, sehingga dapat memperbaikinya. 3: kesalahan batas (`<` melawan `<=`) hanya tertangkap oleh nilai tepat di batas.

## Langkah berikutnya

Modul berikut: `C-XII2-M11` (pengujian akhir). Bacaan lanjut: bagian "What Do Code Reviewers Look For?" dan "The Standard of Code Review" pada pedoman Google (lihat Rujukan).
