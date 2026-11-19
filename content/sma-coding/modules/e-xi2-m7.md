## Untuk siapa modul ini

Modul ini untuk murid kelas XI jalur E (komputasi kuantum), minggu `E-XI2-M7` silabus v1.4: keadaan kuantum tidak dapat digandakan, dan teleportasi (konsep). Prasyarat: modul `e-xi2-m6` (reversibilitas). Alat: kertas, kalkulator, dan Python 3 murni opsional; hitungan tangan lebih dulu.

Modul ini berstatus DRAF: karangan penyusun, belum ditinjau pemilik. Jalur E adalah pengayaan di luar rumusan CP; minggu ini tanpa irisan pengayaan, jadi modul ini tidak dihitung memenuhi butir CP mana pun.

Aturan AI jalur ini: AI generatif boleh dipakai dengan etika dan dicatat, tanpa data pribadi, kata sandi, atau tugas bernilai pada permintaanmu, dan tanpa akun wajib. Saran: jawab dulu sendiri, baru minta penjelasan atau petunjuk bertahap. Setiap soal `Latihan` bertanda `AI: boleh` atau `AI: tanpa AI`.

Catatan untuk guru: langkah dan biaya teleportasi (satu e-bit, dua bit klasik), bahwa yang berpindah adalah informasi kuantum, keadaan Alice sesudahnya `|0>` atau `|1>`, teorema *no-cloning*, dan bahwa mengambil informasi dari keadaan tak dikenal umumnya mengganggunya dibaca penyusun dari halaman IBM Quantum Learning "Quantum teleportation", per 2026-11-19. Bukti kelinearan di modul ini adalah penyajian penyusun atas argumen baku, diperiksa angka untuk satu keadaan; bukan kutipan halaman itu. Tanpa klaim tentang eksperimen nyata. Simulator memperlihatkan semua amplitudo; pada perangkat nyata hanya hasil bacaan `[belum terverifikasi]` di luar halaman itu.

## Ingat kembali

Jawab dari ingatan, baru cek di bagian kunci.

1. Mengapa hasil pengukuran satu qubit terjerat tidak dapat dipakai mengirim pesan lebih cepat dari cahaya? (dari `e-xi2-m3`)
2. Bagaimana membangun keadaan tiga qubit `(h, 0, 0, 0, 0, 0, 0, h)` dari `|000>`? (dari `e-xi2-m4`)
3. Apa arti gerbang reversibel? Beri satu contoh gerbang kuantum dan satu gerbang klasik yang reversibel. (dari `e-xi2-m6`)
4. Apa yang dapat dilakukan simulator pada vektor keadaan yang tidak dapat dilakukan pada qubit nyata? (dari `e-xi1-m13`)

## Tujuan

Setelah modul ini kamu dapat:

- menjelaskan mengapa CNOT hanya menyalin keadaan dasar, dengan argumen kelinearan, dan menyebut bahwa tidak ada gerbang yang menyalin keadaan sembarang;
- menelusuri sirkuit teleportasi pada simulator dan menunjukkan keadaan Bob sebelum dan sesudah koreksi;
- menjelaskan mengapa teleportasi tidak mengirim informasi lebih cepat dari cahaya dan tidak menyisakan salinan.

## Prediksi dulu

Qubit pertama `(0,6 ; 0,8)`, qubit kedua `|0>`, lalu CNOT. Tebak dan tulis: (1) apakah hasilnya salinan `(0,6 ; 0,8)` kali `(0,6 ; 0,8)`; (2) apakah Alice cukup mengirim dua bit klasik kepada Bob agar Bob memegang qubit yang sama, tanpa pasangan terjerat; (3) setelah teleportasi, apakah Alice masih memegang keadaan semula.

## Contoh terselesaikan

**CNOT menyalin keadaan dasar.** `|x>|0>` menjadi `|x>|x>` untuk x = 0 dan 1. Salinan yang kita inginkan dari `(a, b)` adalah `(a, b)` kali `(a, b) = (a², ab, ab, b²)`. CNOT pada `(a, b)` kali `|0>` memberi `(a, 0, 0, b)`. Untuk `(0,6 ; 0,8)`: hasil CNOT `(0,6 ; 0 ; 0 ; 0,8)`, salinan yang diinginkan `(0,36 ; 0,48 ; 0,48 ; 0,64)`. Keduanya berbeda; hasil CNOT terjerat (`a*d = 0,48`, `b*c = 0`).

**Argumen kelinearan.** Misalkan gerbang U menyalin dua keadaan dasar: `U|0, 0> = |0, 0>` dan `U|1, 0> = |1, 1>`. Perkalian matriks linear: `U(a|0, 0> + b|1, 0>) = a|0, 0> + b|1, 1>`. Itu `(a, 0, 0, b)`, sedangkan salinan `(a², ab, ab, b²)` punya `ab` tidak nol bila `a` dan `b` tidak nol. Jadi tidak ada U yang menyalin keadaan dasar sekaligus semua superposisinya. Teorema *no-cloning* yang disebut halaman IBM menyatakan hal yang lebih umum: tidak ada cara menyalin keadaan kuantum sembarang yang tidak diketahui. Simulator yang menyalin vektor dan membaca semua amplitudonya melakukan sesuatu yang tidak dapat dilakukan pada qubit nyata.

**Teleportasi.** Alice memegang qubit `Q` dengan keadaan tidak diketahui `(alfa, beta)` dan qubit `A`; Bob memegang qubit `B`; `A` dan `B` berada pada keadaan Bell `(h, 0, 0, h)`. Alice hanya dapat mengirim bit klasik. Langkahnya:

1. Alice memasang CNOT dengan `Q` sebagai kontrol dan `A` sebagai target, lalu H pada `Q`.
2. Alice membaca `Q` dan `A`, mendapat dua bit, dan mengirimnya kepada Bob lewat kanal klasik.
3. Bob memasang X pada `B` bila hasil `A` bernilai 1, lalu Z pada `B` bila hasil `Q` bernilai 1.

Hasilnya: `B` berada pada `(alfa, beta)`. Keempat hasil Alice masing-masing berpeluang 0,25, tidak bergantung pada `(alfa, beta)`. Alice tidak lagi memegang keadaan semula: `Q` menjadi `|0>` atau `|1>` karena dibaca, dan pasangan terjerat terpakai. Yang berpindah adalah informasi kuantum, bukan materi.

**Tidak lebih cepat dari cahaya.** Sebelum dua bit klasik tiba, Bob tidak tahu koreksinya. Program mencetak peluang Bob membaca 0 sebelum koreksi: selalu 0,5 untuk `(alfa, beta)` mana pun, jadi pembacaan Bob tidak memberi tahu apa pun tentang keadaan itu. Informasi baru "tiba" bersama dua bit klasik, yang dibatasi kecepatan kanal biasa.

Blok pertama mencoba menyalin dengan CNOT:

```python
def cnot_dua(v):
    """CNOT pada vektor dua qubit (00, 01, 10, 11); qubit pertama kontrol."""
    return [v[0], v[1], v[3], v[2]]


def tulis(v):
    return "(" + ", ".join(f"{x:.4f}" for x in v) + ")"


a, b = 0.6, 0.8

# CNOT menyalin keadaan dasar: |x>|0> menjadi |x>|x>.
print("|0>|0> ->", tulis(cnot_dua([1, 0, 0, 0])), "  salinan yang diinginkan:", tulis([1, 0, 0, 0]))
print("|1>|0> ->", tulis(cnot_dua([0, 0, 1, 0])), "  salinan yang diinginkan:", tulis([0, 0, 0, 1]))

# Keadaan (a, b) tensor |0>, lalu CNOT.
hasil = cnot_dua([a, 0, b, 0])
salinan = [a * a, a * b, b * a, b * b]  # (a, b) tensor (a, b), yang kita inginkan
print("hasil CNOT        :", tulis(hasil))
print("salinan diinginkan:", tulis(salinan))
print("hasil dapat difaktorkan (a*d = b*c)?", abs(hasil[0] * hasil[3] - hasil[1] * hasil[2]) < 1e-9)
```

Keluaran asli (dijalankan penyusun dengan `python3 -I`, Python 3.12):

```text
|0>|0> -> (1.0000, 0.0000, 0.0000, 0.0000)   salinan yang diinginkan: (1.0000, 0.0000, 0.0000, 0.0000)
|1>|0> -> (0.0000, 0.0000, 0.0000, 1.0000)   salinan yang diinginkan: (0.0000, 0.0000, 0.0000, 1.0000)
hasil CNOT        : (0.6000, 0.0000, 0.0000, 0.8000)
salinan diinginkan: (0.3600, 0.4800, 0.4800, 0.6400)
hasil dapat difaktorkan (a*d = b*c)? False
```

Blok kedua menelusuri teleportasi (fungsi gerbang disalin ringkas dari `e-xi2-m4`) untuk tiga qubit `Q, A, B`, `Q` paling kiri:

```python
from math import sqrt

h = 1 / sqrt(2)
H = [[h, h], [h, -h]]
N = 3  # tiga qubit: Q (yang dikirim), A (milik Alice), B (milik Bob); Q paling kiri


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


def sampai_alice(alfa, beta):
    """Keadaan Q kali Bell (A, B), lalu CNOT Q->A dan H pada Q."""
    v = [0.0] * 8
    for q, amp in ((0, alfa), (1, beta)):
        v[(q << 2) | 0b00] = amp * h  # Q = q, A B = 00
        v[(q << 2) | 0b11] = amp * h  # Q = q, A B = 11
    cnot(v, 0, 1)
    gerbang_satu(v, H, 0)
    return v


alfa, beta = 0.6, 0.8
v = sampai_alice(alfa, beta)
print("keadaan Q yang dikirim:", (alfa, beta))
for q in (0, 1):
    for a in (0, 1):
        dasar = (q << 2) | (a << 1)
        bob = [v[dasar], v[dasar | 1]]            # amplitudo B = 0 dan B = 1
        peluang = bob[0] ** 2 + bob[1] ** 2
        bob = [x / sqrt(peluang) for x in bob]    # keadaan Bob bila hasil Alice (q, a)
        sebelum = tuple(round(x, 4) for x in bob)
        if a == 1:                                # X bila hasil qubit A = 1
            bob = [bob[1], bob[0]]
        if q == 1:                                # Z bila hasil qubit Q = 1
            bob = [bob[0], -bob[1]]
        sesudah = tuple(round(x + 0.0, 4) for x in bob)
        print(f"hasil Alice {q}{a}: peluang {peluang:.2f}, Bob sebelum {sebelum}, sesudah koreksi {sesudah}")

# Sebelum pesan klasik tiba, peluang Bob membaca 0 tidak bergantung pada (alfa, beta).
for al, be in ((1.0, 0.0), (0.6, 0.8), (0.8, -0.6)):
    w = sampai_alice(al, be)
    p0 = sum(w[i] ** 2 for i in range(8) if i % 2 == 0)
    print(f"Q = {(al, be)}: P(Bob membaca 0 sebelum koreksi) = {p0:.4f}")
```

Keluaran asli (dijalankan penyusun dengan `python3 -I`, Python 3.12):

```text
keadaan Q yang dikirim: (0.6, 0.8)
hasil Alice 00: peluang 0.25, Bob sebelum (0.6, 0.8), sesudah koreksi (0.6, 0.8)
hasil Alice 01: peluang 0.25, Bob sebelum (0.8, 0.6), sesudah koreksi (0.6, 0.8)
hasil Alice 10: peluang 0.25, Bob sebelum (0.6, -0.8), sesudah koreksi (0.6, 0.8)
hasil Alice 11: peluang 0.25, Bob sebelum (-0.8, 0.6), sesudah koreksi (0.6, 0.8)
Q = (1.0, 0.0): P(Bob membaca 0 sebelum koreksi) = 0.5000
Q = (0.6, 0.8): P(Bob membaca 0 sebelum koreksi) = 0.5000
Q = (0.8, -0.6): P(Bob membaca 0 sebelum koreksi) = 0.5000
```

Bacaan hasilnya (`qa`: digit pertama hasil `Q`, kedua hasil `A`): Bob sebelum koreksi memegang keadaan berbeda, setelah koreksi selalu `(0,6 ; 0,8)`. Program menelusuri amplitudo tanpa memilih hasil acak.

## Contoh setengah jadi

Lengkapi (kunci di bagian akhir).

1. Salinan `(a, b)` kali `(a, b)` = `(a², ____, ____, b²)`; untuk `(0,8 ; -0,6)` = `(0,64 ; ____ ; ____ ; 0,36)`.
2. Hasil CNOT pada `(0,8 ; -0,6)` kali `|0>` = `(____ ; 0 ; 0 ; ____)`.
3. Lengkapi koreksi Bob:

```python setengah-jadi
if a == 1:                 # hasil qubit A
    bob = [bob[____], bob[____]]
if q == 1:                 # hasil qubit Q
    bob = [bob[0], ____ * bob[1]]
```

## Soal Parsons

Susun baris-baris di bawah (sudah diacak) menjadi koreksi Bob. Penjorokan sengaja dihilangkan.

```text
(a) if a == 1:
(b) bob = [bob[1], bob[0]]
(c) if q == 1:
(d) bob = [bob[0], -bob[1]]
```

## Latihan

1. **Dengan tangan.** (`AI: tanpa AI`) Hitung CNOT pada `(0,8 ; -0,6)` kali `|0>`, bandingkan dengan salinan `(0,64 ; -0,48 ; -0,48 ; 0,36)`, dan periksa produk atau terjerat.
2. **Koreksi.** (`AI: tanpa AI`) Pada teleportasi `(0,6 ; 0,8)`, hasil Alice `01` dan Bob memegang `(0,8 ; 0,6)`: gerbang apa dan hasilnya? Ulangi untuk hasil `11` dengan Bob `(-0,8 ; 0,6)`.
3. **Ubah keadaan.** (`AI: boleh`) Ubah `alfa, beta` menjadi `0,8` dan `-0,6`, jalankan, dan bandingkan keadaan Bob sesudah koreksi dengan yang dikirim. Apakah peluang hasil Alice berubah?
4. **Rancang dulu.** (`AI: boleh`) Tulis pseudocode aturan koreksi Bob dari dua bit `(q, a)`: gerbang apa, urutan apa.
5. **Catatan pemakaian AI (opsional).** Bila memakai asisten AI, catat alat, tujuan, garis besar perintah, bagian yang dipakai, dan cara memeriksanya.

## Latihan bercampur

1. Bagaimana membangun keadaan Bell `(h, 0, 0, h)` pasangan `A` dan `B` dari `|00>`, dan apa peluang tiap hasil bila dibaca? (`e-xi2-m2`)
2. Keempat hasil Alice masing-masing berpeluang 0,25. Pada 1000 shot, berapa kali tiap hasil diharapkan, dan berapa simpangan wajarnya? (`e-xi1-m7`)
3. Apakah koreksi Bob (X lalu Z) reversibel? Apakah pembacaan Alice reversibel? Jelaskan. (`e-xi2-m6`)

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `e-xi2-m8` (satu minggu lagi), `e-xi2-m10` (sekitar tiga minggu lagi), dan `e-xii1-m1` (sekitar delapan minggu lagi). Jawab sekarang lalu simpan.

1. Mengapa teleportasi tidak melanggar batas kecepatan cahaya?
2. Mengapa CNOT hanya menyalin keadaan dasar `|0>` dan `|1>`, bukan keadaan sembarang?
3. Apa yang dipindahkan dan apa yang dikirim lewat kanal klasik pada teleportasi?

## Kesalahan umum

- **"Teleportasi memindahkan benda seperti di film."** Yang dipindahkan adalah informasi kuantum, bukan materi.
- **"Teleportasi menggandakan qubit."** Keadaan Alice rusak karena dibaca; hanya ada satu salinan, di Bob.
- **"Teleportasi lebih cepat dari cahaya."** Bob memerlukan dua bit klasik; sebelum itu pembacaannya acak 50:50.
- **"CNOT menyalin qubit."** Hanya keadaan dasar; superposisi menjadi keadaan terjerat.
- **"Simulator membuktikan keadaan dapat disalin."** Simulator menyalin vektor di memori; qubit nyata tidak punya vektor yang dapat dibaca utuh.

## Cek mandiri

- [ ] Saya dapat menunjukkan bahwa CNOT tidak menyalin `(0,6 ; 0,8)` dan menyebut argumen kelinearannya.
- [ ] Saya dapat menyebut tiga langkah teleportasi.
- [ ] Saya dapat menjelaskan mengapa teleportasi tidak lebih cepat dari cahaya.
- [ ] Saya mencatat pemakaian AI bila saya memakainya.

## Kunci dan petunjuk

**Ingat kembali.** 1: peluang hasil qubit kedua tidak bergantung pada apa yang dilakukan atau diukur pada qubit pertama, dan hasil pertama acak sehingga tidak dapat dipilih; korelasi hanya terlihat setelah membandingkan lewat kanal biasa. 2: H pada qubit 0, lalu CNOT dari qubit 0 ke 1, lalu CNOT dari qubit 1 ke 2. 3: operasi yang dapat dibalik tanpa kehilangan informasi, yaitu ada operasi kebalikan; gerbang kuantum: X, H, atau CNOT; gerbang klasik: Toffoli (atau NOT). 4: menyalin vektor keadaan dan membaca seluruh amplitudo kapan saja; pada qubit nyata hanya hasil pembacaan yang diperoleh (`[belum terverifikasi]`, lihat catatan guru).

**Prediksi dulu.** (1) bukan: `(0,6 ; 0 ; 0 ; 0,8)` lawan `(0,36 ; 0,48 ; 0,48 ; 0,64)`; (2) tidak cukup: halaman IBM menyatakan bahwa mengirim qubit hanya lewat komunikasi klasik tidak mungkin, sehingga teleportasi memakai satu pasangan terjerat ditambah dua bit klasik; (3) tidak: `Q` menjadi `|0>` atau `|1>` karena dibaca.

**Contoh setengah jadi.** 1: `ab` dan `ab`; `-0,48` dan `-0,48`. 2: `0,8` dan `-0,6`. 3: `bob[1], bob[0]` (kedua komponen bertukar); `-1 * bob[1]`.

**Soal Parsons.** a, b, c, d.

**Latihan.** 1: hasil CNOT `(0,8 ; 0 ; 0 ; -0,6)`; salinan `(0,64 ; -0,48 ; -0,48 ; 0,36)`; berbeda; `a*d = 0,8 x (-0,6) = -0,48` dan `b*c = 0`, tidak sama, jadi terjerat. 2: hasil `01` berarti `Q = 0` dan `A = 1`: X, memberi `(0,6 ; 0,8)`. Hasil `11` berarti `Q = 1` dan `A = 1`: X memberi `(0,6 ; -0,8)`, lalu Z memberi `(0,6 ; 0,8)`. 3: untuk `(0,8 ; -0,6)`, Bob sesudah koreksi `(0,8 ; -0,6)` pada keempat hasil; peluang tiap hasil Alice tetap 0,25 dan peluang Bob membaca 0 sebelum koreksi 0,5 (keluaran program). 4: contoh: `jika bit A = 1, pasang X; lalu jika bit Q = 1, pasang Z`. 5: opsional.

**Latihan bercampur.** 1: H pada qubit pertama dari `|00>`, lalu CNOT: `(h, 0, 0, h)`; `00` dan `11` masing-masing 0,5. 2: harapan 250; simpangan akar(1000 x 0,25 x 0,75) = akar 187,5, kira-kira 13,7. 3: koreksi Bob reversibel (X dan Z gerbang uniter; masing-masing kebalikan dirinya sendiri); pembacaan Alice tidak reversibel (keadaan awal tidak dapat dipulihkan dari `|0>` atau `|1>`).

**Ulang berjarak.** 1: Bob memerlukan dua bit klasik dari Alice untuk memilih koreksi; sebelum itu pembacaannya 50:50 tidak bergantung pada keadaan yang dikirim. 2: untuk `|x>|0>` hasilnya `|x>|x>`; untuk superposisi `(a, b)` hasilnya `(a, 0, 0, b)`, bukan `(a², ab, ab, b²)`; kelinearan melarang salinan umum. 3: dipindahkan: informasi kuantum keadaan `Q` (bukan materi); dikirim lewat kanal klasik: dua bit hasil bacaan Alice; keadaan Alice sendiri hilang.

## Langkah berikutnya

Modul berikut: `e-xi2-m8` (pengayaan: permainan CHSH): membandingkan strategi klasik dan kuantum secara simulasi. Bacaan pendamping: `e-xi2-m2` dan `e-xi2-m3` (keadaan Bell dan pengukurannya).
