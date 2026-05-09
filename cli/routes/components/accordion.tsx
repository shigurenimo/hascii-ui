import { z } from "zod"
import { HasciiAccordion } from "@/registry/ui/hascii/accordion"
import { HasciiAccordionItem } from "@/registry/ui/hascii/accordion-item"
import { factory } from "@/cli/factory"
import { renderComponent } from "@/cli/render-component"
import { customValidator } from "@/cli/utils/custom-validator"

const help = `usage: hascii-ui components accordion [options]

options:
  --type      single | multiple   (default: single)
  --default   value to open       (default: first)
  --help, -h                      show this help`

const schema = z.object({
  type: z.enum(["single", "multiple"]).default("single"),
  default: z.string().default("first"),
})

export const accordionHandler = factory.createHandlers(
  customValidator("query", schema, help),
  async (c) => {
    const query = c.req.valid("query")

    const node =
      query.type === "multiple" ? (
        <HasciiAccordion type="multiple" defaultValue={[query.default]}>
          <HasciiAccordionItem value="first" title="What is hascii-ui?">
            A shadcn-registry-compatible set of OpenTUI terminal components.
          </HasciiAccordionItem>
          <HasciiAccordionItem value="second" title="How do I install it?">
            Run bunx shadcn add against the published registry URL.
          </HasciiAccordionItem>
          <HasciiAccordionItem value="third" title="Can I theme it?">
            Yes — wrap the tree in HasciiThemeProvider with your tokens.
          </HasciiAccordionItem>
        </HasciiAccordion>
      ) : (
        <HasciiAccordion type="single" defaultValue={query.default}>
          <HasciiAccordionItem value="first" title="What is hascii-ui?">
            A shadcn-registry-compatible set of OpenTUI terminal components.
          </HasciiAccordionItem>
          <HasciiAccordionItem value="second" title="How do I install it?">
            Run bunx shadcn add against the published registry URL.
          </HasciiAccordionItem>
          <HasciiAccordionItem value="third" title="Can I theme it?">
            Yes — wrap the tree in HasciiThemeProvider with your tokens.
          </HasciiAccordionItem>
        </HasciiAccordion>
      )

    await renderComponent(node)

    return c.text("")
  },
)
