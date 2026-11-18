/**
 * Pure rule for the learner sheets of the `tk-coding` and `sd-coding`
 * programmes (`content/<program>/lembar/<id>.md`, ADR-0007): a child's sheet
 * must carry no name or identity field of the child (privacy, ADR-0004 and
 * `docs/governance/privacy-policy.md`: the repository holds no learner
 * personal data, and a sheet that asks for it invites people to write it
 * into a committed or shared file).
 *
 * {@link learnerSheetIdentityProblems} finds the lines that are such a
 * field: a heading, a table-header cell or a fill-in line whose whole label
 * is "Nama", "Nama anak", "NIS", "Tanggal lahir", "Alamat", "Identitas" and
 * similar, written either with a colon (`Nama: ____`, even when filled in)
 * or bare (`## Nama`, `Nama ......`). A sentence that merely starts with the
 * word, or a label that is something else (`Nama binatang: kucing`), is not
 * a field. Used by `osn render modul --lembar` (which refuses such a sheet)
 * and by `osn validate`.
 */

/** One line of a sheet that looks like a name or identity field. */
export interface IdentityProblem {
  /** 1-based line number in the sheet. */
  readonly line: number;
  /** The offending line, trimmed. */
  readonly text: string;
}

const IDENTITY_LABELS = [
  "nama",
  "namaku",
  "nama saya",
  "nama kamu",
  "nama panggilan",
  "nama anak",
  "nama siswa",
  "nama murid",
  "nama peserta",
  "nama lengkap",
  "nama orang tua",
  "nama wali",
  "nama ibu",
  "nama ayah",
  "name",
  "nis",
  "nisn",
  "nik",
  "nomor induk",
  "nomor induk siswa",
  "tanggal lahir",
  "tempat lahir",
  "tempat dan tanggal lahir",
  "alamat",
  "alamat rumah",
  "nama sekolah",
  "asal sekolah",
  "identitas",
  "identitas anak",
  "identitas siswa",
  "data diri",
  "biodata",
];

const FIELD_PATTERN = new RegExp(
  `^(?:${IDENTITY_LABELS.map((label) => label.replaceAll(" ", "\\s+")).join("|")})\\s*(?:[:=].*|[_.…\\-–\\s]*)$`,
);

/** The text of one line or table cell without list/heading/quote markers and emphasis, lower-cased. */
function normalise(segment: string): string {
  return segment
    .replace(/^[\s>#*+\-•]+/, "")
    .replace(/^\d+[.)]\s+/, "")
    .replace(/^\[[ xX]\]\s*/, "")
    .replaceAll(/[*`]/g, "")
    .trim()
    .toLowerCase();
}

/** Whether one line, or one cell of a table line, is an identity field. */
function isIdentityField(line: string): boolean {
  const segments = line.includes("|") ? line.split("|") : [line];
  return segments.some((segment) => {
    const text = normalise(segment);
    return text !== "" && FIELD_PATTERN.test(text);
  });
}

/** Every line of `body` that is a name or identity field; empty when the sheet is clean. */
export function learnerSheetIdentityProblems(body: string): IdentityProblem[] {
  const problems: IdentityProblem[] = [];
  body.split(/\r?\n/).forEach((raw, index) => {
    if (isIdentityField(raw)) {
      problems.push({ line: index + 1, text: raw.trim() });
    }
  });
  return problems;
}
