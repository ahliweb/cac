## Untuk siapa modul ini

Modul ini untuk mahasiswa semester 3 dari program studi mana pun yang sudah
lulus `KUL-U-101` (Berpikir Komputasional dan Dasar Pemrograman). `KUL-U-102`
sangat membantu tetapi bukan prasyarat. Kamu sudah dapat menulis fungsi, membaca
berkas dan CSV, menulis `assert`, dan memakai Git. Satu mata kuliah, satu
semester: 14 pertemuan, ujian tengah semester sesudah pertemuan 7 dan ujian
akhir sesudah pertemuan 14 `[asumsi]` (silabus bagian 2.3). Kamu butuh Python 3
dan Git; bagian 4 memakai terminal.

Kode di modul ini memakai Python 3.12 dan pustaka standar saja (tanpa pustaka
tambahan). Tiap blok lengkap sudah dijalankan penyusun di Linux dan keluarannya
sama dengan yang tertulis; perilaku berkas dan terminal dapat berbeda di
Windows atau macOS. Semua data, alamat, dan "kunci" di modul ini **sintetis
atau fiktif**.

Di semester 3, contoh terselesaikan sengaja **lebih sedikit**: contoh penuh
hanya untuk konsep baru, selebihnya kamu melengkapi kode atau menilai kode
orang lain.

## Peta semester

| Pertemuan | Bagian | Pokok bahasan | CPMK | Kuis pembuka (jarak) |
| --- | --- | --- | --- | --- |
| 1 | 1 | Menelusuri folder, nama berkas, `pathlib` | C1 | `KUL-U-101` (berkas, fungsi) |
| 2 | 1 | Mengolah teks dan CSV secara massal; rencana dulu, ubah kemudian | C1 | pertemuan 1 |
| 3 | 1 | Skrip yang aman diulang; penanganan galat | C1 | 2, lalu 1 |
| 4 | 2 | Ekspresi reguler: pola, kelas, pengulangan | C1 | 3, lalu 1 |
| 5 | 2 | Kelompok, `findall`, `sub`; batas ekspresi reguler; **kuis kumulatif 1** | C1 | 4, lalu 2 |
| 6 | 3 | JSON: membaca dan menulis | C2 | 5, lalu 3 |
| 7 | 3 | Permintaan HTTP: kode status, batas waktu | C2 | 6, lalu 4 |
| ujian tengah | | Ujian praktik langsung, tanpa AI | C1–C2 | |
| 8 | 3 | Memakai API publik dengan sopan: laju, galat, ulang | C2 | 7, lalu 5 |
| 9 | 4 | Pencatatan (*log*) | C3 | 8, lalu 6 |
| 10 | 4 | Penjadwalan; skrip yang dapat dijalankan tanpa pengawasan | C3 | 9, lalu 7 |
| 11 | 5 | Rahasia: kunci API, variabel lingkungan; **gerbang kesiapan AI** | C4 | 10, lalu 4 dan 8 |
| 12 | 5 | Izin, penyuntikan perintah, menilai skrip orang lain | C4 | 11, lalu 9 |
| 13 | 6 | Etika dan hukum otomasi; proyek akhir I | C1–C4 | 12, lalu 5 dan 10 |
| 14 | 6 | Proyek akhir II, refleksi; **kuis kumulatif 2** | C1–C4 | 13, lalu 1 sampai 12 |
| ujian akhir | | Ujian praktik langsung, tanpa AI | C1–C4 | |

## Ingat kembali

Tiap pertemuan dibuka dengan kuis 5 menit **tanpa catatan**, 3 sampai 5 soal
pendek. Kolom terakhir peta menunjukkan dari mana soalnya: pertemuan lalu,
lalu pertemuan yang lebih jauh, dan pada pertemuan awal dari mata kuliah
prasyarat. Jaraknya bertambah, jadi pertemuan 14 memuat soal dari pertemuan 1.
Kuis tidak dinilai besar.

Soal pembuka pertemuan 1 (dari `KUL-U-101`, dan `KUL-U-102` bila sudah diambil):

1. Mengapa fungsi yang mengembalikan nilai dengan `return` lebih mudah diuji
   dengan `assert` daripada fungsi yang hanya memakai `print`?
2. Tulis blok `with open("data.csv", newline="", encoding="utf-8") as f:`
   yang mencetak tiap baris `csv.DictReader`. Mengapa memakai `with`?
3. Mengapa hasil pembersihan data sebaiknya ditulis ke berkas lain, bukan
   menimpa data mentah?
4. Apa itu *keadaan tersembunyi* pada notebook, dan mengapa skrip yang dijalankan
   dari awal menghindarinya?

Soal pembuka pertemuan berikutnya mengikuti kolom peta; dosen atau asisten
menyusunnya dari bagian yang bersangkutan. Kerjakan latihan di tiap bagian
**sebelum** melihat bagian "Kunci dan petunjuk".

## Tujuan

Pada akhir semester kamu dapat (CPMK, silabus bagian 3.1):

- **C1** mengotomasi tugas berulang (berkas, teks, surel/dokumen) dengan
  skrip;
- **C2** memakai API publik dan format data JSON;
- **C3** menjadwalkan dan mencatat (log) eksekusi;
- **C4** menilai risiko keamanan skrip (kredensial, izin).

## Bagian 1: Pengolahan berkas (pertemuan 1 sampai 3)

Skrip otomasi bernilai karena melakukan hal yang sama persis, tanpa lelah,
ratusan kali. Karena itu skrip yang salah juga **merusak ratusan berkas
persis sama**. Prinsip bagian ini: *rencanakan dulu, ubah kemudian*, dan
jangan pernah menguji skrip pada satu-satunya salinan datamu.

### Prediksi dulu

Tanpa menjalankan, tulis keluaran program ini:

```python
from collections import Counter
from pathlib import PurePath

nama = ["a.txt", "b.csv", "c.txt", "arsip.tar.gz", "README"]
print(Counter(PurePath(n).suffix for n in nama))
print(PurePath("arsip.tar.gz").stem)
```

### Contoh terselesaikan

Masalah: sebuah folder berisi `Laporan Maret.TXT`, `Catatan Rapat.TXT`, dan
`foto.jpg`. Ganti nama berkas `.TXT` menjadi huruf kecil, spasi menjadi garis
bawah, ekstensi `.txt`. Langkah pertama bukan mengubah, melainkan
**menyusun rencana** yang bisa dilihat.

```python
import tempfile
from pathlib import Path


def rencana_ganti_nama(folder):
    rencana = []
    for p in sorted(Path(folder).glob("*.TXT")):
        baru = p.with_name(p.stem.lower().replace(" ", "_") + ".txt")
        rencana.append((p, baru))
    return rencana


def jalankan(rencana):
    for lama, baru in rencana:
        if baru.exists():
            print("lewati, sudah ada:", baru.name)
            continue
        lama.rename(baru)


with tempfile.TemporaryDirectory() as tmp:
    for nama in ["Laporan Maret.TXT", "Catatan Rapat.TXT", "foto.jpg"]:
        (Path(tmp) / nama).write_text("isi contoh", encoding="utf-8")
    rencana = rencana_ganti_nama(tmp)
    for lama, baru in rencana:
        print(lama.name, "->", baru.name)
    jalankan(rencana)
    print(sorted(p.name for p in Path(tmp).iterdir()))
```

Keluaran:

```text
Catatan Rapat.TXT -> catatan_rapat.txt
Laporan Maret.TXT -> laporan_maret.txt
['catatan_rapat.txt', 'foto.jpg', 'laporan_maret.txt']
```

Telusuri apa yang terjadi. `glob("*.TXT")` hanya memilih berkas berekstensi
huruf besar, jadi `foto.jpg` tidak tersentuh. `rencana_ganti_nama` hanya
**menghitung**; tidak ada berkas yang berubah sampai `jalankan`. Itu yang
membuat skrip dapat diperiksa dulu (*dry run*). `jalankan` menolak menimpa
berkas yang sudah ada; tanpa pemeriksaan itu, dua nama berbeda yang menjadi
nama yang sama akan saling menghapus. Folder sementara dari `tempfile` dihapus
otomatis. Pada sistem berkas yang tidak membedakan huruf besar dan kecil (umum
di Windows dan macOS), `baru.exists()` dapat berlaku untuk berkas yang sama
dengan `lama`; uji di mesinmu sendiri.

### Contoh setengah jadi

Lengkapi fungsi yang membaca semua berkas `.csv` di satu folder dan
mengembalikan jumlah baris data (tanpa baris judul) tiap berkas, dalam
kamus berurutan menurut nama:

```python
import csv
from pathlib import Path


def hitung_baris(folder):
    hasil = {}
    for p in sorted(Path(folder).glob("*.___")):
        with open(p, newline="", encoding="utf-8") as f:
            hasil[p.name] = sum(1 for _ in csv.___(f)) - 1
    return hasil
```

### Latihan

1. **Ubah:** buat `rencana_ganti_nama` juga mengurutkan nomor berkas
   (`laporan_1.txt`, `laporan_2.txt`) sesuai urutan tanggal ubah.
2. **Buat:** skrip yang mengelompokkan berkas sebuah folder ke subfolder
   menurut ekstensi, dengan rencana yang dicetak lebih dulu dan folder uji
   buatanmu sendiri (bukan folder pribadimu).
3. **Jelaskan:** mengapa skrip yang aman diulang (*idempotent*) lebih baik
   daripada skrip yang harus dijalankan tepat sekali.
4. **Berpasangan (pertemuan lab):** satu orang mengetik (pengemudi), satu
   orang mengarahkan (navigator); bertukar peran tiap 10 menit. Pasangan
   membuat folder uji dengan nama yang sengaja merepotkan (spasi, huruf besar,
   nama kembar setelah diubah) dan menguji skrip masing-masing.

## Bagian 2: Ekspresi reguler dasar (pertemuan 4 dan 5)

Ekspresi reguler (*regular expression*, regex) adalah bahasa kecil untuk
menggambarkan **pola teks**: tanggal, nomor, kata kunci. Berguna untuk
menyaring catatan, mengganti nama, atau memeriksa format. Berbahaya bila
dipakai untuk bahasa yang bersarang atau terlalu rumit.

### Prediksi dulu

Apa isi tiap keluaran?

```python
import re

teks = "rapat 2026-03-05, tenggat 2026-03-12; ruang 7"
print(re.findall(r"\d{4}-\d{2}-\d{2}", teks))
print(re.sub(r"\d", "#", "ruang 7"))
```

### Contoh terselesaikan

Dari baris catatan sintetis, ambil tanggal dan tingkat kepentingan dengan
**kelompok bernama**:

```python
import re

pola = re.compile(r"(?P<tanggal>\d{4}-\d{2}-\d{2}) \[(?P<tingkat>[A-Z]+)\] (?P<pesan>.+)")
baris = [
    "2026-03-05 [INFO] cadangan selesai",
    "2026-03-06 [GALAT] berkas hilang",
    "baris rusak tanpa tanggal",
]
for b in baris:
    cocok = pola.fullmatch(b)
    if cocok is None:
        print("lewati:", b)
    else:
        print(cocok["tanggal"], cocok["tingkat"], len(cocok["pesan"]))
```

Keluaran:

```text
2026-03-05 INFO 16
2026-03-06 GALAT 13
lewati: baris rusak tanpa tanggal
```

Alasan: `\d{4}` berarti tepat empat angka; `[A-Z]+` satu huruf besar atau
lebih; `.+` sembarang karakter, satu atau lebih; tanda kurung dengan
`?P<nama>` memberi nama kelompok. `fullmatch` mensyaratkan **seluruh** baris
cocok. Baris yang tidak cocok **tidak diam-diam dibuang**: dicetak sebagai
"lewati", supaya kamu tahu data mana yang tidak terbaca. Itu kebiasaan skrip
yang baik.

Dua batas. Pertama, ekspresi reguler memeriksa **bentuk**, bukan **arti**:
pola tanggal di atas menerima `2026-99-99`. Bila arti penting, ubah hasilnya
dengan `datetime.date.fromisoformat` dan tangani galatnya. Kedua, pola yang
tersusun buruk dapat sangat lambat pada teks tertentu (*backtracking*); jangan
menerima pola dari pengguna luar, dan jangan memakai regex untuk mem-parse
HTML atau JSON, karena ada pustaka khusus untuk itu.

### Contoh setengah jadi

Lengkapi agar mengganti semua deret spasi atau garis bawah pada nama berkas
menjadi satu tanda `-`:

```python
import re

nama = "Laporan  Maret__2026 final"
print(re.sub(r"[___]+", "-", nama))
# keluaran yang diharapkan: Laporan-Maret-2026-final
```

### Latihan

1. **Ubah:** perluas pola catatan agar menerima jam `HH:MM` setelah tanggal
   (dengan tetap menolak baris tanpa jam jika diminta).
2. **Buat:** fungsi `ambil_nomor(teks)` yang mengembalikan semua nomor telepon
   bergaya `0812-xxxx-xxxx` pada teks **sintetis** buatanmu sendiri.
3. **Jelaskan:** apa beda `match`, `fullmatch`, dan `search`, dan kapan
   `fullmatch` lebih aman.
4. **Berpasangan:** tukar pola dengan pasangan; masing-masing mencari tiga
   teks yang **seharusnya ditolak** tetapi diterima pola pasangannya.

## Bagian 3: Permintaan HTTP dan JSON (pertemuan 6 sampai 8)

Banyak layanan menyediakan **API**: alamat yang menjawab permintaan dengan
data terstruktur, biasanya **JSON**. Skripmu dapat meminta data itu tanpa
membuka peramban. Bagian ini juga tentang kesopanan: permintaan yang terlalu
sering dapat mengganggu layanan orang lain.

### Prediksi dulu

```python
import json

teks = '{"kota": "Contohkota", "suhu": [29, 31], "hujan": false, "catatan": null}'
data = json.loads(teks)
print(data["suhu"][1])
print(data["hujan"], data["catatan"])
print(json.dumps({"ok": True, "nilai": None}))
```

JSON memakai `true`, `false`, dan `null`; Python memakai `True`, `False`, dan
`None`. Tulis dugaanmu, lalu cocokkan.

### Contoh terselesaikan

Agar latihan tidak bergantung pada internet dan tidak membebani layanan
siapa pun, skrip berikut **menjalankan layanan tiruan di komputermu sendiri**
(alamat `127.0.0.1`), lalu meminta data kepadanya. Konsepnya sama dengan
memakai API sungguhan. Untuk API nyata, ganti alamat dan baca dokumentasinya.

```python
import json
import threading
import urllib.error
import urllib.request
from http.server import BaseHTTPRequestHandler, HTTPServer


class Tiruan(BaseHTTPRequestHandler):
    def do_GET(self):
        if self.path == "/prakiraan":
            badan = json.dumps({"kota": "Contohkota", "suhu": [29, 31]}).encode()
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.end_headers()
            self.wfile.write(badan)
        else:
            self.send_response(404)
            self.end_headers()

    def log_message(self, *args):
        pass


server = HTTPServer(("127.0.0.1", 0), Tiruan)
threading.Thread(target=server.serve_forever, daemon=True).start()
dasar = f"http://127.0.0.1:{server.server_port}"


def ambil_json(url):
    try:
        with urllib.request.urlopen(url, timeout=5) as jawaban:
            return json.loads(jawaban.read().decode("utf-8"))
    except urllib.error.HTTPError as galat:
        print("status", galat.code)
        return None


data = ambil_json(dasar + "/prakiraan")
print(data["kota"], max(data["suhu"]))
print(ambil_json(dasar + "/tidak-ada"))
server.shutdown()
```

Keluaran:

```text
Contohkota 31
status 404
None
```

Telusuri. `timeout=5` membatasi tunggu lima detik; tanpanya skripmu dapat
menggantung selamanya bila layanan tidak menjawab. Kode status 200 berarti berhasil; 404 berarti alamat tidak
ada, dan `urllib` melaporkannya sebagai `HTTPError` yang harus kamu tangani.
`json.loads` mengubah teks menjadi struktur Python. **Inti pemakaian API hanya
`ambil_json`**; sisanya layanan tiruan.

Aturan kesopanan memakai API publik: baca batas laju (*rate limit*) dan
syarat penggunaan dari dokumentasi layanannya; beri jeda antar permintaan;
simpan hasil yang sudah diambil; tunggu lebih lama saat menerima status `429`
(terlalu banyak permintaan); jangan menyimpan data pribadi orang lain.

### Contoh setengah jadi

Lengkapi fungsi yang mencoba paling banyak tiga kali dengan jeda yang
bertambah, tetapi **hanya** untuk galat sementara; kode `404` tidak
diulang karena mengulang tidak akan mengubahnya:

```python
import time
import urllib.error


def ambil_dengan_ulang(fungsi, percobaan=3, jeda=0.1):
    for ke in range(1, percobaan + 1):
        try:
            return fungsi()
        except urllib.error.HTTPError as galat:
            if galat.code == ___ or ke == percobaan:
                raise
            time.sleep(jeda * ke)
```

### Latihan

1. **Ubah:** buat layanan tiruan mengembalikan tiga prakiraan di `/hari`,
   dan ambil suhu terendahnya.
2. **Buat:** skrip yang meminta tiga alamat tiruan berurutan dengan jeda dan
   menulis hasil gabungannya ke satu berkas JSON.
3. **Jelaskan:** mengapa `timeout` dan jeda antar permintaan termasuk
   keselamatan, bukan sekadar kenyamanan.
4. **Berpasangan:** satu orang menyusun layanan tiruan yang kadang menjawab
   `500`, yang lain menulis klien yang tahan; bertukar.

## Bagian 4: Penjadwalan dan pencatatan (pertemuan 9 dan 10)

Skrip yang dijalankan tanpa kamu di depannya harus **menceritakan sendiri**
apa yang terjadi. Itulah fungsi *log*.

### Prediksi dulu

Program memproses tiga item, item kedua gagal. Apa yang kamu harapkan terlihat
di log, dan apakah item ketiga tetap diproses? Tulis dugaanmu, lalu jalankan.

### Contoh terselesaikan

```python
import logging
import sys

logging.basicConfig(
    stream=sys.stdout,
    level=logging.INFO,
    format="%(levelname)s %(message)s",
)
log = logging.getLogger("rekap")


def proses(item):
    if item == "b":
        raise ValueError("format tidak dikenal")
    return item.upper()


def utama(daftar):
    gagal = 0
    for item in daftar:
        try:
            log.info("memproses %s", item)
            proses(item)
        except ValueError as galat:
            gagal += 1
            log.error("gagal pada %s: %s", item, galat)
    log.info("selesai, gagal %d dari %d", gagal, len(daftar))
    return 1 if gagal else 0


sys.exit(utama(["a", "b", "c"]))
```

Keluaran (kode keluar proses: 1):

```text
INFO memproses a
INFO memproses b
ERROR gagal pada b: format tidak dikenal
INFO memproses c
INFO selesai, gagal 1 dari 3
```

Alasan. Galat per item ditangkap sehingga satu item rusak tidak menghentikan
sisanya, tetapi **tercatat**, dan ringkasan akhir menyatakan berapa yang
gagal. Skrip mengembalikan kode keluar `1` bila ada kegagalan; penjadwal dan
skrip lain membaca kode itu untuk tahu apakah pekerjaan berhasil (0 berarti
sukses). Di skrip nyata, tulis log ke berkas dan sertakan waktu
(`%(asctime)s`). **Jangan menulis kata sandi, kunci, atau data pribadi ke
log**; berkas log sering dibagikan dan jarang dibersihkan.

**Penjadwalan.** Di Linux dan macOS, `cron` menjalankan perintah menurut
lima kolom (menit, jam, tanggal, bulan, hari dalam pekan). Contoh baris
(bentuk saja; tidak dijalankan di modul ini):

```text
30 6 * * 1-5  /usr/bin/python3 /home/pengguna/rekap/rekap.py >> /home/pengguna/rekap/rekap.log 2>&1
```

Artinya: pukul 06.30 Senin sampai Jumat. Windows memakai *Task Scheduler*.
Lingkungan terjadwal berbeda dari terminalmu: direktori kerja, variabel
lingkungan, dan jalur program tidak sama. Karena itu pakai **jalur absolut**
dan uji dengan menjalankan skrip dari folder lain. Skrip terjadwal harus aman
diulang: menjalankannya dua kali tidak boleh mengirim dua kali atau
menggandakan data.

### Contoh setengah jadi

Lengkapi agar menulis log ke berkas, bukan ke layar, dengan waktu:

```python
import logging

logging.basicConfig(
    filename="rekap.log",
    level=logging.INFO,
    format="%(___)s %(levelname)s %(message)s",
)
logging.info("mulai")
```

### Latihan

1. **Ubah:** ubah contoh agar item yang gagal ditulis ulang ke berkas
   `gagal.txt` untuk dicoba ulang.
2. **Buat:** skrip rekap yang dari folder uji menghitung berkas menurut
   ekstensi, mencatat hasilnya, dan keluar dengan kode 1 bila folder tidak ada.
3. **Jelaskan:** mengapa jalur relatif sering gagal ketika skrip dijadwalkan.
4. **Berpasangan:** pasangan menjalankan skripmu dari folder lain dan membaca
   lognya saja; catat satu hal yang tidak bisa ia pahami dari log itu.

## Bagian 5: Rahasia dan risiko skrip (pertemuan 11 dan 12)

Skrip sering memegang **kredensial**: kunci API, kata sandi, token. Bagian ini
membahas cara memegangnya tanpa membocorkan, dan cara menilai bahaya sebuah
skrip.

### Prediksi dulu

Seorang mahasiswa menulis `KUNCI = "abc123"` langsung di skrip, lalu
mengunggah repositori ke layanan publik. Tulis tiga hal yang dapat terjadi dan
satu langkah yang **tidak** cukup untuk memperbaikinya (petunjuk: riwayat Git).

### Contoh terselesaikan

Aturan pokok: kunci **tidak pernah masuk repositori**. Skrip membacanya dari
variabel lingkungan dan berhenti dengan pesan yang jelas bila tidak ada.

```python
import os
import sys

kunci = os.environ.get("API_KUNCI")
if not kunci:
    print("API_KUNCI belum diatur; berhenti")
    sys.exit(2)
print("kunci terbaca, panjang", len(kunci))
```

Dijalankan tanpa pengaturan, keluarannya `API_KUNCI belum diatur; berhenti`
(kode keluar 2). Dijalankan sebagai `API_KUNCI=contoh-bukan-kunci-asli python3
skrip.py` di shell Linux atau macOS, keluarannya `kunci terbaca, panjang 23`.
Berkas yang menyimpan kunci untuk pengembangan (`.env`) harus dikecualikan
dari Git:

```text
# .gitignore
.env
*.log
```

`.gitignore` hanya mencegah berkas yang **belum pernah** disimpan. Kunci yang
sudah terlanjur masuk riwayat Git tetap ada di riwayat walaupun berkasnya
dihapus; tindakan yang benar adalah **mencabut dan mengganti kunci itu** di
penyedia layanan, bukan sekadar menghapusnya dari kode. Itu jawaban petunjuk
prediksi tadi.

Dua kebiasaan lain. Izin berkas: berkas rahasia sebaiknya hanya dapat dibaca
pemiliknya.

```python
import os
import stat
import tempfile

with tempfile.NamedTemporaryFile(delete=False) as f:
    f.write(b"rahasia latihan")
os.chmod(f.name, 0o600)
print(oct(stat.S_IMODE(os.stat(f.name).st_mode)))
os.remove(f.name)
```

Keluaran di Linux: `0o600`, artinya pemilik boleh membaca dan menulis, orang
lain tidak. Dan **hak akses minimum**: beri skrip kunci yang hanya berhak
melakukan yang ia butuhkan (hanya baca, bukan admin), sehingga bila bocor
kerusakannya kecil.

**Penyuntikan perintah.** Skrip yang merangkai teks dari luar menjadi perintah
shell berbahaya. Bandingkan dua cara memanggil `echo` dengan masukan yang
dibuat jahat:

```python
import subprocess

masukan = "a; echo bocor"
subprocess.run("echo " + masukan, shell=True)
subprocess.run(["echo", masukan])
```

Keluaran di Linux:

```text
a
bocor
a; echo bocor
```

Cara pertama menjalankan **dua perintah** karena `;` dibaca shell; cara kedua
mengirim seluruh teks sebagai satu argumen, tanpa tafsir shell. Aturannya:
berikan perintah sebagai daftar, hindari `shell=True`, dan jangan menjalankan
teks dari pengguna, berkas, atau layanan luar sebagai perintah.

### Contoh setengah jadi

Baca skrip berikut seperti peninjau. Tandai **tiga masalah keamanan**, lalu
perbaiki:

```python
import subprocess
import urllib.request

KUNCI = "kunci-latihan-palsu"


def unduh(nama_berkas):
    url = "https://layanan.example/data/" + nama_berkas
    req = urllib.request.Request(url, headers={"Authorization": KUNCI})
    subprocess.run("curl -O " + url, shell=True)
```

### Latihan

1. **Ubah:** perbaiki skrip di atas (kunci dari lingkungan, tanpa `shell=True`,
   nama berkas divalidasi dengan pola yang ketat).
2. **Buat:** pemindai kecil yang mencari baris berpola seperti kunci
   (`KUNCI = "..."`, `password=...`) pada folder uji buatanmu dan melaporkan
   nomor barisnya tanpa mencetak nilainya.
3. **Jelaskan:** mengapa mengganti kunci yang bocor lebih penting daripada
   menghapus komit yang memuatnya.
4. **Berpasangan:** tukar skrip dan lakukan **tinjau kode** terhadap daftar:
   kunci, izin, masukan luar, log, hak akses.

**Gerbang kesiapan AI (pertemuan 11).** Kamu siap memakai asisten AI pada
tugas Kuning bila dapat (1) menelusuri skrip pendek, (2) menulis satu uji yang
gagal bila kode salah, dan (3) menjelaskan kode dengan kata sendiri. Kerjakan
tiga hal itu tanpa AI; dosen atau asisten menandai kesiapanmu.

## Bagian 6: Etika, hukum, dan proyek akhir (pertemuan 13 dan 14)

Bisa mengotomasi sesuatu tidak sama dengan boleh. Tiga pertanyaan sebelum
menjalankan skrip pada sistem milik orang lain: **apakah aku berhak** (izin
tertulis atau syarat layanan), **apakah aku merugikan** (beban server, data
pribadi), dan **apakah aku mengungkapkan** (memperkenalkan skripku lewat
`User-Agent` yang jelas).

### Prediksi dulu

Situs milik sebuah organisasi menyatakan di berkas `robots.txt` bahwa folder
`/privat/` tidak boleh diambil skrip dan meminta jeda 5 detik. Tulis keputusanmu
untuk dua alamat: `/umum/a` dan `/privat/a`.

### Contoh terselesaikan

Protokol `robots.txt` (RFC 9309) adalah kesepakatan, bukan penjaga: skripmu
dapat mengabaikannya, dan itu tidak etis serta dapat melanggar syarat layanan.
Pustaka standar dapat membacanya.

```python
from urllib.robotparser import RobotFileParser

aturan = RobotFileParser()
aturan.parse(["User-agent: *", "Disallow: /privat/", "Crawl-delay: 5"])
print(aturan.can_fetch("skrip-kuliah", "https://situs.example/umum/a"))
print(aturan.can_fetch("skrip-kuliah", "https://situs.example/privat/a"))
print(aturan.crawl_delay("skrip-kuliah"))
```

Keluaran:

```text
True
False
5
```

Nilai `5` adalah jeda dalam detik yang diminta situs. Namun **izin teknis bukan izin hukum**.
Teks asli UU Nomor 11 Tahun 2008 tentang Informasi dan Transaksi Elektronik
Pasal 30 ayat (1) menyebut perbuatan "dengan sengaja dan tanpa hak atau melawan
hukum mengakses Komputer dan/atau Sistem Elektronik milik Orang lain dengan
cara apa pun". Pasal itu termasuk ketentuan UU ITE yang dicabut oleh UU Nomor 1
Tahun 2023 tentang KUHP (Pasal 622), yang berlaku sejak 2 Januari 2026; perbuatan
serupa kini diatur di KUHP. Periksa teks berlaku di JDIH resmi; modul ini bukan
nasihat hukum dan tidak menafsirkan pasal.
Pegangan praktis: **hanya otomasi sistem milikmu sendiri, sistem yang
secara tertulis mengizinkan, atau API publik sesuai syaratnya**.

Di mata kuliah ini data selalu sintetis atau terbuka (silabus bagian 8);
skrip yang mengumpulkan data pribadi orang lain membuatmu bertanggung jawab
atasnya.

**Proyek akhir** (pertemuan 13 dan 14, perorangan; berpasangan hanya untuk
tinjau kode): otomasi satu **alur kerja nyata** dengan **data sintetis**,
misalnya rekap bulanan berkas catatan, penyusun laporan dari CSV, atau
pemantau layanan tiruan. Syarat: memakai berkas, ekspresi reguler atau JSON,
log ke berkas, jadwal yang dituliskan (bentuk cron atau penjadwal yang kamu
pakai), kunci dari lingkungan, tidak ada data pribadi, README dengan cara
menjalankan dan risikonya, minimal tiga uji, dan riwayat Git dengan sedikitnya
enam *commit*. Pertemuan 14 ditutup dengan refleksi satu halaman tentang
risiko skripmu.

Pada bagian ini **tidak ada contoh terselesaikan**: kamu menulis dari
spesifikasi. Pemudaran dari contoh penuh (bagian 1 sampai 3, hanya untuk
konsep baru), ke contoh setengah jadi dan membaca kode orang lain (bagian 4
dan 5), ke spesifikasi saja (bagian 6) disengaja.

## Latihan bercampur

Setelah bagian 3 dan setelah bagian 5, kerjakan soal yang **tidak
mengatakan** topiknya. Contoh: "Ada folder berisi seratus catatan harian
sintetis; setiap pagi kamu ingin tahu catatan mana yang menyebut kata
'tenggat'." Kamu sendiri yang memutuskan pola, jadwal, catatan, dan risikonya. Kuis
kumulatif 1 (pertemuan 5) dan 2 (pertemuan 14) berbentuk sama.

## Ulang berjarak

Kerjakan ulang tanpa melihat solusi lama:

- satu minggu setelah bagian: tulis ulang satu fungsi dari bagian itu pada
  folder atau data baru;
- awal setiap bagian baru: dua soal dari bagian sebelumnya;
- minggu sebelum ujian: tiga soal dari bagian 1 sampai 3 yang dahulu salah,
  termasuk soal `KUL-U-101` (fungsi, berkas) dan `KUL-U-102` (pembersihan,
  alur yang dapat diulang).

## Kebijakan AI dan log pemakaian

Silabus bagian 6.3 tidak menyebut tingkat AI untuk mata kuliah ini, jadi
tingkat berikut adalah **`[asumsi]` penyusun modul**. Dosen boleh mengubahnya
per tugas dan menuliskannya di lembar tugas:

| Jenis tugas | Tingkat `[asumsi]` |
| --- | --- |
| Tugas skrip dasar sampai menengah (bagian 1 sampai 4) | Kuning |
| Proyek akhir dan eksplorasi API (bagian 3 sampai 6) | Hijau |
| Ujian praktik langsung | Merah |

**Kuning**: AI boleh menjelaskan konsep, tidak boleh menghasilkan solusi yang
kamu serahkan, dan hanya setelah **gerbang kesiapan** (pertemuan 11). **Hijau**:
AI boleh dipakai dengan pengungkapan ringkas dan **log pemakaian** wajib.
**Merah**: tanpa AI.

Format log, disimpan di repositorimu sendiri: alat dan versi, tujuan,
perintah yang kamu ketik, dan bagian keluaran yang dipakai. Jangan memasukkan
data pribadi, kata sandi, atau kunci ke layanan AI, termasuk **kunci API yang
kamu pakai di skrip**: kalau kamu menempelkan skrip berisi kunci ke asisten,
kunci itu sudah terkirim ke pihak lain. Bahaya khusus otomasi: asisten dapat
mengusulkan `shell=True`, `rm -rf`, atau kunci yang ditanam di kode.
**Skrip dari AI diperlakukan sebagai kode orang asing**: baca, jalankan di
folder uji, dan tinjau dengan daftar keamanan bagian 5 sebelum menyentuh data
nyata. Dosen dapat mewawancarai kamu singkat
tentang skrip yang kamu serahkan.

## Kesalahan umum

- **Regex menerima yang tidak masuk akal.** `\d{2}` menerima `99` sebagai bulan.
- **Tanpa `timeout`.** Skrip menggantung tanpa pesan.
- **Jalur relatif pada skrip terjadwal.** Direktori kerja berbeda.
- **Kunci di kode atau di log.** Dan mengira menghapusnya dari riwayat Git cukup.
- **Menelan semua galat dengan `except: pass`.** Kegagalan jadi tidak terlihat.

## Cek mandiri

Tutup modul, jawab, baru periksa.

1. Mengapa skrip berkas perlu *dry run*?
2. Tulis pola untuk tanggal `2026-03-05` dan sebut satu hal yang tidak
   diperiksa pola itu.
3. Apa fungsi `timeout` pada permintaan HTTP?
4. Sebut tiga hal yang harus ada pada skrip yang dijadwalkan.
5. Kunci API sudah terlanjur masuk ke Git. Apa yang kamu lakukan?
6. Mengapa `subprocess.run(["echo", x])` lebih aman daripada
   `subprocess.run("echo " + x, shell=True)`?

Daftar periksa (kosong; kamu isi sendiri, tidak dikumpulkan):

- [ ] Aku dapat menulis skrip berkas dengan rencana dan penolakan menimpa.
- [ ] Aku dapat memakai ekspresi reguler dan menyebut batasnya.
- [ ] Aku dapat meminta data JSON dengan batas waktu dan penanganan galat.
- [ ] Aku dapat mencatat dan menjadwalkan skrip yang aman diulang.
- [ ] Aku dapat menjaga rahasia dan menilai risiko skrip orang lain.

## Kunci dan petunjuk

- **Bagian 1:** prediksi `Counter({'.txt': 2, '.csv': 1, '.gz': 1, '': 1})`
  (`README` tidak punya ekstensi sehingga masuk hitungan `''`; `arsip.tar.gz`
  hanya dihitung ekstensi terakhirnya) dan `arsip.tar`. Setengah jadi: `csv`,
  `reader`.
- **Bagian 2:** prediksi `['2026-03-05', '2026-03-12']` dan `ruang #`.
  Setengah jadi: spasi dan garis bawah di dalam kurung siku, yaitu `[ _]+`.
- **Bagian 3:** prediksi `31`, lalu `False None`, lalu `{"ok": true, "nilai":
  null}`. Setengah jadi: `404`.
- **Bagian 4:** prediksi: log mencatat kegagalan item kedua dan item ketiga
  tetap diproses karena galat ditangkap per item. Setengah jadi: `asctime`.
- **Bagian 5:** prediksi: kunci terbaca siapa saja, dapat dipakai pihak lain
  dengan biaya atau kerusakan atas namamu, dan tersisa di riwayat Git; yang
  tidak cukup adalah menghapus berkasnya. Setengah jadi, tiga masalah: kunci
  tertanam, `shell=True` dengan teks dari luar, nama berkas tidak divalidasi.
  Pemindai: mulai dari `re.search` per baris.
- **Bagian 6:** prediksi: `/umum/a` boleh, `/privat/a` tidak, dan tunggu 5
  detik antar permintaan.
- **Petunjuk bertahap bila macet:** (1) jalankan dengan satu masukan kecil dan
  baca pesan galat dari bawah; (2) cetak nilai variabel sebelum baris yang
  gagal; (3) kecilkan masalah sampai satu baris dan uji di folder sementara.

## Langkah berikutnya

`KUL-U-301` (Proyek Komputasi Lintas Disiplin) memakai skrip otomasi untuk
mengerjakan prototipe bersama tim. Bila kamu bergabung ke jalur informatika,
`KUL-I-301` (jaringan dan keamanan) memperdalam bagian 3 dan 5, dan `KUL-I-205`
memperdalam keamanan perangkat lunak.

## Catatan untuk dosen

- **Bobot dan bentuk asesmen (usulan; prodi menetapkan, silabus 6.1):** tiga
  skrip otomasi dengan dokumentasi, proyek akhir otomasi alur kerja nyata
  dengan data sintetis, kuis, ujian praktik langsung tanpa AI. Rentang bobot
  silabus: tugas dan praktikum 30–40 persen, proyek 20–40, ujian praktik
  20–30, ujian tertulis atau lisan 10–20.
- **Variasi per mahasiswa:** beri tiap mahasiswa struktur folder dan pola
  catatan berbeda; riwayat Git dan log skrip menjadi bukti proses (silabus 6.2).
- **Praktikum:** siapkan folder uji sintetis dengan nama berkas yang
  merepotkan, dan layanan tiruan lokal (seperti di bagian 3); jangan menyuruh
  mahasiswa menyerang atau memindai sistem orang lain. Bila lab memakai
  Windows, siapkan padanan perintah bagian 4 dan 5 (`Task Scheduler`, izin
  berkas).
- **Aspek hukum:** modul hanya mengutip teks asli yang dibaca; bila prodi
  memerlukan penjelasan hukum yang lengkap, undang pengajar hukum atau unit
  hukum kampus.
- **Tingkat AI** pada bagian kebijakan adalah `[asumsi]`: ubah bila prodi
  punya ketentuan lain.

## Rujukan

- *The Python Standard Library: pathlib, re, json, urllib.request, logging,
  subprocess, urllib.robotparser*, Python Software Foundation (dibuka
  2026-11-19): <https://docs.python.org/3/library/index.html>
- RFC 9309, *Robots Exclusion Protocol*, IETF (dibuka 2026-11-19):
  <https://www.rfc-editor.org/rfc/rfc9309>
- UU Nomor 11 Tahun 2008 tentang Informasi dan Transaksi Elektronik, JDIH BPK
  (teks asli; pasal 30 ayat (1) dibaca 2026-11-19):
  <https://peraturan.bpk.go.id/Details/37589/uu-no-11-tahun-2008>
- *OWASP Top 10* (dibuka 2026-11-19): <https://owasp.org/www-project-top-ten/>
- *Git Reference*, git-scm.com (dibuka 2026-11-19):
  <https://git-scm.com/docs>
- ACM/IEEE-CS/AAAI, *Computer Science Curricula 2023*, daftar knowledge
  area (SDF, SEC, NC) (dibuka 2026-11-19): <https://csed.acm.org/knowledge-areas/>
