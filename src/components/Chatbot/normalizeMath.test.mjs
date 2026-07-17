// Run with: node --test src/components/Chatbot/normalizeMath.test.mjs
import { test } from "node:test";
import assert from "node:assert/strict";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkMath from "remark-math";
import remarkGfm from "remark-gfm";
import katex from "katex";
import { normalizeMath } from "./normalizeMath.mjs";

const ddCount = (s) => (s.match(/\$\$/g) || []).length;

function mathNodes(src) {
  const processor = unified().use(remarkParse).use([remarkMath, remarkGfm]);
  const tree = processor.runSync(processor.parse(src));
  const out = [];
  (function walk(n) {
    if (n.type === "math" || n.type === "inlineMath") out.push(n);
    for (const c of n.children || []) walk(c);
  })(tree);
  return out;
}

function assertKatexOk(tex, display = true) {
  katex.renderToString(tex, {
    displayMode: display,
    throwOnError: true,
    strict: "ignore",
  });
}

test("truncated answer keeps $$ balanced and Sources outside math", () => {
  const input =
    "Row Addition:\n$$\\begin{pmatrix\n\n**Sources:**\n- [Mathematics 2](https://leklek.net/docs/uts/Mathematics/Mathematics-2)";
  const out = normalizeMath(input);
  assert.equal(ddCount(out) % 2, 0, "even number of $$ delimiters");
  assert.ok(out.includes("**Sources:**"));
  const nodes = mathNodes(out);
  for (const n of nodes) {
    assert.ok(!n.value.includes("Sources"), "Sources must not be inside math");
  }
});

test("well-formed multiline $$ blocks render with KaTeX", () => {
  const input =
    "Row Switching:\n$$\n\\begin{pmatrix} 0 & 1 \\\\ 1 & 0 \\end{pmatrix}\n$$\ndone";
  const out = normalizeMath(input);
  const nodes = mathNodes(out);
  assert.equal(nodes.length, 1);
  assertKatexOk(nodes[0].value);
});

test("single-line $$ matrix is rewritten to multiline display math", () => {
  const input =
    "Here: $$\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}$$ end";
  const out = normalizeMath(input);
  assert.match(out, /\$\$\n\\begin\{pmatrix\}/);
  assert.match(out, /\\end\{pmatrix\}\n\$\$/);
  const nodes = mathNodes(out);
  assert.equal(nodes[0].type, "math");
  assertKatexOk(nodes[0].value);
});

test("bare pmatrix gets wrapped in $$", () => {
  const input = "Here:\n\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}\nend";
  const out = normalizeMath(input);
  assert.match(
    out,
    /\$\$\n\\begin\{pmatrix\} a & b \\\\ c & d \\end\{pmatrix\}\n\$\$/
  );
  assert.equal(ddCount(out), 2);
});

test("two bare matrices separated by = wrap as one block", () => {
  const input =
    "\\begin{pmatrix} a \\\\ b \\end{pmatrix} = \\begin{pmatrix} c \\\\ d \\end{pmatrix}";
  const out = normalizeMath(input);
  assert.equal(ddCount(out), 2, "single display block");
  assert.ok(out.includes("= \\begin{pmatrix} c"));
});

test("single-\\ row separators become \\\\", () => {
  const input = "\\begin{bmatrix} 1 & 2 \\ 3 & 4 \\end{bmatrix}";
  const out = normalizeMath(input);
  assert.ok(out.includes("1 & 2 \\\\ 3 & 4"));
});

test("does not leave inline-$ matrix; promotes to display", () => {
  const input =
    "Visual reference: $\\begin{aligned} a &= b \\\\ c &= d \\end{aligned}$ done";
  const out = normalizeMath(input);
  assert.equal(ddCount(out), 2, "promoted to one $$ block");
  assert.ok(!/(?<!\$)\$\\begin/.test(out), "no inline-$ matrix left");
});

test("\\[..\\] and \\(..\\) delimiters convert", () => {
  const out = normalizeMath("\\[x^2\\] and \\(y_0\\)");
  assert.match(out, /\$\$\nx\^2\n\$\$/);
  assert.ok(out.includes("$y_0$"));
});

test("stray unpaired single $ is escaped, not left open", () => {
  const out = normalizeMath("Price is $5 and that is all");
  const masked = out.replace(/\$\$/g, "");
  const singles = (masked.match(/(?<!\\)\$/g) || []).length;
  assert.equal(singles % 2, 0);
});

test("screenshot: augmented matrix + Where + Sources stays clean", () => {
  const input = `The form of Augmented Matrices is:
$$\\begin{pmatrix} a_{11} & a_{12} & \\cdots & a_{1n} & | & b_1 \\\\ a_{21} & a_{22} & \\cdots & a_{2n} & | & b_2 \\\\ \\vdots & \\vdots & \\ddots & \\vdots & | & \\vdots \\\\ a_{m1} & a_{m2} & \\cdots & a_{mn} & | & b_m \\\\ \\end{pmatrix}$$ Where $a_{ij}$ are the coefficients of the linear system and $b_i$ are the constants.

**Sources:**
- https://leklek.net/docs/uts/Mathematics/Mathematics-2`;

  const out = normalizeMath(input);
  assert.ok(out.includes("**Sources:**"));
  assert.ok(out.includes("& \\mid &"), "pipes become \\mid");

  const nodes = mathNodes(out);
  assert.ok(nodes.some((n) => n.type === "math"));
  for (const n of nodes) {
    assert.ok(!/Sources|https:/.test(n.value), "Sources not inside math");
    assertKatexOk(n.value, n.type === "math");
  }
});

test("screenshot: hybrid $$ spanning lines (Gauss-Jordan) does not swallow Sources", () => {
  const input = `Steps:
$$\\begin{pmatrix} 1 & 2 \\\\ 3 & 4 \\end{pmatrix}
\\xrightarrow{R_1 \\leftrightarrow R_2}
\\begin{pmatrix} 3 & 4 \\\\ 1 & 2 \\end{pmatrix}$$
done $x$

**Sources:**
- https://leklek.net/docs/uts/Mathematics/Mathematics-2`;

  const out = normalizeMath(input);
  assert.ok(out.includes("**Sources:**"));

  const nodes = mathNodes(out);
  assert.ok(nodes.length >= 1);
  for (const n of nodes) {
    assert.ok(!/Sources|https:/.test(n.value), "Sources not inside math");
    assertKatexOk(n.value, n.type === "math");
  }
});

test("missing \\begin before \\end{pmatrix} is repaired", () => {
  const input =
    "$$a_{11} & a_{12} \\\\ a_{21} & a_{22} \\\\ \\end{pmatrix}$$\n\n**Sources:**\n- https://x";
  const out = normalizeMath(input);
  assert.ok(out.includes("\\begin{pmatrix}"));
  const nodes = mathNodes(out);
  for (const n of nodes) {
    assert.ok(!/Sources/.test(n.value));
    assertKatexOk(n.value, n.type === "math");
  }
});
