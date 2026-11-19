## Untuk siapa modul ini

Modul ini untuk murid kelas 8 pada minggu ketujuh semester kedua. Kamu memakai Python dengan modul `turtle` (grafik kura-kura) di komputer yang disiapkan gurumu; kertas dipakai untuk tabel posisi. Bila layar gambar tidak tersedia, tabel penelusuran sudah cukup untuk menjawab. Python adalah pengayaan di luar capaian pembelajaran. Waktunya satu pertemuan, 2 JP. Prasyaratnya `SMP8-2-M5` (perulangan `for` dan `while`).

## Ingat kembali

Tutup modul ini dan jawab dari ingatan.

1. Tulis kerangka `for` dari `repeat (4)` berisi `move (50) steps` dan `turn right (90) degrees`. (`SMP8-2-M6`)
2. Tulis angka yang dihasilkan `range(1, 4)` dan `range(3)`. (`SMP8-2-M5`)
3. Tulis aturan sudut putar untuk bentuk beraturan `n` sisi, lalu hitung untuk `n` = 5. (`SMP7-1-M7`)

Kunci: (1) `for putaran in range(4):` lalu dua baris menjorok yang maju 50 dan belok kanan 90; (2) 1, 2, 3 dan 0, 1, 2; (3) sudut putar = 360 dibagi `n`; untuk `n` = 5 hasilnya 72.

## Tujuan

Setelah modul ini kamu dapat:

1. memakai `forward`, `right`, `left`, `penup`, dan `pendown` pada kura-kura;
2. menggambar bentuk beraturan dengan `for` dan sudut 360 dibagi `n`;
3. menelusuri posisi dan arah kura-kura dengan tabel;
4. menyebut satu hal yang sama dan satu hal yang beda antara pena Scratch dan kura-kura Python.

## Prediksi dulu

Kura-kura adalah penggambar di layar yang kamu perintah. `import turtle` mengambil perangkatnya, `t = turtle.Turtle()` membuat satu kura-kura yang mulai di titik (0, 0) menghadap kanan, dan `turtle.done()` menahan jendela agar tetap terbuka. Program P:

```python
import turtle

t = turtle.Turtle()
for i in range(4):
    t.forward(100)
    t.right(90)
turtle.done()
```

**Prediksi.** Bentuk apa yang tergambar? Di mana kura-kura berhenti dan menghadap ke mana? Tulis dulu.

**Jalankan.** Telusuri dengan tabel:

| putaran | posisi sesudah `forward` | arah sesudah `right` |
| --- | --- | --- |
| 1 | | |
| 2 | | |
| 3 | | |
| 4 | | |

**Selidiki.** Cocokkan dengan prediksimu, lalu jalankan di komputer. Arah kura-kura diukur dari kanan: 0 menghadap kanan, dan `right` memutar searah jarum jam.

## Contoh terselesaikan

Penelusuran P:

| putaran | posisi | arah |
| --- | --- | --- |
| 1 | (100, 0) | 270 |
| 2 | (100, -100) | 180 |
| 3 | (0, -100) | 90 |
| 4 | (0, 0) | 0 |

Kura-kura membentuk persegi dan kembali ke awal, menghadap kanan lagi. Arah 270 sesudah belok pertama berarti menghadap bawah: kura-kura mengukur arah berlawanan jarum jam dari kanan, sedangkan Scratch mengukur searah jarum jam dari atas (90 berarti kanan).

Bentuk beraturan `n` sisi memakai belokan 360 dibagi `n`:

```python
import turtle

t = turtle.Turtle()
n = 6
for i in range(n):
    t.forward(60)
    t.right(360 / n)
turtle.done()
```

Hasilnya segi enam: tiap belokan 60 derajat, dan sesudah enam putaran kura-kura kembali ke (0, 0) menghadap kanan. Tiga hal yang perlu diingat. Pertama, gambar tertutup bila jumlah semua belokan tepat 360. Kedua, bagian yang diulang hanya dua baris menjorok: maju lalu belok. Ketiga, `penup()` mengangkat pena dan `pendown()` menurunkannya, sehingga kura-kura bisa pindah tanpa menggaris.

## Contoh setengah jadi

Spiral kotak: sisi awal 10, tiap putaran bertambah 10, dan belok 90 derajat. Isi bagian kosong.

```python setengah-jadi
import turtle

t = turtle.Turtle()
panjang = 10
for i in range(____):
    t.forward(panjang)
    t.right(____)
    panjang = panjang + ____
turtle.done()
```

Lengkapi untuk 20 sisi, lalu telusuri posisi sesudah empat putaran pertama.

## Susun urutannya

Enam baris berikut sudah diacak. Susun menjadi program yang menggambar segitiga sama sisi dengan sisi 100.

- **A.** `import turtle`
- **B.** `t = turtle.Turtle()`
- **C.** `for i in range(3):`
- **D.** `    t.forward(100)` (menjorok di bawah `for`)
- **E.** `    t.right(120)` (menjorok di bawah `for`)
- **F.** `turtle.done()` (di kolom paling kiri)

Tulis urutan hurufnya. Jelaskan mengapa sudutnya 120, bukan 60.

## Latihan

1. **Ubah.** Ubah segi enam menjadi segi delapan. Berapa derajat tiap belokan dan di mana kura-kura berhenti?
2. **Buat.** Gambar tiga persegi sisi 30 berjajar: gambar satu persegi, angkat pena, maju 50, turunkan pena, ulangi tiga kali dengan `for` bersarang. Di mana kura-kura berhenti?
3. **Selidiki.** Seorang murid ingin segitiga tetapi menulis `for i in range(4):` dengan `forward(100)` dan `right(60)`. Mengapa gambarnya tidak tertutup?
4. **Jelaskan.** Dengan dua kalimat, sebut satu hal yang sama dan satu hal yang beda antara blok pena Scratch dan kura-kura Python.

## Latihan bercampur

1. `x = 1`, lalu `for i in range(3):` berisi `x = x * 3`, lalu `print(x)`. Berapa yang tercetak? (`SMP8-2-M5`)
2. Pada program segi-`n`, berapa nilai `360 / n` untuk `n` = 10, dan jenis nilai apa itu? (`SMP8-2-M3`)

## Ulang berjarak

Kerjakan ulang tanpa melihat modul ini, lalu cocokkan:

- **Minggu depan** (`SMP8-2-M8`): hitung sudut belokan untuk segi lima dan segi delapan beraturan.
- **Sekitar sebulan lagi** (`SMP8-2-M13`): tulis kerangka program kura-kura yang menggambar segi-`n` dengan `n` dibaca dari pengguna.
- **Akhir semester** (`SMP8-2-M14`): telusuri posisi dan arah akhir kura-kura untuk persegi sisi 100, dan jelaskan mengapa ia kembali ke titik awal.

## Kesalahan umum

- **Memakai sudut yang bukan 360 dibagi `n`.** Kenali: bentuk tidak tertutup atau terus berputar.
- **Menaruh `right` di luar perulangan.** Kenali: satu garis panjang dan belokan sekali saja.
- **Lupa `turtle.done()`.** Kenali: jendela gambar menutup begitu program selesai.
- **Lupa `pendown()` sesudah `penup()`.** Kenali: kura-kura bergerak tetapi tidak ada garis.
- **Mengira arah 0 menghadap atas seperti di Scratch.** Kenali: tabel arahmu berbeda 90 derajat dari hasil sebenarnya.

## Cek mandiri

Tutup modul, jawab tanpa melihat, lalu periksa.

1. Tulis perulangan yang menggambar segi lima beraturan dengan sisi 80.
2. Berapa derajat tiap belokan untuk segi enam, dan mengapa?
3. Mengapa kura-kura menghadap arah semula sesudah segi-`n` selesai?

Daftar periksa (kosong; kamu isi sendiri, tidak dikumpulkan):

- [ ] Aku bisa menggambar bentuk beraturan dengan `for`.
- [ ] Aku bisa menghitung sudut belokan 360 dibagi `n`.
- [ ] Aku bisa menelusuri posisi dan arah dengan tabel.

Kunci: (1) `for i in range(5):` lalu `t.forward(80)` dan `t.right(72)` menjorok; (2) 60, karena 360 dibagi 6; (3) jumlah belokannya tepat satu putaran penuh, 360 derajat.

## Langkah berikutnya

`SMP8-2-M8`, "Daftar (*list*)". Kamu menyimpan banyak nilai dalam satu nama dan mengulang isinya, misalnya untuk daftar belanja.

## Catatan untuk guru

- **Waktu:** 2 JP x 40 menit `[asumsi]` (silabus bagian 2). Berpasangan boleh untuk "Prediksi dulu" dan "Latihan"; bukan jaminan efek belajar.
- **Alat:** Python 3 dengan modul `turtle`, yang memerlukan komponen grafis (`tkinter`) dan layar. Penulis menjalankan program di jendela sungguhan dengan Python 3.12.3 (jendela ditutup otomatis) dan membaca `t.pos()` dan `t.heading()` pada akhir; angka di tabel dan kunci sama dengan hasil itu. Selisih pembulatan sekitar nol (misalnya -0.0) tidak penting. Bila komponen grafis tidak ada, murid tetap dapat mengerjakan tabel penelusuran. Nama perintah `forward`, `right`, `left`, `penup`, `pendown`, `done` dicocokkan dengan dokumentasi resmi `turtle`. Nama blok Scratch (bahasa Inggris) dicocokkan per 2026-11 dengan berkas pesan resmi Scratch (`scratch-l10n`, `editor/blocks/en.json` dan `editor/extensions/en.json`). Perhatikan: di editor, `when green flag clicked` tampil sebagai `when [ikon bendera hijau] clicked` dan `when key pressed` sebagai `when [space] key pressed`; padanan antarmuka Indonesia: `ulangi n kali`, `gerak ... langkah`, `putar ... derajat`, `tekan pena`. Guru tetap memeriksanya di editor sebelum kelas.
- **Butir CP:** corpus memetakan minggu ini ke `D-BK-e` dan `DK-BK-c`. Modul tidak menyatakan CP "terpenuhi"; ia melatih perulangan dan menuliskan instruksi dalam notasi teks.
- **Kunci "Prediksi dulu":** persegi sisi 100; tabel: (100, 0) arah 270; (100, -100) arah 180; (0, -100) arah 90; (0, 0) arah 0. Berhenti di (0, 0) menghadap kanan.
- **Kunci "Contoh setengah jadi":** `range(20)`, `right(90)`, `panjang = panjang + 10`. Sesudah empat putaran: (10, 0) arah 270; (10, -20) arah 180; (-20, -20) arah 90; (-20, 20) arah 0. Sesudah 20 putaran kura-kura berhenti di (-100, 100) menghadap kanan.
- **Kunci "Susun urutannya":** A, B, C, D, E, F. Tiap belokan luar 360 / 3 = 120; sudut 60 adalah sudut dalam segitiga, bukan sudut belokan.
- **Kunci latihan:** (1) 360 / 8 = 45; berhenti di (0, 0) menghadap kanan. (2) `for baris in range(3):` berisi `for i in range(4):` dengan `t.forward(30)` dan `t.right(90)`, lalu `t.penup()`, `t.forward(50)`, `t.pendown()`; berhenti di (150, 0) menghadap kanan. (3) empat belokan 60 derajat berjumlah 240, bukan 360, dan hanya empat garis; kura-kura berhenti di sekitar (0, -173.2) menghadap 120. (4) contoh: sama-sama maju dan belok dengan pena yang bisa diangkat; beda pada arah awal dan ukuran arah, dan pada tulisan teks versus blok.
- **Kunci "Latihan bercampur":** (1) 27. (2) 36.0; bilangan desimal (`/` selalu menghasilkan desimal).
- **Petunjuk bertahap:** (a) tulis posisi dan arah awal; (b) hitung posisi sesudah `forward` dengan arah saat ini; (c) ubah arah dengan `right`; (d) cek apakah jumlah belokan 360.
- **AI:** tanpa AI. Kebijakan `smp-coding` (silabus bagian 7.1): AI generatif hanya demonstrasi guru, tanpa akun murid; asesmen tanpa AI.
- **Privasi:** semua angka rekaan; tanpa nama murid pada berkas.
- **Unsur pembelajaran:** ingat kembali dan jarak (`K`), PRIMM (`K` usia 11 sampai 14), tabel penelusuran (`K`), contoh lengkap lalu setengah jadi (`K`), Parsons (`M`), latihan bercampur (`K`).
