## Untuk siapa modul ini

Modul ini untuk jalur **personal** (`PRS`), 5 jam, sesudah `DW-PRS-M2`. Alatnya sama: Python 3 (penulis memakai 3.12.3), penyunting teks, dan terminal. Estimasi dua sesi `[asumsi]`.

Daftar bacaan di modul ini **rekaan** ("Buku Contoh A"). Jalankan program di folder latihan yang Anda buat sendiri. Jangan menyimpan kata sandi, nomor, atau catatan pribadi nyata di berkas latihan; berkas teks biasa mudah terbaca siapa saja yang membuka komputer Anda.

## Cek awal pengalaman

Jawab tanpa melihat apa pun, lalu cocokkan dengan kunci. Skor tidak dicatat.

1. Bila `buku = ["A", "B", "C"]`, apa hasil `buku[0]` dan `buku[-1]`?
2. Apa hasil `{"a": 1}.get("b", 0)`?
3. Apa beda membuka berkas dengan mode `"w"` dan `"a"`?
4. Mengapa berkas dibuka dengan `with open(...)`?
5. Apa hasil `"  halo \n".strip()`?

Bila kelimanya benar, Anda boleh melewati "Contoh terselesaikan" dan "Contoh setengah jadi" dan langsung ke "Latihan".

## Ingat kembali

Tanpa melihat modul sebelumnya, tulis jawaban singkat.

1. (`DW-PRS-M2`) Mengapa `input()` perlu dibungkus `int(...)` sebelum dihitung, dan apa yang terjadi bila lupa?
2. (`DW-PRS-M1`) Apa ciri langkah yang tegas, dan apa contoh langkah yang samar?
3. (`DW-FND-M1`) Mengapa keluaran asisten AI diperlakukan sebagai draf?

Cocokkan: (1) `input()` memberi teks, sehingga `"3" + 1` menjadi `TypeError`; (2) orang lain dapat menjalankannya tanpa menebak, misalnya "kurangi sisa dengan pengeluaran hari itu", sedangkan "urus tagihan" samar; (3) AI bisa keliru atau mengarang walau terdengar yakin, jadi hasilnya dijalankan dan diperiksa.

## Tujuan

Setelah modul ini Anda menguasai daftar, kamus, serta membaca dan menulis berkas teks.

## Prediksi dulu

Berkas `daftar_bacaan.txt` berisi dua baris `Buku Contoh A|dibaca` dan `Buku Contoh B|belum`. Program di bawah (lihat "Contoh terselesaikan") membaca berkas itu, menambah satu buku, menandai Buku Contoh B sebagai `dibaca`, lalu menyimpan. Sebelum membaca jawabannya: bila program dijalankan **dua kali berturut-turut**, apa isi daftar sesudah putaran kedua?

## Contoh terselesaikan

### Daftar dan kamus

**Daftar** menyimpan banyak nilai berurutan (indeks mulai dari 0; `-1` berarti yang terakhir). **Kamus** menyimpan pasangan kunci dan isi.

```python
buku = ["Buku Contoh A", "Buku Contoh B"]
buku.append("Buku Contoh C")
print(len(buku), buku[0], buku[-1])
for judul in buku:
    print("-", judul)

catatan = {"judul": "Buku Contoh A", "halaman": 120, "status": "dibaca"}
print(catatan["judul"], catatan["halaman"])
catatan["halaman"] = 125
catatan["nilai"] = 4
print(catatan)
print(catatan.get("penulis", "tidak ada"))
for kunci, isi in catatan.items():
    print(kunci, "=", isi)
```

Keluarannya (dijalankan dengan `python3 -I`, Python 3.12.3):

```text
3 Buku Contoh A Buku Contoh C
- Buku Contoh A
- Buku Contoh B
- Buku Contoh C
Buku Contoh A 120
{'judul': 'Buku Contoh A', 'halaman': 125, 'status': 'dibaca', 'nilai': 4}
tidak ada
judul = Buku Contoh A
halaman = 125
status = dibaca
nilai = 4
```

`catatan["penulis"]` akan galat (`KeyError`) karena kuncinya tidak ada, sedangkan `catatan.get("penulis", "tidak ada")` memberi nilai cadangan.

### Membaca dan menulis berkas teks: pencatat daftar bacaan

Satu baris berkas berisi satu entri, `judul|status`. Program mengubah baris menjadi kamus, mengubah daftar di memori, lalu menulis semuanya kembali. Simpan sebagai `bacaan.py`:

```python
NAMA_BERKAS = "daftar_bacaan.txt"


def muat(nama_berkas):
    """Baca berkas menjadi daftar kamus; berkas yang belum ada dianggap kosong."""
    hasil = []
    try:
        with open(nama_berkas, encoding="utf-8") as berkas:
            for baris in berkas:
                baris = baris.strip()
                if baris == "":
                    continue
                judul, status = baris.split("|")
                hasil.append({"judul": judul, "status": status})
    except FileNotFoundError:
        pass
    return hasil


def simpan(nama_berkas, daftar):
    with open(nama_berkas, "w", encoding="utf-8") as berkas:
        for entri in daftar:
            berkas.write(entri["judul"] + "|" + entri["status"] + "\n")


daftar = muat(NAMA_BERKAS)
print("Terbaca:", len(daftar), "entri")

daftar.append({"judul": "Buku Contoh C", "status": "belum"})
for entri in daftar:
    if entri["judul"] == "Buku Contoh B":
        entri["status"] = "dibaca"
simpan(NAMA_BERKAS, daftar)

for entri in muat(NAMA_BERKAS):
    print(entri["status"], "-", entri["judul"])
```

Siapkan `daftar_bacaan.txt` di folder yang sama dengan isi dua baris di atas (`Buku Contoh A|dibaca` dan `Buku Contoh B|belum`), lalu jalankan `python3 bacaan.py`. Putaran pertama:

```text
Terbaca: 2 entri
dibaca - Buku Contoh A
dibaca - Buku Contoh B
belum - Buku Contoh C
```

Isi berkas sesudahnya adalah tiga baris. Putaran kedua (dijalankan penulis):

```text
Terbaca: 3 entri
dibaca - Buku Contoh A
dibaca - Buku Contoh B
belum - Buku Contoh C
belum - Buku Contoh C
```

**Jawaban prediksi:** sesudah putaran kedua daftar memuat **Buku Contoh C dua kali**, sebab program selalu menambah tanpa memeriksa apakah judul sudah ada. Program yang menulis berkas perlu dipikirkan: apa yang terjadi bila dijalankan lagi?

Beberapa hal penting:

- Fungsi `muat` dan `simpan` memisahkan urusan: membaca, menulis, dan logika daftar tidak bercampur.
- Mode `"w"` **mengosongkan** berkas lebih dulu, lalu menulis; mode `"a"` menambahkan di akhir tanpa menghapus isi lama. Membuka berkas penting dengan `"w"` tanpa sengaja menghapus isinya (penulis mencobanya: berkas berisi `isi lama` menjadi kosong, `''`).
- `with open(...)` menutup berkas otomatis walau ada galat. Sertakan `encoding="utf-8"` agar huruf non-Latin aman ([dokumentasi `open`](https://docs.python.org/3/library/functions.html)).
- Baris yang berisi `|` tambahan membuat `split("|")` galat: `ValueError: too many values to unpack (expected 2)` (dijalankan penulis). Format sederhana punya batas; format seperti CSV atau JSON (modul berikutnya dan jalur lanjut) mengatasinya.

## Contoh setengah jadi

Lengkapi empat titik `___` pada fungsi penghitung status:

```python setengah-jadi
def hitung_status(daftar, status):
    jumlah = 0
    for entri in daftar:
        if entri[___] == ___:
            jumlah ___ 1
    return jumlah
```

Prediksi dulu: dengan daftar tiga entri di atas (A dan B `dibaca`, C `belum`), berapa `hitung_status(daftar, "dibaca")`? Kerangka berlubang bukan program yang berjalan sampai Anda mengisinya.

## Latihan

1. **Ubah.** Ubah `bacaan.py` agar tidak menambah judul yang sudah ada. Prediksi dulu isi daftar sesudah putaran kedua dengan perubahan Anda.
2. **Buat.** Tulis fungsi `ada(daftar, judul)` yang mengembalikan `True` atau `False`, lalu pakai di latihan 1.
3. **Buat.** Cetak ringkasan di akhir, misalnya `2 dari 3 sudah dibaca`, memakai `hitung_status` dan `len`.
4. **Jelaskan.** Mengapa `muat` menangkap `FileNotFoundError`, dan apa yang terjadi pada putaran pertama bila berkas belum ada dan tangkapan itu dihapus?
5. **Berpasangan (opsional).** Tukar daftar bacaan rekaan dengan rekan; masing-masing mencoba menambah entri dengan judul yang mengandung tanda `|` dan mengamati hasilnya. Peserta mandiri boleh mencobanya sendiri.

## Latihan bercampur

1. (`DW-PRS-M2`) Ubah `bacaan.py` agar judul buku baru dibaca dari `input()` (satu baris), lalu ditambahkan bila belum ada. Prediksi dulu apa yang terjadi bila pengguna menekan Enter tanpa mengetik apa pun, dan perbaiki.
2. (`DW-PRS-M1`) Tulis algoritma lima langkah dalam bahasa sehari-hari untuk "menandai buku sebagai dibaca", lalu cocokkan satu per satu dengan baris program Anda.

## Keluaran portofolio

**Pencatat sederhana dengan data sintetis.** Satu program yang menyimpan daftar (mis. daftar bacaan, film, atau tanaman) ke berkas teks dan memuatnya kembali, dengan sedikitnya tiga entri rekaan, pemeriksaan agar entri tidak ganda, dan contoh isi berkas sebelum dan sesudah dijalankan. Tanpa data pribadi nyata.

## Ulang berjarak

Tanpa melihat modul ini, kerjakan ulang dan cocokkan. Pertanyaan ini akan muncul lagi di "Ingat kembali" modul berikutnya.

| Kapan | Pertanyaan |
| --- | --- |
| Satu minggu lagi (modul berikutnya) | Apa beda mode `"w"` dan `"a"`, dan mengapa program yang menulis berkas perlu aman dijalankan dua kali? |
| Tiga modul lagi | Tulis dari ingatan fungsi yang membaca berkas teks berbaris `judul|status` menjadi daftar kamus. |
| Akhir jalur | Apa beda daftar dan kamus, dan kapan Anda memilih masing-masing untuk data pribadi Anda? |

## Kebijakan AI

Modul ini tidak memakai asisten AI; kebijakan lengkap program ada di `DW-FND-M1` dan dipakai penuh pada `DW-PKJ-M6`, `DW-PRO-M13`, dan `DW-BIS-M7` (silabus bagian 9.1).

## Kesalahan umum

- **Membuka berkas dengan `"w"` padahal ingin menambah.** Isi lama hilang; pakai `"a"` bila hanya menambah.
- **Lupa `.strip()` saat membaca baris.** Tanda baris baru `\n` ikut terbaca dan merusak perbandingan.
- **Mengira berkas dibuat di folder program.** Python mencari dan membuat berkas di folder tempat Anda menjalankan terminal.
- **Menambah tanpa memeriksa.** Dijalankan dua kali, entri menjadi ganda.
- **Menyimpan hal sensitif di berkas teks biasa.** Kata sandi dan nomor pribadi tidak disimpan di berkas latihan.

## Cek mandiri

Tutup modul dan jawab:

1. Tulis dari ingatan fungsi `simpan(nama_berkas, daftar)` untuk daftar kamus berkunci `judul` dan `status`.
2. Kapan memakai daftar, dan kapan kamus?
3. Apa risiko membuka berkas dengan `"w"`?

Daftar periksa (kosong; Anda isi sendiri, tidak dikumpulkan):

- [ ] Program saya aman dijalankan dua kali.
- [ ] Saya mencoba berkas yang belum ada.
- [ ] Saya menulis prediksi sebelum menjalankan.
- [ ] Berkas latihan saya hanya berisi data rekaan.

## Kunci dan petunjuk

- **Cek awal:** (1) `"A"` dan `"C"`; (2) `0`; (3) `"w"` mengosongkan berkas lalu menulis, `"a"` menambahkan di akhir; (4) berkas ditutup otomatis, walau terjadi galat; (5) `"halo"`.
- **Prediksi:** Buku Contoh C muncul dua kali (lihat keluaran putaran kedua).
- **Setengah jadi:** `"status"`, `status`, dan `+=`; hasilnya `2`.
- **Latihan 1 dan 2:** fungsi `ada` mengulang daftar dan mengembalikan `True` bila judulnya sama; panggil `ada` sebelum `append`. Dengan perubahan ini putaran kedua tetap tiga entri.
- **Latihan 3:** `print(hitung_status(daftar, "dibaca"), "dari", len(daftar), "sudah dibaca")` mencetak `2 dari 3 sudah dibaca`.
- **Latihan 4:** tanpa tangkapan, putaran pertama berhenti dengan `FileNotFoundError` bila berkas belum ada.
- **Latihan bercampur 1:** tanpa pemeriksaan, Enter kosong menambah entri berjudul kosong; tolak judul kosong dengan `if judul.strip() == "":`.
- **Petunjuk bila macet:** cetak daftar setelah `muat` dan sebelum `simpan` untuk melihat isi di memori.

## Langkah berikutnya

`DW-PRS-M4`: sejauh ini hasil program Anda berupa teks di terminal. Berikutnya Anda membuat halaman web pertama dengan HTML dan CSS, yang bisa dibuka di peramban.

## Catatan untuk pendamping

- **Waktu:** 5 jam. **Bahan:** Python 3, penyunting teks, terminal. Semua program dijalankan penulis dengan `python3 -I` (Python 3.12.3) di folder bersih dan keluarannya cocok dengan yang tertulis, termasuk putaran kedua.
- **Tanda siap lanjut:** peserta menjelaskan beda `"w"` dan `"a"`, dan menunjukkan program yang aman dijalankan dua kali.
- **Privasi:** ingatkan agar berkas latihan tidak berisi catatan pribadi nyata.
