## Untuk siapa modul ini

Modul ini untuk jalur **profesional** (`PRO`), 10 jam, sesudah `DW-PRO-M10`. Alatnya Python 3 (penulis memakai 3.12.3) dengan pustaka bawaan `logging`, `tomllib`, dan `sqlite3`, terminal, serta `gudang_db.py` dan `skema.sql` dari `DW-PRO-M7`. Estimasi lima sesi dua jam `[asumsi]`. Tidak ada server sungguhan, surel, atau layanan pesan yang dipanggil; "pemberitahuan" diuji dengan fungsi pengganti. Semua data dan token rekaan.

Jembatan kuliah-coding (silabus 6.2), per profil masuk: `I-lengkap` **padatkan**, `I-awal` **wajib**, `U-lengkap` **padatkan**. Dasarnya `KUL-I-203`, `KUL-I-302`, dan `KUL-U-201` C3 (penjadwalan dan log). Jembatan bukan alih kredit dan bukan sertifikat.

## Cek awal pengalaman

Jawab tanpa melihat apa pun. Skor tidak dicatat.

1. Apa beda lingkungan pengembangan, staging, dan produksi, dan apa yang berbeda di konfigurasinya?
2. Di mana kata sandi atau token ditaruh, dan di mana tidak?
3. Apa arti tingkat `DEBUG`, `INFO`, `WARNING`, `ERROR`, dan apa tingkat bawaan `logging`?
4. Apa yang tidak boleh masuk ke log?
5. Mengapa sebelum memperbarui perangkat lunak dibuat cadangan dan ada rencana mundur?

Bila kelimanya benar, Anda boleh melewati "Contoh terselesaikan" dan "Contoh setengah jadi".

## Ingat kembali

1. (`DW-PRO-M10`) Apa beda uji unit dan uji integrasi, dan satu hal yang tidak ditemukan analisis statis?
2. (`DW-PRO-M9`) Apa yang ditaruh di berkas konfigurasi dan apa yang tidak?
3. (`DW-PRO-M13`) Apa yang dicatat dalam catatan asal pemakaian AI, dan mengapa permintaan yang sama tidak menjamin kode yang sama?

Cocokkan: (1) unit memeriksa satu bagian terpisah, integrasi beberapa bagian nyata bersama; statis tidak menemukan logika yang salah; (2) alamat, port, jalur berkas; bukan kata sandi dan kunci; (3) tanggal, alat dan versi, perintah ringkas, hasil; keluaran AI dapat berbeda tiap permintaan dan model berganti versi.

## Tujuan

Setelah modul ini Anda dapat memisahkan konfigurasi lingkungan pengembangan dan produksi, mencatat log aplikasi, memberi pemberitahuan saat aplikasi bermasalah, dan memperbarui perangkat lunak dengan aman.

## Prediksi dulu

Berkas `konfigurasi.toml` di contoh punya bagian `umum`, `pengembangan`, dan `produksi`. Tanpa menjalankan, tulis: (a) apa yang terjadi bila `produksi` dimuat tanpa variabel lingkungan `GUDANG_TOKEN_ALERT`; (b) berapa baris log yang tampil bila tingkat `INFO` dipakai dan program mencatat satu `info`, satu `debug`, dan tiga `error`; (c) apakah alarm dikirim bila ambangnya 3.

## Contoh terselesaikan

Spesifikasi (Anda tulis lebih dulu): konfigurasi dimuat per lingkungan, `umum` ditimpa nilai lingkungan; lingkungan tak dikenal ditolak; di produksi token alarm wajib ada dan hanya berasal dari variabel lingkungan; token tidak pernah masuk log. Log memakai `logging` dengan tingkat dari konfigurasi. Alarm dikirim bila galat di jendela log mencapai ambang. Pembaruan basis data berurutan, tercatat di `PRAGMA user_version`, dan dapat diulang tanpa mengubah apa pun. Pembagian ini mengikuti prinsip umum (*The Twelve-Factor App*, bagian *Config*) bahwa yang berubah antar lingkungan dipisahkan dari kode, dengan uji sederhana: apakah kode dapat dibuka kapan saja tanpa membocorkan kredensial.

Berkas konfigurasi. Alamat pemberitahuan memakai domain contoh `.example`; token tidak ada di berkas:

```text
[umum]
nama_layanan = "gudang-contoh"
batas_badan = 1024

[pengembangan]
host = "127.0.0.1"
port = 8000
tingkat_log = "DEBUG"
db = "gudang-dev.db"
ambang_alarm = 3

[produksi]
host = "127.0.0.1"
port = 8080
tingkat_log = "INFO"
db = "gudang.db"
ambang_alarm = 3
webhook = "https://alert.example/hook"
```

Kode (`operasi.py`). `aman` menyamarkan token sebelum konfigurasi dicatat; `periksa_alarm` menerima fungsi `kirim` sehingga dapat diuji tanpa jaringan; `cadangkan` memakai API cadangan `sqlite3`; `migrasi` menjalankan tiap langkah dalam transaksinya sendiri:

```python
import logging
import os
import sqlite3
import tomllib

LINGKUNGAN = ("pengembangan", "produksi")
MIGRASI = [
    "ALTER TABLE barang ADD COLUMN harga INTEGER NOT NULL DEFAULT 0 CHECK (harga >= 0)",
    "CREATE TABLE mutasi (id INTEGER PRIMARY KEY, kode TEXT NOT NULL REFERENCES barang(kode), jumlah INTEGER NOT NULL)",
]


def muat_konfigurasi(path, lingkungan, env=os.environ):
    if lingkungan not in LINGKUNGAN:
        raise ValueError(f"lingkungan tidak dikenal: {lingkungan}")
    with open(path, "rb") as berkas:
        data = tomllib.load(berkas)
    konfig = {**data["umum"], **data[lingkungan], "lingkungan": lingkungan}
    token = env.get("GUDANG_TOKEN_ALERT")
    if lingkungan == "produksi" and not token:
        raise RuntimeError("GUDANG_TOKEN_ALERT belum diatur")
    konfig["token_alert"] = token
    return konfig


def aman(konfig):
    return {k: ("***" if k == "token_alert" and v else v) for k, v in konfig.items()}


def siapkan_log(tingkat, aliran):
    log = logging.getLogger("gudang")
    log.handlers.clear()
    penangan = logging.StreamHandler(aliran)
    penangan.setFormatter(logging.Formatter("%(levelname)s %(name)s: %(message)s"))
    log.addHandler(penangan)
    log.setLevel(tingkat)
    log.propagate = False
    return log


def periksa_alarm(baris_log, ambang, kirim):
    jumlah = sum(1 for baris in baris_log if baris.startswith("ERROR "))
    if jumlah >= ambang:
        kirim(f"{jumlah} galat pada jendela log")
        return True
    return False


def cadangkan(conn, path_tujuan):
    tujuan = sqlite3.connect(path_tujuan)
    try:
        conn.backup(tujuan)
    finally:
        tujuan.close()


def versi(conn):
    return conn.execute("PRAGMA user_version").fetchone()[0]


def migrasi(conn, log):
    for nomor in range(versi(conn), len(MIGRASI)):
        conn.execute("BEGIN")
        try:
            conn.execute(MIGRASI[nomor])
            conn.execute(f"PRAGMA user_version = {nomor + 1}")
            conn.commit()
        except sqlite3.Error:
            conn.rollback()
            log.error("migrasi %d gagal; dibatalkan", nomor + 1)
            raise
        log.info("migrasi %d selesai", nomor + 1)
    return versi(conn)
```

Pemakaian (`contoh.py`) dengan token palsu, tingkat `INFO` dari konfigurasi produksi:

```python
import io

import operasi

konfig = operasi.muat_konfigurasi(
    "konfigurasi.toml", "produksi", env={"GUDANG_TOKEN_ALERT": "token-palsu-contoh-123"}
)
print(operasi.aman(konfig))

aliran = io.StringIO()
log = operasi.siapkan_log(konfig["tingkat_log"], aliran)
log.info("layanan mulai")
log.debug("detail yang tidak tampil di produksi")
log.error("stok %s tidak cukup", "B02")
log.error("kode tidak ada: %s", "B99")
log.error("isian tidak valid")
baris = aliran.getvalue().splitlines()
print("\n".join(baris))
print(operasi.periksa_alarm(baris, konfig["ambang_alarm"], lambda pesan: print("KIRIM:", pesan)))
```

```text
{'nama_layanan': 'gudang-contoh', 'batas_badan': 1024, 'host': '127.0.0.1', 'port': 8080, 'tingkat_log': 'INFO', 'db': 'gudang.db', 'ambang_alarm': 3, 'webhook': 'https://alert.example/hook', 'lingkungan': 'produksi', 'token_alert': '***'}
INFO gudang: layanan mulai
ERROR gudang: stok B02 tidak cukup
ERROR gudang: kode tidak ada: B99
ERROR gudang: isian tidak valid
KIRIM: 3 galat pada jendela log
True
```

Log di sini dibuat tanpa waktu agar keluarannya tetap; untuk operasi sungguhan tambahkan `%(asctime)s` pada format. Pesan log memuat kode barang, bukan nama atau surel pelanggan, dan tidak pernah kata sandi atau token. Delapan uji (`uji_operasi.py`, `python3 -m unittest uji_operasi`) memeriksa: pengembangan tanpa token, produksi tanpa token gagal cepat, lingkungan tak dikenal, token tidak ada di log, alarm menurut ambang (dengan `unittest.mock.Mock` sebagai `kirim`), migrasi berurutan dan aman diulang, migrasi gagal membatalkan langkah itu (versi tetap 1), dan cadangan dapat dibuka dan dibaca. Hasilnya `Ran 8 tests`, `OK`.

Urutan pembaruan: baca catatan rilis; cadangkan; coba di pengembangan; jalankan uji; terapkan; amati log; bila gagal, pulihkan dari cadangan (rencana mundur ditulis sebelum menerapkan, bukan sesudah gagal). Versi paket dan Python dicatat; pembaruan tidak dilakukan di tengah jam sibuk.

## Contoh setengah jadi

Lengkapi `periksa_alarm`, lalu jalankan `contoh.py`:

```python setengah-jadi
def periksa_alarm(baris_log, ambang, kirim):
    jumlah = sum(1 for baris in baris_log if baris.___("ERROR "))
    if jumlah ___ ambang:
        kirim(f"{jumlah} galat pada jendela log")
        return True
    return False
```

Prediksi dulu: apakah alarm terkirim pada tiga galat bila lubang kedua diisi `>`?

## Latihan

1. **Ubah.** Tambahkan lingkungan `staging` (port 8090, tingkat `INFO`, token wajib). Ubah ujinya lebih dulu.
2. **Buat.** Tulis uji dulu, lalu fungsi `pulihkan(path_cadangan, path_tujuan)` yang menyalin cadangan ke basis data kerja lewat `backup`; uji bahwa data kembali.
3. **Buat.** Tambahkan langkah migrasi ketiga (`CREATE INDEX` pada `mutasi(kode)`) dan uji bahwa pemanggilan dua kali tidak mengubah versi.
4. **Jelaskan.** Mengapa produksi gagal cepat bila token tidak ada, dan apa risikonya bila pesan galat mencetak seluruh konfigurasi?
5. **Berpasangan (opsional).** Tulis bersama rekan "rencana mundur" lima baris untuk satu pembaruan. Peserta mandiri boleh menuliskannya lalu menjalankan pemulihan sekali sebagai latihan.

## Latihan bercampur

1. (`DW-PRO-M9`) Hubungkan layanan API dengan konfigurasi per lingkungan: apa yang dibaca dari berkas, apa dari variabel lingkungan, dan di mana `log_message` yang sengaja dibisukan kini diganti pencatatan?
2. (`DW-PRO-M10`) Tinjau `operasi.py`: tulis dua komentar bertingkat (harus atau saran) dan satu uji integrasi yang menguji migrasi pada berkas basis data nyata.

## Ulang berjarak

Tanpa melihat modul ini, kerjakan ulang dan cocokkan.

| Kapan | Pertanyaan |
| --- | --- |
| Satu minggu lagi | Apa yang tidak boleh masuk log dan di mana token ditaruh? |
| Awal modul ke-4 berikutnya | Sebut urutan pembaruan yang aman dan apa fungsi cadangan serta rencana mundur. |
| Akhir jalur | Tulis dari ingatan fungsi yang memuat konfigurasi per lingkungan dan gagal bila token produksi tidak ada. |

## Kebijakan AI

Mengikuti kebijakan program (silabus 9.1) yang dipraktikkan di `DW-PRO-M13`. Konfigurasi, log, dan token adalah tempat rahasia bocor: jangan menempel berkas `.env`, token, atau log nyata ke asisten AI; pakai contoh sintetis dengan nilai palsu. Periksa keluaran yang mencetak konfigurasi penuh atau menaruh nilai rahasia di kode. Catat alat, versi, dan perintah. Memakai AI tidak diwajibkan.

## Kesalahan umum

- **Menaruh token di berkas konfigurasi yang di-commit.** Kredensial yang pernah di-commit dianggap bocor.
- **Mencatat segalanya.** Log yang memuat data pribadi atau rahasia menjadi kebocoran baru.
- **Mengira tingkat bawaan `logging` mencatat `INFO`.** Tingkat bawaannya `WARNING`; atur tingkatnya.
- **Alarm tanpa ambang.** Pemberitahuan setiap galat membuat orang berhenti membacanya.
- **Memperbarui tanpa cadangan dan rencana mundur.** Bila gagal, tidak ada jalan kembali.

## Cek mandiri

Tutup modul dan jawab:

1. Mengapa token berasal dari variabel lingkungan?
2. Apa yang dicatat di log dan apa yang tidak?
3. Apa yang terjadi pada migrasi kedua bila gagal?

Daftar periksa (kosong; Anda isi sendiri, tidak dikumpulkan):

- [ ] Konfigurasi dipisah per lingkungan dan tanpa rahasia di repositori.
- [ ] Log tidak memuat data pribadi atau token, dan tingkatnya diatur.
- [ ] Alarm punya ambang dan dapat diuji tanpa jaringan.
- [ ] Sebelum pembaruan ada cadangan, uji, dan rencana mundur.

## Kunci dan petunjuk

- **Cek awal:** (1) tempat mengembangkan, mencoba, dan menjalankan untuk pengguna; berbeda alamat, tingkat log, basis data, dan rahasia; (2) di variabel lingkungan atau penyimpanan rahasia, bukan di kode atau repositori; (3) rincian, tanda berjalan, peringatan, fungsi gagal; bawaan `WARNING`; (4) rahasia dan data pribadi; (5) agar ada jalan kembali bila pembaruan gagal.
- **Prediksi:** (a) `RuntimeError: GUDANG_TOKEN_ALERT belum diatur`; (b) empat baris (satu `INFO`, tiga `ERROR`; `debug` tidak tampil); (c) ya, tiga galat mencapai ambang 3.
- **Setengah jadi:** `startswith` dan `>=`. Dengan `>`, tiga galat tidak mengirim alarm.
- **Latihan 4:** gagal cepat mencegah layanan berjalan tanpa pemberitahuan; konfigurasi penuh di galat dapat membocorkan token ke log atau layar.
- **Latihan bercampur 1:** alamat dan port dari berkas, token dari lingkungan, pencatatan lewat `logging` dengan tingkat dari konfigurasi.
- **Cek mandiri 3:** langkah kedua dibatalkan, langkah pertama tetap, versi tetap 1, dan galat tercatat.
- **Petunjuk bila macet:** cetak `operasi.aman(konfig)` dan hasil `versi(conn)`; uji satu fungsi saja.

## Langkah berikutnya

`DW-PRO-M12`: proyek akhir dan persiapan portofolio. Seluruh keterampilan `PRO` dipakai untuk membangun satu aplikasi kecil dengan uji, log, dan petunjuk teknis.

## Catatan untuk pendamping

- **Waktu:** 10 jam, lima sesi dua jam. **Bahan:** Python 3, terminal. Semua blok dijalankan penulis (Python 3.12.3, SQLite 3.45.1): `contoh.py` mencetak keluaran yang tertulis dan delapan uji `unittest` lolos. Dokumentasi `logging` (tingkat bawaan `WARNING`), halaman Config dari *The Twelve-Factor App*, dan dokumentasi API cadangan `sqlite3` dibuka 2026-11-19.
- **Jembatan kuliah:** `I-lengkap` P, `I-awal` W, `U-lengkap` P (dasar `KUL-I-203`, `KUL-I-302`, `KUL-U-201` C3, silabus 6.2).
- **Unit SKKNI yang disentuh (judul saja, tidak menjamin kompetensi):** Melaksanakan Konfigurasi Perangkat Lunak Sesuai Environment (Development, Staging, Production) (`J.620100.042.01`); Melakukan Logging Aplikasi (`J.620100.046.01`); Menerapkan Alert Notification Jika Aplikasi Bermasalah (`J.620100.044.01`); Melakukan Pembaruan Perangkat Lunak (`J.620100.047.01`). Salinan daftar unit belum terverifikasi terhadap berkas resmi.
- **Tanda siap lanjut:** peserta memisahkan konfigurasi dari rahasia dan menjalankan pembaruan dengan cadangan.
