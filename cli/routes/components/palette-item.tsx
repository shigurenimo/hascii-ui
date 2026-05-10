import { z } from "zod"
import { HasciiPaletteItem } from "@/registry/ui/hascii/palette-item"
import { factory } from "@/cli/factory"
import { renderComponent } from "@/cli/render-component"
import { customValidator } from "@/cli/utils/custom-validator"

const help = `usage: hascii-ui components palette-item [options]

options:
  --color    hex color of the swatch                 (default: #f97316)
  --label    label rendered under the swatch         (default: 01)
  --width    swatch width in cells                   (default: 4)
  --active   render the item in active state         (default: false)
  --disabled render the item disabled                (default: false)
  --help, -h                                          show this help`

const HEX_PATTERN = /^#[0-9a-fA-F]{6}$/

const schema = z.object({
  color: z.string().regex(HEX_PATTERN, "must be #rrggbb").default("#f97316"),
  label: z.string().default("01"),
  width: z.coerce.number().int().positive().default(4),
  active: z.coerce.boolean().default(false),
  disabled: z.coerce.boolean().default(false),
})

export const paletteItemHandler = factory.createHandlers(
  customValidator("query", schema, help),
  async (c) => {
    const query = c.req.valid("query")

    await renderComponent(
      <HasciiPaletteItem
        color={query.color}
        label={query.label}
        width={query.width}
        isActive={query.active}
        isDisabled={query.disabled}
      />,
    )

    return c.text("")
  },
)
