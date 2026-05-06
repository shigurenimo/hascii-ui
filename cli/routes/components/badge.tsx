import { z } from "zod"
import { HasciiBadge } from "@/registry/ui/hascii/badge"
import { factory } from "@/cli/factory"
import { renderComponent } from "@/cli/render-component"
import { customValidator } from "@/cli/utils/custom-validator"

const help = `usage: hascii-ui components badge [options]

options:
  --variant   default | secondary | outline | destructive   (default: default)
  --label     badge label                                    (default: badge)
  --help, -h                                                  show this help`

const schema = z.object({
  variant: z.enum(["default", "secondary", "outline", "destructive"]).default("default"),
  label: z.string().default("badge"),
})

export const badgeHandler = factory.createHandlers(
  customValidator("query", schema, help),
  async (c) => {
    const query = c.req.valid("query")

    await renderComponent(<HasciiBadge variant={query.variant}>{query.label}</HasciiBadge>)

    return c.text("")
  },
)
