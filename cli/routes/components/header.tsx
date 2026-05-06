import { z } from "zod"
import { LayoutPreview } from "@/cli/components/layout-preview"
import { factory } from "@/cli/factory"
import { renderFullscreen } from "@/cli/render-fullscreen"
import { customValidator } from "@/cli/utils/custom-validator"

const help = `usage: hascii-ui components header [options]

options:
  --title    header label                            (default: hascii-ui)
  --height   header height in cells                  (default: 3)
  --help, -h                                          show this help`

const schema = z.object({
  title: z.string().default("hascii-ui"),
  height: z.coerce.number().int().positive().default(3),
})

export const headerHandler = factory.createHandlers(
  customValidator("query", schema, help),
  async (c) => {
    const query = c.req.valid("query")

    await renderFullscreen(
      <LayoutPreview
        title={query.title}
        body=""
        status=""
        headerHeight={query.height}
        footerHeight={0}
      />,
    )

    return c.text("")
  },
)
