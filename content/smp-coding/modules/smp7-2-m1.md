## Untuk siapa modul ini

Modul ini untuk murid kelas 7 pada minggu pertama semester kedua. Kamu hanya memerlukan kertas dan pensil; tidak ada komputer. Waktunya satu pertemuan, 2 JP. Prasyaratnya `SMP7-1-M2` (algoritma sebagai urutan langkah). Semua data di modul ini rekaan; nama "Murid-01" dan seterusnya bukan orang sungguhan.

## Ingat kembali

Tutup modul ini dan jawab dari ingatan. Semester lalu sudah berlalu, jadi ini ujian ingatan yang bagus.

1. Tulis arti algoritma dan tiga kebiasaan kartu instruksi yang tepat. (`SMP7-1-M1`, `SMP7-1-M2`)
2. Apa beda `set` dan `change` pada variabel? (`SMP7-1-M9`)
3. Tulis arti **dekomposisi** dengan kalimatmu sendiri. (`SMP7-1-M6`)

Kunci: (1) algoritma adalah urutan langkah berhingga untuk menyelesaikan suatu tugas; kebiasaan kartu: satu langkah satu tindakan, sebut benda dan jumlah, urutan dipikirkan; (2) `set` mengganti isi, `change` menambah ke isi yang ada; (3) memecah masalah besar menjadi bagian kecil yang dikerjakan sendiri-sendiri.

## Tujuan

Setelah modul ini kamu dapat:

1. membedakan **data** (fakta mentah) dari **informasi** (data yang diolah untuk menjawab pertanyaan);
2. memberi contoh **data diskrit** dan yang bukan;
3. membaca tabel data: baris, kolom, dan menghitung kemunculan nilai;
4. menyusun langkah dari data ke informasi sebagai algoritma.

## Prediksi dulu

**Data** adalah catatan fakta, misalnya angka atau kata, yang belum menjawab pertanyaan apa pun. **Informasi** muncul ketika data diolah supaya menjawab sebuah pertanyaan. Data **diskrit** nilainya terpisah dan bisa dihitung atau dipilih dari daftar tertentu, misalnya banyak saudara (0, 1, 2, ...) atau pilihan cara berangkat. Tinggi badan bukan diskrit: nilainya bisa di antara dua angka mana pun, dan baru tampak "terpisah" kalau kita membulatkannya.

Tabel rekaan survei kelas kecil:

| Murid | Jumlah saudara | Cara ke sekolah | Buku dibawa |
| --- | --- | --- | --- |
| Murid-01 | 1 | jalan | 5 |
| Murid-02 | 2 | sepeda | 6 |
| Murid-03 | 0 | jalan | 5 |
| Murid-04 | 3 | angkutan | 7 |
| Murid-05 | 1 | jalan | 6 |
| Murid-06 | 2 | sepeda | 5 |
| Murid-07 | 1 | jalan | 7 |
| Murid-08 | 0 | angkutan | 6 |

**Prediksi.** Pandang tabel tanpa menghitung. Cara ke sekolah apa yang menurutmu paling banyak, dan berapa murid? Tulis dulu.

**Jalankan.** Hitung kemunculan tiap cara ke sekolah dengan tanda garis (tally) di kertas.

**Selidiki.** Cocokkan dengan prediksimu. Tanda garismu adalah data yang sudah diolah; kalimat "paling banyak berjalan kaki" adalah informasi.

## Contoh terselesaikan

Pertanyaan: berapa murid tiap jumlah saudara, dan berapa total buku?

| Nilai | Murid yang punya nilai itu | Banyaknya |
| --- | --- | --- |
| 0 saudara | 03, 08 | 2 |
| 1 saudara | 01, 05, 07 | 3 |
| 2 saudara | 02, 06 | 2 |
| 3 saudara | 04 | 1 |

Total banyaknya 2 + 3 + 2 + 1 = 8, sama dengan jumlah baris; ini cara memeriksa bahwa tidak ada baris yang terlewat. Total buku: tiga murid membawa 5 (15), tiga membawa 6 (18), dua membawa 7 (14), jadi 15 + 18 + 14 = 47.

Informasi yang bisa ditulis: "Paling banyak murid punya satu saudara (3 dari 8)". Perhatikan tiga hal. Pertama, pertanyaan menentukan bagian data yang dipakai. Kedua, data diskrit mudah dihitung per nilai. Ketiga, memeriksa jumlah adalah kebiasaan algoritma yang baik.

## Contoh setengah jadi

Hitung banyaknya murid untuk tiap jumlah buku dari tabel yang sama. Isi bagian kosong.

| Buku dibawa | Murid | Banyaknya |
| --- | --- | --- |
| 5 | 01, 03, 06 | 3 |
| 6 | ____ | ____ |
| 7 | ____ | ____ |

Periksa: jumlah kolom terakhir harus sama dengan banyaknya baris tabel.

## Susun urutannya

Enam langkah mengubah data menjadi informasi sudah diacak. Susun dalam urutan yang benar.

- **A.** Tulis pertanyaan yang ingin dijawab.
- **B.** Kumpulkan data dan rapikan dalam tabel.
- **C.** Pilih kolom yang dibutuhkan pertanyaan.
- **D.** Hitung atau bandingkan nilainya.
- **E.** Tulis kesimpulan satu kalimat.
- **F.** Periksa bahwa jumlah hitungan sama dengan banyak baris.

Tulis urutan hurufnya. Jelaskan mengapa pertanyaan ditulis lebih dulu.

## Latihan

1. **Ubah.** Pada tabel survei, ganti cara ke sekolah Murid-05 menjadi sepeda. Hitung ulang tally dan tulis informasi barunya.
2. **Buat.** Tulis tabel lima baris rekaan (nama "Murid-A" dan seterusnya) tentang hewan peliharaan di rumah. Tiap baris punya satu pilihan: kucing, burung, atau tidak ada. Hitung kemunculannya.
3. **Klasifikasi.** Mana yang diskrit: banyak buku di tas, berat tas dalam kilogram, pilihan warna sampul? Beri alasan satu kalimat.
4. **Jelaskan.** Dengan dua kalimat, jelaskan beda data dan informasi memakai contoh dari tabel.

Untuk soal 2 kamu boleh juga mengumpulkan data kelas, tetapi hanya hitungan **tanpa nama**, misalnya dengan angkat tangan untuk satu pilihan netral.

## Latihan bercampur

Data diskrit adalah konsep baru, jadi latihan bercampur yang memuat tabel dimulai di modul berikutnya; dua soal ini mengulang topik semester lalu.

1. Robot di (1, 1) menghadap atas menjalankan `MAJU`, `KANAN`, `MAJU`, `MAJU`. Di mana ia berhenti dan menghadap ke mana? (`SMP7-1-M2`)
2. Program: `set [a] to (0)`, `repeat (3)` berisi `change [a] by (2)` dan `if <(a) > (4)> then change [a] by (1)`. Berapa nilai akhir `a`? (`SMP7-1-M5`, `SMP7-1-M8`, `SMP7-1-M9`)

## Ulang berjarak

Kerjakan ulang tanpa melihat modul ini, lalu cocokkan:

- **Minggu depan** (`SMP7-2-M2`): sebut dua contoh data diskrit dan satu contoh yang bukan.
- **Sekitar sebulan lagi** (`SMP7-2-M5`): tulis beda data dan informasi dengan contoh dari tabel kelas.
- **Akhir semester** (`SMP7-2-M10`): beri satu contoh data, lalu ubah menjadi informasi yang menjawab satu pertanyaan.

## Kesalahan umum

- **Menganggap data sama dengan informasi.** Kenali: tabel mentah dipakai sebagai jawaban tanpa menghitung apa pun.
- **Mengira diskrit berarti hanya bilangan bulat.** Pilihan cara berangkat juga diskrit. Kenali: ada daftar nilai yang terbatas.
- **Menghitung baris tanpa memeriksa totalnya.** Kenali: jumlah hitungan tidak sama dengan banyak baris.
- **Menulis kesimpulan yang tidak menjawab pertanyaan.** Kenali: kalimat benar, tetapi bukan jawaban dari pertanyaan awal.

## Cek mandiri

Tutup modul, jawab tanpa melihat, lalu periksa.

1. Apa beda data dan informasi?
2. Apa arti data diskrit? Beri satu contoh.
3. Mengapa jumlah hitungan perlu diperiksa terhadap banyak baris?

Daftar periksa (kosong; kamu isi sendiri, tidak dikumpulkan):

- [ ] Aku bisa membedakan data dan informasi.
- [ ] Aku bisa menghitung kemunculan nilai dari tabel.
- [ ] Aku bisa menyusun langkah dari data ke informasi.

Kunci: (1) data adalah fakta mentah, informasi adalah data yang diolah untuk menjawab pertanyaan; (2) nilainya terpisah dan bisa dicacah, misalnya banyak saudara; (3) supaya tidak ada baris yang terlewat atau terhitung dua kali.

## Langkah berikutnya

`SMP7-2-M2`, "Kodifikasi: biner". Kamu akan melihat bagaimana komputer menyimpan angka dan huruf memakai hanya dua nilai, 0 dan 1.

## Catatan untuk guru

- **Waktu:** 2 JP x 40 menit `[asumsi]` (silabus bagian 2). Berpasangan boleh untuk "Prediksi dulu" dan "Latihan"; bukan jaminan efek belajar.
- **Alat:** kertas dan pensil. Data tabel rekaan; kumpul data kelas hanya sebagai hitungan tanpa nama dan tanpa topik sensitif.
- **Butir CP:** corpus memetakan minggu ini ke `D-BK-b`, `D-BK-a`, dan `DK-BK-a`. Modul ini melatih membaca tabel dan menyusun langkah olah data; tidak menyatakan CP "terpenuhi". Cakupan `D-BK-b` bersifat sebagian (daftar dan tabel).
- **Kunci "Prediksi dulu":** jalan kaki, 4 murid (01, 03, 05, 07); sepeda 2; angkutan 2.
- **Kunci "Contoh setengah jadi":** 6: 02, 05, 08, banyaknya 3; 7: 04, 07, banyaknya 2; jumlah 3 + 3 + 2 = 8.
- **Kunci "Susun urutannya":** A, B, C, D, F, E (kesimpulan paling akhir, sesudah pemeriksaan). Pertanyaan lebih dulu agar kita tahu kolom mana yang dipakai.
- **Kunci latihan:** (1) jalan 3, sepeda 3, angkutan 2; informasi: jalan dan sepeda sama banyak. (2) jawaban bebas asal hitungan sama dengan banyak baris. (3) banyak buku diskrit; berat bukan diskrit (kontinu, bisa di antara angka); warna sampul diskrit (pilihan terbatas). (4) jawaban bebas, mis. tally cara berangkat adalah data, "paling banyak jalan kaki" adalah informasi.
- **Kunci "Latihan bercampur":** (1) (3, 2) menghadap kanan; `MAJU` ke (1, 2), `KANAN` menghadap kanan, `MAJU` ke (2, 2), `MAJU` ke (3, 2). (2) putaran 1: a menjadi 2 (tidak > 4); putaran 2: 4 (tidak > 4); putaran 3: 6, karena 6 > 4 menjadi 7. Nilai akhir 7.
- **Petunjuk bertahap:** (a) tulis pertanyaan lebih dulu; (b) tandai kolom yang dipakai; (c) hitung per nilai lalu jumlahkan.
- **AI:** tanpa AI. Kebijakan `smp-coding` (silabus bagian 7.1): AI generatif hanya demonstrasi guru, tanpa akun murid; asesmen tanpa AI.
- **Privasi:** semua data rekaan; jangan menulis nama murid asli di tabel.
- **Unsur pembelajaran:** ingat kembali dan jarak (`K`), PRIMM (`K` usia 11 sampai 14), contoh lengkap lalu setengah jadi (`K`), Parsons (`M`), latihan bercampur (`K`).
