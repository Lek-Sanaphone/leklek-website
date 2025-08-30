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

      // Coerce unknown → string[], then dedupe
      const sources: string[] = Array.isArray(data.sources)
        ? Array.from(new Set((data.sources as unknown[]).map(String)))
        : [];

      const srcs = sources.length
        ? "\n\nSources:\n" + sources.map((s) => `• ${s}`).join("\n")
        : "";

      setMsgs((m) => [
        ...m,
        { role: "assistant", content: (data.answer || "…") + srcs },
      ]);
    } catch {
      setMsgs((m) => [
        ...m,
        { role: "assistant", content: "Sorry, I couldn’t reach the assistant." },
      ]);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div style={{ position: "fixed", right: 16, bottom: 16, zIndex: 9999 }}>
      {open && (
        <div
          style={{
            width: 360,
            height: 520,
            background: "#fff",
            border: "1px solid #ddd",
            borderRadius: 12,
            overflow: "hidden",
            boxShadow: "0 6px 24px rgba(0,0,0,.12)",
          }}
        >
          <div style={{ padding: 12, borderBottom: "1px solid #eee", fontWeight: 600 }}>
            Docs Assistant
          </div>
          <div
            style={{
              padding: 12,
              height: 400,
              overflow: "auto",
              fontSize: 14,
              whiteSpace: "pre-wrap",
              lineHeight: 1.4,
            }}
          >
            {msgs.map((m, i) => (
              <div key={i} style={{ margin: "8px 0" }}>
                <b>{m.role === "user" ? "You" : "AI"}:</b>{" "}
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
          <div style={{ display: "flex", gap: 8, padding: 12, borderTop: "1px solid #eee" }}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder={busy ? "Thinking…" : "Type a question…"}
              style={{ flex: 1 }}
              disabled={busy}
            />
            <button onClick={send} disabled={busy}>
              Send
            </button>
          </div>
        </div>
      )}
      <button onClick={() => setOpen((v) => !v)} style={{ borderRadius: 999, padding: "10px 14px" }}>
        💬
      </button>
    </div>
  );
}
