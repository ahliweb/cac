## Untuk siapa modul ini

Modul ini untuk murid kelas 7 pada minggu keenam. Kamu bekerja dalam tim kecil (tiga orang) dengan satu komputer berisi Scratch, tanpa akun; simpan berkas sesuai arahan gurumu. Waktunya satu pertemuan, 2 JP. Prasyaratnya `SMP7-1-M5` (perulangan).

## Ingat kembali

Tutup modul ini dan jawab dari ingatan.

1. Pada program persegi `SMP7-1-M5`, bagian mana yang bisa dibungkus perulangan, dan berapa jumlah ulangnya? (`SMP7-1-M5`)
2. Berapa titik tengah panggung, dan ke arah mana x bertambah? (`SMP7-1-M3`)
3. Ambil satu tugas sehari-hari yang panjang, mis. menyiapkan tas atau mencuci piring. Pecah menjadi tiga bagian yang masing-masing punya algoritma sendiri. (`SMP7-1-M2`)
4. Sebutkan tiga kebiasaan kartu instruksi yang tepat. (`SMP7-1-M1`)

Kunci: (1) pasangan `move` dan `turn`, empat kali; (2) (0, 0), ke kanan; (3) jawaban bebas, asal tiap bagian punya langkah berurutan; (4) satu langkah satu tindakan, sebut benda dan jumlah, urutan dipikirkan.

## Tujuan

Setelah modul ini kamu dapat:

1. menjelaskan **dekomposisi** sebagai memecah masalah besar menjadi bagian kecil yang dapat dikerjakan sendiri;
2. membuat papan rencana cerita tiga adegan;
3. menelusuri program yang memutar cerita dan menghitung lama putarnya;
4. membagi kerja dalam tim dan menggabungkannya menjadi satu program.

## Prediksi dulu

Masalah besar: "Buat animasi cerita." Terlalu besar untuk ditulis langsung. Pecah dulu menjadi adegan, lalu tiap adegan menjadi langkah. Ceritanya: sebuah robot kecil kehabisan baterai, berjalan ke toko, lalu kembali dengan baterai penuh.

Papan rencana (kertas, belum program):

| Adegan | Latar | Gerak robot | Ucapan |
| --- | --- | --- | --- |
| 1 | Adegan 1 | Muncul di (-150, -50) | "Baterai habis!" 2 detik |
| 2 | Adegan 2 | Meluncur 2 detik ke (0, -50) | "Toko!" 2 detik |
| 3 | Adegan 3 | Meluncur 2 detik ke (150, -50) | "Siap!" 2 detik |

Program U menuliskan rencana itu untuk satu sprite. Beri nama latar "Adegan 1", "Adegan 2", dan "Adegan 3" di editor latar.

```text
when green flag clicked
switch backdrop to [Adegan 1]
go to x: (-150) y: (-50)
say [Baterai habis!] for (2) seconds
switch backdrop to [Adegan 2]
glide (2) secs to x: (0) y: (-50)
say [Toko!] for (2) seconds
switch backdrop to [Adegan 3]
glide (2) secs to x: (150) y: (-50)
say [Siap!] for (2) seconds
```

**Prediksi.** Berapa detik seluruh cerita berjalan, dan di titik x berapa robot berada saat mengucap "Toko!"? Tulis dulu.

**Jalankan.** Susun program U, klik bendera hijau, dan isi tabel penelusuran. "Waktu selesai" menghitung detik sejak bendera diklik.

| Blok | x | Latar | Ucapan | Waktu selesai (detik) |
| --- | --- | --- | --- | --- |
| `switch backdrop to [Adegan 1]` | | | | |
| `go to x: (-150) y: (-50)` | | | | |
| `say [Baterai habis!] for (2) seconds` | | | | |
| `switch backdrop to [Adegan 2]` | | | | |
| `glide (2) secs to x: (0) y: (-50)` | | | | |
| `say [Toko!] for (2) seconds` | | | | |
| `switch backdrop to [Adegan 3]` | | | | |
| `glide (2) secs to x: (150) y: (-50)` | | | | |
| `say [Siap!] for (2) seconds` | | | | |

**Selidiki.** Cocokkan dengan prediksimu. Blok `say ... for 2 seconds` dan `glide` menahan program selama durasinya, jadi waktunya dijumlahkan.

## Contoh terselesaikan

Penelusuran program U:

| Blok | x | Latar | Ucapan | Waktu selesai (detik) | Alasan |
| --- | --- | --- | --- | --- | --- |
| `switch backdrop to [Adegan 1]` | tak berubah | Adegan 1 | tidak ada | 0 | Ganti latar tidak makan waktu. |
| `go to x: (-150) y: (-50)` | -150 | Adegan 1 | tidak ada | 0 | Loncat langsung. |
| `say [Baterai habis!] for (2) seconds` | -150 | Adegan 1 | "Baterai habis!" | 2 | Menunggu 2 detik. |
| `switch backdrop to [Adegan 2]` | -150 | Adegan 2 | tidak ada | 2 | Latar berganti. |
| `glide (2) secs to x: (0) y: (-50)` | 0 | Adegan 2 | tidak ada | 4 | Meluncur 2 detik. |
| `say [Toko!] for (2) seconds` | 0 | Adegan 2 | "Toko!" | 6 | Menunggu 2 detik. |
| `switch backdrop to [Adegan 3]` | 0 | Adegan 3 | tidak ada | 6 | Latar berganti. |
| `glide (2) secs to x: (150) y: (-50)` | 150 | Adegan 3 | tidak ada | 8 | Meluncur 2 detik. |
| `say [Siap!] for (2) seconds` | 150 | Adegan 3 | "Siap!" | 10 | Cerita selesai. |

Cerita berjalan 10 detik; saat "Toko!" robot berada di x = 0. Perhatikan cara kerjanya: kamu tidak menulis program 9 baris langsung. Kamu memecah cerita menjadi tiga adegan di papan rencana, menulis tiap adegan sebagai satu kelompok tiga baris, lalu menyambung. Dalam tim, tiap anggota boleh menulis papan rencana satu adegan dulu, lalu satu orang yang menyusun program, bergantian tiap adegan.

## Contoh setengah jadi

Tambahkan adegan ke-4: robot menari dengan menggeser tiga kali. Isi bagian kosong.

```text
switch backdrop to [Adegan 3]
repeat (____)
  move (10) steps
  move (-10) steps
say [Hore!] for (____) seconds
```

Tentukan jumlah ulang yang kamu mau dan lama ucapan. Telusuri posisi x sesudah `repeat` dan hitung waktu totalnya.

## Susun urutannya

Enam baris berikut sudah diacak. Susun menjadi adegan 2 dan 3 mengikuti papan rencana di atas.

- **A.** `say [Siap!] for (2) seconds`
- **B.** `glide (2) secs to x: (150) y: (-50)`
- **C.** `switch backdrop to [Adegan 2]`
- **D.** `say [Toko!] for (2) seconds`
- **E.** `switch backdrop to [Adegan 3]`
- **F.** `glide (2) secs to x: (0) y: (-50)`

Tulis urutan hurufnya, lalu jelaskan mengapa latar harus diganti sebelum `glide` yang menggeser robot ke adegan itu.

## Latihan

1. **Ubah.** Ubah semua `say ... for (2) seconds` menjadi 1 detik. Prediksi waktu total baru, lalu telusuri.
2. **Buat.** Tulis papan rencana cerita tiga adegan baru dengan tokoh dan tempat pilihanmu (tanpa nama orang nyata). Tuliskan programnya.
3. **Uji.** Tukar papan rencanamu dengan tim lain. Jalankan programnya hanya dari papan itu, tanpa bertanya. Catat bagian yang membingungkan.
4. **Pecah.** Ambil tugas sehari-hari yang panjang. Tulis tiga bagian dan algoritma tiap bagian.
5. **Jelaskan.** Dengan dua kalimat, jelaskan mengapa memecah masalah memudahkan kerja tim.

## Latihan bercampur

1. Tulis dekomposisi program yang menggambar rumah sederhana: persegi sisi 100 dengan segitiga sama sisi sisi 100 di atasnya. Sebut dua bagian yang sudah kamu tulis di `SMP7-1-M4` dan `SMP7-1-M5`.
2. Program: `repeat (4)`, `move (10) steps`, `move (-10) steps`. Berapa kali `move` berjalan, dan di mana sprite berhenti dari x = 0? (`SMP7-1-M5`)

## Ulang berjarak

Kerjakan ulang tanpa melihat modul ini, lalu cocokkan:

- **Minggu depan** (`SMP7-1-M7`): tulis arti dekomposisi dengan kalimatmu sendiri.
- **Sekitar sebulan lagi** (`SMP7-1-M10`): pecah program kuis menjadi bagian kecil sebelum menulisnya.
- **Akhir semester** (`SMP7-1-M14`): tulis papan rencana cerita pendek dari ingatan, tanpa contoh.

## Kesalahan umum

- **Langsung menulis program tanpa rencana.** Adegan tumpang tindih dan sukar diperbaiki.
- **Memecah terlalu halus atau terlalu kasar.** Satu adegan satu tujuan; tiap bagian bisa ditulis dalam tiga sampai lima baris.
- **Memakai `say` tanpa detik.** Ucapan tidak hilang dan program tidak menunggu.
- **Lupa menyambung adegan.** Tiap adegan harus menyiapkan latar dan posisi sebelum berjalan.
- **Satu orang mengerjakan semuanya.** Tim membagi tugas dan bergantian.

## Cek mandiri

Tutup modul, jawab tanpa melihat, lalu periksa.

1. Apa arti dekomposisi?
2. Program: `glide (3) secs to x: (60) y: (0)`, `say [Halo] for (2) seconds`. Berapa detik totalnya?
3. Mengapa papan rencana ditulis sebelum program?

Daftar periksa (kosong; kamu isi sendiri, tidak dikumpulkan):

- [ ] Aku bisa memecah masalah besar menjadi bagian kecil.
- [ ] Aku bisa menelusuri program cerita dan menghitung waktunya.
- [ ] Aku bisa membagi kerja dalam tim.

Kunci: (1) memecah masalah besar menjadi bagian kecil yang dikerjakan sendiri-sendiri; (2) 5 detik; (3) agar adegan, urutan, dan pembagian tugas jelas sebelum menulis blok.

## Langkah berikutnya

`SMP7-1-M7`, "Pola dan generalisasi". Setelah memecah masalah, kamu akan mencari pola yang berulang antarbagian dan menuliskan aturan umumnya.

## Catatan untuk guru

- **Waktu:** 2 JP x 40 menit `[asumsi]` (silabus bagian 2). Tim tiga murid satu komputer, peran digilir; bukan jaminan efek belajar.
- **Alat:** Scratch tanpa akun murid; berkas disimpan lokal. Menggabungkan proyek antarkomputer di luar cakupan modul ini dan tidak diperiksa penulis; gunakan satu komputer per tim.
- **Butir CP:** corpus memetakan minggu ini ke `D-BK-a`, `D-BK-e`, dan `DK-BK-c`. Modul ini tidak menyatakan CP "terpenuhi"; ia hanya melatih memecah masalah dan menuliskan instruksi berblok.
- **Kunci "Prediksi dulu":** 10 detik total; x = 0 saat "Toko!". Penelusuran pada contoh terselesaikan.
- **Kunci "Contoh setengah jadi":** contoh `repeat (3)` dan `say [Hore!] for (2) seconds`; posisi x kembali ke nilai sebelum `repeat` karena tiap `move (10)` diikuti `move (-10)`; waktu bertambah 2 detik dari `say` saja (blok `move` tidak makan waktu).
- **Kunci "Susun urutannya":** C, F, D, E, B, A.
- **Kunci latihan:** (1) 1 + 2 + 1 + 2 + 1 = 7 detik. (2) bebas; periksa bahwa tiap adegan punya latar dan posisi. (3) saling menguji. (4) bebas dengan tiga bagian jelas. (5) bebas.
- **Kunci "Latihan bercampur":** (1) dua bagian: persegi (`SMP7-1-M4`/`SMP7-1-M5`) dan segitiga (`SMP7-1-M5`); atap diletakkan di sisi atas persegi. (2) `move` berjalan 8 kali; sprite berhenti di x = 0.
- **Petunjuk bertahap:** (a) tulis adegan sebagai kalimat; (b) tulis latar, posisi, dan ucapan tiap adegan; (c) baru susun blok.
- **AI:** tanpa AI. Kebijakan `smp-coding` (silabus bagian 7.1): AI generatif hanya demonstrasi guru, tanpa akun murid; asesmen tanpa AI.
- **Privasi:** tokoh dan tempat cerita fiktif; tidak ada nama, foto, suara, atau lokasi murid.
- **Unsur pembelajaran:** ingat kembali dan jarak (`K`), PRIMM (`K` usia 11 sampai 14), tabel penelusuran (`K`), contoh lengkap lalu setengah jadi (`K`), Parsons (`M`), latihan bercampur (`K`).
