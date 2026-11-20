## Untuk siapa modul ini

Modul ini untuk murid kelas XII jalur D (kecerdasan buatan dan analisis data), untuk minggu `D-XII2-M10` silabus v1.3: ulasan etika dan privasi, yaitu memeriksa data pribadi, bias, dan dampak, dengan keluaran laporan etika. Prasyarat terindeks: modul `d-xii2-m9` (seri yang sama); bahan `d-xii2-m1` sampai `d-xii2-m9` dan laporan risiko `d-xii1-m11` dipakai di sini. Alat: Python 3 dengan `numpy`, `pandas`, dan `scikit-learn`, tanpa akun. Berkelompok atau sendiri.

Modul ini karangan penyusun dan disetujui pemilik program pada 2026-11-20 (keputusan lewat dialog; catatan tinjauan menjadi tindak lanjut revisi). Jalur D adalah pengayaan di luar rumusan capaian pembelajaran (CP); minggu ini tidak punya irisan pengayaan, jadi tidak dihitung memenuhi butir CP mana pun.

Aturan jalur D: data hanya sintetis (karangan) atau terbuka berlisensi jelas, tanpa data yang mengenali orang, tanpa wajah, suara, atau foto; AI generatif boleh dengan etika dan dicatat, tanpa data pribadi, kata sandi, atau tugas bernilai pada permintaanmu, dan tanpa kewajiban akun. Jawab dulu sendiri, baru minta petunjuk bertahap; kode buatan AI dibaca, dijalankan, dan diuji. Catat pemakaian AI di log proyek.

Catatan untuk guru: blok Python dijalankan penyusun dengan `python3 -I` (Python 3.14.6, `numpy` 2.5.5, `pandas` 3.1.1, `scikit-learn` 1.9.1, per 2026-11), keluarannya ditempel apa adanya; yang dinyatakan hanya "bisa dijalankan dengan keluaran ini", bukan "benar untuk semua masukan". Ini latihan, bukan nasihat hukum. Semua data karangan; nama dan surel dalam contoh fiktif.

## Ingat kembali

Jawab dari ingatan, baru cek kunci.

1. Apa aturan tertulis untuk memilih model, dan mengapa ia ditulis sebelum hasil keluar? (dari `d-xii2-m2`)
2. Kapan sasaran boleh diubah, dan apa yang dicatat dalam catatan perubahan? (dari `d-xii2-m7`)
3. Mengapa kartu model memuat bagian "di luar cakupan", dan apa isinya untuk proyek ini? (dari `d-xii2-m9`)
4. Mengapa skor risiko kemungkinan kali dampak hanya alat prioritas? (dari `d-xii1-m11`)

## Tujuan

Setelah modul ini kamu dapat:

- memindai berkas data dan paket proyek untuk penanda yang mengenali orang, dan menyebut batas pemindaian;
- mengaudit hasil per kelompok memakai tebakan di luar lipatan, tanpa membuka lagi data uji;
- membedakan perbedaan yang ada di data dari keputusan tentang adil atau tidak, yang tetap di tangan manusia;
- menulis laporan etika: risiko, bukti, tindakan, dan risiko yang tersisa.

Keluaran yang diminta silabus: laporan etika.

## Rencana sprint

Ulasan memakai tiga pemeriksaan. **Privasi**: apakah ada kolom atau nilai yang mengenali orang? Menurut ringkasan Undang-Undang Pelindungan Data Pribadi (UU 27/2022) di portal JDIH BPK, undang-undang itu mengatur hak subjek data dan kewajiban pengendali data; data karangan bukan data pribadi, tetapi kebiasaannya harus siap untuk data sungguhan. **Keadilan**: kerangka manajemen risiko AI dari NIST menyebut pengukuran akurasi dapat memilah hasil menurut kelompok data. **Dampak**: siapa dirugikan oleh tebakan yang salah. Audit memakai tebakan di luar lipatan pada data latih dengan ambang 0,55; data uji tidak dibuka lagi, dan hasil ujinya diambil dari laporan `d-xii2-m8`.

Prediksi dulu. Tebak dan tulis: apakah pemindai menemukan sesuatu pada data proyek, dan pada salinan yang sengaja dicemari? Jenis buku mana yang paling jarang diingatkan?

```python
import re

import numpy as np
import pandas as pd
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import StratifiedKFold, cross_val_predict, train_test_split

BENIH = 2026
AMBANG = 0.55
KATA_KOLOM = ("nama", "surel", "email", "telepon", "hp", "alamat", "nis", "nik", "foto")
POLA_SUREL = re.compile(r"[^@\s]+@[^@\s]+\.[a-z]+")
CUKUP = 10


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


def pindai_privasi(data):
    """Menandai kolom yang tampak mengenali orang; ia hanya menangkap pola yang diprogramkan."""
    temuan = []
    for kolom in data.columns:
        if any(k in kolom.lower().split("_") for k in KATA_KOLOM):
            temuan.append(f"nama kolom mencurigakan: {kolom}")
        if not pd.api.types.is_numeric_dtype(data[kolom]):
            cocok = data[kolom].astype(str).str.contains(POLA_SUREL).sum()
            if cocok:
                temuan.append(f"nilai berpola surel di {kolom}: {int(cocok)} baris")
    return temuan


data = buat_data(600)
print("data proyek:", pindai_privasi(data) or "tidak ada temuan")
tercemar = data.assign(nama_peminjam="Tokoh Fiktif", catatan=[f"hubungi tokoh{i}@contoh.example" for i in range(len(data))])
for baris in pindai_privasi(tercemar):
    print("salinan tercemar:", baris)

# audit per kelompok memakai tebakan di luar lipatan pada data latih; data uji tidak dibuka lagi
latih, _ = train_test_split(data, test_size=0.25, stratify=data["terlambat"], random_state=BENIH)
X = pd.get_dummies(data[["tebal", "hari", "jenis", "musim_ujian"]], drop_first=True).astype(float).loc[latih.index]
lipatan = StratifiedKFold(n_splits=5, shuffle=True, random_state=0)
model = LogisticRegression(max_iter=1000, class_weight="balanced")
p = cross_val_predict(model, X, latih["terlambat"], cv=lipatan, method="predict_proba")[:, 1]
g = latih.assign(tanda=(p >= AMBANG).astype(int))
print("jenis | baris | terlambat | dapat pengingat | recall | cukup bukti")
for nilai, s in g.groupby("jenis"):
    pos = int(s["terlambat"].sum())
    tp = int(((s["tanda"] == 1) & (s["terlambat"] == 1)).sum())
    print(f"{nilai} | {len(s)} | {pos} | {s['tanda'].mean():.2f} | {tp / pos:.2f} | {'ya' if pos >= CUKUP else 'TIPIS'}")
print(f"seluruhnya | {len(g)} | {int(g['terlambat'].sum())} | {g['tanda'].mean():.2f}")
```

```text
data proyek: tidak ada temuan
salinan tercemar: nama kolom mencurigakan: nama_peminjam
salinan tercemar: nilai berpola surel di catatan: 600 baris
jenis | baris | terlambat | dapat pengingat | recall | cukup bukti
anak | 132 | 23 | 0.21 | 0.39 | ya
referensi | 73 | 15 | 0.25 | 0.33 | ya
umum | 245 | 69 | 0.44 | 0.70 | ya
seluruhnya | 450 | 107 | 0.34
```

Baca hasilnya. Data proyek bersih menurut pemindai. Pada salinan tercemar pemindai menangkap kolom bernama `nama_peminjam` dan 600 baris berpola surel di kolom `catatan`, di kolom `catatan` yang namanya tidak mencurigakan; karena itu nilai ikut dipindai. Pemindai hanya menangkap pola yang diprogramkan; nomor telepon atau nama di teks bebas lolos. Ia melengkapi, tidak menggantikan, pembacaan manusia.

Per jenis, buku anak mendapat pengingat untuk 21 persen peminjaman dengan recall 0,39; buku umum 44 persen dengan recall 0,70; referensi 25 persen dengan recall 0,33. Laporan uji menunjukkan arah yang sama (anak 0,47 dari 15 baris terlambat). Perbedaan itu ada di data karangan ini; sebabnya tidak diketahui: buku anak lebih jarang terlambat di data (23 dari 132), dan fiturnya mungkin tak menangkapnya. Adil atau tidaknya bukan keputusan program; laporan menyebutnya, petugas yang memutuskan langkah.

Laporan etika memuat satu baris per risiko, dengan empat kolom:

| Risiko | Bukti | Tindakan | Risiko tersisa |
| --- | --- | --- | --- |
| Data pribadi terbawa | pindai data bersih; pindai menangkap salinan tercemar | pindai tiap berkas sebelum diserahkan | pola yang tak diprogramkan tak terlihat |
| Buku anak dan referensi sering terlewat | recall 0,39 dan 0,33 pada lipatan; uji anak 0,47 (15 baris), referensi TIPIS | kartu dan panduan menyebutnya; petugas memeriksa manual | sebab asli tak diketahui; data karangan |
| Tanda dianggap keputusan | panduan petugas menulis "usul" | petugas yang memutuskan | pengguna bisa mengabaikan panduan |
| Sasaran longgar jadi alasan | kedua sasaran dilaporkan | catatan perubahan terbuka | pembaca hanya membaca ringkasan |

## Daftar periksa

Centang tiap langkah dengan bukti.

- [ ] Data dan paket proyek dipindai; batas pemindaian ditulis.
- [ ] Audit per kelompok memakai tebakan di luar lipatan; jumlah baris tertulis.
- [ ] Setiap risiko punya bukti, tindakan, dan risiko tersisa.
- [ ] Perbedaan antarkelompok disebut, bukan dinyatakan adil atau tidak adil tanpa dasar.
- [ ] Log AI diisi bila AI dipakai, tanpa data pribadi.

## Umpan balik sejawat

Tukar laporan etika dengan tim lain: satu yang sudah baik, satu yang perlu diperbaiki, satu langkah berikutnya, masing-masing menunjuk baris laporan. Tanyakan: adakah risiko tanpa bukti, atau tindakan yang tak dapat dikerjakan siapa pun?

## Latihan bercampur

1. Tulis satu baris laporan etika untuk risiko "recall rendah pada kelompok TIPIS" dengan empat kolom (`AI: boleh`).
2. Kolom `kode` unik untuk tiap peminjaman. Apakah itu penanda yang mengenali orang? Tulis alasannya dan satu pemeriksaan untuk memastikannya (`AI: tanpa AI`).
3. Dari `d-xii1-m11`: beri skor kemungkinan dan dampak 1 sampai 3 pada keempat risiko di tabel, urutkan, dan jelaskan mengapa urutan itu bukan ukuran pasti (`AI: boleh`).

## Ulang berjarak

Pertanyaan ini muncul lagi di `Ingat kembali` modul `d-xii2-m11` (sekitar 1 minggu lagi), `d-xii2-m13` (sekitar 3 minggu), dan `D-XII2-M14` (sekitar 4 minggu). Jawab sekarang lalu simpan.

1. Mengapa hasil per kelompok dibaca bersama jumlah barisnya sebelum menyimpulkan ketidakadilan?
2. Apa empat kolom satu baris laporan etika?
3. Mengapa pemindaian privasi hanya menangkap pola yang diprogramkan, dan apa pelengkapnya?

## Kesalahan umum

- **"Data karangan tidak perlu diperiksa privasinya."** Kebiasaan harus siap untuk data sungguhan; karangan pun bisa tercemar nama.
- **"Pemindai bersih berarti aman."** Ia hanya menangkap pola yang diprogramkan.
- **"Selisih antarkelompok berarti model tidak adil."** Selisih itu temuan; sebab dan penilaiannya perlu bukti dan manusia.

## Cek mandiri

- [ ] Saya dapat memindai data dan menyebut batas pemindaian.
- [ ] Saya dapat mengaudit hasil per kelompok tanpa membuka data uji lagi.
- [ ] Saya dapat menulis laporan etika dengan empat kolom.
- [ ] Saya membedakan temuan di data dari keputusan tentang keadilan.
- [ ] Saya mencatat pemakaian AI bila memakainya.

## Kunci dan petunjuk

**Ingat kembali.** 1: kriteria (metrik utama, setara bila selisih tak melebihi sebaran, pilih yang paling sederhana) ditulis sebelum hasil keluar agar tidak disesuaikan dengan hasil. 2: bila bukti dan pengguna menunjukkan sasaran tak realistis; catat sasaran lama dan baru, alasan, bukti, dan laporkan keduanya. 3: agar model tak dipakai di tempat yang tak cocok; untuk proyek ini: menolak peminjaman, menilai orang, atau dipakai di perpustakaan sungguhan tanpa data sungguhan. 4: kemungkinan dan dampak adalah pendapat yang diberi angka kasar; skor sama dapat menutupi penanganan berbeda.

**Rencana sprint.** Tebakan wajar: data proyek bersih; salinan tercemar tertangkap pada kolom bernama dan nilai surel; buku anak paling jarang diingatkan (21 persen).

**Daftar periksa.** Dinilai dari bukti: keluaran pemindai, tabel per kelompok, dan laporan etika.

**Latihan bercampur.** 1: contoh: risiko recall rendah pada referensi; bukti 5 baris terlambat di uji dan recall 0,33 pada lipatan; tindakan: sebut TIPIS di kartu, kumpulkan data lebih banyak; sisa: angka tetap goyah. 2: tidak bila hanya urutan nomor peminjaman; pemeriksaan: pastikan tidak ada tabel penghubung kode ke orang, dan kode tidak mengandung nomor identitas. 3: contoh: data pribadi (kemungkinan 1, dampak 3), buku anak (3, 2), tanda dianggap keputusan (2, 3), sasaran longgar (2, 2); urutan hanya prioritas, karena angka hasil pendapat.

**Ulang berjarak.** 1: kelompok kecil membuat angka goyah; selisih besar pada 15 baris belum tentu nyata. 2: risiko, bukti, tindakan, risiko tersisa. 3: ia tidak tahu pola di luar kamusnya (mis. nama di teks bebas); pelengkapnya pembacaan manusia dan sebagai kebiasaan tidak mengumpulkan data pribadi sejak awal.

## Langkah berikutnya

Modul berikut: `d-xii2-m11` (ulasan sejawat). Bacaan lanjut: Undang-Undang Nomor 27 Tahun 2022 dan kerangka NIST AI RMF 1.0 (di `Rujukan`).
