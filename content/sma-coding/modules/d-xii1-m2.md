## Untuk siapa modul ini

Modul ini untuk murid kelas XII jalur D (kecerdasan buatan dan analisis data), untuk minggu `D-XII1-M2` silabus v1.3: studi kasus AI I, yaitu menimbang manfaat dan risiko dari sumber publik pada bidang kesehatan dan pendidikan, dengan keluaran catatan kasus. Prasyarat: modul `d-xii1-m1`. Alat: kertas, dan Python 3 saja (hanya pustaka standar) untuk satu hitungan; tanpa akun.

Modul ini karangan penyusun dan disetujui pemilik program pada 2026-11-20 (keputusan lewat dialog; catatan tinjauan menjadi tindak lanjut revisi). Jalur D adalah pengayaan di luar rumusan capaian pembelajaran (CP). Minggu ini tidak punya irisan pengayaan, jadi modul ini tidak dihitung memenuhi butir CP mana pun.

Aturan jalur D yang berlaku: data hanya sintetis (karangan) atau terbuka dengan lisensi jelas, tanpa data yang bisa mengenali orang; wajah, suara, dan foto orang tidak dipakai sebagai data; AI generatif boleh dipakai dengan etika dan dicatat, tanpa data pribadi, kata sandi, atau tugas bernilai pada permintaanmu, dan kamu tidak wajib punya akun. Saran: jawab dulu sendiri, baru minta AI memberi petunjuk bertahap; kode buatan AI dibaca, dijalankan, dan diuji. Setiap soal `Latihan` bertanda `AI: boleh` atau `AI: tanpa AI`.

Catatan untuk guru: dua kasus di modul ini karangan penyusun dan tidak menunjuk produk atau lembaga nyata; angkanya contoh hitung. Sumber publik yang dibaca murid (WHO dan UNESCO) dibuka penyusun pada 2026-11-19 sebatas halaman ringkasannya; modul tidak mengutip isi dokumen lengkapnya. Blok Python dijalankan penyusun dengan `python3 -I` (Python 3.14.6, per 2026-11) dan keluarannya ditempel apa adanya; yang dinyatakan hanya "bisa dijalankan dengan keluaran ini".

## Ingat kembali

Jawab dari ingatan, baru cek di bagian kunci.

1. Sebutkan tiga hal yang dilaporkan di samping ketepatan rata-rata sebuah model agar klaimnya bisa dinilai. (dari `d-xi2-m8`)
2. Apa tiga hal yang kamu tanyakan pada klaim "model ini 95 persen akurat" sebelum mempercayainya? (dari `d-xi2-m13`)
3. Apa empat bagian pernyataan masalah? (dari `d-xii1-m1`)

## Tujuan

Setelah modul ini kamu dapat:

- memakai lembar kasus lima pertanyaan untuk menimbang manfaat dan risiko sebuah sistem AI;
- menghitung mengapa klaim "sensitivitas dan spesifisitas 90 persen" tidak sama dengan "90 persen tandanya benar";
- menunjukkan bagaimana angka rata-rata menyembunyikan kelompok yang kurang terwakili;
- menulis catatan kasus yang menyebut manfaat, risiko, pengaman, dan batas kesimpulan.

Keluaran yang diminta silabus: catatan kasus.

## Prediksi dulu

Sebuah aplikasi fiktif memakai data karangan. Dari 1.000 pengguna, 5 persen (50 orang) sebenarnya perlu diperiksa. Aplikasi menandai 90 persen dari mereka yang perlu (sensitivitas) dan membebaskan 90 persen dari mereka yang tidak perlu (spesifisitas). Tebak dan tulis: dari semua orang yang ditandai, berapa persen yang memang perlu diperiksa? Pilih: sekitar 90, 60, atau 30 persen.

## Contoh terselesaikan

**Lembar kasus lima pertanyaan.** (1) Siapa yang diuntungkan, dan seberapa besar? (2) Siapa yang terkena bila tebakan salah, dan salah jenis apa yang lebih berat? (3) Diukur pada data apa, dibanding apa, dan siapa yang tidak terwakili? (4) Siapa yang memutuskan akhirnya, dan adakah jalur keberatan? (5) Data pribadi apa yang dipakai, dan dengan dasar apa?

**Kasus K (kesehatan, karangan): TandaSehat.** Aplikasi fiktif menerima jawaban kuesioner gejala, lalu menyarankan "periksa ke fasilitas kesehatan" atau "pantau di rumah". Pengembang menyatakan sensitivitas dan spesifisitas masing-masing 90 persen. Sensitivitas adalah bagian yang benar-benar perlu dan berhasil ditandai (sama dengan *recall*). Spesifisitas adalah bagian yang tidak perlu dan benar dibiarkan. Hitungannya:

```python
def skrining(n, prevalensi, sensitivitas, spesifisitas):
    sakit = round(n * prevalensi)
    sehat = n - sakit
    tp = round(sakit * sensitivitas)
    fn = sakit - tp
    tn = round(sehat * spesifisitas)
    fp = sehat - tn
    presisi = tp / (tp + fp)
    return tp, fn, fp, tn, presisi


for prevalensi in (0.05, 0.30):
    tp, fn, fp, tn, presisi = skrining(1000, prevalensi, 0.90, 0.90)
    print(f"prevalensi {prevalensi:.2f}: TP={tp} FN={fn} FP={fp} TN={tn} "
          f"tanda positif benar {presisi:.2f}")
```

```text
prevalensi 0.05: TP=45 FN=5 FP=95 TN=855 tanda positif benar 0.32
prevalensi 0.30: TP=270 FN=30 FP=70 TN=630 tanda positif benar 0.79
```

Pada prevalensi 5 persen, hanya 45 dari 140 tanda yang benar (sekitar 32 persen): angka "90 persen" yang sama memberi hasil sangat berbeda bila yang sakit jarang. Dua kesalahan itu berbeda dampaknya: tanda palsu (FP) membuat orang diperiksa tanpa perlu, murah tetapi menumpuk antrean; tanda yang terlewat (FN) membuat orang tenang padahal perlu diperiksa, lebih berat. Karena itu aplikasi hanya wajar sebagai penyaring awal, dengan petugas kesehatan yang memutuskan, dan datanya data kesehatan, yaitu data spesifik menurut `d-x2-m3` sehingga perlu dasar dan pengamanan lebih kuat.

**Kasus P (pendidikan, karangan): UmpanEsai.** Aplikasi fiktif memberi nilai 1 sampai 4 pada esai, dengan klaim "cocok dengan guru pada 80 persen esai". Tabel pengujian karangan:

| Kelompok esai | Jumlah di data uji | Cocok dengan guru | Persen |
| --- | --- | --- | --- |
| bahasa baku | 160 | 136 | 85 |
| campuran bahasa daerah | 40 | 24 | 60 |
| semua | 200 | 160 | 80 |

Rata-rata 80 persen menyembunyikan angka 60 persen pada kelompok kecil: pertanyaan 3 membongkarnya. Manfaatnya nyata (umpan balik cepat bagi banyak murid), risikonya juga: nilai yang tidak adil bagi penulis dengan bahasa campuran, dan tekanan menulis demi mesin. Pengamannya: nilai akhir tetap di guru, murid boleh menyanggah, dan angka dilaporkan per kelompok.

**Sumber publik.** Dua bacaan resmi sebagai pembanding cara menimbang: panduan WHO *Ethics and governance of artificial intelligence for health* (menyatakan etika dan hak asasi harus menjadi inti rancangan; halaman ringkasannya menyebut enam prinsip konsensus) dan panduan UNESCO *Guidance for generative AI in education and research* (menyoroti perlindungan privasi data dan batas usia untuk percakapan mandiri dengan AI generatif). Alamatnya ada di `Rujukan`.

## Contoh setengah jadi

Lengkapi `____` agar program menghitung tabel untuk 500 pengguna, prevalensi 10 persen, sensitivitas 80 persen, spesifisitas 90 persen. Pakai fungsi `skrining` di atas.

```python setengah-jadi
tp, fn, fp, tn, presisi = skrining(500, ____, 0.80, ____)
print(tp, fn, fp, tn, round(presisi, ____))
```

## Soal Parsons

Susun baris menjadi fungsi `presisi` yang mengembalikan bagian tanda yang benar, lalu mencetak hasil untuk TP = 45 dan FP = 95 dengan dua desimal. Lekukan dipakai; yang diacak hanya urutannya.

```text
print(round(presisi(45, 95), 2))
    return tp / (tp + fp)
def presisi(tp, fp):
```

## Latihan

1. **Baca dan timbang.** (`AI: boleh`) Baca halaman ringkasan WHO atau UNESCO (pilih satu), lalu isi lembar kasus lima pertanyaan untuk Kasus K atau Kasus P. Tulis juga satu kalimat tentang apa yang belum bisa kamu simpulkan.
2. **Ubah prevalensi.** (`AI: boleh`) Jalankan `skrining` untuk prevalensi 1, 10, dan 50 persen dengan sensitivitas dan spesifisitas 90 persen. Pada prevalensi berapa tanda positif lebih sering benar daripada salah?
3. **Kelompok kecil.** (`AI: tanpa AI`) Pada tabel UmpanEsai, bila kelompok campuran hanya 10 esai dan 6 cocok, apakah angka 60 persen cukup kuat? Apa yang kamu minta sebelum menyimpulkan?
4. **Dua kalimat jujur.** (`AI: tanpa AI`) Tulis satu manfaat dan satu risiko Kasus P tanpa kata "AI menggantikan guru" dan tanpa "AI pasti adil".
5. **Catatan pemakaian AI (opsional).** Catat alat, tujuan, garis besar perintah, bagian yang dipakai, dan cara memeriksanya. Jangan menaruh data pribadi apa pun pada permintaanmu.

## Latihan bercampur

1. Dari `d-xii1-m1`: tulis ukuran sukses yang dapat diuji untuk TandaSehat, dengan satu angka untuk sensitivitas dan satu untuk tanda positif benar.
2. Dari `d-x2-m2`: bagaimana tabel Kasus P menunjukkan ketidakadilan antarkelompok, dan apa satu langkah memperbaikinya?

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `d-xii1-m3` (sekitar satu minggu lagi), `d-xii1-m5` (sekitar tiga minggu lagi), dan `D-XII1-M10` (sekitar delapan minggu lagi). Jawab sekarang lalu simpan.

1. Mengapa "sensitivitas 90 persen dan spesifisitas 90 persen" belum memberi tahu seberapa sering tanda positif benar?
2. Sebutkan lima pertanyaan lembar kasus untuk menimbang manfaat dan risiko sebuah sistem AI.
3. Mengapa kelompok yang kurang terwakili di data uji membuat angka rata-rata menyesatkan?

## Kesalahan umum

- **"Akurasi 90 persen berarti 90 persen tandanya benar."** Itu bergantung pada seberapa sering kejadian yang dicari muncul.
- **"Semua kesalahan sama beratnya."** Tanda yang terlewat dan tanda palsu punya dampak berbeda; tentukan mana yang lebih berat sebelum memilih ukuran.
- **"Rata-rata tinggi berarti adil bagi semua."** Kelompok kecil bisa jauh lebih buruk dan tak terlihat.
- **"Sistem otomatis cukup, manusia tidak perlu."** Pada keputusan berdampak, manusia yang memutuskan akhir dan ada jalur keberatan.

## Cek mandiri

- [ ] Saya dapat memakai lembar kasus lima pertanyaan.
- [ ] Saya dapat menghitung proporsi tanda positif yang benar dari prevalensi, sensitivitas, dan spesifisitas.
- [ ] Saya dapat menunjukkan angka rata-rata yang menyembunyikan kelompok kecil.
- [ ] Saya dapat menulis catatan kasus dengan manfaat, risiko, pengaman, dan batas kesimpulan.
- [ ] Saya mencatat pemakaian AI bila saya memakainya.

## Kunci dan petunjuk

**Ingat kembali.** 1: misalnya sebaran antar lipatan atau `random_state`, perbandingan dengan pembanding sederhana, dan ukuran lain seperti presisi dan recall atau hasil per kelompok. 2: diukur pada data apa (data uji yang belum dilihat), dibanding apa (pembanding), dan seberapa pasti (jumlah data dan sebaran). 3: pengguna, keputusan yang dibantu, masukan, keluaran.

**Prediksi dulu.** Sekitar 30 persen (45 benar dari 140 tanda, yaitu 0,32). Dari 50 yang perlu, 45 ditandai; dari 950 yang tidak perlu, 95 salah ditandai.

**Contoh setengah jadi.** Isian: `0.10`, `0.90`, `2`.

```python
tp, fn, fp, tn, presisi = skrining(500, 0.10, 0.80, 0.90)
print(tp, fn, fp, tn, round(presisi, 2))
```

```text
40 10 45 405 0.47
```

**Soal Parsons.** Urutan benar:

```python
def presisi(tp, fp):
    return tp / (tp + fp)
print(round(presisi(45, 95), 2))
```

```text
0.32
```

**Latihan.** 1: rubrik: lima pertanyaan terjawab, ada FP dan FN yang dibedakan, ada kelompok yang tak terwakili, dan satu kalimat batas kesimpulan (mis. kasus karangan tidak membuktikan apa pun tentang aplikasi nyata). 2: gunakan `skrining` untuk 0,01, 0,10, 0,50. Pada 1 persen presisi sekitar 0,08; pada 10 persen sekitar 0,50; pada 50 persen sekitar 0,90; tanda lebih sering benar daripada salah hanya bila prevalensi di atas 10 persen (pada 10 persen: TP 90, FP 90, tepat seimbang; pada 50 persen: 450 dan 50). 3: tidak cukup kuat; 6 dari 10 bisa bergeser banyak karena satu atau dua esai; minta lebih banyak esai kelompok itu dan sebaran. 4: contoh: manfaat umpan balik cepat bagi banyak murid; risiko nilai kurang adil bagi bahasa campuran bila tidak dilaporkan per kelompok. 5: opsional.

**Latihan bercampur.** 1: contoh: sensitivitas sedikitnya 90 persen dan sedikitnya 50 persen tanda positif benar pada data uji kelompok yang sebaran prevalensinya dinyatakan. 2: kelompok campuran hanya cocok 60 persen dibanding 85; langkah: tambah data kelompok itu, laporkan per kelompok, dan guru memeriksa.

**Ulang berjarak.** 1: karena tanda positif benar bergantung pada seberapa sering kejadian itu muncul (prevalensi). 2: siapa untung, siapa terkena bila salah, diukur pada data apa dan siapa tak terwakili, siapa memutuskan akhir, data pribadi apa. 3: karena rata-rata didominasi kelompok besar sehingga kelompok kecil dengan hasil buruk tidak terlihat.

## Langkah berikutnya

Modul berikut: `d-xii1-m3` (studi kasus AI II), yang memakai lembar kasus yang sama pada transportasi, pertanian, dan budaya. Bacaan lanjut: ringkasan Rekomendasi Etika Kecerdasan Artifisial UNESCO (bacaan tambahan; bukan sumber isi modul).
