## Untuk siapa modul ini

Modul ini untuk murid kelas XII jalur E (komputasi kuantum), minggu `E-XII2-M3` silabus v1.4: pengayaan algoritma hibrida (konsep), yaitu pola kuantum-klasik bergantian seperti VQE dan QAOA secara garis besar, dengan keluaran diagram hibrida. Prasyarat: modul `e-xii2-m2`; modul `e-xii1-m9` belum terindeks, jadi guru memeriksanya. Di luar indeks, bagian kode memerlukan dasar pemrograman setara `B-X1-M9..M12` (TypeScript dengan Bun); bagian konsep terbuka bagi semua murid. Alat: kertas, kalkulator, dan program TypeScript kecil di bawah (tanpa akun).

Modul ini berstatus DRAF: karangan penyusun, belum ditinjau pemilik. Jalur E adalah pengayaan di luar rumusan CP; minggu ini tanpa irisan pengayaan, jadi modul ini tidak dihitung memenuhi butir CP mana pun.

Aturan AI jalur ini: AI generatif boleh dipakai dengan etika dan dicatat, tanpa data pribadi, kata sandi, atau tugas bernilai pada permintaanmu, dan tanpa akun wajib. Saran: jawab dulu sendiri, baru minta petunjuk bertahap; kode buatan AI kamu baca, jalankan, dan uji. Setiap soal `Latihan` bertanda `AI: boleh` atau `AI: tanpa AI`.

Catatan untuk guru: gambaran VQE (keadaan berparameter, nilai harap diukur, pengoptimal klasik menyesuaikan parameter, energi terukur tidak lebih rendah daripada energi dasar sebenarnya, serta kendala pada skala besar) dibaca dari tutorial IBM Quantum "Variational Quantum Eigensolver", per tanggal akses 2026-11-19. Gagasan QAOA dibaca dari ringkasan makalah Farhi, Goldstone, dan Gutmann (arXiv:1411.4028), VQE awal dari ringkasan Peruzzo dkk. (arXiv:1304.3061). Modul ini hanya menjelaskan pola dan menelusuri satu model satu qubit buatan penyusun; ia tidak menjalankan VQE atau QAOA bermakna dan tidak mengklaim keunggulan atas komputer klasik.

## Ingat kembali

Jawab dari ingatan, baru cek di bagian kunci.

1. Mengapa ekstrapolasi nol-derau memerlukan lebih banyak shot dan tetap belum tentu tak bias? (dari `e-xii2-m2`)
2. Bagaimana menilai bahwa dua histogram 1000 shot dari sirkuit yang sama masih wajar berbeda? (dari `e-xii1-m9`)
3. Mengapa satu selang 95 persen yang tidak memuat nilai ideal belum membuktikan ada sebab selain acak shot? (dari `e-xii2-m1`)

## Tujuan

Setelah modul ini kamu dapat:

- menggambar pola hibrida: bagian mana di perangkat kuantum dan bagian mana di komputer klasik;
- menjelaskan VQE dan QAOA dalam beberapa kalimat tanpa melebih-lebihkan;
- menelusuri satu iterasi dengan aturan pergeseran parameter pada simulator satu qubit;
- menjelaskan mengapa derau shot dan jumlah pembacaan membatasi algoritma hibrida.

Keluaran yang diminta silabus: diagram hibrida.

## Prediksi dulu

Keadaan satu qubit `Ry(theta)|0>` memiliki amplitudo `(cos(theta/2), sin(theta/2))`. Energinya terhadap `H = 0,6 Z + 0,8 X` adalah `E(theta) = 0,6 cos(theta) + 0,8 sin(theta)`. Tebak dan tulis: (1) berapa energi terendah yang mungkin; (2) pada `theta = 0,5`, apakah menaikkan atau menurunkan `theta` akan menurunkan energi; (3) bila energi dihitung dari hanya 10 shot per pengukuran, apakah estimasi energi boleh lebih rendah dari energi terendah sebenarnya.

## Contoh terselesaikan

**Pola hibrida.** Perangkat kuantum paling baik mempersiapkan keadaan dan mengukurnya; komputer klasik paling baik mengatur parameter. VQE (*variational quantum eigensolver*) memperkirakan energi dasar suatu sistem: pengoptimal klasik menyesuaikan parameter `theta` sampai energi terukur terendah; menurut tutorial IBM, energi terukur selalu merupakan batas atas energi dasar sebenarnya. QAOA (*quantum approximate optimization algorithm*) memakai pola serupa untuk masalah optimasi kombinatorial; menurut ringkasan Farhi dkk., ia bergantung pada bilangan bulat `p` dan mutu hampirannya membaik bila `p` dinaikkan.

```text
komputer klasik                          perangkat kuantum (atau simulator)
---------------                          ----------------------------------
tetapkan theta                  ------>  siapkan keadaan Ry(theta)|0>
                                         ukur di basis Z dan basis X, banyak shot
hitung E dari hitungan shot     <------  hitungan hasil
hitung gradien (pergeseran)  ----------> jalankan lagi pada theta + 90° dan theta - 90°
perbarui theta; ulangi sampai E berhenti turun
```

**Satu iterasi dengan tangan.** Pada `theta = 0,5`: `E = 0,6 cos 0,5 + 0,8 sin 0,5` = 0,9101. Gradiennya `dE/dtheta = -0,6 sin 0,5 + 0,8 cos 0,5` = 0,4144 (positif, jadi `theta` harus turun). Aturan pergeseran parameter menghitungnya dari dua energi: `[E(theta + pi/2) - E(theta - pi/2)] / 2`; untuk `E` ini hasilnya persis sama dengan turunan. Dengan laju 0,4: `theta` baru = `0,5 - 0,4 x 0,4144` = 0,3342.

Program TypeScript (dijalankan dengan `bun`) mensimulasikan bagian kuantum dengan peluang hasil dan mengukur dalam basis `Z` dan `X`, lalu melakukan 40 iterasi.

```ts
// Hibrida kuantum-klasik satu qubit: keadaan Ry(theta)|0> = (cos(theta/2), sin(theta/2)).
// Hamiltonian H = A*Z + B*X; energi terendah eksak = -akar(A^2 + B^2).
const A = 0.6;
const B = 0.8;
const E_MIN = -Math.sqrt(A * A + B * B);

let benih = 2026; // benih tetap, hanya untuk simulasi
function acak01(): number {
  // mulberry32
  benih = (benih + 0x6d2b79f5) | 0;
  let t = Math.imul(benih ^ (benih >>> 15), 1 | benih);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
}

// Bagian kuantum (disimulasikan): siapkan keadaan, putar basis bila perlu, baca `shot` kali.
function rata2(theta: number, basis: "Z" | "X", shot: number): number {
  let [a, b] = [Math.cos(theta / 2), Math.sin(theta / 2)];
  if (basis === "X") {
    [a, b] = [(a + b) / Math.SQRT2, (a - b) / Math.SQRT2]; // gerbang H sebelum baca
  }
  const peluang0 = a * a;
  let n0 = 0;
  for (let s = 0; s < shot; s++) if (acak01() < peluang0) n0++;
  return (2 * n0 - shot) / shot; // nilai harap +1 untuk hasil 0, -1 untuk hasil 1
}

function energiEstimasi(theta: number, shot: number): number {
  return A * rata2(theta, "Z", shot) + B * rata2(theta, "X", shot);
}

function energiEksak(theta: number): number {
  return A * Math.cos(theta) + B * Math.sin(theta);
}

// Bagian klasik: aturan pergeseran parameter lalu satu langkah turun.
function langkah(theta: number, shot: number, laju: number): number {
  const g = (energiEstimasi(theta + Math.PI / 2, shot) - energiEstimasi(theta - Math.PI / 2, shot)) / 2;
  return theta - laju * g;
}

const shot = 1000;
const laju = 0.4;
let theta = 0.5;

// Satu iterasi ditelusuri: nilai eksak (tanpa derau shot) lawan estimasi 1000 shot.
const gEksak = -A * Math.sin(theta) + B * Math.cos(theta);
console.log(`theta0 = ${theta.toFixed(4)}  E eksak = ${energiEksak(theta).toFixed(4)}  gradien eksak = ${gEksak.toFixed(4)}`);
console.log(`E estimasi (${shot} shot) = ${energiEstimasi(theta, shot).toFixed(4)}`);
console.log(`theta1 eksak = ${(theta - laju * gEksak).toFixed(4)}`);

console.log("iterasi  theta    E eksak");
for (let i = 0; i <= 40; i++) {
  if ([0, 1, 2, 5, 10, 20, 40].includes(i)) {
    console.log(`${String(i).padStart(7)}  ${theta.toFixed(4)}  ${energiEksak(theta).toFixed(4)}`);
  }
  if (i < 40) theta = langkah(theta, shot, laju);
}
console.log(`E terendah eksak = ${E_MIN.toFixed(4)}`);
console.log(`E estimasi akhir (${shot} shot) = ${energiEstimasi(theta, shot).toFixed(4)}`);
console.log(`jumlah pembacaan sirkuit = ${40 * 4 * shot}`);
```

Keluaran asli (dijalankan penyusun dengan `bun`):

```text
theta0 = 0.5000  E eksak = 0.9101  gradien eksak = 0.4144
E estimasi (1000 shot) = 0.8840
theta1 eksak = 0.3342
iterasi  theta    E eksak
      0  0.5000  0.9101
      1  0.3339  0.8291
      2  0.1144  0.6874
      5  -0.9262  -0.2789
     10  -2.0724  -0.9899
     20  -2.2178  -1.0000
     40  -2.2214  -1.0000
E terendah eksak = -1.0000
E estimasi akhir (1000 shot) = -0.9796
jumlah pembacaan sirkuit = 160000
```

Bacaan hasilnya. Iterasi pertama menurut estimasi 1000 shot hanya menggeser `theta` dari 0,5 ke 0,3339, sangat dekat dengan 0,3342 hitungan tangan; energi estimasi 0,8840 lawan eksak 0,9101 menunjukkan derau shot. Energi turun cepat sampai iterasi ke-10 lalu mendatar mendekati `-1,0000` (sama dengan `-akar(0,6^2 + 0,8^2)`). Energi estimasi akhir `-0,9796` berbeda dari `-1,0000` karena derau shot, padahal `theta`-nya hampir optimum. Biayanya juga terlihat: 40 iterasi dengan empat pengaturan per iterasi dan 1000 shot berarti 160000 pembacaan sirkuit untuk **satu parameter**. Model ini tidak punya derau gerbang dan tidak menunjukkan keunggulan apa pun; ia hanya memperlihatkan pola.

**Batasnya.** Tutorial IBM mencatat bahwa VQE menghadapi kesulitan pada skala besar (mis. *barren plateau* dan beban pengukuran yang tinggi), dan menyebut pengoptimal SPSA yang memakai dua evaluasi per iterasi, cocok untuk derau. Modul ini hanya menyebutnya.

## Contoh setengah jadi

Lengkapi (kunci di bagian akhir).

1. Gradien eksak pada `theta = 0,5` adalah ____ (bulatkan ke empat desimal).
2. Lengkapi bagian klasik:

```ts setengah-jadi
const g = (energiEstimasi(theta + Math.PI / 2, shot) - energiEstimasi(theta - ____, shot)) / 2;
return theta - ____ * g;
```

## Soal Parsons

Susun baris-baris di bawah (sudah diacak) menjadi bagian awal fungsi `rata2` yang menyiapkan keadaan dan memutar basis.

```text
(a)   if (basis === "X") {
(b)     [a, b] = [(a + b) / Math.SQRT2, (a - b) / Math.SQRT2]; // gerbang H sebelum baca
(c)   }
(d)   let [a, b] = [Math.cos(theta / 2), Math.sin(theta / 2)];
(e)   const peluang0 = a * a;
```

## Latihan

1. **Hitung.** (`AI: tanpa AI`) Hitung dengan tangan `E(1,0)` dan gradien `dE/dtheta` pada `theta = 1,0`; arah mana yang menurunkan energi?
2. **Ubah data.** (`AI: boleh`) Ubah `shot` menjadi 10. Prediksi dulu apakah estimasi energi akhir bisa di bawah `-1`, lalu jalankan dan jelaskan.
3. **Jelaskan.** (`AI: tanpa AI`) Mengapa estimasi energi di bawah energi dasar tidak berarti alamnya dilanggar?
4. **Diagram.** (`AI: boleh`) Gambar diagram hibrida versimu sendiri untuk QAOA dengan `p = 1`: apa yang ada di sisi kuantum dan apa di sisi klasik.
5. **Catatan pemakaian AI (opsional).** Bila memakai asisten AI, catat alat, tujuan, garis besar perintah, bagian yang dipakai, dan cara memeriksanya.

## Latihan bercampur

1. Berapa hasil `H` dua kali pada `|0>`, dan mengapa gerbang `H` sebelum baca mengubah basis dari `Z` ke `X`? (`e-xi1-m8`)
2. Selang normal biasa untuk 0 dari 1000 menyesatkan. Mengapa, dan apa gantinya? (`e-xii2-m1`)

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `e-xii2-m4` (satu minggu lagi), `e-xii2-m6` (sekitar tiga minggu lagi), dan `e-xii2-m11` (sekitar delapan minggu lagi). Jawab sekarang lalu simpan.

1. Pada algoritma hibrida, bagian mana dijalankan di perangkat kuantum dan bagian mana di komputer klasik?
2. Berapa pembacaan sirkuit untuk 40 iterasi dengan 4 pengaturan per iterasi dan 1000 shot?
3. Mengapa energi estimasi bisa berbeda dari energi eksak walau parameter sudah hampir optimum?

## Kesalahan umum

- **"Algoritma hibrida sudah terbukti lebih cepat daripada komputer klasik."** Modul ini tidak mengklaim itu; ia hanya menjelaskan pola.
- **"Seluruh perhitungan dikerjakan komputer kuantum."** Pengoptimal dan penghitungan energi dari hitungan hasil dikerjakan komputer klasik.
- **"Energi estimasi di bawah energi dasar berarti ada penemuan baru."** Itu derau shot; energi eksak tidak boleh di bawah energi dasar.
- **"Iterasi lebih banyak selalu lebih baik."** Derau shot dan derau perangkat membatasi, dan setiap iterasi menambah pembacaan.
- **"VQE dan QAOA adalah hal yang sama."** Pola hibridanya sama, masalahnya berbeda: energi dasar dan optimasi kombinatorial.

## Cek mandiri

- [ ] Saya dapat menggambar pola hibrida dan menandai sisi kuantum dan klasiknya.
- [ ] Saya dapat menelusuri satu iterasi pergeseran parameter.
- [ ] Saya dapat menjelaskan mengapa estimasi energi bisa di bawah energi dasar.
- [ ] Saya dapat menyebut dua batas algoritma hibrida.
- [ ] Saya mencatat pemakaian AI bila saya memakainya.

## Kunci dan petunjuk

**Ingat kembali.** 1: ia perlu pengukuran pada beberapa faktor derau dan simpangan hasil membesar; tidak tak bias karena bentuk kurva ekstrapolasi hanya asumsi. 2: selisih hitungan dua histogram untuk satu hasil punya simpangan kira-kira `akar(2 x shot x p x (1 - p))`; selisih sampai dua atau tiga simpangan wajar. 3: selang 95 persen meleset kira-kira satu dari dua puluh karena acak shot; satu selang yang meleset belum membuktikan sebab lain.

**Prediksi dulu.** (1) `-akar(0,6^2 + 0,8^2)` = -1. (2) menurunkan `theta`, karena gradiennya positif (0,4144). (3) boleh, karena derau shot; energi eksak tidak boleh di bawah -1.

**Contoh setengah jadi.** 1: 0,4144. 2: `Math.PI / 2` dan `laju`. Kunci ini dijalankan penyusun (potongan itu ada di program di atas).

**Soal Parsons.** d, a, b, c, e. Alasannya: `a` dan `b` dibuat di `(d)`, putaran basis `(a)` sampai `(c)` memakai keduanya, dan `peluang0` memakai `a` setelah putaran.

**Latihan.** 1: `E(1,0) = 0,6 cos 1 + 0,8 sin 1` = 0,3242 + 0,6732 = 0,9974; gradien `-0,6 sin 1 + 0,8 cos 1` = -0,5049 + 0,4322 = -0,0727. Gradien negatif berarti `E` turun bila `theta` naik, jadi `theta` digeser naik (`theta - laju x gradien` bertambah). 2: keluaran varian (`shot = 10`): energi estimasi akhir `-1,1200`, di bawah `-1`, sedangkan energi eksak pada `theta` akhir `-0,9976`; derau shot membuat estimasi melewati batas. 3: batas bawah berlaku untuk nilai eksak; estimasi dari sedikit shot adalah rata-rata acak yang bisa melewatinya. 4: sisi kuantum: siapkan keadaan berparameter (lapisan masalah dan lapisan pencampur) dan baca; sisi klasik: hitung biaya dari hitungan, perbarui dua parameter, ulangi. 5: opsional.

**Latihan bercampur.** 1: `H` dua kali mengembalikan `|0>`, jadi peluang 0 sama dengan 1; `H` memetakan `|+>` ke `|0>`, sehingga membaca di basis `Z` sesudah `H` sama dengan membaca di basis `X`. 2: rumus normal memberi `[0 ; 0]` seolah pasti nol; gantinya selang Wilson dengan batas atas 0,0038.

**Ulang berjarak.** 1: perangkat kuantum: menyiapkan keadaan berparameter dan membacanya; komputer klasik: menghitung energi dari hitungan, gradien, dan memperbarui parameter. 2: `40 x 4 x 1000` = 160000. 3: derau shot pada pengukuran energi.

## Langkah berikutnya

Modul berikut: `e-xii2-m4` (dampak ke keamanan informasi, konsep). Bacaan pendamping: `e-xii1-m8` dan `e-xii2-m2`.
