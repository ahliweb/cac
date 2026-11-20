## Untuk siapa modul ini

Modul ini untuk murid kelas XII jalur D (kecerdasan buatan dan analisis data), untuk minggu `D-XII2-M12` silabus v1.3: presentasi, yaitu mendemonstrasikan proyek, dengan keluaran demo. Prasyarat terindeks: modul `d-xii2-m11` (seri yang sama); bahan `d-xii2-m1` sampai `d-xii2-m11` dipakai di sini. Alat: Python 3 dengan `numpy`, `pandas`, dan `scikit-learn`, tanpa akun. Berkelompok atau sendiri.

Modul ini karangan penyusun dan disetujui pemilik program pada 2026-11-20 (keputusan lewat dialog; catatan tinjauan menjadi tindak lanjut revisi). Jalur D adalah pengayaan di luar rumusan capaian pembelajaran (CP); minggu ini tidak punya irisan pengayaan, jadi tidak dihitung memenuhi butir CP mana pun.

Aturan jalur D: data hanya sintetis (karangan) atau terbuka berlisensi jelas, tanpa data yang mengenali orang, tanpa wajah, suara, atau foto; AI generatif boleh dengan etika dan dicatat, tanpa data pribadi, kata sandi, atau tugas bernilai pada permintaanmu, dan tanpa kewajiban akun. Jawab dulu sendiri, baru minta petunjuk bertahap; kode buatan AI dibaca, dijalankan, dan diuji. Catat pemakaian AI di log proyek.

Catatan untuk guru: blok Python dijalankan penyusun dengan `python3 -I` (Python 3.14.6, `numpy` 2.5.5, `pandas` 3.1.1, `scikit-learn` 1.9.1, per 2026-11), keluarannya ditempel apa adanya; yang dinyatakan hanya "bisa dijalankan dengan keluaran ini", bukan "benar untuk semua masukan". Lama presentasi dan jumlah slide hanya usulan; sesuaikan dengan jadwal kelas. Semua data dan peminjaman dalam demo karangan.

## Ingat kembali

Jawab dari ingatan, baru cek kunci.

1. Mengapa slide hasil selalu memuat pembanding sederhana di samping model? (dari `d-xii2-m4`)
2. Apa yang diperiksa pemeriksa bentuk kartu, dan apa yang tidak dapat diperiksanya? (dari `d-xii2-m9`)
3. Mengapa ulasan menunjuk bagian paket sebagai bukti, bukan menilai orangnya? (dari `d-xii2-m11`)
4. Apa tiga tingkat klaim pada narasi hasil, dan beri satu contoh tiap tingkat? (dari `d-xii1-m12`)

## Tujuan

Setelah modul ini kamu dapat:

- menyusun presentasi enam menit dengan slide masalah, hasil, batas, dan etika, ditambah demo;
- menjalankan demo dari rilis kandidat yang sidiknya cocok dengan slide;
- menulis slide hasil yang memuat pembanding, selang, dan jumlah baris tanpa melebih-lebihkan;
- menyiapkan rencana cadangan bila demo gagal, dan jawaban untuk pertanyaan yang sulit.

Keluaran yang diminta silabus: demo.

## Rencana sprint

Presentasi proyek berbeda dari laporan: pendengar tidak dapat membaca ulang, jadi tiap slide membawa satu pesan. Empat slide wajib: **masalah** (pertanyaan dan pengguna fiktif), **hasil** (model, pembanding, selang, jumlah baris), **batas** (apa yang belum terbukti dan tidak diketahui), dan **etika** (privasi, kelompok yang lebih lemah, log AI). Demo menunjukkan model bekerja, bukan membuktikan ketepatannya: tiga contoh tidak membuktikan apa pun tentang ratusan peminjaman.

Prediksi dulu. Tebak dan tulis: apa yang ditebak model untuk tiga peminjaman karangan di bawah, dan temuan apa yang akan dihasilkan pemeriksa slide untuk draf slide yang sengaja dibuat kurang?

```python
import hashlib
import json

import numpy as np
import pandas as pd
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split

BENIH = 2026
AMBANG = 0.55
SIDIK_KANDIDAT = "a1f97fdbe259"


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


# 1. Demo: rilis kandidat dipulihkan, sidiknya dicek, lalu tiga peminjaman karangan ditebak
data = buat_data(600)
latih, _ = train_test_split(data, test_size=0.25, stratify=data["terlambat"], random_state=BENIH)
X = pd.get_dummies(data[["tebal", "hari", "jenis", "musim_ujian"]], drop_first=True).astype(float)
kandidat = {
    "data": "buat_data(n=600, benih=2026); uji 0.25 ditutup",
    "model": "LogisticRegression(max_iter=1000, class_weight='balanced')",
    "fitur": list(X.columns),
    "ambang": AMBANG,
}
sidik = hashlib.sha256(json.dumps(kandidat, sort_keys=True).encode("utf-8")).hexdigest()[:12]
print("sidik kandidat:", sidik, "| cocok dengan slide?", sidik == SIDIK_KANDIDAT)
model = LogisticRegression(max_iter=1000, class_weight="balanced").fit(X.loc[latih.index], latih["terlambat"])
baru = pd.DataFrame(
    {
        "tebal": [450, 80, 120],
        "hari": [7, 14, 21],
        "jenis": ["umum", "anak", "referensi"],
        "musim_ujian": [1, 0, 1],
    }
)
Xb = pd.get_dummies(baru, drop_first=False).astype(float)
Xb = Xb.reindex(columns=X.columns, fill_value=0.0)
peluang = model.predict_proba(Xb)[:, 1]
for i, pel in enumerate(peluang):
    print(f"peminjaman karangan {i + 1} | {baru.loc[i, 'jenis']}, {baru.loc[i, 'tebal']} halaman | skor {pel:.2f} | {'ingatkan' if pel >= AMBANG else 'tidak ditandai'}")

# 2. Pemeriksa slide: tiap slide punya peran; hanya bentuk yang diperiksa, bukan kebenaran isinya
WAJIB = {
    "masalah": ("pertanyaan", "pengguna"),
    "hasil": ("pembanding", "baris", "selang"),
    "batas": ("batasan", "tidak diketahui"),
    "etika": ("privasi", "kelompok", "log ai"),
}
SLIDE = {
    "masalah": "Pertanyaan: penanda keterlambatan untuk pengguna fiktif",
    "hasil": "Hasil: model recall 0,56, kami sangat puas",
    "demo": "Demo: tiga peminjaman karangan",
    "etika": "Etika: privasi dan log AI",
}


def periksa_slide(slide):
    temuan = []
    for peran, kata in WAJIB.items():
        if peran not in slide:
            temuan.append(f"slide {peran} tidak ada")
        elif not any(k in slide[peran].lower() for k in kata):
            temuan.append(f"slide {peran}: belum memuat salah satu dari {', '.join(kata)}")
    return temuan


for baris in periksa_slide(SLIDE):
    print("temuan slide:", baris)

# 3. Anggaran waktu: 6 menit untuk 6 slide dengan demo
MENIT = {"masalah": 1.0, "metode": 1.0, "hasil": 1.5, "demo": 1.0, "batas dan etika": 1.0, "penutup": 0.5}
print("total menit:", sum(MENIT.values()), "| melebihi 6 menit?", sum(MENIT.values()) > 6)
```

```text
sidik kandidat: a1f97fdbe259 | cocok dengan slide? True
peminjaman karangan 1 | umum, 450 halaman | skor 0.86 | ingatkan
peminjaman karangan 2 | anak, 80 halaman | skor 0.12 | tidak ditandai
peminjaman karangan 3 | referensi, 120 halaman | skor 0.18 | tidak ditandai
temuan slide: slide hasil: belum memuat salah satu dari pembanding, baris, selang
temuan slide: slide batas tidak ada
total menit: 6.0 | melebihi 6 menit? False
```

Baca hasilnya. Sidik kandidat cocok dengan yang tertulis di slide, jadi demo memakai kandidat yang diuji, bukan versi yang diutak-atik. Buku umum 450 halaman berjangka tujuh hari pada musim ujian mendapat skor 0,86 dan ditandai; buku anak 80 halaman dan buku referensi 120 halaman tidak. Itu masuk akal, tetapi tiga contoh bukan bukti; angka kinerja ada di slide hasil. Pemeriksa slide menemukan dua hal: slide hasil menyatakan "kami sangat puas" tanpa pembanding, jumlah baris, atau selang, dan slide batas tidak ada sama sekali. Perbaikannya menambah baris pembanding dan selang pada slide hasil, serta slide batas yang menyebut kelompok referensi TIPIS dan data karangan.

Anggaran waktu dihitung agar tidak melampaui enam menit; demo paling lama satu menit dan dilatih sampai tidak bergantung pada keberuntungan. **Rencana cadangan**: bila demo gagal, tunjukkan keluaran yang sudah disimpan, jangan meminta waktu tambahan, dan jangan memperbaiki kode di depan pendengar. Siapkan juga tiga pertanyaan sulit dengan jawabannya: mengapa pembanding sederhana hampir sebaik model; apa yang terjadi pada buku anak; apa arti sasaran baru.

## Daftar periksa

Centang tiap langkah dengan bukti.

- [ ] Slide masalah, hasil, batas, dan etika ada; tiap slide membawa satu pesan.
- [ ] Slide hasil memuat pembanding, selang, dan jumlah baris.
- [ ] Sidik di slide cocok dengan sidik yang dijalankan di demo.
- [ ] Demo dilatih dalam waktu; keluaran cadangan tersimpan.
- [ ] Tiga pertanyaan sulit dan jawabannya ditulis; log AI diisi.

## Umpan balik sejawat

Tonton presentasi tim lain atau latihannya: satu yang sudah baik, satu yang perlu diperbaiki, satu langkah berikutnya, masing-masing menunjuk slide atau menit tertentu. Tanyakan: adakah kalimat di slide yang lebih kuat daripada bukti di slide hasil?

## Latihan bercampur

1. Tulis ulang slide hasil yang buruk di program: pembanding, selang kasar, dan jumlah baris, tanpa kata "puas" (`AI: boleh`).
2. Dari `d-xii2-m8`: tulis dua kalimat untuk slide batas tentang sasaran baru yang terpenuhi kurang dari satu baris (`AI: tanpa AI`).
3. Dari `d-xii2-m10`: pilih satu temuan laporan etika yang masuk slide etika dan jelaskan mengapa (`AI: boleh`).

## Ulang berjarak

Pertanyaan ini muncul lagi di `Ingat kembali` modul `d-xii2-m13` (sekitar 1 minggu lagi) dan `D-XII2-M14` (sekitar 2 minggu). Jawab sekarang lalu simpan.

1. Apa tiga hal wajib di slide hasil, dan mengapa slide batas tidak boleh dihilangkan?
2. Mengapa demo dengan tiga contoh bukan bukti ketepatan model?
3. Apa yang dilakukan bila demo gagal saat presentasi, dan apa yang tidak dilakukan?

## Kesalahan umum

- **"Demo yang berhasil membuktikan model bagus."** Demo hanya menunjukkan cara kerja; bukti ada di data uji.
- **"Slide batas melemahkan presentasi."** Penonton menilai jujur-tidaknya dari batas yang kamu sebut.
- **"Perbaiki kode sebentar di depan kelas."** Tunjukkan keluaran cadangan; perbaikan menunggu.

## Cek mandiri

- [ ] Saya dapat menyusun empat slide wajib dalam enam menit.
- [ ] Saya dapat menjalankan demo dari kandidat dengan sidik yang cocok.
- [ ] Saya dapat menulis slide hasil dengan pembanding, selang, dan jumlah baris.
- [ ] Saya punya rencana cadangan dan jawaban untuk pertanyaan sulit.
- [ ] Saya mencatat pemakaian AI bila memakainya.

## Kunci dan petunjuk

**Ingat kembali.** 1: agar pendengar menilai model terhadap titik acuan; ketepatan tebakan mayoritas 0,76 bisa menyesatkan. 2: judul bagian dan kata kunci; tidak dapat menilai benar-tidaknya angka atau kalimat. 3: agar temuan dapat dicek dan tidak menjadi serangan pribadi. 4: *didukung* (selisih melampaui sebaran), *belum terbukti* (di dalam sebaran), *tidak diketahui* (tidak diukur); contoh sesuai proyek.

**Rencana sprint.** Tebakan wajar: peminjaman 1 ditandai, 2 dan 3 tidak; pemeriksa menemukan slide hasil kurang dan slide batas hilang.

**Daftar periksa.** Dinilai dari bukti: slide, keluaran demo, dan catatan jawaban.

**Latihan bercampur.** 1: contoh: "Model: recall 0,56 (selang kasar 0,39 sampai 0,74), presisi 0,38; aturan tulisan tangan: recall 0,47, presisi 0,59; tebakan mayoritas: recall 0; uji 150 baris, 36 terlambat." 2: contoh: "Sasaran baru terpenuhi dengan selisih kurang dari satu baris, jadi satu peminjaman dapat membaliknya. Sasaran lama belum terpenuhi." 3: contoh: buku anak sering terlewat (recall 0,39 pada lipatan); penonton perlu tahu siapa yang dirugikan dan apa yang dilakukan petugas.

**Ulang berjarak.** 1: pembanding, selang atau sebaran, dan jumlah baris; slide batas menunjukkan apa yang belum terbukti dan membuat klaim dapat dipercaya. 2: tiga contoh terlalu sedikit untuk mengukur; ketepatan diukur pada data uji lewat metrik dan selang. 3: tunjukkan keluaran yang sudah disimpan dan lanjutkan; jangan memperbaiki kode di depan pendengar dan jangan menyembunyikan kegagalannya.

## Langkah berikutnya

Modul berikut: `d-xii2-m13` (portofolio dan refleksi). Bacaan lanjut: bagian *Model Cards for Model Reporting* (Mitchell dkk., 2019) dan dokumentasi `scikit-learn` tentang validasi silang (di `Rujukan`).
