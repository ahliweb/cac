## Untuk siapa modul ini

Modul ini untuk jalur **pekerja** (`PKJ`), 5 jam, sesudah `DW-FND-M1`. Anda perlu terbiasa dengan lembar kerja dasar (jumlah, rata-rata, format) `[asumsi]`. Alatnya kertas atau penyunting teks; Python 3 hanya dipakai pada satu blok pendek yang boleh dibaca saja. Estimasi dua sesi, sekitar dua setengah jam masing-masing `[asumsi]`.

Anda boleh memetakan tugas dari pekerjaan Anda sendiri, **asal hanya nama dan langkah tugas secara umum** yang Anda tulis: tanpa nama orang, klien, angka nyata, atau berkas kerja. Bila ragu apakah suatu rincian boleh ditulis, gantilah dengan tugas rekaan.

## Cek awal pengalaman

Pengalaman kerja Anda berharga, tetapi mari uji tanpa melihat apa pun. Skor tidak dicatat.

1. Apa itu algoritma, dalam satu kalimat?
2. Mengapa langkah "periksa apakah datanya bagus" belum bisa disebut langkah algoritma?
3. Sebutkan dua ciri tugas yang layak diotomasi.
4. Sebuah tugas dikerjakan sekali setahun dan memakan 10 jam. Apakah pasti layak dibuatkan otomasi? Mengapa?
5. Apa yang harus tertulis pada langkah yang memuat keputusan?

Bila kelimanya benar (kunci di akhir), Anda boleh melewati "Contoh terselesaikan" dan "Contoh setengah jadi" dan langsung ke "Latihan".

## Ingat kembali

Tanpa melihat `DW-FND-M1`, tulis jawaban singkat. Mencoba mengingat lebih membantu ingatan jangka panjang daripada membaca ulang, dan jawaban yang belum lengkap tidak apa-apa.

1. Sebutkan tiga aturan tentang kredensial.
2. Apa itu *prompt injection*, dalam satu kalimat?
3. Mengapa data sintetis dipakai di latihan, bukan data kantor Anda?

Cocokkan: (1) tidak di berkas kode, tidak di perintah AI, tidak di-commit (berkas `.env` tidak dibagikan); (2) instruksi tersembunyi dalam teks dari luar yang diikuti AI; (3) agar tidak ada data pribadi atau rahasia usaha yang terbawa. Bila meleset, buka lagi bagian "Kunci dan petunjuk" modul itu.

## Tujuan

Setelah modul ini Anda dapat mengidentifikasi tugas yang layak diotomasi dan menulis langkah tugas sebagai algoritma.

## Prediksi dulu

Tiga tugas kantor rekaan berikut sudah diukur selama sebulan. Sebelum menghitung apa pun, urutkan dari yang paling layak diotomasi ke yang paling tidak, dan tulis alasannya.

| Tugas | Kali per bulan | Menit sekali kerja | Jam membuat otomasi |
| --- | --- | --- | --- |
| Rekap absensi mingguan | 4 | 45 | 6 |
| Salin faktur ke lembar rekap | 20 | 10 | 5 |
| Laporan tahunan unik | sekali setahun | 600 | 12 |

## Contoh terselesaikan

### Empat pertanyaan kelayakan

Tugas layak dipertimbangkan bila jawaban Anda mendukung pada keempatnya:

1. **Seberapa sering?** Tugas yang berulang memberi banyak kesempatan menghemat waktu.
2. **Berapa lama sekali kerja?** Lima menit sekali sehari bisa lebih berarti daripada satu jam sekali sebulan.
3. **Apakah aturannya bisa ditulis tegas?** Bila Anda tidak bisa menjelaskannya kepada orang baru tanpa kata "tergantung", mesin pun tidak bisa menjalankannya.
4. **Apa akibatnya bila salah, dan adakah data sensitif?** Tugas yang berisiko tinggi atau menyentuh data pribadi perlu persetujuan dan kehati-hatian tambahan, atau sebaiknya tetap dikerjakan manusia.

### Titik impas

Waktu hemat per bulan adalah kali per bulan dikali menit sekali kerja, dibagi 60. Titik impas adalah jam membuat otomasi dibagi jam hemat per bulan. Angka ini kasar: ia mengabaikan waktu perawatan dan belajar alat, jadi anggap sebagai batas bawah.

```python
# Setiap tugas: (nama, kali per bulan, menit sekali kerja, jam membuat otomasi)
# Semua angka rekaan. Anggap otomasi menghapus seluruh waktu manual.
TUGAS = [
    ("Rekap absensi mingguan", 4, 45, 6),
    ("Salin faktur ke lembar rekap", 20, 10, 5),
    ("Laporan tahunan unik", 1 / 12, 600, 12),
]

for nama, kali, menit, jam_buat in TUGAS:
    jam_hemat_per_bulan = kali * menit / 60
    impas = jam_buat / jam_hemat_per_bulan
    print(f"{nama}: hemat {jam_hemat_per_bulan:.1f} jam/bulan, impas {impas:.1f} bulan")
```

Keluarannya (dijalankan dengan `python3 -I`, Python 3.12.3):

```text
Rekap absensi mingguan: hemat 3.0 jam/bulan, impas 2.0 bulan
Salin faktur ke lembar rekap: hemat 3.3 jam/bulan, impas 1.5 bulan
Laporan tahunan unik: hemat 0.8 jam/bulan, impas 14.4 bulan
```

Tugas ketiga paling lama impasnya meski paling lama dikerjakan sekali jalan: ia jarang terjadi. Dua tugas pertama layak. Itu bukan vonis; perhitungan ini hanya membantu Anda mengurutkan.

### Menulis langkah sebagai algoritma

Algoritma adalah urutan langkah yang jelas dan berhingga. Tiap langkah menyebut **apa yang dikerjakan pada apa**, dan tiap keputusan menyebut **syarat** serta **dua cabang tindakan**. Berikut tugas "rekap lembur mingguan" dari log sintetis:

```text
Masukan : daftar baris (tanggal, jam masuk, jam keluar); batas jam kerja 8; istirahat 1 jam
Keluaran: total lembur (jam) dan daftar baris yang perlu dicek

1. Atur total lembur = 0 dan daftar perlu-dicek = kosong.
2. Ambil baris berikutnya. Bila tidak ada baris lagi, loncat ke langkah 6.
3. Bila jam keluar kosong atau lebih awal dari jam masuk:
   catat tanggal baris itu di daftar perlu-dicek, lalu kembali ke langkah 2.
4. Jam kerja = jam keluar - jam masuk - istirahat.
5. Bila jam kerja > 8: tambahkan (jam kerja - 8) ke total lembur.
   Kembali ke langkah 2.
6. Tampilkan total lembur dan daftar perlu-dicek.
```

Telusuri dengan data rekaan. Senin 08:00-17:30 memberi 8,5 jam kerja dan lembur 0,5. Selasa 08:00-16:00 memberi 7 jam, tanpa lembur. Rabu 08:00-19:00 memberi 10 jam dan lembur 2. Kamis jam keluarnya kosong, jadi masuk daftar perlu-dicek. Hasil: total lembur 2,5 jam dan satu baris perlu dicek. Perhatikan langkah 3: kasus yang tidak lazim (jam kosong) ditangani **secara tertulis**, bukan dibiarkan merusak total.

## Contoh setengah jadi

### Susun urutannya

Berikut enam langkah tugas "rekap faktur bulanan" yang urutannya diacak. Susun menjadi algoritma yang benar, lalu periksa dengan kunci.

- **A.** Siapkan total nol untuk tiap kategori.
- **B.** Ambil faktur berikutnya; bila tidak ada lagi, loncat ke E.
- **C.** Tambahkan nilai faktur ke total kategorinya.
- **D.** Kembali ke B.
- **E.** Tulis total tiap kategori ke lembar rekap.
- **F.** Bila kategori faktur kosong: catat nomor faktur di daftar periksa, lalu kembali ke B tanpa menjalankan C.

Setelah Anda berhasil, lengkapi yang berikut dengan kata Anda sendiri: "Satu kasus tidak lazim pada tugas ini yang belum ditangani algoritma saya adalah ____."

## Latihan

1. **Ubah.** Ubah daftar `TUGAS` pada skrip: tambahkan `("Cek stok harian", 22, 5, 8)`. Prediksi dulu titik impasnya, lalu jalankan.
2. **Buat.** Pilih tiga tugas berulang (rekaan, atau dari pekerjaan Anda tanpa rincian sensitif). Untuk tiap tugas isi: frekuensi, menit sekali kerja, jam membuat otomasi, aturannya tegas atau tidak, risiko galat, dan adakah data sensitif. Hitung titik impasnya.
3. **Buat.** Tulis salah satu tugas Anda sebagai algoritma: masukan, langkah bernomor, setiap keputusan dengan syarat dan dua cabang, dan keluaran. Telusuri dengan tiga data rekaan, satu di antaranya kasus tidak lazim.
4. **Jelaskan.** Mengapa "menjawab keluhan pelanggan yang marah" kurang layak diotomasi penuh? Tuliskan dua alasan.
5. **Berpasangan (opsional).** Minta rekan mengikuti algoritma Anda secara harfiah di kertas. Catat langkah mana yang ia tanyakan. Peserta mandiri boleh melewati tugas ini.

## Latihan bercampur

1. Salah satu tugas Anda menyalin data pelanggan. Dari `DW-FND-M1`: apa yang boleh Anda tulis di peta, dan apa yang tidak?
2. Pada tugas "Rekap absensi mingguan", waktu membuat otomasi ternyata dua kali lipat (12 jam). Hitung ulang titik impasnya. Apakah keputusan Anda berubah?

## Keluaran portofolio

**Peta tiga tugas berulang dan langkahnya.** Simpan sebagai berkas teks atau lembar kerja. Untuk tiap tugas: nama, frekuensi, menit sekali kerja, jam membuat otomasi, titik impas, algoritma bernomor, dan catatan risiko atau data sensitif. Seluruhnya memakai tugas rekaan atau tugas umum tanpa data.

## Ulang berjarak

Tanpa melihat modul ini, kerjakan ulang dan cocokkan. Pertanyaan ini akan muncul lagi di "Ingat kembali" modul berikutnya.

| Kapan | Pertanyaan |
| --- | --- |
| Satu minggu lagi (modul berikutnya) | Sebutkan tiga ciri tugas yang layak diotomasi. |
| Dua modul lagi | Sebutkan empat pertanyaan kelayakan tugas untuk diotomasi. |
| Tiga modul lagi | Tulis tugas yang Anda pilih sebagai algoritma yang memuat satu keputusan. |
| Akhir jalur | Hitung titik impas satu tugas dan tinjau apakah angkanya masih benar. |

## Kebijakan AI

Modul ini tidak memakai asisten AI; kebijakan lengkap program ada di `DW-FND-M1` dan akan dipakai penuh pada `DW-PKJ-M6` (silabus bagian 9.1).

## Kesalahan umum

- **Mengotomasi proses yang belum Anda pahami.** Tuliskan dulu langkahnya dengan tangan; langkah yang tidak bisa Anda tulis tidak bisa dijalankan mesin.
- **Mengukur waktu hanya dari ingatan.** Catat durasi tugas beberapa kali sebelum menghitung.
- **Menulis langkah yang samar**, seperti "periksa datanya". Sebut syarat yang dapat diperiksa.
- **Melupakan kasus tidak lazim**, seperti jam kosong atau kategori kosong.
- **Mengabaikan perawatan.** Otomasi yang rusak saat format data berubah mengambil waktu lagi.

## Cek mandiri

Tutup modul dan jawab:

1. Empat pertanyaan kelayakan tugas.
2. Rumus titik impas dan satu hal yang tidak dihitungnya.
3. Apa bedanya langkah yang jelas dengan langkah yang samar? Beri satu contoh masing-masing.

Daftar periksa (kosong; Anda isi sendiri, tidak dikumpulkan):

- [ ] Peta saya memuat tiga tugas dengan angka frekuensi dan durasi.
- [ ] Setiap keputusan dalam algoritma saya punya syarat dan dua cabang.
- [ ] Saya sudah menelusuri algoritma dengan satu kasus tidak lazim.
- [ ] Peta saya tidak memuat nama, angka nyata, atau berkas kerja.

## Kunci dan petunjuk

- **Cek awal:** (1) urutan langkah yang jelas dan berhingga untuk menyelesaikan suatu masalah; (2) tidak ada kriteria yang bisa diperiksa mesin; (3) berulang, aturan tegas, volume cukup; (4) belum tentu: hitung titik impas, tugas yang jarang bisa tidak sepadan; (5) syarat yang dapat diperiksa dan tindakan untuk kedua cabang.
- **Prediksi:** urutan wajar: salin faktur dan rekap absensi (impas 1,5 dan 2,0 bulan), lalu laporan tahunan (14,4 bulan).
- **Susun urutannya:** A, B, F, C, D, E.
- **Latihan 1:** hemat 1,8 jam per bulan, impas 4,4 bulan.
- **Latihan bercampur 2:** impas menjadi 4,0 bulan; keputusan berubah hanya bila Anda menuntut impas di bawah itu.
- **Petunjuk bila macet pada latihan 3:** mulai dari keluaran yang Anda inginkan, lalu mundur: apa saja masukannya, dan di langkah mana tugas bisa berhenti?

## Langkah berikutnya

`DW-PKJ-M2`: Anda sudah punya peta tugas; berikutnya Anda berlatih rumus dan pembersihan data di lembar kerja untuk mengerjakan tugas seperti rekap.

## Catatan untuk pendamping

- **Waktu:** 5 jam. **Bahan:** kertas atau penyunting teks; Python 3 untuk satu blok (opsional).
- **Tanda siap lanjut:** peserta menulis satu algoritma dengan keputusan dan menelusurinya dengan satu kasus tidak lazim.
- **Privasi:** cek peta peserta agar tidak memuat nama atau angka nyata; arahkan ke tugas rekaan bila perlu.
