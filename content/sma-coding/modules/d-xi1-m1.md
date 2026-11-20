## Untuk siapa modul ini

Modul ini untuk murid kelas XI jalur D (kecerdasan buatan dan analisis data), untuk minggu `D-XI1-M1` silabus v1.3: proses proyek data dan AI. Tidak ada prasyarat modul di indeks. Dari kelas X kamu seharusnya sudah pernah membuat rencana proyek kecil dengan Orange dan menulis prediksi sebelum menjalankan model; bila belum, minta guru menunjukkan contohnya. Alat minggu ini: kertas dan pensil. Tidak ada pemrograman dan tidak ada akun. Mulai `D-XI1-M2` alatmu Python.

Modul ini karangan penyusun dan disetujui pemilik program pada 2026-11-20 (keputusan lewat dialog; catatan tinjauan menjadi tindak lanjut revisi). Jalur D adalah pengayaan di luar rumusan capaian pembelajaran (CP); minggu ini tidak punya irisan pengayaan, jadi modul ini tidak dihitung memenuhi butir CP mana pun.

Aturan jalur D yang berlaku: data hanya sintetis (karangan) atau terbuka dengan lisensi jelas, tanpa data yang bisa mengenali orang; wajah, suara, dan foto orang tidak dipakai sebagai data; AI generatif boleh dipakai dengan etika dan dicatat, tanpa data pribadi, kata sandi, atau tugas bernilai pada permintaanmu, dan kamu tidak wajib punya akun. Saran: jawab dulu sendiri, baru minta AI memberi petunjuk bertahap. Setiap soal `Latihan` bertanda `AI: boleh` atau `AI: tanpa AI`.

Catatan untuk guru: semua proyek dan angka di modul ini karangan penyusun; tidak ada data nyata dan tidak ada sekolah, orang, atau perusahaan nyata. Satu semester kelas XI ini berjalan dari alur kerja (minggu ini), Python (M2 sampai M4), data (M5 sampai M7), model (M8 sampai M12), lalu proyek mini dan asesmen.

## Ingat kembali

Jawab dari ingatan, baru cek di bagian kunci.

1. Apa beda positif palsu dan negatif palsu, dan mengapa dampaknya bisa berbeda? (dari `d-x2-m7`)
2. Apa saja isi rencana proyek yang ditulis sebelum mengerjakan? (dari `d-x2-m13`)
3. Mengapa prediksi ditulis sebelum menjalankan model? (dari `d-x2-m13`)

## Tujuan

Setelah modul ini kamu dapat:

- menguraikan sebuah masalah menjadi lima tahap: masalah, data, model, evaluasi, dan penggunaan;
- menulis apa yang diperiksa di tiap tahap sebelum mulai mengerjakan;
- menyebut siapa yang terkena bila model salah dan apa yang dilakukan saat itu;
- menulis rancangan satu halaman untuk proyek fiktif.

Keluaran yang diminta silabus: rancangan satu halaman.

## Prediksi dulu

Sebuah sekolah fiktif ingin model yang memprediksi apakah sebuah laptop pinjaman akan rusak bulan depan. Dari data karangan, 5 dari 100 laptop rusak tiap bulan. Seorang murid membuat "model" yang selalu menjawab `tidak rusak`.

Tebak dan tulis: (1) berapa persen tebakannya benar, (2) berapa laptop rusak yang berhasil ia peringatkan, dan (3) apakah model ini layak dipakai. Tulis jawabanmu sebelum membaca contoh di bawah.

## Contoh terselesaikan

**Lima tahap proyek.** Pekerjaan data dan AI jarang berupa garis lurus. Hasil evaluasi sering mengirim kita kembali ke data atau ke rumusan masalah. Meski begitu, lima tahap ini membantu menyusun rencana:

| Tahap | Pertanyaan yang dijawab | Yang diperiksa |
| --- | --- | --- |
| 1. Masalah | Apa yang diputuskan, oleh siapa, dengan akibat apa? | Apakah masalah memang butuh prediksi, atau cukup aturan sederhana? |
| 2. Data | Data apa yang ada, dari mana, boleh dipakai? | Sumber, lisensi, data pribadi, nilai hilang, jumlah baris |
| 3. Model | Jenis model apa, dan apa pembandingnya? | Pembanding sederhana (tebakan mayoritas atau rata-rata) ditulis lebih dulu |
| 4. Evaluasi | Ukuran apa, pada data mana? | Data uji terpisah dari data latih; jenis kesalahan, bukan hanya ketepatan |
| 5. Penggunaan | Siapa memakai hasilnya, dan apa yang terjadi bila model salah? | Rencana cadangan, pemantauan, siapa yang bertanggung jawab |

**Rancangan satu halaman, proyek fiktif.** Perpustakaan desa fiktif "Taman Baca Contoh" ingin tahu jumlah peminjaman buku per hari agar tahu kapan butuh dua penjaga. Semua isi di bawah karangan:

```text
Judul      : Perkiraan peminjaman harian, Taman Baca Contoh (fiktif)
1 Masalah  : Pengurus memutuskan jadwal penjaga. Salah perkiraan rendah:
             antrean panjang. Salah perkiraan tinggi: penjaga menganggur.
             Aturan sederhana (hari Sabtu ramai) dicoba lebih dulu.
2 Data     : Catatan peminjaman karangan 120 hari (tanggal, hari, jumlah).
             Tanpa nama peminjam. Nilai hilang dicek dan dicatat.
3 Model    : Pembanding: rata-rata per hari dalam seminggu.
             Model: regresi linear sederhana (dipelajari di M8).
4 Evaluasi : 30 hari terakhir sebagai data uji. Ukuran: selisih rata-rata
             dalam buku. Dilaporkan juga kapan model paling meleset.
5 Penggunaan: Pengurus melihat perkiraan, lalu memutuskan sendiri.
             Bila meleset dua hari berturut-turut, kembali ke aturan Sabtu.
Risiko     : data hanya musim hujan; belum tentu cocok saat libur sekolah.
Prediksi   : (ditulis sebelum menjalankan) model hanya sedikit lebih baik
             daripada rata-rata per hari.
```

**Menjawab prediksi tadi.** Model "selalu tidak rusak" benar 95 dari 100 (95 persen) tetapi memperingatkan 0 dari 5 laptop rusak. Ketepatan tinggi, kegunaan nol: inilah alasan tahap 4 meminta jenis kesalahan dan tahap 3 meminta pembanding. Layak dipakai atau tidak bergantung pada akibat laptop rusak yang tidak terduga, bukan pada angka 95.

## Contoh setengah jadi

Lengkapi rancangan untuk saringan pesan fiktif "KotakMasuk Contoh", yang menandai pesan sebagai `spam`.

```text
1 Masalah  : Pengguna memutuskan membuka atau mengabaikan pesan.
             Positif palsu: ____.  Negatif palsu: ____.
2 Data     : 2.000 pesan karangan. Yang dicek: ____, ____.
3 Model    : Pembanding: ____ (selalu menjawab kelas terbanyak).
4 Evaluasi : Pesan uji dipisah ____ model dilatih.
             Yang dilaporkan selain ketepatan: ____.
5 Penggunaan: Pesan yang ditandai spam ____ (dihapus / disimpan di folder).
```

## Soal susun urutan

Ini versi tanpa kode dari soal Parsons: susun langkah acak menjadi alur proyek yang masuk akal.

```text
(a) tulis prediksi hasil sebelum menjalankan model
(b) tentukan siapa yang terkena bila model salah
(c) periksa sumber dan lisensi data
(d) jalankan model dan evaluasi di data uji
(e) bandingkan dengan pembanding sederhana
(f) putuskan: dipakai, diperbaiki, atau ditolak
```

## Latihan

1. **Uraikan.** (`AI: tanpa AI`) Sebuah aplikasi fiktif ingin menyarankan jam belajar terbaik tiap murid. Tulis satu kalimat untuk tiap dari lima tahap.
2. **Cari kelemahan.** (`AI: boleh`) Rancangan: "Kita latih model pada semua data lalu ukur ketepatannya pada data yang sama." Sebut tiga kelemahan dan perbaikannya.
3. **Siapa terkena.** (`AI: tanpa AI`) Pada saringan pesan fiktif, tulis akibat positif palsu dan negatif palsu bagi pengguna, lalu pilih yang lebih mahal.
4. **Rancang proyek fiktif.** (`AI: boleh`) Pilih satu pertanyaan dari kehidupan sehari-hari dan tulis rancangan satu halaman dengan format di contoh. Data yang kamu bayangkan harus karangan atau terbuka berlisensi; tanpa data tentang orang yang bisa dikenali.
5. **Catatan pemakaian AI (opsional).** Bila memakai asisten AI, catat alat, tujuan, garis besar perintah, bagian yang dipakai, dan cara memeriksanya.

## Latihan bercampur

1. Dari `d-x2-m7`: pada proyek saringan pesan, mengapa ketepatan 0,85 belum cukup untuk memutuskan dipakai atau tidak?
2. Dari `d-x2-m12`: sebuah tabel dari situs tanpa keterangan lisensi tampak cocok untuk tahap 2. Apa yang kamu lakukan sebelum memakainya?

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `d-xi1-m2` (sekitar satu minggu lagi), `d-xi1-m4` (sekitar tiga minggu lagi), dan `d-xi1-m9` (sekitar delapan minggu lagi). Jawab sekarang lalu simpan.

1. Sebutkan lima tahap proyek data dan AI, dan satu hal yang diperiksa di tiap tahap.
2. Mengapa rencana proyek menyebut siapa yang terkena bila model salah, sebelum model dibuat?
3. Mengapa rencana evaluasi menulis pembanding sederhana, misalnya tebakan mayoritas?

## Kesalahan umum

- **"Proyek AI dimulai dari memilih model."** Awalnya adalah masalah dan keputusan yang akan dibantu; model hanya satu dari lima tahap.
- **"Ketepatan tinggi berarti model berguna."** Model yang selalu menjawab kelas terbanyak tinggi tanpa menolong siapa pun (contoh laptop).
- **"Lima tahap berjalan sekali dari atas ke bawah."** Hasil evaluasi sering mengembalikan kamu ke data atau masalah; itu normal, bukan kegagalan.
- **"Prediksi ditulis sesudah hasil, supaya tidak salah."** Prediksi sesudah hasil tidak menguji apa pun.

## Cek mandiri

- [ ] Saya dapat menyebut lima tahap proyek dan satu pemeriksaan di tiap tahap.
- [ ] Saya dapat menulis siapa yang terkena bila model salah.
- [ ] Saya menulis pembanding sederhana sebelum memilih model.
- [ ] Saya menulis prediksi sebelum menjalankan model.
- [ ] Saya mencatat pemakaian AI bila saya memakainya.

## Kunci dan petunjuk

**Ingat kembali.** 1: positif palsu: bukan yang dicari tetapi ditandai; negatif palsu: yang dicari tetapi lolos; dampak berbeda menurut kasus (air buruk lolos lebih berbahaya daripada air bagus dibuang). 2: pertanyaan, data, pembagian latih dan uji, model dan pembanding, ukuran evaluasi, kriteria selesai, prediksi, risiko, dan etika. 3: supaya prediksi menguji pemahamanmu; prediksi sesudah hasil tidak menguji apa pun.

**Prediksi dulu.** Hasil penyusun: (1) 95 persen; (2) 0 dari 5; (3) tidak layak sebagai peringatan karena tidak menangkap satu pun laptop rusak, walaupun ketepatannya tinggi.

**Contoh setengah jadi.** Contoh jawaban. Masalah: positif palsu: pesan biasa masuk folder spam dan mungkin terlewat; negatif palsu: spam masuk kotak utama. Data: nilai hilang dan duplikat (atau sumber dan lisensi). Pembanding: tebakan mayoritas. Evaluasi: dipisah sebelum model dilatih; yang dilaporkan: jenis kesalahan (positif palsu dan negatif palsu). Penggunaan: disimpan di folder spam, bukan dihapus, karena positif palsu bisa membuang pesan penting.

**Soal susun urutan.** Salah satu urutan wajar: c, b, a, e, d, f. Intinya: sumber dan akibat kesalahan dipikirkan sebelum model; prediksi ditulis sebelum menjalankan; pembanding sebelum hasil dibaca; keputusan di akhir.

**Latihan.** 1: contoh: masalah: murid ingin jam belajar yang efektif; data: catatan jam dan hasil kuis karangan; model: pembanding rata-rata lalu model sederhana; evaluasi: data uji terpisah dan galat; penggunaan: sebagai saran, murid memutuskan sendiri. 2: ukur pada data yang sama dengan data latih memberi angka terlalu bagus; pisahkan data uji sebelum melatih, laporkan jenis kesalahan, dan bandingkan dengan pembanding. 3: positif palsu: pesan penting masuk folder spam; negatif palsu: spam masuk kotak utama; umumnya positif palsu lebih mahal bila pesan penting hilang, tetapi alasannya harus ditulis. 4: dinilai dari kelengkapan lima tahap, pembanding, prediksi tertulis, dan risiko. 5: opsional.

**Latihan bercampur.** 1: karena 0,85 bisa hanya sedikit di atas tebakan mayoritas, dan tidak menunjukkan berapa spam yang lolos atau berapa pesan penting yang salah ditandai. 2: cari keterangan lisensi di halaman sumber; bila tidak jelas, jangan pakai dan cari sumber lain.

**Ulang berjarak.** 1: masalah (apakah butuh prediksi), data (sumber, lisensi, nilai hilang), model (pembanding lebih dulu), evaluasi (data uji, jenis kesalahan), penggunaan (siapa terkena, rencana cadangan). 2: karena akibat kesalahan menentukan ukuran evaluasi dan apakah model dipakai. 3: karena tanpa pembanding, angka seperti 95 persen tidak bisa dinilai.

## Langkah berikutnya

Modul berikut: `d-xi1-m2` (Python I), tempat kamu mulai menulis program: variabel, kondisi, dan perulangan. Bacaan pendamping: `pendamping-periksa-fakta-dan-baca-lateral` untuk memeriksa klaim tentang data.
