## Untuk siapa modul ini

Modul ini untuk murid kelas 9 pada minggu keempat semester kedua, tahap kedua menulis produk proyek akhir. Kamu bekerja dalam tim kecil dengan editor Python (atau Scratch bila timmu memilihnya) dan kerangka dari minggu lalu. Waktunya satu pertemuan, 2 JP, dan hasilnya produk yang berjalan benar untuk tiga kasus uji awal. Prasyaratnya `SMP9-2-M3` (kerangka). Semua contoh di modul ini rekaan.

## Ingat kembali

Tutup modul ini dan jawab dari ingatan.

1. Sebut tugas tiga fungsi kerangka dan apa yang dikembalikan masing-masing. (`SMP9-2-M3`)
2. Sebut empat bagian rancangan solusi. (`SMP9-2-M2`)
3. Jelaskan beda `kamus.get(k)` dan `kamus[k]` untuk kunci yang tidak ada. (`SMP9-1-M5`)

Kunci: (1) fungsi pertama menyimpan atau membaca data dan mengembalikannya, fungsi kedua memproses dan mengembalikan hasil, fungsi ketiga hanya mencetak; (2) tujuan, masukan, proses, keluaran; (3) `get` memberi `None` atau nilai cadangan, sedangkan `kamus[k]` berhenti dengan `KeyError`.

## Tujuan

Setelah modul ini kamu dapat:

1. mengganti isi sementara dengan isi sebenarnya satu bagian demi satu bagian;
2. membaca masukan pengguna dan memakai nilai cadangan untuk kunci yang tidak ada;
3. menelusuri program lengkap dengan tabel;
4. menjalankan tiga kasus uji awal dan mencocokkannya dengan rancangan.

## Prediksi dulu

Isi sementara sudah diganti. Jadwal rekaan kini memuat tiga hari, dan `cari_petugas` memakai `get` dengan daftar kosong sebagai nilai cadangan.

```python
def baca_jadwal():
    return {
        "Senin": ["Murid-01", "Murid-02"],
        "Selasa": ["Murid-03"],
        "Rabu": ["Murid-04", "Murid-05"],
    }


def cari_petugas(jadwal, hari):
    return jadwal.get(hari, [])


def cetak_hasil(hari, petugas):
    if len(petugas) == 0:
        print("Tidak ada jadwal untuk", hari)
    else:
        print("Piket", hari + ":", ", ".join(petugas))


jadwal = baca_jadwal()
hari = input("Hari? ")
cetak_hasil(hari, cari_petugas(jadwal, hari))
```

**Prediksi.** Apa yang tercetak bila pengguna mengetik `Selasa`? `Kamis`? `senin` (huruf kecil)? Tulis dulu, lalu telusuri.

## Contoh terselesaikan

Karena ini minggu implementasi, contohnya berupa **contoh produk yang berjalan**. Tiga masukan memberi:

```text
Hari? Selasa
Piket Selasa: Murid-03
Hari? Kamis
Tidak ada jadwal untuk Kamis
Hari? senin
Tidak ada jadwal untuk senin
```

Telusuri tiap masukan:

| `hari` | `jadwal.get(hari, [])` | `len(petugas)` | Cabang | Keluaran |
| --- | --- | --- | --- | --- |
| `Selasa` | `["Murid-03"]` | 1 | `else` | `Piket Selasa: Murid-03` |
| `Kamis` | `[]` | 0 | `if` | `Tidak ada jadwal untuk Kamis` |
| `senin` | `[]` | 0 | `if` | `Tidak ada jadwal untuk senin` |

`get(hari, [])` memberi daftar kosong bila hari tidak ada, jadi program tidak berhenti dengan `KeyError`. Dari tiga kasus uji awal rancangan, hari yang ada dan hari yang tidak ada sudah di tabel; masukan kosong (hanya menekan Enter) mencetak `Tidak ada jadwal untuk ` dengan nama hari kosong. Hasil `senin` dan masukan kosong memang aneh bagi pengguna. Jangan diperbaiki sekarang; catat sebagai temuan untuk diuji pengguna minggu depan dan diperbaiki di `SMP9-2-M6`. Mengisi satu bagian, menjalankan, lalu mengisi bagian berikutnya menjaga kesalahan tetap kecil.

## Contoh setengah jadi

Lengkapi dua fungsi di bawah untuk produk timmu (contoh ini memakai jadwal piket).

```python setengah-jadi
def cari_petugas(jadwal, hari):
    return jadwal.get(____, ____)


def cetak_hasil(hari, petugas):
    if len(petugas) == ____:
        print("Tidak ada jadwal untuk", hari)
    else:
        print("Piket", hari + ":", ", ".join(petugas))
```

## Susun urutannya

Dilewati: minggu implementasi memakai produk timmu sendiri, bukan satu program berurutan.

## Latihan

1. **Jalankan.** Jalankan produkmu dengan masukan `Rabu`. Apa yang tercetak?
2. **Ubah.** Tambahkan hari `Kamis` dengan dua petugas samaran ke jadwal, lalu jalankan dengan masukan `Kamis`.
3. **Buat.** Ganti semua isi sementara di kerangka timmu dengan isi sebenarnya, satu fungsi sekali jalan, dan jalankan tiga kasus uji awal. Catat hasil tiap kasus.
4. **Jelaskan.** Jelaskan dengan kata sendiri mengapa `get(hari, [])` lebih aman daripada `jadwal[hari]` di produk ini.

## Latihan bercampur

1. `for hari in jadwal:` dengan `print(hari)` pada jadwal di atas. Apa yang tercetak? (`SMP9-1-M3`)
2. Mengapa `"7" + "2"` menghasilkan `72`? (`SMP8-2-M3`)

## Ulang berjarak

Kerjakan ulang tanpa melihat modul ini, lalu cocokkan:

- **Minggu depan** (`SMP9-2-M5`): telusuri program piket untuk masukan `Selasa` dan `Kamis`.
- **Beberapa minggu lagi** (`SMP9-2-M6`): jelaskan beda `jadwal.get(hari, [])` dan `jadwal[hari]` untuk hari yang tidak ada.
- **Akhir semester** (`SMP9-2-M14`): tulis dari ingatan fungsi yang mencari nilai di kamus dan memberi daftar kosong bila kuncinya tidak ada.

## Kesalahan umum

- **Mengganti semua isi sementara sekaligus.** Kenali: program galat dan tidak jelas bagian mana yang salah.
- **Memakai `jadwal[hari]`.** Kenali: `KeyError` untuk hari yang tidak ada.
- **Membandingkan `len(petugas)` dengan teks.** Kenali: `len` memberi bilangan; bandingkan dengan `0`, bukan `"0"`.
- **Menguji hanya hari yang ada.** Kenali: kasus tidak ada dan kosong belum pernah dijalankan.
- **Mencatat nama teman sungguhan di jadwal.** Kenali: nama di jadwal bukan nama samaran.

## Cek mandiri

Tutup modul, jawab tanpa melihat, lalu periksa.

1. Apa yang dikembalikan `jadwal.get("Kamis", [])` pada jadwal di atas?
2. Telusuri masukan `Rabu`: cabang mana yang berjalan dan apa keluarannya?
3. Mengapa isi sementara diganti satu per satu?

Daftar periksa (kosong; kamu isi sendiri, tidak dikumpulkan):

- [ ] Produk timku berjalan untuk tiga kasus uji awal.
- [ ] Hasil tiap kasus kucatat.
- [ ] Jadwal produk hanya memuat nama samaran.

Kunci: (1) daftar kosong `[]`; (2) `len` dua, cabang `else`, `Piket Rabu: Murid-04, Murid-05`; (3) agar bila ada kesalahan, asalnya jelas.

## Langkah berikutnya

`SMP9-2-M5`, "Pengujian dengan pengguna". Seorang calon pengguna mencoba produkmu dan kamu mencatat apa yang terjadi, lalu menyusun daftar perbaikan.

## Catatan untuk guru

- **Waktu:** 2 JP x 40 menit `[asumsi]` (silabus bagian 2). Kerja tim boleh; bukan jaminan efek belajar.
- **Alat:** editor Python 3 sekolah; tim Scratch memakai padanan blok. Penulis menjalankan program dengan `python3 -I` (Python 3.12.3), masukan lewat pipa; bila diketik langsung, tampilan `Hari? ` dan masukan berada di baris yang sama dengan jawaban, sedangkan keluaran sama dengan yang tertulis. Padanan Scratch tidak dijalankan penulis; guru memeriksanya sebelum kelas. Perilaku `get`, `len`, dan `input` dicocokkan dengan dokumentasi resmi Python.
- **Butir CP:** corpus memetakan minggu ini ke `DK-BK-b`. Modul tidak menyatakan CP "terpenuhi"; produk yang berjalan dinilai guru dengan rubriknya sendiri.
- **Keluaran minggu:** produk berjalan.
- **Kunci "Prediksi dulu":** `Selasa` menampilkan `Piket Selasa: Murid-03`; `Kamis` menampilkan `Tidak ada jadwal untuk Kamis`; `senin` menampilkan `Tidak ada jadwal untuk senin` karena kunci kamus peka huruf besar dan kecil.
- **Kunci "Contoh setengah jadi":** `jadwal.get(hari, [])` dan `len(petugas) == 0`.
- **Kunci latihan:** (1) `Piket Rabu: Murid-04, Murid-05`. (2) contoh: `"Kamis": ["Murid-06", "Murid-07"]`; tercetak `Piket Kamis: Murid-06, Murid-07`. (3) tiga kasus berjalan; catatan memuat masukan dan hasil. (4) `get` memberi nilai cadangan, `jadwal[hari]` berhenti dengan `KeyError`.
- **Kunci "Latihan bercampur":** (1) `Senin`, `Selasa`, `Rabu`, satu per baris. (2) keduanya teks, jadi `+` menyambung, bukan menjumlah.
- **Petunjuk bertahap:** (a) ganti satu isi sementara; (b) jalankan dan cocokkan dengan rancangan; (c) lanjut ke bagian berikutnya; (d) jalankan tiga kasus uji.
- **AI:** tanpa AI oleh murid. Kebijakan `smp-coding` (silabus bagian 7.1): AI generatif hanya demonstrasi guru, tanpa akun murid; murid tidak meminta AI melengkapi kode; asesmen tanpa AI.
- **Privasi:** data jadwal rekaan dengan nama samaran; tim tidak memakai nama teman nyata, nama sekolah, atau foto.
- **Unsur pembelajaran:** ingat kembali dan jarak (`K`), produk berjalan menggantikan contoh terselesaikan (`M`), PRIMM (`K` usia 11 sampai 14), penelusuran (`K`), contoh setengah jadi (`M`), latihan bercampur (`K`).
