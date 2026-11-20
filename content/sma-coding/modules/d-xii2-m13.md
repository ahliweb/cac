## Untuk siapa modul ini

Modul ini untuk murid kelas XII jalur D (kecerdasan buatan dan analisis data), untuk minggu `D-XII2-M13` silabus v1.3: portofolio dan refleksi, yaitu mengarsipkan karya dan merefleksikan proses, dengan keluaran portofolio. Prasyarat terindeks: modul `d-xii2-m12` (seri yang sama); bahan `d-xii2-m1` sampai `d-xii2-m12` dipakai di sini. Alat: Python 3, tanpa akun dan tanpa pustaka tambahan. Sendiri atau berkelompok; refleksi ditulis sendiri.

Modul ini karangan penyusun dan disetujui pemilik program pada 2026-11-20 (keputusan lewat dialog; catatan tinjauan menjadi tindak lanjut revisi). Jalur D adalah pengayaan di luar rumusan capaian pembelajaran (CP); minggu ini tidak punya irisan pengayaan, jadi tidak dihitung memenuhi butir CP mana pun.

Aturan jalur D: data hanya sintetis (karangan) atau terbuka berlisensi jelas, tanpa data yang mengenali orang, tanpa wajah, suara, atau foto; AI generatif boleh dengan etika dan dicatat, tanpa data pribadi, kata sandi, atau tugas bernilai pada permintaanmu, dan tanpa kewajiban akun. Jawab dulu sendiri, baru minta petunjuk bertahap; kode buatan AI dibaca, dijalankan, dan diuji. Catat pemakaian AI di log proyek.

Catatan untuk guru: blok Python dijalankan penyusun dengan `python3 -I` (Python 3.14.6, per 2026-11), keluarannya ditempel apa adanya; yang dinyatakan hanya "bisa dijalankan dengan keluaran ini", bukan "benar untuk semua masukan". Berkas portofolio dalam contoh dibuat sementara dan berisi karangan. Jawaban refleksi murid tidak dikumpulkan ke repositori ini.

## Ingat kembali

Jawab dari ingatan, baru cek kunci.

1. Apa isi catatan model, dan mengapa model yang tidak dipilih tetap dicatat? (dari `d-xii2-m5`)
2. Apa empat kolom satu baris laporan etika? (dari `d-xii2-m10`)
3. Apa yang tidak dapat diperiksa oleh daftar periksa ulasan otomatis, dan apa yang dilakukan pengulas? (dari `d-xii2-m11`)
4. Apa tiga hal wajib di slide hasil, dan mengapa slide batas tidak boleh dihilangkan? (dari `d-xii2-m12`)

## Tujuan

Setelah modul ini kamu dapat:

- mengumpulkan karya proyek ke satu folder dengan manifest nama, ukuran, dan sidik tiap berkas;
- memverifikasi bahwa arsip utuh dan menyebut apa yang tidak dijamin manifest;
- memindai arsip dari data pribadi sebelum diserahkan atau dipublikasikan;
- menulis refleksi dengan bukti dan rencana belajar yang spesifik.

Keluaran yang diminta silabus: portofolio.

## Rencana sprint

Portofolio adalah arsip karya yang dapat dibuka orang lain tahun depan: README dengan sidik kandidat dan versi, rencana, catatan kualitas data, catatan model, laporan evaluasi dan uji, kartu model dan panduan, laporan etika, catatan ulasan dan tindakannya, slide, dan log AI. Panduan Mata Pelajaran Informatika menyebut portofolio, refleksi diri, dan rubrik sebagai bentuk asesmen. Manifest sidik berkas memudahkan memeriksa bahwa arsip tak berubah atau hilang sejak diserahkan.

Prediksi dulu. Program membuat arsip kecil, lalu mengubah satu angka di laporan uji dan menghapus log AI. Tebak dan tulis: apa yang dilaporkan verifikasi, dan apa yang dilaporkan pemindai bila ada berkas berisi surel contoh?

```python
import hashlib
import json
import re
import tempfile
from pathlib import Path

ISI = {
    "README.md": "Pustaka Contoh (karangan). Sidik kandidat a1f97fdbe259. Log AI: lihat log_ai.md.\n",
    "kartu_model.md": "# Kartu model (karangan)\nTujuan, di luar cakupan, data, model, evaluasi, batasan, risiko, biaya.\n",
    "laporan_uji.md": "Uji 150 baris (36 terlambat), dibuka satu kali. Recall 0,56, presisi 0,38.\n",
    "log_ai.md": "Alat: asisten AI. Tujuan: penjelasan galat. Dipakai: satu fungsi. Diperiksa: dijalankan dan diuji.\n",
}
POLA_SUREL = re.compile(r"[^@\s]+@\S+")


def sidik_berkas(jalur):
    return hashlib.sha256(jalur.read_bytes()).hexdigest()[:12]


def buat_manifest(folder):
    daftar = {b.name: {"ukuran": b.stat().st_size, "sidik": sidik_berkas(b)} for b in sorted(folder.glob("*.md"))}
    (folder / "manifest.json").write_text(json.dumps(daftar, indent=1, sort_keys=True) + "\n", encoding="utf-8")
    return daftar


def verifikasi(folder):
    janji = json.loads((folder / "manifest.json").read_text(encoding="utf-8"))
    temuan = []
    for nama, info in janji.items():
        b = folder / nama
        if not b.exists():
            temuan.append(f"hilang: {nama}")
        elif sidik_berkas(b) != info["sidik"]:
            temuan.append(f"berubah: {nama}")
    return temuan


def pindai(folder):
    return [f"{b.name}: berisi surel" for b in sorted(folder.glob("*.md")) if POLA_SUREL.search(b.read_text(encoding="utf-8"))]


with tempfile.TemporaryDirectory() as tmp:
    folder = Path(tmp)
    for nama, isi in ISI.items():
        (folder / nama).write_text(isi, encoding="utf-8")
    manifest = buat_manifest(folder)
    for nama, info in manifest.items():
        print(f"{nama} | {info['ukuran']} byte | {info['sidik']}")
    print("verifikasi awal:", verifikasi(folder) or "utuh")
    (folder / "laporan_uji.md").write_text(ISI["laporan_uji.md"].replace("0,56", "0,60"), encoding="utf-8")
    (folder / "log_ai.md").unlink()
    print("sesudah diubah:", verifikasi(folder))
    (folder / "catatan.md").write_text("hubungi tokoh@contoh.example\n", encoding="utf-8")
    print("pindai privasi:", pindai(folder))
```

```text
README.md | 81 byte | 53fe32092865
kartu_model.md | 97 byte | 4d7553284d27
laporan_uji.md | 75 byte | 94fef429d3ea
log_ai.md | 99 byte | 9c4ce3f90282
verifikasi awal: utuh
sesudah diubah: ['berubah: laporan_uji.md', 'hilang: log_ai.md']
pindai privasi: ['catatan.md: berisi surel']
```

Baca hasilnya. Manifest mencatat nama, ukuran, dan sidik empat berkas; verifikasi awal utuh. Setelah angka di laporan uji diubah dan log AI dihapus, verifikasi melaporkan satu berkas berubah dan satu hilang, tanpa memberi tahu mana yang sah. Pindai privasi menandai berkas catatan yang berisi surel, walau domainnya `.example`, karena arsip tak membutuhkan surel sama sekali. Batasnya: manifest disimpan bersama berkas, sehingga orang yang sengaja memalsukan dapat mengubah keduanya; ia menandai perubahan tak sengaja, bukan melindungi dari pemalsuan. Untuk pembuktian yang lebih kuat, sidik disimpan di tempat lain, misalnya dicatat di laporan atau dipegang guru.

**Refleksi.** Tulis di buku catatanmu sendiri, tidak dikumpulkan. Jawab dengan bukti dan rencana: (1) langkah proyek mana yang paling kamu kuasai, buktinya apa; (2) keputusan mana yang kamu ubah karena ulasan atau galat; (3) apa yang akan kamu kerjakan lain bila mengulang; (4) bagaimana AI membantu atau menghambat belajarmu, dan bagaimana kamu memeriksa keluarannya; (5) tiga hal yang akan kamu ulang untuk asesmen, dan kapan. Refleksi yang baik menyebut peristiwa tertentu, bukan perasaan umum, dan rencana yang dapat dikerjakan minggu depan.

## Daftar periksa

Centang tiap langkah dengan bukti.

- [ ] Semua dokumen proyek ada di satu folder dengan README.
- [ ] Manifest sidik dibuat; verifikasi menyatakan arsip utuh.
- [ ] Pemindai privasi dijalankan; batas pemindaian dicatat.
- [ ] Tindakan atas ulasan sejawat tercatat; log AI lengkap.
- [ ] Refleksi ditulis dengan bukti dan rencana ulang.

## Umpan balik sejawat

Tukar portofolio dengan tim lain: satu yang sudah baik, satu yang perlu diperbaiki, satu langkah berikutnya, masing-masing menunjuk berkas. Tanyakan: dapatkah orang asing mengulang hasilnya hanya dari folder ini?

## Latihan bercampur

1. Tambahkan berkas `catatan_ulasan.md` setelah manifest dibuat. Apakah `verifikasi` menandainya? Jelaskan, lalu ubah fungsinya agar berkas yang tak tercatat ikut dilaporkan (`AI: boleh`).
2. Dari `d-xii2-m4`: tulis lima isi laporan garis dasar dan tunjukkan di mana tiap isi ada di portofolio (`AI: tanpa AI`).
3. Dari `d-xii2-m7`: sebutkan dua berkas portofolio yang memuat sidik kandidat dan satu yang memuat catatan perubahan (`AI: boleh`).

## Ulang berjarak

Pertanyaan ini muncul lagi di `Ingat kembali` modul `D-XII2-M14` (sekitar 1 minggu lagi). Jawab sekarang lalu simpan.

1. Apa fungsi manifest sidik pada portofolio, dan apa yang tidak dapat dijaminnya?
2. Mengapa portofolio dipindai privasinya sebelum diserahkan, dan apa yang tidak boleh ada di dalamnya?
3. Apa ciri refleksi yang baik, dan apa yang dilakukan sesudahnya?

## Kesalahan umum

- **"Manifest membuktikan arsip tidak dipalsukan."** Ia menandai perubahan tak sengaja; sidik perlu disimpan terpisah.
- **"Arsip bersih karena pemindai tidak menemukan apa-apa."** Pemindai hanya menangkap pola yang diprogramkan.
- **"Refleksi berarti menulis perasaan."** Sebut peristiwa, bukti, dan rencana.

## Cek mandiri

- [ ] Saya dapat membuat dan memverifikasi manifest portofolio.
- [ ] Saya dapat menyebut batas manifest dan pemindai.
- [ ] Saya dapat mengatur dokumen proyek agar orang lain dapat mengulangnya.
- [ ] Saya dapat menulis refleksi dengan bukti dan rencana.
- [ ] Saya mencatat pemakaian AI bila memakainya.

## Kunci dan petunjuk

**Ingat kembali.** 1: tiap kandidat: parameter, hasil beserta sebaran, dan keputusan; model yang tak dipilih dicatat agar orang lain tahu alasannya dan tak mengulang jalan buntu. 2: risiko, bukti, tindakan, risiko tersisa. 3: kebenaran angka dan masuk akalnya klaim; pengulas menghitung ulang dan membaca sendiri. 4: pembanding, selang atau sebaran, dan jumlah baris; slide batas menunjukkan apa yang belum terbukti.

**Rencana sprint.** Tebakan wajar: verifikasi melaporkan `laporan_uji.md` berubah dan `log_ai.md` hilang; pemindai menandai berkas yang berisi surel. Ukuran dan sidik pada keluaran bergantung isi contoh.

**Daftar periksa.** Dinilai dari bukti: folder, manifest, dan keluaran verifikasi.

**Latihan bercampur.** 1: tidak; `verifikasi` hanya memeriksa berkas yang tercatat. Tambahkan setelah perulangan pertama: `for b in sorted(folder.glob("*.md")): if b.name not in janji: temuan.append(f"tidak tercatat: {b.name}")`; keluarannya `['tidak tercatat: catatan_ulasan.md']`. 2: pembanding dan cara memilihnya (README atau laporan garis dasar), metrik utama beserta alasan, ukuran data dan jumlah per kelas, tabel hasil, dan kesimpulan yang boleh dan tak boleh (laporan uji dan kartu). 3: README dan kartu model memuat sidik; catatan perubahan di README dan bagian Evaluasi atau Batasan kartu.

**Ulang berjarak.** 1: memeriksa arsip tak berubah atau hilang secara tak sengaja; tak menjamin keaslian bila manifest ikut diubah. 2: karena pola data pribadi mudah terbawa tanpa sadar; tidak boleh ada nama, surel, kontak, wajah, suara, atau sekolah nyata. 3: menyebut peristiwa dan bukti, dan rencana ulang yang spesifik dengan waktu; sesudahnya rencana itu dijalankan, dan diulang berjarak.

## Langkah berikutnya

Modul berikut: `D-XII2-M14` (asesmen). Bacaan lanjut: dokumentasi `hashlib` pada Python dan makalah Pineau dkk. tentang keterulangan penelitian pembelajaran mesin (di `Rujukan`).
