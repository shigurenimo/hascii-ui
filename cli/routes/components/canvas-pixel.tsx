import { z } from "zod"
import { HasciiCanvasPixel } from "@/registry/ui/hascii/canvas-pixel"
import { useHasciiCanvasPixel } from "@/registry/hooks/hascii/use-hascii-canvas-pixel"
import { factory } from "@/cli/factory"
import { renderComponent } from "@/cli/render-component"
import { customValidator } from "@/cli/utils/custom-validator"

const help = `usage: hascii-ui components canvas-pixel [options]

options:
  --rows           grid row count            (default: 8)
  --cols           grid column count         (default: 8)
  --pixel-width    cell width in cells       (default: 4)
  --pixel-height   cell height in cells      (default: 2)
  --color          fill color (#rrggbb)      (default: #ef4444)
  --help, -h                                 show this help`

const HEX_PATTERN = /^#[0-9a-fA-F]{6}$/

const schema = z.object({
  rows: z.coerce.number().int().positive().default(8),
  cols: z.coerce.number().int().positive().default(8),
  "pixel-width": z.coerce.number().int().positive().default(4),
  "pixel-height": z.coerce.number().int().positive().default(2),
  color: z.string().regex(HEX_PATTERN, "must be #rrggbb").default("#ef4444"),
})

type PreviewProps = {
  rows: number
  cols: number
  color: string
  pixelWidth: number
  pixelHeight: number
}

function CanvasPixelPreview(props: PreviewProps) {
  const canvas = useHasciiCanvasPixel({ rows: props.rows, cols: props.cols, brush: props.color })
  return (
    <HasciiCanvasPixel
      state={canvas}
      pixelWidth={props.pixelWidth}
      pixelHeight={props.pixelHeight}
    />
  )
}

export const canvasPixelHandler = factory.createHandlers(
  customValidator("query", schema, help),
  async (c) => {
    const query = c.req.valid("query")

    await renderComponent(
      <CanvasPixelPreview
        rows={query.rows}
        cols={query.cols}
        color={query.color}
        pixelWidth={query["pixel-width"]}
        pixelHeight={query["pixel-height"]}
      />,
    )

    return c.text("")
  },
)
