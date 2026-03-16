# cli-boxy — Examples

A full visual reference for every feature. All examples are also runnable via [`examples.js`](./examples.js).

---

## Table of Contents

- [Basic](#basic)
- [All Styles](#all-styles)
- [Custom Style Object](#custom-style-object)
- [Alignment](#alignment)
- [Colors](#colors)
- [Combined Colors & Modifiers](#combined-colors--modifiers)
- [Title in Border](#title-in-border)
- [Padding & Margin](#padding--margin)
- [Fixed Width & Word Wrap](#fixed-width--word-wrap)
- [Multiline](#multiline)
- [Float](#float)
- [Themes](#themes)
- [boxy.print()](#boxyprint)
- [boxy.stack()](#boxystack)
- [boxy.sideBySide()](#boxysidebyside)
- [Real-World Examples](#real-world-examples)

---

## Basic

```js
boxy("Hello, World!");
```

```
┌───────────────┐
│               │
│ Hello, World! │
│               │
└───────────────┘
```

```js
boxy("Zero padding", { padding: 0 });
```

```
┌────────────┐
│Zero padding│
└────────────┘
```

```js
boxy("Custom padding", {
  padding: { top: 2, bottom: 2, left: 4, right: 4 },
});
```

```
┌──────────────────────┐
│                      │
│                      │
│    Custom padding    │
│                      │
│                      │
└──────────────────────┘
```

---

## All Styles

```js
boxy("single", { style: "single" }); // ┌─┐ │ └─┘
boxy("double", { style: "double" }); // ╔═╗ ║ ╚═╝
boxy("round", { style: "round" }); // ╭─╮ │ ╰─╯
boxy("bold", { style: "bold" }); // ┏━┓ ┃ ┗━┛
boxy("doubleSingle", { style: "doubleSingle" }); // ╒═╕ │ ╘═╛
boxy("singleDouble", { style: "singleDouble" }); // ╓─╖ ║ ╙─╜
boxy("classic", { style: "classic" }); // +-+ | +-+
boxy("arrow", { style: "arrow" }); // ↖↑↗ ← → ↙↓↘
boxy("star", { style: "star" }); // *** * ***
boxy("hash", { style: "hash" }); // ### # ###
boxy("hidden", { style: "hidden" }); // (invisible)
```

```
┌────────┐   ╔════════╗   ╭───────╮   ┏━━━━━━┓
│ single │   ║ double ║   │ round │   ┃ bold ┃
└────────┘   ╚════════╝   ╰───────╯   ┗━━━━━━┛

╒══════════════╕   ╓──────────────╖   +---------+
│ doubleSingle │   ║ singleDouble ║   | classic |
╘══════════════╛   ╙──────────────╜   +---------+

↖↑↑↑↑↑↑↑↗   ********   ########
← arrow →    * star *   # hash #
↙↓↓↓↓↓↓↓↘   ********   ########
```

---

## Custom Style Object

```js
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
});
```

```
★················★
·  Custom chars  ·
★················★
```

```js
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
});
```

```
🌸~~~~~~~~~~~~~~~~🌸
~  Emoji border  ~
🌸~~~~~~~~~~~~~~~~🌸
```

---

## Alignment

```js
boxy('align: "left"', { align: "left", width: 28 });
boxy('align: "center"', { align: "center", width: 28 });
boxy('align: "right"', { align: "right", width: 28 });
```

```
╭──────────────────────────────╮
│                              │
│ align: "left"                │
│                              │
╰──────────────────────────────╯

╭──────────────────────────────╮
│                              │
│       align: "center"        │
│                              │
╰──────────────────────────────╯

╭──────────────────────────────╮
│                              │
│               align: "right" │
│                              │
╰──────────────────────────────╯
```

---

## Colors

Available color names:

| Standard  | Bright          |
| --------- | --------------- |
| `black`   | —               |
| `red`     | `brightRed`     |
| `green`   | `brightGreen`   |
| `yellow`  | `brightYellow`  |
| `blue`    | `brightBlue`    |
| `magenta` | `brightMagenta` |
| `cyan`    | `brightCyan`    |
| `white`   | `brightWhite`   |
| `gray`    | —               |

```js
boxy("cyan", { style: "round", borderColor: "cyan", textColor: "cyan" });
```

```
╭──────╮
│ cyan │  ← rendered in cyan in the terminal
╰──────╯
```

---

## Combined Colors & Modifiers

Pass an array to combine a modifier with a color:

```js
// Bold red text
boxy("Bold + Red text", {
  textColor: ["bold", "red"],
});
```

```
┌─────────────────┐
│ Bold + Red text │  ← bold red in terminal
└─────────────────┘
```

```js
// Cyan border, bright yellow text
boxy("cyan border, yellow text", {
  style: "bold",
  borderColor: "cyan",
  textColor: "brightYellow",
});
```

```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ cyan border, yellow text ┃  ← cyan border, yellow text
┗━━━━━━━━━━━━━━━━━━━━━━━━━━┛
```

```js
// Dim gray border
boxy("Dim gray border", {
  borderColor: ["dim", "gray"],
  textColor: "white",
});
```

Available modifiers: `bold`, `dim`, `italic`

---

## Title in Border

```js
boxy('titleAlign: "left"', {
  style: "double",
  title: " LEFT ",
  titleAlign: "left",
});
```

```
╔═ LEFT ═══════════╗
║ titleAlign: "left" ║
╚════════════════════╝
```

```js
boxy('titleAlign: "center"', {
  style: "double",
  title: " CENTER ",
  titleAlign: "center",
});
```

```
╔══════ CENTER ══════╗
║ titleAlign: "center" ║
╚══════════════════════╝
```

```js
boxy('titleAlign: "right"', {
  style: "double",
  title: " RIGHT ",
  titleAlign: "right",
});
```

```
╔════════════ RIGHT ╗
║ titleAlign: "right" ║
╚═════════════════════╝
```

---

## Padding & Margin

```js
// Equal padding on all sides
boxy("Equal padding: 2", { padding: 2 });
```

```
╭────────────────────╮
│                    │
│                    │
│  Equal padding: 2  │
│                    │
│                    │
╰────────────────────╯
```

```js
// Asymmetric — wide horizontal only
boxy("Asymmetric padding", {
  padding: { top: 0, bottom: 0, left: 6, right: 6 },
});
```

```
┌──────────────────────────────┐
│      Asymmetric padding      │
└──────────────────────────────┘
```

```js
// Top margin pushes box down 2 lines
boxy("With top margin", {
  margin: { top: 2, left: 0 },
});
```

```
(2 blank lines)
╭─────────────────╮
│                 │
│ With top margin │
│                 │
╰─────────────────╯
```

---

## Fixed Width & Word Wrap

```js
boxy("This is a long sentence that will be automatically word-wrapped.", {
  width: 24,
  wrap: true,
  style: "round",
});
```

```
╭──────────────────────────╮
│                          │
│ This is a long sentence  │
│ that will be             │
│ automatically            │
│ word-wrapped.            │
│                          │
╰──────────────────────────╯
```

```js
// Right-aligned multiline with fixed width
boxy("Right aligned\nwith fixed width\nand multiline!", {
  width: 24,
  align: "right",
});
```

```
┌──────────────────────────┐
│                          │
│            Right aligned │
│         with fixed width │
│           and multiline! │
│                          │
└──────────────────────────┘
```

---

## Multiline

```js
boxy(
  "🚀 Deploy pipeline\n✅ Tests passed\n📦 Bundle ready\n🌍 Deployed to prod",
  {
    style: "round",
    borderColor: "green",
    padding: 1,
  },
);
```

```
╭─────────────────────╮
│                     │
│ 🚀 Deploy pipeline  │
│ ✅ Tests passed     │
│ 📦 Bundle ready     │
│ 🌍 Deployed to prod │
│                     │
╰─────────────────────╯
```

---

## Float

`float` positions the box horizontally within the terminal width.

```js
boxy("float: left", { float: "left" }); // hugs left edge (default)
boxy("float: center", { float: "center" }); // centered in terminal
boxy("float: right", { float: "right" }); // hugs right edge
```

```
┌─────────────┐
│ float: left │
└─────────────┘

                    ╭───────────────╮
                    │ float: center │
                    ╰───────────────╯

                                           ┏━━━━━━━━━━━━━━┓
                                           ┃ float: right ┃
                                           ┗━━━━━━━━━━━━━━┛
```

---

## Themes

Five ready-made presets — no options required:

```js
boxy.themes.info("ℹ  This is an info box");
```

```
╭──────────────────────────╮   ← cyan border
│                          │
│ ℹ  This is an info box   │   ← cyan text
│                          │
╰──────────────────────────╯
```

```js
boxy.themes.success("✔  Operation completed!");
boxy.themes.warning("⚠  Disk usage at 85%");
boxy.themes.error("✖  Connection refused");
boxy.themes.debug("⚙  req.body = { id: 42 }");
```

| Theme     | Style    | Color  |
| --------- | -------- | ------ |
| `info`    | `round`  | cyan   |
| `success` | `round`  | green  |
| `warning` | `bold`   | yellow |
| `error`   | `double` | red    |
| `debug`   | `single` | gray   |

Themes accept an optional second argument for overrides:

```js
boxy.themes.success("Done!", { align: "center", width: 30 });
```

```
╭────────────────────────────────╮
│                                │
│             Done!              │
│                                │
╰────────────────────────────────╯
```

---

## boxy.print()

Writes directly to `stdout` — no `console.log` needed:

```js
boxy.print("Printed directly to stdout!", {
  style: "bold",
  borderColor: "brightGreen",
  textColor: "brightGreen",
});
```

```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃  Printed directly to stdout!  ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
```

---

## boxy.stack()

Stack multiple boxes vertically. Pass strings for defaults, or objects with a `text` key plus any options.

```js
boxy.stack([
  { text: "① First", style: "round", borderColor: "red" },
  { text: "② Second", style: "single", borderColor: "yellow" },
  { text: "③ Third", style: "bold", borderColor: "green" },
]);
```

```
╭─────────╮
│         │
│ ① First │   ← red
│         │
╰─────────╯
┌──────────┐
│          │
│ ② Second │   ← yellow
│          │
└──────────┘
┏━━━━━━━━━┓
┃         ┃
┃ ③ Third ┃   ← green
┃         ┃
┗━━━━━━━━━┛
```

A `globalOptions` second argument applies to all items:

```js
boxy.stack(["A", "B", "C"], { style: "round", borderColor: "cyan" });
```

---

## boxy.sideBySide()

```js
boxy.sideBySide(leftText, rightText, leftOpts, rightOpts, gap);
```

**Diff view:**

```js
boxy.sideBySide(
  "Before\n──────\nconst x = 1\nconst y = 2",
  "After\n─────\nconst x = 1\nconst y = 99",
  { style: "single", borderColor: "red" },
  { style: "single", borderColor: "green" },
  4,
);
```

```
┌─────────────┐    ┌──────────────┐
│ Before      │    │ After        │
│ ──────      │    │ ─────        │
│ const x = 1 │    │ const x = 1  │
│ const y = 2 │    │ const y = 99 │
└─────────────┘    └──────────────┘
```

**Monitor panels:**

```js
boxy.sideBySide(
  "CPU\n42%",
  "MEM\n78%",
  { style: "round", borderColor: "cyan", align: "center" },
  { style: "round", borderColor: "magenta", align: "center" },
  2,
);
```

```
╭─────╮  ╭─────╮
│     │  │     │
│ CPU │  │ MEM │
│ 42% │  │ 78% │
│     │  │     │
╰─────╯  ╰─────╯
```

---

## Real-World Examples

### CI Build Summary

```js
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
);
```

```
╭──────  ✔ CI  ──────╮
│                    │
│ Build Summary      │
│ ─────────────      │
│ Status  : PASSED   │
│ Duration: 4.2s     │
│ Tests   : 42 / 42  │
│ Coverage: 98%      │
│                    │
╰────────────────────╯
```

### Error Card

```js
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
);
```

```
╔═══════  ✖ ERROR  ═══════╗
║                         ║
║ TypeError: Cannot read  ║
║ properties of undefined ║
║ (reading "map")         ║
║                         ║
║ at Array.<anonymous>    ║
║   app.js:42:18          ║
║                         ║
╚═════════════════════════╝
```

### Dashboard Banner

```js
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
);
```

```
          ┏━━━━━━━━  DASHBOARD  ━━━━━━━━━┓
          ┃                              ┃
          ┃ 👋  Welcome back, developer! ┃
          ┃                              ┃
          ┃ Today's tasks:               ┃
          ┃   • Review PR #88            ┃
          ┃   • Deploy to staging        ┃
          ┃   • Update changelog         ┃
          ┃                              ┃
          ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
```
