import { useState } from "react"
import { HasciiPalette } from "@/registry/ui/hascii/palette"
import { HasciiPaletteItem } from "@/registry/ui/hascii/palette-item"

export type Props = {
  colors: string[]
  labels: string[]
  initialActive: number
  width: number
}

/** Palette preview that tracks the active swatch with useState. */
export function PalettePreview(props: Props) {
  const activeState = useState(props.initialActive)
  const active = activeState[0]
  const setActive = activeState[1]

  return (
    <HasciiPalette>
      {props.colors.map((color, index) => (
        <HasciiPaletteItem
          key={`${color}-${index}`}
          color={color}
          label={props.labels[index] ?? ""}
          width={props.width}
          isActive={index === active}
          onPress={() => setActive(index)}
        />
      ))}
    </HasciiPalette>
  )
}
