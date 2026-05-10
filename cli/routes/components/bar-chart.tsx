import { z } from "zod"
import { HasciiBarChart } from "@/registry/ui/hascii/bar-chart"
import { factory } from "@/cli/factory"
import { renderComponent } from "@/cli/render-component"
import { customValidator } from "@/cli/utils/custom-validator"

const help = `usage: hascii-ui components bar-chart [options]

options:
  --width   total width in cells   (default: 48)
  --help, -h                       show this help`

const schema = z.object({
  width: z.coerce.number().int().positive().default(48),
})

const ITEMS = [
  { label: "swift", value: 142 },
  { label: "rust", value: 98 },
  { label: "go", value: 76 },
  { label: "typescript", value: 64 },
  { label: "python", value: 51 },
  { label: "elixir", value: 22 },
]

export const barChartHandler = factory.createHandlers(
  customValidator("query", schema, help),
  async (c) => {
    const query = c.req.valid("query")

    await renderComponent(<HasciiBarChart items={ITEMS} width={query.width} />)

    return c.text("")
  },
)
