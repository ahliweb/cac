## Untuk siapa modul ini

Modul ini untuk jalur **pebisnis/UMKM** (`BIS`), 6 jam, sesudah `DW-BIS-M5`. Modul ini **netral alat**: tidak ada langkah klik untuk alat tertentu, sebab menu dan harga cepat berubah. Yang Anda pelajari adalah pola alur (pemicu, aksi, data), cara memutuskan otomasi itu layak, dan cara memilih alat dengan kriteria. Logika alur dilatih dengan satu skrip Python kecil (penulis memakai 3.12.3, dijalankan dengan `python3 -I`) yang meniru kerja alat no-code; Anda tidak perlu akun layanan apa pun. Estimasi tiga sesi `[asumsi]`.

Data **sintetis**: formulir pesanan Toko Kue Contoh ditulis tangan dan jelas palsu; kode pelanggan seperti `PLG-005` hanyalah nomor acak. Jangan memasukkan data pelanggan atau penjualan nyata ke latihan, dan jangan mengunggah data nyata ke layanan no-code. Modul ini bukan nasihat hukum, pajak, atau keuangan.

## Cek awal pengalaman

Jawab tanpa melihat apa pun, lalu cocokkan dengan kunci. Skor tidak dicatat.

1. Sebut tiga bagian dari satu langkah alur otomatis.
2. Apa yang terjadi bila isian formulir yang sama terkirim dua kali dan alurnya tanpa penjagaan?
3. Bagaimana menghitung titik impas sebuah otomasi, dalam bulan?
4. Mengapa isian diperiksa sebelum dicatat ke lembar kerja?
5. Sebut dua hal yang perlu ditanyakan tentang sebuah alat sebelum data usaha dimasukkan.

Bila kelimanya benar, Anda boleh melewati "Contoh terselesaikan" dan "Contoh setengah jadi" dan langsung ke "Latihan".

## Ingat kembali

Tanpa melihat modul sebelumnya, tulis jawaban singkat.

1. (`DW-BIS-M5`) Sebutkan urutan status pesanan dan satu perpindahan yang tidak boleh.
2. (`DW-BIS-M3`) Apa beda total per bulan dan rata-rata per hari, dan kapan yang kedua lebih adil?
3. (`DW-BIS-M1`) Bagaimana menghitung jam per bulan sebuah proses?

Cocokkan: (1) `baru`, `menunggu_bayar`, `dibayar`, `dikemas`, `dikirim`, `selesai`; tidak boleh `menunggu_bayar` langsung ke `dikirim`; (2) total adalah jumlah seluruh bulan, rata-rata per hari adalah total dibagi jumlah hari, lebih adil bila bulan yang dibandingkan berbeda jumlah harinya (Februari 28 hari); (3) kali per bulan dikali menit per kali, dibagi 60.

## Tujuan

Setelah modul ini Anda dapat menggambarkan alur dari formulir ke lembar kerja ke pemberitahuan, dan menilai kapan otomasi layak.

## Prediksi dulu

Skrip di bawah memproses sembilan isian formulir sintetis. Satu isian (`F-001`) terkirim dua kali; isian `F-003`, `F-005`, dan `F-007` salah isi. Pemberitahuan dikirim bila total pesanan mencapai 200.000. Sebelum menjalankan, tulis prediksi Anda:

1. Berapa isian dicatat, berapa ditolak, dan berapa pemberitahuan keluar?
2. Bila formulir yang sama diproses sekali lagi, berapa yang dicatat dan berapa pemberitahuan baru?

## Contoh terselesaikan

### Tiga bagian satu langkah

Setiap alur otomatis, di alat apa pun, tersusun dari **pemicu** (kejadian yang memulai, misalnya satu isian baru), **aksi** (yang dikerjakan, misalnya menambah baris atau mengirim pesan), dan **data** (yang dibaca dan ditulis di antaranya). Tulis alurnya sebagai spesifikasi sebelum membuka alat:

| Langkah | Pemicu atau aksi | Data | Bila gagal |
| --- | --- | --- | --- |
| 1 | Pemicu: isian baru di formulir | `id_form`, produk, jumlah, metode | (tidak berlaku) |
| 2 | Aksi: periksa isian | aturan produk, jumlah, metode | masuk antrean tinjau, bukan dibuang |
| 3 | Aksi: catat ke buku penjualan | baris baru; harga disalin saat itu | tandai `id_form` sudah diproses |
| 4 | Aksi: kabari bila total mencapai batas | pesan teks | catat bahwa pesan gagal terkirim |

Kolom "Bila gagal" adalah bagian yang paling sering dilupakan. Kolom `harga_satuan` mengikuti aturan `DW-BIS-M2`: harga disalin ke baris pada saat transaksi.

### Mesin alur mini

```python
import csv
import io

PRODUK = {"Brownies": (48000, 28000), "Bolu pandan": (35000, 20000),
          "Kue lapis": (40000, 24000), "Nastar": (85000, 55000),
          "Roti sobek": (22000, 12000), "Donat": (30000, 17000)}
METODE = {"tunai", "qris", "transfer"}
BATAS_KABAR = 200000

FORMULIR = """id_form,tanggal,produk,jumlah,metode,pelanggan_kode
F-001,2026-04-01,Nastar,2,qris,PLG-005
F-002,2026-04-01,Brownies,5,tunai,PLG-012
F-003,2026-04-02,Donat,0,qris,PLG-019
F-004,2026-04-02,Roti sobek,3,transfer,PLG-007
F-005,2026-04-03,Pizza,1,tunai,PLG-031
F-006,2026-04-03,Nastar,3,transfer,PLG-022
F-001,2026-04-01,Nastar,2,qris,PLG-005
F-007,2026-04-04,Kue lapis,dua,qris,PLG-003
F-008,2026-04-05,Bolu pandan,4,tunai,PLG-040
"""


def periksa(b):
    alasan = []
    if b["produk"] not in PRODUK:
        alasan.append("produk tidak dikenal")
    if not b["jumlah"].isdigit() or int(b["jumlah"]) < 1:
        alasan.append("jumlah bukan bilangan bulat positif")
    if b["metode"] not in METODE:
        alasan.append("metode tidak dikenal")
    return alasan


def jalankan(teks, sudah, nomor):
    dicatat, galat, kabar = [], [], []
    for b in csv.DictReader(io.StringIO(teks)):
        if b["id_form"] in sudah:
            continue
        alasan = periksa(b)
        if alasan:
            galat.append((b["id_form"], "; ".join(alasan)))
            continue
        harga, biaya = PRODUK[b["produk"]]
        jumlah = int(b["jumlah"])
        nomor += 1
        dicatat.append([f"T-{nomor:03d}", b["tanggal"], b["produk"], jumlah,
                        harga, biaya, b["metode"], b["pelanggan_kode"]])
        sudah.add(b["id_form"])
        if jumlah * harga >= BATAS_KABAR:
            kabar.append(f"{b['id_form']}: {b['produk']} x {jumlah} bernilai {jumlah * harga}")
    return dicatat, galat, kabar, nomor


sudah = set()
dicatat, galat, kabar, nomor = jalankan(FORMULIR, sudah, 200)
print("putaran 1:", len(dicatat), "dicatat,", len(galat), "ditolak,", len(kabar), "kabar")
for pesan in kabar:
    print("KABAR:", pesan)
print("antrean tinjau:", galat)
dicatat, galat, kabar, nomor = jalankan(FORMULIR, sudah, nomor)
print("putaran 2:", len(dicatat), "dicatat,", len(galat), "ditolak,", len(kabar), "kabar")
```

Keluarannya (`python3 -I`, Python 3.12.3):

```text
putaran 1: 5 dicatat, 3 ditolak, 2 kabar
KABAR: F-002: Brownies x 5 bernilai 240000
KABAR: F-006: Nastar x 3 bernilai 255000
antrean tinjau: [('F-003', 'jumlah bukan bilangan bulat positif'), ('F-005', 'produk tidak dikenal'), ('F-007', 'jumlah bukan bilangan bulat positif')]
putaran 2: 0 dicatat, 3 ditolak, 0 kabar
```

Dua sifat penting. Pertama, isian ganda `F-001` dilewati karena `id_form` sudah tercatat di `sudah`: putaran kedua tidak mencatat atau mengabari ulang, jadi alur **aman dijalankan dua kali**. Kedua, isian salah tidak dibuang diam-diam: ia tinggal di antrean tinjau dan muncul lagi sampai diperbaiki, sebab hanya isian yang berhasil dicatat yang ditandai sudah diproses. Baris hasil memakai kolom yang sama dengan `penjualan_sintetis.csv` dari `DW-BIS-M2` (benih acak 2026), dengan nomor lanjutan `T-201`; berkas asli tidak diubah.

### Kapan otomasi layak

Hitung seperti di `DW-PKJ-M1`: waktu membuat dibagi waktu yang dihemat tiap bulan, dengan biaya perawatan ikut dikurangkan. Toko menerima 40 pesanan per bulan dan mencatat tiap pesanan dalam 3 menit: 40 x 3 = 120 menit, yaitu 2 jam per bulan. Membuat alurnya 5 jam dan merawatnya 0,5 jam per bulan, sehingga hemat bersih 1,5 jam per bulan dan titik impas 5 / 1,5, sekitar 3,3 bulan. Bila pesanan hanya 8 per bulan, hemat 24 menit (0,4 jam) lebih kecil daripada perawatan 0,5 jam: otomasi tidak pernah balik modal. Rumus ini tidak menghitung kesalahan salin yang dihindari, ketergantungan pada layanan pihak lain, dan risiko data; ketiganya dipertimbangkan terpisah.

### Memilih alat dengan kriteria

Modul ini tidak menunjuk alat. Pilih dengan tabel, baca halaman resmi alat, dan catat **tanggal Anda membacanya**: harga, kuota, dan syarat berubah.

| Kriteria | Pertanyaan | Mengapa penting |
| --- | --- | --- |
| Lisensi dan syarat pakai | Sumber terbuka, "sumber tersedia" dengan batasan, atau layanan berbayar? Bolehkah untuk usaha? | Batasan pemakaian komersial sering tersembunyi di syarat |
| Lokasi data | Di perangkat sendiri atau di pihak lain? | Data pelanggan nyata di pihak lain menuntut pertimbangan privasi |
| Biaya | Gratis, bulanan, atau per eksekusi? Apa yang terjadi saat kuota habis? | Alur berhenti diam-diam bila kuota habis |
| Batas | Jumlah eksekusi dan lama satu eksekusi? | Menentukan skala yang muat |
| Ekspor | Bisakah alur dan data dibawa pergi? | Menghindari terkunci pada satu alat |
| Kredensial | Bagaimana kunci disimpan dan akses siapa yang diberikan? | Aturan `DW-FND-M1` tetap berlaku |
| Kegagalan | Ada catatan kejadian, ulang otomatis, dan kabar galat? | Alur yang gagal tanpa kabar lebih buruk daripada kerja manual |
| Perawatan | Siapa memperbarui; apa yang terjadi bila alat berhenti? | Biaya perawatan masuk hitungan titik impas |

## Contoh setengah jadi

Lengkapi aturan pemeriksaan tanggal, lalu tulis prediksi hasilnya:

```python setengah-jadi
def periksa_tanggal(b):
    return len(b["tanggal"]) == ___ and b["tanggal"][4] == "___"
```

Prediksi dulu: apa hasil untuk `"2026-04-01"` dan `"1/4/2026"`? Lalu isi spesifikasi alur kedua dengan kolom pemicu, aksi, data, dan "bila gagal": ulasan baru masuk, ditambah ke daftar ulasan, lalu pemilik diberi kabar.

## Latihan

1. **Ubah.** Ubah `BATAS_KABAR` menjadi 250000. Prediksi dulu berapa kabar keluar, lalu jalankan.
2. **Buat.** Tulis spesifikasi satu alur usaha rekaan Anda (misalnya pesanan di luar jam kerja mendapat balasan otomatis) dengan empat kolom di atas, termasuk kasus gagal.
3. **Jelaskan.** Mengapa isian yang gagal masuk antrean tinjau dan bukan dibuang? Apa akibatnya bagi pembeli yang pesanannya salah isi?
4. **Buat.** Pilih satu alat otomasi yang pernah Anda dengar, isi kedelapan kriteria dari halaman resminya dengan tanggal baca, dan tulis "belum diketahui" untuk yang tidak ditemukan. Jangan membuat akun atau memasukkan data.
5. **Berpasangan (opsional).** Tukar spesifikasi dengan rekan; cari satu langkah yang bisa menimbulkan catatan ganda. Peserta mandiri boleh melewati tugas ini.

## Latihan bercampur

1. (`DW-BIS-M5`) Pesanan berstatus `dibayar`, lalu isian kedua dengan `id_form` yang sama masuk. Apa yang dilakukan alur di atas, dan apa yang terjadi bila ia tidak punya penjagaan itu?
2. (`DW-BIS-M2`) Mengapa mesin menyalin `harga_satuan` ke tiap baris, dan apa yang salah bila baris lama ikut berubah saat harga naik?

## Keluaran portofolio

**Satu alur otomatis dengan formulir sintetis.** Berkas berisi: spesifikasi alur (pemicu, aksi, data, bila gagal), hasil jalannya mesin mini dengan formulir sintetis Anda sendiri (sedikitnya delapan isian, termasuk satu ganda dan tiga salah), hitungan titik impas, dan tabel kriteria alat terisi lengkap dengan tanggal baca. Seluruhnya data sintetis.

## Ulang berjarak

Tanpa melihat modul ini, kerjakan ulang dan cocokkan. Pertanyaan ini akan muncul lagi di "Ingat kembali" modul berikutnya.

| Kapan | Pertanyaan |
| --- | --- |
| Satu minggu lagi (modul berikutnya) | Mengapa isian yang gagal masuk antrean tinjau, dan apa yang membuat alur aman dijalankan dua kali? |
| Dua modul lagi (modul akhir jalur) | Tulis spesifikasi alur formulir ke lembar kerja ke pemberitahuan dengan kolom "bila gagal", dan hitung titik impasnya. |
| Akhir jalur | Sebutkan lima kriteria memilih alat otomasi. |

## Kebijakan AI

Modul ini tidak memakai asisten AI; kebijakan lengkap program ada di `DW-FND-M1` dan dipakai penuh pada `DW-BIS-M7` (silabus bagian 9.1).

## Kesalahan umum

- **Mengotomasi sebelum menghitung.** Perawatan bisa melebihi penghematan.
- **Tanpa penjagaan ganda.** Isian kembar menghasilkan catatan dan pemberitahuan ganda.
- **Membuang isian salah diam-diam.** Pembeli kehilangan pesanan tanpa ada yang tahu.
- **Mengabaikan kuota dan syarat alat.** Alur berhenti atau melanggar syarat.
- **Mengunggah data pelanggan nyata untuk berlatih.** Latihan memakai data sintetis.

## Cek mandiri

Tutup modul dan jawab:

1. Tiga bagian satu langkah alur dan satu contoh masing-masing.
2. Rumus titik impas dengan biaya perawatan.
3. Lima dari delapan kriteria memilih alat.

Daftar periksa (kosong; Anda isi sendiri, tidak dikumpulkan):

- [ ] Spesifikasi alur saya punya kolom "bila gagal".
- [ ] Alur saya aman dijalankan dua kali.
- [ ] Saya menghitung titik impas dengan perawatan.
- [ ] Tabel kriteria saya memuat tanggal baca.

## Kunci dan petunjuk

- **Cek awal:** (1) pemicu, aksi, data; (2) tercatat dua kali, dikabari dua kali; (3) waktu membuat dibagi hemat bersih per bulan (hemat dikurangi perawatan); (4) isian salah merusak ringkasan dan laporan sesudahnya; (5) lisensi dan lokasi data, atau biaya, kuota, dan kemungkinan ekspor.
- **Prediksi:** (1) 5 dicatat (`F-001`, `F-002`, `F-004`, `F-006`, `F-008`), 3 ditolak, 2 kabar; (2) 0 dicatat, 0 kabar baru; tiga isian salah tetap di antrean.
- **Setengah jadi:** `10` dan `-`; `"2026-04-01"` memberi `True`, `"1/4/2026"` memberi `False` (panjang 8 dan karakter kelima bukan `-`).
- **Latihan 1:** 1 kabar (`F-006`, 255000); `F-002` bernilai 240000 sehingga tidak lagi mencapai batas.
- **Latihan 3:** isian salah tidak sampai ke buku penjualan, tetapi pemilik perlu tahu agar pembeli dihubungi dan pesanannya diperbaiki.
- **Latihan bercampur 1:** alur melewatinya karena `id_form` sudah tercatat; tanpa penjagaan itu pesanan dan pemberitahuan ganda.
- **Latihan bercampur 2:** harga pada saat transaksi harus tetap; bila baris lama ikut berubah, laporan bulan lalu berubah diam-diam.
- **Petunjuk bila macet:** tulis dulu "bila gagal" untuk tiap langkah, baru pikirkan alatnya.

## Langkah berikutnya

`DW-BIS-M7`: alur sederhana sudah Anda rancang; berikutnya Anda memakai asisten AI untuk draf teks dan ringkasan, dengan aturan data dan verifikasi yang lebih ketat.

## Catatan untuk pendamping

- **Waktu:** 6 jam. **Bahan:** Python 3 dan penyunting teks; akun layanan tidak diperlukan.
- **Verifikasi penulis:** skrip mesin alur mini dijalankan dengan `python3 -I` (Python 3.12.3) dan keluarannya cocok dengan yang tertulis; aturan pemeriksaan tanggal diuji pada dua nilai. Modul tidak memuat langkah untuk alat tertentu (keputusan pemilik 2026-11-19): tidak ada klaim harga, kuota, atau lisensi alat yang bernama.
- **Tanda siap lanjut:** peserta menjelaskan mengapa "bila gagal" ditulis lebih dulu dan menghitung titik impas dengan perawatan.
- **Hukum:** perlindungan data pelanggan di alat pihak lain tidak dibahas dari sumber hukum yang dibuka penulis (`[belum terverifikasi]`); arahkan ke penasihat hukum.
