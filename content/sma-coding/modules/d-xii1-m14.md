## Untuk siapa modul ini

Modul ini untuk murid kelas XII jalur D (kecerdasan buatan dan analisis data), untuk minggu `D-XII1-M14` silabus v1.3: asesmen dan refleksi semester 1, yaitu menunjukkan kesiapan proyek akhir. Prasyarat terindeks: modul `d-xi2-m14`. Modul `d-xii1-m1` sampai `d-xii1-m13` ditulis dalam seri yang sama; bahannya diujikan di sini. Alat: Python 3 dengan `numpy` dan `scikit-learn` untuk bagian praktik, kertas untuk bagian tulis, tanpa akun.

Modul ini berstatus DRAF: karangan penyusun, belum ditinjau pemilik. Jalur D adalah pengayaan di luar rumusan capaian pembelajaran (CP); minggu ini tidak punya irisan pengayaan, jadi modul ini tidak dihitung memenuhi butir CP mana pun, dan hasilnya bukan nilai resmi.

**Asesmen ini tanpa AI** (silabus bagian 7.4): jawab Ingat kembali dan Latihan bercampur dari ingatan dan pemahamanmu sendiri, tanpa asisten AI dan tanpa catatan, sampai kamu membuka `Kunci dan petunjuk`. Tujuannya melihat apa yang sungguh kamu kuasai, bukan menilai orang. Bagian `Refleksi` ditulis sendiri dan tidak disimpan di repositori ini.

Catatan untuk guru: blok Python dijalankan penyusun dengan `python3 -I` (Python 3.14.6, `numpy` 2.5.5, `scikit-learn` 1.9.1, per 2026-11) dan keluarannya ditempel apa adanya; yang dinyatakan hanya "bisa dijalankan dengan keluaran ini", bukan "benar untuk semua masukan". Semua data, tim, dan angka karangan. Rubrik pada kunci adalah usulan, tanpa angka resmi; guru boleh mengganti angka dan kasusnya.

## Ingat kembali

Jawab lima pertanyaan ini dari ingatan, di kertas, sebelum membuka kunci. Yang masih lupa dicatat untuk diulang, bukan dihukum.

1. Pada data timpang, metrik apa yang menunjukkan bahwa tebakan mayoritas tidak berguna, dan bagaimana menghitungnya? (dari `d-xii1-m6`)
2. Mengapa perbaikan model diukur pada data validasi atau lipatan, bukan pada data uji, dan kapan data uji boleh dibuka? (dari `d-xii1-m7`)
3. Mengapa fitur yang baru diketahui sesudah keputusan membuat angka uji tidak jujur, dan apa pertanyaan pemeriksanya? (dari `d-xii1-m9`)
4. Mengapa skor risiko kemungkinan kali dampak hanya alat prioritas? (dari `d-xii1-m11`)
5. Apa tujuh bagian rencana proyek, dan mengapa prediksi ditulis sebelum menjalankan? (dari `d-xii1-m13`)

## Tujuan

Yang dinilai, selaras dengan silabus bagian 7.1:

- menghitung ketepatan, recall, dan presisi dari jumlah tebakan dan membandingkannya dengan ukuran sukses;
- membaca tabel eksperimen dengan sebaran dan menulis keputusan yang sah;
- mengenali kebocoran dan kolom yang tidak boleh dipakai, lalu menulis ulasan sejawat yang menunjuk bukti;
- memilih model tanpa memakai data uji, dan menulis fungsi kecil untuk menilai klaim;
- merefleksikan kesiapan proyek akhir dan menyusun rencana ulang.

Keluaran yang diminta silabus: uji tulis dan praktik.

## Latihan bercampur

Kerjakan tanpa AI. Soal 1 sampai 3 tertulis, soal 4 dan 5 praktik di komputer.

**Soal 1. Hitung.** Data uji karangan 100 baris: 85 tepat waktu dan 15 terlambat. Model A menjawab "tepat waktu" untuk semua baris. Model B menandai 20 baris terlambat, 9 di antaranya memang terlambat. Hitung ketepatan, recall, dan presisi tiap model, lalu putuskan mana yang berguna dan apakah ukuran sukses recall sedikitnya 0,60 dan presisi sedikitnya 0,50 terpenuhi.

**Soal 2. Baca tabel.** Hasil lima lipatan data latih (karangan). Bandingkan selisih tiap baris dengan sebaran baris induknya.

| Kode | Dari | Perubahan | Recall (sebaran) |
| --- | --- | --- | --- |
| E0 | - | bawaan | 0,10 (0,08) |
| E1 | E0 | bobot kelas seimbang | 0,60 (0,20) |
| E2 | E1 | C = 0,1 | 0,64 (0,25) |
| E3 | E1 | pohon dan tambah fitur | 0,30 (0,05) |

Tulis keputusan untuk E1, E2, dan E3, dan satu cacat pada baris E3.

**Soal 3. Ulas.** Paket karangan "Tim Cemara": ketepatan 0,97 pada data uji, fitur menyertakan `tanggal_kembali_nyata` dan `nama_peminjam`, tanpa pembanding. Sebutkan tiga temuan dan tindakan masing-masing, lalu tulis ulasan tiga kalimat.

**Soal 4. Praktik: pilih tanpa mengintip.** Semua kolom dan label acak murni, jadi skor jujur sekitar 0,5. Tebak keluaran dua angka ini sebelum menjalankan, jalankan, jelaskan selisihnya, lalu tulis ulang pemilihan `C` agar data uji tidak dipakai memilih.

```python
import numpy as np
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split

KANDIDAT = [0.0001, 0.001, 0.01, 0.1, 1, 10, 100, 1000]
dilaporkan, segar = [], []
for ulang in range(100):
    acak = np.random.default_rng(ulang)
    X = acak.normal(size=(60, 20))
    y = acak.permutation([0, 1] * 30)  # label acak: tidak ada pola
    X_latih, X_uji, y_latih, y_uji = train_test_split(X, y, test_size=0.5, stratify=y, random_state=0)
    terbaik = max(KANDIDAT, key=lambda c: LogisticRegression(C=c, max_iter=5000).fit(X_latih, y_latih).score(X_uji, y_uji))
    model = LogisticRegression(C=terbaik, max_iter=5000).fit(X_latih, y_latih)
    dilaporkan.append(model.score(X_uji, y_uji))  # skor pada data yang dipakai MEMILIH
    X_baru = acak.normal(size=(300, 20))  # data segar, label acak juga
    y_baru = acak.permutation([0, 1] * 150)
    segar.append(model.score(X_baru, y_baru))
print(round(float(np.mean(dilaporkan)), 3), round(float(np.mean(segar)), 3))
```

**Soal 5. Praktik: nilai klaim.** Rancang dulu di kertas, lalu tulis fungsi `tingkat_klaim(baru, lama, sebaran)`: "didukung" bila `baru - lama` melebihi `sebaran`, "lebih buruk" bila `lama - baru` melebihi `sebaran`, selain itu "belum terbukti". Uji dengan (0,63; 0,04; 0,08), (0,67; 0,63; 0,31), dan (0,50; 0,63; 0,05).

## Refleksi

Tulis jawaban jujur di buku catatanmu sendiri. Tidak ada jawaban salah, dan tulisan ini tidak dikumpulkan ke repositori.

1. Dari kebutuhan sampai presentasi, langkah mana yang sudah kamu kuasai? Sebutkan buktinya (soal mana yang kamu kerjakan dengan yakin).
2. Salah konsep apa yang pernah kamu pegang tentang evaluasi, kebocoran, atau grafik, dan apa yang mengubahnya?
3. Pada proyek Pustaka Contoh atau proyekmu, keputusan etika atau risiko mana yang paling sulit, dan apa yang kamu lakukan jika mengulang?
4. Bagaimana pemakaian AI (bila ada) membantu atau menghambat belajarmu semester ini?
5. Apa rencana belajarmu untuk semester dua: tiga hal yang akan kamu ulang, dan kapan?

## Cek mandiri

- [ ] Saya menjawab Ingat kembali dari ingatan sebelum membuka kunci.
- [ ] Saya dapat menghitung recall dan presisi dan membandingkannya dengan ukuran sukses.
- [ ] Saya dapat membaca tabel eksperimen dan menulis keputusan yang sah.
- [ ] Saya dapat mengenali kebocoran, termasuk saat memilih model.
- [ ] Saya menulis refleksi dengan bukti dan rencana ulang untuk semester dua.

## Kunci dan petunjuk

**Ingat kembali.** 1: recall kelas minoritas (TP dibagi TP + FN) dan presisi; tebakan mayoritas punya ketepatan tinggi tetapi recall 0. 2: karena data uji tak boleh ikut memengaruhi keputusan; ia dibuka sekali, di akhir, setelah model dan keputusan tetap. 3: fitur itu tak ada saat keputusan sungguhan dibuat, sehingga model "mengintip jawaban"; pertanyaannya "apakah ini sudah diketahui saat keputusan dibuat?". 4: kemungkinan dan dampak adalah pendapat yang diberi angka kasar, dan skor yang sama dapat menutupi penanganan yang berbeda. 5: pertanyaan, data, pembanding, metrik utama, kriteria selesai, prediksi, dan risiko; prediksi menguji dugaanmu karena ditulis sebelum hasil.

**Soal 1.** Model A: ketepatan 85 dibagi 100 = 0,85; recall 0 dari 15 = 0; presisi tak terdefinisi (tak ada tebakan positif). Model B: TP 9, FP 20 − 9 = 11, FN 15 − 9 = 6, TN 85 − 11 = 74. Ketepatan (9 + 74) dibagi 100 = 0,83; recall 9 dibagi 15 = 0,60; presisi 9 dibagi 20 = 0,45. B lebih berguna walau ketepatannya lebih rendah, karena A tak menangkap satu pun. Ukuran sukses: recall tepat memenuhi 0,60; presisi 0,45 belum mencapai 0,50, sehingga belum terpenuhi.

**Soal 2.** E1: terbukti; selisih 0,50 melebihi sebaran E0 (0,08). E2: belum terbukti; selisih 0,04 jauh di bawah sebaran E1 (0,20). E3: recall turun 0,30, melebihi sebaran E1 (0,20), jadi tampak lebih buruk, tetapi barisnya mengubah dua hal sekaligus (jenis model dan fitur), sehingga penyebabnya tak diketahui; ulangi dengan satu perubahan per eksperimen.

**Soal 3.** Contoh temuan: (a) `tanggal_kembali_nyata` baru diketahui sesudah buku kembali, kebocoran fitur: buang dan evaluasi ulang; (b) `nama_peminjam` mengenali orang: buang atau samarkan dan catat (UU PDP); (c) tanpa pembanding, 0,97 tak berarti: tambah tebakan mayoritas dan laporkan recall serta presisi. Ulasan contoh: "Sudah baik: paket menyertakan data uji sehingga angkanya dapat dihitung ulang. Perlu diperbaiki: `tanggal_kembali_nyata` bocor dan `nama_peminjam` mengenali orang. Langkah berikutnya: buang keduanya, tambah pembanding, dan laporkan recall dengan sebaran." Rubrik: tiap kalimat menunjuk bukti dan menilai karya, bukan orang.

**Soal 4.** Keluaran pertama `0.582` (skor di data yang dipakai memilih) dan kedua `0.499` (data segar): pemilihan di data uji memilih `C` yang kebetulan cocok dengan data uji, sehingga skornya terlalu optimis. Perbaikan: pilih `C` dengan lipatan di data latih dan buka data uji sekali.

```python
import numpy as np
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import StratifiedKFold, cross_val_score, train_test_split

KANDIDAT = [0.0001, 0.001, 0.01, 0.1, 1, 10, 100, 1000]
lipatan = StratifiedKFold(n_splits=5, shuffle=True, random_state=0)
dilaporkan = []
for ulang in range(100):
    acak = np.random.default_rng(ulang)
    X = acak.normal(size=(60, 20))
    y = acak.permutation([0, 1] * 30)  # label acak: tidak ada pola
    X_latih, X_uji, y_latih, y_uji = train_test_split(X, y, test_size=0.5, stratify=y, random_state=0)
    terbaik = max(KANDIDAT, key=lambda c: cross_val_score(LogisticRegression(C=c, max_iter=5000), X_latih, y_latih, cv=lipatan).mean())
    model = LogisticRegression(C=terbaik, max_iter=5000).fit(X_latih, y_latih)
    dilaporkan.append(model.score(X_uji, y_uji))  # data uji dibuka SEKALI, setelah pilihan tetap
print(round(float(np.mean(dilaporkan)), 3))
```

```text
0.521
```

Hasilnya 0,521, dekat 0,5 sesuai kenyataan data acak.

**Soal 5.** Rancangan: hitung selisih, bandingkan dengan sebaran pada dua arah, lalu kembalikan tingkat klaim.

```python
def tingkat_klaim(baru, lama, sebaran):
    if baru - lama > sebaran:
        return "didukung"
    if lama - baru > sebaran:
        return "lebih buruk"
    return "belum terbukti"


print(tingkat_klaim(0.63, 0.04, 0.08), tingkat_klaim(0.67, 0.63, 0.31), tingkat_klaim(0.50, 0.63, 0.05))
```

```text
didukung belum terbukti lebih buruk
```

**Rubrik usulan (untuk guru).** Tiga tingkat, tanpa angka resmi. *Kuat*: Ingat kembali hampir semua benar; hitungan dan tabel dikerjakan dengan alasan; kebocoran dikenali, termasuk saat memilih model; ulasan menunjuk bukti; fungsi bekerja; refleksi menyebut bukti dan rencana ulang spesifik. *Cukup*: sebagian besar benar tetapi alasan singkat, atau satu konsep (sebaran, kebocoran, presisi) tertukar. *Perlu diulang*: beberapa konsep dasar (recall, presisi, data uji, kebocoran, tiga tingkat klaim) belum terjawab; rencanakan pengulangan berjarak, bukan menumpuk menjelang proyek akhir.

## Langkah berikutnya

Modul berikut: `D-XII2-M1` (perencanaan proyek akhir) pada semester 2. Ulangi bagian yang kamu tandai di refleksi, sedikit demi sedikit dalam beberapa hari, bukan sekaligus. Bacaan lanjut: bagian *Common pitfalls and recommended practices* pada dokumentasi `scikit-learn` dan bagian Proses Rekayasa pada Panduan Mata Pelajaran Informatika (di `Rujukan`).
