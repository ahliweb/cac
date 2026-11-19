## Untuk siapa modul ini

Modul belajar untuk mata kuliah `KUL-U-301` (3 SKS, semester 6, jalur U), bagian
dari program `kuliah-coding`. Konten ini karangan menurut ADR-0007 dan belum
disetujui. Kode di modul ini adalah **Python 3.12** (pustaka standar dan Git
2.43): tiap blok lengkap dijalankan dan keluarannya sama dengan yang tertulis;
blok `setengah-jadi` berlubang, tetapi versi terisi sudah dijalankan. Semua
nama, data, dan surel **fiktif**; proyek nyata memakai data sintetis atau
terbuka.

Mahasiswa semester 6 dari **program studi yang berbeda-beda**; tiap tim
sebaiknya berisi mahasiswa dari lebih dari satu prodi. Prasyarat: `KUL-U-102`
(analisis data dengan Python) **atau** `KUL-U-201` (otomasi dan skrip). Kamu
sudah dapat menulis fungsi, membaca CSV, menulis `assert`, dan memakai Git.
Satu mata kuliah, satu semester: 14 pertemuan `[asumsi]` (silabus 2.3). Ini
mata kuliah **proyek**: sebagian besar waktu dipakai membangun, bukan
mendengarkan, sehingga modul ini berbentuk panduan kerja. Kamu butuh Python 3,
Git, dan satu repositori milik tim (bukan repositori ini).

Di semester ini contoh terselesaikan **sangat dikurangi**: yang ada hanya satu
kasus bersambung (peminjaman alat laboratorium fiktif). Selebihnya kamu menilai
spesifikasi, membaca kode orang lain, dan memutuskan sendiri.

## Peta semester

| Pertemuan | Bagian | Pokok bahasan | CPMK | Kuis pembuka (jarak) |
| --- | --- | --- | --- | --- |
| 1 | 1 | Pemangku kepentingan dan pernyataan masalah | C1 | `KUL-U-101`, `KUL-U-102`, `KUL-U-201` |
| 2 | 1 | Wawancara, kriteria penerimaan yang dapat diuji | C1 | 1 |
| 3 | 1 | Data sintetis atau terbuka; ruang lingkup; **proposal** | C1 | 2, lalu 1 |
| 4 | 2 | Memecah pekerjaan, urutan, peran tim | C1, C4 | 3, lalu 1 |
| 5 | 2 | Risiko, jadwal, kesepakatan kerja tim | C1, C4 | 4, lalu 2 |
| 6 | 3 | **Iterasi 1**: prototipe paling kecil yang berjalan | C2, C4 | 5, lalu 3 |
| 7 | 3 | Tinjauan kemajuan (pengganti ujian tengah `[asumsi]`) | C2, C4 | 6, lalu 4 |
| 8 | 3 | **Iterasi 2**: umpan balik pemangku kepentingan | C2, C4 | 7, lalu 5 |
| 9 | 3 | Iterasi 2: uji dan perbaikan | C2 | 8, lalu 6 |
| 10 | 3 | **Iterasi 3** dan pembekuan fitur | C2, C4 | 9, lalu 7 |
| 11 | 4 | Dokumentasi yang dapat diikuti orang lain | C3 | 10, lalu 8 |
| 12 | 4 | Pengujian akhir; bukti di repositori | C3 | 11, lalu 9 |
| 13 | 5 | Presentasi; refleksi etika | C3 | 12, lalu 10 |
| 14 | 5 | Demo akhir, laporan, penilaian rekan | C1–C4 | 13, lalu 1 sampai 12 |

## Ingat kembali

Tiap pertemuan dibuka dengan kuis 5 menit **tanpa catatan**, 3 sampai 4 soal
pendek: pertemuan lalu, lalu yang lebih jauh (pertemuan 14 memuat soal
pertemuan 1). Kuis tidak dinilai besar.

Soal pembuka pertemuan 1, dari mata kuliah prasyarat:

1. Tulis tiga hal yang harus bisa kamu lakukan sebelum memakai AI pada tugas
   tingkat Kuning. (`KUL-U-101`)
2. Kapan kamu melaporkan median alih-alih rata-rata? Sebut tiga sumber masalah
   kualitas data. (`KUL-U-102`)
3. Kunci API sudah terlanjur masuk ke riwayat Git. Apa yang kamu lakukan, dan
   mengapa menghapus berkasnya tidak cukup? (`KUL-U-201`)
4. Bila kamu sudah mengambil `KUL-U-202`: apa isi satu baris log pemakaian AI?

## Tujuan

Pada akhir semester kamu dapat (CPMK, silabus bagian 3.1):

- **C1** merumuskan masalah komputasi di bidang prodi bersama pemangku kepentingan
- **C2** membangun prototipe dengan data sintetis atau terbuka
- **C3** mendokumentasikan, menguji, dan mempresentasikan
- **C4** bekerja dalam tim lintas program studi

## Bagian 1: Perumusan masalah (pertemuan 1 sampai 3)

Proyek lintas disiplin gagal paling sering bukan karena kodenya, melainkan
karena **masalah yang dipecahkan bukan masalah yang dimaksud pemangku
kepentingan**. Pemangku kepentingan adalah orang atau kelompok yang terdampak
atau memakai hasilnya; di proyekmu biasanya dosen atau staf prodi lain,
pengelola laboratorium, atau komunitas kampus.

### Prediksi dulu

Dua kalimat masalah untuk proyek yang sama. Mana yang dapat dijadikan uji, dan
mengapa?

- A: "Laboratorium butuh sistem peminjaman alat yang bagus."
- B: "Asisten laboratorium ingin tahu, tiap pagi, alat mana yang terlambat
  dikembalikan dan berapa hari, dari catatan CSV yang sudah ada."

### Contoh terselesaikan

Kalimat B dapat diuji: ada **pemakai** (asisten), **keluaran** (daftar alat
terlambat dan hari), **masukan** (catatan CSV), dan **waktu** (tiap pagi).
Kalimat A tidak punya satu pun yang dapat diperiksa. Dari B, tim menulis
**kriteria penerimaan**, yaitu pernyataan yang jelas lulus atau gagal:

1. Alat yang dikembalikan sebelum atau pada tanggal rencana memberi 0 hari
   terlambat.
2. Alat yang dikembalikan sesudah tanggal rencana memberi selisih hari yang
   benar.
3. Alat yang belum dikembalikan dihitung terlambat sampai hari ini.

Kasus bersambung ini kita bawa ke bagian berikutnya. Wawancara dengan
pemangku kepentingan menghasilkan catatan yang dapat memuat nama dan jabatan:
simpan catatan itu di tempat tim, bukan di repositori terbuka, dan samarkan
nama di dokumen proyek. Menurut Undang-Undang Nomor 27 Tahun 2022 tentang
Pelindungan Data Pribadi, data tentang orang yang dapat diidentifikasi, juga
bila dikombinasi dengan informasi lain, termasuk Data Pribadi (Pasal 1 butir
1). **Data proyek yang dimasukkan ke repositori adalah data sintetis atau
terbuka.**

### Contoh setengah jadi

Tulis tiga kriteria penerimaan untuk masalahmu sendiri dengan pola: "Bila
`<keadaan>`, maka `<hasil yang dapat diperiksa>`." Tukar dengan tim lain;
mereka menandai kriteria yang tidak dapat diuji.

### Latihan

1. **Ubah:** perbaiki kalimat A hingga dapat diuji.
2. **Buat:** proposal satu halaman: pemangku kepentingan, masalah, tiga
   kriteria, data sintetis atau terbuka yang dipakai, dan apa yang **tidak**
   dikerjakan semester ini.
3. **Jelaskan:** mengapa "bagus" bukan kriteria, dan siapa yang berhak
   menyatakan kriteria sudah terpenuhi.

## Bagian 2: Perencanaan proyek (pertemuan 4 dan 5)

Rencana bukan ramalan; rencana adalah **alat untuk melihat ketergantungan**.
Pekerjaan dipecah menjadi tugas kecil, dan kamu mencatat tugas mana
menunggu tugas mana. Tim lintas prodi perlu pembagian peran yang jelas,
**tetapi bukan pemrograman berpasangan**: dalam proyek, peran tim
(koordinator, pemilik bidang, pengembang, penguji dan dokumentasi) berputar tiap
iterasi, dan tiap anggota tetap bertanggung jawab atas bagian yang ia kerjakan.

### Prediksi dulu

Tebak urutan tugas dan siapa menunggu siapa:

```python
from graphlib import TopologicalSorter

tugas = {
    "proposal": set(),
    "data sintetis": {"proposal"},
    "prototipe 1": {"data sintetis"},
    "uji 1": {"prototipe 1"},
    "prototipe 2": {"uji 1"},
    "dokumentasi": {"prototipe 1"},
    "demo": {"prototipe 2", "dokumentasi"},
}

urutan = list(TopologicalSorter(tugas).static_order())
print(urutan)
for nama in urutan:
    print(f"{nama}: menunggu {sorted(tugas[nama]) or '-'}")
```

### Contoh terselesaikan

Keluaran:

```text
['proposal', 'data sintetis', 'prototipe 1', 'uji 1', 'dokumentasi', 'prototipe 2', 'demo']
proposal: menunggu -
data sintetis: menunggu ['proposal']
prototipe 1: menunggu ['data sintetis']
uji 1: menunggu ['prototipe 1']
dokumentasi: menunggu ['prototipe 1']
prototipe 2: menunggu ['uji 1']
demo: menunggu ['dokumentasi', 'prototipe 2']
```

`TopologicalSorter` memberi **satu** urutan yang menghormati ketergantungan;
urutan lain juga sah (`dokumentasi` dapat dikerjakan paralel dengan `uji 1`).
Yang penting adalah `demo` tidak bisa mulai sebelum `prototipe 2` dan
`dokumentasi` selesai. Tugas yang tidak menunggu siapa pun dapat dikerjakan
anggota berbeda pada waktu yang sama; di situlah tim lintas prodi membagi
kerja.

### Contoh setengah jadi

Memakai `tugas` dari contoh di atas, lengkapi agar daftar `siap` berisi tugas yang belum selesai dan **semua**
ketergantungannya sudah selesai:

```python setengah-jadi
selesai = {"proposal", "data sintetis"}
siap = [t for t, menunggu in tugas.items() if t not in selesai and menunggu ___ selesai]
print(siap)
```

### Latihan

1. **Ubah:** tambahkan tugas `wawancara umpan balik` yang harus selesai
   sebelum `prototipe 2`; urutan apa yang berubah?
2. **Buat:** tulis rencana tiga iterasi untuk proyekmu: apa yang berjalan di
   akhir tiap iterasi, tugas, ketergantungan, risiko terbesar, dan satu
   kesepakatan kerja tim (kapan rapat, bagaimana berselisih).
3. **Jelaskan:** apa beda "tugas selesai" dan "kriteria penerimaan terpenuhi".

## Bagian 3: Pengembangan iteratif (pertemuan 6 sampai 10)

Iteratif berarti membangun versi paling kecil yang berjalan, menunjukkannya,
lalu memperbaikinya, berulang tiga kali. Prinsip-prinsip di balik Manifesto Agile menyatakan bahwa perangkat lunak
yang berfungsi adalah ukuran utama kemajuan; di mata kuliah ini ukuran itu adalah **bukti di
repositori**: komit yang bisa ditelusuri per iterasi.

### Prediksi dulu

Tebak keluaran prototipe iterasi 1 untuk kasus peminjaman alat (tanggal hari
ini 2026-03-20; data sintetis):

```python
import csv
import io
from datetime import date

DATA = """alat,kembali_rencana,kembali_nyata
mikroskop,2026-03-10,2026-03-09
sentrifus,2026-03-10,2026-03-14
pipet,2026-03-12,
"""


def hari_terlambat(rencana, nyata, hari_ini):
    batas = date.fromisoformat(rencana)
    akhir = date.fromisoformat(nyata) if nyata else hari_ini
    return max((akhir - batas).days, 0)


def ringkas(teks_csv, hari_ini):
    hasil = []
    for baris in csv.DictReader(io.StringIO(teks_csv)):
        telat = hari_terlambat(baris["kembali_rencana"], baris["kembali_nyata"], hari_ini)
        hasil.append((baris["alat"], telat))
    return hasil


assert hari_terlambat("2026-03-10", "2026-03-09", date(2026, 3, 20)) == 0
assert hari_terlambat("2026-03-10", "2026-03-14", date(2026, 3, 20)) == 4
assert hari_terlambat("2026-03-12", "", date(2026, 3, 20)) == 8
for alat, telat in ringkas(DATA, date(2026, 3, 20)):
    print(alat, telat)
```

### Contoh terselesaikan

Keluaran:

```text
mikroskop 0
sentrifus 4
pipet 8
```

Tiap `assert` di bawah fungsi memeriksa **satu kriteria penerimaan** dari bagian
1. Perhatikan pilihan rancangan: `max(..., 0)` menjaga alat yang dikembalikan
lebih awal tetap 0, dan sel kosong `""` berarti "belum dikembalikan", sehingga
dihitung sampai `hari_ini`. Tanggal hari ini **dikirim sebagai argumen**, tidak
dibaca dari jam komputer, supaya uji tidak berubah tiap hari. Itu contoh
keputusan kecil yang membuat prototipe dapat diuji.

### Bukti di repositori

Penilaian menuntut bukti kemajuan. Cara yang mudah diperiksa: awali pesan komit
dengan nomor iterasi (`[i1]`, `[i2]`, `[i3]`). Program berikut membuat
repositori sementara dan menghitung komit per iterasi (kamu juga akan
membuatnya sungguhan di repositori timmu):

```python
import subprocess
import tempfile
from collections import Counter
from pathlib import Path


def jalankan(folder, *argumen):
    return subprocess.run(
        ["git", "-c", "user.name=Contoh", "-c", "user.email=contoh@mahasiswa.example", *argumen],
        cwd=folder,
        capture_output=True,
        text=True,
        check=True,
    ).stdout


def iterasi_dari_pesan(pesan):
    if pesan.startswith("[i1]"):
        return "iterasi 1"
    if pesan.startswith("[i2]"):
        return "iterasi 2"
    if pesan.startswith("[i3]"):
        return "iterasi 3"
    return "tanpa penanda"


with tempfile.TemporaryDirectory() as tmp:
    jalankan(tmp, "init", "-q")
    for no, pesan in enumerate(
        ["[i1] baca CSV", "[i1] hitung terlambat", "[i2] tambah uji", "perbaiki typo", "[i3] ringkasan"]
    ):
        (Path(tmp) / "catatan.txt").write_text(f"langkah {no}\n", encoding="utf-8")
        jalankan(tmp, "add", "catatan.txt")
        jalankan(tmp, "commit", "-q", "-m", pesan)
    pesan_semua = jalankan(tmp, "log", "--format=%s").splitlines()
    print(sorted(Counter(iterasi_dari_pesan(p) for p in pesan_semua).items()))
```

Keluaran:

```text
[('iterasi 1', 2), ('iterasi 2', 1), ('iterasi 3', 1), ('tanpa penanda', 1)]
```

Satu komit tanpa penanda terdeteksi. **Penghitung ini hanya bukti bentuk**,
bukan mutu: komit yang rajin tidak membuktikan hasil bagus, dan riwayat
bersama dapat dipakai untuk melihat siapa mengerjakan apa. Karena itu setiap
anggota membuat komit atas namanya sendiri, dan dosen dapat mewawancarai
anggota tentang kode yang ia tulis.

### Contoh setengah jadi

Lengkapi agar mengembalikan alat dengan keterlambatan terbesar:

```python setengah-jadi
def paling_terlambat(ringkasan):
    return max(ringkasan, key=lambda x: x[___])
```

### Latihan

1. **Ubah:** tambahkan kriteria "alat yang dikembalikan tepat pada tanggal
   rencana memberi 0" sebagai uji, lalu jalankan.
2. **Buat:** iterasi 2 proyekmu: satu fitur baru dari umpan balik pemangku
   kepentingan, dengan satu uji baru dan komit `[i2]`.
3. **Jelaskan:** mengapa tanggal hari ini dikirim sebagai argumen.
4. **Tinjau kode (lintas anggota):** anggota lain membaca komit terakhirmu dan
   menulis dua komentar: satu hal yang jelas, satu yang membingungkan.

Iterasi 3 (pertemuan 10) menutup fitur baru; dua pertemuan sisanya untuk
perbaikan dan dokumentasi.

## Bagian 4: Dokumentasi dan pengujian (pertemuan 11 dan 12)

Dokumentasi yang baik memungkinkan **orang yang tidak ada di timmu** mengulang
hasilmu. Ia memuat: tujuan dan pemangku kepentingan, cara menjalankan (perintah
persis), data yang dipakai dan asalnya, cara menjalankan uji, batas yang
diketahui, dan siapa mengerjakan apa. Pengujian akhir memeriksa semua kriteria
penerimaan, termasuk kasus tepi.

### Prediksi dulu

Kriteria "tepat pada tanggal rencana memberi 0 hari" belum punya uji di
prototipe. Tanpa menjalankan, tebak: apakah kode yang ada sudah benar, dan
apa yang harus kamu tulis untuk membuktikannya?

### Contoh terselesaikan

Kode sudah benar: `(akhir - batas).days` untuk tanggal sama adalah 0, dan
`max(0, 0)` tetap 0. Namun **kebenaran yang tidak diuji hanyalah dugaan**;
tulis `assert hari_terlambat("2026-03-10", "2026-03-10", date(2026, 3, 20)) == 0`
dan jalankan. Selain kasus tepi, uji akhir yang baik memeriksa: berkas
kosong, tanggal tidak sah (`date.fromisoformat` melempar `ValueError`), dan
baris tanpa kolom. Tentukan bersama pemangku kepentingan apa yang harus
terjadi pada tiap kasus, tuliskan di dokumentasi, lalu uji.

### Contoh setengah jadi

Lengkapi uji kasus tepi:

```python setengah-jadi
from datetime import date

assert hari_terlambat("2026-03-10", "2026-03-10", date(2026, 3, 20)) == ___
```

### Latihan

1. **Ubah:** tambahkan uji untuk tanggal tidak sah dan putuskan perilakunya.
2. **Buat:** `README` proyekmu dengan enam bagian di atas; minta anggota tim
   lain yang tidak menulisnya menjalankan semua perintahnya dari nol.
3. **Jelaskan:** mengapa dokumentasi ditulis oleh orang yang berbeda dari yang
   membuat kode ketika diuji pertama kali.

## Bagian 5: Presentasi dan refleksi etika (pertemuan 13 dan 14)

Presentasi proyek bukan tur kode; ia menjawab: **masalah siapa, apa hasilnya,
bagaimana kamu tahu itu benar, dan apa batasnya**. Struktur yang membantu:
masalah (satu kalimat), demo (dua menit, data sintetis), bukti (uji dan
komit), batas, dan langkah berikutnya. Tiap anggota menjelaskan bagian yang
ia kerjakan.

Refleksi etika adalah topik wajib mata kuliah ini. Gunakan pertanyaan berikut
pada proyekmu: siapa yang dapat dirugikan bila hasilmu salah atau disalahgunakan?
data apa yang dipakai dan apakah ada orang yang dapat dikenali, juga dari
gabungan kolom? siapa yang tidak terwakili dalam data? keputusan apa yang
diserahkan ke program dan siapa yang tetap bertanggung jawab? Pedoman etika
kecerdasan artifisial nasional (SE Menkominfo 9/2023) menyebut, bagi
penyelenggara kecerdasan artifisial, tanggung jawab agar AI tidak
diselenggarakan sebagai penentu kebijakan atau pengambil keputusan yang
menyangkut kemanusiaan; itu pedoman etika, bukan peraturan yang mengikat
langsung, tetapi ia contoh pertanyaan yang perlu kamu jawab bila proyekmu
memuat AI.

### Prediksi dulu

Proyek fiktif: tim menghitung "skor risiko" mahasiswa putus kuliah dari data
sintetis dan memberi daftar nama ke dosen wali. Tulis dua hal yang dapat
salah dan satu pagar pengaman, sebelum membaca lanjutannya.

### Contoh terselesaikan

Yang dapat salah: skor yang bias karena data timpang (kelompok kecil lebih
sering salah), dan label "berisiko" yang menempel pada orang. Pagar: data
sintetis atau teranonimkan, skor hanya masukan bagi manusia, mahasiswa dapat
meminta penjelasan dan koreksi, dan manusia yang memutuskan. UU PDP juga
menyebut hak subjek data pribadi untuk mengajukan keberatan atas keputusan
yang hanya didasarkan pada pemrosesan otomatis yang berdampak signifikan
(Pasal 10 ayat (1)); proyekmu memakai data sintetis, tetapi kamu belajar
merancang seolah data itu nyata.

### Contoh setengah jadi

Isi tabel refleksi untuk proyekmu: siapa terdampak, data yang dipakai, risiko,
dan pagar pengaman, masing-masing satu kalimat.

### Latihan

1. **Ubah:** perbaiki daftar nama berisiko di atas menjadi rancangan yang
   memakai dua pagar pengaman.
2. **Buat:** penilaian rekan: tiap anggota menulis dua hal yang dikerjakan
   tiap temannya dan satu hal untuk diperbaiki, dengan bukti dari repositori.
3. **Jelaskan:** mengapa penilaian rekan bukan satu-satunya dasar nilai
   perorangan.

## Latihan bercampur

Setelah bagian 2, 3, dan 4, kerjakan soal yang **tidak menyebut** topiknya.
Contoh: "Pemangku kepentingan minta fitur baru dua hari sebelum demo, dan satu
anggota tim tidak membalas pesan." Kamu memutuskan apa yang diubah di rencana,
di uji, dan di dokumentasi, serta apa yang kamu katakan kepada pemangku
kepentingan. Kuis kumulatif pertemuan 14 berbentuk sama.

## Ulang berjarak

Kerjakan ulang tanpa melihat jawaban lama:

- satu minggu setelah bagian: tulis ulang tiga kriteria penerimaan atau satu
  uji dari bagian itu pada proyek lain;
- awal tiap bagian baru: dua soal dari bagian sebelumnya;
- minggu sebelum demo akhir: tiga hal yang dahulu terlewat di tinjauan;
- semester berikutnya: tulis ulang tanpa melihat apa yang kamu lakukan bila
  kunci masuk ke riwayat Git; `KUL-I-401` (bila kamu masuk jalur informatika)
  memakai iterasi, tinjauan kode, dan log AI pada proyek tim besar.

## Kebijakan AI dan log pemakaian

Silabus 6.3 tidak menyebut tingkat AI untuk mata kuliah ini, jadi tingkat
berikut adalah **`[asumsi]` penyusun modul**; dosen menetapkan per tugas:

| Jenis tugas | Tingkat `[asumsi]` |
| --- | --- |
| Latihan kode perorangan di bagian 2 sampai 4 | Kuning: AI boleh menjelaskan, tidak membuat solusi yang diserahkan, dan hanya setelah gerbang kesiapan |
| Proyek tim: proposal, prototipe, dokumentasi | Hijau: AI boleh, diungkapkan ringkas, **log wajib** |
| Tugas penilaian kemampuan perorangan dan wawancara kode | Merah |

Gerbang kesiapan: menelusuri program pendek, menulis satu uji yang gagal bila
kode salah, dan menjelaskan kode dengan kata sendiri (silabus 6.4). Log di
repositori timmu: alat dan versi, tujuan, perintah, bagian keluaran yang
dipakai, dan **siapa anggota yang memakainya**. Jangan memasukkan data
pribadi, kata sandi, atau kunci ke layanan AI, termasuk catatan wawancara
pemangku kepentingan. Kode dari AI diuji dan dibaca seperti kode anggota lain:
yang menggabungkannya bertanggung jawab atasnya.

## Kesalahan umum

- **Masalah yang tidak dapat diuji** ("sistem yang bagus").
- **Membangun terlalu banyak sebelum menunjukkan apa pun** ke pemangku
  kepentingan.
- **Satu orang mengerjakan semuanya**; riwayat Git dan wawancara kode menampakkannya.
- **Dokumentasi yang hanya benar di komputer penulisnya.**
- **Data nyata di repositori** atau kunci yang ikut ter-commit.
- **Menganggap penilaian rekan sebagai pengganti bukti.**

## Cek mandiri

Tutup modul, jawab, baru periksa.

1. Tulis satu kriteria penerimaan yang dapat diuji untuk peminjaman alat.
2. Mengapa tanggal hari ini dikirim sebagai argumen pada `hari_terlambat`?
3. Apa fungsi `TopologicalSorter`, dan apa artinya "menunggu"?
4. Sebut enam isi dokumentasi proyek.
5. Sebut dua risiko etika pada proyek skor risiko mahasiswa.
6. Mengapa komit tanpa penanda iterasi menyulitkan bukti kemajuan?

Daftar periksa (kosong; kamu isi sendiri, tidak dikumpulkan):

- [ ] Aku dapat menulis kriteria penerimaan yang dapat diuji bersama pemangku kepentingan.
- [ ] Aku dapat memecah pekerjaan dan melihat ketergantungannya.
- [ ] Aku dapat membangun tiga iterasi dengan bukti di repositori.
- [ ] Aku dapat menulis dokumentasi dan uji yang dapat diulang orang lain.
- [ ] Aku dapat menjawab pertanyaan etika proyekku.

## Kunci dan petunjuk

- **Bagian 1:** prediksi: B dapat diuji (ada pemakai, keluaran, masukan,
  waktu). Latihan 1: "Asisten laboratorium dapat melihat daftar alat yang
  belum dikembalikan dengan hari terlambatnya setiap pagi."
- **Bagian 2:** keluaran urutan dan "menunggu" seperti tertulis. Setengah
  jadi: `<=`; keluaran `['prototipe 1']`.
- **Bagian 3:** prediksi `mikroskop 0`, `sentrifus 4`, `pipet 8`. Setengah
  jadi: `1`; hasilnya `('pipet', 8)`.
- **Bagian 4:** prediksi: kode sudah benar, tetapi buktinya adalah uji kasus
  tepi. Setengah jadi: `0`.
- **Bagian 5:** prediksi: skor bias dan label yang menempel; pagar: manusia
  memutuskan dan data sintetis. Cek mandiri 5: bias data dan label bagi orang.
- **Petunjuk bertahap bila macet:** (1) tuliskan masalah dalam satu kalimat
  yang dapat diuji; (2) kecilkan: apa versi paling kecil yang berjalan? (3)
  tanyakan pemangku kepentingan satu pertanyaan konkret, bukan "bagus atau
  tidak".

## Langkah berikutnya

Mata kuliah ini penutup jalur U. Bila kamu pindah ke jalur informatika,
`KUL-I-401` (Proyek Perangkat Lunak Tim) memakai iterasi, tinjauan kode, dan
kebijakan AI tim secara lebih ketat; `KUL-I-204` memperdalam proses dan
pengujian.

## Catatan untuk dosen

- **Bobot dan bentuk asesmen (usulan; prodi menetapkan, silabus 6.1):**
  proposal, bukti kemajuan di repositori (tiga iterasi), demo, laporan, dan
  penilaian rekan. Penilaian rekan hanya salah satu masukan; nilai perorangan
  memakai bukti riwayat dan wawancara kode. Kisaran bobot silabus: tugas dan
  praktikum 30–40 persen, proyek 20–40, ujian praktik 20–30, ujian tertulis atau
  lisan 10–20; modul tidak menambah komponen dan tidak memuat ujian tertulis
  bawaan.
- **Tim lintas prodi:** bentuk tim dengan komposisi prodi berbeda; peran tim
  berputar; tugas yang dinilai perorangan tetap perorangan.
- **Pemangku kepentingan:** carikan mitra yang dapat memberi masalah nyata
  tanpa menyerahkan data pribadi; bila tidak ada, buat skenario dan data
  sintetis.
- **Tingkat AI** pada bagian kebijakan adalah `[asumsi]`: ubah bila prodi
  punya ketentuan lain.
- **Hukum:** modul hanya mengutip pasal yang terbaca pada teks resmi; undang
  unit hukum kampus untuk persoalan data nyata.

## Rujukan

- *The Python Standard Library: graphlib, csv, datetime, subprocess*, Python
  Software Foundation (dibuka 2026-11-19):
  <https://docs.python.org/3/library/index.html>
- *Git Reference*, git-scm.com (dibuka 2026-11-19): <https://git-scm.com/docs>
- *Principles behind the Agile Manifesto* (dibuka 2026-11-19):
  <https://agilemanifesto.org/principles.html>
- Undang-Undang Nomor 27 Tahun 2022 tentang Pelindungan Data Pribadi, JDIH
  BPK (teks asli; Pasal 1 dan 10 dibaca 2026-11-19):
  <https://peraturan.bpk.go.id/Details/229798/uu-no-27-tahun-2022>
- Surat Edaran Menteri Komunikasi dan Informatika Nomor 9 Tahun 2023 tentang
  Etika Kecerdasan Artifisial, JDIH Komdigi (pedoman etika; dibuka 2026-11-19):
  <https://jdih.komdigi.go.id/produk_hukum/view/id/883/t/surat+edaran+menteri+komunikasi+dan+informatika+nomor+9+tahun+2023>
- ACM/IEEE-CS/AAAI, *Computer Science Curricula 2023*, daftar knowledge area
  (SDF, SE, SEP) (dibuka 2026-11-19): <https://csed.acm.org/knowledge-areas/>
