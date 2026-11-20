## Untuk siapa modul ini

Modul ini untuk murid kelas XII jalur D (kecerdasan buatan dan analisis data), untuk minggu `D-XII1-M3` silabus v1.3: studi kasus AI II, yaitu menimbang manfaat dan risiko pada bidang lain (transportasi, pertanian, budaya), dengan keluaran catatan kasus. Prasyarat: modul `d-xii1-m2`. Alat: Python 3 dengan `numpy` dan `scikit-learn`, tanpa akun.

Modul ini karangan penyusun dan disetujui pemilik program pada 2026-11-20 (keputusan lewat dialog; catatan tinjauan menjadi tindak lanjut revisi). Jalur D adalah pengayaan di luar rumusan capaian pembelajaran (CP). Minggu ini tidak punya irisan pengayaan, jadi modul ini tidak dihitung memenuhi butir CP mana pun.

Aturan jalur D yang berlaku: data hanya sintetis (karangan) atau terbuka dengan lisensi jelas, tanpa data yang bisa mengenali orang; wajah, suara, dan foto orang tidak dipakai sebagai data; AI generatif boleh dipakai dengan etika dan dicatat, tanpa data pribadi, kata sandi, atau tugas bernilai pada permintaanmu, dan kamu tidak wajib punya akun. Saran: jawab dulu sendiri, baru minta AI memberi petunjuk bertahap; kode buatan AI dibaca, dijalankan, dan diuji. Setiap soal `Latihan` bertanda `AI: boleh` atau `AI: tanpa AI`.

Catatan untuk guru: ketiga kasus karangan penyusun dan tidak menunjuk produk atau lembaga nyata. Blok Python dijalankan penyusun dengan `python3 -I` (Python 3.14.6, `numpy` 2.5.5, `scikit-learn` 1.9.1, per 2026-11) dan keluarannya ditempel apa adanya; yang dinyatakan hanya "bisa dijalankan dengan keluaran ini". Bagian budaya memuat pokok Pasal 38 UU Nomor 28 Tahun 2014 yang dibaca penyusun dari naskah JDIH BPK pada 2026-11-19; perubahan sesudahnya dan peraturan pelaksananya tidak diperiksa `[belum terverifikasi]`, dan ini bukan nasihat hukum.

## Ingat kembali

Jawab dari ingatan, baru cek di bagian kunci.

1. Mengapa "fitur X paling berpengaruh" belum membuktikan sebab, dan apa dua hal lain yang dapat membuat peringkat menyesatkan? (dari `d-xi2-m9`)
2. Mengapa "sensitivitas 90 persen dan spesifisitas 90 persen" belum memberi tahu seberapa sering tanda positif benar? (dari `d-xii1-m2`)
3. Apa tiga ciri kebutuhan yang dapat diuji, berbeda dari "modelnya harus akurat"? (dari `d-xii1-m1`)

## Tujuan

Setelah modul ini kamu dapat:

- memakai lembar kasus lima pertanyaan pada kasus transportasi, pertanian, dan budaya;
- menjelaskan pergeseran data: model yang dilatih pada satu kondisi gagal pada kondisi lain;
- memeriksa cakupan data latih sebelum mempercayai prediksi, dan menulisnya sebagai batas penggunaan;
- mengajukan pertanyaan tentang pemilik, persetujuan, dan keterwakilan pada data budaya;
- menulis catatan kasus dengan manfaat, risiko, pengaman, dan batas kesimpulan.

Keluaran yang diminta silabus: catatan kasus.

## Prediksi dulu

Aplikasi fiktif "BusContoh" menebak menit keterlambatan bus dari kepadatan lalu lintas. Modelnya dilatih hanya pada **hari kering**, lalu diuji pada hari kering dan **hari hujan** (data karangan: hujan menambah sekitar 5 menit). Tebak dan tulis: galat rata-rata model pada hari kering kira-kira kecil atau besar? Pada hari hujan? Apakah model masih lebih baik daripada menebak rata-rata data latih?

## Contoh terselesaikan

**Kasus T (transportasi): BusContoh.** Pengguna: penumpang dan petugas jadwal. Manfaat: jadwal perkiraan yang membantu penumpang memutuskan berangkat. Risiko: pengguna mempercayai angka pada kondisi yang tidak pernah dilihat model. Hitungannya:

```python
import numpy as np
from sklearn.linear_model import LinearRegression

rng = np.random.default_rng(7)


def buat(n, hujan):
    padat = rng.uniform(0, 1, n)  # kepadatan lalu lintas, 0 sampai 1
    tunda = 2 + 6 * padat + 5 * hujan + rng.normal(0, 0.5, n)  # menit
    return padat.reshape(-1, 1), tunda


x_latih, y_latih = buat(120, hujan=0)  # data latih: hanya hari kering
model = LinearRegression().fit(x_latih, y_latih)
rata = y_latih.mean()

for nama, hujan in [("hari kering", 0), ("hari hujan", 1)]:
    x, y = buat(60, hujan)
    galat_model = np.abs(model.predict(x) - y).mean()
    galat_rata = np.abs(rata - y).mean()
    print(f"{nama}: galat model {galat_model:.2f} menit, galat rata-rata {galat_rata:.2f} menit")
```

```text
hari kering: galat model 0.34 menit, galat rata-rata 1.49 menit
hari hujan: galat model 4.90 menit, galat rata-rata 5.16 menit
```

Model unggul jauh pada hari kering (0,34 menit lawan 1,49), tetapi pada hari hujan hampir tidak lebih baik daripada menebak rata-rata (4,90 lawan 5,16). Penyebabnya bukan pelatihan yang buruk: **hujan tidak pernah ada di data latih**, jadi model tidak punya cara menghitungnya. Ini *pergeseran data*. Tiga langkah menyikapinya: tulis cakupan data latih di kartu model ("hanya hari kering"); ukur galat pada kondisi pemakaian yang berbeda, bukan satu angka rata-rata; dan pantau kondisi baru setelah dipakai.

**Dua kasus lain, ditimbang dengan lembar kasus yang sama.**

| Pertanyaan | Kasus A: PadiWaspada (pertanian) | Kasus B: Aksara Contoh (budaya) |
| --- | --- | --- |
| Siapa untung | petani dapat peringatan dini hama | komunitas dapat alat pelestarian naskah |
| Siapa terkena bila salah | petani menyemprot tanpa perlu (biaya, lingkungan) atau terlambat menyemprot | penafsiran naskah yang keliru dianggap sah |
| Diukur di mana dan siapa tak terwakili | dilatih di dataran rendah, dipakai di dataran tinggi | dilatih dari naskah satu desa; ragam desa lain tak ada |
| Siapa memutuskan | petani, bukan aplikasi | komunitas pengemban dan ahlinya |
| Data dan dasarnya | data cuaca, bukan data pribadi | naskah milik komunitas: izin dan hak perlu diperiksa |

Pada Kasus A, aplikasi menampilkan "kelembapan paling berpengaruh". Itu mengukur ketergantungan model pada data, bukan bukti bahwa kelembapan menyebabkan hama; peringkat juga bisa menyesatkan karena fitur berkorelasi saling membagi nilai. Pada Kasus B, pokok yang dibaca penyusun dari UU Nomor 28 Tahun 2014 Pasal 38: hak cipta atas ekspresi budaya tradisional dipegang Negara, dan penggunaannya harus memperhatikan nilai-nilai yang hidup dalam masyarakat pengembannya. Apakah sebuah naskah termasuk, dan izin apa yang perlu, diperiksa ke sumber resmi dan ke komunitasnya, bukan diputuskan sendiri.

## Contoh setengah jadi

Lengkapi `____` agar program menghitung galat rata-rata pada hari hujan dari tiga pengamatan karangan.

```python setengah-jadi
nyata = [9.0, 11.5, 8.0]
tebakan = [4.0, 6.5, 3.5]
selisih = [abs(t - n) for t, n in zip(____, ____)]
print(round(sum(selisih) / ____, 2))
```

## Soal Parsons

Susun baris menjadi fungsi `galat_rata` yang menghitung rata-rata selisih mutlak, lalu mencetak hasil untuk `[10, 12]` dan `[11, 15]`. Lekukan dipakai; yang diacak hanya urutannya.

```text
print(galat_rata([10, 12], [11, 15]))
    return sum(abs(p - n) for p, n in zip(prediksi, nyata)) / len(nyata)
def galat_rata(prediksi, nyata):
```

## Latihan

1. **Lembar kasus.** (`AI: boleh`) Pilih Kasus A atau B, isi lima pertanyaan lembar kasus, dan tulis satu kalimat tentang apa yang belum bisa kamu simpulkan. Itu sekaligus catatan kasusmu.
2. **Ubah data latih.** (`AI: boleh`) Pada program BusContoh, latih model dengan 60 baris hari kering dan 60 baris hari hujan, dengan `hujan` sebagai kolom tambahan. Bandingkan galat pada hari hujan dengan hasil di atas.
3. **Cakupan.** (`AI: tanpa AI`) Tulis dua kalimat cakupan data latih untuk kartu model PadiWaspada, termasuk wilayah dan musim yang tidak tercakup.
4. **Pertanyaan ke komunitas.** (`AI: tanpa AI`) Tulis tiga pertanyaan yang kamu ajukan sebelum memakai naskah sebuah komunitas sebagai data latih.
5. **Catatan pemakaian AI (opsional).** Catat alat, tujuan, garis besar perintah, bagian yang dipakai, dan cara memeriksanya.

## Latihan bercampur

1. Dari `d-xii1-m2`: tulis lembar kasus lima pertanyaan dalam satu kalimat tiap pertanyaan untuk BusContoh.
2. Dari `d-xii1-m1`: tulis ukuran sukses yang dapat diuji untuk BusContoh, termasuk kondisi hujan.

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `d-xii1-m4` (sekitar satu minggu lagi), `d-xii1-m6` (sekitar tiga minggu lagi), dan `D-XII1-M11` (sekitar delapan minggu lagi). Jawab sekarang lalu simpan.

1. Apa tanda bahwa model yang dilatih pada satu kondisi akan gagal pada kondisi lain, dan apa yang ditulis tentang cakupan datanya?
2. Mengapa peta kasus menanyakan siapa yang tidak terwakili di data?
3. Mengapa model bisa tampak baik pada rata-rata tetapi gagal pada kondisi tertentu, dan bagaimana kamu menunjukkannya dengan angka?

## Kesalahan umum

- **"Model yang bagus di data uji bagus di mana saja."** Ia bagus pada kondisi yang mirip data latihnya.
- **"Fitur paling berpengaruh adalah penyebabnya."** Peringkat menunjukkan ketergantungan model, bukan sebab.
- **"Naskah yang ada di internet bebas dipakai sebagai data."** Pemilik, izin, dan nilai komunitas perlu diperiksa dulu.
- **"Data lebih banyak mengatasi pergeseran data."** Data baru dari kondisi yang sama tidak menolong; yang perlu adalah data dari kondisi yang belum tercakup.

## Cek mandiri

- [ ] Saya dapat memakai lembar kasus pada bidang lain.
- [ ] Saya dapat menjelaskan pergeseran data dengan contoh.
- [ ] Saya dapat menulis cakupan data latih sebagai batas penggunaan.
- [ ] Saya dapat mengajukan pertanyaan tentang pemilik dan izin data budaya.
- [ ] Saya mencatat pemakaian AI bila saya memakainya.

## Kunci dan petunjuk

**Ingat kembali.** 1: karena peringkat mengukur ketergantungan model pada data, bukan sebab; dua hal lain: fitur berkorelasi membagi nilai, dan importansi bawaan hutan bisa tinggi untuk angka acak. 2: karena tanda positif benar bergantung pada seberapa sering kejadian itu muncul (prevalensi). 3: ada angka, ada data uji, dan ada pembanding.

**Prediksi dulu.** Kecil pada hari kering (0,34 menit); besar pada hari hujan (4,90 menit), hampir sama dengan menebak rata-rata (5,16): model hanya tahu hari kering.

**Contoh setengah jadi.** Isian: `tebakan`, `nyata`, `3`.

```python
nyata = [9.0, 11.5, 8.0]
tebakan = [4.0, 6.5, 3.5]
selisih = [abs(t - n) for t, n in zip(tebakan, nyata)]
print(round(sum(selisih) / 3, 2))
```

```text
4.83
```

Selisihnya 5,0; 5,0; 4,5, jumlah 14,5, dibagi 3 sama dengan 4,83.

**Soal Parsons.** Urutan benar:

```python
def galat_rata(prediksi, nyata):
    return sum(abs(p - n) for p, n in zip(prediksi, nyata)) / len(nyata)
print(galat_rata([10, 12], [11, 15]))
```

```text
2.0
```

**Latihan.** 1: rubrik: lima pertanyaan terjawab, ada siapa yang tak terwakili, ada batas kesimpulan. 2: galat hari hujan turun dari 4,90 menjadi sekitar 0,34 menit (penyusun memakai benih 7, 60 baris tiap kondisi, dan uji 60 baris hujan; angkamu bisa sedikit berbeda) karena model kini melihat contoh hujan; pelajarannya: cakupan data menentukan. 3: contoh: dilatih pada data cuaca dataran rendah, musim hujan; belum mencakup dataran tinggi dan musim kemarau. 4: contoh: siapa pemilik atau pengemban naskah, apakah ada izin dan siapa yang berhak memberinya, dan apa nilai atau batas yang dijaga komunitas. 5: opsional.

**Latihan bercampur.** 1: contoh: untung penumpang; terkena bila salah penumpang yang terlambat; diukur pada hari kering dan kurang tercakup hujan; keputusan di penumpang; data kepadatan, bukan data pribadi. 2: contoh: galat rata-rata kurang dari 2 menit pada hari kering dan pada hari hujan, dan lebih baik daripada menebak rata-rata.

**Ulang berjarak.** 1: galat melonjak pada kondisi yang tidak ada di data latih; cakupan kondisi data latih ditulis di kartu model. 2: karena kelompok atau kondisi yang tak terwakili bisa mendapat hasil jauh lebih buruk dan tak terlihat. 3: karena rata-rata didominasi kondisi yang umum; tunjukkan dengan galat per kondisi, mis. 0,34 menit pada hari kering dan 4,90 menit pada hari hujan.

## Langkah berikutnya

Modul berikut: `d-xii1-m4` (hukum dan kebijakan), yang merangkum pokok UU PDP dan UU ITE menjadi daftar periksa kepatuhan. Bacaan lanjut: ringkasan Rekomendasi Etika Kecerdasan Artifisial UNESCO (bacaan tambahan; bukan sumber isi modul).
