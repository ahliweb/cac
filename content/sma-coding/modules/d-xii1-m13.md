## Untuk siapa modul ini

Modul ini untuk murid kelas XII jalur D (kecerdasan buatan dan analisis data), untuk minggu `D-XII1-M13` silabus v1.3: proyek, yaitu menyiapkan proyek akhir, dengan keluaran rencana dan kemajuan. Prasyarat terindeks: modul `d-xi2-m14`. Modul `d-xii1-m1` sampai `d-xii1-m12` ditulis dalam seri yang sama; bahan dari modul-modul itu dipakai di sini. Alat: Python 3 dengan `numpy`, `pandas`, dan `scikit-learn`, tanpa akun. Berkelompok atau sendiri.

Modul ini berstatus DRAF: karangan penyusun, belum ditinjau pemilik. Jalur D adalah pengayaan di luar rumusan capaian pembelajaran (CP). Minggu ini tidak punya irisan pengayaan, jadi modul ini tidak dihitung memenuhi butir CP mana pun.

Aturan jalur D yang berlaku: data hanya sintetis (karangan) atau terbuka dengan lisensi jelas, tanpa data yang bisa mengenali orang; wajah, suara, dan foto orang tidak dipakai sebagai data; AI generatif boleh dipakai dengan etika dan dicatat, tanpa data pribadi, kata sandi, atau tugas bernilai pada permintaanmu, dan kamu tidak wajib punya akun. Saran: jawab dulu sendiri, baru minta AI memberi petunjuk bertahap; kode buatan AI dibaca, dijalankan, dan diuji. Pada proyek, catat pemakaian AI di log.

Catatan untuk guru: blok Python dijalankan penyusun dengan `python3 -I` (Python 3.14.6, `numpy` 2.5.5, `pandas` 3.1.1, `scikit-learn` 1.9.1, per 2026-11) dan keluarannya ditempel apa adanya; yang dinyatakan hanya "bisa dijalankan dengan keluaran ini", bukan "benar untuk semua masukan". Rubrik pada kunci adalah usulan, tanpa angka resmi. Panduan Mata Pelajaran Informatika (Fase F, Proses Rekayasa) memberi contoh asesmen: log proyek, umpan balik sejawat, dan portofolio berisi analisis kebutuhan, desain, pengujian, kode, dan refleksi; rubriknya tidak dikutip di sini.

## Ingat kembali

Jawab dari ingatan, baru cek di bagian kunci.

1. Apa enam bagian presentasi hasil proyek, dan bagian mana yang memuat batas dan risiko? (dari `d-xii1-m12`)
2. Apa yang dicatat bila kamu memakai AI untuk menulis kode proyek, dan bagian mana yang tetap kamu periksa sendiri? (dari `d-xii1-m10`)
3. Mengapa temuan dari data sintetis tidak boleh disajikan sebagai fakta tentang dunia nyata? (dari `d-xii1-m5`)

## Tujuan

Setelah modul ini kamu dapat:

- menulis rencana proyek akhir dengan prediksi tertulis dan rencana kerja untuk semester berikutnya;
- menilai kemajuan terhadap ukuran sukses dari dokumen kebutuhan tanpa membuka data uji;
- memeriksa bahwa bahan semester ini lengkap dan dapat ditunjukkan sebagai bukti;
- memberi dan menerima umpan balik sejawat yang berisi.

Keluaran yang diminta silabus: rencana dan kemajuan.

## Rencana proyek

Tulis rencana **sebelum** menjalankan model baru. Satu halaman berisi: **pertanyaan**, **data**, **pembanding**, **metrik utama** dengan alasan, **kriteria selesai**, **prediksi** angka, dan **risiko**. Rencana semester dua mengacu pada kerangka `D-XII2` di silabus: rancangan, sprint data, sprint model, penyempurnaan, pengujian akhir, dokumentasi, ulasan, presentasi, portofolio.

**Contoh rencana terselesaikan** (Pustaka Contoh, karangan):

| Bagian | Isi |
| --- | --- |
| Pertanyaan | tandai peminjaman yang mungkin terlambat agar petugas mengirim pengingat lebih awal |
| Data | `buat_data(benih=2026)`, 200 baris karangan; data uji disimpan dan belum dibuka |
| Pembanding | tebakan mayoritas dan regresi logistik bawaan |
| Metrik utama | recall kelas terlambat sedikitnya 0,60 dan presisi sedikitnya 0,50 (dari `d-xii1-m1`) |
| Kriteria selesai | sasaran tercapai pada lipatan latih, lalu dibuka sekali pada data uji; program jalan ulang dari awal |
| Prediksi | recall mendekati 0,6 bisa dicapai; presisi 0,50 sulit dengan 200 baris |
| Risiko | model dipakai menolak peminjaman; recall rendah pada buku anak; kebocoran data uji |

Program berikut menilai kemajuan: tiap kandidat dibandingkan dengan sasaran pada lipatan data latih.

```python
import warnings

import numpy as np
import pandas as pd
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import StratifiedKFold, cross_validate, train_test_split
from sklearn.tree import DecisionTreeClassifier

warnings.simplefilter("ignore")  # peringatan presisi tanpa tebakan positif tidak perlu dicetak
BENIH = 2026
SASARAN = {"recall": 0.60, "presisi": 0.50}  # ukuran sukses dari dokumen kebutuhan (d-xii1-m1)


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

kandidat = {
    "E1": LogisticRegression(max_iter=1000, class_weight="balanced"),
    "E2": LogisticRegression(max_iter=1000, class_weight="balanced", C=0.1),
    "E4": DecisionTreeClassifier(max_depth=3, class_weight="balanced", random_state=0),
}
print("kandidat | recall | presisi | kekurangan terhadap sasaran")
for kode, model in kandidat.items():
    h = cross_validate(model, X_latih, y_latih, cv=lipatan, scoring=["recall", "precision"])
    nilai = {"recall": h["test_recall"].mean(), "presisi": h["test_precision"].mean()}
    kurang = {k: round(float(SASARAN[k] - v), 2) for k, v in nilai.items() if v < SASARAN[k]}
    status = "memenuhi" if not kurang else f"belum: {kurang}"
    print(f"{kode} | {nilai['recall']:.2f} | {nilai['presisi']:.2f} | {status}")
print("data uji: belum dibuka")
```

```text
kandidat | recall | presisi | kekurangan terhadap sasaran
E1 | 0.63 | 0.26 | belum: {'presisi': 0.24}
E2 | 0.67 | 0.27 | belum: {'presisi': 0.23}
E4 | 0.50 | 0.20 | belum: {'recall': 0.1, 'presisi': 0.3}
data uji: belum dibuka
```

Laporan kemajuan menulis apa adanya: recall E1 dan E2 mencapai sasaran, tetapi presisi masih sekitar 0,26 dari sasaran 0,50, dan E4 belum memenuhi keduanya. Prediksi rencana ("presisi sulit") terbukti. Yang **sah** dilakukan: mengumpulkan atau membangkitkan data lebih banyak dengan asumsi yang sama, mencoba fitur atau model lain (satu hal tiap eksperimen), atau membahas dengan pengguna fiktif apakah sasaran presisi masuk akal, lalu mencatat keputusannya. Yang **tidak sah**: menurunkan sasaran diam-diam agar tampak lulus, atau mengintip data uji untuk memilih model.

## Daftar periksa

Centang tiap langkah **dengan bukti** (berkas atau keluaran yang bisa ditunjukkan).

- [ ] Rencana dan prediksi ditulis sebelum menjalankan model baru; ukuran sukses disalin dari dokumen kebutuhan.
- [ ] Folder proyek memuat dokumen kebutuhan, catatan kasus, daftar periksa kepatuhan, catatan sumber dan data, laporan garis dasar, tabel eksperimen, catatan ulasan, README, laporan risiko, dan draf presentasi.
- [ ] Skrip terakhir dijalankan ulang dari awal dengan hasil sama; benih dan versi dicatat.
- [ ] Kemajuan dinilai pada lipatan latih dan data uji belum dibuka.
- [ ] Tiap risiko pada laporan risiko punya tindakan dan minggu pengerjaannya.
- [ ] Label "karangan" ada di setiap angka yang akan disajikan.
- [ ] Log pemakaian AI diisi bila AI dipakai.

## Umpan balik sejawat

Tukar rencana dengan kelompok lain dan beri umpan balik dalam tiga kalimat: **satu yang sudah baik, satu yang perlu diperbaiki, satu langkah berikutnya**, masing-masing menunjuk bagian tertentu (baris rencana, angka, atau berkas). Pemeriksa bertanya: apakah sasaran dapat diuji, apakah prediksi tertulis sebelum hasil, dan apakah tindakan risiko punya minggu pengerjaan. Ulasan memakai nama kelompok atau nomor, bukan nama orang.

## Latihan bercampur

1. Dari `d-xii1-m6`: sasaran presisi 0,50 belum dicapai E1 (sekitar 0,26). Tulis dua tanggapan yang sah dan satu yang tidak sah.
2. Dari `d-xii1-m11`: pilih dua risiko dari laporan risikomu dan tentukan fase semester dua yang menanganinya.

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `d-xii1-m14` (sekitar satu minggu lagi), `D-XII2-M2` (sekitar tiga minggu lagi), dan `D-XII2-M7` (sekitar delapan minggu lagi). Jawab sekarang lalu simpan.

1. Apa tujuh bagian rencana proyek, dan mengapa prediksi ditulis sebelum menjalankan?
2. Apa yang dilakukan bila ukuran sukses tidak tercapai, dan apa yang tidak boleh dilakukan?
3. Kapan data uji dibuka, berapa kali, dan mengapa?

## Kesalahan umum

- **"Rencana ditulis setelah hasil keluar."** Prediksi sesudahnya selalu tampak benar; rencana menguji dugaanmu.
- **"Sasaran yang tak tercapai diturunkan saja."** Sasaran berasal dari kebutuhan pengguna; bila tak tercapai, laporkan dan putuskan langkah dengan bukti.
- **"Kemajuan diukur di data uji."** Data uji dibuka sekali di akhir; kemajuan diukur pada lipatan latih.
- **"Bahan cukup disimpan di kepala."** Tanpa berkas, orang lain tak dapat memeriksa.

## Cek mandiri

- [ ] Saya menulis rencana dengan prediksi dan kriteria selesai.
- [ ] Saya menilai kemajuan terhadap ukuran sukses tanpa membuka data uji.
- [ ] Saya memeriksa bahwa bahan semester ini lengkap dan dapat ditunjukkan.
- [ ] Saya memberi umpan balik tiga kalimat dan mengisi log AI bila memakainya.

## Kunci dan petunjuk

**Ingat kembali.** 1: masalah, data, pembanding, hasil, batas dan risiko, langkah berikutnya; batas dan risiko di bagian kelima. 2: alat dan versi model bila diketahui, tujuan, garis besar perintah, bagian yang dipakai; kode buatan AI tetap dibaca, dijalankan, dan diuji sendiri. 3: karena data sintetis hanya mengembalikan aturan yang ditulis pembuatnya.

**Rencana proyek.** Tidak ada satu jawaban benar. Rencana yang baik: sasaran dapat diuji, pembanding dan metrik punya alasan, prediksi memakai angka dan ditulis sebelum menjalankan, risiko disebut beserta tindakannya. Pada contoh, prediksi "presisi sulit" terpenuhi (0,26 lawan sasaran 0,50). Bila prediksimu meleset, tulis mengapa; itu bagian belajarnya.

**Daftar periksa.** Dinilai dari bukti tiap butir, bukan dari centang. Usulan rubrik guru (tiga tingkat, tanpa angka resmi): *kuat* bila rencana dan prediksi mendahului hasil, sasaran dari dokumen kebutuhan, bahan semester lengkap dan dapat ditunjukkan, program jalan ulang dengan hasil sama, data uji tertutup, dan risiko punya tindakan beserta fase; *cukup* bila bahan ada tetapi prediksi, tindakan risiko, atau label karangan belum lengkap; *perlu dilengkapi* bila sasaran diubah tanpa catatan, data uji sudah dilihat, atau program tidak dapat dijalankan ulang.

**Umpan balik sejawat.** Contoh: "Sudah baik: sasaran recall dan presisi disalin dari dokumen kebutuhan. Perlu diperbaiki: risiko buku anak belum punya minggu pengerjaan. Langkah berikutnya: jadwalkan pengumpulan data anak di fase data dan laporkan jumlah barisnya."

**Latihan bercampur.** 1: sah: menambah data dengan asumsi yang sama dan mencatatnya; mencoba satu perubahan lain pada model dengan tabel eksperimen; membahas kelayakan sasaran dengan pengguna fiktif dan mencatat keputusannya. Tidak sah: menurunkan sasaran tanpa catatan atau memilih model dari data uji. 2: contoh: recall buku anak rendah ke fase data (kumpulkan baris anak), model dipakai menolak peminjaman ke fase dokumentasi (tulis di luar cakupan di kartu model).

**Ulang berjarak.** 1: pertanyaan, data, pembanding, metrik utama, kriteria selesai, prediksi, risiko; prediksi menguji dugaanmu dan mencegah hasil "disesuaikan" setelah dilihat. 2: laporkan apa adanya, cari penyebab, lalu coba perubahan satu hal tiap eksperimen atau bahas kelayakan sasaran dengan pengguna dan catat keputusannya; jangan menurunkan sasaran diam-diam atau memakai data uji untuk memilih. 3: sekali, di akhir setelah model dan keputusan tetap, agar angkanya jujur.

## Langkah berikutnya

Modul berikut: `d-xii1-m14` (asesmen dan refleksi semester ini) lalu `D-XII2-M1` (perencanaan proyek akhir). Bacaan lanjut: `cross_validate` dan bagian *Common pitfalls* pada dokumentasi `scikit-learn`, serta bagian Proses Rekayasa pada Panduan Mata Pelajaran Informatika (di `Rujukan`).
