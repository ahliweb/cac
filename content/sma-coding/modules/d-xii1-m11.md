## Untuk siapa modul ini

Modul ini untuk murid kelas XII jalur D (kecerdasan buatan dan analisis data), untuk minggu `D-XII1-M11` silabus v1.3: penilaian risiko dan etika proyek, yaitu memakai daftar periksa risiko dan dampak untuk mengaudit proyekmu sendiri, dengan keluaran laporan risiko. Prasyarat terindeks: modul `d-xi2-m14`. Modul `d-xii1-m4` (hukum dan kebijakan) dan `d-xii1-m7` sampai `d-xii1-m10` ditulis dalam seri yang sama dan dibaca lebih dulu. Alat: Python 3 dengan `numpy`, `pandas`, dan `scikit-learn`, tanpa akun.

Modul ini berstatus DRAF: karangan penyusun, belum ditinjau pemilik. Jalur D adalah pengayaan di luar rumusan capaian pembelajaran (CP). Minggu ini tidak punya irisan pengayaan, jadi modul ini tidak dihitung memenuhi butir CP mana pun.

Aturan jalur D yang berlaku: data hanya sintetis (karangan) atau terbuka dengan lisensi jelas, tanpa data yang bisa mengenali orang; wajah, suara, dan foto orang tidak dipakai sebagai data; AI generatif boleh dipakai dengan etika dan dicatat, tanpa data pribadi, kata sandi, atau tugas bernilai pada permintaanmu, dan kamu tidak wajib punya akun. Saran: jawab dulu sendiri, baru minta AI memberi petunjuk bertahap; kode buatan AI dibaca, dijalankan, dan diuji. Setiap soal `Latihan` bertanda `AI: boleh` atau `AI: tanpa AI`.

Catatan untuk guru: blok Python dijalankan penyusun dengan `python3 -I` (Python 3.14.6, `numpy` 2.5.5, `pandas` 3.1.1, `scikit-learn` 1.9.1, per 2026-11) dan keluarannya ditempel apa adanya; yang dinyatakan hanya "bisa dijalankan dengan keluaran ini", bukan "benar untuk semua masukan". Daftar periksa adalah alat kelas buatan penyusun, terinspirasi pembagian fungsi pada kerangka manajemen risiko AI NIST (tata kelola, pemetaan, pengukuran, pengelolaan); ia bukan terjemahan kerangka itu dan bukan nasihat hukum. Skor dan ambang di bawah adalah penyederhanaan untuk latihan.

## Ingat kembali

Jawab dari ingatan, baru cek di bagian kunci.

1. Sebutkan empat hal yang dicatat di README agar orang lain dapat mengulang hasilmu. (dari `d-xii1-m10`)
2. Mengapa eksperimen yang tidak menaikkan metrik tetap dicatat? (dari `d-xii1-m8`)
3. Sebutkan tiga pertanyaan daftar periksa kepatuhan sebelum memakai sebuah dataset. (dari `d-xii1-m4`)
4. Mengapa model bisa tampak baik pada rata-rata tetapi gagal pada kondisi tertentu, dan bagaimana kamu menunjukkannya dengan angka? (dari `d-xii1-m3`)

## Tujuan

Setelah modul ini kamu dapat:

- memakai daftar periksa delapan butir untuk risiko data, kepatuhan, keterwakilan, dampak kesalahan, keputusan manusia, penyalahgunaan, transparansi, dan keamanan;
- mengaudit model per kelompok memakai tebakan di luar lipatan, dan menyebut kelompok yang buktinya terlalu sedikit;
- mengurutkan risiko dengan skor kemungkinan kali dampak sebagai alat prioritas, bukan ukuran pasti;
- menulis laporan risiko: risiko, bukti, tindakan, dan risiko yang tersisa.

Keluaran yang diminta silabus: laporan risiko.

## Prediksi dulu

Model E1 Pustaka Contoh (`d-xii1-m7`) mencapai recall rata-rata 0,63 untuk peminjaman terlambat. Peminjamannya berjenis `anak`, `umum`, dan `referensi`. Tebak dan tulis: apakah recall-nya sama untuk ketiga jenis? Jenis mana yang paling sulit ditebak? Dan bila hanya 1 baris `referensi` yang terlambat, seberapa yakin kamu pada angka untuk jenis itu?

## Contoh terselesaikan

**Daftar periksa delapan butir.** Tiap butir dijawab dengan bukti, bukan keyakinan.

| Butir | Pertanyaan | Asal |
| --- | --- | --- |
| 1 Data dan privasi | adakah kolom yang mengenali orang atau data spesifik? | `d-xii1-m4`, `d-xii1-m5` |
| 2 Kepatuhan | lisensi, tujuan, dan dasar pemrosesan tercatat? | `d-xii1-m4` |
| 3 Keterwakilan | kelompok mana yang sedikit di data dan di data uji? | `d-xii1-m2` |
| 4 Dampak salah | positif palsu dan negatif palsu menimpa siapa, seberapa berat? | `d-xii1-m1` |
| 5 Keputusan | manusia memutuskan akhirnya, dan adakah jalur keberatan? | `d-xii1-m2` |
| 6 Penyalahgunaan | apa yang tertulis di luar cakupan, dan bagaimana mencegahnya? | `d-xii1-m1` |
| 7 Transparansi | label "karangan", kartu model, README, log AI lengkap? | `d-xii1-m10` |
| 8 Keamanan | kunci, kata sandi, atau paket data terbawa di kode atau permintaan AI? | `d-xi2-m10` |

**Audit per kelompok.** Rata-rata dapat menyembunyikan kelompok yang gagal. Program berikut menebak setiap baris latih memakai model yang **tidak melihat baris itu** (tebakan di luar lipatan), lalu menghitung recall per kelompok. Data uji tidak dibuka. Dokumentasi `scikit-learn` mengingatkan bahwa angka dari tebakan gabungan seperti ini tidak selalu sama dengan hasil `cross_validate`, jadi hasilnya dipakai sebagai petunjuk audit, bukan angka laporan resmi. Kelompok dengan kurang dari 10 baris terlambat ditandai "terlalu sedikit"; ambang 10 itu pilihan penyusun untuk latihan.

```python
import numpy as np
import pandas as pd
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import StratifiedKFold, cross_val_predict, train_test_split

BENIH = 2026


def buat_data(n=200, benih=BENIH):
    rng = np.random.default_rng(benih)
    tebal = rng.integers(40, 500, n)
    hari = rng.choice([7, 14, 21], n, p=[0.4, 0.4, 0.2])
    jenis = rng.choice(["anak", "umum", "referensi"], n, p=[0.3, 0.55, 0.15])
    ujian = rng.integers(0, 2, n)
    skor = -3.0 + 0.006 * tebal + 0.9 * ujian - 0.05 * hari + (jenis == "umum") * 0.4
    p = 1 / (1 + np.exp(-skor))
    terlambat = (rng.random(n) < p).astype(int)
    return pd.DataFrame(
        {
            "kode": [f"P{i:03d}" for i in range(1, n + 1)],
            "tebal": tebal,
            "hari": hari,
            "jenis": jenis,
            "musim_ujian": ujian,
            "terlambat": terlambat,
        }
    )


data = buat_data()
latih, uji = train_test_split(data, test_size=0.25, stratify=data["terlambat"], random_state=BENIH)
X = pd.get_dummies(data[["tebal", "hari", "jenis", "musim_ujian"]], drop_first=True).astype(float)
lipatan = StratifiedKFold(n_splits=5, shuffle=True, random_state=0)
model = LogisticRegression(max_iter=1000, class_weight="balanced")
# tiap baris latih ditebak model yang tidak melihatnya; data uji tidak dibuka
latih = latih.assign(tebakan=cross_val_predict(model, X.loc[latih.index], latih["terlambat"], cv=lipatan))


def audit(df, kolom):
    for nilai, g in df.groupby(kolom):
        pos = int(g["terlambat"].sum())
        tp = int(((g["tebakan"] == 1) & (g["terlambat"] == 1)).sum())
        fp = int(((g["tebakan"] == 1) & (g["terlambat"] == 0)).sum())
        recall = f"{tp / pos:.2f}" if pos else "-"
        cukup = "ya" if pos >= 10 else "TIDAK (terlalu sedikit)"
        print(f"{kolom}={nilai:<10} baris={len(g):3d} terlambat={pos:2d} recall={recall} pengingat sia-sia={fp:2d} cukup bukti: {cukup}")


audit(latih, "jenis")
audit(latih, "musim_ujian")

risiko = [  # (risiko, kemungkinan 1-3, dampak 1-3)
    ("data uji bocor ke keputusan model", 2, 3),
    ("pengingat salah dianggap sebagai tuduhan", 2, 2),
    ("model dipakai untuk menolak peminjaman", 1, 3),
    ("data nyata bercampur ke data karangan", 1, 3),
    ("pengingat sia-sia membebani petugas", 3, 1),
]
for nama, k, d in sorted(risiko, key=lambda r: -(r[1] * r[2])):
    print(f"skor {k * d}: {nama} (kemungkinan {k}, dampak {d})")
```

```text
jenis=anak       baris= 49 terlambat= 6 recall=0.17 pengingat sia-sia=11 cukup bukti: TIDAK (terlalu sedikit)
jenis=referensi  baris= 19 terlambat= 1 recall=0.00 pengingat sia-sia= 3 cukup bukti: TIDAK (terlalu sedikit)
jenis=umum       baris= 82 terlambat=19 recall=0.79 pengingat sia-sia=30 cukup bukti: ya
musim_ujian=0          baris= 75 terlambat= 9 recall=0.67 pengingat sia-sia=11 cukup bukti: TIDAK (terlalu sedikit)
musim_ujian=1          baris= 75 terlambat=17 recall=0.59 pengingat sia-sia=33 cukup bukti: ya
skor 6: data uji bocor ke keputusan model (kemungkinan 2, dampak 3)
skor 4: pengingat salah dianggap sebagai tuduhan (kemungkinan 2, dampak 2)
skor 3: model dipakai untuk menolak peminjaman (kemungkinan 1, dampak 3)
skor 3: data nyata bercampur ke data karangan (kemungkinan 1, dampak 3)
skor 3: pengingat sia-sia membebani petugas (kemungkinan 3, dampak 1)
```

Baca hasilnya. Recall buku `umum` 0,79 (19 baris terlambat), tetapi buku `anak` hanya 0,17: model menangkap 1 dari 6 peminjaman anak yang terlambat. Itulah rata-rata yang menyembunyikan kelompok. Buktinya masih tipis (6 baris), jadi **bukan kesimpulan**, tetapi cukup untuk dicatat sebagai risiko keterwakilan dengan tindakan: kumpulkan lebih banyak baris `anak` sebelum model dipakai. Jenis `referensi` tak dapat dinilai sama sekali (1 baris). Pada musim ujian pengingat sia-sia 33 baris lawan 11: beban petugas naik, hal yang dicatat di butir 4. Skor risiko (kemungkinan 1 sampai 3 kali dampak 1 sampai 3) hanya mengurutkan perhatian; kerangka NIST sendiri mendefinisikan risiko sebagai gabungan peluang dan besar dampak, tetapi menyatakan bahwa tindakan intinya bukan daftar periksa; daftar delapan butir di sini alat kelas, bukan kerangka itu. Skor yang sama tidak berarti risiko yang sama: kemungkinan 3 kali dampak 1 dan kemungkinan 1 kali dampak 3 sama-sama 3, padahal penanganannya berbeda.

| Risiko | Bukti | Tindakan | Risiko yang tersisa |
| --- | --- | --- | --- |
| recall buku anak rendah | 1 dari 6 terlambat tertangkap (di luar lipatan) | tambah data anak; laporkan jumlah baris tiap jenis | data tetap karangan |
| model dipakai menolak peminjaman | tidak ada kontrol teknis | tulis "di luar cakupan" di kartu model dan README | petugas tetap dapat menyalahgunakan |

## Contoh setengah jadi

Lengkapi `____` agar risiko diurutkan dari skor tertinggi.

```python setengah-jadi
risiko = [("pengingat salah dianggap tuduhan", 2, 2), ("model menolak peminjaman", 1, 3)]
for nama, k, d in sorted(risiko, key=lambda r: -(r[____] * r[____])):
    print(k * d, nama)
```

## Soal Parsons

Susun baris menjadi fungsi `cukup_bukti` yang benar bila jumlah baris positif sedikitnya `batas`, lalu mencetak hasil untuk 6 dan 19 baris. Lekukan dipakai; yang diacak hanya urutannya.

```text
print(cukup_bukti(6), cukup_bukti(19))
    return positif >= batas
def cukup_bukti(positif, batas=10):
```

## Latihan

1. **Audit proyekmu.** (`AI: boleh`) Jalankan audit per kelompok untuk dua kolom proyekmu dengan tebakan di luar lipatan. Tulis kelompok yang buktinya terlalu sedikit dan kelompok yang tampak lebih lemah.
2. **Daftar periksa delapan butir.** (`AI: tanpa AI`) Isi untuk proyekmu; tiap jawaban disertai bukti (nama kolom, angka, atau berkas).
3. **Skor risiko.** (`AI: boleh`) Tulis lima risiko proyekmu dengan kemungkinan dan dampak 1 sampai 3, urutkan, dan tulis tindakan untuk dua teratas.
4. **Skor yang menipu.** (`AI: tanpa AI`) Dua risiko sama-sama berskor 3: kemungkinan 3 dampak 1, dan kemungkinan 1 dampak 3. Mengapa keduanya tidak ditangani sama?
5. **Catatan pemakaian AI (opsional).** Catat alat, tujuan, garis besar perintah, bagian yang dipakai, dan cara memeriksanya. Jangan menaruh data pribadi atau paket data apa pun pada permintaanmu.

## Latihan bercampur

1. Dari `d-xii1-m6`: E1 punya presisi 0,26. Tulis akibat nyata bagi petugas dan satu tindakan yang mengurangi dampaknya tanpa menghapus pengingat.
2. Dari `d-xii1-m9`: pemeriksa kolom menandai kolom bocor di paket tim lain. Butir daftar periksa mana yang terkena, dan apa tindakannya?

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `D-XII1-M12` (sekitar satu minggu lagi), `D-XII1-M14` (sekitar tiga minggu lagi), dan `D-XII2-M5` (sekitar delapan minggu lagi). Jawab sekarang lalu simpan.

1. Mengapa angka rata-rata dapat menyembunyikan kelompok yang gagal, dan bagaimana kamu melaporkannya dengan jujur?
2. Mengapa skor risiko kemungkinan kali dampak hanya alat prioritas?
3. Mengapa jumlah baris tiap kelompok ditulis di samping angkanya?

## Kesalahan umum

- **"Rata-rata bagus berarti semua kelompok terlayani."** Hitung per kelompok dan tulis jumlah barisnya.
- **"Kelompok kecil dapat diabaikan."** Kelompok kecil tak bisa disimpulkan, tetapi dicatat sebagai risiko dengan tindakan mengumpulkan data.
- **"Skor 6 adalah fakta."** Skor itu pendapat tim yang diurutkan; ubah bila bukti berubah.
- **"Karena datanya karangan, risikonya nol."** Latihan menyiapkan kebiasaan untuk data nyata; risiko penyalahgunaan dan salah baca tetap ada.
- **"Etika dikerjakan di akhir."** Daftar periksa dipakai sejak data disiapkan, bukan hanya sebelum presentasi.

## Cek mandiri

- [ ] Saya dapat mengisi daftar periksa delapan butir dengan bukti.
- [ ] Saya dapat mengaudit model per kelompok dan menyebut kelompok yang buktinya tipis.
- [ ] Saya dapat mengurutkan risiko dan menyebut batas skor itu.
- [ ] Saya dapat menulis laporan risiko dengan tindakan dan risiko yang tersisa.
- [ ] Saya mencatat pemakaian AI bila saya memakainya.

## Kunci dan petunjuk

**Ingat kembali.** 1: contoh: tujuan, data dan benihnya, cara menjalankan, hasil beserta sebaran, versi lingkungan, dan pemakaian AI. 2: agar kegagalan tidak diulang, hasil tidak tampak lebih mulus daripada kenyataan, dan orang lain tahu apa yang sudah dicoba. 3: contoh: asal dan lisensi data tercatat; kolom spesifik atau langsung dibuang atau dibenarkan; tujuan dan dasar pemrosesan tertulis; tidak ada wajah, suara, atau foto. 4: karena angka rata-rata didominasi kelompok besar; ditunjukkan dengan menghitung metrik per kelompok atau kondisi, beserta jumlah barisnya.

**Prediksi dulu.** Tidak sama. Contoh jawaban setelah menjalankan: `umum` paling tinggi (0,79), `anak` rendah (0,17), `referensi` tak dapat dinilai karena hanya 1 baris terlambat. Dengan 1 baris, angkanya (0 atau 1) nyaris tak berarti.

**Contoh setengah jadi.** Isian: `1`, `2`.

```python
risiko = [("pengingat salah dianggap tuduhan", 2, 2), ("model menolak peminjaman", 1, 3)]
for nama, k, d in sorted(risiko, key=lambda r: -(r[1] * r[2])):
    print(k * d, nama)
```

```text
4 pengingat salah dianggap tuduhan
3 model menolak peminjaman
```

**Soal Parsons.** Urutan benar:

```python
def cukup_bukti(positif, batas=10):
    return positif >= batas
print(cukup_bukti(6), cukup_bukti(19))
```

```text
False True
```

**Latihan.** 1: rubrik: tebakan di luar lipatan (bukan data uji), recall per kelompok beserta jumlah baris terlambat, dan kelompok bukti tipis dinyatakan sebagai risiko, bukan kesimpulan. 2: rubrik: delapan butir terjawab dan tiap jawaban menunjuk bukti. 3: rubrik: skor dihitung benar, urutan masuk akal, dan tindakan menyentuh sebab (data, cakupan, atau pengawasan manusia). 4: karena kemungkinan tinggi dengan dampak kecil (beban kecil yang sering) ditangani dengan memperbaiki alur, sedangkan kemungkinan rendah dengan dampak besar (mis. menolak peminjaman) dijaga dengan batas penggunaan dan pengawasan manusia; satu skor menyembunyikan perbedaan itu. 5: opsional.

**Latihan bercampur.** 1: sekitar tiga dari empat pengingat terbuang, sehingga petugas bisa lelah dan mengabaikan pengingat; tindakan contoh: kirim pengingat dengan satu kanal murah, atau pakai tanda hanya pada peminjaman berpeluang tinggi. 2: butir 7 (transparansi) dan 1 atau 2 (data dan kepatuhan); tindakan: buang kolom itu, ulangi pembagian dan evaluasi, dan catat di README.

**Ulang berjarak.** 1: rata-rata didominasi kelompok besar; laporkan metrik per kelompok bersama jumlah barisnya dan nyatakan kelompok yang buktinya tipis sebagai batas. 2: karena kemungkinan dan dampak adalah pendapat yang diberi angka kasar; skor yang sama bisa menutupi penanganan yang berbeda. 3: supaya pembaca dapat menilai seberapa kokoh angkanya; angka dari sedikit baris goyah.

## Langkah berikutnya

Modul berikut: `d-xii1-m12` (menyajikan hasil), yang membawa temuan, termasuk batas dan risikonya, ke grafik dan narasi yang jujur. Bacaan lanjut: kerangka manajemen risiko AI dari NIST dan catatan `cross_val_predict` pada dokumentasi `scikit-learn` (di `Rujukan`).
