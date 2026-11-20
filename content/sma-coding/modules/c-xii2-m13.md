## Untuk siapa modul ini

Modul ini untuk murid kelas XII jalur C (IoT dan robotika), minggu `C-XII2-M13` silabus v1.4: proyek akhir, presentasi dan portofolio. Prasyarat terindeks: `c-xii2-m12`. Kamu memakai laporan uji `c-xii2-m11`, dokumen proyek `c-xii2-m12`, dan rancangan `C-XII2-M5` yang belum terindeks saat modul ini ditulis.

Modul ini karangan penyusun dan disetujui pemilik program pada 2026-11-20 (keputusan lewat dialog; catatan tinjauan menjadi tindak lanjut revisi). Ia tidak dihitung memenuhi butir capaian pembelajaran mana pun. Keluaran minggu ini: demo dan portofolio. Latihan silabusnya: presentasi. Portofolio milik muridnya, tidak dikumpulkan di repositori ini.

Dengan papan atau tanpa papan, demo memakai robot bila ada dan skenario tiruan di komputer bila tidak. Keselamatan perangkat: demo di meja bertepi dengan roda terangkat atau lintasan yang aman, tombol berhenti dalam jangkauan, daya dari guru, penonton menjauh dari bagian bergerak, dan tidak ada kamera atau perekam yang menyorot orang.

## Ingat kembali

Jawab dari ingatan dulu, baru cek kunci. Soal 1 dan 2 dari `c-xii2-m12`, soal 3 dari `c-xii2-m10`, soal 4 dari `c-xii2-m8`, soal 5 dari `c-xii2-m5`.

1. Mengapa tabel pin dibangkitkan dari daftar pin bernama yang sama dengan program?
2. Mengapa dokumen memuat daftar yang belum beres?
3. Mengapa ulasan menyebut butir dan bukti, bukan "kurang bagus"?
4. Mengapa kata sandi jaringan tidak ditulis di dalam program yang masuk repositori?
5. Mengapa fitur yang boleh dipotong ditulis sejak rancangan?

## Tujuan

Setelah modul ini kamu dapat:

- menyusun presentasi lima menit yang memuat masalah, solusi, demo, hasil uji yang jujur, dan pelajaran;
- menyiapkan demo cadangan yang tidak bergantung pada papan;
- menyusun portofolio proyek dan memeriksanya dari rahasia dan data pribadi;
- menghasilkan demo dan portofolio (keluaran minggu ini).

## Rencana sprint

Presentasi mengomunikasikan produk dan prosesnya. Waktunya tetap, jadi isinya dipilih. Pola lima menit karangan ini berjumlah 300 detik:

| Bagian | Detik | Isi |
| --- | --- | --- |
| Masalah dan pengguna | 30 | siapa yang dibantu dan apa yang sulit |
| Solusi dan arsitektur | 60 | blok, strategi, dan alasan pilihan |
| Demo | 90 | satu skenario yang terlihat jelas |
| Hasil uji | 60 | tiap kebutuhan, nilai terburuk, dan putusan, **termasuk yang gagal** |
| Pelajaran dan langkah berikutnya | 60 | yang kamu ubah bila mengulang |

Hasil yang gagal tetap ditampilkan: penonton menilai kejujuranmu pada angka, dan angka itu sama dengan laporan `c-xii2-m11`. Demo langsung dapat gagal (baterai habis, sambungan lepas), jadi siapkan **demo cadangan** yang tidak bergantung pada papan: skenario perangkat tiruan di komputer seperti pada `c-xii2-m7`, yang selalu memberi keluaran yang sama.

Setelah presentasi, kumpulkan **portofolio**: kode (tanpa rahasia), dokumen proyek, laporan uji, matriks keterlacakan, versi rilis, dan refleksi, masing-masing dengan satu kalimat "apa ini dan untuk apa". Beri atribusi pada pustaka dan sumber yang dipakai dan pilih lisensi karyamu (lihat `FND-X1-M2`). Sebelum membagikannya, periksa arsip. Tulis **prediksi** dulu: program berikut memindai lima berkas karangan dengan beberapa pola. Berapa temuan, dan berkas mana yang berisi data pribadi tetapi tidak tertangkap?

```cpp
// C++17 biasa, jalan di komputer. Diperiksa oleh check:module-code.
// Pemindai arsip portofolio yang sangat sederhana: ia mencari pola yang DIPROGRAMKAN saja (kata kunci rahasia
// dan nama kolom data pribadi) pada isi berkas karangan. Isi berkas dan semua nama adalah karangan.
#include <iostream>
#include <string>
#include <vector>

struct Berkas {
  std::string nama;
  std::string isi;
};

int main() {
  const std::vector<std::string> pola = {"kata_sandi=", "token=", "nama,", "email,", "@"};
  const std::vector<Berkas> arsip = {
      {"robot.cpp", "const int HILANG_MAKS = 3;\nconst char *kata_sandi=\"jangan-ini\";\n"},
      {"data-lari.csv", "tick,keadaan,koreksi\n0,DIAM,0\n"},
      {"data-uji.csv", "nama,waktu\ntokoh-a,34\n"},
      {"panduan.md", "Kontak: tim@kelas.example\n"},
      {"catatan.txt", "Tokoh Contoh dari kelas XII-Z memegang robot saat uji.\n"},
      {"laporan-uji.md", "K1 DITOLAK pada lari 4; K2 DITOLAK pada lari 4.\n"},
  };
  int temuan = 0;
  for (const Berkas &b : arsip) {
    for (const std::string &p : pola) {
      if (b.isi.find(p) != std::string::npos) {
        std::cout << b.nama << ": cocok dengan pola \"" << p << "\"\n";
        temuan++;
      }
    }
  }
  std::cout << "temuan: " << temuan << "\n";
}
```

Keluaran program (dijalankan penulis dengan `g++ -std=c++17`):

```text
robot.cpp: cocok dengan pola "kata_sandi="
data-uji.csv: cocok dengan pola "nama,"
panduan.md: cocok dengan pola "@"
temuan: 3
```

Bacalah dengan jujur. Pemindai menangkap kata sandi, kolom `nama`, dan alamat surel, tetapi `catatan.txt` memuat nama dan kelas seseorang dan lolos karena tidak ada polanya. Alamat `.example` pada `panduan.md` adalah domain khusus contoh dan aman; pemindai tetap menandainya, dan manusia yang memutuskan. Maka pemindai hanyalah alat bantu: **kamu membaca setiap berkas sendiri**. Bila rahasia pernah masuk riwayat repositori, anggap bocor dan ganti.

## Daftar periksa

Kerjakan berurutan; tiap titik periksa harus dapat ditunjukkan kepada orang lain.

1. `AI: boleh` **Naskah lima menit.** Susun lima bagian dengan waktu yang berjumlah 300 detik. Titik periksa: latihan dengan pengatur waktu tidak melebihi.
2. `AI: tanpa AI` **Demo dan cadangan.** Tulis prediksi apa yang terlihat, satu langkah yang bisa gagal, dan cadangannya. Titik periksa: demo cadangan berjalan tanpa papan.
3. `AI: boleh` **Hasil jujur.** Buat satu tampilan kebutuhan, nilai terburuk, dan putusan. Titik periksa: angkanya sama dengan laporan uji.
4. `AI: boleh` **Isi portofolio.** Daftar berkas dengan satu kalimat tujuan masing-masing. Titik periksa: tiap berkas punya pembaca.
5. `AI: tanpa AI` **Periksa arsip.** Jalankan pemindai lalu baca sendiri tiap berkas. Titik periksa: tidak ada rahasia atau pengenal orang, dan atribusi serta lisensi tertulis.
6. *Opsional:* **catatan pemakaian AI.** Bila memakai AI generatif untuk merapikan naskah, tulis dulu isinya sendiri, lalu minta kritik, bukan naskah jadi; AI tidak boleh menambah angka. Catat alatnya, tujuanmu, garis besar perintahmu, bagian yang kamu pakai, dan cara memeriksanya. Jangan menaruh data pribadi, rahasia, atau berkas portofolio mentah pada perintah.

## Umpan balik sejawat

Tonton presentasi kelompok lain dan beri masukan: **satu yang sudah baik**, **satu yang perlu diperbaiki** (sebut butirnya, misalnya "demo baru mulai di menit ketiga"), dan **satu langkah berikutnya**. Ulasan ini praktik yang layak dicoba, bukan jaminan hasil (buktinya paling banyak pada mahasiswa).

## Latihan bercampur

1. Dari `c-xii2-m11`: rata-rata K1 35 detik tetapi terburuk 41 detik terhadap batas 40. Tulis satu kalimat jujur untuk penonton.
2. Dari `c-xii2-m4`: apa yang kamu lakukan sebelum arsip dibagikan bila kata sandi jaringan pernah ada di riwayat repositori?

## Ulang berjarak

Pertanyaan 1 akan muncul lagi di `Ingat kembali` modul `C-XII2-M14` (sekitar satu minggu lagi). Pertanyaan 2 dan 3 tidak punya modul tujuan lagi di jalur ini; ulangi sendiri tiga minggu dan delapan minggu lagi. Jawab sekarang lalu simpan.

1. Mengapa hasil uji yang gagal tetap ditunjukkan pada presentasi?
2. Mengapa arsip dipindai dan dibaca sendiri sebelum dibagikan?
3. Mengapa demo diberi cadangan yang tidak bergantung pada papan?

## Kesalahan umum

- **Menampilkan hanya yang berhasil.** Penonton menilai kejujuranmu.
- **Demo langsung tanpa cadangan.**
- **Naskah melebihi waktu.** Latihan dengan pengatur waktu.
- **Mengarsip tanpa membaca.** Pemindai tidak menangkap semuanya.
- **Mencantumkan nama orang lain, sekolah, atau kontak di portofolio.**

## Cek mandiri

- [ ] Naskahku berjumlah tepat 300 detik dan memuat hasil yang gagal.
- [ ] Demo cadangannya berjalan tanpa papan.
- [ ] Angka di tampilan sama dengan laporan uji.
- [ ] Arsipku bebas rahasia dan pengenal, dan aku membacanya sendiri.
- [ ] Atribusi dan lisensiku tertulis.

## Kunci dan petunjuk

**Ingat kembali.** 1: supaya dokumen dan program tidak berbeda dan pin kembar terlihat. 2: supaya pembaca tahu batas sistem dan tidak menaruh percaya melebihi buktinya. 3: supaya penulis tahu apa yang salah, di mana, dan mengapa, sehingga dapat memperbaikinya. 4: riwayat repositori menyimpan salinan; orang yang punya akses ke riwayat masih dapat membacanya. 5: supaya keputusan memotong dibuat tenang di awal, bukan saat tekanan waktu.

**Rencana sprint.** Prediksi: 3 temuan (`robot.cpp`, `data-uji.csv`, `panduan.md`); `catatan.txt` memuat nama dan kelas seseorang tetapi tidak tertangkap. 30 + 60 + 90 + 60 + 60 = 300 detik.

**Daftar periksa.** Rubrik singkat: nomor 1 jumlah waktu 300 detik; nomor 2 prediksi, langkah rawan, dan cadangan yang terbukti berjalan; nomor 3 angka sama dengan laporan uji dan yang gagal tampil; nomor 4 tiap berkas ada tujuannya; nomor 5 dibaca sendiri, bukan hanya dipindai; nomor 6 opsional.

**Umpan balik sejawat.** Umpan balik yang baik menyebut butir, bukan kesan umum, dan memberi langkah yang bisa dikerjakan minggu depan.

**Latihan bercampur.** 1: contoh: "Rata-rata 35 detik, tetapi satu dari sepuluh lari 41 detik, melebihi batas 40, jadi kebutuhan ini belum terpenuhi." 2: anggap bocor, ganti kata sandi, dan arsipkan tanpa berkas rahasia; membersihkan riwayat saja tidak cukup bila salinan sudah beredar.

**Ulang berjarak.** 1: supaya penonton dapat menilai dengan data yang utuh, dan kamu belajar dari yang gagal. 2: pemindai hanya mengenali pola yang diprogramkan; berkas seperti `catatan.txt` lolos. 3: papan, baterai, atau sambungan bisa gagal pada saat yang paling tidak tepat; skenario tiruan selalu memberi keluaran yang sama.

## Langkah berikutnya

Modul berikut: `C-XII2-M14` (asesmen dan refleksi). Bacaan lanjut: praktik inti "mengomunikasikan (presentasi, dokumentasi) produk dan proses" pada glosarium Panduan Mata Pelajaran Informatika (lihat Rujukan).
