## Untuk siapa modul ini

Modul ini untuk murid kelas 7 pada minggu ketujuh semester kedua. Kamu memakai Scratch tanpa akun; simpan berkas sesuai arahan gurumu. Kalau komputer terbatas, tabel penelusuran di kertas cukup untuk sebagian besar kegiatan. Waktunya satu pertemuan, 2 JP. Prasyaratnya `SMP7-1-M8` (percabangan) dan `SMP7-1-M9` (variabel).

## Ingat kembali

Tutup modul ini dan jawab dari ingatan.

1. Tulis `if` yang menggeser sprite ke kanan bila tombol panah kanan ditekan, dan sebut kapan kondisi diperiksa. (`SMP7-1-M8`)
2. Mengapa menukar dua isi daftar butuh `tmp`? (`SMP7-2-M6`)
3. Apa fungsi `add` dan `replace` pada daftar? (`SMP7-2-M4`)
4. Sebut arah dalam derajat untuk atas, kanan, bawah, dan kiri. (`SMP7-1-M4`)

Kunci: (1) `if <key [right arrow] pressed?> then` lalu `change x by (10)`; kondisi diperiksa saat blok `if` dijangkau, jadi biasanya dibungkus `forever` supaya diperiksa terus; (2) tanpa `tmp`, isi pertama tertimpa sebelum sempat disalin; (3) `add` menambah di ujung daftar, `replace` mengganti isi nomor tertentu; (4) 0, 90, 180, dan -90.

## Tujuan

Setelah modul ini kamu dapat:

1. membaca dan menulis posisi sprite sebagai pasangan koordinat (x, y);
2. menggerakkan sprite dengan `change x by` dan `change y by` saat tombol ditekan;
3. memakai `touching` untuk mendeteksi tabrakan dan menentukan akibatnya;
4. menelusuri gerak dua sprite dalam tabel per putaran.

## Prediksi dulu

Panggung Scratch punya titik tengah (0, 0). Nilai **x** naik ke kanan dan turun ke kiri; nilai **y** naik ke atas dan turun ke bawah. Blok `change x by (n)` menggeser sprite n satuan ke kanan (negatif ke kiri); `change y by (n)` menggeser ke atas (negatif ke bawah). Blok `x position` dan `y position` memberi posisi sekarang.

Program P (sprite mulai di (0, 0)):

```text
when green flag clicked
go to x: (0) y: (0)
change x by (30)
change y by (-20)
change x by (-50)
```

**Prediksi.** Di mana sprite berhenti? Tulis dulu.

**Jalankan.** Susun P, klik bendera hijau, dan isi tabel penelusuran:

| Blok | x | y |
| --- | --- | --- |
| `go to x: (0) y: (0)` | | |
| `change x by (30)` | | |
| `change y by (-20)` | | |
| `change x by (-50)` | | |

**Selidiki.** Cocokkan dengan prediksimu. Sprite bergerak ke bawah atau ke atas saat y negatif?

## Contoh terselesaikan

Penelusuran P: (0, 0), (30, 0), (30, -20), (-20, -20). Sprite berhenti di (-20, -20), yaitu di kiri dan di bawah titik tengah.

Sekarang game kecil: pemain bergerak ke kanan saat tombol ditekan, musuh bergerak ke kiri, dan pemain kembali ke awal bila bersentuhan.

Skrip sprite Pemain:

```text
when green flag clicked
go to x: (-50) y: (0)
forever
  if <key [right arrow] pressed?> then
    change x by (10)
  if <touching [Musuh]?> then
    go to x: (-50) y: (0)
```

Skrip sprite Musuh:

```text
when green flag clicked
go to x: (50) y: (0)
forever
  change x by (-10)
```

Untuk penelusuran, anggap tombol kanan ditekan terus, tiap putaran urutannya: Pemain bergerak, Musuh bergerak, lalu pemeriksaan `touching`. Anggap kedua sprite bersentuhan bila selisih x kurang dari 25; di Scratch sungguhan `touching` memeriksa gambar yang bertumpuk, bukan angka x.

| Putaran | x Pemain | x Musuh | Selisih x | Bersentuhan? |
| --- | --- | --- | --- | --- |
| 1 | -40 | 40 | 80 | tidak |
| 2 | -30 | 30 | 60 | tidak |
| 3 | -20 | 20 | 40 | tidak |
| 4 | -10 | 10 | 20 | ya, Pemain kembali ke -50 |
| 5 | -40 | 0 | 40 | tidak |

Tiga hal yang perlu diingat. `if` di dalam `forever` diperiksa tiap putaran, jadi gerak dan tabrakan terdeteksi terus. `go to` di awal berjalan sekali sebelum `forever`. Dan `touching` adalah kondisi seperti kondisi lain: benar atau salah pada saat diperiksa.

## Contoh setengah jadi

Tambahkan gerak naik dan turun pada Pemain. Isi bagian kosong, lalu sebut arah geraknya.

```text
forever
  if <key [up arrow] pressed?> then
    change y by (____)
  if <key [down arrow] pressed?> then
    change y by (____)
```

## Susun urutannya

Lima baris berikut sudah diacak. Susun menjadi skrip Pemain yang bergerak ke kanan bila tombol panah kanan ditekan.

- **A.** `when green flag clicked`
- **B.** `go to x: (-50) y: (0)`
- **C.** `forever`
- **D.** `  if <key [right arrow] pressed?> then` (di dalam `forever`)
- **E.** `    change x by (10)` (di dalam `if`)

Tulis urutan hurufnya. Jelaskan mengapa `go to` harus sebelum `forever`.

## Latihan

1. **Ubah.** Pada skrip game, ganti `change x by (10)` menjadi `change x by (20)`. Telusuri lima putaran dengan tabel yang sama. Pada putaran berapa mereka bersentuhan?
2. **Buat.** Tambahkan ke Pemain: bila `touching [Musuh]`, ucapkan "Kena!" satu detik lalu kembali ke awal.
3. **Buat.** Tulis `if` yang memindahkan Pemain ke x = -200 bila `x position` lebih besar dari 200.
4. **Selidiki.** Hapus `forever` dari skrip Pemain. Apa yang terjadi saat tombol kanan ditekan sesudah program mulai? Mengapa?
5. **Jelaskan.** Dengan dua kalimat, jelaskan beda `change x by` dan `go to x:`.

## Latihan bercampur

Dua soal ini mencampur topik modul ini dengan modul sebelumnya.

1. Program: `delete all of [jejak]`, `go to x: (0) y: (0)`, lalu `repeat (3)` berisi `change x by (10)` dan `add (x position) to [jejak]`, lalu `say (item (2) of [jejak])`. Apa yang diucapkan? (`SMP7-2-M4`)
2. Dalam tiga putaran, Pemain menyentuh Musuh pada putaran 1 dan 3; tiap sentuhan menjalankan `change [nyawa] by (-1)`. Berapa `nyawa` akhir bila `set [nyawa] to (3)` di awal? (`SMP7-1-M8`, `SMP7-1-M9`)

## Ulang berjarak

Kerjakan ulang tanpa melihat modul ini, lalu cocokkan:

- **Minggu depan** (`SMP7-2-M8`): tulis blok yang membuat Pemain kembali ke titik awal bila menyentuh Musuh.
- **Sekitar sebulan lagi** (`SMP7-2-M11`): sebut dua kasus uji untuk game gerak dan tabrakan, dan hasil yang diharapkan.
- **Akhir semester** (`SMP7-2-M14`): tulis dari ingatan skrip Pemain yang bergerak ke kanan dan kembali ke awal saat menyentuh Musuh.

## Kesalahan umum

- **`if` tanpa `forever`.** Kondisi hanya diperiksa sekali. Kenali: tombol hanya bereaksi pada saat bendera diklik.
- **Salah tanda pada y.** y negatif ke bawah. Kenali: sprite naik padahal diminta turun.
- **Mengira `touching` memakai angka x.** Ia memeriksa gambar yang bertumpuk. Kenali: dua sprite di y berbeda jauh tidak pernah bersentuhan.
- **Lupa menaruh `go to` sebelum `forever`.** Kenali: posisi awal tidak pasti tiap bendera diklik.
- **Menukar `change x by` dengan `go to x:`.** `change` menggeser dari posisi sekarang; `go to` loncat ke posisi tertentu.

## Cek mandiri

Tutup modul, jawab tanpa melihat, lalu periksa.

1. Sprite di (10, 5) menjalankan `change x by (-30)` dan `change y by (20)`. Di mana ia berhenti?
2. Mengapa `if <touching [Musuh]?>` dibungkus `forever`?
3. y naik atau turun ke arah atas panggung?

Daftar periksa (kosong; kamu isi sendiri, tidak dikumpulkan):

- [ ] Aku bisa menelusuri posisi (x, y) sprite.
- [ ] Aku bisa menulis gerak dengan tombol.
- [ ] Aku bisa menulis akibat `touching`.

Kunci: (1) (-20, 25); (2) supaya diperiksa tiap putaran, bukan sekali; (3) naik ke atas.

## Langkah berikutnya

`SMP7-2-M8`, "Game: skor, nyawa, level". Game kecilmu akan punya skor dan nyawa dari variabel, dan akhir permainan bila nyawa habis.

## Catatan untuk guru

- **Waktu:** 2 JP x 40 menit `[asumsi]` (silabus bagian 2). Berpasangan boleh untuk "Prediksi dulu" dan "Latihan"; bukan jaminan efek belajar.
- **Alat:** Scratch tanpa akun murid; sprite Musuh dan Pemain dibuat dari pustaka sprite atau digambar murid. Nama blok bisa berbeda menurut bahasa antarmuka. Penulis menelusuri tangan semua program di modul ini dan tidak menjalankannya di editor Scratch. Sebelum mengajar, minta murid membaca `x position` dan `y position` di sudut-sudut panggung untuk memeriksa rentang koordinat pada versi yang dipakai.
- **Butir CP:** corpus memetakan minggu ini ke `D-BK-e` dan `DK-BK-c`. Modul ini tidak menyatakan CP "terpenuhi"; ia hanya melatih menulis instruksi gerak, kondisi, dan pengulangan.
- **Kunci "Prediksi dulu":** (0, 0), (30, 0), (30, -20), (-20, -20); berhenti di (-20, -20).
- **Kunci "Contoh setengah jadi":** 10 untuk naik dan -10 untuk turun; y positif ke atas.
- **Kunci "Susun urutannya":** A, B, C, D, E. `go to` sebelum `forever` agar berjalan sekali, bukan tiap putaran.
- **Kunci latihan:** (1) Pemain: -30, -10, 10; Musuh: 40, 30, 20; selisih 70, 40, 10; bersentuhan pada putaran 3 (kembali ke -50). (2) tambah `say [Kena!] for (1) seconds` sebelum `go to` di dalam `if`. (3) `if <(x position) > (200)> then go to x: (-200) y: (0)`. (4) sprite hanya bereaksi pada saat pemeriksaan pertama; sesudahnya tidak ada yang memeriksa tombol. (5) `change` menggeser dari posisi sekarang; `go to` loncat ke posisi yang disebut.
- **Kunci "Latihan bercampur":** (1) jejak 10, 20, 30; `item (2)` = 20. (2) putaran 1: 2, putaran 2: 2, putaran 3: 1; nyawa akhir 1.
- **Petunjuk bertahap:** (a) tulis posisi awal; (b) perbarui x dan y satu blok per baris; (c) periksa kondisi dengan nilai saat itu.
- **AI:** tanpa AI. Kebijakan `smp-coding` (silabus bagian 7.1): AI generatif hanya demonstrasi guru, tanpa akun murid; asesmen tanpa AI.
- **Privasi:** tanpa nama murid pada berkas proyek; sprite dan gambar tanpa foto murid.
- **Unsur pembelajaran:** ingat kembali dan jarak (`K`), PRIMM (`K` usia 11 sampai 14), tabel penelusuran (`K`), contoh lengkap lalu setengah jadi (`K`), Parsons (`M`), latihan bercampur (`K`).

## Rujukan

- *Panduan Mata Pelajaran Informatika, Fase D – F*, BSKAP, 2025:
  <https://repositori.kemendikdasmen.go.id/33634/1/32.%20Panduan%20Mata%20Pelajaran%20Informatika.pdf>
- Scratch, tentang Scratch (situs resmi Scratch Foundation): <https://scratch.mit.edu/about>
