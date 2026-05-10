import { useHasciiTheme } from "@/registry/lib/hascii/theme-context"

export type Props = {
  value: number
  min?: number
  max?: number
  width?: number
  showValue?: boolean
  color?: string
}

/** Horizontal arc gauge. Renders a single-row bar with a thumb-marker at the value position; an optional percentage / value label sits below. */
export function HasciiGauge(props: Props) {
  const min = props.min ?? 0
  const max = props.max ?? 100
  const width = props.width ?? 24
  const showValue = props.showValue ?? true
  const theme = useHasciiTheme()
  const color = props.color ?? theme.color.primary

  const range = Math.max(1, max - min)
  const ratio = Math.max(0, Math.min(1, (props.value - min) / range))
  const thumbIndex = Math.round(ratio * (width - 1))

  const cells: string[] = []
  for (let index = 0; index < width; index++) {
    if (index === thumbIndex) cells.push("●")
    else if (index < thumbIndex) cells.push("─")
    else cells.push("·")
  }

  const percent = Math.round(ratio * 100)

  return (
    <box flexDirection="column" alignItems="center" gap={0} width={width}>
      <text fg={color}>{cells.join("")}</text>
      {showValue ? <text fg={theme.color.mutedForeground}>{`${percent}%`}</text> : null}
    </box>
  )
}
