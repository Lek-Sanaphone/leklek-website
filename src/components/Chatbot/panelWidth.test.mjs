// Run with: node --test src/components/Chatbot/panelWidth.test.mjs
import { test } from "node:test";
import assert from "node:assert/strict";
import {
  clampPanelWidth,
  DEFAULT_PANEL_WIDTH,
  MIN_PANEL_WIDTH,
} from "./panelWidth.mjs";

test("uses default when requested width is not finite", () => {
  assert.equal(clampPanelWidth(NaN, 1200), DEFAULT_PANEL_WIDTH);
  assert.equal(clampPanelWidth(Infinity, 1200), DEFAULT_PANEL_WIDTH);
  assert.equal(clampPanelWidth("wide", 1200), DEFAULT_PANEL_WIDTH);
});

test("clamps below the minimum to 280", () => {
  assert.equal(clampPanelWidth(100, 1200), MIN_PANEL_WIDTH);
});

test("clamps above 50% of 1200px to 600", () => {
  assert.equal(clampPanelWidth(900, 1200), 600);
});

test("tiny viewport where 50% is below 280 returns 280", () => {
  assert.equal(clampPanelWidth(200, 400), MIN_PANEL_WIDTH);
});

test("rounds to the nearest integer", () => {
  assert.equal(clampPanelWidth(380.6, 1200), 381);
});
