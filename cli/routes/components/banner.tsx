import { z } from "zod"
import { HasciiBanner } from "@/registry/ui/hascii/banner"
import { factory } from "@/cli/factory"
import { renderComponent } from "@/cli/render-component"
import { customValidator } from "@/cli/utils/custom-validator"

const help = `usage: hascii-ui components banner [options]

options:
  --text   text to render               (default: HASCII)
  --font   tiny|block|shade|slick|huge|grid|pallet  (default: tiny)
  --help, -h                            show this help`

const schema = z.object({
  text: z.string().default("HASCII"),
  font: z.enum(["tiny", "block", "shade", "slick", "huge", "grid", "pallet"]).default("tiny"),
})

export const bannerHandler = factory.createHandlers(
  customValidator("query", schema, help),
  async (c) => {
    const query = c.req.valid("query")

    await renderComponent(<HasciiBanner text={query.text} font={query.font} />)

    return c.text("")
  },
)
