import { z } from "zod"
import { HasciiSpinner, SPINNER_KINDS } from "@/registry/ui/hascii/spinner"
import { factory } from "@/cli/factory"
import { renderComponent } from "@/cli/render-component"
import { customValidator } from "@/cli/utils/custom-validator"

const VARIANT_NAMES = Object.keys(SPINNER_KINDS) as (keyof typeof SPINNER_KINDS)[]

const help = `usage: hascii-ui components spinner [options]

options:
  --variant     ${VARIANT_NAMES.join(" | ")}  (default: braille)
  --interval    frame interval in ms                            (default: 80)
  --help, -h                                                     show this help`

const schema = z.object({
  variant: z
    .enum(VARIANT_NAMES as [string, ...string[]])
    .default("braille")
    .transform((value) => value as keyof typeof SPINNER_KINDS),
  interval: z.coerce.number().int().positive().default(80),
})

export const spinnerHandler = factory.createHandlers(
  customValidator("query", schema, help),
  async (c) => {
    const query = c.req.valid("query")

    await renderComponent(<HasciiSpinner variant={query.variant} intervalMs={query.interval} />)

    return c.text("")
  },
)
