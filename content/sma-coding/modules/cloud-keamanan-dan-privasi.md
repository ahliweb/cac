## Untuk siapa modul ini

Modul ini untuk siswa kelas XI atau XII yang sudah membaca `cloud-tanggung-jawab-bersama` dan mempelajari keamanan dasar (`FND-X1-M6`). Ia pengayaan di luar jam wajib, tanpa akun dan tanpa data pribadi nyata. Semua latihan memakai data karangan.

Setelah mempelajari modul ini, kamu diharapkan bisa menerapkan prinsip keamanan dasar untuk data di cloud, menjelaskan apa itu data pribadi dan mengapa penanganannya khusus, dan menjelaskan secara konseptual untuk apa standar ISO/IEC 27017 dan 27018 dibuat.

## Prinsip keamanan dasar

| Prinsip | Artinya | Contoh |
| --- | --- | --- |
| Hak akses minimum | beri akses secukupnya, hanya yang perlu, hanya selama perlu | anggota klub boleh membaca, hanya bendahara boleh mengubah |
| Kata sandi kuat dan unik | panjang, tidak dipakai ulang, disimpan di manajer kata sandi | satu kata sandi untuk satu layanan |
| Autentikasi dua langkah | selain kata sandi ada faktor kedua | kode dari aplikasi di ponsel |
| Enkripsi saat disimpan dan saat dikirim | data diacak agar tak terbaca tanpa kunci | tanda HTTPS saat membuka situs |
| Pencatatan akses (log) | mencatat siapa melakukan apa dan kapan | menelusuri akses yang janggal |
| Pencadangan | salinan data yang terpisah | pulihkan berkas yang terhapus tak sengaja |
| Rahasia tidak di berkas bersama | kunci dan token tidak ditempel di kode, layar, atau pesan | simpan di variabel lingkungan atau berkas yang tidak dibagikan |

Ingat model tanggung jawab bersama: data dan akun selalu bagian pengguna.

## Data pribadi di cloud

Data pribadi adalah data tentang orang yang dapat dikenali, misalnya nama lengkap, alamat, nomor identitas, atau foto. Di Indonesia, pelindungannya diatur Undang-Undang Pelindungan Data Pribadi (UU PDP, Nomor 27 Tahun 2022). Modul ini hanya mengenalkannya secara pokok, tanpa mengutip pasal. Isi dan kewajiban rincinya `[belum terverifikasi]` pada akses 2026-11-19; rujukan resmi dan arahan guru atau sekolah yang berlaku.

Aturan latihan di seri ini: **jangan memasukkan data pribadi siswa atau orang lain ke layanan mana pun**. Pakai nama dan data karangan yang jelas palsu.

## Pengantar konseptual ISO/IEC 27017 dan 27018

Bagian ini hanya gambaran, bukan pembahasan pasal.

- **ISO/IEC 27017** adalah panduan kendali keamanan informasi untuk penyediaan dan pemakaian layanan cloud. Ia menambah panduan di atas standar keamanan informasi yang lebih umum, dan berguna bagi penyedia maupun pelanggan. Halaman resmi ISO tidak dapat dibuka (HTTP 403 pada 2026-11-19), jadi edisi terbaru dan isinya `[belum terverifikasi]` dari sumber resmi.
- **ISO/IEC 27018** adalah panduan perlindungan data pribadi (PII) pada cloud publik, ketika penyedia bertindak sebagai pemroses data pribadi atas instruksi pelanggan. Isi pasalnya `[belum terverifikasi]`.

Pesan untukmu: ada standar yang menjelaskan apa yang pantas diharapkan dari penyedia dan pelanggan. Menyebut standar ini **bukan** berarti penyedia atau repositori ini tersertifikasi; untuk klaim seperti itu periksa sertifikat resmi penyedia.

## Latihan

**Latihan 1: hak akses minimum.** Sebuah folder fiktif berisi tiga berkas: "daftar-acara", "anggaran", "foto-kegiatan". Ada tiga peran: ketua, bendahara, anggota biasa. Tulis tabel siapa boleh membaca atau mengubah apa.

Petunjuk jawaban: anggota biasa hanya membaca daftar acara dan foto; bendahara membaca dan mengubah anggaran; ketua membaca semua dan mengubah daftar acara. Jawaban lain valid bila alasannya menerapkan akses minimum.

**Latihan 2: audit kata sandi (data sintetis).** Dari daftar karangan: "123456", "kelas11ipa", "k7#Rp9!vQ2mLw4". Nilai kekuatan masing-masing dan alasannya.

Petunjuk jawaban: dua pertama lemah (urutan angka, pendek dan mudah ditebak); yang ketiga panjang dan acak sehingga kuat, tetapi tetap harus unik dan disimpan di manajer kata sandi.

**Latihan 3: tebak apa yang bocor.** Bacakan lima kartu fiktif: "kunci ditempel di grup pesan", "folder dibagikan ke publik", "satu kata sandi untuk semua", "tidak ada log", "tidak ada cadangan". Tulis dampak dan perbaikannya.

Petunjuk jawaban: kunci bocor, cabut dan putar; folder publik, ubah izin; kata sandi sama, buat unik dan nyalakan autentikasi dua langkah; tanpa log sulit melacak, aktifkan pencatatan; tanpa cadangan data hilang permanen, buat cadangan terpisah.

**Latihan 4: menjelaskan standar.** Dengan kata-katamu sendiri dan tanpa menyalin pasal, jelaskan dalam tiga kalimat perbedaan fokus ISO/IEC 27017 dan 27018.

Petunjuk jawaban: 27017 tentang kendali keamanan layanan cloud secara umum; 27018 tentang perlindungan data pribadi di cloud publik.

**Latihan 5: keputusan.** Sekolah fiktif ingin mengunggah nilai siswa beserta nama asli ke layanan daring gratis. Tulis tiga pertanyaan yang perlu dijawab sebelum setuju dan siapa yang berhak memutuskan.

Petunjuk jawaban: pertanyaan tentang dasar hukum dan izin, lokasi dan perlindungan data, serta siapa pengelola akses; keputusan ada pada sekolah dan pihak yang berwenang, bukan siswa sendiri.
