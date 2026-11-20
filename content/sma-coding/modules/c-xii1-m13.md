## Untuk siapa modul ini

Modul ini untuk murid kelas XII jalur C (IoT dan robotika), minggu `C-XII1-M13` silabus v1.4: proyek, menyiapkan rancangan proyek akhir (F). Prasyarat: modul `c-xii1-m12` (dokumentasi dan pemeliharaan). Kamu memakai hasil modul 1 sampai 12 semester ini, yang sebagian belum terindeks saat modul ini ditulis.

Modul ini karangan penyusun dan disetujui pemilik program pada 2026-11-20 (keputusan lewat dialog; catatan tinjauan menjadi tindak lanjut revisi), dan tidak dihitung memenuhi butir capaian pembelajaran mana pun. Keluaran minggu ini: rencana proyek. Latihan silabusnya: rencana kerja. Rencana ini dipakai pada `C-XII2-M5` (rancangan) sampai `C-XII2-M13` (presentasi).

Ada dua cara mengerjakan. **Dengan papan (F):** kelompok merencanakan proyek yang akan dirakit pada robotnya. **Tanpa papan:** kamu merencanakan proyek yang bisa dibangun dan diuji dengan simulasi di komputer. Kerjakan dalam kelompok kecil dan bagi tugas menurut peran.

## Keselamatan perangkat

- Rencana ini hanya kertas, tetapi ia menentukan keselamatan nanti: tuliskan batas daya (USB atau baterai AA/AAA yang disediakan guru; tidak ada listrik jaringan 220 V, baterai litium tanpa pelindung, atau pengisian daya litium oleh murid) dan tanpa solder.
- Setiap risiko fisik pada rencana mendapat tindakan pencegahan: uji dengan roda terangkat, meja bertepi, pemutus daya yang diketahui letaknya, dan langkah bila ada bagian panas atau berbau.
- Proyek yang memerlukan kamera atau mikrofon yang merekam orang, sensor tubuh, atau lokasi pribadi tidak termasuk jalur C. Proyek akhir tidak mengumpulkan data pribadi nyata.

## Ingat kembali

Jawab dari ingatan dulu, baru cek di kunci. Soal 1 dari `c-xii1-m5`, soal 2 dari `c-xii1-m10`, soal 3 dari `c-xii1-m12`.

1. Gambarkan diagram keadaan robot penghindar halangan dengan lima keadaan dan sebutkan syarat tiap panah.
2. Sebut dua tanda baterai lemah yang harus membuat robot berhenti, bukan terus berjalan.
3. Apa yang membuktikan sebuah rakitan benar, selain "sudah dipasang"?

## Tujuan

Setelah modul ini kamu dapat:

- merumuskan masalah dan pengguna proyek akhir dalam kebutuhan yang dapat diuji;
- menulis kriteria selesai dan prediksi hasil **sebelum** mengerjakan;
- menyusun rencana kerja: tugas, keluaran, peran, titik periksa, dan risiko beserta pencegahannya;
- memberi dan menerima umpan balik sejawat yang spesifik.

## Rencana proyek

Rencana proyek adalah janji yang dapat diperiksa. Ia memuat: **masalah dan pengguna** (fiktif, tanpa orang nyata); **kebutuhan terukur** seperti pada `c-xii1-m1`; **rancangan** (komponen, strategi, mesin keadaan, daya); **kriteria selesai**, yaitu pernyataan yang dapat diuji dan bisa gagal; **prediksi hasil** yang ditulis sekarang, supaya kamu belajar dari selisihnya; **rencana kerja** per minggu `C-XII2`; dan **risiko** dengan tindakan pencegahan dan peran penanggung jawab.

Contoh rencana (karangan, satu halaman):

```text
Proyek: robot pengantar kotak komponen antar dua meja lab (pengguna fiktif: guru lab)
Kebutuhan: (K1) menempuh 2 m jalur pita hitam dalam paling lama 40 detik; (K2) tidak lebih dari
  25 mm dari garis pada lari terburuk dari 10 lari; (K3) berhenti di AMAN bila garis hilang;
  (K4) beroperasi paling sedikit 30 menit; (K5) tanpa data pribadi.
Rancangan: dua motor DC lewat pengendali, lima sensor garis, strategi proporsional (dasar: modul 8 dan 9),
  mesin keadaan DIAM, MAJU, AMAN, daya 4 sel AA lewat pemantau tegangan.
Kriteria selesai: 10 lari berturut-turut, 0 lari melampaui 25 mm, 0 lari tanpa berhenti saat garis hilang,
  lembar periksa daya lolos, panduan perakitan berhasil diikuti kelompok lain.
Prediksi: waktu tempuh 30 sampai 36 detik; satu dari sepuluh lari mendekati 25 mm.
Rencana kerja: M5 rancangan; M6 rangkaian teruji; M7 program inti; M8 pencatatan lokal; M9 penyempurnaan;
  M10 ulasan sejawat; M11 pengujian akhir; M12 dokumentasi; M13 presentasi.
Risiko: baterai lemah di tengah lari (pemantau tegangan, peran: penanggung jawab daya);
  jadwal terlambat (potong fitur pencatatan, peran: koordinator).
```

Perhatikan bahwa K2 dan K3 dapat gagal: itu yang membuatnya kriteria, bukan harapan. "Robot bekerja dengan baik" tidak dapat gagal sehingga tidak dapat diuji.

## Daftar periksa

Kerjakan berurutan; tiap titik periksa harus dapat ditunjukkan kepada orang lain.

1. `AI: boleh` **Masalah.** Tulis masalah dan pengguna fiktif dalam dua kalimat. Titik periksa: orang lain dapat menyebut masalahnya kembali.
2. `AI: tanpa AI` **Kebutuhan.** Tulis tiga sampai lima kebutuhan dengan angka, satuan, dan cara ukur. Titik periksa: tiap butir dapat gagal.
3. `AI: boleh` **Rancangan dan risiko.** Pilih komponen dan strategi, dan tulis lembar periksa daya awal serta catatan kepatuhan awal (modul 10 dan 11). Titik periksa: tidak ada sensor yang merekam orang.
4. `AI: tanpa AI` **Kriteria dan prediksi.** Tulis kriteria selesai dan prediksi hasilmu. Titik periksa: prediksi ditulis sebelum merakit.
5. `AI: boleh` **Rencana kerja.** Petakan tugas ke `C-XII2-M5` sampai `M13` dengan satu peran per tugas. Titik periksa: tiap minggu punya keluaran yang dapat dilihat.
6. *Opsional:* **catatan pemakaian AI.** Bila memakai AI generatif pada nomor 1, 3, atau 5, tulis dulu draf sendiri, lalu minta kritik, bukan rencana jadi. Catat alatnya, tujuanmu, garis besar perintahmu, bagian yang kamu pakai, dan cara memeriksanya. Jangan menaruh data pribadi pada perintah.

## Umpan balik sejawat

Tukar rencana dengan kelompok lain. Beri masukan dalam tiga bagian: **satu yang sudah baik**, **satu yang perlu diperbaiki**, dan **satu langkah berikutnya**. Bagian yang perlu diperbaiki menyebut butir tertentu, misalnya "K4 tidak menyebut cara ukur", bukan "kurang jelas". Pemrograman berpasangan paling banyak dibuktikan pada mahasiswa, jadi anggap ulasan berpasangan ini praktik yang layak dicoba, bukan jaminan hasil.

## Latihan bercampur

1. Dari modul 8: ubah kebutuhan "robot harus stabil" menjadi syarat wajib yang dapat dihitung dari tabel hasil uji.
2. Dari modul 10 dan 11: sebut satu butir lembar periksa daya dan satu butir catatan kepatuhan yang harus sudah ada di rencana sebelum merakit.

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `C-XII1-M14` (sekitar satu minggu lagi), `C-XII2-M2` (sekitar tiga minggu lagi), dan `C-XII2-M7` (sekitar delapan minggu lagi). Jawab sekarang lalu simpan.

1. Sebut bagian-bagian rencana proyek yang membuat kemajuan dapat diperiksa.
2. Mengapa kriteria selesai ditulis sebelum mengerjakan? Beri satu contoh kriteria yang dapat diuji.
3. Mengapa risiko ditulis bersama tindakan pencegahan dan penanggung jawabnya?

## Kesalahan umum

- **Kriteria yang tidak dapat gagal.** "Berfungsi dengan baik" tidak dapat diuji.
- **Menulis prediksi sesudah hasil.** Itu bukan prediksi, dan kamu kehilangan kesempatan belajar dari selisihnya.
- **Rencana tanpa peran.** Tugas tanpa penanggung jawab jarang selesai.
- **Mengabaikan batas keselamatan dan privasi saat merancang.** Memperbaikinya belakangan mahal.
- **Memasukkan terlalu banyak fitur.** Tulis fitur yang boleh dipotong lebih dulu.

## Cek mandiri

- [ ] Kebutuhanku punya angka, satuan, dan cara ukur.
- [ ] Kriteria selesaiku dapat gagal.
- [ ] Prediksiku ditulis sebelum mengerjakan.
- [ ] Setiap risiko punya pencegahan dan peran.
- [ ] Rencanaku tidak memuat sensor yang merekam orang atau data pribadi nyata.

## Kunci dan petunjuk

**Ingat kembali.** 1: DIAM menuju MAJU bila tombol ditekan; MAJU menuju MUNDUR bila jarak di bawah 15 cm; MUNDUR menuju BELOK setelah 500 ms; BELOK menuju MAJU setelah 600 ms; MAJU menuju AMAN bila tiga pembacaan jarak gagal beruntun; AMAN menuju DIAM bila tombol ditekan. 2: contoh: tegangan baterai di bawah ambang BERHENTI, atau papan yang sering mati ulang saat motor menyala. 3: uji penerimaan yang hasilnya terlihat, misalnya roda terangkat berputar maju saat tombol ditekan dan berhenti saat tombol berhenti ditekan.

**Rencana proyek.** Rencana yang baik memiliki kebutuhan yang dapat gagal, kriteria selesai yang menyebut angka, prediksi bertanggal sebelum mengerjakan, dan risiko dengan pencegahan serta peran. Bandingkan rencanamu dengan contoh: tiap butir kebutuhan harus punya cara ukur, dan tiap kriteria harus dapat dijawab "ya" atau "tidak".

**Daftar periksa.** Rubrik singkat: nomor 1 dua kalimat dengan masalah yang jelas; nomor 2 tiap butir ada angka, satuan, dan cara ukur; nomor 3 komponen, strategi, daya, dan catatan kepatuhan yang konsisten; nomor 4 kriteria dapat gagal dan prediksi bertanggal; nomor 5 satu peran per tugas dan satu keluaran per minggu; nomor 6 opsional.

**Umpan balik sejawat.** Umpan balik yang baik menyebut butir, bukan kesan umum, dan memberi langkah yang bisa dikerjakan minggu depan.

**Latihan bercampur.** 1: contoh: "pada 10 lari simpangan terbesar tidak lebih dari 25 mm"; syarat wajib lalu dihitung dari nilai terburuk, seperti pada modul 8 dan 9. 2: contoh: lembar periksa daya: tegangan pin aman; catatan kepatuhan: tidak ada fitur yang merekam orang.

**Ulang berjarak.** 1: masalah dan pengguna, kebutuhan terukur, rancangan, kriteria selesai, prediksi, rencana kerja per minggu, dan risiko dengan pencegahan dan peran. 2: supaya kriteria tidak disesuaikan dengan hasil; contoh: "10 lari berturut-turut tanpa melampaui 25 mm". 3: risiko tanpa pencegahan hanya daftar kekhawatiran, dan tanpa penanggung jawab tidak ada yang bertindak.

## Langkah berikutnya

Modul berikut: `C-XII1-M14` (asesmen dan refleksi semester ini), lalu `C-XII2-M1` (pemeliharaan program). Bacaan lanjut: Panduan Mata Pelajaran Informatika (lihat Rujukan).
