import { HasciiFooter } from "@/registry/ui/hascii/footer"
import { HasciiHeader } from "@/registry/ui/hascii/header"
import { HasciiMainView } from "@/registry/ui/hascii/main-view"
import { useHasciiTheme } from "@/registry/lib/hascii/theme-context"

export type Props = {
  title: string
  body: string
  status: string
  headerHeight: number
  footerHeight: number
}

/** Header / MainView / Footer stack preview. */
export function LayoutPreview(props: Props) {
  const theme = useHasciiTheme()

  return (
    <box flexGrow={1} flexDirection="column">
      <HasciiHeader height={props.headerHeight}>
        <text fg={theme.color.cardForeground}>{props.title}</text>
      </HasciiHeader>
      <HasciiMainView>
        <text fg={theme.color.foreground}>{props.body}</text>
      </HasciiMainView>
      <HasciiFooter height={props.footerHeight}>
        <text fg={theme.color.cardForeground}>{props.status}</text>
      </HasciiFooter>
    </box>
  )
}
