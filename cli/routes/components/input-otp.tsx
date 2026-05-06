/** @jsxImportSource @opentui/react */
import { z } from "zod"
import { HasciiInputOtp } from "@/registry/ui/hascii/input-otp"
import { factory } from "@/cli/factory"
import { renderComponent } from "@/cli/render-component"
import { customValidator } from "@/cli/utils/custom-validator"

const help = `usage: hascii-ui components input-otp [options]

options:
  --length     slot count           (default: 6)
  --value      pre-filled digits     (default: "")
  --help, -h                          show this help`

const schema = z.object({
  length: z.coerce.number().int().min(1).max(12).default(6),
  value: z.string().default(""),
})

export const inputOtpHandler = factory.createHandlers(
  customValidator("query", schema, help),
  async (c) => {
    const query = c.req.valid("query")

    await renderComponent(<HasciiInputOtp length={query.length} defaultValue={query.value} />)

    return c.text("")
  },
)
