import { useState } from "react"
import type { HasciiCanvasPixelState } from "@/registry/hooks/hascii/use-hascii-canvas-pixel"
import { HasciiCanvasPixelCell } from "@/registry/ui/hascii/canvas-pixel-cell"
import { useHasciiTheme } from "@/registry/lib/hascii/theme-context"

export type Props = {
  state: HasciiCanvasPixelState
  pixelWidth?: number
  pixelHeight?: number
  emptyColor?: string
}

/** Paintable pixel-art grid driven by a HasciiCanvasPixelState controller (typically from useHasciiCanvasPixel). The component owns the drag-paint mechanic; the controller owns value, brush, and mutations. */
export function HasciiCanvasPixel(props: Props) {
  const pixelWidth = props.pixelWidth ?? 4
  const pixelHeight = props.pixelHeight ?? 2

  const theme = useHasciiTheme()
  const emptyColor = props.emptyColor ?? theme.color.muted

  const paintingState = useState(false)
  const isPainting = paintingState[0]
  const setPainting = paintingState[1]

  return (
    <box flexDirection="column">
      {props.state.value.map((row, rowIndex) => (
        <box key={`row-${rowIndex}`} flexDirection="row">
          {row.map((cell, colIndex) => (
            <HasciiCanvasPixelCell
              key={`cell-${rowIndex}-${colIndex}`}
              color={cell ?? emptyColor}
              width={pixelWidth}
              height={pixelHeight}
              onMouseDown={() => {
                setPainting(true)
                props.state.paint(rowIndex, colIndex)
              }}
              onMouseUp={() => setPainting(false)}
              onMouseOver={() => {
                if (isPainting) props.state.paint(rowIndex, colIndex)
              }}
            />
          ))}
        </box>
      ))}
    </box>
  )
}
