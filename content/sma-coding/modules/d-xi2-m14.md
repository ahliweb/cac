## Untuk siapa modul ini

Modul ini untuk murid kelas XI jalur D (kecerdasan buatan dan analisis data), untuk minggu `D-XI2-M14` silabus v1.3: asesmen dan refleksi semester 2. Prasyarat: modul `d-xi2-m12` (modul tertulis dalam seri yang sama). Alat: Python 3 dengan `numpy` dan `scikit-learn` untuk bagian praktik, kertas untuk bagian tulis, tanpa akun.

Modul ini berstatus DRAF: karangan penyusun, belum ditinjau pemilik. Jalur D adalah pengayaan di luar rumusan capaian pembelajaran (CP); minggu ini tidak punya irisan pengayaan, jadi modul ini tidak dihitung memenuhi butir CP mana pun, dan hasilnya bukan nilai resmi.

**Asesmen ini tanpa AI** (silabus bagian 7.4): jawab Ingat kembali dan Latihan bercampur dari ingatan dan pemahamanmu sendiri, tanpa asisten AI dan tanpa catatan, sampai kamu membuka `Kunci dan petunjuk`. Tujuannya melihat apa yang sungguh kamu kuasai, bukan menilai orang. Bagian `Refleksi` ditulis sendiri dan tidak disimpan di repositori ini.

Catatan untuk guru: blok Python dijalankan penyusun dengan `python3 -I` (Python 3.14.6, `numpy` 2.5.5, `scikit-learn` 1.9.1, per 2026-11) dan keluarannya ditempel apa adanya; yang dinyatakan hanya "bisa dijalankan dengan keluaran ini", bukan "benar untuk semua masukan". Semua data dan pesan karangan. Rubrik pada kunci adalah usulan untuk guru, tanpa angka resmi; guru boleh mengganti angka dan kasusnya.

## Ingat kembali

Jawab lima pertanyaan ini dari ingatan, di kertas, sebelum membuka kunci. Yang masih lupa dicatat untuk diulang, bukan dihukum.

1. Mengapa ketepatan di bawah pembanding menandakan ada yang salah, dan bagaimana mengujinya? (dari `d-xi2-m6`)
2. Mengapa selisih ketepatan yang lebih kecil daripada sebaran antar lipatan belum membuktikan satu model lebih baik? (dari `d-xi2-m8`)
3. Mengapa alat pemeriksa otomatis memberi petunjuk, bukan putusan? (dari `d-xi2-m10`)
4. Apa yang keluar dari komputermu ketika aplikasi memanggil layanan model pihak ketiga, dan apa risikonya bagi privasi? (dari `d-xi2-m11`)
5. Urutkan isi proyek model dari pertanyaan sampai kartu model. (dari `d-xi2-m13`)

## Tujuan

Yang dinilai, selaras dengan silabus bagian 7.1:

- menelusuri program kecil dan menghitung keluaran neuron serta jumlah parameter;
- membaca tabel evaluasi dengan pembanding dan sebaran, dan menarik kesimpulan yang sah;
- mengenali kebocoran dan klaim yang menyesatkan, lalu memperbaikinya;
- memeriksa pesan mencurigakan dan menjaga rahasia layanan;
- menyusun bagian kartu model, termasuk rentang energi dan batas klaim.

Keluaran yang diminta silabus: uji tulis dan praktik (kuis kode).

## Latihan bercampur

Kerjakan tanpa AI. Soal 1 sampai 4 tertulis, soal 5 dan 6 praktik di komputer.

**Soal 1. Telusuri.** Tulis keluaran program di kertas, baru jalankan. Lalu hitung jumlah parameter jaringan dengan 3 masukan, satu lapis tersembunyi berisi 5 neuron, dan 1 keluaran.

```python
x = [2, -1, 3]
w = [0.5, 1.0, -0.2]
b = 0.4
z = sum(xi * wi for xi, wi in zip(x, w)) + b
print(round(z, 2), max(0, round(z, 2)))
```

**Soal 2. Baca tabel.** Hasil lima lipatan pada 120 baris data karangan:

```text
pembanding   0.69 (sebaran 0.67 sampai 0.70)
pohon        0.88 (sebaran 0.82 sampai 0.93)
jaringan     0.90 (sebaran 0.84 sampai 0.95)
```

Tulis satu kesimpulan yang sah dan dua yang tidak sah, dan apa yang akan menambah keyakinanmu.

**Soal 3. Kasus.** Seorang siswa fiktif memasang `StandardScaler` pada seluruh data sebelum validasi silang, melaporkan ketepatan jaringan 0,99, dan menulis kartu model yang hanya memuat angka itu. Sebutkan empat kelemahan dan perbaikan masing-masing.

**Soal 4. Pesan dan rahasia.** Pesan karangan: "Segera kirim kode OTP ke `https://bantuan-contoh.example.cek.example`." Sebutkan tiga tanda dan tindakanmu. Lalu: sebuah program menulis kunci layanan langsung di kode; apa yang diubah, dan apa yang dilakukan bila kode itu sudah terunggah?

**Soal 5. Praktik: perbaiki kebocoran.** Semua kolom dan labelnya acak murni, jadi ketepatan yang jujur sekitar 0,5. Jalankan program ini, jelaskan mengapa hasilnya lebih tinggi, lalu tulis ulang dengan `Pipeline` agar tidak bocor.

```python
import numpy as np
from sklearn.feature_selection import SelectKBest, f_classif
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import StratifiedKFold, cross_val_score

acak = np.random.default_rng(0)
X = acak.normal(size=(60, 300))  # 300 kolom angka acak murni
y = acak.permutation([0, 1] * 30)  # label acak: tidak ada pola yang bisa dipelajari
lipatan = StratifiedKFold(n_splits=5, shuffle=True, random_state=0)

X_terpilih = SelectKBest(f_classif, k=10).fit_transform(X, y)  # memilih kolom dengan SEMUA label
print(round(cross_val_score(LogisticRegression(), X_terpilih, y, cv=lipatan).mean(), 3))
```

**Soal 6. Praktik: energi.** Rancang dulu di kertas (rumus dan satuan), lalu tulis fungsi `rentang_energi(daya_rendah, daya_tinggi, detik)` yang mengembalikan rentang energi dalam Wh. Uji dengan 20 W, 50 W, dan 12 detik.

## Refleksi

Tulis jawaban jujur di buku catatanmu sendiri. Tidak ada jawaban salah, dan tulisan ini tidak dikumpulkan ke repositori.

1. Dari data sampai kartu model, langkah mana yang sudah kamu kuasai? Sebutkan buktinya (soal mana yang kamu kerjakan dengan yakin).
2. Salah konsep apa yang pernah kamu pegang tentang jaringan saraf, penjelasan model, atau verifikasi konten, dan apa yang mengubahnya?
3. Pada proyek mini, keputusan mana yang paling sulit, dan apa yang kamu lakukan jika mengulang?
4. Bagaimana pemakaian AI (bila ada) membantu atau menghambat belajarmu semester ini?
5. Apa rencana belajarmu untuk semester berikutnya: tiga hal yang akan kamu ulang, dan kapan?

## Cek mandiri

- [ ] Saya menjawab Ingat kembali dari ingatan sebelum membuka kunci.
- [ ] Saya menelusuri program di kertas sebelum menjalankannya.
- [ ] Saya dapat membaca tabel evaluasi dan menyebut kesimpulan yang sah.
- [ ] Saya dapat mengenali dan memperbaiki kebocoran data.
- [ ] Saya menulis refleksi dengan bukti, dan rencana ulang untuk semester berikutnya.

## Kunci dan petunjuk

**Ingat kembali.** 1: karena model yang lebih buruk daripada menebak berarti ia dibingungkan secara sistematis oleh data (misalnya letak yang belum pernah dilihat); diuji dengan matriks kebingungan dan pembanding. 2: karena selisih sekecil itu bisa timbul dari pembagian data atau awal bobot yang acak; sebaran memperlihatkan seberapa besar selisih yang bisa kebetulan. 3: karena keduanya punya positif palsu (yang sah tertandai) dan negatif palsu (yang berbahaya lolos), sehingga dipakai bersama pemeriksaan sumber. 4: masukan yang dikirim (teks atau data lain) berpindah ke pihak ketiga yang punya aturan penyimpanannya sendiri; data pribadi bisa bocor atau tersimpan di luar kendalimu. 5: pertanyaan dan rencana (prediksi), data (sumber dan lisensi atau karangan), pembersihan tercatat, pembanding, sedikitnya dua model pada lipatan yang sama, evaluasi dengan metrik utama, penjelasan beserta batasnya, lalu kartu model.

**Soal 1.** Keluaran: `-0.2 0`. `z = 2 * 0,5 + (-1) * 1,0 + 3 * (-0,2) + 0,4 = 1 - 1 - 0,6 + 0,4 = -0,2`; ReLU mengubah angka negatif menjadi 0. Parameter: bobot 3 kali 5 = 15 dan bias 5 pada lapis tersembunyi; 5 kali 1 = 5 bobot dan 1 bias pada lapis keluaran; total 15 + 5 + 5 + 1 = 26.

```python
x = [2, -1, 3]
w = [0.5, 1.0, -0.2]
b = 0.4
z = sum(xi * wi for xi, wi in zip(x, w)) + b
print(round(z, 2), max(0, round(z, 2)))
```

```text
-0.2 0
```

**Soal 2.** Sah: jaringan dan pohon sama-sama jauh di atas pembanding 0,69 (sebarannya tidak tumpang-tindih dengan pembanding). Tidak sah: "jaringan lebih baik daripada pohon" (selisih 0,02 lebih kecil daripada sebaran, dan rentangnya tumpang-tindih); "jaringan pasti lebih baik pada data lain"; "ketepatan 0,90 berarti 90 persen keputusan benar di dunia nyata" (datanya karangan dan kecil). Menambah keyakinan: data lebih banyak, beberapa `random_state`, metrik yang sesuai dampak kesalahan, dan uji pada data yang tidak dipakai memilih model.

**Soal 3.** Empat contoh kelemahan: (a) skala dipasang pada seluruh data sehingga bocor: pasang di dalam `Pipeline`; (b) tidak ada pembanding: tambahkan tebakan kelas terbanyak; (c) satu angka tanpa sebaran: laporkan sebaran antar lipatan; (d) kartu tanpa data, batasan, risiko, dan baris energi: lengkapi seluruh bagian kartu. Kelemahan lain yang sah: tidak ada penjelasan dan batas kesimpulan, atau 0,99 yang terlalu bagus tidak diperiksa (lihat `d-xi2-m6`).

**Soal 4.** Tanda: desakan waktu ("segera"), permintaan rahasia (kode OTP), dan alamat yang bukan milik pihak resmi (host `bantuan-contoh.example.cek.example`, bukan `bantuan-contoh.example`). Tindakan: berhenti, jangan klik atau balas, ketik sendiri alamat resmi atau hubungi lewat kanal yang kamu kenal, dan laporkan atau hapus (bukan putusan mutlak, tetapi cukup untuk menahan). Kunci di kode: pindahkan ke variabel lingkungan; bila sudah terunggah, cabut atau ganti kunci lebih dulu, periksa pemakaian dan tagihan, baru bersihkan kode dan riwayat.

**Soal 5.** Hasil program: `0.683`, padahal tidak ada pola. Kolom dipilih dengan melihat semua label, termasuk label tiap lipatan uji, sehingga lipatan uji tidak "belum terlihat". Perbaikan: pemilihan kolom di dalam `Pipeline` sehingga dilakukan ulang dari data latih tiap lipatan.

```python
import numpy as np
from sklearn.feature_selection import SelectKBest, f_classif
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import StratifiedKFold, cross_val_score
from sklearn.pipeline import make_pipeline

acak = np.random.default_rng(0)
X = acak.normal(size=(60, 300))
y = acak.permutation([0, 1] * 30)
lipatan = StratifiedKFold(n_splits=5, shuffle=True, random_state=0)

model = make_pipeline(SelectKBest(f_classif, k=10), LogisticRegression())
print(round(cross_val_score(model, X, y, cv=lipatan).mean(), 3))
```

```text
0.5
```

Hasilnya 0,5, sesuai kenyataan data acak.

**Soal 6.** Rancangan: energi (Wh) = daya (W) kali detik dibagi 3600, dihitung untuk daya rendah dan tinggi.

```python
def rentang_energi(daya_rendah, daya_tinggi, detik):
    return daya_rendah * detik / 3600, daya_tinggi * detik / 3600


rendah, tinggi = rentang_energi(20, 50, 12)
print(round(rendah, 4), round(tinggi, 4))
```

```text
0.0667 0.1667
```

20 W kali 12 detik = 240 watt-detik = 0,0667 Wh; 50 W menghasilkan 0,1667 Wh.

**Rubrik usulan (untuk guru).** Tiga tingkat, tanpa angka resmi. *Kuat*: Ingat kembali hampir semua benar, soal tertulis memakai alasan (bukan hanya angka), kebocoran dikenali dan diperbaiki dengan `Pipeline`, kunci dan pesan ditangani dengan langkah yang masuk akal, refleksi menyebut bukti dan rencana ulang spesifik. *Cukup*: sebagian besar benar tetapi alasan singkat, atau satu konsep (sebaran, kebocoran) tertukar. *Perlu diulang*: beberapa konsep dasar (pembanding, kebocoran, rentang energi, rahasia) belum terjawab; rencanakan pengulangan berjarak, bukan menumpuk menjelang akhir.

## Langkah berikutnya

Modul berikut: `D-XII1-M1` (merumuskan proyek akhir) pada kelas XII. Ulangi bagian yang kamu tandai di refleksi, sedikit demi sedikit dalam beberapa hari, bukan sekaligus. Bacaan lanjut: *Panduan Mata Pelajaran Informatika, Fase D sampai F*, bagian penilaian.
