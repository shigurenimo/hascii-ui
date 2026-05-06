/** @jsxImportSource @opentui/react */
import { z } from "zod"
import { HasciiButton } from "@/registry/ui/hascii/button"
import { HasciiCard } from "@/registry/ui/hascii/card"
import { HasciiCardContent } from "@/registry/ui/hascii/card-content"
import { HasciiCardDescription } from "@/registry/ui/hascii/card-description"
import { HasciiCardFooter } from "@/registry/ui/hascii/card-footer"
import { HasciiCardHeader } from "@/registry/ui/hascii/card-header"
import { HasciiCardTitle } from "@/registry/ui/hascii/card-title"
import { factory } from "@/cli/factory"
import { renderComponent } from "@/cli/render-component"
import { customValidator } from "@/cli/utils/custom-validator"

const help = `usage: hascii-ui components card [options]

options:
  --heading       primary heading inside the card                        (default: hascii)
  --description   secondary line under the heading                       (default: hello@hascii.sh)
  --body          body paragraph                                          (default: a sample sentence)
  --confirm       confirm button label rendered in the footer            (default: Save)
  --cancel        cancel button label rendered in the footer             (default: Cancel)
  --width         width in cells                                          (default: 48)
  --help, -h                                                               show this help`

const schema = z.object({
  heading: z.string().default("hascii"),
  description: z.string().default("hello@hascii.sh"),
  body: z.string().default("Profile details and account preferences live here."),
  confirm: z.string().default("Save"),
  cancel: z.string().default("Cancel"),
  width: z.coerce.number().int().positive().default(48),
})

export const cardHandler = factory.createHandlers(
  customValidator("query", schema, help),
  async (c) => {
    const query = c.req.valid("query")

    await renderComponent(
      <HasciiCard width={query.width}>
        <HasciiCardHeader>
          <HasciiCardTitle>{query.heading}</HasciiCardTitle>
          <HasciiCardDescription>{query.description}</HasciiCardDescription>
        </HasciiCardHeader>
        <HasciiCardContent>
          <text>{query.body}</text>
        </HasciiCardContent>
        <HasciiCardFooter>
          <HasciiButton variant="secondary" size="sm">
            {query.cancel}
          </HasciiButton>
          <HasciiButton variant="default" size="sm">
            {query.confirm}
          </HasciiButton>
        </HasciiCardFooter>
      </HasciiCard>,
    )

    return c.text("")
  },
)
