## Untuk siapa modul ini

Modul ini untuk siswa SMA reguler kelas X yang ingin menulis kondisi program dengan benar dan rapi. Ia bagian dari seri Matematika Komputasi Dasar dan berstatus DRAF: karangan penyusun, belum disetujui pemilik, dan tidak dihitung sebagai pemenuhan butir capaian pembelajaran (hanya mendukung butir E-BK-d, solusi program sederhana dalam pseudocode).

Prasyarat: tidak ada modul seri yang harus dibaca lebih dulu. Cukup tahu `if` dan operator perbandingan secara umum.

Minggu silabus v1.1 yang berdekatan: jalur A `A-X1-M10` dan jalur B `B-X1-M10` (percabangan dan logika Boolean). Bacaan mandiri atau rujukan guru; tanpa jadwal wajib.

Setelah mempelajari modul ini, kamu diharapkan bisa:

- membedakan kalimat yang merupakan proposisi dan yang bukan;
- memakai negasi, dan, atau, XOR, implikasi, dan biimplikasi, serta menyusun tabel kebenarannya;
- memakai hukum De Morgan dan ekuivalensi untuk menyederhanakan kondisi program;
- membedakan implikasi, kontrapositif, konvers, dan invers;
- memahami "untuk semua" dan "ada" secara intuitif serta menegasikannya.

Modul ini membahas logika sebagai bahasa penalaran. Operasi bit (mask, pergeseran) tidak dibahas di sini; itu pengayaan terpisah. Bagian pokok dikerjakan di kertas. Contoh C++17 hanya diperiksa bisa dikompilasi, contoh TypeScript diperiksa penyusun secara manual dengan menjalankannya; keduanya bukan bukti benar untuk semua masukan.

## Proposisi

**Proposisi** adalah kalimat yang bernilai benar atau salah, tidak keduanya.

- "7 adalah bilangan prima" adalah proposisi (benar).
- "10 habis dibagi 4" adalah proposisi (salah).
- "Tutup pintunya!" bukan proposisi (perintah).
- "x > 3" belum proposisi sampai nilai x diketahui; ia menjadi proposisi bila x diberi nilai, atau bila ada kuantor (bagian akhir modul).

Dalam program, ekspresi bertipe Boolean seperti `umur >= 17` adalah proposisi setelah `umur` punya nilai.

## Konektif

Proposisi dapat digabung. Misalkan p dan q proposisi.

| Nama | Lambang | Di program | Benar bila |
| --- | --- | --- | --- |
| negasi (bukan) | ¬p | `!p` | p salah |
| konjungsi (dan) | p ∧ q | `p && q` | keduanya benar |
| disjungsi (atau) | p ∨ q | `p \|\| q` | paling sedikit satu benar |
| XOR (atau eksklusif) | p ⊕ q | `p != q` (untuk Boolean) | tepat satu benar |
| implikasi (jika p maka q) | p → q | `!p \|\| q` | salah hanya bila p benar dan q salah |
| biimplikasi (p jika dan hanya jika q) | p ↔ q | `p == q` (untuk Boolean) | p dan q bernilai sama |

"Atau" dalam logika biasa **inklusif**: benar juga bila keduanya benar. "Kopi atau teh" dalam percakapan sering eksklusif; dalam logika itu XOR.

### Tabel kebenaran

Tabel kebenaran memuat semua kemungkinan nilai (B = benar, S = salah).

| p | q | ¬p | p ∧ q | p ∨ q | p ⊕ q | p → q | p ↔ q |
| --- | --- | --- | --- | --- | --- | --- | --- |
| B | B | S | B | B | S | B | B |
| B | S | S | S | B | B | S | S |
| S | B | B | S | B | B | B | S |
| S | S | B | S | S | S | B | B |

Tentang implikasi: p → q hanya salah pada satu baris, yaitu p benar tetapi q salah. Bila p salah, implikasi dianggap benar ("benar secara hampa"). Contoh: "Jika 2 > 3 maka 1 = 1" benar. Janji "jika hujan, aku bawa payung" hanya dilanggar bila hujan dan aku tidak bawa payung.

## Menyusun tabel kebenaran untuk ekspresi

Untuk ekspresi dengan n proposisi dasar ada 2^n baris. Contoh: tabel untuk ¬(p ∧ q) dan ¬p ∨ ¬q.

| p | q | p ∧ q | ¬(p ∧ q) | ¬p | ¬q | ¬p ∨ ¬q |
| --- | --- | --- | --- | --- | --- | --- |
| B | B | B | S | S | S | S |
| B | S | S | B | S | B | B |
| S | B | S | B | B | S | B |
| S | S | S | B | B | B | B |

Kolom ¬(p ∧ q) dan ¬p ∨ ¬q identik. Dua ekspresi dengan kolom yang selalu sama disebut **ekuivalen**, ditulis ≡.

## Ekuivalensi penting

| Hukum | Bentuk |
| --- | --- |
| De Morgan | ¬(p ∧ q) ≡ ¬p ∨ ¬q; ¬(p ∨ q) ≡ ¬p ∧ ¬q |
| negasi ganda | ¬¬p ≡ p |
| implikasi | p → q ≡ ¬p ∨ q |
| kontrapositif | p → q ≡ ¬q → ¬p |
| distributif | p ∧ (q ∨ r) ≡ (p ∧ q) ∨ (p ∧ r); p ∨ (q ∧ r) ≡ (p ∨ q) ∧ (p ∨ r) |
| identitas | p ∧ B ≡ p; p ∨ S ≡ p |
| dominasi | p ∨ B ≡ B; p ∧ S ≡ S |

Pada implikasi p → q, tiga kalimat terkait sering tertukar:

| Nama | Bentuk | Ekuivalen dengan p → q? |
| --- | --- | --- |
| kontrapositif | ¬q → ¬p | ya |
| konvers | q → p | tidak |
| invers | ¬p → ¬q | tidak |

Contoh: "Jika hujan maka jalan basah." Kontrapositif: "Jika jalan tidak basah maka tidak hujan" (selalu benar bila kalimat asli benar). Konvers: "Jika jalan basah maka hujan" (belum tentu: jalan bisa basah karena disiram).

## Menyederhanakan kondisi program

Hukum De Morgan paling sering dipakai untuk membuat kondisi lebih mudah dibaca.

Contoh 1: `if (!(x < 5 || x > 10))`. Dengan De Morgan: `!(x < 5) && !(x > 10)`, yaitu `x >= 5 && x <= 10`. Bacanya jadi jelas: x berada di antara 5 dan 10.

Contoh 2: tuliskan "tiket gratis bila anak (umur < 12) atau lansia (umur >= 60)". Kondisi tiket **berbayar** adalah negasinya: `!(umur < 12 || umur >= 60)`, yaitu `umur >= 12 && umur < 60`.

Contoh 3: `if (a == true)` cukup `if (a)`, dan `if (a == false)` cukup `if (!a)`.

Contoh 4: tiga cabang `if (u < 12) ...; else if (u >= 12 && u < 60) ...; else ...`. Pada cabang kedua, `u >= 12` sudah pasti karena cabang pertama gagal, sehingga cukup `else if (u < 60)`.

Evaluasi hubung-singkat (short-circuit): pada `a && b`, bila `a` salah maka `b` tidak dihitung; pada `a || b`, bila `a` benar maka `b` tidak dihitung. Urutan penulisan penting, misalnya `if (i < n && data[i] > 0)` aman, tetapi urutan terbalik bisa mengakses di luar batas.

## Kuantor secara intuitif

Kalimat dengan peubah dapat dijadikan proposisi dengan **kuantor**:

- **Untuk semua** (∀): "untuk semua bilangan di daftar, bilangan itu positif".
- **Ada** (∃): "ada bilangan di daftar yang genap".

Negasinya mirip De Morgan:

- Negasi "semua bilangan positif" adalah "ada bilangan yang tidak positif".
- Negasi "ada bilangan genap" adalah "semua bilangan ganjil" (untuk bilangan bulat).

Dalam program, kuantor adalah perulangan. "Semua" benar bila tidak ada pelanggar, dan pada daftar kosong "semua" bernilai benar (secara hampa) sedangkan "ada" bernilai salah. Satu contoh tandingan sudah cukup untuk menyalahkan "semua", tetapi satu contoh saja tidak cukup untuk membenarkannya.

## Contoh kode

### C++17: memeriksa ekuivalensi dengan semua kemungkinan (opsional)

Karena hanya ada 2^n kombinasi, kita dapat memeriksa ekuivalensi dengan mencoba semuanya.

```cpp
#include <iostream>
using namespace std;

int main() {
    bool nilai[2] = {false, true};
    bool deMorganBenar = true;
    bool implikasiBenar = true;
    for (bool p : nilai) {
        for (bool q : nilai) {
            // De Morgan: !(p && q) sama dengan !p || !q
            if ((!(p && q)) != (!p || !q)) {
                deMorganBenar = false;
            }
            // Implikasi p -> q sama dengan !p || q, dan sama dengan kontrapositifnya
            bool impl = !p || q;
            bool kontra = q || !p;  // !(!q) sama dengan q
            if (impl != kontra) {
                implikasiBenar = false;
            }
        }
    }
    cout << deMorganBenar << " " << implikasiBenar << "\n";  // 1 1
    return 0;
}
```

### TypeScript: tabel kebenaran dan kuantor (opsional)

Contoh TypeScript ini diperiksa secara manual oleh penyusun dengan menjalankannya memakai Bun; tidak diperiksa otomatis oleh repositori.

```ts
const nilai = [true, false];

for (const p of nilai) {
  for (const q of nilai) {
    const implikasi = !p || q;
    const konvers = !q || p;
    console.log(`p=${p} q=${q} p->q=${implikasi} konvers=${konvers}`);
  }
}

const daftar = [3, 8, 5];
const semuaPositif = daftar.every((x) => x > 0);
const adaGenap = daftar.some((x) => x % 2 === 0);
console.log(semuaPositif, adaGenap); // true true

// Negasi "semua positif" sama dengan "ada yang tidak positif".
console.log(!semuaPositif === daftar.some((x) => !(x > 0))); // true

// Daftar kosong: "semua" benar secara hampa, "ada" salah.
console.log([].every((x: number) => x > 0), [].some((x: number) => x > 0)); // true false
```

## Latihan

### Latihan 1: Proposisi atau bukan

Mana yang proposisi: (a) "13 + 5 = 18", (b) "Berapa umurmu?", (c) "n genap" untuk n yang belum diketahui, (d) "Matahari terbit di barat".

### Latihan 2: Tabel kebenaran

Susun tabel kebenaran untuk (p ∨ q) ∧ ¬(p ∧ q). Konektif apa yang ia setara?

### Latihan 3: De Morgan

Sederhanakan `!(a > 0 && b > 0)` dan `!(s == 1 || s == 2)`.

### Latihan 4: Implikasi

Tulis kontrapositif, konvers, dan invers dari "Jika n habis dibagi 6, maka n genap". Mana yang selalu benar? Mana yang punya contoh tandingan?

### Latihan 5: Menyederhanakan

Kondisi `if (!(umur < 17) && !(umur > 60))` dipakai untuk usia pendaftar. Tulis ulang tanpa tanda `!`, lalu sebutkan rentangnya.

### Latihan 6: Kuantor

Tuliskan negasi dari: (a) "semua siswa di daftar hadir", (b) "ada nilai di bawah 50". Lalu: berapa nilai "semua nilai di daftar kosong lebih dari 100"?

### Latihan 7: Temukan kesalahannya

Kondisi berikut dimaksudkan untuk "n berada di antara 1 dan 9, atau n sama dengan 100". Mengapa ia menerima n = -5, dan bagaimana memperbaikinya?

```cpp
#include <iostream>
using namespace std;

int main() {
    int n = -5;
    if (1 <= n <= 9 || n == 100) {
        cout << "diterima\n";
    }
    return 0;
}
```

### Kunci singkat

- Latihan 1: (a) proposisi (benar); (b) bukan; (c) belum proposisi sampai n diketahui; (d) proposisi (salah).
- Latihan 2: tabel: BB menjadi S, BS menjadi B, SB menjadi B, SS menjadi S. Ia setara dengan XOR (p ⊕ q).
- Latihan 3: `a <= 0 || b <= 0`; `s != 1 && s != 2`.
- Latihan 4: kontrapositif "Jika n tidak genap maka n tidak habis dibagi 6" (selalu benar); konvers "Jika n genap maka n habis dibagi 6" (contoh tandingan n = 4); invers "Jika n tidak habis dibagi 6 maka n tidak genap" (contoh tandingan n = 4).
- Latihan 5: `umur >= 17 && umur <= 60`; rentang 17 sampai 60 termasuk ujung.
- Latihan 6: (a) "ada siswa di daftar yang tidak hadir"; (b) "semua nilai 50 atau lebih"; "semua" pada daftar kosong bernilai benar (secara hampa).
- Latihan 7: `1 <= n <= 9` dihitung dari kiri: `1 <= n` bernilai 0 atau 1, lalu 0 atau 1 selalu `<= 9`, sehingga bagian itu selalu benar. Perbaikan: `(n >= 1 && n <= 9) || n == 100`.

## Kesalahan umum

- Menyamakan "atau" dalam logika (inklusif) dengan "atau" dalam percakapan (sering eksklusif).
- Menganggap konvers atau invers ekuivalen dengan implikasi asalnya.
- Menegasikan `a && b` menjadi `!a && !b` (benar: `!a || !b`).
- Menulis `x > 3 || x < 10` ketika maksudnya "di antara 3 dan 10" (itu selalu benar; yang dimaksud `x > 3 && x < 10`).
- Menulis `0 < x < 10` di C++ atau JavaScript dan berharap berarti rentang (artinya berbeda; tulis dua perbandingan).
- Lupa bahwa `&&` lebih dahulu dievaluasi daripada `||`; pakai tanda kurung.

## Cek mandiri

- Kapan p → q salah?
- Tulis hukum De Morgan untuk dan serta atau.
- Mana pasangan yang ekuivalen: implikasi dengan kontrapositif, atau dengan konvers?
- Bagaimana menegasikan "semua" dan "ada"?
- Mengapa `i < n && data[i] > 0` aman tetapi urutan terbalik berisiko?

## Langkah berikutnya

Lanjutkan ke `matkom-himpunan-relasi-fungsi`, yang memakai logika ini untuk mendefinisikan himpunan dan relasi.

Jembatan ke modul OSN: tabel kebenaran, implikasi, dan modus ponens pada tingkat pembinaan ada di modul `logika-bitwise` (rumpun `logika-bitwise`), termasuk operasi bit yang sengaja tidak dibahas di sini.
