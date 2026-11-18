## Untuk siapa modul ini

Modul ini untuk siswa kelas XI yang sudah membaca `cloud-iaas-paas-saas` dan memahami alamat IP, DNS, dan HTTP secara konseptual (`FND-X1-M4`). Ia pengayaan di luar jam wajib; semua kegiatan berupa simulasi dan perhitungan di kertas.

Setelah mempelajari modul ini, kamu diharapkan bisa menyebut jenis layanan cloud yang umum, menjelaskan region dan zona ketersediaan, dan menimbang kecepatan, ketersediaan, serta lokasi data saat memilih tempat menaruh sebuah layanan.

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
- **Zona ketersediaan** adalah bagian terpisah di dalam satu region, dengan listrik dan jaringan yang dibuat agak terpisah supaya gangguan di satu bagian tidak langsung menjatuhkan bagian lain. Istilah dan rincian sedikit berbeda antarpenyedia (contoh penjelasan resmi: https://aws.amazon.com/about-aws/global-infrastructure/regions_az/, diakses 2026-11-19; halaman tidak dibaca rinci, jadi ketepatan istilah `[belum terverifikasi]`).

Yang dipengaruhi pilihan region:

1. **Latensi** (waktu tunggu): makin jauh dari pengguna, makin lama. Cahaya pun butuh waktu menempuh jarak.
2. **Ketersediaan**: menaruh salinan di beberapa zona atau region membuat layanan lebih tahan gangguan, tetapi biayanya naik.
3. **Lokasi data**: data di region luar negeri bisa tunduk pada aturan hukum di sana. Untuk data pribadi, aturan Indonesia dan kebijakan sekolah wajib dicek lebih dulu; modul keamanan membahas ini secara pokok.
4. **Biaya**: harga bisa berbeda antarregion.

## Redundansi

Redundansi berarti memiliki cadangan agar satu kegagalan tidak menghentikan semuanya, misalnya dua server yang berisi hal sama. Pertanyaan pokoknya: "kalau yang ini mati, apa yang terjadi?"

## Latihan

**Latihan 1: peta region fiktif.** Gambar peta karangan dengan tiga region (Utara, Tengah, Selatan) dan dua zona di tiap region. Sekolah berada dekat Tengah. Tandai region terbaik untuk situs absensi dan alasannya.

Petunjuk jawaban: Tengah, karena dekat pengguna (latensi rendah); penjelasan yang menyebut latensi dan, bila data pribadi, lokasi data dinilai benar.

**Latihan 2: hitung waktu tunggu (angka ilustrasi, bukan data nyata).** Misalkan waktu tunggu ke region dekat 20 milidetik dan ke region jauh 200 milidetik. Satu halaman perlu 10 permintaan berurutan. Hitung total waktu tunggu masing-masing.

Petunjuk jawaban: dekat 10 x 20 = 200 milidetik; jauh 10 x 200 = 2000 milidetik (2 detik).

**Latihan 3: kartu gangguan.** Dalam permainan peran, satu zona "padam". Layanan A hanya ada di zona itu, layanan B ada di dua zona. Apa yang dialami pengguna masing-masing?

Petunjuk jawaban: A tidak tersedia; B tetap berjalan (mungkin lebih lambat). Salinan di dua zona menambah ketersediaan dan biaya.

**Latihan 4: data dan hukum.** Tulis dua pertanyaan yang perlu dijawab sebelum menaruh data pribadi di region luar negeri.

Petunjuk jawaban: contoh pertanyaan: apakah ada dasar hukum dan izin untuk memindahkan data? Siapa yang bertanggung jawab bila terjadi kebocoran? Jawab dengan konsultasi guru atau sekolah, bukan kesimpulan sendiri.
