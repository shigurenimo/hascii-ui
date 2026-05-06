import { z } from "zod"
import { DialogPreview } from "@/cli/components/dialog-preview"
import { factory } from "@/cli/factory"
import { renderComponent } from "@/cli/render-component"
import { customValidator } from "@/cli/utils/custom-validator"

const help = `usage: hascii-ui components dialog [options]

options:
  --variant       default | outline       (default: default)
  --title         dialog title             (default: Are you sure?)
  --description   secondary description    (default: Lorem ipsum)
  --body          body paragraph           (default: empty)
  --confirm       confirm button label     (default: Confirm)
  --cancel        cancel button label      (default: Cancel)
  --width         dialog width in cells    (default: 48)
  --help, -h                                show this help`

const schema = z.object({
  variant: z.enum(["default", "outline"]).default("default"),
  title: z.string().default("Are you sure?"),
  description: z.string().default("This action cannot be undone. Please confirm to proceed."),
  body: z.string().default(""),
  confirm: z.string().default("Confirm"),
  cancel: z.string().default("Cancel"),
  width: z.coerce.number().int().positive().default(48),
})

export const dialogHandler = factory.createHandlers(
  customValidator("query", schema, help),
  async (c) => {
    const query = c.req.valid("query")

    await renderComponent(
      <DialogPreview
        variant={query.variant}
        title={query.title}
        description={query.description}
        body={query.body}
        confirm={query.confirm}
        cancel={query.cancel}
        width={query.width}
      />,
    )

    return c.text("")
  },
)
