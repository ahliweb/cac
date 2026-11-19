## Untuk siapa modul ini

Modul ini untuk murid kelas XII jalur E (komputasi kuantum), minggu `E-XII2-M13` silabus v1.4: cadangan terstruktur untuk menutup celah materi, dengan keluaran ringkasan dan latihan pilihan kelompok. Prasyarat: modul `e-xii1-m14`; modul `e-xii2-m5` (etika dan hype) belum terindeks, jadi guru memeriksanya. Modul ini tidak memuat materi baru dan tidak memerlukan pemrograman; murid berkode boleh memeriksa hitungannya dengan simulatornya sendiri. Alat: kertas dan kalkulator. Kerja minggu ini satu pertemuan tinjauan, dikerjakan perorangan lalu berkelompok.

Modul ini berstatus DRAF: karangan penyusun, belum ditinjau pemilik. Jalur E adalah pengayaan di luar rumusan CP; minggu ini tanpa irisan pengayaan, jadi modul ini tidak dihitung memenuhi butir CP mana pun.

Aturan AI jalur ini: AI generatif boleh dipakai dengan etika dan dicatat, tanpa data pribadi, kata sandi, atau tugas bernilai pada permintaanmu, dan tanpa akun wajib. Saran: jawab dulu sendiri, baru minta petunjuk bertahap. Setiap soal `Latihan` bertanda `AI: boleh` atau `AI: tanpa AI`.

Catatan untuk guru: minggu ini adalah cadangan, jadi guru boleh menukar kelompok topik dengan celah yang tampak di kelas. Alasan memakai uji diri tanpa catatan, bukan membaca ulang, ada di riset kognitif repositori (bagian 3.1, 3.2, dan 3.12). Angka contoh dihitung penyusun; derau baca pada sirkuit Bell sama dengan soal `e-xii1-m14`. Dua rujukan indeks (Preskill, arXiv:1801.00862; Bennett dkk., arXiv:quant-ph/9701001) dibaca ringkasannya per tanggal akses 2026-11-19 untuk pertanyaan hype.

## Ingat kembali

Jawab dari ingatan, baru cek di bagian kunci.

1. Beri dua contoh tanda hype dalam artikel populer tentang komputasi kuantum. (dari `e-xii2-m5`)
2. Mengapa mengoptimalkan sebelum ada uji hijau berbahaya, dan apa yang menjaga agar optimasi tidak mengubah hasil? (dari `e-xii2-m10`)
3. Mengapa kalimat "sudah terbukti" perlu diganti pada slide hasil simulasi, dan dengan apa? (dari `e-xii2-m11`)
4. Berkas apa saja yang wajib ada di portofolio, dan jenis berkas apa yang tidak boleh? (dari `e-xii2-m12`)
5. Mengapa nama pekerjaan cloud asli dan tangkapan layar akun tidak boleh diarsipkan? (dari `e-xii2-m12`)

## Tujuan

Setelah modul ini kamu dapat:

- memetakan celah belajarmu dengan uji diri tanpa catatan pada lima kelompok topik semester;
- memilih satu kelompok dan menyusun ringkasan satu halaman dengan satu soal beserta kunci hitung tangan;
- menjadwalkan ulang soal yang keliru dengan jarak waktu, bukan membaca ulang semuanya;
- menilai ringkasan sejawat dengan umpan balik yang berisi.

Keluaran yang diminta silabus: ringkasan.

## Prediksi dulu

Sirkuit Bell (`H`, lalu `CNOT`) dibaca 1000 shot, tetapi tiap qubit salah terbaca dengan peluang `r = 0,03` secara bebas. Tebak dan tulis: (1) kira-kira berapa dari 1000 shot memberi hasil `01` atau `10` (yang mustahil pada simulator ideal); (2) kira-kira berapa memberi `00`.

## Contoh terselesaikan

**Lima kelompok topik.** (A) histogram, shot, dan simpangan wajar; (B) derau dan mitigasi; (C) Grover dan hitungan impas; (D) keamanan informasi; (E) klaim, hype, dan etika. Tiap murid menjawab satu soal per kelompok dari ingatan, mengecek kunci, dan menandai yang keliru. Kelompok dengan tanda keliru terbanyak dipilih.

**Contoh ringkasan untuk kelompok B** (karangan penyusun). *Satu soal:* pada sirkuit Bell dengan kesalahan baca bebas `r = 0,03` per qubit, berapa peluang tiap hasil dan berapa hasil terlarang dari 1000 shot? *Hitungan tangan:* tiap qubit benar dengan peluang `0,97` dan salah dengan `0,03`. Bila hasil ideal `00` (peluang 0,5): terbaca `00` dengan `0,97 x 0,97` = 0,9409, `01` dan `10` masing-masing `0,97 x 0,03` = 0,0291, `11` dengan `0,03 x 0,03` = 0,0009; hasil ideal `11` simetris. Jadi `P(00)` = `0,5 x 0,9409 + 0,5 x 0,0009` = 0,4709, `P(11)` sama, `P(01)` = `P(10)` = 0,0291. Hasil terlarang: `2 x 0,0291` = 0,0582, kira-kira 58 dari 1000 shot, dengan simpangan wajar `akar(1000 x 0,0291 x 0,9709)` = 5,3 untuk tiap hasil. *Batas:* ini model baca saja; tanpa derau gerbang, tanpa perangkat nyata. *Satu pertanyaan penguji:* bila terlihat 150 hasil terlarang, apa yang kamu periksa lebih dulu (model derau lain, kesalahan gerbang, benih)?

**Ingat dengan jarak.** Soal yang keliru dijawab lagi besok dan beberapa hari kemudian, bukan dibaca ulang berkali-kali dalam satu sesi.

## Contoh setengah jadi

Lengkapi (kunci di bagian akhir). Sebuah simulator memberi hasil benar pada 95 dari 400 shot; peluang yang dihitung tangan 0,2.

1. Harapan: `400 x 0,2` = ____. 
2. Simpangan wajar: `akar(400 x 0,2 x 0,8)` = ____.
3. Rentang tiga simpangan: ____ sampai ____; `z = (95 - 80) / ____` = ____. Wajar atau diselidiki?

## Soal susun urutan

Susun langkah berikut (sudah diacak) menjadi urutan menutup satu celah belajar.

```text
(a) Tukar ringkasan dengan kelompok lain dan minta mereka menjawab dari ingatan.
(b) Pilih kelompok topik dengan tanda keliru terbanyak.
(c) Jawab satu soal per kelompok dari ingatan, tanpa catatan.
(d) Jadwalkan ulang soal yang masih keliru beberapa hari kemudian.
(e) Tulis ringkasan satu halaman dengan satu soal dan kunci hitung tangan.
(f) Cek jawaban dengan kunci dan tandai yang keliru.
```

## Latihan

1. **Peta celah.** (`AI: tanpa AI`) Tulis satu soal untuk tiap kelompok A sampai E, jawab dari ingatan, cek kunci, dan tandai. Tulis kelompok yang kamu pilih.
2. **Hitung.** (`AI: tanpa AI`) Ulangi hitungan contoh dengan `r = 0,05`: peluang `01`, hasil terlarang per 1000 shot, dan simpangan wajarnya.
3. **Ringkasan.** (`AI: boleh`) Tulis ringkasan satu halaman untuk kelompokmu dengan format contoh. AI hanya boleh dipakai untuk mencari lubang pada soalmu; kunci kamu hitung sendiri.
4. **Uji sejawat.** (`AI: tanpa AI`) Tukar ringkasan dengan kelompok lain dan jawab soal mereka dari ingatan. Beri satu yang baik, satu yang perlu diperbaiki, satu langkah berikutnya.
5. **Jadwal ulang.** (`AI: tanpa AI`) Pilih satu soal yang keliru dan jawab lagi tiga hari kemudian; catat hasilnya sebagai satu kalimat.

## Latihan bercampur

1. Pada model impas Grover, berapa bit ruang kunci pada `c = 10^4`? (`e-xii2-m5`)
2. Berapa memori vektor keadaan 28 qubit bila tiap amplitudo 8 byte? (`e-xii1-m4`)

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `e-xii2-m14` (satu minggu lagi). Jawab sekarang lalu simpan.

1. Mengapa menjawab dari ingatan sebelum membuka kunci lebih berguna daripada membaca ulang catatan?

## Kesalahan umum

- **"Membaca ulang catatan itu belajar."** Terasa lancar, tetapi tidak menguji apa yang bisa kamu ingat; jawab dulu dari ingatan.
- **"Tinjauan berarti mengulang semuanya."** Pilih kelompok dengan celah terbesar; sisanya cukup diuji singkat.
- **"Ringkasan berarti menyalin materi."** Ringkasan memuat satu soal dan kunci hitung tangan, bukan salinan.
- **"Kunci boleh dari AI."** Kunci kamu hitung sendiri; AI hanya mencari lubang.
- **"Benar sekali berarti sudah dikuasai."** Jawab lagi setelah beberapa hari.

## Cek mandiri

- [ ] Saya sudah menandai celahku pada lima kelompok topik.
- [ ] Saya dapat menyusun ringkasan satu halaman dengan satu soal dan kunci.
- [ ] Saya sudah menjadwalkan ulang soal yang keliru.
- [ ] Saya dapat menjelaskan mengapa uji diri lebih baik daripada membaca ulang.

## Kunci dan petunjuk

**Ingat kembali.** 1: contoh: "komputer kuantum mencoba semua jawaban sekaligus" atau "ribuan kali lebih cepat untuk segala hal" tanpa pembanding, tanpa sumber, atau tanpa menyebut simulasi atau perangkat nyata; "semua enkripsi akan runtuh tahun depan"; hasil dari satu percobaan dianggap terbukti. 2: perubahan tanpa pembanding tidak dapat dibuktikan benar; uji regresi terhadap versi lama menjaga hasil, dan tiap langkah hanya satu perubahan. 3: uji hanya mencakup kasus yang diuji; ganti dengan "cocok dengan hitungan tangan pada kasus ..., dalam batas ...". 4: wajib `README.md`, `log-sprint.md`, `log-ai.md`, `uji/hasil-uji.txt`, `kode/`; terlarang `.env`, kunci, tangkapan layar akun. 5: label itu dapat mengaitkan pekerjaan dengan akun lembaga, dan tangkapan layar dapat memuat nama atau token.

**Prediksi dulu.** (1) kira-kira 58 (`2 x 0,03 x 0,97 x 1000`). (2) kira-kira 471. Hitungan lengkap ada di contoh terselesaikan.

**Contoh setengah jadi.** 1: 80. 2: 8. 3: 56 sampai 104; `z = (95 - 80) / 8` = 1,875, masih dalam tiga simpangan, jadi wajar, tetapi dekat batas dua simpangan; ulangi dengan benih lain bila hasil serupa muncul berulang.

**Soal susun urutan.** c, f, b, e, a, d.

**Latihan.** 1: tidak ada jawaban tunggal; kunci tiap soalmu dihitung sendiri. 2: `P(01)` = `0,95 x 0,05` = 0,0475; terlarang `2 x 0,0475` = 0,095, yaitu 95 dari 1000; simpangan `akar(1000 x 0,095 x 0,905)` = 9,27. 3 sampai 5: tidak ada jawaban tunggal; pemeriksa memastikan soal bisa dijawab dari ingatan dan kuncinya benar.

**Latihan bercampur.** 1: `2 x log2(10^4 x pi / 2)` = 27,9 bit. 2: `2^28 x 8` byte = 2 GiB.

**Ulang berjarak.** 1: mencoba mengingat memperkuat ingatan dan memperlihatkan celah, sedangkan membaca ulang terasa lancar tanpa menguji; bukti uji diri ada di riset kognitif repositori (3.1).

## Langkah berikutnya

Modul berikut: `e-xii2-m14` (asesmen dan refleksi semester 2). Bacaan pendamping: `e-xii2-m5` dan `e-xii2-m1`.
