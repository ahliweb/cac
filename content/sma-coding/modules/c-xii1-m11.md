## Untuk siapa modul ini

Modul ini untuk murid kelas XII jalur C (IoT dan robotika), minggu `C-XII1-M11` silabus v1.4: hukum dan etika sensor (F). Prasyarat: modul `c-xii1-m10` (daya dan keselamatan baterai) dan `c-xi2-m2` (keamanan konektivitas).

Modul ini karangan penyusun dan disetujui pemilik program pada 2026-11-20 (keputusan lewat dialog; catatan tinjauan menjadi tindak lanjut revisi). Ia mendukung butir `F-LD-g` (hukum dan perundang-undangan terkait isu digital) dan tidak dihitung memenuhi butir capaian pembelajaran mana pun; pemetaan untuk jalur C bersifat parsial, hanya pokok yang terkait perangkat yang merekam. Keluaran minggu ini: catatan kepatuhan. Latihan silabusnya: daftar periksa proyek.

Ini **bukan nasihat hukum**. Bagian hukum memuat pokok yang dibaca penyusun dari naskah UU Nomor 27 Tahun 2022 dan halaman JDIH BPK untuk UU Nomor 11 Tahun 2008 dan UU Nomor 1 Tahun 2023 (per 2026-11). Peraturan pelaksana tidak dibahas; guru atau ahli hukum yang memutuskan kasus nyata.

Ada dua cara mengerjakan. **Dengan papan (F):** kelompok memeriksa sensor dan log proyeknya sendiri. **Tanpa papan:** kamu memakai daftar fitur karangan di komputer.

## Keselamatan perangkat

- Papan memakai daya USB; motor memakai baterai AA/AAA yang disediakan guru lewat modul pengendali. Tidak ada listrik jaringan (220 V), baterai litium tanpa pelindung, atau pengisian daya litium oleh murid.
- Cabut baterai dan kabel USB sebelum mengubah rangkaian; periksa polaritas. Motor tidak langsung ke pin papan. Tidak ada solder.
- Robot diuji di meja bertepi; bagian yang bergerak tidak disentuh saat menyala, dan pemutus daya diketahui letaknya.
- Aturan kelas untuk sensor: **tidak ada kamera atau mikrofon yang merekam orang, tidak ada sensor tubuh, dan tidak ada lokasi pribadi.** Papan, modul, atau motor yang panas, berbau, atau berasap: cabut daya dan panggil guru.

## Ingat kembali

Jawab dari ingatan dulu, baru cek di kunci. Soal 1 dari `c-xii1-m3`, soal 2 dari `c-xii1-m8`, soal 3 dari `c-xii1-m10`.

1. Sebut dua aturan keselamatan saat menguji robot yang bergerak.
2. Mengapa syarat wajib dipasang sebelum meranking strategi, dan apa yang terjadi pada pemenangnya bila syaratnya diubah?
3. Mengapa tegangan baterai harus dibagi sebelum masuk ke pin ADC?

## Tujuan

Setelah modul ini kamu dapat:

- menjelaskan data pribadi dan membedakan jenis umum dan spesifik menurut UU Pelindungan Data Pribadi (UU PDP);
- menyebut dasar pemrosesan data pribadi, termasuk persetujuan wali untuk data anak;
- menjelaskan mengapa perangkat yang merekam perlu ditinjau dan hukumnya diperiksa pada teks yang berlaku;
- menyusun catatan kepatuhan untuk proyek robotmu (keluaran minggu ini).

## Prediksi dulu

Lima fitur karangan diperiksa: sensor jarak depan; kamera pengenal wajah; log lari dengan nama pengguna; unggah log lari ke layanan daring; log lari berkolom tak terpakai. Putusannya DITOLAK, TINJAU, KURANGI, atau LOLOS. **Tebak dulu, tulis jawabanmu, baru jalankan.**

1. Putusan apa yang kamu duga untuk tiap fitur, dan berapa yang lolos tanpa catatan?
2. Mengapa unggah log ke layanan daring perlu ditinjau walau tampak tanpa nama?

## Contoh terselesaikan

**Data pribadi** menurut UU PDP (Pasal 1 angka 1) adalah data tentang orang perseorangan yang teridentifikasi atau dapat diidentifikasi, tersendiri atau dikombinasikan dengan informasi lain, langsung maupun tidak langsung. Pasal 4 membaginya menjadi data **spesifik** (antara lain kesehatan, biometrik, genetika, catatan kejahatan, data anak, dan keuangan pribadi) dan data **umum** (antara lain nama lengkap, jenis kelamin, kewarganegaraan, agama, status perkawinan, dan data yang dikombinasikan untuk mengidentifikasi seseorang). Log jarak tidak berbahaya sendirian, tetapi bila disandingkan dengan nama dan jam masuk, ia dapat menunjuk seseorang.

Pemrosesan data pribadi memerlukan dasar (Pasal 20), salah satunya persetujuan eksplisit yang sah untuk tujuan tertentu, tertulis atau terekam (Pasal 22 ayat 1). Untuk data anak diperlukan persetujuan orang tua atau wali (Pasal 25 ayat 2). Pengendali data wajib melindungi keamanan data (Pasal 35 dan 39), dan memperoleh atau mengumpulkan data pribadi milik orang lain secara melawan hukum dilarang (Pasal 65 ayat 1), dengan ketentuan pidana (Pasal 67). Undang-undang itu tidak berlaku bagi pemrosesan perseorangan dalam kegiatan pribadi atau rumah tangga (Pasal 2 ayat 2), tetapi proyek sekolah tidak otomatis termasuk, dan bukan kamu yang memutuskannya.

UU Informasi dan Transaksi Elektronik (UU 11/2008) tetap berlaku sebagai undang-undang dengan perubahannya, tetapi JDIH BPK mencatat sejumlah pasalnya dicabut oleh UU 1/2023 (KUHP), termasuk Pasal 30 (akses ilegal) dan Pasal 31 ayat (1) dan (2) (intersepsi); KUHP berlaku sejak 2 Januari 2026. Pokoknya: jangan mengakses perangkat atau jaringan orang lain tanpa izin dan jangan menyadap; modul ini tidak merinci pasal pengganti, jadi periksa teks yang berlaku.

Dari pokok itu disusun aturan sederhana sebagai kode, yang paling berat lebih dulu: perangkat yang merekam orang ditolak (aturan kelas); penyimpan pengenal atau pengirim data ke luar ditinjau bersama guru; kolom tak terpakai dikurangi.

```cpp
// C++17 biasa, jalan di komputer. Diperiksa oleh check:module-code.
// Daftar periksa kepatuhan sebagai kode. Ini alat belajar, BUKAN nasihat hukum dan bukan pengganti guru.
// Semua fitur di bawah karangan.
#include <iostream>

struct Fitur {
  const char *nama;
  bool merekamOrang;       // gambar, suara, lokasi pribadi, atau sensor tubuh
  bool menyimpanPengenal;  // nama, nomor, akun, atau kolom lain yang menunjuk seseorang
  bool dikirimKeluar;      // dikirim ke layanan atau orang di luar kelompok proyek
  bool lebihDariPerlu;     // mengumpulkan kolom yang tidak dipakai tujuan proyek
};

enum Putusan { DITOLAK, TINJAU, KURANGI, LOLOS };

// Urutan aturan penting: yang paling berat diperiksa lebih dulu.
Putusan putuskan(const Fitur &f) {
  if (f.merekamOrang) {
    return DITOLAK;  // aturan kelas: tanpa kamera atau mikrofon yang merekam orang, tanpa sensor tubuh atau lokasi pribadi
  }
  if (f.menyimpanPengenal || f.dikirimKeluar) {
    return TINJAU;  // mungkin data pribadi: tanya guru sebelum jalan
  }
  if (f.lebihDariPerlu) {
    return KURANGI;
  }
  return LOLOS;
}

const char *catatan(Putusan p) {
  switch (p) {
    case DITOLAK:
      return "tidak dipakai di proyek sekolah";
    case TINJAU:
      return "tinjau dengan guru: dasar, persetujuan, keamanan";
    case KURANGI:
      return "hapus kolom yang tidak dipakai";
    default:
      return "tidak ada catatan";
  }
}

const char *nama(Putusan p) {
  switch (p) {
    case DITOLAK:
      return "DITOLAK";
    case TINJAU:
      return "TINJAU";
    case KURANGI:
      return "KURANGI";
    default:
      return "LOLOS";
  }
}

int main() {
  const Fitur daftar[] = {
      {"sensor jarak depan", false, false, false, false},
      {"kamera pengenal wajah", true, false, false, false},
      {"log lari dengan nama pengguna", false, true, false, false},
      {"unggah log lari ke layanan daring", false, false, true, false},
      {"log lari berkolom tidak terpakai", false, false, false, true},
  };
  int jumlahLolos = 0;
  for (const Fitur &f : daftar) {
    Putusan p = putuskan(f);
    std::cout << f.nama << " -> " << nama(p) << ": " << catatan(p) << "\n";
    if (p == LOLOS) {
      jumlahLolos++;
    }
  }
  std::cout << "lolos tanpa catatan: " << jumlahLolos << " dari " << sizeof(daftar) / sizeof(daftar[0]) << "\n";
}
```

Keluaran program:

```text
sensor jarak depan -> LOLOS: tidak ada catatan
kamera pengenal wajah -> DITOLAK: tidak dipakai di proyek sekolah
log lari dengan nama pengguna -> TINJAU: tinjau dengan guru: dasar, persetujuan, keamanan
unggah log lari ke layanan daring -> TINJAU: tinjau dengan guru: dasar, persetujuan, keamanan
log lari berkolom tidak terpakai -> KURANGI: hapus kolom yang tidak dipakai
lolos tanpa catatan: 1 dari 5
```

Bacalah dengan jujur. Program ini hanya menerapkan aturan yang kamu tulis; ia tidak tahu apakah sebuah fitur sah menurut hukum. Satu-satunya yang lolos tanpa catatan adalah sensor jarak, **selama** datanya tidak disandingkan dengan orang. Fitur yang ditinjau bisa lolos bila ada dasar, persetujuan, dan pengamanan.

Catatan kepatuhan proyekmu memuat daftar sensor dan log, putusan tiap butir, alasan yang menyebut pokok aturannya, tindakan (hapus, samarkan, minta persetujuan lewat guru), dan tanggal pemeriksaan, tanpa nama sungguhan.

## Contoh setengah jadi

Lengkapi `____`: perangkat yang merekam orang ditolak lebih dulu, pengenal atau pengiriman keluar ditinjau, dan kolom tak terpakai dikurangi.

```cpp setengah-jadi
// C++17. Lengkapi bagian ____.
Putusan putuskan(const Fitur &f) {
  if (f.____) { return DITOLAK; }
  if (f.menyimpanPengenal ____ f.dikirimKeluar) { return TINJAU; }
  if (f.lebihDariPerlu) { return ____; }
  return LOLOS;
}
```

## Soal Parsons

Susun baris-baris di bawah (sudah diacak) menjadi fungsi `putuskan`. Aturan yang paling berat harus diperiksa lebih dulu.

```text
(a)   if (f.lebihDariPerlu) { return KURANGI; }
(b) Putusan putuskan(const Fitur &f) {
(c)   if (f.merekamOrang) { return DITOLAK; }
(d)   return LOLOS;
(e) }
(f)   if (f.menyimpanPengenal || f.dikirimKeluar) { return TINJAU; }
```

## Latihan

1. `AI: tanpa AI` **Tandai.** Tandai tiap data berikut sebagai spesifik, umum, atau bukan data pribadi selama tidak dikaitkan ke orang: (a) catatan kesehatan peserta lomba; (b) nama lengkap pengguna robot; (c) jarak halangan di lorong; (d) data anak.
2. `AI: tanpa AI` **Putuskan.** Beri putusan untuk: kamera yang menghitung orang lewat; log lari berisi nama dan jam; sensor suhu ruang tanpa pengenal.
3. `AI: boleh` **Daftar periksa proyek (F).** Tulis catatan kepatuhan proyek robotmu dan minta guru memeriksanya. Tanpa papan, tambahkan dua fitur karangan, prediksikan putusannya, lalu jalankan.
4. `AI: tanpa AI` **Usul teman.** Seorang teman mengusulkan memasang mikrofon agar robot "mendengar perintah" saat pameran. Tulis dua alasan menolaknya dan satu alternatif tanpa merekam.
5. *Opsional:* **catatan pemakaian AI.** Bila memakai AI generatif, kerjakan nomor 4 sendiri dulu, lalu minta kritik atas alasanmu, bukan jawaban jadi. Catat alatnya, tujuanmu, garis besar perintahmu, bagian yang kamu pakai, dan cara memeriksanya. Jangan menaruh data pribadi pada perintah.

## Latihan bercampur

1. Pada `c-xi2-m2` kamu mengamankan koneksi. Mengapa keamanan (kata sandi, enkripsi) saja belum menjawab pertanyaan "boleh merekam atau tidak"?
2. Pada `c-x2-m12` kamu mencatat data ke berkas. Kolom apa yang kamu hapus agar log lari tidak memuat data pribadi?

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `C-XII1-M12` (sekitar satu minggu lagi), `C-XII1-M14` (sekitar tiga minggu lagi), dan `C-XII2-M5` (sekitar delapan minggu lagi). Jawab sekarang lalu simpan.

1. Sebut dua jenis data yang tergolong data pribadi spesifik menurut UU PDP.
2. Kapan data dari sensor yang tampak biasa, seperti log jarak, menjadi data pribadi?
3. Sebut dua langkah untuk mengurangi data pribadi yang dikumpulkan robot.

## Kesalahan umum

- **Mengira "hanya proyek sekolah" berarti bebas aturan.** Hukumnya tetap perlu diperiksa.
- **Mengutip pasal dari ingatan atau sumber lama.** Pasal berubah dan ada yang dicabut; baca teks yang berlaku.
- **Mengira data tanpa nama bukan data pribadi.** Data yang dikombinasikan dapat mengidentifikasi seseorang.
- **Mengumpulkan semua yang bisa dikumpulkan.** Kolom tak terpakai menambah risiko tanpa manfaat.
- **Menyamakan aman secara teknis dengan boleh secara hukum.** Kata sandi kuat tidak memberi hak merekam.

## Cek mandiri

- [ ] Saya dapat menjelaskan data pribadi, jenis umum dan spesifik.
- [ ] Saya dapat menyebut dasar pemrosesan dan persetujuan wali untuk data anak.
- [ ] Saya menulis catatan kepatuhan dengan putusan dan alasan.
- [ ] Saya tidak merekam orang dengan kamera, mikrofon, atau sensor tubuh.
- [ ] Saya memeriksa teks hukum yang berlaku dan bertanya kepada guru.

## Kunci dan petunjuk

**Ingat kembali.** 1: contoh: uji dengan roda terangkat lebih dulu, dan di meja bertepi dengan bagian bergerak tidak disentuh; tangan dan kabel di luar jalur roda; siapkan pemutus daya. 2: syarat mengubah siapa yang boleh bersaing; bila diubah, pemenang bisa berbalik, sehingga syarat harus dibenarkan dari tujuan robot dan ditulis lebih dulu. 3: pin tidak tahan tegangan baterai penuh; pembagi menurunkannya di bawah batas pin.

**Prediksi dulu.** 1: sensor jarak LOLOS; kamera DITOLAK; log bernama TINJAU; unggah ke layanan TINJAU; kolom tak terpakai KURANGI; hanya satu yang lolos. 2: log bisa memuat pengenal tidak langsung (jam, tempat, akun) dan setelah dikirim, kendali atasnya berkurang; karena itu ditinjau.

**Contoh setengah jadi.** Isian berurutan: `merekamOrang`, `||`, `KURANGI`. Kunci dikompilasi dan dijalankan penulis dengan keluaran yang sama dengan contoh terselesaikan.

**Soal Parsons.** Urutan benar: b, c, f, a, d, e. Pemeriksaan paling berat lebih dulu: `c`, lalu `f`, lalu `a`; `d` terakhir sebelum kurung tutup `e`.

**Latihan.** 1: (a) spesifik (kesehatan); (b) umum (nama lengkap); (c) bukan data pribadi selama tidak dikaitkan ke orang; (d) spesifik (data anak). 2: kamera yang menghitung orang: DITOLAK (merekam orang); log bernama: TINJAU; sensor suhu tanpa pengenal: LOLOS. 3: tidak ada kunci tunggal; catatan yang baik menyebut tiap butir, putusannya, alasan dari pokok aturan, dan tindakan. 4: contoh alasan: aturan kelas melarang mikrofon yang merekam orang; suara dapat mengidentifikasi seseorang sehingga bisa menjadi data pribadi yang diperoleh tanpa persetujuan; alternatif: tombol, kartu warna yang dibaca sensor, atau perintah lewat papan tombol.

**Latihan bercampur.** 1: keamanan menjaga data agar tidak bocor; pertanyaan "boleh dikumpulkan atau tidak" soal dasar, persetujuan, dan tujuan, yang tidak diselesaikan kata sandi. 2: hapus nama, nomor, akun, dan kolom lain yang menunjuk seseorang; pakai kode pengujian karangan.

**Ulang berjarak.** 1: contoh: data kesehatan, data biometrik, data anak (Pasal 4 ayat 2). 2: bila disandingkan dengan informasi lain, seperti nama, jam, atau tempat, sehingga seseorang dapat diidentifikasi (Pasal 1 angka 1 dan Pasal 4 ayat 3). 3: contoh: tidak mencatat kolom yang tidak dipakai, memakai kode karangan alih-alih nama, dan tidak mengirim log ke luar kelompok.

## Langkah berikutnya

Modul berikut: `C-XII1-M12` (dokumentasi dan pemeliharaan), yang menulis dokumen perakitan dan panduan pengguna. Bacaan lanjut: halaman JDIH BPK yang tercantum di Rujukan.
