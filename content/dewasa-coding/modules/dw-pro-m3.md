## Untuk siapa modul ini

Modul ini untuk jalur **profesional** (`PRO`), 10 jam, sesudah `DW-PRO-M2`. Alatnya Python 3 (penulis memakai 3.12.3), penyunting teks, dan terminal; hanya pustaka bawaan. Estimasi lima sesi dua jam `[asumsi]`. Seluruh data adalah **barang rekaan** dengan nama contoh; tidak ada data nyata.

Peserta dari kuliah-coding dapat dinilai lewat jembatan (silabus 6.2), per modul, dengan bukti yang diperiksa pendaftaran: profil `I-lengkap` **lewati** (L), `I-awal` dan `U-lengkap` **padatkan** (P). Pemadatan berarti konsep dikenal, hanya bahasa atau alatnya yang berbeda. Jembatan ini bukan alih kredit dan bukan sertifikat.

## Cek awal pengalaman

Jawab tanpa melihat apa pun, lalu cocokkan dengan kunci. Skor tidak dicatat.

1. Apa beda daftar (`list`), himpunan (`set`), dan kamus (`dict`) dalam satu kalimat masing-masing?
2. Mengapa `kamus.get("x")` tidak menghentikan program bila `"x"` tidak ada, sedangkan `kamus["x"]` menghentikannya?
3. Apa syarat mutlak agar pencarian biner benar?
4. Berapa perbandingan terburuk pencarian linear pada 1000 data, dan pencarian biner (perkiraan)?
5. Apa arti "stabil" pada pengurutan?

Bila kelimanya benar, Anda boleh melewati "Contoh terselesaikan" dan "Contoh setengah jadi" dan langsung ke "Latihan".

## Ingat kembali

Tanpa melihat modul sebelumnya, tulis jawaban singkat.

1. (`DW-PRO-M2`) Apa beda kondisi dan pengulangan, dan mengapa pekerjaan yang berulang dipindahkan ke subrutin (fungsi)?
2. (`DW-PRO-M1`) Apa yang dicatat satu *commit* Git, dan mengapa berkas rahasia tidak boleh ikut?
3. (`DW-FND-M1`) Apa yang Anda lakukan sebelum menempel teks ke asisten AI?
4. (`DW-PRS-M5`, bila Anda mengambilnya) Tulis dari ingatan kerangka skrip yang menjumlahkan pengeluaran per kategori dengan kamus dan `.get`.

Cocokkan: (1) kondisi memilih cabang, pengulangan mengulang langkah; subrutin menghindari salinan kode dan memberi nama pada satu pekerjaan; (2) satu rekam perubahan dengan pesan; berkas rahasia yang pernah masuk riwayat tetap ada di riwayat; (3) menghapus atau mengganti data pribadi dan rahasia, atau tidak menempel; (4) `total = {}`, lalu dalam perulangan `total[k] = total.get(k, 0) + nilai`.

## Tujuan

Setelah modul ini Anda dapat memilih daftar, kamus, atau himpunan untuk suatu masalah; melakukan pencarian dan pengurutan; serta menyatakan dan membandingkan dua solusi dengan menghitung langkahnya.

## Prediksi dulu

Sebelum menjalankan apa pun, tulis hasil empat baris `print` ini.

```python
barang = ["B02", "B05", "B02", "B09"]
print(len(barang), len(set(barang)))
stok = {"B02": 0, "B05": 7}
print(stok.get("B09"), stok.get("B09", -1))
print(sorted(barang, reverse=True))
print("B05" in set(barang))
```

## Contoh terselesaikan

### Empat struktur dalam satu tabel inventaris

Daftar menjaga urutan dan membolehkan duplikat. Himpunan membuang duplikat dan cepat menjawab "ada atau tidak". Kamus menautkan kunci ke nilai dan cepat mencari lewat kunci. `sorted` mengurutkan menurut `key` dan **stabil**: dua barang yang sama nilainya tetap dalam urutan semula.

```python
barang = [
    {"kode": "B07", "nama": "Kabel contoh", "stok": 12},
    {"kode": "B02", "nama": "Baterai contoh", "stok": 0},
    {"kode": "B05", "nama": "Lampu contoh", "stok": 7},
    {"kode": "B02", "nama": "Baterai contoh", "stok": 0},
    {"kode": "B09", "nama": "Saklar contoh", "stok": 7},
]

print(len(barang), barang[0]["kode"], barang[-1]["kode"])

kode_unik = {b["kode"] for b in barang}
print(sorted(kode_unik), "B05" in kode_unik)

per_kode = {b["kode"]: b for b in barang}  # duplikat B02 menimpa yang lama
print(len(per_kode), per_kode.get("B05")["stok"], per_kode.get("B99"))

urut = sorted(per_kode.values(), key=lambda b: (-b["stok"], b["kode"]))
print([b["kode"] for b in urut])
```

Keluarannya (Python 3.12.3, `python3 -I`):

```text
5 B07 B09
['B02', 'B05', 'B07', 'B09'] True
4 7 None
['B07', 'B05', 'B09', 'B02']
```

### Membandingkan dua solusi dengan menghitung langkah

Pencarian linear memeriksa satu per satu. Pencarian biner membelah daftar **yang sudah berurutan** menjadi dua dan membuang separuh yang pasti salah. Kita membandingkan keduanya bukan dengan stopwatch, tetapi dengan menghitung perbandingan.

```python
def cari_linear(daftar, kode):
    langkah = 0
    for i, nilai in enumerate(daftar):
        langkah += 1
        if nilai == kode:
            return i, langkah
    return None, langkah


def cari_biner(urut, kode):
    kiri, kanan = 0, len(urut) - 1
    langkah = 0
    while kiri <= kanan:
        langkah += 1
        tengah = (kiri + kanan) // 2
        if urut[tengah] == kode:
            return tengah, langkah
        if urut[tengah] < kode:
            kiri = tengah + 1
        else:
            kanan = tengah - 1
    return None, langkah


def uji():
    kecil = ["B02", "B05", "B07", "B09"]
    assert cari_linear(kecil, "B07") == (2, 3)
    assert cari_linear(kecil, "B99") == (None, 4)
    assert cari_biner(kecil, "B07") == (2, 2)
    assert cari_biner(kecil, "B99") == (None, 3)
    assert cari_biner([], "B01") == (None, 0)
    print("uji lolos")


uji()
kode = [f"K{n:04d}" for n in range(1, 1001)]  # sudah berurutan
for target in ["K0001", "K0500", "K1000", "K9999"]:
    i1, s1 = cari_linear(kode, target)
    i2, s2 = cari_biner(kode, target)
    assert i1 == i2
    print(target, "linear", s1, "biner", s2)
```

```text
uji lolos
K0001 linear 1 biner 9
K0500 linear 500 biner 1
K1000 linear 1000 biner 10
K9999 linear 1000 biner 10
```

Pelajaran: tidak ada solusi yang menang di setiap kasus. Linear menang untuk `K0001` (1 lawan 9), tetapi pada kasus terburuk biner jauh lebih sedikit (10 lawan 1000). Biner hanya benar bila daftarnya berurutan; mengurutkan itu sendiri ada biayanya, jadi bila Anda mencari berkali-kali pada data yang sama, kamus berkunci (`per_kode`) biasanya paling sederhana.

## Contoh setengah jadi

Lengkapi tanda perbandingan pada pencarian biner, lalu jalankan `uji()`:

```python setengah-jadi
def cari_biner(urut, kode):
    kiri, kanan = 0, len(urut) - 1
    langkah = 0
    while kiri <= kanan:
        langkah += 1
        tengah = (kiri + kanan) // 2
        if urut[tengah] == kode:
            return tengah, langkah
        if urut[tengah] ___ kode:
            kiri = tengah + 1
        else:
            kanan = tengah - 1
    return None, langkah
```

Prediksi dulu: bila Anda salah menulis `>`, apa yang terjadi pada `cari_biner(kecil, "B07")`?

## Latihan

Data untuk latihan 1, 2, dan bercampur:

```python
barang = [
    {"kode": "B07", "nama": "Kabel contoh", "stok": 12, "kategori": "listrik"},
    {"kode": "B02", "nama": "Baterai contoh", "stok": 0, "kategori": "listrik"},
    {"kode": "B05", "nama": "Lampu contoh", "stok": 7, "kategori": "listrik"},
    {"kode": "B11", "nama": "Kertas contoh", "stok": 30, "kategori": "alat tulis"},
    {"kode": "B09", "nama": "Pensil contoh", "stok": 7, "kategori": "alat tulis"},
]
```

1. **Ubah.** Urutkan `barang` menurun menurut `nama`. Prediksi dulu urutan kodenya.
2. **Buat.** Tulis `stok_per_kategori(daftar)` yang mengembalikan kamus jumlah stok per kategori, memakai `.get`. Sertakan satu `assert` untuk daftar kosong.
3. **Jelaskan.** Mengapa pencarian biner pada daftar yang belum diurutkan bisa salah menyatakan "tidak ada"? Beri satu contoh kecil.
4. **Buat.** Tulis dua fungsi yang menjawab "adakah nilai duplikat?": satu dengan dua perulangan bersarang, satu dengan himpunan. Uji keduanya pada daftar kosong, satu elemen, dan daftar berduplikat. Mana yang lebih sederhana, dan mengapa?
5. **Berpasangan (opsional).** Tukar solusi nomor 4 dengan rekan; masing-masing mencari satu kasus uji yang belum terpikir. Peserta mandiri boleh melewatinya.

## Latihan bercampur

1. (`DW-PRO-M2`) Tulis subrutin `stok_menipis(daftar, batas)` yang mengembalikan kode barang dengan stok di bawah `batas`, dengan satu kondisi di dalam satu pengulangan. Prediksi dulu hasilnya untuk `batas = 8`.
2. (`DW-PRO-M1`) Tulis pesan *commit* satu baris untuk perubahan yang menambahkan fungsi nomor 2, dan sebut satu berkas yang tidak boleh ikut ter-*commit*.

## Ulang berjarak

Tanpa melihat modul ini, kerjakan ulang dan cocokkan.

| Kapan | Pertanyaan |
| --- | --- |
| Satu minggu lagi | Kapan Anda memilih daftar, himpunan, atau kamus? Beri satu contoh masing-masing. |
| Awal modul ke-4 berikutnya | Mengapa pencarian biner mensyaratkan daftar berurutan? |
| Akhir jalur | Bagaimana Anda membandingkan dua solusi tanpa stopwatch? |

## Kebijakan AI

Modul ini tidak memakai asisten AI. Aturannya mengikuti silabus 9.1: pemakaian AI untuk menulis kode baru diajarkan sesudah `DW-PRO-M5`, di `DW-PRO-M13`, supaya Anda lebih dahulu dapat menelusuri dan menguji kode sendiri.

## Kesalahan umum

- **Mencari di daftar padahal butuh pencarian berulang.** Ubah menjadi kamus sekali, lalu cari lewat kunci.
- **Mengurutkan daftar kecil secara berulang di dalam pengulangan.** Urutkan sekali di luar.
- **Menganggap himpunan menjaga urutan.** Urutan elemen himpunan tidak boleh diandalkan; gunakan `sorted`.
- **Kunci kamus yang berbeda huruf atau spasi.** `"B02"` dan `"b02 "` kunci berbeda; rapikan lebih dulu.
- **Menyimpulkan satu solusi lebih cepat dari satu kasus.** Hitung langkah pada kasus terbaik, tengah, dan terburuk.

## Cek mandiri

Tutup modul dan jawab:

1. Kapan kamus lebih tepat daripada daftar?
2. Mengapa `sorted(..., key=...)` dikatakan stabil, dan mengapa itu berguna?
3. Bagaimana langkah pencarian linear dan biner tumbuh ketika data menjadi 1000 kali lebih banyak (kasar)?

Daftar periksa (kosong; Anda isi sendiri, tidak dikumpulkan):

- [ ] Saya memilih struktur data dengan alasan, bukan kebiasaan.
- [ ] Saya menguji pencarian pada daftar kosong dan nilai yang tidak ada.
- [ ] Saya membandingkan dua solusi dengan menghitung langkah.

## Kunci dan petunjuk

- **Cek awal:** (1) daftar berurutan dan boleh duplikat; himpunan tanpa duplikat dan tanpa urutan tetap; kamus kunci ke nilai; (2) `.get` mengembalikan `None` atau nilai bawaan, `[]` memunculkan `KeyError`; (3) daftar harus berurutan; (4) 1000 perbandingan untuk linear dan sekitar 10 untuk biner; (5) elemen yang nilai kuncinya sama tetap dalam urutan semula.
- **Prediksi:** `4 3`, lalu `None -1`, lalu `['B09', 'B05', 'B02', 'B02']`, lalu `True`.
- **Setengah jadi:** `<`. Dengan `>`, daftar berukuran empat mencari `B07` ke kiri terus dan hasilnya `(None, 2)`: salah menyatakan tidak ada.
- **Latihan 1:** `['B09', 'B05', 'B11', 'B07', 'B02']`.
- **Latihan 2:** `{'listrik': 19, 'alat tulis': 37}`; untuk daftar kosong `{}`.
- **Latihan 3:** biner membuang separuh daftar berdasarkan perbandingan di tengah; bila daftar tidak berurutan, separuh yang dibuang bisa berisi nilainya.
- **Latihan 4:** versi himpunan membandingkan `len(set(nilai)) != len(nilai)`: lebih pendek dan lebih sedikit kasus tepi; uji `[]` tidak berduplikat.
- **Latihan bercampur 1:** `['B02', 'B05', 'B09']`.
- **Petunjuk bila macet:** jalankan pencarian pada daftar empat elemen dan tulis nilai `kiri`, `kanan`, `tengah` pada tiap langkah.

## Langkah berikutnya

`DW-PRO-M4`: fungsi, modul, dan kode yang rapi. Fungsi pencarian dan pengurutan di modul ini adalah bahan untuk dirapikan, diberi dokumentasi, dan dipakai ulang di sana.

## Catatan untuk pendamping

- **Waktu:** 10 jam, lima sesi dua jam. **Bahan:** Python 3, penyunting teks, terminal. Semua blok Python dijalankan penulis dengan `python3 -I` (Python 3.12.3) dan keluarannya cocok.
- **Jembatan kuliah:** `I-lengkap` L, `I-awal` P, `U-lengkap` P (dasar: `KUL-I-102`, `KUL-I-201`, `KUL-K-201`, `KUL-U-101`). Bukti berupa tugas praktik singkat tanpa AI; jalur K membuka pengakuan sendiri pada modul ini.
- **Unit SKKNI yang disentuh (judul saja, tidak menjamin kompetensi):** Menggunakan Struktur Data (`J.620100.004.02`); Mengimplementasikan Algoritma Pemrograman (`J.620100.022.02`). Salinan daftar unit belum terverifikasi terhadap berkas resmi.
- **Tanda siap lanjut:** peserta memilih struktur data dengan alasan dan menghitung langkah dua solusi.
