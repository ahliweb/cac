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

## Ingat kembali

Tutup catatanmu dan tulis jawaban singkat sebelum membaca lanjut.

1. Apa tugas klien dan server? (`FND-X1-M4`)
2. Apa fungsi alamat IP dan apa fungsi DNS?
3. Mengapa data dikirim sebagai paket? (`FND-X1-M5`)
4. Urutkan diagnosis dasar dari yang pertama diperiksa sampai yang terakhir.

Cocokkan: (1) klien meminta, server melayani; (2) IP menunjuk perangkat, DNS menerjemahkan nama menjadi IP; (3) potongan kecil dapat melewati jalur berbeda dan bagian yang hilang diulang; (4) fisik (kabel, Wi-Fi), alamat IP, DNS, lalu layanan. Bila ada yang meleset, baca ulang catatan `FND-X1-M4` dan `FND-X1-M5` sebelum lanjut.

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

Ada juga model tujuh lapis (OSI) yang sering kamu temui di buku dan kuis; modul ini memakai model empat lapis di atas, dan keduanya hanya cara membagi tugas, bukan kenyataan fisik yang berbeda.

Data dipotong menjadi **paket**. Tiap lapisan menambahkan keterangan (seperti amplop) sehingga paket dapat sampai dan disusun ulang di tujuan. Router meneruskan paket melewati beberapa jaringan; DNS menerjemahkan nama (seperti `contoh.test`) menjadi alamat IP.

## Pengiriman data antarperangkat

Pada jaringan lab terisolasi, pengiriman data dapat berupa berbagi satu berkas contoh antarkomputer atau uji hubungan antarperangkat. Bila lab tidak mendukung, lakukan **simulasi peran**: tiap murid berperan sebagai klien, switch, router, atau server dan menyampaikan kartu paket sesuai alamat.

Alamat contoh yang aman untuk latihan di kertas (rentang dokumentasi yang dicadangkan RFC 5737, bukan jaringan nyata dan tidak untuk muncul di internet publik): `192.0.2.10` dan `192.0.2.20` untuk dua komputer fiktif, dan `192.0.2.1` untuk gerbang fiktif. Karena itu perintah di bagian berikut tidak akan berhasil bila dijalankan begitu saja; untuk praktik nyata di jaringan lab terisolasi, guru menyiapkan alamat privat milik lab (misalnya rentang `192.168.x.x`) dan mengganti alamat contoh, atau seluruh langkah disimulasikan dengan kartu.

## Prediksi dulu

Sebelum membaca langkah diagnosis dan "Cara membaca hasil" di bawah, tulis dugaanmu. (1) Ping ke gerbang berhasil, ping ke alamat tujuan berhasil, tetapi nama tujuan tidak dapat diterjemahkan: bagian mana yang bermasalah (fisik, alamat IP, DNS, atau layanan)? (2) Ping ke gerbang gagal padahal alamat IP perangkatmu benar: apa dua dugaanmu? (3) Ping ke tujuan berhasil dan nama berhasil, tetapi layanan tidak tampil: apa dugaanmu? Simpan dugaanmu; kamu akan mencocokkannya dengan "Cara membaca hasil".

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
ping -c 3 192.0.2.1      # Linux dan macOS; di Windows: ping -n 3 192.0.2.1

# Langkah 4: hubungi perangkat tujuan (alamat contoh)
ping -c 3 192.0.2.20     # Windows: ping -n 3 192.0.2.20

# Langkah 5: periksa penerjemahan nama (nama contoh)
nslookup contoh.test
```

Catatan: `contoh.test` memakai akhiran `.test` yang dicadangkan untuk pengujian (RFC 2606) dan tidak ada di DNS publik. Di luar jaringan yang punya server DNS lab untuk nama itu, `nslookup contoh.test` memang selalu gagal (penyusun mencobanya pada 2026-11-19 dan mendapat `NXDOMAIN`, yaitu nama tidak ditemukan). Jadi langkah 5 hanya bermakna bila guru menyiapkan DNS lab, atau dilakukan sebagai simulasi.

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

## Petunjuk jawaban

Cocokkan setelah kamu menulis jawabanmu sendiri. Jawaban lain boleh bila alasannya jelas.

- **Prediksi dulu.** (1) Langkah 5 (nama atau DNS). (2) Kabel, Wi-Fi, atau pengaturan gerbang yang bermasalah; perangkat gerbang memblokir ping. (3) Layanan di tujuan tidak berjalan atau port-nya tertutup. Bila dugaanmu meleset, baca ulang "Cara membaca hasil".
- **Kegiatan 1.** Contoh peta: tiga komputer, server, dan router semuanya tersambung ke satu switch (topologi bintang). Titik tunggal gangguan: switch (bila mati, semua terputus) dan router (bila mati, keluar jaringan terputus). Server juga titik tunggal untuk layanannya.
- **Kegiatan 2.** Urutan: peramban meminta DNS menerjemahkan `contoh.test`; DNS membalas alamat IP; peramban membuat sambungan dan mengirim permintaan sebagai paket; router meneruskan paket ke jaringan tujuan; server menerima dan menjawab; paket jawaban dikembalikan dan disusun di peramban.
- **Kegiatan 3.** A: langkah 1; lampu port padam, curigai kabel, port, atau switch; periksa kabel dan port lain. B: langkah 2; alamat IP berada di jaringan yang berbeda, curigai pengaturan alamat atau tersambung ke jaringan salah; betulkan pengaturannya. C: langkah 5; penerjemahan nama gagal, curigai DNS; periksa pengaturan DNS. D: langkah 6; jalur sehat tetapi server kewalahan menerima banyak permintaan, curigai kapasitas layanan; kurangi beban atau tambah kapasitas, ini bukan masalah jalur. E: langkah 6; ping berhasil, jadi jalurnya sehat; curigai layanan berbagi berkas belum berjalan atau port tertutup; jalankan layanan dan periksa port.
- **Kegiatan 4 dan 5.** Catatan tiga baris yang baik memuat satu gejala, satu langkah dengan hasilnya, dan satu kesimpulan yang disebut dugaan, bukan kepastian. Bila kesimpulanmu "pasti rusak" tanpa langkah yang diuji, kembali ke langkah 1.

## Latihan bercampur

Soal ini mencampur model, lapisan, dan diagnosis. Kerjakan tiap bagian.

1. Tiga komputer lab tersambung ke satu switch, dan tidak ada server pusat: dua komputer bertukar berkas langsung satu sama lain. Sebutkan topologi dan model jaringannya.
2. Kartu F: ping ke gerbang berhasil, ping ke komputer tujuan gagal padahal komputer itu menyala. Tulis langkah dan dugaan penyebab.
3. Kartu G: nama diterjemahkan, ping berhasil, tetapi peramban menampilkan "situs tidak dapat dijangkau". Tulis langkah dan dugaan.
4. Sebutkan lapisan (model empat lapis) tempat HTTP, TCP, alamat IP, dan kabel berada.

Petunjuk jawaban: (1) topologi bintang; model rekan sebaya (peer-to-peer). (2) langkah 4; dugaan alamat tujuan salah, komputer tujuan berada di jaringan lain, atau ia memblokir ping (ping bukan bukti mutlak), jadi cocokkan dengan petunjuk lain, misalnya menguji layanannya. (3) langkah 6; layanan web di server tidak berjalan atau port tertutup. (4) HTTP: aplikasi; TCP: transport; alamat IP: internet; kabel: akses jaringan. Bila (2) kamu simpulkan "kabel rusak", ulangi: ping ke gerbang berhasil, jadi kabelmu sehat.

## Ulang berjarak

Satu minggu lagi, lalu sebulan lagi, jawab tanpa membuka modul ini lalu cocokkan.

1. Beda klien-server dan rekan sebaya, dan satu kekurangan tiap model.
2. Sebutkan empat lapisan dan satu contoh tiap lapisan.
3. Tulis enam langkah diagnosis berurutan dan mengapa urutannya dari bawah ke atas.

## Daftar periksa mandiri

Isi untuk dirimu sendiri; tanpa nilai dan tidak dikumpulkan.

- [ ] Saya dapat membedakan klien-server dan rekan sebaya.
- [ ] Saya dapat menyebut empat topologi dan satu kekurangan masing-masing.
- [ ] Saya dapat menjelaskan tugas empat lapisan secara ringkas.
- [ ] Saya hafal urutan diagnosis dari fisik sampai layanan.
- [ ] Saya tahu bahwa gagal ping bukan satu-satunya bukti masalah.
- [ ] Saya hanya menguji perangkat dan jaringan yang diizinkan.

Daftar periksa ini penilaian dirimu, dan penilaian diri sering lebih yakin daripada kenyataan. Yang menunjukkan penguasaan sebenarnya adalah jawabanmu pada Latihan bercampur dan Ulang berjarak.

## Catatan untuk guru

- Jaringan lab harus terisolasi dari jaringan sekolah dan internet publik bila memungkinkan; uji ke internet hanya bila kebijakan sekolah mengizinkan.
- Alamat `192.0.2.0/24` dipakai di kertas karena dicadangkan untuk dokumentasi (RFC 5737); untuk praktik nyata pakai alamat privat lab terisolasi dan jangan memakai alamat jaringan sekolah.
- Perintah dapat berbeda antar sistem operasi (misalnya `ping -n` di Windows, `ping -c` di Linux dan macOS); sesuaikan dengan perangkat lab dan sampaikan sebelum kegiatan.
- Sebelum kelas, uji di lab: alamat privat lab yang menggantikan `192.0.2.x`, DNS lab untuk `contoh.test` (atau simulasikan langkah 5), dan izin menjalankan `ping` (sebagian sistem membatasinya).
- Bila lab tidak mendukung, seluruh modul dapat dijalankan sebagai simulasi peran dengan kartu.
- Jalur B: bagian pengiriman data HTTP sudah dibahas di `B-XI2-M11`; modul ini menjadi pendalaman model, lapisan, dan diagnosis.
- Ketercapaian dicek lewat petunjuk jawaban, Latihan bercampur, dan Ulang berjarak; daftar periksa mandiri hanyalah penilaian diri. Ingat kembali, Prediksi dulu, dan Latihan bercampur menambah sekitar 15 menit; bila waktu pendek, berikan Ingat kembali dan Ulang berjarak sebagai tugas rumah tanpa nilai. Tidak ada data siswa yang disimpan di repositori ini.
