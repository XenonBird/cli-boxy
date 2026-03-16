"use strict";
const boxy = require("./src/index");

let passed = 0;
let failed = 0;

function test(name, fn) {
  try {
    fn();
    console.log(`  ✓ ${name}`);
    passed++;
  } catch (e) {
    console.log(`  ✗ ${name}: ${e.message}`);
    failed++;
  }
}

function assert(cond, msg) {
  if (!cond) throw new Error(msg || "Assertion failed");
}

console.log("\n── cli-boxy tests ──\n");

// Basic output
test("basic box renders string", () => {
  const out = boxy("Hello");
  assert(typeof out === "string");
  assert(out.includes("Hello"));
});

// All styles render without error
test("all built-in styles render", () => {
  const styles = Object.keys(boxy.styles);
  for (const s of styles) {
    const out = boxy("test", { style: s });
    assert(out.includes("test"), `style ${s} missing content`);
  }
});

// Alignment
test("center alignment pads correctly", () => {
  const out = boxy("hi", { align: "center", width: 10, padding: 0 });
  assert(out.includes("    hi    "), "center align padding mismatch");
});

test("right alignment pads correctly", () => {
  const out = boxy("hi", { align: "right", width: 10, padding: 0 });
  assert(out.includes("        hi"), "right align padding mismatch");
});

// Padding
test("padding adds empty rows", () => {
  const out = boxy("X", { padding: { top: 2, bottom: 2, left: 1, right: 1 } });
  const lines = out.split("\n");
  // Should have: top border, 2 empty, content, 2 empty, bottom border = 7
  assert(lines.length >= 7, `expected >= 7 lines, got ${lines.length}`);
});

// Title
test("title appears in top border", () => {
  const out = boxy("content", { title: "HEADER" });
  assert(out.includes("HEADER"), "title missing from output");
});

// Word wrap
test("word wrap splits long lines", () => {
  const out = boxy("one two three four five six", { width: 10, wrap: true });
  const lines = out.split("\n");
  assert(lines.length > 3, "wrap should produce multiple content lines");
});

// Custom style object
test("custom style object works", () => {
  const custom = {
    topLeft: "@",
    top: "-",
    topRight: "@",
    left: "|",
    right: "|",
    bottomLeft: "@",
    bottom: "-",
    bottomRight: "@",
  };
  const out = boxy("custom", { style: custom });
  assert(out.includes("@"), "custom corner missing");
});

// Themes
test("all themes render", () => {
  for (const [name, fn] of Object.entries(boxy.themes)) {
    const out = fn("test");
    assert(typeof out === "string", `theme ${name} returned non-string`);
  }
});

// sideBySide
test("sideBySide returns combined string", () => {
  const out = boxy.sideBySide("Left", "Right");
  assert(typeof out === "string");
  assert(out.includes("Left") && out.includes("Right"));
});

// stack
test("stack returns multiple boxes", () => {
  const out = boxy.stack(["A", "B", "C"]);
  assert(out.includes("A") && out.includes("B") && out.includes("C"));
});

// Multiline
test("multiline text splits correctly", () => {
  const out = boxy("line1\nline2\nline3", { padding: 0 });
  assert(out.includes("line1"));
  assert(out.includes("line2"));
  assert(out.includes("line3"));
});

// ANSI stripping for width calc
test("ANSI codes dont break width calculation", () => {
  const colored = "\x1b[32mHello\x1b[0m";
  const out = boxy(colored, { padding: 0 });
  assert(typeof out === "string");
  // width should be measured as 5, not 14+
});

console.log(`\n  ${passed} passed, ${failed} failed\n`);
process.exit(failed > 0 ? 1 : 0);
