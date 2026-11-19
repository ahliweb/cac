## Untuk siapa modul ini

Modul ini untuk murid kelas 9 pada minggu ketiga semester pertama. Kamu memakai editor Python yang disiapkan gurumu dan kertas untuk menelusuri. Python adalah pengayaan di luar capaian pembelajaran. Waktunya satu pertemuan, 2 JP. Prasyaratnya `SMP8-2-M8` (daftar) dan `SMP9-1-M2` (teks). Semua nama dan angka di modul ini rekaan.

## Ingat kembali

Tutup modul ini dan jawab dari ingatan.

1. Tulis program yang memecah `"ayo belajar python"` menjadi kata dan mencetak kata terakhirnya. (`SMP9-1-M2`)
2. Tulis daftar berisi tiga nilai dan cetak isi keduanya. (`SMP8-2-M8`)
3. Tulis `if` dan `else` yang mencetak `"lulus"` bila `nilai` paling sedikit 60, selain itu `"ulang"`. (`SMP8-2-M4`)
4. Sebut langkah pertama dan langkah terakhir memecahkan masalah. (`SMP9-1-M1`)

Kunci: (1) `kata = "ayo belajar python".split()` lalu `print(kata[-1])`, tercetak `python`; (2) `d = [4, 7, 1]` lalu `print(d[1])`, tercetak 7; (3) `if nilai >= 60:` lalu `print("lulus")` menjorok, `else:` lalu `print("ulang")` menjorok; (4) pahami dulu, tinjau ulang di akhir.

## Tujuan

Setelah modul ini kamu dapat:

1. membuat kamus (*dictionary*) berisi pasangan kunci dan nilai dan membaca nilainya lewat kunci;
2. menambah, mengubah, dan memeriksa pasangan dengan `in` dan `get`;
3. mengulang isi kamus dengan `for`;
4. menjelaskan beda daftar dan kamus.

## Prediksi dulu

Daftar mencari isi lewat nomor urut. Kamus mencari isi lewat **kunci** dan menyimpannya sebagai pasangan `kunci: nilai`. Kunci tidak boleh kembar dalam satu kamus. Program P:

```python
kamus = {"buku": "book", "meja": "table", "kursi": "chair"}
print(kamus["meja"])
kamus["pensil"] = "pencil"
kamus["buku"] = "books"
print(len(kamus))
print("kursi" in kamus, "lampu" in kamus)
print(kamus.get("lampu", "belum ada"))
```

**Prediksi.** Apa yang tercetak pada empat baris keluaran? Tulis dulu.

**Jalankan.** Tulis isi kamus sesudah baris 3 dan sesudah baris 4, lalu jalankan.

**Selidiki.** Cocokkan dengan prediksimu. Apa bedanya `kamus["buku"] = "books"` dengan `kamus["pensil"] = "pencil"`?

## Contoh terselesaikan

Keluaran P: `table`, `4`, `True False`, lalu `belum ada`. Sesudah baris 3 kamus berisi empat pasangan; baris 4 tidak menambah pasangan, hanya mengganti nilai `buku` karena kunci itu sudah ada. `in` memeriksa kunci, bukan nilai. `get("lampu", "belum ada")` mengembalikan nilai cadangan bila kunci tidak ada, sedangkan `kamus["lampu"]` berhenti dengan `KeyError: 'lampu'`.

Menghitung kemunculan kata:

```python
kalimat = "aku suka buku dan aku suka meja"
hitung = {}
for kata in kalimat.split():
    hitung[kata] = hitung.get(kata, 0) + 1
print(hitung)
```

Tercetak `{'aku': 2, 'suka': 2, 'buku': 1, 'dan': 1, 'meja': 1}`. Penelusuran isi `hitung` sesudah tiap putaran:

| putaran | kata | isi `hitung` |
| --- | --- | --- |
| 1 | aku | aku 1 |
| 2 | suka | aku 1, suka 1 |
| 3 | buku | aku 1, suka 1, buku 1 |
| 4 | dan | aku 1, suka 1, buku 1, dan 1 |
| 5 | aku | aku 2, suka 1, buku 1, dan 1 |
| 6 | suka | aku 2, suka 2, buku 1, dan 1 |
| 7 | meja | aku 2, suka 2, buku 1, dan 1, meja 1 |

Tiga hal yang perlu diingat. Pertama, kunci unik; menyimpan lagi pada kunci yang sama mengganti nilai. Kedua, `for` pada kamus memberi kuncinya. Ketiga, `get` dengan nilai cadangan menghindari `KeyError`.

## Contoh setengah jadi

Kamus nilai tiga murid, dijumlahkan dan dirata-ratakan. Isi bagian kosong.

```python setengah-jadi
nilai = {"Murid-01": 80, "Murid-02": 70, "Murid-03": 90}
total = 0
for nama in ____:
    total = total + nilai[____]
print(total, total / ____)
```

Telusuri `total` tiap putaran. Apa yang tercetak?

## Susun urutannya

Empat baris berikut sudah diacak. Susun menjadi kamus terjemahan kecil yang menjawab kata yang dicari.

- **A.** `kamus = {"buku": "book", "meja": "table"}`
- **B.** `cari = input("Kata? ")`
- **C.** `jawab = kamus.get(cari, "belum ada")`
- **D.** `print(jawab)`

Tulis urutan hurufnya. Jelaskan mengapa B harus sebelum C.

## Latihan

1. **Ubah.** Pada P, tambahkan `"lampu": "lamp"`, lalu cetak `kamus["lampu"]`. Apa isi kamus akhirnya?
2. **Buat.** Tulis kamus kecil berisi tiga nama kegiatan dan lama latihannya dalam menit, lalu cetak jumlahnya dengan `for`. Telusuri hasilnya.
3. **Selidiki.** Untuk `kamus` pada P, apa yang tercetak oleh `print(kamus.get("lampu"))`, dan apa bedanya dengan `print(kamus["lampu"])`?
4. **Jelaskan.** Dengan dua kalimat, jelaskan kapan kamu memilih daftar dan kapan kamus.

## Latihan bercampur

1. Apa yang tercetak oleh `print(len("aku suka buku".split()))`? (`SMP9-1-M2`)
2. `total = 0`, lalu `for i in range(3):` berisi `total = total + i * 2`, lalu `print(total)`. Berapa yang tercetak? (`SMP8-2-M5`)

## Ulang berjarak

Kerjakan ulang tanpa melihat modul ini, lalu cocokkan:

- **Minggu depan** (`SMP9-1-M4`): tulis kamus dengan tiga pasangan nama dan nilai, lalu tambahkan satu pasangan baru.
- **Beberapa minggu lagi** (`SMP9-1-M5`): jelaskan beda `kamus.get(k)` dan `kamus[k]` untuk kunci yang tidak ada.
- **Akhir semester** (`SMP9-1-M14`): tulis dari ingatan program yang menghitung berapa kali tiap kata muncul dalam sebuah kalimat.

## Kesalahan umum

- **Memakai kamus seperti daftar.** Kenali: `kamus[0]` menimbulkan `KeyError: 0`.
- **Mengira `in` memeriksa nilai.** Kenali: `"book" in kamus` bernilai `False`.
- **Menganggap kunci boleh kembar.** Kenali: nilai lama hilang diam-diam.
- **Membaca kunci yang belum ada dengan `kamus[k]`.** Kenali: `KeyError` dengan nama kunci.
- **Lupa nilai awal 0 saat menghitung.** Kenali: `KeyError` pada kata pertama, kecuali memakai `get(kata, 0)`.

## Cek mandiri

Tutup modul, jawab tanpa melihat, lalu periksa.

1. Tulis kamus dengan dua pasangan `"merah": 3` dan `"biru": 5`, lalu cetak jumlah nilainya.
2. Apa yang dihasilkan `kamus.get("hijau", 0)` bila `"hijau"` tidak ada?
3. Mengapa menyimpan lagi pada kunci yang sama tidak menambah pasangan?

Daftar periksa (kosong; kamu isi sendiri, tidak dikumpulkan):

- [ ] Aku bisa membuat dan membaca kamus.
- [ ] Aku bisa menambah dan memeriksa pasangan.
- [ ] Aku bisa menjelaskan beda daftar dan kamus.

Kunci: (1) `k = {"merah": 3, "biru": 5}` lalu `print(k["merah"] + k["biru"])`, tercetak 8; (2) 0; (3) kunci harus unik, sehingga nilai baru menggantikan nilai lama.

## Langkah berikutnya

`SMP9-1-M4`, "Membaca berkas teks". Kamu membaca data dari berkas, memecah tiap baris, dan menyimpannya dalam daftar atau kamus.

## Catatan untuk guru

- **Waktu:** 2 JP x 40 menit `[asumsi]` (silabus bagian 2). Berpasangan boleh untuk "Prediksi dulu" dan "Latihan"; bukan jaminan efek belajar.
- **Alat:** editor Python 3. Penulis menjalankan setiap program dengan `python3 -I` (Python 3.12.3); keluaran di modul sama dengan hasilnya. Perilaku kamus (`in`, `get`, `KeyError`, urutan penyisipan, `items`) dicocokkan dengan tutorial resmi Python bagian *Dictionaries*. Urutan isi kamus yang tercetak mengikuti urutan penyisipan.
- **Butir CP:** corpus memetakan minggu ini ke `DK-BK-c*` (irisan); `cpCodes` modul kosong. Modul tidak menyatakan CP "terpenuhi".
- **Kunci "Prediksi dulu":** `table`, `4`, `True False`, `belum ada`. Sesudah baris 3: buku, meja, kursi, pensil; baris 4 mengganti `buku` menjadi `books`, jumlah tetap 4.
- **Kunci "Contoh setengah jadi":** `nilai`, `nama`, `len(nilai)`. `total` 80, 150, 240; tercetak `240 80.0`.
- **Kunci "Susun urutannya":** A, B, C, D. `cari` harus sudah berisi jawaban pengguna saat dipakai di `get`.
- **Kunci latihan:** (1) kamus akhir berisi buku (`books`), meja, kursi, pensil, lampu; tercetak `lamp`. (2) contoh: `latihan = {"gambar": 30, "musik": 20, "olahraga": 40}`; total 90. (3) `None`, sedangkan `kamus["lampu"]` menimbulkan `KeyError: 'lampu'`. (4) daftar bila urutan atau nomor yang penting, kamus bila isi dicari lewat nama.
- **Kunci "Latihan bercampur":** (1) 3. (2) 6 (0 + 2 + 4).
- **Kunci "Ulang berjarak":** minggu depan: contoh `n = {"Murid-01": 80, "Murid-02": 70, "Murid-03": 90}` lalu `n["Murid-04"] = 60`; beberapa minggu lagi: `get` memberi `None` atau nilai cadangan, `kamus[k]` berhenti dengan `KeyError`.
- **Petunjuk bertahap:** (a) tulis pasangan kunci dan nilai; (b) tulis isi kamus sesudah tiap baris; (c) bedakan kunci baru dan kunci lama; (d) telusuri dengan tabel.
- **AI:** tanpa AI. Kebijakan `smp-coding` (silabus bagian 7.1): AI generatif hanya demonstrasi guru, tanpa akun murid; asesmen tanpa AI.
- **Privasi:** semua nama dan angka rekaan; "Murid-01" bukan nama nyata; tanpa nama murid pada berkas.
- **Unsur pembelajaran:** ingat kembali dan jarak (`K`), PRIMM (`K` usia 11 sampai 14), tabel penelusuran (`K`), contoh lengkap lalu setengah jadi (`K`), Parsons (`M`), latihan bercampur (`K`).
