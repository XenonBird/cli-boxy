# cli-boxy

> The simplest zero-dependency box-drawing package for Node.js — with advanced alignment, styles, colors, titles, padding, margins, float, word wrap, and more.

```
┌─────────────────────┐
│  Zero dependencies  │
│  11 built-in styles │
│  14+ ANSI colors    │
│  Full alignment     │
└─────────────────────┘
```

📖 **[Full examples →](./examples.md)** &nbsp;|&nbsp; 🖥 **[Runnable examples →](./examples.js)**

## Install

```bash
npm install cli-boxy
```

## Quick Start

```js
const boxy = require("cli-boxy");

console.log(boxy("Hello, World!"));
// ┌───────────────┐
// │ Hello, World! │
// └───────────────┘
```

---

## API

### `boxy(text, options?)` → `string`

| Option        | Type                                  | Default    | Description                             |
| ------------- | ------------------------------------- | ---------- | --------------------------------------- |
| `style`       | `string` \| `object`                  | `'single'` | Border style name or custom char object |
| `align`       | `'left'` \| `'center'` \| `'right'`   | `'left'`   | Text alignment inside the box           |
| `padding`     | `number` \| `{top,right,bottom,left}` | `1`        | Space between text and border           |
| `margin`      | `number` \| `{top,right,bottom,left}` | `0`        | Space outside the box                   |
| `width`       | `number`                              | auto       | Fixed inner content width               |
| `borderColor` | `string` \| `string[]`                | —          | ANSI color name(s) for the border       |
| `textColor`   | `string` \| `string[]`                | —          | ANSI color name(s) for the text         |
| `title`       | `string`                              | —          | Text embedded in the top border         |
| `titleAlign`  | `'left'` \| `'center'` \| `'right'`   | `'left'`   | Title position in the top border        |
| `float`       | `'left'` \| `'center'` \| `'right'`   | `'left'`   | Horizontal box position in the terminal |
| `wrap`        | `boolean`                             | `true`     | Word-wrap text when `width` is set      |

---

## Styles

```js
boxy("text", { style: "single" }); // ┌─┐ │ └─┘  (default)
boxy("text", { style: "double" }); // ╔═╗ ║ ╚═╝
boxy("text", { style: "round" }); // ╭─╮ │ ╰─╯
boxy("text", { style: "bold" }); // ┏━┓ ┃ ┗━┛
boxy("text", { style: "doubleSingle" }); // ╒═╕ │ ╘═╛
boxy("text", { style: "singleDouble" }); // ╓─╖ ║ ╙─╜
boxy("text", { style: "classic" }); // +-+ | +-+
boxy("text", { style: "arrow" }); // ↖↑↗ ← → ↙↓↘
boxy("text", { style: "star" }); // *** * ***
boxy("text", { style: "hash" }); // ### # ###
boxy("text", { style: "hidden" }); // (invisible border)
```

**Custom style:**

```js
boxy("text", {
  style: {
    topLeft: "@",
    top: "-",
    topRight: "@",
    left: "|",
    right: "|",
    bottomLeft: "@",
    bottom: "-",
    bottomRight: "@",
  },
});
// @----@
// | text |
// @----@
```

---

## Colors

```
black  red  green  yellow  blue  magenta  cyan  white  gray
brightRed  brightGreen  brightYellow  brightBlue
brightMagenta  brightCyan  brightWhite
```

```js
boxy("Colorful!", { borderColor: "cyan", textColor: "brightYellow" });

// Combine modifiers with arrays:
boxy("Bold red!", { textColor: ["bold", "red"] });
```

---

## Examples

### Alignment

```js
boxy("Left aligned", { align: "left", width: 20 });
boxy("Centered", { align: "center", width: 20 });
boxy("Right aligned", { align: "right", width: 20 });
```

### Padding & Margin

```js
boxy("Spaced", { padding: { top: 1, bottom: 1, left: 4, right: 4 } });
boxy("Margined", { margin: { top: 1, left: 5 } });
```

### Title in border

```js
boxy("Some content here", {
  title: " MY TITLE ",
  titleAlign: "center",
  style: "double",
});
// ╔════ MY TITLE ════╗
// ║ Some content here ║
// ╚══════════════════╝
```

### Float / center in terminal

```js
boxy("I am centered!", { float: "center", style: "round" });
```

### Word wrap

```js
boxy("This is a very long sentence that will be wrapped.", {
  width: 20,
  wrap: true,
});
```

### Multiline

```js
boxy("Line one\nLine two\nLine three");
// ┌────────────┐
// │ Line one   │
// │ Line two   │
// │ Line three │
// └────────────┘
```

---

## Utility Methods

### `boxy.print(text, options?)`

Prints a box directly to stdout.

```js
boxy.print("Quick print!", { style: "round", borderColor: "green" });
```

### `boxy.stack(items, globalOptions?)`

Stack multiple boxes vertically.

```js
console.log(
  boxy.stack([
    { text: "Box One", style: "round" },
    { text: "Box Two", style: "double", borderColor: "cyan" },
    "Plain box",
  ]),
);
```

### `boxy.sideBySide(leftText, rightText, leftOpts?, rightOpts?, gap?)`

Place two boxes side by side.

```js
console.log(
  boxy.sideBySide(
    "Left box",
    "Right box",
    { style: "round", borderColor: "blue" },
    { style: "double", borderColor: "red" },
    4, // gap between boxes
  ),
);
```

---

## Theme Presets

```js
boxy.themes.info("This is info");
boxy.themes.success("Operation successful!");
boxy.themes.warning("Proceed with caution");
boxy.themes.error("Something went wrong");
boxy.themes.debug("Debug value: 42");
```

Each theme accepts an optional second argument for overrides:

```js
boxy.themes.success("Done!", { align: "center", width: 30 });
```

---

## Inspect Available Styles & Colors

```js
console.log(boxy.styles); // All style objects
console.log(boxy.colors); // All ANSI escape codes
```

---

## More Examples

See **[examples.md](./examples.md)** for a full visual reference, or run **[examples.js](./examples.js)** in your terminal:

```bash
node examples.js
```

---

## License

MIT
