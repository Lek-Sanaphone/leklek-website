import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

const WORKER_CHAT_URL = "https://docusaurus-rag.lekjkboy2005.workers.dev/chat";

type Msg = { role: "user" | "assistant"; content: string };
type Source = { url: string; title?: string };
type ChatResp = { answer?: string; sources?: Source[]; error?: string };

// The model sometimes emits LaTeX with \[...\]/\(...\) delimiters or bare
// \begin{...}...\end{...} environments, which remark-math doesn't pick up.
// Normalize everything to $/$$ delimiters so KaTeX renders it.
function normalizeMath(text: string): string {
  return text
    .replace(/\\\[([\s\S]*?)\\\]/g, (_m, body) => `\n$$\n${body}\n$$\n`)
    .replace(/\\\(([\s\S]*?)\\\)/g, (_m, body) => `$${body}$`)
    .replace(
      /(^|[^$\\])(\\begin\{([a-zA-Z*]+)\}[\s\S]*?\\end\{\3\})/g,
      (_m, pre, body) => `${pre}\n$$\n${body}\n$$\n`
    );
}

// Render an assistant message as Markdown (bold, italics, lists, code,
// headings, tables, links, LaTeX math). Links always open in a new tab.
function MarkdownMessage({ content }: { content: string }) {
  return (
    <div className="msg__markdown">
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeKatex]}
        components={{
          a: ({ node, ...props }) => (
            <a {...props} target="_blank" rel="noreferrer" />
          ),
        }}
      >
        {normalizeMath(content)}
      </ReactMarkdown>
    </div>
  );
}

export default function Chatbot() {
  const [open, setOpen] = React.useState(false);
  const [msgs, setMsgs] = React.useState<Msg[]>([
    { role: "assistant", content: "Hi! Ask me about these docs." },
  ]);
  const [input, setInput] = React.useState("");
  const [busy, setBusy] = React.useState(false);
  const bodyRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLTextAreaElement>(null);
  const abortRef = React.useRef<AbortController | null>(null);

  // Grow the textarea with its content (up to the CSS max-height) and
  // shrink it back when cleared.
  React.useEffect(() => {
    const el = inputRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 120)}px`;
  }, [input, open]);

  // Auto-scroll to the newest message.
  React.useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight });
  }, [msgs, open, busy]);

  // Cancel any in-flight request on unmount.
  React.useEffect(() => () => abortRef.current?.abort(), []);

  async function send() {
    if (!input.trim() || busy) return;

    const question = input.trim();
    setMsgs((m) => [...m, { role: "user", content: question }]);
    setInput("");
    setBusy(true);

    const ctrl = new AbortController();
    abortRef.current = ctrl;

    try {
      const r = await fetch(WORKER_CHAT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
        signal: ctrl.signal,
      });

      const data = (await r.json().catch(() => ({}))) as ChatResp;

      if (!r.ok || data.error) {
        throw new Error(data.error || `Request failed (${r.status})`);
      }

      // Normalize & dedupe sources into Markdown links so they render
      // as a clean, clickable list.
      const sources: string[] = Array.isArray(data.sources)
        ? Array.from(
            new Set(
              data.sources
                .map((s) => {
                  if (typeof s === "string") return s;
                  if (s?.title && s?.url) return `[${s.title}](${s.url})`;
                  return s?.url;
                })
                .filter(Boolean) as string[]
            )
          )
        : [];

      const srcBlock =
        sources.length > 0
          ? "\n\n**Sources:**\n" + sources.map((s) => `- ${s}`).join("\n")
          : "";

      setMsgs((m) => [
        ...m,
        { role: "assistant", content: (data.answer || "…") + srcBlock },
      ]);
    } catch (err) {
      if ((err as Error)?.name === "AbortError") return;
      setMsgs((m) => [
        ...m,
        {
          role: "assistant",
          content: "Sorry, I couldn’t reach the assistant.",
        },
      ]);
    } finally {
      setBusy(false);
    }
  }

  // Enter sends, Shift+Enter inserts a newline. Ignore Enter while an
  // IME composition is in progress so it confirms the text instead.
  function onKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.preventDefault();
      send();
    }
  }

  return (
    <div className="docs-assistant">
      {open && (
        <div className="docs-assistant__window">
          <div className="docs-assistant__header">Docs Assistant</div>

          <div className="docs-assistant__body" ref={bodyRef} aria-live="polite">
            {msgs.map((m, i) => (
              <div key={i} className={`msg msg--${m.role}`}>
                <div className="msg__bubble">
                  {m.role === "assistant" ? (
                    <MarkdownMessage content={m.content} />
                  ) : (
                    m.content
                  )}
                </div>
              </div>
            ))}

            {busy && (
              <div className="msg msg--assistant">
                <div className="msg__bubble msg__bubble--typing">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}
          </div>

          <div className="docs-assistant__inputRow">
            <textarea
              ref={inputRef}
              className="docs-assistant__input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder={busy ? "Thinking…" : "Type a question…"}
              rows={1}
              disabled={busy}
            />
            <button
              className="docs-assistant__send"
              onClick={send}
              disabled={busy || !input.trim()}
            >
              Send
            </button>
          </div>
        </div>
      )}

      <button
        className="docs-assistant__toggle"
        onClick={() => setOpen((v) => !v)}
        aria-label="Toggle docs assistant"
      >
        💬
      </button>
    </div>
  );
}
