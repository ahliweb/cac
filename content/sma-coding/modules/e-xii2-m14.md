## Untuk siapa modul ini

Modul ini untuk murid kelas XII jalur E (komputasi kuantum), minggu `E-XII2-M14` silabus v1.4: asesmen dan refleksi semester 2, penutup jalur E. Prasyarat: modul `e-xii2-m13` dan seluruh materi semester ini; modul ini menilai semuanya. Alat: kertas, kalkulator, dan simulatormu bila ingin memeriksa atau mengerjakan soal praktik. Murid tanpa dasar pemrograman mengerjakan soal tulis dan telusur dengan tangan dan kalkulator.

Modul ini berstatus DRAF: karangan penyusun, belum ditinjau pemilik. Jalur E adalah pengayaan di luar rumusan capaian pembelajaran (CP), dan asesmen ini tidak dihitung sebagai pemenuhan butir CP. Asesmen ini **tanpa AI**: jangan memakai AI generatif saat mengerjakannya (silabus 7.4). Bobot nilai dan predikat mengikuti kebijakan sekolah `[belum terverifikasi]`; modul ini hanya memberi soal, rubrik singkat, dan kunci.

Catatan untuk guru: semua angka soal dihitung ulang penyusun dengan program kecil terpisah. Modul `e-xii2-m1` sampai `e-xii2-m7` belum terindeks, jadi soal yang bersandar padanya mengikuti kunci modul itu. Soal praktik (nomor 6) memakai pola uji sifat dan uji mutasi dari `e-xii2-m10`; penyusun menjalankan versi 200 gerbang acak di modul itu, bukan varian murid. Tidak ada soal yang memerlukan akun, token, atau pekerjaan pada perangkat nyata.

## Ingat kembali

Ini inti asesmen: jawab dari ingatan, tanpa melihat catatan, lalu cocokkan dengan kunci. Soal 1 dari `e-xii2-m6`, soal 2 dari `e-xii2-m7`, soal 3 dari `e-xii2-m8`, soal 4 dari `e-xii2-m9`, soal 5 dari `e-xii2-m10`, soal 6 dari `e-xii2-m13`.

1. Sebutkan tiga risiko proyek dan satu langkah kecil untuk masing-masing.
2. Tulis uji kecil yang menunjukkan bahwa gerbang `H` adalah kebalikan dirinya sendiri.
3. Bila tabel uji tetap lulus setelah kode dirusak sengaja, apa artinya bagi tabel itu?
4. Mengapa batas klaim harus tertulis pada proyek yang hanya simulasi?
5. Bagaimana menguji bahwa urutan gerbang yang dibalik mengembalikan keadaan awal, dan gerbang mana yang boleh diuji dengan cara itu?
6. Mengapa menjawab dari ingatan sebelum membuka kunci lebih berguna daripada membaca ulang catatan?

## Tujuan

Kemampuan yang dinilai (selaras silabus bagian 7.1, minggu M1 sampai M13):

- membaca histogram dan menilai kewajaran hasil dengan simpangan wajar;
- menghitung peluang Grover untuk `N` kecil dan menjelaskan batas klaim keunggulan;
- menjelaskan mitigasi derau, dampak ke keamanan informasi, dan tanda hype dengan bersumber;
- menguji proyek dengan jawaban hitung tangan, uji sifat, dan uji mutasi, serta mengarsipkan tanpa data pribadi.

Keluaran: uji tulis dan praktik; jurnal.

## Latihan bercampur

Kerjakan tanpa AI; tulis langkahmu.

1. **Histogram.** Simulator ideal memberi `000` sebanyak 540 dari 1000 shot pada GHZ. Hitung `z` terhadap 500 dan tulis tiga hal yang kamu periksa sebelum menyimpulkan.
2. **Grover.** Untuk `N = 16` dengan satu item bertanda, hitung peluang untuk `t = 1`, `2`, `3`, `4`, tentukan `t` terbaik, dan tulis query klasik terburuk.
3. **Derau dan mitigasi.** Sirkuit 30 gerbang dengan peluang bersih 0,99 per gerbang: berapa peluang tanpa kesalahan? Apa yang dilakukan mitigasi derau dan apa yang tidak dilakukannya?
4. **Hibrida.** Satu algoritma hibrida memakai 25 iterasi, 4 pengaturan per iterasi, 500 shot. Berapa pembacaan sirkuit, dan mengapa angka itu belum menyatakan keunggulan kuantum?
5. **Klaim kritis.** Berita: "Komputer kuantum akan memecahkan semua enkripsi tahun depan." Nilai dalam tiga kalimat dengan sumber yang kamu kenal.
6. **Praktik.** Pada simulatormu, tulis uji norma dan uji pembalikan untuk 100 gerbang acak dari `H`, `X`, `Z`, `CNOT`, serta satu uji mutasi, lalu laporkan hasil dan satu batas ujimu.
7. **Portofolio.** Sebutkan tiga jenis berkas yang tidak boleh diarsipkan dan satu hal yang tidak dapat ditangkap pemeriksa pola.

## Refleksi

Tulis sendiri, tidak diserahkan ke repositori maupun dibagikan: (1) apa yang sudah kamu kuasai dari jalur E dan bagaimana buktinya; (2) apa yang masih keliru atau membingungkan, dan soal mana yang menunjukkannya; (3) rencana belajarmu setelah jalur ini (satu hal yang diulang berjarak, satu yang dicoba baru); (4) satu klaim tentang komputasi kuantum yang sekarang kamu nilai lebih hati-hati, dan satu hal dari proyekmu yang akan kamu kerjakan berbeda.

## Cek mandiri

- [ ] Saya dapat menilai histogram dengan `z` dan memeriksa penyebab bila tidak wajar.
- [ ] Saya dapat menghitung peluang Grover dan menyebut batas klaimnya.
- [ ] Saya dapat menilai klaim berita tentang kuantum dan keamanan dengan sumber.
- [ ] Saya dapat menguji proyek dengan hitung tangan, uji sifat, dan uji mutasi.
- [ ] Saya sudah menulis refleksiku sendiri.

## Kunci dan petunjuk

**Ingat kembali.** 1: contoh: (a) difusi atau tanda salah, langkah: uji kasus terkecil `N = 4` dulu; (b) waktu habis, langkah: sprint pertama hanya kasus terkecil; (c) klaim berlebihan, langkah: tulis batas klaim. 2: terapkan `H` dua kali pada `|0>` dan periksa peluang 0 sama dengan 1 dengan toleransi kecil (mis. `1e-12`). 3: tabel itu tidak menguji bagian yang dirusak; perlu kasus yang menyentuh bagian tersebut (pada `e-xii2-m8`, baris `t = 0` tetap lulus). 4: tanpa batas klaim pembaca mengira hasil simulasi sama dengan hasil perangkat atau keunggulan kuantum. 5: terapkan sirkuit lalu gerbang yang sama dalam urutan terbalik dan periksa peluang keadaan awal 1; berlaku untuk `H`, `X`, `Z`, `CNOT` yang kebalikan dirinya, tidak untuk rotasi sudut sembarang. 6: mencoba mengingat memperkuat ingatan dan memperlihatkan celah; membaca ulang terasa lancar tanpa menguji.

**Latihan bercampur.**

1. `z = (540 - 500) / akar(250)` = 40 / 15,81 = 2,53: di dalam tiga simpangan tetapi di luar dua, jadi layak diperiksa, bukan langsung ditolak. Periksa: benih dan generator acak, jumlah shot (ulangi dengan benih lain), dan apakah peluang hitung tangan 0,5 benar.
2. `theta = asin(1/4)`; `t = 1`: 0,4727; `t = 2`: 0,9084; `t = 3`: 0,9613; `t = 4`: 0,5817; terbaik `t = 3` (sesuai `pi/4 x akar 16` = 3,14). Query klasik terburuk `N - 1` = 15.
3. `0,99^30` = 0,740. Mitigasi memperbaiki perkiraan nilai harap lewat percobaan tambahan dan pengolahan hasil; ia tidak membuat gerbang lebih baik dan bukan koreksi kesalahan.
4. `25 x 4 x 500` = 50000 pembacaan. Itu hanya hitungan pembacaan; belum memuat waktu per langkah, derau, antrean, dan biaya, dan tidak dibandingkan dengan algoritma klasik terbaik.
5. Contoh jawaban: klaim itu terlalu luas dan tidak bersumber. Sumber NIST menyebut banyak sistem kunci publik yang terdampak, bukan semua, dan mesin besarnya mungkin masih bertahun-tahun atau puluhan tahun lagi; kunci simetris terdampak lebih kecil (per 2026-11-19). NIST juga meminta organisasi mulai bersiap, jadi jawabannya "bersiap tanpa panik", bukan "tahun depan".
6. Uji norma: jumlah kuadrat amplitudo tetap 1 (penyimpangan di bawah `1e-12`); uji pembalikan: sirkuit lalu urutan dibalik mengembalikan peluang `0...0` ke 1; uji mutasi: sisipkan satu gerbang yang tidak ada dalam sirkuit dan pastikan uji pembalikan gagal. Batas: mutasi `Z` tidak tertangkap bila qubit itu di keadaan `|0>`; uji hanya menyatakan kasus yang diuji lulus.
7. Contoh: `.env`, tangkapan layar yang memuat akun, nama pekerjaan cloud asli (juga token, kunci). Pemeriksa pola tidak menangkap nama murid atau sekolah, wajah pada gambar, dan konteks yang mengidentifikasi; manusia harus membaca.

**Rubrik singkat** (usulan, bukan kebijakan sekolah): benar bila hitungan benar dan langkah tertulis; setengah bila langkah benar tetapi ada salah hitung; kosong bila hanya jawaban akhir tanpa langkah. Pada soal 1, 4, 5, 6, dan 7 nilai juga kejujuran batas klaim.

**Refleksi.** Tidak ada kunci; refleksi adalah milikmu. Guru boleh bertanya apakah refleksi sudah ditulis tanpa meminta membacanya.

## Langkah berikutnya

Modul ini penutup jalur E semester `E-XII2`. Bacaan pendamping: `e-xii2-m8` sampai `e-xii2-m13`; belajar lanjut mengikuti minatmu dan sumber yang kamu verifikasi sendiri.
