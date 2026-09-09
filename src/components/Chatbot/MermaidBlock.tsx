import React from "react";

type Props = { chart: string };

let mermaidSeq = 0;

function useHtmlColorMode(): "light" | "dark" {
  const [mode, setMode] = React.useState<"light" | "dark">("light");
  React.useEffect(() => {
    const root = document.documentElement;
    const read = (): "light" | "dark" =>
      root.getAttribute("data-theme") === "dark" ? "dark" : "light";
    setMode(read());
    const obs = new MutationObserver(() => setMode(read()));
    obs.observe(root, { attributes: true, attributeFilter: ["data-theme"] });
    return () => obs.disconnect();
  }, []);
  return mode;
}

/** Renders a mermaid chart after mount. Chatbot lives outside ThemeProvider. */
export default function MermaidBlock({ chart }: Props) {
  const [svg, setSvg] = React.useState<string | null>(null);
  const [failed, setFailed] = React.useState(false);
  const colorMode = useHtmlColorMode();

  React.useEffect(() => {
    let cancelled = false;
    const id = `chat-mermaid-${++mermaidSeq}`;
    setSvg(null);
    setFailed(false);

    (async () => {
      try {
        const { default: mermaid } = await import("mermaid");
        mermaid.initialize({
          startOnLoad: false,
          theme: colorMode === "dark" ? "forest" : "neutral",
        });
        const { svg: rendered } = await mermaid.render(id, chart);
        if (!cancelled) setSvg(rendered);
      } catch {
        document.querySelector(`#d${id}`)?.remove();
        if (!cancelled) setFailed(true);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [chart, colorMode]);

  if (failed) {
    return (
      <pre>
        <code className="language-mermaid">{chart}</code>
      </pre>
    );
  }

  if (!svg) {
    return (
      <div className="msg__mermaid msg__mermaid--loading" aria-busy="true">
        Drawing diagram…
      </div>
    );
  }

  return (
    <div
      className="msg__mermaid"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
