## Untuk siapa modul ini

Modul ini untuk murid kelas 9 pada minggu kesembilan semester pertama. Kamu memakai editor Python (atau kertas untuk menelusuri). Waktunya satu pertemuan, 2 JP. Prasyaratnya `SMP7-2-M5` (mencari dan mengurutkan tanpa komputer) dan `SMP8-2-M8` (daftar di Python). Semua angka di modul ini rekaan.

## Ingat kembali

Tutup modul ini dan jawab dari ingatan.

1. Tulis dua cara memeriksa apakah 7 ada di daftar `[3, 7, 9]`, satu dengan `for` dan satu dengan `in`. (`SMP9-1-M8`)
2. Tulis program yang memeriksa apakah sebuah kata ada di dalam kalimat dengan memecah kalimat menjadi daftar kata. (`SMP9-1-M2`)
3. Tulis program yang memeriksa apakah satu nilai ada di dalam daftar, dengan `for`. (`SMP8-2-M8`)
4. Sebut dua cara mencari nilai dan syarat agar pencarian setengah-setengah boleh dipakai. (`SMP7-2-M5`)
5. Tulis fungsi `terbesar(daftar)` tanpa `max`. (`SMP8-2-M14`)

Kunci: (1) `for x in daftar:` dengan `if x == 7:` lalu `ketemu = True`; dan `7 in daftar`; (2) `kata = kalimat.split()`, lalu `for k in kata:` dengan `if k == "suka":`, atau `"suka" in kata`; (3) `ketemu = False`, `for n in daftar:` dengan `if n == x:` lalu `ketemu = True`; (4) memeriksa satu per satu dari awal, atau membuka tengah dan membuang separuh; syaratnya daftar sudah terurut; (5) `hasil = daftar[0]`, `for n in daftar:` dengan `if n > hasil:` lalu `hasil = n`, dan `return hasil`.

## Tujuan

Setelah modul ini kamu dapat:

1. menulis fungsi pencarian yang mengembalikan indeks atau -1;
2. menelusuri pencarian setengah-setengah pada daftar terurut dan menyebut syaratnya;
3. menulis pengurutan sederhana yang memilih nilai terkecil, dan memakai `sorted`;
4. membandingkan banyak pemeriksaan dua cara pencarian.

## Prediksi dulu

Fungsi `cari` mengembalikan nomor indeks nilai yang dicari, atau -1 bila tidak ada. Program P:

```python
def cari(daftar, x):
    for i in range(len(daftar)):
        if daftar[i] == x:
            return i
    return -1


nilai = [7, 3, 9, 3]
print(cari(nilai, 3))
print(cari(nilai, 5))
print(cari(nilai, 9))
```

**Prediksi.** Apa yang tercetak pada tiga baris? Mengapa -1 dipakai, bukan 0? Tulis dulu.

**Jalankan.** Telusuri `cari(nilai, 3)` dengan tabel `i`, `daftar[i]`, dan apakah sama, lalu jalankan.

**Selidiki.** Cocokkan dengan prediksimu. Mana yang dikembalikan bila nilainya muncul dua kali?

## Contoh terselesaikan

Tercetak `1`, `-1`, `2`. Indeks dimulai dari 0, jadi 0 adalah nomor yang sah; -1 tidak mungkin menjadi indeks sah di sini, jadi aman sebagai tanda "tidak ada". `return` di dalam `for` langsung menghentikan fungsi, sehingga yang dikembalikan adalah indeks pertama (1, bukan 3).

Pencarian setengah-setengah memeriksa isi di **tengah**. Syaratnya: daftar sudah terurut naik. Bila isi tengah lebih kecil dari yang dicari, buang bagian kiri; bila lebih besar, buang bagian kanan.

```python
def cari_bagi(daftar, x):
    bawah = 0
    atas = len(daftar) - 1
    while bawah <= atas:
        tengah = (bawah + atas) // 2
        print("periksa indeks", tengah)
        if daftar[tengah] == x:
            return tengah
        if daftar[tengah] < x:
            bawah = tengah + 1
        else:
            atas = tengah - 1
    return -1


urut = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91]
print(cari_bagi(urut, 23))
print(cari_bagi(urut, 50))
```

Tercetak:

```text
periksa indeks 4
periksa indeks 7
periksa indeks 5
5
periksa indeks 4
periksa indeks 7
periksa indeks 5
periksa indeks 6
-1
```

Mencari 23: indeks 4 berisi 16 (lebih kecil, `bawah` jadi 5), indeks 7 berisi 56 (lebih besar, `atas` jadi 6), indeks 5 berisi 23: ketemu, tiga pemeriksaan. Mencari 50 butuh empat pemeriksaan sebelum yakin tidak ada, sedangkan `cari` memeriksa sepuluh isi. Cara kedua jauh lebih hemat, tetapi hanya benar pada daftar terurut.

## Contoh setengah jadi

Pengurutan dengan memilih yang terkecil: tiap putaran mencari indeks nilai terkecil dari sisa daftar lalu menukarnya ke depan. Isi bagian kosong, lalu telusuri `urutkan([4, 9, 2, 7])`.

```python setengah-jadi
def urutkan(daftar):
    for i in range(len(daftar)):
        k = i
        for j in range(i + 1, len(daftar)):
            if daftar[j] ____ daftar[k]:
                k = j
        sementara = daftar[i]
        daftar[i] = daftar[k]
        daftar[k] = ____
    return daftar


print(urutkan([4, 9, 2, 7]))
```

Python sudah menyediakan `sorted(daftar)`, yang mengembalikan daftar baru terurut, dan `daftar.sort()`, yang mengubah daftar itu sendiri.

## Susun urutannya

Lima langkah pencarian setengah-setengah sudah diacak. Susun menjadi urutan yang masuk akal.

- **A.** Isi `bawah` dengan 0 dan `atas` dengan indeks terakhir.
- **B.** Selama `bawah` belum melewati `atas`, hitung `tengah`.
- **C.** Bila isi `tengah` sama dengan yang dicari, kembalikan `tengah`.
- **D.** Bila tidak sama, geser `bawah` ke `tengah + 1` atau `atas` ke `tengah - 1`, lalu ulangi dari B.
- **E.** Bila perulangan selesai, kembalikan -1.

Tulis urutan hurufnya. Jelaskan mengapa E paling akhir.

## Latihan

1. **Ubah.** Ubah `cari` menjadi `banyak(daftar, x)` yang mengembalikan berapa kali `x` muncul. Berapa hasil `banyak([7, 3, 9, 3], 3)`?
2. **Buat.** Tulis `ada(daftar, x)` yang mengembalikan `True` atau `False` tanpa `in`, lalu ujikan pada kata-kata dari kalimat rekaan.
3. **Selidiki.** Jalankan `cari_bagi([9, 2, 7, 4], 4)`. Daftar itu belum terurut. Apa hasilnya, dan apa yang salah?
4. **Jelaskan.** Mengapa pencarian setengah-setengah tidak boleh dipakai pada daftar yang belum terurut?

## Latihan bercampur

1. Berapa `len("a,b,c".split(","))`? (`SMP9-1-M2`)
2. Berapa nilai `{"a": 1}.get("b", 0)`? (`SMP9-1-M3`)

## Ulang berjarak

Kerjakan ulang tanpa melihat modul ini, lalu cocokkan:

- **Minggu depan** (`SMP9-1-M10`): tulis fungsi `cari(daftar, x)` yang mengembalikan indeks pertama atau -1.
- **Akhir semester** (`SMP9-1-M14`): telusuri `cari([7, 3, 9, 3], 3)` dan tulis `cari` dari ingatan.
- **Semester depan** (`SMP9-2-M11`): sebut apa yang dilakukan pencarian setengah-setengah dan satu syarat daftarnya.

## Kesalahan umum

- **Menaruh `return -1` di dalam perulangan.** Kenali: `cari([7, 3], 3)` mengembalikan -1 padahal 3 ada.
- **Memakai pencarian setengah-setengah pada daftar tak terurut.** Kenali: nilai yang ada dinyatakan tidak ada.
- **Menulis `bawah = tengah` tanpa `+ 1`.** Kenali: perulangan tidak pernah berhenti.
- **Menulis `daftar = daftar.sort()`.** Kenali: `daftar` berisi `None`, karena `sort()` mengubah daftar di tempat dan tidak mengembalikan apa-apa.
- **Lupa `sementara` saat menukar.** Kenali: dua isi menjadi sama dan satu nilai hilang.

## Cek mandiri

Tutup modul, jawab tanpa melihat, lalu periksa.

1. Berapa `cari([5, 2, 8], 8)`?
2. Sebut syarat pencarian setengah-setengah.
3. Apa yang tercetak: `d = [3, 1, 2]`, `d.sort()`, `print(d)`?

Daftar periksa (kosong; kamu isi sendiri, tidak dikumpulkan):

- [ ] Aku bisa menulis fungsi pencarian yang mengembalikan indeks atau -1.
- [ ] Aku bisa menelusuri pencarian setengah-setengah.
- [ ] Aku bisa menyebut syaratnya.

Kunci: (1) 2; (2) daftar sudah terurut; (3) `[1, 2, 3]`.

## Langkah berikutnya

`SMP9-1-M10`, "Bilangan acak dan simulasi". Kamu memakai bilangan acak untuk melempar dadu di Python, menghitung hasilnya dengan kamus, dan menuliskan asumsi simulasimu.

## Catatan untuk guru

- **Waktu:** 2 JP x 40 menit `[asumsi]` (silabus bagian 2). Berpasangan boleh untuk "Prediksi dulu" dan "Latihan"; bukan jaminan efek belajar.
- **Alat:** editor Python 3. Penulis menjalankan setiap program dengan `python3 -I` (Python 3.12.3); keluaran di modul sama dengan hasilnya. Perilaku `sorted` dan `list.sort` dicocokkan dengan dokumentasi resmi Python. Pengurutan di sini sengaja hanya satu algoritma sederhana; modul tidak mengklaim satu algoritma lebih baik secara umum.
- **Butir CP:** corpus memetakan minggu ini ke `D-BK-a` (dan `DK-BK-c*`, irisan yang tidak diklaim). Modul tidak menyatakan CP "terpenuhi"; ia hanya melatih menulis dan membandingkan pencarian dan pengurutan kecil.
- **Kunci "Prediksi dulu":** `1`, `-1`, `2`. Penelusuran `cari(nilai, 3)`: `i` 0 (7, tidak), `i` 1 (3, ya, kembali 1). Indeks 0 adalah indeks sah, jadi -1 dipakai sebagai tanda tidak ada. Bila muncul dua kali, yang dikembalikan indeks pertama.
- **Kunci "Contoh setengah jadi":** `<`, `sementara`. Tercetak `[2, 4, 7, 9]`. Penelusuran: `i` = 0 menukar 4 dengan 2 menjadi `[2, 9, 4, 7]`; `i` = 1 menukar 9 dengan 4 menjadi `[2, 4, 9, 7]`; `i` = 2 menukar 9 dengan 7 menjadi `[2, 4, 7, 9]`; `i` = 3 tidak berubah.
- **Kunci "Susun urutannya":** A, B, C, D, E. Pengembalian -1 hanya boleh setelah semua bagian yang mungkin habis diperiksa.
- **Kunci latihan:** (1) tambah `hitung = 0` lalu `hitung = hitung + 1` bila sama dan `return hitung` di akhir; hasil 2. (2) `for n in daftar:` dengan `if n == x:` lalu `return True`; `return False` di luar perulangan. (3) tercetak `periksa indeks 1`, `periksa indeks 2`, lalu `-1`: 4 ada di indeks 3, tetapi daftar tak terurut sehingga bagian kanan terbuang. Pencarian 7 pada daftar yang sama kebetulan ketemu (indeks 2); itu kebetulan, bukan bukti. (4) pembuangan separuh hanya sah bila isi di kiri tengah lebih kecil dan di kanan lebih besar.
- **Kunci "Latihan bercampur":** (1) 3. (2) 0.
- **Kunci "Ulang berjarak":** minggu depan: `for i in range(len(daftar)):` dengan `if daftar[i] == x:` lalu `return i`, dan `return -1` di luar `for`; akhir semester: hasil 1; semester depan: membuang separuh daftar tiap langkah berdasarkan isi tengah; daftar harus terurut.
- **Petunjuk bertahap:** (a) tulis hasil yang diharapkan untuk contoh kecil; (b) telusuri dengan tabel; (c) tulis `for` dan `if`; (d) tambah `return -1` di luar perulangan.
- **AI:** tanpa AI. Kebijakan `smp-coding` (silabus bagian 7.1): AI generatif hanya demonstrasi guru, tanpa akun murid; asesmen tanpa AI.
- **Privasi:** semua angka dan kalimat rekaan; jangan memakai data teman sekelas atau data sekolah nyata.
- **Unsur pembelajaran:** ingat kembali dan jarak (`K`), PRIMM (`K` usia 11 sampai 14), tabel penelusuran (`K`), contoh lengkap lalu setengah jadi (`K`), Parsons (`M`), latihan bercampur (`K`).
