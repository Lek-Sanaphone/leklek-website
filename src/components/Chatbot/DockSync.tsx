import React from "react";
// @ts-ignore -- plain ESM module, shared with the node:test suite
import {
  clampPanelWidth,
  DEFAULT_PANEL_WIDTH,
  MIN_PANEL_WIDTH,
  MAX_PANEL_FRACTION,
  PANEL_WIDTH_STORAGE_KEY,
} from "./panelWidth.mjs";

function readStoredWidth() {
  try {
    const raw = sessionStorage.getItem(PANEL_WIDTH_STORAGE_KEY);
    return clampPanelWidth(
      raw == null ? Number.NaN : Number(raw),
      window.innerWidth
    );
  } catch {
    return clampPanelWidth(DEFAULT_PANEL_WIDTH, window.innerWidth);
  }
}

function writeStoredWidth(px) {
  try {
    sessionStorage.setItem(PANEL_WIDTH_STORAGE_KEY, String(px));
  } catch {}
}

function clickToggle() {
  const toggle = document.querySelector(".docs-assistant__toggle");
  if (toggle instanceof HTMLElement) toggle.click();
}

export default function DockSync() {
  const [open, setOpen] = React.useState(false);
  const [widthPx, setWidthPx] = React.useState(DEFAULT_PANEL_WIDTH);
  const [desktop, setDesktop] = React.useState(true);
  const [dragging, setDragging] = React.useState(false);
  const handleRef = React.useRef(null);
  const widthRef = React.useRef(widthPx);
  widthRef.current = widthPx;

  React.useEffect(() => {
    setWidthPx(readStoredWidth());
  }, []);

  React.useEffect(() => {
    const mq = window.matchMedia("(min-width: 997px)");
    const update = () => setDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  React.useEffect(() => {
    const syncOpen = () => {
      setOpen(Boolean(document.querySelector(".docs-assistant__window")));
    };
    syncOpen();
    const observer = new MutationObserver(syncOpen);
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);

  React.useEffect(() => {
    const root = document.documentElement;
    if (!open) {
      root.style.removeProperty("--docs-assistant-width");
      root.classList.remove("docs-assistant-resizing");
      return;
    }
    const apply = () => {
      if (window.innerWidth <= 996) {
        root.style.setProperty("--docs-assistant-width", "100%");
      } else {
        const next = clampPanelWidth(widthRef.current, window.innerWidth);
        root.style.setProperty("--docs-assistant-width", `${next}px`);
      }
    };
    apply();
    window.addEventListener("resize", apply);
    return () => window.removeEventListener("resize", apply);
  }, [open, widthPx]);

  React.useEffect(() => {
    document.documentElement.classList.toggle(
      "docs-assistant-resizing",
      dragging
    );
    if (!dragging) return undefined;

    const onMove = (e) => {
      const next = clampPanelWidth(
        window.innerWidth - e.clientX,
        window.innerWidth
      );
      widthRef.current = next;
      setWidthPx(next);
    };
    const onUp = () => {
      setDragging(false);
      writeStoredWidth(widthRef.current);
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, [dragging]);

  React.useEffect(() => {
    const el = handleRef.current;
    if (!el || !open || !desktop) return undefined;

    const onDown = (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (typeof e.pointerId === "number" && el.setPointerCapture) {
        try {
          el.setPointerCapture(e.pointerId);
        } catch {}
      }
      setDragging(true);
    };

    el.addEventListener("pointerdown", onDown);
    el.addEventListener("mousedown", onDown);
    return () => {
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("mousedown", onDown);
    };
  }, [open, desktop]);

  React.useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        clickToggle();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  if (!open) return null;

  const ariaMax = Math.max(
    MIN_PANEL_WIDTH,
    Math.floor(window.innerWidth * MAX_PANEL_FRACTION)
  );

  return (
    <>
      {desktop ? (
        <div
          ref={handleRef}
          className="docs-assistant__resize"
          role="separator"
          aria-orientation="vertical"
          aria-label="Resize docs assistant"
          aria-valuenow={widthPx}
          aria-valuemin={MIN_PANEL_WIDTH}
          aria-valuemax={ariaMax}
          tabIndex={0}
          title="Drag to resize"
          onKeyDown={(e) => {
            if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
            e.preventDefault();
            const delta = e.key === "ArrowLeft" ? 24 : -24;
            const next = clampPanelWidth(
              widthRef.current + delta,
              window.innerWidth
            );
            widthRef.current = next;
            setWidthPx(next);
            writeStoredWidth(next);
          }}
        />
      ) : null}
      <button
        type="button"
        className="docs-assistant__close"
        aria-label="Close docs assistant"
        style={{ position: "fixed", top: 12, right: 12, zIndex: 10001 }}
        onClick={clickToggle}
      >
        ✕
      </button>
    </>
  );
}
