import { z } from "zod"
import { HasciiCanvas } from "@/registry/ui/hascii/canvas"
import { useHasciiCanvas } from "@/registry/hooks/hascii/use-hascii-canvas"
import { factory } from "@/cli/factory"
import { renderComponent } from "@/cli/render-component"
import { customValidator } from "@/cli/utils/custom-validator"

const help = `usage: hascii-ui components canvas [options]

options:
  --rows   grid row count            (default: 8)
  --cols   grid column count         (default: 16)
  --char   brush character           (default: █)
  --fg     brush fg hex              (default: #fafafa)
  --bg     brush bg hex              (default: none)
  --help, -h                         show this help`

const HEX_PATTERN = /^#[0-9a-fA-F]{6}$/

const schema = z.object({
  rows: z.coerce.number().int().positive().default(8),
  cols: z.coerce.number().int().positive().default(16),
  char: z.string().min(1).default("█"),
  fg: z.string().regex(HEX_PATTERN, "must be #rrggbb").default("#fafafa"),
  bg: z.string().regex(HEX_PATTERN, "must be #rrggbb").optional(),
})

type PreviewProps = {
  rows: number
  cols: number
  char: string
  fg: string
  bg?: string
}

function CanvasPreview(props: PreviewProps) {
  const canvas = useHasciiCanvas({ rows: props.rows, cols: props.cols })
  const brush = {
    type: "stamp" as const,
    char: props.char,
    fg: props.fg,
    bg: props.bg ?? null,
  }
  return <HasciiCanvas state={canvas} brush={brush} />
}

export const canvasHandler = factory.createHandlers(
  customValidator("query", schema, help),
  async (c) => {
    const query = c.req.valid("query")

    await renderComponent(
      <CanvasPreview
        rows={query.rows}
        cols={query.cols}
        char={query.char}
        fg={query.fg}
        bg={query.bg}
      />,
    )

    return c.text("")
  },
)
