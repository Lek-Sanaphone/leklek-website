import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
// @ts-ignore -- plain ESM module, shared with the node:test suite
import { normalizeMath } from "./normalizeMath.mjs";

const WORKER_CHAT_URL = "https://docusaurus-rag.lekjkboy2005.workers.dev/chat";

type Msg = {
  role: "user" | "assistant";
  content: string;
  /** True while tokens are still arriving — render as plain text. */
  streaming?: boolean;
};
type Source = { url: string; title?: string };

// Contain KaTeX failures: a bad formula renders as red raw TeX instead of
// throwing and breaking the rest of the message.
const KATEX_OPTIONS = {
  throwOnError: false,
  strict: false,
  errorColor: "#cc0000",
};

function formatSources(sources: Source[]): string {
  const links = Array.from(
    new Set(
      sources
        .map((s) => {
          if (s?.title && s?.url) return `[${s.title}](${s.url})`;
          return s?.url;
        })
        .filter(Boolean) as string[]
    )
  );
  if (links.length === 0) return "";
  return "\n\n**Sources:**\n" + links.map((s) => `- ${s}`).join("\n");
}

// Render an assistant message as Markdown (bold, italics, lists, code,
// headings, tables, links, LaTeX math). Links always open in a new tab.
function MarkdownMessage({ content }: { content: string }) {
  // remarkMath MUST run before remarkGfm. GFM table parsing treats `|`
  // as column markers and can corrupt augmented matrices if it runs first.
  return (
    <div className="msg__markdown">
      <ReactMarkdown
        remarkPlugins={[remarkMath, remarkGfm]}
        rehypePlugins={[[rehypeKatex, KATEX_OPTIONS]]}
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

/**
 * Read an SSE body from /chat and invoke callbacks for meta / token / done.
 * Protocol: data: {"type":"meta"|"token"|"done"|"error", ...}
 */
async function readChatStream(
  body: ReadableStream<Uint8Array>,
  handlers: {
    onMeta: (sources: Source[]) => void;
    onToken: (text: string) => void;
    onDone: () => void;
    onError: (message: string) => void;
  },
  signal?: AbortSignal
) {
  const reader = body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  const abort = () => {
    try {
      reader.cancel();
    } catch {}
  };
  signal?.addEventListener("abort", abort, { once: true });

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n");
      buffer = lines.pop() ?? "";

      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed.startsWith("data:")) continue;
        const payload = trimmed.slice(5).trim();
        if (!payload || payload === "[DONE]") continue;

        let event: {
          type?: string;
          text?: string;
          sources?: Source[];
          error?: string;
        };
        try {
          event = JSON.parse(payload);
        } catch {
          continue;
        }

        if (event.type === "meta") {
          handlers.onMeta(Array.isArray(event.sources) ? event.sources : []);
        } else if (event.type === "token" && typeof event.text === "string") {
          handlers.onToken(event.text);
        } else if (event.type === "done") {
          handlers.onDone();
        } else if (event.type === "error") {
          handlers.onError(event.error || "Stream failed.");
        }
      }
    }
  } finally {
    signal?.removeEventListener("abort", abort);
  }
}

export default function Chatbot() {
  const [open, setOpen] = React.useState(false);
  // Wide mode gives big formulas more room; persisted for the session.
  const [wide, setWide] = React.useState(false);
  React.useEffect(() => {
    try {
      setWide(sessionStorage.getItem("docs-assistant-wide") === "1");
    } catch {}
  }, []);
  function toggleWide() {
    setWide((w) => {
      try {
        sessionStorage.setItem("docs-assistant-wide", w ? "0" : "1");
      } catch {}
      return !w;
    });
  }
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
    setMsgs((m) => [
      ...m,
      { role: "user", content: question },
      // Placeholder assistant bubble — tokens append here as they arrive.
      { role: "assistant", content: "", streaming: true },
    ]);
    setInput("");
    setBusy(true);

    const ctrl = new AbortController();
    abortRef.current = ctrl;

    let answer = "";
    let sources: Source[] = [];

    const patchLast = (patch: Partial<Msg>) => {
      setMsgs((m) => {
        const copy = [...m];
        const last = copy[copy.length - 1];
        if (last?.role === "assistant") {
          copy[copy.length - 1] = { ...last, ...patch };
        }
        return copy;
      });
    };

    try {
      const r = await fetch(WORKER_CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "text/event-stream",
        },
        body: JSON.stringify({ question }),
        signal: ctrl.signal,
      });

      if (!r.ok) {
        const errBody = (await r.json().catch(() => ({}))) as {
          error?: string;
        };
        throw new Error(errBody.error || `Request failed (${r.status})`);
      }

      if (!r.body) throw new Error("Empty response body");

      const contentType = r.headers.get("content-type") || "";

      // Streaming path (SSE)
      if (contentType.includes("text/event-stream")) {
        await readChatStream(
          r.body,
          {
            onMeta: (s) => {
              sources = s;
            },
            onToken: (text) => {
              answer += text;
              patchLast({ content: answer, streaming: true });
            },
            onDone: () => {
              const srcBlock = formatSources(sources);
              patchLast({
                content: (answer || "…") + srcBlock,
                streaming: false,
              });
            },
            onError: (message) => {
              patchLast({
                content: message || "Sorry, I couldn’t reach the assistant.",
                streaming: false,
              });
            },
          },
          ctrl.signal
        );

        // If the stream closed without a done event, finalize anyway.
        setMsgs((m) => {
          const last = m[m.length - 1];
          if (last?.role === "assistant" && last.streaming) {
            const copy = [...m];
            copy[copy.length - 1] = {
              ...last,
              content: (answer || last.content || "…") + formatSources(sources),
              streaming: false,
            };
            return copy;
          }
          return m;
        });
      } else {
        // Legacy JSON fallback (older worker deploy)
        const data = (await r.json().catch(() => ({}))) as {
          answer?: string;
          sources?: Source[];
          error?: string;
        };
        if (data.error) throw new Error(data.error);
        patchLast({
          content: (data.answer || "…") + formatSources(data.sources || []),
          streaming: false,
        });
      }
    } catch (err) {
      if ((err as Error)?.name === "AbortError") return;
      patchLast({
        content: "Sorry, I couldn’t reach the assistant.",
        streaming: false,
      });
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

  const lastStreaming =
    msgs.length > 0 &&
    msgs[msgs.length - 1].role === "assistant" &&
    msgs[msgs.length - 1].streaming;

  return (
    <div className="docs-assistant">
      {open && (
        <div
          className={`docs-assistant__window${
            wide ? " docs-assistant__window--wide" : ""
          }`}
        >
          <div className="docs-assistant__header">
            <span>Docs Assistant</span>
            <button
              className="docs-assistant__expand"
              onClick={toggleWide}
              aria-label={wide ? "Shrink panel" : "Expand panel"}
              title={wide ? "Shrink panel" : "Expand panel"}
            >
              {wide ? "⇲" : "⇱"}
            </button>
          </div>

          <div className="docs-assistant__body" ref={bodyRef} aria-live="polite">
            {msgs.map((m, i) => (
              <div key={i} className={`msg msg--${m.role}`}>
                <div className="msg__bubble">
                  {m.role === "assistant" ? (
                    m.streaming ? (
                      <div className="msg__streaming">
                        {m.content || (
                          <span className="msg__bubble--typing">
                            <span></span>
                            <span></span>
                            <span></span>
                          </span>
                        )}
                        {m.content ? (
                          <span className="msg__cursor" aria-hidden="true" />
                        ) : null}
                      </div>
                    ) : (
                      <MarkdownMessage content={m.content} />
                    )
                  ) : (
                    m.content
                  )}
                </div>
              </div>
            ))}

            {busy && !lastStreaming && (
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
