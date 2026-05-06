import { z } from "zod"
import { LayoutPreview } from "@/cli/components/layout-preview"
import { factory } from "@/cli/factory"
import { renderFullscreen } from "@/cli/render-fullscreen"
import { customValidator } from "@/cli/utils/custom-validator"

const help = `usage: hascii-ui components footer [options]

options:
  --status   footer label                            (default: ready)
  --height   footer height in cells                  (default: 3)
  --help, -h                                          show this help`

const schema = z.object({
  status: z.string().default("ready"),
  height: z.coerce.number().int().positive().default(3),
})

export const footerHandler = factory.createHandlers(
  customValidator("query", schema, help),
  async (c) => {
    const query = c.req.valid("query")

    await renderFullscreen(
      <LayoutPreview
        title=""
        body=""
        status={query.status}
        headerHeight={0}
        footerHeight={query.height}
      />,
    )

    return c.text("")
  },
)
