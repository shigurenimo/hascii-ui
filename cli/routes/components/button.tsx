/** @jsxImportSource @opentui/react */
import { z } from "zod"
import { HasciiButton } from "@/registry/ui/hascii/button"
import { factory } from "@/cli/factory"
import { renderComponent } from "@/cli/render-component"
import { customValidator } from "@/cli/utils/custom-validator"

const help = `usage: hascii-ui components button [options]

options:
  --variant   default | secondary | outline | ghost | destructive   (default: default)
  --size      default | sm | lg                                       (default: default)
  --label     button label                                            (default: HasciiButton)
  --disabled                                                           disable the button
  --focused                                                            enable keyboard activation
  --help, -h                                                           show this help`

const schema = z.object({
  variant: z.enum(["default", "secondary", "outline", "ghost", "destructive"]).default("default"),
  size: z.enum(["default", "sm", "lg"]).default("default"),
  label: z.string().default("HasciiButton"),
  disabled: z.coerce.boolean().default(false),
  focused: z.coerce.boolean().default(true),
})

export const buttonHandler = factory.createHandlers(
  customValidator("query", schema, help),
  async (c) => {
    const query = c.req.valid("query")
    await renderComponent(
      <HasciiButton
        variant={query.variant}
        size={query.size}
        isDisabled={query.disabled}
        isFocused={query.focused}
      >
        {query.label}
      </HasciiButton>,
    )
    return c.text("")
  },
)
