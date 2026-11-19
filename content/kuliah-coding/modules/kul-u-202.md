## Untuk siapa modul ini

Modul belajar untuk mata kuliah `KUL-U-202` (2 SKS, semester 4, jalur U), bagian
dari program `kuliah-coding`. Konten ini karangan menurut ADR-0007 dan belum
disetujui. Kode di modul ini adalah **Python 3.12** (pustaka standar): tiap blok
lengkap dijalankan dengan `python3 -I` dan keluarannya sama dengan yang
tertulis; blok `setengah-jadi` berlubang, tetapi versi terisi sudah dijalankan.
Semua nama, surel, nomor, dan "kunci" **fiktif**. Bagian hukum hanya memuat yang
tertulis pada teks resmi yang dibaca penyusun; ini bahan belajar, bukan nasihat
hukum.

Mahasiswa semester 4 dari program studi mana pun, **termasuk yang belum
pernah memprogram**. Tidak ada prasyarat; setiap kode dijelaskan. Satu mata kuliah, satu semester: 14 pertemuan, ujian tengah
sesudah pertemuan 7 dan ujian akhir sesudah pertemuan 14 `[asumsi]` (silabus
2.3). Kamu butuh Python 3 dan satu berkas teks untuk **log pemakaian**
milikmu sendiri.

Mata kuliah ini berada di tingkat AI **Hijau** (silabus 6.3): kamu boleh
memakai asisten AI, tetapi wajib mengungkapkan dan mencatat log. Sebelum
**gerbang kesiapan** (pertemuan 3) terpenuhi, AI hanya untuk **tugas
non-kode** (merangkum, menjelaskan istilah, menyusun kerangka tulisan).

## Peta semester

| Pertemuan | Bagian | Pokok bahasan | CPMK | Kuis pembuka (jarak) |
| --- | --- | --- | --- | --- |
| 1 | 1 | Pembelajaran mesin secara konseptual | C1 | `KUL-U-201` (kunci dan asisten AI) |
| 2 | 1 | Model bahasa: menebak kelanjutan teks | C1 | 1 |
| 3 | 1 | Keterbatasan model; **gerbang kesiapan** | C1 | 2, lalu 1 |
| 4 | 2 | Rekayasa perintah (*prompt*) | C2 | 3, lalu 1 |
| 5 | 2 | Evaluasi keluaran: halusinasi dan bias | C2 | 4, lalu 2 |
| 6 | 2 | Keluaran berbeda untuk perintah yang sama; **kuis kumulatif 1** | C2, C5 | 5, lalu 3 |
| 7 | 3 | Verifikasi keluaran dengan uji | C3, C5 | 6, lalu 4 |
| ujian tengah | | Ujian tertulis, tanpa AI | C1–C2 | |
| 8 | 3 | Uji yang kuat; keluaran yang tampak benar | C5 | 7, lalu 5 |
| 9 | 3 | Log pemakaian; studi kasus evaluasi | C3, C5 | 8, lalu 6 |
| 10 | 4 | Privasi dan pelindungan data pribadi | C4 | 9, lalu 7 |
| 11 | 4 | Hak cipta dan lisensi keluaran AI; **kuis kumulatif 2** | C4 | 10, lalu 8 |
| 12 | 5 | Integritas akademik | C3 | 11, lalu 9 |
| 13 | 5 | Energi dan biaya komputasi sekilas; dampak sosial | C2, C3 | 12, lalu 10 |
| 14 | 5 | Refleksi berkas pemakaian AI; **kuis kumulatif 3** | C2, C3 | 13, lalu 1 sampai 12 |
| ujian akhir | | Ujian tertulis, tanpa AI | C1–C5 | |

## Ingat kembali

Tiap pertemuan dibuka dengan kuis 5 menit **tanpa catatan**, 3 sampai 4 soal
pendek: pertemuan lalu, lalu yang lebih jauh (jarak bertambah; pertemuan 14
memuat soal pertemuan 1). Kuis tidak dinilai besar.

Soal pembuka pertemuan 1 (dari `KUL-U-201` bila sudah diambil; bila belum,
dosen menjelaskannya sekilas):

1. Mengapa kunci API, atau skrip yang memuat kunci itu, tidak boleh
   ditempelkan ke asisten AI?
2. Kunci sudah terlanjur masuk ke riwayat Git. Mengapa menghapus berkasnya
   tidak cukup?
3. Mengapa skrip yang dihasilkan pihak lain, termasuk AI, diperlakukan seperti
   kode orang asing sebelum dijalankan pada data nyata?

Soal berikutnya mengikuti kolom peta.

## Tujuan

Pada akhir semester kamu dapat (CPMK, silabus bagian 3.1):

- **C1** menjelaskan cara kerja sistem AI generatif secara konseptual dan keterbatasannya
- **C2** menilai keluaran AI (verifikasi, bias, halusinasi)
- **C3** memakai asisten AI secara bertanggung jawab dan mengungkapkan pemakaiannya
- **C4** menguraikan risiko privasi dan hak cipta
- **C5** memverifikasi keluaran AI dengan uji dan mencatat alat, versi, dan perintah yang dipakai

## Bagian 1: Cara kerja secara konseptual (pertemuan 1 sampai 3)

Pembelajaran mesin (*machine learning*) berarti membangun program bukan dengan
menulis aturan satu per satu, melainkan dengan menyesuaikan angka-angka di
dalam model agar cocok dengan banyak contoh. **Model bahasa** adalah model
yang dilatih pada teks untuk menebak kelanjutan teks: diberi potongan kata,
ia menghitung kata berikutnya yang paling mungkin. Asisten AI generatif
memakai tebakan itu berulang-ulang sehingga tampak "menulis".

Model sungguhan jauh lebih rumit dari contoh di bawah, tetapi **idenya sama**:
keluaran berasal dari pola pada data latih, bukan dari pemahaman atau
pengecekan fakta. Inilah akar keterbatasannya.

### Prediksi dulu

Tanpa menjalankan, tulis tiga keluaran program ini. Program ini menghitung
kata apa yang mengikuti kata apa pada satu kalimat kecil:

```python
from collections import Counter, defaultdict

teks = "kucing makan ikan kucing minum susu kucing makan nasi".split()
pasangan = defaultdict(Counter)
for a, b in zip(teks, teks[1:]):
    pasangan[a][b] += 1

print(pasangan["kucing"])
print(pasangan["kucing"].most_common(1)[0][0])
print(dict(pasangan["makan"]))
```

### Contoh terselesaikan

Keluaran program di atas:

```text
Counter({'makan': 2, 'minum': 1})
makan
{'ikan': 1, 'nasi': 1}
```

Telusuri: `zip(teks, teks[1:])` menghasilkan pasangan kata bersebelahan, misalnya
(`kucing`, `makan`). Setelah `kucing` datang `makan` dua kali dan `minum`
sekali; setelah `makan` datang `ikan` dan `nasi` masing-masing sekali.
Inilah **model bahasa mini**: tabel hitungan. Bila kamu meminta kelanjutan
`kucing`, pilihan paling mungkin adalah `makan`. Model ini **tidak tahu**
apa itu kucing; ia hanya menghitung.

Sekarang kenali satu hal yang membuat asisten AI berbeda dari kalkulator:
model tidak selalu memilih kata paling mungkin, tetapi **mengundi** menurut
peluangnya. Program berikut mengundi kelanjutan dari korpus yang sedikit
lebih besar, dengan penghasil angka acak yang ditentukan oleh `benih`
(*seed*):

```python
import random
from collections import Counter, defaultdict

korpus = (
    "kucing makan ikan kucing minum susu kucing makan nasi "
    "ikan segar enak susu hangat enak nasi hangat enak"
).split()

model = defaultdict(Counter)
for a, b in zip(korpus, korpus[1:]):
    model[a][b] += 1


def lanjutkan(kata, panjang, benih):
    acak = random.Random(benih)
    hasil = [kata]
    for _ in range(panjang):
        pilihan = model.get(hasil[-1])
        if not pilihan:
            break
        kata_berikut = acak.choices(list(pilihan), weights=list(pilihan.values()))[0]
        hasil.append(kata_berikut)
    return " ".join(hasil)


for benih in (1, 2, 3):
    print(benih, "|", lanjutkan("kucing", 4, benih))
print("ulang 1 |", lanjutkan("kucing", 4, 1))
```

Keluaran (Python 3.12; versi lain dapat mengundi urutan berbeda):

```text
1 | kucing makan nasi hangat enak
2 | kucing minum susu kucing makan
3 | kucing makan nasi ikan segar
ulang 1 | kucing makan nasi hangat enak
```

Tiga hal. Perintah yang sama (`kucing`) memberi **tiga kelanjutan berbeda**
karena undian berbeda. Dengan `benih` sama hasilnya sama; pada layanan asisten
AI sungguhan kamu umumnya tidak mengendalikannya. Dan `nasi ikan segar` lancar
tetapi tidak bermakna: **kelancaran bukan bukti kebenaran**. Itulah penjelasan
konseptual *halusinasi*: keluaran meyakinkan tetapi salah atau mengada-ada.

Catatan jujur: ini model mainan; ia tidak menjelaskan cara model modern
dibangun, dan modul ini tidak mengklaimnya.

### Contoh setengah jadi

Lengkapi agar program menghitung kata yang mengikuti `ayam`:

```python setengah-jadi
from collections import Counter, defaultdict

teks = "ayam makan jagung ayam makan padi".split()
pasangan = defaultdict(___)
for a, b in zip(teks, teks[1:]):
    pasangan[a][b] += ___
print(pasangan["ayam"].most_common(1)[0][0])
```

### Latihan

1. **Ubah:** tambahkan kalimat sendiri ke `korpus`; apakah kelanjutan
   `kucing` berubah? Apa artinya bagi data latih?
2. **Buat:** tiga kalimat untuk teman non-teknis: mengapa asisten AI dapat
   menulis jawaban lancar tetapi salah.
3. **Jelaskan:** beda "mengetahui" dan "menebak kelanjutan teks".
4. **Berpasangan (praktikum):** pengemudi menjalankan kode, navigator menulis
   penjelasan; tukar peran tiap sekitar 10 menit; pasangan dibentuk acak per
   bagian.

### Gerbang kesiapan AI (pertemuan 3)

Silabus 6.4 menyebut tiga kemampuan sebelum memakai asisten AI untuk
**menulis kode**: (1) menelusuri program pendek, (2) menulis satu uji yang
gagal bila kode salah, (3) menjelaskan kode dengan kata sendiri. Mahasiswa
non-pemrogram tetap boleh memakai AI untuk tugas non-kode sampai gerbang ini
terpenuhi (`[asumsi]` rancangan modul; dosen atau pemilik dapat memutuskan
lain).

Latihan gerbang, dikerjakan **tanpa AI**:

```python
def f(n):
    total = 0
    for i in range(1, n + 1):
        if i % 2 == 0:
            total += i
    return total


print(f(5))
```

Telusuri nilai `i` dan `total` tiap putaran, tulis satu `assert` yang gagal
bila `f` salah, dan jelaskan dengan kata sendiri apa yang dihitung `f`.

## Bagian 2: Rekayasa perintah dan evaluasi (pertemuan 4 sampai 6)

Rekayasa perintah (*prompt engineering*) adalah menulis permintaan sehingga
keluaran lebih berguna. Tidak ada rumus ajaib. Yang membantu secara umum
adalah hal yang juga membantu manusia: **konteks, tugas yang jelas, bentuk
keluaran yang diminta, dan contoh**. Hal yang lebih penting daripada gaya
menulis adalah **menilai keluaran**.

### Prediksi dulu

Ada dua perintah untuk tugas yang sama. Mana yang menurutmu menghasilkan
keluaran yang lebih mudah dinilai, dan mengapa?

- A: "Ceritakan soal Python."
- B: "Jelaskan dalam lima kalimat, untuk mahasiswa non-teknis, apa fungsi
  `len()` di Python. Beri satu contoh dengan daftar berisi tiga elemen dan
  tuliskan hasilnya."

### Contoh terselesaikan

Perintah B lebih mudah dinilai karena **ada ukuran benar-salahnya**: kamu
dapat menghitung kalimat dan menjalankan contohnya (`len([10, 20, 30])`
adalah 3). Perintah A tidak punya tolok ukur. Kerangka evaluasi ringan untuk
tiap keluaran AI:

| Pertanyaan | Cara memeriksa |
| --- | --- |
| Apakah fakta atau angkanya benar? | Cocokkan dengan sumber yang kamu buka sendiri, bukan sumber yang disebut model saja |
| Apakah rujukan yang disebut ada? | Cari rujukan itu; model dapat mengarang judul, nama, atau alamat |
| Apakah ada yang hilang atau bias? | Tanyakan siapa atau apa yang tidak disebut; periksa contoh yang menyangkut kelompok orang |
| Apakah kode berjalan dan benar? | Jalankan dan uji (bagian 3) |
| Apakah aku paham isinya? | Jelaskan tanpa melihat; bila tidak bisa, jangan serahkan |

**Bias** adalah kecenderungan sistematis: model dilatih pada data buatan
manusia, sehingga pola yang timpang pada data dapat terbawa ke keluaran.
Contoh fiktif: bila "contoh nama dokter dan perawat" selalu menempatkan jenis
kelamin tertentu pada profesi tertentu, catat dan koreksi sebelum dipakai.

### Contoh setengah jadi

Keluaran AI (fiktif): "Menurut *Jurnal Kuliah Contoh* (2019), 83 persen
mahasiswa lebih cepat belajar dengan AI." Tulis (a) apa yang pertama kamu
cari, (b) apa yang kamu lakukan bila jurnal itu tidak ditemukan, (c) apa yang
kamu tulis di laporanmu.

### Latihan

1. **Ubah:** tulis ulang perintah A menjadi perintah yang keluarannya dapat
   dinilai dengan tiga kriteria yang kamu tentukan sendiri.
2. **Buat:** ajukan satu pertanyaan faktual ke asisten AI (bila kamu
   memakainya), cek jawabannya pada sumber resmi, dan catat selisihnya.
3. **Jelaskan:** apa beda "keluaran lancar" dan "keluaran benar", dan mengapa
   keduanya mudah tertukar.
4. **Berpasangan:** tukar hasil evaluasi; cari satu hal yang terlewat.

### Keluaran berbeda untuk perintah yang sama

Pada contoh bagian 1 kamu melihat sebabnya. Ouyang dkk. (2025) menguji 829 soal
pemrograman pada ChatGPT dan melaporkan **non-determinisme tinggi**: rasio soal
dengan **nol** keluaran uji yang sama antar permintaan adalah 75,76%, 51,00%,
dan 47,56% pada tiga kumpulan soal, dan suhu 0 tidak menjamin determinisme
(satu model pada masa studi, bukan jaminan untuk layanan kini). Pelajarannya:
**jangan mengandalkan perintah untuk mendapat kode yang sama lagi; simpan
hasil yang kamu pakai dan ujilah.** Kuis kumulatif 1 (pertemuan 6) bercampur dari bagian 1 dan 2.

## Bagian 3: Verifikasi dengan uji dan log pemakaian (pertemuan 7 sampai 9)

Cara memeriksa kode yang lebih kuat daripada "kelihatannya benar" adalah
**uji**: program kecil yang memanggil kode dengan masukan tertentu dan
membandingkan hasilnya dengan yang diharapkan (`assert`). Uji yang tipis
meloloskan kode yang salah.

### Prediksi dulu

Fungsi berikut (fiktif; ditulis seolah oleh asisten AI) mengaku menghitung
median. Tebak keluaran seluruh program:

```python
def median(angka):
    # Contoh keluaran asisten AI (fiktif) yang tampak benar.
    urut = sorted(angka)
    return urut[len(urut) // 2]


def uji_tipis():
    assert median([3, 1, 2]) == 2
    assert median([5]) == 5
    print("uji tipis lulus")


def uji_kuat():
    assert median([3, 1, 2]) == 2
    assert median([5]) == 5
    assert median([1, 2, 3, 4]) == 2.5, "jumlah genap"
    print("uji kuat lulus")


uji_tipis()
try:
    uji_kuat()
except AssertionError as galat:
    print("uji kuat gagal:", galat)
print(median([1, 2, 3, 4]))
```

### Contoh terselesaikan

Keluaran:

```text
uji tipis lulus
uji kuat gagal: jumlah genap
3
```

Fungsi itu benar untuk jumlah elemen ganjil dan **salah** untuk jumlah genap
(median `[1, 2, 3, 4]` adalah 2,5; fungsi mengembalikan 3). Dua uji pertama
tidak mengungkapnya; hanya uji ketiga yang memeriksa **kasus tepi**. Dua
kemampuan berasal dari sini: memikirkan masukan yang membedakan benar dan
salah (genap, kosong, kembar, negatif), dan tidak mempercayai uji yang hanya
memuat contoh yang "mudah". EvalPlus (Liu dkk., 2023) menambah uji pada satu kumpulan soal 80 kali
dan menemukan kode hasil model yang tadinya lulus ternyata salah: pada 26
model, angka lulus turun hingga 19,3 sampai 28,9 persen (eksperimen pada
kumpulan soal tertentu, bukan angka untuk tugasmu). Pesannya: **uji yang kuat
adalah keterampilan inti ketika kode dibuat mesin.**

Perbaikannya: bila jumlah elemen ganjil, ambil elemen tengah; bila genap,
ambil rata-rata dua elemen tengah. Spesifikasi itu ditulis **lebih dulu**,
lalu uji, lalu kode; versi perbaikan lulus keempat uji (termasuk
`median([4, 1]) == 2.5`).

### Contoh setengah jadi

Fungsi ini (fiktif) seharusnya mengembalikan nilai terbesar kedua yang
**berbeda**. Lengkapi satu uji yang membuktikan bahwa fungsi salah, lalu
perbaiki fungsi:

```python setengah-jadi
def terbesar_kedua(angka):
    urut = sorted(angka)
    return urut[-2]


assert terbesar_kedua([1, 5, 3]) == 3
assert terbesar_kedua([4, 4, 1]) == ___
```

### Log pemakaian

Pada tingkat Hijau, **log wajib**: alat dan versi, tujuan, perintah, dan
bagian keluaran yang dipakai (silabus 6.3 dan 6.4), disimpan di **repositorimu
sendiri**, bukan di repositori ini. Bentuk yang mudah diperiksa mesin adalah
satu baris JSON per pemakaian. Program berikut memeriksa bidang kosong dan
pola rahasia (pola hanya untuk latihan):

```python
import json
import re

POLA_RAHASIA = re.compile(r"(KUNCI|TOKEN|SANDI)-[A-Z0-9-]+")


def periksa_log(baris):
    masalah = []
    try:
        isi = json.loads(baris)
    except json.JSONDecodeError:
        return ["bukan JSON yang sah"]
    for bidang in ("alat", "versi", "tujuan", "perintah", "dipakai"):
        if not str(isi.get(bidang, "")).strip():
            masalah.append("bidang kosong: " + bidang)
    if POLA_RAHASIA.search(baris):
        masalah.append("ada pola rahasia")
    return masalah


bagus = json.dumps(
    {
        "alat": "asisten-contoh",
        "versi": "2026-11",
        "tujuan": "menjelaskan galat IndexError",
        "perintah": "Jelaskan mengapa urut[3] gagal pada daftar 3 elemen",
        "dipakai": "penjelasan indeks mulai dari nol",
    },
    ensure_ascii=False,
)
buruk = '{"alat": "asisten-contoh", "versi": "", "tujuan": "debug", "perintah": "perbaiki skrip dengan KUNCI-CONTOH-0000", "dipakai": "semua"}'

print(periksa_log(bagus))
print(periksa_log(buruk))
```

Keluaran:

```text
[]
['bidang kosong: versi', 'ada pola rahasia']
```

Pemeriksa ini sederhana: ia hanya menangkap rahasia berpola `KUNCI-...`,
dan log yang rapi tidak membuktikan bahwa kamu paham kodenya; untuk itu ada
wawancara kode singkat.

### Latihan

1. **Ubah:** tambahkan satu uji lagi pada `median` untuk daftar kosong, dan
   putuskan sendiri apa yang seharusnya terjadi (spesifikasi dulu).
2. **Buat:** tulis fungsi `rata_rata` (dengan AI hanya bila gerbangmu
   terpenuhi), empat uji termasuk daftar kosong, dan satu baris log nyata.
3. **Jelaskan:** mengapa uji yang semuanya lulus belum membuktikan kode benar.
4. **Berpasangan:** satu menulis uji, satu menulis fungsi dengan kesalahan
   yang sengaja ditanam; tukar dan lihat apakah uji menangkapnya.

Studi kasus evaluasi (pertemuan 9): dosen memberi keluaran AI fiktif berisi
kode dan penjelasan; kamu menulis laporan satu halaman: pengujian, kesalahan
yang ditemukan, dan log.

## Bagian 4: Privasi dan hak cipta (pertemuan 10 dan 11)

Aturan dasar: **data pribadi, kata sandi, dan kunci tidak dimasukkan ke
layanan AI** (silabus 6.3 dan 6.4). Bagian ini menjelaskan alasan dan
batasnya.

### Prediksi dulu

Kamu ingin asisten AI merapikan catatan rapat yang memuat nama, nomor
telepon, dan surel peserta. Putuskan sebelum membaca lanjutannya: boleh
ditempel apa adanya, tidak boleh, atau ada cara ketiga?

### Contoh terselesaikan

Menurut Undang-Undang Nomor 27 Tahun 2022 (UU PDP), **Data Pribadi** adalah
data tentang orang perseorangan yang teridentifikasi atau dapat
diidentifikasi, secara tersendiri atau dikombinasi dengan informasi lain
(Pasal 1 butir 1). Perhatikan "dikombinasi": gabungan atribut dapat mengenali
seseorang. UU itu tidak berlaku untuk pemrosesan oleh perseorangan dalam
kegiatan pribadi atau rumah tangga (Pasal 2 ayat (2)); tetapi kampus atau
perusahaan dapat menjadi **Pengendali Data Pribadi** (Pasal 1 butir 4) yang
wajib punya dasar pemrosesan (Pasal 20) dan melindungi keamanan data (Pasal
35). Pasal 65 ayat (2) melarang setiap orang secara melawan hukum
mengungkapkan data pribadi yang bukan miliknya. Apakah menempelkan data orang
lain ke layanan AI termasuk "mengungkapkan" bergantung pada fakta dan tafsir
yang **tidak dibahas modul ini**; tanyakan unit hukum. Jalan aman: jangan
tempel.

Cara ketiga adalah **menyamarkan** sebelum mengirim, mengganti nilai yang
mengenali dengan penanda. Program kecil ini menyamarkan surel dan nomor
telepon berpola tertentu:

```python
import re

POLA_SUREL = re.compile(r"[\w.+-]+@[\w-]+\.example")
POLA_NOMOR = re.compile(r"\b\d{4}-\d{4}-\d{4}\b")


def samarkan(teks):
    teks = POLA_SUREL.sub("[SUREL]", teks)
    return POLA_NOMOR.sub("[NOMOR]", teks)


contoh = "Budi Contoh (budi@kampus.example, 0812-3456-7890) bertanya soal nilai."
print(samarkan(contoh))
print(samarkan("Hubungi 081234567890 atau ani@kampus.example"))
```

Keluaran:

```text
Budi Contoh ([SUREL], [NOMOR]) bertanya soal nilai.
Hubungi 081234567890 atau [SUREL]
```

Dua pelajaran dari keluaran itu. **Nama `Budi Contoh` tetap ada**, karena
pola kita tidak menangkap nama. Dan **nomor tanpa tanda hubung lolos**,
karena pola menuntut bentuk `0812-3456-7890`. Penyamaran otomatis pasti
bocor; ia mengurangi risiko, tidak menghapusnya. Karena itu aturan tertinggi
tetap: data yang bukan milikmu dan yang tidak perlu, tidak dikirim.

### Hak cipta dan lisensi keluaran AI

Hukum hak cipta Indonesia (Undang-Undang Nomor 28 Tahun 2014) mendefinisikan
**Pencipta** sebagai "seorang atau beberapa orang" yang menghasilkan ciptaan
yang bersifat khas dan pribadi (Pasal 1 butir 2), dan memasukkan **Program
Komputer** ke dalam ciptaan yang dilindungi (Pasal 40 ayat (1) huruf s).
Hak ekonomi, seperti penggandaan dan pendistribusian, memerlukan izin
Pencipta atau Pemegang Hak Cipta (Pasal 9 ayat (2)); **Lisensi** adalah izin
tertulis dengan syarat tertentu (Pasal 1 butir 20). Teks yang dibaca tidak menyebut karya hasil AI. **Status hukum keluaran AI di
Indonesia masih berkembang dan belum terverifikasi di modul ini.**
Pembanding (hukum AS, bukan Indonesia): Kantor Hak Cipta AS (Januari 2025)
menulis bahwa AI sebagai alat tidak menghilangkan perlindungan untuk unsur
ekspresif yang ditentukan manusia, tetapi "Prompts alone, however, at this
stage are unlikely to satisfy those requirements".

Yang tidak bergantung pada tafsir: **baca lisensi** kode, paket, dan data
yang kamu pakai; **ungkapkan** pemakaian AI; **jangan menempel** kode
berlisensi yang tidak kamu pahami; dan ingat bahwa asisten AI dapat
menghasilkan kode yang mirip kode berlisensi tanpa memberitahumu.

### Contoh setengah jadi

Lengkapi pola agar menangkap nomor berbentuk `0812-3456-7890`:

```python setengah-jadi
import re

POLA_NOMOR = re.compile(r"\b\d{___}-\d{4}-\d{4}\b")
print(bool(POLA_NOMOR.search("telepon 0812-3456-7890")))
```

### Latihan

1. **Ubah:** perluas `samarkan` agar menangkap nomor tanpa tanda hubung
   (sebelas sampai tiga belas angka berurutan), lalu cari satu data yang
   masih lolos.
2. **Buat:** tulis daftar lima jenis data yang tidak akan pernah kamu tempel
   ke layanan AI, masing-masing dengan alasan satu kalimat.
3. **Jelaskan:** mengapa menyamarkan tidak sama dengan menghapus, dan mengapa
   "dikombinasi" pada definisi Data Pribadi penting.
4. **Berpasangan:** satu menulis teks sintetis berisi data fiktif, satu lagi
   mencari data yang lolos dari `samarkan`.


## Bagian 5: Integritas, energi, dan dampak sosial (pertemuan 12 sampai 14)

### Prediksi dulu

Sari (fiktif) menyerahkan esai berlabel Hijau yang separuhnya ditulis asisten
AI tanpa diungkapkan. Apa yang melanggar: pemakaiannya, atau hal lain?

### Contoh terselesaikan

Pada tingkat Hijau, **memakai AI tidak melanggar**; yang melanggar adalah
**tidak mengungkapkan dan tidak mencatat**. Peraturan Menteri Pendidikan
Tinggi, Sains, dan Teknologi Nomor 39 Tahun 2025 menyatakan kegiatan
pendidikan dilaksanakan dengan menjunjung tinggi integritas dan etika
akademik (Pasal 33 ayat (1) huruf a), dan menyebut cara belajar yang
menjunjung prinsip integritas akademik dalam penyiapan mahasiswa baru (Pasal
37 ayat (2) huruf b). Aturan rinci pelanggaran dan sanksinya ditetapkan
perguruan tinggi; baca pedoman kampusmu.

Pengungkapan ringkas untuk tugas Hijau memuat alat, tujuan, dan bagian yang
dipakai, misalnya: "Kerangka esai disusun dengan asisten-contoh (2026-11);
paragraf 2 dan 3 saya tulis ulang sendiri; rujukan saya cek sendiri; log ada
di repositori saya." Di tugas Merah (ujian, kontes, tugas penilaian kemampuan
dasar) AI tidak boleh sama sekali.

**Energi dan biaya komputasi** hanya butir singkat; ketidakpastiannya besar.
IEA (2025) melaporkan pusat data memakai sekitar 415 TWh listrik pada 2024
(sekitar 1,5% konsumsi dunia) dan memproyeksikan sekitar 945 TWh pada 2030
(per 2026-11; proyeksi untuk seluruh pusat data, bukan hanya AI). Tidak ada
angka terverifikasi per tugas pemrograman. Kebiasaan masuk akal: pilih alat
sesuai kebutuhan, jangan membangkitkan ulang berulang-ulang tanpa menjalankan
uji, dan ingat bahwa tidak memakai AI untuk tugas kecil adalah pilihan sah.

**Dampak sosial** bukan hanya soal energi. Lehmann dkk. (2024)
menemukan dampak model bahasa pada belajar bergantung pada pola pemakaian:
yang **menggantikan** belajarnya dengan meminta solusi menambah cakupan tetapi
menurunkan pemahaman per topik; yang **melengkapi**, misalnya meminta
penjelasan, menambah pemahaman. Itu eksperimen laboratorium, bukan studi di Indonesia; ia hanya mengarahkan
kebiasaan: pakai AI untuk memahami, bukan melewatkan pemahaman. Pihak lain
juga terdampak: pekerja yang tugasnya berubah, orang yang datanya dipakai
melatih model, dan penerima keputusan yang dibantu AI.

### Latihan

1. **Ubah:** perbaiki pengungkapan fiktif ini agar lengkap: "Saya memakai AI
   untuk tugas ini."
2. **Buat:** tulis kebijakan pemakaian AI satu halaman untuk kelompok belajarmu
   yang menyebut apa yang boleh, apa yang dicatat, dan apa yang tidak pernah
   dikirim.
3. **Jelaskan:** apa beda "menggantikan" dan "melengkapi" pada pemakaian AI,
   dengan satu contoh tugasmu sendiri.
4. **Berpasangan:** bacakan kebijakanmu; pasangan mencari satu celah.

## Latihan bercampur

Setelah bagian 2, 3, dan 4, kerjakan soal yang **tidak menyebut** topiknya.
Contoh: "Asisten menjawab dengan nama jurnal dan angka yang meyakinkan, dan kamu
diminta memakainya di laporan." Kamu memutuskan apa yang dicek, diuji,
dicatat, dan diungkapkan. Kuis kumulatif (pertemuan 6, 11, 14) berbentuk sama.

## Ulang berjarak

Kerjakan ulang tanpa melihat jawaban lama:

- satu minggu setelah bagian: tulis ulang satu uji dan satu baris log dari
  bagian itu;
- awal tiap bagian baru: dua soal dari bagian sebelumnya;
- minggu sebelum ujian: tiga soal yang dahulu salah, termasuk soal kunci API
  dari `KUL-U-201`;
- semester berikutnya: tulis ulang apa saja yang tidak pernah kamu kirim ke
  layanan AI; `KUL-I-204` memakai log dan uji bagian 3 untuk kode tim.

## Kebijakan AI dan log pemakaian

Mata kuliah ini **Hijau** menurut silabus bagian 6.3. Aturannya:

| Jenis tugas | Tingkat |
| --- | --- |
| Tugas dan studi kasus bagian 2 sampai 5 | Hijau: AI boleh, **diungkapkan** ringkas, **log wajib** |
| Tugas berisi kode sebelum gerbang kesiapan terpenuhi | AI hanya untuk tugas non-kode `[asumsi]` rancangan modul |
| Kuis dan ujian tertulis | Merah: tanpa AI `[asumsi]` |

Gerbang kesiapan: lihat bagian 1 (pertemuan 3). Sebelum itu, kamu tetap
boleh memakai AI untuk merangkum, menjelaskan istilah, atau menyusun kerangka
tulisan, dengan log di repositorimu sendiri: alat dan versi, tujuan, perintah,
bagian keluaran yang dipakai. **Jangan memasukkan data pribadi, kata sandi,
atau kunci ke layanan AI.** Dosen dapat mewawancarai kamu singkat tentang yang
kamu serahkan; yang kamu serahkan, kamu yang bertanggung jawab.

## Kesalahan umum

- **Menganggap lancar sama dengan benar.** Halusinasi tampak meyakinkan.
- **Menguji dengan contoh yang mudah saja.** Kasus tepi (genap, kosong, kembar)
  yang menjebak.
- **Mengira perintah yang sama memberi hasil yang sama.** Simpan hasil, bukan
  hanya perintah.
- **Percaya pada rujukan yang disebut model tanpa membukanya.**
- **Mengira penyamaran otomatis aman.** Nama dan bentuk tak terduga lolos.
- **Tidak mengungkapkan.** Pelanggarannya ada di pengungkapan, bukan di
  pemakaian pada tugas Hijau.

## Cek mandiri

Tutup modul, jawab, baru periksa.

1. Apa isi tabel pada model bahasa mini, dan mengapa ia tidak "tahu" apa-apa?
2. Mengapa perintah yang sama dapat memberi keluaran berbeda?
3. Tulis dua kasus tepi untuk fungsi `median`.
4. Sebut empat bidang log pemakaian dan satu hal yang tidak boleh ada di dalamnya.
5. Mengapa penyamaran surel dan nomor tidak cukup, menurut contoh bagian 4?
6. Apa yang diungkapkan pada tugas Hijau, dan apa yang berlaku pada ujian?

Daftar periksa (kosong; kamu isi sendiri, tidak dikumpulkan):

- [ ] Aku dapat menjelaskan secara konseptual mengapa model bisa halusinasi.
- [ ] Aku dapat menilai keluaran AI dengan kerangka evaluasi.
- [ ] Aku dapat menulis uji dengan kasus tepi dan mencatat log pemakaian.
- [ ] Aku dapat menyebut risiko privasi dan batas penyamaran.
- [ ] Aku dapat menulis pengungkapan pemakaian AI yang lengkap.

## Kunci dan petunjuk

- **Bagian 1:** keluaran prediksi `Counter({'makan': 2, 'minum': 1})`, `makan`,
  `{'ikan': 1, 'nasi': 1}`. Setengah jadi: `Counter` dan `1`; keluaran `makan`.
  Gerbang: `f(5)` mencetak `6` (hanya `i` genap 2 dan 4 yang dijumlahkan; `total`
  berjalan 0, 2, 2, 6, 6); satu uji yang tepat: `assert f(6) == 12`; penjelasan:
  `f(n)` menjumlahkan bilangan genap dari 1 sampai `n`.
- **Bagian 2:** perintah B lebih mudah dinilai karena ada ukuran benar-salahnya.
  Setengah jadi: (a) cari jurnal itu pada sumber yang kamu buka sendiri; (b)
  anggap rujukan tidak ada dan jangan dipakai; (c) tulis bahwa angka tidak dapat
  diverifikasi dan tidak digunakan.
- **Bagian 3:** prediksi `uji tipis lulus`, `uji kuat gagal: jumlah genap`, `3`.
  Setengah jadi: nilai yang diharapkan `1`; uji gagal karena fungsi
  mengembalikan `4`; perbaikan: `sorted(set(angka))`.
- **Bagian 4:** prediksi: tidak boleh ditempel; cara ketiga (samarkan, atau
  gunakan data sintetis) lebih baik. Setengah jadi: `4`. Cek mandiri 5: nama
  tetap ada dan nomor tanpa tanda hubung lolos.
- **Bagian 5:** prediksi: yang melanggar adalah tidak mengungkapkan dan
  tidak mencatat.
- **Petunjuk bertahap bila macet:** (1) baca pertanyaan dan tulis bentuk
  jawaban yang diminta; (2) coba contoh terkecil dengan tangan; (3) jalankan
  versi kecil dan bandingkan dengan yang kamu duga.

## Langkah berikutnya

`KUL-U-301` (Proyek Komputasi Lintas Disiplin) memakai log dan pengujian
modul ini untuk proyek tim. `KUL-I-204` dan `KUL-I-401` (bila kamu masuk
jalur informatika) memakai log, tinjauan manusia, dan uji pada kode tim.
`KUL-I-305` memperdalam etika, privasi, dan tata kelola AI.

## Catatan untuk dosen

- **Bobot dan bentuk asesmen (usulan; prodi menetapkan, silabus 6.1):** studi
  kasus evaluasi keluaran AI, refleksi berkas log pemakaian, ujian tertulis
  tengah dan akhir tanpa AI, kuis kumulatif. Kisaran bobot silabus: tugas
  30–40 persen, proyek 20–40, ujian praktik 20–30, ujian tertulis atau lisan
  10–20; modul tidak menambah komponen.
- **Mahasiswa non-pemrogram:** bagian 1 sampai 4 dirancang agar dapat diikuti
  tanpa pengalaman memprogram. Gerbang kesiapan memakai tiga kemampuan silabus
  6.4; keputusan "AI hanya untuk tugas non-kode sampai gerbang terpenuhi" adalah
  `[asumsi]`, ubah bila prodi punya ketentuan lain.
- **Variasi per mahasiswa:** beri tiap mahasiswa keluaran AI fiktif berbeda untuk
  studi kasus; riwayat log dan wawancara kode singkat menjadi bukti proses.
- **Praktikum:** siapkan keluaran fiktif berisi galat halus (kasus tepi),
  rujukan karangan, dan data sintetis; jangan meminta mahasiswa memasukkan data
  pribadi nyata ke layanan apa pun.
- **Aspek hukum:** modul hanya mengutip pasal yang terbaca pada teks resmi
  (UU 27/2022, UU 28/2014, Permendiktisaintek 39/2025) dan menandai status hukum
  keluaran AI di Indonesia sebagai belum terverifikasi; undang unit hukum
  kampus untuk penjelasan lengkap.
- **Bukti belajar:** pembahasan pola pemakaian AI mengacu pada Lehmann dkk.
  (2024); studi AI dan pendidikan komputasi umumnya jangka pendek dan bukan di
  Indonesia (`docs/riset/ai-rekayasa-perangkat-lunak.md` bagian 4.5).

## Rujukan

- Python Software Foundation, *The Python Standard Library: collections,
  random, json, re* (dibuka 2026-11-19):
  <https://docs.python.org/3/library/index.html>
- Undang-Undang Nomor 27 Tahun 2022 tentang Pelindungan Data Pribadi, JDIH
  BPK (teks asli; Pasal 1, 2, 20, 35, 65 dibaca 2026-11-19):
  <https://peraturan.bpk.go.id/Details/229798/uu-no-27-tahun-2022>
- Undang-Undang Nomor 28 Tahun 2014 tentang Hak Cipta, JDIH BPK (teks asli;
  Pasal 1, 9, 40 dibaca 2026-11-19):
  <https://peraturan.bpk.go.id/Details/38690/uu-no-28-tahun-2014>
- Peraturan Menteri Pendidikan Tinggi, Sains, dan Teknologi Nomor 39 Tahun
  2025 tentang Penjaminan Mutu Pendidikan Tinggi (Pasal 33 dan 37 dibaca
  2026-11-19): <https://peraturan.go.id/files/permendiktisaintek-no-39-tahun-2025.pdf>
- Surat Edaran Menteri Komunikasi dan Informatika Nomor 9 Tahun 2023 tentang
  Etika Kecerdasan Artifisial, JDIH Komdigi (pedoman etika, bukan peraturan
  yang mengikat langsung; dibuka 2026-11-19):
  <https://jdih.komdigi.go.id/produk_hukum/view/id/883/t/surat+edaran+menteri+komunikasi+dan+informatika+nomor+9+tahun+2023>
- Ouyang dkk., *An Empirical Study of the Non-determinism of ChatGPT in Code
  Generation* (arXiv:2308.02828; versi arsip, dibuka 2026-11-19):
  <https://arxiv.org/abs/2308.02828>
- Liu dkk., *Is Your Code Generated by ChatGPT Really Correct? Rigorous
  Evaluation of Large Language Models for Code Generation* (arXiv:2305.01210,
  dibuka 2026-11-19): <https://arxiv.org/abs/2305.01210>
- Lehmann, Cornelius, dan Sting, *AI Meets the Classroom: When Do Large
  Language Models Harm Learning?* (arXiv:2409.09047; pracetak, dibuka
  2026-11-19): <https://arxiv.org/abs/2409.09047>
- U.S. Copyright Office, *Copyright and Artificial Intelligence, Part 2:
  Copyrightability* (Januari 2025; hukum AS; dibuka 2026-11-19):
  <https://www.copyright.gov/ai/Copyright-and-Artificial-Intelligence-Part-2-Copyrightability-Report.pdf>
- International Energy Agency, *Energy and AI* (ringkasan eksekutif, 2025;
  dibuka 2026-11-19): <https://www.iea.org/reports/energy-and-ai/executive-summary>
- ACM/IEEE-CS/AAAI, *Computer Science Curricula 2023*, daftar knowledge area
  (dibuka 2026-11-19): <https://csed.acm.org/knowledge-areas/>
