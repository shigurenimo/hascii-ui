import type { ReactNode } from "react"

export type Props = {
  gap?: number
  rowGap?: number
  wrap?: boolean
  children?: ReactNode
}

/** Container for HasciiPaletteItem children. Wraps to multiple rows when the parent is narrower than the items would need (set wrap=false to opt out). */
export function HasciiPalette(props: Props) {
  const wrap = props.wrap ?? true
  const gap = props.gap ?? 1
  const rowGap = props.rowGap ?? 0

  return (
    <box
      flexDirection="row"
      alignItems="flex-end"
      flexWrap={wrap ? "wrap" : "no-wrap"}
      columnGap={gap}
      rowGap={rowGap}
    >
      {props.children}
    </box>
  )
}
