## Untuk siapa modul ini

Modul ini untuk murid kelas X yang baru mulai belajar informatika. Tidak perlu pernah memprogram. Modul ini mengikuti minggu fondasi pertama (FND-X1-M1): komputer, perangkat keras, dan model Input-Proses-Output (I-P-O) pada komputer Von Neumann.

Setelah mempelajari modul ini, kamu diharapkan bisa:

- menyebut fungsi komponen komputer: CPU, memori, penyimpanan, perangkat masukan dan keluaran, papan induk, dan catu daya;
- menjelaskan dan menyimulasikan siklus I-P-O komputer Von Neumann;
- membaca spesifikasi sebuah komputer dan mengisi lembar spesifikasi.

Salah satu butir capaian pembelajaran (CP) yang disiapkan modul ini berbunyi: "memahami model dan menyimulasikan dinamika Input-Process-Output dalam sebuah komputer Von Neumann, serta memahami peran sistem operasi". Peran sistem operasi dibahas di modul berikutnya.

Cara memakai: baca penjelasan, lakukan kegiatan simulasi bersama temanmu, isi lembar kerja, lalu kerjakan latihan dan kuis. Kunci jawaban ada di bagian akhir; coba dulu tanpa melihatnya.

Catatan keselamatan: modul ini tidak meminta kamu membongkar komputer yang masih dipakai. Mengenali komponen cukup lewat foto, gambar, atau komponen bekas yang disiapkan guru (kegiatan itu opsional).

## Apa itu komputer?

Komputer adalah mesin yang menerima data (masukan), mengolahnya sesuai instruksi (proses), lalu menghasilkan hasil (keluaran). Ponsel, laptop, dan mesin kasir adalah komputer. Karena ketiganya mengikuti pola yang sama, kita belajar polanya dulu.

```text
MASUKAN  ->  PROSES  ->  KELUARAN
(Input)      (Process)   (Output)
```

Contoh sehari-hari:

| Perangkat | Masukan | Proses | Keluaran |
| --- | --- | --- | --- |
| Kalkulator | tombol angka ditekan | menjumlahkan | angka di layar |
| Mesin kasir | harga barang dipindai | menghitung total | struk dan tampilan total |
| Kamera ponsel | cahaya dari objek | mengubah menjadi gambar digital | foto di layar |

## Komponen utama komputer

| Komponen | Fungsi | Analogi |
| --- | --- | --- |
| CPU (prosesor) | menjalankan instruksi satu per satu dan menghitung | koki yang memasak |
| Memori (RAM) | tempat sementara untuk program dan data yang sedang dipakai; isinya hilang saat listrik mati | meja kerja koki |
| Penyimpanan (SSD atau hard disk) | tempat menyimpan program dan berkas secara tetap; isinya bertahan saat listrik mati | lemari bahan dan buku resep |
| Perangkat masukan | memasukkan data ke komputer: papan ketik, tetikus, mikrofon, kamera, layar sentuh | pintu tempat bahan masuk |
| Perangkat keluaran | menampilkan hasil: layar, pengeras suara, pencetak | piring yang disajikan |
| Papan induk (motherboard) | papan yang menghubungkan semua komponen | jalan dan jembatan di sebuah kota |
| Catu daya (power supply) | mengubah listrik dari stopkontak menjadi tegangan yang sesuai untuk komponen | gardu listrik |

Dua hal yang sering tertukar:

- **Memori dan penyimpanan itu berbeda.** Memori cepat tetapi sementara; penyimpanan lebih lambat tetapi tetap. Saat kamu membuka sebuah berkas, salinannya dimuat dari penyimpanan ke memori.
- **Ukuran.** Satuan data dibahas di modul representasi data. Untuk sekarang: 1 byte menyimpan satu karakter teks sederhana, 1 KB = 1024 byte, dan 1 MB = 1024 KB.

## Model komputer Von Neumann

Hampir semua komputer modern mengikuti rancangan yang dikemukakan John von Neumann pada pertengahan abad ke-20. Gagasan pentingnya: **program (kumpulan instruksi) disimpan di memori yang sama dengan data.** CPU mengambil instruksi dari memori satu per satu, lalu menjalankannya.

```text
 [Masukan] --> [ CPU ] <--> [ Memori: instruksi + data ] --> [Keluaran]
```

CPU mengulang siklus sederhana berikut (disebut siklus ambil-jalankan):

```text
1. AMBIL   : baca instruksi berikutnya dari memori.
2. PAHAMI  : tentukan apa yang diminta instruksi itu.
3. JALANKAN: kerjakan (hitung, pindahkan data, terima masukan, atau kirim keluaran).
4. ULANGI  : lanjut ke instruksi berikutnya.
```

Di CPU ada satu tempat kecil yang menyimpan hasil hitungan sementara. Pada simulasi di bawah kita sebut **Akumulator**.

## Kegiatan 1: Simulasi I-P-O tanpa komputer

Kegiatan ini dilakukan satu kelompok (sekitar 5 sampai 6 murid). Tidak butuh komputer; cukup kertas dan kartu.

### Peran

| Peran | Tugas |
| --- | --- |
| Perangkat Masukan | membacakan angka masukan dari daftar yang dipegangnya, satu angka tiap diminta |
| CPU | mengambil kartu instruksi, menjalankannya, dan menyimpan hasil di Akumulator (selembar kertas) |
| Memori | memegang papan berisi sel bernama M1, M2, M3 (nilai awal kosong) dan menyimpan serta membacakan isinya bila diminta CPU |
| Perangkat Keluaran | menuliskan angka yang dikirim CPU di papan hasil |
| Pengamat | mencatat langkah ke dalam tabel jejak dan mengecek kebenaran |

Nama murid pada lembar tugas cukup ditulis dengan nama samaran seperti Murid-01, Murid-02, dan seterusnya.

### Kartu instruksi

Buat kartu dari kertas. Setiap kartu bertuliskan satu instruksi.

| Instruksi | Arti |
| --- | --- |
| BACA | minta satu angka dari Perangkat Masukan; taruh di Akumulator |
| SIMPAN Mx | salin isi Akumulator ke sel Mx di Memori |
| TAMBAH Mx | tambahkan isi sel Mx ke Akumulator |
| CETAK | kirim isi Akumulator ke Perangkat Keluaran |
| BERHENTI | selesai |

### Program contoh: menjumlahkan dua angka

Daftar masukan yang dipegang Perangkat Masukan: `3, 4`.

```text
Kartu 1: BACA
Kartu 2: SIMPAN M1
Kartu 3: BACA
Kartu 4: TAMBAH M1
Kartu 5: CETAK
Kartu 6: BERHENTI
```

Jejak yang benar:

| Langkah | Kartu | Akumulator | M1 | Keluaran |
| --- | --- | --- | --- | --- |
| 1 | BACA | 3 | kosong | |
| 2 | SIMPAN M1 | 3 | 3 | |
| 3 | BACA | 4 | 3 | |
| 4 | TAMBAH M1 | 7 | 3 | |
| 5 | CETAK | 7 | 3 | 7 |
| 6 | BERHENTI | 7 | 3 | 7 |

Perhatikan tiga hal: (1) setiap kartu dijalankan berurutan; (2) memori menjaga nilai 3 agar tidak hilang ketika Akumulator berganti isi; (3) hasil baru terlihat ketika kartu CETAK dijalankan.

Langkah kegiatan:

1. Kelompok membagi peran lalu menjalankan program contoh. Pengamat mengisi tabel jejak.
2. Tukar peran, lalu jalankan lagi dengan masukan `10, 25`.
3. Kerjakan Latihan 1 sampai 3.

## Kegiatan 2: Membaca spesifikasi komputer lab

Spesifikasi menjelaskan komponen sebuah komputer. Cara melihatnya berbeda antarsistem operasi, tetapi umumnya ada di menu pengaturan, bagian "tentang" atau "informasi sistem". Guru akan menunjukkan letaknya pada komputer lab.

Isi **lembar spesifikasi komputer lab** berikut. Tulis "tidak terbaca" bila informasinya tidak muncul.

| Butir | Isi |
| --- | --- |
| Nama sistem operasi dan versinya | |
| Jenis dan nama prosesor | |
| Jumlah inti prosesor | |
| Kapasitas memori (RAM) | |
| Jenis dan kapasitas penyimpanan | |
| Resolusi layar | |

Opsional (jika komputer lab memakai Linux dan guru mengizinkan), perintah berikut hanya membaca informasi dan tidak mengubah apa pun:

```sh
lscpu
free -h
df -h
```

- `lscpu` menampilkan informasi prosesor.
- `free -h` menampilkan jumlah memori dalam satuan yang mudah dibaca.
- `df -h` menampilkan kapasitas dan penggunaan penyimpanan.

Jangan mengubah pengaturan dan jangan menghapus apa pun pada komputer lab.

## Kegiatan 3: Mengenali komponen (opsional)

Guru menayangkan foto atau gambar komponen: CPU, modul RAM, SSD, papan induk, catu daya. Murid mencocokkan nama komponen dengan fungsinya. Bila sekolah memiliki komponen bekas, guru boleh membawanya agar dilihat dan dipegang hati-hati. Komputer yang masih dipakai tidak dibongkar. Tidak ada kewajiban membawa perangkat dari rumah.

## Latihan

### Latihan 1: Jejak program

Masukan: `5, 8`. Program:

```text
BACA
SIMPAN M1
BACA
TAMBAH M1
TAMBAH M1
CETAK
BERHENTI
```

Buat tabel jejak seperti contoh. Berapa keluarannya?

### Latihan 2: Menulis program kartu

Rancang program kartu yang menerima tiga angka lalu mencetak jumlahnya. Gunakan hanya kartu pada tabel. Uji pada masukan `2, 3, 4`.

### Latihan 3: Mengapa memori?

Pada program contoh, apa yang akan terjadi bila kartu `SIMPAN M1` dilewati? Berapa keluarannya untuk masukan `3, 4`?

### Latihan 4: Cocokkan

Cocokkan komponen dengan fungsinya.

| Komponen | Fungsi |
| --- | --- |
| 1. CPU | a. menyimpan berkas tetap |
| 2. RAM | b. menghubungkan semua komponen |
| 3. SSD | c. menjalankan instruksi |
| 4. Papan induk | d. menampung program dan data yang sedang dipakai |
| 5. Catu daya | e. menyediakan tegangan listrik yang sesuai |

### Latihan 5: Klasifikasi

Kelompokkan sebagai masukan atau keluaran: papan ketik, layar, mikrofon, pengeras suara, pemindai kode batang, pencetak, layar sentuh.

### Latihan 6: Diagram beranotasi

Gambar diagram I-P-O untuk "mesin kasir sekolah fiktif". Beri keterangan: apa masukannya, apa yang dihitung, apa keluarannya. Hasil gambar ini adalah keluaran minggu ini (diagram I-P-O beranotasi).

## Kuis formatif

Jawab tanpa melihat catatan. Kunci ada di bagian akhir.

1. Apa beda memori (RAM) dan penyimpanan?
2. Pada komputer Von Neumann, di mana instruksi program disimpan?
3. Sebutkan empat tahap siklus ambil-jalankan.
4. Komponen mana yang mengubah listrik stopkontak menjadi tegangan yang cocok untuk komponen?
5. Apakah layar sentuh termasuk perangkat masukan, keluaran, atau keduanya?

## Cek mandiri

- Aku bisa menyebut fungsi tujuh komponen utama komputer.
- Aku bisa menjelaskan siklus ambil-jalankan dengan kata-kataku.
- Aku bisa membaca informasi prosesor, memori, dan penyimpanan dari komputer lab.

## Kunci dan petunjuk

**Latihan 1.** Jejak: BACA, Akumulator 5. SIMPAN M1, M1 = 5. BACA, Akumulator 8. TAMBAH M1, Akumulator 13. TAMBAH M1 lagi, Akumulator 18. CETAK mengeluarkan 18. (Terlihat bahwa `8 + 5 + 5 = 18`.)

**Latihan 2.** Salah satu jawaban:

```text
BACA
SIMPAN M1
BACA
TAMBAH M1
SIMPAN M1
BACA
TAMBAH M1
CETAK
BERHENTI
```

Untuk `2, 3, 4`: M1 = 2, lalu Akumulator 3 + 2 = 5 disimpan ke M1, lalu 4 + 5 = 9. Keluaran 9. Jawaban lain boleh asal hasilnya sama.

**Latihan 3.** Tanpa `SIMPAN M1`, M1 tetap kosong. Pada masukan `3, 4`, `BACA` kedua menimpa Akumulator sehingga angka 3 hilang. Bila sel kosong dianggap bernilai 0, keluarannya 4, bukan 7. Pelajaran: memori menyimpan nilai agar tidak hilang saat Akumulator dipakai ulang.

**Latihan 4.** 1-c, 2-d, 3-a, 4-b, 5-e.

**Latihan 5.** Masukan: papan ketik, mikrofon, pemindai kode batang. Keluaran: layar, pengeras suara, pencetak. Layar sentuh keduanya (menerima sentuhan dan menampilkan gambar).

**Latihan 6.** Contoh: masukan = barang yang dipindai dan harganya; proses = menjumlahkan harga; keluaran = total belanja di layar dan struk.

**Kuis.**

1. RAM: cepat, sementara (hilang saat listrik mati), menampung yang sedang dipakai. Penyimpanan: lebih lambat, tetap, menyimpan berkas dan program.
2. Di memori, bersama data.
3. Ambil, pahami, jalankan, ulangi.
4. Catu daya.
5. Keduanya.

## Langkah berikutnya

Lanjutkan ke modul perangkat lunak dan sistem operasi (FND-X1-M2), lalu representasi data (FND-X1-M3). Di sana kamu akan tahu apa sebenarnya yang disimpan memori: deretan bit.
