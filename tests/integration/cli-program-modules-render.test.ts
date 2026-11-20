/**
 * End-to-end tests of `osn render modul --program <id>` (and `--lembar`) for
 * the five programmes `tk-coding`, `sd-coding`, `smp-coding`,
 * `kuliah-coding` and `dewasa-coding` (ADR-0007, ADR-0008): the real CLI as a
 * subprocess against a temporary copy of the repository (see
 * `tests/helpers/program-modules-repo.ts`) with a synthetic `modules.json`
 * and synthetic content files. Also the honest refusal of `plan` and
 * `render lembar-siswa` for these programmes, which now names `render modul`.
 */

import { afterAll, beforeAll, describe, expect, test } from "bun:test";
import { dw, kul, REFERENCE, sd, smp, tk } from "../helpers/program-module-entries";
import { createProgramModulesRepo, type ProgramModulesRepo } from "../helpers/program-modules-repo";

let repo: ProgramModulesRepo;

beforeAll(async () => {
  repo = await createProgramModulesRepo();
});
afterAll(async () => {
  await repo.dispose();
});

type Entry = Record<string, unknown>;

interface Sample {
  readonly program: string;
  readonly name: string;
  readonly entry: Entry;
  readonly sheet?: string;
}

const SAMPLES: readonly Sample[] = [
  {
    program: "tk-coding",
    name: "Silabus Pembelajaran Coding TK/PAUD (Berpikir Komputasional)",
    entry: tk("TK-A1-M1", { cpOverlap: ["FF-DL-b"] }),
    sheet: "Tempel dua gambar urutan: cuci tangan, lalu makan.",
  },
  {
    program: "sd-coding",
    name: "Silabus Pembelajaran Coding SD",
    entry: sd("SD5-1-M3", { cpItems: ["C-BK-a"] }),
    sheet: "Tulis tiga langkah mengatur piket.",
  },
  {
    program: "smp-coding",
    name: "Silabus Pembelajaran Coding SMP",
    entry: smp("SMP7-1-M1", { cpCodes: ["D-BK-a"] }),
  },
  {
    program: "kuliah-coding",
    name: "Silabus Pembelajaran Coding Perguruan Tinggi",
    entry: kul("KUL-U-101", { knowledgeAreas: ["SDF"] }),
  },
  {
    program: "dewasa-coding",
    name: "Silabus Pembelajaran Coding untuk Dewasa",
    entry: dw("DW-PRO-M1", { skkniUnits: ["J.620100.011.01"], prerequisites: ["DW-FND-M1"] }),
  },
];

async function install(sample: Sample, overrides: Entry = {}): Promise<Entry> {
  const entry = { ...sample.entry, ...overrides };
  await repo.setIndex(sample.program, [entry]);
  await repo.write(String(entry.contentPath), `## Isi ${String(entry.id)}\n\nTeks isi sintetis.\n`);
  if (sample.sheet !== undefined) {
    await repo.write(String(entry.learnerSheetPath), `## Lembar\n\n${sample.sheet}\n`);
  }
  return entry;
}

describe("osn render modul --program <id>", () => {
  for (const sample of SAMPLES) {
    describe(sample.program, () => {
      test("renders a draft module with the DRAF banner, references and footer", async () => {
        const entry = await install(sample);
        const result = await repo.cli(
          "render",
          "modul",
          "--program",
          sample.program,
          "--id",
          String(entry.id),
        );
        expect(result.stderr).toBe("");
        expect(result.exitCode).toBe(0);
        const lines = result.stdout.split("\n");
        expect(lines[0]).toBe(`# ${String(entry.title)}`);
        expect(lines[2]).toStartWith("> **DRAF — belum ditinjau.**");
        expect(result.stdout).toContain(`## Isi ${String(entry.id)}`);
        expect(result.stdout).toContain("## Rujukan");
        expect(result.stdout).toContain(`- ${REFERENCE.title} <${REFERENCE.url}>`);
        expect(result.stdout).toContain("Status modul: draf.");
        expect(result.stdout).toContain(`Program: ${sample.name} (${sample.program}).`);
        expect(result.stdout).not.toContain("Lembar anak");
      });

      test("an approved module has no banner and records approval date and reviewer role", async () => {
        const entry = await install(sample, {
          status: "disetujui",
          review: { approvedOn: "2026-11-19", reviewerRole: "pemilik" },
        });
        const result = await repo.cli(
          "render",
          "modul",
          "--program",
          sample.program,
          "--id",
          String(entry.id),
        );
        expect(result.exitCode).toBe(0);
        expect(result.stdout).not.toContain("DRAF");
        expect(result.stdout).toContain("Status modul: disetujui.");
        expect(result.stdout).toContain(
          "Disetujui pada 2026-11-19 oleh peninjau dengan peran: pemilik.",
        );
      });

      test("an unknown id and a missing --id are exit 2", async () => {
        await install(sample);
        const unknown = await repo.cli(
          "render",
          "modul",
          "--program",
          sample.program,
          "--id",
          "lain",
        );
        expect(unknown.exitCode).toBe(2);
        expect(unknown.stderr).toContain(`Known modules: ${String(sample.entry.id)}`);
        const missing = await repo.cli("render", "modul", "--program", sample.program);
        expect(missing.exitCode).toBe(2);
        expect(missing.stderr).toContain("--id <module-id> is required");
      });

      test("without a modules.json the command says so (exit 2)", async () => {
        const { rm } = await import("node:fs/promises");
        await rm(`${repo.root}/data/${sample.program}/modules.json`, { force: true });
        const result = await repo.cli("render", "modul", "--program", sample.program, "--id", "x");
        expect(result.exitCode).toBe(2);
        expect(result.stderr).toContain("this programme has no modules.json");
      });

      test("--out writes the file and refuses to overwrite it without --force", async () => {
        const entry = await install(sample);
        const out = `${repo.root}/keluaran-${sample.program}.md`;
        const first = await repo.cli(
          "render",
          "modul",
          "--program",
          sample.program,
          "--id",
          String(entry.id),
          "--out",
          out,
        );
        expect(first.exitCode).toBe(0);
        expect(await Bun.file(out).text()).toContain(`# ${String(entry.title)}`);
        const again = await repo.cli(
          "render",
          "modul",
          "--program",
          sample.program,
          "--id",
          String(entry.id),
          "--out",
          out,
        );
        expect(again.exitCode).toBe(2);
        expect(again.stderr).toContain("already exists");
      });
    });
  }

  test("tk-coding: the CP overlap is shown as an interpreted overlap, never fulfilment", async () => {
    const sample = SAMPLES[0] as Sample;
    await install(sample);
    const result = await repo.cli("render", "modul", "--program", "tk-coding", "--id", "tk-a1-m1");
    expect(result.stdout).toContain(
      "Irisan penafsiran dengan CP Fase Fondasi (bukan pemenuhan CP): FF-DL-b.",
    );
  });
});

describe("osn render modul --lembar", () => {
  for (const sample of SAMPLES.filter((s) => s.sheet !== undefined)) {
    describe(sample.program, () => {
      test("renders the child's sheet with the same banner and no references section", async () => {
        const entry = await install(sample);
        const result = await repo.cli(
          "render",
          "modul",
          "--program",
          sample.program,
          "--id",
          String(entry.id),
          "--lembar",
        );
        expect(result.stderr).toBe("");
        expect(result.exitCode).toBe(0);
        const lines = result.stdout.split("\n");
        expect(lines[0]).toBe(`# ${String(entry.title)}`);
        expect(lines[2]).toBe("**Lembar anak**");
        expect(lines[4]).toStartWith("> **DRAF — belum ditinjau.**");
        expect(result.stdout).toContain(sample.sheet as string);
        expect(result.stdout).not.toContain("Teks isi sintetis");
        expect(result.stdout).not.toContain("## Rujukan");
        expect(result.stdout).toContain(`Program: ${sample.name} (${sample.program}).`);
      });

      test("a sheet with a name field is refused (exit 1) and nothing is printed", async () => {
        const entry = await install(sample);
        await repo.write(
          String(entry.learnerSheetPath),
          "## Lembar\n\nNama: ______\n\nTempel gambar.\n",
        );
        const result = await repo.cli(
          "render",
          "modul",
          "--program",
          sample.program,
          "--id",
          String(entry.id),
          "--lembar",
        );
        expect(result.exitCode).toBe(1);
        expect(result.stdout).toBe("");
        expect(result.stderr).toContain("has a name or identity field of the child");
        expect(result.stderr).toContain('line 3 ("Nama: ______")');
      });

      test("a missing sheet is exit 2", async () => {
        const entry = await install(sample);
        const { rm } = await import("node:fs/promises");
        await rm(`${repo.root}/${String(entry.learnerSheetPath)}`);
        const result = await repo.cli(
          "render",
          "modul",
          "--program",
          sample.program,
          "--id",
          String(entry.id),
          "--lembar",
        );
        expect(result.exitCode).toBe(2);
        expect(result.stderr).toContain("learner sheet");
      });
    });
  }

  for (const sample of SAMPLES.filter((s) => s.sheet === undefined)) {
    describe(`${sample.program} (own-status worksheet, ADR-0011)`, () => {
      const SHEET = "Kerjakan tiga soal berikut.";
      const sheetFields = (id: string, extra: Entry = {}): Entry => ({
        learnerSheetPath: `content/${sample.program}/lembar/${id}.md`,
        learnerSheetStatus: "draf",
        ...extra,
      });
      const render = (id: string) =>
        repo.cli("render", "modul", "--program", sample.program, "--id", id, "--lembar");

      test("a module without a sheet: --lembar is exit 2", async () => {
        const entry = await install(sample);
        const result = await render(String(entry.id));
        expect(result.exitCode).toBe(2);
        expect(result.stdout).toBe("");
        expect(result.stderr).toContain(`module "${String(entry.id)}" has no learner sheet`);
      });

      test("a draft worksheet of an approved module has the sheet's DRAF banner and status", async () => {
        const id = String(sample.entry.id);
        const entry = await install(sample, {
          status: "disetujui",
          review: { approvedOn: "2026-11-20", reviewerRole: "pemilik" },
          ...sheetFields(id),
        });
        await repo.write(String(entry.learnerSheetPath), `## Latihan\n\n${SHEET}\n`);
        const result = await render(id);
        expect(result.stderr).toBe("");
        expect(result.exitCode).toBe(0);
        const lines = result.stdout.split("\n");
        expect(lines[0]).toBe(`# ${String(entry.title)}`);
        expect(lines[2]).toBe("**Lembar kerja**");
        expect(lines[4]).toStartWith("> **DRAF — belum ditinjau.** Lembar ini");
        expect(result.stdout).toContain(SHEET);
        expect(result.stdout).toContain("Status lembar: draf.");
        expect(result.stdout).not.toContain("Disetujui pada");
        expect(result.stdout).not.toContain("Teks isi sintetis");
        expect(result.stdout).not.toContain("## Rujukan");
      });

      test("an approved worksheet has no banner and records its own approval", async () => {
        const id = String(sample.entry.id);
        const entry = await install(sample, {
          ...sheetFields(id, {
            learnerSheetStatus: "disetujui",
            learnerSheetReview: { approvedOn: "2026-12-01", reviewerRole: "mentor" },
          }),
        });
        await repo.write(String(entry.learnerSheetPath), `${SHEET}\n`);
        const result = await render(id);
        expect(result.exitCode).toBe(0);
        expect(result.stdout).not.toContain("DRAF");
        expect(result.stdout).toContain("Status lembar: disetujui.");
        expect(result.stdout).toContain(
          "Disetujui pada 2026-12-01 oleh peninjau dengan peran: mentor.",
        );
      });

      test("a worksheet with a name field is refused (exit 1)", async () => {
        const id = String(sample.entry.id);
        const entry = await install(sample, sheetFields(id));
        await repo.write(String(entry.learnerSheetPath), "## Latihan\n\nNama: ______\n");
        const result = await render(id);
        expect(result.exitCode).toBe(1);
        expect(result.stdout).toBe("");
        expect(result.stderr).toContain('line 3 ("Nama: ______")');
      });

      test("a sheet field set without its status fails the index (exit 2, validate says why)", async () => {
        const id = String(sample.entry.id);
        await install(sample, { learnerSheetPath: `content/${sample.program}/lembar/${id}.md` });
        const result = await render(id);
        expect(result.exitCode).toBe(2);
        expect(result.stderr).toContain("learnerSheetStatus");
      });
    });
  }

  test("--lembar with another render subcommand is exit 2", async () => {
    const result = await repo.cli("render", "sop", "--lembar");
    expect(result.exitCode).toBe(2);
    expect(result.stderr).toContain('--lembar is only valid with "osn render modul"');
  });
});

describe("plan and render lembar-siswa refuse the five programmes honestly, naming render modul", () => {
  for (const sample of SAMPLES) {
    test(`${sample.program}`, async () => {
      const result = await repo.cli("plan", "--program", sample.program, "--track", "A");
      expect(result.exitCode).toBe(2);
      expect(result.stdout).toBe("");
      expect(result.stderr).toContain(`belum didukung untuk program ${sample.program}`);
      expect(result.stderr).toContain('hanya tersedia untuk program "osn" dan "sma-coding"');
      expect(result.stderr).toContain(`"osn render modul --program ${sample.program} --id <id>"`);
      expect(result.stderr).toContain(`data/${sample.program}/modules.json`);
      expect(result.stderr).toContain(`"osn validate --program ${sample.program}"`);
      expect(result.stderr).toContain(`"bun run check:fidelity --program ${sample.program}"`);
      expect(result.stderr).toContain(
        sample.sheet === undefined ? "(perlu data/" : "tambahkan --lembar untuk lembar anak",
      );
      const sheet = await repo.cli(
        "render",
        "lembar-siswa",
        "--program",
        sample.program,
        "--week",
        "1",
      );
      expect(sheet.exitCode).toBe(2);
      expect(sheet.stderr).toContain("osn render modul");
    });
  }
});
