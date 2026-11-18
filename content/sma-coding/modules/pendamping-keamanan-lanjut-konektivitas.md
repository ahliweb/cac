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

Catatan: menyembunyikan SSID dan menyaring alamat perangkat hanyalah pengaman tambahan yang lemah; keduanya tidak menggantikan enkripsi modern.

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
Segmen administrasi : 192.0.2.0/26    (host 192.0.2.1 sampai 192.0.2.62)
Segmen siswa        : 192.0.2.64/26   (host 192.0.2.65 sampai 192.0.2.126)
Segmen tamu         : 192.0.2.128/26  (host 192.0.2.129 sampai 192.0.2.190)
Nama layanan tugas  : tugas.sekolah.example
```

**Prinsip hak minimum:** setiap pengguna, perangkat, dan layanan hanya diberi akses sebesar yang diperlukan untuk tugasnya, dan dicabut bila tugas selesai. Contoh: akun siswa tidak perlu hak mengubah setelan perute; layanan cetak tidak perlu akses ke berkas administrasi.

## Tembok api dan VPN (konseptual)

| Alat | Fungsi | Yang tidak dilindungi |
| --- | --- | --- |
| Tembok api (firewall) | Menyaring lalu lintas masuk dan keluar berdasarkan aturan; prinsip dasar: tolak dulu, izinkan yang perlu | Pengguna yang tertipu membuka tautan palsu; perangkat yang sudah terinfeksi di dalam jaringan |
| VPN (jaringan privat virtual) | Membuat terowongan terenkripsi antara perangkat dan jaringan tertentu, misalnya saat memakai Wi-Fi umum atau mengakses jaringan kantor | Tidak membuatmu anonim sepenuhnya; penyedia VPN dapat melihat lalu lintasmu sehingga harus tepercaya; tidak menggantikan kewaspadaan |
| Enkripsi HTTPS | Melindungi isi komunikasi antara peramban dan situs | Tidak menjamin situs jujur |

Pembahasan VPN di modul ini hanya konsep; kamu tidak diminta memasang atau mendaftar layanan VPN.

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

## Daftar periksa mandiri

Isi untuk dirimu sendiri; tanpa nilai dan tidak dikumpulkan.

- [ ] Saya dapat menjelaskan pertahanan berlapis dengan contoh.
- [ ] Saya dapat menyebut pengaturan keamanan Wi-Fi yang penting dan alasannya.
- [ ] Saya dapat menjelaskan segmentasi dan prinsip hak minimum.
- [ ] Saya dapat menjelaskan apa yang dapat dan tidak dapat dilakukan tembok api dan VPN.
- [ ] Saya tahu bahwa pembaruan firmware menutup celah yang sudah diketahui.
- [ ] Saya tahu bahwa saya tidak boleh menguji keamanan jaringan yang bukan milik saya.

## Rujukan

- Panduan Mata Pelajaran Informatika, Fase D – F, 2025: sumber kutipan butir CP di atas.
- Dokumentasi resmi pabrikan perute dan sistem operasi yang kamu pakai untuk langkah konfigurasi yang tepat pada perangkat tertentu.

## Catatan untuk guru

- Modul ini bersifat bertahan. Jangan menambahkan latihan memindai, menebak kata sandi, atau mengakses jaringan yang bukan milik siswa; hal itu melanggar hukum (UU ITE) dan kebijakan sekolah.
- Peragaan konfigurasi hanya pada perangkat lab terisolasi; jangan meminta siswa mengubah perute sekolah atau rumah.
- Tidak ada alamat, kata sandi, atau nama jaringan nyata yang boleh ditulis di lembar kerja.
- Siswa tidak diminta memasang atau mendaftar layanan VPN di perangkat pribadi.
- Ketercapaian dicek lewat daftar periksa mandiri; tidak ada data siswa yang disimpan di repositori ini.
