## Untuk siapa modul ini

Modul ini untuk murid kelas XII jalur D (kecerdasan buatan dan analisis data), untuk minggu `D-XII2-M2` silabus v1.3: rancangan, yaitu merancang data, model, dan evaluasi, dengan keluaran dokumen rancangan. Prasyarat: modul `d-xii2-m1`. Bahan dari `d-xii1-m1` sampai `d-xii1-m14` (seri yang sama, belum semuanya terindeks) dipakai di sini. Alat: Python 3 dengan `numpy`, `pandas`, dan `scikit-learn`, tanpa akun. Berkelompok atau sendiri.

Modul ini berstatus DRAF: karangan penyusun, belum ditinjau pemilik. Jalur D adalah pengayaan di luar rumusan capaian pembelajaran (CP). Minggu ini tidak punya irisan pengayaan, jadi modul ini tidak dihitung memenuhi butir CP mana pun.

Aturan jalur D yang berlaku: data hanya sintetis (karangan) atau terbuka dengan lisensi jelas, tanpa data yang bisa mengenali orang; wajah, suara, dan foto orang tidak dipakai sebagai data; AI generatif boleh dipakai dengan etika dan dicatat, tanpa data pribadi, kata sandi, atau tugas bernilai pada permintaanmu, dan kamu tidak wajib punya akun. Saran: jawab dulu sendiri, baru minta AI memberi petunjuk bertahap; kode buatan AI dibaca, dijalankan, dan diuji. Pada proyek, catat pemakaian AI di log.

Catatan untuk guru: blok Python dijalankan penyusun dengan `python3 -I` (Python 3.14.6, `numpy` 2.5.5, `pandas` 3.1.1, `scikit-learn` 1.9.1, per 2026-11) dan keluarannya ditempel apa adanya; yang dinyatakan hanya "bisa dijalankan dengan keluaran ini", bukan "benar untuk semua masukan". Data Pustaka Contoh sama dengan `d-xii1-m5` (fungsi `buat_data` disalin agar program berdiri sendiri). Semua tokoh dan angka karangan.

## Ingat kembali

Jawab dari ingatan, baru cek di bagian kunci.

1. Sebutkan empat hal yang membuat tabel eksperimen dapat diulang orang lain. (dari `d-xii1-m8`)
2. Apa yang dilakukan bila ukuran sukses tidak tercapai, dan apa yang tidak boleh dilakukan? (dari `d-xii1-m13`)
3. Sebutkan bagian rencana proyek akhir dan mengapa ada urutan pemotongan lingkup. (dari `d-xii2-m1`)

## Tujuan

Setelah modul ini kamu dapat:

- menulis dokumen rancangan dengan empat bagian: data, model, evaluasi, dan tindakan bila gagal;
- menghitung ukuran data uji yang layak sebelum membangkitkan data, dan menjelaskan batas membesarkan data sintetis;
- menulis aturan pemilihan model sebelum hasil keluar, supaya keputusan tidak mengikuti selera;
- mengunci rancangan dengan sidik jari dan mengenali perubahan diam-diam.

Keluaran yang diminta silabus: dokumen rancangan.

## Rencana sprint

Rancangan ditulis sebelum menyentuh data. Ia menghubungkan rencana `d-xii2-m1` ke sprint berikutnya: `d-xii2-m3` menyiapkan data, `d-xii2-m4` menghitung garis dasar, `d-xii2-m5` membandingkan model.

Prediksi dulu. Pada `d-xii1-m6` data uji hanya 50 baris dengan 9 baris terlambat, sehingga satu baris menggeser recall 0,11. Tebak dan tulis: bila data dibangkitkan 600 atau 1000 baris, berapa baris terlambat di data uji, dan berapa pergeseran per baris?

**Contoh dokumen rancangan** (Pustaka Contoh, karangan):

| Bagian | Isi |
| --- | --- |
| Data | `buat_data(n=600, benih=2026)`; label `terlambat`; fitur hanya yang diketahui saat peminjaman dibuat; uji 25 persen, ditutup |
| Model | tiga kandidat dari sederhana ke rumit: regresi logistik seimbang, pohon kedalaman 3, hutan acak |
| Aturan pilih | F1 rata-rata lipatan tertinggi; selisih yang tidak melebihi sebaran dianggap setara, lalu pilih yang paling sederhana |
| Evaluasi | recall dan presisi; sasaran 0,60 dan 0,50; lima lipatan; data uji dibuka sekali di pengujian akhir |
| Bila gagal | laporkan apa adanya; cari sebab lewat analisis galat; sasaran hanya diubah lewat catatan perubahan bersama pengguna |

Mengapa 600, bukan 200? Dengan data uji sangat kecil, angka berayun dan tidak dapat dipercaya. Mengapa tidak 1000? Membesarkan data sintetis hanya mengurangi goyangan angka; ia tidak menambah pengetahuan tentang perpustakaan sungguhan, karena data itu hanya mengembalikan asumsimu (`d-xii1-m5`). Ukuran dipilih dari hitungan di bawah, dan keputusan beserta alasannya dicatat.

```python
import hashlib
import json

import numpy as np
import pandas as pd
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


# 1. Berapa baris data uji yang layak? Yang dihitung hanya jumlah baris, bukan model.
print("n | uji | terlambat di uji | geser recall per 1 baris")
for n in (200, 600, 1000):
    data = buat_data(n)
    _, uji = train_test_split(data, test_size=0.25, stratify=data["terlambat"], random_state=BENIH)
    positif = int(uji["terlambat"].sum())
    print(f"{n} | {len(uji)} | {positif} | {1 / positif:.3f}")

# 2. Dokumen rancangan dikunci dengan sidik jari (SHA-256).
RANCANGAN = {
    "data": {"fungsi": "buat_data", "n": 600, "benih": 2026, "uji": 0.25, "label": "terlambat"},
    "model": {
        "kandidat": ["regresi logistik seimbang", "pohon kedalaman 3", "hutan acak"],
        "aturan_pilih": "F1 tertinggi; selisih tidak melebihi sebaran dianggap setara, pilih yang paling sederhana",
    },
    "evaluasi": {
        "metrik": ["recall", "presisi"],
        "sasaran": {"recall": 0.60, "presisi": 0.50},
        "lipatan": 5,
        "uji_dibuka": "sekali, di minggu pengujian akhir",
    },
    "jika_gagal": "laporkan; cari sebab lewat analisis galat; sasaran hanya diubah lewat catatan perubahan",
}


def sidik(dokumen):
    teks = json.dumps(dokumen, sort_keys=True, ensure_ascii=False)
    return hashlib.sha256(teks.encode("utf-8")).hexdigest()[:12]


terkunci = sidik(RANCANGAN)
print("sidik rancangan:", terkunci)
RANCANGAN["evaluasi"]["sasaran"]["presisi"] = 0.40  # sasaran diturunkan diam-diam
print("sidik sesudah diubah:", sidik(RANCANGAN), "| sama dengan yang terkunci?", sidik(RANCANGAN) == terkunci)
```

```text
n | uji | terlambat di uji | geser recall per 1 baris
200 | 50 | 9 | 0.111
600 | 150 | 36 | 0.028
1000 | 250 | 59 | 0.017
sidik rancangan: 1f19ee252031
sidik sesudah diubah: 8036b1634c16 | sama dengan yang terkunci? False
```

Baca hasilnya. Pada 600 baris, satu baris menggeser recall 0,028, jauh lebih tenang daripada 0,111, dan tambahan dari 600 ke 1000 hanya mengecilkannya ke 0,017. Sidik jari berubah total saat satu angka diubah, sehingga perubahan diam-diam terlihat. Sidik jari ini penanda perubahan, bukan pengaman terhadap orang yang sengaja memalsukan.

## Daftar periksa

Centang tiap langkah dengan bukti.

- [ ] Bagian data menyebut asal, jumlah baris, label, dan bahwa fitur diketahui saat keputusan dibuat.
- [ ] Aturan pemilihan model ditulis sebelum model dibangun.
- [ ] Sasaran, lipatan, dan kapan data uji dibuka tertulis; tindakan bila gagal tertulis.
- [ ] Ukuran data uji dihitung, bukan ditebak.
- [ ] Sidik jari rancangan dicatat di README bersama versi Python dan pustaka.
- [ ] Prediksi ditulis sebelum menjalankan; log AI diisi bila AI dipakai.

## Umpan balik sejawat

Tukar dokumen rancangan dengan tim lain: satu yang sudah baik, satu yang perlu diperbaiki, satu langkah berikutnya, masing-masing menunjuk bagian dokumen. Pemeriksa bertanya: apakah aturan pilih ditulis sebelum hasil, apakah jumlah baris uji cukup, dan apakah ada jalan resmi mengubah sasaran. Sebut tim dengan nomor.

## Latihan bercampur

1. Dari `d-xii1-m9`: sebutkan satu kolom yang tidak boleh masuk fitur Pustaka Contoh karena baru diketahui sesudah buku kembali, dan jelaskan alasannya (`AI: tanpa AI`).
2. Dari `d-xii1-m7`: ubah aturan pilih agar memakai recall, bukan F1, dan jelaskan apa yang berubah pada keputusan (`AI: boleh`).

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `d-xii2-m3` (sekitar satu minggu lagi), `d-xii2-m5` (sekitar tiga minggu lagi), dan `D-XII2-M10` (sekitar delapan minggu lagi). Jawab sekarang lalu simpan.

1. Mengapa ukuran data uji dihitung sebelum data dibangkitkan, dan apa arti satu baris pada data uji kecil?
2. Apa yang dikunci di dokumen rancangan, dan mengapa sidik jari dipakai?
3. Apa aturan tertulis untuk memilih model, dan mengapa ia ditulis sebelum hasil keluar?

## Kesalahan umum

- **"Aturan pilih model ditulis sesudah melihat hasil."** Aturan jadi pembenaran, bukan pedoman.
- **"Data sintetis diperbesar sampai hasilnya bagus."** Yang membaik hanya kestabilan angka, bukan kebenaran tentang dunia nyata.
- **"Sasaran boleh turun diam-diam bila sulit."** Sasaran diubah lewat catatan perubahan beserta alasan dan bukti.
- **"Sidik jari berarti dokumen aman."** Ia hanya menandai bahwa isi berubah.

## Cek mandiri

- [ ] Saya dapat menulis rancangan data, model, evaluasi, dan tindakan bila gagal.
- [ ] Saya dapat menghitung ukuran data uji dan menjelaskan pilihannya.
- [ ] Saya dapat menulis aturan pilih model sebelum hasil keluar.
- [ ] Saya mencatat pemakaian AI bila memakainya.

## Kunci dan petunjuk

**Ingat kembali.** 1: contoh: kode dan kode induk, satu perubahan, kondisi tetap (data, benih, lipatan, versi), hasil beserta sebaran, keputusan. 2: laporkan apa adanya, cari sebab, ubah satu hal tiap eksperimen atau bahas kelayakan sasaran dengan pengguna dan catat; tidak boleh menurunkan sasaran diam-diam atau memilih model dari data uji. 3: topik, pertanyaan, data, ukuran sukses, peran, jadwal, risiko, urutan potong; urutan potong menjaga uji dan etika saat waktu habis.

**Rencana sprint.** Dari 9 di antara 50 baris (18 persen), tebakan wajar sekitar 27 pada 150 baris uji. Hasil sebenarnya 36 (pergeseran 0,028) dan 59 dari 250 baris (0,017), karena data baru punya proporsi terlambat yang berbeda (sekitar 24 persen); angka pastinya bergantung benih. Yang penting: pergeseran per baris mengecil kira-kira berbanding terbalik dengan jumlah baris terlambat di data uji.

**Daftar periksa.** Dinilai dari bukti: dokumen rancangan dan sidik jarinya.

**Latihan bercampur.** 1: `hari_lewat`, yang baru ada sesudah buku kembali; fitur harus diketahui saat keputusan dibuat. 2: model dengan recall tertinggi akan dipilih walau presisinya buruk; aturan harus memuat metrik dan harga yang dapat diterima.

**Ulang berjarak.** 1: agar kecukupan data uji diputuskan dari hitungan, bukan dari hasil; satu baris di data kecil menggeser angka banyak. 2: rancangan lengkap dengan sasaran dan aturan; sidik jari menandai bila isinya berubah. 3: contoh: F1 tertinggi, selisih sebaran dianggap setara lalu pilih yang sederhana; ditulis sebelum hasil agar tidak mengikuti selera.

## Langkah berikutnya

Modul berikut: `d-xii2-m3` (sprint data: menyiapkan dan memeriksa data). Bacaan lanjut: bagian *Cross-validation* pada dokumentasi `scikit-learn` dan modul `hashlib` pada dokumentasi Python (di `Rujukan`).
