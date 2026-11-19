## Untuk siapa modul ini

Modul ini untuk murid kelas XI jalur D (kecerdasan buatan dan analisis data), untuk minggu `D-XI2-M11` silabus v1.3 (bertanda opsional di silabus): menjelaskan cara aplikasi memakai model lewat layanan dan menjaga rahasia. Prasyarat: modul `d-xi2-m10` (modul tertulis dalam seri yang sama). Alat: Python 3 saja (pustaka standar), tanpa akun, dan tanpa kunci layanan sungguhan.

Modul ini berstatus DRAF: karangan penyusun, belum ditinjau pemilik. Jalur D adalah pengayaan di luar rumusan capaian pembelajaran (CP). Minggu ini tidak punya irisan pengayaan, jadi modul ini tidak dihitung memenuhi butir CP mana pun.

Aturan jalur D yang berlaku: data hanya sintetis (karangan) atau terbuka dengan lisensi jelas, tanpa data yang bisa mengenali orang; wajah, suara, dan foto orang tidak dipakai sebagai data; AI generatif boleh dipakai dengan etika dan dicatat, tanpa data pribadi, kata sandi, atau tugas bernilai pada permintaanmu, dan kamu tidak wajib punya akun. Saran: jawab dulu sendiri, baru minta AI memberi petunjuk bertahap; kode buatan AI dibaca, dijalankan, dan diuji. Setiap soal `Latihan` bertanda `AI: boleh` atau `AI: tanpa AI`.

Catatan untuk guru: blok Python dijalankan penyusun dengan `python3 -I` (Python 3.14.6, hanya pustaka standar, per 2026-11) dan keluarannya ditempel apa adanya; yang dinyatakan hanya "bisa dijalankan dengan keluaran ini", bukan "benar untuk semua masukan". **Modul ini tidak memanggil layanan sungguhan.** "Layanan model" adalah server tiruan di komputer murid sendiri (`127.0.0.1`, port dipilih otomatis, tidak terbuka ke jaringan), dengan model palsu berupa aturan satu kata, dan `kunci-tiruan-bukan-rahasia` bukan kunci apa pun. Murid tidak membuat atau memakai kunci pribadi di modul ini. Demonstrasi layanan sungguhan, bila guru menghendaki, mengikuti silabus 7.4 setelah guru memeriksa syarat usia dan ketentuan layanan (`[belum terverifikasi]`).

## Ingat kembali

Jawab dari ingatan, baru cek di bagian kunci.

1. Mengapa alat pemeriksa otomatis memberi petunjuk, bukan putusan? (dari `d-xi2-m10`)
2. Mengapa jaringan yang sudah dilatih harus disimpan bersama pengubah skalanya, dan apa yang terjadi bila skalanya tertinggal? (dari `d-xi2-m8`)
3. Beri satu contoh fitur turunan dan jelaskan mengapa ia bisa membantu model sederhana. (dari `d-xi2-m3`)

## Tujuan

Setelah modul ini kamu dapat:

- menggambar dan menjelaskan alur permintaan dari aplikasi ke layanan model dan kembali;
- membaca kode status 200, 400, 401, 403, dan 429, dan membatasi percobaan ulang;
- memakai kunci layanan tanpa menuliskannya di kode, log, atau repositori;
- menyebut data yang keluar dari komputermu, serta risiko biaya, kuota, dan privasi;
- menulis catatan arsitektur satu halaman.

Keluaran yang diminta silabus: catatan arsitektur (gambar alur permintaan; tanpa kunci pribadi).

## Prediksi dulu

Layanan tiruan memakai aturan berikut, diperiksa **berurutan**: tanpa kunci jawabannya 401; kunci salah 403; bila ini panggilan ke-5 atau lebih (berapa pun hasil panggilan sebelumnya) 429; badan JSON rusak 400; selain itu 200. Lima panggilan dikirim berturut-turut: (1) tanpa kunci, (2) kunci salah, (3) kunci benar dengan badan sah, (4) kunci benar dengan badan rusak, (5) kunci benar dengan badan sah. Tebak dan tulis status kelimanya sebelum menjalankan program pada bagian berikut.

## Contoh terselesaikan

**Alur permintaan.** Model berjalan di server; aplikasimu mengirim permintaan dan membaca respons.

```text
 aplikasi (klien)                          layanan model (server)
 1. siapkan permintaan
    POST /prediksi
    header: Authorization (kunci)   ---->  2. periksa kunci dan kuota
    badan: JSON {"teks": ...}              3. jalankan model
 5. baca status dan JSON            <----  4. kirim respons: status (200, 4xx) + JSON
```

Pada layanan pihak ketiga, masukan pada langkah 1 berpindah ke pihak lain, sebab itu aturannya: tanpa data pribadi. **Kunci** adalah rahasia yang membuktikan siapa kamu dan, pada layanan berbayar, siapa yang ditagih. OWASP mencatat bahwa banyak organisasi menaruh kunci API langsung di kode sumber dan berkas konfigurasi, dan *Twelve-Factor App* menyarankan konfigurasi disimpan di variabel lingkungan, dengan ujian: kode bisa dibuka kapan saja tanpa membocorkan kredensial. Program berikut membaca kunci dari "lingkungan", menyembunyikannya saat dicetak, menjalankan layanan tiruan, lalu mengirim lima panggilan seperti pada `Prediksi dulu`. Peta kecil yang berisi `KUNCI_LAYANAN` menggantikan variabel lingkungan shell; di program sungguhan, `os.environ`.

```python
import json
import threading
import urllib.error
import urllib.request
from http.server import BaseHTTPRequestHandler, HTTPServer

KUNCI_SAH = "kunci-tiruan-bukan-rahasia"  # BUKAN kunci sungguhan; hanya untuk layanan tiruan ini
panggilan = 0


class LayananTiruan(BaseHTTPRequestHandler):
    def do_POST(self):
        global panggilan
        panggilan += 1
        panjang = int(self.headers.get("Content-Length", 0))
        badan = self.rfile.read(panjang)
        kunci = self.headers.get("Authorization", "")
        if not kunci:
            kode, isi = 401, {"galat": "kunci tidak ada"}
        elif kunci != "Bearer " + KUNCI_SAH:
            kode, isi = 403, {"galat": "kunci salah"}
        elif panggilan > 4:
            kode, isi = 429, {"galat": "kuota habis"}
        else:
            try:
                teks = json.loads(badan)["teks"]
                skor = 0.9 if "gratis" in teks.lower() else 0.1
                kode, isi = 200, {"label": "spam" if skor > 0.5 else "biasa", "skor": skor}
            except (ValueError, KeyError):
                kode, isi = 400, {"galat": "badan permintaan tidak sah"}
        hasil = json.dumps(isi).encode()
        self.send_response(kode)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(hasil)))
        self.end_headers()
        self.wfile.write(hasil)

    def log_message(self, *args):
        pass  # tidak mencetak log permintaan


def ambil_kunci(lingkungan):
    # lingkungan: peta variabel lingkungan; di program sungguhan: os.environ
    try:
        return lingkungan["KUNCI_LAYANAN"]
    except KeyError:
        raise SystemExit("KUNCI_LAYANAN belum diatur; kunci tidak ditulis di kode") from None


def aman_dicetak(header):
    salinan = dict(header)
    if "Authorization" in salinan:
        salinan["Authorization"] = "***"
    return salinan


def panggil(alamat, kunci, badan):
    header = {"Content-Type": "application/json"}
    if kunci:
        header["Authorization"] = "Bearer " + kunci
    permintaan = urllib.request.Request(alamat, data=badan, headers=header, method="POST")
    try:
        with urllib.request.urlopen(permintaan, timeout=3) as respons:
            return respons.status, json.load(respons)
    except urllib.error.HTTPError as galat:
        return galat.code, json.load(galat)


try:
    ambil_kunci({})
except SystemExit as keluar:
    print("tanpa variabel:", keluar)
kunci = ambil_kunci({"KUNCI_LAYANAN": "kunci-tiruan-bukan-rahasia"})  # peta ini menggantikan lingkungan shell
print("header di log:", aman_dicetak({"Authorization": "Bearer " + kunci, "Content-Type": "application/json"}))

server = HTTPServer(("127.0.0.1", 0), LayananTiruan)  # hanya komputermu sendiri, port dipilih otomatis
threading.Thread(target=server.serve_forever, daemon=True).start()
alamat = f"http://127.0.0.1:{server.server_port}/prediksi"
bagus = json.dumps({"teks": "Dapatkan hadiah GRATIS sekarang"}).encode()
biasa = json.dumps({"teks": "Rapat kelas jam dua"}).encode()
rencana = [
    ("1 tanpa kunci", "", bagus),
    ("2 kunci salah", "kunci-lain", bagus),
    ("3 kunci benar", kunci, bagus),
    ("4 badan rusak", kunci, b"{bukan json"),
    ("5 kunci benar", kunci, biasa),
]
for nama, k, badan in rencana:
    status, isi = panggil(alamat, k, badan)
    print(nama, "->", status, isi)
server.shutdown()
```

```text
tanpa variabel: KUNCI_LAYANAN belum diatur; kunci tidak ditulis di kode
header di log: {'Authorization': '***', 'Content-Type': 'application/json'}
1 tanpa kunci -> 401 {'galat': 'kunci tidak ada'}
2 kunci salah -> 403 {'galat': 'kunci salah'}
3 kunci benar -> 200 {'label': 'spam', 'skor': 0.9}
4 badan rusak -> 400 {'galat': 'badan permintaan tidak sah'}
5 kunci benar -> 429 {'galat': 'kuota habis'}
```

Baca hasilnya. 401 berarti identitas tidak ada, 403 berarti identitas tidak berhak, 400 berarti permintaan rusak, dan 429 berarti terlalu banyak permintaan. Panggilan ke-5 sah, tetapi ditolak 429 karena layanan tiruan ini menghitung semua panggilan, termasuk yang gagal (layanan sungguhan berbeda; baca dokumentasinya). Status 200 hanya berarti layanan menjawab, bukan bahwa isinya benar. OWASP memasukkan pemakaian tak terbatas (*unbounded consumption*) dan pengungkapan informasi sensitif ke dalam daftar risiko aplikasi berbasis model bahasa.

**Catatan arsitektur (contoh).** "Aplikasi penyaring pesan kelas mengirim teks ke layanan model lewat HTTPS. Data yang keluar: teks pesan (karangan; tanpa nama dan nomor). Rahasia: kunci di variabel lingkungan, tidak di kode, tidak di log. Kegagalan: 429 ditangani dengan percobaan ulang paling banyak 3 kali dan jeda. Risiko: biaya dan kuota dipantau, privasi dijaga. Alternatif: model kecil lokal seperti `d-xi2-m8` tidak mengirim data keluar, tetapi harus dilatih dan dirawat sendiri."

## Contoh setengah jadi

Lengkapi `____` agar fungsi mencoba memanggil sebanyak-banyaknya `maksimal` kali, berhenti saat statusnya 200, dan mengembalikan `None` bila tidak pernah berhasil.

```python setengah-jadi
def coba_lagi(panggil, maksimal):
    for ke in range(1, ____ + 1):
        status = panggil(ke)
        if status == ____:
            return ke
    return ____


print(coba_lagi(lambda ke: 429 if ke < 3 else 200, 5))
print(coba_lagi(lambda ke: 429, 2))
```

## Soal Parsons

Susun baris menjadi fungsi yang menyalin header dan mengganti kuncinya dengan `***` sebelum dicetak. Lekukan sudah dipakai; yang diacak hanya urutannya.

```text
    return salinan
def aman_dicetak(header):
    if "Authorization" in salinan:
    salinan = dict(header)
        salinan["Authorization"] = "***"
```

## Latihan

1. **Status.** (`AI: tanpa AI`) Dengan layanan tiruan yang sama, tulis status enam panggilan berturut-turut yang semuanya memakai kunci benar dan badan sah. Lalu tulis status panggilan ke-5 bila kuncinya tidak dikirim.
2. **Gambar alur.** (`AI: tanpa AI`) Gambar di kertas alur permintaan aplikasi karanganmu ke layanan model: kotak klien, jaringan, server, dan model; beri label data yang keluar, tempat kunci disimpan, dan status yang mungkin kembali.
3. **Percobaan ulang.** (`AI: boleh`) Ubah kuota layanan tiruan menjadi 2 panggilan, lalu buat klien yang menangani 429 dengan paling banyak 3 percobaan dan jeda yang bertambah. Jelaskan mengapa percobaan ulang tanpa batas berbahaya.
4. **Kunci bocor.** (`AI: tanpa AI`) Kunci layanan tiruan terlanjur ada di berkas yang diunggah ke repositori publik. Urutkan lima langkah penanganan dan beri alasannya.
5. **Catatan pemakaian AI (opsional).** Bila memakai asisten AI untuk menjelaskan kode status atau menyusun klien, catat alat, tujuan, garis besar perintah, bagian yang dipakai, dan cara memeriksanya. Jangan menempelkan kunci apa pun ke asisten AI.

## Latihan bercampur

1. Dari `d-xi2-m8`: layanan menerima `suhu` dan `oksigen` mentah dari klien. Mengapa pengubah skala sebaiknya ikut dijalankan layanan bersama modelnya, bukan oleh tiap klien?
2. Dari `d-xi2-m10`: respons layanan model memuat klaim fakta yang lancar. Apa yang dilakukan aplikasi sebelum menampilkannya kepada pengguna?

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `d-xi2-m12` (sekitar satu minggu lagi), `d-xi2-m14` (sekitar tiga minggu lagi), dan `D-XII1-M5` (sekitar delapan minggu lagi). Jawab sekarang lalu simpan.

1. Mengapa kunci layanan disimpan di variabel lingkungan atau penyimpan rahasia, bukan di dalam kode?
2. Apa yang keluar dari komputermu ketika aplikasi memanggil layanan model pihak ketiga, dan apa risikonya bagi privasi?
3. Mengapa data pribadi tidak dikirim ke layanan luar, dan apa penggantinya untuk latihan?

## Kesalahan umum

- **"Kunci boleh ada di kode karena repositorinya pribadi."** Kode berpindah tangan dan tersalin; rahasia dipisahkan dari kode.
- **"Saat memakai API, modelnya berjalan di komputerku."** Model berjalan di server; yang kamu kirim adalah masukannya.
- **"Status 200 berarti hasilnya benar."** Ia hanya berarti layanan menjawab; isinya tetap diperiksa.
- **"Gagal? Ulangi terus sampai berhasil."** Batasi percobaan dan beri jeda, kalau tidak kuota dan biaya terbakar.
- **"Menghapus kunci dari berkas membereskan kebocoran."** Kunci yang pernah bocor dicabut atau diganti lebih dulu; riwayat berkas masih menyimpannya.

## Cek mandiri

- [ ] Saya dapat menggambar dan menjelaskan alur permintaan ke layanan model.
- [ ] Saya dapat membaca status 200, 400, 401, 403, dan 429.
- [ ] Saya dapat memakai kunci tanpa menulisnya di kode atau log.
- [ ] Saya dapat menyebut data yang keluar dan risikonya.
- [ ] Saya dapat menulis catatan arsitektur satu halaman.
- [ ] Saya mencatat pemakaian AI bila saya memakainya.

## Kunci dan petunjuk

**Ingat kembali.** 1: karena aturan sederhana maupun pendeteksi konten AI punya positif palsu (yang sah tertandai) dan negatif palsu (yang berbahaya lolos); hasilnya dipakai sebagai petunjuk bersama pemeriksaan sumber. 2: karena jaringan dilatih pada data yang sudah diskalakan; tanpa skalanya, masukan mentah mengubah hasil secara keliru. 3: misalnya `luas` dari panjang dan lebar: model garis lurus tidak bisa membentuk hasil kali sendiri, tetapi bisa memakainya bila sudah dihitung.

**Prediksi dulu.** Status: 401, 403, 200, 400, dan 429. Panggilan ke-5 sah tetapi ditolak karena sudah panggilan kelima, dan aturan kuota diperiksa sebelum isi badan dinilai; panggilan ke-4 yang rusak tetap dihitung. Keluarannya ada pada blok di bagian `Contoh terselesaikan`.

**Contoh setengah jadi.** Isian: `maksimal`, `200`, `None`.

```python
def coba_lagi(panggil, maksimal):
    for ke in range(1, maksimal + 1):
        status = panggil(ke)
        if status == 200:
            return ke
    return None


print(coba_lagi(lambda ke: 429 if ke < 3 else 200, 5))
print(coba_lagi(lambda ke: 429, 2))
```

```text
3
None
```

Pada yang pertama, percobaan ke-1 dan ke-2 mendapat 429 dan ke-3 mendapat 200, sehingga fungsi mengembalikan 3; pada yang kedua dua percobaan gagal semua, sehingga `None`. Dalam program sungguhan ada jeda yang bertambah di antara percobaan.

**Soal Parsons.** Urutan benar: `def`, `salinan = dict(header)`, `if ...`, `salinan["Authorization"] = "***"`, `return salinan`.

```python
def aman_dicetak(header):
    salinan = dict(header)
    if "Authorization" in salinan:
        salinan["Authorization"] = "***"
    return salinan


print(aman_dicetak({"Authorization": "Bearer contoh", "Accept": "application/json"}))
```

```text
{'Authorization': '***', 'Accept': 'application/json'}
```

Salinan dibuat agar header asli, yang masih dipakai untuk memanggil, tidak berubah.

**Latihan.** 1: 200, 200, 200, 200, 429, 429 (panggilan ke-5 dan seterusnya melebihi kuota). Bila panggilan ke-5 tanpa kunci: 401, karena kunci diperiksa sebelum kuota. 2: dinilai dari lima unsur: klien, jaringan, server, model, dan tiga label (data yang keluar, tempat kunci, status yang mungkin); gambar tidak memuat kunci apa pun. 3: ubah syarat `panggilan > 4` menjadi `> 2`; klien membungkus `panggil` dalam `coba_lagi` dengan batas 3 dan menunggu 1, 2, lalu 4 detik; tanpa batas, klien yang macet menghabiskan kuota dan biaya serta membebani layanan (OWASP: *unbounded consumption*). 4: (a) cabut atau ganti kunci di penyedia, karena kunci bocor harus dianggap sudah dipakai orang lain; (b) periksa log pemakaian dan tagihan untuk panggilan yang tidak dikenal; (c) pindahkan kunci baru ke variabel lingkungan dan hapus dari kode; (d) bersihkan riwayat repositori bila perlu dan beri tahu guru atau pemilik; (e) catat kejadian dan cara pencegahannya. 5: opsional.

**Latihan bercampur.** 1: supaya semua klien memakai skala yang sama dengan yang dipelajari saat pelatihan; bila tiap klien mengerjakannya sendiri, ada yang lupa atau salah, dan hasilnya keliru tanpa ada galat. 2: tampilkan sebagai keluaran AI, periksa klaimnya dengan sumber (lembar periksa), dan beri pengguna cara memeriksa; jangan menyajikannya sebagai fakta pasti.

**Ulang berjarak.** 1: karena kode berpindah tangan, tersalin, dan dibagikan; rahasia dipisahkan agar kode bisa dibuka tanpa membocorkan kredensial, dan kunci mudah diganti tanpa mengubah kode. 2: masukan (teks atau data lain) yang dikirim; ia berpindah ke pihak ketiga yang punya aturan penyimpanannya sendiri, sehingga data pribadi bisa bocor atau tersimpan di luar kendalimu. 3: karena data itu keluar dari kendalimu dan tidak bisa ditarik kembali; gantinya data karangan atau data terbuka berlisensi jelas.

## Langkah berikutnya

Modul berikut: `d-xi2-m12` (kartu model dan dokumentasi). Bacaan lanjut: dokumentasi `urllib.request` Python, halaman kode status HTTP MDN, dan *OWASP Secrets Management Cheat Sheet*.
