import { z } from "zod"
import { HasciiCanvasPixelCell } from "@/registry/ui/hascii/canvas-pixel-cell"
import { factory } from "@/cli/factory"
import { renderComponent } from "@/cli/render-component"
import { customValidator } from "@/cli/utils/custom-validator"

const help = `usage: hascii-ui components canvas-pixel-cell [options]

options:
  --color         cell color                           (default: #f97316)
  --width         cell width in cells                  (default: 6)
  --height        cell height in cells                 (default: 3)
  --cursor        overlay the cursor mark              (default: false)
  --cursor-color  hex color of the cursor              (default: theme foreground)
  --cursor-char   single character for the cursor      (default: +)
  --help, -h                                            show this help`

const HEX_PATTERN = /^#[0-9a-fA-F]{6}$/

const schema = z.object({
  color: z.string().regex(HEX_PATTERN, "must be #rrggbb").default("#f97316"),
  width: z.coerce.number().int().positive().default(6),
  height: z.coerce.number().int().positive().default(3),
  cursor: z.coerce.boolean().default(false),
  "cursor-color": z.string().regex(HEX_PATTERN, "must be #rrggbb").optional(),
  "cursor-char": z.string().min(1).max(1).default("+"),
})

export const canvasPixelCellHandler = factory.createHandlers(
  customValidator("query", schema, help),
  async (c) => {
    const query = c.req.valid("query")

    await renderComponent(
      <HasciiCanvasPixelCell
        color={query.color}
        width={query.width}
        height={query.height}
        showCursor={query.cursor}
        cursorColor={query["cursor-color"]}
        cursorChar={query["cursor-char"]}
      />,
    )

    return c.text("")
  },
)
