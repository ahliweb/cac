## Untuk siapa modul ini

Modul ini untuk siswa kelas XI yang sudah membaca `cloud-iaas-paas-saas` dan memahami alamat IP, DNS, dan HTTP secara konseptual (`FND-X1-M4`). Ia pengayaan di luar jam wajib; semua kegiatan berupa simulasi dan perhitungan di kertas.

Setelah mempelajari modul ini, kamu diharapkan bisa menyebut jenis layanan cloud yang umum, menjelaskan region dan zona ketersediaan, dan menimbang kecepatan, ketersediaan, serta lokasi data saat memilih tempat menaruh sebuah layanan.

Seri cloud berada di luar rumusan Capaian Pembelajaran. Butir F-BK-d (model jaringan, pengiriman data, pemecahan masalah) hanya disentuh sebagai konteks dan tidak dihitung terpenuhi oleh modul ini.

## Ingat kembali

Tutup catatanmu dan tulis jawaban singkat sebelum membaca lanjut.

1. Apa beda IaaS, PaaS, dan SaaS dalam satu kalimat?
2. Apa fungsi alamat IP dan apa fungsi DNS? (`FND-X1-M4`)
3. Mengapa membuka situs yang servernya jauh bisa terasa lebih lambat?

Cocokkan: (1) seberapa banyak yang kamu urus sendiri; (2) IP menunjuk perangkat, DNS menerjemahkan nama menjadi IP; (3) jaraknya lebih jauh dan paket melewati lebih banyak perangkat. Bila nomor 1 belum mantap, baca ulang `cloud-iaas-paas-saas`.

## Jenis layanan yang umum

| Jenis | Fungsi | Padanan di komputer sendiri |
| --- | --- | --- |
| Komputasi | menjalankan program | prosesor dan memori |
| Penyimpanan | menyimpan berkas atau objek | harddisk atau flashdisk |
| Basis data | menyimpan data terstruktur | berkas data atau basis data lokal |
| Jaringan | menghubungkan dan mengatur lalu lintas | router dan kabel |
| Kontainer | membungkus aplikasi beserta kebutuhannya agar sama di mana pun | folder proyek yang lengkap |

Nama produk berbeda-beda antarpenyedia; pelajari fungsinya, bukan namanya.

## Region dan zona ketersediaan

- **Region** adalah wilayah geografis tempat penyedia memiliki pusat data (misalnya satu kota atau negara).
- **Zona ketersediaan** adalah bagian terpisah di dalam satu region, dibuat agar gangguan di satu bagian tidak langsung menjatuhkan bagian lain.

Istilah dan rincian berbeda antarpenyedia. Sebagai contoh bertanggal, halaman resmi AWS (https://aws.amazon.com/about-aws/global-infrastructure/regions_az/, dibuka 2026-11-19) menyebut tiap region AWS terdiri atas minimal tiga zona yang terpisah fisik, dan tiap zona punya daya, pendinginan, serta keamanan fisik sendiri dan dihubungkan jaringan cepat yang berlapis cadangan. Halaman itu juga menyebut bahwa penyedia lain sering mendefinisikan region sebagai satu pusat data. Halaman yang sama memuat jumlah region dan zona (pada tanggal itu 39 region dan 124 zona); angka seperti ini cepat berubah, jadi jangan dihafal.

Yang dipengaruhi pilihan region:

1. **Latensi** (waktu tunggu): makin jauh dari pengguna, makin lama. Cahaya pun butuh waktu menempuh jarak, dan makin banyak perangkat yang dilalui paket, makin banyak pula waktu yang terpakai.
2. **Ketersediaan**: menaruh salinan di beberapa zona atau region membuat layanan lebih tahan gangguan, tetapi biayanya naik.
3. **Lokasi data**: data di region luar negeri bisa tunduk pada aturan hukum di sana. Untuk data pribadi, aturan Indonesia dan kebijakan sekolah wajib dicek lebih dulu; modul keamanan membahas ini secara pokok.
4. **Biaya**: harga bisa berbeda antarregion.

## Redundansi

Redundansi berarti memiliki cadangan agar satu kegagalan tidak menghentikan semuanya, misalnya dua server yang berisi hal sama. Pertanyaan pokoknya: "kalau yang ini mati, apa yang terjadi?"

## Contoh terselesaikan

**Soal fiktif:** situs perpustakaan sekolah punya pengguna di satu kota. Ada dua pilihan: region Dekat (latensi 20 milidetik, satu zona) atau region Jauh (latensi 200 milidetik, dua zona). Satu halaman butuh 4 permintaan berurutan.

1. Waktu tunggu Dekat: 4 x 20 = 80 milidetik. Jauh: 4 x 200 = 800 milidetik.
2. Ketersediaan: Dekat punya satu zona, jadi bila zona itu padam situs mati. Jauh punya dua zona, jadi tetap hidup.
3. Pertimbangan: situs perpustakaan tidak kritis dan tidak memuat data pribadi, jadi 80 milidetik lebih penting daripada cadangan zona. Pilihan: **Dekat**, dengan catatan risiko padam diterima.

Perhatikan bahwa jawabannya bergantung pada tujuan; bila situsnya kritis, jawabannya bisa berbalik. Latihan 1 dan 2 memudar dari contoh ini.

## Prediksi dulu

Sebelum menghitung Latihan 2, tebak dan tulis: berapa kali lebih lama waktu tunggu region jauh dibandingkan region dekat? Catat tebakanmu, hitung, lalu cocokkan. Selisih antara tebakan dan hasil menunjukkan seberapa baik kamu membayangkan latensi.

## Latihan

**Latihan 1: peta region fiktif.** Gambar peta karangan dengan tiga region (Utara, Tengah, Selatan) dan dua zona di tiap region. Sekolah berada dekat Tengah. Tandai region terbaik untuk situs absensi dan alasannya.

Petunjuk jawaban: Tengah, karena dekat pengguna (latensi rendah); penjelasan yang menyebut latensi dan, bila data pribadi, lokasi data dinilai benar.

**Latihan 2: hitung waktu tunggu (angka ilustrasi, bukan data nyata).** Misalkan waktu tunggu ke region dekat 20 milidetik dan ke region jauh 200 milidetik. Satu halaman perlu 10 permintaan berurutan. Hitung total waktu tunggu masing-masing.

Petunjuk jawaban: dekat 10 x 20 = 200 milidetik; jauh 10 x 200 = 2000 milidetik (2 detik); jauh 10 kali lebih lama. Bila tebakanmu jauh berbeda, ingat bahwa permintaan berurutan menjumlahkan waktu tunggunya.

**Latihan 3: kartu gangguan.** Dalam permainan peran, satu zona "padam". Layanan A hanya ada di zona itu, layanan B ada di dua zona. Apa yang dialami pengguna masing-masing?

Petunjuk jawaban: A tidak tersedia; B tetap berjalan (mungkin lebih lambat). Salinan di dua zona menambah ketersediaan dan biaya. Jelaskan dengan kalimatmu mengapa dua salinan di zona yang sama tidak membantu bila zona itu padam.

**Latihan 4: data dan hukum.** Tulis dua pertanyaan yang perlu dijawab sebelum menaruh data pribadi di region luar negeri.

Petunjuk jawaban: contoh pertanyaan: apakah ada dasar hukum dan izin untuk memindahkan data? Siapa yang bertanggung jawab bila terjadi kebocoran? Jawab dengan konsultasi guru atau sekolah, bukan kesimpulan sendiri.

## Latihan bercampur

Satu kasus fiktif yang memadukan modul ini dengan `cloud-iaas-paas-saas`. Sekolah Contoh ingin menaruh situs pengumuman kelulusan yang ramai dua hari setahun dan juga daftar nilai berisi nama siswa.

1. Untuk tiap bagian (pengumuman dan daftar nilai), pilih satu model layanan (IaaS, PaaS, atau SaaS) dan beri alasan.
2. Untuk tiap bagian, apakah kamu menaruhnya di region dekat, region jauh, atau tidak di cloud? Pertimbangkan latensi, ketersediaan, dan lokasi data.
3. Bandingkan dua opsi untuk pengumuman: satu zona murah atau dua zona lebih mahal. Tulis kompromi masing-masing.

Petunjuk jawaban: pengumuman: cocok di cloud karena elastis; region dekat; dua zona bila pengumuman penting dan anggaran ada, satu zona bila risiko padam diterima. Daftar nilai: data pribadi, jadi keputusan ada pada sekolah dan pihak berwenang, bukan siswa; cek dasar hukum dan lokasi data lebih dulu. Bila daftar nilai kamu jawab langsung "taruh di region termurah", baca ulang bagian lokasi data dan Latihan 4.

## Ulang berjarak

Satu minggu lagi, lalu sebulan lagi, jawab tanpa membuka modul ini lalu cocokkan.

1. Apa beda region dan zona ketersediaan?
2. Sebut empat hal yang dipengaruhi pilihan region.
3. Mengapa menaruh dua salinan di dua zona menambah ketersediaan tetapi juga biaya?
