## Untuk siapa modul ini

Modul pendamping untuk siswa kelas XI (Fase F), semua jalur. Prasyarat: keamanan dasar di blok fondasi (`FND-X1-M6`) dan modul pendamping `pendamping-model-jaringan-dan-troubleshooting`. Perkiraan waktu: sekitar 3 JP, mandiri dengan bimbingan guru bila ada waktu. Siswa jalur B yang sudah mengikuti `B-XI2-M10` membacanya sebagai pendalaman; modul ini tidak mengubah minggu wajib mana pun.

Modul ini hanya membahas **konsep dan konfigurasi bertahan (defensif)**. Tidak ada teknik menyerang, membobol, atau memantau jaringan orang lain. Seluruh contoh memakai jaringan tiruan: alamat memakai blok dokumentasi (`192.0.2.x`), domain memakai `.example`, dan kata sandi tidak pernah ditulis. Konfigurasi hanya dibahas di atas kertas atau diperagakan guru pada perangkat lab terisolasi, **bukan** pada jaringan sekolah, rumah, atau milik orang lain. Modul ini tidak memuat kode C++.

### Butir CP yang dicakup

| Butir | Kutipan CP (Fase F, Literasi Digital) |
| --- | --- |
| F-LD-e | "memahami konsep dan penerapan serta konfigurasi keamanan lanjut untuk konektivitas jaringan data lokal dan internet baik kabel maupun nirkabel" |

### Tujuan

Setelah mempelajari modul ini, kamu diharapkan bisa:

1. menjelaskan prinsip pertahanan berlapis untuk konektivitas;
2. memilih dan menjelaskan pengaturan keamanan Wi-Fi (enkripsi modern, kata sandi, pengaturan perute);
3. menjelaskan segmentasi jaringan, pembaruan firmware, dan prinsip hak minimum;
4. menjelaskan secara konseptual fungsi VPN dan tembok api serta apa yang tidak mereka lindungi;
5. menyusun daftar konfigurasi pengamanan untuk jaringan tiruan, kabel maupun nirkabel.

## Ingat kembali

Tutup catatanmu dan tulis jawaban singkat sebelum membaca lanjut.

1. Sebutkan dua langkah keamanan konektivitas dasar. (`FND-X1-M6`)
2. Sebutkan empat lapisan model empat lapis dan satu contoh tiap lapisan. (`pendamping-model-jaringan-dan-troubleshooting`)
3. Apa fungsi router dan switch?
4. Apa arti hak akses minimum?

Cocokkan: (1) misalnya mengganti kata sandi bawaan perangkat jaringan dan memakai jaringan nirkabel terenkripsi, atau berhati-hati pada jaringan publik dan memeriksa tanda HTTPS; (2) aplikasi (HTTP), transport (TCP), internet (alamat IP), akses jaringan (kabel); (3) router meneruskan paket antarjaringan, switch menghubungkan perangkat dalam satu jaringan; (4) akses secukupnya, hanya yang perlu. Bila ada yang meleset, baca ulang `FND-X1-M6` dan modul model jaringan sebelum lanjut.

## Prediksi dulu

Sebelum membaca tabel praktik baik, lihat konfigurasi perute fiktif "Perute Keluarga Contoh" ini dan tulis tiga risiko terbesar menurutmu, urut dari yang paling berbahaya:

```text
Nama jaringan   : Rumah-Pak-Contoh-Jl-Mawar-12
Enkripsi        : terbuka (tanpa kata sandi)
Akun admin      : admin / admin
Admin dari luar : aktif
Firmware        : belum pernah diperbarui
Tamu dan TV     : satu jaringan dengan komputer keluarga
```

Simpan tulisanmu; kamu akan membandingkannya dengan tabel dan petunjuk jawaban.

## Pertahanan berlapis

Tidak ada satu pengaturan yang membuat jaringan aman. Keamanan dibangun berlapis agar kegagalan satu lapis tidak langsung menjadi bencana.

| Lapis | Contoh pengaman |
| --- | --- |
| Fisik | Perute dan sakelar di tempat terkunci; colokan jaringan tak terpakai dinonaktifkan |
| Jaringan | Segmentasi, tembok api, enkripsi Wi-Fi |
| Perangkat | Pembaruan, kunci layar, perangkat lunak dari sumber tepercaya |
| Akun | Kata sandi kuat, autentikasi dua langkah, hak minimum |
| Manusia | Kebiasaan waspada tipuan; tahu siapa yang dihubungi bila ada masalah |

Ingat tiga tujuan keamanan: kerahasiaan (hanya yang berhak membaca), keutuhan (data tidak diubah diam-diam), dan ketersediaan (layanan tetap bisa dipakai).

## Keamanan jaringan nirkabel

| Pengaturan | Praktik baik | Alasan |
| --- | --- | --- |
| Enkripsi | Pakai WPA3 bila perangkat mendukung, WPA2-AES bila tidak; hindari jaringan terbuka dan protokol lama yang sudah dinyatakan lemah | Enkripsi melindungi isi komunikasi di udara |
| Kata sandi Wi-Fi | Panjang dan unik; jangan memakai nama, tanggal lahir, atau bawaan pabrik | Kata sandi lemah mudah ditebak |
| Akun admin perute | Ganti nama pengguna dan kata sandi bawaan | Setelan bawaan terlalu dikenal |
| Pengaturan jarak jauh | Matikan akses admin dari internet bila tidak perlu | Mengurangi permukaan risiko |
| Nama jaringan (SSID) | Jangan memuat identitas pribadi atau alamat | Mencegah kebocoran informasi |
| Jaringan tamu | Sediakan terpisah untuk tamu dan perangkat pintar | Tamu tidak menjangkau perangkat utama |
| Pembaruan firmware | Periksa dan terapkan pembaruan resmi secara berkala | Menutup celah yang sudah diketahui |
| Perangkat terhubung | Periksa daftar perangkat secara berkala dan keluarkan yang tak dikenal | Mendeteksi penumpang gelap |

Catatan: menyembunyikan SSID dan menyaring alamat perangkat hanyalah pengaman tambahan yang lemah; keduanya tidak menggantikan enkripsi modern. Contoh protokol lama yang sudah dianggap lemah dan perlu dihindari: WEP, dan WPA dengan TKIP (pengetahuan umum yang mapan; periksa panduan keamanan resmi pabrikan perangkat untuk kondisi saat ini).

## Keamanan jaringan kabel

Jaringan kabel tidak otomatis aman: siapa pun yang dapat mencolok ke sakelar bisa masuk jaringan.

- Kunci ruang perangkat dan nonaktifkan colokan yang tidak terpakai.
- Pisahkan jaringan berdasarkan fungsi (segmentasi, di bawah).
- Terapkan kontrol akses berdasarkan perangkat dan pengguna bila perangkat mendukung.
- Catat dan beri label kabel serta perangkat agar penyimpangan terlihat.

## Segmentasi dan hak minimum

**Segmentasi** membagi satu jaringan menjadi beberapa bagian terpisah agar masalah di satu bagian tidak menjalar.

| Segmen (fiktif) | Isi | Aturan akses |
| --- | --- | --- |
| Administrasi | Komputer tata usaha sekolah fiktif | Tidak dapat dijangkau dari segmen siswa |
| Siswa | Komputer lab | Hanya internet dan server tugas |
| Tamu | Ponsel tamu | Hanya internet |
| Perangkat pintar | Kamera, pencetak | Tidak dapat menjangkau segmen administrasi |

Contoh rencana alamat tiruan, ditulis sebagai teks biasa:

```text
Segmen administrasi    : 192.0.2.0/26    (host 192.0.2.1 sampai 192.0.2.62)
Segmen siswa           : 192.0.2.64/26   (host 192.0.2.65 sampai 192.0.2.126)
Segmen tamu            : 192.0.2.128/26  (host 192.0.2.129 sampai 192.0.2.190)
Segmen perangkat pintar: 192.0.2.192/26  (host 192.0.2.193 sampai 192.0.2.254)
Nama layanan tugas     : tugas.sekolah.example
```

Cara membaca: awalan `/26` berarti 64 alamat per segmen (2 pangkat 6); satu alamat di awal dan satu di akhir dicadangkan, sehingga tersisa 62 alamat untuk perangkat.

**Prinsip hak minimum:** setiap pengguna, perangkat, dan layanan hanya diberi akses sebesar yang diperlukan untuk tugasnya, dan dicabut bila tugas selesai. Contoh: akun siswa tidak perlu hak mengubah setelan perute; layanan cetak tidak perlu akses ke berkas administrasi.

## Tembok api dan VPN (konseptual)

| Alat | Fungsi | Yang tidak dilindungi |
| --- | --- | --- |
| Tembok api (firewall) | Menyaring lalu lintas masuk dan keluar berdasarkan aturan; prinsip dasar: tolak dulu, izinkan yang perlu | Pengguna yang tertipu membuka tautan palsu; perangkat yang sudah terinfeksi di dalam jaringan |
| VPN (jaringan privat virtual) | Membuat terowongan terenkripsi antara perangkat dan jaringan tertentu, misalnya saat memakai Wi-Fi umum atau mengakses jaringan kantor | Tidak membuatmu anonim sepenuhnya; penyedia VPN dapat melihat lalu lintasmu sehingga harus tepercaya; tidak menggantikan kewaspadaan |
| Enkripsi HTTPS | Melindungi isi komunikasi antara peramban dan situs | Tidak menjamin situs jujur |

Pembahasan VPN di modul ini hanya konsep; kamu tidak diminta memasang atau mendaftar layanan VPN.

### Studi kasus pembanding: dua jaringan

Dua jaringan fiktif sama-sama melayani satu kantor kecil.

| | Jaringan A | Jaringan B |
| --- | --- | --- |
| Enkripsi Wi-Fi | WPA3 atau WPA2-AES, kata sandi panjang dan unik | Kata sandi bawaan pabrik pada perute |
| Akun admin perute | Nama pengguna dan kata sandi diganti | Masih bawaan |
| Tamu dan komputer keuangan | Segmen berbeda | Satu jaringan |
| Firmware | Dicek tiap bulan, tanggal dicatat | Belum pernah |

Jawab dengan kalimat sendiri: (1) apa fungsi yang sama dari kedua jaringan? (2) pengaman mana yang membuat A lebih tahan, dan lapis apa (fisik, jaringan, perangkat, akun, manusia) yang dipertahankan tiap pengaman? (3) jika hanya ada satu perbaikan untuk B, mana yang kamu pilih lebih dulu dan mengapa?

## Contoh daftar konfigurasi (jaringan tiruan)

Contoh daftar yang dapat dibawa ke teknisi untuk jaringan fiktif "Sekolah Contoh". Ini daftar yang ditulis di kertas, bukan perintah untuk dijalankan.

```text
[ ] Enkripsi Wi-Fi: WPA3 (atau WPA2-AES) pada jaringan utama
[ ] Kata sandi Wi-Fi panjang dan unik (tidak ditulis di dokumen ini)
[ ] Akun admin perute: nama pengguna dan kata sandi bawaan diganti
[ ] Akses admin jarak jauh: dimatikan
[ ] Jaringan tamu: terpisah dari jaringan utama
[ ] Segmentasi: administrasi, siswa, tamu, perangkat pintar
[ ] Firmware perute terbarui (tanggal pemeriksaan dicatat)
[ ] Aturan tembok api: tolak dulu, izinkan yang diperlukan
[ ] Colokan kabel tak terpakai: dinonaktifkan
[ ] Daftar perangkat terhubung: diperiksa tiap bulan
```

## Kegiatan mandiri terbimbing

Kerjakan di kertas. Semua jaringan tiruan; jangan mencoba apa pun pada jaringan sungguhan.

**Kasus 1 (perute rumah fiktif).** Perute keluarga fiktif memakai nama pengguna dan kata sandi bawaan pabrik, enkripsi lama, dan firmware belum pernah diperbarui. Daftarkan lima perbaikan berurutan dan alasannya.

**Kasus 2 (segmentasi).** Kantor fiktif memiliki komputer keuangan, komputer tamu, dan kamera pengawas. Buat rancangan tiga segmen dan aturan aksesnya, memakai alamat contoh `192.0.2.x`.

**Kasus 3 (hak minimum).** Tulis hak akses yang tepat untuk empat peran fiktif (guru, siswa, tamu, teknisi) pada jaringan sekolah tiruan, dan satu hak yang sengaja tidak diberikan kepada masing-masing.

**Kasus 4 (VPN konseptual).** Seorang tokoh fiktif ingin memakai Wi-Fi kafe untuk membuka akun penting. Tulis risiko, apa yang dapat dibantu VPN, apa yang tidak, dan satu alternatif yang lebih aman.

**Kasus 5 (daftar konfigurasi).** Lengkapi daftar konfigurasi di atas untuk jaringan kabel sebuah laboratorium fiktif dan tambahkan tiga butir yang kamu anggap penting.

Seperti pada modul lain, jangan menempelkan konfigurasi perute, kata sandi, atau alamat jaringan nyata ke asisten AI. Asisten AI boleh dipakai untuk menjelaskan istilah, tetapi saran konfigurasinya perlu dicek ke panduan resmi pabrikan dan guru (kebijakan AI silabus v1.3 bagian 7.4).

## Petunjuk jawaban

Cocokkan setelah kamu menulis jawabanmu sendiri. Jawaban lain boleh bila alasannya jelas.

- **Prediksi dulu.** Tiga risiko terbesar contoh: jaringan terbuka tanpa enkripsi (isi komunikasi dan akses mudah); akun admin bawaan `admin / admin` dengan akses dari luar aktif (perute mudah diambil alih); tamu dan TV satu jaringan dengan komputer keluarga (tidak ada segmentasi). Risiko lain yang sah: firmware belum diperbarui (celah yang sudah diketahui), nama jaringan memuat nama dan alamat (kebocoran informasi). Bila kamu tidak menyebut dua risiko pertama, baca ulang baris enkripsi dan akun admin pada tabel.
- **Studi kasus pembanding.** (1) Keduanya menyediakan jaringan untuk kantor yang sama. (2) Enkripsi modern dan kata sandi unik (lapis jaringan dan akun), admin diganti (lapis akun), segmentasi (lapis jaringan), pembaruan firmware (lapis perangkat). (3) Contoh: ganti akun admin dan kata sandi Wi-Fi karena langsung menutup pintu yang paling mudah ditebak; urutan lain boleh bila alasannya jelas.
- **Kasus 1.** Lima perbaikan berurutan: ganti nama pengguna dan kata sandi admin; ganti enkripsi ke WPA3 atau WPA2-AES dengan kata sandi baru panjang dan unik; matikan akses admin dari internet; perbarui firmware; sediakan jaringan tamu terpisah. Tiap perbaikan disertai alasan (setelan bawaan terlalu dikenal, enkripsi lama lemah, mengurangi permukaan risiko, celah diketahui ditutup, tamu tidak menjangkau perangkat utama).
- **Kasus 2.** Contoh tiga segmen: keuangan, tamu, kamera. Aturan: keuangan tidak dapat dijangkau dari tamu dan kamera; tamu hanya ke internet; kamera hanya ke perekam dan tidak ke keuangan. Alamat contoh memakai `192.0.2.x` dengan awalan seperti rencana di atas.
- **Kasus 3.** Contoh: guru boleh membaca dan mengubah berkas tugas, tidak boleh mengubah pengaturan perute; siswa boleh mengakses server tugas, tidak boleh ke segmen administrasi; tamu hanya internet, tidak ke jaringan lokal; teknisi boleh mengubah perute, tidak boleh membaca berkas siswa. Jawaban lain benar bila tiap peran diberi akses secukupnya.
- **Kasus 4.** Risiko: jaringan terbuka dapat disadap atau ditiru; VPN dapat mengenkripsi lalu lintas antara perangkat dan penyedia VPN, tetapi tidak membuatmu anonim penuh, penyedia VPN dapat melihat lalu lintasmu, dan ia tidak menolong bila kamu tertipu situs palsu. Alternatif lebih aman: data seluler sendiri, atau menunda transaksi penting sampai di jaringan tepercaya.
- **Kasus 5.** Daftar baik memuat butir kabel: ruang terkunci, colokan tak terpakai dinonaktifkan, segmentasi, label kabel dan perangkat, kontrol akses perangkat; butir tambahan contoh: pencatatan akses, cadangan konfigurasi, siapa yang dihubungi bila ada kejadian.

## Latihan bercampur

Soal ini mencampur materi modul ini dengan modul model jaringan. Kantor fiktif "Kantor Contoh" punya komputer keuangan, tamu, dan kamera. Seorang karyawan mengeluh "internet mati" dan seorang tamu mencoba masuk ke komputer keuangan lewat Wi-Fi tamu.

1. Tulis urutan diagnosis untuk keluhan "internet mati" (enam langkah) dan satu langkah keamanan yang tidak boleh dilewati saat memperbaiki (misalnya mengubah setelan).
2. Jaringan tamu dapat menjangkau komputer keuangan. Pengaman apa yang gagal dan perbaikannya?
3. Dua pernyataan: "Dengan VPN, kantor kita pasti aman." dan "Dengan tembok api, karyawan yang membuka tautan palsu tetap aman." Nilai kedua pernyataan.

Petunjuk jawaban: (1) fisik, alamat IP, gerbang, tujuan, nama (DNS), layanan; jangan menonaktifkan pengaman (misalnya tembok api atau kata sandi) hanya untuk "mencoba" dan catat setiap perubahan. (2) Segmentasi dan aturan akses gagal; pisahkan segmen tamu dan keuangan, tolak dulu izinkan yang perlu. (3) Keduanya salah: VPN tidak menggantikan kewaspadaan dan tidak melindungi dari perangkat yang sudah terinfeksi; tembok api tidak melindungi pengguna yang tertipu. Bila (3) kamu setujui, baca ulang tabel "Yang tidak dilindungi".

## Ulang berjarak

Satu minggu lagi, lalu sebulan lagi, jawab tanpa membuka modul ini lalu cocokkan.

1. Sebutkan lima lapis pertahanan berlapis dan satu pengaman tiap lapis.
2. Sebutkan lima pengaturan keamanan Wi-Fi dan alasannya.
3. Apa yang dilindungi dan tidak dilindungi oleh tembok api, VPN, dan HTTPS?

## Daftar periksa mandiri

Isi untuk dirimu sendiri; tanpa nilai dan tidak dikumpulkan.

- [ ] Saya dapat menjelaskan pertahanan berlapis dengan contoh.
- [ ] Saya dapat menyebut pengaturan keamanan Wi-Fi yang penting dan alasannya.
- [ ] Saya dapat menjelaskan segmentasi dan prinsip hak minimum.
- [ ] Saya dapat menjelaskan apa yang dapat dan tidak dapat dilakukan tembok api dan VPN.
- [ ] Saya tahu bahwa pembaruan firmware menutup celah yang sudah diketahui.
- [ ] Saya tahu bahwa saya tidak boleh menguji keamanan jaringan yang bukan milik saya.

Daftar periksa ini penilaian dirimu, dan penilaian diri sering lebih yakin daripada kenyataan. Yang menunjukkan penguasaan sebenarnya adalah jawabanmu pada Latihan bercampur dan Ulang berjarak.

## Rujukan

- Panduan Mata Pelajaran Informatika, Fase D – F, 2025: sumber kutipan butir CP di atas.
- Dokumentasi resmi pabrikan perute dan sistem operasi yang kamu pakai untuk langkah konfigurasi yang tepat pada perangkat tertentu.

## Catatan untuk guru

- Modul ini bersifat bertahan. Jangan menambahkan latihan memindai, menebak kata sandi, atau mengakses jaringan yang bukan milik siswa; hal itu dapat menjadi tindak pidana (akses ilegal ke sistem elektronik) dan melanggar kebijakan sekolah. Dasar hukumnya telah bergeser: pangkalan data peraturan BPK mencatat bahwa sebagian ketentuan UU 11/2008 tentang Informasi dan Transaksi Elektronik, termasuk Pasal 30, dicabut oleh UU 1/2023 tentang Kitab Undang-Undang Hukum Pidana, yang mulai berlaku 2 Januari 2026 (https://peraturan.bpk.go.id/Details/37589/uu-no-11-tahun-2008 dan https://peraturan.bpk.go.id/Details/234935/uu-no-1-tahun-2023, dibuka 2026-11-19). Modul ini tidak memberi nasihat hukum dan tidak merinci pasal; guru yang membahasnya memeriksa teks resmi yang berlaku.
- Peragaan konfigurasi hanya pada perangkat lab terisolasi; jangan meminta siswa mengubah perute sekolah atau rumah.
- Tidak ada alamat, kata sandi, atau nama jaringan nyata yang boleh ditulis di lembar kerja.
- Siswa tidak diminta memasang atau mendaftar layanan VPN di perangkat pribadi.
- Ketercapaian dicek lewat petunjuk jawaban, Latihan bercampur, dan Ulang berjarak; daftar periksa mandiri hanyalah penilaian diri. Ingat kembali, Prediksi dulu, studi kasus pembanding, dan Latihan bercampur menambah sekitar 15 menit; bila waktu pendek, berikan Ingat kembali dan Ulang berjarak sebagai tugas rumah tanpa nilai. Tidak ada data siswa yang disimpan di repositori ini.
