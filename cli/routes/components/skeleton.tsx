/** @jsxImportSource @opentui/react */
import { z } from "zod"
import { HasciiSkeleton } from "@/registry/ui/hascii/skeleton"
import { factory } from "@/cli/factory"
import { renderComponent } from "@/cli/render-component"
import { customValidator } from "@/cli/utils/custom-validator"

const help = `usage: hascii-ui components skeleton [options]

options:
  --width     width in cells    (default: 32)
  --height    height in cells   (default: 1)
  --help, -h                    show this help`

const schema = z.object({
  width: z.coerce.number().int().positive().default(32),
  height: z.coerce.number().int().positive().default(1),
})

export const skeletonHandler = factory.createHandlers(
  customValidator("query", schema, help),
  async (c) => {
    const query = c.req.valid("query")
    await renderComponent(<HasciiSkeleton width={query.width} height={query.height} />)
    return c.text("")
  },
)
