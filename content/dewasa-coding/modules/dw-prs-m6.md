## Untuk siapa modul ini

Modul ini untuk jalur **personal** (`PRS`), 5 jam, sesudah `DW-PRS-M5`, dan menutup jalur. Anda perlu Python 3 (penulis memakai 3.12.3), penyunting teks, dan terminal; HTML dan CSS dari `DW-PRS-M4` boleh dipakai bila proyek Anda berupa halaman. Estimasi dua sesi `[asumsi]`; proyek yang lebih besar boleh Anda lanjutkan di luar jam modul.

Proyek boleh bertema pribadi, tetapi **data nyata tidak dipakai** pada latihan: tidak ada nama, alamat, nomor, foto, atau catatan keuangan dan kesehatan nyata di berkas proyek maupun di layanan daring. Pakai angka dan nama rekaan; Anda dapat mengganti dengan data sendiri hanya di komputer Anda, di luar berkas yang kelak Anda bagikan.

## Cek awal pengalaman

Jawab tanpa melihat apa pun, lalu cocokkan dengan kunci. Skor tidak dicatat.

1. Mengapa sebuah proyek perlu batas yang jelas (apa yang **tidak** akan dikerjakan)?
2. Apa itu kasus uji, dan apa bedanya dengan satu contoh yang berhasil?
3. Apa yang dilakukan `assert hitung([1, 2]) == 3`, dan apa yang terjadi bila salah?
4. Mengapa fungsi kecil lebih mudah diuji daripada satu skrip panjang?
5. Sebutkan dua hal yang tidak boleh ada di berkas proyek yang kelak dibagikan.

Bila kelimanya benar, Anda boleh melewati "Contoh terselesaikan" dan "Contoh setengah jadi" dan langsung ke "Latihan".

## Ingat kembali

Tanpa melihat modul sebelumnya, tulis jawaban singkat.

1. (`DW-PRS-M5`) Mengapa skrip yang mengubah berkas perlu mode uji coba dan aman dijalankan dua kali?
2. (`DW-PRS-M3`) Tulis dari ingatan fungsi yang membaca berkas teks berbaris `judul|status` menjadi daftar kamus.
3. (`DW-PRS-M1`) Tulis satu masalah pribadi sebagai algoritma lima langkah dengan satu kondisi dan satu pengulangan.

Cocokkan: (1) uji coba hanya mencetak rencana sehingga salah dapat dikoreksi sebelum berkas berubah, dan skrip yang aman diulang tidak menimpa atau menggandakan hasil; (2) bentuknya `with open(nama, encoding="utf-8") as berkas:`, mengulang baris, `.strip()`, `baris.split("|")`, lalu `hasil.append({"judul": ..., "status": ...})`, dan mengembalikan `hasil`; (3) jawaban Anda sendiri, diperiksa bahwa langkahnya tegas, ada satu kondisi, ada satu pengulangan dengan syarat berhenti.

## Tujuan

Setelah modul ini Anda dapat merancang, membangun, dan menjelaskan satu proyek, serta memilih jalur belajar lanjut.

## Prediksi dulu

Fungsi `hitung_beruntun(catatan)` (lihat "Contoh terselesaikan") menghitung banyak hari berturut-turut di **akhir** daftar yang bernilai `True`. Untuk `[True, True, False, True, True, True, False]`, berapa hasilnya? Tulis tebakan Anda dan alasannya sebelum melanjutkan.

## Contoh terselesaikan

### Dari ide ke kartu proyek

Proyek kecil yang berhasil dimulai dari **satu kalimat masalah** dan batas yang tegas. Tulis kartu seperti ini sebelum menulis kode:

```text
Kartu proyek
Masalah   : saya ingin tahu seberapa konsisten saya mencapai target harian.
Masukan   : daftar benar/salah per hari (data rekaan di awal).
Keluaran  : "5 dari 7 hari tercapai, beruntun 0".
Batas     : tidak ada tampilan grafis, tidak ada data nyata di berkas proyek.
Kasus uji : daftar kosong, semua benar, semua salah, campuran.
Langkah   : (1) hitung jumlah; (2) hitung beruntun; (3) rangkum; (4) uji; (5) jelaskan.
```

Tiga ide lain yang ukurannya sama: kuis latihan kosakata (`DW-PRS-M2`), pencatat koleksi dengan berkas teks (`DW-PRS-M3`), atau halaman profil dengan data dari program Python (`DW-PRS-M4`). Pilihan Anda sendiri sah, asal masalah, keluaran, dan batasnya bisa ditulis dalam satu kartu. Pecah proyek menjadi langkah kecil seperti pada `DW-PRS-M1`, dan jalankan setiap langkah sebelum menambah langkah berikutnya.

### Membangun bertahap, dengan uji

```python
def hitung_beruntun(catatan):
    """Banyak hari berturut-turut di akhir daftar yang bernilai True (target tercapai)."""
    beruntun = 0
    for tercapai in reversed(catatan):
        if tercapai:
            beruntun += 1
        else:
            break
    return beruntun


def ringkas(catatan):
    jumlah = sum(1 for tercapai in catatan if tercapai)
    return f"{jumlah} dari {len(catatan)} hari tercapai, beruntun {hitung_beruntun(catatan)}"


# Uji: kasus biasa, kosong, semua benar, semua salah.
assert hitung_beruntun([True, False, True, True]) == 2
assert hitung_beruntun([]) == 0
assert hitung_beruntun([True, True, True]) == 3
assert hitung_beruntun([False, False]) == 0
print("semua uji lolos")

minggu_rekaan = [True, True, False, True, True, True, False]
print(ringkas(minggu_rekaan))
print(ringkas(minggu_rekaan[:6]))
print(ringkas([]))
```

Keluarannya (dijalankan dengan `python3 -I`, Python 3.12.3):

```text
semua uji lolos
5 dari 7 hari tercapai, beruntun 0
5 dari 6 hari tercapai, beruntun 3
0 dari 0 hari tercapai, beruntun 0
```

Jawaban prediksi: **0**, karena hari terakhir `False` sehingga pengulangan terbalik langsung berhenti. Tanpa uji, orang mudah mengira hasilnya 3 (rangkaian terpanjang). Itulah gunanya menulis uji dari **spesifikasi** ("di akhir daftar"), bukan dari dugaan. Kasus daftar kosong ikut diuji karena mudah terlewat.

`assert` menghentikan program dengan `AssertionError` bila pernyataannya salah, sehingga uji yang gagal tidak lolos diam-diam. Untuk uji yang lebih rapi Anda dapat mempelajari modul `doctest` atau `unittest` di [dokumentasi Python](https://docs.python.org/3/library/doctest.html).

### Menjelaskan proyek

Proyek belum selesai sebelum Anda bisa menjelaskannya. Tulis lima kalimat tentang: masalahnya, cara memakainya, satu keputusan yang Anda ambil (mis. memakai fungsi terpisah agar mudah diuji), satu kesalahan yang Anda temukan dan perbaiki, dan satu hal yang tidak dicakup. Menjelaskan dengan kata sendiri memaksa Anda menemukan bagian yang belum benar-benar Anda pahami; bila bagian itu tidak bisa dijelaskan, baca ulang kodenya sebelum melanjutkan.

### Memilih jalur lanjut

Setelah `DW-PRS-M6` Anda memilih arah (silabus bagian 6.1). Pilihan bukan perlombaan dan tidak ada yang wajib:

| Jalur | Cocok bila Anda | Hubungan dengan yang sudah Anda pelajari |
| --- | --- | --- |
| `PKJ` (pekerja) | ingin mengotomasi pekerjaan kantor dengan lembar kerja dan Python | melanjutkan dasar Python dan berkas; fokus data tabel dan laporan; silabus mengasumsikan Anda terbiasa dengan lembar kerja dasar |
| `PRO` (profesional) | ingin mempelajari pemrograman lebih dalam (struktur data, basis data, web, uji); silabus mengasumsikan logika dasar dan kemampuan membaca bahasa Inggris teknis | `DW-PRS-M2` dan `DW-PRS-M3` setara sebagian `DW-PRO-M2` dan `DW-PRO-M3`, dengan tugas dilengkapi (silabus bagian 6) |
| `BIS` (pebisnis) | ingin memakai alat digital untuk usaha kecil | memakai kebiasaan berpikir langkah dan data sintetis; fokus usaha |

Uraian lengkap ada di silabus program. Modul ini tidak menjanjikan sertifikat atau pekerjaan; jalur `PRS` tidak memiliki sertifikasi resmi (silabus bagian 12.5).

## Contoh setengah jadi

Lengkapi empat titik `___` agar fungsi menghitung persen hari tercapai dan memberi 0 untuk daftar kosong:

```python setengah-jadi
def persen_tercapai(catatan):
    if len(catatan) == ___:
        return 0
    jumlah = sum(1 for t in catatan if ___)
    return jumlah * 100 // ___
```

Prediksi dulu hasil untuk `minggu_rekaan` dan untuk `[]`. Kerangka berlubang bukan program yang berjalan sampai Anda mengisinya.

## Latihan

1. **Ubah.** Tambahkan uji untuk `hitung_beruntun` pada daftar satu anggota (`[True]` dan `[False]`). Prediksi dulu hasilnya.
2. **Buat.** Tulis kartu proyek Anda sendiri (masalah, masukan, keluaran, batas, kasus uji, langkah), dengan data rekaan.
3. **Buat.** Bangun proyek Anda sedikitnya dalam tiga langkah yang masing-masing dijalankan dan diuji sebelum langkah berikutnya, dengan tiga kasus uji berbentuk `assert` (atau cek manual bila proyek Anda halaman web).
4. **Jelaskan.** Tulis penjelasan lima kalimat proyek Anda dan beri tanda satu bagian yang masih Anda ragukan.
5. **Berpasangan (opsional).** Tukar kartu proyek dengan rekan; masing-masing mengusulkan satu kasus uji yang belum terpikir oleh pemilik proyek. Peserta mandiri boleh membaca ulang kartunya sendiri dan menambah satu kasus uji tepi.

## Latihan bercampur

1. (`DW-PRS-M5`) Tambahkan mode uji coba pada proyek Anda bila ia mengubah atau menulis berkas, dan pastikan aman dijalankan dua kali. Bila proyek Anda tidak menulis berkas, jelaskan di kartu mengapa langkah ini tidak perlu.
2. (`DW-PRS-M3`) Simpan catatan proyek rekaan ke berkas teks dan muat kembali. Prediksi dulu apa yang terjadi pada isi berkas bila Anda menjalankan program dua kali.

## Keluaran portofolio

**Proyek mandiri dan peta jalan belajar.** Isi folder proyek: kartu proyek, kode atau halaman yang berjalan, sedikitnya tiga kasus uji, penjelasan lima kalimat, serta satu halaman **peta jalan belajar** (mis. lanjut ke `PRO`): jalur yang Anda pilih, alasannya, tiga hal yang ingin Anda pelajari berikutnya, dan jadwal minggu pertama dengan jam yang realistis bagi Anda. Tidak ada data pribadi nyata di folder.

## Ulang berjarak

Tanpa melihat modul ini, kerjakan ulang dan cocokkan. Ini pertanyaan penutup jalur; bila Anda lanjut ke jalur lain, pertanyaan ini dapat muncul kembali di sana.

| Kapan | Pertanyaan |
| --- | --- |
| Satu minggu lagi | Mengapa uji ditulis dari spesifikasi dan mencakup kasus kosong, bukan hanya contoh yang berhasil? |
| Awal modul jalur lanjut | Tulis dari ingatan kartu proyek enam baris untuk satu masalah pribadi. |
| Akhir jalur lanjut | Apa yang Anda periksa sebelum membagikan folder proyek kepada orang lain? |

## Kebijakan AI

Modul ini tidak memakai asisten AI; kebijakan lengkap program ada di `DW-FND-M1` dan dipakai penuh pada `DW-PKJ-M6`, `DW-PRO-M13`, dan `DW-BIS-M7` (silabus bagian 9.1). Bila kelak Anda memakai asisten AI pada proyek, ingat tiga hal: data rekaan saja, kata sandi tidak ditempel, dan keluarannya draf yang harus Anda jalankan dan jelaskan sendiri.

## Kesalahan umum

- **Proyek terlalu besar.** Bila kartu tidak muat dalam satu halaman, pangkas batasnya.
- **Menguji hanya satu contoh yang berhasil.** Tambahkan kasus kosong, tunggal, dan tepi.
- **Menyalin kode tanpa memahami.** Bila Anda tidak dapat menjelaskan satu baris, jangan pakai baris itu.
- **Membagikan folder dengan data atau kredensial nyata.** Periksa isi folder, termasuk berkas tersembunyi dan riwayat versi, sebelum membagikan.
- **Memilih jalur lanjut karena gengsi.** Pilih berdasarkan masalah yang ingin Anda selesaikan dan waktu yang benar-benar Anda punya.

## Cek mandiri

Tutup modul dan jawab:

1. Sebutkan enam bagian kartu proyek.
2. Mengapa `hitung_beruntun([True, True, False])` bernilai 0, bukan 2?
3. Apa yang Anda lakukan bila tidak dapat menjelaskan satu bagian proyek Anda?

Daftar periksa (kosong; Anda isi sendiri, tidak dikumpulkan):

- [ ] Proyek saya punya kartu, kode yang berjalan, dan tiga kasus uji.
- [ ] Saya dapat menjelaskan tiap bagian dengan kata sendiri.
- [ ] Folder proyek tidak berisi data pribadi nyata atau kata sandi.
- [ ] Peta jalan belajar saya punya jadwal minggu pertama.

## Kunci dan petunjuk

- **Cek awal:** (1) agar proyek selesai dan tidak membengkak; (2) kasus uji adalah masukan beserta keluaran yang diharapkan dan diperiksa, sedangkan satu contoh berhasil tidak menunjukkan kasus tepi; (3) memeriksa bahwa `hitung([1, 2])` sama dengan `3`, dan bila salah program berhenti dengan `AssertionError`; (4) fungsi kecil dapat dipanggil dengan masukan sendiri tanpa menjalankan seluruh skrip; (5) kata sandi dan data pribadi nyata (nama, alamat, nomor, foto).
- **Prediksi:** `0` (lihat penjelasan di contoh).
- **Setengah jadi:** `0`, `t`, dan `len(catatan)`. Untuk `minggu_rekaan` hasilnya `71` (`5 * 100 // 7`), untuk `[]` hasilnya `0`.
- **Latihan 1:** `hitung_beruntun([True])` bernilai `1` dan `hitung_beruntun([False])` bernilai `0`.
- **Latihan 2 sampai 4:** tidak ada kunci tunggal; periksa dengan daftar periksa di "Cek mandiri".
- **Latihan bercampur 2:** bila program menambah tanpa memeriksa, entri menjadi ganda pada putaran kedua (lihat `DW-PRS-M3`).
- **Petunjuk bila macet:** kecilkan masalahnya; kerjakan satu fungsi, uji dengan tiga masukan, baru lanjut.

## Langkah berikutnya

Jalur `PRS` selesai. Pilih jalur lanjut dari peta jalan Anda: `DW-PKJ-M1` (otomasi pekerjaan kantor), `DW-PRO-M1` (pemrograman profesional), atau `DW-BIS-M1` (digital untuk usaha), sesuai tujuan Anda. Prasyarat modul pertama ketiganya adalah `DW-FND-M1`, yang sudah Anda kerjakan.

## Catatan untuk pendamping

- **Waktu:** 5 jam. **Bahan:** Python 3, penyunting teks, terminal. Skrip contoh dijalankan penulis dengan `python3 -I` (Python 3.12.3) dan keluarannya cocok dengan yang tertulis, termasuk empat `assert`.
- **Tanda siap lanjut:** peserta menjelaskan proyeknya dalam lima kalimat, menunjukkan sedikitnya tiga kasus uji yang lolos, dan memilih jalur lanjut dengan alasan sendiri.
- **Penilaian proyek:** nilai kejelasan kartu, kasus uji, dan kemampuan menjelaskan, bukan ukuran atau kecanggihan proyek. Peserta mengisi daftar periksa sendiri; tidak ada skor yang dicatat.
- **Privasi:** periksa bersama isi folder proyek sebelum dibagikan.
