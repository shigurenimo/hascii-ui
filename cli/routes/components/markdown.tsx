import { z } from "zod"
import { HasciiMarkdown } from "@/registry/ui/hascii/markdown"
import { factory } from "@/cli/factory"
import { renderComponent } from "@/cli/render-component"
import { customValidator } from "@/cli/utils/custom-validator"

const help = `usage: hascii-ui components markdown [options]

options:
  --help, -h    show this help`

const schema = z.object({})

const SAMPLE = `# hascii-ui

Terminal UI components for **OpenTUI**.

- shadcn registry compatible
- DESIGN.md driven theme
- works with bun + react

\`\`\`ts
import { HasciiButton } from "@/components/ui/hascii/button"
\`\`\``

export const markdownHandler = factory.createHandlers(
  customValidator("query", schema, help),
  async (c) => {
    await renderComponent(<HasciiMarkdown content={SAMPLE} width={56} height={14} />)

    return c.text("")
  },
)
