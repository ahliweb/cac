/**
 * Synthetic module-index entries of the five per-programme module schemas,
 * shared by the unit and integration tests of the module indexes
 * (ADR-0007, ADR-0008). Every entry is invented test data: a reference to an
 * example domain, no real learner data.
 */

export const REFERENCE = {
  title: "Rujukan sintetis untuk uji",
  url: "https://contoh.example/rujukan",
};

function lifecycle(program: string, id: string): Record<string, unknown> {
  return {
    title: `Modul ${id}`,
    language: "id",
    status: "draf",
    references: [REFERENCE],
    contentPath: `content/${program}/modules/${id}.md`,
  };
}

function lembar(program: string, id: string): Record<string, unknown> {
  return { learnerSheetPath: `content/${program}/lembar/${id}.md` };
}

const slug = (code: string) => code.toLowerCase();

export function tk(code: string, overrides: Record<string, unknown> = {}): Record<string, unknown> {
  const id = slug(code);
  return {
    id,
    ...lifecycle("tk-coding", id),
    weekCodes: [code],
    cpOverlap: [],
    groups: [code.charAt(3)],
    prerequisites: [],
    audience: "guru",
    ...lembar("tk-coding", id),
    ...overrides,
  };
}

export function sd(code: string, overrides: Record<string, unknown> = {}): Record<string, unknown> {
  const id = slug(code);
  return {
    id,
    ...lifecycle("sd-coding", id),
    weekCodes: [code],
    cpItems: [],
    gradeLevels: [Number(code.charAt(2))],
    prerequisites: [],
    audience: "guru",
    ...lembar("sd-coding", id),
    ...overrides,
  };
}

export function smp(
  code: string,
  overrides: Record<string, unknown> = {},
): Record<string, unknown> {
  const id = slug(code);
  return {
    id,
    ...lifecycle("smp-coding", id),
    weekCodes: [code],
    cpCodes: [],
    gradeLevels: [code.charAt(3)],
    prerequisites: [],
    audience: "siswa",
    ...overrides,
  };
}

export function kul(
  code: string,
  overrides: Record<string, unknown> = {},
): Record<string, unknown> {
  const id = slug(code);
  return {
    id,
    ...lifecycle("kuliah-coding", id),
    courseCodes: [code],
    knowledgeAreas: [],
    semester: "S1",
    prerequisites: [],
    audience: "mahasiswa",
    ...overrides,
  };
}

export function dw(code: string, overrides: Record<string, unknown> = {}): Record<string, unknown> {
  const id = slug(code);
  return {
    id,
    ...lifecycle("dewasa-coding", id),
    moduleCodes: [code],
    skkniUnits: [],
    track: code.split("-")[1],
    prerequisites: [],
    audience: "peserta",
    ...overrides,
  };
}
