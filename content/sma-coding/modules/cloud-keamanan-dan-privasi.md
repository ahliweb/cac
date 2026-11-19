## Untuk siapa modul ini

Modul ini untuk siswa kelas XI atau XII yang sudah membaca `cloud-tanggung-jawab-bersama` dan mempelajari keamanan dasar (`FND-X1-M6`). Ia pengayaan di luar jam wajib, tanpa akun dan tanpa data pribadi nyata. Semua latihan memakai data karangan.

Setelah mempelajari modul ini, kamu diharapkan bisa menerapkan prinsip keamanan dasar untuk data di cloud, menjelaskan apa itu data pribadi dan mengapa penanganannya khusus, dan menjelaskan secara konseptual untuk apa standar ISO/IEC 27017 dan 27018 dibuat.

Seri cloud berada di luar rumusan Capaian Pembelajaran. Butir E-LD-k, E-LD-l, F-LD-g, F-LD-i, dan F-LD-e hanya disentuh sebagai konteks dan tidak dihitung terpenuhi oleh modul ini.

## Ingat kembali

Tutup catatanmu dan tulis jawaban singkat sebelum membaca lanjut.

1. Apa bagian yang selalu menjadi tanggung jawab pengguna pada model tanggung jawab bersama?
2. Apa yang membuat kata sandi kuat? (`FND-X1-M6`)
3. Apa fungsi autentikasi dua langkah?
4. Apa bahayanya satu kata sandi yang sama untuk semua layanan?

Cocokkan: (1) data dan akun; (2) panjang, tidak mudah ditebak, unik per layanan; (3) faktor kedua menahan orang yang hanya tahu kata sandimu; (4) satu kebocoran membuka semua akun. Bila ada yang meleset, baca ulang `cloud-tanggung-jawab-bersama` dan `FND-X1-M6`.

## Prinsip keamanan dasar

| Prinsip | Artinya | Contoh |
| --- | --- | --- |
| Hak akses minimum | beri akses secukupnya, hanya yang perlu, hanya selama perlu | anggota klub boleh membaca, hanya bendahara boleh mengubah |
| Kata sandi kuat dan unik | panjang, tidak dipakai ulang, disimpan di manajer kata sandi | satu kata sandi untuk satu layanan |
| Autentikasi dua langkah | selain kata sandi ada faktor kedua | kode dari aplikasi di ponsel |
| Enkripsi saat disimpan dan saat dikirim | data diacak agar tak terbaca tanpa kunci | tanda HTTPS saat membuka situs |
| Pencatatan akses (log) | mencatat siapa melakukan apa dan kapan | menelusuri akses yang janggal |
| Pencadangan | salinan data yang terpisah | pulihkan berkas yang terhapus tak sengaja |
| Rahasia tidak di berkas bersama | kunci dan token tidak ditempel di kode, layar, pesan, atau permintaan ke layanan AI | simpan di variabel lingkungan atau berkas yang tidak dibagikan |

Ingat model tanggung jawab bersama: data dan akun selalu bagian pengguna.

## Data pribadi di cloud

Data pribadi adalah data tentang orang yang dapat dikenali, misalnya nama lengkap, alamat, nomor identitas, atau foto. Di Indonesia, pelindungannya diatur Undang-Undang Nomor 27 Tahun 2022 tentang Pelindungan Data Pribadi (UU PDP), ditetapkan 17 Oktober 2022 dan berstatus berlaku pada pangkalan data peraturan BPK (https://peraturan.bpk.go.id/Details/229798/uu-no-27-tahun-2022, dibuka 2026-11-19). Modul ini hanya mengenalkannya secara pokok, tanpa mengutip pasal; isi dan kewajiban rincinya tidak dibahas di sini, jadi rujuk teks resmi dan arahan guru atau sekolah yang berlaku.

Aturan latihan di seri ini: **jangan memasukkan data pribadi siswa atau orang lain ke layanan mana pun**. Pakai nama dan data karangan yang jelas palsu.

## Pengantar konseptual ISO/IEC 27017 dan 27018

Bagian ini hanya gambaran, bukan pembahasan pasal.

- **ISO/IEC 27017** adalah panduan kendali keamanan informasi untuk penyediaan dan pemakaian layanan cloud. Ia menambah panduan di atas standar keamanan informasi yang lebih umum, dan berguna bagi penyedia maupun pelanggan. Halaman resmi ISO tidak dapat dibuka (HTTP 403 pada 2026-11-19). Standar ini juga terbit sebagai ITU-T X.1631 (https://www.itu.int/rec/T-REC-X.1631, dibuka 2026-11-19), dan halaman itu mencatat edisi 12/2025 (status "in force, prepublished") yang menggantikan edisi 07/2015; teksnya berbayar dan tidak dibaca untuk modul ini.
- **ISO/IEC 27018** adalah panduan perlindungan data pribadi (PII) pada cloud publik, ketika penyedia bertindak sebagai pemroses data pribadi atas instruksi pelanggan. Halaman resminya juga tidak dapat dibuka, jadi gambaran ini tidak diverifikasi dari sumber resmi dan isi pasalnya tidak dibahas.

Pesan untukmu: ada standar yang menjelaskan apa yang pantas diharapkan dari penyedia dan pelanggan. Menyebut standar ini **bukan** berarti penyedia atau repositori ini tersertifikasi; untuk klaim seperti itu periksa sertifikat resmi penyedia.

## Latihan

**Latihan 1: hak akses minimum.** Sebuah folder fiktif berisi tiga berkas: "daftar-acara", "anggaran", "foto-kegiatan". Ada tiga peran: ketua, bendahara, anggota biasa. Tulis tabel siapa boleh membaca atau mengubah apa.

Petunjuk jawaban: anggota biasa hanya membaca daftar acara dan foto; bendahara membaca dan mengubah anggaran; ketua membaca semua dan mengubah daftar acara. Jawaban lain valid bila alasannya menerapkan akses minimum. Bila anggota biasa kamu beri akses ke anggaran, tulis kebutuhan apa yang menjustifikasinya; bila tidak ada, cabut.

**Latihan 2: audit kata sandi (data sintetis).** Dari daftar karangan: "123456", "kelas11ipa", "k7#Rp9!vQ2mLw4". Nilai kekuatan masing-masing dan alasannya.

Petunjuk jawaban: dua pertama lemah (urutan angka, pendek dan mudah ditebak); yang ketiga panjang dan acak sehingga kuat, tetapi tetap harus unik, tidak pernah dipakai ulang, dan disimpan di manajer kata sandi. Kata sandi yang kuat pun tidak aman bila bocor, itu sebabnya autentikasi dua langkah tetap diperlukan.

**Latihan 3: tebak apa yang bocor.** Bacakan lima kartu fiktif: "kunci ditempel di grup pesan", "folder dibagikan ke publik", "satu kata sandi untuk semua", "tidak ada log", "tidak ada cadangan". Tulis dampak dan perbaikannya.

Petunjuk jawaban: kunci bocor (termasuk bila ditempel ke grup pesan atau layanan AI), cabut dan putar; folder publik, ubah izin; kata sandi sama, buat unik dan nyalakan autentikasi dua langkah; tanpa log sulit melacak, aktifkan pencatatan; tanpa cadangan data hilang permanen, buat cadangan terpisah.

**Latihan 4: menjelaskan standar.** Dengan kata-katamu sendiri dan tanpa menyalin pasal, jelaskan dalam tiga kalimat perbedaan fokus ISO/IEC 27017 dan 27018.

Petunjuk jawaban: 27017 tentang kendali keamanan layanan cloud secara umum; 27018 tentang perlindungan data pribadi di cloud publik.

**Latihan 5: keputusan.** Sekolah fiktif ingin mengunggah nilai siswa beserta nama asli ke layanan daring gratis. Tulis tiga pertanyaan yang perlu dijawab sebelum setuju dan siapa yang berhak memutuskan.

Petunjuk jawaban: pertanyaan tentang dasar hukum dan izin, lokasi dan perlindungan data, serta siapa pengelola akses; keputusan ada pada sekolah dan pihak yang berwenang, bukan siswa sendiri.

## Latihan bercampur

Kasus fiktif: Klub Contoh menyimpan daftar anggota (nama lengkap dan nomor ponsel karangan) di layanan penyimpanan daring. Pengelola memakai kata sandi yang sama dengan akun lain, folder dibagikan ke "siapa saja yang punya tautan", tidak ada cadangan, dan seorang pengurus menempelkan kunci akses ke asisten AI untuk dicek.

1. Daftarkan semua kelalaian dan kelompokkan: bagian siapa (penyedia atau pengguna)?
2. Urutkan tiga perbaikan yang paling mendesak dan jelaskan urutannya.
3. Apakah data ini data pribadi? Siapa yang menentukan boleh tidaknya disimpan di layanan itu?

Petunjuk jawaban: semua kelalaian adalah bagian pengguna (kata sandi dipakai ulang, izin publik, tanpa cadangan, kunci ke layanan AI). Urutan wajar: cabut dan putar kunci; ubah izin folder dan pakai kata sandi unik dengan autentikasi dua langkah; buat cadangan. Nama dan nomor ponsel orang adalah data pribadi; keputusan ada pada pengelola dan pihak yang berwenang (sekolah), bukan siswa sendiri. Urutan lain boleh bila alasannya menutup risiko terbesar lebih dulu.

## Ulang berjarak

Satu minggu lagi, lalu sebulan lagi, jawab tanpa membuka modul ini lalu cocokkan.

1. Sebutkan lima dari tujuh prinsip keamanan dasar dan satu contoh masing-masing.
2. Apa itu data pribadi dan mengapa tidak boleh dimasukkan ke layanan mana pun dalam latihan?
3. Apa beda fokus ISO/IEC 27017 dan 27018 dalam satu kalimat?
