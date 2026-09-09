import React from "react";
import OriginalMermaid from "@theme-original/Mermaid";

/**
 * Keep mermaid source in the SSR HTML so the docs indexer can store it.
 * The original component draws the diagram in the browser only.
 */
export default function Mermaid(props) {
  const source = typeof props?.value === "string" ? props.value : "";
  return (
    <>
      {source ? (
        <pre className="docs-mermaid-source" hidden>
          {source}
        </pre>
      ) : null}
      <OriginalMermaid {...props} />
    </>
  );
}
