## Untuk siapa modul ini

Modul ini untuk jalur **pebisnis/UMKM** (`BIS`), 6 jam, sesudah `DW-BIS-M4`. Modul ini **konsep**: Anda tidak membuka toko, tidak membuat akun pembayaran, dan tidak menjalankan transaksi sungguhan. Alatnya kertas atau penyunting teks; dua blok Python (penulis memakai 3.12.3) boleh dibaca saja. Estimasi tiga sesi `[asumsi]`.

Data **sintetis**: Toko Kue Contoh, tarif kirim rekaan, dan alur rekaan. Jangan memasukkan nomor kartu, rekening, kode QR, atau pesanan nyata ke latihan. Modul ini bukan nasihat hukum, pajak, perizinan, atau keuangan; fakta tentang pembayaran diambil dari halaman resmi Bank Indonesia (BI) yang dibuka 2026-11-19 dan bisa berubah, jadi periksa ulang sebelum bertindak.

## Cek awal pengalaman

Jawab tanpa melihat apa pun, lalu cocokkan dengan kunci. Skor tidak dicatat.

1. Urutkan alur pesanan toko daring dari pembeli memilih barang sampai pesanan selesai.
2. Apa itu QRIS, dalam satu kalimat?
3. Mengapa layar "transaksi berhasil" di ponsel pembeli belum membuktikan uang masuk?
4. Mengapa toko tidak menyimpan nomor kartu, PIN, atau kode OTP pembeli?
5. Selain harga barang, apa yang membentuk jumlah yang dibayar pembeli?

Bila kelimanya benar, Anda boleh melewati "Contoh terselesaikan" dan "Contoh setengah jadi" dan langsung ke "Latihan".

## Ingat kembali

Tanpa melihat modul sebelumnya, tulis jawaban singkat.

1. (`DW-BIS-M4`) Jelaskan beda domain dan hosting dengan analogi Anda sendiri.
2. (`DW-BIS-M2`) Tulis rumus total dan laba kasar untuk satu baris, dan jelaskan mengapa tiap acuan sel dipilih.
3. (`DW-FND-M1`) Apa yang tidak boleh ada di berkas kode atau berkas yang dibagikan?

Cocokkan: (1) domain adalah alamat, hosting adalah komputer penyimpan dan pengirim berkas; (2) `=D2*E2` dan `=D2*(E2-F2)`: jumlah dikali harga, dan jumlah dikali selisih harga dan biaya; (3) kata sandi, kunci, token, dan data nyata.

## Tujuan

Setelah modul ini Anda dapat menggambarkan alur pesanan, katalog, dan ongkos kirim, menjelaskan konsep QRIS dan pembayaran, dan menjelaskan mengapa data pembayaran tidak disimpan sendiri.

## Prediksi dulu

Toko Kue Contoh menerima pesanan dua brownies (48.000 per buah, 450 gram per buah) dan satu nastar (85.000, 600 gram). Tarif kirim rekaan: zona sedang 15.000 per kilo, dengan berat dibulatkan naik ke kilo penuh. Sebelum membaca, tulis prediksi Anda:

1. Berapa subtotal, ongkos kirim, dan total yang dibayar pembeli?
2. Bolehkah pesanan berstatus "menunggu bayar" langsung menjadi "dikirim"?

## Contoh terselesaikan

### Alur pesanan

```text
pilih barang -> keranjang -> isi alamat -> hitung ongkos kirim -> bayar
   -> notifikasi pembayaran masuk -> kemas -> kirim -> terima -> selesai
```

Tiap status hanya boleh berpindah ke status tertentu. Menuliskannya sebagai tabel mencegah pesanan "melompat":

```python
BOLEH = {
    "baru": {"menunggu_bayar", "batal"},
    "menunggu_bayar": {"dibayar", "batal", "kedaluwarsa"},
    "dibayar": {"dikemas", "batal"},  # batal setelah bayar: uang harus dikembalikan
    "dikemas": {"dikirim"},
    "dikirim": {"selesai"},
}


def pindah(sekarang, tujuan):
    if tujuan not in BOLEH.get(sekarang, set()):
        raise ValueError(f"tidak boleh: {sekarang} -> {tujuan}")
    return tujuan


status = "baru"
for langkah in ["menunggu_bayar", "dibayar", "dikemas", "dikirim", "selesai"]:
    status = pindah(status, langkah)
    print("sekarang:", status)

try:
    pindah("menunggu_bayar", "dikirim")
except ValueError as galat:
    print("ditolak:", galat)
```

Keluarannya (dijalankan dengan `python3 -I`, Python 3.12.3):

```text
sekarang: menunggu_bayar
sekarang: dibayar
sekarang: dikemas
sekarang: dikirim
sekarang: selesai
ditolak: tidak boleh: menunggu_bayar -> dikirim
```

Pesanan yang belum dibayar tidak boleh dikirim; aturan ini melindungi usaha Anda.

### Katalog

Setiap produk punya baris dengan kolom: kode, nama, harga, stok, berat, deskripsi, foto (milik Anda atau berizin), dan status aktif. Seperti di `DW-BIS-M2`, harga disalin ke pesanan **pada saat pesanan dibuat**, supaya perubahan harga tidak mengubah pesanan lama.

### Ongkos kirim

Tarif kurir berbeda-beda dan berubah; ketentuannya (misalnya apakah ukuran paket ikut dihitung) harus dibaca dari kurir Anda `[belum terverifikasi]`. Yang diajarkan di sini adalah logikanya, dengan tarif **rekaan**:

```python
import math

# Tarif CONTOH (rekaan), bukan tarif kurir mana pun.
TARIF_PER_KG = {"dekat": 9000, "sedang": 15000, "jauh": 24000}


def ongkir(berat_gram, zona):
    kg = max(math.ceil(berat_gram / 1000), 1)  # naik ke kilo penuh, minimal 1
    return kg * TARIF_PER_KG[zona]


# nama, jumlah, harga satuan, berat satuan (gram, contoh)
keranjang = [("Brownies", 2, 48000, 450), ("Nastar", 1, 85000, 600)]

subtotal = sum(jumlah * harga for _, jumlah, harga, _ in keranjang)
berat = sum(jumlah * gram for _, jumlah, _, gram in keranjang)
biaya_kirim = ongkir(berat, "sedang")

print("subtotal:", subtotal)
print("berat (gram):", berat)
print("ongkos kirim:", biaya_kirim)
print("total dibayar pembeli:", subtotal + biaya_kirim)
print("berat 1000 g, zona dekat:", ongkir(1000, "dekat"))
print("berat 1001 g, zona dekat:", ongkir(1001, "dekat"))
```

```text
subtotal: 181000
berat (gram): 1500
ongkos kirim: 30000
total dibayar pembeli: 211000
berat 1000 g, zona dekat: 9000
berat 1001 g, zona dekat: 18000
```

Perhatikan loncatan dari 1000 ke 1001 gram: pembulatan naik membuat selisih satu gram menggandakan ongkos. Tampilkan ongkos kirim kepada pembeli **sebelum** ia membayar.

### QRIS dan pembayaran digital

Menurut [halaman QRIS Bank Indonesia](https://www.bi.go.id/id/fungsi-utama/sistem-pembayaran/ritel/kanal-layanan/QRIS/default.aspx) (dibuka 2026-11-19):

- QRIS (*Quick Response Code Indonesian Standard*) adalah standarisasi pembayaran dengan kode QR dari BI. Aplikasi pembayaran dari penyelenggara apa pun dapat membayar ke merchant mana pun, meski penyelenggaranya berbeda.
- Ada dua mode. *Merchant Presented Mode*: penjual menampilkan kode QR yang dipindai pembeli; kode **statis** tidak memuat nominal (pembeli mengetik jumlah), kode **dinamis** sudah memuat nominal. *Customer Presented Mode*: pembeli menampilkan kode QR dari ponselnya untuk dipindai penjual.
- Merchant mendaftar ke penyelenggara jasa pembayaran (PJP) yang berizin BI; PJP QRIS wajib mendapat persetujuan BI.
- Biaya untuk merchant ditetapkan BI. Modul ini **tidak menulis angkanya**; baca halaman resmi di atas dan tanyakan kepada PJP Anda.
- Pengaduan: lapor dahulu ke PJP; bila belum selesai, dapat dilanjutkan ke BI (artikel *Cerita BI* di bawah).

Dalam artikel [Cara Memastikan Pembayaran QRIS Benar-Benar Masuk](https://www.bi.go.id/id/publikasi/ruang-media/cerita-bi/Pages/cara-memastikan-pembayaran-qris-benar-benar-masuk.aspx) (BI, 11 November 2026, dibuka 2026-11-19): bukti transfer di layar hanyalah gambar, dapat diedit atau dibuat dengan bantuan AI; yang lebih dapat diandalkan adalah notifikasi dari sistem pembayaran ke akun pedagang. Langkahnya: aktifkan notifikasi transaksi, tunggu notifikasi sebelum barang diserahkan, cek riwayat transaksi bila notifikasi belum muncul, dan jangan menyerahkan barang selama dana belum terlihat masuk. Kalimat yang berguna: "Sebentar, saya cek notifikasinya dulu, ya."

### Mengapa data pembayaran tidak disimpan sendiri

| Boleh disimpan di pesanan | Jangan disimpan |
| --- | --- |
| id pesanan, jumlah, status, nama metode, nomor referensi dari penyedia | nomor kartu, PIN, kode OTP, kode keamanan kartu |

Alasan praktis: data itu sangat menarik bagi penjahat, dan Anda yang menanggung akibat bila bocor. Biarkan penyedia pembayaran berizin yang menangani data itu; toko cukup menerima status dan nomor referensi. Teks resmi UU No. 27 Tahun 2022 ([JDIH BPK](https://peraturan.bpk.go.id/Details/229798/uu-no-27-tahun-2022), dibuka 2026-11-19) menyebut "data keuangan pribadi" dalam daftar Data Pribadi yang bersifat spesifik (Pasal 4 ayat (2) huruf f), mewajibkan pengendali "melindungi dan memastikan keamanan Data Pribadi yang diprosesnya" (Pasal 35), dan mewajibkan pemberitahuan tertulis "paling lambat 3 x 24 (tiga kali dua puluh empat) jam" bila terjadi kegagalan pelindungan (Pasal 46 ayat (1)). Apakah dan bagaimana pasal-pasal itu mengenai usaha Anda adalah penafsiran hukum yang tidak dijawab di sini. Kewajiban pajak dan perizinan toko daring juga tidak dibahas `[belum terverifikasi]`; tanyakan kepada sumber resmi seperti Direktorat Jenderal Pajak atau ahli hukum.

## Contoh setengah jadi

Lengkapi dan jalankan dalam pikiran:

```python setengah-jadi
import math

TARIF_PER_KG = {"dekat": 9000, "sedang": 15000, "jauh": 24000}


def ongkir(berat_gram, zona):
    kg = max(math.___(berat_gram / 1000), 1)
    return kg * TARIF_PER_KG[___]
```

Lalu hitung ongkos kirim untuk 2300 gram ke zona jauh, dan lengkapi: "Barang boleh saya serahkan bila ____ sudah masuk."

## Latihan

1. **Ubah.** Tambahkan status "diretur" yang boleh dicapai dari "dikirim" pada tabel `BOLEH`. Prediksi dulu: apakah `pindah("diretur", "selesai")` diterima?
2. **Buat.** Gambar alur toko daring Anda (rekaan) dari pembeli memilih sampai selesai, minimal delapan langkah. Tandai di langkah mana pembayaran diperiksa dan data apa yang disimpan.
3. **Jelaskan.** Mengapa tangkapan layar "transaksi berhasil" tidak cukup, dan apa yang Anda lakukan di tempat itu? Tulis dua langkah.
4. **Buat.** Susun katalog lima produk rekaan dengan kolom dari bagian katalog, lalu hitung ongkos kirim untuk dua keranjang rekaan memakai tarif contoh.
5. **Berpasangan (opsional).** Peragakan dialog pembeli dan penjual: pembeli menunjukkan layar, penjual meminta waktu mengecek notifikasi. Peserta mandiri boleh melewati tugas ini.

## Latihan bercampur

1. (`DW-BIS-M4`) Halaman toko menampilkan formulir pesanan. Data apa saja yang wajar diminta, dan data apa yang tidak boleh diminta?
2. (`DW-BIS-M2`) Tulis rumus lembar kerja untuk total bayar bila jumlah di `B2`, harga satuan di `C2`, dan ongkos kirim di `D2`.

## Keluaran portofolio

**Alur toko daring dalam diagram, tanpa transaksi nyata.** Satu gambar atau berkas teks: alur dari memilih sampai selesai, tabel perpindahan status, katalog lima produk, contoh hitung ongkos kirim, dan titik pemeriksaan pembayaran. Seluruhnya rekaan.

## Ulang berjarak

Tanpa melihat modul ini, kerjakan ulang dan cocokkan. Pertanyaan ini akan muncul lagi di "Ingat kembali" modul berikutnya.

| Kapan | Pertanyaan |
| --- | --- |
| Satu minggu lagi (modul berikutnya) | Sebutkan urutan status pesanan dan satu perpindahan yang tidak boleh. |
| Tiga modul lagi (modul akhir jalur) | Tulis alur pesanan toko daring dari memilih sampai selesai dan titik pemeriksaan pembayarannya. |
| Akhir jalur | Mengapa data kartu, PIN, dan OTP tidak disimpan toko, dan apa yang dicek sebelum barang diserahkan pada pembayaran QRIS? |

## Kebijakan AI

Modul ini tidak memakai asisten AI; kebijakan lengkap program ada di `DW-FND-M1` dan dipakai penuh pada `DW-BIS-M7` (silabus bagian 9.1).

## Kesalahan umum

- **Percaya tangkapan layar pembayaran.** Tunggu notifikasi dari sistem pembayaran.
- **Menyembunyikan ongkos kirim sampai akhir.** Pembeli yang terkejut membatalkan pesanan.
- **Menyimpan data kartu "sekadar cadangan".** Data yang tidak disimpan tidak bisa bocor.
- **Membiarkan status melompat.** Pesanan yang dikirim sebelum dibayar merugikan usaha.
- **Menganggap tarif atau aturan di modul ini pasti.** Tarif kirim di sini rekaan; fakta pembayaran bisa berubah.

## Cek mandiri

Tutup modul dan jawab:

1. Urutan status pesanan dan perpindahan yang ditolak.
2. Dua mode QRIS dan beda kode statis dan dinamis.
3. Apa yang boleh dan tidak boleh disimpan dari data pembayaran.

Daftar periksa (kosong; Anda isi sendiri, tidak dikumpulkan):

- [ ] Alurku memuat titik pemeriksaan pembayaran sebelum pengiriman.
- [ ] Ongkos kirim terlihat pembeli sebelum bayar.
- [ ] Tidak ada data kartu, PIN, atau OTP yang kusimpan.
- [ ] Semua angka di portofolioku rekaan.

## Kunci dan petunjuk

- **Cek awal:** (1) pilih barang, keranjang, alamat, ongkos kirim, bayar, notifikasi masuk, kemas, kirim, terima, selesai; (2) standarisasi pembayaran dengan kode QR dari BI; (3) layar itu gambar yang dapat dipalsukan, andalkan notifikasi dari sistem pembayaran; (4) data itu sangat berharga bagi penjahat, kebocorannya menjadi tanggungan Anda; (5) ongkos kirim (juga biaya lain bila ada).
- **Prediksi:** (1) subtotal 181.000, ongkos kirim 30.000 (1500 gram naik ke 2 kilo), total 211.000; (2) tidak.
- **Setengah jadi:** `ceil` dan `zona`; 2300 gram naik ke 3 kilo, 3 x 24.000 = 72.000. Barang diserahkan bila dana atau notifikasi pembayaran sudah masuk.
- **Latihan 1:** ditolak (dicoba: `pindah("diretur", "selesai")` menghasilkan `tidak boleh: diretur -> selesai`, karena "diretur" tidak punya perpindahan keluar).
- **Latihan bercampur 1:** nama, nomor telepon, alamat kirim; tidak: nomor kartu, PIN, OTP.
- **Latihan bercampur 2:** `=B2*C2+D2`.
- **Petunjuk bila macet:** tuliskan satu pesanan dari awal, dan pada tiap langkah tanyakan "apa yang bisa salah di sini, dan data apa yang tersentuh?".

## Langkah berikutnya

`DW-BIS-M6`: alur toko Anda penuh langkah manual; berikutnya Anda belajar mengotomasi alur dari formulir ke lembar kerja ke pemberitahuan, dan kapan otomasi layak.

## Catatan untuk pendamping

- **Waktu:** 6 jam. **Bahan:** kertas atau penyunting teks.
- **Verifikasi penulis:** kedua blok Python dijalankan dengan `python3 -I` (3.12.3) dan keluarannya sama dengan yang tertulis; contoh `diretur` dan `ongkir(2300, "jauh")` juga dijalankan. Halaman QRIS BI, artikel Cerita BI (11 November 2026), dan halaman UU 27/2022 di JDIH BPK dibuka 2026-11-19; kutipan UU dicocokkan dengan salinan PDF resmi (Pasal 4, 35, 46).
- **Regulasi `[belum terverifikasi]`:** besaran biaya QRIS untuk merchant (ada di halaman BI tetapi sengaja tidak ditulis karena dapat berubah), batas nominal, teks peraturan BI, ketentuan kurir (berat atau ukuran), serta pajak dan perizinan toko daring tidak dibahas. Arahkan peserta ke BI, PJP, kurir, DJP, atau ahli hukum.
- **Tanda siap lanjut:** peserta menjelaskan apa yang dicek sebelum barang diserahkan dan apa yang tidak disimpan dari data pembayaran.
