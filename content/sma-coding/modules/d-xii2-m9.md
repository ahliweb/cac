## Untuk siapa modul ini

Modul ini untuk murid kelas XII jalur D (kecerdasan buatan dan analisis data), untuk minggu `D-XII2-M9` silabus v1.3: dokumentasi, yaitu menulis kartu model dan panduan, dengan keluaran dokumen. Prasyarat terindeks: modul `d-xii2-m8` (seri yang sama); bahan `d-xii2-m1` sampai `d-xii2-m8` dipakai di sini (laporan uji, sidik, catatan model). Alat: Python 3, tanpa akun dan tanpa pustaka tambahan. Berkelompok atau sendiri.

Modul ini karangan penyusun dan disetujui pemilik program pada 2026-11-20 (keputusan lewat dialog; catatan tinjauan menjadi tindak lanjut revisi). Jalur D adalah pengayaan di luar rumusan capaian pembelajaran (CP); minggu ini tidak punya irisan pengayaan, jadi tidak dihitung memenuhi butir CP mana pun.

Aturan jalur D: data hanya sintetis (karangan) atau terbuka berlisensi jelas, tanpa data yang mengenali orang, tanpa wajah, suara, atau foto; AI generatif boleh dengan etika dan dicatat, tanpa data pribadi, kata sandi, atau tugas bernilai pada permintaanmu, dan tanpa kewajiban akun. Jawab dulu sendiri, baru minta petunjuk bertahap; kode buatan AI dibaca, dijalankan, dan diuji. Catat pemakaian AI di log proyek.

Catatan untuk guru: blok Python dijalankan penyusun dengan `python3 -I` (Python 3.14.6, per 2026-11), keluarannya ditempel apa adanya; yang dinyatakan hanya "bisa dijalankan dengan keluaran ini", bukan "benar untuk semua masukan". Angka kartu berasal dari keluaran `d-xii2-m8`; "Pustaka Contoh" dan semua angka karangan penyusun.

## Ingat kembali

Jawab dari ingatan, baru cek kunci.

1. Apa yang dicatat tentang pembagian peran dan pemakaian AI dalam tim? (dari `d-xii2-m1`)
2. Mengapa kartu model menyebut kelompok yang kinerjanya lebih rendah? (dari `d-xii2-m6`)
3. Mengapa angka laporan uji ditulis bersama selang kasar dan jumlah barisnya? (dari `d-xii2-m8`)
4. Apa saja bagian kartu model, dan baris mana yang menyatakan ketidakpastian? (dari `d-xi2-m12`)

## Tujuan

Setelah modul ini kamu dapat:

- menyusun kartu model dari laporan uji tanpa membesar-besarkan hasilnya;
- menulis panduan pengguna yang menyebut siapa memutuskan dan apa yang dilakukan bila model salah;
- memeriksa bentuk kartu dengan program kecil dan menyebut apa yang tidak dapat diperiksanya;
- mencatat pemakaian AI dan label karangan dalam dokumen.

Keluaran yang diminta silabus: dokumen (kartu model dan panduan).

## Rencana sprint

Dua dokumen punya dua pembaca. **Kartu model** untuk penilai dan pengembang lain: apa model ini, bagaimana diuji, di mana ia lemah. **Panduan** untuk pengguna fiktif, petugas perpustakaan: bagaimana memakai skor tanpa salah paham. Kartu bukan iklan: batasan dan risiko sama wajibnya dengan angka terbaik. Isinya diambil dari laporan uji `d-xii2-m8`, bukan diingat-ingat.

Prediksi dulu. Draf kartu di bawah memuat beberapa kekurangan. Tebak dan tulis kekurangannya sebelum menjalankan program pemeriksa.

```python
BAGIAN = ["Tujuan", "Di luar cakupan", "Data", "Model", "Evaluasi", "Batasan", "Risiko", "Biaya"]


def render(kartu):
    baris = [f"# Kartu model: {kartu['nama']} (karangan)"]
    for bagian in BAGIAN:
        if bagian in kartu:
            baris += ["", f"## {bagian}", kartu[bagian]]
    return "\n".join(baris)


def periksa(teks):
    """Pemeriksa bentuk kartu: hanya menangkap yang diprogramkan, bukan kebenaran isinya."""
    temuan = []
    for bagian in BAGIAN:
        if f"## {bagian}" not in teks:
            temuan.append(f"bagian hilang: {bagian}")
    if "karangan" not in teks.lower():
        temuan.append("tidak ada label karangan atau sintetis")
    if "pembanding" not in teks.lower():
        temuan.append("tidak ada pembanding di bagian evaluasi")
    if "baris" not in teks.lower():
        temuan.append("jumlah baris tidak ditulis")
    if "selang" not in teks.lower() and "+-" not in teks:
        temuan.append("angka tanpa ukuran ketidakpastian")
    for kata in ("akurat 95", "pasti", "tanpa risiko"):
        if kata in teks.lower():
            temuan.append(f"klaim berlebihan: {kata!r}")
    return temuan


DRAF = {
    "nama": "Penanda keterlambatan Pustaka Contoh",
    "Tujuan": "Membantu petugas memilih peminjaman yang diingatkan lebih awal.",
    "Data": "Data karangan.",
    "Model": "Regresi logistik. Model ini akurat 95 persen.",
    "Evaluasi": "Recall 0,56.",
}

LENGKAP = {
    "nama": "Penanda keterlambatan Pustaka Contoh",
    "Tujuan": "Membantu petugas memilih peminjaman yang diingatkan lebih awal; manusia yang memutuskan.",
    "Di luar cakupan": "Menolak peminjaman, menilai orang, atau dipakai di perpustakaan sungguhan tanpa data sungguhan.",
    "Data": "600 baris karangan dari buat_data(n=600, benih=2026); uji 150 baris (36 terlambat) dibuka satu kali.",
    "Model": "Regresi logistik seimbang, ambang 0,55, sidik kandidat a1f97fdbe259; Python, numpy, pandas, scikit-learn per 2026-11.",
    "Evaluasi": (
        "Recall 0,56 (selang kasar 0,39 sampai 0,74), presisi 0,38 (0,25 sampai 0,53), pengingat 35 persen. "
        "Pembanding: tebakan mayoritas recall 0,00; aturan tebal+ujian recall 0,47, presisi 0,59, pengingat 19 persen. "
        "Per jenis (baris, terlambat): anak 47, 15, recall 0,47; referensi 22, 5, recall 0,40 (TIPIS); umum 81, 16, recall 0,69. "
        "Sasaran lama belum terpenuhi; sasaran baru terpenuhi lewat catatan perubahan."
    ),
    "Batasan": "Selisih dengan aturan tulisan tangan belum terbukti; kelompok referensi terlalu sedikit; data karangan hanya mengembalikan asumsi pembangkitnya.",
    "Risiko": "Recall rendah pada buku anak dan referensi; keputusan otomatis tanpa petugas; sasaran longgar dipakai sebagai alasan.",
    "Biaya": "Komputasi kecil: model linear pada 450 baris, hitungan sebentar di laptop biasa; energi tidak diukur (tidak diketahui).",
}

print("draf:", periksa(render(DRAF)))
print("lengkap:", periksa(render(LENGKAP)) or "tidak ada temuan")
```

```text
draf: ['bagian hilang: Di luar cakupan', 'bagian hilang: Batasan', 'bagian hilang: Risiko', 'bagian hilang: Biaya', 'tidak ada pembanding di bagian evaluasi', 'jumlah baris tidak ditulis', 'angka tanpa ukuran ketidakpastian', "klaim berlebihan: 'akurat 95'"]
lengkap: tidak ada temuan
```

Baca hasilnya. Draf gagal pada delapan hal: empat bagian hilang, pembanding dan jumlah baris tidak ada, angka tanpa ukuran ketidakpastian, dan klaim "akurat 95 persen" yang tidak punya dasar di laporan uji. Kartu lengkap lolos. Pemeriksa itu hanya memeriksa **bentuk**: ia mencari judul dan kata kunci. Kartu yang menulis "pembanding" tetapi memakai angka karangan tetap lolos, dan klaim berlebihan yang tidak ada di daftar katanya tidak tertangkap. Karena itu pemeriksa menyiapkan pembaca, bukan menggantikannya; teman sejawat (`d-xii2-m11`) tetap perlu mencocokkan kartu dengan laporan.

Isi tiap bagian kartu lengkap itu menyebut asal angkanya. Bagian Evaluasi memuat model dan pembanding bersebelahan; bagian Batasan menyebut selisih dengan aturan tulisan tangan yang belum terbukti; bagian Biaya menulis "tidak diketahui" untuk energi daripada mengarang angka. **Panduan petugas** pendek:

| Bagian | Isi di proyek |
| --- | --- |
| Apa yang dilakukan alat | memberi skor 0 sampai 1 untuk tiap peminjaman; skor 0,55 ke atas ditandai |
| Siapa memutuskan | petugas; tanda hanya usul, bukan penolakan peminjaman |
| Bila tanda tampak salah | petugas tidak mengirim pengingat dan mencatat kodenya untuk ditinjau |
| Yang kurang andal | buku anak dan referensi sering terlewat; skor bukan peluang sebenarnya |
| Data | karangan; belum diuji di perpustakaan sungguhan |

## Daftar periksa

Centang tiap langkah dengan bukti.

- [ ] Kartu memuat delapan bagian; angka bersumber laporan uji.
- [ ] Evaluasi memuat pembanding, selang, dan jumlah baris tiap kelompok.
- [ ] Batasan dan risiko mencantumkan kelompok yang lebih lemah.
- [ ] Panduan menyebut siapa memutuskan dan langkah bila model salah.
- [ ] Label karangan, sidik, versi pustaka, dan log AI tertulis.

## Umpan balik sejawat

Tukar kartu dengan tim lain: satu yang sudah baik, satu yang perlu diperbaiki, satu langkah berikutnya, masing-masing menunjuk bagian kartu. Tanyakan: adakah kalimat yang tidak punya dasar di laporan uji, dan apakah pengguna tahu apa yang tidak boleh dilakukan dengan alat ini.

## Latihan bercampur

1. Tulis bagian Batasan kartu proyekmu, minimal tiga butir, masing-masing dengan alasannya (`AI: boleh`).
2. Dari `d-xii2-m3`: bagian Data kartu harus memuat apa dari catatan kualitas data (`AI: tanpa AI`)?
3. Dari `d-xii2-m7`: di bagian mana kartu mencatat sasaran lama dan perubahan sasaran (`AI: boleh`)?

## Ulang berjarak

Pertanyaan ini muncul lagi di `Ingat kembali` modul `d-xii2-m10` (sekitar 1 minggu lagi), `d-xii2-m12` (sekitar 3 minggu), dan `D-XII2-M14` (sekitar 5 minggu). Jawab sekarang lalu simpan.

1. Mengapa kartu model memuat bagian "di luar cakupan", dan apa isinya untuk proyek ini?
2. Apa yang diperiksa pemeriksa bentuk kartu, dan apa yang tidak dapat diperiksanya?
3. Mengapa panduan pengguna menyebut siapa yang memutuskan dan apa yang dilakukan bila model salah?

## Kesalahan umum

- **"Kartu model cukup memuat angka terbaik."** Batasan dan risiko wajib ada.
- **"Kartu lolos pemeriksa berarti isinya benar."** Pemeriksa hanya melihat bentuk.
- **"Panduan hanya untuk pengembang."** Panduan untuk orang yang memakai hasilnya.
- **"Energi tidak ditulis karena tidak diukur."** Tulis "tidak diketahui" beserta alasannya.

## Cek mandiri

- [ ] Saya dapat menyusun kartu model dengan delapan bagian dari laporan uji.
- [ ] Saya dapat menulis panduan untuk pengguna yang bukan pengembang.
- [ ] Saya dapat menyebut apa yang tidak dapat diperiksa program pemeriksa.
- [ ] Saya mencatat label karangan, sidik, dan pemakaian AI.

## Kunci dan petunjuk

**Ingat kembali.** 1: siapa mengerjakan apa (peran bukan sekat, tiap anggota dapat menjelaskan seluruh kode) dan log AI: alat, tujuan, bagian dipakai, cara memeriksa. 2: pengguna perlu tahu bahwa model tak sama baik untuk semua orang, dan batas kegunaannya. 3: data uji kecil membuat angka berayun; selang dan jumlah baris memberi ukuran kepercayaan. 4: tujuan, di luar cakupan, data, model, evaluasi, batasan, risiko, biaya; baris biaya dan batasan menyatakan ketidakpastian ("tidak diketahui" bila memang demikian).

**Rencana sprint.** Kekurangan draf: bagian Di luar cakupan, Batasan, Risiko, dan Biaya hilang; evaluasi tanpa pembanding, tanpa jumlah baris, tanpa selang; klaim "akurat 95 persen" tak punya dasar. Pemeriksa menangkap semuanya karena semuanya berbentuk judul atau kata kunci; ia tidak menangkap angka yang salah.

**Daftar periksa.** Dinilai dari bukti: kartu, panduan, dan laporan uji.

**Latihan bercampur.** 1: contoh butir: "selisih dengan aturan tulisan tangan belum terbukti (selisih 3 baris, di dalam selang)"; "kelompok referensi 5 baris terlambat, terlalu sedikit"; "data karangan hanya mengembalikan asumsi pembangkitnya". 2: asal dan asumsi pembangkit, arti label, ukuran dan jumlah baris tiap kelompok, hasil pemeriksaan dan keputusannya, sidik berkas, serta batas. 3: di Evaluasi (kedua sasaran dilaporkan) dan Batasan (sasaran baru ditetapkan sesudah melihat lipatan, lewat catatan perubahan).

**Ulang berjarak.** 1: agar model tidak dipakai di tempat yang tidak cocok; isinya: menolak peminjaman, menilai orang, dipakai di perpustakaan sungguhan tanpa data sungguhan. 2: judul bagian dan kata kunci seperti pembanding, baris, selang, serta klaim tertentu; ia tak dapat menilai benar-tidaknya angka atau kalimat. 3: agar pengguna tak menganggap tanda sebagai keputusan, dan tahu langkah bila tanda keliru.

## Langkah berikutnya

Modul berikut: `d-xii2-m10` (ulasan etika dan privasi). Bacaan lanjut: makalah *Model Cards for Model Reporting* (Mitchell dkk., 2019) dan dokumentasi kartu model di satu platform sebagai contoh format (di `Rujukan`).
