## Untuk siapa modul ini

Modul ini untuk siswa SMA kelas X atau XI, jalur mana pun, sebagai **pengayaan** di luar jam wajib. Prasyaratnya konsep klien, server, internet, dan paket data dari blok fondasi (`FND-X1-M4` dan `FND-X1-M5`). Kamu tidak perlu bisa memprogram dan tidak perlu membuat akun apa pun.

Setelah mempelajari modul ini, kamu diharapkan bisa menjelaskan apa itu cloud computing (komputasi awan) dengan kata-katamu sendiri, menyebut ciri-cirinya, memberi contoh sehari-hari, dan menilai kapan cloud cocok dan kapan tidak.

Seri cloud ini berada di luar rumusan Capaian Pembelajaran; ia hanya memberi konteks bagi materi jaringan dan keamanan (butir E-LD-e). Semua kegiatan memakai simulasi dan data karangan. Nama perusahaan yang muncul hanya contoh, bukan anjuran.

## Dari komputer sendiri ke komputer orang lain

Dulu sebuah sekolah yang ingin punya situs web membeli komputer server, menaruhnya di ruangan, dan merawatnya sendiri. Sekarang banyak pihak menyewa kemampuan komputer dari perusahaan besar yang memiliki ribuan server di pusat data (data center), lalu mengaksesnya lewat internet.

Definisi yang sering dirujuk berasal dari lembaga standar Amerika Serikat, NIST (SP 800-145, diakses 2026-11-19). Intinya: cloud computing adalah model yang memungkinkan akses lewat jaringan, kapan saja dan dengan mudah, ke kumpulan sumber daya komputasi bersama (jaringan, server, penyimpanan, aplikasi, layanan) yang dapat disediakan dan dilepas dengan cepat dengan sedikit usaha pengelolaan atau campur tangan penyedia. NIST menyebut model ini terdiri dari lima ciri utama, tiga model layanan, dan empat model penerapan.

## Lima ciri cloud

Daftar berikut mengikuti dokumen NIST yang sama. `[belum terverifikasi]` pada akses 2026-11-19: halaman ringkasan yang dibuka hanya memuat jumlahnya (lima ciri), sehingga rincian lima ciri ini ditulis dari pengetahuan penyusun dan perlu dicocokkan dengan dokumen lengkapnya.

| Ciri | Artinya dalam bahasa sehari-hari | Contoh |
| --- | --- | --- |
| Layanan mandiri sesuai permintaan | Kamu menyediakan sendiri sumber daya lewat layar, tanpa menelepon petugas | menambah ruang simpan lewat tombol |
| Akses lewat jaringan luas | Bisa dipakai dari berbagai perangkat lewat internet | membuka dokumen dari ponsel dan laptop |
| Sumber daya dipakai bersama | Penyedia melayani banyak pelanggan dari kumpulan sumber daya yang sama | banyak sekolah berbagi satu pusat data |
| Elastis dan cepat berubah | Kapasitas bisa naik atau turun mengikuti kebutuhan | situs pendaftaran ramai saat pengumuman |
| Terukur | Pemakaian dihitung, dan biasanya itulah dasar tagihan | bayar menurut pemakaian |

## Contoh sehari-hari

- Menyimpan foto dan dokumen supaya bisa dibuka dari mana saja.
- Mengedit dokumen bersama teman secara bersamaan.
- Menonton video yang tidak tersimpan di perangkatmu.
- Aplikasi pesan yang tetap menyimpan percakapan saat ponsel diganti.

Hampir semuanya berjalan di server milik orang lain. Itu enak (tidak perlu merawat server), sekaligus berarti **datamu berada di tempat yang tidak kamu kendalikan sepenuhnya**. Pikiran ini akan kembali di modul tanggung jawab bersama dan keamanan.

## Kapan cloud cocok, kapan tidak

| Cocok | Kurang cocok |
| --- | --- |
| Kebutuhan naik turun (ramai sebentar) | Beban sangat stabil dan kecil, cukup satu komputer sekolah |
| Tidak punya orang yang merawat server | Data sangat sensitif tanpa dasar hukum dan perlindungan yang jelas |
| Perlu diakses dari banyak tempat | Jaringan sering putus: tanpa internet, layanan tak terjangkau |
| Ingin mencoba cepat tanpa membeli perangkat | Biaya pemakaian jangka panjang tidak dihitung |

Tidak ada jawaban tunggal. Menilai cocok atau tidak berarti menimbang kebutuhan, biaya, keamanan, dan risiko.

## Latihan

Semua latihan memakai kertas dan data karangan. Tidak ada yang memerlukan akun.

**Latihan 1: permainan peran "satu permintaan".** Dalam kelompok empat orang, bagikan kartu: Klien (peramban), Pencari alamat (DNS), Server, dan Pengamat. Klien meminta halaman "halaman-kelas.contoh" (nama karangan). Pencari alamat memberi alamat karangan, Server mengembalikan halaman, Pengamat mencatat langkahnya. Lalu tambahkan satu aturan: server ada di "pusat data" di kota lain. Apa yang berubah bagi Klien?

Petunjuk jawaban: urutannya meminta alamat, menerima alamat, meminta halaman, menerima halaman. Dengan pusat data jauh, jalurnya sama tetapi lebih lama (jarak); itu pengantar region di modul berikutnya.

**Latihan 2: cocok atau tidak.** Untuk tiap kasus, tulis "cloud cocok", "kurang cocok", atau "tergantung" beserta satu alasan: (a) situs pengumuman kelulusan yang ramai dua hari per tahun; (b) daftar nilai siswa yang berisi nama asli; (c) latihan kelompok yang mengedit dokumen bersama.

Petunjuk jawaban: (a) cocok karena elastis; (b) tergantung: data pribadi butuh dasar hukum dan perlindungan, jadi jangan dimasukkan tanpa izin sekolah; (c) cocok karena akses bersama.

**Latihan 3: cocokkan ciri.** Pasangkan lima ciri dengan situasi berikut: "tombol tambah ruang simpan", "dari ponsel dan laptop", "tagihan sesuai pemakaian bulan lalu", "ratusan pelanggan di satu pusat data", "kapasitas turun saat sepi".

Petunjuk jawaban: layanan mandiri, akses jaringan luas, terukur, dipakai bersama, elastis (urutan sesuai daftar situasi).

**Latihan 4: lembar periksa.** Tulis tiga kalimat: apa itu cloud, satu manfaat, satu risiko. Tukar dengan teman dan periksa apakah istilahnya dipakai dengan benar.

Petunjuk jawaban: jawaban baik menyebut "dipakai lewat internet", "sumber daya bersama atau sesuai permintaan", dan risiko seperti data di tempat yang tidak dikendalikan, ketergantungan pada internet, atau biaya.
