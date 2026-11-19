## Untuk siapa modul ini

Modul ini untuk murid kelas XII jalur E (komputasi kuantum), minggu `E-XII2-M6` silabus v1.4: proyek akhir, fase rancangan, dengan keluaran dokumen rancangan. Prasyarat: modul `e-xii2-m5`; modul `e-xii1-m12` belum terindeks, jadi guru memeriksanya. Di luar indeks, proyek yang berkode memerlukan dasar pemrograman setara `A-X1-M9..M12` (C++) atau `B-X1-M9..M12` (TypeScript dengan Bun); proyek studi banding tidak memerlukannya. Proyek dikerjakan perorangan atau berpasangan selama tujuh minggu (`E-XII2-M6` sampai `E-XII2-M12`). Alat: kertas, kalkulator, dan simulator atau bahasa pilihanmu (tanpa akun).

Modul ini berstatus DRAF: karangan penyusun, belum ditinjau pemilik. Jalur E adalah pengayaan di luar rumusan CP; minggu ini tanpa irisan pengayaan, jadi modul ini tidak dihitung memenuhi butir CP mana pun.

Aturan AI jalur ini: AI generatif boleh dipakai dengan etika dan dicatat, tanpa data pribadi, kata sandi, atau tugas bernilai pada permintaanmu, dan tanpa akun wajib. Saran: jawab dulu sendiri, baru minta petunjuk bertahap; kode buatan AI kamu baca, jalankan, dan uji. Catat pemakaian AI di log proyek (alat, tujuan, garis besar perintah, bagian yang dipakai, cara memeriksanya).

Catatan untuk guru: modul ini tidak memuat kode baru. Angka contoh (`121/128` dan `25/32` untuk pencarian Grover pada delapan item) dihitung penyusun dari peluang `sin^2((2t + 1) theta)` dengan `sin(theta) = 1/akar(N)`, dibahas di `e-xii1-m5`; dasarnya, bahwa tiap iterasi memutar keadaan sebesar `2 theta` dengan `theta = asin(akar(|A1| / N))`, dibaca dari halaman "Analysis" kursus IBM Quantum Learning tentang algoritma Grover, per tanggal akses 2026-11-19.

## Ingat kembali

Jawab dari ingatan, baru cek di bagian kunci.

1. Pada `c = 10^6`, pada ukuran ruang kunci berapa bit pencarian Grover mulai lebih murah daripada klasik? (dari `e-xii2-m5`)
2. Berapa pembacaan sirkuit untuk 40 iterasi dengan 4 pengaturan per iterasi dan 1000 shot? (dari `e-xii2-m3`)
3. Apa yang boleh dan tidak boleh dicatat dari demonstrasi cloud quantum di kelas? (dari `e-xii1-m12`)

## Tujuan

Setelah modul ini kamu dapat:

- memilih satu dari tiga jenis proyek (simulator, algoritma, atau studi banding) dan menyatakan pertanyaan proyekmu;
- menulis kriteria selesai yang terukur dan satu uji tangan yang jawabannya dihitung sebelum ada kode;
- membagi tujuh minggu menjadi sprint dengan titik periksa dan mencatat risikonya.

Keluaran yang diminta silabus: dokumen rancangan.

## Rencana proyek

**Tiga jenis proyek.** (A) *Simulator*: memperluas simulatormu (mis. gerbang tambahan, model derau dari `e-xii1-m8`, atau mitigasi dari `e-xii2-m2`). (B) *Algoritma*: mengimplementasikan satu algoritma (Deutsch-Jozsa, Bernstein-Vazirani, atau Grover) dan menganalisis jumlah query. (C) *Studi banding*: membandingkan simulator dengan hasil terarsip atau demonstrasi guru (`e-xii1-m12`), atau menulis tinjauan bersumber seperti `e-xii2-m4`. Pilih yang pertanyaannya paling sempit; proyek yang terlalu besar gagal lebih sering daripada yang terlalu kecil.

**Kriteria selesai** harus bisa dicek orang lain: angka, bukan perasaan. **Uji tangan** adalah satu hasil yang kamu hitung dengan kertas **sebelum** ada kode, sehingga kode tidak menentukan jawabannya. **Prediksi** menuliskan hasil yang kamu harapkan, termasuk bagian yang kamu ragukan.

**Contoh rencana terselesaikan** (karangan penyusun; nama dan data fiktif):

```text
Proyek (jenis B, Grover tiga qubit) | Murid: Rani Contoh
Pertanyaan: seberapa tinggi peluang item bertanda pada N = 8 setelah t = 1, 2, 3 iterasi,
  dan benarkah t = 2 terbaik?
Kriteria selesai:
  1. Peluang item bertanda dari simulatorku cocok dengan hitungan tangan (selisih < 1e-9).
  2. Histogram 1000 shot untuk t = 2 sesuai prediksi dalam tiga simpangan wajar.
  3. Satu halaman dokumentasi: cara menjalankan, hasil, batas klaim.
Uji tangan (dihitung dulu): sin(theta) = 1/akar(8); P(t) = sin^2((2t + 1) theta)
  t = 1: 25/32 = 0,78125   t = 2: 121/128 = 0,9453125   t = 3: sekitar 0,3301
Prediksi: t = 2 tertinggi; t = 3 turun karena melewati puncak.
Risiko: (1) difusi salah tanda -> uji dengan N = 4 dulu; (2) kehabisan waktu -> sprint 1
  hanya t = 1 dan N = 4; (3) klaim kelebihan -> tulis bahwa ini simulasi, bukan keunggulan.
Sprint: M6 rancangan; M7 inti simulator; M8 uji vs hitungan tangan; M9 dokumentasi;
  M10 perbaikan; M11 presentasi; M12 portofolio.
Privasi dan AI: tanpa data pribadi; log AI di berkas log.txt.
```

Kerjakan rencanamu sendiri dengan bentuk yang sama; jangan menyalin angka contoh bila topikmu berbeda.

## Daftar periksa

- [ ] Pertanyaan proyek satu kalimat dan sempit.
- [ ] Jenis proyek dipilih (A, B, atau C) beserta alasannya.
- [ ] Tiga kriteria selesai yang terukur.
- [ ] Satu uji tangan dengan jawaban yang dihitung sebelum kode.
- [ ] Prediksi hasil dan bagian yang diragukan.
- [ ] Tiga risiko, masing-masing dengan satu langkah kecil.
- [ ] Rencana tujuh sprint (`E-XII2-M6` sampai `E-XII2-M12`).
- [ ] Tidak ada data pribadi, nama murid, token, atau kunci di rencana.
- [ ] Rencana log pemakaian AI.
- [ ] Batas klaim ditulis: simulator, bukan perangkat; tanpa klaim keunggulan.

## Umpan balik sejawat

Tukar dokumen rancangan dengan satu teman. Beri tiga hal, tertulis: **satu yang sudah baik**, **satu yang perlu diperbaiki**, dan **satu langkah berikutnya**. Periksa dua hal secara khusus: apakah kriteria selesai bisa dicek orang lain, dan apakah uji tangannya benar-benar dihitung sebelum kode. Penerima membalas dengan satu perubahan yang akan dibuat.

## Latihan bercampur

1. Berapa memori vektor keadaan 25 qubit bila tiap amplitudo 8 byte, dan apakah itu cocok untuk proyek simulator di laptop? (`e-xii1-m4`)
2. Tentukan jumlah shot minimal agar setengah lebar selang 95 persen untuk peluang sekitar 0,5 paling besar 0,01. (`e-xii2-m1`)

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `e-xii2-m7` (satu minggu lagi), `e-xii2-m9` (sekitar tiga minggu lagi), dan `e-xii2-m14` (sekitar delapan minggu lagi). Jawab sekarang lalu simpan.

1. Apa isi minimal dokumen rancangan proyek?
2. Apa yang tidak boleh masuk ke dokumentasi atau portofolio?
3. Sebutkan tiga risiko proyek dan satu langkah kecil untuk masing-masing.

## Kesalahan umum

- **"Rancangan bagus berarti proyek besar."** Pertanyaan yang sempit lebih mungkin selesai dan teruji.
- **"Uji tangan boleh ditulis setelah kode jalan."** Jawaban yang ditulis setelahnya mudah ikut-ikutan keluaran program.
- **"Kriteria selesai: 'sudah bagus'."** Kriteria harus bisa dicek orang lain.
- **"Proyek kuantum harus memakai perangkat nyata."** Proyek ini boleh sepenuhnya simulasi, selama batas klaimnya jelas.
- **"Cukup menyalin kode dari AI."** Kode AI kamu baca, jalankan, uji, dan catat di log.

## Cek mandiri

- [ ] Saya dapat menyatakan pertanyaan proyek dalam satu kalimat.
- [ ] Saya dapat menulis kriteria selesai yang terukur.
- [ ] Saya sudah menghitung satu uji tangan sebelum menulis kode.
- [ ] Saya dapat menyebut tiga risiko dan langkah kecilnya.
- [ ] Saya mencatat pemakaian AI bila saya memakainya.

## Kunci dan petunjuk

**Ingat kembali.** 1: sekitar 41 bit pada model `c = 10^6` (`2 x log2(c x pi / 2)`). 2: `40 x 4 x 1000` = 160000. 3: boleh: label sintetis, jumlah shot, histogram agregat, tanggal akses; tidak boleh: token, nama akun, nama murid, atau tangkapan layar yang memuat itu.

**Rencana proyek.** Contoh uji tangan: `theta = asin(1/akar 8)` = 0,3614 rad (20,70°); `t = 1`: `sin^2(3 theta)` = 0,78125 = 25/32; `t = 2`: `sin^2(5 theta)` = 0,9453125 = 121/128; `t = 3`: `sin^2(7 theta)` = 0,3301 (dihitung penyusun; angka kunci tidak dari program proyek).

**Daftar periksa.** Tidak ada jawaban tunggal; pemeriksa memastikan tiap butir bisa dicek orang lain.

**Umpan balik sejawat.** Penilaian berupa tiga kalimat tertulis; tidak ada nilai angka.

**Latihan bercampur.** 1: `2^25 x 8` byte = 256 MiB; cocok untuk laptop biasa, tetapi 30 qubit sudah 8 GiB. 2: `1,96^2 x 0,25 / 0,01^2` = 9604 shot.

**Ulang berjarak.** 1: topik dan pertanyaan, jenis proyek, kriteria selesai terukur, uji tangan beserta jawabannya, rencana sprint, risiko, dan batas klaim. 2: nama murid atau guru, nama sekolah, kontak, token atau kunci, tangkapan layar yang memuat akun, dan data pekerjaan cloud yang bukan agregat. 3: contoh: (a) difusi salah tanda, langkahnya uji dengan `N = 4` dulu; (b) waktu habis, langkahnya sprint pertama hanya kasus terkecil; (c) klaim berlebihan, langkahnya tulis batas klaim.

## Langkah berikutnya

Modul berikut: `e-xii2-m7` (proyek akhir: implementasi I). Bacaan pendamping: `e-xii1-m5` dan `e-xii2-m1`.
