## Untuk siapa modul ini

Modul ini untuk murid kelas 8 pada minggu kesembilan semester kedua. Kamu memakai editor Python yang disiapkan gurumu dan kertas untuk tabel pemanggilan. Python adalah pengayaan di luar capaian pembelajaran. Waktunya satu pertemuan, 2 JP. Prasyaratnya `SMP8-2-M8` (daftar). Semua nama dan angka di modul ini rekaan.

## Ingat kembali

Tutup modul ini dan jawab dari ingatan.

1. Tulis daftar `[4, 7, 1]` dan cetak jumlah isinya dengan `for`. (`SMP8-2-M8`)
2. Tulis padanan Python untuk `set [skor] to (0)`, lalu `repeat (3)` berisi `change [skor] by (2)`, lalu `say (skor)`. (`SMP8-2-M6`)
3. Tulis `if` dan `else` yang mencetak `Lulus` bila `nilai >= 60`, selain itu `Ulang`. (`SMP8-2-M4`)
4. Jelaskan satu manfaat merapikan program berulang dengan blok buatan sendiri. (`SMP8-1-M2`)

Kunci: (1) `angka = [4, 7, 1]`, `total = 0`, `for a in angka:` lalu `total = total + a` menjorok, `print(total)`; hasil 12; (2) `skor = 0`, `for i in range(3):` lalu `skor = skor + 2` menjorok, `print(skor)`; hasil 6; (3) `if nilai >= 60:` lalu `print("Lulus")`, `else:` lalu `print("Ulang")`; (4) contoh: bagian yang berulang ditulis satu kali, jadi perbaikan cukup di satu tempat.

## Tujuan

Setelah modul ini kamu dapat:

1. menulis fungsi dengan `def`, parameter, dan `return`;
2. memanggil fungsi dengan argumen dan menelusurinya dengan tabel;
3. menjelaskan beda `print` dan `return` di dalam fungsi;
4. menulis program dengan dua fungsi.

## Prediksi dulu

Fungsi adalah blok buatan sendiri versi teks. `def` memberi nama pada beberapa baris, **parameter** adalah masukan fungsi, dan `return` mengirim hasil kembali. Nilai yang kamu kirim saat memanggil disebut **argumen**. Program P:

```python
def kuadrat(x):
    return x * x

def sapa(nama):
    print("Halo,", nama)

a = kuadrat(4)
sapa("Murid-01")
print(a)
print(kuadrat(a))
```

**Prediksi.** Apa yang dicetak, baris demi baris? Berapa nilai `a`? Tulis dulu.

**Jalankan.** Telusuri dengan tabel: kolom pemanggilan, nilai `x` atau `nama`, dan nilai yang dikembalikan.

**Selidiki.** Cocokkan dengan prediksimu, lalu jalankan. Apakah `def` saja menjalankan isinya?

## Contoh terselesaikan

Penelusuran P:

| pemanggilan | masukan | nilai kembali | tercetak |
| --- | --- | --- | --- |
| `kuadrat(4)` | `x` = 4 | 16 | (tidak ada) |
| `sapa("Murid-01")` | `nama` = Murid-01 | (tidak ada) | `Halo, Murid-01` |
| `print(a)` | | | `16` |
| `kuadrat(a)` | `x` = 16 | 256 | `256` |

`def` hanya mendaftarkan fungsi; isinya berjalan saat dipanggil. Program dengan dua fungsi:

```python
def jumlah(daftar):
    total = 0
    for angka in daftar:
        total = total + angka
    return total

def rata_rata(daftar):
    return jumlah(daftar) / len(daftar)

nilai = [70, 80, 90, 60]
print(jumlah(nilai))
print(rata_rata(nilai))
```

Tercetak `300` lalu `75.0`. `rata_rata` memanggil `jumlah`, jadi satu fungsi boleh memakai fungsi lain. Beda `print` dan `return`:

```python
def tambah_print(a, b):
    print(a + b)

hasil = tambah_print(2, 3)
print(hasil)
```

Tercetak `5` lalu `None`. `print` hanya menampilkan; fungsi tanpa `return` mengembalikan `None`, yang berarti tidak ada nilai. Bila hasilnya mau dipakai lagi, gunakan `return`. Nama yang dibuat di dalam fungsi, seperti `total`, hanya dikenal di dalam fungsi itu.

## Contoh setengah jadi

Fungsi untuk umur tahun depan. Isi bagian kosong.

```python setengah-jadi
def tahun_depan(umur):
    return ____

def salam(nama, umur):
    print("Halo,", ____, "- tahun depan kamu", tahun_depan(____))

salam("Murid-02", 12)
```

Apa yang tercetak? Telusuri nilai `umur` pada tiap fungsi.

## Susun urutannya

Empat baris berikut sudah diacak. Susun menjadi program yang mencetak `10`.

- **A.** `def ganda(n):`
- **B.** `    return n * 2` (menjorok di bawah `def`)
- **C.** `hasil = ganda(5)`
- **D.** `print(hasil)`

Tulis urutan hurufnya. Mengapa `def` harus ada sebelum pemanggilan?

## Latihan

1. **Ubah.** Ubah `kuadrat` menjadi `kubik` (tiga kali kali). Berapa `kubik(3)`?
2. **Buat.** Tulis fungsi `lebih_besar(a, b)` yang mengembalikan angka yang lebih besar, lalu panggil dengan 4 dan 9.
3. **Selidiki.** Setelah `hasil = tambah_print(2, 3)`, baris `print(hasil + 1)` menghasilkan galat. Mengapa?
4. **Jelaskan.** Dengan dua kalimat, sebut beda parameter dan argumen.

## Latihan bercampur

1. Pakai `jumlah` dari contoh. Berapa `jumlah([2, 4, 6])`? (`SMP8-2-M8`)
2. `total = 0`, lalu `for i in range(1, 5):` berisi `if i % 2 == 0:` lalu `total = total + i`, lalu `print(total)`. Berapa yang tercetak? (`SMP8-2-M5` dan `SMP8-2-M4`)

## Ulang berjarak

Kerjakan ulang tanpa melihat modul ini, lalu cocokkan:

- **Minggu depan** (`SMP8-2-M10`): jelaskan apa yang terjadi bila fungsi `kuadrat(x)` dipanggil dengan dua argumen, `kuadrat(2, 3)`.
- **Akhir semester** (`SMP8-2-M14`): jelaskan beda `print` dan `return` di dalam fungsi.
- **Semester depan** (`SMP9-1-M8`): tulis dua fungsi berbeda yang menghitung jumlah 1 sampai `n`, misalnya satu dengan `for`.

## Kesalahan umum

- **Memanggil fungsi sebelum `def`.** Kenali: `NameError: name '...' is not defined`.
- **Lupa `return` lalu memakai hasilnya.** Kenali: nilainya `None` dan hitungan berikutnya berhenti dengan galat.
- **Jorokan salah.** Baris di bawah `def` harus menjorok; kenali dari `IndentationError`.
- **Memakai nama dari dalam fungsi di luarnya.** Kenali: `NameError` pada `total`, karena nama itu hidup di dalam fungsi saja.
- **Menulis `def` tetapi tidak pernah memanggil.** Kenali: tidak ada yang tercetak.

## Cek mandiri

Tutup modul, jawab tanpa melihat, lalu periksa.

1. Tulis fungsi `ganda(n)` yang mengembalikan dua kali `n`, lalu cetak `ganda(7)`.
2. Apa beda `print` dan `return` dalam fungsi?
3. Apa yang dicetak `print(tambah_print(2, 3))`, dan mengapa?

Daftar periksa (kosong; kamu isi sendiri, tidak dikumpulkan):

- [ ] Aku bisa menulis fungsi dengan parameter dan `return`.
- [ ] Aku bisa menelusuri pemanggilan fungsi dengan tabel.
- [ ] Aku bisa menjelaskan beda `print` dan `return`.

Kunci: (1) `def ganda(n):` lalu `return n * 2` menjorok, `print(ganda(7))`; tercetak 14; (2) `print` menampilkan ke layar, `return` mengirim nilai kembali ke pemanggil agar bisa dipakai lagi; (3) `5` lalu `None`: `print` di dalam fungsi mencetak 5, dan fungsi tanpa `return` mengembalikan `None` untuk dicetak.

## Langkah berikutnya

`SMP8-2-M10`, "Membaca pesan galat dan debugging". Kamu membaca pesan yang Python tulis saat program berhenti, mencari baris dan jenis galatnya, lalu memperbaikinya.

## Catatan untuk guru

- **Waktu:** 2 JP x 40 menit `[asumsi]` (silabus bagian 2). Berpasangan boleh untuk "Prediksi dulu" dan "Latihan"; bukan jaminan efek belajar.
- **Alat:** Python 3 dengan editor sekolah. Penulis menjalankan semua program dengan Python 3.12.3 dan keluarannya sama dengan yang tertulis; pesan galat dapat berbeda antarversi. `def`, parameter, argumen, `return`, dan `None` dicocokkan dengan tutorial resmi Python bagian "Defining Functions". Blok buatan sendiri Scratch (`define`) tidak dicocokkan dengan dokumentasi blok resmi; guru memeriksanya di editor sebelum kelas.
- **Butir CP:** corpus memetakan minggu ini ke `DK-BK-c*` (irisan); `cpCodes` modul kosong karena pemrograman teks melampaui rumusan CP. Modul tidak menyatakan CP "terpenuhi".
- **Keluaran minggu:** program dengan dua fungsi (contoh `jumlah` dan `rata_rata`, atau Latihan 2 beserta satu fungsi lain).
- **Kunci "Prediksi dulu":** `Halo, Murid-01`, `16`, `256`; `a` = 16. `def` tidak menjalankan isi; hanya pemanggilan yang menjalankan.
- **Kunci "Contoh setengah jadi":** `umur + 1`, `nama`, `umur`. Tercetak `Halo, Murid-02 - tahun depan kamu 13`.
- **Kunci "Susun urutannya":** A, B, C, D. Python membaca dari atas; nama `ganda` harus sudah didaftarkan sebelum dipanggil.
- **Kunci latihan:** (1) `return x * x * x`; `kubik(3)` = 27. (2) `def lebih_besar(a, b):` berisi `if a > b:` lalu `return a`, dan `return b` di luar `if`; `lebih_besar(4, 9)` mengembalikan 9. (3) `tambah_print` tidak mengembalikan apa pun sehingga `hasil` berisi `None`, dan `None + 1` menghasilkan `TypeError`. (4) contoh: parameter adalah nama di dalam `def`; argumen adalah nilai yang dikirim saat memanggil.
- **Kunci "Latihan bercampur":** (1) 12. (2) 6 (2 + 4).
- **Kunci "Ulang berjarak" minggu depan:** `kuadrat(2, 3)` menghasilkan `TypeError` karena fungsi menerima satu argumen tetapi diberi dua.
- **Petunjuk bertahap:** (a) tulis nilai parameter saat dipanggil; (b) telusuri isi fungsi dengan nilai itu; (c) tulis nilai yang dikembalikan; (d) cek apakah ada `return`.
- **AI:** tanpa AI. Kebijakan `smp-coding` (silabus bagian 7.1): AI generatif hanya demonstrasi guru, tanpa akun murid; asesmen tanpa AI.
- **Privasi:** semua nama dan angka rekaan; tanpa nama murid pada berkas.
- **Unsur pembelajaran:** ingat kembali dan jarak (`K`), PRIMM (`K` usia 11 sampai 14), tabel penelusuran (`K`), contoh lengkap lalu setengah jadi (`K`), Parsons (`M`), latihan bercampur (`K`).
