## Untuk siapa modul ini

Modul ini untuk murid kelas XI jalur D (kecerdasan buatan dan analisis data), untuk minggu `D-XI1-M5` silabus v1.3: sumber data terbuka dan legal. Prasyarat: modul `d-xi1-m4`. Alat: peramban untuk membaca halaman dataset dan lisensinya, serta Python 3 untuk satu skrip kecil. Tanpa akun.

Modul ini berstatus DRAF: karangan penyusun, belum ditinjau pemilik. Jalur D adalah pengayaan di luar rumusan capaian pembelajaran (CP). Minggu ini beririsan dengan butir `F-AD-a` (data terbuka dan legal, prediksi) pada tingkat sedang; irisan itu **tidak dihitung** sebagai pemenuhan CP. Modul ini ringkasan belajar, **bukan nasihat hukum**.

Aturan jalur D yang berlaku: data hanya sintetis (karangan) atau terbuka dengan lisensi jelas, tanpa data yang bisa mengenali orang; wajah, suara, dan foto orang tidak dipakai sebagai data; AI generatif boleh dipakai dengan etika dan dicatat, tanpa data pribadi, kata sandi, atau tugas bernilai pada permintaanmu, dan kamu tidak wajib punya akun. Saran: jawab dulu sendiri, baru minta AI memberi petunjuk bertahap; ringkasan lisensi dari AI bisa keliru, jadi baca teks lisensinya sendiri. Setiap soal `Latihan` bertanda `AI: boleh` atau `AI: tanpa AI`.

Catatan untuk guru: halaman dataset Iris di UCI Machine Learning Repository dibuka penyusun pada 2026-11-19; halaman itu menyebut lisensi CC BY 4.0, mengutip sitasi yang dianjurkan, dan mencatat dua baris yang berbeda dari artikel aslinya. Keterangan lisensi tiap dataset di Portal Satu Data Indonesia **tidak diperiksa penyusun** `[belum terverifikasi]`: murid membacanya sendiri pada dataset yang dipilih. Skrip Python dijalankan penyusun dengan `python3 -I` (Python 3.12.3); semua nama, tautan `.example`, dan kasus pada tabel karangan.

## Ingat kembali

Jawab dari ingatan, baru cek di bagian kunci.

1. Mengapa `csv.DictReader` mengembalikan semua nilai sebagai teks, dan apa akibatnya pada hitungan? (dari `d-xi1-m4`)
2. Apa beda perulangan `for` dan `while`, dan mengapa `while` bisa tidak berhenti? (dari `d-xi1-m2`)
3. Bagaimana memeriksa lisensi sebuah dataset sebelum memakainya? (dari `d-x2-m12`)

## Tujuan

Setelah modul ini kamu dapat:

- menilai sebuah sumber data dari pencipta, lisensi, dokumentasi, dan data pribadi di dalamnya;
- membaca ringkasan lisensi (CC0, CC BY, CC BY-SA, CC BY-NC) dan memutuskan boleh atau tidaknya dipakai untuk rencana proyekmu;
- menulis catatan sumber: judul, pencipta, sumber, lisensi, tanggal akses, dan perubahan;
- menolak dataset yang lisensinya tidak jelas.

Keluaran yang diminta silabus: catatan sumber.

## Prediksi dulu

Tiga dataset fiktif ditawarkan untuk proyek kelompok yang kelak dipajang di situs sekolah fiktif (bukan jualan). Putuskan **pakai** atau **tidak**, dan tulis alasannya sebelum membaca contoh.

| Dataset | Pencipta | Lisensi di halaman sumber | Isi |
| --- | --- | --- | --- |
| Curah Hujan Contoh | Kelompok Contoh | CC BY 4.0 | curah hujan harian per stasiun |
| Survei Kepuasan Contoh | Lembaga Contoh | CC BY-NC 4.0 | jawaban survei, tanpa nama |
| Nilai Ujian Contoh | tidak disebut | tidak ada keterangan | nama dan nomor induk murid beserta nilai |

## Contoh terselesaikan

**Daftar pemeriksaan sumber.** Sebelum memakai data, jawab:

| Pertanyaan | Mengapa |
| --- | --- |
| Siapa penciptanya dan apakah halaman sumbernya resmi? | Keterpercayaan dan hak untuk menyebut nama pencipta |
| Apa lisensinya, dan apa yang diizinkan? | Tanpa lisensi jelas, pakai tidak aman |
| Adakah dokumentasi: arti kolom, cara pengumpulan, catatan kesalahan? | Data tanpa dokumentasi sulit dinilai |
| Adakah data pribadi? | Meski lisensinya bebas, hak pribadi tetap berlaku (`d-x2-m3`) |
| Kapan dibuka dan apakah versinya berubah? | Halaman dan data dapat berubah |

**Membaca lisensi.** Ringkasan dari halaman deed Creative Commons (bukan teks hukum): CC0 melepaskan hak sebisa mungkin; CC BY mengizinkan membagikan, mengubah, dan memakai komersial asal menyebut pencipta; CC BY-SA sama tetapi hasil turunan harus dibagikan dengan lisensi serupa; CC BY-NC melarang pemakaian komersial. Menurut Open Definition, data disebut terbuka bila ada lisensi terbuka atau berstatus domain publik; data yang dapat diunduh bebas belum tentu terbuka.

**Contoh nyata (per 2026-11).** Halaman dataset *Iris* di UCI Machine Learning Repository menyebut: lisensi CC BY 4.0; pencipta Fisher, R. (1936); sitasi yang dianjurkan "Fisher, R. (1936). Iris [Dataset]. UCI Machine Learning Repository. https://doi.org/10.24432/C56C76."; dan, di bagian dokumentasi, bahwa data berbeda dari artikel aslinya pada baris ke-35 dan ke-38. Isinya ukuran bunga, jadi tidak ada data pribadi. Catatan sumber yang layak:

```text
"Iris" oleh Fisher, R. (1936), dari https://archive.ics.uci.edu/dataset/53/iris,
lisensi CC BY 4.0 (https://creativecommons.org/licenses/by/4.0/).
Diakses: 2026-11-19. Diubah: tidak.
Catatan keterpercayaan: dokumentasi menyebut dua baris berbeda dari artikel asli.
```

**Memeriksa catatan dengan program.** Catatan bisa disimpan sebagai kamus dan diperiksa dengan fungsi. Ini hanya membantu mengingat; program tidak menggantikan membaca lisensi.

```python
WAJIB = ["judul", "pencipta", "sumber", "lisensi", "tanggal_akses"]
KOMERSIAL = {"CC0-1.0": True, "CC-BY-4.0": True, "CC-BY-SA-4.0": True, "CC-BY-NC-4.0": False}


def periksa(catatan):
    masalah = []
    for kolom in WAJIB:
        if not catatan.get(kolom):
            masalah.append("kosong: " + kolom)
    if catatan.get("lisensi") not in KOMERSIAL:
        masalah.append("lisensi belum jelas: baca dan putuskan dulu")
    if not str(catatan.get("sumber", "")).startswith("https://"):
        masalah.append("sumber bukan alamat https")
    return masalah


iris = {
    "judul": "Iris",
    "pencipta": "Fisher, R.",
    "sumber": "https://archive.ics.uci.edu/dataset/53/iris",
    "lisensi": "CC-BY-4.0",
    "tanggal_akses": "2026-11-19",
}
print(periksa(iris))

belum_jelas = {"judul": "Data Contoh", "sumber": "http://situs.example/data", "lisensi": "?"}
print(periksa(belum_jelas))
```

```text
[]
['kosong: pencipta', 'kosong: tanggal_akses', 'lisensi belum jelas: baca dan putuskan dulu', 'sumber bukan alamat https']
```

Daftar kosong berarti tidak ada kekurangan yang dikenal program, bukan bahwa lisensi sudah dibaca. Pada contoh kedua ada empat masalah; dataset itu tidak dipakai sampai semuanya dijawab.

**Menjawab prediksi.** Curah Hujan Contoh: pakai, dengan atribusi (CC BY mengizinkan, termasuk bila kelak komersial). Survei Kepuasan Contoh: dapat dipakai untuk proyek belajar nonkomersial, tetapi tidak untuk proyek berbayar; catat batasnya. Nilai Ujian Contoh: **tidak dipakai**, karena lisensi tidak jelas dan berisi nama dan nomor induk, yaitu data pribadi.

## Contoh setengah jadi

Lengkapi fungsi yang menjawab apakah dataset boleh dipakai untuk proyek berbayar: `True` atau `False` bila lisensi dikenal, dan `"tidak jelas"` bila tidak.

```python setengah-jadi
KOMERSIAL = {"CC0-1.0": True, "CC-BY-4.0": True, "CC-BY-SA-4.0": True, "CC-BY-NC-4.0": False}


def boleh_untuk_proyek_berbayar(catatan):
    lisensi = catatan.get("lisensi")
    if lisensi not in ____:
        return ____
    return KOMERSIAL[____]


print(boleh_untuk_proyek_berbayar({"lisensi": "CC-BY-NC-4.0"}))
print(boleh_untuk_proyek_berbayar({"lisensi": "?"}))
```

## Soal Parsons

Susun baris menjadi fungsi `lengkap` yang mengembalikan `False` bila salah satu kolom wajib kosong dan `True` bila semuanya terisi. Lekukan sudah benar; yang diacak hanya urutannya.

```text
    return True
            return False
def lengkap(catatan):
    for kolom in ["judul", "sumber", "lisensi"]:
        if not catatan.get(kolom):
```

## Latihan

1. **Pilih dan baca.** (`AI: tanpa AI`) Pilih satu dataset terbuka, misalnya dari UCI Machine Learning Repository atau Portal Satu Data Indonesia. Buka halamannya, baca sendiri keterangan lisensinya, lalu tulis catatan sumber lengkap dan putuskan pakai atau tidak untuk proyek belajar.
2. **Tiga kasus.** (`AI: tanpa AI`) Untuk tiga kasus di bagian prediksi, tulis keputusan, alasan, dan apa yang dicantumkan di laporan bila dipakai.
3. **Pseudocode dulu.** (`AI: boleh`) Tulis dalam kata cara membuat `periksa` memberi peringatan bila lisensinya `CC-BY-SA-4.0`, lalu ubah ke Python. Uji dengan lisensi `CC-BY-SA-4.0` dan `CC-BY-4.0`.
4. **Atribusi.** (`AI: boleh`) Dari catatan *Iris*, tulis kalimat atribusi untuk laporan proyekmu bila datanya dipakai tanpa diubah, dan satu kalimat bila hanya 100 baris yang dipakai.
5. **Catatan pemakaian AI (opsional).** Bila memakai asisten AI, catat alat, tujuan, garis besar perintah, bagian yang dipakai, dan cara memeriksanya.

## Latihan bercampur

1. Dari `d-xi1-m4`: dataset pilihanmu ternyata berformat CSV bertitik koma. Tulis dua pemeriksaan sesudah membacanya dan pengaturan `read_csv` yang diperlukan.
2. Dari `d-xi1-m3`: dengan kamus dan `.get`, hitung berapa kali tiap lisensi muncul pada daftar `["CC-BY-4.0", "CC-BY-NC-4.0", "CC-BY-4.0"]`.

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `d-xi1-m6` (sekitar satu minggu lagi), `d-xi1-m8` (sekitar tiga minggu lagi), dan `d-xi1-m13` (sekitar delapan minggu lagi). Jawab sekarang lalu simpan.

1. Apa lima catatan yang disimpan untuk setiap dataset yang dipakai?
2. Mengapa dataset yang lisensinya tidak jelas tidak dipakai, dan apa yang dilakukan sebagai gantinya?
3. Apa yang dicantumkan di laporan proyek tentang sumber data dan perubahan yang dilakukan padanya?

## Kesalahan umum

- **"Bisa diunduh berarti boleh dipakai."** Tanpa lisensi yang jelas, pemakaian tidak pasti aman; unduhan bebas bukan izin.
- **"Tidak ada tanda © berarti bebas."** Hak cipta timbul otomatis; tanpa keterangan lisensi, anggap belum diizinkan.
- **"Lisensi bebas berarti datanya aman."** Hak pribadi dan privasi tetap berlaku; data yang memuat nama dan nomor induk tidak dipakai.
- **"Ringkasan dari AI cukup untuk lisensi."** Baca teks atau deed lisensi sendiri; ringkasan bisa keliru atau usang.
- **"Satu kali periksa, selamanya benar."** Catat tanggal akses; halaman dan syaratnya dapat berubah.

## Cek mandiri

- [ ] Saya dapat menilai sumber dari pencipta, lisensi, dokumentasi, dan data pribadi.
- [ ] Saya dapat membedakan CC0, CC BY, CC BY-SA, dan CC BY-NC secara garis besar.
- [ ] Saya dapat menulis catatan sumber lengkap.
- [ ] Saya tidak memakai data yang lisensinya tidak jelas.
- [ ] Saya mencatat pemakaian AI bila saya memakainya.

## Kunci dan petunjuk

**Ingat kembali.** 1: CSV hanya teks; angka harus diubah dengan `int()` atau `float()`, kalau tidak `+` menyambung teks. 2: `for` untuk melewati deretan yang jelas, `while` selama syarat benar; `while` tidak berhenti bila nilai yang dites tidak berubah. 3: cari keterangan lisensi di halaman sumber, baca ringkasannya, bandingkan dengan rencana pakai, catat, dan jangan pakai bila tidak jelas.

**Prediksi dulu.** Contoh jawaban ada di bagian "Menjawab prediksi". Yang dinilai adalah alasanmu: lisensi, batas pemakaian, dan data pribadi.

**Contoh setengah jadi.** `KOMERSIAL`; `"tidak jelas"`; `lisensi`. Keluaran: `False` dan `tidak jelas`.

**Soal Parsons.** Urutan benar:

```python
def lengkap(catatan):
    for kolom in ["judul", "sumber", "lisensi"]:
        if not catatan.get(kolom):
            return False
    return True
```

`return True` berada di luar perulangan, supaya hanya dicapai bila tidak ada kolom yang kosong. Contoh: `{"judul": "Iris", "sumber": "https://archive.ics.uci.edu/dataset/53/iris", "lisensi": "CC-BY-4.0"}` memberi `True`, sedangkan `{"judul": "Iris", "sumber": ""}` memberi `False`.

**Latihan.** 1: dinilai dari kelengkapan catatan (judul, pencipta, sumber, lisensi, tanggal akses, perubahan) dan keputusan beralasan; bila lisensi tidak ditemukan, keputusannya "tidak dipakai". 2: lihat "Menjawab prediksi"; laporan memuat atribusi untuk kasus pertama dan batas nonkomersial untuk kasus kedua. 3: contoh: bila lisensi sama dengan `CC-BY-SA-4.0`, tambahkan teks peringatan ke daftar. Keluaran: `['hasil turunan harus dibagikan dengan lisensi yang sama']` dan `[]` (dengan kolom lain terisi). 4: contoh: `"Iris" oleh Fisher, R. (1936), UCI Machine Learning Repository, CC BY 4.0 (https://creativecommons.org/licenses/by/4.0/), tidak diubah.` dan `... Diubah: hanya 100 baris pertama dipakai.` 5: opsional.

**Latihan bercampur.** 1: `shape` (apakah hanya satu kolom) dan `dtypes` atau nama kolom; `pd.read_csv(..., sep=";", decimal=",")`. 2: `cacah = {}`; `for l in daftar: cacah[l] = cacah.get(l, 0) + 1`; hasil `{'CC-BY-4.0': 2, 'CC-BY-NC-4.0': 1}`.

**Ulang berjarak.** 1: judul, pencipta, sumber, lisensi, dan tanggal akses (ditambah keterangan perubahan bila ada). 2: karena tanpa izin yang jelas pemakaiannya tidak pasti aman; cari dataset lain yang lisensinya jelas atau buat data karangan. 3: atribusi (judul, pencipta, sumber, lisensi), tanggal akses, dan perubahan seperti baris yang dibuang atau kolom yang ditambah.

## Langkah berikutnya

Modul berikut: `d-xi1-m6` (membersihkan data), tempat kamu menangani nilai hilang, duplikat, dan nilai di luar rentang. Bacaan pendamping: `pendamping-periksa-fakta-dan-baca-lateral` untuk menilai halaman sumber.
