import { z } from "zod"
import { PalettePreview } from "@/cli/components/palette-preview"
import { factory } from "@/cli/factory"
import { renderComponent } from "@/cli/render-component"
import { customValidator } from "@/cli/utils/custom-validator"

const help = `usage: hascii-ui components palette [options]

options:
  --colors   comma-separated hex colors    (default: built-in 8-color demo)
  --labels   comma-separated item labels   (default: 01..N)
  --active   1-based index of active item  (default: 1)
  --width    swatch width in cells         (default: 4)
  --help, -h                                show this help`

const DEFAULT_COLORS = [
  "#000000",
  "#cc0000",
  "#00cc00",
  "#cccc00",
  "#0000cc",
  "#cc00cc",
  "#00cccc",
  "#cccccc",
]

const HEX_PATTERN = /^#[0-9a-fA-F]{6}$/

const schema = z.object({
  colors: z.string().optional(),
  labels: z.string().optional(),
  active: z.coerce.number().int().min(1).default(1),
  width: z.coerce.number().int().positive().default(4),
})

const splitCsv = (raw: string | undefined): string[] => {
  if (!raw) return []
  const parsed: string[] = []
  for (const segment of raw.split(",")) {
    const value = segment.trim()
    if (value) parsed.push(value)
  }
  return parsed
}

const toColors = (raw: string | undefined): string[] => {
  const parsed = splitCsv(raw)
  if (parsed.length === 0) return DEFAULT_COLORS
  for (const value of parsed) {
    if (!HEX_PATTERN.test(value)) {
      throw new Error(`invalid hex: ${value}`)
    }
  }
  return parsed
}

const toLabels = (raw: string | undefined, count: number): string[] => {
  const parsed = splitCsv(raw)
  if (parsed.length > 0) return parsed
  const labels: string[] = []
  for (let i = 1; i <= count; i++) {
    labels.push(String(i).padStart(2, "0"))
  }
  return labels
}

export const paletteHandler = factory.createHandlers(
  customValidator("query", schema, help),
  async (c) => {
    const query = c.req.valid("query")

    const colors = toColors(query.colors)
    const labels = toLabels(query.labels, colors.length)
    const initialActive = Math.max(0, Math.min(colors.length - 1, query.active - 1))

    await renderComponent(
      <PalettePreview
        colors={colors}
        labels={labels}
        initialActive={initialActive}
        width={query.width}
      />,
    )

    return c.text("")
  },
)
