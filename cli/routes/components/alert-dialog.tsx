import { z } from "zod"
import { HasciiAlertDialog } from "@/registry/ui/hascii/alert-dialog"
import { factory } from "@/cli/factory"
import { renderComponent } from "@/cli/render-component"
import { customValidator } from "@/cli/utils/custom-validator"
import { useQuit } from "@/cli/utils/use-quit"

const help = `usage: hascii-ui components alert-dialog [options]

options:
  --title         dialog title             (default: Are you sure?)
  --description   secondary description    (default: Lorem ipsum)
  --ok            ok button label          (default: OK)
  --cancel        cancel button label      (default: empty — hides cancel)
  --width         dialog width in cells    (default: 48)
  --help, -h                                show this help`

const schema = z.object({
  title: z.string().default("Are you sure?"),
  description: z.string().default("This action cannot be undone. Please confirm to proceed."),
  ok: z.string().default("OK"),
  cancel: z.string().default(""),
  width: z.coerce.number().int().positive().default(48),
})

function AlertDialogPreview(props: {
  title: string
  description: string
  ok: string
  cancel: string
  width: number
}) {
  const quit = useQuit()

  return (
    <HasciiAlertDialog
      width={props.width}
      title={props.title}
      description={props.description}
      okText={props.ok}
      cancelText={props.cancel.length > 0 ? props.cancel : undefined}
      onOk={quit}
      onCancel={quit}
      onClose={quit}
    />
  )
}

export const alertDialogHandler = factory.createHandlers(
  customValidator("query", schema, help),
  async (c) => {
    const query = c.req.valid("query")

    await renderComponent(
      <AlertDialogPreview
        title={query.title}
        description={query.description}
        ok={query.ok}
        cancel={query.cancel}
        width={query.width}
      />,
    )

    return c.text("")
  },
)
