## Untuk siapa modul ini

Modul ini untuk murid kelas XII jalur E (komputasi kuantum), minggu `E-XII1-M10` silabus v1.4: pustaka Qiskit dan Python II, yaitu membaca dan memodifikasi kode Qiskit untuk Bell dan Grover kecil yang dijalankan guru secara lokal, dengan keluaran catatan perbandingan. Prasyarat: modul `e-xii1-m9`. Seperti minggu lalu, Python dan Qiskit hanyalah **demonstrasi guru** dengan simulator lokal bawaan Qiskit; murid **tidak menjalankan Python atau Qiskit, tanpa akun, tanpa token**. Murid membaca, memprediksi, dan membandingkan dengan simulatornya (C++17 atau TypeScript dengan Bun). Di luar indeks, bagian kode simulator memerlukan dasar pemrograman setara `A-X1-M9..M12` (C++); bagian membaca terbuka bagi semua murid.

Modul ini karangan penyusun dan disetujui pemilik program pada 2026-11-20 (keputusan lewat dialog; catatan tinjauan menjadi tindak lanjut revisi). Jalur E adalah pengayaan di luar rumusan CP; minggu ini punya irisan pengayaan `F-AP-d`, tetapi hanya menyentuh butir itu dan tidak dihitung memenuhi butir CP mana pun.

Aturan AI jalur ini: AI generatif boleh dipakai dengan etika dan dicatat, tanpa data pribadi, kata sandi, atau tugas bernilai pada permintaanmu, dan tanpa akun wajib. Saran: jawab dulu sendiri, baru minta petunjuk bertahap; kode buatan AI kamu baca, jalankan, dan uji. Setiap soal `Latihan` bertanda `AI: boleh` atau `AI: tanpa AI`.

Catatan untuk guru: blok Python dijalankan penyusun dengan Qiskit 2.6.2 dan Python 3.14.6 dalam lingkungan virtual lokal, per 2026-11-19. Pustaka sirkuit Qiskit juga punya fungsi `grover_operator` (halaman tutorial "Grover's algorithm", per 2026-11-19); modul ini menulis oracle dan pembalikan dengan gerbang dasar supaya terlihat padanannya dengan simulator murid. Tutorial itu juga menyebut Grover pada dasarnya algoritma toleran-galat karena kedalaman gerbang dua qubit tumbuh sangat cepat terhadap jumlah qubit (`e-xii1-m8`). Hasil di sini dari simulator ideal di komputer biasa; modul ini tidak menyatakan apa pun tentang perangkat nyata.

## Ingat kembali

Jawab dari ingatan, baru cek di bagian kunci.

1. Pada keadaan seragam empat item dengan satu item bertanda, mengapa pembacaan langsung masih `0,25` untuk tiap item? (dari `e-xii1-m2`)
2. Sebutkan tiga pertanyaan untuk menguji klaim berita bahwa komputer kuantum "lebih cepat". (dari `e-xii1-m7`)
3. Mengapa simulatormu menulis `100` untuk hasil yang di Qiskit ditulis `001`? (dari `e-xii1-m9`)

## Tujuan

Setelah modul ini kamu dapat:

- membaca kode Qiskit untuk Grover tiga qubit dan menunjuk bagian oracle serta pembalikan terhadap rata-rata;
- memodifikasi jumlah shot, jumlah pengulangan, dan item bertanda, lalu memprediksi akibatnya;
- menulis catatan perbandingan antara hasil Qiskit lokal dan simulatormu.

Keluaran yang diminta silabus: catatan perbandingan.

## Prediksi dulu

Grover tiga qubit (`N = 8`), item bertanda berlabel Qiskit `110`, 1000 shot. Tebak dan tulis: (1) peluang item bertanda setelah `t = 2` pengulangan dan kira-kira berapa dari 1000 shot membacanya; (2) peluang setelah `t = 3`; (3) bila shot dinaikkan menjadi 10.000, apakah peluangnya berubah, dan apa yang berubah.

## Contoh terselesaikan

**Menunjuk bagian kode.** `qc.h([0, 1, 2])` membuat keadaan seragam (`e-xii1-m3`). Oracle: `ccz(0, 1, 2)` membalik tanda hanya untuk `111`; karena yang ditandai `110` (nol pada qubit 0), `x(0)` dipasang sebelum dan sesudahnya. Pembalikan terhadap rata-rata (`e-xii1-m4`): `h`, `x` semua, `ccz`, `x` semua, `h`; urutan ini sama dengan pembalikan rata-rata sampai tanda keseluruhan, dan tanda keseluruhan tidak mengubah peluang. Item yang ditandai `110` di label Qiskit adalah `011` di simulatormu, yaitu indeks 3 (`e-xii1-m9`).

Blok Python **demonstrasi guru, tidak dijalankan murid** (simulator ideal lokal, tanpa akun):

```python
# demonstrasi guru, tidak dijalankan murid
# Simulator lokal bawaan Qiskit; tanpa akun, tanpa token, tanpa jaringan.
import qiskit
from qiskit import QuantumCircuit
from qiskit.primitives import StatevectorSampler
from qiskit.quantum_info import Statevector

print("Qiskit", qiskit.__version__)

BERTANDA = "110"  # label Qiskit: qubit 2, 1, 0 dari kiri ke kanan


def grover(pengulangan):
    qc = QuantumCircuit(3)
    qc.h([0, 1, 2])
    for _ in range(pengulangan):
        qc.x(0)             # oracle: balik tanda hanya untuk 110 (nol pada qubit 0)
        qc.ccz(0, 1, 2)
        qc.x(0)
        qc.h([0, 1, 2])     # pembalikan terhadap rata-rata
        qc.x([0, 1, 2])
        qc.ccz(0, 1, 2)
        qc.x([0, 1, 2])
        qc.h([0, 1, 2])
    return qc


for t in (1, 2, 3):
    tepat = Statevector(grover(t)).probabilities_dict()[BERTANDA]
    print(f"t = {t}: peluang {BERTANDA} menurut vektor keadaan {tepat:.4f}")

qc = grover(2)
qc.measure_all()
sampler = StatevectorSampler(seed=2026)  # benih tetap supaya keluaran dapat diulang
hasil = sampler.run([qc], shots=1000).result()[0]
print("t = 2, histogram 1000 shot:", dict(sorted(hasil.data.meas.get_counts().items())))
```

Keluaran asli (dijalankan penyusun, Qiskit 2.6.2, Python 3.14.6):

```text
Qiskit 2.6.2
t = 1: peluang 110 menurut vektor keadaan 0.7812
t = 2: peluang 110 menurut vektor keadaan 0.9453
t = 3: peluang 110 menurut vektor keadaan 0.3301
t = 2, histogram 1000 shot: {'000': 6, '001': 8, '010': 7, '011': 9, '100': 3, '101': 4, '110': 954, '111': 9}
```

Padanan di simulatormu, dengan pemetaan label:

```cpp
#include <cmath>
#include <cstdio>
#include <string>
#include <vector>

using Vektor = std::vector<double>;

void balik_fase(Vektor& a, size_t m) { a[m] = -a[m]; }

void balik_rata(Vektor& a) {
    double jumlah = 0.0;
    for (double x : a) jumlah += x;
    double rata = jumlah / double(a.size());
    for (double& x : a) x = 2.0 * rata - x;
}

// Simulatormu: qubit 0 bit paling kiri. Qiskit: qubit 0 bit paling kanan.
std::string label_simulatorku(size_t i, int n) {
    std::string s;
    for (int k = 0; k < n; k++) s += ((i >> (n - 1 - k)) & 1) ? '1' : '0';
    return s;
}

int main() {
    const int n = 3;
    const size_t N = size_t(1) << n;
    const std::string qiskit_label = "110";  // yang ditandai di kode Qiskit
    // Balik urutan label Qiskit untuk mendapat label simulatormu, lalu ubah ke indeks.
    std::string s(qiskit_label.rbegin(), qiskit_label.rend());
    size_t bertanda = 0;
    for (char c : s) bertanda = bertanda * 2 + (c == '1' ? 1 : 0);
    std::printf("label Qiskit %s = label simulatorku %s = indeks %zu\n", qiskit_label.c_str(),
                label_simulatorku(bertanda, n).c_str(), bertanda);

    Vektor a(N, 1.0 / std::sqrt(double(N)));
    for (int t = 1; t <= 3; t++) {
        balik_fase(a, bertanda);
        balik_rata(a);
        std::printf("t = %d: peluang item bertanda %.4f\n", t, a[bertanda] * a[bertanda]);
    }
    return 0;
}
```

Keluaran asli (dikompilasi penyusun dengan `g++ -std=c++17 -Wall -Wextra`, lalu dijalankan):

```text
label Qiskit 110 = label simulatorku 011 = indeks 3
t = 1: peluang item bertanda 0.7812
t = 2: peluang item bertanda 0.9453
t = 3: peluang item bertanda 0.3301
```

**Catatan perbandingan.**

| Besaran | Rumus | Simulatorku | Qiskit lokal |
| --- | --- | --- | --- |
| peluang `t = 1` | `sin²(3 theta)` = 0,78125 | 0,7812 | 0,7812 |
| peluang `t = 2` | `sin²(5 theta)` = 0,9453 | 0,9453 | 0,9453 |
| peluang `t = 3` | `sin²(7 theta)` = 0,3301 | 0,3301 | 0,3301 |
| item bertanda dari 1000 shot, `t = 2` | harapan 945, simpangan 7,2 | tidak dijalankan | 954 |

Hasil 954 menyimpang sekitar 8,7 dari 945, kira-kira 1,2 simpangan: wajar. Peluang tidak berubah bila shot dinaikkan; yang mengecil hanya simpangan relatifnya. `t = 3` memberi 0,3301, lebih buruk daripada `t = 2` karena amplitudo berputar melewati puncak (`e-xii1-m4`). Hitungan query di sini adalah banyak pengulangan `t`; biaya membangun oracle dan menjalankan simulasi tidak dihitung, dan simulasi di komputer biasa tidak menunjukkan percepatan nyata.

## Contoh setengah jadi

Lengkapi (kunci di bagian akhir).

1. Oracle untuk menandai `101` (label Qiskit): bit pada qubit 1 adalah 0, jadi `qc.x(____)`, `qc.ccz(0, 1, 2)`, `qc.x(____)`.
2. Lengkapi `balik_rata`:

```cpp setengah-jadi
void balik_rata(Vektor& a) {
    double jumlah = 0.0;
    for (double x : a) jumlah += x;
    double rata = jumlah / double(a.____());
    for (double& x : a) x = 2.0 * ____ - x;
}
```

## Soal Parsons

Susun baris-baris di bawah (sudah diacak) menjadi bagian akhir `main` di simulatormu. Kurung kurawal penutup sengaja dihilangkan.

```text
(a)         balik_rata(a);
(b)     for (int t = 1; t <= 3; t++) {
(c)         balik_fase(a, bertanda);
(d)         std::printf("t = %d: peluang %.4f\n", t, a[bertanda] * a[bertanda]);
(e)     Vektor a(N, 1.0 / std::sqrt(double(N)));
```

## Latihan

1. **Hitung.** (`AI: tanpa AI`) Dengan `sin(theta) = 1/akar 8`, hitung peluang item bertanda untuk `t = 1, 2, 3` dengan rumus `sin²((2t + 1) theta)`.
2. **Ubah shot.** (`AI: boleh`) Kelas meminta guru menjalankan `shots=100` dan `shots=10000`. Prediksi dulu simpangan wajar jumlah item bertanda untuk keduanya (`t = 2`), lalu bandingkan dengan hasil yang guru tunjukkan.
3. **Ubah item.** (`AI: boleh`) Tandai item `011` (label Qiskit). Tulis perubahan pada oracle dan tulis indeksnya di simulatormu.
4. **Jelaskan.** (`AI: tanpa AI`) Mengapa `t = 3` lebih buruk daripada `t = 2`, dan apa yang dihitung sebagai query pada contoh ini?
5. **Catatan pemakaian AI (opsional).** Bila memakai asisten AI, catat alat, tujuan, garis besar perintah, bagian yang dipakai, dan cara memeriksanya.

## Latihan bercampur

1. Bila peluang tanpa kesalahan satu gerbang dua qubit 0,995, berapa gerbang paling banyak agar peluang bersih masih paling sedikit 0,9? (`e-xii1-m8`)
2. Sebuah berita menulis: "Simulasi Grover di komputer menemukan jawaban 95 persen, jadi komputer kuantum mengalahkan komputer biasa." Nilai dengan tiga pertanyaan penguji. (`e-xii1-m7`)

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `e-xii1-m11` (satu minggu lagi), `e-xii1-m13` (sekitar tiga minggu lagi), dan `e-xii2-m4` (sekitar delapan minggu lagi). Jawab sekarang lalu simpan.

1. Pada Grover `N = 8`, berapa peluang item bertanda setelah `t = 1`, `2`, dan `3`, dan mengapa `t = 3` lebih kecil daripada `t = 2`?
2. Pada kode Grover Qiskit, bagian mana oracle dan bagian mana pembalikan terhadap rata-rata?
3. Mengapa hitungan query Grover belum berarti komputer kuantum lebih cepat dalam waktu nyata?

## Kesalahan umum

- **"Oracle Qiskit memakai nomor yang sama dengan simulatorku."** Label Qiskit dibalik terhadap simulatormu: `110` di Qiskit adalah indeks 3 di simulatormu.
- **"`ccz` menandai `110`."** `ccz` menandai `111`; gerbang `x` di sekelilingnya menggeser sasarannya.
- **"Makin banyak pengulangan makin baik."** Setelah titik terbaik peluang turun lagi.
- **"954 dari 1000 berarti peluangnya 0,954."** Peluangnya 0,9453; selisihnya acak shot.
- **"Hasil Qiskit lokal membuktikan keunggulan kuantum."** Ia simulasi di komputer biasa.

## Cek mandiri

- [ ] Saya dapat menunjuk oracle dan pembalikan rata-rata pada kode Grover Qiskit.
- [ ] Saya dapat menghitung peluang item bertanda untuk `t` tertentu.
- [ ] Saya dapat menukar label Qiskit dan indeks simulatorku.
- [ ] Saya dapat menulis catatan perbandingan rumus, simulatorku, dan Qiskit lokal.
- [ ] Saya mencatat pemakaian AI bila saya memakainya.

## Kunci dan petunjuk

**Ingat kembali.** 1: kuadrat amplitudo `±0,5` sama dengan `0,25`; tanda baru terlihat setelah interferensi. 2: masalah apa; dibanding apa; diukur dengan apa. 3: Qiskit menempatkan qubit 0 di paling kanan string, simulatormu di paling kiri, jadi string dibalik.

**Prediksi dulu.** (1) 0,9453; kira-kira 945 dari 1000. (2) 0,3301. (3) peluang tidak berubah; simpangan wajar relatif mengecil karena jumlah shot lebih banyak.

**Contoh setengah jadi.** 1: `qc.x(1)` dan `qc.x(1)`. 2: `size` dan `rata`. Kunci ini dikompilasi dan dijalankan penyusun (potongan itu ada di program di atas).

**Soal Parsons.** e, b, c, a, d.

**Latihan.** 1: `theta = asin(1/akar 8)`; `t = 1`: 0,78125; `t = 2`: 0,9453; `t = 3`: 0,3301 (sama dengan keluaran program). 2: simpangan `akar(shot x 0,9453 x 0,0547)`: 100 shot sekitar 2,3 (relatif 0,023); 10.000 shot sekitar 22,7 (relatif 0,0023); angka itu hitungan tangan, penyusun tidak menjalankan keduanya. 3: label Qiskit `011` punya nol pada qubit 2, jadi `qc.x(2)` sebelum dan sesudah `ccz`; label simulatormu `110`, indeks 6. 4: setelah titik terbaik amplitudo berputar melewati puncak (`sin²(7 theta)` kecil); query yang dihitung adalah banyak pemanggilan oracle, yaitu `t`. 5: opsional.

**Latihan bercampur.** 1: `0,995^21` = 0,9001 dan `0,995^22` = 0,8956; jadi paling banyak 21 gerbang. 2: masalah apa (mencari satu item di antara delapan, terlalu kecil untuk bermakna); dibanding apa (tidak ada pembanding klasik); diukur dengan apa (peluang dari simulasi ideal, bukan waktu perangkat). Simulasi di komputer biasa tidak membuktikan keunggulan.

**Ulang berjarak.** 1: 0,7812; 0,9453; 0,3301; amplitudo item bertanda berputar melewati titik terbaik pada `t = 3`. 2: oracle: `x(0)`, `ccz`, `x(0)`; pembalikan rata-rata: `h`, `x` semua, `ccz`, `x` semua, `h`. 3: hitungan query mengabaikan biaya oracle, galat perangkat, dan kecepatan perangkat.

## Langkah berikutnya

Modul berikut: `e-xii1-m11` (peran cloud quantum). Bacaan pendamping: `e-xii1-m4` dan `e-xii1-m5`.
