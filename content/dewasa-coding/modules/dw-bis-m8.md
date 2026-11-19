## Untuk siapa modul ini

Modul ini untuk jalur **pebisnis/UMKM** (`BIS`), 6 jam, sesudah `DW-BIS-M7`. Ini proyek akhir: Anda menggabungkan keluaran `DW-BIS-M1` sampai `DW-BIS-M7` menjadi satu **rencana digital usaha** dan satu **prototipe**. Alatnya yang sudah Anda pakai: LibreOffice Calc, penyunting teks, dan Python 3 (penulis memakai 3.12.3, dijalankan dengan `python3 -I`). Usahanya rekaan; Anda boleh memakai Toko Kue Contoh atau usaha rekaan Anda sendiri. Estimasi tiga sampai empat sesi `[asumsi]`.

Data **sintetis**: angka penjualan berasal dari `penjualan_sintetis.csv` dari `DW-BIS-M2` (200 transaksi, benih acak 2026), berkas yang sama dengan `DW-BIS-M3`. Jangan memasukkan data usaha, pelanggan, atau kredensial nyata ke portofolio. Modul ini bukan nasihat hukum, pajak, perizinan, atau keuangan.

## Cek awal pengalaman

Jawab tanpa melihat apa pun, lalu cocokkan dengan kunci. Skor tidak dicatat.

1. Sebutkan lima kriteria penilaian portofolio.
2. Mengapa harga disalin ke tiap baris transaksi?
3. Apa yang sengaja tidak dipasang di situs usaha?
4. Mengapa toko tidak menyimpan data kartu, PIN, dan OTP?
5. Mengapa keluaran AI diperlakukan sebagai draf?

Bila kelimanya benar, Anda boleh melewati "Contoh terselesaikan" dan "Contoh setengah jadi" dan langsung ke "Latihan".

## Ingat kembali

Karena ini proyek akhir, ingatan menjangkau seluruh jalur. Tanpa melihat modul sebelumnya, tulis jawaban singkat.

1. (`DW-BIS-M1`) Tinjau rencana digital Anda: proses mana yang dipilih, risiko berskor tertinggi apa, dan apa penangkalnya?
2. (`DW-BIS-M2`) Mengapa satu baris satu transaksi, dan apa tiga aturan validasi yang mencegah salah ketik?
3. (`DW-BIS-M3`) Sebutkan lima pemeriksaan agar ringkasan penjualan dan grafiknya jujur.
4. (`DW-BIS-M4`) Apa yang harus ada di halaman usaha agar pembeli tahu cara memesan, dan apa yang sengaja tidak dipasang?
5. (`DW-BIS-M5`) Tulis alur pesanan toko daring dari memilih sampai selesai dan titik pemeriksaan pembayarannya.
6. (`DW-BIS-M5`) Mengapa data kartu, PIN, dan OTP tidak disimpan toko, dan apa yang dicek sebelum barang diserahkan pada pembayaran QRIS?
7. (`DW-BIS-M6`) Tulis spesifikasi alur formulir ke lembar kerja ke pemberitahuan dengan kolom "bila gagal", dan hitung titik impasnya.
8. (`DW-BIS-M7`) Bagaimana Anda memeriksa draf teks promosi dan ringkasan ulasan dari AI sebelum dipakai?

Cocokkan dengan modul asalnya; kunci ringkasnya ada di "Kunci dan petunjuk". Soal yang tidak bisa dijawab menunjukkan modul yang perlu dibaca ulang sebelum menulis rencana.

## Tujuan

Setelah modul ini Anda dapat menggabungkan `DW-BIS-M1` sampai `DW-BIS-M7` menjadi rencana dan prototipe.

## Prediksi dulu

Skrip di bawah membaca `penjualan_sintetis.csv`, menghitung angka usaha, lalu memeriksa sebuah rencana rekaan yang sengaja cacat. Sebelum menjalankan, tulis prediksi Anda:

1. Berapa transaksi, total penjualan, dan laba kasar? Bulan mana yang terbesar?
2. Rencana rekaan itu punya dua cacat. Perkirakan apa saja.

## Contoh terselesaikan

### Kerangka rencana

| Bagian | Dari modul | Isi minimal |
| --- | --- | --- |
| `peta` | `DW-BIS-M1` | proses yang dipilih, jam per bulan, risiko tertinggi dan penangkalnya |
| `pencatatan` | `DW-BIS-M2` | kolom tabel transaksi, aturan validasi |
| `ringkasan` | `DW-BIS-M3` | angka utama dan bulan terbaik, dengan catatan sumber |
| `situs` | `DW-BIS-M4` | isi halaman dan daftar periksa sebelum dibagikan |
| `pesanan` | `DW-BIS-M5` | status pesanan dan titik pemeriksaan pembayaran |
| `otomasi` | `DW-BIS-M6` | spesifikasi alur, bila gagal, titik impas |
| `ai` | `DW-BIS-M7` | satu pemakaian AI, apa yang diperiksa, apa yang tidak ditempel |
| `risiko` | `DW-FND-M1` | data yang disimpan, siapa yang bisa melihat, apa yang dilakukan bila bocor |

Ukuran tiap bagian sependek mungkin: satu paragraf atau satu tabel. Rencana yang panjang tetapi tanpa angka dan tanpa pemeriksaan tidak lebih baik daripada rencana pendek yang bisa dicek.

### Angka dari data, pemeriksa kelengkapan dan privasi

Letakkan skrip di folder yang sama dengan `penjualan_sintetis.csv`:

```python
import csv
import re
from collections import defaultdict

with open("penjualan_sintetis.csv", newline="", encoding="utf-8") as f:
    baris = list(csv.DictReader(f))

per_bulan = defaultdict(int)
total = laba = 0
for b in baris:
    nilai = int(b["jumlah"]) * int(b["harga_satuan"])
    total += nilai
    laba += int(b["jumlah"]) * (int(b["harga_satuan"]) - int(b["biaya_satuan"]))
    per_bulan[b["tanggal"][:7]] += nilai
terbaik = max(per_bulan, key=per_bulan.get)
print("transaksi:", len(baris), "| penjualan:", total, "| laba kasar:", laba)
print("bulan terbaik:", terbaik, per_bulan[terbaik])

BAGIAN = ["peta", "pencatatan", "ringkasan", "situs", "pesanan", "otomasi", "ai", "risiko"]
POLA = {
    "nomor telepon": r"\b08\d{8,11}\b",
    "email bukan .example": r"[\w.+-]+@[\w-]+\.(?!example\b)\w+",
    "kredensial": r"(password|kata sandi|api_key)\s*[:=]",
}
RENCANA = {  # rekaan, sengaja cacat
    "peta": "Proses dipilih: rekap pesanan; 6 jam per bulan.",
    "pencatatan": "Satu baris satu transaksi; validasi jumlah dan metode.",
    "ringkasan": f"Penjualan {total}, laba kasar {laba}, bulan terbaik {terbaik}.",
    "situs": "Pesan lewat formulir atau hubungi 081200000000.",
    "pesanan": "Status: baru, menunggu_bayar, dibayar, dikemas, dikirim, selesai.",
    "otomasi": "Formulir ke lembar kerja; pesanan besar diberi tahu.",
    "ai": "",
    "risiko": "Data pelanggan: kode acak saja.",
}
for kunci in BAGIAN:
    if not RENCANA.get(kunci, "").strip():
        print("bagian kurang:", kunci)
for kunci, teks in RENCANA.items():
    for nama, pola in POLA.items():
        if re.search(pola, teks, re.I):
            print(f"bagian {kunci}: tampak {nama}")
```

Keluarannya (`python3 -I`, Python 3.12.3, dengan berkas dari `DW-BIS-M2`):

```text
transaksi: 200 | penjualan: 25199000 | laba kasar: 10098000
bulan terbaik: 2026-03 9756000
bagian kurang: ai
bagian situs: tampak nomor telepon
```

Angka cocok dengan ringkasan `DW-BIS-M3` (25.199.000 dan Maret 9.756.000). Pemeriksa ini kasar: ia menangkap pola yang Anda tulis dan bisa terlewat atau salah tuduh, jadi hasilnya tetap ditinjau manusia.

### Rubrik dan prototipe

Portofolio dinilai dengan lima kriteria (silabus bagian 8.1): **ketepatan** (berjalan benar pada data sintetis), **keterbacaan**, **pemeriksaan hasil**, **dokumentasi**, dan **keamanan data** (tanpa kredensial dan data nyata). Tidak ada nilai angka: modul "selesai" bila kriterianya terpenuhi, dan daftar modul selesai dicatat Anda sendiri.

Prototipe adalah **satu** dari tiga yang berjalan dengan data sintetis: buku penjualan dengan ringkasannya (`DW-BIS-M2` dan `M3`), `index.html` usaha (`DW-BIS-M4`), atau alur otomatis (`DW-BIS-M6`). Pilih yang paling membantu usaha rekaan Anda, lalu tulis cara menjalankannya dalam lima kalimat.

## Contoh setengah jadi

Tambahkan satu pola ke `POLA` yang menangkap nomor 16 digit (mirip nomor kartu), lalu tulis prediksi:

```python setengah-jadi
POLA["nomor 16 digit"] = r"\b\d{___}\b"
```

Prediksi dulu: bila `RENCANA["pesanan"]` diubah menjadi `"Bayar dengan kartu 1111222233334444."`, baris apa yang muncul?

## Latihan

1. **Ubah.** Isi `RENCANA["ai"]` dan hapus nomor di `situs`. Prediksi dulu apa yang tercetak setelah dua baris angka, lalu jalankan.
2. **Buat.** Tulis rencana delapan bagian untuk usaha rekaan Anda, tiap bagian satu paragraf atau tabel, dengan sedikitnya satu angka dari data sintetis.
3. **Buat.** Bangun prototipe, lalu tulis cara menjalankannya dalam lima kalimat dan satu pemeriksaan hasil.
4. **Jelaskan.** Tinjau rencana rekan atau rencana contoh dengan lima kriteria: satu komentar per kriteria, masing-masing menyebut bagian yang dimaksud.
5. **Berpasangan (opsional).** Tukar rencana dengan rekan dan saling mencari satu data nyata yang terselip. Peserta mandiri boleh membaca ulang rencananya sendiri dengan daftar periksa privasi.

## Latihan bercampur

1. (`DW-BIS-M5`, `DW-BIS-M6`) Dalam alur otomatis Anda, pemberitahuan pembayaran masuk untuk pesanan yang sudah berstatus `batal`. Apa yang terjadi pada status, dan apa yang dilakukan manusia?
2. (`DW-BIS-M3`) Rencana Anda menulis "penjualan 25.199.000". Bagaimana Anda memastikan angka itu sama dengan data dan dengan pivot?

## Keluaran portofolio

**Portofolio `BIS`.** Satu folder berisi keluaran `DW-BIS-M1` sampai `DW-BIS-M7` yang sudah Anda buat, rencana digital usaha delapan bagian, prototipe beserta cara menjalankannya, daftar periksa privasi, dan catatan pemakaian AI. Seluruhnya data sintetis dan usaha rekaan. Catatan modul selesai Anda simpan sendiri; repositori ini tidak menyimpannya.

## Ulang berjarak

Tanpa melihat modul ini, kerjakan ulang dan cocokkan. Ini modul penutup jalur, sehingga pertanyaan berikut dipakai untuk mengecek ingatan jangka panjang.

| Kapan | Pertanyaan |
| --- | --- |
| Satu minggu lagi | Sebutkan delapan bagian rencana digital usaha dan modul asalnya. |
| Satu bulan lagi | Apa lima kriteria penilaian portofolio, dan apa yang Anda periksa sebelum membagikannya? |
| Akhir jalur | Pilih satu bagian rencana Anda dan jelaskan apa yang akan Anda ubah bila usahanya berpindah ke data nyata. |

## Kebijakan AI

Modul ini tidak mewajibkan asisten AI. Bila Anda memakainya untuk bagian `ai` atau teks rencana, patuhi kebijakan lengkap di `DW-BIS-M7` dan `DW-FND-M1` (silabus bagian 9.1): hanya data sintetis, tanpa kredensial, hasil adalah draf yang Anda periksa, dan alat serta versi dicatat.

## Kesalahan umum

- **Rencana tanpa angka.** Tanpa angka dari data, rencana tidak bisa dicek.
- **Data nyata terselip.** Nomor telepon, surel, dan kredensial mudah lolos; jalankan pemeriksa dan baca sendiri.
- **Prototipe tanpa cara menjalankan.** Orang lain tidak bisa mengulang hasilnya.
- **Menyalin angka tanpa mencocokkan.** Cocokkan dengan data asli.
- **Melewatkan bagian risiko.** Tulis siapa yang bisa melihat data dan apa yang dilakukan bila bocor.

## Cek mandiri

Tutup modul dan jawab:

1. Delapan bagian rencana dan modul asalnya.
2. Lima kriteria penilaian portofolio.
3. Tiga hal yang diperiksa sebelum portofolio dibagikan.

Daftar periksa (kosong; Anda isi sendiri, tidak dikumpulkan):

- [ ] Delapan bagian rencana terisi dan tiap angka cocok dengan data.
- [ ] Prototipe berjalan dengan data sintetis dan punya cara menjalankan.
- [ ] Tidak ada data nyata atau kredensial di folder.
- [ ] Pemakaian AI, bila ada, tercatat.

## Kunci dan petunjuk

- **Cek awal:** (1) ketepatan, keterbacaan, pemeriksaan hasil, dokumentasi, keamanan data; (2) harga berubah dan laporan lama harus tetap benar; (3) nomor telepon pribadi, alamat rumah, dan data atau foto pelanggan tanpa izin; (4) data itu sangat berharga bagi penjahat dan kebocorannya menjadi tanggungan Anda; (5) AI bisa salah atau mengarang.
- **Ingat kembali:** (1) proses terpilih, risiko berskor tertinggi, penangkal; (2) transaksi tunggal per baris agar bisa dijumlah dan disaring, dan aturan mis. jumlah bilangan bulat 1 sampai 100, produk dari daftar, metode dari daftar; (3) sumbu dari nol, judul dan satuan, skala sama, kategori wajar, catatan sumber; (4) nama, produk, cara memesan, kontak; tidak dipasang nomor pribadi, alamat rumah, dan data pelanggan tanpa izin; (5) pilih, keranjang, alamat, ongkos kirim, bayar, notifikasi pembayaran masuk, kemas, kirim, terima, selesai; pemeriksaan pada notifikasi pembayaran; (6) data itu sangat berharga bagi penjahat dan kebocorannya menjadi tanggungan Anda, dan layar "berhasil" di ponsel pembeli belum membuktikan uang masuk; cek notifikasi pembayaran sebelum menyerahkan barang; (7) tabel pemicu, aksi, data, bila gagal; titik impas = waktu membuat dibagi hemat bersih per bulan; (8) cek fakta, hitung ulang, bandingkan klaim dengan bukti, perlakukan teks luar sebagai data.
- **Prediksi:** (1) 200 transaksi, 25.199.000, 10.098.000; Maret terbesar (9.756.000); (2) bagian `ai` kosong dan nomor telepon di `situs`.
- **Setengah jadi:** `16`; baris `bagian pesanan: tampak nomor 16 digit`.
- **Latihan 1:** tidak ada baris tambahan; hanya dua baris angka.
- **Latihan bercampur 1:** status tidak boleh melompat dari `batal` ke `dibayar`; manusia memeriksa dan mengembalikan uang bila memang sudah dibayar.
- **Latihan bercampur 2:** cocokkan dengan `=SUM(...)` pada kolom total dan dengan jumlah akhir pivot; ketiganya harus 25199000.
- **Petunjuk bila macet:** isi kerangka dengan satu kalimat per bagian dulu, baru tambahkan angka dan pemeriksaan.

## Langkah berikutnya

Jalur `BIS` selesai di modul ini. Silabus tidak menetapkan jalur lanjutan dari `BIS`; jalur lain (`PKJ`, `PRO`, `PRS`) berdiri sendiri dan hanya mensyaratkan `DW-FND-M1`, jadi pilihlah sesuai tujuan Anda berikutnya.

## Catatan untuk pendamping

- **Waktu:** 6 jam. **Bahan:** LibreOffice Calc, Python 3, penyunting teks, dan `penjualan_sintetis.csv` dari `DW-BIS-M2` (pendamping dapat membangkitkannya dengan skrip di modul itu).
- **Verifikasi penulis:** skrip dijalankan dengan `python3 -I` (Python 3.12.3) pada berkas yang dibangkitkan dengan kode `DW-BIS-M2`; angkanya cocok dengan `DW-BIS-M3`. Pola 16 digit diuji pada satu kalimat. Rubrik mengikuti silabus bagian 8.1; ambang "selesai" `[belum diputuskan]` di silabus, jadi jangan menyajikan nilai angka.
- **Tanda siap lanjut:** peserta menunjukkan rencana delapan bagian yang angkanya cocok dengan data dan prototipe yang dapat diulang orang lain.
- **Hukum:** perizinan usaha, pajak, dan pembayaran tidak dibahas dari sumber hukum yang dibuka penulis (`[belum terverifikasi]`); arahkan ke sumber resmi atau penasihat hukum.
