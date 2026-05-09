import { z } from "zod"
import { HasciiStepper } from "@/registry/ui/hascii/stepper"
import { factory } from "@/cli/factory"
import { renderComponent } from "@/cli/render-component"
import { customValidator } from "@/cli/utils/custom-validator"

const help = `usage: hascii-ui components stepper [options]

options:
  --steps    comma-separated labels   (default: account,profile,confirm)
  --current  index of current step    (default: 1)
  --help, -h                          show this help`

const schema = z.object({
  steps: z.string().default("account,profile,confirm"),
  current: z.coerce.number().int().nonnegative().default(1),
})

export const stepperHandler = factory.createHandlers(
  customValidator("query", schema, help),
  async (c) => {
    const query = c.req.valid("query")

    const steps = query.steps
      .split(",")
      .map((entry) => entry.trim())
      .filter((entry) => entry.length > 0)
      .map((label) => ({ label }))

    await renderComponent(<HasciiStepper steps={steps} current={query.current} />)

    return c.text("")
  },
)
