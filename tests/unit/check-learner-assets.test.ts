/**
 * Unit tests for the pure parts of `scripts/check-learner-assets.ts`
 * (issue #178): the XML scanner, every SVG rule, and image-link extraction.
 * All fixtures are synthetic strings.
 */

import { describe, expect, test } from "bun:test";
import {
  extractImageLinks,
  leadingTitleLine,
  MAX_SVG_BYTES,
  scanXml,
  svgProblems,
} from "../../scripts/check-learner-assets";

const svg = (inner: string, attributes = 'viewBox="0 0 10 10"') =>
  `<svg xmlns="http://www.w3.org/2000/svg" ${attributes}>${inner}</svg>`;

describe("leadingTitleLine", () => {
  test("finds a leading H1, after blank lines and after front matter", () => {
    expect(leadingTitleLine("# Judul\n\nIsi")).toBe(1);
    expect(leadingTitleLine("\n\n# Judul\n")).toBe(3);
    expect(leadingTitleLine("---\nkey: v\n---\n\n# Judul\n")).toBe(5);
  });

  test("ignores a body without a leading H1", () => {
    expect(leadingTitleLine("")).toBeUndefined();
    expect(leadingTitleLine("Isi\n\n# Nanti\n")).toBeUndefined();
    expect(leadingTitleLine("## Bagian\n")).toBeUndefined();
    expect(leadingTitleLine("#hashtag\n")).toBeUndefined();
    expect(leadingTitleLine("```text\n# bukan judul\n```\n")).toBeUndefined();
  });
});

describe("scanXml", () => {
  test("accepts a well-formed document with prolog, comment, CDATA and entities", () => {
    const scan = scanXml(
      `﻿<?xml version="1.0"?>\n<!-- komentar --><svg a='1' b="2"><g/><style><![CDATA[.a{fill:red}]]></style><text>a &amp; b &#65; &#x41;</text></svg>\n`,
    );
    expect(scan.error).toBeUndefined();
    expect(scan.elements.map((element) => element.name)).toEqual(["svg", "g", "style", "text"]);
    expect(scan.elements[0]?.attributes.get("b")).toBe("2");
    expect(scan.styleText.join("")).toContain(".a{fill:red}");
  });

  test.each([
    ["", "no root element"],
    ["hanya teks", "text outside the root element"],
    ["<a></b>", "does not match"],
    ["<a><b></a>", "does not match"],
    ["<a>", "is not closed"],
    ["<a/><b/>", "more than one root element"],
    ["<a/>teks", "text outside the root element"],
    ["<a x=1/>", "malformed start tag"],
    ['<a x="1" x="2"/>', "duplicate attribute"],
    ['<a x="&bogus;"/>', "illegal entity reference in attribute"],
    ["<a>&bogus;</a>", "illegal entity reference in text"],
    ["<a>x ]]> y</a>", '"]]>"'],
    ["<a><!-- tak selesai</a>", "unterminated comment"],
    ["<a><!-- a -- b --></a>", '"--" inside a comment'],
    ["<a><![CDATA[x</a>", "unterminated CDATA"],
    ["<a/><![CDATA[x]]>", "CDATA outside the root element"],
    ["<?xml version", "unterminated processing instruction"],
    ['<!DOCTYPE svg [<!ENTITY x "y">]><svg/>', "DOCTYPE"],
    ["<a></ a b>", "malformed closing tag"],
    ["<a <b/></a>", "malformed start tag"],
  ])("rejects %j", (xml, expected) => {
    const scan = scanXml(xml);
    expect(scan.error).toContain(expected);
  });
});

describe("svgProblems", () => {
  test("a clean drawing has no problems, and fragment references are allowed", () => {
    const clean = svg(
      '<defs><linearGradient id="g"/></defs><rect fill="url(#g)" style="stroke:url(#g)"/><use href="#a"/><use xlink:href="#a"/><style>.x{fill:url("#g")}</style>',
    );
    expect(svgProblems(clean)).toEqual([]);
  });

  test("not well-formed XML is reported once and stops further checks", () => {
    const problems = svgProblems("<svg viewBox='0 0 1 1'><g></svg>");
    expect(problems).toHaveLength(1);
    expect(problems[0]).toContain("not well-formed XML");
  });

  test("the root must be svg and carry a non-empty viewBox", () => {
    expect(svgProblems("<html/>")).toContain("root element is not <svg>");
    expect(svgProblems(svg("", ""))).toContain("root <svg> has no viewBox");
    expect(svgProblems(svg("", 'viewBox=" "'))).toContain("root <svg> has no viewBox");
    expect(svgProblems('<s:svg xmlns:s="x" viewBox="0 0 1 1"/>')).toEqual([]);
  });

  test.each([
    ["script", "<script>alert(1)</script>"],
    ["image", '<image width="1"/>'],
    ["foreignObject", "<foreignObject><p/></foreignObject>"],
    ["svg:script", "<svg:script/>"],
  ])("forbids the <%s> element", (name, inner) => {
    expect(
      svgProblems(svg(inner)).some((problem) => problem.includes(`forbidden element <${name}>`)),
    ).toBe(true);
  });

  test("forbids on* event attributes", () => {
    const problems = svgProblems(svg('<rect onclick="x()" onLoad="y()"/>'));
    expect(
      problems.filter((problem) => problem.includes("forbidden event attribute")),
    ).toHaveLength(2);
  });

  test("forbids href and xlink:href that leave the file", () => {
    const problems = svgProblems(
      svg(
        '<a href="https://contoh.test/x"/><use xlink:href="lain.svg#a"/><a href="javascript:x()"/>',
      ),
    );
    expect(problems.filter((problem) => problem.includes("leaves the file"))).toHaveLength(3);
  });

  test("forbids data: URIs in attributes and styles", () => {
    expect(
      svgProblems(svg('<a title="data:text/plain,x"/>')).some((p) => p.includes("data: URI")),
    ).toBe(true);
    expect(
      svgProblems(svg('<rect style="fill:url(data:image/png;base64,AA)"/>')).some((p) =>
        p.includes("data: URI"),
      ),
    ).toBe(true);
    expect(
      svgProblems(svg("<style>.a{background:data:x}</style>")).some((p) => p.includes("data: URI")),
    ).toBe(true);
  });

  test("forbids @import and non-fragment url() in <style>, style attributes and presentation attributes", () => {
    const style = svgProblems(svg('<style>@import "x.css"; .a{fill:url(http://x.test/a)}</style>'));
    expect(style.some((problem) => problem.includes("@import is not allowed"))).toBe(true);
    expect(style.some((problem) => problem.includes("url(http://x.test/a)"))).toBe(true);
    const attribute = svgProblems(svg("<rect style=\"fill:url('http://x.test/b')\"/>"));
    expect(attribute.some((problem) => problem.includes("style attribute on <rect>"))).toBe(true);
    const presentation = svgProblems(svg('<rect fill="url(lain.svg#g)"/>'));
    expect(presentation.some((problem) => problem.includes("fill on <rect>"))).toBe(true);
  });

  test("enforces the size limit using the given byte length", () => {
    expect(svgProblems(svg(""), MAX_SVG_BYTES)).toEqual([]);
    const problems = svgProblems(svg(""), MAX_SVG_BYTES + 1);
    expect(problems[0]).toContain("exceeds");
    expect(svgProblems(svg(`<!-- ${"x".repeat(MAX_SVG_BYTES)} -->`))[0]).toContain("exceeds");
  });
});

describe("extractImageLinks", () => {
  test("finds inline image links with line numbers, titles and angle brackets", () => {
    const markdown = [
      "# Lembar",
      '![kucing](../gambar/kucing.svg) dan ![](../gambar/b.svg "judul")',
      "[bukan gambar](x.svg)",
      "![c](<../gambar/c.svg>)",
    ].join("\n");
    expect(extractImageLinks(markdown)).toEqual([
      { line: 2, target: "../gambar/kucing.svg" },
      { line: 2, target: "../gambar/b.svg" },
      { line: 4, target: "../gambar/c.svg" },
    ]);
  });

  test("ignores links inside fenced code", () => {
    expect(extractImageLinks("```md\n![a](x.svg)\n```\n![b](y.svg)")).toEqual([
      { line: 4, target: "y.svg" },
    ]);
  });
});
