## Untuk siapa modul ini

Modul ini untuk siswa SMA reguler kelas X yang ingin menulis kondisi program dengan benar dan rapi. Ia bagian dari seri Matematika Komputasi Dasar dan berstatus DRAF: karangan penyusun, belum disetujui pemilik, dan tidak dihitung sebagai pemenuhan butir capaian pembelajaran (hanya mendukung butir E-BK-d, solusi program sederhana dalam pseudocode).

Prasyarat: tidak ada modul seri yang harus dibaca lebih dulu. Cukup tahu `if` dan operator perbandingan secara umum.

Minggu silabus v1.1 yang berdekatan: jalur A `A-X1-M10` dan jalur B `B-X1-M10` (percabangan dan logika Boolean). Bacaan mandiri atau rujukan guru; tanpa jadwal wajib.

Setelah mempelajari modul ini, kamu diharapkan bisa:

- membedakan kalimat yang merupakan proposisi dan yang bukan;
- memakai negasi, dan, atau, XOR, implikasi, dan biimplikasi, serta menyusun tabel kebenarannya;
- memakai hukum De Morgan dan ekuivalensi untuk menyederhanakan kondisi program;
- membedakan implikasi, kontrapositif, konvers, dan invers;
- memahami "untuk semua" dan "ada" secara intuitif serta menegasikannya;
- menuliskan kondisi sederhana dalam pseudocode lalu menerjemahkannya ke kondisi program.

Modul ini membahas logika sebagai bahasa penalaran. Operasi bit (mask, pergeseran) tidak dibahas di sini; itu pengayaan terpisah. Bagian pokok dikerjakan di kertas. Contoh C++17 hanya diperiksa bisa dikompilasi, contoh TypeScript diperiksa penyusun secara manual dengan menjalankannya; keduanya bukan bukti benar untuk semua masukan.

## Ingat kembali

Modul ini tidak punya prasyarat modul seri, jadi pertanyaannya mengambil dari pengetahuan umum dan modul fondasi. Jawab tanpa mencari; cocokkan di bagian kunci.

1. Tulis tiga bilangan bulat yang memenuhi `x > 3 && x < 7`.
2. Dalam bahasa sehari-hari, apa arti `if (a > b)`?
3. Apa beda `=` dan `==` di C++ atau JavaScript?
4. Berapa pola berbeda yang bisa dibentuk 3 bit? (modul representasi data)

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

### Menulis kondisi dalam pseudocode

Sebelum menulis kode, kondisi sering lebih mudah dirancang dalam pseudocode, yaitu langkah-langkah yang ditulis dengan kata sehari-hari dekat dengan bahasa pemrograman. Contoh untuk tiket (Contoh 2 di atas):

```text
jika umur < 12 atau umur >= 60:
    harga = 0
selain itu:
    harga = 10000
```

Pseudocode itu setara dengan kondisi berbayar `umur >= 12 && umur < 60`. Menulis kondisi dalam kata dulu, lalu menerjemahkannya ke `&&`, `||`, `!`, membantu menangkap salah paham seperti `x > 3 || x < 10`.

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

**Prediksi dulu.** Baca program, lalu tulis tebakanmu: tiga angka apa yang dicetak? Petunjuk: fungsi `implikasi` ditulis menurut definisi (salah hanya bila p benar dan q salah), bukan menurut rumus `!p || q`.

```cpp
#include <iostream>
using namespace std;

// Implikasi menurut definisinya: salah hanya bila p benar dan q salah.
bool implikasi(bool p, bool q) {
    if (p) {
        return q;
    }
    return true;
}

bool kiriDeMorgan(bool p, bool q) { return !(p && q); }
bool kananDeMorgan(bool p, bool q) { return !p || !q; }

int main() {
    bool nilai[2] = {false, true};
    bool deMorganBenar = true;
    bool rumusBenar = true;
    bool kontraBenar = true;
    for (bool p : nilai) {
        for (bool q : nilai) {
            // De Morgan: !(p && q) sama dengan !p || !q
            if (kiriDeMorgan(p, q) != kananDeMorgan(p, q)) {
                deMorganBenar = false;
            }
            // Implikasi menurut definisi sama dengan !p || q
            if (implikasi(p, q) != (!p || q)) {
                rumusBenar = false;
            }
            // Implikasi sama dengan kontrapositifnya: (!q -> !p)
            if (implikasi(p, q) != implikasi(!q, !p)) {
                kontraBenar = false;
            }
        }
    }
    cout << deMorganBenar << rumusBenar << kontraBenar << "\n";  // 111
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

// Prediksi dulu: tebak baris-baris yang dicetak sebelum menjalankan, termasuk daftar kosong di akhir.
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

### Latihan 8: Susun program (soal Parsons)

Empat baris berikut tercampur. Susun menjadi fungsi yang benar untuk "semua bilangan di daftar positif". Lalu: apa yang dikembalikan untuk daftar kosong?

```text
(a) return true;
(b) for (int x : daftar) if (x <= 0) return false;
(c) bool semuaPositif(const vector<int>& daftar) {
(d) }
```

### Latihan 9: Lengkapi kode (soal setengah jadi)

Lengkapi fungsi "ada bilangan genap di daftar":

```text
bool adaGenap(const vector<int>& daftar) {
    for (int x : daftar) if (x % ____ == 0) return ____;
    return ____;
}
```

### Latihan 10: Pseudocode ke kondisi

Tulis pseudocode lalu kondisi C++ untuk: "diskon diberikan bila total belanja minimal 100 ribu atau pembeli adalah anggota, tetapi tidak bila barang sedang promo". Beri tanda kurung agar urutan `&&` dan `||` tidak membingungkan.

### Latihan bercampur dan ulang berjarak

Kerjakan tanpa melihat catatan.

1. Sederhanakan `!(x < 0 || x > 100)` dan tulis rentang x.
2. Sebuah implikasi "jika hujan maka jalan basah" benar. Mana yang pasti benar: kontrapositif, konvers, atau invers?
3. Berapa baris tabel kebenaran untuk ekspresi dengan 4 proposisi dasar? Hubungkan dengan banyak pola 4 bit.
4. Jelaskan dengan kata-katamu mengapa `semuaPositif` untuk daftar kosong mengembalikan `true`. (Penjelasan diri.)
5. Temukan kesalahannya: `if (x == 3 || 4)` dimaksudkan "x sama dengan 3 atau 4". Apa yang salah, dan bagaimana memperbaikinya?

Jadwal ulang: jawab lagi tanpa catatan setelah satu hari dan setelah satu minggu; ganti angkanya. Soal serupa muncul lagi di awal modul himpunan, relasi, dan fungsi.

### Kunci singkat

- Latihan 1: (a) proposisi (benar); (b) bukan; (c) belum proposisi sampai n diketahui; (d) proposisi (salah).
- Latihan 2: tabel: BB menjadi S, BS menjadi B, SB menjadi B, SS menjadi S. Ia setara dengan XOR (p ⊕ q).
- Latihan 3: `a <= 0 || b <= 0`; `s != 1 && s != 2`.
- Latihan 4: kontrapositif "Jika n tidak genap maka n tidak habis dibagi 6" (selalu benar); konvers "Jika n genap maka n habis dibagi 6" (contoh tandingan n = 4); invers "Jika n tidak habis dibagi 6 maka n tidak genap" (contoh tandingan n = 4).
- Latihan 5: `umur >= 17 && umur <= 60`; rentang 17 sampai 60 termasuk ujung.
- Latihan 6: (a) "ada siswa di daftar yang tidak hadir"; (b) "semua nilai 50 atau lebih"; "semua" pada daftar kosong bernilai benar (secara hampa).
- Latihan 7: `1 <= n <= 9` dihitung dari kiri: `1 <= n` bernilai 0 atau 1, lalu 0 atau 1 selalu `<= 9`, sehingga bagian itu selalu benar. Perbaikan: `(n >= 1 && n <= 9) || n == 100`.
- Latihan 8: urutan (c), (b), (a), (d). Untuk daftar kosong: `true` (secara hampa), karena tidak ada pelanggar. Bila urutanmu beda: fungsi harus dibuka dulu, pengembalian `true` hanya setelah semua anggota diperiksa.
- Latihan 9: `2`, `true`, `false`. Untuk daftar kosong hasilnya `false`. Bila memakai `x % 2 == 1`, itu mencari ganjil; periksa lagi dengan daftar `{3, 8, 5}`.
- Latihan 10: pseudocode: `jika (total >= 100000 atau anggota) dan bukan promo: diskon`. C++: `if ((total >= 100000 || anggota) && !promo)`. Tanpa tanda kurung, `&&` dievaluasi lebih dulu dan artinya berubah. Bila kondisimu hanya benar sebagian, buat tabel kebenaran tiga kolom (total cukup, anggota, promo) dan bandingkan baris demi baris.
- Ingat kembali: 1: misalnya 4, 5, 6. 2: "jika a lebih besar dari b, kerjakan bagian berikutnya". 3: `=` memberi nilai, `==` membandingkan. 4: 8 pola. Bila ada yang salah, ulangi bagian itu lalu jawab lagi besok.
- Latihan bercampur: 1: `x >= 0 && x <= 100`; rentang 0 sampai 100 termasuk ujung. 2: kontrapositif. 3: 2^4 = 16 baris, sama dengan banyak pola 4 bit. 4: tidak ada angka yang melanggar, jadi pernyataan "tidak ada yang tidak positif" benar. 5: `4` dianggap benar (bukan nol) sehingga kondisi selalu benar; perbaikan `x == 3 || x == 4`.

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
