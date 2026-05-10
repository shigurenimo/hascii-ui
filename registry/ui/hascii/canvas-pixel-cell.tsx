import type { MouseEvent } from "@opentui/core"
import { useHasciiTheme } from "@/registry/lib/hascii/theme-context"

export type Props = {
  color: string
  width: number
  height?: number
  showCursor?: boolean
  cursorColor?: string
  cursorChar?: string
  onMouseDown?: (event: MouseEvent) => void
  onMouseUp?: (event: MouseEvent) => void
  onMouseMove?: (event: MouseEvent) => void
  onMouseOver?: (event: MouseEvent) => void
}

/** Single rectangular cell of a HasciiCanvasPixel grid. Fills the cell with the given color and optionally overlays a cursor mark. */
export function HasciiCanvasPixelCell(props: Props) {
  const height = props.height ?? 1
  const showCursor = props.showCursor ?? false
  const cursorChar = props.cursorChar ?? "+"
  const theme = useHasciiTheme()
  const cursorColor = props.cursorColor ?? theme.color.foreground

  const cursorLine = cursorChar.repeat(props.width)
  const blankLine = " ".repeat(props.width)
  const lines = Array.from({ length: height })

  return (
    <box
      width={props.width}
      height={height}
      backgroundColor={props.color}
      flexDirection="column"
      onMouseDown={props.onMouseDown}
      onMouseUp={props.onMouseUp}
      onMouseMove={props.onMouseMove}
      onMouseOver={props.onMouseOver}
    >
      {lines.map((_, index) => (
        <text
          key={index}
          selectable={false}
          bg={props.color}
          fg={showCursor ? cursorColor : props.color}
        >
          {showCursor ? cursorLine : blankLine}
        </text>
      ))}
    </box>
  )
}
