## Untuk siapa modul ini

Modul ini untuk jalur **pekerja** (`PKJ`), 5 jam, sesudah `DW-PKJ-M6`. Alatnya LibreOffice Calc (rumus dicoba di 24.2.7.2), Python 3 (penulis memakai 3.12.3), dan penyunting teks; grafik di Python dibuat sebagai berkas SVG memakai pustaka bawaan saja. Estimasi dua sesi `[asumsi]`.

Seluruh data di modul ini **sintetis** dan tetap (bukan acak). Anda boleh melatih penyajian dengan data kantor sendiri hanya bila kebijakan kantor mengizinkan; untuk latihan di sini, pakailah data sintetis.

## Cek awal pengalaman

Jawab tanpa melihat apa pun, lalu cocokkan dengan kunci. Skor tidak dicatat.

1. Apa itu "sumbu dipotong" pada grafik batang, dan mengapa menyesatkan?
2. Jenis grafik apa yang cocok untuk membandingkan jumlah antar kategori, dan untuk perubahan dari waktu ke waktu?
3. Sebut tiga unsur yang harus ada pada grafik selain batang atau garisnya.
4. Mengapa judul grafik sebaiknya menyatakan temuan, bukan hanya "Grafik penjualan"?
5. Tulis rumus Calc untuk persen perubahan dari `B2` ke `B7`, dibulatkan satu angka di belakang koma.

Bila kelimanya benar, Anda boleh melewati "Contoh terselesaikan" dan "Contoh setengah jadi" dan langsung ke "Latihan".

## Ingat kembali

Tanpa melihat modul sebelumnya, tulis jawaban singkat.

1. (`DW-PKJ-M6`) Mengapa keluaran AI yang meyakinkan tetap diperlakukan sebagai draf dan diuji dengan kasus yang mencakup nol dan kosong?
2. (`DW-PKJ-M4`) Mengapa kunci gabung harus dibersihkan (spasi, huruf) sebelum dua tabel digabung?
3. (`DW-FND-M1`) Mengapa data sintetis dipakai di latihan, bukan data kantor Anda?

Cocokkan: (1) kefasihan bukan bukti; hanya uji dengan data sintetis dan kasus tepi yang menunjukkan draf benar atau salah; (2) `"P01 "`, `"p01"`, dan `"P01"` dianggap tiga kunci berbeda sehingga baris tidak cocok dan jatuh sebagai yatim; (3) agar tidak ada data pribadi atau rahasia usaha yang terbawa.

## Tujuan

Setelah modul ini Anda dapat membuat grafik yang jujur dan ringkasan satu halaman.

## Prediksi dulu

Total penjualan enam bulan (sintetis, rupiah):

| Bulan | Jan | Feb | Mar | Apr | Mei | Jun |
| --- | --- | --- | --- | --- | --- | --- |
| Total | 118000 | 121500 | 119000 | 124500 | 123000 | 126000 |

Sebelum membaca, tulis: (a) persen kenaikan Januari ke Juni, (b) berapa kali tinggi batang Juni dibanding batang Januari bila sumbu vertikal mulai dari 0, dan bila sumbu dipotong di 115000, (c) grafik mana yang akan membuat pembaca mengira penjualan melonjak.

## Contoh terselesaikan

### Skrip: dua grafik, satu ringkasan

Skrip menggambar grafik batang yang sama dua kali, sekali dengan sumbu dari nol dan sekali dengan sumbu dipotong, lalu menulis ringkasan satu halaman. Berkas SVG berisi `<title>` sebagai teks alternatif dan dapat dibuka di peramban atau LibreOffice ([dokumentasi SVG](https://developer.mozilla.org/en-US/docs/Web/SVG)).

```python
from xml.sax.saxutils import escape

BULAN = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun"]
TOTAL = [118000, 121500, 119000, 124500, 123000, 126000]  # data sintetis tetap


def format_angka(n):
    return f"{n:,}".replace(",", ".")


def batang_svg(judul, nilai, dasar):
    """Grafik batang SVG sederhana; sumbu vertikal dimulai dari `dasar`."""
    lebar, tinggi = 480, 300
    kiri, bawah, atas = 70, 40, 50
    area = tinggi - atas - bawah
    puncak = max(nilai)
    lebar_batang = 46
    jarak = (lebar - kiri - 20) / len(nilai)
    bagian = [
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {lebar} {tinggi}" role="img">',
        f"<title>{escape(judul)}</title>",
        f'<text x="{kiri}" y="24" font-size="15" font-weight="bold">{escape(judul)}</text>',
        f'<text x="{kiri}" y="{atas - 8}" font-size="11">Rupiah (data sintetis)</text>',
        f'<line x1="{kiri}" y1="{atas}" x2="{kiri}" y2="{tinggi - bawah}" stroke="black"/>',
        f'<line x1="{kiri}" y1="{tinggi - bawah}" x2="{lebar - 20}" y2="{tinggi - bawah}" stroke="black"/>',
        f'<text x="{kiri - 6}" y="{tinggi - bawah + 4}" font-size="11" text-anchor="end">{format_angka(dasar)}</text>',
        f'<text x="{kiri - 6}" y="{atas + 4}" font-size="11" text-anchor="end">{format_angka(puncak)}</text>',
    ]
    for i, (nama, n) in enumerate(zip(BULAN, nilai)):
        tinggi_batang = (n - dasar) / (puncak - dasar) * area
        x = kiri + i * jarak + (jarak - lebar_batang) / 2
        y = tinggi - bawah - tinggi_batang
        bagian.append(f'<rect x="{x:.1f}" y="{y:.1f}" width="{lebar_batang}" height="{tinggi_batang:.1f}" fill="#2a6f97"/>')
        bagian.append(f'<text x="{x + lebar_batang / 2:.1f}" y="{tinggi - bawah + 16}" font-size="11" text-anchor="middle">{nama}</text>')
    bagian.append("</svg>")
    return "\n".join(bagian)


naik = (TOTAL[-1] - TOTAL[0]) / TOTAL[0] * 100
rasio_jujur = TOTAL[-1] / TOTAL[0]
rasio_terpotong = (TOTAL[-1] - 115000) / (TOTAL[0] - 115000)
print(f"naik {naik:.1f}% dari {format_angka(TOTAL[0])} ke {format_angka(TOTAL[-1])}")
print(f"tinggi batang Jun dibanding Jan, sumbu dari 0: {rasio_jujur:.2f}x")
print(f"tinggi batang Jun dibanding Jan, sumbu dari 115.000: {rasio_terpotong:.2f}x")

judul = f"Penjualan Jan-Jun 2026 naik {naik:.1f}% (sintetis)".replace(".", ",")
with open("grafik_jujur.svg", "w", encoding="utf-8") as berkas:
    berkas.write(batang_svg(judul, TOTAL, 0))
with open("grafik_terpotong.svg", "w", encoding="utf-8") as berkas:
    berkas.write(batang_svg("Data sama, sumbu dipotong (menyesatkan)", TOTAL, 115000))

ringkasan = f"""# {judul}

- Total Juni: Rp {format_angka(TOTAL[-1])} (Januari: Rp {format_angka(TOTAL[0])}).
- Bulan tertinggi: {BULAN[TOTAL.index(max(TOTAL))]}; terendah: {BULAN[TOTAL.index(min(TOTAL))]}.
- Catatan: Maret turun dari Februari; data sintetis, bukan data nyata.

![Grafik batang penjualan bulanan, sumbu dari nol](grafik_jujur.svg)
"""
with open("ringkasan.md", "w", encoding="utf-8") as berkas:
    berkas.write(ringkasan)
print(ringkasan)
```

Keluarannya (`python3 -I grafik.py`, Python 3.12.3):

```text
naik 6.8% dari 118.000 ke 126.000
tinggi batang Jun dibanding Jan, sumbu dari 0: 1.07x
tinggi batang Jun dibanding Jan, sumbu dari 115.000: 3.67x
# Penjualan Jan-Jun 2026 naik 6,8% (sintetis)

- Total Juni: Rp 126.000 (Januari: Rp 118.000).
- Bulan tertinggi: Jun; terendah: Jan.
- Catatan: Maret turun dari Februari; data sintetis, bukan data nyata.

![Grafik batang penjualan bulanan, sumbu dari nol](grafik_jujur.svg)
```

Data yang sama, kenaikan 6,8 persen, tampak 1,07 kali pada grafik jujur dan 3,67 kali pada grafik terpotong. Pada grafik batang, panjang batang mewakili nilai, sehingga sumbu dimulai dari nol. Periksa dengan hitungan tangan: (126000 - 118000) / 118000 = 0,0678, jadi 6,8 persen.

### Lima pemeriksaan grafik jujur

1. **Sumbu dari nol** untuk batang.
2. **Judul menyatakan temuan**, bukan sekadar topik.
3. **Satuan dan keterangan data** tertulis ("Rupiah (data sintetis)").
4. **Satu pesan per grafik**, tanpa hiasan tiga dimensi atau warna yang tidak bermakna.
5. **Catatan hal yang mengganggu pesan**, misalnya penurunan Maret, tidak disembunyikan.

### Ringkasan satu halaman

Susunan yang dipakai `ringkasan.md`: (1) judul berisi temuan; (2) dua sampai tiga angka kunci; (3) satu grafik; (4) catatan keterbatasan data.

### Di LibreOffice Calc

Letakkan bulan di `A2:A7` dan total di `B2:B7`. Rumus berikut dicoba tanpa antarmuka di LibreOffice 24.2.7.2:

| Tujuan | Rumus | Hasil |
| --- | --- | --- |
| Persen perubahan Januari ke Juni | `=ROUND((B7-B2)/B2*100;1)` | `6.8` |
| Nilai tertinggi | `=MAX(B2:B7)` | `126000` |
| Bulan tertinggi | `=INDEX(A2:A7;MATCH(MAX(B2:B7);B2:B7;0))` | `Jun` |
| Bulan terendah | `=INDEX(A2:A7;MATCH(MIN(B2:B7);B2:B7;0))` | `Jan` |
| Porsi Juni terhadap total | `=ROUND(B7/SUM(B2:B7)*100;1)` | `17.2` |
| Rata-rata bulanan | `=ROUND(AVERAGE(B2:B7);0)` | `122000` |

Untuk membuat grafik: pilih `A1:B7`, lalu menu **Insert > Chart**, pilih jenis kolom ([Charts in LibreOffice](https://help.libreoffice.org/latest/en-US/text/schart/main0000.html)). Atur judul lewat dialog Titles, dan sumbu vertikal lewat **Format > Axis > Y Axis**, tab **Scale**, dengan **Minimum** diisi `0` ([dokumentasi tab Scale](https://help.libreoffice.org/latest/en-US/text/schart/01/05040201.html)).

## Contoh setengah jadi

Tambahkan label nilai di atas tiap batang pada skrip. Lengkapi satu titik `___`, lalu jalankan:

```python setengah-jadi
        bagian.append(
            f'<text x="{x + lebar_batang / 2:.1f}" y="{y - ___:.1f}" font-size="10" text-anchor="middle">{format_angka(n)}</text>'
        )
```

Prediksi dulu: label harus berada di atas atau di bawah puncak batang, dan apakah `y` memerlukan angka yang ditambah atau dikurangi dari `y` batang?

## Latihan

1. **Ubah.** Ganti nilai Juni menjadi `100000`. Prediksi dulu kata dan angka pada judul. Ubah skrip supaya judul memakai "naik" atau "turun" menurut tandanya.
2. **Buat.** Tambahkan ke ringkasan satu baris: bulan dengan kenaikan terbesar dari bulan sebelumnya, beserta besarnya.
3. **Jelaskan.** Mengapa batang harus dari nol, sedangkan grafik garis kadang boleh tidak? Apa yang wajib Anda tulis bila sumbu tidak dari nol?
4. **Buat.** Di Calc, buat grafik kolom dari `A1:B7` dengan judul berisi temuan, label sumbu, dan minimum `0`; periksa dengan lima pemeriksaan.
5. **Berpasangan (opsional).** Tukar grafik dengan rekan; masing-masing menemukan satu unsur yang dapat menyesatkan. Peserta mandiri boleh melewati tugas ini.

## Latihan bercampur

1. (`DW-PKJ-M4`) Transaksi bertanggal ada sebagai daftar `[("Jan", 50000), ("Feb", 30000), ("Jan", 68000), ("Feb", 91500)]`. Jumlahkan per bulan dengan `defaultdict(int)` sehingga menghasilkan data grafik.
2. (`DW-PKJ-M5`) Ubah skrip agar membaca `TOTAL` dari `laporan.csv` hasil modul sebelumnya (kolom `total`) alih-alih daftar tetap.

## Keluaran portofolio

**Satu halaman laporan dengan grafik.** Simpan skrip, `grafik_jujur.svg`, `ringkasan.md` (atau halaman Calc), dan satu kalimat tentang apa yang sengaja Anda tidak potong atau sembunyikan. Seluruhnya data sintetis.

## Ulang berjarak

Tanpa melihat modul ini, kerjakan ulang dan cocokkan. Pertanyaan ini akan muncul lagi di "Ingat kembali" modul berikutnya.

| Kapan | Pertanyaan |
| --- | --- |
| Satu minggu lagi (modul berikutnya) | Sebut lima pemeriksaan grafik yang jujur. |
| Tiga modul lagi | Mengapa grafik batang harus dimulai dari nol, dan apa yang wajib ditulis bila sumbu dipotong? |
| Akhir jalur | Susun ringkasan satu halaman: apa empat bagiannya? |

## Kebijakan AI

Modul ini tidak memakai asisten AI; kebijakan lengkap program ada di `DW-FND-M1` dan `DW-PKJ-M6` (silabus bagian 9.1).

## Kesalahan umum

- **Memotong sumbu batang agar perbedaan tampak besar.** Pembaca mengira perubahan jauh lebih besar dari kenyataan.
- **Judul hanya menyebut topik.** Pembaca harus menebak pesannya.
- **Tanpa satuan atau keterangan data.** Angka tidak dapat dinilai.
- **Menyembunyikan penurunan yang mengganggu cerita.** Catat dan jelaskan.
- **Memakai warna atau efek tiga dimensi tanpa makna.** Hiasan mengaburkan angka.

## Cek mandiri

Tutup modul dan jawab:

1. Lima pemeriksaan grafik yang jujur.
2. Empat bagian ringkasan satu halaman.
3. Rumus Calc untuk persen perubahan dan bulan tertinggi.

Daftar periksa (kosong; Anda isi sendiri, tidak dikumpulkan):

- [ ] Sumbu batang saya dari nol dan satuannya tertulis.
- [ ] Judul menyatakan temuan.
- [ ] Hal yang mengganggu pesan dicatat, bukan disembunyikan.
- [ ] Hanya data sintetis yang saya pakai.

## Kunci dan petunjuk

- **Cek awal:** (1) sumbu vertikal tidak dimulai dari nol sehingga selisih kecil tampak besar; (2) batang untuk membandingkan kategori, garis untuk perubahan dari waktu ke waktu; (3) judul, satuan atau label sumbu, dan keterangan sumber atau catatan data; (4) pembaca langsung memahami pesannya; (5) `=ROUND((B7-B2)/B2*100;1)`.
- **Prediksi:** (a) 6,8 persen; (b) sekitar 1,07 kali pada sumbu 0 dan sekitar 3,67 kali pada sumbu 115000; (c) grafik dengan sumbu dipotong.
- **Setengah jadi:** label di atas puncak batang, jadi `y` dikurangi; misalnya `4`. Karena `y` makin kecil ke atas, label berada di atas batang.
- **Latihan 1:** judul menjadi "Penjualan Jan-Jun 2026 turun 15,3% (sintetis)"; tanpa perbaikan skrip akan menulis "naik -15,3%". Perbaikannya: tentukan `arah = "naik" if naik >= 0 else "turun"` dan tulis `abs(naik)`.
- **Latihan 2:** selisih tiap bulan `[3500, -2500, 5500, -1500, 3000]`; kenaikan terbesar April, sebesar 5500.
- **Latihan 3:** pada batang, panjang batang adalah nilainya; garis menunjukkan arah, tetapi bila sumbu tidak dari nol, itu wajib dinyatakan di grafik atau catatannya.
- **Latihan bercampur 1:** `{'Jan': 118000, 'Feb': 121500}`.
- **Latihan bercampur 2:** `TOTAL = [int(b["total"]) for b in csv.DictReader(berkas)]` di dalam `with open("laporan.csv", newline="", encoding="utf-8") as berkas:`; dengan `laporan.csv` modul sebelumnya hasilnya `[113000, 73500, 123500]`, dan `BULAN` perlu disesuaikan panjangnya.
- **Petunjuk bila macet:** buka SVG di peramban atau LibreOffice dan periksa angka sumbu lebih dulu.

## Langkah berikutnya

`DW-PKJ-M8`: Anda sudah bisa mengolah data, mengotomasi, memakai AI dengan hati-hati, dan menyajikan hasil; proyek akhir menggabungkan semuanya menjadi satu alur kerja kantor sintetis dengan dokumentasi.

## Catatan untuk pendamping

- **Waktu:** 5 jam. **Bahan:** Python 3, LibreOffice Calc, penyunting teks. Skrip dijalankan penulis dengan `python3 -I` (Python 3.12.3); SVG yang dihasilkan diperiksa dibuka di LibreOffice dan well-formed; rumus Calc dicoba tanpa antarmuka di LibreOffice 24.2.7.2.
- **Tidak dicoba lewat antarmuka:** langkah menu pembuatan grafik di Calc mengikuti dokumentasi resmi (judul dialog bisa berbeda antar versi dan bahasa antarmuka).
- **Tanda siap lanjut:** peserta menjelaskan mengapa sumbu batang dimulai dari nol dan menunjukkan temuan pada judul grafiknya.
