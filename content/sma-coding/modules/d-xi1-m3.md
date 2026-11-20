## Untuk siapa modul ini

Modul ini untuk murid kelas XI jalur D (kecerdasan buatan dan analisis data), untuk minggu `D-XI1-M3` silabus v1.3: Python II (fungsi, daftar, kamus). Prasyarat: modul `d-xi1-m2`. Alat: Python 3 di komputer, tanpa akun.

Modul ini karangan penyusun dan disetujui pemilik program pada 2026-11-20 (keputusan lewat dialog; catatan tinjauan menjadi tindak lanjut revisi). Jalur D adalah pengayaan di luar rumusan capaian pembelajaran (CP). Minggu ini beririsan dengan butir `F-AP-d` (memakai library untuk model) pada tingkat rendah, hanya karena alatnya pemrograman; irisan itu **tidak dihitung** sebagai pemenuhan CP.

Aturan jalur D yang berlaku: data hanya sintetis (karangan) atau terbuka dengan lisensi jelas, tanpa data yang bisa mengenali orang; wajah, suara, dan foto orang tidak dipakai sebagai data; AI generatif boleh dipakai dengan etika dan dicatat, tanpa data pribadi, kata sandi, atau tugas bernilai pada permintaanmu, dan kamu tidak wajib punya akun. Saran: jawab dulu sendiri, baru minta AI memberi petunjuk bertahap; kode buatan AI dibaca, dijalankan, dan diuji. Setiap soal `Latihan` bertanda `AI: boleh` atau `AI: tanpa AI`.

Catatan untuk guru: semua blok Python dijalankan penyusun dengan `python3 -I` (Python 3.12.3, per 2026-11) dan keluarannya ditempel apa adanya; data curah hujan karangan. Karena `-I` tidak menaruh folder skrip pada jalur impor, contoh di sini berdiri sendiri dalam satu berkas.

## Ingat kembali

Jawab dari ingatan, baru cek di bagian kunci.

1. Apa keluaran `7 / 2`, `7 // 2`, dan `7 % 2`, dan kapan memakai masing-masing? (dari `d-xi1-m2`)
2. Mengapa `"7" + "2"` menghasilkan `72`, dan bagaimana mendapat 9? (dari `d-xi1-m2`)
3. Sebutkan lima tahap proyek data dan AI. (dari `d-xi1-m1`)

## Tujuan

Setelah modul ini kamu dapat:

- menulis fungsi dengan parameter dan `return`, dan membedakan `return` dari `print`;
- memakai daftar (`list`): mengakses, mengiris, menambah, dan membuat salinan;
- memakai kamus (`dict`): mengisi, mengambil, dan menghitung kemunculan;
- menyusun skrip rekap dari beberapa fungsi kecil.

Keluaran yang diminta silabus: skrip modular.

## Prediksi dulu

Tebak dan tulis keluaran, baru jalankan.

```python
a = [4, 8, 15]
b = a
b.append(16)
print(len(a))
print(a[1:3])
tinggi = {"Ani": 150, "Budi": 160}
print(tinggi["Budi"])
print(tinggi.get("Cici", -1))
```

Tulis juga: mengapa `len(a)` tidak 3, padahal yang ditambah `b`?

## Contoh terselesaikan

**Fungsi.** Fungsi memberi nama pada satu pekerjaan kecil, menerima masukan lewat parameter, dan mengembalikan hasil dengan `return`. **Daftar** menyimpan urutan nilai, **kamus** menyimpan pasangan kunci dan nilai. Program di bawah merekap curah hujan tiga stasiun fiktif (milimeter per hari, karangan): fungsi `rata` dan `kategori`, kamus `hujan`, fungsi `rekap` yang menghasilkan kamus lain, lalu menghitung berapa kali tiap kategori muncul.

```python
def rata(daftar):
    return sum(daftar) / len(daftar)


def kategori(mm):
    if mm >= 20:
        return "lebat"
    elif mm >= 10:
        return "sedang"
    elif mm > 0:
        return "ringan"
    return "kering"


hujan = {  # mm per hari, data karangan
    "Stasiun A": [12, 0, 5, 30],
    "Stasiun B": [0, 0, 4, 1],
    "Stasiun C": [20, 25, 8, 14],
}


def rekap(data):
    hasil = {}
    for nama, nilai in data.items():
        hasil[nama] = {"rata": round(rata(nilai), 2), "maks": max(nilai)}
    return hasil


for nama, ringkas in rekap(hujan).items():
    print(nama, ringkas)

hitung = {}
for nilai in hujan["Stasiun A"] + hujan["Stasiun B"]:
    k = kategori(nilai)
    hitung[k] = hitung.get(k, 0) + 1
print(hitung)
```

```text
Stasiun A {'rata': 11.75, 'maks': 30}
Stasiun B {'rata': 1.25, 'maks': 4}
Stasiun C {'rata': 16.75, 'maks': 25}
{'sedang': 1, 'kering': 3, 'ringan': 3, 'lebat': 1}
```

Telusuri bagian terakhir: dua daftar disambung menjadi delapan nilai (12, 0, 5, 30, 0, 0, 4, 1). Untuk tiap nilai, `hitung.get(k, 0)` mengambil cacah sekarang (0 bila kategori belum ada), lalu ditambah satu. Hasil: 1 sedang, 3 kering, 3 ringan, 1 lebat (jumlah 8).

**Salinan dan `return`.** Dua hal yang sering mengejutkan pemula:

```python
a = [1, 2]
b = a.copy()
b.append(3)
print(a, b)


def lipat_cetak(x):
    print(x * 2)


def lipat_kembali(x):
    return x * 2


p = lipat_cetak(3)
q = lipat_kembali(3)
print(p, q)
```

```text
[1, 2] [1, 2, 3]
6
None 6
```

`b = a` tidak menyalin: dua nama menunjuk ke daftar yang sama, jadi `append` lewat `b` terlihat lewat `a`. `.copy()` membuat daftar baru. Fungsi yang hanya `print` mengembalikan `None`; hanya fungsi yang `return` yang hasilnya bisa dipakai lagi.

## Contoh setengah jadi

Lengkapi fungsi yang mencari kategori dengan cacah terbanyak dari sebuah kamus cacah.

```python setengah-jadi
def terbanyak(data):
    """Kembalikan kunci dengan jumlah terbesar."""
    nama_terbaik = None
    nilai_terbaik = ____
    for nama, jumlah in data.items():
        if jumlah ____ nilai_terbaik:
            nama_terbaik = ____
            nilai_terbaik = jumlah
    return nama_terbaik


print(terbanyak({"ringan": 3, "sedang": 5, "lebat": 2}))
```

## Soal Parsons

Susun baris menjadi fungsi yang menjumlahkan bilangan genap dari sebuah daftar, lalu mencoba `[3, 4, 7, 10]`. Lekukan sudah benar; yang diacak hanya urutannya.

```text
    return total
print(jumlah_genap([3, 4, 7, 10]))
        if x % 2 == 0:
def jumlah_genap(daftar):
    total = 0
            total = total + x
    for x in daftar:
```

## Latihan

1. **Fungsi penghitung.** (`AI: tanpa AI`) Tulis `banyak_di_atas(daftar, batas)` yang mengembalikan banyaknya nilai yang lebih besar dari `batas`. Coba `[12, 0, 5, 30, 8]` dengan batas 10.
2. **Pseudocode dulu.** (`AI: tanpa AI`) Tulis dalam kata-kata langkah menghitung berapa kali tiap huruf muncul di `["a", "b", "a", "c", "a"]`, baru ubah ke Python dengan kamus.
3. **Stasiun lebat.** (`AI: boleh`) Dari kamus `hujan` di contoh, buat kamus yang berisi banyaknya hari lebat (kategori `lebat`) per stasiun.
4. **Salinan.** (`AI: boleh`) Buat daftar `x = [3, 1, 2]`, salin ke `y`, urutkan `y` dengan `y.sort()`, lalu tunjukkan bahwa `x` tidak berubah.
5. **Catatan pemakaian AI (opsional).** Bila memakai asisten AI, catat alat, tujuan, garis besar perintah, bagian yang dipakai, dan cara memeriksanya.

## Latihan bercampur

1. Dari `d-xi1-m1`: pembanding sederhana adalah tebakan mayoritas. Pakai kamus cacah `{"sedang": 1, "kering": 3, "ringan": 3, "lebat": 1}` dan fungsi `terbanyak`: kelas mana yang dipilih, dan berapa ketepatan tebakan itu dari 8 hari?
2. Dari `d-xi1-m2`: ubah perulangan penghitung rata-rata menjadi fungsi `rata(daftar)` tanpa `sum`, lalu uji dengan `[12, 0, 5, 30, 0, 8, 22]`.

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `d-xi1-m4` (sekitar satu minggu lagi), `d-xi1-m6` (sekitar tiga minggu lagi), dan `d-xi1-m11` (sekitar delapan minggu lagi). Jawab sekarang lalu simpan.

1. Apa beda daftar dan kamus, dan kapan memakai masing-masing?
2. Mengapa `b = a` pada daftar tidak membuat salinan, dan bagaimana membuat salinan?
3. Apa untungnya fungsi yang menerima masukan dan mengembalikan hasil dibanding mengubah variabel di luar fungsi?

## Kesalahan umum

- **"`b = a` menyalin daftar."** Itu memberi nama kedua pada daftar yang sama. Salin dengan `a.copy()`.
- **"Fungsi yang mencetak hasil sama dengan fungsi yang mengembalikan hasil."** `print` hanya menampilkan; fungsi tanpa `return` menghasilkan `None`.
- **"Indeks daftar mulai dari 1."** Mulai dari 0; `a[1:3]` mengambil indeks 1 dan 2, bukan 3.
- **"Mengambil kunci yang tidak ada hanya memberi nilai kosong."** `tinggi["Cici"]` menimbulkan `KeyError`; `.get("Cici", -1)` memberi nilai pengganti.

## Cek mandiri

- [ ] Saya dapat menulis fungsi dengan parameter dan `return`.
- [ ] Saya dapat menjelaskan mengapa `b = a` tidak menyalin daftar.
- [ ] Saya dapat menghitung kemunculan dengan kamus dan `.get`.
- [ ] Saya menulis langkah dalam kata-kata sebelum menulis kode.
- [ ] Saya mencatat pemakaian AI bila saya memakainya.

## Kunci dan petunjuk

**Ingat kembali.** 1: `3.5`, `3`, `1`; `/` desimal, `//` pembagian bulat, `%` sisa. 2: `+` pada teks menyambung; ubah dengan `int("7") + int("2")` untuk mendapat 9. 3: masalah, data, model, evaluasi, penggunaan.

**Prediksi dulu.** Keluaran: `4`, `[8, 15]`, `160`, `-1`. `len(a)` adalah 4 karena `b = a` membuat dua nama untuk daftar yang sama; `append` lewat `b` mengubah daftar yang juga dilihat `a`. `a[1:3]` adalah indeks 1 dan 2. `.get` memberi nilai pengganti bila kunci tidak ada.

**Contoh setengah jadi.** `nilai_terbaik = -1`; `if jumlah > nilai_terbaik:`; `nama_terbaik = nama`. Keluaran: `sedang`. Nilai awal -1 lebih kecil dari semua cacah yang mungkin (0 atau lebih), jadi cacah pertama pasti menggantikannya.

**Soal Parsons.** Urutan benar:

```python
def jumlah_genap(daftar):
    total = 0
    for x in daftar:
        if x % 2 == 0:
            total = total + x
    return total


print(jumlah_genap([3, 4, 7, 10]))
```

Keluaran `14` (4 + 10). `return` berada di luar perulangan; bila ia berada di dalamnya, fungsi berhenti pada putaran pertama.

**Latihan.** 1: `n = 0`, `for x in daftar: if x > batas: n = n + 1`, `return n`; keluaran `2` (12 dan 30). 2: contoh: mulai dengan kamus kosong; untuk tiap huruf, ambil cacah sekarang (0 bila belum ada), tambah satu, simpan; keluaran `{'a': 3, 'b': 1, 'c': 1}`. 3: `{'Stasiun A': 1, 'Stasiun B': 0, 'Stasiun C': 2}` (30; tidak ada; 20 dan 25). 4: `y = x.copy()`, `y.sort()`, `print(x, y)` memberi `[3, 1, 2] [1, 2, 3]`. 5: opsional.

**Latihan bercampur.** 1: `kering` dipilih (cacah 3, yang pertama mencapai 3 di kamus itu; `ringan` seri), ketepatan 3 / 8 = 0,375. 2: fungsi: `total = 0`, `for x in daftar: total = total + x`, `return total / len(daftar)`; keluaran `11.0`.

**Ulang berjarak.** 1: daftar menyimpan urutan dan diakses lewat indeks; kamus menyimpan pasangan kunci dan nilai dan diakses lewat kunci. 2: karena itu memberi nama kedua pada daftar yang sama; salin dengan `.copy()`. 3: fungsi mudah diuji dan dipakai ulang karena hasilnya hanya bergantung pada masukannya; mengubah variabel luar membuat hasil sulit dilacak.

## Langkah berikutnya

Modul berikut: `d-xi1-m4` (membaca berkas tabel), tempat kamu membaca dan menulis CSV. Bacaan lanjut: bagian struktur data pada tutorial Python resmi.
