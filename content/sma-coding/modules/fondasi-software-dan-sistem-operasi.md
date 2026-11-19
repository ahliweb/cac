## Untuk siapa modul ini

Modul ini untuk murid kelas X pemula. Isinya mengikuti minggu fondasi kedua (FND-X1-M2): perangkat lunak, sistem operasi, berkas dan folder, serta lisensi. Sebaiknya kamu sudah membaca modul komputer dan perangkat keras (FND-X1-M1).

Setelah mempelajari modul ini, kamu diharapkan bisa:

- membedakan perangkat lunak sistem dan perangkat lunak aplikasi;
- menjelaskan peran sistem operasi: mengelola proses, memori, berkas, perangkat, dan antarmuka;
- menata berkas dan folder dengan nama yang rapi;
- membedakan jenis lisensi (proprietari, sumber terbuka, domain publik) dan memberi atribusi.

Modul ini melanjutkan butir CP yang berbunyi "memahami model dan menyimulasikan dinamika Input-Process-Output dalam sebuah komputer Von Neumann, serta memahami peran sistem operasi", dan menyiapkan butir "menghargai hak atas kekayaan intelektual".

Semua latihan memakai akun uji yang disiapkan guru. Kamu tidak perlu memakai akun, berkas, atau perangkat pribadimu.

## Ingat kembali

Jawab dari ingatan, tanpa membuka modul sebelumnya (FND-X1-M1). Cocokkan di bagian kunci.

1. Apa beda memori (RAM) dan penyimpanan? Mana yang isinya hilang saat listrik mati?
2. Sebutkan empat tahap siklus ambil-jalankan.
3. Pada program kartu `BACA, SIMPAN M1, BACA, TAMBAH M1, CETAK`, berapa keluaran untuk masukan `2, 9`?
4. Kelompokkan sebagai masukan atau keluaran: pemindai kode batang, pengeras suara, layar sentuh.

## Perangkat lunak: sistem dan aplikasi

Perangkat keras adalah bagian komputer yang bisa disentuh. **Perangkat lunak** adalah kumpulan instruksi yang dijalankan perangkat keras.

| Jenis | Tugas | Contoh |
| --- | --- | --- |
| Perangkat lunak sistem | mengelola komputer itu sendiri | sistem operasi, pengendali perangkat (driver), utilitas sistem |
| Perangkat lunak aplikasi | membantu pengguna mengerjakan sesuatu | peramban, pengolah kata, pemutar musik, permainan |

Perangkat lunak sistem menjadi landasan; aplikasi berjalan di atasnya.

## Sistem operasi

Sistem operasi (OS) adalah perangkat lunak sistem utama. Ia menjadi perantara antara aplikasi, pengguna, dan perangkat keras. Lima peran pentingnya:

| Peran | Penjelasan | Analogi di sekolah |
| --- | --- | --- |
| Mengelola proses | menentukan program mana yang mendapat giliran memakai CPU | guru piket yang mengatur giliran memakai lapangan |
| Mengelola memori | membagi RAM ke tiap program agar tidak saling menimpa | mengatur tempat duduk agar tiap murid punya bangku sendiri |
| Mengelola berkas | menyimpan, memberi nama, dan menemukan berkas di penyimpanan | petugas perpustakaan dengan katalog |
| Mengelola perangkat | berhubungan dengan papan ketik, layar, pencetak, dan lainnya | petugas yang tahu cara memakai tiap alat lab |
| Menyediakan antarmuka | cara pengguna berinteraksi: tampilan grafis atau baris perintah | loket layanan |

**Proses** adalah program yang sedang berjalan. Satu program bisa menjadi beberapa proses. Pada komputer yang sedang menyala, puluhan proses berjalan sekaligus; OS membagi waktu CPU di antara mereka dengan sangat cepat sehingga terlihat seperti berjalan bersamaan. (Pada CPU dengan beberapa inti, sebagian proses memang benar-benar berjalan bersamaan, masing-masing di intinya sendiri.)

## Kegiatan 1: Melihat daftar proses

**Prediksi dulu.** Sebelum membuka pengelola tugas, tebak dan tulis: berapa kira-kira jumlah proses yang berjalan di komputer lab saat hanya satu aplikasi terbuka (puluhan, ratusan, atau kurang dari sepuluh)? Setelah melihat daftarnya, bandingkan dengan tebakanmu.

Guru memandu menggunakan pengelola tugas (task manager) pada komputer lab. Peraturannya:

- Lihat saja. **Jangan menghentikan proses sistem.** Bila ragu, jangan hentikan apa pun.
- Catat tiga proses aplikasi dan tiga proses sistem yang kamu lihat, serta perkiraan pemakaian memorinya.
- Buka satu aplikasi lagi, lalu lihat apa yang berubah pada daftar.

Opsional bila komputer lab memakai Linux, perintah berikut hanya menampilkan informasi:

```sh
ps aux | head -n 10
```

`ps aux` menampilkan proses, dan `head -n 10` membatasi tampilan pada sepuluh baris pertama.

Isi tabel jejak berikut.

| No | Nama proses | Aplikasi atau sistem? | Perkiraan memori |
| --- | --- | --- | --- |
| 1 | | | |
| 2 | | | |
| 3 | | | |

## Berkas dan folder

**Berkas** menyimpan data (dokumen, gambar, program). **Folder** mengelompokkan berkas. Folder bisa berisi folder lain sehingga membentuk pohon.

```text
Tugas-Informatika/
  Minggu-01/
    Murid-01_lembar-spesifikasi.txt
    Murid-01_diagram-ipo.png
  Minggu-02/
    Murid-01_tabel-proses.txt
```

Aturan penamaan yang baik:

1. Nama menjelaskan isi: `tabel-proses`, bukan `baru1`.
2. Hindari spasi dan karakter khusus; pakai tanda hubung (atau garis bawah) sebagai pemisah. Huruf kecil paling aman, karena sebagian sistem membedakan huruf besar dan kecil pada nama berkas.
3. Pakai pola yang sama untuk semua berkas, misalnya `Murid-01_topik_tanggal`.
4. Ekstensi berkas (bagian setelah titik, mis. `.txt`, `.png`, `.pdf`) menunjukkan jenis isi. Mengubah ekstensi tidak mengubah isi sebenarnya.
5. Lakukan pencadangan: simpan salinan berkas penting di tempat lain.

Opsional di Linux dengan akun uji, perintah dasar untuk menata folder:

```sh
mkdir -p Tugas-Informatika/Minggu-01
cd Tugas-Informatika/Minggu-01
pwd
ls
```

- `mkdir -p` membuat folder (juga folder induknya bila perlu).
- `cd` pindah folder, `pwd` menampilkan lokasi saat ini, dan `ls` menampilkan isi folder.

## Kegiatan 2: Menata folder

Di akun uji, buat struktur folder seperti contoh di atas. Buat tiga berkas teks kosong dengan nama yang rapi. Guru lalu memberi daftar sepuluh nama berkas yang berantakan (misalnya `Dokumen baru (3) final FINAL.docx`); kamu mengganti namanya mengikuti aturan dan menaruhnya di folder yang tepat. Daftar ini berisi nama fiktif, bukan berkas pribadi.

## Lisensi perangkat lunak dan karya

Karya seperti program, foto, tulisan, dan musik dilindungi hak cipta. **Lisensi** adalah izin dari pembuat karya yang menyatakan apa yang boleh dan tidak boleh kamu lakukan dengan karya itu.

| Jenis | Ciri | Yang perlu diperhatikan |
| --- | --- | --- |
| Proprietari | kode dan hak penggunaan dimiliki pembuat; pemakaian mengikuti syarat pembuat | tidak boleh menyalin atau membagikan di luar syarat; sebagian berbayar |
| Sumber terbuka | kode sumber boleh dilihat, dipakai, dan sering boleh diubah dan dibagikan sesuai syarat lisensi | syarat tetap ada, misalnya wajib mencantumkan pembuat atau membagikan hasil ubahan dengan lisensi yang sama |
| Domain publik | hak cipta sudah berakhir atau dilepas pembuatnya | boleh dipakai bebas; tetap baik menyebut sumber |

Perhatikan: "gratis" tidak sama dengan "sumber terbuka". Perangkat lunak gratis bisa saja proprietari.

**Atribusi** adalah menyebut pembuat dan sumber karya yang kamu pakai. Contoh format atribusi untuk sebuah gambar fiktif:

```text
Gambar "Peta Jaringan Lab" oleh Pembuat-Fiktif, lisensi Contoh-1.0, sumber: contoh.example/peta
```

Menyalin karya orang lain tanpa izin dan tanpa menyebut sumber adalah pelanggaran. Menghargai hak atas kekayaan intelektual berarti memakai karya sesuai lisensinya dan memberi atribusi.

## Kegiatan 3: Membaca teks lisensi

Guru membagikan satu teks lisensi sumber terbuka yang pendek. Untuk latihan di modul ini disediakan **teks fiktif** berikut sebagai pengganti. Ia bukan lisensi sungguhan dan hanya untuk berlatih membaca.

```text
LISENSI CONTOH 1.0 (FIKTIF, UNTUK LATIHAN)
Kamu boleh memakai, menyalin, dan mengubah karya ini, termasuk untuk tujuan komersial.
Kamu wajib mencantumkan nama pembuat asli pada setiap salinan.
Kamu wajib membagikan karya hasil ubahanmu dengan lisensi yang sama.
Karya ini diberikan apa adanya, tanpa jaminan apa pun.
```

Isi tabel hak dan kewajiban.

| Pertanyaan | Jawabanmu |
| --- | --- |
| Boleh dipakai? | |
| Boleh diubah? | |
| Boleh dijual? | |
| Apa kewajibanmu? | |
| Ada jaminan dari pembuat? | |

## Latihan

### Latihan 1: Sistem atau aplikasi?

Kelompokkan: sistem operasi, pengolah kata, driver pencetak, peramban, pemutar video, pengelola tugas. Lalu tambahkan satu perangkat lunak yang batasnya kabur (misalnya pemindai virus) dan jelaskan mengapa ia bisa dimasukkan ke dua kelompok.

### Latihan 2: Peran sistem operasi

Cocokkan tiap situasi dengan peran sistem operasi.

1. Dua program berjalan bersamaan tanpa saling merusak datanya.
2. Kamu mencetak dan pencetak merespons.
3. Kamu mencari berkas lewat namanya.

### Latihan 3: Memperbaiki nama berkas

Perbaiki nama berikut sesuai aturan: `Tugas Informatika Baru!!!.docx`, `FOTO 1.PNG`, `ok (2).txt`. Anggap isinya: laporan minggu 2 oleh Murid-01, foto ruang lab, dan catatan proses.

### Latihan 4: Jenis lisensi

Sebuah aplikasi gratis diunduh, tetapi kodenya tidak boleh dilihat dan tidak boleh dibagikan. Jenis lisensinya apa? Mengapa "gratis" tidak sama dengan "sumber terbuka"?

### Latihan 5: Atribusi

Kamu memakai foto fiktif "Gedung Lab" karya Pembuat-Fiktif dengan Lisensi Contoh 1.0 untuk laporanmu. Tulis atribusinya.

### Latihan 6: Peta peran sistem operasi

Gambarlah peta pikiran (mind map) dengan "Sistem operasi" di tengah dan lima peran sebagai cabang. Tambahkan satu contoh nyata di komputer lab untuk tiap cabang. Hasilnya adalah keluaran minggu ini (peta peran sistem operasi).

### Latihan 7: Susun langkah (soal Parsons)

Langkah berikut tercampur. Susun menjadi urutan yang masuk akal untuk menata tugasmu di akun uji. Tiap langkah dipakai satu kali.

```text
(a) pindahkan berkas ke folder yang sesuai
(b) buat folder induk "Tugas-Informatika"
(c) ganti nama berkas yang berantakan menjadi nama yang menjelaskan isi
(d) buat subfolder "Minggu-02" di dalamnya
(e) simpan salinan berkas penting di tempat lain
```

## Latihan bercampur dan ulang berjarak

Kerjakan tanpa melihat catatan.

1. Program kartu `BACA, SIMPAN M1, BACA, TAMBAH M1, TAMBAH M1, CETAK` pada masukan `4, 5`: berapa keluarannya? (dari modul sebelumnya)
2. Tiga situasi: (i) kamu menyimpan berkas ke SSD, (ii) dua program tidak saling menimpa datanya di RAM, (iii) sebuah gambar mengikuti lisensi "wajib sebut pembuat". Peran sistem operasi atau konsep lisensi apa yang terkait di tiap situasi?
3. Sebuah aplikasi gratis kodenya tertutup. Jelaskan dengan kata-katamu mengapa "gratis" tidak berarti "sumber terbuka". (Penjelasan diri: sebut alasannya.)
4. Ubah nama `Foto Kelas FINAL (2).JPG` agar mengikuti aturan, lalu tulis atribusi untuk foto itu bila dibuat oleh Pembuat-Fiktif dengan Lisensi Contoh 1.0.

Jadwal ulang: jawab lagi tanpa catatan setelah satu hari dan setelah satu minggu. Soal serupa muncul lagi di awal modul berikutnya.

## Kuis formatif

1. Apa beda perangkat lunak sistem dan aplikasi?
2. Sebutkan lima peran sistem operasi.
3. Apa yang dimaksud proses?
4. Mengapa tidak boleh menghentikan proses sistem sembarangan?
5. Sebutkan tiga jenis lisensi dan satu ciri tiap jenis.
6. Apa itu atribusi?

## Cek mandiri

- Aku bisa memberi contoh perangkat lunak sistem dan aplikasi.
- Aku bisa menata folder dan menamai berkas dengan rapi.
- Aku bisa membaca lisensi sederhana dan mengatakan apa yang boleh dan wajib.

## Kunci dan petunjuk

**Latihan 1.** Sistem: sistem operasi, driver pencetak, pengelola tugas (utilitas sistem). Aplikasi: pengolah kata, peramban, pemutar video. Perangkat lunak yang batasnya kabur: pemindai virus sering disebut utilitas (sistem) karena menjaga komputer, tetapi dipasang dan dibuka pengguna seperti aplikasi. Jawaban yang menyebut alasan seperti itu diterima.

**Latihan 2.** 1 mengelola memori (juga proses), 2 mengelola perangkat, 3 mengelola berkas.

**Latihan 3.** Contoh: `laporan-minggu-02_murid-01.docx`, `foto-ruang-lab.png`, `catatan-proses.txt`. Jawaban lain diterima bila tanpa spasi atau karakter khusus, menjelaskan isi, dan konsisten.

**Latihan 4.** Proprietari. Gratis berkaitan dengan harga; sumber terbuka berkaitan dengan akses ke kode dan izin untuk mengubah dan membagikannya.

**Latihan 5.** Contoh: `Foto "Gedung Lab" oleh Pembuat-Fiktif, Lisensi Contoh 1.0.`

**Latihan 6.** Contoh: proses (pengelola tugas), memori (RAM dibagi ke aplikasi), berkas (folder tugas), perangkat (pencetak), antarmuka (tampilan desktop).

**Latihan 7.** Urutan: (b), (d), (c), (a), (e). Boleh juga (c) sebelum (b) dan (d), asalkan folder tujuan ada sebelum (a). Bila berkas dipindah sebelum foldernya ada, langkahnya gagal: tukar urutannya.

**Ingat kembali.** 1: RAM cepat dan sementara, penyimpanan tetap; isi RAM hilang. 2: ambil, pahami, jalankan, ulangi. 3: Akumulator 2, M1 = 2, Akumulator 9, TAMBAH M1 menjadi 11, CETAK 11. 4: pemindai masukan, pengeras suara keluaran, layar sentuh keduanya. Bila ada yang salah, buka lagi bagian terkait modul M1 hanya untuk soal itu, lalu jawab ulang besok.

**Latihan bercampur.** 1: Akumulator 4, M1 = 4, Akumulator 5, +4 = 9, +4 = 13; keluaran 13. 2: (i) mengelola berkas; (ii) mengelola memori; (iii) atribusi pada lisensi. 3: contoh: gratis soal harga, sumber terbuka soal akses ke kode dan izin mengubah serta membagikan; aplikasi gratis tertutup tetap proprietari. 4: `foto-kelas.jpg` (atau nama sejenis); atribusi: `Foto "Kelas" oleh Pembuat-Fiktif, Lisensi Contoh 1.0.`

**Kegiatan 3 (tabel lisensi).** Boleh dipakai: ya. Boleh diubah: ya. Boleh dijual: ya. Kewajiban: mencantumkan nama pembuat asli dan membagikan ubahan dengan lisensi yang sama. Jaminan: tidak ada.

**Kuis.**

1. Sistem mengelola komputer; aplikasi membantu pengguna mengerjakan tugas.
2. Proses, memori, berkas, perangkat, antarmuka.
3. Program yang sedang berjalan.
4. Sistem bisa tidak stabil atau mati.
5. Proprietari: dimiliki pembuat dan dibatasi syarat; sumber terbuka: kode boleh dilihat dengan syarat; domain publik: bebas dipakai.
6. Menyebut pembuat dan sumber karya yang dipakai.

## Langkah berikutnya

Lanjutkan ke modul representasi data (FND-X1-M3): bagaimana semua berkas, teks, dan gambar yang kamu kelola ternyata disimpan sebagai deretan bit.
