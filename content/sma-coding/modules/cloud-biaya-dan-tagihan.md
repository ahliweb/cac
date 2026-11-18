## Untuk siapa modul ini

Modul ini untuk siswa kelas XI yang sudah membaca `cloud-iaas-paas-saas` dan mempelajari keamanan dasar (`FND-X1-M6`). Ia pengayaan di luar jam wajib. Tidak ada kegiatan yang meminta akun, kartu pembayaran, atau layanan nyata; semua hitungan memakai angka karangan.

> **Peringatan biaya.** Layanan cloud sungguhan dapat menimbulkan tagihan, terkadang besar dan tak terduga. Modul ini tidak mewajibkan siapa pun membuat akun. Bila kamu atau keluargamu tertarik mencoba sendiri, itu keputusan orang tua atau wali, tidak dinilai, dan sebaiknya dimulai dari pembacaan syarat resmi penyedia.

Setelah mempelajari modul ini, kamu diharapkan bisa membaca model tarif, memperkirakan biaya dari angka ilustrasi, mengenali jebakan tagihan, dan menjelaskan fungsi anggaran dan peringatan.

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

Banyak penyedia menawarkan tingkat gratis atau kredit uji coba. Syaratnya berbeda dan berubah. Sebagai contoh, halaman resmi satu penyedia pada 2026-11-19 menyebut rencana gratis untuk akun baru berupa kredit hingga sekitar 200 dolar AS selama 6 bulan, dan akun ditutup pada akhir periode atau ketika kredit habis; ditulis pula bahwa tagihan tidak muncul kecuali akun beralih ke rencana berbayar (sumber: https://aws.amazon.com/free/, diakses 2026-11-19). Halaman itu tidak menyebut apakah kartu kredit diperlukan, jadi hal itu `[belum terverifikasi]`. Jangan menganggap contoh ini berlaku bagi penyedia lain atau bagi kamu.

Untuk program pendidikan, GitHub Education menyebut dokumentasi resminya bahwa pelamar adalah pelajar atau pengajar di lembaga pendidikan terakreditasi; batas usia tidak tertulis di halaman itu (sumber: https://docs.github.com/en/education/about-github-education/github-education-for-students/about-github-education-for-students, diakses 2026-11-19). Rincian lain (isi paket, kartu, verifikasi) `[belum terverifikasi]`; periksa halaman resminya saat itu. Program serupa dari penyedia lain tidak diperiksa dan tidak boleh diasumsikan.

## Jebakan tagihan umum

1. **Sumber daya terlupa**: komputer virtual dibiarkan menyala setelah latihan.
2. **Kunci bocor**: kunci akses terunggah ke repositori publik, lalu dipakai orang lain (misalnya untuk menambang mata uang kripto) dan tagihannya jatuh ke pemilik akun.
3. **Data keluar**: mengunduh banyak data dari cloud ke luar bisa mahal.
4. **Uji coba yang berubah berbayar**: periode gratis habis tanpa disadari.
5. **Salah paham satuan**: mengira per bulan padahal per jam.

## Anggaran dan peringatan

Penyedia pada umumnya menyediakan fitur untuk menetapkan batas anggaran dan mengirim peringatan saat pemakaian mendekati batas. Prinsip yang perlu diingat: pasang anggaran dan peringatan **sebelum** memakai layanan, hapus sumber daya setelah selesai, dan jangan pernah menaruh kunci di berkas yang dibagikan. Nama fitur dan cara kerjanya berbeda antarpenyedia `[belum terverifikasi]` di modul ini.

## Latihan

Semua angka adalah ilustrasi, bukan harga nyata. Gunakan kertas atau lembar kerja.

**Latihan 1: hitung tagihan komputer.** Sebuah komputer virtual karangan bertarif 0,05 dolar per jam (ilustrasi, bukan harga nyata). Dibiarkan menyala 30 hari, 24 jam sehari. Berapa tagihannya? Berapa bila dimatikan setelah 3 jam latihan?

Petunjuk jawaban: 30 x 24 = 720 jam; 720 x 0,05 = 36 dolar. Untuk 3 jam: 3 x 0,05 = 0,15 dolar.

**Latihan 2: ruang simpan.** Tarif penyimpanan karangan 0,02 dolar per gigabita per bulan (ilustrasi). Sebuah klub menyimpan 500 gigabita foto. Berapa per bulan dan per tahun?

Petunjuk jawaban: 500 x 0,02 = 10 dolar per bulan; 12 x 10 = 120 dolar per tahun.

**Latihan 3: data keluar.** Tarif data keluar karangan 0,09 dolar per gigabita (ilustrasi). Sebuah video 2 gigabita diunduh 300 kali. Berapa biayanya?

Petunjuk jawaban: 2 x 300 = 600 gigabita; 600 x 0,09 = 54 dolar.

**Latihan 4: lembar anggaran sintetis.** Buat lembar kerja dengan kolom layanan, jumlah pemakaian, tarif ilustrasi, dan subtotal, untuk tiga layanan karangan. Tambahkan baris total dan satu sel "batas anggaran" yang berubah warna saat total melebihi batas.

Petunjuk jawaban: gunakan rumus perkalian untuk subtotal dan penjumlahan untuk total; pewarnaan bersyarat atau rumus "jika" untuk batas. Mintalah guru memeriksa bahwa semua angka bertanda ilustrasi.

**Latihan 5: cerita kunci bocor.** Tuliskan lima langkah apa yang dilakukan pemilik akun fiktif begitu menyadari kunci akses terunggah ke repositori publik.

Petunjuk jawaban: cabut atau putar kunci (revoke) segera, tinjau aktivitas dan tagihan, hapus sumber daya asing, hubungi penyedia, hapus kunci dari riwayat repositori, dan pasang peringatan anggaran.
