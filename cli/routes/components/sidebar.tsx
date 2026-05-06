import { z } from "zod"
import { SidebarPreview } from "@/cli/components/sidebar-preview"
import { factory } from "@/cli/factory"
import { renderFullscreen } from "@/cli/render-fullscreen"
import { customValidator } from "@/cli/utils/custom-validator"

const help = `usage: hascii-ui components sidebar [options]

options:
  --title    sidebar title rendered in the header   (default: hascii-ui)
  --items    comma-separated menu item labels       (default: built-in demo)
  --active   1-based index of the active item       (default: 1)
  --width    sidebar width in cells                  (default: 24)
  --help, -h                                          show this help`

const DEFAULT_ITEMS = [
  "Dashboard",
  "Inbox",
  "Calendar",
  "Files",
  "Projects",
  "Team",
  "Settings",
  "Help",
  "Sign out",
  "Filler 1",
  "Filler 2",
  "Filler 3",
  "Filler 4",
  "Filler 5",
  "Filler 6",
  "Filler 7",
]

const schema = z.object({
  title: z.string().default("hascii-ui"),
  items: z.string().optional(),
  active: z.coerce.number().int().min(1).default(1),
  width: z.coerce.number().int().positive().default(24),
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

export const sidebarHandler = factory.createHandlers(
  customValidator("query", schema, help),
  async (c) => {
    const query = c.req.valid("query")
    const items = toItems(query.items)
    const initialActive = Math.min(query.active - 1, items.length - 1)

    await renderFullscreen(
      <SidebarPreview
        title={query.title}
        items={items}
        initialActive={initialActive}
        width={query.width}
      />,
    )

    return c.text("")
  },
)
