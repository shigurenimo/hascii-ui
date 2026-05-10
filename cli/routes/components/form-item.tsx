import { z } from "zod"
import { HasciiFormItem } from "@/registry/ui/hascii/form-item"
import { HasciiInput } from "@/registry/ui/hascii/input"
import { factory } from "@/cli/factory"
import { renderComponent } from "@/cli/render-component"
import { customValidator } from "@/cli/utils/custom-validator"

const help = `usage: hascii-ui components form-item [options]

options:
  --label       label text shown on the left   (default: Email)
  --placeholder placeholder for the input       (default: you@example.com)
  --label-width label column width              (default: 12)
  --help, -h                                    show this help`

const schema = z.object({
  label: z.string().default("Email"),
  placeholder: z.string().default("you@example.com"),
  "label-width": z.coerce.number().int().positive().default(12),
})

export const formItemHandler = factory.createHandlers(
  customValidator("query", schema, help),
  async (c) => {
    const query = c.req.valid("query")

    await renderComponent(
      <HasciiFormItem label={query.label} labelWidth={query["label-width"]}>
        <HasciiInput placeholder={query.placeholder} />
      </HasciiFormItem>,
    )

    return c.text("")
  },
)
