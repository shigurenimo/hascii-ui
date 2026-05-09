import { z } from "zod"
import { HasciiBreadcrumb } from "@/registry/ui/hascii/breadcrumb"
import { factory } from "@/cli/factory"
import { renderComponent } from "@/cli/render-component"
import { customValidator } from "@/cli/utils/custom-validator"

const help = `usage: hascii-ui components breadcrumb [options]

options:
  --items     comma-separated labels   (default: home,docs,components,breadcrumb)
  --separator separator glyph          (default: ›)
  --help, -h                           show this help`

const schema = z.object({
  items: z.string().default("home,docs,components,breadcrumb"),
  separator: z.string().default("›"),
})

export const breadcrumbHandler = factory.createHandlers(
  customValidator("query", schema, help),
  async (c) => {
    const query = c.req.valid("query")

    const items = query.items
      .split(",")
      .map((entry) => entry.trim())
      .filter((entry) => entry.length > 0)
      .map((label) => ({ label }))

    await renderComponent(<HasciiBreadcrumb items={items} separator={query.separator} />)

    return c.text("")
  },
)
