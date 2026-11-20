## Untuk siapa modul ini

Modul ini untuk murid kelas XII jalur D (kecerdasan buatan dan analisis data), untuk minggu `D-XII1-M9` silabus v1.3: ulasan sejawat, yaitu menilai data dan model tim lain, dengan keluaran catatan ulasan. Prasyarat terindeks: modul `d-xi2-m14`. Modul `d-xii1-m8` (tabel eksperimen) ditulis dalam seri yang sama dan dibaca lebih dulu. Alat: Python 3 dengan `numpy`, `pandas`, dan `scikit-learn`, tanpa akun. Dikerjakan berpasangan atau antartim.

Modul ini karangan penyusun dan disetujui pemilik program pada 2026-11-20 (keputusan lewat dialog; catatan tinjauan menjadi tindak lanjut revisi). Jalur D adalah pengayaan di luar rumusan capaian pembelajaran (CP). Minggu ini tidak punya irisan pengayaan, jadi modul ini tidak dihitung memenuhi butir CP mana pun.

Aturan jalur D yang berlaku: data hanya sintetis (karangan) atau terbuka dengan lisensi jelas, tanpa data yang bisa mengenali orang; wajah, suara, dan foto orang tidak dipakai sebagai data; AI generatif boleh dipakai dengan etika dan dicatat, tanpa data pribadi, kata sandi, atau tugas bernilai pada permintaanmu, dan kamu tidak wajib punya akun. Saran: jawab dulu sendiri, baru minta AI memberi petunjuk bertahap; kode buatan AI dibaca, dijalankan, dan diuji. Setiap soal `Latihan` bertanda `AI: boleh` atau `AI: tanpa AI`.

Catatan untuk guru: blok Python dijalankan penyusun dengan `python3 -I` (Python 3.14.6, `numpy` 2.5.5, `pandas` 3.1.1, `scikit-learn` 1.9.1, per 2026-11) dan keluarannya ditempel apa adanya; yang dinyatakan hanya "bisa dijalankan dengan keluaran ini", bukan "benar untuk semua masukan". "Tim Lontar" adalah tim karangan dan paketnya dibangkitkan program; tidak ada tim atau orang nyata. Ulasan memakai nama tim atau nomor, bukan nama orang.

## Ingat kembali

Jawab dari ingatan, baru cek di bagian kunci.

1. Bagaimana kamu memutuskan sebuah perubahan "terbukti membantu", dan apa yang kamu lakukan bila tidak ada yang terbukti? (dari `d-xii1-m8`)
2. Apa tiga ciri kebutuhan yang dapat diuji, berbeda dari "modelnya harus akurat"? (dari `d-xii1-m1`)
3. Mengapa ketepatan 80 persen bisa tak berarti pada data yang 80 persen berkelas mayoritas? (dari `d-xii1-m6`)

## Tujuan

Setelah modul ini kamu dapat:

- memakai lembar ulasan tiga bagian: data, model, dan klaim;
- menghitung ulang metrik dari prediksi tim lain dan membandingkannya dengan klaim mereka;
- mengenali angka yang terlalu bagus dan kolom yang baru diketahui sesudah keputusan dibuat;
- menulis ulasan "satu yang baik, satu yang perlu diperbaiki, satu langkah berikutnya" yang menunjuk bukti dan menilai karya, bukan orang.

Keluaran yang diminta silabus: catatan ulasan.

## Prediksi dulu

Tim karangan "Tim Lontar" melaporkan untuk model Pustaka Contoh: recall 1,00 dan presisi 1,00 pada 50 baris data uji (9 di antaranya terlambat). Fiturnya: `tebal`, `hari`, `musim_ujian`, dan `hari_lewat` (berapa hari buku dikembalikan melewati tenggat). Tebak dan tulis: apa yang janggal dari angka itu? Bolehkah `hari_lewat` dipakai untuk menebak keterlambatan **pada saat peminjaman dibuat**? Bila kolom itu dibuang, kira-kira ke mana recall-nya?

## Contoh terselesaikan

**Lembar ulasan tiga bagian.** (1) *Data*: asal dan lisensi atau tanda "karangan", arti label, pembagian latih dan uji dibuat sebelum melihat hasil, tidak ada baris yang sama di kedua bagian. (2) *Model*: pembanding sederhana ada, metrik sesuai dampak kesalahan, sebaran dilaporkan, dan **setiap fitur sudah diketahui pada saat keputusan dibuat**. (3) *Klaim*: angka di laporan dihitung ulang dari prediksi, dan kesimpulan tidak melampaui bukti. Hasil yang terlalu bagus (seperti 1,00) bukan prestasi, melainkan alasan untuk memeriksa lebih teliti, seperti kebocoran data pada dokumentasi `scikit-learn`.

Pengulas menerima paket: data, daftar fitur, prediksi pada data uji, dan klaim. Berikut lembar kerjanya sebagai program.

```python
import numpy as np
import pandas as pd
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import precision_score, recall_score, roc_auc_score
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


# paket karangan Tim Lontar: mereka menambah kolom yang baru diketahui SESUDAH buku kembali
data = buat_data()
acak = np.random.default_rng(1)
data["hari_lewat"] = data["terlambat"] * acak.integers(1, 8, len(data))
latih, uji = train_test_split(data, test_size=0.25, stratify=data["terlambat"], random_state=BENIH)

FITUR_TIM = ["tebal", "hari", "musim_ujian", "hari_lewat"]
model_tim = LogisticRegression(max_iter=5000).fit(latih[FITUR_TIM], latih["terlambat"])
tebakan_tim = model_tim.predict(uji[FITUR_TIM])
KLAIM = {"recall": 1.0, "presisi": 1.0}


# lembar kerja pengulas
def hitung_ulang(y_benar, y_tebak):
    r = round(recall_score(y_benar, y_tebak), 2)
    p = round(precision_score(y_benar, y_tebak, zero_division=0), 2)
    return {"recall": r, "presisi": p}


def cari_kolom_terlalu_sempurna(df, kolom, label, batas=0.9):
    tanda = []
    for k in kolom:
        auc = roc_auc_score(df[label], df[k])
        if auc >= batas or auc <= 1 - batas:
            tanda.append((k, round(auc, 2)))
    return tanda


print("klaim tim:", KLAIM)
print("hitung ulang:", hitung_ulang(uji["terlambat"], tebakan_tim))
print("kode kembar latih/uji:", len(set(latih["kode"]) & set(uji["kode"])))
print("kolom mencurigakan:", cari_kolom_terlalu_sempurna(latih, FITUR_TIM, "terlambat"))

fitur_jujur = [k for k in FITUR_TIM if k != "hari_lewat"]
model_jujur = LogisticRegression(max_iter=5000).fit(latih[fitur_jujur], latih["terlambat"])
print("tanpa kolom itu:", hitung_ulang(uji["terlambat"], model_jujur.predict(uji[fitur_jujur])))
print("tebakan mayoritas:", hitung_ulang(uji["terlambat"], np.zeros(len(uji), dtype=int)))
```

```text
klaim tim: {'recall': 1.0, 'presisi': 1.0}
hitung ulang: {'recall': 0.89, 'presisi': 1.0}
kode kembar latih/uji: 0
kolom mencurigakan: [('hari_lewat', 1.0)]
tanpa kolom itu: {'recall': 0.33, 'presisi': 0.6}
tebakan mayoritas: {'recall': 0.0, 'presisi': 0.0}
```

Baca hasilnya. Klaim recall 1,00 **tidak cocok** dengan hitung ulang 0,89 (8 dari 9). Tidak ada baris kembar. Pemeriksa menandai `hari_lewat` (AUC 1,0: kolom itu sendirian memisahkan kelas dengan sempurna). Pengulas bertanya: apakah kolom itu diketahui saat peminjaman dibuat? Tidak: ia baru ada sesudah buku kembali, sehingga model "mengintip jawaban". Tanpa kolom itu recall 0,33 dan presisi 0,60: kemampuan sebenarnya jauh di bawah klaim, tetapi sudah mengalahkan tebakan mayoritas (recall 0). Pemeriksa otomatis hanya memberi petunjuk, bukan putusan: ambang 0,9 pilihan penyusun, dan kolom yang sah pun bisa kuat. Yang memutuskan adalah pertanyaan manusia tadi.

**Contoh ulasan tiga kalimat.** "Sudah baik: paket menyertakan prediksi sehingga klaim dapat dihitung ulang. Perlu diperbaiki: `hari_lewat` baru diketahui sesudah buku kembali, jadi recall 1,00 tidak sah, dan hitung ulang memberi 0,89. Langkah berikutnya: buang kolom itu, ulangi pembagian, dan laporkan recall beserta sebaran lipatan."

## Contoh setengah jadi

Lengkapi `____` agar program menghitung ulang klaim dari 8 tebakan benar dan 9 peminjaman terlambat seluruhnya, tanpa tebakan positif yang salah.

```python setengah-jadi
tp, fn, fp = 8, ____, 0
recall = tp / (tp + ____)
presisi = tp / (tp + ____)
print(round(recall, 2), round(presisi, 2), "klaim 1.0 cocok?", recall == 1.0)
```

## Soal Parsons

Susun baris menjadi fungsi `klaim_cocok` yang benar bila klaim dan hasil hitung ulang selisih kurang dari 0,005, lalu mencetak hasil untuk dua pasang angka. Lekukan dipakai; yang diacak hanya urutannya.

```text
print(klaim_cocok(1.0, 0.89), klaim_cocok(0.89, 0.89))
    return abs(klaim - hitung) < 0.005
def klaim_cocok(klaim, hitung):
```

## Latihan

1. **Hitung ulang.** (`AI: boleh`) Minta tim lain menyerahkan data uji dan prediksi mereka. Hitung ulang recall dan presisi, lalu bandingkan dengan klaim mereka.
2. **Setiap fitur, satu pertanyaan.** (`AI: boleh`) Untuk tiap fitur di proyekmu sendiri, tulis: "apakah ini sudah diketahui saat keputusan dibuat?" Jalankan pemeriksa kolom pada proyekmu dan catat hasilnya.
3. **Tiga kalimat ulasan.** (`AI: tanpa AI`) Tulis ulasan untuk Tim Lontar dalam tiga kalimat: satu yang baik, satu yang perlu diperbaiki, satu langkah berikutnya, masing-masing menunjuk bukti.
4. **Ulasan yang buruk.** (`AI: tanpa AI`) Tulis ulang "Modelmu jelek dan kamu malas" menjadi ulasan yang menunjuk bukti dan menilai karya.
5. **Catatan pemakaian AI (opsional).** Catat alat, tujuan, garis besar perintah, bagian yang dipakai, dan cara memeriksanya. Jangan menaruh paket proyek tim lain atau data pribadi apa pun pada permintaanmu tanpa izin tim itu.

## Latihan bercampur

1. Dari `d-xii1-m6`: tim lain mengklaim ketepatan 0,86 pada data uji yang 82 persen berkelas mayoritas. Apa yang kamu minta sebelum terkesan?
2. Dari `d-xii1-m4`: paket tim lain berisi kolom `nama_peminjam`. Apa yang kamu tulis di ulasan, dan mengapa paket itu tidak dikirim ke layanan luar?

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `D-XII1-M10` (sekitar satu minggu lagi), `D-XII1-M12` (sekitar tiga minggu lagi), dan `D-XII2-M3` (sekitar delapan minggu lagi). Jawab sekarang lalu simpan.

1. Mengapa fitur yang baru diketahui sesudah keputusan membuat angka uji tidak jujur, dan apa pertanyaan pemeriksanya?
2. Apa tiga bagian umpan balik sejawat, dan mengapa ulasan menunjuk bukti, bukan orang?
3. Sebutkan empat hal yang diperiksa pada data sebelum model dibangun.

## Kesalahan umum

- **"Ulasan sejawat berarti mencari kesalahan."** Tujuannya membuat karya tim lebih kuat; ulasan menyebut yang baik dan satu langkah berikutnya.
- **"Angka di laporan sudah dihitung program, jadi pasti benar."** Klaim bisa tidak cocok dengan prediksinya; hitung ulang.
- **"Skor hampir sempurna berarti model hebat."** Pada data sekecil ini, skor setinggi itu lebih sering tanda kebocoran daripada prestasi.
- **"Pemeriksa otomatis lolos berarti paket aman."** Ia hanya menandai pola yang diprogramkan; pertanyaan manusia tetap perlu.

## Cek mandiri

- [ ] Saya dapat memakai lembar ulasan data, model, dan klaim.
- [ ] Saya dapat menghitung ulang metrik dari prediksi dan membandingkannya dengan klaim.
- [ ] Saya dapat menanyakan "diketahui saat keputusan dibuat?" untuk tiap fitur.
- [ ] Saya dapat menulis ulasan tiga kalimat yang menunjuk bukti.
- [ ] Saya mencatat pemakaian AI bila saya memakainya.

## Kunci dan petunjuk

**Ingat kembali.** 1: selisih rata-rata melebihi sebaran antar lipatan, idealnya dengan benih lipatan lain; bila tidak ada yang terbukti, pertahankan yang sederhana dan tulis "belum terbukti". 2: ada angka, ada data uji, dan ada pembanding. 3: karena tebakan "selalu mayoritas" sudah benar pada 80 persen baris tanpa menangkap satu pun kelas minoritas; ketepatan harus dibandingkan dengan pembanding dan dilengkapi recall atau presisi.

**Prediksi dulu.** Janggal: 1,00 pada keduanya, pada data uji kecil dan timpang. `hari_lewat` tidak boleh dipakai karena baru diketahui sesudah buku kembali. Tanpa kolom itu recall turun jauh, ke sekitar 0,33.

**Contoh setengah jadi.** Isian: 1 (9 − 8), `fn`, `fp`.

```python
tp, fn, fp = 8, 1, 0
recall = tp / (tp + fn)
presisi = tp / (tp + fp)
print(round(recall, 2), round(presisi, 2), "klaim 1.0 cocok?", recall == 1.0)
```

```text
0.89 1.0 klaim 1.0 cocok? False
```

**Soal Parsons.** Urutan benar:

```python
def klaim_cocok(klaim, hitung):
    return abs(klaim - hitung) < 0.005
print(klaim_cocok(1.0, 0.89), klaim_cocok(0.89, 0.89))
```

```text
False True
```

**Latihan.** 1: rubrik: data uji dan prediksi dipakai persis, rumus recall dan presisi benar, dan selisih terhadap klaim dinyatakan dengan angka. 2: contoh: `tebal`, `hari`, `musim_ujian`: ya; `hari_lewat`: tidak; pemeriksa menandai kolom yang nyaris sempurna, dan keputusan akhirnya ada pada jawaban pertanyaan itu. 3: contoh pada kunci contoh ulasan di atas; rubrik: tiap kalimat menunjuk bukti (angka atau nama kolom). 4: contoh: "Recall 0,33 di data uji masih di bawah sasaran 0,60; coba bobot kelas seimbang dan laporkan sebarannya." 5: opsional.

**Latihan bercampur.** 1: tebakan mayoritas saja sudah mencapai 0,82, jadi selisih 0,04 hampir tak berarti; minta recall kelas minoritas, pembanding, dan jumlah baris tiap kelas pada data uji. 2: tandai bahwa kolom itu data pribadi langsung (UU PDP) dan sebaiknya dibuang atau disamarkan sebelum dipakai; paket tidak dikirim ke layanan luar karena data tak bisa ditarik kembali.

**Ulang berjarak.** 1: fitur itu tidak ada saat keputusan sungguhan dibuat, sehingga model "mengintip jawaban" dan skor ujinya terlalu optimis; pertanyaannya "apakah ini sudah diketahui saat keputusan dibuat?". 2: satu yang baik, satu yang perlu diperbaiki, satu langkah berikutnya; ulasan menunjuk bukti agar dapat diperiksa dan agar yang dinilai karyanya, bukan orangnya. 3: contoh: nilai hilang, baris ganda, proporsi label, kolom yang mengenali orang, dan kolom yang bocor.

## Langkah berikutnya

Modul berikut: `d-xii1-m10` (kualitas kode dan keterulangan), yang merapikan program agar ulasan dan pengulangan oleh orang lain menjadi mudah. Bacaan lanjut: makalah Kapoor dan Narayanan tentang kebocoran dan krisis keterulangan, serta bagian *Data leakage* pada dokumentasi `scikit-learn` (di `Rujukan`).
