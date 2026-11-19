## Untuk siapa modul ini

Modul ini untuk murid kelas XII jalur D (kecerdasan buatan dan analisis data), untuk minggu `D-XII2-M3` silabus v1.3: sprint 1 data, yaitu menyiapkan dan memeriksa data, dengan keluaran data siap pakai. Prasyarat: modul `d-xii2-m2`. Alat: Python 3 dengan `numpy`, `pandas`, dan `scikit-learn`, tanpa akun. Berkelompok atau sendiri.

Modul ini berstatus DRAF: karangan penyusun, belum ditinjau pemilik. Jalur D adalah pengayaan di luar rumusan capaian pembelajaran (CP). Minggu ini tidak punya irisan pengayaan, jadi modul ini tidak dihitung memenuhi butir CP mana pun.

Aturan jalur D yang berlaku: data hanya sintetis (karangan) atau terbuka dengan lisensi jelas, tanpa data yang bisa mengenali orang; wajah, suara, dan foto orang tidak dipakai sebagai data; AI generatif boleh dipakai dengan etika dan dicatat, tanpa data pribadi, kata sandi, atau tugas bernilai pada permintaanmu, dan kamu tidak wajib punya akun. Saran: jawab dulu sendiri, baru minta AI memberi petunjuk bertahap; kode buatan AI dibaca, dijalankan, dan diuji. Pada proyek, catat pemakaian AI di log.

Catatan untuk guru: blok Python dijalankan penyusun dengan `python3 -I` (Python 3.14.6, `numpy` 2.5.5, `pandas` 3.1.1, `scikit-learn` 1.9.1, per 2026-11) dan keluarannya ditempel apa adanya; yang dinyatakan hanya "bisa dijalankan dengan keluaran ini", bukan "benar untuk semua masukan". Program menulis `data_proyek.csv` di folder kerja; sidik berkasnya bergantung versi `pandas`. Fungsi `buat_data` disalin dari `d-xii1-m5` dengan `n` 600. Semua data karangan.

## Ingat kembali

Jawab dari ingatan, baru cek di bagian kunci.

1. Sebutkan empat hal yang diperiksa pada data sebelum model dibangun. (dari `d-xii1-m9`)
2. Mengapa ukuran data uji dihitung sebelum data dibangkitkan, dan apa arti satu baris pada data uji kecil? (dari `d-xii2-m2`)
3. Apa yang dicatat di catatan sumber dan data, dan mengapa data sintetis harus menyebut asumsinya? (dari `d-xii1-m5`)

## Tujuan

Setelah modul ini kamu dapat:

- menjalankan pemeriksaan data: nilai hilang, baris kembar, kode ganda, label, dan fitur yang diketahui saat keputusan dibuat;
- membaca jumlah baris tiap kelompok dan menyebut kelompok yang buktinya tipis;
- membagi data latih dan uji sebelum melihat hasil, dan membuktikan tidak ada baris yang sama di keduanya;
- menulis catatan kualitas data dan membuktikan berkas tidak berubah sejak diperiksa.

Keluaran yang diminta silabus: data siap pakai.

## Rencana sprint

Sprint ini menjalankan bagian data dari rancangan `d-xii2-m2`: 600 baris, uji 25 persen, ditutup. Prediksi dulu: apakah pemeriksa menemukan masalah pada data karangan ini? Tebak juga berapa baris terlambat di data latih dan di data uji, dan apakah ada baris yang isinya sama persis dengan baris lain padahal kodenya berbeda.

```python
import hashlib

import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split

BENIH = 2026
FITUR = ["tebal", "hari", "jenis", "musim_ujian"]  # semua diketahui saat peminjaman dibuat


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


def periksa(data):
    """Pemeriksaan sebelum model dibangun; mengembalikan daftar temuan."""
    temuan = []
    hilang = data[FITUR + ["terlambat"]].isna().sum()
    if hilang.sum():
        temuan.append(f"nilai hilang: {hilang[hilang > 0].to_dict()}")
    kembar = int(data.duplicated().sum())  # semua kolom sama: salinan
    if kembar:
        temuan.append(f"baris kembar utuh: {kembar}")
    kode_ganda = int(data["kode"].duplicated().sum())
    if kode_ganda:
        temuan.append(f"kode ganda: {kode_ganda}")
    if not set(data["terlambat"].dropna().unique()) <= {0, 1}:
        temuan.append("label di luar 0 dan 1")
    return temuan


data = buat_data(600)
print("bentuk:", data.shape)
print("temuan:", periksa(data) or "tidak ada")
print("label:", data["terlambat"].value_counts().to_dict())
print("isi sama tetapi kode beda:", int(data.duplicated(subset=FITUR + ["terlambat"]).sum()), "baris")
kel = data.groupby("jenis")["terlambat"].agg(baris="count", terlambat="sum")
kel["bagian"] = (kel["terlambat"] / kel["baris"]).round(2)
print(kel.to_string())

latih, uji = train_test_split(data, test_size=0.25, stratify=data["terlambat"], random_state=BENIH)
print("latih:", len(latih), "terlambat:", int(latih["terlambat"].sum()), "| uji:", len(uji), "terlambat:", int(uji["terlambat"].sum()))
print("kode yang ada di latih dan uji sekaligus:", len(set(latih["kode"]) & set(uji["kode"])))

data.to_csv("data_proyek.csv", index=False, lineterminator="\n")
with open("data_proyek.csv", "rb") as f:
    print("sidik berkas:", hashlib.sha256(f.read()).hexdigest()[:12])

# pemeriksa diuji pada salinan rusak: 5 nilai tebal hilang, 3 baris digandakan
rusak = data.copy()
rusak.loc[[3, 40, 77, 120, 300], "tebal"] = np.nan
rusak = pd.concat([rusak, rusak.iloc[[10, 11, 12]]], ignore_index=True)
print("salinan rusak:", periksa(rusak))
```

```text
bentuk: (600, 6)
temuan: tidak ada
label: {0: 457, 1: 143}
isi sama tetapi kode beda: 11 baris
           baris  terlambat  bagian
jenis                              
anak         179         38    0.21
referensi     95         20    0.21
umum         326         85    0.26
latih: 450 terlambat: 107 | uji: 150 terlambat: 36
kode yang ada di latih dan uji sekaligus: 0
sidik berkas: f3a6bfec7fbe
salinan rusak: ["nilai hilang: {'tebal': 5}", 'baris kembar utuh: 3', 'kode ganda: 3']
```

Baca hasilnya. Data bersih secara teknis, tetapi datanya timpang: 143 dari 600 terlambat (24 persen). Tiap jenis kini punya cukup baris (referensi 95, dulu hanya 25), dan jumlah baris ditulis di samping bagiannya supaya pembaca menilai kuat-lemahnya. Ada 11 baris yang isinya sama dengan baris lain tetapi kodenya berbeda: itu wajar, karena ciri dapat kebetulan sama dan kodenya menandai peminjaman yang berbeda; kode yang ganda atau baris kembar utuh barulah salinan. Pembagian menghasilkan 450 baris latih (107 terlambat) dan 150 baris uji (36 terlambat), tanpa kode yang bocor ke kedua bagian. Pemeriksa terbukti bekerja pada salinan rusak. Ia hanya menangkap yang diprogramkan; ia tidak tahu bila asumsi pembangkit data keliru.

**Catatan kualitas data** memuat: asal (`buat_data(n=600, benih=2026)`, karangan) beserta asumsinya; arti label; ukuran dan jumlah baris tiap kelompok; hasil pemeriksaan dan keputusan atasnya (11 baris isi sama dibiarkan beserta alasannya); pembagian latih dan uji; sidik berkas beserta versi `pandas`; dan batas (bukan kenyataan perpustakaan).

## Daftar periksa

Centang tiap langkah dengan bukti.

- [ ] Pemeriksa dijalankan pada data proyek; temuan dan keputusan atasnya dicatat.
- [ ] Pemeriksa diuji pada salinan rusak buatanmu sendiri (hapus lima nilai, gandakan tiga baris).
- [ ] Jumlah baris tiap kelompok ditulis di samping angkanya; kelompok tipis disebut.
- [ ] Data dibagi sebelum model dilihat; tidak ada kode di kedua bagian; data uji ditutup.
- [ ] Berkas data disimpan dan sidiknya dicatat; label "karangan" dan asumsi tertulis.
- [ ] Prediksi ditulis sebelum menjalankan; log AI diisi bila AI dipakai.

## Umpan balik sejawat

Tukar catatan kualitas data dengan tim lain: satu yang sudah baik, satu yang perlu diperbaiki, satu langkah berikutnya, masing-masing menunjuk bagian catatan. Pemeriksa bertanya: apakah jumlah baris tiap kelompok ada, apakah keputusan atas tiap temuan beralasan, dan apakah ada fitur yang baru diketahui sesudah keputusan. Sebut tim dengan nomor.

## Latihan bercampur

1. Dari `d-xii1-m2`: kelompok `referensi` pada `d-xii1-m5` hanya 25 baris. Mengapa persen kelompok itu sebaiknya tidak ditulis tanpa jumlah barisnya (`AI: tanpa AI`)?
2. Dari `d-xii1-m10`: mengapa catatan data menulis benih dan versi pustaka bersama sidik berkas (`AI: boleh`)?

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `d-xii2-m4` (sekitar satu minggu lagi), `d-xii2-m6` (sekitar tiga minggu lagi), dan `D-XII2-M11` (sekitar delapan minggu lagi). Jawab sekarang lalu simpan.

1. Mengapa pembagian latih dan uji dibuat sebelum melihat hasil, dan pemeriksaan apa memastikan tidak ada baris yang sama di keduanya?
2. Apa yang dilakukan bila pemeriksaan menemukan masalah data, selain membuang barisnya diam-diam?
3. Apa isi catatan kualitas data, dan apa yang membuktikan berkas data tidak berubah sejak diperiksa?

## Kesalahan umum

- **"Data karangan tidak perlu diperiksa."** Kesalahan program pembangkit tetap dapat menghasilkan data cacat.
- **"Baris yang isinya sama pasti salinan."** Periksa kodenya; ciri dapat kebetulan sama.
- **"Temuan dibuang saja."** Catat apa yang ditemukan, berapa baris, dan mengapa tindakan itu dipilih.
- **"Satu persen cukup."** Persen tanpa jumlah baris menyembunyikan kelompok yang tipis.

## Cek mandiri

- [ ] Saya dapat menjalankan dan menguji pemeriksaan data.
- [ ] Saya dapat membaca jumlah baris tiap kelompok.
- [ ] Saya dapat membagi data dan membuktikan tidak ada kebocoran kode.
- [ ] Saya dapat menulis catatan kualitas data dengan sidik berkas.
- [ ] Saya mencatat pemakaian AI bila memakainya.

## Kunci dan petunjuk

**Ingat kembali.** 1: contoh: nilai hilang, baris ganda, proporsi label, kolom yang mengenali orang, dan kolom yang bocor (baru diketahui sesudah keputusan). 2: agar kecukupan diputuskan dari hitungan; satu baris di data kecil menggeser angka banyak. 3: asal dan lisensi atau tanda karangan, ukuran, arti label, asumsi, batas, dan privasi; data sintetis hanya mengembalikan asumsi pembuatnya, sehingga asumsinya harus tertulis.

**Rencana sprint.** Tebakan wajar: temuan teknis tidak ada, sekitar seperempat terlambat; sekitar 107 dan 36 baris terlambat di latih dan uji (stratifikasi menjaga proporsi); ada beberapa baris yang isinya kebetulan sama (11).

**Daftar periksa.** Dinilai dari bukti: catatan, keluaran pemeriksa, dan sidik berkas.

**Latihan bercampur.** 1: 25 baris dengan 2 terlambat tampak "8 persen", padahal satu baris saja mengubahnya 4 poin; jumlah baris memberi pembaca ukuran keyakinan. 2: benih dan versi memungkinkan orang lain membangkitkan data yang sama dan memeriksa bahwa berkasnya tidak berubah.

**Ulang berjarak.** 1: karena keputusan pembagian tak boleh dipengaruhi hasil; periksa irisan kode (atau ciri) kedua bagian, yang harus kosong. 2: catat temuan, jumlah baris, dan alasan tindakan (perbaiki, isi, atau biarkan), dan selidiki sumbernya. 3: asal, asumsi, ukuran, arti label, hasil pemeriksaan dan keputusan, pembagian, batas; sidik berkas (hash) berubah bila isi berkas berubah.

## Langkah berikutnya

Modul berikut: `d-xii2-m4` (garis dasar: model pembanding dan metrik awal). Bacaan lanjut: bagian *Common pitfalls and recommended practices* pada dokumentasi `scikit-learn` dan `DataFrame.duplicated` pada dokumentasi `pandas` (di `Rujukan`).
