## Untuk siapa modul ini

Modul ini untuk murid kelas X pemula, mengikuti minggu fondasi keenam (FND-X1-M6): keamanan dasar dan etika digital. Sebaiknya kamu sudah membaca modul jaringan dan internet.

Setelah mempelajari modul ini, kamu diharapkan bisa:

- menyusun kata sandi yang kuat dan memahami fungsi manajer kata sandi;
- menjelaskan dan menerapkan autentikasi dua langkah secara sederhana;
- menerapkan konfigurasi privasi dan keamanan pada akun uji;
- menjelaskan langkah keamanan konektivitas dasar;
- mengenali pesan tipuan (phishing);
- menghargai hak atas kekayaan intelektual.

Modul ini menyiapkan beberapa butir capaian pembelajaran, antara lain: "menerapkan pengelolaan kata sandi dengan manajer kata sandi, dan menerapkan autentikasi dua langkah secara sederhana", "menerapkan konfigurasi privasi dan keamanan pada akun platform digital", "memahami konsep dan penerapan serta konfigurasi keamanan dasar untuk konektivitas jaringan data lokal dan internet baik kabel maupun nirkabel", serta "menghargai hak atas kekayaan intelektual".

## Aturan keselamatan modul ini

Bagian ini penting dan berlaku untuk semua kegiatan:

1. **Jangan pernah memakai kata sandi sungguhan** milikmu atau milik orang lain dalam latihan, lembar kerja, atau tangkapan layar. Semua kata sandi di modul ini fiktif dan sudah tidak berguna.
2. **Latihan memakai akun uji** yang disiapkan guru, bukan akun pribadimu. Akun uji dibuat khusus untuk latihan dan berisi data karangan.
3. **Kamu tidak wajib memasang apa pun di ponsel pribadimu.** Autentikasi dua langkah didemonstrasikan oleh guru. Bila kamu ingin mencobanya di akunmu sendiri, lakukan di rumah bersama orang tua atau wali.
4. Jangan membagikan kata sandi, kode verifikasi, atau data pribadi (nama lengkap, alamat, nomor telepon, nomor identitas) di kelas. Bila perlu nama, pakai nama samaran seperti Murid-01.

## Kata sandi yang kuat

Kata sandi adalah pintu akunmu. Kata sandi lemah ibarat pintu yang kuncinya tertinggal.

Yang membuat kata sandi kuat:

- **Panjang.** Makin panjang makin sulit ditebak. Utamakan panjang daripada trik huruf.
- **Acak dan unik.** Jangan pakai nama, tanggal lahir, nomor telepon, atau kata umum seperti `password` dan `123456`.
- **Berbeda di setiap akun.** Bila satu akun bocor, akun lain tidak ikut.
- **Frasa sandi (passphrase).** Beberapa kata acak yang tidak berhubungan, misalnya empat sampai enam kata, mudah diingat tetapi panjang.

Mengapa panjang penting? Jumlah kemungkinan kata sandi bertambah sangat cepat:

| Jenis kata sandi | Banyak kemungkinan |
| --- | --- |
| PIN 4 angka | 10.000 |
| 8 huruf kecil | 208.827.064.576 (sekitar 209 miliar) |
| 12 huruf kecil | 95.428.956.661.682.176 (sekitar 9,5 x 10^16) |

Sebagai gambaran hipotetis: bila penyerang bisa mencoba satu miliar tebakan per detik, 8 huruf kecil habis dicoba dalam sekitar 209 detik, sedangkan 12 huruf kecil membutuhkan sekitar 3 tahun. Angka ini hanya ilustrasi perhitungan, bukan ramalan; kecepatan penyerang sebenarnya bergantung pada banyak hal.

Contoh fiktif untuk perbandingan (jangan dipakai di akun mana pun):

```text
LEMAH : sekolah123
LEMAH : murid01
LEMAH : 20080101
LEBIH BAIK : kopi-hujan-tangga-biru-sepatu
```

Frasa terakhir lebih baik karena panjang, tetapi tetap hanya contoh; bila sudah tertulis di modul, jangan dipakai.

## Manajer kata sandi

Mengingat puluhan kata sandi unik hampir mustahil. **Manajer kata sandi** adalah aplikasi yang menyimpan kata sandi dalam brankas terenkripsi. Kamu cukup mengingat satu **kata sandi utama** yang kuat; sisanya diingat aplikasi. Manajer juga bisa membuat kata sandi acak yang panjang.

Hal yang perlu diperhatikan:

- Pilih aplikasi yang tepercaya. Sekolah dapat menyediakan manajer kata sandi lokal bersumber terbuka untuk latihan.
- Kata sandi utama tidak boleh sama dengan kata sandi lain, dan tidak boleh dibagikan.
- Simpan cara pemulihan (misalnya kode cadangan) di tempat aman.
- Di latihan, gunakan manajer hanya untuk akun uji.

## Autentikasi dua langkah

**Autentikasi dua langkah** menambah satu langkah pembuktian selain kata sandi. Faktor yang umum:

| Faktor | Contoh |
| --- | --- |
| Yang kamu ketahui | kata sandi, PIN |
| Yang kamu miliki | kode dari aplikasi pembangkit kode, perangkat kunci keamanan |
| Siapa kamu | sidik jari, wajah |

Bila kata sandimu bocor, penyerang masih membutuhkan faktor kedua. Pesan SMS bisa dipakai, tetapi aplikasi pembangkit kode atau kunci keamanan umumnya lebih tahan penipuan. Kode verifikasi bersifat rahasia: jangan beri kode kepada siapa pun, termasuk orang yang mengaku petugas.

**Demonstrasi oleh guru:** guru mengaktifkan autentikasi dua langkah pada akun uji dengan perangkat guru atau perangkat lab, dan murid mengamati langkah-langkahnya. Murid tidak diminta memasang aplikasi pada ponsel pribadi.

## Privasi dan keamanan akun

Platform digital punya banyak pengaturan privasi. Beberapa hal yang patut diperiksa pada setiap akun:

- siapa yang bisa melihat profil dan unggahanmu (semua orang, teman, atau hanya kamu);
- apakah lokasi dibagikan;
- aplikasi pihak ketiga yang diizinkan mengakses akun;
- perangkat yang sedang masuk (keluarkan yang tidak dikenal);
- notifikasi login baru dan opsi pemulihan akun.

Prinsipnya: bagikan seperlunya. Data pribadi yang sudah tersebar sulit ditarik kembali.

## Keamanan konektivitas dasar

| Langkah | Alasan |
| --- | --- |
| Ganti kata sandi bawaan perangkat jaringan (router, titik akses) | kata sandi bawaan sering sama untuk satu model dan mudah ditebak |
| Pakai jaringan nirkabel terenkripsi dengan kata sandi yang kuat | agar orang luar tidak ikut memakai dan tidak membaca lalu lintas |
| Waspada jaringan publik (Wi-Fi terbuka) | pihak lain di jaringan yang sama berpotensi mengintip atau memalsukan jaringan |
| Periksa tanda HTTPS (gembok) sebelum memasukkan data penting | HTTPS mengenkripsi data antara peramban dan server |
| Perbarui perangkat dan aplikasi | pembaruan menutup celah yang ditemukan |
| Jangan mengabaikan peringatan sertifikat pada peramban | peringatan dapat berarti situs palsu atau koneksi disadap |

Catatan: HTTPS berarti sambungan terenkripsi, bukan jaminan bahwa situs itu jujur. Situs penipu pun dapat memakai HTTPS. Perhatikan juga nama situsnya.

## Mengenali pesan tipuan (phishing)

Phishing adalah usaha menipu agar kamu menyerahkan kata sandi, kode verifikasi, atau uang. Tanda-tandanya:

- mendesak atau menakut-nakuti ("akunmu ditutup dalam 1 jam");
- meminta kata sandi atau kode verifikasi;
- alamat pengirim atau tautan mirip tetapi sedikit berbeda dengan yang asli;
- iming-iming hadiah yang tidak masuk akal;
- ada lampiran atau tautan yang tidak kamu duga;
- bahasa aneh atau tidak konsisten.

Yang sebaiknya dilakukan: jangan klik tautan, jangan buka lampiran, jangan balas; buka situs resmi lewat alamat yang kamu ketik sendiri; laporkan kepada guru atau orang dewasa tepercaya.

Contoh pesan **sintetis** untuk latihan (semua fiktif):

```text
Dari: layanan-akun@contoh-layanan.example
Isi : "Akunmu akan ditutup dalam 1 jam. Klik http://contoh-layanan.example/masuk
       dan masukkan kata sandimu untuk memastikan akunmu tetap aktif."
```

## Etika digital dan hak kekayaan intelektual

Karya digital seperti tulisan, gambar, musik, video, dan program dilindungi hak cipta. Menghargainya berarti:

- meminta izin atau memakai karya sesuai lisensinya (modul perangkat lunak dan sistem operasi membahas jenis lisensi);
- menyebut pembuat dan sumber (atribusi);
- tidak menyalin tugas teman atau karya orang lain sebagai karyamu sendiri;
- tidak menyebarkan data atau foto orang lain tanpa izin.

## Kegiatan

**Kegiatan 1: Audit kata sandi dengan bahan sintetis.** Guru membagikan daftar kata sandi fiktif. Kelompok menilai tiap kata sandi: panjang, mudah ditebak atau tidak, ada hubungan dengan data pribadi atau tidak. Isi tabel.

| Kata sandi fiktif | Panjang | Alasan lemah atau kuat | Nilai (lemah, sedang, kuat) |
| --- | --- | --- | --- |
| `sekolah123` | | | |
| `Murid-01!` | | | |
| `jerapah-bulan-kereta-hijau-tangga-mawar` | | | |
| `qwerty` | | | |

**Kegiatan 2: Mengatur akun uji.** Dengan akun uji dan manajer kata sandi lokal bersumber terbuka (bila sekolah menyediakan), kelompok membuat kata sandi acak panjang untuk akun uji, menyimpannya di manajer, dan mencoba masuk. Bila manajer belum tersedia, kerjakan sebagai latihan kertas: tuliskan langkah-langkahnya.

**Kegiatan 3: Demonstrasi autentikasi dua langkah.** Guru mendemonstrasikan; murid mengisi catatan: apa faktor pertama, apa faktor kedua, apa yang terjadi bila kata sandi benar tetapi faktor kedua salah.

**Kegiatan 4: Membandingkan konfigurasi privasi.** Guru menyiapkan dua akun uji dengan konfigurasi berbeda (satu terbuka, satu tertutup). Murid mencatat apa yang bisa dilihat orang asing pada tiap akun.

**Kegiatan 5: Mengenali pesan tipuan sintetis.** Guru membagikan lima pesan sintetis, sebagian tipuan dan sebagian pesan sah. Murid menandai tanda-tanda dan memutuskan tindakan.

**Lembar periksa keamanan akun** (keluaran minggu ini, isi untuk akun uji):

- [ ] Kata sandi panjang dan unik
- [ ] Disimpan di manajer kata sandi
- [ ] Autentikasi dua langkah aktif (demonstrasi)
- [ ] Privasi profil diperiksa
- [ ] Perangkat yang masuk diperiksa
- [ ] Opsi pemulihan akun diperiksa

**Daftar periksa keamanan konektivitas** (keluaran minggu ini): tulis ulang enam langkah pada tabel keamanan konektivitas dengan kata-katamu, dan beri tanda untuk yang berlaku di lab sekolah (tanpa menulis alamat atau kata sandi nyata).

## Latihan

### Latihan 1: Menyusun frasa sandi

Susun contoh frasa sandi dari lima kata acak (hanya di kertas latihan dan jangan dipakai di akun nyata). Jelaskan mengapa frasa panjang lebih baik daripada kata pendek dengan simbol.

### Latihan 2: Hitung kemungkinan

Berapa banyak kemungkinan kata sandi yang terdiri dari 6 huruf kecil? (Jawab dengan 26^6.) Bandingkan dengan 8 huruf kecil.

### Latihan 3: Pilih langkah

Apa yang kamu lakukan bila menerima pesan yang meminta kode verifikasimu?

### Latihan 4: Konektivitas

Sebuah kafe fiktif menyediakan Wi-Fi tanpa kata sandi. Tulis tiga kebiasaan aman bila kamu terpaksa memakainya.

### Latihan 5: Analisis pesan sintetis

Pada contoh pesan sintetis di atas, tuliskan tiga tanda yang mencurigakan.

### Latihan 6: Atribusi

Seorang murid fiktif memakai gambar dari internet pada laporannya tanpa menyebut sumber. Apa yang perlu dilakukan?

## Kuis formatif

1. Mengapa kata sandi sebaiknya berbeda di setiap akun?
2. Apa fungsi manajer kata sandi?
3. Sebutkan dua faktor autentikasi yang berbeda jenis.
4. Apakah situs ber-HTTPS pasti aman dari penipuan? Jelaskan.
5. Apa yang harus diganti pada router baru?
6. Sebutkan dua tanda pesan phishing.

## Cek mandiri

- Aku bisa menilai kekuatan sebuah kata sandi dan menjelaskan alasannya.
- Aku bisa menjelaskan mengapa kode verifikasi tidak boleh dibagikan.
- Aku bisa menyebut langkah keamanan konektivitas dasar.
- Aku bisa memberi atribusi pada karya yang kupakai.

## Kunci dan petunjuk

**Kegiatan 1.** `sekolah123`: 10 karakter, kata umum dan angka urut: lemah. `Murid-01!`: 9 karakter, pola mudah ditebak: lemah. `jerapah-bulan-kereta-hijau-tangga-mawar`: panjang dan terdiri dari kata acak: kuat (tetapi hanya contoh). `qwerty`: 6 karakter, pola papan ketik terkenal: lemah.

**Latihan 1.** Jawaban bebas. Alasan: panjang meningkatkan jumlah kemungkinan jauh lebih banyak daripada mengganti satu huruf dengan simbol, dan lebih mudah diingat.

**Latihan 2.** 26^6 = 308.915.776. 8 huruf kecil = 208.827.064.576, yaitu 676 kali lebih banyak (26^2 = 676).

**Latihan 3.** Jangan beri kode. Jangan klik tautan. Laporkan ke guru atau orang dewasa tepercaya.

**Latihan 4.** Misalnya: pastikan tanda HTTPS sebelum memasukkan data penting; jangan masuk ke akun penting; keluar (logout) dan lupakan jaringan setelah selesai; perbarui perangkat.

**Latihan 5.** Misalnya: mendesak (1 jam); meminta kata sandi; alamat memakai http, bukan https, dan nama situs tidak dikenal.

**Latihan 6.** Menyebut pembuat dan sumber gambar; periksa lisensinya apakah boleh dipakai; bila tidak jelas, ganti dengan gambar yang berlisensi bebas atau buat sendiri.

**Kuis.**

1. Bila satu akun bocor, akun lain tetap aman.
2. Menyimpan kata sandi di brankas terenkripsi dan membuat kata sandi acak.
3. Misalnya kata sandi (diketahui) dan kode dari aplikasi pembangkit kode (dimiliki).
4. Tidak; HTTPS hanya mengenkripsi sambungan, situs penipu pun bisa memakainya.
5. Kata sandi bawaan.
6. Misalnya mendesak, meminta kode atau kata sandi.

## Langkah berikutnya

Lanjutkan ke modul perangkat pengolah dokumen, lembar kerja, dan presentasi (FND-X1-M7). Kebiasaan aman yang baru kamu pelajari tetap dipakai: nama samaran, tanpa data pribadi, dan atribusi untuk gambar.
