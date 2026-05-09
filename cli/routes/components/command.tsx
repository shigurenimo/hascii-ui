import { z } from "zod"
import { HasciiCommand } from "@/registry/ui/hascii/command"
import { factory } from "@/cli/factory"
import { renderComponent } from "@/cli/render-component"
import { customValidator } from "@/cli/utils/custom-validator"

const help = `usage: hascii-ui components command [options]

options:
  --width    palette width      (default: 48)
  --rows     visible row count  (default: 8)
  --help, -h                    show this help

interaction:
  type      filter by label
  ↑ / ↓     move active row
  enter     run`

const schema = z.object({
  width: z.coerce.number().int().positive().default(48),
  rows: z.coerce.number().int().positive().default(8),
})

const ITEMS = [
  { id: "open-file", label: "Open File", hint: "⌘O" },
  { id: "new-window", label: "New Window", hint: "⌘N" },
  { id: "go-to-line", label: "Go to Line", hint: "⌘G" },
  { id: "find", label: "Find in File", hint: "⌘F" },
  { id: "replace", label: "Replace", hint: "⌘R" },
  { id: "settings", label: "Open Settings", hint: "⌘," },
  { id: "toggle-theme", label: "Toggle Theme" },
  { id: "quit", label: "Quit", hint: "⌘Q" },
]

export const commandHandler = factory.createHandlers(
  customValidator("query", schema, help),
  async (c) => {
    const query = c.req.valid("query")

    await renderComponent(<HasciiCommand items={ITEMS} width={query.width} maxRows={query.rows} />)

    return c.text("")
  },
)
