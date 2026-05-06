import { z } from "zod"
import { HasciiInput } from "@/registry/ui/hascii/input"
import { factory } from "@/cli/factory"
import { renderComponent } from "@/cli/render-component"
import { customValidator } from "@/cli/utils/custom-validator"

const help = `usage: hascii-ui components input [options]

options:
  --variant      default | outline             (default: default)
  --placeholder  placeholder text              (default: "")
  --value        initial value                 (default: "")
  --width        width in cells                (default: 32)
  --focused                                     render in focused state
  --help, -h                                    show this help`

const schema = z.object({
  variant: z.enum(["default", "outline"]).default("default"),
  placeholder: z.string().default(""),
  value: z.string().default(""),
  width: z.coerce.number().int().positive().default(32),
  focused: z.coerce.boolean().default(true),
})

export const inputHandler = factory.createHandlers(
  customValidator("query", schema, help),
  async (c) => {
    const query = c.req.valid("query")

    await renderComponent(
      <HasciiInput
        variant={query.variant}
        placeholder={query.placeholder}
        value={query.value}
        width={query.width}
        isFocused={query.focused}
      />,
    )

    return c.text("")
  },
)
