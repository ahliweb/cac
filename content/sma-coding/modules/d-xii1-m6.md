## Untuk siapa modul ini

Modul ini untuk murid kelas XII jalur D (kecerdasan buatan dan analisis data), untuk minggu `D-XII1-M6` silabus v1.3: garis dasar dan metrik, yaitu menentukan metrik dan model pembanding sederhana, dengan keluaran laporan garis dasar. Prasyarat: modul `d-xii1-m5`. Alat: Python 3 dengan `numpy`, `pandas`, dan `scikit-learn`, tanpa akun.

Modul ini karangan penyusun dan disetujui pemilik program pada 2026-11-20 (keputusan lewat dialog; catatan tinjauan menjadi tindak lanjut revisi). Jalur D adalah pengayaan di luar rumusan capaian pembelajaran (CP). Minggu ini tidak punya irisan pengayaan, jadi modul ini tidak dihitung memenuhi butir CP mana pun.

Aturan jalur D yang berlaku: data hanya sintetis (karangan) atau terbuka dengan lisensi jelas, tanpa data yang bisa mengenali orang; wajah, suara, dan foto orang tidak dipakai sebagai data; AI generatif boleh dipakai dengan etika dan dicatat, tanpa data pribadi, kata sandi, atau tugas bernilai pada permintaanmu, dan kamu tidak wajib punya akun. Saran: jawab dulu sendiri, baru minta AI memberi petunjuk bertahap; kode buatan AI dibaca, dijalankan, dan diuji. Setiap soal `Latihan` bertanda `AI: boleh` atau `AI: tanpa AI`.

Catatan untuk guru: blok Python dijalankan penyusun dengan `python3 -I` (Python 3.14.6, `numpy` 2.5.5, `pandas` 3.1.1, `scikit-learn` 1.9.1, per 2026-11) dan keluarannya ditempel apa adanya; yang dinyatakan hanya "bisa dijalankan dengan keluaran ini", bukan "benar untuk semua masukan". Data Pustaka Contoh sama dengan `d-xii1-m5` (fungsi `buat_data` disalin agar program berdiri sendiri). Karena data uji hanya 50 baris dengan 9 baris terlambat, selisih satu baris mengubah angka cukup besar; itu bagian dari pelajaran.

## Ingat kembali

Jawab dari ingatan, baru cek di bagian kunci.

1. Mengapa data dibagi menjadi latih dan uji sebelum melihat hasil model, dan apa itu `random_state`? (dari `d-xii1-m5`)
2. Mengapa peta kasus menanyakan siapa yang tidak terwakili di data? (dari `d-xii1-m3`)
3. Mengapa kartu model melaporkan pembanding dan metrik yang dipilih beserta alasannya? (dari `d-xi2-m12`)

## Tujuan

Setelah modul ini kamu dapat:

- membuat dua pembanding sederhana: tebakan mayoritas dan aturan tulisan tangan;
- menghitung ketepatan, presisi, dan recall dari matriks kebingungan dan memilih metrik utama sesuai dampak kesalahan;
- membaca hasil dengan jujur ketika selisihnya hanya satu atau dua baris;
- menulis laporan garis dasar: pembanding, metrik beserta alasannya, data uji, hasil, dan kesimpulan yang boleh ditarik.

Keluaran yang diminta silabus: laporan garis dasar.

## Prediksi dulu

Pada data uji Pustaka Contoh (50 baris, 9 di antaranya terlambat), sebuah "model" selalu menjawab "tepat waktu". Tebak dan tulis: berapa ketepatannya, dan berapa recall untuk kelas terlambat? Tebak juga apakah aturan "buku 300 halaman atau lebih pada musim ujian" akan mengalahkannya pada ketepatan.

## Contoh terselesaikan

**Garis dasar adalah tolok ukur.** Sebelum membangun model rumit, ukur apa yang dicapai tanpa belajar. Model baru berarti bila mengalahkan pembanding itu **pada data uji yang sama** dan dengan metrik yang sesuai dampak kesalahan. Dari `d-xii1-m1`: tanda yang terlewat membuat peminjaman terlambat tak diingatkan (merugikan), tanda palsu hanya membuang satu pengingat. Maka metrik utamanya recall kelas terlambat, ditemani presisi supaya pengingat tidak terbuang; ketepatan hanya pelengkap.

```python
import numpy as np
import pandas as pd
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split

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
y_uji = uji["terlambat"]


def laporan(nama, tebakan):
    tp = int(((tebakan == 1) & (y_uji == 1)).sum())
    fp = int(((tebakan == 1) & (y_uji == 0)).sum())
    fn = int(((tebakan == 0) & (y_uji == 1)).sum())
    tn = int(((tebakan == 0) & (y_uji == 0)).sum())
    ketepatan = (tp + tn) / len(y_uji)
    presisi = tp / (tp + fp) if tp + fp else 0.0
    recall = tp / (tp + fn)
    print(f"{nama:<22} TP={tp} FP={fp} FN={fn} TN={tn} "
          f"ketepatan={ketepatan:.2f} presisi={presisi:.2f} recall={recall:.2f}")


# pembanding 1: selalu menebak tepat waktu (kelas mayoritas data latih)
mayoritas = latih["terlambat"].mode()[0]
laporan("selalu tepat waktu", pd.Series(mayoritas, index=uji.index))

# pembanding 2: aturan tulisan tangan, dipilih dengan melihat data latih saja
aturan = (latih["tebal"] >= 300) & (latih["musim_ujian"] == 1)
print("di data latih, aturan menandai", int(aturan.sum()), "baris;",
      "terlambat di antaranya:", int(latih.loc[aturan, "terlambat"].sum()))
tebakan = ((uji["tebal"] >= 300) & (uji["musim_ujian"] == 1)).astype(int)
laporan("aturan tebal+ujian", tebakan)

# model sederhana untuk dibandingkan
X = pd.get_dummies(data[["tebal", "hari", "jenis", "musim_ujian"]], drop_first=True).astype(float)
model = LogisticRegression(max_iter=1000).fit(X.loc[latih.index], latih["terlambat"])
laporan("regresi logistik", pd.Series(model.predict(X.loc[uji.index]), index=uji.index))
```

```text
selalu tepat waktu     TP=0 FP=0 FN=9 TN=41 ketepatan=0.82 presisi=0.00 recall=0.00
di data latih, aturan menandai 28 baris; terlambat di antaranya: 9
aturan tebal+ujian     TP=3 FP=6 FN=6 TN=35 ketepatan=0.76 presisi=0.33 recall=0.33
regresi logistik       TP=3 FP=1 FN=6 TN=40 ketepatan=0.86 presisi=0.75 recall=0.33
```

Baca hasilnya. Tebakan mayoritas mencapai ketepatan 0,82 tanpa menangkap satu pun peminjaman terlambat: ketepatan saja menyesatkan pada data timpang. Aturan tulisan tangan menangkap 3 dari 9 (recall 0,33) tetapi ketepatannya lebih rendah (0,76) karena 6 pengingat terbuang. Regresi logistik ketepatannya 0,86, hanya dua baris di atas tebakan mayoritas (0,82 kali 50 sama dengan 41 baris, 0,86 kali 50 sama dengan 43), dan recall-nya sama dengan aturan, 0,33. Terhadap ukuran sukses `d-xii1-m1` (recall sedikitnya 0,60 dan presisi sedikitnya 0,50) tidak satu pun lolos: recall masih kurang. Itu temuan sah, dan bahan untuk `d-xii1-m7`. Ingat bahwa 9 baris terlambat di data uji membuat angka goyah: satu baris berubah, recall bergeser 0,11.

**Laporan garis dasar** memuat: pembanding yang dipakai dan cara memilihnya (hanya dari data latih); metrik utama beserta alasannya; ukuran data uji dan jumlah barisnya per kelas; tabel hasil; dan kesimpulan jujur, misalnya "belum ada yang memenuhi ukuran sukses".

## Contoh setengah jadi

Lengkapi `____` agar program menghitung ketepatan dan presisi aturan tulisan tangan dari angka TP, FP, FN, TN di atas.

```python setengah-jadi
tp, fp, fn, tn = 3, 6, 6, 35
ketepatan = (tp + ____) / (tp + fp + fn + ____)
presisi = tp / (tp + ____)
print(round(ketepatan, 2), round(presisi, 2))
```

## Soal Parsons

Susun baris menjadi fungsi `recall` dan cetak hasilnya untuk TP = 3 dan FN = 6 dengan dua desimal. Lekukan dipakai; yang diacak hanya urutannya.

```text
print(round(recall(3, 6), 2))
    return tp / (tp + fn)
def recall(tp, fn):
```

## Latihan

1. **Garis dasar proyekmu.** (`AI: boleh`) Hitung tebakan mayoritas dan satu aturan tulisan tangan untuk data proyekmu dari `d-xii1-m5`, lalu tulis laporan garis dasar satu halaman.
2. **Ubah aturan.** (`AI: boleh`) Ganti ambang 300 menjadi 250 pada aturan, dengan ambang dipilih tanpa melihat data uji. Bandingkan recall dan presisinya, dan tulis apa yang kamu simpulkan.
3. **Cukupkah?** (`AI: tanpa AI`) Model A ketepatannya 0,86 dan pembandingnya 0,82 pada 50 baris uji. Apakah itu membuktikan model A lebih baik? Berapa baris selisihnya?
4. **Pilih metrik.** (`AI: tanpa AI`) Untuk tiap situasi, pilih metrik utama dan beri alasan: menyaring surel penipuan dengan hasil masuk kotak spam; memberi tanda pada pasien yang perlu pemeriksaan lanjutan (data karangan); mengirim promosi ke pelanggan fiktif.
5. **Catatan pemakaian AI (opsional).** Catat alat, tujuan, garis besar perintah, bagian yang dipakai, dan cara memeriksanya. Jangan menaruh data pribadi apa pun pada permintaanmu.

## Latihan bercampur

1. Dari `d-xii1-m1`: bandingkan hasil ketiganya dengan ukuran sukses yang ditulis di dokumen kebutuhan. Apa yang harus diperbaiki lebih dulu?
2. Dari `d-x2-m7`: dari matriks TP=3, FP=1, FN=6, TN=40, hitung presisi dan recall dan jelaskan arti tiap sel.

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `d-xii1-m7` (sekitar satu minggu lagi), `d-xii1-m9` (sekitar tiga minggu lagi), dan `D-XII1-M14` (sekitar delapan minggu lagi). Jawab sekarang lalu simpan.

1. Mengapa garis dasar dihitung dengan data uji yang sama seperti model yang dibandingkan, dan apa yang terjadi bila model tidak mengalahkannya?
2. Mengapa ketepatan 80 persen bisa tak berarti pada data yang 80 persen berkelas mayoritas?
3. Pada data timpang, metrik apa yang menunjukkan bahwa tebakan mayoritas tidak berguna, dan bagaimana menghitungnya?

## Kesalahan umum

- **"Model sederhana tidak perlu dibandingkan dengan apa pun."** Tanpa pembanding, angka tidak punya arti.
- **"Ketepatan tinggi berarti model bagus."** Pada data timpang, tebakan mayoritas sudah tinggi ketepatannya.
- **"Ambang aturan boleh dipilih dari data uji."** Memilih dari data uji membuat angka ujinya tidak jujur; pilih dari data latih.
- **"Selisih 0,04 sudah membuktikan."** Pada 50 baris, itu dua baris dan bisa kebetulan.

## Cek mandiri

- [ ] Saya dapat membuat pembanding mayoritas dan aturan tulisan tangan.
- [ ] Saya dapat menghitung ketepatan, presisi, dan recall dari matriks.
- [ ] Saya dapat memilih metrik utama sesuai dampak kesalahan.
- [ ] Saya dapat membaca selisih kecil dengan jujur.
- [ ] Saya mencatat pemakaian AI bila saya memakainya.

## Kunci dan petunjuk

**Ingat kembali.** 1: agar angka uji jujur karena data uji tak ikut membentuk model; `random_state` menetapkan pembagian acak yang sama setiap dijalankan. 2: karena kelompok atau kondisi yang tak terwakili bisa mendapat hasil jauh lebih buruk dan tak terlihat. 3: agar pembaca dapat menilai klaim: pembanding sederhana memperlihatkan apa yang dicapai tanpa belajar, dan metrik harus sesuai dampak kesalahan.

**Prediksi dulu.** Ketepatan 41 dari 50 = 0,82 dan recall 0 dari 9 = 0. Aturan tidak mengalahkannya pada ketepatan (0,76) tetapi menangkap 3 dari 9.

**Contoh setengah jadi.** Isian: `tn`, `tn`, `fp`.

```python
tp, fp, fn, tn = 3, 6, 6, 35
ketepatan = (tp + tn) / (tp + fp + fn + tn)
presisi = tp / (tp + fp)
print(round(ketepatan, 2), round(presisi, 2))
```

```text
0.76 0.33
```

**Soal Parsons.** Urutan benar:

```python
def recall(tp, fn):
    return tp / (tp + fn)
print(round(recall(3, 6), 2))
```

```text
0.33
```

**Latihan.** 1: rubrik: pembanding dipilih dari data latih, metrik beserta alasan, jumlah baris uji per kelas, dan kesimpulan jujur. 2: dengan ambang 250 aturan menandai 37 baris latih (10 terlambat) dan pada uji memberi TP=4, FP=9, FN=5, TN=32: ketepatan 0,72, presisi 0,31, recall 0,44. Recall naik satu baris (4 dari 9) dengan harga tiga pengingat terbuang lagi; satu baris di 9 baris tidak cukup untuk menyimpulkan. 3: tidak; 0,04 kali 50 sama dengan 2 baris, bisa kebetulan; perlu data uji lebih banyak atau sebaran antar lipatan. 4: surel penipuan masuk spam: presisi (jangan menyembunyikan surel sah); pasien perlu pemeriksaan: recall (jangan melewatkan yang perlu); promosi: presisi atau biaya per kiriman; alasannya dampak kesalahan. 5: opsional.

**Latihan bercampur.** 1: ukuran sukses recall sedikitnya 0,60 dan presisi sedikitnya 0,50; regresi logistik presisi 0,75 tetapi recall 0,33, jadi recall yang diperbaiki lebih dulu. 2: presisi 3 dibagi 4 = 0,75 (dari 4 yang ditandai, 3 benar); recall 3 dibagi 9 = 0,33 (dari 9 yang terlambat, 3 tertangkap); TP tertandai dan benar, FP tertandai tetapi salah, FN terlewat, TN dibiarkan dan benar.

**Ulang berjarak.** 1: agar adil, pembanding dan model dinilai pada soal yang sama; bila model tidak mengalahkannya, model itu belum layak dan penyebabnya dicari. 2: karena tebakan mayoritas sendiri sudah mencapai 80 persen. 3: recall kelas yang dicari (nol pada tebakan mayoritas), dihitung TP dibagi (TP + FN).

## Langkah berikutnya

Modul berikut: `d-xii1-m7` (iterasi model I), yang memperbaiki model berdasarkan bukti dengan satu perubahan terukur. Bacaan lanjut: bagian *Metrics and scoring* dan `DummyClassifier` pada dokumentasi `scikit-learn` (di `Rujukan`).
