## Untuk siapa modul ini

Modul ini untuk murid kelas XII jalur D (kecerdasan buatan dan analisis data), untuk minggu `D-XII1-M7` silabus v1.3: iterasi model I, yaitu memperbaiki model berdasarkan bukti, dengan keluaran catatan eksperimen. Prasyarat: modul `d-xii1-m6`. Alat: Python 3 dengan `numpy`, `pandas`, dan `scikit-learn`, tanpa akun.

Modul ini karangan penyusun dan disetujui pemilik program pada 2026-11-20 (keputusan lewat dialog; catatan tinjauan menjadi tindak lanjut revisi). Jalur D adalah pengayaan di luar rumusan capaian pembelajaran (CP). Minggu ini tidak punya irisan pengayaan, jadi modul ini tidak dihitung memenuhi butir CP mana pun.

Aturan jalur D yang berlaku: data hanya sintetis (karangan) atau terbuka dengan lisensi jelas, tanpa data yang bisa mengenali orang; wajah, suara, dan foto orang tidak dipakai sebagai data; AI generatif boleh dipakai dengan etika dan dicatat, tanpa data pribadi, kata sandi, atau tugas bernilai pada permintaanmu, dan kamu tidak wajib punya akun. Saran: jawab dulu sendiri, baru minta AI memberi petunjuk bertahap; kode buatan AI dibaca, dijalankan, dan diuji. Setiap soal `Latihan` bertanda `AI: boleh` atau `AI: tanpa AI`.

Catatan untuk guru: blok Python dijalankan penyusun dengan `python3 -I` (Python 3.14.6, `numpy` 2.5.5, `pandas` 3.1.1, `scikit-learn` 1.9.1, per 2026-11) dan keluarannya ditempel apa adanya; yang dinyatakan hanya "bisa dijalankan dengan keluaran ini", bukan "benar untuk semua masukan". Data Pustaka Contoh sama dengan `d-xii1-m5` (fungsi `buat_data` disalin agar program berdiri sendiri). Data uji tidak dibuka di modul ini; evaluasi akhir pada data uji dibahas di minggu berikutnya.

## Ingat kembali

Jawab dari ingatan, baru cek di bagian kunci.

1. Mengapa garis dasar dihitung dengan data uji yang sama seperti model yang dibandingkan, dan apa yang terjadi bila model tidak mengalahkannya? (dari `d-xii1-m6`)
2. Apa itu penilaian dampak pelindungan data pribadi, dan kapan ia diwajibkan (sebutkan dua kondisi)? (dari `d-xii1-m4`)
3. Apa yang dicatat agar eksperimen perbaikan model dapat diulang orang lain? (dari `d-xi2-m13`)

## Tujuan

Setelah modul ini kamu dapat:

- menulis hipotesis perbaikan dari bukti di laporan garis dasar;
- mengubah satu hal per eksperimen dan mengukurnya pada lipatan data latih, bukan pada data uji;
- membaca rata-rata dan sebaran antar lipatan, dan mengenali selisih yang belum membuktikan apa pun;
- menulis catatan eksperimen yang membuat percobaan dapat diulang.

Keluaran yang diminta silabus: catatan eksperimen (satu perbaikan terukur).

## Prediksi dulu

Dari `d-xii1-m6`: regresi logistik bawaan jarang menandai peminjaman terlambat karena kelas itu minoritas (35 dari 200 baris). Satu perubahan: `class_weight="balanced"`, yang memberi bobot lebih besar pada kelas minoritas saat melatih. Tebak dan tulis: recall kelas terlambat akan naik atau turun, dan apa harganya pada presisi? Tebak juga apakah angkanya stabil di kelima lipatan.

## Contoh terselesaikan

**Siklus satu perbaikan.** (1) *Bukti*: laporan garis dasar menunjukkan recall rendah (0,33) padahal ukuran sukses sedikitnya 0,60. (2) *Hipotesis*: data timpang membuat model condong ke kelas mayoritas, jadi bobot kelas seimbang menaikkan recall. (3) *Satu perubahan*: hanya bobot kelas; fitur, data, dan benih tidak diubah, supaya penyebab perubahan hasil jelas. (4) *Ukur pada lipatan data latih*, bukan data uji, karena data uji disimpan untuk penilaian akhir; setiap perubahan yang dinilai dari data uji "meminjam" data itu dan membuat angkanya tak jujur. (5) *Catat*: kode, perubahan, hasil, dan keputusan.

```python
import numpy as np
import pandas as pd
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import StratifiedKFold, cross_validate, train_test_split

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
X_latih, y_latih = X.loc[latih.index], latih["terlambat"]

lipatan = StratifiedKFold(n_splits=5, shuffle=True, random_state=0)


def eksperimen(kode, perubahan, model):
    hasil = cross_validate(model, X_latih, y_latih, cv=lipatan, scoring=["recall", "f1"])
    r, f = hasil["test_recall"], hasil["test_f1"]
    print(f"{kode} | {perubahan:<28} | recall {r.mean():.2f} +- {r.std():.2f} | F1 {f.mean():.2f} +- {f.std():.2f}")


eksperimen("E0", "regresi logistik bawaan", LogisticRegression(max_iter=1000))
eksperimen("E1", "bobot kelas seimbang", LogisticRegression(max_iter=1000, class_weight="balanced"))
```

```text
E0 | regresi logistik bawaan      | recall 0.04 +- 0.08 | F1 0.06 +- 0.11
E1 | bobot kelas seimbang         | recall 0.63 +- 0.31 | F1 0.36 +- 0.14
```

Baca hasilnya. Recall naik dari 0,04 menjadi 0,63: perubahan satu hal itu terbukti membantu, jauh melampaui sebaran. Dua catatan jujur. Pertama, F1 hanya 0,36, jauh di bawah recall: presisinya rendah, sehingga banyak pengingat terbuang; itu harga yang ditimbang dengan ukuran sukses `d-xii1-m1`. Kedua, sebaran E1 besar (0,31): tiap lipatan hanya berisi sekitar 5 baris terlambat. Karena itu E0 pada data uji `d-xii1-m6` (recall 0,33) tidak sama dengan 0,04 di sini: angkanya berayun pada data sekecil ini, dan sebaran perlu dicatat di samping rata-rata.

**Catatan eksperimen** (satu baris tiap percobaan) memuat: kode, hipotesis, satu perubahan, kondisi tetap (data, benih 2026, lipatan `random_state=0`, versi Python dan pustaka), hasil (rata-rata dan sebaran), dan keputusan. Bila AI dipakai untuk menyarankan perubahan, catat juga alat dan garis besar perintahnya.

## Contoh setengah jadi

Tambahkan eksperimen E2 yang hanya mengubah kekuatan regularisasi `C` dari E1. Lengkapi `____`.

```python setengah-jadi
eksperimen("E2", "E1 dengan C = 0.1", LogisticRegression(max_iter=1000, class_weight="____", C=____))
```

## Soal Parsons

Susun baris menjadi fungsi `rata` yang menghitung rata-rata, lalu mencetak rata-rata recall tiga lipatan `[0.5, 0.75, 0.25]` dengan dua desimal. Lekukan dipakai; yang diacak hanya urutannya.

```text
print(round(rata([0.5, 0.75, 0.25]), 2))
    return sum(nilai) / len(nilai)
def rata(nilai):
```

## Latihan

1. **Satu perbaikan terukur.** (`AI: boleh`) Pilih satu perubahan untuk model proyekmu dengan hipotesis tertulis, ukur pada lipatan data latih, dan tulis satu baris catatan eksperimen.
2. **Tambah E2.** (`AI: boleh`) Jalankan E2 pada program di atas. Apakah selisihnya dengan E1 melebihi sebaran? Apa yang kamu putuskan?
3. **Dua perubahan sekaligus.** (`AI: tanpa AI`) Seseorang mengubah bobot kelas dan menambah fitur sekaligus, dan recall naik. Mengapa kamu belum tahu mana yang membantu, dan apa yang kamu lakukan?
4. **Kebocoran.** (`AI: tanpa AI`) Temanmu memilih perubahan dengan melihat hasil pada data uji beberapa kali. Apa yang salah dengan angka akhirnya?
5. **Catatan pemakaian AI (opsional).** Catat alat, tujuan, garis besar perintah, bagian yang dipakai, dan cara memeriksanya. Jangan menaruh data pribadi apa pun pada permintaanmu.

## Latihan bercampur

1. Dari `d-xii1-m6`: dengan F1 0,36 dan recall 0,63, apa yang dapat kamu katakan tentang presisi E1, dan apakah ukuran sukses `d-xii1-m1` (recall sedikitnya 0,60, presisi sedikitnya 0,50) terpenuhi?
2. Dari `d-xii1-m4`: pada perubahan apa saja di proyekmu penilaian dampak pelindungan data perlu dipertimbangkan ulang, bila datanya kelak data orang sungguhan?

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `d-xii1-m8` (sekitar satu minggu lagi), `d-xii1-m10` (sekitar tiga minggu lagi), dan `D-XII2-M1` (sekitar delapan minggu lagi). Jawab sekarang lalu simpan.

1. Mengapa hanya satu hal diubah per eksperimen, dan apa yang dicatat di tabel eksperimen?
2. Apa gunanya benih acak dan mencatat versi pustaka, dan apa yang dicatat bila AI dipakai?
3. Mengapa perbaikan model diukur pada data validasi atau lipatan, bukan pada data uji, dan kapan data uji boleh dibuka?

## Kesalahan umum

- **"Banyak perubahan sekaligus lebih cepat."** Kamu tidak tahu mana yang menolong atau merugikan.
- **"Pilih perubahan yang terbaik pada data uji."** Itu membocorkan data uji ke keputusan; angka akhirnya tak jujur.
- **"Satu angka rata-rata cukup."** Sebaran menunjukkan seberapa goyah angka itu, terutama pada data kecil.
- **"Recall naik berarti model lebih baik."** Periksa harga pada presisi dan ukuran sukses.
- **"Catatan tak perlu karena kodenya ada."** Tanpa catatan benih, versi, dan perubahan, hasil sulit diulang.

## Cek mandiri

- [ ] Saya dapat menulis hipotesis perbaikan dari bukti.
- [ ] Saya dapat mengubah satu hal per eksperimen dan mengukurnya pada lipatan.
- [ ] Saya dapat membaca rata-rata dan sebaran antar lipatan.
- [ ] Saya dapat menulis catatan eksperimen yang dapat diulang.
- [ ] Saya mencatat pemakaian AI bila saya memakainya.

## Kunci dan petunjuk

**Ingat kembali.** 1: agar adil, pembanding dan model dinilai pada soal yang sama; bila model tidak mengalahkannya, belum layak dan penyebabnya dicari. 2: evaluasi risiko dan langkah mitigasinya (Pasal 34 UU PDP); wajib bila risiko tinggi, misalnya keputusan otomatis berdampak signifikan atau pemrosesan data spesifik atau skala besar. 3: versi Python dan pustaka, benih acak, data atau versinya, parameter model, cara membagi data, dan perubahan pada tiap percobaan.

**Prediksi dulu.** Recall naik (model lebih sering menandai kelas minoritas); harganya presisi turun karena lebih banyak tanda palsu. Angkanya tidak stabil: tiap lipatan hanya berisi sekitar 5 baris terlambat, sebarannya besar (0,31).

**Contoh setengah jadi.** Isian: `balanced`, `0.1`.

```python
eksperimen("E2", "E1 dengan C = 0.1", LogisticRegression(max_iter=1000, class_weight="balanced", C=0.1))
```

```text
E2 | E1 dengan C = 0.1            | recall 0.67 +- 0.22 | F1 0.38 +- 0.10
```

Recall 0,67 lawan 0,63 pada E1 dengan sebaran 0,31 dan 0,22: selisih 0,04 jauh lebih kecil daripada sebaran, jadi belum membuktikan C = 0,1 lebih baik.

**Soal Parsons.** Urutan benar:

```python
def rata(nilai):
    return sum(nilai) / len(nilai)
print(round(rata([0.5, 0.75, 0.25]), 2))
```

```text
0.5
```

**Latihan.** 1: rubrik: hipotesis dari bukti, satu perubahan, diukur pada lipatan, kondisi tetap dicatat, keputusan tertulis. 2: lihat kunci contoh setengah jadi: selisih 0,04 lebih kecil daripada sebaran, keputusan: tidak ada bukti, pertahankan E1 atau uji lebih banyak data. 3: karena dua perubahan tercampur; ulangi dengan satu perubahan per eksperimen. 4: keputusan dibentuk oleh data uji sehingga angka akhirnya terlalu optimis; pakai lipatan latih atau data validasi, simpan data uji untuk penilaian akhir. 5: opsional.

**Latihan bercampur.** 1: presisi rendah, sekitar 0,25 (F1 sekitar 0,36 dengan recall 0,63; hitungan kasar dari rata-rata lipatan); ukuran sukses belum terpenuhi karena presisi di bawah 0,50 meski recall mencapai 0,63. 2: bila proyek mulai memakai data orang sungguhan, memutuskan hal berdampak secara otomatis, memakai data spesifik, atau skala menjadi besar.

**Ulang berjarak.** 1: agar penyebab perubahan hasil jelas; tabel memuat kode, hipotesis, perubahan, kondisi tetap, hasil beserta sebaran, dan keputusan. 2: benih membuat hasil dapat diulang; versi pustaka menghindari beda hasil antarversi; bila AI dipakai, catat alat dan versi model, serta garis besar perintah. 3: karena data uji harus tak ikut memengaruhi keputusan; ia dibuka sekali di akhir untuk penilaian.

## Langkah berikutnya

Modul berikut: `d-xii1-m8` (iterasi model II), yang menjalankan tiga eksperimen dan menyusun tabel eksperimen agar dapat diulang. Bacaan lanjut: bagian *Cross-validation* pada dokumentasi `scikit-learn` (di `Rujukan`).
