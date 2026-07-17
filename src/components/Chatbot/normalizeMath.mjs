// Normalizes model-emitted math so remark-math/KaTeX can render it, and
// guarantees delimiters stay balanced so a malformed or truncated formula
// can never swallow trailing content (e.g. the Sources list).

// Environments the model emits bare (outside $/$$) that should become
// display math.
const BARE_ENVS = "pmatrix|bmatrix|vmatrix|Bmatrix|matrix|smallmatrix|cases|aligned|align\\*?|array|gathered";

// A \begin{env}...\end{env} block with matching names (tolerates nested
// blocks of a *different* environment, e.g. bmatrix inside aligned).
const ENV_BLOCK = new RegExp(
  String.raw`\\begin\{(${BARE_ENVS})\}[\s\S]*?\\end\{\1\}`,
  "g"
);

// Connectors that may join two environments into one formula, e.g.
// A = B, or A \xrightarrow{2R_1-R_2} B.
const CONNECTOR_GAP = new RegExp(
  String.raw`^\s*(?:=|\+|-|\\cdot|\\times|\\to|\\rightarrow|\\Rightarrow|\\Leftrightarrow|\\sim|\\approx|\\xrightarrow(?:\[[^\]]*\])?\{[^}]*\})?\s*$`
);

// Inside an environment body, turn a lone row-separator backslash
// (single \ before whitespace/EOL) into \\. Leaves \\, commands (\alpha)
// and spacing commands (\,) alone.
function fixRowSeparators(body) {
  return body.replace(/(?<!\\)\\(?=\s|$)(?!\\)/g, "\\\\");
}

// Wrap bare environment chains found in a non-math segment in $$...$$.
function wrapBareEnvs(segment) {
  const spans = [];
  let m;
  ENV_BLOCK.lastIndex = 0;
  while ((m = ENV_BLOCK.exec(segment))) {
    spans.push([m.index, ENV_BLOCK.lastIndex]);
  }
  if (spans.length === 0) return segment;

  // Merge consecutive spans joined only by a connector (or whitespace)
  // so "A = B" wraps as one display block.
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
    out += segment.slice(pos, s) + "\n$$\n" + segment.slice(s, e) + "\n$$\n";
    pos = e;
  }
  return out + segment.slice(pos);
}

// Drop/escape unpaired delimiters so math regions always terminate.
// Fail-safe: malformed math degrades to plain text instead of an open
// region that eats the rest of the message.
function balanceDelimiters(text) {
  // If the count of $$ tokens is odd, the last one is an orphan
  // (sequential pairing) — drop it.
  const ddCount = (text.match(/\$\$/g) || []).length;
  if (ddCount % 2 === 1) {
    const i = text.lastIndexOf("$$");
    text = text.slice(0, i) + text.slice(i + 2);
  }

  // Single $: mask $$ pairs, then if the unescaped $ count is odd, escape
  // the last one so it renders as a literal dollar sign.
  const masked = text.replace(/\$\$/g, "  ");
  const singles = [...masked.matchAll(/(?<!\\)\$/g)];
  if (singles.length % 2 === 1) {
    const i = singles[singles.length - 1].index;
    text = text.slice(0, i) + "\\$" + text.slice(i + 1);
  }
  return text;
}

export function normalizeMath(text) {
  // 1) Convert alternative delimiters to $/$$.
  let out = text
    .replace(/\\\[([\s\S]*?)\\\]/g, (_m, body) => `\n$$\n${body}\n$$\n`)
    .replace(/\\\(([\s\S]*?)\\\)/g, (_m, body) => `$${body}$`);

  // 2) Fix single-\ row separators inside environment bodies (applies
  // whether or not the env is already inside $$).
  out = out.replace(
    new RegExp(String.raw`\\begin\{(${BARE_ENVS})\}([\s\S]*?)\\end\{\1\}`, "g"),
    (_m, env, body) => `\\begin{${env}}${fixRowSeparators(body)}\\end{${env}}`
  );

  // 3) Wrap bare environments in $$, but only outside existing math
  // regions (no double-wrapping). Inline $...$ that contains a matrix or
  // system environment is promoted to display math — inline KaTeX cannot
  // scroll, so huge inline formulas would overflow the chat bubble.
  out = out
    .split(/(\$\$[\s\S]*?\$\$|(?<!\\)\$[^$\n]+(?<!\\)\$)/)
    .map((part, i) => {
      if (i % 2 === 0) return wrapBareEnvs(part);
      if (!part.startsWith("$$") && /\\begin\{/.test(part)) {
        return `\n$$\n${part.slice(1, -1)}\n$$\n`;
      }
      return part;
    })
    .join("");

  // 4) Guarantee balanced delimiters (handles truncated model output).
  return balanceDelimiters(out);
}
