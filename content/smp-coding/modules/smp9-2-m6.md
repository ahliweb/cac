## Untuk siapa modul ini

Modul ini untuk murid kelas 9 pada minggu keenam semester kedua, tahap menyempurnakan produk proyek akhir. Kamu bekerja dalam tim kecil dengan editor Python (atau Scratch bila timmu memilihnya), produk minggu lalu, dan daftar perbaikanmu. Waktunya satu pertemuan, 2 JP, dan hasilnya versi akhir produk beserta catatan penyebab tiap perbaikan. Prasyaratnya `SMP9-2-M5` (catatan uji dan daftar perbaikan). Semua contoh di modul ini rekaan.

## Ingat kembali

Tutup modul ini dan jawab dari ingatan.

1. Tulis satu catatan penyebab: gejala, penyebab, perbaikan, aturan umum. (`SMP9-1-M13`)
2. Sebut dua cara memilih perbaikan mana yang dikerjakan dulu. (`SMP9-2-M5`)
3. Jelaskan beda `jadwal.get(hari, [])` dan `jadwal[hari]` untuk hari yang tidak ada. (`SMP9-2-M4`)
4. Jelaskan mengapa kerangka dijalankan sebelum semua bagian diisi. (`SMP9-2-M3`)

Kunci: (1) gejala: apa yang tampak salah; penyebab: baris atau aturan yang membuatnya; perbaikan: apa yang diubah; aturan umum: yang berlaku untuk kasus serupa; (2) dampak bagi pengguna tinggi dengan usaha kecil lebih dulu, yang besar dan berdampak rendah ditunda; (3) `get` memberi daftar kosong, sedangkan `jadwal[hari]` berhenti dengan `KeyError`; (4) kesalahan antarbagian cepat ketahuan dan asalnya jelas.

## Tujuan

Setelah modul ini kamu dapat:

1. mengerjakan perbaikan satu per satu sesuai urutan daftar perbaikan;
2. menulis catatan penyebab untuk tiap perbaikan;
3. menjalankan ulang semua kasus uji sesudah tiap perubahan;
4. menyebut satu hal yang sengaja ditunda dan alasannya.

## Prediksi dulu

Daftar perbaikan minggu lalu dikerjakan: masukan dirapikan dengan fungsi baru `rapikan`, dan masukan kosong mendapat pesan sendiri.

```python
def baca_jadwal():
    return {
        "Senin": ["Murid-01", "Murid-02"],
        "Selasa": ["Murid-03"],
        "Rabu": ["Murid-04", "Murid-05"],
    }


def rapikan(teks):
    return teks.strip().capitalize()


def cari_petugas(jadwal, hari):
    return jadwal.get(rapikan(hari), [])


def cetak_hasil(hari, petugas):
    if rapikan(hari) == "":
        print("Hari belum diisi")
    elif len(petugas) == 0:
        print("Tidak ada jadwal untuk", rapikan(hari))
    else:
        print("Piket", rapikan(hari) + ":", ", ".join(petugas))


jadwal = baca_jadwal()
hari = input("Hari? ")
cetak_hasil(hari, cari_petugas(jadwal, hari))
```

`strip()` membuang spasi di ujung teks; `capitalize()` membuat huruf pertama besar dan sisanya kecil.

**Prediksi.** Apa yang tercetak untuk masukan `  RABU ` (dengan spasi di ujung)? Untuk masukan kosong? Untuk `Kamis`? Tulis dulu, lalu telusuri `rapikan(hari)` pada tiap masukan.

## Contoh terselesaikan

Karena ini minggu penyempurnaan, contohnya berupa **contoh perbaikan dan catatan penyebab**. Hasil kelima masukan, sebelum dan sesudah:

| Masukan | Sebelum (`SMP9-2-M4`) | Sesudah |
| --- | --- | --- |
| `Selasa` | `Piket Selasa: Murid-03` | `Piket Selasa: Murid-03` |
| `senin` | `Tidak ada jadwal untuk senin` | `Piket Senin: Murid-01, Murid-02` |
| `  RABU ` | `Tidak ada jadwal untuk   RABU ` | `Piket Rabu: Murid-04, Murid-05` |
| (kosong) | `Tidak ada jadwal untuk ` | `Hari belum diisi` |
| `Kamis` | `Tidak ada jadwal untuk Kamis` | `Tidak ada jadwal untuk Kamis` |

Penelusuran `  RABU `: `strip()` memberi `RABU`, lalu `capitalize()` memberi `Rabu`, yang ada di jadwal. Kasus `Selasa` dan `Kamis` tidak berubah; menjalankannya lagi membuktikan perbaikan tidak merusak yang sudah benar. Catatan penyebab:

| Bagian | Isi |
| --- | --- |
| Gejala | `senin` dan masukan dengan spasi dianggap hari yang tidak ada. |
| Penyebab | Kunci kamus peka huruf besar dan kecil, dan spasi di ujung ikut dibandingkan. |
| Perbaikan | Fungsi `rapikan` dipanggil sebelum mencari di jadwal. |
| Aturan umum | Rapikan masukan pengguna di satu fungsi sebelum membandingkannya dengan data. |

## Contoh setengah jadi

Tulis `rapikan` untuk produk timmu (contoh ini memakai jadwal piket).

```python setengah-jadi
def rapikan(teks):
    return teks.____().____()
```

Lalu isi catatan penyebab untuk satu temuan dari daftar perbaikanmu.

| Bagian | Isi timmu |
| --- | --- |
| Gejala | ____ |
| Penyebab | ____ |
| Perbaikan | ____ |
| Aturan umum | ____ |

## Susun urutannya

Dilewati: minggu penyempurnaan memakai produk timmu sendiri, bukan satu program berurutan.

## Latihan

1. **Jalankan.** Jalankan produk dengan masukan `kamis` dan `  SENIN `. Apa yang tercetak untuk masing-masing?
2. **Ubah.** Tambahkan hari `Kamis` dengan satu petugas samaran, lalu jalankan lagi dengan masukan `kamis`.
3. **Perbaiki.** Kerjakan satu temuan dari daftar perbaikan timmu, tulis catatan penyebabnya, lalu jalankan ulang semua kasus uji.
4. **Jelaskan.** Sebut satu temuan yang sengaja kamu tunda dan alasannya.

## Latihan bercampur

1. Apa hasil `"kamis".capitalize()`? (`SMP9-1-M2`)
2. `total = 0`, lalu `for n in [3, 5, 7]:` berisi `total = total + n`. Berapa `total` di akhir? (`SMP8-2-M5`)

## Ulang berjarak

Kerjakan ulang tanpa melihat modul ini, lalu cocokkan:

- **Minggu depan** (`SMP9-2-M7`): tulis catatan penyebab: gejala, penyebab, perbaikan, aturan umum.
- **Beberapa minggu lagi** (`SMP9-2-M12`): sebut satu perbaikan yang kamu buat sesudah pengguna menguji, untuk kamu ceritakan di pameran.
- **Akhir semester** (`SMP9-2-M14`): rapikan masukan teks: tulis fungsi yang membuang spasi di ujung dan menyeragamkan huruf besar.

## Kesalahan umum

- **Mengubah banyak hal sekaligus.** Kenali: hasil berubah dan tidak jelas perubahan mana penyebabnya.
- **Tidak menjalankan ulang kasus lama.** Kenali: perbaikan baru merusak yang sebelumnya benar.
- **Menulis perbaikan tanpa penyebab.** Kenali: catatan hanya "sudah dibetulkan".
- **Menambah fitur baru di minggu penyempurnaan.** Kenali: daftar perbaikan bertambah panjang dan tidak selesai.
- **Memakai nama teman nyata untuk mencoba masukan.** Kenali: kasus uji memuat nama asli.

## Cek mandiri

Tutup modul, jawab tanpa melihat, lalu periksa.

1. Tulis hasil `"  RABU ".strip().capitalize()`.
2. Mengapa semua kasus uji dijalankan ulang sesudah tiap perbaikan?
3. Tulis aturan umum dari perbaikan `rapikan`.

Daftar periksa (kosong; kamu isi sendiri, tidak dikumpulkan):

- [ ] Tiap perbaikan timku punya catatan penyebab.
- [ ] Semua kasus uji kujalankan ulang sesudah perbaikan.
- [ ] Aku menulis satu temuan yang kutunda beserta alasannya.

Kunci: (1) `Rabu`; (2) agar perbaikan baru tidak merusak yang sebelumnya benar; (3) rapikan masukan pengguna di satu fungsi sebelum membandingkannya dengan data.

## Langkah berikutnya

`SMP9-2-M7`, "Laporan dan presentasi". Kamu menyusun laporan dan presentasi singkat tentang persoalan, rancangan, produk, uji, dan perbaikan timmu.

## Catatan untuk guru

- **Waktu:** 2 JP x 40 menit `[asumsi]` (silabus bagian 2). Kerja tim boleh; bukan jaminan efek belajar.
- **Alat:** editor Python 3 sekolah; tim Scratch memakai padanan blok. Penulis menjalankan program dengan `python3 -I` (Python 3.12.3), masukan lewat pipa, untuk masukan `Selasa`, `senin`, `Kamis`, kosong, dan `  RABU `; bila diketik langsung, tampilan `Hari? ` dan masukan berada di baris yang sama dengan jawaban. Keluaran pada tabel sama dengan hasil jalan. Padanan Scratch tidak dijalankan penulis; guru memeriksanya sebelum kelas. Perilaku `strip` dan `capitalize` dicocokkan dengan dokumentasi resmi Python.
- **Butir CP:** corpus memetakan minggu ini ke `DK-BK-b`. Modul tidak menyatakan CP "terpenuhi"; versi akhir dinilai guru dengan rubriknya sendiri.
- **Keluaran minggu:** versi akhir produk.
- **Kunci "Prediksi dulu":** `  RABU ` menghasilkan `Piket Rabu: Murid-04, Murid-05`; masukan kosong menghasilkan `Hari belum diisi`; `Kamis` menghasilkan `Tidak ada jadwal untuk Kamis`.
- **Kunci "Contoh setengah jadi":** `teks.strip().capitalize()`; catatan penyebab bebas, periksa keempat bagian terisi.
- **Kunci latihan:** (1) `kamis`: `Tidak ada jadwal untuk Kamis`; `  SENIN `: `Piket Senin: Murid-01, Murid-02`. (2) contoh `"Kamis": ["Murid-06"]`; `kamis` menghasilkan `Piket Kamis: Murid-06`. (3) satu perbaikan, catatan empat bagian, semua kasus uji dijalankan ulang. (4) alasan penundaan masuk akal, misalnya usaha besar dan dampak rendah.
- **Kunci "Latihan bercampur":** (1) `Kamis`. (2) 15.
- **Petunjuk bertahap:** (a) pilih satu temuan teratas; (b) tulis penyebabnya dulu; (c) ubah satu hal; (d) jalankan ulang semua kasus uji.
- **AI:** tanpa AI oleh murid. Kebijakan `smp-coding` (silabus bagian 7.1): AI generatif hanya demonstrasi guru, tanpa akun murid; murid tidak meminta AI memperbaiki kode atau menulis catatan penyebab; asesmen tanpa AI.
- **Privasi:** data jadwal rekaan dengan nama samaran; tim tidak memakai nama teman nyata, nama sekolah, atau foto.
- **Unsur pembelajaran:** ingat kembali dan jarak (`K`), perbaikan dan catatan penyebab menggantikan contoh terselesaikan (`M`), PRIMM (`K` usia 11 sampai 14), penelusuran (`K`), contoh setengah jadi (`M`), latihan bercampur (`K`).
