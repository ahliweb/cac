## Untuk siapa modul ini

Modul ini untuk murid kelas XI jalur E (komputasi kuantum), minggu `E-XI2-M13` silabus v1.4: proyek mini semester 2, yaitu menyajikan satu fenomena (Bell, teleportasi, atau Deutsch-Jozsa) lewat simulasi dan poster, dikerjakan berkelompok. Prasyarat: modul `e-xi2-m12`; modul `e-xi2-m2`, `e-xi2-m7`, dan `e-xi2-m4` (simulator n qubit) sesuai fenomena yang kamu pilih. Alat: kertas, kalkulator, simulatormu atau program Python 3 murni dari modul sebelumnya (tanpa akun).

Modul ini berstatus DRAF: karangan penyusun, belum ditinjau pemilik. Jalur E adalah pengayaan di luar rumusan CP; minggu ini tanpa irisan pengayaan, jadi modul ini tidak dihitung memenuhi butir CP mana pun. Jangan menaruh nama lengkap, foto, atau suara murid pada poster atau berkas; pakai nama peran.

Aturan AI jalur ini: AI generatif boleh dipakai dengan etika dan dicatat, tanpa data pribadi, kata sandi, atau tugas bernilai pada permintaanmu, dan tanpa akun wajib. Saran: tulis rencana dan prediksimu dulu, baru minta petunjuk bertahap; kode buatan AI kamu baca, jalankan, dan uji. Catat pemakaian AI pada Daftar periksa.

## Ingat kembali

Jawab dari ingatan, baru cek di bagian kunci.

1. Berapa fungsi Boolean dari 2 bit ke 1 bit, dan berapa yang konstan, seimbang, dan bukan keduanya? (dari `e-xi2-m10`)
2. Apa janji (promise) pada masalah Deutsch-Jozsa, dan apa yang terjadi bila fungsinya bukan konstan maupun seimbang? (dari `e-xi2-m12`)
3. Apa beda fase global dan fase relatif, dan mana yang mengubah peluang? (dari `e-xi2-m5`)

## Tujuan

Setelah modul ini kamu dapat:

- menulis rencana proyek dengan pertanyaan, prediksi sebelum menjalankan, dan kriteria selesai;
- menguji simulasimu dengan tiga pemeriksaan sebelum mempercayai hasilnya;
- menyusun poster yang menyatakan batas klaim dengan jujur.

Keluaran yang diminta silabus: simulasi dan poster.

## Rencana proyek

Pilih satu fenomena: keadaan Bell (`e-xi2-m2`, `e-xi2-m3`), teleportasi (`e-xi2-m7`), atau Deutsch-Jozsa (`e-xi2-m12`). Sebelum menulis kode, tulis: pertanyaan, prediksi angka, cara memeriksa, kriteria selesai, pembagian peran, dan batas klaim. Contoh rencana untuk Bell (satu halaman):

- **Pertanyaan.** Seberapa sering dua qubit terjerat terbaca sama, dan apakah hasil `01` dan `10` pernah muncul?
- **Prediksi (ditulis sebelum menjalankan).** `P(00) = P(11) = 0,5`; `01` dan `10` tidak pernah. Pada 1000 shot, harapan 500 untuk `00`, simpangan wajar 15,8, sehingga tiga simpangan kira-kira 47.
- **Cara.** Simulator: H pada qubit 0, lalu CNOT 0 ke 1; baca 1000 shot dengan benih tetap.
- **Pemeriksaan.** Jumlah kuadrat 1; vektor sama dengan hitungan tangan; hasil shot dalam tiga simpangan.
- **Kriteria selesai.** Ketiga pemeriksaan lolos, dan poster memuat sirkuit, tabel prediksi lawan hasil, serta keluaran asli.
- **Peran.** Peran A kode, Peran B hitungan tangan, Peran C poster; bergantian meninjau.
- **Batas klaim.** Simulasi di komputer klasik, bukan perangkat nyata; tidak ada klaim komunikasi atau kecepatan; dua amplop bit acak juga memberi "selalu sama" (`e-xi2-m3`, `e-xi2-m8`).

Teleportasi: prediksi keempat hasil Alice masing-masing 0,25 dan keadaan Bob sesudah koreksi sama dengan yang dikirim. Deutsch-Jozsa: prediksi `P(000)` 1 untuk konstan dan 0 untuk seimbang, serta apa yang terjadi di luar janji.

```python
import random
from math import sqrt

h = 1 / sqrt(2)
H = [[h, h], [h, -h]]
N = 2


def gerbang_satu(v, g, k):
    geser = N - 1 - k
    for i in range(len(v)):
        if (i >> geser) & 1 == 0:
            j = i | (1 << geser)
            a, b = v[i], v[j]
            v[i] = g[0][0] * a + g[0][1] * b
            v[j] = g[1][0] * a + g[1][1] * b


def cnot(v, kontrol, target):
    gk, gt = N - 1 - kontrol, N - 1 - target
    for i in range(len(v)):
        if (i >> gk) & 1 == 1 and (i >> gt) & 1 == 0:
            j = i | (1 << gt)
            v[i], v[j] = v[j], v[i]


def bangun_bell():
    v = [1.0, 0.0, 0.0, 0.0]
    gerbang_satu(v, H, 0)
    cnot(v, 0, 1)
    return v


def periksa(v, harapan, shot, benih):
    """Tiga pemeriksaan proyek: normalisasi, kecocokan dengan hitungan tangan, dan simpangan."""
    jumlah = sum(x * x for x in v)
    print(f"1. jumlah kuadrat = {jumlah:.4f} (harus 1)")
    cocok = all(abs(v[i] - harapan[i]) < 1e-9 for i in range(len(v)))
    print("2. sama dengan hitungan tangan:", cocok)
    rng = random.Random(benih)
    hitung = [0] * len(v)
    for _ in range(shot):
        r, kum = rng.random(), 0.0
        for i, x in enumerate(v):
            kum += x * x
            if r < kum or i == len(v) - 1:
                hitung[i] += 1
                break
    print("   hasil", hitung, "dari", shot, "shot")
    for i, x in enumerate(v):
        harap = shot * x * x
        sigma = sqrt(shot * x * x * (1 - x * x))
        selisih = abs(hitung[i] - harap)
        batas = 3 * sigma
        print(f"3. komponen {i}: harapan {harap:.1f}, simpangan {sigma:.1f}, selisih {selisih:.1f}, "
              f"dalam 3 simpangan: {selisih <= batas}")


periksa(bangun_bell(), [h, 0, 0, h], 1000, 2026)
```

Keluaran asli (dijalankan penyusun dengan `python3 -I`, Python 3.12):

```text
1. jumlah kuadrat = 1.0000 (harus 1)
2. sama dengan hitungan tangan: True
   hasil [495, 0, 0, 505] dari 1000 shot
3. komponen 0: harapan 500.0, simpangan 15.8, selisih 5.0, dalam 3 simpangan: True
3. komponen 1: harapan 0.0, simpangan 0.0, selisih 0.0, dalam 3 simpangan: True
3. komponen 2: harapan 0.0, simpangan 0.0, selisih 0.0, dalam 3 simpangan: True
3. komponen 3: harapan 500.0, simpangan 15.8, selisih 5.0, dalam 3 simpangan: True
```

Pemeriksaan lolos hanya untuk kasus yang diuji; ia tidak membuktikan program benar untuk semua masukan.

## Daftar periksa

- [ ] Rencana tertulis, dan prediksi angka dicatat sebelum program dijalankan.
- [ ] Pemeriksaan 1: jumlah kuadrat amplitudo sama dengan 1.
- [ ] Pemeriksaan 2: vektor sama dengan hitungan tangan untuk kasus kecil.
- [ ] Pemeriksaan 3: hasil shot dalam tiga simpangan wajar dari harapan; bila di luar, cari penyebabnya lebih dulu, jangan melebarkan ambang.
- [ ] Uji gagal: sengaja rusak satu baris (misalnya hapus CNOT) dan pastikan pemeriksaan menangkapnya.
- [ ] Log pemakaian AI bila dipakai: alat, tujuan, garis besar perintah, bagian yang dipakai, dan cara memeriksanya; kode buatan AI dibaca dan diuji.
- [ ] Privasi: tanpa nama lengkap, foto, atau suara murid pada poster dan berkas; pakai nama peran.
- [ ] Poster memuat batas klaim: simulasi bukan perangkat nyata, tanpa klaim kecepatan atau komunikasi lebih cepat dari cahaya; keluaran asli ditempel.
- [ ] Sumber yang dipakai ditautkan, tanpa menyalin teks halamannya.

## Umpan balik sejawat

Tukar proyek dengan kelompok lain dan beri ulasan: satu yang sudah baik, satu yang perlu diperbaiki, satu langkah berikutnya. Periksa apakah prediksi ditulis sebelum hasil, apakah angka poster sama dengan keluaran program, dan apakah batas klaim jujur. Nilai karyanya, bukan orangnya.

## Latihan bercampur

1. Pada teleportasi `(0,8 ; 0,6)`, berapa peluang tiap hasil Alice, dan apa keadaan Bob sesudah koreksi? (`e-xi2-m7`)
2. Simulasi Deutsch-Jozsa n = 3 untuk `f` seimbang melaporkan `P(000) = 0,5`. Apa dua penyebab yang kamu periksa lebih dulu? (`e-xi2-m12`, `e-xi1-m13`)
3. Tunjukkan bahwa `(0,6 ; 0 ; 0 ; 0,8)` tidak dapat difaktorkan. (`e-xi2-m2`)

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `e-xi2-m14` (satu minggu lagi), `e-xii1-m2` (sekitar tiga minggu lagi), dan `e-xii1-m7` (sekitar delapan minggu lagi). Jawab sekarang lalu simpan.

1. Apa tiga hal yang kamu cek sebelum mempercayai hasil simulasi proyekmu?
2. Bagaimana membandingkan hasil 1000 shot dengan peluang hitungan tangan memakai simpangan wajar?
3. Mengapa keunggulan satu query lawan 2^(n-1)+1 query tidak berarti komputer kuantum lebih cepat untuk semua masalah?

## Kesalahan umum

- **"Hasil cocok dengan harapan berarti kodenya benar."** Hanya untuk kasus yang diuji; karena itu ada uji gagal yang disengaja.
- **"Lebarkan ambang tiga simpangan supaya lolos."** Hasil di luar ambang adalah petunjuk adanya galat; cari penyebabnya.
- **"Poster boleh menulis komputer kuantum lebih cepat."** Simulasi di komputer klasik tidak mendukung klaim kecepatan atau klaim tentang perangkat nyata.

## Cek mandiri

- [ ] Saya menulis rencana dan prediksi sebelum menjalankan program.
- [ ] Saya menjalankan tiga pemeriksaan dan satu uji gagal.
- [ ] Poster saya menyatakan batas klaim dan memuat keluaran asli.
- [ ] Saya memberi dan menerima umpan balik sejawat.
- [ ] Saya mencatat pemakaian AI bila saya memakainya.

## Kunci dan petunjuk

**Ingat kembali.** 1: 16 fungsi; 2 konstan, 6 seimbang, 8 bukan keduanya. 2: janji: `f` konstan atau seimbang; di luar janji hasilnya tidak menentukan (satu nilai 1 dari delapan memberi `P(000) = 0,5625`). 3: fase global adalah faktor yang sama pada seluruh vektor dan tidak mengubah peluang apa pun; fase relatif (beda arah antar komponen) mengubah peluang lewat interferensi setelah gerbang seperti H.

**Rencana proyek.** Tidak ada satu jawaban benar. Rencana yang baik memuat pertanyaan yang dapat diuji, prediksi angka sebelum menjalankan, kriteria selesai, dan batas klaim. Uji gagal: tanpa CNOT vektornya `(h, 0, h, 0)`; jumlah kuadrat masih 1, tetapi pemeriksaan 2 menjadi `False` (keluaran penyusun), jadi pemeriksaan 2 yang menangkap galat itu, bukan pemeriksaan 1.

**Daftar periksa.** Poster yang baik menempelkan keluaran asli; tiga simpangan untuk 1000 shot Bell kira-kira 47 (`3 x akar(1000 x 0,25)` = 47,4).

**Umpan balik sejawat.** Contoh baik: "Prediksi ditulis lebih dulu dan angkanya cocok." Perlu diperbaiki: "Batas klaim belum menyebut bahwa ini simulasi." Langkah berikutnya: "Tambahkan uji gagal."

**Latihan bercampur.** 1: tiap hasil Alice 0,25; keadaan Bob sesudah koreksi `(0,8 ; 0,6)` untuk keempat hasil (keluaran penyusun). 2: oracle atau urutan qubit salah (qubit bantu tidak dimulai dari `|1>`, atau tidak diberi H), atau H pada qubit query terlewat; bandingkan dengan hitungan tangan n = 1 atau 2. 3: `a*d = 0,6 x 0,8 = 0,48` dan `b*c = 0 x 0 = 0`; tidak sama, jadi terjerat.

**Ulang berjarak.** 1: jumlah kuadrat 1 (normalisasi); sama dengan hitungan tangan untuk kasus kecil; hasil shot dalam tiga simpangan wajar dari harapan. 2: hitung harapan `shot x peluang` dan simpangan `akar(shot x p x (1 - p))`, lalu lihat selisih dalam satuan simpangan; lebih dari kira-kira tiga simpangan mencurigakan. 3: itu hitungan jumlah query dalam model dengan oracle yang dianggap tersedia, hanya untuk masalah dengan janji tertentu, dan terhadap algoritma klasik pasti benar; klasik acak hampir selalu benar dengan sedikit query.

## Langkah berikutnya

Modul berikut: `e-xi2-m14` (asesmen dan refleksi semester 2). Bacaan pendamping: modul fenomena yang kamu pilih (`e-xi2-m2`, `e-xi2-m7`, atau `e-xi2-m12`).
