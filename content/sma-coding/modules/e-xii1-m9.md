## Untuk siapa modul ini

Modul ini untuk murid kelas XII jalur E (komputasi kuantum), minggu `E-XII1-M9` silabus v1.4: pustaka Qiskit dan Python I, sebagai **demonstrasi guru**, dengan keluaran sirkuit Qiskit. Prasyarat: modul `e-xii1-m8`. Guru menjalankan Python dan Qiskit di komputer sekolah memakai simulator lokal bawaan Qiskit; murid **tidak menjalankan Python atau Qiskit, tidak membuat akun, dan tidak memakai token**. Murid membaca kode itu dan membandingkannya dengan simulator buatannya sendiri (C++17 atau TypeScript dengan Bun). Di luar indeks, bagian kode simulator memerlukan dasar pemrograman setara `A-X1-M9..M12` (C++); bagian membaca terbuka bagi semua murid. Alat murid: kertas, kalkulator, dan simulatormu.

Modul ini karangan penyusun dan disetujui pemilik program pada 2026-11-20 (keputusan lewat dialog; catatan tinjauan menjadi tindak lanjut revisi). Jalur E adalah pengayaan di luar rumusan CP; minggu ini punya irisan pengayaan `F-AP-d` (simulator vektor keadaan dan Qiskit), tetapi hanya menyentuh butir itu dan tidak dihitung memenuhi butir CP mana pun.

Aturan AI jalur ini: AI generatif boleh dipakai dengan etika dan dicatat, tanpa data pribadi, kata sandi, atau tugas bernilai pada permintaanmu, dan tanpa akun wajib. Saran: jawab dulu sendiri, baru minta petunjuk bertahap; kode buatan AI kamu baca, jalankan, dan uji. Setiap soal `Latihan` bertanda `AI: boleh` atau `AI: tanpa AI`.

Catatan untuk guru: penyusun menjalankan blok Python di bawah dengan Qiskit 2.6.2 dan Python 3.14.6 dalam lingkungan virtual lokal tanpa akun, per 2026-11-19; halaman IBM Quantum menyebut versi yang berbeda-beda, jadi catat versi yang kamu pasang. Aturan urutan bit dibaca dari halaman "Bit-ordering in the Qiskit SDK"; sifat `StatevectorSampler` (simulasi ideal bawaan Qiskit) dari halaman "Introduction to primitives", keduanya per 2026-11-19. Pemasangan Qiskit mengikuti halaman "Install Qiskit" (`pip install qiskit` dalam virtual environment).

## Ingat kembali

Jawab dari ingatan, baru cek di bagian kunci.

1. Sebutkan langkah sirkuit Bernstein-Vazirani berurutan dan apa yang dibaca di akhir. (dari `e-xii1-m1`)
2. Apa itu orde `r` dari `a` modulo `N`, dan bagaimana `r` memberi faktor `N`? (dari `e-xii1-m6`)
3. Mengapa kesalahan tanda tidak mengubah histogram Bell tetapi mengubah hasil H, tunggu, H? (dari `e-xii1-m8`)

## Tujuan

Setelah modul ini kamu dapat:

- membaca sirkuit Qiskit sederhana (`QuantumCircuit`, `h`, `cx`, `x`, `measure_all`) dan menerjemahkannya ke langkah simulatormu;
- menuliskan hasil dengan urutan bit Qiskit (qubit 0 di paling kanan) dan urutan simulatormu (qubit 0 di paling kiri);
- membandingkan histogram simulator Qiskit lokal dengan simulatormu memakai simpangan wajar.

Keluaran yang diminta silabus: sirkuit Qiskit (dibaca dan dibandingkan; murid tidak menjalankannya).

## Prediksi dulu

Perhatikan potongan Python berikut (kamu tidak menjalankannya; guru yang menjalankan): `qc = QuantumCircuit(3)` lalu `qc.x(0)`, kemudian dicetak peluang tiap hasil. Tebak dan tulis: (1) hasil yang berpeluang 1 ditulis `100` atau `001`; (2) untuk Bell, histogram 1000 shot dari Qiskit akan persis 500 dan 500 atau tidak, dan berapa selisih yang wajar.

## Contoh terselesaikan

**Menerjemahkan.** Satu gerbang di simulatormu punya padanan satu baris di Qiskit:

| Simulatormu | Qiskit |
| --- | --- |
| `gerbang_h(v, n, k)` | `qc.h(k)` |
| `cnot(v, n, kontrol, target)` | `qc.cx(kontrol, target)` |
| `balik_bit(v, n, k)` | `qc.x(k)` |
| `baca` diulang `shot` kali | `qc.measure_all()` lalu sampler dengan `shots` |

**Dua hal yang berbeda.** Pertama, urutan bit: di simulatormu qubit 0 adalah bit paling kiri, sedangkan Qiskit menulis string dengan qubit 0 di paling kanan (halaman IBM: bit `n-1` paling kiri, bit 0 paling kanan). Jadi `X` pada qubit 0 dari tiga qubit adalah `100` di simulatormu dan `001` di Qiskit. Kedua, Qiskit selalu menyimpan amplitudo sebagai bilangan kompleks; bagian imajinernya nol di sirkuit ini (`+0.j`).

Berikut blok Python **demonstrasi guru, tidak dijalankan murid**. `StatevectorSampler` adalah simulator ideal bawaan Qiskit: tanpa akun, tanpa jaringan, dan tanpa derau.

```python
# demonstrasi guru, tidak dijalankan murid
# Simulator lokal bawaan Qiskit; tanpa akun, tanpa token, tanpa jaringan.
import qiskit
from qiskit import QuantumCircuit
from qiskit.primitives import StatevectorSampler
from qiskit.quantum_info import Statevector

print("Qiskit", qiskit.__version__)

# Sirkuit Bell yang sama dengan simulatormu: H pada qubit 0, lalu CNOT 0 ke 1.
bell = QuantumCircuit(2)
bell.h(0)
bell.cx(0, 1)
print("vektor keadaan:", Statevector(bell).data.round(4))

diukur = bell.copy()
diukur.measure_all()
sampler = StatevectorSampler(seed=2026)  # benih tetap supaya keluaran dapat diulang
hasil = sampler.run([diukur], shots=1000).result()[0]
print("histogram 1000 shot:", dict(sorted(hasil.data.meas.get_counts().items())))

# Urutan bit: X pada qubit 0 dari tiga qubit.
tiga = QuantumCircuit(3)
tiga.x(0)
peluang = Statevector(tiga).probabilities_dict()
print("X pada qubit 0, tiga qubit:", {str(k): float(v) for k, v in peluang.items()})
```

Keluaran asli (dijalankan penyusun, Qiskit 2.6.2, Python 3.14.6):

```text
Qiskit 2.6.2
vektor keadaan: [0.7071+0.j 0.    +0.j 0.    +0.j 0.7071+0.j]
histogram 1000 shot: {'00': 464, '11': 536}
X pada qubit 0, tiga qubit: {'001': 1.0}
```

Padanannya di simulatormu, dengan penerjemah label:

```cpp
#include <cmath>
#include <cstdio>
#include <string>
#include <vector>

using Vektor = std::vector<double>;

const double H1 = 1.0 / std::sqrt(2.0);

void gerbang_h(Vektor& v, int n, int k) {
    int geser = n - 1 - k;
    for (size_t i = 0; i < v.size(); i++) {
        if (((i >> geser) & 1) == 0) {
            size_t j = i | (size_t(1) << geser);
            double a = v[i], b = v[j];
            v[i] = H1 * (a + b);
            v[j] = H1 * (a - b);
        }
    }
}

void cnot(Vektor& v, int n, int kontrol, int target) {
    int gk = n - 1 - kontrol, gt = n - 1 - target;
    for (size_t i = 0; i < v.size(); i++) {
        if (((i >> gk) & 1) == 1 && ((i >> gt) & 1) == 0) {
            size_t j = i | (size_t(1) << gt);
            double tmp = v[i];
            v[i] = v[j];
            v[j] = tmp;
        }
    }
}

void balik_bit(Vektor& v, int n, int k) {  // gerbang X
    int geser = n - 1 - k;
    for (size_t i = 0; i < v.size(); i++) {
        if (((i >> geser) & 1) == 0) {
            size_t j = i | (size_t(1) << geser);
            double tmp = v[i];
            v[i] = v[j];
            v[j] = tmp;
        }
    }
}

// Simulatormu: qubit 0 adalah bit paling kiri. Qiskit: qubit 0 bit paling kanan.
std::string label(size_t i, int n) {
    std::string s;
    for (int k = 0; k < n; k++) s += ((i >> (n - 1 - k)) & 1) ? '1' : '0';
    return s;
}

std::string label_qiskit(const std::string& s) {
    return std::string(s.rbegin(), s.rend());
}

void tampilkan(const char* nama, const Vektor& v, int n) {
    std::printf("%s\n", nama);
    for (size_t i = 0; i < v.size(); i++)
        if (std::fabs(v[i]) > 1e-12)
            std::printf("  simulatorku %s = Qiskit %s: amplitudo %.4f\n", label(i, n).c_str(),
                        label_qiskit(label(i, n)).c_str(), v[i]);
}

int main() {
    Vektor bell = {1.0, 0.0, 0.0, 0.0};
    gerbang_h(bell, 2, 0);
    cnot(bell, 2, 0, 1);
    tampilkan("Bell (H pada qubit 0, CNOT 0 ke 1):", bell, 2);

    Vektor tiga(8, 0.0);
    tiga[0] = 1.0;
    balik_bit(tiga, 3, 0);
    tampilkan("X pada qubit 0, tiga qubit:", tiga, 3);
    return 0;
}
```

Keluaran asli (dikompilasi penyusun dengan `g++ -std=c++17 -Wall -Wextra`, lalu dijalankan):

```text
Bell (H pada qubit 0, CNOT 0 ke 1):
  simulatorku 00 = Qiskit 00: amplitudo 0.7071
  simulatorku 11 = Qiskit 11: amplitudo 0.7071
X pada qubit 0, tiga qubit:
  simulatorku 100 = Qiskit 001: amplitudo 1.0000
```

Bacaan hasilnya: vektor Bell sama persis. Histogram Qiskit 464 dan 536 menyimpang 36 dari 500; simpangan wajar `akar(1000 x 0,25)` = 15,8, jadi sekitar 2,3 simpangan, masih wajar. Histogram dua simulator tidak akan persis sama karena pembangkit acaknya berbeda (`e-xi2-m13`). Ini simulasi ideal: hasil `01` dan `10` tidak pernah muncul, tidak seperti derau di `e-xii1-m8`.

## Contoh setengah jadi

Lengkapi (kunci di bagian akhir).

1. Simulatormu menulis `gerbang_h(v, 2, 1); cnot(v, 2, 1, 0);`. Di Qiskit: `qc.h(____)` lalu `qc.cx(____, ____)`.
2. Lengkapi penerjemah label:

```cpp setengah-jadi
std::string label_qiskit(const std::string& s) {
    return std::string(s.____(), s.____());
}
```

## Soal Parsons

Susun baris Python di bawah (sudah diacak) menjadi program yang membuat sirkuit Bell, mengukurnya, menjalankan 1000 shot, dan mencetak histogram. Baris `sampler = ...` boleh berada di mana saja sebelum `hasil = ...`.

```text
(a) hasil = sampler.run([qc], shots=1000).result()[0]
(b) qc.measure_all()
(c) qc.cx(0, 1)
(d) print(hasil.data.meas.get_counts())
(e) qc = QuantumCircuit(2)
(f) qc.h(0)
(g) sampler = StatevectorSampler(seed=2026)
```

## Latihan

1. **Terjemahkan.** (`AI: tanpa AI`) Simulatormu menjalankan, dari `|000>`: H pada qubit 0, X pada qubit 2, CNOT 0 ke 1. Tulis kode Qiskit-nya, dan tulis hasil yang mungkin dengan label simulatormu dan label Qiskit beserta peluangnya.
2. **Baca kode.** (`AI: boleh`) Sirkuit Qiskit: `qc.h(0)`, `qc.cx(0, 1)`, `qc.cx(1, 2)`, lalu `measure_all()`. Prediksi histogram 1000 shot dan gambarkan sirkuitnya.
3. **Bandingkan.** (`AI: boleh`) Jalankan Bell 1000 shot di simulatormu. Hitung selisih tiap hasil dari 500 dalam satuan simpangan, lalu bandingkan dengan histogram Qiskit di atas dan jelaskan mengapa angkanya berbeda.
4. **Jelaskan.** (`AI: tanpa AI`) Mengapa `StatevectorSampler` tidak pernah memberi `01` atau `10` untuk Bell, padahal perangkat nyata bisa?
5. **Catatan pemakaian AI (opsional).** Bila memakai asisten AI, catat alat, tujuan, garis besar perintah, bagian yang dipakai, dan cara memeriksanya.

## Latihan bercampur

1. Algoritma Bernstein-Vazirani dengan `s = 110` memberi bacaan `110` di simulatormu. Tulis label yang sama di Qiskit. (`e-xii1-m1`)
2. Bell berderau dengan `p = 0,01` per gerbang dan dua gerbang: berapa peluang tanpa kesalahan? (`e-xii1-m8`)

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `e-xii1-m10` (satu minggu lagi), `e-xii1-m12` (sekitar tiga minggu lagi), dan `e-xii2-m3` (sekitar delapan minggu lagi). Jawab sekarang lalu simpan.

1. Mengapa simulatormu menulis `100` untuk hasil yang di Qiskit ditulis `001`?
2. Apa yang dilakukan `StatevectorSampler`, dan apa yang tidak dimodelkannya dibanding perangkat nyata?
3. Bagaimana menilai bahwa dua histogram 1000 shot dari sirkuit yang sama masih wajar berbeda?

## Kesalahan umum

- **"Qiskit menulis qubit 0 di kiri."** Qiskit menulis qubit 0 di paling kanan; simulatormu di paling kiri.
- **"Simulator lokal Qiskit sama dengan komputer kuantum."** Ia simulasi ideal tanpa derau, dijalankan komputer biasa.
- **"Dua simulator harus memberi histogram yang persis sama."** Vektor keadaan sama, tetapi hasil shot acak berbeda dalam simpangan wajar.
- **"Memakai Qiskit butuh akun."** Simulator lokal tidak butuh akun; akun hanya diperlukan untuk cloud quantum (`e-xii1-m11`).

## Cek mandiri

- [ ] Saya dapat menerjemahkan sirkuit kecil antara simulatorku dan Qiskit.
- [ ] Saya dapat menukar label hasil antara urutan simulatorku dan Qiskit.
- [ ] Saya dapat menilai dua histogram dengan simpangan wajar.
- [ ] Saya tahu bahwa blok Python modul ini demonstrasi guru dan saya tidak menjalankannya.
- [ ] Saya mencatat pemakaian AI bila saya memakainya.

## Kunci dan petunjuk

**Ingat kembali.** 1: qubit query `|0...0>` dan qubit bantu `|1>`; H pada semua; satu oracle; H pada qubit query; baca qubit query, hasilnya `s`. 2: `r` adalah bilangan bulat positif terkecil dengan `a^r` sama dengan 1 modulo `N`; bila `r` genap dan `a^(r/2)` bukan `-1`, maka `fpb(a^(r/2) +- 1, N)` memberi faktor. 3: tanda tidak terlihat pada kuadrat amplitudo, tetapi memengaruhi interferensi pada H kedua.

**Prediksi dulu.** (1) `001` di Qiskit (qubit 0 paling kanan). (2) tidak persis 500; selisih sampai sekitar 47 (tiga simpangan) masih wajar; keluaran asli 464 dan 536.

**Contoh setengah jadi.** 1: `qc.h(1)` lalu `qc.cx(1, 0)`. 2: `rbegin` dan `rend`. Kunci ini dikompilasi dan dijalankan penyusun (potongan itu ada di program di atas).

**Soal Parsons.** e, f, c, b, g, a, d (baris g boleh lebih awal asal sebelum a). Soal ini tidak dijalankan; urutannya mengikuti blok Python di atas.

**Latihan.** 1: kode `qc = QuantumCircuit(3)`, `qc.h(0)`, `qc.x(2)`, `qc.cx(0, 1)`. Setelah H pada qubit 0: `(|000> + |100>)/akar 2` (label simulatormu); X pada qubit 2: `(|001> + |101>)/akar 2`; CNOT 0 ke 1: `(|001> + |111>)/akar 2`. Label simulatormu `001` dan `111`; label Qiskit `100` dan `111`; masing-masing peluang 0,5. 2: GHZ: hanya `000` dan `111`, masing-masing sekitar 500 (harapan 500, simpangan 15,8); hasil lain tidak muncul pada simulasi ideal. 3: selisih dalam satuan `(hitung - 500) / 15,8`; Qiskit: `-36/15,8` = -2,3 dan `+36/15,8` = +2,3; pembangkit acak berbeda, jadi angka berbeda tetapi sama-sama wajar. 4: simulasi ideal tanpa derau, jadi hanya hasil dengan amplitudo tidak nol yang muncul; pada perangkat nyata ada derau gerbang dan pembacaan (`e-xii1-m8`). 5: opsional.

**Latihan bercampur.** 1: label simulatormu `110` menjadi `011` di Qiskit (dibalik). 2: `0,99^2` = 0,9801.

**Ulang berjarak.** 1: Qiskit menempatkan qubit 0 di paling kanan string, simulatormu di paling kiri, jadi string dibalik. 2: menyimulasikan vektor keadaan secara ideal di komputer biasa dan mengambil sampel hasil; derau gerbang, derau baca, dekoherensi, dan antrean tidak dimodelkan. 3: hitung harapan dan simpangan wajar `akar(shot x p x (1 - p))` tiap hasil; selisih dalam kira-kira tiga simpangan masih wajar.

## Langkah berikutnya

Modul berikut: `e-xii1-m10` (pustaka Qiskit dan Python II: membaca dan memodifikasi Bell dan Grover kecil secara lokal). Bacaan pendamping: `e-xii1-m8` dan `e-xi2-m4`.
