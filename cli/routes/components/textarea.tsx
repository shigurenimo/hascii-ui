import { z } from "zod"
import { HasciiTextarea } from "@/registry/ui/hascii/textarea"
import { factory } from "@/cli/factory"
import { renderComponent } from "@/cli/render-component"
import { customValidator } from "@/cli/utils/custom-validator"

const help = `usage: hascii-ui components textarea [options]

options:
  --variant     default | outline   (default: default)
  --placeholder placeholder text    (default: write something…)
  --initial     initial content     (default: empty)
  --width       width in cells      (default: 48)
  --height      height in cells     (default: 8)
  --help, -h                        show this help`

const schema = z.object({
  variant: z.enum(["default", "outline"]).default("default"),
  placeholder: z.string().default("write something…"),
  initial: z.string().default(""),
  width: z.coerce.number().int().positive().default(48),
  height: z.coerce.number().int().positive().default(8),
})

export const textareaHandler = factory.createHandlers(
  customValidator("query", schema, help),
  async (c) => {
    const query = c.req.valid("query")

    await renderComponent(
      <HasciiTextarea
        variant={query.variant}
        placeholder={query.placeholder}
        initialValue={query.initial}
        width={query.width}
        height={query.height}
      />,
    )

    return c.text("")
  },
)
