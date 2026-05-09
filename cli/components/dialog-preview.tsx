import { HasciiButton } from "@/registry/ui/hascii/button"
import { HasciiDialog } from "@/registry/ui/hascii/dialog"
import { HasciiDialogContent } from "@/registry/ui/hascii/dialog-content"
import { HasciiDialogDescription } from "@/registry/ui/hascii/dialog-description"
import { HasciiDialogFooter } from "@/registry/ui/hascii/dialog-footer"
import { HasciiDialogHeader } from "@/registry/ui/hascii/dialog-header"
import { HasciiDialogTitle } from "@/registry/ui/hascii/dialog-title"
import { HasciiFocusGroup } from "@/registry/ui/hascii/focus-group"
import { useQuit } from "@/cli/utils/use-quit"

export type Props = {
  title: string
  description: string
  body: string
  confirm: string
  cancel: string
  width: number
}

const FOCUS_IDS = ["cancel", "confirm"] as const

/** Dialog wrapped with a useQuit-bound close handler so the x button tears down the renderer cleanly. Tab cycles between footer buttons. */
export function DialogPreview(props: Props) {
  const quit = useQuit()

  return (
    <HasciiFocusGroup ids={FOCUS_IDS} defaultId="confirm">
      <HasciiDialog width={props.width} onClose={quit}>
        <HasciiDialogHeader>
          <HasciiDialogTitle>{props.title}</HasciiDialogTitle>
          <HasciiDialogDescription>{props.description}</HasciiDialogDescription>
        </HasciiDialogHeader>
        {props.body ? (
          <HasciiDialogContent>
            <text>{props.body}</text>
          </HasciiDialogContent>
        ) : null}
        <HasciiDialogFooter>
          <HasciiButton variant="secondary" size="default" focusId="cancel">
            {props.cancel}
          </HasciiButton>
          <HasciiButton variant="default" size="default" focusId="confirm">
            {props.confirm}
          </HasciiButton>
        </HasciiDialogFooter>
      </HasciiDialog>
    </HasciiFocusGroup>
  )
}
