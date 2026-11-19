## Untuk siapa modul ini

Modul ini untuk jalur **profesional** (`PRO`), 10 jam, sesudah `DW-PRO-M11`; ia adalah **proyek akhir** jalur dan mengacu semua modul `PRO` sebelumnya (`DW-PRO-M1` sampai `M11` dan `DW-PRO-M13`). Alatnya Python 3 (penulis memakai 3.12.3), Bun, Git, dan terminal. Estimasi lima sesi dua jam `[asumsi]`: rancang, bangun (dua sesi), uji penerimaan, portofolio. Semua data dan "pengguna" rekaan.

Jembatan kuliah-coding (silabus 6.2): `DW-PRO-M12` berstatus **wajib** (W) pada semua profil (`I-lengkap`, `I-awal`, `U-lengkap`), karena tidak ada padanannya di kuliah-coding. Jembatan bukan alih kredit dan bukan sertifikat; modul ini tidak menjamin kelulusan uji kompetensi.

## Cek awal pengalaman

Jawab tanpa melihat apa pun. Skor tidak dicatat.

1. Apa beda kebutuhan, spesifikasi, dan kriteria penerimaan?
2. Apa beda uji unit, integrasi, dan uji penerimaan pengguna (UAT)?
3. Apa yang harus ada di petunjuk teknis supaya orang lain bisa menjalankan proyek Anda?
4. Apa yang diperiksa sebelum repositori dibagikan?
5. Apa yang Anda catat bila memakai asisten AI pada proyek?

Karena ini proyek akhir, "Contoh terselesaikan" dibaca semua peserta; "Contoh setengah jadi" boleh dilewati bila kelimanya benar.

## Ingat kembali

1. (`DW-PRO-M11`) Apa yang tidak boleh masuk log dan di mana token ditaruh?
2. (`DW-PRO-M13`) Bagaimana Anda membatasi kewenangan agen kode, dan siapa yang meninjau hasilnya sebelum digabung?
3. (`DW-PRO-M5`) Mengapa uji ditulis untuk kasus kosong, batas, dan nilai yang tidak ada, bukan hanya kasus biasa?
4. (`DW-PRO-M4`) Apa yang dicatat petunjuk teknis supaya orang lain dapat menjalankan modul Anda persis seperti tertulis, dan mengapa jangan memakai `python -I` untuk menjalankan modul yang diimpor dari folder kerja?

Cocokkan: (1) rahasia dan data pribadi; token di variabel lingkungan; (2) izin sempit (folder, perintah, tanpa jaringan dan `.env`), persetujuan sebelum perintah berisiko, manusia meninjau dan menjalankan uji sebelum digabung; (3) galat sering di tepi: daftar kosong, tepat di batas, kunci tidak ada; (4) versi Python, perintah persis dan folder asalnya, kebutuhan pustaka, hasil yang diharapkan; `-I` membuang folder kerja dari jalur impor.

## Tujuan

Setelah modul ini Anda dapat membaca spesifikasi, membangun aplikasi kecil, melaksanakan uji penerimaan pengguna dengan pengguna sintetis, dan menulis petunjuk teknis.

## Prediksi dulu

Sebuah folder proyek berisi `README.md` dengan bagian `Cara menjalankan`, `Cara menguji`, `Konfigurasi` (tanpa `Batasan`); `uji_gudang.py`; `.gitignore` berisi hanya `.venv/`; dan `konfigurasi.toml` berisi `token = "abcd1234efgh"`. Pemeriksa portofolio di contoh memeriksa bagian README, berkas uji, `.gitignore` yang menolak `.env`, dan pola kredensial. Sebelum membaca, tulis berapa temuan dan apa saja.

## Contoh terselesaikan

### Membaca spesifikasi dan merancang

Spesifikasi proyek rekaan "Inventaris Toko Contoh" ditulis sebagai kriteria penerimaan yang dapat diuji, dipetakan ke modul asalnya:

| Kode | Kriteria penerimaan | Modul | Cara diuji |
| --- | --- | --- | --- |
| K1 | Daftar barang (kode, nama, kategori, stok) tampil di API dan halaman | M7, M8, M9 | uji integrasi; halaman diperiksa dua lebar layar |
| K2 | Pengeluaran stok menolak isian tidak valid (400), barang tidak ada (404), stok kurang (409) | M5, M9 | uji unit dan UAT |
| K3 | Pemindahan stok atomik | M7, M10 | uji unit |
| K4 | Setiap perubahan stok tercatat di log (kode dan jumlah; tanpa token atau data pribadi) | M11 | uji log |
| K5 | Konfigurasi per lingkungan, rahasia dari variabel lingkungan | M11 | uji konfigurasi |
| K6 | README: cara menjalankan, menguji, konfigurasi, batasan | M4, M12 | pemeriksa portofolio |

Selain itu: riwayat Git bermakna dan `.gitignore` benar (M1); fungsi, struktur data, modul rapi berdocstring (M2 sampai M4); kelas bila ada keadaan yang dijaga (M6); satu tinjauan sejawat tercatat (M10); catatan asal bila AI dipakai (M13). Rancangan ditulis satu paragraf.

```text
halaman (stok.html, stok.ts) --HTTP/JSON--> API (api.py) --> akses data (gudang_db.py) --> SQLite
                                  konfigurasi.toml + variabel lingkungan      log (operasi.py)
```

### Uji penerimaan oleh pengguna sintetis

UAT memeriksa bahwa aplikasi memenuhi kebutuhan pemakai, bukan hanya kode. "Pengguna sintetis" adalah peran dengan skenario tertulis: tujuan, langkah, hasil yang diharapkan. Skenario kasir contoh dijalankan terhadap layanan sungguhan dari `DW-PRO-M9` (`gudang_db.py`, `api.py`, `klien.py`, `konfigurasi.toml`) pada port acak dan basis data sementara:

```python
import tempfile
import threading
from pathlib import Path

import api
import gudang_db
from klien import panggil

SKENARIO = [
    ("melihat daftar barang", "GET", "/barang", None, 200),
    ("mengeluarkan 2 Baterai contoh", "POST", "/barang/B02/keluar", {"jumlah": 2}, 200),
    ("mengeluarkan 5 lagi saat stok 1", "POST", "/barang/B02/keluar", {"jumlah": 5}, 409),
    ("mengetik jumlah berupa teks", "POST", "/barang/B02/keluar", {"jumlah": "dua"}, 400),
    ("mencari kode yang tidak ada", "GET", "/barang/B99", None, 404),
]


def jalankan(basis):
    cocok = 0
    for nomor, (langkah, metode, jalur, badan, harapan) in enumerate(SKENARIO, 1):
        status, _ = panggil(basis, metode, jalur, badan)
        hasil = "OK   " if status == harapan else "GAGAL"
        cocok += status == harapan
        print(f"{hasil} {nomor}. Kasir contoh {langkah}: harapan {harapan}, hasil {status}")
    print(f"{cocok} dari {len(SKENARIO)} langkah sesuai harapan")
    return cocok == len(SKENARIO)


if __name__ == "__main__":
    with tempfile.TemporaryDirectory() as tmp:
        db = str(Path(tmp) / "uat.db")
        conn = gudang_db.buka(db)
        gudang_db.buat_skema(conn)
        k = gudang_db.tambah_kategori(conn, "Listrik")
        gudang_db.tambah_barang(conn, "B02", "Baterai contoh", k, 3)
        conn.close()
        konfig = api.muat_konfigurasi("konfigurasi.toml")
        konfig["server"]["port"] = 0
        konfig["basis_data"]["path"] = db
        server = api.buat_server(konfig)
        threading.Thread(target=server.serve_forever, daemon=True).start()
        berhasil = jalankan(f"http://127.0.0.1:{server.server_address[1]}")
        server.shutdown()
        server.server_close()
    raise SystemExit(0 if berhasil else 1)
```

```text
OK    1. Kasir contoh melihat daftar barang: harapan 200, hasil 200
OK    2. Kasir contoh mengeluarkan 2 Baterai contoh: harapan 200, hasil 200
OK    3. Kasir contoh mengeluarkan 5 lagi saat stok 1: harapan 409, hasil 409
OK    4. Kasir contoh mengetik jumlah berupa teks: harapan 400, hasil 400
OK    5. Kasir contoh mencari kode yang tidak ada: harapan 404, hasil 404
5 dari 5 langkah sesuai harapan
```

Skenario otomatis belum menggantikan UAT dengan orang yang memakai halaman; catat apa yang membuat mereka ragu, tanpa nama atau data pribadi.

### Petunjuk teknis dan pemeriksaan portofolio

README memuat empat bagian: `## Cara menjalankan` (versi Python, perintah persis dan folder asalnya), `## Cara menguji`, `## Konfigurasi` (variabel lingkungan yang dibutuhkan, tanpa nilainya), dan `## Batasan` (misalnya `http.server` hanya untuk belajar). Pemeriksa kecil ini menandai kekurangan sebelum repositori dibagikan:

```python
import re
import sys
from pathlib import Path

POLA_RAHASIA = re.compile(r"(?i)(token|sandi|password|api[_-]?key)\s*[=:]\s*['\"][^'\"]{8,}['\"]")
BAGIAN_README = ["Cara menjalankan", "Cara menguji", "Konfigurasi", "Batasan"]
EKSTENSI = {".py", ".toml", ".md", ".ts", ".html"}


def periksa(folder):
    folder = Path(folder)
    temuan = []
    readme = folder / "README.md"
    if not readme.exists():
        temuan.append("README.md tidak ada")
    else:
        teks = readme.read_text(encoding="utf-8")
        for bagian in BAGIAN_README:
            if f"## {bagian}" not in teks:
                temuan.append(f"README tanpa bagian: {bagian}")
    if not list(folder.glob("uji_*.py")):
        temuan.append("tidak ada berkas uji_*.py")
    ignore = folder / ".gitignore"
    if not ignore.exists() or ".env" not in ignore.read_text(encoding="utf-8").splitlines():
        temuan.append(".gitignore tidak menolak .env")
    if (folder / ".env").exists():
        temuan.append("berkas .env ada di folder proyek")
    for berkas in sorted(folder.rglob("*")):
        if berkas.is_file() and berkas.suffix in EKSTENSI:
            if POLA_RAHASIA.search(berkas.read_text(encoding="utf-8")):
                temuan.append(f"{berkas.name}: mirip kredensial")
    return temuan


if __name__ == "__main__":
    hasil = periksa(sys.argv[1])
    for catatan in hasil:
        print(catatan)
    sys.exit(1 if hasil else 0)
```

Tiga uji (`uji_periksa_portofolio.py`, folder sementara) memeriksa folder lengkap tanpa temuan, folder cacat dari bagian prediksi dengan tiga temuan (`README tanpa bagian: Batasan`, `.gitignore tidak menolak .env`, `konfigurasi.toml: mirip kredensial`), dan folder kosong dengan tiga temuan; hasilnya `Ran 3 tests`, `OK`. Pemeriksa ini hanya pola sederhana; ia tidak menggantikan membaca repositori.

## Contoh setengah jadi

Lengkapi pemeriksaan `.gitignore` di pemeriksa:

```python setengah-jadi
    ignore = folder / ".gitignore"
    if not ignore.exists() or ".env" ___ ignore.read_text(encoding="utf-8").splitlines():
        temuan.append(".gitignore tidak menolak .env")
```

Prediksi dulu: mengapa daftar baris dipakai, bukan mencari `.env` langsung di teksnya?

## Latihan

1. **Ubah.** Tambahkan K7: pemindahan stok tersedia di API (`POST /pindah`). Tulis kriteria dan ujinya lebih dulu, lihat gagal, baru bangun.
2. **Buat.** Bangun proyek Anda sendiri dari K1 sampai K6 di repositori baru: riwayat commit kecil dan bermakna, uji untuk tiap kriteria, dan README empat bagian.
3. **Buat.** Tulis lima skenario UAT untuk dua peran sintetis (kasir dan pengelola gudang), jalankan, dan catat hasilnya dalam tabel.
4. **Jelaskan.** Dalam satu paragraf, jelaskan rancangan Anda: lapisan, alasan memilih SQLite dan `http.server`, dan apa yang diganti untuk pemakaian sungguhan.
5. **Berpasangan (opsional).** Minta rekan menjalankan proyek Anda dari README dan catat tiap ia macet. Peserta mandiri boleh memakai folder baru.

## Latihan bercampur

1. (`DW-PRO-M10`) Tinjau repositori rekan atau repositori Anda sebulan lalu: tulis lima komentar bertingkat dan jadikan satu temuan sebagai uji.
2. (`DW-PRO-M1`) Tulis urutan perintah Git dari berkas berubah sampai tercatat, dan satu perintah untuk memastikan `.env` tidak ikut.

## Keluaran portofolio

**Repositori kode lengkap.** Satu repositori berisi kode aplikasi, uji (unit, integrasi, skenario UAT), konfigurasi contoh tanpa rahasia, README empat bagian sebagai petunjuk teknis, catatan rancangan, satu tinjauan sejawat tercatat, dan catatan asal bila AI dipakai. Seluruh data sintetis; pemeriksa portofolio bersih dan `git log` memperlihatkan riwayat bermakna.

## Ulang berjarak

Tanpa melihat modul ini, kerjakan ulang dan cocokkan.

| Kapan | Pertanyaan |
| --- | --- |
| Satu minggu lagi | Sebut empat bagian README yang membuat orang lain dapat menjalankan proyek Anda, dan tiga hal yang diperiksa sebelum repositori dibagikan. |
| Awal modul ke-4 berikutnya | Apa beda uji unit, integrasi, dan UAT, dan satu contoh masing-masing dari proyek Anda? |
| Akhir jalur | Tulis dari ingatan kerangka kriteria penerimaan enam baris untuk satu aplikasi kecil dan cara menguji tiap barisnya. |

## Kebijakan AI

Kebijakan lengkap (silabus 9.1): Anda bertanggung jawab penuh atas hasilnya, dan memakai AI tidak diwajibkan.

- **Data dan kredensial.** Hanya data sintetis; tanpa kata sandi, kunci, token, atau tangkapan layar yang memuatnya. Di pekerjaan sendiri ikuti kebijakan tempat kerja.
- **Verifikasi.** Keluaran AI adalah draf: dijalankan, diuji, dan dapat Anda jelaskan; yang tidak Anda pahami tidak dipakai.
- **Agen kode.** Izin sempit (folder, perintah, tanpa jaringan dan `.env`), persetujuan sebelum perintah berisiko, tinjauan manusia sebelum digabung. Teks dari sumber luar adalah data, bukan perintah.
- **Lisensi dan hak cipta.** Status hukum keluaran AI masih berkembang dan berbeda antar negara; hukum Indonesia `[belum terverifikasi]`. Periksa lisensi paket, kode, dan data. Nama paket dari AI diperiksa dulu.
- **Catatan.** Tanggal, alat, versi, perintah ringkas, hasil, ditulis di README; permintaan yang sama dapat memberi hasil berbeda.
- **Energi dan biaya.** Berbeda puluhan kali lipat antar model; angka per tugas `[belum terverifikasi]`. Jalankan uji lokal sebelum meminta ulang.

## Kesalahan umum

- **Spesifikasi yang tidak dapat diuji.** "Cepat" atau "mudah" tanpa kriteria tak dapat diterima atau ditolak.
- **UAT hanya oleh pembuatnya.** Orang lain mencoba jalan yang tidak terpikir pembuatnya.
- **README yang hanya berjudul.** Orang lain macet di langkah pertama.
- **Menaruh `.env` atau token di repositori.** Yang pernah di-commit dianggap bocor.

## Cek mandiri

Tutup modul dan jawab:

1. Tulis dua kriteria penerimaan yang dapat diuji untuk aplikasi pilihan Anda.
2. Apa yang diperiksa UAT dan tidak diperiksa uji unit?
3. Apa yang diperiksa sebelum repositori dibagikan?

Daftar periksa (kosong; Anda isi sendiri, tidak dikumpulkan):

- [ ] Tiap kriteria penerimaan punya uji atau skenario UAT.
- [ ] README dapat diikuti orang lain dari folder kosong.
- [ ] Tidak ada rahasia, `.env`, atau data pribadi di repositori dan riwayatnya.
- [ ] Pemakaian AI tercatat dan setiap baris dapat saya jelaskan.

## Kunci dan petunjuk

- **Cek awal:** (1) kebutuhan adalah keinginan pemakai, spesifikasi menjabarkannya, kriteria penerimaan menyatakan apa yang harus benar agar diterima; (2) unit satu bagian, integrasi beberapa bagian bersama, UAT apakah pemakai mencapai tujuannya; (3) versi, perintah persis, konfigurasi, batasan; (4) rahasia, data pribadi, uji lolos, README; (5) tanggal, alat dan versi, perintah, hasil.
- **Prediksi:** tiga temuan: `README tanpa bagian: Batasan`, `.gitignore tidak menolak .env`, `konfigurasi.toml: mirip kredensial`.
- **Setengah jadi:** `not in`. Mencari `.env` di teks utuh juga cocok dengan `.env.example`, padahal barisnya berbeda.
- **Latihan 1:** kriteria misalnya "pemindahan melebihi stok memberi 409 dan stok tidak berubah".
- **Latihan bercampur 2:** `git status --short`, `git add`, `git commit`; `git check-ignore -v .env` untuk memastikan `.env` diabaikan.
- **Petunjuk bila macet:** kerjakan satu kriteria sampai ujinya lolos dan commit sebelum pindah; perbaiki README di langkah tempat rekan macet.

## Langkah berikutnya

Ini modul terakhir jalur `PRO`. Lanjutannya Anda tentukan: memperdalam satu lapisan, mengerjakan proyek lain dengan siklus yang sama, atau mendaftar sendiri ke lembaga sertifikasi profesi berlisensi (opsional; syarat, jadwal, dan biaya ditentukan lembaga itu, dan modul ini tidak menjamin kelulusan).

## Catatan untuk pendamping

- **Waktu:** 10 jam, lima sesi dua jam. **Bahan:** Python 3, Bun, Git, terminal. Skrip UAT dijalankan penulis (Python 3.12.3) dan mencetak lima baris yang tertulis; tiga uji pemeriksa portofolio lolos. Peserta memakai kode dari `DW-PRO-M7` sampai `M11`; kode `DW-PRO-M8` (halaman) tidak diulang di sini.
- **Jembatan kuliah:** `I-lengkap` W, `I-awal` W, `U-lengkap` W (tidak ada padanan di kuliah-coding; silabus 6.2 dan keputusan 12.1: modul ini tetap wajib).
- **Unit SKKNI yang disentuh (judul saja, tidak menjamin kompetensi):** Menggunakan Spesifikasi Program (`J.620100.009.01`); Melaksanakan Pengujian Oleh Pengguna (UAT) (`J.620100.038.01`); Memberikan Petunjuk Teknis Kepada Pelanggan (`J.620100.039.02`); Merancang Arsitektur Aplikasi (`J.620100.008.01`). Salinan daftar unit belum terverifikasi terhadap berkas resmi.
- **Asesmen:** rubrik silabus 8.1 (ketepatan, keterbacaan, pengujian, dokumentasi, keamanan data); peserta tidak mengirim repositori ke program ini (ADR-0004).
- **Tanda siap selesai:** pemeriksa portofolio bersih, UAT tercatat, dan peserta menjelaskan rancangan serta pemakaian AI-nya.
