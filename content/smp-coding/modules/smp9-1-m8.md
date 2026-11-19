## Untuk siapa modul ini

Modul ini untuk murid kelas 9 pada minggu kedelapan semester pertama. Kamu memakai editor Python (atau kertas untuk menelusuri). Waktunya satu pertemuan, 2 JP. Prasyaratnya `SMP9-1-M1` (pemecahan masalah: tinjau ulang dan pola). Semua angka di modul ini rekaan.

## Ingat kembali

Tutup modul ini dan jawab dari ingatan.

1. Sebut dua cara berbeda meninjau ulang sebuah jawaban. (`SMP9-1-M1`)
2. Sebut dua cara berbeda memeriksa apakah sebuah bilangan prima. (`SMP8-1-M5`)
3. Tulis dua fungsi berbeda yang menghitung jumlah 1 sampai `n`, misalnya satu dengan `for`. (`SMP8-2-M9`)
4. Tulis dua cara berbeda untuk mencetak batang teks `#` sebanyak `n`. (`SMP9-1-M7`)

Kunci: (1) menghitung dengan cara lain lalu mencocokkan hasilnya; mencoba kasus kecil yang bisa dihitung dengan tangan; (2) mengumpulkan semua faktor lalu memeriksa bahwa faktornya tepat dua; atau mencari pembagi dari 2 dan berhenti begitu ada yang habis membagi; (3) `def jumlah(n):` berisi `total = 0`, `for i in range(1, n + 1):` dengan `total = total + i` menjorok, lalu `return total`; atau `return n * (n + 1) // 2`; (4) `print("#" * n)`; atau `batang = ""`, `for i in range(n):` berisi `batang = batang + "#"`, lalu `print(batang)`.

## Tujuan

Setelah modul ini kamu dapat:

1. menulis dua program berbeda untuk satu soal yang sama;
2. menguji keduanya dengan masukan yang sama, termasuk kasus kecil dan batas;
3. membandingkan keduanya dari tiga sisi: benar, banyak langkah, dan mudah dibaca;
4. memilih satu program dan menuliskan alasannya.

## Prediksi dulu

Satu soal sering punya lebih dari satu penyelesaian. Soal: berapa banyak bilangan dari 1 sampai `n` yang habis dibagi 3? Dua program:

```python
def banyak_a(n):
    hitung = 0
    for i in range(1, n + 1):
        if i % 3 == 0:
            hitung = hitung + 1
    return hitung


def banyak_b(n):
    return n // 3


print(banyak_a(10), banyak_b(10))
print(banyak_a(100), banyak_b(100))
print(banyak_a(2), banyak_b(2))
```

`//` membagi dan membuang bagian desimal.

**Prediksi.** Apa yang tercetak pada tiga baris? Apakah dua program selalu memberi angka yang sama? Tulis dulu.

**Jalankan.** Telusuri `banyak_a(10)` dengan tabel `i`, `i % 3`, dan `hitung`, lalu jalankan.

**Selidiki.** Cocokkan dengan prediksimu. Apa yang berbeda pada cara kerja keduanya?

## Contoh terselesaikan

Tercetak `3 3`, `33 33`, lalu `0 0`. Pada `banyak_a(10)`, hanya `i` = 3, 6, dan 9 yang menambah `hitung`, jadi hasilnya 3. Pada `banyak_b(10)`, `10 // 3` langsung 3. Jawabannya sama, tetapi jalannya beda: `banyak_a` mengulang `n` kali, `banyak_b` satu hitungan.

Contoh kedua: apakah `n` bilangan prima? Dua cara berhenti pada saat yang berbeda.

```python
def prima_a(n):
    if n < 2:
        return False
    for i in range(2, n):
        if n % i == 0:
            return False
    return True


def prima_b(n):
    if n < 2:
        return False
    i = 2
    while i * i <= n:
        if n % i == 0:
            return False
        i = i + 1
    return True


print(prima_a(97), prima_b(97))
print(prima_a(91), prima_b(91))
print(prima_a(1), prima_b(1))
```

Tercetak `True True`, `False False`, `False False`. Cara B berhenti saat `i * i` melewati `n`. Alasannya: bila `n` = `p` kali `q` dengan `p` tidak lebih besar dari `q`, maka `p` kali `p` tidak lebih besar dari `n`, jadi pembagi terkecil pasti ketemu sebelum `i * i` melewati `n`.

| | Cara A | Cara B |
| --- | --- | --- |
| Benar? | ya, sama pada semua `n` dari 0 sampai 199 yang diuji | ya, sama |
| Pemeriksaan untuk 97 | 95 kali (`i` dari 2 sampai 96) | 8 kali (`i` dari 2 sampai 9) |
| Pemeriksaan untuk 91 | 6 kali | 6 kali |
| Mudah dibaca | pendek | perlu penjelasan batas |

Urutan menilai: benar dulu, lalu langkah dan keterbacaan. Program yang cepat tetapi salah di batas tidak berguna. Untuk 91 (7 kali 13) kedua cara sama banyak, jadi selisih langkah bergantung pada masukan.

## Contoh setengah jadi

Dua cara mencetak batang `#` sebanyak `n`. Isi bagian kosong, lalu tulis apa yang tercetak.

```python setengah-jadi
n = 5
print(____ * n)
batang = ""
for i in range(____):
    batang = batang + ____
print(batang)
```

## Susun urutannya

Lima langkah membandingkan dua solusi sudah diacak. Susun menjadi urutan yang masuk akal.

- **A.** Tulis soal dan hasil yang diharapkan untuk contoh kecil.
- **B.** Tulis solusi pertama dan solusi kedua.
- **C.** Jalankan keduanya pada masukan yang sama: kecil, biasa, batas.
- **D.** Bandingkan: benar, banyak langkah, mudah dibaca.
- **E.** Pilih satu dan tulis alasannya.

Tulis urutan hurufnya. Jelaskan mengapa C harus sebelum D.

## Latihan

1. **Ubah.** Ubah dua program di "Prediksi dulu" menjadi kelipatan 5. Berapa hasilnya untuk `n` = 23?
2. **Buat.** Tulis dua program berbeda yang menghitung banyak huruf `"a"` dalam sebuah kata, satu dengan `for` dan satu dengan `count`. Ujikan pada `"banana"` dan `""`.
3. **Selidiki.** Seorang murid menulis `while i * i < n` pada cara B. Ujikan untuk `n` = 4 dan `n` = 9. Apa yang salah?
4. **Jelaskan.** Mengapa dua program yang sama-sama benar masih perlu dibandingkan?

## Latihan bercampur

1. Hitung rata-rata `[4, 6, 8]` dengan program. (`SMP9-1-M5`)
2. Berapa nilai `"kakak".count("ka")`? (`SMP9-1-M2`)

## Ulang berjarak

Kerjakan ulang tanpa melihat modul ini, lalu cocokkan:

- **Minggu depan** (`SMP9-1-M9`): tulis dua cara memeriksa apakah 7 ada di daftar `[3, 7, 9]`, satu dengan `for` dan satu dengan `in`.
- **Akhir semester** (`SMP9-1-M14`): tulis dua fungsi berbeda yang menghitung banyak kelipatan 3 dari 1 sampai `n`, dan pilih satu dengan alasan.
- **Semester depan** (`SMP9-2-M14`): sebut tiga hal yang dibandingkan dari dua program untuk soal yang sama.

## Kesalahan umum

- **Menganggap lulus satu kasus berarti benar.** Kenali: program gagal pada kasus kecil atau batas yang belum kamu coba.
- **Memilih karena lebih pendek saja.** Kenali: kamu tidak bisa menjelaskan mengapa program itu benar.
- **Mengira langkah sedikit selalu lebih baik.** Kenali: kamu belum mengujinya di batas, misalnya `n` = 4.
- **Membandingkan dengan masukan yang berbeda.** Kenali: hasilnya tidak bisa dicocokkan.
- **Salah batas `<` dan `<=`.** Kenali: kuadrat sempurna seperti 4 dan 9 dinyatakan prima.

## Cek mandiri

Tutup modul, jawab tanpa melihat, lalu periksa.

1. Tulis dua program berbeda yang menghitung banyak kelipatan 4 dari 1 sampai `n`, dan hasilnya untuk `n` = 20.
2. Sebut tiga hal yang dibandingkan dari dua solusi.
3. Mengapa `n // 3` benar untuk `n` = 2?

Daftar periksa (kosong; kamu isi sendiri, tidak dikumpulkan):

- [ ] Aku bisa menulis dua program berbeda untuk satu soal.
- [ ] Aku menguji keduanya dengan masukan yang sama.
- [ ] Aku bisa memilih satu dengan alasan.

Kunci: (1) `for i in range(1, n + 1):` dengan `if i % 4 == 0:` menambah `hitung`; dan `return n // 4`; keduanya 5 untuk `n` = 20; (2) benar, banyak langkah, mudah dibaca; (3) tidak ada bilangan dari 1 sampai 2 yang habis dibagi 3, dan `2 // 3` bernilai 0.

## Langkah berikutnya

`SMP9-1-M9`, "Mencari dan mengurutkan dengan kode". Kamu menulis pencarian dalam daftar dengan dua cara dan membandingkan banyak langkahnya, lalu mengurutkan daftar kecil.

## Catatan untuk guru

- **Waktu:** 2 JP x 40 menit `[asumsi]` (silabus bagian 2). Berpasangan boleh untuk "Prediksi dulu" dan "Latihan"; bukan jaminan efek belajar.
- **Alat:** editor Python 3. Penulis menjalankan setiap program dengan `python3 -I` (Python 3.12.3); keluaran di modul sama dengan hasilnya. Penulis juga menjalankan `prima_a` dan `prima_b` untuk semua `n` dari 0 sampai 199 (hasilnya sama) dan menghitung ulang jumlah pemeriksaan: 97 memberi 95 dan 8, 91 memberi 6 dan 6. Perbandingan langkah bukan pengukuran waktu; modul tidak mengklaim kecepatan.
- **Butir CP:** corpus memetakan minggu ini ke `D-BK-a`. Modul tidak menyatakan CP "terpenuhi"; ia hanya melatih menulis, menguji, dan membandingkan dua penyelesaian.
- **Kunci "Prediksi dulu":** `3 3`, `33 33`, `0 0`. Penelusuran `banyak_a(10)`: `i` 1 sampai 10; `i % 3` bernilai 0 untuk 3, 6, 9; `hitung` 1, 2, 3. Dua program tidak selalu sama pada soal lain; di sini sama pada ketiga masukan.
- **Kunci "Contoh setengah jadi":** `"#"`, `n`, `"#"`. Tercetak `#####` dua kali.
- **Kunci "Susun urutannya":** A, B, C, D, E. Perbandingan hanya adil bila dua program sudah dijalankan pada masukan yang sama.
- **Kunci latihan:** (1) `banyak_a` dengan `i % 5 == 0` dan `banyak_b` dengan `n // 5`; `n` = 23 memberi 4 (5, 10, 15, 20). (2) contoh: `hitung = 0`, `for huruf in kata:` berisi `if huruf == "a":` lalu `hitung = hitung + 1`; dan `kata.count("a")`; `"banana"` memberi 3 dan `""` memberi 0. (3) `i * i < n` melewatkan `i` yang kuadratnya tepat `n`: untuk 4, perulangan tidak berjalan sehingga tercetak `True` (seharusnya `False`); untuk 9, `i` berhenti di 2 sehingga `True` (seharusnya `False`). (4) benar pada satu kasus belum berarti benar; keduanya dapat berbeda dalam langkah dan keterbacaan, dan pilihan perlu alasan.
- **Kunci "Latihan bercampur":** (1) 6.0. (2) 2.
- **Kunci "Ulang berjarak":** minggu depan: `for x in daftar:` dengan `if x == 7:` lalu `ketemu = True`; dan `7 in daftar`; akhir semester: dua fungsi seperti "Prediksi dulu"; semester depan: benar, banyak langkah, mudah dibaca.
- **Petunjuk bertahap:** (a) tulis hasil yang diharapkan untuk contoh kecil; (b) tulis satu solusi dan ujikan; (c) tulis solusi kedua dengan cara lain; (d) bandingkan pada masukan yang sama.
- **AI:** tanpa AI. Kebijakan `smp-coding` (silabus bagian 7.1): AI generatif hanya demonstrasi guru, tanpa akun murid; asesmen tanpa AI.
- **Privasi:** semua angka dan data rekaan; jangan memakai data teman sekelas atau data sekolah nyata.
- **Unsur pembelajaran:** ingat kembali dan jarak (`K`), PRIMM (`K` usia 11 sampai 14), tabel penelusuran (`K`), contoh lengkap lalu setengah jadi (`K`), Parsons (`M`), latihan bercampur (`K`).
