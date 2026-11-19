## Untuk siapa modul ini

Modul ini untuk murid kelas XII jalur D (kecerdasan buatan dan analisis data), untuk minggu `D-XII1-M4` silabus v1.3: hukum dan kebijakan, yaitu menjelaskan pokok UU ITE dan UU PDP yang terkait proyek AI, dengan keluaran daftar periksa kepatuhan. Prasyarat: modul `d-xii1-m3` dan `d-x2-m3`. Alat: kertas, dan Python 3 saja (hanya pustaka standar) untuk satu pemeriksa kolom; tanpa akun.

Modul ini berstatus DRAF: karangan penyusun, belum ditinjau pemilik. Jalur D adalah pengayaan di luar rumusan capaian pembelajaran (CP). Minggu ini beririsan dengan butir `F-LD-g` (pelindungan data pribadi dan UU ITE, sebatas pokok) pada tingkat rendah; irisan itu **tidak dihitung** sebagai pemenuhan CP.

Aturan jalur D yang berlaku: data hanya sintetis (karangan) atau terbuka dengan lisensi jelas, tanpa data yang bisa mengenali orang; wajah, suara, dan foto orang tidak dipakai sebagai data; AI generatif boleh dipakai dengan etika dan dicatat, tanpa data pribadi, kata sandi, atau tugas bernilai pada permintaanmu, dan kamu tidak wajib punya akun. Saran: jawab dulu sendiri, baru minta AI memberi petunjuk bertahap; kode buatan AI dibaca, dijalankan, dan diuji. Setiap soal `Latihan` bertanda `AI: boleh` atau `AI: tanpa AI`.

Catatan untuk guru: modul ini memuat pokok yang dibaca penyusun dari naskah UU Nomor 27 Tahun 2022 (Pasal 2, 4, 10, 16, 20, 25, 34, 35, dan 46) dan naskah asli UU Nomor 11 Tahun 2008 (Pasal 32, 33, dan 35), dari JDIH BPK pada 2026-11-19. Pangkalan data BPK mencatat bahwa UU 11/2008 telah diubah (UU 19/2016 dan UU 1/2024) dan sebagian ketentuannya, termasuk Pasal 30, dicabut UU 1/2023 (KUHP) yang berlaku 2 Januari 2026; teks perubahan tidak diperiksa ayat demi ayat `[belum terverifikasi]`. Ini bukan nasihat hukum, dan peraturan pelaksana tidak dibahas. Blok Python dijalankan penyusun dengan `python3 -I` (Python 3.14.6, per 2026-11) dan keluarannya ditempel apa adanya.

## Ingat kembali

Jawab dari ingatan, baru cek di bagian kunci.

1. Apa tanda bahwa model yang dilatih pada satu kondisi akan gagal pada kondisi lain, dan apa yang ditulis tentang cakupan datanya? (dari `d-xii1-m3`)
2. Apa isi bagian "di luar cakupan" dan bagian "risiko dan privasi" di dokumen kebutuhan? (dari `d-xii1-m1`)
3. Mengapa menyebarkan konten yang belum diverifikasi bisa merugikan orang lain, dan apa yang dilakukan sebelum membagikannya? (dari `d-xi2-m10`)
4. Sebutkan dua hak pemilik data pribadi menurut UU Pelindungan Data Pribadi. (dari `d-x2-m3`)

## Tujuan

Setelah modul ini kamu dapat:

- menyebut pokok UU PDP yang menyentuh proyek AI: data spesifik, tujuan terbatas, dasar pemrosesan, keputusan otomatis, penilaian dampak, keamanan, dan pemberitahuan kegagalan;
- menyebut pokok UU ITE tentang mengubah informasi milik orang lain, mengganggu sistem, dan memanipulasi informasi agar tampak otentik;
- menyusun daftar periksa kepatuhan dan memakainya pada rancangan proyek;
- mengenali bahwa pemeriksaan otomatis memberi petunjuk, bukan putusan hukum.

Keluaran yang diminta silabus: daftar periksa kepatuhan.

## Prediksi dulu

Berikut pemeriksa kolom sederhana yang menandai kolom data dengan kata kunci. Tebak dan tulis keluaran baris pertama dan kedua sebelum menjalankan; kolom mana yang ditandai, dan apa jenisnya?

```python
LANGSUNG = ["nama", "alamat", "telepon", "email", "nik", "nis"]
SPESIFIK = ["kesehatan", "golongan_darah", "biometrik", "wajah", "suara", "genetik"]
KOMBINASI = ["tanggal_lahir", "kode_pos", "jenis_kelamin", "kelas"]


def periksa(kolom):
    hasil = {}
    for k in kolom:
        if any(w in k for w in LANGSUNG):
            hasil[k] = "langsung"
        elif any(w in k for w in SPESIFIK):
            hasil[k] = "spesifik"
        elif any(w in k for w in KOMBINASI):
            hasil[k] = "kombinasi"
    return hasil


print(periksa(["kode", "tebal", "hari", "jenis", "musim_ujian", "terlambat"]))
print(periksa(["kode_pinjam", "nama_peminjam", "tanggal_lahir", "kelas", "terlambat"]))
print(periksa(["id", "tgl_lhr", "gol_darah", "wilayah", "terlambat"]))
```

## Contoh terselesaikan

```text
{'jenis': 'langsung'}
{'nama_peminjam': 'langsung', 'tanggal_lahir': 'kombinasi', 'kelas': 'kombinasi'}
{}
```

Baris pertama mengejutkan: `jenis` ditandai karena mengandung "nis". Baris ketiga kosong padahal `tgl_lhr` dan `gol_darah` memuat tanggal lahir dan golongan darah. Aturan kata kunci menghasilkan **tanda palsu** dan **kelolosan**; ia membantu menyaring, tetapi manusia yang memutuskan.

**Pokok UU PDP (UU Nomor 27 Tahun 2022).** Tabel merangkum pasal yang dibaca penyusun beserta pertanyaan untuk proyek AI. Kewajiban pada pasal-pasal ini dibebankan kepada *pengendali data pribadi* (pihak yang menentukan tujuan dan cara memproses). Latihan kelasmu memakai data karangan tanpa subjek nyata. Pasal 2 ayat (2) juga menyatakan UU tidak berlaku untuk pemrosesan oleh perseorangan dalam kegiatan pribadi atau rumah tangga, tetapi proyek yang kelak memproses data orang sungguhan atas nama sebuah organisasi tidak termasuk pengecualian itu.

| Pasal | Pokok | Pertanyaan untuk proyek |
| --- | --- | --- |
| 4 | data spesifik (antara lain kesehatan, biometrik, genetika, catatan kejahatan, data anak) dan data umum (nama lengkap, jenis kelamin, agama, dan lain-lain) | adakah kolom spesifik? perlukah? |
| 16 ayat 2 | pemrosesan terbatas, sesuai tujuan, akurat, dan dapat dipertanggungjawabkan | kolom mana yang tidak perlu dan harus dibuang? |
| 20 dan 25 | wajib ada dasar pemrosesan (salah satunya persetujuan eksplisit untuk tujuan tertentu); data anak perlu persetujuan orang tua atau wali | apa dasarnya, siapa yang menyetujui? |
| 10 ayat 1 | hak mengajukan keberatan atas keputusan yang hanya didasarkan pada pemrosesan otomatis (termasuk pemrofilan) yang berdampak signifikan | adakah jalur keberatan dan peninjauan manusia? |
| 34 | penilaian dampak wajib bila risiko tinggi, antara lain keputusan otomatis berdampak signifikan, data spesifik, skala besar, penskoran atau pemantauan sistematis, penggunaan teknologi baru | apakah proyek masuk salah satunya? |
| 35 | menjaga keamanan data yang diproses | siapa yang boleh mengakses, bagaimana dilindungi? |
| 46 | bila terjadi kegagalan pelindungan, pemberitahuan tertulis paling lambat 3 kali 24 jam kepada subjek dan lembaga | siapa yang memberi tahu, dengan isi apa? |

**Pokok UU ITE.** Dari naskah asli UU 11/2008: Pasal 32 melarang dengan sengaja dan tanpa hak atau melawan hukum mengubah, merusak, menghilangkan, memindahkan, atau menyembunyikan informasi atau dokumen elektronik milik orang lain atau milik publik; Pasal 33 melarang tindakan yang mengganggu sistem elektronik atau membuatnya tidak bekerja sebagaimana mestinya; Pasal 35 melarang manipulasi, penciptaan, atau perubahan informasi elektronik dengan tujuan agar dianggap seolah-olah data yang otentik. Pasal 30 (akses ke sistem orang lain) tercatat dicabut oleh KUHP yang berlaku 2 Januari 2026, sehingga rujukannya bergeser. Maknanya untuk proyekmu praktis: **hanya menguji sistem milikmu sendiri atau yang diizinkan tertulis**, tidak mengubah berkas orang lain, dan data atau gambar buatan diberi label karangan supaya tidak disajikan sebagai data asli.

**Daftar periksa kepatuhan** (jawab ya, tidak, atau tidak berlaku, dengan bukti): data sintetis atau terbuka dengan lisensi tercatat; kolom spesifik atau langsung telah dibuang atau dibenarkan; tujuan dan dasar pemrosesan tertulis; tidak ada wajah, suara, atau foto; jalur keberatan dan peninjau manusia; penilaian dampak dipertimbangkan; keamanan dan pembatasan akses; pengujian hanya pada sistem sendiri; hasil sintetis berlabel karangan; catatan pemakaian AI.

## Contoh setengah jadi

Perluas aturan agar `gol_darah` tertangkap. Lengkapi `____`.

```python setengah-jadi
SPESIFIK = ["kesehatan", "golongan_darah", "biometrik", "wajah", "suara", "genetik", "____"]
print(any(w in "gol_darah" for w in SPESIFIK))
```

## Soal Parsons

Susun baris menjadi fungsi `periksa` yang menandai kolom bernama `nama` atau `kelas`, lalu mencetak jumlah kolom yang ditandai pada `["id", "nama", "kelas"]`. Lekukan dipakai; yang diacak hanya urutannya.

```text
print(len(periksa(["id", "nama", "kelas"])))
    return {k: "periksa" for k in kolom if k in ("nama", "kelas")}
def periksa(kolom):
```

## Latihan

1. **Periksa rancangan.** (`AI: boleh`) Terapkan daftar periksa kepatuhan pada rancangan proyek akhirmu dan tulis bukti untuk tiap jawaban. Itu keluaran minggu ini.
2. **Uji pemeriksa kolom.** (`AI: boleh`) Tulis tiga daftar nama kolom. Cari satu tanda palsu dan satu kelolosan, lalu perbaiki aturannya tanpa menambah tanda palsu baru.
3. **Keputusan otomatis.** (`AI: tanpa AI`) Aplikasi fiktif menolak peminjaman buku sepenuhnya otomatis berdasarkan skor. Pasal mana yang relevan untuk hak peminjam dan untuk kewajiban pengelola?
4. **Tanpa hak.** (`AI: tanpa AI`) Untuk tiap tindakan, tulis apakah kamu perlu izin dan dari siapa: menguji aplikasi buatanmu di laptopmu; mencoba masuk akun teman "hanya iseng"; mengubah isi berkas milik sekolah; menandai grafik data sintetis dengan "karangan".
5. **Catatan pemakaian AI (opsional).** Catat alat, tujuan, garis besar perintah, bagian yang dipakai, dan cara memeriksanya. Jangan menaruh data pribadi apa pun pada permintaanmu.

## Latihan bercampur

1. Dari `d-xii1-m1`: tambahkan dua baris pada tabel dokumen kebutuhan Pustaka Contoh, "di luar cakupan" dan "risiko dan privasi", berdasarkan daftar periksa di atas.
2. Dari `d-xii1-m3`: aplikasi budaya fiktif memakai naskah komunitas. Pertanyaan apa dari daftar periksa yang paling menentukan, dan siapa yang perlu ditanya?

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `d-xii1-m5` (sekitar satu minggu lagi), `d-xii1-m7` (sekitar tiga minggu lagi), dan `D-XII1-M12` (sekitar delapan minggu lagi). Jawab sekarang lalu simpan.

1. Sebutkan tiga pertanyaan daftar periksa kepatuhan sebelum memakai sebuah dataset.
2. Apa itu penilaian dampak pelindungan data pribadi, dan kapan ia diwajibkan (sebutkan dua kondisi)?
3. Mengapa data atau gambar buatan harus diberi label "karangan" atau "sintetis" ketika disajikan?

## Kesalahan umum

- **"UU PDP hanya urusan perusahaan besar."** Kewajiban melekat pada pengendali data, siapa pun dia; latihan kelas aman karena datanya karangan, bukan karena hukumnya tidak ada.
- **"Data sudah di internet, jadi boleh dipakai."** Dasar pemrosesan dan tujuan tetap perlu.
- **"Pemeriksa otomatis lulus berarti patuh."** Aturan kata kunci punya tanda palsu dan kelolosan.
- **"Menguji keamanan sistem orang lain itu belajar."** Tanpa izin, tindakan itu bisa melanggar hukum; ujilah sistem sendiri.
- **"Modul ini nasihat hukum."** Bukan; ia merangkum pokok dan menunjuk sumber.

## Cek mandiri

- [ ] Saya dapat menyebut pokok UU PDP yang menyentuh proyek AI.
- [ ] Saya dapat menyebut pokok UU ITE tentang mengubah informasi, mengganggu sistem, dan manipulasi.
- [ ] Saya dapat menyusun dan memakai daftar periksa kepatuhan.
- [ ] Saya tahu batas pemeriksa otomatis.
- [ ] Saya mencatat pemakaian AI bila saya memakainya.

## Kunci dan petunjuk

**Ingat kembali.** 1: galat melonjak pada kondisi yang tidak ada di data latih; cakupan data ditulis di kartu model. 2: apa yang tidak boleh dilakukan dengan sistem, dan apakah data pribadi dipakai serta dampak bila tebakan salah. 3: karena konten palsu atau keliru dapat menipu orang lain dan merusak nama orang; periksa sumber dan konteks dan tahan bila belum pasti. 4: contoh: mengakses salinan (Pasal 7), memperbaiki (Pasal 6), menarik persetujuan (Pasal 9), keberatan atas keputusan otomatis (Pasal 10).

**Prediksi dulu dan contoh terselesaikan.** Baris 1: `{'jenis': 'langsung'}` karena "nis" ada di "jenis". Baris 2: `nama_peminjam` langsung; `tanggal_lahir` dan `kelas` kombinasi. Baris 3: `{}`: `tgl_lhr` dan `gol_darah` tidak cocok kata kunci.

**Contoh setengah jadi.** Isian: `gol_darah`.

```python
SPESIFIK = ["kesehatan", "golongan_darah", "biometrik", "wajah", "suara", "genetik", "gol_darah"]
print(any(w in "gol_darah" for w in SPESIFIK))
```

```text
True
```

**Soal Parsons.** Urutan benar:

```python
def periksa(kolom):
    return {k: "periksa" for k in kolom if k in ("nama", "kelas")}
print(len(periksa(["id", "nama", "kelas"])))
```

```text
2
```

**Latihan.** 1: rubrik: tiap pertanyaan ya, tidak, atau tidak berlaku dengan bukti; kolom berlebih dibuang; tidak ada wajah, suara, atau foto. 2: contoh: tambah `tgl_lhr` dan `gol_darah` ke daftar kata; untuk tanda palsu `jenis`, cocokkan kata utuh per bagian (pisah dengan garis bawah) alih-alih potongan huruf. 3: Pasal 10 ayat 1 (hak keberatan atas keputusan yang hanya otomatis dan berdampak signifikan) dan Pasal 34 (penilaian dampak, termasuk penskoran sistematis); pengelola juga wajib dasar pemrosesan (Pasal 20) dan keamanan (Pasal 35). 4: laptop sendiri: tidak perlu izin; akun teman: perlu izin pemilik dan jangan dilakukan sekadar iseng; berkas sekolah: perlu izin pihak sekolah; label karangan: tidak perlu izin, justru dianjurkan. Pembahasan hukum pasti bukan tugas modul; bila ragu, tanya guru. 5: opsional.

**Latihan bercampur.** 1: contoh: di luar cakupan: tidak menolak peminjaman; risiko dan privasi: data karangan tanpa nama, dan bila dipakai pada anggota sungguhan perlu dasar, penilaian dampak, dan pembatasan akses. 2: asal dan izin naskah (dasar pemrosesan dan hak); tanyakan komunitas pengemban dan sumber resmi.

**Ulang berjarak.** 1: contoh: lisensi atau asal data tercatat; kolom spesifik atau langsung perlu dibuang atau dibenarkan; tujuan dan dasar tertulis; tidak ada wajah, suara, atau foto. 2: evaluasi risiko dan langkah mitigasinya (Pasal 34); wajib bila risiko tinggi, misalnya keputusan otomatis berdampak signifikan atau pemrosesan data spesifik atau skala besar. 3: agar tidak dianggap data asli, selaras maksud Pasal 35 UU ITE tentang manipulasi agar tampak otentik, dan agar pembaca tahu batas temuan.

## Langkah berikutnya

Modul berikut: `d-xii1-m5` (menyiapkan data proyek), yang memilih data terbuka atau menyintesis data dengan catatan sumber. Bacaan lanjut: naskah UU Nomor 27 Tahun 2022 di JDIH BPK (di `Rujukan`).
