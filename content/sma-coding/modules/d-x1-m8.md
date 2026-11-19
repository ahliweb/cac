## Untuk siapa modul ini

Modul ini untuk murid kelas X jalur D (kecerdasan buatan dan analisis data), untuk minggu `D-X1-M8` silabus v1.3: apa itu AI dan apa yang bukan. Prasyarat: `FND-X1-M1` (model Input-Proses-Output) dan `FND-X1-M3` (representasi data). Tidak perlu memprogram dan tidak perlu akun. Semua kegiatan memakai kertas dan diskusi (*unplugged*); Orange baru dipakai mulai `D-X1-M11`.

Modul ini berstatus DRAF: karangan penyusun, belum ditinjau pemilik. Jalur D adalah pengayaan di luar rumusan capaian pembelajaran (CP), jadi modul ini tidak dihitung memenuhi butir CP mana pun, dan minggu ini tidak punya irisan pengayaan.

**Aturan jalur D yang berlaku di setiap modul:**

- Data yang dipakai hanya data sintetis (karangan) atau data terbuka yang jelas lisensinya. Tidak ada nama, kontak, atau data lain yang bisa mengenali orang.
- Wajah, suara, dan foto orang tidak dipakai sebagai data, termasuk pada alat AI.
- Memakai AI generatif untuk belajar itu bebas dengan etika: kamu bertanggung jawab atas karyamu, mencatat pemakaiannya, dan tidak menaruh data pribadi, kata sandi, atau tugas bernilai ke dalam permintaanmu. Guru memeriksa syarat usia dan ketentuan layanan lebih dulu, dan kamu tidak wajib punya akun. Asesmen minggu 14 tanpa AI.
- Saran: jawab dulu sendiri, baru minta AI menjelaskan atau memberi petunjuk bertahap, bukan jawaban jadi.

## Ingat kembali

Jawab dari ingatan, baru cek di modul fondasi (`fondasi-komputer-dan-hardware`, `fondasi-representasi-data`, `fondasi-keamanan-dasar`).

1. Sebutkan tiga bagian model Input-Proses-Output dan beri contoh pada mesin kasir.
2. Sebuah gambar hitam-putih tersusun dari kisi piksel. Bagaimana komputer menyimpan satu piksel hitam atau putih?
3. Tulis bilangan biner 1101 dalam desimal.
4. Sebutkan dua jenis informasi yang sebaiknya tidak kamu bagikan ke layanan daring.

## Tujuan

Setelah modul ini kamu dapat:

- membedakan program berbasis aturan yang ditulis manusia dari sistem yang belajar pola dari contoh data;
- menggambar diagram I-P-O untuk sebuah sistem AI;
- menyebut dua hal yang dapat dan dua hal yang tidak dapat dilakukan sistem AI pada tingkat SMA;
- menjelaskan mengapa keluaran sistem AI harus diperiksa sebelum dipercaya.

## Prediksi dulu

Sebuah penyaring pesan memakai satu aturan yang ditulis manusia: **bila pesan memuat kata "hadiah" atau "gratis", tandai sebagai spam.** Pesan di bawah seluruhnya karangan (sintetis). Tebak dulu: untuk tiap pesan, apakah penyaring menandainya spam? Tulis tebakanmu di kertas. Lalu tebak juga, apakah semua tandanya akan benar.

| No | Pesan | Sebenarnya |
| --- | --- | --- |
| 1 | Kamu menang hadiah, klik sekarang | spam |
| 2 | Rapat piket besok jam 10 | bukan spam |
| 3 | GRATIS pulsa untuk kamu | spam |
| 4 | Klaim undian sekarang, tanpa biaya | spam |
| 5 | Hadiah ulang tahun untuk adikku sudah kubungkus | bukan spam |
| 6 | Tugas kelompok dikumpulkan Jumat | bukan spam |

## Contoh terselesaikan

Terapkan aturan satu per satu (huruf besar atau kecil tidak membedakan):

| No | Memuat "hadiah" atau "gratis"? | Tanda penyaring | Sebenarnya | Benar? |
| --- | --- | --- | --- | --- |
| 1 | ya | spam | spam | ya |
| 2 | tidak | bukan spam | bukan spam | ya |
| 3 | ya | spam | spam | ya |
| 4 | tidak | bukan spam | spam | **tidak** (lolos) |
| 5 | ya | spam | bukan spam | **tidak** (salah tuduh) |
| 6 | tidak | bukan spam | bukan spam | ya |

Penyaring benar pada 4 dari 6 pesan. Ia hanya mengikuti aturan yang ditulis orang: pesan 4 lolos karena penulis aturan tidak menduga kata "klaim", dan pesan 5 salah ditandai karena aturan tidak memahami maksud kalimat. I-P-O-nya: masukan teks pesan, proses mencari kata dalam daftar aturan, keluaran tanda spam atau bukan spam.

**Sistem yang belajar dari data** punya I-P-O yang mirip, tetapi aturannya tidak ditulis tangan. Orang menyiapkan banyak contoh pesan berlabel (spam atau bukan), lalu sebuah metode menemukan pola sendiri. Hasilnya disebut **model**. Ilustrasi dengan angka sintetis, dari 10 contoh spam dan 10 contoh bukan spam:

| Kata | Muncul pada contoh spam | Muncul pada contoh bukan spam |
| --- | --- | --- |
| klaim | 8 | 0 |
| rapat | 0 | 6 |
| hadiah | 7 | 3 |

"Klaim" tampak kuat menandai spam; "hadiah" kurang kuat karena muncul juga pada pesan biasa. Model menghitung hal itu dari contoh. Tetapi **mutu model bergantung pada data**: contoh yang sedikit, berat sebelah, atau salah label membuat polanya keliru. Model tetap bisa salah, jadi keluarannya diperiksa, bukan langsung dipercaya.

## Contoh setengah jadi

Lengkapi bagian `____` memakai tabel kata di atas.

1. Dari 20 contoh, kata "hadiah" muncul pada 7 + 3 = ____ pesan. Dari pesan itu, ____ merupakan spam, jadi sekitar ____ persen pesan yang memuat "hadiah" adalah spam.
2. Isi diagram I-P-O sistem yang belajar: Masukan: ____. Proses: model menghitung seberapa mirip pesan dengan pola yang ia pelajari. Keluaran: ____.
3. Pesan baru memuat "klaim" dan "rapat". Menurutmu, ke mana model cenderung menandainya? Alasannya? ____

## Soal susun urutan

Ini versi tanpa kode dari soal Parsons: susun langkah acak menjadi urutan yang masuk akal untuk membangun sistem yang belajar.

```text
(a) pakai model pada pesan baru dan pantau kesalahannya
(b) latih model dengan data latih
(c) kumpulkan contoh pesan dan beri label
(d) uji model dengan data uji yang belum pernah dilihat
(e) bagi contoh menjadi data latih dan data uji
```

## Latihan

1. **Aturan atau belajar?** (`AI: boleh`) Untuk tiap sistem, tulis "aturan" bila dasarnya aturan tulisan manusia, atau "belajar" bila dasarnya pola dari data, atau "tidak yakin" dan beri alasan: kalkulator; lampu lalu lintas dengan pengatur waktu tetap; saran video berikutnya di aplikasi; pemeriksa PIN di mesin ATM; penerjemah otomatis; alarm jam; pengenal tulisan tangan.
2. **Gambar I-P-O.** (`AI: tanpa AI`) Sebuah sistem menebak jenis buah dari tabel ukuran dan warna (data karangan). Gambar diagram I-P-O-nya dan sebut satu data yang tidak boleh masuk tabel itu.
3. **Dua kalimat jujur.** (`AI: tanpa AI`) Jelaskan kepada teman apa yang dapat dan tidak dapat dilakukan AI. Hindari "AI berpikir seperti manusia".
4. **Telaah aplikasi fiktif.** (`AI: boleh`) Aplikasi karangan "Pintar-Kantin" mengaku "AI" dan menyarankan menu. Tulis tiga pertanyaan yang kamu ajukan untuk menilai apakah ia sungguh belajar dari data, dan satu cara memeriksa sarannya.
5. **Catatan pemakaian AI (opsional).** Bila memakai asisten AI, catat alat, tujuan, garis besar perintah, bagian yang dipakai, dan cara memeriksanya.

## Latihan bercampur

Soal ini memadukan modul fondasi dengan modul ini.

1. Gambar kecil 3 kali 3 piksel hitam-putih berbentuk tanda tambah: baris 1 `0 1 0`, baris 2 `1 1 1`, baris 3 `0 1 0` (1 = hitam). Tulis sembilan bit-nya berurutan dan bacalah sebagai satu bilangan biner. Mengapa sistem AI yang "melihat gambar" sebenarnya bekerja pada angka?
2. Untuk tiap data berikut, tulis boleh atau tidak dipakai sebagai data latih di jalur D, beserta alasannya: foto wajah teman sekelas; tabel suhu ruang karangan; rekaman suara kelas; kumpulan data terbuka yang lisensinya jelas.

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `d-x1-m9` (sekitar satu minggu lagi), modul `d-x1-m11` (sekitar tiga minggu lagi), dan modul jalur D kelas X semester 2 pada minggu `D-X2-M2` (sekitar delapan minggu lagi). Jawab sekarang lalu simpan.

1. Apa beda program berbasis aturan dan sistem yang belajar dari data?
2. Mengapa wajah dan suara orang tidak dipakai sebagai data latih di jalur ini?
3. Mengapa "lebih banyak contoh" belum tentu menjamin model yang adil dan benar?

## Kesalahan umum

- **"AI adalah robot pintar yang berpikir."** Sistem AI di kelas ini adalah model yang menghitung pola dari data; ia tidak memahami seperti manusia.
- **"Keluaran AI pasti benar."** Model bisa salah; nada yakin bukan bukti. Periksa dengan sumber lain.
- **"Semua yang canggih adalah AI."** Kalkulator dan lampu lalu lintas berpengatur waktu tetap mengikuti aturan tetap.
- **"Data banyak pasti bagus."** Data berat sebelah atau salah label menghasilkan model yang keliru.

## Cek mandiri

- [ ] Saya dapat membedakan sistem berbasis aturan dan sistem yang belajar dari data.
- [ ] Saya dapat menggambar diagram I-P-O untuk sistem AI.
- [ ] Saya dapat menyebut hal yang dapat dan tidak dapat dilakukan AI.
- [ ] Saya tahu data apa yang tidak boleh dipakai di jalur D.
- [ ] Saya mencatat pemakaian AI bila saya memakainya untuk tugas.

## Kunci dan petunjuk

**Ingat kembali.** 1: masukan, proses, keluaran; kasir: kode barang dipindai, hitung total, struk. 2: sebagai satu bit, misalnya 1 hitam dan 0 putih. 3: 1101 biner = 8 + 4 + 0 + 1 = 13. 4: misalnya kata sandi, nomor identitas, alamat, atau foto pribadi.

**Prediksi dulu.** Tanda penyaring: 1 spam, 2 bukan, 3 spam, 4 bukan, 5 spam, 6 bukan. Hasilnya benar pada 4 dari 6; pesan 4 lolos dan pesan 5 salah tuduh.

**Contoh setengah jadi.** 1: 10 pesan, 7 spam, sekitar 70 persen. 2: masukan teks pesan; keluaran tanda spam atau bukan spam. 3: cenderung spam karena "klaim" sangat kuat menandai spam, tetapi "rapat" menarik ke arah bukan spam; jawabannya tidak pasti dan itu alasan model diuji.

**Soal susun urutan.** c, e, b, d, a. Alasan: data berlabel dikumpulkan dulu, dibagi, dipakai melatih, diuji pada data yang belum dilihat, baru dipakai dan dipantau.

**Latihan.** 1: aturan: kalkulator, lampu lalu lintas berpengatur waktu tetap, pemeriksa PIN, alarm jam; belajar: saran video, penerjemah, pengenal tulisan tangan. Jawaban "tidak yakin" bernilai bila disertai alasan, mis. penerjemah tertentu mungkin memakai gabungan aturan dan model. 2: masukan ukuran dan warna; keluaran jenis buah; tidak boleh masuk tabel: data pribadi seperti nama pemilik kebun. 3: beberapa jawaban boleh, asal tidak mengaku AI berpikir atau memahami seperti manusia. 4: contoh pertanyaan: dari data apa ia belajar dan berapa banyak? Apakah ada contoh saran yang salah? Apakah saran berubah bila data berubah? Cara memeriksa: bandingkan sarannya dengan pilihan nyata sepuluh murid fiktif atau dengan aturan sederhana buatan sendiri; bila aturan sederhana sama baiknya, klaim "AI" patut dipertanyakan.

**Latihan bercampur.** 1: 010111010 biner = 128 + 32 + 16 + 8 + 2 = 186 desimal; komputer menyimpan gambar sebagai angka dan model bekerja pada angka. 2: foto wajah tidak; tabel suhu karangan boleh; rekaman suara tidak; data terbuka berlisensi jelas boleh.

**Ulang berjarak.** 1: aturan ditulis manusia; model menemukan pola dari data berlabel. 2: wajah dan suara mengenali orang dan peserta masih di bawah umur; aturan jalur D dan prinsip privasi melarangnya. 3: bila data berat sebelah atau salah label, model ikut keliru; jumlah saja tidak memperbaiki mutu.

## Langkah berikutnya

Modul berikut: `d-x1-m9` (data, fitur, dan label), yang memperlihatkan bagaimana tabel contoh disiapkan untuk model. Bacaan tambahan untuk guru atau murid yang berminat: kursus pengantar AI Elements of AI, kursus daring gratis dalam bahasa Inggris (per 2026-11 daftar negaranya tidak memuat Indonesia; syarat akun tidak diperiksa penyusun).

## Rujukan

- Panduan Mata Pelajaran Informatika, Fase D – F, 2025. <https://repositori.kemendikdasmen.go.id/33634/1/32.%20Panduan%20Mata%20Pelajaran%20Informatika.pdf>
- Elements of AI, MinnaLearn dan University of Helsinki (bacaan tambahan; bukan sumber isi modul). <https://www.elementsofai.com/>
