// Run with: node --test src/components/Chatbot/normalizeMath.test.mjs
import { test } from "node:test";
import assert from "node:assert/strict";
import { normalizeMath } from "./normalizeMath.mjs";

const ddCount = (s) => (s.match(/\$\$/g) || []).length;

test("truncated answer keeps $$ balanced and Sources outside math", () => {
  // Real failure mode: model output cut off right after an opening $$.
  const input =
    "Row Addition:\n$$\\begin{pmatrix\n\n**Sources:**\n- [Mathematics 2](https://leklek.net/docs/uts/Mathematics/Mathematics-2)";
  const out = normalizeMath(input);
  assert.equal(ddCount(out) % 2, 0, "even number of $$ delimiters");
  // The orphan $$ is dropped, so Sources is not inside a math region.
  const lastMathEnd = out.lastIndexOf("$$");
  assert.ok(out.indexOf("**Sources:**") > lastMathEnd);
});

test("well-formed $$ blocks pass through untouched", () => {
  const input =
    "Row Switching:\n$$\\begin{pmatrix} 0 & 1 \\\\ 1 & 0 \\end{pmatrix} = \\begin{pmatrix} c & d \\\\ a & b \\end{pmatrix}$$\ndone";
  const out = normalizeMath(input);
  assert.equal(out, input);
});

test("bare pmatrix gets wrapped in $$", () => {
  const input = "Here:\n\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}\nend";
  const out = normalizeMath(input);
  assert.match(out, /\$\$\n\\begin\{pmatrix\} a & b \\\\ c & d \\end\{pmatrix\}\n\$\$/);
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

test("does not double-wrap envs already inside $$ or touch inline $", () => {
  const input =
    "Inline $R_i \\leftrightarrow R_j$ and\n$$\\begin{bmatrix} 1 \\\\ 2 \\end{bmatrix}$$";
  const out = normalizeMath(input);
  assert.equal(ddCount(out), 2);
  assert.ok(out.includes("$R_i \\leftrightarrow R_j$"));
});

test("\\[..\\] and \\(..\\) delimiters convert", () => {
  const out = normalizeMath("\\[x^2\\] and \\(y_0\\)");
  assert.match(out, /\$\$\nx\^2\n\$\$/);
  assert.ok(out.includes("$y_0$"));
});

test("inline $ containing an environment is promoted to display math", () => {
  const input =
    "Visual reference: $\\begin{aligned} a &= b \\\\ c &= d \\end{aligned}$ done";
  const out = normalizeMath(input);
  assert.equal(ddCount(out), 2, "promoted to one $$ block");
  assert.ok(!/(?<!\$)\$\\begin/.test(out), "no inline-$ matrix left");
});

test("stray unpaired single $ is escaped, not left open", () => {
  const out = normalizeMath("Price is $5 and that is all");
  const masked = out.replace(/\$\$/g, "");
  const singles = (masked.match(/(?<!\\)\$/g) || []).length;
  assert.equal(singles % 2, 0);
});
