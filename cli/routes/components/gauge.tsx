import { z } from "zod"
import { HasciiGauge } from "@/registry/ui/hascii/gauge"
import { factory } from "@/cli/factory"
import { renderComponent } from "@/cli/render-component"
import { customValidator } from "@/cli/utils/custom-validator"

const help = `usage: hascii-ui components gauge [options]

options:
  --value   current value     (default: 65)
  --min     minimum            (default: 0)
  --max     maximum            (default: 100)
  --width   width in cells     (default: 24)
  --help, -h                   show this help`

const schema = z.object({
  value: z.coerce.number().default(65),
  min: z.coerce.number().default(0),
  max: z.coerce.number().default(100),
  width: z.coerce.number().int().positive().default(24),
})

export const gaugeHandler = factory.createHandlers(
  customValidator("query", schema, help),
  async (c) => {
    const query = c.req.valid("query")

    await renderComponent(
      <HasciiGauge value={query.value} min={query.min} max={query.max} width={query.width} />,
    )

    return c.text("")
  },
)
