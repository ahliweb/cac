## Untuk siapa modul ini

Mahasiswa semester 7 informatika atau ilmu komputer yang sudah menempuh
`KUL-I-204` (rekayasa perangkat lunak). 4 SKS, jalur I; 14 pertemuan, ujian
tengah sesudah pertemuan 7 dan ujian akhir sesudah pertemuan 14 `[asumsi]`
(silabus 2.3). Ini **kapstone**: mata kuliah ini hampir tidak mengajarkan hal
baru, tetapi menuntutmu memakai hampir seluruh jalur I dalam satu produk yang
dikerjakan tim 4 sampai 5 orang dalam **tiga iterasi**, dengan seorang pemangku
kepentingan (di sini pihak fiktif; prodi dapat memakai mitra nyata dengan
persetujuan tertulis dan tanpa data pribadi).

Modul ini lebih sedikit kode dan lebih banyak kasus, spesifikasi, dan tinjauan.
Contoh kode adalah **alat bantu tim** kecil dalam **Python 3.12 (pustaka
standar)**: perencanaan berentang, gerbang rilis, pemeriksa kebijakan AI, dan
ringkasan bukti. Bahasa itu pilihan penulis `[asumsi]`; produk timmu memakai
bahasa yang disepakati tim. Setiap blok sudah dijalankan dan keluarannya sama
dengan yang tertulis; blok `setengah-jadi` sengaja berlubang. Semua data
**sintetis**, nama fiktif.

**Proyek tim memakai peran tim**, bukan pemrograman berpasangan. Contoh peran:
koordinator, penjamin mutu (uji dan CI), penjaga rilis, penulis dokumentasi;
peran bergilir antar iterasi.

## Peta semester

| Pertemuan | Bagian: pokok bahasan | CPMK | Kuis pembuka (jarak) |
| --- | --- | --- | --- |
| 1 | B1: kapstone dan pemangku kepentingan | C1 | `KUL-U-301`: bukti iterasi; `KUL-I-204`: tinjau kode |
| 2 | B1: perencanaan berentang | C2 | 1; `KUL-I-303`: biaya dan ketidakpastian |
| 3 | B2: iterasi 1, kebutuhan menjadi uji | C1 | 2; `KUL-I-205`: validasi peladen |
| 4 | B2: iterasi 1, tinjau kode | C1 | 3; `KUL-I-304`: kontras teks |
| 5 | B2: iterasi 1, rilis; **tinjauan iterasi 1** | C1, C2 | 4; `KUL-I-305`: lisensi |
| 6 | B2: iterasi 2 | C1 | 5; `KUL-I-301`: paket |
| 7 | B2: iterasi 2, tinjau kode | C1, C2 | 6; `KUL-I-302`: kunci cloud |
| ujian tengah | Wawancara kode, tanpa AI | C1, C2 | |
| 8 | B2: iterasi 2, rilis; **tinjauan iterasi 2** | C1, C2 | 7; `KUL-I-306`: uji keluaran visual |
| 9 | B2: iterasi 3 | C1 | 8; `KUL-I-307`: model dan selang |
| 10 | B2: iterasi 3, tinjau kode | C1 | 9; `KUL-I-204`: log AI |
| 11 | B2: iterasi 3, rilis; **tinjauan iterasi 3** | C1, C2 | 10; `KUL-I-304`: etika uji |
| 12 | B3: kebijakan AI tim dan log | C4 | 11; `KUL-I-204`: agen berbatas |
| 13 | B4: dokumentasi dan demo | C3 | 12; 10 |
| 14 | B4: sidang; **kuis kumulatif akhir** | C3 | 13; 1 sampai 13 |
| ujian akhir | Sidang dengan tanya jawab tentang kode sendiri, tanpa AI | C1 sampai C4 | |

## Ingat kembali

Tiap pertemuan dibuka kuis 5 menit **tanpa catatan**, 3 sampai 5 soal dari asal
pada kolom terakhir peta; jaraknya bertambah, termasuk dari mata kuliah yang
sudah lama berlalu. Tiga belas soal di bawah dipakai berurutan, satu atau dua
per pertemuan (nomor soal sesuai urutan peta; jawabannya di Kunci dan
petunjuk):

1. Sebut tiga bukti iterasi di repositori tim, dan mengapa penilaian rekan bukan
   satu-satunya dasar nilai perorangan. (`KUL-U-301`, pertemuan 1)
2. Sebut empat pertanyaan penelaah dalam tinjau kode dan fungsi skrip `ci`
   sebagai gerbang. (`KUL-I-204`, pertemuan 1)
3. Sebut dua cara mengurangi biaya komputasi dari pemakaian AI di proyek tim,
   dan bagaimana kamu melaporkan perkiraannya dengan ketidakpastian.
   (`KUL-I-303`, pertemuan 2)
4. Mengapa masukan dari klien harus divalidasi lagi di peladen, dan apa beda
   injeksi dan XSS? (`KUL-I-205`, pertemuan 3)
5. Mengapa kontras teks dihitung dan bukan dinilai dengan mata, dan berapa batas
   minimum untuk teks biasa? (`KUL-I-304`, pertemuan 4)
6. Proyek tim berlisensi MIT ingin memakai pustaka GPL-3.0; apa yang kamu
   periksa lebih dulu, dan mengapa kode publik tanpa lisensi bukan bebas pakai?
   (`KUL-I-305`, pertemuan 5)
7. Sebut tiga hal yang kamu periksa sebelum memasang paket yang disarankan
   asisten AI, dan mengapa hash cocok belum berarti paket aman. (`KUL-I-301`,
   pertemuan 6)
8. Mengapa kunci cloud tidak ditempel ke asisten AI, dan apa tiga langkah
   mencegah tagihan membengkak? (`KUL-I-302`, pertemuan 7)
9. Mengapa pembaruan keadaan dipisah dari penggambaran, dan bagaimana keluaran
   visual diuji dengan sidik acuan? (`KUL-I-306`, pertemuan 8)
10. Mengapa berkas model tidak dimuat dengan `pickle` dari sumber tak dikenal,
    dan mengapa satu angka akurasi harus disertai selang dan baseline?
    (`KUL-I-307`, pertemuan 9)
11. Tulis bidang satu baris log pemakaian AI dan jelaskan mengapa kode, bukan
    perintah, yang disimpan dan diuji. (`KUL-I-204`, pertemuan 10)
12. Sebut tiga langkah etika menguji dengan orang, dan jelaskan mengapa satu
    rata-rata SUS dari lima peserta menyesatkan. (`KUL-I-304`, pertemuan 11)
13. Mengapa daftar perintah yang diizinkan bagi agen kode dicocokkan persis,
    bukan dengan awalan? (`KUL-I-204`, pertemuan 12)

Soal 2 dan 11 dasar bagian 2 dan 3; soal 3 dasar bagian 1.

## Tujuan

Pada akhir semester kamu dapat (CPMK, silabus bagian 3.1):

- **C1** mengerjakan produk perangkat lunak dalam tim;
- **C2** mengelola proyek;
- **C3** menyajikan dan mempertanggungjawabkan hasil;
- **C4** menetapkan dan menjalankan kebijakan AI tim.

## Bagian 1: Kapstone dan perencanaan (pertemuan 1 dan 2)

Proyek dimulai dari **masalah pemangku kepentingan**, bukan dari teknologi.
Rumuskan dalam kalimat: siapa pemakainya, apa yang mereka tidak dapat
lakukan sekarang, bagaimana kita tahu masalah itu teratasi (**kriteria
penerimaan** yang dapat diuji, `KUL-I-204`). Tuliskan juga yang **tidak**
dikerjakan. Kasus contoh modul ini: Koperasi Contoh (fiktif) ingin aplikasi
pesanan dan laporan bulanan untuk anggotanya. Perencanaan memecah pekerjaan
menjadi tugas dan memberi perkiraan **berentang** (optimis, paling mungkin,
pesimis), bukan satu angka; menjumlahkan angka "paling mungkin"
cenderung terlalu rendah bila tugas lebih mudah terlambat jauh daripada selesai
jauh lebih cepat (sebaran miring ke pesimis). Rentang dan peluang, sebagaimana biaya komputasi di
`KUL-I-303`, jujur tentang ketidakpastian.

### Prediksi dulu

Tujuh tugas dengan jumlah perkiraan "paling mungkin" 90 jam. Tim punya
kapasitas 108 jam (3 iterasi, 4 anggota, 9 jam per anggota per iterasi). Apakah
aman? Tebak: peluang selesai kira-kira 95%, 80%, atau 60%?

### Contoh terselesaikan

```python
s = 11


def acak():  # pembangkit kongruen linear, nilai di (0, 1): hasil sama di semua mesin
    global s
    s = (1103515245 * s + 12345) % 2**31
    return (s + 0.5) / 2**31


# SINTETIS: tujuh tugas, perkiraan jam (optimis, paling mungkin, pesimis)
TUGAS = {
    "skema basis data": (6, 10, 20),
    "API pesanan": (12, 20, 40),
    "antarmuka katalog": (10, 16, 30),
    "masuk dan peran": (8, 14, 30),
    "laporan bulanan": (6, 12, 24),
    "uji dan CI": (6, 8, 16),
    "dokumentasi dan demo": (6, 10, 14),
}


def segitiga(a, m, b):  # contoh dari sebaran segitiga
    u, c = acak(), (m - a) / (b - a)
    return a + (u * (b - a) * (m - a)) ** 0.5 if u < c else b - ((1 - u) * (b - a) * (b - m)) ** 0.5


total = sorted(sum(segitiga(*t) for t in TUGAS.values()) for _ in range(2000))
print("jumlah 'paling mungkin':", sum(m for _, m, _ in TUGAS.values()), "jam")
print("P50:", round(total[999]), "jam | P90:", round(total[1799]), "jam")
kapasitas = 3 * 4 * 9  # 3 iterasi, 4 anggota, 9 jam per anggota per iterasi
print("kapasitas:", kapasitas, "jam | peluang selesai:", round(sum(t <= kapasitas for t in total) / len(total), 2))
# keluaran:
# jumlah 'paling mungkin': 90 jam
# P50: 105 jam | P90: 119 jam
# kapasitas: 108 jam | peluang selesai: 0.59
```

Jumlah "paling mungkin" 90 jam tampak aman terhadap kapasitas 108, tetapi median
simulasi 105 jam dan peluang selesai hanya sekitar 59%; P90 119 jam melebihi
kapasitas. Karena sebaran tiap tugas miring ke pesimis, jumlahnya bergeser ke
kanan. Keputusan yang masuk akal: kurangi lingkup (tunda "laporan bulanan"
bersama pemangku kepentingan) atau tambah penyangga, dan **tuliskan apa yang
dikorbankan lebih dulu**. Keluaran ini bergantung pada perkiraan yang kamu
isi sendiri: angka yang dikarang tidak memberi kepastian.

### Contoh setengah jadi

```text setengah-jadi
// Masalah: "anggota kesulitan memesan barang koperasi dan laporan dibuat tangan."
// Satu kriteria penerimaan yang dapat diuji: ___
// Satu hal yang TIDAK dikerjakan di iterasi 1: ___
// Tugas (4, 6, 14 jam): bentuk perkiraan jujurnya ditulis ___ , bukan 6 jam
```

### Latihan

1. **Ubah:** ganti tiap tugas dengan rentang yang lebih sempit (pesimis hanya
   1,2 kali paling mungkin); prediksi peluang selesai, lalu jalankan.
2. **Buat:** tabel tugas untuk proyek timmu dengan tiga angka per tugas dan
   alasan satu kalimat untuk angka pesimisnya.
3. **Jelaskan:** mengapa tim sebaiknya menyepakati urutan yang dikorbankan
   lebih dulu sebelum iterasi dimulai?
4. **Tim (praktikum):** wawancarai satu pemangku kepentingan (rekan peran);
   tulis tiga kriteria penerimaan yang dapat diuji dan satu hal di luar lingkup.

## Bagian 2: Tiga iterasi kerja tim (pertemuan 3 sampai 11)

Tiap iterasi 3 pertemuan: **awal** (rencana iterasi dan tugas), **tengah**
(kerja dan tinjau kode), **akhir** (rilis dan tinjauan iterasi). Pekerjaan
memakai **cabang**; tiap perubahan masuk lewat permintaan penggabungan yang
**ditinjau manusia lain** dan lulus **CI** (`KUL-I-204`). Pertanyaan penelaah
tetap: benar, teruji, terbaca, aman. Aman mencakup apa yang kamu pelajari
sepanjang jalur I: masukan klien divalidasi lagi di peladen (`KUL-I-205`),
rahasia tak masuk repositori (`KUL-I-301`, `KUL-I-302`), paket diperiksa
sebelum dipasang (`KUL-I-301`), lisensi dipatuhi (`KUL-I-305`), kontras dan
aksesibilitas diperiksa (`KUL-I-304`). **Rilis** diberi nomor menurut **SemVer**: perubahan yang merusak pemakai
menaikkan MAJOR, fitur baru MINOR, perbaikan PATCH; catatan perubahan
mengikuti *Keep a Changelog*. Tiga iterasi memberi **bukti iterasi**: rilis
bertanda, permintaan penggabungan yang ditinjau, isu yang ditutup.

### Prediksi dulu

Versi sekarang 1.4.2. Perubahan di iterasi ini: satu perbaikan saja; lalu
perbaikan dan fitur; lalu satu perubahan yang merusak. Apa nomor berikutnya?
Dan bila catatan perubahan belum memuat nomor itu, apakah rilis boleh?

### Contoh terselesaikan

```python
import re


def naik(versi, perubahan):
    """Versi berikutnya menurut SemVer: rusak -> MAJOR, fitur -> MINOR, perbaikan -> PATCH."""
    ma, mi, pa = map(int, versi.split("."))
    if "rusak" in perubahan:
        return f"{ma + 1}.0.0"
    if "fitur" in perubahan:
        return f"{ma}.{mi + 1}.0"
    if "perbaikan" in perubahan:
        return f"{ma}.{mi}.{pa + 1}"
    return versi


CHANGELOG = """\
# Catatan perubahan
## [1.5.0] - 2026-11-20
### Ditambah
- laporan bulanan
## [1.4.2] - 2026-11-06
### Diperbaiki
- pembulatan harga
"""


def gerbang(versi_lama, perubahan, changelog):
    baru = naik(versi_lama, perubahan)
    if baru == versi_lama:
        return "tidak ada rilis"
    if not re.search(rf"^## \[{re.escape(baru)}\]", changelog, re.M):
        return f"GAGAL: CHANGELOG belum memuat {baru}"
    return f"boleh dirilis {baru}"


for perubahan in (["perbaikan"], ["perbaikan", "fitur"], ["rusak", "fitur"], []):
    print(f"{str(perubahan):22} -> {gerbang('1.4.2', perubahan, CHANGELOG)}")
# keluaran:
# ['perbaikan']          -> GAGAL: CHANGELOG belum memuat 1.4.3
# ['perbaikan', 'fitur'] -> boleh dirilis 1.5.0
# ['rusak', 'fitur']     -> GAGAL: CHANGELOG belum memuat 2.0.0
# []                     -> tidak ada rilis
```

Perubahan terbesar menentukan nomor: perbaikan menjadi `1.4.3`, perbaikan dan
fitur `1.5.0` (PATCH ikut direset menjadi 0), yang merusak `2.0.0`. Rilis
`1.4.3` dan `2.0.0` gagal karena catatan perubahan belum memuatnya; hanya
`1.5.0` lolos. Gerbang ini memeriksa **bentuk**, bukan isi: ia tak tahu apakah
perubahan itu sungguh merusak. Keputusan "rusak atau tidak" tetap dibuat
manusia saat tinjau.

### Contoh setengah jadi

Satu komentar penelaah yang baik menunjuk baris dan menyebut alasan. Lengkapi
tinjauan atas potongan berikut (data sintetis):

```python setengah-jadi
def total_pesanan(baris):
    jumlah = 0
    for jml, harga in baris:
        jumlah += jml * harga
    return jumlah / len(baris)   # komentar penelaah: ___
```

```text setengah-jadi
// Empat pertanyaan penelaah: benar? ___ ; teruji? ___ ; terbaca? ___ ; aman? ___
// Perubahan: tombol berubah nama dan API lama dihapus. Versi 2.3.1 menjadi ___
```

### Latihan

1. **Ubah:** tambahkan jenis perubahan `"dokumen"` yang tidak menaikkan versi;
   prediksi keluaran keempat kasus, lalu jalankan.
2. **Buat:** gerbang tambahan yang menolak rilis bila tanggal catatan terbaru
   lebih lama daripada rilis sebelumnya.
3. **Jelaskan:** mengapa gerbang otomatis tidak menggantikan tinjau kode oleh
   manusia, dan apa yang tidak dapat ia periksa?
4. **Tim:** tiap iterasi, tulis tinjauan satu halaman: yang selesai, yang
   tertunda dan alasannya, satu perubahan proses (selaras Scrum: iterasi
   diakhiri tinjauan dan retrospektif).

## Bagian 3: Kebijakan AI tim dan log pemakaian (pertemuan 12)

Mata kuliah ini **Hijau** (silabus 6.3): AI boleh dipakai pada proyek,
eksplorasi, dan dokumentasi; pengungkapan ringkas dan **log wajib**. Pada
tingkat tim, kamu **menetapkan kebijakan tertulis**: kapan AI boleh dipakai,
apa yang tak pernah dimasukkan ke layanan AI (data pribadi, kata sandi,
kunci, kode berlisensi tertutup), siapa meninjau, dan konsekuensi
pelanggaran. Aturan inti silabus: **tinjauan manusia wajib atas setiap kode
yang digabung**, baik ditulis tangan maupun dibangkitkan AI. Sebagian aturan dapat dijadikan **pemeriksaan otomatis** (kebijakan sebagai
kode), tetapi itu penyaring kasar: ia tak dapat memastikan penelaah
benar-benar membaca. Kebijakan juga memuat biaya: pilih alat sesuai kebutuhan
dan jalankan uji sebelum meminta pembangkitan ulang.

### Prediksi dulu

Enam permintaan penggabungan (PR) fiktif berikut. Mana yang dapat digabung
menurut kebijakan: 41 (penulis A, penelaah B, CI lulus); 42 (penulis A,
tanpa penelaah, AI dipakai); 43 (penulis B, penelaahnya B sendiri); 44 (CI
gagal, AI dipakai, log ada); 45 (AI dipakai, log memuat `token: abc123`);
46 (satu-satunya penelaah adalah `ci-bot`)?

### Contoh terselesaikan

```python
import re

KEBIJAKAN = {"penelaah_min": 1, "bot": {"ci-bot"}, "ci_harus": "lulus"}
RAHASIA = re.compile(r"(kata sandi|password|token|secret|api[_-]?key)\s*[:=]\s*\S+", re.I)
BIDANG_LOG = ["tanggal", "alat", "versi", "tujuan", "perintah", "dipakai"]

# SINTETIS: nama dan data fiktif
PR = [
    {"id": 41, "penulis": "Anggota-A", "penelaah": ["Anggota-B"], "ci": "lulus", "ai": False},
    {"id": 42, "penulis": "Anggota-A", "penelaah": [], "ci": "lulus", "ai": True},
    {"id": 43, "penulis": "Anggota-B", "penelaah": ["Anggota-B"], "ci": "lulus", "ai": False},
    {"id": 44, "penulis": "Anggota-C", "penelaah": ["Anggota-A"], "ci": "gagal", "ai": True},
    {"id": 45, "penulis": "Anggota-C", "penelaah": ["Anggota-A"], "ci": "lulus", "ai": True},
    {"id": 46, "penulis": "Anggota-D", "penelaah": ["ci-bot"], "ci": "lulus", "ai": False},
]
LOG = [
    {"pr": 44, "tanggal": "2026-11-12", "alat": "asisten-x", "versi": "2.1", "tujuan": "uji",
     "perintah": "buat uji untuk fungsi diskon", "dipakai": "tiga uji, satu diubah"},
    {"pr": 45, "tanggal": "2026-11-13", "alat": "asisten-x", "versi": "2.1", "tujuan": "perbaikan",
     "perintah": "perbaiki kode ini, token: abc123", "dipakai": ""},
]


def periksa(pr, log):
    masalah = []
    manusia = [p for p in pr["penelaah"] if p not in KEBIJAKAN["bot"] and p != pr["penulis"]]
    if len(manusia) < KEBIJAKAN["penelaah_min"]:
        masalah.append("tanpa penelaah manusia selain penulis")
    if pr["ci"] != KEBIJAKAN["ci_harus"]:
        masalah.append("CI tidak lulus")
    if pr["ai"]:
        catatan = [c for c in log if c["pr"] == pr["id"]]
        if not catatan:
            masalah.append("memakai AI tetapi tanpa log")
        for c in catatan:
            kosong = [b for b in BIDANG_LOG if not c.get(b, "").strip()]
            if kosong:
                masalah.append(f"log: bidang kosong {kosong}")
            if any(RAHASIA.search(str(v)) for v in c.values()):
                masalah.append("log: diduga memuat rahasia")
    return masalah


for pr in PR:
    m = periksa(pr, LOG)
    print(f"PR {pr['id']}:", "boleh digabung" if not m else "; ".join(m))
# keluaran:
# PR 41: boleh digabung
# PR 42: tanpa penelaah manusia selain penulis; memakai AI tetapi tanpa log
# PR 43: tanpa penelaah manusia selain penulis
# PR 44: CI tidak lulus
# PR 45: log: bidang kosong ['dipakai']; log: diduga memuat rahasia
# PR 46: tanpa penelaah manusia selain penulis
```

Hanya PR 41 lolos. PR 42 tanpa penelaah dan tanpa log. PR 43 "ditinjau" oleh
penulisnya sendiri: tidak dihitung. PR 44 memiliki log tetapi CI gagal. PR 45
melanggar dua aturan log. PR 46 hanya ditinjau bot, dan bot tidak memenuhi
**tinjauan manusia wajib**. Enam bidang log sama dengan yang kamu pakai di
`KUL-I-204`: tanggal, alat, versi, tujuan, perintah, dan bagian keluaran yang
dipakai. Yang disimpan dan diuji adalah **kode**; perintah hanya dicatat
untuk penelusuran, sebab perintah yang sama dapat memberi keluaran berbeda.
Pemeriksa tak tahu apakah `Anggota-B` sungguh membaca kode PR 41: itu soal
budaya tim dan wawancara kode.

### Contoh setengah jadi

```text setengah-jadi
// Kebijakan AI tim koperasi (isi): AI boleh untuk ___ ; tidak boleh untuk ___
// Yang TIDAK pernah dimasukkan ke layanan AI: ___ ; ___ ; ___
// Penelaah wajib: ___ , bukan penulis dan bukan ___
// Bila PR memakai AI tanpa log: ___
```

### Latihan

1. **Ubah:** naikkan `penelaah_min` menjadi 2; prediksi PR mana yang berubah
   status, lalu jalankan.
2. **Buat:** aturan baru: PR yang mengubah berkas `.env` atau `*.pem` otomatis
   ditolak; tulis dan uji pada tiga PR contoh.
3. **Jelaskan:** apa yang tidak dapat diperiksa skrip ini, dan bagaimana tim
   menutup celah itu?
4. **Tim:** tulis kebijakan AI tim satu halaman dan tandatangani bersama
   (catatan di repositori); tinjau dengan tim lain.

## Bagian 4: Dokumentasi, demo, dan sidang (pertemuan 13 dan 14)

Hasil proyek harus dapat **dipertanggungjawabkan**. **Dokumentasi** minimal:
untuk siapa produk ini, cara memasang dan menjalankan (perintah yang benar-benar
sudah dijalankan), rancangan singkat, batasan, lisensi, dan kebijakan AI tim. **Demo** menunjukkan produk
menyelesaikan kriteria penerimaan yang disepakati, dengan data sintetis;
bila gagal pada demo, itu informasi yang jujur. **Sidang** memeriksa
**pemahaman perorangan**: setiap anggota menjawab pertanyaan tentang kode
yang ia tulis atau tinjau, tanpa AI. Penilaian rekan membantu tetapi bukan
satu-satunya dasar nilai perorangan; ia dapat bias oleh kedekatan, dan jumlah
commit bukan ukuran sumbangan. Nilai perorangan menimbang riwayat repositori,
wawancara kode, dan penilaian rekan bersama.

### Prediksi dulu

Ringkasan bukti dari 16 catatan fiktif di tiga iterasi: apakah ketiga iterasi
punya bukti lengkap (PR ditinjau, isu ditutup, rilis)? Dan apakah Anggota-A,
dengan catatan terbanyak, otomatis berhak nilai tertinggi?

### Contoh terselesaikan

```python
from collections import Counter, defaultdict

# SINTETIS: (iterasi, anggota, jenis bukti di repositori tim)
RIWAYAT = [
    (1, "A", "pr_ditinjau"), (1, "B", "pr_ditinjau"), (1, "A", "isu_ditutup"), (1, "C", "isu_ditutup"),
    (1, "B", "rilis"), (1, "D", "pr_ditinjau"),
    (2, "A", "pr_ditinjau"), (2, "C", "pr_ditinjau"), (2, "B", "isu_ditutup"), (2, "D", "isu_ditutup"),
    (2, "A", "rilis"),
    (3, "B", "pr_ditinjau"), (3, "D", "pr_ditinjau"), (3, "A", "pr_ditinjau"), (3, "A", "pr_ditinjau"),
    (3, "C", "isu_ditutup"),
]
WAJIB = {"pr_ditinjau", "isu_ditutup", "rilis"}

per_iterasi = defaultdict(set)
per_anggota = Counter()
for it, anggota, jenis in RIWAYAT:
    per_iterasi[it].add(jenis)
    per_anggota[anggota] += 1

for it in sorted(per_iterasi):
    kurang = WAJIB - per_iterasi[it]
    print(f"iterasi {it}:", "bukti lengkap" if not kurang else f"KURANG {sorted(kurang)}")
print("jumlah per anggota:", dict(sorted(per_anggota.items())))
print("catatan: jumlah bukan nilai; nilai perorangan butuh wawancara kode dan penilaian rekan")
# keluaran:
# iterasi 1: bukti lengkap
# iterasi 2: bukti lengkap
# iterasi 3: KURANG ['rilis']
# jumlah per anggota: {'A': 6, 'B': 4, 'C': 3, 'D': 3}
# catatan: jumlah bukan nilai; nilai perorangan butuh wawancara kode dan penilaian rekan
```

Iterasi 3 tanpa rilis: tim harus menjelaskan sebabnya pada sidang (tertunda?
sengaja ditahan?). Anggota A punya enam catatan, D tiga; angka itu tidak
memberi tahu kualitas, tingkat kesulitan, atau pekerjaan yang tak tercatat
(menolong rekan, merancang, menguji). Dua anggota dengan jumlah sama dapat
berbeda pemahaman: itulah gunanya wawancara kode tanpa AI.

### Contoh setengah jadi

```text setengah-jadi
// Tiga bagian README yang wajib: ___ ; ___ ; ___
// Pertanyaan sidang untuk satu anggota tentang kode yang ia tinjau: ___
// Tiga bukti iterasi di repositori tim: ___ ; ___ ; ___
```

### Latihan

1. **Ubah:** tambahkan jenis bukti `uji_ditambah` ke `WAJIB`; prediksi iterasi
   mana yang kekurangan, lalu jalankan.
2. **Buat:** README satu halaman untuk produk timmu; minta tim lain
   menjalankan perintah di dalamnya dan mencatat langkah yang gagal.
3. **Jelaskan:** mengapa jumlah commit bukan ukuran nilai perorangan?
4. **Tim:** latihan sidang: tiap anggota menjelaskan satu fungsi yang ditulis
   rekannya dan satu keputusan rancangan, tanpa catatan.

## Latihan bercampur

Soal berikut **tidak menyebut** topiknya. Contoh: "Rilis 1.4.3 ditolak padahal
perubahannya kecil"; "Semua uji lulus tetapi pelanggan masih mengeluh"; "Satu
anggota menulis banyak kode, rekannya yang menjelaskan di sidang". Kuis
kumulatif (pertemuan 5, 8, 11, 14) berbentuk sama.

## Ulang berjarak

Kerjakan ulang tanpa melihat solusi lama:

- satu minggu setelah bagian: tulis ulang aturan SemVer, bidang log AI, dan
  empat pertanyaan penelaah dari ingatan;
- awal bagian baru: dua soal dari bagian sebelumnya;
- setelah semester, jawab tanpa catatan (dipakai di tempat kerja atau
  portofolio, termasuk jembatan ke dewasa-coding yang memakai portofolio proyek
  sebagai bukti masuk): mengapa tinjauan manusia wajib atas kode yang digabung
  walaupun CI lulus; mengapa perencanaan berentang lebih jujur daripada satu
  angka.

## Kebijakan AI dan log pemakaian

Mata kuliah ini **Hijau** (silabus bagian 6.3): AI boleh dipakai pada proyek,
eksplorasi, dan dokumentasi dengan pengungkapan ringkas dan **log wajib**: alat
dan versi, tujuan, perintah, dan bagian keluaran yang dipakai. Log disimpan di
repositori tim, bukan di repositori mata kuliah ini. **Tinjauan manusia wajib**
atas kode yang digabung. Kamu harus siap **wawancara kode**: menjelaskan dan
mengubah bagian kodemu. **Ujian praktik, wawancara tengah, dan sidang berlaku
Merah**: tanpa AI. Gerbang kesiapan sudah dilatih sejak `KUL-I-101`: kamu dapat
(1) menelusuri program pendek, (2) menulis satu uji yang gagal bila kode salah,
(3) menjelaskan kode dengan kata sendiri. **Jangan memasukkan data pribadi,
kata sandi, atau kunci ke asisten AI**; data pemangku kepentingan nyata
(bila ada) tidak boleh masuk layanan AI dan tidak boleh masuk repositori.
Status hukum hak cipta keluaran AI masih berkembang dan berbeda antar negara:
ungkapkan pemakaianmu, baca lisensi paket dan kode, dan jangan menempel kode
berlisensi yang tidak kamu pahami. Energi per perintah kecil tetapi bervariasi
puluhan kali lipat antar model, dan tidak ada angka terverifikasi per tugas
pemrograman: jangan membangkitkan ulang tanpa menjalankan uji. Dosen menetapkan
tingkat per tugas.

**Butir khas: kebijakan tim.** Kamu tidak hanya mengikuti kebijakan AI; tim
menulis dan menjalankannya (bagian 3). Pelanggaran dicatat dan dibahas, bukan
disembunyikan: tim yang melapor sendiri lebih terlindungi daripada yang
ketahuan.

## Kesalahan umum

- **Mengandalkan angka "paling mungkin" tunggal** dalam perencanaan.
- **Menggabungkan PR tanpa tinjauan manusia**, atau "ditinjau" oleh penulis
  atau bot saja.
- **Rilis tanpa nomor yang konsisten dan catatan perubahan.**
- **Menganggap CI hijau berarti produk benar** padahal kasus batas belum ada.
- **Log AI yang kosong atau memuat rahasia**, atau menyimpan perintah tanpa
  menguji kodenya.
- **Menilai kontribusi dari jumlah commit** atau hanya dari penilaian rekan.
- **Memasukkan data pemangku kepentingan nyata ke layanan AI atau repositori.**

## Cek mandiri

Tutup modul, jawab, baru periksa.

1. Mengapa jumlah perkiraan "paling mungkin" menyesatkan, dan apa gantinya?
2. Berapa nomor versi berikutnya dari 3.2.5 untuk satu fitur baru, dan untuk
   satu perubahan yang merusak?
3. Mengapa "ditinjau oleh ci-bot" tidak memenuhi tinjauan manusia wajib?
4. Apa isi enam bidang log AI?
5. Mengapa sidang tidak boleh memakai AI dan mengapa jumlah commit tak cukup?
6. Apa yang dikorbankan lebih dulu bila peluang selesai rendah?

Daftar periksa (kosong; kamu isi sendiri, tidak dikumpulkan):

- [ ] Aku dapat memecah pekerjaan dan melaporkan perkiraan berentang.
- [ ] Aku dapat menjalankan tinjau kode, CI, dan rilis dengan nomor versi benar.
- [ ] Aku dapat menulis kebijakan AI tim dan mengisi log pemakaian.
- [ ] Aku dapat menjelaskan dan mengubah kodeku tanpa AI.

## Kunci dan petunjuk

- **Ingat kembali (urut soal):** (1) rilis bertanda, PR yang ditinjau, isu
  yang ditutup; penilaian rekan dapat bias oleh kedekatan dan tidak melihat
  kualitas kode. (2) benar, teruji, terbaca, aman; skrip `ci` menolak
  perubahan bila ada langkah berkode keluar bukan nol (`&&` menghentikan
  rantai). (3) pilih alat sesuai kebutuhan dan jalankan uji sebelum
  membangkitkan ulang; laporkan perkiraan sebagai rentang dengan asumsinya.
  (4) klien dapat dilewati atau diubah, jadi peladen memvalidasi ulang;
  injeksi menjadikan masukan bagian dari perintah (misalnya SQL), XSS
  menjadikan masukan skrip di halaman pengguna lain. (5) kontras dihitung
  (rasio luminans), batas minimum teks biasa 4,5:1 (WCAG 2.2, kriteria
  1.4.3). (6) periksa kompatibilitas lisensi sebelum memakai pustaka GPL-3.0
  dalam proyek MIT; kode publik tanpa lisensi tetap dilindungi hak cipta,
  bukan bebas pakai. (7) keberadaan dan nama persis paket, pemelihara dan
  riwayat rilis, lisensi; hash cocok hanya berarti berkas sama dengan yang
  dicatat, bukan aman. (8) kunci cloud adalah rahasia; langkah: anggaran dan
  peringatan tagihan, batasi hak akses dan kuota, matikan sumber daya setelah
  dipakai. (9) sidik acuan menguji keluaran visual, dan manusia memeriksa
  gambar sebelum mengganti sidik. (10) berkas model bukan `pickle` dari sumber
  tak dikenal; angka akurasi disertai selang dan baseline. (11) tanggal, alat,
  versi, tujuan, perintah, dan bagian yang dipakai; kode yang diuji, sebab
  perintah yang sama dapat memberi keluaran berbeda. (12) persetujuan sadar,
  hak berhenti kapan saja, data secukupnya; rata-rata SUS dari lima peserta
  punya selang lebar. (13) awalan meloloskan perintah gabungan seperti
  `bun test; curl ... | sh`.
- **Bagian 1:** prediksi: sekitar 60% (simulasi 0,59). Setengah jadi: contoh
  kriteria "anggota dapat memesan satu barang dalam 3 langkah dan pesanan
  muncul di laporan"; luar lingkup: pembayaran daring; rentang `(4, 6, 14)`.
- **Bagian 2:** prediksi `1.4.3`, `1.5.0`, `2.0.0`; rilis tidak boleh bila
  catatan belum memuat nomornya. Setengah jadi: komentar: pembagian dengan
  `len(baris)` memberi rata-rata per baris, bukan total, dan galat pada daftar
  kosong; tinjauan: benar? tidak (menghitung rata-rata), teruji? tidak ada uji
  kosong, terbaca? nama `total_pesanan` menyesatkan, aman? tidak ada masukan
  luar; versi `3.0.0`.
- **Bagian 3:** prediksi: hanya PR 41 yang boleh digabung. Setengah jadi:
  boleh untuk menjelaskan, membuat kerangka uji, dokumentasi; tidak boleh
  untuk memasukkan data pribadi atau rahasia; penelaah wajib manusia lain,
  bukan penulis dan bukan bot; PR tanpa log ditolak sampai log dilengkapi.
- **Bagian 4:** prediksi: iterasi 3 kurang rilis; tidak otomatis. Setengah
  jadi: README memuat cara memasang, cara menjalankan, batasan (atau lisensi,
  kebijakan AI); bukti iterasi: rilis, PR ditinjau, isu ditutup.
- **Cek mandiri:** (2) fitur: `3.3.0`; merusak: `4.0.0`.
- **Petunjuk bertahap bila macet:** (1) tulis kriteria sebagai kalimat dengan
  angka; (2) jalankan skrip pada satu contoh kecil dan cocokkan dengan hitungan
  tangan; (3) tanya: "apa bukti yang bisa ditunjukkan saat sidang?"

## Langkah berikutnya

Kapstone ini menutup jalur I. Portofolio proyek (repositori tim, README,
tinjauan iterasi) dapat menjadi bukti pada jembatan ke dunia kerja atau ke
program dewasa-coding (silabus bagian 5).

## Catatan untuk dosen

Bobot dan bentuk asesmen berikut **usulan**; prodi menetapkan (silabus 6.1,
6.2): proyek tim dengan tiga iterasi, demo, dokumentasi, wawancara kode
tengah semester dan sidang akhir tanpa AI, log pemakaian AI, tinjauan iterasi
dan penilaian rekan sebagai satu masukan di antara beberapa, **bukan satu-
satunya dasar nilai perorangan**. Variasi tugas per tim: domain, pemangku
kepentingan fiktif atau mitra nyata dengan persetujuan tertulis. Jangan
membebankan data nyata ke repositori publik. Pemeriksa kebijakan dan gerbang
rilis di modul adalah alat bantu pengajaran; ia menyaring bentuk, bukan
isi. Bahasa Python untuk alat bantu adalah pilihan penulis `[asumsi]`;
produk tim bebas. Rencana berentang memakai sebaran segitiga sebagai
penyederhanaan, bukan model estimasi baku. Penilaian rekan dan riwayat commit
punya batas; kombinasikan dengan wawancara kode.
