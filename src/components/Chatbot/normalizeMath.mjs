// Normalizes model-emitted math so remark-math/KaTeX can render it.
//
// Critical invariant: display math MUST use $$ on their own lines.
// remark-math (micromark-extension-math) mishandles single-line or
// "opening $$ stuck to content" forms when the body spans lines — it
// can start a math region mid-formula and swallow trailing prose
// (including the Sources list), which then renders as one giant red
// katex-error block.

import katex from "katex";

const BARE_ENVS =
  "pmatrix|bmatrix|vmatrix|Bmatrix|matrix|smallmatrix|cases|aligned|align\\*?|array|gathered";

const ENV_BLOCK = new RegExp(
  String.raw`\\begin\{(${BARE_ENVS})\}[\s\S]*?\\end\{\1\}`,
  "g"
);

const CONNECTOR_GAP = new RegExp(
  String.raw`^\s*(?:=|\+|-|\\cdot|\\times|\\to|\\rightarrow|\\Rightarrow|\\Leftrightarrow|\\sim|\\approx|\\xrightarrow(?:\[[^\]]*\])?\{[^}]*\})?\s*$`
);

function fixRowSeparators(body) {
  return body.replace(/(?<!\\)\\(?=\s|$)(?!\\)/g, "\\\\");
}

/** Remove a trailing \\ immediately before \end{...}. */
function stripTrailingRowBreak(body) {
  return body.replace(/\\\\\s*(?=\\end\{)/g, "");
}

/** Prefer \mid for augmented-matrix bars between columns. */
function fixAugmentedBars(body) {
  return body.replace(/&\s*\|\s*&/g, "& \\mid &");
}

function repairEnvBody(body) {
  return fixAugmentedBars(stripTrailingRowBreak(fixRowSeparators(body)));
}

/**
 * If a $$ block has \end{env} but no matching \begin{env}, prepend one.
 * Matches the screenshot failure where the model drops the opening.
 */
function repairMissingBegins(body) {
  let out = body;
  const ends = [...out.matchAll(/\\end\{([a-zA-Z*]+)\}/g)];
  for (const m of ends) {
    const env = m[1];
    if (!new RegExp(String.raw`\\begin\{${env}\}`).test(out)) {
      out = `\\begin{${env}} ${out}`;
    }
  }
  return out;
}

function displayBlock(body) {
  const cleaned = repairMissingBegins(body).trim();
  return `\n$$\n${cleaned}\n$$\n`;
}

function wrapBareEnvs(segment) {
  const spans = [];
  let m;
  ENV_BLOCK.lastIndex = 0;
  while ((m = ENV_BLOCK.exec(segment))) {
    spans.push([m.index, ENV_BLOCK.lastIndex]);
  }
  if (spans.length === 0) return segment;

  const merged = [spans[0].slice()];
  for (let i = 1; i < spans.length; i++) {
    const prev = merged[merged.length - 1];
    const gap = segment.slice(prev[1], spans[i][0]);
    if (CONNECTOR_GAP.test(gap)) {
      prev[1] = spans[i][1];
    } else {
      merged.push(spans[i].slice());
    }
  }

  let out = "";
  let pos = 0;
  for (const [s, e] of merged) {
    const before = segment.slice(pos, s);
    const orphan = before.match(/\$\$\s*$/);
    const prefix = orphan
      ? before.slice(0, before.length - orphan[0].length)
      : before;
    out += prefix + displayBlock(segment.slice(s, e));
    pos = e;
  }
  return out + segment.slice(pos);
}

/**
 * Left-to-right scan that turns every $$...$$ region (including
 * single-line and hybrid forms) into a clean multiline display block,
 * and balances leftover $ / $$ so nothing stays open.
 */
function rewriteDisplayMath(text) {
  let out = "";
  let i = 0;
  while (i < text.length) {
    if (text[i] === "$" && text[i + 1] === "$") {
      const close = text.indexOf("$$", i + 2);
      if (close === -1) {
        // Orphan opening $$ — drop it (fail-safe).
        i += 2;
        continue;
      }
      const body = text.slice(i + 2, close);
      out += displayBlock(body);
      i = close + 2;
      continue;
    }

    if (text[i] === "$" && text[i - 1] !== "\\") {
      const nl = text.indexOf("\n", i + 1);
      const lineEnd = nl === -1 ? text.length : nl;
      const close = text.indexOf("$", i + 1);
      if (close !== -1 && close < lineEnd && text[close + 1] !== "$") {
        const body = text.slice(i + 1, close);
        if (/\\begin\{/.test(body)) {
          out += displayBlock(body);
        } else {
          out += `$${body}$`;
        }
        i = close + 1;
        continue;
      }
      // Unpaired or multi-line $ — escape so it can't open a region.
      out += "\\$";
      i += 1;
      continue;
    }

    out += text[i];
    i += 1;
  }
  return out;
}

/**
 * Validate each display block with KaTeX. On failure, unwrap to a fenced
 * code block so remark-math never creates a katex-error that paints
 * neighboring prose red.
 */
function sanitizeWithKatex(text) {
  return text.replace(/\$\$\n?([\s\S]*?)\n?\$\$/g, (_full, body) => {
    const trimmed = body.trim();
    if (!trimmed) return "";
    try {
      katex.renderToString(trimmed, {
        displayMode: true,
        throwOnError: true,
        strict: "ignore",
      });
      return displayBlock(trimmed);
    } catch {
      return `\n\`\`\`latex\n${trimmed}\n\`\`\`\n`;
    }
  });
}

/** Peel a trailing Sources section so math rewrites can't touch it. */
function splitSources(text) {
  const m = text.match(/\n\n\*\*Sources:\*\*[\s\S]*$/);
  if (!m) return { body: text, sources: "" };
  return {
    body: text.slice(0, m.index),
    sources: m[0],
  };
}

export function normalizeMath(text) {
  if (!text) return text;

  const { body, sources } = splitSources(text);

  let out = body
    .replace(/\\\[([\s\S]*?)\\\]/g, (_m, b) => displayBlock(b))
    .replace(/\\\(([\s\S]*?)\\\)/g, (_m, b) => `$${b}$`);

  out = out.replace(
    new RegExp(String.raw`\\begin\{(${BARE_ENVS})\}([\s\S]*?)\\end\{\1\}`, "g"),
    (_m, env, b) => `\\begin{${env}}${repairEnvBody(b)}\\end{${env}}`
  );

  out = rewriteDisplayMath(out);

  out = out
    .split(/(\$\$\n[\s\S]*?\n\$\$)/)
    .map((part, idx) => (idx % 2 === 0 ? wrapBareEnvs(part) : part))
    .join("");

  const ddCount = (out.match(/\$\$/g) || []).length;
  if (ddCount % 2 === 1) {
    const i = out.lastIndexOf("$$");
    out = out.slice(0, i) + out.slice(i + 2);
  }

  out = sanitizeWithKatex(out);

  return out + sources;
}
