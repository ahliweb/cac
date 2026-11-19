## Untuk siapa modul ini

Modul ini untuk murid kelas 7 pada minggu keempat. Kamu memakai Scratch lagi, tanpa akun; simpan berkas sesuai arahan gurumu. Bila komputer terbatas, tabel penelusuran di kertas berpetak sudah cukup untuk sebagian besar kegiatan. Waktunya satu pertemuan, 2 JP. Prasyaratnya `SMP7-1-M3` (blok gerak).

## Ingat kembali

Tutup modul ini dan jawab dari ingatan.

1. Berapa titik tengah panggung, dan arah berapa yang berarti menghadap kanan? (`SMP7-1-M3`)
2. Sprite di (0, 0) menghadap kanan menjalankan `move (30) steps`, `turn left (90) degrees`, `move (20) steps`. Di mana ia berhenti? (`SMP7-1-M3`)
3. Mengapa menukar dua perintah robot bisa membuatnya berhenti di petak yang salah? (`SMP7-1-M2`)
4. Sebutkan tiga kebiasaan kartu instruksi yang tepat. (`SMP7-1-M1`)

Kunci: (1) (0, 0) dan 90; (2) (30, 20); (3) tiap perintah dijalankan pada keadaan yang dibuat perintah sebelumnya; (4) satu langkah satu tindakan, sebut benda dan jumlah, urutan dipikirkan.

## Tujuan

Setelah modul ini kamu dapat:

1. menjelaskan bahwa program Scratch dimulai oleh sebuah **peristiwa** (misalnya klik bendera hijau atau menekan tombol);
2. memakai blok pena agar sprite menggambar garis;
3. menelusuri program yang menggambar persegi dan segitiga;
4. menulis program menggambar dengan urutan blok yang benar.

## Prediksi dulu

Blok pena (dari ekstensi Pena atau *Pen*) dipakai begini: `pen down` membuat sprite meninggalkan garis saat bergerak, `pen up` menghentikannya, dan `erase all` menghapus semua gambar. Blok peristiwa seperti `when green flag clicked` dan `when [space] key pressed` menjadi **topi** program: skrip di bawahnya berjalan saat peristiwa itu terjadi.

Program S:

```text
when [space] key pressed
erase all
go to x: (-50) y: (-50)
point in direction (90)
pen down
move (100) steps
turn right (90) degrees
move (100) steps
turn right (90) degrees
move (100) steps
turn right (90) degrees
move (100) steps
turn right (90) degrees
pen up
```

**Prediksi.** Gambar apa yang muncul bila kamu menekan spasi? Berapa arah sprite pada akhirnya? Tulis dulu.

**Jalankan.** Susun program S, tekan spasi, dan isi tabel penelusuran:

| Blok | x | y | Arah |
| --- | --- | --- | --- |
| `go to x: (-50) y: (-50)` | | | |
| `move (100) steps` (pertama) | | | |
| `turn right (90) degrees` (pertama) | | | |
| `move (100) steps` (kedua) | | | |
| `turn right (90) degrees` (kedua) | | | |
| `move (100) steps` (ketiga) | | | |
| `turn right (90) degrees` (ketiga) | | | |
| `move (100) steps` (keempat) | | | |
| `turn right (90) degrees` (keempat) | | | |

**Selidiki.** Cocokkan dengan prediksimu. Apa yang terjadi di akhir? Mengapa arah akhir sama dengan arah awal?

## Contoh terselesaikan

Penelusuran program S:

| Blok | x | y | Arah | Alasan |
| --- | --- | --- | --- | --- |
| `go to x: (-50) y: (-50)` | -50 | -50 | 90 | Titik awal; pena belum turun saat sprite meloncat ke sini. |
| `move (100) steps` (pertama) | 50 | -50 | 90 | Sisi atas: x bertambah 100. |
| `turn right (90) degrees` (pertama) | 50 | -50 | 180 | Menghadap bawah. |
| `move (100) steps` (kedua) | 50 | -150 | 180 | Sisi kanan: y berkurang 100. |
| `turn right (90) degrees` (kedua) | 50 | -150 | -90 | 270 ditampilkan Scratch sebagai -90 (kiri). |
| `move (100) steps` (ketiga) | -50 | -150 | -90 | Sisi bawah. |
| `turn right (90) degrees` (ketiga) | -50 | -150 | 0 | Menghadap atas. |
| `move (100) steps` (keempat) | -50 | -50 | 0 | Sisi kiri, kembali ke titik awal. |
| `turn right (90) degrees` (keempat) | -50 | -50 | 90 | Arah awal pulih. |

Hasilnya persegi dengan sisi 100. Programnya hanya urutan blok `move` dan `turn` yang berselang-seling. Segitiga sama sisi dengan sisi 100 memakai tiga pasang `move (100) steps` dan `turn right (120) degrees`. Sudut luar yang 120 itu bukan 60: sprite berputar sebesar sudut luar, bukan sudut dalam. Titik sudut segitiga itu (50, -50), kira-kira (0, -137), dan (-50, -50).

Dua skrip dapat diberi topi berbeda. Skrip kedua memakai `when [t] key pressed` dan berisi urutan segitiga. Menekan spasi menjalankan skrip persegi; menekan t menjalankan skrip segitiga; keduanya terpisah.

## Contoh setengah jadi

Program yang menggambar persegi sisi 80 dari titik (-40, 0). Isi bagian kosong, lalu telusuri arah akhirnya.

```text
when green flag clicked
erase all
go to x: (-40) y: (0)
point in direction (90)
pen down
move (____) steps
turn right (____) degrees
move (____) steps
turn right (____) degrees
move (____) steps
turn right (____) degrees
move (____) steps
turn right (____) degrees
pen up
```

## Susun urutannya

Tujuh blok berikut sudah diacak. Susun menjadi bagian pembuka program persegi sisi 60 sampai sisi pertama selesai, dijalankan saat bendera hijau diklik. Tiga pasang `move` dan `turn` berikutnya sama saja dengan pasangan ini.

- **A.** `pen down`
- **B.** `when green flag clicked`
- **C.** `erase all`
- **D.** `point in direction (90)`
- **E.** `move (60) steps`
- **F.** `turn right (90) degrees`
- **G.** `go to x: (-30) y: (30)`

Tulis urutan hurufnya dan jelaskan mengapa `pen down` tidak boleh mendahului `go to`.

## Latihan

1. **Ubah.** Ubah program S menjadi persegi sisi 60. Prediksi titik sudutnya, lalu telusuri.
2. **Buat.** Tulis program segitiga sisi 100 dengan topi `when [t] key pressed`. Telusuri arah sprite setelah tiap `turn`.
3. **Uji.** Hilangkan blok `turn right (90) degrees` yang paling akhir dari program S. Prediksi dulu gambar dan arah akhir sprite, lalu uji.
4. **Buat.** Buat persegi panjang 150 x 80. Tulis tabel penelusuran.
5. **Jelaskan.** Dengan dua kalimat, jelaskan beda `go to` sebelum `pen down` dan sesudah `pen down`.

## Latihan bercampur

1. Algoritma robot minggu lalu: `MAJU`, `MAJU`, `KANAN`, `MAJU`. Anggap satu petak sama dengan 50 langkah. Tulis program Scratch dengan pena yang menggambar jalur robot, mulai dari `point in direction (0)`.
2. Titik tengah panggung adalah (0, 0). Tulis program persegi sisi 100 yang titik pusat persegi itu tepat di (0, 0). Petunjuk: titik awal sisi atas kirinya.

## Ulang berjarak

Kerjakan ulang tanpa melihat modul ini, lalu cocokkan:

- **Minggu depan** (`SMP7-1-M5`): tulis ulang program persegi dengan tangan; hitung berapa kali pasangan `move` dan `turn` muncul.
- **Sekitar sebulan lagi** (`SMP7-1-M8`): sebutkan blok topi yang kamu pakai untuk memulai program, dan jelaskan apa yang terjadi bila tidak ada blok topi.
- **Akhir semester** (`SMP7-1-M14`): tanpa melihat, tulis program yang menggambar segitiga sama sisi.

## Kesalahan umum

- **Lupa `pen down`.** Sprite bergerak tetapi tidak meninggalkan garis.
- **Putar 60 untuk segitiga.** Yang dipakai sudut luar 120, bukan sudut dalam.
- **Menaruh `go to` setelah `pen down`.** Sprite menggambar garis dari titik lama ke titik baru.
- **Menekan bendera hijau padahal topinya spasi.** Skrip hanya jalan saat peristiwanya terjadi.
- **Menggambar keluar panggung.** Pastikan x dan y tetap antara -240 dan 240 serta -180 dan 180.

## Cek mandiri

Tutup modul, jawab tanpa melihat, lalu periksa.

1. Apa fungsi blok `when [space] key pressed`?
2. Berapa derajat sprite diputar tiap sudut persegi? Segitiga sama sisi?
3. Mengapa persegi memakai empat `move` dan empat `turn`?

Daftar periksa (kosong; kamu isi sendiri, tidak dikumpulkan):

- [ ] Aku bisa menyebut peristiwa yang memulai program.
- [ ] Aku bisa menelusuri program menggambar persegi.
- [ ] Aku bisa menulis program segitiga.

Kunci: (1) memulai skrip di bawahnya ketika tombol spasi ditekan; (2) 90 dan 120; (3) empat sisi, tiap sisi dilanjutkan satu putaran, sehingga arah akhir sama dengan arah awal.

## Langkah berikutnya

`SMP7-1-M5`, "Perulangan". Program persegi yang kamu tulis hari ini mengulang pasangan yang sama empat kali; minggu depan kamu akan menulisnya jauh lebih singkat.

## Catatan untuk guru

- **Waktu:** 2 JP x 40 menit `[asumsi]` (silabus bagian 2). Berpasangan boleh untuk "Prediksi dulu" dan "Latihan".
- **Alat:** Scratch tanpa akun murid. Ekstensi Pena perlu ditambahkan murid dari menu ekstensi (per 2026-11, amati di versi yang dipakai sekolah); nama blok bisa berbeda menurut bahasa antarmuka.
- **Butir CP:** corpus memetakan minggu ini ke `D-BK-e` dan `DK-BK-c`. Modul ini mengklaim keduanya hanya sebagai latihan menuliskan instruksi berblok; tidak menyatakan CP "terpenuhi".
- **Kunci "Prediksi dulu":** persegi sisi 100; arah akhir 90. Penelusuran pada contoh terselesaikan.
- **Kunci "Contoh setengah jadi":** `move (80)`, `turn right (90)` empat kali; sprite kembali ke (-40, 0), arah 90.
- **Kunci "Susun urutannya":** B, C, G, D, A, E, F. Alasan: `go to` sebelum `pen down` agar tidak ada garis dari titik lama.
- **Kunci latihan:** (1) titik sudut (-50, -50), (10, -50), (10, -110), (-50, -110). (2) tiga pasang `move (100)` dan `turn right (120)`; arah: -150, -30, 90. (3) gambarnya tetap persegi lengkap (empat sisi sudah digambar sebelum `turn` terakhir); arah akhir 0, bukan 90. (4) pasangan `move (150)`, `turn right (90)`, `move (80)`, `turn right (90)` dua kali. (5) sebelum `pen down` sprite hanya pindah; sesudahnya menggambar.
- **Petunjuk bertahap:** (a) gambar sketsa dan tandai titik sudut; (b) hitung perubahan x dan y tiap `move`; (c) cek apakah arah akhir sama dengan arah awal.
- **AI:** tanpa AI. Kebijakan `smp-coding` (silabus bagian 7.1): AI generatif hanya demonstrasi guru, tanpa akun murid; asesmen tanpa AI.
- **Privasi:** tanpa nama murid pada berkas proyek.
- **Unsur pembelajaran:** ingat kembali dan jarak (`K`), PRIMM (`K` usia 11 sampai 14, riset 6.3), tabel penelusuran (`K`, riset 6.2), contoh lengkap lalu setengah jadi (`K`, riset 3.4), Parsons (`M`), latihan bercampur (`K`, riset 3.3).

## Rujukan

- *Panduan Mata Pelajaran Informatika, Fase D – F*, BSKAP, 2025:
  <https://repositori.kemendikdasmen.go.id/33634/1/32.%20Panduan%20Mata%20Pelajaran%20Informatika.pdf>
- Scratch, tentang Scratch (situs resmi Scratch Foundation): <https://scratch.mit.edu/about>
