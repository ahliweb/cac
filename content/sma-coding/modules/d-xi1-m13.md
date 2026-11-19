## Untuk siapa modul ini

Modul ini untuk murid kelas XI jalur D (kecerdasan buatan dan analisis data), untuk minggu `D-XI1-M13` silabus v1.3: proyek mini semester 1, yaitu alur analisis data hingga prediksi. Prasyarat: modul `d-xi1-m12`. Alat: Python 3 dengan `pandas` dan `scikit-learn` (dan `matplotlib` bila membuat grafik), tanpa akun. Berkelompok dua sampai empat orang atau sendiri.

Modul ini berstatus DRAF: karangan penyusun, belum ditinjau pemilik. Jalur D adalah pengayaan di luar rumusan capaian pembelajaran (CP). Minggu ini beririsan dengan butir `F-AD-a` pada tingkat sedang; irisan itu **tidak dihitung** sebagai pemenuhan CP.

Aturan jalur D yang berlaku: data hanya sintetis (karangan) atau terbuka dengan lisensi jelas, tanpa data yang bisa mengenali orang; wajah, suara, dan foto orang tidak dipakai sebagai data; AI generatif boleh dipakai dengan etika dan dicatat, tanpa data pribadi, kata sandi, atau tugas bernilai pada permintaanmu, dan kamu tidak wajib punya akun. Saran: jawab dulu sendiri, baru minta AI memberi petunjuk bertahap; kode buatan AI dibaca, dijalankan, dan diuji. Pada proyek, catat pemakaian AI di log (lihat `Daftar periksa`).

Catatan untuk guru: blok Python dijalankan penyusun dengan `python3 -I` (Python 3.14.6, `pandas` 3.1.1, `scikit-learn` 1.9.1, per 2026-11) dan keluarannya ditempel apa adanya; yang dinyatakan hanya "bisa dijalankan dengan keluaran ini", bukan "benar untuk semua masukan". Data "sampel air" dibangkitkan program, dan aturan layak atau tidaknya **karangan penyusun**, bukan standar air minum. Murid memilih datanya sendiri; data terbuka harus lolos pemeriksaan lisensi `d-xi1-m5`. Rubrik pada kunci adalah usulan untuk guru.

## Ingat kembali

Jawab dari ingatan, baru cek di bagian kunci.

1. Apa yang dicantumkan di laporan proyek tentang sumber data dan perubahan yang dilakukan padanya? (dari `d-xi1-m5`)
2. Mengapa sumbu grafik batang harus mulai dari nol? (dari `d-xi1-m7`)
3. Apa itu kebocoran data, dan sebutkan dua contohnya? (dari `d-xi1-m12`)

## Tujuan

Setelah modul ini kamu dapat:

- menulis rencana satu halaman beserta prediksi hasil sebelum mengerjakan;
- mengerjakan alur sampai prediksi: baca, bersihkan, ringkas, bandingkan model, nilai;
- mencatat sumber data, keputusan pembersihan, dan batas kesimpulan di laporan;
- memeriksa kebocoran dan menjalankan ulang program dari awal;
- memberi dan menerima umpan balik sejawat yang berisi.

Keluaran yang diminta silabus: program dan laporan.

## Rencana proyek

Tulis rencana **sebelum** kode, lalu simpan; membandingkannya dengan hasil adalah bagian belajarnya. Satu halaman berisi: **pertanyaan** (apa yang ditebak, untuk keputusan apa); **data** (sumber dan lisensi, atau pembangkit yang ditandai "karangan"); **pembersihan**; **pembanding**; **metrik utama** dengan alasan dari dampak kesalahan; **kriteria selesai**; **prediksi** angka pembanding dan model; **risiko** (kebocoran, data pribadi).

**Contoh rencana terselesaikan.** Pertanyaan: dari pH dan kekeruhan sampel air karangan, tebak apakah sampel "layak" menurut aturan karangan, untuk memilih sampel yang diperiksa lebih dulu. Data: fungsi `buat_sampel` (80 baris; sebagian nilai hilang, sebagian label dibalik). Pembersihan: periksa nilai hilang, catat baris yang dibuang. Pembanding: tebakan "tidak layak". Metrik utama: recall kelas "layak", karena melewatkan sampel layak paling merugikan dalam keputusan fiktif ini; ketepatan pelengkap. Prediksi: pembanding sekitar 0,7 dengan recall 0, model di atas 0,85. Risiko: mengisi nilai hilang sebelum membagi.

Kerangka berikut menjalankan rencana itu; ganti data, pertanyaan, dan modelnya dengan milikmu.

```python
import pandas as pd
from sklearn.dummy import DummyClassifier
from sklearn.model_selection import StratifiedKFold, cross_val_score
from sklearn.tree import DecisionTreeClassifier


def buat_sampel(n):
    baris = []
    for i in range(n):
        ph = 5.0 + ((i * 7) % 41) / 10  # 5,0 sampai 9,0
        keruh = 1 + (i * 11) % 23  # satuan karangan
        layak = 1 if 6.5 <= ph <= 8.5 and keruh <= 15 else 0  # aturan karangan
        if i % 19 == 7:
            layak = 1 - layak  # label sengaja dibalik (derau)
        if i % 17 == 5:
            keruh = None  # nilai hilang sengaja
        baris.append((ph, keruh, layak))
    return pd.DataFrame(baris, columns=["ph", "keruh", "layak"])


df = buat_sampel(80)
print("baris:", len(df), "| hilang:", int(df["keruh"].isna().sum()), "| kelas:", df["layak"].value_counts().to_dict())

bersih = df.dropna()  # keputusan 1: buang baris yang nilainya hilang
print("keputusan 1: dibuang", len(df) - len(bersih), "baris berisi nilai hilang")

X = bersih[["ph", "keruh"]]
y = bersih["layak"]
lipatan = StratifiedKFold(n_splits=5, shuffle=True, random_state=0)
for nama, model in [
    ("pembanding", DummyClassifier(strategy="most_frequent")),
    ("pohon", DecisionTreeClassifier(max_depth=3, random_state=0)),
]:
    ketepatan = cross_val_score(model, X, y, cv=lipatan)
    recall = cross_val_score(model, X, y, cv=lipatan, scoring="recall")
    print(nama, "ketepatan", round(ketepatan.mean(), 2), "recall", round(recall.mean(), 2))
```

```text
baris: 80 | hilang: 5 | kelas: {0: 54, 1: 26}
keputusan 1: dibuang 5 baris berisi nilai hilang
pembanding ketepatan 0.68 recall 0.0
pohon ketepatan 0.92 recall 0.84
```

Laporan menulis: 5 dari 80 baris dibuang; pembanding 0,68 (recall 0); pohon 0,92 (recall 0,84). Datanya karangan dan kecil, jadi bukan bukti untuk air nyata.

## Daftar periksa

Centang tiap langkah **dengan bukti** (catatan atau keluaran yang bisa ditunjukkan).

- [ ] Rencana dan prediksi ditulis sebelum kode.
- [ ] Sumber dan lisensi data tercatat, atau pembangkitnya ditandai "karangan"; tanpa data pribadi, wajah, suara, atau foto orang.
- [ ] Data diperiksa (`head`, `info`, `isna`); data mentah tidak ditimpa; tiap keputusan pembersihan dicatat dengan jumlah barisnya.
- [ ] Satu ringkasan angka dan satu grafik berjudul dan berlabel.
- [ ] Pembanding dijalankan; sedikitnya dua model dibandingkan secara adil.
- [ ] Kebocoran diperiksa; program dijalankan ulang dari awal, hasilnya sama.
- [ ] Log pemakaian AI diisi bila AI dipakai: alat, tujuan, garis besar perintah, bagian yang dipakai, cara memeriksa.
- [ ] Laporan memuat batas kesimpulan.

## Umpan balik sejawat

Tukar proyek dengan kelompok lain dan beri umpan balik dalam tiga kalimat: **satu yang sudah baik, satu yang perlu diperbaiki, satu langkah berikutnya**, masing-masing menunjuk bagian tertentu (baris kode atau angka di laporan). Pemeriksa bertanya: bisakah programnya dijalankan dari awal, dan apakah laporannya menyebut sumber, baris yang dibuang, pembanding, dan batas? Ulasan memakai nama kelompok atau nomor, bukan nama orang, dan tidak memuat data pribadi.

## Latihan bercampur

1. Dari `d-xi1-m12`: kerangka memakai `dropna()` sebelum membagi data. Apakah itu menimbulkan kebocoran, dan apa yang harus dicatat?
2. Dari `d-xi1-m10`: mengapa tabel hasil kerangka melaporkan recall dan bukan hanya ketepatan?

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `d-xi1-m14` (sekitar satu minggu lagi), dan modul jalur D kelas XI semester 2 pada minggu `D-XI2-M2` (sekitar tiga minggu lagi) dan `D-XI2-M7` (sekitar delapan minggu lagi). Jawab sekarang lalu simpan.

1. Apa isi laporan proyek data: sumber, pembersihan, pembanding, model, evaluasi, dan batasan?
2. Mengapa laporan menyebut batasan data dan hal yang tidak boleh disimpulkan?
3. Apa yang dicatat tentang pemakaian AI dalam sebuah proyek?

## Kesalahan umum

- **"Mengoding dulu, rencananya menyusul."** Tanpa prediksi tertulis, angka apa pun tampak masuk akal setelah dilihat.
- **"Laporan cukup berisi angka terbaik."** Laporkan pembanding, semua model yang dicoba, dan batasannya.
- **"Data terbuka boleh dipakai karena ada di internet."** Lisensinya dibaca dan dicatat; yang tidak jelas tidak dipakai (`d-xi1-m5`).
- **"Kode yang jalan di laptopku pasti jalan di laptop teman."** Jalankan ulang dari awal.

## Cek mandiri

- [ ] Saya menulis rencana dan prediksi sebelum mengerjakan.
- [ ] Saya mencatat sumber data, keputusan pembersihan, dan batas kesimpulan.
- [ ] Saya membandingkan model dengan pembanding pada pengaturan yang sama dan memeriksa kebocoran.
- [ ] Saya memberi umpan balik tiga kalimat yang menunjuk bagian tertentu.
- [ ] Saya mengisi log pemakaian AI bila saya memakainya.

## Kunci dan petunjuk

**Ingat kembali.** 1: judul dan pencipta dataset, tautan, lisensi, tanggal akses, serta perubahan yang dilakukan (misalnya baris dibuang atau kolom diubah). 2: karena panjang batang mewakili besar nilai; sumbu dipotong membuat selisih kecil tampak besar. 3: keterangan tentang jawaban atau data uji ikut masuk saat model belajar; contoh: fitur yang memuat jawaban, baris kembar di data latih dan uji, mengubah skala sebelum membagi.

**Rencana proyek.** Tidak ada satu jawaban benar. Rencana yang baik: pertanyaannya memutuskan sesuatu, data dan lisensinya jelas, pembanding dan metrik utama punya alasan, prediksi tertulis dengan angka sebelum dijalankan, risiko disebut. Pada contoh, prediksi pembanding sekitar 0,7 mendekati hasil 0,68 karena porsi kelas terbanyak 54 dari 80 adalah 0,675; prediksi model di atas 0,85 terpenuhi (0,92). Bila prediksimu meleset, tulis mengapa; itu bagian belajarnya.

**Daftar periksa.** Dinilai dari bukti tiap butir, bukan dari centang. Usulan rubrik guru (tiga tingkat, tanpa angka resmi): *kuat* bila alur lengkap, keputusan tercatat dengan jumlah baris, pembanding dan dua model dibandingkan adil, kebocoran diperiksa, program jalan ulang, dan batas kesimpulan jelas; *cukup* bila alurnya ada tetapi catatan atau pemeriksaan kebocoran belum lengkap; *perlu dilengkapi* bila belum ada pembanding, sumber data tidak jelas, atau program tidak dapat dijalankan ulang.

**Umpan balik sejawat.** Contoh: "Sudah baik: laporan menyebut 5 baris dibuang beserta alasannya. Perlu diperbaiki: pohon tidak dibandingkan dengan model kedua. Langkah berikutnya: tambahkan satu model dan laporkan selisihnya terhadap sebaran antar lipatan."

**Latihan bercampur.** 1: `dropna()` sebelum membagi tidak membocorkan jawaban karena hanya membuang baris, tetapi mengisi nilai hilang dengan rata-rata seluruh data sebelum membagi akan membocorkan; catat berapa baris dibuang dan mengapa. 2: karena kelas "layak" jarang (26 dari 80 sebelum pembersihan), sehingga pembanding yang selalu menjawab "tidak layak" sudah mendapat ketepatan tinggi tanpa menemukan satu pun sampel layak; recall memperlihatkannya.

**Ulang berjarak.** 1: sumber data (judul, pencipta, lisensi, tanggal akses), keputusan pembersihan dengan jumlah baris, pembanding, model yang dicoba, evaluasi dengan metrik utama, dan batasan. 2: supaya pembaca tidak menganggap hasil pada data kecil atau karangan berlaku di mana-mana, dan agar pembaca tahu apa yang belum dibuktikan. 3: alat, tujuan, garis besar perintah, bagian yang dipakai, dan cara memeriksanya (kode dibaca, dijalankan, diuji).

## Langkah berikutnya

Modul berikut: `d-xi1-m14` (asesmen dan refleksi semester 1). Bacaan lanjut: *Panduan Mata Pelajaran Informatika, Fase D sampai F* tentang proyek dan penilaian.
