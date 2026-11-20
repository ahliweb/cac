## Untuk siapa modul ini

Modul ini untuk murid kelas XI jalur D (kecerdasan buatan dan analisis data), untuk minggu `D-XI1-M14` silabus v1.3: asesmen dan refleksi semester 1. Prasyarat: modul `d-xi1-m12`. Alat: Python 3 dengan pustaka `pandas` dan `scikit-learn` untuk bagian praktik, kertas untuk bagian tulis, tanpa akun.

Modul ini karangan penyusun dan disetujui pemilik program pada 2026-11-20 (keputusan lewat dialog; catatan tinjauan menjadi tindak lanjut revisi). Jalur D adalah pengayaan di luar rumusan capaian pembelajaran (CP); minggu ini tidak punya irisan pengayaan, jadi modul ini tidak dihitung memenuhi butir CP mana pun, dan hasilnya bukan nilai resmi.

**Asesmen ini tanpa AI** (silabus bagian 7.4): jawab Ingat kembali dan Latihan bercampur dari ingatan dan dari pemahamanmu sendiri, tanpa asisten AI dan tanpa melihat catatan, sampai kamu membuka `Kunci dan petunjuk`. Tujuannya melihat apa yang sungguh kamu kuasai, bukan menilai orang. Bagian `Refleksi` ditulis sendiri dan tidak disimpan di repositori ini.

Catatan untuk guru: blok Python dijalankan penyusun dengan `python3 -I` (Python 3.14.6, `pandas` 3.1.1, per 2026-11) dan keluarannya ditempel apa adanya; yang dinyatakan hanya "bisa dijalankan dengan keluaran ini", bukan "benar untuk semua masukan". Semua data karangan. Rubrik pada `Kunci dan petunjuk` adalah usulan untuk guru, tanpa angka resmi. Pertanyaan di sini adalah contoh; guru boleh mengganti angka dan kasusnya.

## Ingat kembali

Jawab lima pertanyaan ini dari ingatan, di kertas, sebelum membuka kunci. Ini inti asesmen formatif berjarak: yang masih lupa dicatat untuk diulang, bukan dihukum.

1. Mengapa berkas data mentah tidak ditimpa, dan hasil olahan ditulis ke berkas baru? (dari `d-xi1-m4`)
2. Sebutkan tiga keputusan pembersihan yang dicatat di laporan: apa yang ditemukan, berapa baris, dan mengapa tindakan itu dipilih. (dari `d-xi1-m6`)
3. Mengapa galat prediksi dihitung pada data yang tidak dipakai menyusun prediksinya? (dari `d-xi1-m8`)
4. Sebutkan empat hal yang dibandingkan di tabel perbandingan model. (dari `d-xi1-m11`)
5. Apa isi laporan proyek data: sumber, pembersihan, pembanding, model, evaluasi, dan batasan? (dari `d-xi1-m13`)

## Tujuan

Yang dinilai pada asesmen ini, selaras dengan silabus bagian 7.1:

- membaca dan menelusuri program Python kecil serta menyebut keluarannya;
- memeriksa data (nilai hilang, baris kembar, nilai di luar rentang) dan mencatat keputusan;
- menghitung galat dan metrik klasifikasi dari angka yang diberikan;
- mengenali kebocoran data dan evaluasi yang menyesatkan;
- menjelaskan alasan memilih model dan batas kesimpulan dengan bahasa sendiri.

Keluaran yang diminta silabus: uji tulis dan praktik (kuis kode).

## Latihan bercampur

Kerjakan tanpa AI. Soal 1 sampai 3 tertulis, soal 4 dan 5 praktik di komputer.

**Soal 1. Telusuri.** Tulis keluaran program berikut di kertas, baru jalankan untuk memeriksa.

```python
def mae(nyata, tebak):
    total = 0
    for n, t in zip(nyata, tebak):
        total = total + abs(n - t)
    return total / len(nyata)


data = [10, 12, 14, 13]
tebak = data[:-1]  # tebakan: sama dengan nilai sebelumnya
nyata = data[1:]
print(tebak)
print(nyata)
print(round(mae(nyata, tebak), 2))
```

Tulis juga: tebakan "sama dengan nilai sebelumnya" ini disebut apa, dan mengapa ia berguna sebagai pembanding?

**Soal 2. Baca matriks.** Sebuah penggolong biji cacat (kelas 1 adalah cacat) menghasilkan matriks kebingungan dengan baris kenyataan dan kolom tebakan: kenyataan baik, `[18, 2]` (ditebak baik, ditebak cacat); kenyataan cacat, `[4, 6]`. Hitung ketepatan, presisi, dan recall untuk kelas cacat, dan ketepatan pembanding yang selalu menjawab "baik". Tulis dua kalimat penilaianmu.

**Soal 3. Kasus.** Seorang siswa fiktif melaporkan ketepatan 0,99 untuk model yang menebak apakah pinjaman buku terlambat. Fiturnya: lama pinjam, jenis buku, dan `denda_dibayar` (terisi setelah pengembalian). Datanya disalin dua kali sebelum dibagi acak. Sebutkan dua hal yang mencurigakan, cara memperbaiki masing-masing, dan satu pertanyaan pemeriksa yang kamu ajukan.

**Soal 4. Praktik: periksa data.** Jalankan blok ini, lalu tulis tiga baris yang menghitung nilai hilang, baris kembar, dan pH di luar rentang 0 sampai 14, dan satu kalimat catatan keputusan untuk tiap temuan.

```python
import pandas as pd

df = pd.DataFrame({"ph": [7.0, 7.2, None, 7.2, 15.0], "layak": [1, 1, 0, 1, 0]})
print(df)
```

**Soal 5. Praktik: recall tanpa pustaka.** Tulis fungsi `recall(nyata, tebak)` yang menghitung recall kelas 1 dari dua daftar tanpa memakai `scikit-learn`, lalu uji dengan `nyata = [1, 1, 0, 1, 0]` dan `tebak = [1, 0, 0, 1, 1]`. Rancang dulu di kertas (pseudocode), baru tulis kodenya.

## Refleksi

Tulis jawaban jujur di buku catatanmu sendiri. Tidak ada jawaban salah, dan tulisan ini tidak dikumpulkan ke repositori.

1. Dari alur data sampai prediksi, langkah mana yang sudah kamu kuasai? Sebutkan buktinya (soal mana yang kamu kerjakan dengan yakin).
2. Salah konsep apa yang masih kamu pegang atau pernah kamu pegang, dan apa yang mengubahnya?
3. Pada proyek mini, keputusan mana yang paling sulit, dan apa yang kamu lakukan jika mengulang?
4. Bagaimana pemakaian AI (bila ada) membantu atau justru menghambat belajarmu semester ini?
5. Apa rencana belajarmu untuk semester 2: tiga hal yang akan kamu ulang, dan kapan?

## Cek mandiri

- [ ] Saya menjawab Ingat kembali dari ingatan sebelum membuka kunci.
- [ ] Saya menelusuri program di kertas sebelum menjalankannya.
- [ ] Saya dapat menghitung ketepatan, presisi, dan recall dari matriks kebingungan.
- [ ] Saya dapat menyebut dua bentuk kebocoran data dan perbaikannya.
- [ ] Saya menulis refleksi dengan bukti, dan rencana ulang untuk semester 2.

## Kunci dan petunjuk

**Ingat kembali.** 1: supaya data asli tetap bisa dipakai ulang dan diperiksa; menimpanya menghilangkan jejak dan tidak bisa dibatalkan. 2: contoh: nilai hilang (berapa baris, dibuang atau diisi dan mengapa); baris kembar (berapa, dibuang karena menggelembungkan hitungan); nilai di luar rentang (berapa, diperiksa dulu lalu dibuang atau diperbaiki). Yang dinilai: tiap keputusan memuat temuan, jumlah baris, dan alasan. 3: karena galat pada data yang dipakai menyusun prediksi tidak menguji kemampuan menebak yang belum terlihat. 4: contoh: skor rata-rata, sebaran atau skor terendah antar lipatan, kemudahan dijelaskan, dan jenis kesalahan yang berbahaya (atau metrik utama seperti recall). 5: sumber data (judul, pencipta, lisensi, tanggal akses), keputusan pembersihan dengan jumlah baris, pembanding, model yang dicoba, evaluasi dengan metrik utama, dan batasan.

**Soal 1.** Keluaran:

```text
[10, 12, 14]
[12, 14, 13]
1.67
```

Daftar `tebak` adalah tiga angka pertama dan `nyata` tiga angka terakhir. Selisih mutlak 2, 2, dan 1 berjumlah 5; dibagi 3 menjadi 1,67. Tebakan itu adalah **pembanding sederhana** (nilai terakhir): berguna karena model yang tidak mengalahkannya belum menangkap pola yang berarti.

**Soal 2.** Dari matriks: TN 18, FP 2, FN 4, TP 6, total 30. Ketepatan (18 + 6) / 30 = 0,80; presisi 6 / (6 + 2) = 0,75; recall 6 / (6 + 4) = 0,60. Pembanding "baik" selalu: kenyataan baik ada 20 dari 30, jadi ketepatan 0,67 dengan recall 0. Contoh penilaian: ketepatan model sedikit di atas pembanding dan ia memang menemukan sebagian cacat (recall 0,60), tetapi empat dari sepuluh biji cacat masih lolos; itu perlu diputuskan apakah dapat diterima, dan datanya hanya 30 baris.

**Soal 3.** Dua hal mencurigakan: `denda_dibayar` terisi setelah pengembalian sehingga tidak tersedia saat menebak (fitur yang memuat jawaban) dan datanya disalin sebelum dibagi sehingga baris kembar masuk data latih dan uji. Perbaikan: buang `denda_dibayar` dari fitur; buang baris kembar sebelum membagi. Contoh pertanyaan pemeriksa: berapa ketepatan pembanding mayoritas, adakah fitur yang baru terisi setelah hasilnya diketahui, atau berapa percobaan yang dicoba sebelum angka 0,99 dilaporkan.

**Soal 4.** Contoh jawaban:

```python
import pandas as pd

df = pd.DataFrame({"ph": [7.0, 7.2, None, 7.2, 15.0], "layak": [1, 1, 0, 1, 0]})
print(df.isna().sum()["ph"])
print(df.duplicated().sum())
print((df["ph"] > 14).sum())
```

```text
1
1
1
```

Satu nilai hilang, satu baris kembar (baris kedua dan keempat sama), dan satu nilai di atas 14. Catatan keputusan contoh: "1 baris pH hilang: dibuang karena tidak bisa diisi dengan jujur; 1 baris kembar: dibuang; 1 baris pH 15 (di luar 0 sampai 14): dibuang, nilai mustahil." Yang dinilai: jumlah baris disebut dan alasannya ditulis.

**Soal 5.** Pseudocode contoh: untuk tiap pasangan (n, t): bila n adalah 1 dan t adalah 1, tambah TP; bila n adalah 1 dan t adalah 0, tambah FN; recall adalah TP dibagi (TP + FN).

```python
def recall(nyata, tebak):
    tp = 0
    fn = 0
    for n, t in zip(nyata, tebak):
        if n == 1 and t == 1:
            tp = tp + 1
        if n == 1 and t == 0:
            fn = fn + 1
    return tp / (tp + fn)


print(round(recall([1, 1, 0, 1, 0], [1, 0, 0, 1, 1]), 2))
```

```text
0.67
```

Tiga yang cacat: dua ketahuan (TP 2) dan satu lolos (FN 1), jadi 2/3, sekitar 0,67.

**Rubrik usulan (untuk guru).** Tiga tingkat, tanpa angka resmi. *Kuat*: Ingat kembali hampir semua benar, soal tertulis memakai alasan (bukan hanya angka), soal praktik berjalan dan catatan keputusan memuat jumlah baris, refleksi menyebut bukti dan rencana ulang spesifik. *Cukup*: sebagian besar benar tetapi alasan atau catatan singkat dan ada satu konsep (misalnya presisi dan recall) yang tertukar. *Perlu diulang*: beberapa konsep dasar (pembagian data, pembanding, kebocoran) belum terjawab; rencanakan pengulangan berjarak, bukan menumpuk menjelang akhir.

## Langkah berikutnya

Modul berikut: `D-XI2-M1` (pengelompokan dengan Python) pada semester 2. Ulangi bagian yang kamu tandai di refleksi, sedikit demi sedikit dalam beberapa hari, bukan sekaligus. Bacaan lanjut: *Panduan Mata Pelajaran Informatika, Fase D sampai F*, bagian penilaian.
