## Untuk siapa modul ini

Modul ini untuk murid kelas X jalur D (kecerdasan buatan dan analisis data), untuk minggu `D-X2-M1` silabus v1.3: dari data ke keputusan; ulasan. Prasyarat: modul `d-x1-m12` (model pertama dan pembagian data latih dan uji). Kegiatan utamanya memakai kertas dan tabel; Orange hanya dipakai untuk memeriksa sebuah hitungan, dan bagian itu bisa dilewati.

Modul ini karangan penyusun dan disetujui pemilik program pada 2026-11-20 (keputusan lewat dialog; catatan tinjauan menjadi tindak lanjut revisi). Jalur D adalah pengayaan di luar rumusan capaian pembelajaran (CP). Minggu ini beririsan dengan butir `E-BK-b` (kualitas dan pelabelan data) pada tingkat rendah sampai sedang; irisan itu **tidak dihitung** sebagai pemenuhan CP.

Aturan jalur D yang berlaku: data hanya sintetis (karangan) atau terbuka dengan lisensi jelas, tanpa data yang bisa mengenali orang; wajah, suara, dan foto orang tidak dipakai sebagai data; AI generatif boleh dipakai dengan etika dan dicatat, tanpa data pribadi, kata sandi, atau tugas bernilai pada permintaanmu, dan kamu tidak wajib punya akun. Saran: jawab dulu sendiri, baru minta AI menjelaskan atau memberi petunjuk bertahap. Setiap soal `Latihan` bertanda `AI: boleh` atau `AI: tanpa AI`.

Catatan untuk guru: angka di modul ini dihitung penyusun dengan pustaka Orange 3.41.0 memakai pengaturan bawaan widget Tree (per 2026-11). Antarmuka grafis tidak dijalankan penyusun, jadi tampilan dan letak tombol `[belum terverifikasi]`; angkanya bisa berbeda bila versi atau pengaturan lab berbeda.

## Ingat kembali

Jawab dari ingatan, baru cek di bagian kunci.

1. Mengapa menilai model pada data latih menyesatkan? (dari `d-x1-m12`)
2. Sebutkan alur dari data sampai keputusan: data, model, evaluasi, keputusan. (dari `d-x1-m12`)
3. Sebutkan empat jenis masalah kualitas data. (dari `d-x1-m9`)
4. Sebutkan dua ciri kata sandi yang kuat. (dari `fondasi-keamanan-dasar`)

## Tujuan

Setelah modul ini kamu dapat:

- menguraikan alur data, model, evaluasi, dan keputusan serta menyebut satu hal yang diperiksa pada tiap tahap;
- membaca sebuah laporan model dan mengenali tanda model yang salah: diuji pada data yang dipakai melatih, ketepatan sama dengan tebakan mayoritas, dan kejadian langka tidak pernah tertangkap;
- menghitung ketepatan, tebakan mayoritas, dan banyaknya kejadian langka yang tertangkap dari sebuah tabel;
- menulis alur satu halaman untuk sebuah model beserta keputusan yang masuk akal.

Keluaran yang diminta silabus: alur satu halaman.

## Prediksi dulu

Dataset karangan `sungai.csv` (di bagian berikut) mencatat 30 pagi di sebuah sungai fiktif. Fitur: `curah_mm` (hujan 24 jam sebelumnya) dan `tinggi_cm` (tinggi air pagi itu). Label `status`: `aman` atau `waspada`. Sebuah laporan fiktif berbunyi: "Model Pasti-Aman: ketepatan 0,90 pada 30 baris. Kesimpulan: model siap dipakai untuk memutuskan kapan warga diberi peringatan."

Sebelum membaca lebih jauh, tebak dan tulis: (1) model seperti apa yang bisa memperoleh 0,90 pada data ini tanpa memahami apa pun tentang hujan atau air, (2) dari hari waspada yang ada, berapa yang akan tertangkap model itu, dan (3) apakah kamu mau memakainya untuk memberi peringatan.

## Contoh terselesaikan

Berikut data karangan itu; angkanya dibuat penyusun dengan program, bukan pengukuran nyata, dan bebas dipakai.

```text
curah_mm,tinggi_cm,c#status
150,120,aman
80,100,aman
10,200,aman
120,270,waspada
20,100,aman
50,70,aman
80,240,waspada
150,180,aman
0,170,aman
70,110,aman
20,220,aman
80,140,aman
30,180,aman
0,180,aman
90,90,aman
40,130,aman
80,160,aman
100,130,aman
0,100,aman
70,220,aman
110,90,aman
20,90,aman
100,150,aman
120,110,aman
10,110,aman
60,190,aman
50,80,aman
40,60,aman
0,140,aman
80,290,waspada
```

Telaah laporan itu dengan alur data, model, evaluasi, keputusan. Satu pertanyaan pemeriksa untuk tiap tahap:

| Tahap | Pertanyaan pemeriksa | Pada laporan ini |
| --- | --- | --- |
| Data | Dari mana data, berapa baris, apa labelnya, seberapa seimbang? | 30 baris, karangan; 27 `aman` dan hanya 3 `waspada` |
| Model | Apa yang sebenarnya dilakukan model? | "Pasti-Aman" selalu menjawab `aman` |
| Evaluasi | Diuji pada data apa, dan dibandingkan dengan apa? | diuji pada 30 baris yang sama; benar 27 dari 30 = 0,90, **persis sama** dengan tebakan mayoritas |
| Keputusan | Apa yang terjadi bila model salah? | 0 dari 3 hari `waspada` tertangkap; warga tidak pernah diberi peringatan |

Tebakan mayoritas adalah aturan yang selalu menjawab label yang paling banyak. Pustaka Orange memberi 0,900 untuk pembelajar mayoritas pada data ini, cocok dengan hitungan tangan. Jadi angka 0,90 tidak menunjukkan bahwa model belajar sesuatu. Keputusannya: laporan ini **ditolak**, karena model tidak menangkap satu pun hari `waspada`.

Sebagai perbandingan, Tree dengan pengaturan bawaan dilatih pada baris 1 sampai 20 dan diuji pada baris 21 sampai 30: ketepatan latih 1,000 dan uji 1,000. Pohonnya hanya satu pertanyaan: `tinggi_cm <= 220` berarti `aman`, selain itu `waspada`. Tetapi baris uji hanya memuat satu hari `waspada` (baris 30), jadi bukti ini masih tipis: yang diuji hanya satu kejadian langka.

## Contoh setengah jadi

Telaah laporan kedua yang juga fiktif: sebuah sistem memeriksa 20 komponen uji, 16 `normal` dan 4 `rusak`. Model menjawab benar pada 17 komponen, dan laporan menyebut "ketepatan 0,85".

1. Ketepatan = ____ dari 20 = ____.
2. Tebakan mayoritas (selalu `normal`) benar pada ____ dari 20 = ____.
3. Selisih model dengan tebakan mayoritas ____ poin persen, yaitu ____ komponen.
4. Karena model benar 17 dan semua yang `normal` benar, komponen `rusak` yang tertangkap ada ____ dari 4.
5. Keputusan yang masuk akal dan alasannya: ____

## Soal susun urutan

Ini versi tanpa kode dari soal Parsons: susun langkah acak menjadi urutan menelaah sebuah laporan model.

```text
(a) hitung tebakan mayoritas dan bandingkan dengan ketepatan yang dilaporkan
(b) baca apa yang dilaporkan: dari mana data, dan diuji pada data apa
(c) hitung berapa kejadian langka yang tertangkap
(d) tulis keputusan (pakai, perbaiki, atau tolak) beserta alasannya
(e) gambar alur data, model, evaluasi, keputusan dan tandai tahap yang bermasalah
```

## Latihan

1. **Alur satu halaman.** (`AI: boleh`) Pilih proyek kedai fiktif di `d-x1-m13` dan tulis alurnya dalam satu halaman: untuk tiap tahap tulis satu pertanyaan pemeriksa dan jawabannya.
2. **Telaah laporan.** (`AI: tanpa AI`) Laporan: "ketepatan 0,96 pada 25 baris; baris yang sama dipakai melatih dan menguji; 24 baris `normal` dan 1 `rusak`." Tulis semua yang janggal dan hitung tebakan mayoritasnya.
3. **Hanya tiga kejadian.** (`AI: tanpa AI`) Mengapa hasil yang baik pada satu hari `waspada` di data uji `sungai.csv` belum cukup untuk memercayai pohon itu?
4. **Perbaikan.** (`AI: boleh`) Sebutkan dua hal yang kamu minta dari pembuat laporan "Pasti-Aman" supaya laporannya bisa dinilai.
5. **Catatan pemakaian AI (opsional).** Bila memakai asisten AI, catat alat, tujuan, garis besar perintah, bagian yang dipakai, dan cara memeriksanya.

## Latihan bercampur

1. Dari `d-x1-m9`: jenis masalah kualitas data mana yang akan terlihat bila ada baris `tinggi_cm` bernilai -40?
2. Dari `d-x1-m10`: sebuah aturan benar pada 8 dari 10 kartu uji. Berapa ketepatannya?
3. Dari `d-x1-m12`: mengapa data uji tidak boleh ikut dipakai melatih?

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `d-x2-m2` (sekitar satu minggu lagi), `d-x2-m4` (sekitar tiga minggu lagi), dan `d-x2-m9` (sekitar delapan minggu lagi). Jawab sekarang lalu simpan.

1. Apa empat tahap alur dari data sampai keputusan, dan apa yang diperiksa di tiap tahap?
2. Mengapa ketepatan 0,90 belum cukup untuk memercayai sebuah model?
3. Apa itu tebakan mayoritas dan mengapa dipakai sebagai pembanding?

## Kesalahan umum

- **"Ketepatan tinggi berarti model bagus."** Bandingkan dengan tebakan mayoritas; pada data yang timpang, model yang tidak belajar apa pun bisa tinggi.
- **"Model dinilai dari seberapa sering ia benar."** Lihat juga kejadian yang paling penting: berapa yang langka dan berbahaya benar-benar tertangkap.
- **"Satu hasil bagus di data uji cukup."** Bila hanya satu kejadian langka ada di data uji, satu baris menentukan segalanya.
- **"Keputusan mengikuti angka secara otomatis."** Keputusan memperhitungkan akibat salah; manusia yang memutuskan dan bertanggung jawab.
- **"Model yang salah itu rusak programnya."** Sering programnya jalan; yang bermasalah data, cara menguji, atau pembandingnya.

## Cek mandiri

- [ ] Saya dapat menyebut empat tahap alur dari data sampai keputusan.
- [ ] Saya selalu menghitung tebakan mayoritas sebelum memuji sebuah ketepatan.
- [ ] Saya memeriksa berapa kejadian langka yang tertangkap.
- [ ] Saya memeriksa pada data apa model diuji.
- [ ] Saya mencatat pemakaian AI bila saya memakainya.

## Kunci dan petunjuk

**Ingat kembali.** 1: model sudah melihat jawabannya di data latih, jadi hasilnya terlalu bagus. 2: data diolah menjadi model, model dievaluasi pada data uji, hasil dipakai untuk memutuskan, dan keputusan diperiksa. 3: nilai mustahil, nilai hilang, baris ganda, label salah. 4: contoh: panjang (frasa sandi), unik untuk tiap akun, tidak memuat data pribadi, ditambah autentikasi dua langkah.

**Prediksi dulu.** Tebakan bebas; hasil penyusun: model yang selalu menjawab `aman` mendapat 27 dari 30 = 0,90 dan menangkap 0 dari 3 hari `waspada`; memakainya untuk peringatan berbahaya.

**Contoh setengah jadi.** 1: 17 dari 20 = 0,85. 2: 16 dari 20 = 0,80. 3: 5 poin persen, yaitu 1 komponen. 4: 1 dari 4. 5: contoh: tolak atau perbaiki, karena tiga dari empat komponen `rusak` lolos dan selisihnya dari tebakan mayoritas hanya satu komponen.

**Soal susun urutan.** b, a, c, e, d. Mulai dari apa yang sebenarnya dilaporkan, hitung pembanding, hitung kejadian langka, petakan ke alur, lalu putuskan.

**Latihan.** 1: rubrik: empat tahap lengkap, tiap tahap punya pertanyaan yang bisa dijawab dari data, mis. data: berapa baris, apakah `penjualan` seimbang; evaluasi: diuji pada baris uji dan dibandingkan tebakan mayoritas; keputusan: apa akibat salah menebak `sepi` atau `laris`. 2: janggal: diuji pada data yang sama dengan pelatihan; 0,96 sama dengan tebakan mayoritas (24 dari 25 = 0,96); hanya satu baris `rusak`, jadi tidak ada bukti bahwa model menangkapnya. 3: satu baris menentukan seluruh kesimpulan tentang kejadian langka, dan kebetulan mudah terjadi. 4: contoh: laporkan berapa hari `waspada` tertangkap; uji pada data yang tidak dipakai melatih dan bandingkan dengan tebakan mayoritas. 5: opsional.

**Latihan bercampur.** 1: nilai mustahil (tinggi air tidak bisa negatif). 2: 8 dari 10 = 0,80. 3: agar ketepatan tidak berlebihan; data uji yang ikut melatih sudah dilihat model.

**Ulang berjarak.** 1: data, model, evaluasi, keputusan; periksa asal dan keseimbangan data, apa yang dilakukan model, data uji dan pembanding, serta akibat bila salah. 2: karena tebakan mayoritas pada data timpang bisa mencapai angka yang sama tanpa belajar apa pun. 3: aturan yang selalu menjawab label terbanyak; model harus lebih baik dari itu agar terbukti belajar.

## Langkah berikutnya

Modul berikut: `d-x2-m2` (bias dan keadilan), yang mengajak kamu melihat siapa yang dirugikan ketika model salah. Bacaan pendamping: `d-x1-m13` untuk laporan hasil model.
