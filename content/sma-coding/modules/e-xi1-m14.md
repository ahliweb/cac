## Untuk siapa modul ini

Modul ini untuk murid kelas XI jalur E (komputasi kuantum), minggu `E-XI1-M14` silabus v1.4: asesmen dan refleksi semester 1. Prasyarat: modul `e-xi1-m12` dan seluruh materi semester ini; modul ini menilai semuanya. Alat: kertas, kalkulator, Quirk (peramban, tanpa akun), dan simulatormu dari `e-xi1-m10` dan `e-xi1-m11`.

Modul ini berstatus DRAF: karangan penyusun, belum ditinjau pemilik. Jalur E adalah pengayaan di luar rumusan capaian pembelajaran (CP), dan asesmen ini tidak dihitung sebagai pemenuhan butir CP. Asesmen ini **tanpa AI**: jangan memakai AI generatif saat mengerjakannya (silabus 7.4). Bobot nilai dan predikat mengikuti kebijakan sekolah `[belum terverifikasi]`; modul ini hanya memberi soal, rubrik singkat, dan kunci.

Murid tanpa dasar pemrograman mengerjakan soal 1 sampai 7 dan melewati soal 8 (praktik kode) dengan menghitung harapan dan simpangannya dengan tangan.

Catatan untuk guru: Quirk (versi 2.3, per 2026-11-19) dibuka penyusun lewat peramban tanpa antarmuka; penyusun melihat `Chance` "Off" pada sirkuit X, H, Z, H di soal 7. Qiskit dan layanan cloud tidak dipakai di modul ini.

## Ingat kembali

Ini inti asesmen: jawab dari ingatan, tanpa melihat catatan, lalu cocokkan dengan kunci. Soal 1 dari `e-xi1-m1`, soal 2 dari `e-xi1-m6`, soal 3 dari `e-xi1-m11`, soal 4 dari `e-xi1-m12`, soal 5 dari `e-xi1-m13`.

1. Sebutkan satu hal yang dijanjikan komputasi kuantum dan satu hal yang bukan.
2. Apakah amplitudo negatif membuat peluang negatif? Jelaskan.
3. Mengapa pembangkit bilangan acak dengan benih tetap menghasilkan keluaran yang sama setiap dijalankan, dan apa artinya bagi keacakan simulasi?
4. Bagaimana memeriksa bahwa vektor empat komponen beramplitudo real dapat difaktorkan menjadi dua qubit?
5. Mengapa uji frekuensi yang lolos belum membuktikan bahwa bit-bit itu acak sejati?

## Tujuan

Kemampuan yang dinilai (selaras silabus bagian 7.1, minggu M1 sampai M13):

- menghitung dengan vektor, matriks, dan aturan Born untuk satu dan dua qubit;
- menelusuri sirkuit satu qubit beserta interferensinya;
- membandingkan hasil shot dengan peluang tangan memakai simpangan wajar;
- menyampaikan batas klaim sebuah simulasi dengan jujur.

Keluaran: uji tulis dan praktik; jurnal.

## Latihan bercampur

Kerjakan tanpa AI; tulis langkahmu.

1. **Matriks.** Hitung `H X` dan `X H`, dengan `H = h [[1, 1], [1, -1]]`, `h` = 0,7071, dan `X = [[0, 1], [1, 0]]`. Apakah sama? Apa artinya bagi urutan gerbang?
2. **Keadaan sah.** Tentukan `c` agar `(5c, 12c)` menjadi keadaan sah, lalu hitung peluang membaca 0 dan 1.
3. **Gerbang dan Born.** Hitung H pada `(0,6 ; -0,8)` dan peluang kedua hasil.
4. **Shot.** Keadaan hasil soal 3 dibaca 400 shot. Berapa hasil 1 yang diharapkan dan simpangan wajarnya? Bila sebuah simulator melaporkan 380 hasil 1, apa kesimpulanmu?
5. **Dua qubit.** Hitung `(0,6 ; 0,8)` tensor `(0, 1)`, sebutkan peluang `01` dan `11`, lalu periksa dengan `ad = bc` apakah vektor `(0,5 ; 0,5 ; 0,5 ; -0,5)` dapat difaktorkan.
6. **Telusuri.** Telusuri sirkuit X, H, Z, H pada `|0>`: tulis keadaan setelah tiap gerbang dan peluang membaca 1. Di langkah mana ada interferensi dan jenis apa?
7. **Quirk.** Prediksi `Chance` untuk sirkuit soal 6, lalu bangun di [Quirk](https://algassert.com/quirk#circuit=%7B%22cols%22:%5B%5B%22X%22%5D,%5B%22H%22%5D,%5B%22Z%22%5D,%5B%22H%22%5D%5D%7D) dan bandingkan.
8. **Praktik kode.** Ubah simulatormu dari `e-xi1-m11` agar menyimulasikan keadaan soal 3 dengan 400 shot. Tulis prediksimu dulu, lalu hasilnya dan seberapa jauh dari harapan dalam satuan simpangan.

## Refleksi

Tulis sendiri, tidak diserahkan ke repositori maupun dibagikan: (1) apa yang sudah kamu kuasai di semester ini dan bagaimana buktinya; (2) apa yang masih keliru atau membingungkan, dan soal mana yang menunjukkannya; (3) rencana belajarmu sebelum `E-XI2-M1` (satu hal yang diulang, satu yang dicoba baru); (4) satu klaim populer tentang komputasi kuantum yang sekarang kamu nilai lebih hati-hati, dan mengapa.

## Cek mandiri

- [ ] Saya dapat menghitung gerbang, aturan Born, dan hasil kali tensor dengan tangan.
- [ ] Saya dapat menelusuri sirkuit satu qubit dan menjelaskan interferensinya.
- [ ] Saya dapat membandingkan hasil shot dengan peluang memakai simpangan wajar.
- [ ] Saya dapat menyebut batas klaim sebuah simulasi.
- [ ] Saya sudah menulis refleksiku sendiri.

## Kunci dan petunjuk

**Ingat kembali.** 1: dijanjikan algoritma khusus yang lebih hemat langkah untuk masalah tertentu; bukan: semua program lebih cepat atau semua jawaban dicoba sekaligus. 2: tidak; peluang adalah kuadrat amplitudo sehingga tanda hilang; tanda baru berpengaruh saat amplitudo dijumlahkan oleh gerbang (interferensi). 3: deretan ditentukan benih, jadi benih sama memberi deretan sama; artinya simulasi tampak acak tetapi bisa diulang dan ditebak, bukan keacakan sejati. 4: untuk `(a, b, c, d)` uji `a*d = b*c`; bila sama, baris kedua kelipatan baris pertama dan vektor adalah produk. 5: lolos uji frekuensi hanya satu sifat; pembangkit semu dengan benih tetap menghasilkan deretan yang dapat diulang dan ditebak.

**Latihan bercampur.**

1. `H X = h [[1, 1], [-1, 1]]` dan `X H = h [[1, -1], [1, 1]]`; tidak sama, jadi urutan gerbang penting.
2. Jumlah kuadrat `25c^2 + 144c^2 = 169c^2 = 1`, sehingga `c = 1/13` (atau `-1/13`). Keadaan `(0,3846 ; 0,9231)`; P(0) = 25/169, kira-kira 0,1479, dan P(1) = 144/169, kira-kira 0,8521.
3. `((0,6 - 0,8)h ; (0,6 + 0,8)h) = (-0,1414 ; 0,9899)`; P(0) = 0,02 dan P(1) = 0,98.
4. Harapan 400 x 0,98 = 392; simpangan akar(400 x 0,98 x 0,02) = akar 7,84 = 2,8. Hasil 380 berselisih 12, kira-kira 4,3 simpangan: sangat jarang; curigai kode atau peluang yang salah hitung.
5. `(0,6 x 0 ; 0,6 x 1 ; 0,8 x 0 ; 0,8 x 1) = (0 ; 0,6 ; 0 ; 0,8)`; P(01) = 0,36 dan P(11) = 0,64 (jumlah 1). Untuk `(0,5 ; 0,5 ; 0,5 ; -0,5)`: `ad = -0,25`, `bc = 0,25`; tidak sama, jadi tidak dapat difaktorkan.
6. X: `(0, 1)`; H: `(0,7071 ; -0,7071)`; Z: `(0,7071 ; 0,7071)`; H: `(1 ; 0)`. Peluang membaca 1 adalah 0. Interferensi ada di langkah H terakhir: komponen kedua `(0,7071 - 0,7071) x 0,7071 = 0` saling menghapus (destruktif) dan komponen pertama menguat (konstruktif).
7. Prediksi: P(1) = 0, jadi `Chance` kabel pertama "Off"; penyusun melihat "Off" di Quirk.
8. Hasil bergantung benih dan kodenya. Dengan benih 12345 pada simulator `e-xi1-m11` penyusun memperoleh 12 hasil 0 dan 388 hasil 1: harapan 8 dan 392, selisih 4, kira-kira 1,4 simpangan: wajar.

**Rubrik singkat** (usulan, bukan kebijakan sekolah): benar bila hitungan benar dan langkah tertulis; setengah bila langkah benar tetapi ada salah hitung; kosong bila hanya jawaban akhir tanpa langkah. Pada soal 4, 6, dan 8 nilai juga kejujuran batas klaim.

**Refleksi.** Tidak ada kunci; refleksi adalah milikmu. Guru boleh bertanya apakah refleksi sudah ditulis tanpa meminta membacanya.

## Langkah berikutnya

Modul berikut: `e-xi2-m1` (gerbang dua qubit: CNOT), semester 2. Bacaan pendamping: `e-xi1-m12` (hasil kali tensor) dan `e-xi1-m9` (interferensi).
