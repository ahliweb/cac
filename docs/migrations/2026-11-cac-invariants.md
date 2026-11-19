# Invariants Data Kurikulum dan Traceability Rename (OSN ke CaC)

## Metadata
- Version: v1.0.0
- Last updated: 2026-11-19
- Status: DRAF untuk ditinjau; hanya dokumentasi. Tidak mengubah kode, data, atau silabus. Rename repository belum dilakukan.
- Issue: #154 (turunan epik #150, fase F1)
- Changeset: Mengunci daftar invariants, baseline hash dan semantik, metode deteksi perubahan tak disengaja (dengan bukti fixture sintetis), dan traceability IDENTITY-CAC-002/005/009 ke tes.
- Konteks: [ADR-0009](../architecture/adr/0009-cac-platform-identity.md), [kebutuhan IDENTITY-CAC](../requirements/identity-cac.md), [rencana migrasi](2026-11-osn-to-cac.md), [matriks dampak](2026-11-cac-impact-matrix.md).
- Dasar keputusan yang ditinjau: [ADR-0001](../architecture/adr/0001-curriculum-as-code.md), [ADR-0004](../architecture/adr/0004-no-learner-personal-data.md), [ADR-0005](../architecture/adr/0005-dual-versioning.md), [ADR-0006](../architecture/adr/0006-multi-program-repository.md), [ADR-0008](../architecture/adr/0008-skema-khusus-per-program.md), [ADR-0009](../architecture/adr/0009-cac-platform-identity.md).

Dokumen ini adalah bukti F1 untuk IDENTITY-CAC-002, -005, dan -009. Ia menjadi pembanding wajib bagi PR F2 dan F3: rename identitas platform tidak boleh mengubah satu pun butir di bagian 1 tanpa issue kurikulum terpisah.

## 1. Invariants

Tidak boleh berubah karena rename identitas platform (repository, paket, nama CLI):

| # | Invariant | Sumber kebenaran | Ditegakkan oleh |
| --- | --- | --- | --- |
| INV-01 | ID program `osn` tetap ID program historis (bukan nama platform); tidak diganti `cac` | `data/programs.json` (`programs[].id`), ADR-0006, IDENTITY-CAC-002 | `bun run validate`; K3 pada bagian 4 |
| INV-02 | Direktori `data/osn/` dan `corpusDir` setiap program tidak berganti nama atau pindah | `data/programs.json` (`corpusDir`) | `bun run validate`, `bun run privacy-check`; K4 |
| INV-03 | Registry berisi tepat 7 program dengan urutan: `osn`, `sma-coding`, `tk-coding`, `kuliah-coding`, `dewasa-coding`, `sd-coding`, `smp-coding` | `data/programs.json` | `tests/unit/program-registry.test.ts` (setiap program terdaftar punya entri tabel); sha256 |
| INV-04 | `syllabusVersion` dan `syllabusDate` setiap program (lihat tabel 2.2) sama antara entri registry dan setiap berkas korpus | `data/programs.json`, `data/<program>/*.json` | `bun run validate` (kesepakatan versi, ADR-0005); K1, K2 |
| INV-05 | Jumlah berkas korpus per program (lihat tabel 2.2) dan setiap isinya (hash di 2.3) tidak berubah | `data/<program>/` | `bun run validate` (berkas tak terdaftar atau hilang), `bun run check:fidelity`; K5 |
| INV-06 | Kode minggu dan id modul tidak berubah: `weeks.json` (osn 28, sma-coding 364, tk-coding 48, sd-coding 168, smp-coding 84 entri) dan `modules.json` (osn 10, sma-coding 239, tk-coding 48, kuliah-coding 24, dewasa-coding 36, sd-coding 168, smp-coding 84 modul); id modul = kode unit huruf kecil | `data/<program>/weeks.json`, `modules.json` (ADR-0007) | `bun run validate` (audit indeks modul), `bun run check:fidelity` (tabel `silabus.md` sel demi sel); K6 |
| INV-07 | Default pemilihan program pada perintah korpus tetap `osn`; `validate` tanpa `--program` memvalidasi semua program terdaftar; id tak dikenal tetap usage error (exit 2) | ADR-0006 (baris CLI), `docs/cli/README.md` | `tests/integration/cli-validate-fixtures.test.ts` |
| INV-08 | Garis pemisah versi (ADR-0005): `package.json` `version` (software, SemVer, saat baseline 2.5.0) tidak pernah berasal dari `syllabusVersion`, dan sebaliknya. Rename dan perubahan nama paket tidak menaikkan atau menurunkan `syllabusVersion` | `package.json`, `.changeset/`, [releasing.md](../development/releasing.md) | review PR; perbandingan versi sebelum dan sesudah (bagian 3) |
| INV-09 | Tidak ada data pribadi peserta didik dan tidak ada kunci berbentuk identitas langsung di `data/` | ADR-0004, GR-04 | `bun run privacy-check`; K8 |
| INV-10 | Isi silabus, skema (`src/schema/`) dan aturan domain tidak diubah oleh PR identitas; hanya referensi identitas yang diaudit | rencana migrasi bagian 4 (baris invariant) | `git diff --stat -- data/ src/schema/ src/domain/` kosong pada PR F2 dan F3 |

Catatan batas: ID `osn` dan `data/osn/` sengaja dipertahankan karena maknanya (program historis OSN Informatika) tetap benar; ini bukan utang rename (non-goals di [identity-cac.md](../requirements/identity-cac.md)).

## 2. Baseline

### 2.1 Titik acuan
| Butir | Nilai |
| --- | --- |
| Commit `main` yang dijadikan baseline | `3eb5d894f559deeabd4edb62eba52842ebb63031` (Merge pull request #158, 2026-11-19) |
| Versi software (`package.json`) | 2.5.0 (`CHANGELOG.md` entri teratas rilis: 2.5.0, 2026-11-19; 6 changeset tertunda di `.changeset/`) |
| Bun | 1.4.4 |
| Jumlah berkas `data/**/*.json` | 71 (70 berkas program, plus `data/programs.json`) |
| Hash agregat (sha256 dari daftar `sha256sum` terurut `LC_ALL=C`) | `0de993e24edb162a9b1fce3cd7d391075930adc059f673eea4bccd5a1813b8d5` |

Baseline hanya berlaku untuk SHA di atas. PR kurikulum sah yang masuk ke `main` setelahnya mengubah baseline; bagi PR F2 dan F3, ukur ulang pada `main` tepat sebelum PR dibuka, bukan memakai tabel ini mentah.

### 2.2 Ringkasan semantik (program, versi silabus, jumlah)
Keluaran hasil ukur di commit baseline (perintah 2.4b):

| Program | `syllabusVersion` | `syllabusDate` | Berkas JSON di `corpusDir` | Berkas korpus (tanpa `modules.json`) | Modul (`modules.json`) | Entri `weeks.json` |
| --- | --- | --- | --- | --- | --- | --- |
| `osn` | 2.0 | 2026-09-04 | 23 | 22 | 10 | 28 |
| `sma-coding` | 1.4.1 | 2026-11-19 | 9 | 8 | 239 | 364 |
| `tk-coding` | 1.0.3 | 2026-11-19 | 8 | 7 | 48 | 48 |
| `kuliah-coding` | 1.2.0 | 2026-11-19 | 7 | 6 | 24 | tidak ada |
| `dewasa-coding` | 1.2.0 | 2026-11-19 | 9 | 8 | 36 | tidak ada |
| `sd-coding` | 1.1.0 | 2026-11-19 | 6 | 5 | 168 | 168 |
| `smp-coding` | 1.2.0 | 2026-11-19 | 8 | 7 | 84 | 84 |

Catatan: `dewasa-coding` memiliki `module-plan.json` (rencana modul) dan `modules.json` (indeks modul belajar) sebagai dua berkas berbeda. `data/osn/samples/` bukan JSON (`learning-records.sample.jsonl`, `README.md`) sehingga tidak masuk hash, tetapi dipindai `privacy-check`.

Hasil `bun run validate` pada baseline: 22, 8, 7, 6, 8, 5, 7 berkas tervalidasi (urutan program seperti tabel), 0 masalah. `bun run check:fidelity`: enam program ber-modul fidelity OK (`osn` tidak punya modul fidelity; ia dijaga `validate` dan `check:checklist-fidelity`). `bun run privacy-check`: 72 berkas dipindai (71 JSON plus 1 `.jsonl`), 0 temuan.

### 2.3 Hash sha256 per berkas
Format perintah 2.4a, urutan `LC_ALL=C`.

| Berkas | sha256 |
| --- | --- |
| `data/dewasa-coding/bridges.json` | `21c8022a748ab3177dc77dc482d27a13ae4060b8385841aba6d80dec0b81fe5e` |
| `data/dewasa-coding/certification.json` | `b355681e44e867cf42c1ca40b73825eb9a7e9b63529e8a7a95bf55100168a8b6` |
| `data/dewasa-coding/kuliah-bridge.json` | `42c47e5b55219f8775d8d59f1746e72c830636a079bce7e71320512968e58522` |
| `data/dewasa-coding/module-plan.json` | `a2b12000ddae079a13499efff502cc52dd3070f5be4d2831fc09e0f03f532b7b` |
| `data/dewasa-coding/modules.json` | `1377a2db71db4e8f68ad2c2ffd2577221093f14a0945ece314297b359d19bd9a` |
| `data/dewasa-coding/shared.json` | `3919468371e9afb2ee35af63d7fcbabc1a89619f9178bbc0448269ddd49d06c9` |
| `data/dewasa-coding/skkni-units.json` | `b62c454b7133a0210e472bd36dbf4258b772c1d10521701a63807e1fea4033a9` |
| `data/dewasa-coding/structure.json` | `9e42531f7f04d87592c2b3c63142972a0dcf9789fe7ad898f1456ceff74bb0f6` |
| `data/dewasa-coding/tracks.json` | `d245fdcfb68cc0662700e6d6311ed6d579175a892929ed61c4a167a5ab73999e` |
| `data/kuliah-coding/ai-policy.json` | `ecdfe094f709ef0924d97367f7275d91ab053d40690e6eafdea4e5b76d77d31f` |
| `data/kuliah-coding/bridges.json` | `d724f966f614db8f0a4d32f1464e2eeb6ab2a44e62ba30e0e2e418cb5511ff28` |
| `data/kuliah-coding/courses.json` | `32e993fa4dc85e1bffc0137adee30f5ed7baf5f58b56e400787176e018e2a703` |
| `data/kuliah-coding/cpl.json` | `4d5b90e956df036b953d7d35832aa05a949ba7d0a1e875e7678303efc7ecf3a9` |
| `data/kuliah-coding/knowledge-areas.json` | `52e66ff67a9bdf94640e3c587fefafe6af6fd2ace9ed383fdd6273528462ffca` |
| `data/kuliah-coding/modules.json` | `6001f2e55698ab195e12c6067ea91364fd8b97212923ab57e386a4ac90d6ccd6` |
| `data/kuliah-coding/tracks.json` | `4aaf1ba3a6698b133c6c8cc58a43000a9dd2ca97961b130075868ef1588d82dd` |
| `data/osn/assessment-bank.json` | `a176de91ede78fd404a3d7d7b98da1a3070a930c34e66b83d77cbf542775fb02` |
| `data/osn/assessment-weights.json` | `12ed729174516be1fdf603b6456b024b360e4b28e726d701dfd3e769bb59c81c` |
| `data/osn/competition-stages.json` | `df366c934c77550d97f6ce836d76c3b7632349e45e381cf5d65ba4a3c9d39f94` |
| `data/osn/curriculum-categories.json` | `7cff8fc26e658aad71b7f5e50efb2252902e5ed3b5c915008696722e93718d5b` |
| `data/osn/gates.json` | `1b1594f4a5eb3aa71b58d7f8f8dd49f0c3c99a129160204500b0f8b1c5eebcf6` |
| `data/osn/hint-policy.json` | `c4171336a0cec0a2b88e89eaa762716db9ecb7ec614ff204a8ffc632a5159e7d` |
| `data/osn/kpi-definitions.json` | `76993412253e7125a3244ec26d57021324eb309059617d457961b176a5267d4e` |
| `data/osn/learning-load.json` | `c0945cdc07779fb9639c659d20f650bd7449a91461389dabadf402cedf27b55f` |
| `data/osn/mentor-sop.json` | `6234df73e4b0959b88c08ec3f5d00b073884f97b46bdb5850ad5f3019984a6dd` |
| `data/osn/modules.json` | `fdd52db7d57cfb17623c0893613f970bc1274aa950b43731d3badec39f914621` |
| `data/osn/operational-rules.json` | `02af8ba86aa004115c3ae51402bc7629703495cbdc22701916b60c85de448c35` |
| `data/osn/playbooks.json` | `7c58bf7845dc2c72b334bb878c90fa24c7e616593f55e1145e9afe5684a5c0eb` |
| `data/osn/problem-status.json` | `cfe54e79e53447055c9d067e488b0d1c0bf2daefc178814e3e3b23814c0fb6c1` |
| `data/osn/problem-taxonomy-vocab.json` | `15931d9261720abc75326721ca986ada588c9592bf9502d229d29dfb7b7511c7` |
| `data/osn/readiness-checklist.json` | `c4dd406b46f21be78f29b21dfd02b50dabf23d7a015898d6d95b9f559cd59557` |
| `data/osn/references.json` | `d62ca58b6bc9a11f1036f629706d5076b0ed816cc8899da39a70e329e2705ac5` |
| `data/osn/regulations.json` | `8f2efea49504c548d71a56c0447e6f76242b5d65e0e9849a6b271e724b3b62cf` |
| `data/osn/session-template.json` | `4bbe7937673e2febe38dd65767e5d338a563459140fc12fe06b9ed48fecda08b` |
| `data/osn/source-priority.json` | `451364611e5f93935ee64b2da1a0bffdacf862104e1726878e766adca9c5c74b` |
| `data/osn/standards.json` | `6f73210bcdbe802e7efe36a99ed9e40dd73f998fe22923bb9f6be7e6b4743c59` |
| `data/osn/syllabus-check-log.json` | `c872a5154950d855c9fd6a0f5585a37e2616c8fac8b1823a6dc176a8770a80a3` |
| `data/osn/topic-families.json` | `4950936eac15341529be5c206d477e5503df8bf294c6244414fad01ca3f761a8` |
| `data/osn/weeks.json` | `7e157104a64854e34546fe477cf4a6f14d624614171e29ad808527bf89ffc560` |
| `data/programs.json` | `8620363eca83f41e119d536431020dbef5eea3554057a70a9c18f2b79bb006cf` |
| `data/sd-coding/bridges.json` | `afb8bfd121e97614b1b570e45f936eabdde4b3f33f7fb54af7c43adffb191d0f` |
| `data/sd-coding/cp-elements.json` | `57b6d2a849a0c2fc0aa935d44dc9d75a9bdc68d36d7353b795a9c1c87bdd2acd` |
| `data/sd-coding/cp-mapping.json` | `aae946f9417acaa5ef475ddeaea2840379cce98a2d18cf7cbde7177c302dd470` |
| `data/sd-coding/modules.json` | `bae2485fa47d14b1a75614bc0d16c496e79c9987d85eeb4389caa6cd8fd37d6a` |
| `data/sd-coding/structure.json` | `a660786aa49f6a8a9dbc646c8ae4fc74d744c78cc1a57ffbb4452865b00846cb` |
| `data/sd-coding/weeks.json` | `dd880e1fc22ab2b32c5e6e68f9ec9960dc27499f66657835b2825083a6bfe618` |
| `data/sma-coding/cp-elements.json` | `e72c94279fc8e586cce165ac9b031af7f7f5143b7f09cd8af479a150253d02cd` |
| `data/sma-coding/cp-mapping.json` | `a8625fb255fed9853876f6ffbc98fd22167345f84f947b345b97f68ca4a17b32` |
| `data/sma-coding/foundation.json` | `5ed0119b51e3b601ed66db9adb944982938e5be9fc7c4ea3f4817e7c8c056311` |
| `data/sma-coding/modules.json` | `a8360e34a929b3ce18b5058d1247d3b3eaa3f7565cfc02d8467d614081603042` |
| `data/sma-coding/osn-bridge.json` | `7c6bce8485c650f1cac4f8151a8be3dd629123ec823dd754ad62bfd5f87de04f` |
| `data/sma-coding/smp-bridge.json` | `5c43547eec21cea41a080ba0eeb366e6887f3e74d6908bc7b2964852699560c2` |
| `data/sma-coding/structure.json` | `467e1971610ae0f120b2ff2c693db1650651b32016a018b6858fc009507736cd` |
| `data/sma-coding/tracks.json` | `fd528654acfe4912972fc8498bb913f338ec7105606d0fbe7bbefd82b0570fb0` |
| `data/sma-coding/weeks.json` | `4823db904e8c62d01ca085dfc63232007c43121f48746560531c5f1b543f769e` |
| `data/smp-coding/bridge.json` | `0408b63fa4ba555ebd55a770e2686b8d7e84b8d1e7e8309f34855206f21e387c` |
| `data/smp-coding/club.json` | `9cab342aeda1d987dee0baedae8b9b0554cdd6d5fe327468488d3ed5d3093d85` |
| `data/smp-coding/cp-elements.json` | `1e6419bcbe64f56977c729f440eb5dd36f5ab3b9c5c8e6a9bb3a81d11902740b` |
| `data/smp-coding/cp-mapping.json` | `2c9c1ee3f2f178b8e551f19654fd91874bf7f323a4df5f888c0fd84b2aa68a99` |
| `data/smp-coding/modules.json` | `860d864359f7923b0b159585d27ef60fb29c1ddf4695d6767812a9b0717555b6` |
| `data/smp-coding/structure.json` | `a7b9cd1f9c4415571d58c211442727c2b715183c621ab3e5eb4d283d67e9e11e` |
| `data/smp-coding/uncovered.json` | `b4fb40411d5ca6d45664599f740de441cb1e581cb9ad689b29ac7f1bc92bca18` |
| `data/smp-coding/weeks.json` | `e17f00f3e6c537abf0fb41b1fcab7e8424663f32687c49964d3c67056c1fede4` |
| `data/tk-coding/bridge.json` | `ba3611c92bbaa6f078be8e8f3ffc7019241ea88226f27f4a81887425893aa626` |
| `data/tk-coding/cp-elements.json` | `6a12281c6dc5c622c4a7eafafac21b27f0b2017e487c107edf889ae9bfac0c03` |
| `data/tk-coding/cp-mapping.json` | `cdf47d4bc30cf1cf924be9dfac1455a0865de75ad5930d9feed111fdc7814e1f` |
| `data/tk-coding/decisions.json` | `5fe5d83002bf502b5ef4a343f239a0e65afea68029c0c7868f122b14eb98047c` |
| `data/tk-coding/goals.json` | `24888fd6c647883cf20136b63e053be23621979298433ac95083dd22089a96ff` |
| `data/tk-coding/modules.json` | `6f2b5834b427b7ca50477cebec0dc9767d7096634b4eca8f4095c9e474945bbd` |
| `data/tk-coding/structure.json` | `e6e92f6f78be8de507720806783e85ac39ebb701ae3639d101d8a480ca098e70` |
| `data/tk-coding/weeks.json` | `0f47a1852fff7929a1cdb3db992075eaf9c9165f4f589ad9e6223846af672bad` |

### 2.4 Perintah yang bisa diulang
Jalankan dari root repository, pada commit yang akan dibandingkan (tanpa berkas baru, hanya perkakas yang sudah ada dan Bun).

a. Hash per berkas dan agregat:

```sh
find data -type f -name '*.json' | LC_ALL=C sort | xargs sha256sum > /tmp/hash-sesudah.txt
find data -type f -name '*.json' | LC_ALL=C sort | xargs sha256sum | sha256sum   # agregat
find data -type f -name '*.json' | wc -l                                         # 71
```

b. Ringkasan semantik (program, versi, jumlah berkas, modul, minggu):

```sh
bun -e '
import { existsSync, readdirSync, readFileSync } from "node:fs";
const reg = JSON.parse(readFileSync("data/programs.json", "utf8")).programs;
for (const p of reg) {
  const files = readdirSync(p.corpusDir).filter((f) => f.endsWith(".json"));
  const mf = `${p.corpusDir}/modules.json`, wf = `${p.corpusDir}/weeks.json`;
  const m = existsSync(mf) ? JSON.parse(readFileSync(mf, "utf8")).modules.length : 0;
  const w = existsSync(wf) ? JSON.parse(readFileSync(wf, "utf8")).weeks.length : "-";
  console.log([p.id, p.syllabusVersion, p.syllabusDate, files.length, files.filter((f) => f !== "modules.json").length, m, w].join("\t"));
}'
```

c. Pembanding terhadap baseline (keduanya keluar kosong, exit 0, bila `data/` identik dengan commit baseline):

```sh
git diff --stat 3eb5d894f559deeabd4edb62eba52842ebb63031 -- data/
find data -type f -name '*.json' | LC_ALL=C sort | xargs sha256sum | sha256sum | grep -c 0de993e24edb162a9b1fce3cd7d391075930adc059f673eea4bccd5a1813b8d5   # 1
```

## 3. Metode deteksi

Perkakas yang sudah ada, dijalankan berurutan; setiap lapis menangkap hal berbeda.

| Lapis | Perintah | Menangkap | Tidak menangkap |
| --- | --- | --- | --- |
| 1. Struktural dan referensial | `bun run validate` | skema, invarian struktur, referensial, kesepakatan `syllabusVersion` dan `syllabusDate` antara registry dan berkas, berkas korpus hilang atau tak terdaftar, id program yang berubah (K3) | perubahan teks bebas yang masih sah skema |
| 2. Fidelity ke sumber | `bun run check:fidelity` | selisih sel demi sel antara `docs/programs/<id>/silabus.md` dan `data/<id>/*.json` untuk 6 program ber-modul fidelity | program `osn` (tidak punya modul fidelity); perubahan di data yang tidak dibandingkan |
| 3. Privasi | `bun run privacy-check` | kunci berbentuk identitas langsung di mana pun di `data/` (rekursif, termasuk `.jsonl`) | nilai berbahaya di kunci yang tidak dikenali |
| 4. Hash sebelum dan sesudah | perintah 2.4a dibandingkan dengan 2.3 | **setiap** perubahan satu byte pada JSON, termasuk teks bebas yang lolos lapis 1-3 | tidak menjelaskan apa yang berubah; PR sah harus memperbarui baseline |
| 5. Diff git | `git diff --stat -- data/` (dan `src/schema/ src/domain/`) | berkas berubah, ditambah, atau dihapus | perubahan yang tidak ter-commit pada salinan di luar git |
| 6. Versi | bandingkan `package.json` `version` dan `syllabusVersion` di registry sebelum dan sesudah | tercampurnya dua garis versi (INV-08) | |

Aturan keputusan untuk PR F2 dan F3: lapis 1-3 harus exit 0; lapis 4 dan 5 harus menunjukkan **nol** berkas `data/` berubah. Bila ada berkas data berubah, PR tersebut keluar dari scope F2/F3 dan harus dipisah menjadi issue kurikulum.

## 4. Bukti uji fixture sintetis

Dijalankan 2026-11-19 pada salinan sementara repository (di folder scratch di luar repository, `data/`, `src/`, `scripts/`, `docs/`, `content/` disalin, `node_modules` ditautkan), dari baseline di atas. Setiap skenario memulihkan `data/` dari salinan murni, mengubah **satu** hal sintetis, lalu menjalankan tiga perintah dan menghitung hash agregat. Salinan dibuang sesudah uji; repository sungguhan tidak diubah (`git status` bersih, hash agregat 71 berkas sama).

Konvensi exit: 0 bersih, 1 temuan, 2 salah pakai.

| Skenario | Perubahan sintetis | `validate` | `check:fidelity` | `privacy-check` | Hash agregat berbeda | Berkas beda (`diff -rq`) |
| --- | --- | --- | --- | --- | --- | --- |
| K0 | kontrol, tanpa perubahan | 0 | 0 | 0 | tidak (`0de993e24edb162a`) | 0 |
| K1 | `syllabusVersion` di `data/sma-coding/weeks.json` 1.4.1 menjadi 1.4.2 | 1 | 1 | 0 | ya | 1 |
| K2 | versi `tk-coding` di `data/programs.json` 1.0.3 menjadi 1.0.4 | 1 | 1 | 0 | ya | 1 |
| K3 | `id` program `osn` menjadi `cac` di `data/programs.json` | 1 | 2 | 0 | ya | 1 |
| K4 | direktori `data/osn` diganti nama `data/cac` | 1 | 0 | 1 | ya | 2 |
| K5 | berkas `data/sd-coding/bridges.json` dihapus | 1 | 1 | 0 | ya | 1 |
| K6 | teks satu sel `topic` minggu pertama `data/sma-coding/weeks.json` diubah, versi tetap | 0 | 1 | 0 | ya | 1 |
| K7 | teks satu sel `focus` minggu pertama `data/osn/weeks.json` diubah, versi tetap | 0 | 0 | 0 | ya | 1 |
| K8 | kunci `email` (nilai sintetis `x@example.invalid`) disisipkan di `data/osn/weeks.json` | 0 | 0 | 1 | ya | 1 |
| K9 | kontrol akhir setelah pemulihan | 0 | 0 | 0 | tidak (`0de993e24edb162a`) | 0 |

Temuan penting:
- K1-K5 (identitas, versi, struktur) tertangkap oleh `validate` (exit 1); K3 juga membuat `check:fidelity` exit 2 (salah pakai; sebabnya tidak diselidiki lebih jauh, hanya exit code yang diamati).
- K6 hanya tertangkap fidelity, bukan `validate`: perubahan teks yang sah skema harus lewat lapis 2.
- **K7 lolos ketiga perkakas** (exit 0, 0, 0) karena `osn` tidak punya modul fidelity; **hanya hash/diff** yang mendeteksinya. Inilah alasan lapis 4 dan 5 wajib, bukan opsional.
- K8 hanya tertangkap `privacy-check`.

Rekonstruksi satu skenario (K1) dari root repository:

```sh
S=<folder-scratch>; mkdir -p $S/fx && cp -r src scripts data docs content package.json tsconfig.json bunfig.toml $S/fx/ && ln -s "$PWD/node_modules" $S/fx/node_modules
cd $S/fx && sed -i 's/"syllabusVersion": "1.4.1"/"syllabusVersion": "1.4.2"/' data/sma-coding/weeks.json
bun run validate; echo $?          # 1
bun run check:fidelity; echo $?    # 1
find data -type f -name '*.json' | LC_ALL=C sort | xargs sha256sum | sha256sum   # beda dari baseline
cd - && rm -rf $S/fx
```

Keterbatasan yang jujur:
- `git diff --stat -- data/` tidak dijalankan di salinan scratch (hanya di repository sungguhan, yang bersih); pada salinan, perbandingan berkas memakai `diff -rq` terhadap salinan `data.base`.
- Metode ini mendeteksi perubahan **data**; ia tidak membuktikan perilaku CLI ganda `cac`/`osn` (itu IDENTITY-CAC-003/004, issue lain).

## 5. Traceability

Tes yang sudah ada (berkas nyata) dan usulan PR F2 yang **perlu disepakati**; nomor PR belum ada, issue F2 baru dibuat setelah Gate 9 (epik #150).

### IDENTITY-CAC-002 (osn tetap ID program)
| Tes yang ada | Yang dikunci |
| --- | --- |
| `tests/unit/program-registry.test.ts` | id tabel unik dan setiap program terdaftar punya entri; setiap berkas korpus ada; seluruh korpus lolos audit lewat tabel |
| `tests/unit/programs.test.ts`, `tests/unit/program-schema.test.ts` | kesepakatan versi registry dan berkas; bentuk entri registry |
| `tests/integration/cli-validate-fixtures.test.ts` | korpus rusak terdeteksi (exit 1), `--program` tak dikenal exit 2, selisih `syllabusVersion` dan `syllabusDate` |
| `tests/integration/cli-validate.test.ts` | validasi korpus nyata exit 0 |
| `tests/integration/check-fidelity.test.ts`, `tests/integration/{sma,tk,kuliah,dewasa,sd,smp}-coding-fidelity.test.ts` | fidelity per program; selisih data exit 1 |

Celah: tidak ada tes yang mengunci secara eksplisit bahwa id `osn`, `corpusDir` `data/osn`, dan urutan tujuh program tetap ada; tidak ada pembanding hash. Usulan (perlu disepakati): PR F2-A "tes kontrak registry": tes yang menegaskan tujuh id, `corpusDir` setiap program, dan default `--program osn` tanpa mengunci isi silabus.

### IDENTITY-CAC-005 (SemVer independen dari syllabusVersion)
| Tes yang ada | Yang dikunci |
| --- | --- |
| `tests/unit/smoke.test.ts` | nama paket sama dengan `packageInfo.name`, paket `private`, skrip yang dijanjikan docs ada (tidak mengunci `version`) |
| `tests/integration/sma-coding-fidelity.test.ts` (baris 54), `tests/integration/tk-coding-fidelity.test.ts` (baris 62), `tests/integration/cli-sma-plan.test.ts` (baris 93, 216) | `syllabusVersion` sma-coding 1.4.1 dan tk-coding 1.0.3 di registry dan keluaran |
| `tests/unit/programs.test.ts` | selisih versi registry dengan berkas korpus dilaporkan |

Celah: tidak ada tes yang menegaskan `package.json` `version` terpisah dari `syllabusVersion`; garis pemisah hanya dijaga [releasing.md](../development/releasing.md) dan review. Catatan: tes yang mengunci versi silabus tertentu harus diperbarui bersama revisi silabus (terjadi pada #238 dan #239) dan bukan pada rename. Usulan (perlu disepakati): PR F2-B menambah tes bahwa mengganti nama paket atau `bin` tidak mengubah `syllabusVersion` registry, dan prosedur perbandingan versi sebelum dan sesudah (bagian 3, lapis 6) pada checklist PR.

### IDENTITY-CAC-009 (privasi, keamanan, reproducibility setara atau lebih baik)
| Tes yang ada | Yang dikunci |
| --- | --- |
| `tests/integration/cli-privacy-check.test.ts` | `privacy-check` exit 0 pada `data/` nyata, 1 pada kunci identitas bersarang tanpa membocorkan nilai, 2 pada salah pakai |
| `tests/unit/privacy-check.test.ts`, `tests/unit/privacy-check-command.test.ts` | pemindai dan perintah |
| `tests/unit/privacy-policy-doc.test.ts`, `tests/unit/governance-docs.test.ts` | dokumen privasi dan tata kelola tidak hilang atau berubah makna |

Celah: tidak ada tes pemindaian rahasia (secret) atau reproducibility hash; itu bagian audit F3. Usulan (perlu disepakati): PR F2-C menjalankan seluruh gerbang `AGENTS.md` (bagian 6 rencana migrasi) pada kedua alias CLI, plus langkah baseline hash (2.4) pada CI sebagai pemeriksaan non-blocking terlebih dahulu.

### Catatan lintas butir
- `docs/requirements/identity-cac.md` belum direferensikan di `docs/requirements/register.md` dan `traceability.md`, sehingga `bun run check:requirements` tidak memeriksanya (temuan di luar scope issue ini, untuk orchestrator).
- Nomor PR F2 tidak boleh dicatat sebagai disepakati sebelum pemilik atau orchestrator menyatakannya.

## Changelog
### 2026-11-19 - v1.0.0
- Mengunci 10 invariants, baseline commit `3eb5d89` (hash 71 berkas, ringkasan semantik 7 program), metode deteksi enam lapis dengan bukti fixture sintetis (K0-K9), dan traceability IDENTITY-CAC-002/005/009 ke tes yang ada serta usulan PR F2 (issue #154).
