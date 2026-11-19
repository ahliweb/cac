## Untuk siapa modul ini

Modul ini untuk murid kelas XII jalur D (kecerdasan buatan dan analisis data), untuk minggu `D-XII1-M10` silabus v1.3: kualitas kode dan keterulangan, yaitu merapikan kode, menetapkan benih acak, menulis README, dan mencatat versi model serta perintah bila AI dipakai, dengan keluaran proyek rapi. Prasyarat terindeks: modul `d-xi2-m14`. Modul `d-xii1-m7` sampai `d-xii1-m9` (eksperimen dan ulasan) ditulis dalam seri yang sama dan dibaca lebih dulu. Alat: Python 3 dengan `numpy` dan `scikit-learn`, tanpa akun.

Modul ini berstatus DRAF: karangan penyusun, belum ditinjau pemilik. Jalur D adalah pengayaan di luar rumusan capaian pembelajaran (CP). Minggu ini tidak punya irisan pengayaan, jadi modul ini tidak dihitung memenuhi butir CP mana pun.

Aturan jalur D yang berlaku: data hanya sintetis (karangan) atau terbuka dengan lisensi jelas, tanpa data yang bisa mengenali orang; wajah, suara, dan foto orang tidak dipakai sebagai data; AI generatif boleh dipakai dengan etika dan dicatat, tanpa data pribadi, kata sandi, atau tugas bernilai pada permintaanmu, dan kamu tidak wajib punya akun. Saran: jawab dulu sendiri, baru minta AI memberi petunjuk bertahap; kode buatan AI dibaca, dijalankan, dan diuji. Setiap soal `Latihan` bertanda `AI: boleh` atau `AI: tanpa AI`.

Catatan untuk guru: blok Python dijalankan penyusun dengan `python3 -I` (Python 3.14.6, `numpy` 2.5.5, `scikit-learn` 1.9.1, per 2026-11) dan keluarannya ditempel apa adanya; yang dinyatakan hanya "bisa dijalankan dengan keluaran ini", bukan "benar untuk semua masukan". Skrip contoh memakai data karangan yang lebih sederhana daripada `d-xii1-m5` (tanpa kolom `jenis`), sehingga angkanya berbeda. Baris versi pada keluaran akan berbeda di komputer murid; itu justru gunanya dicatat.

## Ingat kembali

Jawab dari ingatan, baru cek di bagian kunci.

1. Mengapa fitur yang baru diketahui sesudah keputusan membuat angka uji tidak jujur, dan apa pertanyaan pemeriksanya? (dari `d-xii1-m9`)
2. Apa gunanya benih acak dan mencatat versi pustaka, dan apa yang dicatat bila AI dipakai? (dari `d-xii1-m7`)
3. Mengapa kelompok yang kurang terwakili di data uji membuat angka rata-rata menyesatkan? (dari `d-xii1-m2`)

## Tujuan

Setelah modul ini kamu dapat:

- merapikan skrip: konstanta bernama, fungsi satu tugas, tanpa salinan kode, dan titik masuk `main`, tanpa mengubah keluarannya;
- menetapkan benih acak di satu tempat dan membuktikan bahwa hasil sama saat diulang;
- menulis README yang membuat orang lain dapat menjalankan ulang proyekmu;
- mencatat versi Python dan pustaka, serta alat, versi model bila diketahui, dan garis besar perintah bila AI dipakai.

Keluaran yang diminta silabus: proyek rapi.

## Prediksi dulu

Program di bawah membangkitkan lima angka dari sebuah benih. Tebak dan tulis, sebelum menjalankan: apa yang tercetak di baris pertama (dua perbandingan)? Lalu tebak: bila temanmu memakai versi `numpy` yang lebih baru, apakah angka pada benih 1 dijamin sama?

```python
import numpy as np


def acak(benih):
    return np.random.default_rng(benih).integers(0, 100, 5).tolist()


print(acak(1) == acak(1), acak(1) == acak(2))
print(acak(1))
```

## Contoh terselesaikan

**Benih membuat hasil dapat diulang, bukan benar.** Tebakan baris pertama: `True False`: benih sama menghasilkan urutan sama, benih lain berbeda. Dokumentasi `numpy` menyatakan `Generator` tidak menjamin kompatibilitas antarversi: algoritma yang lebih baik dapat mengubah urutan bit. Karena itu benih **dan** versi pustaka dicatat bersama.

```text
True False
[47, 51, 75, 95, 3]
```

**Refaktor** berarti memperbaiki susunan kode tanpa mengubah perilakunya. Skrip "sebelum" menjalankan dua eksperimen recall; ia bekerja, tetapi angka ajaib berserakan, nama satu huruf, dan dua kali pemanggilan yang disalin.

```python
import numpy as np
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import StratifiedKFold, cross_val_score

rng = np.random.default_rng(2026)
t = rng.integers(40, 500, 200)
h = rng.choice([7, 14, 21], 200, p=[0.4, 0.4, 0.2])
u = rng.integers(0, 2, 200)
s = -3.0 + 0.006 * t + 0.9 * u - 0.05 * h
y = (rng.random(200) < 1 / (1 + np.exp(-s))).astype(int)
X = np.column_stack([t, h, u])
k = StratifiedKFold(n_splits=5, shuffle=True, random_state=0)
a = cross_val_score(LogisticRegression(max_iter=1000), X, y, cv=k, scoring="recall")
print("E0", round(a.mean(), 2), round(a.std(), 2))
b = cross_val_score(LogisticRegression(max_iter=1000, class_weight="balanced"), X, y, cv=k, scoring="recall")
print("E1", round(b.mean(), 2), round(b.std(), 2))
```

```text
E0 0.02 0.04
E1 0.56 0.19
```

Versi "sesudah": konstanta bernama dan benih di satu tempat, fungsi satu tugas dengan docstring, `main` sebagai titik masuk, dan fungsi `catat_lingkungan` untuk README. Keluaran dua baris pertamanya **sama** dengan "sebelum": itulah bukti refaktor tidak mengubah perilaku.

```python
"""Eksperimen recall Pustaka Contoh (karangan). Jalankan: python eksperimen.py"""

import platform
from importlib.metadata import version

import numpy as np
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import StratifiedKFold, cross_val_score

BENIH = 2026  # satu-satunya sumber acak data
BENIH_LIPATAN = 0
N = 200


def buat_data(n=N, benih=BENIH):
    """Data karangan: peluang terlambat naik dengan tebal buku dan musim ujian."""
    rng = np.random.default_rng(benih)
    tebal = rng.integers(40, 500, n)
    hari = rng.choice([7, 14, 21], n, p=[0.4, 0.4, 0.2])
    ujian = rng.integers(0, 2, n)
    skor = -3.0 + 0.006 * tebal + 0.9 * ujian - 0.05 * hari
    y = (rng.random(n) < 1 / (1 + np.exp(-skor))).astype(int)
    return np.column_stack([tebal, hari, ujian]), y


def recall_lipatan(model, X, y):
    lipatan = StratifiedKFold(n_splits=5, shuffle=True, random_state=BENIH_LIPATAN)
    nilai = cross_val_score(model, X, y, cv=lipatan, scoring="recall")
    return round(nilai.mean(), 2), round(nilai.std(), 2)


def catat_lingkungan():
    pustaka = ("numpy", "scikit-learn")
    bagian = [f"python {platform.python_version()}"] + [f"{p} {version(p)}" for p in pustaka]
    return "; ".join(bagian) + f"; benih {BENIH}, lipatan {BENIH_LIPATAN}"


def main():
    X, y = buat_data()
    percobaan = {
        "E0": LogisticRegression(max_iter=1000),
        "E1": LogisticRegression(max_iter=1000, class_weight="balanced"),
    }
    for kode, model in percobaan.items():
        print(kode, *recall_lipatan(model, X, y))
    print(catat_lingkungan())


if __name__ == "__main__":
    main()
```

```text
E0 0.02 0.04
E1 0.56 0.19
python 3.14.6; numpy 2.5.5; scikit-learn 1.9.1; benih 2026, lipatan 0
```

**README** adalah halaman pertama yang dibaca orang lain, termasuk gurumu dan pengulas tim lain. Kerangkanya:

```text
# Proyek Pustaka Contoh (karangan)
Tujuan: menandai peminjaman yang mungkin terlambat (data karangan).
Data: dibangkitkan buat_data(benih=2026); asumsi: peluang terlambat naik dengan tebal buku.
Cara menjalankan: python eksperimen.py
Hasil: E1 recall 0.56 +- 0.19 (lipatan 5); data uji belum dibuka.
Lingkungan: python 3.14.6; numpy 2.5.5; scikit-learn 1.9.1; benih 2026, lipatan 0
Pemakaian AI: alat (versi model: tidak diketahui); tujuan; garis besar perintah;
  bagian yang dipakai; cara memeriksa (dijalankan dan diuji sendiri).
Batas: bukan data nyata; tidak untuk menolak peminjaman.
```

## Contoh setengah jadi

Lengkapi `____` agar benih ditetapkan di satu tempat dan program mencetak `True`.

```python setengah-jadi
import numpy as np

BENIH = ____


def acak(n, benih=____):
    return np.random.default_rng(____).integers(0, 10, n).tolist()


print(acak(3) == acak(3))
```

## Soal Parsons

Susun baris menjadi fungsi `format_versi` yang menghasilkan teks `nama versi`, lalu mencetaknya untuk `numpy` versi 2.5.5. Lekukan dipakai; yang diacak hanya urutannya.

```text
print(format_versi("numpy", "2.5.5"))
    return f"{nama} {versi}"
def format_versi(nama, versi):
```

## Latihan

1. **Refaktor skripmu.** (`AI: boleh`) Pilih satu skrip proyekmu. Beri nama pada angka ajaib, pecah menjadi fungsi satu tugas, hilangkan salinan kode, dan tambahkan `main`. Buktikan keluarannya sama sebelum dan sesudah.
2. **Sidik jari data.** (`AI: boleh`) Tambahkan ke program contoh pencetak delapan karakter pertama dari `hashlib.sha256(X.tobytes() + y.tobytes()).hexdigest()`. Jalankan dengan benih 2026 dua kali dan sekali dengan 2027. Apa yang kamu amati, dan apa gunanya?
3. **README.** (`AI: tanpa AI`) Tulis README proyekmu dengan delapan bagian seperti kerangka di atas.
4. **Catatan yang kurang.** (`AI: tanpa AI`) Seorang murid menulis di README: "dibantu AI". Sebutkan apa saja yang kurang.
5. **Catatan pemakaian AI (opsional).** Catat alat, tujuan, garis besar perintah, bagian yang dipakai, dan cara memeriksanya. Jangan menaruh data pribadi, kata sandi, atau kunci layanan pada permintaanmu.

## Latihan bercampur

1. Dari `d-xii1-m8`: tabel eksperimen mencatat "kondisi tetap". Tulis lima kondisi tetap yang dapat dihasilkan `catat_lingkungan` dan kerangka README di atas.
2. Dari `d-xii1-m9`: kamu mengulas skrip tim lain yang menyalin blok kode yang sama tiga kali. Tulis ulasan satu kalimat yang menunjuk bukti dan menyarankan perbaikan.

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `D-XII1-M11` (sekitar satu minggu lagi), `D-XII1-M13` (sekitar tiga minggu lagi), dan `D-XII2-M4` (sekitar delapan minggu lagi). Jawab sekarang lalu simpan.

1. Sebutkan empat hal yang dicatat di README agar orang lain dapat mengulang hasilmu.
2. Apa yang dicatat bila kamu memakai AI untuk menulis kode proyek, dan bagian mana yang tetap kamu periksa sendiri?
3. Mengapa perubahan versi pustaka atau benih dapat mengubah angka, dan bagaimana kamu menjaganya?

## Kesalahan umum

- **"Kode yang jalan sudah rapi."** Kode bisa jalan dengan angka ajaib dan salinan di mana-mana; orang lain (dan dirimu nanti) tak dapat memeriksanya.
- **"Benih membuat hasil benar."** Benih hanya membuat hasil dapat diulang; benih lain atau lipatan lain dapat memberi angka berbeda (`d-xii1-m8`).
- **"Menulis 'dibantu AI' sudah cukup."** Catat alat, versi model bila diketahui (atau "tidak diketahui"), tujuan, garis besar perintah, bagian yang dipakai, dan cara memeriksa.
- **"Refaktor sekalian menambah fitur."** Refaktor tidak boleh mengubah keluaran; fitur baru dikerjakan terpisah, satu hal tiap kali.

## Cek mandiri

- [ ] Saya dapat merapikan skrip tanpa mengubah keluarannya.
- [ ] Saya menetapkan benih di satu tempat dan membuktikan hasilnya dapat diulang.
- [ ] Saya dapat menulis README yang membuat orang lain bisa menjalankan ulang.
- [ ] Saya mencatat versi Python dan pustaka.
- [ ] Saya mencatat pemakaian AI bila saya memakainya.

## Kunci dan petunjuk

**Ingat kembali.** 1: fitur itu tidak ada saat keputusan sungguhan dibuat, sehingga model "mengintip jawaban"; pertanyaannya "apakah ini sudah diketahui saat keputusan dibuat?". 2: benih membuat hasil dapat diulang; versi pustaka menghindari beda hasil antarversi; bila AI dipakai, catat alat dan versi model, serta garis besar perintah. 3: karena angka rata-rata didominasi kelompok besar; pada kelompok kecil angkanya goyah atau tersembunyi, sehingga kelompok itu bisa gagal tanpa terlihat.

**Prediksi dulu.** Baris pertama `True False`. Angka pada benih 1 tidak dijamin sama pada versi `numpy` lain: dokumentasi `Generator` menyatakan tidak ada jaminan kompatibilitas versi.

**Contoh setengah jadi.** Isian: `2026`, `BENIH`, `benih`.

```python
import numpy as np

BENIH = 2026


def acak(n, benih=BENIH):
    return np.random.default_rng(benih).integers(0, 10, n).tolist()


print(acak(3) == acak(3))
```

```text
True
```

**Soal Parsons.** Urutan benar:

```python
def format_versi(nama, versi):
    return f"{nama} {versi}"
print(format_versi("numpy", "2.5.5"))
```

```text
numpy 2.5.5
```

**Latihan.** 1: rubrik: konstanta bernama, fungsi satu tugas, tanpa salinan, `main`, dan keluaran sebelum dan sesudah diperbandingkan serta sama. 2: contoh tambahan: `import hashlib` dan `print(hashlib.sha256(X.tobytes() + y.tobytes()).hexdigest()[:8])` di `main`. Hasil: benih 2026 memberi `05bab357` pada kedua jalannya dan benih 2027 memberi `88237848`; sidik jari yang sama membuktikan data identik, yang berbeda membuktikan data berubah, sehingga pembanding dapat memeriksa tanpa membuka seluruh data. (Nilai ini untuk data kecil tiga kolom pada program contoh; sidik jari dapat berbeda di mesin dengan susunan byte lain.) 3: tujuan, data dan asumsi, cara menjalankan, hasil dengan sebaran, lingkungan, pemakaian AI, batas, dan privasi. 4: alat, versi model bila diketahui, tujuan, garis besar perintah, bagian yang dipakai, dan cara memeriksa. 5: opsional.

**Latihan bercampur.** 1: contoh: versi Python, versi `numpy`, versi `scikit-learn`, benih data, dan benih lipatan. 2: contoh: "Blok yang sama muncul tiga kali pada baris 12, 25, dan 38; jadikan satu fungsi dengan parameter model supaya perubahan hanya dilakukan di satu tempat."

**Ulang berjarak.** 1: contoh: tujuan, data dan benihnya, cara menjalankan, hasil beserta sebaran, versi lingkungan, pemakaian AI. 2: alat dan versi model bila diketahui, tujuan, garis besar perintah, bagian yang dipakai; kode buatan AI tetap dibaca, dijalankan, dan diuji sendiri. 3: algoritma pustaka dapat berubah antarversi dan benih menentukan urutan acak; jaga dengan mencatat versi dan benih, serta menjalankan ulang dari awal.

## Langkah berikutnya

Modul berikut: `d-xii1-m11` (penilaian risiko dan etika proyek), yang memakai proyek yang sudah rapi ini untuk mengaudit risikonya. Bacaan lanjut: bagian *Controlling randomness* pada dokumentasi `scikit-learn`, dokumentasi `numpy.random.default_rng`, `importlib.metadata`, dan laporan Pineau dkk. tentang keterulangan (di `Rujukan`).
