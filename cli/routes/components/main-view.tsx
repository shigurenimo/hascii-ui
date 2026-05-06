import { z } from "zod"
import { LayoutPreview } from "@/cli/components/layout-preview"
import { factory } from "@/cli/factory"
import { renderFullscreen } from "@/cli/render-fullscreen"
import { customValidator } from "@/cli/utils/custom-validator"

const help = `usage: hascii-ui components main-view [options]

options:
  --title    header label                            (default: hascii-ui)
  --body     main view body text                     (default: Main content area)
  --status   footer label                            (default: ready)
  --help, -h                                          show this help`

const schema = z.object({
  title: z.string().default("hascii-ui"),
  body: z.string().default("Main content area"),
  status: z.string().default("ready"),
})

export const mainViewHandler = factory.createHandlers(
  customValidator("query", schema, help),
  async (c) => {
    const query = c.req.valid("query")

    await renderFullscreen(
      <LayoutPreview
        title={query.title}
        body={query.body}
        status={query.status}
        headerHeight={3}
        footerHeight={3}
      />,
    )

    return c.text("")
  },
)
