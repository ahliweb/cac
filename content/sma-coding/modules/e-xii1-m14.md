## Untuk siapa modul ini

Modul ini untuk murid kelas XII jalur E (komputasi kuantum), minggu `E-XII1-M14` silabus v1.4: asesmen dan refleksi semester 1. Prasyarat: modul `e-xii1-m12` dan seluruh materi semester ini; modul ini menilai semuanya. Alat: kertas, kalkulator, dan simulatormu bila ingin memeriksa. Murid tanpa dasar pemrograman mengerjakan soal dengan tangan dan kalkulator saja.

Modul ini berstatus DRAF: karangan penyusun, belum ditinjau pemilik. Jalur E adalah pengayaan di luar rumusan capaian pembelajaran (CP), dan asesmen ini tidak dihitung sebagai pemenuhan butir CP. Asesmen ini **tanpa AI**: jangan memakai AI generatif saat mengerjakannya (silabus 7.4). Bobot nilai dan predikat mengikuti kebijakan sekolah `[belum terverifikasi]`; modul ini hanya memberi soal, rubrik singkat, dan kunci.

Catatan untuk guru: angka soal dihitung ulang penyusun dengan program kecil. Soal tentang cloud memakai tarif awal dari halaman harga IBM Quantum **per tanggal akses 2026-11-19**, yang dapat berubah; periksa lagi sebelum dipakai. Tidak ada soal yang memerlukan akun, token, atau pekerjaan pada perangkat nyata. Modul `e-xii1-m1` sampai `e-xii1-m7` belum terindeks, jadi soal yang bersandar padanya mengikuti kunci modul itu; modul ini bersandar juga pada `e-xii1-m8` sampai `e-xii1-m13`, yang masih DRAF.

## Ingat kembali

Ini inti asesmen: jawab dari ingatan, tanpa melihat catatan, lalu cocokkan dengan kunci. Soal 1 dari `e-xii1-m6`, soal 2 dari `e-xii1-m13`, soal 3 dari `e-xii1-m11`, soal 4 dari `e-xii1-m10`, soal 5 dari `e-xii1-m7`.

1. Mengapa transformasi Fourier berguna untuk menemukan periode?
2. Apa tiga pemeriksaan sebelum menyimpulkan bahwa model derau cocok dengan sebuah histogram?
3. Mengapa waktu menunggu antrean tidak sama dengan pemakaian yang ditagih?
4. Pada Grover `N = 8`, berapa peluang item bertanda setelah `t = 1`, `2`, dan `3`, dan mengapa `t = 3` lebih kecil daripada `t = 2`?
5. Sebutkan tiga pertanyaan untuk menguji klaim berita bahwa komputer kuantum "lebih cepat".

## Tujuan

Kemampuan yang dinilai (selaras silabus bagian 7.1, minggu M1 sampai M13):

- menghitung peluang Grover untuk `N` kecil dan menentukan jumlah pengulangan terbaik;
- memprediksi dan menilai histogram berderau (`(1 - p)^m`, hasil terlarang, simpangan wajar);
- menguraikan alur cloud quantum, membedakan waktu tunggu dari pemakaian, dan menghitung biaya dari tarif bersumber;
- menyampaikan batas klaim tentang simulasi, derau, dan keunggulan kuantum dengan jujur.

Keluaran: uji tulis dan praktik; jurnal.

## Latihan bercampur

Kerjakan tanpa AI; tulis langkahmu.

1. **Grover.** Untuk `N = 32` dengan satu item bertanda, berapa pengulangan terbaik dan peluang item bertanda, dan berapa query klasik terburuk?
2. **Derau.** Sebuah sirkuit memuat 50 gerbang dengan peluang bersih 0,99 per gerbang. Berapa peluang tanpa kesalahan, dan berapa gerbang paling sedikit agar peluang itu di bawah 0,5? Pada H, tunggu 6 langkah, H dengan `q = 0,05`, berapa `P(0)`?
3. **Histogram.** Bell 1000 shot memberi `00` = 470, `01` = 28, `10` = 24, `11` = 478. Hitung jarak variasi total terhadap simulator ideal, `z` untuk `00`, dan jelaskan asal hasil `01` dan `10`.
4. **Cloud.** Sebuah pekerjaan 20 detik menunggu 1500 detik; tarif 96 USD per menit. Kapan hasil tiba, berapa RU dipakai, berapa biayanya, dan berapa pekerjaan seperti itu dalam jatah 10 menit?
5. **Simulator dan Qiskit.** Simulatormu menulis hasil `011`. Bagaimana Qiskit menulisnya, dan mengapa `StatevectorSampler` tidak memberi hasil terlarang pada Bell?
6. **Klaim kritis.** Berita: "Komputer kuantum di cloud memecahkan sandi bank dalam hitungan detik dengan algoritma Shor." Nilai dalam tiga kalimat.
7. **Praktik.** Tambahkan kesalahan baca `r = 0,03` pada Bell di simulatormu. Prediksi jumlah hasil terlarang dari 1000 shot beserta rentang tiga simpangan, lalu jalankan dan laporkan apakah hasilmu masuk rentang.

## Refleksi

Tulis sendiri, tidak diserahkan ke repositori maupun dibagikan: (1) apa yang sudah kamu kuasai di semester ini dan bagaimana buktinya; (2) apa yang masih keliru atau membingungkan, dan soal mana yang menunjukkannya; (3) rencana belajarmu sebelum `E-XII2-M1` (satu hal yang diulang, satu yang dicoba baru); (4) satu klaim tentang komputer kuantum atau cloud quantum yang sekarang kamu nilai lebih hati-hati, dan mengapa.

## Cek mandiri

- [ ] Saya dapat menghitung peluang Grover dan memilih jumlah pengulangan.
- [ ] Saya dapat menilai histogram berderau dengan rumus dan simpangan wajar.
- [ ] Saya dapat menguraikan alur cloud quantum dan menghitung biaya contoh.
- [ ] Saya dapat menilai klaim berita dengan tiga pertanyaan penguji.
- [ ] Saya sudah menulis refleksiku sendiri.

## Kunci dan petunjuk

**Ingat kembali.** 1: barisan berkala memberi puncak tajam di kelipatan `panjang / periode` pada transformasi Fourier, sehingga periode dapat dibaca dari posisi puncak. 2: peluang model berjumlah 1; tanpa derau jarak sama dengan bagian hasil terlarang; jarak terbaik dibandingkan dengan jarak akibat shot terbatas. 3: antrean adalah waktu menunggu giliran, sedangkan yang ditagih adalah waktu perangkat terkunci untuk pekerjaanmu. 4: 0,7812; 0,9453; 0,3301; amplitudo item bertanda berputar melewati titik terbaik pada `t = 3`. 5: masalah apa; dibanding apa; diukur dengan apa.

**Latihan bercampur.**

1. `theta = asin(1/akar 32)`; `t = 1`: 0,2583; `t = 2`: 0,6024; `t = 3`: 0,8969; `t = 4`: 0,9992; `t = 5`: 0,8596; terbaik `t = 4` (sesuai `pi/4 x akar 32` = 4,44) dengan peluang 0,9992. Query klasik terburuk `N - 1` = 31.
2. `0,99^50` = 0,605; `ln 0,5 / ln 0,99` = 68,97, jadi 69 gerbang (`0,99^69` = 0,4998). `P(0)` = `0,5 + 0,5 x 0,9^6` = 0,7657.
3. Jarak `0,5 x (0,03 + 0,028 + 0,024 + 0,022)` = 0,052. `z` untuk `00`: `(470 - 500) / akar(250)` = -1,90, masih dalam tiga simpangan; tetapi `01` dan `10` mustahil pada simulator ideal (total 0,052), jadi ada sebab selain acak shot: kesalahan baca dan kesalahan gerbang pada perangkat atau model derau.
4. Hasil tiba setelah `1500 + 20` = 1520 detik; pemakaian 20 detik = `20 / 60` = 0,3333 RU; biaya `0,3333 x 96` = 32,00 USD; `600 / 20` = 30 pekerjaan.
5. `110` di Qiskit (urutan dibalik: qubit 0 paling kanan). `StatevectorSampler` adalah simulator ideal tanpa derau gerbang dan derau baca, jadi hanya hasil berpeluang tidak nol yang muncul.
6. Contoh jawaban: klaim itu keliru atau berlebihan. Shor memerlukan mesin berskala besar yang menurut NIST mungkin masih bertahun-tahun atau puluhan tahun lagi (per 2026-11-19, `e-xii1-m7`); bagian kuantum Shor hanya mencari orde, dan derau perangkat saat ini membatasi sirkuit dalam (`(1 - p)^m`). Tidak ada pembanding dan tidak ada sumber, jadi tiga pertanyaan penguji tidak terjawab.
7. Harapan `2r(1 - r) x 1000` = 58,2; simpangan `akar(1000 x 0,0582 x 0,9418)` = 7,4; rentang tiga simpangan kira-kira 36 sampai 80. Angka pasti bergantung pada benih; penyusun tidak menjalankan praktik ini.

**Rubrik singkat** (usulan, bukan kebijakan sekolah): benar bila hitungan benar dan langkah tertulis; setengah bila langkah benar tetapi ada salah hitung; kosong bila hanya jawaban akhir tanpa langkah. Pada soal 3, 6, dan 7 nilai juga kejujuran batas klaim.

**Refleksi.** Tidak ada kunci; refleksi adalah milikmu. Guru boleh bertanya apakah refleksi sudah ditulis tanpa meminta membacanya.

## Langkah berikutnya

Modul berikut: `e-xii2-m1` (membaca hasil nyata), semester XII2. Bacaan pendamping: `e-xii1-m8` sampai `e-xii1-m13`.
