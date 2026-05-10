import { useReducer } from "react"

export type CanvasCellValue = {
  char: string
  fg: string
  bg?: string | null
}

export type CanvasGrid = (CanvasCellValue | null)[][]

export type CellRef = { row: number; col: number }

// Plugin contract — every brush is a function from (context, brushSpec) → grid update.
export type BrushContext = {
  grid: CanvasGrid
  row: number
  col: number
  lastCell: CellRef | null
  prevLastCell: CellRef | null
  rows: number
  cols: number
}

export type BrushResult = {
  /** New grid after the paint. undefined means no change (paint is a no-op). */
  grid?: CanvasGrid
  /** Override the next lastCell. Defaults to { row, col } when grid is updated. Pass null to clear. */
  lastCellOverride?: CellRef | null
}

export type BrushPlugin<TBrush = unknown> = (ctx: BrushContext, brush: TBrush) => BrushResult

export type BrushRegistry = Record<string, BrushPlugin>

// Brush specs for built-in plugins.
export type StampBrush = { type: "stamp"; char: string; fg: string; bg?: string | null }
export type FillBrush = { type: "fill"; bg: string }
export type EraseBrush = { type: "erase" }
export type LineStyle = "single" | "double" | "heavy" | "rounded"
export type LineBrush = { type: "line"; style?: LineStyle; fg: string; bg?: string | null }

/** Braille glyph encoded as 8 bits (one per dot position 1..8 → bits 0..7). */
export type BrailleBrush = { type: "braille"; bits: number; fg: string; bg?: string | null }

export type ShadeLevel = 1 | 2 | 3 | 4
export type ShadeBrush = { type: "shade"; level: ShadeLevel; fg: string; bg?: string | null }

/** Flood-fill: replaces all cells connected to the clicked cell that match its current value. */
export type BucketBrush = { type: "bucket"; char: string; fg: string; bg?: string | null }

/** Eyedropper: reads the clicked cell and reports it via onPick. Does not modify the grid. */
export type EyedropBrush = {
  type: "eyedrop"
  onPick: (cell: CanvasCellValue | null) => void
}

export type BuiltinBrush =
  | StampBrush
  | FillBrush
  | EraseBrush
  | LineBrush
  | BrailleBrush
  | ShadeBrush
  | BucketBrush
  | EyedropBrush
export type Brush = BuiltinBrush | { type: string; [key: string]: unknown }

// ───────── grid helpers ─────────

const buildEmpty = (rows: number, cols: number): CanvasGrid => {
  const grid: CanvasGrid = []
  for (let row = 0; row < rows; row++) {
    const r: (CanvasCellValue | null)[] = []
    for (let col = 0; col < cols; col++) r.push(null)
    grid.push(r)
  }
  return grid
}

const buildFilled = (rows: number, cols: number, cell: CanvasCellValue | null): CanvasGrid => {
  const grid: CanvasGrid = []
  for (let row = 0; row < rows; row++) {
    const r: (CanvasCellValue | null)[] = []
    for (let col = 0; col < cols; col++) r.push(cell ? { ...cell } : null)
    grid.push(r)
  }
  return grid
}

const cellsEqual = (a: CanvasCellValue | null, b: CanvasCellValue | null): boolean => {
  if (a === null && b === null) return true
  if (a === null || b === null) return false
  return a.char === b.char && a.fg === b.fg && (a.bg ?? null) === (b.bg ?? null)
}

/** Write a cell into a grid; returns the same grid if the cell is already equal. Exported so custom brush plugins can reuse it. */
export const writeCell = (
  grid: CanvasGrid,
  row: number,
  col: number,
  cell: CanvasCellValue | null,
): CanvasGrid => {
  const target = grid[row]?.[col]
  if (target === undefined) return grid
  if (cellsEqual(target, cell)) return grid

  const next = grid.map((r) => r.slice())
  const r = next[row]
  if (r) r[col] = cell
  return next
}

// ───────── line direction logic ─────────

type Dir = "N" | "S" | "E" | "W"

const dirBetween = (from: CellRef, to: CellRef): Dir | null => {
  if (to.row === from.row && to.col > from.col) return "E"
  if (to.row === from.row && to.col < from.col) return "W"
  if (to.col === from.col && to.row > from.row) return "S"
  if (to.col === from.col && to.row < from.row) return "N"
  return null
}

const opposite = (d: Dir): Dir => {
  if (d === "N") return "S"
  if (d === "S") return "N"
  if (d === "E") return "W"
  return "E"
}

const LINE_CHARS: Record<LineStyle, Record<string, string>> = {
  single: {
    EW: "─",
    WE: "─",
    NS: "│",
    SN: "│",
    WS: "┐",
    SW: "┐",
    WN: "┘",
    NW: "┘",
    ES: "┌",
    SE: "┌",
    EN: "└",
    NE: "└",
  },
  rounded: {
    EW: "─",
    WE: "─",
    NS: "│",
    SN: "│",
    WS: "╮",
    SW: "╮",
    WN: "╯",
    NW: "╯",
    ES: "╭",
    SE: "╭",
    EN: "╰",
    NE: "╰",
  },
  double: {
    EW: "═",
    WE: "═",
    NS: "║",
    SN: "║",
    WS: "╗",
    SW: "╗",
    WN: "╝",
    NW: "╝",
    ES: "╔",
    SE: "╔",
    EN: "╚",
    NE: "╚",
  },
  heavy: {
    EW: "━",
    WE: "━",
    NS: "┃",
    SN: "┃",
    WS: "┓",
    SW: "┓",
    WN: "┛",
    NW: "┛",
    ES: "┏",
    SE: "┏",
    EN: "┗",
    NE: "┗",
  },
}

const straightChar = (entry: Dir, style: LineStyle): string => {
  const horizontal = entry === "E" || entry === "W"
  return LINE_CHARS[style][horizontal ? "EW" : "NS"] ?? "·"
}

const cornerChar = (from: Dir, to: Dir, style: LineStyle): string => {
  return LINE_CHARS[style][`${from}${to}`] ?? straightChar(to, style)
}

// ───────── built-in brush plugins ─────────

export const stampBrushPlugin: BrushPlugin<StampBrush> = (ctx, brush) => ({
  grid: writeCell(ctx.grid, ctx.row, ctx.col, {
    char: brush.char,
    fg: brush.fg,
    bg: brush.bg,
  }),
})

export const fillBrushPlugin: BrushPlugin<FillBrush> = (ctx, brush) => ({
  grid: writeCell(ctx.grid, ctx.row, ctx.col, {
    char: " ",
    fg: brush.bg,
    bg: brush.bg,
  }),
})

export const eraseBrushPlugin: BrushPlugin<EraseBrush> = (ctx) => ({
  grid: writeCell(ctx.grid, ctx.row, ctx.col, null),
})

export const lineBrushPlugin: BrushPlugin<LineBrush> = (ctx, brush) => {
  const style = brush.style ?? "single"
  const fg = brush.fg
  const bg = brush.bg

  if (ctx.lastCell === null) {
    return {
      grid: writeCell(ctx.grid, ctx.row, ctx.col, {
        char: straightChar("E", style),
        fg,
        bg,
      }),
    }
  }

  const incoming = dirBetween(ctx.lastCell, { row: ctx.row, col: ctx.col })
  if (incoming === null) return {}

  let next = ctx.grid

  if (ctx.prevLastCell === null) {
    next = writeCell(next, ctx.lastCell.row, ctx.lastCell.col, {
      char: straightChar(incoming, style),
      fg,
      bg,
    })
  } else {
    const earlier = dirBetween(ctx.prevLastCell, ctx.lastCell)
    if (earlier !== null && earlier !== incoming) {
      next = writeCell(next, ctx.lastCell.row, ctx.lastCell.col, {
        char: cornerChar(opposite(earlier), incoming, style),
        fg,
        bg,
      })
    }
  }

  next = writeCell(next, ctx.row, ctx.col, {
    char: straightChar(opposite(incoming), style),
    fg,
    bg,
  })

  return { grid: next }
}

/** Convert 8 dot bits (0..255) to a Unicode braille char (U+2800 .. U+28FF). */
export const brailleCharFromBits = (bits: number): string =>
  String.fromCharCode(0x2800 + (bits & 0xff))

export const brailleBrushPlugin: BrushPlugin<BrailleBrush> = (ctx, brush) => ({
  grid: writeCell(ctx.grid, ctx.row, ctx.col, {
    char: brailleCharFromBits(brush.bits),
    fg: brush.fg,
    bg: brush.bg,
  }),
})

export const SHADE_CHARS: Record<ShadeLevel, string> = {
  1: "░",
  2: "▒",
  3: "▓",
  4: "█",
}

export const shadeBrushPlugin: BrushPlugin<ShadeBrush> = (ctx, brush) => ({
  grid: writeCell(ctx.grid, ctx.row, ctx.col, {
    char: SHADE_CHARS[brush.level],
    fg: brush.fg,
    bg: brush.bg,
  }),
})

export const bucketBrushPlugin: BrushPlugin<BucketBrush> = (ctx, brush) => {
  const start = ctx.grid[ctx.row]?.[ctx.col]
  if (start === undefined) return {}

  const target: CanvasCellValue = { char: brush.char, fg: brush.fg, bg: brush.bg }
  if (cellsEqual(start, target)) return {}

  const next = ctx.grid.map((r) => r.slice())
  const visited = new Set<string>()
  const queue: CellRef[] = [{ row: ctx.row, col: ctx.col }]

  while (queue.length > 0) {
    const cell = queue.shift()
    if (cell === undefined) break
    const key = `${cell.row},${cell.col}`
    if (visited.has(key)) continue
    visited.add(key)

    const row = next[cell.row]
    if (row === undefined) continue
    const cur = row[cell.col]
    if (cur === undefined) continue
    if (!cellsEqual(cur, start)) continue

    row[cell.col] = { ...target }
    queue.push(
      { row: cell.row - 1, col: cell.col },
      { row: cell.row + 1, col: cell.col },
      { row: cell.row, col: cell.col - 1 },
      { row: cell.row, col: cell.col + 1 },
    )
  }

  return { grid: next }
}

export const eyedropBrushPlugin: BrushPlugin<EyedropBrush> = (ctx, brush) => {
  const cell = ctx.grid[ctx.row]?.[ctx.col]
  if (cell !== undefined) brush.onPick(cell)
  return {}
}

export const BUILTIN_BRUSHES: BrushRegistry = {
  stamp: stampBrushPlugin as BrushPlugin,
  fill: fillBrushPlugin as BrushPlugin,
  erase: eraseBrushPlugin as BrushPlugin,
  line: lineBrushPlugin as BrushPlugin,
  braille: brailleBrushPlugin as BrushPlugin,
  shade: shadeBrushPlugin as BrushPlugin,
  bucket: bucketBrushPlugin as BrushPlugin,
  eyedrop: eyedropBrushPlugin as BrushPlugin,
}

// ───────── hook ─────────

export type HasciiCanvasState = {
  value: CanvasGrid
  rows: number
  cols: number
  paint: (row: number, col: number, brush: Brush) => void
  endStroke: () => void
  setValue: (next: CanvasGrid) => void
  clear: () => void
  fill: (cell: CanvasCellValue | null) => void
}

export type Options = {
  rows?: number
  cols?: number
  initial?: CanvasGrid
  /** Extra brushes merged on top of BUILTIN_BRUSHES. */
  brushes?: BrushRegistry
}

type InternalState = {
  value: CanvasGrid
  rows: number
  cols: number
  lastCell: CellRef | null
  prevLastCell: CellRef | null
  brushes: BrushRegistry
}

type Action =
  | { type: "paint"; row: number; col: number; brush: Brush }
  | { type: "endStroke" }
  | { type: "setValue"; value: CanvasGrid }
  | { type: "clear" }
  | { type: "fill"; cell: CanvasCellValue | null }

const reducer = (state: InternalState, action: Action): InternalState => {
  switch (action.type) {
    case "paint": {
      const plugin = state.brushes[action.brush.type]
      if (!plugin) return state

      const result = plugin(
        {
          grid: state.value,
          row: action.row,
          col: action.col,
          lastCell: state.lastCell,
          prevLastCell: state.prevLastCell,
          rows: state.rows,
          cols: state.cols,
        },
        action.brush,
      )

      if (result.grid === undefined) return state

      const nextLast =
        result.lastCellOverride === undefined
          ? { row: action.row, col: action.col }
          : result.lastCellOverride

      return {
        ...state,
        value: result.grid,
        lastCell: nextLast,
        prevLastCell: state.lastCell,
      }
    }
    case "endStroke":
      return { ...state, lastCell: null, prevLastCell: null }
    case "setValue":
      return { ...state, value: action.value }
    case "clear":
      return {
        ...state,
        value: buildEmpty(state.rows, state.cols),
        lastCell: null,
        prevLastCell: null,
      }
    case "fill":
      return {
        ...state,
        value: buildFilled(state.rows, state.cols, action.cell),
        lastCell: null,
        prevLastCell: null,
      }
  }
}

/** Reducer-backed grid controller for HasciiCanvas. Brushes are pluggable: pass `brushes: { ...BUILTIN_BRUSHES, mySpray: ... }` to register custom ones. paint() looks up the plugin by `brush.type`. */
export function useHasciiCanvas(options?: Options): HasciiCanvasState {
  const rows = options?.rows ?? 8
  const cols = options?.cols ?? 16
  const brushes = options?.brushes ?? BUILTIN_BRUSHES

  const reducerState = useReducer(reducer, undefined, () => ({
    value: options?.initial ?? buildEmpty(rows, cols),
    rows,
    cols,
    lastCell: null,
    prevLastCell: null,
    brushes,
  }))
  const state = reducerState[0]
  const dispatch = reducerState[1]

  return {
    value: state.value,
    rows: state.rows,
    cols: state.cols,
    paint: (row, col, brush) => dispatch({ type: "paint", row, col, brush }),
    endStroke: () => dispatch({ type: "endStroke" }),
    setValue: (value) => dispatch({ type: "setValue", value }),
    clear: () => dispatch({ type: "clear" }),
    fill: (cell) => dispatch({ type: "fill", cell }),
  }
}
