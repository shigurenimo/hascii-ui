import type { MouseEvent } from "@opentui/core"

export type Props = {
  char: string
  fg: string
  bg?: string | null
  onMouseDown?: (event: MouseEvent) => void
  onMouseUp?: (event: MouseEvent) => void
  onMouseMove?: (event: MouseEvent) => void
  onMouseOver?: (event: MouseEvent) => void
}

/** Single character cell of a HasciiCanvas grid. Always 1 char × 1 row — the glyph is the cell. For chunkier filled blocks use HasciiCanvasPixelCell instead. */
export function HasciiCanvasCell(props: Props) {
  const bg = props.bg ?? undefined

  return (
    <box
      width={1}
      height={1}
      backgroundColor={bg}
      flexDirection="column"
      onMouseDown={props.onMouseDown}
      onMouseUp={props.onMouseUp}
      onMouseMove={props.onMouseMove}
      onMouseOver={props.onMouseOver}
    >
      <text selectable={false} bg={bg} fg={props.fg}>
        {props.char}
      </text>
    </box>
  )
}
