import { SyntaxStyle } from "@opentui/core"

// Distinct-hue but desaturated palette tuned for zinc-950 backgrounds. Falls outside the
// hascii monochrome theme on purpose: code/markdown/diff need real color separation
// to stay readable.
const PALETTE = {
  keyword: "#c4b5fd", // violet-300
  string: "#6ee7b7", // emerald-300
  number: "#fcd34d", // amber-300
  comment: "#71717a", // zinc-500
  fn: "#7dd3fc", // sky-300
  type: "#67e8f9", // cyan-300
  constant: "#fcd34d", // amber-300
  variable: "#fafafa", // zinc-50
  parameter: "#fda4af", // rose-300
  operator: "#d4d4d8", // zinc-300
  punctuation: "#a1a1aa", // zinc-400
  tag: "#7dd3fc", // sky-300
  attribute: "#fcd34d", // amber-300
  heading: "#fafafa", // zinc-50
  link: "#7dd3fc", // sky-300
  code: "#6ee7b7", // emerald-300
  quote: "#a1a1aa", // zinc-400
  list: "#a1a1aa", // zinc-400
  error: "#f87171", // red-400
}

const STYLES: Record<
  string,
  { fg?: string; bold?: boolean; italic?: boolean; dim?: boolean; underline?: boolean }
> = {
  keyword: { fg: PALETTE.keyword, bold: true },
  "keyword.control": { fg: PALETTE.keyword, bold: true },
  "keyword.import": { fg: PALETTE.keyword, bold: true },
  "keyword.function": { fg: PALETTE.keyword, bold: true },
  "keyword.return": { fg: PALETTE.keyword, bold: true },
  "keyword.operator": { fg: PALETTE.keyword },

  string: { fg: PALETTE.string },
  "string.escape": { fg: PALETTE.string, bold: true },
  "string.regex": { fg: PALETTE.string },
  "string.special": { fg: PALETTE.string, bold: true },
  "string.template": { fg: PALETTE.string },

  number: { fg: PALETTE.number },
  boolean: { fg: PALETTE.number, bold: true },
  constant: { fg: PALETTE.constant, bold: true },
  "constant.builtin": { fg: PALETTE.constant, bold: true },

  comment: { fg: PALETTE.comment, italic: true },
  "comment.line": { fg: PALETTE.comment, italic: true },
  "comment.block": { fg: PALETTE.comment, italic: true },

  function: { fg: PALETTE.fn },
  "function.call": { fg: PALETTE.fn },
  "function.builtin": { fg: PALETTE.fn, bold: true },
  "function.macro": { fg: PALETTE.fn, bold: true },
  method: { fg: PALETTE.fn },
  "method.call": { fg: PALETTE.fn },
  constructor: { fg: PALETTE.fn, bold: true },

  variable: { fg: PALETTE.variable },
  "variable.builtin": { fg: PALETTE.variable, bold: true },
  "variable.parameter": { fg: PALETTE.parameter, italic: true },

  type: { fg: PALETTE.type, bold: true },
  "type.builtin": { fg: PALETTE.type, bold: true },

  operator: { fg: PALETTE.operator },
  punctuation: { fg: PALETTE.punctuation },
  "punctuation.bracket": { fg: PALETTE.punctuation },
  "punctuation.delimiter": { fg: PALETTE.punctuation },
  "punctuation.special": { fg: PALETTE.punctuation, bold: true },

  tag: { fg: PALETTE.tag, bold: true },
  attribute: { fg: PALETTE.attribute, italic: true },

  // markup (markdown)
  "markup.heading": { fg: PALETTE.heading, bold: true },
  "markup.heading.1": { fg: PALETTE.heading, bold: true },
  "markup.heading.2": { fg: PALETTE.heading, bold: true },
  "markup.heading.3": { fg: PALETTE.heading, bold: true },
  "markup.heading.4": { fg: PALETTE.heading, bold: true },
  "markup.heading.5": { fg: PALETTE.heading, bold: true },
  "markup.heading.6": { fg: PALETTE.heading, bold: true },
  "markup.bold": { fg: PALETTE.heading, bold: true },
  "markup.italic": { fg: PALETTE.heading, italic: true },
  "markup.strong": { fg: PALETTE.heading, bold: true },
  "markup.list": { fg: PALETTE.list },
  "markup.list.bullet": { fg: PALETTE.list },
  "markup.link": { fg: PALETTE.link, underline: true },
  "markup.link.url": { fg: PALETTE.link, underline: true },
  "markup.link.label": { fg: PALETTE.link, underline: true },
  "markup.code": { fg: PALETTE.code },
  "markup.quote": { fg: PALETTE.quote, italic: true },

  // diagnostics
  error: { fg: PALETTE.error, bold: true },
  warning: { fg: PALETTE.number, italic: true },
}

let cached: SyntaxStyle | null = null

/** Lazily build (and cache) the project's shared SyntaxStyle. Maps tree-sitter token scopes to a code-friendly distinct-hue palette (separate from the monochrome theme tokens). */
export function getHasciiSyntaxStyle(): SyntaxStyle {
  if (cached) return cached

  cached = SyntaxStyle.create()
  for (const [name, def] of Object.entries(STYLES)) {
    cached.registerStyle(name, def)
  }

  return cached
}
