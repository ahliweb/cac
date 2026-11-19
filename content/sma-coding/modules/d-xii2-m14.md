## Untuk siapa modul ini

Modul ini untuk murid kelas XII jalur D (kecerdasan buatan dan analisis data), untuk minggu `D-XII2-M14` silabus v1.3: asesmen, yaitu menunjukkan seluruh jalur lewat uji praktik dan rubrik proyek. Prasyarat terindeks: modul `d-xii1-m12`. Modul `d-xii2-m1` sampai `d-xii2-m13` ditulis dalam seri yang sama; bahannya diujikan di sini. Alat: Python 3 dengan `numpy` dan `scikit-learn` untuk bagian praktik, kertas untuk bagian tulis, tanpa akun.

Modul ini berstatus DRAF: karangan penyusun, belum ditinjau pemilik. Jalur D adalah pengayaan di luar rumusan capaian pembelajaran (CP); minggu ini tidak punya irisan pengayaan, jadi tidak dihitung memenuhi butir CP mana pun, dan hasilnya bukan nilai resmi.

**Asesmen ini tanpa AI** (silabus bagian 7.4): jawab Ingat kembali dan Latihan bercampur dari ingatan dan pemahamanmu sendiri, tanpa asisten AI dan tanpa catatan, sampai kamu membuka `Kunci dan petunjuk`. Tujuannya melihat apa yang sungguh kamu kuasai, bukan menilai orang. Bagian `Refleksi` ditulis sendiri dan tidak disimpan di repositori ini.

Catatan untuk guru: blok Python dijalankan penyusun dengan `python3 -I` (Python 3.14.6, `numpy` 2.5.5, `scikit-learn` 1.9.1, per 2026-11), keluarannya ditempel apa adanya; yang dinyatakan hanya "bisa dijalankan dengan keluaran ini", bukan "benar untuk semua masukan". Semua data, tim, dan angka karangan. Rubrik adalah usulan tanpa angka resmi; guru boleh mengganti angka dan kasusnya.

## Ingat kembali

Jawab tujuh pertanyaan ini dari ingatan, di kertas, sebelum membuka kunci. Yang masih lupa dicatat untuk diulang, bukan dihukum.

1. Mengapa angka per kelompok ditulis bersama jumlah barisnya, dan mengapa tebakan di luar lipatan bukan angka laporan resmi? (dari `d-xii2-m6`)
2. Mengapa ambang keputusan menjadi bagian model yang dibekukan, dan mengapa dipilih tanpa data uji? (dari `d-xii2-m7`)
3. Mengapa memenuhi sasaran dengan selisih kurang dari satu baris tidak boleh ditulis sebagai keberhasilan? (dari `d-xii2-m8`)
4. Mengapa panduan pengguna menyebut siapa yang memutuskan dan apa yang dilakukan bila model salah? (dari `d-xii2-m9`)
5. Mengapa pemindaian privasi dan manifest sidik hanya melengkapi, dan apa yang tidak dapat dijaminnya? (dari `d-xii2-m10` dan `d-xii2-m13`)
6. Bagaimana menghitung ulang recall dari jumlah terdeteksi dan terlewat untuk mengecek angka laporan? (dari `d-xii2-m11`)
7. Mengapa demo dengan tiga contoh bukan bukti ketepatan, dan apa yang dilakukan bila demo gagal? (dari `d-xii2-m12`)

## Tujuan

Yang dinilai, selaras dengan prinsip asesmen silabus bagian 7.1 (tanpa mengklaim butir CP):

- menghitung metrik dari jumlah tebakan dan menilainya terhadap sasaran dan pembanding;
- menemukan kekurangan kartu model dan menulis audit per kelompok yang jujur tentang bukti;
- mengenali kebocoran lewat pemilihan ambang pada data uji, dan memperbaikinya;
- menulis fungsi kecil yang menahan rilis bila aturan proyek dilanggar;
- merefleksikan proses proyek akhir dengan bukti dan rencana belajar.

Keluaran yang diminta silabus: uji praktik dan rubrik proyek.

## Latihan bercampur

Kerjakan tanpa AI. Soal 1 sampai 3 tertulis, soal 4 dan 5 praktik di komputer.

**Soal 1. Hitung.** Data uji karangan 120 baris: 30 terlambat. Model menandai 40 baris, 18 di antaranya memang terlambat. Hitung ketepatan, recall, presisi, dan bagian yang diingatkan, bandingkan ketepatan dengan tebakan mayoritas, lalu nilai sasaran lama (recall sedikitnya 0,60, presisi 0,50) dan sasaran baru (recall 0,55, presisi 0,35, pengingat paling banyak 0,35).

**Soal 2. Periksa kartu.** Kartu karangan "Tim Fiktif": "Model ini akurat 91 persen. Data: peminjaman perpustakaan sekolah. Fitur: tebal, hari, `nama_peminjam`. Evaluasi: ketepatan 0,91." Sebutkan empat kekurangan dan perbaikannya.

**Soal 3. Audit.** Hasil karangan per kelompok: kelompok P 80 baris, 20 terlambat, recall 0,70; kelompok Q 30 baris, 4 terlambat, recall 0,25. Tulis tiga kalimat audit yang menyebut apa yang boleh dan tidak boleh disimpulkan.

**Soal 4. Praktik: ambang tanpa mengintip.** Semua kolom dan label acak murni (25 persen positif), jadi presisi jujur sekitar 0,25. Tebak dua angka keluaran sebelum menjalankan, jalankan, jelaskan selisihnya, lalu tulis ulang pemilihan ambang agar data uji tidak dipakai memilih.

```python
import numpy as np
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import precision_score
from sklearn.model_selection import train_test_split

GRID = [0.30, 0.35, 0.40, 0.45, 0.50, 0.55, 0.60, 0.65, 0.70, 0.75, 0.80]
dilaporkan, segar = [], []
for ulang in range(50):
    acak = np.random.default_rng(ulang)
    X = acak.normal(size=(200, 5))
    y = (acak.random(200) < 0.25).astype(int)  # label acak: tidak ada pola
    X_latih, X_uji, y_latih, y_uji = train_test_split(X, y, test_size=0.4, stratify=y, random_state=0)
    model = LogisticRegression(class_weight="balanced").fit(X_latih, y_latih)
    p_uji = model.predict_proba(X_uji)[:, 1]
    layak = [a for a in GRID if (p_uji >= a).sum() >= 5]  # paling sedikit 5 tanda
    terbaik = max(layak, key=lambda a: precision_score(y_uji, p_uji >= a, zero_division=0))
    dilaporkan.append(precision_score(y_uji, p_uji >= terbaik, zero_division=0))  # presisi pada data yang dipakai MEMILIH
    X_baru = acak.normal(size=(2000, 5))
    y_baru = (acak.random(2000) < 0.25).astype(int)
    segar.append(precision_score(y_baru, model.predict_proba(X_baru)[:, 1] >= terbaik, zero_division=0))
print(round(float(np.mean(dilaporkan)), 2), round(float(np.mean(segar)), 2))
```

**Soal 5. Praktik: gerbang rilis.** Rancang dulu di kertas, lalu tulis `gerbang_rilis(tp, fp, fn, tn, sasaran, uji_dibuka)` yang mengembalikan daftar alasan penahan: data uji tidak dibuka tepat satu kali, recall atau presisi di bawah sasaran, atau pengingat melebihi `pengingat_maks`. Daftar kosong berarti boleh. Uji dengan (18, 22, 12, 68, sasaran baru, 1), (18, 22, 12, 68, sasaran baru, 2), dan (10, 30, 20, 60, sasaran baru, 1).

## Refleksi

Tulis jawaban jujur di buku catatanmu sendiri. Tidak ada jawaban salah, dan tulisan ini tidak dikumpulkan ke repositori.

1. Dari rencana sampai portofolio, langkah mana yang paling kamu kuasai? Sebutkan buktinya.
2. Keputusan mana yang kamu ubah karena ulasan sejawat atau analisis galat, dan apa yang berubah?
3. Risiko atau etika mana yang paling sulit dinilai, dan bagaimana kamu memutuskannya?
4. Bagaimana AI membantu atau menghambat belajarmu semester ini, dan bagaimana kamu memeriksa keluarannya?
5. Apa rencana belajarmu sesudah ini: tiga hal yang akan kamu ulang, dan kapan?

## Cek mandiri

- [ ] Saya menjawab Ingat kembali dari ingatan sebelum membuka kunci.
- [ ] Saya dapat menghitung metrik dan menilainya terhadap sasaran dan pembanding.
- [ ] Saya dapat menemukan kekurangan kartu dan menulis audit yang jujur.
- [ ] Saya dapat mengenali dan memperbaiki pemilihan ambang pada data uji.
- [ ] Saya menulis refleksi dengan bukti dan rencana belajar.

## Kunci dan petunjuk

**Ingat kembali.** 1: kelompok kecil membuat angka goyah, jadi jumlah baris ikut ditulis; tebakan di luar lipatan dapat berbeda dari rata-rata lipatan, sehingga dipakai membaca galat, bukan angka resmi. 2: ambang mengubah recall dan presisi sehingga termasuk model yang diuji; dipilih dari lipatan dan anggaran agar data uji tak memengaruhinya. 3: selisih sekecil itu ada dalam goyangan; satu baris dapat membaliknya. 4: agar pengguna tak menganggap tanda sebagai keputusan, dan tahu langkah bila tanda keliru. 5: keduanya hanya menangkap yang diprogramkan; pemindai tidak melihat pola di luar kamusnya dan manifest tidak melindungi bila ikut diubah; pembacaan manusia dan penyimpanan sidik terpisah melengkapi. 6: recall = terdeteksi dibagi (terdeteksi ditambah terlewat); bandingkan dengan angka laporan. 7: tiga contoh terlalu sedikit; ketepatan diukur pada data uji dengan metrik dan selang; bila demo gagal, tunjukkan keluaran cadangan dan jangan memperbaiki kode di depan pendengar.

**Soal 1.** TP 18, FP 22, FN 12, TN 68. Ketepatan (18 + 68) dibagi 120 = 0,72, di bawah tebakan mayoritas (90 dibagi 120 = 0,75), tetapi mayoritas recall 0. Recall 18 dibagi 30 = 0,60; presisi 18 dibagi 40 = 0,45; pengingat 40 dibagi 120 = 0,33. Sasaran lama: recall terpenuhi, presisi 0,45 belum mencapai 0,50, jadi belum. Sasaran baru: recall 0,60 sedikitnya 0,55, presisi 0,45 sedikitnya 0,35, pengingat 0,33 paling banyak 0,35: terpenuhi.

**Soal 2.** (a) "akurat 91 persen" tanpa pembanding, recall, atau presisi: tambah tebakan mayoritas dan metrik kelas minoritas; (b) data tidak diberi label karangan atau sintetis dan menyebut lembaga: tulis "karangan" dan jangan menyebut sekolah; (c) `nama_peminjam` mengenali orang dan tidak boleh jadi fitur: buang dan catat; (d) tidak ada bagian di luar cakupan, batasan, risiko, dan biaya, serta tidak ada selang dan jumlah baris. Rubrik: tiap kekurangan disertai perbaikan.

**Soal 3.** Contoh: "Recall kelompok Q (0,25) tampak jauh lebih rendah daripada P (0,70), tetapi hanya 4 baris terlambat di Q, jadi kelompok itu ditandai TIPIS dan selisihnya belum terbukti. Yang boleh disimpulkan: perbedaan ada di data ini dan perlu data lebih banyak. Yang tak boleh: menyatakan model tidak adil terhadap Q atau sebabnya diketahui; tulis tindakan, yaitu menambah data dan meminta petugas memeriksa Q secara manual."

**Soal 4.** Keluaran pertama `0.33` (presisi di data yang dipakai memilih ambang) dan kedua `0.25` (data segar): memilih ambang terbaik pada data uji kecil mencocokkan ambang dengan kebetulan data itu, sehingga angkanya terlalu optimis. Perbaikan: pilih ambang dari tebakan di luar lipatan pada data latih, lalu buka data uji sekali.

```python
import numpy as np
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import precision_score
from sklearn.model_selection import StratifiedKFold, cross_val_predict, train_test_split

GRID = [0.30, 0.35, 0.40, 0.45, 0.50, 0.55, 0.60, 0.65, 0.70, 0.75, 0.80]
lipatan = StratifiedKFold(n_splits=5, shuffle=True, random_state=0)
dilaporkan = []
for ulang in range(50):
    acak = np.random.default_rng(ulang)
    X = acak.normal(size=(200, 5))
    y = (acak.random(200) < 0.25).astype(int)  # label acak: tidak ada pola
    X_latih, X_uji, y_latih, y_uji = train_test_split(X, y, test_size=0.4, stratify=y, random_state=0)
    model = LogisticRegression(class_weight="balanced")
    p_lipat = cross_val_predict(model, X_latih, y_latih, cv=lipatan, method="predict_proba")[:, 1]
    layak = [a for a in GRID if (p_lipat >= a).sum() >= 5]
    terbaik = max(layak, key=lambda a: precision_score(y_latih, p_lipat >= a, zero_division=0))
    p_uji = model.fit(X_latih, y_latih).predict_proba(X_uji)[:, 1]  # data uji dibuka SEKALI, setelah ambang tetap
    dilaporkan.append(precision_score(y_uji, p_uji >= terbaik, zero_division=0))
print(round(float(np.mean(dilaporkan)), 2))
```

```text
0.22
```

Hasilnya 0,22, dekat 0,25 sesuai kenyataan data acak.

**Soal 5.** Rancangan: hitung recall, presisi, dan pengingat dengan penjaga pembagi nol, lalu kumpulkan alasan satu per satu.

```python
def gerbang_rilis(tp, fp, fn, tn, sasaran, uji_dibuka):
    """Mengembalikan daftar alasan yang menahan rilis; daftar kosong berarti boleh."""
    alasan = []
    if uji_dibuka != 1:
        alasan.append(f"data uji dibuka {uji_dibuka} kali, seharusnya 1")
    recall = tp / (tp + fn) if tp + fn else 0.0
    presisi = tp / (tp + fp) if tp + fp else 0.0
    pengingat = (tp + fp) / (tp + fp + fn + tn)
    if recall < sasaran["recall"]:
        alasan.append(f"recall {recall:.2f} di bawah {sasaran['recall']}")
    if presisi < sasaran["presisi"]:
        alasan.append(f"presisi {presisi:.2f} di bawah {sasaran['presisi']}")
    if pengingat > sasaran["pengingat_maks"]:
        alasan.append(f"pengingat {pengingat:.2f} melebihi {sasaran['pengingat_maks']}")
    return alasan


SASARAN = {"recall": 0.55, "presisi": 0.35, "pengingat_maks": 0.35}
print(gerbang_rilis(18, 22, 12, 68, SASARAN, 1))
print(gerbang_rilis(18, 22, 12, 68, SASARAN, 2))
print(gerbang_rilis(10, 30, 20, 60, SASARAN, 1))
```

```text
[]
['data uji dibuka 2 kali, seharusnya 1']
['recall 0.33 di bawah 0.55', 'presisi 0.25 di bawah 0.35']
```

**Rubrik proyek usulan (untuk guru).** Menilai proses dan produk, termasuk ulasan sejawat (silabus bagian 7.1), tanpa angka resmi; bobot mengikuti kebijakan sekolah.

| Aspek | Kuat | Cukup | Perlu diulang |
| --- | --- | --- | --- |
| Rancangan dan pembanding | aturan pilih dan sasaran tertulis sebelum hasil; pembanding ikut diuji | ada, tetapi ditulis setelah hasil atau tanpa pembanding | tidak ada |
| Pengujian | data uji dibuka satu kali; selang dan jumlah baris ada; klaim tiga tingkat | satu dari tiga hilang | data uji dipakai memilih |
| Dokumentasi | kartu, panduan, dan portofolio lengkap; label karangan dan log AI | satu dokumen kurang | tanpa batasan atau log |
| Etika dan privasi | laporan etika empat kolom; kelompok lemah disebut | sebagian kolom kosong | data pribadi terbawa |
| Ulasan dan refleksi | ulasan menunjuk bukti dan ada tindakan; refleksi dengan rencana | ulasan umum | tidak ada tindak lanjut |

Soal praktik dinilai dengan uji kasus: soal 5 benar bila tiga keluaran sesuai.

## Langkah berikutnya

Ini minggu terakhir jalur D. Ulangi bagian yang kamu tandai di refleksi, sedikit demi sedikit dalam beberapa hari, bukan sekaligus. Bacaan lanjut: bagian *Common pitfalls and recommended practices* pada dokumentasi `scikit-learn` dan bagian asesmen pada Panduan Mata Pelajaran Informatika (di `Rujukan`).
