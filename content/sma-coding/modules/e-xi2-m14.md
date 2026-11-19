## Untuk siapa modul ini

Modul ini untuk murid kelas XI jalur E (komputasi kuantum), minggu `E-XI2-M14` silabus v1.4: asesmen dan refleksi semester 2. Prasyarat: modul `e-xi2-m12` dan seluruh materi semester ini; modul ini menilai semuanya. Alat: kertas, kalkulator, dan simulatormu dari `e-xi2-m4` bila ingin memeriksa.

Modul ini berstatus DRAF: karangan penyusun, belum ditinjau pemilik. Jalur E adalah pengayaan di luar rumusan capaian pembelajaran (CP), dan asesmen ini tidak dihitung sebagai pemenuhan butir CP. Asesmen ini **tanpa AI**: jangan memakai AI generatif saat mengerjakannya (silabus 7.4). Bobot nilai dan predikat mengikuti kebijakan sekolah `[belum terverifikasi]`; modul ini hanya memberi soal, rubrik singkat, dan kunci. Murid tanpa dasar pemrograman mengerjakan soal dengan tangan dan kalkulator saja.

Catatan untuk guru: soal memakai angka yang dihitung ulang penyusun dengan Python 3 murni (tanpa akun); Qiskit dan layanan cloud tidak dipakai. Soal 6 dan 7 bersandar pada modul `e-xi2-m8`, `e-xi2-m9`, `e-xi2-m11`, dan `e-xi2-m12`, yang masih berstatus DRAF.

## Ingat kembali

Ini inti asesmen: jawab dari ingatan, tanpa melihat catatan, lalu cocokkan dengan kunci. Soal 1 dari `e-xi2-m7`, soal 2 dari `e-xi2-m2`, soal 3 dari `e-xi2-m6`, soal 4 dari `e-xi2-m11`, soal 5 dari `e-xi2-m13`.

1. Apa yang dipindahkan dan apa yang dikirim lewat kanal klasik pada teleportasi?
2. Bagaimana memeriksa bahwa vektor dua qubit tidak dapat difaktorkan? Beri contoh angka.
3. Tuliskan efek Toffoli pada `(a, b, 0)` dan jelaskan mengapa itu menghitung AND.
4. Apa yang dihitung hitungan "satu query lawan dua" pada algoritma Deutsch, dan apa yang tidak dibuktikannya tentang kecepatan komputer?
5. Apa tiga hal yang kamu cek sebelum mempercayai hasil simulasi proyekmu?

## Tujuan

Kemampuan yang dinilai (selaras silabus bagian 7.1, minggu M1 sampai M13):

- menghitung dengan vektor dan matriks untuk dua dan tiga qubit, termasuk memori `2^n`;
- menelusuri sirkuit Bell, teleportasi, dan Deutsch serta membaca hasilnya;
- menghitung peluang dan jumlah query, dan membandingkan hasil shot dengan simpangan wajar;
- menyampaikan batas klaim tentang simulasi dan keunggulan kuantum dengan jujur.

Keluaran: uji tulis dan praktik; jurnal.

## Latihan bercampur

Kerjakan tanpa AI; tulis langkahmu.

1. **Bell.** Dari `|00>`, tulis vektor setelah H pada qubit pertama dan setelah CNOT. Berapa peluang tiap hasil, dan berapa simpangan wajar hasil `00` pada 1000 shot?
2. **Terjerat atau produk.** Periksa `(0,36 ; 0,48 ; 0,48 ; 0,64)` dan `(0 ; 0,6 ; 0,8 ; 0)`.
3. **Memori.** Berapa MiB untuk vektor 26 qubit dengan 8 byte per amplitudo, dan berapa bila 16 byte?
4. **Toffoli.** Tulis keluaran untuk `(1, 1, 0)` dan `(1, 0, 0)`. Bila bit ketiga dimulai dari 1, gerbang klasik apa yang dihitung bit ketiga?
5. **Teleportasi.** Qubit yang dikirim `(0,8 ; 0,6)` dan hasil Alice `11`. Tulis keadaan Bob sebelum koreksi, gerbang koreksinya, dan hasilnya.
6. **Simulasi dan keamanan.** (a) Simulasi 10000 putaran CHSH dengan strategi klasik terbaik melaporkan 7900 kemenangan. Hitung harapan dan simpangan, lalu nilai laporan itu. (b) Pada 400 bit tersaring dengan penyadap yang membaca lalu mengirim ulang, berapa bit tidak cocok yang diharapkan dan berapa simpangannya?
7. **Deutsch dan Deutsch-Jozsa.** Telusuri Deutsch untuk `f(0) = 1`, `f(1) = 0` dan tulis kesimpulannya. Hitung `P(000)` untuk Deutsch-Jozsa n = 3 dengan `f = 00110011`. Berapa pemasangan oracle kuantum dan berapa query klasik pasti benar terburuk? Bila simulatormu tersedia, periksa dengannya (praktik).
8. **Klaim kritis.** Sebuah berita menulis bahwa komputer kuantum menyelesaikan Deutsch-Jozsa seketika karena mencoba semua jawaban sekaligus. Nilai klaim itu dalam tiga kalimat.

## Refleksi

Tulis sendiri, tidak diserahkan ke repositori maupun dibagikan: (1) apa yang sudah kamu kuasai di semester ini dan bagaimana buktinya; (2) apa yang masih keliru atau membingungkan, dan soal mana yang menunjukkannya; (3) rencana belajarmu sebelum `E-XII1-M1` (satu hal yang diulang, satu yang dicoba baru); (4) satu klaim populer tentang komputasi kuantum yang sekarang kamu nilai lebih hati-hati, dan mengapa.

## Cek mandiri

- [ ] Saya dapat menelusuri sirkuit Bell dan teleportasi dengan tangan.
- [ ] Saya dapat memeriksa keterjeratan, memori `2^n`, dan Toffoli.
- [ ] Saya dapat menelusuri algoritma Deutsch dan membaca hasil Deutsch-Jozsa.
- [ ] Saya dapat menilai hasil simulasi dengan simpangan wajar dan menyebut batas klaimnya.
- [ ] Saya sudah menulis refleksiku sendiri.

## Kunci dan petunjuk

**Ingat kembali.** 1: yang dipindahkan informasi kuantum keadaan qubit (bukan materi); yang dikirim lewat kanal klasik dua bit hasil bacaan Alice; keadaan Alice sendiri hilang karena dibaca. 2: untuk `(a, b, c, d)` hitung `a*d` dan `b*c`; bila tidak sama, vektor tidak dapat difaktorkan; contoh `(h, 0, 0, h)`: `a*d` = 0,5 dan `b*c` = 0. 3: Toffoli membalik bit ketiga hanya bila dua bit pertama keduanya 1, jadi `(a, b, 0)` menjadi `(a, b, a AND b)`; bit ketiga bernilai 1 hanya bila `a` dan `b` keduanya 1, dan karena `a` dan `b` ikut tersimpan operasinya reversibel. 4: yang dihitung adalah banyak pemasangan oracle (satu) lawan banyak query klasik pasti benar (dua) dalam model query; ia tidak membuktikan komputer kuantum lebih cepat dalam waktu, karena biaya membangun oracle tidak dihitung dan keunggulannya sederhana. 5: jumlah kuadrat amplitudo 1; sama dengan hitungan tangan untuk kasus kecil; hasil shot dalam tiga simpangan wajar dari harapan.

**Latihan bercampur.**

1. Setelah H: `(0,7071 ; 0 ; 0,7071 ; 0)`; setelah CNOT: `(0,7071 ; 0 ; 0 ; 0,7071)`. Peluang `00` dan `11` masing-masing 0,5, `01` dan `10` nol. Simpangan akar(1000 x 0,5 x 0,5) = 15,8.
2. Pertama: `a*d` = 0,36 x 0,64 = 0,2304 dan `b*c` = 0,48 x 0,48 = 0,2304; sama, jadi dapat difaktorkan (`(0,6 ; 0,8)` kali `(0,6 ; 0,8)`). Kedua: `a*d` = 0 dan `b*c` = 0,6 x 0,8 = 0,48; tidak sama, jadi terjerat. Jumlah kuadrat keduanya 1.
3. `2^26 x 8` = 536870912 byte = 512 MiB; dengan 16 byte 1024 MiB (1 GiB).
4. `(1, 1, 0)` menjadi `(1, 1, 1)` dan `(1, 0, 0)` tetap `(1, 0, 0)`. Bila bit ketiga mulai dari 1, bit ketiga menjadi NOT(`a` AND `b`), yaitu NAND (keluaran penyusun: 1, 1, 1, 0 untuk `ab` = 00, 01, 10, 11).
5. Sebelum koreksi Bob memegang `(-0,6 ; 0,8)`. Hasil `11` berarti X lalu Z: X memberi `(0,8 ; -0,6)`, Z memberi `(0,8 ; 0,6)`, sama dengan yang dikirim (keluaran penyusun, peluang hasil 0,25).
6. (a) Harapan 7500; simpangan akar(10000 x 0,75 x 0,25) = 43,3; selisih 400, kira-kira 9,2 simpangan: sangat tidak wajar; strategi klasik tidak melampaui 3/4, jadi curigai kode atau aturan menang. (b) Harapan 100; simpangan akar(400 x 0,25 x 0,75) = 8,66.
7. Deutsch: setelah H, H: `(0,5 ; -0,5 ; 0,5 ; -0,5)`; setelah oracle: `(-0,5 ; 0,5 ; 0,5 ; -0,5)`; setelah H pada query: `(0 ; 0 ; -0,7071 ; 0,7071)`; query terbaca 1 dengan peluang 1: seimbang. Deutsch-Jozsa `00110011` punya empat nilai 1, jadi seimbang dan `P(000)` = `((4 - 4)/8)²` = 0 (keluaran penyusun 0). Oracle dipasang satu kali; klasik pasti benar terburuk `2^(3-1) + 1` = 5 query.
8. Contoh jawaban: klaim itu keliru karena oracle dipasang sekali dan yang terbaca hanya apakah semua tanda sama, bukan semua jawaban. Keunggulannya berlaku untuk masalah dengan janji (konstan atau seimbang) dalam model query dan terhadap algoritma klasik pasti benar; klasik acak dengan sedikit query hampir selalu benar. Hitungan query bukan waktu, dan simulator di komputer klasik tidak memperlihatkan percepatan.

**Rubrik singkat** (usulan, bukan kebijakan sekolah): benar bila hitungan benar dan langkah tertulis; setengah bila langkah benar tetapi ada salah hitung; kosong bila hanya jawaban akhir tanpa langkah. Pada soal 6 dan 8 nilai juga kejujuran batas klaim.

**Refleksi.** Tidak ada kunci; refleksi adalah milikmu. Guru boleh bertanya apakah refleksi sudah ditulis tanpa meminta membacanya.

## Langkah berikutnya

Modul berikut: `e-xii1-m1` (Bernstein-Vazirani), semester XII1. Bacaan pendamping: `e-xi2-m10` sampai `e-xi2-m12` (oracle, Deutsch, dan Deutsch-Jozsa).
