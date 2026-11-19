## Untuk siapa modul ini

Modul ini untuk murid kelas X jalur D (kecerdasan buatan dan analisis data), untuk minggu `D-X2-M8` silabus v1.3: pengelompokan tanpa label. Prasyarat: modul `d-x1-m12` (model pertama); gagasan jarak dan matriks kebingungan dari `d-x2-m6` dan `d-x2-m7` dipakai di teks. Alat: kertas; Orange Data Mining (widget k-Means) untuk memeriksa, tanpa pemrograman dan tanpa akun.

Modul ini berstatus DRAF: karangan penyusun, belum ditinjau pemilik. Jalur D adalah pengayaan di luar rumusan capaian pembelajaran (CP); minggu ini tidak punya irisan pengayaan, jadi modul ini tidak dihitung memenuhi butir CP mana pun.

Aturan jalur D yang berlaku: data hanya sintetis (karangan) atau terbuka dengan lisensi jelas, tanpa data yang bisa mengenali orang; wajah, suara, dan foto orang tidak dipakai sebagai data; AI generatif boleh dipakai dengan etika dan dicatat, tanpa data pribadi, kata sandi, atau tugas bernilai pada permintaanmu, dan kamu tidak wajib punya akun. Saran: jawab dulu sendiri, baru minta AI menjelaskan atau memberi petunjuk bertahap. Setiap soal `Latihan` bertanda `AI: boleh` atau `AI: tanpa AI`.

Catatan untuk guru: angka dihitung penyusun dengan pustaka Orange 3.41.0 (`Orange.clustering.KMeans`, k-means++, 10 kali jalan, `random_state` 0) dan skor siluet dengan `silhouette_score` scikit-learn 1.7.1 (per 2026-11). Pengaturan menormalkan kolom pada widget di lab `[belum terverifikasi]` (antarmuka grafis tidak dijalankan penyusun), jadi tabel melaporkan data mentah dan dinormalkan; skor di widget bisa sedikit berbeda.

## Ingat kembali

Jawab dari ingatan, baru cek di bagian kunci.

1. Bagaimana membaca matriks kebingungan: baris, kolom, dan diagonal? (dari `d-x2-m7`)
2. Apa itu galat (MAE atau RMSE) dan bagaimana menghitungnya dari selisih? (dari `d-x2-m5`)
3. Bagaimana kNN menentukan titik mana yang "dekat"? (dari `d-x2-m6`)
4. Apa beda fitur dan label? (dari `d-x1-m9`)

## Tujuan

Setelah modul ini kamu dapat:

- membedakan pengelompokan (tanpa label) dari klasifikasi (dengan label);
- menjalankan k-means dengan tangan: tetapkan titik ke pusat terdekat, hitung pusat baru, ulangi sampai tidak berubah;
- memilih jumlah kelompok k dengan skor siluet dan memeriksa kemantapan hasilnya;
- menafsirkan kelompok dan menyebut apa yang tidak boleh disimpulkan darinya.

Keluaran yang diminta silabus: alur pengelompokan.

## Prediksi dulu

Pada klasifikasi, model belajar dari label. Pada **pengelompokan**, tidak ada label: komputer hanya mengelompokkan contoh yang mirip. Dataset karangan `kerang.csv` memuat 15 kerang fiktif; `panjang_mm` dan `berat_g` angka karangan, tanpa kolom label.

```text
panjang_mm,berat_g
66,7.3
66,8.5
43,5.0
47,4.7
62,7.9
28,2.1
43,4.2
64,7.6
31,1.9
28,2.1
48,3.8
29,2.5
63,7.2
25,2.0
50,5.2
```

Sebelum menghitung apa pun, tebak dan tulis: (1) berapa kelompok alami yang kamu lihat, (2) berapa kerang di tiap kelompok, dan (3) bila komputer dipaksa membuat dua kelompok, kerang mana yang akan digabung.

## Contoh terselesaikan

**Bagian 1: k-means di kertas.** K-means mengulang tiga langkah: tetapkan tiap titik ke pusat terdekat, hitung pusat baru sebagai rata-rata anggota, ulangi sampai penetapan tidak berubah. Di kertas cukup bandingkan **jarak kuadrat** (selisih x dikuadratkan ditambah selisih y dikuadratkan); urutannya sama dengan urutan jarak Euclid. Delapan titik karangan, k = 2, dengan dua pusat awal sengaja berdekatan, (1, 1) dan (2, 1):

| Titik | Koordinat | Jarak² ke pusat 1 | Jarak² ke pusat 2 | Masuk |
| --- | --- | --- | --- | --- |
| A | (1, 1) | 0 | 1 | 1 |
| B | (2, 1) | 1 | 0 | 2 |
| C | (1, 3) | 4 | 5 | 1 |
| D | (2, 4) | 10 | 9 | 2 |
| E | (6, 5) | 41 | 32 | 2 |
| F | (7, 6) | 61 | 50 | 2 |
| G | (8, 5) | 65 | 52 | 2 |
| H | (7, 8) | 85 | 74 | 2 |

Pusat baru: kelompok 1 beranggota A dan C, jadi (1, 2); kelompok 2 beranggota B, D, E, F, G, H, jadi x = (2+2+6+7+8+7)/6 = 5,33 dan y = (1+4+5+6+5+8)/6 = 4,83. Iterasi 2 dengan pusat (1, 2) dan (5,33; 4,83): A, B, C, D lebih dekat ke pusat 1 (B: jarak² 2 berbanding 25,8), E, F, G, H ke pusat 2; pusat baru (1,5; 2,25) dan (7; 6). Iterasi 3 tidak mengubah penetapan, jadi **berhenti**: {A, B, C, D} dan {E, F, G, H}.

**Bagian 2: `kerang.csv` dengan Orange.** Skor siluet membandingkan jarak rata-rata ke kelompok sendiri dengan jarak ke kelompok lain; makin tinggi makin baik (dokumentasi widget k-Means). Dihitung penyusun:

| k | Siluet (data mentah) | Siluet (dinormalkan) | Ukuran kelompok (mentah) |
| --- | --- | --- | --- |
| 2 | 0,576 | 0,653 | 7 dan 8 |
| 3 | **0,821** | **0,795** | 5, 5, 5 |
| 4 | 0,784 | 0,629 | 2, 3, 5, 5 |
| 5 | 0,662 | 0,487 | 1, 2, 3, 4, 5 |

k = 3 terbaik pada kedua cara. Ringkasan tiga kelompok (data mentah, k = 3):

| Kelompok | Jumlah | Panjang (rata-rata, rentang) | Berat (rata-rata, rentang) |
| --- | --- | --- | --- |
| kecil | 5 | 28,2 (25 sampai 31) | 2,12 (1,9 sampai 2,5) |
| sedang | 5 | 46,2 (43 sampai 50) | 4,58 (3,8 sampai 5,2) |
| besar | 5 | 64,2 (62 sampai 66) | 7,70 (7,2 sampai 8,5) |

Dua catatan. **Pertama**, nama "kecil, sedang, besar" kita yang menempelkan; komputer hanya memberi nomor, dan "jenis kerang" **tidak** terbukti: kita hanya melihat tiga ukuran. **Kedua**, hasil bergantung pada pusat awal: dengan k = 3 dan satu kali jalan berpusat acak, 9 dari 10 percobaan (benih 0 sampai 9) menghasilkan kelompok 5, 5, 5 (siluet 0,821), tetapi satu terjebak pada 2, 3, 10 (siluet 0,499). Karena itu k-means dijalankan beberapa kali dan siluet terbaik dipilih.

## Contoh setengah jadi

Enam titik karangan: P1 (2, 1), P2 (3, 2), P3 (2, 3), P4 (9, 8), P5 (8, 9), P6 (9, 10). k = 2, pusat awal (2, 1) dan (3, 2).

1. Iterasi 1: P1 jatuh ke pusat ____; P2 sampai P6 ke pusat ____. Pusat baru 1 = (____, ____); pusat baru 2 = (____, ____), rata-rata dari ____ titik.
2. Iterasi 2: P1, P2, P3 jatuh ke pusat ____; P4, P5, P6 ke pusat ____. Pusat baru 1 = (____, ____); pusat baru 2 = (____, ____).
3. Iterasi 3: penetapan berubah atau tidak? ____. Jadi algoritma ____.
4. Mengapa {P1, P2, P3} dan {P4, P5, P6} masuk akal bila kamu menggambarnya? ____

## Soal susun urutan

Soal Parsons tanpa kode: susun langkah acak menjadi alur pengelompokan.

```text
(a) tafsirkan kelompok: ringkas, beri nama sementara, tulis yang belum bisa disimpulkan
(b) siapkan data tanpa label dan periksa skala fitur
(c) jalankan beberapa kali dan ambil hasil dengan siluet terbaik
(d) coba beberapa nilai k dan catat skor siluet serta ukuran kelompok
(e) tetapkan titik ke pusat terdekat, hitung pusat baru, ulangi sampai tidak berubah
```

## Latihan

1. **K-means di kertas.** (`AI: tanpa AI`) Titik (1, 5), (2, 4), (3, 6), (8, 1), (9, 2), (8, 3); k = 2, pusat awal (1, 5) dan (3, 6). Tulis penetapan dan pusat baru tiap iterasi sampai berhenti.
2. **Membaca siluet.** (`AI: tanpa AI`) Pada data yang dinormalkan di tabel contoh, pilih k dan jelaskan mengapa k = 2 dan k = 5 kurang baik.
3. **Dengan Orange.** (`AI: boleh`) Muat `kerang.csv`, sambungkan ke k-Means, coba k dari 2 sampai 5, catat siluet dan ukuran kelompok, lalu lihat di Scatter Plot yang diwarnai menurut kelompok. Bila angkamu beda dari tabel, periksa pilihan menormalkan dan inisialisasi.
4. **Alur pengelompokan.** (`AI: boleh`) Tulis satu halaman: data, k dan alasannya, ringkasan kelompok, dan tiga hal yang tidak boleh disimpulkan.
5. **Catatan pemakaian AI (opsional).** Bila memakai asisten AI, catat alat, tujuan, garis besar perintah, bagian yang dipakai, dan cara memeriksanya.

## Latihan bercampur

1. Dari `d-x2-m6`: kNN dan k-means sama-sama memakai jarak. Apa perbedaan data yang dibutuhkan keduanya?
2. Dari `d-x2-m7`: mengapa kamu tidak bisa menghitung ketepatan atau matriks kebingungan langsung dari hasil k-means pada `kerang.csv`?
3. Dari `d-x2-m6`: `panjang_mm` berkisar 25 sampai 66 dan `berat_g` 1,9 sampai 8,5. Fitur mana yang menguasai jarak mentah, dan apa yang dapat dilakukan?

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `d-x2-m9` (sekitar satu minggu lagi), `d-x2-m11` (sekitar tiga minggu lagi), dan `D-XI2-M1` (pengelompokan dengan Python, kelas XI semester 2). Jawab sekarang lalu simpan.

1. Apa beda pengelompokan dan klasifikasi, dan data apa yang dibutuhkan masing-masing?
2. Mengapa hasil k-means bisa berbeda tiap dijalankan, dan bagaimana mengurangi pengaruhnya?
3. Sebutkan langkah k-means: pusat awal, penetapan, pusat baru, dan kapan berhenti.

## Kesalahan umum

- **"Komputer menemukan jenis yang sebenarnya."** Kelompok hanya ringkasan kemiripan menurut fitur yang dipilih; namanya kita yang memberi.
- **"Data menentukan jumlah kelompok k."** k dipilih manusia; siluet membantu, bukan satu-satunya dasar.
- **"Satu kali jalan cukup."** Pusat awal acak dapat menjebak hasil; jalankan beberapa kali.
- **"Skala fitur tidak penting."** Fitur berskala besar menguasai jarak mentah; normalkan.

## Cek mandiri

- [ ] Saya dapat menjelaskan beda pengelompokan dan klasifikasi.
- [ ] Saya dapat menjalankan k-means di kertas sampai berhenti.
- [ ] Saya dapat memilih k dengan siluet dan memeriksa kemantapannya.
- [ ] Saya menafsirkan kelompok tanpa mengklaim jenis yang sebenarnya.
- [ ] Saya mencatat pemakaian AI bila saya memakainya.

## Kunci dan petunjuk

**Ingat kembali.** 1: baris adalah kelas sebenarnya, kolom kelas tebakan, diagonal adalah tebakan yang benar. 2: galat adalah selisih antara nilai tebakan dan nilai sebenarnya; MAE adalah rata-rata selisih mutlak, RMSE adalah akar rata-rata selisih kuadrat. 3: lewat jarak (Euclid) ke titik-titik latih; yang terdekat disebut tetangga. 4: fitur adalah ciri yang menjadi masukan; label adalah jawaban yang ingin ditebak.

**Prediksi dulu.** Tebakan bebas; hasil penyusun: tiga kelompok alami berukuran 5, 5, 5 (panjang sekitar 28, 46, dan 64 mm). Dengan k = 2 pada data mentah, data dibagi 7 dan 8: kelompok sedang terpecah, dua kerang (panjang 43 dan 43) bergabung ke kelompok kecil dan tiga (47, 48, 50) ke kelompok besar. Pada data yang dinormalkan, kelima kerang sedang semuanya bergabung ke kelompok kecil (10 dan 5). Jadi pembagian dua kelompok berubah menurut skala.

**Contoh setengah jadi.** 1: P1 ke pusat 1; P2 sampai P6 ke pusat 2. Pusat baru 1 = (2, 1); pusat baru 2 = (6,2; 6,4), dari 5 titik: x = (3+2+9+8+9)/5, y = (2+3+8+9+10)/5. 2: P1, P2, P3 ke pusat 1; P4, P5, P6 ke pusat 2. Pusat baru 1 = (2,33; 2) dan 2 = (8,67; 9). 3: tidak berubah; algoritma berhenti. 4: karena tiga titik pertama saling dekat di sekitar (2, 2) dan tiga titik terakhir di sekitar (9, 9), jauh dari yang pertama.

**Soal susun urutan.** b, e, d, c, a.

**Latihan.** 1: iterasi 1: jarak² ke pusat 1 dan pusat 2 untuk keenam titik berturut-turut adalah (0 dan 5), (2 dan 5), (5 dan 0), (65 dan 50), (73 dan 52), (53 dan 34); jadi (1, 5) dan (2, 4) ke pusat 1, empat titik lainnya ke pusat 2. Pusat baru (1,5; 4,5) dan (7; 3). Iterasi 2: tiga titik pertama ke pusat 1, tiga terakhir ke pusat 2; pusat baru (2; 5) dan (8,33; 2). Iterasi 3 tidak berubah: berhenti dengan {(1, 5), (2, 4), (3, 6)} dan {(8, 1), (9, 2), (8, 3)}. 2: k = 3 terbaik (0,795). k = 2 menggabungkan dua kelompok alami sehingga ukuran 5 dan 10; k = 5 memecah kelompok alami menjadi bagian kecil dan siluetnya turun menjadi 0,487; ukuran kelompok dan arti hasil ikut dipertimbangkan. 3: bila berbeda, periksa pilihan menormalkan, inisialisasi, dan jumlah percobaan. 4: contoh: data tanpa label, k = 3 karena siluet tertinggi dan tiga ukuran masuk akal, tiga kelompok kecil, sedang, dan besar; tidak boleh disimpulkan jenis kerang, sebab, atau bahwa data nyata akan sama. 5: opsional.

**Latihan bercampur.** 1: kNN butuh data berlabel untuk mencari tetangga lalu memilih label; k-means tidak butuh label. 2: karena tidak ada kelas sebenarnya untuk dibandingkan dengan tebakan; kelompok hanya bernomor. 3: `panjang_mm` menguasai karena selisihnya jauh lebih besar; normalkan fitur lebih dulu (kurangi rata-rata, bagi simpangan baku).

**Ulang berjarak.** 1: pengelompokan tidak butuh label dan hanya menghimpun yang mirip; klasifikasi butuh label dan menebak label titik baru. 2: karena pusat awal acak dapat berakhir di kelompok yang berbeda; jalankan beberapa kali dan pilih siluet terbaik. 3: pilih pusat awal, tetapkan tiap titik ke pusat terdekat, hitung pusat baru dari rata-rata anggota, ulangi; berhenti ketika penetapan tidak berubah.

## Langkah berikutnya

Modul berikut: `d-x2-m9` (visualisasi untuk bercerita), tempat kamu memilih grafik yang jujur. Bacaan pendamping: `matkom-himpunan-relasi-fungsi` untuk gagasan himpunan dan hubungan.

## Rujukan

- Orange Data Mining: widget k-Means. <https://orangedatamining.com/widget-catalog/unsupervised/kmeans/>
- Orange Data Mining: widget Hierarchical Clustering (pengelompokan alternatif, bacaan tambahan). <https://orangedatamining.com/widget-catalog/unsupervised/hierarchicalclustering/>
- Panduan Mata Pelajaran Informatika, Fase D – F, 2025. <https://repositori.kemendikdasmen.go.id/33634/1/32.%20Panduan%20Mata%20Pelajaran%20Informatika.pdf>
