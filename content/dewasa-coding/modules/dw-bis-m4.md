## Untuk siapa modul ini

Modul ini untuk jalur **pebisnis/UMKM** (`BIS`), 6 jam, sesudah `DW-BIS-M3`. Alatnya penyunting teks dan peramban; halaman dibuka langsung dari berkas di komputer Anda, tanpa server dan tanpa akun. Memasang halaman di internet **tidak diwajibkan**: domain dan hosting dibahas sebagai konsep, tanpa nama layanan, tanpa angka tarif. Estimasi tiga sesi `[asumsi]`.

Semua isi **sintetis**: Toko Kue Contoh, alamat surel berakhiran `.example` (tidak bisa dipakai di dunia nyata), dan harga rekaan. Jangan memasang data nyata Anda atau pelanggan di halaman latihan. Modul ini bukan nasihat hukum.

## Cek awal pengalaman

Jawab tanpa melihat apa pun, lalu cocokkan dengan kunci. Skor tidak dicatat.

1. Apa beda domain dan hosting?
2. Apa arti situs statis, dalam satu kalimat?
3. Apa fungsi atribut `alt` pada gambar?
4. Mengapa testimoni pelanggan lengkap dengan nama dan foto tidak boleh dipasang sembarangan?
5. Sebutkan empat hal yang sebaiknya ada di halaman usaha kecil agar pembeli tahu cara memesan.

Bila kelimanya benar, Anda boleh melewati "Contoh terselesaikan" dan "Contoh setengah jadi" dan langsung ke "Latihan".

## Ingat kembali

Tanpa melihat modul sebelumnya, tulis jawaban singkat.

1. (`DW-BIS-M3`) Mengapa sumbu grafik batang sebaiknya dimulai dari nol?
2. (`DW-BIS-M1`) Sebutkan tiga data pribadi yang lazim dikumpulkan sebuah toko dan jelaskan mengapa data itu menaikkan risiko.
3. (`DW-PRS-M4`, bila Anda sudah mengambilnya; bila belum, jawab dari akal sehat) Apa yang diperiksa sebelum halaman dibagikan kepada orang lain?

Cocokkan: (1) tinggi batang harus sebanding dengan nilai; (2) nama, nomor telepon, alamat; datanya membuat orang dapat dikenali dan dihubungi sehingga kebocoran merugikan mereka; (3) data pribadi, kredensial (kata sandi, kunci, token), dan bahwa server latihan hanya berjalan di komputer sendiri.

## Tujuan

Setelah modul ini Anda dapat membuat halaman usaha statis (dengan no-code atau templat atau tulisan sendiri) dan menjelaskan konsep domain dan hosting.

## Prediksi dulu

Lihat kode halaman di bagian berikut. Sebelum membukanya di peramban, tulis prediksi Anda:

1. Apa yang tampil di judul tab peramban?
2. Berapa baris yang tampil di tabel, termasuk baris judul?
3. Bila gambar yang ditaut tidak ditemukan tetapi `alt` terisi, apa yang pembaca lihat atau dengar?

## Contoh terselesaikan

### Domain, hosting, dan jenis situs

**Domain** adalah alamat yang mudah dibaca manusia untuk sebuah server di internet; tanpanya orang harus memakai alamat IP yang sulit diingat ([MDN: apa itu nama domain](https://developer.mozilla.org/en-US/docs/Learn_web_development/Howto/Web_mechanics/What_is_a_domain_name)). **Hosting** adalah komputer (server web) yang menyimpan berkas situs dan mengirimnya ke peramban ([MDN: apa itu server web](https://developer.mozilla.org/en-US/docs/Learn_web_development/Howto/Web_mechanics/What_is_a_web_server)). Analogi: domain adalah alamat toko, hosting adalah bangunan tempat barang disimpan. Keduanya bisa dibeli dari penyedia berbeda.

Situs **statis** mengirim berkas apa adanya; situs **dinamis** menambah perangkat lunak aplikasi dan basis data yang menyusun halaman saat diminta (MDN, halaman yang sama). Profil usaha kecil cukup statis; toko dengan keranjang belanja dan akun (`DW-BIS-M5`) biasanya dinamis.

Untuk domain berakhiran `.id`, pendaftaran diterima oleh registrar yang harus diakreditasi oleh PANDI selaku registri di Indonesia ([PANDI: daftar registrar](https://pandi.id/partner-registrar), dibuka 2026-11-19). Domain umumnya disewa untuk jangka tertentu dan perlu diperpanjang; syarat perpanjangan, masa tenggang, dan biayanya berbeda-beda, jadi baca halaman Manajemen Domain di situs PANDI dan ketentuan registrar Anda. Modul ini tidak memuat angka tarif atau masa tenggang `[belum terverifikasi]`.

### Tiga cara membuat halaman

| Cara | Kelebihan | Hal yang dinilai |
| --- | --- | --- |
| Layanan no-code | cepat, tanpa menulis kode | data dan tampilan ada di layanan; biaya berulang; sulit pindah |
| Templat yang Anda ubah | tampilan siap, Anda pegang berkasnya | perlu paham sedikit struktur halaman; periksa lisensi templat |
| Menulis sendiri | kendali penuh, ringan | perlu belajar dasar HTML; semua perawatan di tangan Anda |

Kriteria memilih: siapa yang memegang data dan berkasnya, biaya berulang, kemudahan pindah penyedia, dan lisensi. Tidak ada pilihan yang benar untuk semua usaha.

### Isi halaman usaha

Yang perlu ada: nama usaha, apa yang dijual dan harga (atau cara menanyakannya), cara memesan, jam dan area, dan satu kontak. Yang sengaja **tidak** dipasang: nomor telepon pribadi atau alamat rumah bila tidak perlu, dan data atau foto pelanggan tanpa izin. Foto produk harus milik Anda atau berizin.

### Halaman contoh

Simpan sebagai `index.html`, lalu buka dengan peramban:

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Toko Kue Contoh: kue rumahan, pesan lewat surel</title>
  <meta name="description" content="Halaman usaha rekaan untuk latihan: daftar kue, cara memesan, jam, dan kontak.">
  <style>
    body { font-family: sans-serif; max-width: 40rem; margin: 0 auto; padding: 1rem; line-height: 1.5; color: #222; background: #fff; }
    a { color: #0b4fb3; }
    table { border-collapse: collapse; width: 100%; }
    th, td { text-align: left; padding: 0.4rem; border-bottom: 1px solid #bbb; }
  </style>
</head>
<body>
  <header>
    <h1>Toko Kue Contoh</h1>
    <p>Kue rumahan untuk acara keluarga. Ini usaha rekaan untuk latihan.</p>
  </header>
  <main>
    <section>
      <h2>Daftar kue</h2>
      <table>
        <tr><th>Kue</th><th>Harga contoh</th></tr>
        <tr><td>Brownies</td><td>Rp 48.000</td></tr>
        <tr><td>Bolu pandan</td><td>Rp 35.000</td></tr>
        <tr><td>Nastar (toples)</td><td>Rp 85.000</td></tr>
      </table>
      <p>Harga dapat berubah; tanyakan sebelum memesan.</p>
    </section>
    <section>
      <h2>Cara memesan</h2>
      <ol>
        <li>Kirim surel berisi nama kue, jumlah, dan tanggal ambil.</li>
        <li>Tunggu balasan konfirmasi dari kami.</li>
        <li>Bayar sesuai petunjuk di balasan, lalu ambil pesanan.</li>
      </ol>
    </section>
    <section>
      <h2>Jam dan area</h2>
      <p>Buka Senin sampai Sabtu, pukul 08.00 sampai 16.00 (jam contoh). Ambil di tempat; area contoh: Kota Contoh.</p>
    </section>
    <section>
      <h2>Kontak</h2>
      <p>Surel: <a href="mailto:halo@tokokue-contoh.example">halo@tokokue-contoh.example</a></p>
    </section>
  </main>
  <footer>
    <p>Semua isi halaman ini rekaan untuk latihan.</p>
  </footer>
</body>
</html>
```

Cara membacanya (dicoba: halaman ini dimuat di peramban Chrome tanpa antarmuka, tampil satu kolom di lebar ponsel, dan pemeriksa tag sederhana tidak menemukan tag yang tidak berpasangan). `lang="id"` memberi tahu pembaca layar bahasanya; `viewport` membuat halaman menyesuaikan lebar layar ponsel; `title` tampil di tab dan hasil pencarian; judul bertingkat (`h1` lalu `h2`) menjadi kerangka halaman; tautan `mailto:` membuka aplikasi surel. Tabel pada contoh memuat satu baris judul dan tiga baris kue, jadi empat baris. Untuk gambar, selalu beri `alt` yang menjelaskan isi gambar ([MDN: elemen img](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/img)):

```html
<img src="brownies.jpg" alt="Brownies cokelat dipotong persegi dalam kotak karton">
```

Berkas `brownies.jpg` harus milik Anda sendiri. Bila berkas tidak ditemukan, teks `alt` tampil sebagai gantinya.

### Periksa sebelum dibagikan

Cek: tidak ada data pribadi atau data pelanggan nyata; tidak ada kata sandi, kunci, atau token di berkas; foto dan teks milik Anda atau berizin; semua tautan berfungsi; teks cukup besar dan kontras; setiap gambar punya `alt`; halaman dicoba pada lebar layar ponsel. Simpan salinan berkas di tempat terpisah, dan bila memakai penyedia, aktifkan autentikasi dua langkah pada akunnya (`DW-FND-M1`).

## Contoh setengah jadi

Lengkapi titik-titik pada potongan halaman usaha **rekaan** lain:

```html setengah-jadi
<html lang="___">
<head>
  <meta ___="viewport" content="width=device-width, initial-scale=1">
  <___>Warung Kopi Contoh</___>
</head>
<body>
  <h1>Warung Kopi Contoh</h1>
  <h2>Menu</h2>
  <img src="kopi.jpg" ___="Segelas kopi hitam di meja kayu">
</body>
</html>
```

Lalu lengkapi: "Sebelum membagikan halaman, saya memeriksa ____."

## Latihan

1. **Ubah.** Ubah halaman contoh menjadi usaha rekaan Anda sendiri: nama, tiga produk, jam, dan satu surel berakhiran `.example`. Prediksi dulu: bagian mana dari kode yang Anda ubah dan mana yang tidak?
2. **Buat.** Tambahkan bagian "Pertanyaan umum" dengan tiga tanya jawab. Pastikan judulnya `h2` dan urutan judul tidak melompat.
3. **Jelaskan.** Bandingkan dua penawaran rekaan (angka rekaan, bukan penawaran nyata). A: domain 120.000 per tahun dan hosting 25.000 per bulan. B: domain gratis tahun pertama lalu 200.000 per tahun, hosting 270.000 per tahun. Hitung biaya tahun pertama dan tahun kedua, dan jelaskan pelajaran dari hasilnya.
4. **Buat.** Tulis daftar periksa "sebelum dibagikan" milik Anda dalam sepuluh butir atau kurang.
5. **Berpasangan (opsional).** Tukar halaman dengan rekan; coba temukan satu data pribadi yang terlewat, satu gambar tanpa `alt`, dan satu tautan rusak. Peserta mandiri boleh melewati tugas ini.

## Latihan bercampur

1. (`DW-BIS-M3`) Anda ingin memasang ringkasan penjualan Toko Kue Contoh di halaman. Apa yang diperiksa pada grafiknya, dan angka apa yang tidak dipasang?
2. (`DW-BIS-M2`) Bila `pelanggan_kode` pada buku penjualan Anda berisi nama dan telepon nyata, apakah berkas itu boleh ditaruh di folder situs? Jelaskan.

## Keluaran portofolio

**Situs statis usaha sintetis.** Berkas `index.html` (dan berkas pendukung bila ada) untuk usaha rekaan, memuat nama, produk, cara memesan, jam dan area, kontak, dan seluruh isinya sintetis; ditambah daftar periksa sebelum dibagikan.

## Ulang berjarak

Tanpa melihat modul ini, kerjakan ulang dan cocokkan. Pertanyaan ini akan muncul lagi di "Ingat kembali" modul berikutnya.

| Kapan | Pertanyaan |
| --- | --- |
| Satu minggu lagi (modul berikutnya) | Jelaskan beda domain dan hosting dengan analogi Anda sendiri. |
| Tiga modul lagi | Mengapa testimoni atau foto pelanggan tidak dipasang tanpa izin? |
| Akhir jalur | Apa yang harus ada di halaman usaha agar pembeli tahu cara memesan, dan apa yang sengaja tidak dipasang? |

## Kebijakan AI

Modul ini tidak memakai asisten AI; kebijakan lengkap program ada di `DW-FND-M1` dan dipakai penuh pada `DW-BIS-M7` (silabus bagian 9.1).

## Kesalahan umum

- **Menaruh data pribadi di halaman.** Sekali dipasang, mudah disalin orang lain.
- **Lupa `alt` pada gambar.** Pembaca layar tidak tahu isi gambar.
- **Mengutamakan hiasan daripada isi.** Pembeli mencari harga, cara memesan, dan kontak.
- **Menyamakan domain dengan hosting.** Keduanya terpisah dan masing-masing perlu diingat (domain umumnya disewa dan perlu diperpanjang).
- **Menyimpan kata sandi atau kunci di berkas situs.** Berkas situs dilayani ke siapa pun.

## Cek mandiri

Tutup modul dan jawab:

1. Beda domain dan hosting, serta beda situs statis dan dinamis.
2. Empat isi halaman usaha dan dua hal yang sengaja tidak dipasang.
3. Tiga butir dari daftar periksa sebelum dibagikan.

Daftar periksa (kosong; Anda isi sendiri, tidak dikumpulkan):

- [ ] Halaman saya tanpa data pribadi atau data pelanggan nyata.
- [ ] Setiap gambar punya `alt` dan hak pakai yang jelas.
- [ ] Halaman sudah saya coba pada lebar layar ponsel.
- [ ] Tidak ada kata sandi, kunci, atau token di berkas.

## Kunci dan petunjuk

- **Cek awal:** (1) domain adalah alamat, hosting adalah komputer tempat berkas disimpan dan dilayani; (2) berkas dikirim apa adanya tanpa basis data atau penyusunan saat diminta; (3) teks pengganti gambar untuk pembaca layar dan saat gambar gagal dimuat; (4) mengandung data pribadi yang perlu izin dan dasar yang sah (lihat `DW-BIS-M1`); (5) nama dan produk, harga atau cara bertanya, cara memesan, kontak (juga jam dan area).
- **Prediksi:** (1) "Toko Kue Contoh: kue rumahan, pesan lewat surel"; (2) empat; (3) teks `alt`.
- **Setengah jadi:** `id`, `name`, `title` (dibuka dan ditutup), `alt`. Sebelum dibagikan: data pribadi, kredensial, hak pakai gambar, tautan, `alt`.
- **Latihan 3:** A: 420.000 pada tahun pertama dan kedua. B: 270.000 pada tahun pertama dan 470.000 pada tahun kedua. Dua tahun: A 840.000 dan B 740.000. Pelajaran: harga promosi tahun pertama tidak menggambarkan biaya berikutnya; bandingkan beberapa tahun.
- **Latihan bercampur 1:** sumbu dari nol, periode dan sumber jelas; tidak memasang angka yang mengungkap data pelanggan.
- **Latihan bercampur 2:** tidak; berkas di folder situs bisa ikut terlayani, dan nama serta telepon adalah data pribadi.
- **Petunjuk bila macet:** buka halaman, perbaiki satu hal, muat ulang, dan lihat hasilnya; ubah satu hal sekali.

## Langkah berikutnya

`DW-BIS-M5`: halaman Anda memperkenalkan usaha; berikutnya Anda memahami alur toko daring dan konsep pembayaran digital. Sebagai lanjutan di luar modul ini, silabus menyebut templat `awcms-one` profil `landing`; kebutuhan pemasangannya lebih berat (silabus bagian 10.2) dan bukan syarat.

## Catatan untuk pendamping

- **Waktu:** 6 jam. **Bahan:** penyunting teks dan peramban.
- **Verifikasi penulis:** halaman contoh diperiksa dengan pemeriksa tag Python 3.12.3 (tag berpasangan, `lang`, `viewport`, `title`, `h1`, `main`) dan dimuat di Chrome tanpa antarmuka pada lebar sekitar 420 piksel; kontras dan `alt` pada gambar tidak diukur otomatis. Kutipan MDN dan halaman PANDI dibuka 2026-11-19.
- **Regulasi:** masa tenggang domain, biaya, kewajiban perizinan atau pajak usaha daring, dan kewajiban kebijakan privasi situs tidak dibahas dan `[belum terverifikasi]`; arahkan peserta ke registrar, PANDI, dan sumber resmi atau ahli hukum.
- **Tanda siap lanjut:** peserta menjelaskan beda domain dan hosting serta menunjukkan halamannya tanpa data pribadi.
