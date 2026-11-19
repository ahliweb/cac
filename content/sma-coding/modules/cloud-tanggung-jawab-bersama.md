## Untuk siapa modul ini

Modul ini untuk siswa kelas XI yang sudah membaca `cloud-iaas-paas-saas` dan mempelajari keamanan dasar (`FND-X1-M6`). Ia pengayaan di luar jam wajib, tanpa akun dan tanpa kode.

Setelah mempelajari modul ini, kamu diharapkan bisa menjelaskan model tanggung jawab bersama, menunjuk bagian mana yang dijaga penyedia dan mana yang dijaga pengguna pada tiap model layanan, dan membaca sebuah insiden untuk menemukan siapa yang lalai.

Seri cloud berada di luar rumusan Capaian Pembelajaran. Butir F-LD-e dan E-LD-l hanya disentuh sebagai konteks dan tidak dihitung terpenuhi oleh modul ini.

## Ingat kembali

Tutup catatanmu dan tulis jawaban singkat sebelum membaca lanjut.

1. Sebutkan tiga model layanan cloud dan satu hal yang kamu urus sendiri pada masing-masing.
2. Apa itu autentikasi dua langkah dan mengapa kata sandi saja tidak cukup? (`FND-X1-M6`)
3. Apa arti hak akses minimum?

Cocokkan: (1) IaaS: sistem operasi dan aplikasi; PaaS: aplikasi dan data; SaaS: data dan akses pengguna; (2) ada faktor kedua selain kata sandi, jadi kata sandi yang bocor tidak langsung membuka akun; (3) akses secukupnya, hanya yang perlu. Bila nomor 1 belum tepat, baca ulang `cloud-iaas-paas-saas`.

## Gagasan utama

Memakai cloud tidak berarti keamanan sepenuhnya diurus orang lain. Keamanan dibagi dua: penyedia menjaga fondasinya, pengguna menjaga cara ia memakainya.

Salah satu penyedia merumuskannya sebagai keamanan "of the cloud" (milik penyedia: infrastruktur, perangkat keras, perangkat lunak, jaringan, fasilitas) dan keamanan "in the cloud" (milik pelanggan, tergantung layanan yang dipilih). Contohnya: pada komputer virtual, pelanggan mengelola sistem operasi tamu, pembaruannya, aplikasi, dan pengaturan firewall; pada layanan penyimpanan yang lebih abstrak, pelanggan mengelola data, pilihan enkripsi, dan izin akses (sumber: https://aws.amazon.com/compliance/shared-responsibility-model/, diakses 2026-11-19). Penyedia lain memakai istilah serupa; gagasannya sama, rinciannya berbeda. Contoh di atas adalah satu penyedia, bukan aturan untuk semua.

## Prediksi dulu

Sebelum membaca tabel di bawah, salin tabelnya di kertas dengan kolom jawaban kosong, lalu tebak siapa yang bertanggung jawab (penyedia atau pengguna) untuk tiap baris pada IaaS, PaaS, dan SaaS. Setelah itu cocokkan dengan tabel dan lingkari tebakan yang meleset; bagian itulah yang perlu kamu perhatikan.

## Pembagian menurut model layanan

Tabel ini penyederhanaan untuk belajar, bukan kontrak.

| Bagian | IaaS | PaaS | SaaS |
| --- | --- | --- | --- |
| Gedung, listrik, perangkat keras | penyedia | penyedia | penyedia |
| Sistem operasi dan pembaruannya | pengguna | penyedia | penyedia |
| Aplikasi | pengguna | pengguna | penyedia |
| Data dan siapa yang boleh mengaksesnya | pengguna | pengguna | pengguna |
| Kata sandi dan akun pengguna | pengguna | pengguna | pengguna |

Perhatikan dua baris terakhir: **data dan akun selalu menjadi bagian pengguna**, apa pun modelnya. Tulis dengan kata-katamu mengapa begitu: penyedia tidak tahu siapa yang seharusnya boleh membuka datamu dan tidak bisa menebak kata sandimu yang lemah; hanya pengguna yang menentukan keduanya.

## Contoh insiden akibat salah konfigurasi

Pola yang sudah sering dilaporkan: tempat penyimpanan berkas diatur "terbuka untuk siapa saja" karena ingin cepat, lalu berkas di dalamnya terbaca orang asing. Penyedia tidak meretas apa pun; pengaturan yang keliru berada di pihak pengguna. Modul ini tidak menyebut kasus nyata tertentu karena sumbernya tidak diperiksa; guru yang ingin memakai kasus nyata menyiapkan sumber bertanggal sendiri. Cerita di bawah ini karangan.

> Klub fiktif "Robotik Contoh" menaruh daftar anggota di tempat simpan daring. Ketua mengatur akses ke "publik" agar teman mudah mengunduh. Seminggu kemudian daftar itu ditemukan di forum.

## Daftar periksa "apa bagian saya"

1. Siapa yang boleh membuka data ini? Apakah aksesnya paling sempit yang masih cukup?
2. Apakah akun dilindungi kata sandi kuat dan autentikasi dua langkah?
3. Apakah ada data yang seharusnya tidak berada di sini sama sekali?
4. Apakah ada yang menjalankan pembaruan (bila kamu yang bertanggung jawab atas sistem operasi atau aplikasi)?
5. Siapa yang kuhubungi bila ada kejadian?

## Latihan

**Latihan 1: warnai tabel.** Salin tabel pembagian, tutup kolom jawabannya, lalu isi ulang dari ingatan. Cocokkan.

Petunjuk jawaban: gunakan tabel di atas; periksa terutama data dan akun, yang selalu milik pengguna. Bila ada baris yang tertukar, baca ulang bagian "Pembagian menurut model layanan" dan hubungkan dengan model layanan di `cloud-iaas-paas-saas`.

**Latihan 2: telaah insiden.** Pada kisah klub fiktif di atas, tulis (a) apa penyebabnya, (b) siapa yang bertanggung jawab atas pengaturan itu, (c) tiga langkah pencegahan.

Petunjuk jawaban: (a) izin akses terlalu terbuka; (b) pengguna (pengelola penyimpanan); (c) akses sempit hanya untuk anggota, tinjau pengaturan berkala, jangan simpan data yang tidak perlu. Bila jawaban (b) kamu "penyedia", baca ulang baris data dan akun pada tabel.

**Latihan 3: kartu "bagian siapa".** Bacakan situasi: "disk server rusak", "kata sandi akun ditebak karena 123456", "gedung pusat data kebanjiran", "aplikasi punya celah yang belum ditambal (pada IaaS)". Tiap kelompok mengangkat kartu Penyedia atau Pengguna.

Petunjuk jawaban: penyedia, pengguna, penyedia, pengguna. Untuk setiap kartu yang kamu jawab keliru, tulis satu kalimat "karena ... bagian ... ".

**Latihan 4: lembar periksa untuk situasi sendiri.** Pilih satu layanan daring yang kamu pakai. Jawab lima pertanyaan daftar periksa tanpa menuliskan kata sandi atau data pribadi apa pun.

Petunjuk jawaban: jawaban baik jujur menyebut hal yang belum diatur (misalnya autentikasi dua langkah belum aktif) dan menyusun langkah perbaikan.

## Latihan bercampur

Tiap kasus fiktif di bawah memuat satu kelalaian. Tulis (i) model layanan yang tampak, (ii) pihak yang bertanggung jawab, dan (iii) satu langkah perbaikan.

- (a) Seorang admin klub menjalankan komputer virtual sewaan dan tidak pernah memasang pembaruan sistem operasi; komputer itu dipakai orang asing.
- (b) Pengelola aplikasi absensi daring (dipakai lewat peramban) memakai kata sandi "admin123" untuk akun pengelola.
- (c) Sebuah pusat data penyedia kehilangan listrik selama beberapa jam karena gangguan di luar kendali pelanggan.
- (d) Klub menaruh kode aplikasi di platform yang mengurus server, lalu menyimpan kunci akses di dalam kode yang diunggah ke repositori publik.

Petunjuk jawaban: (a) IaaS; pengguna; pasang pembaruan dan atur jadwal. (b) SaaS; pengguna (akun selalu milik pengguna); kata sandi kuat dan autentikasi dua langkah. (c) tidak bergantung model; penyedia; pelanggan menilai apakah perlu salinan di zona lain (`cloud-layanan-dan-region`). (d) PaaS; pengguna; cabut dan putar kunci, simpan di variabel lingkungan. Bila (a) dan (d) kamu tandai "penyedia", ulangi tabel pembagian.

## Ulang berjarak

Satu minggu lagi, lalu sebulan lagi, jawab tanpa membuka modul ini lalu cocokkan.

1. Jelaskan "keamanan of the cloud" dan "keamanan in the cloud" dengan kata-katamu.
2. Mengapa data dan akun selalu menjadi bagian pengguna?
3. Sebutkan tiga pertanyaan dari daftar periksa "apa bagian saya".
