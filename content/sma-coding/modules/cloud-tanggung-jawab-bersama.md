## Untuk siapa modul ini

Modul ini untuk siswa kelas XI yang sudah membaca `cloud-iaas-paas-saas` dan mempelajari keamanan dasar (`FND-X1-M6`). Ia pengayaan di luar jam wajib, tanpa akun dan tanpa kode.

Setelah mempelajari modul ini, kamu diharapkan bisa menjelaskan model tanggung jawab bersama, menunjuk bagian mana yang dijaga penyedia dan mana yang dijaga pengguna pada tiap model layanan, dan membaca sebuah insiden untuk menemukan siapa yang lalai.

## Gagasan utama

Memakai cloud tidak berarti keamanan sepenuhnya diurus orang lain. Keamanan dibagi dua: penyedia menjaga fondasinya, pengguna menjaga cara ia memakainya.

Salah satu penyedia merumuskannya sebagai keamanan "of the cloud" (milik penyedia: infrastruktur, perangkat keras, perangkat lunak, jaringan, fasilitas) dan keamanan "in the cloud" (milik pelanggan, tergantung layanan yang dipilih). Contohnya: pada komputer virtual, pelanggan mengelola sistem operasi tamu, pembaruannya, aplikasi, dan pengaturan firewall; pada layanan penyimpanan yang lebih abstrak, pelanggan mengelola data, pilihan enkripsi, dan izin akses (sumber: https://aws.amazon.com/compliance/shared-responsibility-model/, diakses 2026-11-19). Penyedia lain memakai istilah serupa; gagasannya sama, rinciannya berbeda.

## Pembagian menurut model layanan

Tabel ini penyederhanaan untuk belajar, bukan kontrak.

| Bagian | IaaS | PaaS | SaaS |
| --- | --- | --- | --- |
| Gedung, listrik, perangkat keras | penyedia | penyedia | penyedia |
| Sistem operasi dan pembaruannya | pengguna | penyedia | penyedia |
| Aplikasi | pengguna | pengguna | penyedia |
| Data dan siapa yang boleh mengaksesnya | pengguna | pengguna | pengguna |
| Kata sandi dan akun pengguna | pengguna | pengguna | pengguna |

Perhatikan dua baris terakhir: **data dan akun selalu menjadi bagian pengguna**, apa pun modelnya.

## Contoh insiden akibat salah konfigurasi

Pola yang sering terjadi di dunia nyata: tempat penyimpanan berkas diatur "terbuka untuk siapa saja" karena ingin cepat, lalu berkas di dalamnya terbaca orang asing. Penyedia tidak meretas apa pun; pengaturan yang keliru berada di pihak pengguna. Cerita di bawah ini karangan.

> Klub fiktif "Robotik Contoh" menaruh daftar anggota di tempat simpan daring. Ketua mengatur akses ke "publik" agar teman mudah mengunduh. Seminggu kemudian daftar itu ditemukan di forum.

## Daftar periksa "apa bagian saya"

1. Siapa yang boleh membuka data ini? Apakah aksesnya paling sempit yang masih cukup?
2. Apakah akun dilindungi kata sandi kuat dan autentikasi dua langkah?
3. Apakah ada data yang seharusnya tidak berada di sini sama sekali?
4. Apakah ada yang menjalankan pembaruan (bila kamu yang bertanggung jawab atas sistem operasi atau aplikasi)?
5. Siapa yang kuhubungi bila ada kejadian?

## Latihan

**Latihan 1: warnai tabel.** Salin tabel pembagian, tutup kolom jawabannya, lalu isi ulang dari ingatan. Cocokkan.

Petunjuk jawaban: gunakan tabel di atas; yang paling sering salah adalah data dan akun, yang selalu milik pengguna.

**Latihan 2: telaah insiden.** Pada kisah klub fiktif di atas, tulis (a) apa penyebabnya, (b) siapa yang bertanggung jawab atas pengaturan itu, (c) tiga langkah pencegahan.

Petunjuk jawaban: (a) izin akses terlalu terbuka; (b) pengguna (pengelola penyimpanan); (c) akses sempit hanya untuk anggota, tinjau pengaturan berkala, jangan simpan data yang tidak perlu.

**Latihan 3: kartu "bagian siapa".** Bacakan situasi: "disk server rusak", "kata sandi akun ditebak karena 123456", "gedung pusat data kebanjiran", "aplikasi punya celah yang belum ditambal (pada IaaS)". Tiap kelompok mengangkat kartu Penyedia atau Pengguna.

Petunjuk jawaban: penyedia, pengguna, penyedia, pengguna.

**Latihan 4: lembar periksa untuk situasi sendiri.** Pilih satu layanan daring yang kamu pakai. Jawab lima pertanyaan daftar periksa tanpa menuliskan kata sandi atau data pribadi apa pun.

Petunjuk jawaban: jawaban baik jujur menyebut hal yang belum diatur (misalnya autentikasi dua langkah belum aktif) dan menyusun langkah perbaikan.
