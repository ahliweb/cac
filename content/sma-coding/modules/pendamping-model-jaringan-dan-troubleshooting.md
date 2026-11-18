## Untuk siapa modul ini

Modul pendamping untuk siswa kelas XI (Fase F), semua jalur. Prasyarat: pengantar jaringan di blok fondasi (`FND-X1-M4` dan `FND-X1-M5`: konsep jaringan, pengiriman data, diagnosis dasar). Perkiraan waktu: sekitar 6 JP (dua pertemuan). Siswa jalur B yang sudah mengikuti minggu `B-XI2-M11` (pengiriman data HTTP) membaca modul ini sebagai pendalaman di luar HTTP.

Kegiatan memakai jaringan lab yang terisolasi atau simulasi peran dengan kartu, **bukan jaringan sekolah sungguhan** dan tanpa alamat atau kata sandi nyata. Perintah di modul ini hanya dijalankan bila gurumu mengizinkan dan hanya pada perangkat lab. Modul ini tidak memuat kode C++.

### Butir CP yang dicakup

| Butir | Kutipan CP (Fase F, Berpikir Komputasional) |
| --- | --- |
| F-BK-d | "mengenali berbagai model jaringan komputer serta mampu melakukan pengiriman data antar perangkat dalam jaringan komputer dan troubleshooting permasalahan jaringan komputer" |

### Tujuan

Setelah mempelajari modul ini, kamu diharapkan bisa:

1. membedakan model jaringan: klien-server, rekan sebaya, dan topologi umum;
2. menjelaskan lapisan jaringan secara ringkas dan perjalanan data dari satu perangkat ke perangkat lain;
3. mengirim data antarperangkat di jaringan lab (atau mensimulasikannya);
4. mendiagnosis masalah jaringan secara bertahap dari fisik sampai layanan.

## Model jaringan

| Model | Cara kerja | Kelebihan | Kekurangan |
| --- | --- | --- | --- |
| Klien-server | Klien meminta, server melayani | Terpusat; mudah dikelola dan diamankan | Server menjadi titik tunggal gangguan |
| Rekan sebaya (peer-to-peer) | Tiap perangkat dapat meminta dan melayani | Tidak bergantung satu pusat | Sulit dikelola dan diamankan |

Topologi (bentuk sambungan) yang umum:

| Topologi | Gambaran | Catatan |
| --- | --- | --- |
| Bintang | Semua perangkat terhubung ke satu switch atau titik akses | Paling umum; bila pusat mati, semua terputus |
| Bus | Satu jalur bersama | Jarang dipakai sekarang |
| Cincin | Perangkat tersambung melingkar | Jarang dipakai sekarang |
| Mesh | Banyak sambungan antarperangkat | Tahan gangguan; mahal |

Jaringan juga dibedakan menurut jangkauan: lokal (LAN) dan luas (WAN, termasuk internet).

## Lapisan jaringan secara ringkas

Satu cara menyederhanakan jaringan adalah membaginya menjadi lapisan, masing-masing punya tugas.

| Lapisan (model empat lapis) | Tugas | Contoh |
| --- | --- | --- |
| Aplikasi | Layanan yang dipakai pengguna | Peramban, surel, HTTP, DNS |
| Transport | Mengatur pengiriman antaraplikasi (keandalan atau kecepatan) | TCP, UDP |
| Internet | Mengalamatkan dan mengarahkan paket | Alamat IP, router |
| Akses jaringan | Mengirim bit lewat media fisik | Kabel, Wi-Fi, switch |

Data dipotong menjadi **paket**. Tiap lapisan menambahkan keterangan (seperti amplop) sehingga paket dapat sampai dan disusun ulang di tujuan. Router meneruskan paket melewati beberapa jaringan; DNS menerjemahkan nama (seperti `contoh.test`) menjadi alamat IP.

## Pengiriman data antarperangkat

Pada jaringan lab terisolasi, pengiriman data dapat berupa berbagi satu berkas contoh antarkomputer atau uji hubungan antarperangkat. Bila lab tidak mendukung, lakukan **simulasi peran**: tiap murid berperan sebagai klien, switch, router, atau server dan menyampaikan kartu paket sesuai alamat.

Alamat contoh yang aman untuk latihan (rentang dokumentasi yang dicadangkan, bukan jaringan nyata): `192.0.2.10` dan `192.0.2.20` untuk dua komputer fiktif, dan `192.0.2.1` untuk gerbang fiktif.

## Troubleshooting bertahap

Diagnosis dilakukan dari bawah ke atas, satu dugaan setiap kali, dan hasil setiap langkah dicatat.

```text
Langkah 1  Fisik       Kabel terpasang? Lampu port menyala? Wi-Fi tersambung?
Langkah 2  Alamat IP   Perangkat punya alamat IP di jaringan yang benar?
Langkah 3  Gerbang     Dapat menghubungi gerbang (router) lokal?
Langkah 4  Tujuan      Dapat menghubungi perangkat tujuan berdasarkan alamat IP?
Langkah 5  Nama (DNS)  Nama dapat diterjemahkan menjadi alamat IP?
Langkah 6  Layanan     Layanan di tujuan berjalan dan port-nya terbuka?
```

Contoh perintah uji pada sistem yang mengizinkan (gunakan hanya di perangkat lab; nama dan alamat adalah contoh, dan perintah dapat sedikit berbeda antar sistem operasi):

```sh
# Langkah 2: lihat alamat IP perangkat sendiri
ip addr            # Linux; di Windows: ipconfig

# Langkah 3: hubungi gerbang lab (alamat contoh)
ping -c 3 192.0.2.1

# Langkah 4: hubungi perangkat tujuan (alamat contoh)
ping -c 3 192.0.2.20

# Langkah 5: periksa penerjemahan nama (nama contoh)
nslookup contoh.test
```

Cara membaca hasil: bila langkah 3 gagal tetapi alamat IP benar, curigai kabel, Wi-Fi, atau pengaturan gerbang. Bila langkah 4 berhasil tetapi nama gagal, curigai DNS. Bila nama berhasil tetapi layanan tidak tampil, curigai layanan di tujuan atau pembatasan port. Ping dapat diblokir sengaja oleh perangkat tertentu, jadi gagal ping bukan bukti mutlak; cocokkan dengan petunjuk lain.

Aturan keselamatan: hanya uji perangkat dan jaringan yang diizinkan gurumu; jangan memindai atau menguji jaringan sekolah sebenarnya atau milik orang lain; jangan mengubah pengaturan jaringan perangkat bersama tanpa izin.

## Kegiatan mandiri terbimbing

**Kegiatan 1 (model jaringan).** Gambarlah peta jaringan lab fiktif dengan tiga komputer, satu switch, satu router, dan satu server. Beri nama topologinya dan tandai titik tunggal gangguan.

**Kegiatan 2 (perjalanan paket).** Tuliskan urutan peristiwa saat peramban membuka `contoh.test`: DNS, alamat IP, paket, router, server, jawaban. Gunakan alamat contoh dari modul.

**Kegiatan 3 (kartu skenario gangguan).** Untuk setiap kartu fiktif, tulis langkah diagnosis dan dugaan penyebab:

| Kartu | Gejala | Hasil uji yang diberikan guru |
| --- | --- | --- |
| A | "Tidak ada internet" | Lampu port padam |
| B | "Hanya satu komputer bermasalah" | Alamat IP perangkat berbeda jaringan dengan yang lain |
| C | "Bisa ping alamat IP, tidak bisa buka nama" | Penerjemahan nama gagal |
| D | "Situs lab lambat" | Server menerima banyak permintaan sekaligus |
| E | "Berkas tidak terkirim ke komputer lain" | Ping berhasil; layanan berbagi berkas belum berjalan |

**Kegiatan 4 (pengiriman data).** Bila lab mendukung, kirim satu berkas contoh antara dua komputer di jaringan terisolasi dan catat langkahnya. Bila tidak, lakukan simulasi peran dengan kartu paket.

**Kegiatan 5 (catatan diagnosis).** Pilih satu kartu dan tulis catatan diagnosis tiga baris: gejala, langkah yang diuji, kesimpulan.

## Daftar periksa mandiri

Isi untuk dirimu sendiri; tanpa nilai dan tidak dikumpulkan.

- [ ] Saya dapat membedakan klien-server dan rekan sebaya.
- [ ] Saya dapat menyebut empat topologi dan satu kekurangan masing-masing.
- [ ] Saya dapat menjelaskan tugas empat lapisan secara ringkas.
- [ ] Saya hafal urutan diagnosis dari fisik sampai layanan.
- [ ] Saya tahu bahwa gagal ping bukan satu-satunya bukti masalah.
- [ ] Saya hanya menguji perangkat dan jaringan yang diizinkan.

## Catatan untuk guru

- Jaringan lab harus terisolasi dari jaringan sekolah dan internet publik bila memungkinkan; uji ke internet hanya bila kebijakan sekolah mengizinkan.
- Alamat `192.0.2.0/24` dipakai karena dicadangkan untuk dokumentasi; jangan menggantinya dengan alamat jaringan sekolah.
- Perintah dapat berbeda antar sistem operasi; sesuaikan dengan perangkat lab dan sampaikan sebelum kegiatan.
- Bila lab tidak mendukung, seluruh modul dapat dijalankan sebagai simulasi peran dengan kartu.
- Jalur B: bagian pengiriman data HTTP sudah dibahas di `B-XI2-M11`; modul ini menjadi pendalaman model, lapisan, dan diagnosis.
- Ketercapaian dicek lewat daftar periksa mandiri; tidak ada data siswa yang disimpan di repositori ini.
