import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
// @ts-ignore -- plain ESM module, shared with the node:test suite
import { normalizeMath } from "./normalizeMath.mjs";

const WORKER_CHAT_URL = "https://docusaurus-rag.lekjkboy2005.workers.dev/chat";

/** Example questions shown when the bot cannot answer from the notes. */
const DEFAULT_SUGGESTIONS = [
  "Show me The Trapezoidal Rule formula",
  "How to create a table in SQL",
  "Show me Elementary Row Operations",
  "What is Gauss-Jordan Elimination?",
];

type Msg = {
  role: "user" | "assistant";
  content: string;
  /** True while tokens are still arriving — render as plain text. */
  streaming?: boolean;
  /** Clickable example questions under the bubble. */
  suggestions?: string[];
};
type Source = { url: string; title?: string };

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

function looksLikeDontKnow(text: string): boolean {
  return /i don'?t know based on the available notes/i.test(text.trim());
}

function MarkdownMessage({ content }: { content: string }) {
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

function SuggestionChips({
  suggestions,
  disabled,
  onPick,
}: {
  suggestions: string[];
  disabled?: boolean;
  onPick: (q: string) => void;
}) {
  if (!suggestions.length) return null;
  return (
    <div className="msg__suggestions" role="group" aria-label="Suggested questions">
      {suggestions.map((q) => (
        <button
          key={q}
          type="button"
          className="msg__suggestion"
          disabled={disabled}
          onClick={() => onPick(q)}
        >
          {q}
        </button>
      ))}
    </div>
  );
}

async function readChatStream(
  body: ReadableStream<Uint8Array>,
  handlers: {
    onMeta: (sources: Source[], suggestions: string[]) => void;
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
          suggestions?: string[];
          error?: string;
        };
        try {
          event = JSON.parse(payload);
        } catch {
          continue;
        }

        if (event.type === "meta") {
          handlers.onMeta(
            Array.isArray(event.sources) ? event.sources : [],
            Array.isArray(event.suggestions) ? event.suggestions : []
          );
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
    {
      role: "assistant",
      content:
        "Hi! I'm the Docs Assistant — ask me about formulas and topics in these lecture notes.",
      suggestions: DEFAULT_SUGGESTIONS,
    },
  ]);
  const [input, setInput] = React.useState("");
  const [busy, setBusy] = React.useState(false);
  const bodyRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLTextAreaElement>(null);
  const abortRef = React.useRef<AbortController | null>(null);

  React.useEffect(() => {
    const el = inputRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 120)}px`;
  }, [input, open]);

  React.useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight });
  }, [msgs, open, busy]);

  React.useEffect(() => () => abortRef.current?.abort(), []);

  async function ask(questionRaw: string) {
    const question = questionRaw.trim();
    if (!question || busy) return;

    setMsgs((m) => [
      ...m,
      { role: "user", content: question },
      { role: "assistant", content: "", streaming: true },
    ]);
    setInput("");
    setBusy(true);

    const ctrl = new AbortController();
    abortRef.current = ctrl;

    let answer = "";
    let sources: Source[] = [];
    let suggestions: string[] = [];

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

      if (contentType.includes("text/event-stream")) {
        await readChatStream(
          r.body,
          {
            onMeta: (s, sug) => {
              sources = s;
              suggestions = sug;
            },
            onToken: (text) => {
              answer += text;
              patchLast({ content: answer, streaming: true });
            },
            onDone: () => {
              const srcBlock = formatSources(sources);
              let content = (answer || "…") + srcBlock;
              let chips = suggestions;

              // Legacy / model fallback text → friendly copy + chips
              if (looksLikeDontKnow(answer) || (!sources.length && !chips.length && looksLikeDontKnow(answer))) {
                content =
                  "I'm the **Docs Assistant** for these lecture notes. I answer from the study materials on this site.\n\nI couldn't find that in the notes. Try one of these instead:";
                chips = DEFAULT_SUGGESTIONS;
              } else if (!chips.length && looksLikeDontKnow(answer)) {
                chips = DEFAULT_SUGGESTIONS;
              } else if (
                !sources.length &&
                !chips.length &&
                /only answer from|couldn'?t find|not in (the )?(notes|context)/i.test(
                  answer
                )
              ) {
                chips = DEFAULT_SUGGESTIONS;
              }

              patchLast({
                content,
                streaming: false,
                suggestions: chips.length ? chips : undefined,
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

        setMsgs((m) => {
          const last = m[m.length - 1];
          if (last?.role === "assistant" && last.streaming) {
            const copy = [...m];
            const chips =
              suggestions.length > 0
                ? suggestions
                : looksLikeDontKnow(answer)
                  ? DEFAULT_SUGGESTIONS
                  : undefined;
            copy[copy.length - 1] = {
              ...last,
              content: (answer || last.content || "…") + formatSources(sources),
              streaming: false,
              suggestions: chips,
            };
            return copy;
          }
          return m;
        });
      } else {
        const data = (await r.json().catch(() => ({}))) as {
          answer?: string;
          sources?: Source[];
          suggestions?: string[];
          error?: string;
        };
        if (data.error) throw new Error(data.error);
        const text = data.answer || "…";
        const chips =
          data.suggestions ||
          (looksLikeDontKnow(text) ? DEFAULT_SUGGESTIONS : undefined);
        patchLast({
          content:
            (looksLikeDontKnow(text)
              ? "I'm the **Docs Assistant** for these lecture notes. I answer from the study materials on this site.\n\nI couldn't find that in the notes. Try one of these instead:"
              : text) + formatSources(data.sources || []),
          streaming: false,
          suggestions: chips,
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

  function send() {
    void ask(input);
  }

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
                    <>
                      {m.streaming ? (
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
                      )}
                      {!m.streaming && m.suggestions && (
                        <SuggestionChips
                          suggestions={m.suggestions}
                          disabled={busy}
                          onPick={(q) => void ask(q)}
                        />
                      )}
                    </>
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
        className={`docs-assistant__toggle${
          open ? " docs-assistant__toggle--open" : ""
        }`}
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close docs assistant" : "Open docs assistant"}
        aria-expanded={open}
      >
        <span className="docs-assistant__toggle-icon" aria-hidden="true">
          {open ? "✕" : "💬"}
        </span>
        {!open && (
          <span className="docs-assistant__toggle-label">Ask docs</span>
        )}
      </button>
    </div>
  );
}
