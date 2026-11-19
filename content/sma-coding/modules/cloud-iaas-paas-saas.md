## Untuk siapa modul ini

Modul ini untuk siswa kelas X atau XI yang sudah membaca modul "Apa Itu Cloud Computing" (`cloud-konsep-dasar`) dan mengenal peran sistem operasi (`FND-X1-M2`). Ia pengayaan di luar jam wajib, tanpa akun dan tanpa pemrograman.

Setelah mempelajari modul ini, kamu diharapkan bisa membedakan IaaS, PaaS, dan SaaS, memberi contoh masing-masing, dan memilih model yang pantas untuk sebuah kebutuhan.

Seri cloud berada di luar rumusan Capaian Pembelajaran. Butir F-BK-a (alur pengembangan program atau produk digital) hanya disentuh sebagai konteks dan tidak dihitung terpenuhi oleh modul ini.

## Ingat kembali

Tutup catatanmu dan tulis jawaban singkat sebelum membaca lanjut.

1. Sebutkan lima ciri cloud menurut NIST.
2. Apa tugas sistem operasi pada sebuah komputer? (`FND-X1-M2`)
3. Beri satu contoh cloud yang kamu pakai sehari-hari dan ciri apa yang paling tampak darinya.

Cocokkan: (1) layanan mandiri sesuai permintaan, akses jaringan luas, sumber daya dipakai bersama, elastis, terukur; (2) mengelola proses, memori, berkas, perangkat, dan antarmuka; (3) jawaban bebas, asal ciri yang disebut cocok. Bila nomor 1 belum lengkap, baca ulang `cloud-konsep-dasar` sebelum lanjut.

## Tiga model layanan

NIST (SP 800-145, dicocokkan 2026-11-19) membagi layanan cloud menjadi tiga model: pengguna mengelola sistem operasi, penyimpanan, dan aplikasi pada IaaS; mengelola aplikasi dan pengaturan lingkungannya pada PaaS; dan hanya memakai aplikasi milik penyedia pada SaaS. Pembagian itu dipakai luas, walau penyedia sering memakai nama dagang sendiri.

Analogi: kamu ingin membuka warung makan. Analogi hanya alat bantu; ia tidak menggantikan definisi di atas.

| Model | Analogi | Kamu mengurus | Penyedia mengurus |
| --- | --- | --- | --- |
| IaaS (Infrastructure as a Service) | menyewa lahan kosong | sistem operasi, aplikasi, data, pengaturan | perangkat keras, jaringan, ruang virtual |
| PaaS (Platform as a Service) | menyewa gedung dengan dapur dan listrik | aplikasi dan data | sistem operasi, lingkungan menjalankan, perangkat keras |
| SaaS (Software as a Service) | menyewa kios siap pakai | memakai aplikasi, mengisi data, mengatur akses | hampir semuanya |

Semakin ke bawah, semakin sedikit yang kamu atur (lebih mudah), tetapi semakin sedikit pula yang bisa kamu ubah.

## Contoh tanpa mewajibkan merek

- IaaS: komputer virtual yang kamu sewa lalu kamu pasangi sendiri.
- PaaS: tempat menaruh kode aplikasi, sedangkan server dan sistem operasinya diurus penyedia.
- SaaS: surel, dokumen daring, atau aplikasi absensi yang dipakai lewat peramban.

Merek di dunia nyata bisa menjual beberapa model sekaligus; menggolongkan sebuah produk kadang berbeda menurut sudut pandang. Itu normal.

## Memilih model

Tanyakan tiga hal:

1. Apakah sudah ada aplikasi jadi yang cukup? Bila ya, SaaS biasanya paling hemat tenaga.
2. Apakah kita membuat aplikasi sendiri tetapi tidak ingin mengurus server? PaaS.
3. Apakah butuh kendali penuh atas sistem operasi dan pengaturan? IaaS, dengan konsekuensi tanggung jawab lebih besar (dibahas di modul tanggung jawab bersama).

## Contoh terselesaikan

**Kebutuhan fiktif:** kelas ingin situs profil kelas dengan beberapa halaman tetap. Tidak ada yang bisa mengurus server.

1. Apakah sudah ada aplikasi jadi yang cukup? Ada pembuat situs siap pakai yang tinggal diisi, jadi kebutuhan terpenuhi tanpa memprogram. Jawaban: **SaaS**.
2. Bagaimana kalau kelas ingin membuat sendiri fitur khusus, tetapi tetap tidak mau mengurus server? Kode ditaruh di tempat yang mengurus server dan sistem operasinya. Jawaban: **PaaS**.
3. Bagaimana kalau harus memakai sistem operasi tertentu dan mengatur jaringannya sendiri? Itu butuh kendali penuh. Jawaban: **IaaS**, dengan tanggung jawab lebih besar.

Perhatikan bahwa kebutuhan yang sama dapat dijawab berbeda bila syaratnya berubah; yang menentukan adalah tiga pertanyaan di atas. Latihan 2 di bawah mengerjakan hal serupa dengan bantuan yang lebih sedikit.

## Latihan

**Latihan 1: kartu analogi.** Buat tiga kartu (lahan, gedung, kios). Tempelkan label IaaS, PaaS, SaaS dan tulis satu hal yang kamu urus sendiri pada tiap kartu.

Petunjuk jawaban: lahan = IaaS (pasang sendiri sistem operasi dan aplikasi); gedung = PaaS (mengurus aplikasi dan data); kios = SaaS (mengurus data dan akses pengguna). Bila kartu tertukar, bandingkan lagi dengan tabel kolom "Kamu mengurus".

**Latihan 2: golongkan.** Golongkan tiap kebutuhan fiktif: (a) OSIS ingin lembar kerja daring bersama; (b) klub ingin menjalankan program buatan sendiri di server tanpa mengurus sistem operasi; (c) tim ingin memasang sistem operasi pilihan dan membuat pengaturan jaringan sendiri.

Petunjuk jawaban: (a) SaaS; (b) PaaS; (c) IaaS. Untuk tiap jawaban yang salah, ulangi tiga pertanyaan di bagian "Memilih model" dan tulis pertanyaan mana yang kamu lewati.

**Latihan 3: tabel pertukaran.** Isi tabel dua kolom "kemudahan" dan "kendali" untuk ketiga model dengan tanda lebih tinggi atau lebih rendah.

Petunjuk jawaban: kemudahan paling tinggi di SaaS, paling rendah di IaaS; kendali sebaliknya (paling tinggi di IaaS). Jelaskan dengan kata-katamu mengapa keduanya berbanding terbalik.

**Latihan 4: debat singkat.** Dua kelompok berdebat: "sekolah sebaiknya memakai SaaS untuk semua kebutuhan" melawan "sekolah sebaiknya mengurus server sendiri". Setiap pihak wajib menyebut satu risiko pada pihaknya sendiri.

Petunjuk jawaban: risiko SaaS antara lain ketergantungan pada penyedia dan data di luar kendali; risiko server sendiri antara lain perawatan, keamanan, dan biaya orang.

## Latihan bercampur

Soal berikut sengaja mencampur materi dua modul. Untuk tiap kasus fiktif, tulis (i) model layanan dan (ii) satu ciri cloud yang tampak.

- (a) Klub fotografi menyimpan foto dan menambah ruang simpan lewat tombol di layar; tagihannya dihitung dari ruang yang dipakai.
- (b) Tim lomba menyewa komputer virtual, memasang sistem operasi pilihan, lalu menjalankan program buatan sendiri.
- (c) Sekolah memakai aplikasi absensi lewat peramban yang dipakai ratusan sekolah lain dari satu penyedia.
- (d) Panitia menaruh kode situs pendaftaran di tempat yang otomatis menambah kapasitas saat pendaftar membludak, tanpa mengurus server.

Petunjuk jawaban: (a) SaaS; ciri terukur (dan layanan mandiri). (b) IaaS; layanan mandiri sesuai permintaan. (c) SaaS; sumber daya dipakai bersama. (d) PaaS; elastis. Jawaban ciri lain boleh bila alasannya jelas. Bila model benar tetapi ciri salah, baca ulang tabel lima ciri di `cloud-konsep-dasar`.

## Ulang berjarak

Satu minggu lagi, lalu sebulan lagi, jawab tanpa membuka modul ini lalu cocokkan.

1. Jelaskan perbedaan IaaS, PaaS, dan SaaS memakai analogi sendiri.
2. Untuk sebuah kebutuhan baru yang kamu karang, pilih model dan beri satu alasan.
3. Apa yang kamu korbankan ketika naik dari IaaS ke SaaS?
