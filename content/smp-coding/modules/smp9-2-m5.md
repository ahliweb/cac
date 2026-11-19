## Untuk siapa modul ini

Modul ini untuk murid kelas 9 pada minggu kelima semester kedua, tahap menguji produk proyek akhir dengan pengguna. Kamu bekerja dalam tim kecil dengan produk minggu lalu, kertas catatan, dan satu calon pengguna yang dipilih bersama gurumu. Tidak ada kode baru yang ditulis. Waktunya satu pertemuan, 2 JP, dan hasilnya catatan uji dan daftar perbaikan. Prasyaratnya `SMP9-2-M4` (produk berjalan). Semua contoh di modul ini rekaan.

## Ingat kembali

Tutup modul ini dan jawab dari ingatan.

1. Tulis tiga kasus uji dan satu pertanyaan yang kamu ajukan kepada pengguna yang menguji produkmu. (`SMP9-1-M12`)
2. Sebut dua hal yang tidak boleh dikumpulkan dari pengguna ketika menanyakan persoalannya. (`SMP9-2-M1`)
3. Telusuri program piket untuk masukan `Selasa` dan `Kamis`. (`SMP9-2-M4`)
4. Sebut bagian satu kasus uji: masukan, hasil diharapkan, dan hasil sebenarnya. (`SMP8-1-M11`)

Kunci: (1) contoh: hari yang ada (`Selasa`), hari yang tidak ada (`Kamis`), masukan kosong, masing-masing dengan hasil diharapkan; pertanyaan terbuka, misalnya "bagian mana yang membuatmu ragu?"; (2) nama atau data pribadi lain, dan foto atau rekaman suara; (3) `Selasa`: `Piket Selasa: Murid-03` lewat cabang `else`; `Kamis`: `Tidak ada jadwal untuk Kamis` lewat cabang `if`; (4) masukan, hasil diharapkan, hasil sebenarnya.

## Tujuan

Setelah modul ini kamu dapat:

1. menjalankan sesi uji dengan satu pengguna tanpa membantunya;
2. mencatat apa yang terjadi, terpisah dari tafsirmu;
3. menanyakan pertanyaan terbuka yang tidak mengarahkan jawaban;
4. menyusun daftar perbaikan dengan urutan pengerjaan.

## Prediksi dulu

Dua catatan rekaan dari sesi uji produk piket:

- **Catatan X.** "Pengguna-A bingung. Produknya mungkin kurang bagus."
- **Catatan Y.** "Pengguna-A mengetik `senin`. Layar menampilkan `Tidak ada jadwal untuk senin`. Ia diam sekitar sepuluh detik, lalu mengetik `Senin`."

**Prediksi.** Catatan mana yang lebih berguna untuk memperbaiki produk? Tulis dulu satu alasan untuk tiap catatan.

## Contoh terselesaikan

Karena ini minggu pengujian, contohnya berupa **contoh sesi uji**. Catatan Y lebih berguna: ia menyebut masukan, keluaran, dan apa yang dilakukan pengguna, sehingga perbaikannya jelas. Catatan X hanya tafsiran. Langkah satu sesi:

1. Beri satu tugas, misalnya "cari tahu siapa piket hari Selasa", tanpa menjelaskan cara memakai.
2. Diam dan amati. Jangan membantu, membela produk, atau menunjuk layar.
3. Catat apa yang terjadi: masukan, keluaran, dan jeda. Tafsir ditulis di kolom terpisah.
4. Tanyakan pertanyaan terbuka: "Bagian mana yang membuatmu ragu?" Hindari "Bagus, kan?".
5. Ucapkan terima kasih. Pengguna boleh berhenti kapan saja.

Catatan uji tiga pengguna rekaan, dengan keluaran sebenarnya dari produk minggu lalu:

| Pengguna | Masukan | Yang terjadi | Hasil diharapkan |
| --- | --- | --- | --- |
| Pengguna-A | `senin` | `Tidak ada jadwal untuk senin`; ragu sepuluh detik | `Piket Senin: Murid-01, Murid-02` |
| Pengguna-B | `Selasa ` (spasi di ujung) | `Tidak ada jadwal untuk Selasa ` | `Piket Selasa: Murid-03` |
| Pengguna-C | `Rabu` | `Piket Rabu: Murid-04, Murid-05` | sama |

Daftar perbaikan, diurutkan menurut dampak bagi pengguna dan usaha mengerjakannya:

| Temuan | Dampak | Usaha | Urutan |
| --- | --- | --- | --- |
| Huruf kecil dianggap hari yang tidak ada | tinggi | kecil | 1 |
| Spasi di ujung dianggap hari yang tidak ada | sedang | kecil | 2 |
| Masukan kosong menampilkan pesan yang aneh | sedang | kecil | 3 |
| Menampilkan jadwal mingguan sekaligus | rendah | besar | ditunda |

Temuan dampak tinggi dan usaha kecil dikerjakan lebih dulu; yang besar dan berdampak rendah ditunda, dan penundaan itu ditulis di laporan.

## Contoh setengah jadi

Catatan uji untuk produk timmu. Isi tabel dengan satu pengguna yang dipilih bersama gurumu; tanpa nama.

| Pengguna | Masukan | Yang terjadi | Hasil diharapkan |
| --- | --- | --- | --- |
| Pengguna-A | ____ | ____ | ____ |

| Temuan | Dampak | Usaha | Urutan |
| --- | --- | --- | --- |
| ____ | ____ | ____ | ____ |

## Susun urutannya

Dilewati: minggu pengujian memakai catatan uji, bukan satu program berurutan.

## Latihan

1. **Bedakan.** Tulis ulang "pengguna kesal karena hasilnya lambat" menjadi catatan yang hanya berisi apa yang terjadi.
2. **Ubah.** Ganti pertanyaan "Bagus, kan?" menjadi pertanyaan terbuka.
3. **Uji.** Jalankan satu sesi dengan satu pengguna tanpa membantu, lalu isi catatan uji dan daftar perbaikan.
4. **Jelaskan.** Jelaskan mengapa pengamat tidak boleh membantu pengguna di tengah sesi.

## Latihan bercampur

1. `"Selasa" == "selasa"` bernilai apa? (`SMP8-2-M4`)
2. Apa hasil `"  Rabu ".strip()`? (`SMP9-1-M2`)

## Ulang berjarak

Kerjakan ulang tanpa melihat modul ini, lalu cocokkan:

- **Minggu depan** (`SMP9-2-M6`): sebut dua cara memilih perbaikan mana yang dikerjakan dulu.
- **Beberapa minggu lagi** (`SMP9-2-M7`): tulis tiga kasus uji untuk produkmu dan hasil diharapkan masing-masing.
- **Akhir semester** (`SMP9-2-M13`): sebut satu hal yang kamu ubah karena catatan uji pengguna dan satu pertanyaan terbuka yang kamu ajukan.

## Kesalahan umum

- **Membantu pengguna di tengah sesi.** Kenali: kamu menunjuk layar atau mengetik untuknya.
- **Menulis tafsiran sebagai kenyataan.** Kenali: catatan memuat "bingung" atau "malas" tanpa apa yang dilakukannya.
- **Mengajukan pertanyaan yang mengarahkan.** Kenali: pertanyaan dijawab "ya" atau "bagus".
- **Mencatat nama atau merekam pengguna.** Kenali: ada nama asli, foto, atau rekaman suara.
- **Mengerjakan semua temuan sekaligus.** Kenali: tidak ada urutan atau alasan.

## Cek mandiri

Tutup modul, jawab tanpa melihat, lalu periksa.

1. Sebut lima langkah satu sesi uji.
2. Beri satu contoh pertanyaan terbuka dan satu yang mengarahkan.
3. Temuan mana yang dikerjakan dulu: dampak tinggi usaha besar, atau dampak sedang usaha kecil? Beri satu alasan.

Daftar periksa (kosong; kamu isi sendiri, tidak dikumpulkan):

- [ ] Catatan ujiku memisahkan kejadian dari tafsiran.
- [ ] Aku tidak mencatat nama, foto, atau suara pengguna.
- [ ] Daftar perbaikanku punya urutan dan satu yang ditunda dengan alasan.

Kunci: (1) beri tugas, amati tanpa membantu, catat kejadian, tanyakan pertanyaan terbuka, ucapkan terima kasih; (2) terbuka: "Bagian mana yang membuatmu ragu?"; mengarahkan: "Bagus, kan?"; (3) jawaban bebas yang beralasan; contoh: dampak sedang usaha kecil lebih dulu karena cepat selesai dan menambah nilai bagi pengguna; yang besar bisa ditunda dan ditulis di laporan.

## Langkah berikutnya

`SMP9-2-M6`, "Penyempurnaan". Kamu memperbaiki produk menurut daftar perbaikan dan mengujinya lagi dengan kasus yang sama.

## Catatan untuk guru

- **Waktu:** 2 JP x 40 menit `[asumsi]` (silabus bagian 2). Kerja tim boleh; bukan jaminan efek belajar.
- **Alat:** kertas catatan atau dokumen yang disediakan sekolah. Keluaran pada tabel catatan uji diperoleh penulis dengan menjalankan produk minggu lalu menggunakan `python3 -I` (Python 3.12.3) untuk masukan `senin`, `Selasa ` (spasi di ujung), dan `Rabu`. Penulis tidak menjalankan langkah di program dokumen mana pun; guru memeriksa bila tim memakai dokumen bersama.
- **Butir CP:** corpus memetakan minggu ini ke `DK-BK-b`. Modul tidak menyatakan CP "terpenuhi"; catatan uji dan daftar perbaikan dinilai guru dengan rubriknya sendiri.
- **Keluaran minggu:** catatan uji dan daftar perbaikan.
- **Kunci "Prediksi dulu":** Catatan Y; ia memuat masukan, keluaran, dan perilaku pengguna.
- **Kunci "Contoh setengah jadi":** jawaban bebas; periksa kejadian terpisah dari tafsiran, tanpa nama, dan ada urutan.
- **Kunci latihan:** (1) contoh: "pengguna menekan Enter, lalu menunggu sekitar lima detik sebelum menekan lagi", tanpa kata "kesal". (2) contoh: "Bagian mana yang membuatmu ragu?" (3) catatan lengkap dengan satu pengguna. (4) bantuan menyembunyikan masalah yang akan dialami pengguna lain.
- **Kunci "Latihan bercampur":** (1) `False`. (2) `'Rabu'`.
- **Petunjuk bertahap:** (a) tulis tugas satu kalimat; (b) amati tanpa bicara; (c) tulis kejadian; (d) urutkan temuan.
- **AI:** tanpa AI oleh murid. Kebijakan `smp-coding` (silabus bagian 7.1): AI generatif hanya demonstrasi guru, tanpa akun murid; murid tidak meminta AI menafsirkan catatan atau menyusun perbaikan; asesmen tanpa AI.
- **Privasi:** pengguna dipilih bersama guru dan dicatat sebagai `Pengguna-A` dan seterusnya; tanpa nama asli, foto, atau rekaman suara; pengguna boleh berhenti kapan saja; catatan nilai tidak masuk repositori.
- **Unsur pembelajaran:** ingat kembali dan jarak (`K`), catatan uji menggantikan contoh terselesaikan (`M`), PRIMM (`K` usia 11 sampai 14), umpan balik berisi (`K`), latihan bercampur (`K`).
