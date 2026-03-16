"use strict";
const boxy = require("./src/index");

const divider = () => console.log("\n" + "─".repeat(50) + "\n");

// ─────────────────────────────────────────────
//  HEADER
// ─────────────────────────────────────────────
console.log(
  boxy("cli-boxy  examples.js", {
    style: "double",
    align: "center",
    borderColor: "brightCyan",
    textColor: "brightCyan",
    padding: { top: 1, bottom: 1, left: 6, right: 6 },
    float: "center",
  }),
);

// ─────────────────────────────────────────────
//  1. BASIC
// ─────────────────────────────────────────────
divider();
console.log("  1. BASIC\n");

console.log(boxy("Hello, World!"));

console.log(boxy("Zero padding", { padding: 0 }));

console.log(
  boxy("Custom padding", {
    padding: { top: 2, bottom: 2, left: 4, right: 4 },
  }),
);

// ─────────────────────────────────────────────
//  2. ALL STYLES
// ─────────────────────────────────────────────
divider();
console.log("  2. ALL STYLES\n");

for (const name of Object.keys(boxy.styles)) {
  console.log(
    boxy(name, {
      style: name,
      padding: { top: 0, bottom: 0, left: 1, right: 1 },
    }),
  );
}

// ─────────────────────────────────────────────
//  3. CUSTOM STYLE OBJECT
// ─────────────────────────────────────────────
divider();
console.log("  3. CUSTOM STYLE OBJECT\n");

console.log(
  boxy("Custom chars", {
    style: {
      topLeft: "★",
      top: "·",
      topRight: "★",
      left: "·",
      right: "·",
      bottomLeft: "★",
      bottom: "·",
      bottomRight: "★",
    },
    padding: { top: 0, bottom: 0, left: 2, right: 2 },
  }),
);

console.log(
  boxy("Emoji border", {
    style: {
      topLeft: "🌸",
      top: "~",
      topRight: "🌸",
      left: "~",
      right: "~",
      bottomLeft: "🌸",
      bottom: "~",
      bottomRight: "🌸",
    },
    padding: { top: 0, bottom: 0, left: 2, right: 2 },
  }),
);

// ─────────────────────────────────────────────
//  4. ALIGNMENT
// ─────────────────────────────────────────────
divider();
console.log("  4. ALIGNMENT\n");

for (const align of ["left", "center", "right"]) {
  console.log(boxy(`align: "${align}"`, { align, width: 28, style: "round" }));
}

// ─────────────────────────────────────────────
//  5. COLORS
// ─────────────────────────────────────────────
divider();
console.log("  5. COLORS\n");

const colorList = [
  "red",
  "green",
  "yellow",
  "blue",
  "magenta",
  "cyan",
  "white",
  "gray",
  "brightRed",
  "brightGreen",
  "brightYellow",
  "brightBlue",
  "brightMagenta",
  "brightCyan",
];

for (const color of colorList) {
  console.log(
    boxy(color, {
      style: "round",
      borderColor: color,
      textColor: color,
      padding: { top: 0, bottom: 0, left: 1, right: 1 },
    }),
  );
}

// ─────────────────────────────────────────────
//  6. COMBINED TEXT + BORDER COLORS
// ─────────────────────────────────────────────
divider();
console.log("  6. COMBINED TEXT + BORDER COLORS\n");

console.log(
  boxy("cyan border, yellow text", {
    style: "bold",
    borderColor: "cyan",
    textColor: "brightYellow",
    padding: { top: 0, bottom: 0, left: 1, right: 1 },
  }),
);

console.log(
  boxy("Bold + Red text", {
    style: "single",
    textColor: ["bold", "red"],
    padding: { top: 0, bottom: 0, left: 1, right: 1 },
  }),
);

console.log(
  boxy("Dim gray border", {
    style: "single",
    borderColor: ["dim", "gray"],
    textColor: "white",
    padding: { top: 0, bottom: 0, left: 1, right: 1 },
  }),
);

// ─────────────────────────────────────────────
//  7. TITLE IN BORDER
// ─────────────────────────────────────────────
divider();
console.log("  7. TITLE IN BORDER\n");

for (const titleAlign of ["left", "center", "right"]) {
  console.log(
    boxy(`titleAlign: "${titleAlign}"`, {
      style: "double",
      title: ` ${titleAlign.toUpperCase()} `,
      titleAlign,
      borderColor: "blue",
      padding: { top: 0, bottom: 0, left: 1, right: 1 },
    }),
  );
}

// ─────────────────────────────────────────────
//  8. PADDING & MARGIN
// ─────────────────────────────────────────────
divider();
console.log("  8. PADDING & MARGIN\n");

console.log(
  boxy("Equal padding: 2", { padding: 2, style: "round", borderColor: "cyan" }),
);

console.log(
  boxy("Asymmetric padding", {
    padding: { top: 0, bottom: 0, left: 6, right: 6 },
    style: "single",
    borderColor: "yellow",
  }),
);

console.log(
  boxy("With top margin", {
    margin: { top: 2, left: 0 },
    style: "round",
    borderColor: "green",
  }),
);

// ─────────────────────────────────────────────
//  9. FIXED WIDTH + WORD WRAP
// ─────────────────────────────────────────────
divider();
console.log("  9. FIXED WIDTH + WORD WRAP\n");

console.log(
  boxy(
    "This is a long sentence that will be automatically word-wrapped to fit inside the fixed width.",
    { width: 24, wrap: true, style: "round", borderColor: "magenta" },
  ),
);

console.log(
  boxy("Right aligned\nwith fixed width\nand multiline!", {
    width: 24,
    align: "right",
    style: "single",
    borderColor: "cyan",
  }),
);

// ─────────────────────────────────────────────
//  10. MULTILINE
// ─────────────────────────────────────────────
divider();
console.log("  10. MULTILINE\n");

console.log(
  boxy(
    "🚀 Deploy pipeline\n✅ Tests passed\n📦 Bundle ready\n🌍 Deployed to prod",
    {
      style: "round",
      borderColor: "green",
      textColor: "brightGreen",
      padding: 1,
    },
  ),
);

// ─────────────────────────────────────────────
//  11. FLOAT
// ─────────────────────────────────────────────
divider();
console.log("  11. FLOAT\n");

console.log(
  boxy("float: left", {
    style: "single",
    float: "left",
    borderColor: "gray",
    padding: { top: 0, bottom: 0, left: 1, right: 1 },
  }),
);

console.log(
  boxy("float: center", {
    style: "round",
    float: "center",
    borderColor: "cyan",
    padding: { top: 0, bottom: 0, left: 1, right: 1 },
  }),
);

console.log(
  boxy("float: right", {
    style: "bold",
    float: "right",
    borderColor: "magenta",
    padding: { top: 0, bottom: 0, left: 1, right: 1 },
  }),
);

// ─────────────────────────────────────────────
//  12. THEMES
// ─────────────────────────────────────────────
divider();
console.log("  12. THEMES\n");

console.log(boxy.themes.info("    ℹ  This is an info box    "));
console.log(boxy.themes.success("    ✔  Operation completed!    "));
console.log(boxy.themes.warning("    ⚠  Disk usage at 85%    "));
console.log(boxy.themes.error("    ✖  Connection refused    "));
console.log(boxy.themes.debug("    ⚙  req.body = { id: 42 }    "));

// Theme with overrides
console.log(
  boxy.themes.success("Centered success", { align: "center", width: 30 }),
);

// ─────────────────────────────────────────────
//  13. boxy.print()
// ─────────────────────────────────────────────
divider();
console.log("  13. boxy.print()\n");

boxy.print("Printed directly to stdout!", {
  style: "bold",
  borderColor: "brightGreen",
  textColor: "brightGreen",
  padding: { top: 0, bottom: 0, left: 2, right: 2 },
});

// ─────────────────────────────────────────────
//  14. boxy.stack()
// ─────────────────────────────────────────────
divider();
console.log("  14. boxy.stack()\n");

console.log(
  boxy.stack([
    { text: "① First", style: "round", borderColor: "red" },
    { text: "② Second", style: "single", borderColor: "yellow" },
    { text: "③ Third", style: "bold", borderColor: "green" },
  ]),
);

// ─────────────────────────────────────────────
//  15. boxy.sideBySide()
// ─────────────────────────────────────────────
divider();
console.log("  15. boxy.sideBySide()\n");

console.log(
  boxy.sideBySide(
    "Before\n──────\nconst x = 1\nconst y = 2",
    "After\n─────\nconst x = 1\nconst y = 99",
    { style: "single", borderColor: "red", textColor: "red", padding: 1 },
    { style: "single", borderColor: "green", textColor: "green", padding: 1 },
    4,
  ),
);

console.log(
  boxy.sideBySide(
    "CPU\n42%",
    "MEM\n78%",
    { style: "round", borderColor: "cyan", align: "center", padding: 1 },
    { style: "round", borderColor: "magenta", align: "center", padding: 1 },
    2,
  ),
);

// ─────────────────────────────────────────────
//  16. REAL-WORLD EXAMPLES
// ─────────────────────────────────────────────
divider();
console.log("  16. REAL-WORLD EXAMPLES\n");

// Build summary card
console.log(
  boxy(
    "Build Summary\n─────────────\nStatus  : PASSED\nDuration: 4.2s\nTests   : 42 / 42\nCoverage: 98%",
    {
      style: "round",
      borderColor: "green",
      textColor: "brightGreen",
      title: " ✔ CI ",
      titleAlign: "center",
      padding: 1,
    },
  ),
);

// Error card
console.log(
  boxy(
    'TypeError: Cannot read\nproperties of undefined\n(reading "map")\n\nat Array.<anonymous>\n  app.js:42:18',
    {
      style: "double",
      borderColor: "red",
      textColor: "brightRed",
      title: " ✖ ERROR ",
      titleAlign: "center",
      padding: 1,
    },
  ),
);

// Welcome banner
console.log(
  boxy(
    "👋  Welcome back, developer!\n\nToday's tasks:\n  • Review PR #88\n  • Deploy to staging\n  • Update changelog",
    {
      style: "bold",
      borderColor: "brightCyan",
      textColor: "brightWhite",
      title: " DASHBOARD ",
      titleAlign: "center",
      padding: 1,
      float: "center",
    },
  ),
);
