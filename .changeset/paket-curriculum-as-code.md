---
"curriculum-as-code": minor
---

Mengganti nama paket privat dari `kurikulum-informatika` menjadi `curriculum-as-code` (issue #252, keputusan K6 Gate 9, ADR-0009 butir 5): `package.json` `name`, `bun.lock`, `packageInfo.name` di `src/index.ts`, dan frontmatter changeset yang tertunda. Paket tetap `private: true` dan tidak diterbitkan ke registry; versi SemVer (`--version`) dan setiap `syllabusVersion` tidak berubah. Consumer yang membaca `packageInfo.name` atau nama paket di lockfile perlu menyesuaikan nama baru; data, skema, domain, CLI `osn`/`cac`, dan ID program `osn` tidak berubah.
