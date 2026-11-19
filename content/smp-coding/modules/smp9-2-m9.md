## Untuk siapa modul ini

Modul ini untuk murid kelas 9 pada minggu kesembilan semester kedua. Kamu memakai kertas, pensil, dan kartu yang disiapkan gurumu; tidak ada komputer dan tidak perlu akun. Waktunya satu pertemuan, 2 JP. Prasyaratnya `SMP9-2-M8` (sensor dan klasifikasi) dan `SMP9-1-M6` (sumber data terbuka). Semua angka di modul ini rekaan.

## Ingat kembali

Tutup modul ini dan jawab dari ingatan.

1. Jelaskan mengapa sensor memberi angka dan bukan "ada orang", dan beri satu cara mengurangi salah baca. (`SMP9-2-M8`)
2. Tulis satu catatan penyebab: gejala, penyebab, perbaikan, aturan umum. (`SMP9-2-M6`)
3. Jelaskan mengapa 60 lemparan tidak cukup untuk menilai dadu adil sedangkan 6000 lebih meyakinkan. (`SMP9-1-M10`)
4. Sebut apa yang dicatat dalam tinjauan asal dan lisensi sebuah himpunan data. (`SMP9-1-M6`)

Kunci: (1) sensor hanya mengukur satu hal; arti angka datang dari aturan; merata-ratakan beberapa bacaan mengurangi salah baca; (2) gejala yang tampak, penyebab pada baris atau aturan, apa yang diubah, aturan untuk kasus serupa; (3) hasil acak berubah-ubah, dan makin banyak lemparan makin mendekati pola sebenarnya; (4) siapa penerbitnya, dari mana datanya, kapan diambil, dan apa izin pemakaiannya.

## Tujuan

Setelah modul ini kamu dapat:

1. menjelaskan bahwa mesin belajar dengan mencari pola dari contoh berlabel;
2. "melatih" model kartu dengan memilih batas dari kartu latih, lalu mengujinya pada kartu baru;
3. menjelaskan beda ketepatan pada kartu latih dan kartu uji;
4. menyebut tiga hal yang membuat data berkualitas rendah.

## Prediksi dulu

Minggu lalu batas 30 dipilih dari kebiasaan. Kali ini batas dicari dari contoh. Delapan **kartu latih** rekaan, masing-masing berisi angka suara dan label dari manusia:

| Suara | 5 | 8 | 12 | 22 | 38 | 46 | 55 | 62 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Label | kosong | kosong | kosong | kosong | dipakai | dipakai | dipakai | dipakai |

**Prediksi.** Kamu mencari satu batas "suara sama atau lebih dari batas berarti dipakai". Batas berapa yang benar pada semua delapan kartu latih? Dan menurutmu, apakah batas itu akan benar juga pada kartu yang belum pernah dilihat?

## Contoh terselesaikan

Karena ini minggu unplugged, contohnya berupa **melatih model kartu dan mengujinya**.

**Melatih.** Kartu kosong paling keras bersuara 22; kartu dipakai paling pelan 38. Batas apa pun dari 23 sampai 38 benar pada semua kartu latih. Pilih titik tengah: (22 + 38) / 2 = 30. Model: "suara 30 atau lebih berarti dipakai". Ketepatan pada kartu latih: 8 dari 8.

**Menguji.** Enam **kartu uji** rekaan yang belum pernah dilihat model:

| Suara | Sebenarnya | Model (batas 30) | Benar? |
| --- | --- | --- | --- |
| 10 | kosong | kosong | ya |
| 33 | dipakai | dipakai | ya |
| 28 | dipakai (berbisik) | kosong | **tidak** |
| 48 | kosong (suara lorong) | dipakai | **tidak** |
| 70 | dipakai | dipakai | ya |
| 3 | kosong | kosong | ya |

Ketepatan pada kartu uji: 4 dari 6. Jadi 8 dari 8 pada kartu latih tidak menjamin hasil pada data baru. Yang menentukan adalah kartu uji.

**Kualitas data.** Misalkan manusia salah memberi label pada kartu 38 menjadi "kosong". Batas yang benar pada label itu kini berada antara 38 dan 46: titik tengahnya 42. Hasil pada enam kartu uji turun menjadi 3 dari 6. Satu label salah mengubah model. Tiga sumber mutu rendah: **label salah**, **contoh terlalu sedikit**, dan **contoh kurang beragam** (misalnya semua kartu latih diambil pagi hari, padahal model dipakai juga sore hari).

## Contoh setengah jadi

Kartu latih rekaan: suara 7 kosong, 18 kosong, 36 dipakai, 50 dipakai. Latih model, lalu uji tiga kartu uji. Isi bagian kosong.

| Hal | Isi |
| --- | --- |
| Kosong paling keras | ____ |
| Dipakai paling pelan | ____ |
| Batas (titik tengah) | ____ |
| Kartu uji 20, 29, 41 (hasil model) | ____ |

## Susun urutannya

Empat kartu langkah melatih model, acak: (A) tulis batas sebagai aturan; (B) uji dengan kartu yang belum pernah dilihat; (C) cari batas di antara label yang berbeda; (D) urutkan kartu latih dari suara terkecil. Susun urutan yang benar.

## Latihan

1. **Jalankan.** Terapkan batas 30 pada enam kartu uji tanpa melihat tabel, lalu hitung yang benar.
2. **Ubah.** Pakai batas 42 pada enam kartu uji. Kartu mana yang berubah hasilnya dari batas 30?
3. **Buat.** Tulis tiga kartu latih baru yang membuat batas bergeser, lalu hitung batas barunya.
4. **Jelaskan.** Jelaskan dengan kata sendiri mengapa kartu latih saja tidak cukup untuk menilai model.

## Latihan bercampur

1. Hitung rata-rata 40, 5, dan 6. (`SMP9-2-M8`)
2. Apa arti `y = jadwal.get("Kamis", [])` bila "Kamis" tidak ada di `jadwal`? (`SMP9-2-M4`)

## Ulang berjarak

Kerjakan ulang tanpa melihat modul ini, lalu cocokkan:

- **Minggu depan** (`SMP9-2-M10`): jelaskan mengapa model yang dilatih dari data pagi bisa keliru pada data sore, dan kaitkan dengan bias.
- **Akhir semester** (`SMP9-2-M14`): sebut tiga hal yang membuat data berkualitas rendah dan beda ketepatan pada kartu latih dan kartu uji.

## Kesalahan umum

- **Menilai model dari kartu latih.** Kenali: hanya melaporkan hasil pada kartu yang dipakai untuk mencari batas.
- **Mengira model "paham".** Kenali: model hanya menemukan batas dari contoh, tanpa tahu mengapa ruang itu dipakai.
- **Mengira lebih banyak data pasti lebih baik.** Kenali: menambah contoh tanpa memeriksa label dan keragamannya.
- **Memakai kartu uji untuk melatih.** Kenali: batas dihitung ulang setelah melihat kartu uji.

## Cek mandiri

Tutup modul, jawab tanpa melihat, lalu periksa.

1. Apa yang berbeda antara kartu latih dan kartu uji?
2. Sebut tiga hal yang membuat data berkualitas rendah.
3. Mengapa 8 dari 8 pada kartu latih belum cukup?

Daftar periksa (kosong; kamu isi sendiri, tidak dikumpulkan):

- [ ] Aku memilih batas dari kartu latih saja.
- [ ] Aku menguji model pada kartu yang belum pernah dilihat.
- [ ] Aku menyebut satu cara data bisa rusak.

Kunci: (1) kartu latih dipakai mencari batas, kartu uji dipakai menilai; (2) label salah, contoh terlalu sedikit, contoh kurang beragam; (3) model bisa hanya cocok pada kartu yang sudah dilihat.

## Langkah berikutnya

`SMP9-2-M10`, "Etika AI: keliru, bias, halusinasi, tiruan palsu, ketergantungan, mengalihkan pekerjaan berpikir ke AI". Minggu ini kamu melihat model kartu keliru pada data baru; minggu depan kamu membahas apa artinya bila model sungguhan keliru dan siapa yang menanggung akibatnya.

## Catatan untuk guru

- **Waktu:** 2 JP x 40 menit `[asumsi]` (silabus bagian 2). Siapkan kartu latih dan uji; mulai dengan kartu latih, simpan kartu uji sampai model selesai.
- **Alat:** hanya kertas dan kartu. Penulis menghitung ulang semua angka dengan `python3 -I` (Python 3.12.3): batas dari 23 sampai 38 benar pada delapan kartu latih (titik tengah 30); batas 30 benar 4 dari 6 kartu uji; dengan label 38 yang salah, batas 39 sampai 46 (titik tengah 42) benar pada label itu dan 3 dari 6 pada kartu uji; (18 + 36) / 2 = 27.
- **Butir CP:** corpus memetakan minggu ini ke `DK-EA-c` (sebagian: unplugged saja). Modul tidak menyatakan CP "terpenuhi". Modul tidak melatih model sungguhan; "melatih" di sini berarti memilih batas dari contoh.
- **Keluaran minggu:** model kartu yang dilatih dan diuji.
- **Kunci "Prediksi dulu":** batas apa pun dari 23 sampai 38 benar pada kartu latih; pada kartu baru belum tentu (lihat contoh terselesaikan).
- **Kunci "Contoh setengah jadi":** 18; 36; 27; hasil model untuk 20, 29, 41 adalah kosong, dipakai, dipakai.
- **Kunci "Susun urutannya":** D, C, A, B.
- **Kunci latihan:** (1) benar pada 10, 33, 70, 3 (4 dari 6). (2) hanya kartu 33 yang berubah (dipakai menjadi kosong); 3 dari 6 benar. (3) contoh: tambahkan kartu kosong bersuara 32; kosong paling keras kini 32 dan dipakai paling pelan 38, jadi batasnya (32 + 38) / 2 = 35 (jawaban bebas; periksa hitungan murid). (4) model dicari dari kartu latih sehingga cocok dengan kartu itu; kartu uji menunjukkan perilaku pada data baru.
- **Kunci "Latihan bercampur":** (1) 17. (2) `y` menjadi daftar kosong `[]`.
- **Petunjuk bertahap:** (a) urutkan kartu latih; (b) cari pasangan bersebelahan yang labelnya beda; (c) ambil titik tengahnya; (d) uji pada kartu baru.
- **Bekal SMA:** jalur D kelas X (`d-x1-m9`, "Data, fitur, dan label", dan `d-x1-m10`, "Klasifikasi tanpa komputer") melanjutkan gagasan ini; itu jembatan silabus, bukan prasyarat.
- **AI:** tanpa AI oleh murid. Kebijakan `smp-coding` (silabus bagian 7.1): AI generatif hanya demonstrasi guru, tanpa akun murid; modul ini tidak memakai layanan AI.
- **Privasi:** kartu rekaan; tanpa data ruang kelas atau suara murid nyata.
- **Unsur pembelajaran:** ingat kembali dan jarak (`K`), PRIMM (`K` usia 11 sampai 14), contoh lengkap lalu setengah jadi (`K`), latihan bercampur (`K`).
