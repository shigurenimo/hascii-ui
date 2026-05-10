import { useState } from "react"
import type { Brush, HasciiCanvasState } from "@/registry/hooks/hascii/use-hascii-canvas"
import { HasciiCanvasCell } from "@/registry/ui/hascii/canvas-cell"
import { useHasciiTheme } from "@/registry/lib/hascii/theme-context"

export type Props = {
  state: HasciiCanvasState
  brush: Brush
  emptyChar?: string
  emptyFg?: string
  emptyBg?: string | null
}

/** Full ASCII-art canvas. Each cell is one character with fg / optional bg. The brush prop drives what each click / drag stamps; the state controller owns the grid. */
export function HasciiCanvas(props: Props) {
  const theme = useHasciiTheme()
  const emptyChar = props.emptyChar ?? "·"
  const emptyFg = props.emptyFg ?? theme.color.border
  const emptyBg = props.emptyBg !== undefined ? props.emptyBg : theme.color.muted

  const paintingState = useState(false)
  const isPainting = paintingState[0]
  const setPainting = paintingState[1]

  return (
    <box flexDirection="column">
      {props.state.value.map((row, rowIndex) => (
        <box key={`row-${rowIndex}`} flexDirection="row">
          {row.map((cell, colIndex) => (
            <HasciiCanvasCell
              key={`cell-${rowIndex}-${colIndex}`}
              char={cell?.char ?? emptyChar}
              fg={cell?.fg ?? emptyFg}
              bg={cell ? (cell.bg ?? null) : emptyBg}
              onMouseDown={() => {
                setPainting(true)
                props.state.paint(rowIndex, colIndex, props.brush)
              }}
              onMouseUp={() => {
                setPainting(false)
                props.state.endStroke()
              }}
              onMouseOver={() => {
                if (isPainting) props.state.paint(rowIndex, colIndex, props.brush)
              }}
            />
          ))}
        </box>
      ))}
    </box>
  )
}
