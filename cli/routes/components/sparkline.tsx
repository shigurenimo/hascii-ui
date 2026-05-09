import { z } from "zod"
import { HasciiSparkline } from "@/registry/ui/hascii/sparkline"
import { factory } from "@/cli/factory"
import { renderComponent } from "@/cli/render-component"
import { customValidator } from "@/cli/utils/custom-validator"

const help = `usage: hascii-ui components sparkline [options]

options:
  --values   comma-separated numbers   (default: 1,3,2,5,4,7,6,8,4,2,5,7)
  --width    sample width              (default: 32)
  --help, -h                           show this help`

const schema = z.object({
  values: z.string().default("1,3,2,5,4,7,6,8,4,2,5,7"),
  width: z.coerce.number().int().positive().default(32),
})

const parseValues = (raw: string): number[] => {
  const parts = raw.split(",")
  const values: number[] = []

  for (const part of parts) {
    const trimmed = part.trim()
    if (trimmed.length === 0) continue

    const value = Number(trimmed)
    if (!Number.isFinite(value)) continue

    values.push(value)
  }

  return values
}

export const sparklineHandler = factory.createHandlers(
  customValidator("query", schema, help),
  async (c) => {
    const query = c.req.valid("query")

    const values = parseValues(query.values)

    await renderComponent(<HasciiSparkline values={values} width={query.width} />)

    return c.text("")
  },
)
