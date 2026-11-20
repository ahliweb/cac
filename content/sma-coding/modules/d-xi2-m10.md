## Untuk siapa modul ini

Modul ini untuk murid kelas XI jalur D (kecerdasan buatan dan analisis data), untuk minggu `D-XI2-M10` silabus v1.3: mengenali konten palsu, penipuan, dan cara memverifikasi teks, gambar, dan video. Prasyarat: modul `d-xi2-m9` (modul tertulis dalam seri yang sama) dan `d-x2-m11` (AI generatif dan verifikasi; lembar verifikasi dengan tiga status). Alat: kertas dan peramban; blok Python hanya memakai pustaka standar. Tanpa akun.

Modul ini karangan penyusun dan disetujui pemilik program pada 2026-11-20 (keputusan lewat dialog; catatan tinjauan menjadi tindak lanjut revisi). Jalur D adalah pengayaan di luar rumusan capaian pembelajaran (CP). Minggu ini beririsan dengan butir `F-LD-b` (verifikasi kebenaran konten) pada tingkat rendah sampai sedang; irisan itu **tidak dihitung** sebagai pemenuhan CP.

Aturan jalur D yang berlaku: data hanya sintetis (karangan) atau terbuka dengan lisensi jelas, tanpa data yang bisa mengenali orang; wajah, suara, dan foto orang tidak dipakai sebagai data; AI generatif boleh dipakai dengan etika dan dicatat, tanpa data pribadi, kata sandi, atau tugas bernilai pada permintaanmu, dan kamu tidak wajib punya akun. Saran: jawab dulu sendiri, baru minta AI memberi petunjuk bertahap; kode buatan AI dibaca, dijalankan, dan diuji. Setiap soal `Latihan` bertanda `AI: boleh` atau `AI: tanpa AI`.

Catatan untuk guru: blok Python dijalankan penyusun dengan `python3 -I` (Python 3.14.6, hanya pustaka standar, per 2026-11) dan keluarannya ditempel apa adanya; yang dinyatakan hanya "bisa dijalankan dengan keluaran ini", bukan "benar untuk semua masukan". **Semua pesan, tautan, dan kasus di modul ini karangan penyusun;** domain contoh memakai akhiran `.example`, tidak ada orang, lembaga, atau layanan nyata, dan modul tidak memuat konten palsu sungguhan atau cara membuatnya. Sumber di bagian rujukan dibuka penyusun pada 2026-11-19; aspek hukum dibahas di `D-XII1-M4`.

## Ingat kembali

Jawab dari ingatan, baru cek di bagian kunci.

1. Mengapa model yang lebih rumit tidak selalu lebih baik? (dari `d-xi2-m2`)
2. Apa yang dilakukan pelatihan jaringan saraf pada bobot, dan apa itu kerugian? (dari `d-xi2-m7`)
3. Apa beda AI sebagai subjek yang dipelajari dan AI sebagai alat menulis kode? (dari `d-x2-m11`)
4. Apa pertanyaan yang diajukan sebelum mempercayai sebuah penjelasan model? (dari `d-xi2-m9`)

## Tujuan

Setelah modul ini kamu dapat:

- menyebut empat bentuk penyalahgunaan atau kekeliruan AI (penipuan, konten palsu, tautan palsu pencuri data, jawaban keliru yang disebarkan) beserta tandanya;
- memeriksa tautan lewat nama host, bukan lewat tampilannya, dengan `urllib.parse`;
- memakai lembar periksa untuk teks, gambar, dan video: sumber, konteks, sumber kedua, dan asal-usul;
- menjelaskan mengapa alat pemeriksa otomatis memberi petunjuk, bukan putusan, karena ada positif palsu dan negatif palsu;
- memutuskan satu dari tiga tindakan: percaya, tahan, atau laporkan.

Keluaran yang diminta silabus: lembar periksa (periksa contoh sintetis).

## Prediksi dulu

Alamat resmi sebuah bank karangan adalah `bank-contoh.example`. Dua cara memeriksa tautan: `resmi in url` (nama resmi muncul di mana saja) dan `urlparse(url).hostname == resmi` (hanya nama host yang dibandingkan). Tebak dan tulis, untuk tiap tautan, hasil kedua cara itu sebelum menjalankan.

```python
from urllib.parse import urlparse

resmi = "bank-contoh.example"
tautan = [
    "https://bank-contoh.example/masuk",
    "https://bank-contoh.example.verifikasi-akun.example/masuk",
    "https://verifikasi-akun.example/bank-contoh.example",
    "https://bank-contoh.example@verifikasi-akun.example/masuk",
]
for url in tautan:
    print(resmi in url, urlparse(url).hostname == resmi, url)
```

```text
True True https://bank-contoh.example/masuk
True False https://bank-contoh.example.verifikasi-akun.example/masuk
True False https://verifikasi-akun.example/bank-contoh.example
True False https://bank-contoh.example@verifikasi-akun.example/masuk
```

## Contoh terselesaikan

**Bentuk penyalahgunaan.** Penipuan memakai pesan, suara, atau halaman yang dibuat meyakinkan agar korban menyerahkan uang atau rahasia (kata sandi, kode sekali pakai). Konten palsu adalah gambar, video, suara, atau teks yang dibuat atau disunting untuk menyesatkan. Tautan palsu meniru halaman yang kamu kenal. Jawaban keliru AI yang lancar (`d-x2-m11`) menjadi masalah saat disebarkan sebagai fakta. Membuat konten yang menyamar sebagai orang nyata atau untuk menipu melanggar etika pemakaian AI (silabus 7.4), apa pun alatnya.

**Pemeriksa pesan sederhana.** Program berikut memberi tanda pada tiga pesan karangan: desakan waktu, permintaan rahasia, dan alamat yang bukan milik pihak resmi. Ia tidak memutuskan apa pun.

```python
import re
from urllib.parse import urlparse

DESAK = ("segera", "hari ini", "diblokir", "kesempatan terakhir")


def periksa_pesan(pesan, tautan, resmi):
    kecil = pesan.lower()
    tanda = []
    if any(k in kecil for k in DESAK):
        tanda.append("desakan waktu")
    if re.search(r"\b(kata sandi|kode otp|pin)\b", kecil):
        tanda.append("meminta rahasia")
    for url in tautan:
        host = urlparse(url).hostname or ""
        if host != resmi and not host.endswith("." + resmi):
            tanda.append("alamat lain: " + host)
    return tanda


kasus = [
    (
        "Akun Anda akan diblokir hari ini. Segera masuk dan kirim kode OTP Anda.",
        ["https://bank-contoh.example.verifikasi-akun.example/masuk"],
        "bank-contoh.example",
    ),
    (
        "Segera ambil buku pesanan Anda hari ini di perpustakaan.",
        ["https://perpus-contoh.example/pesanan"],
        "perpus-contoh.example",
    ),
    (
        "Ini bendahara kelas. Nomor rekening kas berubah, transfer iuran ke rekening baru dan jangan bilang yang lain.",
        [],
        "kas-contoh.example",
    ),
]
for nomor, (pesan, tautan, resmi) in enumerate(kasus, start=1):
    print("pesan", nomor, periksa_pesan(pesan, tautan, resmi))
```

```text
pesan 1 ['desakan waktu', 'meminta rahasia', 'alamat lain: bank-contoh.example.verifikasi-akun.example']
pesan 2 ['desakan waktu']
pesan 3 []
```

Baca hasilnya. Pesan 1 membawa tiga tanda dan memang berbahaya. Pesan 2 sah, tetapi tertandai "desakan waktu": **positif palsu**. Pesan 3 penipuan yang tidak tertangkap sama sekali: **negatif palsu**, karena ia tidak memakai kata desakan dan tidak membawa tautan. Pemeriksa otomatis yang baik pun tidak menggantikan lembar periksa berikut, dan hal yang sama berlaku bagi alat pendeteksi konten buatan AI: NIST (2024) mencatat bahwa pendeteksian otomatis dapat keliru dan bahwa positif palsu, yaitu konten manusia dinilai buatan AI, bisa sangat merugikan.

**Lembar periksa.** Berhenti dulu (jangan klik, balas, atau teruskan), lalu isi:

| Jenis | Yang ditanyakan | Cara memeriksa | Batasnya |
| --- | --- | --- | --- |
| Pesan atau tautan | siapa pengirim sebenarnya, apa yang diminta | ketik sendiri alamat resmi; cek nama host; hubungi lewat kanal resmi yang sudah kamu kenal | pesan tanpa tautan tetap bisa menipu |
| Teks atau klaim | siapa sumber, dapatkah klaim dilacak | baca lateral: cari sumber lain tentang sumbernya; lembar verifikasi `d-x2-m11` | sumber kedua pun bisa menyalin yang pertama |
| Gambar | kapan dan oleh siapa pertama diunggah, cocokkah konteksnya | cari kemunculan paling awal; cocokkan tempat, tanggal, cuaca; lihat kredensial isi (Content Credentials, C2PA) bila ada | tanda janggal visual tidak dapat diandalkan; metadata bisa dipalsukan atau terhapus saat berkas dibagikan (NIST, 2024) |
| Video atau suara | siapa yang mengatakan, di mana aslinya | cari siaran atau sumber asli; hubungi orangnya lewat nomor yang sudah kamu kenal | video panjang bisa disunting sebagian |

Hasil akhir bukan "asli" atau "palsu" mutlak, melainkan **percaya** (ada bukti dari sumber yang kamu buka sendiri), **tahan** (belum bisa dipastikan: jangan disebarkan), atau **laporkan** (pihak resmi, platform, atau guru). Tiadanya tanda janggal bukan bukti asli.

## Contoh setengah jadi

Lengkapi `____` agar fungsi menerima alamat resmi dan subdomainnya, dan menolak alamat yang hanya memuat nama resmi di tengah.

```python setengah-jadi
from urllib.parse import urlparse


def alamat_sah(url, resmi):
    host = urlparse(url).____ or ""
    return host == ____ or host.endswith("." + ____)


print(alamat_sah("https://layanan.perpus-contoh.example/masuk", "perpus-contoh.example"))
print(alamat_sah("https://perpus-contoh.example.cek.example/masuk", "perpus-contoh.example"))
```

## Soal Parsons

Susun baris menjadi fungsi yang mengembalikan daftar kata desakan yang ada di sebuah pesan, lalu mencetak hasilnya untuk satu pesan.

```text
print(tanda_desakan("Akun diblokir, segera bayar"))
    return [k for k in kata if k in kecil]
def tanda_desakan(pesan):
    kata = ("segera", "diblokir", "hari ini")
    kecil = pesan.lower()
```

## Latihan

1. **Lembar periksa.** (`AI: tanpa AI`) Pesan karangan: "Selamat, Anda terpilih menerima hadiah! Klaim dalam 1 jam lewat `https://hadiah-contoh.example.klaim.example/ambil`." Isi lembar periksa: apa yang ditanyakan, bagaimana memeriksa, dan putusanmu (percaya, tahan, atau laporkan).
2. **Perluas pemeriksa.** (`AI: boleh`) Tambahkan tiga tanda ke `periksa_pesan` (mis. frasa "rekening baru", "jangan bilang", atau alamat berisi `@`), lalu uji dengan lima pesan karanganmu. Hitung berapa positif palsu dan negatif palsu yang masih ada.
3. **Kasus gambar.** (`AI: tanpa AI`) Sebuah unggahan karangan menyebut "banjir di Kota Contoh tadi pagi" lewat gambar tanpa keterangan sumber. Pencarian asal gambar menemukan kemunculan paling awalnya tiga tahun lalu dengan keterangan "Kota Lain". Tulis status klaim (didukung, bertentangan, atau tidak ditemukan), apakah gambar itu buatan AI, dan langkah berikutnya.
4. **Skenario sendiri.** (`AI: boleh`) Tulis satu skenario karangan pesan suara dari "kepala sekolah" fiktif yang meminta transfer mendesak, lalu tulis tiga langkah memverifikasinya tanpa membalas pesan itu. Jangan memakai suara atau nama orang nyata.
5. **Catatan pemakaian AI (opsional).** Bila memakai asisten AI untuk menyusun skenario atau mengecek langkahmu, catat alat, tujuan, garis besar perintah, bagian yang dipakai, dan cara memeriksanya. Jangan menempelkan pesan penipuan nyata yang memuat data pribadi.

## Latihan bercampur

1. Dari `d-x2-m11`: sebutkan tiga status klaim di lembar verifikasi dan beda "bertentangan" dengan "tidak ditemukan".
2. Dari `d-xi2-m9` dan `d-xi1-m10`: sebuah alat mengaku "mendeteksi 99 persen konten buatan AI". Sebutkan tiga pertanyaan sebelum mempercayainya.
3. Dari `d-x2-m3`: pesan mencurigakan memuat nomor telepon temanmu. Sebelum meminta AI memeriksanya, apa yang kamu hapus, dan mengapa?

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `d-xi2-m11` (sekitar satu minggu lagi), `d-xi2-m13` (sekitar tiga minggu lagi), dan `D-XII1-M4` (sekitar delapan minggu lagi). Jawab sekarang lalu simpan.

1. Mengapa alat pemeriksa otomatis, baik aturan sederhana maupun pendeteksi konten AI, memberi petunjuk dan bukan putusan?
2. Apa tiga status klaim di lembar periksa, dan apa yang dilakukan bila klaim belum bisa dipastikan?
3. Mengapa menyebarkan konten yang belum diverifikasi bisa merugikan orang lain, dan apa yang dilakukan sebelum membagikannya?

## Kesalahan umum

- **"Pesan dengan tata bahasa bagus pasti dari orang sungguhan."** Teks lancar mudah dibuat, termasuk oleh AI.
- **"Tautan yang memuat nama bank berarti milik bank."** Yang menentukan adalah nama host, bukan kata di sembarang bagian alamat.
- **"Tidak ada metadata berarti palsu, dan ada metadata berarti asli."** Metadata dapat terhapus atau dipalsukan; ia hanya satu petunjuk.
- **"Detektor AI memberi jawaban pasti."** Ia punya positif palsu dan negatif palsu, sehingga bukan satu-satunya bukti.
- **"Meneruskan dulu, memeriksa belakangan."** Menyebarkan konten yang belum diverifikasi dapat merugikan orang lain.

## Cek mandiri

- [ ] Saya dapat menyebut empat bentuk penyalahgunaan atau kekeliruan AI dan tandanya.
- [ ] Saya dapat memeriksa nama host sebuah tautan dengan program.
- [ ] Saya dapat mengisi lembar periksa untuk teks, gambar, dan video.
- [ ] Saya dapat menjelaskan positif palsu dan negatif palsu pada alat pemeriksa.
- [ ] Saya dapat memutuskan percaya, tahan, atau laporkan, dengan alasan.
- [ ] Saya mencatat pemakaian AI bila saya memakainya.

## Kunci dan petunjuk

**Ingat kembali.** 1: karena model rumit dapat menghafal derau; pada data kecil keunggulannya bisa kebetulan, dan model sederhana lebih mudah dijelaskan dan dirawat. 2: pelatihan menggeser bobot sedikit demi sedikit ke arah yang memperkecil kerugian, yaitu ukuran jarak tebakan dari jawaban. 3: AI sebagai subjek: kamu mempelajari data, model, bias, dan etika; AI sebagai alat: kamu meminta penjelasan atau kode, lalu membaca, menjalankan, dan mengujinya serta mencatat pemakaiannya. 4: diukur pada data apa (latih atau uji), pada model mana, berapa sebarannya, dan apa yang tidak boleh disimpulkan.

**Prediksi dulu.** Keluaran:

```python
from urllib.parse import urlparse

resmi = "bank-contoh.example"
tautan = [
    "https://bank-contoh.example/masuk",
    "https://bank-contoh.example.verifikasi-akun.example/masuk",
    "https://verifikasi-akun.example/bank-contoh.example",
    "https://bank-contoh.example@verifikasi-akun.example/masuk",
]
for url in tautan:
    print(resmi in url, urlparse(url).hostname == resmi, url)
```

```text
True True https://bank-contoh.example/masuk
True False https://bank-contoh.example.verifikasi-akun.example/masuk
True False https://verifikasi-akun.example/bank-contoh.example
True False https://bank-contoh.example@verifikasi-akun.example/masuk
```

Cara pertama menjawab `True` untuk semua tautan karena nama resmi memang muncul di tiap alamat. Cara kedua hanya benar untuk yang pertama: pada tautan kedua nama host adalah `bank-contoh.example.verifikasi-akun.example`, pada ketiga `verifikasi-akun.example`, dan pada keempat bagian sebelum `@` hanya informasi pengguna sehingga host sebenarnya `verifikasi-akun.example`.

**Contoh setengah jadi.** Isian: `hostname`, `resmi`, `resmi`.

```python
from urllib.parse import urlparse


def alamat_sah(url, resmi):
    host = urlparse(url).hostname or ""
    return host == resmi or host.endswith("." + resmi)


print(alamat_sah("https://layanan.perpus-contoh.example/masuk", "perpus-contoh.example"))
print(alamat_sah("https://perpus-contoh.example.cek.example/masuk", "perpus-contoh.example"))
```

```text
True
False
```

**Soal Parsons.** Urutan benar: `def`, `kata = ...`, `kecil = ...`, `return ...`, lalu `print(...)`.

```python
def tanda_desakan(pesan):
    kata = ("segera", "diblokir", "hari ini")
    kecil = pesan.lower()
    return [k for k in kata if k in kecil]


print(tanda_desakan("Akun diblokir, segera bayar"))
```

```text
['segera', 'diblokir']
```

**Latihan.** 1: yang ditanyakan: siapa pengirimnya, apakah hadiah itu dijanjikan oleh pihak yang kamu kenal, dan mengapa harus dalam 1 jam; cara memeriksa: host tautan adalah `hadiah-contoh.example.klaim.example` (bukan `hadiah-contoh.example`), jadi cari alamat resmi dan ketik sendiri; putusan: laporkan atau hapus, jangan klik, karena ada desakan waktu dan alamat bukan milik pihak resmi. 2: tiap tanda baru menangkap sebagian kasus, tetapi pesan sah bisa ikut tertandai (misalnya "jangan bilang" dalam kejutan ulang tahun) dan penipuan yang halus tetap lolos; yang dinilai adalah hitungan positif palsu dan negatif palsu yang jujur. 3: status: bertentangan (gambar muncul jauh sebelum klaim dan berasal dari tempat lain). Apakah gambar itu buatan AI: tidak dapat dipastikan dari bukti itu; yang terbukti hanyalah konteksnya salah. Langkah berikutnya: tahan, jangan sebarkan, dan beri tahu pengunggah atau platform dengan tautan kemunculan awal. 4: contoh langkah: tutup pesan tanpa transfer, hubungi orang itu lewat nomor yang sudah kamu kenal, dan beri tahu guru atau pihak berwenang sekolah; dinilai dari ketiadaan orang nyata dan langkah yang tidak memakai kanal pesan itu. 5: opsional.

**Latihan bercampur.** 1: didukung (sumber yang kamu buka mendukung klaim), bertentangan (sumber menyatakan sebaliknya), tidak ditemukan (belum ada bukti, belum tentu salah). 2: pada data apa diukur dan berapa jumlahnya; berapa pembanding sederhana (misalnya menebak "bukan AI" terus); berapa positif palsu, karena konten manusia yang dituduh buatan AI bisa merugikan; dan apakah diuji pada data yang tidak dipakai melatihnya. 3: hapus nomor dan nama temanmu (data pribadi orang lain) sebelum mengirim apa pun ke layanan AI; bila tidak bisa dihapus, jangan kirim.

**Ulang berjarak.** 1: karena keduanya punya positif palsu (yang sah tertandai) dan negatif palsu (yang berbahaya lolos); hasilnya dipakai sebagai petunjuk bersama pemeriksaan sumber. 2: didukung, bertentangan, dan tidak ditemukan; bila belum bisa dipastikan, tahan: jangan sebarkan dan cari sumber lain atau tanya pihak resmi. 3: karena konten palsu atau keliru dapat menipu orang lain dan merusak nama orang; sebelum membagikan, periksa sumber dan konteks dengan lembar periksa, dan tahan bila belum pasti.

## Langkah berikutnya

Modul berikut: `d-xi2-m11` (layanan lewat API, opsional). Bacaan pendamping: `pendamping-periksa-fakta-dan-baca-lateral` dan `pendamping-riset-dan-verifikasi-konten`. Bacaan lanjut: laporan NIST AI 100-4 tentang risiko konten sintetis dan situs C2PA tentang Content Credentials.
