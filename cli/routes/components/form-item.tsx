import { z } from "zod"
import { HasciiFormItem } from "@/registry/ui/hascii/form-item"
import { HasciiInput } from "@/registry/ui/hascii/input"
import { factory } from "@/cli/factory"
import { renderComponent } from "@/cli/render-component"
import { customValidator } from "@/cli/utils/custom-validator"

const help = `usage: hascii-ui components form-item [options]

options:
  --label        label text                       (default: Email)
  --direction    column | row                     (default: column)
  --width        outer width in cells             (default: 36)
  --placeholder  placeholder for the input        (default: you@example.com)
  --help, -h                                       show this help`

const schema = z.object({
  label: z.string().default("Email"),
  direction: z.enum(["column", "row"]).default("column"),
  width: z.coerce.number().int().positive().default(36),
  placeholder: z.string().default("you@example.com"),
})

export const formItemHandler = factory.createHandlers(
  customValidator("query", schema, help),
  async (c) => {
    const query = c.req.valid("query")

    await renderComponent(
      <HasciiFormItem label={query.label} direction={query.direction} width={query.width}>
        <HasciiInput placeholder={query.placeholder} width={query.width} />
      </HasciiFormItem>,
    )

    return c.text("")
  },
)
