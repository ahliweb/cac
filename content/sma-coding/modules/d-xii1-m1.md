## Untuk siapa modul ini

Modul ini untuk murid kelas XII jalur D (kecerdasan buatan dan analisis data), untuk minggu `D-XII1-M1` silabus v1.3: merumuskan proyek akhir, yaitu menentukan masalah dan kebutuhan pengguna fiktif dan menuliskannya sebagai dokumen kebutuhan. Prasyarat: modul `d-xi2-m7`; modul `D-XI2-M12` (kartu model) dan `D-XI2-M13` dari seri yang sama dirujuk di bawah. Kegiatannya memakai kertas dan teman bicara, tanpa pemrograman dan tanpa akun.

Modul ini berstatus DRAF: karangan penyusun, belum ditinjau pemilik. Jalur D adalah pengayaan di luar rumusan capaian pembelajaran (CP). Minggu ini tidak punya irisan pengayaan, jadi modul ini tidak dihitung memenuhi butir CP mana pun.

Aturan jalur D yang berlaku: data hanya sintetis (karangan) atau terbuka dengan lisensi jelas, tanpa data yang bisa mengenali orang; wajah, suara, dan foto orang tidak dipakai sebagai data; AI generatif boleh dipakai dengan etika dan dicatat, tanpa data pribadi, kata sandi, atau tugas bernilai pada permintaanmu, dan kamu tidak wajib punya akun. Saran: jawab dulu sendiri, baru minta AI memberi petunjuk bertahap. Setiap soal `Latihan` bertanda `AI: boleh` atau `AI: tanpa AI`.

Catatan untuk guru: semua tokoh, tempat, dan angka karangan penyusun; "Pustaka Contoh" dan "Bu Laras" bukan lembaga atau orang nyata. Pengguna di proyek ini fiktif sesuai silabus: murid tidak mewawancarai orang sungguhan tentang data pribadi mereka. Modul ini tidak memuat kode, sehingga tidak ada keluaran yang dijalankan.

## Ingat kembali

Jawab dari ingatan, baru cek di bagian kunci.

1. Sebutkan bagian satu neuron dan cara menghitung keluarannya. (dari `d-xi2-m7`)
2. Mengapa kartu model menyebut penggunaan yang di luar cakupannya? (dari `d-xi2-m12`)
3. Urutkan isi proyek model dari pertanyaan sampai kartu model. (dari `d-xi2-m13`)

## Tujuan

Setelah modul ini kamu dapat:

- menulis pernyataan masalah dengan empat bagian: pengguna, keputusan yang dibantu, masukan, dan keluaran;
- menyusun pertanyaan wawancara terbuka dan mengenali pertanyaan yang mengarahkan;
- menilai apakah masalah itu perlu pembelajaran mesin atau cukup aturan sederhana;
- menulis ukuran sukses dan batas penggunaan yang dapat diuji sebelum model dibuat;
- menyusun dokumen kebutuhan satu halaman untuk proyek akhirmu.

Keluaran yang diminta silabus: dokumen kebutuhan.

## Prediksi dulu

Perpustakaan desa fiktif "Pustaka Contoh" mencatat 200 peminjaman, dan 40 di antaranya (20 persen) dikembalikan terlambat. Tebak dan tulis, sebelum membaca lanjutannya:

1. Sebuah "model" yang selalu menjawab "tepat waktu" benar pada berapa persen peminjaman, dan menangkap berapa dari 40 yang terlambat?
2. Dari tiga kalimat kebutuhan berikut, mana yang dapat diuji dengan angka? (A) "Sistemnya harus pintar." (B) "Tandai peminjaman yang kemungkinan terlambat agar petugas mengirim pengingat; sasaran: menangkap sedikitnya 24 dari 40 yang terlambat." (C) "Modelnya harus akurat."

## Contoh terselesaikan

**Dari wawancara ke kebutuhan.** Bu Laras (tokoh karangan, pengelola Pustaka Contoh) diwawancarai teman sekelasmu yang memerankannya. Pertanyaan yang baik **terbuka dan menggali kejadian nyata**, bukan menawarkan jawaban: "Ceritakan kejadian terakhir ketika buku terlambat kembali", "Apa yang kamu lakukan sesudahnya?", "Apa yang paling merepotkan?". Pertanyaan yang **mengarahkan** seperti "Pasti kamu butuh AI untuk menebak keterlambatan, kan?" menghasilkan jawaban "ya" yang tidak berarti. Dari catatan wawancara: petugas hanya sempat mengirim pengingat ke sekitar 30 peminjam per minggu; buku terlambat membuat anggota lain menunggu; petugas tidak mau menolak orang meminjam.

**Pernyataan masalah.** Empat bagian: *pengguna* (petugas Pustaka Contoh), *keputusan yang dibantu* (siapa yang diberi pengingat lebih awal), *masukan* (tebal buku, lama pinjam, jenis buku, musim ujian), *keluaran* (tanda "kemungkinan terlambat" atau "tidak"). Manusia tetap memutuskan; model hanya memberi petunjuk.

**Perlu pembelajaran mesin?** Jawab dulu dengan pembanding. Aturan sederhana: "ingatkan semua yang meminjam buku lebih dari 300 halaman". Model selalu-"tepat waktu" benar pada 160 dari 200 peminjaman (80 persen), tetapi menangkap 0 dari 40. Maka ukuran sukses tidak boleh ketepatan saja. Ukuran yang diusulkan: *recall* (bagian yang benar-benar terlambat dan berhasil ditandai) sedikitnya 60 persen, yaitu 24 dari 40, dan *presisi* (bagian tanda yang memang benar) sedikitnya 50 persen, supaya pengingat tidak terbuang. Pembelajaran mesin dipakai bila ia mengalahkan aturan sederhana itu pada data yang belum dilihat.

| Bagian dokumen | Isi untuk Pustaka Contoh |
| --- | --- |
| Pengguna dan keputusan | petugas; siapa diberi pengingat lebih awal |
| Masukan dan keluaran | tebal, lama pinjam, jenis, musim ujian; tanda terlambat atau tidak |
| Data | 200 baris karangan, tanpa nama peminjam (lihat `d-xii1-m5`) |
| Pembanding | selalu "tepat waktu"; aturan "lebih dari 300 halaman" |
| Ukuran sukses | recall terlambat sedikitnya 60 persen dan presisi sedikitnya 50 persen pada data uji |
| Di luar cakupan | tidak boleh dipakai menolak orang meminjam |
| Risiko dan privasi | tidak memakai data pribadi; pengingat salah hanya merepotkan, bukan menghukum |

## Contoh setengah jadi

Warung fiktif "Warung Contoh" mencatat penjualan es teh harian dan pemiliknya, Pak Dimas (karangan), ingin menyiapkan stok. Lengkapi.

1. Keputusan yang dibantu: ____. Masukan: hari dalam seminggu, cuaca, dan ____. Keluaran: ____.
2. Pembanding sederhana: "stok sama dengan penjualan ____ kemarin".
3. Ukuran sukses yang dapat diuji (sebutkan angka): galat rata-rata kurang dari ____ gelas.
4. Satu batas penggunaan: ____.

## Soal susun urutan

Susun langkah merumuskan proyek menjadi urutan yang masuk akal.

```text
(a) tulis ukuran sukses dan batas penggunaan
(b) wawancarai pengguna fiktif dengan pertanyaan terbuka
(c) tulis pernyataan masalah empat bagian
(d) tentukan pembanding sederhana
(e) pilih masalah yang punya keputusan nyata untuk dibantu
```

## Latihan

1. **Wawancara berpasangan.** (`AI: tanpa AI`) Tulis lima pertanyaan terbuka untuk pengguna fiktif pilihanmu, lalu tandai dua pertanyaan mengarahkan yang kamu temukan di antara rancangan temanmu dan tulis ulang. Wawancarai temanmu yang memerankan tokoh itu.
2. **Pernyataan masalah.** (`AI: boleh`) Tulis empat bagian pernyataan masalah untuk proyek akhirmu. Bila memakai AI untuk memerankan tokoh fiktif, ingat jawabannya bukan bukti kebutuhan sungguhan.
3. **Aturan atau model?** (`AI: boleh`) Untuk tiap situasi, tulis aturan sederhana atau model dan alasannya: pengingat ulang tahun; menebak hasil panen dari curah hujan dan jumlah pupuk pada data karangan; membagi tamu ke meja; menandai ulasan produk yang bernada marah.
4. **Ukuran yang dapat diuji.** (`AI: tanpa AI`) Ubah "model harus akurat" menjadi ukuran dengan angka, data uji, dan pembanding.
5. **Catatan pemakaian AI (opsional).** Catat alat, tujuan, garis besar perintah, bagian yang dipakai, dan cara memeriksanya.

## Latihan bercampur

1. Dari `d-xi2-m12`: tulis satu kalimat "di luar cakupan" untuk dokumen kebutuhan Pustaka Contoh, selain yang sudah ada di tabel.
2. Dari `d-x2-m7`: model menandai 30 peminjaman, 24 di antaranya benar terlambat, dari 40 yang sebenarnya terlambat. Hitung presisi dan recall, lalu putuskan apakah ukuran sukses di atas terpenuhi.

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `d-xii1-m2` (sekitar satu minggu lagi), `d-xii1-m4` (sekitar tiga minggu lagi), dan `D-XII1-M9` (sekitar delapan minggu lagi). Jawab sekarang lalu simpan.

1. Apa empat bagian pernyataan masalah: pengguna, keputusan, masukan, dan keluaran?
2. Apa isi bagian "di luar cakupan" dan bagian "risiko dan privasi" di dokumen kebutuhan?
3. Apa tiga ciri kebutuhan yang dapat diuji, berbeda dari "modelnya harus akurat"?

## Kesalahan umum

- **"Proyek AI dimulai dari memilih algoritma."** Proyek dimulai dari keputusan yang ingin dibantu dan ukuran suksesnya.
- **"Kebutuhan sudah jelas bila kalimatnya meyakinkan."** Kebutuhan jelas bila bisa diuji dengan angka pada data uji.
- **"Pengguna fiktif dari AI membuktikan kebutuhan."** Tokoh karangan, termasuk yang diperankan AI, hanya latihan; ia bukan bukti.
- **"Ketepatan tinggi berarti sukses."** Pada data timpang, tebakan mayoritas sudah tinggi ketepatannya.

## Cek mandiri

- [ ] Saya dapat menulis pernyataan masalah empat bagian.
- [ ] Saya dapat mengenali dan menulis ulang pertanyaan wawancara yang mengarahkan.
- [ ] Saya dapat menilai perlu tidaknya pembelajaran mesin dengan pembanding.
- [ ] Saya dapat menulis ukuran sukses dan batas penggunaan yang dapat diuji.
- [ ] Saya mencatat pemakaian AI bila saya memakainya.

## Kunci dan petunjuk

**Ingat kembali.** 1: masukan `x`, bobot `w`, bias `b`; hitung `z` sebagai jumlah `w` kali `x` ditambah `b`, lalu masukkan ke fungsi aktivasi. 2: agar pembaca tahu kapan model tidak boleh dipakai, sehingga tidak disalahgunakan di luar data dan tujuannya. 3: pertanyaan, data, pembagian latih dan uji, pembanding, model, evaluasi, kartu model.

**Prediksi dulu.** 1: benar pada 160 dari 200 (80 persen), menangkap 0 dari 40. 2: hanya B yang dapat diuji karena memuat angka (24 dari 40); A dan C tidak punya ukuran, data uji, atau pembanding.

**Contoh setengah jadi.** Jawaban contoh (beberapa jawaban boleh): 1: berapa gelas es teh yang disiapkan besok; masukan ketiga: ada tidaknya acara di dekat warung; keluaran: perkiraan jumlah gelas. 2: pekan lalu pada hari yang sama atau kemarin. 3: angka yang kamu tentukan, mis. kurang dari 5 gelas, dengan alasan. 4: mis. tidak dipakai untuk memesan bahan mudah basi dalam jumlah besar tanpa pemeriksaan pemilik.

**Soal susun urutan.** e, b, c, d, a. Alasan: masalah dipilih dulu, pengguna diwawancarai, masalah ditulis, pembanding ditentukan, lalu ukuran sukses dan batas ditulis sebelum model dibuat.

**Latihan.** 1: rubrik: pertanyaan terbuka, menggali kejadian nyata, tidak menawarkan jawaban; contoh tulis ulang "Pasti kamu butuh aplikasi, kan?" menjadi "Bagaimana sekarang kamu mengatasinya?". 2: empat bagian lengkap, keputusan bersifat nyata, manusia tetap memutuskan. 3: pengingat ulang tahun: aturan; panen: model bila datanya cukup, dengan pembanding rata-rata; membagi tamu: aturan atau pencarian, bukan belajar dari data; ulasan marah: model teks, dengan pembanding daftar kata. 4: contoh: "pada 50 baris data uji, recall kelas terlambat sedikitnya 60 persen dan lebih baik daripada aturan 'lebih dari 300 halaman'". 5: opsional.

**Latihan bercampur.** 1: mis. tidak dipakai untuk menilai atau menegur individu peminjam. 2: presisi 24 dibagi 30 = 0,80; recall 24 dibagi 40 = 0,60; keduanya memenuhi (recall tepat 60 persen, presisi di atas 50 persen).

**Ulang berjarak.** 1: pengguna, keputusan yang dibantu, masukan, keluaran. 2: apa yang tidak boleh dilakukan dengan sistem, dan apakah data pribadi dipakai serta dampak bila tebakan salah. 3: ada angka, ada data uji, dan ada pembanding.

## Langkah berikutnya

Modul berikut: `d-xii1-m2` (studi kasus AI I), yang menimbang manfaat dan risiko sistem AI di bidang kesehatan dan pendidikan. Bacaan lanjut: panduan wawancara pengguna Nielsen Norman Group (bacaan tambahan; bukan sumber isi modul).
