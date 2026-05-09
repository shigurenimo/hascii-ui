import { z } from "zod"
import { HasciiSwitch } from "@/registry/ui/hascii/switch"
import { factory } from "@/cli/factory"
import { renderComponent } from "@/cli/render-component"
import { customValidator } from "@/cli/utils/custom-validator"

const help = `usage: hascii-ui components switch [options]

options:
  --checked  start checked   (default: false)
  --help, -h                 show this help`

const schema = z.object({
  checked: z.coerce.boolean().default(false),
})

export const switchHandler = factory.createHandlers(
  customValidator("query", schema, help),
  async (c) => {
    const query = c.req.valid("query")

    await renderComponent(<HasciiSwitch defaultChecked={query.checked} />)

    return c.text("")
  },
)
