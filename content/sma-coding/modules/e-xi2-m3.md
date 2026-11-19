## Untuk siapa modul ini

Modul ini untuk murid kelas XI jalur E (komputasi kuantum), minggu `E-XI2-M3` silabus v1.4: mengukur qubit terjerat. Prasyarat: modul `e-xi2-m2`. Alat: kertas, kalkulator, Quirk (tanpa akun), dan Python 3 murni opsional; hitungan tangan lebih dulu.

Modul ini berstatus DRAF: karangan penyusun, belum ditinjau pemilik. Jalur E adalah pengayaan di luar rumusan capaian pembelajaran (CP); minggu ini tidak punya irisan pengayaan, jadi modul ini tidak dihitung memenuhi butir CP mana pun.

Aturan AI jalur ini: AI generatif boleh dipakai dengan etika dan dicatat, tanpa data pribadi, kata sandi, atau tugas bernilai pada permintaanmu, dan tanpa akun wajib. Saran: jawab dulu sendiri, baru minta penjelasan atau petunjuk bertahap. Setiap soal `Latihan` bertanda `AI: boleh` atau `AI: tanpa AI`.

Catatan untuk guru: aturan membaca sebagian sistem (peluang dari kuadrat komponen yang cocok, keadaan sesudahnya dinormalkan) serta pernyataan bahwa peluang hasil satu sistem tidak bergantung pada pengukuran sistem lain dibaca penyusun dari halaman IBM Quantum Learning "Quantum information" (multiple systems), per 2026-11-19. Bahwa bit acak klasik yang dibagi dapat meniru korelasi "selalu sama" pada pembacaan 0/1 adalah hasil program di modul ini; pembeda sebenarnya disajikan di `E-XI2-M8` dan tidak dibuktikan di sini. Dokumentasi Python menjamin `random()` konsisten untuk benih sama.

## Ingat kembali

Jawab dari ingatan, baru cek di bagian kunci.

1. Bagaimana membangun keadaan Bell `(h, 0, 0, h)` dari `|00>`, dan apa peluang tiap hasil dua bit? (dari `e-xi2-m2`)
2. Mengapa H, baca, H memberi peluang 0 sebesar 0,5 sedangkan H, H memberi 1? (dari `e-xi1-m9`)
3. Jika seribu shot dari peluang 0,5 memberi 515 hasil 0, apakah itu wajar? Beri kisarannya. (dari `e-xi1-m11`)

## Tujuan

Setelah modul ini kamu dapat:

- menghitung peluang hasil dua bit dan korelasinya dari keadaan Bell;
- menghitung keadaan qubit kedua setelah qubit pertama dibaca, untuk keadaan terjerat dan keadaan produk;
- menjelaskan mengapa hasil qubit terjerat tidak dapat dipakai mengirim pesan lebih cepat dari cahaya;
- membandingkan histogram keadaan terjerat dan produk dari simulasi seribu shot.

## Prediksi dulu

Keadaan Bell `(h, 0, 0, h)` dibaca 1000 shot. Tebak dan tulis: (1) hasil apa yang muncul dan berapa kali; (2) bila hanya qubit pertama dibaca dan hasilnya 0, apa yang kamu ketahui tentang qubit kedua; (3) apakah itu berarti qubit pertama "mengirim pesan".

## Contoh terselesaikan

**Dua qubit dibaca.** Peluang hasil dua bit adalah kuadrat komponennya. Untuk `(h, 0, 0, h)`: `00` dan `11` masing-masing 0,5, `01` dan `10` nol. Pada produk `(h, h)` kali `(h, h)` keempat hasil 0,25. **Korelasi** berarti seberapa sering dua bit sama: pada keadaan Bell selalu, pada produk separuh waktu.

**Hanya qubit pertama dibaca.** Tulis `(a00, a01, a10, a11)`. Bila qubit pertama terbaca 0, peluangnya `a00² + a01²`, dan qubit kedua menjadi `(a00, a01)` dibagi akar peluang itu; bila terbaca 1, peluangnya `a10² + a11²` dan qubit kedua menjadi `(a10, a11)` yang dinormalkan. Untuk `(h, 0, 0, h)`: pertama 0 dengan peluang 0,5, lalu qubit kedua pasti `|0>`; pertama 1 dengan peluang 0,5, lalu qubit kedua pasti `|1>`. Untuk produk `(0,48 ; -0,36 ; 0,64 ; -0,48)`: hasil pertama 0 (peluang 0,36) maupun 1 (0,64) membuat qubit kedua `(0,8 ; -0,6)`. Jadi pada produk hasil qubit pertama tidak memengaruhi qubit kedua; pada keadaan terjerat, memengaruhi.

**Tidak ada pesan.** Peluang qubit kedua terbaca 1 pada `(h, 0, 0, h)` adalah `a01² + a11² = 0,5`. Bila pemilik qubit pertama memasang X, kita dapat `(0, h, h, 0)`; bila Z, `(h, 0, 0, -h)`; peluang qubit kedua terbaca 1 tetap 0,5. Pemilik qubit kedua melihat deret acak 50:50 apa pun yang dilakukan pemilik qubit pertama, dan hasil pertama pun acak sehingga bit yang "dikirim" tidak dapat dipilih. Korelasi baru tampak setelah kedua pihak **membandingkan catatan lewat kanal biasa**. Halaman IBM menyatakan hal serupa: peluang hasil satu sistem tidak bergantung pada apakah sistem lain diukur, sebab kalau bergantung, komunikasi lebih cepat dari cahaya mungkin.

**Satu peringatan jujur.** Dua amplop berisi salinan bit acak yang sama juga memberi hasil "selalu sama" (koin klasik di program). Pada pembacaan 0/1 saja, korelasi itu belum membedakan keadaan terjerat dari bit acak klasik yang dibagi; pembedanya ada pada pembacaan dengan cara lain, bahan `E-XI2-M8`.

```python
import random
from math import sqrt

h = 1 / sqrt(2)
rng = random.Random(2026)  # benih tetap: keluaran selalu sama
NAMA = ["00", "01", "10", "11"]


def ukur(v, shot):
    """Baca dua qubit sebanyak shot kali; kembalikan jumlah tiap hasil."""
    peluang = [x * x for x in v]
    hitung = {n: 0 for n in NAMA}
    for _ in range(shot):
        r = rng.random()
        total = 0.0
        for i, p in enumerate(peluang):
            total += p
            if r < total or i == 3:
                hitung[NAMA[i]] += 1
                break
    return hitung


def sama(hitung):
    """Jumlah shot dengan dua bit sama (00 atau 11)."""
    return hitung["00"] + hitung["11"]


bell = [h, 0, 0, h]
produk = [0.5, 0.5, 0.5, 0.5]

hitung_bell = ukur(bell, 1000)
hitung_produk = ukur(produk, 1000)
print("Bell     ", hitung_bell, "sama:", sama(hitung_bell))
print("produk   ", hitung_produk, "sama:", sama(hitung_produk))

# Dua bit acak yang dibagi (klasik): satu koin, salinannya diberikan ke dua pihak.
klasik = {n: 0 for n in NAMA}
for _ in range(1000):
    bit = "0" if rng.random() < 0.5 else "1"
    klasik[bit + bit] += 1
print("koin klasik", klasik, "sama:", sama(klasik))


def peluang_kedua_1(v):
    """Peluang qubit kedua terbaca 1 = P(01) + P(11)."""
    return v[1] ** 2 + v[3] ** 2


setelah_x = [0, h, h, 0]   # X pada qubit pertama dari Bell: (0, h, h, 0)
setelah_z = [h, 0, 0, -h]  # Z pada qubit pertama dari Bell: (h, 0, 0, -h)
print("P(kedua = 1), Bell          :", f"{peluang_kedua_1(bell):.4f}")
print("P(kedua = 1), setelah X     :", f"{peluang_kedua_1(setelah_x):.4f}")
print("P(kedua = 1), setelah Z     :", f"{peluang_kedua_1(setelah_z):.4f}")
```

Keluaran asli (dijalankan penyusun dengan `python3 -I`, Python 3.12):

```text
Bell      {'00': 495, '01': 0, '10': 0, '11': 505} sama: 1000
produk    {'00': 245, '01': 274, '10': 238, '11': 243} sama: 488
koin klasik {'00': 543, '01': 0, '10': 0, '11': 457} sama: 1000
P(kedua = 1), Bell          : 0.5000
P(kedua = 1), setelah X     : 0.5000
P(kedua = 1), setelah Z     : 0.5000
```

Bacaan hasilnya: pada Bell `01` dan `10` nol dan `sama` tepat 1000; 495 dan 505 wajar (simpangan kira-kira 15,8). Pada produk `sama` 488 dekat harapan 500; koin klasik juga 1000. Keadaan setelah X dan Z ditulis tangan di program (X menukar komponen 1 dengan 3 dan 2 dengan 4; Z mengganti tanda komponen 3 dan 4).

Fungsi berikut membaca hanya qubit pertama:

```python
from math import sqrt

h = 1 / sqrt(2)


def baca_pertama(v):
    """Baca hanya qubit pertama dari (a00, a01, a10, a11).

    Untuk tiap hasil: peluangnya, dan keadaan qubit kedua sesudahnya.
    """
    hasil = {}
    for pertama in (0, 1):
        sepasang = v[2 * pertama: 2 * pertama + 2]      # komponen yang cocok dengan hasil itu
        peluang = sepasang[0] ** 2 + sepasang[1] ** 2
        kedua = tuple(round(x / sqrt(peluang) + 0.0, 4) for x in sepasang)
        hasil[pertama] = (round(peluang, 4), kedua)
    return hasil


contoh = {
    "Bell (h, 0, 0, h)": [h, 0, 0, h],
    "produk (0,48 ; -0,36 ; 0,64 ; -0,48)": [0.48, -0.36, 0.64, -0.48],
    "(0,5 ; 0,5 ; 0,5 ; -0,5)": [0.5, 0.5, 0.5, -0.5],
}
for nama, v in contoh.items():
    print(nama)
    for pertama, (peluang, kedua) in baca_pertama(v).items():
        print(f"  pertama terbaca {pertama}: peluang {peluang}, qubit kedua menjadi {kedua}")
```

Keluaran asli (dijalankan penyusun dengan `python3 -I`, Python 3.12):

```text
Bell (h, 0, 0, h)
  pertama terbaca 0: peluang 0.5, qubit kedua menjadi (1.0, 0.0)
  pertama terbaca 1: peluang 0.5, qubit kedua menjadi (0.0, 1.0)
produk (0,48 ; -0,36 ; 0,64 ; -0,48)
  pertama terbaca 0: peluang 0.36, qubit kedua menjadi (0.8, -0.6)
  pertama terbaca 1: peluang 0.64, qubit kedua menjadi (0.8, -0.6)
(0,5 ; 0,5 ; 0,5 ; -0,5)
  pertama terbaca 0: peluang 0.5, qubit kedua menjadi (0.7071, 0.7071)
  pertama terbaca 1: peluang 0.5, qubit kedua menjadi (0.7071, -0.7071)
```

**Quirk.** Buka [H lalu CNOT](https://algassert.com/quirk#circuit=%7B%22cols%22:%5B%5B1,%22H%22%5D,%5B%22X%22,%22%E2%80%A2%22%5D%5D%7D). Tampilan peluang tiap kabel pada tautan itu 50,0 persen untuk keduanya, sementara kotak amplitudo hanya menyala pada `00` dan `11`: peluang per kabel tidak memperlihatkan korelasi, vektor keduanya memperlihatkannya. Quirk menampilkan peluang hitungan, bukan sampel acak.

## Contoh setengah jadi

Lengkapi (kunci di bagian akhir).

1. Keadaan `(0 ; h ; -h ; 0)`: peluang `01` = ____, `10` = ____, `00` = ____; dua bit selalu ____ (sama atau berbeda).
2. Untuk `(0,5 ; 0,5 ; 0,5 ; -0,5)`: peluang qubit pertama terbaca 0 = `0,5² + ____²` = ____.
3. Lengkapi fungsi yang menghitung peluang qubit pertama terbaca 0:

```python setengah-jadi
def peluang_pertama_0(v):
    return v[____] ** 2 + v[____] ** 2
```

## Soal Parsons

Susun baris-baris di bawah (sudah diacak) menjadi bagian fungsi `baca_pertama` yang menghitung keadaan qubit kedua sesudah hasil tertentu. Baris dalam perulangan dijorokkan; penjorokan sengaja dihilangkan.

```text
(a) for pertama in (0, 1):
(b) sepasang = v[2 * pertama: 2 * pertama + 2]
(c) peluang = sepasang[0] ** 2 + sepasang[1] ** 2
(d) kedua = tuple(x / sqrt(peluang) for x in sepasang)
```

## Latihan

1. **Dengan tangan.** (`AI: tanpa AI`) Untuk `(0,5 ; 0,5 ; 0,5 ; -0,5)`: peluang tiap hasil qubit pertama dan keadaan qubit kedua sesudahnya. Produk atau terjerat? Jelaskan.
2. **Korelasi.** (`AI: tanpa AI`) Untuk `|Psi-> = (0 ; h ; -h ; 0)`: peluang tiap hasil dua bit dan seberapa sering dua bit sama. Terjerat?
3. **Ubah benih.** (`AI: boleh`) Ubah benih program shot dan bandingkan `sama` untuk Bell dan produk. Mengapa Bell selalu 1000 sedangkan produk tidak?
4. **Rancang dulu.** (`AI: boleh`) Tulis pseudocode yang menghitung seberapa sering dua bit sama dari daftar pasangan hasil shot.
5. **Catatan pemakaian AI (opsional).** Bila memakai asisten AI, catat alat, tujuan, garis besar perintah, bagian yang dipakai, dan cara memeriksa jawabannya.

## Latihan bercampur

1. Dari `|01>`, pasang H pada qubit pertama lalu CNOT. Tulis keadaan hasil dan peluang tiap hasil. (`e-xi2-m1`, `e-xi2-m2`)
2. `|Phi+>` dibaca 1000 shot. Berapa hasil `00` yang diharapkan, dengan simpangan wajarnya? (`e-xi1-m7`)
3. Qubit terpisah `(0,6 ; 0,8)` dan `(0,8 ; -0,6)`: qubit pertama terbaca 1. Apa keadaan qubit kedua, dan bedanya dengan Bell? (`e-xi1-m12`)

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `e-xi2-m4` (satu minggu lagi), `e-xi2-m7` (sekitar empat minggu lagi), dan `e-xi2-m8` (sekitar lima minggu lagi). Jawab sekarang lalu simpan.

1. Pada keadaan Bell `(h, 0, 0, h)`, berapa peluang qubit pertama terbaca 0, dan bila terbaca 0, berapa peluang qubit kedua terbaca 0?
2. Mengapa hasil pengukuran satu qubit terjerat tidak dapat dipakai mengirim pesan lebih cepat dari cahaya?
3. Mengapa korelasi "selalu sama" pada pembacaan 0/1 belum membuktikan keanehan kuantum, bila dua bit acak yang dibagi dapat meniru korelasi itu?

## Kesalahan umum

- **"Qubit pertama menentukan hasil qubit kedua, jadi kita bisa mengirim pesan."** Hasil pertama acak dan tidak dapat dipilih.
- **"Korelasi 'selalu sama' sudah membuktikan sifat kuantum."** Dua amplop berisi bit sama juga memberi hasil itu (`E-XI2-M8`).
- **"Histogram Bell harus persis 500 dan 500."** 495 dan 505 wajar; yang pasti tepat adalah `01` dan `10` nol.

## Cek mandiri

- [ ] Saya dapat menghitung peluang hasil dua bit dari keadaan Bell.
- [ ] Saya dapat menghitung keadaan qubit kedua setelah qubit pertama dibaca.
- [ ] Saya dapat membedakan keadaan produk dari keadaan terjerat dengan hasil itu.
- [ ] Saya dapat menjelaskan mengapa korelasi tidak mengirim pesan.
- [ ] Saya mencatat pemakaian AI bila saya memakainya.

## Kunci dan petunjuk

**Ingat kembali.** 1: H pada qubit pertama dari `|00>` lalu CNOT; `00` dan `11` masing-masing 0,5, `01` dan `10` nol. 2: setelah dibaca keadaannya `|0>` atau `|1>` dan H memberi 0,5 dari keduanya; tanpa baca, dua jalur amplitudo saling menghapus. 3: wajar; harapan 500, simpangan akar 250, kira-kira 15,8; kisaran satu simpangan 484 sampai 516, dan 515 berselisih kira-kira 0,95 simpangan.

**Prediksi dulu.** (1) `00` kira-kira 500 kali dan `11` kira-kira 500 kali; `01` dan `10` nol; (2) qubit kedua pasti terbaca 0; (3) tidak: hasil pertama acak, tidak dapat dipilih. Banyak murid menebak keempat hasil kira-kira 250.

**Contoh setengah jadi.** 1: `0,5`, `0,5`, `0`; berbeda. 2: `0,5² + 0,5²` = 0,5. 3: `v[0] ** 2 + v[1] ** 2`.

**Soal Parsons.** a, b, c, d.

**Latihan.** 1: pertama 0 dengan peluang `0,25 + 0,25 = 0,5`, qubit kedua `(h, h)`; pertama 1 dengan peluang 0,5, qubit kedua `(h, -h)`. Keadaan qubit kedua bergantung pada hasil pertama, jadi bukan produk (konsisten dengan `a*d = -0,25` dan `b*c = 0,25`). 2: `01` dan `10` masing-masing 0,5, `00` dan `11` nol; dua bit selalu berbeda; terjerat, sebab `a*d = 0` dan `b*c = h x (-h) = -0,5`. 3: Bell: `01` dan `10` mustahil, jadi `sama` tepat 1000 pada benih apa pun; produk: peluang `sama` 0,5, jadi sekitar 500 dengan simpangan 15,8. 4: contoh: `sama = 0; untuk tiap pasangan (x, y): jika x sama dengan y, tambah sama; kembalikan sama dibagi jumlah pasangan`. 5: opsional.

**Latihan bercampur.** 1: H pertama dari `|01>` memberi `(0 ; h ; 0 ; h)` dan CNOT menukar komponen ketiga dan keempat: `(0 ; h ; h ; 0) = Psi+`; `01` dan `10` masing-masing 0,5. 2: 500; simpangan kira-kira 15,8. 3: tetap `(0,8 ; -0,6)`, tidak berubah oleh hasil qubit pertama; pada Bell, keadaan qubit kedua ditentukan hasil qubit pertama.

**Ulang berjarak.** 1: 0,5; bila terbaca 0, qubit kedua pasti `|0>`, jadi peluangnya 1. 2: peluang hasil qubit kedua tidak bergantung pada apa yang dilakukan atau diukur pada qubit pertama, dan hasil pertama acak sehingga tidak dapat dipilih; korelasi hanya terlihat setelah membandingkan lewat kanal biasa. 3: dua bit acak klasik yang dibagi (dua amplop berisi salinan koin) juga memberi hasil selalu sama; pembeda ada pada pembacaan dengan cara lain, `E-XI2-M8`.

## Langkah berikutnya

Modul berikut: `e-xi2-m4` (simulator sendiri III: n qubit): memperluas simulator ke banyak qubit dan menghitung memori. Bacaan pendamping: `e-xi1-m11` (simulator sendiri II, histogram shot).
