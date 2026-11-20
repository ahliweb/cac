/**
 * Learner-sheet asset check (ADR-0007, issue #178). Two parts, both offline
 * and read-only:
 *
 *   1. Every `content/<program>/gambar/*.svg` must be a safe, self-contained
 *      vector drawing: well-formed XML with an `svg` root that has a
 *      `viewBox`; no `<script>`, `<image>` or `<foreignObject>`; no `on*`
 *      event attribute; no `href` / `xlink:href` that leaves the file (only
 *      `#fragment` references are allowed); no `data:` URI; no `@import` and
 *      no `url(...)` that is not a `#fragment`; no DOCTYPE (so no entity
 *      tricks); and at most {@link MAX_SVG_BYTES} bytes.
 *   2. Every image link `![alt](path)` in `content/<program>/lembar/*.md`
 *      (outside fenced code) must point to an existing file inside that
 *      programme's `gambar/` directory. An SVG that no sheet references is
 *      only a WARNING (exit code unaffected).
 *
 * The XML check is a small strict well-formedness scanner (tag nesting, one
 * root, quoted attributes, legal entity references), not a full XML parser:
 * it exists so the repository needs no extra dependency.
 *
 * A third, separate rule covers the document title (issue #178, #124):
 * `osn render modul` (and `--lembar`) prints the H1 title from the index, so
 * a module body `content/<program>/modules/*.md` and a sheet
 * `content/<program>/lembar/*.md` must not begin with an `# ` heading of
 * its own (it would print twice). The content is normalised, so this is an
 * ERROR ({@link DUPLICATE_TITLE_IS_ERROR}).
 *
 * Run standalone:
 *
 *   bun run scripts/check-learner-assets.ts
 *
 * Exits 0 when there is no error (warnings are printed), 1 on any error.
 */

import { dirname, join, normalize, sep } from "node:path";

const REPO_ROOT = join(import.meta.dir, "..");

/** Largest accepted SVG, in bytes. */
export const MAX_SVG_BYTES = 50 * 1024;

/**
 * Whether a body that starts with its own `# ` title is an error (`true`, the
 * current state: existing content is normalised) or only a warning (`false`).
 */
export const DUPLICATE_TITLE_IS_ERROR = true;

const FORBIDDEN_ELEMENTS = new Set(["script", "image", "foreignobject"]);

interface XmlElement {
  readonly name: string;
  readonly attributes: ReadonlyMap<string, string>;
}

/** What the scanner found in one XML document. */
interface XmlScan {
  readonly error?: string;
  readonly elements: readonly XmlElement[];
  /** Text content of every element, concatenated (used to scan `<style>`). */
  readonly styleText: readonly string[];
}

const NAME = "[A-Za-z_:][-A-Za-z0-9_:.]*";
const ENTITY = /&(?!(?:amp|lt|gt|quot|apos|#[0-9]+|#x[0-9A-Fa-f]+);)/;

/** Parses the attributes of one start tag body; returns an error text or the map. */
function parseAttributes(source: string): ReadonlyMap<string, string> | string {
  const attributes = new Map<string, string>();
  const pattern = new RegExp(`\\s+(${NAME})\\s*=\\s*("([^"<]*)"|'([^'<]*)')`, "y");
  let position = 0;
  while (position < source.length) {
    pattern.lastIndex = position;
    const match = pattern.exec(source);
    if (match === null) {
      if (source.slice(position).trim() === "") {
        break;
      }
      return `malformed attribute near "${source.slice(position, position + 20).trim()}"`;
    }
    const name = match[1] ?? "";
    const value = match[3] ?? match[4] ?? "";
    if (attributes.has(name)) {
      return `duplicate attribute "${name}"`;
    }
    if (ENTITY.test(value)) {
      return `illegal entity reference in attribute "${name}"`;
    }
    attributes.set(name, value);
    position = pattern.lastIndex;
  }
  return attributes;
}

/** Scans `xml` for well-formedness and collects its elements. */
export function scanXml(xml: string): XmlScan {
  const elements: XmlElement[] = [];
  const styleText: string[] = [];
  const stack: string[] = [];
  let rootSeen = false;
  let position = 0;
  const fail = (error: string): XmlScan => ({ error, elements, styleText });

  const text = xml.startsWith("﻿") ? xml.slice(1) : xml;
  while (position < text.length) {
    const lt = text.indexOf("<", position);
    const chunk = text.slice(position, lt === -1 ? text.length : lt);
    if (stack.length === 0 && chunk.trim() !== "") {
      return fail("text outside the root element");
    }
    if (chunk.includes("]]>")) {
      return fail('"]]>" in text content');
    }
    if (ENTITY.test(chunk)) {
      return fail("illegal entity reference in text");
    }
    if (stack.length > 0 && stack[stack.length - 1]?.toLowerCase().endsWith("style")) {
      styleText.push(chunk);
    }
    if (lt === -1) {
      break;
    }
    position = lt;

    if (text.startsWith("<!--", position)) {
      const end = text.indexOf("-->", position + 4);
      if (end === -1) {
        return fail("unterminated comment");
      }
      if (text.slice(position + 4, end).includes("--")) {
        return fail('"--" inside a comment');
      }
      position = end + 3;
    } else if (text.startsWith("<![CDATA[", position)) {
      const end = text.indexOf("]]>", position);
      if (end === -1 || stack.length === 0) {
        return fail(stack.length === 0 ? "CDATA outside the root element" : "unterminated CDATA");
      }
      if (stack[stack.length - 1]?.toLowerCase().endsWith("style")) {
        styleText.push(text.slice(position + 9, end));
      }
      position = end + 3;
    } else if (text.startsWith("<?", position)) {
      const end = text.indexOf("?>", position);
      if (end === -1) {
        return fail("unterminated processing instruction");
      }
      position = end + 2;
    } else if (text.startsWith("<!", position)) {
      return fail("DOCTYPE / declarations are not allowed");
    } else if (text.startsWith("</", position)) {
      const match = new RegExp(`^</(${NAME})\\s*>`).exec(text.slice(position));
      if (match === null) {
        return fail("malformed closing tag");
      }
      const expected = stack.pop();
      if (expected !== match[1]) {
        return fail(`closing tag </${match[1]}> does not match <${expected ?? "(none)"}>`);
      }
      position += match[0].length;
    } else {
      const match = new RegExp(
        `^<(${NAME})((?:\\s+${NAME}\\s*=\\s*(?:"[^"<]*"|'[^'<]*'))*)\\s*(/?)>`,
      ).exec(text.slice(position));
      if (match === null) {
        return fail(`malformed start tag near "${text.slice(position, position + 30)}"`);
      }
      const name = match[1] ?? "";
      if (stack.length === 0) {
        if (rootSeen) {
          return fail("more than one root element");
        }
        rootSeen = true;
      }
      const attributes = parseAttributes(match[2] ?? "");
      if (typeof attributes === "string") {
        return fail(attributes);
      }
      elements.push({ name, attributes });
      if (match[3] !== "/") {
        stack.push(name);
      }
      position += match[0].length;
    }
  }

  if (stack.length > 0) {
    return fail(`element <${stack[stack.length - 1]}> is not closed`);
  }
  if (!rootSeen) {
    return fail("no root element");
  }
  return { elements, styleText };
}

/** Local name without namespace prefix, lowercased. */
const localName = (name: string): string => (name.split(":").pop() ?? name).toLowerCase();

/** Problems with a CSS/style string: `@import`, `data:` and non-fragment `url(...)`. */
function styleProblems(css: string, where: string): string[] {
  const problems: string[] = [];
  if (/@import/i.test(css)) {
    problems.push(`${where}: @import is not allowed`);
  }
  if (/data\s*:/i.test(css)) {
    problems.push(`${where}: data: URI is not allowed`);
  }
  for (const match of css.matchAll(/url\(\s*(['"]?)([^'")]*)\1\s*\)/gi)) {
    if (!(match[2] ?? "").trim().startsWith("#")) {
      problems.push(`${where}: url(${match[2]}) leaves the file (only #fragment is allowed)`);
    }
  }
  return problems;
}

/** All rule violations of one SVG source (empty when the drawing is acceptable). */
export function svgProblems(
  svg: string,
  byteLength = new TextEncoder().encode(svg).length,
): string[] {
  const problems: string[] = [];
  if (byteLength > MAX_SVG_BYTES) {
    problems.push(`size ${byteLength} bytes exceeds the ${MAX_SVG_BYTES}-byte limit`);
  }
  const scan = scanXml(svg);
  if (scan.error !== undefined) {
    problems.push(`not well-formed XML: ${scan.error}`);
    return problems;
  }
  const root = scan.elements[0];
  if (root === undefined || localName(root.name) !== "svg") {
    problems.push("root element is not <svg>");
  } else if (!(root.attributes.get("viewBox") ?? "").trim()) {
    problems.push("root <svg> has no viewBox");
  }
  for (const element of scan.elements) {
    const name = localName(element.name);
    if (FORBIDDEN_ELEMENTS.has(name)) {
      problems.push(`forbidden element <${element.name}>`);
    }
    for (const [attribute, value] of element.attributes) {
      const attributeName = localName(attribute);
      if (attributeName.startsWith("on")) {
        problems.push(`forbidden event attribute ${attribute} on <${element.name}>`);
      }
      if (attributeName === "href" && !value.trim().startsWith("#")) {
        problems.push(
          `<${element.name}> ${attribute}="${value}" leaves the file (only #fragment is allowed)`,
        );
      }
      if (/^\s*data\s*:/i.test(value)) {
        problems.push(`data: URI in ${attribute} on <${element.name}>`);
      }
      if (attributeName === "style") {
        problems.push(...styleProblems(value, `style attribute on <${element.name}>`));
      } else if (/url\(/i.test(value)) {
        problems.push(...styleProblems(value, `${attribute} on <${element.name}>`));
      }
    }
  }
  for (const css of scan.styleText) {
    problems.push(...styleProblems(css, "<style>"));
  }
  return problems;
}

/** One image link `![alt](target)` of a sheet and the 1-based line it is on. */
export interface ImageLink {
  readonly line: number;
  readonly target: string;
}

/** Extracts the image links of `markdown`, ignoring fenced code blocks. */
export function extractImageLinks(markdown: string): ImageLink[] {
  const links: ImageLink[] = [];
  let fenced = false;
  markdown.split("\n").forEach((line, index) => {
    if (/^\s*```/.test(line)) {
      fenced = !fenced;
      return;
    }
    if (fenced) {
      return;
    }
    // alt text may hold backslash escapes and one level of balanced brackets (CommonMark), e.g. `![a[2]](x.svg)`
    for (const match of line.matchAll(
      /!\[(?:[^[\]\\]|\\.|\[(?:[^[\]\\]|\\.)*\])*\]\(\s*<?([^)\s>]+)>?(?:\s+(?:"[^"]*"|'[^']*'))?\s*\)/g,
    )) {
      links.push({ line: index + 1, target: match[1] ?? "" });
    }
  });
  return links;
}

/**
 * The 1-based line of a leading `# ` (H1) heading of `markdown`, or `undefined`
 * when the first non-blank line is not one. A leading YAML front matter block
 * is skipped; a `#` inside fenced code is never the first line.
 */
export function leadingTitleLine(markdown: string): number | undefined {
  const lines = markdown.split("\n");
  let index = 0;
  if (lines[0]?.trim() === "---") {
    const end = lines.findIndex((line, i) => i > 0 && line.trim() === "---");
    if (end > 0) {
      index = end + 1;
    }
  }
  while (index < lines.length && (lines[index] ?? "").trim() === "") {
    index += 1;
  }
  return /^#\s+\S/.test(lines[index] ?? "") ? index + 1 : undefined;
}

/** The result of checking a repository tree. */
export interface AssetCheckResult {
  readonly svgChecked: number;
  readonly sheetsChecked: number;
  readonly linksChecked: number;
  /** Module bodies and sheets whose first line is a duplicate `# ` title. */
  readonly duplicateTitles: number;
  readonly errors: readonly string[];
  readonly warnings: readonly string[];
}

const posix = (path: string): string => path.split(sep).join("/");

/** Checks every `content/<program>/gambar/*.svg` and `content/<program>/lembar/*.md` under `repoRoot`. */
export async function checkLearnerAssets(repoRoot: string): Promise<AssetCheckResult> {
  const errors: string[] = [];
  const warnings: string[] = [];
  const scan = async (pattern: string) =>
    (await Array.fromAsync(new Bun.Glob(pattern).scan({ cwd: repoRoot }))).sort();

  const svgFiles = await scan("content/*/gambar/*.svg");
  const sheets = await scan("content/*/lembar/*.md");
  const referenced = new Set<string>();
  let linksChecked = 0;
  let duplicateTitles = 0;

  for (const file of [...(await scan("content/*/modules/*.md")), ...sheets]) {
    const line = leadingTitleLine(await Bun.file(join(repoRoot, file)).text());
    if (line !== undefined) {
      duplicateTitles += 1;
      (DUPLICATE_TITLE_IS_ERROR ? errors : warnings).push(
        `${file}:${line}: body starts with its own "# " title; the renderer already prints the title from the index`,
      );
    }
  }

  for (const file of svgFiles) {
    const bytes = await Bun.file(join(repoRoot, file)).bytes();
    const text = new TextDecoder().decode(bytes);
    for (const problem of svgProblems(text, bytes.length)) {
      errors.push(`${file}: ${problem}`);
    }
  }

  for (const sheet of sheets) {
    const program = sheet.split("/")[1] ?? "";
    const gambarDir = `content/${program}/gambar`;
    const markdown = await Bun.file(join(repoRoot, sheet)).text();
    for (const link of extractImageLinks(markdown)) {
      linksChecked += 1;
      const where = `${sheet}:${link.line}`;
      if (/^[a-z][a-z0-9+.-]*:/i.test(link.target) || link.target.startsWith("//")) {
        errors.push(
          `${where}: image link "${link.target}" is external; use a file in ${gambarDir}/`,
        );
        continue;
      }
      const path = link.target.split(/[?#]/)[0] ?? "";
      const resolved = posix(normalize(join(dirname(sheet), path)));
      if (!resolved.startsWith(`${gambarDir}/`)) {
        errors.push(`${where}: image link "${link.target}" is outside ${gambarDir}/`);
        continue;
      }
      if (!(await Bun.file(join(repoRoot, resolved)).exists())) {
        errors.push(`${where}: image link "${link.target}" points to a file that does not exist`);
        continue;
      }
      referenced.add(resolved);
    }
  }

  for (const file of svgFiles) {
    if (!referenced.has(file)) {
      warnings.push(`${file}: orphan SVG, not referenced by any sheet in content/*/lembar/`);
    }
  }

  return {
    svgChecked: svgFiles.length,
    sheetsChecked: sheets.length,
    linksChecked,
    duplicateTitles,
    errors,
    warnings,
  };
}

/** Where {@link run} writes: injected so tests can capture it. */
export interface Output {
  readonly log: (text: string) => void;
  readonly error: (text: string) => void;
}

/** Runs the check and returns the process exit code (0 clean or warnings only, 1 on any error). */
export async function run(repoRoot: string, out: Output = console): Promise<number> {
  const result = await checkLearnerAssets(repoRoot);
  for (const warning of result.warnings) {
    out.log(`check-learner-assets: WARNING -- ${warning}`);
  }
  if (result.errors.length > 0) {
    out.error(`check-learner-assets: FAILED -- ${result.errors.length} problem(s):`);
    for (const error of result.errors) {
      out.error(`  ${error}`);
    }
    return 1;
  }
  out.log(
    `check-learner-assets: OK -- ${result.svgChecked} SVG file(s), ${result.linksChecked} image link(s) in ${result.sheetsChecked} sheet(s); ${result.warnings.length} warning(s).`,
  );
  return 0;
}

if (import.meta.main) {
  process.exit(await run(REPO_ROOT));
}
