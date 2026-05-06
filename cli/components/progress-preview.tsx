import { useKeyboard } from "@opentui/react"
import { useState } from "react"
import { HasciiProgress } from "@/registry/ui/hascii/progress"
import { useHasciiTheme } from "@/registry/lib/hascii/theme-context"

export type Props = {
  initialValue: number
  width: number
  step?: number
}

/** Keyboard-controlled progress demo. Left/Right adjusts the value; the current percentage is shown below the bar. */
export function ProgressPreview(props: Props) {
  const step = props.step ?? 0.05
  const theme = useHasciiTheme()

  const valueState = useState(props.initialValue)
  const value = valueState[0]
  const setValue = valueState[1]

  useKeyboard((key) => {
    if (key.name === "left" || key.name === "h") {
      setValue((current) => Math.max(0, current - step))
      return
    }

    if (key.name === "right" || key.name === "l") {
      setValue((current) => Math.min(1, current + step))
      return
    }

    if (key.name === "0") {
      setValue(0)
      return
    }

    if (key.name === "9") {
      setValue(1)
    }
  })

  const percent = Math.round(value * 100)

  return (
    <box flexDirection="column" alignItems="center" gap={1}>
      <HasciiProgress value={value} width={props.width} />
      <text fg={theme.color.foreground}>{percent}%</text>
      <text fg={theme.color.mutedForeground}>← / → to adjust · 0 / 9 to clamp</text>
    </box>
  )
}
