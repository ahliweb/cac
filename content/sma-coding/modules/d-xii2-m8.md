## Untuk siapa modul ini

Modul ini untuk murid kelas XII jalur D (kecerdasan buatan dan analisis data), untuk minggu `D-XII2-M8` silabus v1.3: pengujian akhir, yaitu menguji pada data yang belum dipakai, dengan keluaran laporan uji. Prasyarat terindeks: modul `d-xii1-m13`. Modul `d-xii2-m1` sampai `d-xii2-m7` ditulis dalam seri yang sama dan bahannya dipakai di sini (rilis kandidat, sidik, ambang, catatan perubahan). Alat: Python 3 dengan `numpy`, `pandas`, dan `scikit-learn`, tanpa akun. Berkelompok atau sendiri.

Modul ini berstatus DRAF: karangan penyusun, belum ditinjau pemilik. Jalur D adalah pengayaan di luar rumusan capaian pembelajaran (CP); minggu ini tidak punya irisan pengayaan, jadi tidak dihitung memenuhi butir CP mana pun.

Aturan jalur D: data hanya sintetis (karangan) atau terbuka berlisensi jelas, tanpa data yang mengenali orang, tanpa wajah, suara, atau foto; AI generatif boleh dengan etika dan dicatat, tanpa data pribadi, kata sandi, atau tugas bernilai pada permintaanmu, dan tanpa kewajiban akun. Jawab dulu sendiri, baru minta petunjuk bertahap; kode buatan AI dibaca, dijalankan, dan diuji. Catat pemakaian AI di log proyek.

Catatan untuk guru: blok Python dijalankan penyusun dengan `python3 -I` (Python 3.14.6, `numpy` 2.5.5, `pandas` 3.1.1, `scikit-learn` 1.9.1, per 2026-11), keluarannya ditempel apa adanya; yang dinyatakan hanya "bisa dijalankan dengan keluaran ini", bukan "benar untuk semua masukan". Data dan proyek "Pustaka Contoh" sama dengan `d-xii2-m3` sampai `d-xii2-m7`; semua karangan.

## Ingat kembali

Jawab dari ingatan, baru cek kunci.

1. Apa arti rilis kandidat, dan apa yang dibekukan sebelum data uji dibuka? (dari `d-xii2-m7`)
2. Apa aturan memilih model bila selisih tidak melebihi sebaran, dan mengapa pilihan jatuh pada yang sederhana? (dari `d-xii2-m5`)
3. Mengapa tebakan mayoritas berketepatan tinggi tetapi tidak berguna, dan metrik apa yang membuktikannya? (dari `d-xii2-m4`)

## Tujuan

Setelah modul ini kamu dapat:

- mencocokkan sidik rilis kandidat sebelum data uji dibuka;
- membuka data uji satu kali dan menghitung recall, presisi, dan bagian yang diingatkan;
- melaporkan hasil dan pembanding dengan selang kasar dan jumlah baris per kelompok;
- menyatakan apa yang dilakukan, dan tidak boleh dilakukan, bila sasaran tidak tercapai.

Keluaran yang diminta silabus: laporan uji.

## Rencana sprint

Pengujian akhir adalah satu peristiwa, bukan langkah yang boleh diulang: cocokkan sidik, buka data uji lewat pintu yang hanya terbuka sekali, hitung metrik model dan pembanding, lalu laporkan, termasuk yang mengecewakan. Sasaran yang dipakai adalah sasaran baru dari catatan perubahan `d-xii2-m7`, ditetapkan sebelum data uji dibuka.

Prediksi dulu. Tebak dan tulis: apakah recall dan presisi uji lebih tinggi atau lebih rendah daripada angka lipatan (0,58 dan 0,40), dan apakah model mengalahkan aturan tulisan tangan di keduanya?

```python
import hashlib
import json

import numpy as np
import pandas as pd
from sklearn.dummy import DummyClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split

BENIH = 2026
AMBANG = 0.55
SIDIK_KANDIDAT = "a1f97fdbe259"  # dicatat di README pada d-xii2-m7


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
KANDIDAT = {
    "data": "buat_data(n=600, benih=2026); uji 0.25 ditutup",
    "model": "LogisticRegression(max_iter=1000, class_weight='balanced')",
    "fitur": list(X.columns),
    "ambang": AMBANG,
}
sidik = hashlib.sha256(json.dumps(KANDIDAT, sort_keys=True).encode("utf-8")).hexdigest()[:12]
print("sidik kandidat:", sidik, "| sama dengan catatan?", sidik == SIDIK_KANDIDAT)
assert sidik == SIDIK_KANDIDAT, "kandidat berubah: data uji tidak boleh dibuka"


class PintuUji:
    """Data uji hanya bisa dibuka sekali; percobaan kedua ditolak."""

    def __init__(self, data_uji):
        self._data = data_uji
        self.dibuka = 0

    def buka(self):
        if self.dibuka:
            raise RuntimeError("data uji sudah dibuka; pembukaan kedua ditolak")
        self.dibuka += 1
        return self._data


pintu = PintuUji(uji)

# model dilatih pada data latih saja, lalu dibekukan
model = LogisticRegression(max_iter=1000, class_weight="balanced").fit(X.loc[latih.index], latih["terlambat"])
mayoritas = DummyClassifier(strategy="most_frequent").fit(X.loc[latih.index], latih["terlambat"])

u = pintu.buka()  # satu-satunya pembukaan
y = u["terlambat"].to_numpy()
peluang = model.predict_proba(X.loc[u.index])[:, 1]
tanda = (peluang >= AMBANG).astype(int)


def hitung(y, tanda):
    tp = int(((tanda == 1) & (y == 1)).sum())
    fp = int(((tanda == 1) & (y == 0)).sum())
    fn = int(((tanda == 0) & (y == 1)).sum())
    tn = int(((tanda == 0) & (y == 0)).sum())
    recall = tp / (tp + fn) if tp + fn else 0.0
    presisi = tp / (tp + fp) if tp + fp else 0.0
    return tp, fp, fn, tn, recall, presisi


tp, fp, fn, tn, recall, presisi = hitung(y, tanda)
print(f"data uji: {len(u)} baris, {int(y.sum())} terlambat | TP={tp} FP={fp} FN={fn} TN={tn}")
print(f"model | recall {recall:.2f} | presisi {presisi:.2f} | pengingat {tanda.mean():.2f}")
tm = mayoritas.predict(X.loc[u.index])
_, _, _, _, r_m, p_m = hitung(y, tm)
print(f"tebakan mayoritas | recall {r_m:.2f} | presisi {p_m:.2f} | ketepatan {(tm == y).mean():.2f}")
aturan = ((u["tebal"] >= 300) & (u["musim_ujian"] == 1)).astype(int).to_numpy()
_, _, _, _, r_a, p_a = hitung(y, aturan)
print(f"aturan tebal+ujian | recall {r_a:.2f} | presisi {p_a:.2f} | pengingat {aturan.mean():.2f}")

# selang ketidakpastian: ulang-contoh baris uji (bootstrap), hanya untuk menunjukkan goyangan
rng = np.random.default_rng(0)
rs, ps = [], []
for _ in range(1000):
    i = rng.integers(0, len(u), len(u))
    _, _, _, _, r, p = hitung(y[i], tanda[i])
    rs.append(r)
    ps.append(p)
print(f"selang 95% kasar: recall {np.percentile(rs, 2.5):.2f}-{np.percentile(rs, 97.5):.2f} | presisi {np.percentile(ps, 2.5):.2f}-{np.percentile(ps, 97.5):.2f}")

print("jenis | baris | terlambat | recall | presisi | cukup bukti")
for nilai in ("anak", "referensi", "umum"):
    m = (u["jenis"] == nilai).to_numpy()
    _, _, _, _, r, p = hitung(y[m], tanda[m])
    pos = int(y[m].sum())
    print(f"{nilai} | {int(m.sum())} | {pos} | {r:.2f} | {p:.2f} | {'ya' if pos >= 10 else 'TIPIS'}")

print("sasaran lama (recall 0.60, presisi 0.50):", "terpenuhi" if recall >= 0.60 and presisi >= 0.50 else "belum terpenuhi")
print("sasaran baru (recall 0.55, presisi 0.35, pengingat <= 0.35):", "terpenuhi" if recall >= 0.55 and presisi >= 0.35 and tanda.mean() <= 0.35 else "belum terpenuhi")
print("pembukaan data uji:", pintu.dibuka)
try:
    pintu.buka()
except RuntimeError as galat:
    print("percobaan kedua:", galat)
pd.DataFrame({"kode": u["kode"], "jenis": u["jenis"], "terlambat": y, "tanda": tanda}).to_csv("hasil_uji.csv", index=False, lineterminator="\n")
```

```text
sidik kandidat: a1f97fdbe259 | sama dengan catatan? True
data uji: 150 baris, 36 terlambat | TP=20 FP=32 FN=16 TN=82
model | recall 0.56 | presisi 0.38 | pengingat 0.35
tebakan mayoritas | recall 0.00 | presisi 0.00 | ketepatan 0.76
aturan tebal+ujian | recall 0.47 | presisi 0.59 | pengingat 0.19
selang 95% kasar: recall 0.39-0.74 | presisi 0.25-0.53
jenis | baris | terlambat | recall | presisi | cukup bukti
anak | 47 | 15 | 0.47 | 0.47 | ya
referensi | 22 | 5 | 0.40 | 0.40 | TIPIS
umum | 81 | 16 | 0.69 | 0.34 | ya
sasaran lama (recall 0.60, presisi 0.50): belum terpenuhi
sasaran baru (recall 0.55, presisi 0.35, pengingat <= 0.35): terpenuhi
pembukaan data uji: 1
percobaan kedua: data uji sudah dibuka; pembukaan kedua ditolak
```

Baca hasilnya. Sidik cocok: yang diuji memang kandidat yang dibekukan. Model mendapat recall 0,56, presisi 0,38, dan mengingatkan 35 persen peminjaman, sedikit di bawah lipatan karena ambang dipilih dari data lipatan. Tebakan mayoritas berketepatan 0,76 tetapi recall 0. Aturan tulisan tangan menandai 29 dan menangkap 17 dari 36 yang terlambat (presisi 0,59); model menandai 52 dan menangkap 20. Selisih tiga baris itu ada di dalam selang kasar model (0,39 sampai 0,74; hasil mengulang-contoh baris uji, hanya goyangan), jadi belum terbukti model lebih baik pada recall, dan pada presisi aturan lebih tinggi. Keduanya titik kerja berbeda.

Referensi hanya 5 baris terlambat: TIPIS. Sasaran lama belum terpenuhi, tetap dilaporkan. Sasaran baru terpenuhi tipis: 20 dari 36 adalah 0,556 melawan 0,55, di bawah satu baris. Tulis "memenuhi sasaran baru dengan selisih kurang dari satu baris pada 150 baris uji karangan", bukan "model berhasil".

Pintu menolak pembukaan kedua, dan itulah gunanya. Bila sasaran tidak tercapai, laporkan apa adanya; jangan ubah ambang atau fitur lalu menguji lagi pada data yang sama. Perbaikan menjadi rilis kandidat baru pada data uji baru. **Laporan uji** memuat: sidik dan jumlah pembukaan data uji; ukuran data; tabel model dan pembanding; selang; tabel per kelompok dengan jumlah baris; hasil terhadap sasaran lama dan baru; klaim tiga tingkat.

## Daftar periksa

Centang tiap langkah dengan bukti.

- [ ] Sidik dicocokkan dengan README sebelum data uji dibuka.
- [ ] Data uji dibuka satu kali; jumlahnya tertulis di laporan.
- [ ] Model dan pembanding dinilai pada data uji yang sama.
- [ ] Angka diberi selang kasar; angka per kelompok diberi jumlah baris.
- [ ] Sasaran lama dan baru sama-sama dilaporkan; klaim tiga tingkat; log AI diisi.

## Umpan balik sejawat

Tukar laporan uji dengan tim lain: satu yang sudah baik, satu yang perlu diperbaiki, satu langkah berikutnya, masing-masing menunjuk bagian laporan. Tanyakan: apakah jumlah pembukaan tertulis, dan adakah kalimat yang lebih kuat daripada selisih angkanya.

## Latihan bercampur

1. Dari `d-xii2-m6`: tulis klaim tiga tingkat untuk model dan aturan tulisan tangan pada data uji ini (`AI: boleh`).
2. Dari `d-xii1-m6`: dengan 36 peminjaman terlambat, berapa pergeseran recall per baris, dan mengapa itu penting saat menyatakan sasaran terpenuhi (`AI: tanpa AI`)?

## Ulang berjarak

Pertanyaan ini muncul lagi di `Ingat kembali` modul `d-xii2-m9` (sekitar 1 minggu lagi), `d-xii2-m11` (sekitar 3 minggu), dan `D-XII2-M14` (sekitar 6 minggu). Jawab sekarang lalu simpan.

1. Mengapa angka laporan uji ditulis bersama selang kasar dan jumlah barisnya?
2. Mengapa data uji dibuka satu kali saja, dan apa yang dilakukan bila hasilnya tidak mencapai sasaran?
3. Mengapa memenuhi sasaran dengan selisih kurang dari satu baris tidak boleh ditulis sebagai keberhasilan?

## Kesalahan umum

- **"Hasilnya mengecewakan, ubah sedikit lalu uji lagi."** Itu memakai data uji untuk memilih; angka berikutnya terlalu optimis.
- **"Sasaran terpenuhi berarti model baik."** Periksa selisihnya terhadap goyangan dan pembanding.
- **"Kelompok kecil dilaporkan seperti kelompok besar."** Tandai TIPIS dan tulis jumlah barisnya.

## Cek mandiri

- [ ] Saya dapat mencocokkan sidik sebelum membuka data uji.
- [ ] Saya dapat membuka data uji satu kali dan menilai model dan pembanding.
- [ ] Saya dapat melaporkan selang kasar dan angka per kelompok.
- [ ] Saya dapat menulis klaim yang tidak lebih kuat daripada buktinya.
- [ ] Saya mencatat pemakaian AI bila memakainya.

## Kunci dan petunjuk

**Ingat kembali.** 1: konfigurasi dibekukan (data, model, fitur, ambang, benih, versi) dan diberi sidik jari; data uji tetap tertutup sampai kandidat final. 2: bila selisih tidak melebihi sebaran, modelnya dianggap setara dan dipilih yang paling sederhana; aturan ditulis sebelum hasil keluar. 3: pada data timpang tebakan mayoritas tepat untuk kelas besar; recall kelas minoritas 0 menunjukkan ia tidak menangkap satu pun. 4: ambang mengubah recall dan presisi sehingga termasuk model yang diuji; bila dipilih dari data uji, angka uji tak lagi jujur.

**Rencana sprint.** Tebakan wajar: angka uji sedikit lebih rendah daripada lipatan; model mengalahkan aturan pada recall tetapi belum tentu pada presisi, dan selisihnya tipis. Menurut keluaran: recall 0,56 dan presisi 0,38; aturan recall 0,47 dan presisi 0,59.

**Daftar periksa.** Dinilai dari bukti: keluaran program, README dengan sidik, dan laporan uji.

**Latihan bercampur.** 1: contoh: *didukung*: model dan aturan keduanya jauh di atas tebakan mayoritas (recall 0); *belum terbukti*: model lebih baik daripada aturan pada recall (selisih 3 baris, di dalam selang); *tidak diketahui*: kinerja pada perpustakaan sungguhan. 2: 1 dibagi 36 = 0,028 per baris; sasaran 0,55 dan hasil 0,556 berbeda kurang dari satu baris, jadi satu peminjaman saja dapat membalik kesimpulan.

**Ulang berjarak.** 1: data uji kecil membuat angka berayun; selang dan jumlah baris memberi pembaca ukuran kepercayaannya. 2: angka berikutnya pada data yang sama tak jujur; laporkan apa adanya, lalu buat rilis kandidat baru dengan data uji baru. 3: selisih sekecil itu dalam goyangan; satu baris dapat membaliknya, jadi klaimnya "belum terbukti kuat".

## Langkah berikutnya

Modul berikut: `d-xii2-m9` (dokumentasi: kartu model dan panduan). Bacaan lanjut: dokumentasi `scikit-learn` tentang validasi silang dan kesalahan umum (di `Rujukan`).
