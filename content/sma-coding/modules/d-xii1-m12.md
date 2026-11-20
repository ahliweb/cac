## Untuk siapa modul ini

Modul ini untuk murid kelas XII jalur D (kecerdasan buatan dan analisis data), untuk minggu `D-XII1-M12` silabus v1.3: menyajikan hasil, yaitu menyajikan temuan dengan grafik dan narasi jujur, dengan keluaran draf presentasi. Prasyarat terindeks: modul `d-xi2-m14`. Modul `d-xii1-m8` (tabel eksperimen) dan `d-xii1-m11` (laporan risiko) ditulis dalam seri yang sama dan dibaca lebih dulu. Alat: Python 3 dengan `numpy`, `pandas`, `scikit-learn`, dan `matplotlib`, tanpa akun.

Modul ini karangan penyusun dan disetujui pemilik program pada 2026-11-20 (keputusan lewat dialog; catatan tinjauan menjadi tindak lanjut revisi). Jalur D adalah pengayaan di luar rumusan capaian pembelajaran (CP). Minggu ini tidak punya irisan pengayaan, jadi modul ini tidak dihitung memenuhi butir CP mana pun.

Aturan jalur D yang berlaku: data hanya sintetis (karangan) atau terbuka dengan lisensi jelas, tanpa data yang bisa mengenali orang; wajah, suara, dan foto orang tidak dipakai sebagai data; AI generatif boleh dipakai dengan etika dan dicatat, tanpa data pribadi, kata sandi, atau tugas bernilai pada permintaanmu, dan kamu tidak wajib punya akun. Saran: jawab dulu sendiri, baru minta AI memberi petunjuk bertahap; kode buatan AI dibaca, dijalankan, dan diuji. Setiap soal `Latihan` bertanda `AI: boleh` atau `AI: tanpa AI`.

Catatan untuk guru: blok Python dijalankan penyusun dengan `python3 -I` (Python 3.14.6, `numpy` 2.5.5, `pandas` 3.1.1, `scikit-learn` 1.9.1, `matplotlib` 3.11.2, per 2026-11) dan keluarannya ditempel apa adanya; yang dinyatakan hanya "bisa dijalankan dengan keluaran ini", bukan "benar untuk semua masukan". Berkas gambar `jujur.png` dan `menyesatkan.png` dihasilkan dan dilihat penyusun, dan uraian grafik di bawah mencocokkan gambar itu; gambarnya sendiri tidak disertakan di modul ini.

## Ingat kembali

Jawab dari ingatan, baru cek di bagian kunci.

1. Mengapa angka rata-rata dapat menyembunyikan kelompok yang gagal, dan bagaimana kamu melaporkannya dengan jujur? (dari `d-xii1-m11`)
2. Apa tiga bagian umpan balik sejawat, dan mengapa ulasan menunjuk bukti, bukan orang? (dari `d-xii1-m9`)
3. Mengapa data atau gambar buatan harus diberi label "karangan" atau "sintetis" ketika disajikan? (dari `d-xii1-m4`)
4. Grafik apa untuk membandingkan, melihat perubahan, melihat hubungan, dan melihat sebaran? (dari `d-x2-m9`)

## Tujuan

Setelah modul ini kamu dapat:

- memilih satu pesan utama beserta angka, pembanding, dan batasnya, lalu menyusun presentasi enam bagian;
- membuat grafik batang jujur: sumbu dari nol, sebaran, pembanding, sasaran, dan label bahwa datanya karangan;
- mengenali grafik menyesatkan (sumbu dipotong, tanpa pembanding atau sebaran, judul berlebihan) dan memperbaikinya;
- menulis narasi dengan tiga tingkat klaim: didukung, belum terbukti, dan tidak diketahui.

Keluaran yang diminta silabus: draf presentasi.

## Prediksi dulu

Dua grafik dibuat dari angka yang sama: recall E1 0,63 dan E2 0,67 (`d-xii1-m8`). Grafik A memakai sumbu dari 0 sampai 1 dengan garis sebaran dan garis sasaran. Grafik B hanya memuat E1 dan E2, sumbunya dipotong di 0,55 sampai 0,70, tanpa sebaran, berjudul "Model kami jauh lebih baik!". Tebak dan tulis: pada grafik B, batang E2 tampak berapa kali lebih tinggi daripada batang E1? Berapa kali lipat nilai sebenarnya?

## Contoh terselesaikan

**Enam bagian presentasi.** (1) *Masalah*: siapa pengguna dan keputusan yang dibantu. (2) *Data*: asal, jumlah baris, dan label "karangan, dibangkitkan program, benih 2026". (3) *Pembanding*: tebakan mayoritas dan model dasar. (4) *Hasil*: satu grafik jujur dan satu kalimat pesan utama. (5) *Batas dan risiko*: dari laporan risiko, termasuk kelompok yang buktinya tipis. (6) *Langkah berikutnya*. Satu slide satu gagasan; grafik dijelaskan dengan kata-katamu, bukan dibaca dari slide.

**Dua cara menggambar angka yang sama.**

```python
import matplotlib

matplotlib.use("Agg")  # menyimpan ke berkas, tanpa jendela
import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
from sklearn.dummy import DummyClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import StratifiedKFold, cross_val_score, train_test_split

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


data = buat_data()
latih, uji = train_test_split(data, test_size=0.25, stratify=data["terlambat"], random_state=BENIH)
X = pd.get_dummies(data[["tebal", "hari", "jenis", "musim_ujian"]], drop_first=True).astype(float)
X_latih, y_latih = X.loc[latih.index], latih["terlambat"]
lipatan = StratifiedKFold(n_splits=5, shuffle=True, random_state=0)

model = {
    "tebakan\nmayoritas": DummyClassifier(strategy="most_frequent"),
    "E0\nbawaan": LogisticRegression(max_iter=1000),
    "E1\nbobot seimbang": LogisticRegression(max_iter=1000, class_weight="balanced"),
    "E2\nE1 + C=0.1": LogisticRegression(max_iter=1000, class_weight="balanced", C=0.1),
}
label, rata, sebar = list(model), [], []
for nama, m in model.items():
    nilai = cross_val_score(m, X_latih, y_latih, cv=lipatan, scoring="recall")
    rata.append(nilai.mean())
    sebar.append(nilai.std())
    print(f"{nama.replace(chr(10), ' '):<22} {nilai.mean():.2f} +- {nilai.std():.2f}")


def gambar_jujur(berkas):
    fig, ax = plt.subplots(figsize=(6, 3.8))
    ax.bar(label, rata, yerr=sebar, capsize=4, color="#4c78a8")
    ax.axhline(0.60, color="#b03a2e", linestyle="--", label="sasaran recall 0,60")
    ax.set_ylim(0, 1)
    ax.set_ylabel("recall kelas terlambat")
    ax.set_title("Recall pada 5 lipatan data latih (data karangan, 200 baris)\nbatang = rata-rata, garis = sebaran", fontsize=9)
    ax.legend(loc="upper left")
    fig.tight_layout()
    fig.savefig(berkas, dpi=100)
    return tuple(float(v) for v in ax.get_ylim())


def gambar_menyesatkan(berkas):
    fig, ax = plt.subplots(figsize=(6, 3.8))
    ax.bar(label[2:], rata[2:], color="#4c78a8")  # tanpa pembanding, tanpa sebaran
    ax.set_ylim(0.55, 0.70)  # sumbu dipotong
    ax.set_title("Model kami jauh lebih baik!")
    fig.tight_layout()
    fig.savefig(berkas, dpi=100)
    return tuple(float(v) for v in ax.get_ylim())


print("sumbu y jujur:", gambar_jujur("jujur.png"))
print("sumbu y menyesatkan:", gambar_menyesatkan("menyesatkan.png"))
tampak = (rata[3] - 0.55) / (rata[2] - 0.55)  # tinggi batang E2 dibanding E1 pada grafik yang dipotong
nyata = rata[3] / rata[2]
print(f"tinggi tampak E2/E1: {tampak:.2f} kali; nilai sebenarnya: {nyata:.2f} kali")
```

```text
tebakan mayoritas      0.00 +- 0.00
E0 bawaan              0.04 +- 0.08
E1 bobot seimbang      0.63 +- 0.31
E2 E1 + C=0.1          0.67 +- 0.22
sumbu y jujur: (0.0, 1.0)
sumbu y menyesatkan: (0.55, 0.7)
tinggi tampak E2/E1: 1.52 kali; nilai sebenarnya: 1.06 kali
```

Baca grafiknya. `jujur.png`: empat batang dari nol. Batang tebakan mayoritas tidak terlihat dan E0 sangat pendek; E1 dan E2 jauh lebih tinggi dan garis sebarannya panjang serta saling menumpuk, melintasi garis sasaran 0,60. Pembaca melihat sendiri bahwa E1 dan E2 tak bisa dibedakan dan bahwa sasaran belum pasti tercapai. `menyesatkan.png`: dua batang yang tampak 1,52 kali beda tinggi karena sumbunya dipotong, padahal selisih sebenarnya hanya 1,06 kali, tanpa pembanding, tanpa sebaran, dan dengan judul yang tak didukung angka. Empat cacatnya: sumbu dipotong, pembanding hilang, sebaran hilang, judul berlebihan.

**Narasi tiga tingkat.** *Didukung*: E1 jauh lebih baik daripada E0 dan tebakan mayoritas dalam menangkap peminjaman terlambat, pada data karangan ini. *Belum terbukti*: E2 lebih baik daripada E1, dan recall sudah memenuhi sasaran 0,60 (sebarannya melintasi sasaran). *Tidak diketahui*: kinerja pada data uji, pada perpustakaan sungguhan, dan presisi (sasaran 0,50 belum tercapai). Tiap slide hasil memuat label "data karangan".

## Contoh setengah jadi

Lengkapi `____` agar program menghitung berapa kali tinggi tampak batang E2 dibanding E1 pada sumbu yang dipotong di 0,55.

```python setengah-jadi
e1, e2, dasar = 0.63, 0.67, 0.55
tampak = (____ - dasar) / (e1 - ____)
nyata = e2 / e1
print(round(tampak, 2), round(nyata, 2))
```

## Soal Parsons

Susun baris menjadi fungsi `tingkat_klaim` yang menjawab "didukung" bila selisih melebihi sebaran dan "belum terbukti" bila tidak, lalu mencetak hasil untuk dua pasang angka. Lekukan dipakai; yang diacak hanya urutannya.

```text
print(tingkat_klaim(0.59, 0.31), tingkat_klaim(0.04, 0.31))
    return "didukung" if selisih > sebaran else "belum terbukti"
def tingkat_klaim(selisih, sebaran):
```

## Latihan

1. **Pesan utama dan tiga tingkat klaim.** (`AI: tanpa AI`) Tulis satu kalimat pesan utama proyekmu, lengkap dengan angka, pembanding, dan batasnya. Lalu tulis tiga klaim: satu didukung, satu belum terbukti, satu tidak diketahui.
2. **Grafik jujur.** (`AI: boleh`) Buat grafik hasil proyekmu: sumbu batang dari nol, pembanding, sebaran, sasaran, dan label bahwa datanya karangan. Tulis tiga kalimat tentang apa yang dilihat pembaca.
3. **Perbaiki grafik.** (`AI: tanpa AI`) Sebuah grafik garis memotong sumbu, tanpa judul sumber, dan hanya menampilkan eksperimen terbaik. Sebutkan perbaikannya.
4. **Latihan presentasi.** (`AI: tanpa AI`) Presentasikan enam bagian selama tiga menit kepada seorang teman. Temanmu menandai satu klaim yang melampaui bukti dan satu bagian yang sudah jelas.
5. **Catatan pemakaian AI (opsional).** Catat alat, tujuan, garis besar perintah, bagian yang dipakai, dan cara memeriksanya. Jangan menaruh data pribadi apa pun pada permintaanmu.

## Latihan bercampur

1. Dari `d-xii1-m11`: audit menunjukkan recall buku anak 0,17 dari 6 baris. Tulis satu kalimat jujur untuk slide "batas dan risiko".
2. Dari `d-xii1-m8`: tabel eksperimen punya lima baris. Pilih baris mana yang masuk slide hasil dan jelaskan alasannya.

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `D-XII1-M13` (sekitar satu minggu lagi), `D-XII2-M1` (sekitar tiga minggu lagi), dan `D-XII2-M6` (sekitar delapan minggu lagi). Jawab sekarang lalu simpan.

1. Apa enam bagian presentasi hasil proyek, dan bagian mana yang memuat batas dan risiko?
2. Mengapa grafik batang dimulai dari nol, dan apa yang ditambahkan agar selisih kecil tidak tampak besar?
3. Apa tiga tingkat klaim pada narasi hasil, dan beri satu contoh tiap tingkat.

## Kesalahan umum

- **"Grafik yang dramatis lebih meyakinkan."** Grafik dramatis karena sumbu dipotong menipu pembaca; yang meyakinkan adalah grafik yang bisa diperiksa.
- **"Tampilkan hanya yang berhasil."** Pembanding dan eksperimen yang belum terbukti tetap ditampilkan.
- **"Judul boleh lebih berani daripada datanya."** Judul menyatakan temuan sebatas bukti.
- **"Menulis 'karangan' melemahkan presentasi."** Menyebutnya justru jujur; tanpa label, penonton mengira angkanya fakta dunia nyata.

## Cek mandiri

- [ ] Saya dapat menyebut pesan utama proyekku dengan angka, pembanding, dan batas.
- [ ] Saya dapat membuat grafik batang dari nol dengan sebaran, pembanding, dan label karangan.
- [ ] Saya dapat mengenali dan memperbaiki grafik yang menyesatkan.
- [ ] Saya dapat menulis klaim pada tiga tingkat.
- [ ] Saya mencatat pemakaian AI bila saya memakainya.

## Kunci dan petunjuk

**Ingat kembali.** 1: rata-rata didominasi kelompok besar; laporkan metrik per kelompok bersama jumlah barisnya dan nyatakan kelompok yang buktinya tipis sebagai batas. 2: satu yang baik, satu yang perlu diperbaiki, satu langkah berikutnya; ulasan menunjuk bukti agar dapat diperiksa dan agar yang dinilai karyanya, bukan orangnya. 3: agar penonton tidak mengira data buatan sebagai fakta; data sintetis hanya mengembalikan asumsi pembuatnya. 4: batang untuk membandingkan kelompok, garis untuk perubahan dari waktu ke waktu, titik sebar untuk hubungan dua angka, histogram untuk sebaran.

**Prediksi dulu.** Pada grafik B batang E2 tampak sekitar 1,5 kali E1; nilai sebenarnya hanya sekitar 1,06 kali (selisih sekitar 6 persen).

**Contoh setengah jadi.** Isian: `e2`, `dasar`.

```python
e1, e2, dasar = 0.63, 0.67, 0.55
tampak = (e2 - dasar) / (e1 - dasar)
nyata = e2 / e1
print(round(tampak, 2), round(nyata, 2))
```

```text
1.5 1.06
```

**Soal Parsons.** Urutan benar:

```python
def tingkat_klaim(selisih, sebaran):
    return "didukung" if selisih > sebaran else "belum terbukti"
print(tingkat_klaim(0.59, 0.31), tingkat_klaim(0.04, 0.31))
```

```text
didukung belum terbukti
```

**Latihan.** 1: rubrik: pesan memuat angka, pembanding, dan batas; klaim didukung menunjuk selisih yang melebihi sebaran; klaim tidak diketahui menyebut apa yang belum diuji (mis. data uji atau data nyata). 2: rubrik: sumbu dari nol, pembanding dan sebaran tampak, label "karangan", judul tak melampaui bukti. 3: sumbu dimulai dari nol (atau dinyatakan terang bila dipotong), judul menyebut sumber dan jumlah data, dan eksperimen lain serta pembanding ikut ditampilkan. 4: rubrik teman: menunjuk klaim tertentu dan alasannya (mis. tidak ada sebaran atau tak ada pembanding). 5: opsional.

**Latihan bercampur.** 1: contoh: "Pada buku anak model baru menangkap 1 dari 6 peminjaman terlambat; buktinya tipis, jadi kami belum memakainya untuk jenis ini dan akan mengumpulkan data lebih banyak." 2: contoh: E0, E1, dan satu eksperimen yang belum terbukti (E2 atau E4), karena menunjukkan awal, perbaikan yang terbukti, dan apa yang sudah dicoba; baris lain masuk lampiran.

**Ulang berjarak.** 1: masalah, data, pembanding, hasil, batas dan risiko, langkah berikutnya; batas dan risiko ada di bagian kelima. 2: agar tinggi batang sebanding dengan nilainya; tambahkan sebaran dan pembanding. 3: didukung (selisih melebihi sebaran), belum terbukti (selisih kecil atau sasaran melintasi sebaran), tidak diketahui (belum diuji); contoh dapat memakai angka pada modul ini.

## Langkah berikutnya

Modul berikut: `d-xii1-m13` (proyek kelas XII semester 1), yang menyusun rencana dan kemajuan proyek akhir dari seluruh bahan yang sudah dibuat. Bacaan lanjut: dokumentasi `matplotlib` untuk `Axes.bar` dan `Axes.set_ylim` (di `Rujukan`).
