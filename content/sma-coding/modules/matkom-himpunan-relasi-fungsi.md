## Untuk siapa modul ini

Modul ini untuk siswa SMA reguler kelas X semester 2 sampai kelas XI yang ingin memakai himpunan, relasi, dan fungsi sebagai bahasa untuk menyatakan data dan hubungan antardata. Ia bagian dari seri Matematika Komputasi Dasar dan disetujui pemilik program pada 2026-11-20 (keputusan lewat dialog; catatan tinjauan menjadi tindak lanjut revisi); isinya karangan penyusun, dan tidak dihitung sebagai pemenuhan butir capaian pembelajaran (hanya mendukung butir F-BK-c dan F-AP-d, pemilihan solusi dengan struktur data abstrak).

Prasyarat: modul `matkom-logika-proposisi` (proposisi, konektif, kuantor). Pengetahuan fungsi pada pemrograman membantu tetapi tidak wajib.

Minggu silabus v1.1 yang berdekatan: jalur A `A-X1-M12` (fungsi dan parameter), `A-XI1-M9` (`pair`, `set`, `map`), dan `A-XI2-M5` (graf: representasi); jalur B `B-X1-M12` (fungsi) dan `B-XI1-M8` (struktur data di TypeScript: `Map`, `Set`, graf). Bacaan mandiri atau rujukan guru; tanpa jadwal wajib.

Setelah mempelajari modul ini, kamu diharapkan bisa:

- menuliskan himpunan dan melakukan operasi gabungan, irisan, selisih, dan komplemen;
- menghitung banyak anggota dengan prinsip inklusi-eksklusi dua himpunan;
- membentuk hasil kali Kartesius dan menyatakan relasi sebagai himpunan pasangan terurut;
- memeriksa sifat refleksif, simetris, dan transitif;
- menentukan apakah suatu relasi adalah fungsi, dan apakah fungsi itu satu-satu atau pada;
- membedakan fungsi matematis dengan fungsi pada program;
- menyatakan relasi sebagai graf.

Modul ini membahas himpunan secara matematis, bukan pustaka `set` C++ (untuk itu lihat modul OSN). Contoh C++17 hanya diperiksa bisa dikompilasi, contoh TypeScript diperiksa penyusun secara manual dengan menjalankannya; keduanya bukan bukti benar untuk semua masukan. Bagian pokok dapat dikerjakan di kertas.

## Ingat kembali

Jawab dari ingatan, tanpa membuka modul `matkom-logika-proposisi`. Cocokkan di bagian kunci.

1. Kapan implikasi p → q bernilai salah?
2. Tulis hukum De Morgan untuk `!(p && q)` dan `!(p || q)`.
3. Tulis negasi dari "semua bilangan di daftar positif".
4. Berapa baris tabel kebenaran untuk 3 proposisi dasar?
5. Mengapa `i < n && data[i] > 0` aman, tetapi urutan terbalik berisiko?

## Himpunan

**Himpunan** adalah kumpulan objek yang berbeda; objeknya disebut **anggota**. Himpunan ditulis dengan kurung kurawal: A = {1, 2, 3}. Urutan dan pengulangan tidak berpengaruh: {1, 2, 3} = {3, 1, 2, 2}.

| Lambang | Arti | Contoh |
| --- | --- | --- |
| x ∈ A | x anggota A | 2 ∈ {1, 2, 3} |
| x ∉ A | x bukan anggota A | 5 ∉ {1, 2, 3} |
| A ⊆ B | A bagian dari B (semua anggota A ada di B) | {1, 2} ⊆ {1, 2, 3} |
| ∅ | himpunan kosong | himpunan bilangan genap yang ganjil |
| \|A\| | banyak anggota A | \|{1, 2, 3}\| = 3 |

Himpunan kosong adalah bagian dari setiap himpunan. Himpunan dengan n anggota punya 2^n himpunan bagian (setiap anggota bisa ikut atau tidak), misalnya {a, b, c} punya 8.

Himpunan dapat ditulis dengan menyebut anggotanya, atau dengan **syarat**: { x | x bilangan bulat, 1 ≤ x ≤ 5 } = {1, 2, 3, 4, 5}. Cara kedua memakai logika dari modul sebelumnya.

## Operasi himpunan

Misalkan semesta U = {1, 2, ..., 10}, A = {1, 2, 3, 4, 5}, dan B = {4, 5, 6, 7}.

| Operasi | Lambang | Arti | Hasil |
| --- | --- | --- | --- |
| gabungan | A ∪ B | anggota A atau B | {1, 2, 3, 4, 5, 6, 7} |
| irisan | A ∩ B | anggota A dan B | {4, 5} |
| selisih | A − B | anggota A yang bukan B | {1, 2, 3} |
| selisih | B − A | anggota B yang bukan A | {6, 7} |
| komplemen | Aᶜ | anggota U yang bukan A | {6, 7, 8, 9, 10} |

Ini cocok dengan logika: gabungan memakai "atau", irisan memakai "dan", komplemen memakai "bukan". Karena itu hukum De Morgan berlaku juga: (A ∪ B)ᶜ = Aᶜ ∩ Bᶜ.

**Diagram Venn** menggambar himpunan sebagai lingkaran di dalam persegi panjang semesta. Bagian tumpang-tindih kedua lingkaran adalah irisan.

### Prinsip inklusi-eksklusi untuk dua himpunan

|A ∪ B| = |A| + |B| − |A ∩ B|

Anggota di irisan terhitung dua kali bila hanya dijumlah, sehingga dikurangi satu kali. Pada contoh: 5 + 4 − 2 = 7, cocok dengan |{1, ..., 7}| = 7.

Contoh cerita (fiktif): di kelas 30 siswa, 18 mengikuti klub robot, 14 mengikuti klub musik, dan 6 mengikuti keduanya. Yang mengikuti paling sedikit satu klub: 18 + 14 − 6 = 26. Yang tidak mengikuti klub: 30 − 26 = 4.

## Pasangan terurut dan hasil kali Kartesius

**Pasangan terurut** (a, b) memperhatikan urutan: (1, 2) berbeda dari (2, 1).

**Hasil kali Kartesius** A × B adalah himpunan semua pasangan (a, b) dengan a ∈ A dan b ∈ B. Contoh: A = {a, b}, B = {1, 2, 3}:

A × B = {(a,1), (a,2), (a,3), (b,1), (b,2), (b,3)}, dan |A × B| = |A| · |B| = 2 · 3 = 6.

Titik pada bidang koordinat adalah anggota ℝ × ℝ. Sel pada tabel (baris, kolom) adalah anggota (himpunan baris) × (himpunan kolom).

## Relasi

**Relasi** dari A ke B adalah himpunan bagian dari A × B. Pasangan (a, b) ada dalam relasi berarti "a berhubungan dengan b".

Contoh: A = {1, 2, 3} dan relasi "kurang dari" pada A: R = {(1,2), (1,3), (2,3)}.

### Sifat relasi pada satu himpunan

Misalkan R relasi pada himpunan A.

| Sifat | Arti | Contoh yang memenuhi pada bilangan |
| --- | --- | --- |
| refleksif | setiap x ∈ A: (x, x) ∈ R | "sama dengan", "kurang dari atau sama dengan" |
| simetris | bila (x, y) ∈ R maka (y, x) ∈ R | "sama dengan", "berbeda dari" |
| transitif | bila (x, y) ∈ R dan (y, z) ∈ R maka (x, z) ∈ R | "kurang dari", "habis membagi" |

Contoh pemeriksaan pada A = {1, 2, 3}:

- R₁ = {(1,1), (2,2), (3,3)} (relasi "sama"): refleksif, simetris, transitif.
- R₂ = {(1,2), (2,1)}: simetris, **tidak** refleksif (tidak ada (1,1)), **tidak** transitif (ada (1,2) dan (2,1), tetapi tidak ada (1,1)).
- R₃ = {(1,2), (1,3), (2,3)} ("kurang dari"): tidak refleksif, tidak simetris, transitif.

Relasi yang refleksif, simetris, dan transitif disebut **relasi ekuivalensi**. Ia membagi himpunan menjadi kelompok-kelompok terpisah. Contoh: "mempunyai sisa bagi 3 yang sama" pada {1, ..., 6} membentuk kelompok {1, 4}, {2, 5}, {3, 6}.

## Fungsi

**Fungsi** dari A ke B adalah relasi di mana **setiap** anggota A berpasangan dengan **tepat satu** anggota B. A disebut **domain**, B disebut **kodomain**, dan himpunan nilai yang benar-benar muncul disebut **daerah hasil** (range).

Contoh: A = {1, 2, 3}, B = {a, b, c, d}.

- f = {(1,a), (2,b), (3,b)}: fungsi.
- g = {(1,a), (1,b), (2,c), (3,d)}: bukan fungsi (1 punya dua pasangan).
- h = {(1,a), (2,b)}: bukan fungsi pada A (3 tidak punya pasangan).

### Satu-satu dan pada

| Sifat | Arti |
| --- | --- |
| satu-satu (injektif) | dua masukan berbeda selalu memberi keluaran berbeda |
| pada (surjektif) | setiap anggota kodomain adalah keluaran dari paling sedikit satu masukan |
| korespondensi satu-satu (bijektif) | satu-satu dan pada sekaligus |

Untuk f di atas: bukan satu-satu (2 dan 3 sama-sama ke b) dan bukan pada (c dan d tidak terpakai).

Contoh pada bilangan: f(x) = x² dari bilangan bulat ke bilangan bulat tidak satu-satu karena f(2) = f(−2) = 4. Bila domainnya dibatasi ke bilangan asli, ia satu-satu. Fungsi x mod 3 dari {0, ..., 8} ke {0, 1, 2} adalah pada tetapi tidak satu-satu.

Menghitung fungsi: bila |A| = m dan |B| = n, banyak fungsi dari A ke B adalah n^m (tiap anggota A bebas memilih n keluaran). Banyak fungsi satu-satu adalah n · (n−1) · ... · (n−m+1). Dengan |A| = 3 dan |B| = 4: semua fungsi 4³ = 64, yang satu-satu 4 · 3 · 2 = 24. Fungsi bijektif hanya mungkin bila |A| = |B|.

Fungsi bijektif punya **invers**: fungsi kebalikan yang mengembalikan keluaran ke masukannya.

## Fungsi matematis dan fungsi pada program

Fungsi di program mirip, tetapi tidak sama:

| Fungsi matematis | Fungsi pada program |
| --- | --- |
| hasil hanya bergantung pada masukan | hasil bisa bergantung pada keadaan lain (variabel global, waktu, bilangan acak, berkas) |
| selalu punya nilai untuk setiap anggota domain | bisa tidak berhenti, gagal, atau tidak mengembalikan apa-apa |
| tidak mengubah apa pun di luar dirinya | bisa mencetak, mengubah variabel, atau menulis berkas (efek samping) |

Fungsi program yang hasilnya hanya bergantung pada parameter dan tanpa efek samping disebut **murni** dan berperilaku seperti fungsi matematis, sehingga lebih mudah diuji dan dipikirkan. Domain dan kodomain pada program setara dengan tipe parameter dan tipe hasil.

## Relasi sebagai graf

Relasi pada himpunan A dapat digambar sebagai **graf berarah**: tiap anggota A adalah satu titik (simpul), dan tiap pasangan (x, y) ∈ R adalah satu panah dari x ke y.

Sifat relasi terlihat pada gambar: refleksif berarti setiap simpul punya panah ke dirinya sendiri; simetris berarti setiap panah punya panah balik; transitif berarti bila ada jalan dua langkah x → y → z maka ada panah langsung x → z. Daftar pasangan relasi adalah **daftar sisi** graf; kelak bentuk ini dipakai pada pembahasan graf di jalur A.

## Contoh kode

### C++17: operasi himpunan dan sifat relasi (opsional)

**Prediksi dulu.** Sebelum membaca komentar keluaran, tebak dan tulis tiga baris yang dicetak. Untuk dua baris terakhir, tiap digit berurutan menyatakan refleksif, simetris, transitif (1 = ya, 0 = tidak); periksa `r2` dan `r3` dengan tangan memakai definisi sifat.

```cpp
#include <iostream>
#include <set>
#include <utility>
#include <vector>
using namespace std;

using Relasi = set<pair<int, int>>;

bool refleksif(const Relasi& r, const vector<int>& a) {
    for (int x : a) {
        if (!r.count({x, x})) {
            return false;
        }
    }
    return true;
}

bool simetris(const Relasi& r) {
    for (auto [x, y] : r) {
        if (!r.count({y, x})) {
            return false;
        }
    }
    return true;
}

bool transitif(const Relasi& r) {
    for (auto [x, y] : r) {
        for (auto [p, z] : r) {
            if (y == p && !r.count({x, z})) {
                return false;
            }
        }
    }
    return true;
}

int main() {
    set<int> a = {1, 2, 3, 4, 5};
    set<int> b = {4, 5, 6, 7};
    set<int> irisan;
    set<int> gabungan = a;
    for (int x : b) {
        gabungan.insert(x);
        if (a.count(x)) {
            irisan.insert(x);
        }
    }
    // |A u B| = |A| + |B| - |A n B|
    cout << gabungan.size() << " = " << a.size() << " + " << b.size() << " - " << irisan.size() << "\n";

    vector<int> dasar = {1, 2, 3};
    Relasi r2 = {{1, 2}, {2, 1}};
    Relasi r3 = {{1, 2}, {1, 3}, {2, 3}};
    cout << refleksif(r2, dasar) << simetris(r2) << transitif(r2) << "\n";  // 010
    cout << refleksif(r3, dasar) << simetris(r3) << transitif(r3) << "\n";  // 001
    return 0;
}
```

### TypeScript: fungsi satu-satu dan pada (opsional)

Contoh TypeScript ini diperiksa secara manual oleh penyusun dengan menjalankannya memakai Bun; tidak diperiksa otomatis oleh repositori.

```ts
type Pasangan = [number, string];

const domain = [1, 2, 3];
const kodomain = ["a", "b", "c", "d"];
const f: Pasangan[] = [
  [1, "a"],
  [2, "b"],
  [3, "b"],
];

function adalahFungsi(r: Pasangan[], dom: number[]): boolean {
  return dom.every((x) => r.filter(([p]) => p === x).length === 1);
}

function satuSatu(r: Pasangan[]): boolean {
  const keluaran = r.map(([, y]) => y);
  return new Set(keluaran).size === keluaran.length;
}

function pada(r: Pasangan[], kod: string[]): boolean {
  const keluaran = new Set(r.map(([, y]) => y));
  return kod.every((y) => keluaran.has(y));
}

console.log(adalahFungsi(f, domain)); // true
console.log(satuSatu(f)); // false: 2 dan 3 sama-sama ke "b"
console.log(pada(f, kodomain)); // false: "c" dan "d" tidak terpakai

// Banyak fungsi dan fungsi satu-satu dari 3 anggota ke 4 anggota.
console.log(4 ** 3, 4 * 3 * 2); // 64 24
```

## Latihan

### Latihan 1: Operasi

Misalkan U = {1, ..., 12}, A = {2, 4, 6, 8, 10, 12}, B = {3, 6, 9, 12}. Tuliskan A ∪ B, A ∩ B, A − B, Bᶜ.

### Latihan 2: Inklusi-eksklusi

Di sebuah angkatan fiktif 120 siswa, 70 menyukai pelajaran informatika, 55 menyukai matematika, dan 25 menyukai keduanya. Berapa yang menyukai paling sedikit satu? Berapa yang tidak menyukai keduanya?

### Latihan 3: Hasil kali Kartesius

Jika |A| = 4 dan |B| = 5, berapa |A × B|? Berapa banyak himpunan bagian A? Berapa banyak relasi berbeda dari A ke B? (Petunjuk: relasi adalah himpunan bagian dari A × B.)

### Latihan 4: Sifat relasi

Pada A = {1, 2, 3}, periksa sifat refleksif, simetris, dan transitif untuk: (a) R = {(1,1), (2,2), (3,3), (1,2), (2,1)}, (b) R = {(1,2), (2,3)}.

### Latihan 5: Fungsi atau bukan

Pada A = {1, 2, 3, 4} dan B = {x, y}, apakah himpunan pasangan berikut fungsi? Bila ya, apakah satu-satu atau pada? (a) {(1,x), (2,x), (3,y), (4,y)}, (b) {(1,x), (2,y), (3,x)}.

### Latihan 6: Menghitung fungsi

Berapa banyak fungsi dari {1, 2, 3} ke {p, q, r, s, t}? Berapa di antaranya satu-satu?

### Latihan 7: Program

Fungsi `int hitung(int x) { static int pemanggilan = 0; pemanggilan++; return x + pemanggilan; }` apakah berperilaku seperti fungsi matematis? Jelaskan dengan dua contoh pemanggilan berturut-turut dengan x yang sama.

### Latihan 8: Susun program (soal Parsons)

Empat baris berikut tercampur. Susun menjadi fungsi yang memeriksa sifat simetris sebuah relasi.

```text
(a) return true;
(b) }
(c) for (auto [x, y] : r) if (!r.count({y, x})) return false;
(d) bool simetris(const Relasi& r) {
```

### Latihan 9: Lengkapi kode (soal setengah jadi)

Lengkapi pemeriksaan transitif: bila `(x, y)` dan `(p, z)` ada dan `y == p`, maka `(x, z)` harus ada.

```text
for (auto [x, y] : r) {
    for (auto [p, z] : r) {
        if (y == ____ && !r.count({____, z})) {
            return false;
        }
    }
}
```

### Latihan bercampur dan ulang berjarak

Kerjakan tanpa melihat catatan.

1. Tulis A × B untuk A = {1, 2} dan B = {x, y}, lalu satu relasi dari A ke B yang merupakan fungsi dan satu yang bukan.
2. Relasi "habis membagi" pada {1, 2, 3, 4, 6}: periksa refleksif, simetris, dan transitif.
3. Tulis negasi dari "relasi R simetris" memakai kuantor (modul logika), lalu beri satu contoh relasi yang menyalahkan "R simetris".
4. Jelaskan dengan kata-katamu mengapa satu contoh tandingan sudah cukup untuk menyalahkan "semua", tetapi satu contoh tidak cukup untuk membenarkannya. (Penjelasan diri.)
5. Berapa banyak fungsi satu-satu dari {1, 2} ke {a, b, c, d}?

Jadwal ulang: jawab lagi tanpa catatan setelah satu hari dan setelah satu minggu; ganti himpunannya. Soal serupa muncul lagi di awal modul induksi dan rekursi matematis.

### Kunci singkat

- Latihan 1: A ∪ B = {2, 3, 4, 6, 8, 9, 10, 12}; A ∩ B = {6, 12}; A − B = {2, 4, 8, 10}; Bᶜ = {1, 2, 4, 5, 7, 8, 10, 11}.
- Latihan 2: 70 + 55 − 25 = 100; tidak menyukai keduanya 120 − 100 = 20.
- Latihan 3: 20; 2⁴ = 16; 2²⁰ = 1.048.576.
- Latihan 4: (a) refleksif, simetris, transitif (ia relasi ekuivalensi: kelompok {1, 2} dan {3}); (b) tidak refleksif, tidak simetris, tidak transitif (ada (1,2) dan (2,3), tetapi tidak ada (1,3)).
- Latihan 5: (a) fungsi, bukan satu-satu, pada; (b) bukan fungsi karena 4 tidak punya pasangan.
- Latihan 6: 5³ = 125; satu-satu 5 · 4 · 3 = 60.
- Latihan 7: bukan. Pemanggilan pertama `hitung(10)` memberi 11, pemanggilan kedua `hitung(10)` memberi 12, masukan sama tetapi keluaran berbeda karena bergantung pada keadaan `pemanggilan`.
- Latihan 8: urutan (d), (c), (a), (b). Bila `return true` ditaruh di dalam perulangan, fungsi berhenti terlalu cepat; jalankan urutanmu pada `r2` dan `r3`.
- Latihan 9: `p` dan `x`. Syarat `(x, z)` memakai `x` dari pasangan pertama dan `z` dari pasangan kedua. Bila kamu menulis `y`, telusuri `r3`.
- Ingat kembali: 1: hanya bila p benar dan q salah. 2: `!(p && q)` sama dengan `!p || !q`; `!(p || q)` sama dengan `!p && !q`. 3: "ada bilangan di daftar yang tidak positif". 4: 2^3 = 8. 5: jika `i >= n`, ekspresi pertama salah dan `data[i]` tidak dievaluasi (hubung-singkat). Bila ada yang salah, ulangi bagian itu di modul logika lalu jawab lagi besok.
- Latihan bercampur: 1: A × B = {(1,x), (1,y), (2,x), (2,y)}; fungsi: {(1,x), (2,x)}; bukan fungsi: {(1,x), (1,y)}. 2: refleksif ya; simetris tidak (2 habis membagi 4 tetapi 4 tidak habis membagi 2); transitif ya. 3: "ada pasangan (x, y) di R dengan (y, x) tidak di R"; contoh R = {(1,2)}. 4: satu pelanggar langsung membuktikan "tidak semua", sedangkan membenarkan "semua" menuntut memeriksa seluruh anggota. 5: 4 · 3 = 12.

## Kesalahan umum

- Menganggap urutan atau pengulangan anggota membedakan himpunan.
- Menjumlahkan |A| dan |B| tanpa mengurangi irisan.
- Menyamakan relasi dengan fungsi; fungsi menuntut tepat satu keluaran untuk setiap masukan.
- Mengira simetris sama dengan "ada satu panah balik"; semua panah harus punya panah balik.
- Mengira fungsi pada program selalu murni.

## Cek mandiri

- Apa beda himpunan bagian dan anggota?
- Tuliskan rumus inklusi-eksklusi untuk dua himpunan.
- Apa tiga sifat relasi dan bagaimana tampilannya pada graf?
- Apa beda satu-satu dan pada?
- Kapan fungsi di program berperilaku seperti fungsi matematis?

## Langkah berikutnya

Lanjutkan ke `matkom-induksi-dan-rekursi-matematis`, yang memakai fungsi dengan domain bilangan asli.

Jembatan ke modul OSN: himpunan pada tingkat pembinaan ada di modul `aritmetika` (rumpun `aritmetika`), `set` dan `map` di modul `struktur-data` (rumpun `struktur-data`), dan relasi sebagai graf di modul `graph-tree` (rumpun `graph-tree`).
