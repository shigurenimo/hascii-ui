/** @jsxImportSource @opentui/react */
import { z } from "zod"
import { HasciiTabs } from "@/registry/ui/hascii/tabs"
import { factory } from "@/cli/factory"
import { renderComponent } from "@/cli/render-component"
import { customValidator } from "@/cli/utils/custom-validator"

const help = `usage: hascii-ui components tabs [options]

options:
  --items   comma-separated tab labels   (default: built-in demo)
  --value   active tab label             (default: first item)
  --help, -h                              show this help`

const DEFAULT_ITEMS = ["Overview", "Settings", "Logs"]

const schema = z.object({
  items: z.string().optional(),
  value: z.string().optional(),
})

const toItems = (raw: string | undefined): string[] => {
  if (!raw) return DEFAULT_ITEMS

  const parsed: string[] = []
  for (const segment of raw.split(",")) {
    const name = segment.trim()
    if (name) parsed.push(name)
  }

  return parsed
}

export const tabsHandler = factory.createHandlers(
  customValidator("query", schema, help),
  async (c) => {
    const query = c.req.valid("query")
    const labels = toItems(query.items)
    const items = labels.map((label) => ({ value: label, label }))
    const initial = query.value ?? items[0]?.value ?? ""

    await renderComponent(<HasciiTabs items={items} defaultValue={initial} />)

    return c.text("")
  },
)
