## Untuk siapa modul ini

Modul ini untuk jalur **profesional** (`PRO`), 10 jam, sesudah `DW-PRO-M1`. Alatnya Python 3 (penulis memakai 3.12.3, dijalankan dengan `python3`), terminal, Git, dan penyunting teks. Estimasi lima sesi `[asumsi]`.

Data **sintetis**: katalog toko alat tulis rekaan dengan harga fiktif. Jangan memasukkan data nyata ke latihan.

**Jembatan (silabus bagian 6.1 dan 6.2, `[asumsi]`).** `DW-PKJ-M3` sampai `M5` menggantikan sebagian modul ini; `DW-PRS-M2` dan `M3` setara sebagian modul ini dengan tugas dilengkapi. Bagi lulusan kuliah: profil `U-lengkap` berstatus **lewati** (L), `I-lengkap` dan `I-awal` berstatus **padatkan** (P). Pengakuan atas dasar bukti yang diperiksa, bukan alih kredit dan bukan nilai kuliah. Cek awal membantu Anda memutuskan.

## Cek awal pengalaman

Jawab tanpa melihat apa pun, lalu cocokkan dengan kunci. Skor tidak dicatat.

1. Apa yang dicetak `print(10 % 3, 10 // 3, 2 ** 5)`?
2. Apa beda `=` dan `==` di Python?
3. Berapa kali badan perulangan `for i in range(3, 10, 2)` berjalan?
4. Apa yang dikembalikan fungsi yang tidak punya `return`?
5. Mengapa sebuah fungsi sebaiknya mengerjakan satu hal saja?

Bila kelimanya benar, Anda boleh melewati "Contoh terselesaikan" dan "Contoh setengah jadi" dan langsung ke "Latihan".

## Ingat kembali

Tanpa melihat modul sebelumnya, tulis jawaban singkat.

1. (`DW-PRO-M1`) Tulis urutan perintah Git dari berkas berubah sampai tercatat di riwayat, dan apa yang ditunjukkan `git status --short`.
2. (`DW-PRS-M6`) Tulis dari ingatan kartu proyek enam baris untuk satu masalah pribadi. Bila belum menempuh `PRS`, sebutkan enam barisnya.
3. (`DW-FND-M1`) Sebutkan tiga aturan tentang kredensial.

Cocokkan: (1) `git add`, `git commit`, dan `git status --short` menunjukkan berkas berubah atau belum dilacak (`??`); (2) masalah, masukan, keluaran, batas, kasus uji, langkah; (3) tidak di berkas kode, tidak di permintaan AI, tidak di-commit atau tampil di tangkapan layar.

## Tujuan

Setelah modul ini Anda dapat memakai variabel, kondisi, perulangan, dan subrutin (fungsi), dan memecah masalah menjadi bagian-bagian kecil.

## Prediksi dulu

Toko memberi diskon bertingkat: 10 persen untuk subtotal sejak 100.000 dan 5 persen sejak 50.000. Sebelum membaca kodenya, tulis prediksi Anda:

1. Berapa persen diskon untuk subtotal 49.999, 50.000, dan 100.000?
2. Keranjang: 10 pensil (3.000), 6 buku tulis (8.500), dan 3 spidol (12.000). Berapa subtotal, diskon, dan total?

## Contoh terselesaikan

### Memecah masalah

Tulis kartu proyek enam baris dulu, seperti di `DW-PRS-M6`:

```text
Masalah   : menghitung struk belanja dengan diskon bertingkat.
Masukan   : daftar (nama barang, jumlah).
Keluaran  : subtotal, diskon, total dalam rupiah bulat.
Batas     : barang harus ada di katalog; jumlah lebih dari nol.
Kasus uji : keranjang kosong, batas 49.999 dan 50.000, barang tak dikenal.
Langkah   : harga satu baris; persen diskon; hitung total; cetak; uji.
```

Baris "Langkah" langsung menjadi fungsi: tiap fungsi mengerjakan satu hal, bisa diuji sendiri, dan namanya menjelaskan tugasnya.

### Programnya

```python
KATALOG = {"pensil": 3000, "buku tulis": 8500, "penghapus": 2500, "spidol": 12000}


def harga_baris(nama, jumlah):
    """Harga satu baris belanja: harga satuan dikali jumlah."""
    if nama not in KATALOG:
        raise ValueError(f"barang tidak ada di katalog: {nama}")
    if jumlah <= 0:
        raise ValueError(f"jumlah harus lebih dari nol: {jumlah}")
    return KATALOG[nama] * jumlah


def diskon_persen(subtotal):
    """Diskon bertingkat: 10 persen sejak 100000, 5 persen sejak 50000."""
    if subtotal >= 100000:
        return 10
    elif subtotal >= 50000:
        return 5
    return 0


def hitung(keranjang):
    """Mengembalikan (subtotal, diskon, total) dalam rupiah bulat."""
    subtotal = 0
    for nama, jumlah in keranjang:
        subtotal += harga_baris(nama, jumlah)
    diskon = subtotal * diskon_persen(subtotal) // 100
    return subtotal, diskon, subtotal - diskon


def cetak_struk(keranjang):
    for nama, jumlah in keranjang:
        print(f"{nama:<12}{jumlah:>3} x {KATALOG[nama]:>6} = {harga_baris(nama, jumlah):>7}")
    subtotal, diskon, total = hitung(keranjang)
    print(f"{'subtotal':<24}{subtotal:>7}")
    print(f"{'diskon':<24}{diskon:>7}")
    print(f"{'total':<24}{total:>7}")


def uji():
    assert diskon_persen(0) == 0
    assert diskon_persen(49999) == 0
    assert diskon_persen(50000) == 5
    assert diskon_persen(99999) == 5
    assert diskon_persen(100000) == 10
    assert hitung([]) == (0, 0, 0)
    assert hitung([("pensil", 1)]) == (3000, 0, 3000)
    try:
        harga_baris("payung", 1)
    except ValueError:
        pass
    else:
        raise AssertionError("barang tak dikenal harus ditolak")
    print("semua uji lolos")


if __name__ == "__main__":
    uji()
    cetak_struk([("pensil", 10), ("buku tulis", 6), ("spidol", 3)])
```

Keluarannya (`python3 struk.py`, Python 3.12.3):

```text
semua uji lolos
pensil       10 x   3000 =   30000
buku tulis    6 x   8500 =   51000
spidol        3 x  12000 =   36000
subtotal                 117000
diskon                    11700
total                    105300
```

Perhatikan empat hal. **Variabel**: `subtotal` menampung hasil sementara. **Kondisi**: `diskon_persen` memeriksa dari ambang tertinggi ke terendah, jadi urutan `if` penting. **Perulangan**: `for` menjumlah tiap baris. **Subrutin**: lima fungsi, dan `hitung` mengembalikan nilai, bukan mencetak, sehingga bisa diuji. Pembagian `//` membuang pecahan: `1234 * 5 // 100` memberi 61, bukan 61,7. Penelusuran dengan tabel (nilai `subtotal` setelah tiap putaran):

| Putaran | Barang | Harga baris | `subtotal` |
| --- | --- | --- | --- |
| 1 | pensil x 10 | 30.000 | 30.000 |
| 2 | buku tulis x 6 | 51.000 | 81.000 |
| 3 | spidol x 3 | 36.000 | 117.000 |

Sesudah itu `diskon_persen(117000)` memberi 10, diskon `117000 * 10 // 100 = 11700`, total 105.300. Di terminal, `python3 struk.py` menjalankan seluruh berkas, sedangkan `python3 -c "..."` menjalankan satu perintah; bagian `if __name__ == "__main__":` berjalan hanya bila berkas dijalankan langsung, bukan saat di-`import`. Dokumentasi: [kendali alur](https://docs.python.org/3/tutorial/controlflow.html).

## Contoh setengah jadi

Lengkapi aturan ongkos kirim rekaan: gratis bila subtotal sejak 75.000, selain itu 10.000.

```python setengah-jadi
def ongkos_kirim(subtotal):
    if subtotal >= ___:
        return 0
    return ___
```

Prediksi dulu: berapa hasil `ongkos_kirim(74999)` dan `ongkos_kirim(75000)`? Lalu tulis dua kasus uji untuk batas itu.

## Latihan

1. **Ubah.** Tambahkan tingkat 15 persen sejak 200.000 ke `diskon_persen`. Prediksi dulu hasil `diskon_persen(200000)`, lalu jalankan `uji()`.
2. **Buat.** Tulis `rata_rata_belanja(daftar_total)` yang mengembalikan `None` untuk daftar kosong. Tulis empat kasus uji sebelum fungsinya.
3. **Jelaskan.** Mengapa `harga_baris` memunculkan galat untuk barang tak dikenal dan bukan mengembalikan 0?
4. **Buat.** Tulis kartu proyek enam baris untuk program kecil Anda sendiri (misalnya denda keterlambatan buku), pecah menjadi fungsi, tulis uji, dan simpan dengan Git.
5. **Berpasangan (opsional).** Tukar kartu proyek dengan rekan; masing-masing mengusulkan satu kasus uji yang belum terpikir. Peserta mandiri boleh menambah satu kasus tepi sendiri.

## Latihan bercampur

1. (`DW-PRO-M1`) Anda menyimpan `struk.py` ke repositori. Berkas apa yang masuk `.gitignore`, dan seperti apa satu pesan commit yang baik?
2. (`DW-FND-M1`) Rekan meminta kunci API toko ditulis langsung di `struk.py` agar mudah. Apa jawaban Anda, dan di mana nilai itu disimpan?

## Keluaran portofolio

**Program terstruktur dalam repositori Git.** Berkas Python dengan kartu proyek enam baris, sedikitnya empat fungsi, fungsi `uji()` yang lolos, tabel penelusuran satu kasus, dan sedikitnya tiga commit bermakna. Data sintetis; tanpa kredensial.

## Ulang berjarak

Tanpa melihat modul ini, kerjakan ulang dan cocokkan. Pertanyaan ini akan muncul lagi di "Ingat kembali" modul berikutnya.

| Kapan | Pertanyaan |
| --- | --- |
| Satu minggu lagi (modul berikutnya) | Mengapa fungsi mengembalikan nilai alih-alih mencetaknya, dan bagaimana Anda menguji batas `>=`? |
| Tiga modul lagi | Tulis dari ingatan fungsi `diskon_persen` dengan dua ambang dan tiga kasus uji batas. |
| Akhir jalur | Pecah satu masalah baru menjadi kartu enam baris dan daftar fungsi. |

## Kebijakan AI

Modul ini tidak memakai asisten AI. Pemakaian AI untuk menulis kode di jalur `PRO` baru diajarkan sesudah `DW-PRO-M5`; kebijakan lengkap ada di `DW-FND-M1` dan `DW-PRO-M13` (silabus bagian 9.1).

## Kesalahan umum

- **Urutan `if` terbalik.** Memeriksa ambang terendah dulu membuat tingkat atas tidak pernah tercapai.
- **`=` dan `==` tertukar.** Penugasan bukan perbandingan.
- **Fungsi yang mencetak, bukan mengembalikan.** Hasilnya tidak bisa diuji.
- **Menguji hanya kasus mudah.** Uji batas (49.999 dan 50.000) dan kasus kosong.
- **Memakai `/` pada uang.** Pecahan bisa menyisakan koma; pilih `//` atau pembulatan yang disengaja.

## Cek mandiri

Tutup modul dan jawab:

1. Beda variabel, kondisi, perulangan, dan fungsi, masing-masing satu contoh.
2. Cara memecah masalah dengan kartu enam baris.
3. Mengapa ambang diuji di kedua sisi batas.

Daftar periksa (kosong; Anda isi sendiri, tidak dikumpulkan):

- [ ] Setiap fungsi saya mengerjakan satu hal dan bernama jelas.
- [ ] Saya menguji kasus kosong dan kasus batas.
- [ ] Program saya tidak memuat kredensial.
- [ ] Perubahan tercatat di Git dengan pesan bermakna.

## Kunci dan petunjuk

- **Cek awal:** (1) `1 3 32`; (2) `=` menugaskan nilai, `==` membandingkan; (3) 4 kali (3, 5, 7, 9); (4) `None`; (5) mudah diuji, diubah, dan dipahami.
- **Prediksi:** (1) 0, 5, dan 10; (2) subtotal 117.000, diskon 11.700, total 105.300.
- **Setengah jadi:** `75000` dan `10000`; `ongkos_kirim(74999)` memberi `10000` dan `ongkos_kirim(75000)` memberi `0`; kasus uji batas: `assert ongkos_kirim(74999) == 10000` dan `assert ongkos_kirim(75000) == 0`.
- **Latihan 1:** `15`.
- **Latihan 2:** `[]` memberi `None`; `[100]` memberi `100.0`; `[100, 200]` memberi `150.0`; `[0, 0]` memberi `0.0`.
- **Latihan 3:** barang tak dikenal adalah kesalahan masukan; mengembalikan 0 menyembunyikannya dan menghasilkan struk yang tampak benar tetapi keliru.
- **Latihan bercampur 1:** `__pycache__/` (dan `.env` bila ada); contoh pesan: "Tambah uji batas diskon".
- **Latihan bercampur 2:** tolak; nilai disimpan di lingkungan atau berkas `.env` yang tidak di-commit.
- **Petunjuk bila macet:** telusuri dengan tabel nilai variabel per putaran sebelum menjalankan.

## Langkah berikutnya

`DW-PRO-M3`: Anda sudah menulis program terstruktur; berikutnya Anda memakai daftar, kamus, dan algoritma dasar untuk data yang lebih besar.

## Catatan untuk pendamping

- **Waktu:** 10 jam, lima sesi dua jam. **Bahan:** Python 3, terminal, Git, penyunting teks.
- **Pemetaan SKKNI (hanya judul unit, silabus 5.2, bukan klaim kompetensi):** Menerapkan Pemecahan Permasalahan Menjadi Subrutin (`J.620100.013.01`); Mengimplementasikan Pemrograman Terstruktur (`J.620100.017.02`); Menerapkan Perintah Eksekusi Bahasa Pemrograman Berbasis Teks, Grafik, dan Multimedia (`J.620100.010.01`). Menyelesaikan modul tidak berarti peserta kompeten menurut unit itu; salinan daftar unit belum terverifikasi terhadap berkas resmi.
- **Jembatan kuliah (silabus 6.2):** L untuk `U-lengkap`, P untuk `I-lengkap` dan `I-awal`; bukti berupa keluaran portofolio kuliah dan tugas praktik singkat tanpa AI, bukan nilai; jam perkiraan `[asumsi]`. Data dan status peserta tidak disimpan di repositori.
- **Verifikasi penulis:** program dijalankan dengan `python3` (Python 3.12.3) dan keluarannya sama dengan yang tertulis; kasus pada cek awal, prediksi, dan setengah jadi dijalankan terpisah.
- **Tanda siap lanjut:** peserta menjelaskan urutan `if` pada `diskon_persen` dan menguji kedua sisi batas.
