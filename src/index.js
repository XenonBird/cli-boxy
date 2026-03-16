"use strict";

// ─────────────────────────────────────────────
//  ANSI COLOR & STYLE CODES
// ─────────────────────────────────────────────
const ANSI = {
  reset: "\x1b[0m",
  bold: "\x1b[1m",
  dim: "\x1b[2m",
  italic: "\x1b[3m",
  // Foreground colors
  black: "\x1b[30m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  magenta: "\x1b[35m",
  cyan: "\x1b[36m",
  white: "\x1b[37m",
  gray: "\x1b[90m",
  // Bright foreground
  brightRed: "\x1b[91m",
  brightGreen: "\x1b[92m",
  brightYellow: "\x1b[93m",
  brightBlue: "\x1b[94m",
  brightMagenta: "\x1b[95m",
  brightCyan: "\x1b[96m",
  brightWhite: "\x1b[97m",
  // Background colors
  bgBlack: "\x1b[40m",
  bgRed: "\x1b[41m",
  bgGreen: "\x1b[42m",
  bgYellow: "\x1b[43m",
  bgBlue: "\x1b[44m",
  bgMagenta: "\x1b[45m",
  bgCyan: "\x1b[46m",
  bgWhite: "\x1b[47m",
  bgGray: "\x1b[100m",
};

// ─────────────────────────────────────────────
//  BOX STYLES
// ─────────────────────────────────────────────
const STYLES = {
  single: {
    topLeft: "┌",
    top: "─",
    topRight: "┐",
    left: "│",
    right: "│",
    bottomLeft: "└",
    bottom: "─",
    bottomRight: "┘",
    name: "single",
  },
  double: {
    topLeft: "╔",
    top: "═",
    topRight: "╗",
    left: "║",
    right: "║",
    bottomLeft: "╚",
    bottom: "═",
    bottomRight: "╝",
    name: "double",
  },
  round: {
    topLeft: "╭",
    top: "─",
    topRight: "╮",
    left: "│",
    right: "│",
    bottomLeft: "╰",
    bottom: "─",
    bottomRight: "╯",
    name: "round",
  },
  bold: {
    topLeft: "┏",
    top: "━",
    topRight: "┓",
    left: "┃",
    right: "┃",
    bottomLeft: "┗",
    bottom: "━",
    bottomRight: "┛",
    name: "bold",
  },
  doubleSingle: {
    topLeft: "╒",
    top: "═",
    topRight: "╕",
    left: "│",
    right: "│",
    bottomLeft: "╘",
    bottom: "═",
    bottomRight: "╛",
    name: "doubleSingle",
  },
  singleDouble: {
    topLeft: "╓",
    top: "─",
    topRight: "╖",
    left: "║",
    right: "║",
    bottomLeft: "╙",
    bottom: "─",
    bottomRight: "╜",
    name: "singleDouble",
  },
  classic: {
    topLeft: "+",
    top: "-",
    topRight: "+",
    left: "|",
    right: "|",
    bottomLeft: "+",
    bottom: "-",
    bottomRight: "+",
    name: "classic",
  },
  arrow: {
    topLeft: "↖",
    top: "↑",
    topRight: "↗",
    left: "←",
    right: "→",
    bottomLeft: "↙",
    bottom: "↓",
    bottomRight: "↘",
    name: "arrow",
  },
  star: {
    topLeft: "*",
    top: "*",
    topRight: "*",
    left: "*",
    right: "*",
    bottomLeft: "*",
    bottom: "*",
    bottomRight: "*",
    name: "star",
  },
  hash: {
    topLeft: "#",
    top: "#",
    topRight: "#",
    left: "#",
    right: "#",
    bottomLeft: "#",
    bottom: "#",
    bottomRight: "#",
    name: "hash",
  },
  hidden: {
    topLeft: " ",
    top: " ",
    topRight: " ",
    left: " ",
    right: " ",
    bottomLeft: " ",
    bottom: " ",
    bottomRight: " ",
    name: "hidden",
  },
};

// ─────────────────────────────────────────────
//  HELPERS
// ─────────────────────────────────────────────

/** Strip ANSI escape codes to measure true visible length */
function stripAnsi(str) {
  return str.replace(/\x1b\[[0-9;]*m/g, "");
}

function visibleLength(str) {
  return stripAnsi(str).length;
}

/** Pad a string to a visible width, accounting for ANSI codes */
function padEnd(str, width) {
  const vis = visibleLength(str);
  return str + " ".repeat(Math.max(0, width - vis));
}

/** Repeat a character n times */
function repeat(char, n) {
  return char.repeat(Math.max(0, n));
}

/** Word-wrap a single line to maxWidth */
function wordWrap(text, maxWidth) {
  if (visibleLength(text) <= maxWidth) return [text];
  const words = text.split(" ");
  const lines = [];
  let current = "";
  for (const word of words) {
    const test = current ? current + " " + word : word;
    if (visibleLength(test) <= maxWidth) {
      current = test;
    } else {
      if (current) lines.push(current);
      // If word itself is too long, hard-break it
      if (visibleLength(word) > maxWidth) {
        let w = word;
        while (visibleLength(w) > maxWidth) {
          lines.push(w.slice(0, maxWidth));
          w = w.slice(maxWidth);
        }
        current = w;
      } else {
        current = word;
      }
    }
  }
  if (current) lines.push(current);
  return lines;
}

/** Apply ANSI color/style codes by name */
function applyColor(str, ...codes) {
  if (!codes || codes.length === 0) return str;
  const prefix = codes.map((c) => ANSI[c] || "").join("");
  return prefix ? prefix + str + ANSI.reset : str;
}

// ─────────────────────────────────────────────
//  CORE BOX FUNCTION
// ─────────────────────────────────────────────

/**
 * boxy(text, options) → string
 *
 * Options:
 *   style         : 'single' | 'double' | 'round' | 'bold' | 'doubleSingle' |
 *                   'singleDouble' | 'classic' | 'arrow' | 'star' | 'hash' | 'hidden'
 *                   OR a custom { topLeft, top, topRight, left, right, bottomLeft, bottom, bottomRight }
 *   align         : 'left' | 'center' | 'right'
 *   padding       : number | { top, right, bottom, left }
 *   margin        : number | { top, right, bottom, left }
 *   width         : number  (inner content width; auto if not set)
 *   borderColor   : ANSI color name string (or array for mixed)
 *   textColor     : ANSI color name string (or array)
 *   title         : string shown in the top border
 *   titleAlign    : 'left' | 'center' | 'right'
 *   float         : 'left' | 'center' | 'right'  (box position in terminal)
 *   wrap          : boolean (auto word-wrap, default true)
 */
function boxy(text, options = {}) {
  const {
    style = "single",
    align = "left",
    padding = 1,
    margin = 0,
    width: fixedWidth,
    borderColor,
    textColor,
    title,
    titleAlign = "left",
    float: boxFloat,
    wrap = true,
  } = options;

  // ── Resolve border chars ──
  const chars =
    typeof style === "object" ? style : STYLES[style] || STYLES.single;

  // ── Resolve padding ──
  const pad = resolveSides(padding);

  // ── Resolve margin ──
  const mar = resolveSides(margin);

  // ── Split text into raw lines ──
  const rawLines = String(text).split("\n");

  // ── Determine inner content width ──
  let contentWidth =
    fixedWidth !== undefined
      ? fixedWidth
      : Math.max(...rawLines.map((l) => visibleLength(l)));

  // Apply word wrap if needed
  let lines = [];
  if (wrap && fixedWidth !== undefined) {
    for (const line of rawLines) {
      lines.push(...wordWrap(line, fixedWidth));
    }
    contentWidth = fixedWidth;
  } else {
    lines = rawLines;
    if (fixedWidth === undefined) {
      contentWidth = Math.max(...lines.map((l) => visibleLength(l)));
    }
  }

  // ── Inner width = content + left/right padding ──
  const innerWidth = contentWidth + pad.left + pad.right;

  // ── Border chars helper ──
  const bc = (s) =>
    borderColor
      ? applyColor(
          s,
          ...(Array.isArray(borderColor) ? borderColor : [borderColor]),
        )
      : s;

  // ── Text color helper ──
  const tc = (s) =>
    textColor
      ? applyColor(s, ...(Array.isArray(textColor) ? textColor : [textColor]))
      : s;

  // ── Build top border (with optional title) ──
  let topBorder;
  if (title) {
    const titleStr = ` ${title} `;
    const titleVis = visibleLength(titleStr);
    const remaining = innerWidth - titleVis;
    if (remaining < 0) {
      topBorder =
        bc(chars.topLeft) +
        bc(repeat(chars.top, innerWidth)) +
        bc(chars.topRight);
    } else {
      const leftFill =
        titleAlign === "center"
          ? Math.floor(remaining / 2)
          : titleAlign === "right"
            ? remaining
            : 1;
      const rightFill = innerWidth - titleVis - leftFill;
      topBorder =
        bc(chars.topLeft) +
        bc(repeat(chars.top, leftFill)) +
        tc(titleStr) +
        bc(repeat(chars.top, rightFill)) +
        bc(chars.topRight);
    }
  } else {
    topBorder =
      bc(chars.topLeft) +
      bc(repeat(chars.top, innerWidth)) +
      bc(chars.topRight);
  }

  const bottomBorder =
    bc(chars.bottomLeft) +
    bc(repeat(chars.bottom, innerWidth)) +
    bc(chars.bottomRight);

  // ── Build padding rows ──
  const emptyRow = bc(chars.left) + " ".repeat(innerWidth) + bc(chars.right);

  // ── Build content rows ──
  const contentRows = lines.map((line) => {
    const vis = visibleLength(line);
    let aligned;
    if (align === "center") {
      const total = contentWidth - vis;
      const lPad = Math.floor(total / 2);
      const rPad = total - lPad;
      aligned = " ".repeat(lPad) + tc(line) + " ".repeat(rPad);
    } else if (align === "right") {
      const lPad = contentWidth - vis;
      aligned = " ".repeat(lPad) + tc(line);
    } else {
      // left
      aligned = tc(padEnd(line, contentWidth));
    }
    return (
      bc(chars.left) +
      " ".repeat(pad.left) +
      aligned +
      " ".repeat(pad.right) +
      bc(chars.right)
    );
  });

  // ── Assemble box lines ──
  const boxLines = [
    topBorder,
    ...Array(pad.top).fill(emptyRow),
    ...contentRows,
    ...Array(pad.bottom).fill(emptyRow),
    bottomBorder,
  ];

  // ── Apply margin & float ──
  const termWidth = process.stdout.columns || 80;
  const boxWidth = innerWidth + 2; // +2 for left/right border chars

  let leftMargin = mar.left;
  if (boxFloat === "center") {
    leftMargin = Math.max(0, Math.floor((termWidth - boxWidth) / 2));
  } else if (boxFloat === "right") {
    leftMargin = Math.max(0, termWidth - boxWidth - mar.right);
  }

  const leftPad = " ".repeat(leftMargin);
  const rightPad = ""; // right padding is virtual in terminals

  const topMargin = "\n".repeat(mar.top);
  const bottomMargin = "\n".repeat(mar.bottom);

  const result =
    topMargin +
    boxLines.map((l) => leftPad + l + rightPad).join("\n") +
    bottomMargin;

  return result;
}

// ─────────────────────────────────────────────
//  HELPER: resolve sides shorthand
// ─────────────────────────────────────────────
function resolveSides(val) {
  if (typeof val === "number") {
    return { top: val, right: val, bottom: val, left: val };
  }
  return {
    top: val.top ?? 0,
    right: val.right ?? 0,
    bottom: val.bottom ?? 0,
    left: val.left ?? 0,
  };
}

// ─────────────────────────────────────────────
//  CONVENIENCE PRESETS
// ─────────────────────────────────────────────

/** Print a box directly to stdout */
boxy.print = (text, options) => {
  process.stdout.write(boxy(text, options) + "\n");
};

/** Stack multiple boxes vertically */
boxy.stack = (items, globalOptions = {}) => {
  return items
    .map((item) => {
      if (typeof item === "string") return boxy(item, globalOptions);
      const { text, ...opts } = item;
      return boxy(text, { ...globalOptions, ...opts });
    })
    .join("\n");
};

/** Place two boxes side by side */
boxy.sideBySide = (left, right, leftOpts = {}, rightOpts = {}, gap = 2) => {
  const leftStr = boxy(left, leftOpts);
  const rightStr = boxy(right, rightOpts);
  const leftLines = leftStr.split("\n");
  const rightLines = rightStr.split("\n");
  const maxH = Math.max(leftLines.length, rightLines.length);
  const leftW = Math.max(...leftLines.map((l) => visibleLength(l)));

  const result = [];
  for (let i = 0; i < maxH; i++) {
    const l = leftLines[i] || "";
    const r = rightLines[i] || "";
    result.push(padEnd(l, leftW) + " ".repeat(gap) + r);
  }
  return result.join("\n");
};

/** Quick theme presets */
boxy.themes = {
  info: (text, opts) =>
    boxy(text, {
      style: "round",
      borderColor: "cyan",
      textColor: "cyan",
      padding: 1,
      ...opts,
    }),
  success: (text, opts) =>
    boxy(text, {
      style: "round",
      borderColor: "green",
      textColor: "green",
      padding: 1,
      ...opts,
    }),
  warning: (text, opts) =>
    boxy(text, {
      style: "bold",
      borderColor: "yellow",
      textColor: "yellow",
      padding: 1,
      ...opts,
    }),
  error: (text, opts) =>
    boxy(text, {
      style: "double",
      borderColor: "red",
      textColor: "red",
      padding: 1,
      ...opts,
    }),
  debug: (text, opts) =>
    boxy(text, {
      style: "single",
      borderColor: "gray",
      textColor: "gray",
      padding: 1,
      ...opts,
    }),
};

// ─────────────────────────────────────────────
//  EXPORTS
// ─────────────────────────────────────────────
boxy.styles = STYLES;
boxy.colors = ANSI;

module.exports = boxy;
