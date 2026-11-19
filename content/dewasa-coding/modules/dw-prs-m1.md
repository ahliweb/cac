## Untuk siapa modul ini

Modul ini untuk jalur **personal** (`PRS`), 5 jam, sesudah `DW-FND-M1`; tidak ada prasyarat coding. Alatnya kertas dan pena atau penyunting teks. **Tidak ada kode** di modul ini: Anda menulis langkah dalam bahasa sehari-hari dengan tata tertib yang tegas. Estimasi dua sesi `[asumsi]`.

Masalah yang Anda pilih boleh bertema pribadi, tetapi tulis **hanya langkah umum**: tanpa nama orang, alamat, nomor, kata sandi, atau angka keuangan nyata. Gunakan angka rekaan seperti pada contoh.

## Cek awal pengalaman

Jawab tanpa melihat apa pun, lalu cocokkan dengan kunci. Skor tidak dicatat.

1. Apa itu algoritma, dalam satu kalimat?
2. Sebut tiga bentuk dasar langkah dalam algoritma.
3. Mengapa langkah "pastikan semuanya beres" belum bisa dijalankan orang lain tanpa menebak?
4. Apa itu menguraikan masalah (dekomposisi)? Beri satu contoh.
5. Bagaimana sebuah pengulangan tahu kapan harus berhenti?

Bila kelimanya benar, Anda boleh melewati "Contoh terselesaikan" dan "Contoh setengah jadi" dan langsung ke "Latihan".

## Ingat kembali

Ini modul pertama jalur `PRS`; yang diingat berasal dari modul bersama dan kebiasaan Anda. Tanpa melihat `DW-FND-M1`, tulis jawaban singkat.

1. Sebutkan tiga aturan tentang kredensial.
2. Apa itu *prompt injection*, dalam satu kalimat?
3. Daftar tempat Anda menyimpan atau mengetik kata sandi dari modul itu: apa yang sudah Anda ubah?

Cocokkan: (1) tidak di berkas kode, tidak di perintah AI, tidak di-commit atau muncul di tangkapan layar; (2) instruksi tersembunyi dalam teks dari luar yang diikuti AI; (3) jawabannya milik Anda sendiri; tidak ada yang dicatat atau dinilai.

## Tujuan

Setelah modul ini Anda dapat menguraikan masalah sehari-hari menjadi urutan, kondisi, dan pengulangan.

## Prediksi dulu

Anggaran jajan mingguan Rp 100.000. Pengeluaran sehari-hari (rekaan): Senin 25.000, Selasa 18.000, Rabu 30.000, Kamis 22.000, Jumat 15.000. Algoritma ini menjawab "pada hari apa anggaran habis?":

```text
1. Tetapkan sisa = 100000.
2. Untuk setiap hari, mulai dari Senin:
   2a. Kurangi sisa dengan pengeluaran hari itu.
   2b. Jika sisa kurang dari 0, berhenti dan catat nama hari itu.
3. Jika sampai Jumat sisa tidak pernah kurang dari 0, catat "cukup".
```

Sebelum menelusurinya, tulis: pada hari apa algoritma berhenti, dan berapa sisa saat itu?

## Contoh terselesaikan

### Tiga bentuk dasar

- **Urutan:** langkah dikerjakan satu per satu, dari atas ke bawah (langkah 1, lalu 2).
- **Kondisi:** langkah yang hanya dikerjakan bila sebuah pernyataan benar ("jika sisa kurang dari 0, ...").
- **Pengulangan:** sekelompok langkah dikerjakan berkali-kali ("untuk setiap hari ..."), dengan batas yang jelas (hari habis, atau syarat berhenti terpenuhi).

Langkah yang baik **tegas**: orang lain dapat menjalankannya tanpa menebak. "Hitung pengeluaran" masih samar; "kurangi sisa dengan pengeluaran hari itu" tegas.

### Menelusuri dengan tabel

Telusuri algoritma di atas dengan tabel; setiap baris adalah satu putaran pengulangan.

| Hari | Pengeluaran | Sisa sesudah dikurangi | Sisa kurang dari 0? |
| --- | --- | --- | --- |
| Senin | 25.000 | 75.000 | tidak |
| Selasa | 18.000 | 57.000 | tidak |
| Rabu | 30.000 | 27.000 | tidak |
| Kamis | 22.000 | 5.000 | tidak |
| Jumat | 15.000 | -10.000 | ya, berhenti |

Algoritma berhenti pada **Jumat** dengan sisa **-10.000**. Penulis memeriksa jejak ini dengan skrip kecil (Python 3.12.3, `python3 -I`) yang mencetak angka yang sama. Periksa dengan tangan: 25.000 + 18.000 + 30.000 + 22.000 + 15.000 = 110.000, dan 110.000 - 100.000 = 10.000 melebihi anggaran.

### Menguraikan masalah besar

Masalah "menyiapkan makan malam sederhana untuk tiga orang" terlalu besar untuk langsung ditulis. Uraikan menjadi bagian yang lebih kecil, dan uraikan lagi sampai tiap bagian tegas:

```text
Menyiapkan makan malam
- Merencanakan menu: pilih dua lauk; periksa persediaan.
- Berbelanja: tulis daftar; beli bahan yang kurang.
- Memasak: urutkan menurut lama masak; masak yang paling lama dulu.
- Menyajikan dan merapikan.
```

Setiap bagian dapat ditulis sebagai algoritma sendiri; kondisi dan pengulangan muncul di dalamnya ("jika bahan kurang, tambahkan ke daftar"; "untuk setiap bahan dalam daftar ...").

### Pengulangan yang tidak berhenti

Algoritma "ulangi: periksa kotak masuk" tanpa syarat berhenti tidak pernah selesai. Tambahkan batas: "ulangi sampai kotak masuk kosong, atau sampai tiga kali pemeriksaan".

## Contoh setengah jadi

Lengkapi algoritma berikut untuk memilih hari menyiram tanaman, lalu telusuri dengan data rekaan "kering, hujan, kering":

```text setengah-jadi
Untuk setiap hari dalam tiga hari ke depan:
   Jika tanah ___ dan tidak ada ___:
      catat hari itu sebagai hari menyiram
Jika tidak ada hari yang dicatat, catat "tidak perlu menyiram".
```

Prediksi dulu: hari mana yang dicatat?

## Latihan

1. **Ubah.** Ubah anggaran pada contoh menjadi Rp 80.000. Prediksi dulu hari berhenti dan sisanya, lalu telusuri dengan tabel.
2. **Buat.** Tulis masalah pribadi pertama Anda sebagai algoritma lima sampai delapan langkah yang memuat satu kondisi dan satu pengulangan (misalnya merapikan jadwal minggu depan).
3. **Jelaskan.** Pindahkan langkah 2b ke luar pengulangan (setelah semua hari diproses) dan laporkan "hari terakhir" bila sisa kurang dari 0. Dengan anggaran 80.000, apa hasilnya, dan mengapa salah?
4. **Buat.** Ambil satu langkah samar dari algoritma Anda sendiri dan tulis ulang menjadi dua langkah tegas.
5. **Berpasangan (opsional).** Tukar algoritma dengan rekan; masing-masing menelusurinya dengan data rekaan dan menandai satu langkah yang menimbulkan tebakan. Peserta mandiri boleh menelusuri sendiri.

## Latihan bercampur

1. (`DW-FND-M1`) Sebuah algoritma membereskan surel berisi langkah "jika surel meminta kata sandi, kirimkan". Tunjukkan kekeliruannya, lalu tulis ulang sebagai kondisi yang aman.
2. (`DW-FND-M1`) Tandai pada algoritma Anda sendiri langkah mana yang menyentuh data pribadi. Mengapa teks langkah itu tidak boleh ditempel ke asisten AI begitu saja?

## Keluaran portofolio

**Tiga masalah pribadi dalam bentuk algoritma.** Tiga algoritma (masing-masing memuat urutan, minimal satu kondisi atau pengulangan), jejak tabel untuk satu di antaranya dengan data rekaan, dan satu kalimat tentang langkah yang paling sulit ditegaskan. Tanpa data pribadi nyata.

## Ulang berjarak

Tanpa melihat modul ini, kerjakan ulang dan cocokkan. Pertanyaan ini akan muncul lagi di "Ingat kembali" modul berikutnya.

| Kapan | Pertanyaan |
| --- | --- |
| Satu minggu lagi (modul berikutnya) | Apa itu kondisi dan pengulangan? Beri satu contoh sehari-hari untuk masing-masing. |
| Tiga modul lagi | Apa itu menelusuri dengan tabel, dan mengapa dikerjakan sebelum langkah dianggap benar? |
| Akhir jalur | Tulis satu masalah pribadi sebagai algoritma lima langkah dengan satu kondisi dan satu pengulangan. |

## Kebijakan AI

Modul ini tidak memakai asisten AI; kebijakan lengkap program ada di `DW-FND-M1` dan dipakai penuh pada `DW-PKJ-M6`, `DW-PRO-M13`, dan `DW-BIS-M7` (silabus bagian 9.1).

## Kesalahan umum

- **Langkah samar.** "Urus tagihan" belum bisa dijalankan; tulis siapa, apa, dan kapan berhenti.
- **Pengulangan tanpa syarat berhenti.** Algoritma tidak pernah selesai.
- **Memeriksa kondisi di tempat yang salah.** Pada Latihan 3, pemeriksaan di luar pengulangan memberi hari yang salah.
- **Menelusuri hanya satu kasus.** Coba juga kasus tepi: anggaran besar sehingga tidak pernah habis, atau pengeluaran nol.
- **Menulis data pribadi nyata dalam contoh.** Pakai angka dan nama rekaan.

## Cek mandiri

Tutup modul dan jawab:

1. Tiga bentuk dasar langkah, masing-masing dengan satu contoh dari hidup Anda.
2. Bagaimana Anda tahu sebuah langkah sudah cukup tegas?
3. Bagaimana tabel penelusuran membantu menemukan kesalahan?

Daftar periksa (kosong; Anda isi sendiri, tidak dikumpulkan):

- [ ] Tiap algoritma saya punya langkah tegas dan syarat berhenti.
- [ ] Saya menelusuri satu algoritma dengan tabel dan data rekaan.
- [ ] Saya mencoba satu kasus tepi.
- [ ] Tidak ada data pribadi nyata di tulisan saya.

## Kunci dan petunjuk

- **Cek awal:** (1) urutan langkah tegas untuk menyelesaikan masalah; (2) urutan, kondisi, pengulangan; (3) karena orang lain harus menafsirkan apa arti "beres"; (4) memecah masalah besar menjadi bagian kecil, misalnya "makan malam" menjadi menu, belanja, memasak, menyajikan; (5) lewat syarat berhenti atau habisnya hal yang diulang.
- **Prediksi:** berhenti pada Jumat, sisa -10.000.
- **Setengah jadi:** `kering` dan `hujan`: "Jika tanah kering dan tidak ada hujan". Data "kering, hujan, kering": hari pertama dan hari ketiga dicatat, hari kedua tidak.
- **Latihan 1:** berhenti pada Kamis dengan sisa -15.000 (sisa Senin 55.000, Selasa 37.000, Rabu 7.000).
- **Latihan 3:** versi salah melaporkan Jumat dengan sisa -30.000, padahal anggaran sudah habis pada Kamis; memeriksa di dalam pengulangan menangkap saat pertama kali terlewati.
- **Latihan bercampur 1:** kekeliruannya mengirim kata sandi karena diminta; tulis ulang: "jika surel meminta kata sandi, jangan balas, hapus, dan laporkan".
- **Petunjuk bila macet:** tulis nilai setiap variabel di tiap putaran pada tabel sebelum menebak.

## Langkah berikutnya

`DW-PRS-M2`: algoritma yang Anda tulis dalam bahasa sehari-hari berikutnya Anda terjemahkan menjadi program Python pertama (variabel, masukan, kondisi, perulangan).

## Catatan untuk pendamping

- **Waktu:** 5 jam. **Bahan:** kertas dan pena atau penyunting teks. Jejak pada contoh dicek penulis dengan skrip Python (3.12.3, `python3 -I`) dan dengan tangan.
- **Tanda siap lanjut:** peserta menulis langkah tegas dengan kondisi dan pengulangan, serta menelusuri algoritma dengan tabel.
- **Privasi:** ingatkan agar tulisan peserta tidak memuat nama, alamat, atau angka keuangan nyata.
