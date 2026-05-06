import { z } from "zod"
import { HasciiSeparator } from "@/registry/ui/hascii/separator"
import { factory } from "@/cli/factory"
import { renderComponent } from "@/cli/render-component"
import { customValidator } from "@/cli/utils/custom-validator"

const help = `usage: hascii-ui components separator [options]

options:
  --orientation  horizontal | vertical   (default: horizontal)
  --length       length in cells          (default: 32 for horizontal, 8 for vertical)
  --help, -h                              show this help`

const schema = z.object({
  orientation: z.enum(["horizontal", "vertical"]).default("horizontal"),
  length: z.coerce.number().int().positive().optional(),
})

export const separatorHandler = factory.createHandlers(
  customValidator("query", schema, help),
  async (c) => {
    const query = c.req.valid("query")

    await renderComponent(<HasciiSeparator orientation={query.orientation} length={query.length} />)

    return c.text("")
  },
)
