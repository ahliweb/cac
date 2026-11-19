## Untuk siapa modul ini

Modul ini untuk siswa SMA kelas X atau XI, jalur mana pun, sebagai **pengayaan** di luar jam wajib. Prasyaratnya konsep klien, server, internet, dan paket data dari blok fondasi (`FND-X1-M4` dan `FND-X1-M5`). Kamu tidak perlu bisa memprogram dan tidak perlu membuat akun apa pun.

Setelah mempelajari modul ini, kamu diharapkan bisa menjelaskan apa itu cloud computing (komputasi awan) dengan kata-katamu sendiri, menyebut ciri-cirinya, memberi contoh sehari-hari, dan menilai kapan cloud cocok dan kapan tidak.

Seri cloud ini berada di luar rumusan Capaian Pembelajaran; ia hanya memberi konteks bagi materi jaringan dan keamanan (butir E-LD-e), tanpa dihitung memenuhi butir itu. Semua kegiatan memakai simulasi dan data karangan. Nama perusahaan yang muncul hanya contoh, bukan anjuran.

## Ingat kembali

Tutup catatanmu dan tulis jawaban singkat sebelum membaca lanjut. Mencoba mengingat lebih membantu ingatan jangka panjang daripada membaca ulang, dan tidak masalah bila jawabanmu belum lengkap.

1. Apa tugas klien dan apa tugas server?
2. Apa yang dilakukan DNS ketika kamu mengetik nama situs?
3. Mengapa data dikirim dalam potongan yang disebut paket?

Cocokkan: (1) klien meminta, server melayani; (2) DNS menerjemahkan nama menjadi alamat IP; (3) potongan kecil dapat melewati jalur berbeda dan diulang bila ada yang hilang. Bila ada yang meleset, baca ulang catatan `FND-X1-M4` dan `FND-X1-M5` sebelum lanjut.

## Dari komputer sendiri ke komputer orang lain

Dulu sebuah sekolah yang ingin punya situs web membeli komputer server, menaruhnya di ruangan, dan merawatnya sendiri. Sekarang banyak pihak menyewa kemampuan komputer dari perusahaan besar yang memiliki ribuan server di pusat data (data center), lalu mengaksesnya lewat internet.

Definisi yang sering dirujuk berasal dari lembaga standar Amerika Serikat, NIST (SP 800-145, terbit September 2011; teksnya dibuka dan dicocokkan pada 2026-11-19). Intinya: cloud computing adalah model yang memungkinkan akses lewat jaringan, kapan saja dan dengan mudah, ke kumpulan sumber daya komputasi bersama (jaringan, server, penyimpanan, aplikasi, layanan) yang dapat disediakan dan dilepas dengan cepat dengan sedikit usaha pengelolaan atau campur tangan penyedia. NIST menyebut model ini terdiri dari lima ciri utama, tiga model layanan, dan empat model penerapan.

## Lima ciri cloud

Daftar berikut mengikuti dokumen NIST yang sama (lima ciri dalam teks dokumen itu, dicocokkan 2026-11-19). Dokumen itu terbit tahun 2011, jadi banyak produk cloud muncul sesudahnya; lima ciri ini adalah kerangka berpikir, bukan daftar produk.

| Ciri | Artinya dalam bahasa sehari-hari | Contoh |
| --- | --- | --- |
| Layanan mandiri sesuai permintaan | Kamu menyediakan sendiri sumber daya lewat layar, tanpa menelepon petugas | menambah ruang simpan lewat tombol |
| Akses lewat jaringan luas | Bisa dipakai dari berbagai perangkat lewat internet | membuka dokumen dari ponsel dan laptop |
| Sumber daya dipakai bersama | Penyedia melayani banyak pelanggan dari kumpulan sumber daya yang sama | banyak sekolah berbagi satu pusat data |
| Elastis dan cepat berubah | Kapasitas bisa naik atau turun mengikuti kebutuhan | situs pendaftaran ramai saat pengumuman |
| Terukur | Pemakaian dihitung, dan biasanya itulah dasar tagihan | bayar menurut pemakaian |

NIST juga membedakan empat model penerapan: **privat** (untuk satu organisasi), **komunitas** (untuk sekelompok organisasi dengan kepentingan serupa), **publik** (terbuka untuk umum), dan **hibrida** (gabungan dua atau lebih model tadi). Modul ini berfokus pada lima ciri; model layanan dibahas di modul berikutnya.

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

Petunjuk jawaban: urutannya meminta alamat, menerima alamat, meminta halaman, menerima halaman. Dengan pusat data jauh, jalurnya sama tetapi lebih lama (jarak); itu pengantar region di modul berikutnya. Bila urutanmu terbalik, ulangi permainan sambil membaca tabel urutan di modul `FND-X1-M4`.

**Latihan 2: cocok atau tidak.** Untuk tiap kasus, tulis "cloud cocok", "kurang cocok", atau "tergantung" beserta satu alasan: (a) situs pengumuman kelulusan yang ramai dua hari per tahun; (b) daftar nilai siswa yang berisi nama asli; (c) latihan kelompok yang mengedit dokumen bersama.

Petunjuk jawaban: (a) cocok karena elastis; (b) tergantung: data pribadi butuh dasar hukum dan perlindungan, jadi jangan dimasukkan tanpa izin sekolah; (c) cocok karena akses bersama. Bila jawabanmu "(b) cocok", baca ulang baris "Data sangat sensitif" pada tabel di atas, lalu tulis alasannya dengan kalimatmu sendiri.

**Latihan 3: cocokkan ciri.** Pasangkan lima ciri dengan situasi berikut: "tombol tambah ruang simpan", "dari ponsel dan laptop", "tagihan sesuai pemakaian bulan lalu", "ratusan pelanggan di satu pusat data", "kapasitas turun saat sepi".

Petunjuk jawaban: layanan mandiri, akses jaringan luas, terukur, dipakai bersama, elastis (urutan sesuai daftar situasi). Bila ada pasangan yang tertukar, bedakan "terukur" (pemakaian dihitung) dari "elastis" (kapasitas naik turun).

**Latihan 4: lembar periksa.** Tulis tiga kalimat: apa itu cloud, satu manfaat, satu risiko. Tukar dengan teman dan periksa apakah istilahnya dipakai dengan benar.

Petunjuk jawaban: jawaban baik menyebut "dipakai lewat internet", "sumber daya bersama atau sesuai permintaan", dan risiko seperti data di tempat yang tidak dikendalikan, ketergantungan pada internet, atau biaya.

## Ulang berjarak

Satu minggu lagi, lalu sebulan lagi, jawab tanpa membuka modul ini. Sesudah itu cocokkan dengan isi modul dan catat yang terlewat.

1. Sebutkan lima ciri cloud menurut NIST dan satu contoh tiap ciri.
2. Beri satu kasus saat cloud cocok dan satu saat kurang cocok, dengan alasan.
3. Jelaskan mengapa "datamu berada di tempat yang tidak kamu kendalikan sepenuhnya" menjadi bahan pertimbangan, bukan alasan menolak cloud.
