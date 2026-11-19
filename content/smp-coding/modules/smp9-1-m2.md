## Untuk siapa modul ini

Modul ini untuk murid kelas 9 pada minggu kedua semester pertama. Kamu memakai editor Python yang disiapkan gurumu dan kertas untuk menelusuri. Python adalah pengayaan di luar capaian pembelajaran. Waktunya satu pertemuan, 2 JP. Prasyaratnya `SMP8-2-M3` (ekspresi dan tipe data). Semua teks dan angka di modul ini rekaan.

## Ingat kembali

Tutup modul ini dan jawab dari ingatan.

1. Tulis dua cara menggabungkan teks dan angka dalam `print`, dan jelaskan mengapa `"Umur: " + 12` menimbulkan `TypeError`. (`SMP8-2-M10`)
2. Sebut empat langkah memecahkan masalah dan satu cara meninjau ulang jawaban. (`SMP9-1-M1`)
3. Sebut jenis nilai dari `7`, `7.0`, dan `"7"`. (`SMP8-2-M3`)
4. Berapa nomor indeks isi pertama sebuah daftar Python? (`SMP8-2-M8`)

Kunci: (1) `print("Umur:", 12)` dan `print("Umur: " + str(12))`; `+` tidak menyambung teks dengan bilangan, jadi bilangan diubah dulu dengan `str()`; (2) pahami, rencanakan, kerjakan, tinjau ulang; cara lain, misalnya hitung dengan dua cara; (3) `int`, `float`, dan `str`; (4) 0.

## Tujuan

Setelah modul ini kamu dapat:

1. mengambil huruf dan potongan teks dengan indeks dan irisan;
2. memakai `len`, `upper`, `lower`, `strip`, `replace`, `count`, dan `split`;
3. memecah kalimat menjadi daftar kata lalu memprosesnya dengan `for`;
4. menjelaskan mengapa huruf pada teks tidak bisa diubah satu per satu.

## Prediksi dulu

Teks (*string*) adalah urutan huruf. Tiap huruf punya nomor indeks yang dimulai dari 0; indeks -1 berarti huruf terakhir. Spasi juga dihitung sebagai huruf. Program P:

```python
kalimat = "  Belajar Python itu seru  "
bersih = kalimat.strip()
print(len(kalimat), len(bersih))
print(bersih[0], bersih[-1])
print(bersih.upper())
kata = bersih.split()
print(len(kata), kata[1])
```

**Prediksi.** Apa yang tercetak pada empat baris keluaran? Tulis dulu.

**Jalankan.** Hitung panjang `bersih` huruf demi huruf dengan tangan, lalu jalankan.

**Selidiki.** Cocokkan dengan prediksimu. Mengapa dua angka pada baris pertama berbeda?

## Contoh terselesaikan

Keluaran P: `27 23`, lalu `B u`, lalu `BELAJAR PYTHON ITU SERU`, lalu `4 Python`. `strip()` membuang spasi di awal dan akhir, empat spasi semuanya, jadi 27 menjadi 23. `split()` memecah di spasi menjadi daftar empat kata, dan `kata[1]` adalah isi kedua, `Python`, karena indeks mulai dari 0.

Program kedua memproses satu kalimat:

```python
kalimat = "Ibu pergi ke pasar dan membeli apel"
hitung = kalimat.lower().count("a")
kata = kalimat.split()
print("Jumlah kata:", len(kata))
print("Huruf a:", hitung)
print("Kata pertama:", kata[0], "dengan", len(kata[0]), "huruf")
print("Ada 'pasar'?", "pasar" in kalimat)
print(kalimat.replace("apel", "jeruk"))
```

Tercetak `Jumlah kata: 7`, `Huruf a: 4`, `Kata pertama: Ibu dengan 3 huruf`, `Ada 'pasar'? True`, lalu `Ibu pergi ke pasar dan membeli jeruk`. Tinjau ulang: hitung huruf `a` sendiri, yaitu `pasar` 2, `dan` 1, `apel` 1, jumlahnya 4.

Pecahan teks dengan pemisah lain: `"Murid-01,80".split(",")` menghasilkan daftar `['Murid-01', '80']`; bagian keduanya masih teks, jadi `int("80")` mengubahnya menjadi 80.

Tiga hal yang perlu diingat. Pertama, indeks dimulai dari 0 dan indeks di luar panjang menimbulkan `IndexError`. Kedua, metode seperti `upper()` menghasilkan teks baru dan tidak mengubah teks asal. Ketiga, teks tidak bisa diubah per huruf: `kata[0] = "I"` menimbulkan `TypeError`.

## Contoh setengah jadi

Program yang menyusun huruf pertama tiap kata menjadi singkatan. Isi bagian kosong.

```python setengah-jadi
kalimat = "Belajar Python itu seru"
inisial = ""
for kata in kalimat.____():
    inisial = inisial + kata[____]
print(____)
```

Telusuri: apa isi `inisial` sesudah tiap putaran?

## Susun urutannya

Empat baris berikut sudah diacak. Susun menjadi program yang mencetak jumlah kata sebuah kalimat.

- **A.** `kalimat = "Ibu pergi ke pasar"`
- **B.** `kata = kalimat.split()`
- **C.** `jumlah = len(kata)`
- **D.** `print("Jumlah kata:", jumlah)`

Tulis urutan hurufnya. Jelaskan mengapa C tidak boleh sebelum B.

## Latihan

1. **Ubah.** Ubah program kedua agar menghitung huruf `e`. Berapa hasilnya?
2. **Buat.** Tulis program yang membaca satu kata dengan `input`, lalu mencetak panjangnya, huruf pertamanya, dan huruf terakhirnya. Telusuri untuk `informatika`.
3. **Selidiki.** Untuk `kata = "informatika"`, apa yang terjadi pada `print(kata[11])` dan pada `kata[0] = "I"`? Tulis jenis galat dan sebabnya.
4. **Jelaskan.** Sesudah `kalimat.upper()` tanpa menyimpan hasilnya, mengapa `kalimat` tidak berubah?

## Latihan bercampur

1. `daftar = ["a", "b", "c"]`, lalu `daftar.append("d")`, lalu `print(len(daftar), daftar[3])`. Apa yang tercetak? (`SMP8-2-M8`)
2. `def ganda(n):` berisi `return n * 2`. Apa yang tercetak oleh `print(ganda("ha"))` dan `print(ganda(7))`? (`SMP8-2-M9`)

## Ulang berjarak

Kerjakan ulang tanpa melihat modul ini, lalu cocokkan:

- **Minggu depan** (`SMP9-1-M3`): tulis program yang memecah `"ayo belajar python"` menjadi kata dan mencetak kata terakhirnya.
- **Beberapa minggu lagi** (`SMP9-1-M4`): pecah `"Murid-01,80"` menjadi dua bagian dan ubah bagian kedua menjadi bilangan.
- **Sekitar dua bulan lagi** (`SMP9-1-M9`): tulis dari ingatan program yang memeriksa apakah sebuah kata ada di dalam kalimat, dengan memecah kalimat menjadi daftar kata.

## Kesalahan umum

- **Mengira indeks pertama adalah 1.** Kenali: huruf pertama terlewat atau muncul `IndexError` di ujung.
- **Mengira `upper()` mengubah teks asal.** Kenali: teks yang dicetak masih huruf kecil.
- **Mengubah huruf lewat indeks.** Kenali: `TypeError` pada baris `kata[0] = ...`.
- **Menulis teks yang dicari tanpa tanda kutip.** Kenali: `NameError` karena Python mengira itu nama variabel.
- **Memecah dengan `split(" ")` pada spasi ganda.** Kenali: daftar berisi teks kosong, misalnya `['', '', 'ayo', '', 'belajar', '', '']`.

## Cek mandiri

Tutup modul, jawab tanpa melihat, lalu periksa.

1. Tulis program yang mencetak jumlah kata pada `"saya suka belajar"`.
2. Apa nilai `"informatika"[0:4]` dan `"informatika"[-3:]`?
3. Mengapa `kata[11]` menimbulkan galat untuk `kata = "informatika"`?

Daftar periksa (kosong; kamu isi sendiri, tidak dikumpulkan):

- [ ] Aku bisa memakai indeks dan irisan pada teks.
- [ ] Aku bisa memecah kalimat dan memprosesnya.
- [ ] Aku bisa menjelaskan mengapa teks tidak bisa diubah per huruf.

Kunci: (1) `print(len("saya suka belajar".split()))`, tercetak 3; (2) `info` dan `ika`; (3) panjangnya 11, jadi indeks yang ada hanya 0 sampai 10.

## Langkah berikutnya

`SMP9-1-M3`, "Pasangan kunci-nilai (*dictionary*), pengantar". Kamu menyimpan pasangan seperti kata dan artinya dalam satu nama dan mencarinya lewat kuncinya.

## Catatan untuk guru

- **Waktu:** 2 JP x 40 menit `[asumsi]` (silabus bagian 2). Berpasangan boleh untuk "Prediksi dulu" dan "Latihan"; bukan jaminan efek belajar.
- **Alat:** editor Python 3. Penulis menjalankan setiap program dengan `python3 -I` (Python 3.12.3); keluaran di modul sama dengan hasilnya. Perilaku indeks, irisan, `len`, dan metode `strip`, `upper`, `lower`, `count`, `replace`, `split` dicocokkan dengan dokumentasi resmi Python (tutorial bagian teks dan referensi tipe bawaan).
- **Butir CP:** corpus memetakan minggu ini ke `DK-BK-c*` (irisan); `cpCodes` modul kosong karena pemrograman teks melampaui rumusan CP. Modul tidak menyatakan CP "terpenuhi".
- **Kunci "Prediksi dulu":** `27 23`, `B u`, `BELAJAR PYTHON ITU SERU`, `4 Python`. Dua angka berbeda karena `strip()` membuang empat spasi.
- **Kunci "Contoh setengah jadi":** `split`, `0`, `inisial`. Isi `inisial`: `B`, `BP`, `BPi`, `BPis`; tercetak `BPis`.
- **Kunci "Susun urutannya":** A, B, C, D. `len(kata)` memerlukan daftar `kata` yang sudah dibuat.
- **Kunci latihan:** (1) `count("e")` menghasilkan 5: `pergi` 1, `ke` 1, `membeli` 2, `apel` 1. (2) `kata = input("Kata? ")`, `print(len(kata))`, `print(kata[0])`, `print(kata[-1])`; untuk `informatika`: 11, `i`, `a`. (3) `IndexError: string index out of range` karena indeks 11 melewati panjang; `TypeError: 'str' object does not support item assignment` karena teks tidak bisa diubah per huruf (buat teks baru, misalnya `"I" + kata[1:]`). (4) `upper()` mengembalikan teks baru; tanpa disimpan ke variabel hasilnya hilang.
- **Kunci "Latihan bercampur":** (1) `4 d`. (2) `haha` dan `14`; `*` pada teks mengulang teks.
- **Kunci "Ulang berjarak":** minggu depan: `kata = "ayo belajar python".split()` lalu `print(kata[-1])`, tercetak `python`; beberapa minggu lagi: `['Murid-01', '80']` dan `int("80")` menghasilkan 80; sekitar dua bulan lagi: `kata = kalimat.split()` lalu `if "pasar" in kata:` (atau `for` yang membandingkan tiap kata).
- **Petunjuk bertahap:** (a) tulis tiap huruf dengan nomor indeksnya; (b) tentukan metode yang menghasilkan teks baru; (c) telusuri dengan tabel; (d) tinjau ulang dengan menghitung sendiri.
- **AI:** tanpa AI. Kebijakan `smp-coding` (silabus bagian 7.1): AI generatif hanya demonstrasi guru, tanpa akun murid; asesmen tanpa AI.
- **Privasi:** semua teks rekaan; "Murid-01" bukan nama nyata; tanpa nama murid pada berkas.
- **Unsur pembelajaran:** ingat kembali dan jarak (`K`), PRIMM (`K` usia 11 sampai 14), tabel penelusuran (`K`), contoh lengkap lalu setengah jadi (`K`), Parsons (`M`), latihan bercampur (`K`).
