import { z } from "zod"
import { HasciiPagination } from "@/registry/ui/hascii/pagination"
import { factory } from "@/cli/factory"
import { renderComponent } from "@/cli/render-component"
import { customValidator } from "@/cli/utils/custom-validator"

const help = `usage: hascii-ui components pagination [options]

options:
  --page        current page (1-based)   (default: 1)
  --pageCount   total page count          (default: 10)
  --help, -h                               show this help`

const schema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  pageCount: z.coerce.number().int().min(1).default(10),
})

export const paginationHandler = factory.createHandlers(
  customValidator("query", schema, help),
  async (c) => {
    const query = c.req.valid("query")

    await renderComponent(<HasciiPagination page={query.page} pageCount={query.pageCount} />)

    return c.text("")
  },
)
