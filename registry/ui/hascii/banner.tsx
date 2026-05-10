import { useHasciiTheme } from "@/registry/lib/hascii/theme-context"

export type BannerFont = "tiny" | "block" | "shade" | "slick" | "huge" | "grid" | "pallet"

export type Props = {
  text: string
  font?: BannerFont
  color?: string
}

/** Large display text rendered with OpenTUI's ASCIIFontRenderable. Pick a font from tiny/block/shade/slick/huge/grid/pallet. */
export function HasciiBanner(props: Props) {
  const font = props.font ?? "tiny"
  const theme = useHasciiTheme()
  const color = props.color ?? theme.color.foreground

  return <ascii-font text={props.text} font={font} color={color} />
}
