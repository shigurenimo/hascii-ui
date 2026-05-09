import { z } from "zod"
import { HasciiSlider } from "@/registry/ui/hascii/slider"
import { factory } from "@/cli/factory"
import { renderComponent } from "@/cli/render-component"
import { customValidator } from "@/cli/utils/custom-validator"

const help = `usage: hascii-ui components slider [options]

options:
  --value    initial value           (default: 50)
  --min      minimum value           (default: 0)
  --max      maximum value           (default: 100)
  --width    width in cells          (default: 32)
  --help, -h                         show this help

interaction:
  click + drag to move the thumb`

const schema = z.object({
  value: z.coerce.number().default(50),
  min: z.coerce.number().default(0),
  max: z.coerce.number().default(100),
  width: z.coerce.number().int().positive().default(32),
})

export const sliderHandler = factory.createHandlers(
  customValidator("query", schema, help),
  async (c) => {
    const query = c.req.valid("query")

    await renderComponent(
      <HasciiSlider
        defaultValue={query.value}
        min={query.min}
        max={query.max}
        width={query.width}
      />,
    )

    return c.text("")
  },
)
