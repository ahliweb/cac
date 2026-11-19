## Untuk siapa modul ini

Modul ini untuk murid kelas 7 pada minggu ketiga. Mulai minggu ini kamu memakai **Scratch**, bahasa pemrograman berbentuk blok. Kamu butuh komputer dengan Scratch (peramban atau aplikasi luring), tanpa membuat akun; simpan karyamu sebagai berkas di komputer kelas atas arahan gurumu. Bila komputer tidak cukup, kamu tetap bisa mengerjakan hampir semuanya dengan tabel penelusuran di kertas berpetak. Waktunya satu pertemuan, 2 JP. Prasyaratnya `SMP7-1-M2` (algoritma).

## Ingat kembali

Tutup modul ini dan jawab dari ingatan.

1. Tulis arti kata **algoritma** dengan kalimatmu sendiri. (`SMP7-1-M2`)
2. Robot di (1, 1) menghadap atas menjalankan `MAJU`, `KANAN`, `MAJU`. Di mana robot berhenti dan menghadap ke mana? (`SMP7-1-M2`)
3. Sebutkan tiga kebiasaan kartu instruksi yang tepat. (`SMP7-1-M1`)

Cocokkan dengan catatanmu. Jawaban nomor 2: (2, 2), menghadap kanan.

## Tujuan

Setelah modul ini kamu dapat:

1. menyebut bagian layar Scratch: **panggung**, **sprite**, dan **blok**;
2. membaca posisi sprite sebagai pasangan x dan y di panggung;
3. menelusuri program blok gerak dan menuliskan posisi serta arah akhir sprite;
4. menyusun program yang membuat sprite berjalan mengikuti rute.

## Prediksi dulu

**Panggung** Scratch berukuran 480 x 360 titik. Titik tengahnya (0, 0). Makin ke kanan, x makin besar; makin ke atas, y makin besar. **Sprite** adalah tokoh yang bergerak di panggung. Sprite punya **arah**: 90 berarti menghadap kanan, 0 atas, 180 bawah, dan -90 kiri.

Tabel ini menghubungkan blok dengan robot minggu lalu. Satu baris satu blok.

| Blok (notasi teks) | Artinya |
| --- | --- |
| `go to x: (x) y: (y)` | Loncat ke titik (x, y); arah tidak berubah. |
| `point in direction (d)` | Hadapkan sprite ke arah d. |
| `move (n) steps` | Maju n langkah ke arah hadap. |
| `turn right (a) degrees` | Putar searah jarum jam sebesar a derajat. |
| `turn left (a) degrees` | Putar berlawanan jarum jam sebesar a derajat. |

Nama blok di layarmu bisa berbahasa Indonesia atau Inggris tergantung bahasa antarmuka; cocokkan lewat bentuk dan angkanya. Dalam modul ini, program blok ditulis sebagai teks: satu baris satu blok, angka dalam kurung, dan blok yang berada di dalam blok lain diberi indentasi.

Program R:

```text
when green flag clicked
go to x: (-100) y: (-60)
point in direction (90)
move (100) steps
turn left (90) degrees
move (80) steps
turn right (90) degrees
move (100) steps
```

**Prediksi.** Tulis di kertas: di titik mana sprite berhenti, dan menghadap ke mana? Jangan jalankan dulu.

**Jalankan.** Susun program R di Scratch, klik bendera hijau, lalu isi tabel penelusuran (x, y, arah setelah tiap blok):

| Blok | x | y | Arah |
| --- | --- | --- | --- |
| `go to x: (-100) y: (-60)` | | | |
| `point in direction (90)` | | | |
| `move (100) steps` | | | |
| `turn left (90) degrees` | | | |
| `move (80) steps` | | | |
| `turn right (90) degrees` | | | |
| `move (100) steps` | | | |

**Selidiki.** Bandingkan dengan prediksimu. Blok `turn` mengubah arah, bukan posisi. Blok `move` mengubah posisi menurut arah yang berlaku saat itu.

## Contoh terselesaikan

Penelusuran program R dengan alasan tiap baris:

| Blok | x | y | Arah | Alasan |
| --- | --- | --- | --- | --- |
| `go to x: (-100) y: (-60)` | -100 | -60 | 90 | Sprite meloncat; arah awal diatur 90 di baris berikut. |
| `point in direction (90)` | -100 | -60 | 90 | Menghadap kanan. |
| `move (100) steps` | 0 | -60 | 90 | Maju ke kanan: x bertambah 100. |
| `turn left (90) degrees` | 0 | -60 | 0 | 90 dikurangi 90; sprite menghadap atas. |
| `move (80) steps` | 0 | 20 | 0 | Maju ke atas: y bertambah 80. |
| `turn right (90) degrees` | 0 | 20 | 90 | Kembali menghadap kanan. |
| `move (100) steps` | 100 | 20 | 90 | Maju ke kanan 100 lagi. |

Hasil akhir: (100, 20), menghadap kanan. Perhatikan bahwa urutan tetap menentukan hasil, sama seperti robot minggu lalu: komputer menjalankan blok persis seperti tertulis.

Sprite harus tetap di dalam panggung. Pada contoh ini y terkecil -60 dan x terbesar 100, jadi aman.

## Contoh setengah jadi

Tugas: sprite mulai di (-100, 0) menghadap kanan dan harus berhenti di (0, 80). Isi bagian kosong, lalu telusuri di tabelmu.

```text
when green flag clicked
go to x: (-100) y: (0)
point in direction (90)
move (____) steps
turn left (____) degrees
move (____) steps
```

## Susun urutannya

Tujuh blok berikut sudah diacak. Susun menjadi program yang membawa sprite dari (0, 0) menghadap kanan, maju 50, naik 50, lalu berhenti.

- **A.** `move (50) steps`
- **B.** `when green flag clicked`
- **C.** `turn left (90) degrees`
- **D.** `go to x: (0) y: (0)`
- **E.** `move (50) steps`
- **F.** `point in direction (90)`

Tulis urutan hurufnya, lalu telusuri sampai ke titik akhir (50, 50).

## Latihan

1. **Ubah.** Pada program R, ganti hanya `turn left (90) degrees` menjadi `turn right (90) degrees`. Prediksi dulu titik dan arah akhirnya, lalu telusuri untuk membuktikannya.
2. **Buat.** Buat program yang membawa sprite berjalan mengikuti rute berbentuk huruf L: mulai di (-80, 80), turun 120, lalu ke kanan 100. Isi tabel penelusuran.
3. **Uji.** Tukar programmu dengan teman. Telusuri program temanmu di kertas lebih dulu, baru jalankan. Cocokkah?
4. **Jelaskan.** Dengan dua kalimat, jelaskan beda `go to` dan `move`.

## Latihan bercampur

1. Kartu: "Masukkan satu kantong teh ke dalam gelas." Tulis satu alasan kartu itu tepat menurut tiga kebiasaan `SMP7-1-M1`, lalu tulis kartu lain bergaya sama untuk "memindahkan sprite ke tengah panggung".
2. Algoritma robot `MAJU`, `KANAN`, `MAJU` pada kebun 5 x 5 mulai (1, 1) menghadap atas. Anggap satu petak sama dengan 50 langkah. Tulis program Scratch yang meniru gerakannya dengan `move (50) steps` dan `turn right (90) degrees`, mulai dari `point in direction (0)`, lalu bandingkan arah akhirnya dengan arah hadap robot.

## Ulang berjarak

Kerjakan ulang tanpa melihat modul ini, lalu cocokkan:

- **Minggu depan** (`SMP7-1-M4`): sebutkan titik tengah panggung dan arti arah 90.
- **Sekitar sebulan lagi** (`SMP7-1-M7`): telusuri program tiga blok dengan `move` dan `turn` di kertas tanpa komputer.
- **Akhir semester** (`SMP7-1-M14`): tulis dari ingatan satu program yang menggerakkan sprite membentuk huruf L.

## Kesalahan umum

- **Mengira `turn` memindahkan sprite.** `turn` hanya mengubah arah.
- **Tertukar kiri dan kanan.** Kiri dan kanan mengikuti arah hadap sprite, bukan arah hadap layar.
- **Mengira y makin ke bawah makin besar.** Di Scratch, naik berarti y bertambah.
- **Melupakan `point in direction`.** Arah sebelumnya masih berlaku bila tidak diatur ulang.
- **Menyusun program tanpa menelusuri dulu.** Prediksi di kertas menghemat waktu mencari blok yang salah.

## Cek mandiri

Tutup modul, jawab tanpa melihat, lalu periksa.

1. Berapa titik tengah panggung, dan ke mana x bertambah?
2. Sprite di (0, 0) menghadap kanan menjalankan `move (30) steps`, `turn left (90) degrees`, `move (20) steps`. Di mana sprite berhenti dan menghadap ke mana?
3. Apa beda `go to x: y:` dan `move`?

Daftar periksa (kosong; kamu isi sendiri, tidak dikumpulkan):

- [ ] Aku bisa menyebut panggung, sprite, dan blok.
- [ ] Aku bisa menelusuri posisi dan arah sprite di tabel.
- [ ] Aku bisa menyusun program rute.

Kunci: (1) (0, 0), ke kanan; (2) (30, 20), menghadap atas (arah 0); (3) `go to` meloncat ke titik tertentu, `move` bergerak dari posisi sekarang searah hadap.

## Langkah berikutnya

`SMP7-1-M4`, "Peristiwa dan urutan: menggambar bentuk". Kamu akan menambah pena supaya sprite meninggalkan garis, dan memakai peristiwa untuk memulai program.

## Catatan untuk guru

- **Waktu:** 2 JP x 40 menit `[asumsi]` (silabus bagian 2). Pasangan dua murid satu komputer untuk "Prediksi dulu" dan "Latihan".
- **Alat:** Scratch tanpa akun murid; berkas disimpan lokal atau di akun guru (silabus bagian 7 dan 9.2). Ketersediaan editor luring perlu dicek per 2026-11. Penamaan blok berbeda menurut bahasa antarmuka; cocokkan di kelas sebelum mulai.
- **Butir CP:** corpus memetakan minggu ini ke `D-BK-e` dan `DK-BK-c`. Modul ini mengklaim keduanya hanya sebagai latihan menulis instruksi berblok; tidak menyatakan CP "terpenuhi". Notasi blok teks mendahului pseudocode.
- **Kunci "Prediksi dulu":** (100, 20), menghadap kanan (arah 90). Penelusuran pada contoh terselesaikan.
- **Kunci "Contoh setengah jadi":** `move (100) steps`, `turn left (90) degrees`, `move (80) steps`; sprite berhenti di (0, 80).
- **Kunci "Susun urutannya":** B, D, F, A, C, E (atau B, D, F, E, C, A, karena A dan E sama bunyinya). `C` harus berada di antara dua `move`; `B` harus pertama.
- **Kunci latihan:** (1) sprite berakhir di (-100, -140), arah -90 (270 ditampilkan Scratch sebagai -90): (0, -60), arah 180, (0, -140), arah -90, (-100, -140); y tetap di dalam panggung. (2) contoh: `go to x: (-80) y: (80)`, `point in direction (180)`, `move (120) steps`, `turn left (90) degrees`, `move (100) steps`; hasil (20, -40), menghadap kanan. (3) saling menguji. (4) `go to` meloncat ke titik tertentu; `move` bergerak dari posisi sekarang searah hadap.
- **Petunjuk bertahap:** (a) tulis tabel untuk program asli; (b) tentukan arah yang harus dihadap untuk memindahkan y; (c) ubah satu blok lalu telusuri ulang.
- **AI:** tanpa AI. Kebijakan `smp-coding` (silabus bagian 7.1): AI generatif hanya demonstrasi guru, tanpa akun murid; tugas dikerjakan murid sendiri.
- **Privasi:** tidak ada nama murid di berkas proyek; tidak ada foto atau suara murid.
- **Unsur pembelajaran:** ingat kembali dan jarak (`K`, riset 3.1 dan 3.2), PRIMM (`K` usia 11 sampai 14, riset 6.3), tabel penelusuran (`K`, riset 6.2), contoh terselesaikan lalu setengah jadi (`K`, riset 3.4), Parsons (`M`, riset 6.3), latihan bercampur (`K`, riset 3.3).

## Rujukan

- *Panduan Mata Pelajaran Informatika, Fase D – F*, BSKAP, 2025:
  <https://repositori.kemendikdasmen.go.id/33634/1/32.%20Panduan%20Mata%20Pelajaran%20Informatika.pdf>
- Scratch, tentang Scratch (situs resmi Scratch Foundation): <https://scratch.mit.edu/about>
