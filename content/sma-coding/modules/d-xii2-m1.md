## Untuk siapa modul ini

Modul ini untuk murid kelas XII jalur D (kecerdasan buatan dan analisis data), untuk minggu `D-XII2-M1` silabus v1.3: perencanaan proyek akhir, yaitu menyusun rencana, pembagian peran, dan jadwal, dengan keluaran rencana proyek. Prasyarat terindeks: modul `d-xii1-m7`. Modul `d-xii1-m8` sampai `d-xii1-m14` ditulis dalam seri yang sama dan bahannya dipakai di sini (rencana satu halaman dari `d-xii1-m13`, tabel eksperimen, laporan risiko). Alat: Python 3, tanpa akun. Berkelompok (sekitar tiga orang) atau sendiri.

Modul ini karangan penyusun dan disetujui pemilik program pada 2026-11-20 (keputusan lewat dialog; catatan tinjauan menjadi tindak lanjut revisi). Jalur D adalah pengayaan di luar rumusan capaian pembelajaran (CP). Minggu ini tidak punya irisan pengayaan, jadi modul ini tidak dihitung memenuhi butir CP mana pun.

Aturan jalur D yang berlaku: data hanya sintetis (karangan) atau terbuka dengan lisensi jelas, tanpa data yang bisa mengenali orang; wajah, suara, dan foto orang tidak dipakai sebagai data; AI generatif boleh dipakai dengan etika dan dicatat, tanpa data pribadi, kata sandi, atau tugas bernilai pada permintaanmu, dan kamu tidak wajib punya akun. Saran: jawab dulu sendiri, baru minta AI memberi petunjuk bertahap. Pada proyek, catat pemakaian AI di log.

Catatan untuk guru: blok Python dijalankan penyusun dengan `python3 -I` (Python 3.14.6, per 2026-11) dan keluarannya ditempel apa adanya; yang dinyatakan hanya "bisa dijalankan dengan keluaran ini", bukan "benar untuk semua masukan". "Pustaka Contoh" dan semua angka karangan penyusun; huruf A, B, C pada peran adalah label, bukan orang.

## Ingat kembali

Jawab dari ingatan, baru cek di bagian kunci.

1. Mengapa perbaikan model diukur pada data validasi atau lipatan, bukan pada data uji, dan kapan data uji boleh dibuka? (dari `d-xii1-m7`)
2. Mengapa grafik batang dimulai dari nol, dan apa yang ditambahkan agar selisih kecil tidak tampak besar? (dari `d-xii1-m12`)
3. Apa tujuh bagian rencana proyek, dan mengapa prediksi ditulis sebelum menjalankan? (dari `d-xii1-m13`)

## Tujuan

Setelah modul ini kamu dapat:

- memilih topik proyek akhir yang layak: ada keputusan yang dibantu, data legal, pembanding sederhana, dan ukuran sukses yang dapat diuji;
- membagi peran dan jadwal per minggu dengan satu penanggung jawab tiap tugas;
- menulis urutan pemotongan lingkup bila waktu habis, dan risiko beserta minggu penanganannya;
- memeriksa jadwal dengan program kecil dan memperbaiki masalahnya.

Keluaran yang diminta silabus: rencana proyek.

## Rencana proyek

Tulis rencana sebelum mengerjakan. Prediksi dulu: jadwal draf di bawah memuat empat masalah. Tebak dan tulis masalah itu sebelum menjalankan program.

**Memilih topik.** Lanjutkan Pustaka Contoh (menandai peminjaman yang mungkin terlambat) atau pilih topik lain yang lolos empat syarat: (1) ada pengguna fiktif dan keputusan yang dibantu; (2) data sintetis atau terbuka berlisensi jelas, siap dalam satu atau dua minggu; (3) ada pembanding sederhana dan ukuran sukses beserta angkanya; (4) tanpa wajah, suara, atau data pribadi. Topik yang terlalu besar dikecilkan lebih dulu, karena waktu hanya sampai minggu 13.

**Contoh rencana terselesaikan** (Pustaka Contoh, karangan):

| Bagian | Isi |
| --- | --- |
| Pertanyaan | tandai peminjaman yang mungkin terlambat agar petugas mengirim pengingat lebih awal |
| Data | 600 baris karangan, dibangkitkan program; data uji ditutup sampai `D-XII2-M8` |
| Ukuran sukses | recall terlambat sedikitnya 0,60, presisi sedikitnya 0,50 (dari `d-xii1-m1`) |
| Peran | A data dan dokumen; B model dan eksperimen; C evaluasi dan etika; log AI diisi bergiliran |
| Jadwal | satu tugas utama per minggu, minggu 3 sampai 13 (tabel kerangka silabus) |
| Dipotong lebih dulu | bila waktu habis: kandidat model dikurangi dari tiga ke dua, lalu grafik tambahan; ulasan etika dan uji akhir tidak dipotong |
| Risiko | model dipakai menolak peminjaman; recall rendah pada buku anak; data uji bocor (tiap risiko diberi minggu penanganan) |

Peran bukan sekat: setiap anggota harus dapat menjelaskan seluruh kode, sesuai kebijakan AI silabus 7.4. Program berikut memeriksa jadwal terhadap empat aturan: tiap tugas punya penanggung jawab, selesai paling lambat minggu 13, tidak ada orang yang memegang dua tugas di minggu yang sama, dan tidak ada minggu kosong.

```python
AKHIR = 13  # proyek akhir: kerja sampai minggu 13; minggu 14 adalah asesmen

# (tugas, minggu mulai, minggu selesai, penanggung jawab)
DRAF = [
    ("data dan pemeriksaan", 3, 3, "A"),
    ("garis dasar", 4, 4, "B"),
    ("tiga model", 5, 6, "B"),
    ("analisis galat", 6, 6, "B"),
    ("penyempurnaan", 7, 8, "C"),
    ("uji akhir", 8, 8, None),
    ("kartu model dan panduan", 9, 9, "A"),
    ("ulasan etika", 10, 10, "C"),
    ("presentasi", 12, 14, "A"),
]


def periksa(rencana, awal=3, akhir=AKHIR):
    masalah = []
    for nama, mulai, selesai, pj in rencana:
        if pj is None:
            masalah.append(f"tanpa penanggung jawab: {nama}")
        if selesai > akhir:
            masalah.append(f"melewati minggu {akhir}: {nama} (selesai minggu {selesai})")
    for minggu in range(awal, akhir + 1):
        aktif = [(nama, pj) for nama, mulai, selesai, pj in rencana if mulai <= minggu <= selesai]
        if not aktif:
            masalah.append(f"minggu {minggu} tidak punya tugas")
        for orang in sorted({pj for _, pj in aktif if pj}):
            tugas = [nama for nama, pj in aktif if pj == orang]
            if len(tugas) > 1:
                masalah.append(f"{orang} memegang {len(tugas)} tugas di minggu {minggu}: {', '.join(tugas)}")
    return masalah


for baris in periksa(DRAF) or ["tidak ada masalah"]:
    print(baris)

PERBAIKAN = [
    ("data dan pemeriksaan", 3, 3, "A"),
    ("garis dasar", 4, 4, "B"),
    ("tiga model", 5, 5, "B"),
    ("analisis galat", 6, 6, "C"),
    ("penyempurnaan", 7, 7, "C"),
    ("uji akhir", 8, 8, "A"),
    ("kartu model dan panduan", 9, 9, "A"),
    ("ulasan etika", 10, 10, "C"),
    ("ulasan sejawat", 11, 11, "B"),
    ("presentasi", 12, 12, "A"),
    ("portofolio dan refleksi", 13, 13, "B"),
]
print("--- sesudah diperbaiki")
for baris in periksa(PERBAIKAN) or ["tidak ada masalah"]:
    print(baris)
```

```text
tanpa penanggung jawab: uji akhir
melewati minggu 13: presentasi (selesai minggu 14)
B memegang 2 tugas di minggu 6: tiga model, analisis galat
minggu 11 tidak punya tugas
--- sesudah diperbaiki
tidak ada masalah
```

Baca hasilnya. Program hanya menangkap pelanggaran aturan yang kamu tulis; ia tidak tahu apakah satu minggu cukup untuk tugasnya. Itu penilaian timmu, dan alasannya ditulis di rencana. Perbaikannya: uji akhir diberi pemilik, presentasi dimundurkan agar selesai minggu 12, analisis galat dipindah ke C, dan minggu 11 diisi ulasan sejawat.

## Daftar periksa

Centang tiap langkah dengan bukti (berkas atau keluaran yang bisa ditunjukkan).

- [ ] Topik lolos empat syarat; satu kalimat keputusan yang dibantu.
- [ ] Ukuran sukses berasal dari dokumen kebutuhan dan memuat angka.
- [ ] Setiap tugas minggu 3 sampai 13 punya satu penanggung jawab; jadwal lolos pemeriksaan program.
- [ ] Urutan pemotongan lingkup ditulis, dan bagian yang tidak boleh dipotong disebut.
- [ ] Tiap risiko dari laporan risiko punya minggu penanganan.
- [ ] Prediksi hasil ditulis sebelum model baru dijalankan; log pemakaian AI disiapkan.

## Umpan balik sejawat

Tukar rencana dengan tim lain dan tulis tiga kalimat: satu yang sudah baik, satu yang perlu diperbaiki, satu langkah berikutnya, masing-masing menunjuk bagian tertentu. Pemeriksa bertanya: apakah ukuran sukses dapat diuji, apakah tiap tugas punya satu pemilik, dan apakah lingkup cukup kecil untuk sebelas minggu. Sebut tim dengan nomor, bukan nama orang.

## Latihan bercampur

1. Dari `d-xii1-m1`: ubah "modelnya harus akurat" menjadi kebutuhan yang dapat diuji untuk topikmu (`AI: tanpa AI`).
2. Dari `d-xii1-m11`: pilih dua risiko dari laporan risikomu dan tulis minggu penanganannya pada jadwal (`AI: boleh`).

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `d-xii2-m2` (sekitar satu minggu lagi), `d-xii2-m4` (sekitar tiga minggu lagi), dan `D-XII2-M9` (sekitar delapan minggu lagi). Jawab sekarang lalu simpan.

1. Sebutkan bagian rencana proyek akhir dan mengapa ada urutan pemotongan lingkup.
2. Apa empat syarat topik yang layak, dan mengapa topik dikecilkan lebih dulu?
3. Apa yang dicatat tentang pembagian peran dan pemakaian AI dalam tim?

## Kesalahan umum

- **"Satu orang satu bagian, yang lain tidak perlu mengerti."** Setiap anggota harus dapat menjelaskan seluruh kode yang diserahkan.
- **"Jadwal tanpa cadangan pasti selesai."** Tanpa urutan pemotongan, yang dikorbankan saat waktu habis justru uji dan etika.
- **"Topik besar tampak lebih mengesankan."** Proyek kecil yang selesai, diuji, dan terdokumentasi lebih berharga.
- **"Program pemeriksa jadwal menjamin jadwalnya bagus."** Ia hanya memeriksa aturan yang ditulis.

## Cek mandiri

- [ ] Saya dapat memilih topik yang layak dengan empat syarat.
- [ ] Saya dapat membagi peran dan jadwal dengan satu pemilik tiap tugas.
- [ ] Saya dapat menulis urutan pemotongan lingkup dan risiko dengan minggu penanganan.
- [ ] Saya mencatat pemakaian AI bila memakainya.

## Kunci dan petunjuk

**Ingat kembali.** 1: karena data uji hanya boleh memberi penilaian sekali; bila dipakai memilih perbaikan, angkanya terlalu optimis. Data uji dibuka sekali, di akhir. 2: batang mewakili besar, jadi tinggi harus proporsional dari nol; tambahkan sebaran, pembanding, dan sasaran. 3: pertanyaan, data, pembanding, metrik utama, kriteria selesai, prediksi, risiko; prediksi menguji dugaanmu dan mencegah hasil "disesuaikan" setelah dilihat.

**Rencana proyek.** Empat masalah draf: uji akhir tanpa pemilik; presentasi melewati minggu 13; B memegang dua tugas di minggu 6; minggu 11 kosong. Tebakanmu boleh berbeda urutan; yang dinilai adalah alasannya.

**Daftar periksa.** Dinilai dari bukti: rencana tertulis dan keluaran pemeriksa jadwal.

**Latihan bercampur.** 1: contoh: "menandai sedikitnya 60 dari tiap 100 peminjaman yang terlambat, dengan paling banyak satu tanda palsu untuk tiap tanda benar"; kuncinya angka, pembanding, dan data uji yang jelas. 2: contoh: recall buku anak rendah ke minggu 3 dan 6 (tambah data dan analisis galat), model dipakai menolak peminjaman ke minggu 9 (kartu model).

**Ulang berjarak.** 1: topik, pertanyaan, data, ukuran sukses, peran, jadwal, risiko, dan urutan potong; urutan potong menjaga uji dan etika saat waktu habis. 2: ada keputusan yang dibantu, data legal, pembanding dan ukuran sukses, tanpa data pribadi; proyek kecil yang selesai lebih berharga. 3: peran tiap anggota dan log AI: alat, tujuan, garis besar perintah, bagian yang dipakai, cara memeriksa.

## Langkah berikutnya

Modul berikut: `d-xii2-m2` (rancangan data, model, dan evaluasi). Bacaan lanjut: bagian Proses Rekayasa pada Panduan Mata Pelajaran Informatika (di `Rujukan`).
