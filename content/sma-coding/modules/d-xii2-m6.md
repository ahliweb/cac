## Untuk siapa modul ini

Modul ini untuk murid kelas XII jalur D (kecerdasan buatan dan analisis data), untuk minggu `D-XII2-M6` silabus v1.3: sprint 2 evaluasi, yaitu mengevaluasi dengan benar dan mencari galat, dengan keluaran laporan evaluasi. Prasyarat: modul `d-xii2-m5`. Alat: Python 3 dengan `numpy`, `pandas`, dan `scikit-learn`, tanpa akun. Berkelompok atau sendiri.

Modul ini karangan penyusun dan disetujui pemilik program pada 2026-11-20 (keputusan lewat dialog; catatan tinjauan menjadi tindak lanjut revisi). Jalur D adalah pengayaan di luar rumusan capaian pembelajaran (CP). Minggu ini tidak punya irisan pengayaan, jadi modul ini tidak dihitung memenuhi butir CP mana pun.

Aturan jalur D yang berlaku: data hanya sintetis (karangan) atau terbuka dengan lisensi jelas, tanpa data yang bisa mengenali orang; wajah, suara, dan foto orang tidak dipakai sebagai data; AI generatif boleh dipakai dengan etika dan dicatat, tanpa data pribadi, kata sandi, atau tugas bernilai pada permintaanmu, dan kamu tidak wajib punya akun. Saran: jawab dulu sendiri, baru minta AI memberi petunjuk bertahap; kode buatan AI dibaca, dijalankan, dan diuji. Pada proyek, catat pemakaian AI di log.

Catatan untuk guru: blok Python dijalankan penyusun dengan `python3 -I` (Python 3.14.6, `numpy` 2.5.5, `pandas` 3.1.1, `scikit-learn` 1.9.1, per 2026-11) dan keluarannya ditempel apa adanya; yang dinyatakan hanya "bisa dijalankan dengan keluaran ini", bukan "benar untuk semua masukan". Data sama dengan `d-xii2-m3`; semua karangan.

## Ingat kembali

Jawab dari ingatan, baru cek di bagian kunci.

1. Apa tiga tingkat klaim pada narasi hasil, dan beri satu contoh tiap tingkat. (dari `d-xii1-m12`)
2. Apa saja yang harus sama agar tiga model dibandingkan secara adil? (dari `d-xii2-m5`)
3. Apa yang dilakukan bila pemeriksaan menemukan masalah data, selain membuang barisnya diam-diam? (dari `d-xii2-m3`)

## Tujuan

Setelah modul ini kamu dapat:

- membuat tebakan di luar lipatan dan membaca matriks kebingungan tanpa membuka data uji;
- menghitung recall dan presisi per kelompok beserta jumlah barisnya, dan menyebut kelompok yang buktinya tipis;
- membaca galat baris demi baris dan mengelompokkannya menjadi hipotesis perbaikan;
- menulis laporan evaluasi dengan tiga tingkat klaim: didukung, belum terbukti, dan tidak diketahui.

Keluaran yang diminta silabus: laporan evaluasi.

## Rencana sprint

Evaluasi menilai model terpilih dari `d-xii2-m5` (regresi logistik seimbang) tanpa membuka data uji. Tiap baris data latih ditebak oleh model yang tidak melihat baris itu (`cross_val_predict`). Dokumentasi `scikit-learn` menyatakan hasilnya dapat berbeda dari `cross_validate`; karena itu ia dipakai untuk membaca galat, bukan sebagai angka resmi proyek.

Prediksi dulu. Tebak dan tulis: jenis buku mana yang recall-nya terendah, dan apakah buku yang terlewat cenderung tebal atau tipis? Seperti apa tanda palsu yang paling yakin?

```python
import numpy as np
import pandas as pd
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import confusion_matrix
from sklearn.model_selection import StratifiedKFold, cross_val_predict, train_test_split

BENIH = 2026
CUKUP = 10  # kelompok dengan kurang dari 10 baris terlambat ditandai "tipis" (pilihan penyusun)


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


data = buat_data(600)
latih, uji = train_test_split(data, test_size=0.25, stratify=data["terlambat"], random_state=BENIH)
X = pd.get_dummies(data[["tebal", "hari", "jenis", "musim_ujian"]], drop_first=True).astype(float)
X_latih, y_latih = X.loc[latih.index], latih["terlambat"]
lipatan = StratifiedKFold(n_splits=5, shuffle=True, random_state=0)
model = LogisticRegression(max_iter=1000, class_weight="balanced")

# tebakan di luar lipatan: tiap baris ditebak model yang tidak melihat baris itu; data uji tidak disentuh
peluang = cross_val_predict(model, X_latih, y_latih, cv=lipatan, method="predict_proba")[:, 1]
g = latih.assign(p=peluang.round(2), tebakan=(peluang >= 0.5).astype(int))

tn, fp, fn, tp = confusion_matrix(g["terlambat"], g["tebakan"]).ravel()
print(f"TP={tp} FP={fp} FN={fn} TN={tn} | recall={tp / (tp + fn):.2f} presisi={tp / (tp + fp):.2f}")


def per_kelompok(kolom):
    baris = []
    for nilai, s in g.groupby(kolom):
        tp = int(((s.tebakan == 1) & (s.terlambat == 1)).sum())
        fp = int(((s.tebakan == 1) & (s.terlambat == 0)).sum())
        pos = int(s.terlambat.sum())
        baris.append((f"{kolom}={nilai}", len(s), pos, round(tp / pos, 2), round(tp / (tp + fp), 2), "ya" if pos >= CUKUP else "TIPIS"))
    return baris


print("kelompok | baris | terlambat | recall | presisi | cukup bukti")
for kolom in ("jenis", "musim_ujian"):
    for b in per_kelompok(kolom):
        print(" | ".join(str(x) for x in b))

kolom_tampil = ["kode", "tebal", "hari", "jenis", "musim_ujian", "p"]
print("terlewat dengan yakin (FN, p terendah):")
print(g[(g.tebakan == 0) & (g.terlambat == 1)].sort_values("p").head(4)[kolom_tampil].to_string(index=False))
print("salah tuduh dengan yakin (FP, p tertinggi):")
print(g[(g.tebakan == 1) & (g.terlambat == 0)].sort_values("p", ascending=False).head(4)[kolom_tampil].to_string(index=False))
fn_semua = g[(g.tebakan == 0) & (g.terlambat == 1)]
print("dari", len(fn_semua), "yang terlewat,", int((fn_semua.tebal < 250).sum()), "berbuku kurang dari 250 halaman")
print("bagian terlambat menurut tebal:")
print(g.groupby(pd.cut(g["tebal"], [0, 150, 300, 500]), observed=True)["terlambat"].agg(["count", "mean"]).round(2).to_string())
```

```text
TP=70 FP=122 FN=37 TN=221 | recall=0.65 presisi=0.36
kelompok | baris | terlambat | recall | presisi | cukup bukti
jenis=anak | 132 | 23 | 0.39 | 0.25 | ya
jenis=referensi | 73 | 15 | 0.53 | 0.31 | ya
jenis=umum | 245 | 69 | 0.77 | 0.41 | ya
musim_ujian=0 | 235 | 47 | 0.53 | 0.32 | ya
musim_ujian=1 | 215 | 60 | 0.75 | 0.39 | ya
terlewat dengan yakin (FN, p terendah):
kode  tebal  hari     jenis  musim_ujian    p
P543     66     7      anak            0 0.15
P048     45     7      anak            1 0.19
P118     40    14      anak            1 0.20
P529    177    21 referensi            1 0.22
salah tuduh dengan yakin (FP, p tertinggi):
kode  tebal  hari jenis  musim_ujian    p
P559    466     7  umum            1 0.89
P275    472     7  umum            1 0.88
P121    441     7  umum            1 0.85
P078    454     7  umum            1 0.85
dari 37 yang terlewat, 23 berbuku kurang dari 250 halaman
bagian terlambat menurut tebal:
            count  mean
tebal                  
(0, 150]      104  0.06
(150, 300]    164  0.22
(300, 500]    182  0.36
```

Baca hasilnya. Recall 0,65 dan presisi 0,36 mirip hasil lipatan di `d-xii2-m5`. Buku anak paling rendah: recall 0,39 dari 23 baris terlambat, lawan 0,77 dari 69 baris pada buku umum. Selisih 0,38 jauh lebih besar daripada goyangan kasar sekitar 0,2 untuk 23 baris (dua kali galat baku, hitungan kasar), jadi layak dicatat; ia menyambung risiko buku anak di laporan risiko. Dari 37 peminjaman terlambat yang terlewat, 23 berbuku kurang dari 250 halaman, dan hanya 6 persen buku sampai 150 halaman terlambat, sehingga tak ada ciri yang menandainya. Tanda palsu yang paling yakin adalah buku umum 440 sampai 470 halaman pada musim ujian, padahal hanya 36 persen buku di atas 300 halaman yang terlambat. Angka `p` bukan peluang sebenarnya: bobot kelas menggeser nilainya. Karena datanya karangan, penyusun tahu bahwa label ditetapkan dengan peluang, sehingga sebagian galat tak terhindarkan; pada data nyata kepastian itu tidak ada.

**Laporan evaluasi** memuat: model dan cara menilainya; matriks kebingungan; tabel per kelompok dengan jumlah baris; galat yang dibaca beserta hipotesis; dan klaim tiga tingkat. *Didukung*: model menangkap lebih banyak peminjaman terlambat daripada aturan tulisan tangan; buku anak terlewat lebih sering daripada buku umum, pada data karangan ini. *Belum terbukti*: presisi 0,50 mustahil dicapai dengan fitur ini. *Tidak diketahui*: kinerja pada data uji dan pada perpustakaan sungguhan.

## Daftar periksa

Centang tiap langkah dengan bukti.

- [ ] Tebakan di luar lipatan dibuat dengan lipatan yang sama; data uji tidak disentuh.
- [ ] Matriks kebingungan dan metrik per kelompok ditulis dengan jumlah baris.
- [ ] Kelompok tipis ditandai; selisih dibaca bersama goyangannya.
- [ ] Setidaknya sepuluh galat dibaca baris demi baris dan dikelompokkan.
- [ ] Klaim ditulis dalam tiga tingkat; risiko dari laporan risiko diperbarui.
- [ ] Prediksi ditulis sebelum menjalankan; log AI diisi bila AI dipakai.

## Umpan balik sejawat

Tukar laporan evaluasi dengan tim lain: satu yang sudah baik, satu yang perlu diperbaiki, satu langkah berikutnya, masing-masing menunjuk bagian laporan. Pemeriksa bertanya: apakah jumlah baris ada di tiap angka kelompok, dan apakah klaim "didukung" punya bukti.

## Latihan bercampur

1. Dari `d-xii2-m4`: angka yang harus dikalahkan adalah recall 0,34. Apakah model terpilih mengalahkannya, dan dengan sebaran berapa (`AI: tanpa AI`)?
2. Dari `d-xii1-m11`: tambahkan satu baris pada laporan risiko berdasarkan temuan buku anak: risiko, bukti, tindakan, dan risiko yang tersisa (`AI: boleh`).

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `d-xii2-m7` (sekitar satu minggu lagi), `d-xii2-m9` (sekitar tiga minggu lagi), dan `D-XII2-M14` (sekitar delapan minggu lagi). Jawab sekarang lalu simpan.

1. Mengapa galat dibaca baris demi baris, dan apa yang dicatat dari tiap kelompok galat?
2. Mengapa kartu model menyebut kelompok yang kinerjanya lebih rendah?
3. Mengapa angka per kelompok ditulis bersama jumlah barisnya, dan mengapa tebakan di luar lipatan bukan angka laporan resmi?

## Kesalahan umum

- **"Rata-rata baik berarti semua kelompok baik."** Rata-rata menyembunyikan kelompok yang gagal.
- **"Semua galat dapat diperbaiki."** Sebagian galat berasal dari ketidakpastian di data; mengejarnya membuat model menghafal.
- **"Nilai `p` adalah peluang."** Model berbobot kelas menggeser nilainya.
## Cek mandiri

- [ ] Saya dapat membuat tebakan di luar lipatan tanpa membuka data uji.
- [ ] Saya dapat membaca matriks kebingungan dan tabel per kelompok.
- [ ] Saya dapat mengelompokkan galat menjadi hipotesis.
- [ ] Saya dapat menulis klaim dalam tiga tingkat.
- [ ] Saya mencatat pemakaian AI bila memakainya.

## Kunci dan petunjuk

**Ingat kembali.** 1: didukung (dibuktikan melampaui sebaran), belum terbukti (selisih di dalam sebaran), tidak diketahui (tidak diukur); contoh: model mengalahkan pembanding; model A lebih baik daripada B; kinerja di dunia nyata. 2: data, fitur, lipatan, metrik, bobot kelas, benih, versi. 3: catat temuan, jumlah baris, dan alasan tindakan, selidiki sumbernya.

**Rencana sprint.** Tebakan wajar: kelompok anak terendah; galat terlewat cenderung buku tipis; tanda palsu cenderung buku tebal pada musim ujian.

**Daftar periksa.** Dinilai dari bukti: laporan, keluaran program, dan catatan galat.

**Latihan bercampur.** 1: ya: recall sekitar 0,66 (lipatan `d-xii2-m5`) dengan sebaran 0,15, jauh di atas 0,34; selisih 0,32 melampaui sebaran. 2: contoh: risiko buku anak terlewat; bukti recall 0,39 dari 23 baris terlambat; tindakan tambah data dan laporkan per jenis di kartu model; sisa: data tetap karangan.

**Ulang berjarak.** 1: galat memperlihatkan pola yang tak terlihat di rata-rata; catat ciri, jumlah, dan hipotesis tiap kelompok. 2: pengguna perlu tahu bahwa model tak sama baik untuk semua orang dan batas kegunaannya. 3: angka kelompok tipis goyah, jadi pembaca perlu jumlah baris; tebakan gabungan dapat berbeda dari rata-rata lipatan.

## Langkah berikutnya

Modul berikut: `d-xii2-m7` (sprint penyempurnaan: memperbaiki model dan kode). Bacaan lanjut: `cross_val_predict` dan `confusion_matrix` pada dokumentasi `scikit-learn` (di `Rujukan`).
