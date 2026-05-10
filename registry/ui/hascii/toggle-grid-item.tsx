import type { ReactNode } from "react"
import { useHasciiToggleGrid } from "@/registry/ui/hascii/toggle-grid"
import { useHasciiTheme } from "@/registry/lib/hascii/theme-context"
import { usePressable } from "@/registry/hooks/hascii/use-pressable"

export type Props = {
  value: string
  width?: number
  height?: number
  children?: ReactNode
}

/** Filled rectangular cell inside HasciiToggleGrid. Default size is 3x1, similar to a braille dot. */
export function HasciiToggleGridItem(props: Props) {
  const theme = useHasciiTheme()
  const ctx = useHasciiToggleGrid()
  const width = props.width ?? 3
  const height = props.height ?? 1

  const isSelected = ctx?.isPressed(props.value) ?? false

  const press = usePressable({
    onPress: () => ctx?.toggle(props.value),
  })

  const bg = isSelected
    ? press.isPressed
      ? theme.color.primaryActive
      : press.isHovered
        ? theme.color.primaryHover
        : theme.color.primary
    : press.isPressed
      ? theme.color.secondaryActive
      : press.isHovered
        ? theme.color.secondaryHover
        : theme.color.popover

  const fg = isSelected
    ? theme.color.primaryForeground
    : press.isHovered
      ? theme.color.foreground
      : theme.color.mutedForeground

  return (
    <box
      width={width}
      height={height}
      alignItems="center"
      justifyContent="center"
      backgroundColor={bg}
      {...press.bind}
    >
      <text fg={fg}>{props.children}</text>
    </box>
  )
}
