## Untuk siapa modul ini

Modul ini untuk murid kelas X jalur D (kecerdasan buatan dan analisis data), untuk minggu `D-X1-M9` silabus v1.3: data, fitur, dan label. Prasyarat: modul `d-x1-m8` (apa itu AI dan apa yang bukan). Tidak perlu memprogram, tidak perlu akun, dan tidak perlu komputer: semua kegiatan memakai kertas, kartu, dan diskusi (*unplugged*).

Modul ini berstatus DRAF: karangan penyusun, belum ditinjau pemilik. Jalur D adalah pengayaan di luar rumusan capaian pembelajaran (CP). Minggu ini beririsan dengan butir `E-BK-b` (kualitas dan pelabelan data) pada tingkat rendah sampai sedang; irisan itu **tidak dihitung** sebagai pemenuhan CP.

Aturan jalur D yang berlaku: data hanya sintetis (karangan) atau terbuka dengan lisensi jelas, tanpa data yang bisa mengenali orang; wajah, suara, dan foto orang tidak dipakai sebagai data; AI generatif boleh dipakai dengan etika dan dicatat, tanpa data pribadi, kata sandi, atau tugas bernilai pada permintaanmu, dan kamu tidak wajib punya akun. Saran: jawab dulu sendiri, baru minta AI menjelaskan atau memberi petunjuk bertahap. Setiap soal `Latihan` bertanda `AI: boleh` atau `AI: tanpa AI`.

## Ingat kembali

Jawab dari ingatan, baru cek di bagian kunci.

1. Apa beda program berbasis aturan dan sistem yang belajar dari data? (dari `d-x1-m8`)
2. Sebutkan dua ciri kata sandi yang kuat. (dari `fondasi-keamanan-dasar`)
3. Kelompokkan sebagai masukan atau keluaran: pemindai kode batang, pengeras suara, layar sentuh. (dari `fondasi-komputer-dan-hardware`)

## Tujuan

Setelah modul ini kamu dapat:

- menjelaskan dataset, contoh (baris), fitur (kolom masukan), dan label (jawaban yang ingin ditebak);
- menandai data ganjil pada tabel sintetis: nilai mustahil, nilai kosong, baris ganda, dan label yang salah;
- menilai apakah sebuah dataset berat sebelah dan mengapa ketepatan tinggi bisa menyesatkan;
- menyebut kolom yang tidak boleh dikumpulkan karena memuat data pribadi;
- menyusun satu set 20 kartu benda berlabel dengan pedoman label yang jelas.

## Prediksi dulu

Tabel di bawah adalah catatan sensor ruang kelas **karangan** (sintetis). Kesepakatan karangan: suhu 28 derajat Celsius atau kurang berlabel `nyaman`, 29 atau lebih berlabel `panas`. Sebelum membaca penjelasan, tebak: dari 12 baris, berapa baris yang menurutmu bermasalah? Tandai di kertas dan tulis alasannya.

| No | Jam | Suhu (C) | Kelembapan (%) | Kondisi |
| --- | --- | --- | --- | --- |
| 1 | 07:00 | 24 | 70 | nyaman |
| 2 | 08:00 | 25 | 68 | nyaman |
| 3 | 09:00 | 27 | 65 | nyaman |
| 4 | 10:00 | 30 | 60 | panas |
| 5 | 11:00 | 450 | 58 | panas |
| 6 | 12:00 | 33 | 62 | panas |
| 7 | 13:00 | (kosong) | 59 | panas |
| 8 | 14:00 | 32 | 55 | panas |
| 9 | 14:00 | 32 | 55 | panas |
| 10 | 15:00 | 21 | 66 | panas |
| 11 | 16:00 | 28 | 140 | nyaman |
| 12 | 17:00 | 26 | 64 | nyaman |

## Contoh terselesaikan

Istilah dulu, memakai baris 1. Seluruh tabel disebut **dataset**. Satu baris adalah satu **contoh**. Kolom jam, suhu, dan kelembapan adalah **fitur**: keterangan yang dipakai untuk menebak. Kolom kondisi adalah **label**: jawaban yang benar untuk contoh itu. Model belajar dari pasangan fitur dan label, lalu menebak label contoh baru.

Pemeriksaan kualitas, baris demi baris:

| Baris | Masalah | Jenis |
| --- | --- | --- |
| 5 | suhu 450 derajat tidak mungkin di kelas; mungkin salah titik desimal (45,0) atau salah ketik | nilai mustahil |
| 7 | suhu kosong | nilai hilang |
| 9 | sama persis dengan baris 8 | baris ganda |
| 10 | suhu 21 berlabel `panas`, padahal aturan menyebut 28 atau kurang adalah `nyaman` | label salah |
| 11 | kelembapan 140 persen tidak mungkin (batas 100) | nilai mustahil |

Jadi ada **5 baris bermasalah dari 12**. Perbaikannya tidak otomatis menghapus: baris 5 mungkin bisa dibetulkan bila sumbernya diketahui, baris ganda dihapus satu, dan label salah dibetulkan sesuai aturan. Apa pun yang diubah dicatat, agar orang lain tahu data aslinya. Bila tidak bisa dibetulkan, baris dikeluarkan dan jumlah contoh turun menjadi lebih sedikit.

**Data berat sebelah.** Misalkan ada 100 catatan, 95 berlabel `nyaman` dan 5 `panas`. Aturan "selalu tebak nyaman" benar pada 95 persen, tetapi tidak pernah menemukan satu pun kondisi panas. Ketepatan tinggi tidak berarti model berguna bila kelasnya timpang.

**Kolom yang tidak boleh ada.** Fitur harus berguna dan aman. Nama, nomor telepon, alamat, dan penanda lain yang mengenali orang tidak dikumpulkan. Jalur D memakai data karangan atau terbuka, jadi kolom semacam itu memang tidak ada.

## Contoh setengah jadi

Tabel karangan berikut berisi kartu benda; label `alat tulis` atau `bukan`.

| No | Benda | Panjang (cm) | Ada ujung | Label |
| --- | --- | --- | --- | --- |
| 1 | pensil | 17 | ya | alat tulis |
| 2 | penggaris | 30 | tidak | alat tulis |
| 3 | botol | 22 | tidak | alat tulis |
| 4 | pulpen | 15 | ya | alat tulis |
| 5 | tas | -5 | tidak | bukan |
| 6 | pulpen | 15 | ya | alat tulis |

1. Fiturnya adalah ____ dan ____; labelnya adalah ____.
2. Baris ____ memuat nilai mustahil karena ____.
3. Baris ____ dan baris ____ adalah baris ganda.
4. Baris ____ kemungkinan label salah karena ____.

## Soal susun urutan

Ini versi tanpa kode dari soal Parsons: susun langkah acak menjadi urutan yang masuk akal untuk menyiapkan dataset berlabel.

```text
(a) simpan tabel bersih bersama catatan sumber dan perubahan
(b) tulis pertanyaan yang ingin dijawab dan pedoman memberi label
(c) periksa data ganjil: mustahil, kosong, ganda, label salah
(d) beri label pada tiap contoh sesuai pedoman
(e) kumpulkan contoh
```

## Latihan

1. **Istilah.** (`AI: tanpa AI`) Memakai tabel sensor di `Prediksi dulu`, tunjuk satu contoh, dua fitur, dan labelnya. Jelaskan dengan kata sendiri mengapa label disebut "jawaban yang benar".
2. **Dua puluh kartu benda.** (`AI: boleh`) Bersama kelompok, buat 20 kartu benda yang ada di ruang kelas atau digambar. Tiap kartu memuat nama benda, bahan, panjang kira-kira, dan label `alat tulis` atau `bukan`. Tulis dulu pedoman labelnya satu kalimat. Tukar set dengan kelompok lain dan cari dua kartu yang labelnya tidak mereka sepakati; ubah pedomanmu agar jelas.
3. **Kolom yang aman.** (`AI: tanpa AI`) Sebuah perpustakaan karangan ingin menebak apakah sore hari ramai atau sepi. Kolom yang ada: nama lengkap, nomor telepon, jam datang, jumlah buku dipinjam. Mana yang dipakai, mana yang tidak dikumpulkan, dan mengapa?
4. **Ketepatan yang menyesatkan.** (`AI: boleh`) Dari 100 catatan, 95 berlabel `nyaman`. Berapa persen ketepatan aturan "selalu nyaman"? Mengapa angka itu belum membuktikan model baik?
5. **Catatan pemakaian AI (opsional).** Bila memakai asisten AI, catat alat, tujuan, garis besar perintah, bagian yang dipakai, dan cara memeriksanya.

## Latihan bercampur

1. Pada penyaring pesan di `d-x1-m8`, mana yang fitur dan mana yang label? Beri satu contoh baris tabel pelatihannya.
2. Satu byte (8 bit) menyimpan nilai paling besar 255. Apakah suhu 450 muat dalam satu byte? Tulis 450 dalam biner dan hitung banyak bit yang dibutuhkan.
3. Bila tabel sensor di `Prediksi dulu` dibuka di lembar kerja dengan judul di baris 1 dan data di baris 2 sampai 13, kolom kondisi di kolom E, tulis rumus yang menghitung banyak baris `panas`, lalu hitung hasilnya.

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `d-x1-m10` (sekitar satu minggu lagi), modul `d-x1-m12` (sekitar tiga minggu lagi), dan modul jalur D kelas X semester 2 pada minggu `D-X2-M3` (sekitar delapan minggu lagi). Jawab sekarang lalu simpan.

1. Apa itu fitur dan apa itu label? Beri contoh.
2. Sebutkan empat jenis masalah kualitas data.
3. Kolom apa yang tidak boleh dikumpulkan karena memuat data pribadi, dan mengapa?

## Kesalahan umum

- **"Data banyak berarti data bersih."** Banyak baris bisa membawa banyak kesalahan; periksa kualitasnya.
- **"Label pasti benar."** Label dibuat manusia atau aturan dan bisa salah atau tidak sepakat; karena itu perlu pedoman label.
- **"Hapus saja semua baris ganjil."** Menghapus tanpa catatan bisa membuang kelompok yang jarang; catat dan pertimbangkan membetulkan.
- **"Ketepatan tinggi berarti model bagus."** Pada data timpang, tebakan mayoritas saja sudah tampak tinggi.
- **"Kolom nama membantu model."** Nama tidak berguna dan membahayakan privasi.

## Cek mandiri

- [ ] Saya dapat menunjuk contoh, fitur, dan label pada sebuah tabel.
- [ ] Saya dapat menandai nilai mustahil, kosong, baris ganda, dan label salah.
- [ ] Saya dapat menjelaskan mengapa data timpang menyesatkan ketepatan.
- [ ] Saya tahu kolom apa yang tidak boleh dikumpulkan.
- [ ] Saya dapat menulis pedoman label yang jelas.

## Kunci dan petunjuk

**Ingat kembali.** 1: aturan ditulis manusia; model menemukan pola dari data berlabel. 2: panjang, acak dan unik, berbeda di setiap akun, atau frasa sandi (dua di antaranya). 3: pemindai kode batang: masukan; pengeras suara: keluaran; layar sentuh: keduanya (masukan dan keluaran).

**Prediksi dulu.** Lihat tabel masalah di `Contoh terselesaikan`: 5 baris (5, 7, 9, 10, 11). Tebakan mendekati 5 sudah baik; yang penting alasan tiap tanda.

**Contoh setengah jadi.** 1: fitur panjang dan ada ujung; label `label` (alat tulis atau bukan); nama benda hanya keterangan. 2: baris 5; panjang tidak mungkin negatif. 3: baris 4 dan 6. 4: baris 3; botol bukan alat tulis.

**Soal susun urutan.** b, e, d, c, a. Pedoman label ditulis lebih dulu agar pelabelan konsisten; pemeriksaan dilakukan setelah semua contoh berlabel; hasil akhir disimpan dengan catatan.

**Latihan.** 1: contoh adalah satu baris; fitur dua dari jam, suhu, kelembapan; label kondisi; label adalah jawaban yang dipakai model sebagai acuan belajar. 2: nilai bergantung kelompok; periksa bahwa pedoman satu kalimat dan dua kartu sengketa sudah dijelaskan; contoh kartu sengketa: penghapus. 3: dipakai: jam datang, jumlah buku dipinjam; tidak dikumpulkan: nama lengkap, nomor telepon, karena data pribadi dan tidak diperlukan. 4: 95 persen; aturan itu tidak menemukan satu pun kondisi panas, jadi tidak berguna untuk tujuan menemukan yang panas. 5: opsional.

**Latihan bercampur.** 1: fitur: kata yang muncul di pesan; label: spam atau bukan; contoh baris: pesan "Klaim undian sekarang" berlabel spam. 2: 450 = 256 + 128 + 64 + 2 = `111000010` (9 bit); tidak muat dalam satu byte. 3: `=COUNTIF(E2:E13,"panas")` memberi 7 (baris 4, 5, 6, 7, 8, 9, 10).

**Ulang berjarak.** 1: fitur adalah keterangan masukan, label adalah jawaban yang ingin ditebak. 2: nilai mustahil, nilai hilang, baris ganda, label salah. 3: nama, nomor telepon, alamat; karena mengenali orang dan tidak diperlukan model.

## Langkah berikutnya

Modul berikut: `d-x1-m10` (klasifikasi tanpa komputer), tempat kartu berlabel dipakai untuk membuat aturan keputusan di kertas. Bacaan pendamping untuk menilai sumber dan klaim: `pendamping-periksa-fakta-dan-baca-lateral`.

## Rujukan

- Panduan Mata Pelajaran Informatika, Fase D – F, 2025. <https://repositori.kemendikdasmen.go.id/33634/1/32.%20Panduan%20Mata%20Pelajaran%20Informatika.pdf>
- Orange Data Mining: widget File (menjelaskan fitur, target, dan meta pada kolom data). <https://orangedatamining.com/widget-catalog/data/file/>
