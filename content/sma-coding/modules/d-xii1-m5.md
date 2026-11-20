## Untuk siapa modul ini

Modul ini untuk murid kelas XII jalur D (kecerdasan buatan dan analisis data), untuk minggu `D-XII1-M5` silabus v1.3: menyiapkan data proyek, yaitu memilih data terbuka dan legal atau menyintesis data, dengan keluaran catatan sumber dan data. Prasyarat: modul `d-xii1-m4`. Alat: Python 3 dengan `numpy`, `pandas`, dan `scikit-learn`, tanpa akun.

Modul ini karangan penyusun dan disetujui pemilik program pada 2026-11-20 (keputusan lewat dialog; catatan tinjauan menjadi tindak lanjut revisi). Jalur D adalah pengayaan di luar rumusan capaian pembelajaran (CP). Minggu ini beririsan dengan butir `F-AD-a` (data terbuka dan legal, prediksi) pada tingkat sedang, karena rumusan butir itu tidak menyebut AI atau pembelajaran mesin; irisan itu **tidak dihitung** sebagai pemenuhan CP.

Aturan jalur D yang berlaku: data hanya sintetis (karangan) atau terbuka dengan lisensi jelas, tanpa data yang bisa mengenali orang; wajah, suara, dan foto orang tidak dipakai sebagai data; AI generatif boleh dipakai dengan etika dan dicatat, tanpa data pribadi, kata sandi, atau tugas bernilai pada permintaanmu, dan kamu tidak wajib punya akun. Saran: jawab dulu sendiri, baru minta AI memberi petunjuk bertahap; kode buatan AI dibaca, dijalankan, dan diuji. Setiap soal `Latihan` bertanda `AI: boleh` atau `AI: tanpa AI`.

Catatan untuk guru: blok Python dijalankan penyusun dengan `python3 -I` (Python 3.14.6, `numpy` 2.5.5, `pandas` 3.1.1, `scikit-learn` 1.9.1, per 2026-11) dan keluarannya ditempel apa adanya; yang dinyatakan hanya "bisa dijalankan dengan keluaran ini". Urutan angka acak `numpy` dapat berbeda antarversi, sehingga murid yang memakai versi lain mungkin melihat angka sedikit berbeda; itu bukan kesalahan. Data "Pustaka Contoh" seluruhnya karangan dan dipakai ulang di `d-xii1-m6` dan `d-xii1-m7`.

## Ingat kembali

Jawab dari ingatan, baru cek di bagian kunci.

1. Sebutkan tiga pertanyaan daftar periksa kepatuhan sebelum memakai sebuah dataset. (dari `d-xii1-m4`)
2. Sebutkan lima pertanyaan lembar kasus untuk menimbang manfaat dan risiko sebuah sistem AI. (dari `d-xii1-m2`)
3. Mengapa data pribadi tidak dikirim ke layanan luar, dan apa penggantinya untuk latihan? (dari `d-xi2-m11`)

## Tujuan

Setelah modul ini kamu dapat:

- memutuskan memakai data terbuka atau data sintetis, dengan alasan dan lisensi tercatat;
- membangkitkan data sintetis dengan benih acak dan asumsi yang ditulis;
- memeriksa kualitas data: baris, kolom, nilai hilang, baris ganda, dan proporsi label;
- membagi data menjadi latih dan uji satu kali dan menyimpan data uji;
- menulis catatan sumber dan data, termasuk batas dan privasi.

Keluaran yang diminta silabus: catatan sumber dan data.

## Prediksi dulu

Program di bawah membangkitkan 200 peminjaman karangan lalu membagi data dengan `test_size=0.25` dan `stratify` pada label. Tebak dan tulis: berapa baris latih dan baris uji? Bila 35 dari 200 baris berlabel terlambat, kira-kira berapa yang masuk data uji? Apakah `stratify` mengubah jumlah itu?

## Contoh terselesaikan

**Dua jalan.** Pertama cari data terbuka: tulis alamat sumber, lisensi (mis. CC BY 4.0 menuntut pencantuman pembuat), tanggal akses, dan perubahan yang kamu lakukan; data yang lisensinya tidak jelas tidak dipakai (`d-xi1-m5`). Kedua, bila tidak ada yang cocok, **sintesis**: program membangkitkan baris dengan aturan yang kamu tulis. Sintesis aman dari sisi privasi, tetapi ia hanya mengembalikan asumsimu: model yang dilatih padanya akan "menemukan" apa yang kamu masukkan. Karena itu catatan harus menyebut asumsinya, dan temuan tidak boleh disajikan sebagai fakta tentang dunia nyata.

Proyek Pustaka Contoh (`d-xii1-m1`) memilih sintesis, tanpa nama peminjam. Aturan karangan: peluang terlambat naik bersama tebal buku dan musim ujian, dan turun bila masa pinjam lebih longgar. Benih acak dicatat supaya data dapat dibangkitkan ulang.

```python
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


data = buat_data()
print(data.shape)
print(data.head(3).to_string(index=False))
print("hilang:", int(data.isna().sum().sum()), "kode ganda:", int(data["kode"].duplicated().sum()))
print("terlambat:", data["terlambat"].value_counts().to_dict())
print(data.groupby("jenis")["terlambat"].agg(["count", "mean"]).round(2).to_string())

latih, uji = train_test_split(data, test_size=0.25, stratify=data["terlambat"], random_state=BENIH)
print(len(latih), len(uji), latih["terlambat"].sum(), uji["terlambat"].sum())

catatan = {
    "asal": "dibangkitkan program buat_data(benih=2026); karangan",
    "lisensi": "tidak berlaku (tidak ada pihak lain)",
    "baris_kolom": data.shape,
    "label": "terlambat: 1 bila pengembalian lewat tenggat",
    "asumsi": "peluang terlambat naik dengan tebal buku dan musim ujian",
    "batas": "bukan kenyataan; hasil model hanya berlaku untuk generator ini",
    "privasi": "tidak ada orang nyata; kode peminjaman acak",
}
for kunci, isi in catatan.items():
    print(kunci + ":", isi)
```

```text
(200, 6)
kode  tebal  hari jenis  musim_ujian  terlambat
P001    431    21  umum            0          0
P002    122     7  umum            1          0
P003     52    14  anak            1          0
hilang: 0 kode ganda: 0
terlambat: {0: 165, 1: 35}
           count  mean
jenis                 
anak          62  0.13
referensi     25  0.08
umum         113  0.22
150 50 26 9
asal: dibangkitkan program buat_data(benih=2026); karangan
lisensi: tidak berlaku (tidak ada pihak lain)
baris_kolom: (200, 6)
label: terlambat: 1 bila pengembalian lewat tenggat
asumsi: peluang terlambat naik dengan tebal buku dan musim ujian
batas: bukan kenyataan; hasil model hanya berlaku untuk generator ini
privasi: tidak ada orang nyata; kode peminjaman acak
```

Baca hasilnya. Data bersih secara teknis: tidak ada nilai hilang atau kode ganda. Terlambat 35 dari 200 (17,5 persen), jadi datanya timpang. Kelompok `referensi` hanya 25 baris, sehingga angka 0,08 di sana lemah (`d-xii1-m2`). Pembagian menghasilkan 150 baris latih dan 50 baris uji; `stratify` menjaga proporsi label, sehingga 26 baris terlambat masuk latih dan 9 masuk uji. Data uji disimpan dan **tidak dilihat** sampai model selesai. Pemeriksaan ini hanya menyatakan data layak dipakai, bukan model yang akan dibangun benar. Kolom `kode` berisi kode acak, bukan identitas; `periksa` di `d-xii1-m4` akan menandai `jenis`, tanda palsu yang kamu putuskan sendiri.

## Contoh setengah jadi

Pakai `data` dari program di atas. Lengkapi `____` agar program mencetak proporsi baris terlambat dengan tiga desimal.

```python setengah-jadi
jumlah = len(data)
terlambat = int(data["terlambat"].sum())
print(round(____ / ____, 3))
```

## Soal Parsons

Susun baris menjadi fungsi `ada_ganda` yang menjawab apakah ada kode yang berulang, lalu mencetak hasil untuk dua daftar. Lekukan dipakai; yang diacak hanya urutannya.

```text
print(ada_ganda(["P1", "P2", "P1"]), ada_ganda(["P1", "P2"]))
    return len(kode) != len(set(kode))
def ada_ganda(kode):
```

## Latihan

1. **Pilih sumber.** (`AI: boleh`) Untuk proyek akhirmu, tulis apakah memakai data terbuka atau sintesis, alasannya, dan untuk data terbuka: alamat, lisensi, tanggal akses, dan perubahan yang kamu rencanakan.
2. **Ubah asumsi.** (`AI: boleh`) Ubah koefisien `0.9` pada musim ujian menjadi `0.0`, jalankan lagi, dan bandingkan proporsi terlambat. Apa yang kamu pelajari tentang hubungan asumsi dan data?
3. **Periksa kualitas.** (`AI: boleh`) Tambahkan pemeriksaan: jumlah baris dengan `tebal` di luar 40 sampai 499, dan proporsi label per `musim_ujian`.
4. **Catatan sumber dan data.** (`AI: tanpa AI`) Tulis catatan sumber dan data untuk proyekmu dengan tujuh butir seperti di atas.
5. **Catatan pemakaian AI (opsional).** Catat alat, tujuan, garis besar perintah, bagian yang dipakai, dan cara memeriksanya. Jangan menaruh data pribadi apa pun pada permintaanmu.

## Latihan bercampur

1. Dari `d-xii1-m4`: jalankan pemeriksa kolom pada kolom `data`. Apa yang ditandai dan apa keputusanmu?
2. Dari `d-xii1-m2`: kelompok `referensi` hanya 25 baris. Apa yang kamu minta sebelum menyimpulkan bahwa buku referensi jarang terlambat?

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `d-xii1-m6` (sekitar satu minggu lagi), `d-xii1-m8` (sekitar tiga minggu lagi), dan `D-XII1-M13` (sekitar delapan minggu lagi). Jawab sekarang lalu simpan.

1. Mengapa data dibagi menjadi latih dan uji sebelum melihat hasil model, dan apa itu `random_state`?
2. Apa yang dicatat di catatan sumber dan data, dan mengapa data sintetis harus menyebut asumsinya?
3. Mengapa temuan dari data sintetis tidak boleh disajikan sebagai fakta tentang dunia nyata?

## Kesalahan umum

- **"Data sintetis pasti netral."** Ia memuat asumsi penulisnya, dan model hanya mengulang asumsi itu.
- **"Lisensi tidak penting bila hanya untuk tugas."** Syarat lisensi tetap berlaku; data tanpa lisensi jelas tidak dipakai.
- **"Melihat data uji sebentar tidak apa-apa."** Setiap lirikan memengaruhi keputusan, dan angka ujinya tak lagi jujur.
- **"Data bersih berarti data benar."** Tanpa nilai hilang pun, data bisa timpang atau tak mewakili.

## Cek mandiri

- [ ] Saya dapat memilih antara data terbuka dan sintetis dengan alasan.
- [ ] Saya dapat membangkitkan data dengan benih dan menulis asumsinya.
- [ ] Saya dapat memeriksa nilai hilang, baris ganda, dan proporsi label.
- [ ] Saya dapat membagi data dan menyimpan data uji.
- [ ] Saya mencatat pemakaian AI bila saya memakainya.

## Kunci dan petunjuk

**Ingat kembali.** 1: contoh: asal dan lisensi data tercatat; kolom spesifik atau langsung dibuang atau dibenarkan; tujuan dan dasar pemrosesan tertulis; tidak ada wajah, suara, atau foto. 2: siapa untung, siapa terkena bila salah, diukur pada data apa dan siapa tak terwakili, siapa memutuskan akhir, data pribadi apa. 3: karena data itu keluar dari kendalimu dan tidak bisa ditarik kembali; gantinya data karangan atau data terbuka berlisensi jelas.

**Prediksi dulu.** 150 baris latih dan 50 baris uji. Dari 35 baris terlambat, sekitar 25 persen (8,75, dibulatkan 9) masuk uji dan 26 masuk latih; `stratify` tidak mengubah jumlah total, hanya menjaga proporsi label di kedua bagian.

**Contoh setengah jadi.** Isian: `terlambat`, `jumlah`.

```python
jumlah = len(data)
terlambat = int(data["terlambat"].sum())
print(round(terlambat / jumlah, 3))
```

```text
0.175
```

**Soal Parsons.** Urutan benar:

```python
def ada_ganda(kode):
    return len(kode) != len(set(kode))
print(ada_ganda(["P1", "P2", "P1"]), ada_ganda(["P1", "P2"]))
```

```text
True False
```

**Latihan.** 1: rubrik: alasan, lisensi dan tanggal akses bila terbuka, dan perubahan tercatat. 2: dengan koefisien 0,0 jumlah baris terlambat turun dari 35 menjadi 25, dan proporsi per `musim_ujian` menjadi hampir sama (0,13 dan 0,12, tadinya 0,13 dan 0,22), karena pengaruh musim ujian dihapus dari aturan; pelajarannya: data sintetis mengulang aturan yang kamu tulis. 3: contoh: `((data["tebal"] < 40) | (data["tebal"] >= 500)).sum()` (hasilnya 0 karena generator) dan `data.groupby("musim_ujian")["terlambat"].mean()`. 4: asal, lisensi, baris dan kolom, label, asumsi, batas, privasi. 5: opsional.

**Latihan bercampur.** 1: `jenis` ditandai sebagai kolom langsung karena mengandung "nis"; keputusanmu: itu tanda palsu, `jenis` bukan data pribadi, tetapi keputusannya dicatat. 2: lebih banyak data kelompok itu dan sebarannya, karena 25 baris terlalu sedikit untuk menyimpulkan.

**Ulang berjarak.** 1: agar angka uji jujur karena data uji tak ikut membentuk model; `random_state` menetapkan pembagian acak yang sama setiap dijalankan. 2: asal, lisensi, baris dan kolom, arti label, asumsi, batas, dan privasi; asumsinya disebut karena hanya itu yang bisa "ditemukan" model. 3: karena data sintetis hanya mengembalikan aturan yang ditulis pembuatnya.

## Langkah berikutnya

Modul berikut: `d-xii1-m6` (garis dasar dan metrik), yang memakai data Pustaka Contoh ini untuk membuat pembanding sederhana. Bacaan lanjut: makalah *Datasheets for Datasets* (bacaan tambahan; bukan sumber isi modul).
