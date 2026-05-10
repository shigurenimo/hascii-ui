import { z } from "zod"
import { HasciiCode } from "@/registry/ui/hascii/code"
import { factory } from "@/cli/factory"
import { renderComponent } from "@/cli/render-component"
import { customValidator } from "@/cli/utils/custom-validator"

const help = `usage: hascii-ui components code [options]

options:
  --filetype  language hint    (default: typescript)
  --help, -h                   show this help`

const schema = z.object({
  filetype: z.string().default("typescript"),
})

const SAMPLE = `import { HasciiButton } from "@/components/ui/hascii/button"

export function App() {
  return <HasciiButton>Hello</HasciiButton>
}`

export const codeHandler = factory.createHandlers(
  customValidator("query", schema, help),
  async (c) => {
    const query = c.req.valid("query")

    await renderComponent(
      <HasciiCode content={SAMPLE} filetype={query.filetype} width={56} height={9} />,
    )

    return c.text("")
  },
)
