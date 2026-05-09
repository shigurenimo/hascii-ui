import { z } from "zod"
import { HasciiTable } from "@/registry/ui/hascii/table"
import { factory } from "@/cli/factory"
import { renderComponent } from "@/cli/render-component"
import { customValidator } from "@/cli/utils/custom-validator"

const help = `usage: hascii-ui components table [options]

options:
  --help, -h   show this help`

const schema = z.object({})

const COLUMNS = [
  { key: "name", label: "name" },
  { key: "role", label: "role" },
  { key: "status", label: "status" },
  { key: "joined", label: "joined", align: "right" as const },
]

const ROWS = [
  { name: "ada", role: "engineer", status: "active", joined: "2024-01-12" },
  { name: "linus", role: "ops", status: "active", joined: "2024-04-30" },
  { name: "grace", role: "design", status: "away", joined: "2024-09-04" },
  { name: "alan", role: "research", status: "active", joined: "2025-02-18" },
]

export const tableHandler = factory.createHandlers(
  customValidator("query", schema, help),
  async (_c) => {
    await renderComponent(<HasciiTable columns={COLUMNS} rows={ROWS} />)

    return _c.text("")
  },
)
