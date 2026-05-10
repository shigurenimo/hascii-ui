import type { HasciiTheme } from "@/registry/lib/hascii/theme"
import { useHasciiTheme } from "@/registry/lib/hascii/theme-context"
import { usePressable } from "@/registry/hooks/hascii/use-pressable"

export type Props = {
  color: string
  label?: string
  width?: number
  isActive?: boolean
  isDisabled?: boolean
  onPress?: () => void
}

const pickLabelBg = (
  isDisabled: boolean,
  isActive: boolean,
  isHovered: boolean,
  isPressed: boolean,
  theme: HasciiTheme,
): string => {
  if (isDisabled) return theme.color.muted
  if (isActive) {
    if (isPressed) return theme.color.primaryActive
    if (isHovered) return theme.color.primaryHover
    return theme.color.primary
  }
  if (isPressed) return theme.color.secondaryActive
  if (isHovered) return theme.color.secondaryHover
  return theme.color.popover
}

const pickLabelFg = (
  isDisabled: boolean,
  isActive: boolean,
  isHovered: boolean,
  theme: HasciiTheme,
): string => {
  if (isDisabled) return theme.color.mutedForeground
  if (isActive) return theme.color.primaryForeground
  if (isHovered) return theme.color.foreground
  return theme.color.mutedForeground
}

/** Vertical pressable swatch with an optional label. Use inside HasciiPalette to represent a single color slot. */
export function HasciiPaletteItem(props: Props) {
  const width = props.width ?? 4
  const isActive = props.isActive ?? false
  const isDisabled = props.isDisabled ?? false
  const theme = useHasciiTheme()

  const press = usePressable({ isDisabled, onPress: props.onPress })

  const labelBg = pickLabelBg(isDisabled, isActive, press.isHovered, press.isPressed, theme)
  const labelFg = pickLabelFg(isDisabled, isActive, press.isHovered, theme)

  return (
    <box flexDirection="column" alignItems="center" {...press.bind}>
      <box width={width} height={1} backgroundColor={props.color}>
        <text bg={props.color} fg={props.color}>
          {" ".repeat(width)}
        </text>
      </box>
      {props.label !== undefined ? (
        <box backgroundColor={labelBg} paddingLeft={1} paddingRight={1}>
          <text bg={labelBg} fg={labelFg}>
            {isActive ? <strong>{props.label}</strong> : props.label}
          </text>
        </box>
      ) : null}
    </box>
  )
}
