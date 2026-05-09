import { z } from "zod"
import { HasciiCheckbox } from "@/registry/ui/hascii/checkbox"
import { factory } from "@/cli/factory"
import { renderComponent } from "@/cli/render-component"
import { customValidator } from "@/cli/utils/custom-validator"

const help = `usage: hascii-ui components checkbox [options]

options:
  --label    label rendered next to the box   (default: accept terms)
  --checked  start checked                    (default: false)
  --help, -h                                  show this help`

const schema = z.object({
  label: z.string().default("accept terms"),
  checked: z.coerce.boolean().default(false),
})

export const checkboxHandler = factory.createHandlers(
  customValidator("query", schema, help),
  async (c) => {
    const query = c.req.valid("query")

    await renderComponent(
      <HasciiCheckbox defaultChecked={query.checked}>{query.label}</HasciiCheckbox>,
    )

    return c.text("")
  },
)
