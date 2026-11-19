## Untuk siapa modul ini

Modul ini untuk murid kelas 7 pada minggu kedua. Kamu sudah belajar menulis kartu instruksi yang tepat (`SMP7-1-M1`). **Tidak memakai komputer.** Kamu butuh kertas berpetak, pensil, satu teman, dan satu benda kecil sebagai "robot" (penghapus atau tutup pulpen). Waktunya satu pertemuan, 2 JP.

Seperti pada minggu pertama, semua dilakukan di atas kertas dan lantai kelas. Tidak ada kegiatan yang berbahaya.

## Ingat kembali

Tutup modul ini dan jawab dari ingatan, tanpa bertanya siapa pun.

1. Sebutkan tiga kebiasaan kartu instruksi yang tepat. (`SMP7-1-M1`)
2. Mengapa "Tuang air." kurang tepat untuk robot? (`SMP7-1-M1`)
3. Kartu: "Beri gula. Aduk." Apa yang berubah bila urutannya dibalik? (`SMP7-1-M1`)

Cocokkan sesudahnya dengan catatan minggu lalu. Bila nomor 1 belum lengkap, tulis ulang dulu sebelum lanjut. Mengingat dengan susah payah itu bagian dari belajar.

## Tujuan

Setelah modul ini kamu dapat:

1. menjelaskan bahwa **algoritma** adalah urutan langkah berhingga untuk menyelesaikan suatu tugas;
2. menelusuri sebuah algoritma langkah demi langkah dan menuliskan hasil akhirnya;
3. menunjukkan bahwa urutan yang salah bisa memberi hasil yang salah walau tiap langkahnya benar;
4. menulis algoritma pendek dengan kosakata terbatas.

## Prediksi dulu

Lantai kelas (atau kertas berpetak) kita anggap kebun 5 x 5 petak. Petak ditulis (kolom, baris): kolom dihitung dari kiri, baris dari bawah. Robot mulai di petak (1, 1) **menghadap ke atas**. Robot hanya mengenal tiga perintah:

| Perintah | Artinya |
| --- | --- |
| `MAJU` | Pindah satu petak ke arah hadap. |
| `KANAN` | Putar 90 derajat ke kanan, tetap di petak yang sama. |
| `KIRI` | Putar 90 derajat ke kiri, tetap di petak yang sama. |

Algoritma P:

```text
MAJU
MAJU
KANAN
MAJU
KIRI
MAJU
```

**Prediksi.** Tulis di kertas: di petak mana robot berhenti, dan menghadap ke mana? Jangan peragakan dulu.

**Jalankan.** Temanmu menggerakkan benda "robot" satu perintah demi satu perintah. Kamu mengisi tabel penelusuran ini:

| Langkah | Perintah | Petak | Menghadap |
| --- | --- | --- | --- |
| 0 | (mulai) | (1, 1) | atas |
| 1 | | | |
| 2 | | | |
| 3 | | | |
| 4 | | | |
| 5 | | | |
| 6 | | | |

**Selidiki.** Cocokkan tabel dengan prediksimu. Di langkah mana prediksimu mulai berbeda? Biasanya di perintah `KANAN` atau `KIRI`: perintah itu tidak memindahkan robot, hanya mengubah arah hadapnya.

## Contoh terselesaikan

Tugas: robot dari (1, 1) harus sampai di petak harta (3, 3).

Algoritma Q:

```text
MAJU
MAJU
KANAN
MAJU
MAJU
```

| Langkah | Perintah | Petak | Menghadap | Alasan |
| --- | --- | --- | --- | --- |
| 0 | (mulai) | (1, 1) | atas | Keadaan awal. |
| 1 | `MAJU` | (1, 2) | atas | Naik satu petak. |
| 2 | `MAJU` | (1, 3) | atas | Naik lagi; kita sejajar baris 3. |
| 3 | `KANAN` | (1, 3) | kanan | Baru sekarang berbelok, supaya maju ke kanan. |
| 4 | `MAJU` | (2, 3) | kanan | Bergeser ke kanan. |
| 5 | `MAJU` | (3, 3) | kanan | Sampai di harta. |

Sekarang tukar langkah 2 dan langkah 3, jadi `MAJU`, `KANAN`, `MAJU`, `MAJU`, `MAJU`. Tiap perintah tetap sah, tetapi robot berhenti di (4, 2), bukan di (3, 3). Inilah dua hal yang membuat sebuah urutan disebut algoritma: langkahnya **tepat** (seperti kartu minggu lalu) dan urutannya **benar**. Urutan yang salah tidak membuat robot rusak; ia hanya sampai di tempat yang salah.

## Contoh setengah jadi

Tugas: dari (1, 1) menghadap atas, robot harus sampai di (4, 2). Isi bagian yang kosong lalu telusuri di tabelmu sendiri.

```text
MAJU
____
MAJU
MAJU
MAJU
```

Petunjuk: robot perlu satu belokan, dan belokan itu terjadi **setelah** ia naik satu petak ke baris 2. Setelah kamu mengisi, telusuri dari (1, 1). Kalau robot tidak berhenti di (4, 2), perbaiki isianmu.

## Susun urutannya

Enam kartu berikut sudah diacak. Susun menjadi algoritma yang membawa robot dari (1, 1), menghadap atas, ke petak (4, 3).

- **A.** `MAJU`
- **B.** `KANAN`
- **C.** `MAJU`
- **D.** `MAJU`
- **E.** `MAJU`
- **F.** `MAJU`

Kartu A sampai F kebetulan memakai kata yang sama, jadi yang kamu susun adalah **jumlah `MAJU` sebelum dan sesudah `KANAN`**. Tulis urutanmu sebagai daftar perintah, lalu telusuri untuk membuktikan robot sampai di (4, 3).

## Latihan

1. **Ubah.** Ubah algoritma Q agar robot berhenti di (3, 4), bukan (3, 3), dengan menambahkan satu perintah saja. Telusuri untuk membuktikannya.
2. **Uji.** Satu orang menjadi pemberi instruksi (hanya boleh membaca perintah dari kertasnya), satu orang menjadi robot. Pemberi instruksi tidak boleh menjelaskan lebih dari yang tertulis. Tukar peran.
3. **Buat.** Tulis algoritma dengan tiga perintah di atas yang membawa robot dari (1, 1) ke (5, 1), lalu ke (5, 5). Catat berapa perintah yang kamu pakai.
4. **Temukan.** Tulis satu algoritma yang urutannya salah, tetapi robot tetap sampai di tempat yang benar. Apakah hal itu mungkin? Catat temuanmu.
5. **Jelaskan.** Dengan dua kalimat, jelaskan mengapa `KANAN` tidak sama dengan "pindah ke kanan".

## Latihan bercampur

Latihan bercampur dimulai di `SMP7-1-M3`, saat konsep kartu dan algoritma bertemu dengan blok Scratch. Minggu ini kamu cukup mengerjakan latihan di atas.

## Ulang berjarak

Kerjakan ulang tanpa melihat modul ini, lalu cocokkan:

- **Minggu depan** (`SMP7-1-M3`): tulis arti kata algoritma dengan kalimatmu sendiri.
- **Sekitar sebulan lagi** (`SMP7-1-M6`, memecah masalah): ambil satu tugas sehari-hari yang panjang, lalu pecah menjadi tiga bagian yang masing-masing punya algoritma sendiri.
- **Akhir semester** (`SMP7-1-M14`): tanpa melihat, telusuri algoritma P dari awal di atas kertas.

## Kesalahan umum

- **`KANAN` sama dengan pindah ke kanan.** Bukan. `KANAN` memutar arah hadap; petaknya tidak berubah.
- **Menghitung petak awal sebagai langkah.** Robot sudah berada di (1, 1); langkah pertama baru memindahkannya.
- **Melompat dari awal ke hasil.** Menebak hasil tanpa menelusuri membuat belokan terlewat. Tulis tabel, satu baris satu perintah.
- **Mengira urutan benar hanya ada satu.** Dua algoritma berbeda bisa sampai ke tempat yang sama, tetapi menukar dua perintah sembarangan bisa mengubah tempat berhenti.
- **Mencampur arah robot dengan arahmu.** Kanan robot bergantung pada arah hadapnya, bukan arah hadapmu.

## Cek mandiri

Tutup modul, jawab tanpa melihat, lalu periksa.

1. Apa arti algoritma menurut modul ini?
2. Robot di (1, 1) menghadap atas menjalankan `KANAN`, `MAJU`, `MAJU`. Di mana robot berhenti?
3. Mengapa menukar dua perintah bisa membuat hasilnya salah walau tiap perintah sah?

Daftar periksa (kosong; kamu isi sendiri, tidak dikumpulkan):

- [ ] Aku bisa menelusuri algoritma sampai petak akhir dan arah hadap.
- [ ] Aku bisa menunjukkan akibat urutan yang salah.
- [ ] Aku bisa menulis algoritma pendek dengan perintah terbatas.

Kunci: (1) urutan langkah berhingga, tepat dan berurutan, untuk menyelesaikan tugas; (2) (3, 1), menghadap kanan; (3) perintah yang berubah urutannya dijalankan pada keadaan yang berbeda (petak atau arah hadap lain), sehingga akibatnya berbeda.

## Langkah berikutnya

`SMP7-1-M3`, "Mengenal Scratch: panggung, sprite, blok gerak". Algoritma yang kamu telusuri minggu ini akan kamu tulis sebagai blok yang dijalankan komputer, dan komputer akan menjalankannya persis seperti robot.

## Catatan untuk guru

- **Waktu:** 2 JP x 40 menit `[asumsi]` (silabus bagian 2). Permainan "robot-dan-pemberi-instruksi" paling baik berpasangan; pembagian peran digilir.
- **Bahan:** kertas berpetak atau petak lantai dengan lakban, benda kecil sebagai robot. Tanpa komputer.
- **Butir CP:** corpus memetakan minggu ini ke `D-BK-a` dan `D-BK-e`. Modul ini mengklaim keduanya sebatas menelusuri dan menulis algoritma dengan kosakata terbatas (tiga perintah); modul tidak menyatakan CP "terpenuhi". Tiga perintah robot adalah kosakata terbatas awal; pseudocode dibahas lebih lanjut di semester berikutnya.
- **Kunci "Prediksi dulu":** robot berhenti di (2, 4) menghadap atas. Penelusuran: (1, 2), (1, 3), (1, 3) kanan, (2, 3), (2, 3) atas, (2, 4).
- **Kunci "Contoh setengah jadi":** isi `KANAN` pada lubang kedua; robot berhenti di (4, 2).
- **Kunci "Susun urutannya":** `MAJU`, `MAJU`, `KANAN`, `MAJU`, `MAJU`, `MAJU`. Urutan lain dengan jumlah `MAJU` sebelum `KANAN` yang berbeda tidak sampai di (4, 3).
- **Kunci latihan:** (1) tambahkan satu `MAJU` sebelum `KANAN`: `MAJU`, `MAJU`, `MAJU`, `KANAN`, `MAJU`, `MAJU` membawa robot ke (3, 4). (3) contoh: `KANAN`, `MAJU` x 4, `KIRI`, `MAJU` x 4 (10 perintah); jawaban lain boleh bila ditelusuri benar. (4) mungkin: menukar dua `MAJU` yang bersebelahan tidak mengubah apa pun; menukar `MAJU` dengan `KANAN` mengubah hasil. (5) `KANAN` hanya mengubah arah hadap.
- **Petunjuk bertahap Latihan 1:** (a) tulis tabel penelusuran Q; (b) berapa petak ke atas dan berapa petak ke kanan yang dibutuhkan? (c) di bagian mana `MAJU` tambahan harus disisipkan agar robot sudah di baris 4 sebelum berbelok?
- **AI:** modul ini tidak memakai AI. Kebijakan `smp-coding` (silabus bagian 7.1): AI generatif hanya didemonstrasikan guru, tanpa akun murid; tugas dan asesmen dikerjakan murid sendiri.
- **Privasi:** jangan mengumpulkan kertas bernama murid ke repositori atau layanan daring. Contoh memakai peran, bukan nama.
- **Unsur pembelajaran** (rancangan modul bagian 4): ingat kembali dan jarak (`K`, riset 3.1, 3.2), PRIMM (`K` usia 11 sampai 14, riset 6.3), tabel penelusuran (`K`, riset 6.2), contoh terselesaikan lalu setengah jadi (`K`, riset 3.4), soal Parsons (`M`, riset 6.3).
