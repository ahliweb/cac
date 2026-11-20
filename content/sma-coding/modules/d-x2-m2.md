## Untuk siapa modul ini

Modul ini untuk murid kelas X jalur D (kecerdasan buatan dan analisis data), untuk minggu `D-X2-M2` silabus v1.3: bias dan keadilan. Prasyarat: modul `d-x2-m1` (dari data ke keputusan) dan `d-x1-m9` (data, fitur, dan label). Alat: kertas dan tabel; Orange hanya untuk memeriksa angka, dan bagian itu bisa dilewati.

Modul ini karangan penyusun dan disetujui pemilik program pada 2026-11-20 (keputusan lewat dialog; catatan tinjauan menjadi tindak lanjut revisi). Jalur D adalah pengayaan di luar rumusan capaian pembelajaran (CP); minggu ini tidak punya irisan pengayaan, jadi modul ini tidak dihitung memenuhi butir CP mana pun.

Aturan jalur D yang berlaku: data hanya sintetis (karangan) atau terbuka dengan lisensi jelas, tanpa data yang bisa mengenali orang; wajah, suara, dan foto orang tidak dipakai sebagai data; AI generatif boleh dipakai dengan etika dan dicatat, tanpa data pribadi, kata sandi, atau tugas bernilai pada permintaanmu, dan kamu tidak wajib punya akun. Saran: jawab dulu sendiri, baru minta AI menjelaskan atau memberi petunjuk bertahap. Setiap soal `Latihan` bertanda `AI: boleh` atau `AI: tanpa AI`. Kasus di modul ini karangan; tidak ada orang, sekolah, atau penilai nyata.

Catatan untuk guru: angka dihitung penyusun dengan pustaka Orange 3.41.0, pengaturan bawaan Tree (per 2026-11). Pembangkit datanya sengaja disetel supaya pola bias tampak jelas; ini ilustrasi, bukan ukuran seberapa sering bias terjadi di dunia nyata. Antarmuka grafis tidak dijalankan penyusun, jadi tampilan `[belum terverifikasi]`.

## Ingat kembali

Jawab dari ingatan, baru cek di bagian kunci.

1. Apa beda program berbasis aturan dan sistem yang belajar dari data? (dari `d-x1-m8`)
2. Mengapa "lebih banyak contoh" belum tentu menjamin model yang adil dan benar? (dari `d-x1-m8`)
3. Bagaimana kamu memeriksa bias atau ketimpangan pada data proyekmu? (dari `d-x1-m13`)
4. Mengapa ketepatan 0,90 belum cukup untuk memercayai sebuah model? (dari `d-x2-m1`)

## Tujuan

Setelah modul ini kamu dapat:

- menyebut empat sumber bias pada sistem keputusan otomatis: data yang tidak mewakili, label yang subjektif, fitur yang menjadi pengganti (proksi), dan alat ukur yang tidak setara;
- menghitung ketepatan dan tingkat salah per kelompok, bukan hanya keseluruhan;
- menjelaskan dampak bias pada orang yang dinilai;
- menulis catatan kasus dengan satu usulan perbaikan yang masuk akal.

Keluaran yang diminta silabus: catatan kasus.

## Prediksi dulu

Kasus fiktif: "NilaiKilat", sistem yang memutuskan `lulus` atau `ulang` untuk esai pendek dari dua fitur: `kata` (jumlah kata) dan `salah_eja` (jumlah salah ejaan yang dihitung otomatis dari naskah yang dipindai). Esai ada dua gaya: `ketik` dan `tulis` (tulisan tangan yang dipindai dan dibaca mesin). Data latih berisi 20 esai, 16 `ketik` dan 4 `tulis`; keempat esai `tulis` itu semuanya `ulang`. Data uji berisi 12 esai, 6 `ketik` dan 6 `tulis`. Kolom `gaya` **tidak dipakai** model.

Sebelum membaca hasilnya, tebak dan tulis: (1) ketepatan keseluruhan pada 12 esai uji, (2) ketepatan pada tiap gaya, dan (3) gaya mana yang akan lebih sering dinilai keliru, serta mengapa.

## Contoh terselesaikan

Data latih (baris 1 sampai 20) dan data uji (baris 21 sampai 32). Kolom `m#gaya` memberi tahu Orange bahwa `gaya` adalah meta, bukan fitur.

```text
kata,salah_eja,m#gaya,c#nilai
245,4,ketik,lulus
245,3,ketik,lulus
160,10,ketik,ulang
176,9,tulis,ulang
210,3,ketik,lulus
174,8,ketik,ulang
190,10,ketik,ulang
111,7,ketik,ulang
111,10,tulis,ulang
96,7,ketik,ulang
265,3,ketik,lulus
164,5,ketik,ulang
180,6,ketik,lulus
131,10,ketik,ulang
72,9,ketik,ulang
109,8,ketik,ulang
127,11,tulis,ulang
76,15,tulis,ulang
161,4,ketik,lulus
209,3,ketik,lulus
```

```text
kata,salah_eja,m#gaya,c#nilai
231,4,tulis,lulus
202,8,tulis,lulus
200,4,ketik,lulus
140,10,tulis,ulang
235,9,tulis,lulus
226,5,ketik,lulus
166,10,ketik,ulang
229,11,tulis,lulus
214,5,ketik,lulus
213,5,ketik,lulus
229,7,tulis,lulus
202,6,ketik,lulus
```

Tree dengan pengaturan bawaan, dilatih pada data latih, memberi pohon berikut (angka di dalam kurung adalah banyak baris latih di daun itu):

```text
salah_eja <= 6
  kata <= 164 -> lulus  (seri: 1 lulus, 1 ulang)
  kata > 164  -> lulus  (6 lulus)
salah_eja > 6 -> ulang  (12 ulang)
```

Pada praktiknya pohon ini berbunyi: salah ejaan lebih dari 6 berarti `ulang`. Hasil pada data uji:

| No | gaya | salah_eja | Sebenarnya | Tebakan | Benar? |
| --- | --- | --- | --- | --- | --- |
| 21 | tulis | 4 | lulus | lulus | ya |
| 22 | tulis | 8 | lulus | ulang | **tidak** |
| 23 | ketik | 4 | lulus | lulus | ya |
| 24 | tulis | 10 | ulang | ulang | ya |
| 25 | tulis | 9 | lulus | ulang | **tidak** |
| 26 | ketik | 5 | lulus | lulus | ya |
| 27 | ketik | 10 | ulang | ulang | ya |
| 28 | tulis | 11 | lulus | ulang | **tidak** |
| 29 | ketik | 5 | lulus | lulus | ya |
| 30 | ketik | 5 | lulus | lulus | ya |
| 31 | tulis | 7 | lulus | ulang | **tidak** |
| 32 | ketik | 6 | lulus | lulus | ya |

Ketepatan keseluruhan **0,667** (8 dari 12). Tetapi per gaya: `ketik` 6 dari 6 = **1,000**, sedangkan `tulis` 2 dari 6 = **0,333**. Dari lima esai `tulis` yang sebenarnya `lulus`, empat ditolak keliru; pada `ketik` tidak ada satu pun ditolak keliru. Sebagai pembanding, tebakan mayoritas (`ulang`, label terbanyak di data latih) hanya benar 2 dari 12 = 0,167. Jadi model **lebih baik daripada pembanding**, tetapi **tidak adil**: lebih baik daripada pembanding tidak berarti adil.

Dari mana bias ini? Periksa keempat sumber:

| Sumber | Pada kasus ini |
| --- | --- |
| Data tidak mewakili | hanya 4 dari 20 esai latih berupa tulisan tangan, dan semuanya `ulang`; model tidak pernah melihat esai tulisan tangan yang `lulus` |
| Alat ukur tidak setara | `salah_eja` pada tulisan tangan dihasilkan pembacaan mesin yang lebih sering keliru (dalam data karangan ini ditambah 3 sampai 5), jadi angka yang sama berarti hal berbeda |
| Fitur pengganti (proksi) | `salah_eja` bermaksud mengukur kemampuan menulis, tetapi di sini juga mengukur kualitas pemindaian; kolom `gaya` dibuang, tetapi proksinya tetap membawa pengaruh gaya |
| Label subjektif | tidak dibahas pada data ini; di dunia nyata nilai guru bisa berbeda antarpenilai dan itu ikut terbawa |

Membuang kolom `gaya` tidak memperbaiki apa-apa. Orang yang dirugikan adalah penulis tulisan tangan, yang esainya bagus tetapi ditolak.

## Contoh setengah jadi

Sebuah alat baca-nilai fiktif diuji pada dua kelompok, P dan Q, masing-masing 10 esai (8 sebenarnya `lulus` dan 2 `ulang`). Pada kelompok P ada 1 esai `lulus` yang ditolak keliru; pada Q ada 4. Semua esai `ulang` benar ditebak di kedua kelompok.

1. Ketepatan P = ____ dari 10 = ____; ketepatan Q = ____ dari 10 = ____.
2. Ketepatan keseluruhan = ____ dari 20 = ____.
3. Selisih ketepatan P dan Q = ____ poin persen.
4. Tingkat `lulus` yang ditolak keliru: P = ____ dari 8 = ____; Q = ____ dari 8 = ____.
5. Apa yang disembunyikan ketepatan keseluruhan? ____

## Soal susun urutan

Ini versi tanpa kode dari soal Parsons: susun langkah acak menjadi urutan memeriksa bias sebuah model.

```text
(a) hitung ketepatan dan tingkat salah untuk tiap kelompok
(b) tentukan kelompok yang akan dibandingkan (tanpa data pribadi)
(c) bandingkan selisihnya dan catat siapa yang dirugikan
(d) telusuri sumber: data, alat ukur, fitur pengganti, label
(e) tulis catatan kasus dan satu usulan perbaikan
```

## Latihan

1. **Catatan kasus.** (`AI: boleh`) Tulis catatan kasus satu halaman untuk NilaiKilat: apa yang terjadi, siapa yang dirugikan, sumber bias yang paling mungkin, dan satu usulan perbaikan.
2. **Hitung per kelompok.** (`AI: tanpa AI`) Dari tabel hasil uji, hitung ketepatan tiap gaya dan banyaknya esai `lulus` yang ditolak keliru tiap gaya.
3. **Kolom sudah dibuang.** (`AI: tanpa AI`) Seorang teman berkata, "Kolom `gaya` tidak dipakai model, jadi model ini pasti adil." Setuju atau tidak? Beri dua alasan dari data.
4. **Memilih perbaikan.** (`AI: boleh`) Tiga usulan: (a) menambah esai tulisan tangan yang `lulus` ke data latih, (b) mengukur salah ejaan dengan cara yang sama untuk kedua gaya, (c) esai yang ditolak ditinjau manusia. Urutkan dari yang paling mengatasi sebab, dan sebut satu kekurangan tiap usulan.
5. **Catatan pemakaian AI (opsional).** Bila memakai asisten AI, catat alat, tujuan, garis besar perintah, bagian yang dipakai, dan cara memeriksanya.

## Latihan bercampur

1. Dari `d-x1-m9`: apa fitur dan apa label pada data NilaiKilat?
2. Dari `d-x2-m1`: tebakan mayoritas benar 2 dari 12 pada data uji. Mengapa model yang lebih baik dari angka itu belum tentu bisa dipakai?
3. Dari `d-x1-m11`: di widget File, bagaimana kolom `gaya` dibuat meta supaya tidak dipakai model tetapi tetap bisa dilihat?

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `d-x2-m3` (sekitar satu minggu lagi), `d-x2-m5` (sekitar tiga minggu lagi), dan `d-x2-m10` (sekitar delapan minggu lagi). Jawab sekarang lalu simpan.

1. Sebutkan empat sumber bias pada sistem keputusan otomatis.
2. Mengapa ketepatan keseluruhan dapat menyembunyikan ketidakadilan antarkelompok?
3. Apa yang perlu ada bila sistem otomatis memberi keputusan yang merugikan seseorang?

## Kesalahan umum

- **"Data tidak punya prasangka, jadi model pasti netral."** Data dikumpulkan dan dilabeli orang, dan bisa tidak mewakili semua kelompok.
- **"Cukup membuang kolom kelompok."** Fitur lain bisa menjadi pengganti yang membawa pengaruh yang sama.
- **"Ketepatan keseluruhan tinggi, berarti adil."** Pecah per kelompok; kelompok kecil tenggelam di angka keseluruhan.
- **"Lebih banyak data pasti memperbaiki."** Tambahan yang bentuknya sama mengulang ketimpangan yang sama (lihat `d-x1-m8`).
- **"Bias bisa dihapus sekali jadi."** Bias diperiksa lagi tiap data atau model berubah.

## Cek mandiri

- [ ] Saya dapat menyebut empat sumber bias.
- [ ] Saya menghitung ketepatan dan tingkat salah per kelompok.
- [ ] Saya dapat menjelaskan siapa yang dirugikan oleh sebuah kesalahan model.
- [ ] Saya tahu bahwa membuang kolom kelompok belum tentu cukup.
- [ ] Saya mencatat pemakaian AI bila saya memakainya.

## Kunci dan petunjuk

**Ingat kembali.** 1: program berbasis aturan mengikuti aturan yang ditulis orang; sistem yang belajar menyusun aturannya dari contoh data. 2: contoh tambahan bisa bentuknya sama atau tidak mewakili kelompok tertentu, sehingga ketimpangan terulang. 3: hitung banyak tiap label dan tiap kelompok, periksa kelas timpang dan kelompok yang jarang. 4: karena tebakan mayoritas pada data timpang bisa mencapai angka yang sama tanpa belajar.

**Prediksi dulu.** Tebakan bebas; hasil penyusun: 0,667 keseluruhan; `ketik` 1,000; `tulis` 0,333; `tulis` lebih sering keliru.

**Contoh setengah jadi.** 1: P 9 dari 10 = 0,900; Q 6 dari 10 = 0,600 (4 esai `lulus` salah). 2: 15 dari 20 = 0,750. 3: 30 poin persen. 4: P 1 dari 8 = 0,125; Q 4 dari 8 = 0,500. 5: ketepatan keseluruhan 0,750 menyembunyikan bahwa Q dirugikan jauh lebih sering.

**Soal susun urutan.** b, a, c, d, e.

**Latihan.** 1: rubrik: kejadian dan angka per kelompok disebut; yang dirugikan penulis tulisan tangan; minimal dua sumber (data dan alat ukur); usulan konkret. 2: `ketik` 6 dari 6 = 1,000; `tulis` 2 dari 6 = 0,333; `lulus` ditolak keliru: `ketik` 0 dari 5, `tulis` 4 dari 5. 3: tidak setuju: `salah_eja` menjadi proksi karena angkanya lebih tinggi pada tulisan tangan, dan data latih tidak punya contoh tulisan tangan yang `lulus`; hasil per gaya menunjukkan perbedaan yang jelas. 4: contoh urutan: (b) mengatasi sebab ukuran, (a) mengatasi sebab data, (c) hanya memperbaiki akibat. Kekurangan: (b) butuh alat baru, (a) butuh data yang sulit dicari, (c) memerlukan waktu dan tenaga manusia. 5: opsional.

**Latihan bercampur.** 1: fitur `kata` dan `salah_eja`; label `nilai` (`lulus` atau `ulang`); `gaya` adalah meta. 2: karena pembanding itu rendah; angka keseluruhan menyembunyikan kerugian satu kelompok. 3: ubah peran kolom `gaya` menjadi meta (dengan awalan `m#` di CSV, pustaka Orange memuatnya sebagai meta; letak pengaturan di widget `[belum terverifikasi]`).

**Ulang berjarak.** 1: data tidak mewakili, label subjektif, fitur pengganti (proksi), alat ukur tidak setara. 2: kelompok kecil tenggelam di angka rata-rata; per kelompok terlihat berbeda jauh. 3: tinjauan oleh manusia, kemampuan mengajukan keberatan, dan penjelasan alasan keputusan.

## Langkah berikutnya

Modul berikut: `d-x2-m3` (privasi dan data pribadi). Bacaan pendamping: `pendamping-teknologi-dan-demokrasi` untuk diskusi tentang dampak teknologi pada warga.
