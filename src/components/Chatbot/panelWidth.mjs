export const DEFAULT_PANEL_WIDTH = 380;
export const MIN_PANEL_WIDTH = 280;
export const MAX_PANEL_FRACTION = 0.5;
export const PANEL_WIDTH_STORAGE_KEY = "docs-assistant-width";

export function clampPanelWidth(requestedPx, viewportWidthPx) {
  const requested = Number(requestedPx);
  const value = Number.isFinite(requested) ? requested : DEFAULT_PANEL_WIDTH;
  const viewport = Number(viewportWidthPx);
  const max = Math.max(
    MIN_PANEL_WIDTH,
    Math.floor((Number.isFinite(viewport) ? viewport : 0) * MAX_PANEL_FRACTION)
  );
  return Math.round(Math.min(Math.max(value, MIN_PANEL_WIDTH), max));
}
