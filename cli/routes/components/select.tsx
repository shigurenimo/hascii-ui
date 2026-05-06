/** @jsxImportSource @opentui/react */
import { z } from "zod"
import { HasciiSelect } from "@/registry/ui/hascii/select"
import { factory } from "@/cli/factory"
import { renderComponent } from "@/cli/render-component"
import { customValidator } from "@/cli/utils/custom-validator"

const help = `usage: hascii-ui components select [options]

options:
  --options   comma-separated option names    (default: built-in demo set)
  --width     width in cells                   (default: 36)
  --height    height in cells                   (default: 16)
  --focused                                     accept arrow-key navigation
  --help, -h                                    show this help`

const DEFAULT_OPTIONS = [
  {
    name: "Default",
    description: "Render with primary background",
    value: "default",
  },
  { name: "Secondary", description: "Muted slate fill", value: "secondary" },
  {
    name: "Outline",
    description: "Bordered, transparent fill",
    value: "outline",
  },
  { name: "Ghost", description: "No border, hover only", value: "ghost" },
  {
    name: "Destructive",
    description: "Red, irreversible",
    value: "destructive",
  },
  { name: "Link", description: "Inline-text affordance", value: "link" },
  { name: "Icon", description: "Compact icon-only target", value: "icon" },
  {
    name: "Subtle",
    description: "Lowest-emphasis variant",
    value: "subtle",
  },
]

const schema = z.object({
  options: z.string().optional(),
  width: z.coerce.number().int().positive().default(36),
  height: z.coerce.number().int().positive().default(16),
  focused: z.coerce.boolean().default(true),
})

const toOptions = (raw: string | undefined) => {
  if (!raw) return DEFAULT_OPTIONS

  const parsed = []
  for (const segment of raw.split(",")) {
    const name = segment.trim()
    parsed.push({ name, description: "", value: name })
  }
  return parsed
}

export const selectHandler = factory.createHandlers(
  customValidator("query", schema, help),
  async (c) => {
    const query = c.req.valid("query")
    const options = toOptions(query.options)

    await renderComponent(
      <HasciiSelect
        options={options}
        width={query.width}
        height={query.height}
        isFocused={query.focused}
      />,
    )

    return c.text("")
  },
)
