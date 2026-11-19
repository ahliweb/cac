## Untuk siapa modul ini

Modul ini untuk murid kelas 9 pada minggu ketiga semester kedua, tahap pertama menulis produk proyek akhir. Kamu bekerja dalam tim kecil dengan editor Python dan kertas rancangan; tim yang memilih Scratch memakai blok buatan sendiri dengan susunan yang sama. Waktunya satu pertemuan, 2 JP, dan hasilnya satu kerangka produk yang bisa dijalankan. Prasyaratnya `SMP9-2-M2` (rancangan). Semua contoh di modul ini rekaan.

## Ingat kembali

Tutup modul ini dan jawab dari ingatan.

1. Tulis kerangka program dengan tiga fungsi: membaca, memproses, dan mencetak. (`SMP9-1-M13`)
2. Tulis masukan, proses, dan keluaran untuk pencari petugas piket hari tertentu. (`SMP9-2-M2`)
3. Jelaskan beda `print` dan `return` di dalam fungsi. (`SMP8-2-M9`)

Kunci: (1) contoh: `def baca():` yang `return` data, `def proses(data):` yang `return` hasil, `def cetak(hasil):` yang `print`, lalu satu baris pemanggil; (2) masukan: nama hari; proses: mencari hari itu di jadwal; keluaran: nama petugas atau pesan tidak ada jadwal; (3) `return` mengembalikan nilai kepada pemanggil, sedangkan `print` hanya menampilkannya di layar.

## Tujuan

Setelah modul ini kamu dapat:

1. mengubah rancangan menjadi kerangka program dengan tiga fungsi;
2. mengisi bagian yang belum jadi dengan isi sementara, lalu menjalankan seluruh kerangka;
3. menelusuri alur kerangka dari pemanggilan sampai keluaran;
4. menjelaskan mengapa kerangka dijalankan sebelum semua bagian lengkap.

## Prediksi dulu

Rancangan piket menjadi kerangka berikut. Fungsi `cari_petugas` masih berisi **isi sementara**: ia selalu memberi `["Murid-01"]`, apa pun harinya.

```python
def baca_jadwal():
    return {"Senin": ["Murid-01", "Murid-02"]}


def cari_petugas(jadwal, hari):
    return ["Murid-01"]


def cetak_hasil(hari, petugas):
    print("Piket", hari + ":", ", ".join(petugas))


jadwal = baca_jadwal()
cetak_hasil("Rabu", cari_petugas(jadwal, "Rabu"))
```

`", ".join(petugas)` menyambung isi daftar dengan tanda koma dan spasi.

**Prediksi.** Apa yang tercetak? Apakah hasilnya sudah benar menurut rancangan? Tulis dulu, lalu telusuri pemanggilannya.

## Contoh terselesaikan

Karena ini minggu implementasi, contohnya berupa **contoh kerangka**. Tercetak:

```text
Piket Rabu: Murid-01
```

Telusuri: `baca_jadwal()` memberi kamus satu hari; `cari_petugas` mengabaikan kamus itu dan memberi `["Murid-01"]`; `cetak_hasil("Rabu", ["Murid-01"])` menyambung satu isi menjadi `Murid-01`. Hasilnya **belum benar**: menurut rancangan, Rabu dikerjakan `Murid-04` dan `Murid-05`, dan jadwalnya belum memuat Rabu. Tetapi kerangkanya sudah berjalan dari awal sampai akhir. Itu tujuan tahap 1:

| Bagian rancangan | Fungsi | Isi sementara |
| --- | --- | --- |
| Menyimpan jadwal | `baca_jadwal` | kamus satu hari |
| Mencari petugas | `cari_petugas` | selalu `["Murid-01"]` |
| Mencetak hasil | `cetak_hasil` | sudah final untuk hari yang ada |

Kerangka yang berjalan membuat kesalahan antarbagian cepat ketahuan, sebelum tiap bagian dilengkapi di `SMP9-2-M4`. Tulis `TODO` di tiap isi sementara supaya tidak terlupa. Ini juga cara mengubah pseudocode menjadi program: satu baris pseudocode menjadi satu fungsi atau satu pernyataan.

## Contoh setengah jadi

Kerangka timmu sendiri. Lengkapi dengan isi sementara untuk persoalan timmu (contoh di bawah memakai jadwal piket).

```python setengah-jadi
def baca_jadwal():
    return ____


def cari_petugas(jadwal, hari):
    return ____  # TODO: isi sementara


def cetak_hasil(hari, petugas):
    print(____)


jadwal = baca_jadwal()
cetak_hasil("Senin", cari_petugas(jadwal, "Senin"))
```

## Susun urutannya

Dilewati: minggu implementasi memakai kerangka timmu sendiri, bukan satu program berurutan.

## Latihan

1. **Jalankan.** Salin kerangka di atas, jalankan, lalu ubah hari menjadi `Senin`. Apa yang tercetak?
2. **Ubah.** Ubah `cetak_hasil` agar lebih dulu mencetak `Hari:` dan nama hari di satu baris sendiri.
3. **Buat.** Tulis kerangka tiga fungsi untuk rancangan timmu dan jalankan sampai ujung. Tandai tiap isi sementara dengan `TODO`.
4. **Jelaskan.** Jelaskan dengan kata sendiri mengapa kerangka dijalankan sebelum bagian lain lengkap.

## Latihan bercampur

1. `def dua_kali(x):` berisi `return x * 2`. Berapa `dua_kali(dua_kali(3))`? (`SMP8-2-M9`)
2. `daftar = ["a", "b", "c"]`. Galat apa muncul pada `daftar[3]`? (`SMP8-2-M10`)

## Ulang berjarak

Kerjakan ulang tanpa melihat modul ini, lalu cocokkan:

- **Minggu depan** (`SMP9-2-M4`): sebut tugas tiga fungsi kerangka dan apa yang dikembalikan masing-masing.
- **Beberapa minggu lagi** (`SMP9-2-M6`): jelaskan mengapa kerangka dijalankan sebelum semua bagian diisi.
- **Akhir semester** (`SMP9-2-M14`): tulis dari ingatan kerangka tiga fungsi baca, cari, dan cetak, dan sebut isi sementara tiap fungsi.

## Kesalahan umum

- **Menulis semua bagian sekaligus tanpa menjalankan.** Kenali: baru dijalankan ketika sudah panjang, dan galat tidak jelas asalnya.
- **Lupa memanggil fungsi.** Kenali: program berjalan tanpa keluaran.
- **Memakai `print` di tempat yang seharusnya `return`.** Kenali: bagian lain menerima `None`, bukan nilainya.
- **Menganggap isi sementara sudah benar.** Kenali: tidak ada `TODO` dan hasilnya tidak diperiksa terhadap rancangan.

## Cek mandiri

Tutup modul, jawab tanpa melihat, lalu periksa.

1. Apa yang dilakukan tiap fungsi pada kerangka piket?
2. Mengapa hasil kerangka di atas belum benar walau berjalan?
3. Apa gunanya menulis `TODO`?

Daftar periksa (kosong; kamu isi sendiri, tidak dikumpulkan):

- [ ] Kerangka timku punya tiga fungsi dan satu pemanggil.
- [ ] Kerangka timku sudah dijalankan sampai ujung.
- [ ] Tiap isi sementara kutandai dengan `TODO`.

Kunci: (1) `baca_jadwal` menyimpan dan mengembalikan jadwal; `cari_petugas` memberi daftar petugas; `cetak_hasil` mencetak; (2) `cari_petugas` hanya isi sementara dan tidak memakai jadwal; (3) menandai bagian yang belum lengkap supaya tidak terlupa.

## Langkah berikutnya

`SMP9-2-M4`, "Implementasi, tahap 2". Kamu mengganti isi sementara dengan isi sebenarnya sampai produk berjalan benar untuk tiga kasus uji awal.

## Catatan untuk guru

- **Waktu:** 2 JP x 40 menit `[asumsi]` (silabus bagian 2). Kerja tim boleh; bukan jaminan efek belajar.
- **Alat:** editor Python 3 sekolah; tim yang memilih Scratch memakai blok buatan sendiri dengan padanan baca, cari, dan cetak. Penulis menjalankan program dengan `python3 -I` (Python 3.12.3); keluaran `Piket Rabu: Murid-01` sama dengan yang tertulis. Padanan Scratch tidak dijalankan penulis, jadi guru memeriksanya sebelum kelas. Perilaku fungsi dicocokkan dengan dokumentasi resmi Python.
- **Butir CP:** corpus memetakan minggu ini ke `DK-BK-b`, `D-BK-e`, dan `DK-BK-c`. Modul tidak menyatakan CP "terpenuhi"; kerangka produk dinilai guru dengan rubriknya sendiri.
- **Keluaran minggu:** kerangka produk.
- **Kunci "Prediksi dulu":** `Piket Rabu: Murid-01`; belum benar karena `cari_petugas` hanya isi sementara.
- **Kunci "Contoh setengah jadi":** jawaban bebas; periksa tiga fungsi, isi sementara bertanda `TODO`, dan program berjalan.
- **Kunci latihan:** (1) `Piket Senin: Murid-01`. (2) contoh: tambah `print("Hari:", hari)` sebelum baris `print("Piket", ...)`. (3) kerangka tiga fungsi berjalan sampai ujung. (4) kerangka yang berjalan mengungkap kesalahan antarbagian lebih awal.
- **Kunci "Latihan bercampur":** (1) 12. (2) `IndexError`.
- **Petunjuk bertahap:** (a) ubah tiap bagian rancangan menjadi satu fungsi; (b) isi tiap fungsi dengan nilai tetap; (c) tulis pemanggil; (d) jalankan.
- **AI:** tanpa AI oleh murid. Kebijakan `smp-coding` (silabus bagian 7.1): AI generatif hanya demonstrasi guru, tanpa akun murid; murid tidak meminta AI menulis kerangka atau kode; asesmen tanpa AI.
- **Privasi:** data jadwal rekaan dengan nama samaran; tim tidak memakai nama teman nyata, nama sekolah, atau foto.
- **Unsur pembelajaran:** ingat kembali dan jarak (`K`), kerangka menggantikan contoh terselesaikan (`M`), PRIMM (`K` usia 11 sampai 14), penelusuran (`K`), contoh setengah jadi (`M`), latihan bercampur (`K`).
