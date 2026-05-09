import { z } from "zod"
import { HasciiTree } from "@/registry/ui/hascii/tree"
import { factory } from "@/cli/factory"
import { renderComponent } from "@/cli/render-component"
import { customValidator } from "@/cli/utils/custom-validator"

const help = `usage: hascii-ui components tree [options]

options:
  --indent   cells per nesting level   (default: 2)
  --help, -h                           show this help`

const schema = z.object({
  indent: z.coerce.number().int().nonnegative().default(2),
})

const NODES = [
  {
    id: "Main",
    label: "Main",
    children: [
      { id: "Main/hello.py", label: "hello.py" },
      { id: "Main/test.py", label: "test.py" },
    ],
  },
  {
    id: "Text",
    label: "Text",
    children: [{ id: "Text/world.txt", label: "world.txt" }],
  },
]

export const treeHandler = factory.createHandlers(
  customValidator("query", schema, help),
  async (c) => {
    const query = c.req.valid("query")

    await renderComponent(<HasciiTree nodes={NODES} indent={query.indent} />)

    return c.text("")
  },
)
