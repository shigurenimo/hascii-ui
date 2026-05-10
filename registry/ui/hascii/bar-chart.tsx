import { useHasciiTheme } from "@/registry/lib/hascii/theme-context"

export type BarItem = {
  label: string
  value: number
}

export type Props = {
  items: BarItem[]
  width?: number
  labelWidth?: number
  showValue?: boolean
  color?: string
}

const FILLED = "█"
const EMPTY = "─"

const rightPad = (text: string, width: number): string => {
  if (text.length >= width) return text.slice(0, width)
  return text + " ".repeat(width - text.length)
}

const leftPad = (text: string, width: number): string => {
  if (text.length >= width) return text.slice(0, width)
  return " ".repeat(width - text.length) + text
}

/** Horizontal bar chart. Each row: label, bar (proportional to max), and an optional numeric value. */
export function HasciiBarChart(props: Props) {
  const width = props.width ?? 32
  const labelWidth = props.labelWidth ?? 12
  const showValue = props.showValue ?? true
  const theme = useHasciiTheme()
  const fg = props.color ?? theme.color.primary

  let max = 0
  for (const item of props.items) if (item.value > max) max = item.value
  if (max === 0) max = 1

  const valueWidth = showValue
    ? Math.max(...props.items.map((item) => String(item.value).length))
    : 0

  const barWidth = Math.max(1, width - labelWidth - 1 - (showValue ? valueWidth + 1 : 0))

  return (
    <box flexDirection="column">
      {props.items.map((item, index) => {
        const filled = Math.max(1, Math.round((item.value / max) * barWidth))
        const empty = barWidth - filled
        const bar = FILLED.repeat(filled) + EMPTY.repeat(empty)

        return (
          <box key={`${item.label}-${index}`} flexDirection="row" height={1}>
            <text fg={theme.color.mutedForeground}>{rightPad(item.label, labelWidth)}</text>
            <text fg={fg}> {bar}</text>
            {showValue ? (
              <text fg={theme.color.foreground}>
                {` ${leftPad(String(item.value), valueWidth)}`}
              </text>
            ) : null}
          </box>
        )
      })}
    </box>
  )
}
