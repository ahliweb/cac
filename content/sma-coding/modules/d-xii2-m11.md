## Untuk siapa modul ini

Modul ini untuk murid kelas XII jalur D (kecerdasan buatan dan analisis data), untuk minggu `D-XII2-M11` silabus v1.3: ulasan sejawat, yaitu menilai proyek tim lain, dengan keluaran catatan ulasan. Prasyarat terindeks: modul `d-xii2-m10` (seri yang sama); bahan `d-xii2-m1` sampai `d-xii2-m10` dipakai di sini. Alat: Python 3, tanpa akun dan tanpa pustaka tambahan. Berpasangan antartim.

Modul ini berstatus DRAF: karangan penyusun, belum ditinjau pemilik. Jalur D adalah pengayaan di luar rumusan capaian pembelajaran (CP); minggu ini tidak punya irisan pengayaan, jadi tidak dihitung memenuhi butir CP mana pun.

Aturan jalur D: data hanya sintetis (karangan) atau terbuka berlisensi jelas, tanpa data yang mengenali orang, tanpa wajah, suara, atau foto; AI generatif boleh dengan etika dan dicatat, tanpa data pribadi, kata sandi, atau tugas bernilai pada permintaanmu, dan tanpa kewajiban akun. Jawab dulu sendiri, baru minta petunjuk bertahap; kode buatan AI dibaca, dijalankan, dan diuji. Catat pemakaian AI di log proyek.

Catatan untuk guru: blok Python dijalankan penyusun dengan `python3 -I` (Python 3.14.6, per 2026-11), keluarannya ditempel apa adanya; yang dinyatakan hanya "bisa dijalankan dengan keluaran ini", bukan "benar untuk semua masukan". Tim "Dahlia" dan "Edelweis" fiktif, bukan tim nyata mana pun; rubrik ulasan usulan penyusun.

## Ingat kembali

Jawab dari ingatan, baru cek kunci.

1. Apa isi catatan kualitas data, dan apa yang membuktikan berkas data tidak berubah sejak diperiksa? (dari `d-xii2-m3`)
2. Mengapa data uji dibuka satu kali saja, dan apa yang dilakukan bila hasilnya tidak mencapai sasaran? (dari `d-xii2-m8`)
3. Mengapa hasil per kelompok dibaca bersama jumlah barisnya sebelum menyimpulkan ketidakadilan? (dari `d-xii2-m10`)
4. Apa tiga bagian umpan balik sejawat, dan mengapa ulasan menunjuk bukti, bukan orang? (dari `d-xii1-m9`)

## Tujuan

Setelah modul ini kamu dapat:

- membaca paket proyek tim lain (README, kartu model, laporan uji, log AI) dengan urutan yang tetap;
- memakai daftar butir untuk menemukan kekurangan dan menghitung ulang satu angka laporan;
- menulis catatan ulasan: satu yang sudah baik, satu yang perlu diperbaiki, satu langkah berikutnya, masing-masing menunjuk bukti;
- menerima ulasan tentang karyamu dan menentukan tindakannya.

Keluaran yang diminta silabus: catatan ulasan.

## Rencana sprint

Ulasan sejawat menilai karya, bukan orang. Urutan membaca: README (sidik, versi, log AI), laporan uji, lalu kartu model; terakhir cocokkan angka antar dokumen. Pengulas yang memakai AI untuk meringkas paket mencatatnya, tidak menempelkan data pribadi, dan tetap membaca sendiri bagian yang ia nilai. Pengulas yang tidak sepakat menulis alasannya, tidak sekadar memberi skor.

Prediksi dulu. Program di bawah menilai dua paket fiktif dengan tujuh butir. Tebak dan tulis: berapa butir terpenuhi tiap paket, dan bila sebuah paket memenuhi tujuh dari tujuh, apakah semua klaimnya pasti benar?

```python
PERIKSA = [
    # (kunci, pertanyaan pemeriksa, tindakan bila gagal)
    ("sidik", "sidik kandidat dicatat dan data uji dibuka paling banyak satu kali", "catat sidik; jelaskan pembukaan data uji"),
    ("pembanding", "ada pembanding sederhana di samping model", "tambah tebakan mayoritas dan satu aturan tulisan tangan"),
    ("jumlah_baris", "angka per kelompok ditulis bersama jumlah barisnya", "tulis jumlah baris dan tandai kelompok tipis"),
    ("selang", "angka hasil disertai ukuran ketidakpastian", "tambah sebaran atau selang kasar"),
    ("sasaran", "sasaran lama dilaporkan bila sasaran diubah, dengan catatan perubahan", "laporkan keduanya dan tulis catatan perubahan"),
    ("log_ai", "log pemakaian AI ada bila AI dipakai", "isi log: alat, tujuan, bagian dipakai, cara memeriksa"),
    ("karangan", "data diberi label karangan atau sintetis", "beri label di kartu model dan slide"),
]

PAKET = {
    "Tim Dahlia (fiktif)": {
        "sidik": True,
        "uji_dibuka": 1,
        "pembanding": True,
        "jumlah_baris": True,
        "selang": True,
        "sasaran": True,
        "log_ai": True,
        "karangan": True,
    },
    "Tim Edelweis (fiktif)": {
        "sidik": False,
        "uji_dibuka": 3,
        "pembanding": False,
        "jumlah_baris": True,
        "selang": False,
        "sasaran": False,
        "log_ai": True,
        "karangan": True,
    },
}


def ulas(paket):
    temuan = []
    for kunci, tanya, tindakan in PERIKSA:
        lolos = paket[kunci]
        if kunci == "sidik":
            lolos = lolos and paket["uji_dibuka"] <= 1
        if not lolos:
            temuan.append((tanya, tindakan))
    return temuan


for nama, paket in PAKET.items():
    t = ulas(paket)
    print(f"{nama}: {len(PERIKSA) - len(t)} dari {len(PERIKSA)} butir terpenuhi")
    for tanya, tindakan in t:
        print(f"  - belum: {tanya} -> {tindakan}")
```

```text
Tim Dahlia (fiktif): 7 dari 7 butir terpenuhi
Tim Edelweis (fiktif): 3 dari 7 butir terpenuhi
  - belum: sidik kandidat dicatat dan data uji dibuka paling banyak satu kali -> catat sidik; jelaskan pembukaan data uji
  - belum: ada pembanding sederhana di samping model -> tambah tebakan mayoritas dan satu aturan tulisan tangan
  - belum: angka hasil disertai ukuran ketidakpastian -> tambah sebaran atau selang kasar
  - belum: sasaran lama dilaporkan bila sasaran diubah, dengan catatan perubahan -> laporkan keduanya dan tulis catatan perubahan
```

Baca hasilnya. Paket Dahlia memenuhi tujuh butir, Edelweis tiga; empat temuan Edelweis disertai tindakan yang dapat dikerjakan. Namun tujuh dari tujuh berarti **ada**, bukan **benar**: program hanya memeriksa bahwa pembanding ada, tidak apakah angkanya cocok dengan laporan. Pengulas yang baik menghitung ulang satu angka. Contohnya, bila Edelweis menulis recall 0,65 dengan 21 terdeteksi dan 15 terlewat, pengulas menghitung 21 dibagi 36, yaitu 0,58, dan angka itu tidak cocok.

**Catatan ulasan** untuk Edelweis, contoh: "Sudah baik: tabel per jenis menulis jumlah baris di tiap kelompok (laporan uji, bagian 3). Perlu diperbaiki: tidak ada pembanding, jadi angka recall tak dapat dinilai; sidik kandidat juga tidak ada. Langkah berikutnya: tambah tebakan mayoritas dan aturan tulisan tangan, catat sidik di README, dan tulis berapa kali data uji dibuka." Tiap kalimat menunjuk bagian paket dan menilai karya. Penerima ulasan membalas dengan satu tindakan per temuan atau alasan tidak mengerjakannya, dan mencatat perubahan di README.

## Daftar periksa

Centang tiap langkah dengan bukti.

- [ ] Paket dibaca dengan urutan README, laporan uji, kartu model.
- [ ] Ketujuh butir diperiksa dan temuan ditulis dengan tindakan.
- [ ] Satu angka dihitung ulang dari jumlah mentahnya.
- [ ] Catatan ulasan memuat tiga bagian, masing-masing menunjuk bukti.
- [ ] Penerima mencatat tindakan atau alasan untuk tiap temuan; log AI diisi.

## Umpan balik sejawat

Pada modul ini, umpan balik sejawat adalah keluaran utama: ulas tim lain dengan format tiga bagian, lalu minta ulasan atas ulasanmu: apakah tiap kalimat menunjuk bukti dan menilai karya, bukan orang?

## Latihan bercampur

1. Paket Edelweis menulis recall 0,65 dengan 21 terdeteksi dan 15 terlewat. Hitung ulang dan tulis temuan satu kalimat (`AI: tanpa AI`).
2. Dari `d-xii2-m9`: tambahkan satu butir pada daftar `PERIKSA` untuk bagian Di luar cakupan, lalu sebut apa yang tetap tak dapat diperiksanya (`AI: boleh`).
3. Dari `d-xii2-m3`: tulis dua pertanyaan pengulas tentang catatan kualitas data tim lain (`AI: boleh`).

## Ulang berjarak

Pertanyaan ini muncul lagi di `Ingat kembali` modul `d-xii2-m12` (sekitar 1 minggu lagi), `d-xii2-m13` (sekitar 2 minggu), dan `D-XII2-M14` (sekitar 3 minggu). Jawab sekarang lalu simpan.

1. Mengapa ulasan menunjuk bagian paket sebagai bukti, bukan menilai orangnya?
2. Apa yang tidak dapat diperiksa oleh daftar periksa ulasan otomatis, dan apa yang dilakukan pengulas?
3. Bagaimana menghitung ulang recall dari jumlah terdeteksi dan terlewat untuk mengecek angka laporan?

## Kesalahan umum

- **"Tujuh dari tujuh berarti paket benar."** Itu berarti butirnya ada, bukan angkanya cocok.
- **"Ulasan harus menemukan kesalahan sebanyak mungkin."** Tiga bagian yang menunjuk bukti lebih berguna daripada daftar panjang.
- **"Ulasan menilai kecerdasan tim."** Ulasan menilai paket pada saat ini.
- **"Ringkasan AI cukup sebagai ulasan."** Baca sendiri bagian yang kamu nilai.

## Cek mandiri

- [ ] Saya dapat membaca paket tim lain dengan urutan yang tetap.
- [ ] Saya dapat menghitung ulang satu angka laporan.
- [ ] Saya dapat menulis ulasan tiga bagian yang menunjuk bukti.
- [ ] Saya dapat menjawab ulasan dengan tindakan atau alasan.
- [ ] Saya mencatat pemakaian AI bila memakainya.

## Kunci dan petunjuk

**Ingat kembali.** 1: asal dan asumsi pembangkit, arti label, ukuran dan jumlah baris tiap kelompok, hasil pemeriksaan dan keputusan, pembagian latih dan uji, sidik berkas dan versi pustaka, serta batas; sidik berkas yang sama menunjukkan berkas tak berubah. 2: karena data uji yang dipakai memilih tak lagi jujur; laporkan apa adanya, lalu buat rilis kandidat baru dengan data uji baru. 3: kelompok kecil membuat angka goyah; jumlah baris memberi ukuran kepercayaan. 4: satu yang sudah baik, satu yang perlu diperbaiki, satu langkah berikutnya; menunjuk bukti agar dapat diperiksa dan tidak menjadi serangan pribadi.

**Rencana sprint.** Tebakan wajar: Dahlia tujuh, Edelweis tiga; tujuh dari tujuh tidak menjamin klaimnya benar.

**Daftar periksa.** Dinilai dari bukti: catatan ulasan dan hitungan ulang.

**Latihan bercampur.** 1: 21 dibagi (21 + 15) sama dengan 0,58, bukan 0,65; temuan contoh: "recall di laporan 0,65 tak cocok dengan jumlah mentahnya (21 dari 36 = 0,58); periksa angka atau jumlahnya." 2: contoh butir: ("luar_cakupan", "kartu memuat bagian di luar cakupan", "tulis di kartu"); tetap tak terperiksa: apakah isinya masuk akal. 3: contoh: "apa yang membuktikan berkas tak berubah sejak diperiksa?"; "kolom mana yang dibuang, berapa baris, dan mengapa?"

**Ulang berjarak.** 1: agar temuan dapat dicek dan tidak menjadi serangan pribadi; karya dapat diperbaiki, orang tidak dinilai. 2: kebenaran angka dan masuk akalnya klaim; pengulas menghitung ulang dan membaca. 3: recall = terdeteksi dibagi (terdeteksi ditambah terlewat); bandingkan dengan angka di laporan.

## Langkah berikutnya

Modul berikut: `d-xii2-m12` (presentasi). Bacaan lanjut: bagian *Common pitfalls and recommended practices* pada dokumentasi `scikit-learn` dan makalah Kapoor dan Narayanan tentang kebocoran data (di `Rujukan`).
