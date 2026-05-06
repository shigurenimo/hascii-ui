/** @jsxImportSource @opentui/react */
import { z } from "zod"
import { ProgressPreview } from "@/cli/components/progress-preview"
import { factory } from "@/cli/factory"
import { renderComponent } from "@/cli/render-component"
import { customValidator } from "@/cli/utils/custom-validator"

const help = `usage: hascii-ui components progress [options]

options:
  --value     initial fraction filled, 0..1   (default: 0.4)
  --width     width in cells                   (default: 32)
  --step      keyboard increment, 0..1         (default: 0.05)
  --help, -h                                    show this help

interaction:
  ← / →   adjust value by --step
  0       set to 0
  9       set to 100%`

const schema = z.object({
  value: z.coerce.number().min(0).max(1).default(0.4),
  width: z.coerce.number().int().positive().default(32),
  step: z.coerce.number().min(0).max(1).default(0.05),
})

export const progressHandler = factory.createHandlers(
  customValidator("query", schema, help),
  async (c) => {
    const query = c.req.valid("query")

    await renderComponent(
      <ProgressPreview initialValue={query.value} width={query.width} step={query.step} />,
    )

    return c.text("")
  },
)
