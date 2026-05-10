import { z } from "zod"
import { HasciiCanvasCell } from "@/registry/ui/hascii/canvas-cell"
import { factory } from "@/cli/factory"
import { renderComponent } from "@/cli/render-component"
import { customValidator } from "@/cli/utils/custom-validator"

const help = `usage: hascii-ui components canvas-cell [options]

options:
  --char    cell character     (default: █)
  --fg      foreground hex     (default: #fafafa)
  --bg      background hex     (default: none)
  --help, -h                   show this help`

const HEX_PATTERN = /^#[0-9a-fA-F]{6}$/

const schema = z.object({
  char: z.string().min(1).default("█"),
  fg: z.string().regex(HEX_PATTERN, "must be #rrggbb").default("#fafafa"),
  bg: z.string().regex(HEX_PATTERN, "must be #rrggbb").optional(),
})

export const canvasCellHandler = factory.createHandlers(
  customValidator("query", schema, help),
  async (c) => {
    const query = c.req.valid("query")

    await renderComponent(<HasciiCanvasCell char={query.char} fg={query.fg} bg={query.bg} />)

    return c.text("")
  },
)
