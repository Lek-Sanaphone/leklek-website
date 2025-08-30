import React from "react";

const WORKER_CHAT_URL = "https://docusaurus-rag.lekjkboy2005.workers.dev/chat";

type Msg = { role: "user" | "assistant"; content: string };
type ChatResp = { answer?: string; sources?: unknown };

export default function Chatbot() {
  const [open, setOpen] = React.useState(false);
  const [msgs, setMsgs] = React.useState<Msg[]>([
    { role: "assistant", content: "Hi! Ask me about these docs." },
  ]);
  const [input, setInput] = React.useState("");
  const [busy, setBusy] = React.useState(false);

  async function send() {
    if (!input.trim() || busy) return;

    const question = input.trim();
    setMsgs((m) => [...m, { role: "user", content: question }]);
    setInput("");
    setBusy(true);

    try {
      const r = await fetch(WORKER_CHAT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });

      const data = (await r.json()) as ChatResp;

      // normalize & dedupe sources to string[]
      const sources: string[] = Array.isArray(data.sources)
        ? Array.from(new Set((data.sources as unknown[]).map(String)))
        : [];

      const srcBlock =
        sources.length > 0
          ? "\n\nSources:\n" + sources.map((s) => `• ${s}`).join("\n")
          : "";

      setMsgs((m) => [
        ...m,
        { role: "assistant", content: (data.answer || "…") + srcBlock },
      ]);
    } catch {
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

  return (
    <div className="docs-assistant">
      {open && (
        <div className="docs-assistant__window">
          <div className="docs-assistant__header">Docs Assistant</div>

          <div className="docs-assistant__body">
            {msgs.map((m, i) => (
              <div key={i} className="msg">
                <span className="role">{m.role === "user" ? "You" : "AI"}:</span>{" "}
                {m.content.split("\n").map((line, j) => (
                  <div key={j}>
                    {line.split(" ").map((word, k) => {
                      const isUrl = /^https?:\/\/\S+$/i.test(word);
                      return isUrl ? (
                        <a key={k} href={word} target="_blank" rel="noreferrer">
                          {word}
                        </a>
                      ) : (
                        <span key={k}>{(k ? " " : "") + word}</span>
                      );
                    })}
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div className="docs-assistant__inputRow">
            <input
              className="docs-assistant__input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder={busy ? "Thinking…" : "Type a question…"}
              disabled={busy}
            />
            <button
              className="docs-assistant__send"
              onClick={send}
              disabled={busy}
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
