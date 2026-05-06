import { z } from "zod"
import { HasciiSnackbar } from "@/registry/ui/hascii/snackbar"
import { factory } from "@/cli/factory"
import { renderFullscreen } from "@/cli/render-fullscreen"
import { customValidator } from "@/cli/utils/custom-validator"

const help = `usage: hascii-ui components snackbar [options]

options:
  --variant   default | secondary | destructive   (default: default)
  --message   snackbar text                        (default: Saved!)
  --width     width in cells                       (default: 28)
  --slide     slide-in duration in ms              (default: 90)
  --help, -h                                        show this help`

const schema = z.object({
  variant: z.enum(["default", "secondary", "destructive"]).default("default"),
  message: z.string().default("Saved!"),
  width: z.coerce.number().int().positive().default(28),
  slide: z.coerce.number().int().nonnegative().default(90),
})

export const snackbarHandler = factory.createHandlers(
  customValidator("query", schema, help),
  async (c) => {
    const query = c.req.valid("query")

    await renderFullscreen(
      <box
        flexGrow={1}
        flexDirection="column"
        alignItems="flex-end"
        justifyContent="flex-end"
        paddingBottom={1}
      >
        <HasciiSnackbar variant={query.variant} width={query.width} slideMs={query.slide}>
          {query.message}
        </HasciiSnackbar>
      </box>,
    )

    return c.text("")
  },
)
