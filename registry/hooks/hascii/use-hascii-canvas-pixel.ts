import { useReducer } from "react"

export type CanvasPixelGrid = (string | null)[][]

export type HasciiCanvasPixelState = {
  value: CanvasPixelGrid
  brush: string
  paint: (row: number, col: number) => void
  setValue: (next: CanvasPixelGrid) => void
  setBrush: (color: string) => void
  clear: () => void
  fill: (color: string | null) => void
}

export type Options = {
  rows?: number
  cols?: number
  brush?: string
  initial?: CanvasPixelGrid
}

type InternalState = {
  value: CanvasPixelGrid
  brush: string
  rows: number
  cols: number
}

type Action =
  | { type: "paint"; row: number; col: number }
  | { type: "setBrush"; brush: string }
  | { type: "setValue"; value: CanvasPixelGrid }
  | { type: "clear" }
  | { type: "fill"; color: string | null }

const buildEmpty = (rows: number, cols: number): CanvasPixelGrid => {
  const grid: CanvasPixelGrid = []
  for (let row = 0; row < rows; row++) {
    const r: (string | null)[] = []
    for (let col = 0; col < cols; col++) r.push(null)
    grid.push(r)
  }
  return grid
}

const buildFilled = (rows: number, cols: number, color: string | null): CanvasPixelGrid => {
  const grid: CanvasPixelGrid = []
  for (let row = 0; row < rows; row++) {
    const r: (string | null)[] = []
    for (let col = 0; col < cols; col++) r.push(color)
    grid.push(r)
  }
  return grid
}

const reducer = (state: InternalState, action: Action): InternalState => {
  switch (action.type) {
    case "paint": {
      const target = state.value[action.row]?.[action.col]
      if (target === undefined) return state
      if (target === state.brush) return state
      const next = state.value.map((r) => r.slice())
      const row = next[action.row]
      if (row) row[action.col] = state.brush
      return { ...state, value: next }
    }
    case "setBrush":
      return { ...state, brush: action.brush }
    case "setValue":
      return { ...state, value: action.value }
    case "clear":
      return { ...state, value: buildEmpty(state.rows, state.cols) }
    case "fill":
      return { ...state, value: buildFilled(state.rows, state.cols, action.color) }
  }
}

/** Reducer-backed controller for HasciiCanvasPixel. Spread it via `state`: `<HasciiCanvasPixel state={useHasciiCanvasPixel()} />`. The reducer makes undo/redo trivial — wrap dispatch with an action log. */
export function useHasciiCanvasPixel(options?: Options): HasciiCanvasPixelState {
  const rows = options?.rows ?? 8
  const cols = options?.cols ?? 8

  const reducerState = useReducer(reducer, undefined, () => ({
    value: options?.initial ?? buildEmpty(rows, cols),
    brush: options?.brush ?? "#ffffff",
    rows,
    cols,
  }))

  const state = reducerState[0]
  const dispatch = reducerState[1]

  return {
    value: state.value,
    brush: state.brush,
    paint: (row, col) => dispatch({ type: "paint", row, col }),
    setValue: (value) => dispatch({ type: "setValue", value }),
    setBrush: (brush) => dispatch({ type: "setBrush", brush }),
    clear: () => dispatch({ type: "clear" }),
    fill: (color) => dispatch({ type: "fill", color }),
  }
}
