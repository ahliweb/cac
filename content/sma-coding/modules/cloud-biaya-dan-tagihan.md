## Untuk siapa modul ini

Modul ini untuk siswa kelas XI yang sudah membaca `cloud-iaas-paas-saas` dan mempelajari keamanan dasar (`FND-X1-M6`). Ia pengayaan di luar jam wajib. Tidak ada kegiatan yang meminta akun, kartu pembayaran, atau layanan nyata; semua hitungan memakai angka karangan.

> **Peringatan biaya.** Layanan cloud sungguhan dapat menimbulkan tagihan, terkadang besar dan tak terduga. Modul ini tidak mewajibkan siapa pun membuat akun. Bila kamu atau keluargamu tertarik mencoba sendiri, itu keputusan orang tua atau wali, tidak dinilai, dan sebaiknya dimulai dari pembacaan syarat resmi penyedia.

Setelah mempelajari modul ini, kamu diharapkan bisa membaca model tarif, memperkirakan biaya dari angka ilustrasi, mengenali jebakan tagihan, dan menjelaskan fungsi anggaran dan peringatan.

Seri cloud berada di luar rumusan Capaian Pembelajaran. Butir F-LD-j (loka pasar, perbankan digital, dompet digital) hanya disentuh pada sisi keamanan biaya digital dan tidak dihitung terpenuhi oleh modul ini; loka pasar dan dompet digital dibahas di modul `pendamping-transaksi-digital-aman`.

## Ingat kembali

Tutup catatanmu dan tulis jawaban singkat sebelum membaca lanjut.

1. Apa arti ciri "terukur" pada cloud?
2. Mengapa data dan akun selalu menjadi bagian pengguna pada model tanggung jawab bersama?
3. Sebutkan dua hal yang tidak boleh ditempel di kode, layar, atau pesan. (`FND-X1-M6`)

Cocokkan: (1) pemakaian dihitung dan biasanya menjadi dasar tagihan; (2) penyedia tidak menentukan siapa yang boleh mengakses dan tidak mengendalikan kata sandimu; (3) misalnya kata sandi, kunci akses, dan token. Bila ada yang meleset, baca ulang `cloud-tanggung-jawab-bersama`.

## Model tarif

Karena cloud bersifat terukur, tagihan biasanya dihitung dari pemakaian. Satuan yang sering muncul:

| Dasar tarif | Contoh satuan | Catatan |
| --- | --- | --- |
| Waktu | per jam atau per detik komputer menyala | mati tidak selalu berarti gratis (penyimpanan tetap ditagih) |
| Ruang | per gigabita per bulan | berkas lama yang terlupa tetap ditagih |
| Permintaan | per sejuta permintaan | ramai berarti mahal |
| Data keluar | per gigabita yang dikirim keluar dari penyedia | data masuk sering murah, data keluar tidak selalu |

Semua angka dalam modul ini **ilustrasi, bukan harga nyata**. Harga nyata ada di halaman resmi tiap penyedia dan berubah-ubah.

## Tingkat gratis dan batasnya

Banyak penyedia menawarkan tingkat gratis atau kredit uji coba. Syaratnya berbeda dan berubah. Sebagai contoh bertanggal, halaman resmi satu penyedia (https://aws.amazon.com/free/, dibuka 2026-11-19) menyebut rencana gratis untuk akun baru: 100 dolar AS kredit langsung ditambah sampai 100 dolar lagi dari menjelajahi layanan, jadi sampai 200 dolar selama 6 bulan. Akun ditutup sendiri setelah 6 bulan atau ketika kredit habis, dan tidak ada tagihan kecuali akun beralih ke rencana berbayar. Halaman itu tidak membahas apakah kartu kredit diperlukan, jadi jangan mengasumsikannya. Jangan menganggap contoh ini berlaku bagi penyedia lain, bagi kamu, atau pada tanggal lain.

Untuk program pendidikan, dokumentasi resmi GitHub Education (https://docs.github.com/en/education/about-github-education/github-education-for-students/about-github-education-for-students, dibuka 2026-11-19) menyebut bahwa pelamar adalah pelajar atau pengajar di lembaga pendidikan terakreditasi; batas usia tidak tertulis di halaman itu. Isi paket dan cara verifikasinya tidak dicek untuk modul ini; periksa halaman resminya saat itu. Program serupa dari penyedia lain tidak diperiksa dan tidak boleh diasumsikan.

## Jebakan tagihan umum

1. **Sumber daya terlupa**: komputer virtual dibiarkan menyala setelah latihan.
2. **Kunci bocor**: kunci akses terunggah ke repositori publik, lalu dipakai orang lain (misalnya untuk menambang mata uang kripto) dan tagihannya jatuh ke pemilik akun.
3. **Data keluar**: mengunduh banyak data dari cloud ke luar bisa mahal.
4. **Uji coba yang berubah berbayar**: periode gratis habis tanpa disadari.
5. **Salah paham satuan**: mengira per bulan padahal per jam.

## Anggaran dan peringatan

Penyedia pada umumnya menyediakan fitur untuk menetapkan batas anggaran dan mengirim peringatan saat pemakaian mendekati batas; nama dan cara kerjanya berbeda antarpenyedia dan tidak dicek untuk modul ini, jadi baca dokumentasi penyedia yang dipakai. Peringatan hanya memberi tahu; ia belum tentu menghentikan pemakaian. Prinsip yang perlu diingat: pasang anggaran dan peringatan **sebelum** memakai layanan, hapus sumber daya setelah selesai, jangan pernah menaruh kunci di berkas yang dibagikan, dan jangan menempelkan kunci, token, atau data akun ke asisten AI (aturan pemakaian AI di `FND-X1-M6` dan silabus).

## Contoh terselesaikan

**Soal fiktif (angka ilustrasi):** komputer virtual bertarif 0,10 dolar per jam menyala 8 jam. Ruang simpan 20 gigabita bertarif 0,02 dolar per gigabita per bulan. Berapa tagihan satu bulan bila komputer hanya menyala 8 jam dan ruang tetap dipakai?

1. Komputer: 8 x 0,10 = 0,80 dolar.
2. Ruang: 20 x 0,02 = 0,40 dolar per bulan (tetap ditagih walau komputer mati).
3. Total: 0,80 + 0,40 = **1,20 dolar**.

Perhatikan langkah 2: mematikan komputer tidak menghapus tagihan ruang. Latihan 1 dan 2 di bawah mengerjakan pola yang sama dengan bantuan lebih sedikit.

## Prediksi dulu

Sebelum menghitung Latihan 1, tulis tebakan tagihan satu bulan bila komputer dibiarkan menyala terus, lalu hitung dan catat selisihnya. Kesalahan menebak satuan (per jam atau per bulan) adalah salah satu jebakan tagihan yang paling mudah terjadi.

## Latihan

Semua angka adalah ilustrasi, bukan harga nyata. Gunakan kertas atau lembar kerja.

**Latihan 1: hitung tagihan komputer.** Sebuah komputer virtual karangan bertarif 0,05 dolar per jam (ilustrasi, bukan harga nyata). Dibiarkan menyala 30 hari, 24 jam sehari. Berapa tagihannya? Berapa bila dimatikan setelah 3 jam latihan?

Petunjuk jawaban: 30 x 24 = 720 jam; 720 x 0,05 = 36 dolar. Untuk 3 jam: 3 x 0,05 = 0,15 dolar. Bila tebakanmu jauh di bawah 36, periksa lagi apakah kamu menghitung jam atau hari; langkah berikutnya: tulis satuan di samping setiap angka.

**Latihan 2: ruang simpan.** Tarif penyimpanan karangan 0,02 dolar per gigabita per bulan (ilustrasi). Sebuah klub menyimpan 500 gigabita foto. Berapa per bulan dan per tahun?

Petunjuk jawaban: 500 x 0,02 = 10 dolar per bulan; 12 x 10 = 120 dolar per tahun. Bila hasilmu 10 dolar untuk setahun, kamu lupa mengalikan 12.

**Latihan 3: data keluar.** Tarif data keluar karangan 0,09 dolar per gigabita (ilustrasi). Sebuah video 2 gigabita diunduh 300 kali. Berapa biayanya?

Petunjuk jawaban: 2 x 300 = 600 gigabita; 600 x 0,09 = 54 dolar. Bila hasilmu 0,18, kamu menghitung satu unduhan; kalikan jumlah unduhan lebih dulu.

**Latihan 4: lembar anggaran sintetis.** Buat lembar kerja dengan kolom layanan, jumlah pemakaian, tarif ilustrasi, dan subtotal, untuk tiga layanan karangan. Tambahkan baris total dan satu sel "batas anggaran" yang berubah warna saat total melebihi batas.

Petunjuk jawaban: gunakan rumus perkalian untuk subtotal dan penjumlahan untuk total; pewarnaan bersyarat atau rumus "jika" untuk batas. Mintalah guru memeriksa bahwa semua angka bertanda ilustrasi.

**Latihan 5: cerita kunci bocor.** Tuliskan lima langkah apa yang dilakukan pemilik akun fiktif begitu menyadari kunci akses terunggah ke repositori publik.

Petunjuk jawaban (lima langkah berurutan): (1) cabut atau putar kunci (*revoke*) segera, karena kunci yang pernah terunggah ke repositori publik harus dianggap sudah dibaca orang lain; (2) tinjau aktivitas dan tagihan; (3) hapus sumber daya asing yang tidak kamu buat; (4) hubungi penyedia lewat kanal resmi; (5) pasang anggaran dan peringatan serta simpan kunci baru di luar kode. Menghapus kunci dari riwayat repositori boleh dilakukan, tetapi bukan pengaman: yang menutup risiko adalah kunci lama dicabut.

## Latihan bercampur

Soal berikut mencampur hitungan dan jebakan. Angka ilustrasi.

1. Klub fiktif menyalakan komputer virtual bertarif 0,05 dolar per jam untuk latihan 2 jam, lalu lupa mematikannya selama 10 hari. Berapa tagihan komputer itu? (Jangan hitung ruang simpan.)
2. Di hari kesepuluh, ketua menemukan komputer lain yang tidak pernah ia buat dan sedang bekerja berat. Jebakan apa yang paling mungkin, dan langkah pertamanya?
3. Tarif penyimpanan 0,02 dolar per gigabita per bulan; klub menyimpan 200 gigabita selama 6 bulan. Berapa totalnya? Apa jebakannya bila siswa mengira tarif itu per tahun?
4. Seorang siswa menempelkan kunci akses ke asisten AI untuk "meminta periksa kode". Apa aturannya dan apa yang harus dilakukan sekarang?

Petunjuk jawaban: (1) (2 + 240) jam x 0,05 = 242 x 0,05 = 12,10 dolar. (2) Kunci bocor dipakai orang lain; langkah pertama mencabut atau memutar kunci. (3) 200 x 0,02 = 4 dolar per bulan; 6 x 4 = 24 dolar; bila mengira per tahun, perkiraan tagihan jadi dua belas kali lebih kecil (kesalahan satuan). (4) Kunci, kata sandi, dan data pribadi tidak ditempel ke layanan AI; anggap kunci itu bocor, cabut atau putar, lalu pasang yang baru. Bila hitunganmu meleset, tulis satuan di samping tiap angka lalu ulangi.

## Ulang berjarak

Satu minggu lagi, lalu sebulan lagi, jawab tanpa membuka modul ini lalu cocokkan.

1. Sebutkan empat dasar tarif cloud dan satu contoh jebakan tiap dasar.
2. Mengapa mematikan komputer virtual tidak selalu menghentikan semua tagihan?
3. Tulis tiga hal yang kamu pasang atau lakukan sebelum memakai layanan cloud sungguhan.
