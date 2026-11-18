## Untuk siapa modul ini

Modul ini untuk murid kelas X pemula. Isinya mengikuti dua minggu fondasi: jaringan dan internet pada tingkat konsep (FND-X1-M4), lalu pengiriman data dan pemecahan masalah jaringan dasar (FND-X1-M5). Sebaiknya kamu sudah membaca modul representasi data (FND-X1-M3).

Setelah mempelajari modul ini, kamu diharapkan bisa:

- membedakan jaringan lokal dan jaringan luas, kabel dan nirkabel, serta klien dan server;
- menyebut peran router, switch, dan titik akses;
- menjelaskan alamat IP, DNS, dan HTTP/HTTPS secara konsep;
- menguraikan bagaimana sebuah halaman web sampai ke peramban;
- menjelaskan bahwa data dikirim dalam potongan (paket);
- mengurutkan diagnosis gangguan jaringan dari lapisan fisik sampai layanan, dan memakai alat uji sederhana.

Modul ini menyiapkan butir capaian pembelajaran yang berbunyi "memahami konsep dan penerapan serta konfigurasi keamanan dasar untuk konektivitas jaringan data lokal dan internet baik kabel maupun nirkabel". Bagian keamanannya ada di modul keamanan dasar. Modul ini hanya pengantar untuk topik jaringan tingkat lanjut yang akan kamu temui nanti.

Aturan keselamatan dan privasi untuk semua kegiatan:

- Semua alamat dan nama pada modul ini fiktif. Alamat contoh memakai rentang `192.0.2.x` dan nama `contoh.example`, yang memang disediakan untuk contoh dan tidak menunjuk perangkat sungguhan.
- Peta jaringan tidak memuat alamat, kata sandi, atau kredensial nyata sekolah.
- Kegiatan utama modul ini berupa simulasi peran dan tidak butuh internet. Yang memakai perangkat lab atau internet ditandai opsional.

## Jaringan komputer

Jaringan komputer adalah kumpulan perangkat yang saling terhubung untuk bertukar data.

| Pembeda | Jenis | Penjelasan |
| --- | --- | --- |
| Jangkauan | Jaringan lokal (LAN) | menghubungkan perangkat di area dekat, misalnya satu lab atau satu gedung |
| | Jaringan luas (WAN) | menghubungkan jaringan di tempat berjauhan; internet adalah gabungan sangat besar dari banyak jaringan |
| Media | Kabel | data lewat kabel; umumnya stabil dan cepat |
| | Nirkabel | data lewat gelombang radio (misalnya Wi-Fi); praktis tetapi dapat terganggu jarak dan hambatan |
| Peran | Klien | perangkat yang meminta layanan, misalnya komputermu |
| | Server | komputer yang menyediakan layanan, misalnya menyimpan halaman web |

### Perangkat jaringan

| Perangkat | Peran |
| --- | --- |
| Switch | menghubungkan banyak perangkat dalam satu jaringan lokal dan meneruskan data ke perangkat tujuan |
| Router | menghubungkan jaringan yang berbeda, misalnya jaringan lab dengan internet, dan memilih jalur |
| Titik akses (access point) | memancarkan jaringan nirkabel dan menghubungkannya ke jaringan kabel |
| Gateway | pintu keluar dari jaringan lokal ke jaringan lain; biasanya berupa router |

### Alamat IP

Setiap perangkat di jaringan butuh alamat agar data sampai ke tujuan yang benar. Alamat itu disebut **alamat IP**. Pada IPv4, alamat terdiri dari 4 bilangan 0 sampai 255 yang dipisah titik, misalnya `192.0.2.10`. Tiap bilangan satu byte (8 bit), sehingga alamat IPv4 berukuran 32 bit. Misalnya `192` = `11000000`, seperti di modul representasi data. Banyak alamat IPv4 yang mungkin adalah 2^32 = 4.294.967.296, tidak cukup untuk semua perangkat di dunia sehingga ada IPv6 dengan alamat lebih panjang.

Satu alamat istimewa: `127.0.0.1` selalu berarti "komputer ini sendiri" (disebut loopback). Alamat ini berguna untuk menguji bahwa komputermu sendiri bekerja.

### DNS

Manusia lebih mudah mengingat nama seperti `contoh.example` daripada angka. **DNS** (Domain Name System) bekerja seperti buku telepon: ia menerjemahkan nama menjadi alamat IP.

### HTTP dan HTTPS

**HTTP** adalah aturan (protokol) peramban untuk meminta halaman web dan server untuk mengirimkannya. **HTTPS** adalah HTTP yang dienkripsi, sehingga isi yang dikirim sulit dibaca pihak lain di tengah jalan. Peramban menandai alamat HTTPS dengan gembok atau tanda serupa.

### Bagaimana halaman web sampai ke peramban?

Misalkan kamu mengetik `https://contoh.example/halo.html`.

```text
1. Peramban (klien) bertanya ke DNS: "alamat IP contoh.example?"
2. DNS menjawab: "192.0.2.80".
3. Peramban mengirim permintaan ke 192.0.2.80: "tolong kirim halo.html".
4. Permintaan melewati switch dan router sampai ke server.
5. Server mengirim halaman kembali, dalam beberapa paket.
6. Peramban menyusun paket-paket dan menampilkan halaman.
```

Alamat `192.0.2.80` fiktif; tidak ada server sungguhan di sana.

## Kegiatan 1: Permainan peran klien, server, dan DNS

Satu kelompok sekitar 6 murid. Tidak butuh komputer.

| Peran | Pegangan |
| --- | --- |
| Klien (peramban) | kartu "Permintaan" dan lembar kosong untuk halaman |
| DNS | daftar nama dan alamat: `contoh.example` = `192.0.2.80`, `sekolah.example` = `192.0.2.90` |
| Router | kartu rute: `192.0.2.80` ke Server-A, `192.0.2.90` ke Server-B |
| Server-A | halaman bertuliskan "Halo dari Server-A" |
| Server-B | halaman bertuliskan "Halo dari Server-B" |
| Pengamat | mencatat urutan langkah |

Langkah:

1. Klien menulis nama yang diminta (`contoh.example`) lalu menyerahkannya ke DNS.
2. DNS mencari di daftarnya dan menuliskan alamat IP di kartu, lalu mengembalikannya ke Klien.
3. Klien menulis "minta halo.html" dan alamat tujuan pada kartu Permintaan, lalu memberikannya ke Router.
4. Router membaca alamat dan meneruskan kartu ke server yang cocok.
5. Server menulis halaman pada kartu-kartu kecil (satu kalimat per kartu, bernomor 1, 2, 3) dan mengirim satu per satu lewat Router.
6. Klien menyusun kartu menurut nomor dan membacakan halaman.

Ulangi dengan `sekolah.example`. Lalu ulangi dengan nama yang tidak ada di daftar DNS; apa yang terjadi? (Jawab: DNS tidak menemukan alamat sehingga permintaan tidak bisa dikirim; pada peramban muncul pesan galat.)

## Kegiatan 2: Peta jaringan lab

Guru menjelaskan susunan jaringan lab secara lisan atau lewat papan tulis. Murid menggambar peta sederhana: komputer, switch, router, titik akses, dan jalur ke internet. **Jangan menulis alamat nyata, nama jaringan nirkabel nyata, atau kata sandi apa pun.** Beri label dengan nama umum seperti "Komputer-01" atau "Router-Lab".

Opsional: lihat alamat IP lokal komputer lab. Guru menunjukkan letaknya pada pengaturan jaringan. Alamat ini tidak perlu disalin ke tempat lain; cukup dibaca untuk memahami bahwa komputer punya alamat.

## Pengiriman data: paket

Data tidak dikirim sekaligus. Sebuah berkas dipecah menjadi potongan kecil yang disebut **paket**. Tiap paket berisi sebagian data, alamat pengirim, alamat tujuan, dan nomor urut. Paket bisa lewat jalur berbeda lalu disusun ulang di tujuan sesuai nomor.

Mengapa dipecah? Jalur yang sama bisa dipakai bergantian oleh banyak pengguna, dan bila satu paket hilang cukup paket itu yang dikirim ulang, bukan seluruh berkas.

## Memecahkan masalah jaringan

Saat halaman web tak terbuka, jangan menebak. Periksa dari yang paling dasar ke atas:

```text
1. FISIK    : kabel terpasang? lampu port menyala? Wi-Fi tersambung dan sinyal ada?
2. ALAMAT IP: perangkat punya alamat IP? alamatnya masuk akal untuk jaringan ini?
3. GATEWAY  : bisa menjangkau router (gateway)?
4. DNS      : nama bisa diterjemahkan menjadi alamat?
5. LAYANAN  : server atau layanan yang dituju sedang berjalan?
```

Aturan emas: kerjakan berurutan; bila satu tahap gagal, perbaiki dulu sebelum lanjut.

### Alat uji sederhana: ping

`ping` mengirim paket kecil ke sebuah alamat dan menunggu balasan. Bila ada balasan, jalur menuju alamat itu bekerja.

Uji komputer sendiri (aman dan tidak butuh internet):

```sh
ping -c 4 127.0.0.1
```

Pada Linux dan macOS, `-c 4` berarti kirim 4 paket. Pada Windows opsinya `-n 4`. Contoh keluaran yang diharapkan bila berhasil (bentuk dan angka bisa berbeda):

```text
64 bytes from 127.0.0.1: icmp_seq=1 ttl=64 time=0.05 ms
64 bytes from 127.0.0.1: icmp_seq=2 ttl=64 time=0.04 ms
```

Uji gateway lab: guru memberi alamat gateway lab. Gantilah `GATEWAY-LAB` dengan alamat itu.

```sh
ping -c 4 GATEWAY-LAB
```

| Hasil | Arti kemungkinan |
| --- | --- |
| Ada balasan | jalur ke alamat itu bekerja |
| Tidak ada balasan (timeout) | kabel atau Wi-Fi bermasalah, alamat salah, atau perangkat tujuan tidak merespons |

Catatan: sebagian perangkat sengaja tidak membalas ping. Tidak ada balasan belum tentu berarti rusak.

Opsional dan hanya bila kebijakan sekolah mengizinkan akses internet: uji penerjemahan nama dengan `nslookup contoh.example` atau menguji alamat publik lain yang ditunjuk guru. Jangan melakukan uji ke alamat sembarang. Mengirim banyak paket ke pihak lain tanpa izin dapat dianggap gangguan.

## Kegiatan 3: Kartu skenario gangguan

Guru atau kelompok membuat kartu skenario sintetis. Tiap kelompok mengambil satu kartu dan mendiagnosisnya dengan urutan di atas. Contoh tiga kartu:

| Kartu | Gejala | Petunjuk |
| --- | --- | --- |
| A: "kabel lepas" | semua halaman tak terbuka, ikon jaringan menandakan tidak tersambung | lapisan fisik |
| B: "alamat salah" | tersambung, tetapi tidak bisa mencapai router; alamat IP komputer di luar rentang jaringan lab | lapisan alamat IP |
| C: "DNS tidak menjawab" | `ping` ke alamat angka berhasil, tetapi membuka nama gagal | lapisan DNS |

Tiap kelompok menuliskan: gejala, tahap yang diperiksa, hasil tiap tahap, kesimpulan, dan langkah perbaikan.

## Kegiatan 4 (opsional): Berbagi berkas di jaringan lokal terisolasi

Dilakukan hanya bila lab menyediakan jaringan lokal yang terpisah dari internet dan guru menyiapkannya. Dengan panduan guru, satu komputer berbagi satu folder berisi berkas latihan, dan komputer lain membukanya. Jangan membagikan berkas pribadi. Bila lab tidak menyediakan jaringan semacam itu, lewati kegiatan ini; kegiatan utama tidak bergantung padanya.

## Latihan

### Latihan 1: Istilah

Cocokkan: switch, router, klien, server, DNS, HTTPS dengan fungsinya: (a) menyediakan halaman, (b) menerjemahkan nama menjadi alamat IP, (c) menghubungkan dua jaringan berbeda, (d) meminta halaman, (e) menghubungkan perangkat dalam satu jaringan lokal, (f) mengirim halaman secara terenkripsi.

### Latihan 2: Alur halaman web

Urutkan langkah acak berikut menjadi urutan yang benar: (1) server mengirim paket halaman, (2) peramban bertanya ke DNS, (3) peramban menampilkan halaman, (4) peramban mengirim permintaan ke alamat IP, (5) DNS menjawab dengan alamat IP.

### Latihan 3: Alamat IP

a. Apakah `192.0.2.300` alamat IPv4 yang sah? Mengapa?
b. Ubah bilangan `80` pada `192.0.2.80` ke biner 8 bit.
c. Apa arti alamat `127.0.0.1`?

### Latihan 4: Paket

Sebuah berkas dipecah menjadi 5 paket. Paket nomor 3 hilang di jalan. Apa yang perlu dikirim ulang? Mengapa nomor urut penting?

### Latihan 5: Diagnosis

Seorang murid fiktif, Murid-07, tidak bisa membuka halaman web. `ping` ke gateway berhasil. `ping` ke alamat IP publik berhasil. Membuka dengan nama gagal. Di tahap mana masalahnya? Apa perbaikan yang masuk akal?

### Latihan 6: Diagram alir

Gambar diagram alir diagnosis dengan lima tahap (fisik, alamat IP, gateway, DNS, layanan). Beri panah "ya" dan "tidak" pada tiap pertanyaan. Ini adalah keluaran minggu M5. Tambahkan juga diagram alur "membuka halaman web" sebagai keluaran minggu M4.

## Kuis formatif

1. Apa beda LAN dan WAN?
2. Apa peran router?
3. Apa fungsi DNS?
4. Apa beda HTTP dan HTTPS?
5. Mengapa data dikirim dalam paket?
6. Urutkan lima tahap diagnosis jaringan.
7. Apa arti `127.0.0.1`?

## Cek mandiri

- Aku bisa menggambar peta jaringan lab sederhana tanpa alamat nyata.
- Aku bisa menjelaskan langkah dari mengetik alamat sampai halaman muncul.
- Aku bisa mendiagnosis gangguan sederhana dengan urutan yang benar.

## Kunci dan petunjuk

**Latihan 1.** switch-e, router-c, klien-d, server-a, DNS-b, HTTPS-f.

**Latihan 2.** (2), (5), (4), (1), (3).

**Latihan 3.** a. Tidak sah; tiap bagian harus 0 sampai 255. b. `01010000` (64 + 16 = 80). c. Komputer itu sendiri (loopback).

**Latihan 4.** Cukup paket 3 yang dikirim ulang. Nomor urut membuat paket dapat disusun benar walau tiba tidak berurutan.

**Latihan 5.** Masalah di tahap DNS: koneksi dan gateway sehat, tetapi nama tidak diterjemahkan. Perbaikan: periksa pengaturan DNS pada komputer atau minta guru memeriksa layanan DNS lab.

**Latihan 6.** Contoh alur: kabel/Wi-Fi tersambung? tidak: sambungkan. Ya: ada alamat IP? tidak: perbaiki. Ya: `ping` gateway berhasil? tidak: periksa jaringan lokal. Ya: nama dapat diterjemahkan? tidak: periksa DNS. Ya: layanan berjalan? tidak: tunggu atau hubungi pengelola layanan.

**Kegiatan 1 (nama tidak ada).** DNS tidak menemukan alamat sehingga permintaan tidak dapat dikirim.

**Kegiatan 3.** A: lapisan fisik; sambungkan kembali kabel. B: lapisan alamat IP; perbaiki pengaturan alamat. C: lapisan DNS; perbaiki pengaturan DNS.

**Kuis.**

1. LAN menghubungkan perangkat di area dekat; WAN menghubungkan jaringan berjauhan, termasuk internet.
2. Menghubungkan jaringan berbeda dan memilih jalur.
3. Menerjemahkan nama menjadi alamat IP.
4. HTTPS adalah HTTP yang dienkripsi.
5. Agar jalur bisa dipakai bersama dan bila hilang cukup paket itu yang diulang.
6. Fisik, alamat IP, gateway, DNS, layanan.
7. Komputer itu sendiri.

## Langkah berikutnya

Lanjutkan ke modul keamanan dasar (FND-X1-M6): bagaimana melindungi akun dan konektivitas, termasuk mengenali jaringan publik dan tanda HTTPS yang baru kamu kenal. Materi jaringan yang lebih dalam, seperti model jaringan dan pengiriman data antarperangkat secara praktis, akan dibahas pada tingkat lanjut.
