## Untuk siapa modul ini

Modul ini untuk murid kelas 7 pada minggu kelima. Kamu memakai Scratch tanpa akun; simpan berkas sesuai arahan gurumu. Kalau komputer terbatas, tabel penelusuran di kertas cukup untuk sebagian besar kegiatan. Waktunya satu pertemuan, 2 JP. Prasyaratnya `SMP7-1-M4` (peristiwa, pena, menggambar bentuk).

## Ingat kembali

Tutup modul ini dan jawab dari ingatan.

1. Berapa derajat sprite diputar tiap sudut persegi, dan berapa untuk segitiga sama sisi? (`SMP7-1-M4`)
2. Robot di (1, 1) menghadap atas menjalankan `KANAN`, `MAJU`, `MAJU`. Di mana ia berhenti? (`SMP7-1-M2`)
3. Buka kartu teh dari minggu pertama. Langkah mana yang bisa ditulis lebih singkat kalau kamu punya cara menyebut "ulangi"? (`SMP7-1-M1`)

Kunci: (1) 90 dan 120; (2) (3, 1) menghadap kanan; (3) "Aduk dengan sendok sepuluh putaran" bisa menjadi "ulangi 10 kali: putar sendok satu putaran".

## Tujuan

Setelah modul ini kamu dapat:

1. menjelaskan **perulangan** sebagai cara menyuruh komputer mengulang sekelompok blok;
2. menulis ulang program yang berisi pengulangan manual dengan blok `repeat`;
3. menelusuri perulangan dengan tabel putaran;
4. menyebut kapan memakai `repeat (n)` dan kapan `forever`.

## Prediksi dulu

Minggu lalu kamu menulis pasangan `move` dan `turn` empat kali untuk persegi. Perulangan membungkus pasangan itu di dalam satu blok. Blok di dalam `repeat` ditulis dengan indentasi.

Program T:

```text
when green flag clicked
erase all
go to x: (-50) y: (-50)
point in direction (90)
pen down
repeat (4)
  move (100) steps
  turn right (90) degrees
pen up
```

**Prediksi.** Bandingkan T dengan program S minggu lalu. Menurutmu gambarnya sama atau berbeda? Berapa baris yang tersisa dibandingkan S? Tulis dulu.

**Jalankan.** Susun T dan klik bendera hijau. Isi tabel penelusuran per putaran:

| Putaran ke- | x setelah `move` | y setelah `move` | Arah setelah `turn` |
| --- | --- | --- | --- |
| 1 | | | |
| 2 | | | |
| 3 | | | |
| 4 | | | |

**Selidiki.** Cocokkan dengan prediksimu. Apa yang berubah dari putaran ke putaran, dan apa yang tetap sama? Yang tetap sama adalah isi blok di dalam `repeat`; yang berubah adalah keadaan sprite.

## Contoh terselesaikan

Penelusuran program T:

| Putaran ke- | x setelah `move` | y setelah `move` | Arah setelah `turn` | Alasan |
| --- | --- | --- | --- | --- |
| 1 | 50 | -50 | 180 | Sisi atas, lalu menghadap bawah. |
| 2 | 50 | -150 | -90 | Sisi kanan, lalu menghadap kiri. |
| 3 | -50 | -150 | 0 | Sisi bawah, lalu menghadap atas. |
| 4 | -50 | -50 | 90 | Sisi kiri; kembali ke titik awal dan arah awal. |

Hasilnya persegi yang sama dengan S, tetapi blok yang ditulis hanya dua di dalam perulangan, bukan delapan. Ada dua cara menyebut jumlah pengulangan. `repeat (n)` mengulang tepat n kali. `forever` mengulang tanpa berhenti sampai kamu menekan tombol berhenti; ia cocok untuk program yang harus terus berjalan, bukan untuk menggambar bentuk yang selesai.

Ingat tiga hal: yang diulang harus berupa kelompok blok yang sama; jumlah ulang harus sesuai bentuknya (persegi 4, segitiga 3); dan keadaan sprite sesudah satu putaran menjadi keadaan awal putaran berikutnya.

## Contoh setengah jadi

Segitiga sama sisi sisi 100 dari titik (-50, -50). Isi bagian kosong, lalu telusuri di tabelmu.

```text
when green flag clicked
erase all
go to x: (-50) y: (-50)
point in direction (90)
pen down
repeat (____)
  move (100) steps
  turn right (____) degrees
pen up
```

## Susun urutannya

Enam baris program berikut sudah diacak. Susun menjadi program yang menggambar persegi sisi 100 saat bendera hijau diklik. Arah awal sudah 90, jadi tidak perlu `point in direction`.

- **A.** `when green flag clicked`
- **B.** `repeat (4)`
- **C.** `  move (100) steps` (di dalam `repeat`)
- **D.** `  turn right (90) degrees` (di dalam `repeat`)
- **E.** `go to x: (-50) y: (-50)`
- **F.** `pen down`

Tulis urutan hurufnya. Jelaskan mengapa `pen down` harus sesudah `go to` dan sebelum `repeat`.

## Latihan

1. **Ubah.** Ubah program T agar menggambar persegi sisi 60. Hanya satu angka yang berubah. Angka yang mana?
2. **Buat.** Gambar persegi panjang 150 x 80 dari titik (-75, -40) dengan `repeat (2)` yang membungkus empat blok. Telusuri.
3. **Tulis ulang.** Ubah program S minggu lalu menjadi program T tanpa melihat T. Berapa baris yang kamu hemat?
4. **Pseudocode.** Tulis kartu instruksi "mengaduk teh" dari minggu pertama sebagai pseudocode dengan satu baris "ulangi 10 kali".
5. **Jelaskan.** Dengan dua kalimat, jelaskan kapan memakai `repeat (n)` dan kapan `forever`.

## Latihan bercampur

1. Program: `when [space] key pressed`, `go to x: (0) y: (0)`, `repeat (3)`, `move (30) steps`, `turn right (120) degrees`. Peristiwa apa yang memulainya, dan di mana sprite berhenti saat arah awal 90? (`SMP7-1-M3`, `SMP7-1-M4`)
2. Algoritma robot: `MAJU`, `KANAN`, `MAJU`, `KANAN`, `MAJU`, `KANAN`, `MAJU`, `KANAN`. Tulis dengan satu `repeat` dan sebut di mana robot berhenti dari (1, 1) menghadap atas. (`SMP7-1-M2`)

## Ulang berjarak

Kerjakan ulang tanpa melihat modul ini, lalu cocokkan:

- **Minggu depan** (`SMP7-1-M6`): tulis bagian mana dari programmu yang bisa dibungkus perulangan.
- **Sekitar sebulan lagi** (`SMP7-1-M9`): sebut dua hal yang berubah tiap putaran dan satu yang tetap.
- **Akhir semester** (`SMP7-1-M14`): tulis `repeat` untuk segitiga tanpa melihat contoh.

## Kesalahan umum

- **Menaruh `pen down` di dalam `repeat`.** Tidak salah, tetapi tidak perlu; ia berjalan berulang tanpa mengubah hasil.
- **Salah jumlah ulang.** Persegi dengan `repeat (3)` hanya memberi tiga sisi.
- **Mengira perulangan membuat gerakan lebih cepat.** Hasilnya sama; ia hanya membuat tulisan lebih pendek.
- **Lupa indentasi.** Blok di luar `repeat` hanya berjalan sekali.
- **Memakai `forever` untuk bentuk yang selesai.** Program tidak pernah berhenti.

## Cek mandiri

Tutup modul, jawab tanpa melihat, lalu periksa.

1. Apa arti `repeat (4)` pada program T?
2. Berapa kali blok `move` berjalan pada `repeat (3)` yang berisi dua `move`?
3. Kapan memakai `forever`?

Daftar periksa (kosong; kamu isi sendiri, tidak dikumpulkan):

- [ ] Aku bisa menulis ulang program dengan `repeat`.
- [ ] Aku bisa menelusuri perulangan per putaran.
- [ ] Aku bisa memilih `repeat (n)` atau `forever`.

Kunci: (1) mengulang blok di dalamnya empat kali; (2) enam kali (3 x 2); (3) untuk program yang harus terus berjalan sampai dihentikan.

## Langkah berikutnya

`SMP7-1-M6`, "Dekomposisi: memecah masalah, animasi cerita". Kamu akan memecah masalah besar menjadi bagian kecil yang masing-masing bisa kamu tulis programnya.

## Catatan untuk guru

- **Waktu:** 2 JP x 40 menit `[asumsi]` (silabus bagian 2). Berpasangan boleh untuk "Prediksi dulu" dan "Latihan".
- **Alat:** Scratch tanpa akun murid; nama blok bisa berbeda menurut bahasa antarmuka. Berkas disimpan lokal.
- **Butir CP:** corpus memetakan minggu ini ke `D-BK-e`, `DK-BK-c`, dan `D-BK-a`. Modul ini mengklaim ketiganya hanya sebagai latihan menulis instruksi berulang; tidak menyatakan CP "terpenuhi".
- **Kunci "Prediksi dulu":** gambar sama dengan S; arah akhir 90; T berisi 9 baris, S berisi 14 baris.
- **Kunci "Contoh setengah jadi":** `repeat (3)` dan `turn right (120) degrees`.
- **Kunci "Susun urutannya":** A, E, F, B, C, D.
- **Kunci latihan:** (1) `move (60)`. (2) `repeat (2)`: `move (150)`, `turn right (90)`, `move (80)`, `turn right (90)`; titik sudut (75, -40), (75, -120), (-75, -120), (-75, -40). (3) lima baris dihemat (14 menjadi 9). (4) contoh: "ulangi 10 kali: putar sendok satu putaran". (5) `repeat` untuk jumlah pasti, `forever` untuk yang berjalan terus.
- **Kunci "Latihan bercampur":** (1) peristiwa menekan spasi; segitiga sisi 30 tertutup: arah sesudah tiap putaran 210 (tampil -150), -30, dan 90; sprite berhenti di (0, 0), arah 90. (2) `repeat (4)` berisi `MAJU` dan `KANAN`; robot menempuh persegi satu petak: (1, 2), (2, 2), (2, 1), (1, 1); berhenti di (1, 1) menghadap atas.
- **Petunjuk bertahap:** (a) tulis baris yang berulang; (b) hitung jumlah ulang; (c) telusuri tiap putaran.
- **AI:** tanpa AI. Kebijakan `smp-coding` (silabus bagian 7.1): AI generatif hanya demonstrasi guru, tanpa akun murid; asesmen tanpa AI.
- **Privasi:** tanpa nama murid pada berkas proyek.
- **Unsur pembelajaran:** ingat kembali dan jarak (`K`), PRIMM (`K` usia 11 sampai 14), tabel penelusuran (`K`), contoh lengkap lalu setengah jadi (`K`), Parsons (`M`), latihan bercampur (`K`).

## Rujukan

- *Panduan Mata Pelajaran Informatika, Fase D – F*, BSKAP, 2025:
  <https://repositori.kemendikdasmen.go.id/33634/1/32.%20Panduan%20Mata%20Pelajaran%20Informatika.pdf>
- Scratch, tentang Scratch (situs resmi Scratch Foundation): <https://scratch.mit.edu/about>
