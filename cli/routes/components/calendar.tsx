import { z } from "zod"
import { HasciiCalendar } from "@/registry/ui/hascii/calendar"
import { factory } from "@/cli/factory"
import { renderComponent } from "@/cli/render-component"
import { customValidator } from "@/cli/utils/custom-validator"

const help = `usage: hascii-ui components calendar [options]

options:
  --year    year   (default: current)
  --month   month 1-12 (default: current)
  --help, -h           show this help`

const today = new Date()

const schema = z.object({
  year: z.coerce.number().int().default(today.getFullYear()),
  month: z.coerce
    .number()
    .int()
    .min(1)
    .max(12)
    .default(today.getMonth() + 1),
})

export const calendarHandler = factory.createHandlers(
  customValidator("query", schema, help),
  async (c) => {
    const query = c.req.valid("query")

    await renderComponent(
      <HasciiCalendar
        year={query.year}
        month={query.month}
        today={{
          year: today.getFullYear(),
          month: today.getMonth() + 1,
          day: today.getDate(),
        }}
      />,
    )

    return c.text("")
  },
)
